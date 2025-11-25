
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

var Tv=Object.defineProperty;var Ev=(r,e,t)=>e in r?Tv(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t;var nt=(r,e,t)=>Ev(r,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function t(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(i){if(i.ep)return;i.ep=!0;const s=t(i);fetch(i.href,s)}})();var Av="1.3.13";function Lg(r,e,t){return Math.max(r,Math.min(e,t))}function Cv(r,e,t){return(1-t)*r+t*e}function Rv(r,e,t,n){return Cv(r,e,1-Math.exp(-t*n))}function Pv(r,e){return(r%e+e)%e}var Lv=class{constructor(){nt(this,"isRunning",!1);nt(this,"value",0);nt(this,"from",0);nt(this,"to",0);nt(this,"currentTime",0);nt(this,"lerp");nt(this,"duration");nt(this,"easing");nt(this,"onUpdate")}advance(r){var t;if(!this.isRunning)return;let e=!1;if(this.duration&&this.easing){this.currentTime+=r;const n=Lg(0,this.currentTime/this.duration,1);e=n>=1;const i=e?1:this.easing(n);this.value=this.from+(this.to-this.from)*i}else this.lerp?(this.value=Rv(this.value,this.to,this.lerp*60,r),Math.round(this.value)===this.to&&(this.value=this.to,e=!0)):(this.value=this.to,e=!0);e&&this.stop(),(t=this.onUpdate)==null||t.call(this,this.value,e)}stop(){this.isRunning=!1}fromTo(r,e,{lerp:t,duration:n,easing:i,onStart:s,onUpdate:o}){this.from=this.value=r,this.to=e,this.lerp=t,this.duration=n,this.easing=i,this.currentTime=0,this.isRunning=!0,s==null||s(),this.onUpdate=o}};function Dv(r,e){let t;return function(...n){let i=this;clearTimeout(t),t=setTimeout(()=>{t=void 0,r.apply(i,n)},e)}}var Iv=class{constructor(r,e,{autoResize:t=!0,debounce:n=250}={}){nt(this,"width",0);nt(this,"height",0);nt(this,"scrollHeight",0);nt(this,"scrollWidth",0);nt(this,"debouncedResize");nt(this,"wrapperResizeObserver");nt(this,"contentResizeObserver");nt(this,"resize",()=>{this.onWrapperResize(),this.onContentResize()});nt(this,"onWrapperResize",()=>{this.wrapper instanceof Window?(this.width=window.innerWidth,this.height=window.innerHeight):(this.width=this.wrapper.clientWidth,this.height=this.wrapper.clientHeight)});nt(this,"onContentResize",()=>{this.wrapper instanceof Window?(this.scrollHeight=this.content.scrollHeight,this.scrollWidth=this.content.scrollWidth):(this.scrollHeight=this.wrapper.scrollHeight,this.scrollWidth=this.wrapper.scrollWidth)});this.wrapper=r,this.content=e,t&&(this.debouncedResize=Dv(this.resize,n),this.wrapper instanceof Window?window.addEventListener("resize",this.debouncedResize,!1):(this.wrapperResizeObserver=new ResizeObserver(this.debouncedResize),this.wrapperResizeObserver.observe(this.wrapper)),this.contentResizeObserver=new ResizeObserver(this.debouncedResize),this.contentResizeObserver.observe(this.content)),this.resize()}destroy(){var r,e;(r=this.wrapperResizeObserver)==null||r.disconnect(),(e=this.contentResizeObserver)==null||e.disconnect(),this.wrapper===window&&this.debouncedResize&&window.removeEventListener("resize",this.debouncedResize,!1)}get limit(){return{x:this.scrollWidth-this.width,y:this.scrollHeight-this.height}}},Dg=class{constructor(){nt(this,"events",{})}emit(r,...e){var n;let t=this.events[r]||[];for(let i=0,s=t.length;i<s;i++)(n=t[i])==null||n.call(t,...e)}on(r,e){var t;return(t=this.events[r])!=null&&t.push(e)||(this.events[r]=[e]),()=>{var n;this.events[r]=(n=this.events[r])==null?void 0:n.filter(i=>e!==i)}}off(r,e){var t;this.events[r]=(t=this.events[r])==null?void 0:t.filter(n=>e!==n)}destroy(){this.events={}}},Wp=100/6,as={passive:!1},Ov=class{constructor(r,e={wheelMultiplier:1,touchMultiplier:1}){nt(this,"touchStart",{x:0,y:0});nt(this,"lastDelta",{x:0,y:0});nt(this,"window",{width:0,height:0});nt(this,"emitter",new Dg);nt(this,"onTouchStart",r=>{const{clientX:e,clientY:t}=r.targetTouches?r.targetTouches[0]:r;this.touchStart.x=e,this.touchStart.y=t,this.lastDelta={x:0,y:0},this.emitter.emit("scroll",{deltaX:0,deltaY:0,event:r})});nt(this,"onTouchMove",r=>{const{clientX:e,clientY:t}=r.targetTouches?r.targetTouches[0]:r,n=-(e-this.touchStart.x)*this.options.touchMultiplier,i=-(t-this.touchStart.y)*this.options.touchMultiplier;this.touchStart.x=e,this.touchStart.y=t,this.lastDelta={x:n,y:i},this.emitter.emit("scroll",{deltaX:n,deltaY:i,event:r})});nt(this,"onTouchEnd",r=>{this.emitter.emit("scroll",{deltaX:this.lastDelta.x,deltaY:this.lastDelta.y,event:r})});nt(this,"onWheel",r=>{let{deltaX:e,deltaY:t,deltaMode:n}=r;const i=n===1?Wp:n===2?this.window.width:1,s=n===1?Wp:n===2?this.window.height:1;e*=i,t*=s,e*=this.options.wheelMultiplier,t*=this.options.wheelMultiplier,this.emitter.emit("scroll",{deltaX:e,deltaY:t,event:r})});nt(this,"onWindowResize",()=>{this.window={width:window.innerWidth,height:window.innerHeight}});this.element=r,this.options=e,window.addEventListener("resize",this.onWindowResize,!1),this.onWindowResize(),this.element.addEventListener("wheel",this.onWheel,as),this.element.addEventListener("touchstart",this.onTouchStart,as),this.element.addEventListener("touchmove",this.onTouchMove,as),this.element.addEventListener("touchend",this.onTouchEnd,as)}on(r,e){return this.emitter.on(r,e)}destroy(){this.emitter.destroy(),window.removeEventListener("resize",this.onWindowResize,!1),this.element.removeEventListener("wheel",this.onWheel,as),this.element.removeEventListener("touchstart",this.onTouchStart,as),this.element.removeEventListener("touchmove",this.onTouchMove,as),this.element.removeEventListener("touchend",this.onTouchEnd,as)}},Xp=r=>Math.min(1,1.001-Math.pow(2,-10*r)),Nv=class{constructor({wrapper:r=window,content:e=document.documentElement,eventsTarget:t=r,smoothWheel:n=!0,syncTouch:i=!1,syncTouchLerp:s=.075,touchInertiaExponent:o=1.7,duration:a,easing:l,lerp:c=.1,infinite:u=!1,orientation:d="vertical",gestureOrientation:f=d==="horizontal"?"both":"vertical",touchMultiplier:h=1,wheelMultiplier:_=1,autoResize:g=!0,prevent:m,virtualScroll:p,overscroll:b=!0,autoRaf:x=!1,anchors:v=!1,autoToggle:T=!1,allowNestedScroll:M=!1,__experimental__naiveDimensions:E=!1}={}){nt(this,"_isScrolling",!1);nt(this,"_isStopped",!1);nt(this,"_isLocked",!1);nt(this,"_preventNextNativeScrollEvent",!1);nt(this,"_resetVelocityTimeout",null);nt(this,"__rafID",null);nt(this,"isTouching");nt(this,"time",0);nt(this,"userData",{});nt(this,"lastVelocity",0);nt(this,"velocity",0);nt(this,"direction",0);nt(this,"options");nt(this,"targetScroll");nt(this,"animatedScroll");nt(this,"animate",new Lv);nt(this,"emitter",new Dg);nt(this,"dimensions");nt(this,"virtualScroll");nt(this,"onScrollEnd",r=>{r instanceof CustomEvent||(this.isScrolling==="smooth"||this.isScrolling===!1)&&r.stopPropagation()});nt(this,"dispatchScrollendEvent",()=>{this.options.wrapper.dispatchEvent(new CustomEvent("scrollend",{bubbles:this.options.wrapper===window,detail:{lenisScrollEnd:!0}}))});nt(this,"onTransitionEnd",r=>{if(r.propertyName.includes("overflow")){const e=this.isHorizontal?"overflow-x":"overflow-y",t=getComputedStyle(this.rootElement)[e];["hidden","clip"].includes(t)?this.internalStop():this.internalStart()}});nt(this,"onClick",r=>{const t=r.composedPath().find(n=>{var i;return n instanceof HTMLAnchorElement&&((i=n.getAttribute("href"))==null?void 0:i.includes("#"))});if(t){const n=t.getAttribute("href");if(n){const i=typeof this.options.anchors=="object"&&this.options.anchors?this.options.anchors:void 0,s=`#${n.split("#")[1]}`;this.scrollTo(s,i)}}});nt(this,"onPointerDown",r=>{r.button===1&&this.reset()});nt(this,"onVirtualScroll",r=>{if(typeof this.options.virtualScroll=="function"&&this.options.virtualScroll(r)===!1)return;const{deltaX:e,deltaY:t,event:n}=r;if(this.emitter.emit("virtual-scroll",{deltaX:e,deltaY:t,event:n}),n.ctrlKey||n.lenisStopPropagation)return;const i=n.type.includes("touch"),s=n.type.includes("wheel");this.isTouching=n.type==="touchstart"||n.type==="touchmove";const o=e===0&&t===0;if(this.options.syncTouch&&i&&n.type==="touchstart"&&o&&!this.isStopped&&!this.isLocked){this.reset();return}const l=this.options.gestureOrientation==="vertical"&&t===0||this.options.gestureOrientation==="horizontal"&&e===0;if(o||l)return;let c=n.composedPath();c=c.slice(0,c.indexOf(this.rootElement));const u=this.options.prevent;if(c.find(m=>{var p,b,x;return m instanceof HTMLElement&&(typeof u=="function"&&(u==null?void 0:u(m))||((p=m.hasAttribute)==null?void 0:p.call(m,"data-lenis-prevent"))||i&&((b=m.hasAttribute)==null?void 0:b.call(m,"data-lenis-prevent-touch"))||s&&((x=m.hasAttribute)==null?void 0:x.call(m,"data-lenis-prevent-wheel"))||this.options.allowNestedScroll&&this.checkNestedScroll(m,{deltaX:e,deltaY:t}))}))return;if(this.isStopped||this.isLocked){n.cancelable&&n.preventDefault();return}if(!(this.options.syncTouch&&i||this.options.smoothWheel&&s)){this.isScrolling="native",this.animate.stop(),n.lenisStopPropagation=!0;return}let f=t;this.options.gestureOrientation==="both"?f=Math.abs(t)>Math.abs(e)?t:e:this.options.gestureOrientation==="horizontal"&&(f=e),(!this.options.overscroll||this.options.infinite||this.options.wrapper!==window&&this.limit>0&&(this.animatedScroll>0&&this.animatedScroll<this.limit||this.animatedScroll===0&&t>0||this.animatedScroll===this.limit&&t<0))&&(n.lenisStopPropagation=!0),n.cancelable&&n.preventDefault();const h=i&&this.options.syncTouch,g=i&&n.type==="touchend";g&&(f=Math.sign(this.velocity)*Math.pow(Math.abs(this.velocity),this.options.touchInertiaExponent)),this.scrollTo(this.targetScroll+f,{programmatic:!1,...h?{lerp:g?this.options.syncTouchLerp:1}:{lerp:this.options.lerp,duration:this.options.duration,easing:this.options.easing}})});nt(this,"onNativeScroll",()=>{if(this._resetVelocityTimeout!==null&&(clearTimeout(this._resetVelocityTimeout),this._resetVelocityTimeout=null),this._preventNextNativeScrollEvent){this._preventNextNativeScrollEvent=!1;return}if(this.isScrolling===!1||this.isScrolling==="native"){const r=this.animatedScroll;this.animatedScroll=this.targetScroll=this.actualScroll,this.lastVelocity=this.velocity,this.velocity=this.animatedScroll-r,this.direction=Math.sign(this.animatedScroll-r),this.isStopped||(this.isScrolling="native"),this.emit(),this.velocity!==0&&(this._resetVelocityTimeout=setTimeout(()=>{this.lastVelocity=this.velocity,this.velocity=0,this.isScrolling=!1,this.emit()},400))}});nt(this,"raf",r=>{const e=r-(this.time||r);this.time=r,this.animate.advance(e*.001),this.options.autoRaf&&(this.__rafID=requestAnimationFrame(this.raf))});window.lenisVersion=Av,(!r||r===document.documentElement)&&(r=window),typeof a=="number"&&typeof l!="function"?l=Xp:typeof l=="function"&&typeof a!="number"&&(a=1),this.options={wrapper:r,content:e,eventsTarget:t,smoothWheel:n,syncTouch:i,syncTouchLerp:s,touchInertiaExponent:o,duration:a,easing:l,lerp:c,infinite:u,gestureOrientation:f,orientation:d,touchMultiplier:h,wheelMultiplier:_,autoResize:g,prevent:m,virtualScroll:p,overscroll:b,autoRaf:x,anchors:v,autoToggle:T,allowNestedScroll:M,__experimental__naiveDimensions:E},this.dimensions=new Iv(r,e,{autoResize:g}),this.updateClassName(),this.targetScroll=this.animatedScroll=this.actualScroll,this.options.wrapper.addEventListener("scroll",this.onNativeScroll,!1),this.options.wrapper.addEventListener("scrollend",this.onScrollEnd,{capture:!0}),this.options.anchors&&this.options.wrapper===window&&this.options.wrapper.addEventListener("click",this.onClick,!1),this.options.wrapper.addEventListener("pointerdown",this.onPointerDown,!1),this.virtualScroll=new Ov(t,{touchMultiplier:h,wheelMultiplier:_}),this.virtualScroll.on("scroll",this.onVirtualScroll),this.options.autoToggle&&this.rootElement.addEventListener("transitionend",this.onTransitionEnd,{passive:!0}),this.options.autoRaf&&(this.__rafID=requestAnimationFrame(this.raf))}destroy(){this.emitter.destroy(),this.options.wrapper.removeEventListener("scroll",this.onNativeScroll,!1),this.options.wrapper.removeEventListener("scrollend",this.onScrollEnd,{capture:!0}),this.options.wrapper.removeEventListener("pointerdown",this.onPointerDown,!1),this.options.anchors&&this.options.wrapper===window&&this.options.wrapper.removeEventListener("click",this.onClick,!1),this.virtualScroll.destroy(),this.dimensions.destroy(),this.cleanUpClassName(),this.__rafID&&cancelAnimationFrame(this.__rafID)}on(r,e){return this.emitter.on(r,e)}off(r,e){return this.emitter.off(r,e)}setScroll(r){this.isHorizontal?this.options.wrapper.scrollTo({left:r,behavior:"instant"}):this.options.wrapper.scrollTo({top:r,behavior:"instant"})}resize(){this.dimensions.resize(),this.animatedScroll=this.targetScroll=this.actualScroll,this.emit()}emit(){this.emitter.emit("scroll",this)}reset(){this.isLocked=!1,this.isScrolling=!1,this.animatedScroll=this.targetScroll=this.actualScroll,this.lastVelocity=this.velocity=0,this.animate.stop()}start(){if(this.isStopped){if(this.options.autoToggle){this.rootElement.style.removeProperty("overflow");return}this.internalStart()}}internalStart(){this.isStopped&&(this.reset(),this.isStopped=!1,this.emit())}stop(){if(!this.isStopped){if(this.options.autoToggle){this.rootElement.style.setProperty("overflow","clip");return}this.internalStop()}}internalStop(){this.isStopped||(this.reset(),this.isStopped=!0,this.emit())}scrollTo(r,{offset:e=0,immediate:t=!1,lock:n=!1,duration:i=this.options.duration,easing:s=this.options.easing,lerp:o=this.options.lerp,onStart:a,onComplete:l,force:c=!1,programmatic:u=!0,userData:d}={}){if(!((this.isStopped||this.isLocked)&&!c)){if(typeof r=="string"&&["top","left","start","#"].includes(r))r=0;else if(typeof r=="string"&&["bottom","right","end"].includes(r))r=this.limit;else{let f;if(typeof r=="string"?(f=document.querySelector(r),f||(r==="#top"?r=0:console.warn("Lenis: Target not found",r))):r instanceof HTMLElement&&(r!=null&&r.nodeType)&&(f=r),f){if(this.options.wrapper!==window){const _=this.rootElement.getBoundingClientRect();e-=this.isHorizontal?_.left:_.top}const h=f.getBoundingClientRect();r=(this.isHorizontal?h.left:h.top)+this.animatedScroll}}if(typeof r=="number"){if(r+=e,r=Math.round(r),this.options.infinite){if(u){this.targetScroll=this.animatedScroll=this.scroll;const f=r-this.animatedScroll;f>this.limit/2?r=r-this.limit:f<-this.limit/2&&(r=r+this.limit)}}else r=Lg(0,r,this.limit);if(r===this.targetScroll){a==null||a(this),l==null||l(this);return}if(this.userData=d??{},t){this.animatedScroll=this.targetScroll=r,this.setScroll(this.scroll),this.reset(),this.preventNextNativeScrollEvent(),this.emit(),l==null||l(this),this.userData={},requestAnimationFrame(()=>{this.dispatchScrollendEvent()});return}u||(this.targetScroll=r),typeof i=="number"&&typeof s!="function"?s=Xp:typeof s=="function"&&typeof i!="number"&&(i=1),this.animate.fromTo(this.animatedScroll,r,{duration:i,easing:s,lerp:o,onStart:()=>{n&&(this.isLocked=!0),this.isScrolling="smooth",a==null||a(this)},onUpdate:(f,h)=>{this.isScrolling="smooth",this.lastVelocity=this.velocity,this.velocity=f-this.animatedScroll,this.direction=Math.sign(this.velocity),this.animatedScroll=f,this.setScroll(this.scroll),u&&(this.targetScroll=f),h||this.emit(),h&&(this.reset(),this.emit(),l==null||l(this),this.userData={},requestAnimationFrame(()=>{this.dispatchScrollendEvent()}),this.preventNextNativeScrollEvent())}})}}}preventNextNativeScrollEvent(){this._preventNextNativeScrollEvent=!0,requestAnimationFrame(()=>{this._preventNextNativeScrollEvent=!1})}checkNestedScroll(r,{deltaX:e,deltaY:t}){const n=Date.now(),i=r._lenis??(r._lenis={});let s,o,a,l,c,u,d,f;const h=this.options.gestureOrientation;if(n-(i.time??0)>2e3){i.time=Date.now();const T=window.getComputedStyle(r);i.computedStyle=T;const M=T.overflowX,E=T.overflowY;if(s=["auto","overlay","scroll"].includes(M),o=["auto","overlay","scroll"].includes(E),i.hasOverflowX=s,i.hasOverflowY=o,!s&&!o||h==="vertical"&&!o||h==="horizontal"&&!s)return!1;c=r.scrollWidth,u=r.scrollHeight,d=r.clientWidth,f=r.clientHeight,a=c>d,l=u>f,i.isScrollableX=a,i.isScrollableY=l,i.scrollWidth=c,i.scrollHeight=u,i.clientWidth=d,i.clientHeight=f}else a=i.isScrollableX,l=i.isScrollableY,s=i.hasOverflowX,o=i.hasOverflowY,c=i.scrollWidth,u=i.scrollHeight,d=i.clientWidth,f=i.clientHeight;if(!s&&!o||!a&&!l||h==="vertical"&&(!o||!l)||h==="horizontal"&&(!s||!a))return!1;let _;if(h==="horizontal")_="x";else if(h==="vertical")_="y";else{const T=e!==0,M=t!==0;T&&s&&a&&(_="x"),M&&o&&l&&(_="y")}if(!_)return!1;let g,m,p,b,x;if(_==="x")g=r.scrollLeft,m=c-d,p=e,b=s,x=a;else if(_==="y")g=r.scrollTop,m=u-f,p=t,b=o,x=l;else return!1;return(p>0?g<m:g>0)&&b&&x}get rootElement(){return this.options.wrapper===window?document.documentElement:this.options.wrapper}get limit(){return this.options.__experimental__naiveDimensions?this.isHorizontal?this.rootElement.scrollWidth-this.rootElement.clientWidth:this.rootElement.scrollHeight-this.rootElement.clientHeight:this.dimensions.limit[this.isHorizontal?"x":"y"]}get isHorizontal(){return this.options.orientation==="horizontal"}get actualScroll(){const r=this.options.wrapper;return this.isHorizontal?r.scrollX??r.scrollLeft:r.scrollY??r.scrollTop}get scroll(){return this.options.infinite?Pv(this.animatedScroll,this.limit):this.animatedScroll}get progress(){return this.limit===0?1:this.scroll/this.limit}get isScrolling(){return this._isScrolling}set isScrolling(r){this._isScrolling!==r&&(this._isScrolling=r,this.updateClassName())}get isStopped(){return this._isStopped}set isStopped(r){this._isStopped!==r&&(this._isStopped=r,this.updateClassName())}get isLocked(){return this._isLocked}set isLocked(r){this._isLocked!==r&&(this._isLocked=r,this.updateClassName())}get isSmooth(){return this.isScrolling==="smooth"}get className(){let r="lenis";return this.options.autoToggle&&(r+=" lenis-autoToggle"),this.isStopped&&(r+=" lenis-stopped"),this.isLocked&&(r+=" lenis-locked"),this.isScrolling&&(r+=" lenis-scrolling"),this.isScrolling==="smooth"&&(r+=" lenis-smooth"),r}updateClassName(){this.cleanUpClassName(),this.rootElement.className=`${this.rootElement.className} ${this.className}`.trim()}cleanUpClassName(){this.rootElement.className=this.rootElement.className.replace(/lenis(-\w+)?/g,"").trim()}};/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Wh="181",Fv=0,qp=1,Uv=2,Ig=1,kv=2,Hr=3,ts=0,xi=1,Wi=2,Jr=0,As=1,xu=2,Yp=3,$p=4,Bv=5,ro=100,zv=101,Vv=102,Hv=103,Gv=104,Wv=200,Xv=201,qv=202,Yv=203,df=204,ff=205,$v=206,jv=207,Kv=208,Zv=209,Jv=210,Qv=211,ey=212,ty=213,ny=214,hf=0,pf=1,mf=2,ya=3,gf=4,_f=5,xf=6,vf=7,Og=0,iy=1,ry=2,Cs=0,sy=1,oy=2,ay=3,ly=4,cy=5,uy=6,dy=7,jp="attached",fy="detached",Ng=300,ba=301,wa=302,yf=303,bf=304,Gu=306,Sa=1e3,wr=1001,vu=1002,pi=1003,Fg=1004,al=1005,Kn=1006,tu=1007,Yr=1008,Pr=1009,Ug=1010,kg=1011,Bl=1012,Xh=1013,bo=1014,sr=1015,Fa=1016,qh=1017,Yh=1018,zl=1020,Bg=35902,zg=35899,Vg=1021,Hg=1022,Xi=1023,Vl=1026,Hl=1027,$h=1028,jh=1029,Kh=1030,Zh=1031,Jh=1033,nu=33776,iu=33777,ru=33778,su=33779,wf=35840,Sf=35841,Mf=35842,Tf=35843,Ef=36196,Af=37492,Cf=37496,Rf=37808,Pf=37809,Lf=37810,Df=37811,If=37812,Of=37813,Nf=37814,Ff=37815,Uf=37816,kf=37817,Bf=37818,zf=37819,Vf=37820,Hf=37821,Gf=36492,Wf=36494,Xf=36495,qf=36283,Yf=36284,$f=36285,jf=36286,Gl=2300,Wl=2301,sd=2302,Kp=2400,Zp=2401,Jp=2402,hy=2500,py=0,Gg=1,Kf=2,my=3200,gy=3201,Wg=0,_y=1,_s="",Tn="srgb",Jn="srgb-linear",yu="linear",Zt="srgb",Oo=7680,Qp=519,xy=512,vy=513,yy=514,Xg=515,by=516,wy=517,Sy=518,My=519,Zf=35044,em="300 es",Sr=2e3,bu=2001;function qg(r){for(let e=r.length-1;e>=0;--e)if(r[e]>=65535)return!0;return!1}function Xl(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function Ty(){const r=Xl("canvas");return r.style.display="block",r}const tm={};function wu(...r){const e="THREE."+r.shift();console.log(e,...r)}function ot(...r){const e="THREE."+r.shift();console.warn(e,...r)}function Rt(...r){const e="THREE."+r.shift();console.error(e,...r)}function ql(...r){const e=r.join(" ");e in tm||(tm[e]=!0,ot(...r))}function Ey(r,e,t){return new Promise(function(n,i){function s(){switch(r.clientWaitSync(e,r.SYNC_FLUSH_COMMANDS_BIT,0)){case r.WAIT_FAILED:i();break;case r.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:n()}}setTimeout(s,t)})}class Ua{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){const n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){const n=this._listeners;if(n===void 0)return;const i=n[e];if(i!==void 0){const s=i.indexOf(t);s!==-1&&i.splice(s,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const n=t[e.type];if(n!==void 0){e.target=this;const i=n.slice(0);for(let s=0,o=i.length;s<o;s++)i[s].call(this,e);e.target=null}}}const Wn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let nm=1234567;const yl=Math.PI/180,Ma=180/Math.PI;function or(){const r=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Wn[r&255]+Wn[r>>8&255]+Wn[r>>16&255]+Wn[r>>24&255]+"-"+Wn[e&255]+Wn[e>>8&255]+"-"+Wn[e>>16&15|64]+Wn[e>>24&255]+"-"+Wn[t&63|128]+Wn[t>>8&255]+"-"+Wn[t>>16&255]+Wn[t>>24&255]+Wn[n&255]+Wn[n>>8&255]+Wn[n>>16&255]+Wn[n>>24&255]).toLowerCase()}function Pt(r,e,t){return Math.max(e,Math.min(t,r))}function Qh(r,e){return(r%e+e)%e}function Ay(r,e,t,n,i){return n+(r-e)*(i-n)/(t-e)}function Cy(r,e,t){return r!==e?(t-r)/(e-r):0}function bl(r,e,t){return(1-t)*r+t*e}function Ry(r,e,t,n){return bl(r,e,1-Math.exp(-t*n))}function Py(r,e=1){return e-Math.abs(Qh(r,e*2)-e)}function Ly(r,e,t){return r<=e?0:r>=t?1:(r=(r-e)/(t-e),r*r*(3-2*r))}function Dy(r,e,t){return r<=e?0:r>=t?1:(r=(r-e)/(t-e),r*r*r*(r*(r*6-15)+10))}function Iy(r,e){return r+Math.floor(Math.random()*(e-r+1))}function Oy(r,e){return r+Math.random()*(e-r)}function Ny(r){return r*(.5-Math.random())}function Fy(r){r!==void 0&&(nm=r);let e=nm+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Uy(r){return r*yl}function ky(r){return r*Ma}function By(r){return(r&r-1)===0&&r!==0}function zy(r){return Math.pow(2,Math.ceil(Math.log(r)/Math.LN2))}function Vy(r){return Math.pow(2,Math.floor(Math.log(r)/Math.LN2))}function Hy(r,e,t,n,i){const s=Math.cos,o=Math.sin,a=s(t/2),l=o(t/2),c=s((e+n)/2),u=o((e+n)/2),d=s((e-n)/2),f=o((e-n)/2),h=s((n-e)/2),_=o((n-e)/2);switch(i){case"XYX":r.set(a*u,l*d,l*f,a*c);break;case"YZY":r.set(l*f,a*u,l*d,a*c);break;case"ZXZ":r.set(l*d,l*f,a*u,a*c);break;case"XZX":r.set(a*u,l*_,l*h,a*c);break;case"YXY":r.set(l*h,a*u,l*_,a*c);break;case"ZYZ":r.set(l*_,l*h,a*u,a*c);break;default:ot("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function nr(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return r/4294967295;case Uint16Array:return r/65535;case Uint8Array:return r/255;case Int32Array:return Math.max(r/2147483647,-1);case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:throw new Error("Invalid component type.")}}function $t(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return Math.round(r*4294967295);case Uint16Array:return Math.round(r*65535);case Uint8Array:return Math.round(r*255);case Int32Array:return Math.round(r*2147483647);case Int16Array:return Math.round(r*32767);case Int8Array:return Math.round(r*127);default:throw new Error("Invalid component type.")}}const Gy={DEG2RAD:yl,RAD2DEG:Ma,generateUUID:or,clamp:Pt,euclideanModulo:Qh,mapLinear:Ay,inverseLerp:Cy,lerp:bl,damp:Ry,pingpong:Py,smoothstep:Ly,smootherstep:Dy,randInt:Iy,randFloat:Oy,randFloatSpread:Ny,seededRandom:Fy,degToRad:Uy,radToDeg:ky,isPowerOfTwo:By,ceilPowerOfTwo:zy,floorPowerOfTwo:Vy,setQuaternionFromProperEuler:Hy,normalize:$t,denormalize:nr};class Et{constructor(e=0,t=0){Et.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6],this.y=i[1]*t+i[4]*n+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Pt(this.x,e.x,t.x),this.y=Pt(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=Pt(this.x,e,t),this.y=Pt(this.y,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Pt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Pt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),i=Math.sin(t),s=this.x-e.x,o=this.y-e.y;return this.x=s*n-o*i+e.x,this.y=s*i+o*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class ks{constructor(e=0,t=0,n=0,i=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=i}static slerpFlat(e,t,n,i,s,o,a){let l=n[i+0],c=n[i+1],u=n[i+2],d=n[i+3],f=s[o+0],h=s[o+1],_=s[o+2],g=s[o+3];if(a<=0){e[t+0]=l,e[t+1]=c,e[t+2]=u,e[t+3]=d;return}if(a>=1){e[t+0]=f,e[t+1]=h,e[t+2]=_,e[t+3]=g;return}if(d!==g||l!==f||c!==h||u!==_){let m=l*f+c*h+u*_+d*g;m<0&&(f=-f,h=-h,_=-_,g=-g,m=-m);let p=1-a;if(m<.9995){const b=Math.acos(m),x=Math.sin(b);p=Math.sin(p*b)/x,a=Math.sin(a*b)/x,l=l*p+f*a,c=c*p+h*a,u=u*p+_*a,d=d*p+g*a}else{l=l*p+f*a,c=c*p+h*a,u=u*p+_*a,d=d*p+g*a;const b=1/Math.sqrt(l*l+c*c+u*u+d*d);l*=b,c*=b,u*=b,d*=b}}e[t]=l,e[t+1]=c,e[t+2]=u,e[t+3]=d}static multiplyQuaternionsFlat(e,t,n,i,s,o){const a=n[i],l=n[i+1],c=n[i+2],u=n[i+3],d=s[o],f=s[o+1],h=s[o+2],_=s[o+3];return e[t]=a*_+u*d+l*h-c*f,e[t+1]=l*_+u*f+c*d-a*h,e[t+2]=c*_+u*h+a*f-l*d,e[t+3]=u*_-a*d-l*f-c*h,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,i=e._y,s=e._z,o=e._order,a=Math.cos,l=Math.sin,c=a(n/2),u=a(i/2),d=a(s/2),f=l(n/2),h=l(i/2),_=l(s/2);switch(o){case"XYZ":this._x=f*u*d+c*h*_,this._y=c*h*d-f*u*_,this._z=c*u*_+f*h*d,this._w=c*u*d-f*h*_;break;case"YXZ":this._x=f*u*d+c*h*_,this._y=c*h*d-f*u*_,this._z=c*u*_-f*h*d,this._w=c*u*d+f*h*_;break;case"ZXY":this._x=f*u*d-c*h*_,this._y=c*h*d+f*u*_,this._z=c*u*_+f*h*d,this._w=c*u*d-f*h*_;break;case"ZYX":this._x=f*u*d-c*h*_,this._y=c*h*d+f*u*_,this._z=c*u*_-f*h*d,this._w=c*u*d+f*h*_;break;case"YZX":this._x=f*u*d+c*h*_,this._y=c*h*d+f*u*_,this._z=c*u*_-f*h*d,this._w=c*u*d-f*h*_;break;case"XZY":this._x=f*u*d-c*h*_,this._y=c*h*d-f*u*_,this._z=c*u*_+f*h*d,this._w=c*u*d+f*h*_;break;default:ot("Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,i=Math.sin(n);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],i=t[4],s=t[8],o=t[1],a=t[5],l=t[9],c=t[2],u=t[6],d=t[10],f=n+a+d;if(f>0){const h=.5/Math.sqrt(f+1);this._w=.25/h,this._x=(u-l)*h,this._y=(s-c)*h,this._z=(o-i)*h}else if(n>a&&n>d){const h=2*Math.sqrt(1+n-a-d);this._w=(u-l)/h,this._x=.25*h,this._y=(i+o)/h,this._z=(s+c)/h}else if(a>d){const h=2*Math.sqrt(1+a-n-d);this._w=(s-c)/h,this._x=(i+o)/h,this._y=.25*h,this._z=(l+u)/h}else{const h=2*Math.sqrt(1+d-n-a);this._w=(o-i)/h,this._x=(s+c)/h,this._y=(l+u)/h,this._z=.25*h}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Pt(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const i=Math.min(1,t/n);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,i=e._y,s=e._z,o=e._w,a=t._x,l=t._y,c=t._z,u=t._w;return this._x=n*u+o*a+i*c-s*l,this._y=i*u+o*l+s*a-n*c,this._z=s*u+o*c+n*l-i*a,this._w=o*u-n*a-i*l-s*c,this._onChangeCallback(),this}slerp(e,t){if(t<=0)return this;if(t>=1)return this.copy(e);let n=e._x,i=e._y,s=e._z,o=e._w,a=this.dot(e);a<0&&(n=-n,i=-i,s=-s,o=-o,a=-a);let l=1-t;if(a<.9995){const c=Math.acos(a),u=Math.sin(c);l=Math.sin(l*c)/u,t=Math.sin(t*c)/u,this._x=this._x*l+n*t,this._y=this._y*l+i*t,this._z=this._z*l+s*t,this._w=this._w*l+o*t,this._onChangeCallback()}else this._x=this._x*l+n*t,this._y=this._y*l+i*t,this._z=this._z*l+s*t,this._w=this._w*l+o*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(i*Math.sin(e),i*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class Y{constructor(e=0,t=0,n=0){Y.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(im.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(im.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6]*i,this.y=s[1]*t+s[4]*n+s[7]*i,this.z=s[2]*t+s[5]*n+s[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,s=e.elements,o=1/(s[3]*t+s[7]*n+s[11]*i+s[15]);return this.x=(s[0]*t+s[4]*n+s[8]*i+s[12])*o,this.y=(s[1]*t+s[5]*n+s[9]*i+s[13])*o,this.z=(s[2]*t+s[6]*n+s[10]*i+s[14])*o,this}applyQuaternion(e){const t=this.x,n=this.y,i=this.z,s=e.x,o=e.y,a=e.z,l=e.w,c=2*(o*i-a*n),u=2*(a*t-s*i),d=2*(s*n-o*t);return this.x=t+l*c+o*d-a*u,this.y=n+l*u+a*c-s*d,this.z=i+l*d+s*u-o*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*i,this.y=s[1]*t+s[5]*n+s[9]*i,this.z=s[2]*t+s[6]*n+s[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Pt(this.x,e.x,t.x),this.y=Pt(this.y,e.y,t.y),this.z=Pt(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=Pt(this.x,e,t),this.y=Pt(this.y,e,t),this.z=Pt(this.z,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Pt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,i=e.y,s=e.z,o=t.x,a=t.y,l=t.z;return this.x=i*l-s*a,this.y=s*o-n*l,this.z=n*a-i*o,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return od.copy(this).projectOnVector(e),this.sub(od)}reflect(e){return this.sub(od.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Pt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,i=this.z-e.z;return t*t+n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const i=Math.sin(t)*e;return this.x=i*Math.sin(n),this.y=Math.cos(t)*e,this.z=i*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const od=new Y,im=new ks;class vt{constructor(e,t,n,i,s,o,a,l,c){vt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,i,s,o,a,l,c)}set(e,t,n,i,s,o,a,l,c){const u=this.elements;return u[0]=e,u[1]=i,u[2]=a,u[3]=t,u[4]=s,u[5]=l,u[6]=n,u[7]=o,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,s=this.elements,o=n[0],a=n[3],l=n[6],c=n[1],u=n[4],d=n[7],f=n[2],h=n[5],_=n[8],g=i[0],m=i[3],p=i[6],b=i[1],x=i[4],v=i[7],T=i[2],M=i[5],E=i[8];return s[0]=o*g+a*b+l*T,s[3]=o*m+a*x+l*M,s[6]=o*p+a*v+l*E,s[1]=c*g+u*b+d*T,s[4]=c*m+u*x+d*M,s[7]=c*p+u*v+d*E,s[2]=f*g+h*b+_*T,s[5]=f*m+h*x+_*M,s[8]=f*p+h*v+_*E,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8];return t*o*u-t*a*c-n*s*u+n*a*l+i*s*c-i*o*l}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8],d=u*o-a*c,f=a*l-u*s,h=c*s-o*l,_=t*d+n*f+i*h;if(_===0)return this.set(0,0,0,0,0,0,0,0,0);const g=1/_;return e[0]=d*g,e[1]=(i*c-u*n)*g,e[2]=(a*n-i*o)*g,e[3]=f*g,e[4]=(u*t-i*l)*g,e[5]=(i*s-a*t)*g,e[6]=h*g,e[7]=(n*l-c*t)*g,e[8]=(o*t-n*s)*g,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,i,s,o,a){const l=Math.cos(s),c=Math.sin(s);return this.set(n*l,n*c,-n*(l*o+c*a)+o+e,-i*c,i*l,-i*(-c*o+l*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(ad.makeScale(e,t)),this}rotate(e){return this.premultiply(ad.makeRotation(-e)),this}translate(e,t){return this.premultiply(ad.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<9;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const ad=new vt,rm=new vt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),sm=new vt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Wy(){const r={enabled:!0,workingColorSpace:Jn,spaces:{},convert:function(i,s,o){return this.enabled===!1||s===o||!s||!o||(this.spaces[s].transfer===Zt&&(i.r=Qr(i.r),i.g=Qr(i.g),i.b=Qr(i.b)),this.spaces[s].primaries!==this.spaces[o].primaries&&(i.applyMatrix3(this.spaces[s].toXYZ),i.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===Zt&&(i.r=ca(i.r),i.g=ca(i.g),i.b=ca(i.b))),i},workingToColorSpace:function(i,s){return this.convert(i,this.workingColorSpace,s)},colorSpaceToWorking:function(i,s){return this.convert(i,s,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===_s?yu:this.spaces[i].transfer},getToneMappingMode:function(i){return this.spaces[i].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(i,s=this.workingColorSpace){return i.fromArray(this.spaces[s].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,s,o){return i.copy(this.spaces[s].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(i,s){return ql("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),r.workingToColorSpace(i,s)},toWorkingColorSpace:function(i,s){return ql("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),r.colorSpaceToWorking(i,s)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return r.define({[Jn]:{primaries:e,whitePoint:n,transfer:yu,toXYZ:rm,fromXYZ:sm,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Tn},outputColorSpaceConfig:{drawingBufferColorSpace:Tn}},[Tn]:{primaries:e,whitePoint:n,transfer:Zt,toXYZ:rm,fromXYZ:sm,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Tn}}}),r}const It=Wy();function Qr(r){return r<.04045?r*.0773993808:Math.pow(r*.9478672986+.0521327014,2.4)}function ca(r){return r<.0031308?r*12.92:1.055*Math.pow(r,.41666)-.055}let No;class Xy{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{No===void 0&&(No=Xl("canvas")),No.width=e.width,No.height=e.height;const i=No.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),n=No}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Xl("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const i=n.getImageData(0,0,e.width,e.height),s=i.data;for(let o=0;o<s.length;o++)s[o]=Qr(s[o]/255)*255;return n.putImageData(i,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Qr(t[n]/255)*255):t[n]=Qr(t[n]);return{data:t,width:e.width,height:e.height}}else return ot("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let qy=0;class ep{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:qy++}),this.uuid=or(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):t instanceof VideoFrame?e.set(t.displayHeight,t.displayWidth,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let s;if(Array.isArray(i)){s=[];for(let o=0,a=i.length;o<a;o++)i[o].isDataTexture?s.push(ld(i[o].image)):s.push(ld(i[o]))}else s=ld(i);n.url=s}return t||(e.images[this.uuid]=n),n}}function ld(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?Xy.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(ot("Texture: Unable to serialize Texture."),{})}let Yy=0;const cd=new Y;class Pn extends Ua{constructor(e=Pn.DEFAULT_IMAGE,t=Pn.DEFAULT_MAPPING,n=wr,i=wr,s=Kn,o=Yr,a=Xi,l=Pr,c=Pn.DEFAULT_ANISOTROPY,u=_s){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Yy++}),this.uuid=or(),this.name="",this.source=new ep(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=s,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new Et(0,0),this.repeat=new Et(1,1),this.center=new Et(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new vt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(cd).x}get height(){return this.source.getSize(cd).y}get depth(){return this.source.getSize(cd).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const n=e[t];if(n===void 0){ot(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const i=this[t];if(i===void 0){ot(`Texture.setValues(): property '${t}' does not exist.`);continue}i&&n&&i.isVector2&&n.isVector2||i&&n&&i.isVector3&&n.isVector3||i&&n&&i.isMatrix3&&n.isMatrix3?i.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Ng)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Sa:e.x=e.x-Math.floor(e.x);break;case wr:e.x=e.x<0?0:1;break;case vu:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Sa:e.y=e.y-Math.floor(e.y);break;case wr:e.y=e.y<0?0:1;break;case vu:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Pn.DEFAULT_IMAGE=null;Pn.DEFAULT_MAPPING=Ng;Pn.DEFAULT_ANISOTROPY=1;class zt{constructor(e=0,t=0,n=0,i=1){zt.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,i){return this.x=e,this.y=t,this.z=n,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,s=this.w,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*i+o[12]*s,this.y=o[1]*t+o[5]*n+o[9]*i+o[13]*s,this.z=o[2]*t+o[6]*n+o[10]*i+o[14]*s,this.w=o[3]*t+o[7]*n+o[11]*i+o[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,i,s;const l=e.elements,c=l[0],u=l[4],d=l[8],f=l[1],h=l[5],_=l[9],g=l[2],m=l[6],p=l[10];if(Math.abs(u-f)<.01&&Math.abs(d-g)<.01&&Math.abs(_-m)<.01){if(Math.abs(u+f)<.1&&Math.abs(d+g)<.1&&Math.abs(_+m)<.1&&Math.abs(c+h+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const x=(c+1)/2,v=(h+1)/2,T=(p+1)/2,M=(u+f)/4,E=(d+g)/4,R=(_+m)/4;return x>v&&x>T?x<.01?(n=0,i=.707106781,s=.707106781):(n=Math.sqrt(x),i=M/n,s=E/n):v>T?v<.01?(n=.707106781,i=0,s=.707106781):(i=Math.sqrt(v),n=M/i,s=R/i):T<.01?(n=.707106781,i=.707106781,s=0):(s=Math.sqrt(T),n=E/s,i=R/s),this.set(n,i,s,t),this}let b=Math.sqrt((m-_)*(m-_)+(d-g)*(d-g)+(f-u)*(f-u));return Math.abs(b)<.001&&(b=1),this.x=(m-_)/b,this.y=(d-g)/b,this.z=(f-u)/b,this.w=Math.acos((c+h+p-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Pt(this.x,e.x,t.x),this.y=Pt(this.y,e.y,t.y),this.z=Pt(this.z,e.z,t.z),this.w=Pt(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=Pt(this.x,e,t),this.y=Pt(this.y,e,t),this.z=Pt(this.z,e,t),this.w=Pt(this.w,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Pt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class $y extends Ua{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Kn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new zt(0,0,e,t),this.scissorTest=!1,this.viewport=new zt(0,0,e,t);const i={width:e,height:t,depth:n.depth},s=new Pn(i);this.textures=[];const o=n.count;for(let a=0;a<o;a++)this.textures[a]=s.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(e={}){const t={minFilter:Kn,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let i=0,s=this.textures.length;i<s;i++)this.textures[i].image.width=e,this.textures[i].image.height=t,this.textures[i].image.depth=n,this.textures[i].isData3DTexture!==!0&&(this.textures[i].isArrayTexture=this.textures[i].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const i=Object.assign({},e.textures[t].image);this.textures[t].source=new ep(i)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Is extends $y{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class Yg extends Pn{constructor(e=null,t=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=pi,this.minFilter=pi,this.wrapR=wr,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class jy extends Pn{constructor(e=null,t=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=pi,this.minFilter=pi,this.wrapR=wr,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class lr{constructor(e=new Y(1/0,1/0,1/0),t=new Y(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Ji.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Ji.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=Ji.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const s=n.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=s.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,Ji):Ji.fromBufferAttribute(s,o),Ji.applyMatrix4(e.matrixWorld),this.expandByPoint(Ji);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),uc.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),uc.copy(n.boundingBox)),uc.applyMatrix4(e.matrixWorld),this.union(uc)}const i=e.children;for(let s=0,o=i.length;s<o;s++)this.expandByObject(i[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Ji),Ji.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Ha),dc.subVectors(this.max,Ha),Fo.subVectors(e.a,Ha),Uo.subVectors(e.b,Ha),ko.subVectors(e.c,Ha),ls.subVectors(Uo,Fo),cs.subVectors(ko,Uo),Gs.subVectors(Fo,ko);let t=[0,-ls.z,ls.y,0,-cs.z,cs.y,0,-Gs.z,Gs.y,ls.z,0,-ls.x,cs.z,0,-cs.x,Gs.z,0,-Gs.x,-ls.y,ls.x,0,-cs.y,cs.x,0,-Gs.y,Gs.x,0];return!ud(t,Fo,Uo,ko,dc)||(t=[1,0,0,0,1,0,0,0,1],!ud(t,Fo,Uo,ko,dc))?!1:(fc.crossVectors(ls,cs),t=[fc.x,fc.y,fc.z],ud(t,Fo,Uo,ko,dc))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Ji).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Ji).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Or[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Or[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Or[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Or[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Or[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Or[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Or[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Or[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Or),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const Or=[new Y,new Y,new Y,new Y,new Y,new Y,new Y,new Y],Ji=new Y,uc=new lr,Fo=new Y,Uo=new Y,ko=new Y,ls=new Y,cs=new Y,Gs=new Y,Ha=new Y,dc=new Y,fc=new Y,Ws=new Y;function ud(r,e,t,n,i){for(let s=0,o=r.length-3;s<=o;s+=3){Ws.fromArray(r,s);const a=i.x*Math.abs(Ws.x)+i.y*Math.abs(Ws.y)+i.z*Math.abs(Ws.z),l=e.dot(Ws),c=t.dot(Ws),u=n.dot(Ws);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>a)return!1}return!0}const Ky=new lr,Ga=new Y,dd=new Y;class Ir{constructor(e=new Y,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):Ky.setFromPoints(e).getCenter(n);let i=0;for(let s=0,o=e.length;s<o;s++)i=Math.max(i,n.distanceToSquared(e[s]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Ga.subVectors(e,this.center);const t=Ga.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),i=(n-this.radius)*.5;this.center.addScaledVector(Ga,i/n),this.radius+=i}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(dd.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Ga.copy(e.center).add(dd)),this.expandByPoint(Ga.copy(e.center).sub(dd))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}const Nr=new Y,fd=new Y,hc=new Y,us=new Y,hd=new Y,pc=new Y,pd=new Y;class Wu{constructor(e=new Y,t=new Y(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Nr)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Nr.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Nr.copy(this.origin).addScaledVector(this.direction,t),Nr.distanceToSquared(e))}distanceSqToSegment(e,t,n,i){fd.copy(e).add(t).multiplyScalar(.5),hc.copy(t).sub(e).normalize(),us.copy(this.origin).sub(fd);const s=e.distanceTo(t)*.5,o=-this.direction.dot(hc),a=us.dot(this.direction),l=-us.dot(hc),c=us.lengthSq(),u=Math.abs(1-o*o);let d,f,h,_;if(u>0)if(d=o*l-a,f=o*a-l,_=s*u,d>=0)if(f>=-_)if(f<=_){const g=1/u;d*=g,f*=g,h=d*(d+o*f+2*a)+f*(o*d+f+2*l)+c}else f=s,d=Math.max(0,-(o*f+a)),h=-d*d+f*(f+2*l)+c;else f=-s,d=Math.max(0,-(o*f+a)),h=-d*d+f*(f+2*l)+c;else f<=-_?(d=Math.max(0,-(-o*s+a)),f=d>0?-s:Math.min(Math.max(-s,-l),s),h=-d*d+f*(f+2*l)+c):f<=_?(d=0,f=Math.min(Math.max(-s,-l),s),h=f*(f+2*l)+c):(d=Math.max(0,-(o*s+a)),f=d>0?s:Math.min(Math.max(-s,-l),s),h=-d*d+f*(f+2*l)+c);else f=o>0?-s:s,d=Math.max(0,-(o*f+a)),h=-d*d+f*(f+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,d),i&&i.copy(fd).addScaledVector(hc,f),h}intersectSphere(e,t){Nr.subVectors(e.center,this.origin);const n=Nr.dot(this.direction),i=Nr.dot(Nr)-n*n,s=e.radius*e.radius;if(i>s)return null;const o=Math.sqrt(s-i),a=n-o,l=n+o;return l<0?null:a<0?this.at(l,t):this.at(a,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,i,s,o,a,l;const c=1/this.direction.x,u=1/this.direction.y,d=1/this.direction.z,f=this.origin;return c>=0?(n=(e.min.x-f.x)*c,i=(e.max.x-f.x)*c):(n=(e.max.x-f.x)*c,i=(e.min.x-f.x)*c),u>=0?(s=(e.min.y-f.y)*u,o=(e.max.y-f.y)*u):(s=(e.max.y-f.y)*u,o=(e.min.y-f.y)*u),n>o||s>i||((s>n||isNaN(n))&&(n=s),(o<i||isNaN(i))&&(i=o),d>=0?(a=(e.min.z-f.z)*d,l=(e.max.z-f.z)*d):(a=(e.max.z-f.z)*d,l=(e.min.z-f.z)*d),n>l||a>i)||((a>n||n!==n)&&(n=a),(l<i||i!==i)&&(i=l),i<0)?null:this.at(n>=0?n:i,t)}intersectsBox(e){return this.intersectBox(e,Nr)!==null}intersectTriangle(e,t,n,i,s){hd.subVectors(t,e),pc.subVectors(n,e),pd.crossVectors(hd,pc);let o=this.direction.dot(pd),a;if(o>0){if(i)return null;a=1}else if(o<0)a=-1,o=-o;else return null;us.subVectors(this.origin,e);const l=a*this.direction.dot(pc.crossVectors(us,pc));if(l<0)return null;const c=a*this.direction.dot(hd.cross(us));if(c<0||l+c>o)return null;const u=-a*us.dot(pd);return u<0?null:this.at(u/o,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class bt{constructor(e,t,n,i,s,o,a,l,c,u,d,f,h,_,g,m){bt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,i,s,o,a,l,c,u,d,f,h,_,g,m)}set(e,t,n,i,s,o,a,l,c,u,d,f,h,_,g,m){const p=this.elements;return p[0]=e,p[4]=t,p[8]=n,p[12]=i,p[1]=s,p[5]=o,p[9]=a,p[13]=l,p[2]=c,p[6]=u,p[10]=d,p[14]=f,p[3]=h,p[7]=_,p[11]=g,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new bt().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,i=1/Bo.setFromMatrixColumn(e,0).length(),s=1/Bo.setFromMatrixColumn(e,1).length(),o=1/Bo.setFromMatrixColumn(e,2).length();return t[0]=n[0]*i,t[1]=n[1]*i,t[2]=n[2]*i,t[3]=0,t[4]=n[4]*s,t[5]=n[5]*s,t[6]=n[6]*s,t[7]=0,t[8]=n[8]*o,t[9]=n[9]*o,t[10]=n[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,i=e.y,s=e.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(i),c=Math.sin(i),u=Math.cos(s),d=Math.sin(s);if(e.order==="XYZ"){const f=o*u,h=o*d,_=a*u,g=a*d;t[0]=l*u,t[4]=-l*d,t[8]=c,t[1]=h+_*c,t[5]=f-g*c,t[9]=-a*l,t[2]=g-f*c,t[6]=_+h*c,t[10]=o*l}else if(e.order==="YXZ"){const f=l*u,h=l*d,_=c*u,g=c*d;t[0]=f+g*a,t[4]=_*a-h,t[8]=o*c,t[1]=o*d,t[5]=o*u,t[9]=-a,t[2]=h*a-_,t[6]=g+f*a,t[10]=o*l}else if(e.order==="ZXY"){const f=l*u,h=l*d,_=c*u,g=c*d;t[0]=f-g*a,t[4]=-o*d,t[8]=_+h*a,t[1]=h+_*a,t[5]=o*u,t[9]=g-f*a,t[2]=-o*c,t[6]=a,t[10]=o*l}else if(e.order==="ZYX"){const f=o*u,h=o*d,_=a*u,g=a*d;t[0]=l*u,t[4]=_*c-h,t[8]=f*c+g,t[1]=l*d,t[5]=g*c+f,t[9]=h*c-_,t[2]=-c,t[6]=a*l,t[10]=o*l}else if(e.order==="YZX"){const f=o*l,h=o*c,_=a*l,g=a*c;t[0]=l*u,t[4]=g-f*d,t[8]=_*d+h,t[1]=d,t[5]=o*u,t[9]=-a*u,t[2]=-c*u,t[6]=h*d+_,t[10]=f-g*d}else if(e.order==="XZY"){const f=o*l,h=o*c,_=a*l,g=a*c;t[0]=l*u,t[4]=-d,t[8]=c*u,t[1]=f*d+g,t[5]=o*u,t[9]=h*d-_,t[2]=_*d-h,t[6]=a*u,t[10]=g*d+f}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Zy,e,Jy)}lookAt(e,t,n){const i=this.elements;return Ti.subVectors(e,t),Ti.lengthSq()===0&&(Ti.z=1),Ti.normalize(),ds.crossVectors(n,Ti),ds.lengthSq()===0&&(Math.abs(n.z)===1?Ti.x+=1e-4:Ti.z+=1e-4,Ti.normalize(),ds.crossVectors(n,Ti)),ds.normalize(),mc.crossVectors(Ti,ds),i[0]=ds.x,i[4]=mc.x,i[8]=Ti.x,i[1]=ds.y,i[5]=mc.y,i[9]=Ti.y,i[2]=ds.z,i[6]=mc.z,i[10]=Ti.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,s=this.elements,o=n[0],a=n[4],l=n[8],c=n[12],u=n[1],d=n[5],f=n[9],h=n[13],_=n[2],g=n[6],m=n[10],p=n[14],b=n[3],x=n[7],v=n[11],T=n[15],M=i[0],E=i[4],R=i[8],w=i[12],y=i[1],L=i[5],N=i[9],W=i[13],j=i[2],k=i[6],J=i[10],te=i[14],F=i[3],ue=i[7],O=i[11],$=i[15];return s[0]=o*M+a*y+l*j+c*F,s[4]=o*E+a*L+l*k+c*ue,s[8]=o*R+a*N+l*J+c*O,s[12]=o*w+a*W+l*te+c*$,s[1]=u*M+d*y+f*j+h*F,s[5]=u*E+d*L+f*k+h*ue,s[9]=u*R+d*N+f*J+h*O,s[13]=u*w+d*W+f*te+h*$,s[2]=_*M+g*y+m*j+p*F,s[6]=_*E+g*L+m*k+p*ue,s[10]=_*R+g*N+m*J+p*O,s[14]=_*w+g*W+m*te+p*$,s[3]=b*M+x*y+v*j+T*F,s[7]=b*E+x*L+v*k+T*ue,s[11]=b*R+x*N+v*J+T*O,s[15]=b*w+x*W+v*te+T*$,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],i=e[8],s=e[12],o=e[1],a=e[5],l=e[9],c=e[13],u=e[2],d=e[6],f=e[10],h=e[14],_=e[3],g=e[7],m=e[11],p=e[15];return _*(+s*l*d-i*c*d-s*a*f+n*c*f+i*a*h-n*l*h)+g*(+t*l*h-t*c*f+s*o*f-i*o*h+i*c*u-s*l*u)+m*(+t*c*d-t*a*h-s*o*d+n*o*h+s*a*u-n*c*u)+p*(-i*a*u-t*l*d+t*a*f+i*o*d-n*o*f+n*l*u)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8],d=e[9],f=e[10],h=e[11],_=e[12],g=e[13],m=e[14],p=e[15],b=d*m*c-g*f*c+g*l*h-a*m*h-d*l*p+a*f*p,x=_*f*c-u*m*c-_*l*h+o*m*h+u*l*p-o*f*p,v=u*g*c-_*d*c+_*a*h-o*g*h-u*a*p+o*d*p,T=_*d*l-u*g*l-_*a*f+o*g*f+u*a*m-o*d*m,M=t*b+n*x+i*v+s*T;if(M===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const E=1/M;return e[0]=b*E,e[1]=(g*f*s-d*m*s-g*i*h+n*m*h+d*i*p-n*f*p)*E,e[2]=(a*m*s-g*l*s+g*i*c-n*m*c-a*i*p+n*l*p)*E,e[3]=(d*l*s-a*f*s-d*i*c+n*f*c+a*i*h-n*l*h)*E,e[4]=x*E,e[5]=(u*m*s-_*f*s+_*i*h-t*m*h-u*i*p+t*f*p)*E,e[6]=(_*l*s-o*m*s-_*i*c+t*m*c+o*i*p-t*l*p)*E,e[7]=(o*f*s-u*l*s+u*i*c-t*f*c-o*i*h+t*l*h)*E,e[8]=v*E,e[9]=(_*d*s-u*g*s-_*n*h+t*g*h+u*n*p-t*d*p)*E,e[10]=(o*g*s-_*a*s+_*n*c-t*g*c-o*n*p+t*a*p)*E,e[11]=(u*a*s-o*d*s-u*n*c+t*d*c+o*n*h-t*a*h)*E,e[12]=T*E,e[13]=(u*g*i-_*d*i+_*n*f-t*g*f-u*n*m+t*d*m)*E,e[14]=(_*a*i-o*g*i-_*n*l+t*g*l+o*n*m-t*a*m)*E,e[15]=(o*d*i-u*a*i+u*n*l-t*d*l-o*n*f+t*a*f)*E,this}scale(e){const t=this.elements,n=e.x,i=e.y,s=e.z;return t[0]*=n,t[4]*=i,t[8]*=s,t[1]*=n,t[5]*=i,t[9]*=s,t[2]*=n,t[6]*=i,t[10]*=s,t[3]*=n,t[7]*=i,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,i))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),i=Math.sin(t),s=1-n,o=e.x,a=e.y,l=e.z,c=s*o,u=s*a;return this.set(c*o+n,c*a-i*l,c*l+i*a,0,c*a+i*l,u*a+n,u*l-i*o,0,c*l-i*a,u*l+i*o,s*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,i,s,o){return this.set(1,n,s,0,e,1,o,0,t,i,1,0,0,0,0,1),this}compose(e,t,n){const i=this.elements,s=t._x,o=t._y,a=t._z,l=t._w,c=s+s,u=o+o,d=a+a,f=s*c,h=s*u,_=s*d,g=o*u,m=o*d,p=a*d,b=l*c,x=l*u,v=l*d,T=n.x,M=n.y,E=n.z;return i[0]=(1-(g+p))*T,i[1]=(h+v)*T,i[2]=(_-x)*T,i[3]=0,i[4]=(h-v)*M,i[5]=(1-(f+p))*M,i[6]=(m+b)*M,i[7]=0,i[8]=(_+x)*E,i[9]=(m-b)*E,i[10]=(1-(f+g))*E,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,n){const i=this.elements;let s=Bo.set(i[0],i[1],i[2]).length();const o=Bo.set(i[4],i[5],i[6]).length(),a=Bo.set(i[8],i[9],i[10]).length();this.determinant()<0&&(s=-s),e.x=i[12],e.y=i[13],e.z=i[14],Qi.copy(this);const c=1/s,u=1/o,d=1/a;return Qi.elements[0]*=c,Qi.elements[1]*=c,Qi.elements[2]*=c,Qi.elements[4]*=u,Qi.elements[5]*=u,Qi.elements[6]*=u,Qi.elements[8]*=d,Qi.elements[9]*=d,Qi.elements[10]*=d,t.setFromRotationMatrix(Qi),n.x=s,n.y=o,n.z=a,this}makePerspective(e,t,n,i,s,o,a=Sr,l=!1){const c=this.elements,u=2*s/(t-e),d=2*s/(n-i),f=(t+e)/(t-e),h=(n+i)/(n-i);let _,g;if(l)_=s/(o-s),g=o*s/(o-s);else if(a===Sr)_=-(o+s)/(o-s),g=-2*o*s/(o-s);else if(a===bu)_=-o/(o-s),g=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=u,c[4]=0,c[8]=f,c[12]=0,c[1]=0,c[5]=d,c[9]=h,c[13]=0,c[2]=0,c[6]=0,c[10]=_,c[14]=g,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,i,s,o,a=Sr,l=!1){const c=this.elements,u=2/(t-e),d=2/(n-i),f=-(t+e)/(t-e),h=-(n+i)/(n-i);let _,g;if(l)_=1/(o-s),g=o/(o-s);else if(a===Sr)_=-2/(o-s),g=-(o+s)/(o-s);else if(a===bu)_=-1/(o-s),g=-s/(o-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=u,c[4]=0,c[8]=0,c[12]=f,c[1]=0,c[5]=d,c[9]=0,c[13]=h,c[2]=0,c[6]=0,c[10]=_,c[14]=g,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<16;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const Bo=new Y,Qi=new bt,Zy=new Y(0,0,0),Jy=new Y(1,1,1),ds=new Y,mc=new Y,Ti=new Y,om=new bt,am=new ks;class Lr{constructor(e=0,t=0,n=0,i=Lr.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,i=this._order){return this._x=e,this._y=t,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const i=e.elements,s=i[0],o=i[4],a=i[8],l=i[1],c=i[5],u=i[9],d=i[2],f=i[6],h=i[10];switch(t){case"XYZ":this._y=Math.asin(Pt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,h),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(f,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Pt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,h),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,s),this._z=0);break;case"ZXY":this._x=Math.asin(Pt(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-d,h),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-Pt(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(f,h),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(Pt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-d,s)):(this._x=0,this._y=Math.atan2(a,h));break;case"XZY":this._z=Math.asin(-Pt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(f,c),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-u,h),this._y=0);break;default:ot("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return om.makeRotationFromQuaternion(e),this.setFromRotationMatrix(om,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return am.setFromEuler(this),this.setFromQuaternion(am,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Lr.DEFAULT_ORDER="XYZ";class $g{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Qy=0;const lm=new Y,zo=new ks,Fr=new bt,gc=new Y,Wa=new Y,eb=new Y,tb=new ks,cm=new Y(1,0,0),um=new Y(0,1,0),dm=new Y(0,0,1),fm={type:"added"},nb={type:"removed"},Vo={type:"childadded",child:null},md={type:"childremoved",child:null};class dn extends Ua{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Qy++}),this.uuid=or(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=dn.DEFAULT_UP.clone();const e=new Y,t=new Lr,n=new ks,i=new Y(1,1,1);function s(){n.setFromEuler(t,!1)}function o(){t.setFromQuaternion(n,void 0,!1)}t._onChange(s),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new bt},normalMatrix:{value:new vt}}),this.matrix=new bt,this.matrixWorld=new bt,this.matrixAutoUpdate=dn.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=dn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new $g,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return zo.setFromAxisAngle(e,t),this.quaternion.multiply(zo),this}rotateOnWorldAxis(e,t){return zo.setFromAxisAngle(e,t),this.quaternion.premultiply(zo),this}rotateX(e){return this.rotateOnAxis(cm,e)}rotateY(e){return this.rotateOnAxis(um,e)}rotateZ(e){return this.rotateOnAxis(dm,e)}translateOnAxis(e,t){return lm.copy(e).applyQuaternion(this.quaternion),this.position.add(lm.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(cm,e)}translateY(e){return this.translateOnAxis(um,e)}translateZ(e){return this.translateOnAxis(dm,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Fr.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?gc.copy(e):gc.set(e,t,n);const i=this.parent;this.updateWorldMatrix(!0,!1),Wa.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Fr.lookAt(Wa,gc,this.up):Fr.lookAt(gc,Wa,this.up),this.quaternion.setFromRotationMatrix(Fr),i&&(Fr.extractRotation(i.matrixWorld),zo.setFromRotationMatrix(Fr),this.quaternion.premultiply(zo.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(Rt("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(fm),Vo.child=e,this.dispatchEvent(Vo),Vo.child=null):Rt("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(nb),md.child=e,this.dispatchEvent(md),md.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Fr.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Fr.multiply(e.parent.matrixWorld)),e.applyMatrix4(Fr),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(fm),Vo.child=e,this.dispatchEvent(Vo),Vo.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,i=this.children.length;n<i;n++){const o=this.children[n].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const i=this.children;for(let s=0,o=i.length;s<o;s++)i[s].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Wa,e,eb),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Wa,tb,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const i=this.children;for(let s=0,o=i.length;s<o;s++)i[s].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),i.instanceInfo=this._instanceInfo.map(a=>({...a})),i.availableInstanceIds=this._availableInstanceIds.slice(),i.availableGeometryIds=this._availableGeometryIds.slice(),i.nextIndexStart=this._nextIndexStart,i.nextVertexStart=this._nextVertexStart,i.geometryCount=this._geometryCount,i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.matricesTexture=this._matricesTexture.toJSON(e),i.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(i.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(i.boundingBox=this.boundingBox.toJSON()));function s(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=s(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const d=l[c];s(e.shapes,d)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(s(e.materials,this.material[l]));i.material=a}else i.material=s(e.materials,this.material);if(this.children.length>0){i.children=[];for(let a=0;a<this.children.length;a++)i.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];i.animations.push(s(e.animations,l))}}if(t){const a=o(e.geometries),l=o(e.materials),c=o(e.textures),u=o(e.images),d=o(e.shapes),f=o(e.skeletons),h=o(e.animations),_=o(e.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),u.length>0&&(n.images=u),d.length>0&&(n.shapes=d),f.length>0&&(n.skeletons=f),h.length>0&&(n.animations=h),_.length>0&&(n.nodes=_)}return n.object=i,n;function o(a){const l=[];for(const c in a){const u=a[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const i=e.children[n];this.add(i.clone())}return this}}dn.DEFAULT_UP=new Y(0,1,0);dn.DEFAULT_MATRIX_AUTO_UPDATE=!0;dn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const er=new Y,Ur=new Y,gd=new Y,kr=new Y,Ho=new Y,Go=new Y,hm=new Y,_d=new Y,xd=new Y,vd=new Y,yd=new zt,bd=new zt,wd=new zt;class ir{constructor(e=new Y,t=new Y,n=new Y){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,i){i.subVectors(n,t),er.subVectors(e,t),i.cross(er);const s=i.lengthSq();return s>0?i.multiplyScalar(1/Math.sqrt(s)):i.set(0,0,0)}static getBarycoord(e,t,n,i,s){er.subVectors(i,t),Ur.subVectors(n,t),gd.subVectors(e,t);const o=er.dot(er),a=er.dot(Ur),l=er.dot(gd),c=Ur.dot(Ur),u=Ur.dot(gd),d=o*c-a*a;if(d===0)return s.set(0,0,0),null;const f=1/d,h=(c*l-a*u)*f,_=(o*u-a*l)*f;return s.set(1-h-_,_,h)}static containsPoint(e,t,n,i){return this.getBarycoord(e,t,n,i,kr)===null?!1:kr.x>=0&&kr.y>=0&&kr.x+kr.y<=1}static getInterpolation(e,t,n,i,s,o,a,l){return this.getBarycoord(e,t,n,i,kr)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,kr.x),l.addScaledVector(o,kr.y),l.addScaledVector(a,kr.z),l)}static getInterpolatedAttribute(e,t,n,i,s,o){return yd.setScalar(0),bd.setScalar(0),wd.setScalar(0),yd.fromBufferAttribute(e,t),bd.fromBufferAttribute(e,n),wd.fromBufferAttribute(e,i),o.setScalar(0),o.addScaledVector(yd,s.x),o.addScaledVector(bd,s.y),o.addScaledVector(wd,s.z),o}static isFrontFacing(e,t,n,i){return er.subVectors(n,t),Ur.subVectors(e,t),er.cross(Ur).dot(i)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,i){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,t,n,i){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return er.subVectors(this.c,this.b),Ur.subVectors(this.a,this.b),er.cross(Ur).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return ir.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return ir.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,i,s){return ir.getInterpolation(e,this.a,this.b,this.c,t,n,i,s)}containsPoint(e){return ir.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return ir.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,i=this.b,s=this.c;let o,a;Ho.subVectors(i,n),Go.subVectors(s,n),_d.subVectors(e,n);const l=Ho.dot(_d),c=Go.dot(_d);if(l<=0&&c<=0)return t.copy(n);xd.subVectors(e,i);const u=Ho.dot(xd),d=Go.dot(xd);if(u>=0&&d<=u)return t.copy(i);const f=l*d-u*c;if(f<=0&&l>=0&&u<=0)return o=l/(l-u),t.copy(n).addScaledVector(Ho,o);vd.subVectors(e,s);const h=Ho.dot(vd),_=Go.dot(vd);if(_>=0&&h<=_)return t.copy(s);const g=h*c-l*_;if(g<=0&&c>=0&&_<=0)return a=c/(c-_),t.copy(n).addScaledVector(Go,a);const m=u*_-h*d;if(m<=0&&d-u>=0&&h-_>=0)return hm.subVectors(s,i),a=(d-u)/(d-u+(h-_)),t.copy(i).addScaledVector(hm,a);const p=1/(m+g+f);return o=g*p,a=f*p,t.copy(n).addScaledVector(Ho,o).addScaledVector(Go,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const jg={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},fs={h:0,s:0,l:0},_c={h:0,s:0,l:0};function Sd(r,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?r+(e-r)*6*t:t<1/2?e:t<2/3?r+(e-r)*6*(2/3-t):r}let je=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const i=e;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Tn){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,It.colorSpaceToWorking(this,t),this}setRGB(e,t,n,i=It.workingColorSpace){return this.r=e,this.g=t,this.b=n,It.colorSpaceToWorking(this,i),this}setHSL(e,t,n,i=It.workingColorSpace){if(e=Qh(e,1),t=Pt(t,0,1),n=Pt(n,0,1),t===0)this.r=this.g=this.b=n;else{const s=n<=.5?n*(1+t):n+t-n*t,o=2*n-s;this.r=Sd(o,s,e+1/3),this.g=Sd(o,s,e),this.b=Sd(o,s,e-1/3)}return It.colorSpaceToWorking(this,i),this}setStyle(e,t=Tn){function n(s){s!==void 0&&parseFloat(s)<1&&ot("Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const o=i[1],a=i[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:ot("Color: Unknown color model "+e)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=i[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(s,16),t);ot("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Tn){const n=jg[e.toLowerCase()];return n!==void 0?this.setHex(n,t):ot("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Qr(e.r),this.g=Qr(e.g),this.b=Qr(e.b),this}copyLinearToSRGB(e){return this.r=ca(e.r),this.g=ca(e.g),this.b=ca(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Tn){return It.workingToColorSpace(Xn.copy(this),e),Math.round(Pt(Xn.r*255,0,255))*65536+Math.round(Pt(Xn.g*255,0,255))*256+Math.round(Pt(Xn.b*255,0,255))}getHexString(e=Tn){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=It.workingColorSpace){It.workingToColorSpace(Xn.copy(this),t);const n=Xn.r,i=Xn.g,s=Xn.b,o=Math.max(n,i,s),a=Math.min(n,i,s);let l,c;const u=(a+o)/2;if(a===o)l=0,c=0;else{const d=o-a;switch(c=u<=.5?d/(o+a):d/(2-o-a),o){case n:l=(i-s)/d+(i<s?6:0);break;case i:l=(s-n)/d+2;break;case s:l=(n-i)/d+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,t=It.workingColorSpace){return It.workingToColorSpace(Xn.copy(this),t),e.r=Xn.r,e.g=Xn.g,e.b=Xn.b,e}getStyle(e=Tn){It.workingToColorSpace(Xn.copy(this),e);const t=Xn.r,n=Xn.g,i=Xn.b;return e!==Tn?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(e,t,n){return this.getHSL(fs),this.setHSL(fs.h+e,fs.s+t,fs.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(fs),e.getHSL(_c);const n=bl(fs.h,_c.h,t),i=bl(fs.s,_c.s,t),s=bl(fs.l,_c.l,t);return this.setHSL(n,i,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,i=this.b,s=e.elements;return this.r=s[0]*t+s[3]*n+s[6]*i,this.g=s[1]*t+s[4]*n+s[7]*i,this.b=s[2]*t+s[5]*n+s[8]*i,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}};const Xn=new je;je.NAMES=jg;let ib=0;class Ar extends Ua{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:ib++}),this.uuid=or(),this.name="",this.type="Material",this.blending=As,this.side=ts,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=df,this.blendDst=ff,this.blendEquation=ro,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new je(0,0,0),this.blendAlpha=0,this.depthFunc=ya,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Qp,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Oo,this.stencilZFail=Oo,this.stencilZPass=Oo,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){ot(`Material: parameter '${t}' has value of undefined.`);continue}const i=this[t];if(i===void 0){ot(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==As&&(n.blending=this.blending),this.side!==ts&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==df&&(n.blendSrc=this.blendSrc),this.blendDst!==ff&&(n.blendDst=this.blendDst),this.blendEquation!==ro&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==ya&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Qp&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Oo&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Oo&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Oo&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(s){const o=[];for(const a in s){const l=s[a];delete l.metadata,o.push(l)}return o}if(t){const s=i(e.textures),o=i(e.images);s.length>0&&(n.textures=s),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const i=t.length;n=new Array(i);for(let s=0;s!==i;++s)n[s]=t[s].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class oo extends Ar{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new je(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Lr,this.combine=Og,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const wn=new Y,xc=new Et;let rb=0;class Qt{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:rb++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Zf,this.updateRanges=[],this.gpuType=sr,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let i=0,s=this.itemSize;i<s;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)xc.fromBufferAttribute(this,t),xc.applyMatrix3(e),this.setXY(t,xc.x,xc.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)wn.fromBufferAttribute(this,t),wn.applyMatrix3(e),this.setXYZ(t,wn.x,wn.y,wn.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)wn.fromBufferAttribute(this,t),wn.applyMatrix4(e),this.setXYZ(t,wn.x,wn.y,wn.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)wn.fromBufferAttribute(this,t),wn.applyNormalMatrix(e),this.setXYZ(t,wn.x,wn.y,wn.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)wn.fromBufferAttribute(this,t),wn.transformDirection(e),this.setXYZ(t,wn.x,wn.y,wn.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=nr(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=$t(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=nr(t,this.array)),t}setX(e,t){return this.normalized&&(t=$t(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=nr(t,this.array)),t}setY(e,t){return this.normalized&&(t=$t(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=nr(t,this.array)),t}setZ(e,t){return this.normalized&&(t=$t(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=nr(t,this.array)),t}setW(e,t){return this.normalized&&(t=$t(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=$t(t,this.array),n=$t(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=$t(t,this.array),n=$t(n,this.array),i=$t(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this}setXYZW(e,t,n,i,s){return e*=this.itemSize,this.normalized&&(t=$t(t,this.array),n=$t(n,this.array),i=$t(i,this.array),s=$t(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Zf&&(e.usage=this.usage),e}}class Kg extends Qt{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class Zg extends Qt{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class $i extends Qt{constructor(e,t,n){super(new Float32Array(e),t,n)}}let sb=0;const Ui=new bt,Md=new dn,Wo=new Y,Ei=new lr,Xa=new lr,Nn=new Y;class mi extends Ua{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:sb++}),this.uuid=or(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(qg(e)?Zg:Kg)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const s=new vt().getNormalMatrix(e);n.applyNormalMatrix(s),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Ui.makeRotationFromQuaternion(e),this.applyMatrix4(Ui),this}rotateX(e){return Ui.makeRotationX(e),this.applyMatrix4(Ui),this}rotateY(e){return Ui.makeRotationY(e),this.applyMatrix4(Ui),this}rotateZ(e){return Ui.makeRotationZ(e),this.applyMatrix4(Ui),this}translate(e,t,n){return Ui.makeTranslation(e,t,n),this.applyMatrix4(Ui),this}scale(e,t,n){return Ui.makeScale(e,t,n),this.applyMatrix4(Ui),this}lookAt(e){return Md.lookAt(e),Md.updateMatrix(),this.applyMatrix4(Md.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Wo).negate(),this.translate(Wo.x,Wo.y,Wo.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let i=0,s=e.length;i<s;i++){const o=e[i];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new $i(n,3))}else{const n=Math.min(e.length,t.count);for(let i=0;i<n;i++){const s=e[i];t.setXYZ(i,s.x,s.y,s.z||0)}e.length>t.count&&ot("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new lr);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Rt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new Y(-1/0,-1/0,-1/0),new Y(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,i=t.length;n<i;n++){const s=t[n];Ei.setFromBufferAttribute(s),this.morphTargetsRelative?(Nn.addVectors(this.boundingBox.min,Ei.min),this.boundingBox.expandByPoint(Nn),Nn.addVectors(this.boundingBox.max,Ei.max),this.boundingBox.expandByPoint(Nn)):(this.boundingBox.expandByPoint(Ei.min),this.boundingBox.expandByPoint(Ei.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Rt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ir);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Rt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new Y,1/0);return}if(e){const n=this.boundingSphere.center;if(Ei.setFromBufferAttribute(e),t)for(let s=0,o=t.length;s<o;s++){const a=t[s];Xa.setFromBufferAttribute(a),this.morphTargetsRelative?(Nn.addVectors(Ei.min,Xa.min),Ei.expandByPoint(Nn),Nn.addVectors(Ei.max,Xa.max),Ei.expandByPoint(Nn)):(Ei.expandByPoint(Xa.min),Ei.expandByPoint(Xa.max))}Ei.getCenter(n);let i=0;for(let s=0,o=e.count;s<o;s++)Nn.fromBufferAttribute(e,s),i=Math.max(i,n.distanceToSquared(Nn));if(t)for(let s=0,o=t.length;s<o;s++){const a=t[s],l=this.morphTargetsRelative;for(let c=0,u=a.count;c<u;c++)Nn.fromBufferAttribute(a,c),l&&(Wo.fromBufferAttribute(e,c),Nn.add(Wo)),i=Math.max(i,n.distanceToSquared(Nn))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&Rt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){Rt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,i=t.normal,s=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Qt(new Float32Array(4*n.count),4));const o=this.getAttribute("tangent"),a=[],l=[];for(let R=0;R<n.count;R++)a[R]=new Y,l[R]=new Y;const c=new Y,u=new Y,d=new Y,f=new Et,h=new Et,_=new Et,g=new Y,m=new Y;function p(R,w,y){c.fromBufferAttribute(n,R),u.fromBufferAttribute(n,w),d.fromBufferAttribute(n,y),f.fromBufferAttribute(s,R),h.fromBufferAttribute(s,w),_.fromBufferAttribute(s,y),u.sub(c),d.sub(c),h.sub(f),_.sub(f);const L=1/(h.x*_.y-_.x*h.y);isFinite(L)&&(g.copy(u).multiplyScalar(_.y).addScaledVector(d,-h.y).multiplyScalar(L),m.copy(d).multiplyScalar(h.x).addScaledVector(u,-_.x).multiplyScalar(L),a[R].add(g),a[w].add(g),a[y].add(g),l[R].add(m),l[w].add(m),l[y].add(m))}let b=this.groups;b.length===0&&(b=[{start:0,count:e.count}]);for(let R=0,w=b.length;R<w;++R){const y=b[R],L=y.start,N=y.count;for(let W=L,j=L+N;W<j;W+=3)p(e.getX(W+0),e.getX(W+1),e.getX(W+2))}const x=new Y,v=new Y,T=new Y,M=new Y;function E(R){T.fromBufferAttribute(i,R),M.copy(T);const w=a[R];x.copy(w),x.sub(T.multiplyScalar(T.dot(w))).normalize(),v.crossVectors(M,w);const L=v.dot(l[R])<0?-1:1;o.setXYZW(R,x.x,x.y,x.z,L)}for(let R=0,w=b.length;R<w;++R){const y=b[R],L=y.start,N=y.count;for(let W=L,j=L+N;W<j;W+=3)E(e.getX(W+0)),E(e.getX(W+1)),E(e.getX(W+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Qt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let f=0,h=n.count;f<h;f++)n.setXYZ(f,0,0,0);const i=new Y,s=new Y,o=new Y,a=new Y,l=new Y,c=new Y,u=new Y,d=new Y;if(e)for(let f=0,h=e.count;f<h;f+=3){const _=e.getX(f+0),g=e.getX(f+1),m=e.getX(f+2);i.fromBufferAttribute(t,_),s.fromBufferAttribute(t,g),o.fromBufferAttribute(t,m),u.subVectors(o,s),d.subVectors(i,s),u.cross(d),a.fromBufferAttribute(n,_),l.fromBufferAttribute(n,g),c.fromBufferAttribute(n,m),a.add(u),l.add(u),c.add(u),n.setXYZ(_,a.x,a.y,a.z),n.setXYZ(g,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let f=0,h=t.count;f<h;f+=3)i.fromBufferAttribute(t,f+0),s.fromBufferAttribute(t,f+1),o.fromBufferAttribute(t,f+2),u.subVectors(o,s),d.subVectors(i,s),u.cross(d),n.setXYZ(f+0,u.x,u.y,u.z),n.setXYZ(f+1,u.x,u.y,u.z),n.setXYZ(f+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Nn.fromBufferAttribute(e,t),Nn.normalize(),e.setXYZ(t,Nn.x,Nn.y,Nn.z)}toNonIndexed(){function e(a,l){const c=a.array,u=a.itemSize,d=a.normalized,f=new c.constructor(l.length*u);let h=0,_=0;for(let g=0,m=l.length;g<m;g++){a.isInterleavedBufferAttribute?h=l[g]*a.data.stride+a.offset:h=l[g]*u;for(let p=0;p<u;p++)f[_++]=c[h++]}return new Qt(f,u,d)}if(this.index===null)return ot("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new mi,n=this.index.array,i=this.attributes;for(const a in i){const l=i[a],c=e(l,n);t.setAttribute(a,c)}const s=this.morphAttributes;for(const a in s){const l=[],c=s[a];for(let u=0,d=c.length;u<d;u++){const f=c[u],h=e(f,n);l.push(h)}t.morphAttributes[a]=l}t.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const l in n){const c=n[l];e.data.attributes[l]=c.toJSON(e.data)}const i={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let d=0,f=c.length;d<f;d++){const h=c[d];u.push(h.toJSON(e.data))}u.length>0&&(i[l]=u,s=!0)}s&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere=a.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone());const i=e.attributes;for(const c in i){const u=i[c];this.setAttribute(c,u.clone(t))}const s=e.morphAttributes;for(const c in s){const u=[],d=s[c];for(let f=0,h=d.length;f<h;f++)u.push(d[f].clone(t));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let c=0,u=o.length;c<u;c++){const d=o[c];this.addGroup(d.start,d.count,d.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const pm=new bt,Xs=new Wu,vc=new Ir,mm=new Y,yc=new Y,bc=new Y,wc=new Y,Td=new Y,Sc=new Y,gm=new Y,Mc=new Y;class Qn extends dn{constructor(e=new mi,t=new oo){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=i.length;s<o;s++){const a=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(e,t){const n=this.geometry,i=n.attributes.position,s=n.morphAttributes.position,o=n.morphTargetsRelative;t.fromBufferAttribute(i,e);const a=this.morphTargetInfluences;if(s&&a){Sc.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const u=a[l],d=s[l];u!==0&&(Td.fromBufferAttribute(d,e),o?Sc.addScaledVector(Td,u):Sc.addScaledVector(Td.sub(t),u))}t.add(Sc)}return t}raycast(e,t){const n=this.geometry,i=this.material,s=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),vc.copy(n.boundingSphere),vc.applyMatrix4(s),Xs.copy(e.ray).recast(e.near),!(vc.containsPoint(Xs.origin)===!1&&(Xs.intersectSphere(vc,mm)===null||Xs.origin.distanceToSquared(mm)>(e.far-e.near)**2))&&(pm.copy(s).invert(),Xs.copy(e.ray).applyMatrix4(pm),!(n.boundingBox!==null&&Xs.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Xs)))}_computeIntersections(e,t,n){let i;const s=this.geometry,o=this.material,a=s.index,l=s.attributes.position,c=s.attributes.uv,u=s.attributes.uv1,d=s.attributes.normal,f=s.groups,h=s.drawRange;if(a!==null)if(Array.isArray(o))for(let _=0,g=f.length;_<g;_++){const m=f[_],p=o[m.materialIndex],b=Math.max(m.start,h.start),x=Math.min(a.count,Math.min(m.start+m.count,h.start+h.count));for(let v=b,T=x;v<T;v+=3){const M=a.getX(v),E=a.getX(v+1),R=a.getX(v+2);i=Tc(this,p,e,n,c,u,d,M,E,R),i&&(i.faceIndex=Math.floor(v/3),i.face.materialIndex=m.materialIndex,t.push(i))}}else{const _=Math.max(0,h.start),g=Math.min(a.count,h.start+h.count);for(let m=_,p=g;m<p;m+=3){const b=a.getX(m),x=a.getX(m+1),v=a.getX(m+2);i=Tc(this,o,e,n,c,u,d,b,x,v),i&&(i.faceIndex=Math.floor(m/3),t.push(i))}}else if(l!==void 0)if(Array.isArray(o))for(let _=0,g=f.length;_<g;_++){const m=f[_],p=o[m.materialIndex],b=Math.max(m.start,h.start),x=Math.min(l.count,Math.min(m.start+m.count,h.start+h.count));for(let v=b,T=x;v<T;v+=3){const M=v,E=v+1,R=v+2;i=Tc(this,p,e,n,c,u,d,M,E,R),i&&(i.faceIndex=Math.floor(v/3),i.face.materialIndex=m.materialIndex,t.push(i))}}else{const _=Math.max(0,h.start),g=Math.min(l.count,h.start+h.count);for(let m=_,p=g;m<p;m+=3){const b=m,x=m+1,v=m+2;i=Tc(this,o,e,n,c,u,d,b,x,v),i&&(i.faceIndex=Math.floor(m/3),t.push(i))}}}}function ob(r,e,t,n,i,s,o,a){let l;if(e.side===xi?l=n.intersectTriangle(o,s,i,!0,a):l=n.intersectTriangle(i,s,o,e.side===ts,a),l===null)return null;Mc.copy(a),Mc.applyMatrix4(r.matrixWorld);const c=t.ray.origin.distanceTo(Mc);return c<t.near||c>t.far?null:{distance:c,point:Mc.clone(),object:r}}function Tc(r,e,t,n,i,s,o,a,l,c){r.getVertexPosition(a,yc),r.getVertexPosition(l,bc),r.getVertexPosition(c,wc);const u=ob(r,e,t,n,yc,bc,wc,gm);if(u){const d=new Y;ir.getBarycoord(gm,yc,bc,wc,d),i&&(u.uv=ir.getInterpolatedAttribute(i,a,l,c,d,new Et)),s&&(u.uv1=ir.getInterpolatedAttribute(s,a,l,c,d,new Et)),o&&(u.normal=ir.getInterpolatedAttribute(o,a,l,c,d,new Y),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));const f={a,b:l,c,normal:new Y,materialIndex:0};ir.getNormal(yc,bc,wc,f.normal),u.face=f,u.barycoord=d}return u}class sc extends mi{constructor(e=1,t=1,n=1,i=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:i,heightSegments:s,depthSegments:o};const a=this;i=Math.floor(i),s=Math.floor(s),o=Math.floor(o);const l=[],c=[],u=[],d=[];let f=0,h=0;_("z","y","x",-1,-1,n,t,e,o,s,0),_("z","y","x",1,-1,n,t,-e,o,s,1),_("x","z","y",1,1,e,n,t,i,o,2),_("x","z","y",1,-1,e,n,-t,i,o,3),_("x","y","z",1,-1,e,t,n,i,s,4),_("x","y","z",-1,-1,e,t,-n,i,s,5),this.setIndex(l),this.setAttribute("position",new $i(c,3)),this.setAttribute("normal",new $i(u,3)),this.setAttribute("uv",new $i(d,2));function _(g,m,p,b,x,v,T,M,E,R,w){const y=v/E,L=T/R,N=v/2,W=T/2,j=M/2,k=E+1,J=R+1;let te=0,F=0;const ue=new Y;for(let O=0;O<J;O++){const $=O*L-W;for(let P=0;P<k;P++){const _e=P*y-N;ue[g]=_e*b,ue[m]=$*x,ue[p]=j,c.push(ue.x,ue.y,ue.z),ue[g]=0,ue[m]=0,ue[p]=M>0?1:-1,u.push(ue.x,ue.y,ue.z),d.push(P/E),d.push(1-O/R),te+=1}}for(let O=0;O<R;O++)for(let $=0;$<E;$++){const P=f+$+k*O,_e=f+$+k*(O+1),we=f+($+1)+k*(O+1),Se=f+($+1)+k*O;l.push(P,_e,Se),l.push(_e,we,Se),F+=6}a.addGroup(h,F,w),h+=F,f+=te}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new sc(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Ta(r){const e={};for(const t in r){e[t]={};for(const n in r[t]){const i=r[t][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(ot("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=i.clone():Array.isArray(i)?e[t][n]=i.slice():e[t][n]=i}}return e}function si(r){const e={};for(let t=0;t<r.length;t++){const n=Ta(r[t]);for(const i in n)e[i]=n[i]}return e}function ab(r){const e=[];for(let t=0;t<r.length;t++)e.push(r[t].clone());return e}function Jg(r){const e=r.getRenderTarget();return e===null?r.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:It.workingColorSpace}const lb={clone:Ta,merge:si};var cb=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,ub=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class hi extends Ar{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=cb,this.fragmentShader=ub,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Ta(e.uniforms),this.uniformsGroups=ab(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const i in this.uniforms){const o=this.uniforms[i].value;o&&o.isTexture?t.uniforms[i]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[i]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[i]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[i]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[i]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[i]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[i]={type:"m4",value:o.toArray()}:t.uniforms[i]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class tp extends dn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new bt,this.projectionMatrix=new bt,this.projectionMatrixInverse=new bt,this.coordinateSystem=Sr,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const hs=new Y,_m=new Et,xm=new Et;class ci extends tp{constructor(e=50,t=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Ma*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(yl*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Ma*2*Math.atan(Math.tan(yl*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){hs.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(hs.x,hs.y).multiplyScalar(-e/hs.z),hs.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(hs.x,hs.y).multiplyScalar(-e/hs.z)}getViewSize(e,t){return this.getViewBounds(e,_m,xm),t.subVectors(xm,_m)}setViewOffset(e,t,n,i,s,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(yl*.5*this.fov)/this.zoom,n=2*t,i=this.aspect*n,s=-.5*i;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;s+=o.offsetX*i/l,t-=o.offsetY*n/c,i*=o.width/l,n*=o.height/c}const a=this.filmOffset;a!==0&&(s+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+i,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const Xo=-90,qo=1;class db extends dn{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const i=new ci(Xo,qo,e,t);i.layers=this.layers,this.add(i);const s=new ci(Xo,qo,e,t);s.layers=this.layers,this.add(s);const o=new ci(Xo,qo,e,t);o.layers=this.layers,this.add(o);const a=new ci(Xo,qo,e,t);a.layers=this.layers,this.add(a);const l=new ci(Xo,qo,e,t);l.layers=this.layers,this.add(l);const c=new ci(Xo,qo,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,i,s,o,a,l]=t;for(const c of t)this.remove(c);if(e===Sr)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===bu)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,o,a,l,c,u]=this.children,d=e.getRenderTarget(),f=e.getActiveCubeFace(),h=e.getActiveMipmapLevel(),_=e.xr.enabled;e.xr.enabled=!1;const g=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,i),e.render(t,s),e.setRenderTarget(n,1,i),e.render(t,o),e.setRenderTarget(n,2,i),e.render(t,a),e.setRenderTarget(n,3,i),e.render(t,l),e.setRenderTarget(n,4,i),e.render(t,c),n.texture.generateMipmaps=g,e.setRenderTarget(n,5,i),e.render(t,u),e.setRenderTarget(d,f,h),e.xr.enabled=_,n.texture.needsPMREMUpdate=!0}}class Qg extends Pn{constructor(e=[],t=ba,n,i,s,o,a,l,c,u){super(e,t,n,i,s,o,a,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class fb extends Is{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},i=[n,n,n,n,n,n];this.texture=new Qg(i),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},i=new sc(5,5,5),s=new hi({name:"CubemapFromEquirect",uniforms:Ta(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:xi,blending:Jr});s.uniforms.tEquirect.value=t;const o=new Qn(i,s),a=t.minFilter;return t.minFilter===Yr&&(t.minFilter=Kn),new db(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t=!0,n=!0,i=!0){const s=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,n,i);e.setRenderTarget(s)}}class $r extends dn{constructor(){super(),this.isGroup=!0,this.type="Group"}}const hb={type:"move"};class Ed{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new $r,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new $r,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new Y,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new Y),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new $r,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new Y,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new Y),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let i=null,s=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){o=!0;for(const g of e.hand.values()){const m=t.getJointPose(g,n),p=this._getHandJoint(c,g);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const u=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],f=u.position.distanceTo(d.position),h=.02,_=.005;c.inputState.pinching&&f>h+_?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&f<=h-_&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,n),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(i=t.getPose(e.targetRaySpace,n),i===null&&s!==null&&(i=s),i!==null&&(a.matrix.fromArray(i.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,i.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(i.linearVelocity)):a.hasLinearVelocity=!1,i.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(i.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(hb)))}return a!==null&&(a.visible=i!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new $r;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}class Su extends dn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Lr,this.environmentIntensity=1,this.environmentRotation=new Lr,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class e_{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Zf,this.updateRanges=[],this.version=0,this.uuid=or()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let i=0,s=this.stride;i<s;i++)this.array[e+i]=t.array[n+i];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=or()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=or()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const ni=new Y;class Xu{constructor(e,t,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)ni.fromBufferAttribute(this,t),ni.applyMatrix4(e),this.setXYZ(t,ni.x,ni.y,ni.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)ni.fromBufferAttribute(this,t),ni.applyNormalMatrix(e),this.setXYZ(t,ni.x,ni.y,ni.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)ni.fromBufferAttribute(this,t),ni.transformDirection(e),this.setXYZ(t,ni.x,ni.y,ni.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=nr(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=$t(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=$t(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=$t(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=$t(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=$t(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=nr(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=nr(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=nr(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=nr(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=$t(t,this.array),n=$t(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=$t(t,this.array),n=$t(n,this.array),i=$t(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this}setXYZW(e,t,n,i,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=$t(t,this.array),n=$t(n,this.array),i=$t(i,this.array),s=$t(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this.data.array[e+3]=s,this}clone(e){if(e===void 0){wu("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[i+s])}return new Qt(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new Xu(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){wu("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[i+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}const vm=new Y,ym=new zt,bm=new zt,pb=new Y,wm=new bt,Ec=new Y,Ad=new Ir,Sm=new bt,Cd=new Wu;class mb extends Qn{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=jp,this.bindMatrix=new bt,this.bindMatrixInverse=new bt,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){const e=this.geometry;this.boundingBox===null&&(this.boundingBox=new lr),this.boundingBox.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Ec),this.boundingBox.expandByPoint(Ec)}computeBoundingSphere(){const e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new Ir),this.boundingSphere.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Ec),this.boundingSphere.expandByPoint(Ec)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){const n=this.material,i=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Ad.copy(this.boundingSphere),Ad.applyMatrix4(i),e.ray.intersectsSphere(Ad)!==!1&&(Sm.copy(i).invert(),Cd.copy(e.ray).applyMatrix4(Sm),!(this.boundingBox!==null&&Cd.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,Cd)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const e=new zt,t=this.geometry.attributes.skinWeight;for(let n=0,i=t.count;n<i;n++){e.fromBufferAttribute(t,n);const s=1/e.manhattanLength();s!==1/0?e.multiplyScalar(s):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===jp?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===fy?this.bindMatrixInverse.copy(this.bindMatrix).invert():ot("SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){const n=this.skeleton,i=this.geometry;ym.fromBufferAttribute(i.attributes.skinIndex,e),bm.fromBufferAttribute(i.attributes.skinWeight,e),vm.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let s=0;s<4;s++){const o=bm.getComponent(s);if(o!==0){const a=ym.getComponent(s);wm.multiplyMatrices(n.bones[a].matrixWorld,n.boneInverses[a]),t.addScaledVector(pb.copy(vm).applyMatrix4(wm),o)}}return t.applyMatrix4(this.bindMatrixInverse)}}class t_ extends dn{constructor(){super(),this.isBone=!0,this.type="Bone"}}class np extends Pn{constructor(e=null,t=1,n=1,i,s,o,a,l,c=pi,u=pi,d,f){super(null,o,a,l,c,u,i,s,d,f),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Mm=new bt,gb=new bt;class ip{constructor(e=[],t=[]){this.uuid=or(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){const e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){ot("Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,i=this.bones.length;n<i;n++)this.boneInverses.push(new bt)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){const n=new bt;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){const e=this.bones,t=this.boneInverses,n=this.boneMatrices,i=this.boneTexture;for(let s=0,o=e.length;s<o;s++){const a=e[s]?e[s].matrixWorld:gb;Mm.multiplyMatrices(a,t[s]),Mm.toArray(n,s*16)}i!==null&&(i.needsUpdate=!0)}clone(){return new ip(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);const t=new Float32Array(e*e*4);t.set(this.boneMatrices);const n=new np(t,e,e,Xi,sr);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){const i=this.bones[t];if(i.name===e)return i}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,i=e.bones.length;n<i;n++){const s=e.bones[n];let o=t[s];o===void 0&&(ot("Skeleton: No bone found with UUID:",s),o=new t_),this.bones.push(o),this.boneInverses.push(new bt().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){const e={metadata:{version:4.7,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;const t=this.bones,n=this.boneInverses;for(let i=0,s=t.length;i<s;i++){const o=t[i];e.bones.push(o.uuid);const a=n[i];e.boneInverses.push(a.toArray())}return e}}class Jf extends Qt{constructor(e,t,n,i=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const Yo=new bt,Tm=new bt,Ac=[],Em=new lr,_b=new bt,qa=new Qn,Ya=new Ir;class n_ extends Qn{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Jf(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,_b)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new lr),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Yo),Em.copy(e.boundingBox).applyMatrix4(Yo),this.boundingBox.union(Em)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Ir),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Yo),Ya.copy(e.boundingSphere).applyMatrix4(Yo),this.boundingSphere.union(Ya)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const n=t.morphTargetInfluences,i=this.morphTexture.source.data.data,s=n.length+1,o=e*s+1;for(let a=0;a<n.length;a++)n[a]=i[o+a]}raycast(e,t){const n=this.matrixWorld,i=this.count;if(qa.geometry=this.geometry,qa.material=this.material,qa.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Ya.copy(this.boundingSphere),Ya.applyMatrix4(n),e.ray.intersectsSphere(Ya)!==!1))for(let s=0;s<i;s++){this.getMatrixAt(s,Yo),Tm.multiplyMatrices(n,Yo),qa.matrixWorld=Tm,qa.raycast(e,Ac);for(let o=0,a=Ac.length;o<a;o++){const l=Ac[o];l.instanceId=s,l.object=this,t.push(l)}Ac.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new Jf(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){const n=t.morphTargetInfluences,i=n.length+1;this.morphTexture===null&&(this.morphTexture=new np(new Float32Array(i*this.count),i,this.count,$h,sr));const s=this.morphTexture.source.data.data;let o=0;for(let c=0;c<n.length;c++)o+=n[c];const a=this.geometry.morphTargetsRelative?1:1-o,l=i*e;s[l]=a,s.set(n,l+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const Rd=new Y,xb=new Y,vb=new vt;class Qs{constructor(e=new Y(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,i){return this.normal.set(e,t,n),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const i=Rd.subVectors(n,t).cross(xb.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(Rd),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/i;return s<0||s>1?null:t.copy(e.start).addScaledVector(n,s)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||vb.getNormalMatrix(e),i=this.coplanarPoint(Rd).applyMatrix4(e),s=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const qs=new Ir,yb=new Et(.5,.5),Cc=new Y;class rp{constructor(e=new Qs,t=new Qs,n=new Qs,i=new Qs,s=new Qs,o=new Qs){this.planes=[e,t,n,i,s,o]}set(e,t,n,i,s,o){const a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(n),a[3].copy(i),a[4].copy(s),a[5].copy(o),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Sr,n=!1){const i=this.planes,s=e.elements,o=s[0],a=s[1],l=s[2],c=s[3],u=s[4],d=s[5],f=s[6],h=s[7],_=s[8],g=s[9],m=s[10],p=s[11],b=s[12],x=s[13],v=s[14],T=s[15];if(i[0].setComponents(c-o,h-u,p-_,T-b).normalize(),i[1].setComponents(c+o,h+u,p+_,T+b).normalize(),i[2].setComponents(c+a,h+d,p+g,T+x).normalize(),i[3].setComponents(c-a,h-d,p-g,T-x).normalize(),n)i[4].setComponents(l,f,m,v).normalize(),i[5].setComponents(c-l,h-f,p-m,T-v).normalize();else if(i[4].setComponents(c-l,h-f,p-m,T-v).normalize(),t===Sr)i[5].setComponents(c+l,h+f,p+m,T+v).normalize();else if(t===bu)i[5].setComponents(l,f,m,v).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),qs.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),qs.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(qs)}intersectsSprite(e){qs.center.set(0,0,0);const t=yb.distanceTo(e.center);return qs.radius=.7071067811865476+t,qs.applyMatrix4(e.matrixWorld),this.intersectsSphere(qs)}intersectsSphere(e){const t=this.planes,n=e.center,i=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(n)<i)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const i=t[n];if(Cc.x=i.normal.x>0?e.max.x:e.min.x,Cc.y=i.normal.y>0?e.max.y:e.min.y,Cc.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint(Cc)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class i_ extends Ar{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new je(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Mu=new Y,Tu=new Y,Am=new bt,$a=new Wu,Rc=new Ir,Pd=new Y,Cm=new Y;class sp extends dn{constructor(e=new mi,t=new i_){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let i=1,s=t.count;i<s;i++)Mu.fromBufferAttribute(t,i-1),Tu.fromBufferAttribute(t,i),n[i]=n[i-1],n[i]+=Mu.distanceTo(Tu);e.setAttribute("lineDistance",new $i(n,1))}else ot("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,s=e.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Rc.copy(n.boundingSphere),Rc.applyMatrix4(i),Rc.radius+=s,e.ray.intersectsSphere(Rc)===!1)return;Am.copy(i).invert(),$a.copy(e.ray).applyMatrix4(Am);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=this.isLineSegments?2:1,u=n.index,f=n.attributes.position;if(u!==null){const h=Math.max(0,o.start),_=Math.min(u.count,o.start+o.count);for(let g=h,m=_-1;g<m;g+=c){const p=u.getX(g),b=u.getX(g+1),x=Pc(this,e,$a,l,p,b,g);x&&t.push(x)}if(this.isLineLoop){const g=u.getX(_-1),m=u.getX(h),p=Pc(this,e,$a,l,g,m,_-1);p&&t.push(p)}}else{const h=Math.max(0,o.start),_=Math.min(f.count,o.start+o.count);for(let g=h,m=_-1;g<m;g+=c){const p=Pc(this,e,$a,l,g,g+1,g);p&&t.push(p)}if(this.isLineLoop){const g=Pc(this,e,$a,l,_-1,h,_-1);g&&t.push(g)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=i.length;s<o;s++){const a=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}function Pc(r,e,t,n,i,s,o){const a=r.geometry.attributes.position;if(Mu.fromBufferAttribute(a,i),Tu.fromBufferAttribute(a,s),t.distanceSqToSegment(Mu,Tu,Pd,Cm)>n)return;Pd.applyMatrix4(r.matrixWorld);const c=e.ray.origin.distanceTo(Pd);if(!(c<e.near||c>e.far))return{distance:c,point:Cm.clone().applyMatrix4(r.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:r}}const Rm=new Y,Pm=new Y;class bb extends sp{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[];for(let i=0,s=t.count;i<s;i+=2)Rm.fromBufferAttribute(t,i),Pm.fromBufferAttribute(t,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+Rm.distanceTo(Pm);e.setAttribute("lineDistance",new $i(n,1))}else ot("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class wb extends sp{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}}class r_ extends Ar{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new je(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const Lm=new bt,Qf=new Wu,Lc=new Ir,Dc=new Y;class eh extends dn{constructor(e=new mi,t=new r_){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,s=e.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Lc.copy(n.boundingSphere),Lc.applyMatrix4(i),Lc.radius+=s,e.ray.intersectsSphere(Lc)===!1)return;Lm.copy(i).invert(),Qf.copy(e.ray).applyMatrix4(Lm);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=n.index,d=n.attributes.position;if(c!==null){const f=Math.max(0,o.start),h=Math.min(c.count,o.start+o.count);for(let _=f,g=h;_<g;_++){const m=c.getX(_);Dc.fromBufferAttribute(d,m),Dm(Dc,m,l,i,e,t,this)}}else{const f=Math.max(0,o.start),h=Math.min(d.count,o.start+o.count);for(let _=f,g=h;_<g;_++)Dc.fromBufferAttribute(d,_),Dm(Dc,_,l,i,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=i.length;s<o;s++){const a=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}function Dm(r,e,t,n,i,s,o){const a=Qf.distanceSqToPoint(r);if(a<t){const l=new Y;Qf.closestPointToPoint(r,l),l.applyMatrix4(n);const c=i.ray.origin.distanceTo(l);if(c<i.near||c>i.far)return;s.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:o})}}class s_ extends Pn{constructor(e,t,n=bo,i,s,o,a=pi,l=pi,c,u=Vl,d=1){if(u!==Vl&&u!==Hl)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const f={width:e,height:t,depth:d};super(f,i,s,o,a,l,u,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new ep(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class o_ extends Pn{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class Vi extends mi{constructor(e=1,t=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:i};const s=e/2,o=t/2,a=Math.floor(n),l=Math.floor(i),c=a+1,u=l+1,d=e/a,f=t/l,h=[],_=[],g=[],m=[];for(let p=0;p<u;p++){const b=p*f-o;for(let x=0;x<c;x++){const v=x*d-s;_.push(v,-b,0),g.push(0,0,1),m.push(x/a),m.push(1-p/l)}}for(let p=0;p<l;p++)for(let b=0;b<a;b++){const x=b+c*p,v=b+c*(p+1),T=b+1+c*(p+1),M=b+1+c*p;h.push(x,v,M),h.push(v,T,M)}this.setIndex(h),this.setAttribute("position",new $i(_,3)),this.setAttribute("normal",new $i(g,3)),this.setAttribute("uv",new $i(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Vi(e.width,e.height,e.widthSegments,e.heightSegments)}}class qu extends mi{constructor(e=1,t=32,n=16,i=0,s=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:i,phiLength:s,thetaStart:o,thetaLength:a},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const l=Math.min(o+a,Math.PI);let c=0;const u=[],d=new Y,f=new Y,h=[],_=[],g=[],m=[];for(let p=0;p<=n;p++){const b=[],x=p/n;let v=0;p===0&&o===0?v=.5/t:p===n&&l===Math.PI&&(v=-.5/t);for(let T=0;T<=t;T++){const M=T/t;d.x=-e*Math.cos(i+M*s)*Math.sin(o+x*a),d.y=e*Math.cos(o+x*a),d.z=e*Math.sin(i+M*s)*Math.sin(o+x*a),_.push(d.x,d.y,d.z),f.copy(d).normalize(),g.push(f.x,f.y,f.z),m.push(M+v,1-x),b.push(c++)}u.push(b)}for(let p=0;p<n;p++)for(let b=0;b<t;b++){const x=u[p][b+1],v=u[p][b],T=u[p+1][b],M=u[p+1][b+1];(p!==0||o>0)&&h.push(x,v,M),(p!==n-1||l<Math.PI)&&h.push(v,T,M)}this.setIndex(h),this.setAttribute("position",new $i(_,3)),this.setAttribute("normal",new $i(g,3)),this.setAttribute("uv",new $i(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new qu(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class op extends Ar{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new je(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new je(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Wg,this.normalScale=new Et(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Lr,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class cr extends op{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new Et(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Pt(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new je(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new je(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new je(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}class Sb extends Ar{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=my,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Mb extends Ar{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}function Ic(r,e){return!r||r.constructor===e?r:typeof e.BYTES_PER_ELEMENT=="number"?new e(r):Array.prototype.slice.call(r)}function Tb(r){return ArrayBuffer.isView(r)&&!(r instanceof DataView)}function Eb(r){function e(i,s){return r[i]-r[s]}const t=r.length,n=new Array(t);for(let i=0;i!==t;++i)n[i]=i;return n.sort(e),n}function Im(r,e,t){const n=r.length,i=new r.constructor(n);for(let s=0,o=0;o!==n;++s){const a=t[s]*e;for(let l=0;l!==e;++l)i[o++]=r[a+l]}return i}function a_(r,e,t,n){let i=1,s=r[0];for(;s!==void 0&&s[n]===void 0;)s=r[i++];if(s===void 0)return;let o=s[n];if(o!==void 0)if(Array.isArray(o))do o=s[n],o!==void 0&&(e.push(s.time),t.push(...o)),s=r[i++];while(s!==void 0);else if(o.toArray!==void 0)do o=s[n],o!==void 0&&(e.push(s.time),o.toArray(t,t.length)),s=r[i++];while(s!==void 0);else do o=s[n],o!==void 0&&(e.push(s.time),t.push(o)),s=r[i++];while(s!==void 0)}class oc{constructor(e,t,n,i){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){const t=this.parameterPositions;let n=this._cachedIndex,i=t[n],s=t[n-1];n:{e:{let o;t:{i:if(!(e<i)){for(let a=n+2;;){if(i===void 0){if(e<s)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(s=i,i=t[++n],e<i)break e}o=t.length;break t}if(!(e>=s)){const a=t[1];e<a&&(n=2,s=a);for(let l=n-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(i=s,s=t[--n-1],e>=s)break e}o=n,n=0;break t}break n}for(;n<o;){const a=n+o>>>1;e<t[a]?o=a:n=a+1}if(i=t[n],s=t[n-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,s,i)}return this.interpolate_(n,s,e,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,s=e*i;for(let o=0;o!==i;++o)t[o]=n[s+o];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}}class Ab extends oc{constructor(e,t,n,i){super(e,t,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Kp,endingEnd:Kp}}intervalChanged_(e,t,n){const i=this.parameterPositions;let s=e-2,o=e+1,a=i[s],l=i[o];if(a===void 0)switch(this.getSettings_().endingStart){case Zp:s=e,a=2*t-n;break;case Jp:s=i.length-2,a=t+i[s]-i[s+1];break;default:s=e,a=n}if(l===void 0)switch(this.getSettings_().endingEnd){case Zp:o=e,l=2*n-t;break;case Jp:o=1,l=n+i[1]-i[0];break;default:o=e-1,l=t}const c=(n-t)*.5,u=this.valueSize;this._weightPrev=c/(t-a),this._weightNext=c/(l-n),this._offsetPrev=s*u,this._offsetNext=o*u}interpolate_(e,t,n,i){const s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,u=this._offsetPrev,d=this._offsetNext,f=this._weightPrev,h=this._weightNext,_=(n-t)/(i-t),g=_*_,m=g*_,p=-f*m+2*f*g-f*_,b=(1+f)*m+(-1.5-2*f)*g+(-.5+f)*_+1,x=(-1-h)*m+(1.5+h)*g+.5*_,v=h*m-h*g;for(let T=0;T!==a;++T)s[T]=p*o[u+T]+b*o[c+T]+x*o[l+T]+v*o[d+T];return s}}class Cb extends oc{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){const s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,u=(n-t)/(i-t),d=1-u;for(let f=0;f!==a;++f)s[f]=o[c+f]*d+o[l+f]*u;return s}}class Rb extends oc{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e){return this.copySampleValue_(e-1)}}class ur{constructor(e,t,n,i){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=Ic(t,this.TimeBufferType),this.values=Ic(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(e){const t=e.constructor;let n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:Ic(e.times,Array),values:Ic(e.values,Array)};const i=e.getInterpolation();i!==e.DefaultInterpolation&&(n.interpolation=i)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new Rb(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Cb(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Ab(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case Gl:t=this.InterpolantFactoryMethodDiscrete;break;case Wl:t=this.InterpolantFactoryMethodLinear;break;case sd:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){const n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return ot("KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Gl;case this.InterpolantFactoryMethodLinear:return Wl;case this.InterpolantFactoryMethodSmooth:return sd}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){const t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]+=e}return this}scale(e){if(e!==1){const t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]*=e}return this}trim(e,t){const n=this.times,i=n.length;let s=0,o=i-1;for(;s!==i&&n[s]<e;)++s;for(;o!==-1&&n[o]>t;)--o;if(++o,s!==0||o!==i){s>=o&&(o=Math.max(o,1),s=o-1);const a=this.getValueSize();this.times=n.slice(s,o),this.values=this.values.slice(s*a,o*a)}return this}validate(){let e=!0;const t=this.getValueSize();t-Math.floor(t)!==0&&(Rt("KeyframeTrack: Invalid value size in track.",this),e=!1);const n=this.times,i=this.values,s=n.length;s===0&&(Rt("KeyframeTrack: Track is empty.",this),e=!1);let o=null;for(let a=0;a!==s;a++){const l=n[a];if(typeof l=="number"&&isNaN(l)){Rt("KeyframeTrack: Time is not a valid number.",this,a,l),e=!1;break}if(o!==null&&o>l){Rt("KeyframeTrack: Out of order keys.",this,a,l,o),e=!1;break}o=l}if(i!==void 0&&Tb(i))for(let a=0,l=i.length;a!==l;++a){const c=i[a];if(isNaN(c)){Rt("KeyframeTrack: Value is not a valid number.",this,a,c),e=!1;break}}return e}optimize(){const e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===sd,s=e.length-1;let o=1;for(let a=1;a<s;++a){let l=!1;const c=e[a],u=e[a+1];if(c!==u&&(a!==1||c!==e[0]))if(i)l=!0;else{const d=a*n,f=d-n,h=d+n;for(let _=0;_!==n;++_){const g=t[d+_];if(g!==t[f+_]||g!==t[h+_]){l=!0;break}}}if(l){if(a!==o){e[o]=e[a];const d=a*n,f=o*n;for(let h=0;h!==n;++h)t[f+h]=t[d+h]}++o}}if(s>0){e[o]=e[s];for(let a=s*n,l=o*n,c=0;c!==n;++c)t[l+c]=t[a+c];++o}return o!==e.length?(this.times=e.slice(0,o),this.values=t.slice(0,o*n)):(this.times=e,this.values=t),this}clone(){const e=this.times.slice(),t=this.values.slice(),n=this.constructor,i=new n(this.name,e,t);return i.createInterpolant=this.createInterpolant,i}}ur.prototype.ValueTypeName="";ur.prototype.TimeBufferType=Float32Array;ur.prototype.ValueBufferType=Float32Array;ur.prototype.DefaultInterpolation=Wl;class ka extends ur{constructor(e,t,n){super(e,t,n)}}ka.prototype.ValueTypeName="bool";ka.prototype.ValueBufferType=Array;ka.prototype.DefaultInterpolation=Gl;ka.prototype.InterpolantFactoryMethodLinear=void 0;ka.prototype.InterpolantFactoryMethodSmooth=void 0;class l_ extends ur{constructor(e,t,n,i){super(e,t,n,i)}}l_.prototype.ValueTypeName="color";class Ea extends ur{constructor(e,t,n,i){super(e,t,n,i)}}Ea.prototype.ValueTypeName="number";class Pb extends oc{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){const s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=(n-t)/(i-t);let c=e*a;for(let u=c+a;c!==u;c+=4)ks.slerpFlat(s,0,o,c-a,o,c,l);return s}}class Aa extends ur{constructor(e,t,n,i){super(e,t,n,i)}InterpolantFactoryMethodLinear(e){return new Pb(this.times,this.values,this.getValueSize(),e)}}Aa.prototype.ValueTypeName="quaternion";Aa.prototype.InterpolantFactoryMethodSmooth=void 0;class Ba extends ur{constructor(e,t,n){super(e,t,n)}}Ba.prototype.ValueTypeName="string";Ba.prototype.ValueBufferType=Array;Ba.prototype.DefaultInterpolation=Gl;Ba.prototype.InterpolantFactoryMethodLinear=void 0;Ba.prototype.InterpolantFactoryMethodSmooth=void 0;class Ca extends ur{constructor(e,t,n,i){super(e,t,n,i)}}Ca.prototype.ValueTypeName="vector";class Lb{constructor(e="",t=-1,n=[],i=hy){this.name=e,this.tracks=n,this.duration=t,this.blendMode=i,this.uuid=or(),this.userData={},this.duration<0&&this.resetDuration()}static parse(e){const t=[],n=e.tracks,i=1/(e.fps||1);for(let o=0,a=n.length;o!==a;++o)t.push(Ib(n[o]).scale(i));const s=new this(e.name,e.duration,t,e.blendMode);return s.uuid=e.uuid,s.userData=JSON.parse(e.userData||"{}"),s}static toJSON(e){const t=[],n=e.tracks,i={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode,userData:JSON.stringify(e.userData)};for(let s=0,o=n.length;s!==o;++s)t.push(ur.toJSON(n[s]));return i}static CreateFromMorphTargetSequence(e,t,n,i){const s=t.length,o=[];for(let a=0;a<s;a++){let l=[],c=[];l.push((a+s-1)%s,a,(a+1)%s),c.push(0,1,0);const u=Eb(l);l=Im(l,1,u),c=Im(c,1,u),!i&&l[0]===0&&(l.push(s),c.push(c[0])),o.push(new Ea(".morphTargetInfluences["+t[a].name+"]",l,c).scale(1/n))}return new this(e,-1,o)}static findByName(e,t){let n=e;if(!Array.isArray(e)){const i=e;n=i.geometry&&i.geometry.animations||i.animations}for(let i=0;i<n.length;i++)if(n[i].name===t)return n[i];return null}static CreateClipsFromMorphTargetSequences(e,t,n){const i={},s=/^([\w-]*?)([\d]+)$/;for(let a=0,l=e.length;a<l;a++){const c=e[a],u=c.name.match(s);if(u&&u.length>1){const d=u[1];let f=i[d];f||(i[d]=f=[]),f.push(c)}}const o=[];for(const a in i)o.push(this.CreateFromMorphTargetSequence(a,i[a],t,n));return o}static parseAnimation(e,t){if(ot("AnimationClip: parseAnimation() is deprecated and will be removed with r185"),!e)return Rt("AnimationClip: No animation in JSONLoader data."),null;const n=function(d,f,h,_,g){if(h.length!==0){const m=[],p=[];a_(h,m,p,_),m.length!==0&&g.push(new d(f,m,p))}},i=[],s=e.name||"default",o=e.fps||30,a=e.blendMode;let l=e.length||-1;const c=e.hierarchy||[];for(let d=0;d<c.length;d++){const f=c[d].keys;if(!(!f||f.length===0))if(f[0].morphTargets){const h={};let _;for(_=0;_<f.length;_++)if(f[_].morphTargets)for(let g=0;g<f[_].morphTargets.length;g++)h[f[_].morphTargets[g]]=-1;for(const g in h){const m=[],p=[];for(let b=0;b!==f[_].morphTargets.length;++b){const x=f[_];m.push(x.time),p.push(x.morphTarget===g?1:0)}i.push(new Ea(".morphTargetInfluence["+g+"]",m,p))}l=h.length*o}else{const h=".bones["+t[d].name+"]";n(Ca,h+".position",f,"pos",i),n(Aa,h+".quaternion",f,"rot",i),n(Ca,h+".scale",f,"scl",i)}}return i.length===0?null:new this(s,l,i,a)}resetDuration(){const e=this.tracks;let t=0;for(let n=0,i=e.length;n!==i;++n){const s=this.tracks[n];t=Math.max(t,s.times[s.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){const e=[];for(let n=0;n<this.tracks.length;n++)e.push(this.tracks[n].clone());const t=new this.constructor(this.name,this.duration,e,this.blendMode);return t.userData=JSON.parse(JSON.stringify(this.userData)),t}toJSON(){return this.constructor.toJSON(this)}}function Db(r){switch(r.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return Ea;case"vector":case"vector2":case"vector3":case"vector4":return Ca;case"color":return l_;case"quaternion":return Aa;case"bool":case"boolean":return ka;case"string":return Ba}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+r)}function Ib(r){if(r.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");const e=Db(r.type);if(r.times===void 0){const t=[],n=[];a_(r.keys,t,n,"value"),r.times=t,r.values=n}return e.parse!==void 0?e.parse(r):new e(r.name,r.times,r.values,r.interpolation)}const jr={enabled:!1,files:{},add:function(r,e){this.enabled!==!1&&(this.files[r]=e)},get:function(r){if(this.enabled!==!1)return this.files[r]},remove:function(r){delete this.files[r]},clear:function(){this.files={}}};class Ob{constructor(e,t,n){const i=this;let s=!1,o=0,a=0,l;const c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this._abortController=null,this.itemStart=function(u){a++,s===!1&&i.onStart!==void 0&&i.onStart(u,o,a),s=!0},this.itemEnd=function(u){o++,i.onProgress!==void 0&&i.onProgress(u,o,a),o===a&&(s=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(u){i.onError!==void 0&&i.onError(u)},this.resolveURL=function(u){return l?l(u):u},this.setURLModifier=function(u){return l=u,this},this.addHandler=function(u,d){return c.push(u,d),this},this.removeHandler=function(u){const d=c.indexOf(u);return d!==-1&&c.splice(d,2),this},this.getHandler=function(u){for(let d=0,f=c.length;d<f;d+=2){const h=c[d],_=c[d+1];if(h.global&&(h.lastIndex=0),h.test(u))return _}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}}const Nb=new Ob;class Ao{constructor(e){this.manager=e!==void 0?e:Nb,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){const n=this;return new Promise(function(i,s){n.load(e,i,t,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}}Ao.DEFAULT_MATERIAL_NAME="__DEFAULT";const Br={};class Fb extends Error{constructor(e,t){super(e),this.response=t}}class Eu extends Ao{constructor(e){super(e),this.mimeType="",this.responseType="",this._abortController=new AbortController}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=jr.get(`file:${e}`);if(s!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(s),this.manager.itemEnd(e)},0),s;if(Br[e]!==void 0){Br[e].push({onLoad:t,onProgress:n,onError:i});return}Br[e]=[],Br[e].push({onLoad:t,onProgress:n,onError:i});const o=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin",signal:typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal}),a=this.mimeType,l=this.responseType;fetch(o).then(c=>{if(c.status===200||c.status===0){if(c.status===0&&ot("FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||c.body===void 0||c.body.getReader===void 0)return c;const u=Br[e],d=c.body.getReader(),f=c.headers.get("X-File-Size")||c.headers.get("Content-Length"),h=f?parseInt(f):0,_=h!==0;let g=0;const m=new ReadableStream({start(p){b();function b(){d.read().then(({done:x,value:v})=>{if(x)p.close();else{g+=v.byteLength;const T=new ProgressEvent("progress",{lengthComputable:_,loaded:g,total:h});for(let M=0,E=u.length;M<E;M++){const R=u[M];R.onProgress&&R.onProgress(T)}p.enqueue(v),b()}},x=>{p.error(x)})}}});return new Response(m)}else throw new Fb(`fetch for "${c.url}" responded with ${c.status}: ${c.statusText}`,c)}).then(c=>{switch(l){case"arraybuffer":return c.arrayBuffer();case"blob":return c.blob();case"document":return c.text().then(u=>new DOMParser().parseFromString(u,a));case"json":return c.json();default:if(a==="")return c.text();{const d=/charset="?([^;"\s]*)"?/i.exec(a),f=d&&d[1]?d[1].toLowerCase():void 0,h=new TextDecoder(f);return c.arrayBuffer().then(_=>h.decode(_))}}}).then(c=>{jr.add(`file:${e}`,c);const u=Br[e];delete Br[e];for(let d=0,f=u.length;d<f;d++){const h=u[d];h.onLoad&&h.onLoad(c)}}).catch(c=>{const u=Br[e];if(u===void 0)throw this.manager.itemError(e),c;delete Br[e];for(let d=0,f=u.length;d<f;d++){const h=u[d];h.onError&&h.onError(c)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}}const $o=new WeakMap;class Ub extends Ao{constructor(e){super(e)}load(e,t,n,i){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=this,o=jr.get(`image:${e}`);if(o!==void 0){if(o.complete===!0)s.manager.itemStart(e),setTimeout(function(){t&&t(o),s.manager.itemEnd(e)},0);else{let d=$o.get(o);d===void 0&&(d=[],$o.set(o,d)),d.push({onLoad:t,onError:i})}return o}const a=Xl("img");function l(){u(),t&&t(this);const d=$o.get(this)||[];for(let f=0;f<d.length;f++){const h=d[f];h.onLoad&&h.onLoad(this)}$o.delete(this),s.manager.itemEnd(e)}function c(d){u(),i&&i(d),jr.remove(`image:${e}`);const f=$o.get(this)||[];for(let h=0;h<f.length;h++){const _=f[h];_.onError&&_.onError(d)}$o.delete(this),s.manager.itemError(e),s.manager.itemEnd(e)}function u(){a.removeEventListener("load",l,!1),a.removeEventListener("error",c,!1)}return a.addEventListener("load",l,!1),a.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),jr.add(`image:${e}`,a),s.manager.itemStart(e),a.src=e,a}}class kb extends Ao{constructor(e){super(e)}load(e,t,n,i){const s=new Pn,o=new Ub(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(e,function(a){s.image=a,s.needsUpdate=!0,t!==void 0&&t(s)},n,i),s}}class Yu extends dn{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new je(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}const Ld=new bt,Om=new Y,Nm=new Y;class ap{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Et(512,512),this.mapType=Pr,this.map=null,this.mapPass=null,this.matrix=new bt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new rp,this._frameExtents=new Et(1,1),this._viewportCount=1,this._viewports=[new zt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;Om.setFromMatrixPosition(e.matrixWorld),t.position.copy(Om),Nm.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Nm),t.updateMatrixWorld(),Ld.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Ld,t.coordinateSystem,t.reversedDepth),t.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Ld)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class Bb extends ap{constructor(){super(new ci(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(e){const t=this.camera,n=Ma*2*e.angle*this.focus,i=this.mapSize.width/this.mapSize.height*this.aspect,s=e.distance||t.far;(n!==t.fov||i!==t.aspect||s!==t.far)&&(t.fov=n,t.aspect=i,t.far=s,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}}class zb extends Yu{constructor(e,t,n=0,i=Math.PI/3,s=0,o=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(dn.DEFAULT_UP),this.updateMatrix(),this.target=new dn,this.distance=n,this.angle=i,this.penumbra=s,this.decay=o,this.map=null,this.shadow=new Bb}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}const Fm=new bt,ja=new Y,Dd=new Y;class Vb extends ap{constructor(){super(new ci(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new Et(4,2),this._viewportCount=6,this._viewports=[new zt(2,1,1,1),new zt(0,1,1,1),new zt(3,1,1,1),new zt(1,1,1,1),new zt(3,0,1,1),new zt(1,0,1,1)],this._cubeDirections=[new Y(1,0,0),new Y(-1,0,0),new Y(0,0,1),new Y(0,0,-1),new Y(0,1,0),new Y(0,-1,0)],this._cubeUps=[new Y(0,1,0),new Y(0,1,0),new Y(0,1,0),new Y(0,1,0),new Y(0,0,1),new Y(0,0,-1)]}updateMatrices(e,t=0){const n=this.camera,i=this.matrix,s=e.distance||n.far;s!==n.far&&(n.far=s,n.updateProjectionMatrix()),ja.setFromMatrixPosition(e.matrixWorld),n.position.copy(ja),Dd.copy(n.position),Dd.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(Dd),n.updateMatrixWorld(),i.makeTranslation(-ja.x,-ja.y,-ja.z),Fm.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Fm,n.coordinateSystem,n.reversedDepth)}}class c_ extends Yu{constructor(e,t,n=0,i=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new Vb}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class $u extends tp{constructor(e=-1,t=1,n=1,i=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=i,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,i,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let s=n-e,o=n+e,a=i+t,l=i-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,o=s+c*this.view.width,a-=u*this.view.offsetY,l=a-u*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class Hb extends ap{constructor(){super(new $u(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class u_ extends Yu{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(dn.DEFAULT_UP),this.updateMatrix(),this.target=new dn,this.shadow=new Hb}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class d_ extends Yu{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}class wl{static extractUrlBase(e){const t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}}const Id=new WeakMap;class Gb extends Ao{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&ot("ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&ot("ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"},this._abortController=new AbortController}setOptions(e){return this.options=e,this}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=this,o=jr.get(`image-bitmap:${e}`);if(o!==void 0){if(s.manager.itemStart(e),o.then){o.then(c=>{if(Id.has(o)===!0)i&&i(Id.get(o)),s.manager.itemError(e),s.manager.itemEnd(e);else return t&&t(c),s.manager.itemEnd(e),c});return}return setTimeout(function(){t&&t(o),s.manager.itemEnd(e)},0),o}const a={};a.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",a.headers=this.requestHeader,a.signal=typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal;const l=fetch(e,a).then(function(c){return c.blob()}).then(function(c){return createImageBitmap(c,Object.assign(s.options,{colorSpaceConversion:"none"}))}).then(function(c){return jr.add(`image-bitmap:${e}`,c),t&&t(c),s.manager.itemEnd(e),c}).catch(function(c){i&&i(c),Id.set(l,c),jr.remove(`image-bitmap:${e}`),s.manager.itemError(e),s.manager.itemEnd(e)});jr.add(`image-bitmap:${e}`,l),s.manager.itemStart(e)}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}}class Wb extends ci{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}class Xb{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=performance.now(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const t=performance.now();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}}const lp="\\[\\]\\.:\\/",qb=new RegExp("["+lp+"]","g"),cp="[^"+lp+"]",Yb="[^"+lp.replace("\\.","")+"]",$b=/((?:WC+[\/:])*)/.source.replace("WC",cp),jb=/(WCOD+)?/.source.replace("WCOD",Yb),Kb=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",cp),Zb=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",cp),Jb=new RegExp("^"+$b+jb+Kb+Zb+"$"),Qb=["material","materials","bones","map"];class ew{constructor(e,t,n){const i=n||jt.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,i)}getValue(e,t){this.bind();const n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(e,t)}setValue(e,t){const n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,s=n.length;i!==s;++i)n[i].setValue(e,t)}bind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}}class jt{constructor(e,t,n){this.path=t,this.parsedPath=n||jt.parseTrackName(t),this.node=jt.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new jt.Composite(e,t,n):new jt(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(qb,"")}static parseTrackName(e){const t=Jb.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);const n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){const s=n.nodeName.substring(i+1);Qb.indexOf(s)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=s)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){const n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){const n=function(s){for(let o=0;o<s.length;o++){const a=s[o];if(a.name===t||a.uuid===t)return a;const l=n(a.children);if(l)return l}return null},i=n(e.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)e[t++]=n[i]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++]}_setValue_array_setNeedsUpdate(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node;const t=this.parsedPath,n=t.objectName,i=t.propertyName;let s=t.propertyIndex;if(e||(e=jt.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){ot("PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=t.objectIndex;switch(n){case"materials":if(!e.material){Rt("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){Rt("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){Rt("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let u=0;u<e.length;u++)if(e[u].name===c){c=u;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){Rt("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){Rt("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){Rt("PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(c!==void 0){if(e[c]===void 0){Rt("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}const o=e[i];if(o===void 0){const c=t.nodeName;Rt("PropertyBinding: Trying to update property for track: "+c+"."+i+" but it wasn't found.",e);return}let a=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?a=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(s!==void 0){if(i==="morphTargetInfluences"){if(!e.geometry){Rt("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){Rt("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[s]!==void 0&&(s=e.morphTargetDictionary[s])}l=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=s}else o.fromArray!==void 0&&o.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(l=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=i;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}jt.Composite=ew;jt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};jt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};jt.prototype.GetterByBindingType=[jt.prototype._getValue_direct,jt.prototype._getValue_array,jt.prototype._getValue_arrayElement,jt.prototype._getValue_toArray];jt.prototype.SetterByBindingTypeAndVersioning=[[jt.prototype._setValue_direct,jt.prototype._setValue_direct_setNeedsUpdate,jt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[jt.prototype._setValue_array,jt.prototype._setValue_array_setNeedsUpdate,jt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[jt.prototype._setValue_arrayElement,jt.prototype._setValue_arrayElement_setNeedsUpdate,jt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[jt.prototype._setValue_fromArray,jt.prototype._setValue_fromArray_setNeedsUpdate,jt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];function Um(r,e,t,n){const i=tw(n);switch(t){case Vg:return r*e;case $h:return r*e/i.components*i.byteLength;case jh:return r*e/i.components*i.byteLength;case Kh:return r*e*2/i.components*i.byteLength;case Zh:return r*e*2/i.components*i.byteLength;case Hg:return r*e*3/i.components*i.byteLength;case Xi:return r*e*4/i.components*i.byteLength;case Jh:return r*e*4/i.components*i.byteLength;case nu:case iu:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*8;case ru:case su:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case Sf:case Tf:return Math.max(r,16)*Math.max(e,8)/4;case wf:case Mf:return Math.max(r,8)*Math.max(e,8)/2;case Ef:case Af:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*8;case Cf:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case Rf:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case Pf:return Math.floor((r+4)/5)*Math.floor((e+3)/4)*16;case Lf:return Math.floor((r+4)/5)*Math.floor((e+4)/5)*16;case Df:return Math.floor((r+5)/6)*Math.floor((e+4)/5)*16;case If:return Math.floor((r+5)/6)*Math.floor((e+5)/6)*16;case Of:return Math.floor((r+7)/8)*Math.floor((e+4)/5)*16;case Nf:return Math.floor((r+7)/8)*Math.floor((e+5)/6)*16;case Ff:return Math.floor((r+7)/8)*Math.floor((e+7)/8)*16;case Uf:return Math.floor((r+9)/10)*Math.floor((e+4)/5)*16;case kf:return Math.floor((r+9)/10)*Math.floor((e+5)/6)*16;case Bf:return Math.floor((r+9)/10)*Math.floor((e+7)/8)*16;case zf:return Math.floor((r+9)/10)*Math.floor((e+9)/10)*16;case Vf:return Math.floor((r+11)/12)*Math.floor((e+9)/10)*16;case Hf:return Math.floor((r+11)/12)*Math.floor((e+11)/12)*16;case Gf:case Wf:case Xf:return Math.ceil(r/4)*Math.ceil(e/4)*16;case qf:case Yf:return Math.ceil(r/4)*Math.ceil(e/4)*8;case $f:case jf:return Math.ceil(r/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function tw(r){switch(r){case Pr:case Ug:return{byteLength:1,components:1};case Bl:case kg:case Fa:return{byteLength:2,components:1};case qh:case Yh:return{byteLength:2,components:4};case bo:case Xh:case sr:return{byteLength:4,components:1};case Bg:case zg:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${r}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Wh}}));typeof window<"u"&&(window.__THREE__?ot("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Wh);/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function f_(){let r=null,e=!1,t=null,n=null;function i(s,o){t(s,o),n=r.requestAnimationFrame(i)}return{start:function(){e!==!0&&t!==null&&(n=r.requestAnimationFrame(i),e=!0)},stop:function(){r.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){r=s}}}function nw(r){const e=new WeakMap;function t(a,l){const c=a.array,u=a.usage,d=c.byteLength,f=r.createBuffer();r.bindBuffer(l,f),r.bufferData(l,c,u),a.onUploadCallback();let h;if(c instanceof Float32Array)h=r.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)h=r.HALF_FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?h=r.HALF_FLOAT:h=r.UNSIGNED_SHORT;else if(c instanceof Int16Array)h=r.SHORT;else if(c instanceof Uint32Array)h=r.UNSIGNED_INT;else if(c instanceof Int32Array)h=r.INT;else if(c instanceof Int8Array)h=r.BYTE;else if(c instanceof Uint8Array)h=r.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)h=r.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:f,type:h,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:d}}function n(a,l,c){const u=l.array,d=l.updateRanges;if(r.bindBuffer(c,a),d.length===0)r.bufferSubData(c,0,u);else{d.sort((h,_)=>h.start-_.start);let f=0;for(let h=1;h<d.length;h++){const _=d[f],g=d[h];g.start<=_.start+_.count+1?_.count=Math.max(_.count,g.start+g.count-_.start):(++f,d[f]=g)}d.length=f+1;for(let h=0,_=d.length;h<_;h++){const g=d[h];r.bufferSubData(c,g.start*u.BYTES_PER_ELEMENT,u,g.start,g.count)}l.clearUpdateRanges()}l.onUploadCallback()}function i(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function s(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=e.get(a);l&&(r.deleteBuffer(l.buffer),e.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const u=e.get(a);(!u||u.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const c=e.get(a);if(c===void 0)e.set(a,t(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,a,l),c.version=a.version}}return{get:i,remove:s,update:o}}var iw=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,rw=`#ifdef USE_ALPHAHASH
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
#endif`,sw=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,ow=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,aw=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,lw=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,cw=`#ifdef USE_AOMAP
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
#endif`,uw=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,dw=`#ifdef USE_BATCHING
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
#endif`,fw=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,hw=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,pw=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,mw=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,gw=`#ifdef USE_IRIDESCENCE
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
#endif`,_w=`#ifdef USE_BUMPMAP
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
#endif`,xw=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,vw=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,yw=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,bw=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,ww=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Sw=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Mw=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Tw=`#if defined( USE_COLOR_ALPHA )
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
#endif`,Ew=`#define PI 3.141592653589793
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
} // validated`,Aw=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Cw=`vec3 transformedNormal = objectNormal;
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
#endif`,Rw=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Pw=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Lw=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Dw=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Iw="gl_FragColor = linearToOutputTexel( gl_FragColor );",Ow=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Nw=`#ifdef USE_ENVMAP
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
#endif`,Fw=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,Uw=`#ifdef USE_ENVMAP
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
#endif`,kw=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Bw=`#ifdef USE_ENVMAP
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
#endif`,zw=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Vw=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Hw=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Gw=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Ww=`#ifdef USE_GRADIENTMAP
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
}`,Xw=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,qw=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Yw=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,$w=`uniform bool receiveShadow;
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
#endif`,jw=`#ifdef USE_ENVMAP
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
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
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
#endif`,Kw=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Zw=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Jw=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Qw=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,eS=`PhysicalMaterial material;
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
#endif`,tS=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
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
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
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
	vec2 uv = vec2( roughness, dotNV );
	return texture2D( dfgLUT, uv ).rg;
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
vec3 BRDF_GGX_Multiscatter( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 singleScatter = BRDF_GGX( lightDir, viewDir, normal, material );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 dfgV = DFGApprox( vec3(0.0, 0.0, 1.0), vec3(sqrt(1.0 - dotNV * dotNV), 0.0, dotNV), material.roughness );
	vec2 dfgL = DFGApprox( vec3(0.0, 0.0, 1.0), vec3(sqrt(1.0 - dotNL * dotNL), 0.0, dotNL), material.roughness );
	vec3 FssEss_V = material.specularColor * dfgV.x + material.specularF90 * dfgV.y;
	vec3 FssEss_L = material.specularColor * dfgL.x + material.specularF90 * dfgL.y;
	float Ess_V = dfgV.x + dfgV.y;
	float Ess_L = dfgL.x + dfgL.y;
	float Ems_V = 1.0 - Ess_V;
	float Ems_L = 1.0 - Ess_L;
	vec3 Favg = material.specularColor + ( 1.0 - material.specularColor ) * 0.047619;
	vec3 Fms = FssEss_V * FssEss_L * Favg / ( 1.0 - Ems_V * Ems_L * Favg * Favg + EPSILON );
	float compensationFactor = Ems_V * Ems_L;
	vec3 multiScatter = Fms * compensationFactor;
	return singleScatter + multiScatter;
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
	reflectedLight.directSpecular += irradiance * BRDF_GGX_Multiscatter( directLight.direction, geometryViewDir, geometryNormal, material );
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
}`,nS=`
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
#endif`,iS=`#if defined( RE_IndirectDiffuse )
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
#endif`,rS=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,sS=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,oS=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,aS=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,lS=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,cS=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,uS=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,dS=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,fS=`#if defined( USE_POINTS_UV )
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
#endif`,hS=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,pS=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,mS=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,gS=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,_S=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,xS=`#ifdef USE_MORPHTARGETS
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
#endif`,vS=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,yS=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,bS=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,wS=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,SS=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,MS=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,TS=`#ifdef USE_NORMALMAP
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
#endif`,ES=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,AS=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,CS=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,RS=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,PS=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,LS=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,DS=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,IS=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,OS=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,NS=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,FS=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,US=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,kS=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,BS=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,zS=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,VS=`float getShadowMask() {
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
}`,HS=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,GS=`#ifdef USE_SKINNING
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
#endif`,WS=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,XS=`#ifdef USE_SKINNING
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
#endif`,qS=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,YS=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,$S=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,jS=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,KS=`#ifdef USE_TRANSMISSION
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
#endif`,ZS=`#ifdef USE_TRANSMISSION
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
#endif`,JS=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,QS=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,e1=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,t1=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const n1=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,i1=`uniform sampler2D t2D;
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
}`,r1=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,s1=`#ifdef ENVMAP_TYPE_CUBE
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
}`,o1=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,a1=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,l1=`#include <common>
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
}`,c1=`#if DEPTH_PACKING == 3200
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
}`,u1=`#define DISTANCE
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
}`,d1=`#define DISTANCE
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
}`,f1=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,h1=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,p1=`uniform float scale;
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
}`,m1=`uniform vec3 diffuse;
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
}`,g1=`#include <common>
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
}`,_1=`uniform vec3 diffuse;
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
}`,x1=`#define LAMBERT
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
}`,v1=`#define LAMBERT
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
}`,y1=`#define MATCAP
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
}`,b1=`#define MATCAP
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
}`,w1=`#define NORMAL
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
}`,S1=`#define NORMAL
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
}`,M1=`#define PHONG
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
}`,T1=`#define PHONG
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
}`,E1=`#define STANDARD
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
}`,A1=`#define STANDARD
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
}`,C1=`#define TOON
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
}`,R1=`#define TOON
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
}`,P1=`uniform float size;
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
}`,L1=`uniform vec3 diffuse;
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
}`,D1=`#include <common>
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
}`,I1=`uniform vec3 color;
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
}`,O1=`uniform float rotation;
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
}`,N1=`uniform vec3 diffuse;
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
}`,yt={alphahash_fragment:iw,alphahash_pars_fragment:rw,alphamap_fragment:sw,alphamap_pars_fragment:ow,alphatest_fragment:aw,alphatest_pars_fragment:lw,aomap_fragment:cw,aomap_pars_fragment:uw,batching_pars_vertex:dw,batching_vertex:fw,begin_vertex:hw,beginnormal_vertex:pw,bsdfs:mw,iridescence_fragment:gw,bumpmap_pars_fragment:_w,clipping_planes_fragment:xw,clipping_planes_pars_fragment:vw,clipping_planes_pars_vertex:yw,clipping_planes_vertex:bw,color_fragment:ww,color_pars_fragment:Sw,color_pars_vertex:Mw,color_vertex:Tw,common:Ew,cube_uv_reflection_fragment:Aw,defaultnormal_vertex:Cw,displacementmap_pars_vertex:Rw,displacementmap_vertex:Pw,emissivemap_fragment:Lw,emissivemap_pars_fragment:Dw,colorspace_fragment:Iw,colorspace_pars_fragment:Ow,envmap_fragment:Nw,envmap_common_pars_fragment:Fw,envmap_pars_fragment:Uw,envmap_pars_vertex:kw,envmap_physical_pars_fragment:jw,envmap_vertex:Bw,fog_vertex:zw,fog_pars_vertex:Vw,fog_fragment:Hw,fog_pars_fragment:Gw,gradientmap_pars_fragment:Ww,lightmap_pars_fragment:Xw,lights_lambert_fragment:qw,lights_lambert_pars_fragment:Yw,lights_pars_begin:$w,lights_toon_fragment:Kw,lights_toon_pars_fragment:Zw,lights_phong_fragment:Jw,lights_phong_pars_fragment:Qw,lights_physical_fragment:eS,lights_physical_pars_fragment:tS,lights_fragment_begin:nS,lights_fragment_maps:iS,lights_fragment_end:rS,logdepthbuf_fragment:sS,logdepthbuf_pars_fragment:oS,logdepthbuf_pars_vertex:aS,logdepthbuf_vertex:lS,map_fragment:cS,map_pars_fragment:uS,map_particle_fragment:dS,map_particle_pars_fragment:fS,metalnessmap_fragment:hS,metalnessmap_pars_fragment:pS,morphinstance_vertex:mS,morphcolor_vertex:gS,morphnormal_vertex:_S,morphtarget_pars_vertex:xS,morphtarget_vertex:vS,normal_fragment_begin:yS,normal_fragment_maps:bS,normal_pars_fragment:wS,normal_pars_vertex:SS,normal_vertex:MS,normalmap_pars_fragment:TS,clearcoat_normal_fragment_begin:ES,clearcoat_normal_fragment_maps:AS,clearcoat_pars_fragment:CS,iridescence_pars_fragment:RS,opaque_fragment:PS,packing:LS,premultiplied_alpha_fragment:DS,project_vertex:IS,dithering_fragment:OS,dithering_pars_fragment:NS,roughnessmap_fragment:FS,roughnessmap_pars_fragment:US,shadowmap_pars_fragment:kS,shadowmap_pars_vertex:BS,shadowmap_vertex:zS,shadowmask_pars_fragment:VS,skinbase_vertex:HS,skinning_pars_vertex:GS,skinning_vertex:WS,skinnormal_vertex:XS,specularmap_fragment:qS,specularmap_pars_fragment:YS,tonemapping_fragment:$S,tonemapping_pars_fragment:jS,transmission_fragment:KS,transmission_pars_fragment:ZS,uv_pars_fragment:JS,uv_pars_vertex:QS,uv_vertex:e1,worldpos_vertex:t1,background_vert:n1,background_frag:i1,backgroundCube_vert:r1,backgroundCube_frag:s1,cube_vert:o1,cube_frag:a1,depth_vert:l1,depth_frag:c1,distanceRGBA_vert:u1,distanceRGBA_frag:d1,equirect_vert:f1,equirect_frag:h1,linedashed_vert:p1,linedashed_frag:m1,meshbasic_vert:g1,meshbasic_frag:_1,meshlambert_vert:x1,meshlambert_frag:v1,meshmatcap_vert:y1,meshmatcap_frag:b1,meshnormal_vert:w1,meshnormal_frag:S1,meshphong_vert:M1,meshphong_frag:T1,meshphysical_vert:E1,meshphysical_frag:A1,meshtoon_vert:C1,meshtoon_frag:R1,points_vert:P1,points_frag:L1,shadow_vert:D1,shadow_frag:I1,sprite_vert:O1,sprite_frag:N1},Ue={common:{diffuse:{value:new je(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new vt},alphaMap:{value:null},alphaMapTransform:{value:new vt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new vt}},envmap:{envMap:{value:null},envMapRotation:{value:new vt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new vt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new vt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new vt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new vt},normalScale:{value:new Et(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new vt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new vt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new vt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new vt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new je(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new je(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new vt},alphaTest:{value:0},uvTransform:{value:new vt}},sprite:{diffuse:{value:new je(16777215)},opacity:{value:1},center:{value:new Et(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new vt},alphaMap:{value:null},alphaMapTransform:{value:new vt},alphaTest:{value:0}}},vr={basic:{uniforms:si([Ue.common,Ue.specularmap,Ue.envmap,Ue.aomap,Ue.lightmap,Ue.fog]),vertexShader:yt.meshbasic_vert,fragmentShader:yt.meshbasic_frag},lambert:{uniforms:si([Ue.common,Ue.specularmap,Ue.envmap,Ue.aomap,Ue.lightmap,Ue.emissivemap,Ue.bumpmap,Ue.normalmap,Ue.displacementmap,Ue.fog,Ue.lights,{emissive:{value:new je(0)}}]),vertexShader:yt.meshlambert_vert,fragmentShader:yt.meshlambert_frag},phong:{uniforms:si([Ue.common,Ue.specularmap,Ue.envmap,Ue.aomap,Ue.lightmap,Ue.emissivemap,Ue.bumpmap,Ue.normalmap,Ue.displacementmap,Ue.fog,Ue.lights,{emissive:{value:new je(0)},specular:{value:new je(1118481)},shininess:{value:30}}]),vertexShader:yt.meshphong_vert,fragmentShader:yt.meshphong_frag},standard:{uniforms:si([Ue.common,Ue.envmap,Ue.aomap,Ue.lightmap,Ue.emissivemap,Ue.bumpmap,Ue.normalmap,Ue.displacementmap,Ue.roughnessmap,Ue.metalnessmap,Ue.fog,Ue.lights,{emissive:{value:new je(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:yt.meshphysical_vert,fragmentShader:yt.meshphysical_frag},toon:{uniforms:si([Ue.common,Ue.aomap,Ue.lightmap,Ue.emissivemap,Ue.bumpmap,Ue.normalmap,Ue.displacementmap,Ue.gradientmap,Ue.fog,Ue.lights,{emissive:{value:new je(0)}}]),vertexShader:yt.meshtoon_vert,fragmentShader:yt.meshtoon_frag},matcap:{uniforms:si([Ue.common,Ue.bumpmap,Ue.normalmap,Ue.displacementmap,Ue.fog,{matcap:{value:null}}]),vertexShader:yt.meshmatcap_vert,fragmentShader:yt.meshmatcap_frag},points:{uniforms:si([Ue.points,Ue.fog]),vertexShader:yt.points_vert,fragmentShader:yt.points_frag},dashed:{uniforms:si([Ue.common,Ue.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:yt.linedashed_vert,fragmentShader:yt.linedashed_frag},depth:{uniforms:si([Ue.common,Ue.displacementmap]),vertexShader:yt.depth_vert,fragmentShader:yt.depth_frag},normal:{uniforms:si([Ue.common,Ue.bumpmap,Ue.normalmap,Ue.displacementmap,{opacity:{value:1}}]),vertexShader:yt.meshnormal_vert,fragmentShader:yt.meshnormal_frag},sprite:{uniforms:si([Ue.sprite,Ue.fog]),vertexShader:yt.sprite_vert,fragmentShader:yt.sprite_frag},background:{uniforms:{uvTransform:{value:new vt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:yt.background_vert,fragmentShader:yt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new vt}},vertexShader:yt.backgroundCube_vert,fragmentShader:yt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:yt.cube_vert,fragmentShader:yt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:yt.equirect_vert,fragmentShader:yt.equirect_frag},distanceRGBA:{uniforms:si([Ue.common,Ue.displacementmap,{referencePosition:{value:new Y},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:yt.distanceRGBA_vert,fragmentShader:yt.distanceRGBA_frag},shadow:{uniforms:si([Ue.lights,Ue.fog,{color:{value:new je(0)},opacity:{value:1}}]),vertexShader:yt.shadow_vert,fragmentShader:yt.shadow_frag}};vr.physical={uniforms:si([vr.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new vt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new vt},clearcoatNormalScale:{value:new Et(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new vt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new vt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new vt},sheen:{value:0},sheenColor:{value:new je(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new vt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new vt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new vt},transmissionSamplerSize:{value:new Et},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new vt},attenuationDistance:{value:0},attenuationColor:{value:new je(0)},specularColor:{value:new je(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new vt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new vt},anisotropyVector:{value:new Et},anisotropyMap:{value:null},anisotropyMapTransform:{value:new vt}}]),vertexShader:yt.meshphysical_vert,fragmentShader:yt.meshphysical_frag};const Oc={r:0,b:0,g:0},Ys=new Lr,F1=new bt;function U1(r,e,t,n,i,s,o){const a=new je(0);let l=s===!0?0:1,c,u,d=null,f=0,h=null;function _(x){let v=x.isScene===!0?x.background:null;return v&&v.isTexture&&(v=(x.backgroundBlurriness>0?t:e).get(v)),v}function g(x){let v=!1;const T=_(x);T===null?p(a,l):T&&T.isColor&&(p(T,1),v=!0);const M=r.xr.getEnvironmentBlendMode();M==="additive"?n.buffers.color.setClear(0,0,0,1,o):M==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(r.autoClear||v)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil))}function m(x,v){const T=_(v);T&&(T.isCubeTexture||T.mapping===Gu)?(u===void 0&&(u=new Qn(new sc(1,1,1),new hi({name:"BackgroundCubeMaterial",uniforms:Ta(vr.backgroundCube.uniforms),vertexShader:vr.backgroundCube.vertexShader,fragmentShader:vr.backgroundCube.fragmentShader,side:xi,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(M,E,R){this.matrixWorld.copyPosition(R.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(u)),Ys.copy(v.backgroundRotation),Ys.x*=-1,Ys.y*=-1,Ys.z*=-1,T.isCubeTexture&&T.isRenderTargetTexture===!1&&(Ys.y*=-1,Ys.z*=-1),u.material.uniforms.envMap.value=T,u.material.uniforms.flipEnvMap.value=T.isCubeTexture&&T.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=v.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(F1.makeRotationFromEuler(Ys)),u.material.toneMapped=It.getTransfer(T.colorSpace)!==Zt,(d!==T||f!==T.version||h!==r.toneMapping)&&(u.material.needsUpdate=!0,d=T,f=T.version,h=r.toneMapping),u.layers.enableAll(),x.unshift(u,u.geometry,u.material,0,0,null)):T&&T.isTexture&&(c===void 0&&(c=new Qn(new Vi(2,2),new hi({name:"BackgroundMaterial",uniforms:Ta(vr.background.uniforms),vertexShader:vr.background.vertexShader,fragmentShader:vr.background.fragmentShader,side:ts,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=T,c.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,c.material.toneMapped=It.getTransfer(T.colorSpace)!==Zt,T.matrixAutoUpdate===!0&&T.updateMatrix(),c.material.uniforms.uvTransform.value.copy(T.matrix),(d!==T||f!==T.version||h!==r.toneMapping)&&(c.material.needsUpdate=!0,d=T,f=T.version,h=r.toneMapping),c.layers.enableAll(),x.unshift(c,c.geometry,c.material,0,0,null))}function p(x,v){x.getRGB(Oc,Jg(r)),n.buffers.color.setClear(Oc.r,Oc.g,Oc.b,v,o)}function b(){u!==void 0&&(u.geometry.dispose(),u.material.dispose(),u=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(x,v=1){a.set(x),l=v,p(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(x){l=x,p(a,l)},render:g,addToRenderList:m,dispose:b}}function k1(r,e){const t=r.getParameter(r.MAX_VERTEX_ATTRIBS),n={},i=f(null);let s=i,o=!1;function a(y,L,N,W,j){let k=!1;const J=d(W,N,L);s!==J&&(s=J,c(s.object)),k=h(y,W,N,j),k&&_(y,W,N,j),j!==null&&e.update(j,r.ELEMENT_ARRAY_BUFFER),(k||o)&&(o=!1,v(y,L,N,W),j!==null&&r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,e.get(j).buffer))}function l(){return r.createVertexArray()}function c(y){return r.bindVertexArray(y)}function u(y){return r.deleteVertexArray(y)}function d(y,L,N){const W=N.wireframe===!0;let j=n[y.id];j===void 0&&(j={},n[y.id]=j);let k=j[L.id];k===void 0&&(k={},j[L.id]=k);let J=k[W];return J===void 0&&(J=f(l()),k[W]=J),J}function f(y){const L=[],N=[],W=[];for(let j=0;j<t;j++)L[j]=0,N[j]=0,W[j]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:L,enabledAttributes:N,attributeDivisors:W,object:y,attributes:{},index:null}}function h(y,L,N,W){const j=s.attributes,k=L.attributes;let J=0;const te=N.getAttributes();for(const F in te)if(te[F].location>=0){const O=j[F];let $=k[F];if($===void 0&&(F==="instanceMatrix"&&y.instanceMatrix&&($=y.instanceMatrix),F==="instanceColor"&&y.instanceColor&&($=y.instanceColor)),O===void 0||O.attribute!==$||$&&O.data!==$.data)return!0;J++}return s.attributesNum!==J||s.index!==W}function _(y,L,N,W){const j={},k=L.attributes;let J=0;const te=N.getAttributes();for(const F in te)if(te[F].location>=0){let O=k[F];O===void 0&&(F==="instanceMatrix"&&y.instanceMatrix&&(O=y.instanceMatrix),F==="instanceColor"&&y.instanceColor&&(O=y.instanceColor));const $={};$.attribute=O,O&&O.data&&($.data=O.data),j[F]=$,J++}s.attributes=j,s.attributesNum=J,s.index=W}function g(){const y=s.newAttributes;for(let L=0,N=y.length;L<N;L++)y[L]=0}function m(y){p(y,0)}function p(y,L){const N=s.newAttributes,W=s.enabledAttributes,j=s.attributeDivisors;N[y]=1,W[y]===0&&(r.enableVertexAttribArray(y),W[y]=1),j[y]!==L&&(r.vertexAttribDivisor(y,L),j[y]=L)}function b(){const y=s.newAttributes,L=s.enabledAttributes;for(let N=0,W=L.length;N<W;N++)L[N]!==y[N]&&(r.disableVertexAttribArray(N),L[N]=0)}function x(y,L,N,W,j,k,J){J===!0?r.vertexAttribIPointer(y,L,N,j,k):r.vertexAttribPointer(y,L,N,W,j,k)}function v(y,L,N,W){g();const j=W.attributes,k=N.getAttributes(),J=L.defaultAttributeValues;for(const te in k){const F=k[te];if(F.location>=0){let ue=j[te];if(ue===void 0&&(te==="instanceMatrix"&&y.instanceMatrix&&(ue=y.instanceMatrix),te==="instanceColor"&&y.instanceColor&&(ue=y.instanceColor)),ue!==void 0){const O=ue.normalized,$=ue.itemSize,P=e.get(ue);if(P===void 0)continue;const _e=P.buffer,we=P.type,Se=P.bytesPerElement,Q=we===r.INT||we===r.UNSIGNED_INT||ue.gpuType===Xh;if(ue.isInterleavedBufferAttribute){const ee=ue.data,q=ee.stride,Ie=ue.offset;if(ee.isInstancedInterleavedBuffer){for(let be=0;be<F.locationSize;be++)p(F.location+be,ee.meshPerAttribute);y.isInstancedMesh!==!0&&W._maxInstanceCount===void 0&&(W._maxInstanceCount=ee.meshPerAttribute*ee.count)}else for(let be=0;be<F.locationSize;be++)m(F.location+be);r.bindBuffer(r.ARRAY_BUFFER,_e);for(let be=0;be<F.locationSize;be++)x(F.location+be,$/F.locationSize,we,O,q*Se,(Ie+$/F.locationSize*be)*Se,Q)}else{if(ue.isInstancedBufferAttribute){for(let ee=0;ee<F.locationSize;ee++)p(F.location+ee,ue.meshPerAttribute);y.isInstancedMesh!==!0&&W._maxInstanceCount===void 0&&(W._maxInstanceCount=ue.meshPerAttribute*ue.count)}else for(let ee=0;ee<F.locationSize;ee++)m(F.location+ee);r.bindBuffer(r.ARRAY_BUFFER,_e);for(let ee=0;ee<F.locationSize;ee++)x(F.location+ee,$/F.locationSize,we,O,$*Se,$/F.locationSize*ee*Se,Q)}}else if(J!==void 0){const O=J[te];if(O!==void 0)switch(O.length){case 2:r.vertexAttrib2fv(F.location,O);break;case 3:r.vertexAttrib3fv(F.location,O);break;case 4:r.vertexAttrib4fv(F.location,O);break;default:r.vertexAttrib1fv(F.location,O)}}}}b()}function T(){R();for(const y in n){const L=n[y];for(const N in L){const W=L[N];for(const j in W)u(W[j].object),delete W[j];delete L[N]}delete n[y]}}function M(y){if(n[y.id]===void 0)return;const L=n[y.id];for(const N in L){const W=L[N];for(const j in W)u(W[j].object),delete W[j];delete L[N]}delete n[y.id]}function E(y){for(const L in n){const N=n[L];if(N[y.id]===void 0)continue;const W=N[y.id];for(const j in W)u(W[j].object),delete W[j];delete N[y.id]}}function R(){w(),o=!0,s!==i&&(s=i,c(s.object))}function w(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:a,reset:R,resetDefaultState:w,dispose:T,releaseStatesOfGeometry:M,releaseStatesOfProgram:E,initAttributes:g,enableAttribute:m,disableUnusedAttributes:b}}function B1(r,e,t){let n;function i(c){n=c}function s(c,u){r.drawArrays(n,c,u),t.update(u,n,1)}function o(c,u,d){d!==0&&(r.drawArraysInstanced(n,c,u,d),t.update(u,n,d))}function a(c,u,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,u,0,d);let h=0;for(let _=0;_<d;_++)h+=u[_];t.update(h,n,1)}function l(c,u,d,f){if(d===0)return;const h=e.get("WEBGL_multi_draw");if(h===null)for(let _=0;_<c.length;_++)o(c[_],u[_],f[_]);else{h.multiDrawArraysInstancedWEBGL(n,c,0,u,0,f,0,d);let _=0;for(let g=0;g<d;g++)_+=u[g]*f[g];t.update(_,n,1)}}this.setMode=i,this.render=s,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function z1(r,e,t,n){let i;function s(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){const E=e.get("EXT_texture_filter_anisotropic");i=r.getParameter(E.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(E){return!(E!==Xi&&n.convert(E)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(E){const R=E===Fa&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(E!==Pr&&n.convert(E)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_TYPE)&&E!==sr&&!R)}function l(E){if(E==="highp"){if(r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.HIGH_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision>0)return"highp";E="mediump"}return E==="mediump"&&r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.MEDIUM_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const u=l(c);u!==c&&(ot("WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);const d=t.logarithmicDepthBuffer===!0,f=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),h=r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS),_=r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS),g=r.getParameter(r.MAX_TEXTURE_SIZE),m=r.getParameter(r.MAX_CUBE_MAP_TEXTURE_SIZE),p=r.getParameter(r.MAX_VERTEX_ATTRIBS),b=r.getParameter(r.MAX_VERTEX_UNIFORM_VECTORS),x=r.getParameter(r.MAX_VARYING_VECTORS),v=r.getParameter(r.MAX_FRAGMENT_UNIFORM_VECTORS),T=_>0,M=r.getParameter(r.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:d,reversedDepthBuffer:f,maxTextures:h,maxVertexTextures:_,maxTextureSize:g,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:b,maxVaryings:x,maxFragmentUniforms:v,vertexTextures:T,maxSamples:M}}function V1(r){const e=this;let t=null,n=0,i=!1,s=!1;const o=new Qs,a=new vt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,f){const h=d.length!==0||f||n!==0||i;return i=f,n=d.length,h},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(d,f){t=u(d,f,0)},this.setState=function(d,f,h){const _=d.clippingPlanes,g=d.clipIntersection,m=d.clipShadows,p=r.get(d);if(!i||_===null||_.length===0||s&&!m)s?u(null):c();else{const b=s?0:n,x=b*4;let v=p.clippingState||null;l.value=v,v=u(_,f,x,h);for(let T=0;T!==x;++T)v[T]=t[T];p.clippingState=v,this.numIntersection=g?this.numPlanes:0,this.numPlanes+=b}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function u(d,f,h,_){const g=d!==null?d.length:0;let m=null;if(g!==0){if(m=l.value,_!==!0||m===null){const p=h+g*4,b=f.matrixWorldInverse;a.getNormalMatrix(b),(m===null||m.length<p)&&(m=new Float32Array(p));for(let x=0,v=h;x!==g;++x,v+=4)o.copy(d[x]).applyMatrix4(b,a),o.normal.toArray(m,v),m[v+3]=o.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=g,e.numIntersection=0,m}}function H1(r){let e=new WeakMap;function t(o,a){return a===yf?o.mapping=ba:a===bf&&(o.mapping=wa),o}function n(o){if(o&&o.isTexture){const a=o.mapping;if(a===yf||a===bf)if(e.has(o)){const l=e.get(o).texture;return t(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new fb(l.height);return c.fromEquirectangularTexture(r,o),e.set(o,c),o.addEventListener("dispose",i),t(c.texture,o.mapping)}else return null}}return o}function i(o){const a=o.target;a.removeEventListener("dispose",i);const l=e.get(a);l!==void 0&&(e.delete(a),l.dispose())}function s(){e=new WeakMap}return{get:n,dispose:s}}const vs=4,km=[.125,.215,.35,.446,.526,.582],so=20,G1=512,Ka=new $u,Bm=new je;let Od=null,Nd=0,Fd=0,Ud=!1;const W1=new Y;class zm{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,i=100,s={}){const{size:o=256,position:a=W1}=s;Od=this._renderer.getRenderTarget(),Nd=this._renderer.getActiveCubeFace(),Fd=this._renderer.getActiveMipmapLevel(),Ud=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,n,i,l,a),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Gm(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Hm(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Od,Nd,Fd),this._renderer.xr.enabled=Ud,e.scissorTest=!1,jo(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===ba||e.mapping===wa?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Od=this._renderer.getRenderTarget(),Nd=this._renderer.getActiveCubeFace(),Fd=this._renderer.getActiveMipmapLevel(),Ud=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Kn,minFilter:Kn,generateMipmaps:!1,type:Fa,format:Xi,colorSpace:Jn,depthBuffer:!1},i=Vm(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Vm(e,t,n);const{_lodMax:s}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=X1(s)),this._blurMaterial=Y1(s,e,t)}return i}_compileMaterial(e){const t=new Qn(new mi,e);this._renderer.compile(t,Ka)}_sceneToCubeUV(e,t,n,i,s){const l=new ci(90,1,t,n),c=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],d=this._renderer,f=d.autoClear,h=d.toneMapping;d.getClearColor(Bm),d.toneMapping=Cs,d.autoClear=!1,d.state.buffers.depth.getReversed()&&(d.setRenderTarget(i),d.clearDepth(),d.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Qn(new sc,new oo({name:"PMREM.Background",side:xi,depthWrite:!1,depthTest:!1})));const g=this._backgroundBox,m=g.material;let p=!1;const b=e.background;b?b.isColor&&(m.color.copy(b),e.background=null,p=!0):(m.color.copy(Bm),p=!0);for(let x=0;x<6;x++){const v=x%3;v===0?(l.up.set(0,c[x],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x+u[x],s.y,s.z)):v===1?(l.up.set(0,0,c[x]),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y+u[x],s.z)):(l.up.set(0,c[x],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y,s.z+u[x]));const T=this._cubeSize;jo(i,v*T,x>2?T:0,T,T),d.setRenderTarget(i),p&&d.render(g,l),d.render(e,l)}d.toneMapping=h,d.autoClear=f,e.background=b}_textureToCubeUV(e,t){const n=this._renderer,i=e.mapping===ba||e.mapping===wa;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=Gm()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Hm());const s=i?this._cubemapMaterial:this._equirectMaterial,o=this._lodMeshes[0];o.material=s;const a=s.uniforms;a.envMap.value=e;const l=this._cubeSize;jo(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(o,Ka)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const i=this._lodMeshes.length;for(let s=1;s<i;s++)this._applyGGXFilter(e,s-1,s);t.autoClear=n}_applyGGXFilter(e,t,n){const i=this._renderer,s=this._pingPongRenderTarget;if(this._ggxMaterial===null){const b=3*Math.max(this._cubeSize,16),x=4*this._cubeSize;this._ggxMaterial=q1(this._lodMax,b,x)}const o=this._ggxMaterial,a=this._lodMeshes[n];a.material=o;const l=o.uniforms,c=n/(this._lodMeshes.length-1),u=t/(this._lodMeshes.length-1),d=Math.sqrt(c*c-u*u),f=.05+c*.95,h=d*f,{_lodMax:_}=this,g=this._sizeLods[n],m=3*g*(n>_-vs?n-_+vs:0),p=4*(this._cubeSize-g);l.envMap.value=e.texture,l.roughness.value=h,l.mipInt.value=_-t,jo(s,m,p,3*g,2*g),i.setRenderTarget(s),i.render(a,Ka),l.envMap.value=s.texture,l.roughness.value=0,l.mipInt.value=_-n,jo(e,m,p,3*g,2*g),i.setRenderTarget(e),i.render(a,Ka)}_blur(e,t,n,i,s){const o=this._pingPongRenderTarget;this._halfBlur(e,o,t,n,i,"latitudinal",s),this._halfBlur(o,e,n,n,i,"longitudinal",s)}_halfBlur(e,t,n,i,s,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&Rt("blur direction must be either latitudinal or longitudinal!");const u=3,d=this._lodMeshes[i];d.material=c;const f=c.uniforms,h=this._sizeLods[n]-1,_=isFinite(s)?Math.PI/(2*h):2*Math.PI/(2*so-1),g=s/_,m=isFinite(s)?1+Math.floor(u*g):so;m>so&&ot(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${so}`);const p=[];let b=0;for(let E=0;E<so;++E){const R=E/g,w=Math.exp(-R*R/2);p.push(w),E===0?b+=w:E<m&&(b+=2*w)}for(let E=0;E<p.length;E++)p[E]=p[E]/b;f.envMap.value=e.texture,f.samples.value=m,f.weights.value=p,f.latitudinal.value=o==="latitudinal",a&&(f.poleAxis.value=a);const{_lodMax:x}=this;f.dTheta.value=_,f.mipInt.value=x-n;const v=this._sizeLods[i],T=3*v*(i>x-vs?i-x+vs:0),M=4*(this._cubeSize-v);jo(t,T,M,3*v,2*v),l.setRenderTarget(t),l.render(d,Ka)}}function X1(r){const e=[],t=[],n=[];let i=r;const s=r-vs+1+km.length;for(let o=0;o<s;o++){const a=Math.pow(2,i);e.push(a);let l=1/a;o>r-vs?l=km[o-r+vs-1]:o===0&&(l=0),t.push(l);const c=1/(a-2),u=-c,d=1+c,f=[u,u,d,u,d,d,u,u,d,d,u,d],h=6,_=6,g=3,m=2,p=1,b=new Float32Array(g*_*h),x=new Float32Array(m*_*h),v=new Float32Array(p*_*h);for(let M=0;M<h;M++){const E=M%3*2/3-1,R=M>2?0:-1,w=[E,R,0,E+2/3,R,0,E+2/3,R+1,0,E,R,0,E+2/3,R+1,0,E,R+1,0];b.set(w,g*_*M),x.set(f,m*_*M);const y=[M,M,M,M,M,M];v.set(y,p*_*M)}const T=new mi;T.setAttribute("position",new Qt(b,g)),T.setAttribute("uv",new Qt(x,m)),T.setAttribute("faceIndex",new Qt(v,p)),n.push(new Qn(T,null)),i>vs&&i--}return{lodMeshes:n,sizeLods:e,sigmas:t}}function Vm(r,e,t){const n=new Is(r,e,t);return n.texture.mapping=Gu,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function jo(r,e,t,n,i){r.viewport.set(e,t,n,i),r.scissor.set(e,t,n,i)}function q1(r,e,t){return new hi({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:G1,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:ju(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 3.2: Transform view direction to hemisphere configuration
				vec3 Vh = normalize(vec3(alpha * V.x, alpha * V.y, V.z));

				// Section 4.1: Orthonormal basis
				float lensq = Vh.x * Vh.x + Vh.y * Vh.y;
				vec3 T1 = lensq > 0.0 ? vec3(-Vh.y, Vh.x, 0.0) / sqrt(lensq) : vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(Vh, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + Vh.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * Vh;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:Jr,depthTest:!1,depthWrite:!1})}function Y1(r,e,t){const n=new Float32Array(so),i=new Y(0,1,0);return new hi({name:"SphericalGaussianBlur",defines:{n:so,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:ju(),fragmentShader:`

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
		`,blending:Jr,depthTest:!1,depthWrite:!1})}function Hm(){return new hi({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:ju(),fragmentShader:`

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
		`,blending:Jr,depthTest:!1,depthWrite:!1})}function Gm(){return new hi({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:ju(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Jr,depthTest:!1,depthWrite:!1})}function ju(){return`

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
	`}function $1(r){let e=new WeakMap,t=null;function n(a){if(a&&a.isTexture){const l=a.mapping,c=l===yf||l===bf,u=l===ba||l===wa;if(c||u){let d=e.get(a);const f=d!==void 0?d.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==f)return t===null&&(t=new zm(r)),d=c?t.fromEquirectangular(a,d):t.fromCubemap(a,d),d.texture.pmremVersion=a.pmremVersion,e.set(a,d),d.texture;if(d!==void 0)return d.texture;{const h=a.image;return c&&h&&h.height>0||u&&h&&i(h)?(t===null&&(t=new zm(r)),d=c?t.fromEquirectangular(a):t.fromCubemap(a),d.texture.pmremVersion=a.pmremVersion,e.set(a,d),a.addEventListener("dispose",s),d.texture):null}}}return a}function i(a){let l=0;const c=6;for(let u=0;u<c;u++)a[u]!==void 0&&l++;return l===c}function s(a){const l=a.target;l.removeEventListener("dispose",s);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:o}}function j1(r){const e={};function t(n){if(e[n]!==void 0)return e[n];const i=r.getExtension(n);return e[n]=i,i}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const i=t(n);return i===null&&ql("WebGLRenderer: "+n+" extension not supported."),i}}}function K1(r,e,t,n){const i={},s=new WeakMap;function o(d){const f=d.target;f.index!==null&&e.remove(f.index);for(const _ in f.attributes)e.remove(f.attributes[_]);f.removeEventListener("dispose",o),delete i[f.id];const h=s.get(f);h&&(e.remove(h),s.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,t.memory.geometries--}function a(d,f){return i[f.id]===!0||(f.addEventListener("dispose",o),i[f.id]=!0,t.memory.geometries++),f}function l(d){const f=d.attributes;for(const h in f)e.update(f[h],r.ARRAY_BUFFER)}function c(d){const f=[],h=d.index,_=d.attributes.position;let g=0;if(h!==null){const b=h.array;g=h.version;for(let x=0,v=b.length;x<v;x+=3){const T=b[x+0],M=b[x+1],E=b[x+2];f.push(T,M,M,E,E,T)}}else if(_!==void 0){const b=_.array;g=_.version;for(let x=0,v=b.length/3-1;x<v;x+=3){const T=x+0,M=x+1,E=x+2;f.push(T,M,M,E,E,T)}}else return;const m=new(qg(f)?Zg:Kg)(f,1);m.version=g;const p=s.get(d);p&&e.remove(p),s.set(d,m)}function u(d){const f=s.get(d);if(f){const h=d.index;h!==null&&f.version<h.version&&c(d)}else c(d);return s.get(d)}return{get:a,update:l,getWireframeAttribute:u}}function Z1(r,e,t){let n;function i(f){n=f}let s,o;function a(f){s=f.type,o=f.bytesPerElement}function l(f,h){r.drawElements(n,h,s,f*o),t.update(h,n,1)}function c(f,h,_){_!==0&&(r.drawElementsInstanced(n,h,s,f*o,_),t.update(h,n,_))}function u(f,h,_){if(_===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,h,0,s,f,0,_);let m=0;for(let p=0;p<_;p++)m+=h[p];t.update(m,n,1)}function d(f,h,_,g){if(_===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<f.length;p++)c(f[p]/o,h[p],g[p]);else{m.multiDrawElementsInstancedWEBGL(n,h,0,s,f,0,g,0,_);let p=0;for(let b=0;b<_;b++)p+=h[b]*g[b];t.update(p,n,1)}}this.setMode=i,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=u,this.renderMultiDrawInstances=d}function J1(r){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,o,a){switch(t.calls++,o){case r.TRIANGLES:t.triangles+=a*(s/3);break;case r.LINES:t.lines+=a*(s/2);break;case r.LINE_STRIP:t.lines+=a*(s-1);break;case r.LINE_LOOP:t.lines+=a*s;break;case r.POINTS:t.points+=a*s;break;default:Rt("WebGLInfo: Unknown draw mode:",o);break}}function i(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:i,update:n}}function Q1(r,e,t){const n=new WeakMap,i=new zt;function s(o,a,l){const c=o.morphTargetInfluences,u=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,d=u!==void 0?u.length:0;let f=n.get(a);if(f===void 0||f.count!==d){let y=function(){R.dispose(),n.delete(a),a.removeEventListener("dispose",y)};var h=y;f!==void 0&&f.texture.dispose();const _=a.morphAttributes.position!==void 0,g=a.morphAttributes.normal!==void 0,m=a.morphAttributes.color!==void 0,p=a.morphAttributes.position||[],b=a.morphAttributes.normal||[],x=a.morphAttributes.color||[];let v=0;_===!0&&(v=1),g===!0&&(v=2),m===!0&&(v=3);let T=a.attributes.position.count*v,M=1;T>e.maxTextureSize&&(M=Math.ceil(T/e.maxTextureSize),T=e.maxTextureSize);const E=new Float32Array(T*M*4*d),R=new Yg(E,T,M,d);R.type=sr,R.needsUpdate=!0;const w=v*4;for(let L=0;L<d;L++){const N=p[L],W=b[L],j=x[L],k=T*M*4*L;for(let J=0;J<N.count;J++){const te=J*w;_===!0&&(i.fromBufferAttribute(N,J),E[k+te+0]=i.x,E[k+te+1]=i.y,E[k+te+2]=i.z,E[k+te+3]=0),g===!0&&(i.fromBufferAttribute(W,J),E[k+te+4]=i.x,E[k+te+5]=i.y,E[k+te+6]=i.z,E[k+te+7]=0),m===!0&&(i.fromBufferAttribute(j,J),E[k+te+8]=i.x,E[k+te+9]=i.y,E[k+te+10]=i.z,E[k+te+11]=j.itemSize===4?i.w:1)}}f={count:d,texture:R,size:new Et(T,M)},n.set(a,f),a.addEventListener("dispose",y)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(r,"morphTexture",o.morphTexture,t);else{let _=0;for(let m=0;m<c.length;m++)_+=c[m];const g=a.morphTargetsRelative?1:1-_;l.getUniforms().setValue(r,"morphTargetBaseInfluence",g),l.getUniforms().setValue(r,"morphTargetInfluences",c)}l.getUniforms().setValue(r,"morphTargetsTexture",f.texture,t),l.getUniforms().setValue(r,"morphTargetsTextureSize",f.size)}return{update:s}}function eM(r,e,t,n){let i=new WeakMap;function s(l){const c=n.render.frame,u=l.geometry,d=e.get(l,u);if(i.get(d)!==c&&(e.update(d),i.set(d,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),i.get(l)!==c&&(t.update(l.instanceMatrix,r.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,r.ARRAY_BUFFER),i.set(l,c))),l.isSkinnedMesh){const f=l.skeleton;i.get(f)!==c&&(f.update(),i.set(f,c))}return d}function o(){i=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:s,dispose:o}}const h_=new Pn,Wm=new s_(1,1),p_=new Yg,m_=new jy,g_=new Qg,Xm=[],qm=[],Ym=new Float32Array(16),$m=new Float32Array(9),jm=new Float32Array(4);function za(r,e,t){const n=r[0];if(n<=0||n>0)return r;const i=e*t;let s=Xm[i];if(s===void 0&&(s=new Float32Array(i),Xm[i]=s),e!==0){n.toArray(s,0);for(let o=1,a=0;o!==e;++o)a+=t,r[o].toArray(s,a)}return s}function Ln(r,e){if(r.length!==e.length)return!1;for(let t=0,n=r.length;t<n;t++)if(r[t]!==e[t])return!1;return!0}function Dn(r,e){for(let t=0,n=e.length;t<n;t++)r[t]=e[t]}function Ku(r,e){let t=qm[e];t===void 0&&(t=new Int32Array(e),qm[e]=t);for(let n=0;n!==e;++n)t[n]=r.allocateTextureUnit();return t}function tM(r,e){const t=this.cache;t[0]!==e&&(r.uniform1f(this.addr,e),t[0]=e)}function nM(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ln(t,e))return;r.uniform2fv(this.addr,e),Dn(t,e)}}function iM(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(r.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Ln(t,e))return;r.uniform3fv(this.addr,e),Dn(t,e)}}function rM(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ln(t,e))return;r.uniform4fv(this.addr,e),Dn(t,e)}}function sM(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(Ln(t,e))return;r.uniformMatrix2fv(this.addr,!1,e),Dn(t,e)}else{if(Ln(t,n))return;jm.set(n),r.uniformMatrix2fv(this.addr,!1,jm),Dn(t,n)}}function oM(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(Ln(t,e))return;r.uniformMatrix3fv(this.addr,!1,e),Dn(t,e)}else{if(Ln(t,n))return;$m.set(n),r.uniformMatrix3fv(this.addr,!1,$m),Dn(t,n)}}function aM(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(Ln(t,e))return;r.uniformMatrix4fv(this.addr,!1,e),Dn(t,e)}else{if(Ln(t,n))return;Ym.set(n),r.uniformMatrix4fv(this.addr,!1,Ym),Dn(t,n)}}function lM(r,e){const t=this.cache;t[0]!==e&&(r.uniform1i(this.addr,e),t[0]=e)}function cM(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ln(t,e))return;r.uniform2iv(this.addr,e),Dn(t,e)}}function uM(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Ln(t,e))return;r.uniform3iv(this.addr,e),Dn(t,e)}}function dM(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ln(t,e))return;r.uniform4iv(this.addr,e),Dn(t,e)}}function fM(r,e){const t=this.cache;t[0]!==e&&(r.uniform1ui(this.addr,e),t[0]=e)}function hM(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ln(t,e))return;r.uniform2uiv(this.addr,e),Dn(t,e)}}function pM(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Ln(t,e))return;r.uniform3uiv(this.addr,e),Dn(t,e)}}function mM(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ln(t,e))return;r.uniform4uiv(this.addr,e),Dn(t,e)}}function gM(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i);let s;this.type===r.SAMPLER_2D_SHADOW?(Wm.compareFunction=Xg,s=Wm):s=h_,t.setTexture2D(e||s,i)}function _M(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture3D(e||m_,i)}function xM(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTextureCube(e||g_,i)}function vM(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture2DArray(e||p_,i)}function yM(r){switch(r){case 5126:return tM;case 35664:return nM;case 35665:return iM;case 35666:return rM;case 35674:return sM;case 35675:return oM;case 35676:return aM;case 5124:case 35670:return lM;case 35667:case 35671:return cM;case 35668:case 35672:return uM;case 35669:case 35673:return dM;case 5125:return fM;case 36294:return hM;case 36295:return pM;case 36296:return mM;case 35678:case 36198:case 36298:case 36306:case 35682:return gM;case 35679:case 36299:case 36307:return _M;case 35680:case 36300:case 36308:case 36293:return xM;case 36289:case 36303:case 36311:case 36292:return vM}}function bM(r,e){r.uniform1fv(this.addr,e)}function wM(r,e){const t=za(e,this.size,2);r.uniform2fv(this.addr,t)}function SM(r,e){const t=za(e,this.size,3);r.uniform3fv(this.addr,t)}function MM(r,e){const t=za(e,this.size,4);r.uniform4fv(this.addr,t)}function TM(r,e){const t=za(e,this.size,4);r.uniformMatrix2fv(this.addr,!1,t)}function EM(r,e){const t=za(e,this.size,9);r.uniformMatrix3fv(this.addr,!1,t)}function AM(r,e){const t=za(e,this.size,16);r.uniformMatrix4fv(this.addr,!1,t)}function CM(r,e){r.uniform1iv(this.addr,e)}function RM(r,e){r.uniform2iv(this.addr,e)}function PM(r,e){r.uniform3iv(this.addr,e)}function LM(r,e){r.uniform4iv(this.addr,e)}function DM(r,e){r.uniform1uiv(this.addr,e)}function IM(r,e){r.uniform2uiv(this.addr,e)}function OM(r,e){r.uniform3uiv(this.addr,e)}function NM(r,e){r.uniform4uiv(this.addr,e)}function FM(r,e,t){const n=this.cache,i=e.length,s=Ku(t,i);Ln(n,s)||(r.uniform1iv(this.addr,s),Dn(n,s));for(let o=0;o!==i;++o)t.setTexture2D(e[o]||h_,s[o])}function UM(r,e,t){const n=this.cache,i=e.length,s=Ku(t,i);Ln(n,s)||(r.uniform1iv(this.addr,s),Dn(n,s));for(let o=0;o!==i;++o)t.setTexture3D(e[o]||m_,s[o])}function kM(r,e,t){const n=this.cache,i=e.length,s=Ku(t,i);Ln(n,s)||(r.uniform1iv(this.addr,s),Dn(n,s));for(let o=0;o!==i;++o)t.setTextureCube(e[o]||g_,s[o])}function BM(r,e,t){const n=this.cache,i=e.length,s=Ku(t,i);Ln(n,s)||(r.uniform1iv(this.addr,s),Dn(n,s));for(let o=0;o!==i;++o)t.setTexture2DArray(e[o]||p_,s[o])}function zM(r){switch(r){case 5126:return bM;case 35664:return wM;case 35665:return SM;case 35666:return MM;case 35674:return TM;case 35675:return EM;case 35676:return AM;case 5124:case 35670:return CM;case 35667:case 35671:return RM;case 35668:case 35672:return PM;case 35669:case 35673:return LM;case 5125:return DM;case 36294:return IM;case 36295:return OM;case 36296:return NM;case 35678:case 36198:case 36298:case 36306:case 35682:return FM;case 35679:case 36299:case 36307:return UM;case 35680:case 36300:case 36308:case 36293:return kM;case 36289:case 36303:case 36311:case 36292:return BM}}class VM{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=yM(t.type)}}class HM{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=zM(t.type)}}class GM{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const i=this.seq;for(let s=0,o=i.length;s!==o;++s){const a=i[s];a.setValue(e,t[a.id],n)}}}const kd=/(\w+)(\])?(\[|\.)?/g;function Km(r,e){r.seq.push(e),r.map[e.id]=e}function WM(r,e,t){const n=r.name,i=n.length;for(kd.lastIndex=0;;){const s=kd.exec(n),o=kd.lastIndex;let a=s[1];const l=s[2]==="]",c=s[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===i){Km(t,c===void 0?new VM(a,r,e):new HM(a,r,e));break}else{let d=t.map[a];d===void 0&&(d=new GM(a),Km(t,d)),t=d}}}class ou{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){const s=e.getActiveUniform(t,i),o=e.getUniformLocation(t,s.name);WM(s,o,this)}}setValue(e,t,n,i){const s=this.map[t];s!==void 0&&s.setValue(e,n,i)}setOptional(e,t,n){const i=t[n];i!==void 0&&this.setValue(e,n,i)}static upload(e,t,n,i){for(let s=0,o=t.length;s!==o;++s){const a=t[s],l=n[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,i)}}static seqWithValue(e,t){const n=[];for(let i=0,s=e.length;i!==s;++i){const o=e[i];o.id in t&&n.push(o)}return n}}function Zm(r,e,t){const n=r.createShader(e);return r.shaderSource(n,t),r.compileShader(n),n}const XM=37297;let qM=0;function YM(r,e){const t=r.split(`
`),n=[],i=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let o=i;o<s;o++){const a=o+1;n.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return n.join(`
`)}const Jm=new vt;function $M(r){It._getMatrix(Jm,It.workingColorSpace,r);const e=`mat3( ${Jm.elements.map(t=>t.toFixed(4))} )`;switch(It.getTransfer(r)){case yu:return[e,"LinearTransferOETF"];case Zt:return[e,"sRGBTransferOETF"];default:return ot("WebGLProgram: Unsupported color space: ",r),[e,"LinearTransferOETF"]}}function Qm(r,e,t){const n=r.getShaderParameter(e,r.COMPILE_STATUS),s=(r.getShaderInfoLog(e)||"").trim();if(n&&s==="")return"";const o=/ERROR: 0:(\d+)/.exec(s);if(o){const a=parseInt(o[1]);return t.toUpperCase()+`

`+s+`

`+YM(r.getShaderSource(e),a)}else return s}function jM(r,e){const t=$M(e);return[`vec4 ${r}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function KM(r,e){let t;switch(e){case sy:t="Linear";break;case oy:t="Reinhard";break;case ay:t="Cineon";break;case ly:t="ACESFilmic";break;case uy:t="AgX";break;case dy:t="Neutral";break;case cy:t="Custom";break;default:ot("WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+r+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Nc=new Y;function ZM(){It.getLuminanceCoefficients(Nc);const r=Nc.x.toFixed(4),e=Nc.y.toFixed(4),t=Nc.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${r}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function JM(r){return[r.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",r.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(ll).join(`
`)}function QM(r){const e=[];for(const t in r){const n=r[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function eT(r,e){const t={},n=r.getProgramParameter(e,r.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){const s=r.getActiveAttrib(e,i),o=s.name;let a=1;s.type===r.FLOAT_MAT2&&(a=2),s.type===r.FLOAT_MAT3&&(a=3),s.type===r.FLOAT_MAT4&&(a=4),t[o]={type:s.type,location:r.getAttribLocation(e,o),locationSize:a}}return t}function ll(r){return r!==""}function e0(r,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return r.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function t0(r,e){return r.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const tT=/^[ \t]*#include +<([\w\d./]+)>/gm;function th(r){return r.replace(tT,iT)}const nT=new Map;function iT(r,e){let t=yt[e];if(t===void 0){const n=nT.get(e);if(n!==void 0)t=yt[n],ot('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return th(t)}const rT=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function n0(r){return r.replace(rT,sT)}function sT(r,e,t,n){let i="";for(let s=parseInt(e);s<parseInt(t);s++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return i}function i0(r){let e=`precision ${r.precision} float;
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
#define LOW_PRECISION`),e}function oT(r){let e="SHADOWMAP_TYPE_BASIC";return r.shadowMapType===Ig?e="SHADOWMAP_TYPE_PCF":r.shadowMapType===kv?e="SHADOWMAP_TYPE_PCF_SOFT":r.shadowMapType===Hr&&(e="SHADOWMAP_TYPE_VSM"),e}function aT(r){let e="ENVMAP_TYPE_CUBE";if(r.envMap)switch(r.envMapMode){case ba:case wa:e="ENVMAP_TYPE_CUBE";break;case Gu:e="ENVMAP_TYPE_CUBE_UV";break}return e}function lT(r){let e="ENVMAP_MODE_REFLECTION";if(r.envMap)switch(r.envMapMode){case wa:e="ENVMAP_MODE_REFRACTION";break}return e}function cT(r){let e="ENVMAP_BLENDING_NONE";if(r.envMap)switch(r.combine){case Og:e="ENVMAP_BLENDING_MULTIPLY";break;case iy:e="ENVMAP_BLENDING_MIX";break;case ry:e="ENVMAP_BLENDING_ADD";break}return e}function uT(r){const e=r.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function dT(r,e,t,n){const i=r.getContext(),s=t.defines;let o=t.vertexShader,a=t.fragmentShader;const l=oT(t),c=aT(t),u=lT(t),d=cT(t),f=uT(t),h=JM(t),_=QM(s),g=i.createProgram();let m,p,b=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(ll).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(ll).join(`
`),p.length>0&&(p+=`
`)):(m=[i0(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ll).join(`
`),p=[i0(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+u:"",t.envMap?"#define "+d:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Cs?"#define TONE_MAPPING":"",t.toneMapping!==Cs?yt.tonemapping_pars_fragment:"",t.toneMapping!==Cs?KM("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",yt.colorspace_pars_fragment,jM("linearToOutputTexel",t.outputColorSpace),ZM(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(ll).join(`
`)),o=th(o),o=e0(o,t),o=t0(o,t),a=th(a),a=e0(a,t),a=t0(a,t),o=n0(o),a=n0(a),t.isRawShaderMaterial!==!0&&(b=`#version 300 es
`,m=[h,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",t.glslVersion===em?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===em?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const x=b+m+o,v=b+p+a,T=Zm(i,i.VERTEX_SHADER,x),M=Zm(i,i.FRAGMENT_SHADER,v);i.attachShader(g,T),i.attachShader(g,M),t.index0AttributeName!==void 0?i.bindAttribLocation(g,0,t.index0AttributeName):t.morphTargets===!0&&i.bindAttribLocation(g,0,"position"),i.linkProgram(g);function E(L){if(r.debug.checkShaderErrors){const N=i.getProgramInfoLog(g)||"",W=i.getShaderInfoLog(T)||"",j=i.getShaderInfoLog(M)||"",k=N.trim(),J=W.trim(),te=j.trim();let F=!0,ue=!0;if(i.getProgramParameter(g,i.LINK_STATUS)===!1)if(F=!1,typeof r.debug.onShaderError=="function")r.debug.onShaderError(i,g,T,M);else{const O=Qm(i,T,"vertex"),$=Qm(i,M,"fragment");Rt("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(g,i.VALIDATE_STATUS)+`

Material Name: `+L.name+`
Material Type: `+L.type+`

Program Info Log: `+k+`
`+O+`
`+$)}else k!==""?ot("WebGLProgram: Program Info Log:",k):(J===""||te==="")&&(ue=!1);ue&&(L.diagnostics={runnable:F,programLog:k,vertexShader:{log:J,prefix:m},fragmentShader:{log:te,prefix:p}})}i.deleteShader(T),i.deleteShader(M),R=new ou(i,g),w=eT(i,g)}let R;this.getUniforms=function(){return R===void 0&&E(this),R};let w;this.getAttributes=function(){return w===void 0&&E(this),w};let y=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return y===!1&&(y=i.getProgramParameter(g,XM)),y},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(g),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=qM++,this.cacheKey=e,this.usedTimes=1,this.program=g,this.vertexShader=T,this.fragmentShader=M,this}let fT=0;class hT{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,i=this._getShaderStage(t),s=this._getShaderStage(n),o=this._getShaderCacheForMaterial(e);return o.has(i)===!1&&(o.add(i),i.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new pT(e),t.set(e,n)),n}}class pT{constructor(e){this.id=fT++,this.code=e,this.usedTimes=0}}function mT(r,e,t,n,i,s,o){const a=new $g,l=new hT,c=new Set,u=[],d=i.logarithmicDepthBuffer,f=i.vertexTextures;let h=i.precision;const _={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(w){return c.add(w),w===0?"uv":`uv${w}`}function m(w,y,L,N,W){const j=N.fog,k=W.geometry,J=w.isMeshStandardMaterial?N.environment:null,te=(w.isMeshStandardMaterial?t:e).get(w.envMap||J),F=te&&te.mapping===Gu?te.image.height:null,ue=_[w.type];w.precision!==null&&(h=i.getMaxPrecision(w.precision),h!==w.precision&&ot("WebGLProgram.getParameters:",w.precision,"not supported, using",h,"instead."));const O=k.morphAttributes.position||k.morphAttributes.normal||k.morphAttributes.color,$=O!==void 0?O.length:0;let P=0;k.morphAttributes.position!==void 0&&(P=1),k.morphAttributes.normal!==void 0&&(P=2),k.morphAttributes.color!==void 0&&(P=3);let _e,we,Se,Q;if(ue){const Ee=vr[ue];_e=Ee.vertexShader,we=Ee.fragmentShader}else _e=w.vertexShader,we=w.fragmentShader,l.update(w),Se=l.getVertexShaderID(w),Q=l.getFragmentShaderID(w);const ee=r.getRenderTarget(),q=r.state.buffers.depth.getReversed(),Ie=W.isInstancedMesh===!0,be=W.isBatchedMesh===!0,qe=!!w.map,ht=!!w.matcap,Ne=!!te,at=!!w.aoMap,U=!!w.lightMap,it=!!w.bumpMap,H=!!w.normalMap,rt=!!w.displacementMap,Ae=!!w.emissiveMap,gt=!!w.metalnessMap,Le=!!w.roughnessMap,ke=w.anisotropy>0,I=w.clearcoat>0,C=w.dispersion>0,X=w.iridescence>0,ae=w.sheen>0,oe=w.transmission>0,ne=ke&&!!w.anisotropyMap,Be=I&&!!w.clearcoatMap,ye=I&&!!w.clearcoatNormalMap,Qe=I&&!!w.clearcoatRoughnessMap,Pe=X&&!!w.iridescenceMap,le=X&&!!w.iridescenceThicknessMap,me=ae&&!!w.sheenColorMap,Ge=ae&&!!w.sheenRoughnessMap,Fe=!!w.specularMap,Ce=!!w.specularColorMap,et=!!w.specularIntensityMap,D=oe&&!!w.transmissionMap,ve=oe&&!!w.thicknessMap,ge=!!w.gradientMap,xe=!!w.alphaMap,re=w.alphaTest>0,ce=!!w.alphaHash,Ve=!!w.extensions;let Te=Cs;w.toneMapped&&(ee===null||ee.isXRRenderTarget===!0)&&(Te=r.toneMapping);const Ft={shaderID:ue,shaderType:w.type,shaderName:w.name,vertexShader:_e,fragmentShader:we,defines:w.defines,customVertexShaderID:Se,customFragmentShaderID:Q,isRawShaderMaterial:w.isRawShaderMaterial===!0,glslVersion:w.glslVersion,precision:h,batching:be,batchingColor:be&&W._colorsTexture!==null,instancing:Ie,instancingColor:Ie&&W.instanceColor!==null,instancingMorph:Ie&&W.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:ee===null?r.outputColorSpace:ee.isXRRenderTarget===!0?ee.texture.colorSpace:Jn,alphaToCoverage:!!w.alphaToCoverage,map:qe,matcap:ht,envMap:Ne,envMapMode:Ne&&te.mapping,envMapCubeUVHeight:F,aoMap:at,lightMap:U,bumpMap:it,normalMap:H,displacementMap:f&&rt,emissiveMap:Ae,normalMapObjectSpace:H&&w.normalMapType===_y,normalMapTangentSpace:H&&w.normalMapType===Wg,metalnessMap:gt,roughnessMap:Le,anisotropy:ke,anisotropyMap:ne,clearcoat:I,clearcoatMap:Be,clearcoatNormalMap:ye,clearcoatRoughnessMap:Qe,dispersion:C,iridescence:X,iridescenceMap:Pe,iridescenceThicknessMap:le,sheen:ae,sheenColorMap:me,sheenRoughnessMap:Ge,specularMap:Fe,specularColorMap:Ce,specularIntensityMap:et,transmission:oe,transmissionMap:D,thicknessMap:ve,gradientMap:ge,opaque:w.transparent===!1&&w.blending===As&&w.alphaToCoverage===!1,alphaMap:xe,alphaTest:re,alphaHash:ce,combine:w.combine,mapUv:qe&&g(w.map.channel),aoMapUv:at&&g(w.aoMap.channel),lightMapUv:U&&g(w.lightMap.channel),bumpMapUv:it&&g(w.bumpMap.channel),normalMapUv:H&&g(w.normalMap.channel),displacementMapUv:rt&&g(w.displacementMap.channel),emissiveMapUv:Ae&&g(w.emissiveMap.channel),metalnessMapUv:gt&&g(w.metalnessMap.channel),roughnessMapUv:Le&&g(w.roughnessMap.channel),anisotropyMapUv:ne&&g(w.anisotropyMap.channel),clearcoatMapUv:Be&&g(w.clearcoatMap.channel),clearcoatNormalMapUv:ye&&g(w.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Qe&&g(w.clearcoatRoughnessMap.channel),iridescenceMapUv:Pe&&g(w.iridescenceMap.channel),iridescenceThicknessMapUv:le&&g(w.iridescenceThicknessMap.channel),sheenColorMapUv:me&&g(w.sheenColorMap.channel),sheenRoughnessMapUv:Ge&&g(w.sheenRoughnessMap.channel),specularMapUv:Fe&&g(w.specularMap.channel),specularColorMapUv:Ce&&g(w.specularColorMap.channel),specularIntensityMapUv:et&&g(w.specularIntensityMap.channel),transmissionMapUv:D&&g(w.transmissionMap.channel),thicknessMapUv:ve&&g(w.thicknessMap.channel),alphaMapUv:xe&&g(w.alphaMap.channel),vertexTangents:!!k.attributes.tangent&&(H||ke),vertexColors:w.vertexColors,vertexAlphas:w.vertexColors===!0&&!!k.attributes.color&&k.attributes.color.itemSize===4,pointsUvs:W.isPoints===!0&&!!k.attributes.uv&&(qe||xe),fog:!!j,useFog:w.fog===!0,fogExp2:!!j&&j.isFogExp2,flatShading:w.flatShading===!0&&w.wireframe===!1,sizeAttenuation:w.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:q,skinning:W.isSkinnedMesh===!0,morphTargets:k.morphAttributes.position!==void 0,morphNormals:k.morphAttributes.normal!==void 0,morphColors:k.morphAttributes.color!==void 0,morphTargetsCount:$,morphTextureStride:P,numDirLights:y.directional.length,numPointLights:y.point.length,numSpotLights:y.spot.length,numSpotLightMaps:y.spotLightMap.length,numRectAreaLights:y.rectArea.length,numHemiLights:y.hemi.length,numDirLightShadows:y.directionalShadowMap.length,numPointLightShadows:y.pointShadowMap.length,numSpotLightShadows:y.spotShadowMap.length,numSpotLightShadowsWithMaps:y.numSpotLightShadowsWithMaps,numLightProbes:y.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:w.dithering,shadowMapEnabled:r.shadowMap.enabled&&L.length>0,shadowMapType:r.shadowMap.type,toneMapping:Te,decodeVideoTexture:qe&&w.map.isVideoTexture===!0&&It.getTransfer(w.map.colorSpace)===Zt,decodeVideoTextureEmissive:Ae&&w.emissiveMap.isVideoTexture===!0&&It.getTransfer(w.emissiveMap.colorSpace)===Zt,premultipliedAlpha:w.premultipliedAlpha,doubleSided:w.side===Wi,flipSided:w.side===xi,useDepthPacking:w.depthPacking>=0,depthPacking:w.depthPacking||0,index0AttributeName:w.index0AttributeName,extensionClipCullDistance:Ve&&w.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Ve&&w.extensions.multiDraw===!0||be)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:w.customProgramCacheKey()};return Ft.vertexUv1s=c.has(1),Ft.vertexUv2s=c.has(2),Ft.vertexUv3s=c.has(3),c.clear(),Ft}function p(w){const y=[];if(w.shaderID?y.push(w.shaderID):(y.push(w.customVertexShaderID),y.push(w.customFragmentShaderID)),w.defines!==void 0)for(const L in w.defines)y.push(L),y.push(w.defines[L]);return w.isRawShaderMaterial===!1&&(b(y,w),x(y,w),y.push(r.outputColorSpace)),y.push(w.customProgramCacheKey),y.join()}function b(w,y){w.push(y.precision),w.push(y.outputColorSpace),w.push(y.envMapMode),w.push(y.envMapCubeUVHeight),w.push(y.mapUv),w.push(y.alphaMapUv),w.push(y.lightMapUv),w.push(y.aoMapUv),w.push(y.bumpMapUv),w.push(y.normalMapUv),w.push(y.displacementMapUv),w.push(y.emissiveMapUv),w.push(y.metalnessMapUv),w.push(y.roughnessMapUv),w.push(y.anisotropyMapUv),w.push(y.clearcoatMapUv),w.push(y.clearcoatNormalMapUv),w.push(y.clearcoatRoughnessMapUv),w.push(y.iridescenceMapUv),w.push(y.iridescenceThicknessMapUv),w.push(y.sheenColorMapUv),w.push(y.sheenRoughnessMapUv),w.push(y.specularMapUv),w.push(y.specularColorMapUv),w.push(y.specularIntensityMapUv),w.push(y.transmissionMapUv),w.push(y.thicknessMapUv),w.push(y.combine),w.push(y.fogExp2),w.push(y.sizeAttenuation),w.push(y.morphTargetsCount),w.push(y.morphAttributeCount),w.push(y.numDirLights),w.push(y.numPointLights),w.push(y.numSpotLights),w.push(y.numSpotLightMaps),w.push(y.numHemiLights),w.push(y.numRectAreaLights),w.push(y.numDirLightShadows),w.push(y.numPointLightShadows),w.push(y.numSpotLightShadows),w.push(y.numSpotLightShadowsWithMaps),w.push(y.numLightProbes),w.push(y.shadowMapType),w.push(y.toneMapping),w.push(y.numClippingPlanes),w.push(y.numClipIntersection),w.push(y.depthPacking)}function x(w,y){a.disableAll(),y.supportsVertexTextures&&a.enable(0),y.instancing&&a.enable(1),y.instancingColor&&a.enable(2),y.instancingMorph&&a.enable(3),y.matcap&&a.enable(4),y.envMap&&a.enable(5),y.normalMapObjectSpace&&a.enable(6),y.normalMapTangentSpace&&a.enable(7),y.clearcoat&&a.enable(8),y.iridescence&&a.enable(9),y.alphaTest&&a.enable(10),y.vertexColors&&a.enable(11),y.vertexAlphas&&a.enable(12),y.vertexUv1s&&a.enable(13),y.vertexUv2s&&a.enable(14),y.vertexUv3s&&a.enable(15),y.vertexTangents&&a.enable(16),y.anisotropy&&a.enable(17),y.alphaHash&&a.enable(18),y.batching&&a.enable(19),y.dispersion&&a.enable(20),y.batchingColor&&a.enable(21),y.gradientMap&&a.enable(22),w.push(a.mask),a.disableAll(),y.fog&&a.enable(0),y.useFog&&a.enable(1),y.flatShading&&a.enable(2),y.logarithmicDepthBuffer&&a.enable(3),y.reversedDepthBuffer&&a.enable(4),y.skinning&&a.enable(5),y.morphTargets&&a.enable(6),y.morphNormals&&a.enable(7),y.morphColors&&a.enable(8),y.premultipliedAlpha&&a.enable(9),y.shadowMapEnabled&&a.enable(10),y.doubleSided&&a.enable(11),y.flipSided&&a.enable(12),y.useDepthPacking&&a.enable(13),y.dithering&&a.enable(14),y.transmission&&a.enable(15),y.sheen&&a.enable(16),y.opaque&&a.enable(17),y.pointsUvs&&a.enable(18),y.decodeVideoTexture&&a.enable(19),y.decodeVideoTextureEmissive&&a.enable(20),y.alphaToCoverage&&a.enable(21),w.push(a.mask)}function v(w){const y=_[w.type];let L;if(y){const N=vr[y];L=lb.clone(N.uniforms)}else L=w.uniforms;return L}function T(w,y){let L;for(let N=0,W=u.length;N<W;N++){const j=u[N];if(j.cacheKey===y){L=j,++L.usedTimes;break}}return L===void 0&&(L=new dT(r,y,w,s),u.push(L)),L}function M(w){if(--w.usedTimes===0){const y=u.indexOf(w);u[y]=u[u.length-1],u.pop(),w.destroy()}}function E(w){l.remove(w)}function R(){l.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:v,acquireProgram:T,releaseProgram:M,releaseShaderCache:E,programs:u,dispose:R}}function gT(){let r=new WeakMap;function e(o){return r.has(o)}function t(o){let a=r.get(o);return a===void 0&&(a={},r.set(o,a)),a}function n(o){r.delete(o)}function i(o,a,l){r.get(o)[a]=l}function s(){r=new WeakMap}return{has:e,get:t,remove:n,update:i,dispose:s}}function _T(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.material.id!==e.material.id?r.material.id-e.material.id:r.z!==e.z?r.z-e.z:r.id-e.id}function r0(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.z!==e.z?e.z-r.z:r.id-e.id}function s0(){const r=[];let e=0;const t=[],n=[],i=[];function s(){e=0,t.length=0,n.length=0,i.length=0}function o(d,f,h,_,g,m){let p=r[e];return p===void 0?(p={id:d.id,object:d,geometry:f,material:h,groupOrder:_,renderOrder:d.renderOrder,z:g,group:m},r[e]=p):(p.id=d.id,p.object=d,p.geometry=f,p.material=h,p.groupOrder=_,p.renderOrder=d.renderOrder,p.z=g,p.group=m),e++,p}function a(d,f,h,_,g,m){const p=o(d,f,h,_,g,m);h.transmission>0?n.push(p):h.transparent===!0?i.push(p):t.push(p)}function l(d,f,h,_,g,m){const p=o(d,f,h,_,g,m);h.transmission>0?n.unshift(p):h.transparent===!0?i.unshift(p):t.unshift(p)}function c(d,f){t.length>1&&t.sort(d||_T),n.length>1&&n.sort(f||r0),i.length>1&&i.sort(f||r0)}function u(){for(let d=e,f=r.length;d<f;d++){const h=r[d];if(h.id===null)break;h.id=null,h.object=null,h.geometry=null,h.material=null,h.group=null}}return{opaque:t,transmissive:n,transparent:i,init:s,push:a,unshift:l,finish:u,sort:c}}function xT(){let r=new WeakMap;function e(n,i){const s=r.get(n);let o;return s===void 0?(o=new s0,r.set(n,[o])):i>=s.length?(o=new s0,s.push(o)):o=s[i],o}function t(){r=new WeakMap}return{get:e,dispose:t}}function vT(){const r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new Y,color:new je};break;case"SpotLight":t={position:new Y,direction:new Y,color:new je,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new Y,color:new je,distance:0,decay:0};break;case"HemisphereLight":t={direction:new Y,skyColor:new je,groundColor:new je};break;case"RectAreaLight":t={color:new je,position:new Y,halfWidth:new Y,halfHeight:new Y};break}return r[e.id]=t,t}}}function yT(){const r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Et};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Et};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Et,shadowCameraNear:1,shadowCameraFar:1e3};break}return r[e.id]=t,t}}}let bT=0;function wT(r,e){return(e.castShadow?2:0)-(r.castShadow?2:0)+(e.map?1:0)-(r.map?1:0)}function ST(r){const e=new vT,t=yT(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new Y);const i=new Y,s=new bt,o=new bt;function a(c){let u=0,d=0,f=0;for(let w=0;w<9;w++)n.probe[w].set(0,0,0);let h=0,_=0,g=0,m=0,p=0,b=0,x=0,v=0,T=0,M=0,E=0;c.sort(wT);for(let w=0,y=c.length;w<y;w++){const L=c[w],N=L.color,W=L.intensity,j=L.distance,k=L.shadow&&L.shadow.map?L.shadow.map.texture:null;if(L.isAmbientLight)u+=N.r*W,d+=N.g*W,f+=N.b*W;else if(L.isLightProbe){for(let J=0;J<9;J++)n.probe[J].addScaledVector(L.sh.coefficients[J],W);E++}else if(L.isDirectionalLight){const J=e.get(L);if(J.color.copy(L.color).multiplyScalar(L.intensity),L.castShadow){const te=L.shadow,F=t.get(L);F.shadowIntensity=te.intensity,F.shadowBias=te.bias,F.shadowNormalBias=te.normalBias,F.shadowRadius=te.radius,F.shadowMapSize=te.mapSize,n.directionalShadow[h]=F,n.directionalShadowMap[h]=k,n.directionalShadowMatrix[h]=L.shadow.matrix,b++}n.directional[h]=J,h++}else if(L.isSpotLight){const J=e.get(L);J.position.setFromMatrixPosition(L.matrixWorld),J.color.copy(N).multiplyScalar(W),J.distance=j,J.coneCos=Math.cos(L.angle),J.penumbraCos=Math.cos(L.angle*(1-L.penumbra)),J.decay=L.decay,n.spot[g]=J;const te=L.shadow;if(L.map&&(n.spotLightMap[T]=L.map,T++,te.updateMatrices(L),L.castShadow&&M++),n.spotLightMatrix[g]=te.matrix,L.castShadow){const F=t.get(L);F.shadowIntensity=te.intensity,F.shadowBias=te.bias,F.shadowNormalBias=te.normalBias,F.shadowRadius=te.radius,F.shadowMapSize=te.mapSize,n.spotShadow[g]=F,n.spotShadowMap[g]=k,v++}g++}else if(L.isRectAreaLight){const J=e.get(L);J.color.copy(N).multiplyScalar(W),J.halfWidth.set(L.width*.5,0,0),J.halfHeight.set(0,L.height*.5,0),n.rectArea[m]=J,m++}else if(L.isPointLight){const J=e.get(L);if(J.color.copy(L.color).multiplyScalar(L.intensity),J.distance=L.distance,J.decay=L.decay,L.castShadow){const te=L.shadow,F=t.get(L);F.shadowIntensity=te.intensity,F.shadowBias=te.bias,F.shadowNormalBias=te.normalBias,F.shadowRadius=te.radius,F.shadowMapSize=te.mapSize,F.shadowCameraNear=te.camera.near,F.shadowCameraFar=te.camera.far,n.pointShadow[_]=F,n.pointShadowMap[_]=k,n.pointShadowMatrix[_]=L.shadow.matrix,x++}n.point[_]=J,_++}else if(L.isHemisphereLight){const J=e.get(L);J.skyColor.copy(L.color).multiplyScalar(W),J.groundColor.copy(L.groundColor).multiplyScalar(W),n.hemi[p]=J,p++}}m>0&&(r.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Ue.LTC_FLOAT_1,n.rectAreaLTC2=Ue.LTC_FLOAT_2):(n.rectAreaLTC1=Ue.LTC_HALF_1,n.rectAreaLTC2=Ue.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=d,n.ambient[2]=f;const R=n.hash;(R.directionalLength!==h||R.pointLength!==_||R.spotLength!==g||R.rectAreaLength!==m||R.hemiLength!==p||R.numDirectionalShadows!==b||R.numPointShadows!==x||R.numSpotShadows!==v||R.numSpotMaps!==T||R.numLightProbes!==E)&&(n.directional.length=h,n.spot.length=g,n.rectArea.length=m,n.point.length=_,n.hemi.length=p,n.directionalShadow.length=b,n.directionalShadowMap.length=b,n.pointShadow.length=x,n.pointShadowMap.length=x,n.spotShadow.length=v,n.spotShadowMap.length=v,n.directionalShadowMatrix.length=b,n.pointShadowMatrix.length=x,n.spotLightMatrix.length=v+T-M,n.spotLightMap.length=T,n.numSpotLightShadowsWithMaps=M,n.numLightProbes=E,R.directionalLength=h,R.pointLength=_,R.spotLength=g,R.rectAreaLength=m,R.hemiLength=p,R.numDirectionalShadows=b,R.numPointShadows=x,R.numSpotShadows=v,R.numSpotMaps=T,R.numLightProbes=E,n.version=bT++)}function l(c,u){let d=0,f=0,h=0,_=0,g=0;const m=u.matrixWorldInverse;for(let p=0,b=c.length;p<b;p++){const x=c[p];if(x.isDirectionalLight){const v=n.directional[d];v.direction.setFromMatrixPosition(x.matrixWorld),i.setFromMatrixPosition(x.target.matrixWorld),v.direction.sub(i),v.direction.transformDirection(m),d++}else if(x.isSpotLight){const v=n.spot[h];v.position.setFromMatrixPosition(x.matrixWorld),v.position.applyMatrix4(m),v.direction.setFromMatrixPosition(x.matrixWorld),i.setFromMatrixPosition(x.target.matrixWorld),v.direction.sub(i),v.direction.transformDirection(m),h++}else if(x.isRectAreaLight){const v=n.rectArea[_];v.position.setFromMatrixPosition(x.matrixWorld),v.position.applyMatrix4(m),o.identity(),s.copy(x.matrixWorld),s.premultiply(m),o.extractRotation(s),v.halfWidth.set(x.width*.5,0,0),v.halfHeight.set(0,x.height*.5,0),v.halfWidth.applyMatrix4(o),v.halfHeight.applyMatrix4(o),_++}else if(x.isPointLight){const v=n.point[f];v.position.setFromMatrixPosition(x.matrixWorld),v.position.applyMatrix4(m),f++}else if(x.isHemisphereLight){const v=n.hemi[g];v.direction.setFromMatrixPosition(x.matrixWorld),v.direction.transformDirection(m),g++}}}return{setup:a,setupView:l,state:n}}function o0(r){const e=new ST(r),t=[],n=[];function i(u){c.camera=u,t.length=0,n.length=0}function s(u){t.push(u)}function o(u){n.push(u)}function a(){e.setup(t)}function l(u){e.setupView(t,u)}const c={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:i,state:c,setupLights:a,setupLightsView:l,pushLight:s,pushShadow:o}}function MT(r){let e=new WeakMap;function t(i,s=0){const o=e.get(i);let a;return o===void 0?(a=new o0(r),e.set(i,[a])):s>=o.length?(a=new o0(r),o.push(a)):a=o[s],a}function n(){e=new WeakMap}return{get:t,dispose:n}}const TT=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,ET=`uniform sampler2D shadow_pass;
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
}`;function AT(r,e,t){let n=new rp;const i=new Et,s=new Et,o=new zt,a=new Sb({depthPacking:gy}),l=new Mb,c={},u=t.maxTextureSize,d={[ts]:xi,[xi]:ts,[Wi]:Wi},f=new hi({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Et},radius:{value:4}},vertexShader:TT,fragmentShader:ET}),h=f.clone();h.defines.HORIZONTAL_PASS=1;const _=new mi;_.setAttribute("position",new Qt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const g=new Qn(_,f),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Ig;let p=this.type;this.render=function(M,E,R){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||M.length===0)return;const w=r.getRenderTarget(),y=r.getActiveCubeFace(),L=r.getActiveMipmapLevel(),N=r.state;N.setBlending(Jr),N.buffers.depth.getReversed()===!0?N.buffers.color.setClear(0,0,0,0):N.buffers.color.setClear(1,1,1,1),N.buffers.depth.setTest(!0),N.setScissorTest(!1);const W=p!==Hr&&this.type===Hr,j=p===Hr&&this.type!==Hr;for(let k=0,J=M.length;k<J;k++){const te=M[k],F=te.shadow;if(F===void 0){ot("WebGLShadowMap:",te,"has no shadow.");continue}if(F.autoUpdate===!1&&F.needsUpdate===!1)continue;i.copy(F.mapSize);const ue=F.getFrameExtents();if(i.multiply(ue),s.copy(F.mapSize),(i.x>u||i.y>u)&&(i.x>u&&(s.x=Math.floor(u/ue.x),i.x=s.x*ue.x,F.mapSize.x=s.x),i.y>u&&(s.y=Math.floor(u/ue.y),i.y=s.y*ue.y,F.mapSize.y=s.y)),F.map===null||W===!0||j===!0){const $=this.type!==Hr?{minFilter:pi,magFilter:pi}:{};F.map!==null&&F.map.dispose(),F.map=new Is(i.x,i.y,$),F.map.texture.name=te.name+".shadowMap",F.camera.updateProjectionMatrix()}r.setRenderTarget(F.map),r.clear();const O=F.getViewportCount();for(let $=0;$<O;$++){const P=F.getViewport($);o.set(s.x*P.x,s.y*P.y,s.x*P.z,s.y*P.w),N.viewport(o),F.updateMatrices(te,$),n=F.getFrustum(),v(E,R,F.camera,te,this.type)}F.isPointLightShadow!==!0&&this.type===Hr&&b(F,R),F.needsUpdate=!1}p=this.type,m.needsUpdate=!1,r.setRenderTarget(w,y,L)};function b(M,E){const R=e.update(g);f.defines.VSM_SAMPLES!==M.blurSamples&&(f.defines.VSM_SAMPLES=M.blurSamples,h.defines.VSM_SAMPLES=M.blurSamples,f.needsUpdate=!0,h.needsUpdate=!0),M.mapPass===null&&(M.mapPass=new Is(i.x,i.y)),f.uniforms.shadow_pass.value=M.map.texture,f.uniforms.resolution.value=M.mapSize,f.uniforms.radius.value=M.radius,r.setRenderTarget(M.mapPass),r.clear(),r.renderBufferDirect(E,null,R,f,g,null),h.uniforms.shadow_pass.value=M.mapPass.texture,h.uniforms.resolution.value=M.mapSize,h.uniforms.radius.value=M.radius,r.setRenderTarget(M.map),r.clear(),r.renderBufferDirect(E,null,R,h,g,null)}function x(M,E,R,w){let y=null;const L=R.isPointLight===!0?M.customDistanceMaterial:M.customDepthMaterial;if(L!==void 0)y=L;else if(y=R.isPointLight===!0?l:a,r.localClippingEnabled&&E.clipShadows===!0&&Array.isArray(E.clippingPlanes)&&E.clippingPlanes.length!==0||E.displacementMap&&E.displacementScale!==0||E.alphaMap&&E.alphaTest>0||E.map&&E.alphaTest>0||E.alphaToCoverage===!0){const N=y.uuid,W=E.uuid;let j=c[N];j===void 0&&(j={},c[N]=j);let k=j[W];k===void 0&&(k=y.clone(),j[W]=k,E.addEventListener("dispose",T)),y=k}if(y.visible=E.visible,y.wireframe=E.wireframe,w===Hr?y.side=E.shadowSide!==null?E.shadowSide:E.side:y.side=E.shadowSide!==null?E.shadowSide:d[E.side],y.alphaMap=E.alphaMap,y.alphaTest=E.alphaToCoverage===!0?.5:E.alphaTest,y.map=E.map,y.clipShadows=E.clipShadows,y.clippingPlanes=E.clippingPlanes,y.clipIntersection=E.clipIntersection,y.displacementMap=E.displacementMap,y.displacementScale=E.displacementScale,y.displacementBias=E.displacementBias,y.wireframeLinewidth=E.wireframeLinewidth,y.linewidth=E.linewidth,R.isPointLight===!0&&y.isMeshDistanceMaterial===!0){const N=r.properties.get(y);N.light=R}return y}function v(M,E,R,w,y){if(M.visible===!1)return;if(M.layers.test(E.layers)&&(M.isMesh||M.isLine||M.isPoints)&&(M.castShadow||M.receiveShadow&&y===Hr)&&(!M.frustumCulled||n.intersectsObject(M))){M.modelViewMatrix.multiplyMatrices(R.matrixWorldInverse,M.matrixWorld);const W=e.update(M),j=M.material;if(Array.isArray(j)){const k=W.groups;for(let J=0,te=k.length;J<te;J++){const F=k[J],ue=j[F.materialIndex];if(ue&&ue.visible){const O=x(M,ue,w,y);M.onBeforeShadow(r,M,E,R,W,O,F),r.renderBufferDirect(R,null,W,O,M,F),M.onAfterShadow(r,M,E,R,W,O,F)}}}else if(j.visible){const k=x(M,j,w,y);M.onBeforeShadow(r,M,E,R,W,k,null),r.renderBufferDirect(R,null,W,k,M,null),M.onAfterShadow(r,M,E,R,W,k,null)}}const N=M.children;for(let W=0,j=N.length;W<j;W++)v(N[W],E,R,w,y)}function T(M){M.target.removeEventListener("dispose",T);for(const R in c){const w=c[R],y=M.target.uuid;y in w&&(w[y].dispose(),delete w[y])}}}const CT={[hf]:pf,[mf]:xf,[gf]:vf,[ya]:_f,[pf]:hf,[xf]:mf,[vf]:gf,[_f]:ya};function RT(r,e){function t(){let D=!1;const ve=new zt;let ge=null;const xe=new zt(0,0,0,0);return{setMask:function(re){ge!==re&&!D&&(r.colorMask(re,re,re,re),ge=re)},setLocked:function(re){D=re},setClear:function(re,ce,Ve,Te,Ft){Ft===!0&&(re*=Te,ce*=Te,Ve*=Te),ve.set(re,ce,Ve,Te),xe.equals(ve)===!1&&(r.clearColor(re,ce,Ve,Te),xe.copy(ve))},reset:function(){D=!1,ge=null,xe.set(-1,0,0,0)}}}function n(){let D=!1,ve=!1,ge=null,xe=null,re=null;return{setReversed:function(ce){if(ve!==ce){const Ve=e.get("EXT_clip_control");ce?Ve.clipControlEXT(Ve.LOWER_LEFT_EXT,Ve.ZERO_TO_ONE_EXT):Ve.clipControlEXT(Ve.LOWER_LEFT_EXT,Ve.NEGATIVE_ONE_TO_ONE_EXT),ve=ce;const Te=re;re=null,this.setClear(Te)}},getReversed:function(){return ve},setTest:function(ce){ce?ee(r.DEPTH_TEST):q(r.DEPTH_TEST)},setMask:function(ce){ge!==ce&&!D&&(r.depthMask(ce),ge=ce)},setFunc:function(ce){if(ve&&(ce=CT[ce]),xe!==ce){switch(ce){case hf:r.depthFunc(r.NEVER);break;case pf:r.depthFunc(r.ALWAYS);break;case mf:r.depthFunc(r.LESS);break;case ya:r.depthFunc(r.LEQUAL);break;case gf:r.depthFunc(r.EQUAL);break;case _f:r.depthFunc(r.GEQUAL);break;case xf:r.depthFunc(r.GREATER);break;case vf:r.depthFunc(r.NOTEQUAL);break;default:r.depthFunc(r.LEQUAL)}xe=ce}},setLocked:function(ce){D=ce},setClear:function(ce){re!==ce&&(ve&&(ce=1-ce),r.clearDepth(ce),re=ce)},reset:function(){D=!1,ge=null,xe=null,re=null,ve=!1}}}function i(){let D=!1,ve=null,ge=null,xe=null,re=null,ce=null,Ve=null,Te=null,Ft=null;return{setTest:function(Ee){D||(Ee?ee(r.STENCIL_TEST):q(r.STENCIL_TEST))},setMask:function(Ee){ve!==Ee&&!D&&(r.stencilMask(Ee),ve=Ee)},setFunc:function(Ee,Ke,lt){(ge!==Ee||xe!==Ke||re!==lt)&&(r.stencilFunc(Ee,Ke,lt),ge=Ee,xe=Ke,re=lt)},setOp:function(Ee,Ke,lt){(ce!==Ee||Ve!==Ke||Te!==lt)&&(r.stencilOp(Ee,Ke,lt),ce=Ee,Ve=Ke,Te=lt)},setLocked:function(Ee){D=Ee},setClear:function(Ee){Ft!==Ee&&(r.clearStencil(Ee),Ft=Ee)},reset:function(){D=!1,ve=null,ge=null,xe=null,re=null,ce=null,Ve=null,Te=null,Ft=null}}}const s=new t,o=new n,a=new i,l=new WeakMap,c=new WeakMap;let u={},d={},f=new WeakMap,h=[],_=null,g=!1,m=null,p=null,b=null,x=null,v=null,T=null,M=null,E=new je(0,0,0),R=0,w=!1,y=null,L=null,N=null,W=null,j=null;const k=r.getParameter(r.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let J=!1,te=0;const F=r.getParameter(r.VERSION);F.indexOf("WebGL")!==-1?(te=parseFloat(/^WebGL (\d)/.exec(F)[1]),J=te>=1):F.indexOf("OpenGL ES")!==-1&&(te=parseFloat(/^OpenGL ES (\d)/.exec(F)[1]),J=te>=2);let ue=null,O={};const $=r.getParameter(r.SCISSOR_BOX),P=r.getParameter(r.VIEWPORT),_e=new zt().fromArray($),we=new zt().fromArray(P);function Se(D,ve,ge,xe){const re=new Uint8Array(4),ce=r.createTexture();r.bindTexture(D,ce),r.texParameteri(D,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(D,r.TEXTURE_MAG_FILTER,r.NEAREST);for(let Ve=0;Ve<ge;Ve++)D===r.TEXTURE_3D||D===r.TEXTURE_2D_ARRAY?r.texImage3D(ve,0,r.RGBA,1,1,xe,0,r.RGBA,r.UNSIGNED_BYTE,re):r.texImage2D(ve+Ve,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,re);return ce}const Q={};Q[r.TEXTURE_2D]=Se(r.TEXTURE_2D,r.TEXTURE_2D,1),Q[r.TEXTURE_CUBE_MAP]=Se(r.TEXTURE_CUBE_MAP,r.TEXTURE_CUBE_MAP_POSITIVE_X,6),Q[r.TEXTURE_2D_ARRAY]=Se(r.TEXTURE_2D_ARRAY,r.TEXTURE_2D_ARRAY,1,1),Q[r.TEXTURE_3D]=Se(r.TEXTURE_3D,r.TEXTURE_3D,1,1),s.setClear(0,0,0,1),o.setClear(1),a.setClear(0),ee(r.DEPTH_TEST),o.setFunc(ya),it(!1),H(qp),ee(r.CULL_FACE),at(Jr);function ee(D){u[D]!==!0&&(r.enable(D),u[D]=!0)}function q(D){u[D]!==!1&&(r.disable(D),u[D]=!1)}function Ie(D,ve){return d[D]!==ve?(r.bindFramebuffer(D,ve),d[D]=ve,D===r.DRAW_FRAMEBUFFER&&(d[r.FRAMEBUFFER]=ve),D===r.FRAMEBUFFER&&(d[r.DRAW_FRAMEBUFFER]=ve),!0):!1}function be(D,ve){let ge=h,xe=!1;if(D){ge=f.get(ve),ge===void 0&&(ge=[],f.set(ve,ge));const re=D.textures;if(ge.length!==re.length||ge[0]!==r.COLOR_ATTACHMENT0){for(let ce=0,Ve=re.length;ce<Ve;ce++)ge[ce]=r.COLOR_ATTACHMENT0+ce;ge.length=re.length,xe=!0}}else ge[0]!==r.BACK&&(ge[0]=r.BACK,xe=!0);xe&&r.drawBuffers(ge)}function qe(D){return _!==D?(r.useProgram(D),_=D,!0):!1}const ht={[ro]:r.FUNC_ADD,[zv]:r.FUNC_SUBTRACT,[Vv]:r.FUNC_REVERSE_SUBTRACT};ht[Hv]=r.MIN,ht[Gv]=r.MAX;const Ne={[Wv]:r.ZERO,[Xv]:r.ONE,[qv]:r.SRC_COLOR,[df]:r.SRC_ALPHA,[Jv]:r.SRC_ALPHA_SATURATE,[Kv]:r.DST_COLOR,[$v]:r.DST_ALPHA,[Yv]:r.ONE_MINUS_SRC_COLOR,[ff]:r.ONE_MINUS_SRC_ALPHA,[Zv]:r.ONE_MINUS_DST_COLOR,[jv]:r.ONE_MINUS_DST_ALPHA,[Qv]:r.CONSTANT_COLOR,[ey]:r.ONE_MINUS_CONSTANT_COLOR,[ty]:r.CONSTANT_ALPHA,[ny]:r.ONE_MINUS_CONSTANT_ALPHA};function at(D,ve,ge,xe,re,ce,Ve,Te,Ft,Ee){if(D===Jr){g===!0&&(q(r.BLEND),g=!1);return}if(g===!1&&(ee(r.BLEND),g=!0),D!==Bv){if(D!==m||Ee!==w){if((p!==ro||v!==ro)&&(r.blendEquation(r.FUNC_ADD),p=ro,v=ro),Ee)switch(D){case As:r.blendFuncSeparate(r.ONE,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case xu:r.blendFunc(r.ONE,r.ONE);break;case Yp:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case $p:r.blendFuncSeparate(r.DST_COLOR,r.ONE_MINUS_SRC_ALPHA,r.ZERO,r.ONE);break;default:Rt("WebGLState: Invalid blending: ",D);break}else switch(D){case As:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case xu:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE,r.ONE,r.ONE);break;case Yp:Rt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case $p:Rt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Rt("WebGLState: Invalid blending: ",D);break}b=null,x=null,T=null,M=null,E.set(0,0,0),R=0,m=D,w=Ee}return}re=re||ve,ce=ce||ge,Ve=Ve||xe,(ve!==p||re!==v)&&(r.blendEquationSeparate(ht[ve],ht[re]),p=ve,v=re),(ge!==b||xe!==x||ce!==T||Ve!==M)&&(r.blendFuncSeparate(Ne[ge],Ne[xe],Ne[ce],Ne[Ve]),b=ge,x=xe,T=ce,M=Ve),(Te.equals(E)===!1||Ft!==R)&&(r.blendColor(Te.r,Te.g,Te.b,Ft),E.copy(Te),R=Ft),m=D,w=!1}function U(D,ve){D.side===Wi?q(r.CULL_FACE):ee(r.CULL_FACE);let ge=D.side===xi;ve&&(ge=!ge),it(ge),D.blending===As&&D.transparent===!1?at(Jr):at(D.blending,D.blendEquation,D.blendSrc,D.blendDst,D.blendEquationAlpha,D.blendSrcAlpha,D.blendDstAlpha,D.blendColor,D.blendAlpha,D.premultipliedAlpha),o.setFunc(D.depthFunc),o.setTest(D.depthTest),o.setMask(D.depthWrite),s.setMask(D.colorWrite);const xe=D.stencilWrite;a.setTest(xe),xe&&(a.setMask(D.stencilWriteMask),a.setFunc(D.stencilFunc,D.stencilRef,D.stencilFuncMask),a.setOp(D.stencilFail,D.stencilZFail,D.stencilZPass)),Ae(D.polygonOffset,D.polygonOffsetFactor,D.polygonOffsetUnits),D.alphaToCoverage===!0?ee(r.SAMPLE_ALPHA_TO_COVERAGE):q(r.SAMPLE_ALPHA_TO_COVERAGE)}function it(D){y!==D&&(D?r.frontFace(r.CW):r.frontFace(r.CCW),y=D)}function H(D){D!==Fv?(ee(r.CULL_FACE),D!==L&&(D===qp?r.cullFace(r.BACK):D===Uv?r.cullFace(r.FRONT):r.cullFace(r.FRONT_AND_BACK))):q(r.CULL_FACE),L=D}function rt(D){D!==N&&(J&&r.lineWidth(D),N=D)}function Ae(D,ve,ge){D?(ee(r.POLYGON_OFFSET_FILL),(W!==ve||j!==ge)&&(r.polygonOffset(ve,ge),W=ve,j=ge)):q(r.POLYGON_OFFSET_FILL)}function gt(D){D?ee(r.SCISSOR_TEST):q(r.SCISSOR_TEST)}function Le(D){D===void 0&&(D=r.TEXTURE0+k-1),ue!==D&&(r.activeTexture(D),ue=D)}function ke(D,ve,ge){ge===void 0&&(ue===null?ge=r.TEXTURE0+k-1:ge=ue);let xe=O[ge];xe===void 0&&(xe={type:void 0,texture:void 0},O[ge]=xe),(xe.type!==D||xe.texture!==ve)&&(ue!==ge&&(r.activeTexture(ge),ue=ge),r.bindTexture(D,ve||Q[D]),xe.type=D,xe.texture=ve)}function I(){const D=O[ue];D!==void 0&&D.type!==void 0&&(r.bindTexture(D.type,null),D.type=void 0,D.texture=void 0)}function C(){try{r.compressedTexImage2D(...arguments)}catch(D){D("WebGLState:",D)}}function X(){try{r.compressedTexImage3D(...arguments)}catch(D){D("WebGLState:",D)}}function ae(){try{r.texSubImage2D(...arguments)}catch(D){D("WebGLState:",D)}}function oe(){try{r.texSubImage3D(...arguments)}catch(D){D("WebGLState:",D)}}function ne(){try{r.compressedTexSubImage2D(...arguments)}catch(D){D("WebGLState:",D)}}function Be(){try{r.compressedTexSubImage3D(...arguments)}catch(D){D("WebGLState:",D)}}function ye(){try{r.texStorage2D(...arguments)}catch(D){D("WebGLState:",D)}}function Qe(){try{r.texStorage3D(...arguments)}catch(D){D("WebGLState:",D)}}function Pe(){try{r.texImage2D(...arguments)}catch(D){D("WebGLState:",D)}}function le(){try{r.texImage3D(...arguments)}catch(D){D("WebGLState:",D)}}function me(D){_e.equals(D)===!1&&(r.scissor(D.x,D.y,D.z,D.w),_e.copy(D))}function Ge(D){we.equals(D)===!1&&(r.viewport(D.x,D.y,D.z,D.w),we.copy(D))}function Fe(D,ve){let ge=c.get(ve);ge===void 0&&(ge=new WeakMap,c.set(ve,ge));let xe=ge.get(D);xe===void 0&&(xe=r.getUniformBlockIndex(ve,D.name),ge.set(D,xe))}function Ce(D,ve){const xe=c.get(ve).get(D);l.get(ve)!==xe&&(r.uniformBlockBinding(ve,xe,D.__bindingPointIndex),l.set(ve,xe))}function et(){r.disable(r.BLEND),r.disable(r.CULL_FACE),r.disable(r.DEPTH_TEST),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.disable(r.SAMPLE_ALPHA_TO_COVERAGE),r.blendEquation(r.FUNC_ADD),r.blendFunc(r.ONE,r.ZERO),r.blendFuncSeparate(r.ONE,r.ZERO,r.ONE,r.ZERO),r.blendColor(0,0,0,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(r.LESS),o.setReversed(!1),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(r.ALWAYS,0,4294967295),r.stencilOp(r.KEEP,r.KEEP,r.KEEP),r.clearStencil(0),r.cullFace(r.BACK),r.frontFace(r.CCW),r.polygonOffset(0,0),r.activeTexture(r.TEXTURE0),r.bindFramebuffer(r.FRAMEBUFFER,null),r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),r.bindFramebuffer(r.READ_FRAMEBUFFER,null),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),u={},ue=null,O={},d={},f=new WeakMap,h=[],_=null,g=!1,m=null,p=null,b=null,x=null,v=null,T=null,M=null,E=new je(0,0,0),R=0,w=!1,y=null,L=null,N=null,W=null,j=null,_e.set(0,0,r.canvas.width,r.canvas.height),we.set(0,0,r.canvas.width,r.canvas.height),s.reset(),o.reset(),a.reset()}return{buffers:{color:s,depth:o,stencil:a},enable:ee,disable:q,bindFramebuffer:Ie,drawBuffers:be,useProgram:qe,setBlending:at,setMaterial:U,setFlipSided:it,setCullFace:H,setLineWidth:rt,setPolygonOffset:Ae,setScissorTest:gt,activeTexture:Le,bindTexture:ke,unbindTexture:I,compressedTexImage2D:C,compressedTexImage3D:X,texImage2D:Pe,texImage3D:le,updateUBOMapping:Fe,uniformBlockBinding:Ce,texStorage2D:ye,texStorage3D:Qe,texSubImage2D:ae,texSubImage3D:oe,compressedTexSubImage2D:ne,compressedTexSubImage3D:Be,scissor:me,viewport:Ge,reset:et}}function PT(r,e,t,n,i,s,o){const a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Et,u=new WeakMap;let d;const f=new WeakMap;let h=!1;try{h=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function _(I,C){return h?new OffscreenCanvas(I,C):Xl("canvas")}function g(I,C,X){let ae=1;const oe=ke(I);if((oe.width>X||oe.height>X)&&(ae=X/Math.max(oe.width,oe.height)),ae<1)if(typeof HTMLImageElement<"u"&&I instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&I instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&I instanceof ImageBitmap||typeof VideoFrame<"u"&&I instanceof VideoFrame){const ne=Math.floor(ae*oe.width),Be=Math.floor(ae*oe.height);d===void 0&&(d=_(ne,Be));const ye=C?_(ne,Be):d;return ye.width=ne,ye.height=Be,ye.getContext("2d").drawImage(I,0,0,ne,Be),ot("WebGLRenderer: Texture has been resized from ("+oe.width+"x"+oe.height+") to ("+ne+"x"+Be+")."),ye}else return"data"in I&&ot("WebGLRenderer: Image in DataTexture is too big ("+oe.width+"x"+oe.height+")."),I;return I}function m(I){return I.generateMipmaps}function p(I){r.generateMipmap(I)}function b(I){return I.isWebGLCubeRenderTarget?r.TEXTURE_CUBE_MAP:I.isWebGL3DRenderTarget?r.TEXTURE_3D:I.isWebGLArrayRenderTarget||I.isCompressedArrayTexture?r.TEXTURE_2D_ARRAY:r.TEXTURE_2D}function x(I,C,X,ae,oe=!1){if(I!==null){if(r[I]!==void 0)return r[I];ot("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+I+"'")}let ne=C;if(C===r.RED&&(X===r.FLOAT&&(ne=r.R32F),X===r.HALF_FLOAT&&(ne=r.R16F),X===r.UNSIGNED_BYTE&&(ne=r.R8)),C===r.RED_INTEGER&&(X===r.UNSIGNED_BYTE&&(ne=r.R8UI),X===r.UNSIGNED_SHORT&&(ne=r.R16UI),X===r.UNSIGNED_INT&&(ne=r.R32UI),X===r.BYTE&&(ne=r.R8I),X===r.SHORT&&(ne=r.R16I),X===r.INT&&(ne=r.R32I)),C===r.RG&&(X===r.FLOAT&&(ne=r.RG32F),X===r.HALF_FLOAT&&(ne=r.RG16F),X===r.UNSIGNED_BYTE&&(ne=r.RG8)),C===r.RG_INTEGER&&(X===r.UNSIGNED_BYTE&&(ne=r.RG8UI),X===r.UNSIGNED_SHORT&&(ne=r.RG16UI),X===r.UNSIGNED_INT&&(ne=r.RG32UI),X===r.BYTE&&(ne=r.RG8I),X===r.SHORT&&(ne=r.RG16I),X===r.INT&&(ne=r.RG32I)),C===r.RGB_INTEGER&&(X===r.UNSIGNED_BYTE&&(ne=r.RGB8UI),X===r.UNSIGNED_SHORT&&(ne=r.RGB16UI),X===r.UNSIGNED_INT&&(ne=r.RGB32UI),X===r.BYTE&&(ne=r.RGB8I),X===r.SHORT&&(ne=r.RGB16I),X===r.INT&&(ne=r.RGB32I)),C===r.RGBA_INTEGER&&(X===r.UNSIGNED_BYTE&&(ne=r.RGBA8UI),X===r.UNSIGNED_SHORT&&(ne=r.RGBA16UI),X===r.UNSIGNED_INT&&(ne=r.RGBA32UI),X===r.BYTE&&(ne=r.RGBA8I),X===r.SHORT&&(ne=r.RGBA16I),X===r.INT&&(ne=r.RGBA32I)),C===r.RGB&&(X===r.UNSIGNED_INT_5_9_9_9_REV&&(ne=r.RGB9_E5),X===r.UNSIGNED_INT_10F_11F_11F_REV&&(ne=r.R11F_G11F_B10F)),C===r.RGBA){const Be=oe?yu:It.getTransfer(ae);X===r.FLOAT&&(ne=r.RGBA32F),X===r.HALF_FLOAT&&(ne=r.RGBA16F),X===r.UNSIGNED_BYTE&&(ne=Be===Zt?r.SRGB8_ALPHA8:r.RGBA8),X===r.UNSIGNED_SHORT_4_4_4_4&&(ne=r.RGBA4),X===r.UNSIGNED_SHORT_5_5_5_1&&(ne=r.RGB5_A1)}return(ne===r.R16F||ne===r.R32F||ne===r.RG16F||ne===r.RG32F||ne===r.RGBA16F||ne===r.RGBA32F)&&e.get("EXT_color_buffer_float"),ne}function v(I,C){let X;return I?C===null||C===bo||C===zl?X=r.DEPTH24_STENCIL8:C===sr?X=r.DEPTH32F_STENCIL8:C===Bl&&(X=r.DEPTH24_STENCIL8,ot("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):C===null||C===bo||C===zl?X=r.DEPTH_COMPONENT24:C===sr?X=r.DEPTH_COMPONENT32F:C===Bl&&(X=r.DEPTH_COMPONENT16),X}function T(I,C){return m(I)===!0||I.isFramebufferTexture&&I.minFilter!==pi&&I.minFilter!==Kn?Math.log2(Math.max(C.width,C.height))+1:I.mipmaps!==void 0&&I.mipmaps.length>0?I.mipmaps.length:I.isCompressedTexture&&Array.isArray(I.image)?C.mipmaps.length:1}function M(I){const C=I.target;C.removeEventListener("dispose",M),R(C),C.isVideoTexture&&u.delete(C)}function E(I){const C=I.target;C.removeEventListener("dispose",E),y(C)}function R(I){const C=n.get(I);if(C.__webglInit===void 0)return;const X=I.source,ae=f.get(X);if(ae){const oe=ae[C.__cacheKey];oe.usedTimes--,oe.usedTimes===0&&w(I),Object.keys(ae).length===0&&f.delete(X)}n.remove(I)}function w(I){const C=n.get(I);r.deleteTexture(C.__webglTexture);const X=I.source,ae=f.get(X);delete ae[C.__cacheKey],o.memory.textures--}function y(I){const C=n.get(I);if(I.depthTexture&&(I.depthTexture.dispose(),n.remove(I.depthTexture)),I.isWebGLCubeRenderTarget)for(let ae=0;ae<6;ae++){if(Array.isArray(C.__webglFramebuffer[ae]))for(let oe=0;oe<C.__webglFramebuffer[ae].length;oe++)r.deleteFramebuffer(C.__webglFramebuffer[ae][oe]);else r.deleteFramebuffer(C.__webglFramebuffer[ae]);C.__webglDepthbuffer&&r.deleteRenderbuffer(C.__webglDepthbuffer[ae])}else{if(Array.isArray(C.__webglFramebuffer))for(let ae=0;ae<C.__webglFramebuffer.length;ae++)r.deleteFramebuffer(C.__webglFramebuffer[ae]);else r.deleteFramebuffer(C.__webglFramebuffer);if(C.__webglDepthbuffer&&r.deleteRenderbuffer(C.__webglDepthbuffer),C.__webglMultisampledFramebuffer&&r.deleteFramebuffer(C.__webglMultisampledFramebuffer),C.__webglColorRenderbuffer)for(let ae=0;ae<C.__webglColorRenderbuffer.length;ae++)C.__webglColorRenderbuffer[ae]&&r.deleteRenderbuffer(C.__webglColorRenderbuffer[ae]);C.__webglDepthRenderbuffer&&r.deleteRenderbuffer(C.__webglDepthRenderbuffer)}const X=I.textures;for(let ae=0,oe=X.length;ae<oe;ae++){const ne=n.get(X[ae]);ne.__webglTexture&&(r.deleteTexture(ne.__webglTexture),o.memory.textures--),n.remove(X[ae])}n.remove(I)}let L=0;function N(){L=0}function W(){const I=L;return I>=i.maxTextures&&ot("WebGLTextures: Trying to use "+I+" texture units while this GPU supports only "+i.maxTextures),L+=1,I}function j(I){const C=[];return C.push(I.wrapS),C.push(I.wrapT),C.push(I.wrapR||0),C.push(I.magFilter),C.push(I.minFilter),C.push(I.anisotropy),C.push(I.internalFormat),C.push(I.format),C.push(I.type),C.push(I.generateMipmaps),C.push(I.premultiplyAlpha),C.push(I.flipY),C.push(I.unpackAlignment),C.push(I.colorSpace),C.join()}function k(I,C){const X=n.get(I);if(I.isVideoTexture&&gt(I),I.isRenderTargetTexture===!1&&I.isExternalTexture!==!0&&I.version>0&&X.__version!==I.version){const ae=I.image;if(ae===null)ot("WebGLRenderer: Texture marked for update but no image data found.");else if(ae.complete===!1)ot("WebGLRenderer: Texture marked for update but image is incomplete");else{Q(X,I,C);return}}else I.isExternalTexture&&(X.__webglTexture=I.sourceTexture?I.sourceTexture:null);t.bindTexture(r.TEXTURE_2D,X.__webglTexture,r.TEXTURE0+C)}function J(I,C){const X=n.get(I);if(I.isRenderTargetTexture===!1&&I.version>0&&X.__version!==I.version){Q(X,I,C);return}else I.isExternalTexture&&(X.__webglTexture=I.sourceTexture?I.sourceTexture:null);t.bindTexture(r.TEXTURE_2D_ARRAY,X.__webglTexture,r.TEXTURE0+C)}function te(I,C){const X=n.get(I);if(I.isRenderTargetTexture===!1&&I.version>0&&X.__version!==I.version){Q(X,I,C);return}t.bindTexture(r.TEXTURE_3D,X.__webglTexture,r.TEXTURE0+C)}function F(I,C){const X=n.get(I);if(I.version>0&&X.__version!==I.version){ee(X,I,C);return}t.bindTexture(r.TEXTURE_CUBE_MAP,X.__webglTexture,r.TEXTURE0+C)}const ue={[Sa]:r.REPEAT,[wr]:r.CLAMP_TO_EDGE,[vu]:r.MIRRORED_REPEAT},O={[pi]:r.NEAREST,[Fg]:r.NEAREST_MIPMAP_NEAREST,[al]:r.NEAREST_MIPMAP_LINEAR,[Kn]:r.LINEAR,[tu]:r.LINEAR_MIPMAP_NEAREST,[Yr]:r.LINEAR_MIPMAP_LINEAR},$={[xy]:r.NEVER,[My]:r.ALWAYS,[vy]:r.LESS,[Xg]:r.LEQUAL,[yy]:r.EQUAL,[Sy]:r.GEQUAL,[by]:r.GREATER,[wy]:r.NOTEQUAL};function P(I,C){if(C.type===sr&&e.has("OES_texture_float_linear")===!1&&(C.magFilter===Kn||C.magFilter===tu||C.magFilter===al||C.magFilter===Yr||C.minFilter===Kn||C.minFilter===tu||C.minFilter===al||C.minFilter===Yr)&&ot("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),r.texParameteri(I,r.TEXTURE_WRAP_S,ue[C.wrapS]),r.texParameteri(I,r.TEXTURE_WRAP_T,ue[C.wrapT]),(I===r.TEXTURE_3D||I===r.TEXTURE_2D_ARRAY)&&r.texParameteri(I,r.TEXTURE_WRAP_R,ue[C.wrapR]),r.texParameteri(I,r.TEXTURE_MAG_FILTER,O[C.magFilter]),r.texParameteri(I,r.TEXTURE_MIN_FILTER,O[C.minFilter]),C.compareFunction&&(r.texParameteri(I,r.TEXTURE_COMPARE_MODE,r.COMPARE_REF_TO_TEXTURE),r.texParameteri(I,r.TEXTURE_COMPARE_FUNC,$[C.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(C.magFilter===pi||C.minFilter!==al&&C.minFilter!==Yr||C.type===sr&&e.has("OES_texture_float_linear")===!1)return;if(C.anisotropy>1||n.get(C).__currentAnisotropy){const X=e.get("EXT_texture_filter_anisotropic");r.texParameterf(I,X.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(C.anisotropy,i.getMaxAnisotropy())),n.get(C).__currentAnisotropy=C.anisotropy}}}function _e(I,C){let X=!1;I.__webglInit===void 0&&(I.__webglInit=!0,C.addEventListener("dispose",M));const ae=C.source;let oe=f.get(ae);oe===void 0&&(oe={},f.set(ae,oe));const ne=j(C);if(ne!==I.__cacheKey){oe[ne]===void 0&&(oe[ne]={texture:r.createTexture(),usedTimes:0},o.memory.textures++,X=!0),oe[ne].usedTimes++;const Be=oe[I.__cacheKey];Be!==void 0&&(oe[I.__cacheKey].usedTimes--,Be.usedTimes===0&&w(C)),I.__cacheKey=ne,I.__webglTexture=oe[ne].texture}return X}function we(I,C,X){return Math.floor(Math.floor(I/X)/C)}function Se(I,C,X,ae){const ne=I.updateRanges;if(ne.length===0)t.texSubImage2D(r.TEXTURE_2D,0,0,0,C.width,C.height,X,ae,C.data);else{ne.sort((le,me)=>le.start-me.start);let Be=0;for(let le=1;le<ne.length;le++){const me=ne[Be],Ge=ne[le],Fe=me.start+me.count,Ce=we(Ge.start,C.width,4),et=we(me.start,C.width,4);Ge.start<=Fe+1&&Ce===et&&we(Ge.start+Ge.count-1,C.width,4)===Ce?me.count=Math.max(me.count,Ge.start+Ge.count-me.start):(++Be,ne[Be]=Ge)}ne.length=Be+1;const ye=r.getParameter(r.UNPACK_ROW_LENGTH),Qe=r.getParameter(r.UNPACK_SKIP_PIXELS),Pe=r.getParameter(r.UNPACK_SKIP_ROWS);r.pixelStorei(r.UNPACK_ROW_LENGTH,C.width);for(let le=0,me=ne.length;le<me;le++){const Ge=ne[le],Fe=Math.floor(Ge.start/4),Ce=Math.ceil(Ge.count/4),et=Fe%C.width,D=Math.floor(Fe/C.width),ve=Ce,ge=1;r.pixelStorei(r.UNPACK_SKIP_PIXELS,et),r.pixelStorei(r.UNPACK_SKIP_ROWS,D),t.texSubImage2D(r.TEXTURE_2D,0,et,D,ve,ge,X,ae,C.data)}I.clearUpdateRanges(),r.pixelStorei(r.UNPACK_ROW_LENGTH,ye),r.pixelStorei(r.UNPACK_SKIP_PIXELS,Qe),r.pixelStorei(r.UNPACK_SKIP_ROWS,Pe)}}function Q(I,C,X){let ae=r.TEXTURE_2D;(C.isDataArrayTexture||C.isCompressedArrayTexture)&&(ae=r.TEXTURE_2D_ARRAY),C.isData3DTexture&&(ae=r.TEXTURE_3D);const oe=_e(I,C),ne=C.source;t.bindTexture(ae,I.__webglTexture,r.TEXTURE0+X);const Be=n.get(ne);if(ne.version!==Be.__version||oe===!0){t.activeTexture(r.TEXTURE0+X);const ye=It.getPrimaries(It.workingColorSpace),Qe=C.colorSpace===_s?null:It.getPrimaries(C.colorSpace),Pe=C.colorSpace===_s||ye===Qe?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,C.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,C.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,C.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,Pe);let le=g(C.image,!1,i.maxTextureSize);le=Le(C,le);const me=s.convert(C.format,C.colorSpace),Ge=s.convert(C.type);let Fe=x(C.internalFormat,me,Ge,C.colorSpace,C.isVideoTexture);P(ae,C);let Ce;const et=C.mipmaps,D=C.isVideoTexture!==!0,ve=Be.__version===void 0||oe===!0,ge=ne.dataReady,xe=T(C,le);if(C.isDepthTexture)Fe=v(C.format===Hl,C.type),ve&&(D?t.texStorage2D(r.TEXTURE_2D,1,Fe,le.width,le.height):t.texImage2D(r.TEXTURE_2D,0,Fe,le.width,le.height,0,me,Ge,null));else if(C.isDataTexture)if(et.length>0){D&&ve&&t.texStorage2D(r.TEXTURE_2D,xe,Fe,et[0].width,et[0].height);for(let re=0,ce=et.length;re<ce;re++)Ce=et[re],D?ge&&t.texSubImage2D(r.TEXTURE_2D,re,0,0,Ce.width,Ce.height,me,Ge,Ce.data):t.texImage2D(r.TEXTURE_2D,re,Fe,Ce.width,Ce.height,0,me,Ge,Ce.data);C.generateMipmaps=!1}else D?(ve&&t.texStorage2D(r.TEXTURE_2D,xe,Fe,le.width,le.height),ge&&Se(C,le,me,Ge)):t.texImage2D(r.TEXTURE_2D,0,Fe,le.width,le.height,0,me,Ge,le.data);else if(C.isCompressedTexture)if(C.isCompressedArrayTexture){D&&ve&&t.texStorage3D(r.TEXTURE_2D_ARRAY,xe,Fe,et[0].width,et[0].height,le.depth);for(let re=0,ce=et.length;re<ce;re++)if(Ce=et[re],C.format!==Xi)if(me!==null)if(D){if(ge)if(C.layerUpdates.size>0){const Ve=Um(Ce.width,Ce.height,C.format,C.type);for(const Te of C.layerUpdates){const Ft=Ce.data.subarray(Te*Ve/Ce.data.BYTES_PER_ELEMENT,(Te+1)*Ve/Ce.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,re,0,0,Te,Ce.width,Ce.height,1,me,Ft)}C.clearLayerUpdates()}else t.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,re,0,0,0,Ce.width,Ce.height,le.depth,me,Ce.data)}else t.compressedTexImage3D(r.TEXTURE_2D_ARRAY,re,Fe,Ce.width,Ce.height,le.depth,0,Ce.data,0,0);else ot("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else D?ge&&t.texSubImage3D(r.TEXTURE_2D_ARRAY,re,0,0,0,Ce.width,Ce.height,le.depth,me,Ge,Ce.data):t.texImage3D(r.TEXTURE_2D_ARRAY,re,Fe,Ce.width,Ce.height,le.depth,0,me,Ge,Ce.data)}else{D&&ve&&t.texStorage2D(r.TEXTURE_2D,xe,Fe,et[0].width,et[0].height);for(let re=0,ce=et.length;re<ce;re++)Ce=et[re],C.format!==Xi?me!==null?D?ge&&t.compressedTexSubImage2D(r.TEXTURE_2D,re,0,0,Ce.width,Ce.height,me,Ce.data):t.compressedTexImage2D(r.TEXTURE_2D,re,Fe,Ce.width,Ce.height,0,Ce.data):ot("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):D?ge&&t.texSubImage2D(r.TEXTURE_2D,re,0,0,Ce.width,Ce.height,me,Ge,Ce.data):t.texImage2D(r.TEXTURE_2D,re,Fe,Ce.width,Ce.height,0,me,Ge,Ce.data)}else if(C.isDataArrayTexture)if(D){if(ve&&t.texStorage3D(r.TEXTURE_2D_ARRAY,xe,Fe,le.width,le.height,le.depth),ge)if(C.layerUpdates.size>0){const re=Um(le.width,le.height,C.format,C.type);for(const ce of C.layerUpdates){const Ve=le.data.subarray(ce*re/le.data.BYTES_PER_ELEMENT,(ce+1)*re/le.data.BYTES_PER_ELEMENT);t.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,ce,le.width,le.height,1,me,Ge,Ve)}C.clearLayerUpdates()}else t.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,0,le.width,le.height,le.depth,me,Ge,le.data)}else t.texImage3D(r.TEXTURE_2D_ARRAY,0,Fe,le.width,le.height,le.depth,0,me,Ge,le.data);else if(C.isData3DTexture)D?(ve&&t.texStorage3D(r.TEXTURE_3D,xe,Fe,le.width,le.height,le.depth),ge&&t.texSubImage3D(r.TEXTURE_3D,0,0,0,0,le.width,le.height,le.depth,me,Ge,le.data)):t.texImage3D(r.TEXTURE_3D,0,Fe,le.width,le.height,le.depth,0,me,Ge,le.data);else if(C.isFramebufferTexture){if(ve)if(D)t.texStorage2D(r.TEXTURE_2D,xe,Fe,le.width,le.height);else{let re=le.width,ce=le.height;for(let Ve=0;Ve<xe;Ve++)t.texImage2D(r.TEXTURE_2D,Ve,Fe,re,ce,0,me,Ge,null),re>>=1,ce>>=1}}else if(et.length>0){if(D&&ve){const re=ke(et[0]);t.texStorage2D(r.TEXTURE_2D,xe,Fe,re.width,re.height)}for(let re=0,ce=et.length;re<ce;re++)Ce=et[re],D?ge&&t.texSubImage2D(r.TEXTURE_2D,re,0,0,me,Ge,Ce):t.texImage2D(r.TEXTURE_2D,re,Fe,me,Ge,Ce);C.generateMipmaps=!1}else if(D){if(ve){const re=ke(le);t.texStorage2D(r.TEXTURE_2D,xe,Fe,re.width,re.height)}ge&&t.texSubImage2D(r.TEXTURE_2D,0,0,0,me,Ge,le)}else t.texImage2D(r.TEXTURE_2D,0,Fe,me,Ge,le);m(C)&&p(ae),Be.__version=ne.version,C.onUpdate&&C.onUpdate(C)}I.__version=C.version}function ee(I,C,X){if(C.image.length!==6)return;const ae=_e(I,C),oe=C.source;t.bindTexture(r.TEXTURE_CUBE_MAP,I.__webglTexture,r.TEXTURE0+X);const ne=n.get(oe);if(oe.version!==ne.__version||ae===!0){t.activeTexture(r.TEXTURE0+X);const Be=It.getPrimaries(It.workingColorSpace),ye=C.colorSpace===_s?null:It.getPrimaries(C.colorSpace),Qe=C.colorSpace===_s||Be===ye?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,C.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,C.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,C.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,Qe);const Pe=C.isCompressedTexture||C.image[0].isCompressedTexture,le=C.image[0]&&C.image[0].isDataTexture,me=[];for(let ce=0;ce<6;ce++)!Pe&&!le?me[ce]=g(C.image[ce],!0,i.maxCubemapSize):me[ce]=le?C.image[ce].image:C.image[ce],me[ce]=Le(C,me[ce]);const Ge=me[0],Fe=s.convert(C.format,C.colorSpace),Ce=s.convert(C.type),et=x(C.internalFormat,Fe,Ce,C.colorSpace),D=C.isVideoTexture!==!0,ve=ne.__version===void 0||ae===!0,ge=oe.dataReady;let xe=T(C,Ge);P(r.TEXTURE_CUBE_MAP,C);let re;if(Pe){D&&ve&&t.texStorage2D(r.TEXTURE_CUBE_MAP,xe,et,Ge.width,Ge.height);for(let ce=0;ce<6;ce++){re=me[ce].mipmaps;for(let Ve=0;Ve<re.length;Ve++){const Te=re[Ve];C.format!==Xi?Fe!==null?D?ge&&t.compressedTexSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ce,Ve,0,0,Te.width,Te.height,Fe,Te.data):t.compressedTexImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ce,Ve,et,Te.width,Te.height,0,Te.data):ot("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):D?ge&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ce,Ve,0,0,Te.width,Te.height,Fe,Ce,Te.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ce,Ve,et,Te.width,Te.height,0,Fe,Ce,Te.data)}}}else{if(re=C.mipmaps,D&&ve){re.length>0&&xe++;const ce=ke(me[0]);t.texStorage2D(r.TEXTURE_CUBE_MAP,xe,et,ce.width,ce.height)}for(let ce=0;ce<6;ce++)if(le){D?ge&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ce,0,0,0,me[ce].width,me[ce].height,Fe,Ce,me[ce].data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ce,0,et,me[ce].width,me[ce].height,0,Fe,Ce,me[ce].data);for(let Ve=0;Ve<re.length;Ve++){const Ft=re[Ve].image[ce].image;D?ge&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ce,Ve+1,0,0,Ft.width,Ft.height,Fe,Ce,Ft.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ce,Ve+1,et,Ft.width,Ft.height,0,Fe,Ce,Ft.data)}}else{D?ge&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ce,0,0,0,Fe,Ce,me[ce]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ce,0,et,Fe,Ce,me[ce]);for(let Ve=0;Ve<re.length;Ve++){const Te=re[Ve];D?ge&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ce,Ve+1,0,0,Fe,Ce,Te.image[ce]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ce,Ve+1,et,Fe,Ce,Te.image[ce])}}}m(C)&&p(r.TEXTURE_CUBE_MAP),ne.__version=oe.version,C.onUpdate&&C.onUpdate(C)}I.__version=C.version}function q(I,C,X,ae,oe,ne){const Be=s.convert(X.format,X.colorSpace),ye=s.convert(X.type),Qe=x(X.internalFormat,Be,ye,X.colorSpace),Pe=n.get(C),le=n.get(X);if(le.__renderTarget=C,!Pe.__hasExternalTextures){const me=Math.max(1,C.width>>ne),Ge=Math.max(1,C.height>>ne);oe===r.TEXTURE_3D||oe===r.TEXTURE_2D_ARRAY?t.texImage3D(oe,ne,Qe,me,Ge,C.depth,0,Be,ye,null):t.texImage2D(oe,ne,Qe,me,Ge,0,Be,ye,null)}t.bindFramebuffer(r.FRAMEBUFFER,I),Ae(C)?a.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,ae,oe,le.__webglTexture,0,rt(C)):(oe===r.TEXTURE_2D||oe>=r.TEXTURE_CUBE_MAP_POSITIVE_X&&oe<=r.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&r.framebufferTexture2D(r.FRAMEBUFFER,ae,oe,le.__webglTexture,ne),t.bindFramebuffer(r.FRAMEBUFFER,null)}function Ie(I,C,X){if(r.bindRenderbuffer(r.RENDERBUFFER,I),C.depthBuffer){const ae=C.depthTexture,oe=ae&&ae.isDepthTexture?ae.type:null,ne=v(C.stencilBuffer,oe),Be=C.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,ye=rt(C);Ae(C)?a.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,ye,ne,C.width,C.height):X?r.renderbufferStorageMultisample(r.RENDERBUFFER,ye,ne,C.width,C.height):r.renderbufferStorage(r.RENDERBUFFER,ne,C.width,C.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,Be,r.RENDERBUFFER,I)}else{const ae=C.textures;for(let oe=0;oe<ae.length;oe++){const ne=ae[oe],Be=s.convert(ne.format,ne.colorSpace),ye=s.convert(ne.type),Qe=x(ne.internalFormat,Be,ye,ne.colorSpace),Pe=rt(C);X&&Ae(C)===!1?r.renderbufferStorageMultisample(r.RENDERBUFFER,Pe,Qe,C.width,C.height):Ae(C)?a.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,Pe,Qe,C.width,C.height):r.renderbufferStorage(r.RENDERBUFFER,Qe,C.width,C.height)}}r.bindRenderbuffer(r.RENDERBUFFER,null)}function be(I,C){if(C&&C.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(r.FRAMEBUFFER,I),!(C.depthTexture&&C.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const ae=n.get(C.depthTexture);ae.__renderTarget=C,(!ae.__webglTexture||C.depthTexture.image.width!==C.width||C.depthTexture.image.height!==C.height)&&(C.depthTexture.image.width=C.width,C.depthTexture.image.height=C.height,C.depthTexture.needsUpdate=!0),k(C.depthTexture,0);const oe=ae.__webglTexture,ne=rt(C);if(C.depthTexture.format===Vl)Ae(C)?a.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,oe,0,ne):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,oe,0);else if(C.depthTexture.format===Hl)Ae(C)?a.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,oe,0,ne):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,oe,0);else throw new Error("Unknown depthTexture format")}function qe(I){const C=n.get(I),X=I.isWebGLCubeRenderTarget===!0;if(C.__boundDepthTexture!==I.depthTexture){const ae=I.depthTexture;if(C.__depthDisposeCallback&&C.__depthDisposeCallback(),ae){const oe=()=>{delete C.__boundDepthTexture,delete C.__depthDisposeCallback,ae.removeEventListener("dispose",oe)};ae.addEventListener("dispose",oe),C.__depthDisposeCallback=oe}C.__boundDepthTexture=ae}if(I.depthTexture&&!C.__autoAllocateDepthBuffer){if(X)throw new Error("target.depthTexture not supported in Cube render targets");const ae=I.texture.mipmaps;ae&&ae.length>0?be(C.__webglFramebuffer[0],I):be(C.__webglFramebuffer,I)}else if(X){C.__webglDepthbuffer=[];for(let ae=0;ae<6;ae++)if(t.bindFramebuffer(r.FRAMEBUFFER,C.__webglFramebuffer[ae]),C.__webglDepthbuffer[ae]===void 0)C.__webglDepthbuffer[ae]=r.createRenderbuffer(),Ie(C.__webglDepthbuffer[ae],I,!1);else{const oe=I.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,ne=C.__webglDepthbuffer[ae];r.bindRenderbuffer(r.RENDERBUFFER,ne),r.framebufferRenderbuffer(r.FRAMEBUFFER,oe,r.RENDERBUFFER,ne)}}else{const ae=I.texture.mipmaps;if(ae&&ae.length>0?t.bindFramebuffer(r.FRAMEBUFFER,C.__webglFramebuffer[0]):t.bindFramebuffer(r.FRAMEBUFFER,C.__webglFramebuffer),C.__webglDepthbuffer===void 0)C.__webglDepthbuffer=r.createRenderbuffer(),Ie(C.__webglDepthbuffer,I,!1);else{const oe=I.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,ne=C.__webglDepthbuffer;r.bindRenderbuffer(r.RENDERBUFFER,ne),r.framebufferRenderbuffer(r.FRAMEBUFFER,oe,r.RENDERBUFFER,ne)}}t.bindFramebuffer(r.FRAMEBUFFER,null)}function ht(I,C,X){const ae=n.get(I);C!==void 0&&q(ae.__webglFramebuffer,I,I.texture,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,0),X!==void 0&&qe(I)}function Ne(I){const C=I.texture,X=n.get(I),ae=n.get(C);I.addEventListener("dispose",E);const oe=I.textures,ne=I.isWebGLCubeRenderTarget===!0,Be=oe.length>1;if(Be||(ae.__webglTexture===void 0&&(ae.__webglTexture=r.createTexture()),ae.__version=C.version,o.memory.textures++),ne){X.__webglFramebuffer=[];for(let ye=0;ye<6;ye++)if(C.mipmaps&&C.mipmaps.length>0){X.__webglFramebuffer[ye]=[];for(let Qe=0;Qe<C.mipmaps.length;Qe++)X.__webglFramebuffer[ye][Qe]=r.createFramebuffer()}else X.__webglFramebuffer[ye]=r.createFramebuffer()}else{if(C.mipmaps&&C.mipmaps.length>0){X.__webglFramebuffer=[];for(let ye=0;ye<C.mipmaps.length;ye++)X.__webglFramebuffer[ye]=r.createFramebuffer()}else X.__webglFramebuffer=r.createFramebuffer();if(Be)for(let ye=0,Qe=oe.length;ye<Qe;ye++){const Pe=n.get(oe[ye]);Pe.__webglTexture===void 0&&(Pe.__webglTexture=r.createTexture(),o.memory.textures++)}if(I.samples>0&&Ae(I)===!1){X.__webglMultisampledFramebuffer=r.createFramebuffer(),X.__webglColorRenderbuffer=[],t.bindFramebuffer(r.FRAMEBUFFER,X.__webglMultisampledFramebuffer);for(let ye=0;ye<oe.length;ye++){const Qe=oe[ye];X.__webglColorRenderbuffer[ye]=r.createRenderbuffer(),r.bindRenderbuffer(r.RENDERBUFFER,X.__webglColorRenderbuffer[ye]);const Pe=s.convert(Qe.format,Qe.colorSpace),le=s.convert(Qe.type),me=x(Qe.internalFormat,Pe,le,Qe.colorSpace,I.isXRRenderTarget===!0),Ge=rt(I);r.renderbufferStorageMultisample(r.RENDERBUFFER,Ge,me,I.width,I.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+ye,r.RENDERBUFFER,X.__webglColorRenderbuffer[ye])}r.bindRenderbuffer(r.RENDERBUFFER,null),I.depthBuffer&&(X.__webglDepthRenderbuffer=r.createRenderbuffer(),Ie(X.__webglDepthRenderbuffer,I,!0)),t.bindFramebuffer(r.FRAMEBUFFER,null)}}if(ne){t.bindTexture(r.TEXTURE_CUBE_MAP,ae.__webglTexture),P(r.TEXTURE_CUBE_MAP,C);for(let ye=0;ye<6;ye++)if(C.mipmaps&&C.mipmaps.length>0)for(let Qe=0;Qe<C.mipmaps.length;Qe++)q(X.__webglFramebuffer[ye][Qe],I,C,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+ye,Qe);else q(X.__webglFramebuffer[ye],I,C,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+ye,0);m(C)&&p(r.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Be){for(let ye=0,Qe=oe.length;ye<Qe;ye++){const Pe=oe[ye],le=n.get(Pe);let me=r.TEXTURE_2D;(I.isWebGL3DRenderTarget||I.isWebGLArrayRenderTarget)&&(me=I.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),t.bindTexture(me,le.__webglTexture),P(me,Pe),q(X.__webglFramebuffer,I,Pe,r.COLOR_ATTACHMENT0+ye,me,0),m(Pe)&&p(me)}t.unbindTexture()}else{let ye=r.TEXTURE_2D;if((I.isWebGL3DRenderTarget||I.isWebGLArrayRenderTarget)&&(ye=I.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),t.bindTexture(ye,ae.__webglTexture),P(ye,C),C.mipmaps&&C.mipmaps.length>0)for(let Qe=0;Qe<C.mipmaps.length;Qe++)q(X.__webglFramebuffer[Qe],I,C,r.COLOR_ATTACHMENT0,ye,Qe);else q(X.__webglFramebuffer,I,C,r.COLOR_ATTACHMENT0,ye,0);m(C)&&p(ye),t.unbindTexture()}I.depthBuffer&&qe(I)}function at(I){const C=I.textures;for(let X=0,ae=C.length;X<ae;X++){const oe=C[X];if(m(oe)){const ne=b(I),Be=n.get(oe).__webglTexture;t.bindTexture(ne,Be),p(ne),t.unbindTexture()}}}const U=[],it=[];function H(I){if(I.samples>0){if(Ae(I)===!1){const C=I.textures,X=I.width,ae=I.height;let oe=r.COLOR_BUFFER_BIT;const ne=I.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,Be=n.get(I),ye=C.length>1;if(ye)for(let Pe=0;Pe<C.length;Pe++)t.bindFramebuffer(r.FRAMEBUFFER,Be.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+Pe,r.RENDERBUFFER,null),t.bindFramebuffer(r.FRAMEBUFFER,Be.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+Pe,r.TEXTURE_2D,null,0);t.bindFramebuffer(r.READ_FRAMEBUFFER,Be.__webglMultisampledFramebuffer);const Qe=I.texture.mipmaps;Qe&&Qe.length>0?t.bindFramebuffer(r.DRAW_FRAMEBUFFER,Be.__webglFramebuffer[0]):t.bindFramebuffer(r.DRAW_FRAMEBUFFER,Be.__webglFramebuffer);for(let Pe=0;Pe<C.length;Pe++){if(I.resolveDepthBuffer&&(I.depthBuffer&&(oe|=r.DEPTH_BUFFER_BIT),I.stencilBuffer&&I.resolveStencilBuffer&&(oe|=r.STENCIL_BUFFER_BIT)),ye){r.framebufferRenderbuffer(r.READ_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,Be.__webglColorRenderbuffer[Pe]);const le=n.get(C[Pe]).__webglTexture;r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,le,0)}r.blitFramebuffer(0,0,X,ae,0,0,X,ae,oe,r.NEAREST),l===!0&&(U.length=0,it.length=0,U.push(r.COLOR_ATTACHMENT0+Pe),I.depthBuffer&&I.resolveDepthBuffer===!1&&(U.push(ne),it.push(ne),r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,it)),r.invalidateFramebuffer(r.READ_FRAMEBUFFER,U))}if(t.bindFramebuffer(r.READ_FRAMEBUFFER,null),t.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),ye)for(let Pe=0;Pe<C.length;Pe++){t.bindFramebuffer(r.FRAMEBUFFER,Be.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+Pe,r.RENDERBUFFER,Be.__webglColorRenderbuffer[Pe]);const le=n.get(C[Pe]).__webglTexture;t.bindFramebuffer(r.FRAMEBUFFER,Be.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+Pe,r.TEXTURE_2D,le,0)}t.bindFramebuffer(r.DRAW_FRAMEBUFFER,Be.__webglMultisampledFramebuffer)}else if(I.depthBuffer&&I.resolveDepthBuffer===!1&&l){const C=I.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,[C])}}}function rt(I){return Math.min(i.maxSamples,I.samples)}function Ae(I){const C=n.get(I);return I.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&C.__useRenderToTexture!==!1}function gt(I){const C=o.render.frame;u.get(I)!==C&&(u.set(I,C),I.update())}function Le(I,C){const X=I.colorSpace,ae=I.format,oe=I.type;return I.isCompressedTexture===!0||I.isVideoTexture===!0||X!==Jn&&X!==_s&&(It.getTransfer(X)===Zt?(ae!==Xi||oe!==Pr)&&ot("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Rt("WebGLTextures: Unsupported texture color space:",X)),C}function ke(I){return typeof HTMLImageElement<"u"&&I instanceof HTMLImageElement?(c.width=I.naturalWidth||I.width,c.height=I.naturalHeight||I.height):typeof VideoFrame<"u"&&I instanceof VideoFrame?(c.width=I.displayWidth,c.height=I.displayHeight):(c.width=I.width,c.height=I.height),c}this.allocateTextureUnit=W,this.resetTextureUnits=N,this.setTexture2D=k,this.setTexture2DArray=J,this.setTexture3D=te,this.setTextureCube=F,this.rebindTextures=ht,this.setupRenderTarget=Ne,this.updateRenderTargetMipmap=at,this.updateMultisampleRenderTarget=H,this.setupDepthRenderbuffer=qe,this.setupFrameBufferTexture=q,this.useMultisampledRTT=Ae}function LT(r,e){function t(n,i=_s){let s;const o=It.getTransfer(i);if(n===Pr)return r.UNSIGNED_BYTE;if(n===qh)return r.UNSIGNED_SHORT_4_4_4_4;if(n===Yh)return r.UNSIGNED_SHORT_5_5_5_1;if(n===Bg)return r.UNSIGNED_INT_5_9_9_9_REV;if(n===zg)return r.UNSIGNED_INT_10F_11F_11F_REV;if(n===Ug)return r.BYTE;if(n===kg)return r.SHORT;if(n===Bl)return r.UNSIGNED_SHORT;if(n===Xh)return r.INT;if(n===bo)return r.UNSIGNED_INT;if(n===sr)return r.FLOAT;if(n===Fa)return r.HALF_FLOAT;if(n===Vg)return r.ALPHA;if(n===Hg)return r.RGB;if(n===Xi)return r.RGBA;if(n===Vl)return r.DEPTH_COMPONENT;if(n===Hl)return r.DEPTH_STENCIL;if(n===$h)return r.RED;if(n===jh)return r.RED_INTEGER;if(n===Kh)return r.RG;if(n===Zh)return r.RG_INTEGER;if(n===Jh)return r.RGBA_INTEGER;if(n===nu||n===iu||n===ru||n===su)if(o===Zt)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(n===nu)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===iu)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===ru)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===su)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(n===nu)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===iu)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===ru)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===su)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===wf||n===Sf||n===Mf||n===Tf)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(n===wf)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Sf)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Mf)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Tf)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Ef||n===Af||n===Cf)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(n===Ef||n===Af)return o===Zt?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(n===Cf)return o===Zt?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===Rf||n===Pf||n===Lf||n===Df||n===If||n===Of||n===Nf||n===Ff||n===Uf||n===kf||n===Bf||n===zf||n===Vf||n===Hf)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(n===Rf)return o===Zt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Pf)return o===Zt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Lf)return o===Zt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Df)return o===Zt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===If)return o===Zt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Of)return o===Zt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Nf)return o===Zt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Ff)return o===Zt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Uf)return o===Zt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===kf)return o===Zt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Bf)return o===Zt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===zf)return o===Zt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Vf)return o===Zt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Hf)return o===Zt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Gf||n===Wf||n===Xf)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(n===Gf)return o===Zt?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Wf)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Xf)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===qf||n===Yf||n===$f||n===jf)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(n===qf)return s.COMPRESSED_RED_RGTC1_EXT;if(n===Yf)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===$f)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===jf)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===zl?r.UNSIGNED_INT_24_8:r[n]!==void 0?r[n]:null}return{convert:t}}const DT=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,IT=`
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

}`;class OT{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const n=new o_(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new hi({vertexShader:DT,fragmentShader:IT,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Qn(new Vi(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class NT extends Ua{constructor(e,t){super();const n=this;let i=null,s=1,o=null,a="local-floor",l=1,c=null,u=null,d=null,f=null,h=null,_=null;const g=typeof XRWebGLBinding<"u",m=new OT,p={},b=t.getContextAttributes();let x=null,v=null;const T=[],M=[],E=new Et;let R=null;const w=new ci;w.viewport=new zt;const y=new ci;y.viewport=new zt;const L=[w,y],N=new Wb;let W=null,j=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Q){let ee=T[Q];return ee===void 0&&(ee=new Ed,T[Q]=ee),ee.getTargetRaySpace()},this.getControllerGrip=function(Q){let ee=T[Q];return ee===void 0&&(ee=new Ed,T[Q]=ee),ee.getGripSpace()},this.getHand=function(Q){let ee=T[Q];return ee===void 0&&(ee=new Ed,T[Q]=ee),ee.getHandSpace()};function k(Q){const ee=M.indexOf(Q.inputSource);if(ee===-1)return;const q=T[ee];q!==void 0&&(q.update(Q.inputSource,Q.frame,c||o),q.dispatchEvent({type:Q.type,data:Q.inputSource}))}function J(){i.removeEventListener("select",k),i.removeEventListener("selectstart",k),i.removeEventListener("selectend",k),i.removeEventListener("squeeze",k),i.removeEventListener("squeezestart",k),i.removeEventListener("squeezeend",k),i.removeEventListener("end",J),i.removeEventListener("inputsourceschange",te);for(let Q=0;Q<T.length;Q++){const ee=M[Q];ee!==null&&(M[Q]=null,T[Q].disconnect(ee))}W=null,j=null,m.reset();for(const Q in p)delete p[Q];e.setRenderTarget(x),h=null,f=null,d=null,i=null,v=null,Se.stop(),n.isPresenting=!1,e.setPixelRatio(R),e.setSize(E.width,E.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Q){s=Q,n.isPresenting===!0&&ot("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Q){a=Q,n.isPresenting===!0&&ot("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(Q){c=Q},this.getBaseLayer=function(){return f!==null?f:h},this.getBinding=function(){return d===null&&g&&(d=new XRWebGLBinding(i,t)),d},this.getFrame=function(){return _},this.getSession=function(){return i},this.setSession=async function(Q){if(i=Q,i!==null){if(x=e.getRenderTarget(),i.addEventListener("select",k),i.addEventListener("selectstart",k),i.addEventListener("selectend",k),i.addEventListener("squeeze",k),i.addEventListener("squeezestart",k),i.addEventListener("squeezeend",k),i.addEventListener("end",J),i.addEventListener("inputsourceschange",te),b.xrCompatible!==!0&&await t.makeXRCompatible(),R=e.getPixelRatio(),e.getSize(E),g&&"createProjectionLayer"in XRWebGLBinding.prototype){let q=null,Ie=null,be=null;b.depth&&(be=b.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,q=b.stencil?Hl:Vl,Ie=b.stencil?zl:bo);const qe={colorFormat:t.RGBA8,depthFormat:be,scaleFactor:s};d=this.getBinding(),f=d.createProjectionLayer(qe),i.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),v=new Is(f.textureWidth,f.textureHeight,{format:Xi,type:Pr,depthTexture:new s_(f.textureWidth,f.textureHeight,Ie,void 0,void 0,void 0,void 0,void 0,void 0,q),stencilBuffer:b.stencil,colorSpace:e.outputColorSpace,samples:b.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}else{const q={antialias:b.antialias,alpha:!0,depth:b.depth,stencil:b.stencil,framebufferScaleFactor:s};h=new XRWebGLLayer(i,t,q),i.updateRenderState({baseLayer:h}),e.setPixelRatio(1),e.setSize(h.framebufferWidth,h.framebufferHeight,!1),v=new Is(h.framebufferWidth,h.framebufferHeight,{format:Xi,type:Pr,colorSpace:e.outputColorSpace,stencilBuffer:b.stencil,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1})}v.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await i.requestReferenceSpace(a),Se.setContext(i),Se.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function te(Q){for(let ee=0;ee<Q.removed.length;ee++){const q=Q.removed[ee],Ie=M.indexOf(q);Ie>=0&&(M[Ie]=null,T[Ie].disconnect(q))}for(let ee=0;ee<Q.added.length;ee++){const q=Q.added[ee];let Ie=M.indexOf(q);if(Ie===-1){for(let qe=0;qe<T.length;qe++)if(qe>=M.length){M.push(q),Ie=qe;break}else if(M[qe]===null){M[qe]=q,Ie=qe;break}if(Ie===-1)break}const be=T[Ie];be&&be.connect(q)}}const F=new Y,ue=new Y;function O(Q,ee,q){F.setFromMatrixPosition(ee.matrixWorld),ue.setFromMatrixPosition(q.matrixWorld);const Ie=F.distanceTo(ue),be=ee.projectionMatrix.elements,qe=q.projectionMatrix.elements,ht=be[14]/(be[10]-1),Ne=be[14]/(be[10]+1),at=(be[9]+1)/be[5],U=(be[9]-1)/be[5],it=(be[8]-1)/be[0],H=(qe[8]+1)/qe[0],rt=ht*it,Ae=ht*H,gt=Ie/(-it+H),Le=gt*-it;if(ee.matrixWorld.decompose(Q.position,Q.quaternion,Q.scale),Q.translateX(Le),Q.translateZ(gt),Q.matrixWorld.compose(Q.position,Q.quaternion,Q.scale),Q.matrixWorldInverse.copy(Q.matrixWorld).invert(),be[10]===-1)Q.projectionMatrix.copy(ee.projectionMatrix),Q.projectionMatrixInverse.copy(ee.projectionMatrixInverse);else{const ke=ht+gt,I=Ne+gt,C=rt-Le,X=Ae+(Ie-Le),ae=at*Ne/I*ke,oe=U*Ne/I*ke;Q.projectionMatrix.makePerspective(C,X,ae,oe,ke,I),Q.projectionMatrixInverse.copy(Q.projectionMatrix).invert()}}function $(Q,ee){ee===null?Q.matrixWorld.copy(Q.matrix):Q.matrixWorld.multiplyMatrices(ee.matrixWorld,Q.matrix),Q.matrixWorldInverse.copy(Q.matrixWorld).invert()}this.updateCamera=function(Q){if(i===null)return;let ee=Q.near,q=Q.far;m.texture!==null&&(m.depthNear>0&&(ee=m.depthNear),m.depthFar>0&&(q=m.depthFar)),N.near=y.near=w.near=ee,N.far=y.far=w.far=q,(W!==N.near||j!==N.far)&&(i.updateRenderState({depthNear:N.near,depthFar:N.far}),W=N.near,j=N.far),N.layers.mask=Q.layers.mask|6,w.layers.mask=N.layers.mask&3,y.layers.mask=N.layers.mask&5;const Ie=Q.parent,be=N.cameras;$(N,Ie);for(let qe=0;qe<be.length;qe++)$(be[qe],Ie);be.length===2?O(N,w,y):N.projectionMatrix.copy(w.projectionMatrix),P(Q,N,Ie)};function P(Q,ee,q){q===null?Q.matrix.copy(ee.matrixWorld):(Q.matrix.copy(q.matrixWorld),Q.matrix.invert(),Q.matrix.multiply(ee.matrixWorld)),Q.matrix.decompose(Q.position,Q.quaternion,Q.scale),Q.updateMatrixWorld(!0),Q.projectionMatrix.copy(ee.projectionMatrix),Q.projectionMatrixInverse.copy(ee.projectionMatrixInverse),Q.isPerspectiveCamera&&(Q.fov=Ma*2*Math.atan(1/Q.projectionMatrix.elements[5]),Q.zoom=1)}this.getCamera=function(){return N},this.getFoveation=function(){if(!(f===null&&h===null))return l},this.setFoveation=function(Q){l=Q,f!==null&&(f.fixedFoveation=Q),h!==null&&h.fixedFoveation!==void 0&&(h.fixedFoveation=Q)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(N)},this.getCameraTexture=function(Q){return p[Q]};let _e=null;function we(Q,ee){if(u=ee.getViewerPose(c||o),_=ee,u!==null){const q=u.views;h!==null&&(e.setRenderTargetFramebuffer(v,h.framebuffer),e.setRenderTarget(v));let Ie=!1;q.length!==N.cameras.length&&(N.cameras.length=0,Ie=!0);for(let Ne=0;Ne<q.length;Ne++){const at=q[Ne];let U=null;if(h!==null)U=h.getViewport(at);else{const H=d.getViewSubImage(f,at);U=H.viewport,Ne===0&&(e.setRenderTargetTextures(v,H.colorTexture,H.depthStencilTexture),e.setRenderTarget(v))}let it=L[Ne];it===void 0&&(it=new ci,it.layers.enable(Ne),it.viewport=new zt,L[Ne]=it),it.matrix.fromArray(at.transform.matrix),it.matrix.decompose(it.position,it.quaternion,it.scale),it.projectionMatrix.fromArray(at.projectionMatrix),it.projectionMatrixInverse.copy(it.projectionMatrix).invert(),it.viewport.set(U.x,U.y,U.width,U.height),Ne===0&&(N.matrix.copy(it.matrix),N.matrix.decompose(N.position,N.quaternion,N.scale)),Ie===!0&&N.cameras.push(it)}const be=i.enabledFeatures;if(be&&be.includes("depth-sensing")&&i.depthUsage=="gpu-optimized"&&g){d=n.getBinding();const Ne=d.getDepthInformation(q[0]);Ne&&Ne.isValid&&Ne.texture&&m.init(Ne,i.renderState)}if(be&&be.includes("camera-access")&&g){e.state.unbindTexture(),d=n.getBinding();for(let Ne=0;Ne<q.length;Ne++){const at=q[Ne].camera;if(at){let U=p[at];U||(U=new o_,p[at]=U);const it=d.getCameraImage(at);U.sourceTexture=it}}}}for(let q=0;q<T.length;q++){const Ie=M[q],be=T[q];Ie!==null&&be!==void 0&&be.update(Ie,ee,c||o)}_e&&_e(Q,ee),ee.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:ee}),_=null}const Se=new f_;Se.setAnimationLoop(we),this.setAnimationLoop=function(Q){_e=Q},this.dispose=function(){}}}const $s=new Lr,FT=new bt;function UT(r,e){function t(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,Jg(r)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function i(m,p,b,x,v){p.isMeshBasicMaterial||p.isMeshLambertMaterial?s(m,p):p.isMeshToonMaterial?(s(m,p),d(m,p)):p.isMeshPhongMaterial?(s(m,p),u(m,p)):p.isMeshStandardMaterial?(s(m,p),f(m,p),p.isMeshPhysicalMaterial&&h(m,p,v)):p.isMeshMatcapMaterial?(s(m,p),_(m,p)):p.isMeshDepthMaterial?s(m,p):p.isMeshDistanceMaterial?(s(m,p),g(m,p)):p.isMeshNormalMaterial?s(m,p):p.isLineBasicMaterial?(o(m,p),p.isLineDashedMaterial&&a(m,p)):p.isPointsMaterial?l(m,p,b,x):p.isSpriteMaterial?c(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function s(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,t(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===xi&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,t(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===xi&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,t(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,t(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const b=e.get(p),x=b.envMap,v=b.envMapRotation;x&&(m.envMap.value=x,$s.copy(v),$s.x*=-1,$s.y*=-1,$s.z*=-1,x.isCubeTexture&&x.isRenderTargetTexture===!1&&($s.y*=-1,$s.z*=-1),m.envMapRotation.value.setFromMatrix4(FT.makeRotationFromEuler($s)),m.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,m.aoMapTransform))}function o(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform))}function a(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function l(m,p,b,x){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*b,m.scale.value=x*.5,p.map&&(m.map.value=p.map,t(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function c(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function u(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function d(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function f(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function h(m,p,b){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===xi&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=b.texture,m.transmissionSamplerSize.value.set(b.width,b.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,m.specularIntensityMapTransform))}function _(m,p){p.matcap&&(m.matcap.value=p.matcap)}function g(m,p){const b=e.get(p).light;m.referencePosition.value.setFromMatrixPosition(b.matrixWorld),m.nearDistance.value=b.shadow.camera.near,m.farDistance.value=b.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function kT(r,e,t,n){let i={},s={},o=[];const a=r.getParameter(r.MAX_UNIFORM_BUFFER_BINDINGS);function l(b,x){const v=x.program;n.uniformBlockBinding(b,v)}function c(b,x){let v=i[b.id];v===void 0&&(_(b),v=u(b),i[b.id]=v,b.addEventListener("dispose",m));const T=x.program;n.updateUBOMapping(b,T);const M=e.render.frame;s[b.id]!==M&&(f(b),s[b.id]=M)}function u(b){const x=d();b.__bindingPointIndex=x;const v=r.createBuffer(),T=b.__size,M=b.usage;return r.bindBuffer(r.UNIFORM_BUFFER,v),r.bufferData(r.UNIFORM_BUFFER,T,M),r.bindBuffer(r.UNIFORM_BUFFER,null),r.bindBufferBase(r.UNIFORM_BUFFER,x,v),v}function d(){for(let b=0;b<a;b++)if(o.indexOf(b)===-1)return o.push(b),b;return Rt("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(b){const x=i[b.id],v=b.uniforms,T=b.__cache;r.bindBuffer(r.UNIFORM_BUFFER,x);for(let M=0,E=v.length;M<E;M++){const R=Array.isArray(v[M])?v[M]:[v[M]];for(let w=0,y=R.length;w<y;w++){const L=R[w];if(h(L,M,w,T)===!0){const N=L.__offset,W=Array.isArray(L.value)?L.value:[L.value];let j=0;for(let k=0;k<W.length;k++){const J=W[k],te=g(J);typeof J=="number"||typeof J=="boolean"?(L.__data[0]=J,r.bufferSubData(r.UNIFORM_BUFFER,N+j,L.__data)):J.isMatrix3?(L.__data[0]=J.elements[0],L.__data[1]=J.elements[1],L.__data[2]=J.elements[2],L.__data[3]=0,L.__data[4]=J.elements[3],L.__data[5]=J.elements[4],L.__data[6]=J.elements[5],L.__data[7]=0,L.__data[8]=J.elements[6],L.__data[9]=J.elements[7],L.__data[10]=J.elements[8],L.__data[11]=0):(J.toArray(L.__data,j),j+=te.storage/Float32Array.BYTES_PER_ELEMENT)}r.bufferSubData(r.UNIFORM_BUFFER,N,L.__data)}}}r.bindBuffer(r.UNIFORM_BUFFER,null)}function h(b,x,v,T){const M=b.value,E=x+"_"+v;if(T[E]===void 0)return typeof M=="number"||typeof M=="boolean"?T[E]=M:T[E]=M.clone(),!0;{const R=T[E];if(typeof M=="number"||typeof M=="boolean"){if(R!==M)return T[E]=M,!0}else if(R.equals(M)===!1)return R.copy(M),!0}return!1}function _(b){const x=b.uniforms;let v=0;const T=16;for(let E=0,R=x.length;E<R;E++){const w=Array.isArray(x[E])?x[E]:[x[E]];for(let y=0,L=w.length;y<L;y++){const N=w[y],W=Array.isArray(N.value)?N.value:[N.value];for(let j=0,k=W.length;j<k;j++){const J=W[j],te=g(J),F=v%T,ue=F%te.boundary,O=F+ue;v+=ue,O!==0&&T-O<te.storage&&(v+=T-O),N.__data=new Float32Array(te.storage/Float32Array.BYTES_PER_ELEMENT),N.__offset=v,v+=te.storage}}}const M=v%T;return M>0&&(v+=T-M),b.__size=v,b.__cache={},this}function g(b){const x={boundary:0,storage:0};return typeof b=="number"||typeof b=="boolean"?(x.boundary=4,x.storage=4):b.isVector2?(x.boundary=8,x.storage=8):b.isVector3||b.isColor?(x.boundary=16,x.storage=12):b.isVector4?(x.boundary=16,x.storage=16):b.isMatrix3?(x.boundary=48,x.storage=48):b.isMatrix4?(x.boundary=64,x.storage=64):b.isTexture?ot("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ot("WebGLRenderer: Unsupported uniform value type.",b),x}function m(b){const x=b.target;x.removeEventListener("dispose",m);const v=o.indexOf(x.__bindingPointIndex);o.splice(v,1),r.deleteBuffer(i[x.id]),delete i[x.id],delete s[x.id]}function p(){for(const b in i)r.deleteBuffer(i[b]);o=[],i={},s={}}return{bind:l,update:c,dispose:p}}const BT=new Uint16Array([11481,15204,11534,15171,11808,15015,12385,14843,12894,14716,13396,14600,13693,14483,13976,14366,14237,14171,14405,13961,14511,13770,14605,13598,14687,13444,14760,13305,14822,13066,14876,12857,14923,12675,14963,12517,14997,12379,15025,12230,15049,12023,15070,11843,15086,11687,15100,11551,15111,11433,15120,11330,15127,11217,15132,11060,15135,10922,15138,10801,15139,10695,15139,10600,13012,14923,13020,14917,13064,14886,13176,14800,13349,14666,13513,14526,13724,14398,13960,14230,14200,14020,14383,13827,14488,13651,14583,13491,14667,13348,14740,13132,14803,12908,14856,12713,14901,12542,14938,12394,14968,12241,14992,12017,15010,11822,15024,11654,15034,11507,15041,11380,15044,11269,15044,11081,15042,10913,15037,10764,15031,10635,15023,10520,15014,10419,15003,10330,13657,14676,13658,14673,13670,14660,13698,14622,13750,14547,13834,14442,13956,14317,14112,14093,14291,13889,14407,13704,14499,13538,14586,13389,14664,13201,14733,12966,14792,12758,14842,12577,14882,12418,14915,12272,14940,12033,14959,11826,14972,11646,14980,11490,14983,11355,14983,11212,14979,11008,14971,10830,14961,10675,14950,10540,14936,10420,14923,10315,14909,10204,14894,10041,14089,14460,14090,14459,14096,14452,14112,14431,14141,14388,14186,14305,14252,14130,14341,13941,14399,13756,14467,13585,14539,13430,14610,13272,14677,13026,14737,12808,14790,12617,14833,12449,14869,12303,14896,12065,14916,11845,14929,11655,14937,11490,14939,11347,14936,11184,14930,10970,14921,10783,14912,10621,14900,10480,14885,10356,14867,10247,14848,10062,14827,9894,14805,9745,14400,14208,14400,14206,14402,14198,14406,14174,14415,14122,14427,14035,14444,13913,14469,13767,14504,13613,14548,13463,14598,13324,14651,13082,14704,12858,14752,12658,14795,12483,14831,12330,14860,12106,14881,11875,14895,11675,14903,11501,14905,11351,14903,11178,14900,10953,14892,10757,14880,10589,14865,10442,14847,10313,14827,10162,14805,9965,14782,9792,14757,9642,14731,9507,14562,13883,14562,13883,14563,13877,14566,13862,14570,13830,14576,13773,14584,13689,14595,13582,14613,13461,14637,13336,14668,13120,14704,12897,14741,12695,14776,12516,14808,12358,14835,12150,14856,11910,14870,11701,14878,11519,14882,11361,14884,11187,14880,10951,14871,10748,14858,10572,14842,10418,14823,10286,14801,10099,14777,9897,14751,9722,14725,9567,14696,9430,14666,9309,14702,13604,14702,13604,14702,13600,14703,13591,14705,13570,14707,13533,14709,13477,14712,13400,14718,13305,14727,13106,14743,12907,14762,12716,14784,12539,14807,12380,14827,12190,14844,11943,14855,11727,14863,11539,14870,11376,14871,11204,14868,10960,14858,10748,14845,10565,14829,10406,14809,10269,14786,10058,14761,9852,14734,9671,14705,9512,14674,9374,14641,9253,14608,9076,14821,13366,14821,13365,14821,13364,14821,13358,14821,13344,14821,13320,14819,13252,14817,13145,14815,13011,14814,12858,14817,12698,14823,12539,14832,12389,14841,12214,14850,11968,14856,11750,14861,11558,14866,11390,14867,11226,14862,10972,14853,10754,14840,10565,14823,10401,14803,10259,14780,10032,14754,9820,14725,9635,14694,9473,14661,9333,14627,9203,14593,8988,14557,8798,14923,13014,14922,13014,14922,13012,14922,13004,14920,12987,14919,12957,14915,12907,14909,12834,14902,12738,14894,12623,14888,12498,14883,12370,14880,12203,14878,11970,14875,11759,14873,11569,14874,11401,14872,11243,14865,10986,14855,10762,14842,10568,14825,10401,14804,10255,14781,10017,14754,9799,14725,9611,14692,9445,14658,9301,14623,9139,14587,8920,14548,8729,14509,8562,15008,12672,15008,12672,15008,12671,15007,12667,15005,12656,15001,12637,14997,12605,14989,12556,14978,12490,14966,12407,14953,12313,14940,12136,14927,11934,14914,11742,14903,11563,14896,11401,14889,11247,14879,10992,14866,10767,14851,10570,14833,10400,14812,10252,14789,10007,14761,9784,14731,9592,14698,9424,14663,9279,14627,9088,14588,8868,14548,8676,14508,8508,14467,8360,15080,12386,15080,12386,15079,12385,15078,12383,15076,12378,15072,12367,15066,12347,15057,12315,15045,12253,15030,12138,15012,11998,14993,11845,14972,11685,14951,11530,14935,11383,14920,11228,14904,10981,14887,10762,14870,10567,14850,10397,14827,10248,14803,9997,14774,9771,14743,9578,14710,9407,14674,9259,14637,9048,14596,8826,14555,8632,14514,8464,14471,8317,14427,8182,15139,12008,15139,12008,15138,12008,15137,12007,15135,12003,15130,11990,15124,11969,15115,11929,15102,11872,15086,11794,15064,11693,15041,11581,15013,11459,14987,11336,14966,11170,14944,10944,14921,10738,14898,10552,14875,10387,14850,10239,14824,9983,14794,9758,14762,9563,14728,9392,14692,9244,14653,9014,14611,8791,14569,8597,14526,8427,14481,8281,14436,8110,14391,7885,15188,11617,15188,11617,15187,11617,15186,11618,15183,11617,15179,11612,15173,11601,15163,11581,15150,11546,15133,11495,15110,11427,15083,11346,15051,11246,15024,11057,14996,10868,14967,10687,14938,10517,14911,10362,14882,10206,14853,9956,14821,9737,14787,9543,14752,9375,14715,9228,14675,8980,14632,8760,14589,8565,14544,8395,14498,8248,14451,8049,14404,7824,14357,7630,15228,11298,15228,11298,15227,11299,15226,11301,15223,11303,15219,11302,15213,11299,15204,11290,15191,11271,15174,11217,15150,11129,15119,11015,15087,10886,15057,10744,15024,10599,14990,10455,14957,10318,14924,10143,14891,9911,14856,9701,14820,9516,14782,9352,14744,9200,14703,8946,14659,8725,14615,8533,14568,8366,14521,8220,14472,7992,14423,7770,14374,7578,14315,7408,15260,10819,15260,10819,15259,10822,15258,10826,15256,10832,15251,10836,15246,10841,15237,10838,15225,10821,15207,10788,15183,10734,15151,10660,15120,10571,15087,10469,15049,10359,15012,10249,14974,10041,14937,9837,14900,9647,14860,9475,14820,9320,14779,9147,14736,8902,14691,8688,14646,8499,14598,8335,14549,8189,14499,7940,14448,7720,14397,7529,14347,7363,14256,7218,15285,10410,15285,10411,15285,10413,15284,10418,15282,10425,15278,10434,15272,10442,15264,10449,15252,10445,15235,10433,15210,10403,15179,10358,15149,10301,15113,10218,15073,10059,15033,9894,14991,9726,14951,9565,14909,9413,14865,9273,14822,9073,14777,8845,14730,8641,14682,8459,14633,8300,14583,8129,14531,7883,14479,7670,14426,7482,14373,7321,14305,7176,14201,6939,15305,9939,15305,9940,15305,9945,15304,9955,15302,9967,15298,9989,15293,10010,15286,10033,15274,10044,15258,10045,15233,10022,15205,9975,15174,9903,15136,9808,15095,9697,15053,9578,15009,9451,14965,9327,14918,9198,14871,8973,14825,8766,14775,8579,14725,8408,14675,8259,14622,8058,14569,7821,14515,7615,14460,7435,14405,7276,14350,7108,14256,6866,14149,6653,15321,9444,15321,9445,15321,9448,15320,9458,15317,9470,15314,9490,15310,9515,15302,9540,15292,9562,15276,9579,15251,9577,15226,9559,15195,9519,15156,9463,15116,9389,15071,9304,15025,9208,14978,9023,14927,8838,14878,8661,14827,8496,14774,8344,14722,8206,14667,7973,14612,7749,14556,7555,14499,7382,14443,7229,14385,7025,14322,6791,14210,6588,14100,6409,15333,8920,15333,8921,15332,8927,15332,8943,15329,8965,15326,9002,15322,9048,15316,9106,15307,9162,15291,9204,15267,9221,15244,9221,15212,9196,15175,9134,15133,9043,15088,8930,15040,8801,14990,8665,14938,8526,14886,8391,14830,8261,14775,8087,14719,7866,14661,7664,14603,7482,14544,7322,14485,7178,14426,6936,14367,6713,14281,6517,14166,6348,14054,6198,15341,8360,15341,8361,15341,8366,15341,8379,15339,8399,15336,8431,15332,8473,15326,8527,15318,8585,15302,8632,15281,8670,15258,8690,15227,8690,15191,8664,15149,8612,15104,8543,15055,8456,15001,8360,14948,8259,14892,8122,14834,7923,14776,7734,14716,7558,14656,7397,14595,7250,14534,7070,14472,6835,14410,6628,14350,6443,14243,6283,14125,6135,14010,5889,15348,7715,15348,7717,15348,7725,15347,7745,15345,7780,15343,7836,15339,7905,15334,8e3,15326,8103,15310,8193,15293,8239,15270,8270,15240,8287,15204,8283,15163,8260,15118,8223,15067,8143,15014,8014,14958,7873,14899,7723,14839,7573,14778,7430,14715,7293,14652,7164,14588,6931,14524,6720,14460,6531,14396,6362,14330,6210,14207,6015,14086,5781,13969,5576,15352,7114,15352,7116,15352,7128,15352,7159,15350,7195,15348,7237,15345,7299,15340,7374,15332,7457,15317,7544,15301,7633,15280,7703,15251,7754,15216,7775,15176,7767,15131,7733,15079,7670,15026,7588,14967,7492,14906,7387,14844,7278,14779,7171,14714,6965,14648,6770,14581,6587,14515,6420,14448,6269,14382,6123,14299,5881,14172,5665,14049,5477,13929,5310,15355,6329,15355,6330,15355,6339,15355,6362,15353,6410,15351,6472,15349,6572,15344,6688,15337,6835,15323,6985,15309,7142,15287,7220,15260,7277,15226,7310,15188,7326,15142,7318,15090,7285,15036,7239,14976,7177,14914,7045,14849,6892,14782,6736,14714,6581,14645,6433,14576,6293,14506,6164,14438,5946,14369,5733,14270,5540,14140,5369,14014,5216,13892,5043,15357,5483,15357,5484,15357,5496,15357,5528,15356,5597,15354,5692,15351,5835,15347,6011,15339,6195,15328,6317,15314,6446,15293,6566,15268,6668,15235,6746,15197,6796,15152,6811,15101,6790,15046,6748,14985,6673,14921,6583,14854,6479,14785,6371,14714,6259,14643,6149,14571,5946,14499,5750,14428,5567,14358,5401,14242,5250,14109,5111,13980,4870,13856,4657,15359,4555,15359,4557,15358,4573,15358,4633,15357,4715,15355,4841,15353,5061,15349,5216,15342,5391,15331,5577,15318,5770,15299,5967,15274,6150,15243,6223,15206,6280,15161,6310,15111,6317,15055,6300,14994,6262,14928,6208,14860,6141,14788,5994,14715,5838,14641,5684,14566,5529,14492,5384,14418,5247,14346,5121,14216,4892,14079,4682,13948,4496,13822,4330,15359,3498,15359,3501,15359,3520,15359,3598,15358,3719,15356,3860,15355,4137,15351,4305,15344,4563,15334,4809,15321,5116,15303,5273,15280,5418,15250,5547,15214,5653,15170,5722,15120,5761,15064,5763,15002,5733,14935,5673,14865,5597,14792,5504,14716,5400,14640,5294,14563,5185,14486,5041,14410,4841,14335,4655,14191,4482,14051,4325,13918,4183,13790,4012,15360,2282,15360,2285,15360,2306,15360,2401,15359,2547,15357,2748,15355,3103,15352,3349,15345,3675,15336,4020,15324,4272,15307,4496,15285,4716,15255,4908,15220,5086,15178,5170,15128,5214,15072,5234,15010,5231,14943,5206,14871,5166,14796,5102,14718,4971,14639,4833,14559,4687,14480,4541,14402,4401,14315,4268,14167,4142,14025,3958,13888,3747,13759,3556,15360,923,15360,925,15360,946,15360,1052,15359,1214,15357,1494,15356,1892,15352,2274,15346,2663,15338,3099,15326,3393,15309,3679,15288,3980,15260,4183,15226,4325,15185,4437,15136,4517,15080,4570,15018,4591,14950,4581,14877,4545,14800,4485,14720,4411,14638,4325,14556,4231,14475,4136,14395,3988,14297,3803,14145,3628,13999,3465,13861,3314,13729,3177,15360,263,15360,264,15360,272,15360,325,15359,407,15358,548,15356,780,15352,1144,15347,1580,15339,2099,15328,2425,15312,2795,15292,3133,15264,3329,15232,3517,15191,3689,15143,3819,15088,3923,15025,3978,14956,3999,14882,3979,14804,3931,14722,3855,14639,3756,14554,3645,14470,3529,14388,3409,14279,3289,14124,3173,13975,3055,13834,2848,13701,2658,15360,49,15360,49,15360,52,15360,75,15359,111,15358,201,15356,283,15353,519,15348,726,15340,1045,15329,1415,15314,1795,15295,2173,15269,2410,15237,2649,15197,2866,15150,3054,15095,3140,15032,3196,14963,3228,14888,3236,14808,3224,14725,3191,14639,3146,14553,3088,14466,2976,14382,2836,14262,2692,14103,2549,13952,2409,13808,2278,13674,2154,15360,4,15360,4,15360,4,15360,13,15359,33,15358,59,15357,112,15353,199,15348,302,15341,456,15331,628,15316,827,15297,1082,15272,1332,15241,1601,15202,1851,15156,2069,15101,2172,15039,2256,14970,2314,14894,2348,14813,2358,14728,2344,14640,2311,14551,2263,14463,2203,14376,2133,14247,2059,14084,1915,13930,1761,13784,1609,13648,1464,15360,0,15360,0,15360,0,15360,3,15359,18,15358,26,15357,53,15354,80,15348,97,15341,165,15332,238,15318,326,15299,427,15275,529,15245,654,15207,771,15161,885,15108,994,15046,1089,14976,1170,14900,1229,14817,1266,14731,1284,14641,1282,14550,1260,14460,1223,14370,1174,14232,1116,14066,1050,13909,981,13761,910,13623,839]);let zr=null;function zT(){return zr===null&&(zr=new np(BT,32,32,Kh,Fa),zr.minFilter=Kn,zr.magFilter=Kn,zr.wrapS=wr,zr.wrapT=wr,zr.generateMipmaps=!1,zr.needsUpdate=!0),zr}class __{constructor(e={}){const{canvas:t=Ty(),context:n=null,depth:i=!0,stencil:s=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:f=!1}=e;this.isWebGLRenderer=!0;let h;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");h=n.getContextAttributes().alpha}else h=o;const _=new Set([Jh,Zh,jh]),g=new Set([Pr,bo,Bl,zl,qh,Yh]),m=new Uint32Array(4),p=new Int32Array(4);let b=null,x=null;const v=[],T=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Cs,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const M=this;let E=!1;this._outputColorSpace=Tn;let R=0,w=0,y=null,L=-1,N=null;const W=new zt,j=new zt;let k=null;const J=new je(0);let te=0,F=t.width,ue=t.height,O=1,$=null,P=null;const _e=new zt(0,0,F,ue),we=new zt(0,0,F,ue);let Se=!1;const Q=new rp;let ee=!1,q=!1;const Ie=new bt,be=new Y,qe=new zt,ht={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Ne=!1;function at(){return y===null?O:1}let U=n;function it(A,z){return t.getContext(A,z)}try{const A={alpha:!0,depth:i,stencil:s,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Wh}`),t.addEventListener("webglcontextlost",re,!1),t.addEventListener("webglcontextrestored",ce,!1),t.addEventListener("webglcontextcreationerror",Ve,!1),U===null){const z="webgl2";if(U=it(z,A),U===null)throw it(z)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(A){throw A("WebGLRenderer: "+A.message),A}let H,rt,Ae,gt,Le,ke,I,C,X,ae,oe,ne,Be,ye,Qe,Pe,le,me,Ge,Fe,Ce,et,D,ve;function ge(){H=new j1(U),H.init(),et=new LT(U,H),rt=new z1(U,H,e,et),Ae=new RT(U,H),rt.reversedDepthBuffer&&f&&Ae.buffers.depth.setReversed(!0),gt=new J1(U),Le=new gT,ke=new PT(U,H,Ae,Le,rt,et,gt),I=new H1(M),C=new $1(M),X=new nw(U),D=new k1(U,X),ae=new K1(U,X,gt,D),oe=new eM(U,ae,X,gt),Ge=new Q1(U,rt,ke),Pe=new V1(Le),ne=new mT(M,I,C,H,rt,D,Pe),Be=new UT(M,Le),ye=new xT,Qe=new MT(H),me=new U1(M,I,C,Ae,oe,h,l),le=new AT(M,oe,rt),ve=new kT(U,gt,rt,Ae),Fe=new B1(U,H,gt),Ce=new Z1(U,H,gt),gt.programs=ne.programs,M.capabilities=rt,M.extensions=H,M.properties=Le,M.renderLists=ye,M.shadowMap=le,M.state=Ae,M.info=gt}ge();const xe=new NT(M,U);this.xr=xe,this.getContext=function(){return U},this.getContextAttributes=function(){return U.getContextAttributes()},this.forceContextLoss=function(){const A=H.get("WEBGL_lose_context");A&&A.loseContext()},this.forceContextRestore=function(){const A=H.get("WEBGL_lose_context");A&&A.restoreContext()},this.getPixelRatio=function(){return O},this.setPixelRatio=function(A){A!==void 0&&(O=A,this.setSize(F,ue,!1))},this.getSize=function(A){return A.set(F,ue)},this.setSize=function(A,z,K=!0){if(xe.isPresenting){ot("WebGLRenderer: Can't change size while VR device is presenting.");return}F=A,ue=z,t.width=Math.floor(A*O),t.height=Math.floor(z*O),K===!0&&(t.style.width=A+"px",t.style.height=z+"px"),this.setViewport(0,0,A,z)},this.getDrawingBufferSize=function(A){return A.set(F*O,ue*O).floor()},this.setDrawingBufferSize=function(A,z,K){F=A,ue=z,O=K,t.width=Math.floor(A*K),t.height=Math.floor(z*K),this.setViewport(0,0,A,z)},this.getCurrentViewport=function(A){return A.copy(W)},this.getViewport=function(A){return A.copy(_e)},this.setViewport=function(A,z,K,Z){A.isVector4?_e.set(A.x,A.y,A.z,A.w):_e.set(A,z,K,Z),Ae.viewport(W.copy(_e).multiplyScalar(O).round())},this.getScissor=function(A){return A.copy(we)},this.setScissor=function(A,z,K,Z){A.isVector4?we.set(A.x,A.y,A.z,A.w):we.set(A,z,K,Z),Ae.scissor(j.copy(we).multiplyScalar(O).round())},this.getScissorTest=function(){return Se},this.setScissorTest=function(A){Ae.setScissorTest(Se=A)},this.setOpaqueSort=function(A){$=A},this.setTransparentSort=function(A){P=A},this.getClearColor=function(A){return A.copy(me.getClearColor())},this.setClearColor=function(){me.setClearColor(...arguments)},this.getClearAlpha=function(){return me.getClearAlpha()},this.setClearAlpha=function(){me.setClearAlpha(...arguments)},this.clear=function(A=!0,z=!0,K=!0){let Z=0;if(A){let G=!1;if(y!==null){const Me=y.texture.format;G=_.has(Me)}if(G){const Me=y.texture.type,Oe=g.has(Me),ze=me.getClearColor(),Re=me.getClearAlpha(),Ze=ze.r,He=ze.g,$e=ze.b;Oe?(m[0]=Ze,m[1]=He,m[2]=$e,m[3]=Re,U.clearBufferuiv(U.COLOR,0,m)):(p[0]=Ze,p[1]=He,p[2]=$e,p[3]=Re,U.clearBufferiv(U.COLOR,0,p))}else Z|=U.COLOR_BUFFER_BIT}z&&(Z|=U.DEPTH_BUFFER_BIT),K&&(Z|=U.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),U.clear(Z)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",re,!1),t.removeEventListener("webglcontextrestored",ce,!1),t.removeEventListener("webglcontextcreationerror",Ve,!1),me.dispose(),ye.dispose(),Qe.dispose(),Le.dispose(),I.dispose(),C.dispose(),oe.dispose(),D.dispose(),ve.dispose(),ne.dispose(),xe.dispose(),xe.removeEventListener("sessionstart",ct),xe.removeEventListener("sessionend",tt),Xe.stop()};function re(A){A.preventDefault(),wu("WebGLRenderer: Context Lost."),E=!0}function ce(){wu("WebGLRenderer: Context Restored."),E=!1;const A=gt.autoReset,z=le.enabled,K=le.autoUpdate,Z=le.needsUpdate,G=le.type;ge(),gt.autoReset=A,le.enabled=z,le.autoUpdate=K,le.needsUpdate=Z,le.type=G}function Ve(A){Rt("WebGLRenderer: A WebGL context could not be created. Reason: ",A.statusMessage)}function Te(A){const z=A.target;z.removeEventListener("dispose",Te),Ft(z)}function Ft(A){Ee(A),Le.remove(A)}function Ee(A){const z=Le.get(A).programs;z!==void 0&&(z.forEach(function(K){ne.releaseProgram(K)}),A.isShaderMaterial&&ne.releaseShaderCache(A))}this.renderBufferDirect=function(A,z,K,Z,G,Me){z===null&&(z=ht);const Oe=G.isMesh&&G.matrixWorld.determinant()<0,ze=Ht(A,z,K,Z,G);Ae.setMaterial(Z,Oe);let Re=K.index,Ze=1;if(Z.wireframe===!0){if(Re=ae.getWireframeAttribute(K),Re===void 0)return;Ze=2}const He=K.drawRange,$e=K.attributes.position;let St=He.start*Ze,ft=(He.start+He.count)*Ze;Me!==null&&(St=Math.max(St,Me.start*Ze),ft=Math.min(ft,(Me.start+Me.count)*Ze)),Re!==null?(St=Math.max(St,0),ft=Math.min(ft,Re.count)):$e!=null&&(St=Math.max(St,0),ft=Math.min(ft,$e.count));const an=ft-St;if(an<0||an===1/0)return;D.setup(G,Z,ze,K,Re);let cn,Bt=Fe;if(Re!==null&&(cn=X.get(Re),Bt=Ce,Bt.setIndex(cn)),G.isMesh)Z.wireframe===!0?(Ae.setLineWidth(Z.wireframeLinewidth*at()),Bt.setMode(U.LINES)):Bt.setMode(U.TRIANGLES);else if(G.isLine){let st=Z.linewidth;st===void 0&&(st=1),Ae.setLineWidth(st*at()),G.isLineSegments?Bt.setMode(U.LINES):G.isLineLoop?Bt.setMode(U.LINE_LOOP):Bt.setMode(U.LINE_STRIP)}else G.isPoints?Bt.setMode(U.POINTS):G.isSprite&&Bt.setMode(U.TRIANGLES);if(G.isBatchedMesh)if(G._multiDrawInstances!==null)ql("WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),Bt.renderMultiDrawInstances(G._multiDrawStarts,G._multiDrawCounts,G._multiDrawCount,G._multiDrawInstances);else if(H.get("WEBGL_multi_draw"))Bt.renderMultiDraw(G._multiDrawStarts,G._multiDrawCounts,G._multiDrawCount);else{const st=G._multiDrawStarts,ln=G._multiDrawCounts,Ct=G._multiDrawCount,gi=Re?X.get(Re).bytesPerElement:1,Zi=Le.get(Z).currentProgram.getUniforms();for(let In=0;In<Ct;In++)Zi.setValue(U,"_gl_DrawID",In),Bt.render(st[In]/gi,ln[In])}else if(G.isInstancedMesh)Bt.renderInstances(St,an,G.count);else if(K.isInstancedBufferGeometry){const st=K._maxInstanceCount!==void 0?K._maxInstanceCount:1/0,ln=Math.min(K.instanceCount,st);Bt.renderInstances(St,an,ln)}else Bt.render(St,an)};function Ke(A,z,K){A.transparent===!0&&A.side===Wi&&A.forceSinglePass===!1?(A.side=xi,A.needsUpdate=!0,kt(A,z,K),A.side=ts,A.needsUpdate=!0,kt(A,z,K),A.side=Wi):kt(A,z,K)}this.compile=function(A,z,K=null){K===null&&(K=A),x=Qe.get(K),x.init(z),T.push(x),K.traverseVisible(function(G){G.isLight&&G.layers.test(z.layers)&&(x.pushLight(G),G.castShadow&&x.pushShadow(G))}),A!==K&&A.traverseVisible(function(G){G.isLight&&G.layers.test(z.layers)&&(x.pushLight(G),G.castShadow&&x.pushShadow(G))}),x.setupLights();const Z=new Set;return A.traverse(function(G){if(!(G.isMesh||G.isPoints||G.isLine||G.isSprite))return;const Me=G.material;if(Me)if(Array.isArray(Me))for(let Oe=0;Oe<Me.length;Oe++){const ze=Me[Oe];Ke(ze,K,G),Z.add(ze)}else Ke(Me,K,G),Z.add(Me)}),x=T.pop(),Z},this.compileAsync=function(A,z,K=null){const Z=this.compile(A,z,K);return new Promise(G=>{function Me(){if(Z.forEach(function(Oe){Le.get(Oe).currentProgram.isReady()&&Z.delete(Oe)}),Z.size===0){G(A);return}setTimeout(Me,10)}H.get("KHR_parallel_shader_compile")!==null?Me():setTimeout(Me,10)})};let lt=null;function De(A){lt&&lt(A)}function ct(){Xe.stop()}function tt(){Xe.start()}const Xe=new f_;Xe.setAnimationLoop(De),typeof self<"u"&&Xe.setContext(self),this.setAnimationLoop=function(A){lt=A,xe.setAnimationLoop(A),A===null?Xe.stop():Xe.start()},xe.addEventListener("sessionstart",ct),xe.addEventListener("sessionend",tt),this.render=function(A,z){if(z!==void 0&&z.isCamera!==!0){Rt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(E===!0)return;if(A.matrixWorldAutoUpdate===!0&&A.updateMatrixWorld(),z.parent===null&&z.matrixWorldAutoUpdate===!0&&z.updateMatrixWorld(),xe.enabled===!0&&xe.isPresenting===!0&&(xe.cameraAutoUpdate===!0&&xe.updateCamera(z),z=xe.getCamera()),A.isScene===!0&&A.onBeforeRender(M,A,z,y),x=Qe.get(A,T.length),x.init(z),T.push(x),Ie.multiplyMatrices(z.projectionMatrix,z.matrixWorldInverse),Q.setFromProjectionMatrix(Ie,Sr,z.reversedDepth),q=this.localClippingEnabled,ee=Pe.init(this.clippingPlanes,q),b=ye.get(A,v.length),b.init(),v.push(b),xe.enabled===!0&&xe.isPresenting===!0){const Me=M.xr.getDepthSensingMesh();Me!==null&&tn(Me,z,-1/0,M.sortObjects)}tn(A,z,0,M.sortObjects),b.finish(),M.sortObjects===!0&&b.sort($,P),Ne=xe.enabled===!1||xe.isPresenting===!1||xe.hasDepthSensing()===!1,Ne&&me.addToRenderList(b,A),this.info.render.frame++,ee===!0&&Pe.beginShadows();const K=x.state.shadowsArray;le.render(K,A,z),ee===!0&&Pe.endShadows(),this.info.autoReset===!0&&this.info.reset();const Z=b.opaque,G=b.transmissive;if(x.setupLights(),z.isArrayCamera){const Me=z.cameras;if(G.length>0)for(let Oe=0,ze=Me.length;Oe<ze;Oe++){const Re=Me[Oe];xt(Z,G,A,Re)}Ne&&me.render(A);for(let Oe=0,ze=Me.length;Oe<ze;Oe++){const Re=Me[Oe];_t(b,A,Re,Re.viewport)}}else G.length>0&&xt(Z,G,A,z),Ne&&me.render(A),_t(b,A,z);y!==null&&w===0&&(ke.updateMultisampleRenderTarget(y),ke.updateRenderTargetMipmap(y)),A.isScene===!0&&A.onAfterRender(M,A,z),D.resetDefaultState(),L=-1,N=null,T.pop(),T.length>0?(x=T[T.length-1],ee===!0&&Pe.setGlobalState(M.clippingPlanes,x.state.camera)):x=null,v.pop(),v.length>0?b=v[v.length-1]:b=null};function tn(A,z,K,Z){if(A.visible===!1)return;if(A.layers.test(z.layers)){if(A.isGroup)K=A.renderOrder;else if(A.isLOD)A.autoUpdate===!0&&A.update(z);else if(A.isLight)x.pushLight(A),A.castShadow&&x.pushShadow(A);else if(A.isSprite){if(!A.frustumCulled||Q.intersectsSprite(A)){Z&&qe.setFromMatrixPosition(A.matrixWorld).applyMatrix4(Ie);const Oe=oe.update(A),ze=A.material;ze.visible&&b.push(A,Oe,ze,K,qe.z,null)}}else if((A.isMesh||A.isLine||A.isPoints)&&(!A.frustumCulled||Q.intersectsObject(A))){const Oe=oe.update(A),ze=A.material;if(Z&&(A.boundingSphere!==void 0?(A.boundingSphere===null&&A.computeBoundingSphere(),qe.copy(A.boundingSphere.center)):(Oe.boundingSphere===null&&Oe.computeBoundingSphere(),qe.copy(Oe.boundingSphere.center)),qe.applyMatrix4(A.matrixWorld).applyMatrix4(Ie)),Array.isArray(ze)){const Re=Oe.groups;for(let Ze=0,He=Re.length;Ze<He;Ze++){const $e=Re[Ze],St=ze[$e.materialIndex];St&&St.visible&&b.push(A,Oe,St,K,qe.z,$e)}}else ze.visible&&b.push(A,Oe,ze,K,qe.z,null)}}const Me=A.children;for(let Oe=0,ze=Me.length;Oe<ze;Oe++)tn(Me[Oe],z,K,Z)}function _t(A,z,K,Z){const{opaque:G,transmissive:Me,transparent:Oe}=A;x.setupLightsView(K),ee===!0&&Pe.setGlobalState(M.clippingPlanes,K),Z&&Ae.viewport(W.copy(Z)),G.length>0&&Dt(G,z,K),Me.length>0&&Dt(Me,z,K),Oe.length>0&&Dt(Oe,z,K),Ae.buffers.depth.setTest(!0),Ae.buffers.depth.setMask(!0),Ae.buffers.color.setMask(!0),Ae.setPolygonOffset(!1)}function xt(A,z,K,Z){if((K.isScene===!0?K.overrideMaterial:null)!==null)return;x.state.transmissionRenderTarget[Z.id]===void 0&&(x.state.transmissionRenderTarget[Z.id]=new Is(1,1,{generateMipmaps:!0,type:H.has("EXT_color_buffer_half_float")||H.has("EXT_color_buffer_float")?Fa:Pr,minFilter:Yr,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:It.workingColorSpace}));const Me=x.state.transmissionRenderTarget[Z.id],Oe=Z.viewport||W;Me.setSize(Oe.z*M.transmissionResolutionScale,Oe.w*M.transmissionResolutionScale);const ze=M.getRenderTarget(),Re=M.getActiveCubeFace(),Ze=M.getActiveMipmapLevel();M.setRenderTarget(Me),M.getClearColor(J),te=M.getClearAlpha(),te<1&&M.setClearColor(16777215,.5),M.clear(),Ne&&me.render(K);const He=M.toneMapping;M.toneMapping=Cs;const $e=Z.viewport;if(Z.viewport!==void 0&&(Z.viewport=void 0),x.setupLightsView(Z),ee===!0&&Pe.setGlobalState(M.clippingPlanes,Z),Dt(A,K,Z),ke.updateMultisampleRenderTarget(Me),ke.updateRenderTargetMipmap(Me),H.has("WEBGL_multisampled_render_to_texture")===!1){let St=!1;for(let ft=0,an=z.length;ft<an;ft++){const cn=z[ft],{object:Bt,geometry:st,material:ln,group:Ct}=cn;if(ln.side===Wi&&Bt.layers.test(Z.layers)){const gi=ln.side;ln.side=xi,ln.needsUpdate=!0,Vt(Bt,K,Z,st,ln,Ct),ln.side=gi,ln.needsUpdate=!0,St=!0}}St===!0&&(ke.updateMultisampleRenderTarget(Me),ke.updateRenderTargetMipmap(Me))}M.setRenderTarget(ze,Re,Ze),M.setClearColor(J,te),$e!==void 0&&(Z.viewport=$e),M.toneMapping=He}function Dt(A,z,K){const Z=z.isScene===!0?z.overrideMaterial:null;for(let G=0,Me=A.length;G<Me;G++){const Oe=A[G],{object:ze,geometry:Re,group:Ze}=Oe;let He=Oe.material;He.allowOverride===!0&&Z!==null&&(He=Z),ze.layers.test(K.layers)&&Vt(ze,z,K,Re,He,Ze)}}function Vt(A,z,K,Z,G,Me){A.onBeforeRender(M,z,K,Z,G,Me),A.modelViewMatrix.multiplyMatrices(K.matrixWorldInverse,A.matrixWorld),A.normalMatrix.getNormalMatrix(A.modelViewMatrix),G.onBeforeRender(M,z,K,Z,A,Me),G.transparent===!0&&G.side===Wi&&G.forceSinglePass===!1?(G.side=xi,G.needsUpdate=!0,M.renderBufferDirect(K,z,Z,G,A,Me),G.side=ts,G.needsUpdate=!0,M.renderBufferDirect(K,z,Z,G,A,Me),G.side=Wi):M.renderBufferDirect(K,z,Z,G,A,Me),A.onAfterRender(M,z,K,Z,G,Me)}function kt(A,z,K){z.isScene!==!0&&(z=ht);const Z=Le.get(A),G=x.state.lights,Me=x.state.shadowsArray,Oe=G.state.version,ze=ne.getParameters(A,G.state,Me,z,K),Re=ne.getProgramCacheKey(ze);let Ze=Z.programs;Z.environment=A.isMeshStandardMaterial?z.environment:null,Z.fog=z.fog,Z.envMap=(A.isMeshStandardMaterial?C:I).get(A.envMap||Z.environment),Z.envMapRotation=Z.environment!==null&&A.envMap===null?z.environmentRotation:A.envMapRotation,Ze===void 0&&(A.addEventListener("dispose",Te),Ze=new Map,Z.programs=Ze);let He=Ze.get(Re);if(He!==void 0){if(Z.currentProgram===He&&Z.lightsStateVersion===Oe)return fn(A,ze),He}else ze.uniforms=ne.getUniforms(A),A.onBeforeCompile(ze,M),He=ne.acquireProgram(ze,Re),Ze.set(Re,He),Z.uniforms=ze.uniforms;const $e=Z.uniforms;return(!A.isShaderMaterial&&!A.isRawShaderMaterial||A.clipping===!0)&&($e.clippingPlanes=Pe.uniform),fn(A,ze),Z.needsLights=ei(A),Z.lightsStateVersion=Oe,Z.needsLights&&($e.ambientLightColor.value=G.state.ambient,$e.lightProbe.value=G.state.probe,$e.directionalLights.value=G.state.directional,$e.directionalLightShadows.value=G.state.directionalShadow,$e.spotLights.value=G.state.spot,$e.spotLightShadows.value=G.state.spotShadow,$e.rectAreaLights.value=G.state.rectArea,$e.ltc_1.value=G.state.rectAreaLTC1,$e.ltc_2.value=G.state.rectAreaLTC2,$e.pointLights.value=G.state.point,$e.pointLightShadows.value=G.state.pointShadow,$e.hemisphereLights.value=G.state.hemi,$e.directionalShadowMap.value=G.state.directionalShadowMap,$e.directionalShadowMatrix.value=G.state.directionalShadowMatrix,$e.spotShadowMap.value=G.state.spotShadowMap,$e.spotLightMatrix.value=G.state.spotLightMatrix,$e.spotLightMap.value=G.state.spotLightMap,$e.pointShadowMap.value=G.state.pointShadowMap,$e.pointShadowMatrix.value=G.state.pointShadowMatrix),Z.currentProgram=He,Z.uniformsList=null,He}function At(A){if(A.uniformsList===null){const z=A.currentProgram.getUniforms();A.uniformsList=ou.seqWithValue(z.seq,A.uniforms)}return A.uniformsList}function fn(A,z){const K=Le.get(A);K.outputColorSpace=z.outputColorSpace,K.batching=z.batching,K.batchingColor=z.batchingColor,K.instancing=z.instancing,K.instancingColor=z.instancingColor,K.instancingMorph=z.instancingMorph,K.skinning=z.skinning,K.morphTargets=z.morphTargets,K.morphNormals=z.morphNormals,K.morphColors=z.morphColors,K.morphTargetsCount=z.morphTargetsCount,K.numClippingPlanes=z.numClippingPlanes,K.numIntersection=z.numClipIntersection,K.vertexAlphas=z.vertexAlphas,K.vertexTangents=z.vertexTangents,K.toneMapping=z.toneMapping}function Ht(A,z,K,Z,G){z.isScene!==!0&&(z=ht),ke.resetTextureUnits();const Me=z.fog,Oe=Z.isMeshStandardMaterial?z.environment:null,ze=y===null?M.outputColorSpace:y.isXRRenderTarget===!0?y.texture.colorSpace:Jn,Re=(Z.isMeshStandardMaterial?C:I).get(Z.envMap||Oe),Ze=Z.vertexColors===!0&&!!K.attributes.color&&K.attributes.color.itemSize===4,He=!!K.attributes.tangent&&(!!Z.normalMap||Z.anisotropy>0),$e=!!K.morphAttributes.position,St=!!K.morphAttributes.normal,ft=!!K.morphAttributes.color;let an=Cs;Z.toneMapped&&(y===null||y.isXRRenderTarget===!0)&&(an=M.toneMapping);const cn=K.morphAttributes.position||K.morphAttributes.normal||K.morphAttributes.color,Bt=cn!==void 0?cn.length:0,st=Le.get(Z),ln=x.state.lights;if(ee===!0&&(q===!0||A!==N)){const On=A===N&&Z.id===L;Pe.setState(Z,A,On)}let Ct=!1;Z.version===st.__version?(st.needsLights&&st.lightsStateVersion!==ln.state.version||st.outputColorSpace!==ze||G.isBatchedMesh&&st.batching===!1||!G.isBatchedMesh&&st.batching===!0||G.isBatchedMesh&&st.batchingColor===!0&&G.colorTexture===null||G.isBatchedMesh&&st.batchingColor===!1&&G.colorTexture!==null||G.isInstancedMesh&&st.instancing===!1||!G.isInstancedMesh&&st.instancing===!0||G.isSkinnedMesh&&st.skinning===!1||!G.isSkinnedMesh&&st.skinning===!0||G.isInstancedMesh&&st.instancingColor===!0&&G.instanceColor===null||G.isInstancedMesh&&st.instancingColor===!1&&G.instanceColor!==null||G.isInstancedMesh&&st.instancingMorph===!0&&G.morphTexture===null||G.isInstancedMesh&&st.instancingMorph===!1&&G.morphTexture!==null||st.envMap!==Re||Z.fog===!0&&st.fog!==Me||st.numClippingPlanes!==void 0&&(st.numClippingPlanes!==Pe.numPlanes||st.numIntersection!==Pe.numIntersection)||st.vertexAlphas!==Ze||st.vertexTangents!==He||st.morphTargets!==$e||st.morphNormals!==St||st.morphColors!==ft||st.toneMapping!==an||st.morphTargetsCount!==Bt)&&(Ct=!0):(Ct=!0,st.__version=Z.version);let gi=st.currentProgram;Ct===!0&&(gi=kt(Z,z,G));let Zi=!1,In=!1,hr=!1;const Ut=gi.getUniforms(),vn=st.uniforms;if(Ae.useProgram(gi.program)&&(Zi=!0,In=!0,hr=!0),Z.id!==L&&(L=Z.id,In=!0),Zi||N!==A){Ae.buffers.depth.getReversed()&&A.reversedDepth!==!0&&(A._reversedDepth=!0,A.updateProjectionMatrix()),Ut.setValue(U,"projectionMatrix",A.projectionMatrix),Ut.setValue(U,"viewMatrix",A.matrixWorldInverse);const Gn=Ut.map.cameraPosition;Gn!==void 0&&Gn.setValue(U,be.setFromMatrixPosition(A.matrixWorld)),rt.logarithmicDepthBuffer&&Ut.setValue(U,"logDepthBufFC",2/(Math.log(A.far+1)/Math.LN2)),(Z.isMeshPhongMaterial||Z.isMeshToonMaterial||Z.isMeshLambertMaterial||Z.isMeshBasicMaterial||Z.isMeshStandardMaterial||Z.isShaderMaterial)&&Ut.setValue(U,"isOrthographic",A.isOrthographicCamera===!0),N!==A&&(N=A,In=!0,hr=!0)}if(G.isSkinnedMesh){Ut.setOptional(U,G,"bindMatrix"),Ut.setOptional(U,G,"bindMatrixInverse");const On=G.skeleton;On&&(On.boneTexture===null&&On.computeBoneTexture(),Ut.setValue(U,"boneTexture",On.boneTexture,ke))}G.isBatchedMesh&&(Ut.setOptional(U,G,"batchingTexture"),Ut.setValue(U,"batchingTexture",G._matricesTexture,ke),Ut.setOptional(U,G,"batchingIdTexture"),Ut.setValue(U,"batchingIdTexture",G._indirectTexture,ke),Ut.setOptional(U,G,"batchingColorTexture"),G._colorsTexture!==null&&Ut.setValue(U,"batchingColorTexture",G._colorsTexture,ke));const ti=K.morphAttributes;if((ti.position!==void 0||ti.normal!==void 0||ti.color!==void 0)&&Ge.update(G,K,gi),(In||st.receiveShadow!==G.receiveShadow)&&(st.receiveShadow=G.receiveShadow,Ut.setValue(U,"receiveShadow",G.receiveShadow)),Z.isMeshGouraudMaterial&&Z.envMap!==null&&(vn.envMap.value=Re,vn.flipEnvMap.value=Re.isCubeTexture&&Re.isRenderTargetTexture===!1?-1:1),Z.isMeshStandardMaterial&&Z.envMap===null&&z.environment!==null&&(vn.envMapIntensity.value=z.environmentIntensity),vn.dfgLUT!==void 0&&(vn.dfgLUT.value=zT()),In&&(Ut.setValue(U,"toneMappingExposure",M.toneMappingExposure),st.needsLights&&Gt(vn,hr),Me&&Z.fog===!0&&Be.refreshFogUniforms(vn,Me),Be.refreshMaterialUniforms(vn,Z,O,ue,x.state.transmissionRenderTarget[A.id]),ou.upload(U,At(st),vn,ke)),Z.isShaderMaterial&&Z.uniformsNeedUpdate===!0&&(ou.upload(U,At(st),vn,ke),Z.uniformsNeedUpdate=!1),Z.isSpriteMaterial&&Ut.setValue(U,"center",G.center),Ut.setValue(U,"modelViewMatrix",G.modelViewMatrix),Ut.setValue(U,"normalMatrix",G.normalMatrix),Ut.setValue(U,"modelMatrix",G.matrixWorld),Z.isShaderMaterial||Z.isRawShaderMaterial){const On=Z.uniformsGroups;for(let Gn=0,Hs=On.length;Gn<Hs;Gn++){const S=On[Gn];ve.update(S,gi),ve.bind(S,gi)}}return gi}function Gt(A,z){A.ambientLightColor.needsUpdate=z,A.lightProbe.needsUpdate=z,A.directionalLights.needsUpdate=z,A.directionalLightShadows.needsUpdate=z,A.pointLights.needsUpdate=z,A.pointLightShadows.needsUpdate=z,A.spotLights.needsUpdate=z,A.spotLightShadows.needsUpdate=z,A.rectAreaLights.needsUpdate=z,A.hemisphereLights.needsUpdate=z}function ei(A){return A.isMeshLambertMaterial||A.isMeshToonMaterial||A.isMeshPhongMaterial||A.isMeshStandardMaterial||A.isShadowMaterial||A.isShaderMaterial&&A.lights===!0}this.getActiveCubeFace=function(){return R},this.getActiveMipmapLevel=function(){return w},this.getRenderTarget=function(){return y},this.setRenderTargetTextures=function(A,z,K){const Z=Le.get(A);Z.__autoAllocateDepthBuffer=A.resolveDepthBuffer===!1,Z.__autoAllocateDepthBuffer===!1&&(Z.__useRenderToTexture=!1),Le.get(A.texture).__webglTexture=z,Le.get(A.depthTexture).__webglTexture=Z.__autoAllocateDepthBuffer?void 0:K,Z.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(A,z){const K=Le.get(A);K.__webglFramebuffer=z,K.__useDefaultFramebuffer=z===void 0};const qt=U.createFramebuffer();this.setRenderTarget=function(A,z=0,K=0){y=A,R=z,w=K;let Z=!0,G=null,Me=!1,Oe=!1;if(A){const Re=Le.get(A);if(Re.__useDefaultFramebuffer!==void 0)Ae.bindFramebuffer(U.FRAMEBUFFER,null),Z=!1;else if(Re.__webglFramebuffer===void 0)ke.setupRenderTarget(A);else if(Re.__hasExternalTextures)ke.rebindTextures(A,Le.get(A.texture).__webglTexture,Le.get(A.depthTexture).__webglTexture);else if(A.depthBuffer){const $e=A.depthTexture;if(Re.__boundDepthTexture!==$e){if($e!==null&&Le.has($e)&&(A.width!==$e.image.width||A.height!==$e.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");ke.setupDepthRenderbuffer(A)}}const Ze=A.texture;(Ze.isData3DTexture||Ze.isDataArrayTexture||Ze.isCompressedArrayTexture)&&(Oe=!0);const He=Le.get(A).__webglFramebuffer;A.isWebGLCubeRenderTarget?(Array.isArray(He[z])?G=He[z][K]:G=He[z],Me=!0):A.samples>0&&ke.useMultisampledRTT(A)===!1?G=Le.get(A).__webglMultisampledFramebuffer:Array.isArray(He)?G=He[K]:G=He,W.copy(A.viewport),j.copy(A.scissor),k=A.scissorTest}else W.copy(_e).multiplyScalar(O).floor(),j.copy(we).multiplyScalar(O).floor(),k=Se;if(K!==0&&(G=qt),Ae.bindFramebuffer(U.FRAMEBUFFER,G)&&Z&&Ae.drawBuffers(A,G),Ae.viewport(W),Ae.scissor(j),Ae.setScissorTest(k),Me){const Re=Le.get(A.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_CUBE_MAP_POSITIVE_X+z,Re.__webglTexture,K)}else if(Oe){const Re=z;for(let Ze=0;Ze<A.textures.length;Ze++){const He=Le.get(A.textures[Ze]);U.framebufferTextureLayer(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0+Ze,He.__webglTexture,K,Re)}}else if(A!==null&&K!==0){const Re=Le.get(A.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,Re.__webglTexture,K)}L=-1},this.readRenderTargetPixels=function(A,z,K,Z,G,Me,Oe,ze=0){if(!(A&&A.isWebGLRenderTarget)){Rt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Re=Le.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&Oe!==void 0&&(Re=Re[Oe]),Re){Ae.bindFramebuffer(U.FRAMEBUFFER,Re);try{const Ze=A.textures[ze],He=Ze.format,$e=Ze.type;if(!rt.textureFormatReadable(He)){Rt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!rt.textureTypeReadable($e)){Rt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}z>=0&&z<=A.width-Z&&K>=0&&K<=A.height-G&&(A.textures.length>1&&U.readBuffer(U.COLOR_ATTACHMENT0+ze),U.readPixels(z,K,Z,G,et.convert(He),et.convert($e),Me))}finally{const Ze=y!==null?Le.get(y).__webglFramebuffer:null;Ae.bindFramebuffer(U.FRAMEBUFFER,Ze)}}},this.readRenderTargetPixelsAsync=async function(A,z,K,Z,G,Me,Oe,ze=0){if(!(A&&A.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Re=Le.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&Oe!==void 0&&(Re=Re[Oe]),Re)if(z>=0&&z<=A.width-Z&&K>=0&&K<=A.height-G){Ae.bindFramebuffer(U.FRAMEBUFFER,Re);const Ze=A.textures[ze],He=Ze.format,$e=Ze.type;if(!rt.textureFormatReadable(He))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!rt.textureTypeReadable($e))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const St=U.createBuffer();U.bindBuffer(U.PIXEL_PACK_BUFFER,St),U.bufferData(U.PIXEL_PACK_BUFFER,Me.byteLength,U.STREAM_READ),A.textures.length>1&&U.readBuffer(U.COLOR_ATTACHMENT0+ze),U.readPixels(z,K,Z,G,et.convert(He),et.convert($e),0);const ft=y!==null?Le.get(y).__webglFramebuffer:null;Ae.bindFramebuffer(U.FRAMEBUFFER,ft);const an=U.fenceSync(U.SYNC_GPU_COMMANDS_COMPLETE,0);return U.flush(),await Ey(U,an,4),U.bindBuffer(U.PIXEL_PACK_BUFFER,St),U.getBufferSubData(U.PIXEL_PACK_BUFFER,0,Me),U.deleteBuffer(St),U.deleteSync(an),Me}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(A,z=null,K=0){const Z=Math.pow(2,-K),G=Math.floor(A.image.width*Z),Me=Math.floor(A.image.height*Z),Oe=z!==null?z.x:0,ze=z!==null?z.y:0;ke.setTexture2D(A,0),U.copyTexSubImage2D(U.TEXTURE_2D,K,0,0,Oe,ze,G,Me),Ae.unbindTexture()};const Yt=U.createFramebuffer(),Kt=U.createFramebuffer();this.copyTextureToTexture=function(A,z,K=null,Z=null,G=0,Me=null){Me===null&&(G!==0?(ql("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),Me=G,G=0):Me=0);let Oe,ze,Re,Ze,He,$e,St,ft,an;const cn=A.isCompressedTexture?A.mipmaps[Me]:A.image;if(K!==null)Oe=K.max.x-K.min.x,ze=K.max.y-K.min.y,Re=K.isBox3?K.max.z-K.min.z:1,Ze=K.min.x,He=K.min.y,$e=K.isBox3?K.min.z:0;else{const ti=Math.pow(2,-G);Oe=Math.floor(cn.width*ti),ze=Math.floor(cn.height*ti),A.isDataArrayTexture?Re=cn.depth:A.isData3DTexture?Re=Math.floor(cn.depth*ti):Re=1,Ze=0,He=0,$e=0}Z!==null?(St=Z.x,ft=Z.y,an=Z.z):(St=0,ft=0,an=0);const Bt=et.convert(z.format),st=et.convert(z.type);let ln;z.isData3DTexture?(ke.setTexture3D(z,0),ln=U.TEXTURE_3D):z.isDataArrayTexture||z.isCompressedArrayTexture?(ke.setTexture2DArray(z,0),ln=U.TEXTURE_2D_ARRAY):(ke.setTexture2D(z,0),ln=U.TEXTURE_2D),U.pixelStorei(U.UNPACK_FLIP_Y_WEBGL,z.flipY),U.pixelStorei(U.UNPACK_PREMULTIPLY_ALPHA_WEBGL,z.premultiplyAlpha),U.pixelStorei(U.UNPACK_ALIGNMENT,z.unpackAlignment);const Ct=U.getParameter(U.UNPACK_ROW_LENGTH),gi=U.getParameter(U.UNPACK_IMAGE_HEIGHT),Zi=U.getParameter(U.UNPACK_SKIP_PIXELS),In=U.getParameter(U.UNPACK_SKIP_ROWS),hr=U.getParameter(U.UNPACK_SKIP_IMAGES);U.pixelStorei(U.UNPACK_ROW_LENGTH,cn.width),U.pixelStorei(U.UNPACK_IMAGE_HEIGHT,cn.height),U.pixelStorei(U.UNPACK_SKIP_PIXELS,Ze),U.pixelStorei(U.UNPACK_SKIP_ROWS,He),U.pixelStorei(U.UNPACK_SKIP_IMAGES,$e);const Ut=A.isDataArrayTexture||A.isData3DTexture,vn=z.isDataArrayTexture||z.isData3DTexture;if(A.isDepthTexture){const ti=Le.get(A),On=Le.get(z),Gn=Le.get(ti.__renderTarget),Hs=Le.get(On.__renderTarget);Ae.bindFramebuffer(U.READ_FRAMEBUFFER,Gn.__webglFramebuffer),Ae.bindFramebuffer(U.DRAW_FRAMEBUFFER,Hs.__webglFramebuffer);for(let S=0;S<Re;S++)Ut&&(U.framebufferTextureLayer(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,Le.get(A).__webglTexture,G,$e+S),U.framebufferTextureLayer(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,Le.get(z).__webglTexture,Me,an+S)),U.blitFramebuffer(Ze,He,Oe,ze,St,ft,Oe,ze,U.DEPTH_BUFFER_BIT,U.NEAREST);Ae.bindFramebuffer(U.READ_FRAMEBUFFER,null),Ae.bindFramebuffer(U.DRAW_FRAMEBUFFER,null)}else if(G!==0||A.isRenderTargetTexture||Le.has(A)){const ti=Le.get(A),On=Le.get(z);Ae.bindFramebuffer(U.READ_FRAMEBUFFER,Yt),Ae.bindFramebuffer(U.DRAW_FRAMEBUFFER,Kt);for(let Gn=0;Gn<Re;Gn++)Ut?U.framebufferTextureLayer(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,ti.__webglTexture,G,$e+Gn):U.framebufferTexture2D(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,ti.__webglTexture,G),vn?U.framebufferTextureLayer(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,On.__webglTexture,Me,an+Gn):U.framebufferTexture2D(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,On.__webglTexture,Me),G!==0?U.blitFramebuffer(Ze,He,Oe,ze,St,ft,Oe,ze,U.COLOR_BUFFER_BIT,U.NEAREST):vn?U.copyTexSubImage3D(ln,Me,St,ft,an+Gn,Ze,He,Oe,ze):U.copyTexSubImage2D(ln,Me,St,ft,Ze,He,Oe,ze);Ae.bindFramebuffer(U.READ_FRAMEBUFFER,null),Ae.bindFramebuffer(U.DRAW_FRAMEBUFFER,null)}else vn?A.isDataTexture||A.isData3DTexture?U.texSubImage3D(ln,Me,St,ft,an,Oe,ze,Re,Bt,st,cn.data):z.isCompressedArrayTexture?U.compressedTexSubImage3D(ln,Me,St,ft,an,Oe,ze,Re,Bt,cn.data):U.texSubImage3D(ln,Me,St,ft,an,Oe,ze,Re,Bt,st,cn):A.isDataTexture?U.texSubImage2D(U.TEXTURE_2D,Me,St,ft,Oe,ze,Bt,st,cn.data):A.isCompressedTexture?U.compressedTexSubImage2D(U.TEXTURE_2D,Me,St,ft,cn.width,cn.height,Bt,cn.data):U.texSubImage2D(U.TEXTURE_2D,Me,St,ft,Oe,ze,Bt,st,cn);U.pixelStorei(U.UNPACK_ROW_LENGTH,Ct),U.pixelStorei(U.UNPACK_IMAGE_HEIGHT,gi),U.pixelStorei(U.UNPACK_SKIP_PIXELS,Zi),U.pixelStorei(U.UNPACK_SKIP_ROWS,In),U.pixelStorei(U.UNPACK_SKIP_IMAGES,hr),Me===0&&z.generateMipmaps&&U.generateMipmap(ln),Ae.unbindTexture()},this.initRenderTarget=function(A){Le.get(A).__webglFramebuffer===void 0&&ke.setupRenderTarget(A)},this.initTexture=function(A){A.isCubeTexture?ke.setTextureCube(A,0):A.isData3DTexture?ke.setTexture3D(A,0):A.isDataArrayTexture||A.isCompressedArrayTexture?ke.setTexture2DArray(A,0):ke.setTexture2D(A,0),Ae.unbindTexture()},this.resetState=function(){R=0,w=0,y=null,Ae.reset(),D.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Sr}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=It._getDrawingBufferColorSpace(e),t.unpackColorSpace=It._getUnpackColorSpace()}}function VT(r){if(!(typeof window>"u")){var e=document.createElement("style");return e.setAttribute("type","text/css"),e.innerHTML=r,document.head.appendChild(e),r}}function ra(r,e){var t=r.__state.conversionName.toString(),n=Math.round(r.r),i=Math.round(r.g),s=Math.round(r.b),o=r.a,a=Math.round(r.h),l=r.s.toFixed(1),c=r.v.toFixed(1);if(e||t==="THREE_CHAR_HEX"||t==="SIX_CHAR_HEX"){for(var u=r.hex.toString(16);u.length<6;)u="0"+u;return"#"+u}else{if(t==="CSS_RGB")return"rgb("+n+","+i+","+s+")";if(t==="CSS_RGBA")return"rgba("+n+","+i+","+s+","+o+")";if(t==="HEX")return"0x"+r.hex.toString(16);if(t==="RGB_ARRAY")return"["+n+","+i+","+s+"]";if(t==="RGBA_ARRAY")return"["+n+","+i+","+s+","+o+"]";if(t==="RGB_OBJ")return"{r:"+n+",g:"+i+",b:"+s+"}";if(t==="RGBA_OBJ")return"{r:"+n+",g:"+i+",b:"+s+",a:"+o+"}";if(t==="HSV_OBJ")return"{h:"+a+",s:"+l+",v:"+c+"}";if(t==="HSVA_OBJ")return"{h:"+a+",s:"+l+",v:"+c+",a:"+o+"}"}return"unknown format"}var a0=Array.prototype.forEach,Za=Array.prototype.slice,fe={BREAK:{},extend:function(e){return this.each(Za.call(arguments,1),function(t){var n=this.isObject(t)?Object.keys(t):[];n.forEach((function(i){this.isUndefined(t[i])||(e[i]=t[i])}).bind(this))},this),e},defaults:function(e){return this.each(Za.call(arguments,1),function(t){var n=this.isObject(t)?Object.keys(t):[];n.forEach((function(i){this.isUndefined(e[i])&&(e[i]=t[i])}).bind(this))},this),e},compose:function(){var e=Za.call(arguments);return function(){for(var t=Za.call(arguments),n=e.length-1;n>=0;n--)t=[e[n].apply(this,t)];return t[0]}},each:function(e,t,n){if(e){if(a0&&e.forEach&&e.forEach===a0)e.forEach(t,n);else if(e.length===e.length+0){var i=void 0,s=void 0;for(i=0,s=e.length;i<s;i++)if(i in e&&t.call(n,e[i],i)===this.BREAK)return}else for(var o in e)if(t.call(n,e[o],o)===this.BREAK)return}},defer:function(e){setTimeout(e,0)},debounce:function(e,t,n){var i=void 0;return function(){var s=this,o=arguments;function a(){i=null,n||e.apply(s,o)}var l=n||!i;clearTimeout(i),i=setTimeout(a,t),l&&e.apply(s,o)}},toArray:function(e){return e.toArray?e.toArray():Za.call(e)},isUndefined:function(e){return e===void 0},isNull:function(e){return e===null},isNaN:(function(r){function e(t){return r.apply(this,arguments)}return e.toString=function(){return r.toString()},e})(function(r){return isNaN(r)}),isArray:Array.isArray||function(r){return r.constructor===Array},isObject:function(e){return e===Object(e)},isNumber:function(e){return e===e+0},isString:function(e){return e===e+""},isBoolean:function(e){return e===!1||e===!0},isFunction:function(e){return e instanceof Function}},HT=[{litmus:fe.isString,conversions:{THREE_CHAR_HEX:{read:function(e){var t=e.match(/^#([A-F0-9])([A-F0-9])([A-F0-9])$/i);return t===null?!1:{space:"HEX",hex:parseInt("0x"+t[1].toString()+t[1].toString()+t[2].toString()+t[2].toString()+t[3].toString()+t[3].toString(),0)}},write:ra},SIX_CHAR_HEX:{read:function(e){var t=e.match(/^#([A-F0-9]{6})$/i);return t===null?!1:{space:"HEX",hex:parseInt("0x"+t[1].toString(),0)}},write:ra},CSS_RGB:{read:function(e){var t=e.match(/^rgb\(\s*(\S+)\s*,\s*(\S+)\s*,\s*(\S+)\s*\)/);return t===null?!1:{space:"RGB",r:parseFloat(t[1]),g:parseFloat(t[2]),b:parseFloat(t[3])}},write:ra},CSS_RGBA:{read:function(e){var t=e.match(/^rgba\(\s*(\S+)\s*,\s*(\S+)\s*,\s*(\S+)\s*,\s*(\S+)\s*\)/);return t===null?!1:{space:"RGB",r:parseFloat(t[1]),g:parseFloat(t[2]),b:parseFloat(t[3]),a:parseFloat(t[4])}},write:ra}}},{litmus:fe.isNumber,conversions:{HEX:{read:function(e){return{space:"HEX",hex:e,conversionName:"HEX"}},write:function(e){return e.hex}}}},{litmus:fe.isArray,conversions:{RGB_ARRAY:{read:function(e){return e.length!==3?!1:{space:"RGB",r:e[0],g:e[1],b:e[2]}},write:function(e){return[e.r,e.g,e.b]}},RGBA_ARRAY:{read:function(e){return e.length!==4?!1:{space:"RGB",r:e[0],g:e[1],b:e[2],a:e[3]}},write:function(e){return[e.r,e.g,e.b,e.a]}}}},{litmus:fe.isObject,conversions:{RGBA_OBJ:{read:function(e){return fe.isNumber(e.r)&&fe.isNumber(e.g)&&fe.isNumber(e.b)&&fe.isNumber(e.a)?{space:"RGB",r:e.r,g:e.g,b:e.b,a:e.a}:!1},write:function(e){return{r:e.r,g:e.g,b:e.b,a:e.a}}},RGB_OBJ:{read:function(e){return fe.isNumber(e.r)&&fe.isNumber(e.g)&&fe.isNumber(e.b)?{space:"RGB",r:e.r,g:e.g,b:e.b}:!1},write:function(e){return{r:e.r,g:e.g,b:e.b}}},HSVA_OBJ:{read:function(e){return fe.isNumber(e.h)&&fe.isNumber(e.s)&&fe.isNumber(e.v)&&fe.isNumber(e.a)?{space:"HSV",h:e.h,s:e.s,v:e.v,a:e.a}:!1},write:function(e){return{h:e.h,s:e.s,v:e.v,a:e.a}}},HSV_OBJ:{read:function(e){return fe.isNumber(e.h)&&fe.isNumber(e.s)&&fe.isNumber(e.v)?{space:"HSV",h:e.h,s:e.s,v:e.v}:!1},write:function(e){return{h:e.h,s:e.s,v:e.v}}}}}],Ja=void 0,Fc=void 0,nh=function(){Fc=!1;var e=arguments.length>1?fe.toArray(arguments):arguments[0];return fe.each(HT,function(t){if(t.litmus(e))return fe.each(t.conversions,function(n,i){if(Ja=n.read(e),Fc===!1&&Ja!==!1)return Fc=Ja,Ja.conversionName=i,Ja.conversion=n,fe.BREAK}),fe.BREAK}),Fc},l0=void 0,Au={hsv_to_rgb:function(e,t,n){var i=Math.floor(e/60)%6,s=e/60-Math.floor(e/60),o=n*(1-t),a=n*(1-s*t),l=n*(1-(1-s)*t),c=[[n,l,o],[a,n,o],[o,n,l],[o,a,n],[l,o,n],[n,o,a]][i];return{r:c[0]*255,g:c[1]*255,b:c[2]*255}},rgb_to_hsv:function(e,t,n){var i=Math.min(e,t,n),s=Math.max(e,t,n),o=s-i,a=void 0,l=void 0;if(s!==0)l=o/s;else return{h:NaN,s:0,v:0};return e===s?a=(t-n)/o:t===s?a=2+(n-e)/o:a=4+(e-t)/o,a/=6,a<0&&(a+=1),{h:a*360,s:l,v:s/255}},rgb_to_hex:function(e,t,n){var i=this.hex_with_component(0,2,e);return i=this.hex_with_component(i,1,t),i=this.hex_with_component(i,0,n),i},component_from_hex:function(e,t){return e>>t*8&255},hex_with_component:function(e,t,n){return n<<(l0=t*8)|e&~(255<<l0)}},GT=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(r){return typeof r}:function(r){return r&&typeof Symbol=="function"&&r.constructor===Symbol&&r!==Symbol.prototype?"symbol":typeof r},dr=function(r,e){if(!(r instanceof e))throw new TypeError("Cannot call a class as a function")},fr=(function(){function r(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(e,t,n){return t&&r(e.prototype,t),n&&r(e,n),e}})(),Os=function r(e,t,n){e===null&&(e=Function.prototype);var i=Object.getOwnPropertyDescriptor(e,t);if(i===void 0){var s=Object.getPrototypeOf(e);return s===null?void 0:r(s,t,n)}else{if("value"in i)return i.value;var o=i.get;return o===void 0?void 0:o.call(n)}},Bs=function(r,e){if(typeof e!="function"&&e!==null)throw new TypeError("Super expression must either be null or a function, not "+typeof e);r.prototype=Object.create(e&&e.prototype,{constructor:{value:r,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(r,e):r.__proto__=e)},zs=function(r,e){if(!r)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e&&(typeof e=="object"||typeof e=="function")?e:r},kn=(function(){function r(){if(dr(this,r),this.__state=nh.apply(this,arguments),this.__state===!1)throw new Error("Failed to interpret color arguments");this.__state.a=this.__state.a||1}return fr(r,[{key:"toString",value:function(){return ra(this)}},{key:"toHexString",value:function(){return ra(this,!0)}},{key:"toOriginal",value:function(){return this.__state.conversion.write(this)}}]),r})();function up(r,e,t){Object.defineProperty(r,e,{get:function(){return this.__state.space==="RGB"?this.__state[e]:(kn.recalculateRGB(this,e,t),this.__state[e])},set:function(i){this.__state.space!=="RGB"&&(kn.recalculateRGB(this,e,t),this.__state.space="RGB"),this.__state[e]=i}})}function dp(r,e){Object.defineProperty(r,e,{get:function(){return this.__state.space==="HSV"?this.__state[e]:(kn.recalculateHSV(this),this.__state[e])},set:function(n){this.__state.space!=="HSV"&&(kn.recalculateHSV(this),this.__state.space="HSV"),this.__state[e]=n}})}kn.recalculateRGB=function(r,e,t){if(r.__state.space==="HEX")r.__state[e]=Au.component_from_hex(r.__state.hex,t);else if(r.__state.space==="HSV")fe.extend(r.__state,Au.hsv_to_rgb(r.__state.h,r.__state.s,r.__state.v));else throw new Error("Corrupted color state")};kn.recalculateHSV=function(r){var e=Au.rgb_to_hsv(r.r,r.g,r.b);fe.extend(r.__state,{s:e.s,v:e.v}),fe.isNaN(e.h)?fe.isUndefined(r.__state.h)&&(r.__state.h=0):r.__state.h=e.h};kn.COMPONENTS=["r","g","b","h","s","v","hex","a"];up(kn.prototype,"r",2);up(kn.prototype,"g",1);up(kn.prototype,"b",0);dp(kn.prototype,"h");dp(kn.prototype,"s");dp(kn.prototype,"v");Object.defineProperty(kn.prototype,"a",{get:function(){return this.__state.a},set:function(e){this.__state.a=e}});Object.defineProperty(kn.prototype,"hex",{get:function(){return this.__state.space!=="HEX"&&(this.__state.hex=Au.rgb_to_hex(this.r,this.g,this.b),this.__state.space="HEX"),this.__state.hex},set:function(e){this.__state.space="HEX",this.__state.hex=e}});var Co=(function(){function r(e,t){dr(this,r),this.initialValue=e[t],this.domElement=document.createElement("div"),this.object=e,this.property=t,this.__onChange=void 0,this.__onFinishChange=void 0}return fr(r,[{key:"onChange",value:function(t){return this.__onChange=t,this}},{key:"onFinishChange",value:function(t){return this.__onFinishChange=t,this}},{key:"setValue",value:function(t){return this.object[this.property]=t,this.__onChange&&this.__onChange.call(this,t),this.updateDisplay(),this}},{key:"getValue",value:function(){return this.object[this.property]}},{key:"updateDisplay",value:function(){return this}},{key:"isModified",value:function(){return this.initialValue!==this.getValue()}}]),r})(),WT={HTMLEvents:["change"],MouseEvents:["click","mousemove","mousedown","mouseup","mouseover"],KeyboardEvents:["keydown"]},x_={};fe.each(WT,function(r,e){fe.each(r,function(t){x_[t]=e})});var XT=/(\d+(\.\d+)?)px/;function mr(r){if(r==="0"||fe.isUndefined(r))return 0;var e=r.match(XT);return fe.isNull(e)?0:parseFloat(e[1])}var ie={makeSelectable:function(e,t){e===void 0||e.style===void 0||(e.onselectstart=t?function(){return!1}:function(){},e.style.MozUserSelect=t?"auto":"none",e.style.KhtmlUserSelect=t?"auto":"none",e.unselectable=t?"on":"off")},makeFullscreen:function(e,t,n){var i=n,s=t;fe.isUndefined(s)&&(s=!0),fe.isUndefined(i)&&(i=!0),e.style.position="absolute",s&&(e.style.left=0,e.style.right=0),i&&(e.style.top=0,e.style.bottom=0)},fakeEvent:function(e,t,n,i){var s=n||{},o=x_[t];if(!o)throw new Error("Event type "+t+" not supported.");var a=document.createEvent(o);switch(o){case"MouseEvents":{var l=s.x||s.clientX||0,c=s.y||s.clientY||0;a.initMouseEvent(t,s.bubbles||!1,s.cancelable||!0,window,s.clickCount||1,0,0,l,c,!1,!1,!1,!1,0,null);break}case"KeyboardEvents":{var u=a.initKeyboardEvent||a.initKeyEvent;fe.defaults(s,{cancelable:!0,ctrlKey:!1,altKey:!1,shiftKey:!1,metaKey:!1,keyCode:void 0,charCode:void 0}),u(t,s.bubbles||!1,s.cancelable,window,s.ctrlKey,s.altKey,s.shiftKey,s.metaKey,s.keyCode,s.charCode);break}default:{a.initEvent(t,s.bubbles||!1,s.cancelable||!0);break}}fe.defaults(a,i),e.dispatchEvent(a)},bind:function(e,t,n,i){var s=i||!1;return e.addEventListener?e.addEventListener(t,n,s):e.attachEvent&&e.attachEvent("on"+t,n),ie},unbind:function(e,t,n,i){var s=i||!1;return e.removeEventListener?e.removeEventListener(t,n,s):e.detachEvent&&e.detachEvent("on"+t,n),ie},addClass:function(e,t){if(e.className===void 0)e.className=t;else if(e.className!==t){var n=e.className.split(/ +/);n.indexOf(t)===-1&&(n.push(t),e.className=n.join(" ").replace(/^\s+/,"").replace(/\s+$/,""))}return ie},removeClass:function(e,t){if(t)if(e.className===t)e.removeAttribute("class");else{var n=e.className.split(/ +/),i=n.indexOf(t);i!==-1&&(n.splice(i,1),e.className=n.join(" "))}else e.className=void 0;return ie},hasClass:function(e,t){return new RegExp("(?:^|\\s+)"+t+"(?:\\s+|$)").test(e.className)||!1},getWidth:function(e){var t=getComputedStyle(e);return mr(t["border-left-width"])+mr(t["border-right-width"])+mr(t["padding-left"])+mr(t["padding-right"])+mr(t.width)},getHeight:function(e){var t=getComputedStyle(e);return mr(t["border-top-width"])+mr(t["border-bottom-width"])+mr(t["padding-top"])+mr(t["padding-bottom"])+mr(t.height)},getOffset:function(e){var t=e,n={left:0,top:0};if(t.offsetParent)do n.left+=t.offsetLeft,n.top+=t.offsetTop,t=t.offsetParent;while(t);return n},isActive:function(e){return e===document.activeElement&&(e.type||e.href)}},v_=(function(r){Bs(e,r);function e(t,n){dr(this,e);var i=zs(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n)),s=i;i.__prev=i.getValue(),i.__checkbox=document.createElement("input"),i.__checkbox.setAttribute("type","checkbox");function o(){s.setValue(!s.__prev)}return ie.bind(i.__checkbox,"change",o,!1),i.domElement.appendChild(i.__checkbox),i.updateDisplay(),i}return fr(e,[{key:"setValue",value:function(n){var i=Os(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"setValue",this).call(this,n);return this.__onFinishChange&&this.__onFinishChange.call(this,this.getValue()),this.__prev=this.getValue(),i}},{key:"updateDisplay",value:function(){return this.getValue()===!0?(this.__checkbox.setAttribute("checked","checked"),this.__checkbox.checked=!0,this.__prev=!0):(this.__checkbox.checked=!1,this.__prev=!1),Os(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"updateDisplay",this).call(this)}}]),e})(Co),qT=(function(r){Bs(e,r);function e(t,n,i){dr(this,e);var s=zs(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n)),o=i,a=s;if(s.__select=document.createElement("select"),fe.isArray(o)){var l={};fe.each(o,function(c){l[c]=c}),o=l}return fe.each(o,function(c,u){var d=document.createElement("option");d.innerHTML=u,d.setAttribute("value",c),a.__select.appendChild(d)}),s.updateDisplay(),ie.bind(s.__select,"change",function(){var c=this.options[this.selectedIndex].value;a.setValue(c)}),s.domElement.appendChild(s.__select),s}return fr(e,[{key:"setValue",value:function(n){var i=Os(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"setValue",this).call(this,n);return this.__onFinishChange&&this.__onFinishChange.call(this,this.getValue()),i}},{key:"updateDisplay",value:function(){return ie.isActive(this.__select)?this:(this.__select.value=this.getValue(),Os(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"updateDisplay",this).call(this))}}]),e})(Co),YT=(function(r){Bs(e,r);function e(t,n){dr(this,e);var i=zs(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n)),s=i;function o(){s.setValue(s.__input.value)}function a(){s.__onFinishChange&&s.__onFinishChange.call(s,s.getValue())}return i.__input=document.createElement("input"),i.__input.setAttribute("type","text"),ie.bind(i.__input,"keyup",o),ie.bind(i.__input,"change",o),ie.bind(i.__input,"blur",a),ie.bind(i.__input,"keydown",function(l){l.keyCode===13&&this.blur()}),i.updateDisplay(),i.domElement.appendChild(i.__input),i}return fr(e,[{key:"updateDisplay",value:function(){return ie.isActive(this.__input)||(this.__input.value=this.getValue()),Os(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"updateDisplay",this).call(this)}}]),e})(Co);function c0(r){var e=r.toString();return e.indexOf(".")>-1?e.length-e.indexOf(".")-1:0}var y_=(function(r){Bs(e,r);function e(t,n,i){dr(this,e);var s=zs(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n)),o=i||{};return s.__min=o.min,s.__max=o.max,s.__step=o.step,fe.isUndefined(s.__step)?s.initialValue===0?s.__impliedStep=1:s.__impliedStep=Math.pow(10,Math.floor(Math.log(Math.abs(s.initialValue))/Math.LN10))/10:s.__impliedStep=s.__step,s.__precision=c0(s.__impliedStep),s}return fr(e,[{key:"setValue",value:function(n){var i=n;return this.__min!==void 0&&i<this.__min?i=this.__min:this.__max!==void 0&&i>this.__max&&(i=this.__max),this.__step!==void 0&&i%this.__step!==0&&(i=Math.round(i/this.__step)*this.__step),Os(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"setValue",this).call(this,i)}},{key:"min",value:function(n){return this.__min=n,this}},{key:"max",value:function(n){return this.__max=n,this}},{key:"step",value:function(n){return this.__step=n,this.__impliedStep=n,this.__precision=c0(n),this}}]),e})(Co);function $T(r,e){var t=Math.pow(10,e);return Math.round(r*t)/t}var Cu=(function(r){Bs(e,r);function e(t,n,i){dr(this,e);var s=zs(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n,i));s.__truncationSuspended=!1;var o=s,a=void 0;function l(){var _=parseFloat(o.__input.value);fe.isNaN(_)||o.setValue(_)}function c(){o.__onFinishChange&&o.__onFinishChange.call(o,o.getValue())}function u(){c()}function d(_){var g=a-_.clientY;o.setValue(o.getValue()+g*o.__impliedStep),a=_.clientY}function f(){ie.unbind(window,"mousemove",d),ie.unbind(window,"mouseup",f),c()}function h(_){ie.bind(window,"mousemove",d),ie.bind(window,"mouseup",f),a=_.clientY}return s.__input=document.createElement("input"),s.__input.setAttribute("type","text"),ie.bind(s.__input,"change",l),ie.bind(s.__input,"blur",u),ie.bind(s.__input,"mousedown",h),ie.bind(s.__input,"keydown",function(_){_.keyCode===13&&(o.__truncationSuspended=!0,this.blur(),o.__truncationSuspended=!1,c())}),s.updateDisplay(),s.domElement.appendChild(s.__input),s}return fr(e,[{key:"updateDisplay",value:function(){return this.__input.value=this.__truncationSuspended?this.getValue():$T(this.getValue(),this.__precision),Os(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"updateDisplay",this).call(this)}}]),e})(y_);function u0(r,e,t,n,i){return n+(i-n)*((r-e)/(t-e))}var ih=(function(r){Bs(e,r);function e(t,n,i,s,o){dr(this,e);var a=zs(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n,{min:i,max:s,step:o})),l=a;a.__background=document.createElement("div"),a.__foreground=document.createElement("div"),ie.bind(a.__background,"mousedown",c),ie.bind(a.__background,"touchstart",f),ie.addClass(a.__background,"slider"),ie.addClass(a.__foreground,"slider-fg");function c(g){document.activeElement.blur(),ie.bind(window,"mousemove",u),ie.bind(window,"mouseup",d),u(g)}function u(g){g.preventDefault();var m=l.__background.getBoundingClientRect();return l.setValue(u0(g.clientX,m.left,m.right,l.__min,l.__max)),!1}function d(){ie.unbind(window,"mousemove",u),ie.unbind(window,"mouseup",d),l.__onFinishChange&&l.__onFinishChange.call(l,l.getValue())}function f(g){g.touches.length===1&&(ie.bind(window,"touchmove",h),ie.bind(window,"touchend",_),h(g))}function h(g){var m=g.touches[0].clientX,p=l.__background.getBoundingClientRect();l.setValue(u0(m,p.left,p.right,l.__min,l.__max))}function _(){ie.unbind(window,"touchmove",h),ie.unbind(window,"touchend",_),l.__onFinishChange&&l.__onFinishChange.call(l,l.getValue())}return a.updateDisplay(),a.__background.appendChild(a.__foreground),a.domElement.appendChild(a.__background),a}return fr(e,[{key:"updateDisplay",value:function(){var n=(this.getValue()-this.__min)/(this.__max-this.__min);return this.__foreground.style.width=n*100+"%",Os(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"updateDisplay",this).call(this)}}]),e})(y_),b_=(function(r){Bs(e,r);function e(t,n,i){dr(this,e);var s=zs(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n)),o=s;return s.__button=document.createElement("div"),s.__button.innerHTML=i===void 0?"Fire":i,ie.bind(s.__button,"click",function(a){return a.preventDefault(),o.fire(),!1}),ie.addClass(s.__button,"button"),s.domElement.appendChild(s.__button),s}return fr(e,[{key:"fire",value:function(){this.__onChange&&this.__onChange.call(this),this.getValue().call(this.object),this.__onFinishChange&&this.__onFinishChange.call(this,this.getValue())}}]),e})(Co),rh=(function(r){Bs(e,r);function e(t,n){dr(this,e);var i=zs(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n));i.__color=new kn(i.getValue()),i.__temp=new kn(0);var s=i;i.domElement=document.createElement("div"),ie.makeSelectable(i.domElement,!1),i.__selector=document.createElement("div"),i.__selector.className="selector",i.__saturation_field=document.createElement("div"),i.__saturation_field.className="saturation-field",i.__field_knob=document.createElement("div"),i.__field_knob.className="field-knob",i.__field_knob_border="2px solid ",i.__hue_knob=document.createElement("div"),i.__hue_knob.className="hue-knob",i.__hue_field=document.createElement("div"),i.__hue_field.className="hue-field",i.__input=document.createElement("input"),i.__input.type="text",i.__input_textShadow="0 1px 1px ",ie.bind(i.__input,"keydown",function(g){g.keyCode===13&&d.call(this)}),ie.bind(i.__input,"blur",d),ie.bind(i.__selector,"mousedown",function(){ie.addClass(this,"drag").bind(window,"mouseup",function(){ie.removeClass(s.__selector,"drag")})}),ie.bind(i.__selector,"touchstart",function(){ie.addClass(this,"drag").bind(window,"touchend",function(){ie.removeClass(s.__selector,"drag")})});var o=document.createElement("div");fe.extend(i.__selector.style,{width:"122px",height:"102px",padding:"3px",backgroundColor:"#222",boxShadow:"0px 1px 3px rgba(0,0,0,0.3)"}),fe.extend(i.__field_knob.style,{position:"absolute",width:"12px",height:"12px",border:i.__field_knob_border+(i.__color.v<.5?"#fff":"#000"),boxShadow:"0px 1px 3px rgba(0,0,0,0.5)",borderRadius:"12px",zIndex:1}),fe.extend(i.__hue_knob.style,{position:"absolute",width:"15px",height:"2px",borderRight:"4px solid #fff",zIndex:1}),fe.extend(i.__saturation_field.style,{width:"100px",height:"100px",border:"1px solid #555",marginRight:"3px",display:"inline-block",cursor:"pointer"}),fe.extend(o.style,{width:"100%",height:"100%",background:"none"}),d0(o,"top","rgba(0,0,0,0)","#000"),fe.extend(i.__hue_field.style,{width:"15px",height:"100px",border:"1px solid #555",cursor:"ns-resize",position:"absolute",top:"3px",right:"3px"}),KT(i.__hue_field),fe.extend(i.__input.style,{outline:"none",textAlign:"center",color:"#fff",border:0,fontWeight:"bold",textShadow:i.__input_textShadow+"rgba(0,0,0,0.7)"}),ie.bind(i.__saturation_field,"mousedown",a),ie.bind(i.__saturation_field,"touchstart",a),ie.bind(i.__field_knob,"mousedown",a),ie.bind(i.__field_knob,"touchstart",a),ie.bind(i.__hue_field,"mousedown",l),ie.bind(i.__hue_field,"touchstart",l);function a(g){h(g),ie.bind(window,"mousemove",h),ie.bind(window,"touchmove",h),ie.bind(window,"mouseup",c),ie.bind(window,"touchend",c)}function l(g){_(g),ie.bind(window,"mousemove",_),ie.bind(window,"touchmove",_),ie.bind(window,"mouseup",u),ie.bind(window,"touchend",u)}function c(){ie.unbind(window,"mousemove",h),ie.unbind(window,"touchmove",h),ie.unbind(window,"mouseup",c),ie.unbind(window,"touchend",c),f()}function u(){ie.unbind(window,"mousemove",_),ie.unbind(window,"touchmove",_),ie.unbind(window,"mouseup",u),ie.unbind(window,"touchend",u),f()}function d(){var g=nh(this.value);g!==!1?(s.__color.__state=g,s.setValue(s.__color.toOriginal())):this.value=s.__color.toString()}function f(){s.__onFinishChange&&s.__onFinishChange.call(s,s.__color.toOriginal())}i.__saturation_field.appendChild(o),i.__selector.appendChild(i.__field_knob),i.__selector.appendChild(i.__saturation_field),i.__selector.appendChild(i.__hue_field),i.__hue_field.appendChild(i.__hue_knob),i.domElement.appendChild(i.__input),i.domElement.appendChild(i.__selector),i.updateDisplay();function h(g){g.type.indexOf("touch")===-1&&g.preventDefault();var m=s.__saturation_field.getBoundingClientRect(),p=g.touches&&g.touches[0]||g,b=p.clientX,x=p.clientY,v=(b-m.left)/(m.right-m.left),T=1-(x-m.top)/(m.bottom-m.top);return T>1?T=1:T<0&&(T=0),v>1?v=1:v<0&&(v=0),s.__color.v=T,s.__color.s=v,s.setValue(s.__color.toOriginal()),!1}function _(g){g.type.indexOf("touch")===-1&&g.preventDefault();var m=s.__hue_field.getBoundingClientRect(),p=g.touches&&g.touches[0]||g,b=p.clientY,x=1-(b-m.top)/(m.bottom-m.top);return x>1?x=1:x<0&&(x=0),s.__color.h=x*360,s.setValue(s.__color.toOriginal()),!1}return i}return fr(e,[{key:"updateDisplay",value:function(){var n=nh(this.getValue());if(n!==!1){var i=!1;fe.each(kn.COMPONENTS,function(a){if(!fe.isUndefined(n[a])&&!fe.isUndefined(this.__color.__state[a])&&n[a]!==this.__color.__state[a])return i=!0,{}},this),i&&fe.extend(this.__color.__state,n)}fe.extend(this.__temp.__state,this.__color.__state),this.__temp.a=1;var s=this.__color.v<.5||this.__color.s>.5?255:0,o=255-s;fe.extend(this.__field_knob.style,{marginLeft:100*this.__color.s-7+"px",marginTop:100*(1-this.__color.v)-7+"px",backgroundColor:this.__temp.toHexString(),border:this.__field_knob_border+"rgb("+s+","+s+","+s+")"}),this.__hue_knob.style.marginTop=(1-this.__color.h/360)*100+"px",this.__temp.s=1,this.__temp.v=1,d0(this.__saturation_field,"left","#fff",this.__temp.toHexString()),this.__input.value=this.__color.toString(),fe.extend(this.__input.style,{backgroundColor:this.__color.toHexString(),color:"rgb("+s+","+s+","+s+")",textShadow:this.__input_textShadow+"rgba("+o+","+o+","+o+",.7)"})}}]),e})(Co),jT=["-moz-","-o-","-webkit-","-ms-",""];function d0(r,e,t,n){r.style.background="",fe.each(jT,function(i){r.style.cssText+="background: "+i+"linear-gradient("+e+", "+t+" 0%, "+n+" 100%); "})}function KT(r){r.style.background="",r.style.cssText+="background: -moz-linear-gradient(top,  #ff0000 0%, #ff00ff 17%, #0000ff 34%, #00ffff 50%, #00ff00 67%, #ffff00 84%, #ff0000 100%);",r.style.cssText+="background: -webkit-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);",r.style.cssText+="background: -o-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);",r.style.cssText+="background: -ms-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);",r.style.cssText+="background: linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);"}var ZT={load:function(e,t){var n=t||document,i=n.createElement("link");i.type="text/css",i.rel="stylesheet",i.href=e,n.getElementsByTagName("head")[0].appendChild(i)},inject:function(e,t){var n=t||document,i=document.createElement("style");i.type="text/css",i.innerHTML=e;var s=n.getElementsByTagName("head")[0];try{s.appendChild(i)}catch{}}},JT=`<div id="dg-save" class="dg dialogue">

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

</div>`,QT=function(e,t){var n=e[t];return fe.isArray(arguments[2])||fe.isObject(arguments[2])?new qT(e,t,arguments[2]):fe.isNumber(n)?fe.isNumber(arguments[2])&&fe.isNumber(arguments[3])?fe.isNumber(arguments[4])?new ih(e,t,arguments[2],arguments[3],arguments[4]):new ih(e,t,arguments[2],arguments[3]):fe.isNumber(arguments[4])?new Cu(e,t,{min:arguments[2],max:arguments[3],step:arguments[4]}):new Cu(e,t,{min:arguments[2],max:arguments[3]}):fe.isString(n)?new YT(e,t):fe.isFunction(n)?new b_(e,t,""):fe.isBoolean(n)?new v_(e,t):null};function eE(r){setTimeout(r,1e3/60)}var tE=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||eE,nE=(function(){function r(){dr(this,r),this.backgroundElement=document.createElement("div"),fe.extend(this.backgroundElement.style,{backgroundColor:"rgba(0,0,0,0.8)",top:0,left:0,display:"none",zIndex:"1000",opacity:0,WebkitTransition:"opacity 0.2s linear",transition:"opacity 0.2s linear"}),ie.makeFullscreen(this.backgroundElement),this.backgroundElement.style.position="fixed",this.domElement=document.createElement("div"),fe.extend(this.domElement.style,{position:"fixed",display:"none",zIndex:"1001",opacity:0,WebkitTransition:"-webkit-transform 0.2s ease-out, opacity 0.2s linear",transition:"transform 0.2s ease-out, opacity 0.2s linear"}),document.body.appendChild(this.backgroundElement),document.body.appendChild(this.domElement);var e=this;ie.bind(this.backgroundElement,"click",function(){e.hide()})}return fr(r,[{key:"show",value:function(){var t=this;this.backgroundElement.style.display="block",this.domElement.style.display="block",this.domElement.style.opacity=0,this.domElement.style.webkitTransform="scale(1.1)",this.layout(),fe.defer(function(){t.backgroundElement.style.opacity=1,t.domElement.style.opacity=1,t.domElement.style.webkitTransform="scale(1)"})}},{key:"hide",value:function(){var t=this,n=function i(){t.domElement.style.display="none",t.backgroundElement.style.display="none",ie.unbind(t.domElement,"webkitTransitionEnd",i),ie.unbind(t.domElement,"transitionend",i),ie.unbind(t.domElement,"oTransitionEnd",i)};ie.bind(this.domElement,"webkitTransitionEnd",n),ie.bind(this.domElement,"transitionend",n),ie.bind(this.domElement,"oTransitionEnd",n),this.backgroundElement.style.opacity=0,this.domElement.style.opacity=0,this.domElement.style.webkitTransform="scale(1.1)"}},{key:"layout",value:function(){this.domElement.style.left=window.innerWidth/2-ie.getWidth(this.domElement)/2+"px",this.domElement.style.top=window.innerHeight/2-ie.getHeight(this.domElement)/2+"px"}}]),r})(),iE=VT(`.dg ul{list-style:none;margin:0;padding:0;width:100%;clear:both}.dg.ac{position:fixed;top:0;left:0;right:0;height:0;z-index:0}.dg:not(.ac) .main{overflow:hidden}.dg.main{-webkit-transition:opacity .1s linear;-o-transition:opacity .1s linear;-moz-transition:opacity .1s linear;transition:opacity .1s linear}.dg.main.taller-than-window{overflow-y:auto}.dg.main.taller-than-window .close-button{opacity:1;margin-top:-1px;border-top:1px solid #2c2c2c}.dg.main ul.closed .close-button{opacity:1 !important}.dg.main:hover .close-button,.dg.main .close-button.drag{opacity:1}.dg.main .close-button{-webkit-transition:opacity .1s linear;-o-transition:opacity .1s linear;-moz-transition:opacity .1s linear;transition:opacity .1s linear;border:0;line-height:19px;height:20px;cursor:pointer;text-align:center;background-color:#000}.dg.main .close-button.close-top{position:relative}.dg.main .close-button.close-bottom{position:absolute}.dg.main .close-button:hover{background-color:#111}.dg.a{float:right;margin-right:15px;overflow-y:visible}.dg.a.has-save>ul.close-top{margin-top:0}.dg.a.has-save>ul.close-bottom{margin-top:27px}.dg.a.has-save>ul.closed{margin-top:0}.dg.a .save-row{top:0;z-index:1002}.dg.a .save-row.close-top{position:relative}.dg.a .save-row.close-bottom{position:fixed}.dg li{-webkit-transition:height .1s ease-out;-o-transition:height .1s ease-out;-moz-transition:height .1s ease-out;transition:height .1s ease-out;-webkit-transition:overflow .1s linear;-o-transition:overflow .1s linear;-moz-transition:overflow .1s linear;transition:overflow .1s linear}.dg li:not(.folder){cursor:auto;height:27px;line-height:27px;padding:0 4px 0 5px}.dg li.folder{padding:0;border-left:4px solid rgba(0,0,0,0)}.dg li.title{cursor:pointer;margin-left:-4px}.dg .closed li:not(.title),.dg .closed ul li,.dg .closed ul li>*{height:0;overflow:hidden;border:0}.dg .cr{clear:both;padding-left:3px;height:27px;overflow:hidden}.dg .property-name{cursor:default;float:left;clear:left;width:40%;overflow:hidden;text-overflow:ellipsis}.dg .cr.function .property-name{width:100%}.dg .c{float:left;width:60%;position:relative}.dg .c input[type=text]{border:0;margin-top:4px;padding:3px;width:100%;float:right}.dg .has-slider input[type=text]{width:30%;margin-left:0}.dg .slider{float:left;width:66%;margin-left:-5px;margin-right:0;height:19px;margin-top:4px}.dg .slider-fg{height:100%}.dg .c input[type=checkbox]{margin-top:7px}.dg .c select{margin-top:5px}.dg .cr.function,.dg .cr.function .property-name,.dg .cr.function *,.dg .cr.boolean,.dg .cr.boolean *{cursor:pointer}.dg .cr.color{overflow:visible}.dg .selector{display:none;position:absolute;margin-left:-9px;margin-top:23px;z-index:10}.dg .c:hover .selector,.dg .selector.drag{display:block}.dg li.save-row{padding:0}.dg li.save-row .button{display:inline-block;padding:0px 6px}.dg.dialogue{background-color:#222;width:460px;padding:15px;font-size:13px;line-height:15px}#dg-new-constructor{padding:10px;color:#222;font-family:Monaco, monospace;font-size:10px;border:0;resize:none;box-shadow:inset 1px 1px 1px #888;word-wrap:break-word;margin:12px 0;display:block;width:440px;overflow-y:scroll;height:100px;position:relative}#dg-local-explain{display:none;font-size:11px;line-height:17px;border-radius:3px;background-color:#333;padding:8px;margin-top:10px}#dg-local-explain code{font-size:10px}#dat-gui-save-locally{display:none}.dg{color:#eee;font:11px 'Lucida Grande', sans-serif;text-shadow:0 -1px 0 #111}.dg.main::-webkit-scrollbar{width:5px;background:#1a1a1a}.dg.main::-webkit-scrollbar-corner{height:0;display:none}.dg.main::-webkit-scrollbar-thumb{border-radius:5px;background:#676767}.dg li:not(.folder){background:#1a1a1a;border-bottom:1px solid #2c2c2c}.dg li.save-row{line-height:25px;background:#dad5cb;border:0}.dg li.save-row select{margin-left:5px;width:108px}.dg li.save-row .button{margin-left:5px;margin-top:1px;border-radius:2px;font-size:9px;line-height:7px;padding:4px 4px 5px 4px;background:#c5bdad;color:#fff;text-shadow:0 1px 0 #b0a58f;box-shadow:0 -1px 0 #b0a58f;cursor:pointer}.dg li.save-row .button.gears{background:#c5bdad url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAANCAYAAAB/9ZQ7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAQJJREFUeNpiYKAU/P//PwGIC/ApCABiBSAW+I8AClAcgKxQ4T9hoMAEUrxx2QSGN6+egDX+/vWT4e7N82AMYoPAx/evwWoYoSYbACX2s7KxCxzcsezDh3evFoDEBYTEEqycggWAzA9AuUSQQgeYPa9fPv6/YWm/Acx5IPb7ty/fw+QZblw67vDs8R0YHyQhgObx+yAJkBqmG5dPPDh1aPOGR/eugW0G4vlIoTIfyFcA+QekhhHJhPdQxbiAIguMBTQZrPD7108M6roWYDFQiIAAv6Aow/1bFwXgis+f2LUAynwoIaNcz8XNx3Dl7MEJUDGQpx9gtQ8YCueB+D26OECAAQDadt7e46D42QAAAABJRU5ErkJggg==) 2px 1px no-repeat;height:7px;width:8px}.dg li.save-row .button:hover{background-color:#bab19e;box-shadow:0 -1px 0 #b0a58f}.dg li.folder{border-bottom:0}.dg li.title{padding-left:16px;background:#000 url(data:image/gif;base64,R0lGODlhBQAFAJEAAP////Pz8////////yH5BAEAAAIALAAAAAAFAAUAAAIIlI+hKgFxoCgAOw==) 6px 10px no-repeat;cursor:pointer;border-bottom:1px solid rgba(255,255,255,0.2)}.dg .closed li.title{background-image:url(data:image/gif;base64,R0lGODlhBQAFAJEAAP////Pz8////////yH5BAEAAAIALAAAAAAFAAUAAAIIlGIWqMCbWAEAOw==)}.dg .cr.boolean{border-left:3px solid #806787}.dg .cr.color{border-left:3px solid}.dg .cr.function{border-left:3px solid #e61d5f}.dg .cr.number{border-left:3px solid #2FA1D6}.dg .cr.number input[type=text]{color:#2FA1D6}.dg .cr.string{border-left:3px solid #1ed36f}.dg .cr.string input[type=text]{color:#1ed36f}.dg .cr.function:hover,.dg .cr.boolean:hover{background:#111}.dg .c input[type=text]{background:#303030;outline:none}.dg .c input[type=text]:hover{background:#3c3c3c}.dg .c input[type=text]:focus{background:#494949;color:#fff}.dg .c .slider{background:#303030;cursor:ew-resize}.dg .c .slider-fg{background:#2FA1D6;max-width:100%}.dg .c .slider:hover{background:#3c3c3c}.dg .c .slider:hover .slider-fg{background:#44abda}
`);ZT.inject(iE);var f0="dg",h0=72,p0=20,Yl="Default",cl=(function(){try{return!!window.localStorage}catch{return!1}})(),Sl=void 0,m0=!0,ea=void 0,Bd=!1,w_=[],on=function r(e){var t=this,n=e||{};this.domElement=document.createElement("div"),this.__ul=document.createElement("ul"),this.domElement.appendChild(this.__ul),ie.addClass(this.domElement,f0),this.__folders={},this.__controllers=[],this.__rememberedObjects=[],this.__rememberedObjectIndecesToControllers=[],this.__listening=[],n=fe.defaults(n,{closeOnTop:!1,autoPlace:!0,width:r.DEFAULT_WIDTH}),n=fe.defaults(n,{resizable:n.autoPlace,hideable:n.autoPlace}),fe.isUndefined(n.load)?n.load={preset:Yl}:n.preset&&(n.load.preset=n.preset),fe.isUndefined(n.parent)&&n.hideable&&w_.push(this),n.resizable=fe.isUndefined(n.parent)&&n.resizable,n.autoPlace&&fe.isUndefined(n.scrollable)&&(n.scrollable=!0);var i=cl&&localStorage.getItem(ta(this,"isLocal"))==="true",s=void 0,o=void 0;if(Object.defineProperties(this,{parent:{get:function(){return n.parent}},scrollable:{get:function(){return n.scrollable}},autoPlace:{get:function(){return n.autoPlace}},closeOnTop:{get:function(){return n.closeOnTop}},preset:{get:function(){return t.parent?t.getRoot().preset:n.load.preset},set:function(f){t.parent?t.getRoot().preset=f:n.load.preset=f,aE(this),t.revert()}},width:{get:function(){return n.width},set:function(f){n.width=f,ah(t,f)}},name:{get:function(){return n.name},set:function(f){n.name=f,o&&(o.innerHTML=n.name)}},closed:{get:function(){return n.closed},set:function(f){n.closed=f,n.closed?ie.addClass(t.__ul,r.CLASS_CLOSED):ie.removeClass(t.__ul,r.CLASS_CLOSED),this.onResize(),t.__closeButton&&(t.__closeButton.innerHTML=f?r.TEXT_OPEN:r.TEXT_CLOSED)}},load:{get:function(){return n.load}},useLocalStorage:{get:function(){return i},set:function(f){cl&&(i=f,f?ie.bind(window,"unload",s):ie.unbind(window,"unload",s),localStorage.setItem(ta(t,"isLocal"),f))}}}),fe.isUndefined(n.parent)){if(this.closed=n.closed||!1,ie.addClass(this.domElement,r.CLASS_MAIN),ie.makeSelectable(this.domElement,!1),cl&&i){t.useLocalStorage=!0;var a=localStorage.getItem(ta(this,"gui"));a&&(n.load=JSON.parse(a))}this.__closeButton=document.createElement("div"),this.__closeButton.innerHTML=r.TEXT_CLOSED,ie.addClass(this.__closeButton,r.CLASS_CLOSE_BUTTON),n.closeOnTop?(ie.addClass(this.__closeButton,r.CLASS_CLOSE_TOP),this.domElement.insertBefore(this.__closeButton,this.domElement.childNodes[0])):(ie.addClass(this.__closeButton,r.CLASS_CLOSE_BOTTOM),this.domElement.appendChild(this.__closeButton)),ie.bind(this.__closeButton,"click",function(){t.closed=!t.closed})}else{n.closed===void 0&&(n.closed=!0);var l=document.createTextNode(n.name);ie.addClass(l,"controller-name"),o=fp(t,l);var c=function(f){return f.preventDefault(),t.closed=!t.closed,!1};ie.addClass(this.__ul,r.CLASS_CLOSED),ie.addClass(o,"title"),ie.bind(o,"click",c),n.closed||(this.closed=!1)}n.autoPlace&&(fe.isUndefined(n.parent)&&(m0&&(ea=document.createElement("div"),ie.addClass(ea,f0),ie.addClass(ea,r.CLASS_AUTO_PLACE_CONTAINER),document.body.appendChild(ea),m0=!1),ea.appendChild(this.domElement),ie.addClass(this.domElement,r.CLASS_AUTO_PLACE)),this.parent||ah(t,n.width)),this.__resizeHandler=function(){t.onResizeDebounced()},ie.bind(window,"resize",this.__resizeHandler),ie.bind(this.__ul,"webkitTransitionEnd",this.__resizeHandler),ie.bind(this.__ul,"transitionend",this.__resizeHandler),ie.bind(this.__ul,"oTransitionEnd",this.__resizeHandler),this.onResize(),n.resizable&&oE(this),s=function(){cl&&localStorage.getItem(ta(t,"isLocal"))==="true"&&localStorage.setItem(ta(t,"gui"),JSON.stringify(t.getSaveObject()))},this.saveToLocalStorageIfPossible=s;function u(){var d=t.getRoot();d.width+=1,fe.defer(function(){d.width-=1})}n.parent||u()};on.toggleHide=function(){Bd=!Bd,fe.each(w_,function(r){r.domElement.style.display=Bd?"none":""})};on.CLASS_AUTO_PLACE="a";on.CLASS_AUTO_PLACE_CONTAINER="ac";on.CLASS_MAIN="main";on.CLASS_CONTROLLER_ROW="cr";on.CLASS_TOO_TALL="taller-than-window";on.CLASS_CLOSED="closed";on.CLASS_CLOSE_BUTTON="close-button";on.CLASS_CLOSE_TOP="close-top";on.CLASS_CLOSE_BOTTOM="close-bottom";on.CLASS_DRAG="drag";on.DEFAULT_WIDTH=245;on.TEXT_CLOSED="Close Controls";on.TEXT_OPEN="Open Controls";on._keydownHandler=function(r){document.activeElement.type!=="text"&&(r.which===h0||r.keyCode===h0)&&on.toggleHide()};ie.bind(window,"keydown",on._keydownHandler,!1);fe.extend(on.prototype,{add:function(e,t){return Ml(this,e,t,{factoryArgs:Array.prototype.slice.call(arguments,2)})},addColor:function(e,t){return Ml(this,e,t,{color:!0})},remove:function(e){this.__ul.removeChild(e.__li),this.__controllers.splice(this.__controllers.indexOf(e),1);var t=this;fe.defer(function(){t.onResize()})},destroy:function(){if(this.parent)throw new Error("Only the root GUI should be removed with .destroy(). For subfolders, use gui.removeFolder(folder) instead.");this.autoPlace&&ea.removeChild(this.domElement);var e=this;fe.each(this.__folders,function(t){e.removeFolder(t)}),ie.unbind(window,"keydown",on._keydownHandler,!1),g0(this)},addFolder:function(e){if(this.__folders[e]!==void 0)throw new Error('You already have a folder in this GUI by the name "'+e+'"');var t={name:e,parent:this};t.autoPlace=this.autoPlace,this.load&&this.load.folders&&this.load.folders[e]&&(t.closed=this.load.folders[e].closed,t.load=this.load.folders[e]);var n=new on(t);this.__folders[e]=n;var i=fp(this,n.domElement);return ie.addClass(i,"folder"),n},removeFolder:function(e){this.__ul.removeChild(e.domElement.parentElement),delete this.__folders[e.name],this.load&&this.load.folders&&this.load.folders[e.name]&&delete this.load.folders[e.name],g0(e);var t=this;fe.each(e.__folders,function(n){e.removeFolder(n)}),fe.defer(function(){t.onResize()})},open:function(){this.closed=!1},close:function(){this.closed=!0},hide:function(){this.domElement.style.display="none"},show:function(){this.domElement.style.display=""},onResize:function(){var e=this.getRoot();if(e.scrollable){var t=ie.getOffset(e.__ul).top,n=0;fe.each(e.__ul.childNodes,function(i){e.autoPlace&&i===e.__save_row||(n+=ie.getHeight(i))}),window.innerHeight-t-p0<n?(ie.addClass(e.domElement,on.CLASS_TOO_TALL),e.__ul.style.height=window.innerHeight-t-p0+"px"):(ie.removeClass(e.domElement,on.CLASS_TOO_TALL),e.__ul.style.height="auto")}e.__resize_handle&&fe.defer(function(){e.__resize_handle.style.height=e.__ul.offsetHeight+"px"}),e.__closeButton&&(e.__closeButton.style.width=e.width+"px")},onResizeDebounced:fe.debounce(function(){this.onResize()},50),remember:function(){if(fe.isUndefined(Sl)&&(Sl=new nE,Sl.domElement.innerHTML=JT),this.parent)throw new Error("You can only call remember on a top level GUI.");var e=this;fe.each(Array.prototype.slice.call(arguments),function(t){e.__rememberedObjects.length===0&&sE(e),e.__rememberedObjects.indexOf(t)===-1&&e.__rememberedObjects.push(t)}),this.autoPlace&&ah(this,this.width)},getRoot:function(){for(var e=this;e.parent;)e=e.parent;return e},getSaveObject:function(){var e=this.load;return e.closed=this.closed,this.__rememberedObjects.length>0&&(e.preset=this.preset,e.remembered||(e.remembered={}),e.remembered[this.preset]=Uc(this)),e.folders={},fe.each(this.__folders,function(t,n){e.folders[n]=t.getSaveObject()}),e},save:function(){this.load.remembered||(this.load.remembered={}),this.load.remembered[this.preset]=Uc(this),sh(this,!1),this.saveToLocalStorageIfPossible()},saveAs:function(e){this.load.remembered||(this.load.remembered={},this.load.remembered[Yl]=Uc(this,!0)),this.load.remembered[e]=Uc(this),this.preset=e,oh(this,e,!0),this.saveToLocalStorageIfPossible()},revert:function(e){fe.each(this.__controllers,function(t){this.getRoot().load.remembered?S_(e||this.getRoot(),t):t.setValue(t.initialValue),t.__onFinishChange&&t.__onFinishChange.call(t,t.getValue())},this),fe.each(this.__folders,function(t){t.revert(t)}),e||sh(this.getRoot(),!1)},listen:function(e){var t=this.__listening.length===0;this.__listening.push(e),t&&M_(this.__listening)},updateDisplay:function(){fe.each(this.__controllers,function(e){e.updateDisplay()}),fe.each(this.__folders,function(e){e.updateDisplay()})}});function fp(r,e,t){var n=document.createElement("li");return e&&n.appendChild(e),t?r.__ul.insertBefore(n,t):r.__ul.appendChild(n),r.onResize(),n}function g0(r){ie.unbind(window,"resize",r.__resizeHandler),r.saveToLocalStorageIfPossible&&ie.unbind(window,"unload",r.saveToLocalStorageIfPossible)}function sh(r,e){var t=r.__preset_select[r.__preset_select.selectedIndex];e?t.innerHTML=t.value+"*":t.innerHTML=t.value}function rE(r,e,t){if(t.__li=e,t.__gui=r,fe.extend(t,{options:function(o){if(arguments.length>1){var a=t.__li.nextElementSibling;return t.remove(),Ml(r,t.object,t.property,{before:a,factoryArgs:[fe.toArray(arguments)]})}if(fe.isArray(o)||fe.isObject(o)){var l=t.__li.nextElementSibling;return t.remove(),Ml(r,t.object,t.property,{before:l,factoryArgs:[o]})}},name:function(o){return t.__li.firstElementChild.firstElementChild.innerHTML=o,t},listen:function(){return t.__gui.listen(t),t},remove:function(){return t.__gui.remove(t),t}}),t instanceof ih){var n=new Cu(t.object,t.property,{min:t.__min,max:t.__max,step:t.__step});fe.each(["updateDisplay","onChange","onFinishChange","step","min","max"],function(s){var o=t[s],a=n[s];t[s]=n[s]=function(){var l=Array.prototype.slice.call(arguments);return a.apply(n,l),o.apply(t,l)}}),ie.addClass(e,"has-slider"),t.domElement.insertBefore(n.domElement,t.domElement.firstElementChild)}else if(t instanceof Cu){var i=function(o){if(fe.isNumber(t.__min)&&fe.isNumber(t.__max)){var a=t.__li.firstElementChild.firstElementChild.innerHTML,l=t.__gui.__listening.indexOf(t)>-1;t.remove();var c=Ml(r,t.object,t.property,{before:t.__li.nextElementSibling,factoryArgs:[t.__min,t.__max,t.__step]});return c.name(a),l&&c.listen(),c}return o};t.min=fe.compose(i,t.min),t.max=fe.compose(i,t.max)}else t instanceof v_?(ie.bind(e,"click",function(){ie.fakeEvent(t.__checkbox,"click")}),ie.bind(t.__checkbox,"click",function(s){s.stopPropagation()})):t instanceof b_?(ie.bind(e,"click",function(){ie.fakeEvent(t.__button,"click")}),ie.bind(e,"mouseover",function(){ie.addClass(t.__button,"hover")}),ie.bind(e,"mouseout",function(){ie.removeClass(t.__button,"hover")})):t instanceof rh&&(ie.addClass(e,"color"),t.updateDisplay=fe.compose(function(s){return e.style.borderLeftColor=t.__color.toString(),s},t.updateDisplay),t.updateDisplay());t.setValue=fe.compose(function(s){return r.getRoot().__preset_select&&t.isModified()&&sh(r.getRoot(),!0),s},t.setValue)}function S_(r,e){var t=r.getRoot(),n=t.__rememberedObjects.indexOf(e.object);if(n!==-1){var i=t.__rememberedObjectIndecesToControllers[n];if(i===void 0&&(i={},t.__rememberedObjectIndecesToControllers[n]=i),i[e.property]=e,t.load&&t.load.remembered){var s=t.load.remembered,o=void 0;if(s[r.preset])o=s[r.preset];else if(s[Yl])o=s[Yl];else return;if(o[n]&&o[n][e.property]!==void 0){var a=o[n][e.property];e.initialValue=a,e.setValue(a)}}}}function Ml(r,e,t,n){if(e[t]===void 0)throw new Error('Object "'+e+'" has no property "'+t+'"');var i=void 0;if(n.color)i=new rh(e,t);else{var s=[e,t].concat(n.factoryArgs);i=QT.apply(r,s)}n.before instanceof Co&&(n.before=n.before.__li),S_(r,i),ie.addClass(i.domElement,"c");var o=document.createElement("span");ie.addClass(o,"property-name"),o.innerHTML=i.property;var a=document.createElement("div");a.appendChild(o),a.appendChild(i.domElement);var l=fp(r,a,n.before);return ie.addClass(l,on.CLASS_CONTROLLER_ROW),i instanceof rh?ie.addClass(l,"color"):ie.addClass(l,GT(i.getValue())),rE(r,l,i),r.__controllers.push(i),i}function ta(r,e){return document.location.href+"."+e}function oh(r,e,t){var n=document.createElement("option");n.innerHTML=e,n.value=e,r.__preset_select.appendChild(n),t&&(r.__preset_select.selectedIndex=r.__preset_select.length-1)}function _0(r,e){e.style.display=r.useLocalStorage?"block":"none"}function sE(r){var e=r.__save_row=document.createElement("li");ie.addClass(r.domElement,"has-save"),r.__ul.insertBefore(e,r.__ul.firstChild),ie.addClass(e,"save-row");var t=document.createElement("span");t.innerHTML="&nbsp;",ie.addClass(t,"button gears");var n=document.createElement("span");n.innerHTML="Save",ie.addClass(n,"button"),ie.addClass(n,"save");var i=document.createElement("span");i.innerHTML="New",ie.addClass(i,"button"),ie.addClass(i,"save-as");var s=document.createElement("span");s.innerHTML="Revert",ie.addClass(s,"button"),ie.addClass(s,"revert");var o=r.__preset_select=document.createElement("select");if(r.load&&r.load.remembered?fe.each(r.load.remembered,function(d,f){oh(r,f,f===r.preset)}):oh(r,Yl,!1),ie.bind(o,"change",function(){for(var d=0;d<r.__preset_select.length;d++)r.__preset_select[d].innerHTML=r.__preset_select[d].value;r.preset=this.value}),e.appendChild(o),e.appendChild(t),e.appendChild(n),e.appendChild(i),e.appendChild(s),cl){var a=document.getElementById("dg-local-explain"),l=document.getElementById("dg-local-storage"),c=document.getElementById("dg-save-locally");c.style.display="block",localStorage.getItem(ta(r,"isLocal"))==="true"&&l.setAttribute("checked","checked"),_0(r,a),ie.bind(l,"change",function(){r.useLocalStorage=!r.useLocalStorage,_0(r,a)})}var u=document.getElementById("dg-new-constructor");ie.bind(u,"keydown",function(d){d.metaKey&&(d.which===67||d.keyCode===67)&&Sl.hide()}),ie.bind(t,"click",function(){u.innerHTML=JSON.stringify(r.getSaveObject(),void 0,2),Sl.show(),u.focus(),u.select()}),ie.bind(n,"click",function(){r.save()}),ie.bind(i,"click",function(){var d=prompt("Enter a new preset name.");d&&r.saveAs(d)}),ie.bind(s,"click",function(){r.revert()})}function oE(r){var e=void 0;r.__resize_handle=document.createElement("div"),fe.extend(r.__resize_handle.style,{width:"6px",marginLeft:"-3px",height:"200px",cursor:"ew-resize",position:"absolute"});function t(s){return s.preventDefault(),r.width+=e-s.clientX,r.onResize(),e=s.clientX,!1}function n(){ie.removeClass(r.__closeButton,on.CLASS_DRAG),ie.unbind(window,"mousemove",t),ie.unbind(window,"mouseup",n)}function i(s){return s.preventDefault(),e=s.clientX,ie.addClass(r.__closeButton,on.CLASS_DRAG),ie.bind(window,"mousemove",t),ie.bind(window,"mouseup",n),!1}ie.bind(r.__resize_handle,"mousedown",i),ie.bind(r.__closeButton,"mousedown",i),r.domElement.insertBefore(r.__resize_handle,r.domElement.firstElementChild)}function ah(r,e){r.domElement.style.width=e+"px",r.__save_row&&r.autoPlace&&(r.__save_row.style.width=e+"px"),r.__closeButton&&(r.__closeButton.style.width=e+"px")}function Uc(r,e){var t={};return fe.each(r.__rememberedObjects,function(n,i){var s={},o=r.__rememberedObjectIndecesToControllers[i];fe.each(o,function(a,l){s[l]=e?a.initialValue:a.getValue()}),t[i]=s}),t}function aE(r){for(var e=0;e<r.__preset_select.length;e++)r.__preset_select[e].value===r.preset&&(r.__preset_select.selectedIndex=e)}function M_(r){r.length!==0&&tE.call(window,function(){M_(r)}),fe.each(r,function(e){e.updateDisplay()})}var lE=on;function x0(r,e){if(e===py)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),r;if(e===Kf||e===Gg){let t=r.getIndex();if(t===null){const o=[],a=r.getAttribute("position");if(a!==void 0){for(let l=0;l<a.count;l++)o.push(l);r.setIndex(o),t=r.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),r}const n=t.count-2,i=[];if(e===Kf)for(let o=1;o<=n;o++)i.push(t.getX(0)),i.push(t.getX(o)),i.push(t.getX(o+1));else for(let o=0;o<n;o++)o%2===0?(i.push(t.getX(o)),i.push(t.getX(o+1)),i.push(t.getX(o+2))):(i.push(t.getX(o+2)),i.push(t.getX(o+1)),i.push(t.getX(o)));i.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");const s=r.clone();return s.setIndex(i),s.clearGroups(),s}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),r}class cE extends Ao{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new pE(t)}),this.register(function(t){return new mE(t)}),this.register(function(t){return new ME(t)}),this.register(function(t){return new TE(t)}),this.register(function(t){return new EE(t)}),this.register(function(t){return new _E(t)}),this.register(function(t){return new xE(t)}),this.register(function(t){return new vE(t)}),this.register(function(t){return new yE(t)}),this.register(function(t){return new hE(t)}),this.register(function(t){return new bE(t)}),this.register(function(t){return new gE(t)}),this.register(function(t){return new SE(t)}),this.register(function(t){return new wE(t)}),this.register(function(t){return new dE(t)}),this.register(function(t){return new AE(t)}),this.register(function(t){return new CE(t)})}load(e,t,n,i){const s=this;let o;if(this.resourcePath!=="")o=this.resourcePath;else if(this.path!==""){const c=wl.extractUrlBase(e);o=wl.resolveURL(c,this.path)}else o=wl.extractUrlBase(e);this.manager.itemStart(e);const a=function(c){i?i(c):console.error(c),s.manager.itemError(e),s.manager.itemEnd(e)},l=new Eu(this.manager);l.setPath(this.path),l.setResponseType("arraybuffer"),l.setRequestHeader(this.requestHeader),l.setWithCredentials(this.withCredentials),l.load(e,function(c){try{s.parse(c,o,function(u){t(u),s.manager.itemEnd(e)},a)}catch(u){a(u)}},n,a)}setDRACOLoader(e){return this.dracoLoader=e,this}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,i){let s;const o={},a={},l=new TextDecoder;if(typeof e=="string")s=JSON.parse(e);else if(e instanceof ArrayBuffer)if(l.decode(new Uint8Array(e,0,4))===T_){try{o[Lt.KHR_BINARY_GLTF]=new RE(e)}catch(d){i&&i(d);return}s=JSON.parse(o[Lt.KHR_BINARY_GLTF].content)}else s=JSON.parse(l.decode(e));else s=e;if(s.asset===void 0||s.asset.version[0]<2){i&&i(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}const c=new HE(s,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});c.fileLoader.setRequestHeader(this.requestHeader);for(let u=0;u<this.pluginCallbacks.length;u++){const d=this.pluginCallbacks[u](c);d.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),a[d.name]=d,o[d.name]=!0}if(s.extensionsUsed)for(let u=0;u<s.extensionsUsed.length;++u){const d=s.extensionsUsed[u],f=s.extensionsRequired||[];switch(d){case Lt.KHR_MATERIALS_UNLIT:o[d]=new fE;break;case Lt.KHR_DRACO_MESH_COMPRESSION:o[d]=new PE(s,this.dracoLoader);break;case Lt.KHR_TEXTURE_TRANSFORM:o[d]=new LE;break;case Lt.KHR_MESH_QUANTIZATION:o[d]=new DE;break;default:f.indexOf(d)>=0&&a[d]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+d+'".')}}c.setExtensions(o),c.setPlugins(a),c.parse(n,i)}parseAsync(e,t){const n=this;return new Promise(function(i,s){n.parse(e,t,i,s)})}}function uE(){let r={};return{get:function(e){return r[e]},add:function(e,t){r[e]=t},remove:function(e){delete r[e]},removeAll:function(){r={}}}}const Lt={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"};class dE{constructor(e){this.parser=e,this.name=Lt.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){const e=this.parser,t=this.parser.json.nodes||[];for(let n=0,i=t.length;n<i;n++){const s=t[n];s.extensions&&s.extensions[this.name]&&s.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,s.extensions[this.name].light)}}_loadLight(e){const t=this.parser,n="light:"+e;let i=t.cache.get(n);if(i)return i;const s=t.json,l=((s.extensions&&s.extensions[this.name]||{}).lights||[])[e];let c;const u=new je(16777215);l.color!==void 0&&u.setRGB(l.color[0],l.color[1],l.color[2],Jn);const d=l.range!==void 0?l.range:0;switch(l.type){case"directional":c=new u_(u),c.target.position.set(0,0,-1),c.add(c.target);break;case"point":c=new c_(u),c.distance=d;break;case"spot":c=new zb(u),c.distance=d,l.spot=l.spot||{},l.spot.innerConeAngle=l.spot.innerConeAngle!==void 0?l.spot.innerConeAngle:0,l.spot.outerConeAngle=l.spot.outerConeAngle!==void 0?l.spot.outerConeAngle:Math.PI/4,c.angle=l.spot.outerConeAngle,c.penumbra=1-l.spot.innerConeAngle/l.spot.outerConeAngle,c.target.position.set(0,0,-1),c.add(c.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+l.type)}return c.position.set(0,0,0),gr(c,l),l.intensity!==void 0&&(c.intensity=l.intensity),c.name=t.createUniqueName(l.name||"light_"+e),i=Promise.resolve(c),t.cache.add(n,i),i}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){const t=this,n=this.parser,s=n.json.nodes[e],a=(s.extensions&&s.extensions[this.name]||{}).light;return a===void 0?null:this._loadLight(a).then(function(l){return n._getNodeRef(t.cache,a,l)})}}class fE{constructor(){this.name=Lt.KHR_MATERIALS_UNLIT}getMaterialType(){return oo}extendParams(e,t,n){const i=[];e.color=new je(1,1,1),e.opacity=1;const s=t.pbrMetallicRoughness;if(s){if(Array.isArray(s.baseColorFactor)){const o=s.baseColorFactor;e.color.setRGB(o[0],o[1],o[2],Jn),e.opacity=o[3]}s.baseColorTexture!==void 0&&i.push(n.assignTexture(e,"map",s.baseColorTexture,Tn))}return Promise.all(i)}}class hE{constructor(e){this.parser=e,this.name=Lt.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){const i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=i.extensions[this.name].emissiveStrength;return s!==void 0&&(t.emissiveIntensity=s),Promise.resolve()}}class pE{constructor(e){this.parser=e,this.name=Lt.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:cr}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];if(o.clearcoatFactor!==void 0&&(t.clearcoat=o.clearcoatFactor),o.clearcoatTexture!==void 0&&s.push(n.assignTexture(t,"clearcoatMap",o.clearcoatTexture)),o.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=o.clearcoatRoughnessFactor),o.clearcoatRoughnessTexture!==void 0&&s.push(n.assignTexture(t,"clearcoatRoughnessMap",o.clearcoatRoughnessTexture)),o.clearcoatNormalTexture!==void 0&&(s.push(n.assignTexture(t,"clearcoatNormalMap",o.clearcoatNormalTexture)),o.clearcoatNormalTexture.scale!==void 0)){const a=o.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new Et(a,a)}return Promise.all(s)}}class mE{constructor(e){this.parser=e,this.name=Lt.KHR_MATERIALS_DISPERSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:cr}extendMaterialParams(e,t){const i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=i.extensions[this.name];return t.dispersion=s.dispersion!==void 0?s.dispersion:0,Promise.resolve()}}class gE{constructor(e){this.parser=e,this.name=Lt.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:cr}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];return o.iridescenceFactor!==void 0&&(t.iridescence=o.iridescenceFactor),o.iridescenceTexture!==void 0&&s.push(n.assignTexture(t,"iridescenceMap",o.iridescenceTexture)),o.iridescenceIor!==void 0&&(t.iridescenceIOR=o.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),o.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=o.iridescenceThicknessMinimum),o.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=o.iridescenceThicknessMaximum),o.iridescenceThicknessTexture!==void 0&&s.push(n.assignTexture(t,"iridescenceThicknessMap",o.iridescenceThicknessTexture)),Promise.all(s)}}class _E{constructor(e){this.parser=e,this.name=Lt.KHR_MATERIALS_SHEEN}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:cr}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[];t.sheenColor=new je(0,0,0),t.sheenRoughness=0,t.sheen=1;const o=i.extensions[this.name];if(o.sheenColorFactor!==void 0){const a=o.sheenColorFactor;t.sheenColor.setRGB(a[0],a[1],a[2],Jn)}return o.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=o.sheenRoughnessFactor),o.sheenColorTexture!==void 0&&s.push(n.assignTexture(t,"sheenColorMap",o.sheenColorTexture,Tn)),o.sheenRoughnessTexture!==void 0&&s.push(n.assignTexture(t,"sheenRoughnessMap",o.sheenRoughnessTexture)),Promise.all(s)}}class xE{constructor(e){this.parser=e,this.name=Lt.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:cr}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];return o.transmissionFactor!==void 0&&(t.transmission=o.transmissionFactor),o.transmissionTexture!==void 0&&s.push(n.assignTexture(t,"transmissionMap",o.transmissionTexture)),Promise.all(s)}}class vE{constructor(e){this.parser=e,this.name=Lt.KHR_MATERIALS_VOLUME}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:cr}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];t.thickness=o.thicknessFactor!==void 0?o.thicknessFactor:0,o.thicknessTexture!==void 0&&s.push(n.assignTexture(t,"thicknessMap",o.thicknessTexture)),t.attenuationDistance=o.attenuationDistance||1/0;const a=o.attenuationColor||[1,1,1];return t.attenuationColor=new je().setRGB(a[0],a[1],a[2],Jn),Promise.all(s)}}class yE{constructor(e){this.parser=e,this.name=Lt.KHR_MATERIALS_IOR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:cr}extendMaterialParams(e,t){const i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=i.extensions[this.name];return t.ior=s.ior!==void 0?s.ior:1.5,Promise.resolve()}}class bE{constructor(e){this.parser=e,this.name=Lt.KHR_MATERIALS_SPECULAR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:cr}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];t.specularIntensity=o.specularFactor!==void 0?o.specularFactor:1,o.specularTexture!==void 0&&s.push(n.assignTexture(t,"specularIntensityMap",o.specularTexture));const a=o.specularColorFactor||[1,1,1];return t.specularColor=new je().setRGB(a[0],a[1],a[2],Jn),o.specularColorTexture!==void 0&&s.push(n.assignTexture(t,"specularColorMap",o.specularColorTexture,Tn)),Promise.all(s)}}class wE{constructor(e){this.parser=e,this.name=Lt.EXT_MATERIALS_BUMP}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:cr}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];return t.bumpScale=o.bumpFactor!==void 0?o.bumpFactor:1,o.bumpTexture!==void 0&&s.push(n.assignTexture(t,"bumpMap",o.bumpTexture)),Promise.all(s)}}class SE{constructor(e){this.parser=e,this.name=Lt.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:cr}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];return o.anisotropyStrength!==void 0&&(t.anisotropy=o.anisotropyStrength),o.anisotropyRotation!==void 0&&(t.anisotropyRotation=o.anisotropyRotation),o.anisotropyTexture!==void 0&&s.push(n.assignTexture(t,"anisotropyMap",o.anisotropyTexture)),Promise.all(s)}}class ME{constructor(e){this.parser=e,this.name=Lt.KHR_TEXTURE_BASISU}loadTexture(e){const t=this.parser,n=t.json,i=n.textures[e];if(!i.extensions||!i.extensions[this.name])return null;const s=i.extensions[this.name],o=t.options.ktx2Loader;if(!o){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,s.source,o)}}class TE{constructor(e){this.parser=e,this.name=Lt.EXT_TEXTURE_WEBP}loadTexture(e){const t=this.name,n=this.parser,i=n.json,s=i.textures[e];if(!s.extensions||!s.extensions[t])return null;const o=s.extensions[t],a=i.images[o.source];let l=n.textureLoader;if(a.uri){const c=n.options.manager.getHandler(a.uri);c!==null&&(l=c)}return n.loadTextureImage(e,o.source,l)}}class EE{constructor(e){this.parser=e,this.name=Lt.EXT_TEXTURE_AVIF}loadTexture(e){const t=this.name,n=this.parser,i=n.json,s=i.textures[e];if(!s.extensions||!s.extensions[t])return null;const o=s.extensions[t],a=i.images[o.source];let l=n.textureLoader;if(a.uri){const c=n.options.manager.getHandler(a.uri);c!==null&&(l=c)}return n.loadTextureImage(e,o.source,l)}}class AE{constructor(e){this.name=Lt.EXT_MESHOPT_COMPRESSION,this.parser=e}loadBufferView(e){const t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){const i=n.extensions[this.name],s=this.parser.getDependency("buffer",i.buffer),o=this.parser.options.meshoptDecoder;if(!o||!o.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return s.then(function(a){const l=i.byteOffset||0,c=i.byteLength||0,u=i.count,d=i.byteStride,f=new Uint8Array(a,l,c);return o.decodeGltfBufferAsync?o.decodeGltfBufferAsync(u,d,f,i.mode,i.filter).then(function(h){return h.buffer}):o.ready.then(function(){const h=new ArrayBuffer(u*d);return o.decodeGltfBuffer(new Uint8Array(h),u,d,f,i.mode,i.filter),h})})}else return null}}class CE{constructor(e){this.name=Lt.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){const t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;const i=t.meshes[n.mesh];for(const c of i.primitives)if(c.mode!==Bi.TRIANGLES&&c.mode!==Bi.TRIANGLE_STRIP&&c.mode!==Bi.TRIANGLE_FAN&&c.mode!==void 0)return null;const o=n.extensions[this.name].attributes,a=[],l={};for(const c in o)a.push(this.parser.getDependency("accessor",o[c]).then(u=>(l[c]=u,l[c])));return a.length<1?null:(a.push(this.parser.createNodeMesh(e)),Promise.all(a).then(c=>{const u=c.pop(),d=u.isGroup?u.children:[u],f=c[0].count,h=[];for(const _ of d){const g=new bt,m=new Y,p=new ks,b=new Y(1,1,1),x=new n_(_.geometry,_.material,f);for(let v=0;v<f;v++)l.TRANSLATION&&m.fromBufferAttribute(l.TRANSLATION,v),l.ROTATION&&p.fromBufferAttribute(l.ROTATION,v),l.SCALE&&b.fromBufferAttribute(l.SCALE,v),x.setMatrixAt(v,g.compose(m,p,b));for(const v in l)if(v==="_COLOR_0"){const T=l[v];x.instanceColor=new Jf(T.array,T.itemSize,T.normalized)}else v!=="TRANSLATION"&&v!=="ROTATION"&&v!=="SCALE"&&_.geometry.setAttribute(v,l[v]);dn.prototype.copy.call(x,_),this.parser.assignFinalMaterial(x),h.push(x)}return u.isGroup?(u.clear(),u.add(...h),u):h[0]}))}}const T_="glTF",Qa=12,v0={JSON:1313821514,BIN:5130562};class RE{constructor(e){this.name=Lt.KHR_BINARY_GLTF,this.content=null,this.body=null;const t=new DataView(e,0,Qa),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==T_)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");const i=this.header.length-Qa,s=new DataView(e,Qa);let o=0;for(;o<i;){const a=s.getUint32(o,!0);o+=4;const l=s.getUint32(o,!0);if(o+=4,l===v0.JSON){const c=new Uint8Array(e,Qa+o,a);this.content=n.decode(c)}else if(l===v0.BIN){const c=Qa+o;this.body=e.slice(c,c+a)}o+=a}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}}class PE{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=Lt.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){const n=this.json,i=this.dracoLoader,s=e.extensions[this.name].bufferView,o=e.extensions[this.name].attributes,a={},l={},c={};for(const u in o){const d=lh[u]||u.toLowerCase();a[d]=o[u]}for(const u in e.attributes){const d=lh[u]||u.toLowerCase();if(o[u]!==void 0){const f=n.accessors[e.attributes[u]],h=ua[f.componentType];c[d]=h.name,l[d]=f.normalized===!0}}return t.getDependency("bufferView",s).then(function(u){return new Promise(function(d,f){i.decodeDracoFile(u,function(h){for(const _ in h.attributes){const g=h.attributes[_],m=l[_];m!==void 0&&(g.normalized=m)}d(h)},a,c,Jn,f)})})}}class LE{constructor(){this.name=Lt.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}}class DE{constructor(){this.name=Lt.KHR_MESH_QUANTIZATION}}class E_ extends oc{constructor(e,t,n,i){super(e,t,n,i)}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,s=e*i*3+i;for(let o=0;o!==i;o++)t[o]=n[s+o];return t}interpolate_(e,t,n,i){const s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=a*2,c=a*3,u=i-t,d=(n-t)/u,f=d*d,h=f*d,_=e*c,g=_-c,m=-2*h+3*f,p=h-f,b=1-m,x=p-f+d;for(let v=0;v!==a;v++){const T=o[g+v+a],M=o[g+v+l]*u,E=o[_+v+a],R=o[_+v]*u;s[v]=b*T+x*M+m*E+p*R}return s}}const IE=new ks;class OE extends E_{interpolate_(e,t,n,i){const s=super.interpolate_(e,t,n,i);return IE.fromArray(s).normalize().toArray(s),s}}const Bi={POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6},ua={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},y0={9728:pi,9729:Kn,9984:Fg,9985:tu,9986:al,9987:Yr},b0={33071:wr,33648:vu,10497:Sa},zd={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},lh={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},ps={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},NE={CUBICSPLINE:void 0,LINEAR:Wl,STEP:Gl},Vd={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function FE(r){return r.DefaultMaterial===void 0&&(r.DefaultMaterial=new op({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:ts})),r.DefaultMaterial}function js(r,e,t){for(const n in t.extensions)r[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function gr(r,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(r.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function UE(r,e,t){let n=!1,i=!1,s=!1;for(let c=0,u=e.length;c<u;c++){const d=e[c];if(d.POSITION!==void 0&&(n=!0),d.NORMAL!==void 0&&(i=!0),d.COLOR_0!==void 0&&(s=!0),n&&i&&s)break}if(!n&&!i&&!s)return Promise.resolve(r);const o=[],a=[],l=[];for(let c=0,u=e.length;c<u;c++){const d=e[c];if(n){const f=d.POSITION!==void 0?t.getDependency("accessor",d.POSITION):r.attributes.position;o.push(f)}if(i){const f=d.NORMAL!==void 0?t.getDependency("accessor",d.NORMAL):r.attributes.normal;a.push(f)}if(s){const f=d.COLOR_0!==void 0?t.getDependency("accessor",d.COLOR_0):r.attributes.color;l.push(f)}}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(l)]).then(function(c){const u=c[0],d=c[1],f=c[2];return n&&(r.morphAttributes.position=u),i&&(r.morphAttributes.normal=d),s&&(r.morphAttributes.color=f),r.morphTargetsRelative=!0,r})}function kE(r,e){if(r.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)r.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){const t=e.extras.targetNames;if(r.morphTargetInfluences.length===t.length){r.morphTargetDictionary={};for(let n=0,i=t.length;n<i;n++)r.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function BE(r){let e;const t=r.extensions&&r.extensions[Lt.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+Hd(t.attributes):e=r.indices+":"+Hd(r.attributes)+":"+r.mode,r.targets!==void 0)for(let n=0,i=r.targets.length;n<i;n++)e+=":"+Hd(r.targets[n]);return e}function Hd(r){let e="";const t=Object.keys(r).sort();for(let n=0,i=t.length;n<i;n++)e+=t[n]+":"+r[t[n]]+";";return e}function ch(r){switch(r){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function zE(r){return r.search(/\.jpe?g($|\?)/i)>0||r.search(/^data\:image\/jpeg/)===0?"image/jpeg":r.search(/\.webp($|\?)/i)>0||r.search(/^data\:image\/webp/)===0?"image/webp":r.search(/\.ktx2($|\?)/i)>0||r.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}const VE=new bt;class HE{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new uE,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,i=-1,s=!1,o=-1;if(typeof navigator<"u"){const a=navigator.userAgent;n=/^((?!chrome|android).)*safari/i.test(a)===!0;const l=a.match(/Version\/(\d+)/);i=n&&l?parseInt(l[1],10):-1,s=a.indexOf("Firefox")>-1,o=s?a.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||n&&i<17||s&&o<98?this.textureLoader=new kb(this.options.manager):this.textureLoader=new Gb(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new Eu(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){const n=this,i=this.json,s=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(o){return o._markDefs&&o._markDefs()}),Promise.all(this._invokeAll(function(o){return o.beforeRoot&&o.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(o){const a={scene:o[0][i.scene||0],scenes:o[0],animations:o[1],cameras:o[2],asset:i.asset,parser:n,userData:{}};return js(s,a,i),gr(a,i),Promise.all(n._invokeAll(function(l){return l.afterRoot&&l.afterRoot(a)})).then(function(){for(const l of a.scenes)l.updateMatrixWorld();e(a)})}).catch(t)}_markDefs(){const e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let i=0,s=t.length;i<s;i++){const o=t[i].joints;for(let a=0,l=o.length;a<l;a++)e[o[a]].isBone=!0}for(let i=0,s=e.length;i<s;i++){const o=e[i];o.mesh!==void 0&&(this._addNodeRef(this.meshCache,o.mesh),o.skin!==void 0&&(n[o.mesh].isSkinnedMesh=!0)),o.camera!==void 0&&this._addNodeRef(this.cameraCache,o.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;const i=n.clone(),s=(o,a)=>{const l=this.associations.get(o);l!=null&&this.associations.set(a,l);for(const[c,u]of o.children.entries())s(u,a.children[c])};return s(n,i),i.name+="_instance_"+e.uses[t]++,i}_invokeOne(e){const t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){const i=e(t[n]);if(i)return i}return null}_invokeAll(e){const t=Object.values(this.plugins);t.unshift(this);const n=[];for(let i=0;i<t.length;i++){const s=e(t[i]);s&&n.push(s)}return n}getDependency(e,t){const n=e+":"+t;let i=this.cache.get(n);if(!i){switch(e){case"scene":i=this.loadScene(t);break;case"node":i=this._invokeOne(function(s){return s.loadNode&&s.loadNode(t)});break;case"mesh":i=this._invokeOne(function(s){return s.loadMesh&&s.loadMesh(t)});break;case"accessor":i=this.loadAccessor(t);break;case"bufferView":i=this._invokeOne(function(s){return s.loadBufferView&&s.loadBufferView(t)});break;case"buffer":i=this.loadBuffer(t);break;case"material":i=this._invokeOne(function(s){return s.loadMaterial&&s.loadMaterial(t)});break;case"texture":i=this._invokeOne(function(s){return s.loadTexture&&s.loadTexture(t)});break;case"skin":i=this.loadSkin(t);break;case"animation":i=this._invokeOne(function(s){return s.loadAnimation&&s.loadAnimation(t)});break;case"camera":i=this.loadCamera(t);break;default:if(i=this._invokeOne(function(s){return s!=this&&s.getDependency&&s.getDependency(e,t)}),!i)throw new Error("Unknown type: "+e);break}this.cache.add(n,i)}return i}getDependencies(e){let t=this.cache.get(e);if(!t){const n=this,i=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(i.map(function(s,o){return n.getDependency(e,o)})),this.cache.add(e,t)}return t}loadBuffer(e){const t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[Lt.KHR_BINARY_GLTF].body);const i=this.options;return new Promise(function(s,o){n.load(wl.resolveURL(t.uri,i.path),s,void 0,function(){o(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){const t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){const i=t.byteLength||0,s=t.byteOffset||0;return n.slice(s,s+i)})}loadAccessor(e){const t=this,n=this.json,i=this.json.accessors[e];if(i.bufferView===void 0&&i.sparse===void 0){const o=zd[i.type],a=ua[i.componentType],l=i.normalized===!0,c=new a(i.count*o);return Promise.resolve(new Qt(c,o,l))}const s=[];return i.bufferView!==void 0?s.push(this.getDependency("bufferView",i.bufferView)):s.push(null),i.sparse!==void 0&&(s.push(this.getDependency("bufferView",i.sparse.indices.bufferView)),s.push(this.getDependency("bufferView",i.sparse.values.bufferView))),Promise.all(s).then(function(o){const a=o[0],l=zd[i.type],c=ua[i.componentType],u=c.BYTES_PER_ELEMENT,d=u*l,f=i.byteOffset||0,h=i.bufferView!==void 0?n.bufferViews[i.bufferView].byteStride:void 0,_=i.normalized===!0;let g,m;if(h&&h!==d){const p=Math.floor(f/h),b="InterleavedBuffer:"+i.bufferView+":"+i.componentType+":"+p+":"+i.count;let x=t.cache.get(b);x||(g=new c(a,p*h,i.count*h/u),x=new e_(g,h/u),t.cache.add(b,x)),m=new Xu(x,l,f%h/u,_)}else a===null?g=new c(i.count*l):g=new c(a,f,i.count*l),m=new Qt(g,l,_);if(i.sparse!==void 0){const p=zd.SCALAR,b=ua[i.sparse.indices.componentType],x=i.sparse.indices.byteOffset||0,v=i.sparse.values.byteOffset||0,T=new b(o[1],x,i.sparse.count*p),M=new c(o[2],v,i.sparse.count*l);a!==null&&(m=new Qt(m.array.slice(),m.itemSize,m.normalized)),m.normalized=!1;for(let E=0,R=T.length;E<R;E++){const w=T[E];if(m.setX(w,M[E*l]),l>=2&&m.setY(w,M[E*l+1]),l>=3&&m.setZ(w,M[E*l+2]),l>=4&&m.setW(w,M[E*l+3]),l>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}m.normalized=_}return m})}loadTexture(e){const t=this.json,n=this.options,s=t.textures[e].source,o=t.images[s];let a=this.textureLoader;if(o.uri){const l=n.manager.getHandler(o.uri);l!==null&&(a=l)}return this.loadTextureImage(e,s,a)}loadTextureImage(e,t,n){const i=this,s=this.json,o=s.textures[e],a=s.images[t],l=(a.uri||a.bufferView)+":"+o.sampler;if(this.textureCache[l])return this.textureCache[l];const c=this.loadImageSource(t,n).then(function(u){u.flipY=!1,u.name=o.name||a.name||"",u.name===""&&typeof a.uri=="string"&&a.uri.startsWith("data:image/")===!1&&(u.name=a.uri);const f=(s.samplers||{})[o.sampler]||{};return u.magFilter=y0[f.magFilter]||Kn,u.minFilter=y0[f.minFilter]||Yr,u.wrapS=b0[f.wrapS]||Sa,u.wrapT=b0[f.wrapT]||Sa,u.generateMipmaps=!u.isCompressedTexture&&u.minFilter!==pi&&u.minFilter!==Kn,i.associations.set(u,{textures:e}),u}).catch(function(){return null});return this.textureCache[l]=c,c}loadImageSource(e,t){const n=this,i=this.json,s=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(d=>d.clone());const o=i.images[e],a=self.URL||self.webkitURL;let l=o.uri||"",c=!1;if(o.bufferView!==void 0)l=n.getDependency("bufferView",o.bufferView).then(function(d){c=!0;const f=new Blob([d],{type:o.mimeType});return l=a.createObjectURL(f),l});else if(o.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");const u=Promise.resolve(l).then(function(d){return new Promise(function(f,h){let _=f;t.isImageBitmapLoader===!0&&(_=function(g){const m=new Pn(g);m.needsUpdate=!0,f(m)}),t.load(wl.resolveURL(d,s.path),_,void 0,h)})}).then(function(d){return c===!0&&a.revokeObjectURL(l),gr(d,o),d.userData.mimeType=o.mimeType||zE(o.uri),d}).catch(function(d){throw console.error("THREE.GLTFLoader: Couldn't load texture",l),d});return this.sourceCache[e]=u,u}assignTexture(e,t,n,i){const s=this;return this.getDependency("texture",n.index).then(function(o){if(!o)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(o=o.clone(),o.channel=n.texCoord),s.extensions[Lt.KHR_TEXTURE_TRANSFORM]){const a=n.extensions!==void 0?n.extensions[Lt.KHR_TEXTURE_TRANSFORM]:void 0;if(a){const l=s.associations.get(o);o=s.extensions[Lt.KHR_TEXTURE_TRANSFORM].extendTexture(o,a),s.associations.set(o,l)}}return i!==void 0&&(o.colorSpace=i),e[t]=o,o})}assignFinalMaterial(e){const t=e.geometry;let n=e.material;const i=t.attributes.tangent===void 0,s=t.attributes.color!==void 0,o=t.attributes.normal===void 0;if(e.isPoints){const a="PointsMaterial:"+n.uuid;let l=this.cache.get(a);l||(l=new r_,Ar.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,l.sizeAttenuation=!1,this.cache.add(a,l)),n=l}else if(e.isLine){const a="LineBasicMaterial:"+n.uuid;let l=this.cache.get(a);l||(l=new i_,Ar.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,this.cache.add(a,l)),n=l}if(i||s||o){let a="ClonedMaterial:"+n.uuid+":";i&&(a+="derivative-tangents:"),s&&(a+="vertex-colors:"),o&&(a+="flat-shading:");let l=this.cache.get(a);l||(l=n.clone(),s&&(l.vertexColors=!0),o&&(l.flatShading=!0),i&&(l.normalScale&&(l.normalScale.y*=-1),l.clearcoatNormalScale&&(l.clearcoatNormalScale.y*=-1)),this.cache.add(a,l),this.associations.set(l,this.associations.get(n))),n=l}e.material=n}getMaterialType(){return op}loadMaterial(e){const t=this,n=this.json,i=this.extensions,s=n.materials[e];let o;const a={},l=s.extensions||{},c=[];if(l[Lt.KHR_MATERIALS_UNLIT]){const d=i[Lt.KHR_MATERIALS_UNLIT];o=d.getMaterialType(),c.push(d.extendParams(a,s,t))}else{const d=s.pbrMetallicRoughness||{};if(a.color=new je(1,1,1),a.opacity=1,Array.isArray(d.baseColorFactor)){const f=d.baseColorFactor;a.color.setRGB(f[0],f[1],f[2],Jn),a.opacity=f[3]}d.baseColorTexture!==void 0&&c.push(t.assignTexture(a,"map",d.baseColorTexture,Tn)),a.metalness=d.metallicFactor!==void 0?d.metallicFactor:1,a.roughness=d.roughnessFactor!==void 0?d.roughnessFactor:1,d.metallicRoughnessTexture!==void 0&&(c.push(t.assignTexture(a,"metalnessMap",d.metallicRoughnessTexture)),c.push(t.assignTexture(a,"roughnessMap",d.metallicRoughnessTexture))),o=this._invokeOne(function(f){return f.getMaterialType&&f.getMaterialType(e)}),c.push(Promise.all(this._invokeAll(function(f){return f.extendMaterialParams&&f.extendMaterialParams(e,a)})))}s.doubleSided===!0&&(a.side=Wi);const u=s.alphaMode||Vd.OPAQUE;if(u===Vd.BLEND?(a.transparent=!0,a.depthWrite=!1):(a.transparent=!1,u===Vd.MASK&&(a.alphaTest=s.alphaCutoff!==void 0?s.alphaCutoff:.5)),s.normalTexture!==void 0&&o!==oo&&(c.push(t.assignTexture(a,"normalMap",s.normalTexture)),a.normalScale=new Et(1,1),s.normalTexture.scale!==void 0)){const d=s.normalTexture.scale;a.normalScale.set(d,d)}if(s.occlusionTexture!==void 0&&o!==oo&&(c.push(t.assignTexture(a,"aoMap",s.occlusionTexture)),s.occlusionTexture.strength!==void 0&&(a.aoMapIntensity=s.occlusionTexture.strength)),s.emissiveFactor!==void 0&&o!==oo){const d=s.emissiveFactor;a.emissive=new je().setRGB(d[0],d[1],d[2],Jn)}return s.emissiveTexture!==void 0&&o!==oo&&c.push(t.assignTexture(a,"emissiveMap",s.emissiveTexture,Tn)),Promise.all(c).then(function(){const d=new o(a);return s.name&&(d.name=s.name),gr(d,s),t.associations.set(d,{materials:e}),s.extensions&&js(i,d,s),d})}createUniqueName(e){const t=jt.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){const t=this,n=this.extensions,i=this.primitiveCache;function s(a){return n[Lt.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(a,t).then(function(l){return w0(l,a,t)})}const o=[];for(let a=0,l=e.length;a<l;a++){const c=e[a],u=BE(c),d=i[u];if(d)o.push(d.promise);else{let f;c.extensions&&c.extensions[Lt.KHR_DRACO_MESH_COMPRESSION]?f=s(c):f=w0(new mi,c,t),i[u]={primitive:c,promise:f},o.push(f)}}return Promise.all(o)}loadMesh(e){const t=this,n=this.json,i=this.extensions,s=n.meshes[e],o=s.primitives,a=[];for(let l=0,c=o.length;l<c;l++){const u=o[l].material===void 0?FE(this.cache):this.getDependency("material",o[l].material);a.push(u)}return a.push(t.loadGeometries(o)),Promise.all(a).then(function(l){const c=l.slice(0,l.length-1),u=l[l.length-1],d=[];for(let h=0,_=u.length;h<_;h++){const g=u[h],m=o[h];let p;const b=c[h];if(m.mode===Bi.TRIANGLES||m.mode===Bi.TRIANGLE_STRIP||m.mode===Bi.TRIANGLE_FAN||m.mode===void 0)p=s.isSkinnedMesh===!0?new mb(g,b):new Qn(g,b),p.isSkinnedMesh===!0&&p.normalizeSkinWeights(),m.mode===Bi.TRIANGLE_STRIP?p.geometry=x0(p.geometry,Gg):m.mode===Bi.TRIANGLE_FAN&&(p.geometry=x0(p.geometry,Kf));else if(m.mode===Bi.LINES)p=new bb(g,b);else if(m.mode===Bi.LINE_STRIP)p=new sp(g,b);else if(m.mode===Bi.LINE_LOOP)p=new wb(g,b);else if(m.mode===Bi.POINTS)p=new eh(g,b);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+m.mode);Object.keys(p.geometry.morphAttributes).length>0&&kE(p,s),p.name=t.createUniqueName(s.name||"mesh_"+e),gr(p,s),m.extensions&&js(i,p,m),t.assignFinalMaterial(p),d.push(p)}for(let h=0,_=d.length;h<_;h++)t.associations.set(d[h],{meshes:e,primitives:h});if(d.length===1)return s.extensions&&js(i,d[0],s),d[0];const f=new $r;s.extensions&&js(i,f,s),t.associations.set(f,{meshes:e});for(let h=0,_=d.length;h<_;h++)f.add(d[h]);return f})}loadCamera(e){let t;const n=this.json.cameras[e],i=n[n.type];if(!i){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new ci(Gy.radToDeg(i.yfov),i.aspectRatio||1,i.znear||1,i.zfar||2e6):n.type==="orthographic"&&(t=new $u(-i.xmag,i.xmag,i.ymag,-i.ymag,i.znear,i.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),gr(t,n),Promise.resolve(t)}loadSkin(e){const t=this.json.skins[e],n=[];for(let i=0,s=t.joints.length;i<s;i++)n.push(this._loadNodeShallow(t.joints[i]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(i){const s=i.pop(),o=i,a=[],l=[];for(let c=0,u=o.length;c<u;c++){const d=o[c];if(d){a.push(d);const f=new bt;s!==null&&f.fromArray(s.array,c*16),l.push(f)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[c])}return new ip(a,l)})}loadAnimation(e){const t=this.json,n=this,i=t.animations[e],s=i.name?i.name:"animation_"+e,o=[],a=[],l=[],c=[],u=[];for(let d=0,f=i.channels.length;d<f;d++){const h=i.channels[d],_=i.samplers[h.sampler],g=h.target,m=g.node,p=i.parameters!==void 0?i.parameters[_.input]:_.input,b=i.parameters!==void 0?i.parameters[_.output]:_.output;g.node!==void 0&&(o.push(this.getDependency("node",m)),a.push(this.getDependency("accessor",p)),l.push(this.getDependency("accessor",b)),c.push(_),u.push(g))}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(l),Promise.all(c),Promise.all(u)]).then(function(d){const f=d[0],h=d[1],_=d[2],g=d[3],m=d[4],p=[];for(let x=0,v=f.length;x<v;x++){const T=f[x],M=h[x],E=_[x],R=g[x],w=m[x];if(T===void 0)continue;T.updateMatrix&&T.updateMatrix();const y=n._createAnimationTracks(T,M,E,R,w);if(y)for(let L=0;L<y.length;L++)p.push(y[L])}const b=new Lb(s,void 0,p);return gr(b,i),b})}createNodeMesh(e){const t=this.json,n=this,i=t.nodes[e];return i.mesh===void 0?null:n.getDependency("mesh",i.mesh).then(function(s){const o=n._getNodeRef(n.meshCache,i.mesh,s);return i.weights!==void 0&&o.traverse(function(a){if(a.isMesh)for(let l=0,c=i.weights.length;l<c;l++)a.morphTargetInfluences[l]=i.weights[l]}),o})}loadNode(e){const t=this.json,n=this,i=t.nodes[e],s=n._loadNodeShallow(e),o=[],a=i.children||[];for(let c=0,u=a.length;c<u;c++)o.push(n.getDependency("node",a[c]));const l=i.skin===void 0?Promise.resolve(null):n.getDependency("skin",i.skin);return Promise.all([s,Promise.all(o),l]).then(function(c){const u=c[0],d=c[1],f=c[2];f!==null&&u.traverse(function(h){h.isSkinnedMesh&&h.bind(f,VE)});for(let h=0,_=d.length;h<_;h++)u.add(d[h]);return u})}_loadNodeShallow(e){const t=this.json,n=this.extensions,i=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];const s=t.nodes[e],o=s.name?i.createUniqueName(s.name):"",a=[],l=i._invokeOne(function(c){return c.createNodeMesh&&c.createNodeMesh(e)});return l&&a.push(l),s.camera!==void 0&&a.push(i.getDependency("camera",s.camera).then(function(c){return i._getNodeRef(i.cameraCache,s.camera,c)})),i._invokeAll(function(c){return c.createNodeAttachment&&c.createNodeAttachment(e)}).forEach(function(c){a.push(c)}),this.nodeCache[e]=Promise.all(a).then(function(c){let u;if(s.isBone===!0?u=new t_:c.length>1?u=new $r:c.length===1?u=c[0]:u=new dn,u!==c[0])for(let d=0,f=c.length;d<f;d++)u.add(c[d]);if(s.name&&(u.userData.name=s.name,u.name=o),gr(u,s),s.extensions&&js(n,u,s),s.matrix!==void 0){const d=new bt;d.fromArray(s.matrix),u.applyMatrix4(d)}else s.translation!==void 0&&u.position.fromArray(s.translation),s.rotation!==void 0&&u.quaternion.fromArray(s.rotation),s.scale!==void 0&&u.scale.fromArray(s.scale);if(!i.associations.has(u))i.associations.set(u,{});else if(s.mesh!==void 0&&i.meshCache.refs[s.mesh]>1){const d=i.associations.get(u);i.associations.set(u,{...d})}return i.associations.get(u).nodes=e,u}),this.nodeCache[e]}loadScene(e){const t=this.extensions,n=this.json.scenes[e],i=this,s=new $r;n.name&&(s.name=i.createUniqueName(n.name)),gr(s,n),n.extensions&&js(t,s,n);const o=n.nodes||[],a=[];for(let l=0,c=o.length;l<c;l++)a.push(i.getDependency("node",o[l]));return Promise.all(a).then(function(l){for(let u=0,d=l.length;u<d;u++)s.add(l[u]);const c=u=>{const d=new Map;for(const[f,h]of i.associations)(f instanceof Ar||f instanceof Pn)&&d.set(f,h);return u.traverse(f=>{const h=i.associations.get(f);h!=null&&d.set(f,h)}),d};return i.associations=c(s),s})}_createAnimationTracks(e,t,n,i,s){const o=[],a=e.name?e.name:e.uuid,l=[];ps[s.path]===ps.weights?e.traverse(function(f){f.morphTargetInfluences&&l.push(f.name?f.name:f.uuid)}):l.push(a);let c;switch(ps[s.path]){case ps.weights:c=Ea;break;case ps.rotation:c=Aa;break;case ps.translation:case ps.scale:c=Ca;break;default:switch(n.itemSize){case 1:c=Ea;break;case 2:case 3:default:c=Ca;break}break}const u=i.interpolation!==void 0?NE[i.interpolation]:Wl,d=this._getArrayFromAccessor(n);for(let f=0,h=l.length;f<h;f++){const _=new c(l[f]+"."+ps[s.path],t.array,d,u);i.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(_),o.push(_)}return o}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){const n=ch(t.constructor),i=new Float32Array(t.length);for(let s=0,o=t.length;s<o;s++)i[s]=t[s]*n;t=i}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){const i=this instanceof Aa?OE:E_;return new i(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}}function GE(r,e,t){const n=e.attributes,i=new lr;if(n.POSITION!==void 0){const a=t.json.accessors[n.POSITION],l=a.min,c=a.max;if(l!==void 0&&c!==void 0){if(i.set(new Y(l[0],l[1],l[2]),new Y(c[0],c[1],c[2])),a.normalized){const u=ch(ua[a.componentType]);i.min.multiplyScalar(u),i.max.multiplyScalar(u)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;const s=e.targets;if(s!==void 0){const a=new Y,l=new Y;for(let c=0,u=s.length;c<u;c++){const d=s[c];if(d.POSITION!==void 0){const f=t.json.accessors[d.POSITION],h=f.min,_=f.max;if(h!==void 0&&_!==void 0){if(l.setX(Math.max(Math.abs(h[0]),Math.abs(_[0]))),l.setY(Math.max(Math.abs(h[1]),Math.abs(_[1]))),l.setZ(Math.max(Math.abs(h[2]),Math.abs(_[2]))),f.normalized){const g=ch(ua[f.componentType]);l.multiplyScalar(g)}a.max(l)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}i.expandByVector(a)}r.boundingBox=i;const o=new Ir;i.getCenter(o.center),o.radius=i.min.distanceTo(i.max)/2,r.boundingSphere=o}function w0(r,e,t){const n=e.attributes,i=[];function s(o,a){return t.getDependency("accessor",o).then(function(l){r.setAttribute(a,l)})}for(const o in n){const a=lh[o]||o.toLowerCase();a in r.attributes||i.push(s(n[o],a))}if(e.indices!==void 0&&!r.index){const o=t.getDependency("accessor",e.indices).then(function(a){r.setIndex(a)});i.push(o)}return It.workingColorSpace!==Jn&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${It.workingColorSpace}" not supported.`),gr(r,e),GE(r,e,t),Promise.all(i).then(function(){return e.targets!==void 0?UE(r,e.targets,t):r})}const Gd=new WeakMap;class WE extends Ao{constructor(e){super(e),this.decoderPath="",this.decoderConfig={},this.decoderBinary=null,this.decoderPending=null,this.workerLimit=4,this.workerPool=[],this.workerNextTaskID=1,this.workerSourceURL="",this.defaultAttributeIDs={position:"POSITION",normal:"NORMAL",color:"COLOR",uv:"TEX_COORD"},this.defaultAttributeTypes={position:"Float32Array",normal:"Float32Array",color:"Float32Array",uv:"Float32Array"}}setDecoderPath(e){return this.decoderPath=e,this}setDecoderConfig(e){return this.decoderConfig=e,this}setWorkerLimit(e){return this.workerLimit=e,this}load(e,t,n,i){const s=new Eu(this.manager);s.setPath(this.path),s.setResponseType("arraybuffer"),s.setRequestHeader(this.requestHeader),s.setWithCredentials(this.withCredentials),s.load(e,o=>{this.parse(o,t,i)},n,i)}parse(e,t,n=()=>{}){this.decodeDracoFile(e,t,null,null,Tn,n).catch(n)}decodeDracoFile(e,t,n,i,s=Jn,o=()=>{}){const a={attributeIDs:n||this.defaultAttributeIDs,attributeTypes:i||this.defaultAttributeTypes,useUniqueIDs:!!n,vertexColorSpace:s};return this.decodeGeometry(e,a).then(t).catch(o)}decodeGeometry(e,t){const n=JSON.stringify(t);if(Gd.has(e)){const l=Gd.get(e);if(l.key===n)return l.promise;if(e.byteLength===0)throw new Error("THREE.DRACOLoader: Unable to re-decode a buffer with different settings. Buffer has already been transferred.")}let i;const s=this.workerNextTaskID++,o=e.byteLength,a=this._getWorker(s,o).then(l=>(i=l,new Promise((c,u)=>{i._callbacks[s]={resolve:c,reject:u},i.postMessage({type:"decode",id:s,taskConfig:t,buffer:e},[e])}))).then(l=>this._createGeometry(l.geometry));return a.catch(()=>!0).then(()=>{i&&s&&this._releaseTask(i,s)}),Gd.set(e,{key:n,promise:a}),a}_createGeometry(e){const t=new mi;e.index&&t.setIndex(new Qt(e.index.array,1));for(let n=0;n<e.attributes.length;n++){const{name:i,array:s,itemSize:o,stride:a,vertexColorSpace:l}=e.attributes[n];let c;if(o===a)c=new Qt(s,o);else{const u=new e_(s,a);c=new Xu(u,o,0)}i==="color"&&(this._assignVertexColorSpace(c,l),c.normalized=!(s instanceof Float32Array)),t.setAttribute(i,c)}return t}_assignVertexColorSpace(e,t){if(t!==Tn)return;const n=new je;for(let i=0,s=e.count;i<s;i++)n.fromBufferAttribute(e,i),It.colorSpaceToWorking(n,Tn),e.setXYZ(i,n.r,n.g,n.b)}_loadLibrary(e,t){const n=new Eu(this.manager);return n.setPath(this.decoderPath),n.setResponseType(t),n.setWithCredentials(this.withCredentials),new Promise((i,s)=>{n.load(e,i,void 0,s)})}preload(){return this._initDecoder(),this}_initDecoder(){if(this.decoderPending)return this.decoderPending;const e=typeof WebAssembly!="object"||this.decoderConfig.type==="js",t=[];return e?t.push(this._loadLibrary("draco_decoder.js","text")):(t.push(this._loadLibrary("draco_wasm_wrapper.js","text")),t.push(this._loadLibrary("draco_decoder.wasm","arraybuffer"))),this.decoderPending=Promise.all(t).then(n=>{const i=n[0];e||(this.decoderConfig.wasmBinary=n[1]);const s=XE.toString(),o=["/* draco decoder */",i,"","/* worker */",s.substring(s.indexOf("{")+1,s.lastIndexOf("}"))].join(`
`);this.workerSourceURL=URL.createObjectURL(new Blob([o]))}),this.decoderPending}_getWorker(e,t){return this._initDecoder().then(()=>{if(this.workerPool.length<this.workerLimit){const i=new Worker(this.workerSourceURL);i._callbacks={},i._taskCosts={},i._taskLoad=0,i.postMessage({type:"init",decoderConfig:this.decoderConfig}),i.onmessage=function(s){const o=s.data;switch(o.type){case"decode":i._callbacks[o.id].resolve(o);break;case"error":i._callbacks[o.id].reject(o);break;default:console.error('THREE.DRACOLoader: Unexpected message, "'+o.type+'"')}},this.workerPool.push(i)}else this.workerPool.sort(function(i,s){return i._taskLoad>s._taskLoad?-1:1});const n=this.workerPool[this.workerPool.length-1];return n._taskCosts[e]=t,n._taskLoad+=t,n})}_releaseTask(e,t){e._taskLoad-=e._taskCosts[t],delete e._callbacks[t],delete e._taskCosts[t]}debug(){console.log("Task load: ",this.workerPool.map(e=>e._taskLoad))}dispose(){for(let e=0;e<this.workerPool.length;++e)this.workerPool[e].terminate();return this.workerPool.length=0,this.workerSourceURL!==""&&URL.revokeObjectURL(this.workerSourceURL),this}}function XE(){let r,e;onmessage=function(o){const a=o.data;switch(a.type){case"init":r=a.decoderConfig,e=new Promise(function(u){r.onModuleLoaded=function(d){u({draco:d})},DracoDecoderModule(r)});break;case"decode":const l=a.buffer,c=a.taskConfig;e.then(u=>{const d=u.draco,f=new d.Decoder;try{const h=t(d,f,new Int8Array(l),c),_=h.attributes.map(g=>g.array.buffer);h.index&&_.push(h.index.array.buffer),self.postMessage({type:"decode",id:a.id,geometry:h},_)}catch(h){console.error(h),self.postMessage({type:"error",id:a.id,error:h.message})}finally{d.destroy(f)}});break}};function t(o,a,l,c){const u=c.attributeIDs,d=c.attributeTypes;let f,h;const _=a.GetEncodedGeometryType(l);if(_===o.TRIANGULAR_MESH)f=new o.Mesh,h=a.DecodeArrayToMesh(l,l.byteLength,f);else if(_===o.POINT_CLOUD)f=new o.PointCloud,h=a.DecodeArrayToPointCloud(l,l.byteLength,f);else throw new Error("THREE.DRACOLoader: Unexpected geometry type.");if(!h.ok()||f.ptr===0)throw new Error("THREE.DRACOLoader: Decoding failed: "+h.error_msg());const g={index:null,attributes:[]};for(const m in u){const p=self[d[m]];let b,x;if(c.useUniqueIDs)x=u[m],b=a.GetAttributeByUniqueId(f,x);else{if(x=a.GetAttributeId(f,o[u[m]]),x===-1)continue;b=a.GetAttribute(f,x)}const v=i(o,a,f,m,p,b);m==="color"&&(v.vertexColorSpace=c.vertexColorSpace),g.attributes.push(v)}return _===o.TRIANGULAR_MESH&&(g.index=n(o,a,f)),o.destroy(f),g}function n(o,a,l){const u=l.num_faces()*3,d=u*4,f=o._malloc(d);a.GetTrianglesUInt32Array(l,d,f);const h=new Uint32Array(o.HEAPF32.buffer,f,u).slice();return o._free(f),{array:h,itemSize:1}}function i(o,a,l,c,u,d){const f=l.num_points(),h=d.num_components(),_=s(o,u),g=h*u.BYTES_PER_ELEMENT,m=Math.ceil(g/4)*4,p=m/u.BYTES_PER_ELEMENT,b=f*g,x=f*m,v=o._malloc(b);a.GetAttributeDataArrayForAllPoints(l,d,_,b,v);const T=new u(o.HEAPF32.buffer,v,b/u.BYTES_PER_ELEMENT);let M;if(g===m)M=T.slice();else{M=new u(x/u.BYTES_PER_ELEMENT);let E=0;for(let R=0,w=T.length;R<w;R++){for(let y=0;y<h;y++)M[E+y]=T[R*h+y];E+=p}}return o._free(v),{name:c,count:f,itemSize:h,array:M,stride:p}}function s(o,a){switch(a){case Float32Array:return o.DT_FLOAT32;case Int8Array:return o.DT_INT8;case Int16Array:return o.DT_INT16;case Int32Array:return o.DT_INT32;case Uint8Array:return o.DT_UINT8;case Uint16Array:return o.DT_UINT16;case Uint32Array:return o.DT_UINT32}}}const qE="/150-lab/assets/models/globe-hd.glb";class YE{constructor(){this.tier=null,this.metrics={isMobile:!1,isLowEnd:!1,hardwareConcurrency:navigator.hardwareConcurrency||2,deviceMemory:navigator.deviceMemory||4,connectionSpeed:this.getConnectionSpeed(),isAEMEmbedded:this.checkAEMEmbedded(),pixelRatio:window.devicePixelRatio||1,screenSize:window.innerWidth*window.innerHeight,gpuTier:null}}checkAEMEmbedded(){try{if(window.self!==window.top)return!0;const e=window.location.href.toLowerCase();return e.includes("adobeaemcloud.com")||e.includes("aem")}catch{return!0}}getConnectionSpeed(){if(navigator.connection){const t=navigator.connection.effectiveType;return t==="4g"?"fast":t==="3g"?"medium":"slow"}return"fast"}detectMobile(){const e=navigator.userAgent||navigator.vendor||window.opera,t=/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(e),n="ontouchstart"in window||navigator.maxTouchPoints>0,i=window.innerWidth<=768;return t||n&&i}async benchmarkGPU(){return new Promise(e=>{const t=document.createElement("canvas"),n=t.getContext("webgl")||t.getContext("experimental-webgl");if(!n){e("low");return}const i=n.getExtension("WEBGL_debug_renderer_info");let s="unknown";if(i){if(s=n.getParameter(i.UNMASKED_RENDERER_WEBGL).toLowerCase(),["intel hd 3000","intel hd 4000","intel hd graphics","powervr","mali-400","mali-450","adreno 3","adreno 4","swiftshader"].some(m=>s.includes(m))){e("low");return}if(["nvidia","geforce","rtx","gtx","radeon","adreno 6","adreno 7","apple gpu","m1","m2"].some(m=>s.includes(m))){e("high");return}}const o=performance.now(),a=new Float32Array(1e4*3);for(let d=0;d<a.length;d++)a[d]=Math.random();const l=n.createBuffer();n.bindBuffer(n.ARRAY_BUFFER,l),n.bufferData(n.ARRAY_BUFFER,a,n.STATIC_DRAW),n.finish();const u=performance.now()-o;n.deleteBuffer(l),t.remove(),u<5?e("high"):u<15?e("medium"):e("low")})}async detect(){if(this.tier)return this.tier;this.metrics.isMobile=this.detectMobile(),this.metrics.gpuTier=await this.benchmarkGPU();let e=100;return this.metrics.isMobile&&(e-=30),this.metrics.screenSize<800*600?e-=10:this.metrics.screenSize>1920*1080&&(e-=15),this.metrics.hardwareConcurrency<=2?e-=20:this.metrics.hardwareConcurrency>=8&&(e+=10),this.metrics.deviceMemory<=2?e-=30:this.metrics.deviceMemory>=8&&(e+=10),this.metrics.gpuTier==="low"?e-=30:this.metrics.gpuTier==="high"&&(e+=20),this.metrics.connectionSpeed==="slow"&&(e-=20),this.metrics.isAEMEmbedded&&(e-=15),this.metrics.pixelRatio>2&&(e-=10),e>=70?this.tier="high":e>=40?this.tier="medium":this.tier="low",console.log("[Performance Detector] Metrics:",this.metrics),console.log("[Performance Detector] Score:",e),console.log("[Performance Detector] Tier:",this.tier),this.tier}getSettings(){const e=this.tier||"medium";return{high:{particleCount:150,pixelRatio:Math.min(window.devicePixelRatio,2),antialias:!1,shadowsEnabled:!1,shaderQuality:"high",globeQuality:"high",mouseParticles:!0,targetFPS:60,enablePostProcessing:!1,maxLights:3},medium:{particleCount:80,pixelRatio:Math.min(window.devicePixelRatio,1.5),antialias:!1,shadowsEnabled:!1,shaderQuality:"medium",globeQuality:"medium",mouseParticles:!this.metrics.isMobile,targetFPS:45,enablePostProcessing:!1,maxLights:2},low:{particleCount:40,pixelRatio:1,antialias:!1,shadowsEnabled:!1,shaderQuality:"low",globeQuality:"low",mouseParticles:!1,targetFPS:30,enablePostProcessing:!1,maxLights:1}}[e]}isLowEnd(){return this.tier==="low"}isMobile(){return this.metrics.isMobile}isAEMEmbedded(){return this.metrics.isAEMEmbedded}}const Wd=new YE;class $E{constructor(e,t=60){this.animateCallback=e,this.targetFPS=t,this.frameInterval=1e3/t,this.lastFrameTime=0,this.isVisible=!0,this.isRunning=!1,this.rafId=null,this.pausedByTimeline=!1,this.frameCount=0,this.fpsCheckInterval=1e3,this.lastFPSCheck=performance.now(),this.currentFPS=t,this.setupVisibilityObserver(),this.setupPageVisibilityListener()}setupVisibilityObserver(){const e=document.getElementById("shaderBackground");if(!e)return;const t={root:null,rootMargin:"50px",threshold:.1};this.observer=new IntersectionObserver(n=>{n.forEach(i=>{this.isVisible=i.isIntersecting,this.isVisible&&this.isRunning?console.log("[Adaptive Renderer] Canvas visible, resuming rendering"):this.isVisible||console.log("[Adaptive Renderer] Canvas not visible, pausing rendering")})},t),this.observer.observe(e)}setupPageVisibilityListener(){document.addEventListener("visibilitychange",()=>{document.hidden?(console.log("[Adaptive Renderer] Page hidden, pausing rendering"),this.pause()):(console.log("[Adaptive Renderer] Page visible, resuming rendering"),this.resume())})}start(){this.isRunning||(this.isRunning=!0,this.lastFrameTime=performance.now(),this.lastFPSCheck=performance.now(),this.frameCount=0,this.loop())}loop(){if(!this.isRunning)return;this.rafId=requestAnimationFrame(()=>this.loop());const e=performance.now(),t=e-this.lastFrameTime;e-this.lastFPSCheck>=this.fpsCheckInterval&&(this.currentFPS=this.frameCount,this.frameCount=0,this.lastFPSCheck=e,this.currentFPS<this.targetFPS*.8&&console.warn(`[Adaptive Renderer] FPS below target (${this.currentFPS}/${this.targetFPS}), consider reducing quality`)),!(t<this.frameInterval)&&(!this.isVisible||this.pausedByTimeline||document.hidden||(this.lastFrameTime=e-t%this.frameInterval,this.frameCount++,this.animateCallback&&this.animateCallback(t)))}pause(){this.isRunning=!1,this.rafId&&(cancelAnimationFrame(this.rafId),this.rafId=null)}resume(){this.isRunning||this.start()}setPausedByTimeline(e){this.pausedByTimeline=e}setTargetFPS(e){this.targetFPS=e,this.frameInterval=1e3/e}getCurrentFPS(){return this.currentFPS}destroy(){this.pause(),this.observer&&this.observer.disconnect()}}class jE{constructor(){this.metrics={fps:0,frameTime:0,memory:0,drawCalls:0,triangles:0,geometries:0,textures:0},this.frameCount=0,this.lastTime=performance.now(),this.fpsHistory=[],this.maxHistoryLength=60,this.warningThreshold={fps:30,frameTime:33,memory:200},this.onWarning=null,this.lastWarningTime=0,this.warningCooldown=3e4,this.warningHistory=new Map}update(e){const t=performance.now(),n=t-this.lastTime;if(this.frameCount++,n>=1e3){if(this.metrics.fps=Math.round(this.frameCount*1e3/n),this.metrics.frameTime=n/this.frameCount,this.fpsHistory.push(this.metrics.fps),this.fpsHistory.length>this.maxHistoryLength&&this.fpsHistory.shift(),e&&e.info){const i=e.info;this.metrics.drawCalls=i.render.calls,this.metrics.triangles=i.render.triangles,this.metrics.geometries=i.memory.geometries,this.metrics.textures=i.memory.textures}performance.memory&&(this.metrics.memory=Math.round(performance.memory.usedJSHeapSize/1048576)),this.checkWarnings(),this.frameCount=0,this.lastTime=t}}checkWarnings(){const e=performance.now();if(e-this.lastWarningTime<this.warningCooldown)return;const t=[];if(this.metrics.fps<this.warningThreshold.fps&&this.getAverageFPS()<this.warningThreshold.fps&&(!this.warningHistory.has("fps")||e-this.warningHistory.get("fps")>this.warningCooldown)&&(t.push(`Low FPS: ${this.metrics.fps} (avg: ${this.getAverageFPS()})`),this.warningHistory.set("fps",e)),this.metrics.frameTime>this.warningThreshold.frameTime){const n="frameTime";(!this.warningHistory.has(n)||e-this.warningHistory.get(n)>this.warningCooldown)&&(t.push(`High frame time: ${this.metrics.frameTime.toFixed(1)}ms`),this.warningHistory.set(n,e))}if(this.metrics.memory>this.warningThreshold.memory*1.2){const n="memory";(!this.warningHistory.has(n)||e-this.warningHistory.get(n)>this.warningCooldown)&&(t.push(`High memory usage: ${this.metrics.memory}MB (threshold: ${this.warningThreshold.memory}MB)`),this.warningHistory.set(n,e))}t.length>0&&this.onWarning&&(this.lastWarningTime=e,this.onWarning(t))}getAverageFPS(){if(this.fpsHistory.length===0)return 0;const e=this.fpsHistory.reduce((t,n)=>t+n,0);return Math.round(e/this.fpsHistory.length)}getMetrics(){return{...this.metrics}}log(){console.log("[Performance Monitor]",{fps:this.metrics.fps,avgFPS:this.getAverageFPS(),frameTime:`${this.metrics.frameTime.toFixed(1)}ms`,memory:`${this.metrics.memory}MB`,drawCalls:this.metrics.drawCalls,triangles:this.metrics.triangles,geometries:this.metrics.geometries,textures:this.metrics.textures})}createDebugOverlay(){const e=document.createElement("div");return e.id="perf-monitor-overlay",e.style.cssText=`
      position: fixed;
      top: 10px;
      right: 10px;
      background: rgba(0, 0, 0, 0.8);
      color: #0f0;
      font-family: monospace;
      font-size: 12px;
      padding: 10px;
      border-radius: 4px;
      z-index: 999999;
      min-width: 200px;
    `,document.body.appendChild(e),setInterval(()=>{const t=this.getMetrics();e.innerHTML=`
        <div style="font-weight: bold; margin-bottom: 5px;">Performance Monitor</div>
        <div>FPS: ${t.fps} (avg: ${this.getAverageFPS()})</div>
        <div>Frame Time: ${t.frameTime.toFixed(1)}ms</div>
        <div>Memory: ${t.memory}MB</div>
        <div>Draw Calls: ${t.drawCalls}</div>
        <div>Triangles: ${t.triangles}</div>
        <div>Geometries: ${t.geometries}</div>
        <div>Textures: ${t.textures}</div>
      `},1e3),e}removeDebugOverlay(){const e=document.getElementById("perf-monitor-overlay");e&&e.remove()}setWarningCallback(e){this.onWarning=e}}class KE{constructor(){this.disposables=new Set,this.textures=new Set,this.geometries=new Set,this.materials=new Set}track(e,t="disposable"){if(e)switch(t){case"texture":this.textures.add(e);break;case"geometry":this.geometries.add(e);break;case"material":this.materials.add(e);break;default:this.disposables.add(e)}}dispose(e){if(e)try{e.dispose&&typeof e.dispose=="function"&&e.dispose(),this.disposables.delete(e),this.textures.delete(e),this.geometries.delete(e),this.materials.delete(e)}catch(t){console.warn("[Memory Manager] Error disposing resource:",t)}}disposeAll(){let e=0;return this.textures.forEach(t=>{try{t&&t.dispose&&(t.dispose(),e++)}catch(n){console.warn("[Memory Manager] Error disposing texture:",n)}}),this.textures.clear(),this.geometries.forEach(t=>{try{t&&t.dispose&&(t.dispose(),e++)}catch(n){console.warn("[Memory Manager] Error disposing geometry:",n)}}),this.geometries.clear(),this.materials.forEach(t=>{try{t&&t.dispose&&(t.dispose(),e++)}catch(n){console.warn("[Memory Manager] Error disposing material:",n)}}),this.materials.clear(),this.disposables.forEach(t=>{try{t&&t.dispose&&(t.dispose(),e++)}catch(n){console.warn("[Memory Manager] Error disposing resource:",n)}}),this.disposables.clear(),console.log(`[Memory Manager] Disposed ${e} resources`),e}disposeObject(e){e&&(e.children&&e.children.forEach(t=>this.disposeObject(t)),e.geometry&&this.dispose(e.geometry),e.material&&(Array.isArray(e.material)?e.material.forEach(t=>{this.disposeMaterial(t)}):this.disposeMaterial(e.material)),e.parent&&e.parent.remove(e))}disposeMaterial(e){if(!e)return;["map","lightMap","bumpMap","normalMap","specularMap","envMap","alphaMap","aoMap","displacementMap","emissiveMap","gradientMap","metalnessMap","roughnessMap"].forEach(n=>{e[n]&&this.dispose(e[n])}),this.dispose(e)}getStats(){return{textures:this.textures.size,geometries:this.geometries.size,materials:this.materials.size,disposables:this.disposables.size,total:this.textures.size+this.geometries.size+this.materials.size+this.disposables.size}}forceGC(){try{if(window.gc)window.gc(),console.log("[Memory Manager] Forced garbage collection");else{const e=new Array(1e6);e.fill(0),e.length=0}}catch{}}}const el=new KE;class ZE{constructor(){this.isAuthorMode=!1,this.isEditMode=!1,this.isPreviewMode=!1,this.isPublishMode=!0,this.detected=!1}isDevelopmentEnvironment(){const e=window.location.hostname,t=["localhost","127.0.0.1","0.0.0.0",".local","dev.","test.","staging."],n=window.location.port,i=["3000","4200","5173","8080","8000","9000"];return!!(t.some(s=>e.includes(s))||i.includes(n))}detect(){if(this.detected)return this.getMode();if(this.isDevelopmentEnvironment())return console.log("[AEM Mode Detector] Development environment detected - skipping AEM detection"),this.isPublishMode=!0,this.isAuthorMode=!1,this.isEditMode=!1,this.isPreviewMode=!1,this.detected=!0,"publish";const e=window.location.href,t=window.location.pathname,n=window.location.hostname;if(e.includes("wcmmode=disabled"))return console.log("[AEM Mode Detector] wcmmode=disabled detected - using publish mode"),this.isPublishMode=!0,this.isAuthorMode=!1,this.isEditMode=!1,this.isPreviewMode=!1,this.detected=!0,"publish";const i=n.includes("adobeaemcloud.com")||n.includes("aem")||n.includes("author")||n.includes("publish"),s=e.includes("/editor.html/")||t.includes("/editor.html/")||e.includes("/cf#/"),o=e.includes("wcmmode=edit")||e.includes("wcmmode=design"),a=e.includes("wcmmode=preview");(s||o)&&(i||t.includes("/content/"))&&(this.isAuthorMode=!0,this.isPublishMode=!1,this.isEditMode=!0,console.log("[AEM Mode Detector] Edit mode detected via URL")),a&&(i||t.includes("/content/"))&&(this.isAuthorMode=!0,this.isPublishMode=!1,this.isPreviewMode=!0,console.log("[AEM Mode Detector] Preview mode detected via URL")),typeof window.Granite<"u"&&i&&!this.isEditMode&&!this.isPreviewMode&&(this.isAuthorMode=!0,this.isPublishMode=!1,console.log("[AEM Mode Detector] Granite namespace detected (author environment)"));const l=document.querySelector(".aem-AuthorLayer-Edit")||document.body.classList.contains("aem-AuthorLayer-Edit"),c=document.querySelector(".granite-author-layer");l&&(i||s)?(this.isAuthorMode=!0,this.isEditMode=!0,this.isPublishMode=!1,console.log("[AEM Mode Detector] AEM Edit UI elements detected")):c&&i&&!this.isEditMode&&(this.isAuthorMode=!0,this.isPublishMode=!1,console.log("[AEM Mode Detector] AEM Author UI detected (not edit mode)"));const u=document.cookie.split(";");for(let f of u){const[h,_]=f.trim().split("=");if(h==="wcmmode"&&(i||s)){if(_==="disabled"){this.isPublishMode=!0,this.isAuthorMode=!1,this.isEditMode=!1,this.isPreviewMode=!1,console.log("[AEM Mode Detector] wcmmode=disabled cookie - using publish mode");break}else _==="edit"||_==="design"?(this.isAuthorMode=!0,this.isEditMode=!0,this.isPublishMode=!1,console.log("[AEM Mode Detector] wcmmode=edit/design cookie detected")):_==="preview"&&(this.isAuthorMode=!0,this.isPreviewMode=!0,this.isPublishMode=!1,console.log("[AEM Mode Detector] wcmmode=preview cookie detected"));break}}try{if(window.self!==window.top&&!this.isEditMode){const f=document.referrer;(f.includes("/editor.html/")||f.includes("adobeaemcloud.com")&&f.includes("/editor.html/"))&&(this.isAuthorMode=!0,this.isEditMode=!0,this.isPublishMode=!1,console.log("[AEM Mode Detector] AEM Editor iframe detected"))}}catch{this.isEditMode&&i&&console.log("[AEM Mode Detector] Cross-origin iframe in edit context")}this.detected=!0;const d=this.getMode();return console.log("[AEM Mode Detector] Detection complete:",{mode:d,url:e,hostname:n,isAuthorMode:this.isAuthorMode,isEditMode:this.isEditMode,isPreviewMode:this.isPreviewMode,isPublishMode:this.isPublishMode,isDevelopment:this.isDevelopmentEnvironment()}),d}getMode(){return this.isEditMode?"edit":this.isPreviewMode?"preview":this.isAuthorMode?"author":"publish"}shouldUseFallbackMode(){return this.detected||this.detect(),this.isEditMode}shouldUseLimitedMode(){return this.detected||this.detect(),this.isAuthorMode&&!this.isEditMode}isFullFeatureMode(){return this.detected||this.detect(),this.isPublishMode}getSettings(){return this.detected||this.detect(),this.shouldUseFallbackMode()?{mode:"fallback",enableBackground:!1,enableAnimations:!1,enableVideo:!1,enableParticles:!1,enableMouseParticles:!1,enableAudio:!1,enableScrollEffects:!1,showStaticBackground:!0,showPlaceholderMessage:!0}:this.shouldUseLimitedMode()?{mode:"limited",enableBackground:!0,enableAnimations:!0,enableVideo:!0,enableParticles:!0,enableMouseParticles:!0,enableAudio:!1,enableScrollEffects:!0,showStaticBackground:!1,showPlaceholderMessage:!1}:{mode:"full",enableBackground:!0,enableAnimations:!0,enableVideo:!0,enableParticles:!0,enableMouseParticles:!0,enableAudio:!0,enableScrollEffects:!0,showStaticBackground:!1,showPlaceholderMessage:!1}}applyStaticBackground(){const e=document.body,t=document.getElementById("shaderBackground");t&&(t.style.display="none"),e.style.background="linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #1a1a2e 100%)",e.style.backgroundAttachment="fixed",console.log("[AEM Mode] Applied static background")}showPlaceholderMessage(){if(document.getElementById("aem-edit-mode-message"))return;const e=document.createElement("div");e.id="aem-edit-mode-message",e.style.cssText=`
      position: fixed;
      top: 60px;
      left: 50%;
      transform: translateX(-50%);
      background: rgba(0, 0, 0, 0.85);
      color: #fff;
      padding: 12px 24px;
      border-radius: 8px;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      font-size: 14px;
      z-index: 999999;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
      border: 1px solid rgba(255, 255, 255, 0.1);
    `,e.innerHTML=`
      <strong>⚠️ AEM Edit Mode</strong><br>
      <small style="opacity: 0.8;">Heavy visuals disabled to prevent memory issues.<br>
      Preview on publish for full experience.</small>
    `,document.body.appendChild(e),console.log("[AEM Mode] Showing edit mode message")}}const xs=new ZE;function JE(r,e){if(window.PRELOADED_ASSETS&&window.PRELOADED_ASSETS[r]){const t=window.PRELOADED_ASSETS[r];if(t instanceof ArrayBuffer){const n=new Blob([t]);return URL.createObjectURL(n)}}return e}async function A_(){if(window.shaderBackgroundInitialized){console.warn("Shader background already initialized. Skipping...");return}const r=xs.detect(),e=xs.getSettings();if(e.mode==="fallback"||!e.enableBackground){console.log("[Background Init] Skipping initialization - AEM fallback mode detected"),console.log("[Background Init] AEM Mode:",r),xs.applyStaticBackground(),window.shaderBackgroundInitialized=!0;return}const t=await Wd.detect(),n=Wd.getSettings();console.log("[Background Init] AEM Mode:",r),console.log("[Background Init] Performance Tier:",t),console.log("[Background Init] Settings:",n),window.colorPhase=1,window.specialColorsActive=!1,window.particlesFullyHidden=!1,window.particlesMovementPaused=!1;let i=Date.now();const s=6e9;function o(){const S=document.querySelector("#events");if(!S)return!0;const B=S.getBoundingClientRect(),se=window.innerHeight*1.2;return B.top>se}const a=document.getElementById("shaderBackground");if(!a)return;function l(){try{const S=document.createElement("canvas");return!!(S.getContext("webgl")||S.getContext("experimental-webgl"))}catch{return!1}}if(!l()){console.warn("WebGL is not supported on this device/browser. Skipping shader background initialization."),a.style.display="none",document.body.style.backgroundColor="#1a1a2e";return}window.specialColorsActive=!1,window.colorPhase=0,setTimeout(()=>{typeof window.gsap<"u"?c(window.gsap,window.gsap.ScrollTrigger):console.warn("GSAP not found on window object - ScrollTrigger animations may not work")},200);function c(S,B){let V,se,pe,de,ut,Je,mt,pt;if(!document.querySelector("#video-travel-area")){console.warn("Could not find #video-travel-area element for shader animation");return}if(P&&P.color1&&P.color2&&(V=P.color1.value.clone(),se=P.color2.value.clone(),pe=P.waveSpeed.value,de=P.waveAmplitude.value,ut=P.waveFrequency.value,Je=P.ambientLight.value,mt=P.directionalLight.value,pt=P.yOffset.value),S.timeline({scrollTrigger:{trigger:"#video-travel-area",start:"top 135%",end:"top 20%",scrub:!0,markers:!1,onUpdate:yn=>{P&&P.colorDarkness&&(P.colorDarkness.value=yn.progress*2,P.colorDarkness.value>=1.95?window.colorPhase===1?(P.color1&&P.color1.value.set(V),P.color2&&P.color2.value.set(se),window.specialColorsActive=!0):window.colorPhase===0&&(P.color1&&P.color1.value.set("#e2e2e2"),P.color2&&P.color2.value.set("#515151"),window.specialColorsActive=!0):V&&se&&(window.colorPhase===1?(P.color1&&P.color1.value.copy(V),P.color2&&P.color2.value.copy(se),window.specialColorsActive=!1):window.colorPhase===0&&(P.color1&&P.color1.value.set("#e2e2e2"),P.color2&&P.color2.value.set("#515151"),window.specialColorsActive=!1)),d())}}}),setTimeout(()=>{u(S)},100),!document.querySelector("#get-involved")){console.warn("Could not find #get-involved element for globe opacity animation");return}S.timeline({scrollTrigger:{trigger:"#get-involved",start:"top bottom",end:"#get-involved-earth center center",scrub:!0,markers:!1,onUpdate:yn=>{const dt=yn.progress;F&&(dt>.01&&!F.visible?(F.visible=!0,k.visible=!0,_()):dt<=.01&&F.visible&&(F.visible=!1,k.visible=!1,_()),F.visible&&(F.traverse(nn=>{nn.isMesh&&nn.material&&(nn.material.transparent=!0,nn.material.opacity=dt)}),k.opacity=dt,h())),L&&(dt>.01&&!L.visible?(L.visible=!0,N.enabled=!0,g()):dt<=.01&&L.visible&&(L.visible=!1,N.enabled=!1,g()),y&&y.uniforms&&(dt>.01&&L.visible?(y.uniforms.startOpacity.value=N.startOpacity*dt,y.uniforms.endOpacity.value=N.endOpacity*dt):(y.uniforms.startOpacity.value=0,y.uniforms.endOpacity.value=0)))}}}),S.timeline({scrollTrigger:{trigger:"#get-involved",start:"top 90%",end:"bottom top",scrub:.5,markers:!1,onUpdate:yn=>{const dt=yn.progress,nn=.15;if(!window.particlesFullyHidden&&dt>=nn?(window.particlesFullyHidden=!0,window.particlesMovementPaused=!0):window.particlesFullyHidden&&dt<nn*.8&&(window.particlesFullyHidden=!1,window.particlesMovementPaused=!1),window.particlesFullyHidden){Te&&Te.uniforms&&Te.uniforms.opacity&&(Te.uniforms.opacity.value=0,Do());return}const zn=1-Math.min(dt/nn,1),ss=.5*Math.pow(zn,3);Te&&Te.uniforms&&Te.uniforms.opacity&&(Te.uniforms.opacity.value=ss,Do())}}}),S.timeline({scrollTrigger:{trigger:"#get-involved-earth",start:"top bottom",end:"bottom top",scrub:.3,markers:!1,onUpdate:yn=>{const dt=yn.progress;if(w){const Mi=-322+120*(1-Math.pow(1-dt,3));if(w.position.y=Mi,q&&q.__folders["Globe Model Controls"]){const rs=q.__folders["Globe Model Controls"].__folders.Position;if(rs&&rs.__controllers){for(let ss of rs.__controllers)if(ss.property==="positionY"){ss.updateDisplay();break}}}}}}}),S.timeline({scrollTrigger:{trigger:"#hero-travel-area",start:"top bottom",end:"top top",scrub:!0,markers:!1,onUpdate:yn=>{if(!P||!P.color1||!P.color2)return;const dt=yn.progress,nn=new je("#e2e2e2"),bn=new je("#515151"),zn=new je("#32c2d6"),Mi=new je("#004199"),rs=nn.clone().lerp(zn,dt),ss=bn.clone().lerp(Mi,dt);P.color1.value.copy(rs),P.color2.value.copy(ss),dt>.9?window.colorPhase=1:dt<.1?window.colorPhase=0:window.colorPhase=.5,window.specialColorsActive=!0,f(),Vr();const os=document.querySelector("#cover-area-overlay");if(os){const Io=1-dt,cc=1+dt*1.2;os.style.opacity=Io,os.style.filter=`saturate(${cc})`}}}}),S.timeline({scrollTrigger:{trigger:"#hero-travel-area",start:"top top",end:"bottom bottom",scrub:!0,markers:!1,onUpdate:yn=>{if(!P||!P.color1||!P.color2)return;const dt=yn.progress,nn=new je("#32c2d6"),bn=new je("#004199"),zn=new je("#B225B1"),Mi=new je("#FCC72D"),rs=new je("#DA281C"),ss=new je("#FCC72D");let os,Io;if(dt<=.4)os=nn.clone();else if(dt<=.8){const pr=(dt-.4)/.4;os=nn.clone().lerp(zn,pr)}else{const pr=(dt-.8)/.2;os=zn.clone().lerp(rs,pr)}if(dt<=.6)Io=bn.clone();else if(dt<=.8){const pr=(dt-.6)/.20000000000000007;Io=bn.clone().lerp(Mi,pr)}else{const pr=(dt-.8)/.2;Io=Mi.clone().lerp(ss,pr)}P.color1.value.copy(os),P.color2.value.copy(Io);const cc=document.getElementById("shaderBackground");cc&&(cc.style.filter="hue-rotate(0deg)"),dt>.9?window.colorPhase=2:dt<.1?window.colorPhase=1:window.colorPhase=1.5,i=Date.now(),window.specialColorsActive=!0;const rd=document.querySelector("#cover-area-overlay");if(rd){let pr=0;if(dt>=.3){const Mv=(dt-.3)/.7;pr=Math.min(.5,Mv*.5)}const Sv=1+dt*1.2;rd.style.opacity=pr,rd.style.filter=`saturate(${Sv})`}f(),Vr()}}}),S.timeline({scrollTrigger:{trigger:"#video-travel-area",start:"top top",end:"bottom top",scrub:!1,markers:!1,onEnter:()=>{P&&P.color1&&P.color2&&(P.color1.value.set("#DA281C"),P.color2.value.set("#FCC72D"),window.colorPhase=2,window.specialColorsActive=!0,f())},onLeaveBack:()=>{}}}),S.timeline({scrollTrigger:{trigger:"#video-travel-area",start:"top bottom",end:"top 66.67%",scrub:!0,markers:!1,onUpdate:yn=>{const dt=yn.progress,nn=document.querySelector("#cover-area-overlay");if(nn){const bn=.5-dt*.5;nn.style.opacity=bn,nn.style.filter="saturate(2.2)"}}}}),S.timeline({scrollTrigger:{trigger:"#get-involved-cards",start:"top 50%",end:"top -10%",scrub:!0,markers:!1,onUpdate:yn=>{if(!P||!P.color1||!P.color2)return;const dt=yn.progress;if(dt>.1)P.color1.value.set("#dcfff6"),P.color2.value.set("#5dff9d"),P.yOffset&&(P.yOffset.value=-.05),P.ambientLight.value=.4,P.directionalLight.value=.4,P.waveAmplitude.value=1.2,P.waveFrequency.value=2.2,window.colorPhase=3,window.specialColorsActive=!0,f(),Ks(),Vr();else if(dt<=.1&&window.colorPhase===3){const nn=P.time.value+P.colorCycleOffset.value;P.colorCycleOffset.value=nn,P.time.value=0,P.color1.value.set("#DA281C"),P.color2.value.set("#FCC72D"),P.yOffset&&pt!==void 0&&(P.yOffset.value=pt),Je!==void 0&&(P.ambientLight.value=Je),mt!==void 0&&(P.directionalLight.value=mt),P.waveSpeed.value=1,de!==void 0&&(P.waveAmplitude.value=de),ut!==void 0&&(P.waveFrequency.value=ut),window.colorPhase=2,i=Date.now(),window.specialColorsActive=!0,f(),Ks(),Vr()}d()}}}),S.timeline({scrollTrigger:{trigger:"#get-involved-cards",start:"top 50%",end:"top -10%",scrub:1,markers:!1,onUpdate:yn=>{const nn=1-yn.progress,bn=Math.pow(nn,3);F&&(F.visible=!0,F.traverse(zn=>{zn.isMesh&&zn.material&&(Array.isArray(zn.material)?zn.material.forEach(Mi=>{Mi.transparent=!0,Mi.opacity=bn,Mi.depthWrite=bn>.1,Mi.blending=As,Mi.needsUpdate=!0}):(zn.material.transparent=!0,zn.material.opacity=bn,zn.material.depthWrite=bn>.1,zn.material.blending=As,zn.material.needsUpdate=!0))}),bn<.01&&(F.visible=!1),k.opacity=bn,k.rotationPaused=bn<.01,h()),L&&y&&y.uniforms&&(L.visible=bn>.01,y.uniforms.startOpacity.value=N.startOpacity*bn,y.uniforms.endOpacity.value=N.endOpacity*bn,N.enabled=bn>.01,g())}}}),S.timeline({scrollTrigger:{trigger:"#get-involved",start:"bottom bottom",end:"top top",scrub:!0,markers:!1,onUpdate:yn=>{yn.progress<=.1&&pe!==void 0&&window.colorPhase===1&&(P.waveSpeed&&(P.waveSpeed.value=pe),P.waveAmplitude&&(P.waveAmplitude.value=de),P.waveFrequency&&(P.waveFrequency.value=ut),P.yOffset&&(P.yOffset.value=pt),Ks(),Vr())}}});function Do(yn){if(typeof q<"u"&&q&&q.__folders&&q.__folders["Particle System"]){const dt=q.__folders["Particle System"];if(dt&&dt.__controllers){for(let nn of dt.__controllers)if(nn.property==="value"&&nn.object===Te.uniforms.opacity){nn.updateDisplay();break}}}}}function u(S,B,V,se){if(!document.querySelector("#events")){document.addEventListener("DOMContentLoaded",()=>{u(S)});return}S.timeline({scrollTrigger:{trigger:"#events",start:"top 110%",end:"top 50%",scrub:!0,markers:!1,onUpdate:de=>{P&&P.colorDarkness&&(P.colorDarkness.value=2-de.progress*2,window.colorPhase===3?(P.color1&&P.color1.value.set("#dcfff6"),P.color2&&P.color2.value.set("#5dff9d"),P.ambientLight&&(P.ambientLight.value=.4),P.directionalLight&&(P.directionalLight.value=.4),P.waveSpeed&&(P.waveSpeed.value=.9),P.waveAmplitude&&(P.waveAmplitude.value=1.2),window.specialColorsActive=!0,f(),Ks(),Vr()):window.colorPhase===2?(P.color1&&P.color1.value.set("#da281c"),P.color2&&P.color2.value.set("#FCC72D"),window.specialColorsActive=!0,f(),Ks(),Vr()):window.colorPhase===1?(P.color1&&P.color1.value.set("#32c2d6"),P.color2&&P.color2.value.set("#004199"),window.specialColorsActive=!0,f(),Ks(),Vr()):(P.color1&&P.color1.value.set("#e2e2e2"),P.color2&&P.color2.value.set("#515151"),window.specialColorsActive=!0,f(),Ks(),Vr()),d())}}})}function d(){const S=window.gui,B=window.uniforms;if(typeof S<"u"&&S&&S.__folders&&S.__folders["Color Controls"]){const V=S.__folders["Color Controls"];if(V&&V.__controllers){for(let se of V.__controllers)if(se.property==="value"&&se.object===B.colorDarkness){se.updateDisplay();break}}}}function f(){const S=window.gui,B=window.uniforms;if(typeof S<"u"&&S&&S.__folders&&S.__folders["Color Controls"]){const V=S.__folders["Color Controls"];V&&V.__controllers&&V.__controllers.forEach(se=>{if(se.property==="color"&&se.__color){if(se.property==="color"&&se.__li&&se.__li.querySelector(".property-name").textContent==="Color 1"){const de="#"+B.color1.value.getHexString();se.setValue(de)}else if(se.property==="color"&&se.__li&&se.__li.querySelector(".property-name").textContent==="Color 2"){const de="#"+B.color2.value.getHexString();se.setValue(de)}}})}}function h(){if(typeof q<"u"&&q&&q.__folders&&q.__folders["Globe Model Controls"]&&q.__folders["Globe Model Controls"].__folders&&q.__folders["Globe Model Controls"].__folders.Material){const S=q.__folders["Globe Model Controls"].__folders.Material;if(S&&S.__controllers)for(let B of S.__controllers)B.property==="opacity"&&B.updateDisplay()}}function _(){if(typeof q<"u"&&q&&q.__folders&&q.__folders["Globe Model Controls"]){const S=q.__folders["Globe Model Controls"];if(S&&S.__controllers){for(let B of S.__controllers)if(B.property==="visible"){B.updateDisplay();break}}}}function g(){if(typeof q<"u"&&q&&q.__folders&&q.__folders["Gradient Overlay Controls"]){const S=q.__folders["Gradient Overlay Controls"];if(S&&S.__controllers){for(let B of S.__controllers)if(B.property==="enabled"){B.updateDisplay();break}}}}function m(){return Math.max(window.innerHeight,document.documentElement.clientHeight)}const p=window.innerWidth,b=m();a.style.position="fixed",a.style.top="0",a.style.left="0",a.style.width="100vw",a.style.height="100svh",a.style.zIndex="-1",a.style.transform="translateZ(0)",a.style.transformStyle="preserve-3d",a.style.willChange="transform";let x;try{x=new __({canvas:a,alpha:!0,antialias:n.antialias,powerPreference:t==="high"?"high-performance":"default",failIfMajorPerformanceCaveat:!1}),x.setSize(p,b),x.setPixelRatio(n.pixelRatio),console.log("[Background Init] Renderer pixel ratio:",n.pixelRatio)}catch(S){console.error("Failed to create WebGL renderer:",S),console.warn("Falling back to fallback background. WebGL initialization failed."),a.style.display="none",document.body.style.backgroundColor="#1a1a2e",document.body.style.background="linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #1a1a2e 100%)";return}window.shaderBackgroundInitialized=!0,window.addEventListener("beforeunload",S=>{if(window._isMailtoOperation||window._preventBackgroundCleanup){console.log("[Background] Skipping cleanup for mailto/non-navigation action");return}console.log("[Background] Cleaning up resources before page unload"),window.shaderBackgroundRenderer&&window.shaderBackgroundRenderer.pause();const B=el.disposeAll();console.log(`[Background] Disposed ${B} Three.js resources`),x&&(x.dispose(),x.forceContextLoss()),el.forceGC()}),a.addEventListener("webglcontextlost",function(S){console.warn("WebGL context lost. Attempting to restore..."),S.preventDefault(),window.shaderBackgroundInitialized=!1}),a.addEventListener("webglcontextrestored",function(){setTimeout(()=>{if(!window.shaderBackgroundReinitializing){window.shaderBackgroundReinitializing=!0;try{A_()}catch(S){console.error("Failed to reinitialize shader background after context restore:",S)}finally{window.shaderBackgroundReinitializing=!1}}},100)});const v=new Su,T=new Su;let M=0;const E={zoom:2.471,zPosition:1},R=new $u(-window.innerWidth/2,window.innerWidth/2,window.innerHeight/2,-window.innerHeight/2,-1e3,1e3);R.position.z=E.zPosition,R.zoom=E.zoom,R.updateProjectionMatrix();const w=new $r;w.position.y=-322,w.frustumCulled=!0,v.add(w);let y,L;const N={enabled:!1,startOpacity:0,endOpacity:1,offsetY:.22,height:3,color:"#000000",yOffset:-.03};function W(){y=new hi({transparent:!0,uniforms:{startOpacity:{value:N.startOpacity},endOpacity:{value:N.endOpacity},overlayColor:{value:new je(N.color)},offsetY:{value:N.offsetY},heightMultiplier:{value:N.height}},vertexShader:`
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
      `,depthTest:!1,depthWrite:!1,side:Wi});const S=window.innerHeight,B=R.right-R.left,V=R.top-R.bottom,se=S*.66*(V/S),pe=new Vi(B,se);L=new Qn(pe,y),L.rotation.set(0,0,0),L.position.x=0,L.position.y=N.yOffset*V,L.position.z=-100,L.frustumCulled=!1,L.renderOrder=9999,L.visible=N.enabled,v.add(L)}function j(){if(!L)return;L.rotation.set(0,0,0),L.position.x=0;const S=R.top-R.bottom;L.position.y=N.yOffset*S,L.position.z=-100}W();const k={visible:!1,scale:25,positionX:0,positionY:-280,positionZ:0,rotationX:0,rotationY:0,rotationZ:0,autoRotate:!0,autoRotateSpeed:.05,baseRotateSpeed:.05,scrollRotateSpeed:.075,responsive:!0,baseScale:25,opacity:0,rotationPaused:!1},J=new cE,te=new WE;te.setDecoderPath("https://www.gstatic.com/draco/versioned/decoders/1.5.6/"),te.setDecoderConfig({type:"js"}),J.setDRACOLoader(te);let F;const ue=t==="low"||Wd.isAEMEmbedded(),O=S=>{F=S.scene;let V=new lr().setFromObject(F).getCenter(new Y),se=new $r;se.add(F),F.position.set(-V.x,-V.y,-V.z),F=se,F.visible=k.visible,F.frustumCulled=!0,F.traverse(ut=>{ut.isMesh&&(ut.frustumCulled=!0)}),w.add(F),F.position.set(k.positionX,k.positionY,k.positionZ),F.rotation.set(k.rotationX*Math.PI/180,k.rotationY*Math.PI/180,k.rotationZ*Math.PI/180),k.responsive?oe():(F.scale.set(k.scale,k.scale,k.scale),ae());const pe=ke.addFolder("Material");let de=0;F.traverse(ut=>{if(ut.isMesh&&ut.material){const Je=ut.material;if(de++,Je.isMeshStandardMaterial||Je.isMeshPhongMaterial){Je.metalness!==void 0&&pe.add({metalness:Je.metalness},"metalness",0,1).name(`Metalness${de>1?" "+de:""}`).onChange(pt=>{Je.metalness=pt}),Je.roughness!==void 0&&pe.add({roughness:Je.roughness},"roughness",0,1).name(`Roughness${de>1?" "+de:""}`).onChange(pt=>{Je.roughness=pt}),Je.shininess!==void 0&&pe.add({shininess:Je.shininess},"shininess",0,100).name(`Shininess${de>1?" "+de:""}`).onChange(pt=>{Je.shininess=pt}),pe.add({opacity:Je.opacity},"opacity",0,1).name(`Opacity${de>1?" "+de:""}`).onChange(pt=>{Je.opacity=pt,Je.transparent=pt<1});const mt=Je.emissive?"#"+Je.emissive.getHexString():"#000000";pe.addColor({color:mt},"color").name(`Emissive Color${de>1?" "+de:""}`).onChange(pt=>{Je.emissive&&Je.emissive.set(pt)})}}})},$=()=>{const S=JE("globe-hd.glb",qE);console.log("[Background Init] Loading globe model..."),J.load(S,O,B=>{if(B.lengthComputable){const V=B.loaded/B.total*100;V%25===0&&console.log(`[Background Init] Globe loading: ${V.toFixed(0)}%`)}},B=>{console.error("Error loading globe model:",B)})};ue?(console.log("[Background Init] Deferring globe model load for performance"),"requestIdleCallback"in window?requestIdleCallback(()=>$(),{timeout:2e3}):setTimeout(()=>$(),1e3)):$(),window.uniforms={time:{value:0},resolution:{value:new Et(window.innerWidth,window.innerHeight)},mainSpeed:{value:12e-5},waveSpeed:{value:1},noiseSpeed:{value:.45},colorCycleSpeed:{value:2},colorCycleOffset:{value:0},color1:{value:new je("#e2e2e2")},color2:{value:new je("#515151")},colorDarkness:{value:0},colorWaveInfluence:{value:0},colorFrequencyShift:{value:0},colorAmplitudeEffect:{value:0},waveAmplitude:{value:.8},waveFrequency:{value:4},waveDepth:{value:.6},flowDirection:{value:new Et(-.7,.82)},noiseScale:{value:2.5},noiseInfluence:{value:0},layerOffset:{value:.4},yOffset:{value:.29},topEdgeSoftness:{value:1},bottomEdgeSoftness:{value:1},leftEdgeSoftness:{value:.2},rightEdgeSoftness:{value:.5},fadeWidth:{value:1},leftCornerRoundness:{value:.8},rightCornerRoundness:{value:1},edgeNoiseAmount:{value:.12},edgeNoiseScale:{value:3},edgeDepth:{value:.9},edgeContrast:{value:2},bottomWaveEnabled:{value:!0},bottomWaveDepth:{value:.117},bottomWaveWidth:{value:6.475},bottomWaveSpeed:{value:0},bottomWaveOffset:{value:-2.207},filmNoiseIntensity:{value:.088},filmNoiseSpeed:{value:1e-5},filmGrainSize:{value:10},filmScratchIntensity:{value:0},lightDirection:{value:new Y(.5,.5,1).normalize()},ambientLight:{value:.6},directionalLight:{value:.6},specularStrength:{value:0},shininess:{value:128},displacementStrength:{value:0},displacementScale:{value:1e-4},displacementDepth:{value:0},xOffset:{value:-.104}};const P=window.uniforms,_e=`
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
  `,we=`
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
  `,Se=new Vi(window.innerWidth,window.innerHeight,window.innerWidth/10,window.innerHeight/10),Q=new hi({vertexShader:_e,fragmentShader:we,uniforms:P,transparent:!0,side:Wi}),ee=new Qn(Se,Q);v.add(ee),window.gui=new lE({width:300,closed:!0});const q=window.gui;q.domElement.style.position="absolute",q.domElement.style.top="10px",q.domElement.style.right="10px";const Ie=q.domElement.querySelector(".close-button");Ie&&(Ie.innerHTML="Open Controls",Ie.addEventListener("click",function(){setTimeout(()=>{this.innerHTML=q.closed?"Open Controls":"Close Controls"},50)}));const be=q.addFolder("Camera Controls");be.add(E,"zoom",.1,5).name("Zoom Level").step(.001).onChange(S=>{R.zoom=S,R.updateProjectionMatrix()}),be.close();const qe=q.addFolder("Animation Speed Controls");qe.add(P.mainSpeed,"value",1e-4,.1).name("Main Speed").step(1e-4).onChange(S=>{P.mainSpeed.value=S}),qe.add(P.waveSpeed,"value",1e-4,5).name("Wave Speed").step(1e-4).onChange(S=>{P.waveSpeed.value=S}),qe.add(P.noiseSpeed,"value",1e-4,5).name("Noise Speed").step(1e-4).onChange(S=>{P.noiseSpeed.value=S}),qe.add(P.colorCycleSpeed,"value",1e-6,5).name("Color Cycle Speed").step(1e-6).onChange(S=>{P.colorCycleSpeed.value=S}),qe.add(P.colorCycleOffset,"value",0,6.28).name("Color Cycle Offset").step(.01).onChange(S=>{P.colorCycleOffset.value=S}),qe.open();const ht=q.addFolder("Color Controls"),Ne="#"+P.color1.value.getHexString(),at="#"+P.color2.value.getHexString();ht.addColor({color:Ne},"color").name("Color 1").onChange(S=>{typeof S=="string"?P.color1.value.set(S):P.color1.value.setRGB(S.r/255,S.g/255,S.b/255)}),ht.addColor({color:at},"color").name("Color 2").onChange(S=>{typeof S=="string"?P.color2.value.set(S):P.color2.value.setRGB(S.r/255,S.g/255,S.b/255)}),ht.add(P.colorDarkness,"value",0,2).name("Color Darkness").step(.001).onChange(S=>{P.colorDarkness.value=S}),ht.add(P.colorWaveInfluence,"value",0,1).name("Color → Wave Influence").onChange(S=>{P.colorWaveInfluence.value=S}),ht.add(P.colorFrequencyShift,"value",0,1).name("Color → Frequency Effect").onChange(S=>{P.colorFrequencyShift.value=S}),ht.add(P.colorAmplitudeEffect,"value",0,1).name("Color → Amplitude Effect").onChange(S=>{P.colorAmplitudeEffect.value=S}),ht.open();const U=q.addFolder("Wave Controls");U.add(P.waveAmplitude,"value",0,12).step(1e-4).name("Wave Amplitude").onChange(S=>{P.waveAmplitude.value=S}),U.add(P.waveFrequency,"value",.1,5).name("Wave Frequency").onChange(S=>{P.waveFrequency.value=S}),U.add(P.waveDepth,"value",0,1).name("Wave Depth Effect").onChange(S=>{P.waveDepth.value=S}),U.add(P.noiseScale,"value",0,5).name("Noise Scale").onChange(S=>{P.noiseScale.value=S}),U.add(P.noiseInfluence,"value",0,1).name("Noise Influence").onChange(S=>{P.noiseInfluence.value=S}),U.add(P.layerOffset,"value",0,1).name("Layer Depth Offset").onChange(S=>{P.layerOffset.value=S});const it=U.addFolder("Flow Direction");it.add(P.flowDirection.value,"x",-2,2).name("Horizontal Flow").onChange(S=>{P.flowDirection.value.x=S}),it.add(P.flowDirection.value,"y",-2,2).name("Vertical Flow").onChange(S=>{P.flowDirection.value.y=S});const H=q.addFolder("Appearance Controls"),rt=q.addFolder("Film Noise Controls");rt.add(P.filmNoiseIntensity,"value",0,1).name("Noise Intensity").onChange(S=>{P.filmNoiseIntensity.value=S}),rt.add(P.filmNoiseSpeed,"value",1e-5,5e-5).name("Noise Speed").step(1e-5).onChange(S=>{P.filmNoiseSpeed.value=S}),rt.add(P.filmGrainSize,"value",.5,50).name("Grain Size").onChange(S=>{P.filmGrainSize.value=S}),rt.add(P.filmScratchIntensity,"value",0,.1).name("Scratch Intensity").onChange(S=>{P.filmScratchIntensity.value=S}),H.add(P.xOffset,"value",-1,1).step(.001).name("X Position").onChange(S=>{P.xOffset.value=S}),H.add(P.yOffset,"value",-1,1).step(.001).name("Y Position").onChange(S=>{P.yOffset.value=S}),H.add(P.fadeWidth,"value",.1,1).name("Visible Area Size").onChange(S=>{P.fadeWidth.value=S}),H.add(P.topEdgeSoftness,"value",0,1).name("Top Edge Softness").onChange(S=>{P.topEdgeSoftness.value=S}),H.add(P.bottomEdgeSoftness,"value",0,1).name("Bottom Edge Softness").onChange(S=>{P.bottomEdgeSoftness.value=S}),H.add(P.leftEdgeSoftness,"value",0,1).name("Left Edge Softness").onChange(S=>{P.leftEdgeSoftness.value=S}),H.add(P.rightEdgeSoftness,"value",0,1).name("Right Edge Softness").onChange(S=>{P.rightEdgeSoftness.value=S}),H.add(P.leftCornerRoundness,"value",0,1).name("Left Corner Roundness").onChange(S=>{P.leftCornerRoundness.value=S}),H.add(P.rightCornerRoundness,"value",0,1).name("Right Corner Roundness").onChange(S=>{P.rightCornerRoundness.value=S}),H.add(P.edgeDepth,"value",.1,3).name("Edge Burn-in Depth").onChange(S=>{P.edgeDepth.value=S}),H.add(P.edgeContrast,"value",.5,3).name("Edge Contrast").onChange(S=>{P.edgeContrast.value=S}),H.add(P.edgeNoiseAmount,"value",0,1).name("Edge Noise Amount").onChange(S=>{P.edgeNoiseAmount.value=S}),H.add(P.edgeNoiseScale,"value",.5,10).name("Edge Noise Scale").onChange(S=>{P.edgeNoiseScale.value=S});const Ae=q.addFolder("Bottom Wave Edge Controls");Ae.add(P.bottomWaveEnabled,"value").name("Enable Bottom Wave").onChange(S=>{P.bottomWaveEnabled.value=S,F&&k.responsive&&ae()}),Ae.add(P.bottomWaveDepth,"value",0,.5).name("Wave Depth").step(.001).onChange(S=>{P.bottomWaveDepth.value=S,F&&k.responsive&&ae()}),Ae.add(P.bottomWaveWidth,"value",1,20).name("Wave Width").step(.001).onChange(S=>{P.bottomWaveWidth.value=S}),Ae.add(P.bottomWaveSpeed,"value",0,5).name("Wave Speed").step(.001).onChange(S=>{P.bottomWaveSpeed.value=S}),Ae.add(P.bottomWaveOffset,"value",-5,5).name("Wave Offset").step(.001).onChange(S=>{P.bottomWaveOffset.value=S});const gt=q.addFolder("Lighting Controls");gt.add(P.ambientLight,"value",0,1).name("Ambient Light").onChange(S=>{P.ambientLight.value=S}),gt.add(P.directionalLight,"value",0,1).name("Directional Light").step(.001).onChange(S=>{P.directionalLight.value=S}),gt.add(P.specularStrength,"value",0,1).step(.001).name("Specular Strength").onChange(S=>{P.specularStrength.value=S}),gt.add(P.shininess,"value",1,128).name("Shininess").onChange(S=>{P.shininess.value=S});const Le=gt.addFolder("Light Direction");Le.add(P.lightDirection.value,"x",-1,1).name("X").onChange(()=>{P.lightDirection.value.normalize()}),Le.add(P.lightDirection.value,"y",-1,1).name("Y").onChange(()=>{P.lightDirection.value.normalize()}),Le.add(P.lightDirection.value,"z",0,1).name("Z").onChange(()=>{P.lightDirection.value.normalize()});const ke=q.addFolder("Globe Model Controls"),I=new u_(16777215,10);I.position.set(1,1,1),v.add(I);const C=new d_(16777215,.5);v.add(C);const X=ke.addFolder("Lighting");X.add({intensity:3},"intensity",0,5).name("Direct Light").onChange(S=>{I.intensity=S}),I.intensity=3,X.add({intensity:C.intensity},"intensity",0,5).name("Ambient Light").onChange(S=>{C.intensity=S}),ke.add(k,"visible").name("Show Globe").onChange(S=>{F&&(F.visible=S)}),ke.add(k,"scale",.1,50).name("Size").step(.1).onChange(S=>{F&&(k.baseScale=S,F.scale.set(S,S,S))}),ke.add(k,"responsive").name("Responsive Size").onChange(S=>{!S&&F?F.scale.set(k.baseScale,k.baseScale,k.baseScale):S&&oe()}),ke.add({resizeGlobe:function(){F&&oe()}},"resizeGlobe").name("Force Resize"),ke.add({positionBehindWave:function(){F&&ae()}},"positionBehindWave").name("Position Behind Wave");function ae(){if(!F)return;const S=window.innerWidth;if(S<=640){F.position.y=192,F.position.z=-10;for(let se=0;se<ne.__controllers.length;se++){const pe=ne.__controllers[se];pe.property==="positionY"?pe.setValue(192):pe.property==="positionZ"&&pe.setValue(-10)}return}if(S>640&&S<=1024){F.position.y=192,F.position.z=-10;for(let pe=0;pe<ne.__controllers.length;pe++){const de=ne.__controllers[pe];de.property==="positionY"?de.setValue(192):de.property==="positionZ"&&de.setValue(-10)}return}const B=-40,V=-10;F.position.y=B,F.position.z=V;for(let se=0;se<ne.__controllers.length;se++){const pe=ne.__controllers[se];pe.property==="positionY"?pe.setValue(B):pe.property==="positionZ"&&pe.setValue(V)}}function oe(){if(!F||!k.responsive)return;const S=window.innerWidth;if(S>1024){F.scale.set(40,40,40);for(let pe=0;pe<ke.__controllers.length;pe++)if(ke.__controllers[pe].property==="scale"){ke.__controllers[pe].setValue(40);break}ae();return}let B;S<=640?B=S*1.2:B=S*.9;const V={x:F.scale.x,y:F.scale.y,z:F.scale.z};try{F.scale.set(1,1,1),F.updateMatrixWorld(!0);const se=new lr().setFromObject(F),pe=se.max.x-se.min.x;F.scale.set(V.x,V.y,V.z);const ut=(R.right-R.left)/R.zoom/S,mt=B*ut/pe;F.scale.set(mt,mt,mt);for(let pt=0;pt<ke.__controllers.length;pt++)if(ke.__controllers[pt].property==="scale"){ke.__controllers[pt].setValue(mt);break}ae()}catch(se){console.error("Error updating globe size:",se),F.scale.set(V.x,V.y,V.z)}}const ne=ke.addFolder("Position");ne.add(k,"positionX",-500,500).name("X Position").step(1).onChange(S=>{F&&(F.position.x=S)}),ne.add(k,"positionY",-500,500).name("Y Position").step(1).onChange(S=>{F&&(F.position.y=S)}),ne.add(k,"positionZ",-500,500).name("Z Position").step(1).onChange(S=>{F&&(F.position.z=S)});const Be=ke.addFolder("Rotation");Be.add(k,"rotationX",0,360).name("X Rotation").step(1).onChange(S=>{F&&(F.rotation.x=S*Math.PI/180)}),Be.add(k,"rotationY",0,360).name("Y Rotation").step(1).onChange(S=>{F&&(F.rotation.y=S*Math.PI/180)}),Be.add(k,"rotationZ",0,360).name("Z Rotation").step(1).onChange(S=>{F&&(F.rotation.z=S*Math.PI/180)}),ke.add(k,"autoRotate").name("Auto Rotate").onChange(S=>{k.autoRotate=S}),ke.add(k,"baseRotateSpeed",.05,1).name("Base Rotation Speed").step(.01).onChange(S=>{k.baseRotateSpeed=S}),ke.add(k,"scrollRotateSpeed",.05,1).name("Scroll Rotation Speed").step(.01).onChange(S=>{k.scrollRotateSpeed=S}),ke.open();const ye=q.addFolder("Gradient Overlay Controls");ye.add(N,"enabled").name("Show Overlay").onChange(S=>{L&&(L.visible=S)});const Qe=ye.add(N,"startOpacity",0,1).name("Top Opacity").step(.01).onChange(S=>{y&&(y.uniforms.startOpacity.value=S)});Qe.__li.querySelector(".property-name").innerHTML="Top Opacity (Top Edge)";const Pe=ye.add(N,"endOpacity",0,1).name("Bottom Opacity").step(.01).onChange(S=>{y&&(y.uniforms.endOpacity.value=S)});Pe.__li.querySelector(".property-name").innerHTML="Bottom Opacity (Bottom Edge)",ye.add(N,"yOffset",-2,2).name("Vertical Position (moves only)").step(.01).onChange(S=>{L&&j()}),ye.add(N,"offsetY",-1,1).name("Gradient Shift").step(.01).onChange(S=>{y&&(y.uniforms.offsetY.value=S)}),ye.add(N,"height",.1,5).name("Gradient Distribution (not size)").step(.1).onChange(S=>{y&&(y.uniforms.heightMultiplier.value=S)}),ye.addColor(N,"color").name("Color").onChange(S=>{y&&y.uniforms.overlayColor.value.set(S)}),ye.add({debugOverlay:function(){if(y){const S=y.uniforms.startOpacity.value,B=y.uniforms.endOpacity.value;y.uniforms.startOpacity.value=1,y.uniforms.endOpacity.value=1,y.uniforms.overlayColor.value.set("#FF00FF"),setTimeout(()=>{y.uniforms.startOpacity.value=S,y.uniforms.endOpacity.value=B,y.uniforms.overlayColor.value.set(N.color)},2e3)}}},"debugOverlay").name("Debug Visibility"),ye.open();let le=n.particleCount;console.log("[Background Init] Using particle count:",le);let me=new Float32Array(le*3),Ge=new Float32Array(le*3),Fe=new Float32Array(le*3),Ce=0,et=0;const D={scrollSpeed:.005,verticalSpread:1,horizontalSpread:.56,damping:.95,depthRange:1e3,sizeMin:1.1,sizeMax:4,floatSpeed:.8,verticalOffset:0};let ve=window.innerHeight*D.verticalSpread,ge=window.innerWidth*D.horizontalSpread;function xe(){const S=new Float32Array(le),B=new je(lt.color);for(let V=0;V<le;V++){const se=V*3,pe=Math.random(),de=D.sizeMin+pe*(D.sizeMax-D.sizeMin);S[V]=de/Te.uniforms.baseSize.value;const ut=.8+pe*.6;Fe[se]=B.r*ut,Fe[se+1]=B.g*ut,Fe[se+2]=B.b*ut}re.setAttribute("size",new Qt(S,1)),re.attributes.position.needsUpdate=!0,re.attributes.color.needsUpdate=!0,re.attributes.size.needsUpdate=!0}for(let S=0;S<le;S++){const B=S*3;me[B]=(Math.random()-.5)*ge,me[B+1]=(Math.random()-.5)*ve+D.verticalOffset,me[B+2]=Math.random()*500-250,Ge[B]=(Math.random()-.5)*.5,Ge[B+1]=(Math.random()-.5)*.5,Ge[B+2]=(Math.random()-.5)*.2;const V=new je("#25e5ff");Fe[B]=V.r,Fe[B+1]=V.g,Fe[B+2]=V.b}const re=new mi;re.setAttribute("position",new Qt(me,3)),re.setAttribute("color",new Qt(Fe,3)),el.track(re,"geometry");const ce=Ve();el.track(ce,"texture");function Ve(){const S=document.createElement("canvas");S.width=256,S.height=256;const B=S.getContext("2d"),V=B.createRadialGradient(S.width/2,S.height/2,0,S.width/2,S.height/2,S.width/2);V.addColorStop(0,"rgba(255, 255, 255, 1.0)"),V.addColorStop(.05,"rgba(255, 255, 255, 1.0)"),V.addColorStop(.2,"rgba(255, 255, 255, 0.9)"),V.addColorStop(.4,"rgba(255, 255, 255, 0.5)"),V.addColorStop(.6,"rgba(255, 255, 255, 0.3)"),V.addColorStop(.8,"rgba(255, 255, 255, 0.1)"),V.addColorStop(1,"rgba(255, 255, 255, 0)"),B.fillStyle=V,B.fillRect(0,0,S.width,S.height),B.beginPath(),B.moveTo(S.width/2,S.width*.3),B.lineTo(S.width/2,S.width*.7),B.moveTo(S.width*.3,S.height/2),B.lineTo(S.width*.7,S.height/2),B.moveTo(S.width*.35,S.height*.35),B.lineTo(S.width*.65,S.height*.65),B.moveTo(S.width*.65,S.height*.35),B.lineTo(S.width*.35,S.height*.65),B.strokeStyle="rgba(255, 255, 255, 1.0)",B.lineWidth=4,B.stroke();const se=B.createRadialGradient(S.width/2,S.height/2,S.width*.2,S.width/2,S.height/2,S.width*.7);se.addColorStop(0,"rgba(255, 255, 255, 0.3)"),se.addColorStop(.5,"rgba(255, 255, 255, 0.1)"),se.addColorStop(1,"rgba(255, 255, 255, 0)"),B.globalCompositeOperation="lighter",B.fillStyle=se,B.fillRect(0,0,S.width,S.height);const pe=new Pn(S);return pe.needsUpdate=!0,pe}const Te=new hi({uniforms:{baseSize:{value:6},opacity:{value:0},map:{value:ce},brightness:{value:1.4},haloStrength:{value:1.4},haloSize:{value:1.3}},vertexShader:`
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
    `,transparent:!0,blending:xu,depthWrite:!1,depthTest:!1}),Ft=new eh(re,Te);Ft.frustumCulled=!0,T.add(Ft);const Ee=q.addFolder("Particle System"),Ke={count:le};Ee.add(Ke,"count",100,1e3,10).name("Particle Count").onChange(S=>{le=Math.floor(S);const B=new Float32Array(le*3),V=new Float32Array(le*3),se=new Float32Array(le*3);for(let pe=0;pe<le;pe++){const de=pe*3;if(pe<me.length/3)B[de]=me[de],B[de+1]=me[de+1],B[de+2]=me[de+2],V[de]=Ge[de],V[de+1]=Ge[de+1],V[de+2]=Ge[de+2],se[de]=Fe[de],se[de+1]=Fe[de+1],se[de+2]=Fe[de+2];else{B[de]=(Math.random()-.5)*ge,B[de+1]=(Math.random()-.5)*ve+D.verticalOffset,B[de+2]=Math.random()*500-250,V[de]=(Math.random()-.5)*.5,V[de+1]=(Math.random()-.5)*.5,V[de+2]=(Math.random()-.5)*.2;const ut=new je(lt.color);se[de]=ut.r,se[de+1]=ut.g,se[de+2]=ut.b}}me=B,Ge=V,Fe=se,re.attributes.position&&(re.attributes.position.array=null),re.attributes.color&&(re.attributes.color.array=null),re.setAttribute("position",new Qt(me,3)),re.setAttribute("color",new Qt(Fe,3)),re.attributes.position.needsUpdate=!0,re.attributes.color.needsUpdate=!0,xe()});const lt={color:"#25e5ff"};Ee.addColor(lt,"color").name("Particle Color").onChange(S=>{const B=new je(S);for(let V=0;V<le;V++){const se=V*3;Fe[se]=B.r,Fe[se+1]=B.g,Fe[se+2]=B.b}re.attributes.color?(re.attributes.color.array.set(Fe),re.attributes.color.needsUpdate=!0):re.setAttribute("color",new Qt(Fe,3))}),Ee.add(Te.uniforms.baseSize,"value",2,15,.5).name("Base Particle Size").onChange(S=>{xe()}),Ee.add(Te.uniforms.opacity,"value",0,1,.1).name("Opacity"),Ee.add(Te.uniforms.brightness,"value",1,3,.1).name("Brightness").onChange(S=>{Te.uniforms.brightness.value=S});const De={intensity:1.5};Ee.add(De,"intensity",.1,3,.1).name("Sparkle Intensity").onChange(S=>{Te.uniforms.opacity.value=S});const ct={enabled:!1},tt=Ee.add(ct,"enabled").name("Size Attenuation").onChange(S=>{S?Te.vertexShader=`
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
        `,Te.needsUpdate=!0,xe()}),Xe=document.createElement("div");Xe.className="gui-tooltip",Xe.textContent="When enabled, particles appear smaller as they move further away",Xe.style.position="absolute",Xe.style.backgroundColor="rgba(0,0,0,0.8)",Xe.style.color="#fff",Xe.style.padding="5px",Xe.style.borderRadius="3px",Xe.style.fontSize="11px",Xe.style.zIndex="10000",Xe.style.display="none",document.body.appendChild(Xe);const tn=tt.domElement;tn.addEventListener("mouseenter",S=>{const B=tn.getBoundingClientRect();Xe.style.left=B.right+"px",Xe.style.top=B.top+"px",Xe.style.display="block"}),tn.addEventListener("mouseleave",()=>{Xe.style.display="none"});let _t=0;window.addEventListener("scroll",()=>{Ce=window.scrollY});let xt=[],Dt={x:0,y:0},Vt={x:0,y:0},kt=0,At=0,fn=!1,Ht=250,Gt=[],ei=10,qt,Yt=!1,Kt=[];const A={enabled:!1,mobileDisabled:!n.mouseParticles,spawnRate:t==="high"?.52:t==="medium"?.35:0,maxParticles:t==="high"?150:t==="medium"?75:0,baseSize:1.9,fadeInSpeed:.62,fadeOutSpeed:.88,trailLength:5e-4,speedVariation:.2,jitterAmount:.08,spawnOffsetMin:.08,spawnOffsetMax:.8,minLifetime:1.5,maxLifetime:3.5,drawnLife:12};qt=A.spawnOffsetMin,window.enableMouseParticles=function(){A.mobileDisabled||(A.enabled=!0)};const z=new mi;el.track(z,"geometry");const K=new hi({uniforms:{baseSize:{value:A.baseSize},map:{value:ce},brightness:{value:1.4},haloStrength:{value:1.4},haloSize:{value:1.3}},vertexShader:`
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
    `,transparent:!0,blending:xu,depthWrite:!1,depthTest:!1}),Z=new eh(z,K);T.add(Z);function G(S,B){const V=S/window.innerWidth*2-1,se=-(B/window.innerHeight)*2+1,pe=V*(R.right-R.left)/2/R.zoom,de=se*(R.top-R.bottom)/2/R.zoom;return{x:pe,y:de}}function Me(S,B){return{id:kt++,position:{x:S,y:B,z:Math.random()*100-50},targetPosition:{x:S,y:B},velocity:{x:0,y:0},size:.8+Math.random()*.4,opacity:0,targetOpacity:1,life:0,maxLife:A.minLifetime+Math.random()*(A.maxLifetime-A.minLifetime),color:{r:.145,g:.898,b:1},trailSpeed:.05+Math.random()*.03,fadePhase:"in"}}function Oe(S,B){return{id:kt++,position:{x:S,y:B,z:Math.random()*100-50},originalPosition:{x:S,y:B},targetPosition:{x:S,y:B},velocity:{x:0,y:0},size:.8+Math.random()*.4,opacity:0,baseOpacity:0,targetOpacity:1,life:0,maxLife:A.drawnLife,color:{r:1,g:.647,b:0},trailSpeed:0,fadePhase:"in",isDrawn:!0,twinklePhase:Math.random()*Math.PI*2,twinkleSpeed:.8+Math.random()*.4,twinkleRadius:2+Math.random()*3}}let ze=0;function Re(){const S=[...xt,...Kt],B=S.length;if(B===0){if(ze===0)return;z.deleteAttribute("position"),z.deleteAttribute("color"),z.deleteAttribute("size"),z.deleteAttribute("opacity"),ze=0;return}const V=new Float32Array(B*3),se=new Float32Array(B*3),pe=new Float32Array(B),de=new Float32Array(B);for(let Je=0;Je<B;Je++){const mt=S[Je],pt=Je*3;V[pt]=mt.position.x,V[pt+1]=mt.position.y,V[pt+2]=mt.position.z,se[pt]=mt.color.r,se[pt+1]=mt.color.g,se[pt+2]=mt.color.b,pe[Je]=mt.size,de[Je]=mt.opacity}B!==ze?(z.attributes.position&&(z.deleteAttribute("position"),z.deleteAttribute("color"),z.deleteAttribute("size"),z.deleteAttribute("opacity")),z.setAttribute("position",new Qt(V,3)),z.setAttribute("color",new Qt(se,3)),z.setAttribute("size",new Qt(pe,1)),z.setAttribute("opacity",new Qt(de,1)),ze=B):(z.attributes.position.array.set(V),z.attributes.color.array.set(se),z.attributes.size.array.set(pe),z.attributes.opacity.array.set(de),z.attributes.position.needsUpdate=!0,z.attributes.color.needsUpdate=!0,z.attributes.size.needsUpdate=!0,z.attributes.opacity.needsUpdate=!0)}window.addEventListener("mousemove",S=>{if(!A.enabled||A.mobileDisabled)return;Vt.x=Dt.x,Vt.y=Dt.y,Dt.x=S.clientX,Dt.y=S.clientY;const B=Dt.x-Vt.x,V=Dt.y-Vt.y,se=Math.sqrt(B*B+V*V);if(fn||(At+=se,At>=Ht&&(fn=!0)),Gt.push(se),Gt.length>ei&&Gt.shift(),Gt.length>0){const pe=Gt.reduce((Je,mt)=>Je+mt,0)/Gt.length,ut=Math.min(pe/20,1);qt=A.spawnOffsetMin+(A.spawnOffsetMax-A.spawnOffsetMin)*ut}if(fn&&se>1&&xt.length<A.maxParticles&&Math.random()<A.spawnRate){const pe=G(Dt.x,Dt.y),de=qt*50,ut=Math.random()*Math.PI*2,Je=Math.cos(ut)*de*Math.random(),mt=Math.sin(ut)*de*Math.random(),pt=Me(pe.x+Je,pe.y+mt);xt.push(pt)}if(Yt&&xt.length<A.maxParticles&&Math.random()<.8){const pe=G(Dt.x,Dt.y),de=10,ut=Math.random()*Math.PI*2,Je=Math.cos(ut)*de*Math.random(),mt=Math.sin(ut)*de*Math.random(),pt=Oe(pe.x+Je,pe.y+mt);Kt.push(pt)}}),window.addEventListener("mousedown",S=>{!A.enabled||A.mobileDisabled||S.button===0&&(Yt=!0)}),window.addEventListener("mouseup",S=>{S.button===0&&(Yt=!1)});let Ze={x:0,y:0},He={x:0,y:0},$e=!1;window.addEventListener("touchstart",S=>{if(!A.enabled||A.mobileDisabled)return;const B=S.target;B.tagName==="BUTTON"||B.tagName==="A"||B.closest("button")||B.closest("a")||B.closest("header")||B.closest("nav")||S.preventDefault();const se=S.touches[0];He.x=se.clientX,He.y=se.clientY,Ze.x=He.x,Ze.y=He.y,$e=!0,Yt=!0},{passive:!1}),window.addEventListener("touchmove",S=>{if(!A.enabled||A.mobileDisabled||!$e)return;const B=S.target;B.tagName==="BUTTON"||B.tagName==="A"||B.closest("button")||B.closest("a")||B.closest("header")||B.closest("nav")||S.preventDefault();const se=S.touches[0];Ze.x=He.x,Ze.y=He.y,He.x=se.clientX,He.y=se.clientY,Dt.x=He.x,Dt.y=He.y;const pe=He.x-Ze.x,de=He.y-Ze.y,ut=Math.sqrt(pe*pe+de*de);if(fn||(At+=ut,At>=Ht&&(fn=!0)),Gt.push(ut),Gt.length>ei&&Gt.shift(),Gt.length>0){const Je=Gt.reduce((Po,Lo)=>Po+Lo,0)/Gt.length,pt=Math.min(Je/20,1);qt=A.spawnOffsetMin+(A.spawnOffsetMax-A.spawnOffsetMin)*pt}if(fn&&ut>1&&xt.length<A.maxParticles&&Math.random()<A.spawnRate){const Je=G(He.x,He.y),mt=qt*50,pt=Math.random()*Math.PI*2,Po=Math.cos(pt)*mt*Math.random(),Lo=Math.sin(pt)*mt*Math.random(),Do=Me(Je.x+Po,Je.y+Lo);xt.push(Do)}if(Yt&&xt.length<A.maxParticles&&Math.random()<.8){const Je=G(He.x,He.y),mt=10,pt=Math.random()*Math.PI*2,Po=Math.cos(pt)*mt*Math.random(),Lo=Math.sin(pt)*mt*Math.random(),Do=Oe(Je.x+Po,Je.y+Lo);Kt.push(Do)}},{passive:!1}),window.addEventListener("touchend",S=>{$e=!1,Yt=!1}),window.addEventListener("touchcancel",S=>{$e=!1,Yt=!1});function St(){if(xt.length===0&&Kt.length===0||A.mobileDisabled)return;const S=G(Dt.x,Dt.y);for(let B=xt.length-1;B>=0;B--){const V=xt[B];if(V.life+=.016,!V.isDrawn){V.targetPosition.x=S.x,V.targetPosition.y=S.y;const pe=V.trailSpeed*A.trailLength;V.position.x+=(V.targetPosition.x-V.position.x)*pe,V.position.y+=(V.targetPosition.y-V.position.y)*pe,V.position.x+=(Math.random()-.5)*2*A.jitterAmount,V.position.y+=(Math.random()-.5)*2*A.jitterAmount}const se=V.life/V.maxLife;if(se<.15){V.fadePhase="in";const pe=se/.15,de=1-Math.pow(1-pe,2);V.opacity=de*A.fadeInSpeed}else if(se<.65)V.fadePhase="hold",V.opacity=A.fadeInSpeed;else{V.fadePhase="out";const pe=(se-.65)/.35,de=Math.pow(1-pe,2);V.opacity=de*A.fadeInSpeed*A.fadeOutSpeed}(V.life>=V.maxLife||V.opacity<=0)&&xt.splice(B,1)}for(let B=Kt.length-1;B>=0;B--){const V=Kt[B];V.life+=.016,V.twinklePhase+=.016*V.twinkleSpeed;const se=Math.sin(V.twinklePhase)*V.twinkleRadius*.4,pe=Math.cos(V.twinklePhase*1.05)*V.twinkleRadius*.4;V.position.x=V.originalPosition.x+se,V.position.y=V.originalPosition.y+pe;const de=V.life/V.maxLife;if(de<.15){V.fadePhase="in";const Je=de/.15,mt=1-Math.pow(1-Je,2);V.baseOpacity=mt*A.fadeInSpeed}else if(de<.85)V.fadePhase="hold",V.baseOpacity=A.fadeInSpeed;else{V.fadePhase="out";const Je=(de-.85)/.15,mt=Math.pow(1-Je,2);V.baseOpacity=mt*A.fadeInSpeed*A.fadeOutSpeed}const ut=.7+.3*Math.sin(V.twinklePhase*2);V.opacity=V.baseOpacity*ut,(V.life>=V.maxLife||V.opacity<=0)&&Kt.splice(B,1)}Re(),an.currentOffset=qt}const ft=q.addFolder("Mouse Follow Particles");ft.add({mobileDetected:A.mobileDisabled},"mobileDetected").name("Mobile Detected (Disabled)").listen(),ft.add(A,"enabled").name("Enable Mouse Particles").onChange(S=>{S||(xt=[],Kt=[],Re(),fn=!1,At=0,Gt=[],qt=A.spawnOffsetMin,Yt=!1)}),ft.add(A,"spawnRate",.1,1,.1).name("Spawn Rate").onChange(S=>{A.spawnRate=S}),ft.add(A,"maxParticles",10,50,1).name("Max Particles").onChange(S=>{for(A.maxParticles=S;xt.length>S;)xt.pop();Re()}),ft.add(A,"baseSize",2,10,.5).name("Particle Size").onChange(S=>{K.uniforms.baseSize.value=S}),ft.add(A,"trailLength",.1,1,.1).name("Trail Length").onChange(S=>{A.trailLength=S}),ft.add(A,"speedVariation",0,1,.1).name("Speed Variation").onChange(S=>{A.speedVariation=S}),ft.add(A,"jitterAmount",0,1,.05).name("Jitter Amount").onChange(S=>{A.jitterAmount=S}),ft.add(A,"spawnOffsetMin",0,1,.05).name("Spawn Offset Min").onChange(S=>{A.spawnOffsetMin=S}),ft.add(A,"spawnOffsetMax",0,1,.05).name("Spawn Offset Max").onChange(S=>{A.spawnOffsetMax=S});const an={currentOffset:qt};ft.add(an,"currentOffset",0,1).name("Current Offset (Dynamic)").listen(),ft.add(A,"fadeInSpeed",.1,1,.01).name("Max Opacity").onChange(S=>{A.fadeInSpeed=S}),ft.add(A,"fadeOutSpeed",.1,1,.01).name("Fade Strength").onChange(S=>{A.fadeOutSpeed=S}),ft.add(A,"drawnLife",1,10,.1).name("Drawn Particle Life").onChange(S=>{A.drawnLife=S}),ft.add({movementThreshold:Ht},"movementThreshold",100,400,10).name("Initial Movement Needed").onChange(S=>{Ht=S}),ft.add({resetActivation:function(){fn=!1,At=0,Gt=[],qt=A.spawnOffsetMin,xt=[],Kt=[],Yt=!1,Re()}},"resetActivation").name("Reset Activation"),ft.close();function cn(){const S=re.attributes.position.array,B=D.previousOffset||0,V=D.verticalOffset-B;D.previousOffset=D.verticalOffset;for(let se=0;se<le;se++){const pe=se*3;S[pe+1]+=V;const de=S[pe+1]-D.verticalOffset,ut=ve/2;de>ut?S[pe+1]=-ut+D.verticalOffset:de<-ut&&(S[pe+1]=ut+D.verticalOffset)}re.attributes.position.needsUpdate=!0}const Bt=new je;function st(){const S=re.attributes.position.array,B=re.attributes.color.array,V=re.attributes.size?re.attributes.size.array:null;_t+=.01;const se=(Ce-et)*D.scrollSpeed;if(et=Ce*(1-D.damping)+et*D.damping,!window.particlesMovementPaused){for(let pe=0;pe<le;pe++){const de=pe*3,ut=V?(V[pe]-D.sizeMin)/(D.sizeMax-D.sizeMin):.5,Je=D.floatSpeed*(.5+ut*.5);S[de]+=Ge[de]*Je,S[de+1]+=Ge[de+1]*Je,S[de+2]+=Ge[de+2]*Je,S[de+1]+=se*(.5+ut*.5),Math.abs(S[de])>ge/2&&(Ge[de]*=-1);const mt=S[de+1]-D.verticalOffset,pt=ve/2;mt>pt?S[de+1]=-pt+D.verticalOffset:mt<-pt&&(S[de+1]=pt+D.verticalOffset),Math.abs(S[de+2])>250&&(Ge[de+2]*=-1)}re.attributes.position.needsUpdate=!0}Bt.set(lt.color);for(let pe=0;pe<le;pe++){const de=pe*3,ut=V?(V[pe]-D.sizeMin)/(D.sizeMax-D.sizeMin):.5,Je=.2*Math.sin(_t+pe*.1)+.9,mt=.8+ut*.6;B[de]=Bt.r*Je*mt,B[de+1]=Bt.g*Je*mt,B[de+2]=Bt.b*Je*mt}re.attributes.color.needsUpdate=!0,requestAnimationFrame(st)}st();function ln(S){if(!window.backgroundPaused){if(P.time.value+=.001,o()&&Date.now()-i>s){const V=P.time.value+P.colorCycleOffset.value;P.colorCycleOffset.value=V,P.time.value=0,i=Date.now()}if(St(),!window.particlesFullyHidden&&Te.uniforms.opacity.value<M&&(Te.uniforms.opacity.value+=.001,Te.uniforms.opacity.value>M&&(Te.uniforms.opacity.value=M)),window.particlesFullyHidden&&Te.uniforms.opacity.value>0&&(Te.uniforms.opacity.value=0),F&&k.autoRotate&&!k.rotationPaused){const B=k.baseRotateSpeed;F.rotation.y+=B*.01}L&&(L.rotation.set(0,0,0),j()),x.autoClear=!0,x.render(v,R),(!window.particlesFullyHidden||xt.length>0&&A.enabled)&&(x.autoClear=!1,x.render(T,R))}}const Ct=new jE;window.shaderBackgroundPerfMonitor=Ct,new URLSearchParams(window.location.search).has("debugPerf")&&(Ct.createDebugOverlay(),console.log("[Background Init] Performance monitoring enabled")),Ct.setWarningCallback(S=>{console.warn("[Performance Warning]",S)});const Zi=new $E(S=>{ln(),Ct.update(x)},n.targetFPS);Zi.start(),window.shaderBackgroundRenderer=Zi,Object.defineProperty(window,"backgroundPaused",{get(){return this._backgroundPaused||!1},set(S){this._backgroundPaused=S,Zi&&Zi.setPausedByTimeline(S)}}),document.addEventListener("veryEarlyParticleFade",()=>{M=.3,Te&&Te.uniforms&&Te.uniforms.opacity&&Te.uniforms.opacity.value<.1&&(Te.uniforms.opacity.value=.05)}),document.addEventListener("particleFadeStart",()=>{M=.3}),document.addEventListener("heroAnimationComplete",()=>{M=.5});function In(){if(L){const S=window.innerHeight,B=R.right-R.left,se=(R.top-R.bottom)/S,pe=B,de=S*.66*se;L.geometry.dispose(),L.geometry=new Vi(pe,de),L.rotation.set(0,0,0),j()}}let hr,Ut;function vn(){const S=window.innerWidth,B=m();if(x.setSize(S,B),R.left=-S/2,R.right=S/2,R.top=B/2,R.bottom=-B/2,R.updateProjectionMatrix(),P.resolution.value.set(S,B),ee.geometry.dispose(),ee.geometry=new Vi(S,B,S/10,B/10),ve=B*D.verticalSpread,ge=S*D.horizontalSpread,typeof q<"u"&&q&&q.__folders["Particle System"]){const V=q.__folders["Particle System"];if(V&&V.__controllers){for(let se=0;se<V.__controllers.length;se++)if(V.__controllers[se].property==="verticalOffset"){V.__controllers[se].min(-B*3),V.__controllers[se].max(B*2);break}}}if(F&&k.responsive){clearTimeout(Ut),Ut=setTimeout(()=>{oe()},150);for(let V=0;V<ne.__controllers.length;V++){const se=ne.__controllers[V];se.property==="positionX"?(se.min(-S/2),se.max(S/2)):se.property==="positionY"&&(se.min(-B/2),se.max(B/2))}}In()}window.addEventListener("resize",()=>{clearTimeout(hr),clearTimeout(Ut),F&&k.responsive&&(Ut=setTimeout(()=>{oe()},150)),hr=setTimeout(vn,150)}),window.addEventListener("orientationchange",()=>{clearTimeout(hr),clearTimeout(Ut),F&&k.responsive&&(Ut=setTimeout(()=>{oe()},300)),hr=setTimeout(vn,300)}),document.addEventListener("visibilitychange",()=>{if(document.visibilityState==="visible"){clearTimeout(Ut);const S=window.innerWidth,B=m();window.lastKnownDimensions||(window.lastKnownDimensions={width:S,height:B});const V=Math.abs(S-window.lastKnownDimensions.width)/window.lastKnownDimensions.width,se=Math.abs(B-window.lastKnownDimensions.height)/window.lastKnownDimensions.height;(V>.05||se>.05)&&(window.lastKnownDimensions.width=S,window.lastKnownDimensions.height=B,F&&k.responsive&&(Ut=setTimeout(()=>{oe()},150)),setTimeout(vn,100))}else window.lastKnownDimensions={width:window.innerWidth,height:m()}});let ti=m();function On(){const S=m();Math.abs(S-ti)>50&&(vn(),ti=S),requestAnimationFrame(On)}On(),window.addEventListener("keydown",S=>{if((S.key==="+"||S.key==="=")&&(E.zoom=Math.min(E.zoom+.1,5),R.zoom=E.zoom,R.updateProjectionMatrix(),typeof q<"u"&&q&&q.__folders["Camera Controls"])){const B=q.__folders["Camera Controls"];if(B&&B.__controllers){for(let V=0;V<B.__controllers.length;V++)if(B.__controllers[V].property==="zoom"){B.__controllers[V].updateDisplay();break}}}if((S.key==="-"||S.key==="_")&&(E.zoom=Math.max(E.zoom-.1,.1),R.zoom=E.zoom,R.updateProjectionMatrix(),typeof q<"u"&&q&&q.__folders["Camera Controls"])){const B=q.__folders["Camera Controls"];if(B&&B.__controllers){for(let V=0;V<B.__controllers.length;V++)if(B.__controllers[V].property==="zoom"){B.__controllers[V].updateDisplay();break}}}}),Ee.add(D,"scrollSpeed",.001,.05,.018).name("Scroll Sensitivity").step(.001).onChange(S=>{D.scrollSpeed=S}),Ee.add(D,"damping",.8,.99,.01).name("Scroll Damping").onChange(S=>{D.damping=S}),Ee.add(D,"verticalSpread",1,5,.5).name("Vertical Spread").onChange(S=>{const B=ve;ve=window.innerHeight*S;const V=ve/B,se=re.attributes.position.array;for(let pe=0;pe<le;pe++){const de=pe*3,Je=(se[de+1]-D.verticalOffset)*V;se[de+1]=Je+D.verticalOffset,Math.abs(Je)>ve/2&&(se[de+1]=(Math.random()-.5)*ve+D.verticalOffset)}re.attributes.position.needsUpdate=!0}),Ee.add(D,"horizontalSpread",.02,5,.01).name("Horizontal Spread").onChange(S=>{const B=ge;ge=window.innerWidth*S;const V=ge/B,se=re.attributes.position.array;for(let pe=0;pe<le;pe++){const de=pe*3,Je=se[de]*V;se[de]=Je,Math.abs(Je)>ge/2&&(se[de]=(Math.random()-.5)*ge)}re.attributes.position.needsUpdate=!0}),Ee.add(D,"verticalOffset",-window.innerHeight*3,window.innerHeight*2,10).name("Vertical Position").onChange(S=>{D.previousOffset===void 0&&(D.previousOffset=0),D.verticalOffset=S,cn()}),Ee.add(D,"sizeMin",1,5,.01).name("Min Particle Size").onChange(S=>{if(D.sizeMin=S,D.sizeMin>=D.sizeMax&&(D.sizeMax=D.sizeMin+1,typeof q<"u"&&q&&q.__folders["Particle System"])){const B=q.__folders["Particle System"];if(B&&B.__controllers){for(let V=0;V<B.__controllers.length;V++)if(B.__controllers[V].property==="sizeMax"){B.__controllers[V].updateDisplay();break}}}xe()}),Ee.add(D,"sizeMax",5,10,.01).name("Max Particle Size").onChange(S=>{if(D.sizeMax=S,D.sizeMax<=D.sizeMin&&(D.sizeMin=D.sizeMax-1,typeof q<"u"&&q&&q.__folders["Particle System"])){const B=q.__folders["Particle System"];if(B&&B.__controllers){for(let V=0;V<B.__controllers.length;V++)if(B.__controllers[V].property==="sizeMin"){B.__controllers[V].updateDisplay();break}}}xe()}),Ee.add(D,"floatSpeed",.1,3,.1).name("Float Speed").onChange(S=>{D.floatSpeed=S}),xe();const Gn=re.attributes.position.array;for(let S=0;S<le;S++){const B=S*3;Gn[B+1]=(Math.random()-.5)*ve+D.verticalOffset}re.attributes.position.needsUpdate=!0,Ee.add(Te.uniforms.haloStrength,"value",0,2,.1).name("Halo Intensity").onChange(S=>{Te.uniforms.haloStrength.value=S}),Ee.add(Te.uniforms.haloSize,"value",1,2,.1).name("Halo Size").onChange(S=>{Te.uniforms.haloSize.value=S});let Hs;window.addEventListener("scroll",()=>{Hs&&clearTimeout(Hs),Hs=setTimeout(()=>{},150)})}function Ks(){const r=window.gui,e=window.uniforms;if(typeof r>"u"||!r||!r.__folders||!r.__folders["Lighting Controls"])return;const t=r.__folders["Lighting Controls"];for(let n=0;n<t.__controllers.length;n++){const i=t.__controllers[n];i.property==="value"&&i.object===e.ambientLight&&i.setValue(e.ambientLight.value),i.property==="value"&&i.object===e.directionalLight&&i.setValue(e.directionalLight.value)}}function Vr(){const r=window.gui,e=window.uniforms;if(r.__folders["Animation Speed Controls"]){const t=r.__folders["Animation Speed Controls"];for(let n=0;n<t.__controllers.length;n++){const i=t.__controllers[n];if(i.property==="value"&&i.object===e.waveSpeed){i.setValue(e.waveSpeed.value);break}}}if(r.__folders["Wave Controls"]){const t=r.__folders["Wave Controls"];for(let n=0;n<t.__controllers.length;n++){const i=t.__controllers[n];i.property==="value"&&i.object===e.waveAmplitude&&i.setValue(e.waveAmplitude.value),i.property==="value"&&i.object===e.waveFrequency&&i.setValue(e.waveFrequency.value)}}}const QE="/150-lab/assets/video/acs-150-compressed.mp4",eA="/150-lab/assets/images/anniversary-video-poster.jpg";let Xd=!1;function tA(){const r=document.getElementById("anniversary-video"),e=document.querySelector("#video");if(!r||!e)return;r.src=QE,r.poster=eA,r.addEventListener("error",P=>{var _e,we;console.error("Video loading error:",P),console.error("Video src:",r.src),console.error("Video error code:",(_e=r.error)==null?void 0:_e.code),console.error("Video error message:",(we=r.error)==null?void 0:we.message)}),r.addEventListener("loadeddata",()=>{r.style.opacity="1",r.pause()}),r.addEventListener("loadedmetadata",()=>{r.style.display="none",r.offsetHeight,r.style.display=""});const t=document.createElement("div");t.className="video-overlay";const n=document.createElement("div");n.className="play-button",t.appendChild(n),r.parentNode.insertBefore(t,r.nextSibling);const i=document.createElement("div");i.className="video-audio-slider",i.innerHTML=`
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
  `,r.parentNode.appendChild(c);let h=!1;const _=.3,g=.18,m=()=>{const _e=r.volume/_*100;o.style.width=_e+"%",a.style.left=_e+"%"},p=P=>{const _e=s.getBoundingClientRect(),Se=Math.max(0,Math.min(100,(P-_e.left)/_e.width*100))/100*_;if(window.audioMuted&&Se>0){const Q=document.querySelector(".sound-toggle");Q&&Q.classList.contains("muted")&&(Xd=!0,Q.click(),setTimeout(()=>{Xd=!1},100))}Se>0?r.muted=!1:r.muted=!0,r.volume=Se,Se>0&&(j=Se),m()};s.addEventListener("mousedown",P=>{h=!0,p(P.clientX),P.preventDefault()}),document.addEventListener("mousemove",P=>{h&&p(P.clientX)}),document.addEventListener("mouseup",()=>{h=!1});const b=r.parentNode;b.addEventListener("mouseenter",()=>{r.paused||(i.style.opacity="1",i.style.pointerEvents="auto")}),b.addEventListener("mouseleave",()=>{i.style.opacity="0",i.style.pointerEvents="none"}),r.addEventListener("volumechange",m),r.volume=g,window.audioMuted?(r.muted=!0,r.volume=0):r.muted=!1,m();let x=!1;const v=()=>{if(r.duration&&!x){const P=r.currentTime/r.duration*100;d.style.transition="none",d.style.width=P+"%",f.style.left=P+"%"}},T=P=>{const _e=u.getBoundingClientRect(),Se=Math.max(0,Math.min(100,(P-_e.left)/_e.width*100))/100*r.duration;r.currentTime=Se,v(),r.paused||L()},M=()=>{d.style.transition="none",f.style.transition="opacity 0.2s"},E=()=>{d.style.transition="width 0.1s linear",f.style.transition="opacity 0.2s"};u.addEventListener("mousedown",P=>{x=!0,M(),T(P.clientX),P.preventDefault()}),u.addEventListener("click",P=>{x||(M(),T(P.clientX),setTimeout(()=>{E()},50))}),document.addEventListener("mousemove",P=>{x&&T(P.clientX)}),document.addEventListener("mouseup",()=>{x=!1,E()}),c.addEventListener("mouseenter",()=>{f.style.opacity="1",c.style.height="8px",c.style.background="rgba(0, 0, 0, 0.3)"}),c.addEventListener("mouseleave",()=>{x||(f.style.opacity="0"),c.style.height="4px",c.style.background="rgba(0, 0, 0, 0)"});let R=null,w=0;const y=()=>{if(r.duration&&!x&&!r.paused){const P=performance.now();if(P-w>=16.67){const _e=r.currentTime/r.duration*100;d.style.width=_e+"%",f.style.left=_e+"%",w=P}R=requestAnimationFrame(y)}},L=()=>{R&&cancelAnimationFrame(R),w=performance.now(),R=requestAnimationFrame(y)},N=()=>{R&&(cancelAnimationFrame(R),R=null)};r.addEventListener("play",L),r.addEventListener("pause",N),r.addEventListener("timeupdate",v),v();const W=(P,_e,we=1e3)=>{if(!P)return;const Se=P.volume,Q=performance.now(),ee=q=>{const Ie=q-Q,be=Math.min(Ie/we,1),qe=be*be;P.volume=Se+(_e-Se)*qe,be<1&&requestAnimationFrame(ee)};requestAnimationFrame(ee)};let j=g,k=null;const J=()=>{r.paused||(j=r.volume,W(r,0,600),k=setTimeout(()=>{r.pause(),t.classList.remove("hidden"),i.style.opacity="0",i.style.pointerEvents="none",window.backgroundAudio&&!window.audioMuted&&W(window.backgroundAudio,.25),k=null},600))},te=()=>{r.paused||(k&&(clearTimeout(k),k=null),r.pause(),t.classList.remove("hidden"),i.style.opacity="0",i.style.pointerEvents="none",window.backgroundAudio&&!window.audioMuted&&W(window.backgroundAudio,.25))},F=()=>{r.paused?(k&&(clearTimeout(k),k=null),r.play(),t.classList.add("hidden"),window.backgroundAudio&&W(window.backgroundAudio,0),window.audioMuted?(r.volume=0,r.muted=!0):(r.muted=!1,r.volume=j),m(),L()):te()};t.addEventListener("click",F),r.addEventListener("click",F),r.addEventListener("ended",()=>{t.classList.remove("hidden"),i.style.opacity="0",i.style.pointerEvents="none",window.backgroundAudio&&!window.audioMuted&&W(window.backgroundAudio,.25)}),r.addEventListener("pause",()=>{t.classList.remove("hidden"),i.style.opacity="0",i.style.pointerEvents="none",window.backgroundAudio&&!window.audioMuted&&W(window.backgroundAudio,.25)}),new IntersectionObserver(P=>{P.forEach(_e=>{_e.isIntersecting||J()})},{threshold:.5}).observe(e);const O=()=>{!r.paused&&!r.ended&&(window.audioMuted?(r.volume=0,r.muted=!0):(r.muted=!1,Xd||(r.volume=j),window.backgroundAudio&&!window.backgroundAudio.paused&&W(window.backgroundAudio,0)),m())},$=document.querySelector(".sound-toggle");if($){$.addEventListener("click",()=>{setTimeout(()=>{O()},50)}),new MutationObserver(we=>{we.forEach(Se=>{Se.type==="attributes"&&Se.attributeName==="class"&&setTimeout(()=>{O()},50)})}).observe($,{attributes:!0,attributeFilter:["class"]});let _e=window.audioMuted;setInterval(()=>{window.audioMuted!==_e&&(_e=window.audioMuted,O())},500),setTimeout(()=>{O()},1e3)}}function Gr(r){if(r===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return r}function C_(r,e){r.prototype=Object.create(e.prototype),r.prototype.constructor=r,r.__proto__=e}/*!
 * GSAP 3.12.7
 * https://gsap.com
 *
 * @license Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license or for
 * Club GSAP members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/var Oi={autoSleep:120,force3D:"auto",nullTargetWarn:1,units:{lineHeight:""}},Ra={duration:.5,overwrite:!1,delay:0},hp,Hn,un,qi=1e8,en=1/qi,uh=Math.PI*2,nA=uh/4,iA=0,R_=Math.sqrt,rA=Math.cos,sA=Math.sin,Bn=function(e){return typeof e=="string"},gn=function(e){return typeof e=="function"},ns=function(e){return typeof e=="number"},pp=function(e){return typeof e>"u"},Dr=function(e){return typeof e=="object"},vi=function(e){return e!==!1},mp=function(){return typeof window<"u"},kc=function(e){return gn(e)||Bn(e)},P_=typeof ArrayBuffer=="function"&&ArrayBuffer.isView||function(){},Zn=Array.isArray,dh=/(?:-?\.?\d|\.)+/gi,L_=/[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,sa=/[-+=.]*\d+[.e-]*\d*[a-z%]*/g,qd=/[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,D_=/[+-]=-?[.\d]+/,I_=/[^,'"\[\]\s]+/gi,oA=/^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,hn,_r,fh,gp,Ni={},Ru={},O_,N_=function(e){return(Ru=Pa(e,Ni))&&Si},_p=function(e,t){return console.warn("Invalid property",e,"set to",t,"Missing plugin? gsap.registerPlugin()")},$l=function(e,t){return!t&&console.warn(e)},F_=function(e,t){return e&&(Ni[e]=t)&&Ru&&(Ru[e]=t)||Ni},jl=function(){return 0},aA={suppressEvents:!0,isStart:!0,kill:!1},au={suppressEvents:!0,kill:!1},lA={suppressEvents:!0},xp={},Rs=[],hh={},U_,Ri={},Yd={},S0=30,lu=[],vp="",yp=function(e){var t=e[0],n,i;if(Dr(t)||gn(t)||(e=[e]),!(n=(t._gsap||{}).harness)){for(i=lu.length;i--&&!lu[i].targetTest(t););n=lu[i]}for(i=e.length;i--;)e[i]&&(e[i]._gsap||(e[i]._gsap=new ax(e[i],n)))||e.splice(i,1);return e},ho=function(e){return e._gsap||yp(Yi(e))[0]._gsap},k_=function(e,t,n){return(n=e[t])&&gn(n)?e[t]():pp(n)&&e.getAttribute&&e.getAttribute(t)||n},yi=function(e,t){return(e=e.split(",")).forEach(t)||e},_n=function(e){return Math.round(e*1e5)/1e5||0},En=function(e){return Math.round(e*1e7)/1e7||0},da=function(e,t){var n=t.charAt(0),i=parseFloat(t.substr(2));return e=parseFloat(e),n==="+"?e+i:n==="-"?e-i:n==="*"?e*i:e/i},cA=function(e,t){for(var n=t.length,i=0;e.indexOf(t[i])<0&&++i<n;);return i<n},Pu=function(){var e=Rs.length,t=Rs.slice(0),n,i;for(hh={},Rs.length=0,n=0;n<e;n++)i=t[n],i&&i._lazy&&(i.render(i._lazy[0],i._lazy[1],!0)._lazy=0)},B_=function(e,t,n,i){Rs.length&&!Hn&&Pu(),e.render(t,n,Hn&&t<0&&(e._initted||e._startAt)),Rs.length&&!Hn&&Pu()},z_=function(e){var t=parseFloat(e);return(t||t===0)&&(e+"").match(I_).length<2?t:Bn(e)?e.trim():e},V_=function(e){return e},Fi=function(e,t){for(var n in t)n in e||(e[n]=t[n]);return e},uA=function(e){return function(t,n){for(var i in n)i in t||i==="duration"&&e||i==="ease"||(t[i]=n[i])}},Pa=function(e,t){for(var n in t)e[n]=t[n];return e},M0=function r(e,t){for(var n in t)n!=="__proto__"&&n!=="constructor"&&n!=="prototype"&&(e[n]=Dr(t[n])?r(e[n]||(e[n]={}),t[n]):t[n]);return e},Lu=function(e,t){var n={},i;for(i in e)i in t||(n[i]=e[i]);return n},Tl=function(e){var t=e.parent||hn,n=e.keyframes?uA(Zn(e.keyframes)):Fi;if(vi(e.inherit))for(;t;)n(e,t.vars.defaults),t=t.parent||t._dp;return e},dA=function(e,t){for(var n=e.length,i=n===t.length;i&&n--&&e[n]===t[n];);return n<0},H_=function(e,t,n,i,s){var o=e[i],a;if(s)for(a=t[s];o&&o[s]>a;)o=o._prev;return o?(t._next=o._next,o._next=t):(t._next=e[n],e[n]=t),t._next?t._next._prev=t:e[i]=t,t._prev=o,t.parent=t._dp=e,t},Zu=function(e,t,n,i){n===void 0&&(n="_first"),i===void 0&&(i="_last");var s=t._prev,o=t._next;s?s._next=o:e[n]===t&&(e[n]=o),o?o._prev=s:e[i]===t&&(e[i]=s),t._next=t._prev=t.parent=null},Ns=function(e,t){e.parent&&(!t||e.parent.autoRemoveChildren)&&e.parent.remove&&e.parent.remove(e),e._act=0},po=function(e,t){if(e&&(!t||t._end>e._dur||t._start<0))for(var n=e;n;)n._dirty=1,n=n.parent;return e},fA=function(e){for(var t=e.parent;t&&t.parent;)t._dirty=1,t.totalDuration(),t=t.parent;return e},ph=function(e,t,n,i){return e._startAt&&(Hn?e._startAt.revert(au):e.vars.immediateRender&&!e.vars.autoRevert||e._startAt.render(t,!0,i))},hA=function r(e){return!e||e._ts&&r(e.parent)},T0=function(e){return e._repeat?La(e._tTime,e=e.duration()+e._rDelay)*e:0},La=function(e,t){var n=Math.floor(e=En(e/t));return e&&n===e?n-1:n},Du=function(e,t){return(e-t._start)*t._ts+(t._ts>=0?0:t._dirty?t.totalDuration():t._tDur)},Ju=function(e){return e._end=En(e._start+(e._tDur/Math.abs(e._ts||e._rts||en)||0))},Qu=function(e,t){var n=e._dp;return n&&n.smoothChildTiming&&e._ts&&(e._start=En(n._time-(e._ts>0?t/e._ts:((e._dirty?e.totalDuration():e._tDur)-t)/-e._ts)),Ju(e),n._dirty||po(n,e)),e},G_=function(e,t){var n;if((t._time||!t._dur&&t._initted||t._start<e._time&&(t._dur||!t.add))&&(n=Du(e.rawTime(),t),(!t._dur||ac(0,t.totalDuration(),n)-t._tTime>en)&&t.render(n,!0)),po(e,t)._dp&&e._initted&&e._time>=e._dur&&e._ts){if(e._dur<e.duration())for(n=e;n._dp;)n.rawTime()>=0&&n.totalTime(n._tTime),n=n._dp;e._zTime=-en}},yr=function(e,t,n,i){return t.parent&&Ns(t),t._start=En((ns(n)?n:n||e!==hn?ki(e,n,t):e._time)+t._delay),t._end=En(t._start+(t.totalDuration()/Math.abs(t.timeScale())||0)),H_(e,t,"_first","_last",e._sort?"_start":0),mh(t)||(e._recent=t),i||G_(e,t),e._ts<0&&Qu(e,e._tTime),e},W_=function(e,t){return(Ni.ScrollTrigger||_p("scrollTrigger",t))&&Ni.ScrollTrigger.create(t,e)},X_=function(e,t,n,i,s){if(wp(e,t,s),!e._initted)return 1;if(!n&&e._pt&&!Hn&&(e._dur&&e.vars.lazy!==!1||!e._dur&&e.vars.lazy)&&U_!==Li.frame)return Rs.push(e),e._lazy=[s,i],1},pA=function r(e){var t=e.parent;return t&&t._ts&&t._initted&&!t._lock&&(t.rawTime()<0||r(t))},mh=function(e){var t=e.data;return t==="isFromStart"||t==="isStart"},mA=function(e,t,n,i){var s=e.ratio,o=t<0||!t&&(!e._start&&pA(e)&&!(!e._initted&&mh(e))||(e._ts<0||e._dp._ts<0)&&!mh(e))?0:1,a=e._rDelay,l=0,c,u,d;if(a&&e._repeat&&(l=ac(0,e._tDur,t),u=La(l,a),e._yoyo&&u&1&&(o=1-o),u!==La(e._tTime,a)&&(s=1-o,e.vars.repeatRefresh&&e._initted&&e.invalidate())),o!==s||Hn||i||e._zTime===en||!t&&e._zTime){if(!e._initted&&X_(e,t,i,n,l))return;for(d=e._zTime,e._zTime=t||(n?en:0),n||(n=t&&!d),e.ratio=o,e._from&&(o=1-o),e._time=0,e._tTime=l,c=e._pt;c;)c.r(o,c.d),c=c._next;t<0&&ph(e,t,n,!0),e._onUpdate&&!n&&Ii(e,"onUpdate"),l&&e._repeat&&!n&&e.parent&&Ii(e,"onRepeat"),(t>=e._tDur||t<0)&&e.ratio===o&&(o&&Ns(e,1),!n&&!Hn&&(Ii(e,o?"onComplete":"onReverseComplete",!0),e._prom&&e._prom()))}else e._zTime||(e._zTime=t)},gA=function(e,t,n){var i;if(n>t)for(i=e._first;i&&i._start<=n;){if(i.data==="isPause"&&i._start>t)return i;i=i._next}else for(i=e._last;i&&i._start>=n;){if(i.data==="isPause"&&i._start<t)return i;i=i._prev}},Da=function(e,t,n,i){var s=e._repeat,o=En(t)||0,a=e._tTime/e._tDur;return a&&!i&&(e._time*=o/e._dur),e._dur=o,e._tDur=s?s<0?1e10:En(o*(s+1)+e._rDelay*s):o,a>0&&!i&&Qu(e,e._tTime=e._tDur*a),e.parent&&Ju(e),n||po(e.parent,e),e},E0=function(e){return e instanceof di?po(e):Da(e,e._dur)},_A={_start:0,endTime:jl,totalDuration:jl},ki=function r(e,t,n){var i=e.labels,s=e._recent||_A,o=e.duration()>=qi?s.endTime(!1):e._dur,a,l,c;return Bn(t)&&(isNaN(t)||t in i)?(l=t.charAt(0),c=t.substr(-1)==="%",a=t.indexOf("="),l==="<"||l===">"?(a>=0&&(t=t.replace(/=/,"")),(l==="<"?s._start:s.endTime(s._repeat>=0))+(parseFloat(t.substr(1))||0)*(c?(a<0?s:n).totalDuration()/100:1)):a<0?(t in i||(i[t]=o),i[t]):(l=parseFloat(t.charAt(a-1)+t.substr(a+1)),c&&n&&(l=l/100*(Zn(n)?n[0]:n).totalDuration()),a>1?r(e,t.substr(0,a-1),n)+l:o+l)):t==null?o:+t},El=function(e,t,n){var i=ns(t[1]),s=(i?2:1)+(e<2?0:1),o=t[s],a,l;if(i&&(o.duration=t[1]),o.parent=n,e){for(a=o,l=n;l&&!("immediateRender"in a);)a=l.vars.defaults||{},l=vi(l.vars.inherit)&&l.parent;o.immediateRender=vi(a.immediateRender),e<2?o.runBackwards=1:o.startAt=t[s-1]}return new Mn(t[0],o,t[s+1])},Vs=function(e,t){return e||e===0?t(e):t},ac=function(e,t,n){return n<e?e:n>t?t:n},$n=function(e,t){return!Bn(e)||!(t=oA.exec(e))?"":t[1]},xA=function(e,t,n){return Vs(n,function(i){return ac(e,t,i)})},gh=[].slice,q_=function(e,t){return e&&Dr(e)&&"length"in e&&(!t&&!e.length||e.length-1 in e&&Dr(e[0]))&&!e.nodeType&&e!==_r},vA=function(e,t,n){return n===void 0&&(n=[]),e.forEach(function(i){var s;return Bn(i)&&!t||q_(i,1)?(s=n).push.apply(s,Yi(i)):n.push(i)})||n},Yi=function(e,t,n){return un&&!t&&un.selector?un.selector(e):Bn(e)&&!n&&(fh||!Ia())?gh.call((t||gp).querySelectorAll(e),0):Zn(e)?vA(e,n):q_(e)?gh.call(e,0):e?[e]:[]},_h=function(e){return e=Yi(e)[0]||$l("Invalid scope")||{},function(t){var n=e.current||e.nativeElement||e;return Yi(t,n.querySelectorAll?n:n===e?$l("Invalid scope")||gp.createElement("div"):e)}},Y_=function(e){return e.sort(function(){return .5-Math.random()})},$_=function(e){if(gn(e))return e;var t=Dr(e)?e:{each:e},n=mo(t.ease),i=t.from||0,s=parseFloat(t.base)||0,o={},a=i>0&&i<1,l=isNaN(i)||a,c=t.axis,u=i,d=i;return Bn(i)?u=d={center:.5,edges:.5,end:1}[i]||0:!a&&l&&(u=i[0],d=i[1]),function(f,h,_){var g=(_||t).length,m=o[g],p,b,x,v,T,M,E,R,w;if(!m){if(w=t.grid==="auto"?0:(t.grid||[1,qi])[1],!w){for(E=-qi;E<(E=_[w++].getBoundingClientRect().left)&&w<g;);w<g&&w--}for(m=o[g]=[],p=l?Math.min(w,g)*u-.5:i%w,b=w===qi?0:l?g*d/w-.5:i/w|0,E=0,R=qi,M=0;M<g;M++)x=M%w-p,v=b-(M/w|0),m[M]=T=c?Math.abs(c==="y"?v:x):R_(x*x+v*v),T>E&&(E=T),T<R&&(R=T);i==="random"&&Y_(m),m.max=E-R,m.min=R,m.v=g=(parseFloat(t.amount)||parseFloat(t.each)*(w>g?g-1:c?c==="y"?g/w:w:Math.max(w,g/w))||0)*(i==="edges"?-1:1),m.b=g<0?s-g:s,m.u=$n(t.amount||t.each)||0,n=n&&g<0?rx(n):n}return g=(m[f]-m.min)/m.max||0,En(m.b+(n?n(g):g)*m.v)+m.u}},xh=function(e){var t=Math.pow(10,((e+"").split(".")[1]||"").length);return function(n){var i=En(Math.round(parseFloat(n)/e)*e*t);return(i-i%1)/t+(ns(n)?0:$n(n))}},j_=function(e,t){var n=Zn(e),i,s;return!n&&Dr(e)&&(i=n=e.radius||qi,e.values?(e=Yi(e.values),(s=!ns(e[0]))&&(i*=i)):e=xh(e.increment)),Vs(t,n?gn(e)?function(o){return s=e(o),Math.abs(s-o)<=i?s:o}:function(o){for(var a=parseFloat(s?o.x:o),l=parseFloat(s?o.y:0),c=qi,u=0,d=e.length,f,h;d--;)s?(f=e[d].x-a,h=e[d].y-l,f=f*f+h*h):f=Math.abs(e[d]-a),f<c&&(c=f,u=d);return u=!i||c<=i?e[u]:o,s||u===o||ns(o)?u:u+$n(o)}:xh(e))},K_=function(e,t,n,i){return Vs(Zn(e)?!t:n===!0?!!(n=0):!i,function(){return Zn(e)?e[~~(Math.random()*e.length)]:(n=n||1e-5)&&(i=n<1?Math.pow(10,(n+"").length-2):1)&&Math.floor(Math.round((e-n/2+Math.random()*(t-e+n*.99))/n)*n*i)/i})},yA=function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return function(i){return t.reduce(function(s,o){return o(s)},i)}},bA=function(e,t){return function(n){return e(parseFloat(n))+(t||$n(n))}},wA=function(e,t,n){return J_(e,t,0,1,n)},Z_=function(e,t,n){return Vs(n,function(i){return e[~~t(i)]})},SA=function r(e,t,n){var i=t-e;return Zn(e)?Z_(e,r(0,e.length),t):Vs(n,function(s){return(i+(s-e)%i)%i+e})},MA=function r(e,t,n){var i=t-e,s=i*2;return Zn(e)?Z_(e,r(0,e.length-1),t):Vs(n,function(o){return o=(s+(o-e)%s)%s||0,e+(o>i?s-o:o)})},Kl=function(e){for(var t=0,n="",i,s,o,a;~(i=e.indexOf("random(",t));)o=e.indexOf(")",i),a=e.charAt(i+7)==="[",s=e.substr(i+7,o-i-7).match(a?I_:dh),n+=e.substr(t,i-t)+K_(a?s:+s[0],a?0:+s[1],+s[2]||1e-5),t=o+1;return n+e.substr(t,e.length-t)},J_=function(e,t,n,i,s){var o=t-e,a=i-n;return Vs(s,function(l){return n+((l-e)/o*a||0)})},TA=function r(e,t,n,i){var s=isNaN(e+t)?0:function(h){return(1-h)*e+h*t};if(!s){var o=Bn(e),a={},l,c,u,d,f;if(n===!0&&(i=1)&&(n=null),o)e={p:e},t={p:t};else if(Zn(e)&&!Zn(t)){for(u=[],d=e.length,f=d-2,c=1;c<d;c++)u.push(r(e[c-1],e[c]));d--,s=function(_){_*=d;var g=Math.min(f,~~_);return u[g](_-g)},n=t}else i||(e=Pa(Zn(e)?[]:{},e));if(!u){for(l in t)bp.call(a,e,l,"get",t[l]);s=function(_){return Tp(_,a)||(o?e.p:e)}}}return Vs(n,s)},A0=function(e,t,n){var i=e.labels,s=qi,o,a,l;for(o in i)a=i[o]-t,a<0==!!n&&a&&s>(a=Math.abs(a))&&(l=o,s=a);return l},Ii=function(e,t,n){var i=e.vars,s=i[t],o=un,a=e._ctx,l,c,u;if(s)return l=i[t+"Params"],c=i.callbackScope||e,n&&Rs.length&&Pu(),a&&(un=a),u=l?s.apply(c,l):s.call(c),un=o,u},ul=function(e){return Ns(e),e.scrollTrigger&&e.scrollTrigger.kill(!!Hn),e.progress()<1&&Ii(e,"onInterrupt"),e},oa,Q_=[],ex=function(e){if(e)if(e=!e.name&&e.default||e,mp()||e.headless){var t=e.name,n=gn(e),i=t&&!n&&e.init?function(){this._props=[]}:e,s={init:jl,render:Tp,add:bp,kill:VA,modifier:zA,rawVars:0},o={targetTest:0,get:0,getSetter:Mp,aliases:{},register:0};if(Ia(),e!==i){if(Ri[t])return;Fi(i,Fi(Lu(e,s),o)),Pa(i.prototype,Pa(s,Lu(e,o))),Ri[i.prop=t]=i,e.targetTest&&(lu.push(i),xp[t]=1),t=(t==="css"?"CSS":t.charAt(0).toUpperCase()+t.substr(1))+"Plugin"}F_(t,i),e.register&&e.register(Si,i,bi)}else Q_.push(e)},Jt=255,dl={aqua:[0,Jt,Jt],lime:[0,Jt,0],silver:[192,192,192],black:[0,0,0],maroon:[128,0,0],teal:[0,128,128],blue:[0,0,Jt],navy:[0,0,128],white:[Jt,Jt,Jt],olive:[128,128,0],yellow:[Jt,Jt,0],orange:[Jt,165,0],gray:[128,128,128],purple:[128,0,128],green:[0,128,0],red:[Jt,0,0],pink:[Jt,192,203],cyan:[0,Jt,Jt],transparent:[Jt,Jt,Jt,0]},$d=function(e,t,n){return e+=e<0?1:e>1?-1:0,(e*6<1?t+(n-t)*e*6:e<.5?n:e*3<2?t+(n-t)*(2/3-e)*6:t)*Jt+.5|0},tx=function(e,t,n){var i=e?ns(e)?[e>>16,e>>8&Jt,e&Jt]:0:dl.black,s,o,a,l,c,u,d,f,h,_;if(!i){if(e.substr(-1)===","&&(e=e.substr(0,e.length-1)),dl[e])i=dl[e];else if(e.charAt(0)==="#"){if(e.length<6&&(s=e.charAt(1),o=e.charAt(2),a=e.charAt(3),e="#"+s+s+o+o+a+a+(e.length===5?e.charAt(4)+e.charAt(4):"")),e.length===9)return i=parseInt(e.substr(1,6),16),[i>>16,i>>8&Jt,i&Jt,parseInt(e.substr(7),16)/255];e=parseInt(e.substr(1),16),i=[e>>16,e>>8&Jt,e&Jt]}else if(e.substr(0,3)==="hsl"){if(i=_=e.match(dh),!t)l=+i[0]%360/360,c=+i[1]/100,u=+i[2]/100,o=u<=.5?u*(c+1):u+c-u*c,s=u*2-o,i.length>3&&(i[3]*=1),i[0]=$d(l+1/3,s,o),i[1]=$d(l,s,o),i[2]=$d(l-1/3,s,o);else if(~e.indexOf("="))return i=e.match(L_),n&&i.length<4&&(i[3]=1),i}else i=e.match(dh)||dl.transparent;i=i.map(Number)}return t&&!_&&(s=i[0]/Jt,o=i[1]/Jt,a=i[2]/Jt,d=Math.max(s,o,a),f=Math.min(s,o,a),u=(d+f)/2,d===f?l=c=0:(h=d-f,c=u>.5?h/(2-d-f):h/(d+f),l=d===s?(o-a)/h+(o<a?6:0):d===o?(a-s)/h+2:(s-o)/h+4,l*=60),i[0]=~~(l+.5),i[1]=~~(c*100+.5),i[2]=~~(u*100+.5)),n&&i.length<4&&(i[3]=1),i},nx=function(e){var t=[],n=[],i=-1;return e.split(Ps).forEach(function(s){var o=s.match(sa)||[];t.push.apply(t,o),n.push(i+=o.length+1)}),t.c=n,t},C0=function(e,t,n){var i="",s=(e+i).match(Ps),o=t?"hsla(":"rgba(",a=0,l,c,u,d;if(!s)return e;if(s=s.map(function(f){return(f=tx(f,t,1))&&o+(t?f[0]+","+f[1]+"%,"+f[2]+"%,"+f[3]:f.join(","))+")"}),n&&(u=nx(e),l=n.c,l.join(i)!==u.c.join(i)))for(c=e.replace(Ps,"1").split(sa),d=c.length-1;a<d;a++)i+=c[a]+(~l.indexOf(a)?s.shift()||o+"0,0,0,0)":(u.length?u:s.length?s:n).shift());if(!c)for(c=e.split(Ps),d=c.length-1;a<d;a++)i+=c[a]+s[a];return i+c[d]},Ps=(function(){var r="(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b",e;for(e in dl)r+="|"+e+"\\b";return new RegExp(r+")","gi")})(),EA=/hsl[a]?\(/,ix=function(e){var t=e.join(" "),n;if(Ps.lastIndex=0,Ps.test(t))return n=EA.test(t),e[1]=C0(e[1],n),e[0]=C0(e[0],n,nx(e[1])),!0},Zl,Li=(function(){var r=Date.now,e=500,t=33,n=r(),i=n,s=1e3/240,o=s,a=[],l,c,u,d,f,h,_=function g(m){var p=r()-i,b=m===!0,x,v,T,M;if((p>e||p<0)&&(n+=p-t),i+=p,T=i-n,x=T-o,(x>0||b)&&(M=++d.frame,f=T-d.time*1e3,d.time=T=T/1e3,o+=x+(x>=s?4:s-x),v=1),b||(l=c(g)),v)for(h=0;h<a.length;h++)a[h](T,f,M,m)};return d={time:0,frame:0,tick:function(){_(!0)},deltaRatio:function(m){return f/(1e3/(m||60))},wake:function(){O_&&(!fh&&mp()&&(_r=fh=window,gp=_r.document||{},Ni.gsap=Si,(_r.gsapVersions||(_r.gsapVersions=[])).push(Si.version),N_(Ru||_r.GreenSockGlobals||!_r.gsap&&_r||{}),Q_.forEach(ex)),u=typeof requestAnimationFrame<"u"&&requestAnimationFrame,l&&d.sleep(),c=u||function(m){return setTimeout(m,o-d.time*1e3+1|0)},Zl=1,_(2))},sleep:function(){(u?cancelAnimationFrame:clearTimeout)(l),Zl=0,c=jl},lagSmoothing:function(m,p){e=m||1/0,t=Math.min(p||33,e)},fps:function(m){s=1e3/(m||240),o=d.time*1e3+s},add:function(m,p,b){var x=p?function(v,T,M,E){m(v,T,M,E),d.remove(x)}:m;return d.remove(m),a[b?"unshift":"push"](x),Ia(),x},remove:function(m,p){~(p=a.indexOf(m))&&a.splice(p,1)&&h>=p&&h--},_listeners:a},d})(),Ia=function(){return!Zl&&Li.wake()},Nt={},AA=/^[\d.\-M][\d.\-,\s]/,CA=/["']/g,RA=function(e){for(var t={},n=e.substr(1,e.length-3).split(":"),i=n[0],s=1,o=n.length,a,l,c;s<o;s++)l=n[s],a=s!==o-1?l.lastIndexOf(","):l.length,c=l.substr(0,a),t[i]=isNaN(c)?c.replace(CA,"").trim():+c,i=l.substr(a+1).trim();return t},PA=function(e){var t=e.indexOf("(")+1,n=e.indexOf(")"),i=e.indexOf("(",t);return e.substring(t,~i&&i<n?e.indexOf(")",n+1):n)},LA=function(e){var t=(e+"").split("("),n=Nt[t[0]];return n&&t.length>1&&n.config?n.config.apply(null,~e.indexOf("{")?[RA(t[1])]:PA(e).split(",").map(z_)):Nt._CE&&AA.test(e)?Nt._CE("",e):n},rx=function(e){return function(t){return 1-e(1-t)}},sx=function r(e,t){for(var n=e._first,i;n;)n instanceof di?r(n,t):n.vars.yoyoEase&&(!n._yoyo||!n._repeat)&&n._yoyo!==t&&(n.timeline?r(n.timeline,t):(i=n._ease,n._ease=n._yEase,n._yEase=i,n._yoyo=t)),n=n._next},mo=function(e,t){return e&&(gn(e)?e:Nt[e]||LA(e))||t},Ro=function(e,t,n,i){n===void 0&&(n=function(l){return 1-t(1-l)}),i===void 0&&(i=function(l){return l<.5?t(l*2)/2:1-t((1-l)*2)/2});var s={easeIn:t,easeOut:n,easeInOut:i},o;return yi(e,function(a){Nt[a]=Ni[a]=s,Nt[o=a.toLowerCase()]=n;for(var l in s)Nt[o+(l==="easeIn"?".in":l==="easeOut"?".out":".inOut")]=Nt[a+"."+l]=s[l]}),s},ox=function(e){return function(t){return t<.5?(1-e(1-t*2))/2:.5+e((t-.5)*2)/2}},jd=function r(e,t,n){var i=t>=1?t:1,s=(n||(e?.3:.45))/(t<1?t:1),o=s/uh*(Math.asin(1/i)||0),a=function(u){return u===1?1:i*Math.pow(2,-10*u)*sA((u-o)*s)+1},l=e==="out"?a:e==="in"?function(c){return 1-a(1-c)}:ox(a);return s=uh/s,l.config=function(c,u){return r(e,c,u)},l},Kd=function r(e,t){t===void 0&&(t=1.70158);var n=function(o){return o?--o*o*((t+1)*o+t)+1:0},i=e==="out"?n:e==="in"?function(s){return 1-n(1-s)}:ox(n);return i.config=function(s){return r(e,s)},i};yi("Linear,Quad,Cubic,Quart,Quint,Strong",function(r,e){var t=e<5?e+1:e;Ro(r+",Power"+(t-1),e?function(n){return Math.pow(n,t)}:function(n){return n},function(n){return 1-Math.pow(1-n,t)},function(n){return n<.5?Math.pow(n*2,t)/2:1-Math.pow((1-n)*2,t)/2})});Nt.Linear.easeNone=Nt.none=Nt.Linear.easeIn;Ro("Elastic",jd("in"),jd("out"),jd());(function(r,e){var t=1/e,n=2*t,i=2.5*t,s=function(a){return a<t?r*a*a:a<n?r*Math.pow(a-1.5/e,2)+.75:a<i?r*(a-=2.25/e)*a+.9375:r*Math.pow(a-2.625/e,2)+.984375};Ro("Bounce",function(o){return 1-s(1-o)},s)})(7.5625,2.75);Ro("Expo",function(r){return Math.pow(2,10*(r-1))*r+r*r*r*r*r*r*(1-r)});Ro("Circ",function(r){return-(R_(1-r*r)-1)});Ro("Sine",function(r){return r===1?1:-rA(r*nA)+1});Ro("Back",Kd("in"),Kd("out"),Kd());Nt.SteppedEase=Nt.steps=Ni.SteppedEase={config:function(e,t){e===void 0&&(e=1);var n=1/e,i=e+(t?0:1),s=t?1:0,o=1-en;return function(a){return((i*ac(0,o,a)|0)+s)*n}}};Ra.ease=Nt["quad.out"];yi("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt",function(r){return vp+=r+","+r+"Params,"});var ax=function(e,t){this.id=iA++,e._gsap=this,this.target=e,this.harness=t,this.get=t?t.get:k_,this.set=t?t.getSetter:Mp},Jl=(function(){function r(t){this.vars=t,this._delay=+t.delay||0,(this._repeat=t.repeat===1/0?-2:t.repeat||0)&&(this._rDelay=t.repeatDelay||0,this._yoyo=!!t.yoyo||!!t.yoyoEase),this._ts=1,Da(this,+t.duration,1,1),this.data=t.data,un&&(this._ctx=un,un.data.push(this)),Zl||Li.wake()}var e=r.prototype;return e.delay=function(n){return n||n===0?(this.parent&&this.parent.smoothChildTiming&&this.startTime(this._start+n-this._delay),this._delay=n,this):this._delay},e.duration=function(n){return arguments.length?this.totalDuration(this._repeat>0?n+(n+this._rDelay)*this._repeat:n):this.totalDuration()&&this._dur},e.totalDuration=function(n){return arguments.length?(this._dirty=0,Da(this,this._repeat<0?n:(n-this._repeat*this._rDelay)/(this._repeat+1))):this._tDur},e.totalTime=function(n,i){if(Ia(),!arguments.length)return this._tTime;var s=this._dp;if(s&&s.smoothChildTiming&&this._ts){for(Qu(this,n),!s._dp||s.parent||G_(s,this);s&&s.parent;)s.parent._time!==s._start+(s._ts>=0?s._tTime/s._ts:(s.totalDuration()-s._tTime)/-s._ts)&&s.totalTime(s._tTime,!0),s=s.parent;!this.parent&&this._dp.autoRemoveChildren&&(this._ts>0&&n<this._tDur||this._ts<0&&n>0||!this._tDur&&!n)&&yr(this._dp,this,this._start-this._delay)}return(this._tTime!==n||!this._dur&&!i||this._initted&&Math.abs(this._zTime)===en||!n&&!this._initted&&(this.add||this._ptLookup))&&(this._ts||(this._pTime=n),B_(this,n,i)),this},e.time=function(n,i){return arguments.length?this.totalTime(Math.min(this.totalDuration(),n+T0(this))%(this._dur+this._rDelay)||(n?this._dur:0),i):this._time},e.totalProgress=function(n,i){return arguments.length?this.totalTime(this.totalDuration()*n,i):this.totalDuration()?Math.min(1,this._tTime/this._tDur):this.rawTime()>=0&&this._initted?1:0},e.progress=function(n,i){return arguments.length?this.totalTime(this.duration()*(this._yoyo&&!(this.iteration()&1)?1-n:n)+T0(this),i):this.duration()?Math.min(1,this._time/this._dur):this.rawTime()>0?1:0},e.iteration=function(n,i){var s=this.duration()+this._rDelay;return arguments.length?this.totalTime(this._time+(n-1)*s,i):this._repeat?La(this._tTime,s)+1:1},e.timeScale=function(n,i){if(!arguments.length)return this._rts===-en?0:this._rts;if(this._rts===n)return this;var s=this.parent&&this._ts?Du(this.parent._time,this):this._tTime;return this._rts=+n||0,this._ts=this._ps||n===-en?0:this._rts,this.totalTime(ac(-Math.abs(this._delay),this._tDur,s),i!==!1),Ju(this),fA(this)},e.paused=function(n){return arguments.length?(this._ps!==n&&(this._ps=n,n?(this._pTime=this._tTime||Math.max(-this._delay,this.rawTime()),this._ts=this._act=0):(Ia(),this._ts=this._rts,this.totalTime(this.parent&&!this.parent.smoothChildTiming?this.rawTime():this._tTime||this._pTime,this.progress()===1&&Math.abs(this._zTime)!==en&&(this._tTime-=en)))),this):this._ps},e.startTime=function(n){if(arguments.length){this._start=n;var i=this.parent||this._dp;return i&&(i._sort||!this.parent)&&yr(i,this,n-this._delay),this}return this._start},e.endTime=function(n){return this._start+(vi(n)?this.totalDuration():this.duration())/Math.abs(this._ts||1)},e.rawTime=function(n){var i=this.parent||this._dp;return i?n&&(!this._ts||this._repeat&&this._time&&this.totalProgress()<1)?this._tTime%(this._dur+this._rDelay):this._ts?Du(i.rawTime(n),this):this._tTime:this._tTime},e.revert=function(n){n===void 0&&(n=lA);var i=Hn;return Hn=n,(this._initted||this._startAt)&&(this.timeline&&this.timeline.revert(n),this.totalTime(-.01,n.suppressEvents)),this.data!=="nested"&&n.kill!==!1&&this.kill(),Hn=i,this},e.globalTime=function(n){for(var i=this,s=arguments.length?n:i.rawTime();i;)s=i._start+s/(Math.abs(i._ts)||1),i=i._dp;return!this.parent&&this._sat?this._sat.globalTime(n):s},e.repeat=function(n){return arguments.length?(this._repeat=n===1/0?-2:n,E0(this)):this._repeat===-2?1/0:this._repeat},e.repeatDelay=function(n){if(arguments.length){var i=this._time;return this._rDelay=n,E0(this),i?this.time(i):this}return this._rDelay},e.yoyo=function(n){return arguments.length?(this._yoyo=n,this):this._yoyo},e.seek=function(n,i){return this.totalTime(ki(this,n),vi(i))},e.restart=function(n,i){return this.play().totalTime(n?-this._delay:0,vi(i)),this._dur||(this._zTime=-en),this},e.play=function(n,i){return n!=null&&this.seek(n,i),this.reversed(!1).paused(!1)},e.reverse=function(n,i){return n!=null&&this.seek(n||this.totalDuration(),i),this.reversed(!0).paused(!1)},e.pause=function(n,i){return n!=null&&this.seek(n,i),this.paused(!0)},e.resume=function(){return this.paused(!1)},e.reversed=function(n){return arguments.length?(!!n!==this.reversed()&&this.timeScale(-this._rts||(n?-en:0)),this):this._rts<0},e.invalidate=function(){return this._initted=this._act=0,this._zTime=-en,this},e.isActive=function(){var n=this.parent||this._dp,i=this._start,s;return!!(!n||this._ts&&this._initted&&n.isActive()&&(s=n.rawTime(!0))>=i&&s<this.endTime(!0)-en)},e.eventCallback=function(n,i,s){var o=this.vars;return arguments.length>1?(i?(o[n]=i,s&&(o[n+"Params"]=s),n==="onUpdate"&&(this._onUpdate=i)):delete o[n],this):o[n]},e.then=function(n){var i=this;return new Promise(function(s){var o=gn(n)?n:V_,a=function(){var c=i.then;i.then=null,gn(o)&&(o=o(i))&&(o.then||o===i)&&(i.then=c),s(o),i.then=c};i._initted&&i.totalProgress()===1&&i._ts>=0||!i._tTime&&i._ts<0?a():i._prom=a})},e.kill=function(){ul(this)},r})();Fi(Jl.prototype,{_time:0,_start:0,_end:0,_tTime:0,_tDur:0,_dirty:0,_repeat:0,_yoyo:!1,parent:null,_initted:!1,_rDelay:0,_ts:1,_dp:0,ratio:0,_zTime:-en,_prom:0,_ps:!1,_rts:1});var di=(function(r){C_(e,r);function e(n,i){var s;return n===void 0&&(n={}),s=r.call(this,n)||this,s.labels={},s.smoothChildTiming=!!n.smoothChildTiming,s.autoRemoveChildren=!!n.autoRemoveChildren,s._sort=vi(n.sortChildren),hn&&yr(n.parent||hn,Gr(s),i),n.reversed&&s.reverse(),n.paused&&s.paused(!0),n.scrollTrigger&&W_(Gr(s),n.scrollTrigger),s}var t=e.prototype;return t.to=function(i,s,o){return El(0,arguments,this),this},t.from=function(i,s,o){return El(1,arguments,this),this},t.fromTo=function(i,s,o,a){return El(2,arguments,this),this},t.set=function(i,s,o){return s.duration=0,s.parent=this,Tl(s).repeatDelay||(s.repeat=0),s.immediateRender=!!s.immediateRender,new Mn(i,s,ki(this,o),1),this},t.call=function(i,s,o){return yr(this,Mn.delayedCall(0,i,s),o)},t.staggerTo=function(i,s,o,a,l,c,u){return o.duration=s,o.stagger=o.stagger||a,o.onComplete=c,o.onCompleteParams=u,o.parent=this,new Mn(i,o,ki(this,l)),this},t.staggerFrom=function(i,s,o,a,l,c,u){return o.runBackwards=1,Tl(o).immediateRender=vi(o.immediateRender),this.staggerTo(i,s,o,a,l,c,u)},t.staggerFromTo=function(i,s,o,a,l,c,u,d){return a.startAt=o,Tl(a).immediateRender=vi(a.immediateRender),this.staggerTo(i,s,a,l,c,u,d)},t.render=function(i,s,o){var a=this._time,l=this._dirty?this.totalDuration():this._tDur,c=this._dur,u=i<=0?0:En(i),d=this._zTime<0!=i<0&&(this._initted||!c),f,h,_,g,m,p,b,x,v,T,M,E;if(this!==hn&&u>l&&i>=0&&(u=l),u!==this._tTime||o||d){if(a!==this._time&&c&&(u+=this._time-a,i+=this._time-a),f=u,v=this._start,x=this._ts,p=!x,d&&(c||(a=this._zTime),(i||!s)&&(this._zTime=i)),this._repeat){if(M=this._yoyo,m=c+this._rDelay,this._repeat<-1&&i<0)return this.totalTime(m*100+i,s,o);if(f=En(u%m),u===l?(g=this._repeat,f=c):(T=En(u/m),g=~~T,g&&g===T&&(f=c,g--),f>c&&(f=c)),T=La(this._tTime,m),!a&&this._tTime&&T!==g&&this._tTime-T*m-this._dur<=0&&(T=g),M&&g&1&&(f=c-f,E=1),g!==T&&!this._lock){var R=M&&T&1,w=R===(M&&g&1);if(g<T&&(R=!R),a=R?0:u%c?c:u,this._lock=1,this.render(a||(E?0:En(g*m)),s,!c)._lock=0,this._tTime=u,!s&&this.parent&&Ii(this,"onRepeat"),this.vars.repeatRefresh&&!E&&(this.invalidate()._lock=1),a&&a!==this._time||p!==!this._ts||this.vars.onRepeat&&!this.parent&&!this._act)return this;if(c=this._dur,l=this._tDur,w&&(this._lock=2,a=R?c:-1e-4,this.render(a,!0),this.vars.repeatRefresh&&!E&&this.invalidate()),this._lock=0,!this._ts&&!p)return this;sx(this,E)}}if(this._hasPause&&!this._forcing&&this._lock<2&&(b=gA(this,En(a),En(f)),b&&(u-=f-(f=b._start))),this._tTime=u,this._time=f,this._act=!x,this._initted||(this._onUpdate=this.vars.onUpdate,this._initted=1,this._zTime=i,a=0),!a&&f&&!s&&!g&&(Ii(this,"onStart"),this._tTime!==u))return this;if(f>=a&&i>=0)for(h=this._first;h;){if(_=h._next,(h._act||f>=h._start)&&h._ts&&b!==h){if(h.parent!==this)return this.render(i,s,o);if(h.render(h._ts>0?(f-h._start)*h._ts:(h._dirty?h.totalDuration():h._tDur)+(f-h._start)*h._ts,s,o),f!==this._time||!this._ts&&!p){b=0,_&&(u+=this._zTime=-en);break}}h=_}else{h=this._last;for(var y=i<0?i:f;h;){if(_=h._prev,(h._act||y<=h._end)&&h._ts&&b!==h){if(h.parent!==this)return this.render(i,s,o);if(h.render(h._ts>0?(y-h._start)*h._ts:(h._dirty?h.totalDuration():h._tDur)+(y-h._start)*h._ts,s,o||Hn&&(h._initted||h._startAt)),f!==this._time||!this._ts&&!p){b=0,_&&(u+=this._zTime=y?-en:en);break}}h=_}}if(b&&!s&&(this.pause(),b.render(f>=a?0:-en)._zTime=f>=a?1:-1,this._ts))return this._start=v,Ju(this),this.render(i,s,o);this._onUpdate&&!s&&Ii(this,"onUpdate",!0),(u===l&&this._tTime>=this.totalDuration()||!u&&a)&&(v===this._start||Math.abs(x)!==Math.abs(this._ts))&&(this._lock||((i||!c)&&(u===l&&this._ts>0||!u&&this._ts<0)&&Ns(this,1),!s&&!(i<0&&!a)&&(u||a||!l)&&(Ii(this,u===l&&i>=0?"onComplete":"onReverseComplete",!0),this._prom&&!(u<l&&this.timeScale()>0)&&this._prom())))}return this},t.add=function(i,s){var o=this;if(ns(s)||(s=ki(this,s,i)),!(i instanceof Jl)){if(Zn(i))return i.forEach(function(a){return o.add(a,s)}),this;if(Bn(i))return this.addLabel(i,s);if(gn(i))i=Mn.delayedCall(0,i);else return this}return this!==i?yr(this,i,s):this},t.getChildren=function(i,s,o,a){i===void 0&&(i=!0),s===void 0&&(s=!0),o===void 0&&(o=!0),a===void 0&&(a=-qi);for(var l=[],c=this._first;c;)c._start>=a&&(c instanceof Mn?s&&l.push(c):(o&&l.push(c),i&&l.push.apply(l,c.getChildren(!0,s,o)))),c=c._next;return l},t.getById=function(i){for(var s=this.getChildren(1,1,1),o=s.length;o--;)if(s[o].vars.id===i)return s[o]},t.remove=function(i){return Bn(i)?this.removeLabel(i):gn(i)?this.killTweensOf(i):(i.parent===this&&Zu(this,i),i===this._recent&&(this._recent=this._last),po(this))},t.totalTime=function(i,s){return arguments.length?(this._forcing=1,!this._dp&&this._ts&&(this._start=En(Li.time-(this._ts>0?i/this._ts:(this.totalDuration()-i)/-this._ts))),r.prototype.totalTime.call(this,i,s),this._forcing=0,this):this._tTime},t.addLabel=function(i,s){return this.labels[i]=ki(this,s),this},t.removeLabel=function(i){return delete this.labels[i],this},t.addPause=function(i,s,o){var a=Mn.delayedCall(0,s||jl,o);return a.data="isPause",this._hasPause=1,yr(this,a,ki(this,i))},t.removePause=function(i){var s=this._first;for(i=ki(this,i);s;)s._start===i&&s.data==="isPause"&&Ns(s),s=s._next},t.killTweensOf=function(i,s,o){for(var a=this.getTweensOf(i,o),l=a.length;l--;)ys!==a[l]&&a[l].kill(i,s);return this},t.getTweensOf=function(i,s){for(var o=[],a=Yi(i),l=this._first,c=ns(s),u;l;)l instanceof Mn?cA(l._targets,a)&&(c?(!ys||l._initted&&l._ts)&&l.globalTime(0)<=s&&l.globalTime(l.totalDuration())>s:!s||l.isActive())&&o.push(l):(u=l.getTweensOf(a,s)).length&&o.push.apply(o,u),l=l._next;return o},t.tweenTo=function(i,s){s=s||{};var o=this,a=ki(o,i),l=s,c=l.startAt,u=l.onStart,d=l.onStartParams,f=l.immediateRender,h,_=Mn.to(o,Fi({ease:s.ease||"none",lazy:!1,immediateRender:!1,time:a,overwrite:"auto",duration:s.duration||Math.abs((a-(c&&"time"in c?c.time:o._time))/o.timeScale())||en,onStart:function(){if(o.pause(),!h){var m=s.duration||Math.abs((a-(c&&"time"in c?c.time:o._time))/o.timeScale());_._dur!==m&&Da(_,m,0,1).render(_._time,!0,!0),h=1}u&&u.apply(_,d||[])}},s));return f?_.render(0):_},t.tweenFromTo=function(i,s,o){return this.tweenTo(s,Fi({startAt:{time:ki(this,i)}},o))},t.recent=function(){return this._recent},t.nextLabel=function(i){return i===void 0&&(i=this._time),A0(this,ki(this,i))},t.previousLabel=function(i){return i===void 0&&(i=this._time),A0(this,ki(this,i),1)},t.currentLabel=function(i){return arguments.length?this.seek(i,!0):this.previousLabel(this._time+en)},t.shiftChildren=function(i,s,o){o===void 0&&(o=0);for(var a=this._first,l=this.labels,c;a;)a._start>=o&&(a._start+=i,a._end+=i),a=a._next;if(s)for(c in l)l[c]>=o&&(l[c]+=i);return po(this)},t.invalidate=function(i){var s=this._first;for(this._lock=0;s;)s.invalidate(i),s=s._next;return r.prototype.invalidate.call(this,i)},t.clear=function(i){i===void 0&&(i=!0);for(var s=this._first,o;s;)o=s._next,this.remove(s),s=o;return this._dp&&(this._time=this._tTime=this._pTime=0),i&&(this.labels={}),po(this)},t.totalDuration=function(i){var s=0,o=this,a=o._last,l=qi,c,u,d;if(arguments.length)return o.timeScale((o._repeat<0?o.duration():o.totalDuration())/(o.reversed()?-i:i));if(o._dirty){for(d=o.parent;a;)c=a._prev,a._dirty&&a.totalDuration(),u=a._start,u>l&&o._sort&&a._ts&&!o._lock?(o._lock=1,yr(o,a,u-a._delay,1)._lock=0):l=u,u<0&&a._ts&&(s-=u,(!d&&!o._dp||d&&d.smoothChildTiming)&&(o._start+=u/o._ts,o._time-=u,o._tTime-=u),o.shiftChildren(-u,!1,-1/0),l=0),a._end>s&&a._ts&&(s=a._end),a=c;Da(o,o===hn&&o._time>s?o._time:s,1,1),o._dirty=0}return o._tDur},e.updateRoot=function(i){if(hn._ts&&(B_(hn,Du(i,hn)),U_=Li.frame),Li.frame>=S0){S0+=Oi.autoSleep||120;var s=hn._first;if((!s||!s._ts)&&Oi.autoSleep&&Li._listeners.length<2){for(;s&&!s._ts;)s=s._next;s||Li.sleep()}}},e})(Jl);Fi(di.prototype,{_lock:0,_hasPause:0,_forcing:0});var DA=function(e,t,n,i,s,o,a){var l=new bi(this._pt,e,t,0,1,hx,null,s),c=0,u=0,d,f,h,_,g,m,p,b;for(l.b=n,l.e=i,n+="",i+="",(p=~i.indexOf("random("))&&(i=Kl(i)),o&&(b=[n,i],o(b,e,t),n=b[0],i=b[1]),f=n.match(qd)||[];d=qd.exec(i);)_=d[0],g=i.substring(c,d.index),h?h=(h+1)%5:g.substr(-5)==="rgba("&&(h=1),_!==f[u++]&&(m=parseFloat(f[u-1])||0,l._pt={_next:l._pt,p:g||u===1?g:",",s:m,c:_.charAt(1)==="="?da(m,_)-m:parseFloat(_)-m,m:h&&h<4?Math.round:0},c=qd.lastIndex);return l.c=c<i.length?i.substring(c,i.length):"",l.fp=a,(D_.test(i)||p)&&(l.e=0),this._pt=l,l},bp=function(e,t,n,i,s,o,a,l,c,u){gn(i)&&(i=i(s||0,e,o));var d=e[t],f=n!=="get"?n:gn(d)?c?e[t.indexOf("set")||!gn(e["get"+t.substr(3)])?t:"get"+t.substr(3)](c):e[t]():d,h=gn(d)?c?UA:dx:Sp,_;if(Bn(i)&&(~i.indexOf("random(")&&(i=Kl(i)),i.charAt(1)==="="&&(_=da(f,i)+($n(f)||0),(_||_===0)&&(i=_))),!u||f!==i||vh)return!isNaN(f*i)&&i!==""?(_=new bi(this._pt,e,t,+f||0,i-(f||0),typeof d=="boolean"?BA:fx,0,h),c&&(_.fp=c),a&&_.modifier(a,this,e),this._pt=_):(!d&&!(t in e)&&_p(t,i),DA.call(this,e,t,f,i,h,l||Oi.stringFilter,c))},IA=function(e,t,n,i,s){if(gn(e)&&(e=Al(e,s,t,n,i)),!Dr(e)||e.style&&e.nodeType||Zn(e)||P_(e))return Bn(e)?Al(e,s,t,n,i):e;var o={},a;for(a in e)o[a]=Al(e[a],s,t,n,i);return o},lx=function(e,t,n,i,s,o){var a,l,c,u;if(Ri[e]&&(a=new Ri[e]).init(s,a.rawVars?t[e]:IA(t[e],i,s,o,n),n,i,o)!==!1&&(n._pt=l=new bi(n._pt,s,e,0,1,a.render,a,0,a.priority),n!==oa))for(c=n._ptLookup[n._targets.indexOf(s)],u=a._props.length;u--;)c[a._props[u]]=l;return a},ys,vh,wp=function r(e,t,n){var i=e.vars,s=i.ease,o=i.startAt,a=i.immediateRender,l=i.lazy,c=i.onUpdate,u=i.runBackwards,d=i.yoyoEase,f=i.keyframes,h=i.autoRevert,_=e._dur,g=e._startAt,m=e._targets,p=e.parent,b=p&&p.data==="nested"?p.vars.targets:m,x=e._overwrite==="auto"&&!hp,v=e.timeline,T,M,E,R,w,y,L,N,W,j,k,J,te;if(v&&(!f||!s)&&(s="none"),e._ease=mo(s,Ra.ease),e._yEase=d?rx(mo(d===!0?s:d,Ra.ease)):0,d&&e._yoyo&&!e._repeat&&(d=e._yEase,e._yEase=e._ease,e._ease=d),e._from=!v&&!!i.runBackwards,!v||f&&!i.stagger){if(N=m[0]?ho(m[0]).harness:0,J=N&&i[N.prop],T=Lu(i,xp),g&&(g._zTime<0&&g.progress(1),t<0&&u&&a&&!h?g.render(-1,!0):g.revert(u&&_?au:aA),g._lazy=0),o){if(Ns(e._startAt=Mn.set(m,Fi({data:"isStart",overwrite:!1,parent:p,immediateRender:!0,lazy:!g&&vi(l),startAt:null,delay:0,onUpdate:c&&function(){return Ii(e,"onUpdate")},stagger:0},o))),e._startAt._dp=0,e._startAt._sat=e,t<0&&(Hn||!a&&!h)&&e._startAt.revert(au),a&&_&&t<=0&&n<=0){t&&(e._zTime=t);return}}else if(u&&_&&!g){if(t&&(a=!1),E=Fi({overwrite:!1,data:"isFromStart",lazy:a&&!g&&vi(l),immediateRender:a,stagger:0,parent:p},T),J&&(E[N.prop]=J),Ns(e._startAt=Mn.set(m,E)),e._startAt._dp=0,e._startAt._sat=e,t<0&&(Hn?e._startAt.revert(au):e._startAt.render(-1,!0)),e._zTime=t,!a)r(e._startAt,en,en);else if(!t)return}for(e._pt=e._ptCache=0,l=_&&vi(l)||l&&!_,M=0;M<m.length;M++){if(w=m[M],L=w._gsap||yp(m)[M]._gsap,e._ptLookup[M]=j={},hh[L.id]&&Rs.length&&Pu(),k=b===m?M:b.indexOf(w),N&&(W=new N).init(w,J||T,e,k,b)!==!1&&(e._pt=R=new bi(e._pt,w,W.name,0,1,W.render,W,0,W.priority),W._props.forEach(function(F){j[F]=R}),W.priority&&(y=1)),!N||J)for(E in T)Ri[E]&&(W=lx(E,T,e,k,w,b))?W.priority&&(y=1):j[E]=R=bp.call(e,w,E,"get",T[E],k,b,0,i.stringFilter);e._op&&e._op[M]&&e.kill(w,e._op[M]),x&&e._pt&&(ys=e,hn.killTweensOf(w,j,e.globalTime(t)),te=!e.parent,ys=0),e._pt&&l&&(hh[L.id]=1)}y&&px(e),e._onInit&&e._onInit(e)}e._onUpdate=c,e._initted=(!e._op||e._pt)&&!te,f&&t<=0&&v.render(qi,!0,!0)},OA=function(e,t,n,i,s,o,a,l){var c=(e._pt&&e._ptCache||(e._ptCache={}))[t],u,d,f,h;if(!c)for(c=e._ptCache[t]=[],f=e._ptLookup,h=e._targets.length;h--;){if(u=f[h][t],u&&u.d&&u.d._pt)for(u=u.d._pt;u&&u.p!==t&&u.fp!==t;)u=u._next;if(!u)return vh=1,e.vars[t]="+=0",wp(e,a),vh=0,l?$l(t+" not eligible for reset"):1;c.push(u)}for(h=c.length;h--;)d=c[h],u=d._pt||d,u.s=(i||i===0)&&!s?i:u.s+(i||0)+o*u.c,u.c=n-u.s,d.e&&(d.e=_n(n)+$n(d.e)),d.b&&(d.b=u.s+$n(d.b))},NA=function(e,t){var n=e[0]?ho(e[0]).harness:0,i=n&&n.aliases,s,o,a,l;if(!i)return t;s=Pa({},t);for(o in i)if(o in s)for(l=i[o].split(","),a=l.length;a--;)s[l[a]]=s[o];return s},FA=function(e,t,n,i){var s=t.ease||i||"power1.inOut",o,a;if(Zn(t))a=n[e]||(n[e]=[]),t.forEach(function(l,c){return a.push({t:c/(t.length-1)*100,v:l,e:s})});else for(o in t)a=n[o]||(n[o]=[]),o==="ease"||a.push({t:parseFloat(e),v:t[o],e:s})},Al=function(e,t,n,i,s){return gn(e)?e.call(t,n,i,s):Bn(e)&&~e.indexOf("random(")?Kl(e):e},cx=vp+"repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,autoRevert",ux={};yi(cx+",id,stagger,delay,duration,paused,scrollTrigger",function(r){return ux[r]=1});var Mn=(function(r){C_(e,r);function e(n,i,s,o){var a;typeof i=="number"&&(s.duration=i,i=s,s=null),a=r.call(this,o?i:Tl(i))||this;var l=a.vars,c=l.duration,u=l.delay,d=l.immediateRender,f=l.stagger,h=l.overwrite,_=l.keyframes,g=l.defaults,m=l.scrollTrigger,p=l.yoyoEase,b=i.parent||hn,x=(Zn(n)||P_(n)?ns(n[0]):"length"in i)?[n]:Yi(n),v,T,M,E,R,w,y,L;if(a._targets=x.length?yp(x):$l("GSAP target "+n+" not found. https://gsap.com",!Oi.nullTargetWarn)||[],a._ptLookup=[],a._overwrite=h,_||f||kc(c)||kc(u)){if(i=a.vars,v=a.timeline=new di({data:"nested",defaults:g||{},targets:b&&b.data==="nested"?b.vars.targets:x}),v.kill(),v.parent=v._dp=Gr(a),v._start=0,f||kc(c)||kc(u)){if(E=x.length,y=f&&$_(f),Dr(f))for(R in f)~cx.indexOf(R)&&(L||(L={}),L[R]=f[R]);for(T=0;T<E;T++)M=Lu(i,ux),M.stagger=0,p&&(M.yoyoEase=p),L&&Pa(M,L),w=x[T],M.duration=+Al(c,Gr(a),T,w,x),M.delay=(+Al(u,Gr(a),T,w,x)||0)-a._delay,!f&&E===1&&M.delay&&(a._delay=u=M.delay,a._start+=u,M.delay=0),v.to(w,M,y?y(T,w,x):0),v._ease=Nt.none;v.duration()?c=u=0:a.timeline=0}else if(_){Tl(Fi(v.vars.defaults,{ease:"none"})),v._ease=mo(_.ease||i.ease||"none");var N=0,W,j,k;if(Zn(_))_.forEach(function(J){return v.to(x,J,">")}),v.duration();else{M={};for(R in _)R==="ease"||R==="easeEach"||FA(R,_[R],M,_.easeEach);for(R in M)for(W=M[R].sort(function(J,te){return J.t-te.t}),N=0,T=0;T<W.length;T++)j=W[T],k={ease:j.e,duration:(j.t-(T?W[T-1].t:0))/100*c},k[R]=j.v,v.to(x,k,N),N+=k.duration;v.duration()<c&&v.to({},{duration:c-v.duration()})}}c||a.duration(c=v.duration())}else a.timeline=0;return h===!0&&!hp&&(ys=Gr(a),hn.killTweensOf(x),ys=0),yr(b,Gr(a),s),i.reversed&&a.reverse(),i.paused&&a.paused(!0),(d||!c&&!_&&a._start===En(b._time)&&vi(d)&&hA(Gr(a))&&b.data!=="nested")&&(a._tTime=-en,a.render(Math.max(0,-u)||0)),m&&W_(Gr(a),m),a}var t=e.prototype;return t.render=function(i,s,o){var a=this._time,l=this._tDur,c=this._dur,u=i<0,d=i>l-en&&!u?l:i<en?0:i,f,h,_,g,m,p,b,x,v;if(!c)mA(this,i,s,o);else if(d!==this._tTime||!i||o||!this._initted&&this._tTime||this._startAt&&this._zTime<0!==u||this._lazy){if(f=d,x=this.timeline,this._repeat){if(g=c+this._rDelay,this._repeat<-1&&u)return this.totalTime(g*100+i,s,o);if(f=En(d%g),d===l?(_=this._repeat,f=c):(m=En(d/g),_=~~m,_&&_===m?(f=c,_--):f>c&&(f=c)),p=this._yoyo&&_&1,p&&(v=this._yEase,f=c-f),m=La(this._tTime,g),f===a&&!o&&this._initted&&_===m)return this._tTime=d,this;_!==m&&(x&&this._yEase&&sx(x,p),this.vars.repeatRefresh&&!p&&!this._lock&&f!==g&&this._initted&&(this._lock=o=1,this.render(En(g*_),!0).invalidate()._lock=0))}if(!this._initted){if(X_(this,u?i:f,o,s,d))return this._tTime=0,this;if(a!==this._time&&!(o&&this.vars.repeatRefresh&&_!==m))return this;if(c!==this._dur)return this.render(i,s,o)}if(this._tTime=d,this._time=f,!this._act&&this._ts&&(this._act=1,this._lazy=0),this.ratio=b=(v||this._ease)(f/c),this._from&&(this.ratio=b=1-b),f&&!a&&!s&&!_&&(Ii(this,"onStart"),this._tTime!==d))return this;for(h=this._pt;h;)h.r(b,h.d),h=h._next;x&&x.render(i<0?i:x._dur*x._ease(f/this._dur),s,o)||this._startAt&&(this._zTime=i),this._onUpdate&&!s&&(u&&ph(this,i,s,o),Ii(this,"onUpdate")),this._repeat&&_!==m&&this.vars.onRepeat&&!s&&this.parent&&Ii(this,"onRepeat"),(d===this._tDur||!d)&&this._tTime===d&&(u&&!this._onUpdate&&ph(this,i,!0,!0),(i||!c)&&(d===this._tDur&&this._ts>0||!d&&this._ts<0)&&Ns(this,1),!s&&!(u&&!a)&&(d||a||p)&&(Ii(this,d===l?"onComplete":"onReverseComplete",!0),this._prom&&!(d<l&&this.timeScale()>0)&&this._prom()))}return this},t.targets=function(){return this._targets},t.invalidate=function(i){return(!i||!this.vars.runBackwards)&&(this._startAt=0),this._pt=this._op=this._onUpdate=this._lazy=this.ratio=0,this._ptLookup=[],this.timeline&&this.timeline.invalidate(i),r.prototype.invalidate.call(this,i)},t.resetTo=function(i,s,o,a,l){Zl||Li.wake(),this._ts||this.play();var c=Math.min(this._dur,(this._dp._time-this._start)*this._ts),u;return this._initted||wp(this,c),u=this._ease(c/this._dur),OA(this,i,s,o,a,u,c,l)?this.resetTo(i,s,o,a,1):(Qu(this,0),this.parent||H_(this._dp,this,"_first","_last",this._dp._sort?"_start":0),this.render(0))},t.kill=function(i,s){if(s===void 0&&(s="all"),!i&&(!s||s==="all"))return this._lazy=this._pt=0,this.parent?ul(this):this.scrollTrigger&&this.scrollTrigger.kill(!!Hn),this;if(this.timeline){var o=this.timeline.totalDuration();return this.timeline.killTweensOf(i,s,ys&&ys.vars.overwrite!==!0)._first||ul(this),this.parent&&o!==this.timeline.totalDuration()&&Da(this,this._dur*this.timeline._tDur/o,0,1),this}var a=this._targets,l=i?Yi(i):a,c=this._ptLookup,u=this._pt,d,f,h,_,g,m,p;if((!s||s==="all")&&dA(a,l))return s==="all"&&(this._pt=0),ul(this);for(d=this._op=this._op||[],s!=="all"&&(Bn(s)&&(g={},yi(s,function(b){return g[b]=1}),s=g),s=NA(a,s)),p=a.length;p--;)if(~l.indexOf(a[p])){f=c[p],s==="all"?(d[p]=s,_=f,h={}):(h=d[p]=d[p]||{},_=s);for(g in _)m=f&&f[g],m&&((!("kill"in m.d)||m.d.kill(g)===!0)&&Zu(this,m,"_pt"),delete f[g]),h!=="all"&&(h[g]=1)}return this._initted&&!this._pt&&u&&ul(this),this},e.to=function(i,s){return new e(i,s,arguments[2])},e.from=function(i,s){return El(1,arguments)},e.delayedCall=function(i,s,o,a){return new e(s,0,{immediateRender:!1,lazy:!1,overwrite:!1,delay:i,onComplete:s,onReverseComplete:s,onCompleteParams:o,onReverseCompleteParams:o,callbackScope:a})},e.fromTo=function(i,s,o){return El(2,arguments)},e.set=function(i,s){return s.duration=0,s.repeatDelay||(s.repeat=0),new e(i,s)},e.killTweensOf=function(i,s,o){return hn.killTweensOf(i,s,o)},e})(Jl);Fi(Mn.prototype,{_targets:[],_lazy:0,_startAt:0,_op:0,_onInit:0});yi("staggerTo,staggerFrom,staggerFromTo",function(r){Mn[r]=function(){var e=new di,t=gh.call(arguments,0);return t.splice(r==="staggerFromTo"?5:4,0,0),e[r].apply(e,t)}});var Sp=function(e,t,n){return e[t]=n},dx=function(e,t,n){return e[t](n)},UA=function(e,t,n,i){return e[t](i.fp,n)},kA=function(e,t,n){return e.setAttribute(t,n)},Mp=function(e,t){return gn(e[t])?dx:pp(e[t])&&e.setAttribute?kA:Sp},fx=function(e,t){return t.set(t.t,t.p,Math.round((t.s+t.c*e)*1e6)/1e6,t)},BA=function(e,t){return t.set(t.t,t.p,!!(t.s+t.c*e),t)},hx=function(e,t){var n=t._pt,i="";if(!e&&t.b)i=t.b;else if(e===1&&t.e)i=t.e;else{for(;n;)i=n.p+(n.m?n.m(n.s+n.c*e):Math.round((n.s+n.c*e)*1e4)/1e4)+i,n=n._next;i+=t.c}t.set(t.t,t.p,i,t)},Tp=function(e,t){for(var n=t._pt;n;)n.r(e,n.d),n=n._next},zA=function(e,t,n,i){for(var s=this._pt,o;s;)o=s._next,s.p===i&&s.modifier(e,t,n),s=o},VA=function(e){for(var t=this._pt,n,i;t;)i=t._next,t.p===e&&!t.op||t.op===e?Zu(this,t,"_pt"):t.dep||(n=1),t=i;return!n},HA=function(e,t,n,i){i.mSet(e,t,i.m.call(i.tween,n,i.mt),i)},px=function(e){for(var t=e._pt,n,i,s,o;t;){for(n=t._next,i=s;i&&i.pr>t.pr;)i=i._next;(t._prev=i?i._prev:o)?t._prev._next=t:s=t,(t._next=i)?i._prev=t:o=t,t=n}e._pt=s},bi=(function(){function r(t,n,i,s,o,a,l,c,u){this.t=n,this.s=s,this.c=o,this.p=i,this.r=a||fx,this.d=l||this,this.set=c||Sp,this.pr=u||0,this._next=t,t&&(t._prev=this)}var e=r.prototype;return e.modifier=function(n,i,s){this.mSet=this.mSet||this.set,this.set=HA,this.m=n,this.mt=s,this.tween=i},r})();yi(vp+"parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger",function(r){return xp[r]=1});Ni.TweenMax=Ni.TweenLite=Mn;Ni.TimelineLite=Ni.TimelineMax=di;hn=new di({sortChildren:!1,defaults:Ra,autoRemoveChildren:!0,id:"root",smoothChildTiming:!0});Oi.stringFilter=ix;var go=[],cu={},GA=[],R0=0,WA=0,Zd=function(e){return(cu[e]||GA).map(function(t){return t()})},yh=function(){var e=Date.now(),t=[];e-R0>2&&(Zd("matchMediaInit"),go.forEach(function(n){var i=n.queries,s=n.conditions,o,a,l,c;for(a in i)o=_r.matchMedia(i[a]).matches,o&&(l=1),o!==s[a]&&(s[a]=o,c=1);c&&(n.revert(),l&&t.push(n))}),Zd("matchMediaRevert"),t.forEach(function(n){return n.onMatch(n,function(i){return n.add(null,i)})}),R0=e,Zd("matchMedia"))},mx=(function(){function r(t,n){this.selector=n&&_h(n),this.data=[],this._r=[],this.isReverted=!1,this.id=WA++,t&&this.add(t)}var e=r.prototype;return e.add=function(n,i,s){gn(n)&&(s=i,i=n,n=gn);var o=this,a=function(){var c=un,u=o.selector,d;return c&&c!==o&&c.data.push(o),s&&(o.selector=_h(s)),un=o,d=i.apply(o,arguments),gn(d)&&o._r.push(d),un=c,o.selector=u,o.isReverted=!1,d};return o.last=a,n===gn?a(o,function(l){return o.add(null,l)}):n?o[n]=a:a},e.ignore=function(n){var i=un;un=null,n(this),un=i},e.getTweens=function(){var n=[];return this.data.forEach(function(i){return i instanceof r?n.push.apply(n,i.getTweens()):i instanceof Mn&&!(i.parent&&i.parent.data==="nested")&&n.push(i)}),n},e.clear=function(){this._r.length=this.data.length=0},e.kill=function(n,i){var s=this;if(n?(function(){for(var a=s.getTweens(),l=s.data.length,c;l--;)c=s.data[l],c.data==="isFlip"&&(c.revert(),c.getChildren(!0,!0,!1).forEach(function(u){return a.splice(a.indexOf(u),1)}));for(a.map(function(u){return{g:u._dur||u._delay||u._sat&&!u._sat.vars.immediateRender?u.globalTime(0):-1/0,t:u}}).sort(function(u,d){return d.g-u.g||-1/0}).forEach(function(u){return u.t.revert(n)}),l=s.data.length;l--;)c=s.data[l],c instanceof di?c.data!=="nested"&&(c.scrollTrigger&&c.scrollTrigger.revert(),c.kill()):!(c instanceof Mn)&&c.revert&&c.revert(n);s._r.forEach(function(u){return u(n,s)}),s.isReverted=!0})():this.data.forEach(function(a){return a.kill&&a.kill()}),this.clear(),i)for(var o=go.length;o--;)go[o].id===this.id&&go.splice(o,1)},e.revert=function(n){this.kill(n||{})},r})(),XA=(function(){function r(t){this.contexts=[],this.scope=t,un&&un.data.push(this)}var e=r.prototype;return e.add=function(n,i,s){Dr(n)||(n={matches:n});var o=new mx(0,s||this.scope),a=o.conditions={},l,c,u;un&&!o.selector&&(o.selector=un.selector),this.contexts.push(o),i=o.add("onMatch",i),o.queries=n;for(c in n)c==="all"?u=1:(l=_r.matchMedia(n[c]),l&&(go.indexOf(o)<0&&go.push(o),(a[c]=l.matches)&&(u=1),l.addListener?l.addListener(yh):l.addEventListener("change",yh)));return u&&i(o,function(d){return o.add(null,d)}),this},e.revert=function(n){this.kill(n||{})},e.kill=function(n){this.contexts.forEach(function(i){return i.kill(n,!0)})},r})(),Iu={registerPlugin:function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];t.forEach(function(i){return ex(i)})},timeline:function(e){return new di(e)},getTweensOf:function(e,t){return hn.getTweensOf(e,t)},getProperty:function(e,t,n,i){Bn(e)&&(e=Yi(e)[0]);var s=ho(e||{}).get,o=n?V_:z_;return n==="native"&&(n=""),e&&(t?o((Ri[t]&&Ri[t].get||s)(e,t,n,i)):function(a,l,c){return o((Ri[a]&&Ri[a].get||s)(e,a,l,c))})},quickSetter:function(e,t,n){if(e=Yi(e),e.length>1){var i=e.map(function(u){return Si.quickSetter(u,t,n)}),s=i.length;return function(u){for(var d=s;d--;)i[d](u)}}e=e[0]||{};var o=Ri[t],a=ho(e),l=a.harness&&(a.harness.aliases||{})[t]||t,c=o?function(u){var d=new o;oa._pt=0,d.init(e,n?u+n:u,oa,0,[e]),d.render(1,d),oa._pt&&Tp(1,oa)}:a.set(e,l);return o?c:function(u){return c(e,l,n?u+n:u,a,1)}},quickTo:function(e,t,n){var i,s=Si.to(e,Fi((i={},i[t]="+=0.1",i.paused=!0,i.stagger=0,i),n||{})),o=function(l,c,u){return s.resetTo(t,l,c,u)};return o.tween=s,o},isTweening:function(e){return hn.getTweensOf(e,!0).length>0},defaults:function(e){return e&&e.ease&&(e.ease=mo(e.ease,Ra.ease)),M0(Ra,e||{})},config:function(e){return M0(Oi,e||{})},registerEffect:function(e){var t=e.name,n=e.effect,i=e.plugins,s=e.defaults,o=e.extendTimeline;(i||"").split(",").forEach(function(a){return a&&!Ri[a]&&!Ni[a]&&$l(t+" effect requires "+a+" plugin.")}),Yd[t]=function(a,l,c){return n(Yi(a),Fi(l||{},s),c)},o&&(di.prototype[t]=function(a,l,c){return this.add(Yd[t](a,Dr(l)?l:(c=l)&&{},this),c)})},registerEase:function(e,t){Nt[e]=mo(t)},parseEase:function(e,t){return arguments.length?mo(e,t):Nt},getById:function(e){return hn.getById(e)},exportRoot:function(e,t){e===void 0&&(e={});var n=new di(e),i,s;for(n.smoothChildTiming=vi(e.smoothChildTiming),hn.remove(n),n._dp=0,n._time=n._tTime=hn._time,i=hn._first;i;)s=i._next,(t||!(!i._dur&&i instanceof Mn&&i.vars.onComplete===i._targets[0]))&&yr(n,i,i._start-i._delay),i=s;return yr(hn,n,0),n},context:function(e,t){return e?new mx(e,t):un},matchMedia:function(e){return new XA(e)},matchMediaRefresh:function(){return go.forEach(function(e){var t=e.conditions,n,i;for(i in t)t[i]&&(t[i]=!1,n=1);n&&e.revert()})||yh()},addEventListener:function(e,t){var n=cu[e]||(cu[e]=[]);~n.indexOf(t)||n.push(t)},removeEventListener:function(e,t){var n=cu[e],i=n&&n.indexOf(t);i>=0&&n.splice(i,1)},utils:{wrap:SA,wrapYoyo:MA,distribute:$_,random:K_,snap:j_,normalize:wA,getUnit:$n,clamp:xA,splitColor:tx,toArray:Yi,selector:_h,mapRange:J_,pipe:yA,unitize:bA,interpolate:TA,shuffle:Y_},install:N_,effects:Yd,ticker:Li,updateRoot:di.updateRoot,plugins:Ri,globalTimeline:hn,core:{PropTween:bi,globals:F_,Tween:Mn,Timeline:di,Animation:Jl,getCache:ho,_removeLinkedListItem:Zu,reverting:function(){return Hn},context:function(e){return e&&un&&(un.data.push(e),e._ctx=un),un},suppressOverwrites:function(e){return hp=e}}};yi("to,from,fromTo,delayedCall,set,killTweensOf",function(r){return Iu[r]=Mn[r]});Li.add(di.updateRoot);oa=Iu.to({},{duration:0});var qA=function(e,t){for(var n=e._pt;n&&n.p!==t&&n.op!==t&&n.fp!==t;)n=n._next;return n},YA=function(e,t){var n=e._targets,i,s,o;for(i in t)for(s=n.length;s--;)o=e._ptLookup[s][i],o&&(o=o.d)&&(o._pt&&(o=qA(o,i)),o&&o.modifier&&o.modifier(t[i],e,n[s],i))},Jd=function(e,t){return{name:e,rawVars:1,init:function(i,s,o){o._onInit=function(a){var l,c;if(Bn(s)&&(l={},yi(s,function(u){return l[u]=1}),s=l),t){l={};for(c in s)l[c]=t(s[c]);s=l}YA(a,s)}}}},Si=Iu.registerPlugin({name:"attr",init:function(e,t,n,i,s){var o,a,l;this.tween=n;for(o in t)l=e.getAttribute(o)||"",a=this.add(e,"setAttribute",(l||0)+"",t[o],i,s,0,0,o),a.op=o,a.b=l,this._props.push(o)},render:function(e,t){for(var n=t._pt;n;)Hn?n.set(n.t,n.p,n.b,n):n.r(e,n.d),n=n._next}},{name:"endArray",init:function(e,t){for(var n=t.length;n--;)this.add(e,n,e[n]||0,t[n],0,0,0,0,0,1)}},Jd("roundProps",xh),Jd("modifiers"),Jd("snap",j_))||Iu;Mn.version=di.version=Si.version="3.12.7";O_=1;mp()&&Ia();Nt.Power0;Nt.Power1;Nt.Power2;Nt.Power3;Nt.Power4;Nt.Linear;Nt.Quad;Nt.Cubic;Nt.Quart;Nt.Quint;Nt.Strong;Nt.Elastic;Nt.Back;Nt.SteppedEase;Nt.Bounce;Nt.Sine;Nt.Expo;Nt.Circ;/*!
 * CSSPlugin 3.12.7
 * https://gsap.com
 *
 * Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license or for
 * Club GSAP members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/var P0,bs,fa,Ep,ao,L0,Ap,$A=function(){return typeof window<"u"},is={},eo=180/Math.PI,ha=Math.PI/180,Ko=Math.atan2,D0=1e8,Cp=/([A-Z])/g,jA=/(left|right|width|margin|padding|x)/i,KA=/[\s,\(]\S/,Mr={autoAlpha:"opacity,visibility",scale:"scaleX,scaleY",alpha:"opacity"},bh=function(e,t){return t.set(t.t,t.p,Math.round((t.s+t.c*e)*1e4)/1e4+t.u,t)},ZA=function(e,t){return t.set(t.t,t.p,e===1?t.e:Math.round((t.s+t.c*e)*1e4)/1e4+t.u,t)},JA=function(e,t){return t.set(t.t,t.p,e?Math.round((t.s+t.c*e)*1e4)/1e4+t.u:t.b,t)},QA=function(e,t){var n=t.s+t.c*e;t.set(t.t,t.p,~~(n+(n<0?-.5:.5))+t.u,t)},gx=function(e,t){return t.set(t.t,t.p,e?t.e:t.b,t)},_x=function(e,t){return t.set(t.t,t.p,e!==1?t.b:t.e,t)},eC=function(e,t,n){return e.style[t]=n},tC=function(e,t,n){return e.style.setProperty(t,n)},nC=function(e,t,n){return e._gsap[t]=n},iC=function(e,t,n){return e._gsap.scaleX=e._gsap.scaleY=n},rC=function(e,t,n,i,s){var o=e._gsap;o.scaleX=o.scaleY=n,o.renderTransform(s,o)},sC=function(e,t,n,i,s){var o=e._gsap;o[t]=n,o.renderTransform(s,o)},pn="transform",wi=pn+"Origin",oC=function r(e,t){var n=this,i=this.target,s=i.style,o=i._gsap;if(e in is&&s){if(this.tfm=this.tfm||{},e!=="transform")e=Mr[e]||e,~e.indexOf(",")?e.split(",").forEach(function(a){return n.tfm[a]=Wr(i,a)}):this.tfm[e]=o.x?o[e]:Wr(i,e),e===wi&&(this.tfm.zOrigin=o.zOrigin);else return Mr.transform.split(",").forEach(function(a){return r.call(n,a,t)});if(this.props.indexOf(pn)>=0)return;o.svg&&(this.svgo=i.getAttribute("data-svg-origin"),this.props.push(wi,t,"")),e=pn}(s||t)&&this.props.push(e,t,s[e])},xx=function(e){e.translate&&(e.removeProperty("translate"),e.removeProperty("scale"),e.removeProperty("rotate"))},aC=function(){var e=this.props,t=this.target,n=t.style,i=t._gsap,s,o;for(s=0;s<e.length;s+=3)e[s+1]?e[s+1]===2?t[e[s]](e[s+2]):t[e[s]]=e[s+2]:e[s+2]?n[e[s]]=e[s+2]:n.removeProperty(e[s].substr(0,2)==="--"?e[s]:e[s].replace(Cp,"-$1").toLowerCase());if(this.tfm){for(o in this.tfm)i[o]=this.tfm[o];i.svg&&(i.renderTransform(),t.setAttribute("data-svg-origin",this.svgo||"")),s=Ap(),(!s||!s.isStart)&&!n[pn]&&(xx(n),i.zOrigin&&n[wi]&&(n[wi]+=" "+i.zOrigin+"px",i.zOrigin=0,i.renderTransform()),i.uncache=1)}},vx=function(e,t){var n={target:e,props:[],revert:aC,save:oC};return e._gsap||Si.core.getCache(e),t&&e.style&&e.nodeType&&t.split(",").forEach(function(i){return n.save(i)}),n},yx,wh=function(e,t){var n=bs.createElementNS?bs.createElementNS((t||"http://www.w3.org/1999/xhtml").replace(/^https/,"http"),e):bs.createElement(e);return n&&n.style?n:bs.createElement(e)},Cr=function r(e,t,n){var i=getComputedStyle(e);return i[t]||i.getPropertyValue(t.replace(Cp,"-$1").toLowerCase())||i.getPropertyValue(t)||!n&&r(e,Oa(t)||t,1)||""},I0="O,Moz,ms,Ms,Webkit".split(","),Oa=function(e,t,n){var i=t||ao,s=i.style,o=5;if(e in s&&!n)return e;for(e=e.charAt(0).toUpperCase()+e.substr(1);o--&&!(I0[o]+e in s););return o<0?null:(o===3?"ms":o>=0?I0[o]:"")+e},Sh=function(){$A()&&window.document&&(P0=window,bs=P0.document,fa=bs.documentElement,ao=wh("div")||{style:{}},wh("div"),pn=Oa(pn),wi=pn+"Origin",ao.style.cssText="border-width:0;line-height:0;position:absolute;padding:0",yx=!!Oa("perspective"),Ap=Si.core.reverting,Ep=1)},O0=function(e){var t=e.ownerSVGElement,n=wh("svg",t&&t.getAttribute("xmlns")||"http://www.w3.org/2000/svg"),i=e.cloneNode(!0),s;i.style.display="block",n.appendChild(i),fa.appendChild(n);try{s=i.getBBox()}catch{}return n.removeChild(i),fa.removeChild(n),s},N0=function(e,t){for(var n=t.length;n--;)if(e.hasAttribute(t[n]))return e.getAttribute(t[n])},bx=function(e){var t,n;try{t=e.getBBox()}catch{t=O0(e),n=1}return t&&(t.width||t.height)||n||(t=O0(e)),t&&!t.width&&!t.x&&!t.y?{x:+N0(e,["x","cx","x1"])||0,y:+N0(e,["y","cy","y1"])||0,width:0,height:0}:t},wx=function(e){return!!(e.getCTM&&(!e.parentNode||e.ownerSVGElement)&&bx(e))},wo=function(e,t){if(t){var n=e.style,i;t in is&&t!==wi&&(t=pn),n.removeProperty?(i=t.substr(0,2),(i==="ms"||t.substr(0,6)==="webkit")&&(t="-"+t),n.removeProperty(i==="--"?t:t.replace(Cp,"-$1").toLowerCase())):n.removeAttribute(t)}},ws=function(e,t,n,i,s,o){var a=new bi(e._pt,t,n,0,1,o?_x:gx);return e._pt=a,a.b=i,a.e=s,e._props.push(n),a},F0={deg:1,rad:1,turn:1},lC={grid:1,flex:1},Fs=function r(e,t,n,i){var s=parseFloat(n)||0,o=(n+"").trim().substr((s+"").length)||"px",a=ao.style,l=jA.test(t),c=e.tagName.toLowerCase()==="svg",u=(c?"client":"offset")+(l?"Width":"Height"),d=100,f=i==="px",h=i==="%",_,g,m,p;if(i===o||!s||F0[i]||F0[o])return s;if(o!=="px"&&!f&&(s=r(e,t,n,"px")),p=e.getCTM&&wx(e),(h||o==="%")&&(is[t]||~t.indexOf("adius")))return _=p?e.getBBox()[l?"width":"height"]:e[u],_n(h?s/_*d:s/100*_);if(a[l?"width":"height"]=d+(f?o:i),g=i!=="rem"&&~t.indexOf("adius")||i==="em"&&e.appendChild&&!c?e:e.parentNode,p&&(g=(e.ownerSVGElement||{}).parentNode),(!g||g===bs||!g.appendChild)&&(g=bs.body),m=g._gsap,m&&h&&m.width&&l&&m.time===Li.time&&!m.uncache)return _n(s/m.width*d);if(h&&(t==="height"||t==="width")){var b=e.style[t];e.style[t]=d+i,_=e[u],b?e.style[t]=b:wo(e,t)}else(h||o==="%")&&!lC[Cr(g,"display")]&&(a.position=Cr(e,"position")),g===e&&(a.position="static"),g.appendChild(ao),_=ao[u],g.removeChild(ao),a.position="absolute";return l&&h&&(m=ho(g),m.time=Li.time,m.width=g[u]),_n(f?_*s/d:_&&s?d/_*s:0)},Wr=function(e,t,n,i){var s;return Ep||Sh(),t in Mr&&t!=="transform"&&(t=Mr[t],~t.indexOf(",")&&(t=t.split(",")[0])),is[t]&&t!=="transform"?(s=ec(e,i),s=t!=="transformOrigin"?s[t]:s.svg?s.origin:Nu(Cr(e,wi))+" "+s.zOrigin+"px"):(s=e.style[t],(!s||s==="auto"||i||~(s+"").indexOf("calc("))&&(s=Ou[t]&&Ou[t](e,t,n)||Cr(e,t)||k_(e,t)||(t==="opacity"?1:0))),n&&!~(s+"").trim().indexOf(" ")?Fs(e,t,s,n)+n:s},cC=function(e,t,n,i){if(!n||n==="none"){var s=Oa(t,e,1),o=s&&Cr(e,s,1);o&&o!==n?(t=s,n=o):t==="borderColor"&&(n=Cr(e,"borderTopColor"))}var a=new bi(this._pt,e.style,t,0,1,hx),l=0,c=0,u,d,f,h,_,g,m,p,b,x,v,T;if(a.b=n,a.e=i,n+="",i+="",i==="auto"&&(g=e.style[t],e.style[t]=i,i=Cr(e,t)||i,g?e.style[t]=g:wo(e,t)),u=[n,i],ix(u),n=u[0],i=u[1],f=n.match(sa)||[],T=i.match(sa)||[],T.length){for(;d=sa.exec(i);)m=d[0],b=i.substring(l,d.index),_?_=(_+1)%5:(b.substr(-5)==="rgba("||b.substr(-5)==="hsla(")&&(_=1),m!==(g=f[c++]||"")&&(h=parseFloat(g)||0,v=g.substr((h+"").length),m.charAt(1)==="="&&(m=da(h,m)+v),p=parseFloat(m),x=m.substr((p+"").length),l=sa.lastIndex-x.length,x||(x=x||Oi.units[t]||v,l===i.length&&(i+=x,a.e+=x)),v!==x&&(h=Fs(e,t,g,x)||0),a._pt={_next:a._pt,p:b||c===1?b:",",s:h,c:p-h,m:_&&_<4||t==="zIndex"?Math.round:0});a.c=l<i.length?i.substring(l,i.length):""}else a.r=t==="display"&&i==="none"?_x:gx;return D_.test(i)&&(a.e=0),this._pt=a,a},U0={top:"0%",bottom:"100%",left:"0%",right:"100%",center:"50%"},uC=function(e){var t=e.split(" "),n=t[0],i=t[1]||"50%";return(n==="top"||n==="bottom"||i==="left"||i==="right")&&(e=n,n=i,i=e),t[0]=U0[n]||n,t[1]=U0[i]||i,t.join(" ")},dC=function(e,t){if(t.tween&&t.tween._time===t.tween._dur){var n=t.t,i=n.style,s=t.u,o=n._gsap,a,l,c;if(s==="all"||s===!0)i.cssText="",l=1;else for(s=s.split(","),c=s.length;--c>-1;)a=s[c],is[a]&&(l=1,a=a==="transformOrigin"?wi:pn),wo(n,a);l&&(wo(n,pn),o&&(o.svg&&n.removeAttribute("transform"),i.scale=i.rotate=i.translate="none",ec(n,1),o.uncache=1,xx(i)))}},Ou={clearProps:function(e,t,n,i,s){if(s.data!=="isFromStart"){var o=e._pt=new bi(e._pt,t,n,0,0,dC);return o.u=i,o.pr=-10,o.tween=s,e._props.push(n),1}}},Ql=[1,0,0,1,0,0],Sx={},Mx=function(e){return e==="matrix(1, 0, 0, 1, 0, 0)"||e==="none"||!e},k0=function(e){var t=Cr(e,pn);return Mx(t)?Ql:t.substr(7).match(L_).map(_n)},Rp=function(e,t){var n=e._gsap||ho(e),i=e.style,s=k0(e),o,a,l,c;return n.svg&&e.getAttribute("transform")?(l=e.transform.baseVal.consolidate().matrix,s=[l.a,l.b,l.c,l.d,l.e,l.f],s.join(",")==="1,0,0,1,0,0"?Ql:s):(s===Ql&&!e.offsetParent&&e!==fa&&!n.svg&&(l=i.display,i.display="block",o=e.parentNode,(!o||!e.offsetParent&&!e.getBoundingClientRect().width)&&(c=1,a=e.nextElementSibling,fa.appendChild(e)),s=k0(e),l?i.display=l:wo(e,"display"),c&&(a?o.insertBefore(e,a):o?o.appendChild(e):fa.removeChild(e))),t&&s.length>6?[s[0],s[1],s[4],s[5],s[12],s[13]]:s)},Mh=function(e,t,n,i,s,o){var a=e._gsap,l=s||Rp(e,!0),c=a.xOrigin||0,u=a.yOrigin||0,d=a.xOffset||0,f=a.yOffset||0,h=l[0],_=l[1],g=l[2],m=l[3],p=l[4],b=l[5],x=t.split(" "),v=parseFloat(x[0])||0,T=parseFloat(x[1])||0,M,E,R,w;n?l!==Ql&&(E=h*m-_*g)&&(R=v*(m/E)+T*(-g/E)+(g*b-m*p)/E,w=v*(-_/E)+T*(h/E)-(h*b-_*p)/E,v=R,T=w):(M=bx(e),v=M.x+(~x[0].indexOf("%")?v/100*M.width:v),T=M.y+(~(x[1]||x[0]).indexOf("%")?T/100*M.height:T)),i||i!==!1&&a.smooth?(p=v-c,b=T-u,a.xOffset=d+(p*h+b*g)-p,a.yOffset=f+(p*_+b*m)-b):a.xOffset=a.yOffset=0,a.xOrigin=v,a.yOrigin=T,a.smooth=!!i,a.origin=t,a.originIsAbsolute=!!n,e.style[wi]="0px 0px",o&&(ws(o,a,"xOrigin",c,v),ws(o,a,"yOrigin",u,T),ws(o,a,"xOffset",d,a.xOffset),ws(o,a,"yOffset",f,a.yOffset)),e.setAttribute("data-svg-origin",v+" "+T)},ec=function(e,t){var n=e._gsap||new ax(e);if("x"in n&&!t&&!n.uncache)return n;var i=e.style,s=n.scaleX<0,o="px",a="deg",l=getComputedStyle(e),c=Cr(e,wi)||"0",u,d,f,h,_,g,m,p,b,x,v,T,M,E,R,w,y,L,N,W,j,k,J,te,F,ue,O,$,P,_e,we,Se;return u=d=f=g=m=p=b=x=v=0,h=_=1,n.svg=!!(e.getCTM&&wx(e)),l.translate&&((l.translate!=="none"||l.scale!=="none"||l.rotate!=="none")&&(i[pn]=(l.translate!=="none"?"translate3d("+(l.translate+" 0 0").split(" ").slice(0,3).join(", ")+") ":"")+(l.rotate!=="none"?"rotate("+l.rotate+") ":"")+(l.scale!=="none"?"scale("+l.scale.split(" ").join(",")+") ":"")+(l[pn]!=="none"?l[pn]:"")),i.scale=i.rotate=i.translate="none"),E=Rp(e,n.svg),n.svg&&(n.uncache?(F=e.getBBox(),c=n.xOrigin-F.x+"px "+(n.yOrigin-F.y)+"px",te=""):te=!t&&e.getAttribute("data-svg-origin"),Mh(e,te||c,!!te||n.originIsAbsolute,n.smooth!==!1,E)),T=n.xOrigin||0,M=n.yOrigin||0,E!==Ql&&(L=E[0],N=E[1],W=E[2],j=E[3],u=k=E[4],d=J=E[5],E.length===6?(h=Math.sqrt(L*L+N*N),_=Math.sqrt(j*j+W*W),g=L||N?Ko(N,L)*eo:0,b=W||j?Ko(W,j)*eo+g:0,b&&(_*=Math.abs(Math.cos(b*ha))),n.svg&&(u-=T-(T*L+M*W),d-=M-(T*N+M*j))):(Se=E[6],_e=E[7],O=E[8],$=E[9],P=E[10],we=E[11],u=E[12],d=E[13],f=E[14],R=Ko(Se,P),m=R*eo,R&&(w=Math.cos(-R),y=Math.sin(-R),te=k*w+O*y,F=J*w+$*y,ue=Se*w+P*y,O=k*-y+O*w,$=J*-y+$*w,P=Se*-y+P*w,we=_e*-y+we*w,k=te,J=F,Se=ue),R=Ko(-W,P),p=R*eo,R&&(w=Math.cos(-R),y=Math.sin(-R),te=L*w-O*y,F=N*w-$*y,ue=W*w-P*y,we=j*y+we*w,L=te,N=F,W=ue),R=Ko(N,L),g=R*eo,R&&(w=Math.cos(R),y=Math.sin(R),te=L*w+N*y,F=k*w+J*y,N=N*w-L*y,J=J*w-k*y,L=te,k=F),m&&Math.abs(m)+Math.abs(g)>359.9&&(m=g=0,p=180-p),h=_n(Math.sqrt(L*L+N*N+W*W)),_=_n(Math.sqrt(J*J+Se*Se)),R=Ko(k,J),b=Math.abs(R)>2e-4?R*eo:0,v=we?1/(we<0?-we:we):0),n.svg&&(te=e.getAttribute("transform"),n.forceCSS=e.setAttribute("transform","")||!Mx(Cr(e,pn)),te&&e.setAttribute("transform",te))),Math.abs(b)>90&&Math.abs(b)<270&&(s?(h*=-1,b+=g<=0?180:-180,g+=g<=0?180:-180):(_*=-1,b+=b<=0?180:-180)),t=t||n.uncache,n.x=u-((n.xPercent=u&&(!t&&n.xPercent||(Math.round(e.offsetWidth/2)===Math.round(-u)?-50:0)))?e.offsetWidth*n.xPercent/100:0)+o,n.y=d-((n.yPercent=d&&(!t&&n.yPercent||(Math.round(e.offsetHeight/2)===Math.round(-d)?-50:0)))?e.offsetHeight*n.yPercent/100:0)+o,n.z=f+o,n.scaleX=_n(h),n.scaleY=_n(_),n.rotation=_n(g)+a,n.rotationX=_n(m)+a,n.rotationY=_n(p)+a,n.skewX=b+a,n.skewY=x+a,n.transformPerspective=v+o,(n.zOrigin=parseFloat(c.split(" ")[2])||!t&&n.zOrigin||0)&&(i[wi]=Nu(c)),n.xOffset=n.yOffset=0,n.force3D=Oi.force3D,n.renderTransform=n.svg?hC:yx?Tx:fC,n.uncache=0,n},Nu=function(e){return(e=e.split(" "))[0]+" "+e[1]},Qd=function(e,t,n){var i=$n(t);return _n(parseFloat(t)+parseFloat(Fs(e,"x",n+"px",i)))+i},fC=function(e,t){t.z="0px",t.rotationY=t.rotationX="0deg",t.force3D=0,Tx(e,t)},Zs="0deg",tl="0px",Js=") ",Tx=function(e,t){var n=t||this,i=n.xPercent,s=n.yPercent,o=n.x,a=n.y,l=n.z,c=n.rotation,u=n.rotationY,d=n.rotationX,f=n.skewX,h=n.skewY,_=n.scaleX,g=n.scaleY,m=n.transformPerspective,p=n.force3D,b=n.target,x=n.zOrigin,v="",T=p==="auto"&&e&&e!==1||p===!0;if(x&&(d!==Zs||u!==Zs)){var M=parseFloat(u)*ha,E=Math.sin(M),R=Math.cos(M),w;M=parseFloat(d)*ha,w=Math.cos(M),o=Qd(b,o,E*w*-x),a=Qd(b,a,-Math.sin(M)*-x),l=Qd(b,l,R*w*-x+x)}m!==tl&&(v+="perspective("+m+Js),(i||s)&&(v+="translate("+i+"%, "+s+"%) "),(T||o!==tl||a!==tl||l!==tl)&&(v+=l!==tl||T?"translate3d("+o+", "+a+", "+l+") ":"translate("+o+", "+a+Js),c!==Zs&&(v+="rotate("+c+Js),u!==Zs&&(v+="rotateY("+u+Js),d!==Zs&&(v+="rotateX("+d+Js),(f!==Zs||h!==Zs)&&(v+="skew("+f+", "+h+Js),(_!==1||g!==1)&&(v+="scale("+_+", "+g+Js),b.style[pn]=v||"translate(0, 0)"},hC=function(e,t){var n=t||this,i=n.xPercent,s=n.yPercent,o=n.x,a=n.y,l=n.rotation,c=n.skewX,u=n.skewY,d=n.scaleX,f=n.scaleY,h=n.target,_=n.xOrigin,g=n.yOrigin,m=n.xOffset,p=n.yOffset,b=n.forceCSS,x=parseFloat(o),v=parseFloat(a),T,M,E,R,w;l=parseFloat(l),c=parseFloat(c),u=parseFloat(u),u&&(u=parseFloat(u),c+=u,l+=u),l||c?(l*=ha,c*=ha,T=Math.cos(l)*d,M=Math.sin(l)*d,E=Math.sin(l-c)*-f,R=Math.cos(l-c)*f,c&&(u*=ha,w=Math.tan(c-u),w=Math.sqrt(1+w*w),E*=w,R*=w,u&&(w=Math.tan(u),w=Math.sqrt(1+w*w),T*=w,M*=w)),T=_n(T),M=_n(M),E=_n(E),R=_n(R)):(T=d,R=f,M=E=0),(x&&!~(o+"").indexOf("px")||v&&!~(a+"").indexOf("px"))&&(x=Fs(h,"x",o,"px"),v=Fs(h,"y",a,"px")),(_||g||m||p)&&(x=_n(x+_-(_*T+g*E)+m),v=_n(v+g-(_*M+g*R)+p)),(i||s)&&(w=h.getBBox(),x=_n(x+i/100*w.width),v=_n(v+s/100*w.height)),w="matrix("+T+","+M+","+E+","+R+","+x+","+v+")",h.setAttribute("transform",w),b&&(h.style[pn]=w)},pC=function(e,t,n,i,s){var o=360,a=Bn(s),l=parseFloat(s)*(a&&~s.indexOf("rad")?eo:1),c=l-i,u=i+c+"deg",d,f;return a&&(d=s.split("_")[1],d==="short"&&(c%=o,c!==c%(o/2)&&(c+=c<0?o:-o)),d==="cw"&&c<0?c=(c+o*D0)%o-~~(c/o)*o:d==="ccw"&&c>0&&(c=(c-o*D0)%o-~~(c/o)*o)),e._pt=f=new bi(e._pt,t,n,i,c,ZA),f.e=u,f.u="deg",e._props.push(n),f},B0=function(e,t){for(var n in t)e[n]=t[n];return e},mC=function(e,t,n){var i=B0({},n._gsap),s="perspective,force3D,transformOrigin,svgOrigin",o=n.style,a,l,c,u,d,f,h,_;i.svg?(c=n.getAttribute("transform"),n.setAttribute("transform",""),o[pn]=t,a=ec(n,1),wo(n,pn),n.setAttribute("transform",c)):(c=getComputedStyle(n)[pn],o[pn]=t,a=ec(n,1),o[pn]=c);for(l in is)c=i[l],u=a[l],c!==u&&s.indexOf(l)<0&&(h=$n(c),_=$n(u),d=h!==_?Fs(n,l,c,_):parseFloat(c),f=parseFloat(u),e._pt=new bi(e._pt,a,l,d,f-d,bh),e._pt.u=_||0,e._props.push(l));B0(a,i)};yi("padding,margin,Width,Radius",function(r,e){var t="Top",n="Right",i="Bottom",s="Left",o=(e<3?[t,n,i,s]:[t+s,t+n,i+n,i+s]).map(function(a){return e<2?r+a:"border"+a+r});Ou[e>1?"border"+r:r]=function(a,l,c,u,d){var f,h;if(arguments.length<4)return f=o.map(function(_){return Wr(a,_,c)}),h=f.join(" "),h.split(f[0]).length===5?f[0]:h;f=(u+"").split(" "),h={},o.forEach(function(_,g){return h[_]=f[g]=f[g]||f[(g-1)/2|0]}),a.init(l,h,d)}});var Ex={name:"css",register:Sh,targetTest:function(e){return e.style&&e.nodeType},init:function(e,t,n,i,s){var o=this._props,a=e.style,l=n.vars.startAt,c,u,d,f,h,_,g,m,p,b,x,v,T,M,E,R;Ep||Sh(),this.styles=this.styles||vx(e),R=this.styles.props,this.tween=n;for(g in t)if(g!=="autoRound"&&(u=t[g],!(Ri[g]&&lx(g,t,n,i,e,s)))){if(h=typeof u,_=Ou[g],h==="function"&&(u=u.call(n,i,e,s),h=typeof u),h==="string"&&~u.indexOf("random(")&&(u=Kl(u)),_)_(this,e,g,u,n)&&(E=1);else if(g.substr(0,2)==="--")c=(getComputedStyle(e).getPropertyValue(g)+"").trim(),u+="",Ps.lastIndex=0,Ps.test(c)||(m=$n(c),p=$n(u)),p?m!==p&&(c=Fs(e,g,c,p)+p):m&&(u+=m),this.add(a,"setProperty",c,u,i,s,0,0,g),o.push(g),R.push(g,0,a[g]);else if(h!=="undefined"){if(l&&g in l?(c=typeof l[g]=="function"?l[g].call(n,i,e,s):l[g],Bn(c)&&~c.indexOf("random(")&&(c=Kl(c)),$n(c+"")||c==="auto"||(c+=Oi.units[g]||$n(Wr(e,g))||""),(c+"").charAt(1)==="="&&(c=Wr(e,g))):c=Wr(e,g),f=parseFloat(c),b=h==="string"&&u.charAt(1)==="="&&u.substr(0,2),b&&(u=u.substr(2)),d=parseFloat(u),g in Mr&&(g==="autoAlpha"&&(f===1&&Wr(e,"visibility")==="hidden"&&d&&(f=0),R.push("visibility",0,a.visibility),ws(this,a,"visibility",f?"inherit":"hidden",d?"inherit":"hidden",!d)),g!=="scale"&&g!=="transform"&&(g=Mr[g],~g.indexOf(",")&&(g=g.split(",")[0]))),x=g in is,x){if(this.styles.save(g),v||(T=e._gsap,T.renderTransform&&!t.parseTransform||ec(e,t.parseTransform),M=t.smoothOrigin!==!1&&T.smooth,v=this._pt=new bi(this._pt,a,pn,0,1,T.renderTransform,T,0,-1),v.dep=1),g==="scale")this._pt=new bi(this._pt,T,"scaleY",T.scaleY,(b?da(T.scaleY,b+d):d)-T.scaleY||0,bh),this._pt.u=0,o.push("scaleY",g),g+="X";else if(g==="transformOrigin"){R.push(wi,0,a[wi]),u=uC(u),T.svg?Mh(e,u,0,M,0,this):(p=parseFloat(u.split(" ")[2])||0,p!==T.zOrigin&&ws(this,T,"zOrigin",T.zOrigin,p),ws(this,a,g,Nu(c),Nu(u)));continue}else if(g==="svgOrigin"){Mh(e,u,1,M,0,this);continue}else if(g in Sx){pC(this,T,g,f,b?da(f,b+u):u);continue}else if(g==="smoothOrigin"){ws(this,T,"smooth",T.smooth,u);continue}else if(g==="force3D"){T[g]=u;continue}else if(g==="transform"){mC(this,u,e);continue}}else g in a||(g=Oa(g)||g);if(x||(d||d===0)&&(f||f===0)&&!KA.test(u)&&g in a)m=(c+"").substr((f+"").length),d||(d=0),p=$n(u)||(g in Oi.units?Oi.units[g]:m),m!==p&&(f=Fs(e,g,c,p)),this._pt=new bi(this._pt,x?T:a,g,f,(b?da(f,b+d):d)-f,!x&&(p==="px"||g==="zIndex")&&t.autoRound!==!1?QA:bh),this._pt.u=p||0,m!==p&&p!=="%"&&(this._pt.b=c,this._pt.r=JA);else if(g in a)cC.call(this,e,g,c,b?b+u:u);else if(g in e)this.add(e,g,c||e[g],b?b+u:u,i,s);else if(g!=="parseTransform"){_p(g,u);continue}x||(g in a?R.push(g,0,a[g]):typeof e[g]=="function"?R.push(g,2,e[g]()):R.push(g,1,c||e[g])),o.push(g)}}E&&px(this)},render:function(e,t){if(t.tween._time||!Ap())for(var n=t._pt;n;)n.r(e,n.d),n=n._next;else t.styles.revert()},get:Wr,aliases:Mr,getSetter:function(e,t,n){var i=Mr[t];return i&&i.indexOf(",")<0&&(t=i),t in is&&t!==wi&&(e._gsap.x||Wr(e,"x"))?n&&L0===n?t==="scale"?iC:nC:(L0=n||{})&&(t==="scale"?rC:sC):e.style&&!pp(e.style[t])?eC:~t.indexOf("-")?tC:Mp(e,t)},core:{_removeProperty:wo,_getMatrix:Rp}};Si.utils.checkPrefix=Oa;Si.core.getStyleSaver=vx;(function(r,e,t,n){var i=yi(r+","+e+","+t,function(s){is[s]=1});yi(e,function(s){Oi.units[s]="deg",Sx[s]=1}),Mr[i[13]]=r+","+e,yi(n,function(s){var o=s.split(":");Mr[o[1]]=i[o[0]]})})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent","rotation,rotationX,rotationY,skewX,skewY","transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective","0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");yi("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective",function(r){Oi.units[r]="px"});Si.registerPlugin(Ex);var he=Si.registerPlugin(Ex)||Si;he.core.Tween;function Bc(r,e){const t=document.querySelector(`#${r} .number`);if(!t)return;let n;r==="days"&&e>=100?n=String(e):n=("0"+e).slice(-2),t.textContent!==n?he.to(t,{duration:.2,opacity:0,y:-10,ease:"power2.in",onComplete:()=>{t.textContent=n,he.fromTo(t,{opacity:0,y:10},{duration:.3,opacity:1,y:0,ease:"power2.out"})}}):t.textContent=n}function gC(r){function e(){const t=Date.now(),n=r-t;if(n<0)return;const i=Math.floor(n/(1e3*60*60*24)),s=Math.floor(n%(1e3*60*60*24)/(1e3*60*60)),o=Math.floor(n%(1e3*60*60)/(1e3*60)),a=Math.floor(n%(1e3*60)/1e3);i>=100?String(i):("0"+i).slice(-2),("0"+s).slice(-2),("0"+o).slice(-2),("0"+a).slice(-2),Bc("days",i),Bc("hours",s),Bc("minutes",o),Bc("seconds",a)}e(),setInterval(e,1e3)}function _C(r,e){for(var t=0;t<e.length;t++){var n=e[t];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(r,n.key,n)}}function xC(r,e,t){return e&&_C(r.prototype,e),r}/*!
 * Observer 3.12.7
 * https://gsap.com
 *
 * @license Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license or for
 * Club GSAP members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/var Vn,uu,Di,Ss,Ms,pa,Ax,to,Cl,Cx,Kr,tr,Rx,Px=function(){return Vn||typeof window<"u"&&(Vn=window.gsap)&&Vn.registerPlugin&&Vn},Lx=1,aa=[],Tt=[],Rr=[],Rl=Date.now,Th=function(e,t){return t},vC=function(){var e=Cl.core,t=e.bridge||{},n=e._scrollers,i=e._proxies;n.push.apply(n,Tt),i.push.apply(i,Rr),Tt=n,Rr=i,Th=function(o,a){return t[o](a)}},Ls=function(e,t){return~Rr.indexOf(e)&&Rr[Rr.indexOf(e)+1][t]},Pl=function(e){return!!~Cx.indexOf(e)},ri=function(e,t,n,i,s){return e.addEventListener(t,n,{passive:i!==!1,capture:!!s})},ii=function(e,t,n,i){return e.removeEventListener(t,n,!!i)},zc="scrollLeft",Vc="scrollTop",Eh=function(){return Kr&&Kr.isPressed||Tt.cache++},Fu=function(e,t){var n=function i(s){if(s||s===0){Lx&&(Di.history.scrollRestoration="manual");var o=Kr&&Kr.isPressed;s=i.v=Math.round(s)||(Kr&&Kr.iOS?1:0),e(s),i.cacheID=Tt.cache,o&&Th("ss",s)}else(t||Tt.cache!==i.cacheID||Th("ref"))&&(i.cacheID=Tt.cache,i.v=e());return i.v+i.offset};return n.offset=0,e&&n},fi={s:zc,p:"left",p2:"Left",os:"right",os2:"Right",d:"width",d2:"Width",a:"x",sc:Fu(function(r){return arguments.length?Di.scrollTo(r,Cn.sc()):Di.pageXOffset||Ss[zc]||Ms[zc]||pa[zc]||0})},Cn={s:Vc,p:"top",p2:"Top",os:"bottom",os2:"Bottom",d:"height",d2:"Height",a:"y",op:fi,sc:Fu(function(r){return arguments.length?Di.scrollTo(fi.sc(),r):Di.pageYOffset||Ss[Vc]||Ms[Vc]||pa[Vc]||0})},_i=function(e,t){return(t&&t._ctx&&t._ctx.selector||Vn.utils.toArray)(e)[0]||(typeof e=="string"&&Vn.config().nullTargetWarn!==!1?console.warn("Element not found:",e):null)},Us=function(e,t){var n=t.s,i=t.sc;Pl(e)&&(e=Ss.scrollingElement||Ms);var s=Tt.indexOf(e),o=i===Cn.sc?1:2;!~s&&(s=Tt.push(e)-1),Tt[s+o]||ri(e,"scroll",Eh);var a=Tt[s+o],l=a||(Tt[s+o]=Fu(Ls(e,n),!0)||(Pl(e)?i:Fu(function(c){return arguments.length?e[n]=c:e[n]})));return l.target=e,a||(l.smooth=Vn.getProperty(e,"scrollBehavior")==="smooth"),l},Ah=function(e,t,n){var i=e,s=e,o=Rl(),a=o,l=t||50,c=Math.max(500,l*3),u=function(_,g){var m=Rl();g||m-o>l?(s=i,i=_,a=o,o=m):n?i+=_:i=s+(_-s)/(m-a)*(o-a)},d=function(){s=i=n?0:i,a=o=0},f=function(_){var g=a,m=s,p=Rl();return(_||_===0)&&_!==i&&u(_),o===a||p-a>c?0:(i+(n?m:-m))/((n?p:o)-g)*1e3};return{update:u,reset:d,getVelocity:f}},nl=function(e,t){return t&&!e._gsapAllow&&e.preventDefault(),e.changedTouches?e.changedTouches[0]:e},z0=function(e){var t=Math.max.apply(Math,e),n=Math.min.apply(Math,e);return Math.abs(t)>=Math.abs(n)?t:n},Dx=function(){Cl=Vn.core.globals().ScrollTrigger,Cl&&Cl.core&&vC()},Ix=function(e){return Vn=e||Px(),!uu&&Vn&&typeof document<"u"&&document.body&&(Di=window,Ss=document,Ms=Ss.documentElement,pa=Ss.body,Cx=[Di,Ss,Ms,pa],Vn.utils.clamp,Rx=Vn.core.context||function(){},to="onpointerenter"in pa?"pointer":"mouse",Ax=xn.isTouch=Di.matchMedia&&Di.matchMedia("(hover: none), (pointer: coarse)").matches?1:"ontouchstart"in Di||navigator.maxTouchPoints>0||navigator.msMaxTouchPoints>0?2:0,tr=xn.eventTypes=("ontouchstart"in Ms?"touchstart,touchmove,touchcancel,touchend":"onpointerdown"in Ms?"pointerdown,pointermove,pointercancel,pointerup":"mousedown,mousemove,mouseup,mouseup").split(","),setTimeout(function(){return Lx=0},500),Dx(),uu=1),uu};fi.op=Cn;Tt.cache=0;var xn=(function(){function r(t){this.init(t)}var e=r.prototype;return e.init=function(n){uu||Ix(Vn)||console.warn("Please gsap.registerPlugin(Observer)"),Cl||Dx();var i=n.tolerance,s=n.dragMinimum,o=n.type,a=n.target,l=n.lineHeight,c=n.debounce,u=n.preventDefault,d=n.onStop,f=n.onStopDelay,h=n.ignore,_=n.wheelSpeed,g=n.event,m=n.onDragStart,p=n.onDragEnd,b=n.onDrag,x=n.onPress,v=n.onRelease,T=n.onRight,M=n.onLeft,E=n.onUp,R=n.onDown,w=n.onChangeX,y=n.onChangeY,L=n.onChange,N=n.onToggleX,W=n.onToggleY,j=n.onHover,k=n.onHoverEnd,J=n.onMove,te=n.ignoreCheck,F=n.isNormalizer,ue=n.onGestureStart,O=n.onGestureEnd,$=n.onWheel,P=n.onEnable,_e=n.onDisable,we=n.onClick,Se=n.scrollSpeed,Q=n.capture,ee=n.allowClicks,q=n.lockAxis,Ie=n.onLockAxis;this.target=a=_i(a)||Ms,this.vars=n,h&&(h=Vn.utils.toArray(h)),i=i||1e-9,s=s||0,_=_||1,Se=Se||1,o=o||"wheel,touch,pointer",c=c!==!1,l||(l=parseFloat(Di.getComputedStyle(pa).lineHeight)||22);var be,qe,ht,Ne,at,U,it,H=this,rt=0,Ae=0,gt=n.passive||!u&&n.passive!==!1,Le=Us(a,fi),ke=Us(a,Cn),I=Le(),C=ke(),X=~o.indexOf("touch")&&!~o.indexOf("pointer")&&tr[0]==="pointerdown",ae=Pl(a),oe=a.ownerDocument||Ss,ne=[0,0,0],Be=[0,0,0],ye=0,Qe=function(){return ye=Rl()},Pe=function(Ke,lt){return(H.event=Ke)&&h&&~h.indexOf(Ke.target)||lt&&X&&Ke.pointerType!=="touch"||te&&te(Ke,lt)},le=function(){H._vx.reset(),H._vy.reset(),qe.pause(),d&&d(H)},me=function(){var Ke=H.deltaX=z0(ne),lt=H.deltaY=z0(Be),De=Math.abs(Ke)>=i,ct=Math.abs(lt)>=i;L&&(De||ct)&&L(H,Ke,lt,ne,Be),De&&(T&&H.deltaX>0&&T(H),M&&H.deltaX<0&&M(H),w&&w(H),N&&H.deltaX<0!=rt<0&&N(H),rt=H.deltaX,ne[0]=ne[1]=ne[2]=0),ct&&(R&&H.deltaY>0&&R(H),E&&H.deltaY<0&&E(H),y&&y(H),W&&H.deltaY<0!=Ae<0&&W(H),Ae=H.deltaY,Be[0]=Be[1]=Be[2]=0),(Ne||ht)&&(J&&J(H),ht&&(m&&ht===1&&m(H),b&&b(H),ht=0),Ne=!1),U&&!(U=!1)&&Ie&&Ie(H),at&&($(H),at=!1),be=0},Ge=function(Ke,lt,De){ne[De]+=Ke,Be[De]+=lt,H._vx.update(Ke),H._vy.update(lt),c?be||(be=requestAnimationFrame(me)):me()},Fe=function(Ke,lt){q&&!it&&(H.axis=it=Math.abs(Ke)>Math.abs(lt)?"x":"y",U=!0),it!=="y"&&(ne[2]+=Ke,H._vx.update(Ke,!0)),it!=="x"&&(Be[2]+=lt,H._vy.update(lt,!0)),c?be||(be=requestAnimationFrame(me)):me()},Ce=function(Ke){if(!Pe(Ke,1)){Ke=nl(Ke,u);var lt=Ke.clientX,De=Ke.clientY,ct=lt-H.x,tt=De-H.y,Xe=H.isDragging;H.x=lt,H.y=De,(Xe||(ct||tt)&&(Math.abs(H.startX-lt)>=s||Math.abs(H.startY-De)>=s))&&(ht=Xe?2:1,Xe||(H.isDragging=!0),Fe(ct,tt))}},et=H.onPress=function(Ee){Pe(Ee,1)||Ee&&Ee.button||(H.axis=it=null,qe.pause(),H.isPressed=!0,Ee=nl(Ee),rt=Ae=0,H.startX=H.x=Ee.clientX,H.startY=H.y=Ee.clientY,H._vx.reset(),H._vy.reset(),ri(F?a:oe,tr[1],Ce,gt,!0),H.deltaX=H.deltaY=0,x&&x(H))},D=H.onRelease=function(Ee){if(!Pe(Ee,1)){ii(F?a:oe,tr[1],Ce,!0);var Ke=!isNaN(H.y-H.startY),lt=H.isDragging,De=lt&&(Math.abs(H.x-H.startX)>3||Math.abs(H.y-H.startY)>3),ct=nl(Ee);!De&&Ke&&(H._vx.reset(),H._vy.reset(),u&&ee&&Vn.delayedCall(.08,function(){if(Rl()-ye>300&&!Ee.defaultPrevented){if(Ee.target.click)Ee.target.click();else if(oe.createEvent){var tt=oe.createEvent("MouseEvents");tt.initMouseEvent("click",!0,!0,Di,1,ct.screenX,ct.screenY,ct.clientX,ct.clientY,!1,!1,!1,!1,0,null),Ee.target.dispatchEvent(tt)}}})),H.isDragging=H.isGesturing=H.isPressed=!1,d&&lt&&!F&&qe.restart(!0),ht&&me(),p&&lt&&p(H),v&&v(H,De)}},ve=function(Ke){return Ke.touches&&Ke.touches.length>1&&(H.isGesturing=!0)&&ue(Ke,H.isDragging)},ge=function(){return(H.isGesturing=!1)||O(H)},xe=function(Ke){if(!Pe(Ke)){var lt=Le(),De=ke();Ge((lt-I)*Se,(De-C)*Se,1),I=lt,C=De,d&&qe.restart(!0)}},re=function(Ke){if(!Pe(Ke)){Ke=nl(Ke,u),$&&(at=!0);var lt=(Ke.deltaMode===1?l:Ke.deltaMode===2?Di.innerHeight:1)*_;Ge(Ke.deltaX*lt,Ke.deltaY*lt,0),d&&!F&&qe.restart(!0)}},ce=function(Ke){if(!Pe(Ke)){var lt=Ke.clientX,De=Ke.clientY,ct=lt-H.x,tt=De-H.y;H.x=lt,H.y=De,Ne=!0,d&&qe.restart(!0),(ct||tt)&&Fe(ct,tt)}},Ve=function(Ke){H.event=Ke,j(H)},Te=function(Ke){H.event=Ke,k(H)},Ft=function(Ke){return Pe(Ke)||nl(Ke,u)&&we(H)};qe=H._dc=Vn.delayedCall(f||.25,le).pause(),H.deltaX=H.deltaY=0,H._vx=Ah(0,50,!0),H._vy=Ah(0,50,!0),H.scrollX=Le,H.scrollY=ke,H.isDragging=H.isGesturing=H.isPressed=!1,Rx(this),H.enable=function(Ee){return H.isEnabled||(ri(ae?oe:a,"scroll",Eh),o.indexOf("scroll")>=0&&ri(ae?oe:a,"scroll",xe,gt,Q),o.indexOf("wheel")>=0&&ri(a,"wheel",re,gt,Q),(o.indexOf("touch")>=0&&Ax||o.indexOf("pointer")>=0)&&(ri(a,tr[0],et,gt,Q),ri(oe,tr[2],D),ri(oe,tr[3],D),ee&&ri(a,"click",Qe,!0,!0),we&&ri(a,"click",Ft),ue&&ri(oe,"gesturestart",ve),O&&ri(oe,"gestureend",ge),j&&ri(a,to+"enter",Ve),k&&ri(a,to+"leave",Te),J&&ri(a,to+"move",ce)),H.isEnabled=!0,H.isDragging=H.isGesturing=H.isPressed=Ne=ht=!1,H._vx.reset(),H._vy.reset(),I=Le(),C=ke(),Ee&&Ee.type&&et(Ee),P&&P(H)),H},H.disable=function(){H.isEnabled&&(aa.filter(function(Ee){return Ee!==H&&Pl(Ee.target)}).length||ii(ae?oe:a,"scroll",Eh),H.isPressed&&(H._vx.reset(),H._vy.reset(),ii(F?a:oe,tr[1],Ce,!0)),ii(ae?oe:a,"scroll",xe,Q),ii(a,"wheel",re,Q),ii(a,tr[0],et,Q),ii(oe,tr[2],D),ii(oe,tr[3],D),ii(a,"click",Qe,!0),ii(a,"click",Ft),ii(oe,"gesturestart",ve),ii(oe,"gestureend",ge),ii(a,to+"enter",Ve),ii(a,to+"leave",Te),ii(a,to+"move",ce),H.isEnabled=H.isPressed=H.isDragging=!1,_e&&_e(H))},H.kill=H.revert=function(){H.disable();var Ee=aa.indexOf(H);Ee>=0&&aa.splice(Ee,1),Kr===H&&(Kr=0)},aa.push(H),F&&Pl(a)&&(Kr=H),H.enable(g)},xC(r,[{key:"velocityX",get:function(){return this._vx.getVelocity()}},{key:"velocityY",get:function(){return this._vy.getVelocity()}}]),r})();xn.version="3.12.7";xn.create=function(r){return new xn(r)};xn.register=Ix;xn.getAll=function(){return aa.slice()};xn.getById=function(r){return aa.filter(function(e){return e.vars.id===r})[0]};Px()&&Vn.registerPlugin(xn);/*!
 * ScrollTrigger 3.12.7
 * https://gsap.com
 *
 * @license Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license or for
 * Club GSAP members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/var Ye,na,Mt,rn,Pi,Xt,Pp,Uu,tc,Ll,fl,Hc,qn,ed,Ch,ai,V0,H0,ia,Ox,ef,Nx,oi,Rh,Fx,Ux,gs,Ph,Lp,ma,Dp,ku,Lh,tf,Gc=1,Yn=Date.now,nf=Yn(),ji=0,hl=0,G0=function(e,t,n){var i=Ci(e)&&(e.substr(0,6)==="clamp("||e.indexOf("max")>-1);return n["_"+t+"Clamp"]=i,i?e.substr(6,e.length-7):e},W0=function(e,t){return t&&(!Ci(e)||e.substr(0,6)!=="clamp(")?"clamp("+e+")":e},yC=function r(){return hl&&requestAnimationFrame(r)},X0=function(){return ed=1},q0=function(){return ed=0},xr=function(e){return e},pl=function(e){return Math.round(e*1e5)/1e5||0},kx=function(){return typeof window<"u"},Bx=function(){return Ye||kx()&&(Ye=window.gsap)&&Ye.registerPlugin&&Ye},So=function(e){return!!~Pp.indexOf(e)},zx=function(e){return(e==="Height"?Dp:Mt["inner"+e])||Pi["client"+e]||Xt["client"+e]},Vx=function(e){return Ls(e,"getBoundingClientRect")||(So(e)?function(){return mu.width=Mt.innerWidth,mu.height=Dp,mu}:function(){return qr(e)})},bC=function(e,t,n){var i=n.d,s=n.d2,o=n.a;return(o=Ls(e,"getBoundingClientRect"))?function(){return o()[i]}:function(){return(t?zx(s):e["client"+s])||0}},wC=function(e,t){return!t||~Rr.indexOf(e)?Vx(e):function(){return mu}},Tr=function(e,t){var n=t.s,i=t.d2,s=t.d,o=t.a;return Math.max(0,(n="scroll"+i)&&(o=Ls(e,n))?o()-Vx(e)()[s]:So(e)?(Pi[n]||Xt[n])-zx(i):e[n]-e["offset"+i])},Wc=function(e,t){for(var n=0;n<ia.length;n+=3)(!t||~t.indexOf(ia[n+1]))&&e(ia[n],ia[n+1],ia[n+2])},Ci=function(e){return typeof e=="string"},jn=function(e){return typeof e=="function"},ml=function(e){return typeof e=="number"},no=function(e){return typeof e=="object"},il=function(e,t,n){return e&&e.progress(t?0:1)&&n&&e.pause()},rf=function(e,t){if(e.enabled){var n=e._ctx?e._ctx.add(function(){return t(e)}):t(e);n&&n.totalTime&&(e.callbackAnimation=n)}},Zo=Math.abs,Hx="left",Gx="top",Ip="right",Op="bottom",_o="width",xo="height",Dl="Right",Il="Left",Ol="Top",Nl="Bottom",Sn="padding",Hi="margin",Na="Width",Np="Height",An="px",Gi=function(e){return Mt.getComputedStyle(e)},SC=function(e){var t=Gi(e).position;e.style.position=t==="absolute"||t==="fixed"?t:"relative"},Y0=function(e,t){for(var n in t)n in e||(e[n]=t[n]);return e},qr=function(e,t){var n=t&&Gi(e)[Ch]!=="matrix(1, 0, 0, 1, 0, 0)"&&Ye.to(e,{x:0,y:0,xPercent:0,yPercent:0,rotation:0,rotationX:0,rotationY:0,scale:1,skewX:0,skewY:0}).progress(1),i=e.getBoundingClientRect();return n&&n.progress(0).kill(),i},Bu=function(e,t){var n=t.d2;return e["offset"+n]||e["client"+n]||0},Wx=function(e){var t=[],n=e.labels,i=e.duration(),s;for(s in n)t.push(n[s]/i);return t},MC=function(e){return function(t){return Ye.utils.snap(Wx(e),t)}},Fp=function(e){var t=Ye.utils.snap(e),n=Array.isArray(e)&&e.slice(0).sort(function(i,s){return i-s});return n?function(i,s,o){o===void 0&&(o=.001);var a;if(!s)return t(i);if(s>0){for(i-=o,a=0;a<n.length;a++)if(n[a]>=i)return n[a];return n[a-1]}else for(a=n.length,i+=o;a--;)if(n[a]<=i)return n[a];return n[0]}:function(i,s,o){o===void 0&&(o=.001);var a=t(i);return!s||Math.abs(a-i)<o||a-i<0==s<0?a:t(s<0?i-e:i+e)}},TC=function(e){return function(t,n){return Fp(Wx(e))(t,n.direction)}},Xc=function(e,t,n,i){return n.split(",").forEach(function(s){return e(t,s,i)})},Un=function(e,t,n,i,s){return e.addEventListener(t,n,{passive:!i,capture:!!s})},Fn=function(e,t,n,i){return e.removeEventListener(t,n,!!i)},qc=function(e,t,n){n=n&&n.wheelHandler,n&&(e(t,"wheel",n),e(t,"touchmove",n))},$0={startColor:"green",endColor:"red",indent:0,fontSize:"16px",fontWeight:"normal"},Yc={toggleActions:"play",anticipatePin:0},zu={top:0,left:0,center:.5,bottom:1,right:1},du=function(e,t){if(Ci(e)){var n=e.indexOf("="),i=~n?+(e.charAt(n-1)+1)*parseFloat(e.substr(n+1)):0;~n&&(e.indexOf("%")>n&&(i*=t/100),e=e.substr(0,n-1)),e=i+(e in zu?zu[e]*t:~e.indexOf("%")?parseFloat(e)*t/100:parseFloat(e)||0)}return e},$c=function(e,t,n,i,s,o,a,l){var c=s.startColor,u=s.endColor,d=s.fontSize,f=s.indent,h=s.fontWeight,_=rn.createElement("div"),g=So(n)||Ls(n,"pinType")==="fixed",m=e.indexOf("scroller")!==-1,p=g?Xt:n,b=e.indexOf("start")!==-1,x=b?c:u,v="border-color:"+x+";font-size:"+d+";color:"+x+";font-weight:"+h+";pointer-events:none;white-space:nowrap;font-family:sans-serif,Arial;z-index:1000;padding:4px 8px;border-width:0;border-style:solid;";return v+="position:"+((m||l)&&g?"fixed;":"absolute;"),(m||l||!g)&&(v+=(i===Cn?Ip:Op)+":"+(o+parseFloat(f))+"px;"),a&&(v+="box-sizing:border-box;text-align:left;width:"+a.offsetWidth+"px;"),_._isStart=b,_.setAttribute("class","gsap-marker-"+e+(t?" marker-"+t:"")),_.style.cssText=v,_.innerText=t||t===0?e+"-"+t:e,p.children[0]?p.insertBefore(_,p.children[0]):p.appendChild(_),_._offset=_["offset"+i.op.d2],fu(_,0,i,b),_},fu=function(e,t,n,i){var s={display:"block"},o=n[i?"os2":"p2"],a=n[i?"p2":"os2"];e._isFlipped=i,s[n.a+"Percent"]=i?-100:0,s[n.a]=i?"1px":0,s["border"+o+Na]=1,s["border"+a+Na]=0,s[n.p]=t+"px",Ye.set(e,s)},wt=[],Dh={},nc,j0=function(){return Yn()-ji>34&&(nc||(nc=requestAnimationFrame(es)))},Jo=function(){(!oi||!oi.isPressed||oi.startX>Xt.clientWidth)&&(Tt.cache++,oi?nc||(nc=requestAnimationFrame(es)):es(),ji||To("scrollStart"),ji=Yn())},sf=function(){Ux=Mt.innerWidth,Fx=Mt.innerHeight},gl=function(e){Tt.cache++,(e===!0||!qn&&!Nx&&!rn.fullscreenElement&&!rn.webkitFullscreenElement&&(!Rh||Ux!==Mt.innerWidth||Math.abs(Mt.innerHeight-Fx)>Mt.innerHeight*.25))&&Uu.restart(!0)},Mo={},EC=[],Xx=function r(){return Fn(We,"scrollEnd",r)||lo(!0)},To=function(e){return Mo[e]&&Mo[e].map(function(t){return t()})||EC},Ai=[],qx=function(e){for(var t=0;t<Ai.length;t+=5)(!e||Ai[t+4]&&Ai[t+4].query===e)&&(Ai[t].style.cssText=Ai[t+1],Ai[t].getBBox&&Ai[t].setAttribute("transform",Ai[t+2]||""),Ai[t+3].uncache=1)},Up=function(e,t){var n;for(ai=0;ai<wt.length;ai++)n=wt[ai],n&&(!t||n._ctx===t)&&(e?n.kill(1):n.revert(!0,!0));ku=!0,t&&qx(t),t||To("revert")},Yx=function(e,t){Tt.cache++,(t||!li)&&Tt.forEach(function(n){return jn(n)&&n.cacheID++&&(n.rec=0)}),Ci(e)&&(Mt.history.scrollRestoration=Lp=e)},li,vo=0,K0,AC=function(){if(K0!==vo){var e=K0=vo;requestAnimationFrame(function(){return e===vo&&lo(!0)})}},$x=function(){Xt.appendChild(ma),Dp=!oi&&ma.offsetHeight||Mt.innerHeight,Xt.removeChild(ma)},Z0=function(e){return tc(".gsap-marker-start, .gsap-marker-end, .gsap-marker-scroller-start, .gsap-marker-scroller-end").forEach(function(t){return t.style.display=e?"none":"block"})},lo=function(e,t){if(Pi=rn.documentElement,Xt=rn.body,Pp=[Mt,rn,Pi,Xt],ji&&!e&&!ku){Un(We,"scrollEnd",Xx);return}$x(),li=We.isRefreshing=!0,Tt.forEach(function(i){return jn(i)&&++i.cacheID&&(i.rec=i())});var n=To("refreshInit");Ox&&We.sort(),t||Up(),Tt.forEach(function(i){jn(i)&&(i.smooth&&(i.target.style.scrollBehavior="auto"),i(0))}),wt.slice(0).forEach(function(i){return i.refresh()}),ku=!1,wt.forEach(function(i){if(i._subPinOffset&&i.pin){var s=i.vars.horizontal?"offsetWidth":"offsetHeight",o=i.pin[s];i.revert(!0,1),i.adjustPinSpacing(i.pin[s]-o),i.refresh()}}),Lh=1,Z0(!0),wt.forEach(function(i){var s=Tr(i.scroller,i._dir),o=i.vars.end==="max"||i._endClamp&&i.end>s,a=i._startClamp&&i.start>=s;(o||a)&&i.setPositions(a?s-1:i.start,o?Math.max(a?s:i.start+1,s):i.end,!0)}),Z0(!1),Lh=0,n.forEach(function(i){return i&&i.render&&i.render(-1)}),Tt.forEach(function(i){jn(i)&&(i.smooth&&requestAnimationFrame(function(){return i.target.style.scrollBehavior="smooth"}),i.rec&&i(i.rec))}),Yx(Lp,1),Uu.pause(),vo++,li=2,es(2),wt.forEach(function(i){return jn(i.vars.onRefresh)&&i.vars.onRefresh(i)}),li=We.isRefreshing=!1,To("refresh")},Ih=0,hu=1,Fl,es=function(e){if(e===2||!li&&!ku){We.isUpdating=!0,Fl&&Fl.update(0);var t=wt.length,n=Yn(),i=n-nf>=50,s=t&&wt[0].scroll();if(hu=Ih>s?-1:1,li||(Ih=s),i&&(ji&&!ed&&n-ji>200&&(ji=0,To("scrollEnd")),fl=nf,nf=n),hu<0){for(ai=t;ai-- >0;)wt[ai]&&wt[ai].update(0,i);hu=1}else for(ai=0;ai<t;ai++)wt[ai]&&wt[ai].update(0,i);We.isUpdating=!1}nc=0},Oh=[Hx,Gx,Op,Ip,Hi+Nl,Hi+Dl,Hi+Ol,Hi+Il,"display","flexShrink","float","zIndex","gridColumnStart","gridColumnEnd","gridRowStart","gridRowEnd","gridArea","justifySelf","alignSelf","placeSelf","order"],pu=Oh.concat([_o,xo,"boxSizing","max"+Na,"max"+Np,"position",Hi,Sn,Sn+Ol,Sn+Dl,Sn+Nl,Sn+Il]),CC=function(e,t,n){ga(n);var i=e._gsap;if(i.spacerIsNative)ga(i.spacerState);else if(e._gsap.swappedIn){var s=t.parentNode;s&&(s.insertBefore(e,t),s.removeChild(t))}e._gsap.swappedIn=!1},of=function(e,t,n,i){if(!e._gsap.swappedIn){for(var s=Oh.length,o=t.style,a=e.style,l;s--;)l=Oh[s],o[l]=n[l];o.position=n.position==="absolute"?"absolute":"relative",n.display==="inline"&&(o.display="inline-block"),a[Op]=a[Ip]="auto",o.flexBasis=n.flexBasis||"auto",o.overflow="visible",o.boxSizing="border-box",o[_o]=Bu(e,fi)+An,o[xo]=Bu(e,Cn)+An,o[Sn]=a[Hi]=a[Gx]=a[Hx]="0",ga(i),a[_o]=a["max"+Na]=n[_o],a[xo]=a["max"+Np]=n[xo],a[Sn]=n[Sn],e.parentNode!==t&&(e.parentNode.insertBefore(t,e),t.appendChild(e)),e._gsap.swappedIn=!0}},RC=/([A-Z])/g,ga=function(e){if(e){var t=e.t.style,n=e.length,i=0,s,o;for((e.t._gsap||Ye.core.getCache(e.t)).uncache=1;i<n;i+=2)o=e[i+1],s=e[i],o?t[s]=o:t[s]&&t.removeProperty(s.replace(RC,"-$1").toLowerCase())}},jc=function(e){for(var t=pu.length,n=e.style,i=[],s=0;s<t;s++)i.push(pu[s],n[pu[s]]);return i.t=e,i},PC=function(e,t,n){for(var i=[],s=e.length,o=n?8:0,a;o<s;o+=2)a=e[o],i.push(a,a in t?t[a]:e[o+1]);return i.t=e.t,i},mu={left:0,top:0},J0=function(e,t,n,i,s,o,a,l,c,u,d,f,h,_){jn(e)&&(e=e(l)),Ci(e)&&e.substr(0,3)==="max"&&(e=f+(e.charAt(4)==="="?du("0"+e.substr(3),n):0));var g=h?h.time():0,m,p,b;if(h&&h.seek(0),isNaN(e)||(e=+e),ml(e))h&&(e=Ye.utils.mapRange(h.scrollTrigger.start,h.scrollTrigger.end,0,f,e)),a&&fu(a,n,i,!0);else{jn(t)&&(t=t(l));var x=(e||"0").split(" "),v,T,M,E;b=_i(t,l)||Xt,v=qr(b)||{},(!v||!v.left&&!v.top)&&Gi(b).display==="none"&&(E=b.style.display,b.style.display="block",v=qr(b),E?b.style.display=E:b.style.removeProperty("display")),T=du(x[0],v[i.d]),M=du(x[1]||"0",n),e=v[i.p]-c[i.p]-u+T+s-M,a&&fu(a,M,i,n-M<20||a._isStart&&M>20),n-=n-M}if(_&&(l[_]=e||-.001,e<0&&(e=0)),o){var R=e+n,w=o._isStart;m="scroll"+i.d2,fu(o,R,i,w&&R>20||!w&&(d?Math.max(Xt[m],Pi[m]):o.parentNode[m])<=R+1),d&&(c=qr(a),d&&(o.style[i.op.p]=c[i.op.p]-i.op.m-o._offset+An))}return h&&b&&(m=qr(b),h.seek(f),p=qr(b),h._caScrollDist=m[i.p]-p[i.p],e=e/h._caScrollDist*f),h&&h.seek(g),h?e:Math.round(e)},LC=/(webkit|moz|length|cssText|inset)/i,Q0=function(e,t,n,i){if(e.parentNode!==t){var s=e.style,o,a;if(t===Xt){e._stOrig=s.cssText,a=Gi(e);for(o in a)!+o&&!LC.test(o)&&a[o]&&typeof s[o]=="string"&&o!=="0"&&(s[o]=a[o]);s.top=n,s.left=i}else s.cssText=e._stOrig;Ye.core.getCache(e).uncache=1,t.appendChild(e)}},jx=function(e,t,n){var i=t,s=i;return function(o){var a=Math.round(e());return a!==i&&a!==s&&Math.abs(a-i)>3&&Math.abs(a-s)>3&&(o=a,n&&n()),s=i,i=Math.round(o),i}},Kc=function(e,t,n){var i={};i[t.p]="+="+n,Ye.set(e,i)},eg=function(e,t){var n=Us(e,t),i="_scroll"+t.p2,s=function o(a,l,c,u,d){var f=o.tween,h=l.onComplete,_={};c=c||n();var g=jx(n,c,function(){f.kill(),o.tween=0});return d=u&&d||0,u=u||a-c,f&&f.kill(),l[i]=a,l.inherit=!1,l.modifiers=_,_[i]=function(){return g(c+u*f.ratio+d*f.ratio*f.ratio)},l.onUpdate=function(){Tt.cache++,o.tween&&es()},l.onComplete=function(){o.tween=0,h&&h.call(f)},f=o.tween=Ye.to(e,l),f};return e[i]=n,n.wheelHandler=function(){return s.tween&&s.tween.kill()&&(s.tween=0)},Un(e,"wheel",n.wheelHandler),We.isTouch&&Un(e,"touchmove",n.wheelHandler),s},We=(function(){function r(t,n){na||r.register(Ye)||console.warn("Please gsap.registerPlugin(ScrollTrigger)"),Ph(this),this.init(t,n)}var e=r.prototype;return e.init=function(n,i){if(this.progress=this.start=0,this.vars&&this.kill(!0,!0),!hl){this.update=this.refresh=this.kill=xr;return}n=Y0(Ci(n)||ml(n)||n.nodeType?{trigger:n}:n,Yc);var s=n,o=s.onUpdate,a=s.toggleClass,l=s.id,c=s.onToggle,u=s.onRefresh,d=s.scrub,f=s.trigger,h=s.pin,_=s.pinSpacing,g=s.invalidateOnRefresh,m=s.anticipatePin,p=s.onScrubComplete,b=s.onSnapComplete,x=s.once,v=s.snap,T=s.pinReparent,M=s.pinSpacer,E=s.containerAnimation,R=s.fastScrollEnd,w=s.preventOverlaps,y=n.horizontal||n.containerAnimation&&n.horizontal!==!1?fi:Cn,L=!d&&d!==0,N=_i(n.scroller||Mt),W=Ye.core.getCache(N),j=So(N),k=("pinType"in n?n.pinType:Ls(N,"pinType")||j&&"fixed")==="fixed",J=[n.onEnter,n.onLeave,n.onEnterBack,n.onLeaveBack],te=L&&n.toggleActions.split(" "),F="markers"in n?n.markers:Yc.markers,ue=j?0:parseFloat(Gi(N)["border"+y.p2+Na])||0,O=this,$=n.onRefreshInit&&function(){return n.onRefreshInit(O)},P=bC(N,j,y),_e=wC(N,j),we=0,Se=0,Q=0,ee=Us(N,y),q,Ie,be,qe,ht,Ne,at,U,it,H,rt,Ae,gt,Le,ke,I,C,X,ae,oe,ne,Be,ye,Qe,Pe,le,me,Ge,Fe,Ce,et,D,ve,ge,xe,re,ce,Ve,Te;if(O._startClamp=O._endClamp=!1,O._dir=y,m*=45,O.scroller=N,O.scroll=E?E.time.bind(E):ee,qe=ee(),O.vars=n,i=i||n.animation,"refreshPriority"in n&&(Ox=1,n.refreshPriority===-9999&&(Fl=O)),W.tweenScroll=W.tweenScroll||{top:eg(N,Cn),left:eg(N,fi)},O.tweenTo=q=W.tweenScroll[y.p],O.scrubDuration=function(De){ve=ml(De)&&De,ve?D?D.duration(De):D=Ye.to(i,{ease:"expo",totalProgress:"+=0",inherit:!1,duration:ve,paused:!0,onComplete:function(){return p&&p(O)}}):(D&&D.progress(1).kill(),D=0)},i&&(i.vars.lazy=!1,i._initted&&!O.isReverted||i.vars.immediateRender!==!1&&n.immediateRender!==!1&&i.duration()&&i.render(0,!0,!0),O.animation=i.pause(),i.scrollTrigger=O,O.scrubDuration(d),Ce=0,l||(l=i.vars.id)),v&&((!no(v)||v.push)&&(v={snapTo:v}),"scrollBehavior"in Xt.style&&Ye.set(j?[Xt,Pi]:N,{scrollBehavior:"auto"}),Tt.forEach(function(De){return jn(De)&&De.target===(j?rn.scrollingElement||Pi:N)&&(De.smooth=!1)}),be=jn(v.snapTo)?v.snapTo:v.snapTo==="labels"?MC(i):v.snapTo==="labelsDirectional"?TC(i):v.directional!==!1?function(De,ct){return Fp(v.snapTo)(De,Yn()-Se<500?0:ct.direction)}:Ye.utils.snap(v.snapTo),ge=v.duration||{min:.1,max:2},ge=no(ge)?Ll(ge.min,ge.max):Ll(ge,ge),xe=Ye.delayedCall(v.delay||ve/2||.1,function(){var De=ee(),ct=Yn()-Se<500,tt=q.tween;if((ct||Math.abs(O.getVelocity())<10)&&!tt&&!ed&&we!==De){var Xe=(De-Ne)/Le,tn=i&&!L?i.totalProgress():Xe,_t=ct?0:(tn-et)/(Yn()-fl)*1e3||0,xt=Ye.utils.clamp(-Xe,1-Xe,Zo(_t/2)*_t/.185),Dt=Xe+(v.inertia===!1?0:xt),Vt,kt,At=v,fn=At.onStart,Ht=At.onInterrupt,Gt=At.onComplete;if(Vt=be(Dt,O),ml(Vt)||(Vt=Dt),kt=Math.max(0,Math.round(Ne+Vt*Le)),De<=at&&De>=Ne&&kt!==De){if(tt&&!tt._initted&&tt.data<=Zo(kt-De))return;v.inertia===!1&&(xt=Vt-Xe),q(kt,{duration:ge(Zo(Math.max(Zo(Dt-tn),Zo(Vt-tn))*.185/_t/.05||0)),ease:v.ease||"power3",data:Zo(kt-De),onInterrupt:function(){return xe.restart(!0)&&Ht&&Ht(O)},onComplete:function(){O.update(),we=ee(),i&&!L&&(D?D.resetTo("totalProgress",Vt,i._tTime/i._tDur):i.progress(Vt)),Ce=et=i&&!L?i.totalProgress():O.progress,b&&b(O),Gt&&Gt(O)}},De,xt*Le,kt-De-xt*Le),fn&&fn(O,q.tween)}}else O.isActive&&we!==De&&xe.restart(!0)}).pause()),l&&(Dh[l]=O),f=O.trigger=_i(f||h!==!0&&h),Te=f&&f._gsap&&f._gsap.stRevert,Te&&(Te=Te(O)),h=h===!0?f:_i(h),Ci(a)&&(a={targets:f,className:a}),h&&(_===!1||_===Hi||(_=!_&&h.parentNode&&h.parentNode.style&&Gi(h.parentNode).display==="flex"?!1:Sn),O.pin=h,Ie=Ye.core.getCache(h),Ie.spacer?ke=Ie.pinState:(M&&(M=_i(M),M&&!M.nodeType&&(M=M.current||M.nativeElement),Ie.spacerIsNative=!!M,M&&(Ie.spacerState=jc(M))),Ie.spacer=X=M||rn.createElement("div"),X.classList.add("pin-spacer"),l&&X.classList.add("pin-spacer-"+l),Ie.pinState=ke=jc(h)),n.force3D!==!1&&Ye.set(h,{force3D:!0}),O.spacer=X=Ie.spacer,Fe=Gi(h),Qe=Fe[_+y.os2],oe=Ye.getProperty(h),ne=Ye.quickSetter(h,y.a,An),of(h,X,Fe),C=jc(h)),F){Ae=no(F)?Y0(F,$0):$0,H=$c("scroller-start",l,N,y,Ae,0),rt=$c("scroller-end",l,N,y,Ae,0,H),ae=H["offset"+y.op.d2];var Ft=_i(Ls(N,"content")||N);U=this.markerStart=$c("start",l,Ft,y,Ae,ae,0,E),it=this.markerEnd=$c("end",l,Ft,y,Ae,ae,0,E),E&&(Ve=Ye.quickSetter([U,it],y.a,An)),!k&&!(Rr.length&&Ls(N,"fixedMarkers")===!0)&&(SC(j?Xt:N),Ye.set([H,rt],{force3D:!0}),le=Ye.quickSetter(H,y.a,An),Ge=Ye.quickSetter(rt,y.a,An))}if(E){var Ee=E.vars.onUpdate,Ke=E.vars.onUpdateParams;E.eventCallback("onUpdate",function(){O.update(0,0,1),Ee&&Ee.apply(E,Ke||[])})}if(O.previous=function(){return wt[wt.indexOf(O)-1]},O.next=function(){return wt[wt.indexOf(O)+1]},O.revert=function(De,ct){if(!ct)return O.kill(!0);var tt=De!==!1||!O.enabled,Xe=qn;tt!==O.isReverted&&(tt&&(re=Math.max(ee(),O.scroll.rec||0),Q=O.progress,ce=i&&i.progress()),U&&[U,it,H,rt].forEach(function(tn){return tn.style.display=tt?"none":"block"}),tt&&(qn=O,O.update(tt)),h&&(!T||!O.isActive)&&(tt?CC(h,X,ke):of(h,X,Gi(h),Pe)),tt||O.update(tt),qn=Xe,O.isReverted=tt)},O.refresh=function(De,ct,tt,Xe){if(!((qn||!O.enabled)&&!ct)){if(h&&De&&ji){Un(r,"scrollEnd",Xx);return}!li&&$&&$(O),qn=O,q.tween&&!tt&&(q.tween.kill(),q.tween=0),D&&D.pause(),g&&i&&i.revert({kill:!1}).invalidate(),O.isReverted||O.revert(!0,!0),O._subPinOffset=!1;var tn=P(),_t=_e(),xt=E?E.duration():Tr(N,y),Dt=Le<=.01,Vt=0,kt=Xe||0,At=no(tt)?tt.end:n.end,fn=n.endTrigger||f,Ht=no(tt)?tt.start:n.start||(n.start===0||!f?0:h?"0 0":"0 100%"),Gt=O.pinnedContainer=n.pinnedContainer&&_i(n.pinnedContainer,O),ei=f&&Math.max(0,wt.indexOf(O))||0,qt=ei,Yt,Kt,A,z,K,Z,G,Me,Oe,ze,Re,Ze,He;for(F&&no(tt)&&(Ze=Ye.getProperty(H,y.p),He=Ye.getProperty(rt,y.p));qt-- >0;)Z=wt[qt],Z.end||Z.refresh(0,1)||(qn=O),G=Z.pin,G&&(G===f||G===h||G===Gt)&&!Z.isReverted&&(ze||(ze=[]),ze.unshift(Z),Z.revert(!0,!0)),Z!==wt[qt]&&(ei--,qt--);for(jn(Ht)&&(Ht=Ht(O)),Ht=G0(Ht,"start",O),Ne=J0(Ht,f,tn,y,ee(),U,H,O,_t,ue,k,xt,E,O._startClamp&&"_startClamp")||(h?-.001:0),jn(At)&&(At=At(O)),Ci(At)&&!At.indexOf("+=")&&(~At.indexOf(" ")?At=(Ci(Ht)?Ht.split(" ")[0]:"")+At:(Vt=du(At.substr(2),tn),At=Ci(Ht)?Ht:(E?Ye.utils.mapRange(0,E.duration(),E.scrollTrigger.start,E.scrollTrigger.end,Ne):Ne)+Vt,fn=f)),At=G0(At,"end",O),at=Math.max(Ne,J0(At||(fn?"100% 0":xt),fn,tn,y,ee()+Vt,it,rt,O,_t,ue,k,xt,E,O._endClamp&&"_endClamp"))||-.001,Vt=0,qt=ei;qt--;)Z=wt[qt],G=Z.pin,G&&Z.start-Z._pinPush<=Ne&&!E&&Z.end>0&&(Yt=Z.end-(O._startClamp?Math.max(0,Z.start):Z.start),(G===f&&Z.start-Z._pinPush<Ne||G===Gt)&&isNaN(Ht)&&(Vt+=Yt*(1-Z.progress)),G===h&&(kt+=Yt));if(Ne+=Vt,at+=Vt,O._startClamp&&(O._startClamp+=Vt),O._endClamp&&!li&&(O._endClamp=at||-.001,at=Math.min(at,Tr(N,y))),Le=at-Ne||(Ne-=.01)&&.001,Dt&&(Q=Ye.utils.clamp(0,1,Ye.utils.normalize(Ne,at,re))),O._pinPush=kt,U&&Vt&&(Yt={},Yt[y.a]="+="+Vt,Gt&&(Yt[y.p]="-="+ee()),Ye.set([U,it],Yt)),h&&!(Lh&&O.end>=Tr(N,y)))Yt=Gi(h),z=y===Cn,A=ee(),Be=parseFloat(oe(y.a))+kt,!xt&&at>1&&(Re=(j?rn.scrollingElement||Pi:N).style,Re={style:Re,value:Re["overflow"+y.a.toUpperCase()]},j&&Gi(Xt)["overflow"+y.a.toUpperCase()]!=="scroll"&&(Re.style["overflow"+y.a.toUpperCase()]="scroll")),of(h,X,Yt),C=jc(h),Kt=qr(h,!0),Me=k&&Us(N,z?fi:Cn)(),_?(Pe=[_+y.os2,Le+kt+An],Pe.t=X,qt=_===Sn?Bu(h,y)+Le+kt:0,qt&&(Pe.push(y.d,qt+An),X.style.flexBasis!=="auto"&&(X.style.flexBasis=qt+An)),ga(Pe),Gt&&wt.forEach(function($e){$e.pin===Gt&&$e.vars.pinSpacing!==!1&&($e._subPinOffset=!0)}),k&&ee(re)):(qt=Bu(h,y),qt&&X.style.flexBasis!=="auto"&&(X.style.flexBasis=qt+An)),k&&(K={top:Kt.top+(z?A-Ne:Me)+An,left:Kt.left+(z?Me:A-Ne)+An,boxSizing:"border-box",position:"fixed"},K[_o]=K["max"+Na]=Math.ceil(Kt.width)+An,K[xo]=K["max"+Np]=Math.ceil(Kt.height)+An,K[Hi]=K[Hi+Ol]=K[Hi+Dl]=K[Hi+Nl]=K[Hi+Il]="0",K[Sn]=Yt[Sn],K[Sn+Ol]=Yt[Sn+Ol],K[Sn+Dl]=Yt[Sn+Dl],K[Sn+Nl]=Yt[Sn+Nl],K[Sn+Il]=Yt[Sn+Il],I=PC(ke,K,T),li&&ee(0)),i?(Oe=i._initted,ef(1),i.render(i.duration(),!0,!0),ye=oe(y.a)-Be+Le+kt,me=Math.abs(Le-ye)>1,k&&me&&I.splice(I.length-2,2),i.render(0,!0,!0),Oe||i.invalidate(!0),i.parent||i.totalTime(i.totalTime()),ef(0)):ye=Le,Re&&(Re.value?Re.style["overflow"+y.a.toUpperCase()]=Re.value:Re.style.removeProperty("overflow-"+y.a));else if(f&&ee()&&!E)for(Kt=f.parentNode;Kt&&Kt!==Xt;)Kt._pinOffset&&(Ne-=Kt._pinOffset,at-=Kt._pinOffset),Kt=Kt.parentNode;ze&&ze.forEach(function($e){return $e.revert(!1,!0)}),O.start=Ne,O.end=at,qe=ht=li?re:ee(),!E&&!li&&(qe<re&&ee(re),O.scroll.rec=0),O.revert(!1,!0),Se=Yn(),xe&&(we=-1,xe.restart(!0)),qn=0,i&&L&&(i._initted||ce)&&i.progress()!==ce&&i.progress(ce||0,!0).render(i.time(),!0,!0),(Dt||Q!==O.progress||E||g||i&&!i._initted)&&(i&&!L&&i.totalProgress(E&&Ne<-.001&&!Q?Ye.utils.normalize(Ne,at,0):Q,!0),O.progress=Dt||(qe-Ne)/Le===Q?0:Q),h&&_&&(X._pinOffset=Math.round(O.progress*ye)),D&&D.invalidate(),isNaN(Ze)||(Ze-=Ye.getProperty(H,y.p),He-=Ye.getProperty(rt,y.p),Kc(H,y,Ze),Kc(U,y,Ze-(Xe||0)),Kc(rt,y,He),Kc(it,y,He-(Xe||0))),Dt&&!li&&O.update(),u&&!li&&!gt&&(gt=!0,u(O),gt=!1)}},O.getVelocity=function(){return(ee()-ht)/(Yn()-fl)*1e3||0},O.endAnimation=function(){il(O.callbackAnimation),i&&(D?D.progress(1):i.paused()?L||il(i,O.direction<0,1):il(i,i.reversed()))},O.labelToScroll=function(De){return i&&i.labels&&(Ne||O.refresh()||Ne)+i.labels[De]/i.duration()*Le||0},O.getTrailing=function(De){var ct=wt.indexOf(O),tt=O.direction>0?wt.slice(0,ct).reverse():wt.slice(ct+1);return(Ci(De)?tt.filter(function(Xe){return Xe.vars.preventOverlaps===De}):tt).filter(function(Xe){return O.direction>0?Xe.end<=Ne:Xe.start>=at})},O.update=function(De,ct,tt){if(!(E&&!tt&&!De)){var Xe=li===!0?re:O.scroll(),tn=De?0:(Xe-Ne)/Le,_t=tn<0?0:tn>1?1:tn||0,xt=O.progress,Dt,Vt,kt,At,fn,Ht,Gt,ei;if(ct&&(ht=qe,qe=E?ee():Xe,v&&(et=Ce,Ce=i&&!L?i.totalProgress():_t)),m&&h&&!qn&&!Gc&&ji&&(!_t&&Ne<Xe+(Xe-ht)/(Yn()-fl)*m?_t=1e-4:_t===1&&at>Xe+(Xe-ht)/(Yn()-fl)*m&&(_t=.9999)),_t!==xt&&O.enabled){if(Dt=O.isActive=!!_t&&_t<1,Vt=!!xt&&xt<1,Ht=Dt!==Vt,fn=Ht||!!_t!=!!xt,O.direction=_t>xt?1:-1,O.progress=_t,fn&&!qn&&(kt=_t&&!xt?0:_t===1?1:xt===1?2:3,L&&(At=!Ht&&te[kt+1]!=="none"&&te[kt+1]||te[kt],ei=i&&(At==="complete"||At==="reset"||At in i))),w&&(Ht||ei)&&(ei||d||!i)&&(jn(w)?w(O):O.getTrailing(w).forEach(function(A){return A.endAnimation()})),L||(D&&!qn&&!Gc?(D._dp._time-D._start!==D._time&&D.render(D._dp._time-D._start),D.resetTo?D.resetTo("totalProgress",_t,i._tTime/i._tDur):(D.vars.totalProgress=_t,D.invalidate().restart())):i&&i.totalProgress(_t,!!(qn&&(Se||De)))),h){if(De&&_&&(X.style[_+y.os2]=Qe),!k)ne(pl(Be+ye*_t));else if(fn){if(Gt=!De&&_t>xt&&at+1>Xe&&Xe+1>=Tr(N,y),T)if(!De&&(Dt||Gt)){var qt=qr(h,!0),Yt=Xe-Ne;Q0(h,Xt,qt.top+(y===Cn?Yt:0)+An,qt.left+(y===Cn?0:Yt)+An)}else Q0(h,X);ga(Dt||Gt?I:C),me&&_t<1&&Dt||ne(Be+(_t===1&&!Gt?ye:0))}}v&&!q.tween&&!qn&&!Gc&&xe.restart(!0),a&&(Ht||x&&_t&&(_t<1||!tf))&&tc(a.targets).forEach(function(A){return A.classList[Dt||x?"add":"remove"](a.className)}),o&&!L&&!De&&o(O),fn&&!qn?(L&&(ei&&(At==="complete"?i.pause().totalProgress(1):At==="reset"?i.restart(!0).pause():At==="restart"?i.restart(!0):i[At]()),o&&o(O)),(Ht||!tf)&&(c&&Ht&&rf(O,c),J[kt]&&rf(O,J[kt]),x&&(_t===1?O.kill(!1,1):J[kt]=0),Ht||(kt=_t===1?1:3,J[kt]&&rf(O,J[kt]))),R&&!Dt&&Math.abs(O.getVelocity())>(ml(R)?R:2500)&&(il(O.callbackAnimation),D?D.progress(1):il(i,At==="reverse"?1:!_t,1))):L&&o&&!qn&&o(O)}if(Ge){var Kt=E?Xe/E.duration()*(E._caScrollDist||0):Xe;le(Kt+(H._isFlipped?1:0)),Ge(Kt)}Ve&&Ve(-Xe/E.duration()*(E._caScrollDist||0))}},O.enable=function(De,ct){O.enabled||(O.enabled=!0,Un(N,"resize",gl),j||Un(N,"scroll",Jo),$&&Un(r,"refreshInit",$),De!==!1&&(O.progress=Q=0,qe=ht=we=ee()),ct!==!1&&O.refresh())},O.getTween=function(De){return De&&q?q.tween:D},O.setPositions=function(De,ct,tt,Xe){if(E){var tn=E.scrollTrigger,_t=E.duration(),xt=tn.end-tn.start;De=tn.start+xt*De/_t,ct=tn.start+xt*ct/_t}O.refresh(!1,!1,{start:W0(De,tt&&!!O._startClamp),end:W0(ct,tt&&!!O._endClamp)},Xe),O.update()},O.adjustPinSpacing=function(De){if(Pe&&De){var ct=Pe.indexOf(y.d)+1;Pe[ct]=parseFloat(Pe[ct])+De+An,Pe[1]=parseFloat(Pe[1])+De+An,ga(Pe)}},O.disable=function(De,ct){if(O.enabled&&(De!==!1&&O.revert(!0,!0),O.enabled=O.isActive=!1,ct||D&&D.pause(),re=0,Ie&&(Ie.uncache=1),$&&Fn(r,"refreshInit",$),xe&&(xe.pause(),q.tween&&q.tween.kill()&&(q.tween=0)),!j)){for(var tt=wt.length;tt--;)if(wt[tt].scroller===N&&wt[tt]!==O)return;Fn(N,"resize",gl),j||Fn(N,"scroll",Jo)}},O.kill=function(De,ct){O.disable(De,ct),D&&!ct&&D.kill(),l&&delete Dh[l];var tt=wt.indexOf(O);tt>=0&&wt.splice(tt,1),tt===ai&&hu>0&&ai--,tt=0,wt.forEach(function(Xe){return Xe.scroller===O.scroller&&(tt=1)}),tt||li||(O.scroll.rec=0),i&&(i.scrollTrigger=null,De&&i.revert({kill:!1}),ct||i.kill()),U&&[U,it,H,rt].forEach(function(Xe){return Xe.parentNode&&Xe.parentNode.removeChild(Xe)}),Fl===O&&(Fl=0),h&&(Ie&&(Ie.uncache=1),tt=0,wt.forEach(function(Xe){return Xe.pin===h&&tt++}),tt||(Ie.spacer=0)),n.onKill&&n.onKill(O)},wt.push(O),O.enable(!1,!1),Te&&Te(O),i&&i.add&&!Le){var lt=O.update;O.update=function(){O.update=lt,Tt.cache++,Ne||at||O.refresh()},Ye.delayedCall(.01,O.update),Le=.01,Ne=at=0}else O.refresh();h&&AC()},r.register=function(n){return na||(Ye=n||Bx(),kx()&&window.document&&r.enable(),na=hl),na},r.defaults=function(n){if(n)for(var i in n)Yc[i]=n[i];return Yc},r.disable=function(n,i){hl=0,wt.forEach(function(o){return o[i?"kill":"disable"](n)}),Fn(Mt,"wheel",Jo),Fn(rn,"scroll",Jo),clearInterval(Hc),Fn(rn,"touchcancel",xr),Fn(Xt,"touchstart",xr),Xc(Fn,rn,"pointerdown,touchstart,mousedown",X0),Xc(Fn,rn,"pointerup,touchend,mouseup",q0),Uu.kill(),Wc(Fn);for(var s=0;s<Tt.length;s+=3)qc(Fn,Tt[s],Tt[s+1]),qc(Fn,Tt[s],Tt[s+2])},r.enable=function(){if(Mt=window,rn=document,Pi=rn.documentElement,Xt=rn.body,Ye&&(tc=Ye.utils.toArray,Ll=Ye.utils.clamp,Ph=Ye.core.context||xr,ef=Ye.core.suppressOverwrites||xr,Lp=Mt.history.scrollRestoration||"auto",Ih=Mt.pageYOffset||0,Ye.core.globals("ScrollTrigger",r),Xt)){hl=1,ma=document.createElement("div"),ma.style.height="100vh",ma.style.position="absolute",$x(),yC(),xn.register(Ye),r.isTouch=xn.isTouch,gs=xn.isTouch&&/(iPad|iPhone|iPod|Mac)/g.test(navigator.userAgent),Rh=xn.isTouch===1,Un(Mt,"wheel",Jo),Pp=[Mt,rn,Pi,Xt],Ye.matchMedia?(r.matchMedia=function(c){var u=Ye.matchMedia(),d;for(d in c)u.add(d,c[d]);return u},Ye.addEventListener("matchMediaInit",function(){return Up()}),Ye.addEventListener("matchMediaRevert",function(){return qx()}),Ye.addEventListener("matchMedia",function(){lo(0,1),To("matchMedia")}),Ye.matchMedia().add("(orientation: portrait)",function(){return sf(),sf})):console.warn("Requires GSAP 3.11.0 or later"),sf(),Un(rn,"scroll",Jo);var n=Xt.hasAttribute("style"),i=Xt.style,s=i.borderTopStyle,o=Ye.core.Animation.prototype,a,l;for(o.revert||Object.defineProperty(o,"revert",{value:function(){return this.time(-.01,!0)}}),i.borderTopStyle="solid",a=qr(Xt),Cn.m=Math.round(a.top+Cn.sc())||0,fi.m=Math.round(a.left+fi.sc())||0,s?i.borderTopStyle=s:i.removeProperty("border-top-style"),n||(Xt.setAttribute("style",""),Xt.removeAttribute("style")),Hc=setInterval(j0,250),Ye.delayedCall(.5,function(){return Gc=0}),Un(rn,"touchcancel",xr),Un(Xt,"touchstart",xr),Xc(Un,rn,"pointerdown,touchstart,mousedown",X0),Xc(Un,rn,"pointerup,touchend,mouseup",q0),Ch=Ye.utils.checkPrefix("transform"),pu.push(Ch),na=Yn(),Uu=Ye.delayedCall(.2,lo).pause(),ia=[rn,"visibilitychange",function(){var c=Mt.innerWidth,u=Mt.innerHeight;rn.hidden?(V0=c,H0=u):(V0!==c||H0!==u)&&gl()},rn,"DOMContentLoaded",lo,Mt,"load",lo,Mt,"resize",gl],Wc(Un),wt.forEach(function(c){return c.enable(0,1)}),l=0;l<Tt.length;l+=3)qc(Fn,Tt[l],Tt[l+1]),qc(Fn,Tt[l],Tt[l+2])}},r.config=function(n){"limitCallbacks"in n&&(tf=!!n.limitCallbacks);var i=n.syncInterval;i&&clearInterval(Hc)||(Hc=i)&&setInterval(j0,i),"ignoreMobileResize"in n&&(Rh=r.isTouch===1&&n.ignoreMobileResize),"autoRefreshEvents"in n&&(Wc(Fn)||Wc(Un,n.autoRefreshEvents||"none"),Nx=(n.autoRefreshEvents+"").indexOf("resize")===-1)},r.scrollerProxy=function(n,i){var s=_i(n),o=Tt.indexOf(s),a=So(s);~o&&Tt.splice(o,a?6:2),i&&(a?Rr.unshift(Mt,i,Xt,i,Pi,i):Rr.unshift(s,i))},r.clearMatchMedia=function(n){wt.forEach(function(i){return i._ctx&&i._ctx.query===n&&i._ctx.kill(!0,!0)})},r.isInViewport=function(n,i,s){var o=(Ci(n)?_i(n):n).getBoundingClientRect(),a=o[s?_o:xo]*i||0;return s?o.right-a>0&&o.left+a<Mt.innerWidth:o.bottom-a>0&&o.top+a<Mt.innerHeight},r.positionInViewport=function(n,i,s){Ci(n)&&(n=_i(n));var o=n.getBoundingClientRect(),a=o[s?_o:xo],l=i==null?a/2:i in zu?zu[i]*a:~i.indexOf("%")?parseFloat(i)*a/100:parseFloat(i)||0;return s?(o.left+l)/Mt.innerWidth:(o.top+l)/Mt.innerHeight},r.killAll=function(n){if(wt.slice(0).forEach(function(s){return s.vars.id!=="ScrollSmoother"&&s.kill()}),n!==!0){var i=Mo.killAll||[];Mo={},i.forEach(function(s){return s()})}},r})();We.version="3.12.7";We.saveStyles=function(r){return r?tc(r).forEach(function(e){if(e&&e.style){var t=Ai.indexOf(e);t>=0&&Ai.splice(t,5),Ai.push(e,e.style.cssText,e.getBBox&&e.getAttribute("transform"),Ye.core.getCache(e),Ph())}}):Ai};We.revert=function(r,e){return Up(!r,e)};We.create=function(r,e){return new We(r,e)};We.refresh=function(r){return r?gl(!0):(na||We.register())&&lo(!0)};We.update=function(r){return++Tt.cache&&es(r===!0?2:0)};We.clearScrollMemory=Yx;We.maxScroll=function(r,e){return Tr(r,e?fi:Cn)};We.getScrollFunc=function(r,e){return Us(_i(r),e?fi:Cn)};We.getById=function(r){return Dh[r]};We.getAll=function(){return wt.filter(function(r){return r.vars.id!=="ScrollSmoother"})};We.isScrolling=function(){return!!ji};We.snapDirectional=Fp;We.addEventListener=function(r,e){var t=Mo[r]||(Mo[r]=[]);~t.indexOf(e)||t.push(e)};We.removeEventListener=function(r,e){var t=Mo[r],n=t&&t.indexOf(e);n>=0&&t.splice(n,1)};We.batch=function(r,e){var t=[],n={},i=e.interval||.016,s=e.batchMax||1e9,o=function(c,u){var d=[],f=[],h=Ye.delayedCall(i,function(){u(d,f),d=[],f=[]}).pause();return function(_){d.length||h.restart(!0),d.push(_.trigger),f.push(_),s<=d.length&&h.progress(1)}},a;for(a in e)n[a]=a.substr(0,2)==="on"&&jn(e[a])&&a!=="onRefreshInit"?o(a,e[a]):e[a];return jn(s)&&(s=s(),Un(We,"refresh",function(){return s=e.batchMax()})),tc(r).forEach(function(l){var c={};for(a in n)c[a]=n[a];c.trigger=l,t.push(We.create(c))}),t};var tg=function(e,t,n,i){return t>i?e(i):t<0&&e(0),n>i?(i-t)/(n-t):n<0?t/(t-n):1},af=function r(e,t){t===!0?e.style.removeProperty("touch-action"):e.style.touchAction=t===!0?"auto":t?"pan-"+t+(xn.isTouch?" pinch-zoom":""):"none",e===Pi&&r(Xt,t)},Zc={auto:1,scroll:1},DC=function(e){var t=e.event,n=e.target,i=e.axis,s=(t.changedTouches?t.changedTouches[0]:t).target,o=s._gsap||Ye.core.getCache(s),a=Yn(),l;if(!o._isScrollT||a-o._isScrollT>2e3){for(;s&&s!==Xt&&(s.scrollHeight<=s.clientHeight&&s.scrollWidth<=s.clientWidth||!(Zc[(l=Gi(s)).overflowY]||Zc[l.overflowX]));)s=s.parentNode;o._isScroll=s&&s!==n&&!So(s)&&(Zc[(l=Gi(s)).overflowY]||Zc[l.overflowX]),o._isScrollT=a}(o._isScroll||i==="x")&&(t.stopPropagation(),t._gsapAllow=!0)},Kx=function(e,t,n,i){return xn.create({target:e,capture:!0,debounce:!1,lockAxis:!0,type:t,onWheel:i=i&&DC,onPress:i,onDrag:i,onScroll:i,onEnable:function(){return n&&Un(rn,xn.eventTypes[0],ig,!1,!0)},onDisable:function(){return Fn(rn,xn.eventTypes[0],ig,!0)}})},IC=/(input|label|select|textarea)/i,ng,ig=function(e){var t=IC.test(e.target.tagName);(t||ng)&&(e._gsapAllow=!0,ng=t)},OC=function(e){no(e)||(e={}),e.preventDefault=e.isNormalizer=e.allowClicks=!0,e.type||(e.type="wheel,touch"),e.debounce=!!e.debounce,e.id=e.id||"normalizer";var t=e,n=t.normalizeScrollX,i=t.momentum,s=t.allowNestedScroll,o=t.onRelease,a,l,c=_i(e.target)||Pi,u=Ye.core.globals().ScrollSmoother,d=u&&u.get(),f=gs&&(e.content&&_i(e.content)||d&&e.content!==!1&&!d.smooth()&&d.content()),h=Us(c,Cn),_=Us(c,fi),g=1,m=(xn.isTouch&&Mt.visualViewport?Mt.visualViewport.scale*Mt.visualViewport.width:Mt.outerWidth)/Mt.innerWidth,p=0,b=jn(i)?function(){return i(a)}:function(){return i||2.8},x,v,T=Kx(c,e.type,!0,s),M=function(){return v=!1},E=xr,R=xr,w=function(){l=Tr(c,Cn),R=Ll(gs?1:0,l),n&&(E=Ll(0,Tr(c,fi))),x=vo},y=function(){f._gsap.y=pl(parseFloat(f._gsap.y)+h.offset)+"px",f.style.transform="matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, "+parseFloat(f._gsap.y)+", 0, 1)",h.offset=h.cacheID=0},L=function(){if(v){requestAnimationFrame(M);var F=pl(a.deltaY/2),ue=R(h.v-F);if(f&&ue!==h.v+h.offset){h.offset=ue-h.v;var O=pl((parseFloat(f&&f._gsap.y)||0)-h.offset);f.style.transform="matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, "+O+", 0, 1)",f._gsap.y=O+"px",h.cacheID=Tt.cache,es()}return!0}h.offset&&y(),v=!0},N,W,j,k,J=function(){w(),N.isActive()&&N.vars.scrollY>l&&(h()>l?N.progress(1)&&h(l):N.resetTo("scrollY",l))};return f&&Ye.set(f,{y:"+=0"}),e.ignoreCheck=function(te){return gs&&te.type==="touchmove"&&L()||g>1.05&&te.type!=="touchstart"||a.isGesturing||te.touches&&te.touches.length>1},e.onPress=function(){v=!1;var te=g;g=pl((Mt.visualViewport&&Mt.visualViewport.scale||1)/m),N.pause(),te!==g&&af(c,g>1.01?!0:n?!1:"x"),W=_(),j=h(),w(),x=vo},e.onRelease=e.onGestureStart=function(te,F){if(h.offset&&y(),!F)k.restart(!0);else{Tt.cache++;var ue=b(),O,$;n&&(O=_(),$=O+ue*.05*-te.velocityX/.227,ue*=tg(_,O,$,Tr(c,fi)),N.vars.scrollX=E($)),O=h(),$=O+ue*.05*-te.velocityY/.227,ue*=tg(h,O,$,Tr(c,Cn)),N.vars.scrollY=R($),N.invalidate().duration(ue).play(.01),(gs&&N.vars.scrollY>=l||O>=l-1)&&Ye.to({},{onUpdate:J,duration:ue})}o&&o(te)},e.onWheel=function(){N._ts&&N.pause(),Yn()-p>1e3&&(x=0,p=Yn())},e.onChange=function(te,F,ue,O,$){if(vo!==x&&w(),F&&n&&_(E(O[2]===F?W+(te.startX-te.x):_()+F-O[1])),ue){h.offset&&y();var P=$[2]===ue,_e=P?j+te.startY-te.y:h()+ue-$[1],we=R(_e);P&&_e!==we&&(j+=we-_e),h(we)}(ue||F)&&es()},e.onEnable=function(){af(c,n?!1:"x"),We.addEventListener("refresh",J),Un(Mt,"resize",J),h.smooth&&(h.target.style.scrollBehavior="auto",h.smooth=_.smooth=!1),T.enable()},e.onDisable=function(){af(c,!0),Fn(Mt,"resize",J),We.removeEventListener("refresh",J),T.kill()},e.lockAxis=e.lockAxis!==!1,a=new xn(e),a.iOS=gs,gs&&!h()&&h(1),gs&&Ye.ticker.add(xr),k=a._dc,N=Ye.to(a,{ease:"power4",paused:!0,inherit:!1,scrollX:n?"+=0.1":"+=0",scrollY:"+=0.1",modifiers:{scrollY:jx(h,h(),function(){return N.pause()})},onUpdate:es,onComplete:k.vars.onComplete}),a};We.sort=function(r){if(jn(r))return wt.sort(r);var e=Mt.pageYOffset||0;return We.getAll().forEach(function(t){return t._sortY=t.trigger?e+t.trigger.getBoundingClientRect().top:t.start+Mt.innerHeight}),wt.sort(r||function(t,n){return(t.vars.refreshPriority||0)*-1e6+(t.vars.containerAnimation?1e6:t._sortY)-((n.vars.containerAnimation?1e6:n._sortY)+(n.vars.refreshPriority||0)*-1e6)})};We.observe=function(r){return new xn(r)};We.normalizeScroll=function(r){if(typeof r>"u")return oi;if(r===!0&&oi)return oi.enable();if(r===!1){oi&&oi.kill(),oi=r;return}var e=r instanceof xn?r:OC(r);return oi&&oi.target===e.target&&oi.kill(),So(e.target)&&(oi=e),e};We.core={_getVelocityProp:Ah,_inputObserver:Kx,_scrollers:Tt,_proxies:Rr,bridge:{ss:function(){ji||To("scrollStart"),ji=Yn()},ref:function(){return qn}}};Bx()&&Ye.registerPlugin(We);/*!
 * paths 3.12.7
 * https://gsap.com
 *
 * Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license or for
 * Club GSAP members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/var NC=/[achlmqstvz]|(-?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/ig,FC=/(?:(-)?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/ig,UC=/[\+\-]?\d*\.?\d+e[\+\-]?\d+/ig,kC=/(^[#\.][a-z]|[a-y][a-z])/i,BC=Math.PI/180,Jc=Math.sin,Qc=Math.cos,Ul=Math.abs,rl=Math.sqrt,rg=function(e){return typeof e=="string"},Zx=function(e){return typeof e=="number"},sg=1e5,ms=function(e){return Math.round(e*sg)/sg||0};function zC(r){r=rg(r)&&kC.test(r)&&document.querySelector(r)||r;var e=r.getAttribute?r:0,t;return e&&(r=r.getAttribute("d"))?(e._gsPath||(e._gsPath={}),t=e._gsPath[r],t&&!t._dirty?t:e._gsPath[r]=Ds(r)):r?rg(r)?Ds(r):Zx(r[0])?[r]:r:console.warn("Expecting a <path> element or an SVG path data string")}function _l(r){var e=0,t;for(r.reverse();e<r.length;e+=2)t=r[e],r[e]=r[e+1],r[e+1]=t;r.reversed=!r.reversed}var VC=function(e,t){var n=document.createElementNS("http://www.w3.org/2000/svg","path"),i=[].slice.call(e.attributes),s=i.length,o;for(t=","+t+",";--s>-1;)o=i[s].nodeName.toLowerCase(),t.indexOf(","+o+",")<0&&n.setAttributeNS(null,o,i[s].nodeValue);return n},HC={rect:"rx,ry,x,y,width,height",circle:"r,cx,cy",ellipse:"rx,ry,cx,cy",line:"x1,x2,y1,y2"},GC=function(e,t){for(var n=t?t.split(","):[],i={},s=n.length;--s>-1;)i[n[s]]=+e.getAttribute(n[s])||0;return i};function Jx(r,e){var t=r.tagName.toLowerCase(),n=.552284749831,i,s,o,a,l,c,u,d,f,h,_,g,m,p,b,x,v,T,M,E,R,w;return t==="path"||!r.getBBox?r:(c=VC(r,"x,y,width,height,cx,cy,rx,ry,r,x1,x2,y1,y2,points"),w=GC(r,HC[t]),t==="rect"?(a=w.rx,l=w.ry||a,s=w.x,o=w.y,h=w.width-a*2,_=w.height-l*2,a||l?(g=s+a*(1-n),m=s+a,p=m+h,b=p+a*n,x=p+a,v=o+l*(1-n),T=o+l,M=T+_,E=M+l*n,R=M+l,i="M"+x+","+T+" V"+M+" C"+[x,E,b,R,p,R,p-(p-m)/3,R,m+(p-m)/3,R,m,R,g,R,s,E,s,M,s,M-(M-T)/3,s,T+(M-T)/3,s,T,s,v,g,o,m,o,m+(p-m)/3,o,p-(p-m)/3,o,p,o,b,o,x,v,x,T].join(",")+"z"):i="M"+(s+h)+","+o+" v"+_+" h"+-h+" v"+-_+" h"+h+"z"):t==="circle"||t==="ellipse"?(t==="circle"?(a=l=w.r,d=a*n):(a=w.rx,l=w.ry,d=l*n),s=w.cx,o=w.cy,u=a*n,i="M"+(s+a)+","+o+" C"+[s+a,o+d,s+u,o+l,s,o+l,s-u,o+l,s-a,o+d,s-a,o,s-a,o-d,s-u,o-l,s,o-l,s+u,o-l,s+a,o-d,s+a,o].join(",")+"z"):t==="line"?i="M"+w.x1+","+w.y1+" L"+w.x2+","+w.y2:(t==="polyline"||t==="polygon")&&(f=(r.getAttribute("points")+"").match(FC)||[],s=f.shift(),o=f.shift(),i="M"+s+","+o+" L"+f.join(","),t==="polygon"&&(i+=","+s+","+o+"z")),c.setAttribute("d",_a(c._gsRawPath=Ds(i))),e&&r.parentNode&&(r.parentNode.insertBefore(c,r),r.parentNode.removeChild(r)),c)}function WC(r,e,t,n,i,s,o,a,l){if(!(r===a&&e===l)){t=Ul(t),n=Ul(n);var c=i%360*BC,u=Qc(c),d=Jc(c),f=Math.PI,h=f*2,_=(r-a)/2,g=(e-l)/2,m=u*_+d*g,p=-d*_+u*g,b=m*m,x=p*p,v=b/(t*t)+x/(n*n);v>1&&(t=rl(v)*t,n=rl(v)*n);var T=t*t,M=n*n,E=(T*M-T*x-M*b)/(T*x+M*b);E<0&&(E=0);var R=(s===o?-1:1)*rl(E),w=R*(t*p/n),y=R*-(n*m/t),L=(r+a)/2,N=(e+l)/2,W=L+(u*w-d*y),j=N+(d*w+u*y),k=(m-w)/t,J=(p-y)/n,te=(-m-w)/t,F=(-p-y)/n,ue=k*k+J*J,O=(J<0?-1:1)*Math.acos(k/rl(ue)),$=(k*F-J*te<0?-1:1)*Math.acos((k*te+J*F)/rl(ue*(te*te+F*F)));isNaN($)&&($=f),!o&&$>0?$-=h:o&&$<0&&($+=h),O%=h,$%=h;var P=Math.ceil(Ul($)/(h/4)),_e=[],we=$/P,Se=4/3*Jc(we/2)/(1+Qc(we/2)),Q=u*t,ee=d*t,q=d*-n,Ie=u*n,be;for(be=0;be<P;be++)i=O+be*we,m=Qc(i),p=Jc(i),k=Qc(i+=we),J=Jc(i),_e.push(m-Se*p,p+Se*m,k+Se*J,J-Se*k,k,J);for(be=0;be<_e.length;be+=2)m=_e[be],p=_e[be+1],_e[be]=m*Q+p*q+W,_e[be+1]=m*ee+p*Ie+j;return _e[be-2]=a,_e[be-1]=l,_e}}function Ds(r){var e=(r+"").replace(UC,function(w){var y=+w;return y<1e-4&&y>-1e-4?0:y}).match(NC)||[],t=[],n=0,i=0,s=2/3,o=e.length,a=0,l="ERROR: malformed path: "+r,c,u,d,f,h,_,g,m,p,b,x,v,T,M,E,R=function(y,L,N,W){b=(N-y)/3,x=(W-L)/3,g.push(y+b,L+x,N-b,W-x,N,W)};if(!r||!isNaN(e[0])||isNaN(e[1]))return console.log(l),t;for(c=0;c<o;c++)if(T=h,isNaN(e[c])?(h=e[c].toUpperCase(),_=h!==e[c]):c--,d=+e[c+1],f=+e[c+2],_&&(d+=n,f+=i),c||(m=d,p=f),h==="M")g&&(g.length<8?t.length-=1:a+=g.length),n=m=d,i=p=f,g=[d,f],t.push(g),c+=2,h="L";else if(h==="C")g||(g=[0,0]),_||(n=i=0),g.push(d,f,n+e[c+3]*1,i+e[c+4]*1,n+=e[c+5]*1,i+=e[c+6]*1),c+=6;else if(h==="S")b=n,x=i,(T==="C"||T==="S")&&(b+=n-g[g.length-4],x+=i-g[g.length-3]),_||(n=i=0),g.push(b,x,d,f,n+=e[c+3]*1,i+=e[c+4]*1),c+=4;else if(h==="Q")b=n+(d-n)*s,x=i+(f-i)*s,_||(n=i=0),n+=e[c+3]*1,i+=e[c+4]*1,g.push(b,x,n+(d-n)*s,i+(f-i)*s,n,i),c+=4;else if(h==="T")b=n-g[g.length-4],x=i-g[g.length-3],g.push(n+b,i+x,d+(n+b*1.5-d)*s,f+(i+x*1.5-f)*s,n=d,i=f),c+=2;else if(h==="H")R(n,i,n=d,i),c+=1;else if(h==="V")R(n,i,n,i=d+(_?i-n:0)),c+=1;else if(h==="L"||h==="Z")h==="Z"&&(d=m,f=p,g.closed=!0),(h==="L"||Ul(n-d)>.5||Ul(i-f)>.5)&&(R(n,i,d,f),h==="L"&&(c+=2)),n=d,i=f;else if(h==="A"){if(M=e[c+4],E=e[c+5],b=e[c+6],x=e[c+7],u=7,M.length>1&&(M.length<3?(x=b,b=E,u--):(x=E,b=M.substr(2),u-=2),E=M.charAt(1),M=M.charAt(0)),v=WC(n,i,+e[c+1],+e[c+2],+e[c+3],+M,+E,(_?n:0)+b*1,(_?i:0)+x*1),c+=u,v)for(u=0;u<v.length;u++)g.push(v[u]);n=g[g.length-2],i=g[g.length-1]}else console.log(l);return c=g.length,c<6?(t.pop(),c=0):g[0]===g[c-2]&&g[1]===g[c-1]&&(g.closed=!0),t.totalPoints=a+c,t}function _a(r){Zx(r[0])&&(r=[r]);var e="",t=r.length,n,i,s,o;for(i=0;i<t;i++){for(o=r[i],e+="M"+ms(o[0])+","+ms(o[1])+" C",n=o.length,s=2;s<n;s++)e+=ms(o[s++])+","+ms(o[s++])+" "+ms(o[s++])+","+ms(o[s++])+" "+ms(o[s++])+","+ms(o[s])+" ";o.closed&&(e+="z")}return e}/*!
 * MorphSVGPlugin 3.12.7
 * https://gsap.com
 *
 * @license Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license or for
 * Club GSAP members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/var rr,kp,xl,Qx,vl,ev=function(){return rr||typeof window<"u"&&(rr=window.gsap)&&rr.registerPlugin&&rr},lf=function(e){return typeof e=="function"},co=Math.atan2,og=Math.cos,ag=Math.sin,Zr=Math.sqrt,td=Math.PI,lg=td*2,XC=td*.3,qC=td*.7,tv=1e20,ic=/[-+=\.]*\d+[\.e\-\+]*\d*[e\-\+]*\d*/gi,YC=/(^[#\.][a-z]|[a-y][a-z])/i,$C=/[achlmqstvz]/i,Ts=function(e){return console&&console.warn(e)},jC=1,cg=function(e){var t=e.length,n=0,i=0,s;for(s=0;s<t;s++)n+=e[s++],i+=e[s];return[n/(t/2),i/(t/2)]},xa=function(e){var t=e.length,n=e[0],i=n,s=e[1],o=s,a,l,c;for(c=6;c<t;c+=6)a=e[c],l=e[c+1],a>n?n=a:a<i&&(i=a),l>s?s=l:l<o&&(o=l);return e.centerX=(n+i)/2,e.centerY=(s+o)/2,e.size=(n-i)*(s-o)},kl=function(e,t){t===void 0&&(t=3);for(var n=e.length,i=e[0][0],s=i,o=e[0][1],a=o,l=1/t,c,u,d,f,h,_,g,m,p,b,x,v,T,M,E,R;--n>-1;)for(h=e[n],c=h.length,f=6;f<c;f+=6)for(p=h[f],b=h[f+1],x=h[f+2]-p,M=h[f+3]-b,v=h[f+4]-p,E=h[f+5]-b,T=h[f+6]-p,R=h[f+7]-b,_=t;--_>-1;)g=l*_,m=1-g,u=(g*g*T+3*m*(g*v+m*x))*g+p,d=(g*g*R+3*m*(g*E+m*M))*g+b,u>i?i=u:u<s&&(s=u),d>o?o=d:d<a&&(a=d);return e.centerX=(i+s)/2,e.centerY=(o+a)/2,e.left=s,e.width=i-s,e.top=a,e.height=o-a,e.size=(i-s)*(o-a)},KC=function(e,t){return t.length-e.length},ug=function(e,t){var n=e.size||xa(e),i=t.size||xa(t);return Math.abs(i-n)<(n+i)/20?t.centerX-e.centerX||t.centerY-e.centerY:i-n},dg=function(e,t){var n=e.slice(0),i=e.length,s=i-2,o,a;for(t=t|0,o=0;o<i;o++)a=(o+t)%s,e[o++]=n[a],e[o]=n[a+1]},cf=function(e,t,n,i,s){var o=e.length,a=0,l=o-2,c,u,d,f;for(n*=6,u=0;u<o;u+=6)c=(u+n)%l,f=e[c]-(t[u]-i),d=e[c+1]-(t[u+1]-s),a+=Zr(d*d+f*f);return a},ZC=function(e,t,n){var i=e.length,s=cg(e),o=cg(t),a=o[0]-s[0],l=o[1]-s[1],c=cf(e,t,0,a,l),u=0,d,f,h;for(h=6;h<i;h+=6)f=cf(e,t,h/6,a,l),f<c&&(c=f,u=h);if(n)for(d=e.slice(0),_l(d),h=6;h<i;h+=6)f=cf(d,t,h/6,a,l),f<c&&(c=f,u=-h);return u/6},JC=function(e,t,n){for(var i=e.length,s=tv,o=0,a=0,l,c,u,d,f,h;--i>-1;)for(l=e[i],h=l.length,f=0;f<h;f+=6)c=l[f]-t,u=l[f+1]-n,d=Zr(c*c+u*u),d<s&&(s=d,o=l[f],a=l[f+1]);return[o,a]},QC=function(e,t,n,i,s,o){var a=t.length,l=0,c=Math.min(e.size||xa(e),t[n].size||xa(t[n]))*i,u=tv,d=e.centerX+s,f=e.centerY+o,h,_,g,m,p;for(_=n;_<a&&(h=t[_].size||xa(t[_]),!(h<c));_++)g=t[_].centerX-d,m=t[_].centerY-f,p=Zr(g*g+m*m),p<u&&(l=_,u=p);return p=t[l],t.splice(l,1),p},uf=function(e,t){var n=0,i=.999999,s=e.length,o=t/((s-2)/6),a,l,c,u,d,f,h,_,g,m,p,b,x,v;for(x=2;x<s;x+=6)for(n+=o;n>i;)a=e[x-2],l=e[x-1],c=e[x],u=e[x+1],d=e[x+2],f=e[x+3],h=e[x+4],_=e[x+5],v=1/((Math.floor(n)||1)+1),g=a+(c-a)*v,p=c+(d-c)*v,g+=(p-g)*v,p+=(d+(h-d)*v-p)*v,m=l+(u-l)*v,b=u+(f-u)*v,m+=(b-m)*v,b+=(f+(_-f)*v-b)*v,e.splice(x,4,a+(c-a)*v,l+(u-l)*v,g,m,g+(p-g)*v,m+(b-m)*v,p,b,d+(h-d)*v,f+(_-f)*v),x+=6,s+=6,n--;return e},Nh=function(e,t,n,i,s){var o=t.length-e.length,a=o>0?t:e,l=o>0?e:t,c=0,u=i==="complexity"?KC:ug,d=i==="position"?0:typeof i=="number"?i:.8,f=l.length,h=typeof n=="object"&&n.push?n.slice(0):[n],_=h[0]==="reverse"||h[0]<0,g=n==="log",m,p,b,x,v,T,M;if(l[0]){if(a.length>1&&(e.sort(u),t.sort(u),T=a.size||kl(a),T=l.size||kl(l),T=a.centerX-l.centerX,M=a.centerY-l.centerY,u===ug))for(f=0;f<l.length;f++)a.splice(f,0,QC(l[f],a,f,d,T,M));if(o)for(o<0&&(o=-o),a[0].length>l[0].length&&uf(l[0],(a[0].length-l[0].length)/6|0),f=l.length;c<o;)x=a[f].size||xa(a[f]),b=JC(l,a[f].centerX,a[f].centerY),x=b[0],v=b[1],l[f++]=[x,v,x,v,x,v,x,v],l.totalPoints+=8,c++;for(f=0;f<e.length;f++)m=t[f],p=e[f],o=m.length-p.length,o<0?uf(m,-o/6|0):o>0&&uf(p,o/6|0),_&&s!==!1&&!p.reversed&&_l(p),n=h[f]||h[f]===0?h[f]:"auto",n&&(p.closed||Math.abs(p[0]-p[p.length-2])<.5&&Math.abs(p[1]-p[p.length-1])<.5?n==="auto"||n==="log"?(h[f]=n=ZC(p,m,!f||s===!1),n<0&&(_=!0,_l(p),n=-n),dg(p,n*6)):n!=="reverse"&&(f&&n<0&&_l(p),dg(p,(n<0?-n:n)*6)):!_&&(n==="auto"&&Math.abs(m[0]-p[0])+Math.abs(m[1]-p[1])+Math.abs(m[m.length-2]-p[p.length-2])+Math.abs(m[m.length-1]-p[p.length-1])>Math.abs(m[0]-p[p.length-2])+Math.abs(m[1]-p[p.length-1])+Math.abs(m[m.length-2]-p[0])+Math.abs(m[m.length-1]-p[1])||n%2)?(_l(p),h[f]=-1,_=!0):n==="auto"?h[f]=0:n==="reverse"&&(h[f]=-1),p.closed!==m.closed&&(p.closed=m.closed=!1));return g&&Ts("shapeIndex:["+h.join(",")+"]"),e.shapeIndex=h,h}},fg=function(e,t,n,i,s){var o=Ds(e[0]),a=Ds(e[1]);Nh(o,a,t||t===0?t:"auto",n,s)&&(e[0]=_a(o),e[1]=_a(a),(i==="log"||i===!0)&&Ts('precompile:["'+e[0]+'","'+e[1]+'"]'))},e2=function(e,t){if(!t)return e;var n=e.match(ic)||[],i=n.length,s="",o,a,l;for(t==="reverse"?(a=i-1,o=-2):(a=((parseInt(t,10)||0)*2+1+i*100)%i,o=2),l=0;l<i;l+=2)s+=n[a-1]+","+n[a]+" ",a=(a+o)%i;return s},hg=function(e,t){var n=0,i=parseFloat(e[0]),s=parseFloat(e[1]),o=i+","+s+" ",a=.999999,l,c,u,d,f,h,_;for(u=e.length,l=t*.5/(u*.5-1),c=0;c<u-2;c+=2){if(n+=l,h=parseFloat(e[c+2]),_=parseFloat(e[c+3]),n>a)for(f=1/(Math.floor(n)+1),d=1;n>a;)o+=(i+(h-i)*f*d).toFixed(2)+","+(s+(_-s)*f*d).toFixed(2)+" ",n--,d++;o+=h+","+_+" ",i=h,s=_}return o},Fh=function(e){var t=e[0].match(ic)||[],n=e[1].match(ic)||[],i=n.length-t.length;i>0?e[0]=hg(t,i):e[1]=hg(n,-i)},t2=function(e){return isNaN(e)?Fh:function(t){Fh(t),t[1]=e2(t[1],parseInt(e,10))}},n2=function(e,t,n){var i=typeof e=="string",s,o;return(!i||YC.test(e)||(e.match(ic)||[]).length<3)&&(s=kp(e)[0],s?(o=(s.nodeName+"").toUpperCase(),t&&o!=="PATH"&&(s=Jx(s,!1),o="PATH"),e=s.getAttribute(o==="PATH"?"d":"points")||"",s===n&&(e=s.getAttributeNS(null,"data-original")||e)):(Ts("WARNING: invalid morph to: "+e),e=!1)),e},pg=function(e,t){for(var n=e.length,i=.2*(t||1),s,o,a,l,c,u,d,f,h,_,g,m;--n>-1;){for(o=e[n],g=o.isSmooth=o.isSmooth||[0,0,0,0],m=o.smoothData=o.smoothData||[0,0,0,0],g.length=4,f=o.length-2,d=6;d<f;d+=6)a=o[d]-o[d-2],l=o[d+1]-o[d-1],c=o[d+2]-o[d],u=o[d+3]-o[d+1],h=co(l,a),_=co(u,c),s=Math.abs(h-_)<i,s&&(m[d-2]=h,m[d+2]=_,m[d-1]=Zr(a*a+l*l),m[d+3]=Zr(c*c+u*u)),g.push(s,s,0,0,s,s);o[f]===o[0]&&o[f+1]===o[1]&&(a=o[0]-o[f-2],l=o[1]-o[f-1],c=o[2]-o[0],u=o[3]-o[1],h=co(l,a),_=co(u,c),Math.abs(h-_)<i&&(m[f-2]=h,m[2]=_,m[f-1]=Zr(a*a+l*l),m[3]=Zr(c*c+u*u),g[f-2]=g[f-1]=!0))}return e},mg=function(e){var t=e.trim().split(" "),n=~e.indexOf("left")?0:~e.indexOf("right")?100:isNaN(parseFloat(t[0]))?50:parseFloat(t[0]),i=~e.indexOf("top")?0:~e.indexOf("bottom")?100:isNaN(parseFloat(t[1]))?50:parseFloat(t[1]);return{x:n/100,y:i/100}},i2=function(e){return e!==e%td?e+(e<0?lg:-lg):e},gg="Use MorphSVGPlugin.convertToPath() to convert to a path before morphing.",r2=function(e,t,n,i){var s=this._origin,o=this._eOrigin,a=e[n]-s.x,l=e[n+1]-s.y,c=Zr(a*a+l*l),u=co(l,a),d,f;return a=t[n]-o.x,l=t[n+1]-o.y,d=co(l,a)-u,f=i2(d),!i&&xl&&Math.abs(f+xl.ca)<XC&&(i=xl),this._anchorPT=xl={_next:this._anchorPT,t:e,sa:u,ca:i&&f*i.ca<0&&Math.abs(f)>qC?d:f,sl:c,cl:Zr(a*a+l*l)-c,i:n}},_g=function(e){rr=ev(),vl=vl||rr&&rr.plugins.morphSVG,rr&&vl?(kp=rr.utils.toArray,vl.prototype._tweenRotation=r2,Qx=1):e&&Ts("Please gsap.registerPlugin(MorphSVGPlugin)")},la={version:"3.12.7",name:"morphSVG",rawVars:1,register:function(e,t){rr=e,vl=t,_g()},init:function(e,t,n,i,s){if(Qx||_g(1),!t)return Ts("invalid shape"),!1;lf(t)&&(t=t.call(n,i,e,s));var o,a,l,c,u,d,f,h,_,g,m,p,b,x,v,T,M,E,R,w,y,L;if(typeof t=="string"||t.getBBox||t[0])t={shape:t};else if(typeof t=="object"){o={};for(a in t)o[a]=lf(t[a])&&a!=="render"?t[a].call(n,i,e,s):t[a];t=o}var N=e.nodeType?window.getComputedStyle(e):{},W=N.fill+"",j=!(W==="none"||(W.match(ic)||[])[3]==="0"||N.fillRule==="evenodd"),k=(t.origin||"50 50").split(",");if(o=(e.nodeName+"").toUpperCase(),u=o==="POLYLINE"||o==="POLYGON",o!=="PATH"&&!u&&!t.prop)return Ts("Cannot morph a <"+o+"> element. "+gg),!1;if(a=o==="PATH"?"d":"points",!t.prop&&!lf(e.setAttribute))return!1;if(c=n2(t.shape||t.d||t.points||"",a==="d",e),u&&$C.test(c))return Ts("A <"+o+"> cannot accept path data. "+gg),!1;if(d=t.shapeIndex||t.shapeIndex===0?t.shapeIndex:"auto",f=t.map||la.defaultMap,this._prop=t.prop,this._render=t.render||la.defaultRender,this._apply="updateTarget"in t?t.updateTarget:la.defaultUpdateTarget,this._rnd=Math.pow(10,isNaN(t.precision)?2:+t.precision),this._tween=n,c){if(this._target=e,M=typeof t.precompile=="object",g=this._prop?e[this._prop]:e.getAttribute(a),!this._prop&&!e.getAttributeNS(null,"data-original")&&e.setAttributeNS(null,"data-original",g),a==="d"||this._prop){if(g=Ds(M?t.precompile[0]:g),m=Ds(M?t.precompile[1]:c),!M&&!Nh(g,m,d,f,j))return!1;for((t.precompile==="log"||t.precompile===!0)&&Ts('precompile:["'+_a(g)+'","'+_a(m)+'"]'),y=(t.type||la.defaultType)!=="linear",y&&(g=pg(g,t.smoothTolerance),m=pg(m,t.smoothTolerance),g.size||kl(g),m.size||kl(m),w=mg(k[0]),this._origin=g.origin={x:g.left+w.x*g.width,y:g.top+w.y*g.height},k[1]&&(w=mg(k[1])),this._eOrigin={x:m.left+w.x*m.width,y:m.top+w.y*m.height}),this._rawPath=e._gsRawPath=g,b=g.length;--b>-1;)for(v=g[b],T=m[b],h=v.isSmooth||[],_=T.isSmooth||[],x=v.length,xl=0,p=0;p<x;p+=2)(T[p]!==v[p]||T[p+1]!==v[p+1])&&(y?h[p]&&_[p]?(E=v.smoothData,R=T.smoothData,L=p+(p===x-4?7-x:5),this._controlPT={_next:this._controlPT,i:p,j:b,l1s:E[p+1],l1c:R[p+1]-E[p+1],l2s:E[L],l2c:R[L]-E[L]},l=this._tweenRotation(v,T,p+2),this._tweenRotation(v,T,p,l),this._tweenRotation(v,T,L-1,l),p+=4):this._tweenRotation(v,T,p):(l=this.add(v,p,v[p],T[p],0,0,0,0,0,1),l=this.add(v,p+1,v[p+1],T[p+1],0,0,0,0,0,1)||l))}else l=this.add(e,"setAttribute",e.getAttribute(a)+"",c+"",i,s,0,t2(d),a);y&&(this.add(this._origin,"x",this._origin.x,this._eOrigin.x,0,0,0,0,0,1),l=this.add(this._origin,"y",this._origin.y,this._eOrigin.y,0,0,0,0,0,1)),l&&(this._props.push("morphSVG"),l.end=c,l.endProp=a)}return jC},render:function(e,t){for(var n=t._rawPath,i=t._controlPT,s=t._anchorPT,o=t._rnd,a=t._target,l=t._pt,c,u,d,f,h,_,g,m,p,b,x,v,T;l;)l.r(e,l.d),l=l._next;if(e===1&&t._apply)for(l=t._pt;l;)l.end&&(t._prop?a[t._prop]=l.end:a.setAttribute(l.endProp,l.end)),l=l._next;else if(n){for(;s;)_=s.sa+e*s.ca,h=s.sl+e*s.cl,s.t[s.i]=t._origin.x+og(_)*h,s.t[s.i+1]=t._origin.y+ag(_)*h,s=s._next;for(d=e<.5?2*e*e:(4-2*e)*e-1;i;)g=i.i,f=n[i.j],T=g+(g===f.length-4?7-f.length:5),_=co(f[T]-f[g+1],f[T-1]-f[g]),x=ag(_),v=og(_),p=f[g+2],b=f[g+3],h=i.l1s+d*i.l1c,f[g]=p-v*h,f[g+1]=b-x*h,h=i.l2s+d*i.l2c,f[T-1]=p+v*h,f[T]=b+x*h,i=i._next;if(a._gsRawPath=n,t._apply){for(c="",u=" ",m=0;m<n.length;m++)for(f=n[m],h=f.length,c+="M"+(f[0]*o|0)/o+u+(f[1]*o|0)/o+" C",g=2;g<h;g++)c+=(f[g]*o|0)/o+u;t._prop?a[t._prop]=c:a.setAttribute("d",c)}}t._render&&n&&t._render.call(t._tween,n,a)},kill:function(e){this._pt=this._rawPath=0},getRawPath:zC,stringToRawPath:Ds,rawPathToString:_a,normalizeStrings:function(e,t,n){var i=n.shapeIndex,s=n.map,o=[e,t];return fg(o,i,s),o},pathFilter:fg,pointsFilter:Fh,getTotalSize:kl,equalizeSegmentQuantity:Nh,convertToPath:function(e,t){return kp(e).map(function(n){return Jx(n,t!==!1)})},defaultType:"linear",defaultUpdateTarget:!0,defaultMap:"size"};ev()&&rr.registerPlugin(la);(function(){function r(){for(var n=arguments.length,i=0;i<n;i++){var s=i<0||arguments.length<=i?void 0:arguments[i];s.nodeType===1||s.nodeType===11?this.appendChild(s):this.appendChild(document.createTextNode(String(s)))}}function e(){for(;this.lastChild;)this.removeChild(this.lastChild);arguments.length&&this.append.apply(this,arguments)}function t(){for(var n=this.parentNode,i=arguments.length,s=new Array(i),o=0;o<i;o++)s[o]=arguments[o];var a=s.length;if(n)for(a||n.removeChild(this);a--;){var l=s[a];typeof l!="object"?l=this.ownerDocument.createTextNode(l):l.parentNode&&l.parentNode.removeChild(l),a?n.insertBefore(this.previousSibling,l):n.replaceChild(l,this)}}typeof Element<"u"&&(Element.prototype.append||(Element.prototype.append=r,DocumentFragment.prototype.append=r),Element.prototype.replaceChildren||(Element.prototype.replaceChildren=e,DocumentFragment.prototype.replaceChildren=e),Element.prototype.replaceWith||(Element.prototype.replaceWith=t,DocumentFragment.prototype.replaceWith=t))})();function s2(r,e){if(!(r instanceof e))throw new TypeError("Cannot call a class as a function")}function xg(r,e){for(var t=0;t<e.length;t++){var n=e[t];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(r,n.key,n)}}function vg(r,e,t){return e&&xg(r.prototype,e),t&&xg(r,t),r}function o2(r,e,t){return e in r?Object.defineProperty(r,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):r[e]=t,r}function yg(r,e){var t=Object.keys(r);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(r);e&&(n=n.filter(function(i){return Object.getOwnPropertyDescriptor(r,i).enumerable})),t.push.apply(t,n)}return t}function bg(r){for(var e=1;e<arguments.length;e++){var t=arguments[e]!=null?arguments[e]:{};e%2?yg(Object(t),!0).forEach(function(n){o2(r,n,t[n])}):Object.getOwnPropertyDescriptors?Object.defineProperties(r,Object.getOwnPropertyDescriptors(t)):yg(Object(t)).forEach(function(n){Object.defineProperty(r,n,Object.getOwnPropertyDescriptor(t,n))})}return r}function nv(r,e){return l2(r)||u2(r,e)||iv(r,e)||f2()}function ui(r){return a2(r)||c2(r)||iv(r)||d2()}function a2(r){if(Array.isArray(r))return Uh(r)}function l2(r){if(Array.isArray(r))return r}function c2(r){if(typeof Symbol<"u"&&Symbol.iterator in Object(r))return Array.from(r)}function u2(r,e){if(!(typeof Symbol>"u"||!(Symbol.iterator in Object(r)))){var t=[],n=!0,i=!1,s=void 0;try{for(var o=r[Symbol.iterator](),a;!(n=(a=o.next()).done)&&(t.push(a.value),!(e&&t.length===e));n=!0);}catch(l){i=!0,s=l}finally{try{!n&&o.return!=null&&o.return()}finally{if(i)throw s}}return t}}function iv(r,e){if(r){if(typeof r=="string")return Uh(r,e);var t=Object.prototype.toString.call(r).slice(8,-1);if(t==="Object"&&r.constructor&&(t=r.constructor.name),t==="Map"||t==="Set")return Array.from(r);if(t==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))return Uh(r,e)}}function Uh(r,e){(e==null||e>r.length)&&(e=r.length);for(var t=0,n=new Array(e);t<e;t++)n[t]=r[t];return n}function d2(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function f2(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function uo(r,e){return Object.getOwnPropertyNames(Object(r)).reduce(function(t,n){var i=Object.getOwnPropertyDescriptor(Object(r),n),s=Object.getOwnPropertyDescriptor(Object(e),n);return Object.defineProperty(t,n,s||i)},{})}function lc(r){return typeof r=="string"}function Bp(r){return Array.isArray(r)}function eu(){var r=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},e=uo(r),t;return e.types!==void 0?t=e.types:e.split!==void 0&&(t=e.split),t!==void 0&&(e.types=(lc(t)||Bp(t)?String(t):"").split(",").map(function(n){return String(n).trim()}).filter(function(n){return/((line)|(word)|(char))/i.test(n)})),(e.absolute||e.position)&&(e.absolute=e.absolute||/absolute/.test(r.position)),e}function zp(r){var e=lc(r)||Bp(r)?String(r):"";return{none:!e,lines:/line/i.test(e),words:/word/i.test(e),chars:/char/i.test(e)}}function nd(r){return r!==null&&typeof r=="object"}function h2(r){return nd(r)&&/^(1|3|11)$/.test(r.nodeType)}function p2(r){return typeof r=="number"&&r>-1&&r%1===0}function m2(r){return nd(r)&&p2(r.length)}function Eo(r){return Bp(r)?r:r==null?[]:m2(r)?Array.prototype.slice.call(r):[r]}function wg(r){var e=r;return lc(r)&&(/^(#[a-z]\w+)$/.test(r.trim())?e=document.getElementById(r.trim().slice(1)):e=document.querySelectorAll(r)),Eo(e).reduce(function(t,n){return[].concat(ui(t),ui(Eo(n).filter(h2)))},[])}var g2=Object.entries,Vu="_splittype",ar={},_2=0;function Er(r,e,t){if(!nd(r))return console.warn("[data.set] owner is not an object"),null;var n=r[Vu]||(r[Vu]=++_2),i=ar[n]||(ar[n]={});return t===void 0?e&&Object.getPrototypeOf(e)===Object.prototype&&(ar[n]=bg(bg({},i),e)):e!==void 0&&(i[e]=t),t}function fo(r,e){var t=nd(r)?r[Vu]:null,n=t&&ar[t]||{};return n}function rv(r){var e=r&&r[Vu];e&&(delete r[e],delete ar[e])}function x2(){Object.keys(ar).forEach(function(r){delete ar[r]})}function v2(){g2(ar).forEach(function(r){var e=nv(r,2),t=e[0],n=e[1],i=n.isRoot,s=n.isSplit;(!i||!s)&&(ar[t]=null,delete ar[t])})}function y2(r){var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:" ",t=r?String(r):"";return t.trim().replace(/\s+/g," ").split(e)}var Vp="\\ud800-\\udfff",sv="\\u0300-\\u036f\\ufe20-\\ufe23",ov="\\u20d0-\\u20f0",av="\\ufe0e\\ufe0f",b2="[".concat(Vp,"]"),kh="[".concat(sv).concat(ov,"]"),Bh="\\ud83c[\\udffb-\\udfff]",w2="(?:".concat(kh,"|").concat(Bh,")"),lv="[^".concat(Vp,"]"),cv="(?:\\ud83c[\\udde6-\\uddff]){2}",uv="[\\ud800-\\udbff][\\udc00-\\udfff]",dv="\\u200d",fv="".concat(w2,"?"),hv="[".concat(av,"]?"),S2="(?:"+dv+"(?:"+[lv,cv,uv].join("|")+")"+hv+fv+")*",M2=hv+fv+S2,T2="(?:".concat(["".concat(lv).concat(kh,"?"),kh,cv,uv,b2].join("|"),`
)`),E2=RegExp("".concat(Bh,"(?=").concat(Bh,")|").concat(T2).concat(M2),"g"),A2=[dv,Vp,sv,ov,av],C2=RegExp("[".concat(A2.join(""),"]"));function R2(r){return r.split("")}function pv(r){return C2.test(r)}function P2(r){return r.match(E2)||[]}function L2(r){return pv(r)?P2(r):R2(r)}function D2(r){return r==null?"":String(r)}function I2(r){var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:"";return r=D2(r),r&&lc(r)&&!e&&pv(r)?L2(r):r.split(e)}function zh(r,e){var t=document.createElement(r);return e&&Object.keys(e).forEach(function(n){var i=e[n],s=lc(i)?i.trim():i;s===null||s===""||(n==="children"?t.append.apply(t,ui(Eo(s))):t.setAttribute(n,s))}),t}var Hp={splitClass:"",lineClass:"line",wordClass:"word",charClass:"char",types:["lines","words","chars"],absolute:!1,tagName:"div"};function O2(r,e){e=uo(Hp,e);var t=zp(e.types),n=e.tagName,i=r.nodeValue,s=document.createDocumentFragment(),o=[],a=[];return/^\s/.test(i)&&s.append(" "),o=y2(i).reduce(function(l,c,u,d){var f,h;return t.chars&&(h=I2(c).map(function(_){var g=zh(n,{class:"".concat(e.splitClass," ").concat(e.charClass),style:"display: inline-block;",children:_});return Er(g,"isChar",!0),a=[].concat(ui(a),[g]),g})),t.words||t.lines?(f=zh(n,{class:"".concat(e.wordClass," ").concat(e.splitClass),style:"display: inline-block; ".concat(t.words&&e.absolute?"position: relative;":""),children:t.chars?h:c}),Er(f,{isWord:!0,isWordStart:!0,isWordEnd:!0}),s.appendChild(f)):h.forEach(function(_){s.appendChild(_)}),u<d.length-1&&s.append(" "),t.words?l.concat(f):l},[]),/\s$/.test(i)&&s.append(" "),r.replaceWith(s),{words:o,chars:a}}function mv(r,e){var t=r.nodeType,n={words:[],chars:[]};if(!/(1|3|11)/.test(t))return n;if(t===3&&/\S/.test(r.nodeValue))return O2(r,e);var i=Eo(r.childNodes);if(i.length&&(Er(r,"isSplit",!0),!fo(r).isRoot)){r.style.display="inline-block",r.style.position="relative";var s=r.nextSibling,o=r.previousSibling,a=r.textContent||"",l=s?s.textContent:" ",c=o?o.textContent:" ";Er(r,{isWordEnd:/\s$/.test(a)||/^\s/.test(l),isWordStart:/^\s/.test(a)||/\s$/.test(c)})}return i.reduce(function(u,d){var f=mv(d,e),h=f.words,_=f.chars;return{words:[].concat(ui(u.words),ui(h)),chars:[].concat(ui(u.chars),ui(_))}},n)}function N2(r,e,t,n){if(!t.absolute)return{top:e?r.offsetTop:null};var i=r.offsetParent,s=nv(n,2),o=s[0],a=s[1],l=0,c=0;if(i&&i!==document.body){var u=i.getBoundingClientRect();l=u.x+o,c=u.y+a}var d=r.getBoundingClientRect(),f=d.width,h=d.height,_=d.x,g=d.y,m=g+a-c,p=_+o-l;return{width:f,height:h,top:m,left:p}}function gv(r){fo(r).isWord?(rv(r),r.replaceWith.apply(r,ui(r.childNodes))):Eo(r.children).forEach(function(e){return gv(e)})}var F2=function(){return document.createDocumentFragment()};function U2(r,e,t){var n=zp(e.types),i=e.tagName,s=r.getElementsByTagName("*"),o=[],a=[],l=null,c,u,d,f=[],h=r.parentElement,_=r.nextElementSibling,g=F2(),m=window.getComputedStyle(r),p=m.textAlign,b=parseFloat(m.fontSize),x=b*.2;return e.absolute&&(d={left:r.offsetLeft,top:r.offsetTop,width:r.offsetWidth},u=r.offsetWidth,c=r.offsetHeight,Er(r,{cssWidth:r.style.width,cssHeight:r.style.height})),Eo(s).forEach(function(v){var T=v.parentElement===r,M=N2(v,T,e,t),E=M.width,R=M.height,w=M.top,y=M.left;/^br$/i.test(v.nodeName)||(n.lines&&T&&((l===null||w-l>=x)&&(l=w,o.push(a=[])),a.push(v)),e.absolute&&Er(v,{top:w,left:y,width:E,height:R}))}),h&&h.removeChild(r),n.lines&&(f=o.map(function(v){var T=zh(i,{class:"".concat(e.splitClass," ").concat(e.lineClass),style:"display: block; text-align: ".concat(p,"; width: 100%;")});Er(T,"isLine",!0);var M={height:0,top:1e4};return g.appendChild(T),v.forEach(function(E,R,w){var y=fo(E),L=y.isWordEnd,N=y.top,W=y.height,j=w[R+1];M.height=Math.max(M.height,W),M.top=Math.min(M.top,N),T.appendChild(E),L&&fo(j).isWordStart&&T.append(" ")}),e.absolute&&Er(T,{height:M.height,top:M.top}),T}),n.words||gv(g),r.replaceChildren(g)),e.absolute&&(r.style.width="".concat(r.style.width||u,"px"),r.style.height="".concat(c,"px"),Eo(s).forEach(function(v){var T=fo(v),M=T.isLine,E=T.top,R=T.left,w=T.width,y=T.height,L=fo(v.parentElement),N=!M&&L.isLine;v.style.top="".concat(N?E-L.top:E,"px"),v.style.left=M?"".concat(d.left,"px"):"".concat(R-(N?d.left:0),"px"),v.style.height="".concat(y,"px"),v.style.width=M?"".concat(d.width,"px"):"".concat(w,"px"),v.style.position="absolute"})),h&&(_?h.insertBefore(r,_):h.appendChild(r)),f}var Qo=uo(Hp,{}),Va=(function(){vg(r,null,[{key:"clearData",value:function(){x2()}},{key:"setDefaults",value:function(t){return Qo=uo(Qo,eu(t)),Hp}},{key:"revert",value:function(t){wg(t).forEach(function(n){var i=fo(n),s=i.isSplit,o=i.html,a=i.cssWidth,l=i.cssHeight;s&&(n.innerHTML=o,n.style.width=a||"",n.style.height=l||"",rv(n))})}},{key:"create",value:function(t,n){return new r(t,n)}},{key:"data",get:function(){return ar}},{key:"defaults",get:function(){return Qo},set:function(t){Qo=uo(Qo,eu(t))}}]);function r(e,t){s2(this,r),this.isSplit=!1,this.settings=uo(Qo,eu(t)),this.elements=wg(e),this.split()}return vg(r,[{key:"split",value:function(t){var n=this;this.revert(),this.elements.forEach(function(o){Er(o,"html",o.innerHTML)}),this.lines=[],this.words=[],this.chars=[];var i=[window.pageXOffset,window.pageYOffset];t!==void 0&&(this.settings=uo(this.settings,eu(t)));var s=zp(this.settings.types);s.none||(this.elements.forEach(function(o){Er(o,"isRoot",!0);var a=mv(o,n.settings),l=a.words,c=a.chars;n.words=[].concat(ui(n.words),ui(l)),n.chars=[].concat(ui(n.chars),ui(c))}),this.elements.forEach(function(o){if(s.lines||n.settings.absolute){var a=U2(o,n.settings,i);n.lines=[].concat(ui(n.lines),ui(a))}}),this.isSplit=!0,window.scrollTo(i[0],i[1]),v2())}},{key:"revert",value:function(){this.isSplit&&(this.lines=null,this.words=null,this.chars=null,this.isSplit=!1),r.revert(this.elements)}}]),r})();const Ot={heroYearObj:{year:2026},heroNumberTween:null,heroHeadingFadeScrollTrigger:null};function k2(){Ot.heroYearObj.year=2026,Ot.heroNumberTween&&(Ot.heroNumberTween.kill(),Ot.heroNumberTween=null),Ot.heroHeadingFadeScrollTrigger&&(Ot.heroHeadingFadeScrollTrigger.kill(),Ot.heroHeadingFadeScrollTrigger=null)}function B2(r){if(window.scrollDownIcon&&document.contains(window.scrollDownIcon))return;const e=document.createElement("div");e.className="scroll-down-icon",e.innerHTML=`
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
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
    `);const n=r.parentElement;n?n.appendChild(e):document.body.appendChild(e),he.to(e,{opacity:1,duration:.8,ease:"power2.out",delay:.3});const i=e.querySelector(".scroll-indicator");he.to(i,{y:3,duration:1.2,ease:"power2.inOut",repeat:-1,yoyo:!0});const s=e.querySelector(".scroll-arrow");he.to(s,{opacity:.6,duration:1.5,ease:"power2.inOut",repeat:-1,yoyo:!0}),We.create({trigger:"#cover-travel-area",start:"top top",end:"bottom 70%",scrub:.5,markers:!1,onUpdate:o=>{const a=1-o.progress;he.set(e,{opacity:a,overwrite:!0})},onLeave:()=>{he.set(e,{opacity:0})},onEnterBack:()=>{he.set(e,{opacity:0})}}),window.scrollDownIcon=e,window.scrollDownIconCleanup=()=>{We.getAll().forEach(o=>{var a;(o.trigger===e||((a=o.vars)==null?void 0:a.trigger)==="#cover-travel-area")&&(o.trigger===e||o.animation&&o.animation.targets().includes(e))&&o.kill()}),e&&e.parentNode&&e.remove(),window.scrollDownIcon=null,window.scrollDownIconCleanup=null}}const z2="/150-lab/assets/audio/ui-click.mp3",V2="/150-lab/assets/audio/chemistry-3-final.mp3";let sn=null,Rn=!1,mn=!1,Hu=!1,Ki=!1,Xr=0;const br=25;let zi=null,va=!1,Es=null;function Gp(){Es||(Es=new Audio(z2),Es.volume=.35,Es.preload="auto")}const io=()=>{if(!mn)try{Es||Gp();const r=Es.cloneNode();r.volume=.35,r.play().catch(e=>{console.warn("UI click sound play was prevented:",e)})}catch(r){console.error("Error playing UI click sound:",r)}};function Sg(r){mn&&(r.volume=0,r.muted=!0),r.addEventListener("play",()=>{const e=document.querySelector(".sound-toggle");e&&e.classList.contains("muted")&&(r.volume=0,r.muted=!0)})}function H2(){new MutationObserver(e=>{e.forEach(t=>{t.type==="childList"&&t.addedNodes.forEach(n=>{n.nodeName==="AUDIO"||n.nodeName==="VIDEO"?Sg(n):n.querySelectorAll&&n.querySelectorAll("audio, video").forEach(s=>{Sg(s)})})})}).observe(document.body,{childList:!0,subtree:!0})}function rc(r=!1){if(!(Rn||mn)){if(Xr++,window.audioRetryCount=Xr,window.maxAudioRetries=br,Xr>=br){console.warn(`Exceeded maximum audio retry attempts (${br}). Stopping retries.`);return}try{if(sn.volume=.22,r)try{const e=new(window.AudioContext||window.webkitAudioContext),t=e.createBufferSource();t.connect(e.destination),t.start(0)}catch(e){console.warn("Could not create audio context:",e)}sn.play().then(()=>{Rn=!0,window.audioInitialized=!0;const e=document.querySelector(".sound-toggle");e&&e.classList.add("active"),Xr=0,window.audioRetryCount=0}).catch(e=>{console.error("Audio play was prevented:",e),Rn=!1,(r||Ki)&&Xr<br&&setTimeout(()=>{!Rn&&!mn&&rc(!0)},500)})}catch(e){console.error("Error playing audio:",e),Rn=!1,(r||Ki)&&Xr<br&&setTimeout(()=>{!Rn&&!mn&&rc(!0)},500)}}}const G2=()=>{document.hidden?sn&&!sn.paused&&Rn&&(va=!0,sn.pause()):sn&&va&&Rn&&!mn&&(va=!1,sn.play().catch(r=>{console.warn("Could not resume background audio:",r),Rn=!1,Ki&&setTimeout(()=>{yo(!0)},100)}))};function W2(){document.addEventListener("visibilitychange",G2),window.addEventListener("blur",()=>{sn&&!sn.paused&&Rn&&(va=!0,sn.pause())}),window.addEventListener("focus",()=>{sn&&va&&Rn&&!mn&&(va=!1,sn.play().catch(r=>{console.warn("Could not resume background audio on focus:",r),Rn=!1,Ki&&setTimeout(()=>{yo(!0)},100)}))})}const yo=(r=!1)=>{if(!mn&&(r&&(Ki=!0,window.enterButtonClicked=!0),!!Ki&&!Rn)){if(Xr>=br){console.warn(`Exceeded maximum audio retry attempts (${br}). Stopping retries.`),zi&&(clearInterval(zi),zi=null);return}if(r){setTimeout(()=>{if(!mn)if(Hu||sn&&sn.readyState>=3)rc(!0);else try{sn.load()}catch(e){console.warn("Error reloading background audio:",e)}},2e3);return}if(Hu||sn&&sn.readyState>=3)rc(r);else if(r)try{sn.load()}catch(e){console.warn("Error reloading background audio:",e)}}};function X2(){const r=new Audio;r.addEventListener("canplaythrough",()=>{Hu=!0,Ki&&!Rn&&!mn&&rc(!0)}),r.addEventListener("error",e=>{console.error("Audio loading error:",e),console.error("Audio src:",r.src),(window.location.hostname==="localhost"||window.location.hostname.includes("127.0.0.1"))&&console.warn("Audio failed to load in dev mode. Ensure audio files are in 150-lab/public/audio/ directory.")}),r.loop=!0,r.volume=0,r.preload="auto",r.src=V2;try{r.load()}catch(e){console.error("Error loading background audio:",e)}sn=r,window.backgroundAudioInstance=r,window.backgroundAudio=r,Rn=!1,mn=!1,Hu=!1,Ki=!1,Xr=0,window.audioInitialized=!1,window.audioMuted=!1,window.userInteracted=!1,window.heroAnimationComplete=!1,window.enterButtonClicked=!1,window.audioRetryCount=0,window.maxAudioRetries=br,window.audioRetryTimer=null,W2()}const q2=()=>{Gp(),document.querySelectorAll('a, button, input[type="button"], input[type="submit"], input[type="reset"], input[type="checkbox"], input[type="radio"]').forEach(t=>{t.addEventListener("click",n=>{if(t.classList.contains("enter-experience")){t.dataset.clickSoundPlayed||(mn||io(),t.dataset.clickSoundPlayed="true");return}mn||io()})}),new MutationObserver(t=>{t.forEach(n=>{n.type==="childList"&&n.addedNodes.forEach(i=>{i.nodeType===1&&(i.matches('a, button, input[type="button"], input[type="submit"], input[type="reset"], input[type="checkbox"], input[type="radio"]')&&i.addEventListener("click",o=>{if(i.classList.contains("enter-experience")){i.dataset.clickSoundPlayed||(mn||io(),i.dataset.clickSoundPlayed="true");return}mn||io()}),i.querySelectorAll('a, button, input[type="button"], input[type="submit"], input[type="reset"], input[type="checkbox"], input[type="radio"]').forEach(o=>{o.addEventListener("click",a=>{if(o.classList.contains("enter-experience")){o.dataset.clickSoundPlayed||(mn||io(),o.dataset.clickSoundPlayed="true");return}mn||io()})}))})})}).observe(document.body,{childList:!0,subtree:!0}),H2()};function Y2(){const r=document.querySelector(".sound-toggle");if(r){const e=document.getElementById("waveGroup");e&&(window.waveAnimation=he.to(e,{x:"-=100",ease:"linear",duration:2,repeat:-1})),r.addEventListener("click",()=>{const t=mn;if(r.classList.toggle("muted"),mn=r.classList.contains("muted"),window.audioMuted=mn,t)try{Es||Gp();const i=Es.cloneNode();i.volume=.38,i.play().catch(s=>{console.warn("UI click sound play was prevented:",s)})}catch(i){console.error("Error playing UI click sound:",i)}else io();const n=window.waveAnimation;if(mn)n&&n.pause(),sn&&(sn.volume=0,zi&&(clearInterval(zi),zi=null));else{n&&n.resume();const i=document.getElementById("anniversary-video");i&&!i.paused&&!i.ended||(!Rn&&Ki&&sn?(yo(!0),zi||(zi=setInterval(()=>{Rn?(clearInterval(zi),zi=null):!mn&&Ki&&(Xr<br?yo(!0):(console.warn(`Exceeded maximum audio retry attempts (${br}). Stopping retries.`),clearInterval(zi),zi=null))},500))):Rn&&sn&&(sn.volume=.22,sn.paused&&sn.play().catch(o=>{console.warn("Audio play was prevented:",o),Rn=!1,Ki&&yo(!0)})))}})}}function $2(r){window.heroAnimationComplete=r}function j2(r){Ki=r,window.enterButtonClicked=r}let sl=null,ol=null;function Vh(){Ot.heroHeadingFadeScrollTrigger&&(Ot.heroHeadingFadeScrollTrigger.kill(),Ot.heroHeadingFadeScrollTrigger=null);const r=document.querySelector("#hero-area h1");if(r){let e=r.querySelectorAll(".char");if(!e||e.length===0){const i=r.getAttribute("data-original-content")||r.textContent;r.innerHTML=i;try{ol&&(ol.revert(),ol=null),ol=new Va(r,{types:"words,chars",absolute:!1}),e=ol.chars,he.set(e,{opacity:1,z:0,scale:1,filter:"blur(0px)",transformPerspective:1e3,transformOrigin:"center center"})}catch(s){console.error("Error re-splitting hero heading:",s);return}}if(!e||e.length===0){console.warn("Still no hero heading characters found after attempting re-split. Aborting animation setup.");return}r.offsetHeight;const t=[...e];for(let i=t.length-1;i>0;i--){const s=Math.floor(Math.random()*(i+1));[t[i],t[s]]=[t[s],t[i]]}const n=he.timeline({paused:!0});n.to(t,{opacity:0,z:-50,filter:"blur(16px)",stagger:.02,ease:"power1.in"},0),Ot.heroHeadingFadeScrollTrigger=We.create({animation:n,trigger:"#hero-travel-area",start:"16% top",end:"36% top",scrub:!0,markers:!1,invalidateOnRefresh:!0,onUpdate:i=>{i.progress===0?he.set(t,{opacity:1,z:0,scale:1,filter:"blur(0px)",clearProps:"transform"}):i.progress===1&&he.set(t,{opacity:0,z:-50,filter:"blur(16px)"})},onRefresh:i=>{n&&n.progress(i.progress)},onLeave:()=>{he.set(t,{opacity:0,z:-50,filter:"blur(16px)"})},onEnterBack:()=>{const i=Ot.heroHeadingFadeScrollTrigger?Ot.heroHeadingFadeScrollTrigger.progress:0;n&&n.progress(i)},onLeaveBack:()=>{he.set(t,{opacity:1,z:0,scale:1,filter:"blur(0px)",clearProps:"transform"}),n&&n.progress(0)}})}else console.warn("#hero-area h1 not found for fade animation setup.")}function K2(){const r=document.querySelector("#cover-area .cover-logo"),e=document.querySelector("#countdown"),t=document.querySelector("#cover-area button.enter-experience"),n=document.querySelector("header"),i=document.querySelector("nav"),s=document.querySelector(".section-timeline"),o=document.querySelector("#app");if(!r||!t)return;n&&he.set(n,{opacity:0}),s&&he.set(s,{opacity:0});const a=document.querySelector(".share-button-pinned");a&&he.set(a,{opacity:0}),window.lenis&&window.lenis.stop(),he.set(i,{opacity:1}),he.set(r,{position:"fixed",top:"calc(50% - 100px)",left:"50%",transform:"translate(-50%, -50%)",zIndex:1e3}),e&&he.set(e,{opacity:0});const l=he.timeline({delay:.6});o&&l.fromTo(o,{opacity:0},{opacity:1,duration:.8,ease:"power2.out"}),l.fromTo(r,{opacity:0,scale:.95},{opacity:1,scale:1,duration:1.8,ease:"power1.out"}),e&&l.to(e,{opacity:1,duration:.4,ease:"power1.out"},"-=0.4"),l.to(t,{opacity:1,duration:.6,ease:"power2.out",onComplete:()=>{t.style.pointerEvents="auto"}},"-=0.3"),t&&t.addEventListener("click",()=>{t.style.pointerEvents="none",n&&he.to(n,{opacity:1,duration:.8,ease:"power2.inOut"}),s&&he.to(s,{opacity:1,duration:.8,ease:"power2.inOut",delay:.2}),window.userInteracted=!0,j2(!0),window.enterButtonClicked=!0,window.enableMouseParticles&&window.enableMouseParticles(),document.dispatchEvent(new CustomEvent("veryEarlyParticleFade")),yo(!0),window.audioRetryTimer||(window.audioRetryTimer=setInterval(()=>{window.audioInitialized?(clearInterval(window.audioRetryTimer),window.audioRetryTimer=null):window.enterButtonClicked&&!window.audioMuted&&(window.audioRetryCount<window.maxAudioRetries?yo(!0):(console.warn(`Exceeded maximum audio retry attempts (${window.maxAudioRetries}). Stopping retries.`),clearInterval(window.audioRetryTimer),window.audioRetryTimer=null))},500)),window.lenis&&window.lenis.start(),he.to(t,{opacity:0,duration:.5,ease:"power2.in",onComplete:()=>{B2(t),t.style.pointerEvents="none"}}),a&&he.to(a,{opacity:1,duration:.8,delay:.4,ease:"power2.out"});const c=document.querySelector(".sound-toggle");c&&c.classList.add("active"),setTimeout(()=>{Z2(r,e)},100)})}function Z2(r,e){let t=null,n=-1,i=null,s=!1,o=!1;const a=document.querySelector("#cover-travel-area");if(a){const c=a.getBoundingClientRect(),u=c.height,d=window.innerHeight,f=Math.abs(c.top)/(u-d*.67);if(f>=.9)o=!0,he.set([r,e],{opacity:0}),n=0;else{const h=Math.max(0,1-f);he.set([r,e],{opacity:h}),n=h}}else he.set([r,e],{opacity:1});function l(){return t&&t.kill(),t=We.create({trigger:"#cover-travel-area",start:"top top",end:"67% center",scrub:.5,markers:!1,id:"cover-logo-fade",invalidateOnRefresh:!0,fastScrollEnd:!0,onUpdate:c=>{if(!s)return;const u=1-c.progress;Math.abs(u-n)>.01&&(n=u,r.style.opacity=u,i&&(i.kill(),i=null),e&&(e.style.opacity=u))},onLeave:()=>{s&&(i&&(i.kill(),i=null),r.style.opacity="0",n=0,e&&(e.style.opacity="0"))},onEnterBack:()=>{if(!s)return;const u=1-t.progress;r.style.opacity=u,n=u,i&&(i.kill(),i=null),e&&(i=he.to(e,{opacity:u,duration:.8,delay:.4,ease:"power2.out",onUpdate:function(){parseFloat(e.style.opacity)},onComplete:function(){i=null}}))},onLeaveBack:()=>{s&&(i&&(i.kill(),i=null),r.style.opacity="1",n=1,e&&(e.style.opacity="1"))}}),setTimeout(()=>{if(s=!0,!o&&t){const c=t.progress,u=1-c;c>0&&c<1?(r.style.opacity=u,n=u,e&&(e.style.opacity=u)):c>=1&&(r.style.opacity="0",n=0,e&&(e.style.opacity="0"))}},200),t}return l()}function J2(){const r=document.querySelector("#hero-area h1"),e=document.querySelector("#hero-number");if(!r||!e)return;r.getAttribute("data-original-content")||r.setAttribute("data-original-content",r.textContent),We.getAll().forEach(a=>{(a.vars.trigger==="#hero-area"||a.vars.trigger==="#hero-travel-area")&&a.kill()});const t=e.innerText||"2026";e.getAttribute("data-original-content")||e.setAttribute("data-original-content",t),e.innerHTML="",e.style.setProperty("--digit-opacity","0"),t.split("").forEach(a=>{const l=document.createElement("span");l.className="digit",l.textContent=a,l.setAttribute("data-digit",a),e.appendChild(l)}),he.set(e,{opacity:0}),he.set(r,{opacity:0}),sl&&(sl.revert(),sl=null),sl=new Va(r,{types:"words,chars",absolute:!1});const n=sl;he.set(n.chars,{opacity:0,z:150,scale:1.2,transformPerspective:1e3,transformOrigin:"center center",filter:"blur(16px)"});const i=[...n.chars];for(let a=i.length-1;a>0;a--){const l=Math.floor(Math.random()*(a+1));[i[a],i[l]]=[i[l],i[a]]}const s=he.timeline({paused:!0,onComplete:()=>{$2(!0),window.heroAnimationComplete=!0;const a=new CustomEvent("heroAnimationComplete");document.dispatchEvent(a)}});s.to(r,{opacity:1,duration:.8,ease:"power2.out"}),s.to(i,{opacity:1,z:0,scale:1,filter:"blur(0px)",duration:1.25,stagger:.03,ease:"power2.out",onComplete:()=>{const a=new CustomEvent("particleFadeStart");document.dispatchEvent(a)}}),s.to(e,{opacity:1,duration:1.5,scrub:1.5,ease:"power1.inOut"});const o=e.querySelectorAll(".digit");he.set(o,{y:10,z:-120,transformPerspective:1e3,transformOrigin:"center center"}),s.to(o,{y:0,z:0,duration:2.5,stagger:.1,ease:"power3.out"},"-=0.6"),s.to(e,{"--digit-opacity":.44,duration:2.5,ease:"power3.out"},"-=2.5"),We.create({trigger:"#hero-travel-area",start:"top 90%",end:"top 0%",animation:s,scrub:.5,markers:!1,invalidateOnRefresh:!0,fastScrollEnd:!0,onEnter:()=>{const a=new CustomEvent("veryEarlyParticleFade");document.dispatchEvent(a)},onUpdate:a=>{s&&s.progress(a.progress)}}),e&&(We.create({trigger:"#hero-travel-area",start:"15% top",end:"bottom bottom",scrub:.3,markers:!1,invalidateOnRefresh:!0,fastScrollEnd:!0,onUpdate:a=>{const l=1-a.progress*.5;e.style.transform=`scale(${l})`},onLeave:()=>{e.style.transform="scale(0.5)"},onEnterBack:()=>{const l=1-(We.getById("hero-scale")?We.getById("hero-scale").progress:0)*.5;e.style.transform=`scale(${l})`},onLeaveBack:()=>{e.style.transform="scale(1)"},id:"hero-scale"}),We.create({trigger:"#hero-travel-area",start:"bottom 90%",end:"bottom 80%",scrub:.3,markers:!1,invalidateOnRefresh:!0,fastScrollEnd:!0,onUpdate:function(a){const l=a.progress;let c=1;Ot.heroNumberTween&&Ot.heroNumberTween.scrollTrigger&&(c=.44+Ot.heroNumberTween.scrollTrigger.progress*.56);const u=c*(1-l),d=l*16;e.style.setProperty("--digit-opacity",u),e.style.filter=`blur(${d}px)`},onLeave:()=>{e.style.setProperty("--digit-opacity","0"),e.style.filter="blur(16px)"},onEnterBack:()=>{const a=We.getById("hero-fade-out");if(a){const l=a.progress;let c=1;Ot.heroNumberTween&&Ot.heroNumberTween.scrollTrigger&&(c=.44+Ot.heroNumberTween.scrollTrigger.progress*.56);const u=c*(1-l),d=l*16;e.style.setProperty("--digit-opacity",u),e.style.filter=`blur(${d}px)`}},id:"hero-fade-out"}),We.create({trigger:"#hero-travel-area",start:"bottom 80%",end:"bottom 60%",scrub:.5,markers:!1,invalidateOnRefresh:!0,fastScrollEnd:!0,onUpdate:function(a){e.style.setProperty("--digit-opacity","0"),e.style.filter="blur(16px)",e.style.opacity="0"},onLeave:()=>{e.style.setProperty("--digit-opacity","0"),e.style.filter="blur(16px)",e.style.opacity="0"},onEnterBack:()=>{},onLeaveBack:()=>{e.style.opacity="1"},id:"hero-backup-fade-out"}))}function Q2(){const r=document.querySelector("#hero-number");r?Ot.heroNumberTween?(Ot.heroNumberTween.scrollTrigger&&Ot.heroNumberTween.scrollTrigger.enable(),Ot.heroNumberTween.resume()):(Ot.heroNumberTween=he.to(Ot.heroYearObj,{year:1876,ease:"none",paused:!0,scrollTrigger:{trigger:"#hero-travel-area",start:"15% top",end:"75% bottom",scrub:.5,markers:!1,invalidateOnRefresh:!0,fastScrollEnd:!0,id:"hero-countdown",onUpdate:function(e){const t=Math.round(2026-e.progress*150);Ot.heroYearObj.year=t;const n=.44+e.progress*.56,i=t.toString(),s=r.querySelectorAll(".digit"),o=i.split("");let a=!1;if(s.length!==o.length)a=!0;else for(let l=0;l<s.length;l++)if(s[l].textContent!==o[l]){a=!0;break}a&&(s.length!==o.length?(r.innerHTML="",o.forEach(l=>{const c=document.createElement("span");c.className="digit",c.textContent=l,c.setAttribute("data-digit",l),r.appendChild(c)})):s.forEach((l,c)=>{l.textContent!==o[c]&&(l.textContent=o[c],l.setAttribute("data-digit",o[c]))})),r.style.setProperty("--digit-opacity",n),r.style.filter="blur(0px)"},onLeave:function(e){requestAnimationFrame(()=>{r.style.setProperty("--digit-opacity","1.0"),r.style.filter="blur(0px)"})},onComplete:function(){Ot.heroYearObj.year=1876;const e=document.querySelector("#hero-number");if(e){const t=e.querySelectorAll(".digit"),n="1876".split("");t.forEach((i,s)=>{i.textContent!==n[s]&&(i.textContent=n[s],i.setAttribute("data-digit",n[s]))}),requestAnimationFrame(()=>{e.style.setProperty("--digit-opacity","1.0"),e.style.filter="blur(0px)"})}},onLeaveBack:function(e){Ot.heroYearObj.year=2026;const t=document.querySelector("#hero-number");if(t){const n=t.querySelectorAll(".digit"),i="2026".split("");n.forEach((s,o)=>{s.textContent!==i[o]&&(s.textContent=i[o],s.setAttribute("data-digit",i[o]))}),requestAnimationFrame(()=>{t.style.setProperty("--digit-opacity","0.44"),t.style.filter="blur(0px)"})}},onRefresh:e=>{const t=.44+e.progress*.56;requestAnimationFrame(()=>{r.style.setProperty("--digit-opacity",t),r.style.filter="blur(0px)"})}}}),Ot.heroNumberTween.scrollTrigger?We.refresh():console.error("Hero countdown: ScrollTrigger creation failed!")):console.warn("#hero-number element not found for countdown animation.")}function e3(){document.querySelectorAll(".pin-top-top").forEach(function(r){let e=r.parentElement;r.id==="cover-area"?We.create({trigger:"#cover-travel-area",start:"top top",end:"bottom top",pin:r,pinSpacing:!1,anticipatePin:1,onLeaveBack:t=>{t.pin.style.transform="translate3d(0px, 0px, 0px)"}}):r.id==="hero-area"?We.create({trigger:r,endTrigger:"#hero-travel-area",start:"top top",end:"bottom 80%",pin:r,pinSpacing:!1,anticipatePin:1,onLeaveBack:t=>{t.pin.style.transform="translate3d(0px, 0px, 0px)"}}):We.create({trigger:e,start:"top top",end:"bottom bottom",pin:r,pinSpacing:!1})})}function t3(){const r=document.querySelector("#video .video-wrapper"),e=document.querySelector("#video"),t=document.querySelector("#video-travel-area");r&&e&&t&&(he.set(r,{scale:.4,opacity:0,transformOrigin:"center center"}),he.set(e,{pointerEvents:"none"}),he.timeline({scrollTrigger:{trigger:"#video",start:"top top",end:"top -50%",scrub:!0,markers:!1,onUpdate:i=>{i.progress>.8?r.classList.add("scale-active"):r.classList.remove("scale-active")}}}).to(r,{scale:1,opacity:1,ease:"power2.out"}),We.create({trigger:"#video",start:"top 20%",end:"top top",markers:!1,onEnter:()=>{he.set(e,{pointerEvents:"auto"})},onLeaveBack:()=>{he.set(e,{pointerEvents:"none"})}}),We.create({trigger:"#video",start:"top top",endTrigger:"#video-travel-area",end:"bottom bottom",pin:!0,pinSpacing:!1,anticipatePin:1,markers:!1,id:"video-pin"}))}function id(r,e){let t;return function(...i){const s=()=>{clearTimeout(t),r(...i)};clearTimeout(t),t=setTimeout(s,e)}}function n3(){const r=document.querySelector("#get-involved-text p");r&&(he.set(r,{opacity:1,visibility:"visible",autoAlpha:1}),setTimeout(()=>{document.body.offsetHeight,r.offsetHeight,r.style.width=r.offsetWidth+"px";const e=new Va(r,{types:"lines",lineClass:"line",absolute:!1});e.lines&&e.lines.length>0?(he.set(e.lines,{opacity:0,y:40,transformOrigin:"center center"}),he.timeline({scrollTrigger:{trigger:"#get-involved",start:"top 65%",end:"top 20%",scrub:!1,markers:!1,toggleActions:"play none none reverse"}}).to(e.lines,{opacity:1,y:0,duration:1.2,stagger:.25,ease:"power1.out"})):console.warn("SplitType failed to detect lines properly")},100))}function i3(){const r=document.querySelector(".get-involved-150-logo");if(!r){console.warn("No .get-involved-150-logo element found");return}he.set(r,{opacity:0,y:50}),We.create({trigger:r,start:"top 85%",once:!1,markers:!1,id:"get-involved-logo-fade",onEnter:()=>{he.to(r,{opacity:1,y:0,duration:1.2,ease:"power2.out",overwrite:!0})},onLeaveBack:()=>{he.to(r,{opacity:0,y:50,duration:.8,ease:"power2.in",overwrite:!0})}})}function r3(){const r=document.querySelector(".sliding-card-row-wrapper"),e=document.querySelector("#get-involved-cards"),t=document.querySelector("#hero-travel-area");let n,i;if(r&&e){const s=()=>{const l=window.innerWidth>1280;n&&!l&&(n.kill(),n=null,he.set(r,{x:0})),l&&!n?n=he.fromTo(r,{x:"44vw"},{x:"-20vw",ease:"power1.inOut",scrollTrigger:{trigger:"#get-involved-cards",start:"top 80%",end:"bottom 20%",scrub:1.5,invalidateOnRefresh:!0,markers:!1,id:"sliding-cards-animation",refreshPriority:-1}}).scrollTrigger:n&&n.refresh()},o=()=>{i&&(i.kill(),i=null),t&&(i=We.create({trigger:"#get-involved-cards",start:"top 80%",end:"top 20%",scrub:!0,markers:!1,id:"hero-fade-animation",onUpdate:l=>{const c=1-l.progress;he.set(t,{opacity:c})},onLeaveBack:()=>{he.set(t,{opacity:1})}}))};s(),o();const a=id(()=>{s(),o()},250);window.addEventListener("resize",a)}else console.warn("Could not find sliding card wrapper or get-involved-cards section")}function s3(){const r=document.querySelector(".form-panel .animation-column"),e=r==null?void 0:r.querySelector("img");if(!r||!e){console.warn("Form panel animation column or image not found");return}let t=r.querySelector(".marquee-container");if(!t){t=document.createElement("div"),t.className="marquee-container";const u=e.cloneNode(!0);u.className+=" cloned-image",e.remove(),t.appendChild(e),t.appendChild(u),r.appendChild(t)}const n=[e,t.querySelector(".cloned-image")];let i=null;const s=()=>{i&&(i.kill(),i=null),r.offsetHeight,e.offsetHeight,setTimeout(()=>{const d=e.getBoundingClientRect().height;if(d<=0){if(window.innerWidth<580)return;console.warn("Image height is 0, retrying marquee setup..."),setTimeout(s,200);return}he.set(n,{y:0,top:"auto",opacity:1}),he.set(e,{position:"absolute",top:0,left:0}),he.set(n[1],{position:"absolute",top:d+"px",left:0});const f=he.timeline({repeat:-1,ease:"none"}),h=Math.max(d/30,2);f.to(n,{y:-d,duration:h,ease:"none"}),f.set(n,{y:0}),i=f},100)},o=id(()=>{document.body.offsetHeight,s()},250);(()=>{e.complete&&e.naturalHeight!==0?s():(e.addEventListener("load",s),setTimeout(s,1e3))})(),window.addEventListener("resize",o),window.addEventListener("orientationchange",()=>{setTimeout(o,300)}),window.cleanupInfiniteMarquee=()=>{i&&(i.kill(),i=null),window.removeEventListener("resize",o)};let l=!1;const c=()=>{if(!l){l=!0;const u=e.getBoundingClientRect().height,d=parseFloat(n[1].style.top||"0");Math.abs(u-d)>5&&s(),window.removeEventListener("scroll",c)}};window.addEventListener("scroll",c),document.fonts&&document.fonts.ready&&document.fonts.ready.then(()=>{setTimeout(s,100)})}function o3(){const r=document.querySelectorAll(".scroll-reveal, .reveal-top-center, .reveal-center-center");if(!r.length){console.warn("No reveal elements found");return}r.forEach((e,t)=>{const n=e.classList.contains("fancy-btn"),i=parseFloat(e.getAttribute("data-reveal-delay"))||0;let s=50,o="top 85%";e.classList.contains("reveal-top-center")?(s=-50,o="top 50%"):e.classList.contains("reveal-center-center")&&(s=0,o="center 50%"),n?(he.set(e,{y:s,filter:"opacity(0)"}),We.create({trigger:e,start:o,once:!1,markers:!1,id:`scroll-reveal-button-${t}`,onEnter:()=>{he.to(e,{y:0,filter:"opacity(1)",duration:1.2,delay:i,ease:"power2.out",overwrite:!0})},onLeaveBack:()=>{he.to(e,{y:s,filter:"opacity(0)",duration:.8,ease:"power2.in",overwrite:!0})}})):(he.set(e,{opacity:0,y:s}),We.create({trigger:e,start:o,once:!1,markers:!1,id:`scroll-reveal-${t}`,onEnter:()=>{he.to(e,{opacity:1,y:0,duration:1.2,delay:i,ease:"power2.out",overwrite:!0})},onLeaveBack:()=>{he.to(e,{opacity:0,y:s,duration:.8,ease:"power2.in",overwrite:!0})}}))})}function a3(){const r=new Is(window.innerWidth,window.innerHeight);r.texture.generateMipmaps=!1,r.texture.minFilter=Kn;const e=new Su,t=new tp,n=new Vi(2,2),i=new hi({uniforms:{uTime:{value:0},uResolution:{value:new Et(window.innerWidth,window.innerHeight)}},vertexShader:`
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position, 1.0);
      }
    `,fragmentShader:`
      precision highp float;
      varying vec2 vUv;
      uniform float uTime;
      uniform vec2 uResolution;

      // Timeline blue colors (matching ACS brand)
      vec3 c1 = vec3(0.29, 0.72, 0.91); // #4fb8e9 light blue
      vec3 c2 = vec3(0.13, 0.53, 0.72); // #2088b8 mid blue
      vec3 c3 = vec3(0.10, 0.37, 0.56); // #1a5f8f dark blue
      vec3 c4 = vec3(0.00, 0.83, 1.00); // #00d4ff accent
      vec3 c5 = vec3(0.20, 0.45, 0.65); // intermediate shade

      float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123); }
      
      float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        float a = hash(i);
        float b = hash(i + vec2(1, 0));
        float c = hash(i + vec2(0, 1));
        float d = hash(i + vec2(1, 1));
        vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
      }

      void main() {
        vec2 uv = (gl_FragCoord.xy / uResolution.xy);
        uv -= 0.5;
        uv.x *= uResolution.x / uResolution.y;
        float t = uTime * 0.05;

        // Multi-octave noise
        float n = noise(uv * 2.0 + t);
        n += 0.5 * noise(uv * 4.0 - t * 0.5);
        n += 0.25 * noise(uv * 8.0 + t * 0.25);
        n = smoothstep(0.3, 0.8, n);

        // Animate between blue shades
        vec3 col = mix(c1, c2, abs(sin(uTime * 0.2)));
        col = mix(col, c3, abs(sin(uTime * 0.3 + 1.0)));
        col = mix(col, c4, abs(sin(uTime * 0.4 + 2.0)));
        col = mix(col, c5, n);
        
        gl_FragColor = vec4(col, 1.0);
      }
    `,depthWrite:!1}),s=new Qn(n,i);e.add(s);const o=new qu(1,128,128),a=new cr({transmission:1,transparent:!0,opacity:1,thickness:2,roughness:.02,reflectivity:.8,ior:1.45,attenuationColor:new je("#4fb8e9"),attenuationDistance:2,envMap:r.texture,envMapIntensity:1.5,clearcoat:1,clearcoatRoughness:.05}),l=new Qn(o,a);l.position.set(0,0,0);const c=o.attributes.position,u=Float32Array.from(c.array);return{sphere:l,geometry:o,basePositions:u,bgScene:e,bgCamera:t,bgMaterial:i,refractRT:r}}function l3(r,e,t,n){r.bgMaterial.uniforms.uTime.value=e,t.setRenderTarget(r.refractRT),t.render(r.bgScene,r.bgCamera),t.setRenderTarget(null);const i=r.geometry.attributes.position,s=r.basePositions,o=i.count;for(let a=0;a<o;a++){const l=a*3,c=s[l],u=s[l+1],d=s[l+2];i.array[l]=c+.08*Math.sin(e*.7+c*2.1+u*1.7),i.array[l+1]=u+.08*Math.sin(e*.7+u*2.3+d*1.9),i.array[l+2]=d+.08*Math.sin(e*.7+d*2.5+c*1.3)}i.needsUpdate=!0,r.geometry.computeVertexNormals(),r.sphere.rotation.y+=.002}function c3(r,e,t){r.bgMaterial.uniforms.uResolution.value.set(e,t),r.refractRT.setSize(e,t)}function u3(){const i=new qu(.02,8,8),s=new hi({uniforms:{uTime:{value:0},uWaveStrength:{value:.3},uWaveSpeed:{value:.5}},vertexShader:`
      uniform float uTime;
      uniform float uWaveStrength;
      uniform float uWaveSpeed;
      
      varying float vOpacity;
      
      void main() {
        vec3 pos = position;
        
        // Get instance position
        vec3 instancePos = vec3(
          mod(float(gl_InstanceID), 60.0) * 0.3 - 9.0,
          floor(float(gl_InstanceID) / 60.0) * 0.3 - 6.0,
          0.0
        );
        
        // Calculate wave displacement
        float wave = sin(instancePos.x * 0.5 + instancePos.y * 0.5 + uTime * uWaveSpeed) * uWaveStrength;
        instancePos.z += wave;
        
        // Calculate opacity based on wave
        vOpacity = 0.3 + sin(instancePos.x * 0.5 + uTime * uWaveSpeed) * 0.2;
        
        // Apply transformations
        vec4 mvPosition = modelViewMatrix * vec4(instancePos + pos, 1.0);
        gl_Position = projectionMatrix * mvPosition;
      }
    `,fragmentShader:`
      varying float vOpacity;
      
      void main() {
        // Circular point shape
        vec2 coord = gl_PointCoord - vec2(0.5);
        if (length(coord) > 0.5) discard;
        
        gl_FragColor = vec4(1.0, 1.0, 1.0, vOpacity);
      }
    `,transparent:!0,depthWrite:!1}),o=new n_(i,s,2400),a=new dn;let l=0;for(let c=0;c<40;c++)for(let u=0;u<60;u++)a.position.set(u*.3-60*.3/2,c*.3-40*.3/2,-3),a.updateMatrix(),o.setMatrixAt(l,a.matrix),l++;return o.instanceMatrix.needsUpdate=!0,o}class d3{constructor(){if(this.canvas=document.getElementById("timeline-canvas"),!this.canvas)throw new Error("Timeline canvas not found");this.scene=null,this.camera=null,this.renderer=null,this.sphereSystem=null,this.dotPlane=null,this.clock=new Xb,this.isAnimating=!1,this.init()}init(){this.scene=new Su,this.camera=new ci(45,window.innerWidth/window.innerHeight,.1,100),this.camera.position.set(0,0,3),this.renderer=new __({canvas:this.canvas,alpha:!0,antialias:!0}),this.renderer.setSize(window.innerWidth,window.innerHeight),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));const e=new c_(16777215,1);e.position.set(5,5,5),this.scene.add(e);const t=new d_(16777215,.6);this.scene.add(t),this.sphereSystem=a3(),this.scene.add(this.sphereSystem.sphere),this.dotPlane=u3(),this.scene.add(this.dotPlane),window.addEventListener("resize",()=>this.onResize()),this.startAnimation()}startAnimation(){this.isAnimating||(this.isAnimating=!0,this.animate())}stopAnimation(){this.isAnimating=!1}animate(){if(!this.isAnimating)return;requestAnimationFrame(()=>this.animate());const e=this.clock.getElapsedTime();l3(this.sphereSystem,e,this.renderer,this.camera),this.dotPlane&&this.dotPlane.material.uniforms&&(this.dotPlane.material.uniforms.uTime.value=e),this.renderer.autoClear=!0,this.renderer.render(this.scene,this.camera)}onResize(){const e=window.innerWidth,t=window.innerHeight;this.camera.aspect=e/t,this.camera.updateProjectionMatrix(),this.renderer.setSize(e,t),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,2)),this.sphereSystem&&c3(this.sphereSystem,e,t)}dispose(){this.stopAnimation(),this.sphereSystem&&(this.sphereSystem.sphere.geometry.dispose(),this.sphereSystem.sphere.material.dispose(),this.sphereSystem.bgMaterial.dispose(),this.sphereSystem.refractRT.dispose()),this.dotPlane&&(this.dotPlane.geometry.dispose(),this.dotPlane.material.dispose()),this.renderer.dispose()}}function f3(){return new d3}let h3=null;function Mg(r,e,t){const n=c=>{const u=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(c);return u?{r:parseInt(u[1],16),g:parseInt(u[2],16),b:parseInt(u[3],16)}:null},i=n(r),s=n(e);if(!i||!s)return r;const o=Math.round(i.r+(s.r-i.r)*t),a=Math.round(i.g+(s.g-i.g)*t),l=Math.round(i.b+(s.b-i.b)*t);return`#${((1<<24)+(o<<16)+(a<<8)+l).toString(16).slice(1)}`}function p3(){const r=document.querySelector("#acs-timeline"),e=document.querySelector("#timeline-window-start"),t=document.querySelector("#timeline-window-bg"),n=document.querySelector(".get-involved-message");if(!r||!e||!t||!n){console.warn("Timeline: Required elements not found. Skipping timeline initialization.");return}const i=r.querySelector(".timeline-container"),s=r.querySelector(".timeline-track");if(!i||!s){console.warn("Timeline: Container or track not found. Skipping timeline initialization.");return}typeof window.backgroundPaused>"u"&&(window.backgroundPaused=!1);try{h3=f3(),console.log("Timeline: Three.js scene initialized")}catch($){console.error("Timeline: Failed to initialize Three.js scene:",$)}let o={top:0,left:0,width:0,height:0},a={top:0,left:0,width:0,height:0};const l=($,P,_e)=>$+(P-$)*_e,c=()=>{if(!e||!t)return;const $=e.getBoundingClientRect(),_e=window.getComputedStyle(e).transform;let we=0;_e&&_e!=="none"&&(we=new DOMMatrix(_e).m42);const Se=$.top-we,Q=.1,ee=.5,q=.5;if(!(Math.abs(Se-a.top)>Q||Math.abs($.left-a.left)>ee||Math.abs($.width-a.width)>q||Math.abs($.height-a.height)>q)&&a.top!==0)return;a={top:Se,left:$.left,width:$.width,height:$.height};const be=o.top===0?1:.6;o={top:l(o.top||Se,Se,be),left:l(o.left||$.left,$.left,be),width:l(o.width||$.width,$.width,be),height:l(o.height||$.height,$.height,be)};const qe=t.style.opacity||"0";t.style.position="fixed",t.style.top=`${o.top}px`,t.style.left=`${o.left}px`,t.style.width=`${o.width}px`,t.style.height=`${o.height}px`,t.style.backgroundImage="linear-gradient(to bottom, #0493E2, #0493E2)",t.style.zIndex="0",t.style.opacity=qe,t.style.borderRadius="4px",t.style.willChange="top, left, width, height, opacity"};he.set(t,{opacity:0});const u=document.createElement("style");u.id="timeline-window-start-bg-style",u.textContent=`
    #timeline-window-start::before {
      content: '';
      position: absolute;
      top: -2px;
      left: -6px;
      right: -6px;
      bottom: -2px;
      background: linear-gradient(to bottom, #0493E2, #0493E2);
      border-radius: 4px;
      opacity: 0;
      z-index: -1;
      pointer-events: none;
      transition: opacity 0.3s ease;
    }
  `,document.head.appendChild(u),e.style.position="relative",e.style.zIndex="1",requestAnimationFrame(()=>{setTimeout(()=>{c()},100)});const d=new ResizeObserver(()=>{c()});d.observe(document.body);let f=null;const h=()=>{},_=()=>{},g=he.utils.toArray(".timeline-event"),m=he.utils.toArray(".timeline-decade"),p=g.length-1,b=()=>window.innerHeight*1,x=()=>window.innerHeight*2,v=()=>b()+p*x(),T=1,M=.2,E=T+M,R=.09+M,w=p*E,y=R+w;let L={isLocked:!1,targetIndex:-1,unlockTimer:null,reason:""};const N=$=>{const P=document.querySelector(".scrubber-progress"),_e=he.utils.toArray(".marker");if(!P||!m.length)return;const we=_e.length;let Se=0,Q=0;if(L.isLocked&&L.targetIndex>=0)Se=L.targetIndex,Q=(2*Se+1)/(2*we);else{const ee=R/y;if($<ee)Se=0,Q=1/(2*we);else{const q=$-ee,Ie=1-ee,be=q/Ie,qe=m[0],ht=he.utils.toArray(".timeline-event",qe),Ne=ht.length===1&&ht[0].classList.contains("timeline-cover");let at=0,U=0;const H=Math.floor(be*p);if(Ne){const rt=m.slice(1);for(let Ae=0;Ae<rt.length;Ae++){const gt=he.utils.toArray(".timeline-event",rt[Ae]);if(H<at+gt.length){U=Ae+1;break}at+=gt.length,U=Ae+1}}else for(let rt=0;rt<m.length;rt++){const Ae=he.utils.toArray(".timeline-event",m[rt]);if(H<at+Ae.length){U=rt;break}at+=Ae.length,U=rt}Se=Math.min(U,we-1),Q=(2*Se+1)/(2*we)}}he.to(P,{scaleX:Q,transformOrigin:"left",duration:.3,ease:"power2.out"}),_e.length>0&&_e.forEach((ee,q)=>{ee.classList.remove("active","complete"),q===Se?ee.classList.add("active"):q<Se&&ee.classList.add("complete")})},W=$=>{if($===0)return(.09+M*.5)/y;let P=0;for(let ee=0;ee<$&&ee<m.length;ee++){const q=he.utils.toArray(".timeline-event",m[ee]);P+=q.length}const _e=m[$];if(he.utils.toArray(".timeline-event",_e).length===0)return console.warn(`Decade ${$} has no events`),0;const Se=P-1,Q=R+Se*E+T+M*.5;return Math.min(Q/y,.99)},j=he.timeline({scrollTrigger:{trigger:e,start:"top 90%",end:"top 70%",scrub:1,onLeaveBack:()=>{const $=document.getElementById("timeline-window-start-bg-style");$&&($.textContent=$.textContent.replace(/opacity: [0-9.]+/,"opacity: 0"))}}}).to({},{duration:1,ease:"power2.out",onUpdate:function(){const P=this.progress()*.5,_e=document.getElementById("timeline-window-start-bg-style");_e&&(_e.textContent=`
          #timeline-window-start::before {
            content: '';
            position: absolute;
            top: -2px;
            left: -6px;
            right: -6px;
            bottom: -2px;
            background: linear-gradient(to bottom, #0493E2, #0493E2);
            border-radius: 4px;
            opacity: ${P};
            z-index: -1;
            pointer-events: none;
          }
        `)}});let k=null;const J=he.timeline({scrollTrigger:{trigger:n,start:"center center",end:"+=600",pin:!0,scrub:1,anticipatePin:1,onUpdate:$=>{const P=$.progress,_e=.01,we=document.getElementById("timeline-window-start-bg-style"),Se=window.getComputedStyle(e,"::before"),Q=parseFloat(Se.opacity||"0");if(Q>0&&parseFloat(t.style.opacity||"1")>0&&(t.style.opacity="0",t.style.visibility="hidden",console.log("Timeline: SAFETY - Pseudo visible, forcing BG to 0. Pseudo opacity:",Q.toFixed(3))),P<_e?(t.style.opacity="0",t.style.visibility="hidden",we&&(we.textContent=`
              #timeline-window-start::before {
                content: '';
                position: absolute;
                top: -2px;
                left: -6px;
                right: -6px;
                bottom: -2px;
                background: linear-gradient(to bottom, #0493E2, #0493E2);
                border-radius: 4px;
                opacity: 0.5 !important;
                z-index: -1;
                pointer-events: none;
                transition: none !important;
              }
            `)):(Q<.01&&(t.style.opacity="0.5",t.style.visibility="visible"),we&&(we.textContent=`
              #timeline-window-start::before {
                content: '';
                position: absolute;
                top: -2px;
                left: -6px;
                right: -6px;
                bottom: -2px;
                background: linear-gradient(to bottom, #0493E2, #0493E2);
                border-radius: 4px;
                opacity: 0 !important;
                z-index: -1;
                pointer-events: none;
                transition: none !important;
              }
            `)),P<.01&&!k){const ee=e.getBoundingClientRect();k={top:ee.top,left:ee.left,width:ee.width,height:ee.height}}},onEnter:()=>{console.log("Timeline: INSTANT handoff from span to BG element"),j&&(j.kill(),console.log("Timeline: Killed pseudo fade timeline"));const $=e.getBoundingClientRect(),P=$.top-2,_e=$.left-6,we=$.width+12,Se=$.height+4,Q=document.getElementById("timeline-window-start-bg-style");Q&&(Q.textContent=`
            #timeline-window-start::before {
              content: '';
              position: absolute;
              top: -2px;
              left: -6px;
              right: -6px;
              bottom: -2px;
              background: linear-gradient(to bottom, #0493E2, #0493E2);
              border-radius: 4px;
              opacity: 0 !important;
              z-index: -1;
              pointer-events: none;
              transition: none !important;
            }
          `),t.style.position="fixed",t.style.top=`${P}px`,t.style.left=`${_e}px`,t.style.width=`${we}px`,t.style.height=`${Se}px`,t.style.backgroundImage="linear-gradient(to bottom, #0493E2, #0493E2)",t.style.borderRadius="4px",t.style.zIndex="0",t.style.opacity="0.5",k={top:P,left:_e,width:we,height:Se},console.log("Timeline: INSTANT handoff complete, BG element now visible at",k)},onLeaveBack:()=>{console.log("Timeline: INSTANT reverse handoff from BG element to span"),t.style.opacity="0";const $=document.getElementById("timeline-window-start-bg-style");$&&($.textContent=`
            #timeline-window-start::before {
              content: '';
              position: absolute;
              top: -2px;
              left: -6px;
              right: -6px;
              bottom: -2px;
              background: linear-gradient(to bottom, #0493E2, #0493E2);
              border-radius: 4px;
              opacity: 0.5;
              z-index: -1;
              pointer-events: none;
              transition: opacity 0.3s ease;
            }
          `),k=null,console.log("Timeline: INSTANT reverse handoff complete, pseudo-element restored")}}}),te={progress:0};J.fromTo(t,()=>{if(k)return{top:`${k.top}px`,left:`${k.left}px`,width:`${k.width}px`,height:`${k.height}px`,opacity:.5};const $=e.getBoundingClientRect();return{top:`${$.top}px`,left:`${$.left}px`,width:`${$.width}px`,height:`${$.height}px`,opacity:.5}},{top:0,left:0,width:"100vw",height:"100vh",opacity:1,borderRadius:"0px",ease:"power2.inOut",duration:.7,onReverseComplete:()=>{t.style.opacity="0",console.log("Timeline: BG element hidden on reverse")}},0),J.to(te,{progress:1,duration:.7,ease:"power2.inOut",onUpdate:()=>{const $=Mg("#0493E2","#0493AB",te.progress),P=Mg("#0493E2","#0657A4",te.progress);t.style.backgroundImage=`linear-gradient(to bottom, ${$}, ${P})`}},0),J.to(n,{opacity:0,ease:"power2.in",duration:.6},.4);const F=he.timeline({scrollTrigger:{trigger:r,start:"top top",end:()=>`+=${v()}`,pin:i,scrub:1,anticipatePin:1,invalidateOnRefresh:!0,onRefresh:$=>{console.log("Timeline: ScrollTrigger refreshed, progress:",$.progress.toFixed(3)),$.animation&&(N($.animation.progress()),Ag($.progress))},onUpdate:$=>{N($.animation.progress()),Ag($.progress),$.progress>0&&$.progress<.95&&t.style.opacity!=="1"&&(t.style.opacity="1")},onEnter:()=>{console.log("Timeline: Entering timeline section"),he.to(t,{opacity:1,duration:.2,overwrite:"auto"})},onLeave:()=>{console.log("Timeline: Leaving timeline section")}}});if(F.fromTo(".timeline-scrubber",{opacity:0,y:30},{opacity:1,y:0,duration:.05,ease:"power2.out"},0),F.from(".timeline-threejs-container",{opacity:0,scale:.8,duration:.03},.01),F.from(".timeline-close",{opacity:0,scale:.8,duration:.03},.02),g.length>0){const $=g[0],P=g.slice(1);F.fromTo($,{opacity:0,scale:.98},{opacity:1,scale:1,duration:.05,ease:"power1.out"},.04),F.to({},{duration:M},">"),F.to(t,{"--decal-opacity":1,duration:M*.6,ease:"power2.out",onUpdate:function(){const _e=he.getProperty(t,"--decal-opacity")||0;t.style.setProperty("--decal-opacity",_e)}},`<+=${M*.2}`),P.forEach((_e,we)=>{const Se=()=>-(we+1)*window.innerWidth,Q=`event-${we}`;F.to(s,{x:Se,duration:T,ease:"power1.inOut"},Q);const ee=we===0?$:P[we-1];F.to(ee,{opacity:0,scale:1.02,duration:T*.5,ease:"power1.in"},`${Q}+=${T*.4}`),F.fromTo(_e,{opacity:0,scale:.98},{opacity:1,scale:1,duration:T*.5,ease:"power1.out"},`${Q}+=${T*.3}`),F.to({},{duration:M})})}const ue=r.querySelector(".timeline-close");ue&&ue.addEventListener("click",()=>{var P;const $=r.offsetTop+r.offsetHeight;(P=window.lenis)==null||P.scrollTo($,{duration:1.5})});const O=he.utils.toArray(".marker");return O.forEach(($,P)=>{$.addEventListener("click",()=>{L.isLocked=!0,L.targetIndex=P,L.reason="click",L.unlockTimer&&clearTimeout(L.unlockTimer),O.forEach((Ie,be)=>{Ie.classList.remove("active","complete"),be===P?Ie.classList.add("active"):be<P&&Ie.classList.add("complete")});const _e=W(P),we=F.scrollTrigger;if(!we)return;const Se=we.start,ee=we.end-Se,q=Se+ee*_e;console.log(`Marker Click: Index ${P}, Target Progress: ${_e.toFixed(3)}, Target Scroll: ${q.toFixed(0)}`),window.lenis?window.lenis.scrollTo(q,{duration:1.2,easing:Ie=>Math.min(1,1.001-Math.pow(2,-10*Ie)),onComplete:()=>{L.unlockTimer=setTimeout(()=>{L.isLocked=!1,L.targetIndex=-1,L.reason="",console.log("Marker Click: Unlocked after scroll complete")},500)}}):(window.scrollTo({top:q,behavior:"smooth"}),L.unlockTimer=setTimeout(()=>{L.isLocked=!1,L.targetIndex=-1,L.reason="",console.log("Marker Click: Unlocked after scroll complete (native)")},1500))}),$.style.cursor="pointer"}),he.timeline({scrollTrigger:{trigger:r,start:"bottom bottom",end:"bottom 80%",scrub:1,onEnterBack:()=>{he.to([t,r],{opacity:1,duration:.3})}}}).to([t,r],{opacity:0,ease:"power2.in"}),window._timelineCleanup={rafId:f,resizeObserver:d,lenisCallback:h,scrollCallback:_},F.scrollTrigger&&(Wt.timelineScrollTrigger=F.scrollTrigger),Wt.markerLockRef=L,requestAnimationFrame(()=>{We.refresh()}),F}let Wt={isResizing:!1,savedProgress:null,timelineScrollTrigger:null,markerLockRef:null};function m3(){const r=Wt.timelineScrollTrigger;if(!r||!r.isActive)return null;const e=r.progress,t=he.utils.toArray(".timeline-event"),n=he.utils.toArray(".timeline-decade"),i=he.utils.toArray(".marker");let s=0,o=0,a=-1;i.forEach((c,u)=>{c.classList.contains("active")&&(a=u)});const l=t.length;if(l>0&&e>0){s=Math.min(Math.floor(e*l),l-1);let c=0;for(let u=0;u<n.length;u++){const d=he.utils.toArray(".timeline-event",n[u]);if(s<c+d.length){o=u;break}c+=d.length}}return a>=0&&(o=a),console.log("Timeline Resize: Captured state - marker:",a,"decade:",o,"progress:",e.toFixed(3)),{progress:e,activeEventIndex:s,activeDecadeIndex:o,activeMarkerIndex:a,scrollPosition:window.pageYOffset||document.documentElement.scrollTop}}let Tg=null,Eg=null;function g3(){Wt.isResizing||(Wt.isResizing=!0,Wt.savedProgress=m3(),document.body.classList.add("timeline-resizing"),Wt.savedProgress&&console.log("Timeline Resize: Captured state -",Wt.savedProgress))}function _3(){console.log("Timeline Resize: Starting resize end handler"),We.refresh(!0),requestAnimationFrame(()=>{requestAnimationFrame(()=>{if(We.update(),Wt.savedProgress&&Wt.timelineScrollTrigger){const r=Wt.timelineScrollTrigger,e=r.start,n=r.end-e,i=e+n*Wt.savedProgress.progress;console.log("Timeline Resize: Restoring to progress",Wt.savedProgress.progress.toFixed(3)),window.lenis?window.lenis.scrollTo(i,{immediate:!0,force:!0}):window.scrollTo({top:i,behavior:"auto"}),Wt.savedProgress.activeMarkerIndex>=0&&Wt.markerLockRef&&(Wt.markerLockRef.isLocked=!0,Wt.markerLockRef.targetIndex=Wt.savedProgress.activeMarkerIndex,Wt.markerLockRef.reason="resize",he.utils.toArray(".marker").forEach((o,a)=>{o.classList.remove("active","complete"),a===Wt.savedProgress.activeMarkerIndex?o.classList.add("active"):a<Wt.savedProgress.activeMarkerIndex&&o.classList.add("complete")})),setTimeout(()=>{We.update(),r.animation&&(r.animation.invalidate(),r.animation.progress(r.animation.progress())),window.dispatchEvent(new Event("scroll")),setTimeout(()=>{Wt.markerLockRef&&Wt.markerLockRef.reason==="resize"&&(Wt.markerLockRef.isLocked=!1,Wt.markerLockRef.targetIndex=-1,Wt.markerLockRef.reason="",console.log("Timeline Resize: Marker unlocked"))},500),document.body.classList.remove("timeline-resizing"),Wt.isResizing=!1,Wt.savedProgress=null,console.log("Timeline Resize: Complete")},150)}else document.body.classList.remove("timeline-resizing"),Wt.isResizing=!1,Wt.savedProgress=null,console.log("Timeline Resize: Complete (no saved state)")})})}window.addEventListener("resize",()=>{clearTimeout(Eg),clearTimeout(Tg),Eg=setTimeout(g3,10),Tg=setTimeout(_3,300)});function Ag(r){r>.1&&r<.95?window.backgroundPaused||(window.backgroundPaused=!0,console.log("[Timeline] Pausing background shader for performance (film grain, waves, particles frozen)"),window.dispatchEvent(new CustomEvent("timeline:backgroundPaused",{detail:{paused:!0}}))):window.backgroundPaused&&(window.backgroundPaused=!1,console.log("[Timeline] Resuming background shader (film grain, waves, particles active)"),window.dispatchEvent(new CustomEvent("timeline:backgroundPaused",{detail:{paused:!1}})))}let Cg=!1;function Rg(r){let e=!1;r.addEventListener("mouseenter",()=>{e=!0,r.classList.add("fancy-btn-active"),r.style.transform="translateY(-2px) scale(1.02)"}),r.addEventListener("mouseleave",()=>{e=!1,r.classList.remove("fancy-btn-active"),r.style.transform=""}),r.addEventListener("mousedown",()=>{r.style.transform="translateY(1px) scale(0.98)"}),r.addEventListener("mouseup",()=>{e&&(r.style.transform="translateY(-2px) scale(1.02)")})}function x3(){const r=document.querySelectorAll(".fancy-btn"),e=()=>{r.forEach(t=>{t.dataset.fancyInitialized!=="true"&&(Rg(t),t.dataset.fancyInitialized="true")})};Cg||(document.addEventListener("heroAnimationComplete",e),Cg=!0),r.forEach(t=>{t.classList.contains("enter-experience")||(Rg(t),t.dataset.fancyInitialized="true")}),window.heroAnimationComplete&&e()}function v3(){const r=document.querySelector("#hero-travel-area"),e=document.querySelector("#get-involved"),t=document.querySelector("#events");document.querySelector("#video-travel-area");const n=document.querySelector(".page-nav"),i=document.querySelector(".section-timeline .indicator .active-title"),s=document.querySelector(".section-timeline"),o=document.querySelector(".form-panel"),a=document.querySelector(".timeline-nav-wrapper");if(!r||!e||!n||!i||!s)return;he.set(n,{opacity:0,pointerEvents:"none"});let l=!1;const c=E=>{if(!o)return!1;const R=o.getBoundingClientRect(),w=E.clientX,y=E.clientY;return w>=R.left&&w<=R.right&&y>=R.top&&y<=R.bottom};s.addEventListener("mouseenter",E=>{!l&&!c(E)&&he.to(n,{opacity:1,pointerEvents:"auto",duration:.3,ease:"power2.out"})}),s.addEventListener("mouseleave",()=>{he.to(n,{opacity:0,pointerEvents:"none",duration:.3,ease:"power2.out"}),l=!1}),n.addEventListener("mouseenter",E=>{c(E)||he.to(i,{opacity:0,duration:.2,ease:"power2.out"})}),n.addEventListener("mouseleave",()=>{he.to(i,{opacity:1,duration:.2,ease:"power2.out"})}),o&&a&&(o.addEventListener("mouseenter",()=>{he.set(a,{pointerEvents:"none"})}),o.addEventListener("mouseleave",()=>{he.set(a,{pointerEvents:"auto"})}));const u=n.querySelector(".anniversary"),d=n.querySelector(".get-involved"),f=n.querySelector(".events"),h=E=>{if(i.textContent===E)return;const R=he.timeline();R.to(i,{opacity:0,duration:.18,onComplete:()=>{i.textContent=E}}),R.to(i,{opacity:1,duration:.24})},_=E=>{if(!E)return 0;E.offsetHeight;let R=0,w=E;for(;w;)R+=w.offsetTop,w=w.offsetParent;return R};u.addEventListener("click",E=>{E.preventDefault(),n.querySelectorAll("a").forEach(R=>R.classList.remove("active")),u.classList.add("active"),h("150 Years of ACS"),he.to(n,{opacity:0,pointerEvents:"none",duration:.2,ease:"power2.out"}),l=!0,window.scrollTo({top:0,behavior:"smooth"})}),d.addEventListener("click",E=>{E.preventDefault(),n.querySelectorAll("a").forEach(R=>R.classList.remove("active")),d.classList.add("active"),h("Get Involved"),he.to(n,{opacity:0,pointerEvents:"none",duration:.2,ease:"power2.out"}),l=!0,e&&setTimeout(()=>{const R=_(e);window.scrollTo({top:R,behavior:"smooth"})},50)}),f.addEventListener("click",E=>{E.preventDefault(),n.querySelectorAll("a").forEach(R=>R.classList.remove("active")),f.classList.add("active"),h("Events"),he.to(n,{opacity:0,pointerEvents:"none",duration:.2,ease:"power2.out"}),l=!0,t&&setTimeout(()=>{const R=_(t);window.scrollTo({top:R,behavior:"smooth"})},50)});const g=[{id:"hero",element:r,title:"150 Years of ACS",link:u,top:0,bottom:0},{id:"getinvolved",element:e,title:"Get Involved",link:d,top:0,bottom:0},{id:"events",element:t,title:"Events",link:f,top:0,bottom:0}];function m(){if(g.forEach(E=>{E.element&&(E.top=_(E.element),E.bottom=E.top+E.element.offsetHeight)}),g[0].element&&e&&(g[0].bottom=_(e)),e&&t){const E=g.find(R=>R.id==="getinvolved");E&&(E.top=_(e),E.bottom=_(t))}}m();let p=null;function b(){requestAnimationFrame(()=>{const E=window.pageYOffset+window.innerHeight/2;let R=g[0];for(let w=g.length-1;w>=0;w--){const y=g[w];if(y.element&&E>=y.top&&E<y.bottom){R=y;break}}p!==R.id&&(p=R.id,n.querySelectorAll("a").forEach(w=>w.classList.remove("active")),R.link&&R.link.classList.add("active"),h(R.title))})}window.removeEventListener("scroll",b),window.addEventListener("scroll",b);const x=id(()=>{document.body.offsetHeight,m(),requestAnimationFrame(()=>{m(),b()})},150);window.addEventListener("resize",x),window.addEventListener("orientationchange",()=>{setTimeout(()=>{x()},300)});const v=()=>{m(),b()};v(),setTimeout(v,500),document.fonts&&document.fonts.ready&&document.fonts.ready.then(v);let T=!1;const M=()=>{T||(T=!0,m(),window.removeEventListener("scroll",M))};window.addEventListener("scroll",M)}function y3(){const r=document.querySelector(".share-button-pinned"),e=document.querySelector(".events-panel");if(!r||!e){console.warn("Share button or events panel not found for overlap detection");return}const t=()=>{const s=r.getBoundingClientRect(),o=e.getBoundingClientRect();!(s.right<o.left||s.left>o.right||s.bottom<o.top||s.top>o.bottom)?r.style.backgroundColor="rgba(20,181,0,0.75)":r.style.backgroundColor=""};let n=!1;const i=()=>{n||(requestAnimationFrame(()=>{t(),n=!1}),n=!0)};window.addEventListener("scroll",i),window.addEventListener("resize",i),t(),window.cleanupShareButtonOverlap=()=>{window.removeEventListener("scroll",i),window.removeEventListener("resize",i),r&&(r.style.backgroundColor="")}}function b3(){const r=document.querySelector(".share-button-pinned");if(!r){console.warn("Share button not found for share panel initialization");return}const e=document.createElement("div");e.className="share-panel",e.innerHTML=`
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
  `,document.body.appendChild(e),w3(r,e)}function w3(r,e){let t=!1;const n=()=>({url:window.location.href,title:"American Chemical Society - 150 Years of Innovation",description:"Join us in celebrating 150 years of advancing chemistry and chemical sciences. #ACS150",hashtags:"ACS150,Chemistry,Science,Innovation"}),i=(c,u)=>{const d={facebook:`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(u.url)}`,linkedin:`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(u.url)}`,instagram:"https://www.instagram.com/"};d[c]&&window.open(d[c],"_blank","width=600,height=400")},s=async c=>{try{return await navigator.clipboard.writeText(c),!0}catch(u){return console.error("Failed to copy text: ",u),!1}},o=c=>{const u=document.createElement("div");u.textContent=c,u.style.cssText=`
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
        letter-spacing: 1px;
        font-style: italic;
      }

      .share-option {
        display: flex;
        align-items: center;
        gap: 0;
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
      }

      .share-option svg {
        flex-shrink: 0;
      }
    `,document.head.appendChild(c)}}const S3="/150-lab/assets/images/pacifichem-event1.jpg",M3="/150-lab/assets/images/green-chemistry-event2.jpg",T3="/150-lab/assets/images/acs-spring-meeting-event3.jpg";function E3(){const r=document.querySelectorAll(".event-list-item");if(!r.length){console.warn("No .event-list-item elements found");return}const e=[S3,M3,T3];r.forEach((t,n)=>{const i=e[n];if(!i){console.warn(`No image mapped for event item ${n}`);return}const s=document.createElement("img");s.className="pinned-hover-image",s.src=i,s.style.cssText=`
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
    `,document.body.appendChild(s);const o=()=>{const l=t.getBoundingClientRect(),c=-20;s.style.left=l.right-200-c+"px",s.style.top=l.top+l.height/2+"px"};t.addEventListener("mouseenter",()=>{o(),s.style.opacity="1",s.style.transform="translateY(-50%) scale(1)",t.classList.add("active")}),t.addEventListener("mouseleave",()=>{s.style.opacity="0",s.style.transform="translateY(-50%) scale(0.9)",t.classList.remove("active")});const a=()=>{s.style.opacity!=="0"&&o()};window.addEventListener("scroll",a),window.addEventListener("resize",a)})}const gu=[],_u=[],_v=()=>new Promise(r=>{document.fonts&&document.fonts.ready?document.fonts.ready.then(()=>{r()}):setTimeout(r,100)}),xv=r=>new Promise(e=>{const t=r.closest("section")||r.parentNode;if(!t){e();return}const n=t.querySelectorAll("img");if(n.length===0){e();return}const i=setTimeout(e,2e3);let s=0,o=!0;if(n.forEach(a=>{a.complete||(o=!1)}),o){clearTimeout(i),e();return}n.forEach(a=>{a.complete?(s++,s===n.length&&(clearTimeout(i),e())):(a.addEventListener("load",()=>{s++,s===n.length&&(clearTimeout(i),e())}),a.addEventListener("error",()=>{s++,s===n.length&&(clearTimeout(i),e())}))})}),vv=(r,e)=>{const t=r.innerHTML;r.setAttribute("data-original-content",t),Promise.all([_v(),xv(r)]).then(()=>{r.offsetHeight;const n=(i=0)=>{const s=new Va(r,{types:"lines",lineClass:"split-line",absolute:!1,tagName:"div"});s.lines&&s.lines.length>0?(gu.push({element:r,splitText:s,originalContent:t}),he.set(s.lines,{opacity:0,y:50}),We.create({trigger:r,start:"top 85%",once:!1,markers:!1,id:`split-lines-${e}`,onEnter:()=>{const a=e*200;he.to(s.lines,{opacity:1,y:0,duration:1.2,stagger:.1,ease:"power2.out",delay:a/1e3,overwrite:!0})},onLeaveBack:()=>{he.to(s.lines,{opacity:0,y:50,duration:.8,stagger:.05,ease:"power2.in",overwrite:!0})}})):i<3?(s&&typeof s.revert=="function"&&s.revert(),setTimeout(()=>{n(i+1)},300*(i+1))):(console.warn("SplitType failed to create lines properly after multiple attempts:",r),r.innerHTML=t)};n()})},yv=(r,e)=>{const t=r.innerHTML;r.setAttribute("data-original-content",t),Promise.all([_v(),xv(r)]).then(()=>{r.offsetHeight;const n=(i=0)=>{const s=new Va(r,{types:"chars",charClass:"split-char",absolute:!1,tagName:"span"});s.chars&&s.chars.length>0?(_u.push({element:r,splitText:s,originalContent:t}),he.set(s.chars,{opacity:0,y:50,display:"inline-block"}),We.create({trigger:r,start:"top 85%",once:!1,markers:!1,id:`split-chars-${e}`,onEnter:()=>{he.to(s.chars,{opacity:1,y:0,duration:1.2,stagger:.02,ease:"power2.out",overwrite:!0})},onLeaveBack:()=>{he.to(s.chars,{opacity:0,y:50,duration:.8,stagger:.01,ease:"power2.in",overwrite:!0})}})):i<3?(s&&typeof s.revert=="function"&&s.revert(),setTimeout(()=>{n(i+1)},300*(i+1))):(console.warn("SplitType failed to create chars after multiple attempts:",r),r.innerHTML=t)};n()})};function Hh(r=null){const e=r||document.querySelectorAll(".split-lines");if(!e||e.length===0){console.warn("No .split-lines elements found or provided for initialization");return}e.forEach((t,n)=>{vv(t,n)})}function Gh(r=null){const e=r||document.querySelectorAll(".split-chars");if(!e||e.length===0){console.warn("No .split-chars elements found or provided for initialization");return}e.forEach((t,n)=>{yv(t,n)})}function bv(){gu.forEach(r=>{r.element&&r.originalContent&&(r.element.innerHTML=r.originalContent);const e=gu.indexOf(r);e>-1&&gu.splice(e,1)})}function A3(){bv(),setTimeout(()=>{document.querySelectorAll(".split-lines").forEach((e,t)=>{vv(e,t)})},100)}function wv(){_u.forEach(r=>{r.element&&r.originalContent&&(r.element.innerHTML=r.originalContent);const e=_u.indexOf(r);e>-1&&_u.splice(e,1)})}function C3(){wv(),setTimeout(()=>{document.querySelectorAll(".split-chars").forEach((e,t)=>{yv(e,t)})},100)}window.cleanupSplitLines=bv;window.refreshSplitLines=A3;window.cleanupSplitChars=wv;window.refreshSplitChars=C3;function Pg(){typeof window.cleanupSplitLines=="function"&&window.cleanupSplitLines(),typeof window.cleanupSplitChars=="function"&&window.cleanupSplitChars();const r=document.querySelector("#hero-area h1");if(r){let n=0;if(Ot.heroHeadingFadeScrollTrigger&&Ot.heroHeadingFadeScrollTrigger.animation){n=Ot.heroHeadingFadeScrollTrigger.progress;const i=r.querySelectorAll(".char");if(i.length>0){const s=he.timeline({paused:!0});s.to(i,{opacity:0,z:-50,stagger:.02,ease:"power1.in"},0),s.progress(n)}}if(Ot.heroHeadingFadeScrollTrigger&&(Ot.heroHeadingFadeScrollTrigger.kill(),Ot.heroHeadingFadeScrollTrigger=null),!r.querySelector(".char")){const i=r.getAttribute("data-original-content")||r.textContent;r.innerHTML=i}}const e=Array.from(document.querySelectorAll(".split-lines")).filter(n=>!n.closest("#hero-area")),t=Array.from(document.querySelectorAll(".split-chars")).filter(n=>!n.closest("#hero-area"));e.forEach(n=>{const i=n.getAttribute("data-original-content");i&&(n.innerHTML=i)}),t.forEach(n=>{const i=n.getAttribute("data-original-content");i&&(n.innerHTML=i)}),setTimeout(()=>{e.length&&typeof Hh=="function"&&Hh(e),t.length&&typeof Gh=="function"&&Gh(t),typeof Vh=="function"&&Vh(),We.refresh()},50)}function R3(){window.globalResizeHandler&&window.removeEventListener("resize",window.globalResizeHandler),window.globalResizeHandler=id(()=>{Pg()},250),window.addEventListener("resize",window.globalResizeHandler),window.addEventListener("orientationchange",()=>{Pg()})}he.registerPlugin(We);he.registerPlugin(la);he.registerPlugin(Va);window.gsap=he;const P3=new Date("2026-04-06T00:00:00").getTime();function L3(){const r=window.location.href.toLowerCase(),e=window.location.pathname.toLowerCase();return r.includes("/editor.html/")||r.includes("globe.html")?(console.log("Not on main page"),!1):r.includes("index.html")||r.includes("acs.org/150")||r.includes("localhost:5173")||r.includes("192.168")||r.includes("cmswwwdev.acs.org/150")||r.includes("adobeaemcloud.com")&&e.includes("/150")||r.includes("awolfe-acs.github.io/150-lab")&&(e==="/150-lab/"||e==="/150-lab/index.html")||r.includes("github.io/150-lab")&&(e==="/150-lab/"||e==="/150-lab/index.html")}function D3(){X2(),We.refresh(),We.clearMatchMedia(),k2(),J2(),Q2(),e3(),Vh(),t3(),n3(),r3(),i3(),s3(),o3(),p3(),v3(),x3(),q2(),Y2(),y3(),b3(),E3(),Hh(null),Gh(null),R3();const r=document.querySelector("button.toggle-menu");r&&r.addEventListener("click",()=>{const n=document.querySelector("nav"),i=document.querySelector("header");n&&n.classList.toggle("active"),i&&i.classList.toggle("nav-active")});let e=0;window.addEventListener("scroll",()=>{const n=window.scrollY,i=document.querySelector("header.anniversary");i&&(n>e?i.classList.remove("active"):i.classList.add("active")),e=n});const t=document.querySelector("button.close-toggle-menu");t&&t.addEventListener("click",()=>{const n=document.querySelector("nav"),i=document.querySelector("header");n&&n.classList.remove("active"),i&&i.classList.remove("nav-active")})}history.scrollRestoration&&(history.scrollRestoration="manual");window.scrollTo(0,0);window.addEventListener("beforeunload",()=>{window.scrollTo(0,0),sessionStorage.setItem("scrollToTop","true")});window.addEventListener("load",()=>{window.scrollTo({top:0,left:0,behavior:"instant"}),setTimeout(()=>{window.scrollTo(0,0)},10)});document.addEventListener("DOMContentLoaded",()=>{window.scrollTo(0,0);const r=xs.detect(),e=xs.getSettings();console.log("[Main] AEM Mode:",r),console.log("[Main] Settings:",e),e.showStaticBackground&&xs.applyStaticBackground(),e.showPlaceholderMessage&&xs.showPlaceholderMessage();const t=/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)||window.innerWidth<=768||"ontouchstart"in window;window.lenis=new Nv({autoRaf:!0,infinite:!1,syncTouch:!0,smoothWheel:!0,touchInertiaMultiplier:35,duration:1.2,easing:i=>Math.min(1,1.001-Math.pow(2,-10*i))}),console.log(t?"Mobile device detected - optimizing for touch":"Desktop device detected"),window.lenis.on("scroll",i=>{}),t&&(document.addEventListener("touchstart",function(i){},{passive:!0}),document.addEventListener("touchmove",function(i){Math.abs(i.touches[0].clientX-i.touches[0].clientY)>Math.abs(i.touches[0].clientY-i.touches[0].clientX)},{passive:!1}),window.addEventListener("resize",()=>{window.lenis&&window.lenis.resize()})),gC(P3),e.enableBackground?setTimeout(async()=>{try{await A_(),console.log("[Main] Shader background initialized successfully")}catch(i){console.error("Failed to initialize shader background:",i),console.warn("Continuing without shader background..."),xs.applyStaticBackground()}},100):console.log("[Main] Skipping shader background (AEM mode or fallback)"),L3()?(K2(),e.enableAnimations?(D3(),console.log("[Main] Animations initialized")):console.log("[Main] Skipping animations (AEM fallback mode)"),e.enableVideo?(tA(),console.log("[Main] Video initialized")):console.log("[Main] Skipping video (AEM fallback mode)")):console.log("Running in lightweight mode - animations and video disabled"),setTimeout(()=>{window.scrollTo(0,0),window.lenis.scrollTo(0,{immediate:!0})},100)});
