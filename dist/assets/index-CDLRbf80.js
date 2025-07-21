
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

var Zv=Object.defineProperty;var Jv=(r,e,t)=>e in r?Zv(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t;var tt=(r,e,t)=>Jv(r,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function t(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(i){if(i.ep)return;i.ep=!0;const s=t(i);fetch(i.href,s)}})();var Qv="1.3.4";function o_(r,e,t){return Math.max(r,Math.min(e,t))}function ey(r,e,t){return(1-t)*r+t*e}function ty(r,e,t,n){return ey(r,e,1-Math.exp(-t*n))}function ny(r,e){return(r%e+e)%e}var iy=class{constructor(){tt(this,"isRunning",!1);tt(this,"value",0);tt(this,"from",0);tt(this,"to",0);tt(this,"currentTime",0);tt(this,"lerp");tt(this,"duration");tt(this,"easing");tt(this,"onUpdate")}advance(r){var t;if(!this.isRunning)return;let e=!1;if(this.duration&&this.easing){this.currentTime+=r;const n=o_(0,this.currentTime/this.duration,1);e=n>=1;const i=e?1:this.easing(n);this.value=this.from+(this.to-this.from)*i}else this.lerp?(this.value=ty(this.value,this.to,this.lerp*60,r),Math.round(this.value)===this.to&&(this.value=this.to,e=!0)):(this.value=this.to,e=!0);e&&this.stop(),(t=this.onUpdate)==null||t.call(this,this.value,e)}stop(){this.isRunning=!1}fromTo(r,e,{lerp:t,duration:n,easing:i,onStart:s,onUpdate:o}){this.from=this.value=r,this.to=e,this.lerp=t,this.duration=n,this.easing=i,this.currentTime=0,this.isRunning=!0,s==null||s(),this.onUpdate=o}};function ry(r,e){let t;return function(...n){let i=this;clearTimeout(t),t=setTimeout(()=>{t=void 0,r.apply(i,n)},e)}}var sy=class{constructor(r,e,{autoResize:t=!0,debounce:n=250}={}){tt(this,"width",0);tt(this,"height",0);tt(this,"scrollHeight",0);tt(this,"scrollWidth",0);tt(this,"debouncedResize");tt(this,"wrapperResizeObserver");tt(this,"contentResizeObserver");tt(this,"resize",()=>{this.onWrapperResize(),this.onContentResize()});tt(this,"onWrapperResize",()=>{this.wrapper instanceof Window?(this.width=window.innerWidth,this.height=window.innerHeight):(this.width=this.wrapper.clientWidth,this.height=this.wrapper.clientHeight)});tt(this,"onContentResize",()=>{this.wrapper instanceof Window?(this.scrollHeight=this.content.scrollHeight,this.scrollWidth=this.content.scrollWidth):(this.scrollHeight=this.wrapper.scrollHeight,this.scrollWidth=this.wrapper.scrollWidth)});this.wrapper=r,this.content=e,t&&(this.debouncedResize=ry(this.resize,n),this.wrapper instanceof Window?window.addEventListener("resize",this.debouncedResize,!1):(this.wrapperResizeObserver=new ResizeObserver(this.debouncedResize),this.wrapperResizeObserver.observe(this.wrapper)),this.contentResizeObserver=new ResizeObserver(this.debouncedResize),this.contentResizeObserver.observe(this.content)),this.resize()}destroy(){var r,e;(r=this.wrapperResizeObserver)==null||r.disconnect(),(e=this.contentResizeObserver)==null||e.disconnect(),this.wrapper===window&&this.debouncedResize&&window.removeEventListener("resize",this.debouncedResize,!1)}get limit(){return{x:this.scrollWidth-this.width,y:this.scrollHeight-this.height}}},a_=class{constructor(){tt(this,"events",{})}emit(r,...e){var n;let t=this.events[r]||[];for(let i=0,s=t.length;i<s;i++)(n=t[i])==null||n.call(t,...e)}on(r,e){var t;return(t=this.events[r])!=null&&t.push(e)||(this.events[r]=[e]),()=>{var n;this.events[r]=(n=this.events[r])==null?void 0:n.filter(i=>e!==i)}}off(r,e){var t;this.events[r]=(t=this.events[r])==null?void 0:t.filter(n=>e!==n)}destroy(){this.events={}}},yp=100/6,qr={passive:!1},oy=class{constructor(r,e={wheelMultiplier:1,touchMultiplier:1}){tt(this,"touchStart",{x:0,y:0});tt(this,"lastDelta",{x:0,y:0});tt(this,"window",{width:0,height:0});tt(this,"emitter",new a_);tt(this,"onTouchStart",r=>{const{clientX:e,clientY:t}=r.targetTouches?r.targetTouches[0]:r;this.touchStart.x=e,this.touchStart.y=t,this.lastDelta={x:0,y:0},this.emitter.emit("scroll",{deltaX:0,deltaY:0,event:r})});tt(this,"onTouchMove",r=>{const{clientX:e,clientY:t}=r.targetTouches?r.targetTouches[0]:r,n=-(e-this.touchStart.x)*this.options.touchMultiplier,i=-(t-this.touchStart.y)*this.options.touchMultiplier;this.touchStart.x=e,this.touchStart.y=t,this.lastDelta={x:n,y:i},this.emitter.emit("scroll",{deltaX:n,deltaY:i,event:r})});tt(this,"onTouchEnd",r=>{this.emitter.emit("scroll",{deltaX:this.lastDelta.x,deltaY:this.lastDelta.y,event:r})});tt(this,"onWheel",r=>{let{deltaX:e,deltaY:t,deltaMode:n}=r;const i=n===1?yp:n===2?this.window.width:1,s=n===1?yp:n===2?this.window.height:1;e*=i,t*=s,e*=this.options.wheelMultiplier,t*=this.options.wheelMultiplier,this.emitter.emit("scroll",{deltaX:e,deltaY:t,event:r})});tt(this,"onWindowResize",()=>{this.window={width:window.innerWidth,height:window.innerHeight}});this.element=r,this.options=e,window.addEventListener("resize",this.onWindowResize,!1),this.onWindowResize(),this.element.addEventListener("wheel",this.onWheel,qr),this.element.addEventListener("touchstart",this.onTouchStart,qr),this.element.addEventListener("touchmove",this.onTouchMove,qr),this.element.addEventListener("touchend",this.onTouchEnd,qr)}on(r,e){return this.emitter.on(r,e)}destroy(){this.emitter.destroy(),window.removeEventListener("resize",this.onWindowResize,!1),this.element.removeEventListener("wheel",this.onWheel,qr),this.element.removeEventListener("touchstart",this.onTouchStart,qr),this.element.removeEventListener("touchmove",this.onTouchMove,qr),this.element.removeEventListener("touchend",this.onTouchEnd,qr)}},xp=r=>Math.min(1,1.001-Math.pow(2,-10*r)),ay=class{constructor({wrapper:r=window,content:e=document.documentElement,eventsTarget:t=r,smoothWheel:n=!0,syncTouch:i=!1,syncTouchLerp:s=.075,touchInertiaMultiplier:o=35,duration:a,easing:l,lerp:c=.1,infinite:u=!1,orientation:d="vertical",gestureOrientation:f="vertical",touchMultiplier:h=1,wheelMultiplier:_=1,autoResize:g=!0,prevent:m,virtualScroll:p,overscroll:S=!0,autoRaf:x=!1,anchors:v=!1,autoToggle:T=!1,allowNestedScroll:M=!1,__experimental__naiveDimensions:E=!1}={}){tt(this,"_isScrolling",!1);tt(this,"_isStopped",!1);tt(this,"_isLocked",!1);tt(this,"_preventNextNativeScrollEvent",!1);tt(this,"_resetVelocityTimeout",null);tt(this,"__rafID",null);tt(this,"isTouching");tt(this,"time",0);tt(this,"userData",{});tt(this,"lastVelocity",0);tt(this,"velocity",0);tt(this,"direction",0);tt(this,"options");tt(this,"targetScroll");tt(this,"animatedScroll");tt(this,"animate",new iy);tt(this,"emitter",new a_);tt(this,"dimensions");tt(this,"virtualScroll");tt(this,"onScrollEnd",r=>{r instanceof CustomEvent||(this.isScrolling==="smooth"||this.isScrolling===!1)&&r.stopPropagation()});tt(this,"dispatchScrollendEvent",()=>{this.options.wrapper.dispatchEvent(new CustomEvent("scrollend",{bubbles:this.options.wrapper===window,detail:{lenisScrollEnd:!0}}))});tt(this,"onTransitionEnd",r=>{if(r.propertyName.includes("overflow")){const e=this.isHorizontal?"overflow-x":"overflow-y",t=getComputedStyle(this.rootElement)[e];["hidden","clip"].includes(t)?this.stop():this.start()}});tt(this,"onClick",r=>{const t=r.composedPath().find(n=>{var i,s,o;return n instanceof HTMLAnchorElement&&(((i=n.getAttribute("href"))==null?void 0:i.startsWith("#"))||((s=n.getAttribute("href"))==null?void 0:s.startsWith("/#"))||((o=n.getAttribute("href"))==null?void 0:o.startsWith("./#")))});if(t){const n=t.getAttribute("href");if(n){const i=typeof this.options.anchors=="object"&&this.options.anchors?this.options.anchors:void 0;let s=`#${n.split("#")[1]}`;["#","/#","./#","#top","/#top","./#top"].includes(n)&&(s=0),this.scrollTo(s,i)}}});tt(this,"onPointerDown",r=>{r.button===1&&this.reset()});tt(this,"onVirtualScroll",r=>{if(typeof this.options.virtualScroll=="function"&&this.options.virtualScroll(r)===!1)return;const{deltaX:e,deltaY:t,event:n}=r;if(this.emitter.emit("virtual-scroll",{deltaX:e,deltaY:t,event:n}),n.ctrlKey||n.lenisStopPropagation)return;const i=n.type.includes("touch"),s=n.type.includes("wheel");this.isTouching=n.type==="touchstart"||n.type==="touchmove";const o=e===0&&t===0;if(this.options.syncTouch&&i&&n.type==="touchstart"&&o&&!this.isStopped&&!this.isLocked){this.reset();return}const l=this.options.gestureOrientation==="vertical"&&t===0||this.options.gestureOrientation==="horizontal"&&e===0;if(o||l)return;let c=n.composedPath();c=c.slice(0,c.indexOf(this.rootElement));const u=this.options.prevent;if(c.find(m=>{var p,S,x;return m instanceof HTMLElement&&(typeof u=="function"&&(u==null?void 0:u(m))||((p=m.hasAttribute)==null?void 0:p.call(m,"data-lenis-prevent"))||i&&((S=m.hasAttribute)==null?void 0:S.call(m,"data-lenis-prevent-touch"))||s&&((x=m.hasAttribute)==null?void 0:x.call(m,"data-lenis-prevent-wheel"))||this.options.allowNestedScroll&&this.checkNestedScroll(m,{deltaX:e,deltaY:t}))}))return;if(this.isStopped||this.isLocked){n.preventDefault();return}if(!(this.options.syncTouch&&i||this.options.smoothWheel&&s)){this.isScrolling="native",this.animate.stop(),n.lenisStopPropagation=!0;return}let f=t;this.options.gestureOrientation==="both"?f=Math.abs(t)>Math.abs(e)?t:e:this.options.gestureOrientation==="horizontal"&&(f=e),(!this.options.overscroll||this.options.infinite||this.options.wrapper!==window&&(this.animatedScroll>0&&this.animatedScroll<this.limit||this.animatedScroll===0&&t>0||this.animatedScroll===this.limit&&t<0))&&(n.lenisStopPropagation=!0),n.preventDefault();const h=i&&this.options.syncTouch,g=i&&n.type==="touchend"&&Math.abs(f)>5;g&&(f=this.velocity*this.options.touchInertiaMultiplier),this.scrollTo(this.targetScroll+f,{programmatic:!1,...h?{lerp:g?this.options.syncTouchLerp:1}:{lerp:this.options.lerp,duration:this.options.duration,easing:this.options.easing}})});tt(this,"onNativeScroll",()=>{if(this._resetVelocityTimeout!==null&&(clearTimeout(this._resetVelocityTimeout),this._resetVelocityTimeout=null),this._preventNextNativeScrollEvent){this._preventNextNativeScrollEvent=!1;return}if(this.isScrolling===!1||this.isScrolling==="native"){const r=this.animatedScroll;this.animatedScroll=this.targetScroll=this.actualScroll,this.lastVelocity=this.velocity,this.velocity=this.animatedScroll-r,this.direction=Math.sign(this.animatedScroll-r),this.isStopped||(this.isScrolling="native"),this.emit(),this.velocity!==0&&(this._resetVelocityTimeout=setTimeout(()=>{this.lastVelocity=this.velocity,this.velocity=0,this.isScrolling=!1,this.emit()},400))}});tt(this,"raf",r=>{const e=r-(this.time||r);this.time=r,this.animate.advance(e*.001),this.options.autoRaf&&(this.__rafID=requestAnimationFrame(this.raf))});window.lenisVersion=Qv,(!r||r===document.documentElement)&&(r=window),typeof a=="number"&&typeof l!="function"?l=xp:typeof l=="function"&&typeof a!="number"&&(a=1),this.options={wrapper:r,content:e,eventsTarget:t,smoothWheel:n,syncTouch:i,syncTouchLerp:s,touchInertiaMultiplier:o,duration:a,easing:l,lerp:c,infinite:u,gestureOrientation:f,orientation:d,touchMultiplier:h,wheelMultiplier:_,autoResize:g,prevent:m,virtualScroll:p,overscroll:S,autoRaf:x,anchors:v,autoToggle:T,allowNestedScroll:M,__experimental__naiveDimensions:E},this.dimensions=new sy(r,e,{autoResize:g}),this.updateClassName(),this.targetScroll=this.animatedScroll=this.actualScroll,this.options.wrapper.addEventListener("scroll",this.onNativeScroll,!1),this.options.wrapper.addEventListener("scrollend",this.onScrollEnd,{capture:!0}),this.options.anchors&&this.options.wrapper===window&&this.options.wrapper.addEventListener("click",this.onClick,!1),this.options.wrapper.addEventListener("pointerdown",this.onPointerDown,!1),this.virtualScroll=new oy(t,{touchMultiplier:h,wheelMultiplier:_}),this.virtualScroll.on("scroll",this.onVirtualScroll),this.options.autoToggle&&this.rootElement.addEventListener("transitionend",this.onTransitionEnd,{passive:!0}),this.options.autoRaf&&(this.__rafID=requestAnimationFrame(this.raf))}destroy(){this.emitter.destroy(),this.options.wrapper.removeEventListener("scroll",this.onNativeScroll,!1),this.options.wrapper.removeEventListener("scrollend",this.onScrollEnd,{capture:!0}),this.options.wrapper.removeEventListener("pointerdown",this.onPointerDown,!1),this.options.anchors&&this.options.wrapper===window&&this.options.wrapper.removeEventListener("click",this.onClick,!1),this.virtualScroll.destroy(),this.dimensions.destroy(),this.cleanUpClassName(),this.__rafID&&cancelAnimationFrame(this.__rafID)}on(r,e){return this.emitter.on(r,e)}off(r,e){return this.emitter.off(r,e)}setScroll(r){this.isHorizontal?this.options.wrapper.scrollTo({left:r,behavior:"instant"}):this.options.wrapper.scrollTo({top:r,behavior:"instant"})}resize(){this.dimensions.resize(),this.animatedScroll=this.targetScroll=this.actualScroll,this.emit()}emit(){this.emitter.emit("scroll",this)}reset(){this.isLocked=!1,this.isScrolling=!1,this.animatedScroll=this.targetScroll=this.actualScroll,this.lastVelocity=this.velocity=0,this.animate.stop()}start(){this.isStopped&&(this.reset(),this.isStopped=!1,this.emit())}stop(){this.isStopped||(this.reset(),this.isStopped=!0,this.emit())}scrollTo(r,{offset:e=0,immediate:t=!1,lock:n=!1,duration:i=this.options.duration,easing:s=this.options.easing,lerp:o=this.options.lerp,onStart:a,onComplete:l,force:c=!1,programmatic:u=!0,userData:d}={}){if(!((this.isStopped||this.isLocked)&&!c)){if(typeof r=="string"&&["top","left","start"].includes(r))r=0;else if(typeof r=="string"&&["bottom","right","end"].includes(r))r=this.limit;else{let f;if(typeof r=="string"?f=document.querySelector(r):r instanceof HTMLElement&&(r!=null&&r.nodeType)&&(f=r),f){if(this.options.wrapper!==window){const _=this.rootElement.getBoundingClientRect();e-=this.isHorizontal?_.left:_.top}const h=f.getBoundingClientRect();r=(this.isHorizontal?h.left:h.top)+this.animatedScroll}}if(typeof r=="number"){if(r+=e,r=Math.round(r),this.options.infinite){if(u){this.targetScroll=this.animatedScroll=this.scroll;const f=r-this.animatedScroll;f>this.limit/2?r=r-this.limit:f<-this.limit/2&&(r=r+this.limit)}}else r=o_(0,r,this.limit);if(r===this.targetScroll){a==null||a(this),l==null||l(this);return}if(this.userData=d??{},t){this.animatedScroll=this.targetScroll=r,this.setScroll(this.scroll),this.reset(),this.preventNextNativeScrollEvent(),this.emit(),l==null||l(this),this.userData={},requestAnimationFrame(()=>{this.dispatchScrollendEvent()});return}u||(this.targetScroll=r),typeof i=="number"&&typeof s!="function"?s=xp:typeof s=="function"&&typeof i!="number"&&(i=1),this.animate.fromTo(this.animatedScroll,r,{duration:i,easing:s,lerp:o,onStart:()=>{n&&(this.isLocked=!0),this.isScrolling="smooth",a==null||a(this)},onUpdate:(f,h)=>{this.isScrolling="smooth",this.lastVelocity=this.velocity,this.velocity=f-this.animatedScroll,this.direction=Math.sign(this.velocity),this.animatedScroll=f,this.setScroll(this.scroll),u&&(this.targetScroll=f),h||this.emit(),h&&(this.reset(),this.emit(),l==null||l(this),this.userData={},requestAnimationFrame(()=>{this.dispatchScrollendEvent()}),this.preventNextNativeScrollEvent())}})}}}preventNextNativeScrollEvent(){this._preventNextNativeScrollEvent=!0,requestAnimationFrame(()=>{this._preventNextNativeScrollEvent=!1})}checkNestedScroll(r,{deltaX:e,deltaY:t}){const n=Date.now(),i=r._lenis??(r._lenis={});let s,o,a,l,c,u,d,f;const h=this.options.gestureOrientation;if(n-(i.time??0)>2e3){i.time=Date.now();const T=window.getComputedStyle(r);i.computedStyle=T;const M=T.overflowX,E=T.overflowY;if(s=["auto","overlay","scroll"].includes(M),o=["auto","overlay","scroll"].includes(E),i.hasOverflowX=s,i.hasOverflowY=o,!s&&!o||h==="vertical"&&!o||h==="horizontal"&&!s)return!1;c=r.scrollWidth,u=r.scrollHeight,d=r.clientWidth,f=r.clientHeight,a=c>d,l=u>f,i.isScrollableX=a,i.isScrollableY=l,i.scrollWidth=c,i.scrollHeight=u,i.clientWidth=d,i.clientHeight=f}else a=i.isScrollableX,l=i.isScrollableY,s=i.hasOverflowX,o=i.hasOverflowY,c=i.scrollWidth,u=i.scrollHeight,d=i.clientWidth,f=i.clientHeight;if(!s&&!o||!a&&!l||h==="vertical"&&(!o||!l)||h==="horizontal"&&(!s||!a))return!1;let _;if(h==="horizontal")_="x";else if(h==="vertical")_="y";else{const T=e!==0,M=t!==0;T&&s&&a&&(_="x"),M&&o&&l&&(_="y")}if(!_)return!1;let g,m,p,S,x;if(_==="x")g=r.scrollLeft,m=c-d,p=e,S=s,x=a;else if(_==="y")g=r.scrollTop,m=u-f,p=t,S=o,x=l;else return!1;return(p>0?g<m:g>0)&&S&&x}get rootElement(){return this.options.wrapper===window?document.documentElement:this.options.wrapper}get limit(){return this.options.__experimental__naiveDimensions?this.isHorizontal?this.rootElement.scrollWidth-this.rootElement.clientWidth:this.rootElement.scrollHeight-this.rootElement.clientHeight:this.dimensions.limit[this.isHorizontal?"x":"y"]}get isHorizontal(){return this.options.orientation==="horizontal"}get actualScroll(){const r=this.options.wrapper;return this.isHorizontal?r.scrollX??r.scrollLeft:r.scrollY??r.scrollTop}get scroll(){return this.options.infinite?ny(this.animatedScroll,this.limit):this.animatedScroll}get progress(){return this.limit===0?1:this.scroll/this.limit}get isScrolling(){return this._isScrolling}set isScrolling(r){this._isScrolling!==r&&(this._isScrolling=r,this.updateClassName())}get isStopped(){return this._isStopped}set isStopped(r){this._isStopped!==r&&(this._isStopped=r,this.updateClassName())}get isLocked(){return this._isLocked}set isLocked(r){this._isLocked!==r&&(this._isLocked=r,this.updateClassName())}get isSmooth(){return this.isScrolling==="smooth"}get className(){let r="lenis";return this.options.autoToggle&&(r+=" lenis-autoToggle"),this.isStopped&&(r+=" lenis-stopped"),this.isLocked&&(r+=" lenis-locked"),this.isScrolling&&(r+=" lenis-scrolling"),this.isScrolling==="smooth"&&(r+=" lenis-smooth"),r}updateClassName(){this.cleanUpClassName(),this.rootElement.className=`${this.rootElement.className} ${this.className}`.trim()}cleanUpClassName(){this.rootElement.className=this.rootElement.className.replace(/lenis(-\w+)?/g,"").trim()}};const ly="modulepreload",cy=function(r){return"/150-lab/"+r},bp={},Sp=function(e,t,n){let i=Promise.resolve();if(t&&t.length>0){let o=function(c){return Promise.all(c.map(u=>Promise.resolve(u).then(d=>({status:"fulfilled",value:d}),d=>({status:"rejected",reason:d}))))};document.getElementsByTagName("link");const a=document.querySelector("meta[property=csp-nonce]"),l=(a==null?void 0:a.nonce)||(a==null?void 0:a.getAttribute("nonce"));i=o(t.map(c=>{if(c=cy(c),c in bp)return;bp[c]=!0;const u=c.endsWith(".css"),d=u?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${c}"]${d}`))return;const f=document.createElement("link");if(f.rel=u?"stylesheet":ly,u||(f.as="script"),f.crossOrigin="",f.href=c,l&&f.setAttribute("nonce",l),document.head.appendChild(f),u)return new Promise((h,_)=>{f.addEventListener("load",h),f.addEventListener("error",()=>_(new Error(`Unable to preload CSS for ${c}`)))})}))}function s(o){const a=new Event("vite:preloadError",{cancelable:!0});if(a.payload=o,window.dispatchEvent(a),!a.defaultPrevented)throw o}return i.then(o=>{for(const a of o||[])a.status==="rejected"&&s(a.reason);return e().catch(s)})};/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const vh="178",uy=0,wp=1,dy=2,l_=1,fy=2,Er=3,zr=0,si=1,Di=2,ds=0,fs=1,nu=2,Mp=3,Ep=4,hy=5,Vs=100,py=101,my=102,gy=103,_y=104,vy=200,yy=201,xy=202,by=203,zd=204,Hd=205,Sy=206,wy=207,My=208,Ey=209,Ty=210,Ay=211,Cy=212,Ry=213,Py=214,Vd=0,Gd=1,Wd=2,oa=3,Xd=4,qd=5,Yd=6,jd=7,c_=0,Ly=1,Dy=2,hs=0,Iy=1,Oy=2,Ny=3,Uy=4,Fy=5,ky=6,By=7,Tp="attached",zy="detached",u_=300,aa=301,la=302,$d=303,Kd=304,wu=306,ca=1e3,is=1001,iu=1002,ti=1003,d_=1004,Ga=1005,xi=1006,kc=1007,Lr=1008,hr=1009,f_=1010,h_=1011,Sl=1012,yh=1013,ro=1014,Yi=1015,Hl=1016,xh=1017,bh=1018,wl=1020,p_=35902,m_=1021,g_=1022,Ii=1023,Ml=1026,El=1027,Sh=1028,wh=1029,__=1030,Mh=1031,Eh=1033,Bc=33776,zc=33777,Hc=33778,Vc=33779,Zd=35840,Jd=35841,Qd=35842,ef=35843,tf=36196,nf=37492,rf=37496,sf=37808,of=37809,af=37810,lf=37811,cf=37812,uf=37813,df=37814,ff=37815,hf=37816,pf=37817,mf=37818,gf=37819,_f=37820,vf=37821,Gc=36492,yf=36494,xf=36495,v_=36283,bf=36284,Sf=36285,wf=36286,Tl=2300,Al=2301,Uu=2302,Ap=2400,Cp=2401,Rp=2402,Hy=2500,Vy=0,y_=1,Mf=2,Gy=3200,Wy=3201,x_=0,Xy=1,ns="",On="srgb",ni="srgb-linear",ru="linear",Yt="srgb",vo=7680,Pp=519,qy=512,Yy=513,jy=514,b_=515,$y=516,Ky=517,Zy=518,Jy=519,Ef=35044,Lp="300 es",Dr=2e3,su=2001;class Sa{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){const n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){const n=this._listeners;if(n===void 0)return;const i=n[e];if(i!==void 0){const s=i.indexOf(t);s!==-1&&i.splice(s,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const n=t[e.type];if(n!==void 0){e.target=this;const i=n.slice(0);for(let s=0,o=i.length;s<o;s++)i[s].call(this,e);e.target=null}}}const kn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Dp=1234567;const nl=Math.PI/180,ua=180/Math.PI;function ji(){const r=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(kn[r&255]+kn[r>>8&255]+kn[r>>16&255]+kn[r>>24&255]+"-"+kn[e&255]+kn[e>>8&255]+"-"+kn[e>>16&15|64]+kn[e>>24&255]+"-"+kn[t&63|128]+kn[t>>8&255]+"-"+kn[t>>16&255]+kn[t>>24&255]+kn[n&255]+kn[n>>8&255]+kn[n>>16&255]+kn[n>>24&255]).toLowerCase()}function Tt(r,e,t){return Math.max(e,Math.min(t,r))}function Th(r,e){return(r%e+e)%e}function Qy(r,e,t,n,i){return n+(r-e)*(i-n)/(t-e)}function ex(r,e,t){return r!==e?(t-r)/(e-r):0}function il(r,e,t){return(1-t)*r+t*e}function tx(r,e,t,n){return il(r,e,1-Math.exp(-t*n))}function nx(r,e=1){return e-Math.abs(Th(r,e*2)-e)}function ix(r,e,t){return r<=e?0:r>=t?1:(r=(r-e)/(t-e),r*r*(3-2*r))}function rx(r,e,t){return r<=e?0:r>=t?1:(r=(r-e)/(t-e),r*r*r*(r*(r*6-15)+10))}function sx(r,e){return r+Math.floor(Math.random()*(e-r+1))}function ox(r,e){return r+Math.random()*(e-r)}function ax(r){return r*(.5-Math.random())}function lx(r){r!==void 0&&(Dp=r);let e=Dp+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function cx(r){return r*nl}function ux(r){return r*ua}function dx(r){return(r&r-1)===0&&r!==0}function fx(r){return Math.pow(2,Math.ceil(Math.log(r)/Math.LN2))}function hx(r){return Math.pow(2,Math.floor(Math.log(r)/Math.LN2))}function px(r,e,t,n,i){const s=Math.cos,o=Math.sin,a=s(t/2),l=o(t/2),c=s((e+n)/2),u=o((e+n)/2),d=s((e-n)/2),f=o((e-n)/2),h=s((n-e)/2),_=o((n-e)/2);switch(i){case"XYX":r.set(a*u,l*d,l*f,a*c);break;case"YZY":r.set(l*f,a*u,l*d,a*c);break;case"ZXZ":r.set(l*d,l*f,a*u,a*c);break;case"XZX":r.set(a*u,l*_,l*h,a*c);break;case"YXY":r.set(l*h,a*u,l*_,a*c);break;case"ZYZ":r.set(l*_,l*h,a*u,a*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function Wi(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return r/4294967295;case Uint16Array:return r/65535;case Uint8Array:return r/255;case Int32Array:return Math.max(r/2147483647,-1);case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:throw new Error("Invalid component type.")}}function Gt(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return Math.round(r*4294967295);case Uint16Array:return Math.round(r*65535);case Uint8Array:return Math.round(r*255);case Int32Array:return Math.round(r*2147483647);case Int16Array:return Math.round(r*32767);case Int8Array:return Math.round(r*127);default:throw new Error("Invalid component type.")}}const mx={DEG2RAD:nl,RAD2DEG:ua,generateUUID:ji,clamp:Tt,euclideanModulo:Th,mapLinear:Qy,inverseLerp:ex,lerp:il,damp:tx,pingpong:nx,smoothstep:ix,smootherstep:rx,randInt:sx,randFloat:ox,randFloatSpread:ax,seededRandom:lx,degToRad:cx,radToDeg:ux,isPowerOfTwo:dx,ceilPowerOfTwo:fx,floorPowerOfTwo:hx,setQuaternionFromProperEuler:px,normalize:Gt,denormalize:Wi};class Ct{constructor(e=0,t=0){Ct.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6],this.y=i[1]*t+i[4]*n+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Tt(this.x,e.x,t.x),this.y=Tt(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=Tt(this.x,e,t),this.y=Tt(this.y,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Tt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Tt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),i=Math.sin(t),s=this.x-e.x,o=this.y-e.y;return this.x=s*n-o*i+e.x,this.y=s*i+o*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Ss{constructor(e=0,t=0,n=0,i=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=i}static slerpFlat(e,t,n,i,s,o,a){let l=n[i+0],c=n[i+1],u=n[i+2],d=n[i+3];const f=s[o+0],h=s[o+1],_=s[o+2],g=s[o+3];if(a===0){e[t+0]=l,e[t+1]=c,e[t+2]=u,e[t+3]=d;return}if(a===1){e[t+0]=f,e[t+1]=h,e[t+2]=_,e[t+3]=g;return}if(d!==g||l!==f||c!==h||u!==_){let m=1-a;const p=l*f+c*h+u*_+d*g,S=p>=0?1:-1,x=1-p*p;if(x>Number.EPSILON){const T=Math.sqrt(x),M=Math.atan2(T,p*S);m=Math.sin(m*M)/T,a=Math.sin(a*M)/T}const v=a*S;if(l=l*m+f*v,c=c*m+h*v,u=u*m+_*v,d=d*m+g*v,m===1-a){const T=1/Math.sqrt(l*l+c*c+u*u+d*d);l*=T,c*=T,u*=T,d*=T}}e[t]=l,e[t+1]=c,e[t+2]=u,e[t+3]=d}static multiplyQuaternionsFlat(e,t,n,i,s,o){const a=n[i],l=n[i+1],c=n[i+2],u=n[i+3],d=s[o],f=s[o+1],h=s[o+2],_=s[o+3];return e[t]=a*_+u*d+l*h-c*f,e[t+1]=l*_+u*f+c*d-a*h,e[t+2]=c*_+u*h+a*f-l*d,e[t+3]=u*_-a*d-l*f-c*h,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,i=e._y,s=e._z,o=e._order,a=Math.cos,l=Math.sin,c=a(n/2),u=a(i/2),d=a(s/2),f=l(n/2),h=l(i/2),_=l(s/2);switch(o){case"XYZ":this._x=f*u*d+c*h*_,this._y=c*h*d-f*u*_,this._z=c*u*_+f*h*d,this._w=c*u*d-f*h*_;break;case"YXZ":this._x=f*u*d+c*h*_,this._y=c*h*d-f*u*_,this._z=c*u*_-f*h*d,this._w=c*u*d+f*h*_;break;case"ZXY":this._x=f*u*d-c*h*_,this._y=c*h*d+f*u*_,this._z=c*u*_+f*h*d,this._w=c*u*d-f*h*_;break;case"ZYX":this._x=f*u*d-c*h*_,this._y=c*h*d+f*u*_,this._z=c*u*_-f*h*d,this._w=c*u*d+f*h*_;break;case"YZX":this._x=f*u*d+c*h*_,this._y=c*h*d+f*u*_,this._z=c*u*_-f*h*d,this._w=c*u*d-f*h*_;break;case"XZY":this._x=f*u*d-c*h*_,this._y=c*h*d-f*u*_,this._z=c*u*_+f*h*d,this._w=c*u*d+f*h*_;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,i=Math.sin(n);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],i=t[4],s=t[8],o=t[1],a=t[5],l=t[9],c=t[2],u=t[6],d=t[10],f=n+a+d;if(f>0){const h=.5/Math.sqrt(f+1);this._w=.25/h,this._x=(u-l)*h,this._y=(s-c)*h,this._z=(o-i)*h}else if(n>a&&n>d){const h=2*Math.sqrt(1+n-a-d);this._w=(u-l)/h,this._x=.25*h,this._y=(i+o)/h,this._z=(s+c)/h}else if(a>d){const h=2*Math.sqrt(1+a-n-d);this._w=(s-c)/h,this._x=(i+o)/h,this._y=.25*h,this._z=(l+u)/h}else{const h=2*Math.sqrt(1+d-n-a);this._w=(o-i)/h,this._x=(s+c)/h,this._y=(l+u)/h,this._z=.25*h}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Tt(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const i=Math.min(1,t/n);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,i=e._y,s=e._z,o=e._w,a=t._x,l=t._y,c=t._z,u=t._w;return this._x=n*u+o*a+i*c-s*l,this._y=i*u+o*l+s*a-n*c,this._z=s*u+o*c+n*l-i*a,this._w=o*u-n*a-i*l-s*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,i=this._y,s=this._z,o=this._w;let a=o*e._w+n*e._x+i*e._y+s*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=n,this._y=i,this._z=s,this;const l=1-a*a;if(l<=Number.EPSILON){const h=1-t;return this._w=h*o+t*this._w,this._x=h*n+t*this._x,this._y=h*i+t*this._y,this._z=h*s+t*this._z,this.normalize(),this}const c=Math.sqrt(l),u=Math.atan2(c,a),d=Math.sin((1-t)*u)/c,f=Math.sin(t*u)/c;return this._w=o*d+this._w*f,this._x=n*d+this._x*f,this._y=i*d+this._y*f,this._z=s*d+this._z*f,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(i*Math.sin(e),i*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class G{constructor(e=0,t=0,n=0){G.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Ip.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Ip.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6]*i,this.y=s[1]*t+s[4]*n+s[7]*i,this.z=s[2]*t+s[5]*n+s[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,s=e.elements,o=1/(s[3]*t+s[7]*n+s[11]*i+s[15]);return this.x=(s[0]*t+s[4]*n+s[8]*i+s[12])*o,this.y=(s[1]*t+s[5]*n+s[9]*i+s[13])*o,this.z=(s[2]*t+s[6]*n+s[10]*i+s[14])*o,this}applyQuaternion(e){const t=this.x,n=this.y,i=this.z,s=e.x,o=e.y,a=e.z,l=e.w,c=2*(o*i-a*n),u=2*(a*t-s*i),d=2*(s*n-o*t);return this.x=t+l*c+o*d-a*u,this.y=n+l*u+a*c-s*d,this.z=i+l*d+s*u-o*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*i,this.y=s[1]*t+s[5]*n+s[9]*i,this.z=s[2]*t+s[6]*n+s[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Tt(this.x,e.x,t.x),this.y=Tt(this.y,e.y,t.y),this.z=Tt(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=Tt(this.x,e,t),this.y=Tt(this.y,e,t),this.z=Tt(this.z,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Tt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,i=e.y,s=e.z,o=t.x,a=t.y,l=t.z;return this.x=i*l-s*a,this.y=s*o-n*l,this.z=n*a-i*o,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Fu.copy(this).projectOnVector(e),this.sub(Fu)}reflect(e){return this.sub(Fu.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Tt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,i=this.z-e.z;return t*t+n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const i=Math.sin(t)*e;return this.x=i*Math.sin(n),this.y=Math.cos(t)*e,this.z=i*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Fu=new G,Ip=new Ss;class gt{constructor(e,t,n,i,s,o,a,l,c){gt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,i,s,o,a,l,c)}set(e,t,n,i,s,o,a,l,c){const u=this.elements;return u[0]=e,u[1]=i,u[2]=a,u[3]=t,u[4]=s,u[5]=l,u[6]=n,u[7]=o,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,s=this.elements,o=n[0],a=n[3],l=n[6],c=n[1],u=n[4],d=n[7],f=n[2],h=n[5],_=n[8],g=i[0],m=i[3],p=i[6],S=i[1],x=i[4],v=i[7],T=i[2],M=i[5],E=i[8];return s[0]=o*g+a*S+l*T,s[3]=o*m+a*x+l*M,s[6]=o*p+a*v+l*E,s[1]=c*g+u*S+d*T,s[4]=c*m+u*x+d*M,s[7]=c*p+u*v+d*E,s[2]=f*g+h*S+_*T,s[5]=f*m+h*x+_*M,s[8]=f*p+h*v+_*E,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8];return t*o*u-t*a*c-n*s*u+n*a*l+i*s*c-i*o*l}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8],d=u*o-a*c,f=a*l-u*s,h=c*s-o*l,_=t*d+n*f+i*h;if(_===0)return this.set(0,0,0,0,0,0,0,0,0);const g=1/_;return e[0]=d*g,e[1]=(i*c-u*n)*g,e[2]=(a*n-i*o)*g,e[3]=f*g,e[4]=(u*t-i*l)*g,e[5]=(i*s-a*t)*g,e[6]=h*g,e[7]=(n*l-c*t)*g,e[8]=(o*t-n*s)*g,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,i,s,o,a){const l=Math.cos(s),c=Math.sin(s);return this.set(n*l,n*c,-n*(l*o+c*a)+o+e,-i*c,i*l,-i*(-c*o+l*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(ku.makeScale(e,t)),this}rotate(e){return this.premultiply(ku.makeRotation(-e)),this}translate(e,t){return this.premultiply(ku.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<9;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const ku=new gt;function S_(r){for(let e=r.length-1;e>=0;--e)if(r[e]>=65535)return!0;return!1}function Cl(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function gx(){const r=Cl("canvas");return r.style.display="block",r}const Op={};function jo(r){r in Op||(Op[r]=!0,console.warn(r))}function _x(r,e,t){return new Promise(function(n,i){function s(){switch(r.clientWaitSync(e,r.SYNC_FLUSH_COMMANDS_BIT,0)){case r.WAIT_FAILED:i();break;case r.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:n()}}setTimeout(s,t)})}function vx(r){const e=r.elements;e[2]=.5*e[2]+.5*e[3],e[6]=.5*e[6]+.5*e[7],e[10]=.5*e[10]+.5*e[11],e[14]=.5*e[14]+.5*e[15]}function yx(r){const e=r.elements;e[11]===-1?(e[10]=-e[10]-1,e[14]=-e[14]):(e[10]=-e[10],e[14]=-e[14]+1)}const Np=new gt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Up=new gt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function xx(){const r={enabled:!0,workingColorSpace:ni,spaces:{},convert:function(i,s,o){return this.enabled===!1||s===o||!s||!o||(this.spaces[s].transfer===Yt&&(i.r=Fr(i.r),i.g=Fr(i.g),i.b=Fr(i.b)),this.spaces[s].primaries!==this.spaces[o].primaries&&(i.applyMatrix3(this.spaces[s].toXYZ),i.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===Yt&&(i.r=$o(i.r),i.g=$o(i.g),i.b=$o(i.b))),i},workingToColorSpace:function(i,s){return this.convert(i,this.workingColorSpace,s)},colorSpaceToWorking:function(i,s){return this.convert(i,s,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===ns?ru:this.spaces[i].transfer},getLuminanceCoefficients:function(i,s=this.workingColorSpace){return i.fromArray(this.spaces[s].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,s,o){return i.copy(this.spaces[s].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(i,s){return jo("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),r.workingToColorSpace(i,s)},toWorkingColorSpace:function(i,s){return jo("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),r.colorSpaceToWorking(i,s)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return r.define({[ni]:{primaries:e,whitePoint:n,transfer:ru,toXYZ:Np,fromXYZ:Up,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:On},outputColorSpaceConfig:{drawingBufferColorSpace:On}},[On]:{primaries:e,whitePoint:n,transfer:Yt,toXYZ:Np,fromXYZ:Up,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:On}}}),r}const Nt=xx();function Fr(r){return r<.04045?r*.0773993808:Math.pow(r*.9478672986+.0521327014,2.4)}function $o(r){return r<.0031308?r*12.92:1.055*Math.pow(r,.41666)-.055}let yo;class bx{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{yo===void 0&&(yo=Cl("canvas")),yo.width=e.width,yo.height=e.height;const i=yo.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),n=yo}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Cl("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const i=n.getImageData(0,0,e.width,e.height),s=i.data;for(let o=0;o<s.length;o++)s[o]=Fr(s[o]/255)*255;return n.putImageData(i,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Fr(t[n]/255)*255):t[n]=Fr(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Sx=0;class Ah{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Sx++}),this.uuid=ji(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let s;if(Array.isArray(i)){s=[];for(let o=0,a=i.length;o<a;o++)i[o].isDataTexture?s.push(Bu(i[o].image)):s.push(Bu(i[o]))}else s=Bu(i);n.url=s}return t||(e.images[this.uuid]=n),n}}function Bu(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?bx.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let wx=0;const zu=new G;class Mn extends Sa{constructor(e=Mn.DEFAULT_IMAGE,t=Mn.DEFAULT_MAPPING,n=is,i=is,s=xi,o=Lr,a=Ii,l=hr,c=Mn.DEFAULT_ANISOTROPY,u=ns){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:wx++}),this.uuid=ji(),this.name="",this.source=new Ah(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=s,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new Ct(0,0),this.repeat=new Ct(1,1),this.center=new Ct(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new gt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(zu).x}get height(){return this.source.getSize(zu).y}get depth(){return this.source.getSize(zu).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const i=this[t];if(i===void 0){console.warn(`THREE.Texture.setValues(): property '${t}' does not exist.`);continue}i&&n&&i.isVector2&&n.isVector2||i&&n&&i.isVector3&&n.isVector3||i&&n&&i.isMatrix3&&n.isMatrix3?i.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==u_)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case ca:e.x=e.x-Math.floor(e.x);break;case is:e.x=e.x<0?0:1;break;case iu:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case ca:e.y=e.y-Math.floor(e.y);break;case is:e.y=e.y<0?0:1;break;case iu:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Mn.DEFAULT_IMAGE=null;Mn.DEFAULT_MAPPING=u_;Mn.DEFAULT_ANISOTROPY=1;class zt{constructor(e=0,t=0,n=0,i=1){zt.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,i){return this.x=e,this.y=t,this.z=n,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,s=this.w,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*i+o[12]*s,this.y=o[1]*t+o[5]*n+o[9]*i+o[13]*s,this.z=o[2]*t+o[6]*n+o[10]*i+o[14]*s,this.w=o[3]*t+o[7]*n+o[11]*i+o[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,i,s;const l=e.elements,c=l[0],u=l[4],d=l[8],f=l[1],h=l[5],_=l[9],g=l[2],m=l[6],p=l[10];if(Math.abs(u-f)<.01&&Math.abs(d-g)<.01&&Math.abs(_-m)<.01){if(Math.abs(u+f)<.1&&Math.abs(d+g)<.1&&Math.abs(_+m)<.1&&Math.abs(c+h+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const x=(c+1)/2,v=(h+1)/2,T=(p+1)/2,M=(u+f)/4,E=(d+g)/4,P=(_+m)/4;return x>v&&x>T?x<.01?(n=0,i=.707106781,s=.707106781):(n=Math.sqrt(x),i=M/n,s=E/n):v>T?v<.01?(n=.707106781,i=0,s=.707106781):(i=Math.sqrt(v),n=M/i,s=P/i):T<.01?(n=.707106781,i=.707106781,s=0):(s=Math.sqrt(T),n=E/s,i=P/s),this.set(n,i,s,t),this}let S=Math.sqrt((m-_)*(m-_)+(d-g)*(d-g)+(f-u)*(f-u));return Math.abs(S)<.001&&(S=1),this.x=(m-_)/S,this.y=(d-g)/S,this.z=(f-u)/S,this.w=Math.acos((c+h+p-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Tt(this.x,e.x,t.x),this.y=Tt(this.y,e.y,t.y),this.z=Tt(this.z,e.z,t.z),this.w=Tt(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=Tt(this.x,e,t),this.y=Tt(this.y,e,t),this.z=Tt(this.z,e,t),this.w=Tt(this.w,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Tt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Mx extends Sa{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:xi,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new zt(0,0,e,t),this.scissorTest=!1,this.viewport=new zt(0,0,e,t);const i={width:e,height:t,depth:n.depth},s=new Mn(i);this.textures=[];const o=n.count;for(let a=0;a<o;a++)this.textures[a]=s.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(e={}){const t={minFilter:xi,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let i=0,s=this.textures.length;i<s;i++)this.textures[i].image.width=e,this.textures[i].image.height=t,this.textures[i].image.depth=n,this.textures[i].isArrayTexture=this.textures[i].image.depth>1;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const i=Object.assign({},e.textures[t].image);this.textures[t].source=new Ah(i)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class so extends Mx{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class w_ extends Mn{constructor(e=null,t=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=ti,this.minFilter=ti,this.wrapR=is,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class Ex extends Mn{constructor(e=null,t=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=ti,this.minFilter=ti,this.wrapR=is,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Ki{constructor(e=new G(1/0,1/0,1/0),t=new G(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Bi.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Bi.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=Bi.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const s=n.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=s.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,Bi):Bi.fromBufferAttribute(s,o),Bi.applyMatrix4(e.matrixWorld),this.expandByPoint(Bi);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Yl.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Yl.copy(n.boundingBox)),Yl.applyMatrix4(e.matrixWorld),this.union(Yl)}const i=e.children;for(let s=0,o=i.length;s<o;s++)this.expandByObject(i[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Bi),Bi.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Ca),jl.subVectors(this.max,Ca),xo.subVectors(e.a,Ca),bo.subVectors(e.b,Ca),So.subVectors(e.c,Ca),Yr.subVectors(bo,xo),jr.subVectors(So,bo),Ts.subVectors(xo,So);let t=[0,-Yr.z,Yr.y,0,-jr.z,jr.y,0,-Ts.z,Ts.y,Yr.z,0,-Yr.x,jr.z,0,-jr.x,Ts.z,0,-Ts.x,-Yr.y,Yr.x,0,-jr.y,jr.x,0,-Ts.y,Ts.x,0];return!Hu(t,xo,bo,So,jl)||(t=[1,0,0,0,1,0,0,0,1],!Hu(t,xo,bo,So,jl))?!1:($l.crossVectors(Yr,jr),t=[$l.x,$l.y,$l.z],Hu(t,xo,bo,So,jl))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Bi).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Bi).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(vr[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),vr[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),vr[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),vr[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),vr[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),vr[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),vr[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),vr[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(vr),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const vr=[new G,new G,new G,new G,new G,new G,new G,new G],Bi=new G,Yl=new Ki,xo=new G,bo=new G,So=new G,Yr=new G,jr=new G,Ts=new G,Ca=new G,jl=new G,$l=new G,As=new G;function Hu(r,e,t,n,i){for(let s=0,o=r.length-3;s<=o;s+=3){As.fromArray(r,s);const a=i.x*Math.abs(As.x)+i.y*Math.abs(As.y)+i.z*Math.abs(As.z),l=e.dot(As),c=t.dot(As),u=n.dot(As);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>a)return!1}return!0}const Tx=new Ki,Ra=new G,Vu=new G;class gr{constructor(e=new G,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):Tx.setFromPoints(e).getCenter(n);let i=0;for(let s=0,o=e.length;s<o;s++)i=Math.max(i,n.distanceToSquared(e[s]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Ra.subVectors(e,this.center);const t=Ra.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),i=(n-this.radius)*.5;this.center.addScaledVector(Ra,i/n),this.radius+=i}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Vu.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Ra.copy(e.center).add(Vu)),this.expandByPoint(Ra.copy(e.center).sub(Vu))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}const yr=new G,Gu=new G,Kl=new G,$r=new G,Wu=new G,Zl=new G,Xu=new G;class Mu{constructor(e=new G,t=new G(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,yr)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=yr.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(yr.copy(this.origin).addScaledVector(this.direction,t),yr.distanceToSquared(e))}distanceSqToSegment(e,t,n,i){Gu.copy(e).add(t).multiplyScalar(.5),Kl.copy(t).sub(e).normalize(),$r.copy(this.origin).sub(Gu);const s=e.distanceTo(t)*.5,o=-this.direction.dot(Kl),a=$r.dot(this.direction),l=-$r.dot(Kl),c=$r.lengthSq(),u=Math.abs(1-o*o);let d,f,h,_;if(u>0)if(d=o*l-a,f=o*a-l,_=s*u,d>=0)if(f>=-_)if(f<=_){const g=1/u;d*=g,f*=g,h=d*(d+o*f+2*a)+f*(o*d+f+2*l)+c}else f=s,d=Math.max(0,-(o*f+a)),h=-d*d+f*(f+2*l)+c;else f=-s,d=Math.max(0,-(o*f+a)),h=-d*d+f*(f+2*l)+c;else f<=-_?(d=Math.max(0,-(-o*s+a)),f=d>0?-s:Math.min(Math.max(-s,-l),s),h=-d*d+f*(f+2*l)+c):f<=_?(d=0,f=Math.min(Math.max(-s,-l),s),h=f*(f+2*l)+c):(d=Math.max(0,-(o*s+a)),f=d>0?s:Math.min(Math.max(-s,-l),s),h=-d*d+f*(f+2*l)+c);else f=o>0?-s:s,d=Math.max(0,-(o*f+a)),h=-d*d+f*(f+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,d),i&&i.copy(Gu).addScaledVector(Kl,f),h}intersectSphere(e,t){yr.subVectors(e.center,this.origin);const n=yr.dot(this.direction),i=yr.dot(yr)-n*n,s=e.radius*e.radius;if(i>s)return null;const o=Math.sqrt(s-i),a=n-o,l=n+o;return l<0?null:a<0?this.at(l,t):this.at(a,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,i,s,o,a,l;const c=1/this.direction.x,u=1/this.direction.y,d=1/this.direction.z,f=this.origin;return c>=0?(n=(e.min.x-f.x)*c,i=(e.max.x-f.x)*c):(n=(e.max.x-f.x)*c,i=(e.min.x-f.x)*c),u>=0?(s=(e.min.y-f.y)*u,o=(e.max.y-f.y)*u):(s=(e.max.y-f.y)*u,o=(e.min.y-f.y)*u),n>o||s>i||((s>n||isNaN(n))&&(n=s),(o<i||isNaN(i))&&(i=o),d>=0?(a=(e.min.z-f.z)*d,l=(e.max.z-f.z)*d):(a=(e.max.z-f.z)*d,l=(e.min.z-f.z)*d),n>l||a>i)||((a>n||n!==n)&&(n=a),(l<i||i!==i)&&(i=l),i<0)?null:this.at(n>=0?n:i,t)}intersectsBox(e){return this.intersectBox(e,yr)!==null}intersectTriangle(e,t,n,i,s){Wu.subVectors(t,e),Zl.subVectors(n,e),Xu.crossVectors(Wu,Zl);let o=this.direction.dot(Xu),a;if(o>0){if(i)return null;a=1}else if(o<0)a=-1,o=-o;else return null;$r.subVectors(this.origin,e);const l=a*this.direction.dot(Zl.crossVectors($r,Zl));if(l<0)return null;const c=a*this.direction.dot(Wu.cross($r));if(c<0||l+c>o)return null;const u=-a*$r.dot(Xu);return u<0?null:this.at(u/o,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class _t{constructor(e,t,n,i,s,o,a,l,c,u,d,f,h,_,g,m){_t.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,i,s,o,a,l,c,u,d,f,h,_,g,m)}set(e,t,n,i,s,o,a,l,c,u,d,f,h,_,g,m){const p=this.elements;return p[0]=e,p[4]=t,p[8]=n,p[12]=i,p[1]=s,p[5]=o,p[9]=a,p[13]=l,p[2]=c,p[6]=u,p[10]=d,p[14]=f,p[3]=h,p[7]=_,p[11]=g,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new _t().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,i=1/wo.setFromMatrixColumn(e,0).length(),s=1/wo.setFromMatrixColumn(e,1).length(),o=1/wo.setFromMatrixColumn(e,2).length();return t[0]=n[0]*i,t[1]=n[1]*i,t[2]=n[2]*i,t[3]=0,t[4]=n[4]*s,t[5]=n[5]*s,t[6]=n[6]*s,t[7]=0,t[8]=n[8]*o,t[9]=n[9]*o,t[10]=n[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,i=e.y,s=e.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(i),c=Math.sin(i),u=Math.cos(s),d=Math.sin(s);if(e.order==="XYZ"){const f=o*u,h=o*d,_=a*u,g=a*d;t[0]=l*u,t[4]=-l*d,t[8]=c,t[1]=h+_*c,t[5]=f-g*c,t[9]=-a*l,t[2]=g-f*c,t[6]=_+h*c,t[10]=o*l}else if(e.order==="YXZ"){const f=l*u,h=l*d,_=c*u,g=c*d;t[0]=f+g*a,t[4]=_*a-h,t[8]=o*c,t[1]=o*d,t[5]=o*u,t[9]=-a,t[2]=h*a-_,t[6]=g+f*a,t[10]=o*l}else if(e.order==="ZXY"){const f=l*u,h=l*d,_=c*u,g=c*d;t[0]=f-g*a,t[4]=-o*d,t[8]=_+h*a,t[1]=h+_*a,t[5]=o*u,t[9]=g-f*a,t[2]=-o*c,t[6]=a,t[10]=o*l}else if(e.order==="ZYX"){const f=o*u,h=o*d,_=a*u,g=a*d;t[0]=l*u,t[4]=_*c-h,t[8]=f*c+g,t[1]=l*d,t[5]=g*c+f,t[9]=h*c-_,t[2]=-c,t[6]=a*l,t[10]=o*l}else if(e.order==="YZX"){const f=o*l,h=o*c,_=a*l,g=a*c;t[0]=l*u,t[4]=g-f*d,t[8]=_*d+h,t[1]=d,t[5]=o*u,t[9]=-a*u,t[2]=-c*u,t[6]=h*d+_,t[10]=f-g*d}else if(e.order==="XZY"){const f=o*l,h=o*c,_=a*l,g=a*c;t[0]=l*u,t[4]=-d,t[8]=c*u,t[1]=f*d+g,t[5]=o*u,t[9]=h*d-_,t[2]=_*d-h,t[6]=a*u,t[10]=g*d+f}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Ax,e,Cx)}lookAt(e,t,n){const i=this.elements;return fi.subVectors(e,t),fi.lengthSq()===0&&(fi.z=1),fi.normalize(),Kr.crossVectors(n,fi),Kr.lengthSq()===0&&(Math.abs(n.z)===1?fi.x+=1e-4:fi.z+=1e-4,fi.normalize(),Kr.crossVectors(n,fi)),Kr.normalize(),Jl.crossVectors(fi,Kr),i[0]=Kr.x,i[4]=Jl.x,i[8]=fi.x,i[1]=Kr.y,i[5]=Jl.y,i[9]=fi.y,i[2]=Kr.z,i[6]=Jl.z,i[10]=fi.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,s=this.elements,o=n[0],a=n[4],l=n[8],c=n[12],u=n[1],d=n[5],f=n[9],h=n[13],_=n[2],g=n[6],m=n[10],p=n[14],S=n[3],x=n[7],v=n[11],T=n[15],M=i[0],E=i[4],P=i[8],y=i[12],b=i[1],D=i[5],B=i[9],U=i[13],K=i[2],F=i[6],C=i[10],J=i[14],X=i[3],me=i[7],I=i[11],_e=i[15];return s[0]=o*M+a*b+l*K+c*X,s[4]=o*E+a*D+l*F+c*me,s[8]=o*P+a*B+l*C+c*I,s[12]=o*y+a*U+l*J+c*_e,s[1]=u*M+d*b+f*K+h*X,s[5]=u*E+d*D+f*F+h*me,s[9]=u*P+d*B+f*C+h*I,s[13]=u*y+d*U+f*J+h*_e,s[2]=_*M+g*b+m*K+p*X,s[6]=_*E+g*D+m*F+p*me,s[10]=_*P+g*B+m*C+p*I,s[14]=_*y+g*U+m*J+p*_e,s[3]=S*M+x*b+v*K+T*X,s[7]=S*E+x*D+v*F+T*me,s[11]=S*P+x*B+v*C+T*I,s[15]=S*y+x*U+v*J+T*_e,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],i=e[8],s=e[12],o=e[1],a=e[5],l=e[9],c=e[13],u=e[2],d=e[6],f=e[10],h=e[14],_=e[3],g=e[7],m=e[11],p=e[15];return _*(+s*l*d-i*c*d-s*a*f+n*c*f+i*a*h-n*l*h)+g*(+t*l*h-t*c*f+s*o*f-i*o*h+i*c*u-s*l*u)+m*(+t*c*d-t*a*h-s*o*d+n*o*h+s*a*u-n*c*u)+p*(-i*a*u-t*l*d+t*a*f+i*o*d-n*o*f+n*l*u)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8],d=e[9],f=e[10],h=e[11],_=e[12],g=e[13],m=e[14],p=e[15],S=d*m*c-g*f*c+g*l*h-a*m*h-d*l*p+a*f*p,x=_*f*c-u*m*c-_*l*h+o*m*h+u*l*p-o*f*p,v=u*g*c-_*d*c+_*a*h-o*g*h-u*a*p+o*d*p,T=_*d*l-u*g*l-_*a*f+o*g*f+u*a*m-o*d*m,M=t*S+n*x+i*v+s*T;if(M===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const E=1/M;return e[0]=S*E,e[1]=(g*f*s-d*m*s-g*i*h+n*m*h+d*i*p-n*f*p)*E,e[2]=(a*m*s-g*l*s+g*i*c-n*m*c-a*i*p+n*l*p)*E,e[3]=(d*l*s-a*f*s-d*i*c+n*f*c+a*i*h-n*l*h)*E,e[4]=x*E,e[5]=(u*m*s-_*f*s+_*i*h-t*m*h-u*i*p+t*f*p)*E,e[6]=(_*l*s-o*m*s-_*i*c+t*m*c+o*i*p-t*l*p)*E,e[7]=(o*f*s-u*l*s+u*i*c-t*f*c-o*i*h+t*l*h)*E,e[8]=v*E,e[9]=(_*d*s-u*g*s-_*n*h+t*g*h+u*n*p-t*d*p)*E,e[10]=(o*g*s-_*a*s+_*n*c-t*g*c-o*n*p+t*a*p)*E,e[11]=(u*a*s-o*d*s-u*n*c+t*d*c+o*n*h-t*a*h)*E,e[12]=T*E,e[13]=(u*g*i-_*d*i+_*n*f-t*g*f-u*n*m+t*d*m)*E,e[14]=(_*a*i-o*g*i-_*n*l+t*g*l+o*n*m-t*a*m)*E,e[15]=(o*d*i-u*a*i+u*n*l-t*d*l-o*n*f+t*a*f)*E,this}scale(e){const t=this.elements,n=e.x,i=e.y,s=e.z;return t[0]*=n,t[4]*=i,t[8]*=s,t[1]*=n,t[5]*=i,t[9]*=s,t[2]*=n,t[6]*=i,t[10]*=s,t[3]*=n,t[7]*=i,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,i))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),i=Math.sin(t),s=1-n,o=e.x,a=e.y,l=e.z,c=s*o,u=s*a;return this.set(c*o+n,c*a-i*l,c*l+i*a,0,c*a+i*l,u*a+n,u*l-i*o,0,c*l-i*a,u*l+i*o,s*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,i,s,o){return this.set(1,n,s,0,e,1,o,0,t,i,1,0,0,0,0,1),this}compose(e,t,n){const i=this.elements,s=t._x,o=t._y,a=t._z,l=t._w,c=s+s,u=o+o,d=a+a,f=s*c,h=s*u,_=s*d,g=o*u,m=o*d,p=a*d,S=l*c,x=l*u,v=l*d,T=n.x,M=n.y,E=n.z;return i[0]=(1-(g+p))*T,i[1]=(h+v)*T,i[2]=(_-x)*T,i[3]=0,i[4]=(h-v)*M,i[5]=(1-(f+p))*M,i[6]=(m+S)*M,i[7]=0,i[8]=(_+x)*E,i[9]=(m-S)*E,i[10]=(1-(f+g))*E,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,n){const i=this.elements;let s=wo.set(i[0],i[1],i[2]).length();const o=wo.set(i[4],i[5],i[6]).length(),a=wo.set(i[8],i[9],i[10]).length();this.determinant()<0&&(s=-s),e.x=i[12],e.y=i[13],e.z=i[14],zi.copy(this);const c=1/s,u=1/o,d=1/a;return zi.elements[0]*=c,zi.elements[1]*=c,zi.elements[2]*=c,zi.elements[4]*=u,zi.elements[5]*=u,zi.elements[6]*=u,zi.elements[8]*=d,zi.elements[9]*=d,zi.elements[10]*=d,t.setFromRotationMatrix(zi),n.x=s,n.y=o,n.z=a,this}makePerspective(e,t,n,i,s,o,a=Dr){const l=this.elements,c=2*s/(t-e),u=2*s/(n-i),d=(t+e)/(t-e),f=(n+i)/(n-i);let h,_;if(a===Dr)h=-(o+s)/(o-s),_=-2*o*s/(o-s);else if(a===su)h=-o/(o-s),_=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=c,l[4]=0,l[8]=d,l[12]=0,l[1]=0,l[5]=u,l[9]=f,l[13]=0,l[2]=0,l[6]=0,l[10]=h,l[14]=_,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,i,s,o,a=Dr){const l=this.elements,c=1/(t-e),u=1/(n-i),d=1/(o-s),f=(t+e)*c,h=(n+i)*u;let _,g;if(a===Dr)_=(o+s)*d,g=-2*d;else if(a===su)_=s*d,g=-1*d;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-f,l[1]=0,l[5]=2*u,l[9]=0,l[13]=-h,l[2]=0,l[6]=0,l[10]=g,l[14]=-_,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<16;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const wo=new G,zi=new _t,Ax=new G(0,0,0),Cx=new G(1,1,1),Kr=new G,Jl=new G,fi=new G,Fp=new _t,kp=new Ss;class pr{constructor(e=0,t=0,n=0,i=pr.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,i=this._order){return this._x=e,this._y=t,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const i=e.elements,s=i[0],o=i[4],a=i[8],l=i[1],c=i[5],u=i[9],d=i[2],f=i[6],h=i[10];switch(t){case"XYZ":this._y=Math.asin(Tt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,h),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(f,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Tt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,h),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,s),this._z=0);break;case"ZXY":this._x=Math.asin(Tt(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-d,h),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-Tt(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(f,h),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(Tt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-d,s)):(this._x=0,this._y=Math.atan2(a,h));break;case"XZY":this._z=Math.asin(-Tt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(f,c),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-u,h),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Fp.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Fp,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return kp.setFromEuler(this),this.setFromQuaternion(kp,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}pr.DEFAULT_ORDER="XYZ";class M_{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Rx=0;const Bp=new G,Mo=new Ss,xr=new _t,Ql=new G,Pa=new G,Px=new G,Lx=new Ss,zp=new G(1,0,0),Hp=new G(0,1,0),Vp=new G(0,0,1),Gp={type:"added"},Dx={type:"removed"},Eo={type:"childadded",child:null},qu={type:"childremoved",child:null};class cn extends Sa{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Rx++}),this.uuid=ji(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=cn.DEFAULT_UP.clone();const e=new G,t=new pr,n=new Ss,i=new G(1,1,1);function s(){n.setFromEuler(t,!1)}function o(){t.setFromQuaternion(n,void 0,!1)}t._onChange(s),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new _t},normalMatrix:{value:new gt}}),this.matrix=new _t,this.matrixWorld=new _t,this.matrixAutoUpdate=cn.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=cn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new M_,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Mo.setFromAxisAngle(e,t),this.quaternion.multiply(Mo),this}rotateOnWorldAxis(e,t){return Mo.setFromAxisAngle(e,t),this.quaternion.premultiply(Mo),this}rotateX(e){return this.rotateOnAxis(zp,e)}rotateY(e){return this.rotateOnAxis(Hp,e)}rotateZ(e){return this.rotateOnAxis(Vp,e)}translateOnAxis(e,t){return Bp.copy(e).applyQuaternion(this.quaternion),this.position.add(Bp.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(zp,e)}translateY(e){return this.translateOnAxis(Hp,e)}translateZ(e){return this.translateOnAxis(Vp,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(xr.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Ql.copy(e):Ql.set(e,t,n);const i=this.parent;this.updateWorldMatrix(!0,!1),Pa.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?xr.lookAt(Pa,Ql,this.up):xr.lookAt(Ql,Pa,this.up),this.quaternion.setFromRotationMatrix(xr),i&&(xr.extractRotation(i.matrixWorld),Mo.setFromRotationMatrix(xr),this.quaternion.premultiply(Mo.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Gp),Eo.child=e,this.dispatchEvent(Eo),Eo.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Dx),qu.child=e,this.dispatchEvent(qu),qu.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),xr.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),xr.multiply(e.parent.matrixWorld)),e.applyMatrix4(xr),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Gp),Eo.child=e,this.dispatchEvent(Eo),Eo.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,i=this.children.length;n<i;n++){const o=this.children[n].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const i=this.children;for(let s=0,o=i.length;s<o;s++)i[s].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Pa,e,Px),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Pa,Lx,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const i=this.children;for(let s=0,o=i.length;s<o;s++)i[s].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),i.instanceInfo=this._instanceInfo.map(a=>({...a})),i.availableInstanceIds=this._availableInstanceIds.slice(),i.availableGeometryIds=this._availableGeometryIds.slice(),i.nextIndexStart=this._nextIndexStart,i.nextVertexStart=this._nextVertexStart,i.geometryCount=this._geometryCount,i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.matricesTexture=this._matricesTexture.toJSON(e),i.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(i.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(i.boundingBox=this.boundingBox.toJSON()));function s(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=s(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const d=l[c];s(e.shapes,d)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(s(e.materials,this.material[l]));i.material=a}else i.material=s(e.materials,this.material);if(this.children.length>0){i.children=[];for(let a=0;a<this.children.length;a++)i.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];i.animations.push(s(e.animations,l))}}if(t){const a=o(e.geometries),l=o(e.materials),c=o(e.textures),u=o(e.images),d=o(e.shapes),f=o(e.skeletons),h=o(e.animations),_=o(e.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),u.length>0&&(n.images=u),d.length>0&&(n.shapes=d),f.length>0&&(n.skeletons=f),h.length>0&&(n.animations=h),_.length>0&&(n.nodes=_)}return n.object=i,n;function o(a){const l=[];for(const c in a){const u=a[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const i=e.children[n];this.add(i.clone())}return this}}cn.DEFAULT_UP=new G(0,1,0);cn.DEFAULT_MATRIX_AUTO_UPDATE=!0;cn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Hi=new G,br=new G,Yu=new G,Sr=new G,To=new G,Ao=new G,Wp=new G,ju=new G,$u=new G,Ku=new G,Zu=new zt,Ju=new zt,Qu=new zt;class Xi{constructor(e=new G,t=new G,n=new G){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,i){i.subVectors(n,t),Hi.subVectors(e,t),i.cross(Hi);const s=i.lengthSq();return s>0?i.multiplyScalar(1/Math.sqrt(s)):i.set(0,0,0)}static getBarycoord(e,t,n,i,s){Hi.subVectors(i,t),br.subVectors(n,t),Yu.subVectors(e,t);const o=Hi.dot(Hi),a=Hi.dot(br),l=Hi.dot(Yu),c=br.dot(br),u=br.dot(Yu),d=o*c-a*a;if(d===0)return s.set(0,0,0),null;const f=1/d,h=(c*l-a*u)*f,_=(o*u-a*l)*f;return s.set(1-h-_,_,h)}static containsPoint(e,t,n,i){return this.getBarycoord(e,t,n,i,Sr)===null?!1:Sr.x>=0&&Sr.y>=0&&Sr.x+Sr.y<=1}static getInterpolation(e,t,n,i,s,o,a,l){return this.getBarycoord(e,t,n,i,Sr)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,Sr.x),l.addScaledVector(o,Sr.y),l.addScaledVector(a,Sr.z),l)}static getInterpolatedAttribute(e,t,n,i,s,o){return Zu.setScalar(0),Ju.setScalar(0),Qu.setScalar(0),Zu.fromBufferAttribute(e,t),Ju.fromBufferAttribute(e,n),Qu.fromBufferAttribute(e,i),o.setScalar(0),o.addScaledVector(Zu,s.x),o.addScaledVector(Ju,s.y),o.addScaledVector(Qu,s.z),o}static isFrontFacing(e,t,n,i){return Hi.subVectors(n,t),br.subVectors(e,t),Hi.cross(br).dot(i)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,i){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,t,n,i){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Hi.subVectors(this.c,this.b),br.subVectors(this.a,this.b),Hi.cross(br).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Xi.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Xi.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,i,s){return Xi.getInterpolation(e,this.a,this.b,this.c,t,n,i,s)}containsPoint(e){return Xi.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Xi.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,i=this.b,s=this.c;let o,a;To.subVectors(i,n),Ao.subVectors(s,n),ju.subVectors(e,n);const l=To.dot(ju),c=Ao.dot(ju);if(l<=0&&c<=0)return t.copy(n);$u.subVectors(e,i);const u=To.dot($u),d=Ao.dot($u);if(u>=0&&d<=u)return t.copy(i);const f=l*d-u*c;if(f<=0&&l>=0&&u<=0)return o=l/(l-u),t.copy(n).addScaledVector(To,o);Ku.subVectors(e,s);const h=To.dot(Ku),_=Ao.dot(Ku);if(_>=0&&h<=_)return t.copy(s);const g=h*c-l*_;if(g<=0&&c>=0&&_<=0)return a=c/(c-_),t.copy(n).addScaledVector(Ao,a);const m=u*_-h*d;if(m<=0&&d-u>=0&&h-_>=0)return Wp.subVectors(s,i),a=(d-u)/(d-u+(h-_)),t.copy(i).addScaledVector(Wp,a);const p=1/(m+g+f);return o=g*p,a=f*p,t.copy(n).addScaledVector(To,o).addScaledVector(Ao,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const E_={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Zr={h:0,s:0,l:0},ec={h:0,s:0,l:0};function ed(r,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?r+(e-r)*6*t:t<1/2?e:t<2/3?r+(e-r)*6*(2/3-t):r}let Je=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const i=e;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=On){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Nt.colorSpaceToWorking(this,t),this}setRGB(e,t,n,i=Nt.workingColorSpace){return this.r=e,this.g=t,this.b=n,Nt.colorSpaceToWorking(this,i),this}setHSL(e,t,n,i=Nt.workingColorSpace){if(e=Th(e,1),t=Tt(t,0,1),n=Tt(n,0,1),t===0)this.r=this.g=this.b=n;else{const s=n<=.5?n*(1+t):n+t-n*t,o=2*n-s;this.r=ed(o,s,e+1/3),this.g=ed(o,s,e),this.b=ed(o,s,e-1/3)}return Nt.colorSpaceToWorking(this,i),this}setStyle(e,t=On){function n(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const o=i[1],a=i[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=i[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(s,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=On){const n=E_[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Fr(e.r),this.g=Fr(e.g),this.b=Fr(e.b),this}copyLinearToSRGB(e){return this.r=$o(e.r),this.g=$o(e.g),this.b=$o(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=On){return Nt.workingToColorSpace(Bn.copy(this),e),Math.round(Tt(Bn.r*255,0,255))*65536+Math.round(Tt(Bn.g*255,0,255))*256+Math.round(Tt(Bn.b*255,0,255))}getHexString(e=On){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Nt.workingColorSpace){Nt.workingToColorSpace(Bn.copy(this),t);const n=Bn.r,i=Bn.g,s=Bn.b,o=Math.max(n,i,s),a=Math.min(n,i,s);let l,c;const u=(a+o)/2;if(a===o)l=0,c=0;else{const d=o-a;switch(c=u<=.5?d/(o+a):d/(2-o-a),o){case n:l=(i-s)/d+(i<s?6:0);break;case i:l=(s-n)/d+2;break;case s:l=(n-i)/d+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,t=Nt.workingColorSpace){return Nt.workingToColorSpace(Bn.copy(this),t),e.r=Bn.r,e.g=Bn.g,e.b=Bn.b,e}getStyle(e=On){Nt.workingToColorSpace(Bn.copy(this),e);const t=Bn.r,n=Bn.g,i=Bn.b;return e!==On?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(e,t,n){return this.getHSL(Zr),this.setHSL(Zr.h+e,Zr.s+t,Zr.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Zr),e.getHSL(ec);const n=il(Zr.h,ec.h,t),i=il(Zr.s,ec.s,t),s=il(Zr.l,ec.l,t);return this.setHSL(n,i,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,i=this.b,s=e.elements;return this.r=s[0]*t+s[3]*n+s[6]*i,this.g=s[1]*t+s[4]*n+s[7]*i,this.b=s[2]*t+s[5]*n+s[8]*i,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}};const Bn=new Je;Je.NAMES=E_;let Ix=0;class ur extends Sa{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Ix++}),this.uuid=ji(),this.name="",this.type="Material",this.blending=fs,this.side=zr,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=zd,this.blendDst=Hd,this.blendEquation=Vs,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Je(0,0,0),this.blendAlpha=0,this.depthFunc=oa,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Pp,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=vo,this.stencilZFail=vo,this.stencilZPass=vo,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const i=this[t];if(i===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==fs&&(n.blending=this.blending),this.side!==zr&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==zd&&(n.blendSrc=this.blendSrc),this.blendDst!==Hd&&(n.blendDst=this.blendDst),this.blendEquation!==Vs&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==oa&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Pp&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==vo&&(n.stencilFail=this.stencilFail),this.stencilZFail!==vo&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==vo&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(s){const o=[];for(const a in s){const l=s[a];delete l.metadata,o.push(l)}return o}if(t){const s=i(e.textures),o=i(e.images);s.length>0&&(n.textures=s),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const i=t.length;n=new Array(i);for(let s=0;s!==i;++s)n[s]=t[s].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class Ws extends ur{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Je(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new pr,this.combine=c_,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const vn=new G,tc=new Ct;let Ox=0;class Wt{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Ox++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Ef,this.updateRanges=[],this.gpuType=Yi,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let i=0,s=this.itemSize;i<s;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)tc.fromBufferAttribute(this,t),tc.applyMatrix3(e),this.setXY(t,tc.x,tc.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)vn.fromBufferAttribute(this,t),vn.applyMatrix3(e),this.setXYZ(t,vn.x,vn.y,vn.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)vn.fromBufferAttribute(this,t),vn.applyMatrix4(e),this.setXYZ(t,vn.x,vn.y,vn.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)vn.fromBufferAttribute(this,t),vn.applyNormalMatrix(e),this.setXYZ(t,vn.x,vn.y,vn.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)vn.fromBufferAttribute(this,t),vn.transformDirection(e),this.setXYZ(t,vn.x,vn.y,vn.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Wi(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Gt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Wi(t,this.array)),t}setX(e,t){return this.normalized&&(t=Gt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Wi(t,this.array)),t}setY(e,t){return this.normalized&&(t=Gt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Wi(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Gt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Wi(t,this.array)),t}setW(e,t){return this.normalized&&(t=Gt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Gt(t,this.array),n=Gt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=Gt(t,this.array),n=Gt(n,this.array),i=Gt(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this}setXYZW(e,t,n,i,s){return e*=this.itemSize,this.normalized&&(t=Gt(t,this.array),n=Gt(n,this.array),i=Gt(i,this.array),s=Gt(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Ef&&(e.usage=this.usage),e}}class T_ extends Wt{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class A_ extends Wt{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class kr extends Wt{constructor(e,t,n){super(new Float32Array(e),t,n)}}let Nx=0;const Ti=new _t,td=new cn,Co=new G,hi=new Ki,La=new Ki,An=new G;class ki extends Sa{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Nx++}),this.uuid=ji(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(S_(e)?A_:T_)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const s=new gt().getNormalMatrix(e);n.applyNormalMatrix(s),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Ti.makeRotationFromQuaternion(e),this.applyMatrix4(Ti),this}rotateX(e){return Ti.makeRotationX(e),this.applyMatrix4(Ti),this}rotateY(e){return Ti.makeRotationY(e),this.applyMatrix4(Ti),this}rotateZ(e){return Ti.makeRotationZ(e),this.applyMatrix4(Ti),this}translate(e,t,n){return Ti.makeTranslation(e,t,n),this.applyMatrix4(Ti),this}scale(e,t,n){return Ti.makeScale(e,t,n),this.applyMatrix4(Ti),this}lookAt(e){return td.lookAt(e),td.updateMatrix(),this.applyMatrix4(td.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Co).negate(),this.translate(Co.x,Co.y,Co.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let i=0,s=e.length;i<s;i++){const o=e[i];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new kr(n,3))}else{const n=Math.min(e.length,t.count);for(let i=0;i<n;i++){const s=e[i];t.setXYZ(i,s.x,s.y,s.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Ki);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new G(-1/0,-1/0,-1/0),new G(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,i=t.length;n<i;n++){const s=t[n];hi.setFromBufferAttribute(s),this.morphTargetsRelative?(An.addVectors(this.boundingBox.min,hi.min),this.boundingBox.expandByPoint(An),An.addVectors(this.boundingBox.max,hi.max),this.boundingBox.expandByPoint(An)):(this.boundingBox.expandByPoint(hi.min),this.boundingBox.expandByPoint(hi.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new gr);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new G,1/0);return}if(e){const n=this.boundingSphere.center;if(hi.setFromBufferAttribute(e),t)for(let s=0,o=t.length;s<o;s++){const a=t[s];La.setFromBufferAttribute(a),this.morphTargetsRelative?(An.addVectors(hi.min,La.min),hi.expandByPoint(An),An.addVectors(hi.max,La.max),hi.expandByPoint(An)):(hi.expandByPoint(La.min),hi.expandByPoint(La.max))}hi.getCenter(n);let i=0;for(let s=0,o=e.count;s<o;s++)An.fromBufferAttribute(e,s),i=Math.max(i,n.distanceToSquared(An));if(t)for(let s=0,o=t.length;s<o;s++){const a=t[s],l=this.morphTargetsRelative;for(let c=0,u=a.count;c<u;c++)An.fromBufferAttribute(a,c),l&&(Co.fromBufferAttribute(e,c),An.add(Co)),i=Math.max(i,n.distanceToSquared(An))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,i=t.normal,s=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Wt(new Float32Array(4*n.count),4));const o=this.getAttribute("tangent"),a=[],l=[];for(let P=0;P<n.count;P++)a[P]=new G,l[P]=new G;const c=new G,u=new G,d=new G,f=new Ct,h=new Ct,_=new Ct,g=new G,m=new G;function p(P,y,b){c.fromBufferAttribute(n,P),u.fromBufferAttribute(n,y),d.fromBufferAttribute(n,b),f.fromBufferAttribute(s,P),h.fromBufferAttribute(s,y),_.fromBufferAttribute(s,b),u.sub(c),d.sub(c),h.sub(f),_.sub(f);const D=1/(h.x*_.y-_.x*h.y);isFinite(D)&&(g.copy(u).multiplyScalar(_.y).addScaledVector(d,-h.y).multiplyScalar(D),m.copy(d).multiplyScalar(h.x).addScaledVector(u,-_.x).multiplyScalar(D),a[P].add(g),a[y].add(g),a[b].add(g),l[P].add(m),l[y].add(m),l[b].add(m))}let S=this.groups;S.length===0&&(S=[{start:0,count:e.count}]);for(let P=0,y=S.length;P<y;++P){const b=S[P],D=b.start,B=b.count;for(let U=D,K=D+B;U<K;U+=3)p(e.getX(U+0),e.getX(U+1),e.getX(U+2))}const x=new G,v=new G,T=new G,M=new G;function E(P){T.fromBufferAttribute(i,P),M.copy(T);const y=a[P];x.copy(y),x.sub(T.multiplyScalar(T.dot(y))).normalize(),v.crossVectors(M,y);const D=v.dot(l[P])<0?-1:1;o.setXYZW(P,x.x,x.y,x.z,D)}for(let P=0,y=S.length;P<y;++P){const b=S[P],D=b.start,B=b.count;for(let U=D,K=D+B;U<K;U+=3)E(e.getX(U+0)),E(e.getX(U+1)),E(e.getX(U+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Wt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let f=0,h=n.count;f<h;f++)n.setXYZ(f,0,0,0);const i=new G,s=new G,o=new G,a=new G,l=new G,c=new G,u=new G,d=new G;if(e)for(let f=0,h=e.count;f<h;f+=3){const _=e.getX(f+0),g=e.getX(f+1),m=e.getX(f+2);i.fromBufferAttribute(t,_),s.fromBufferAttribute(t,g),o.fromBufferAttribute(t,m),u.subVectors(o,s),d.subVectors(i,s),u.cross(d),a.fromBufferAttribute(n,_),l.fromBufferAttribute(n,g),c.fromBufferAttribute(n,m),a.add(u),l.add(u),c.add(u),n.setXYZ(_,a.x,a.y,a.z),n.setXYZ(g,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let f=0,h=t.count;f<h;f+=3)i.fromBufferAttribute(t,f+0),s.fromBufferAttribute(t,f+1),o.fromBufferAttribute(t,f+2),u.subVectors(o,s),d.subVectors(i,s),u.cross(d),n.setXYZ(f+0,u.x,u.y,u.z),n.setXYZ(f+1,u.x,u.y,u.z),n.setXYZ(f+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)An.fromBufferAttribute(e,t),An.normalize(),e.setXYZ(t,An.x,An.y,An.z)}toNonIndexed(){function e(a,l){const c=a.array,u=a.itemSize,d=a.normalized,f=new c.constructor(l.length*u);let h=0,_=0;for(let g=0,m=l.length;g<m;g++){a.isInterleavedBufferAttribute?h=l[g]*a.data.stride+a.offset:h=l[g]*u;for(let p=0;p<u;p++)f[_++]=c[h++]}return new Wt(f,u,d)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new ki,n=this.index.array,i=this.attributes;for(const a in i){const l=i[a],c=e(l,n);t.setAttribute(a,c)}const s=this.morphAttributes;for(const a in s){const l=[],c=s[a];for(let u=0,d=c.length;u<d;u++){const f=c[u],h=e(f,n);l.push(h)}t.morphAttributes[a]=l}t.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const l in n){const c=n[l];e.data.attributes[l]=c.toJSON(e.data)}const i={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let d=0,f=c.length;d<f;d++){const h=c[d];u.push(h.toJSON(e.data))}u.length>0&&(i[l]=u,s=!0)}s&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere=a.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone());const i=e.attributes;for(const c in i){const u=i[c];this.setAttribute(c,u.clone(t))}const s=e.morphAttributes;for(const c in s){const u=[],d=s[c];for(let f=0,h=d.length;f<h;f++)u.push(d[f].clone(t));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let c=0,u=o.length;c<u;c++){const d=o[c];this.addGroup(d.start,d.count,d.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Xp=new _t,Cs=new Mu,nc=new gr,qp=new G,ic=new G,rc=new G,sc=new G,nd=new G,oc=new G,Yp=new G,ac=new G;class ei extends cn{constructor(e=new ki,t=new Ws){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=i.length;s<o;s++){const a=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(e,t){const n=this.geometry,i=n.attributes.position,s=n.morphAttributes.position,o=n.morphTargetsRelative;t.fromBufferAttribute(i,e);const a=this.morphTargetInfluences;if(s&&a){oc.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const u=a[l],d=s[l];u!==0&&(nd.fromBufferAttribute(d,e),o?oc.addScaledVector(nd,u):oc.addScaledVector(nd.sub(t),u))}t.add(oc)}return t}raycast(e,t){const n=this.geometry,i=this.material,s=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),nc.copy(n.boundingSphere),nc.applyMatrix4(s),Cs.copy(e.ray).recast(e.near),!(nc.containsPoint(Cs.origin)===!1&&(Cs.intersectSphere(nc,qp)===null||Cs.origin.distanceToSquared(qp)>(e.far-e.near)**2))&&(Xp.copy(s).invert(),Cs.copy(e.ray).applyMatrix4(Xp),!(n.boundingBox!==null&&Cs.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Cs)))}_computeIntersections(e,t,n){let i;const s=this.geometry,o=this.material,a=s.index,l=s.attributes.position,c=s.attributes.uv,u=s.attributes.uv1,d=s.attributes.normal,f=s.groups,h=s.drawRange;if(a!==null)if(Array.isArray(o))for(let _=0,g=f.length;_<g;_++){const m=f[_],p=o[m.materialIndex],S=Math.max(m.start,h.start),x=Math.min(a.count,Math.min(m.start+m.count,h.start+h.count));for(let v=S,T=x;v<T;v+=3){const M=a.getX(v),E=a.getX(v+1),P=a.getX(v+2);i=lc(this,p,e,n,c,u,d,M,E,P),i&&(i.faceIndex=Math.floor(v/3),i.face.materialIndex=m.materialIndex,t.push(i))}}else{const _=Math.max(0,h.start),g=Math.min(a.count,h.start+h.count);for(let m=_,p=g;m<p;m+=3){const S=a.getX(m),x=a.getX(m+1),v=a.getX(m+2);i=lc(this,o,e,n,c,u,d,S,x,v),i&&(i.faceIndex=Math.floor(m/3),t.push(i))}}else if(l!==void 0)if(Array.isArray(o))for(let _=0,g=f.length;_<g;_++){const m=f[_],p=o[m.materialIndex],S=Math.max(m.start,h.start),x=Math.min(l.count,Math.min(m.start+m.count,h.start+h.count));for(let v=S,T=x;v<T;v+=3){const M=v,E=v+1,P=v+2;i=lc(this,p,e,n,c,u,d,M,E,P),i&&(i.faceIndex=Math.floor(v/3),i.face.materialIndex=m.materialIndex,t.push(i))}}else{const _=Math.max(0,h.start),g=Math.min(l.count,h.start+h.count);for(let m=_,p=g;m<p;m+=3){const S=m,x=m+1,v=m+2;i=lc(this,o,e,n,c,u,d,S,x,v),i&&(i.faceIndex=Math.floor(m/3),t.push(i))}}}}function Ux(r,e,t,n,i,s,o,a){let l;if(e.side===si?l=n.intersectTriangle(o,s,i,!0,a):l=n.intersectTriangle(i,s,o,e.side===zr,a),l===null)return null;ac.copy(a),ac.applyMatrix4(r.matrixWorld);const c=t.ray.origin.distanceTo(ac);return c<t.near||c>t.far?null:{distance:c,point:ac.clone(),object:r}}function lc(r,e,t,n,i,s,o,a,l,c){r.getVertexPosition(a,ic),r.getVertexPosition(l,rc),r.getVertexPosition(c,sc);const u=Ux(r,e,t,n,ic,rc,sc,Yp);if(u){const d=new G;Xi.getBarycoord(Yp,ic,rc,sc,d),i&&(u.uv=Xi.getInterpolatedAttribute(i,a,l,c,d,new Ct)),s&&(u.uv1=Xi.getInterpolatedAttribute(s,a,l,c,d,new Ct)),o&&(u.normal=Xi.getInterpolatedAttribute(o,a,l,c,d,new G),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));const f={a,b:l,c,normal:new G,materialIndex:0};Xi.getNormal(ic,rc,sc,f.normal),u.face=f,u.barycoord=d}return u}class Vl extends ki{constructor(e=1,t=1,n=1,i=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:i,heightSegments:s,depthSegments:o};const a=this;i=Math.floor(i),s=Math.floor(s),o=Math.floor(o);const l=[],c=[],u=[],d=[];let f=0,h=0;_("z","y","x",-1,-1,n,t,e,o,s,0),_("z","y","x",1,-1,n,t,-e,o,s,1),_("x","z","y",1,1,e,n,t,i,o,2),_("x","z","y",1,-1,e,n,-t,i,o,3),_("x","y","z",1,-1,e,t,n,i,s,4),_("x","y","z",-1,-1,e,t,-n,i,s,5),this.setIndex(l),this.setAttribute("position",new kr(c,3)),this.setAttribute("normal",new kr(u,3)),this.setAttribute("uv",new kr(d,2));function _(g,m,p,S,x,v,T,M,E,P,y){const b=v/E,D=T/P,B=v/2,U=T/2,K=M/2,F=E+1,C=P+1;let J=0,X=0;const me=new G;for(let I=0;I<C;I++){const _e=I*D-U;for(let Y=0;Y<F;Y++){const Re=Y*b-B;me[g]=Re*S,me[m]=_e*x,me[p]=K,c.push(me.x,me.y,me.z),me[g]=0,me[m]=0,me[p]=M>0?1:-1,u.push(me.x,me.y,me.z),d.push(Y/E),d.push(1-I/P),J+=1}}for(let I=0;I<P;I++)for(let _e=0;_e<E;_e++){const Y=f+_e+F*I,Re=f+_e+F*(I+1),Q=f+(_e+1)+F*(I+1),se=f+(_e+1)+F*I;l.push(Y,Re,se),l.push(Re,Q,se),X+=6}a.addGroup(h,X,y),h+=X,f+=J}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Vl(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function da(r){const e={};for(const t in r){e[t]={};for(const n in r[t]){const i=r[t][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=i.clone():Array.isArray(i)?e[t][n]=i.slice():e[t][n]=i}}return e}function jn(r){const e={};for(let t=0;t<r.length;t++){const n=da(r[t]);for(const i in n)e[i]=n[i]}return e}function Fx(r){const e=[];for(let t=0;t<r.length;t++)e.push(r[t].clone());return e}function C_(r){const e=r.getRenderTarget();return e===null?r.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Nt.workingColorSpace}const kx={clone:da,merge:jn};var Bx=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,zx=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Oi extends ur{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Bx,this.fragmentShader=zx,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=da(e.uniforms),this.uniformsGroups=Fx(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const i in this.uniforms){const o=this.uniforms[i].value;o&&o.isTexture?t.uniforms[i]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[i]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[i]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[i]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[i]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[i]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[i]={type:"m4",value:o.toArray()}:t.uniforms[i]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class R_ extends cn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new _t,this.projectionMatrix=new _t,this.projectionMatrixInverse=new _t,this.coordinateSystem=Dr}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Jr=new G,jp=new Ct,$p=new Ct;class ri extends R_{constructor(e=50,t=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=ua*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(nl*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return ua*2*Math.atan(Math.tan(nl*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Jr.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Jr.x,Jr.y).multiplyScalar(-e/Jr.z),Jr.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Jr.x,Jr.y).multiplyScalar(-e/Jr.z)}getViewSize(e,t){return this.getViewBounds(e,jp,$p),t.subVectors($p,jp)}setViewOffset(e,t,n,i,s,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(nl*.5*this.fov)/this.zoom,n=2*t,i=this.aspect*n,s=-.5*i;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;s+=o.offsetX*i/l,t-=o.offsetY*n/c,i*=o.width/l,n*=o.height/c}const a=this.filmOffset;a!==0&&(s+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+i,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const Ro=-90,Po=1;class Hx extends cn{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const i=new ri(Ro,Po,e,t);i.layers=this.layers,this.add(i);const s=new ri(Ro,Po,e,t);s.layers=this.layers,this.add(s);const o=new ri(Ro,Po,e,t);o.layers=this.layers,this.add(o);const a=new ri(Ro,Po,e,t);a.layers=this.layers,this.add(a);const l=new ri(Ro,Po,e,t);l.layers=this.layers,this.add(l);const c=new ri(Ro,Po,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,i,s,o,a,l]=t;for(const c of t)this.remove(c);if(e===Dr)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===su)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,o,a,l,c,u]=this.children,d=e.getRenderTarget(),f=e.getActiveCubeFace(),h=e.getActiveMipmapLevel(),_=e.xr.enabled;e.xr.enabled=!1;const g=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,i),e.render(t,s),e.setRenderTarget(n,1,i),e.render(t,o),e.setRenderTarget(n,2,i),e.render(t,a),e.setRenderTarget(n,3,i),e.render(t,l),e.setRenderTarget(n,4,i),e.render(t,c),n.texture.generateMipmaps=g,e.setRenderTarget(n,5,i),e.render(t,u),e.setRenderTarget(d,f,h),e.xr.enabled=_,n.texture.needsPMREMUpdate=!0}}class P_ extends Mn{constructor(e=[],t=aa,n,i,s,o,a,l,c,u){super(e,t,n,i,s,o,a,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Vx extends so{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},i=[n,n,n,n,n,n];this.texture=new P_(i),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},i=new Vl(5,5,5),s=new Oi({name:"CubemapFromEquirect",uniforms:da(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:si,blending:ds});s.uniforms.tEquirect.value=t;const o=new ei(i,s),a=t.minFilter;return t.minFilter===Lr&&(t.minFilter=xi),new Hx(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t=!0,n=!0,i=!0){const s=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,n,i);e.setRenderTarget(s)}}class Ir extends cn{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Gx={type:"move"};class id{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ir,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ir,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new G,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new G),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ir,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new G,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new G),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let i=null,s=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){o=!0;for(const g of e.hand.values()){const m=t.getJointPose(g,n),p=this._getHandJoint(c,g);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const u=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],f=u.position.distanceTo(d.position),h=.02,_=.005;c.inputState.pinching&&f>h+_?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&f<=h-_&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,n),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(i=t.getPose(e.targetRaySpace,n),i===null&&s!==null&&(i=s),i!==null&&(a.matrix.fromArray(i.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,i.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(i.linearVelocity)):a.hasLinearVelocity=!1,i.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(i.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Gx)))}return a!==null&&(a.visible=i!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new Ir;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}class Kp extends cn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new pr,this.environmentIntensity=1,this.environmentRotation=new pr,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class Wx{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Ef,this.updateRanges=[],this.version=0,this.uuid=ji()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let i=0,s=this.stride;i<s;i++)this.array[e+i]=t.array[n+i];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=ji()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=ji()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const Xn=new G;class Ch{constructor(e,t,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)Xn.fromBufferAttribute(this,t),Xn.applyMatrix4(e),this.setXYZ(t,Xn.x,Xn.y,Xn.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Xn.fromBufferAttribute(this,t),Xn.applyNormalMatrix(e),this.setXYZ(t,Xn.x,Xn.y,Xn.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Xn.fromBufferAttribute(this,t),Xn.transformDirection(e),this.setXYZ(t,Xn.x,Xn.y,Xn.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=Wi(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Gt(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=Gt(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=Gt(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=Gt(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=Gt(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=Wi(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=Wi(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=Wi(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=Wi(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=Gt(t,this.array),n=Gt(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=Gt(t,this.array),n=Gt(n,this.array),i=Gt(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this}setXYZW(e,t,n,i,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=Gt(t,this.array),n=Gt(n,this.array),i=Gt(i,this.array),s=Gt(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this.data.array[e+3]=s,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[i+s])}return new Wt(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new Ch(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[i+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}const Zp=new G,Jp=new zt,Qp=new zt,Xx=new G,em=new _t,cc=new G,rd=new gr,tm=new _t,sd=new Mu;class qx extends ei{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=Tp,this.bindMatrix=new _t,this.bindMatrixInverse=new _t,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){const e=this.geometry;this.boundingBox===null&&(this.boundingBox=new Ki),this.boundingBox.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,cc),this.boundingBox.expandByPoint(cc)}computeBoundingSphere(){const e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new gr),this.boundingSphere.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,cc),this.boundingSphere.expandByPoint(cc)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){const n=this.material,i=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),rd.copy(this.boundingSphere),rd.applyMatrix4(i),e.ray.intersectsSphere(rd)!==!1&&(tm.copy(i).invert(),sd.copy(e.ray).applyMatrix4(tm),!(this.boundingBox!==null&&sd.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,sd)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const e=new zt,t=this.geometry.attributes.skinWeight;for(let n=0,i=t.count;n<i;n++){e.fromBufferAttribute(t,n);const s=1/e.manhattanLength();s!==1/0?e.multiplyScalar(s):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===Tp?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===zy?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){const n=this.skeleton,i=this.geometry;Jp.fromBufferAttribute(i.attributes.skinIndex,e),Qp.fromBufferAttribute(i.attributes.skinWeight,e),Zp.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let s=0;s<4;s++){const o=Qp.getComponent(s);if(o!==0){const a=Jp.getComponent(s);em.multiplyMatrices(n.bones[a].matrixWorld,n.boneInverses[a]),t.addScaledVector(Xx.copy(Zp).applyMatrix4(em),o)}}return t.applyMatrix4(this.bindMatrixInverse)}}class L_ extends cn{constructor(){super(),this.isBone=!0,this.type="Bone"}}class D_ extends Mn{constructor(e=null,t=1,n=1,i,s,o,a,l,c=ti,u=ti,d,f){super(null,o,a,l,c,u,i,s,d,f),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const nm=new _t,Yx=new _t;class Rh{constructor(e=[],t=[]){this.uuid=ji(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){const e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,i=this.bones.length;n<i;n++)this.boneInverses.push(new _t)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){const n=new _t;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){const e=this.bones,t=this.boneInverses,n=this.boneMatrices,i=this.boneTexture;for(let s=0,o=e.length;s<o;s++){const a=e[s]?e[s].matrixWorld:Yx;nm.multiplyMatrices(a,t[s]),nm.toArray(n,s*16)}i!==null&&(i.needsUpdate=!0)}clone(){return new Rh(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);const t=new Float32Array(e*e*4);t.set(this.boneMatrices);const n=new D_(t,e,e,Ii,Yi);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){const i=this.bones[t];if(i.name===e)return i}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,i=e.bones.length;n<i;n++){const s=e.bones[n];let o=t[s];o===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",s),o=new L_),this.bones.push(o),this.boneInverses.push(new _t().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){const e={metadata:{version:4.7,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;const t=this.bones,n=this.boneInverses;for(let i=0,s=t.length;i<s;i++){const o=t[i];e.bones.push(o.uuid);const a=n[i];e.boneInverses.push(a.toArray())}return e}}class Tf extends Wt{constructor(e,t,n,i=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const Lo=new _t,im=new _t,uc=[],rm=new Ki,jx=new _t,Da=new ei,Ia=new gr;class $x extends ei{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Tf(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,jx)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Ki),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Lo),rm.copy(e.boundingBox).applyMatrix4(Lo),this.boundingBox.union(rm)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new gr),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Lo),Ia.copy(e.boundingSphere).applyMatrix4(Lo),this.boundingSphere.union(Ia)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const n=t.morphTargetInfluences,i=this.morphTexture.source.data.data,s=n.length+1,o=e*s+1;for(let a=0;a<n.length;a++)n[a]=i[o+a]}raycast(e,t){const n=this.matrixWorld,i=this.count;if(Da.geometry=this.geometry,Da.material=this.material,Da.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Ia.copy(this.boundingSphere),Ia.applyMatrix4(n),e.ray.intersectsSphere(Ia)!==!1))for(let s=0;s<i;s++){this.getMatrixAt(s,Lo),im.multiplyMatrices(n,Lo),Da.matrixWorld=im,Da.raycast(e,uc);for(let o=0,a=uc.length;o<a;o++){const l=uc[o];l.instanceId=s,l.object=this,t.push(l)}uc.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new Tf(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){const n=t.morphTargetInfluences,i=n.length+1;this.morphTexture===null&&(this.morphTexture=new D_(new Float32Array(i*this.count),i,this.count,Sh,Yi));const s=this.morphTexture.source.data.data;let o=0;for(let c=0;c<n.length;c++)o+=n[c];const a=this.geometry.morphTargetsRelative?1:1-o,l=i*e;s[l]=a,s.set(n,l+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const od=new G,Kx=new G,Zx=new gt;class Us{constructor(e=new G(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,i){return this.normal.set(e,t,n),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const i=od.subVectors(n,t).cross(Kx.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(od),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/i;return s<0||s>1?null:t.copy(e.start).addScaledVector(n,s)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||Zx.getNormalMatrix(e),i=this.coplanarPoint(od).applyMatrix4(e),s=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Rs=new gr,Jx=new Ct(.5,.5),dc=new G;class Ph{constructor(e=new Us,t=new Us,n=new Us,i=new Us,s=new Us,o=new Us){this.planes=[e,t,n,i,s,o]}set(e,t,n,i,s,o){const a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(n),a[3].copy(i),a[4].copy(s),a[5].copy(o),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Dr){const n=this.planes,i=e.elements,s=i[0],o=i[1],a=i[2],l=i[3],c=i[4],u=i[5],d=i[6],f=i[7],h=i[8],_=i[9],g=i[10],m=i[11],p=i[12],S=i[13],x=i[14],v=i[15];if(n[0].setComponents(l-s,f-c,m-h,v-p).normalize(),n[1].setComponents(l+s,f+c,m+h,v+p).normalize(),n[2].setComponents(l+o,f+u,m+_,v+S).normalize(),n[3].setComponents(l-o,f-u,m-_,v-S).normalize(),n[4].setComponents(l-a,f-d,m-g,v-x).normalize(),t===Dr)n[5].setComponents(l+a,f+d,m+g,v+x).normalize();else if(t===su)n[5].setComponents(a,d,g,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Rs.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Rs.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Rs)}intersectsSprite(e){Rs.center.set(0,0,0);const t=Jx.distanceTo(e.center);return Rs.radius=.7071067811865476+t,Rs.applyMatrix4(e.matrixWorld),this.intersectsSphere(Rs)}intersectsSphere(e){const t=this.planes,n=e.center,i=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(n)<i)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const i=t[n];if(dc.x=i.normal.x>0?e.max.x:e.min.x,dc.y=i.normal.y>0?e.max.y:e.min.y,dc.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint(dc)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class I_ extends ur{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Je(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const ou=new G,au=new G,sm=new _t,Oa=new Mu,fc=new gr,ad=new G,om=new G;class Lh extends cn{constructor(e=new ki,t=new I_){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let i=1,s=t.count;i<s;i++)ou.fromBufferAttribute(t,i-1),au.fromBufferAttribute(t,i),n[i]=n[i-1],n[i]+=ou.distanceTo(au);e.setAttribute("lineDistance",new kr(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,s=e.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),fc.copy(n.boundingSphere),fc.applyMatrix4(i),fc.radius+=s,e.ray.intersectsSphere(fc)===!1)return;sm.copy(i).invert(),Oa.copy(e.ray).applyMatrix4(sm);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=this.isLineSegments?2:1,u=n.index,f=n.attributes.position;if(u!==null){const h=Math.max(0,o.start),_=Math.min(u.count,o.start+o.count);for(let g=h,m=_-1;g<m;g+=c){const p=u.getX(g),S=u.getX(g+1),x=hc(this,e,Oa,l,p,S,g);x&&t.push(x)}if(this.isLineLoop){const g=u.getX(_-1),m=u.getX(h),p=hc(this,e,Oa,l,g,m,_-1);p&&t.push(p)}}else{const h=Math.max(0,o.start),_=Math.min(f.count,o.start+o.count);for(let g=h,m=_-1;g<m;g+=c){const p=hc(this,e,Oa,l,g,g+1,g);p&&t.push(p)}if(this.isLineLoop){const g=hc(this,e,Oa,l,_-1,h,_-1);g&&t.push(g)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=i.length;s<o;s++){const a=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}function hc(r,e,t,n,i,s,o){const a=r.geometry.attributes.position;if(ou.fromBufferAttribute(a,i),au.fromBufferAttribute(a,s),t.distanceSqToSegment(ou,au,ad,om)>n)return;ad.applyMatrix4(r.matrixWorld);const c=e.ray.origin.distanceTo(ad);if(!(c<e.near||c>e.far))return{distance:c,point:om.clone().applyMatrix4(r.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:r}}const am=new G,lm=new G;class Qx extends Lh{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[];for(let i=0,s=t.count;i<s;i+=2)am.fromBufferAttribute(t,i),lm.fromBufferAttribute(t,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+am.distanceTo(lm);e.setAttribute("lineDistance",new kr(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class eb extends Lh{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}}class O_ extends ur{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Je(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const cm=new _t,Af=new Mu,pc=new gr,mc=new G;class Cf extends cn{constructor(e=new ki,t=new O_){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,s=e.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),pc.copy(n.boundingSphere),pc.applyMatrix4(i),pc.radius+=s,e.ray.intersectsSphere(pc)===!1)return;cm.copy(i).invert(),Af.copy(e.ray).applyMatrix4(cm);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=n.index,d=n.attributes.position;if(c!==null){const f=Math.max(0,o.start),h=Math.min(c.count,o.start+o.count);for(let _=f,g=h;_<g;_++){const m=c.getX(_);mc.fromBufferAttribute(d,m),um(mc,m,l,i,e,t,this)}}else{const f=Math.max(0,o.start),h=Math.min(d.count,o.start+o.count);for(let _=f,g=h;_<g;_++)mc.fromBufferAttribute(d,_),um(mc,_,l,i,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=i.length;s<o;s++){const a=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}function um(r,e,t,n,i,s,o){const a=Af.distanceSqToPoint(r);if(a<t){const l=new G;Af.closestPointToPoint(r,l),l.applyMatrix4(n);const c=i.ray.origin.distanceTo(l);if(c<i.near||c>i.far)return;s.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:o})}}class N_ extends Mn{constructor(e,t,n=ro,i,s,o,a=ti,l=ti,c,u=Ml,d=1){if(u!==Ml&&u!==El)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const f={width:e,height:t,depth:d};super(f,i,s,o,a,l,u,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Ah(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class Gi extends ki{constructor(e=1,t=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:i};const s=e/2,o=t/2,a=Math.floor(n),l=Math.floor(i),c=a+1,u=l+1,d=e/a,f=t/l,h=[],_=[],g=[],m=[];for(let p=0;p<u;p++){const S=p*f-o;for(let x=0;x<c;x++){const v=x*d-s;_.push(v,-S,0),g.push(0,0,1),m.push(x/a),m.push(1-p/l)}}for(let p=0;p<l;p++)for(let S=0;S<a;S++){const x=S+c*p,v=S+c*(p+1),T=S+1+c*(p+1),M=S+1+c*p;h.push(x,v,M),h.push(v,T,M)}this.setIndex(h),this.setAttribute("position",new kr(_,3)),this.setAttribute("normal",new kr(g,3)),this.setAttribute("uv",new kr(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Gi(e.width,e.height,e.widthSegments,e.heightSegments)}}class Dh extends ur{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Je(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Je(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=x_,this.normalScale=new Ct(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new pr,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class _r extends Dh{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new Ct(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Tt(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Je(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Je(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Je(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}class tb extends ur{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Gy,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class nb extends ur{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}function gc(r,e){return!r||r.constructor===e?r:typeof e.BYTES_PER_ELEMENT=="number"?new e(r):Array.prototype.slice.call(r)}function ib(r){return ArrayBuffer.isView(r)&&!(r instanceof DataView)}function rb(r){function e(i,s){return r[i]-r[s]}const t=r.length,n=new Array(t);for(let i=0;i!==t;++i)n[i]=i;return n.sort(e),n}function dm(r,e,t){const n=r.length,i=new r.constructor(n);for(let s=0,o=0;o!==n;++s){const a=t[s]*e;for(let l=0;l!==e;++l)i[o++]=r[a+l]}return i}function U_(r,e,t,n){let i=1,s=r[0];for(;s!==void 0&&s[n]===void 0;)s=r[i++];if(s===void 0)return;let o=s[n];if(o!==void 0)if(Array.isArray(o))do o=s[n],o!==void 0&&(e.push(s.time),t.push(...o)),s=r[i++];while(s!==void 0);else if(o.toArray!==void 0)do o=s[n],o!==void 0&&(e.push(s.time),o.toArray(t,t.length)),s=r[i++];while(s!==void 0);else do o=s[n],o!==void 0&&(e.push(s.time),t.push(o)),s=r[i++];while(s!==void 0)}class Gl{constructor(e,t,n,i){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){const t=this.parameterPositions;let n=this._cachedIndex,i=t[n],s=t[n-1];n:{e:{let o;t:{i:if(!(e<i)){for(let a=n+2;;){if(i===void 0){if(e<s)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(s=i,i=t[++n],e<i)break e}o=t.length;break t}if(!(e>=s)){const a=t[1];e<a&&(n=2,s=a);for(let l=n-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(i=s,s=t[--n-1],e>=s)break e}o=n,n=0;break t}break n}for(;n<o;){const a=n+o>>>1;e<t[a]?o=a:n=a+1}if(i=t[n],s=t[n-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,s,i)}return this.interpolate_(n,s,e,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,s=e*i;for(let o=0;o!==i;++o)t[o]=n[s+o];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}}class sb extends Gl{constructor(e,t,n,i){super(e,t,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Ap,endingEnd:Ap}}intervalChanged_(e,t,n){const i=this.parameterPositions;let s=e-2,o=e+1,a=i[s],l=i[o];if(a===void 0)switch(this.getSettings_().endingStart){case Cp:s=e,a=2*t-n;break;case Rp:s=i.length-2,a=t+i[s]-i[s+1];break;default:s=e,a=n}if(l===void 0)switch(this.getSettings_().endingEnd){case Cp:o=e,l=2*n-t;break;case Rp:o=1,l=n+i[1]-i[0];break;default:o=e-1,l=t}const c=(n-t)*.5,u=this.valueSize;this._weightPrev=c/(t-a),this._weightNext=c/(l-n),this._offsetPrev=s*u,this._offsetNext=o*u}interpolate_(e,t,n,i){const s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,u=this._offsetPrev,d=this._offsetNext,f=this._weightPrev,h=this._weightNext,_=(n-t)/(i-t),g=_*_,m=g*_,p=-f*m+2*f*g-f*_,S=(1+f)*m+(-1.5-2*f)*g+(-.5+f)*_+1,x=(-1-h)*m+(1.5+h)*g+.5*_,v=h*m-h*g;for(let T=0;T!==a;++T)s[T]=p*o[u+T]+S*o[c+T]+x*o[l+T]+v*o[d+T];return s}}class ob extends Gl{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){const s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,u=(n-t)/(i-t),d=1-u;for(let f=0;f!==a;++f)s[f]=o[c+f]*d+o[l+f]*u;return s}}class ab extends Gl{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e){return this.copySampleValue_(e-1)}}class Zi{constructor(e,t,n,i){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=gc(t,this.TimeBufferType),this.values=gc(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(e){const t=e.constructor;let n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:gc(e.times,Array),values:gc(e.values,Array)};const i=e.getInterpolation();i!==e.DefaultInterpolation&&(n.interpolation=i)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new ab(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new ob(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new sb(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case Tl:t=this.InterpolantFactoryMethodDiscrete;break;case Al:t=this.InterpolantFactoryMethodLinear;break;case Uu:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){const n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Tl;case this.InterpolantFactoryMethodLinear:return Al;case this.InterpolantFactoryMethodSmooth:return Uu}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){const t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]+=e}return this}scale(e){if(e!==1){const t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]*=e}return this}trim(e,t){const n=this.times,i=n.length;let s=0,o=i-1;for(;s!==i&&n[s]<e;)++s;for(;o!==-1&&n[o]>t;)--o;if(++o,s!==0||o!==i){s>=o&&(o=Math.max(o,1),s=o-1);const a=this.getValueSize();this.times=n.slice(s,o),this.values=this.values.slice(s*a,o*a)}return this}validate(){let e=!0;const t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);const n=this.times,i=this.values,s=n.length;s===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let o=null;for(let a=0;a!==s;a++){const l=n[a];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,l),e=!1;break}if(o!==null&&o>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,l,o),e=!1;break}o=l}if(i!==void 0&&ib(i))for(let a=0,l=i.length;a!==l;++a){const c=i[a];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,c),e=!1;break}}return e}optimize(){const e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===Uu,s=e.length-1;let o=1;for(let a=1;a<s;++a){let l=!1;const c=e[a],u=e[a+1];if(c!==u&&(a!==1||c!==e[0]))if(i)l=!0;else{const d=a*n,f=d-n,h=d+n;for(let _=0;_!==n;++_){const g=t[d+_];if(g!==t[f+_]||g!==t[h+_]){l=!0;break}}}if(l){if(a!==o){e[o]=e[a];const d=a*n,f=o*n;for(let h=0;h!==n;++h)t[f+h]=t[d+h]}++o}}if(s>0){e[o]=e[s];for(let a=s*n,l=o*n,c=0;c!==n;++c)t[l+c]=t[a+c];++o}return o!==e.length?(this.times=e.slice(0,o),this.values=t.slice(0,o*n)):(this.times=e,this.values=t),this}clone(){const e=this.times.slice(),t=this.values.slice(),n=this.constructor,i=new n(this.name,e,t);return i.createInterpolant=this.createInterpolant,i}}Zi.prototype.ValueTypeName="";Zi.prototype.TimeBufferType=Float32Array;Zi.prototype.ValueBufferType=Float32Array;Zi.prototype.DefaultInterpolation=Al;class wa extends Zi{constructor(e,t,n){super(e,t,n)}}wa.prototype.ValueTypeName="bool";wa.prototype.ValueBufferType=Array;wa.prototype.DefaultInterpolation=Tl;wa.prototype.InterpolantFactoryMethodLinear=void 0;wa.prototype.InterpolantFactoryMethodSmooth=void 0;class F_ extends Zi{constructor(e,t,n,i){super(e,t,n,i)}}F_.prototype.ValueTypeName="color";class fa extends Zi{constructor(e,t,n,i){super(e,t,n,i)}}fa.prototype.ValueTypeName="number";class lb extends Gl{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){const s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=(n-t)/(i-t);let c=e*a;for(let u=c+a;c!==u;c+=4)Ss.slerpFlat(s,0,o,c-a,o,c,l);return s}}class ha extends Zi{constructor(e,t,n,i){super(e,t,n,i)}InterpolantFactoryMethodLinear(e){return new lb(this.times,this.values,this.getValueSize(),e)}}ha.prototype.ValueTypeName="quaternion";ha.prototype.InterpolantFactoryMethodSmooth=void 0;class Ma extends Zi{constructor(e,t,n){super(e,t,n)}}Ma.prototype.ValueTypeName="string";Ma.prototype.ValueBufferType=Array;Ma.prototype.DefaultInterpolation=Tl;Ma.prototype.InterpolantFactoryMethodLinear=void 0;Ma.prototype.InterpolantFactoryMethodSmooth=void 0;class pa extends Zi{constructor(e,t,n,i){super(e,t,n,i)}}pa.prototype.ValueTypeName="vector";class cb{constructor(e="",t=-1,n=[],i=Hy){this.name=e,this.tracks=n,this.duration=t,this.blendMode=i,this.uuid=ji(),this.duration<0&&this.resetDuration()}static parse(e){const t=[],n=e.tracks,i=1/(e.fps||1);for(let o=0,a=n.length;o!==a;++o)t.push(db(n[o]).scale(i));const s=new this(e.name,e.duration,t,e.blendMode);return s.uuid=e.uuid,s}static toJSON(e){const t=[],n=e.tracks,i={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode};for(let s=0,o=n.length;s!==o;++s)t.push(Zi.toJSON(n[s]));return i}static CreateFromMorphTargetSequence(e,t,n,i){const s=t.length,o=[];for(let a=0;a<s;a++){let l=[],c=[];l.push((a+s-1)%s,a,(a+1)%s),c.push(0,1,0);const u=rb(l);l=dm(l,1,u),c=dm(c,1,u),!i&&l[0]===0&&(l.push(s),c.push(c[0])),o.push(new fa(".morphTargetInfluences["+t[a].name+"]",l,c).scale(1/n))}return new this(e,-1,o)}static findByName(e,t){let n=e;if(!Array.isArray(e)){const i=e;n=i.geometry&&i.geometry.animations||i.animations}for(let i=0;i<n.length;i++)if(n[i].name===t)return n[i];return null}static CreateClipsFromMorphTargetSequences(e,t,n){const i={},s=/^([\w-]*?)([\d]+)$/;for(let a=0,l=e.length;a<l;a++){const c=e[a],u=c.name.match(s);if(u&&u.length>1){const d=u[1];let f=i[d];f||(i[d]=f=[]),f.push(c)}}const o=[];for(const a in i)o.push(this.CreateFromMorphTargetSequence(a,i[a],t,n));return o}static parseAnimation(e,t){if(console.warn("THREE.AnimationClip: parseAnimation() is deprecated and will be removed with r185"),!e)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;const n=function(d,f,h,_,g){if(h.length!==0){const m=[],p=[];U_(h,m,p,_),m.length!==0&&g.push(new d(f,m,p))}},i=[],s=e.name||"default",o=e.fps||30,a=e.blendMode;let l=e.length||-1;const c=e.hierarchy||[];for(let d=0;d<c.length;d++){const f=c[d].keys;if(!(!f||f.length===0))if(f[0].morphTargets){const h={};let _;for(_=0;_<f.length;_++)if(f[_].morphTargets)for(let g=0;g<f[_].morphTargets.length;g++)h[f[_].morphTargets[g]]=-1;for(const g in h){const m=[],p=[];for(let S=0;S!==f[_].morphTargets.length;++S){const x=f[_];m.push(x.time),p.push(x.morphTarget===g?1:0)}i.push(new fa(".morphTargetInfluence["+g+"]",m,p))}l=h.length*o}else{const h=".bones["+t[d].name+"]";n(pa,h+".position",f,"pos",i),n(ha,h+".quaternion",f,"rot",i),n(pa,h+".scale",f,"scl",i)}}return i.length===0?null:new this(s,l,i,a)}resetDuration(){const e=this.tracks;let t=0;for(let n=0,i=e.length;n!==i;++n){const s=this.tracks[n];t=Math.max(t,s.times[s.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){const e=[];for(let t=0;t<this.tracks.length;t++)e.push(this.tracks[t].clone());return new this.constructor(this.name,this.duration,e,this.blendMode)}toJSON(){return this.constructor.toJSON(this)}}function ub(r){switch(r.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return fa;case"vector":case"vector2":case"vector3":case"vector4":return pa;case"color":return F_;case"quaternion":return ha;case"bool":case"boolean":return wa;case"string":return Ma}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+r)}function db(r){if(r.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");const e=ub(r.type);if(r.times===void 0){const t=[],n=[];U_(r.keys,t,n,"value"),r.times=t,r.values=n}return e.parse!==void 0?e.parse(r):new e(r.name,r.times,r.values,r.interpolation)}const Or={enabled:!1,files:{},add:function(r,e){this.enabled!==!1&&(this.files[r]=e)},get:function(r){if(this.enabled!==!1)return this.files[r]},remove:function(r){delete this.files[r]},clear:function(){this.files={}}};class fb{constructor(e,t,n){const i=this;let s=!1,o=0,a=0,l;const c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.itemStart=function(u){a++,s===!1&&i.onStart!==void 0&&i.onStart(u,o,a),s=!0},this.itemEnd=function(u){o++,i.onProgress!==void 0&&i.onProgress(u,o,a),o===a&&(s=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(u){i.onError!==void 0&&i.onError(u)},this.resolveURL=function(u){return l?l(u):u},this.setURLModifier=function(u){return l=u,this},this.addHandler=function(u,d){return c.push(u,d),this},this.removeHandler=function(u){const d=c.indexOf(u);return d!==-1&&c.splice(d,2),this},this.getHandler=function(u){for(let d=0,f=c.length;d<f;d+=2){const h=c[d],_=c[d+1];if(h.global&&(h.lastIndex=0),h.test(u))return _}return null}}}const hb=new fb;class Ea{constructor(e){this.manager=e!==void 0?e:hb,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){const n=this;return new Promise(function(i,s){n.load(e,i,t,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}}Ea.DEFAULT_MATERIAL_NAME="__DEFAULT";const wr={};class pb extends Error{constructor(e,t){super(e),this.response=t}}class k_ extends Ea{constructor(e){super(e),this.mimeType="",this.responseType=""}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=Or.get(`file:${e}`);if(s!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(s),this.manager.itemEnd(e)},0),s;if(wr[e]!==void 0){wr[e].push({onLoad:t,onProgress:n,onError:i});return}wr[e]=[],wr[e].push({onLoad:t,onProgress:n,onError:i});const o=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin"}),a=this.mimeType,l=this.responseType;fetch(o).then(c=>{if(c.status===200||c.status===0){if(c.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||c.body===void 0||c.body.getReader===void 0)return c;const u=wr[e],d=c.body.getReader(),f=c.headers.get("X-File-Size")||c.headers.get("Content-Length"),h=f?parseInt(f):0,_=h!==0;let g=0;const m=new ReadableStream({start(p){S();function S(){d.read().then(({done:x,value:v})=>{if(x)p.close();else{g+=v.byteLength;const T=new ProgressEvent("progress",{lengthComputable:_,loaded:g,total:h});for(let M=0,E=u.length;M<E;M++){const P=u[M];P.onProgress&&P.onProgress(T)}p.enqueue(v),S()}},x=>{p.error(x)})}}});return new Response(m)}else throw new pb(`fetch for "${c.url}" responded with ${c.status}: ${c.statusText}`,c)}).then(c=>{switch(l){case"arraybuffer":return c.arrayBuffer();case"blob":return c.blob();case"document":return c.text().then(u=>new DOMParser().parseFromString(u,a));case"json":return c.json();default:if(a==="")return c.text();{const d=/charset="?([^;"\s]*)"?/i.exec(a),f=d&&d[1]?d[1].toLowerCase():void 0,h=new TextDecoder(f);return c.arrayBuffer().then(_=>h.decode(_))}}}).then(c=>{Or.add(`file:${e}`,c);const u=wr[e];delete wr[e];for(let d=0,f=u.length;d<f;d++){const h=u[d];h.onLoad&&h.onLoad(c)}}).catch(c=>{const u=wr[e];if(u===void 0)throw this.manager.itemError(e),c;delete wr[e];for(let d=0,f=u.length;d<f;d++){const h=u[d];h.onError&&h.onError(c)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}}const Do=new WeakMap;class mb extends Ea{constructor(e){super(e)}load(e,t,n,i){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=this,o=Or.get(`image:${e}`);if(o!==void 0){if(o.complete===!0)s.manager.itemStart(e),setTimeout(function(){t&&t(o),s.manager.itemEnd(e)},0);else{let d=Do.get(o);d===void 0&&(d=[],Do.set(o,d)),d.push({onLoad:t,onError:i})}return o}const a=Cl("img");function l(){u(),t&&t(this);const d=Do.get(this)||[];for(let f=0;f<d.length;f++){const h=d[f];h.onLoad&&h.onLoad(this)}Do.delete(this),s.manager.itemEnd(e)}function c(d){u(),i&&i(d),Or.remove(`image:${e}`);const f=Do.get(this)||[];for(let h=0;h<f.length;h++){const _=f[h];_.onError&&_.onError(d)}Do.delete(this),s.manager.itemError(e),s.manager.itemEnd(e)}function u(){a.removeEventListener("load",l,!1),a.removeEventListener("error",c,!1)}return a.addEventListener("load",l,!1),a.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),Or.add(`image:${e}`,a),s.manager.itemStart(e),a.src=e,a}}class gb extends Ea{constructor(e){super(e)}load(e,t,n,i){const s=new Mn,o=new mb(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(e,function(a){s.image=a,s.needsUpdate=!0,t!==void 0&&t(s)},n,i),s}}class Eu extends cn{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Je(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}const ld=new _t,fm=new G,hm=new G;class Ih{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Ct(512,512),this.mapType=hr,this.map=null,this.mapPass=null,this.matrix=new _t,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Ph,this._frameExtents=new Ct(1,1),this._viewportCount=1,this._viewports=[new zt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;fm.setFromMatrixPosition(e.matrixWorld),t.position.copy(fm),hm.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(hm),t.updateMatrixWorld(),ld.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(ld),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(ld)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class _b extends Ih{constructor(){super(new ri(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(e){const t=this.camera,n=ua*2*e.angle*this.focus,i=this.mapSize.width/this.mapSize.height*this.aspect,s=e.distance||t.far;(n!==t.fov||i!==t.aspect||s!==t.far)&&(t.fov=n,t.aspect=i,t.far=s,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}}class vb extends Eu{constructor(e,t,n=0,i=Math.PI/3,s=0,o=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(cn.DEFAULT_UP),this.updateMatrix(),this.target=new cn,this.distance=n,this.angle=i,this.penumbra=s,this.decay=o,this.map=null,this.shadow=new _b}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}const pm=new _t,Na=new G,cd=new G;class yb extends Ih{constructor(){super(new ri(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new Ct(4,2),this._viewportCount=6,this._viewports=[new zt(2,1,1,1),new zt(0,1,1,1),new zt(3,1,1,1),new zt(1,1,1,1),new zt(3,0,1,1),new zt(1,0,1,1)],this._cubeDirections=[new G(1,0,0),new G(-1,0,0),new G(0,0,1),new G(0,0,-1),new G(0,1,0),new G(0,-1,0)],this._cubeUps=[new G(0,1,0),new G(0,1,0),new G(0,1,0),new G(0,1,0),new G(0,0,1),new G(0,0,-1)]}updateMatrices(e,t=0){const n=this.camera,i=this.matrix,s=e.distance||n.far;s!==n.far&&(n.far=s,n.updateProjectionMatrix()),Na.setFromMatrixPosition(e.matrixWorld),n.position.copy(Na),cd.copy(n.position),cd.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(cd),n.updateMatrixWorld(),i.makeTranslation(-Na.x,-Na.y,-Na.z),pm.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(pm)}}class xb extends Eu{constructor(e,t,n=0,i=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new yb}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class Tu extends R_{constructor(e=-1,t=1,n=1,i=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=i,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,i,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let s=n-e,o=n+e,a=i+t,l=i-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,o=s+c*this.view.width,a-=u*this.view.offsetY,l=a-u*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class bb extends Ih{constructor(){super(new Tu(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class B_ extends Eu{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(cn.DEFAULT_UP),this.updateMatrix(),this.target=new cn,this.shadow=new bb}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class Sb extends Eu{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}class rl{static extractUrlBase(e){const t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}}const ud=new WeakMap;class wb extends Ea{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"}}setOptions(e){return this.options=e,this}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=this,o=Or.get(`image-bitmap:${e}`);if(o!==void 0){if(s.manager.itemStart(e),o.then){o.then(c=>{if(ud.has(o)===!0)i&&i(ud.get(o)),s.manager.itemError(e),s.manager.itemEnd(e);else return t&&t(c),s.manager.itemEnd(e),c});return}return setTimeout(function(){t&&t(o),s.manager.itemEnd(e)},0),o}const a={};a.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",a.headers=this.requestHeader;const l=fetch(e,a).then(function(c){return c.blob()}).then(function(c){return createImageBitmap(c,Object.assign(s.options,{colorSpaceConversion:"none"}))}).then(function(c){return Or.add(`image-bitmap:${e}`,c),t&&t(c),s.manager.itemEnd(e),c}).catch(function(c){i&&i(c),ud.set(l,c),Or.remove(`image-bitmap:${e}`),s.manager.itemError(e),s.manager.itemEnd(e)});Or.add(`image-bitmap:${e}`,l),s.manager.itemStart(e)}}class Mb extends ri{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}const Oh="\\[\\]\\.:\\/",Eb=new RegExp("["+Oh+"]","g"),Nh="[^"+Oh+"]",Tb="[^"+Oh.replace("\\.","")+"]",Ab=/((?:WC+[\/:])*)/.source.replace("WC",Nh),Cb=/(WCOD+)?/.source.replace("WCOD",Tb),Rb=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Nh),Pb=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Nh),Lb=new RegExp("^"+Ab+Cb+Rb+Pb+"$"),Db=["material","materials","bones","map"];class Ib{constructor(e,t,n){const i=n||Xt.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,i)}getValue(e,t){this.bind();const n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(e,t)}setValue(e,t){const n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,s=n.length;i!==s;++i)n[i].setValue(e,t)}bind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}}class Xt{constructor(e,t,n){this.path=t,this.parsedPath=n||Xt.parseTrackName(t),this.node=Xt.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new Xt.Composite(e,t,n):new Xt(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(Eb,"")}static parseTrackName(e){const t=Lb.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);const n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){const s=n.nodeName.substring(i+1);Db.indexOf(s)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=s)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){const n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){const n=function(s){for(let o=0;o<s.length;o++){const a=s[o];if(a.name===t||a.uuid===t)return a;const l=n(a.children);if(l)return l}return null},i=n(e.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)e[t++]=n[i]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++]}_setValue_array_setNeedsUpdate(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node;const t=this.parsedPath,n=t.objectName,i=t.propertyName;let s=t.propertyIndex;if(e||(e=Xt.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=t.objectIndex;switch(n){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let u=0;u<e.length;u++)if(e[u].name===c){c=u;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(c!==void 0){if(e[c]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}const o=e[i];if(o===void 0){const c=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+i+" but it wasn't found.",e);return}let a=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?a=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(s!==void 0){if(i==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[s]!==void 0&&(s=e.morphTargetDictionary[s])}l=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=s}else o.fromArray!==void 0&&o.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(l=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=i;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}Xt.Composite=Ib;Xt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Xt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Xt.prototype.GetterByBindingType=[Xt.prototype._getValue_direct,Xt.prototype._getValue_array,Xt.prototype._getValue_arrayElement,Xt.prototype._getValue_toArray];Xt.prototype.SetterByBindingTypeAndVersioning=[[Xt.prototype._setValue_direct,Xt.prototype._setValue_direct_setNeedsUpdate,Xt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Xt.prototype._setValue_array,Xt.prototype._setValue_array_setNeedsUpdate,Xt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Xt.prototype._setValue_arrayElement,Xt.prototype._setValue_arrayElement_setNeedsUpdate,Xt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Xt.prototype._setValue_fromArray,Xt.prototype._setValue_fromArray_setNeedsUpdate,Xt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];function mm(r,e,t,n){const i=Ob(n);switch(t){case m_:return r*e;case Sh:return r*e/i.components*i.byteLength;case wh:return r*e/i.components*i.byteLength;case __:return r*e*2/i.components*i.byteLength;case Mh:return r*e*2/i.components*i.byteLength;case g_:return r*e*3/i.components*i.byteLength;case Ii:return r*e*4/i.components*i.byteLength;case Eh:return r*e*4/i.components*i.byteLength;case Bc:case zc:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*8;case Hc:case Vc:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case Jd:case ef:return Math.max(r,16)*Math.max(e,8)/4;case Zd:case Qd:return Math.max(r,8)*Math.max(e,8)/2;case tf:case nf:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*8;case rf:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case sf:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case of:return Math.floor((r+4)/5)*Math.floor((e+3)/4)*16;case af:return Math.floor((r+4)/5)*Math.floor((e+4)/5)*16;case lf:return Math.floor((r+5)/6)*Math.floor((e+4)/5)*16;case cf:return Math.floor((r+5)/6)*Math.floor((e+5)/6)*16;case uf:return Math.floor((r+7)/8)*Math.floor((e+4)/5)*16;case df:return Math.floor((r+7)/8)*Math.floor((e+5)/6)*16;case ff:return Math.floor((r+7)/8)*Math.floor((e+7)/8)*16;case hf:return Math.floor((r+9)/10)*Math.floor((e+4)/5)*16;case pf:return Math.floor((r+9)/10)*Math.floor((e+5)/6)*16;case mf:return Math.floor((r+9)/10)*Math.floor((e+7)/8)*16;case gf:return Math.floor((r+9)/10)*Math.floor((e+9)/10)*16;case _f:return Math.floor((r+11)/12)*Math.floor((e+9)/10)*16;case vf:return Math.floor((r+11)/12)*Math.floor((e+11)/12)*16;case Gc:case yf:case xf:return Math.ceil(r/4)*Math.ceil(e/4)*16;case v_:case bf:return Math.ceil(r/4)*Math.ceil(e/4)*8;case Sf:case wf:return Math.ceil(r/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Ob(r){switch(r){case hr:case f_:return{byteLength:1,components:1};case Sl:case h_:case Hl:return{byteLength:2,components:1};case xh:case bh:return{byteLength:2,components:4};case ro:case yh:case Yi:return{byteLength:4,components:1};case p_:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${r}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:vh}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=vh);/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function z_(){let r=null,e=!1,t=null,n=null;function i(s,o){t(s,o),n=r.requestAnimationFrame(i)}return{start:function(){e!==!0&&t!==null&&(n=r.requestAnimationFrame(i),e=!0)},stop:function(){r.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){r=s}}}function Nb(r){const e=new WeakMap;function t(a,l){const c=a.array,u=a.usage,d=c.byteLength,f=r.createBuffer();r.bindBuffer(l,f),r.bufferData(l,c,u),a.onUploadCallback();let h;if(c instanceof Float32Array)h=r.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)h=r.HALF_FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?h=r.HALF_FLOAT:h=r.UNSIGNED_SHORT;else if(c instanceof Int16Array)h=r.SHORT;else if(c instanceof Uint32Array)h=r.UNSIGNED_INT;else if(c instanceof Int32Array)h=r.INT;else if(c instanceof Int8Array)h=r.BYTE;else if(c instanceof Uint8Array)h=r.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)h=r.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:f,type:h,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:d}}function n(a,l,c){const u=l.array,d=l.updateRanges;if(r.bindBuffer(c,a),d.length===0)r.bufferSubData(c,0,u);else{d.sort((h,_)=>h.start-_.start);let f=0;for(let h=1;h<d.length;h++){const _=d[f],g=d[h];g.start<=_.start+_.count+1?_.count=Math.max(_.count,g.start+g.count-_.start):(++f,d[f]=g)}d.length=f+1;for(let h=0,_=d.length;h<_;h++){const g=d[h];r.bufferSubData(c,g.start*u.BYTES_PER_ELEMENT,u,g.start,g.count)}l.clearUpdateRanges()}l.onUploadCallback()}function i(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function s(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=e.get(a);l&&(r.deleteBuffer(l.buffer),e.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const u=e.get(a);(!u||u.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const c=e.get(a);if(c===void 0)e.set(a,t(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,a,l),c.version=a.version}}return{get:i,remove:s,update:o}}var Ub=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Fb=`#ifdef USE_ALPHAHASH
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
#endif`,kb=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Bb=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,zb=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Hb=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Vb=`#ifdef USE_AOMAP
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
#endif`,Gb=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Wb=`#ifdef USE_BATCHING
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
#endif`,Xb=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,qb=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Yb=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,jb=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,$b=`#ifdef USE_IRIDESCENCE
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
#endif`,Kb=`#ifdef USE_BUMPMAP
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
#endif`,Zb=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Jb=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Qb=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,eS=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,tS=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,nS=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,iS=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,rS=`#if defined( USE_COLOR_ALPHA )
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
#endif`,sS=`#define PI 3.141592653589793
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
} // validated`,oS=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,aS=`vec3 transformedNormal = objectNormal;
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
#endif`,lS=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,cS=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,uS=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,dS=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,fS="gl_FragColor = linearToOutputTexel( gl_FragColor );",hS=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,pS=`#ifdef USE_ENVMAP
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
#endif`,mS=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,gS=`#ifdef USE_ENVMAP
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
#endif`,_S=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,vS=`#ifdef USE_ENVMAP
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
#endif`,yS=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,xS=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,bS=`#ifdef USE_FOG
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
}`,MS=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,ES=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,TS=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,AS=`uniform bool receiveShadow;
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
#endif`,CS=`#ifdef USE_ENVMAP
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
#endif`,RS=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,PS=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,LS=`BlinnPhongMaterial material;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,IS=`PhysicalMaterial material;
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
#endif`,US=`#if defined( RE_IndirectDiffuse )
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
#endif`,FS=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,kS=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,BS=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,zS=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,HS=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,VS=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,GS=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,WS=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,XS=`#if defined( USE_POINTS_UV )
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
#endif`,qS=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,YS=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,jS=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,$S=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,KS=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,ZS=`#ifdef USE_MORPHTARGETS
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
#endif`,JS=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,QS=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,ew=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,tw=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,nw=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,iw=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,rw=`#ifdef USE_NORMALMAP
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
#endif`,sw=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,ow=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,aw=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,lw=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,cw=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,uw=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,dw=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,fw=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,hw=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,pw=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,mw=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,gw=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,_w=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,vw=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,yw=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,xw=`float getShadowMask() {
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
}`,bw=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Sw=`#ifdef USE_SKINNING
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
#endif`,ww=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Mw=`#ifdef USE_SKINNING
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
#endif`,Ew=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Tw=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Aw=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Cw=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Rw=`#ifdef USE_TRANSMISSION
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
#endif`,Pw=`#ifdef USE_TRANSMISSION
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
#endif`,Lw=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Dw=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Iw=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Ow=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Nw=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Uw=`uniform sampler2D t2D;
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
}`,Fw=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,kw=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Bw=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,zw=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Hw=`#include <common>
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
}`,Vw=`#if DEPTH_PACKING == 3200
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
}`,Gw=`#define DISTANCE
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
}`,Ww=`#define DISTANCE
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
}`,Xw=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,qw=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Yw=`uniform float scale;
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
}`,jw=`uniform vec3 diffuse;
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
}`,$w=`#include <common>
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
}`,Kw=`uniform vec3 diffuse;
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
}`,Zw=`#define LAMBERT
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
}`,Jw=`#define LAMBERT
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
}`,Qw=`#define MATCAP
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
}`,eM=`#define MATCAP
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
}`,tM=`#define NORMAL
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
}`,nM=`#define NORMAL
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
}`,iM=`#define PHONG
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
}`,rM=`#define PHONG
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
}`,sM=`#define STANDARD
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
}`,oM=`#define STANDARD
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
}`,aM=`#define TOON
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
}`,lM=`#define TOON
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
}`,cM=`uniform float size;
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
}`,uM=`uniform vec3 diffuse;
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
}`,dM=`#include <common>
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
}`,pM=`uniform vec3 diffuse;
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
}`,yt={alphahash_fragment:Ub,alphahash_pars_fragment:Fb,alphamap_fragment:kb,alphamap_pars_fragment:Bb,alphatest_fragment:zb,alphatest_pars_fragment:Hb,aomap_fragment:Vb,aomap_pars_fragment:Gb,batching_pars_vertex:Wb,batching_vertex:Xb,begin_vertex:qb,beginnormal_vertex:Yb,bsdfs:jb,iridescence_fragment:$b,bumpmap_pars_fragment:Kb,clipping_planes_fragment:Zb,clipping_planes_pars_fragment:Jb,clipping_planes_pars_vertex:Qb,clipping_planes_vertex:eS,color_fragment:tS,color_pars_fragment:nS,color_pars_vertex:iS,color_vertex:rS,common:sS,cube_uv_reflection_fragment:oS,defaultnormal_vertex:aS,displacementmap_pars_vertex:lS,displacementmap_vertex:cS,emissivemap_fragment:uS,emissivemap_pars_fragment:dS,colorspace_fragment:fS,colorspace_pars_fragment:hS,envmap_fragment:pS,envmap_common_pars_fragment:mS,envmap_pars_fragment:gS,envmap_pars_vertex:_S,envmap_physical_pars_fragment:CS,envmap_vertex:vS,fog_vertex:yS,fog_pars_vertex:xS,fog_fragment:bS,fog_pars_fragment:SS,gradientmap_pars_fragment:wS,lightmap_pars_fragment:MS,lights_lambert_fragment:ES,lights_lambert_pars_fragment:TS,lights_pars_begin:AS,lights_toon_fragment:RS,lights_toon_pars_fragment:PS,lights_phong_fragment:LS,lights_phong_pars_fragment:DS,lights_physical_fragment:IS,lights_physical_pars_fragment:OS,lights_fragment_begin:NS,lights_fragment_maps:US,lights_fragment_end:FS,logdepthbuf_fragment:kS,logdepthbuf_pars_fragment:BS,logdepthbuf_pars_vertex:zS,logdepthbuf_vertex:HS,map_fragment:VS,map_pars_fragment:GS,map_particle_fragment:WS,map_particle_pars_fragment:XS,metalnessmap_fragment:qS,metalnessmap_pars_fragment:YS,morphinstance_vertex:jS,morphcolor_vertex:$S,morphnormal_vertex:KS,morphtarget_pars_vertex:ZS,morphtarget_vertex:JS,normal_fragment_begin:QS,normal_fragment_maps:ew,normal_pars_fragment:tw,normal_pars_vertex:nw,normal_vertex:iw,normalmap_pars_fragment:rw,clearcoat_normal_fragment_begin:sw,clearcoat_normal_fragment_maps:ow,clearcoat_pars_fragment:aw,iridescence_pars_fragment:lw,opaque_fragment:cw,packing:uw,premultiplied_alpha_fragment:dw,project_vertex:fw,dithering_fragment:hw,dithering_pars_fragment:pw,roughnessmap_fragment:mw,roughnessmap_pars_fragment:gw,shadowmap_pars_fragment:_w,shadowmap_pars_vertex:vw,shadowmap_vertex:yw,shadowmask_pars_fragment:xw,skinbase_vertex:bw,skinning_pars_vertex:Sw,skinning_vertex:ww,skinnormal_vertex:Mw,specularmap_fragment:Ew,specularmap_pars_fragment:Tw,tonemapping_fragment:Aw,tonemapping_pars_fragment:Cw,transmission_fragment:Rw,transmission_pars_fragment:Pw,uv_pars_fragment:Lw,uv_pars_vertex:Dw,uv_vertex:Iw,worldpos_vertex:Ow,background_vert:Nw,background_frag:Uw,backgroundCube_vert:Fw,backgroundCube_frag:kw,cube_vert:Bw,cube_frag:zw,depth_vert:Hw,depth_frag:Vw,distanceRGBA_vert:Gw,distanceRGBA_frag:Ww,equirect_vert:Xw,equirect_frag:qw,linedashed_vert:Yw,linedashed_frag:jw,meshbasic_vert:$w,meshbasic_frag:Kw,meshlambert_vert:Zw,meshlambert_frag:Jw,meshmatcap_vert:Qw,meshmatcap_frag:eM,meshnormal_vert:tM,meshnormal_frag:nM,meshphong_vert:iM,meshphong_frag:rM,meshphysical_vert:sM,meshphysical_frag:oM,meshtoon_vert:aM,meshtoon_frag:lM,points_vert:cM,points_frag:uM,shadow_vert:dM,shadow_frag:fM,sprite_vert:hM,sprite_frag:pM},Ne={common:{diffuse:{value:new Je(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new gt},alphaMap:{value:null},alphaMapTransform:{value:new gt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new gt}},envmap:{envMap:{value:null},envMapRotation:{value:new gt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new gt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new gt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new gt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new gt},normalScale:{value:new Ct(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new gt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new gt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new gt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new gt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Je(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Je(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new gt},alphaTest:{value:0},uvTransform:{value:new gt}},sprite:{diffuse:{value:new Je(16777215)},opacity:{value:1},center:{value:new Ct(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new gt},alphaMap:{value:null},alphaMapTransform:{value:new gt},alphaTest:{value:0}}},rr={basic:{uniforms:jn([Ne.common,Ne.specularmap,Ne.envmap,Ne.aomap,Ne.lightmap,Ne.fog]),vertexShader:yt.meshbasic_vert,fragmentShader:yt.meshbasic_frag},lambert:{uniforms:jn([Ne.common,Ne.specularmap,Ne.envmap,Ne.aomap,Ne.lightmap,Ne.emissivemap,Ne.bumpmap,Ne.normalmap,Ne.displacementmap,Ne.fog,Ne.lights,{emissive:{value:new Je(0)}}]),vertexShader:yt.meshlambert_vert,fragmentShader:yt.meshlambert_frag},phong:{uniforms:jn([Ne.common,Ne.specularmap,Ne.envmap,Ne.aomap,Ne.lightmap,Ne.emissivemap,Ne.bumpmap,Ne.normalmap,Ne.displacementmap,Ne.fog,Ne.lights,{emissive:{value:new Je(0)},specular:{value:new Je(1118481)},shininess:{value:30}}]),vertexShader:yt.meshphong_vert,fragmentShader:yt.meshphong_frag},standard:{uniforms:jn([Ne.common,Ne.envmap,Ne.aomap,Ne.lightmap,Ne.emissivemap,Ne.bumpmap,Ne.normalmap,Ne.displacementmap,Ne.roughnessmap,Ne.metalnessmap,Ne.fog,Ne.lights,{emissive:{value:new Je(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:yt.meshphysical_vert,fragmentShader:yt.meshphysical_frag},toon:{uniforms:jn([Ne.common,Ne.aomap,Ne.lightmap,Ne.emissivemap,Ne.bumpmap,Ne.normalmap,Ne.displacementmap,Ne.gradientmap,Ne.fog,Ne.lights,{emissive:{value:new Je(0)}}]),vertexShader:yt.meshtoon_vert,fragmentShader:yt.meshtoon_frag},matcap:{uniforms:jn([Ne.common,Ne.bumpmap,Ne.normalmap,Ne.displacementmap,Ne.fog,{matcap:{value:null}}]),vertexShader:yt.meshmatcap_vert,fragmentShader:yt.meshmatcap_frag},points:{uniforms:jn([Ne.points,Ne.fog]),vertexShader:yt.points_vert,fragmentShader:yt.points_frag},dashed:{uniforms:jn([Ne.common,Ne.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:yt.linedashed_vert,fragmentShader:yt.linedashed_frag},depth:{uniforms:jn([Ne.common,Ne.displacementmap]),vertexShader:yt.depth_vert,fragmentShader:yt.depth_frag},normal:{uniforms:jn([Ne.common,Ne.bumpmap,Ne.normalmap,Ne.displacementmap,{opacity:{value:1}}]),vertexShader:yt.meshnormal_vert,fragmentShader:yt.meshnormal_frag},sprite:{uniforms:jn([Ne.sprite,Ne.fog]),vertexShader:yt.sprite_vert,fragmentShader:yt.sprite_frag},background:{uniforms:{uvTransform:{value:new gt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:yt.background_vert,fragmentShader:yt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new gt}},vertexShader:yt.backgroundCube_vert,fragmentShader:yt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:yt.cube_vert,fragmentShader:yt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:yt.equirect_vert,fragmentShader:yt.equirect_frag},distanceRGBA:{uniforms:jn([Ne.common,Ne.displacementmap,{referencePosition:{value:new G},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:yt.distanceRGBA_vert,fragmentShader:yt.distanceRGBA_frag},shadow:{uniforms:jn([Ne.lights,Ne.fog,{color:{value:new Je(0)},opacity:{value:1}}]),vertexShader:yt.shadow_vert,fragmentShader:yt.shadow_frag}};rr.physical={uniforms:jn([rr.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new gt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new gt},clearcoatNormalScale:{value:new Ct(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new gt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new gt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new gt},sheen:{value:0},sheenColor:{value:new Je(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new gt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new gt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new gt},transmissionSamplerSize:{value:new Ct},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new gt},attenuationDistance:{value:0},attenuationColor:{value:new Je(0)},specularColor:{value:new Je(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new gt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new gt},anisotropyVector:{value:new Ct},anisotropyMap:{value:null},anisotropyMapTransform:{value:new gt}}]),vertexShader:yt.meshphysical_vert,fragmentShader:yt.meshphysical_frag};const _c={r:0,b:0,g:0},Ps=new pr,mM=new _t;function gM(r,e,t,n,i,s,o){const a=new Je(0);let l=s===!0?0:1,c,u,d=null,f=0,h=null;function _(x){let v=x.isScene===!0?x.background:null;return v&&v.isTexture&&(v=(x.backgroundBlurriness>0?t:e).get(v)),v}function g(x){let v=!1;const T=_(x);T===null?p(a,l):T&&T.isColor&&(p(T,1),v=!0);const M=r.xr.getEnvironmentBlendMode();M==="additive"?n.buffers.color.setClear(0,0,0,1,o):M==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(r.autoClear||v)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil))}function m(x,v){const T=_(v);T&&(T.isCubeTexture||T.mapping===wu)?(u===void 0&&(u=new ei(new Vl(1,1,1),new Oi({name:"BackgroundCubeMaterial",uniforms:da(rr.backgroundCube.uniforms),vertexShader:rr.backgroundCube.vertexShader,fragmentShader:rr.backgroundCube.fragmentShader,side:si,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(M,E,P){this.matrixWorld.copyPosition(P.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(u)),Ps.copy(v.backgroundRotation),Ps.x*=-1,Ps.y*=-1,Ps.z*=-1,T.isCubeTexture&&T.isRenderTargetTexture===!1&&(Ps.y*=-1,Ps.z*=-1),u.material.uniforms.envMap.value=T,u.material.uniforms.flipEnvMap.value=T.isCubeTexture&&T.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=v.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(mM.makeRotationFromEuler(Ps)),u.material.toneMapped=Nt.getTransfer(T.colorSpace)!==Yt,(d!==T||f!==T.version||h!==r.toneMapping)&&(u.material.needsUpdate=!0,d=T,f=T.version,h=r.toneMapping),u.layers.enableAll(),x.unshift(u,u.geometry,u.material,0,0,null)):T&&T.isTexture&&(c===void 0&&(c=new ei(new Gi(2,2),new Oi({name:"BackgroundMaterial",uniforms:da(rr.background.uniforms),vertexShader:rr.background.vertexShader,fragmentShader:rr.background.fragmentShader,side:zr,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=T,c.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,c.material.toneMapped=Nt.getTransfer(T.colorSpace)!==Yt,T.matrixAutoUpdate===!0&&T.updateMatrix(),c.material.uniforms.uvTransform.value.copy(T.matrix),(d!==T||f!==T.version||h!==r.toneMapping)&&(c.material.needsUpdate=!0,d=T,f=T.version,h=r.toneMapping),c.layers.enableAll(),x.unshift(c,c.geometry,c.material,0,0,null))}function p(x,v){x.getRGB(_c,C_(r)),n.buffers.color.setClear(_c.r,_c.g,_c.b,v,o)}function S(){u!==void 0&&(u.geometry.dispose(),u.material.dispose(),u=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(x,v=1){a.set(x),l=v,p(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(x){l=x,p(a,l)},render:g,addToRenderList:m,dispose:S}}function _M(r,e){const t=r.getParameter(r.MAX_VERTEX_ATTRIBS),n={},i=f(null);let s=i,o=!1;function a(b,D,B,U,K){let F=!1;const C=d(U,B,D);s!==C&&(s=C,c(s.object)),F=h(b,U,B,K),F&&_(b,U,B,K),K!==null&&e.update(K,r.ELEMENT_ARRAY_BUFFER),(F||o)&&(o=!1,v(b,D,B,U),K!==null&&r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,e.get(K).buffer))}function l(){return r.createVertexArray()}function c(b){return r.bindVertexArray(b)}function u(b){return r.deleteVertexArray(b)}function d(b,D,B){const U=B.wireframe===!0;let K=n[b.id];K===void 0&&(K={},n[b.id]=K);let F=K[D.id];F===void 0&&(F={},K[D.id]=F);let C=F[U];return C===void 0&&(C=f(l()),F[U]=C),C}function f(b){const D=[],B=[],U=[];for(let K=0;K<t;K++)D[K]=0,B[K]=0,U[K]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:D,enabledAttributes:B,attributeDivisors:U,object:b,attributes:{},index:null}}function h(b,D,B,U){const K=s.attributes,F=D.attributes;let C=0;const J=B.getAttributes();for(const X in J)if(J[X].location>=0){const I=K[X];let _e=F[X];if(_e===void 0&&(X==="instanceMatrix"&&b.instanceMatrix&&(_e=b.instanceMatrix),X==="instanceColor"&&b.instanceColor&&(_e=b.instanceColor)),I===void 0||I.attribute!==_e||_e&&I.data!==_e.data)return!0;C++}return s.attributesNum!==C||s.index!==U}function _(b,D,B,U){const K={},F=D.attributes;let C=0;const J=B.getAttributes();for(const X in J)if(J[X].location>=0){let I=F[X];I===void 0&&(X==="instanceMatrix"&&b.instanceMatrix&&(I=b.instanceMatrix),X==="instanceColor"&&b.instanceColor&&(I=b.instanceColor));const _e={};_e.attribute=I,I&&I.data&&(_e.data=I.data),K[X]=_e,C++}s.attributes=K,s.attributesNum=C,s.index=U}function g(){const b=s.newAttributes;for(let D=0,B=b.length;D<B;D++)b[D]=0}function m(b){p(b,0)}function p(b,D){const B=s.newAttributes,U=s.enabledAttributes,K=s.attributeDivisors;B[b]=1,U[b]===0&&(r.enableVertexAttribArray(b),U[b]=1),K[b]!==D&&(r.vertexAttribDivisor(b,D),K[b]=D)}function S(){const b=s.newAttributes,D=s.enabledAttributes;for(let B=0,U=D.length;B<U;B++)D[B]!==b[B]&&(r.disableVertexAttribArray(B),D[B]=0)}function x(b,D,B,U,K,F,C){C===!0?r.vertexAttribIPointer(b,D,B,K,F):r.vertexAttribPointer(b,D,B,U,K,F)}function v(b,D,B,U){g();const K=U.attributes,F=B.getAttributes(),C=D.defaultAttributeValues;for(const J in F){const X=F[J];if(X.location>=0){let me=K[J];if(me===void 0&&(J==="instanceMatrix"&&b.instanceMatrix&&(me=b.instanceMatrix),J==="instanceColor"&&b.instanceColor&&(me=b.instanceColor)),me!==void 0){const I=me.normalized,_e=me.itemSize,Y=e.get(me);if(Y===void 0)continue;const Re=Y.buffer,Q=Y.type,se=Y.bytesPerElement,Me=Q===r.INT||Q===r.UNSIGNED_INT||me.gpuType===yh;if(me.isInterleavedBufferAttribute){const ve=me.data,De=ve.stride,Qe=me.offset;if(ve.isInstancedInterleavedBuffer){for(let Pe=0;Pe<X.locationSize;Pe++)p(X.location+Pe,ve.meshPerAttribute);b.isInstancedMesh!==!0&&U._maxInstanceCount===void 0&&(U._maxInstanceCount=ve.meshPerAttribute*ve.count)}else for(let Pe=0;Pe<X.locationSize;Pe++)m(X.location+Pe);r.bindBuffer(r.ARRAY_BUFFER,Re);for(let Pe=0;Pe<X.locationSize;Pe++)x(X.location+Pe,_e/X.locationSize,Q,I,De*se,(Qe+_e/X.locationSize*Pe)*se,Me)}else{if(me.isInstancedBufferAttribute){for(let ve=0;ve<X.locationSize;ve++)p(X.location+ve,me.meshPerAttribute);b.isInstancedMesh!==!0&&U._maxInstanceCount===void 0&&(U._maxInstanceCount=me.meshPerAttribute*me.count)}else for(let ve=0;ve<X.locationSize;ve++)m(X.location+ve);r.bindBuffer(r.ARRAY_BUFFER,Re);for(let ve=0;ve<X.locationSize;ve++)x(X.location+ve,_e/X.locationSize,Q,I,_e*se,_e/X.locationSize*ve*se,Me)}}else if(C!==void 0){const I=C[J];if(I!==void 0)switch(I.length){case 2:r.vertexAttrib2fv(X.location,I);break;case 3:r.vertexAttrib3fv(X.location,I);break;case 4:r.vertexAttrib4fv(X.location,I);break;default:r.vertexAttrib1fv(X.location,I)}}}}S()}function T(){P();for(const b in n){const D=n[b];for(const B in D){const U=D[B];for(const K in U)u(U[K].object),delete U[K];delete D[B]}delete n[b]}}function M(b){if(n[b.id]===void 0)return;const D=n[b.id];for(const B in D){const U=D[B];for(const K in U)u(U[K].object),delete U[K];delete D[B]}delete n[b.id]}function E(b){for(const D in n){const B=n[D];if(B[b.id]===void 0)continue;const U=B[b.id];for(const K in U)u(U[K].object),delete U[K];delete B[b.id]}}function P(){y(),o=!0,s!==i&&(s=i,c(s.object))}function y(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:a,reset:P,resetDefaultState:y,dispose:T,releaseStatesOfGeometry:M,releaseStatesOfProgram:E,initAttributes:g,enableAttribute:m,disableUnusedAttributes:S}}function vM(r,e,t){let n;function i(c){n=c}function s(c,u){r.drawArrays(n,c,u),t.update(u,n,1)}function o(c,u,d){d!==0&&(r.drawArraysInstanced(n,c,u,d),t.update(u,n,d))}function a(c,u,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,u,0,d);let h=0;for(let _=0;_<d;_++)h+=u[_];t.update(h,n,1)}function l(c,u,d,f){if(d===0)return;const h=e.get("WEBGL_multi_draw");if(h===null)for(let _=0;_<c.length;_++)o(c[_],u[_],f[_]);else{h.multiDrawArraysInstancedWEBGL(n,c,0,u,0,f,0,d);let _=0;for(let g=0;g<d;g++)_+=u[g]*f[g];t.update(_,n,1)}}this.setMode=i,this.render=s,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function yM(r,e,t,n){let i;function s(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){const E=e.get("EXT_texture_filter_anisotropic");i=r.getParameter(E.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(E){return!(E!==Ii&&n.convert(E)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(E){const P=E===Hl&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(E!==hr&&n.convert(E)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_TYPE)&&E!==Yi&&!P)}function l(E){if(E==="highp"){if(r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.HIGH_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision>0)return"highp";E="mediump"}return E==="mediump"&&r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.MEDIUM_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const u=l(c);u!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);const d=t.logarithmicDepthBuffer===!0,f=t.reverseDepthBuffer===!0&&e.has("EXT_clip_control"),h=r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS),_=r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS),g=r.getParameter(r.MAX_TEXTURE_SIZE),m=r.getParameter(r.MAX_CUBE_MAP_TEXTURE_SIZE),p=r.getParameter(r.MAX_VERTEX_ATTRIBS),S=r.getParameter(r.MAX_VERTEX_UNIFORM_VECTORS),x=r.getParameter(r.MAX_VARYING_VECTORS),v=r.getParameter(r.MAX_FRAGMENT_UNIFORM_VECTORS),T=_>0,M=r.getParameter(r.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:d,reverseDepthBuffer:f,maxTextures:h,maxVertexTextures:_,maxTextureSize:g,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:S,maxVaryings:x,maxFragmentUniforms:v,vertexTextures:T,maxSamples:M}}function xM(r){const e=this;let t=null,n=0,i=!1,s=!1;const o=new Us,a=new gt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,f){const h=d.length!==0||f||n!==0||i;return i=f,n=d.length,h},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(d,f){t=u(d,f,0)},this.setState=function(d,f,h){const _=d.clippingPlanes,g=d.clipIntersection,m=d.clipShadows,p=r.get(d);if(!i||_===null||_.length===0||s&&!m)s?u(null):c();else{const S=s?0:n,x=S*4;let v=p.clippingState||null;l.value=v,v=u(_,f,x,h);for(let T=0;T!==x;++T)v[T]=t[T];p.clippingState=v,this.numIntersection=g?this.numPlanes:0,this.numPlanes+=S}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function u(d,f,h,_){const g=d!==null?d.length:0;let m=null;if(g!==0){if(m=l.value,_!==!0||m===null){const p=h+g*4,S=f.matrixWorldInverse;a.getNormalMatrix(S),(m===null||m.length<p)&&(m=new Float32Array(p));for(let x=0,v=h;x!==g;++x,v+=4)o.copy(d[x]).applyMatrix4(S,a),o.normal.toArray(m,v),m[v+3]=o.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=g,e.numIntersection=0,m}}function bM(r){let e=new WeakMap;function t(o,a){return a===$d?o.mapping=aa:a===Kd&&(o.mapping=la),o}function n(o){if(o&&o.isTexture){const a=o.mapping;if(a===$d||a===Kd)if(e.has(o)){const l=e.get(o).texture;return t(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new Vx(l.height);return c.fromEquirectangularTexture(r,o),e.set(o,c),o.addEventListener("dispose",i),t(c.texture,o.mapping)}else return null}}return o}function i(o){const a=o.target;a.removeEventListener("dispose",i);const l=e.get(a);l!==void 0&&(e.delete(a),l.dispose())}function s(){e=new WeakMap}return{get:n,dispose:s}}const Vo=4,gm=[.125,.215,.35,.446,.526,.582],Gs=20,dd=new Tu,_m=new Je;let fd=null,hd=0,pd=0,md=!1;const Fs=(1+Math.sqrt(5))/2,Io=1/Fs,vm=[new G(-Fs,Io,0),new G(Fs,Io,0),new G(-Io,0,Fs),new G(Io,0,Fs),new G(0,Fs,-Io),new G(0,Fs,Io),new G(-1,1,-1),new G(1,1,-1),new G(-1,1,1),new G(1,1,1)],SM=new G;class ym{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,i=100,s={}){const{size:o=256,position:a=SM}=s;fd=this._renderer.getRenderTarget(),hd=this._renderer.getActiveCubeFace(),pd=this._renderer.getActiveMipmapLevel(),md=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,n,i,l,a),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Sm(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=bm(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(fd,hd,pd),this._renderer.xr.enabled=md,e.scissorTest=!1,vc(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===aa||e.mapping===la?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),fd=this._renderer.getRenderTarget(),hd=this._renderer.getActiveCubeFace(),pd=this._renderer.getActiveMipmapLevel(),md=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:xi,minFilter:xi,generateMipmaps:!1,type:Hl,format:Ii,colorSpace:ni,depthBuffer:!1},i=xm(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=xm(e,t,n);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=wM(s)),this._blurMaterial=MM(s,e,t)}return i}_compileMaterial(e){const t=new ei(this._lodPlanes[0],e);this._renderer.compile(t,dd)}_sceneToCubeUV(e,t,n,i,s){const l=new ri(90,1,t,n),c=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],d=this._renderer,f=d.autoClear,h=d.toneMapping;d.getClearColor(_m),d.toneMapping=hs,d.autoClear=!1;const _=new Ws({name:"PMREM.Background",side:si,depthWrite:!1,depthTest:!1}),g=new ei(new Vl,_);let m=!1;const p=e.background;p?p.isColor&&(_.color.copy(p),e.background=null,m=!0):(_.color.copy(_m),m=!0);for(let S=0;S<6;S++){const x=S%3;x===0?(l.up.set(0,c[S],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x+u[S],s.y,s.z)):x===1?(l.up.set(0,0,c[S]),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y+u[S],s.z)):(l.up.set(0,c[S],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y,s.z+u[S]));const v=this._cubeSize;vc(i,x*v,S>2?v:0,v,v),d.setRenderTarget(i),m&&d.render(g,l),d.render(e,l)}g.geometry.dispose(),g.material.dispose(),d.toneMapping=h,d.autoClear=f,e.background=p}_textureToCubeUV(e,t){const n=this._renderer,i=e.mapping===aa||e.mapping===la;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=Sm()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=bm());const s=i?this._cubemapMaterial:this._equirectMaterial,o=new ei(this._lodPlanes[0],s),a=s.uniforms;a.envMap.value=e;const l=this._cubeSize;vc(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(o,dd)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const i=this._lodPlanes.length;for(let s=1;s<i;s++){const o=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),a=vm[(i-s-1)%vm.length];this._blur(e,s-1,s,o,a)}t.autoClear=n}_blur(e,t,n,i,s){const o=this._pingPongRenderTarget;this._halfBlur(e,o,t,n,i,"latitudinal",s),this._halfBlur(o,e,n,n,i,"longitudinal",s)}_halfBlur(e,t,n,i,s,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,d=new ei(this._lodPlanes[i],c),f=c.uniforms,h=this._sizeLods[n]-1,_=isFinite(s)?Math.PI/(2*h):2*Math.PI/(2*Gs-1),g=s/_,m=isFinite(s)?1+Math.floor(u*g):Gs;m>Gs&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Gs}`);const p=[];let S=0;for(let E=0;E<Gs;++E){const P=E/g,y=Math.exp(-P*P/2);p.push(y),E===0?S+=y:E<m&&(S+=2*y)}for(let E=0;E<p.length;E++)p[E]=p[E]/S;f.envMap.value=e.texture,f.samples.value=m,f.weights.value=p,f.latitudinal.value=o==="latitudinal",a&&(f.poleAxis.value=a);const{_lodMax:x}=this;f.dTheta.value=_,f.mipInt.value=x-n;const v=this._sizeLods[i],T=3*v*(i>x-Vo?i-x+Vo:0),M=4*(this._cubeSize-v);vc(t,T,M,3*v,2*v),l.setRenderTarget(t),l.render(d,dd)}}function wM(r){const e=[],t=[],n=[];let i=r;const s=r-Vo+1+gm.length;for(let o=0;o<s;o++){const a=Math.pow(2,i);t.push(a);let l=1/a;o>r-Vo?l=gm[o-r+Vo-1]:o===0&&(l=0),n.push(l);const c=1/(a-2),u=-c,d=1+c,f=[u,u,d,u,d,d,u,u,d,d,u,d],h=6,_=6,g=3,m=2,p=1,S=new Float32Array(g*_*h),x=new Float32Array(m*_*h),v=new Float32Array(p*_*h);for(let M=0;M<h;M++){const E=M%3*2/3-1,P=M>2?0:-1,y=[E,P,0,E+2/3,P,0,E+2/3,P+1,0,E,P,0,E+2/3,P+1,0,E,P+1,0];S.set(y,g*_*M),x.set(f,m*_*M);const b=[M,M,M,M,M,M];v.set(b,p*_*M)}const T=new ki;T.setAttribute("position",new Wt(S,g)),T.setAttribute("uv",new Wt(x,m)),T.setAttribute("faceIndex",new Wt(v,p)),e.push(T),i>Vo&&i--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function xm(r,e,t){const n=new so(r,e,t);return n.texture.mapping=wu,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function vc(r,e,t,n,i){r.viewport.set(e,t,n,i),r.scissor.set(e,t,n,i)}function MM(r,e,t){const n=new Float32Array(Gs),i=new G(0,1,0);return new Oi({name:"SphericalGaussianBlur",defines:{n:Gs,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:Uh(),fragmentShader:`

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
		`,blending:ds,depthTest:!1,depthWrite:!1})}function bm(){return new Oi({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Uh(),fragmentShader:`

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
		`,blending:ds,depthTest:!1,depthWrite:!1})}function Sm(){return new Oi({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Uh(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:ds,depthTest:!1,depthWrite:!1})}function Uh(){return`

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
	`}function EM(r){let e=new WeakMap,t=null;function n(a){if(a&&a.isTexture){const l=a.mapping,c=l===$d||l===Kd,u=l===aa||l===la;if(c||u){let d=e.get(a);const f=d!==void 0?d.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==f)return t===null&&(t=new ym(r)),d=c?t.fromEquirectangular(a,d):t.fromCubemap(a,d),d.texture.pmremVersion=a.pmremVersion,e.set(a,d),d.texture;if(d!==void 0)return d.texture;{const h=a.image;return c&&h&&h.height>0||u&&h&&i(h)?(t===null&&(t=new ym(r)),d=c?t.fromEquirectangular(a):t.fromCubemap(a),d.texture.pmremVersion=a.pmremVersion,e.set(a,d),a.addEventListener("dispose",s),d.texture):null}}}return a}function i(a){let l=0;const c=6;for(let u=0;u<c;u++)a[u]!==void 0&&l++;return l===c}function s(a){const l=a.target;l.removeEventListener("dispose",s);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:o}}function TM(r){const e={};function t(n){if(e[n]!==void 0)return e[n];let i;switch(n){case"WEBGL_depth_texture":i=r.getExtension("WEBGL_depth_texture")||r.getExtension("MOZ_WEBGL_depth_texture")||r.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=r.getExtension("EXT_texture_filter_anisotropic")||r.getExtension("MOZ_EXT_texture_filter_anisotropic")||r.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=r.getExtension("WEBGL_compressed_texture_s3tc")||r.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=r.getExtension("WEBGL_compressed_texture_pvrtc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=r.getExtension(n)}return e[n]=i,i}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const i=t(n);return i===null&&jo("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function AM(r,e,t,n){const i={},s=new WeakMap;function o(d){const f=d.target;f.index!==null&&e.remove(f.index);for(const _ in f.attributes)e.remove(f.attributes[_]);f.removeEventListener("dispose",o),delete i[f.id];const h=s.get(f);h&&(e.remove(h),s.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,t.memory.geometries--}function a(d,f){return i[f.id]===!0||(f.addEventListener("dispose",o),i[f.id]=!0,t.memory.geometries++),f}function l(d){const f=d.attributes;for(const h in f)e.update(f[h],r.ARRAY_BUFFER)}function c(d){const f=[],h=d.index,_=d.attributes.position;let g=0;if(h!==null){const S=h.array;g=h.version;for(let x=0,v=S.length;x<v;x+=3){const T=S[x+0],M=S[x+1],E=S[x+2];f.push(T,M,M,E,E,T)}}else if(_!==void 0){const S=_.array;g=_.version;for(let x=0,v=S.length/3-1;x<v;x+=3){const T=x+0,M=x+1,E=x+2;f.push(T,M,M,E,E,T)}}else return;const m=new(S_(f)?A_:T_)(f,1);m.version=g;const p=s.get(d);p&&e.remove(p),s.set(d,m)}function u(d){const f=s.get(d);if(f){const h=d.index;h!==null&&f.version<h.version&&c(d)}else c(d);return s.get(d)}return{get:a,update:l,getWireframeAttribute:u}}function CM(r,e,t){let n;function i(f){n=f}let s,o;function a(f){s=f.type,o=f.bytesPerElement}function l(f,h){r.drawElements(n,h,s,f*o),t.update(h,n,1)}function c(f,h,_){_!==0&&(r.drawElementsInstanced(n,h,s,f*o,_),t.update(h,n,_))}function u(f,h,_){if(_===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,h,0,s,f,0,_);let m=0;for(let p=0;p<_;p++)m+=h[p];t.update(m,n,1)}function d(f,h,_,g){if(_===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<f.length;p++)c(f[p]/o,h[p],g[p]);else{m.multiDrawElementsInstancedWEBGL(n,h,0,s,f,0,g,0,_);let p=0;for(let S=0;S<_;S++)p+=h[S]*g[S];t.update(p,n,1)}}this.setMode=i,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=u,this.renderMultiDrawInstances=d}function RM(r){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,o,a){switch(t.calls++,o){case r.TRIANGLES:t.triangles+=a*(s/3);break;case r.LINES:t.lines+=a*(s/2);break;case r.LINE_STRIP:t.lines+=a*(s-1);break;case r.LINE_LOOP:t.lines+=a*s;break;case r.POINTS:t.points+=a*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function i(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:i,update:n}}function PM(r,e,t){const n=new WeakMap,i=new zt;function s(o,a,l){const c=o.morphTargetInfluences,u=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,d=u!==void 0?u.length:0;let f=n.get(a);if(f===void 0||f.count!==d){let b=function(){P.dispose(),n.delete(a),a.removeEventListener("dispose",b)};var h=b;f!==void 0&&f.texture.dispose();const _=a.morphAttributes.position!==void 0,g=a.morphAttributes.normal!==void 0,m=a.morphAttributes.color!==void 0,p=a.morphAttributes.position||[],S=a.morphAttributes.normal||[],x=a.morphAttributes.color||[];let v=0;_===!0&&(v=1),g===!0&&(v=2),m===!0&&(v=3);let T=a.attributes.position.count*v,M=1;T>e.maxTextureSize&&(M=Math.ceil(T/e.maxTextureSize),T=e.maxTextureSize);const E=new Float32Array(T*M*4*d),P=new w_(E,T,M,d);P.type=Yi,P.needsUpdate=!0;const y=v*4;for(let D=0;D<d;D++){const B=p[D],U=S[D],K=x[D],F=T*M*4*D;for(let C=0;C<B.count;C++){const J=C*y;_===!0&&(i.fromBufferAttribute(B,C),E[F+J+0]=i.x,E[F+J+1]=i.y,E[F+J+2]=i.z,E[F+J+3]=0),g===!0&&(i.fromBufferAttribute(U,C),E[F+J+4]=i.x,E[F+J+5]=i.y,E[F+J+6]=i.z,E[F+J+7]=0),m===!0&&(i.fromBufferAttribute(K,C),E[F+J+8]=i.x,E[F+J+9]=i.y,E[F+J+10]=i.z,E[F+J+11]=K.itemSize===4?i.w:1)}}f={count:d,texture:P,size:new Ct(T,M)},n.set(a,f),a.addEventListener("dispose",b)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(r,"morphTexture",o.morphTexture,t);else{let _=0;for(let m=0;m<c.length;m++)_+=c[m];const g=a.morphTargetsRelative?1:1-_;l.getUniforms().setValue(r,"morphTargetBaseInfluence",g),l.getUniforms().setValue(r,"morphTargetInfluences",c)}l.getUniforms().setValue(r,"morphTargetsTexture",f.texture,t),l.getUniforms().setValue(r,"morphTargetsTextureSize",f.size)}return{update:s}}function LM(r,e,t,n){let i=new WeakMap;function s(l){const c=n.render.frame,u=l.geometry,d=e.get(l,u);if(i.get(d)!==c&&(e.update(d),i.set(d,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),i.get(l)!==c&&(t.update(l.instanceMatrix,r.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,r.ARRAY_BUFFER),i.set(l,c))),l.isSkinnedMesh){const f=l.skeleton;i.get(f)!==c&&(f.update(),i.set(f,c))}return d}function o(){i=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:s,dispose:o}}const H_=new Mn,wm=new N_(1,1),V_=new w_,G_=new Ex,W_=new P_,Mm=[],Em=[],Tm=new Float32Array(16),Am=new Float32Array(9),Cm=new Float32Array(4);function Ta(r,e,t){const n=r[0];if(n<=0||n>0)return r;const i=e*t;let s=Mm[i];if(s===void 0&&(s=new Float32Array(i),Mm[i]=s),e!==0){n.toArray(s,0);for(let o=1,a=0;o!==e;++o)a+=t,r[o].toArray(s,a)}return s}function En(r,e){if(r.length!==e.length)return!1;for(let t=0,n=r.length;t<n;t++)if(r[t]!==e[t])return!1;return!0}function Tn(r,e){for(let t=0,n=e.length;t<n;t++)r[t]=e[t]}function Au(r,e){let t=Em[e];t===void 0&&(t=new Int32Array(e),Em[e]=t);for(let n=0;n!==e;++n)t[n]=r.allocateTextureUnit();return t}function DM(r,e){const t=this.cache;t[0]!==e&&(r.uniform1f(this.addr,e),t[0]=e)}function IM(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(En(t,e))return;r.uniform2fv(this.addr,e),Tn(t,e)}}function OM(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(r.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(En(t,e))return;r.uniform3fv(this.addr,e),Tn(t,e)}}function NM(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(En(t,e))return;r.uniform4fv(this.addr,e),Tn(t,e)}}function UM(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(En(t,e))return;r.uniformMatrix2fv(this.addr,!1,e),Tn(t,e)}else{if(En(t,n))return;Cm.set(n),r.uniformMatrix2fv(this.addr,!1,Cm),Tn(t,n)}}function FM(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(En(t,e))return;r.uniformMatrix3fv(this.addr,!1,e),Tn(t,e)}else{if(En(t,n))return;Am.set(n),r.uniformMatrix3fv(this.addr,!1,Am),Tn(t,n)}}function kM(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(En(t,e))return;r.uniformMatrix4fv(this.addr,!1,e),Tn(t,e)}else{if(En(t,n))return;Tm.set(n),r.uniformMatrix4fv(this.addr,!1,Tm),Tn(t,n)}}function BM(r,e){const t=this.cache;t[0]!==e&&(r.uniform1i(this.addr,e),t[0]=e)}function zM(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(En(t,e))return;r.uniform2iv(this.addr,e),Tn(t,e)}}function HM(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(En(t,e))return;r.uniform3iv(this.addr,e),Tn(t,e)}}function VM(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(En(t,e))return;r.uniform4iv(this.addr,e),Tn(t,e)}}function GM(r,e){const t=this.cache;t[0]!==e&&(r.uniform1ui(this.addr,e),t[0]=e)}function WM(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(En(t,e))return;r.uniform2uiv(this.addr,e),Tn(t,e)}}function XM(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(En(t,e))return;r.uniform3uiv(this.addr,e),Tn(t,e)}}function qM(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(En(t,e))return;r.uniform4uiv(this.addr,e),Tn(t,e)}}function YM(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i);let s;this.type===r.SAMPLER_2D_SHADOW?(wm.compareFunction=b_,s=wm):s=H_,t.setTexture2D(e||s,i)}function jM(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture3D(e||G_,i)}function $M(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTextureCube(e||W_,i)}function KM(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture2DArray(e||V_,i)}function ZM(r){switch(r){case 5126:return DM;case 35664:return IM;case 35665:return OM;case 35666:return NM;case 35674:return UM;case 35675:return FM;case 35676:return kM;case 5124:case 35670:return BM;case 35667:case 35671:return zM;case 35668:case 35672:return HM;case 35669:case 35673:return VM;case 5125:return GM;case 36294:return WM;case 36295:return XM;case 36296:return qM;case 35678:case 36198:case 36298:case 36306:case 35682:return YM;case 35679:case 36299:case 36307:return jM;case 35680:case 36300:case 36308:case 36293:return $M;case 36289:case 36303:case 36311:case 36292:return KM}}function JM(r,e){r.uniform1fv(this.addr,e)}function QM(r,e){const t=Ta(e,this.size,2);r.uniform2fv(this.addr,t)}function eE(r,e){const t=Ta(e,this.size,3);r.uniform3fv(this.addr,t)}function tE(r,e){const t=Ta(e,this.size,4);r.uniform4fv(this.addr,t)}function nE(r,e){const t=Ta(e,this.size,4);r.uniformMatrix2fv(this.addr,!1,t)}function iE(r,e){const t=Ta(e,this.size,9);r.uniformMatrix3fv(this.addr,!1,t)}function rE(r,e){const t=Ta(e,this.size,16);r.uniformMatrix4fv(this.addr,!1,t)}function sE(r,e){r.uniform1iv(this.addr,e)}function oE(r,e){r.uniform2iv(this.addr,e)}function aE(r,e){r.uniform3iv(this.addr,e)}function lE(r,e){r.uniform4iv(this.addr,e)}function cE(r,e){r.uniform1uiv(this.addr,e)}function uE(r,e){r.uniform2uiv(this.addr,e)}function dE(r,e){r.uniform3uiv(this.addr,e)}function fE(r,e){r.uniform4uiv(this.addr,e)}function hE(r,e,t){const n=this.cache,i=e.length,s=Au(t,i);En(n,s)||(r.uniform1iv(this.addr,s),Tn(n,s));for(let o=0;o!==i;++o)t.setTexture2D(e[o]||H_,s[o])}function pE(r,e,t){const n=this.cache,i=e.length,s=Au(t,i);En(n,s)||(r.uniform1iv(this.addr,s),Tn(n,s));for(let o=0;o!==i;++o)t.setTexture3D(e[o]||G_,s[o])}function mE(r,e,t){const n=this.cache,i=e.length,s=Au(t,i);En(n,s)||(r.uniform1iv(this.addr,s),Tn(n,s));for(let o=0;o!==i;++o)t.setTextureCube(e[o]||W_,s[o])}function gE(r,e,t){const n=this.cache,i=e.length,s=Au(t,i);En(n,s)||(r.uniform1iv(this.addr,s),Tn(n,s));for(let o=0;o!==i;++o)t.setTexture2DArray(e[o]||V_,s[o])}function _E(r){switch(r){case 5126:return JM;case 35664:return QM;case 35665:return eE;case 35666:return tE;case 35674:return nE;case 35675:return iE;case 35676:return rE;case 5124:case 35670:return sE;case 35667:case 35671:return oE;case 35668:case 35672:return aE;case 35669:case 35673:return lE;case 5125:return cE;case 36294:return uE;case 36295:return dE;case 36296:return fE;case 35678:case 36198:case 36298:case 36306:case 35682:return hE;case 35679:case 36299:case 36307:return pE;case 35680:case 36300:case 36308:case 36293:return mE;case 36289:case 36303:case 36311:case 36292:return gE}}class vE{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=ZM(t.type)}}class yE{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=_E(t.type)}}class xE{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const i=this.seq;for(let s=0,o=i.length;s!==o;++s){const a=i[s];a.setValue(e,t[a.id],n)}}}const gd=/(\w+)(\])?(\[|\.)?/g;function Rm(r,e){r.seq.push(e),r.map[e.id]=e}function bE(r,e,t){const n=r.name,i=n.length;for(gd.lastIndex=0;;){const s=gd.exec(n),o=gd.lastIndex;let a=s[1];const l=s[2]==="]",c=s[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===i){Rm(t,c===void 0?new vE(a,r,e):new yE(a,r,e));break}else{let d=t.map[a];d===void 0&&(d=new xE(a),Rm(t,d)),t=d}}}class Wc{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){const s=e.getActiveUniform(t,i),o=e.getUniformLocation(t,s.name);bE(s,o,this)}}setValue(e,t,n,i){const s=this.map[t];s!==void 0&&s.setValue(e,n,i)}setOptional(e,t,n){const i=t[n];i!==void 0&&this.setValue(e,n,i)}static upload(e,t,n,i){for(let s=0,o=t.length;s!==o;++s){const a=t[s],l=n[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,i)}}static seqWithValue(e,t){const n=[];for(let i=0,s=e.length;i!==s;++i){const o=e[i];o.id in t&&n.push(o)}return n}}function Pm(r,e,t){const n=r.createShader(e);return r.shaderSource(n,t),r.compileShader(n),n}const SE=37297;let wE=0;function ME(r,e){const t=r.split(`
`),n=[],i=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let o=i;o<s;o++){const a=o+1;n.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return n.join(`
`)}const Lm=new gt;function EE(r){Nt._getMatrix(Lm,Nt.workingColorSpace,r);const e=`mat3( ${Lm.elements.map(t=>t.toFixed(4))} )`;switch(Nt.getTransfer(r)){case ru:return[e,"LinearTransferOETF"];case Yt:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",r),[e,"LinearTransferOETF"]}}function Dm(r,e,t){const n=r.getShaderParameter(e,r.COMPILE_STATUS),i=r.getShaderInfoLog(e).trim();if(n&&i==="")return"";const s=/ERROR: 0:(\d+)/.exec(i);if(s){const o=parseInt(s[1]);return t.toUpperCase()+`

`+i+`

`+ME(r.getShaderSource(e),o)}else return i}function TE(r,e){const t=EE(e);return[`vec4 ${r}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function AE(r,e){let t;switch(e){case Iy:t="Linear";break;case Oy:t="Reinhard";break;case Ny:t="Cineon";break;case Uy:t="ACESFilmic";break;case ky:t="AgX";break;case By:t="Neutral";break;case Fy:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+r+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const yc=new G;function CE(){Nt.getLuminanceCoefficients(yc);const r=yc.x.toFixed(4),e=yc.y.toFixed(4),t=yc.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${r}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function RE(r){return[r.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",r.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Wa).join(`
`)}function PE(r){const e=[];for(const t in r){const n=r[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function LE(r,e){const t={},n=r.getProgramParameter(e,r.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){const s=r.getActiveAttrib(e,i),o=s.name;let a=1;s.type===r.FLOAT_MAT2&&(a=2),s.type===r.FLOAT_MAT3&&(a=3),s.type===r.FLOAT_MAT4&&(a=4),t[o]={type:s.type,location:r.getAttribLocation(e,o),locationSize:a}}return t}function Wa(r){return r!==""}function Im(r,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return r.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Om(r,e){return r.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const DE=/^[ \t]*#include +<([\w\d./]+)>/gm;function Rf(r){return r.replace(DE,OE)}const IE=new Map;function OE(r,e){let t=yt[e];if(t===void 0){const n=IE.get(e);if(n!==void 0)t=yt[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return Rf(t)}const NE=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Nm(r){return r.replace(NE,UE)}function UE(r,e,t,n){let i="";for(let s=parseInt(e);s<parseInt(t);s++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return i}function Um(r){let e=`precision ${r.precision} float;
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
#define LOW_PRECISION`),e}function FE(r){let e="SHADOWMAP_TYPE_BASIC";return r.shadowMapType===l_?e="SHADOWMAP_TYPE_PCF":r.shadowMapType===fy?e="SHADOWMAP_TYPE_PCF_SOFT":r.shadowMapType===Er&&(e="SHADOWMAP_TYPE_VSM"),e}function kE(r){let e="ENVMAP_TYPE_CUBE";if(r.envMap)switch(r.envMapMode){case aa:case la:e="ENVMAP_TYPE_CUBE";break;case wu:e="ENVMAP_TYPE_CUBE_UV";break}return e}function BE(r){let e="ENVMAP_MODE_REFLECTION";if(r.envMap)switch(r.envMapMode){case la:e="ENVMAP_MODE_REFRACTION";break}return e}function zE(r){let e="ENVMAP_BLENDING_NONE";if(r.envMap)switch(r.combine){case c_:e="ENVMAP_BLENDING_MULTIPLY";break;case Ly:e="ENVMAP_BLENDING_MIX";break;case Dy:e="ENVMAP_BLENDING_ADD";break}return e}function HE(r){const e=r.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:n,maxMip:t}}function VE(r,e,t,n){const i=r.getContext(),s=t.defines;let o=t.vertexShader,a=t.fragmentShader;const l=FE(t),c=kE(t),u=BE(t),d=zE(t),f=HE(t),h=RE(t),_=PE(s),g=i.createProgram();let m,p,S=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(Wa).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(Wa).join(`
`),p.length>0&&(p+=`
`)):(m=[Um(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Wa).join(`
`),p=[Um(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+u:"",t.envMap?"#define "+d:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==hs?"#define TONE_MAPPING":"",t.toneMapping!==hs?yt.tonemapping_pars_fragment:"",t.toneMapping!==hs?AE("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",yt.colorspace_pars_fragment,TE("linearToOutputTexel",t.outputColorSpace),CE(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Wa).join(`
`)),o=Rf(o),o=Im(o,t),o=Om(o,t),a=Rf(a),a=Im(a,t),a=Om(a,t),o=Nm(o),a=Nm(a),t.isRawShaderMaterial!==!0&&(S=`#version 300 es
`,m=[h,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",t.glslVersion===Lp?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Lp?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const x=S+m+o,v=S+p+a,T=Pm(i,i.VERTEX_SHADER,x),M=Pm(i,i.FRAGMENT_SHADER,v);i.attachShader(g,T),i.attachShader(g,M),t.index0AttributeName!==void 0?i.bindAttribLocation(g,0,t.index0AttributeName):t.morphTargets===!0&&i.bindAttribLocation(g,0,"position"),i.linkProgram(g);function E(D){if(r.debug.checkShaderErrors){const B=i.getProgramInfoLog(g).trim(),U=i.getShaderInfoLog(T).trim(),K=i.getShaderInfoLog(M).trim();let F=!0,C=!0;if(i.getProgramParameter(g,i.LINK_STATUS)===!1)if(F=!1,typeof r.debug.onShaderError=="function")r.debug.onShaderError(i,g,T,M);else{const J=Dm(i,T,"vertex"),X=Dm(i,M,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(g,i.VALIDATE_STATUS)+`

Material Name: `+D.name+`
Material Type: `+D.type+`

Program Info Log: `+B+`
`+J+`
`+X)}else B!==""?console.warn("THREE.WebGLProgram: Program Info Log:",B):(U===""||K==="")&&(C=!1);C&&(D.diagnostics={runnable:F,programLog:B,vertexShader:{log:U,prefix:m},fragmentShader:{log:K,prefix:p}})}i.deleteShader(T),i.deleteShader(M),P=new Wc(i,g),y=LE(i,g)}let P;this.getUniforms=function(){return P===void 0&&E(this),P};let y;this.getAttributes=function(){return y===void 0&&E(this),y};let b=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return b===!1&&(b=i.getProgramParameter(g,SE)),b},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(g),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=wE++,this.cacheKey=e,this.usedTimes=1,this.program=g,this.vertexShader=T,this.fragmentShader=M,this}let GE=0;class WE{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,i=this._getShaderStage(t),s=this._getShaderStage(n),o=this._getShaderCacheForMaterial(e);return o.has(i)===!1&&(o.add(i),i.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new XE(e),t.set(e,n)),n}}class XE{constructor(e){this.id=GE++,this.code=e,this.usedTimes=0}}function qE(r,e,t,n,i,s,o){const a=new M_,l=new WE,c=new Set,u=[],d=i.logarithmicDepthBuffer,f=i.vertexTextures;let h=i.precision;const _={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(y){return c.add(y),y===0?"uv":`uv${y}`}function m(y,b,D,B,U){const K=B.fog,F=U.geometry,C=y.isMeshStandardMaterial?B.environment:null,J=(y.isMeshStandardMaterial?t:e).get(y.envMap||C),X=J&&J.mapping===wu?J.image.height:null,me=_[y.type];y.precision!==null&&(h=i.getMaxPrecision(y.precision),h!==y.precision&&console.warn("THREE.WebGLProgram.getParameters:",y.precision,"not supported, using",h,"instead."));const I=F.morphAttributes.position||F.morphAttributes.normal||F.morphAttributes.color,_e=I!==void 0?I.length:0;let Y=0;F.morphAttributes.position!==void 0&&(Y=1),F.morphAttributes.normal!==void 0&&(Y=2),F.morphAttributes.color!==void 0&&(Y=3);let Re,Q,se,Me;if(me){const we=rr[me];Re=we.vertexShader,Q=we.fragmentShader}else Re=y.vertexShader,Q=y.fragmentShader,l.update(y),se=l.getVertexShaderID(y),Me=l.getFragmentShaderID(y);const ve=r.getRenderTarget(),De=r.state.buffers.depth.getReversed(),Qe=U.isInstancedMesh===!0,Pe=U.isBatchedMesh===!0,nt=!!y.map,pt=!!y.matcap,Fe=!!J,O=!!y.aoMap,Dt=!!y.lightMap,Xe=!!y.bumpMap,q=!!y.normalMap,Oe=!!y.displacementMap,dt=!!y.emissiveMap,He=!!y.metalnessMap,ke=!!y.roughnessMap,mt=y.anisotropy>0,L=y.clearcoat>0,A=y.dispersion>0,W=y.iridescence>0,oe=y.sheen>0,ne=y.transmission>0,ie=mt&&!!y.anisotropyMap,Ee=L&&!!y.clearcoatMap,ge=L&&!!y.clearcoatNormalMap,ze=L&&!!y.clearcoatRoughnessMap,Ae=W&&!!y.iridescenceMap,j=W&&!!y.iridescenceThicknessMap,Se=oe&&!!y.sheenColorMap,Ge=oe&&!!y.sheenRoughnessMap,$e=!!y.specularMap,de=!!y.specularColorMap,it=!!y.specularIntensityMap,N=ne&&!!y.transmissionMap,ue=ne&&!!y.thicknessMap,fe=!!y.gradientMap,ye=!!y.alphaMap,pe=y.alphaTest>0,ae=!!y.alphaHash,Be=!!y.extensions;let rt=hs;y.toneMapped&&(ve===null||ve.isXRRenderTarget===!0)&&(rt=r.toneMapping);const Ut={shaderID:me,shaderType:y.type,shaderName:y.name,vertexShader:Re,fragmentShader:Q,defines:y.defines,customVertexShaderID:se,customFragmentShaderID:Me,isRawShaderMaterial:y.isRawShaderMaterial===!0,glslVersion:y.glslVersion,precision:h,batching:Pe,batchingColor:Pe&&U._colorsTexture!==null,instancing:Qe,instancingColor:Qe&&U.instanceColor!==null,instancingMorph:Qe&&U.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:ve===null?r.outputColorSpace:ve.isXRRenderTarget===!0?ve.texture.colorSpace:ni,alphaToCoverage:!!y.alphaToCoverage,map:nt,matcap:pt,envMap:Fe,envMapMode:Fe&&J.mapping,envMapCubeUVHeight:X,aoMap:O,lightMap:Dt,bumpMap:Xe,normalMap:q,displacementMap:f&&Oe,emissiveMap:dt,normalMapObjectSpace:q&&y.normalMapType===Xy,normalMapTangentSpace:q&&y.normalMapType===x_,metalnessMap:He,roughnessMap:ke,anisotropy:mt,anisotropyMap:ie,clearcoat:L,clearcoatMap:Ee,clearcoatNormalMap:ge,clearcoatRoughnessMap:ze,dispersion:A,iridescence:W,iridescenceMap:Ae,iridescenceThicknessMap:j,sheen:oe,sheenColorMap:Se,sheenRoughnessMap:Ge,specularMap:$e,specularColorMap:de,specularIntensityMap:it,transmission:ne,transmissionMap:N,thicknessMap:ue,gradientMap:fe,opaque:y.transparent===!1&&y.blending===fs&&y.alphaToCoverage===!1,alphaMap:ye,alphaTest:pe,alphaHash:ae,combine:y.combine,mapUv:nt&&g(y.map.channel),aoMapUv:O&&g(y.aoMap.channel),lightMapUv:Dt&&g(y.lightMap.channel),bumpMapUv:Xe&&g(y.bumpMap.channel),normalMapUv:q&&g(y.normalMap.channel),displacementMapUv:Oe&&g(y.displacementMap.channel),emissiveMapUv:dt&&g(y.emissiveMap.channel),metalnessMapUv:He&&g(y.metalnessMap.channel),roughnessMapUv:ke&&g(y.roughnessMap.channel),anisotropyMapUv:ie&&g(y.anisotropyMap.channel),clearcoatMapUv:Ee&&g(y.clearcoatMap.channel),clearcoatNormalMapUv:ge&&g(y.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ze&&g(y.clearcoatRoughnessMap.channel),iridescenceMapUv:Ae&&g(y.iridescenceMap.channel),iridescenceThicknessMapUv:j&&g(y.iridescenceThicknessMap.channel),sheenColorMapUv:Se&&g(y.sheenColorMap.channel),sheenRoughnessMapUv:Ge&&g(y.sheenRoughnessMap.channel),specularMapUv:$e&&g(y.specularMap.channel),specularColorMapUv:de&&g(y.specularColorMap.channel),specularIntensityMapUv:it&&g(y.specularIntensityMap.channel),transmissionMapUv:N&&g(y.transmissionMap.channel),thicknessMapUv:ue&&g(y.thicknessMap.channel),alphaMapUv:ye&&g(y.alphaMap.channel),vertexTangents:!!F.attributes.tangent&&(q||mt),vertexColors:y.vertexColors,vertexAlphas:y.vertexColors===!0&&!!F.attributes.color&&F.attributes.color.itemSize===4,pointsUvs:U.isPoints===!0&&!!F.attributes.uv&&(nt||ye),fog:!!K,useFog:y.fog===!0,fogExp2:!!K&&K.isFogExp2,flatShading:y.flatShading===!0&&y.wireframe===!1,sizeAttenuation:y.sizeAttenuation===!0,logarithmicDepthBuffer:d,reverseDepthBuffer:De,skinning:U.isSkinnedMesh===!0,morphTargets:F.morphAttributes.position!==void 0,morphNormals:F.morphAttributes.normal!==void 0,morphColors:F.morphAttributes.color!==void 0,morphTargetsCount:_e,morphTextureStride:Y,numDirLights:b.directional.length,numPointLights:b.point.length,numSpotLights:b.spot.length,numSpotLightMaps:b.spotLightMap.length,numRectAreaLights:b.rectArea.length,numHemiLights:b.hemi.length,numDirLightShadows:b.directionalShadowMap.length,numPointLightShadows:b.pointShadowMap.length,numSpotLightShadows:b.spotShadowMap.length,numSpotLightShadowsWithMaps:b.numSpotLightShadowsWithMaps,numLightProbes:b.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:y.dithering,shadowMapEnabled:r.shadowMap.enabled&&D.length>0,shadowMapType:r.shadowMap.type,toneMapping:rt,decodeVideoTexture:nt&&y.map.isVideoTexture===!0&&Nt.getTransfer(y.map.colorSpace)===Yt,decodeVideoTextureEmissive:dt&&y.emissiveMap.isVideoTexture===!0&&Nt.getTransfer(y.emissiveMap.colorSpace)===Yt,premultipliedAlpha:y.premultipliedAlpha,doubleSided:y.side===Di,flipSided:y.side===si,useDepthPacking:y.depthPacking>=0,depthPacking:y.depthPacking||0,index0AttributeName:y.index0AttributeName,extensionClipCullDistance:Be&&y.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Be&&y.extensions.multiDraw===!0||Pe)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:y.customProgramCacheKey()};return Ut.vertexUv1s=c.has(1),Ut.vertexUv2s=c.has(2),Ut.vertexUv3s=c.has(3),c.clear(),Ut}function p(y){const b=[];if(y.shaderID?b.push(y.shaderID):(b.push(y.customVertexShaderID),b.push(y.customFragmentShaderID)),y.defines!==void 0)for(const D in y.defines)b.push(D),b.push(y.defines[D]);return y.isRawShaderMaterial===!1&&(S(b,y),x(b,y),b.push(r.outputColorSpace)),b.push(y.customProgramCacheKey),b.join()}function S(y,b){y.push(b.precision),y.push(b.outputColorSpace),y.push(b.envMapMode),y.push(b.envMapCubeUVHeight),y.push(b.mapUv),y.push(b.alphaMapUv),y.push(b.lightMapUv),y.push(b.aoMapUv),y.push(b.bumpMapUv),y.push(b.normalMapUv),y.push(b.displacementMapUv),y.push(b.emissiveMapUv),y.push(b.metalnessMapUv),y.push(b.roughnessMapUv),y.push(b.anisotropyMapUv),y.push(b.clearcoatMapUv),y.push(b.clearcoatNormalMapUv),y.push(b.clearcoatRoughnessMapUv),y.push(b.iridescenceMapUv),y.push(b.iridescenceThicknessMapUv),y.push(b.sheenColorMapUv),y.push(b.sheenRoughnessMapUv),y.push(b.specularMapUv),y.push(b.specularColorMapUv),y.push(b.specularIntensityMapUv),y.push(b.transmissionMapUv),y.push(b.thicknessMapUv),y.push(b.combine),y.push(b.fogExp2),y.push(b.sizeAttenuation),y.push(b.morphTargetsCount),y.push(b.morphAttributeCount),y.push(b.numDirLights),y.push(b.numPointLights),y.push(b.numSpotLights),y.push(b.numSpotLightMaps),y.push(b.numHemiLights),y.push(b.numRectAreaLights),y.push(b.numDirLightShadows),y.push(b.numPointLightShadows),y.push(b.numSpotLightShadows),y.push(b.numSpotLightShadowsWithMaps),y.push(b.numLightProbes),y.push(b.shadowMapType),y.push(b.toneMapping),y.push(b.numClippingPlanes),y.push(b.numClipIntersection),y.push(b.depthPacking)}function x(y,b){a.disableAll(),b.supportsVertexTextures&&a.enable(0),b.instancing&&a.enable(1),b.instancingColor&&a.enable(2),b.instancingMorph&&a.enable(3),b.matcap&&a.enable(4),b.envMap&&a.enable(5),b.normalMapObjectSpace&&a.enable(6),b.normalMapTangentSpace&&a.enable(7),b.clearcoat&&a.enable(8),b.iridescence&&a.enable(9),b.alphaTest&&a.enable(10),b.vertexColors&&a.enable(11),b.vertexAlphas&&a.enable(12),b.vertexUv1s&&a.enable(13),b.vertexUv2s&&a.enable(14),b.vertexUv3s&&a.enable(15),b.vertexTangents&&a.enable(16),b.anisotropy&&a.enable(17),b.alphaHash&&a.enable(18),b.batching&&a.enable(19),b.dispersion&&a.enable(20),b.batchingColor&&a.enable(21),b.gradientMap&&a.enable(22),y.push(a.mask),a.disableAll(),b.fog&&a.enable(0),b.useFog&&a.enable(1),b.flatShading&&a.enable(2),b.logarithmicDepthBuffer&&a.enable(3),b.reverseDepthBuffer&&a.enable(4),b.skinning&&a.enable(5),b.morphTargets&&a.enable(6),b.morphNormals&&a.enable(7),b.morphColors&&a.enable(8),b.premultipliedAlpha&&a.enable(9),b.shadowMapEnabled&&a.enable(10),b.doubleSided&&a.enable(11),b.flipSided&&a.enable(12),b.useDepthPacking&&a.enable(13),b.dithering&&a.enable(14),b.transmission&&a.enable(15),b.sheen&&a.enable(16),b.opaque&&a.enable(17),b.pointsUvs&&a.enable(18),b.decodeVideoTexture&&a.enable(19),b.decodeVideoTextureEmissive&&a.enable(20),b.alphaToCoverage&&a.enable(21),y.push(a.mask)}function v(y){const b=_[y.type];let D;if(b){const B=rr[b];D=kx.clone(B.uniforms)}else D=y.uniforms;return D}function T(y,b){let D;for(let B=0,U=u.length;B<U;B++){const K=u[B];if(K.cacheKey===b){D=K,++D.usedTimes;break}}return D===void 0&&(D=new VE(r,b,y,s),u.push(D)),D}function M(y){if(--y.usedTimes===0){const b=u.indexOf(y);u[b]=u[u.length-1],u.pop(),y.destroy()}}function E(y){l.remove(y)}function P(){l.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:v,acquireProgram:T,releaseProgram:M,releaseShaderCache:E,programs:u,dispose:P}}function YE(){let r=new WeakMap;function e(o){return r.has(o)}function t(o){let a=r.get(o);return a===void 0&&(a={},r.set(o,a)),a}function n(o){r.delete(o)}function i(o,a,l){r.get(o)[a]=l}function s(){r=new WeakMap}return{has:e,get:t,remove:n,update:i,dispose:s}}function jE(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.material.id!==e.material.id?r.material.id-e.material.id:r.z!==e.z?r.z-e.z:r.id-e.id}function Fm(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.z!==e.z?e.z-r.z:r.id-e.id}function km(){const r=[];let e=0;const t=[],n=[],i=[];function s(){e=0,t.length=0,n.length=0,i.length=0}function o(d,f,h,_,g,m){let p=r[e];return p===void 0?(p={id:d.id,object:d,geometry:f,material:h,groupOrder:_,renderOrder:d.renderOrder,z:g,group:m},r[e]=p):(p.id=d.id,p.object=d,p.geometry=f,p.material=h,p.groupOrder=_,p.renderOrder=d.renderOrder,p.z=g,p.group=m),e++,p}function a(d,f,h,_,g,m){const p=o(d,f,h,_,g,m);h.transmission>0?n.push(p):h.transparent===!0?i.push(p):t.push(p)}function l(d,f,h,_,g,m){const p=o(d,f,h,_,g,m);h.transmission>0?n.unshift(p):h.transparent===!0?i.unshift(p):t.unshift(p)}function c(d,f){t.length>1&&t.sort(d||jE),n.length>1&&n.sort(f||Fm),i.length>1&&i.sort(f||Fm)}function u(){for(let d=e,f=r.length;d<f;d++){const h=r[d];if(h.id===null)break;h.id=null,h.object=null,h.geometry=null,h.material=null,h.group=null}}return{opaque:t,transmissive:n,transparent:i,init:s,push:a,unshift:l,finish:u,sort:c}}function $E(){let r=new WeakMap;function e(n,i){const s=r.get(n);let o;return s===void 0?(o=new km,r.set(n,[o])):i>=s.length?(o=new km,s.push(o)):o=s[i],o}function t(){r=new WeakMap}return{get:e,dispose:t}}function KE(){const r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new G,color:new Je};break;case"SpotLight":t={position:new G,direction:new G,color:new Je,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new G,color:new Je,distance:0,decay:0};break;case"HemisphereLight":t={direction:new G,skyColor:new Je,groundColor:new Je};break;case"RectAreaLight":t={color:new Je,position:new G,halfWidth:new G,halfHeight:new G};break}return r[e.id]=t,t}}}function ZE(){const r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ct};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ct};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ct,shadowCameraNear:1,shadowCameraFar:1e3};break}return r[e.id]=t,t}}}let JE=0;function QE(r,e){return(e.castShadow?2:0)-(r.castShadow?2:0)+(e.map?1:0)-(r.map?1:0)}function eT(r){const e=new KE,t=ZE(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new G);const i=new G,s=new _t,o=new _t;function a(c){let u=0,d=0,f=0;for(let y=0;y<9;y++)n.probe[y].set(0,0,0);let h=0,_=0,g=0,m=0,p=0,S=0,x=0,v=0,T=0,M=0,E=0;c.sort(QE);for(let y=0,b=c.length;y<b;y++){const D=c[y],B=D.color,U=D.intensity,K=D.distance,F=D.shadow&&D.shadow.map?D.shadow.map.texture:null;if(D.isAmbientLight)u+=B.r*U,d+=B.g*U,f+=B.b*U;else if(D.isLightProbe){for(let C=0;C<9;C++)n.probe[C].addScaledVector(D.sh.coefficients[C],U);E++}else if(D.isDirectionalLight){const C=e.get(D);if(C.color.copy(D.color).multiplyScalar(D.intensity),D.castShadow){const J=D.shadow,X=t.get(D);X.shadowIntensity=J.intensity,X.shadowBias=J.bias,X.shadowNormalBias=J.normalBias,X.shadowRadius=J.radius,X.shadowMapSize=J.mapSize,n.directionalShadow[h]=X,n.directionalShadowMap[h]=F,n.directionalShadowMatrix[h]=D.shadow.matrix,S++}n.directional[h]=C,h++}else if(D.isSpotLight){const C=e.get(D);C.position.setFromMatrixPosition(D.matrixWorld),C.color.copy(B).multiplyScalar(U),C.distance=K,C.coneCos=Math.cos(D.angle),C.penumbraCos=Math.cos(D.angle*(1-D.penumbra)),C.decay=D.decay,n.spot[g]=C;const J=D.shadow;if(D.map&&(n.spotLightMap[T]=D.map,T++,J.updateMatrices(D),D.castShadow&&M++),n.spotLightMatrix[g]=J.matrix,D.castShadow){const X=t.get(D);X.shadowIntensity=J.intensity,X.shadowBias=J.bias,X.shadowNormalBias=J.normalBias,X.shadowRadius=J.radius,X.shadowMapSize=J.mapSize,n.spotShadow[g]=X,n.spotShadowMap[g]=F,v++}g++}else if(D.isRectAreaLight){const C=e.get(D);C.color.copy(B).multiplyScalar(U),C.halfWidth.set(D.width*.5,0,0),C.halfHeight.set(0,D.height*.5,0),n.rectArea[m]=C,m++}else if(D.isPointLight){const C=e.get(D);if(C.color.copy(D.color).multiplyScalar(D.intensity),C.distance=D.distance,C.decay=D.decay,D.castShadow){const J=D.shadow,X=t.get(D);X.shadowIntensity=J.intensity,X.shadowBias=J.bias,X.shadowNormalBias=J.normalBias,X.shadowRadius=J.radius,X.shadowMapSize=J.mapSize,X.shadowCameraNear=J.camera.near,X.shadowCameraFar=J.camera.far,n.pointShadow[_]=X,n.pointShadowMap[_]=F,n.pointShadowMatrix[_]=D.shadow.matrix,x++}n.point[_]=C,_++}else if(D.isHemisphereLight){const C=e.get(D);C.skyColor.copy(D.color).multiplyScalar(U),C.groundColor.copy(D.groundColor).multiplyScalar(U),n.hemi[p]=C,p++}}m>0&&(r.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Ne.LTC_FLOAT_1,n.rectAreaLTC2=Ne.LTC_FLOAT_2):(n.rectAreaLTC1=Ne.LTC_HALF_1,n.rectAreaLTC2=Ne.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=d,n.ambient[2]=f;const P=n.hash;(P.directionalLength!==h||P.pointLength!==_||P.spotLength!==g||P.rectAreaLength!==m||P.hemiLength!==p||P.numDirectionalShadows!==S||P.numPointShadows!==x||P.numSpotShadows!==v||P.numSpotMaps!==T||P.numLightProbes!==E)&&(n.directional.length=h,n.spot.length=g,n.rectArea.length=m,n.point.length=_,n.hemi.length=p,n.directionalShadow.length=S,n.directionalShadowMap.length=S,n.pointShadow.length=x,n.pointShadowMap.length=x,n.spotShadow.length=v,n.spotShadowMap.length=v,n.directionalShadowMatrix.length=S,n.pointShadowMatrix.length=x,n.spotLightMatrix.length=v+T-M,n.spotLightMap.length=T,n.numSpotLightShadowsWithMaps=M,n.numLightProbes=E,P.directionalLength=h,P.pointLength=_,P.spotLength=g,P.rectAreaLength=m,P.hemiLength=p,P.numDirectionalShadows=S,P.numPointShadows=x,P.numSpotShadows=v,P.numSpotMaps=T,P.numLightProbes=E,n.version=JE++)}function l(c,u){let d=0,f=0,h=0,_=0,g=0;const m=u.matrixWorldInverse;for(let p=0,S=c.length;p<S;p++){const x=c[p];if(x.isDirectionalLight){const v=n.directional[d];v.direction.setFromMatrixPosition(x.matrixWorld),i.setFromMatrixPosition(x.target.matrixWorld),v.direction.sub(i),v.direction.transformDirection(m),d++}else if(x.isSpotLight){const v=n.spot[h];v.position.setFromMatrixPosition(x.matrixWorld),v.position.applyMatrix4(m),v.direction.setFromMatrixPosition(x.matrixWorld),i.setFromMatrixPosition(x.target.matrixWorld),v.direction.sub(i),v.direction.transformDirection(m),h++}else if(x.isRectAreaLight){const v=n.rectArea[_];v.position.setFromMatrixPosition(x.matrixWorld),v.position.applyMatrix4(m),o.identity(),s.copy(x.matrixWorld),s.premultiply(m),o.extractRotation(s),v.halfWidth.set(x.width*.5,0,0),v.halfHeight.set(0,x.height*.5,0),v.halfWidth.applyMatrix4(o),v.halfHeight.applyMatrix4(o),_++}else if(x.isPointLight){const v=n.point[f];v.position.setFromMatrixPosition(x.matrixWorld),v.position.applyMatrix4(m),f++}else if(x.isHemisphereLight){const v=n.hemi[g];v.direction.setFromMatrixPosition(x.matrixWorld),v.direction.transformDirection(m),g++}}}return{setup:a,setupView:l,state:n}}function Bm(r){const e=new eT(r),t=[],n=[];function i(u){c.camera=u,t.length=0,n.length=0}function s(u){t.push(u)}function o(u){n.push(u)}function a(){e.setup(t)}function l(u){e.setupView(t,u)}const c={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:i,state:c,setupLights:a,setupLightsView:l,pushLight:s,pushShadow:o}}function tT(r){let e=new WeakMap;function t(i,s=0){const o=e.get(i);let a;return o===void 0?(a=new Bm(r),e.set(i,[a])):s>=o.length?(a=new Bm(r),o.push(a)):a=o[s],a}function n(){e=new WeakMap}return{get:t,dispose:n}}const nT=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,iT=`uniform sampler2D shadow_pass;
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
}`;function rT(r,e,t){let n=new Ph;const i=new Ct,s=new Ct,o=new zt,a=new tb({depthPacking:Wy}),l=new nb,c={},u=t.maxTextureSize,d={[zr]:si,[si]:zr,[Di]:Di},f=new Oi({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ct},radius:{value:4}},vertexShader:nT,fragmentShader:iT}),h=f.clone();h.defines.HORIZONTAL_PASS=1;const _=new ki;_.setAttribute("position",new Wt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const g=new ei(_,f),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=l_;let p=this.type;this.render=function(M,E,P){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||M.length===0)return;const y=r.getRenderTarget(),b=r.getActiveCubeFace(),D=r.getActiveMipmapLevel(),B=r.state;B.setBlending(ds),B.buffers.color.setClear(1,1,1,1),B.buffers.depth.setTest(!0),B.setScissorTest(!1);const U=p!==Er&&this.type===Er,K=p===Er&&this.type!==Er;for(let F=0,C=M.length;F<C;F++){const J=M[F],X=J.shadow;if(X===void 0){console.warn("THREE.WebGLShadowMap:",J,"has no shadow.");continue}if(X.autoUpdate===!1&&X.needsUpdate===!1)continue;i.copy(X.mapSize);const me=X.getFrameExtents();if(i.multiply(me),s.copy(X.mapSize),(i.x>u||i.y>u)&&(i.x>u&&(s.x=Math.floor(u/me.x),i.x=s.x*me.x,X.mapSize.x=s.x),i.y>u&&(s.y=Math.floor(u/me.y),i.y=s.y*me.y,X.mapSize.y=s.y)),X.map===null||U===!0||K===!0){const _e=this.type!==Er?{minFilter:ti,magFilter:ti}:{};X.map!==null&&X.map.dispose(),X.map=new so(i.x,i.y,_e),X.map.texture.name=J.name+".shadowMap",X.camera.updateProjectionMatrix()}r.setRenderTarget(X.map),r.clear();const I=X.getViewportCount();for(let _e=0;_e<I;_e++){const Y=X.getViewport(_e);o.set(s.x*Y.x,s.y*Y.y,s.x*Y.z,s.y*Y.w),B.viewport(o),X.updateMatrices(J,_e),n=X.getFrustum(),v(E,P,X.camera,J,this.type)}X.isPointLightShadow!==!0&&this.type===Er&&S(X,P),X.needsUpdate=!1}p=this.type,m.needsUpdate=!1,r.setRenderTarget(y,b,D)};function S(M,E){const P=e.update(g);f.defines.VSM_SAMPLES!==M.blurSamples&&(f.defines.VSM_SAMPLES=M.blurSamples,h.defines.VSM_SAMPLES=M.blurSamples,f.needsUpdate=!0,h.needsUpdate=!0),M.mapPass===null&&(M.mapPass=new so(i.x,i.y)),f.uniforms.shadow_pass.value=M.map.texture,f.uniforms.resolution.value=M.mapSize,f.uniforms.radius.value=M.radius,r.setRenderTarget(M.mapPass),r.clear(),r.renderBufferDirect(E,null,P,f,g,null),h.uniforms.shadow_pass.value=M.mapPass.texture,h.uniforms.resolution.value=M.mapSize,h.uniforms.radius.value=M.radius,r.setRenderTarget(M.map),r.clear(),r.renderBufferDirect(E,null,P,h,g,null)}function x(M,E,P,y){let b=null;const D=P.isPointLight===!0?M.customDistanceMaterial:M.customDepthMaterial;if(D!==void 0)b=D;else if(b=P.isPointLight===!0?l:a,r.localClippingEnabled&&E.clipShadows===!0&&Array.isArray(E.clippingPlanes)&&E.clippingPlanes.length!==0||E.displacementMap&&E.displacementScale!==0||E.alphaMap&&E.alphaTest>0||E.map&&E.alphaTest>0||E.alphaToCoverage===!0){const B=b.uuid,U=E.uuid;let K=c[B];K===void 0&&(K={},c[B]=K);let F=K[U];F===void 0&&(F=b.clone(),K[U]=F,E.addEventListener("dispose",T)),b=F}if(b.visible=E.visible,b.wireframe=E.wireframe,y===Er?b.side=E.shadowSide!==null?E.shadowSide:E.side:b.side=E.shadowSide!==null?E.shadowSide:d[E.side],b.alphaMap=E.alphaMap,b.alphaTest=E.alphaToCoverage===!0?.5:E.alphaTest,b.map=E.map,b.clipShadows=E.clipShadows,b.clippingPlanes=E.clippingPlanes,b.clipIntersection=E.clipIntersection,b.displacementMap=E.displacementMap,b.displacementScale=E.displacementScale,b.displacementBias=E.displacementBias,b.wireframeLinewidth=E.wireframeLinewidth,b.linewidth=E.linewidth,P.isPointLight===!0&&b.isMeshDistanceMaterial===!0){const B=r.properties.get(b);B.light=P}return b}function v(M,E,P,y,b){if(M.visible===!1)return;if(M.layers.test(E.layers)&&(M.isMesh||M.isLine||M.isPoints)&&(M.castShadow||M.receiveShadow&&b===Er)&&(!M.frustumCulled||n.intersectsObject(M))){M.modelViewMatrix.multiplyMatrices(P.matrixWorldInverse,M.matrixWorld);const U=e.update(M),K=M.material;if(Array.isArray(K)){const F=U.groups;for(let C=0,J=F.length;C<J;C++){const X=F[C],me=K[X.materialIndex];if(me&&me.visible){const I=x(M,me,y,b);M.onBeforeShadow(r,M,E,P,U,I,X),r.renderBufferDirect(P,null,U,I,M,X),M.onAfterShadow(r,M,E,P,U,I,X)}}}else if(K.visible){const F=x(M,K,y,b);M.onBeforeShadow(r,M,E,P,U,F,null),r.renderBufferDirect(P,null,U,F,M,null),M.onAfterShadow(r,M,E,P,U,F,null)}}const B=M.children;for(let U=0,K=B.length;U<K;U++)v(B[U],E,P,y,b)}function T(M){M.target.removeEventListener("dispose",T);for(const P in c){const y=c[P],b=M.target.uuid;b in y&&(y[b].dispose(),delete y[b])}}}const sT={[Vd]:Gd,[Wd]:Yd,[Xd]:jd,[oa]:qd,[Gd]:Vd,[Yd]:Wd,[jd]:Xd,[qd]:oa};function oT(r,e){function t(){let N=!1;const ue=new zt;let fe=null;const ye=new zt(0,0,0,0);return{setMask:function(pe){fe!==pe&&!N&&(r.colorMask(pe,pe,pe,pe),fe=pe)},setLocked:function(pe){N=pe},setClear:function(pe,ae,Be,rt,Ut){Ut===!0&&(pe*=rt,ae*=rt,Be*=rt),ue.set(pe,ae,Be,rt),ye.equals(ue)===!1&&(r.clearColor(pe,ae,Be,rt),ye.copy(ue))},reset:function(){N=!1,fe=null,ye.set(-1,0,0,0)}}}function n(){let N=!1,ue=!1,fe=null,ye=null,pe=null;return{setReversed:function(ae){if(ue!==ae){const Be=e.get("EXT_clip_control");ae?Be.clipControlEXT(Be.LOWER_LEFT_EXT,Be.ZERO_TO_ONE_EXT):Be.clipControlEXT(Be.LOWER_LEFT_EXT,Be.NEGATIVE_ONE_TO_ONE_EXT),ue=ae;const rt=pe;pe=null,this.setClear(rt)}},getReversed:function(){return ue},setTest:function(ae){ae?ve(r.DEPTH_TEST):De(r.DEPTH_TEST)},setMask:function(ae){fe!==ae&&!N&&(r.depthMask(ae),fe=ae)},setFunc:function(ae){if(ue&&(ae=sT[ae]),ye!==ae){switch(ae){case Vd:r.depthFunc(r.NEVER);break;case Gd:r.depthFunc(r.ALWAYS);break;case Wd:r.depthFunc(r.LESS);break;case oa:r.depthFunc(r.LEQUAL);break;case Xd:r.depthFunc(r.EQUAL);break;case qd:r.depthFunc(r.GEQUAL);break;case Yd:r.depthFunc(r.GREATER);break;case jd:r.depthFunc(r.NOTEQUAL);break;default:r.depthFunc(r.LEQUAL)}ye=ae}},setLocked:function(ae){N=ae},setClear:function(ae){pe!==ae&&(ue&&(ae=1-ae),r.clearDepth(ae),pe=ae)},reset:function(){N=!1,fe=null,ye=null,pe=null,ue=!1}}}function i(){let N=!1,ue=null,fe=null,ye=null,pe=null,ae=null,Be=null,rt=null,Ut=null;return{setTest:function(we){N||(we?ve(r.STENCIL_TEST):De(r.STENCIL_TEST))},setMask:function(we){ue!==we&&!N&&(r.stencilMask(we),ue=we)},setFunc:function(we,qe,ht){(fe!==we||ye!==qe||pe!==ht)&&(r.stencilFunc(we,qe,ht),fe=we,ye=qe,pe=ht)},setOp:function(we,qe,ht){(ae!==we||Be!==qe||rt!==ht)&&(r.stencilOp(we,qe,ht),ae=we,Be=qe,rt=ht)},setLocked:function(we){N=we},setClear:function(we){Ut!==we&&(r.clearStencil(we),Ut=we)},reset:function(){N=!1,ue=null,fe=null,ye=null,pe=null,ae=null,Be=null,rt=null,Ut=null}}}const s=new t,o=new n,a=new i,l=new WeakMap,c=new WeakMap;let u={},d={},f=new WeakMap,h=[],_=null,g=!1,m=null,p=null,S=null,x=null,v=null,T=null,M=null,E=new Je(0,0,0),P=0,y=!1,b=null,D=null,B=null,U=null,K=null;const F=r.getParameter(r.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let C=!1,J=0;const X=r.getParameter(r.VERSION);X.indexOf("WebGL")!==-1?(J=parseFloat(/^WebGL (\d)/.exec(X)[1]),C=J>=1):X.indexOf("OpenGL ES")!==-1&&(J=parseFloat(/^OpenGL ES (\d)/.exec(X)[1]),C=J>=2);let me=null,I={};const _e=r.getParameter(r.SCISSOR_BOX),Y=r.getParameter(r.VIEWPORT),Re=new zt().fromArray(_e),Q=new zt().fromArray(Y);function se(N,ue,fe,ye){const pe=new Uint8Array(4),ae=r.createTexture();r.bindTexture(N,ae),r.texParameteri(N,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(N,r.TEXTURE_MAG_FILTER,r.NEAREST);for(let Be=0;Be<fe;Be++)N===r.TEXTURE_3D||N===r.TEXTURE_2D_ARRAY?r.texImage3D(ue,0,r.RGBA,1,1,ye,0,r.RGBA,r.UNSIGNED_BYTE,pe):r.texImage2D(ue+Be,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,pe);return ae}const Me={};Me[r.TEXTURE_2D]=se(r.TEXTURE_2D,r.TEXTURE_2D,1),Me[r.TEXTURE_CUBE_MAP]=se(r.TEXTURE_CUBE_MAP,r.TEXTURE_CUBE_MAP_POSITIVE_X,6),Me[r.TEXTURE_2D_ARRAY]=se(r.TEXTURE_2D_ARRAY,r.TEXTURE_2D_ARRAY,1,1),Me[r.TEXTURE_3D]=se(r.TEXTURE_3D,r.TEXTURE_3D,1,1),s.setClear(0,0,0,1),o.setClear(1),a.setClear(0),ve(r.DEPTH_TEST),o.setFunc(oa),Xe(!1),q(wp),ve(r.CULL_FACE),O(ds);function ve(N){u[N]!==!0&&(r.enable(N),u[N]=!0)}function De(N){u[N]!==!1&&(r.disable(N),u[N]=!1)}function Qe(N,ue){return d[N]!==ue?(r.bindFramebuffer(N,ue),d[N]=ue,N===r.DRAW_FRAMEBUFFER&&(d[r.FRAMEBUFFER]=ue),N===r.FRAMEBUFFER&&(d[r.DRAW_FRAMEBUFFER]=ue),!0):!1}function Pe(N,ue){let fe=h,ye=!1;if(N){fe=f.get(ue),fe===void 0&&(fe=[],f.set(ue,fe));const pe=N.textures;if(fe.length!==pe.length||fe[0]!==r.COLOR_ATTACHMENT0){for(let ae=0,Be=pe.length;ae<Be;ae++)fe[ae]=r.COLOR_ATTACHMENT0+ae;fe.length=pe.length,ye=!0}}else fe[0]!==r.BACK&&(fe[0]=r.BACK,ye=!0);ye&&r.drawBuffers(fe)}function nt(N){return _!==N?(r.useProgram(N),_=N,!0):!1}const pt={[Vs]:r.FUNC_ADD,[py]:r.FUNC_SUBTRACT,[my]:r.FUNC_REVERSE_SUBTRACT};pt[gy]=r.MIN,pt[_y]=r.MAX;const Fe={[vy]:r.ZERO,[yy]:r.ONE,[xy]:r.SRC_COLOR,[zd]:r.SRC_ALPHA,[Ty]:r.SRC_ALPHA_SATURATE,[My]:r.DST_COLOR,[Sy]:r.DST_ALPHA,[by]:r.ONE_MINUS_SRC_COLOR,[Hd]:r.ONE_MINUS_SRC_ALPHA,[Ey]:r.ONE_MINUS_DST_COLOR,[wy]:r.ONE_MINUS_DST_ALPHA,[Ay]:r.CONSTANT_COLOR,[Cy]:r.ONE_MINUS_CONSTANT_COLOR,[Ry]:r.CONSTANT_ALPHA,[Py]:r.ONE_MINUS_CONSTANT_ALPHA};function O(N,ue,fe,ye,pe,ae,Be,rt,Ut,we){if(N===ds){g===!0&&(De(r.BLEND),g=!1);return}if(g===!1&&(ve(r.BLEND),g=!0),N!==hy){if(N!==m||we!==y){if((p!==Vs||v!==Vs)&&(r.blendEquation(r.FUNC_ADD),p=Vs,v=Vs),we)switch(N){case fs:r.blendFuncSeparate(r.ONE,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case nu:r.blendFunc(r.ONE,r.ONE);break;case Mp:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case Ep:r.blendFuncSeparate(r.DST_COLOR,r.ONE_MINUS_SRC_ALPHA,r.ZERO,r.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",N);break}else switch(N){case fs:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case nu:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE,r.ONE,r.ONE);break;case Mp:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Ep:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",N);break}S=null,x=null,T=null,M=null,E.set(0,0,0),P=0,m=N,y=we}return}pe=pe||ue,ae=ae||fe,Be=Be||ye,(ue!==p||pe!==v)&&(r.blendEquationSeparate(pt[ue],pt[pe]),p=ue,v=pe),(fe!==S||ye!==x||ae!==T||Be!==M)&&(r.blendFuncSeparate(Fe[fe],Fe[ye],Fe[ae],Fe[Be]),S=fe,x=ye,T=ae,M=Be),(rt.equals(E)===!1||Ut!==P)&&(r.blendColor(rt.r,rt.g,rt.b,Ut),E.copy(rt),P=Ut),m=N,y=!1}function Dt(N,ue){N.side===Di?De(r.CULL_FACE):ve(r.CULL_FACE);let fe=N.side===si;ue&&(fe=!fe),Xe(fe),N.blending===fs&&N.transparent===!1?O(ds):O(N.blending,N.blendEquation,N.blendSrc,N.blendDst,N.blendEquationAlpha,N.blendSrcAlpha,N.blendDstAlpha,N.blendColor,N.blendAlpha,N.premultipliedAlpha),o.setFunc(N.depthFunc),o.setTest(N.depthTest),o.setMask(N.depthWrite),s.setMask(N.colorWrite);const ye=N.stencilWrite;a.setTest(ye),ye&&(a.setMask(N.stencilWriteMask),a.setFunc(N.stencilFunc,N.stencilRef,N.stencilFuncMask),a.setOp(N.stencilFail,N.stencilZFail,N.stencilZPass)),dt(N.polygonOffset,N.polygonOffsetFactor,N.polygonOffsetUnits),N.alphaToCoverage===!0?ve(r.SAMPLE_ALPHA_TO_COVERAGE):De(r.SAMPLE_ALPHA_TO_COVERAGE)}function Xe(N){b!==N&&(N?r.frontFace(r.CW):r.frontFace(r.CCW),b=N)}function q(N){N!==uy?(ve(r.CULL_FACE),N!==D&&(N===wp?r.cullFace(r.BACK):N===dy?r.cullFace(r.FRONT):r.cullFace(r.FRONT_AND_BACK))):De(r.CULL_FACE),D=N}function Oe(N){N!==B&&(C&&r.lineWidth(N),B=N)}function dt(N,ue,fe){N?(ve(r.POLYGON_OFFSET_FILL),(U!==ue||K!==fe)&&(r.polygonOffset(ue,fe),U=ue,K=fe)):De(r.POLYGON_OFFSET_FILL)}function He(N){N?ve(r.SCISSOR_TEST):De(r.SCISSOR_TEST)}function ke(N){N===void 0&&(N=r.TEXTURE0+F-1),me!==N&&(r.activeTexture(N),me=N)}function mt(N,ue,fe){fe===void 0&&(me===null?fe=r.TEXTURE0+F-1:fe=me);let ye=I[fe];ye===void 0&&(ye={type:void 0,texture:void 0},I[fe]=ye),(ye.type!==N||ye.texture!==ue)&&(me!==fe&&(r.activeTexture(fe),me=fe),r.bindTexture(N,ue||Me[N]),ye.type=N,ye.texture=ue)}function L(){const N=I[me];N!==void 0&&N.type!==void 0&&(r.bindTexture(N.type,null),N.type=void 0,N.texture=void 0)}function A(){try{r.compressedTexImage2D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function W(){try{r.compressedTexImage3D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function oe(){try{r.texSubImage2D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function ne(){try{r.texSubImage3D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function ie(){try{r.compressedTexSubImage2D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Ee(){try{r.compressedTexSubImage3D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function ge(){try{r.texStorage2D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function ze(){try{r.texStorage3D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Ae(){try{r.texImage2D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function j(){try{r.texImage3D(...arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Se(N){Re.equals(N)===!1&&(r.scissor(N.x,N.y,N.z,N.w),Re.copy(N))}function Ge(N){Q.equals(N)===!1&&(r.viewport(N.x,N.y,N.z,N.w),Q.copy(N))}function $e(N,ue){let fe=c.get(ue);fe===void 0&&(fe=new WeakMap,c.set(ue,fe));let ye=fe.get(N);ye===void 0&&(ye=r.getUniformBlockIndex(ue,N.name),fe.set(N,ye))}function de(N,ue){const ye=c.get(ue).get(N);l.get(ue)!==ye&&(r.uniformBlockBinding(ue,ye,N.__bindingPointIndex),l.set(ue,ye))}function it(){r.disable(r.BLEND),r.disable(r.CULL_FACE),r.disable(r.DEPTH_TEST),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.disable(r.SAMPLE_ALPHA_TO_COVERAGE),r.blendEquation(r.FUNC_ADD),r.blendFunc(r.ONE,r.ZERO),r.blendFuncSeparate(r.ONE,r.ZERO,r.ONE,r.ZERO),r.blendColor(0,0,0,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(r.LESS),o.setReversed(!1),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(r.ALWAYS,0,4294967295),r.stencilOp(r.KEEP,r.KEEP,r.KEEP),r.clearStencil(0),r.cullFace(r.BACK),r.frontFace(r.CCW),r.polygonOffset(0,0),r.activeTexture(r.TEXTURE0),r.bindFramebuffer(r.FRAMEBUFFER,null),r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),r.bindFramebuffer(r.READ_FRAMEBUFFER,null),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),u={},me=null,I={},d={},f=new WeakMap,h=[],_=null,g=!1,m=null,p=null,S=null,x=null,v=null,T=null,M=null,E=new Je(0,0,0),P=0,y=!1,b=null,D=null,B=null,U=null,K=null,Re.set(0,0,r.canvas.width,r.canvas.height),Q.set(0,0,r.canvas.width,r.canvas.height),s.reset(),o.reset(),a.reset()}return{buffers:{color:s,depth:o,stencil:a},enable:ve,disable:De,bindFramebuffer:Qe,drawBuffers:Pe,useProgram:nt,setBlending:O,setMaterial:Dt,setFlipSided:Xe,setCullFace:q,setLineWidth:Oe,setPolygonOffset:dt,setScissorTest:He,activeTexture:ke,bindTexture:mt,unbindTexture:L,compressedTexImage2D:A,compressedTexImage3D:W,texImage2D:Ae,texImage3D:j,updateUBOMapping:$e,uniformBlockBinding:de,texStorage2D:ge,texStorage3D:ze,texSubImage2D:oe,texSubImage3D:ne,compressedTexSubImage2D:ie,compressedTexSubImage3D:Ee,scissor:Se,viewport:Ge,reset:it}}function aT(r,e,t,n,i,s,o){const a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Ct,u=new WeakMap;let d;const f=new WeakMap;let h=!1;try{h=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function _(L,A){return h?new OffscreenCanvas(L,A):Cl("canvas")}function g(L,A,W){let oe=1;const ne=mt(L);if((ne.width>W||ne.height>W)&&(oe=W/Math.max(ne.width,ne.height)),oe<1)if(typeof HTMLImageElement<"u"&&L instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&L instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&L instanceof ImageBitmap||typeof VideoFrame<"u"&&L instanceof VideoFrame){const ie=Math.floor(oe*ne.width),Ee=Math.floor(oe*ne.height);d===void 0&&(d=_(ie,Ee));const ge=A?_(ie,Ee):d;return ge.width=ie,ge.height=Ee,ge.getContext("2d").drawImage(L,0,0,ie,Ee),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+ne.width+"x"+ne.height+") to ("+ie+"x"+Ee+")."),ge}else return"data"in L&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+ne.width+"x"+ne.height+")."),L;return L}function m(L){return L.generateMipmaps}function p(L){r.generateMipmap(L)}function S(L){return L.isWebGLCubeRenderTarget?r.TEXTURE_CUBE_MAP:L.isWebGL3DRenderTarget?r.TEXTURE_3D:L.isWebGLArrayRenderTarget||L.isCompressedArrayTexture?r.TEXTURE_2D_ARRAY:r.TEXTURE_2D}function x(L,A,W,oe,ne=!1){if(L!==null){if(r[L]!==void 0)return r[L];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+L+"'")}let ie=A;if(A===r.RED&&(W===r.FLOAT&&(ie=r.R32F),W===r.HALF_FLOAT&&(ie=r.R16F),W===r.UNSIGNED_BYTE&&(ie=r.R8)),A===r.RED_INTEGER&&(W===r.UNSIGNED_BYTE&&(ie=r.R8UI),W===r.UNSIGNED_SHORT&&(ie=r.R16UI),W===r.UNSIGNED_INT&&(ie=r.R32UI),W===r.BYTE&&(ie=r.R8I),W===r.SHORT&&(ie=r.R16I),W===r.INT&&(ie=r.R32I)),A===r.RG&&(W===r.FLOAT&&(ie=r.RG32F),W===r.HALF_FLOAT&&(ie=r.RG16F),W===r.UNSIGNED_BYTE&&(ie=r.RG8)),A===r.RG_INTEGER&&(W===r.UNSIGNED_BYTE&&(ie=r.RG8UI),W===r.UNSIGNED_SHORT&&(ie=r.RG16UI),W===r.UNSIGNED_INT&&(ie=r.RG32UI),W===r.BYTE&&(ie=r.RG8I),W===r.SHORT&&(ie=r.RG16I),W===r.INT&&(ie=r.RG32I)),A===r.RGB_INTEGER&&(W===r.UNSIGNED_BYTE&&(ie=r.RGB8UI),W===r.UNSIGNED_SHORT&&(ie=r.RGB16UI),W===r.UNSIGNED_INT&&(ie=r.RGB32UI),W===r.BYTE&&(ie=r.RGB8I),W===r.SHORT&&(ie=r.RGB16I),W===r.INT&&(ie=r.RGB32I)),A===r.RGBA_INTEGER&&(W===r.UNSIGNED_BYTE&&(ie=r.RGBA8UI),W===r.UNSIGNED_SHORT&&(ie=r.RGBA16UI),W===r.UNSIGNED_INT&&(ie=r.RGBA32UI),W===r.BYTE&&(ie=r.RGBA8I),W===r.SHORT&&(ie=r.RGBA16I),W===r.INT&&(ie=r.RGBA32I)),A===r.RGB&&W===r.UNSIGNED_INT_5_9_9_9_REV&&(ie=r.RGB9_E5),A===r.RGBA){const Ee=ne?ru:Nt.getTransfer(oe);W===r.FLOAT&&(ie=r.RGBA32F),W===r.HALF_FLOAT&&(ie=r.RGBA16F),W===r.UNSIGNED_BYTE&&(ie=Ee===Yt?r.SRGB8_ALPHA8:r.RGBA8),W===r.UNSIGNED_SHORT_4_4_4_4&&(ie=r.RGBA4),W===r.UNSIGNED_SHORT_5_5_5_1&&(ie=r.RGB5_A1)}return(ie===r.R16F||ie===r.R32F||ie===r.RG16F||ie===r.RG32F||ie===r.RGBA16F||ie===r.RGBA32F)&&e.get("EXT_color_buffer_float"),ie}function v(L,A){let W;return L?A===null||A===ro||A===wl?W=r.DEPTH24_STENCIL8:A===Yi?W=r.DEPTH32F_STENCIL8:A===Sl&&(W=r.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):A===null||A===ro||A===wl?W=r.DEPTH_COMPONENT24:A===Yi?W=r.DEPTH_COMPONENT32F:A===Sl&&(W=r.DEPTH_COMPONENT16),W}function T(L,A){return m(L)===!0||L.isFramebufferTexture&&L.minFilter!==ti&&L.minFilter!==xi?Math.log2(Math.max(A.width,A.height))+1:L.mipmaps!==void 0&&L.mipmaps.length>0?L.mipmaps.length:L.isCompressedTexture&&Array.isArray(L.image)?A.mipmaps.length:1}function M(L){const A=L.target;A.removeEventListener("dispose",M),P(A),A.isVideoTexture&&u.delete(A)}function E(L){const A=L.target;A.removeEventListener("dispose",E),b(A)}function P(L){const A=n.get(L);if(A.__webglInit===void 0)return;const W=L.source,oe=f.get(W);if(oe){const ne=oe[A.__cacheKey];ne.usedTimes--,ne.usedTimes===0&&y(L),Object.keys(oe).length===0&&f.delete(W)}n.remove(L)}function y(L){const A=n.get(L);r.deleteTexture(A.__webglTexture);const W=L.source,oe=f.get(W);delete oe[A.__cacheKey],o.memory.textures--}function b(L){const A=n.get(L);if(L.depthTexture&&(L.depthTexture.dispose(),n.remove(L.depthTexture)),L.isWebGLCubeRenderTarget)for(let oe=0;oe<6;oe++){if(Array.isArray(A.__webglFramebuffer[oe]))for(let ne=0;ne<A.__webglFramebuffer[oe].length;ne++)r.deleteFramebuffer(A.__webglFramebuffer[oe][ne]);else r.deleteFramebuffer(A.__webglFramebuffer[oe]);A.__webglDepthbuffer&&r.deleteRenderbuffer(A.__webglDepthbuffer[oe])}else{if(Array.isArray(A.__webglFramebuffer))for(let oe=0;oe<A.__webglFramebuffer.length;oe++)r.deleteFramebuffer(A.__webglFramebuffer[oe]);else r.deleteFramebuffer(A.__webglFramebuffer);if(A.__webglDepthbuffer&&r.deleteRenderbuffer(A.__webglDepthbuffer),A.__webglMultisampledFramebuffer&&r.deleteFramebuffer(A.__webglMultisampledFramebuffer),A.__webglColorRenderbuffer)for(let oe=0;oe<A.__webglColorRenderbuffer.length;oe++)A.__webglColorRenderbuffer[oe]&&r.deleteRenderbuffer(A.__webglColorRenderbuffer[oe]);A.__webglDepthRenderbuffer&&r.deleteRenderbuffer(A.__webglDepthRenderbuffer)}const W=L.textures;for(let oe=0,ne=W.length;oe<ne;oe++){const ie=n.get(W[oe]);ie.__webglTexture&&(r.deleteTexture(ie.__webglTexture),o.memory.textures--),n.remove(W[oe])}n.remove(L)}let D=0;function B(){D=0}function U(){const L=D;return L>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+L+" texture units while this GPU supports only "+i.maxTextures),D+=1,L}function K(L){const A=[];return A.push(L.wrapS),A.push(L.wrapT),A.push(L.wrapR||0),A.push(L.magFilter),A.push(L.minFilter),A.push(L.anisotropy),A.push(L.internalFormat),A.push(L.format),A.push(L.type),A.push(L.generateMipmaps),A.push(L.premultiplyAlpha),A.push(L.flipY),A.push(L.unpackAlignment),A.push(L.colorSpace),A.join()}function F(L,A){const W=n.get(L);if(L.isVideoTexture&&He(L),L.isRenderTargetTexture===!1&&L.version>0&&W.__version!==L.version){const oe=L.image;if(oe===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(oe.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Me(W,L,A);return}}t.bindTexture(r.TEXTURE_2D,W.__webglTexture,r.TEXTURE0+A)}function C(L,A){const W=n.get(L);if(L.version>0&&W.__version!==L.version){Me(W,L,A);return}t.bindTexture(r.TEXTURE_2D_ARRAY,W.__webglTexture,r.TEXTURE0+A)}function J(L,A){const W=n.get(L);if(L.version>0&&W.__version!==L.version){Me(W,L,A);return}t.bindTexture(r.TEXTURE_3D,W.__webglTexture,r.TEXTURE0+A)}function X(L,A){const W=n.get(L);if(L.version>0&&W.__version!==L.version){ve(W,L,A);return}t.bindTexture(r.TEXTURE_CUBE_MAP,W.__webglTexture,r.TEXTURE0+A)}const me={[ca]:r.REPEAT,[is]:r.CLAMP_TO_EDGE,[iu]:r.MIRRORED_REPEAT},I={[ti]:r.NEAREST,[d_]:r.NEAREST_MIPMAP_NEAREST,[Ga]:r.NEAREST_MIPMAP_LINEAR,[xi]:r.LINEAR,[kc]:r.LINEAR_MIPMAP_NEAREST,[Lr]:r.LINEAR_MIPMAP_LINEAR},_e={[qy]:r.NEVER,[Jy]:r.ALWAYS,[Yy]:r.LESS,[b_]:r.LEQUAL,[jy]:r.EQUAL,[Zy]:r.GEQUAL,[$y]:r.GREATER,[Ky]:r.NOTEQUAL};function Y(L,A){if(A.type===Yi&&e.has("OES_texture_float_linear")===!1&&(A.magFilter===xi||A.magFilter===kc||A.magFilter===Ga||A.magFilter===Lr||A.minFilter===xi||A.minFilter===kc||A.minFilter===Ga||A.minFilter===Lr)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),r.texParameteri(L,r.TEXTURE_WRAP_S,me[A.wrapS]),r.texParameteri(L,r.TEXTURE_WRAP_T,me[A.wrapT]),(L===r.TEXTURE_3D||L===r.TEXTURE_2D_ARRAY)&&r.texParameteri(L,r.TEXTURE_WRAP_R,me[A.wrapR]),r.texParameteri(L,r.TEXTURE_MAG_FILTER,I[A.magFilter]),r.texParameteri(L,r.TEXTURE_MIN_FILTER,I[A.minFilter]),A.compareFunction&&(r.texParameteri(L,r.TEXTURE_COMPARE_MODE,r.COMPARE_REF_TO_TEXTURE),r.texParameteri(L,r.TEXTURE_COMPARE_FUNC,_e[A.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(A.magFilter===ti||A.minFilter!==Ga&&A.minFilter!==Lr||A.type===Yi&&e.has("OES_texture_float_linear")===!1)return;if(A.anisotropy>1||n.get(A).__currentAnisotropy){const W=e.get("EXT_texture_filter_anisotropic");r.texParameterf(L,W.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(A.anisotropy,i.getMaxAnisotropy())),n.get(A).__currentAnisotropy=A.anisotropy}}}function Re(L,A){let W=!1;L.__webglInit===void 0&&(L.__webglInit=!0,A.addEventListener("dispose",M));const oe=A.source;let ne=f.get(oe);ne===void 0&&(ne={},f.set(oe,ne));const ie=K(A);if(ie!==L.__cacheKey){ne[ie]===void 0&&(ne[ie]={texture:r.createTexture(),usedTimes:0},o.memory.textures++,W=!0),ne[ie].usedTimes++;const Ee=ne[L.__cacheKey];Ee!==void 0&&(ne[L.__cacheKey].usedTimes--,Ee.usedTimes===0&&y(A)),L.__cacheKey=ie,L.__webglTexture=ne[ie].texture}return W}function Q(L,A,W){return Math.floor(Math.floor(L/W)/A)}function se(L,A,W,oe){const ie=L.updateRanges;if(ie.length===0)t.texSubImage2D(r.TEXTURE_2D,0,0,0,A.width,A.height,W,oe,A.data);else{ie.sort((j,Se)=>j.start-Se.start);let Ee=0;for(let j=1;j<ie.length;j++){const Se=ie[Ee],Ge=ie[j],$e=Se.start+Se.count,de=Q(Ge.start,A.width,4),it=Q(Se.start,A.width,4);Ge.start<=$e+1&&de===it&&Q(Ge.start+Ge.count-1,A.width,4)===de?Se.count=Math.max(Se.count,Ge.start+Ge.count-Se.start):(++Ee,ie[Ee]=Ge)}ie.length=Ee+1;const ge=r.getParameter(r.UNPACK_ROW_LENGTH),ze=r.getParameter(r.UNPACK_SKIP_PIXELS),Ae=r.getParameter(r.UNPACK_SKIP_ROWS);r.pixelStorei(r.UNPACK_ROW_LENGTH,A.width);for(let j=0,Se=ie.length;j<Se;j++){const Ge=ie[j],$e=Math.floor(Ge.start/4),de=Math.ceil(Ge.count/4),it=$e%A.width,N=Math.floor($e/A.width),ue=de,fe=1;r.pixelStorei(r.UNPACK_SKIP_PIXELS,it),r.pixelStorei(r.UNPACK_SKIP_ROWS,N),t.texSubImage2D(r.TEXTURE_2D,0,it,N,ue,fe,W,oe,A.data)}L.clearUpdateRanges(),r.pixelStorei(r.UNPACK_ROW_LENGTH,ge),r.pixelStorei(r.UNPACK_SKIP_PIXELS,ze),r.pixelStorei(r.UNPACK_SKIP_ROWS,Ae)}}function Me(L,A,W){let oe=r.TEXTURE_2D;(A.isDataArrayTexture||A.isCompressedArrayTexture)&&(oe=r.TEXTURE_2D_ARRAY),A.isData3DTexture&&(oe=r.TEXTURE_3D);const ne=Re(L,A),ie=A.source;t.bindTexture(oe,L.__webglTexture,r.TEXTURE0+W);const Ee=n.get(ie);if(ie.version!==Ee.__version||ne===!0){t.activeTexture(r.TEXTURE0+W);const ge=Nt.getPrimaries(Nt.workingColorSpace),ze=A.colorSpace===ns?null:Nt.getPrimaries(A.colorSpace),Ae=A.colorSpace===ns||ge===ze?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,A.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,A.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,A.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ae);let j=g(A.image,!1,i.maxTextureSize);j=ke(A,j);const Se=s.convert(A.format,A.colorSpace),Ge=s.convert(A.type);let $e=x(A.internalFormat,Se,Ge,A.colorSpace,A.isVideoTexture);Y(oe,A);let de;const it=A.mipmaps,N=A.isVideoTexture!==!0,ue=Ee.__version===void 0||ne===!0,fe=ie.dataReady,ye=T(A,j);if(A.isDepthTexture)$e=v(A.format===El,A.type),ue&&(N?t.texStorage2D(r.TEXTURE_2D,1,$e,j.width,j.height):t.texImage2D(r.TEXTURE_2D,0,$e,j.width,j.height,0,Se,Ge,null));else if(A.isDataTexture)if(it.length>0){N&&ue&&t.texStorage2D(r.TEXTURE_2D,ye,$e,it[0].width,it[0].height);for(let pe=0,ae=it.length;pe<ae;pe++)de=it[pe],N?fe&&t.texSubImage2D(r.TEXTURE_2D,pe,0,0,de.width,de.height,Se,Ge,de.data):t.texImage2D(r.TEXTURE_2D,pe,$e,de.width,de.height,0,Se,Ge,de.data);A.generateMipmaps=!1}else N?(ue&&t.texStorage2D(r.TEXTURE_2D,ye,$e,j.width,j.height),fe&&se(A,j,Se,Ge)):t.texImage2D(r.TEXTURE_2D,0,$e,j.width,j.height,0,Se,Ge,j.data);else if(A.isCompressedTexture)if(A.isCompressedArrayTexture){N&&ue&&t.texStorage3D(r.TEXTURE_2D_ARRAY,ye,$e,it[0].width,it[0].height,j.depth);for(let pe=0,ae=it.length;pe<ae;pe++)if(de=it[pe],A.format!==Ii)if(Se!==null)if(N){if(fe)if(A.layerUpdates.size>0){const Be=mm(de.width,de.height,A.format,A.type);for(const rt of A.layerUpdates){const Ut=de.data.subarray(rt*Be/de.data.BYTES_PER_ELEMENT,(rt+1)*Be/de.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,pe,0,0,rt,de.width,de.height,1,Se,Ut)}A.clearLayerUpdates()}else t.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,pe,0,0,0,de.width,de.height,j.depth,Se,de.data)}else t.compressedTexImage3D(r.TEXTURE_2D_ARRAY,pe,$e,de.width,de.height,j.depth,0,de.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else N?fe&&t.texSubImage3D(r.TEXTURE_2D_ARRAY,pe,0,0,0,de.width,de.height,j.depth,Se,Ge,de.data):t.texImage3D(r.TEXTURE_2D_ARRAY,pe,$e,de.width,de.height,j.depth,0,Se,Ge,de.data)}else{N&&ue&&t.texStorage2D(r.TEXTURE_2D,ye,$e,it[0].width,it[0].height);for(let pe=0,ae=it.length;pe<ae;pe++)de=it[pe],A.format!==Ii?Se!==null?N?fe&&t.compressedTexSubImage2D(r.TEXTURE_2D,pe,0,0,de.width,de.height,Se,de.data):t.compressedTexImage2D(r.TEXTURE_2D,pe,$e,de.width,de.height,0,de.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):N?fe&&t.texSubImage2D(r.TEXTURE_2D,pe,0,0,de.width,de.height,Se,Ge,de.data):t.texImage2D(r.TEXTURE_2D,pe,$e,de.width,de.height,0,Se,Ge,de.data)}else if(A.isDataArrayTexture)if(N){if(ue&&t.texStorage3D(r.TEXTURE_2D_ARRAY,ye,$e,j.width,j.height,j.depth),fe)if(A.layerUpdates.size>0){const pe=mm(j.width,j.height,A.format,A.type);for(const ae of A.layerUpdates){const Be=j.data.subarray(ae*pe/j.data.BYTES_PER_ELEMENT,(ae+1)*pe/j.data.BYTES_PER_ELEMENT);t.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,ae,j.width,j.height,1,Se,Ge,Be)}A.clearLayerUpdates()}else t.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,0,j.width,j.height,j.depth,Se,Ge,j.data)}else t.texImage3D(r.TEXTURE_2D_ARRAY,0,$e,j.width,j.height,j.depth,0,Se,Ge,j.data);else if(A.isData3DTexture)N?(ue&&t.texStorage3D(r.TEXTURE_3D,ye,$e,j.width,j.height,j.depth),fe&&t.texSubImage3D(r.TEXTURE_3D,0,0,0,0,j.width,j.height,j.depth,Se,Ge,j.data)):t.texImage3D(r.TEXTURE_3D,0,$e,j.width,j.height,j.depth,0,Se,Ge,j.data);else if(A.isFramebufferTexture){if(ue)if(N)t.texStorage2D(r.TEXTURE_2D,ye,$e,j.width,j.height);else{let pe=j.width,ae=j.height;for(let Be=0;Be<ye;Be++)t.texImage2D(r.TEXTURE_2D,Be,$e,pe,ae,0,Se,Ge,null),pe>>=1,ae>>=1}}else if(it.length>0){if(N&&ue){const pe=mt(it[0]);t.texStorage2D(r.TEXTURE_2D,ye,$e,pe.width,pe.height)}for(let pe=0,ae=it.length;pe<ae;pe++)de=it[pe],N?fe&&t.texSubImage2D(r.TEXTURE_2D,pe,0,0,Se,Ge,de):t.texImage2D(r.TEXTURE_2D,pe,$e,Se,Ge,de);A.generateMipmaps=!1}else if(N){if(ue){const pe=mt(j);t.texStorage2D(r.TEXTURE_2D,ye,$e,pe.width,pe.height)}fe&&t.texSubImage2D(r.TEXTURE_2D,0,0,0,Se,Ge,j)}else t.texImage2D(r.TEXTURE_2D,0,$e,Se,Ge,j);m(A)&&p(oe),Ee.__version=ie.version,A.onUpdate&&A.onUpdate(A)}L.__version=A.version}function ve(L,A,W){if(A.image.length!==6)return;const oe=Re(L,A),ne=A.source;t.bindTexture(r.TEXTURE_CUBE_MAP,L.__webglTexture,r.TEXTURE0+W);const ie=n.get(ne);if(ne.version!==ie.__version||oe===!0){t.activeTexture(r.TEXTURE0+W);const Ee=Nt.getPrimaries(Nt.workingColorSpace),ge=A.colorSpace===ns?null:Nt.getPrimaries(A.colorSpace),ze=A.colorSpace===ns||Ee===ge?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,A.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,A.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,A.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,ze);const Ae=A.isCompressedTexture||A.image[0].isCompressedTexture,j=A.image[0]&&A.image[0].isDataTexture,Se=[];for(let ae=0;ae<6;ae++)!Ae&&!j?Se[ae]=g(A.image[ae],!0,i.maxCubemapSize):Se[ae]=j?A.image[ae].image:A.image[ae],Se[ae]=ke(A,Se[ae]);const Ge=Se[0],$e=s.convert(A.format,A.colorSpace),de=s.convert(A.type),it=x(A.internalFormat,$e,de,A.colorSpace),N=A.isVideoTexture!==!0,ue=ie.__version===void 0||oe===!0,fe=ne.dataReady;let ye=T(A,Ge);Y(r.TEXTURE_CUBE_MAP,A);let pe;if(Ae){N&&ue&&t.texStorage2D(r.TEXTURE_CUBE_MAP,ye,it,Ge.width,Ge.height);for(let ae=0;ae<6;ae++){pe=Se[ae].mipmaps;for(let Be=0;Be<pe.length;Be++){const rt=pe[Be];A.format!==Ii?$e!==null?N?fe&&t.compressedTexSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ae,Be,0,0,rt.width,rt.height,$e,rt.data):t.compressedTexImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ae,Be,it,rt.width,rt.height,0,rt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):N?fe&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ae,Be,0,0,rt.width,rt.height,$e,de,rt.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ae,Be,it,rt.width,rt.height,0,$e,de,rt.data)}}}else{if(pe=A.mipmaps,N&&ue){pe.length>0&&ye++;const ae=mt(Se[0]);t.texStorage2D(r.TEXTURE_CUBE_MAP,ye,it,ae.width,ae.height)}for(let ae=0;ae<6;ae++)if(j){N?fe&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0,0,0,Se[ae].width,Se[ae].height,$e,de,Se[ae].data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0,it,Se[ae].width,Se[ae].height,0,$e,de,Se[ae].data);for(let Be=0;Be<pe.length;Be++){const Ut=pe[Be].image[ae].image;N?fe&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ae,Be+1,0,0,Ut.width,Ut.height,$e,de,Ut.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ae,Be+1,it,Ut.width,Ut.height,0,$e,de,Ut.data)}}else{N?fe&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0,0,0,$e,de,Se[ae]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0,it,$e,de,Se[ae]);for(let Be=0;Be<pe.length;Be++){const rt=pe[Be];N?fe&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ae,Be+1,0,0,$e,de,rt.image[ae]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ae,Be+1,it,$e,de,rt.image[ae])}}}m(A)&&p(r.TEXTURE_CUBE_MAP),ie.__version=ne.version,A.onUpdate&&A.onUpdate(A)}L.__version=A.version}function De(L,A,W,oe,ne,ie){const Ee=s.convert(W.format,W.colorSpace),ge=s.convert(W.type),ze=x(W.internalFormat,Ee,ge,W.colorSpace),Ae=n.get(A),j=n.get(W);if(j.__renderTarget=A,!Ae.__hasExternalTextures){const Se=Math.max(1,A.width>>ie),Ge=Math.max(1,A.height>>ie);ne===r.TEXTURE_3D||ne===r.TEXTURE_2D_ARRAY?t.texImage3D(ne,ie,ze,Se,Ge,A.depth,0,Ee,ge,null):t.texImage2D(ne,ie,ze,Se,Ge,0,Ee,ge,null)}t.bindFramebuffer(r.FRAMEBUFFER,L),dt(A)?a.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,oe,ne,j.__webglTexture,0,Oe(A)):(ne===r.TEXTURE_2D||ne>=r.TEXTURE_CUBE_MAP_POSITIVE_X&&ne<=r.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&r.framebufferTexture2D(r.FRAMEBUFFER,oe,ne,j.__webglTexture,ie),t.bindFramebuffer(r.FRAMEBUFFER,null)}function Qe(L,A,W){if(r.bindRenderbuffer(r.RENDERBUFFER,L),A.depthBuffer){const oe=A.depthTexture,ne=oe&&oe.isDepthTexture?oe.type:null,ie=v(A.stencilBuffer,ne),Ee=A.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,ge=Oe(A);dt(A)?a.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,ge,ie,A.width,A.height):W?r.renderbufferStorageMultisample(r.RENDERBUFFER,ge,ie,A.width,A.height):r.renderbufferStorage(r.RENDERBUFFER,ie,A.width,A.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,Ee,r.RENDERBUFFER,L)}else{const oe=A.textures;for(let ne=0;ne<oe.length;ne++){const ie=oe[ne],Ee=s.convert(ie.format,ie.colorSpace),ge=s.convert(ie.type),ze=x(ie.internalFormat,Ee,ge,ie.colorSpace),Ae=Oe(A);W&&dt(A)===!1?r.renderbufferStorageMultisample(r.RENDERBUFFER,Ae,ze,A.width,A.height):dt(A)?a.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,Ae,ze,A.width,A.height):r.renderbufferStorage(r.RENDERBUFFER,ze,A.width,A.height)}}r.bindRenderbuffer(r.RENDERBUFFER,null)}function Pe(L,A){if(A&&A.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(r.FRAMEBUFFER,L),!(A.depthTexture&&A.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const oe=n.get(A.depthTexture);oe.__renderTarget=A,(!oe.__webglTexture||A.depthTexture.image.width!==A.width||A.depthTexture.image.height!==A.height)&&(A.depthTexture.image.width=A.width,A.depthTexture.image.height=A.height,A.depthTexture.needsUpdate=!0),F(A.depthTexture,0);const ne=oe.__webglTexture,ie=Oe(A);if(A.depthTexture.format===Ml)dt(A)?a.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,ne,0,ie):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,ne,0);else if(A.depthTexture.format===El)dt(A)?a.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,ne,0,ie):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,ne,0);else throw new Error("Unknown depthTexture format")}function nt(L){const A=n.get(L),W=L.isWebGLCubeRenderTarget===!0;if(A.__boundDepthTexture!==L.depthTexture){const oe=L.depthTexture;if(A.__depthDisposeCallback&&A.__depthDisposeCallback(),oe){const ne=()=>{delete A.__boundDepthTexture,delete A.__depthDisposeCallback,oe.removeEventListener("dispose",ne)};oe.addEventListener("dispose",ne),A.__depthDisposeCallback=ne}A.__boundDepthTexture=oe}if(L.depthTexture&&!A.__autoAllocateDepthBuffer){if(W)throw new Error("target.depthTexture not supported in Cube render targets");const oe=L.texture.mipmaps;oe&&oe.length>0?Pe(A.__webglFramebuffer[0],L):Pe(A.__webglFramebuffer,L)}else if(W){A.__webglDepthbuffer=[];for(let oe=0;oe<6;oe++)if(t.bindFramebuffer(r.FRAMEBUFFER,A.__webglFramebuffer[oe]),A.__webglDepthbuffer[oe]===void 0)A.__webglDepthbuffer[oe]=r.createRenderbuffer(),Qe(A.__webglDepthbuffer[oe],L,!1);else{const ne=L.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,ie=A.__webglDepthbuffer[oe];r.bindRenderbuffer(r.RENDERBUFFER,ie),r.framebufferRenderbuffer(r.FRAMEBUFFER,ne,r.RENDERBUFFER,ie)}}else{const oe=L.texture.mipmaps;if(oe&&oe.length>0?t.bindFramebuffer(r.FRAMEBUFFER,A.__webglFramebuffer[0]):t.bindFramebuffer(r.FRAMEBUFFER,A.__webglFramebuffer),A.__webglDepthbuffer===void 0)A.__webglDepthbuffer=r.createRenderbuffer(),Qe(A.__webglDepthbuffer,L,!1);else{const ne=L.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,ie=A.__webglDepthbuffer;r.bindRenderbuffer(r.RENDERBUFFER,ie),r.framebufferRenderbuffer(r.FRAMEBUFFER,ne,r.RENDERBUFFER,ie)}}t.bindFramebuffer(r.FRAMEBUFFER,null)}function pt(L,A,W){const oe=n.get(L);A!==void 0&&De(oe.__webglFramebuffer,L,L.texture,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,0),W!==void 0&&nt(L)}function Fe(L){const A=L.texture,W=n.get(L),oe=n.get(A);L.addEventListener("dispose",E);const ne=L.textures,ie=L.isWebGLCubeRenderTarget===!0,Ee=ne.length>1;if(Ee||(oe.__webglTexture===void 0&&(oe.__webglTexture=r.createTexture()),oe.__version=A.version,o.memory.textures++),ie){W.__webglFramebuffer=[];for(let ge=0;ge<6;ge++)if(A.mipmaps&&A.mipmaps.length>0){W.__webglFramebuffer[ge]=[];for(let ze=0;ze<A.mipmaps.length;ze++)W.__webglFramebuffer[ge][ze]=r.createFramebuffer()}else W.__webglFramebuffer[ge]=r.createFramebuffer()}else{if(A.mipmaps&&A.mipmaps.length>0){W.__webglFramebuffer=[];for(let ge=0;ge<A.mipmaps.length;ge++)W.__webglFramebuffer[ge]=r.createFramebuffer()}else W.__webglFramebuffer=r.createFramebuffer();if(Ee)for(let ge=0,ze=ne.length;ge<ze;ge++){const Ae=n.get(ne[ge]);Ae.__webglTexture===void 0&&(Ae.__webglTexture=r.createTexture(),o.memory.textures++)}if(L.samples>0&&dt(L)===!1){W.__webglMultisampledFramebuffer=r.createFramebuffer(),W.__webglColorRenderbuffer=[],t.bindFramebuffer(r.FRAMEBUFFER,W.__webglMultisampledFramebuffer);for(let ge=0;ge<ne.length;ge++){const ze=ne[ge];W.__webglColorRenderbuffer[ge]=r.createRenderbuffer(),r.bindRenderbuffer(r.RENDERBUFFER,W.__webglColorRenderbuffer[ge]);const Ae=s.convert(ze.format,ze.colorSpace),j=s.convert(ze.type),Se=x(ze.internalFormat,Ae,j,ze.colorSpace,L.isXRRenderTarget===!0),Ge=Oe(L);r.renderbufferStorageMultisample(r.RENDERBUFFER,Ge,Se,L.width,L.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+ge,r.RENDERBUFFER,W.__webglColorRenderbuffer[ge])}r.bindRenderbuffer(r.RENDERBUFFER,null),L.depthBuffer&&(W.__webglDepthRenderbuffer=r.createRenderbuffer(),Qe(W.__webglDepthRenderbuffer,L,!0)),t.bindFramebuffer(r.FRAMEBUFFER,null)}}if(ie){t.bindTexture(r.TEXTURE_CUBE_MAP,oe.__webglTexture),Y(r.TEXTURE_CUBE_MAP,A);for(let ge=0;ge<6;ge++)if(A.mipmaps&&A.mipmaps.length>0)for(let ze=0;ze<A.mipmaps.length;ze++)De(W.__webglFramebuffer[ge][ze],L,A,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+ge,ze);else De(W.__webglFramebuffer[ge],L,A,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+ge,0);m(A)&&p(r.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Ee){for(let ge=0,ze=ne.length;ge<ze;ge++){const Ae=ne[ge],j=n.get(Ae);t.bindTexture(r.TEXTURE_2D,j.__webglTexture),Y(r.TEXTURE_2D,Ae),De(W.__webglFramebuffer,L,Ae,r.COLOR_ATTACHMENT0+ge,r.TEXTURE_2D,0),m(Ae)&&p(r.TEXTURE_2D)}t.unbindTexture()}else{let ge=r.TEXTURE_2D;if((L.isWebGL3DRenderTarget||L.isWebGLArrayRenderTarget)&&(ge=L.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),t.bindTexture(ge,oe.__webglTexture),Y(ge,A),A.mipmaps&&A.mipmaps.length>0)for(let ze=0;ze<A.mipmaps.length;ze++)De(W.__webglFramebuffer[ze],L,A,r.COLOR_ATTACHMENT0,ge,ze);else De(W.__webglFramebuffer,L,A,r.COLOR_ATTACHMENT0,ge,0);m(A)&&p(ge),t.unbindTexture()}L.depthBuffer&&nt(L)}function O(L){const A=L.textures;for(let W=0,oe=A.length;W<oe;W++){const ne=A[W];if(m(ne)){const ie=S(L),Ee=n.get(ne).__webglTexture;t.bindTexture(ie,Ee),p(ie),t.unbindTexture()}}}const Dt=[],Xe=[];function q(L){if(L.samples>0){if(dt(L)===!1){const A=L.textures,W=L.width,oe=L.height;let ne=r.COLOR_BUFFER_BIT;const ie=L.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,Ee=n.get(L),ge=A.length>1;if(ge)for(let Ae=0;Ae<A.length;Ae++)t.bindFramebuffer(r.FRAMEBUFFER,Ee.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+Ae,r.RENDERBUFFER,null),t.bindFramebuffer(r.FRAMEBUFFER,Ee.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+Ae,r.TEXTURE_2D,null,0);t.bindFramebuffer(r.READ_FRAMEBUFFER,Ee.__webglMultisampledFramebuffer);const ze=L.texture.mipmaps;ze&&ze.length>0?t.bindFramebuffer(r.DRAW_FRAMEBUFFER,Ee.__webglFramebuffer[0]):t.bindFramebuffer(r.DRAW_FRAMEBUFFER,Ee.__webglFramebuffer);for(let Ae=0;Ae<A.length;Ae++){if(L.resolveDepthBuffer&&(L.depthBuffer&&(ne|=r.DEPTH_BUFFER_BIT),L.stencilBuffer&&L.resolveStencilBuffer&&(ne|=r.STENCIL_BUFFER_BIT)),ge){r.framebufferRenderbuffer(r.READ_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,Ee.__webglColorRenderbuffer[Ae]);const j=n.get(A[Ae]).__webglTexture;r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,j,0)}r.blitFramebuffer(0,0,W,oe,0,0,W,oe,ne,r.NEAREST),l===!0&&(Dt.length=0,Xe.length=0,Dt.push(r.COLOR_ATTACHMENT0+Ae),L.depthBuffer&&L.resolveDepthBuffer===!1&&(Dt.push(ie),Xe.push(ie),r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,Xe)),r.invalidateFramebuffer(r.READ_FRAMEBUFFER,Dt))}if(t.bindFramebuffer(r.READ_FRAMEBUFFER,null),t.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),ge)for(let Ae=0;Ae<A.length;Ae++){t.bindFramebuffer(r.FRAMEBUFFER,Ee.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+Ae,r.RENDERBUFFER,Ee.__webglColorRenderbuffer[Ae]);const j=n.get(A[Ae]).__webglTexture;t.bindFramebuffer(r.FRAMEBUFFER,Ee.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+Ae,r.TEXTURE_2D,j,0)}t.bindFramebuffer(r.DRAW_FRAMEBUFFER,Ee.__webglMultisampledFramebuffer)}else if(L.depthBuffer&&L.resolveDepthBuffer===!1&&l){const A=L.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,[A])}}}function Oe(L){return Math.min(i.maxSamples,L.samples)}function dt(L){const A=n.get(L);return L.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&A.__useRenderToTexture!==!1}function He(L){const A=o.render.frame;u.get(L)!==A&&(u.set(L,A),L.update())}function ke(L,A){const W=L.colorSpace,oe=L.format,ne=L.type;return L.isCompressedTexture===!0||L.isVideoTexture===!0||W!==ni&&W!==ns&&(Nt.getTransfer(W)===Yt?(oe!==Ii||ne!==hr)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",W)),A}function mt(L){return typeof HTMLImageElement<"u"&&L instanceof HTMLImageElement?(c.width=L.naturalWidth||L.width,c.height=L.naturalHeight||L.height):typeof VideoFrame<"u"&&L instanceof VideoFrame?(c.width=L.displayWidth,c.height=L.displayHeight):(c.width=L.width,c.height=L.height),c}this.allocateTextureUnit=U,this.resetTextureUnits=B,this.setTexture2D=F,this.setTexture2DArray=C,this.setTexture3D=J,this.setTextureCube=X,this.rebindTextures=pt,this.setupRenderTarget=Fe,this.updateRenderTargetMipmap=O,this.updateMultisampleRenderTarget=q,this.setupDepthRenderbuffer=nt,this.setupFrameBufferTexture=De,this.useMultisampledRTT=dt}function lT(r,e){function t(n,i=ns){let s;const o=Nt.getTransfer(i);if(n===hr)return r.UNSIGNED_BYTE;if(n===xh)return r.UNSIGNED_SHORT_4_4_4_4;if(n===bh)return r.UNSIGNED_SHORT_5_5_5_1;if(n===p_)return r.UNSIGNED_INT_5_9_9_9_REV;if(n===f_)return r.BYTE;if(n===h_)return r.SHORT;if(n===Sl)return r.UNSIGNED_SHORT;if(n===yh)return r.INT;if(n===ro)return r.UNSIGNED_INT;if(n===Yi)return r.FLOAT;if(n===Hl)return r.HALF_FLOAT;if(n===m_)return r.ALPHA;if(n===g_)return r.RGB;if(n===Ii)return r.RGBA;if(n===Ml)return r.DEPTH_COMPONENT;if(n===El)return r.DEPTH_STENCIL;if(n===Sh)return r.RED;if(n===wh)return r.RED_INTEGER;if(n===__)return r.RG;if(n===Mh)return r.RG_INTEGER;if(n===Eh)return r.RGBA_INTEGER;if(n===Bc||n===zc||n===Hc||n===Vc)if(o===Yt)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(n===Bc)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===zc)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Hc)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Vc)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(n===Bc)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===zc)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Hc)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Vc)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Zd||n===Jd||n===Qd||n===ef)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(n===Zd)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Jd)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Qd)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===ef)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===tf||n===nf||n===rf)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(n===tf||n===nf)return o===Yt?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(n===rf)return o===Yt?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===sf||n===of||n===af||n===lf||n===cf||n===uf||n===df||n===ff||n===hf||n===pf||n===mf||n===gf||n===_f||n===vf)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(n===sf)return o===Yt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===of)return o===Yt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===af)return o===Yt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===lf)return o===Yt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===cf)return o===Yt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===uf)return o===Yt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===df)return o===Yt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===ff)return o===Yt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===hf)return o===Yt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===pf)return o===Yt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===mf)return o===Yt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===gf)return o===Yt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===_f)return o===Yt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===vf)return o===Yt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Gc||n===yf||n===xf)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(n===Gc)return o===Yt?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===yf)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===xf)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===v_||n===bf||n===Sf||n===wf)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(n===Gc)return s.COMPRESSED_RED_RGTC1_EXT;if(n===bf)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Sf)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===wf)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===wl?r.UNSIGNED_INT_24_8:r[n]!==void 0?r[n]:null}return{convert:t}}const cT=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,uT=`
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

}`;class dT{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,n){if(this.texture===null){const i=new Mn,s=e.properties.get(i);s.__webglTexture=t.texture,(t.depthNear!==n.depthNear||t.depthFar!==n.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new Oi({vertexShader:cT,fragmentShader:uT,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new ei(new Gi(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class fT extends Sa{constructor(e,t){super();const n=this;let i=null,s=1,o=null,a="local-floor",l=1,c=null,u=null,d=null,f=null,h=null,_=null;const g=new dT,m=t.getContextAttributes();let p=null,S=null;const x=[],v=[],T=new Ct;let M=null;const E=new ri;E.viewport=new zt;const P=new ri;P.viewport=new zt;const y=[E,P],b=new Mb;let D=null,B=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Q){let se=x[Q];return se===void 0&&(se=new id,x[Q]=se),se.getTargetRaySpace()},this.getControllerGrip=function(Q){let se=x[Q];return se===void 0&&(se=new id,x[Q]=se),se.getGripSpace()},this.getHand=function(Q){let se=x[Q];return se===void 0&&(se=new id,x[Q]=se),se.getHandSpace()};function U(Q){const se=v.indexOf(Q.inputSource);if(se===-1)return;const Me=x[se];Me!==void 0&&(Me.update(Q.inputSource,Q.frame,c||o),Me.dispatchEvent({type:Q.type,data:Q.inputSource}))}function K(){i.removeEventListener("select",U),i.removeEventListener("selectstart",U),i.removeEventListener("selectend",U),i.removeEventListener("squeeze",U),i.removeEventListener("squeezestart",U),i.removeEventListener("squeezeend",U),i.removeEventListener("end",K),i.removeEventListener("inputsourceschange",F);for(let Q=0;Q<x.length;Q++){const se=v[Q];se!==null&&(v[Q]=null,x[Q].disconnect(se))}D=null,B=null,g.reset(),e.setRenderTarget(p),h=null,f=null,d=null,i=null,S=null,Re.stop(),n.isPresenting=!1,e.setPixelRatio(M),e.setSize(T.width,T.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Q){s=Q,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Q){a=Q,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(Q){c=Q},this.getBaseLayer=function(){return f!==null?f:h},this.getBinding=function(){return d},this.getFrame=function(){return _},this.getSession=function(){return i},this.setSession=async function(Q){if(i=Q,i!==null){if(p=e.getRenderTarget(),i.addEventListener("select",U),i.addEventListener("selectstart",U),i.addEventListener("selectend",U),i.addEventListener("squeeze",U),i.addEventListener("squeezestart",U),i.addEventListener("squeezeend",U),i.addEventListener("end",K),i.addEventListener("inputsourceschange",F),m.xrCompatible!==!0&&await t.makeXRCompatible(),M=e.getPixelRatio(),e.getSize(T),typeof XRWebGLBinding<"u"&&"createProjectionLayer"in XRWebGLBinding.prototype){let Me=null,ve=null,De=null;m.depth&&(De=m.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,Me=m.stencil?El:Ml,ve=m.stencil?wl:ro);const Qe={colorFormat:t.RGBA8,depthFormat:De,scaleFactor:s};d=new XRWebGLBinding(i,t),f=d.createProjectionLayer(Qe),i.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),S=new so(f.textureWidth,f.textureHeight,{format:Ii,type:hr,depthTexture:new N_(f.textureWidth,f.textureHeight,ve,void 0,void 0,void 0,void 0,void 0,void 0,Me),stencilBuffer:m.stencil,colorSpace:e.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}else{const Me={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:s};h=new XRWebGLLayer(i,t,Me),i.updateRenderState({baseLayer:h}),e.setPixelRatio(1),e.setSize(h.framebufferWidth,h.framebufferHeight,!1),S=new so(h.framebufferWidth,h.framebufferHeight,{format:Ii,type:hr,colorSpace:e.outputColorSpace,stencilBuffer:m.stencil,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1})}S.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await i.requestReferenceSpace(a),Re.setContext(i),Re.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function F(Q){for(let se=0;se<Q.removed.length;se++){const Me=Q.removed[se],ve=v.indexOf(Me);ve>=0&&(v[ve]=null,x[ve].disconnect(Me))}for(let se=0;se<Q.added.length;se++){const Me=Q.added[se];let ve=v.indexOf(Me);if(ve===-1){for(let Qe=0;Qe<x.length;Qe++)if(Qe>=v.length){v.push(Me),ve=Qe;break}else if(v[Qe]===null){v[Qe]=Me,ve=Qe;break}if(ve===-1)break}const De=x[ve];De&&De.connect(Me)}}const C=new G,J=new G;function X(Q,se,Me){C.setFromMatrixPosition(se.matrixWorld),J.setFromMatrixPosition(Me.matrixWorld);const ve=C.distanceTo(J),De=se.projectionMatrix.elements,Qe=Me.projectionMatrix.elements,Pe=De[14]/(De[10]-1),nt=De[14]/(De[10]+1),pt=(De[9]+1)/De[5],Fe=(De[9]-1)/De[5],O=(De[8]-1)/De[0],Dt=(Qe[8]+1)/Qe[0],Xe=Pe*O,q=Pe*Dt,Oe=ve/(-O+Dt),dt=Oe*-O;if(se.matrixWorld.decompose(Q.position,Q.quaternion,Q.scale),Q.translateX(dt),Q.translateZ(Oe),Q.matrixWorld.compose(Q.position,Q.quaternion,Q.scale),Q.matrixWorldInverse.copy(Q.matrixWorld).invert(),De[10]===-1)Q.projectionMatrix.copy(se.projectionMatrix),Q.projectionMatrixInverse.copy(se.projectionMatrixInverse);else{const He=Pe+Oe,ke=nt+Oe,mt=Xe-dt,L=q+(ve-dt),A=pt*nt/ke*He,W=Fe*nt/ke*He;Q.projectionMatrix.makePerspective(mt,L,A,W,He,ke),Q.projectionMatrixInverse.copy(Q.projectionMatrix).invert()}}function me(Q,se){se===null?Q.matrixWorld.copy(Q.matrix):Q.matrixWorld.multiplyMatrices(se.matrixWorld,Q.matrix),Q.matrixWorldInverse.copy(Q.matrixWorld).invert()}this.updateCamera=function(Q){if(i===null)return;let se=Q.near,Me=Q.far;g.texture!==null&&(g.depthNear>0&&(se=g.depthNear),g.depthFar>0&&(Me=g.depthFar)),b.near=P.near=E.near=se,b.far=P.far=E.far=Me,(D!==b.near||B!==b.far)&&(i.updateRenderState({depthNear:b.near,depthFar:b.far}),D=b.near,B=b.far),E.layers.mask=Q.layers.mask|2,P.layers.mask=Q.layers.mask|4,b.layers.mask=E.layers.mask|P.layers.mask;const ve=Q.parent,De=b.cameras;me(b,ve);for(let Qe=0;Qe<De.length;Qe++)me(De[Qe],ve);De.length===2?X(b,E,P):b.projectionMatrix.copy(E.projectionMatrix),I(Q,b,ve)};function I(Q,se,Me){Me===null?Q.matrix.copy(se.matrixWorld):(Q.matrix.copy(Me.matrixWorld),Q.matrix.invert(),Q.matrix.multiply(se.matrixWorld)),Q.matrix.decompose(Q.position,Q.quaternion,Q.scale),Q.updateMatrixWorld(!0),Q.projectionMatrix.copy(se.projectionMatrix),Q.projectionMatrixInverse.copy(se.projectionMatrixInverse),Q.isPerspectiveCamera&&(Q.fov=ua*2*Math.atan(1/Q.projectionMatrix.elements[5]),Q.zoom=1)}this.getCamera=function(){return b},this.getFoveation=function(){if(!(f===null&&h===null))return l},this.setFoveation=function(Q){l=Q,f!==null&&(f.fixedFoveation=Q),h!==null&&h.fixedFoveation!==void 0&&(h.fixedFoveation=Q)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(b)};let _e=null;function Y(Q,se){if(u=se.getViewerPose(c||o),_=se,u!==null){const Me=u.views;h!==null&&(e.setRenderTargetFramebuffer(S,h.framebuffer),e.setRenderTarget(S));let ve=!1;Me.length!==b.cameras.length&&(b.cameras.length=0,ve=!0);for(let Pe=0;Pe<Me.length;Pe++){const nt=Me[Pe];let pt=null;if(h!==null)pt=h.getViewport(nt);else{const O=d.getViewSubImage(f,nt);pt=O.viewport,Pe===0&&(e.setRenderTargetTextures(S,O.colorTexture,O.depthStencilTexture),e.setRenderTarget(S))}let Fe=y[Pe];Fe===void 0&&(Fe=new ri,Fe.layers.enable(Pe),Fe.viewport=new zt,y[Pe]=Fe),Fe.matrix.fromArray(nt.transform.matrix),Fe.matrix.decompose(Fe.position,Fe.quaternion,Fe.scale),Fe.projectionMatrix.fromArray(nt.projectionMatrix),Fe.projectionMatrixInverse.copy(Fe.projectionMatrix).invert(),Fe.viewport.set(pt.x,pt.y,pt.width,pt.height),Pe===0&&(b.matrix.copy(Fe.matrix),b.matrix.decompose(b.position,b.quaternion,b.scale)),ve===!0&&b.cameras.push(Fe)}const De=i.enabledFeatures;if(De&&De.includes("depth-sensing")&&i.depthUsage=="gpu-optimized"&&d){const Pe=d.getDepthInformation(Me[0]);Pe&&Pe.isValid&&Pe.texture&&g.init(e,Pe,i.renderState)}}for(let Me=0;Me<x.length;Me++){const ve=v[Me],De=x[Me];ve!==null&&De!==void 0&&De.update(ve,se,c||o)}_e&&_e(Q,se),se.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:se}),_=null}const Re=new z_;Re.setAnimationLoop(Y),this.setAnimationLoop=function(Q){_e=Q},this.dispose=function(){}}}const Ls=new pr,hT=new _t;function pT(r,e){function t(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,C_(r)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function i(m,p,S,x,v){p.isMeshBasicMaterial||p.isMeshLambertMaterial?s(m,p):p.isMeshToonMaterial?(s(m,p),d(m,p)):p.isMeshPhongMaterial?(s(m,p),u(m,p)):p.isMeshStandardMaterial?(s(m,p),f(m,p),p.isMeshPhysicalMaterial&&h(m,p,v)):p.isMeshMatcapMaterial?(s(m,p),_(m,p)):p.isMeshDepthMaterial?s(m,p):p.isMeshDistanceMaterial?(s(m,p),g(m,p)):p.isMeshNormalMaterial?s(m,p):p.isLineBasicMaterial?(o(m,p),p.isLineDashedMaterial&&a(m,p)):p.isPointsMaterial?l(m,p,S,x):p.isSpriteMaterial?c(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function s(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,t(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===si&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,t(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===si&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,t(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,t(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const S=e.get(p),x=S.envMap,v=S.envMapRotation;x&&(m.envMap.value=x,Ls.copy(v),Ls.x*=-1,Ls.y*=-1,Ls.z*=-1,x.isCubeTexture&&x.isRenderTargetTexture===!1&&(Ls.y*=-1,Ls.z*=-1),m.envMapRotation.value.setFromMatrix4(hT.makeRotationFromEuler(Ls)),m.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,m.aoMapTransform))}function o(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform))}function a(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function l(m,p,S,x){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*S,m.scale.value=x*.5,p.map&&(m.map.value=p.map,t(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function c(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function u(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function d(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function f(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function h(m,p,S){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===si&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=S.texture,m.transmissionSamplerSize.value.set(S.width,S.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,m.specularIntensityMapTransform))}function _(m,p){p.matcap&&(m.matcap.value=p.matcap)}function g(m,p){const S=e.get(p).light;m.referencePosition.value.setFromMatrixPosition(S.matrixWorld),m.nearDistance.value=S.shadow.camera.near,m.farDistance.value=S.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function mT(r,e,t,n){let i={},s={},o=[];const a=r.getParameter(r.MAX_UNIFORM_BUFFER_BINDINGS);function l(S,x){const v=x.program;n.uniformBlockBinding(S,v)}function c(S,x){let v=i[S.id];v===void 0&&(_(S),v=u(S),i[S.id]=v,S.addEventListener("dispose",m));const T=x.program;n.updateUBOMapping(S,T);const M=e.render.frame;s[S.id]!==M&&(f(S),s[S.id]=M)}function u(S){const x=d();S.__bindingPointIndex=x;const v=r.createBuffer(),T=S.__size,M=S.usage;return r.bindBuffer(r.UNIFORM_BUFFER,v),r.bufferData(r.UNIFORM_BUFFER,T,M),r.bindBuffer(r.UNIFORM_BUFFER,null),r.bindBufferBase(r.UNIFORM_BUFFER,x,v),v}function d(){for(let S=0;S<a;S++)if(o.indexOf(S)===-1)return o.push(S),S;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(S){const x=i[S.id],v=S.uniforms,T=S.__cache;r.bindBuffer(r.UNIFORM_BUFFER,x);for(let M=0,E=v.length;M<E;M++){const P=Array.isArray(v[M])?v[M]:[v[M]];for(let y=0,b=P.length;y<b;y++){const D=P[y];if(h(D,M,y,T)===!0){const B=D.__offset,U=Array.isArray(D.value)?D.value:[D.value];let K=0;for(let F=0;F<U.length;F++){const C=U[F],J=g(C);typeof C=="number"||typeof C=="boolean"?(D.__data[0]=C,r.bufferSubData(r.UNIFORM_BUFFER,B+K,D.__data)):C.isMatrix3?(D.__data[0]=C.elements[0],D.__data[1]=C.elements[1],D.__data[2]=C.elements[2],D.__data[3]=0,D.__data[4]=C.elements[3],D.__data[5]=C.elements[4],D.__data[6]=C.elements[5],D.__data[7]=0,D.__data[8]=C.elements[6],D.__data[9]=C.elements[7],D.__data[10]=C.elements[8],D.__data[11]=0):(C.toArray(D.__data,K),K+=J.storage/Float32Array.BYTES_PER_ELEMENT)}r.bufferSubData(r.UNIFORM_BUFFER,B,D.__data)}}}r.bindBuffer(r.UNIFORM_BUFFER,null)}function h(S,x,v,T){const M=S.value,E=x+"_"+v;if(T[E]===void 0)return typeof M=="number"||typeof M=="boolean"?T[E]=M:T[E]=M.clone(),!0;{const P=T[E];if(typeof M=="number"||typeof M=="boolean"){if(P!==M)return T[E]=M,!0}else if(P.equals(M)===!1)return P.copy(M),!0}return!1}function _(S){const x=S.uniforms;let v=0;const T=16;for(let E=0,P=x.length;E<P;E++){const y=Array.isArray(x[E])?x[E]:[x[E]];for(let b=0,D=y.length;b<D;b++){const B=y[b],U=Array.isArray(B.value)?B.value:[B.value];for(let K=0,F=U.length;K<F;K++){const C=U[K],J=g(C),X=v%T,me=X%J.boundary,I=X+me;v+=me,I!==0&&T-I<J.storage&&(v+=T-I),B.__data=new Float32Array(J.storage/Float32Array.BYTES_PER_ELEMENT),B.__offset=v,v+=J.storage}}}const M=v%T;return M>0&&(v+=T-M),S.__size=v,S.__cache={},this}function g(S){const x={boundary:0,storage:0};return typeof S=="number"||typeof S=="boolean"?(x.boundary=4,x.storage=4):S.isVector2?(x.boundary=8,x.storage=8):S.isVector3||S.isColor?(x.boundary=16,x.storage=12):S.isVector4?(x.boundary=16,x.storage=16):S.isMatrix3?(x.boundary=48,x.storage=48):S.isMatrix4?(x.boundary=64,x.storage=64):S.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",S),x}function m(S){const x=S.target;x.removeEventListener("dispose",m);const v=o.indexOf(x.__bindingPointIndex);o.splice(v,1),r.deleteBuffer(i[x.id]),delete i[x.id],delete s[x.id]}function p(){for(const S in i)r.deleteBuffer(i[S]);o=[],i={},s={}}return{bind:l,update:c,dispose:p}}class gT{constructor(e={}){const{canvas:t=gx(),context:n=null,depth:i=!0,stencil:s=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:d=!1,reverseDepthBuffer:f=!1}=e;this.isWebGLRenderer=!0;let h;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");h=n.getContextAttributes().alpha}else h=o;const _=new Uint32Array(4),g=new Int32Array(4);let m=null,p=null;const S=[],x=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=hs,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const v=this;let T=!1;this._outputColorSpace=On;let M=0,E=0,P=null,y=-1,b=null;const D=new zt,B=new zt;let U=null;const K=new Je(0);let F=0,C=t.width,J=t.height,X=1,me=null,I=null;const _e=new zt(0,0,C,J),Y=new zt(0,0,C,J);let Re=!1;const Q=new Ph;let se=!1,Me=!1;const ve=new _t,De=new _t,Qe=new G,Pe=new zt,nt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let pt=!1;function Fe(){return P===null?X:1}let O=n;function Dt(R,V){return t.getContext(R,V)}try{const R={alpha:!0,depth:i,stencil:s,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${vh}`),t.addEventListener("webglcontextlost",ye,!1),t.addEventListener("webglcontextrestored",pe,!1),t.addEventListener("webglcontextcreationerror",ae,!1),O===null){const V="webgl2";if(O=Dt(V,R),O===null)throw Dt(V)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(R){throw console.error("THREE.WebGLRenderer: "+R.message),R}let Xe,q,Oe,dt,He,ke,mt,L,A,W,oe,ne,ie,Ee,ge,ze,Ae,j,Se,Ge,$e,de,it,N;function ue(){Xe=new TM(O),Xe.init(),de=new lT(O,Xe),q=new yM(O,Xe,e,de),Oe=new oT(O,Xe),q.reverseDepthBuffer&&f&&Oe.buffers.depth.setReversed(!0),dt=new RM(O),He=new YE,ke=new aT(O,Xe,Oe,He,q,de,dt),mt=new bM(v),L=new EM(v),A=new Nb(O),it=new _M(O,A),W=new AM(O,A,dt,it),oe=new LM(O,W,A,dt),Se=new PM(O,q,ke),ze=new xM(He),ne=new qE(v,mt,L,Xe,q,it,ze),ie=new pT(v,He),Ee=new $E,ge=new tT(Xe),j=new gM(v,mt,L,Oe,oe,h,l),Ae=new rT(v,oe,q),N=new mT(O,dt,q,Oe),Ge=new vM(O,Xe,dt),$e=new CM(O,Xe,dt),dt.programs=ne.programs,v.capabilities=q,v.extensions=Xe,v.properties=He,v.renderLists=Ee,v.shadowMap=Ae,v.state=Oe,v.info=dt}ue();const fe=new fT(v,O);this.xr=fe,this.getContext=function(){return O},this.getContextAttributes=function(){return O.getContextAttributes()},this.forceContextLoss=function(){const R=Xe.get("WEBGL_lose_context");R&&R.loseContext()},this.forceContextRestore=function(){const R=Xe.get("WEBGL_lose_context");R&&R.restoreContext()},this.getPixelRatio=function(){return X},this.setPixelRatio=function(R){R!==void 0&&(X=R,this.setSize(C,J,!1))},this.getSize=function(R){return R.set(C,J)},this.setSize=function(R,V,ee=!0){if(fe.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}C=R,J=V,t.width=Math.floor(R*X),t.height=Math.floor(V*X),ee===!0&&(t.style.width=R+"px",t.style.height=V+"px"),this.setViewport(0,0,R,V)},this.getDrawingBufferSize=function(R){return R.set(C*X,J*X).floor()},this.setDrawingBufferSize=function(R,V,ee){C=R,J=V,X=ee,t.width=Math.floor(R*ee),t.height=Math.floor(V*ee),this.setViewport(0,0,R,V)},this.getCurrentViewport=function(R){return R.copy(D)},this.getViewport=function(R){return R.copy(_e)},this.setViewport=function(R,V,ee,$){R.isVector4?_e.set(R.x,R.y,R.z,R.w):_e.set(R,V,ee,$),Oe.viewport(D.copy(_e).multiplyScalar(X).round())},this.getScissor=function(R){return R.copy(Y)},this.setScissor=function(R,V,ee,$){R.isVector4?Y.set(R.x,R.y,R.z,R.w):Y.set(R,V,ee,$),Oe.scissor(B.copy(Y).multiplyScalar(X).round())},this.getScissorTest=function(){return Re},this.setScissorTest=function(R){Oe.setScissorTest(Re=R)},this.setOpaqueSort=function(R){me=R},this.setTransparentSort=function(R){I=R},this.getClearColor=function(R){return R.copy(j.getClearColor())},this.setClearColor=function(){j.setClearColor(...arguments)},this.getClearAlpha=function(){return j.getClearAlpha()},this.setClearAlpha=function(){j.setClearAlpha(...arguments)},this.clear=function(R=!0,V=!0,ee=!0){let $=0;if(R){let z=!1;if(P!==null){const le=P.texture.format;z=le===Eh||le===Mh||le===wh}if(z){const le=P.texture.type,Ce=le===hr||le===ro||le===Sl||le===wl||le===xh||le===bh,We=j.getClearColor(),be=j.getClearAlpha(),et=We.r,ot=We.g,Ze=We.b;Ce?(_[0]=et,_[1]=ot,_[2]=Ze,_[3]=be,O.clearBufferuiv(O.COLOR,0,_)):(g[0]=et,g[1]=ot,g[2]=Ze,g[3]=be,O.clearBufferiv(O.COLOR,0,g))}else $|=O.COLOR_BUFFER_BIT}V&&($|=O.DEPTH_BUFFER_BIT),ee&&($|=O.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),O.clear($)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",ye,!1),t.removeEventListener("webglcontextrestored",pe,!1),t.removeEventListener("webglcontextcreationerror",ae,!1),j.dispose(),Ee.dispose(),ge.dispose(),He.dispose(),mt.dispose(),L.dispose(),oe.dispose(),it.dispose(),N.dispose(),ne.dispose(),fe.dispose(),fe.removeEventListener("sessionstart",xe),fe.removeEventListener("sessionend",Ke),Ye.stop()};function ye(R){R.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),T=!0}function pe(){console.log("THREE.WebGLRenderer: Context Restored."),T=!1;const R=dt.autoReset,V=Ae.enabled,ee=Ae.autoUpdate,$=Ae.needsUpdate,z=Ae.type;ue(),dt.autoReset=R,Ae.enabled=V,Ae.autoUpdate=ee,Ae.needsUpdate=$,Ae.type=z}function ae(R){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",R.statusMessage)}function Be(R){const V=R.target;V.removeEventListener("dispose",Be),rt(V)}function rt(R){Ut(R),He.remove(R)}function Ut(R){const V=He.get(R).programs;V!==void 0&&(V.forEach(function(ee){ne.releaseProgram(ee)}),R.isShaderMaterial&&ne.releaseShaderCache(R))}this.renderBufferDirect=function(R,V,ee,$,z,le){V===null&&(V=nt);const Ce=z.isMesh&&z.matrixWorld.determinant()<0,We=sn(R,V,ee,$,z);Oe.setMaterial($,Ce);let be=ee.index,et=1;if($.wireframe===!0){if(be=W.getWireframeAttribute(ee),be===void 0)return;et=2}const ot=ee.drawRange,Ze=ee.attributes.position;let ft=ot.start*et,Ft=(ot.start+ot.count)*et;le!==null&&(ft=Math.max(ft,le.start*et),Ft=Math.min(Ft,(le.start+le.count)*et)),be!==null?(ft=Math.max(ft,0),Ft=Math.min(Ft,be.count)):Ze!=null&&(ft=Math.max(ft,0),Ft=Math.min(Ft,Ze.count));const $t=Ft-ft;if($t<0||$t===1/0)return;it.setup(z,$,We,ee,be);let Rt,kt=Ge;if(be!==null&&(Rt=A.get(be),kt=$e,kt.setIndex(Rt)),z.isMesh)$.wireframe===!0?(Oe.setLineWidth($.wireframeLinewidth*Fe()),kt.setMode(O.LINES)):kt.setMode(O.TRIANGLES);else if(z.isLine){let st=$.linewidth;st===void 0&&(st=1),Oe.setLineWidth(st*Fe()),z.isLineSegments?kt.setMode(O.LINES):z.isLineLoop?kt.setMode(O.LINE_LOOP):kt.setMode(O.LINE_STRIP)}else z.isPoints?kt.setMode(O.POINTS):z.isSprite&&kt.setMode(O.TRIANGLES);if(z.isBatchedMesh)if(z._multiDrawInstances!==null)jo("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),kt.renderMultiDrawInstances(z._multiDrawStarts,z._multiDrawCounts,z._multiDrawCount,z._multiDrawInstances);else if(Xe.get("WEBGL_multi_draw"))kt.renderMultiDraw(z._multiDrawStarts,z._multiDrawCounts,z._multiDrawCount);else{const st=z._multiDrawStarts,Qt=z._multiDrawCounts,Ot=z._multiDrawCount,Dn=be?A.get(be).bytesPerElement:1,w=He.get($).currentProgram.getUniforms();for(let k=0;k<Ot;k++)w.setValue(O,"_gl_DrawID",k),kt.render(st[k]/Dn,Qt[k])}else if(z.isInstancedMesh)kt.renderInstances(ft,$t,z.count);else if(ee.isInstancedBufferGeometry){const st=ee._maxInstanceCount!==void 0?ee._maxInstanceCount:1/0,Qt=Math.min(ee.instanceCount,st);kt.renderInstances(ft,$t,Qt)}else kt.render(ft,$t)};function we(R,V,ee){R.transparent===!0&&R.side===Di&&R.forceSinglePass===!1?(R.side=si,R.needsUpdate=!0,Ht(R,V,ee),R.side=zr,R.needsUpdate=!0,Ht(R,V,ee),R.side=Di):Ht(R,V,ee)}this.compile=function(R,V,ee=null){ee===null&&(ee=R),p=ge.get(ee),p.init(V),x.push(p),ee.traverseVisible(function(z){z.isLight&&z.layers.test(V.layers)&&(p.pushLight(z),z.castShadow&&p.pushShadow(z))}),R!==ee&&R.traverseVisible(function(z){z.isLight&&z.layers.test(V.layers)&&(p.pushLight(z),z.castShadow&&p.pushShadow(z))}),p.setupLights();const $=new Set;return R.traverse(function(z){if(!(z.isMesh||z.isPoints||z.isLine||z.isSprite))return;const le=z.material;if(le)if(Array.isArray(le))for(let Ce=0;Ce<le.length;Ce++){const We=le[Ce];we(We,ee,z),$.add(We)}else we(le,ee,z),$.add(le)}),p=x.pop(),$},this.compileAsync=function(R,V,ee=null){const $=this.compile(R,V,ee);return new Promise(z=>{function le(){if($.forEach(function(Ce){He.get(Ce).currentProgram.isReady()&&$.delete(Ce)}),$.size===0){z(R);return}setTimeout(le,10)}Xe.get("KHR_parallel_shader_compile")!==null?le():setTimeout(le,10)})};let qe=null;function ht(R){qe&&qe(R)}function xe(){Ye.stop()}function Ke(){Ye.start()}const Ye=new z_;Ye.setAnimationLoop(ht),typeof self<"u"&&Ye.setContext(self),this.setAnimationLoop=function(R){qe=R,fe.setAnimationLoop(R),R===null?Ye.stop():Ye.start()},fe.addEventListener("sessionstart",xe),fe.addEventListener("sessionend",Ke),this.render=function(R,V){if(V!==void 0&&V.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(T===!0)return;if(R.matrixWorldAutoUpdate===!0&&R.updateMatrixWorld(),V.parent===null&&V.matrixWorldAutoUpdate===!0&&V.updateMatrixWorld(),fe.enabled===!0&&fe.isPresenting===!0&&(fe.cameraAutoUpdate===!0&&fe.updateCamera(V),V=fe.getCamera()),R.isScene===!0&&R.onBeforeRender(v,R,V,P),p=ge.get(R,x.length),p.init(V),x.push(p),De.multiplyMatrices(V.projectionMatrix,V.matrixWorldInverse),Q.setFromProjectionMatrix(De),Me=this.localClippingEnabled,se=ze.init(this.clippingPlanes,Me),m=Ee.get(R,S.length),m.init(),S.push(m),fe.enabled===!0&&fe.isPresenting===!0){const le=v.xr.getDepthSensingMesh();le!==null&&at(le,V,-1/0,v.sortObjects)}at(R,V,0,v.sortObjects),m.finish(),v.sortObjects===!0&&m.sort(me,I),pt=fe.enabled===!1||fe.isPresenting===!1||fe.hasDepthSensing()===!1,pt&&j.addToRenderList(m,R),this.info.render.frame++,se===!0&&ze.beginShadows();const ee=p.state.shadowsArray;Ae.render(ee,R,V),se===!0&&ze.endShadows(),this.info.autoReset===!0&&this.info.reset();const $=m.opaque,z=m.transmissive;if(p.setupLights(),V.isArrayCamera){const le=V.cameras;if(z.length>0)for(let Ce=0,We=le.length;Ce<We;Ce++){const be=le[Ce];ct($,z,R,be)}pt&&j.render(R);for(let Ce=0,We=le.length;Ce<We;Ce++){const be=le[Ce];qt(m,R,be,be.viewport)}}else z.length>0&&ct($,z,R,V),pt&&j.render(R),qt(m,R,V);P!==null&&E===0&&(ke.updateMultisampleRenderTarget(P),ke.updateRenderTargetMipmap(P)),R.isScene===!0&&R.onAfterRender(v,R,V),it.resetDefaultState(),y=-1,b=null,x.pop(),x.length>0?(p=x[x.length-1],se===!0&&ze.setGlobalState(v.clippingPlanes,p.state.camera)):p=null,S.pop(),S.length>0?m=S[S.length-1]:m=null};function at(R,V,ee,$){if(R.visible===!1)return;if(R.layers.test(V.layers)){if(R.isGroup)ee=R.renderOrder;else if(R.isLOD)R.autoUpdate===!0&&R.update(V);else if(R.isLight)p.pushLight(R),R.castShadow&&p.pushShadow(R);else if(R.isSprite){if(!R.frustumCulled||Q.intersectsSprite(R)){$&&Pe.setFromMatrixPosition(R.matrixWorld).applyMatrix4(De);const Ce=oe.update(R),We=R.material;We.visible&&m.push(R,Ce,We,ee,Pe.z,null)}}else if((R.isMesh||R.isLine||R.isPoints)&&(!R.frustumCulled||Q.intersectsObject(R))){const Ce=oe.update(R),We=R.material;if($&&(R.boundingSphere!==void 0?(R.boundingSphere===null&&R.computeBoundingSphere(),Pe.copy(R.boundingSphere.center)):(Ce.boundingSphere===null&&Ce.computeBoundingSphere(),Pe.copy(Ce.boundingSphere.center)),Pe.applyMatrix4(R.matrixWorld).applyMatrix4(De)),Array.isArray(We)){const be=Ce.groups;for(let et=0,ot=be.length;et<ot;et++){const Ze=be[et],ft=We[Ze.materialIndex];ft&&ft.visible&&m.push(R,Ce,ft,ee,Pe.z,Ze)}}else We.visible&&m.push(R,Ce,We,ee,Pe.z,null)}}const le=R.children;for(let Ce=0,We=le.length;Ce<We;Ce++)at(le[Ce],V,ee,$)}function qt(R,V,ee,$){const z=R.opaque,le=R.transmissive,Ce=R.transparent;p.setupLightsView(ee),se===!0&&ze.setGlobalState(v.clippingPlanes,ee),$&&Oe.viewport(D.copy($)),z.length>0&&Bt(z,V,ee),le.length>0&&Bt(le,V,ee),Ce.length>0&&Bt(Ce,V,ee),Oe.buffers.depth.setTest(!0),Oe.buffers.depth.setMask(!0),Oe.buffers.color.setMask(!0),Oe.setPolygonOffset(!1)}function ct(R,V,ee,$){if((ee.isScene===!0?ee.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[$.id]===void 0&&(p.state.transmissionRenderTarget[$.id]=new so(1,1,{generateMipmaps:!0,type:Xe.has("EXT_color_buffer_half_float")||Xe.has("EXT_color_buffer_float")?Hl:hr,minFilter:Lr,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Nt.workingColorSpace}));const le=p.state.transmissionRenderTarget[$.id],Ce=$.viewport||D;le.setSize(Ce.z*v.transmissionResolutionScale,Ce.w*v.transmissionResolutionScale);const We=v.getRenderTarget(),be=v.getActiveCubeFace(),et=v.getActiveMipmapLevel();v.setRenderTarget(le),v.getClearColor(K),F=v.getClearAlpha(),F<1&&v.setClearColor(16777215,.5),v.clear(),pt&&j.render(ee);const ot=v.toneMapping;v.toneMapping=hs;const Ze=$.viewport;if($.viewport!==void 0&&($.viewport=void 0),p.setupLightsView($),se===!0&&ze.setGlobalState(v.clippingPlanes,$),Bt(R,ee,$),ke.updateMultisampleRenderTarget(le),ke.updateRenderTargetMipmap(le),Xe.has("WEBGL_multisampled_render_to_texture")===!1){let ft=!1;for(let Ft=0,$t=V.length;Ft<$t;Ft++){const Rt=V[Ft],kt=Rt.object,st=Rt.geometry,Qt=Rt.material,Ot=Rt.group;if(Qt.side===Di&&kt.layers.test($.layers)){const Dn=Qt.side;Qt.side=si,Qt.needsUpdate=!0,It(kt,ee,$,st,Qt,Ot),Qt.side=Dn,Qt.needsUpdate=!0,ft=!0}}ft===!0&&(ke.updateMultisampleRenderTarget(le),ke.updateRenderTargetMipmap(le))}v.setRenderTarget(We,be,et),v.setClearColor(K,F),Ze!==void 0&&($.viewport=Ze),v.toneMapping=ot}function Bt(R,V,ee){const $=V.isScene===!0?V.overrideMaterial:null;for(let z=0,le=R.length;z<le;z++){const Ce=R[z],We=Ce.object,be=Ce.geometry,et=Ce.group;let ot=Ce.material;ot.allowOverride===!0&&$!==null&&(ot=$),We.layers.test(ee.layers)&&It(We,V,ee,be,ot,et)}}function It(R,V,ee,$,z,le){R.onBeforeRender(v,V,ee,$,z,le),R.modelViewMatrix.multiplyMatrices(ee.matrixWorldInverse,R.matrixWorld),R.normalMatrix.getNormalMatrix(R.modelViewMatrix),z.onBeforeRender(v,V,ee,$,R,le),z.transparent===!0&&z.side===Di&&z.forceSinglePass===!1?(z.side=si,z.needsUpdate=!0,v.renderBufferDirect(ee,V,$,z,R,le),z.side=zr,z.needsUpdate=!0,v.renderBufferDirect(ee,V,$,z,R,le),z.side=Di):v.renderBufferDirect(ee,V,$,z,R,le),R.onAfterRender(v,V,ee,$,z,le)}function Ht(R,V,ee){V.isScene!==!0&&(V=nt);const $=He.get(R),z=p.state.lights,le=p.state.shadowsArray,Ce=z.state.version,We=ne.getParameters(R,z.state,le,V,ee),be=ne.getProgramCacheKey(We);let et=$.programs;$.environment=R.isMeshStandardMaterial?V.environment:null,$.fog=V.fog,$.envMap=(R.isMeshStandardMaterial?L:mt).get(R.envMap||$.environment),$.envMapRotation=$.environment!==null&&R.envMap===null?V.environmentRotation:R.envMapRotation,et===void 0&&(R.addEventListener("dispose",Be),et=new Map,$.programs=et);let ot=et.get(be);if(ot!==void 0){if($.currentProgram===ot&&$.lightsStateVersion===Ce)return vt(R,We),ot}else We.uniforms=ne.getUniforms(R),R.onBeforeCompile(We,v),ot=ne.acquireProgram(We,be),et.set(be,ot),$.uniforms=We.uniforms;const Ze=$.uniforms;return(!R.isShaderMaterial&&!R.isRawShaderMaterial||R.clipping===!0)&&(Ze.clippingPlanes=ze.uniform),vt(R,We),$.needsLights=Te(R),$.lightsStateVersion=Ce,$.needsLights&&(Ze.ambientLightColor.value=z.state.ambient,Ze.lightProbe.value=z.state.probe,Ze.directionalLights.value=z.state.directional,Ze.directionalLightShadows.value=z.state.directionalShadow,Ze.spotLights.value=z.state.spot,Ze.spotLightShadows.value=z.state.spotShadow,Ze.rectAreaLights.value=z.state.rectArea,Ze.ltc_1.value=z.state.rectAreaLTC1,Ze.ltc_2.value=z.state.rectAreaLTC2,Ze.pointLights.value=z.state.point,Ze.pointLightShadows.value=z.state.pointShadow,Ze.hemisphereLights.value=z.state.hemi,Ze.directionalShadowMap.value=z.state.directionalShadowMap,Ze.directionalShadowMatrix.value=z.state.directionalShadowMatrix,Ze.spotShadowMap.value=z.state.spotShadowMap,Ze.spotLightMatrix.value=z.state.spotLightMatrix,Ze.spotLightMap.value=z.state.spotLightMap,Ze.pointShadowMap.value=z.state.pointShadowMap,Ze.pointShadowMatrix.value=z.state.pointShadowMatrix),$.currentProgram=ot,$.uniformsList=null,ot}function Et(R){if(R.uniformsList===null){const V=R.currentProgram.getUniforms();R.uniformsList=Wc.seqWithValue(V.seq,R.uniforms)}return R.uniformsList}function vt(R,V){const ee=He.get(R);ee.outputColorSpace=V.outputColorSpace,ee.batching=V.batching,ee.batchingColor=V.batchingColor,ee.instancing=V.instancing,ee.instancingColor=V.instancingColor,ee.instancingMorph=V.instancingMorph,ee.skinning=V.skinning,ee.morphTargets=V.morphTargets,ee.morphNormals=V.morphNormals,ee.morphColors=V.morphColors,ee.morphTargetsCount=V.morphTargetsCount,ee.numClippingPlanes=V.numClippingPlanes,ee.numIntersection=V.numClipIntersection,ee.vertexAlphas=V.vertexAlphas,ee.vertexTangents=V.vertexTangents,ee.toneMapping=V.toneMapping}function sn(R,V,ee,$,z){V.isScene!==!0&&(V=nt),ke.resetTextureUnits();const le=V.fog,Ce=$.isMeshStandardMaterial?V.environment:null,We=P===null?v.outputColorSpace:P.isXRRenderTarget===!0?P.texture.colorSpace:ni,be=($.isMeshStandardMaterial?L:mt).get($.envMap||Ce),et=$.vertexColors===!0&&!!ee.attributes.color&&ee.attributes.color.itemSize===4,ot=!!ee.attributes.tangent&&(!!$.normalMap||$.anisotropy>0),Ze=!!ee.morphAttributes.position,ft=!!ee.morphAttributes.normal,Ft=!!ee.morphAttributes.color;let $t=hs;$.toneMapped&&(P===null||P.isXRRenderTarget===!0)&&($t=v.toneMapping);const Rt=ee.morphAttributes.position||ee.morphAttributes.normal||ee.morphAttributes.color,kt=Rt!==void 0?Rt.length:0,st=He.get($),Qt=p.state.lights;if(se===!0&&(Me===!0||R!==b)){const Ue=R===b&&$.id===y;ze.setState($,R,Ue)}let Ot=!1;$.version===st.__version?(st.needsLights&&st.lightsStateVersion!==Qt.state.version||st.outputColorSpace!==We||z.isBatchedMesh&&st.batching===!1||!z.isBatchedMesh&&st.batching===!0||z.isBatchedMesh&&st.batchingColor===!0&&z.colorTexture===null||z.isBatchedMesh&&st.batchingColor===!1&&z.colorTexture!==null||z.isInstancedMesh&&st.instancing===!1||!z.isInstancedMesh&&st.instancing===!0||z.isSkinnedMesh&&st.skinning===!1||!z.isSkinnedMesh&&st.skinning===!0||z.isInstancedMesh&&st.instancingColor===!0&&z.instanceColor===null||z.isInstancedMesh&&st.instancingColor===!1&&z.instanceColor!==null||z.isInstancedMesh&&st.instancingMorph===!0&&z.morphTexture===null||z.isInstancedMesh&&st.instancingMorph===!1&&z.morphTexture!==null||st.envMap!==be||$.fog===!0&&st.fog!==le||st.numClippingPlanes!==void 0&&(st.numClippingPlanes!==ze.numPlanes||st.numIntersection!==ze.numIntersection)||st.vertexAlphas!==et||st.vertexTangents!==ot||st.morphTargets!==Ze||st.morphNormals!==ft||st.morphColors!==Ft||st.toneMapping!==$t||st.morphTargetsCount!==kt)&&(Ot=!0):(Ot=!0,st.__version=$.version);let Dn=st.currentProgram;Ot===!0&&(Dn=Ht($,V,z));let w=!1,k=!1,H=!1;const Z=Dn.getUniforms(),ce=st.uniforms;if(Oe.useProgram(Dn.program)&&(w=!0,k=!0,H=!0),$.id!==y&&(y=$.id,k=!0),w||b!==R){Oe.buffers.depth.getReversed()?(ve.copy(R.projectionMatrix),vx(ve),yx(ve),Z.setValue(O,"projectionMatrix",ve)):Z.setValue(O,"projectionMatrix",R.projectionMatrix),Z.setValue(O,"viewMatrix",R.matrixWorldInverse);const Le=Z.map.cameraPosition;Le!==void 0&&Le.setValue(O,Qe.setFromMatrixPosition(R.matrixWorld)),q.logarithmicDepthBuffer&&Z.setValue(O,"logDepthBufFC",2/(Math.log(R.far+1)/Math.LN2)),($.isMeshPhongMaterial||$.isMeshToonMaterial||$.isMeshLambertMaterial||$.isMeshBasicMaterial||$.isMeshStandardMaterial||$.isShaderMaterial)&&Z.setValue(O,"isOrthographic",R.isOrthographicCamera===!0),b!==R&&(b=R,k=!0,H=!0)}if(z.isSkinnedMesh){Z.setOptional(O,z,"bindMatrix"),Z.setOptional(O,z,"bindMatrixInverse");const Ue=z.skeleton;Ue&&(Ue.boneTexture===null&&Ue.computeBoneTexture(),Z.setValue(O,"boneTexture",Ue.boneTexture,ke))}z.isBatchedMesh&&(Z.setOptional(O,z,"batchingTexture"),Z.setValue(O,"batchingTexture",z._matricesTexture,ke),Z.setOptional(O,z,"batchingIdTexture"),Z.setValue(O,"batchingIdTexture",z._indirectTexture,ke),Z.setOptional(O,z,"batchingColorTexture"),z._colorsTexture!==null&&Z.setValue(O,"batchingColorTexture",z._colorsTexture,ke));const re=ee.morphAttributes;if((re.position!==void 0||re.normal!==void 0||re.color!==void 0)&&Se.update(z,ee,Dn),(k||st.receiveShadow!==z.receiveShadow)&&(st.receiveShadow=z.receiveShadow,Z.setValue(O,"receiveShadow",z.receiveShadow)),$.isMeshGouraudMaterial&&$.envMap!==null&&(ce.envMap.value=be,ce.flipEnvMap.value=be.isCubeTexture&&be.isRenderTargetTexture===!1?-1:1),$.isMeshStandardMaterial&&$.envMap===null&&V.environment!==null&&(ce.envMapIntensity.value=V.environmentIntensity),k&&(Z.setValue(O,"toneMappingExposure",v.toneMappingExposure),st.needsLights&&Jt(ce,H),le&&$.fog===!0&&ie.refreshFogUniforms(ce,le),ie.refreshMaterialUniforms(ce,$,X,J,p.state.transmissionRenderTarget[R.id]),Wc.upload(O,Et(st),ce,ke)),$.isShaderMaterial&&$.uniformsNeedUpdate===!0&&(Wc.upload(O,Et(st),ce,ke),$.uniformsNeedUpdate=!1),$.isSpriteMaterial&&Z.setValue(O,"center",z.center),Z.setValue(O,"modelViewMatrix",z.modelViewMatrix),Z.setValue(O,"normalMatrix",z.normalMatrix),Z.setValue(O,"modelMatrix",z.matrixWorld),$.isShaderMaterial||$.isRawShaderMaterial){const Ue=$.uniformsGroups;for(let Le=0,bt=Ue.length;Le<bt;Le++){const lt=Ue[Le];N.update(lt,Dn),N.bind(lt,Dn)}}return Dn}function Jt(R,V){R.ambientLightColor.needsUpdate=V,R.lightProbe.needsUpdate=V,R.directionalLights.needsUpdate=V,R.directionalLightShadows.needsUpdate=V,R.pointLights.needsUpdate=V,R.pointLightShadows.needsUpdate=V,R.spotLights.needsUpdate=V,R.spotLightShadows.needsUpdate=V,R.rectAreaLights.needsUpdate=V,R.hemisphereLights.needsUpdate=V}function Te(R){return R.isMeshLambertMaterial||R.isMeshToonMaterial||R.isMeshPhongMaterial||R.isMeshStandardMaterial||R.isShadowMaterial||R.isShaderMaterial&&R.lights===!0}this.getActiveCubeFace=function(){return M},this.getActiveMipmapLevel=function(){return E},this.getRenderTarget=function(){return P},this.setRenderTargetTextures=function(R,V,ee){const $=He.get(R);$.__autoAllocateDepthBuffer=R.resolveDepthBuffer===!1,$.__autoAllocateDepthBuffer===!1&&($.__useRenderToTexture=!1),He.get(R.texture).__webglTexture=V,He.get(R.depthTexture).__webglTexture=$.__autoAllocateDepthBuffer?void 0:ee,$.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(R,V){const ee=He.get(R);ee.__webglFramebuffer=V,ee.__useDefaultFramebuffer=V===void 0};const jt=O.createFramebuffer();this.setRenderTarget=function(R,V=0,ee=0){P=R,M=V,E=ee;let $=!0,z=null,le=!1,Ce=!1;if(R){const be=He.get(R);if(be.__useDefaultFramebuffer!==void 0)Oe.bindFramebuffer(O.FRAMEBUFFER,null),$=!1;else if(be.__webglFramebuffer===void 0)ke.setupRenderTarget(R);else if(be.__hasExternalTextures)ke.rebindTextures(R,He.get(R.texture).__webglTexture,He.get(R.depthTexture).__webglTexture);else if(R.depthBuffer){const Ze=R.depthTexture;if(be.__boundDepthTexture!==Ze){if(Ze!==null&&He.has(Ze)&&(R.width!==Ze.image.width||R.height!==Ze.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");ke.setupDepthRenderbuffer(R)}}const et=R.texture;(et.isData3DTexture||et.isDataArrayTexture||et.isCompressedArrayTexture)&&(Ce=!0);const ot=He.get(R).__webglFramebuffer;R.isWebGLCubeRenderTarget?(Array.isArray(ot[V])?z=ot[V][ee]:z=ot[V],le=!0):R.samples>0&&ke.useMultisampledRTT(R)===!1?z=He.get(R).__webglMultisampledFramebuffer:Array.isArray(ot)?z=ot[ee]:z=ot,D.copy(R.viewport),B.copy(R.scissor),U=R.scissorTest}else D.copy(_e).multiplyScalar(X).floor(),B.copy(Y).multiplyScalar(X).floor(),U=Re;if(ee!==0&&(z=jt),Oe.bindFramebuffer(O.FRAMEBUFFER,z)&&$&&Oe.drawBuffers(R,z),Oe.viewport(D),Oe.scissor(B),Oe.setScissorTest(U),le){const be=He.get(R.texture);O.framebufferTexture2D(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_CUBE_MAP_POSITIVE_X+V,be.__webglTexture,ee)}else if(Ce){const be=He.get(R.texture),et=V;O.framebufferTextureLayer(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0,be.__webglTexture,ee,et)}else if(R!==null&&ee!==0){const be=He.get(R.texture);O.framebufferTexture2D(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_2D,be.__webglTexture,ee)}y=-1},this.readRenderTargetPixels=function(R,V,ee,$,z,le,Ce,We=0){if(!(R&&R.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let be=He.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget&&Ce!==void 0&&(be=be[Ce]),be){Oe.bindFramebuffer(O.FRAMEBUFFER,be);try{const et=R.textures[We],ot=et.format,Ze=et.type;if(!q.textureFormatReadable(ot)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!q.textureTypeReadable(Ze)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}V>=0&&V<=R.width-$&&ee>=0&&ee<=R.height-z&&(R.textures.length>1&&O.readBuffer(O.COLOR_ATTACHMENT0+We),O.readPixels(V,ee,$,z,de.convert(ot),de.convert(Ze),le))}finally{const et=P!==null?He.get(P).__webglFramebuffer:null;Oe.bindFramebuffer(O.FRAMEBUFFER,et)}}},this.readRenderTargetPixelsAsync=async function(R,V,ee,$,z,le,Ce,We=0){if(!(R&&R.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let be=He.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget&&Ce!==void 0&&(be=be[Ce]),be)if(V>=0&&V<=R.width-$&&ee>=0&&ee<=R.height-z){Oe.bindFramebuffer(O.FRAMEBUFFER,be);const et=R.textures[We],ot=et.format,Ze=et.type;if(!q.textureFormatReadable(ot))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!q.textureTypeReadable(Ze))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const ft=O.createBuffer();O.bindBuffer(O.PIXEL_PACK_BUFFER,ft),O.bufferData(O.PIXEL_PACK_BUFFER,le.byteLength,O.STREAM_READ),R.textures.length>1&&O.readBuffer(O.COLOR_ATTACHMENT0+We),O.readPixels(V,ee,$,z,de.convert(ot),de.convert(Ze),0);const Ft=P!==null?He.get(P).__webglFramebuffer:null;Oe.bindFramebuffer(O.FRAMEBUFFER,Ft);const $t=O.fenceSync(O.SYNC_GPU_COMMANDS_COMPLETE,0);return O.flush(),await _x(O,$t,4),O.bindBuffer(O.PIXEL_PACK_BUFFER,ft),O.getBufferSubData(O.PIXEL_PACK_BUFFER,0,le),O.deleteBuffer(ft),O.deleteSync($t),le}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(R,V=null,ee=0){const $=Math.pow(2,-ee),z=Math.floor(R.image.width*$),le=Math.floor(R.image.height*$),Ce=V!==null?V.x:0,We=V!==null?V.y:0;ke.setTexture2D(R,0),O.copyTexSubImage2D(O.TEXTURE_2D,ee,0,0,Ce,We,z,le),Oe.unbindTexture()};const un=O.createFramebuffer(),fn=O.createFramebuffer();this.copyTextureToTexture=function(R,V,ee=null,$=null,z=0,le=null){le===null&&(z!==0?(jo("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),le=z,z=0):le=0);let Ce,We,be,et,ot,Ze,ft,Ft,$t;const Rt=R.isCompressedTexture?R.mipmaps[le]:R.image;if(ee!==null)Ce=ee.max.x-ee.min.x,We=ee.max.y-ee.min.y,be=ee.isBox3?ee.max.z-ee.min.z:1,et=ee.min.x,ot=ee.min.y,Ze=ee.isBox3?ee.min.z:0;else{const re=Math.pow(2,-z);Ce=Math.floor(Rt.width*re),We=Math.floor(Rt.height*re),R.isDataArrayTexture?be=Rt.depth:R.isData3DTexture?be=Math.floor(Rt.depth*re):be=1,et=0,ot=0,Ze=0}$!==null?(ft=$.x,Ft=$.y,$t=$.z):(ft=0,Ft=0,$t=0);const kt=de.convert(V.format),st=de.convert(V.type);let Qt;V.isData3DTexture?(ke.setTexture3D(V,0),Qt=O.TEXTURE_3D):V.isDataArrayTexture||V.isCompressedArrayTexture?(ke.setTexture2DArray(V,0),Qt=O.TEXTURE_2D_ARRAY):(ke.setTexture2D(V,0),Qt=O.TEXTURE_2D),O.pixelStorei(O.UNPACK_FLIP_Y_WEBGL,V.flipY),O.pixelStorei(O.UNPACK_PREMULTIPLY_ALPHA_WEBGL,V.premultiplyAlpha),O.pixelStorei(O.UNPACK_ALIGNMENT,V.unpackAlignment);const Ot=O.getParameter(O.UNPACK_ROW_LENGTH),Dn=O.getParameter(O.UNPACK_IMAGE_HEIGHT),w=O.getParameter(O.UNPACK_SKIP_PIXELS),k=O.getParameter(O.UNPACK_SKIP_ROWS),H=O.getParameter(O.UNPACK_SKIP_IMAGES);O.pixelStorei(O.UNPACK_ROW_LENGTH,Rt.width),O.pixelStorei(O.UNPACK_IMAGE_HEIGHT,Rt.height),O.pixelStorei(O.UNPACK_SKIP_PIXELS,et),O.pixelStorei(O.UNPACK_SKIP_ROWS,ot),O.pixelStorei(O.UNPACK_SKIP_IMAGES,Ze);const Z=R.isDataArrayTexture||R.isData3DTexture,ce=V.isDataArrayTexture||V.isData3DTexture;if(R.isDepthTexture){const re=He.get(R),Ue=He.get(V),Le=He.get(re.__renderTarget),bt=He.get(Ue.__renderTarget);Oe.bindFramebuffer(O.READ_FRAMEBUFFER,Le.__webglFramebuffer),Oe.bindFramebuffer(O.DRAW_FRAMEBUFFER,bt.__webglFramebuffer);for(let lt=0;lt<be;lt++)Z&&(O.framebufferTextureLayer(O.READ_FRAMEBUFFER,O.COLOR_ATTACHMENT0,He.get(R).__webglTexture,z,Ze+lt),O.framebufferTextureLayer(O.DRAW_FRAMEBUFFER,O.COLOR_ATTACHMENT0,He.get(V).__webglTexture,le,$t+lt)),O.blitFramebuffer(et,ot,Ce,We,ft,Ft,Ce,We,O.DEPTH_BUFFER_BIT,O.NEAREST);Oe.bindFramebuffer(O.READ_FRAMEBUFFER,null),Oe.bindFramebuffer(O.DRAW_FRAMEBUFFER,null)}else if(z!==0||R.isRenderTargetTexture||He.has(R)){const re=He.get(R),Ue=He.get(V);Oe.bindFramebuffer(O.READ_FRAMEBUFFER,un),Oe.bindFramebuffer(O.DRAW_FRAMEBUFFER,fn);for(let Le=0;Le<be;Le++)Z?O.framebufferTextureLayer(O.READ_FRAMEBUFFER,O.COLOR_ATTACHMENT0,re.__webglTexture,z,Ze+Le):O.framebufferTexture2D(O.READ_FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_2D,re.__webglTexture,z),ce?O.framebufferTextureLayer(O.DRAW_FRAMEBUFFER,O.COLOR_ATTACHMENT0,Ue.__webglTexture,le,$t+Le):O.framebufferTexture2D(O.DRAW_FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_2D,Ue.__webglTexture,le),z!==0?O.blitFramebuffer(et,ot,Ce,We,ft,Ft,Ce,We,O.COLOR_BUFFER_BIT,O.NEAREST):ce?O.copyTexSubImage3D(Qt,le,ft,Ft,$t+Le,et,ot,Ce,We):O.copyTexSubImage2D(Qt,le,ft,Ft,et,ot,Ce,We);Oe.bindFramebuffer(O.READ_FRAMEBUFFER,null),Oe.bindFramebuffer(O.DRAW_FRAMEBUFFER,null)}else ce?R.isDataTexture||R.isData3DTexture?O.texSubImage3D(Qt,le,ft,Ft,$t,Ce,We,be,kt,st,Rt.data):V.isCompressedArrayTexture?O.compressedTexSubImage3D(Qt,le,ft,Ft,$t,Ce,We,be,kt,Rt.data):O.texSubImage3D(Qt,le,ft,Ft,$t,Ce,We,be,kt,st,Rt):R.isDataTexture?O.texSubImage2D(O.TEXTURE_2D,le,ft,Ft,Ce,We,kt,st,Rt.data):R.isCompressedTexture?O.compressedTexSubImage2D(O.TEXTURE_2D,le,ft,Ft,Rt.width,Rt.height,kt,Rt.data):O.texSubImage2D(O.TEXTURE_2D,le,ft,Ft,Ce,We,kt,st,Rt);O.pixelStorei(O.UNPACK_ROW_LENGTH,Ot),O.pixelStorei(O.UNPACK_IMAGE_HEIGHT,Dn),O.pixelStorei(O.UNPACK_SKIP_PIXELS,w),O.pixelStorei(O.UNPACK_SKIP_ROWS,k),O.pixelStorei(O.UNPACK_SKIP_IMAGES,H),le===0&&V.generateMipmaps&&O.generateMipmap(Qt),Oe.unbindTexture()},this.copyTextureToTexture3D=function(R,V,ee=null,$=null,z=0){return jo('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(R,V,ee,$,z)},this.initRenderTarget=function(R){He.get(R).__webglFramebuffer===void 0&&ke.setupRenderTarget(R)},this.initTexture=function(R){R.isCubeTexture?ke.setTextureCube(R,0):R.isData3DTexture?ke.setTexture3D(R,0):R.isDataArrayTexture||R.isCompressedArrayTexture?ke.setTexture2DArray(R,0):ke.setTexture2D(R,0),Oe.unbindTexture()},this.resetState=function(){M=0,E=0,P=null,Oe.reset(),it.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Dr}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=Nt._getDrawingBufferColorSpace(e),t.unpackColorSpace=Nt._getUnpackColorSpace()}}function _T(r){if(!(typeof window>"u")){var e=document.createElement("style");return e.setAttribute("type","text/css"),e.innerHTML=r,document.head.appendChild(e),r}}function Go(r,e){var t=r.__state.conversionName.toString(),n=Math.round(r.r),i=Math.round(r.g),s=Math.round(r.b),o=r.a,a=Math.round(r.h),l=r.s.toFixed(1),c=r.v.toFixed(1);if(e||t==="THREE_CHAR_HEX"||t==="SIX_CHAR_HEX"){for(var u=r.hex.toString(16);u.length<6;)u="0"+u;return"#"+u}else{if(t==="CSS_RGB")return"rgb("+n+","+i+","+s+")";if(t==="CSS_RGBA")return"rgba("+n+","+i+","+s+","+o+")";if(t==="HEX")return"0x"+r.hex.toString(16);if(t==="RGB_ARRAY")return"["+n+","+i+","+s+"]";if(t==="RGBA_ARRAY")return"["+n+","+i+","+s+","+o+"]";if(t==="RGB_OBJ")return"{r:"+n+",g:"+i+",b:"+s+"}";if(t==="RGBA_OBJ")return"{r:"+n+",g:"+i+",b:"+s+",a:"+o+"}";if(t==="HSV_OBJ")return"{h:"+a+",s:"+l+",v:"+c+"}";if(t==="HSVA_OBJ")return"{h:"+a+",s:"+l+",v:"+c+",a:"+o+"}"}return"unknown format"}var zm=Array.prototype.forEach,Ua=Array.prototype.slice,he={BREAK:{},extend:function(e){return this.each(Ua.call(arguments,1),function(t){var n=this.isObject(t)?Object.keys(t):[];n.forEach((function(i){this.isUndefined(t[i])||(e[i]=t[i])}).bind(this))},this),e},defaults:function(e){return this.each(Ua.call(arguments,1),function(t){var n=this.isObject(t)?Object.keys(t):[];n.forEach((function(i){this.isUndefined(e[i])&&(e[i]=t[i])}).bind(this))},this),e},compose:function(){var e=Ua.call(arguments);return function(){for(var t=Ua.call(arguments),n=e.length-1;n>=0;n--)t=[e[n].apply(this,t)];return t[0]}},each:function(e,t,n){if(e){if(zm&&e.forEach&&e.forEach===zm)e.forEach(t,n);else if(e.length===e.length+0){var i=void 0,s=void 0;for(i=0,s=e.length;i<s;i++)if(i in e&&t.call(n,e[i],i)===this.BREAK)return}else for(var o in e)if(t.call(n,e[o],o)===this.BREAK)return}},defer:function(e){setTimeout(e,0)},debounce:function(e,t,n){var i=void 0;return function(){var s=this,o=arguments;function a(){i=null,n||e.apply(s,o)}var l=n||!i;clearTimeout(i),i=setTimeout(a,t),l&&e.apply(s,o)}},toArray:function(e){return e.toArray?e.toArray():Ua.call(e)},isUndefined:function(e){return e===void 0},isNull:function(e){return e===null},isNaN:function(r){function e(t){return r.apply(this,arguments)}return e.toString=function(){return r.toString()},e}(function(r){return isNaN(r)}),isArray:Array.isArray||function(r){return r.constructor===Array},isObject:function(e){return e===Object(e)},isNumber:function(e){return e===e+0},isString:function(e){return e===e+""},isBoolean:function(e){return e===!1||e===!0},isFunction:function(e){return e instanceof Function}},vT=[{litmus:he.isString,conversions:{THREE_CHAR_HEX:{read:function(e){var t=e.match(/^#([A-F0-9])([A-F0-9])([A-F0-9])$/i);return t===null?!1:{space:"HEX",hex:parseInt("0x"+t[1].toString()+t[1].toString()+t[2].toString()+t[2].toString()+t[3].toString()+t[3].toString(),0)}},write:Go},SIX_CHAR_HEX:{read:function(e){var t=e.match(/^#([A-F0-9]{6})$/i);return t===null?!1:{space:"HEX",hex:parseInt("0x"+t[1].toString(),0)}},write:Go},CSS_RGB:{read:function(e){var t=e.match(/^rgb\(\s*(\S+)\s*,\s*(\S+)\s*,\s*(\S+)\s*\)/);return t===null?!1:{space:"RGB",r:parseFloat(t[1]),g:parseFloat(t[2]),b:parseFloat(t[3])}},write:Go},CSS_RGBA:{read:function(e){var t=e.match(/^rgba\(\s*(\S+)\s*,\s*(\S+)\s*,\s*(\S+)\s*,\s*(\S+)\s*\)/);return t===null?!1:{space:"RGB",r:parseFloat(t[1]),g:parseFloat(t[2]),b:parseFloat(t[3]),a:parseFloat(t[4])}},write:Go}}},{litmus:he.isNumber,conversions:{HEX:{read:function(e){return{space:"HEX",hex:e,conversionName:"HEX"}},write:function(e){return e.hex}}}},{litmus:he.isArray,conversions:{RGB_ARRAY:{read:function(e){return e.length!==3?!1:{space:"RGB",r:e[0],g:e[1],b:e[2]}},write:function(e){return[e.r,e.g,e.b]}},RGBA_ARRAY:{read:function(e){return e.length!==4?!1:{space:"RGB",r:e[0],g:e[1],b:e[2],a:e[3]}},write:function(e){return[e.r,e.g,e.b,e.a]}}}},{litmus:he.isObject,conversions:{RGBA_OBJ:{read:function(e){return he.isNumber(e.r)&&he.isNumber(e.g)&&he.isNumber(e.b)&&he.isNumber(e.a)?{space:"RGB",r:e.r,g:e.g,b:e.b,a:e.a}:!1},write:function(e){return{r:e.r,g:e.g,b:e.b,a:e.a}}},RGB_OBJ:{read:function(e){return he.isNumber(e.r)&&he.isNumber(e.g)&&he.isNumber(e.b)?{space:"RGB",r:e.r,g:e.g,b:e.b}:!1},write:function(e){return{r:e.r,g:e.g,b:e.b}}},HSVA_OBJ:{read:function(e){return he.isNumber(e.h)&&he.isNumber(e.s)&&he.isNumber(e.v)&&he.isNumber(e.a)?{space:"HSV",h:e.h,s:e.s,v:e.v,a:e.a}:!1},write:function(e){return{h:e.h,s:e.s,v:e.v,a:e.a}}},HSV_OBJ:{read:function(e){return he.isNumber(e.h)&&he.isNumber(e.s)&&he.isNumber(e.v)?{space:"HSV",h:e.h,s:e.s,v:e.v}:!1},write:function(e){return{h:e.h,s:e.s,v:e.v}}}}}],Fa=void 0,xc=void 0,Pf=function(){xc=!1;var e=arguments.length>1?he.toArray(arguments):arguments[0];return he.each(vT,function(t){if(t.litmus(e))return he.each(t.conversions,function(n,i){if(Fa=n.read(e),xc===!1&&Fa!==!1)return xc=Fa,Fa.conversionName=i,Fa.conversion=n,he.BREAK}),he.BREAK}),xc},Hm=void 0,lu={hsv_to_rgb:function(e,t,n){var i=Math.floor(e/60)%6,s=e/60-Math.floor(e/60),o=n*(1-t),a=n*(1-s*t),l=n*(1-(1-s)*t),c=[[n,l,o],[a,n,o],[o,n,l],[o,a,n],[l,o,n],[n,o,a]][i];return{r:c[0]*255,g:c[1]*255,b:c[2]*255}},rgb_to_hsv:function(e,t,n){var i=Math.min(e,t,n),s=Math.max(e,t,n),o=s-i,a=void 0,l=void 0;if(s!==0)l=o/s;else return{h:NaN,s:0,v:0};return e===s?a=(t-n)/o:t===s?a=2+(n-e)/o:a=4+(e-t)/o,a/=6,a<0&&(a+=1),{h:a*360,s:l,v:s/255}},rgb_to_hex:function(e,t,n){var i=this.hex_with_component(0,2,e);return i=this.hex_with_component(i,1,t),i=this.hex_with_component(i,0,n),i},component_from_hex:function(e,t){return e>>t*8&255},hex_with_component:function(e,t,n){return n<<(Hm=t*8)|e&~(255<<Hm)}},yT=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(r){return typeof r}:function(r){return r&&typeof Symbol=="function"&&r.constructor===Symbol&&r!==Symbol.prototype?"symbol":typeof r},Ji=function(r,e){if(!(r instanceof e))throw new TypeError("Cannot call a class as a function")},Qi=function(){function r(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(e,t,n){return t&&r(e.prototype,t),n&&r(e,n),e}}(),vs=function r(e,t,n){e===null&&(e=Function.prototype);var i=Object.getOwnPropertyDescriptor(e,t);if(i===void 0){var s=Object.getPrototypeOf(e);return s===null?void 0:r(s,t,n)}else{if("value"in i)return i.value;var o=i.get;return o===void 0?void 0:o.call(n)}},ws=function(r,e){if(typeof e!="function"&&e!==null)throw new TypeError("Super expression must either be null or a function, not "+typeof e);r.prototype=Object.create(e&&e.prototype,{constructor:{value:r,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(r,e):r.__proto__=e)},Ms=function(r,e){if(!r)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e&&(typeof e=="object"||typeof e=="function")?e:r},Pn=function(){function r(){if(Ji(this,r),this.__state=Pf.apply(this,arguments),this.__state===!1)throw new Error("Failed to interpret color arguments");this.__state.a=this.__state.a||1}return Qi(r,[{key:"toString",value:function(){return Go(this)}},{key:"toHexString",value:function(){return Go(this,!0)}},{key:"toOriginal",value:function(){return this.__state.conversion.write(this)}}]),r}();function Fh(r,e,t){Object.defineProperty(r,e,{get:function(){return this.__state.space==="RGB"?this.__state[e]:(Pn.recalculateRGB(this,e,t),this.__state[e])},set:function(i){this.__state.space!=="RGB"&&(Pn.recalculateRGB(this,e,t),this.__state.space="RGB"),this.__state[e]=i}})}function kh(r,e){Object.defineProperty(r,e,{get:function(){return this.__state.space==="HSV"?this.__state[e]:(Pn.recalculateHSV(this),this.__state[e])},set:function(n){this.__state.space!=="HSV"&&(Pn.recalculateHSV(this),this.__state.space="HSV"),this.__state[e]=n}})}Pn.recalculateRGB=function(r,e,t){if(r.__state.space==="HEX")r.__state[e]=lu.component_from_hex(r.__state.hex,t);else if(r.__state.space==="HSV")he.extend(r.__state,lu.hsv_to_rgb(r.__state.h,r.__state.s,r.__state.v));else throw new Error("Corrupted color state")};Pn.recalculateHSV=function(r){var e=lu.rgb_to_hsv(r.r,r.g,r.b);he.extend(r.__state,{s:e.s,v:e.v}),he.isNaN(e.h)?he.isUndefined(r.__state.h)&&(r.__state.h=0):r.__state.h=e.h};Pn.COMPONENTS=["r","g","b","h","s","v","hex","a"];Fh(Pn.prototype,"r",2);Fh(Pn.prototype,"g",1);Fh(Pn.prototype,"b",0);kh(Pn.prototype,"h");kh(Pn.prototype,"s");kh(Pn.prototype,"v");Object.defineProperty(Pn.prototype,"a",{get:function(){return this.__state.a},set:function(e){this.__state.a=e}});Object.defineProperty(Pn.prototype,"hex",{get:function(){return this.__state.space!=="HEX"&&(this.__state.hex=lu.rgb_to_hex(this.r,this.g,this.b),this.__state.space="HEX"),this.__state.hex},set:function(e){this.__state.space="HEX",this.__state.hex=e}});var fo=function(){function r(e,t){Ji(this,r),this.initialValue=e[t],this.domElement=document.createElement("div"),this.object=e,this.property=t,this.__onChange=void 0,this.__onFinishChange=void 0}return Qi(r,[{key:"onChange",value:function(t){return this.__onChange=t,this}},{key:"onFinishChange",value:function(t){return this.__onFinishChange=t,this}},{key:"setValue",value:function(t){return this.object[this.property]=t,this.__onChange&&this.__onChange.call(this,t),this.updateDisplay(),this}},{key:"getValue",value:function(){return this.object[this.property]}},{key:"updateDisplay",value:function(){return this}},{key:"isModified",value:function(){return this.initialValue!==this.getValue()}}]),r}(),xT={HTMLEvents:["change"],MouseEvents:["click","mousemove","mousedown","mouseup","mouseover"],KeyboardEvents:["keydown"]},X_={};he.each(xT,function(r,e){he.each(r,function(t){X_[t]=e})});var bT=/(\d+(\.\d+)?)px/;function tr(r){if(r==="0"||he.isUndefined(r))return 0;var e=r.match(bT);return he.isNull(e)?0:parseFloat(e[1])}var te={makeSelectable:function(e,t){e===void 0||e.style===void 0||(e.onselectstart=t?function(){return!1}:function(){},e.style.MozUserSelect=t?"auto":"none",e.style.KhtmlUserSelect=t?"auto":"none",e.unselectable=t?"on":"off")},makeFullscreen:function(e,t,n){var i=n,s=t;he.isUndefined(s)&&(s=!0),he.isUndefined(i)&&(i=!0),e.style.position="absolute",s&&(e.style.left=0,e.style.right=0),i&&(e.style.top=0,e.style.bottom=0)},fakeEvent:function(e,t,n,i){var s=n||{},o=X_[t];if(!o)throw new Error("Event type "+t+" not supported.");var a=document.createEvent(o);switch(o){case"MouseEvents":{var l=s.x||s.clientX||0,c=s.y||s.clientY||0;a.initMouseEvent(t,s.bubbles||!1,s.cancelable||!0,window,s.clickCount||1,0,0,l,c,!1,!1,!1,!1,0,null);break}case"KeyboardEvents":{var u=a.initKeyboardEvent||a.initKeyEvent;he.defaults(s,{cancelable:!0,ctrlKey:!1,altKey:!1,shiftKey:!1,metaKey:!1,keyCode:void 0,charCode:void 0}),u(t,s.bubbles||!1,s.cancelable,window,s.ctrlKey,s.altKey,s.shiftKey,s.metaKey,s.keyCode,s.charCode);break}default:{a.initEvent(t,s.bubbles||!1,s.cancelable||!0);break}}he.defaults(a,i),e.dispatchEvent(a)},bind:function(e,t,n,i){var s=i||!1;return e.addEventListener?e.addEventListener(t,n,s):e.attachEvent&&e.attachEvent("on"+t,n),te},unbind:function(e,t,n,i){var s=i||!1;return e.removeEventListener?e.removeEventListener(t,n,s):e.detachEvent&&e.detachEvent("on"+t,n),te},addClass:function(e,t){if(e.className===void 0)e.className=t;else if(e.className!==t){var n=e.className.split(/ +/);n.indexOf(t)===-1&&(n.push(t),e.className=n.join(" ").replace(/^\s+/,"").replace(/\s+$/,""))}return te},removeClass:function(e,t){if(t)if(e.className===t)e.removeAttribute("class");else{var n=e.className.split(/ +/),i=n.indexOf(t);i!==-1&&(n.splice(i,1),e.className=n.join(" "))}else e.className=void 0;return te},hasClass:function(e,t){return new RegExp("(?:^|\\s+)"+t+"(?:\\s+|$)").test(e.className)||!1},getWidth:function(e){var t=getComputedStyle(e);return tr(t["border-left-width"])+tr(t["border-right-width"])+tr(t["padding-left"])+tr(t["padding-right"])+tr(t.width)},getHeight:function(e){var t=getComputedStyle(e);return tr(t["border-top-width"])+tr(t["border-bottom-width"])+tr(t["padding-top"])+tr(t["padding-bottom"])+tr(t.height)},getOffset:function(e){var t=e,n={left:0,top:0};if(t.offsetParent)do n.left+=t.offsetLeft,n.top+=t.offsetTop,t=t.offsetParent;while(t);return n},isActive:function(e){return e===document.activeElement&&(e.type||e.href)}},q_=function(r){ws(e,r);function e(t,n){Ji(this,e);var i=Ms(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n)),s=i;i.__prev=i.getValue(),i.__checkbox=document.createElement("input"),i.__checkbox.setAttribute("type","checkbox");function o(){s.setValue(!s.__prev)}return te.bind(i.__checkbox,"change",o,!1),i.domElement.appendChild(i.__checkbox),i.updateDisplay(),i}return Qi(e,[{key:"setValue",value:function(n){var i=vs(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"setValue",this).call(this,n);return this.__onFinishChange&&this.__onFinishChange.call(this,this.getValue()),this.__prev=this.getValue(),i}},{key:"updateDisplay",value:function(){return this.getValue()===!0?(this.__checkbox.setAttribute("checked","checked"),this.__checkbox.checked=!0,this.__prev=!0):(this.__checkbox.checked=!1,this.__prev=!1),vs(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"updateDisplay",this).call(this)}}]),e}(fo),ST=function(r){ws(e,r);function e(t,n,i){Ji(this,e);var s=Ms(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n)),o=i,a=s;if(s.__select=document.createElement("select"),he.isArray(o)){var l={};he.each(o,function(c){l[c]=c}),o=l}return he.each(o,function(c,u){var d=document.createElement("option");d.innerHTML=u,d.setAttribute("value",c),a.__select.appendChild(d)}),s.updateDisplay(),te.bind(s.__select,"change",function(){var c=this.options[this.selectedIndex].value;a.setValue(c)}),s.domElement.appendChild(s.__select),s}return Qi(e,[{key:"setValue",value:function(n){var i=vs(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"setValue",this).call(this,n);return this.__onFinishChange&&this.__onFinishChange.call(this,this.getValue()),i}},{key:"updateDisplay",value:function(){return te.isActive(this.__select)?this:(this.__select.value=this.getValue(),vs(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"updateDisplay",this).call(this))}}]),e}(fo),wT=function(r){ws(e,r);function e(t,n){Ji(this,e);var i=Ms(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n)),s=i;function o(){s.setValue(s.__input.value)}function a(){s.__onFinishChange&&s.__onFinishChange.call(s,s.getValue())}return i.__input=document.createElement("input"),i.__input.setAttribute("type","text"),te.bind(i.__input,"keyup",o),te.bind(i.__input,"change",o),te.bind(i.__input,"blur",a),te.bind(i.__input,"keydown",function(l){l.keyCode===13&&this.blur()}),i.updateDisplay(),i.domElement.appendChild(i.__input),i}return Qi(e,[{key:"updateDisplay",value:function(){return te.isActive(this.__input)||(this.__input.value=this.getValue()),vs(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"updateDisplay",this).call(this)}}]),e}(fo);function Vm(r){var e=r.toString();return e.indexOf(".")>-1?e.length-e.indexOf(".")-1:0}var Y_=function(r){ws(e,r);function e(t,n,i){Ji(this,e);var s=Ms(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n)),o=i||{};return s.__min=o.min,s.__max=o.max,s.__step=o.step,he.isUndefined(s.__step)?s.initialValue===0?s.__impliedStep=1:s.__impliedStep=Math.pow(10,Math.floor(Math.log(Math.abs(s.initialValue))/Math.LN10))/10:s.__impliedStep=s.__step,s.__precision=Vm(s.__impliedStep),s}return Qi(e,[{key:"setValue",value:function(n){var i=n;return this.__min!==void 0&&i<this.__min?i=this.__min:this.__max!==void 0&&i>this.__max&&(i=this.__max),this.__step!==void 0&&i%this.__step!==0&&(i=Math.round(i/this.__step)*this.__step),vs(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"setValue",this).call(this,i)}},{key:"min",value:function(n){return this.__min=n,this}},{key:"max",value:function(n){return this.__max=n,this}},{key:"step",value:function(n){return this.__step=n,this.__impliedStep=n,this.__precision=Vm(n),this}}]),e}(fo);function MT(r,e){var t=Math.pow(10,e);return Math.round(r*t)/t}var cu=function(r){ws(e,r);function e(t,n,i){Ji(this,e);var s=Ms(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n,i));s.__truncationSuspended=!1;var o=s,a=void 0;function l(){var _=parseFloat(o.__input.value);he.isNaN(_)||o.setValue(_)}function c(){o.__onFinishChange&&o.__onFinishChange.call(o,o.getValue())}function u(){c()}function d(_){var g=a-_.clientY;o.setValue(o.getValue()+g*o.__impliedStep),a=_.clientY}function f(){te.unbind(window,"mousemove",d),te.unbind(window,"mouseup",f),c()}function h(_){te.bind(window,"mousemove",d),te.bind(window,"mouseup",f),a=_.clientY}return s.__input=document.createElement("input"),s.__input.setAttribute("type","text"),te.bind(s.__input,"change",l),te.bind(s.__input,"blur",u),te.bind(s.__input,"mousedown",h),te.bind(s.__input,"keydown",function(_){_.keyCode===13&&(o.__truncationSuspended=!0,this.blur(),o.__truncationSuspended=!1,c())}),s.updateDisplay(),s.domElement.appendChild(s.__input),s}return Qi(e,[{key:"updateDisplay",value:function(){return this.__input.value=this.__truncationSuspended?this.getValue():MT(this.getValue(),this.__precision),vs(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"updateDisplay",this).call(this)}}]),e}(Y_);function Gm(r,e,t,n,i){return n+(i-n)*((r-e)/(t-e))}var Lf=function(r){ws(e,r);function e(t,n,i,s,o){Ji(this,e);var a=Ms(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n,{min:i,max:s,step:o})),l=a;a.__background=document.createElement("div"),a.__foreground=document.createElement("div"),te.bind(a.__background,"mousedown",c),te.bind(a.__background,"touchstart",f),te.addClass(a.__background,"slider"),te.addClass(a.__foreground,"slider-fg");function c(g){document.activeElement.blur(),te.bind(window,"mousemove",u),te.bind(window,"mouseup",d),u(g)}function u(g){g.preventDefault();var m=l.__background.getBoundingClientRect();return l.setValue(Gm(g.clientX,m.left,m.right,l.__min,l.__max)),!1}function d(){te.unbind(window,"mousemove",u),te.unbind(window,"mouseup",d),l.__onFinishChange&&l.__onFinishChange.call(l,l.getValue())}function f(g){g.touches.length===1&&(te.bind(window,"touchmove",h),te.bind(window,"touchend",_),h(g))}function h(g){var m=g.touches[0].clientX,p=l.__background.getBoundingClientRect();l.setValue(Gm(m,p.left,p.right,l.__min,l.__max))}function _(){te.unbind(window,"touchmove",h),te.unbind(window,"touchend",_),l.__onFinishChange&&l.__onFinishChange.call(l,l.getValue())}return a.updateDisplay(),a.__background.appendChild(a.__foreground),a.domElement.appendChild(a.__background),a}return Qi(e,[{key:"updateDisplay",value:function(){var n=(this.getValue()-this.__min)/(this.__max-this.__min);return this.__foreground.style.width=n*100+"%",vs(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"updateDisplay",this).call(this)}}]),e}(Y_),j_=function(r){ws(e,r);function e(t,n,i){Ji(this,e);var s=Ms(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n)),o=s;return s.__button=document.createElement("div"),s.__button.innerHTML=i===void 0?"Fire":i,te.bind(s.__button,"click",function(a){return a.preventDefault(),o.fire(),!1}),te.addClass(s.__button,"button"),s.domElement.appendChild(s.__button),s}return Qi(e,[{key:"fire",value:function(){this.__onChange&&this.__onChange.call(this),this.getValue().call(this.object),this.__onFinishChange&&this.__onFinishChange.call(this,this.getValue())}}]),e}(fo),Df=function(r){ws(e,r);function e(t,n){Ji(this,e);var i=Ms(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n));i.__color=new Pn(i.getValue()),i.__temp=new Pn(0);var s=i;i.domElement=document.createElement("div"),te.makeSelectable(i.domElement,!1),i.__selector=document.createElement("div"),i.__selector.className="selector",i.__saturation_field=document.createElement("div"),i.__saturation_field.className="saturation-field",i.__field_knob=document.createElement("div"),i.__field_knob.className="field-knob",i.__field_knob_border="2px solid ",i.__hue_knob=document.createElement("div"),i.__hue_knob.className="hue-knob",i.__hue_field=document.createElement("div"),i.__hue_field.className="hue-field",i.__input=document.createElement("input"),i.__input.type="text",i.__input_textShadow="0 1px 1px ",te.bind(i.__input,"keydown",function(g){g.keyCode===13&&d.call(this)}),te.bind(i.__input,"blur",d),te.bind(i.__selector,"mousedown",function(){te.addClass(this,"drag").bind(window,"mouseup",function(){te.removeClass(s.__selector,"drag")})}),te.bind(i.__selector,"touchstart",function(){te.addClass(this,"drag").bind(window,"touchend",function(){te.removeClass(s.__selector,"drag")})});var o=document.createElement("div");he.extend(i.__selector.style,{width:"122px",height:"102px",padding:"3px",backgroundColor:"#222",boxShadow:"0px 1px 3px rgba(0,0,0,0.3)"}),he.extend(i.__field_knob.style,{position:"absolute",width:"12px",height:"12px",border:i.__field_knob_border+(i.__color.v<.5?"#fff":"#000"),boxShadow:"0px 1px 3px rgba(0,0,0,0.5)",borderRadius:"12px",zIndex:1}),he.extend(i.__hue_knob.style,{position:"absolute",width:"15px",height:"2px",borderRight:"4px solid #fff",zIndex:1}),he.extend(i.__saturation_field.style,{width:"100px",height:"100px",border:"1px solid #555",marginRight:"3px",display:"inline-block",cursor:"pointer"}),he.extend(o.style,{width:"100%",height:"100%",background:"none"}),Wm(o,"top","rgba(0,0,0,0)","#000"),he.extend(i.__hue_field.style,{width:"15px",height:"100px",border:"1px solid #555",cursor:"ns-resize",position:"absolute",top:"3px",right:"3px"}),TT(i.__hue_field),he.extend(i.__input.style,{outline:"none",textAlign:"center",color:"#fff",border:0,fontWeight:"bold",textShadow:i.__input_textShadow+"rgba(0,0,0,0.7)"}),te.bind(i.__saturation_field,"mousedown",a),te.bind(i.__saturation_field,"touchstart",a),te.bind(i.__field_knob,"mousedown",a),te.bind(i.__field_knob,"touchstart",a),te.bind(i.__hue_field,"mousedown",l),te.bind(i.__hue_field,"touchstart",l);function a(g){h(g),te.bind(window,"mousemove",h),te.bind(window,"touchmove",h),te.bind(window,"mouseup",c),te.bind(window,"touchend",c)}function l(g){_(g),te.bind(window,"mousemove",_),te.bind(window,"touchmove",_),te.bind(window,"mouseup",u),te.bind(window,"touchend",u)}function c(){te.unbind(window,"mousemove",h),te.unbind(window,"touchmove",h),te.unbind(window,"mouseup",c),te.unbind(window,"touchend",c),f()}function u(){te.unbind(window,"mousemove",_),te.unbind(window,"touchmove",_),te.unbind(window,"mouseup",u),te.unbind(window,"touchend",u),f()}function d(){var g=Pf(this.value);g!==!1?(s.__color.__state=g,s.setValue(s.__color.toOriginal())):this.value=s.__color.toString()}function f(){s.__onFinishChange&&s.__onFinishChange.call(s,s.__color.toOriginal())}i.__saturation_field.appendChild(o),i.__selector.appendChild(i.__field_knob),i.__selector.appendChild(i.__saturation_field),i.__selector.appendChild(i.__hue_field),i.__hue_field.appendChild(i.__hue_knob),i.domElement.appendChild(i.__input),i.domElement.appendChild(i.__selector),i.updateDisplay();function h(g){g.type.indexOf("touch")===-1&&g.preventDefault();var m=s.__saturation_field.getBoundingClientRect(),p=g.touches&&g.touches[0]||g,S=p.clientX,x=p.clientY,v=(S-m.left)/(m.right-m.left),T=1-(x-m.top)/(m.bottom-m.top);return T>1?T=1:T<0&&(T=0),v>1?v=1:v<0&&(v=0),s.__color.v=T,s.__color.s=v,s.setValue(s.__color.toOriginal()),!1}function _(g){g.type.indexOf("touch")===-1&&g.preventDefault();var m=s.__hue_field.getBoundingClientRect(),p=g.touches&&g.touches[0]||g,S=p.clientY,x=1-(S-m.top)/(m.bottom-m.top);return x>1?x=1:x<0&&(x=0),s.__color.h=x*360,s.setValue(s.__color.toOriginal()),!1}return i}return Qi(e,[{key:"updateDisplay",value:function(){var n=Pf(this.getValue());if(n!==!1){var i=!1;he.each(Pn.COMPONENTS,function(a){if(!he.isUndefined(n[a])&&!he.isUndefined(this.__color.__state[a])&&n[a]!==this.__color.__state[a])return i=!0,{}},this),i&&he.extend(this.__color.__state,n)}he.extend(this.__temp.__state,this.__color.__state),this.__temp.a=1;var s=this.__color.v<.5||this.__color.s>.5?255:0,o=255-s;he.extend(this.__field_knob.style,{marginLeft:100*this.__color.s-7+"px",marginTop:100*(1-this.__color.v)-7+"px",backgroundColor:this.__temp.toHexString(),border:this.__field_knob_border+"rgb("+s+","+s+","+s+")"}),this.__hue_knob.style.marginTop=(1-this.__color.h/360)*100+"px",this.__temp.s=1,this.__temp.v=1,Wm(this.__saturation_field,"left","#fff",this.__temp.toHexString()),this.__input.value=this.__color.toString(),he.extend(this.__input.style,{backgroundColor:this.__color.toHexString(),color:"rgb("+s+","+s+","+s+")",textShadow:this.__input_textShadow+"rgba("+o+","+o+","+o+",.7)"})}}]),e}(fo),ET=["-moz-","-o-","-webkit-","-ms-",""];function Wm(r,e,t,n){r.style.background="",he.each(ET,function(i){r.style.cssText+="background: "+i+"linear-gradient("+e+", "+t+" 0%, "+n+" 100%); "})}function TT(r){r.style.background="",r.style.cssText+="background: -moz-linear-gradient(top,  #ff0000 0%, #ff00ff 17%, #0000ff 34%, #00ffff 50%, #00ff00 67%, #ffff00 84%, #ff0000 100%);",r.style.cssText+="background: -webkit-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);",r.style.cssText+="background: -o-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);",r.style.cssText+="background: -ms-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);",r.style.cssText+="background: linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);"}var AT={load:function(e,t){var n=t||document,i=n.createElement("link");i.type="text/css",i.rel="stylesheet",i.href=e,n.getElementsByTagName("head")[0].appendChild(i)},inject:function(e,t){var n=t||document,i=document.createElement("style");i.type="text/css",i.innerHTML=e;var s=n.getElementsByTagName("head")[0];try{s.appendChild(i)}catch{}}},CT=`<div id="dg-save" class="dg dialogue">

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

</div>`,RT=function(e,t){var n=e[t];return he.isArray(arguments[2])||he.isObject(arguments[2])?new ST(e,t,arguments[2]):he.isNumber(n)?he.isNumber(arguments[2])&&he.isNumber(arguments[3])?he.isNumber(arguments[4])?new Lf(e,t,arguments[2],arguments[3],arguments[4]):new Lf(e,t,arguments[2],arguments[3]):he.isNumber(arguments[4])?new cu(e,t,{min:arguments[2],max:arguments[3],step:arguments[4]}):new cu(e,t,{min:arguments[2],max:arguments[3]}):he.isString(n)?new wT(e,t):he.isFunction(n)?new j_(e,t,""):he.isBoolean(n)?new q_(e,t):null};function PT(r){setTimeout(r,1e3/60)}var LT=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||PT,DT=function(){function r(){Ji(this,r),this.backgroundElement=document.createElement("div"),he.extend(this.backgroundElement.style,{backgroundColor:"rgba(0,0,0,0.8)",top:0,left:0,display:"none",zIndex:"1000",opacity:0,WebkitTransition:"opacity 0.2s linear",transition:"opacity 0.2s linear"}),te.makeFullscreen(this.backgroundElement),this.backgroundElement.style.position="fixed",this.domElement=document.createElement("div"),he.extend(this.domElement.style,{position:"fixed",display:"none",zIndex:"1001",opacity:0,WebkitTransition:"-webkit-transform 0.2s ease-out, opacity 0.2s linear",transition:"transform 0.2s ease-out, opacity 0.2s linear"}),document.body.appendChild(this.backgroundElement),document.body.appendChild(this.domElement);var e=this;te.bind(this.backgroundElement,"click",function(){e.hide()})}return Qi(r,[{key:"show",value:function(){var t=this;this.backgroundElement.style.display="block",this.domElement.style.display="block",this.domElement.style.opacity=0,this.domElement.style.webkitTransform="scale(1.1)",this.layout(),he.defer(function(){t.backgroundElement.style.opacity=1,t.domElement.style.opacity=1,t.domElement.style.webkitTransform="scale(1)"})}},{key:"hide",value:function(){var t=this,n=function i(){t.domElement.style.display="none",t.backgroundElement.style.display="none",te.unbind(t.domElement,"webkitTransitionEnd",i),te.unbind(t.domElement,"transitionend",i),te.unbind(t.domElement,"oTransitionEnd",i)};te.bind(this.domElement,"webkitTransitionEnd",n),te.bind(this.domElement,"transitionend",n),te.bind(this.domElement,"oTransitionEnd",n),this.backgroundElement.style.opacity=0,this.domElement.style.opacity=0,this.domElement.style.webkitTransform="scale(1.1)"}},{key:"layout",value:function(){this.domElement.style.left=window.innerWidth/2-te.getWidth(this.domElement)/2+"px",this.domElement.style.top=window.innerHeight/2-te.getHeight(this.domElement)/2+"px"}}]),r}(),IT=_T(`.dg ul{list-style:none;margin:0;padding:0;width:100%;clear:both}.dg.ac{position:fixed;top:0;left:0;right:0;height:0;z-index:0}.dg:not(.ac) .main{overflow:hidden}.dg.main{-webkit-transition:opacity .1s linear;-o-transition:opacity .1s linear;-moz-transition:opacity .1s linear;transition:opacity .1s linear}.dg.main.taller-than-window{overflow-y:auto}.dg.main.taller-than-window .close-button{opacity:1;margin-top:-1px;border-top:1px solid #2c2c2c}.dg.main ul.closed .close-button{opacity:1 !important}.dg.main:hover .close-button,.dg.main .close-button.drag{opacity:1}.dg.main .close-button{-webkit-transition:opacity .1s linear;-o-transition:opacity .1s linear;-moz-transition:opacity .1s linear;transition:opacity .1s linear;border:0;line-height:19px;height:20px;cursor:pointer;text-align:center;background-color:#000}.dg.main .close-button.close-top{position:relative}.dg.main .close-button.close-bottom{position:absolute}.dg.main .close-button:hover{background-color:#111}.dg.a{float:right;margin-right:15px;overflow-y:visible}.dg.a.has-save>ul.close-top{margin-top:0}.dg.a.has-save>ul.close-bottom{margin-top:27px}.dg.a.has-save>ul.closed{margin-top:0}.dg.a .save-row{top:0;z-index:1002}.dg.a .save-row.close-top{position:relative}.dg.a .save-row.close-bottom{position:fixed}.dg li{-webkit-transition:height .1s ease-out;-o-transition:height .1s ease-out;-moz-transition:height .1s ease-out;transition:height .1s ease-out;-webkit-transition:overflow .1s linear;-o-transition:overflow .1s linear;-moz-transition:overflow .1s linear;transition:overflow .1s linear}.dg li:not(.folder){cursor:auto;height:27px;line-height:27px;padding:0 4px 0 5px}.dg li.folder{padding:0;border-left:4px solid rgba(0,0,0,0)}.dg li.title{cursor:pointer;margin-left:-4px}.dg .closed li:not(.title),.dg .closed ul li,.dg .closed ul li>*{height:0;overflow:hidden;border:0}.dg .cr{clear:both;padding-left:3px;height:27px;overflow:hidden}.dg .property-name{cursor:default;float:left;clear:left;width:40%;overflow:hidden;text-overflow:ellipsis}.dg .cr.function .property-name{width:100%}.dg .c{float:left;width:60%;position:relative}.dg .c input[type=text]{border:0;margin-top:4px;padding:3px;width:100%;float:right}.dg .has-slider input[type=text]{width:30%;margin-left:0}.dg .slider{float:left;width:66%;margin-left:-5px;margin-right:0;height:19px;margin-top:4px}.dg .slider-fg{height:100%}.dg .c input[type=checkbox]{margin-top:7px}.dg .c select{margin-top:5px}.dg .cr.function,.dg .cr.function .property-name,.dg .cr.function *,.dg .cr.boolean,.dg .cr.boolean *{cursor:pointer}.dg .cr.color{overflow:visible}.dg .selector{display:none;position:absolute;margin-left:-9px;margin-top:23px;z-index:10}.dg .c:hover .selector,.dg .selector.drag{display:block}.dg li.save-row{padding:0}.dg li.save-row .button{display:inline-block;padding:0px 6px}.dg.dialogue{background-color:#222;width:460px;padding:15px;font-size:13px;line-height:15px}#dg-new-constructor{padding:10px;color:#222;font-family:Monaco, monospace;font-size:10px;border:0;resize:none;box-shadow:inset 1px 1px 1px #888;word-wrap:break-word;margin:12px 0;display:block;width:440px;overflow-y:scroll;height:100px;position:relative}#dg-local-explain{display:none;font-size:11px;line-height:17px;border-radius:3px;background-color:#333;padding:8px;margin-top:10px}#dg-local-explain code{font-size:10px}#dat-gui-save-locally{display:none}.dg{color:#eee;font:11px 'Lucida Grande', sans-serif;text-shadow:0 -1px 0 #111}.dg.main::-webkit-scrollbar{width:5px;background:#1a1a1a}.dg.main::-webkit-scrollbar-corner{height:0;display:none}.dg.main::-webkit-scrollbar-thumb{border-radius:5px;background:#676767}.dg li:not(.folder){background:#1a1a1a;border-bottom:1px solid #2c2c2c}.dg li.save-row{line-height:25px;background:#dad5cb;border:0}.dg li.save-row select{margin-left:5px;width:108px}.dg li.save-row .button{margin-left:5px;margin-top:1px;border-radius:2px;font-size:9px;line-height:7px;padding:4px 4px 5px 4px;background:#c5bdad;color:#fff;text-shadow:0 1px 0 #b0a58f;box-shadow:0 -1px 0 #b0a58f;cursor:pointer}.dg li.save-row .button.gears{background:#c5bdad url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAANCAYAAAB/9ZQ7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAQJJREFUeNpiYKAU/P//PwGIC/ApCABiBSAW+I8AClAcgKxQ4T9hoMAEUrxx2QSGN6+egDX+/vWT4e7N82AMYoPAx/evwWoYoSYbACX2s7KxCxzcsezDh3evFoDEBYTEEqycggWAzA9AuUSQQgeYPa9fPv6/YWm/Acx5IPb7ty/fw+QZblw67vDs8R0YHyQhgObx+yAJkBqmG5dPPDh1aPOGR/eugW0G4vlIoTIfyFcA+QekhhHJhPdQxbiAIguMBTQZrPD7108M6roWYDFQiIAAv6Aow/1bFwXgis+f2LUAynwoIaNcz8XNx3Dl7MEJUDGQpx9gtQ8YCueB+D26OECAAQDadt7e46D42QAAAABJRU5ErkJggg==) 2px 1px no-repeat;height:7px;width:8px}.dg li.save-row .button:hover{background-color:#bab19e;box-shadow:0 -1px 0 #b0a58f}.dg li.folder{border-bottom:0}.dg li.title{padding-left:16px;background:#000 url(data:image/gif;base64,R0lGODlhBQAFAJEAAP////Pz8////////yH5BAEAAAIALAAAAAAFAAUAAAIIlI+hKgFxoCgAOw==) 6px 10px no-repeat;cursor:pointer;border-bottom:1px solid rgba(255,255,255,0.2)}.dg .closed li.title{background-image:url(data:image/gif;base64,R0lGODlhBQAFAJEAAP////Pz8////////yH5BAEAAAIALAAAAAAFAAUAAAIIlGIWqMCbWAEAOw==)}.dg .cr.boolean{border-left:3px solid #806787}.dg .cr.color{border-left:3px solid}.dg .cr.function{border-left:3px solid #e61d5f}.dg .cr.number{border-left:3px solid #2FA1D6}.dg .cr.number input[type=text]{color:#2FA1D6}.dg .cr.string{border-left:3px solid #1ed36f}.dg .cr.string input[type=text]{color:#1ed36f}.dg .cr.function:hover,.dg .cr.boolean:hover{background:#111}.dg .c input[type=text]{background:#303030;outline:none}.dg .c input[type=text]:hover{background:#3c3c3c}.dg .c input[type=text]:focus{background:#494949;color:#fff}.dg .c .slider{background:#303030;cursor:ew-resize}.dg .c .slider-fg{background:#2FA1D6;max-width:100%}.dg .c .slider:hover{background:#3c3c3c}.dg .c .slider:hover .slider-fg{background:#44abda}
`);AT.inject(IT);var Xm="dg",qm=72,Ym=20,Rl="Default",Xa=function(){try{return!!window.localStorage}catch{return!1}}(),sl=void 0,jm=!0,ko=void 0,_d=!1,$_=[],nn=function r(e){var t=this,n=e||{};this.domElement=document.createElement("div"),this.__ul=document.createElement("ul"),this.domElement.appendChild(this.__ul),te.addClass(this.domElement,Xm),this.__folders={},this.__controllers=[],this.__rememberedObjects=[],this.__rememberedObjectIndecesToControllers=[],this.__listening=[],n=he.defaults(n,{closeOnTop:!1,autoPlace:!0,width:r.DEFAULT_WIDTH}),n=he.defaults(n,{resizable:n.autoPlace,hideable:n.autoPlace}),he.isUndefined(n.load)?n.load={preset:Rl}:n.preset&&(n.load.preset=n.preset),he.isUndefined(n.parent)&&n.hideable&&$_.push(this),n.resizable=he.isUndefined(n.parent)&&n.resizable,n.autoPlace&&he.isUndefined(n.scrollable)&&(n.scrollable=!0);var i=Xa&&localStorage.getItem(Bo(this,"isLocal"))==="true",s=void 0,o=void 0;if(Object.defineProperties(this,{parent:{get:function(){return n.parent}},scrollable:{get:function(){return n.scrollable}},autoPlace:{get:function(){return n.autoPlace}},closeOnTop:{get:function(){return n.closeOnTop}},preset:{get:function(){return t.parent?t.getRoot().preset:n.load.preset},set:function(f){t.parent?t.getRoot().preset=f:n.load.preset=f,FT(this),t.revert()}},width:{get:function(){return n.width},set:function(f){n.width=f,Nf(t,f)}},name:{get:function(){return n.name},set:function(f){n.name=f,o&&(o.innerHTML=n.name)}},closed:{get:function(){return n.closed},set:function(f){n.closed=f,n.closed?te.addClass(t.__ul,r.CLASS_CLOSED):te.removeClass(t.__ul,r.CLASS_CLOSED),this.onResize(),t.__closeButton&&(t.__closeButton.innerHTML=f?r.TEXT_OPEN:r.TEXT_CLOSED)}},load:{get:function(){return n.load}},useLocalStorage:{get:function(){return i},set:function(f){Xa&&(i=f,f?te.bind(window,"unload",s):te.unbind(window,"unload",s),localStorage.setItem(Bo(t,"isLocal"),f))}}}),he.isUndefined(n.parent)){if(this.closed=n.closed||!1,te.addClass(this.domElement,r.CLASS_MAIN),te.makeSelectable(this.domElement,!1),Xa&&i){t.useLocalStorage=!0;var a=localStorage.getItem(Bo(this,"gui"));a&&(n.load=JSON.parse(a))}this.__closeButton=document.createElement("div"),this.__closeButton.innerHTML=r.TEXT_CLOSED,te.addClass(this.__closeButton,r.CLASS_CLOSE_BUTTON),n.closeOnTop?(te.addClass(this.__closeButton,r.CLASS_CLOSE_TOP),this.domElement.insertBefore(this.__closeButton,this.domElement.childNodes[0])):(te.addClass(this.__closeButton,r.CLASS_CLOSE_BOTTOM),this.domElement.appendChild(this.__closeButton)),te.bind(this.__closeButton,"click",function(){t.closed=!t.closed})}else{n.closed===void 0&&(n.closed=!0);var l=document.createTextNode(n.name);te.addClass(l,"controller-name"),o=Bh(t,l);var c=function(f){return f.preventDefault(),t.closed=!t.closed,!1};te.addClass(this.__ul,r.CLASS_CLOSED),te.addClass(o,"title"),te.bind(o,"click",c),n.closed||(this.closed=!1)}n.autoPlace&&(he.isUndefined(n.parent)&&(jm&&(ko=document.createElement("div"),te.addClass(ko,Xm),te.addClass(ko,r.CLASS_AUTO_PLACE_CONTAINER),document.body.appendChild(ko),jm=!1),ko.appendChild(this.domElement),te.addClass(this.domElement,r.CLASS_AUTO_PLACE)),this.parent||Nf(t,n.width)),this.__resizeHandler=function(){t.onResizeDebounced()},te.bind(window,"resize",this.__resizeHandler),te.bind(this.__ul,"webkitTransitionEnd",this.__resizeHandler),te.bind(this.__ul,"transitionend",this.__resizeHandler),te.bind(this.__ul,"oTransitionEnd",this.__resizeHandler),this.onResize(),n.resizable&&UT(this),s=function(){Xa&&localStorage.getItem(Bo(t,"isLocal"))==="true"&&localStorage.setItem(Bo(t,"gui"),JSON.stringify(t.getSaveObject()))},this.saveToLocalStorageIfPossible=s;function u(){var d=t.getRoot();d.width+=1,he.defer(function(){d.width-=1})}n.parent||u()};nn.toggleHide=function(){_d=!_d,he.each($_,function(r){r.domElement.style.display=_d?"none":""})};nn.CLASS_AUTO_PLACE="a";nn.CLASS_AUTO_PLACE_CONTAINER="ac";nn.CLASS_MAIN="main";nn.CLASS_CONTROLLER_ROW="cr";nn.CLASS_TOO_TALL="taller-than-window";nn.CLASS_CLOSED="closed";nn.CLASS_CLOSE_BUTTON="close-button";nn.CLASS_CLOSE_TOP="close-top";nn.CLASS_CLOSE_BOTTOM="close-bottom";nn.CLASS_DRAG="drag";nn.DEFAULT_WIDTH=245;nn.TEXT_CLOSED="Close Controls";nn.TEXT_OPEN="Open Controls";nn._keydownHandler=function(r){document.activeElement.type!=="text"&&(r.which===qm||r.keyCode===qm)&&nn.toggleHide()};te.bind(window,"keydown",nn._keydownHandler,!1);he.extend(nn.prototype,{add:function(e,t){return ol(this,e,t,{factoryArgs:Array.prototype.slice.call(arguments,2)})},addColor:function(e,t){return ol(this,e,t,{color:!0})},remove:function(e){this.__ul.removeChild(e.__li),this.__controllers.splice(this.__controllers.indexOf(e),1);var t=this;he.defer(function(){t.onResize()})},destroy:function(){if(this.parent)throw new Error("Only the root GUI should be removed with .destroy(). For subfolders, use gui.removeFolder(folder) instead.");this.autoPlace&&ko.removeChild(this.domElement);var e=this;he.each(this.__folders,function(t){e.removeFolder(t)}),te.unbind(window,"keydown",nn._keydownHandler,!1),$m(this)},addFolder:function(e){if(this.__folders[e]!==void 0)throw new Error('You already have a folder in this GUI by the name "'+e+'"');var t={name:e,parent:this};t.autoPlace=this.autoPlace,this.load&&this.load.folders&&this.load.folders[e]&&(t.closed=this.load.folders[e].closed,t.load=this.load.folders[e]);var n=new nn(t);this.__folders[e]=n;var i=Bh(this,n.domElement);return te.addClass(i,"folder"),n},removeFolder:function(e){this.__ul.removeChild(e.domElement.parentElement),delete this.__folders[e.name],this.load&&this.load.folders&&this.load.folders[e.name]&&delete this.load.folders[e.name],$m(e);var t=this;he.each(e.__folders,function(n){e.removeFolder(n)}),he.defer(function(){t.onResize()})},open:function(){this.closed=!1},close:function(){this.closed=!0},hide:function(){this.domElement.style.display="none"},show:function(){this.domElement.style.display=""},onResize:function(){var e=this.getRoot();if(e.scrollable){var t=te.getOffset(e.__ul).top,n=0;he.each(e.__ul.childNodes,function(i){e.autoPlace&&i===e.__save_row||(n+=te.getHeight(i))}),window.innerHeight-t-Ym<n?(te.addClass(e.domElement,nn.CLASS_TOO_TALL),e.__ul.style.height=window.innerHeight-t-Ym+"px"):(te.removeClass(e.domElement,nn.CLASS_TOO_TALL),e.__ul.style.height="auto")}e.__resize_handle&&he.defer(function(){e.__resize_handle.style.height=e.__ul.offsetHeight+"px"}),e.__closeButton&&(e.__closeButton.style.width=e.width+"px")},onResizeDebounced:he.debounce(function(){this.onResize()},50),remember:function(){if(he.isUndefined(sl)&&(sl=new DT,sl.domElement.innerHTML=CT),this.parent)throw new Error("You can only call remember on a top level GUI.");var e=this;he.each(Array.prototype.slice.call(arguments),function(t){e.__rememberedObjects.length===0&&NT(e),e.__rememberedObjects.indexOf(t)===-1&&e.__rememberedObjects.push(t)}),this.autoPlace&&Nf(this,this.width)},getRoot:function(){for(var e=this;e.parent;)e=e.parent;return e},getSaveObject:function(){var e=this.load;return e.closed=this.closed,this.__rememberedObjects.length>0&&(e.preset=this.preset,e.remembered||(e.remembered={}),e.remembered[this.preset]=bc(this)),e.folders={},he.each(this.__folders,function(t,n){e.folders[n]=t.getSaveObject()}),e},save:function(){this.load.remembered||(this.load.remembered={}),this.load.remembered[this.preset]=bc(this),If(this,!1),this.saveToLocalStorageIfPossible()},saveAs:function(e){this.load.remembered||(this.load.remembered={},this.load.remembered[Rl]=bc(this,!0)),this.load.remembered[e]=bc(this),this.preset=e,Of(this,e,!0),this.saveToLocalStorageIfPossible()},revert:function(e){he.each(this.__controllers,function(t){this.getRoot().load.remembered?K_(e||this.getRoot(),t):t.setValue(t.initialValue),t.__onFinishChange&&t.__onFinishChange.call(t,t.getValue())},this),he.each(this.__folders,function(t){t.revert(t)}),e||If(this.getRoot(),!1)},listen:function(e){var t=this.__listening.length===0;this.__listening.push(e),t&&Z_(this.__listening)},updateDisplay:function(){he.each(this.__controllers,function(e){e.updateDisplay()}),he.each(this.__folders,function(e){e.updateDisplay()})}});function Bh(r,e,t){var n=document.createElement("li");return e&&n.appendChild(e),t?r.__ul.insertBefore(n,t):r.__ul.appendChild(n),r.onResize(),n}function $m(r){te.unbind(window,"resize",r.__resizeHandler),r.saveToLocalStorageIfPossible&&te.unbind(window,"unload",r.saveToLocalStorageIfPossible)}function If(r,e){var t=r.__preset_select[r.__preset_select.selectedIndex];e?t.innerHTML=t.value+"*":t.innerHTML=t.value}function OT(r,e,t){if(t.__li=e,t.__gui=r,he.extend(t,{options:function(o){if(arguments.length>1){var a=t.__li.nextElementSibling;return t.remove(),ol(r,t.object,t.property,{before:a,factoryArgs:[he.toArray(arguments)]})}if(he.isArray(o)||he.isObject(o)){var l=t.__li.nextElementSibling;return t.remove(),ol(r,t.object,t.property,{before:l,factoryArgs:[o]})}},name:function(o){return t.__li.firstElementChild.firstElementChild.innerHTML=o,t},listen:function(){return t.__gui.listen(t),t},remove:function(){return t.__gui.remove(t),t}}),t instanceof Lf){var n=new cu(t.object,t.property,{min:t.__min,max:t.__max,step:t.__step});he.each(["updateDisplay","onChange","onFinishChange","step","min","max"],function(s){var o=t[s],a=n[s];t[s]=n[s]=function(){var l=Array.prototype.slice.call(arguments);return a.apply(n,l),o.apply(t,l)}}),te.addClass(e,"has-slider"),t.domElement.insertBefore(n.domElement,t.domElement.firstElementChild)}else if(t instanceof cu){var i=function(o){if(he.isNumber(t.__min)&&he.isNumber(t.__max)){var a=t.__li.firstElementChild.firstElementChild.innerHTML,l=t.__gui.__listening.indexOf(t)>-1;t.remove();var c=ol(r,t.object,t.property,{before:t.__li.nextElementSibling,factoryArgs:[t.__min,t.__max,t.__step]});return c.name(a),l&&c.listen(),c}return o};t.min=he.compose(i,t.min),t.max=he.compose(i,t.max)}else t instanceof q_?(te.bind(e,"click",function(){te.fakeEvent(t.__checkbox,"click")}),te.bind(t.__checkbox,"click",function(s){s.stopPropagation()})):t instanceof j_?(te.bind(e,"click",function(){te.fakeEvent(t.__button,"click")}),te.bind(e,"mouseover",function(){te.addClass(t.__button,"hover")}),te.bind(e,"mouseout",function(){te.removeClass(t.__button,"hover")})):t instanceof Df&&(te.addClass(e,"color"),t.updateDisplay=he.compose(function(s){return e.style.borderLeftColor=t.__color.toString(),s},t.updateDisplay),t.updateDisplay());t.setValue=he.compose(function(s){return r.getRoot().__preset_select&&t.isModified()&&If(r.getRoot(),!0),s},t.setValue)}function K_(r,e){var t=r.getRoot(),n=t.__rememberedObjects.indexOf(e.object);if(n!==-1){var i=t.__rememberedObjectIndecesToControllers[n];if(i===void 0&&(i={},t.__rememberedObjectIndecesToControllers[n]=i),i[e.property]=e,t.load&&t.load.remembered){var s=t.load.remembered,o=void 0;if(s[r.preset])o=s[r.preset];else if(s[Rl])o=s[Rl];else return;if(o[n]&&o[n][e.property]!==void 0){var a=o[n][e.property];e.initialValue=a,e.setValue(a)}}}}function ol(r,e,t,n){if(e[t]===void 0)throw new Error('Object "'+e+'" has no property "'+t+'"');var i=void 0;if(n.color)i=new Df(e,t);else{var s=[e,t].concat(n.factoryArgs);i=RT.apply(r,s)}n.before instanceof fo&&(n.before=n.before.__li),K_(r,i),te.addClass(i.domElement,"c");var o=document.createElement("span");te.addClass(o,"property-name"),o.innerHTML=i.property;var a=document.createElement("div");a.appendChild(o),a.appendChild(i.domElement);var l=Bh(r,a,n.before);return te.addClass(l,nn.CLASS_CONTROLLER_ROW),i instanceof Df?te.addClass(l,"color"):te.addClass(l,yT(i.getValue())),OT(r,l,i),r.__controllers.push(i),i}function Bo(r,e){return document.location.href+"."+e}function Of(r,e,t){var n=document.createElement("option");n.innerHTML=e,n.value=e,r.__preset_select.appendChild(n),t&&(r.__preset_select.selectedIndex=r.__preset_select.length-1)}function Km(r,e){e.style.display=r.useLocalStorage?"block":"none"}function NT(r){var e=r.__save_row=document.createElement("li");te.addClass(r.domElement,"has-save"),r.__ul.insertBefore(e,r.__ul.firstChild),te.addClass(e,"save-row");var t=document.createElement("span");t.innerHTML="&nbsp;",te.addClass(t,"button gears");var n=document.createElement("span");n.innerHTML="Save",te.addClass(n,"button"),te.addClass(n,"save");var i=document.createElement("span");i.innerHTML="New",te.addClass(i,"button"),te.addClass(i,"save-as");var s=document.createElement("span");s.innerHTML="Revert",te.addClass(s,"button"),te.addClass(s,"revert");var o=r.__preset_select=document.createElement("select");if(r.load&&r.load.remembered?he.each(r.load.remembered,function(d,f){Of(r,f,f===r.preset)}):Of(r,Rl,!1),te.bind(o,"change",function(){for(var d=0;d<r.__preset_select.length;d++)r.__preset_select[d].innerHTML=r.__preset_select[d].value;r.preset=this.value}),e.appendChild(o),e.appendChild(t),e.appendChild(n),e.appendChild(i),e.appendChild(s),Xa){var a=document.getElementById("dg-local-explain"),l=document.getElementById("dg-local-storage"),c=document.getElementById("dg-save-locally");c.style.display="block",localStorage.getItem(Bo(r,"isLocal"))==="true"&&l.setAttribute("checked","checked"),Km(r,a),te.bind(l,"change",function(){r.useLocalStorage=!r.useLocalStorage,Km(r,a)})}var u=document.getElementById("dg-new-constructor");te.bind(u,"keydown",function(d){d.metaKey&&(d.which===67||d.keyCode===67)&&sl.hide()}),te.bind(t,"click",function(){u.innerHTML=JSON.stringify(r.getSaveObject(),void 0,2),sl.show(),u.focus(),u.select()}),te.bind(n,"click",function(){r.save()}),te.bind(i,"click",function(){var d=prompt("Enter a new preset name.");d&&r.saveAs(d)}),te.bind(s,"click",function(){r.revert()})}function UT(r){var e=void 0;r.__resize_handle=document.createElement("div"),he.extend(r.__resize_handle.style,{width:"6px",marginLeft:"-3px",height:"200px",cursor:"ew-resize",position:"absolute"});function t(s){return s.preventDefault(),r.width+=e-s.clientX,r.onResize(),e=s.clientX,!1}function n(){te.removeClass(r.__closeButton,nn.CLASS_DRAG),te.unbind(window,"mousemove",t),te.unbind(window,"mouseup",n)}function i(s){return s.preventDefault(),e=s.clientX,te.addClass(r.__closeButton,nn.CLASS_DRAG),te.bind(window,"mousemove",t),te.bind(window,"mouseup",n),!1}te.bind(r.__resize_handle,"mousedown",i),te.bind(r.__closeButton,"mousedown",i),r.domElement.insertBefore(r.__resize_handle,r.domElement.firstElementChild)}function Nf(r,e){r.domElement.style.width=e+"px",r.__save_row&&r.autoPlace&&(r.__save_row.style.width=e+"px"),r.__closeButton&&(r.__closeButton.style.width=e+"px")}function bc(r,e){var t={};return he.each(r.__rememberedObjects,function(n,i){var s={},o=r.__rememberedObjectIndecesToControllers[i];he.each(o,function(a,l){s[l]=e?a.initialValue:a.getValue()}),t[i]=s}),t}function FT(r){for(var e=0;e<r.__preset_select.length;e++)r.__preset_select[e].value===r.preset&&(r.__preset_select.selectedIndex=e)}function Z_(r){r.length!==0&&LT.call(window,function(){Z_(r)}),he.each(r,function(e){e.updateDisplay()})}var kT=nn;function Zm(r,e){if(e===Vy)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),r;if(e===Mf||e===y_){let t=r.getIndex();if(t===null){const o=[],a=r.getAttribute("position");if(a!==void 0){for(let l=0;l<a.count;l++)o.push(l);r.setIndex(o),t=r.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),r}const n=t.count-2,i=[];if(e===Mf)for(let o=1;o<=n;o++)i.push(t.getX(0)),i.push(t.getX(o)),i.push(t.getX(o+1));else for(let o=0;o<n;o++)o%2===0?(i.push(t.getX(o)),i.push(t.getX(o+1)),i.push(t.getX(o+2))):(i.push(t.getX(o+2)),i.push(t.getX(o+1)),i.push(t.getX(o)));i.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");const s=r.clone();return s.setIndex(i),s.clearGroups(),s}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),r}class BT extends Ea{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new WT(t)}),this.register(function(t){return new XT(t)}),this.register(function(t){return new e1(t)}),this.register(function(t){return new t1(t)}),this.register(function(t){return new n1(t)}),this.register(function(t){return new YT(t)}),this.register(function(t){return new jT(t)}),this.register(function(t){return new $T(t)}),this.register(function(t){return new KT(t)}),this.register(function(t){return new GT(t)}),this.register(function(t){return new ZT(t)}),this.register(function(t){return new qT(t)}),this.register(function(t){return new QT(t)}),this.register(function(t){return new JT(t)}),this.register(function(t){return new HT(t)}),this.register(function(t){return new i1(t)}),this.register(function(t){return new r1(t)})}load(e,t,n,i){const s=this;let o;if(this.resourcePath!=="")o=this.resourcePath;else if(this.path!==""){const c=rl.extractUrlBase(e);o=rl.resolveURL(c,this.path)}else o=rl.extractUrlBase(e);this.manager.itemStart(e);const a=function(c){i?i(c):console.error(c),s.manager.itemError(e),s.manager.itemEnd(e)},l=new k_(this.manager);l.setPath(this.path),l.setResponseType("arraybuffer"),l.setRequestHeader(this.requestHeader),l.setWithCredentials(this.withCredentials),l.load(e,function(c){try{s.parse(c,o,function(u){t(u),s.manager.itemEnd(e)},a)}catch(u){a(u)}},n,a)}setDRACOLoader(e){return this.dracoLoader=e,this}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,i){let s;const o={},a={},l=new TextDecoder;if(typeof e=="string")s=JSON.parse(e);else if(e instanceof ArrayBuffer)if(l.decode(new Uint8Array(e,0,4))===J_){try{o[At.KHR_BINARY_GLTF]=new s1(e)}catch(d){i&&i(d);return}s=JSON.parse(o[At.KHR_BINARY_GLTF].content)}else s=JSON.parse(l.decode(e));else s=e;if(s.asset===void 0||s.asset.version[0]<2){i&&i(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}const c=new v1(s,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});c.fileLoader.setRequestHeader(this.requestHeader);for(let u=0;u<this.pluginCallbacks.length;u++){const d=this.pluginCallbacks[u](c);d.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),a[d.name]=d,o[d.name]=!0}if(s.extensionsUsed)for(let u=0;u<s.extensionsUsed.length;++u){const d=s.extensionsUsed[u],f=s.extensionsRequired||[];switch(d){case At.KHR_MATERIALS_UNLIT:o[d]=new VT;break;case At.KHR_DRACO_MESH_COMPRESSION:o[d]=new o1(s,this.dracoLoader);break;case At.KHR_TEXTURE_TRANSFORM:o[d]=new a1;break;case At.KHR_MESH_QUANTIZATION:o[d]=new l1;break;default:f.indexOf(d)>=0&&a[d]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+d+'".')}}c.setExtensions(o),c.setPlugins(a),c.parse(n,i)}parseAsync(e,t){const n=this;return new Promise(function(i,s){n.parse(e,t,i,s)})}}function zT(){let r={};return{get:function(e){return r[e]},add:function(e,t){r[e]=t},remove:function(e){delete r[e]},removeAll:function(){r={}}}}const At={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"};class HT{constructor(e){this.parser=e,this.name=At.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){const e=this.parser,t=this.parser.json.nodes||[];for(let n=0,i=t.length;n<i;n++){const s=t[n];s.extensions&&s.extensions[this.name]&&s.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,s.extensions[this.name].light)}}_loadLight(e){const t=this.parser,n="light:"+e;let i=t.cache.get(n);if(i)return i;const s=t.json,l=((s.extensions&&s.extensions[this.name]||{}).lights||[])[e];let c;const u=new Je(16777215);l.color!==void 0&&u.setRGB(l.color[0],l.color[1],l.color[2],ni);const d=l.range!==void 0?l.range:0;switch(l.type){case"directional":c=new B_(u),c.target.position.set(0,0,-1),c.add(c.target);break;case"point":c=new xb(u),c.distance=d;break;case"spot":c=new vb(u),c.distance=d,l.spot=l.spot||{},l.spot.innerConeAngle=l.spot.innerConeAngle!==void 0?l.spot.innerConeAngle:0,l.spot.outerConeAngle=l.spot.outerConeAngle!==void 0?l.spot.outerConeAngle:Math.PI/4,c.angle=l.spot.outerConeAngle,c.penumbra=1-l.spot.innerConeAngle/l.spot.outerConeAngle,c.target.position.set(0,0,-1),c.add(c.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+l.type)}return c.position.set(0,0,0),Tr(c,l),l.intensity!==void 0&&(c.intensity=l.intensity),c.name=t.createUniqueName(l.name||"light_"+e),i=Promise.resolve(c),t.cache.add(n,i),i}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){const t=this,n=this.parser,s=n.json.nodes[e],a=(s.extensions&&s.extensions[this.name]||{}).light;return a===void 0?null:this._loadLight(a).then(function(l){return n._getNodeRef(t.cache,a,l)})}}class VT{constructor(){this.name=At.KHR_MATERIALS_UNLIT}getMaterialType(){return Ws}extendParams(e,t,n){const i=[];e.color=new Je(1,1,1),e.opacity=1;const s=t.pbrMetallicRoughness;if(s){if(Array.isArray(s.baseColorFactor)){const o=s.baseColorFactor;e.color.setRGB(o[0],o[1],o[2],ni),e.opacity=o[3]}s.baseColorTexture!==void 0&&i.push(n.assignTexture(e,"map",s.baseColorTexture,On))}return Promise.all(i)}}class GT{constructor(e){this.parser=e,this.name=At.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){const i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=i.extensions[this.name].emissiveStrength;return s!==void 0&&(t.emissiveIntensity=s),Promise.resolve()}}class WT{constructor(e){this.parser=e,this.name=At.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:_r}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];if(o.clearcoatFactor!==void 0&&(t.clearcoat=o.clearcoatFactor),o.clearcoatTexture!==void 0&&s.push(n.assignTexture(t,"clearcoatMap",o.clearcoatTexture)),o.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=o.clearcoatRoughnessFactor),o.clearcoatRoughnessTexture!==void 0&&s.push(n.assignTexture(t,"clearcoatRoughnessMap",o.clearcoatRoughnessTexture)),o.clearcoatNormalTexture!==void 0&&(s.push(n.assignTexture(t,"clearcoatNormalMap",o.clearcoatNormalTexture)),o.clearcoatNormalTexture.scale!==void 0)){const a=o.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new Ct(a,a)}return Promise.all(s)}}class XT{constructor(e){this.parser=e,this.name=At.KHR_MATERIALS_DISPERSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:_r}extendMaterialParams(e,t){const i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=i.extensions[this.name];return t.dispersion=s.dispersion!==void 0?s.dispersion:0,Promise.resolve()}}class qT{constructor(e){this.parser=e,this.name=At.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:_r}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];return o.iridescenceFactor!==void 0&&(t.iridescence=o.iridescenceFactor),o.iridescenceTexture!==void 0&&s.push(n.assignTexture(t,"iridescenceMap",o.iridescenceTexture)),o.iridescenceIor!==void 0&&(t.iridescenceIOR=o.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),o.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=o.iridescenceThicknessMinimum),o.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=o.iridescenceThicknessMaximum),o.iridescenceThicknessTexture!==void 0&&s.push(n.assignTexture(t,"iridescenceThicknessMap",o.iridescenceThicknessTexture)),Promise.all(s)}}class YT{constructor(e){this.parser=e,this.name=At.KHR_MATERIALS_SHEEN}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:_r}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[];t.sheenColor=new Je(0,0,0),t.sheenRoughness=0,t.sheen=1;const o=i.extensions[this.name];if(o.sheenColorFactor!==void 0){const a=o.sheenColorFactor;t.sheenColor.setRGB(a[0],a[1],a[2],ni)}return o.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=o.sheenRoughnessFactor),o.sheenColorTexture!==void 0&&s.push(n.assignTexture(t,"sheenColorMap",o.sheenColorTexture,On)),o.sheenRoughnessTexture!==void 0&&s.push(n.assignTexture(t,"sheenRoughnessMap",o.sheenRoughnessTexture)),Promise.all(s)}}class jT{constructor(e){this.parser=e,this.name=At.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:_r}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];return o.transmissionFactor!==void 0&&(t.transmission=o.transmissionFactor),o.transmissionTexture!==void 0&&s.push(n.assignTexture(t,"transmissionMap",o.transmissionTexture)),Promise.all(s)}}class $T{constructor(e){this.parser=e,this.name=At.KHR_MATERIALS_VOLUME}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:_r}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];t.thickness=o.thicknessFactor!==void 0?o.thicknessFactor:0,o.thicknessTexture!==void 0&&s.push(n.assignTexture(t,"thicknessMap",o.thicknessTexture)),t.attenuationDistance=o.attenuationDistance||1/0;const a=o.attenuationColor||[1,1,1];return t.attenuationColor=new Je().setRGB(a[0],a[1],a[2],ni),Promise.all(s)}}class KT{constructor(e){this.parser=e,this.name=At.KHR_MATERIALS_IOR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:_r}extendMaterialParams(e,t){const i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=i.extensions[this.name];return t.ior=s.ior!==void 0?s.ior:1.5,Promise.resolve()}}class ZT{constructor(e){this.parser=e,this.name=At.KHR_MATERIALS_SPECULAR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:_r}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];t.specularIntensity=o.specularFactor!==void 0?o.specularFactor:1,o.specularTexture!==void 0&&s.push(n.assignTexture(t,"specularIntensityMap",o.specularTexture));const a=o.specularColorFactor||[1,1,1];return t.specularColor=new Je().setRGB(a[0],a[1],a[2],ni),o.specularColorTexture!==void 0&&s.push(n.assignTexture(t,"specularColorMap",o.specularColorTexture,On)),Promise.all(s)}}class JT{constructor(e){this.parser=e,this.name=At.EXT_MATERIALS_BUMP}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:_r}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];return t.bumpScale=o.bumpFactor!==void 0?o.bumpFactor:1,o.bumpTexture!==void 0&&s.push(n.assignTexture(t,"bumpMap",o.bumpTexture)),Promise.all(s)}}class QT{constructor(e){this.parser=e,this.name=At.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:_r}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];return o.anisotropyStrength!==void 0&&(t.anisotropy=o.anisotropyStrength),o.anisotropyRotation!==void 0&&(t.anisotropyRotation=o.anisotropyRotation),o.anisotropyTexture!==void 0&&s.push(n.assignTexture(t,"anisotropyMap",o.anisotropyTexture)),Promise.all(s)}}class e1{constructor(e){this.parser=e,this.name=At.KHR_TEXTURE_BASISU}loadTexture(e){const t=this.parser,n=t.json,i=n.textures[e];if(!i.extensions||!i.extensions[this.name])return null;const s=i.extensions[this.name],o=t.options.ktx2Loader;if(!o){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,s.source,o)}}class t1{constructor(e){this.parser=e,this.name=At.EXT_TEXTURE_WEBP}loadTexture(e){const t=this.name,n=this.parser,i=n.json,s=i.textures[e];if(!s.extensions||!s.extensions[t])return null;const o=s.extensions[t],a=i.images[o.source];let l=n.textureLoader;if(a.uri){const c=n.options.manager.getHandler(a.uri);c!==null&&(l=c)}return n.loadTextureImage(e,o.source,l)}}class n1{constructor(e){this.parser=e,this.name=At.EXT_TEXTURE_AVIF}loadTexture(e){const t=this.name,n=this.parser,i=n.json,s=i.textures[e];if(!s.extensions||!s.extensions[t])return null;const o=s.extensions[t],a=i.images[o.source];let l=n.textureLoader;if(a.uri){const c=n.options.manager.getHandler(a.uri);c!==null&&(l=c)}return n.loadTextureImage(e,o.source,l)}}class i1{constructor(e){this.name=At.EXT_MESHOPT_COMPRESSION,this.parser=e}loadBufferView(e){const t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){const i=n.extensions[this.name],s=this.parser.getDependency("buffer",i.buffer),o=this.parser.options.meshoptDecoder;if(!o||!o.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return s.then(function(a){const l=i.byteOffset||0,c=i.byteLength||0,u=i.count,d=i.byteStride,f=new Uint8Array(a,l,c);return o.decodeGltfBufferAsync?o.decodeGltfBufferAsync(u,d,f,i.mode,i.filter).then(function(h){return h.buffer}):o.ready.then(function(){const h=new ArrayBuffer(u*d);return o.decodeGltfBuffer(new Uint8Array(h),u,d,f,i.mode,i.filter),h})})}else return null}}class r1{constructor(e){this.name=At.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){const t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;const i=t.meshes[n.mesh];for(const c of i.primitives)if(c.mode!==Ci.TRIANGLES&&c.mode!==Ci.TRIANGLE_STRIP&&c.mode!==Ci.TRIANGLE_FAN&&c.mode!==void 0)return null;const o=n.extensions[this.name].attributes,a=[],l={};for(const c in o)a.push(this.parser.getDependency("accessor",o[c]).then(u=>(l[c]=u,l[c])));return a.length<1?null:(a.push(this.parser.createNodeMesh(e)),Promise.all(a).then(c=>{const u=c.pop(),d=u.isGroup?u.children:[u],f=c[0].count,h=[];for(const _ of d){const g=new _t,m=new G,p=new Ss,S=new G(1,1,1),x=new $x(_.geometry,_.material,f);for(let v=0;v<f;v++)l.TRANSLATION&&m.fromBufferAttribute(l.TRANSLATION,v),l.ROTATION&&p.fromBufferAttribute(l.ROTATION,v),l.SCALE&&S.fromBufferAttribute(l.SCALE,v),x.setMatrixAt(v,g.compose(m,p,S));for(const v in l)if(v==="_COLOR_0"){const T=l[v];x.instanceColor=new Tf(T.array,T.itemSize,T.normalized)}else v!=="TRANSLATION"&&v!=="ROTATION"&&v!=="SCALE"&&_.geometry.setAttribute(v,l[v]);cn.prototype.copy.call(x,_),this.parser.assignFinalMaterial(x),h.push(x)}return u.isGroup?(u.clear(),u.add(...h),u):h[0]}))}}const J_="glTF",ka=12,Jm={JSON:1313821514,BIN:5130562};class s1{constructor(e){this.name=At.KHR_BINARY_GLTF,this.content=null,this.body=null;const t=new DataView(e,0,ka),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==J_)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");const i=this.header.length-ka,s=new DataView(e,ka);let o=0;for(;o<i;){const a=s.getUint32(o,!0);o+=4;const l=s.getUint32(o,!0);if(o+=4,l===Jm.JSON){const c=new Uint8Array(e,ka+o,a);this.content=n.decode(c)}else if(l===Jm.BIN){const c=ka+o;this.body=e.slice(c,c+a)}o+=a}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}}class o1{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=At.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){const n=this.json,i=this.dracoLoader,s=e.extensions[this.name].bufferView,o=e.extensions[this.name].attributes,a={},l={},c={};for(const u in o){const d=Uf[u]||u.toLowerCase();a[d]=o[u]}for(const u in e.attributes){const d=Uf[u]||u.toLowerCase();if(o[u]!==void 0){const f=n.accessors[e.attributes[u]],h=Ko[f.componentType];c[d]=h.name,l[d]=f.normalized===!0}}return t.getDependency("bufferView",s).then(function(u){return new Promise(function(d,f){i.decodeDracoFile(u,function(h){for(const _ in h.attributes){const g=h.attributes[_],m=l[_];m!==void 0&&(g.normalized=m)}d(h)},a,c,ni,f)})})}}class a1{constructor(){this.name=At.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}}class l1{constructor(){this.name=At.KHR_MESH_QUANTIZATION}}class Q_ extends Gl{constructor(e,t,n,i){super(e,t,n,i)}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,s=e*i*3+i;for(let o=0;o!==i;o++)t[o]=n[s+o];return t}interpolate_(e,t,n,i){const s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=a*2,c=a*3,u=i-t,d=(n-t)/u,f=d*d,h=f*d,_=e*c,g=_-c,m=-2*h+3*f,p=h-f,S=1-m,x=p-f+d;for(let v=0;v!==a;v++){const T=o[g+v+a],M=o[g+v+l]*u,E=o[_+v+a],P=o[_+v]*u;s[v]=S*T+x*M+m*E+p*P}return s}}const c1=new Ss;class u1 extends Q_{interpolate_(e,t,n,i){const s=super.interpolate_(e,t,n,i);return c1.fromArray(s).normalize().toArray(s),s}}const Ci={POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6},Ko={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},Qm={9728:ti,9729:xi,9984:d_,9985:kc,9986:Ga,9987:Lr},eg={33071:is,33648:iu,10497:ca},vd={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},Uf={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},Qr={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},d1={CUBICSPLINE:void 0,LINEAR:Al,STEP:Tl},yd={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function f1(r){return r.DefaultMaterial===void 0&&(r.DefaultMaterial=new Dh({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:zr})),r.DefaultMaterial}function Ds(r,e,t){for(const n in t.extensions)r[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function Tr(r,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(r.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function h1(r,e,t){let n=!1,i=!1,s=!1;for(let c=0,u=e.length;c<u;c++){const d=e[c];if(d.POSITION!==void 0&&(n=!0),d.NORMAL!==void 0&&(i=!0),d.COLOR_0!==void 0&&(s=!0),n&&i&&s)break}if(!n&&!i&&!s)return Promise.resolve(r);const o=[],a=[],l=[];for(let c=0,u=e.length;c<u;c++){const d=e[c];if(n){const f=d.POSITION!==void 0?t.getDependency("accessor",d.POSITION):r.attributes.position;o.push(f)}if(i){const f=d.NORMAL!==void 0?t.getDependency("accessor",d.NORMAL):r.attributes.normal;a.push(f)}if(s){const f=d.COLOR_0!==void 0?t.getDependency("accessor",d.COLOR_0):r.attributes.color;l.push(f)}}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(l)]).then(function(c){const u=c[0],d=c[1],f=c[2];return n&&(r.morphAttributes.position=u),i&&(r.morphAttributes.normal=d),s&&(r.morphAttributes.color=f),r.morphTargetsRelative=!0,r})}function p1(r,e){if(r.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)r.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){const t=e.extras.targetNames;if(r.morphTargetInfluences.length===t.length){r.morphTargetDictionary={};for(let n=0,i=t.length;n<i;n++)r.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function m1(r){let e;const t=r.extensions&&r.extensions[At.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+xd(t.attributes):e=r.indices+":"+xd(r.attributes)+":"+r.mode,r.targets!==void 0)for(let n=0,i=r.targets.length;n<i;n++)e+=":"+xd(r.targets[n]);return e}function xd(r){let e="";const t=Object.keys(r).sort();for(let n=0,i=t.length;n<i;n++)e+=t[n]+":"+r[t[n]]+";";return e}function Ff(r){switch(r){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function g1(r){return r.search(/\.jpe?g($|\?)/i)>0||r.search(/^data\:image\/jpeg/)===0?"image/jpeg":r.search(/\.webp($|\?)/i)>0||r.search(/^data\:image\/webp/)===0?"image/webp":r.search(/\.ktx2($|\?)/i)>0||r.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}const _1=new _t;class v1{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new zT,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,i=-1,s=!1,o=-1;if(typeof navigator<"u"){const a=navigator.userAgent;n=/^((?!chrome|android).)*safari/i.test(a)===!0;const l=a.match(/Version\/(\d+)/);i=n&&l?parseInt(l[1],10):-1,s=a.indexOf("Firefox")>-1,o=s?a.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||n&&i<17||s&&o<98?this.textureLoader=new gb(this.options.manager):this.textureLoader=new wb(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new k_(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){const n=this,i=this.json,s=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(o){return o._markDefs&&o._markDefs()}),Promise.all(this._invokeAll(function(o){return o.beforeRoot&&o.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(o){const a={scene:o[0][i.scene||0],scenes:o[0],animations:o[1],cameras:o[2],asset:i.asset,parser:n,userData:{}};return Ds(s,a,i),Tr(a,i),Promise.all(n._invokeAll(function(l){return l.afterRoot&&l.afterRoot(a)})).then(function(){for(const l of a.scenes)l.updateMatrixWorld();e(a)})}).catch(t)}_markDefs(){const e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let i=0,s=t.length;i<s;i++){const o=t[i].joints;for(let a=0,l=o.length;a<l;a++)e[o[a]].isBone=!0}for(let i=0,s=e.length;i<s;i++){const o=e[i];o.mesh!==void 0&&(this._addNodeRef(this.meshCache,o.mesh),o.skin!==void 0&&(n[o.mesh].isSkinnedMesh=!0)),o.camera!==void 0&&this._addNodeRef(this.cameraCache,o.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;const i=n.clone(),s=(o,a)=>{const l=this.associations.get(o);l!=null&&this.associations.set(a,l);for(const[c,u]of o.children.entries())s(u,a.children[c])};return s(n,i),i.name+="_instance_"+e.uses[t]++,i}_invokeOne(e){const t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){const i=e(t[n]);if(i)return i}return null}_invokeAll(e){const t=Object.values(this.plugins);t.unshift(this);const n=[];for(let i=0;i<t.length;i++){const s=e(t[i]);s&&n.push(s)}return n}getDependency(e,t){const n=e+":"+t;let i=this.cache.get(n);if(!i){switch(e){case"scene":i=this.loadScene(t);break;case"node":i=this._invokeOne(function(s){return s.loadNode&&s.loadNode(t)});break;case"mesh":i=this._invokeOne(function(s){return s.loadMesh&&s.loadMesh(t)});break;case"accessor":i=this.loadAccessor(t);break;case"bufferView":i=this._invokeOne(function(s){return s.loadBufferView&&s.loadBufferView(t)});break;case"buffer":i=this.loadBuffer(t);break;case"material":i=this._invokeOne(function(s){return s.loadMaterial&&s.loadMaterial(t)});break;case"texture":i=this._invokeOne(function(s){return s.loadTexture&&s.loadTexture(t)});break;case"skin":i=this.loadSkin(t);break;case"animation":i=this._invokeOne(function(s){return s.loadAnimation&&s.loadAnimation(t)});break;case"camera":i=this.loadCamera(t);break;default:if(i=this._invokeOne(function(s){return s!=this&&s.getDependency&&s.getDependency(e,t)}),!i)throw new Error("Unknown type: "+e);break}this.cache.add(n,i)}return i}getDependencies(e){let t=this.cache.get(e);if(!t){const n=this,i=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(i.map(function(s,o){return n.getDependency(e,o)})),this.cache.add(e,t)}return t}loadBuffer(e){const t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[At.KHR_BINARY_GLTF].body);const i=this.options;return new Promise(function(s,o){n.load(rl.resolveURL(t.uri,i.path),s,void 0,function(){o(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){const t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){const i=t.byteLength||0,s=t.byteOffset||0;return n.slice(s,s+i)})}loadAccessor(e){const t=this,n=this.json,i=this.json.accessors[e];if(i.bufferView===void 0&&i.sparse===void 0){const o=vd[i.type],a=Ko[i.componentType],l=i.normalized===!0,c=new a(i.count*o);return Promise.resolve(new Wt(c,o,l))}const s=[];return i.bufferView!==void 0?s.push(this.getDependency("bufferView",i.bufferView)):s.push(null),i.sparse!==void 0&&(s.push(this.getDependency("bufferView",i.sparse.indices.bufferView)),s.push(this.getDependency("bufferView",i.sparse.values.bufferView))),Promise.all(s).then(function(o){const a=o[0],l=vd[i.type],c=Ko[i.componentType],u=c.BYTES_PER_ELEMENT,d=u*l,f=i.byteOffset||0,h=i.bufferView!==void 0?n.bufferViews[i.bufferView].byteStride:void 0,_=i.normalized===!0;let g,m;if(h&&h!==d){const p=Math.floor(f/h),S="InterleavedBuffer:"+i.bufferView+":"+i.componentType+":"+p+":"+i.count;let x=t.cache.get(S);x||(g=new c(a,p*h,i.count*h/u),x=new Wx(g,h/u),t.cache.add(S,x)),m=new Ch(x,l,f%h/u,_)}else a===null?g=new c(i.count*l):g=new c(a,f,i.count*l),m=new Wt(g,l,_);if(i.sparse!==void 0){const p=vd.SCALAR,S=Ko[i.sparse.indices.componentType],x=i.sparse.indices.byteOffset||0,v=i.sparse.values.byteOffset||0,T=new S(o[1],x,i.sparse.count*p),M=new c(o[2],v,i.sparse.count*l);a!==null&&(m=new Wt(m.array.slice(),m.itemSize,m.normalized)),m.normalized=!1;for(let E=0,P=T.length;E<P;E++){const y=T[E];if(m.setX(y,M[E*l]),l>=2&&m.setY(y,M[E*l+1]),l>=3&&m.setZ(y,M[E*l+2]),l>=4&&m.setW(y,M[E*l+3]),l>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}m.normalized=_}return m})}loadTexture(e){const t=this.json,n=this.options,s=t.textures[e].source,o=t.images[s];let a=this.textureLoader;if(o.uri){const l=n.manager.getHandler(o.uri);l!==null&&(a=l)}return this.loadTextureImage(e,s,a)}loadTextureImage(e,t,n){const i=this,s=this.json,o=s.textures[e],a=s.images[t],l=(a.uri||a.bufferView)+":"+o.sampler;if(this.textureCache[l])return this.textureCache[l];const c=this.loadImageSource(t,n).then(function(u){u.flipY=!1,u.name=o.name||a.name||"",u.name===""&&typeof a.uri=="string"&&a.uri.startsWith("data:image/")===!1&&(u.name=a.uri);const f=(s.samplers||{})[o.sampler]||{};return u.magFilter=Qm[f.magFilter]||xi,u.minFilter=Qm[f.minFilter]||Lr,u.wrapS=eg[f.wrapS]||ca,u.wrapT=eg[f.wrapT]||ca,u.generateMipmaps=!u.isCompressedTexture&&u.minFilter!==ti&&u.minFilter!==xi,i.associations.set(u,{textures:e}),u}).catch(function(){return null});return this.textureCache[l]=c,c}loadImageSource(e,t){const n=this,i=this.json,s=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(d=>d.clone());const o=i.images[e],a=self.URL||self.webkitURL;let l=o.uri||"",c=!1;if(o.bufferView!==void 0)l=n.getDependency("bufferView",o.bufferView).then(function(d){c=!0;const f=new Blob([d],{type:o.mimeType});return l=a.createObjectURL(f),l});else if(o.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");const u=Promise.resolve(l).then(function(d){return new Promise(function(f,h){let _=f;t.isImageBitmapLoader===!0&&(_=function(g){const m=new Mn(g);m.needsUpdate=!0,f(m)}),t.load(rl.resolveURL(d,s.path),_,void 0,h)})}).then(function(d){return c===!0&&a.revokeObjectURL(l),Tr(d,o),d.userData.mimeType=o.mimeType||g1(o.uri),d}).catch(function(d){throw console.error("THREE.GLTFLoader: Couldn't load texture",l),d});return this.sourceCache[e]=u,u}assignTexture(e,t,n,i){const s=this;return this.getDependency("texture",n.index).then(function(o){if(!o)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(o=o.clone(),o.channel=n.texCoord),s.extensions[At.KHR_TEXTURE_TRANSFORM]){const a=n.extensions!==void 0?n.extensions[At.KHR_TEXTURE_TRANSFORM]:void 0;if(a){const l=s.associations.get(o);o=s.extensions[At.KHR_TEXTURE_TRANSFORM].extendTexture(o,a),s.associations.set(o,l)}}return i!==void 0&&(o.colorSpace=i),e[t]=o,o})}assignFinalMaterial(e){const t=e.geometry;let n=e.material;const i=t.attributes.tangent===void 0,s=t.attributes.color!==void 0,o=t.attributes.normal===void 0;if(e.isPoints){const a="PointsMaterial:"+n.uuid;let l=this.cache.get(a);l||(l=new O_,ur.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,l.sizeAttenuation=!1,this.cache.add(a,l)),n=l}else if(e.isLine){const a="LineBasicMaterial:"+n.uuid;let l=this.cache.get(a);l||(l=new I_,ur.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,this.cache.add(a,l)),n=l}if(i||s||o){let a="ClonedMaterial:"+n.uuid+":";i&&(a+="derivative-tangents:"),s&&(a+="vertex-colors:"),o&&(a+="flat-shading:");let l=this.cache.get(a);l||(l=n.clone(),s&&(l.vertexColors=!0),o&&(l.flatShading=!0),i&&(l.normalScale&&(l.normalScale.y*=-1),l.clearcoatNormalScale&&(l.clearcoatNormalScale.y*=-1)),this.cache.add(a,l),this.associations.set(l,this.associations.get(n))),n=l}e.material=n}getMaterialType(){return Dh}loadMaterial(e){const t=this,n=this.json,i=this.extensions,s=n.materials[e];let o;const a={},l=s.extensions||{},c=[];if(l[At.KHR_MATERIALS_UNLIT]){const d=i[At.KHR_MATERIALS_UNLIT];o=d.getMaterialType(),c.push(d.extendParams(a,s,t))}else{const d=s.pbrMetallicRoughness||{};if(a.color=new Je(1,1,1),a.opacity=1,Array.isArray(d.baseColorFactor)){const f=d.baseColorFactor;a.color.setRGB(f[0],f[1],f[2],ni),a.opacity=f[3]}d.baseColorTexture!==void 0&&c.push(t.assignTexture(a,"map",d.baseColorTexture,On)),a.metalness=d.metallicFactor!==void 0?d.metallicFactor:1,a.roughness=d.roughnessFactor!==void 0?d.roughnessFactor:1,d.metallicRoughnessTexture!==void 0&&(c.push(t.assignTexture(a,"metalnessMap",d.metallicRoughnessTexture)),c.push(t.assignTexture(a,"roughnessMap",d.metallicRoughnessTexture))),o=this._invokeOne(function(f){return f.getMaterialType&&f.getMaterialType(e)}),c.push(Promise.all(this._invokeAll(function(f){return f.extendMaterialParams&&f.extendMaterialParams(e,a)})))}s.doubleSided===!0&&(a.side=Di);const u=s.alphaMode||yd.OPAQUE;if(u===yd.BLEND?(a.transparent=!0,a.depthWrite=!1):(a.transparent=!1,u===yd.MASK&&(a.alphaTest=s.alphaCutoff!==void 0?s.alphaCutoff:.5)),s.normalTexture!==void 0&&o!==Ws&&(c.push(t.assignTexture(a,"normalMap",s.normalTexture)),a.normalScale=new Ct(1,1),s.normalTexture.scale!==void 0)){const d=s.normalTexture.scale;a.normalScale.set(d,d)}if(s.occlusionTexture!==void 0&&o!==Ws&&(c.push(t.assignTexture(a,"aoMap",s.occlusionTexture)),s.occlusionTexture.strength!==void 0&&(a.aoMapIntensity=s.occlusionTexture.strength)),s.emissiveFactor!==void 0&&o!==Ws){const d=s.emissiveFactor;a.emissive=new Je().setRGB(d[0],d[1],d[2],ni)}return s.emissiveTexture!==void 0&&o!==Ws&&c.push(t.assignTexture(a,"emissiveMap",s.emissiveTexture,On)),Promise.all(c).then(function(){const d=new o(a);return s.name&&(d.name=s.name),Tr(d,s),t.associations.set(d,{materials:e}),s.extensions&&Ds(i,d,s),d})}createUniqueName(e){const t=Xt.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){const t=this,n=this.extensions,i=this.primitiveCache;function s(a){return n[At.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(a,t).then(function(l){return tg(l,a,t)})}const o=[];for(let a=0,l=e.length;a<l;a++){const c=e[a],u=m1(c),d=i[u];if(d)o.push(d.promise);else{let f;c.extensions&&c.extensions[At.KHR_DRACO_MESH_COMPRESSION]?f=s(c):f=tg(new ki,c,t),i[u]={primitive:c,promise:f},o.push(f)}}return Promise.all(o)}loadMesh(e){const t=this,n=this.json,i=this.extensions,s=n.meshes[e],o=s.primitives,a=[];for(let l=0,c=o.length;l<c;l++){const u=o[l].material===void 0?f1(this.cache):this.getDependency("material",o[l].material);a.push(u)}return a.push(t.loadGeometries(o)),Promise.all(a).then(function(l){const c=l.slice(0,l.length-1),u=l[l.length-1],d=[];for(let h=0,_=u.length;h<_;h++){const g=u[h],m=o[h];let p;const S=c[h];if(m.mode===Ci.TRIANGLES||m.mode===Ci.TRIANGLE_STRIP||m.mode===Ci.TRIANGLE_FAN||m.mode===void 0)p=s.isSkinnedMesh===!0?new qx(g,S):new ei(g,S),p.isSkinnedMesh===!0&&p.normalizeSkinWeights(),m.mode===Ci.TRIANGLE_STRIP?p.geometry=Zm(p.geometry,y_):m.mode===Ci.TRIANGLE_FAN&&(p.geometry=Zm(p.geometry,Mf));else if(m.mode===Ci.LINES)p=new Qx(g,S);else if(m.mode===Ci.LINE_STRIP)p=new Lh(g,S);else if(m.mode===Ci.LINE_LOOP)p=new eb(g,S);else if(m.mode===Ci.POINTS)p=new Cf(g,S);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+m.mode);Object.keys(p.geometry.morphAttributes).length>0&&p1(p,s),p.name=t.createUniqueName(s.name||"mesh_"+e),Tr(p,s),m.extensions&&Ds(i,p,m),t.assignFinalMaterial(p),d.push(p)}for(let h=0,_=d.length;h<_;h++)t.associations.set(d[h],{meshes:e,primitives:h});if(d.length===1)return s.extensions&&Ds(i,d[0],s),d[0];const f=new Ir;s.extensions&&Ds(i,f,s),t.associations.set(f,{meshes:e});for(let h=0,_=d.length;h<_;h++)f.add(d[h]);return f})}loadCamera(e){let t;const n=this.json.cameras[e],i=n[n.type];if(!i){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new ri(mx.radToDeg(i.yfov),i.aspectRatio||1,i.znear||1,i.zfar||2e6):n.type==="orthographic"&&(t=new Tu(-i.xmag,i.xmag,i.ymag,-i.ymag,i.znear,i.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),Tr(t,n),Promise.resolve(t)}loadSkin(e){const t=this.json.skins[e],n=[];for(let i=0,s=t.joints.length;i<s;i++)n.push(this._loadNodeShallow(t.joints[i]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(i){const s=i.pop(),o=i,a=[],l=[];for(let c=0,u=o.length;c<u;c++){const d=o[c];if(d){a.push(d);const f=new _t;s!==null&&f.fromArray(s.array,c*16),l.push(f)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[c])}return new Rh(a,l)})}loadAnimation(e){const t=this.json,n=this,i=t.animations[e],s=i.name?i.name:"animation_"+e,o=[],a=[],l=[],c=[],u=[];for(let d=0,f=i.channels.length;d<f;d++){const h=i.channels[d],_=i.samplers[h.sampler],g=h.target,m=g.node,p=i.parameters!==void 0?i.parameters[_.input]:_.input,S=i.parameters!==void 0?i.parameters[_.output]:_.output;g.node!==void 0&&(o.push(this.getDependency("node",m)),a.push(this.getDependency("accessor",p)),l.push(this.getDependency("accessor",S)),c.push(_),u.push(g))}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(l),Promise.all(c),Promise.all(u)]).then(function(d){const f=d[0],h=d[1],_=d[2],g=d[3],m=d[4],p=[];for(let S=0,x=f.length;S<x;S++){const v=f[S],T=h[S],M=_[S],E=g[S],P=m[S];if(v===void 0)continue;v.updateMatrix&&v.updateMatrix();const y=n._createAnimationTracks(v,T,M,E,P);if(y)for(let b=0;b<y.length;b++)p.push(y[b])}return new cb(s,void 0,p)})}createNodeMesh(e){const t=this.json,n=this,i=t.nodes[e];return i.mesh===void 0?null:n.getDependency("mesh",i.mesh).then(function(s){const o=n._getNodeRef(n.meshCache,i.mesh,s);return i.weights!==void 0&&o.traverse(function(a){if(a.isMesh)for(let l=0,c=i.weights.length;l<c;l++)a.morphTargetInfluences[l]=i.weights[l]}),o})}loadNode(e){const t=this.json,n=this,i=t.nodes[e],s=n._loadNodeShallow(e),o=[],a=i.children||[];for(let c=0,u=a.length;c<u;c++)o.push(n.getDependency("node",a[c]));const l=i.skin===void 0?Promise.resolve(null):n.getDependency("skin",i.skin);return Promise.all([s,Promise.all(o),l]).then(function(c){const u=c[0],d=c[1],f=c[2];f!==null&&u.traverse(function(h){h.isSkinnedMesh&&h.bind(f,_1)});for(let h=0,_=d.length;h<_;h++)u.add(d[h]);return u})}_loadNodeShallow(e){const t=this.json,n=this.extensions,i=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];const s=t.nodes[e],o=s.name?i.createUniqueName(s.name):"",a=[],l=i._invokeOne(function(c){return c.createNodeMesh&&c.createNodeMesh(e)});return l&&a.push(l),s.camera!==void 0&&a.push(i.getDependency("camera",s.camera).then(function(c){return i._getNodeRef(i.cameraCache,s.camera,c)})),i._invokeAll(function(c){return c.createNodeAttachment&&c.createNodeAttachment(e)}).forEach(function(c){a.push(c)}),this.nodeCache[e]=Promise.all(a).then(function(c){let u;if(s.isBone===!0?u=new L_:c.length>1?u=new Ir:c.length===1?u=c[0]:u=new cn,u!==c[0])for(let d=0,f=c.length;d<f;d++)u.add(c[d]);if(s.name&&(u.userData.name=s.name,u.name=o),Tr(u,s),s.extensions&&Ds(n,u,s),s.matrix!==void 0){const d=new _t;d.fromArray(s.matrix),u.applyMatrix4(d)}else s.translation!==void 0&&u.position.fromArray(s.translation),s.rotation!==void 0&&u.quaternion.fromArray(s.rotation),s.scale!==void 0&&u.scale.fromArray(s.scale);if(!i.associations.has(u))i.associations.set(u,{});else if(s.mesh!==void 0&&i.meshCache.refs[s.mesh]>1){const d=i.associations.get(u);i.associations.set(u,{...d})}return i.associations.get(u).nodes=e,u}),this.nodeCache[e]}loadScene(e){const t=this.extensions,n=this.json.scenes[e],i=this,s=new Ir;n.name&&(s.name=i.createUniqueName(n.name)),Tr(s,n),n.extensions&&Ds(t,s,n);const o=n.nodes||[],a=[];for(let l=0,c=o.length;l<c;l++)a.push(i.getDependency("node",o[l]));return Promise.all(a).then(function(l){for(let u=0,d=l.length;u<d;u++)s.add(l[u]);const c=u=>{const d=new Map;for(const[f,h]of i.associations)(f instanceof ur||f instanceof Mn)&&d.set(f,h);return u.traverse(f=>{const h=i.associations.get(f);h!=null&&d.set(f,h)}),d};return i.associations=c(s),s})}_createAnimationTracks(e,t,n,i,s){const o=[],a=e.name?e.name:e.uuid,l=[];Qr[s.path]===Qr.weights?e.traverse(function(f){f.morphTargetInfluences&&l.push(f.name?f.name:f.uuid)}):l.push(a);let c;switch(Qr[s.path]){case Qr.weights:c=fa;break;case Qr.rotation:c=ha;break;case Qr.translation:case Qr.scale:c=pa;break;default:switch(n.itemSize){case 1:c=fa;break;case 2:case 3:default:c=pa;break}break}const u=i.interpolation!==void 0?d1[i.interpolation]:Al,d=this._getArrayFromAccessor(n);for(let f=0,h=l.length;f<h;f++){const _=new c(l[f]+"."+Qr[s.path],t.array,d,u);i.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(_),o.push(_)}return o}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){const n=Ff(t.constructor),i=new Float32Array(t.length);for(let s=0,o=t.length;s<o;s++)i[s]=t[s]*n;t=i}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){const i=this instanceof ha?u1:Q_;return new i(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}}function y1(r,e,t){const n=e.attributes,i=new Ki;if(n.POSITION!==void 0){const a=t.json.accessors[n.POSITION],l=a.min,c=a.max;if(l!==void 0&&c!==void 0){if(i.set(new G(l[0],l[1],l[2]),new G(c[0],c[1],c[2])),a.normalized){const u=Ff(Ko[a.componentType]);i.min.multiplyScalar(u),i.max.multiplyScalar(u)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;const s=e.targets;if(s!==void 0){const a=new G,l=new G;for(let c=0,u=s.length;c<u;c++){const d=s[c];if(d.POSITION!==void 0){const f=t.json.accessors[d.POSITION],h=f.min,_=f.max;if(h!==void 0&&_!==void 0){if(l.setX(Math.max(Math.abs(h[0]),Math.abs(_[0]))),l.setY(Math.max(Math.abs(h[1]),Math.abs(_[1]))),l.setZ(Math.max(Math.abs(h[2]),Math.abs(_[2]))),f.normalized){const g=Ff(Ko[f.componentType]);l.multiplyScalar(g)}a.max(l)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}i.expandByVector(a)}r.boundingBox=i;const o=new gr;i.getCenter(o.center),o.radius=i.min.distanceTo(i.max)/2,r.boundingSphere=o}function tg(r,e,t){const n=e.attributes,i=[];function s(o,a){return t.getDependency("accessor",o).then(function(l){r.setAttribute(a,l)})}for(const o in n){const a=Uf[o]||o.toLowerCase();a in r.attributes||i.push(s(n[o],a))}if(e.indices!==void 0&&!r.index){const o=t.getDependency("accessor",e.indices).then(function(a){r.setIndex(a)});i.push(o)}return Nt.workingColorSpace!==ni&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${Nt.workingColorSpace}" not supported.`),Tr(r,e),y1(r,e,t),Promise.all(i).then(function(){return e.targets!==void 0?h1(r,e.targets,t):r})}const x1="/150-lab/assets/models/globe-hd.glb";function e0(){if(window.shaderBackgroundInitialized){console.warn("Shader background already initialized. Skipping...");return}window.colorPhase=1,window.specialColorsActive=!1,window.particlesFullyHidden=!1,window.particlesMovementPaused=!1;let r=Date.now();const e=1e22;function t(){const w=document.querySelector("#events");if(!w)return!0;const k=w.getBoundingClientRect(),Z=window.innerHeight*1.2;return k.top>Z}const n=document.getElementById("shaderBackground");if(!n)return;function i(){try{const w=document.createElement("canvas");return!!(w.getContext("webgl")||w.getContext("experimental-webgl"))}catch{return!1}}if(!i()){console.warn("WebGL is not supported on this device/browser. Skipping shader background initialization."),n.style.display="none",document.body.style.backgroundColor="#1a1a2e";return}window.specialColorsActive=!1,window.colorPhase=0;let s,o;Sp(()=>Promise.resolve().then(()=>SC),void 0).then(w=>{s=w.default,Sp(()=>Promise.resolve().then(()=>V1),void 0).then(k=>{o=k.default,s.registerPlugin(o),a(s)})}).catch(w=>{console.error("Error loading GSAP:",w)});function a(w,k){let H,Z,ce,re,Ue,Le,bt,lt;if(!document.querySelector("#video-travel-area")){console.warn("Could not find #video-travel-area element for shader animation");return}if(C&&C.color1&&C.color2&&(H=C.color1.value.clone(),Z=C.color2.value.clone(),ce=C.waveSpeed.value,re=C.waveAmplitude.value,Ue=C.waveFrequency.value,Le=C.ambientLight.value,bt=C.directionalLight.value,lt=C.yOffset.value),w.timeline({scrollTrigger:{trigger:"#video-travel-area",start:"top 135%",end:"top 20%",scrub:!0,markers:!1,onUpdate:gn=>{C&&C.colorDarkness&&(C.colorDarkness.value=gn.progress*2,C.colorDarkness.value>=1.95?window.colorPhase===1?(C.color1&&C.color1.value.set(H),C.color2&&C.color2.value.set(Z),window.specialColorsActive=!0):window.colorPhase===0&&(C.color1&&C.color1.value.set("#e2e2e2"),C.color2&&C.color2.value.set("#515151"),window.specialColorsActive=!0):H&&Z&&(window.colorPhase===1?(C.color1&&C.color1.value.copy(H),C.color2&&C.color2.value.copy(Z),window.specialColorsActive=!1):window.colorPhase===0&&(C.color1&&C.color1.value.set("#e2e2e2"),C.color2&&C.color2.value.set("#515151"),window.specialColorsActive=!1)),c())}}}),setTimeout(()=>{l(w)},100),!document.querySelector("#get-involved")){console.warn("Could not find #get-involved element for globe opacity animation");return}w.timeline({scrollTrigger:{trigger:"#get-involved",start:"top bottom",end:"#get-involved-earth center center",scrub:!0,markers:!1,onUpdate:gn=>{const ut=gn.progress;F&&(ut>.01&&!F.visible?(F.visible=!0,U.visible=!0,f()):ut<=.01&&F.visible&&(F.visible=!1,U.visible=!1,f()),F.visible&&(F.traverse(en=>{en.isMesh&&en.material&&(en.material.transparent=!0,en.material.opacity=ut)}),U.opacity=ut,d())),y&&(ut>.01&&!y.visible?(y.visible=!0,b.enabled=!0,h()):ut<=.01&&y.visible&&(y.visible=!1,b.enabled=!1,h()),P&&P.uniforms&&(ut>.01&&y.visible?(P.uniforms.startOpacity.value=b.startOpacity*ut,P.uniforms.endOpacity.value=b.endOpacity*ut):(P.uniforms.startOpacity.value=0,P.uniforms.endOpacity.value=0)))}}}),w.timeline({scrollTrigger:{trigger:"#get-involved",start:"top 90%",end:"bottom top",scrub:.5,markers:!1,onUpdate:gn=>{const ut=gn.progress,en=.15;if(!window.particlesFullyHidden&&ut>=en?(window.particlesFullyHidden=!0,window.particlesMovementPaused=!0):window.particlesFullyHidden&&ut<en*.8&&(window.particlesFullyHidden=!1,window.particlesMovementPaused=!1),window.particlesFullyHidden){ue&&ue.uniforms&&ue.uniforms.opacity&&(ue.uniforms.opacity.value=0,go());return}const In=1-Math.min(ut/en,1),Wr=.5*Math.pow(In,3);ue&&ue.uniforms&&ue.uniforms.opacity&&(ue.uniforms.opacity.value=Wr,go())}}}),w.timeline({scrollTrigger:{trigger:"#get-involved-earth",start:"top bottom",end:"bottom top",scrub:.3,markers:!1,onUpdate:gn=>{const ut=gn.progress;if(E){const di=-322+120*(1-Math.pow(1-ut,3));if(E.position.y=di,Y&&Y.__folders["Globe Model Controls"]){const Gr=Y.__folders["Globe Model Controls"].__folders.Position;if(Gr&&Gr.__controllers){for(let Wr of Gr.__controllers)if(Wr.property==="positionY"){Wr.updateDisplay();break}}}}}}}),w.timeline({scrollTrigger:{trigger:"#hero-travel-area",start:"top bottom",end:"top top",scrub:!0,markers:!1,onUpdate:gn=>{if(!C||!C.color1||!C.color2)return;const ut=gn.progress,en=new Je("#e2e2e2"),_n=new Je("#515151"),In=new Je("#32c2d6"),di=new Je("#004199"),Gr=en.clone().lerp(In,ut),Wr=_n.clone().lerp(di,ut);C.color1.value.copy(Gr),C.color2.value.copy(Wr),ut>.9?window.colorPhase=1:ut<.1?window.colorPhase=0:window.colorPhase=.5,window.specialColorsActive=!0,u(),Mr();const Xr=document.querySelector("#cover-area-overlay");if(Xr){const _o=1-ut,ql=1+ut*1.2;Xr.style.opacity=_o,Xr.style.filter=`saturate(${ql})`}}}}),w.timeline({scrollTrigger:{trigger:"#hero-travel-area",start:"top top",end:"bottom bottom",scrub:!0,markers:!1,onUpdate:gn=>{if(!C||!C.color1||!C.color2)return;const ut=gn.progress,en=new Je("#32c2d6"),_n=new Je("#004199"),In=new Je("#B225B1"),di=new Je("#FCC72D"),Gr=new Je("#DA281C"),Wr=new Je("#FCC72D");let Xr,_o;if(ut<=.4)Xr=en.clone();else if(ut<=.8){const er=(ut-.4)/.4;Xr=en.clone().lerp(In,er)}else{const er=(ut-.8)/.2;Xr=In.clone().lerp(Gr,er)}if(ut<=.6)_o=_n.clone();else if(ut<=.8){const er=(ut-.6)/.20000000000000007;_o=_n.clone().lerp(di,er)}else{const er=(ut-.8)/.2;_o=di.clone().lerp(Wr,er)}C.color1.value.copy(Xr),C.color2.value.copy(_o);const ql=document.getElementById("shaderBackground");ql&&(ql.style.filter="hue-rotate(0deg)"),ut>.9?window.colorPhase=2:ut<.1?window.colorPhase=1:window.colorPhase=1.5,r=Date.now(),window.specialColorsActive=!0;const Nu=document.querySelector("#cover-area-overlay");if(Nu){let er=0;if(ut>=.3){const Kv=(ut-.3)/.7;er=Math.min(.5,Kv*.5)}const $v=1+ut*1.2;Nu.style.opacity=er,Nu.style.filter=`saturate(${$v})`}u(),Mr()}}}),w.timeline({scrollTrigger:{trigger:"#video-travel-area",start:"top top",end:"bottom top",scrub:!1,markers:!1,onEnter:()=>{console.log("Video travel area: Maintaining phase 2 colors"),C&&C.color1&&C.color2&&(C.color1.value.set("#DA281C"),C.color2.value.set("#FCC72D"),window.colorPhase=2,window.specialColorsActive=!0,u())},onLeaveBack:()=>{console.log("Video travel area: Returning to phase 1->2 transition")}}}),w.timeline({scrollTrigger:{trigger:"#video-travel-area",start:"top bottom",end:"top 66.67%",scrub:!0,markers:!1,onUpdate:gn=>{const ut=gn.progress,en=document.querySelector("#cover-area-overlay");if(en){const _n=.5-ut*.5;en.style.opacity=_n,en.style.filter="saturate(2.2)"}}}}),w.timeline({scrollTrigger:{trigger:"#events",start:"top 120%",end:"top 60%",scrub:!0,markers:!1,onUpdate:gn=>{if(!C||!C.color1||!C.color2)return;const ut=gn.progress;if(ut>.1)C.color1.value.set("#dcfff6"),C.color2.value.set("#5dff9d"),C.yOffset&&(C.yOffset.value=-.05),C.ambientLight.value=.4,C.directionalLight.value=.4,C.waveAmplitude.value=1.2,C.waveFrequency.value=2.2,window.colorPhase=3,window.specialColorsActive=!0,u(),Is(),Mr();else if(ut<=.1&&window.colorPhase===3){const en=C.time.value+C.colorCycleOffset.value;C.colorCycleOffset.value=en,C.time.value=0,C.color1.value.set("#DA281C"),C.color2.value.set("#FCC72D"),C.yOffset&&lt!==void 0&&(C.yOffset.value=lt),Le!==void 0&&(C.ambientLight.value=Le),bt!==void 0&&(C.directionalLight.value=bt),C.waveSpeed.value=1,re!==void 0&&(C.waveAmplitude.value=re),Ue!==void 0&&(C.waveFrequency.value=Ue),window.colorPhase=2,r=Date.now(),window.specialColorsActive=!0,u(),Is(),Mr()}c()}}}),w.timeline({scrollTrigger:{trigger:"#get-involved-cards",start:"top 50%",end:"top -10%",scrub:1,markers:!1,onUpdate:gn=>{const en=1-gn.progress,_n=Math.pow(en,3);F&&(F.visible=!0,F.traverse(In=>{In.isMesh&&In.material&&(Array.isArray(In.material)?In.material.forEach(di=>{di.transparent=!0,di.opacity=_n,di.depthWrite=_n>.1,di.blending=fs,di.needsUpdate=!0}):(In.material.transparent=!0,In.material.opacity=_n,In.material.depthWrite=_n>.1,In.material.blending=fs,In.material.needsUpdate=!0))}),_n<.01&&(F.visible=!1),U.opacity=_n,U.rotationPaused=_n<.01,d()),y&&P&&P.uniforms&&(y.visible=_n>.01,P.uniforms.startOpacity.value=b.startOpacity*_n,P.uniforms.endOpacity.value=b.endOpacity*_n,b.enabled=_n>.01,h())}}}),w.timeline({scrollTrigger:{trigger:"#get-involved",start:"bottom bottom",end:"top top",scrub:!0,markers:!1,onUpdate:gn=>{gn.progress<=.1&&ce!==void 0&&window.colorPhase===1&&(C.waveSpeed&&(C.waveSpeed.value=ce),C.waveAmplitude&&(C.waveAmplitude.value=re),C.waveFrequency&&(C.waveFrequency.value=Ue),C.yOffset&&(C.yOffset.value=lt),Is(),Mr())}}});function go(gn){if(typeof Y<"u"&&Y&&Y.__folders&&Y.__folders["Particle System"]){const ut=Y.__folders["Particle System"];if(ut&&ut.__controllers){for(let en of ut.__controllers)if(en.property==="value"&&en.object===ue.uniforms.opacity){en.updateDisplay();break}}}}}function l(w,k,H,Z){if(!document.querySelector("#events")){document.addEventListener("DOMContentLoaded",()=>{l(w)});return}w.timeline({scrollTrigger:{trigger:"#events",start:"top 120%",end:"top 50%",scrub:!0,markers:!1,onUpdate:re=>{C&&C.colorDarkness&&(C.colorDarkness.value=2-re.progress*2,window.colorPhase===3?(C.color1&&C.color1.value.set("#dcfff6"),C.color2&&C.color2.value.set("#5dff9d"),C.ambientLight&&(C.ambientLight.value=.4),C.directionalLight&&(C.directionalLight.value=.4),C.waveSpeed&&(C.waveSpeed.value=.9),C.waveAmplitude&&(C.waveAmplitude.value=1.2),window.specialColorsActive=!0,u(),Is(),Mr()):window.colorPhase===2?(C.color1&&C.color1.value.set("#da281c"),C.color2&&C.color2.value.set("#FCC72D"),window.specialColorsActive=!0,u(),Is(),Mr()):window.colorPhase===1?(C.color1&&C.color1.value.set("#32c2d6"),C.color2&&C.color2.value.set("#004199"),window.specialColorsActive=!0,u(),Is(),Mr()):(C.color1&&C.color1.value.set("#e2e2e2"),C.color2&&C.color2.value.set("#515151"),window.specialColorsActive=!0,u(),Is(),Mr()),c())}}})}function c(){const w=window.gui,k=window.uniforms;if(typeof w<"u"&&w&&w.__folders&&w.__folders["Color Controls"]){const H=w.__folders["Color Controls"];if(H&&H.__controllers){for(let Z of H.__controllers)if(Z.property==="value"&&Z.object===k.colorDarkness){Z.updateDisplay();break}}}}function u(){const w=window.gui,k=window.uniforms;if(typeof w<"u"&&w&&w.__folders&&w.__folders["Color Controls"]){const H=w.__folders["Color Controls"];H&&H.__controllers&&H.__controllers.forEach(Z=>{if(Z.property==="color"&&Z.__color){if(Z.property==="color"&&Z.__li&&Z.__li.querySelector(".property-name").textContent==="Color 1"){const re="#"+k.color1.value.getHexString();Z.setValue(re)}else if(Z.property==="color"&&Z.__li&&Z.__li.querySelector(".property-name").textContent==="Color 2"){const re="#"+k.color2.value.getHexString();Z.setValue(re)}}})}}function d(){if(typeof Y<"u"&&Y&&Y.__folders&&Y.__folders["Globe Model Controls"]&&Y.__folders["Globe Model Controls"].__folders&&Y.__folders["Globe Model Controls"].__folders.Material){const w=Y.__folders["Globe Model Controls"].__folders.Material;if(w&&w.__controllers)for(let k of w.__controllers)k.property==="opacity"&&k.updateDisplay()}}function f(){if(typeof Y<"u"&&Y&&Y.__folders&&Y.__folders["Globe Model Controls"]){const w=Y.__folders["Globe Model Controls"];if(w&&w.__controllers){for(let k of w.__controllers)if(k.property==="visible"){k.updateDisplay();break}}}}function h(){if(typeof Y<"u"&&Y&&Y.__folders&&Y.__folders["Gradient Overlay Controls"]){const w=Y.__folders["Gradient Overlay Controls"];if(w&&w.__controllers){for(let k of w.__controllers)if(k.property==="enabled"){k.updateDisplay();break}}}}function _(){return Math.max(window.innerHeight,document.documentElement.clientHeight)}const g=window.innerWidth,m=_();n.style.position="fixed",n.style.top="0",n.style.left="0",n.style.width="100vw",n.style.height="100svh",n.style.zIndex="-1",n.style.transform="translateZ(0)",n.style.transformStyle="preserve-3d",n.style.willChange="transform";let p;try{p=new gT({canvas:n,alpha:!0,antialias:!1,powerPreference:"default",failIfMajorPerformanceCaveat:!1}),p.setSize(g,m),p.setPixelRatio(Math.min(window.devicePixelRatio,2))}catch(w){console.error("Failed to create WebGL renderer:",w),console.warn("Falling back to fallback background. WebGL initialization failed."),n.style.display="none",document.body.style.backgroundColor="#1a1a2e",document.body.style.background="linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #1a1a2e 100%)";return}window.shaderBackgroundInitialized=!0,n.addEventListener("webglcontextlost",function(w){console.warn("WebGL context lost. Attempting to restore..."),w.preventDefault(),window.shaderBackgroundInitialized=!1}),n.addEventListener("webglcontextrestored",function(){console.log("WebGL context restored. Reinitializing..."),setTimeout(()=>{if(!window.shaderBackgroundReinitializing){window.shaderBackgroundReinitializing=!0;try{e0()}catch(w){console.error("Failed to reinitialize shader background after context restore:",w)}finally{window.shaderBackgroundReinitializing=!1}}},100)});const S=new Kp,x=new Kp;let v=0;const T={zoom:2.471,zPosition:1},M=new Tu(-window.innerWidth/2,window.innerWidth/2,window.innerHeight/2,-window.innerHeight/2,-1e3,1e3);M.position.z=T.zPosition,M.zoom=T.zoom,M.updateProjectionMatrix();const E=new Ir;E.position.y=-322,E.frustumCulled=!0,S.add(E);let P,y;const b={enabled:!1,startOpacity:0,endOpacity:1,offsetY:.22,height:3,color:"#000000",yOffset:-.03};function D(){P=new Oi({transparent:!0,uniforms:{startOpacity:{value:b.startOpacity},endOpacity:{value:b.endOpacity},overlayColor:{value:new Je(b.color)},offsetY:{value:b.offsetY},heightMultiplier:{value:b.height}},vertexShader:`
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
      `,depthTest:!1,depthWrite:!1,side:Di});const w=window.innerHeight,k=M.right-M.left,H=M.top-M.bottom,Z=w*.66*(H/w),ce=new Gi(k,Z);y=new ei(ce,P),y.rotation.set(0,0,0),y.position.x=0,y.position.y=b.yOffset*H,y.position.z=-100,y.frustumCulled=!1,y.renderOrder=9999,y.visible=b.enabled,S.add(y)}function B(){if(!y)return;y.rotation.set(0,0,0),y.position.x=0;const w=M.top-M.bottom;y.position.y=b.yOffset*w,y.position.z=-100}D();const U={visible:!1,scale:25,positionX:0,positionY:-280,positionZ:0,rotationX:0,rotationY:0,rotationZ:0,autoRotate:!0,autoRotateSpeed:.05,baseRotateSpeed:.05,scrollRotateSpeed:.075,responsive:!0,baseScale:25,opacity:0,rotationPaused:!1},K=new BT;let F;K.load(x1,w=>{F=w.scene;let H=new Ki().setFromObject(F).getCenter(new G),Z=new Ir;Z.add(F),F.position.set(-H.x,-H.y,-H.z),F=Z,F.visible=U.visible,F.frustumCulled=!0,F.traverse(Ue=>{Ue.isMesh&&(Ue.frustumCulled=!0)}),E.add(F),F.position.set(U.positionX,U.positionY,U.positionZ),F.rotation.set(U.rotationX*Math.PI/180,U.rotationY*Math.PI/180,U.rotationZ*Math.PI/180),U.responsive?ke():(F.scale.set(U.scale,U.scale,U.scale),He());const ce=Xe.addFolder("Material");let re=0;F.traverse(Ue=>{if(Ue.isMesh&&Ue.material){const Le=Ue.material;if(re++,Le.isMeshStandardMaterial||Le.isMeshPhongMaterial){Le.metalness!==void 0&&ce.add({metalness:Le.metalness},"metalness",0,1).name(`Metalness${re>1?" "+re:""}`).onChange(lt=>{Le.metalness=lt}),Le.roughness!==void 0&&ce.add({roughness:Le.roughness},"roughness",0,1).name(`Roughness${re>1?" "+re:""}`).onChange(lt=>{Le.roughness=lt}),Le.shininess!==void 0&&ce.add({shininess:Le.shininess},"shininess",0,100).name(`Shininess${re>1?" "+re:""}`).onChange(lt=>{Le.shininess=lt}),ce.add({opacity:Le.opacity},"opacity",0,1).name(`Opacity${re>1?" "+re:""}`).onChange(lt=>{Le.opacity=lt,Le.transparent=lt<1});const bt=Le.emissive?"#"+Le.emissive.getHexString():"#000000";ce.addColor({color:bt},"color").name(`Emissive Color${re>1?" "+re:""}`).onChange(lt=>{Le.emissive&&Le.emissive.set(lt)})}}})},w=>{},w=>{}),window.uniforms={time:{value:0},resolution:{value:new Ct(window.innerWidth,window.innerHeight)},mainSpeed:{value:12e-5},waveSpeed:{value:1},noiseSpeed:{value:.45},colorCycleSpeed:{value:2},colorCycleOffset:{value:0},color1:{value:new Je("#e2e2e2")},color2:{value:new Je("#515151")},colorDarkness:{value:0},colorWaveInfluence:{value:0},colorFrequencyShift:{value:0},colorAmplitudeEffect:{value:0},waveAmplitude:{value:.8},waveFrequency:{value:4},waveDepth:{value:.6},flowDirection:{value:new Ct(-.7,.82)},noiseScale:{value:2.5},noiseInfluence:{value:0},layerOffset:{value:.4},yOffset:{value:.29},topEdgeSoftness:{value:1},bottomEdgeSoftness:{value:1},leftEdgeSoftness:{value:.2},rightEdgeSoftness:{value:.5},fadeWidth:{value:1},leftCornerRoundness:{value:.8},rightCornerRoundness:{value:1},edgeNoiseAmount:{value:.12},edgeNoiseScale:{value:3},edgeDepth:{value:.9},edgeContrast:{value:2},bottomWaveEnabled:{value:!0},bottomWaveDepth:{value:.117},bottomWaveWidth:{value:6.475},bottomWaveSpeed:{value:0},bottomWaveOffset:{value:-2.207},filmNoiseIntensity:{value:.088},filmNoiseSpeed:{value:1e-5},filmGrainSize:{value:10},filmScratchIntensity:{value:0},lightDirection:{value:new G(.5,.5,1).normalize()},ambientLight:{value:.6},directionalLight:{value:.6},specularStrength:{value:0},shininess:{value:128},displacementStrength:{value:0},displacementScale:{value:1e-4},displacementDepth:{value:0},xOffset:{value:-.104}};const C=window.uniforms,J=`
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
  `,me=new Gi(window.innerWidth,window.innerHeight,window.innerWidth/10,window.innerHeight/10),I=new Oi({vertexShader:J,fragmentShader:X,uniforms:C,transparent:!0,side:Di}),_e=new ei(me,I);S.add(_e),window.gui=new kT({width:300,closed:!0});const Y=window.gui;Y.domElement.style.position="absolute",Y.domElement.style.top="10px",Y.domElement.style.right="10px";const Re=Y.domElement.querySelector(".close-button");Re&&(Re.innerHTML="Open Controls",Re.addEventListener("click",function(){setTimeout(()=>{this.innerHTML=Y.closed?"Open Controls":"Close Controls"},50)}));const Q=Y.addFolder("Camera Controls");Q.add(T,"zoom",.1,5).name("Zoom Level").step(.001).onChange(w=>{M.zoom=w,M.updateProjectionMatrix()}),Q.close();const se=Y.addFolder("Animation Speed Controls");se.add(C.mainSpeed,"value",1e-4,.1).name("Main Speed").step(1e-4).onChange(w=>{C.mainSpeed.value=w}),se.add(C.waveSpeed,"value",1e-4,5).name("Wave Speed").step(1e-4).onChange(w=>{C.waveSpeed.value=w}),se.add(C.noiseSpeed,"value",1e-4,5).name("Noise Speed").step(1e-4).onChange(w=>{C.noiseSpeed.value=w}),se.add(C.colorCycleSpeed,"value",1e-6,5).name("Color Cycle Speed").step(1e-6).onChange(w=>{C.colorCycleSpeed.value=w}),se.add(C.colorCycleOffset,"value",0,6.28).name("Color Cycle Offset").step(.01).onChange(w=>{C.colorCycleOffset.value=w}),se.open();const Me=Y.addFolder("Color Controls"),ve="#"+C.color1.value.getHexString(),De="#"+C.color2.value.getHexString();Me.addColor({color:ve},"color").name("Color 1").onChange(w=>{typeof w=="string"?C.color1.value.set(w):C.color1.value.setRGB(w.r/255,w.g/255,w.b/255)}),Me.addColor({color:De},"color").name("Color 2").onChange(w=>{typeof w=="string"?C.color2.value.set(w):C.color2.value.setRGB(w.r/255,w.g/255,w.b/255)}),Me.add(C.colorDarkness,"value",0,2).name("Color Darkness").step(.001).onChange(w=>{C.colorDarkness.value=w}),Me.add(C.colorWaveInfluence,"value",0,1).name("Color → Wave Influence").onChange(w=>{C.colorWaveInfluence.value=w}),Me.add(C.colorFrequencyShift,"value",0,1).name("Color → Frequency Effect").onChange(w=>{C.colorFrequencyShift.value=w}),Me.add(C.colorAmplitudeEffect,"value",0,1).name("Color → Amplitude Effect").onChange(w=>{C.colorAmplitudeEffect.value=w}),Me.open();const Qe=Y.addFolder("Wave Controls");Qe.add(C.waveAmplitude,"value",0,12).step(1e-4).name("Wave Amplitude").onChange(w=>{C.waveAmplitude.value=w}),Qe.add(C.waveFrequency,"value",.1,5).name("Wave Frequency").onChange(w=>{C.waveFrequency.value=w}),Qe.add(C.waveDepth,"value",0,1).name("Wave Depth Effect").onChange(w=>{C.waveDepth.value=w}),Qe.add(C.noiseScale,"value",0,5).name("Noise Scale").onChange(w=>{C.noiseScale.value=w}),Qe.add(C.noiseInfluence,"value",0,1).name("Noise Influence").onChange(w=>{C.noiseInfluence.value=w}),Qe.add(C.layerOffset,"value",0,1).name("Layer Depth Offset").onChange(w=>{C.layerOffset.value=w});const Pe=Qe.addFolder("Flow Direction");Pe.add(C.flowDirection.value,"x",-2,2).name("Horizontal Flow").onChange(w=>{C.flowDirection.value.x=w}),Pe.add(C.flowDirection.value,"y",-2,2).name("Vertical Flow").onChange(w=>{C.flowDirection.value.y=w});const nt=Y.addFolder("Appearance Controls"),pt=Y.addFolder("Film Noise Controls");pt.add(C.filmNoiseIntensity,"value",0,1).name("Noise Intensity").onChange(w=>{C.filmNoiseIntensity.value=w}),pt.add(C.filmNoiseSpeed,"value",1e-5,5e-5).name("Noise Speed").step(1e-5).onChange(w=>{C.filmNoiseSpeed.value=w}),pt.add(C.filmGrainSize,"value",.5,50).name("Grain Size").onChange(w=>{C.filmGrainSize.value=w}),pt.add(C.filmScratchIntensity,"value",0,.1).name("Scratch Intensity").onChange(w=>{C.filmScratchIntensity.value=w}),nt.add(C.xOffset,"value",-1,1).step(.001).name("X Position").onChange(w=>{C.xOffset.value=w}),nt.add(C.yOffset,"value",-1,1).step(.001).name("Y Position").onChange(w=>{C.yOffset.value=w}),nt.add(C.fadeWidth,"value",.1,1).name("Visible Area Size").onChange(w=>{C.fadeWidth.value=w}),nt.add(C.topEdgeSoftness,"value",0,1).name("Top Edge Softness").onChange(w=>{C.topEdgeSoftness.value=w}),nt.add(C.bottomEdgeSoftness,"value",0,1).name("Bottom Edge Softness").onChange(w=>{C.bottomEdgeSoftness.value=w}),nt.add(C.leftEdgeSoftness,"value",0,1).name("Left Edge Softness").onChange(w=>{C.leftEdgeSoftness.value=w}),nt.add(C.rightEdgeSoftness,"value",0,1).name("Right Edge Softness").onChange(w=>{C.rightEdgeSoftness.value=w}),nt.add(C.leftCornerRoundness,"value",0,1).name("Left Corner Roundness").onChange(w=>{C.leftCornerRoundness.value=w}),nt.add(C.rightCornerRoundness,"value",0,1).name("Right Corner Roundness").onChange(w=>{C.rightCornerRoundness.value=w}),nt.add(C.edgeDepth,"value",.1,3).name("Edge Burn-in Depth").onChange(w=>{C.edgeDepth.value=w}),nt.add(C.edgeContrast,"value",.5,3).name("Edge Contrast").onChange(w=>{C.edgeContrast.value=w}),nt.add(C.edgeNoiseAmount,"value",0,1).name("Edge Noise Amount").onChange(w=>{C.edgeNoiseAmount.value=w}),nt.add(C.edgeNoiseScale,"value",.5,10).name("Edge Noise Scale").onChange(w=>{C.edgeNoiseScale.value=w});const Fe=Y.addFolder("Bottom Wave Edge Controls");Fe.add(C.bottomWaveEnabled,"value").name("Enable Bottom Wave").onChange(w=>{C.bottomWaveEnabled.value=w,F&&U.responsive&&He()}),Fe.add(C.bottomWaveDepth,"value",0,.5).name("Wave Depth").step(.001).onChange(w=>{C.bottomWaveDepth.value=w,F&&U.responsive&&He()}),Fe.add(C.bottomWaveWidth,"value",1,20).name("Wave Width").step(.001).onChange(w=>{C.bottomWaveWidth.value=w}),Fe.add(C.bottomWaveSpeed,"value",0,5).name("Wave Speed").step(.001).onChange(w=>{C.bottomWaveSpeed.value=w}),Fe.add(C.bottomWaveOffset,"value",-5,5).name("Wave Offset").step(.001).onChange(w=>{C.bottomWaveOffset.value=w});const O=Y.addFolder("Lighting Controls");O.add(C.ambientLight,"value",0,1).name("Ambient Light").onChange(w=>{C.ambientLight.value=w}),O.add(C.directionalLight,"value",0,1).name("Directional Light").step(.001).onChange(w=>{C.directionalLight.value=w}),O.add(C.specularStrength,"value",0,1).step(.001).name("Specular Strength").onChange(w=>{C.specularStrength.value=w}),O.add(C.shininess,"value",1,128).name("Shininess").onChange(w=>{C.shininess.value=w});const Dt=O.addFolder("Light Direction");Dt.add(C.lightDirection.value,"x",-1,1).name("X").onChange(()=>{C.lightDirection.value.normalize()}),Dt.add(C.lightDirection.value,"y",-1,1).name("Y").onChange(()=>{C.lightDirection.value.normalize()}),Dt.add(C.lightDirection.value,"z",0,1).name("Z").onChange(()=>{C.lightDirection.value.normalize()});const Xe=Y.addFolder("Globe Model Controls"),q=new B_(16777215,10);q.position.set(1,1,1),S.add(q);const Oe=new Sb(16777215,.5);S.add(Oe);const dt=Xe.addFolder("Lighting");dt.add({intensity:3},"intensity",0,5).name("Direct Light").onChange(w=>{q.intensity=w}),q.intensity=3,dt.add({intensity:Oe.intensity},"intensity",0,5).name("Ambient Light").onChange(w=>{Oe.intensity=w}),Xe.add(U,"visible").name("Show Globe").onChange(w=>{F&&(F.visible=w)}),Xe.add(U,"scale",.1,50).name("Size").step(.1).onChange(w=>{F&&(U.baseScale=w,F.scale.set(w,w,w))}),Xe.add(U,"responsive").name("Responsive Size").onChange(w=>{!w&&F?F.scale.set(U.baseScale,U.baseScale,U.baseScale):w&&ke()}),Xe.add({resizeGlobe:function(){F&&ke()}},"resizeGlobe").name("Force Resize"),Xe.add({positionBehindWave:function(){F&&He()}},"positionBehindWave").name("Position Behind Wave");function He(){if(!F)return;const w=window.innerWidth;if(w<=640){F.position.y=192,F.position.z=-10;for(let Z=0;Z<mt.__controllers.length;Z++){const ce=mt.__controllers[Z];ce.property==="positionY"?ce.setValue(192):ce.property==="positionZ"&&ce.setValue(-10)}return}if(w>640&&w<=1024){F.position.y=192,F.position.z=-10;for(let ce=0;ce<mt.__controllers.length;ce++){const re=mt.__controllers[ce];re.property==="positionY"?re.setValue(192):re.property==="positionZ"&&re.setValue(-10)}return}const k=-40,H=-10;F.position.y=k,F.position.z=H;for(let Z=0;Z<mt.__controllers.length;Z++){const ce=mt.__controllers[Z];ce.property==="positionY"?ce.setValue(k):ce.property==="positionZ"&&ce.setValue(H)}}function ke(){if(!F||!U.responsive)return;const w=window.innerWidth;if(w>1024){F.scale.set(40,40,40);for(let ce=0;ce<Xe.__controllers.length;ce++)if(Xe.__controllers[ce].property==="scale"){Xe.__controllers[ce].setValue(40);break}He();return}let k;w<=640?k=w*1.2:k=w*.9;const H={x:F.scale.x,y:F.scale.y,z:F.scale.z};try{F.scale.set(1,1,1),F.updateMatrixWorld(!0);const Z=new Ki().setFromObject(F),ce=Z.max.x-Z.min.x;F.scale.set(H.x,H.y,H.z);const Ue=(M.right-M.left)/M.zoom/w,bt=k*Ue/ce;F.scale.set(bt,bt,bt);for(let lt=0;lt<Xe.__controllers.length;lt++)if(Xe.__controllers[lt].property==="scale"){Xe.__controllers[lt].setValue(bt);break}He()}catch(Z){console.error("Error updating globe size:",Z),F.scale.set(H.x,H.y,H.z)}}const mt=Xe.addFolder("Position");mt.add(U,"positionX",-500,500).name("X Position").step(1).onChange(w=>{F&&(F.position.x=w)}),mt.add(U,"positionY",-500,500).name("Y Position").step(1).onChange(w=>{F&&(F.position.y=w)}),mt.add(U,"positionZ",-500,500).name("Z Position").step(1).onChange(w=>{F&&(F.position.z=w)});const L=Xe.addFolder("Rotation");L.add(U,"rotationX",0,360).name("X Rotation").step(1).onChange(w=>{F&&(F.rotation.x=w*Math.PI/180)}),L.add(U,"rotationY",0,360).name("Y Rotation").step(1).onChange(w=>{F&&(F.rotation.y=w*Math.PI/180)}),L.add(U,"rotationZ",0,360).name("Z Rotation").step(1).onChange(w=>{F&&(F.rotation.z=w*Math.PI/180)}),Xe.add(U,"autoRotate").name("Auto Rotate").onChange(w=>{U.autoRotate=w}),Xe.add(U,"baseRotateSpeed",.05,1).name("Base Rotation Speed").step(.01).onChange(w=>{U.baseRotateSpeed=w}),Xe.add(U,"scrollRotateSpeed",.05,1).name("Scroll Rotation Speed").step(.01).onChange(w=>{U.scrollRotateSpeed=w}),Xe.open();const A=Y.addFolder("Gradient Overlay Controls");A.add(b,"enabled").name("Show Overlay").onChange(w=>{y&&(y.visible=w)});const W=A.add(b,"startOpacity",0,1).name("Top Opacity").step(.01).onChange(w=>{P&&(P.uniforms.startOpacity.value=w)});W.__li.querySelector(".property-name").innerHTML="Top Opacity (Top Edge)";const oe=A.add(b,"endOpacity",0,1).name("Bottom Opacity").step(.01).onChange(w=>{P&&(P.uniforms.endOpacity.value=w)});oe.__li.querySelector(".property-name").innerHTML="Bottom Opacity (Bottom Edge)",A.add(b,"yOffset",-2,2).name("Vertical Position (moves only)").step(.01).onChange(w=>{y&&B()}),A.add(b,"offsetY",-1,1).name("Gradient Shift").step(.01).onChange(w=>{P&&(P.uniforms.offsetY.value=w)}),A.add(b,"height",.1,5).name("Gradient Distribution (not size)").step(.1).onChange(w=>{P&&(P.uniforms.heightMultiplier.value=w)}),A.addColor(b,"color").name("Color").onChange(w=>{P&&P.uniforms.overlayColor.value.set(w)}),A.add({debugOverlay:function(){if(P){const w=P.uniforms.startOpacity.value,k=P.uniforms.endOpacity.value;P.uniforms.startOpacity.value=1,P.uniforms.endOpacity.value=1,P.uniforms.overlayColor.value.set("#FF00FF"),setTimeout(()=>{P.uniforms.startOpacity.value=w,P.uniforms.endOpacity.value=k,P.uniforms.overlayColor.value.set(b.color)},2e3)}}},"debugOverlay").name("Debug Visibility"),A.open();let ne=150,ie=new Float32Array(ne*3),Ee=new Float32Array(ne*3),ge=new Float32Array(ne*3),ze=0,Ae=0;const j={scrollSpeed:.005,verticalSpread:1,horizontalSpread:.56,damping:.95,depthRange:1e3,sizeMin:1.1,sizeMax:4,floatSpeed:.8,verticalOffset:0};let Se=window.innerHeight*j.verticalSpread,Ge=window.innerWidth*j.horizontalSpread;function $e(){const w=new Float32Array(ne);for(let k=0;k<ne;k++){const H=k*3,Z=Math.random(),ce=j.sizeMin+Z*(j.sizeMax-j.sizeMin);w[k]=ce/ue.uniforms.baseSize.value;const re=new Je(ae.color),Ue=.8+Z*.6;ge[H]=re.r*Ue,ge[H+1]=re.g*Ue,ge[H+2]=re.b*Ue}de.setAttribute("size",new Wt(w,1)),de.attributes.position.needsUpdate=!0,de.attributes.color.needsUpdate=!0,de.attributes.size.needsUpdate=!0}for(let w=0;w<ne;w++){const k=w*3;ie[k]=(Math.random()-.5)*Ge,ie[k+1]=(Math.random()-.5)*Se+j.verticalOffset,ie[k+2]=Math.random()*500-250,Ee[k]=(Math.random()-.5)*.5,Ee[k+1]=(Math.random()-.5)*.5,Ee[k+2]=(Math.random()-.5)*.2;const H=new Je("#25e5ff");ge[k]=H.r,ge[k+1]=H.g,ge[k+2]=H.b}const de=new ki;de.setAttribute("position",new Wt(ie,3)),de.setAttribute("color",new Wt(ge,3));const it=N();function N(){const w=document.createElement("canvas");w.width=256,w.height=256;const k=w.getContext("2d"),H=k.createRadialGradient(w.width/2,w.height/2,0,w.width/2,w.height/2,w.width/2);H.addColorStop(0,"rgba(255, 255, 255, 1.0)"),H.addColorStop(.05,"rgba(255, 255, 255, 1.0)"),H.addColorStop(.2,"rgba(255, 255, 255, 0.9)"),H.addColorStop(.4,"rgba(255, 255, 255, 0.5)"),H.addColorStop(.6,"rgba(255, 255, 255, 0.3)"),H.addColorStop(.8,"rgba(255, 255, 255, 0.1)"),H.addColorStop(1,"rgba(255, 255, 255, 0)"),k.fillStyle=H,k.fillRect(0,0,w.width,w.height),k.beginPath(),k.moveTo(w.width/2,w.width*.3),k.lineTo(w.width/2,w.width*.7),k.moveTo(w.width*.3,w.height/2),k.lineTo(w.width*.7,w.height/2),k.moveTo(w.width*.35,w.height*.35),k.lineTo(w.width*.65,w.height*.65),k.moveTo(w.width*.65,w.height*.35),k.lineTo(w.width*.35,w.height*.65),k.strokeStyle="rgba(255, 255, 255, 1.0)",k.lineWidth=4,k.stroke();const Z=k.createRadialGradient(w.width/2,w.height/2,w.width*.2,w.width/2,w.height/2,w.width*.7);Z.addColorStop(0,"rgba(255, 255, 255, 0.3)"),Z.addColorStop(.5,"rgba(255, 255, 255, 0.1)"),Z.addColorStop(1,"rgba(255, 255, 255, 0)"),k.globalCompositeOperation="lighter",k.fillStyle=Z,k.fillRect(0,0,w.width,w.height);const ce=new Mn(w);return ce.needsUpdate=!0,ce}const ue=new Oi({uniforms:{baseSize:{value:6},opacity:{value:0},map:{value:it},brightness:{value:1.4},haloStrength:{value:1.4},haloSize:{value:1.3}},vertexShader:`
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
    `,transparent:!0,blending:nu,depthWrite:!1,depthTest:!1}),fe=new Cf(de,ue);fe.frustumCulled=!0,x.add(fe);const ye=Y.addFolder("Particle System"),pe={count:ne};ye.add(pe,"count",100,1e3,10).name("Particle Count").onChange(w=>{ne=Math.floor(w);const k=new Float32Array(ne*3),H=new Float32Array(ne*3),Z=new Float32Array(ne*3);for(let ce=0;ce<ne;ce++){const re=ce*3;if(ce<ie.length/3)k[re]=ie[re],k[re+1]=ie[re+1],k[re+2]=ie[re+2],H[re]=Ee[re],H[re+1]=Ee[re+1],H[re+2]=Ee[re+2],Z[re]=ge[re],Z[re+1]=ge[re+1],Z[re+2]=ge[re+2];else{k[re]=(Math.random()-.5)*Ge,k[re+1]=(Math.random()-.5)*Se+j.verticalOffset,k[re+2]=Math.random()*500-250,H[re]=(Math.random()-.5)*.5,H[re+1]=(Math.random()-.5)*.5,H[re+2]=(Math.random()-.5)*.2;const Ue=new Je(ae.color);Z[re]=Ue.r,Z[re+1]=Ue.g,Z[re+2]=Ue.b}}ie=k,Ee=H,ge=Z,de.setAttribute("position",new Wt(ie,3)),de.setAttribute("color",new Wt(ge,3)),de.attributes.position.needsUpdate=!0,de.attributes.color.needsUpdate=!0,$e()});const ae={color:"#25e5ff"};ye.addColor(ae,"color").name("Particle Color").onChange(w=>{const k=new Je(w);for(let H=0;H<ne;H++){const Z=H*3;ge[Z]=k.r,ge[Z+1]=k.g,ge[Z+2]=k.b}de.setAttribute("color",new Wt(ge,3)),de.attributes.color.needsUpdate=!0}),ye.add(ue.uniforms.baseSize,"value",2,15,.5).name("Base Particle Size").onChange(w=>{$e()}),ye.add(ue.uniforms.opacity,"value",0,1,.1).name("Opacity"),ye.add(ue.uniforms.brightness,"value",1,3,.1).name("Brightness").onChange(w=>{ue.uniforms.brightness.value=w});const Be={intensity:1.5};ye.add(Be,"intensity",.1,3,.1).name("Sparkle Intensity").onChange(w=>{ue.uniforms.opacity.value=w});const rt={enabled:!1},Ut=ye.add(rt,"enabled").name("Size Attenuation").onChange(w=>{w?ue.vertexShader=`
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
        `,ue.needsUpdate=!0,$e()}),we=document.createElement("div");we.className="gui-tooltip",we.textContent="When enabled, particles appear smaller as they move further away",we.style.position="absolute",we.style.backgroundColor="rgba(0,0,0,0.8)",we.style.color="#fff",we.style.padding="5px",we.style.borderRadius="3px",we.style.fontSize="11px",we.style.zIndex="10000",we.style.display="none",document.body.appendChild(we);const qe=Ut.domElement;qe.addEventListener("mouseenter",w=>{const k=qe.getBoundingClientRect();we.style.left=k.right+"px",we.style.top=k.top+"px",we.style.display="block"}),qe.addEventListener("mouseleave",()=>{we.style.display="none"});let ht=0;window.addEventListener("scroll",()=>{ze=window.scrollY});let xe=[],Ke={x:0,y:0},Ye={x:0,y:0},at=0,qt=0,ct=!1,Bt=250,It=[],Ht=10,Et,vt=!1,sn=[];const Te={enabled:!1,mobileDisabled:/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)||window.innerWidth<=768||"ontouchstart"in window,spawnRate:.52,maxParticles:150,baseSize:1.9,fadeInSpeed:.62,fadeOutSpeed:.88,trailLength:5e-4,speedVariation:.2,jitterAmount:.08,spawnOffsetMin:.08,spawnOffsetMax:.8,minLifetime:1.5,maxLifetime:3.5,drawnLife:12};Et=Te.spawnOffsetMin,window.enableMouseParticles=function(){Te.mobileDisabled||(Te.enabled=!0)};const jt=new ki,un=new Oi({uniforms:{baseSize:{value:Te.baseSize},map:{value:it},brightness:{value:1.4},haloStrength:{value:1.4},haloSize:{value:1.3}},vertexShader:`
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
    `,transparent:!0,blending:nu,depthWrite:!1,depthTest:!1}),fn=new Cf(jt,un);x.add(fn);function R(w,k){const H=w/window.innerWidth*2-1,Z=-(k/window.innerHeight)*2+1,ce=H*(M.right-M.left)/2/M.zoom,re=Z*(M.top-M.bottom)/2/M.zoom;return{x:ce,y:re}}function V(w,k){return{id:at++,position:{x:w,y:k,z:Math.random()*100-50},targetPosition:{x:w,y:k},velocity:{x:0,y:0},size:.8+Math.random()*.4,opacity:0,targetOpacity:1,life:0,maxLife:Te.minLifetime+Math.random()*(Te.maxLifetime-Te.minLifetime),color:{r:.145,g:.898,b:1},trailSpeed:.05+Math.random()*.03,fadePhase:"in"}}function ee(w,k){return{id:at++,position:{x:w,y:k,z:Math.random()*100-50},originalPosition:{x:w,y:k},targetPosition:{x:w,y:k},velocity:{x:0,y:0},size:.8+Math.random()*.4,opacity:0,baseOpacity:0,targetOpacity:1,life:0,maxLife:Te.drawnLife,color:{r:1,g:.647,b:0},trailSpeed:0,fadePhase:"in",isDrawn:!0,twinklePhase:Math.random()*Math.PI*2,twinkleSpeed:.8+Math.random()*.4,twinkleRadius:2+Math.random()*3}}function $(){const w=[...xe,...sn];if(w.length===0){jt.attributes.position&&(jt.setAttribute("position",new Wt(new Float32Array(0),3)),jt.setAttribute("color",new Wt(new Float32Array(0),3)),jt.setAttribute("size",new Wt(new Float32Array(0),1)),jt.setAttribute("opacity",new Wt(new Float32Array(0),1)));return}const k=new Float32Array(w.length*3),H=new Float32Array(w.length*3),Z=new Float32Array(w.length),ce=new Float32Array(w.length);for(let re=0;re<w.length;re++){const Ue=w[re],Le=re*3;k[Le]=Ue.position.x,k[Le+1]=Ue.position.y,k[Le+2]=Ue.position.z,H[Le]=Ue.color.r,H[Le+1]=Ue.color.g,H[Le+2]=Ue.color.b,Z[re]=Ue.size,ce[re]=Ue.opacity}jt.setAttribute("position",new Wt(k,3)),jt.setAttribute("color",new Wt(H,3)),jt.setAttribute("size",new Wt(Z,1)),jt.setAttribute("opacity",new Wt(ce,1)),jt.attributes.position.needsUpdate=!0,jt.attributes.color.needsUpdate=!0,jt.attributes.size.needsUpdate=!0,jt.attributes.opacity.needsUpdate=!0}window.addEventListener("mousemove",w=>{if(!Te.enabled||Te.mobileDisabled)return;Ye.x=Ke.x,Ye.y=Ke.y,Ke.x=w.clientX,Ke.y=w.clientY;const k=Ke.x-Ye.x,H=Ke.y-Ye.y,Z=Math.sqrt(k*k+H*H);if(ct||(qt+=Z,qt>=Bt&&(ct=!0)),It.push(Z),It.length>Ht&&It.shift(),It.length>0){const ce=It.reduce((Le,bt)=>Le+bt,0)/It.length,Ue=Math.min(ce/20,1);Et=Te.spawnOffsetMin+(Te.spawnOffsetMax-Te.spawnOffsetMin)*Ue}if(ct&&Z>1&&xe.length<Te.maxParticles&&Math.random()<Te.spawnRate){const ce=R(Ke.x,Ke.y),re=Et*50,Ue=Math.random()*Math.PI*2,Le=Math.cos(Ue)*re*Math.random(),bt=Math.sin(Ue)*re*Math.random(),lt=V(ce.x+Le,ce.y+bt);xe.push(lt)}if(vt&&xe.length<Te.maxParticles&&Math.random()<.8){const ce=R(Ke.x,Ke.y),re=10,Ue=Math.random()*Math.PI*2,Le=Math.cos(Ue)*re*Math.random(),bt=Math.sin(Ue)*re*Math.random(),lt=ee(ce.x+Le,ce.y+bt);sn.push(lt)}}),window.addEventListener("mousedown",w=>{!Te.enabled||Te.mobileDisabled||w.button===0&&(vt=!0)}),window.addEventListener("mouseup",w=>{w.button===0&&(vt=!1)});let z={x:0,y:0},le={x:0,y:0},Ce=!1;window.addEventListener("touchstart",w=>{if(!Te.enabled||Te.mobileDisabled)return;const k=w.target;k.tagName==="BUTTON"||k.tagName==="A"||k.closest("button")||k.closest("a")||k.closest("header")||k.closest("nav")||w.preventDefault();const Z=w.touches[0];le.x=Z.clientX,le.y=Z.clientY,z.x=le.x,z.y=le.y,Ce=!0,vt=!0},{passive:!1}),window.addEventListener("touchmove",w=>{if(!Te.enabled||Te.mobileDisabled||!Ce)return;const k=w.target;k.tagName==="BUTTON"||k.tagName==="A"||k.closest("button")||k.closest("a")||k.closest("header")||k.closest("nav")||w.preventDefault();const Z=w.touches[0];z.x=le.x,z.y=le.y,le.x=Z.clientX,le.y=Z.clientY,Ke.x=le.x,Ke.y=le.y;const ce=le.x-z.x,re=le.y-z.y,Ue=Math.sqrt(ce*ce+re*re);if(ct||(qt+=Ue,qt>=Bt&&(ct=!0)),It.push(Ue),It.length>Ht&&It.shift(),It.length>0){const Le=It.reduce((po,mo)=>po+mo,0)/It.length,lt=Math.min(Le/20,1);Et=Te.spawnOffsetMin+(Te.spawnOffsetMax-Te.spawnOffsetMin)*lt}if(ct&&Ue>1&&xe.length<Te.maxParticles&&Math.random()<Te.spawnRate){const Le=R(le.x,le.y),bt=Et*50,lt=Math.random()*Math.PI*2,po=Math.cos(lt)*bt*Math.random(),mo=Math.sin(lt)*bt*Math.random(),go=V(Le.x+po,Le.y+mo);xe.push(go)}if(vt&&xe.length<Te.maxParticles&&Math.random()<.8){const Le=R(le.x,le.y),bt=10,lt=Math.random()*Math.PI*2,po=Math.cos(lt)*bt*Math.random(),mo=Math.sin(lt)*bt*Math.random(),go=ee(Le.x+po,Le.y+mo);sn.push(go)}},{passive:!1}),window.addEventListener("touchend",w=>{Ce=!1,vt=!1}),window.addEventListener("touchcancel",w=>{Ce=!1,vt=!1});function We(){if(xe.length===0&&sn.length===0||Te.mobileDisabled)return;const w=R(Ke.x,Ke.y);for(let k=xe.length-1;k>=0;k--){const H=xe[k];if(H.life+=.016,!H.isDrawn){H.targetPosition.x=w.x,H.targetPosition.y=w.y;const ce=H.trailSpeed*Te.trailLength;H.position.x+=(H.targetPosition.x-H.position.x)*ce,H.position.y+=(H.targetPosition.y-H.position.y)*ce,H.position.x+=(Math.random()-.5)*2*Te.jitterAmount,H.position.y+=(Math.random()-.5)*2*Te.jitterAmount}const Z=H.life/H.maxLife;if(Z<.15){H.fadePhase="in";const ce=Z/.15,re=1-Math.pow(1-ce,2);H.opacity=re*Te.fadeInSpeed}else if(Z<.65)H.fadePhase="hold",H.opacity=Te.fadeInSpeed;else{H.fadePhase="out";const ce=(Z-.65)/.35,re=Math.pow(1-ce,2);H.opacity=re*Te.fadeInSpeed*Te.fadeOutSpeed}(H.life>=H.maxLife||H.opacity<=0)&&xe.splice(k,1)}for(let k=sn.length-1;k>=0;k--){const H=sn[k];H.life+=.016,H.twinklePhase+=.016*H.twinkleSpeed;const Z=Math.sin(H.twinklePhase)*H.twinkleRadius*.4,ce=Math.cos(H.twinklePhase*1.05)*H.twinkleRadius*.4;H.position.x=H.originalPosition.x+Z,H.position.y=H.originalPosition.y+ce;const re=H.life/H.maxLife;if(re<.15){H.fadePhase="in";const Le=re/.15,bt=1-Math.pow(1-Le,2);H.baseOpacity=bt*Te.fadeInSpeed}else if(re<.85)H.fadePhase="hold",H.baseOpacity=Te.fadeInSpeed;else{H.fadePhase="out";const Le=(re-.85)/.15,bt=Math.pow(1-Le,2);H.baseOpacity=bt*Te.fadeInSpeed*Te.fadeOutSpeed}const Ue=.7+.3*Math.sin(H.twinklePhase*2);H.opacity=H.baseOpacity*Ue,(H.life>=H.maxLife||H.opacity<=0)&&sn.splice(k,1)}$(),et.currentOffset=Et}const be=Y.addFolder("Mouse Follow Particles");be.add({mobileDetected:Te.mobileDisabled},"mobileDetected").name("Mobile Detected (Disabled)").listen(),be.add(Te,"enabled").name("Enable Mouse Particles").onChange(w=>{w||(xe=[],sn=[],$(),ct=!1,qt=0,It=[],Et=Te.spawnOffsetMin,vt=!1)}),be.add(Te,"spawnRate",.1,1,.1).name("Spawn Rate").onChange(w=>{Te.spawnRate=w}),be.add(Te,"maxParticles",10,50,1).name("Max Particles").onChange(w=>{for(Te.maxParticles=w;xe.length>w;)xe.pop();$()}),be.add(Te,"baseSize",2,10,.5).name("Particle Size").onChange(w=>{un.uniforms.baseSize.value=w}),be.add(Te,"trailLength",.1,1,.1).name("Trail Length").onChange(w=>{Te.trailLength=w}),be.add(Te,"speedVariation",0,1,.1).name("Speed Variation").onChange(w=>{Te.speedVariation=w}),be.add(Te,"jitterAmount",0,1,.05).name("Jitter Amount").onChange(w=>{Te.jitterAmount=w}),be.add(Te,"spawnOffsetMin",0,1,.05).name("Spawn Offset Min").onChange(w=>{Te.spawnOffsetMin=w}),be.add(Te,"spawnOffsetMax",0,1,.05).name("Spawn Offset Max").onChange(w=>{Te.spawnOffsetMax=w});const et={currentOffset:Et};be.add(et,"currentOffset",0,1).name("Current Offset (Dynamic)").listen(),be.add(Te,"fadeInSpeed",.1,1,.01).name("Max Opacity").onChange(w=>{Te.fadeInSpeed=w}),be.add(Te,"fadeOutSpeed",.1,1,.01).name("Fade Strength").onChange(w=>{Te.fadeOutSpeed=w}),be.add(Te,"drawnLife",1,10,.1).name("Drawn Particle Life").onChange(w=>{Te.drawnLife=w}),be.add({movementThreshold:Bt},"movementThreshold",100,400,10).name("Initial Movement Needed").onChange(w=>{Bt=w}),be.add({resetActivation:function(){ct=!1,qt=0,It=[],Et=Te.spawnOffsetMin,xe=[],sn=[],vt=!1,$()}},"resetActivation").name("Reset Activation"),be.close();function ot(){const w=de.attributes.position.array,k=j.previousOffset||0,H=j.verticalOffset-k;j.previousOffset=j.verticalOffset;for(let Z=0;Z<ne;Z++){const ce=Z*3;w[ce+1]+=H;const re=w[ce+1]-j.verticalOffset,Ue=Se/2;re>Ue?w[ce+1]=-Ue+j.verticalOffset:re<-Ue&&(w[ce+1]=Ue+j.verticalOffset)}de.attributes.position.needsUpdate=!0}function Ze(){const w=de.attributes.position.array,k=de.attributes.color.array,H=de.attributes.size?de.attributes.size.array:null;ht+=.01;const Z=(ze-Ae)*j.scrollSpeed;if(Ae=ze*(1-j.damping)+Ae*j.damping,!window.particlesMovementPaused){for(let ce=0;ce<ne;ce++){const re=ce*3,Ue=H?(H[ce]-j.sizeMin)/(j.sizeMax-j.sizeMin):.5,Le=j.floatSpeed*(.5+Ue*.5);w[re]+=Ee[re]*Le,w[re+1]+=Ee[re+1]*Le,w[re+2]+=Ee[re+2]*Le,w[re+1]+=Z*(.5+Ue*.5),Math.abs(w[re])>Ge/2&&(Ee[re]*=-1);const bt=w[re+1]-j.verticalOffset,lt=Se/2;bt>lt?w[re+1]=-lt+j.verticalOffset:bt<-lt&&(w[re+1]=lt+j.verticalOffset),Math.abs(w[re+2])>250&&(Ee[re+2]*=-1)}de.attributes.position.needsUpdate=!0}for(let ce=0;ce<ne;ce++){const re=ce*3,Ue=H?(H[ce]-j.sizeMin)/(j.sizeMax-j.sizeMin):.5,Le=new Je(ae.color),bt=.2*Math.sin(ht+ce*.1)+.9,lt=.8+Ue*.6;k[re]=Le.r*bt*lt,k[re+1]=Le.g*bt*lt,k[re+2]=Le.b*bt*lt}de.attributes.color.needsUpdate=!0,requestAnimationFrame(Ze)}Ze();function ft(){if(requestAnimationFrame(ft),C.time.value+=.001,t()&&Date.now()-r>e){console.log("Timeout reached while above Phase 3 trigger (25s), stabilizing background effects");const k=C.time.value+C.colorCycleOffset.value;C.colorCycleOffset.value=k,C.time.value=0,r=Date.now()}if(We(),!window.particlesFullyHidden&&ue.uniforms.opacity.value<v&&(ue.uniforms.opacity.value+=.001,ue.uniforms.opacity.value>v&&(ue.uniforms.opacity.value=v)),window.particlesFullyHidden&&ue.uniforms.opacity.value>0&&(ue.uniforms.opacity.value=0),F&&U.autoRotate&&!U.rotationPaused){const w=U.baseRotateSpeed;F.rotation.y+=w*.01}y&&(y.rotation.set(0,0,0),B()),p.autoClear=!0,p.render(S,M),(!window.particlesFullyHidden||xe.length>0&&Te.enabled)&&(p.autoClear=!1,p.render(x,M))}ft(),document.addEventListener("veryEarlyParticleFade",()=>{console.log("veryEarlyParticleFade event received"),v=.3,ue&&ue.uniforms&&ue.uniforms.opacity&&(console.log("Starting immediate particle fade-in"),ue.uniforms.opacity.value<.1&&(ue.uniforms.opacity.value=.05))}),document.addEventListener("particleFadeStart",()=>{v=.3}),document.addEventListener("heroAnimationComplete",()=>{v=.5});function Ft(){if(y){const w=window.innerHeight,k=M.right-M.left,Z=(M.top-M.bottom)/w,ce=k,re=w*.66*Z;y.geometry.dispose(),y.geometry=new Gi(ce,re),y.rotation.set(0,0,0),B()}}let $t,Rt;function kt(){const w=window.innerWidth,k=_();if(p.setSize(w,k),M.left=-w/2,M.right=w/2,M.top=k/2,M.bottom=-k/2,M.updateProjectionMatrix(),C.resolution.value.set(w,k),_e.geometry.dispose(),_e.geometry=new Gi(w,k,w/10,k/10),Se=k*j.verticalSpread,Ge=w*j.horizontalSpread,typeof Y<"u"&&Y&&Y.__folders["Particle System"]){const H=Y.__folders["Particle System"];if(H&&H.__controllers){for(let Z=0;Z<H.__controllers.length;Z++)if(H.__controllers[Z].property==="verticalOffset"){H.__controllers[Z].min(-k*3),H.__controllers[Z].max(k*2);break}}}if(F&&U.responsive){clearTimeout(Rt),Rt=setTimeout(()=>{ke()},150);for(let H=0;H<mt.__controllers.length;H++){const Z=mt.__controllers[H];Z.property==="positionX"?(Z.min(-w/2),Z.max(w/2)):Z.property==="positionY"&&(Z.min(-k/2),Z.max(k/2))}}Ft()}window.addEventListener("resize",()=>{clearTimeout($t),clearTimeout(Rt),F&&U.responsive&&(Rt=setTimeout(()=>{ke()},150)),$t=setTimeout(kt,150)}),window.addEventListener("orientationchange",()=>{clearTimeout($t),clearTimeout(Rt),F&&U.responsive&&(Rt=setTimeout(()=>{ke()},300)),$t=setTimeout(kt,300)}),document.addEventListener("visibilitychange",()=>{if(document.visibilityState==="visible"){clearTimeout(Rt);const w=window.innerWidth,k=_();window.lastKnownDimensions||(window.lastKnownDimensions={width:w,height:k});const H=Math.abs(w-window.lastKnownDimensions.width)/window.lastKnownDimensions.width,Z=Math.abs(k-window.lastKnownDimensions.height)/window.lastKnownDimensions.height;H>.05||Z>.05?(window.lastKnownDimensions.width=w,window.lastKnownDimensions.height=k,F&&U.responsive&&(Rt=setTimeout(()=>{ke()},150)),setTimeout(kt,100)):console.log("Tab refocused but no significant viewport change, skipping resize")}else window.lastKnownDimensions={width:window.innerWidth,height:_()}});let st=_();function Qt(){const w=_();Math.abs(w-st)>50&&(kt(),st=w),requestAnimationFrame(Qt)}Qt(),window.addEventListener("keydown",w=>{if((w.key==="+"||w.key==="=")&&(T.zoom=Math.min(T.zoom+.1,5),M.zoom=T.zoom,M.updateProjectionMatrix(),typeof Y<"u"&&Y&&Y.__folders["Camera Controls"])){const k=Y.__folders["Camera Controls"];if(k&&k.__controllers){for(let H=0;H<k.__controllers.length;H++)if(k.__controllers[H].property==="zoom"){k.__controllers[H].updateDisplay();break}}}if((w.key==="-"||w.key==="_")&&(T.zoom=Math.max(T.zoom-.1,.1),M.zoom=T.zoom,M.updateProjectionMatrix(),typeof Y<"u"&&Y&&Y.__folders["Camera Controls"])){const k=Y.__folders["Camera Controls"];if(k&&k.__controllers){for(let H=0;H<k.__controllers.length;H++)if(k.__controllers[H].property==="zoom"){k.__controllers[H].updateDisplay();break}}}}),ye.add(j,"scrollSpeed",.001,.05,.018).name("Scroll Sensitivity").step(.001).onChange(w=>{j.scrollSpeed=w}),ye.add(j,"damping",.8,.99,.01).name("Scroll Damping").onChange(w=>{j.damping=w}),ye.add(j,"verticalSpread",1,5,.5).name("Vertical Spread").onChange(w=>{const k=Se;Se=window.innerHeight*w;const H=Se/k,Z=de.attributes.position.array;for(let ce=0;ce<ne;ce++){const re=ce*3,Le=(Z[re+1]-j.verticalOffset)*H;Z[re+1]=Le+j.verticalOffset,Math.abs(Le)>Se/2&&(Z[re+1]=(Math.random()-.5)*Se+j.verticalOffset)}de.attributes.position.needsUpdate=!0}),ye.add(j,"horizontalSpread",.02,5,.01).name("Horizontal Spread").onChange(w=>{const k=Ge;Ge=window.innerWidth*w;const H=Ge/k,Z=de.attributes.position.array;for(let ce=0;ce<ne;ce++){const re=ce*3,Le=Z[re]*H;Z[re]=Le,Math.abs(Le)>Ge/2&&(Z[re]=(Math.random()-.5)*Ge)}de.attributes.position.needsUpdate=!0}),ye.add(j,"verticalOffset",-window.innerHeight*3,window.innerHeight*2,10).name("Vertical Position").onChange(w=>{j.previousOffset===void 0&&(j.previousOffset=0),j.verticalOffset=w,ot()}),ye.add(j,"sizeMin",1,5,.01).name("Min Particle Size").onChange(w=>{if(j.sizeMin=w,j.sizeMin>=j.sizeMax&&(j.sizeMax=j.sizeMin+1,typeof Y<"u"&&Y&&Y.__folders["Particle System"])){const k=Y.__folders["Particle System"];if(k&&k.__controllers){for(let H=0;H<k.__controllers.length;H++)if(k.__controllers[H].property==="sizeMax"){k.__controllers[H].updateDisplay();break}}}$e()}),ye.add(j,"sizeMax",5,10,.01).name("Max Particle Size").onChange(w=>{if(j.sizeMax=w,j.sizeMax<=j.sizeMin&&(j.sizeMin=j.sizeMax-1,typeof Y<"u"&&Y&&Y.__folders["Particle System"])){const k=Y.__folders["Particle System"];if(k&&k.__controllers){for(let H=0;H<k.__controllers.length;H++)if(k.__controllers[H].property==="sizeMin"){k.__controllers[H].updateDisplay();break}}}$e()}),ye.add(j,"floatSpeed",.1,3,.1).name("Float Speed").onChange(w=>{j.floatSpeed=w}),$e();const Ot=de.attributes.position.array;for(let w=0;w<ne;w++){const k=w*3;Ot[k+1]=(Math.random()-.5)*Se+j.verticalOffset}de.attributes.position.needsUpdate=!0,ye.add(ue.uniforms.haloStrength,"value",0,2,.1).name("Halo Intensity").onChange(w=>{ue.uniforms.haloStrength.value=w}),ye.add(ue.uniforms.haloSize,"value",1,2,.1).name("Halo Size").onChange(w=>{ue.uniforms.haloSize.value=w});let Dn;window.addEventListener("scroll",()=>{Dn&&clearTimeout(Dn),Dn=setTimeout(()=>{},150)})}function Is(){const r=window.gui,e=window.uniforms;if(typeof r>"u"||!r||!r.__folders||!r.__folders["Lighting Controls"])return;const t=r.__folders["Lighting Controls"];for(let n=0;n<t.__controllers.length;n++){const i=t.__controllers[n];i.property==="value"&&i.object===e.ambientLight&&i.setValue(e.ambientLight.value),i.property==="value"&&i.object===e.directionalLight&&i.setValue(e.directionalLight.value)}}function Mr(){const r=window.gui,e=window.uniforms;if(r.__folders["Animation Speed Controls"]){const t=r.__folders["Animation Speed Controls"];for(let n=0;n<t.__controllers.length;n++){const i=t.__controllers[n];if(i.property==="value"&&i.object===e.waveSpeed){i.setValue(e.waveSpeed.value);break}}}if(r.__folders["Wave Controls"]){const t=r.__folders["Wave Controls"];for(let n=0;n<t.__controllers.length;n++){const i=t.__controllers[n];i.property==="value"&&i.object===e.waveAmplitude&&i.setValue(e.waveAmplitude.value),i.property==="value"&&i.object===e.waveFrequency&&i.setValue(e.waveFrequency.value)}}else console.log("WARNING: Wave Controls folder not found")}const b1="/150-lab/assets/video/acs-150-compressed.mp4",S1="/150-lab/assets/images/anniversary-video-poster.jpg";let bd=!1;function w1(){const r=document.getElementById("anniversary-video"),e=document.querySelector("#video");if(!r||!e)return;r.src=b1,r.poster=S1,r.addEventListener("error",Y=>{var Re,Q;console.error("Video loading error:",Y),console.error("Video src:",r.src),console.error("Video error code:",(Re=r.error)==null?void 0:Re.code),console.error("Video error message:",(Q=r.error)==null?void 0:Q.message)}),r.addEventListener("loadeddata",()=>{r.style.opacity="1",r.pause()}),r.addEventListener("loadedmetadata",()=>{r.style.display="none",r.offsetHeight,r.style.display=""});const t=document.createElement("div");t.className="video-overlay";const n=document.createElement("div");n.className="play-button",t.appendChild(n),r.parentNode.insertBefore(t,r.nextSibling);const i=document.createElement("div");i.className="video-audio-slider",i.innerHTML=`
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
  `,r.parentNode.appendChild(c);let h=!1;const _=.3,g=.18,m=()=>{const Re=r.volume/_*100;o.style.width=Re+"%",a.style.left=Re+"%"},p=Y=>{const Re=s.getBoundingClientRect(),se=Math.max(0,Math.min(100,(Y-Re.left)/Re.width*100))/100*_;if(console.log("Video slider moved to volume:",se,"Global muted:",window.audioMuted),window.audioMuted&&se>0){console.log("User dragged video slider while globally muted - unmuting global audio");const Me=document.querySelector(".sound-toggle");Me&&Me.classList.contains("muted")&&(console.log("Programmatically clicking sound toggle to unmute"),bd=!0,Me.click(),setTimeout(()=>{bd=!1},100))}se>0?r.muted=!1:r.muted=!0,r.volume=se,se>0&&(K=se),m(),console.log("Video volume set to:",r.volume,"Video muted:",r.muted)};s.addEventListener("mousedown",Y=>{h=!0,p(Y.clientX),Y.preventDefault()}),document.addEventListener("mousemove",Y=>{h&&p(Y.clientX)}),document.addEventListener("mouseup",()=>{h=!1});const S=r.parentNode;S.addEventListener("mouseenter",()=>{r.paused||(i.style.opacity="1",i.style.pointerEvents="auto")}),S.addEventListener("mouseleave",()=>{i.style.opacity="0",i.style.pointerEvents="none"}),r.addEventListener("volumechange",m),r.volume=g,window.audioMuted?(r.muted=!0,r.volume=0):r.muted=!1,m();let x=!1;const v=()=>{if(r.duration&&!x){const Y=r.currentTime/r.duration*100;d.style.transition="none",d.style.width=Y+"%",f.style.left=Y+"%"}},T=Y=>{const Re=u.getBoundingClientRect(),se=Math.max(0,Math.min(100,(Y-Re.left)/Re.width*100))/100*r.duration;r.currentTime=se,v(),r.paused||D()},M=()=>{d.style.transition="none",f.style.transition="opacity 0.2s"},E=()=>{d.style.transition="width 0.1s linear",f.style.transition="opacity 0.2s"};u.addEventListener("mousedown",Y=>{x=!0,M(),T(Y.clientX),Y.preventDefault()}),u.addEventListener("click",Y=>{x||(M(),T(Y.clientX),setTimeout(()=>{E()},50))}),document.addEventListener("mousemove",Y=>{x&&T(Y.clientX)}),document.addEventListener("mouseup",()=>{x=!1,E()}),c.addEventListener("mouseenter",()=>{f.style.opacity="1",c.style.height="8px",c.style.background="rgba(0, 0, 0, 0.3)"}),c.addEventListener("mouseleave",()=>{x||(f.style.opacity="0"),c.style.height="4px",c.style.background="rgba(0, 0, 0, 0)"});let P=null,y=0;const b=()=>{if(r.duration&&!x&&!r.paused){const Y=performance.now();if(Y-y>=16.67){const Re=r.currentTime/r.duration*100;d.style.width=Re+"%",f.style.left=Re+"%",y=Y}P=requestAnimationFrame(b)}},D=()=>{P&&cancelAnimationFrame(P),y=performance.now(),P=requestAnimationFrame(b)},B=()=>{P&&(cancelAnimationFrame(P),P=null)};r.addEventListener("play",D),r.addEventListener("pause",B),r.addEventListener("timeupdate",v),v();const U=(Y,Re,Q=1e3)=>{if(!Y)return;const se=Y.volume,Me=performance.now(),ve=De=>{const Qe=De-Me,Pe=Math.min(Qe/Q,1),nt=Pe*Pe;Y.volume=se+(Re-se)*nt,Pe<1&&requestAnimationFrame(ve)};requestAnimationFrame(ve)};let K=g,F=null;const C=()=>{r.paused||(K=r.volume,U(r,0,600),F=setTimeout(()=>{r.pause(),t.classList.remove("hidden"),i.style.opacity="0",i.style.pointerEvents="none",window.backgroundAudio&&!window.audioMuted&&U(window.backgroundAudio,.25),F=null},600))},J=()=>{r.paused||(F&&(clearTimeout(F),F=null),r.pause(),t.classList.remove("hidden"),i.style.opacity="0",i.style.pointerEvents="none",window.backgroundAudio&&!window.audioMuted&&U(window.backgroundAudio,.25))},X=()=>{r.paused?(F&&(clearTimeout(F),F=null),r.play(),t.classList.add("hidden"),window.backgroundAudio&&U(window.backgroundAudio,0),window.audioMuted?(r.volume=0,r.muted=!0):(r.muted=!1,r.volume=K),m(),D()):J()};t.addEventListener("click",X),r.addEventListener("click",X),r.addEventListener("ended",()=>{t.classList.remove("hidden"),i.style.opacity="0",i.style.pointerEvents="none",window.backgroundAudio&&!window.audioMuted&&U(window.backgroundAudio,.25)}),r.addEventListener("pause",()=>{t.classList.remove("hidden"),i.style.opacity="0",i.style.pointerEvents="none",window.backgroundAudio&&!window.audioMuted&&U(window.backgroundAudio,.25)}),new IntersectionObserver(Y=>{Y.forEach(Re=>{Re.isIntersecting||C()})},{threshold:.5}).observe(e);const I=()=>{console.log("=== updateVideoAudioState called ==="),console.log("Video state:",{paused:r.paused,ended:r.ended,currentTime:r.currentTime,duration:r.duration}),console.log("Audio state:",{globalMuted:window.audioMuted,currentVideoVolume:r.volume,videoElementMuted:r.muted,originalVideoVolume:K,backgroundAudioPaused:window.backgroundAudio?window.backgroundAudio.paused:"no background audio"}),!r.paused&&!r.ended?(console.log("Video is actively playing, updating volume..."),window.audioMuted?(console.log("Global audio is muted, muting video"),r.volume=0,r.muted=!0):(console.log("Global audio is unmuted, restoring video volume to:",K),r.muted=!1,bd?console.log("Unmute triggered by video slider - keeping current video volume:",r.volume):(r.volume=K,console.log("Restored volume to originalVideoVolume:",K)),window.backgroundAudio&&!window.backgroundAudio.paused&&(console.log("Fading out background audio since video is playing"),U(window.backgroundAudio,0))),m(),console.log("Video updated - Volume:",r.volume,"Muted:",r.muted)):console.log("Video is not playing, skipping volume update. Paused:",r.paused,"Ended:",r.ended),console.log("=== updateVideoAudioState complete ===")},_e=document.querySelector(".sound-toggle");if(_e){_e.addEventListener("click",()=>{console.log("Sound toggle clicked - Method 1"),setTimeout(()=>{console.log("Processing sound toggle click after delay"),I()},50)}),new MutationObserver(Q=>{Q.forEach(se=>{se.type==="attributes"&&se.attributeName==="class"&&(console.log("Sound toggle class changed - Method 2"),setTimeout(()=>{console.log("Processing class change after delay"),I()},50))})}).observe(_e,{attributes:!0,attributeFilter:["class"]});let Re=window.audioMuted;console.log("Initial audio mute state:",Re),setInterval(()=>{window.audioMuted!==Re&&(console.log("Audio mute state changed via polling - Method 3",{was:Re,now:window.audioMuted}),Re=window.audioMuted,I())},500),setTimeout(()=>{console.log("Running initial video audio state check"),I()},1e3)}}function M1(r,e){for(var t=0;t<e.length;t++){var n=e[t];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(r,n.key,n)}}function E1(r,e,t){return e&&M1(r.prototype,e),r}/*!
 * Observer 3.12.7
 * https://gsap.com
 *
 * @license Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license or for
 * Club GSAP members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/var Un,Xc,vi,rs,ss,Zo,t0,ks,al,n0,Nr,Vi,i0,r0=function(){return Un||typeof window<"u"&&(Un=window.gsap)&&Un.registerPlugin&&Un},s0=1,Wo=[],wt=[],dr=[],ll=Date.now,kf=function(e,t){return t},T1=function(){var e=al.core,t=e.bridge||{},n=e._scrollers,i=e._proxies;n.push.apply(n,wt),i.push.apply(i,dr),wt=n,dr=i,kf=function(o,a){return t[o](a)}},ps=function(e,t){return~dr.indexOf(e)&&dr[dr.indexOf(e)+1][t]},cl=function(e){return!!~n0.indexOf(e)},Yn=function(e,t,n,i,s){return e.addEventListener(t,n,{passive:i!==!1,capture:!!s})},qn=function(e,t,n,i){return e.removeEventListener(t,n,!!i)},Sc="scrollLeft",wc="scrollTop",Bf=function(){return Nr&&Nr.isPressed||wt.cache++},uu=function(e,t){var n=function i(s){if(s||s===0){s0&&(vi.history.scrollRestoration="manual");var o=Nr&&Nr.isPressed;s=i.v=Math.round(s)||(Nr&&Nr.iOS?1:0),e(s),i.cacheID=wt.cache,o&&kf("ss",s)}else(t||wt.cache!==i.cacheID||kf("ref"))&&(i.cacheID=wt.cache,i.v=e());return i.v+i.offset};return n.offset=0,e&&n},Qn={s:Sc,p:"left",p2:"Left",os:"right",os2:"Right",d:"width",d2:"Width",a:"x",sc:uu(function(r){return arguments.length?vi.scrollTo(r,wn.sc()):vi.pageXOffset||rs[Sc]||ss[Sc]||Zo[Sc]||0})},wn={s:wc,p:"top",p2:"Top",os:"bottom",os2:"Bottom",d:"height",d2:"Height",a:"y",op:Qn,sc:uu(function(r){return arguments.length?vi.scrollTo(Qn.sc(),r):vi.pageYOffset||rs[wc]||ss[wc]||Zo[wc]||0})},ii=function(e,t){return(t&&t._ctx&&t._ctx.selector||Un.utils.toArray)(e)[0]||(typeof e=="string"&&Un.config().nullTargetWarn!==!1?console.warn("Element not found:",e):null)},ys=function(e,t){var n=t.s,i=t.sc;cl(e)&&(e=rs.scrollingElement||ss);var s=wt.indexOf(e),o=i===wn.sc?1:2;!~s&&(s=wt.push(e)-1),wt[s+o]||Yn(e,"scroll",Bf);var a=wt[s+o],l=a||(wt[s+o]=uu(ps(e,n),!0)||(cl(e)?i:uu(function(c){return arguments.length?e[n]=c:e[n]})));return l.target=e,a||(l.smooth=Un.getProperty(e,"scrollBehavior")==="smooth"),l},zf=function(e,t,n){var i=e,s=e,o=ll(),a=o,l=t||50,c=Math.max(500,l*3),u=function(_,g){var m=ll();g||m-o>l?(s=i,i=_,a=o,o=m):n?i+=_:i=s+(_-s)/(m-a)*(o-a)},d=function(){s=i=n?0:i,a=o=0},f=function(_){var g=a,m=s,p=ll();return(_||_===0)&&_!==i&&u(_),o===a||p-a>c?0:(i+(n?m:-m))/((n?p:o)-g)*1e3};return{update:u,reset:d,getVelocity:f}},Ba=function(e,t){return t&&!e._gsapAllow&&e.preventDefault(),e.changedTouches?e.changedTouches[0]:e},ng=function(e){var t=Math.max.apply(Math,e),n=Math.min.apply(Math,e);return Math.abs(t)>=Math.abs(n)?t:n},o0=function(){al=Un.core.globals().ScrollTrigger,al&&al.core&&T1()},a0=function(e){return Un=e||r0(),!Xc&&Un&&typeof document<"u"&&document.body&&(vi=window,rs=document,ss=rs.documentElement,Zo=rs.body,n0=[vi,rs,ss,Zo],Un.utils.clamp,i0=Un.core.context||function(){},ks="onpointerenter"in Zo?"pointer":"mouse",t0=mn.isTouch=vi.matchMedia&&vi.matchMedia("(hover: none), (pointer: coarse)").matches?1:"ontouchstart"in vi||navigator.maxTouchPoints>0||navigator.msMaxTouchPoints>0?2:0,Vi=mn.eventTypes=("ontouchstart"in ss?"touchstart,touchmove,touchcancel,touchend":"onpointerdown"in ss?"pointerdown,pointermove,pointercancel,pointerup":"mousedown,mousemove,mouseup,mouseup").split(","),setTimeout(function(){return s0=0},500),o0(),Xc=1),Xc};Qn.op=wn;wt.cache=0;var mn=function(){function r(t){this.init(t)}var e=r.prototype;return e.init=function(n){Xc||a0(Un)||console.warn("Please gsap.registerPlugin(Observer)"),al||o0();var i=n.tolerance,s=n.dragMinimum,o=n.type,a=n.target,l=n.lineHeight,c=n.debounce,u=n.preventDefault,d=n.onStop,f=n.onStopDelay,h=n.ignore,_=n.wheelSpeed,g=n.event,m=n.onDragStart,p=n.onDragEnd,S=n.onDrag,x=n.onPress,v=n.onRelease,T=n.onRight,M=n.onLeft,E=n.onUp,P=n.onDown,y=n.onChangeX,b=n.onChangeY,D=n.onChange,B=n.onToggleX,U=n.onToggleY,K=n.onHover,F=n.onHoverEnd,C=n.onMove,J=n.ignoreCheck,X=n.isNormalizer,me=n.onGestureStart,I=n.onGestureEnd,_e=n.onWheel,Y=n.onEnable,Re=n.onDisable,Q=n.onClick,se=n.scrollSpeed,Me=n.capture,ve=n.allowClicks,De=n.lockAxis,Qe=n.onLockAxis;this.target=a=ii(a)||ss,this.vars=n,h&&(h=Un.utils.toArray(h)),i=i||1e-9,s=s||0,_=_||1,se=se||1,o=o||"wheel,touch,pointer",c=c!==!1,l||(l=parseFloat(vi.getComputedStyle(Zo).lineHeight)||22);var Pe,nt,pt,Fe,O,Dt,Xe,q=this,Oe=0,dt=0,He=n.passive||!u&&n.passive!==!1,ke=ys(a,Qn),mt=ys(a,wn),L=ke(),A=mt(),W=~o.indexOf("touch")&&!~o.indexOf("pointer")&&Vi[0]==="pointerdown",oe=cl(a),ne=a.ownerDocument||rs,ie=[0,0,0],Ee=[0,0,0],ge=0,ze=function(){return ge=ll()},Ae=function(qe,ht){return(q.event=qe)&&h&&~h.indexOf(qe.target)||ht&&W&&qe.pointerType!=="touch"||J&&J(qe,ht)},j=function(){q._vx.reset(),q._vy.reset(),nt.pause(),d&&d(q)},Se=function(){var qe=q.deltaX=ng(ie),ht=q.deltaY=ng(Ee),xe=Math.abs(qe)>=i,Ke=Math.abs(ht)>=i;D&&(xe||Ke)&&D(q,qe,ht,ie,Ee),xe&&(T&&q.deltaX>0&&T(q),M&&q.deltaX<0&&M(q),y&&y(q),B&&q.deltaX<0!=Oe<0&&B(q),Oe=q.deltaX,ie[0]=ie[1]=ie[2]=0),Ke&&(P&&q.deltaY>0&&P(q),E&&q.deltaY<0&&E(q),b&&b(q),U&&q.deltaY<0!=dt<0&&U(q),dt=q.deltaY,Ee[0]=Ee[1]=Ee[2]=0),(Fe||pt)&&(C&&C(q),pt&&(m&&pt===1&&m(q),S&&S(q),pt=0),Fe=!1),Dt&&!(Dt=!1)&&Qe&&Qe(q),O&&(_e(q),O=!1),Pe=0},Ge=function(qe,ht,xe){ie[xe]+=qe,Ee[xe]+=ht,q._vx.update(qe),q._vy.update(ht),c?Pe||(Pe=requestAnimationFrame(Se)):Se()},$e=function(qe,ht){De&&!Xe&&(q.axis=Xe=Math.abs(qe)>Math.abs(ht)?"x":"y",Dt=!0),Xe!=="y"&&(ie[2]+=qe,q._vx.update(qe,!0)),Xe!=="x"&&(Ee[2]+=ht,q._vy.update(ht,!0)),c?Pe||(Pe=requestAnimationFrame(Se)):Se()},de=function(qe){if(!Ae(qe,1)){qe=Ba(qe,u);var ht=qe.clientX,xe=qe.clientY,Ke=ht-q.x,Ye=xe-q.y,at=q.isDragging;q.x=ht,q.y=xe,(at||(Ke||Ye)&&(Math.abs(q.startX-ht)>=s||Math.abs(q.startY-xe)>=s))&&(pt=at?2:1,at||(q.isDragging=!0),$e(Ke,Ye))}},it=q.onPress=function(we){Ae(we,1)||we&&we.button||(q.axis=Xe=null,nt.pause(),q.isPressed=!0,we=Ba(we),Oe=dt=0,q.startX=q.x=we.clientX,q.startY=q.y=we.clientY,q._vx.reset(),q._vy.reset(),Yn(X?a:ne,Vi[1],de,He,!0),q.deltaX=q.deltaY=0,x&&x(q))},N=q.onRelease=function(we){if(!Ae(we,1)){qn(X?a:ne,Vi[1],de,!0);var qe=!isNaN(q.y-q.startY),ht=q.isDragging,xe=ht&&(Math.abs(q.x-q.startX)>3||Math.abs(q.y-q.startY)>3),Ke=Ba(we);!xe&&qe&&(q._vx.reset(),q._vy.reset(),u&&ve&&Un.delayedCall(.08,function(){if(ll()-ge>300&&!we.defaultPrevented){if(we.target.click)we.target.click();else if(ne.createEvent){var Ye=ne.createEvent("MouseEvents");Ye.initMouseEvent("click",!0,!0,vi,1,Ke.screenX,Ke.screenY,Ke.clientX,Ke.clientY,!1,!1,!1,!1,0,null),we.target.dispatchEvent(Ye)}}})),q.isDragging=q.isGesturing=q.isPressed=!1,d&&ht&&!X&&nt.restart(!0),pt&&Se(),p&&ht&&p(q),v&&v(q,xe)}},ue=function(qe){return qe.touches&&qe.touches.length>1&&(q.isGesturing=!0)&&me(qe,q.isDragging)},fe=function(){return(q.isGesturing=!1)||I(q)},ye=function(qe){if(!Ae(qe)){var ht=ke(),xe=mt();Ge((ht-L)*se,(xe-A)*se,1),L=ht,A=xe,d&&nt.restart(!0)}},pe=function(qe){if(!Ae(qe)){qe=Ba(qe,u),_e&&(O=!0);var ht=(qe.deltaMode===1?l:qe.deltaMode===2?vi.innerHeight:1)*_;Ge(qe.deltaX*ht,qe.deltaY*ht,0),d&&!X&&nt.restart(!0)}},ae=function(qe){if(!Ae(qe)){var ht=qe.clientX,xe=qe.clientY,Ke=ht-q.x,Ye=xe-q.y;q.x=ht,q.y=xe,Fe=!0,d&&nt.restart(!0),(Ke||Ye)&&$e(Ke,Ye)}},Be=function(qe){q.event=qe,K(q)},rt=function(qe){q.event=qe,F(q)},Ut=function(qe){return Ae(qe)||Ba(qe,u)&&Q(q)};nt=q._dc=Un.delayedCall(f||.25,j).pause(),q.deltaX=q.deltaY=0,q._vx=zf(0,50,!0),q._vy=zf(0,50,!0),q.scrollX=ke,q.scrollY=mt,q.isDragging=q.isGesturing=q.isPressed=!1,i0(this),q.enable=function(we){return q.isEnabled||(Yn(oe?ne:a,"scroll",Bf),o.indexOf("scroll")>=0&&Yn(oe?ne:a,"scroll",ye,He,Me),o.indexOf("wheel")>=0&&Yn(a,"wheel",pe,He,Me),(o.indexOf("touch")>=0&&t0||o.indexOf("pointer")>=0)&&(Yn(a,Vi[0],it,He,Me),Yn(ne,Vi[2],N),Yn(ne,Vi[3],N),ve&&Yn(a,"click",ze,!0,!0),Q&&Yn(a,"click",Ut),me&&Yn(ne,"gesturestart",ue),I&&Yn(ne,"gestureend",fe),K&&Yn(a,ks+"enter",Be),F&&Yn(a,ks+"leave",rt),C&&Yn(a,ks+"move",ae)),q.isEnabled=!0,q.isDragging=q.isGesturing=q.isPressed=Fe=pt=!1,q._vx.reset(),q._vy.reset(),L=ke(),A=mt(),we&&we.type&&it(we),Y&&Y(q)),q},q.disable=function(){q.isEnabled&&(Wo.filter(function(we){return we!==q&&cl(we.target)}).length||qn(oe?ne:a,"scroll",Bf),q.isPressed&&(q._vx.reset(),q._vy.reset(),qn(X?a:ne,Vi[1],de,!0)),qn(oe?ne:a,"scroll",ye,Me),qn(a,"wheel",pe,Me),qn(a,Vi[0],it,Me),qn(ne,Vi[2],N),qn(ne,Vi[3],N),qn(a,"click",ze,!0),qn(a,"click",Ut),qn(ne,"gesturestart",ue),qn(ne,"gestureend",fe),qn(a,ks+"enter",Be),qn(a,ks+"leave",rt),qn(a,ks+"move",ae),q.isEnabled=q.isPressed=q.isDragging=!1,Re&&Re(q))},q.kill=q.revert=function(){q.disable();var we=Wo.indexOf(q);we>=0&&Wo.splice(we,1),Nr===q&&(Nr=0)},Wo.push(q),X&&cl(a)&&(Nr=q),q.enable(g)},E1(r,[{key:"velocityX",get:function(){return this._vx.getVelocity()}},{key:"velocityY",get:function(){return this._vy.getVelocity()}}]),r}();mn.version="3.12.7";mn.create=function(r){return new mn(r)};mn.register=a0;mn.getAll=function(){return Wo.slice()};mn.getById=function(r){return Wo.filter(function(e){return e.vars.id===r})[0]};r0()&&Un.registerPlugin(mn);/*!
 * ScrollTrigger 3.12.7
 * https://gsap.com
 *
 * @license Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license or for
 * Club GSAP members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/var je,zo,St,tn,_i,Vt,zh,du,Pl,ul,qa,Mc,zn,Cu,Hf,Kn,ig,rg,Ho,l0,Sd,c0,$n,Vf,u0,d0,ts,Gf,Hh,Jo,Vh,fu,Wf,wd,Ec=1,Hn=Date.now,Md=Hn(),Fi=0,Ya=0,sg=function(e,t,n){var i=mi(e)&&(e.substr(0,6)==="clamp("||e.indexOf("max")>-1);return n["_"+t+"Clamp"]=i,i?e.substr(6,e.length-7):e},og=function(e,t){return t&&(!mi(e)||e.substr(0,6)!=="clamp(")?"clamp("+e+")":e},A1=function r(){return Ya&&requestAnimationFrame(r)},ag=function(){return Cu=1},lg=function(){return Cu=0},nr=function(e){return e},ja=function(e){return Math.round(e*1e5)/1e5||0},f0=function(){return typeof window<"u"},h0=function(){return je||f0()&&(je=window.gsap)&&je.registerPlugin&&je},oo=function(e){return!!~zh.indexOf(e)},p0=function(e){return(e==="Height"?Vh:St["inner"+e])||_i["client"+e]||Vt["client"+e]},m0=function(e){return ps(e,"getBoundingClientRect")||(oo(e)?function(){return Kc.width=St.innerWidth,Kc.height=Vh,Kc}:function(){return Pr(e)})},C1=function(e,t,n){var i=n.d,s=n.d2,o=n.a;return(o=ps(e,"getBoundingClientRect"))?function(){return o()[i]}:function(){return(t?p0(s):e["client"+s])||0}},R1=function(e,t){return!t||~dr.indexOf(e)?m0(e):function(){return Kc}},ar=function(e,t){var n=t.s,i=t.d2,s=t.d,o=t.a;return Math.max(0,(n="scroll"+i)&&(o=ps(e,n))?o()-m0(e)()[s]:oo(e)?(_i[n]||Vt[n])-p0(i):e[n]-e["offset"+i])},Tc=function(e,t){for(var n=0;n<Ho.length;n+=3)(!t||~t.indexOf(Ho[n+1]))&&e(Ho[n],Ho[n+1],Ho[n+2])},mi=function(e){return typeof e=="string"},Vn=function(e){return typeof e=="function"},$a=function(e){return typeof e=="number"},Bs=function(e){return typeof e=="object"},za=function(e,t,n){return e&&e.progress(t?0:1)&&n&&e.pause()},Ed=function(e,t){if(e.enabled){var n=e._ctx?e._ctx.add(function(){return t(e)}):t(e);n&&n.totalTime&&(e.callbackAnimation=n)}},Oo=Math.abs,g0="left",_0="top",Gh="right",Wh="bottom",Ks="width",Zs="height",dl="Right",fl="Left",hl="Top",pl="Bottom",yn="padding",Pi="margin",ma="Width",Xh="Height",Sn="px",Li=function(e){return St.getComputedStyle(e)},P1=function(e){var t=Li(e).position;e.style.position=t==="absolute"||t==="fixed"?t:"relative"},cg=function(e,t){for(var n in t)n in e||(e[n]=t[n]);return e},Pr=function(e,t){var n=t&&Li(e)[Hf]!=="matrix(1, 0, 0, 1, 0, 0)"&&je.to(e,{x:0,y:0,xPercent:0,yPercent:0,rotation:0,rotationX:0,rotationY:0,scale:1,skewX:0,skewY:0}).progress(1),i=e.getBoundingClientRect();return n&&n.progress(0).kill(),i},hu=function(e,t){var n=t.d2;return e["offset"+n]||e["client"+n]||0},v0=function(e){var t=[],n=e.labels,i=e.duration(),s;for(s in n)t.push(n[s]/i);return t},L1=function(e){return function(t){return je.utils.snap(v0(e),t)}},qh=function(e){var t=je.utils.snap(e),n=Array.isArray(e)&&e.slice(0).sort(function(i,s){return i-s});return n?function(i,s,o){o===void 0&&(o=.001);var a;if(!s)return t(i);if(s>0){for(i-=o,a=0;a<n.length;a++)if(n[a]>=i)return n[a];return n[a-1]}else for(a=n.length,i+=o;a--;)if(n[a]<=i)return n[a];return n[0]}:function(i,s,o){o===void 0&&(o=.001);var a=t(i);return!s||Math.abs(a-i)<o||a-i<0==s<0?a:t(s<0?i-e:i+e)}},D1=function(e){return function(t,n){return qh(v0(e))(t,n.direction)}},Ac=function(e,t,n,i){return n.split(",").forEach(function(s){return e(t,s,i)})},Rn=function(e,t,n,i,s){return e.addEventListener(t,n,{passive:!i,capture:!!s})},Cn=function(e,t,n,i){return e.removeEventListener(t,n,!!i)},Cc=function(e,t,n){n=n&&n.wheelHandler,n&&(e(t,"wheel",n),e(t,"touchmove",n))},ug={startColor:"green",endColor:"red",indent:0,fontSize:"16px",fontWeight:"normal"},Rc={toggleActions:"play",anticipatePin:0},pu={top:0,left:0,center:.5,bottom:1,right:1},qc=function(e,t){if(mi(e)){var n=e.indexOf("="),i=~n?+(e.charAt(n-1)+1)*parseFloat(e.substr(n+1)):0;~n&&(e.indexOf("%")>n&&(i*=t/100),e=e.substr(0,n-1)),e=i+(e in pu?pu[e]*t:~e.indexOf("%")?parseFloat(e)*t/100:parseFloat(e)||0)}return e},Pc=function(e,t,n,i,s,o,a,l){var c=s.startColor,u=s.endColor,d=s.fontSize,f=s.indent,h=s.fontWeight,_=tn.createElement("div"),g=oo(n)||ps(n,"pinType")==="fixed",m=e.indexOf("scroller")!==-1,p=g?Vt:n,S=e.indexOf("start")!==-1,x=S?c:u,v="border-color:"+x+";font-size:"+d+";color:"+x+";font-weight:"+h+";pointer-events:none;white-space:nowrap;font-family:sans-serif,Arial;z-index:1000;padding:4px 8px;border-width:0;border-style:solid;";return v+="position:"+((m||l)&&g?"fixed;":"absolute;"),(m||l||!g)&&(v+=(i===wn?Gh:Wh)+":"+(o+parseFloat(f))+"px;"),a&&(v+="box-sizing:border-box;text-align:left;width:"+a.offsetWidth+"px;"),_._isStart=S,_.setAttribute("class","gsap-marker-"+e+(t?" marker-"+t:"")),_.style.cssText=v,_.innerText=t||t===0?e+"-"+t:e,p.children[0]?p.insertBefore(_,p.children[0]):p.appendChild(_),_._offset=_["offset"+i.op.d2],Yc(_,0,i,S),_},Yc=function(e,t,n,i){var s={display:"block"},o=n[i?"os2":"p2"],a=n[i?"p2":"os2"];e._isFlipped=i,s[n.a+"Percent"]=i?-100:0,s[n.a]=i?"1px":0,s["border"+o+ma]=1,s["border"+a+ma]=0,s[n.p]=t+"px",je.set(e,s)},xt=[],Xf={},Ll,dg=function(){return Hn()-Fi>34&&(Ll||(Ll=requestAnimationFrame(Br)))},No=function(){(!$n||!$n.isPressed||$n.startX>Vt.clientWidth)&&(wt.cache++,$n?Ll||(Ll=requestAnimationFrame(Br)):Br(),Fi||lo("scrollStart"),Fi=Hn())},Td=function(){d0=St.innerWidth,u0=St.innerHeight},Ka=function(e){wt.cache++,(e===!0||!zn&&!c0&&!tn.fullscreenElement&&!tn.webkitFullscreenElement&&(!Vf||d0!==St.innerWidth||Math.abs(St.innerHeight-u0)>St.innerHeight*.25))&&du.restart(!0)},ao={},I1=[],y0=function r(){return Cn(Ve,"scrollEnd",r)||Xs(!0)},lo=function(e){return ao[e]&&ao[e].map(function(t){return t()})||I1},pi=[],x0=function(e){for(var t=0;t<pi.length;t+=5)(!e||pi[t+4]&&pi[t+4].query===e)&&(pi[t].style.cssText=pi[t+1],pi[t].getBBox&&pi[t].setAttribute("transform",pi[t+2]||""),pi[t+3].uncache=1)},Yh=function(e,t){var n;for(Kn=0;Kn<xt.length;Kn++)n=xt[Kn],n&&(!t||n._ctx===t)&&(e?n.kill(1):n.revert(!0,!0));fu=!0,t&&x0(t),t||lo("revert")},b0=function(e,t){wt.cache++,(t||!Zn)&&wt.forEach(function(n){return Vn(n)&&n.cacheID++&&(n.rec=0)}),mi(e)&&(St.history.scrollRestoration=Hh=e)},Zn,Js=0,fg,O1=function(){if(fg!==Js){var e=fg=Js;requestAnimationFrame(function(){return e===Js&&Xs(!0)})}},S0=function(){Vt.appendChild(Jo),Vh=!$n&&Jo.offsetHeight||St.innerHeight,Vt.removeChild(Jo)},hg=function(e){return Pl(".gsap-marker-start, .gsap-marker-end, .gsap-marker-scroller-start, .gsap-marker-scroller-end").forEach(function(t){return t.style.display=e?"none":"block"})},Xs=function(e,t){if(_i=tn.documentElement,Vt=tn.body,zh=[St,tn,_i,Vt],Fi&&!e&&!fu){Rn(Ve,"scrollEnd",y0);return}S0(),Zn=Ve.isRefreshing=!0,wt.forEach(function(i){return Vn(i)&&++i.cacheID&&(i.rec=i())});var n=lo("refreshInit");l0&&Ve.sort(),t||Yh(),wt.forEach(function(i){Vn(i)&&(i.smooth&&(i.target.style.scrollBehavior="auto"),i(0))}),xt.slice(0).forEach(function(i){return i.refresh()}),fu=!1,xt.forEach(function(i){if(i._subPinOffset&&i.pin){var s=i.vars.horizontal?"offsetWidth":"offsetHeight",o=i.pin[s];i.revert(!0,1),i.adjustPinSpacing(i.pin[s]-o),i.refresh()}}),Wf=1,hg(!0),xt.forEach(function(i){var s=ar(i.scroller,i._dir),o=i.vars.end==="max"||i._endClamp&&i.end>s,a=i._startClamp&&i.start>=s;(o||a)&&i.setPositions(a?s-1:i.start,o?Math.max(a?s:i.start+1,s):i.end,!0)}),hg(!1),Wf=0,n.forEach(function(i){return i&&i.render&&i.render(-1)}),wt.forEach(function(i){Vn(i)&&(i.smooth&&requestAnimationFrame(function(){return i.target.style.scrollBehavior="smooth"}),i.rec&&i(i.rec))}),b0(Hh,1),du.pause(),Js++,Zn=2,Br(2),xt.forEach(function(i){return Vn(i.vars.onRefresh)&&i.vars.onRefresh(i)}),Zn=Ve.isRefreshing=!1,lo("refresh")},qf=0,jc=1,ml,Br=function(e){if(e===2||!Zn&&!fu){Ve.isUpdating=!0,ml&&ml.update(0);var t=xt.length,n=Hn(),i=n-Md>=50,s=t&&xt[0].scroll();if(jc=qf>s?-1:1,Zn||(qf=s),i&&(Fi&&!Cu&&n-Fi>200&&(Fi=0,lo("scrollEnd")),qa=Md,Md=n),jc<0){for(Kn=t;Kn-- >0;)xt[Kn]&&xt[Kn].update(0,i);jc=1}else for(Kn=0;Kn<t;Kn++)xt[Kn]&&xt[Kn].update(0,i);Ve.isUpdating=!1}Ll=0},Yf=[g0,_0,Wh,Gh,Pi+pl,Pi+dl,Pi+hl,Pi+fl,"display","flexShrink","float","zIndex","gridColumnStart","gridColumnEnd","gridRowStart","gridRowEnd","gridArea","justifySelf","alignSelf","placeSelf","order"],$c=Yf.concat([Ks,Zs,"boxSizing","max"+ma,"max"+Xh,"position",Pi,yn,yn+hl,yn+dl,yn+pl,yn+fl]),N1=function(e,t,n){Qo(n);var i=e._gsap;if(i.spacerIsNative)Qo(i.spacerState);else if(e._gsap.swappedIn){var s=t.parentNode;s&&(s.insertBefore(e,t),s.removeChild(t))}e._gsap.swappedIn=!1},Ad=function(e,t,n,i){if(!e._gsap.swappedIn){for(var s=Yf.length,o=t.style,a=e.style,l;s--;)l=Yf[s],o[l]=n[l];o.position=n.position==="absolute"?"absolute":"relative",n.display==="inline"&&(o.display="inline-block"),a[Wh]=a[Gh]="auto",o.flexBasis=n.flexBasis||"auto",o.overflow="visible",o.boxSizing="border-box",o[Ks]=hu(e,Qn)+Sn,o[Zs]=hu(e,wn)+Sn,o[yn]=a[Pi]=a[_0]=a[g0]="0",Qo(i),a[Ks]=a["max"+ma]=n[Ks],a[Zs]=a["max"+Xh]=n[Zs],a[yn]=n[yn],e.parentNode!==t&&(e.parentNode.insertBefore(t,e),t.appendChild(e)),e._gsap.swappedIn=!0}},U1=/([A-Z])/g,Qo=function(e){if(e){var t=e.t.style,n=e.length,i=0,s,o;for((e.t._gsap||je.core.getCache(e.t)).uncache=1;i<n;i+=2)o=e[i+1],s=e[i],o?t[s]=o:t[s]&&t.removeProperty(s.replace(U1,"-$1").toLowerCase())}},Lc=function(e){for(var t=$c.length,n=e.style,i=[],s=0;s<t;s++)i.push($c[s],n[$c[s]]);return i.t=e,i},F1=function(e,t,n){for(var i=[],s=e.length,o=n?8:0,a;o<s;o+=2)a=e[o],i.push(a,a in t?t[a]:e[o+1]);return i.t=e.t,i},Kc={left:0,top:0},pg=function(e,t,n,i,s,o,a,l,c,u,d,f,h,_){Vn(e)&&(e=e(l)),mi(e)&&e.substr(0,3)==="max"&&(e=f+(e.charAt(4)==="="?qc("0"+e.substr(3),n):0));var g=h?h.time():0,m,p,S;if(h&&h.seek(0),isNaN(e)||(e=+e),$a(e))h&&(e=je.utils.mapRange(h.scrollTrigger.start,h.scrollTrigger.end,0,f,e)),a&&Yc(a,n,i,!0);else{Vn(t)&&(t=t(l));var x=(e||"0").split(" "),v,T,M,E;S=ii(t,l)||Vt,v=Pr(S)||{},(!v||!v.left&&!v.top)&&Li(S).display==="none"&&(E=S.style.display,S.style.display="block",v=Pr(S),E?S.style.display=E:S.style.removeProperty("display")),T=qc(x[0],v[i.d]),M=qc(x[1]||"0",n),e=v[i.p]-c[i.p]-u+T+s-M,a&&Yc(a,M,i,n-M<20||a._isStart&&M>20),n-=n-M}if(_&&(l[_]=e||-.001,e<0&&(e=0)),o){var P=e+n,y=o._isStart;m="scroll"+i.d2,Yc(o,P,i,y&&P>20||!y&&(d?Math.max(Vt[m],_i[m]):o.parentNode[m])<=P+1),d&&(c=Pr(a),d&&(o.style[i.op.p]=c[i.op.p]-i.op.m-o._offset+Sn))}return h&&S&&(m=Pr(S),h.seek(f),p=Pr(S),h._caScrollDist=m[i.p]-p[i.p],e=e/h._caScrollDist*f),h&&h.seek(g),h?e:Math.round(e)},k1=/(webkit|moz|length|cssText|inset)/i,mg=function(e,t,n,i){if(e.parentNode!==t){var s=e.style,o,a;if(t===Vt){e._stOrig=s.cssText,a=Li(e);for(o in a)!+o&&!k1.test(o)&&a[o]&&typeof s[o]=="string"&&o!=="0"&&(s[o]=a[o]);s.top=n,s.left=i}else s.cssText=e._stOrig;je.core.getCache(e).uncache=1,t.appendChild(e)}},w0=function(e,t,n){var i=t,s=i;return function(o){var a=Math.round(e());return a!==i&&a!==s&&Math.abs(a-i)>3&&Math.abs(a-s)>3&&(o=a,n&&n()),s=i,i=Math.round(o),i}},Dc=function(e,t,n){var i={};i[t.p]="+="+n,je.set(e,i)},gg=function(e,t){var n=ys(e,t),i="_scroll"+t.p2,s=function o(a,l,c,u,d){var f=o.tween,h=l.onComplete,_={};c=c||n();var g=w0(n,c,function(){f.kill(),o.tween=0});return d=u&&d||0,u=u||a-c,f&&f.kill(),l[i]=a,l.inherit=!1,l.modifiers=_,_[i]=function(){return g(c+u*f.ratio+d*f.ratio*f.ratio)},l.onUpdate=function(){wt.cache++,o.tween&&Br()},l.onComplete=function(){o.tween=0,h&&h.call(f)},f=o.tween=je.to(e,l),f};return e[i]=n,n.wheelHandler=function(){return s.tween&&s.tween.kill()&&(s.tween=0)},Rn(e,"wheel",n.wheelHandler),Ve.isTouch&&Rn(e,"touchmove",n.wheelHandler),s},Ve=function(){function r(t,n){zo||r.register(je)||console.warn("Please gsap.registerPlugin(ScrollTrigger)"),Gf(this),this.init(t,n)}var e=r.prototype;return e.init=function(n,i){if(this.progress=this.start=0,this.vars&&this.kill(!0,!0),!Ya){this.update=this.refresh=this.kill=nr;return}n=cg(mi(n)||$a(n)||n.nodeType?{trigger:n}:n,Rc);var s=n,o=s.onUpdate,a=s.toggleClass,l=s.id,c=s.onToggle,u=s.onRefresh,d=s.scrub,f=s.trigger,h=s.pin,_=s.pinSpacing,g=s.invalidateOnRefresh,m=s.anticipatePin,p=s.onScrubComplete,S=s.onSnapComplete,x=s.once,v=s.snap,T=s.pinReparent,M=s.pinSpacer,E=s.containerAnimation,P=s.fastScrollEnd,y=s.preventOverlaps,b=n.horizontal||n.containerAnimation&&n.horizontal!==!1?Qn:wn,D=!d&&d!==0,B=ii(n.scroller||St),U=je.core.getCache(B),K=oo(B),F=("pinType"in n?n.pinType:ps(B,"pinType")||K&&"fixed")==="fixed",C=[n.onEnter,n.onLeave,n.onEnterBack,n.onLeaveBack],J=D&&n.toggleActions.split(" "),X="markers"in n?n.markers:Rc.markers,me=K?0:parseFloat(Li(B)["border"+b.p2+ma])||0,I=this,_e=n.onRefreshInit&&function(){return n.onRefreshInit(I)},Y=C1(B,K,b),Re=R1(B,K),Q=0,se=0,Me=0,ve=ys(B,b),De,Qe,Pe,nt,pt,Fe,O,Dt,Xe,q,Oe,dt,He,ke,mt,L,A,W,oe,ne,ie,Ee,ge,ze,Ae,j,Se,Ge,$e,de,it,N,ue,fe,ye,pe,ae,Be,rt;if(I._startClamp=I._endClamp=!1,I._dir=b,m*=45,I.scroller=B,I.scroll=E?E.time.bind(E):ve,nt=ve(),I.vars=n,i=i||n.animation,"refreshPriority"in n&&(l0=1,n.refreshPriority===-9999&&(ml=I)),U.tweenScroll=U.tweenScroll||{top:gg(B,wn),left:gg(B,Qn)},I.tweenTo=De=U.tweenScroll[b.p],I.scrubDuration=function(xe){ue=$a(xe)&&xe,ue?N?N.duration(xe):N=je.to(i,{ease:"expo",totalProgress:"+=0",inherit:!1,duration:ue,paused:!0,onComplete:function(){return p&&p(I)}}):(N&&N.progress(1).kill(),N=0)},i&&(i.vars.lazy=!1,i._initted&&!I.isReverted||i.vars.immediateRender!==!1&&n.immediateRender!==!1&&i.duration()&&i.render(0,!0,!0),I.animation=i.pause(),i.scrollTrigger=I,I.scrubDuration(d),de=0,l||(l=i.vars.id)),v&&((!Bs(v)||v.push)&&(v={snapTo:v}),"scrollBehavior"in Vt.style&&je.set(K?[Vt,_i]:B,{scrollBehavior:"auto"}),wt.forEach(function(xe){return Vn(xe)&&xe.target===(K?tn.scrollingElement||_i:B)&&(xe.smooth=!1)}),Pe=Vn(v.snapTo)?v.snapTo:v.snapTo==="labels"?L1(i):v.snapTo==="labelsDirectional"?D1(i):v.directional!==!1?function(xe,Ke){return qh(v.snapTo)(xe,Hn()-se<500?0:Ke.direction)}:je.utils.snap(v.snapTo),fe=v.duration||{min:.1,max:2},fe=Bs(fe)?ul(fe.min,fe.max):ul(fe,fe),ye=je.delayedCall(v.delay||ue/2||.1,function(){var xe=ve(),Ke=Hn()-se<500,Ye=De.tween;if((Ke||Math.abs(I.getVelocity())<10)&&!Ye&&!Cu&&Q!==xe){var at=(xe-Fe)/ke,qt=i&&!D?i.totalProgress():at,ct=Ke?0:(qt-it)/(Hn()-qa)*1e3||0,Bt=je.utils.clamp(-at,1-at,Oo(ct/2)*ct/.185),It=at+(v.inertia===!1?0:Bt),Ht,Et,vt=v,sn=vt.onStart,Jt=vt.onInterrupt,Te=vt.onComplete;if(Ht=Pe(It,I),$a(Ht)||(Ht=It),Et=Math.max(0,Math.round(Fe+Ht*ke)),xe<=O&&xe>=Fe&&Et!==xe){if(Ye&&!Ye._initted&&Ye.data<=Oo(Et-xe))return;v.inertia===!1&&(Bt=Ht-at),De(Et,{duration:fe(Oo(Math.max(Oo(It-qt),Oo(Ht-qt))*.185/ct/.05||0)),ease:v.ease||"power3",data:Oo(Et-xe),onInterrupt:function(){return ye.restart(!0)&&Jt&&Jt(I)},onComplete:function(){I.update(),Q=ve(),i&&!D&&(N?N.resetTo("totalProgress",Ht,i._tTime/i._tDur):i.progress(Ht)),de=it=i&&!D?i.totalProgress():I.progress,S&&S(I),Te&&Te(I)}},xe,Bt*ke,Et-xe-Bt*ke),sn&&sn(I,De.tween)}}else I.isActive&&Q!==xe&&ye.restart(!0)}).pause()),l&&(Xf[l]=I),f=I.trigger=ii(f||h!==!0&&h),rt=f&&f._gsap&&f._gsap.stRevert,rt&&(rt=rt(I)),h=h===!0?f:ii(h),mi(a)&&(a={targets:f,className:a}),h&&(_===!1||_===Pi||(_=!_&&h.parentNode&&h.parentNode.style&&Li(h.parentNode).display==="flex"?!1:yn),I.pin=h,Qe=je.core.getCache(h),Qe.spacer?mt=Qe.pinState:(M&&(M=ii(M),M&&!M.nodeType&&(M=M.current||M.nativeElement),Qe.spacerIsNative=!!M,M&&(Qe.spacerState=Lc(M))),Qe.spacer=W=M||tn.createElement("div"),W.classList.add("pin-spacer"),l&&W.classList.add("pin-spacer-"+l),Qe.pinState=mt=Lc(h)),n.force3D!==!1&&je.set(h,{force3D:!0}),I.spacer=W=Qe.spacer,$e=Li(h),ze=$e[_+b.os2],ne=je.getProperty(h),ie=je.quickSetter(h,b.a,Sn),Ad(h,W,$e),A=Lc(h)),X){dt=Bs(X)?cg(X,ug):ug,q=Pc("scroller-start",l,B,b,dt,0),Oe=Pc("scroller-end",l,B,b,dt,0,q),oe=q["offset"+b.op.d2];var Ut=ii(ps(B,"content")||B);Dt=this.markerStart=Pc("start",l,Ut,b,dt,oe,0,E),Xe=this.markerEnd=Pc("end",l,Ut,b,dt,oe,0,E),E&&(Be=je.quickSetter([Dt,Xe],b.a,Sn)),!F&&!(dr.length&&ps(B,"fixedMarkers")===!0)&&(P1(K?Vt:B),je.set([q,Oe],{force3D:!0}),j=je.quickSetter(q,b.a,Sn),Ge=je.quickSetter(Oe,b.a,Sn))}if(E){var we=E.vars.onUpdate,qe=E.vars.onUpdateParams;E.eventCallback("onUpdate",function(){I.update(0,0,1),we&&we.apply(E,qe||[])})}if(I.previous=function(){return xt[xt.indexOf(I)-1]},I.next=function(){return xt[xt.indexOf(I)+1]},I.revert=function(xe,Ke){if(!Ke)return I.kill(!0);var Ye=xe!==!1||!I.enabled,at=zn;Ye!==I.isReverted&&(Ye&&(pe=Math.max(ve(),I.scroll.rec||0),Me=I.progress,ae=i&&i.progress()),Dt&&[Dt,Xe,q,Oe].forEach(function(qt){return qt.style.display=Ye?"none":"block"}),Ye&&(zn=I,I.update(Ye)),h&&(!T||!I.isActive)&&(Ye?N1(h,W,mt):Ad(h,W,Li(h),Ae)),Ye||I.update(Ye),zn=at,I.isReverted=Ye)},I.refresh=function(xe,Ke,Ye,at){if(!((zn||!I.enabled)&&!Ke)){if(h&&xe&&Fi){Rn(r,"scrollEnd",y0);return}!Zn&&_e&&_e(I),zn=I,De.tween&&!Ye&&(De.tween.kill(),De.tween=0),N&&N.pause(),g&&i&&i.revert({kill:!1}).invalidate(),I.isReverted||I.revert(!0,!0),I._subPinOffset=!1;var qt=Y(),ct=Re(),Bt=E?E.duration():ar(B,b),It=ke<=.01,Ht=0,Et=at||0,vt=Bs(Ye)?Ye.end:n.end,sn=n.endTrigger||f,Jt=Bs(Ye)?Ye.start:n.start||(n.start===0||!f?0:h?"0 0":"0 100%"),Te=I.pinnedContainer=n.pinnedContainer&&ii(n.pinnedContainer,I),jt=f&&Math.max(0,xt.indexOf(I))||0,un=jt,fn,R,V,ee,$,z,le,Ce,We,be,et,ot,Ze;for(X&&Bs(Ye)&&(ot=je.getProperty(q,b.p),Ze=je.getProperty(Oe,b.p));un-- >0;)z=xt[un],z.end||z.refresh(0,1)||(zn=I),le=z.pin,le&&(le===f||le===h||le===Te)&&!z.isReverted&&(be||(be=[]),be.unshift(z),z.revert(!0,!0)),z!==xt[un]&&(jt--,un--);for(Vn(Jt)&&(Jt=Jt(I)),Jt=sg(Jt,"start",I),Fe=pg(Jt,f,qt,b,ve(),Dt,q,I,ct,me,F,Bt,E,I._startClamp&&"_startClamp")||(h?-.001:0),Vn(vt)&&(vt=vt(I)),mi(vt)&&!vt.indexOf("+=")&&(~vt.indexOf(" ")?vt=(mi(Jt)?Jt.split(" ")[0]:"")+vt:(Ht=qc(vt.substr(2),qt),vt=mi(Jt)?Jt:(E?je.utils.mapRange(0,E.duration(),E.scrollTrigger.start,E.scrollTrigger.end,Fe):Fe)+Ht,sn=f)),vt=sg(vt,"end",I),O=Math.max(Fe,pg(vt||(sn?"100% 0":Bt),sn,qt,b,ve()+Ht,Xe,Oe,I,ct,me,F,Bt,E,I._endClamp&&"_endClamp"))||-.001,Ht=0,un=jt;un--;)z=xt[un],le=z.pin,le&&z.start-z._pinPush<=Fe&&!E&&z.end>0&&(fn=z.end-(I._startClamp?Math.max(0,z.start):z.start),(le===f&&z.start-z._pinPush<Fe||le===Te)&&isNaN(Jt)&&(Ht+=fn*(1-z.progress)),le===h&&(Et+=fn));if(Fe+=Ht,O+=Ht,I._startClamp&&(I._startClamp+=Ht),I._endClamp&&!Zn&&(I._endClamp=O||-.001,O=Math.min(O,ar(B,b))),ke=O-Fe||(Fe-=.01)&&.001,It&&(Me=je.utils.clamp(0,1,je.utils.normalize(Fe,O,pe))),I._pinPush=Et,Dt&&Ht&&(fn={},fn[b.a]="+="+Ht,Te&&(fn[b.p]="-="+ve()),je.set([Dt,Xe],fn)),h&&!(Wf&&I.end>=ar(B,b)))fn=Li(h),ee=b===wn,V=ve(),Ee=parseFloat(ne(b.a))+Et,!Bt&&O>1&&(et=(K?tn.scrollingElement||_i:B).style,et={style:et,value:et["overflow"+b.a.toUpperCase()]},K&&Li(Vt)["overflow"+b.a.toUpperCase()]!=="scroll"&&(et.style["overflow"+b.a.toUpperCase()]="scroll")),Ad(h,W,fn),A=Lc(h),R=Pr(h,!0),Ce=F&&ys(B,ee?Qn:wn)(),_?(Ae=[_+b.os2,ke+Et+Sn],Ae.t=W,un=_===yn?hu(h,b)+ke+Et:0,un&&(Ae.push(b.d,un+Sn),W.style.flexBasis!=="auto"&&(W.style.flexBasis=un+Sn)),Qo(Ae),Te&&xt.forEach(function(ft){ft.pin===Te&&ft.vars.pinSpacing!==!1&&(ft._subPinOffset=!0)}),F&&ve(pe)):(un=hu(h,b),un&&W.style.flexBasis!=="auto"&&(W.style.flexBasis=un+Sn)),F&&($={top:R.top+(ee?V-Fe:Ce)+Sn,left:R.left+(ee?Ce:V-Fe)+Sn,boxSizing:"border-box",position:"fixed"},$[Ks]=$["max"+ma]=Math.ceil(R.width)+Sn,$[Zs]=$["max"+Xh]=Math.ceil(R.height)+Sn,$[Pi]=$[Pi+hl]=$[Pi+dl]=$[Pi+pl]=$[Pi+fl]="0",$[yn]=fn[yn],$[yn+hl]=fn[yn+hl],$[yn+dl]=fn[yn+dl],$[yn+pl]=fn[yn+pl],$[yn+fl]=fn[yn+fl],L=F1(mt,$,T),Zn&&ve(0)),i?(We=i._initted,Sd(1),i.render(i.duration(),!0,!0),ge=ne(b.a)-Ee+ke+Et,Se=Math.abs(ke-ge)>1,F&&Se&&L.splice(L.length-2,2),i.render(0,!0,!0),We||i.invalidate(!0),i.parent||i.totalTime(i.totalTime()),Sd(0)):ge=ke,et&&(et.value?et.style["overflow"+b.a.toUpperCase()]=et.value:et.style.removeProperty("overflow-"+b.a));else if(f&&ve()&&!E)for(R=f.parentNode;R&&R!==Vt;)R._pinOffset&&(Fe-=R._pinOffset,O-=R._pinOffset),R=R.parentNode;be&&be.forEach(function(ft){return ft.revert(!1,!0)}),I.start=Fe,I.end=O,nt=pt=Zn?pe:ve(),!E&&!Zn&&(nt<pe&&ve(pe),I.scroll.rec=0),I.revert(!1,!0),se=Hn(),ye&&(Q=-1,ye.restart(!0)),zn=0,i&&D&&(i._initted||ae)&&i.progress()!==ae&&i.progress(ae||0,!0).render(i.time(),!0,!0),(It||Me!==I.progress||E||g||i&&!i._initted)&&(i&&!D&&i.totalProgress(E&&Fe<-.001&&!Me?je.utils.normalize(Fe,O,0):Me,!0),I.progress=It||(nt-Fe)/ke===Me?0:Me),h&&_&&(W._pinOffset=Math.round(I.progress*ge)),N&&N.invalidate(),isNaN(ot)||(ot-=je.getProperty(q,b.p),Ze-=je.getProperty(Oe,b.p),Dc(q,b,ot),Dc(Dt,b,ot-(at||0)),Dc(Oe,b,Ze),Dc(Xe,b,Ze-(at||0))),It&&!Zn&&I.update(),u&&!Zn&&!He&&(He=!0,u(I),He=!1)}},I.getVelocity=function(){return(ve()-pt)/(Hn()-qa)*1e3||0},I.endAnimation=function(){za(I.callbackAnimation),i&&(N?N.progress(1):i.paused()?D||za(i,I.direction<0,1):za(i,i.reversed()))},I.labelToScroll=function(xe){return i&&i.labels&&(Fe||I.refresh()||Fe)+i.labels[xe]/i.duration()*ke||0},I.getTrailing=function(xe){var Ke=xt.indexOf(I),Ye=I.direction>0?xt.slice(0,Ke).reverse():xt.slice(Ke+1);return(mi(xe)?Ye.filter(function(at){return at.vars.preventOverlaps===xe}):Ye).filter(function(at){return I.direction>0?at.end<=Fe:at.start>=O})},I.update=function(xe,Ke,Ye){if(!(E&&!Ye&&!xe)){var at=Zn===!0?pe:I.scroll(),qt=xe?0:(at-Fe)/ke,ct=qt<0?0:qt>1?1:qt||0,Bt=I.progress,It,Ht,Et,vt,sn,Jt,Te,jt;if(Ke&&(pt=nt,nt=E?ve():at,v&&(it=de,de=i&&!D?i.totalProgress():ct)),m&&h&&!zn&&!Ec&&Fi&&(!ct&&Fe<at+(at-pt)/(Hn()-qa)*m?ct=1e-4:ct===1&&O>at+(at-pt)/(Hn()-qa)*m&&(ct=.9999)),ct!==Bt&&I.enabled){if(It=I.isActive=!!ct&&ct<1,Ht=!!Bt&&Bt<1,Jt=It!==Ht,sn=Jt||!!ct!=!!Bt,I.direction=ct>Bt?1:-1,I.progress=ct,sn&&!zn&&(Et=ct&&!Bt?0:ct===1?1:Bt===1?2:3,D&&(vt=!Jt&&J[Et+1]!=="none"&&J[Et+1]||J[Et],jt=i&&(vt==="complete"||vt==="reset"||vt in i))),y&&(Jt||jt)&&(jt||d||!i)&&(Vn(y)?y(I):I.getTrailing(y).forEach(function(V){return V.endAnimation()})),D||(N&&!zn&&!Ec?(N._dp._time-N._start!==N._time&&N.render(N._dp._time-N._start),N.resetTo?N.resetTo("totalProgress",ct,i._tTime/i._tDur):(N.vars.totalProgress=ct,N.invalidate().restart())):i&&i.totalProgress(ct,!!(zn&&(se||xe)))),h){if(xe&&_&&(W.style[_+b.os2]=ze),!F)ie(ja(Ee+ge*ct));else if(sn){if(Te=!xe&&ct>Bt&&O+1>at&&at+1>=ar(B,b),T)if(!xe&&(It||Te)){var un=Pr(h,!0),fn=at-Fe;mg(h,Vt,un.top+(b===wn?fn:0)+Sn,un.left+(b===wn?0:fn)+Sn)}else mg(h,W);Qo(It||Te?L:A),Se&&ct<1&&It||ie(Ee+(ct===1&&!Te?ge:0))}}v&&!De.tween&&!zn&&!Ec&&ye.restart(!0),a&&(Jt||x&&ct&&(ct<1||!wd))&&Pl(a.targets).forEach(function(V){return V.classList[It||x?"add":"remove"](a.className)}),o&&!D&&!xe&&o(I),sn&&!zn?(D&&(jt&&(vt==="complete"?i.pause().totalProgress(1):vt==="reset"?i.restart(!0).pause():vt==="restart"?i.restart(!0):i[vt]()),o&&o(I)),(Jt||!wd)&&(c&&Jt&&Ed(I,c),C[Et]&&Ed(I,C[Et]),x&&(ct===1?I.kill(!1,1):C[Et]=0),Jt||(Et=ct===1?1:3,C[Et]&&Ed(I,C[Et]))),P&&!It&&Math.abs(I.getVelocity())>($a(P)?P:2500)&&(za(I.callbackAnimation),N?N.progress(1):za(i,vt==="reverse"?1:!ct,1))):D&&o&&!zn&&o(I)}if(Ge){var R=E?at/E.duration()*(E._caScrollDist||0):at;j(R+(q._isFlipped?1:0)),Ge(R)}Be&&Be(-at/E.duration()*(E._caScrollDist||0))}},I.enable=function(xe,Ke){I.enabled||(I.enabled=!0,Rn(B,"resize",Ka),K||Rn(B,"scroll",No),_e&&Rn(r,"refreshInit",_e),xe!==!1&&(I.progress=Me=0,nt=pt=Q=ve()),Ke!==!1&&I.refresh())},I.getTween=function(xe){return xe&&De?De.tween:N},I.setPositions=function(xe,Ke,Ye,at){if(E){var qt=E.scrollTrigger,ct=E.duration(),Bt=qt.end-qt.start;xe=qt.start+Bt*xe/ct,Ke=qt.start+Bt*Ke/ct}I.refresh(!1,!1,{start:og(xe,Ye&&!!I._startClamp),end:og(Ke,Ye&&!!I._endClamp)},at),I.update()},I.adjustPinSpacing=function(xe){if(Ae&&xe){var Ke=Ae.indexOf(b.d)+1;Ae[Ke]=parseFloat(Ae[Ke])+xe+Sn,Ae[1]=parseFloat(Ae[1])+xe+Sn,Qo(Ae)}},I.disable=function(xe,Ke){if(I.enabled&&(xe!==!1&&I.revert(!0,!0),I.enabled=I.isActive=!1,Ke||N&&N.pause(),pe=0,Qe&&(Qe.uncache=1),_e&&Cn(r,"refreshInit",_e),ye&&(ye.pause(),De.tween&&De.tween.kill()&&(De.tween=0)),!K)){for(var Ye=xt.length;Ye--;)if(xt[Ye].scroller===B&&xt[Ye]!==I)return;Cn(B,"resize",Ka),K||Cn(B,"scroll",No)}},I.kill=function(xe,Ke){I.disable(xe,Ke),N&&!Ke&&N.kill(),l&&delete Xf[l];var Ye=xt.indexOf(I);Ye>=0&&xt.splice(Ye,1),Ye===Kn&&jc>0&&Kn--,Ye=0,xt.forEach(function(at){return at.scroller===I.scroller&&(Ye=1)}),Ye||Zn||(I.scroll.rec=0),i&&(i.scrollTrigger=null,xe&&i.revert({kill:!1}),Ke||i.kill()),Dt&&[Dt,Xe,q,Oe].forEach(function(at){return at.parentNode&&at.parentNode.removeChild(at)}),ml===I&&(ml=0),h&&(Qe&&(Qe.uncache=1),Ye=0,xt.forEach(function(at){return at.pin===h&&Ye++}),Ye||(Qe.spacer=0)),n.onKill&&n.onKill(I)},xt.push(I),I.enable(!1,!1),rt&&rt(I),i&&i.add&&!ke){var ht=I.update;I.update=function(){I.update=ht,wt.cache++,Fe||O||I.refresh()},je.delayedCall(.01,I.update),ke=.01,Fe=O=0}else I.refresh();h&&O1()},r.register=function(n){return zo||(je=n||h0(),f0()&&window.document&&r.enable(),zo=Ya),zo},r.defaults=function(n){if(n)for(var i in n)Rc[i]=n[i];return Rc},r.disable=function(n,i){Ya=0,xt.forEach(function(o){return o[i?"kill":"disable"](n)}),Cn(St,"wheel",No),Cn(tn,"scroll",No),clearInterval(Mc),Cn(tn,"touchcancel",nr),Cn(Vt,"touchstart",nr),Ac(Cn,tn,"pointerdown,touchstart,mousedown",ag),Ac(Cn,tn,"pointerup,touchend,mouseup",lg),du.kill(),Tc(Cn);for(var s=0;s<wt.length;s+=3)Cc(Cn,wt[s],wt[s+1]),Cc(Cn,wt[s],wt[s+2])},r.enable=function(){if(St=window,tn=document,_i=tn.documentElement,Vt=tn.body,je&&(Pl=je.utils.toArray,ul=je.utils.clamp,Gf=je.core.context||nr,Sd=je.core.suppressOverwrites||nr,Hh=St.history.scrollRestoration||"auto",qf=St.pageYOffset||0,je.core.globals("ScrollTrigger",r),Vt)){Ya=1,Jo=document.createElement("div"),Jo.style.height="100vh",Jo.style.position="absolute",S0(),A1(),mn.register(je),r.isTouch=mn.isTouch,ts=mn.isTouch&&/(iPad|iPhone|iPod|Mac)/g.test(navigator.userAgent),Vf=mn.isTouch===1,Rn(St,"wheel",No),zh=[St,tn,_i,Vt],je.matchMedia?(r.matchMedia=function(c){var u=je.matchMedia(),d;for(d in c)u.add(d,c[d]);return u},je.addEventListener("matchMediaInit",function(){return Yh()}),je.addEventListener("matchMediaRevert",function(){return x0()}),je.addEventListener("matchMedia",function(){Xs(0,1),lo("matchMedia")}),je.matchMedia().add("(orientation: portrait)",function(){return Td(),Td})):console.warn("Requires GSAP 3.11.0 or later"),Td(),Rn(tn,"scroll",No);var n=Vt.hasAttribute("style"),i=Vt.style,s=i.borderTopStyle,o=je.core.Animation.prototype,a,l;for(o.revert||Object.defineProperty(o,"revert",{value:function(){return this.time(-.01,!0)}}),i.borderTopStyle="solid",a=Pr(Vt),wn.m=Math.round(a.top+wn.sc())||0,Qn.m=Math.round(a.left+Qn.sc())||0,s?i.borderTopStyle=s:i.removeProperty("border-top-style"),n||(Vt.setAttribute("style",""),Vt.removeAttribute("style")),Mc=setInterval(dg,250),je.delayedCall(.5,function(){return Ec=0}),Rn(tn,"touchcancel",nr),Rn(Vt,"touchstart",nr),Ac(Rn,tn,"pointerdown,touchstart,mousedown",ag),Ac(Rn,tn,"pointerup,touchend,mouseup",lg),Hf=je.utils.checkPrefix("transform"),$c.push(Hf),zo=Hn(),du=je.delayedCall(.2,Xs).pause(),Ho=[tn,"visibilitychange",function(){var c=St.innerWidth,u=St.innerHeight;tn.hidden?(ig=c,rg=u):(ig!==c||rg!==u)&&Ka()},tn,"DOMContentLoaded",Xs,St,"load",Xs,St,"resize",Ka],Tc(Rn),xt.forEach(function(c){return c.enable(0,1)}),l=0;l<wt.length;l+=3)Cc(Cn,wt[l],wt[l+1]),Cc(Cn,wt[l],wt[l+2])}},r.config=function(n){"limitCallbacks"in n&&(wd=!!n.limitCallbacks);var i=n.syncInterval;i&&clearInterval(Mc)||(Mc=i)&&setInterval(dg,i),"ignoreMobileResize"in n&&(Vf=r.isTouch===1&&n.ignoreMobileResize),"autoRefreshEvents"in n&&(Tc(Cn)||Tc(Rn,n.autoRefreshEvents||"none"),c0=(n.autoRefreshEvents+"").indexOf("resize")===-1)},r.scrollerProxy=function(n,i){var s=ii(n),o=wt.indexOf(s),a=oo(s);~o&&wt.splice(o,a?6:2),i&&(a?dr.unshift(St,i,Vt,i,_i,i):dr.unshift(s,i))},r.clearMatchMedia=function(n){xt.forEach(function(i){return i._ctx&&i._ctx.query===n&&i._ctx.kill(!0,!0)})},r.isInViewport=function(n,i,s){var o=(mi(n)?ii(n):n).getBoundingClientRect(),a=o[s?Ks:Zs]*i||0;return s?o.right-a>0&&o.left+a<St.innerWidth:o.bottom-a>0&&o.top+a<St.innerHeight},r.positionInViewport=function(n,i,s){mi(n)&&(n=ii(n));var o=n.getBoundingClientRect(),a=o[s?Ks:Zs],l=i==null?a/2:i in pu?pu[i]*a:~i.indexOf("%")?parseFloat(i)*a/100:parseFloat(i)||0;return s?(o.left+l)/St.innerWidth:(o.top+l)/St.innerHeight},r.killAll=function(n){if(xt.slice(0).forEach(function(s){return s.vars.id!=="ScrollSmoother"&&s.kill()}),n!==!0){var i=ao.killAll||[];ao={},i.forEach(function(s){return s()})}},r}();Ve.version="3.12.7";Ve.saveStyles=function(r){return r?Pl(r).forEach(function(e){if(e&&e.style){var t=pi.indexOf(e);t>=0&&pi.splice(t,5),pi.push(e,e.style.cssText,e.getBBox&&e.getAttribute("transform"),je.core.getCache(e),Gf())}}):pi};Ve.revert=function(r,e){return Yh(!r,e)};Ve.create=function(r,e){return new Ve(r,e)};Ve.refresh=function(r){return r?Ka(!0):(zo||Ve.register())&&Xs(!0)};Ve.update=function(r){return++wt.cache&&Br(r===!0?2:0)};Ve.clearScrollMemory=b0;Ve.maxScroll=function(r,e){return ar(r,e?Qn:wn)};Ve.getScrollFunc=function(r,e){return ys(ii(r),e?Qn:wn)};Ve.getById=function(r){return Xf[r]};Ve.getAll=function(){return xt.filter(function(r){return r.vars.id!=="ScrollSmoother"})};Ve.isScrolling=function(){return!!Fi};Ve.snapDirectional=qh;Ve.addEventListener=function(r,e){var t=ao[r]||(ao[r]=[]);~t.indexOf(e)||t.push(e)};Ve.removeEventListener=function(r,e){var t=ao[r],n=t&&t.indexOf(e);n>=0&&t.splice(n,1)};Ve.batch=function(r,e){var t=[],n={},i=e.interval||.016,s=e.batchMax||1e9,o=function(c,u){var d=[],f=[],h=je.delayedCall(i,function(){u(d,f),d=[],f=[]}).pause();return function(_){d.length||h.restart(!0),d.push(_.trigger),f.push(_),s<=d.length&&h.progress(1)}},a;for(a in e)n[a]=a.substr(0,2)==="on"&&Vn(e[a])&&a!=="onRefreshInit"?o(a,e[a]):e[a];return Vn(s)&&(s=s(),Rn(Ve,"refresh",function(){return s=e.batchMax()})),Pl(r).forEach(function(l){var c={};for(a in n)c[a]=n[a];c.trigger=l,t.push(Ve.create(c))}),t};var _g=function(e,t,n,i){return t>i?e(i):t<0&&e(0),n>i?(i-t)/(n-t):n<0?t/(t-n):1},Cd=function r(e,t){t===!0?e.style.removeProperty("touch-action"):e.style.touchAction=t===!0?"auto":t?"pan-"+t+(mn.isTouch?" pinch-zoom":""):"none",e===_i&&r(Vt,t)},Ic={auto:1,scroll:1},B1=function(e){var t=e.event,n=e.target,i=e.axis,s=(t.changedTouches?t.changedTouches[0]:t).target,o=s._gsap||je.core.getCache(s),a=Hn(),l;if(!o._isScrollT||a-o._isScrollT>2e3){for(;s&&s!==Vt&&(s.scrollHeight<=s.clientHeight&&s.scrollWidth<=s.clientWidth||!(Ic[(l=Li(s)).overflowY]||Ic[l.overflowX]));)s=s.parentNode;o._isScroll=s&&s!==n&&!oo(s)&&(Ic[(l=Li(s)).overflowY]||Ic[l.overflowX]),o._isScrollT=a}(o._isScroll||i==="x")&&(t.stopPropagation(),t._gsapAllow=!0)},M0=function(e,t,n,i){return mn.create({target:e,capture:!0,debounce:!1,lockAxis:!0,type:t,onWheel:i=i&&B1,onPress:i,onDrag:i,onScroll:i,onEnable:function(){return n&&Rn(tn,mn.eventTypes[0],yg,!1,!0)},onDisable:function(){return Cn(tn,mn.eventTypes[0],yg,!0)}})},z1=/(input|label|select|textarea)/i,vg,yg=function(e){var t=z1.test(e.target.tagName);(t||vg)&&(e._gsapAllow=!0,vg=t)},H1=function(e){Bs(e)||(e={}),e.preventDefault=e.isNormalizer=e.allowClicks=!0,e.type||(e.type="wheel,touch"),e.debounce=!!e.debounce,e.id=e.id||"normalizer";var t=e,n=t.normalizeScrollX,i=t.momentum,s=t.allowNestedScroll,o=t.onRelease,a,l,c=ii(e.target)||_i,u=je.core.globals().ScrollSmoother,d=u&&u.get(),f=ts&&(e.content&&ii(e.content)||d&&e.content!==!1&&!d.smooth()&&d.content()),h=ys(c,wn),_=ys(c,Qn),g=1,m=(mn.isTouch&&St.visualViewport?St.visualViewport.scale*St.visualViewport.width:St.outerWidth)/St.innerWidth,p=0,S=Vn(i)?function(){return i(a)}:function(){return i||2.8},x,v,T=M0(c,e.type,!0,s),M=function(){return v=!1},E=nr,P=nr,y=function(){l=ar(c,wn),P=ul(ts?1:0,l),n&&(E=ul(0,ar(c,Qn))),x=Js},b=function(){f._gsap.y=ja(parseFloat(f._gsap.y)+h.offset)+"px",f.style.transform="matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, "+parseFloat(f._gsap.y)+", 0, 1)",h.offset=h.cacheID=0},D=function(){if(v){requestAnimationFrame(M);var X=ja(a.deltaY/2),me=P(h.v-X);if(f&&me!==h.v+h.offset){h.offset=me-h.v;var I=ja((parseFloat(f&&f._gsap.y)||0)-h.offset);f.style.transform="matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, "+I+", 0, 1)",f._gsap.y=I+"px",h.cacheID=wt.cache,Br()}return!0}h.offset&&b(),v=!0},B,U,K,F,C=function(){y(),B.isActive()&&B.vars.scrollY>l&&(h()>l?B.progress(1)&&h(l):B.resetTo("scrollY",l))};return f&&je.set(f,{y:"+=0"}),e.ignoreCheck=function(J){return ts&&J.type==="touchmove"&&D()||g>1.05&&J.type!=="touchstart"||a.isGesturing||J.touches&&J.touches.length>1},e.onPress=function(){v=!1;var J=g;g=ja((St.visualViewport&&St.visualViewport.scale||1)/m),B.pause(),J!==g&&Cd(c,g>1.01?!0:n?!1:"x"),U=_(),K=h(),y(),x=Js},e.onRelease=e.onGestureStart=function(J,X){if(h.offset&&b(),!X)F.restart(!0);else{wt.cache++;var me=S(),I,_e;n&&(I=_(),_e=I+me*.05*-J.velocityX/.227,me*=_g(_,I,_e,ar(c,Qn)),B.vars.scrollX=E(_e)),I=h(),_e=I+me*.05*-J.velocityY/.227,me*=_g(h,I,_e,ar(c,wn)),B.vars.scrollY=P(_e),B.invalidate().duration(me).play(.01),(ts&&B.vars.scrollY>=l||I>=l-1)&&je.to({},{onUpdate:C,duration:me})}o&&o(J)},e.onWheel=function(){B._ts&&B.pause(),Hn()-p>1e3&&(x=0,p=Hn())},e.onChange=function(J,X,me,I,_e){if(Js!==x&&y(),X&&n&&_(E(I[2]===X?U+(J.startX-J.x):_()+X-I[1])),me){h.offset&&b();var Y=_e[2]===me,Re=Y?K+J.startY-J.y:h()+me-_e[1],Q=P(Re);Y&&Re!==Q&&(K+=Q-Re),h(Q)}(me||X)&&Br()},e.onEnable=function(){Cd(c,n?!1:"x"),Ve.addEventListener("refresh",C),Rn(St,"resize",C),h.smooth&&(h.target.style.scrollBehavior="auto",h.smooth=_.smooth=!1),T.enable()},e.onDisable=function(){Cd(c,!0),Cn(St,"resize",C),Ve.removeEventListener("refresh",C),T.kill()},e.lockAxis=e.lockAxis!==!1,a=new mn(e),a.iOS=ts,ts&&!h()&&h(1),ts&&je.ticker.add(nr),F=a._dc,B=je.to(a,{ease:"power4",paused:!0,inherit:!1,scrollX:n?"+=0.1":"+=0",scrollY:"+=0.1",modifiers:{scrollY:w0(h,h(),function(){return B.pause()})},onUpdate:Br,onComplete:F.vars.onComplete}),a};Ve.sort=function(r){if(Vn(r))return xt.sort(r);var e=St.pageYOffset||0;return Ve.getAll().forEach(function(t){return t._sortY=t.trigger?e+t.trigger.getBoundingClientRect().top:t.start+St.innerHeight}),xt.sort(r||function(t,n){return(t.vars.refreshPriority||0)*-1e6+(t.vars.containerAnimation?1e6:t._sortY)-((n.vars.containerAnimation?1e6:n._sortY)+(n.vars.refreshPriority||0)*-1e6)})};Ve.observe=function(r){return new mn(r)};Ve.normalizeScroll=function(r){if(typeof r>"u")return $n;if(r===!0&&$n)return $n.enable();if(r===!1){$n&&$n.kill(),$n=r;return}var e=r instanceof mn?r:H1(r);return $n&&$n.target===e.target&&$n.kill(),oo(e.target)&&($n=e),e};Ve.core={_getVelocityProp:zf,_inputObserver:M0,_scrollers:wt,_proxies:dr,bridge:{ss:function(){Fi||lo("scrollStart"),Fi=Hn()},ref:function(){return zn}}};h0()&&je.registerPlugin(Ve);const V1=Object.freeze(Object.defineProperty({__proto__:null,ScrollTrigger:Ve,default:Ve},Symbol.toStringTag,{value:"Module"}));function Ar(r){if(r===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return r}function E0(r,e){r.prototype=Object.create(e.prototype),r.prototype.constructor=r,r.__proto__=e}/*!
 * GSAP 3.12.7
 * https://gsap.com
 *
 * @license Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license or for
 * Club GSAP members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/var Si={autoSleep:120,force3D:"auto",nullTargetWarn:1,units:{lineHeight:""}},ga={duration:.5,overwrite:!1,delay:0},jh,Fn,rn,Ni=1e8,Zt=1/Ni,jf=Math.PI*2,G1=jf/4,W1=0,T0=Math.sqrt,X1=Math.cos,q1=Math.sin,Ln=function(e){return typeof e=="string"},dn=function(e){return typeof e=="function"},Hr=function(e){return typeof e=="number"},$h=function(e){return typeof e>"u"},mr=function(e){return typeof e=="object"},oi=function(e){return e!==!1},Kh=function(){return typeof window<"u"},Oc=function(e){return dn(e)||Ln(e)},A0=typeof ArrayBuffer=="function"&&ArrayBuffer.isView||function(){},Wn=Array.isArray,$f=/(?:-?\.?\d|\.)+/gi,C0=/[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,Xo=/[-+=.]*\d+[.e-]*\d*[a-z%]*/g,Rd=/[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,R0=/[+-]=-?[.\d]+/,P0=/[^,'"\[\]\s]+/gi,Y1=/^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,on,ir,Kf,Zh,Mi={},mu={},L0,D0=function(e){return(mu=_a(e,Mi))&&ui},Jh=function(e,t){return console.warn("Invalid property",e,"set to",t,"Missing plugin? gsap.registerPlugin()")},Dl=function(e,t){return!t&&console.warn(e)},I0=function(e,t){return e&&(Mi[e]=t)&&mu&&(mu[e]=t)||Mi},Il=function(){return 0},j1={suppressEvents:!0,isStart:!0,kill:!1},Zc={suppressEvents:!0,kill:!1},$1={suppressEvents:!0},Qh={},ms=[],Zf={},O0,gi={},Pd={},xg=30,Jc=[],ep="",tp=function(e){var t=e[0],n,i;if(mr(t)||dn(t)||(e=[e]),!(n=(t._gsap||{}).harness)){for(i=Jc.length;i--&&!Jc[i].targetTest(t););n=Jc[i]}for(i=e.length;i--;)e[i]&&(e[i]._gsap||(e[i]._gsap=new rv(e[i],n)))||e.splice(i,1);return e},Qs=function(e){return e._gsap||tp(Ui(e))[0]._gsap},N0=function(e,t,n){return(n=e[t])&&dn(n)?e[t]():$h(n)&&e.getAttribute&&e.getAttribute(t)||n},ai=function(e,t){return(e=e.split(",")).forEach(t)||e},hn=function(e){return Math.round(e*1e5)/1e5||0},xn=function(e){return Math.round(e*1e7)/1e7||0},ea=function(e,t){var n=t.charAt(0),i=parseFloat(t.substr(2));return e=parseFloat(e),n==="+"?e+i:n==="-"?e-i:n==="*"?e*i:e/i},K1=function(e,t){for(var n=t.length,i=0;e.indexOf(t[i])<0&&++i<n;);return i<n},gu=function(){var e=ms.length,t=ms.slice(0),n,i;for(Zf={},ms.length=0,n=0;n<e;n++)i=t[n],i&&i._lazy&&(i.render(i._lazy[0],i._lazy[1],!0)._lazy=0)},U0=function(e,t,n,i){ms.length&&!Fn&&gu(),e.render(t,n,Fn&&t<0&&(e._initted||e._startAt)),ms.length&&!Fn&&gu()},F0=function(e){var t=parseFloat(e);return(t||t===0)&&(e+"").match(P0).length<2?t:Ln(e)?e.trim():e},k0=function(e){return e},Ei=function(e,t){for(var n in t)n in e||(e[n]=t[n]);return e},Z1=function(e){return function(t,n){for(var i in n)i in t||i==="duration"&&e||i==="ease"||(t[i]=n[i])}},_a=function(e,t){for(var n in t)e[n]=t[n];return e},bg=function r(e,t){for(var n in t)n!=="__proto__"&&n!=="constructor"&&n!=="prototype"&&(e[n]=mr(t[n])?r(e[n]||(e[n]={}),t[n]):t[n]);return e},_u=function(e,t){var n={},i;for(i in e)i in t||(n[i]=e[i]);return n},gl=function(e){var t=e.parent||on,n=e.keyframes?Z1(Wn(e.keyframes)):Ei;if(oi(e.inherit))for(;t;)n(e,t.vars.defaults),t=t.parent||t._dp;return e},J1=function(e,t){for(var n=e.length,i=n===t.length;i&&n--&&e[n]===t[n];);return n<0},B0=function(e,t,n,i,s){var o=e[i],a;if(s)for(a=t[s];o&&o[s]>a;)o=o._prev;return o?(t._next=o._next,o._next=t):(t._next=e[n],e[n]=t),t._next?t._next._prev=t:e[i]=t,t._prev=o,t.parent=t._dp=e,t},Ru=function(e,t,n,i){n===void 0&&(n="_first"),i===void 0&&(i="_last");var s=t._prev,o=t._next;s?s._next=o:e[n]===t&&(e[n]=o),o?o._prev=s:e[i]===t&&(e[i]=s),t._next=t._prev=t.parent=null},xs=function(e,t){e.parent&&(!t||e.parent.autoRemoveChildren)&&e.parent.remove&&e.parent.remove(e),e._act=0},eo=function(e,t){if(e&&(!t||t._end>e._dur||t._start<0))for(var n=e;n;)n._dirty=1,n=n.parent;return e},Q1=function(e){for(var t=e.parent;t&&t.parent;)t._dirty=1,t.totalDuration(),t=t.parent;return e},Jf=function(e,t,n,i){return e._startAt&&(Fn?e._startAt.revert(Zc):e.vars.immediateRender&&!e.vars.autoRevert||e._startAt.render(t,!0,i))},eA=function r(e){return!e||e._ts&&r(e.parent)},Sg=function(e){return e._repeat?va(e._tTime,e=e.duration()+e._rDelay)*e:0},va=function(e,t){var n=Math.floor(e=xn(e/t));return e&&n===e?n-1:n},vu=function(e,t){return(e-t._start)*t._ts+(t._ts>=0?0:t._dirty?t.totalDuration():t._tDur)},Pu=function(e){return e._end=xn(e._start+(e._tDur/Math.abs(e._ts||e._rts||Zt)||0))},Lu=function(e,t){var n=e._dp;return n&&n.smoothChildTiming&&e._ts&&(e._start=xn(n._time-(e._ts>0?t/e._ts:((e._dirty?e.totalDuration():e._tDur)-t)/-e._ts)),Pu(e),n._dirty||eo(n,e)),e},z0=function(e,t){var n;if((t._time||!t._dur&&t._initted||t._start<e._time&&(t._dur||!t.add))&&(n=vu(e.rawTime(),t),(!t._dur||Wl(0,t.totalDuration(),n)-t._tTime>Zt)&&t.render(n,!0)),eo(e,t)._dp&&e._initted&&e._time>=e._dur&&e._ts){if(e._dur<e.duration())for(n=e;n._dp;)n.rawTime()>=0&&n.totalTime(n._tTime),n=n._dp;e._zTime=-Zt}},sr=function(e,t,n,i){return t.parent&&xs(t),t._start=xn((Hr(n)?n:n||e!==on?Ai(e,n,t):e._time)+t._delay),t._end=xn(t._start+(t.totalDuration()/Math.abs(t.timeScale())||0)),B0(e,t,"_first","_last",e._sort?"_start":0),Qf(t)||(e._recent=t),i||z0(e,t),e._ts<0&&Lu(e,e._tTime),e},H0=function(e,t){return(Mi.ScrollTrigger||Jh("scrollTrigger",t))&&Mi.ScrollTrigger.create(t,e)},V0=function(e,t,n,i,s){if(ip(e,t,s),!e._initted)return 1;if(!n&&e._pt&&!Fn&&(e._dur&&e.vars.lazy!==!1||!e._dur&&e.vars.lazy)&&O0!==yi.frame)return ms.push(e),e._lazy=[s,i],1},tA=function r(e){var t=e.parent;return t&&t._ts&&t._initted&&!t._lock&&(t.rawTime()<0||r(t))},Qf=function(e){var t=e.data;return t==="isFromStart"||t==="isStart"},nA=function(e,t,n,i){var s=e.ratio,o=t<0||!t&&(!e._start&&tA(e)&&!(!e._initted&&Qf(e))||(e._ts<0||e._dp._ts<0)&&!Qf(e))?0:1,a=e._rDelay,l=0,c,u,d;if(a&&e._repeat&&(l=Wl(0,e._tDur,t),u=va(l,a),e._yoyo&&u&1&&(o=1-o),u!==va(e._tTime,a)&&(s=1-o,e.vars.repeatRefresh&&e._initted&&e.invalidate())),o!==s||Fn||i||e._zTime===Zt||!t&&e._zTime){if(!e._initted&&V0(e,t,i,n,l))return;for(d=e._zTime,e._zTime=t||(n?Zt:0),n||(n=t&&!d),e.ratio=o,e._from&&(o=1-o),e._time=0,e._tTime=l,c=e._pt;c;)c.r(o,c.d),c=c._next;t<0&&Jf(e,t,n,!0),e._onUpdate&&!n&&bi(e,"onUpdate"),l&&e._repeat&&!n&&e.parent&&bi(e,"onRepeat"),(t>=e._tDur||t<0)&&e.ratio===o&&(o&&xs(e,1),!n&&!Fn&&(bi(e,o?"onComplete":"onReverseComplete",!0),e._prom&&e._prom()))}else e._zTime||(e._zTime=t)},iA=function(e,t,n){var i;if(n>t)for(i=e._first;i&&i._start<=n;){if(i.data==="isPause"&&i._start>t)return i;i=i._next}else for(i=e._last;i&&i._start>=n;){if(i.data==="isPause"&&i._start<t)return i;i=i._prev}},ya=function(e,t,n,i){var s=e._repeat,o=xn(t)||0,a=e._tTime/e._tDur;return a&&!i&&(e._time*=o/e._dur),e._dur=o,e._tDur=s?s<0?1e10:xn(o*(s+1)+e._rDelay*s):o,a>0&&!i&&Lu(e,e._tTime=e._tDur*a),e.parent&&Pu(e),n||eo(e.parent,e),e},wg=function(e){return e instanceof Nn?eo(e):ya(e,e._dur)},rA={_start:0,endTime:Il,totalDuration:Il},Ai=function r(e,t,n){var i=e.labels,s=e._recent||rA,o=e.duration()>=Ni?s.endTime(!1):e._dur,a,l,c;return Ln(t)&&(isNaN(t)||t in i)?(l=t.charAt(0),c=t.substr(-1)==="%",a=t.indexOf("="),l==="<"||l===">"?(a>=0&&(t=t.replace(/=/,"")),(l==="<"?s._start:s.endTime(s._repeat>=0))+(parseFloat(t.substr(1))||0)*(c?(a<0?s:n).totalDuration()/100:1)):a<0?(t in i||(i[t]=o),i[t]):(l=parseFloat(t.charAt(a-1)+t.substr(a+1)),c&&n&&(l=l/100*(Wn(n)?n[0]:n).totalDuration()),a>1?r(e,t.substr(0,a-1),n)+l:o+l)):t==null?o:+t},_l=function(e,t,n){var i=Hr(t[1]),s=(i?2:1)+(e<2?0:1),o=t[s],a,l;if(i&&(o.duration=t[1]),o.parent=n,e){for(a=o,l=n;l&&!("immediateRender"in a);)a=l.vars.defaults||{},l=oi(l.vars.inherit)&&l.parent;o.immediateRender=oi(a.immediateRender),e<2?o.runBackwards=1:o.startAt=t[s-1]}return new pn(t[0],o,t[s+1])},Es=function(e,t){return e||e===0?t(e):t},Wl=function(e,t,n){return n<e?e:n>t?t:n},Gn=function(e,t){return!Ln(e)||!(t=Y1.exec(e))?"":t[1]},sA=function(e,t,n){return Es(n,function(i){return Wl(e,t,i)})},eh=[].slice,G0=function(e,t){return e&&mr(e)&&"length"in e&&(!t&&!e.length||e.length-1 in e&&mr(e[0]))&&!e.nodeType&&e!==ir},oA=function(e,t,n){return n===void 0&&(n=[]),e.forEach(function(i){var s;return Ln(i)&&!t||G0(i,1)?(s=n).push.apply(s,Ui(i)):n.push(i)})||n},Ui=function(e,t,n){return rn&&!t&&rn.selector?rn.selector(e):Ln(e)&&!n&&(Kf||!xa())?eh.call((t||Zh).querySelectorAll(e),0):Wn(e)?oA(e,n):G0(e)?eh.call(e,0):e?[e]:[]},th=function(e){return e=Ui(e)[0]||Dl("Invalid scope")||{},function(t){var n=e.current||e.nativeElement||e;return Ui(t,n.querySelectorAll?n:n===e?Dl("Invalid scope")||Zh.createElement("div"):e)}},W0=function(e){return e.sort(function(){return .5-Math.random()})},X0=function(e){if(dn(e))return e;var t=mr(e)?e:{each:e},n=to(t.ease),i=t.from||0,s=parseFloat(t.base)||0,o={},a=i>0&&i<1,l=isNaN(i)||a,c=t.axis,u=i,d=i;return Ln(i)?u=d={center:.5,edges:.5,end:1}[i]||0:!a&&l&&(u=i[0],d=i[1]),function(f,h,_){var g=(_||t).length,m=o[g],p,S,x,v,T,M,E,P,y;if(!m){if(y=t.grid==="auto"?0:(t.grid||[1,Ni])[1],!y){for(E=-Ni;E<(E=_[y++].getBoundingClientRect().left)&&y<g;);y<g&&y--}for(m=o[g]=[],p=l?Math.min(y,g)*u-.5:i%y,S=y===Ni?0:l?g*d/y-.5:i/y|0,E=0,P=Ni,M=0;M<g;M++)x=M%y-p,v=S-(M/y|0),m[M]=T=c?Math.abs(c==="y"?v:x):T0(x*x+v*v),T>E&&(E=T),T<P&&(P=T);i==="random"&&W0(m),m.max=E-P,m.min=P,m.v=g=(parseFloat(t.amount)||parseFloat(t.each)*(y>g?g-1:c?c==="y"?g/y:y:Math.max(y,g/y))||0)*(i==="edges"?-1:1),m.b=g<0?s-g:s,m.u=Gn(t.amount||t.each)||0,n=n&&g<0?tv(n):n}return g=(m[f]-m.min)/m.max||0,xn(m.b+(n?n(g):g)*m.v)+m.u}},nh=function(e){var t=Math.pow(10,((e+"").split(".")[1]||"").length);return function(n){var i=xn(Math.round(parseFloat(n)/e)*e*t);return(i-i%1)/t+(Hr(n)?0:Gn(n))}},q0=function(e,t){var n=Wn(e),i,s;return!n&&mr(e)&&(i=n=e.radius||Ni,e.values?(e=Ui(e.values),(s=!Hr(e[0]))&&(i*=i)):e=nh(e.increment)),Es(t,n?dn(e)?function(o){return s=e(o),Math.abs(s-o)<=i?s:o}:function(o){for(var a=parseFloat(s?o.x:o),l=parseFloat(s?o.y:0),c=Ni,u=0,d=e.length,f,h;d--;)s?(f=e[d].x-a,h=e[d].y-l,f=f*f+h*h):f=Math.abs(e[d]-a),f<c&&(c=f,u=d);return u=!i||c<=i?e[u]:o,s||u===o||Hr(o)?u:u+Gn(o)}:nh(e))},Y0=function(e,t,n,i){return Es(Wn(e)?!t:n===!0?!!(n=0):!i,function(){return Wn(e)?e[~~(Math.random()*e.length)]:(n=n||1e-5)&&(i=n<1?Math.pow(10,(n+"").length-2):1)&&Math.floor(Math.round((e-n/2+Math.random()*(t-e+n*.99))/n)*n*i)/i})},aA=function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return function(i){return t.reduce(function(s,o){return o(s)},i)}},lA=function(e,t){return function(n){return e(parseFloat(n))+(t||Gn(n))}},cA=function(e,t,n){return $0(e,t,0,1,n)},j0=function(e,t,n){return Es(n,function(i){return e[~~t(i)]})},uA=function r(e,t,n){var i=t-e;return Wn(e)?j0(e,r(0,e.length),t):Es(n,function(s){return(i+(s-e)%i)%i+e})},dA=function r(e,t,n){var i=t-e,s=i*2;return Wn(e)?j0(e,r(0,e.length-1),t):Es(n,function(o){return o=(s+(o-e)%s)%s||0,e+(o>i?s-o:o)})},Ol=function(e){for(var t=0,n="",i,s,o,a;~(i=e.indexOf("random(",t));)o=e.indexOf(")",i),a=e.charAt(i+7)==="[",s=e.substr(i+7,o-i-7).match(a?P0:$f),n+=e.substr(t,i-t)+Y0(a?s:+s[0],a?0:+s[1],+s[2]||1e-5),t=o+1;return n+e.substr(t,e.length-t)},$0=function(e,t,n,i,s){var o=t-e,a=i-n;return Es(s,function(l){return n+((l-e)/o*a||0)})},fA=function r(e,t,n,i){var s=isNaN(e+t)?0:function(h){return(1-h)*e+h*t};if(!s){var o=Ln(e),a={},l,c,u,d,f;if(n===!0&&(i=1)&&(n=null),o)e={p:e},t={p:t};else if(Wn(e)&&!Wn(t)){for(u=[],d=e.length,f=d-2,c=1;c<d;c++)u.push(r(e[c-1],e[c]));d--,s=function(_){_*=d;var g=Math.min(f,~~_);return u[g](_-g)},n=t}else i||(e=_a(Wn(e)?[]:{},e));if(!u){for(l in t)np.call(a,e,l,"get",t[l]);s=function(_){return op(_,a)||(o?e.p:e)}}}return Es(n,s)},Mg=function(e,t,n){var i=e.labels,s=Ni,o,a,l;for(o in i)a=i[o]-t,a<0==!!n&&a&&s>(a=Math.abs(a))&&(l=o,s=a);return l},bi=function(e,t,n){var i=e.vars,s=i[t],o=rn,a=e._ctx,l,c,u;if(s)return l=i[t+"Params"],c=i.callbackScope||e,n&&ms.length&&gu(),a&&(rn=a),u=l?s.apply(c,l):s.call(c),rn=o,u},Za=function(e){return xs(e),e.scrollTrigger&&e.scrollTrigger.kill(!!Fn),e.progress()<1&&bi(e,"onInterrupt"),e},qo,K0=[],Z0=function(e){if(e)if(e=!e.name&&e.default||e,Kh()||e.headless){var t=e.name,n=dn(e),i=t&&!n&&e.init?function(){this._props=[]}:e,s={init:Il,render:op,add:np,kill:CA,modifier:AA,rawVars:0},o={targetTest:0,get:0,getSetter:sp,aliases:{},register:0};if(xa(),e!==i){if(gi[t])return;Ei(i,Ei(_u(e,s),o)),_a(i.prototype,_a(s,_u(e,o))),gi[i.prop=t]=i,e.targetTest&&(Jc.push(i),Qh[t]=1),t=(t==="css"?"CSS":t.charAt(0).toUpperCase()+t.substr(1))+"Plugin"}I0(t,i),e.register&&e.register(ui,i,li)}else K0.push(e)},Kt=255,Ja={aqua:[0,Kt,Kt],lime:[0,Kt,0],silver:[192,192,192],black:[0,0,0],maroon:[128,0,0],teal:[0,128,128],blue:[0,0,Kt],navy:[0,0,128],white:[Kt,Kt,Kt],olive:[128,128,0],yellow:[Kt,Kt,0],orange:[Kt,165,0],gray:[128,128,128],purple:[128,0,128],green:[0,128,0],red:[Kt,0,0],pink:[Kt,192,203],cyan:[0,Kt,Kt],transparent:[Kt,Kt,Kt,0]},Ld=function(e,t,n){return e+=e<0?1:e>1?-1:0,(e*6<1?t+(n-t)*e*6:e<.5?n:e*3<2?t+(n-t)*(2/3-e)*6:t)*Kt+.5|0},J0=function(e,t,n){var i=e?Hr(e)?[e>>16,e>>8&Kt,e&Kt]:0:Ja.black,s,o,a,l,c,u,d,f,h,_;if(!i){if(e.substr(-1)===","&&(e=e.substr(0,e.length-1)),Ja[e])i=Ja[e];else if(e.charAt(0)==="#"){if(e.length<6&&(s=e.charAt(1),o=e.charAt(2),a=e.charAt(3),e="#"+s+s+o+o+a+a+(e.length===5?e.charAt(4)+e.charAt(4):"")),e.length===9)return i=parseInt(e.substr(1,6),16),[i>>16,i>>8&Kt,i&Kt,parseInt(e.substr(7),16)/255];e=parseInt(e.substr(1),16),i=[e>>16,e>>8&Kt,e&Kt]}else if(e.substr(0,3)==="hsl"){if(i=_=e.match($f),!t)l=+i[0]%360/360,c=+i[1]/100,u=+i[2]/100,o=u<=.5?u*(c+1):u+c-u*c,s=u*2-o,i.length>3&&(i[3]*=1),i[0]=Ld(l+1/3,s,o),i[1]=Ld(l,s,o),i[2]=Ld(l-1/3,s,o);else if(~e.indexOf("="))return i=e.match(C0),n&&i.length<4&&(i[3]=1),i}else i=e.match($f)||Ja.transparent;i=i.map(Number)}return t&&!_&&(s=i[0]/Kt,o=i[1]/Kt,a=i[2]/Kt,d=Math.max(s,o,a),f=Math.min(s,o,a),u=(d+f)/2,d===f?l=c=0:(h=d-f,c=u>.5?h/(2-d-f):h/(d+f),l=d===s?(o-a)/h+(o<a?6:0):d===o?(a-s)/h+2:(s-o)/h+4,l*=60),i[0]=~~(l+.5),i[1]=~~(c*100+.5),i[2]=~~(u*100+.5)),n&&i.length<4&&(i[3]=1),i},Q0=function(e){var t=[],n=[],i=-1;return e.split(gs).forEach(function(s){var o=s.match(Xo)||[];t.push.apply(t,o),n.push(i+=o.length+1)}),t.c=n,t},Eg=function(e,t,n){var i="",s=(e+i).match(gs),o=t?"hsla(":"rgba(",a=0,l,c,u,d;if(!s)return e;if(s=s.map(function(f){return(f=J0(f,t,1))&&o+(t?f[0]+","+f[1]+"%,"+f[2]+"%,"+f[3]:f.join(","))+")"}),n&&(u=Q0(e),l=n.c,l.join(i)!==u.c.join(i)))for(c=e.replace(gs,"1").split(Xo),d=c.length-1;a<d;a++)i+=c[a]+(~l.indexOf(a)?s.shift()||o+"0,0,0,0)":(u.length?u:s.length?s:n).shift());if(!c)for(c=e.split(gs),d=c.length-1;a<d;a++)i+=c[a]+s[a];return i+c[d]},gs=function(){var r="(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b",e;for(e in Ja)r+="|"+e+"\\b";return new RegExp(r+")","gi")}(),hA=/hsl[a]?\(/,ev=function(e){var t=e.join(" "),n;if(gs.lastIndex=0,gs.test(t))return n=hA.test(t),e[1]=Eg(e[1],n),e[0]=Eg(e[0],n,Q0(e[1])),!0},Nl,yi=function(){var r=Date.now,e=500,t=33,n=r(),i=n,s=1e3/240,o=s,a=[],l,c,u,d,f,h,_=function g(m){var p=r()-i,S=m===!0,x,v,T,M;if((p>e||p<0)&&(n+=p-t),i+=p,T=i-n,x=T-o,(x>0||S)&&(M=++d.frame,f=T-d.time*1e3,d.time=T=T/1e3,o+=x+(x>=s?4:s-x),v=1),S||(l=c(g)),v)for(h=0;h<a.length;h++)a[h](T,f,M,m)};return d={time:0,frame:0,tick:function(){_(!0)},deltaRatio:function(m){return f/(1e3/(m||60))},wake:function(){L0&&(!Kf&&Kh()&&(ir=Kf=window,Zh=ir.document||{},Mi.gsap=ui,(ir.gsapVersions||(ir.gsapVersions=[])).push(ui.version),D0(mu||ir.GreenSockGlobals||!ir.gsap&&ir||{}),K0.forEach(Z0)),u=typeof requestAnimationFrame<"u"&&requestAnimationFrame,l&&d.sleep(),c=u||function(m){return setTimeout(m,o-d.time*1e3+1|0)},Nl=1,_(2))},sleep:function(){(u?cancelAnimationFrame:clearTimeout)(l),Nl=0,c=Il},lagSmoothing:function(m,p){e=m||1/0,t=Math.min(p||33,e)},fps:function(m){s=1e3/(m||240),o=d.time*1e3+s},add:function(m,p,S){var x=p?function(v,T,M,E){m(v,T,M,E),d.remove(x)}:m;return d.remove(m),a[S?"unshift":"push"](x),xa(),x},remove:function(m,p){~(p=a.indexOf(m))&&a.splice(p,1)&&h>=p&&h--},_listeners:a},d}(),xa=function(){return!Nl&&yi.wake()},Lt={},pA=/^[\d.\-M][\d.\-,\s]/,mA=/["']/g,gA=function(e){for(var t={},n=e.substr(1,e.length-3).split(":"),i=n[0],s=1,o=n.length,a,l,c;s<o;s++)l=n[s],a=s!==o-1?l.lastIndexOf(","):l.length,c=l.substr(0,a),t[i]=isNaN(c)?c.replace(mA,"").trim():+c,i=l.substr(a+1).trim();return t},_A=function(e){var t=e.indexOf("(")+1,n=e.indexOf(")"),i=e.indexOf("(",t);return e.substring(t,~i&&i<n?e.indexOf(")",n+1):n)},vA=function(e){var t=(e+"").split("("),n=Lt[t[0]];return n&&t.length>1&&n.config?n.config.apply(null,~e.indexOf("{")?[gA(t[1])]:_A(e).split(",").map(F0)):Lt._CE&&pA.test(e)?Lt._CE("",e):n},tv=function(e){return function(t){return 1-e(1-t)}},nv=function r(e,t){for(var n=e._first,i;n;)n instanceof Nn?r(n,t):n.vars.yoyoEase&&(!n._yoyo||!n._repeat)&&n._yoyo!==t&&(n.timeline?r(n.timeline,t):(i=n._ease,n._ease=n._yEase,n._yEase=i,n._yoyo=t)),n=n._next},to=function(e,t){return e&&(dn(e)?e:Lt[e]||vA(e))||t},ho=function(e,t,n,i){n===void 0&&(n=function(l){return 1-t(1-l)}),i===void 0&&(i=function(l){return l<.5?t(l*2)/2:1-t((1-l)*2)/2});var s={easeIn:t,easeOut:n,easeInOut:i},o;return ai(e,function(a){Lt[a]=Mi[a]=s,Lt[o=a.toLowerCase()]=n;for(var l in s)Lt[o+(l==="easeIn"?".in":l==="easeOut"?".out":".inOut")]=Lt[a+"."+l]=s[l]}),s},iv=function(e){return function(t){return t<.5?(1-e(1-t*2))/2:.5+e((t-.5)*2)/2}},Dd=function r(e,t,n){var i=t>=1?t:1,s=(n||(e?.3:.45))/(t<1?t:1),o=s/jf*(Math.asin(1/i)||0),a=function(u){return u===1?1:i*Math.pow(2,-10*u)*q1((u-o)*s)+1},l=e==="out"?a:e==="in"?function(c){return 1-a(1-c)}:iv(a);return s=jf/s,l.config=function(c,u){return r(e,c,u)},l},Id=function r(e,t){t===void 0&&(t=1.70158);var n=function(o){return o?--o*o*((t+1)*o+t)+1:0},i=e==="out"?n:e==="in"?function(s){return 1-n(1-s)}:iv(n);return i.config=function(s){return r(e,s)},i};ai("Linear,Quad,Cubic,Quart,Quint,Strong",function(r,e){var t=e<5?e+1:e;ho(r+",Power"+(t-1),e?function(n){return Math.pow(n,t)}:function(n){return n},function(n){return 1-Math.pow(1-n,t)},function(n){return n<.5?Math.pow(n*2,t)/2:1-Math.pow((1-n)*2,t)/2})});Lt.Linear.easeNone=Lt.none=Lt.Linear.easeIn;ho("Elastic",Dd("in"),Dd("out"),Dd());(function(r,e){var t=1/e,n=2*t,i=2.5*t,s=function(a){return a<t?r*a*a:a<n?r*Math.pow(a-1.5/e,2)+.75:a<i?r*(a-=2.25/e)*a+.9375:r*Math.pow(a-2.625/e,2)+.984375};ho("Bounce",function(o){return 1-s(1-o)},s)})(7.5625,2.75);ho("Expo",function(r){return Math.pow(2,10*(r-1))*r+r*r*r*r*r*r*(1-r)});ho("Circ",function(r){return-(T0(1-r*r)-1)});ho("Sine",function(r){return r===1?1:-X1(r*G1)+1});ho("Back",Id("in"),Id("out"),Id());Lt.SteppedEase=Lt.steps=Mi.SteppedEase={config:function(e,t){e===void 0&&(e=1);var n=1/e,i=e+(t?0:1),s=t?1:0,o=1-Zt;return function(a){return((i*Wl(0,o,a)|0)+s)*n}}};ga.ease=Lt["quad.out"];ai("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt",function(r){return ep+=r+","+r+"Params,"});var rv=function(e,t){this.id=W1++,e._gsap=this,this.target=e,this.harness=t,this.get=t?t.get:N0,this.set=t?t.getSetter:sp},Ul=function(){function r(t){this.vars=t,this._delay=+t.delay||0,(this._repeat=t.repeat===1/0?-2:t.repeat||0)&&(this._rDelay=t.repeatDelay||0,this._yoyo=!!t.yoyo||!!t.yoyoEase),this._ts=1,ya(this,+t.duration,1,1),this.data=t.data,rn&&(this._ctx=rn,rn.data.push(this)),Nl||yi.wake()}var e=r.prototype;return e.delay=function(n){return n||n===0?(this.parent&&this.parent.smoothChildTiming&&this.startTime(this._start+n-this._delay),this._delay=n,this):this._delay},e.duration=function(n){return arguments.length?this.totalDuration(this._repeat>0?n+(n+this._rDelay)*this._repeat:n):this.totalDuration()&&this._dur},e.totalDuration=function(n){return arguments.length?(this._dirty=0,ya(this,this._repeat<0?n:(n-this._repeat*this._rDelay)/(this._repeat+1))):this._tDur},e.totalTime=function(n,i){if(xa(),!arguments.length)return this._tTime;var s=this._dp;if(s&&s.smoothChildTiming&&this._ts){for(Lu(this,n),!s._dp||s.parent||z0(s,this);s&&s.parent;)s.parent._time!==s._start+(s._ts>=0?s._tTime/s._ts:(s.totalDuration()-s._tTime)/-s._ts)&&s.totalTime(s._tTime,!0),s=s.parent;!this.parent&&this._dp.autoRemoveChildren&&(this._ts>0&&n<this._tDur||this._ts<0&&n>0||!this._tDur&&!n)&&sr(this._dp,this,this._start-this._delay)}return(this._tTime!==n||!this._dur&&!i||this._initted&&Math.abs(this._zTime)===Zt||!n&&!this._initted&&(this.add||this._ptLookup))&&(this._ts||(this._pTime=n),U0(this,n,i)),this},e.time=function(n,i){return arguments.length?this.totalTime(Math.min(this.totalDuration(),n+Sg(this))%(this._dur+this._rDelay)||(n?this._dur:0),i):this._time},e.totalProgress=function(n,i){return arguments.length?this.totalTime(this.totalDuration()*n,i):this.totalDuration()?Math.min(1,this._tTime/this._tDur):this.rawTime()>=0&&this._initted?1:0},e.progress=function(n,i){return arguments.length?this.totalTime(this.duration()*(this._yoyo&&!(this.iteration()&1)?1-n:n)+Sg(this),i):this.duration()?Math.min(1,this._time/this._dur):this.rawTime()>0?1:0},e.iteration=function(n,i){var s=this.duration()+this._rDelay;return arguments.length?this.totalTime(this._time+(n-1)*s,i):this._repeat?va(this._tTime,s)+1:1},e.timeScale=function(n,i){if(!arguments.length)return this._rts===-Zt?0:this._rts;if(this._rts===n)return this;var s=this.parent&&this._ts?vu(this.parent._time,this):this._tTime;return this._rts=+n||0,this._ts=this._ps||n===-Zt?0:this._rts,this.totalTime(Wl(-Math.abs(this._delay),this._tDur,s),i!==!1),Pu(this),Q1(this)},e.paused=function(n){return arguments.length?(this._ps!==n&&(this._ps=n,n?(this._pTime=this._tTime||Math.max(-this._delay,this.rawTime()),this._ts=this._act=0):(xa(),this._ts=this._rts,this.totalTime(this.parent&&!this.parent.smoothChildTiming?this.rawTime():this._tTime||this._pTime,this.progress()===1&&Math.abs(this._zTime)!==Zt&&(this._tTime-=Zt)))),this):this._ps},e.startTime=function(n){if(arguments.length){this._start=n;var i=this.parent||this._dp;return i&&(i._sort||!this.parent)&&sr(i,this,n-this._delay),this}return this._start},e.endTime=function(n){return this._start+(oi(n)?this.totalDuration():this.duration())/Math.abs(this._ts||1)},e.rawTime=function(n){var i=this.parent||this._dp;return i?n&&(!this._ts||this._repeat&&this._time&&this.totalProgress()<1)?this._tTime%(this._dur+this._rDelay):this._ts?vu(i.rawTime(n),this):this._tTime:this._tTime},e.revert=function(n){n===void 0&&(n=$1);var i=Fn;return Fn=n,(this._initted||this._startAt)&&(this.timeline&&this.timeline.revert(n),this.totalTime(-.01,n.suppressEvents)),this.data!=="nested"&&n.kill!==!1&&this.kill(),Fn=i,this},e.globalTime=function(n){for(var i=this,s=arguments.length?n:i.rawTime();i;)s=i._start+s/(Math.abs(i._ts)||1),i=i._dp;return!this.parent&&this._sat?this._sat.globalTime(n):s},e.repeat=function(n){return arguments.length?(this._repeat=n===1/0?-2:n,wg(this)):this._repeat===-2?1/0:this._repeat},e.repeatDelay=function(n){if(arguments.length){var i=this._time;return this._rDelay=n,wg(this),i?this.time(i):this}return this._rDelay},e.yoyo=function(n){return arguments.length?(this._yoyo=n,this):this._yoyo},e.seek=function(n,i){return this.totalTime(Ai(this,n),oi(i))},e.restart=function(n,i){return this.play().totalTime(n?-this._delay:0,oi(i)),this._dur||(this._zTime=-Zt),this},e.play=function(n,i){return n!=null&&this.seek(n,i),this.reversed(!1).paused(!1)},e.reverse=function(n,i){return n!=null&&this.seek(n||this.totalDuration(),i),this.reversed(!0).paused(!1)},e.pause=function(n,i){return n!=null&&this.seek(n,i),this.paused(!0)},e.resume=function(){return this.paused(!1)},e.reversed=function(n){return arguments.length?(!!n!==this.reversed()&&this.timeScale(-this._rts||(n?-Zt:0)),this):this._rts<0},e.invalidate=function(){return this._initted=this._act=0,this._zTime=-Zt,this},e.isActive=function(){var n=this.parent||this._dp,i=this._start,s;return!!(!n||this._ts&&this._initted&&n.isActive()&&(s=n.rawTime(!0))>=i&&s<this.endTime(!0)-Zt)},e.eventCallback=function(n,i,s){var o=this.vars;return arguments.length>1?(i?(o[n]=i,s&&(o[n+"Params"]=s),n==="onUpdate"&&(this._onUpdate=i)):delete o[n],this):o[n]},e.then=function(n){var i=this;return new Promise(function(s){var o=dn(n)?n:k0,a=function(){var c=i.then;i.then=null,dn(o)&&(o=o(i))&&(o.then||o===i)&&(i.then=c),s(o),i.then=c};i._initted&&i.totalProgress()===1&&i._ts>=0||!i._tTime&&i._ts<0?a():i._prom=a})},e.kill=function(){Za(this)},r}();Ei(Ul.prototype,{_time:0,_start:0,_end:0,_tTime:0,_tDur:0,_dirty:0,_repeat:0,_yoyo:!1,parent:null,_initted:!1,_rDelay:0,_ts:1,_dp:0,ratio:0,_zTime:-Zt,_prom:0,_ps:!1,_rts:1});var Nn=function(r){E0(e,r);function e(n,i){var s;return n===void 0&&(n={}),s=r.call(this,n)||this,s.labels={},s.smoothChildTiming=!!n.smoothChildTiming,s.autoRemoveChildren=!!n.autoRemoveChildren,s._sort=oi(n.sortChildren),on&&sr(n.parent||on,Ar(s),i),n.reversed&&s.reverse(),n.paused&&s.paused(!0),n.scrollTrigger&&H0(Ar(s),n.scrollTrigger),s}var t=e.prototype;return t.to=function(i,s,o){return _l(0,arguments,this),this},t.from=function(i,s,o){return _l(1,arguments,this),this},t.fromTo=function(i,s,o,a){return _l(2,arguments,this),this},t.set=function(i,s,o){return s.duration=0,s.parent=this,gl(s).repeatDelay||(s.repeat=0),s.immediateRender=!!s.immediateRender,new pn(i,s,Ai(this,o),1),this},t.call=function(i,s,o){return sr(this,pn.delayedCall(0,i,s),o)},t.staggerTo=function(i,s,o,a,l,c,u){return o.duration=s,o.stagger=o.stagger||a,o.onComplete=c,o.onCompleteParams=u,o.parent=this,new pn(i,o,Ai(this,l)),this},t.staggerFrom=function(i,s,o,a,l,c,u){return o.runBackwards=1,gl(o).immediateRender=oi(o.immediateRender),this.staggerTo(i,s,o,a,l,c,u)},t.staggerFromTo=function(i,s,o,a,l,c,u,d){return a.startAt=o,gl(a).immediateRender=oi(a.immediateRender),this.staggerTo(i,s,a,l,c,u,d)},t.render=function(i,s,o){var a=this._time,l=this._dirty?this.totalDuration():this._tDur,c=this._dur,u=i<=0?0:xn(i),d=this._zTime<0!=i<0&&(this._initted||!c),f,h,_,g,m,p,S,x,v,T,M,E;if(this!==on&&u>l&&i>=0&&(u=l),u!==this._tTime||o||d){if(a!==this._time&&c&&(u+=this._time-a,i+=this._time-a),f=u,v=this._start,x=this._ts,p=!x,d&&(c||(a=this._zTime),(i||!s)&&(this._zTime=i)),this._repeat){if(M=this._yoyo,m=c+this._rDelay,this._repeat<-1&&i<0)return this.totalTime(m*100+i,s,o);if(f=xn(u%m),u===l?(g=this._repeat,f=c):(T=xn(u/m),g=~~T,g&&g===T&&(f=c,g--),f>c&&(f=c)),T=va(this._tTime,m),!a&&this._tTime&&T!==g&&this._tTime-T*m-this._dur<=0&&(T=g),M&&g&1&&(f=c-f,E=1),g!==T&&!this._lock){var P=M&&T&1,y=P===(M&&g&1);if(g<T&&(P=!P),a=P?0:u%c?c:u,this._lock=1,this.render(a||(E?0:xn(g*m)),s,!c)._lock=0,this._tTime=u,!s&&this.parent&&bi(this,"onRepeat"),this.vars.repeatRefresh&&!E&&(this.invalidate()._lock=1),a&&a!==this._time||p!==!this._ts||this.vars.onRepeat&&!this.parent&&!this._act)return this;if(c=this._dur,l=this._tDur,y&&(this._lock=2,a=P?c:-1e-4,this.render(a,!0),this.vars.repeatRefresh&&!E&&this.invalidate()),this._lock=0,!this._ts&&!p)return this;nv(this,E)}}if(this._hasPause&&!this._forcing&&this._lock<2&&(S=iA(this,xn(a),xn(f)),S&&(u-=f-(f=S._start))),this._tTime=u,this._time=f,this._act=!x,this._initted||(this._onUpdate=this.vars.onUpdate,this._initted=1,this._zTime=i,a=0),!a&&f&&!s&&!g&&(bi(this,"onStart"),this._tTime!==u))return this;if(f>=a&&i>=0)for(h=this._first;h;){if(_=h._next,(h._act||f>=h._start)&&h._ts&&S!==h){if(h.parent!==this)return this.render(i,s,o);if(h.render(h._ts>0?(f-h._start)*h._ts:(h._dirty?h.totalDuration():h._tDur)+(f-h._start)*h._ts,s,o),f!==this._time||!this._ts&&!p){S=0,_&&(u+=this._zTime=-Zt);break}}h=_}else{h=this._last;for(var b=i<0?i:f;h;){if(_=h._prev,(h._act||b<=h._end)&&h._ts&&S!==h){if(h.parent!==this)return this.render(i,s,o);if(h.render(h._ts>0?(b-h._start)*h._ts:(h._dirty?h.totalDuration():h._tDur)+(b-h._start)*h._ts,s,o||Fn&&(h._initted||h._startAt)),f!==this._time||!this._ts&&!p){S=0,_&&(u+=this._zTime=b?-Zt:Zt);break}}h=_}}if(S&&!s&&(this.pause(),S.render(f>=a?0:-Zt)._zTime=f>=a?1:-1,this._ts))return this._start=v,Pu(this),this.render(i,s,o);this._onUpdate&&!s&&bi(this,"onUpdate",!0),(u===l&&this._tTime>=this.totalDuration()||!u&&a)&&(v===this._start||Math.abs(x)!==Math.abs(this._ts))&&(this._lock||((i||!c)&&(u===l&&this._ts>0||!u&&this._ts<0)&&xs(this,1),!s&&!(i<0&&!a)&&(u||a||!l)&&(bi(this,u===l&&i>=0?"onComplete":"onReverseComplete",!0),this._prom&&!(u<l&&this.timeScale()>0)&&this._prom())))}return this},t.add=function(i,s){var o=this;if(Hr(s)||(s=Ai(this,s,i)),!(i instanceof Ul)){if(Wn(i))return i.forEach(function(a){return o.add(a,s)}),this;if(Ln(i))return this.addLabel(i,s);if(dn(i))i=pn.delayedCall(0,i);else return this}return this!==i?sr(this,i,s):this},t.getChildren=function(i,s,o,a){i===void 0&&(i=!0),s===void 0&&(s=!0),o===void 0&&(o=!0),a===void 0&&(a=-Ni);for(var l=[],c=this._first;c;)c._start>=a&&(c instanceof pn?s&&l.push(c):(o&&l.push(c),i&&l.push.apply(l,c.getChildren(!0,s,o)))),c=c._next;return l},t.getById=function(i){for(var s=this.getChildren(1,1,1),o=s.length;o--;)if(s[o].vars.id===i)return s[o]},t.remove=function(i){return Ln(i)?this.removeLabel(i):dn(i)?this.killTweensOf(i):(i.parent===this&&Ru(this,i),i===this._recent&&(this._recent=this._last),eo(this))},t.totalTime=function(i,s){return arguments.length?(this._forcing=1,!this._dp&&this._ts&&(this._start=xn(yi.time-(this._ts>0?i/this._ts:(this.totalDuration()-i)/-this._ts))),r.prototype.totalTime.call(this,i,s),this._forcing=0,this):this._tTime},t.addLabel=function(i,s){return this.labels[i]=Ai(this,s),this},t.removeLabel=function(i){return delete this.labels[i],this},t.addPause=function(i,s,o){var a=pn.delayedCall(0,s||Il,o);return a.data="isPause",this._hasPause=1,sr(this,a,Ai(this,i))},t.removePause=function(i){var s=this._first;for(i=Ai(this,i);s;)s._start===i&&s.data==="isPause"&&xs(s),s=s._next},t.killTweensOf=function(i,s,o){for(var a=this.getTweensOf(i,o),l=a.length;l--;)os!==a[l]&&a[l].kill(i,s);return this},t.getTweensOf=function(i,s){for(var o=[],a=Ui(i),l=this._first,c=Hr(s),u;l;)l instanceof pn?K1(l._targets,a)&&(c?(!os||l._initted&&l._ts)&&l.globalTime(0)<=s&&l.globalTime(l.totalDuration())>s:!s||l.isActive())&&o.push(l):(u=l.getTweensOf(a,s)).length&&o.push.apply(o,u),l=l._next;return o},t.tweenTo=function(i,s){s=s||{};var o=this,a=Ai(o,i),l=s,c=l.startAt,u=l.onStart,d=l.onStartParams,f=l.immediateRender,h,_=pn.to(o,Ei({ease:s.ease||"none",lazy:!1,immediateRender:!1,time:a,overwrite:"auto",duration:s.duration||Math.abs((a-(c&&"time"in c?c.time:o._time))/o.timeScale())||Zt,onStart:function(){if(o.pause(),!h){var m=s.duration||Math.abs((a-(c&&"time"in c?c.time:o._time))/o.timeScale());_._dur!==m&&ya(_,m,0,1).render(_._time,!0,!0),h=1}u&&u.apply(_,d||[])}},s));return f?_.render(0):_},t.tweenFromTo=function(i,s,o){return this.tweenTo(s,Ei({startAt:{time:Ai(this,i)}},o))},t.recent=function(){return this._recent},t.nextLabel=function(i){return i===void 0&&(i=this._time),Mg(this,Ai(this,i))},t.previousLabel=function(i){return i===void 0&&(i=this._time),Mg(this,Ai(this,i),1)},t.currentLabel=function(i){return arguments.length?this.seek(i,!0):this.previousLabel(this._time+Zt)},t.shiftChildren=function(i,s,o){o===void 0&&(o=0);for(var a=this._first,l=this.labels,c;a;)a._start>=o&&(a._start+=i,a._end+=i),a=a._next;if(s)for(c in l)l[c]>=o&&(l[c]+=i);return eo(this)},t.invalidate=function(i){var s=this._first;for(this._lock=0;s;)s.invalidate(i),s=s._next;return r.prototype.invalidate.call(this,i)},t.clear=function(i){i===void 0&&(i=!0);for(var s=this._first,o;s;)o=s._next,this.remove(s),s=o;return this._dp&&(this._time=this._tTime=this._pTime=0),i&&(this.labels={}),eo(this)},t.totalDuration=function(i){var s=0,o=this,a=o._last,l=Ni,c,u,d;if(arguments.length)return o.timeScale((o._repeat<0?o.duration():o.totalDuration())/(o.reversed()?-i:i));if(o._dirty){for(d=o.parent;a;)c=a._prev,a._dirty&&a.totalDuration(),u=a._start,u>l&&o._sort&&a._ts&&!o._lock?(o._lock=1,sr(o,a,u-a._delay,1)._lock=0):l=u,u<0&&a._ts&&(s-=u,(!d&&!o._dp||d&&d.smoothChildTiming)&&(o._start+=u/o._ts,o._time-=u,o._tTime-=u),o.shiftChildren(-u,!1,-1/0),l=0),a._end>s&&a._ts&&(s=a._end),a=c;ya(o,o===on&&o._time>s?o._time:s,1,1),o._dirty=0}return o._tDur},e.updateRoot=function(i){if(on._ts&&(U0(on,vu(i,on)),O0=yi.frame),yi.frame>=xg){xg+=Si.autoSleep||120;var s=on._first;if((!s||!s._ts)&&Si.autoSleep&&yi._listeners.length<2){for(;s&&!s._ts;)s=s._next;s||yi.sleep()}}},e}(Ul);Ei(Nn.prototype,{_lock:0,_hasPause:0,_forcing:0});var yA=function(e,t,n,i,s,o,a){var l=new li(this._pt,e,t,0,1,uv,null,s),c=0,u=0,d,f,h,_,g,m,p,S;for(l.b=n,l.e=i,n+="",i+="",(p=~i.indexOf("random("))&&(i=Ol(i)),o&&(S=[n,i],o(S,e,t),n=S[0],i=S[1]),f=n.match(Rd)||[];d=Rd.exec(i);)_=d[0],g=i.substring(c,d.index),h?h=(h+1)%5:g.substr(-5)==="rgba("&&(h=1),_!==f[u++]&&(m=parseFloat(f[u-1])||0,l._pt={_next:l._pt,p:g||u===1?g:",",s:m,c:_.charAt(1)==="="?ea(m,_)-m:parseFloat(_)-m,m:h&&h<4?Math.round:0},c=Rd.lastIndex);return l.c=c<i.length?i.substring(c,i.length):"",l.fp=a,(R0.test(i)||p)&&(l.e=0),this._pt=l,l},np=function(e,t,n,i,s,o,a,l,c,u){dn(i)&&(i=i(s||0,e,o));var d=e[t],f=n!=="get"?n:dn(d)?c?e[t.indexOf("set")||!dn(e["get"+t.substr(3)])?t:"get"+t.substr(3)](c):e[t]():d,h=dn(d)?c?MA:lv:rp,_;if(Ln(i)&&(~i.indexOf("random(")&&(i=Ol(i)),i.charAt(1)==="="&&(_=ea(f,i)+(Gn(f)||0),(_||_===0)&&(i=_))),!u||f!==i||ih)return!isNaN(f*i)&&i!==""?(_=new li(this._pt,e,t,+f||0,i-(f||0),typeof d=="boolean"?TA:cv,0,h),c&&(_.fp=c),a&&_.modifier(a,this,e),this._pt=_):(!d&&!(t in e)&&Jh(t,i),yA.call(this,e,t,f,i,h,l||Si.stringFilter,c))},xA=function(e,t,n,i,s){if(dn(e)&&(e=vl(e,s,t,n,i)),!mr(e)||e.style&&e.nodeType||Wn(e)||A0(e))return Ln(e)?vl(e,s,t,n,i):e;var o={},a;for(a in e)o[a]=vl(e[a],s,t,n,i);return o},sv=function(e,t,n,i,s,o){var a,l,c,u;if(gi[e]&&(a=new gi[e]).init(s,a.rawVars?t[e]:xA(t[e],i,s,o,n),n,i,o)!==!1&&(n._pt=l=new li(n._pt,s,e,0,1,a.render,a,0,a.priority),n!==qo))for(c=n._ptLookup[n._targets.indexOf(s)],u=a._props.length;u--;)c[a._props[u]]=l;return a},os,ih,ip=function r(e,t,n){var i=e.vars,s=i.ease,o=i.startAt,a=i.immediateRender,l=i.lazy,c=i.onUpdate,u=i.runBackwards,d=i.yoyoEase,f=i.keyframes,h=i.autoRevert,_=e._dur,g=e._startAt,m=e._targets,p=e.parent,S=p&&p.data==="nested"?p.vars.targets:m,x=e._overwrite==="auto"&&!jh,v=e.timeline,T,M,E,P,y,b,D,B,U,K,F,C,J;if(v&&(!f||!s)&&(s="none"),e._ease=to(s,ga.ease),e._yEase=d?tv(to(d===!0?s:d,ga.ease)):0,d&&e._yoyo&&!e._repeat&&(d=e._yEase,e._yEase=e._ease,e._ease=d),e._from=!v&&!!i.runBackwards,!v||f&&!i.stagger){if(B=m[0]?Qs(m[0]).harness:0,C=B&&i[B.prop],T=_u(i,Qh),g&&(g._zTime<0&&g.progress(1),t<0&&u&&a&&!h?g.render(-1,!0):g.revert(u&&_?Zc:j1),g._lazy=0),o){if(xs(e._startAt=pn.set(m,Ei({data:"isStart",overwrite:!1,parent:p,immediateRender:!0,lazy:!g&&oi(l),startAt:null,delay:0,onUpdate:c&&function(){return bi(e,"onUpdate")},stagger:0},o))),e._startAt._dp=0,e._startAt._sat=e,t<0&&(Fn||!a&&!h)&&e._startAt.revert(Zc),a&&_&&t<=0&&n<=0){t&&(e._zTime=t);return}}else if(u&&_&&!g){if(t&&(a=!1),E=Ei({overwrite:!1,data:"isFromStart",lazy:a&&!g&&oi(l),immediateRender:a,stagger:0,parent:p},T),C&&(E[B.prop]=C),xs(e._startAt=pn.set(m,E)),e._startAt._dp=0,e._startAt._sat=e,t<0&&(Fn?e._startAt.revert(Zc):e._startAt.render(-1,!0)),e._zTime=t,!a)r(e._startAt,Zt,Zt);else if(!t)return}for(e._pt=e._ptCache=0,l=_&&oi(l)||l&&!_,M=0;M<m.length;M++){if(y=m[M],D=y._gsap||tp(m)[M]._gsap,e._ptLookup[M]=K={},Zf[D.id]&&ms.length&&gu(),F=S===m?M:S.indexOf(y),B&&(U=new B).init(y,C||T,e,F,S)!==!1&&(e._pt=P=new li(e._pt,y,U.name,0,1,U.render,U,0,U.priority),U._props.forEach(function(X){K[X]=P}),U.priority&&(b=1)),!B||C)for(E in T)gi[E]&&(U=sv(E,T,e,F,y,S))?U.priority&&(b=1):K[E]=P=np.call(e,y,E,"get",T[E],F,S,0,i.stringFilter);e._op&&e._op[M]&&e.kill(y,e._op[M]),x&&e._pt&&(os=e,on.killTweensOf(y,K,e.globalTime(t)),J=!e.parent,os=0),e._pt&&l&&(Zf[D.id]=1)}b&&dv(e),e._onInit&&e._onInit(e)}e._onUpdate=c,e._initted=(!e._op||e._pt)&&!J,f&&t<=0&&v.render(Ni,!0,!0)},bA=function(e,t,n,i,s,o,a,l){var c=(e._pt&&e._ptCache||(e._ptCache={}))[t],u,d,f,h;if(!c)for(c=e._ptCache[t]=[],f=e._ptLookup,h=e._targets.length;h--;){if(u=f[h][t],u&&u.d&&u.d._pt)for(u=u.d._pt;u&&u.p!==t&&u.fp!==t;)u=u._next;if(!u)return ih=1,e.vars[t]="+=0",ip(e,a),ih=0,l?Dl(t+" not eligible for reset"):1;c.push(u)}for(h=c.length;h--;)d=c[h],u=d._pt||d,u.s=(i||i===0)&&!s?i:u.s+(i||0)+o*u.c,u.c=n-u.s,d.e&&(d.e=hn(n)+Gn(d.e)),d.b&&(d.b=u.s+Gn(d.b))},SA=function(e,t){var n=e[0]?Qs(e[0]).harness:0,i=n&&n.aliases,s,o,a,l;if(!i)return t;s=_a({},t);for(o in i)if(o in s)for(l=i[o].split(","),a=l.length;a--;)s[l[a]]=s[o];return s},wA=function(e,t,n,i){var s=t.ease||i||"power1.inOut",o,a;if(Wn(t))a=n[e]||(n[e]=[]),t.forEach(function(l,c){return a.push({t:c/(t.length-1)*100,v:l,e:s})});else for(o in t)a=n[o]||(n[o]=[]),o==="ease"||a.push({t:parseFloat(e),v:t[o],e:s})},vl=function(e,t,n,i,s){return dn(e)?e.call(t,n,i,s):Ln(e)&&~e.indexOf("random(")?Ol(e):e},ov=ep+"repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,autoRevert",av={};ai(ov+",id,stagger,delay,duration,paused,scrollTrigger",function(r){return av[r]=1});var pn=function(r){E0(e,r);function e(n,i,s,o){var a;typeof i=="number"&&(s.duration=i,i=s,s=null),a=r.call(this,o?i:gl(i))||this;var l=a.vars,c=l.duration,u=l.delay,d=l.immediateRender,f=l.stagger,h=l.overwrite,_=l.keyframes,g=l.defaults,m=l.scrollTrigger,p=l.yoyoEase,S=i.parent||on,x=(Wn(n)||A0(n)?Hr(n[0]):"length"in i)?[n]:Ui(n),v,T,M,E,P,y,b,D;if(a._targets=x.length?tp(x):Dl("GSAP target "+n+" not found. https://gsap.com",!Si.nullTargetWarn)||[],a._ptLookup=[],a._overwrite=h,_||f||Oc(c)||Oc(u)){if(i=a.vars,v=a.timeline=new Nn({data:"nested",defaults:g||{},targets:S&&S.data==="nested"?S.vars.targets:x}),v.kill(),v.parent=v._dp=Ar(a),v._start=0,f||Oc(c)||Oc(u)){if(E=x.length,b=f&&X0(f),mr(f))for(P in f)~ov.indexOf(P)&&(D||(D={}),D[P]=f[P]);for(T=0;T<E;T++)M=_u(i,av),M.stagger=0,p&&(M.yoyoEase=p),D&&_a(M,D),y=x[T],M.duration=+vl(c,Ar(a),T,y,x),M.delay=(+vl(u,Ar(a),T,y,x)||0)-a._delay,!f&&E===1&&M.delay&&(a._delay=u=M.delay,a._start+=u,M.delay=0),v.to(y,M,b?b(T,y,x):0),v._ease=Lt.none;v.duration()?c=u=0:a.timeline=0}else if(_){gl(Ei(v.vars.defaults,{ease:"none"})),v._ease=to(_.ease||i.ease||"none");var B=0,U,K,F;if(Wn(_))_.forEach(function(C){return v.to(x,C,">")}),v.duration();else{M={};for(P in _)P==="ease"||P==="easeEach"||wA(P,_[P],M,_.easeEach);for(P in M)for(U=M[P].sort(function(C,J){return C.t-J.t}),B=0,T=0;T<U.length;T++)K=U[T],F={ease:K.e,duration:(K.t-(T?U[T-1].t:0))/100*c},F[P]=K.v,v.to(x,F,B),B+=F.duration;v.duration()<c&&v.to({},{duration:c-v.duration()})}}c||a.duration(c=v.duration())}else a.timeline=0;return h===!0&&!jh&&(os=Ar(a),on.killTweensOf(x),os=0),sr(S,Ar(a),s),i.reversed&&a.reverse(),i.paused&&a.paused(!0),(d||!c&&!_&&a._start===xn(S._time)&&oi(d)&&eA(Ar(a))&&S.data!=="nested")&&(a._tTime=-Zt,a.render(Math.max(0,-u)||0)),m&&H0(Ar(a),m),a}var t=e.prototype;return t.render=function(i,s,o){var a=this._time,l=this._tDur,c=this._dur,u=i<0,d=i>l-Zt&&!u?l:i<Zt?0:i,f,h,_,g,m,p,S,x,v;if(!c)nA(this,i,s,o);else if(d!==this._tTime||!i||o||!this._initted&&this._tTime||this._startAt&&this._zTime<0!==u||this._lazy){if(f=d,x=this.timeline,this._repeat){if(g=c+this._rDelay,this._repeat<-1&&u)return this.totalTime(g*100+i,s,o);if(f=xn(d%g),d===l?(_=this._repeat,f=c):(m=xn(d/g),_=~~m,_&&_===m?(f=c,_--):f>c&&(f=c)),p=this._yoyo&&_&1,p&&(v=this._yEase,f=c-f),m=va(this._tTime,g),f===a&&!o&&this._initted&&_===m)return this._tTime=d,this;_!==m&&(x&&this._yEase&&nv(x,p),this.vars.repeatRefresh&&!p&&!this._lock&&f!==g&&this._initted&&(this._lock=o=1,this.render(xn(g*_),!0).invalidate()._lock=0))}if(!this._initted){if(V0(this,u?i:f,o,s,d))return this._tTime=0,this;if(a!==this._time&&!(o&&this.vars.repeatRefresh&&_!==m))return this;if(c!==this._dur)return this.render(i,s,o)}if(this._tTime=d,this._time=f,!this._act&&this._ts&&(this._act=1,this._lazy=0),this.ratio=S=(v||this._ease)(f/c),this._from&&(this.ratio=S=1-S),f&&!a&&!s&&!_&&(bi(this,"onStart"),this._tTime!==d))return this;for(h=this._pt;h;)h.r(S,h.d),h=h._next;x&&x.render(i<0?i:x._dur*x._ease(f/this._dur),s,o)||this._startAt&&(this._zTime=i),this._onUpdate&&!s&&(u&&Jf(this,i,s,o),bi(this,"onUpdate")),this._repeat&&_!==m&&this.vars.onRepeat&&!s&&this.parent&&bi(this,"onRepeat"),(d===this._tDur||!d)&&this._tTime===d&&(u&&!this._onUpdate&&Jf(this,i,!0,!0),(i||!c)&&(d===this._tDur&&this._ts>0||!d&&this._ts<0)&&xs(this,1),!s&&!(u&&!a)&&(d||a||p)&&(bi(this,d===l?"onComplete":"onReverseComplete",!0),this._prom&&!(d<l&&this.timeScale()>0)&&this._prom()))}return this},t.targets=function(){return this._targets},t.invalidate=function(i){return(!i||!this.vars.runBackwards)&&(this._startAt=0),this._pt=this._op=this._onUpdate=this._lazy=this.ratio=0,this._ptLookup=[],this.timeline&&this.timeline.invalidate(i),r.prototype.invalidate.call(this,i)},t.resetTo=function(i,s,o,a,l){Nl||yi.wake(),this._ts||this.play();var c=Math.min(this._dur,(this._dp._time-this._start)*this._ts),u;return this._initted||ip(this,c),u=this._ease(c/this._dur),bA(this,i,s,o,a,u,c,l)?this.resetTo(i,s,o,a,1):(Lu(this,0),this.parent||B0(this._dp,this,"_first","_last",this._dp._sort?"_start":0),this.render(0))},t.kill=function(i,s){if(s===void 0&&(s="all"),!i&&(!s||s==="all"))return this._lazy=this._pt=0,this.parent?Za(this):this.scrollTrigger&&this.scrollTrigger.kill(!!Fn),this;if(this.timeline){var o=this.timeline.totalDuration();return this.timeline.killTweensOf(i,s,os&&os.vars.overwrite!==!0)._first||Za(this),this.parent&&o!==this.timeline.totalDuration()&&ya(this,this._dur*this.timeline._tDur/o,0,1),this}var a=this._targets,l=i?Ui(i):a,c=this._ptLookup,u=this._pt,d,f,h,_,g,m,p;if((!s||s==="all")&&J1(a,l))return s==="all"&&(this._pt=0),Za(this);for(d=this._op=this._op||[],s!=="all"&&(Ln(s)&&(g={},ai(s,function(S){return g[S]=1}),s=g),s=SA(a,s)),p=a.length;p--;)if(~l.indexOf(a[p])){f=c[p],s==="all"?(d[p]=s,_=f,h={}):(h=d[p]=d[p]||{},_=s);for(g in _)m=f&&f[g],m&&((!("kill"in m.d)||m.d.kill(g)===!0)&&Ru(this,m,"_pt"),delete f[g]),h!=="all"&&(h[g]=1)}return this._initted&&!this._pt&&u&&Za(this),this},e.to=function(i,s){return new e(i,s,arguments[2])},e.from=function(i,s){return _l(1,arguments)},e.delayedCall=function(i,s,o,a){return new e(s,0,{immediateRender:!1,lazy:!1,overwrite:!1,delay:i,onComplete:s,onReverseComplete:s,onCompleteParams:o,onReverseCompleteParams:o,callbackScope:a})},e.fromTo=function(i,s,o){return _l(2,arguments)},e.set=function(i,s){return s.duration=0,s.repeatDelay||(s.repeat=0),new e(i,s)},e.killTweensOf=function(i,s,o){return on.killTweensOf(i,s,o)},e}(Ul);Ei(pn.prototype,{_targets:[],_lazy:0,_startAt:0,_op:0,_onInit:0});ai("staggerTo,staggerFrom,staggerFromTo",function(r){pn[r]=function(){var e=new Nn,t=eh.call(arguments,0);return t.splice(r==="staggerFromTo"?5:4,0,0),e[r].apply(e,t)}});var rp=function(e,t,n){return e[t]=n},lv=function(e,t,n){return e[t](n)},MA=function(e,t,n,i){return e[t](i.fp,n)},EA=function(e,t,n){return e.setAttribute(t,n)},sp=function(e,t){return dn(e[t])?lv:$h(e[t])&&e.setAttribute?EA:rp},cv=function(e,t){return t.set(t.t,t.p,Math.round((t.s+t.c*e)*1e6)/1e6,t)},TA=function(e,t){return t.set(t.t,t.p,!!(t.s+t.c*e),t)},uv=function(e,t){var n=t._pt,i="";if(!e&&t.b)i=t.b;else if(e===1&&t.e)i=t.e;else{for(;n;)i=n.p+(n.m?n.m(n.s+n.c*e):Math.round((n.s+n.c*e)*1e4)/1e4)+i,n=n._next;i+=t.c}t.set(t.t,t.p,i,t)},op=function(e,t){for(var n=t._pt;n;)n.r(e,n.d),n=n._next},AA=function(e,t,n,i){for(var s=this._pt,o;s;)o=s._next,s.p===i&&s.modifier(e,t,n),s=o},CA=function(e){for(var t=this._pt,n,i;t;)i=t._next,t.p===e&&!t.op||t.op===e?Ru(this,t,"_pt"):t.dep||(n=1),t=i;return!n},RA=function(e,t,n,i){i.mSet(e,t,i.m.call(i.tween,n,i.mt),i)},dv=function(e){for(var t=e._pt,n,i,s,o;t;){for(n=t._next,i=s;i&&i.pr>t.pr;)i=i._next;(t._prev=i?i._prev:o)?t._prev._next=t:s=t,(t._next=i)?i._prev=t:o=t,t=n}e._pt=s},li=function(){function r(t,n,i,s,o,a,l,c,u){this.t=n,this.s=s,this.c=o,this.p=i,this.r=a||cv,this.d=l||this,this.set=c||rp,this.pr=u||0,this._next=t,t&&(t._prev=this)}var e=r.prototype;return e.modifier=function(n,i,s){this.mSet=this.mSet||this.set,this.set=RA,this.m=n,this.mt=s,this.tween=i},r}();ai(ep+"parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger",function(r){return Qh[r]=1});Mi.TweenMax=Mi.TweenLite=pn;Mi.TimelineLite=Mi.TimelineMax=Nn;on=new Nn({sortChildren:!1,defaults:ga,autoRemoveChildren:!0,id:"root",smoothChildTiming:!0});Si.stringFilter=ev;var no=[],Qc={},PA=[],Tg=0,LA=0,Od=function(e){return(Qc[e]||PA).map(function(t){return t()})},rh=function(){var e=Date.now(),t=[];e-Tg>2&&(Od("matchMediaInit"),no.forEach(function(n){var i=n.queries,s=n.conditions,o,a,l,c;for(a in i)o=ir.matchMedia(i[a]).matches,o&&(l=1),o!==s[a]&&(s[a]=o,c=1);c&&(n.revert(),l&&t.push(n))}),Od("matchMediaRevert"),t.forEach(function(n){return n.onMatch(n,function(i){return n.add(null,i)})}),Tg=e,Od("matchMedia"))},fv=function(){function r(t,n){this.selector=n&&th(n),this.data=[],this._r=[],this.isReverted=!1,this.id=LA++,t&&this.add(t)}var e=r.prototype;return e.add=function(n,i,s){dn(n)&&(s=i,i=n,n=dn);var o=this,a=function(){var c=rn,u=o.selector,d;return c&&c!==o&&c.data.push(o),s&&(o.selector=th(s)),rn=o,d=i.apply(o,arguments),dn(d)&&o._r.push(d),rn=c,o.selector=u,o.isReverted=!1,d};return o.last=a,n===dn?a(o,function(l){return o.add(null,l)}):n?o[n]=a:a},e.ignore=function(n){var i=rn;rn=null,n(this),rn=i},e.getTweens=function(){var n=[];return this.data.forEach(function(i){return i instanceof r?n.push.apply(n,i.getTweens()):i instanceof pn&&!(i.parent&&i.parent.data==="nested")&&n.push(i)}),n},e.clear=function(){this._r.length=this.data.length=0},e.kill=function(n,i){var s=this;if(n?function(){for(var a=s.getTweens(),l=s.data.length,c;l--;)c=s.data[l],c.data==="isFlip"&&(c.revert(),c.getChildren(!0,!0,!1).forEach(function(u){return a.splice(a.indexOf(u),1)}));for(a.map(function(u){return{g:u._dur||u._delay||u._sat&&!u._sat.vars.immediateRender?u.globalTime(0):-1/0,t:u}}).sort(function(u,d){return d.g-u.g||-1/0}).forEach(function(u){return u.t.revert(n)}),l=s.data.length;l--;)c=s.data[l],c instanceof Nn?c.data!=="nested"&&(c.scrollTrigger&&c.scrollTrigger.revert(),c.kill()):!(c instanceof pn)&&c.revert&&c.revert(n);s._r.forEach(function(u){return u(n,s)}),s.isReverted=!0}():this.data.forEach(function(a){return a.kill&&a.kill()}),this.clear(),i)for(var o=no.length;o--;)no[o].id===this.id&&no.splice(o,1)},e.revert=function(n){this.kill(n||{})},r}(),DA=function(){function r(t){this.contexts=[],this.scope=t,rn&&rn.data.push(this)}var e=r.prototype;return e.add=function(n,i,s){mr(n)||(n={matches:n});var o=new fv(0,s||this.scope),a=o.conditions={},l,c,u;rn&&!o.selector&&(o.selector=rn.selector),this.contexts.push(o),i=o.add("onMatch",i),o.queries=n;for(c in n)c==="all"?u=1:(l=ir.matchMedia(n[c]),l&&(no.indexOf(o)<0&&no.push(o),(a[c]=l.matches)&&(u=1),l.addListener?l.addListener(rh):l.addEventListener("change",rh)));return u&&i(o,function(d){return o.add(null,d)}),this},e.revert=function(n){this.kill(n||{})},e.kill=function(n){this.contexts.forEach(function(i){return i.kill(n,!0)})},r}(),yu={registerPlugin:function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];t.forEach(function(i){return Z0(i)})},timeline:function(e){return new Nn(e)},getTweensOf:function(e,t){return on.getTweensOf(e,t)},getProperty:function(e,t,n,i){Ln(e)&&(e=Ui(e)[0]);var s=Qs(e||{}).get,o=n?k0:F0;return n==="native"&&(n=""),e&&(t?o((gi[t]&&gi[t].get||s)(e,t,n,i)):function(a,l,c){return o((gi[a]&&gi[a].get||s)(e,a,l,c))})},quickSetter:function(e,t,n){if(e=Ui(e),e.length>1){var i=e.map(function(u){return ui.quickSetter(u,t,n)}),s=i.length;return function(u){for(var d=s;d--;)i[d](u)}}e=e[0]||{};var o=gi[t],a=Qs(e),l=a.harness&&(a.harness.aliases||{})[t]||t,c=o?function(u){var d=new o;qo._pt=0,d.init(e,n?u+n:u,qo,0,[e]),d.render(1,d),qo._pt&&op(1,qo)}:a.set(e,l);return o?c:function(u){return c(e,l,n?u+n:u,a,1)}},quickTo:function(e,t,n){var i,s=ui.to(e,Ei((i={},i[t]="+=0.1",i.paused=!0,i.stagger=0,i),n||{})),o=function(l,c,u){return s.resetTo(t,l,c,u)};return o.tween=s,o},isTweening:function(e){return on.getTweensOf(e,!0).length>0},defaults:function(e){return e&&e.ease&&(e.ease=to(e.ease,ga.ease)),bg(ga,e||{})},config:function(e){return bg(Si,e||{})},registerEffect:function(e){var t=e.name,n=e.effect,i=e.plugins,s=e.defaults,o=e.extendTimeline;(i||"").split(",").forEach(function(a){return a&&!gi[a]&&!Mi[a]&&Dl(t+" effect requires "+a+" plugin.")}),Pd[t]=function(a,l,c){return n(Ui(a),Ei(l||{},s),c)},o&&(Nn.prototype[t]=function(a,l,c){return this.add(Pd[t](a,mr(l)?l:(c=l)&&{},this),c)})},registerEase:function(e,t){Lt[e]=to(t)},parseEase:function(e,t){return arguments.length?to(e,t):Lt},getById:function(e){return on.getById(e)},exportRoot:function(e,t){e===void 0&&(e={});var n=new Nn(e),i,s;for(n.smoothChildTiming=oi(e.smoothChildTiming),on.remove(n),n._dp=0,n._time=n._tTime=on._time,i=on._first;i;)s=i._next,(t||!(!i._dur&&i instanceof pn&&i.vars.onComplete===i._targets[0]))&&sr(n,i,i._start-i._delay),i=s;return sr(on,n,0),n},context:function(e,t){return e?new fv(e,t):rn},matchMedia:function(e){return new DA(e)},matchMediaRefresh:function(){return no.forEach(function(e){var t=e.conditions,n,i;for(i in t)t[i]&&(t[i]=!1,n=1);n&&e.revert()})||rh()},addEventListener:function(e,t){var n=Qc[e]||(Qc[e]=[]);~n.indexOf(t)||n.push(t)},removeEventListener:function(e,t){var n=Qc[e],i=n&&n.indexOf(t);i>=0&&n.splice(i,1)},utils:{wrap:uA,wrapYoyo:dA,distribute:X0,random:Y0,snap:q0,normalize:cA,getUnit:Gn,clamp:sA,splitColor:J0,toArray:Ui,selector:th,mapRange:$0,pipe:aA,unitize:lA,interpolate:fA,shuffle:W0},install:D0,effects:Pd,ticker:yi,updateRoot:Nn.updateRoot,plugins:gi,globalTimeline:on,core:{PropTween:li,globals:I0,Tween:pn,Timeline:Nn,Animation:Ul,getCache:Qs,_removeLinkedListItem:Ru,reverting:function(){return Fn},context:function(e){return e&&rn&&(rn.data.push(e),e._ctx=rn),rn},suppressOverwrites:function(e){return jh=e}}};ai("to,from,fromTo,delayedCall,set,killTweensOf",function(r){return yu[r]=pn[r]});yi.add(Nn.updateRoot);qo=yu.to({},{duration:0});var IA=function(e,t){for(var n=e._pt;n&&n.p!==t&&n.op!==t&&n.fp!==t;)n=n._next;return n},OA=function(e,t){var n=e._targets,i,s,o;for(i in t)for(s=n.length;s--;)o=e._ptLookup[s][i],o&&(o=o.d)&&(o._pt&&(o=IA(o,i)),o&&o.modifier&&o.modifier(t[i],e,n[s],i))},Nd=function(e,t){return{name:e,rawVars:1,init:function(i,s,o){o._onInit=function(a){var l,c;if(Ln(s)&&(l={},ai(s,function(u){return l[u]=1}),s=l),t){l={};for(c in s)l[c]=t(s[c]);s=l}OA(a,s)}}}},ui=yu.registerPlugin({name:"attr",init:function(e,t,n,i,s){var o,a,l;this.tween=n;for(o in t)l=e.getAttribute(o)||"",a=this.add(e,"setAttribute",(l||0)+"",t[o],i,s,0,0,o),a.op=o,a.b=l,this._props.push(o)},render:function(e,t){for(var n=t._pt;n;)Fn?n.set(n.t,n.p,n.b,n):n.r(e,n.d),n=n._next}},{name:"endArray",init:function(e,t){for(var n=t.length;n--;)this.add(e,n,e[n]||0,t[n],0,0,0,0,0,1)}},Nd("roundProps",nh),Nd("modifiers"),Nd("snap",q0))||yu;pn.version=Nn.version=ui.version="3.12.7";L0=1;Kh()&&xa();var NA=Lt.Power0,UA=Lt.Power1,FA=Lt.Power2,kA=Lt.Power3,BA=Lt.Power4,zA=Lt.Linear,HA=Lt.Quad,VA=Lt.Cubic,GA=Lt.Quart,WA=Lt.Quint,XA=Lt.Strong,qA=Lt.Elastic,YA=Lt.Back,jA=Lt.SteppedEase,$A=Lt.Bounce,KA=Lt.Sine,ZA=Lt.Expo,JA=Lt.Circ;/*!
 * CSSPlugin 3.12.7
 * https://gsap.com
 *
 * Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license or for
 * Club GSAP members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/var Ag,as,ta,ap,qs,Cg,lp,QA=function(){return typeof window<"u"},Vr={},zs=180/Math.PI,na=Math.PI/180,Uo=Math.atan2,Rg=1e8,cp=/([A-Z])/g,eC=/(left|right|width|margin|padding|x)/i,tC=/[\s,\(]\S/,lr={autoAlpha:"opacity,visibility",scale:"scaleX,scaleY",alpha:"opacity"},sh=function(e,t){return t.set(t.t,t.p,Math.round((t.s+t.c*e)*1e4)/1e4+t.u,t)},nC=function(e,t){return t.set(t.t,t.p,e===1?t.e:Math.round((t.s+t.c*e)*1e4)/1e4+t.u,t)},iC=function(e,t){return t.set(t.t,t.p,e?Math.round((t.s+t.c*e)*1e4)/1e4+t.u:t.b,t)},rC=function(e,t){var n=t.s+t.c*e;t.set(t.t,t.p,~~(n+(n<0?-.5:.5))+t.u,t)},hv=function(e,t){return t.set(t.t,t.p,e?t.e:t.b,t)},pv=function(e,t){return t.set(t.t,t.p,e!==1?t.b:t.e,t)},sC=function(e,t,n){return e.style[t]=n},oC=function(e,t,n){return e.style.setProperty(t,n)},aC=function(e,t,n){return e._gsap[t]=n},lC=function(e,t,n){return e._gsap.scaleX=e._gsap.scaleY=n},cC=function(e,t,n,i,s){var o=e._gsap;o.scaleX=o.scaleY=n,o.renderTransform(s,o)},uC=function(e,t,n,i,s){var o=e._gsap;o[t]=n,o.renderTransform(s,o)},ln="transform",ci=ln+"Origin",dC=function r(e,t){var n=this,i=this.target,s=i.style,o=i._gsap;if(e in Vr&&s){if(this.tfm=this.tfm||{},e!=="transform")e=lr[e]||e,~e.indexOf(",")?e.split(",").forEach(function(a){return n.tfm[a]=Cr(i,a)}):this.tfm[e]=o.x?o[e]:Cr(i,e),e===ci&&(this.tfm.zOrigin=o.zOrigin);else return lr.transform.split(",").forEach(function(a){return r.call(n,a,t)});if(this.props.indexOf(ln)>=0)return;o.svg&&(this.svgo=i.getAttribute("data-svg-origin"),this.props.push(ci,t,"")),e=ln}(s||t)&&this.props.push(e,t,s[e])},mv=function(e){e.translate&&(e.removeProperty("translate"),e.removeProperty("scale"),e.removeProperty("rotate"))},fC=function(){var e=this.props,t=this.target,n=t.style,i=t._gsap,s,o;for(s=0;s<e.length;s+=3)e[s+1]?e[s+1]===2?t[e[s]](e[s+2]):t[e[s]]=e[s+2]:e[s+2]?n[e[s]]=e[s+2]:n.removeProperty(e[s].substr(0,2)==="--"?e[s]:e[s].replace(cp,"-$1").toLowerCase());if(this.tfm){for(o in this.tfm)i[o]=this.tfm[o];i.svg&&(i.renderTransform(),t.setAttribute("data-svg-origin",this.svgo||"")),s=lp(),(!s||!s.isStart)&&!n[ln]&&(mv(n),i.zOrigin&&n[ci]&&(n[ci]+=" "+i.zOrigin+"px",i.zOrigin=0,i.renderTransform()),i.uncache=1)}},gv=function(e,t){var n={target:e,props:[],revert:fC,save:dC};return e._gsap||ui.core.getCache(e),t&&e.style&&e.nodeType&&t.split(",").forEach(function(i){return n.save(i)}),n},_v,oh=function(e,t){var n=as.createElementNS?as.createElementNS((t||"http://www.w3.org/1999/xhtml").replace(/^https/,"http"),e):as.createElement(e);return n&&n.style?n:as.createElement(e)},fr=function r(e,t,n){var i=getComputedStyle(e);return i[t]||i.getPropertyValue(t.replace(cp,"-$1").toLowerCase())||i.getPropertyValue(t)||!n&&r(e,ba(t)||t,1)||""},Pg="O,Moz,ms,Ms,Webkit".split(","),ba=function(e,t,n){var i=t||qs,s=i.style,o=5;if(e in s&&!n)return e;for(e=e.charAt(0).toUpperCase()+e.substr(1);o--&&!(Pg[o]+e in s););return o<0?null:(o===3?"ms":o>=0?Pg[o]:"")+e},ah=function(){QA()&&window.document&&(Ag=window,as=Ag.document,ta=as.documentElement,qs=oh("div")||{style:{}},oh("div"),ln=ba(ln),ci=ln+"Origin",qs.style.cssText="border-width:0;line-height:0;position:absolute;padding:0",_v=!!ba("perspective"),lp=ui.core.reverting,ap=1)},Lg=function(e){var t=e.ownerSVGElement,n=oh("svg",t&&t.getAttribute("xmlns")||"http://www.w3.org/2000/svg"),i=e.cloneNode(!0),s;i.style.display="block",n.appendChild(i),ta.appendChild(n);try{s=i.getBBox()}catch{}return n.removeChild(i),ta.removeChild(n),s},Dg=function(e,t){for(var n=t.length;n--;)if(e.hasAttribute(t[n]))return e.getAttribute(t[n])},vv=function(e){var t,n;try{t=e.getBBox()}catch{t=Lg(e),n=1}return t&&(t.width||t.height)||n||(t=Lg(e)),t&&!t.width&&!t.x&&!t.y?{x:+Dg(e,["x","cx","x1"])||0,y:+Dg(e,["y","cy","y1"])||0,width:0,height:0}:t},yv=function(e){return!!(e.getCTM&&(!e.parentNode||e.ownerSVGElement)&&vv(e))},co=function(e,t){if(t){var n=e.style,i;t in Vr&&t!==ci&&(t=ln),n.removeProperty?(i=t.substr(0,2),(i==="ms"||t.substr(0,6)==="webkit")&&(t="-"+t),n.removeProperty(i==="--"?t:t.replace(cp,"-$1").toLowerCase())):n.removeAttribute(t)}},ls=function(e,t,n,i,s,o){var a=new li(e._pt,t,n,0,1,o?pv:hv);return e._pt=a,a.b=i,a.e=s,e._props.push(n),a},Ig={deg:1,rad:1,turn:1},hC={grid:1,flex:1},bs=function r(e,t,n,i){var s=parseFloat(n)||0,o=(n+"").trim().substr((s+"").length)||"px",a=qs.style,l=eC.test(t),c=e.tagName.toLowerCase()==="svg",u=(c?"client":"offset")+(l?"Width":"Height"),d=100,f=i==="px",h=i==="%",_,g,m,p;if(i===o||!s||Ig[i]||Ig[o])return s;if(o!=="px"&&!f&&(s=r(e,t,n,"px")),p=e.getCTM&&yv(e),(h||o==="%")&&(Vr[t]||~t.indexOf("adius")))return _=p?e.getBBox()[l?"width":"height"]:e[u],hn(h?s/_*d:s/100*_);if(a[l?"width":"height"]=d+(f?o:i),g=i!=="rem"&&~t.indexOf("adius")||i==="em"&&e.appendChild&&!c?e:e.parentNode,p&&(g=(e.ownerSVGElement||{}).parentNode),(!g||g===as||!g.appendChild)&&(g=as.body),m=g._gsap,m&&h&&m.width&&l&&m.time===yi.time&&!m.uncache)return hn(s/m.width*d);if(h&&(t==="height"||t==="width")){var S=e.style[t];e.style[t]=d+i,_=e[u],S?e.style[t]=S:co(e,t)}else(h||o==="%")&&!hC[fr(g,"display")]&&(a.position=fr(e,"position")),g===e&&(a.position="static"),g.appendChild(qs),_=qs[u],g.removeChild(qs),a.position="absolute";return l&&h&&(m=Qs(g),m.time=yi.time,m.width=g[u]),hn(f?_*s/d:_&&s?d/_*s:0)},Cr=function(e,t,n,i){var s;return ap||ah(),t in lr&&t!=="transform"&&(t=lr[t],~t.indexOf(",")&&(t=t.split(",")[0])),Vr[t]&&t!=="transform"?(s=kl(e,i),s=t!=="transformOrigin"?s[t]:s.svg?s.origin:bu(fr(e,ci))+" "+s.zOrigin+"px"):(s=e.style[t],(!s||s==="auto"||i||~(s+"").indexOf("calc("))&&(s=xu[t]&&xu[t](e,t,n)||fr(e,t)||N0(e,t)||(t==="opacity"?1:0))),n&&!~(s+"").trim().indexOf(" ")?bs(e,t,s,n)+n:s},pC=function(e,t,n,i){if(!n||n==="none"){var s=ba(t,e,1),o=s&&fr(e,s,1);o&&o!==n?(t=s,n=o):t==="borderColor"&&(n=fr(e,"borderTopColor"))}var a=new li(this._pt,e.style,t,0,1,uv),l=0,c=0,u,d,f,h,_,g,m,p,S,x,v,T;if(a.b=n,a.e=i,n+="",i+="",i==="auto"&&(g=e.style[t],e.style[t]=i,i=fr(e,t)||i,g?e.style[t]=g:co(e,t)),u=[n,i],ev(u),n=u[0],i=u[1],f=n.match(Xo)||[],T=i.match(Xo)||[],T.length){for(;d=Xo.exec(i);)m=d[0],S=i.substring(l,d.index),_?_=(_+1)%5:(S.substr(-5)==="rgba("||S.substr(-5)==="hsla(")&&(_=1),m!==(g=f[c++]||"")&&(h=parseFloat(g)||0,v=g.substr((h+"").length),m.charAt(1)==="="&&(m=ea(h,m)+v),p=parseFloat(m),x=m.substr((p+"").length),l=Xo.lastIndex-x.length,x||(x=x||Si.units[t]||v,l===i.length&&(i+=x,a.e+=x)),v!==x&&(h=bs(e,t,g,x)||0),a._pt={_next:a._pt,p:S||c===1?S:",",s:h,c:p-h,m:_&&_<4||t==="zIndex"?Math.round:0});a.c=l<i.length?i.substring(l,i.length):""}else a.r=t==="display"&&i==="none"?pv:hv;return R0.test(i)&&(a.e=0),this._pt=a,a},Og={top:"0%",bottom:"100%",left:"0%",right:"100%",center:"50%"},mC=function(e){var t=e.split(" "),n=t[0],i=t[1]||"50%";return(n==="top"||n==="bottom"||i==="left"||i==="right")&&(e=n,n=i,i=e),t[0]=Og[n]||n,t[1]=Og[i]||i,t.join(" ")},gC=function(e,t){if(t.tween&&t.tween._time===t.tween._dur){var n=t.t,i=n.style,s=t.u,o=n._gsap,a,l,c;if(s==="all"||s===!0)i.cssText="",l=1;else for(s=s.split(","),c=s.length;--c>-1;)a=s[c],Vr[a]&&(l=1,a=a==="transformOrigin"?ci:ln),co(n,a);l&&(co(n,ln),o&&(o.svg&&n.removeAttribute("transform"),i.scale=i.rotate=i.translate="none",kl(n,1),o.uncache=1,mv(i)))}},xu={clearProps:function(e,t,n,i,s){if(s.data!=="isFromStart"){var o=e._pt=new li(e._pt,t,n,0,0,gC);return o.u=i,o.pr=-10,o.tween=s,e._props.push(n),1}}},Fl=[1,0,0,1,0,0],xv={},bv=function(e){return e==="matrix(1, 0, 0, 1, 0, 0)"||e==="none"||!e},Ng=function(e){var t=fr(e,ln);return bv(t)?Fl:t.substr(7).match(C0).map(hn)},up=function(e,t){var n=e._gsap||Qs(e),i=e.style,s=Ng(e),o,a,l,c;return n.svg&&e.getAttribute("transform")?(l=e.transform.baseVal.consolidate().matrix,s=[l.a,l.b,l.c,l.d,l.e,l.f],s.join(",")==="1,0,0,1,0,0"?Fl:s):(s===Fl&&!e.offsetParent&&e!==ta&&!n.svg&&(l=i.display,i.display="block",o=e.parentNode,(!o||!e.offsetParent&&!e.getBoundingClientRect().width)&&(c=1,a=e.nextElementSibling,ta.appendChild(e)),s=Ng(e),l?i.display=l:co(e,"display"),c&&(a?o.insertBefore(e,a):o?o.appendChild(e):ta.removeChild(e))),t&&s.length>6?[s[0],s[1],s[4],s[5],s[12],s[13]]:s)},lh=function(e,t,n,i,s,o){var a=e._gsap,l=s||up(e,!0),c=a.xOrigin||0,u=a.yOrigin||0,d=a.xOffset||0,f=a.yOffset||0,h=l[0],_=l[1],g=l[2],m=l[3],p=l[4],S=l[5],x=t.split(" "),v=parseFloat(x[0])||0,T=parseFloat(x[1])||0,M,E,P,y;n?l!==Fl&&(E=h*m-_*g)&&(P=v*(m/E)+T*(-g/E)+(g*S-m*p)/E,y=v*(-_/E)+T*(h/E)-(h*S-_*p)/E,v=P,T=y):(M=vv(e),v=M.x+(~x[0].indexOf("%")?v/100*M.width:v),T=M.y+(~(x[1]||x[0]).indexOf("%")?T/100*M.height:T)),i||i!==!1&&a.smooth?(p=v-c,S=T-u,a.xOffset=d+(p*h+S*g)-p,a.yOffset=f+(p*_+S*m)-S):a.xOffset=a.yOffset=0,a.xOrigin=v,a.yOrigin=T,a.smooth=!!i,a.origin=t,a.originIsAbsolute=!!n,e.style[ci]="0px 0px",o&&(ls(o,a,"xOrigin",c,v),ls(o,a,"yOrigin",u,T),ls(o,a,"xOffset",d,a.xOffset),ls(o,a,"yOffset",f,a.yOffset)),e.setAttribute("data-svg-origin",v+" "+T)},kl=function(e,t){var n=e._gsap||new rv(e);if("x"in n&&!t&&!n.uncache)return n;var i=e.style,s=n.scaleX<0,o="px",a="deg",l=getComputedStyle(e),c=fr(e,ci)||"0",u,d,f,h,_,g,m,p,S,x,v,T,M,E,P,y,b,D,B,U,K,F,C,J,X,me,I,_e,Y,Re,Q,se;return u=d=f=g=m=p=S=x=v=0,h=_=1,n.svg=!!(e.getCTM&&yv(e)),l.translate&&((l.translate!=="none"||l.scale!=="none"||l.rotate!=="none")&&(i[ln]=(l.translate!=="none"?"translate3d("+(l.translate+" 0 0").split(" ").slice(0,3).join(", ")+") ":"")+(l.rotate!=="none"?"rotate("+l.rotate+") ":"")+(l.scale!=="none"?"scale("+l.scale.split(" ").join(",")+") ":"")+(l[ln]!=="none"?l[ln]:"")),i.scale=i.rotate=i.translate="none"),E=up(e,n.svg),n.svg&&(n.uncache?(X=e.getBBox(),c=n.xOrigin-X.x+"px "+(n.yOrigin-X.y)+"px",J=""):J=!t&&e.getAttribute("data-svg-origin"),lh(e,J||c,!!J||n.originIsAbsolute,n.smooth!==!1,E)),T=n.xOrigin||0,M=n.yOrigin||0,E!==Fl&&(D=E[0],B=E[1],U=E[2],K=E[3],u=F=E[4],d=C=E[5],E.length===6?(h=Math.sqrt(D*D+B*B),_=Math.sqrt(K*K+U*U),g=D||B?Uo(B,D)*zs:0,S=U||K?Uo(U,K)*zs+g:0,S&&(_*=Math.abs(Math.cos(S*na))),n.svg&&(u-=T-(T*D+M*U),d-=M-(T*B+M*K))):(se=E[6],Re=E[7],I=E[8],_e=E[9],Y=E[10],Q=E[11],u=E[12],d=E[13],f=E[14],P=Uo(se,Y),m=P*zs,P&&(y=Math.cos(-P),b=Math.sin(-P),J=F*y+I*b,X=C*y+_e*b,me=se*y+Y*b,I=F*-b+I*y,_e=C*-b+_e*y,Y=se*-b+Y*y,Q=Re*-b+Q*y,F=J,C=X,se=me),P=Uo(-U,Y),p=P*zs,P&&(y=Math.cos(-P),b=Math.sin(-P),J=D*y-I*b,X=B*y-_e*b,me=U*y-Y*b,Q=K*b+Q*y,D=J,B=X,U=me),P=Uo(B,D),g=P*zs,P&&(y=Math.cos(P),b=Math.sin(P),J=D*y+B*b,X=F*y+C*b,B=B*y-D*b,C=C*y-F*b,D=J,F=X),m&&Math.abs(m)+Math.abs(g)>359.9&&(m=g=0,p=180-p),h=hn(Math.sqrt(D*D+B*B+U*U)),_=hn(Math.sqrt(C*C+se*se)),P=Uo(F,C),S=Math.abs(P)>2e-4?P*zs:0,v=Q?1/(Q<0?-Q:Q):0),n.svg&&(J=e.getAttribute("transform"),n.forceCSS=e.setAttribute("transform","")||!bv(fr(e,ln)),J&&e.setAttribute("transform",J))),Math.abs(S)>90&&Math.abs(S)<270&&(s?(h*=-1,S+=g<=0?180:-180,g+=g<=0?180:-180):(_*=-1,S+=S<=0?180:-180)),t=t||n.uncache,n.x=u-((n.xPercent=u&&(!t&&n.xPercent||(Math.round(e.offsetWidth/2)===Math.round(-u)?-50:0)))?e.offsetWidth*n.xPercent/100:0)+o,n.y=d-((n.yPercent=d&&(!t&&n.yPercent||(Math.round(e.offsetHeight/2)===Math.round(-d)?-50:0)))?e.offsetHeight*n.yPercent/100:0)+o,n.z=f+o,n.scaleX=hn(h),n.scaleY=hn(_),n.rotation=hn(g)+a,n.rotationX=hn(m)+a,n.rotationY=hn(p)+a,n.skewX=S+a,n.skewY=x+a,n.transformPerspective=v+o,(n.zOrigin=parseFloat(c.split(" ")[2])||!t&&n.zOrigin||0)&&(i[ci]=bu(c)),n.xOffset=n.yOffset=0,n.force3D=Si.force3D,n.renderTransform=n.svg?vC:_v?Sv:_C,n.uncache=0,n},bu=function(e){return(e=e.split(" "))[0]+" "+e[1]},Ud=function(e,t,n){var i=Gn(t);return hn(parseFloat(t)+parseFloat(bs(e,"x",n+"px",i)))+i},_C=function(e,t){t.z="0px",t.rotationY=t.rotationX="0deg",t.force3D=0,Sv(e,t)},Os="0deg",Ha="0px",Ns=") ",Sv=function(e,t){var n=t||this,i=n.xPercent,s=n.yPercent,o=n.x,a=n.y,l=n.z,c=n.rotation,u=n.rotationY,d=n.rotationX,f=n.skewX,h=n.skewY,_=n.scaleX,g=n.scaleY,m=n.transformPerspective,p=n.force3D,S=n.target,x=n.zOrigin,v="",T=p==="auto"&&e&&e!==1||p===!0;if(x&&(d!==Os||u!==Os)){var M=parseFloat(u)*na,E=Math.sin(M),P=Math.cos(M),y;M=parseFloat(d)*na,y=Math.cos(M),o=Ud(S,o,E*y*-x),a=Ud(S,a,-Math.sin(M)*-x),l=Ud(S,l,P*y*-x+x)}m!==Ha&&(v+="perspective("+m+Ns),(i||s)&&(v+="translate("+i+"%, "+s+"%) "),(T||o!==Ha||a!==Ha||l!==Ha)&&(v+=l!==Ha||T?"translate3d("+o+", "+a+", "+l+") ":"translate("+o+", "+a+Ns),c!==Os&&(v+="rotate("+c+Ns),u!==Os&&(v+="rotateY("+u+Ns),d!==Os&&(v+="rotateX("+d+Ns),(f!==Os||h!==Os)&&(v+="skew("+f+", "+h+Ns),(_!==1||g!==1)&&(v+="scale("+_+", "+g+Ns),S.style[ln]=v||"translate(0, 0)"},vC=function(e,t){var n=t||this,i=n.xPercent,s=n.yPercent,o=n.x,a=n.y,l=n.rotation,c=n.skewX,u=n.skewY,d=n.scaleX,f=n.scaleY,h=n.target,_=n.xOrigin,g=n.yOrigin,m=n.xOffset,p=n.yOffset,S=n.forceCSS,x=parseFloat(o),v=parseFloat(a),T,M,E,P,y;l=parseFloat(l),c=parseFloat(c),u=parseFloat(u),u&&(u=parseFloat(u),c+=u,l+=u),l||c?(l*=na,c*=na,T=Math.cos(l)*d,M=Math.sin(l)*d,E=Math.sin(l-c)*-f,P=Math.cos(l-c)*f,c&&(u*=na,y=Math.tan(c-u),y=Math.sqrt(1+y*y),E*=y,P*=y,u&&(y=Math.tan(u),y=Math.sqrt(1+y*y),T*=y,M*=y)),T=hn(T),M=hn(M),E=hn(E),P=hn(P)):(T=d,P=f,M=E=0),(x&&!~(o+"").indexOf("px")||v&&!~(a+"").indexOf("px"))&&(x=bs(h,"x",o,"px"),v=bs(h,"y",a,"px")),(_||g||m||p)&&(x=hn(x+_-(_*T+g*E)+m),v=hn(v+g-(_*M+g*P)+p)),(i||s)&&(y=h.getBBox(),x=hn(x+i/100*y.width),v=hn(v+s/100*y.height)),y="matrix("+T+","+M+","+E+","+P+","+x+","+v+")",h.setAttribute("transform",y),S&&(h.style[ln]=y)},yC=function(e,t,n,i,s){var o=360,a=Ln(s),l=parseFloat(s)*(a&&~s.indexOf("rad")?zs:1),c=l-i,u=i+c+"deg",d,f;return a&&(d=s.split("_")[1],d==="short"&&(c%=o,c!==c%(o/2)&&(c+=c<0?o:-o)),d==="cw"&&c<0?c=(c+o*Rg)%o-~~(c/o)*o:d==="ccw"&&c>0&&(c=(c-o*Rg)%o-~~(c/o)*o)),e._pt=f=new li(e._pt,t,n,i,c,nC),f.e=u,f.u="deg",e._props.push(n),f},Ug=function(e,t){for(var n in t)e[n]=t[n];return e},xC=function(e,t,n){var i=Ug({},n._gsap),s="perspective,force3D,transformOrigin,svgOrigin",o=n.style,a,l,c,u,d,f,h,_;i.svg?(c=n.getAttribute("transform"),n.setAttribute("transform",""),o[ln]=t,a=kl(n,1),co(n,ln),n.setAttribute("transform",c)):(c=getComputedStyle(n)[ln],o[ln]=t,a=kl(n,1),o[ln]=c);for(l in Vr)c=i[l],u=a[l],c!==u&&s.indexOf(l)<0&&(h=Gn(c),_=Gn(u),d=h!==_?bs(n,l,c,_):parseFloat(c),f=parseFloat(u),e._pt=new li(e._pt,a,l,d,f-d,sh),e._pt.u=_||0,e._props.push(l));Ug(a,i)};ai("padding,margin,Width,Radius",function(r,e){var t="Top",n="Right",i="Bottom",s="Left",o=(e<3?[t,n,i,s]:[t+s,t+n,i+n,i+s]).map(function(a){return e<2?r+a:"border"+a+r});xu[e>1?"border"+r:r]=function(a,l,c,u,d){var f,h;if(arguments.length<4)return f=o.map(function(_){return Cr(a,_,c)}),h=f.join(" "),h.split(f[0]).length===5?f[0]:h;f=(u+"").split(" "),h={},o.forEach(function(_,g){return h[_]=f[g]=f[g]||f[(g-1)/2|0]}),a.init(l,h,d)}});var dp={name:"css",register:ah,targetTest:function(e){return e.style&&e.nodeType},init:function(e,t,n,i,s){var o=this._props,a=e.style,l=n.vars.startAt,c,u,d,f,h,_,g,m,p,S,x,v,T,M,E,P;ap||ah(),this.styles=this.styles||gv(e),P=this.styles.props,this.tween=n;for(g in t)if(g!=="autoRound"&&(u=t[g],!(gi[g]&&sv(g,t,n,i,e,s)))){if(h=typeof u,_=xu[g],h==="function"&&(u=u.call(n,i,e,s),h=typeof u),h==="string"&&~u.indexOf("random(")&&(u=Ol(u)),_)_(this,e,g,u,n)&&(E=1);else if(g.substr(0,2)==="--")c=(getComputedStyle(e).getPropertyValue(g)+"").trim(),u+="",gs.lastIndex=0,gs.test(c)||(m=Gn(c),p=Gn(u)),p?m!==p&&(c=bs(e,g,c,p)+p):m&&(u+=m),this.add(a,"setProperty",c,u,i,s,0,0,g),o.push(g),P.push(g,0,a[g]);else if(h!=="undefined"){if(l&&g in l?(c=typeof l[g]=="function"?l[g].call(n,i,e,s):l[g],Ln(c)&&~c.indexOf("random(")&&(c=Ol(c)),Gn(c+"")||c==="auto"||(c+=Si.units[g]||Gn(Cr(e,g))||""),(c+"").charAt(1)==="="&&(c=Cr(e,g))):c=Cr(e,g),f=parseFloat(c),S=h==="string"&&u.charAt(1)==="="&&u.substr(0,2),S&&(u=u.substr(2)),d=parseFloat(u),g in lr&&(g==="autoAlpha"&&(f===1&&Cr(e,"visibility")==="hidden"&&d&&(f=0),P.push("visibility",0,a.visibility),ls(this,a,"visibility",f?"inherit":"hidden",d?"inherit":"hidden",!d)),g!=="scale"&&g!=="transform"&&(g=lr[g],~g.indexOf(",")&&(g=g.split(",")[0]))),x=g in Vr,x){if(this.styles.save(g),v||(T=e._gsap,T.renderTransform&&!t.parseTransform||kl(e,t.parseTransform),M=t.smoothOrigin!==!1&&T.smooth,v=this._pt=new li(this._pt,a,ln,0,1,T.renderTransform,T,0,-1),v.dep=1),g==="scale")this._pt=new li(this._pt,T,"scaleY",T.scaleY,(S?ea(T.scaleY,S+d):d)-T.scaleY||0,sh),this._pt.u=0,o.push("scaleY",g),g+="X";else if(g==="transformOrigin"){P.push(ci,0,a[ci]),u=mC(u),T.svg?lh(e,u,0,M,0,this):(p=parseFloat(u.split(" ")[2])||0,p!==T.zOrigin&&ls(this,T,"zOrigin",T.zOrigin,p),ls(this,a,g,bu(c),bu(u)));continue}else if(g==="svgOrigin"){lh(e,u,1,M,0,this);continue}else if(g in xv){yC(this,T,g,f,S?ea(f,S+u):u);continue}else if(g==="smoothOrigin"){ls(this,T,"smooth",T.smooth,u);continue}else if(g==="force3D"){T[g]=u;continue}else if(g==="transform"){xC(this,u,e);continue}}else g in a||(g=ba(g)||g);if(x||(d||d===0)&&(f||f===0)&&!tC.test(u)&&g in a)m=(c+"").substr((f+"").length),d||(d=0),p=Gn(u)||(g in Si.units?Si.units[g]:m),m!==p&&(f=bs(e,g,c,p)),this._pt=new li(this._pt,x?T:a,g,f,(S?ea(f,S+d):d)-f,!x&&(p==="px"||g==="zIndex")&&t.autoRound!==!1?rC:sh),this._pt.u=p||0,m!==p&&p!=="%"&&(this._pt.b=c,this._pt.r=iC);else if(g in a)pC.call(this,e,g,c,S?S+u:u);else if(g in e)this.add(e,g,c||e[g],S?S+u:u,i,s);else if(g!=="parseTransform"){Jh(g,u);continue}x||(g in a?P.push(g,0,a[g]):typeof e[g]=="function"?P.push(g,2,e[g]()):P.push(g,1,c||e[g])),o.push(g)}}E&&dv(this)},render:function(e,t){if(t.tween._time||!lp())for(var n=t._pt;n;)n.r(e,n.d),n=n._next;else t.styles.revert()},get:Cr,aliases:lr,getSetter:function(e,t,n){var i=lr[t];return i&&i.indexOf(",")<0&&(t=i),t in Vr&&t!==ci&&(e._gsap.x||Cr(e,"x"))?n&&Cg===n?t==="scale"?lC:aC:(Cg=n||{})&&(t==="scale"?cC:uC):e.style&&!$h(e.style[t])?sC:~t.indexOf("-")?oC:sp(e,t)},core:{_removeProperty:co,_getMatrix:up}};ui.utils.checkPrefix=ba;ui.core.getStyleSaver=gv;(function(r,e,t,n){var i=ai(r+","+e+","+t,function(s){Vr[s]=1});ai(e,function(s){Si.units[s]="deg",xv[s]=1}),lr[i[13]]=r+","+e,ai(n,function(s){var o=s.split(":");lr[o[1]]=i[o[0]]})})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent","rotation,rotationX,rotationY,skewX,skewY","transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective","0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");ai("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective",function(r){Si.units[r]="px"});ui.registerPlugin(dp);var Ie=ui.registerPlugin(dp)||ui,bC=Ie.core.Tween;const SC=Object.freeze(Object.defineProperty({__proto__:null,Back:YA,Bounce:$A,CSSPlugin:dp,Circ:JA,Cubic:VA,Elastic:qA,Expo:ZA,Linear:zA,Power0:NA,Power1:UA,Power2:FA,Power3:kA,Power4:BA,Quad:HA,Quart:GA,Quint:WA,Sine:KA,SteppedEase:jA,Strong:XA,TimelineLite:Nn,TimelineMax:Nn,TweenLite:pn,TweenMax:bC,default:Ie,gsap:Ie},Symbol.toStringTag,{value:"Module"}));/*!
 * paths 3.12.7
 * https://gsap.com
 *
 * Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license or for
 * Club GSAP members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/var wC=/[achlmqstvz]|(-?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/ig,MC=/(?:(-)?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/ig,EC=/[\+\-]?\d*\.?\d+e[\+\-]?\d+/ig,TC=/(^[#\.][a-z]|[a-y][a-z])/i,AC=Math.PI/180,Nc=Math.sin,Uc=Math.cos,yl=Math.abs,Va=Math.sqrt,Fg=function(e){return typeof e=="string"},wv=function(e){return typeof e=="number"},kg=1e5,es=function(e){return Math.round(e*kg)/kg||0};function CC(r){r=Fg(r)&&TC.test(r)&&document.querySelector(r)||r;var e=r.getAttribute?r:0,t;return e&&(r=r.getAttribute("d"))?(e._gsPath||(e._gsPath={}),t=e._gsPath[r],t&&!t._dirty?t:e._gsPath[r]=_s(r)):r?Fg(r)?_s(r):wv(r[0])?[r]:r:console.warn("Expecting a <path> element or an SVG path data string")}function Qa(r){var e=0,t;for(r.reverse();e<r.length;e+=2)t=r[e],r[e]=r[e+1],r[e+1]=t;r.reversed=!r.reversed}var RC=function(e,t){var n=document.createElementNS("http://www.w3.org/2000/svg","path"),i=[].slice.call(e.attributes),s=i.length,o;for(t=","+t+",";--s>-1;)o=i[s].nodeName.toLowerCase(),t.indexOf(","+o+",")<0&&n.setAttributeNS(null,o,i[s].nodeValue);return n},PC={rect:"rx,ry,x,y,width,height",circle:"r,cx,cy",ellipse:"rx,ry,cx,cy",line:"x1,x2,y1,y2"},LC=function(e,t){for(var n=t?t.split(","):[],i={},s=n.length;--s>-1;)i[n[s]]=+e.getAttribute(n[s])||0;return i};function Mv(r,e){var t=r.tagName.toLowerCase(),n=.552284749831,i,s,o,a,l,c,u,d,f,h,_,g,m,p,S,x,v,T,M,E,P,y;return t==="path"||!r.getBBox?r:(c=RC(r,"x,y,width,height,cx,cy,rx,ry,r,x1,x2,y1,y2,points"),y=LC(r,PC[t]),t==="rect"?(a=y.rx,l=y.ry||a,s=y.x,o=y.y,h=y.width-a*2,_=y.height-l*2,a||l?(g=s+a*(1-n),m=s+a,p=m+h,S=p+a*n,x=p+a,v=o+l*(1-n),T=o+l,M=T+_,E=M+l*n,P=M+l,i="M"+x+","+T+" V"+M+" C"+[x,E,S,P,p,P,p-(p-m)/3,P,m+(p-m)/3,P,m,P,g,P,s,E,s,M,s,M-(M-T)/3,s,T+(M-T)/3,s,T,s,v,g,o,m,o,m+(p-m)/3,o,p-(p-m)/3,o,p,o,S,o,x,v,x,T].join(",")+"z"):i="M"+(s+h)+","+o+" v"+_+" h"+-h+" v"+-_+" h"+h+"z"):t==="circle"||t==="ellipse"?(t==="circle"?(a=l=y.r,d=a*n):(a=y.rx,l=y.ry,d=l*n),s=y.cx,o=y.cy,u=a*n,i="M"+(s+a)+","+o+" C"+[s+a,o+d,s+u,o+l,s,o+l,s-u,o+l,s-a,o+d,s-a,o,s-a,o-d,s-u,o-l,s,o-l,s+u,o-l,s+a,o-d,s+a,o].join(",")+"z"):t==="line"?i="M"+y.x1+","+y.y1+" L"+y.x2+","+y.y2:(t==="polyline"||t==="polygon")&&(f=(r.getAttribute("points")+"").match(MC)||[],s=f.shift(),o=f.shift(),i="M"+s+","+o+" L"+f.join(","),t==="polygon"&&(i+=","+s+","+o+"z")),c.setAttribute("d",ia(c._gsRawPath=_s(i))),e&&r.parentNode&&(r.parentNode.insertBefore(c,r),r.parentNode.removeChild(r)),c)}function DC(r,e,t,n,i,s,o,a,l){if(!(r===a&&e===l)){t=yl(t),n=yl(n);var c=i%360*AC,u=Uc(c),d=Nc(c),f=Math.PI,h=f*2,_=(r-a)/2,g=(e-l)/2,m=u*_+d*g,p=-d*_+u*g,S=m*m,x=p*p,v=S/(t*t)+x/(n*n);v>1&&(t=Va(v)*t,n=Va(v)*n);var T=t*t,M=n*n,E=(T*M-T*x-M*S)/(T*x+M*S);E<0&&(E=0);var P=(s===o?-1:1)*Va(E),y=P*(t*p/n),b=P*-(n*m/t),D=(r+a)/2,B=(e+l)/2,U=D+(u*y-d*b),K=B+(d*y+u*b),F=(m-y)/t,C=(p-b)/n,J=(-m-y)/t,X=(-p-b)/n,me=F*F+C*C,I=(C<0?-1:1)*Math.acos(F/Va(me)),_e=(F*X-C*J<0?-1:1)*Math.acos((F*J+C*X)/Va(me*(J*J+X*X)));isNaN(_e)&&(_e=f),!o&&_e>0?_e-=h:o&&_e<0&&(_e+=h),I%=h,_e%=h;var Y=Math.ceil(yl(_e)/(h/4)),Re=[],Q=_e/Y,se=4/3*Nc(Q/2)/(1+Uc(Q/2)),Me=u*t,ve=d*t,De=d*-n,Qe=u*n,Pe;for(Pe=0;Pe<Y;Pe++)i=I+Pe*Q,m=Uc(i),p=Nc(i),F=Uc(i+=Q),C=Nc(i),Re.push(m-se*p,p+se*m,F+se*C,C-se*F,F,C);for(Pe=0;Pe<Re.length;Pe+=2)m=Re[Pe],p=Re[Pe+1],Re[Pe]=m*Me+p*De+U,Re[Pe+1]=m*ve+p*Qe+K;return Re[Pe-2]=a,Re[Pe-1]=l,Re}}function _s(r){var e=(r+"").replace(EC,function(y){var b=+y;return b<1e-4&&b>-1e-4?0:b}).match(wC)||[],t=[],n=0,i=0,s=2/3,o=e.length,a=0,l="ERROR: malformed path: "+r,c,u,d,f,h,_,g,m,p,S,x,v,T,M,E,P=function(b,D,B,U){S=(B-b)/3,x=(U-D)/3,g.push(b+S,D+x,B-S,U-x,B,U)};if(!r||!isNaN(e[0])||isNaN(e[1]))return console.log(l),t;for(c=0;c<o;c++)if(T=h,isNaN(e[c])?(h=e[c].toUpperCase(),_=h!==e[c]):c--,d=+e[c+1],f=+e[c+2],_&&(d+=n,f+=i),c||(m=d,p=f),h==="M")g&&(g.length<8?t.length-=1:a+=g.length),n=m=d,i=p=f,g=[d,f],t.push(g),c+=2,h="L";else if(h==="C")g||(g=[0,0]),_||(n=i=0),g.push(d,f,n+e[c+3]*1,i+e[c+4]*1,n+=e[c+5]*1,i+=e[c+6]*1),c+=6;else if(h==="S")S=n,x=i,(T==="C"||T==="S")&&(S+=n-g[g.length-4],x+=i-g[g.length-3]),_||(n=i=0),g.push(S,x,d,f,n+=e[c+3]*1,i+=e[c+4]*1),c+=4;else if(h==="Q")S=n+(d-n)*s,x=i+(f-i)*s,_||(n=i=0),n+=e[c+3]*1,i+=e[c+4]*1,g.push(S,x,n+(d-n)*s,i+(f-i)*s,n,i),c+=4;else if(h==="T")S=n-g[g.length-4],x=i-g[g.length-3],g.push(n+S,i+x,d+(n+S*1.5-d)*s,f+(i+x*1.5-f)*s,n=d,i=f),c+=2;else if(h==="H")P(n,i,n=d,i),c+=1;else if(h==="V")P(n,i,n,i=d+(_?i-n:0)),c+=1;else if(h==="L"||h==="Z")h==="Z"&&(d=m,f=p,g.closed=!0),(h==="L"||yl(n-d)>.5||yl(i-f)>.5)&&(P(n,i,d,f),h==="L"&&(c+=2)),n=d,i=f;else if(h==="A"){if(M=e[c+4],E=e[c+5],S=e[c+6],x=e[c+7],u=7,M.length>1&&(M.length<3?(x=S,S=E,u--):(x=E,S=M.substr(2),u-=2),E=M.charAt(1),M=M.charAt(0)),v=DC(n,i,+e[c+1],+e[c+2],+e[c+3],+M,+E,(_?n:0)+S*1,(_?i:0)+x*1),c+=u,v)for(u=0;u<v.length;u++)g.push(v[u]);n=g[g.length-2],i=g[g.length-1]}else console.log(l);return c=g.length,c<6?(t.pop(),c=0):g[0]===g[c-2]&&g[1]===g[c-1]&&(g.closed=!0),t.totalPoints=a+c,t}function ia(r){wv(r[0])&&(r=[r]);var e="",t=r.length,n,i,s,o;for(i=0;i<t;i++){for(o=r[i],e+="M"+es(o[0])+","+es(o[1])+" C",n=o.length,s=2;s<n;s++)e+=es(o[s++])+","+es(o[s++])+" "+es(o[s++])+","+es(o[s++])+" "+es(o[s++])+","+es(o[s])+" ";o.closed&&(e+="z")}return e}/*!
 * MorphSVGPlugin 3.12.7
 * https://gsap.com
 *
 * @license Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license or for
 * Club GSAP members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/var qi,fp,el,Ev,tl,Tv=function(){return qi||typeof window<"u"&&(qi=window.gsap)&&qi.registerPlugin&&qi},Fd=function(e){return typeof e=="function"},Ys=Math.atan2,Bg=Math.cos,zg=Math.sin,Ur=Math.sqrt,Du=Math.PI,Hg=Du*2,IC=Du*.3,OC=Du*.7,Av=1e20,Bl=/[-+=\.]*\d+[\.e\-\+]*\d*[e\-\+]*\d*/gi,NC=/(^[#\.][a-z]|[a-y][a-z])/i,UC=/[achlmqstvz]/i,cs=function(e){return console&&console.warn(e)},FC=1,Vg=function(e){var t=e.length,n=0,i=0,s;for(s=0;s<t;s++)n+=e[s++],i+=e[s];return[n/(t/2),i/(t/2)]},ra=function(e){var t=e.length,n=e[0],i=n,s=e[1],o=s,a,l,c;for(c=6;c<t;c+=6)a=e[c],l=e[c+1],a>n?n=a:a<i&&(i=a),l>s?s=l:l<o&&(o=l);return e.centerX=(n+i)/2,e.centerY=(s+o)/2,e.size=(n-i)*(s-o)},xl=function(e,t){t===void 0&&(t=3);for(var n=e.length,i=e[0][0],s=i,o=e[0][1],a=o,l=1/t,c,u,d,f,h,_,g,m,p,S,x,v,T,M,E,P;--n>-1;)for(h=e[n],c=h.length,f=6;f<c;f+=6)for(p=h[f],S=h[f+1],x=h[f+2]-p,M=h[f+3]-S,v=h[f+4]-p,E=h[f+5]-S,T=h[f+6]-p,P=h[f+7]-S,_=t;--_>-1;)g=l*_,m=1-g,u=(g*g*T+3*m*(g*v+m*x))*g+p,d=(g*g*P+3*m*(g*E+m*M))*g+S,u>i?i=u:u<s&&(s=u),d>o?o=d:d<a&&(a=d);return e.centerX=(i+s)/2,e.centerY=(o+a)/2,e.left=s,e.width=i-s,e.top=a,e.height=o-a,e.size=(i-s)*(o-a)},kC=function(e,t){return t.length-e.length},Gg=function(e,t){var n=e.size||ra(e),i=t.size||ra(t);return Math.abs(i-n)<(n+i)/20?t.centerX-e.centerX||t.centerY-e.centerY:i-n},Wg=function(e,t){var n=e.slice(0),i=e.length,s=i-2,o,a;for(t=t|0,o=0;o<i;o++)a=(o+t)%s,e[o++]=n[a],e[o]=n[a+1]},kd=function(e,t,n,i,s){var o=e.length,a=0,l=o-2,c,u,d,f;for(n*=6,u=0;u<o;u+=6)c=(u+n)%l,f=e[c]-(t[u]-i),d=e[c+1]-(t[u+1]-s),a+=Ur(d*d+f*f);return a},BC=function(e,t,n){var i=e.length,s=Vg(e),o=Vg(t),a=o[0]-s[0],l=o[1]-s[1],c=kd(e,t,0,a,l),u=0,d,f,h;for(h=6;h<i;h+=6)f=kd(e,t,h/6,a,l),f<c&&(c=f,u=h);if(n)for(d=e.slice(0),Qa(d),h=6;h<i;h+=6)f=kd(d,t,h/6,a,l),f<c&&(c=f,u=-h);return u/6},zC=function(e,t,n){for(var i=e.length,s=Av,o=0,a=0,l,c,u,d,f,h;--i>-1;)for(l=e[i],h=l.length,f=0;f<h;f+=6)c=l[f]-t,u=l[f+1]-n,d=Ur(c*c+u*u),d<s&&(s=d,o=l[f],a=l[f+1]);return[o,a]},HC=function(e,t,n,i,s,o){var a=t.length,l=0,c=Math.min(e.size||ra(e),t[n].size||ra(t[n]))*i,u=Av,d=e.centerX+s,f=e.centerY+o,h,_,g,m,p;for(_=n;_<a&&(h=t[_].size||ra(t[_]),!(h<c));_++)g=t[_].centerX-d,m=t[_].centerY-f,p=Ur(g*g+m*m),p<u&&(l=_,u=p);return p=t[l],t.splice(l,1),p},Bd=function(e,t){var n=0,i=.999999,s=e.length,o=t/((s-2)/6),a,l,c,u,d,f,h,_,g,m,p,S,x,v;for(x=2;x<s;x+=6)for(n+=o;n>i;)a=e[x-2],l=e[x-1],c=e[x],u=e[x+1],d=e[x+2],f=e[x+3],h=e[x+4],_=e[x+5],v=1/((Math.floor(n)||1)+1),g=a+(c-a)*v,p=c+(d-c)*v,g+=(p-g)*v,p+=(d+(h-d)*v-p)*v,m=l+(u-l)*v,S=u+(f-u)*v,m+=(S-m)*v,S+=(f+(_-f)*v-S)*v,e.splice(x,4,a+(c-a)*v,l+(u-l)*v,g,m,g+(p-g)*v,m+(S-m)*v,p,S,d+(h-d)*v,f+(_-f)*v),x+=6,s+=6,n--;return e},ch=function(e,t,n,i,s){var o=t.length-e.length,a=o>0?t:e,l=o>0?e:t,c=0,u=i==="complexity"?kC:Gg,d=i==="position"?0:typeof i=="number"?i:.8,f=l.length,h=typeof n=="object"&&n.push?n.slice(0):[n],_=h[0]==="reverse"||h[0]<0,g=n==="log",m,p,S,x,v,T,M;if(l[0]){if(a.length>1&&(e.sort(u),t.sort(u),T=a.size||xl(a),T=l.size||xl(l),T=a.centerX-l.centerX,M=a.centerY-l.centerY,u===Gg))for(f=0;f<l.length;f++)a.splice(f,0,HC(l[f],a,f,d,T,M));if(o)for(o<0&&(o=-o),a[0].length>l[0].length&&Bd(l[0],(a[0].length-l[0].length)/6|0),f=l.length;c<o;)x=a[f].size||ra(a[f]),S=zC(l,a[f].centerX,a[f].centerY),x=S[0],v=S[1],l[f++]=[x,v,x,v,x,v,x,v],l.totalPoints+=8,c++;for(f=0;f<e.length;f++)m=t[f],p=e[f],o=m.length-p.length,o<0?Bd(m,-o/6|0):o>0&&Bd(p,o/6|0),_&&s!==!1&&!p.reversed&&Qa(p),n=h[f]||h[f]===0?h[f]:"auto",n&&(p.closed||Math.abs(p[0]-p[p.length-2])<.5&&Math.abs(p[1]-p[p.length-1])<.5?n==="auto"||n==="log"?(h[f]=n=BC(p,m,!f||s===!1),n<0&&(_=!0,Qa(p),n=-n),Wg(p,n*6)):n!=="reverse"&&(f&&n<0&&Qa(p),Wg(p,(n<0?-n:n)*6)):!_&&(n==="auto"&&Math.abs(m[0]-p[0])+Math.abs(m[1]-p[1])+Math.abs(m[m.length-2]-p[p.length-2])+Math.abs(m[m.length-1]-p[p.length-1])>Math.abs(m[0]-p[p.length-2])+Math.abs(m[1]-p[p.length-1])+Math.abs(m[m.length-2]-p[0])+Math.abs(m[m.length-1]-p[1])||n%2)?(Qa(p),h[f]=-1,_=!0):n==="auto"?h[f]=0:n==="reverse"&&(h[f]=-1),p.closed!==m.closed&&(p.closed=m.closed=!1));return g&&cs("shapeIndex:["+h.join(",")+"]"),e.shapeIndex=h,h}},Xg=function(e,t,n,i,s){var o=_s(e[0]),a=_s(e[1]);ch(o,a,t||t===0?t:"auto",n,s)&&(e[0]=ia(o),e[1]=ia(a),(i==="log"||i===!0)&&cs('precompile:["'+e[0]+'","'+e[1]+'"]'))},VC=function(e,t){if(!t)return e;var n=e.match(Bl)||[],i=n.length,s="",o,a,l;for(t==="reverse"?(a=i-1,o=-2):(a=((parseInt(t,10)||0)*2+1+i*100)%i,o=2),l=0;l<i;l+=2)s+=n[a-1]+","+n[a]+" ",a=(a+o)%i;return s},qg=function(e,t){var n=0,i=parseFloat(e[0]),s=parseFloat(e[1]),o=i+","+s+" ",a=.999999,l,c,u,d,f,h,_;for(u=e.length,l=t*.5/(u*.5-1),c=0;c<u-2;c+=2){if(n+=l,h=parseFloat(e[c+2]),_=parseFloat(e[c+3]),n>a)for(f=1/(Math.floor(n)+1),d=1;n>a;)o+=(i+(h-i)*f*d).toFixed(2)+","+(s+(_-s)*f*d).toFixed(2)+" ",n--,d++;o+=h+","+_+" ",i=h,s=_}return o},uh=function(e){var t=e[0].match(Bl)||[],n=e[1].match(Bl)||[],i=n.length-t.length;i>0?e[0]=qg(t,i):e[1]=qg(n,-i)},GC=function(e){return isNaN(e)?uh:function(t){uh(t),t[1]=VC(t[1],parseInt(e,10))}},WC=function(e,t,n){var i=typeof e=="string",s,o;return(!i||NC.test(e)||(e.match(Bl)||[]).length<3)&&(s=fp(e)[0],s?(o=(s.nodeName+"").toUpperCase(),t&&o!=="PATH"&&(s=Mv(s,!1),o="PATH"),e=s.getAttribute(o==="PATH"?"d":"points")||"",s===n&&(e=s.getAttributeNS(null,"data-original")||e)):(cs("WARNING: invalid morph to: "+e),e=!1)),e},Yg=function(e,t){for(var n=e.length,i=.2*(t||1),s,o,a,l,c,u,d,f,h,_,g,m;--n>-1;){for(o=e[n],g=o.isSmooth=o.isSmooth||[0,0,0,0],m=o.smoothData=o.smoothData||[0,0,0,0],g.length=4,f=o.length-2,d=6;d<f;d+=6)a=o[d]-o[d-2],l=o[d+1]-o[d-1],c=o[d+2]-o[d],u=o[d+3]-o[d+1],h=Ys(l,a),_=Ys(u,c),s=Math.abs(h-_)<i,s&&(m[d-2]=h,m[d+2]=_,m[d-1]=Ur(a*a+l*l),m[d+3]=Ur(c*c+u*u)),g.push(s,s,0,0,s,s);o[f]===o[0]&&o[f+1]===o[1]&&(a=o[0]-o[f-2],l=o[1]-o[f-1],c=o[2]-o[0],u=o[3]-o[1],h=Ys(l,a),_=Ys(u,c),Math.abs(h-_)<i&&(m[f-2]=h,m[2]=_,m[f-1]=Ur(a*a+l*l),m[3]=Ur(c*c+u*u),g[f-2]=g[f-1]=!0))}return e},jg=function(e){var t=e.trim().split(" "),n=~e.indexOf("left")?0:~e.indexOf("right")?100:isNaN(parseFloat(t[0]))?50:parseFloat(t[0]),i=~e.indexOf("top")?0:~e.indexOf("bottom")?100:isNaN(parseFloat(t[1]))?50:parseFloat(t[1]);return{x:n/100,y:i/100}},XC=function(e){return e!==e%Du?e+(e<0?Hg:-Hg):e},$g="Use MorphSVGPlugin.convertToPath() to convert to a path before morphing.",qC=function(e,t,n,i){var s=this._origin,o=this._eOrigin,a=e[n]-s.x,l=e[n+1]-s.y,c=Ur(a*a+l*l),u=Ys(l,a),d,f;return a=t[n]-o.x,l=t[n+1]-o.y,d=Ys(l,a)-u,f=XC(d),!i&&el&&Math.abs(f+el.ca)<IC&&(i=el),this._anchorPT=el={_next:this._anchorPT,t:e,sa:u,ca:i&&f*i.ca<0&&Math.abs(f)>OC?d:f,sl:c,cl:Ur(a*a+l*l)-c,i:n}},Kg=function(e){qi=Tv(),tl=tl||qi&&qi.plugins.morphSVG,qi&&tl?(fp=qi.utils.toArray,tl.prototype._tweenRotation=qC,Ev=1):e&&cs("Please gsap.registerPlugin(MorphSVGPlugin)")},Yo={version:"3.12.7",name:"morphSVG",rawVars:1,register:function(e,t){qi=e,tl=t,Kg()},init:function(e,t,n,i,s){if(Ev||Kg(1),!t)return cs("invalid shape"),!1;Fd(t)&&(t=t.call(n,i,e,s));var o,a,l,c,u,d,f,h,_,g,m,p,S,x,v,T,M,E,P,y,b,D;if(typeof t=="string"||t.getBBox||t[0])t={shape:t};else if(typeof t=="object"){o={};for(a in t)o[a]=Fd(t[a])&&a!=="render"?t[a].call(n,i,e,s):t[a];t=o}var B=e.nodeType?window.getComputedStyle(e):{},U=B.fill+"",K=!(U==="none"||(U.match(Bl)||[])[3]==="0"||B.fillRule==="evenodd"),F=(t.origin||"50 50").split(",");if(o=(e.nodeName+"").toUpperCase(),u=o==="POLYLINE"||o==="POLYGON",o!=="PATH"&&!u&&!t.prop)return cs("Cannot morph a <"+o+"> element. "+$g),!1;if(a=o==="PATH"?"d":"points",!t.prop&&!Fd(e.setAttribute))return!1;if(c=WC(t.shape||t.d||t.points||"",a==="d",e),u&&UC.test(c))return cs("A <"+o+"> cannot accept path data. "+$g),!1;if(d=t.shapeIndex||t.shapeIndex===0?t.shapeIndex:"auto",f=t.map||Yo.defaultMap,this._prop=t.prop,this._render=t.render||Yo.defaultRender,this._apply="updateTarget"in t?t.updateTarget:Yo.defaultUpdateTarget,this._rnd=Math.pow(10,isNaN(t.precision)?2:+t.precision),this._tween=n,c){if(this._target=e,M=typeof t.precompile=="object",g=this._prop?e[this._prop]:e.getAttribute(a),!this._prop&&!e.getAttributeNS(null,"data-original")&&e.setAttributeNS(null,"data-original",g),a==="d"||this._prop){if(g=_s(M?t.precompile[0]:g),m=_s(M?t.precompile[1]:c),!M&&!ch(g,m,d,f,K))return!1;for((t.precompile==="log"||t.precompile===!0)&&cs('precompile:["'+ia(g)+'","'+ia(m)+'"]'),b=(t.type||Yo.defaultType)!=="linear",b&&(g=Yg(g,t.smoothTolerance),m=Yg(m,t.smoothTolerance),g.size||xl(g),m.size||xl(m),y=jg(F[0]),this._origin=g.origin={x:g.left+y.x*g.width,y:g.top+y.y*g.height},F[1]&&(y=jg(F[1])),this._eOrigin={x:m.left+y.x*m.width,y:m.top+y.y*m.height}),this._rawPath=e._gsRawPath=g,S=g.length;--S>-1;)for(v=g[S],T=m[S],h=v.isSmooth||[],_=T.isSmooth||[],x=v.length,el=0,p=0;p<x;p+=2)(T[p]!==v[p]||T[p+1]!==v[p+1])&&(b?h[p]&&_[p]?(E=v.smoothData,P=T.smoothData,D=p+(p===x-4?7-x:5),this._controlPT={_next:this._controlPT,i:p,j:S,l1s:E[p+1],l1c:P[p+1]-E[p+1],l2s:E[D],l2c:P[D]-E[D]},l=this._tweenRotation(v,T,p+2),this._tweenRotation(v,T,p,l),this._tweenRotation(v,T,D-1,l),p+=4):this._tweenRotation(v,T,p):(l=this.add(v,p,v[p],T[p],0,0,0,0,0,1),l=this.add(v,p+1,v[p+1],T[p+1],0,0,0,0,0,1)||l))}else l=this.add(e,"setAttribute",e.getAttribute(a)+"",c+"",i,s,0,GC(d),a);b&&(this.add(this._origin,"x",this._origin.x,this._eOrigin.x,0,0,0,0,0,1),l=this.add(this._origin,"y",this._origin.y,this._eOrigin.y,0,0,0,0,0,1)),l&&(this._props.push("morphSVG"),l.end=c,l.endProp=a)}return FC},render:function(e,t){for(var n=t._rawPath,i=t._controlPT,s=t._anchorPT,o=t._rnd,a=t._target,l=t._pt,c,u,d,f,h,_,g,m,p,S,x,v,T;l;)l.r(e,l.d),l=l._next;if(e===1&&t._apply)for(l=t._pt;l;)l.end&&(t._prop?a[t._prop]=l.end:a.setAttribute(l.endProp,l.end)),l=l._next;else if(n){for(;s;)_=s.sa+e*s.ca,h=s.sl+e*s.cl,s.t[s.i]=t._origin.x+Bg(_)*h,s.t[s.i+1]=t._origin.y+zg(_)*h,s=s._next;for(d=e<.5?2*e*e:(4-2*e)*e-1;i;)g=i.i,f=n[i.j],T=g+(g===f.length-4?7-f.length:5),_=Ys(f[T]-f[g+1],f[T-1]-f[g]),x=zg(_),v=Bg(_),p=f[g+2],S=f[g+3],h=i.l1s+d*i.l1c,f[g]=p-v*h,f[g+1]=S-x*h,h=i.l2s+d*i.l2c,f[T-1]=p+v*h,f[T]=S+x*h,i=i._next;if(a._gsRawPath=n,t._apply){for(c="",u=" ",m=0;m<n.length;m++)for(f=n[m],h=f.length,c+="M"+(f[0]*o|0)/o+u+(f[1]*o|0)/o+" C",g=2;g<h;g++)c+=(f[g]*o|0)/o+u;t._prop?a[t._prop]=c:a.setAttribute("d",c)}}t._render&&n&&t._render.call(t._tween,n,a)},kill:function(e){this._pt=this._rawPath=0},getRawPath:CC,stringToRawPath:_s,rawPathToString:ia,normalizeStrings:function(e,t,n){var i=n.shapeIndex,s=n.map,o=[e,t];return Xg(o,i,s),o},pathFilter:Xg,pointsFilter:uh,getTotalSize:xl,equalizeSegmentQuantity:ch,convertToPath:function(e,t){return fp(e).map(function(n){return Mv(n,t!==!1)})},defaultType:"linear",defaultUpdateTarget:!0,defaultMap:"size"};Tv()&&qi.registerPlugin(Yo);(function(){function r(){for(var n=arguments.length,i=0;i<n;i++){var s=i<0||arguments.length<=i?void 0:arguments[i];s.nodeType===1||s.nodeType===11?this.appendChild(s):this.appendChild(document.createTextNode(String(s)))}}function e(){for(;this.lastChild;)this.removeChild(this.lastChild);arguments.length&&this.append.apply(this,arguments)}function t(){for(var n=this.parentNode,i=arguments.length,s=new Array(i),o=0;o<i;o++)s[o]=arguments[o];var a=s.length;if(n)for(a||n.removeChild(this);a--;){var l=s[a];typeof l!="object"?l=this.ownerDocument.createTextNode(l):l.parentNode&&l.parentNode.removeChild(l),a?n.insertBefore(this.previousSibling,l):n.replaceChild(l,this)}}typeof Element<"u"&&(Element.prototype.append||(Element.prototype.append=r,DocumentFragment.prototype.append=r),Element.prototype.replaceChildren||(Element.prototype.replaceChildren=e,DocumentFragment.prototype.replaceChildren=e),Element.prototype.replaceWith||(Element.prototype.replaceWith=t,DocumentFragment.prototype.replaceWith=t))})();function YC(r,e){if(!(r instanceof e))throw new TypeError("Cannot call a class as a function")}function Zg(r,e){for(var t=0;t<e.length;t++){var n=e[t];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(r,n.key,n)}}function Jg(r,e,t){return e&&Zg(r.prototype,e),t&&Zg(r,t),r}function jC(r,e,t){return e in r?Object.defineProperty(r,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):r[e]=t,r}function Qg(r,e){var t=Object.keys(r);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(r);e&&(n=n.filter(function(i){return Object.getOwnPropertyDescriptor(r,i).enumerable})),t.push.apply(t,n)}return t}function e_(r){for(var e=1;e<arguments.length;e++){var t=arguments[e]!=null?arguments[e]:{};e%2?Qg(Object(t),!0).forEach(function(n){jC(r,n,t[n])}):Object.getOwnPropertyDescriptors?Object.defineProperties(r,Object.getOwnPropertyDescriptors(t)):Qg(Object(t)).forEach(function(n){Object.defineProperty(r,n,Object.getOwnPropertyDescriptor(t,n))})}return r}function Cv(r,e){return KC(r)||JC(r,e)||Rv(r,e)||eR()}function Jn(r){return $C(r)||ZC(r)||Rv(r)||QC()}function $C(r){if(Array.isArray(r))return dh(r)}function KC(r){if(Array.isArray(r))return r}function ZC(r){if(typeof Symbol<"u"&&Symbol.iterator in Object(r))return Array.from(r)}function JC(r,e){if(!(typeof Symbol>"u"||!(Symbol.iterator in Object(r)))){var t=[],n=!0,i=!1,s=void 0;try{for(var o=r[Symbol.iterator](),a;!(n=(a=o.next()).done)&&(t.push(a.value),!(e&&t.length===e));n=!0);}catch(l){i=!0,s=l}finally{try{!n&&o.return!=null&&o.return()}finally{if(i)throw s}}return t}}function Rv(r,e){if(r){if(typeof r=="string")return dh(r,e);var t=Object.prototype.toString.call(r).slice(8,-1);if(t==="Object"&&r.constructor&&(t=r.constructor.name),t==="Map"||t==="Set")return Array.from(r);if(t==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))return dh(r,e)}}function dh(r,e){(e==null||e>r.length)&&(e=r.length);for(var t=0,n=new Array(e);t<e;t++)n[t]=r[t];return n}function QC(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function eR(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function js(r,e){return Object.getOwnPropertyNames(Object(r)).reduce(function(t,n){var i=Object.getOwnPropertyDescriptor(Object(r),n),s=Object.getOwnPropertyDescriptor(Object(e),n);return Object.defineProperty(t,n,s||i)},{})}function Xl(r){return typeof r=="string"}function hp(r){return Array.isArray(r)}function Fc(){var r=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},e=js(r),t;return e.types!==void 0?t=e.types:e.split!==void 0&&(t=e.split),t!==void 0&&(e.types=(Xl(t)||hp(t)?String(t):"").split(",").map(function(n){return String(n).trim()}).filter(function(n){return/((line)|(word)|(char))/i.test(n)})),(e.absolute||e.position)&&(e.absolute=e.absolute||/absolute/.test(r.position)),e}function pp(r){var e=Xl(r)||hp(r)?String(r):"";return{none:!e,lines:/line/i.test(e),words:/word/i.test(e),chars:/char/i.test(e)}}function Iu(r){return r!==null&&typeof r=="object"}function tR(r){return Iu(r)&&/^(1|3|11)$/.test(r.nodeType)}function nR(r){return typeof r=="number"&&r>-1&&r%1===0}function iR(r){return Iu(r)&&nR(r.length)}function uo(r){return hp(r)?r:r==null?[]:iR(r)?Array.prototype.slice.call(r):[r]}function t_(r){var e=r;return Xl(r)&&(/^(#[a-z]\w+)$/.test(r.trim())?e=document.getElementById(r.trim().slice(1)):e=document.querySelectorAll(r)),uo(e).reduce(function(t,n){return[].concat(Jn(t),Jn(uo(n).filter(tR)))},[])}var rR=Object.entries,Su="_splittype",$i={},sR=0;function cr(r,e,t){if(!Iu(r))return console.warn("[data.set] owner is not an object"),null;var n=r[Su]||(r[Su]=++sR),i=$i[n]||($i[n]={});return t===void 0?e&&Object.getPrototypeOf(e)===Object.prototype&&($i[n]=e_(e_({},i),e)):e!==void 0&&(i[e]=t),t}function $s(r,e){var t=Iu(r)?r[Su]:null,n=t&&$i[t]||{};return n}function Pv(r){var e=r&&r[Su];e&&(delete r[e],delete $i[e])}function oR(){Object.keys($i).forEach(function(r){delete $i[r]})}function aR(){rR($i).forEach(function(r){var e=Cv(r,2),t=e[0],n=e[1],i=n.isRoot,s=n.isSplit;(!i||!s)&&($i[t]=null,delete $i[t])})}function lR(r){var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:" ",t=r?String(r):"";return t.trim().replace(/\s+/g," ").split(e)}var mp="\\ud800-\\udfff",Lv="\\u0300-\\u036f\\ufe20-\\ufe23",Dv="\\u20d0-\\u20f0",Iv="\\ufe0e\\ufe0f",cR="[".concat(mp,"]"),fh="[".concat(Lv).concat(Dv,"]"),hh="\\ud83c[\\udffb-\\udfff]",uR="(?:".concat(fh,"|").concat(hh,")"),Ov="[^".concat(mp,"]"),Nv="(?:\\ud83c[\\udde6-\\uddff]){2}",Uv="[\\ud800-\\udbff][\\udc00-\\udfff]",Fv="\\u200d",kv="".concat(uR,"?"),Bv="[".concat(Iv,"]?"),dR="(?:"+Fv+"(?:"+[Ov,Nv,Uv].join("|")+")"+Bv+kv+")*",fR=Bv+kv+dR,hR="(?:".concat(["".concat(Ov).concat(fh,"?"),fh,Nv,Uv,cR].join("|"),`
)`),pR=RegExp("".concat(hh,"(?=").concat(hh,")|").concat(hR).concat(fR),"g"),mR=[Fv,mp,Lv,Dv,Iv],gR=RegExp("[".concat(mR.join(""),"]"));function _R(r){return r.split("")}function zv(r){return gR.test(r)}function vR(r){return r.match(pR)||[]}function yR(r){return zv(r)?vR(r):_R(r)}function xR(r){return r==null?"":String(r)}function bR(r){var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:"";return r=xR(r),r&&Xl(r)&&!e&&zv(r)?yR(r):r.split(e)}function ph(r,e){var t=document.createElement(r);return e&&Object.keys(e).forEach(function(n){var i=e[n],s=Xl(i)?i.trim():i;s===null||s===""||(n==="children"?t.append.apply(t,Jn(uo(s))):t.setAttribute(n,s))}),t}var gp={splitClass:"",lineClass:"line",wordClass:"word",charClass:"char",types:["lines","words","chars"],absolute:!1,tagName:"div"};function SR(r,e){e=js(gp,e);var t=pp(e.types),n=e.tagName,i=r.nodeValue,s=document.createDocumentFragment(),o=[],a=[];return/^\s/.test(i)&&s.append(" "),o=lR(i).reduce(function(l,c,u,d){var f,h;return t.chars&&(h=bR(c).map(function(_){var g=ph(n,{class:"".concat(e.splitClass," ").concat(e.charClass),style:"display: inline-block;",children:_});return cr(g,"isChar",!0),a=[].concat(Jn(a),[g]),g})),t.words||t.lines?(f=ph(n,{class:"".concat(e.wordClass," ").concat(e.splitClass),style:"display: inline-block; ".concat(t.words&&e.absolute?"position: relative;":""),children:t.chars?h:c}),cr(f,{isWord:!0,isWordStart:!0,isWordEnd:!0}),s.appendChild(f)):h.forEach(function(_){s.appendChild(_)}),u<d.length-1&&s.append(" "),t.words?l.concat(f):l},[]),/\s$/.test(i)&&s.append(" "),r.replaceWith(s),{words:o,chars:a}}function Hv(r,e){var t=r.nodeType,n={words:[],chars:[]};if(!/(1|3|11)/.test(t))return n;if(t===3&&/\S/.test(r.nodeValue))return SR(r,e);var i=uo(r.childNodes);if(i.length&&(cr(r,"isSplit",!0),!$s(r).isRoot)){r.style.display="inline-block",r.style.position="relative";var s=r.nextSibling,o=r.previousSibling,a=r.textContent||"",l=s?s.textContent:" ",c=o?o.textContent:" ";cr(r,{isWordEnd:/\s$/.test(a)||/^\s/.test(l),isWordStart:/^\s/.test(a)||/\s$/.test(c)})}return i.reduce(function(u,d){var f=Hv(d,e),h=f.words,_=f.chars;return{words:[].concat(Jn(u.words),Jn(h)),chars:[].concat(Jn(u.chars),Jn(_))}},n)}function wR(r,e,t,n){if(!t.absolute)return{top:e?r.offsetTop:null};var i=r.offsetParent,s=Cv(n,2),o=s[0],a=s[1],l=0,c=0;if(i&&i!==document.body){var u=i.getBoundingClientRect();l=u.x+o,c=u.y+a}var d=r.getBoundingClientRect(),f=d.width,h=d.height,_=d.x,g=d.y,m=g+a-c,p=_+o-l;return{width:f,height:h,top:m,left:p}}function Vv(r){$s(r).isWord?(Pv(r),r.replaceWith.apply(r,Jn(r.childNodes))):uo(r.children).forEach(function(e){return Vv(e)})}var MR=function(){return document.createDocumentFragment()};function ER(r,e,t){var n=pp(e.types),i=e.tagName,s=r.getElementsByTagName("*"),o=[],a=[],l=null,c,u,d,f=[],h=r.parentElement,_=r.nextElementSibling,g=MR(),m=window.getComputedStyle(r),p=m.textAlign,S=parseFloat(m.fontSize),x=S*.2;return e.absolute&&(d={left:r.offsetLeft,top:r.offsetTop,width:r.offsetWidth},u=r.offsetWidth,c=r.offsetHeight,cr(r,{cssWidth:r.style.width,cssHeight:r.style.height})),uo(s).forEach(function(v){var T=v.parentElement===r,M=wR(v,T,e,t),E=M.width,P=M.height,y=M.top,b=M.left;/^br$/i.test(v.nodeName)||(n.lines&&T&&((l===null||y-l>=x)&&(l=y,o.push(a=[])),a.push(v)),e.absolute&&cr(v,{top:y,left:b,width:E,height:P}))}),h&&h.removeChild(r),n.lines&&(f=o.map(function(v){var T=ph(i,{class:"".concat(e.splitClass," ").concat(e.lineClass),style:"display: block; text-align: ".concat(p,"; width: 100%;")});cr(T,"isLine",!0);var M={height:0,top:1e4};return g.appendChild(T),v.forEach(function(E,P,y){var b=$s(E),D=b.isWordEnd,B=b.top,U=b.height,K=y[P+1];M.height=Math.max(M.height,U),M.top=Math.min(M.top,B),T.appendChild(E),D&&$s(K).isWordStart&&T.append(" ")}),e.absolute&&cr(T,{height:M.height,top:M.top}),T}),n.words||Vv(g),r.replaceChildren(g)),e.absolute&&(r.style.width="".concat(r.style.width||u,"px"),r.style.height="".concat(c,"px"),uo(s).forEach(function(v){var T=$s(v),M=T.isLine,E=T.top,P=T.left,y=T.width,b=T.height,D=$s(v.parentElement),B=!M&&D.isLine;v.style.top="".concat(B?E-D.top:E,"px"),v.style.left=M?"".concat(d.left,"px"):"".concat(P-(B?d.left:0),"px"),v.style.height="".concat(b,"px"),v.style.width=M?"".concat(d.width,"px"):"".concat(y,"px"),v.style.position="absolute"})),h&&(_?h.insertBefore(r,_):h.appendChild(r)),f}var Fo=js(gp,{}),Aa=function(){Jg(r,null,[{key:"clearData",value:function(){oR()}},{key:"setDefaults",value:function(t){return Fo=js(Fo,Fc(t)),gp}},{key:"revert",value:function(t){t_(t).forEach(function(n){var i=$s(n),s=i.isSplit,o=i.html,a=i.cssWidth,l=i.cssHeight;s&&(n.innerHTML=o,n.style.width=a||"",n.style.height=l||"",Pv(n))})}},{key:"create",value:function(t,n){return new r(t,n)}},{key:"data",get:function(){return $i}},{key:"defaults",get:function(){return Fo},set:function(t){Fo=js(Fo,Fc(t))}}]);function r(e,t){YC(this,r),this.isSplit=!1,this.settings=js(Fo,Fc(t)),this.elements=t_(e),this.split()}return Jg(r,[{key:"split",value:function(t){var n=this;this.revert(),this.elements.forEach(function(o){cr(o,"html",o.innerHTML)}),this.lines=[],this.words=[],this.chars=[];var i=[window.pageXOffset,window.pageYOffset];t!==void 0&&(this.settings=js(this.settings,Fc(t)));var s=pp(this.settings.types);s.none||(this.elements.forEach(function(o){cr(o,"isRoot",!0);var a=Hv(o,n.settings),l=a.words,c=a.chars;n.words=[].concat(Jn(n.words),Jn(l)),n.chars=[].concat(Jn(n.chars),Jn(c))}),this.elements.forEach(function(o){if(s.lines||n.settings.absolute){var a=ER(o,n.settings,i);n.lines=[].concat(Jn(n.lines),Jn(a))}}),this.isSplit=!0,window.scrollTo(i[0],i[1]),aR())}},{key:"revert",value:function(){this.isSplit&&(this.lines=null,this.words=null,this.chars=null,this.isSplit=!1),r.revert(this.elements)}}]),r}();const Mt={heroYearObj:{year:2026},heroNumberTween:null,heroHeadingFadeScrollTrigger:null};function TR(){Mt.heroYearObj.year=2026,Mt.heroNumberTween&&(Mt.heroNumberTween.kill(),Mt.heroNumberTween=null),Mt.heroHeadingFadeScrollTrigger&&(Mt.heroHeadingFadeScrollTrigger.kill(),Mt.heroHeadingFadeScrollTrigger=null)}function AR(r){if(window.scrollDownIcon&&document.contains(window.scrollDownIcon))return;const e=document.createElement("div");e.className="scroll-down-icon",e.innerHTML=`
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
    `);const n=r.parentElement;n?n.appendChild(e):document.body.appendChild(e),Ie.to(e,{opacity:1,duration:.8,ease:"power2.out",delay:.3});const i=e.querySelector(".scroll-indicator");Ie.to(i,{y:3,duration:1.2,ease:"power2.inOut",repeat:-1,yoyo:!0});const s=e.querySelector(".scroll-arrow");Ie.to(s,{opacity:.6,duration:1.5,ease:"power2.inOut",repeat:-1,yoyo:!0}),Ve.create({trigger:"#cover-travel-area",start:"top top",end:"bottom 70%",scrub:.5,markers:!1,onUpdate:o=>{const a=1-o.progress;Ie.set(e,{opacity:a,overwrite:!0})},onLeave:()=>{Ie.set(e,{opacity:0})},onEnterBack:()=>{Ie.set(e,{opacity:0})}}),window.scrollDownIcon=e,window.scrollDownIconCleanup=()=>{Ve.getAll().forEach(o=>{var a;(o.trigger===e||((a=o.vars)==null?void 0:a.trigger)==="#cover-travel-area")&&(o.trigger===e||o.animation&&o.animation.targets().includes(e))&&o.kill()}),e&&e.parentNode&&e.remove(),window.scrollDownIcon=null,window.scrollDownIconCleanup=null}}const CR="/150-lab/assets/audio/ui-click.mp3",RR="/150-lab/assets/audio/chemistry-3-final.mp3";let Pt=null,bn=!1,an=!1,_p=!1,bl=!1,wi=!1,Rr=0;const or=25;let Ri=null,sa=!1,us=null;function vp(){us||(us=new Audio(CR),us.volume=.35,us.preload="auto")}const Hs=()=>{if(!an)try{us||vp();const r=us.cloneNode();r.volume=.35,r.play().catch(e=>{console.warn("UI click sound play was prevented:",e)})}catch(r){console.error("Error playing UI click sound:",r)}};function n_(r){an&&(r.volume=0,r.muted=!0),r.addEventListener("play",()=>{const e=document.querySelector(".sound-toggle");e&&e.classList.contains("muted")&&(r.volume=0,r.muted=!0)})}function PR(){new MutationObserver(e=>{e.forEach(t=>{t.type==="childList"&&t.addedNodes.forEach(n=>{n.nodeName==="AUDIO"||n.nodeName==="VIDEO"?n_(n):n.querySelectorAll&&n.querySelectorAll("audio, video").forEach(s=>{n_(s)})})})}).observe(document.body,{childList:!0,subtree:!0})}function zl(r=!1){if(!(bn||an)){if(Rr++,window.audioRetryCount=Rr,window.maxAudioRetries=or,Rr>=or){console.warn(`Exceeded maximum audio retry attempts (${or}). Stopping retries.`);return}try{if(Pt.volume=.22,r)try{const e=new(window.AudioContext||window.webkitAudioContext),t=e.createBufferSource();t.connect(e.destination),t.start(0)}catch(e){console.warn("Could not create audio context:",e)}Pt.play().then(()=>{bn=!0,window.audioInitialized=!0;const e=document.querySelector(".sound-toggle");e&&e.classList.add("active"),Rr=0,window.audioRetryCount=0}).catch(e=>{console.error("Audio play was prevented:",e),bn=!1,(r||wi)&&Rr<or&&setTimeout(()=>{!bn&&!an&&zl(!0)},500)})}catch(e){console.error("Error playing audio:",e),bn=!1,(r||wi)&&Rr<or&&setTimeout(()=>{!bn&&!an&&zl(!0)},500)}}}const LR=()=>{document.hidden?Pt&&!Pt.paused&&bn&&(sa=!0,Pt.pause()):Pt&&sa&&bn&&!an&&(sa=!1,Pt.play().catch(r=>{console.warn("Could not resume background audio:",r),bn=!1,wi&&setTimeout(()=>{io(!0)},100)}))};function DR(){document.addEventListener("visibilitychange",LR),window.addEventListener("blur",()=>{Pt&&!Pt.paused&&bn&&(sa=!0,Pt.pause())}),window.addEventListener("focus",()=>{Pt&&sa&&bn&&!an&&(sa=!1,Pt.play().catch(r=>{console.warn("Could not resume background audio on focus:",r),bn=!1,wi&&setTimeout(()=>{io(!0)},100)}))})}const io=(r=!1)=>{if(!an){if(r&&(wi=!0,window.enterButtonClicked=!0),!wi){console.log("Audio play blocked: Enter button not clicked yet");return}if(console.log("Audio play attempt:",{enterButtonClicked:wi,heroAnimationComplete:_p,audioInitialized:bn,audioMuted:an,backgroundAudioLoaded:bl,readyState:Pt==null?void 0:Pt.readyState}),!bn){if(Rr>=or){console.warn(`Exceeded maximum audio retry attempts (${or}). Stopping retries.`),Ri&&(clearInterval(Ri),Ri=null);return}if(r){console.log("Adding 2-second delay before starting background audio"),setTimeout(()=>{if(!an)if(bl||Pt&&Pt.readyState>=3)zl(!0);else{console.log("Audio not ready yet after delay, readyState:",Pt==null?void 0:Pt.readyState);try{Pt.load()}catch(e){console.warn("Error reloading background audio:",e)}}},2e3);return}if(bl||Pt&&Pt.readyState>=3)zl(r);else if(console.log("Audio not ready yet, readyState:",Pt==null?void 0:Pt.readyState),r)try{Pt.load()}catch(e){console.warn("Error reloading background audio:",e)}}}};function IR(){const r=new Audio;r.addEventListener("canplaythrough",()=>{bl=!0,console.log("Background audio loaded and ready to play"),wi&&!bn&&!an&&(console.log("Enter button was clicked, attempting to play audio now"),zl(!0))}),r.addEventListener("error",e=>{console.error("Audio loading error:",e),console.error("Audio src:",r.src),(window.location.hostname==="localhost"||window.location.hostname.includes("127.0.0.1"))&&console.warn("Audio failed to load in dev mode. Ensure audio files are in 150-lab/public/audio/ directory.")}),r.loop=!0,r.volume=0,r.preload="auto",r.src=RR;try{r.load()}catch(e){console.error("Error loading background audio:",e)}Pt=r,window.backgroundAudioInstance=r,window.backgroundAudio=r,bn=!1,an=!1,_p=!1,bl=!1,wi=!1,Rr=0,window.audioInitialized=!1,window.audioMuted=!1,window.userInteracted=!1,window.heroAnimationComplete=!1,window.enterButtonClicked=!1,window.audioRetryCount=0,window.maxAudioRetries=or,window.audioRetryTimer=null,DR()}const OR=()=>{vp(),document.querySelectorAll('a, button, input[type="button"], input[type="submit"], input[type="reset"], input[type="checkbox"], input[type="radio"]').forEach(t=>{t.addEventListener("click",n=>{if(t.classList.contains("enter-experience")){t.dataset.clickSoundPlayed||(an||Hs(),t.dataset.clickSoundPlayed="true");return}an||Hs()})}),new MutationObserver(t=>{t.forEach(n=>{n.type==="childList"&&n.addedNodes.forEach(i=>{i.nodeType===1&&(i.matches('a, button, input[type="button"], input[type="submit"], input[type="reset"], input[type="checkbox"], input[type="radio"]')&&i.addEventListener("click",o=>{if(i.classList.contains("enter-experience")){i.dataset.clickSoundPlayed||(an||Hs(),i.dataset.clickSoundPlayed="true");return}an||Hs()}),i.querySelectorAll('a, button, input[type="button"], input[type="submit"], input[type="reset"], input[type="checkbox"], input[type="radio"]').forEach(o=>{o.addEventListener("click",a=>{if(o.classList.contains("enter-experience")){o.dataset.clickSoundPlayed||(an||Hs(),o.dataset.clickSoundPlayed="true");return}an||Hs()})}))})})}).observe(document.body,{childList:!0,subtree:!0}),PR()};function NR(){const r=document.querySelector(".sound-toggle");if(r){const e=document.getElementById("waveGroup");e&&(window.waveAnimation=Ie.to(e,{x:"-=100",ease:"linear",duration:2,repeat:-1})),r.addEventListener("click",()=>{const t=an;if(r.classList.toggle("muted"),an=r.classList.contains("muted"),window.audioMuted=an,t)try{us||vp();const i=us.cloneNode();i.volume=.38,i.play().catch(s=>{console.warn("UI click sound play was prevented:",s)})}catch(i){console.error("Error playing UI click sound:",i)}else Hs();const n=window.waveAnimation;if(an)n&&n.pause(),Pt&&(Pt.volume=0,Ri&&(clearInterval(Ri),Ri=null));else{n&&n.resume();const i=document.getElementById("anniversary-video");i&&!i.paused&&!i.ended||(!bn&&wi&&Pt?(io(!0),Ri||(Ri=setInterval(()=>{bn?(clearInterval(Ri),Ri=null):!an&&wi&&(Rr<or?io(!0):(console.warn(`Exceeded maximum audio retry attempts (${or}). Stopping retries.`),clearInterval(Ri),Ri=null))},500))):bn&&Pt&&(Pt.volume=.22,Pt.paused&&Pt.play().catch(o=>{console.warn("Audio play was prevented:",o),bn=!1,wi&&io(!0)})))}})}}function UR(r){_p=r,window.heroAnimationComplete=r}function FR(r){wi=r,window.enterButtonClicked=r}function mh(){Mt.heroHeadingFadeScrollTrigger&&(Mt.heroHeadingFadeScrollTrigger.kill(),Mt.heroHeadingFadeScrollTrigger=null);const r=document.querySelector("#hero-area h1");if(r){let e=r.querySelectorAll(".char");if(!e||e.length===0){const i=r.getAttribute("data-original-content")||r.textContent;r.innerHTML=i;try{e=new Aa(r,{types:"words,chars",absolute:!1}).chars,Ie.set(e,{opacity:1,z:0,scale:1,filter:"blur(0px)",transformPerspective:1e3,transformOrigin:"center center"})}catch(s){console.error("Error re-splitting hero heading:",s);return}}if(!e||e.length===0){console.warn("Still no hero heading characters found after attempting re-split. Aborting animation setup.");return}r.offsetHeight;const t=[...e];for(let i=t.length-1;i>0;i--){const s=Math.floor(Math.random()*(i+1));[t[i],t[s]]=[t[s],t[i]]}const n=Ie.timeline({paused:!0});n.to(t,{opacity:0,z:-50,filter:"blur(16px)",stagger:.02,ease:"power1.in"},0),Mt.heroHeadingFadeScrollTrigger=Ve.create({animation:n,trigger:"#hero-travel-area",start:"16% top",end:"36% top",scrub:!0,markers:!1,invalidateOnRefresh:!0,onUpdate:i=>{i.progress===0?Ie.set(t,{opacity:1,z:0,scale:1,filter:"blur(0px)",clearProps:"transform"}):i.progress===1&&Ie.set(t,{opacity:0,z:-50,filter:"blur(16px)"})},onRefresh:i=>{n&&n.progress(i.progress)},onLeave:()=>{Ie.set(t,{opacity:0,z:-50,filter:"blur(16px)"})},onEnterBack:()=>{const i=Mt.heroHeadingFadeScrollTrigger?Mt.heroHeadingFadeScrollTrigger.progress:0;n&&n.progress(i)},onLeaveBack:()=>{Ie.set(t,{opacity:1,z:0,scale:1,filter:"blur(0px)",clearProps:"transform"}),n&&n.progress(0)}})}else console.warn("#hero-area h1 not found for fade animation setup.")}function kR(){const r=document.querySelector("#cover-area .cover-logo"),e=document.querySelector("#cover-area button.enter-experience"),t=document.querySelector("header"),n=document.querySelector("nav"),i=document.querySelector(".section-timeline");if(!r||!e)return;t&&Ie.set(t,{opacity:0}),i&&Ie.set(i,{opacity:0});const s=document.querySelector(".share-button-pinned");s&&Ie.set(s,{opacity:0}),window.lenis&&window.lenis.stop(),Ie.set(n,{opacity:1}),Ie.set(r,{position:"fixed",top:"50%",left:"50%",transform:"translate(-50%, -50%)",zIndex:1e3});const o=Ie.timeline({delay:.6});o.fromTo(r,{opacity:0,scale:.95},{opacity:1,scale:1,duration:1.8,ease:"power1.out"}),o.to(e,{opacity:1,duration:.6,ease:"power2.out"},"-=0.3"),e&&e.addEventListener("click",()=>{e.style.pointerEvents="none",t&&Ie.to(t,{opacity:1,duration:.8,ease:"power2.inOut"}),i&&Ie.to(i,{opacity:1,duration:.8,ease:"power2.inOut",delay:.2}),window.userInteracted=!0,FR(!0),window.enterButtonClicked=!0,window.enableMouseParticles&&window.enableMouseParticles(),document.dispatchEvent(new CustomEvent("veryEarlyParticleFade")),io(!0),window.audioRetryTimer||(window.audioRetryTimer=setInterval(()=>{window.audioInitialized?(clearInterval(window.audioRetryTimer),window.audioRetryTimer=null):window.enterButtonClicked&&!window.audioMuted&&(window.audioRetryCount<window.maxAudioRetries?(console.log("Retrying audio playback..."),io(!0)):(console.warn(`Exceeded maximum audio retry attempts (${window.maxAudioRetries}). Stopping retries.`),clearInterval(window.audioRetryTimer),window.audioRetryTimer=null))},500)),window.lenis&&window.lenis.start(),Ie.to(e,{opacity:0,duration:.5,ease:"power2.in",onComplete:()=>{AR(e)}}),s&&Ie.to(s,{opacity:1,duration:.8,delay:.4,ease:"power2.out"});const a=document.querySelector(".sound-toggle");a&&a.classList.add("active"),BR(r)})}function BR(r){let e=null,t=-1;function n(){return e&&e.kill(),e=Ve.create({trigger:"#cover-travel-area",start:"top top",end:"67% center",scrub:.5,markers:!1,id:"cover-logo-fade",invalidateOnRefresh:!0,fastScrollEnd:!0,onUpdate:i=>{const s=1-i.progress;Math.abs(s-t)>.01&&(t=s,r.style.opacity=s)},onLeave:()=>{r.style.opacity="0",t=0},onEnterBack:()=>{const s=1-e.progress;r.style.opacity=s,t=s},onLeaveBack:()=>{r.style.opacity="1",t=1}}),e}return n()}function zR(){const r=document.querySelector("#hero-area h1"),e=document.querySelector("#hero-number");if(!r||!e)return;r.getAttribute("data-original-content")||r.setAttribute("data-original-content",r.textContent),Ve.getAll().forEach(a=>{(a.vars.trigger==="#hero-area"||a.vars.trigger==="#hero-travel-area")&&a.kill()});const t=e.innerText||"2026";e.getAttribute("data-original-content")||e.setAttribute("data-original-content",t),e.innerHTML="",e.style.setProperty("--digit-opacity","0"),t.split("").forEach(a=>{const l=document.createElement("span");l.className="digit",l.textContent=a,l.setAttribute("data-digit",a),e.appendChild(l)}),Ie.set(e,{opacity:0}),Ie.set(r,{opacity:0});const n=new Aa(r,{types:"words,chars",absolute:!1});Ie.set(n.chars,{opacity:0,z:150,scale:1.2,transformPerspective:1e3,transformOrigin:"center center",filter:"blur(16px)"});const i=[...n.chars];for(let a=i.length-1;a>0;a--){const l=Math.floor(Math.random()*(a+1));[i[a],i[l]]=[i[l],i[a]]}const s=Ie.timeline({paused:!0,onComplete:()=>{UR(!0),window.heroAnimationComplete=!0;const a=new CustomEvent("heroAnimationComplete");document.dispatchEvent(a)}});s.to(r,{opacity:1,duration:.8,ease:"power2.out"}),s.to(i,{opacity:1,z:0,scale:1,filter:"blur(0px)",duration:1.25,stagger:.03,ease:"power2.out",onComplete:()=>{const a=new CustomEvent("particleFadeStart");document.dispatchEvent(a)}}),s.to(e,{opacity:1,duration:1.5,scrub:1.5,ease:"power1.inOut"});const o=e.querySelectorAll(".digit");Ie.set(o,{y:10,z:-120,transformPerspective:1e3,transformOrigin:"center center"}),s.to(o,{y:0,z:0,duration:2.5,stagger:.1,ease:"power3.out"},"-=0.6"),s.to(e,{"--digit-opacity":.44,duration:2.5,ease:"power3.out"},"-=2.5"),Ve.create({trigger:"#hero-travel-area",start:"top 90%",end:"top 0%",animation:s,scrub:.5,markers:!1,invalidateOnRefresh:!0,fastScrollEnd:!0,onEnter:()=>{const a=new CustomEvent("veryEarlyParticleFade");document.dispatchEvent(a)},onUpdate:a=>{s&&s.progress(a.progress)}}),e&&(Ve.create({trigger:"#hero-travel-area",start:"15% top",end:"bottom bottom",scrub:.3,markers:!1,invalidateOnRefresh:!0,fastScrollEnd:!0,onUpdate:a=>{const l=1-a.progress*.5;e.style.transform=`scale(${l})`},onLeave:()=>{e.style.transform="scale(0.5)"},onEnterBack:()=>{const l=1-(Ve.getById("hero-scale")?Ve.getById("hero-scale").progress:0)*.5;e.style.transform=`scale(${l})`},onLeaveBack:()=>{e.style.transform="scale(1)"},id:"hero-scale"}),Ve.create({trigger:"#video-travel-area",start:"top 105%",end:"top 95%",scrub:.3,markers:!1,invalidateOnRefresh:!0,fastScrollEnd:!0,onUpdate:function(a){const l=a.progress;let c=1;Mt.heroNumberTween&&Mt.heroNumberTween.scrollTrigger&&(c=.44+Mt.heroNumberTween.scrollTrigger.progress*.56);const u=c*(1-l),d=l*16;e.style.setProperty("--digit-opacity",u),e.style.filter=`blur(${d}px)`},onLeave:()=>{e.style.setProperty("--digit-opacity","0"),e.style.filter="blur(16px)"},onEnterBack:()=>{const a=Ve.getById("hero-fade-out");if(a){const l=a.progress;let c=1;Mt.heroNumberTween&&Mt.heroNumberTween.scrollTrigger&&(c=.44+Mt.heroNumberTween.scrollTrigger.progress*.56);const u=c*(1-l),d=l*16;e.style.setProperty("--digit-opacity",u),e.style.filter=`blur(${d}px)`}},id:"hero-fade-out"}),Ve.create({trigger:"#video-travel-area",start:"top 80%",end:"top 50%",scrub:.5,markers:!1,invalidateOnRefresh:!0,fastScrollEnd:!0,onUpdate:function(a){e.style.setProperty("--digit-opacity","0"),e.style.filter="blur(16px)",e.style.opacity="0"},onLeave:()=>{e.style.setProperty("--digit-opacity","0"),e.style.filter="blur(16px)",e.style.opacity="0"},onEnterBack:()=>{},onLeaveBack:()=>{e.style.opacity="1"},id:"hero-backup-fade-out"}))}function HR(){const r=document.querySelector("#hero-number");r?Mt.heroNumberTween?(Mt.heroNumberTween.scrollTrigger&&(Mt.heroNumberTween.scrollTrigger.enable(),console.log("Hero countdown: Re-enabled existing ScrollTrigger")),Mt.heroNumberTween.resume(),console.log("Hero countdown: Resumed existing tween")):(Mt.heroNumberTween=Ie.to(Mt.heroYearObj,{year:1876,ease:"none",paused:!0,scrollTrigger:{trigger:"#hero-travel-area",start:"15% top",end:"75% bottom",scrub:.5,markers:!1,invalidateOnRefresh:!0,fastScrollEnd:!0,id:"hero-countdown",onUpdate:function(e){const t=Math.round(2026-e.progress*150);Mt.heroYearObj.year=t;const n=.44+e.progress*.56,i=t.toString(),s=r.querySelectorAll(".digit"),o=i.split("");let a=!1;if(s.length!==o.length)a=!0;else for(let l=0;l<s.length;l++)if(s[l].textContent!==o[l]){a=!0;break}a&&(s.length!==o.length?(r.innerHTML="",o.forEach(l=>{const c=document.createElement("span");c.className="digit",c.textContent=l,c.setAttribute("data-digit",l),r.appendChild(c)})):s.forEach((l,c)=>{l.textContent!==o[c]&&(l.textContent=o[c],l.setAttribute("data-digit",o[c]))})),r.style.setProperty("--digit-opacity",n),r.style.filter="blur(0px)"},onLeave:function(e){requestAnimationFrame(()=>{r.style.setProperty("--digit-opacity","1.0"),r.style.filter="blur(0px)"})},onComplete:function(){Mt.heroYearObj.year=1876;const e=document.querySelector("#hero-number");if(e){const t=e.querySelectorAll(".digit"),n="1876".split("");t.forEach((i,s)=>{i.textContent!==n[s]&&(i.textContent=n[s],i.setAttribute("data-digit",n[s]))}),console.log("Hero countdown: Complete at 1876, opacity 1.0"),requestAnimationFrame(()=>{e.style.setProperty("--digit-opacity","1.0"),e.style.filter="blur(0px)"})}},onLeaveBack:function(e){Mt.heroYearObj.year=2026;const t=document.querySelector("#hero-number");if(t){const n=t.querySelectorAll(".digit"),i="2026".split("");n.forEach((s,o)=>{s.textContent!==i[o]&&(s.textContent=i[o],s.setAttribute("data-digit",i[o]))}),console.log("Hero countdown: Reset to 2026, opacity 0.44"),requestAnimationFrame(()=>{t.style.setProperty("--digit-opacity","0.44"),t.style.filter="blur(0px)"})}},onRefresh:e=>{const t=.44+e.progress*.56;requestAnimationFrame(()=>{r.style.setProperty("--digit-opacity",t),r.style.filter="blur(0px)"})}}}),Mt.heroNumberTween.scrollTrigger?(console.log("Hero countdown: ScrollTrigger created successfully",{start:Mt.heroNumberTween.scrollTrigger.start,end:Mt.heroNumberTween.scrollTrigger.end,trigger:Mt.heroNumberTween.scrollTrigger.trigger}),Ve.refresh()):console.error("Hero countdown: ScrollTrigger creation failed!")):console.warn("#hero-number element not found for countdown animation.")}function VR(){document.querySelectorAll(".pin-top-top").forEach(function(r){let e=r.parentElement;r.id==="cover-area"?Ve.create({trigger:"#cover-travel-area",start:"top top",end:"bottom top",pin:r,pinSpacing:!1,anticipatePin:1,onLeaveBack:t=>{t.pin.style.transform="translate3d(0px, 0px, 0px)"}}):r.id==="hero-area"?Ve.create({trigger:r,endTrigger:"#hero-travel-area",start:"top top",end:"bottom 80%",pin:r,pinSpacing:!1,anticipatePin:1,onLeaveBack:t=>{t.pin.style.transform="translate3d(0px, 0px, 0px)"}}):Ve.create({trigger:e,start:"top top",end:"bottom bottom",pin:r,pinSpacing:!1})})}function GR(){const r=document.querySelector("#video .video-wrapper"),e=document.querySelector("#video"),t=document.querySelector("#video-travel-area");r&&e&&t&&(Ie.set(r,{scale:.4,opacity:0,transformOrigin:"center center"}),Ie.set(e,{pointerEvents:"none"}),Ie.timeline({scrollTrigger:{trigger:"#video-travel-area",start:"top bottom",end:"top 20%",scrub:!0,markers:!1,onUpdate:i=>{i.progress>.8?r.classList.add("scale-active"):r.classList.remove("scale-active")}}}).to(r,{scale:1,opacity:1,ease:"power2.out"}),Ve.create({trigger:"#video-travel-area",start:"top 67%",end:"bottom top",markers:!1,onEnter:()=>{Ie.set(e,{pointerEvents:"auto"})},onLeaveBack:()=>{Ie.set(e,{pointerEvents:"none"})}}),Ve.create({trigger:"#video",start:"top top",endTrigger:"#video-travel-area",end:"bottom bottom",pin:!0,pinSpacing:!1,anticipatePin:1,markers:!1,id:"video-pin"}))}function Ou(r,e){let t;return function(...i){const s=()=>{clearTimeout(t),r(...i)};clearTimeout(t),t=setTimeout(s,e)}}function WR(){const r=document.querySelector("#get-involved-text p");r&&(Ie.set(r,{opacity:1,visibility:"visible",autoAlpha:1}),setTimeout(()=>{document.body.offsetHeight,r.offsetHeight,r.style.width=r.offsetWidth+"px";const e=new Aa(r,{types:"lines",lineClass:"line",absolute:!1});e.lines&&e.lines.length>0?(Ie.set(e.lines,{opacity:0,y:40,transformOrigin:"center center"}),Ie.timeline({scrollTrigger:{trigger:"#get-involved",start:"top 65%",end:"top 20%",scrub:!1,markers:!1,toggleActions:"play none none reverse"}}).to(e.lines,{opacity:1,y:0,duration:1.2,stagger:.25,ease:"power1.out"})):console.warn("SplitType failed to detect lines properly")},100))}function XR(){const r=document.querySelector(".get-involved-150-logo");if(!r){console.warn("No .get-involved-150-logo element found");return}Ie.set(r,{opacity:0,y:50}),Ve.create({trigger:r,start:"top 85%",once:!1,markers:!1,id:"get-involved-logo-fade",onEnter:()=>{Ie.to(r,{opacity:1,y:0,duration:1.2,ease:"power2.out",overwrite:!0})},onLeaveBack:()=>{Ie.to(r,{opacity:0,y:50,duration:.8,ease:"power2.in",overwrite:!0})}})}function qR(){const r=document.querySelector(".sliding-card-row-wrapper"),e=document.querySelector("#get-involved-cards"),t=document.querySelector("#hero-travel-area");let n,i;if(r&&e){const s=()=>{const l=window.innerWidth>1280;n&&!l&&(n.kill(),n=null,Ie.set(r,{x:0})),l&&!n&&(n=Ie.fromTo(r,{x:"44vw"},{x:"-20vw",ease:"power1.inOut",scrollTrigger:{trigger:"#get-involved-cards",start:"top 80%",end:"bottom 20%",scrub:1.5,invalidateOnRefresh:!0,markers:!1,id:"sliding-cards-animation"}}).scrollTrigger)},o=()=>{i&&(i.kill(),i=null),t&&(i=Ve.create({trigger:"#get-involved-cards",start:"top 80%",end:"top 20%",scrub:!0,markers:!1,id:"hero-fade-animation",onUpdate:l=>{const c=1-l.progress;Ie.set(t,{opacity:c})},onLeaveBack:()=>{Ie.set(t,{opacity:1})}}))};s(),o();const a=Ou(()=>{s(),o()},250);window.addEventListener("resize",a)}else console.warn("Could not find sliding card wrapper or get-involved-cards section")}function YR(){const r=document.querySelector(".form-panel .animation-column"),e=r==null?void 0:r.querySelector("img");if(!r||!e){console.warn("Form panel animation column or image not found");return}let t=r.querySelector(".marquee-container");if(!t){t=document.createElement("div"),t.className="marquee-container";const u=e.cloneNode(!0);u.className+=" cloned-image",e.remove(),t.appendChild(e),t.appendChild(u),r.appendChild(t)}const n=[e,t.querySelector(".cloned-image")];let i=null;const s=()=>{i&&(i.kill(),i=null),r.offsetHeight,e.offsetHeight,setTimeout(()=>{const d=e.getBoundingClientRect().height;if(d<=0){if(window.innerWidth<580){console.log("Viewport width < 580px, skipping marquee setup (element is hidden)");return}console.warn("Image height is 0, retrying marquee setup..."),setTimeout(s,200);return}Ie.set(n,{y:0,top:"auto",opacity:1}),Ie.set(e,{position:"absolute",top:0,left:0}),Ie.set(n[1],{position:"absolute",top:d+"px",left:0});const f=Ie.timeline({repeat:-1,ease:"none"}),h=Math.max(d/30,2);f.to(n,{y:-d,duration:h,ease:"none"}),f.set(n,{y:0}),i=f},100)},o=Ou(()=>{document.body.offsetHeight,s()},250);(()=>{e.complete&&e.naturalHeight!==0?s():(e.addEventListener("load",s),setTimeout(s,1e3))})(),window.addEventListener("resize",o),window.addEventListener("orientationchange",()=>{setTimeout(o,300)}),window.cleanupInfiniteMarquee=()=>{i&&(i.kill(),i=null),window.removeEventListener("resize",o)};let l=!1;const c=()=>{if(!l){l=!0;const u=e.getBoundingClientRect().height,d=parseFloat(n[1].style.top||"0");Math.abs(u-d)>5&&s(),window.removeEventListener("scroll",c)}};window.addEventListener("scroll",c),document.fonts&&document.fonts.ready&&document.fonts.ready.then(()=>{setTimeout(s,100)})}function jR(){const r=document.querySelectorAll(".scroll-reveal");if(!r.length){console.warn("No .scroll-reveal elements found");return}r.forEach((e,t)=>{e.classList.contains("fancy-btn")?(Ie.set(e,{y:50,filter:"opacity(0)"}),Ve.create({trigger:e,start:"top 85%",once:!1,markers:!1,id:`scroll-reveal-button-${t}`,onEnter:()=>{Ie.to(e,{y:0,filter:"opacity(1)",duration:1.2,ease:"power2.out",overwrite:!0})},onLeaveBack:()=>{Ie.to(e,{y:50,filter:"opacity(0)",duration:.8,ease:"power2.in",overwrite:!0})}})):(Ie.set(e,{opacity:0,y:50}),Ve.create({trigger:e,start:"top 85%",once:!1,markers:!1,id:`scroll-reveal-${t}`,onEnter:()=>{Ie.to(e,{opacity:1,y:0,duration:1.2,ease:"power2.out",overwrite:!0})},onLeaveBack:()=>{Ie.to(e,{opacity:0,y:50,duration:.8,ease:"power2.in",overwrite:!0})}}))})}let i_=!1;function r_(r){let e=!1;r.addEventListener("mouseenter",()=>{e=!0,r.classList.add("fancy-btn-active"),r.style.transform="translateY(-2px) scale(1.02)"}),r.addEventListener("mouseleave",()=>{e=!1,r.classList.remove("fancy-btn-active"),r.style.transform=""}),r.addEventListener("mousedown",()=>{r.style.transform="translateY(1px) scale(0.98)"}),r.addEventListener("mouseup",()=>{e&&(r.style.transform="translateY(-2px) scale(1.02)")})}function $R(){const r=document.querySelectorAll(".fancy-btn"),e=()=>{r.forEach(t=>{t.dataset.fancyInitialized!=="true"&&(r_(t),t.dataset.fancyInitialized="true")})};i_||(document.addEventListener("heroAnimationComplete",e),i_=!0),r.forEach(t=>{t.classList.contains("enter-experience")||(r_(t),t.dataset.fancyInitialized="true")}),window.heroAnimationComplete&&e()}function KR(){const r=document.querySelector("#hero-travel-area"),e=document.querySelector("#get-involved"),t=document.querySelector("#events");document.querySelector("#video-travel-area");const n=document.querySelector(".page-nav"),i=document.querySelector(".section-timeline .indicator .active-title"),s=document.querySelector(".section-timeline"),o=document.querySelector(".form-panel");if(!r||!e||!n||!i||!s)return;Ie.set(n,{opacity:0});let a=!1;const l=M=>{if(!o)return!1;const E=o.getBoundingClientRect(),P=M.clientX,y=M.clientY;return P>=E.left&&P<=E.right&&y>=E.top&&y<=E.bottom};s.addEventListener("mouseenter",M=>{!a&&!l(M)&&Ie.to(n,{opacity:1,duration:.3,ease:"power2.out"})}),s.addEventListener("mouseleave",()=>{Ie.to(n,{opacity:0,duration:.3,ease:"power2.out"}),a=!1}),n.addEventListener("mouseenter",M=>{l(M)||Ie.to(i,{opacity:0,duration:.2,ease:"power2.out"})}),n.addEventListener("mouseleave",()=>{Ie.to(i,{opacity:1,duration:.2,ease:"power2.out"})});const c=n.querySelector(".anniversary"),u=n.querySelector(".get-involved"),d=n.querySelector(".events"),f=M=>{if(i.textContent===M)return;const E=Ie.timeline();E.to(i,{opacity:0,duration:.18,onComplete:()=>{i.textContent=M}}),E.to(i,{opacity:1,duration:.24})},h=M=>{if(!M)return 0;M.offsetHeight;let E=0,P=M;for(;P;)E+=P.offsetTop,P=P.offsetParent;return E};c.addEventListener("click",M=>{M.preventDefault(),n.querySelectorAll("a").forEach(E=>E.classList.remove("active")),c.classList.add("active"),f("150 Years of ACS"),Ie.to(n,{opacity:0,duration:.2,ease:"power2.out"}),a=!0,window.scrollTo({top:0,behavior:"smooth"})}),u.addEventListener("click",M=>{M.preventDefault(),n.querySelectorAll("a").forEach(E=>E.classList.remove("active")),u.classList.add("active"),f("Get Involved"),Ie.to(n,{opacity:0,duration:.2,ease:"power2.out"}),a=!0,e&&setTimeout(()=>{const E=h(e);window.scrollTo({top:E,behavior:"smooth"})},50)}),d.addEventListener("click",M=>{M.preventDefault(),n.querySelectorAll("a").forEach(E=>E.classList.remove("active")),d.classList.add("active"),f("Events"),Ie.to(n,{opacity:0,duration:.2,ease:"power2.out"}),a=!0,t&&setTimeout(()=>{const E=h(t);window.scrollTo({top:E,behavior:"smooth"})},50)});const _=[{id:"hero",element:r,title:"150 Years of ACS",link:c,top:0,bottom:0},{id:"getinvolved",element:e,title:"Get Involved",link:u,top:0,bottom:0},{id:"events",element:t,title:"Events",link:d,top:0,bottom:0}];function g(){if(_.forEach(M=>{M.element&&(M.top=h(M.element),M.bottom=M.top+M.element.offsetHeight)}),_[0].element&&e&&(_[0].bottom=h(e)),e&&t){const M=_.find(E=>E.id==="getinvolved");M&&(M.top=h(e),M.bottom=h(t))}}g();let m=null;function p(){requestAnimationFrame(()=>{const M=window.pageYOffset+window.innerHeight/2;let E=_[0];for(let P=_.length-1;P>=0;P--){const y=_[P];if(y.element&&M>=y.top&&M<y.bottom){E=y;break}}m!==E.id&&(m=E.id,n.querySelectorAll("a").forEach(P=>P.classList.remove("active")),E.link&&E.link.classList.add("active"),f(E.title))})}window.removeEventListener("scroll",p),window.addEventListener("scroll",p);const S=Ou(()=>{document.body.offsetHeight,g(),requestAnimationFrame(()=>{g(),p()})},150);window.addEventListener("resize",S),window.addEventListener("orientationchange",()=>{setTimeout(()=>{S()},300)});const x=()=>{g(),p()};x(),setTimeout(x,500),document.fonts&&document.fonts.ready&&document.fonts.ready.then(x);let v=!1;const T=()=>{v||(v=!0,g(),window.removeEventListener("scroll",T))};window.addEventListener("scroll",T)}function ZR(){const r=document.querySelector(".share-button-pinned"),e=document.querySelector(".events-panel");if(!r||!e){console.warn("Share button or events panel not found for overlap detection");return}const t=()=>{const s=r.getBoundingClientRect(),o=e.getBoundingClientRect();!(s.right<o.left||s.left>o.right||s.bottom<o.top||s.top>o.bottom)?r.style.backgroundColor="#14b500":r.style.backgroundColor=""};let n=!1;const i=()=>{n||(requestAnimationFrame(()=>{t(),n=!1}),n=!0)};window.addEventListener("scroll",i),window.addEventListener("resize",i),t(),window.cleanupShareButtonOverlap=()=>{window.removeEventListener("scroll",i),window.removeEventListener("resize",i),r&&(r.style.backgroundColor="")}}function JR(){const r=document.querySelector(".share-button-pinned");if(!r){console.warn("Share button not found for share panel initialization");return}const e=document.createElement("div");e.className="share-panel",e.innerHTML=`
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
  `,document.body.appendChild(e),QR(r,e)}function QR(r,e){let t=!1;const n=()=>({url:window.location.href,title:"American Chemical Society - 150 Years of Innovation",description:"Join us in celebrating 150 years of advancing chemistry and chemical sciences. #ACS150",hashtags:"ACS150,Chemistry,Science,Innovation"}),i=(c,u)=>{const d={facebook:`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(u.url)}`,linkedin:`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(u.url)}`,instagram:"https://www.instagram.com/"};d[c]&&window.open(d[c],"_blank","width=600,height=400")},s=async c=>{try{return await navigator.clipboard.writeText(c),!0}catch(u){return console.error("Failed to copy text: ",u),!1}},o=c=>{const u=document.createElement("div");u.textContent=c,u.style.cssText=`
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
    `,document.head.appendChild(c)}}const e2="/150-lab/assets/images/pacifichem-event1.jpg",t2="/150-lab/assets/images/green-chemistry-event2.jpg",n2="/150-lab/assets/images/acs-spring-meeting-event3.jpg";function i2(){const r=document.querySelectorAll(".event-list-item");if(!r.length){console.warn("No .event-list-item elements found");return}const e=[e2,t2,n2];r.forEach((t,n)=>{const i=e[n];if(!i){console.warn(`No image mapped for event item ${n}`);return}const s=document.createElement("img");s.className="pinned-hover-image",s.src=i,s.style.cssText=`
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
    `,document.body.appendChild(s);const o=()=>{const l=t.getBoundingClientRect(),c=-20;s.style.left=l.right-200-c+"px",s.style.top=l.top+l.height/2+"px"};t.addEventListener("mouseenter",()=>{o(),s.style.opacity="1",s.style.transform="translateY(-50%) scale(1)",t.classList.add("active")}),t.addEventListener("mouseleave",()=>{s.style.opacity="0",s.style.transform="translateY(-50%) scale(0.9)",t.classList.remove("active")});const a=()=>{s.style.opacity!=="0"&&o()};window.addEventListener("scroll",a),window.addEventListener("resize",a)})}const eu=[],tu=[],Gv=()=>new Promise(r=>{document.fonts&&document.fonts.ready?document.fonts.ready.then(()=>{r()}):setTimeout(r,100)}),Wv=r=>new Promise(e=>{const t=r.closest("section")||r.parentNode;if(!t){e();return}const n=t.querySelectorAll("img");if(n.length===0){e();return}const i=setTimeout(e,2e3);let s=0,o=!0;if(n.forEach(a=>{a.complete||(o=!1)}),o){clearTimeout(i),e();return}n.forEach(a=>{a.complete?(s++,s===n.length&&(clearTimeout(i),e())):(a.addEventListener("load",()=>{s++,s===n.length&&(clearTimeout(i),e())}),a.addEventListener("error",()=>{s++,s===n.length&&(clearTimeout(i),e())}))})}),Xv=(r,e)=>{const t=r.innerHTML;r.setAttribute("data-original-content",t),Promise.all([Gv(),Wv(r)]).then(()=>{r.offsetHeight;const n=(i=0)=>{const s=new Aa(r,{types:"lines",lineClass:"split-line",absolute:!1,tagName:"div"});s.lines&&s.lines.length>0?(eu.push({element:r,splitText:s,originalContent:t}),Ie.set(s.lines,{opacity:0,y:50}),Ve.create({trigger:r,start:"top 85%",once:!1,markers:!1,id:`split-lines-${e}`,onEnter:()=>{const a=e*200;Ie.to(s.lines,{opacity:1,y:0,duration:1.2,stagger:.1,ease:"power2.out",delay:a/1e3,overwrite:!0})},onLeaveBack:()=>{Ie.to(s.lines,{opacity:0,y:50,duration:.8,stagger:.05,ease:"power2.in",overwrite:!0})}})):i<3?(s&&typeof s.revert=="function"&&s.revert(),setTimeout(()=>{n(i+1)},300*(i+1))):(console.warn("SplitType failed to create lines properly after multiple attempts:",r),r.innerHTML=t)};n()})},qv=(r,e)=>{const t=r.innerHTML;r.setAttribute("data-original-content",t),Promise.all([Gv(),Wv(r)]).then(()=>{r.offsetHeight;const n=(i=0)=>{const s=new Aa(r,{types:"chars",charClass:"split-char",absolute:!1,tagName:"span"});s.chars&&s.chars.length>0?(tu.push({element:r,splitText:s,originalContent:t}),Ie.set(s.chars,{opacity:0,y:50,display:"inline-block"}),Ve.create({trigger:r,start:"top 85%",once:!1,markers:!1,id:`split-chars-${e}`,onEnter:()=>{Ie.to(s.chars,{opacity:1,y:0,duration:1.2,stagger:.02,ease:"power2.out",overwrite:!0})},onLeaveBack:()=>{Ie.to(s.chars,{opacity:0,y:50,duration:.8,stagger:.01,ease:"power2.in",overwrite:!0})}})):i<3?(s&&typeof s.revert=="function"&&s.revert(),setTimeout(()=>{n(i+1)},300*(i+1))):(console.warn("SplitType failed to create chars after multiple attempts:",r),r.innerHTML=t)};n()})};function gh(r=null){const e=r||document.querySelectorAll(".split-lines");if(!e||e.length===0){console.warn("No .split-lines elements found or provided for initialization");return}e.forEach((t,n)=>{Xv(t,n)})}function _h(r=null){const e=r||document.querySelectorAll(".split-chars");if(!e||e.length===0){console.warn("No .split-chars elements found or provided for initialization");return}e.forEach((t,n)=>{qv(t,n)})}function Yv(){eu.forEach(r=>{r.element&&r.originalContent&&(r.element.innerHTML=r.originalContent);const e=eu.indexOf(r);e>-1&&eu.splice(e,1)})}function r2(){Yv(),setTimeout(()=>{document.querySelectorAll(".split-lines").forEach((e,t)=>{Xv(e,t)})},100)}function jv(){tu.forEach(r=>{r.element&&r.originalContent&&(r.element.innerHTML=r.originalContent);const e=tu.indexOf(r);e>-1&&tu.splice(e,1)})}function s2(){jv(),setTimeout(()=>{document.querySelectorAll(".split-chars").forEach((e,t)=>{qv(e,t)})},100)}window.cleanupSplitLines=Yv;window.refreshSplitLines=r2;window.cleanupSplitChars=jv;window.refreshSplitChars=s2;function s_(){typeof window.cleanupSplitLines=="function"&&window.cleanupSplitLines(),typeof window.cleanupSplitChars=="function"&&window.cleanupSplitChars();const r=document.querySelector("#hero-area h1");if(r){let n=0;if(Mt.heroHeadingFadeScrollTrigger&&Mt.heroHeadingFadeScrollTrigger.animation){n=Mt.heroHeadingFadeScrollTrigger.progress;const i=r.querySelectorAll(".char");if(i.length>0){const s=Ie.timeline({paused:!0});s.to(i,{opacity:0,z:-50,stagger:.02,ease:"power1.in"},0),s.progress(n)}}if(Mt.heroHeadingFadeScrollTrigger&&(Mt.heroHeadingFadeScrollTrigger.kill(),Mt.heroHeadingFadeScrollTrigger=null),!r.querySelector(".char")){const i=r.getAttribute("data-original-content")||r.textContent;r.innerHTML=i}}const e=Array.from(document.querySelectorAll(".split-lines")).filter(n=>!n.closest("#hero-area")),t=Array.from(document.querySelectorAll(".split-chars")).filter(n=>!n.closest("#hero-area"));e.forEach(n=>{const i=n.getAttribute("data-original-content");i&&(n.innerHTML=i)}),t.forEach(n=>{const i=n.getAttribute("data-original-content");i&&(n.innerHTML=i)}),setTimeout(()=>{e.length&&typeof gh=="function"&&gh(e),t.length&&typeof _h=="function"&&_h(t),typeof mh=="function"&&mh(),Ve.refresh()},50)}function o2(){window.globalResizeHandler&&window.removeEventListener("resize",window.globalResizeHandler),window.globalResizeHandler=Ou(()=>{s_()},250),window.addEventListener("resize",window.globalResizeHandler),window.addEventListener("orientationchange",()=>{s_()})}Ie.registerPlugin(Ve);Ie.registerPlugin(Yo);Ie.registerPlugin(Aa);new Date("2026-04-06T00:00:00").getTime();function a2(){const r=window.location.href.toLowerCase(),e=window.location.pathname.toLowerCase();return r.includes("/editor.html/")||r.includes("globe.html")?(console.log("Not on main page"),!1):r.includes("index.html")||r.includes("acs.org/150")||r.includes("localhost:5173")||r.includes("192.168")||r.includes("cmswwwdev.acs.org/150")||r.includes("adobeaemcloud.com")&&e.includes("/150")||r.includes("awolfe-acs.github.io/150-lab")&&(e==="/150-lab/"||e==="/150-lab/index.html")||r.includes("github.io/150-lab")&&(e==="/150-lab/"||e==="/150-lab/index.html")}function l2(){IR(),Ve.refresh(),Ve.clearMatchMedia(),Ve.getAll().forEach(n=>n.kill()),TR(),zR(),HR(),VR(),mh(),GR(),WR(),qR(),XR(),YR(),jR(),KR(),$R(),OR(),NR(),ZR(),JR(),i2(),gh(null),_h(null),o2();const r=document.querySelector("button.toggle-menu");r&&r.addEventListener("click",()=>{const n=document.querySelector("nav"),i=document.querySelector("header");n&&n.classList.toggle("active"),i&&i.classList.toggle("nav-active")});let e=0;window.addEventListener("scroll",()=>{const n=window.scrollY,i=document.querySelector("header.anniversary");i&&(n>e?i.classList.remove("active"):i.classList.add("active")),e=n});const t=document.querySelector("button.close-toggle-menu");t&&t.addEventListener("click",()=>{const n=document.querySelector("nav"),i=document.querySelector("header");n&&n.classList.remove("active"),i&&i.classList.remove("nav-active")})}history.scrollRestoration&&(history.scrollRestoration="manual");window.scrollTo(0,0);window.addEventListener("beforeunload",()=>{window.scrollTo(0,0),sessionStorage.setItem("scrollToTop","true")});window.addEventListener("load",()=>{window.scrollTo({top:0,left:0,behavior:"instant"}),setTimeout(()=>{window.scrollTo(0,0)},10)});document.addEventListener("DOMContentLoaded",()=>{window.scrollTo(0,0);const r=/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)||window.innerWidth<=768||"ontouchstart"in window;window.lenis=new ay({autoRaf:!0,infinite:!1,syncTouch:!0,smoothWheel:!0,touchInertiaMultiplier:35,duration:1.2,easing:t=>Math.min(1,1.001-Math.pow(2,-10*t))}),console.log(r?"Mobile device detected - optimizing for touch":"Desktop device detected"),window.lenis.on("scroll",t=>{}),r&&(document.addEventListener("touchstart",function(t){},{passive:!0}),document.addEventListener("touchmove",function(t){Math.abs(t.touches[0].clientX-t.touches[0].clientY)>Math.abs(t.touches[0].clientY-t.touches[0].clientX)},{passive:!1}),window.addEventListener("resize",()=>{window.lenis&&window.lenis.resize()})),setTimeout(()=>{try{e0()}catch(t){console.error("Failed to initialize shader background:",t),console.warn("Continuing without shader background...")}},100),a2()?(kR(),l2(),w1()):console.log("Running in lightweight mode - animations and video disabled"),setTimeout(()=>{window.scrollTo(0,0),window.lenis.scrollTo(0,{immediate:!0})},100)});
