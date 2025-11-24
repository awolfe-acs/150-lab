
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

var Mv=Object.defineProperty;var Tv=(r,e,t)=>e in r?Mv(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t;var it=(r,e,t)=>Tv(r,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function t(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(i){if(i.ep)return;i.ep=!0;const s=t(i);fetch(i.href,s)}})();var Ev="1.3.13";function Pg(r,e,t){return Math.max(r,Math.min(e,t))}function Av(r,e,t){return(1-t)*r+t*e}function Cv(r,e,t,n){return Av(r,e,1-Math.exp(-t*n))}function Rv(r,e){return(r%e+e)%e}var Pv=class{constructor(){it(this,"isRunning",!1);it(this,"value",0);it(this,"from",0);it(this,"to",0);it(this,"currentTime",0);it(this,"lerp");it(this,"duration");it(this,"easing");it(this,"onUpdate")}advance(r){var t;if(!this.isRunning)return;let e=!1;if(this.duration&&this.easing){this.currentTime+=r;const n=Pg(0,this.currentTime/this.duration,1);e=n>=1;const i=e?1:this.easing(n);this.value=this.from+(this.to-this.from)*i}else this.lerp?(this.value=Cv(this.value,this.to,this.lerp*60,r),Math.round(this.value)===this.to&&(this.value=this.to,e=!0)):(this.value=this.to,e=!0);e&&this.stop(),(t=this.onUpdate)==null||t.call(this,this.value,e)}stop(){this.isRunning=!1}fromTo(r,e,{lerp:t,duration:n,easing:i,onStart:s,onUpdate:o}){this.from=this.value=r,this.to=e,this.lerp=t,this.duration=n,this.easing=i,this.currentTime=0,this.isRunning=!0,s==null||s(),this.onUpdate=o}};function Lv(r,e){let t;return function(...n){let i=this;clearTimeout(t),t=setTimeout(()=>{t=void 0,r.apply(i,n)},e)}}var Dv=class{constructor(r,e,{autoResize:t=!0,debounce:n=250}={}){it(this,"width",0);it(this,"height",0);it(this,"scrollHeight",0);it(this,"scrollWidth",0);it(this,"debouncedResize");it(this,"wrapperResizeObserver");it(this,"contentResizeObserver");it(this,"resize",()=>{this.onWrapperResize(),this.onContentResize()});it(this,"onWrapperResize",()=>{this.wrapper instanceof Window?(this.width=window.innerWidth,this.height=window.innerHeight):(this.width=this.wrapper.clientWidth,this.height=this.wrapper.clientHeight)});it(this,"onContentResize",()=>{this.wrapper instanceof Window?(this.scrollHeight=this.content.scrollHeight,this.scrollWidth=this.content.scrollWidth):(this.scrollHeight=this.wrapper.scrollHeight,this.scrollWidth=this.wrapper.scrollWidth)});this.wrapper=r,this.content=e,t&&(this.debouncedResize=Lv(this.resize,n),this.wrapper instanceof Window?window.addEventListener("resize",this.debouncedResize,!1):(this.wrapperResizeObserver=new ResizeObserver(this.debouncedResize),this.wrapperResizeObserver.observe(this.wrapper)),this.contentResizeObserver=new ResizeObserver(this.debouncedResize),this.contentResizeObserver.observe(this.content)),this.resize()}destroy(){var r,e;(r=this.wrapperResizeObserver)==null||r.disconnect(),(e=this.contentResizeObserver)==null||e.disconnect(),this.wrapper===window&&this.debouncedResize&&window.removeEventListener("resize",this.debouncedResize,!1)}get limit(){return{x:this.scrollWidth-this.width,y:this.scrollHeight-this.height}}},Lg=class{constructor(){it(this,"events",{})}emit(r,...e){var n;let t=this.events[r]||[];for(let i=0,s=t.length;i<s;i++)(n=t[i])==null||n.call(t,...e)}on(r,e){var t;return(t=this.events[r])!=null&&t.push(e)||(this.events[r]=[e]),()=>{var n;this.events[r]=(n=this.events[r])==null?void 0:n.filter(i=>e!==i)}}off(r,e){var t;this.events[r]=(t=this.events[r])==null?void 0:t.filter(n=>e!==n)}destroy(){this.events={}}},Wp=100/6,as={passive:!1},Iv=class{constructor(r,e={wheelMultiplier:1,touchMultiplier:1}){it(this,"touchStart",{x:0,y:0});it(this,"lastDelta",{x:0,y:0});it(this,"window",{width:0,height:0});it(this,"emitter",new Lg);it(this,"onTouchStart",r=>{const{clientX:e,clientY:t}=r.targetTouches?r.targetTouches[0]:r;this.touchStart.x=e,this.touchStart.y=t,this.lastDelta={x:0,y:0},this.emitter.emit("scroll",{deltaX:0,deltaY:0,event:r})});it(this,"onTouchMove",r=>{const{clientX:e,clientY:t}=r.targetTouches?r.targetTouches[0]:r,n=-(e-this.touchStart.x)*this.options.touchMultiplier,i=-(t-this.touchStart.y)*this.options.touchMultiplier;this.touchStart.x=e,this.touchStart.y=t,this.lastDelta={x:n,y:i},this.emitter.emit("scroll",{deltaX:n,deltaY:i,event:r})});it(this,"onTouchEnd",r=>{this.emitter.emit("scroll",{deltaX:this.lastDelta.x,deltaY:this.lastDelta.y,event:r})});it(this,"onWheel",r=>{let{deltaX:e,deltaY:t,deltaMode:n}=r;const i=n===1?Wp:n===2?this.window.width:1,s=n===1?Wp:n===2?this.window.height:1;e*=i,t*=s,e*=this.options.wheelMultiplier,t*=this.options.wheelMultiplier,this.emitter.emit("scroll",{deltaX:e,deltaY:t,event:r})});it(this,"onWindowResize",()=>{this.window={width:window.innerWidth,height:window.innerHeight}});this.element=r,this.options=e,window.addEventListener("resize",this.onWindowResize,!1),this.onWindowResize(),this.element.addEventListener("wheel",this.onWheel,as),this.element.addEventListener("touchstart",this.onTouchStart,as),this.element.addEventListener("touchmove",this.onTouchMove,as),this.element.addEventListener("touchend",this.onTouchEnd,as)}on(r,e){return this.emitter.on(r,e)}destroy(){this.emitter.destroy(),window.removeEventListener("resize",this.onWindowResize,!1),this.element.removeEventListener("wheel",this.onWheel,as),this.element.removeEventListener("touchstart",this.onTouchStart,as),this.element.removeEventListener("touchmove",this.onTouchMove,as),this.element.removeEventListener("touchend",this.onTouchEnd,as)}},Xp=r=>Math.min(1,1.001-Math.pow(2,-10*r)),Ov=class{constructor({wrapper:r=window,content:e=document.documentElement,eventsTarget:t=r,smoothWheel:n=!0,syncTouch:i=!1,syncTouchLerp:s=.075,touchInertiaExponent:o=1.7,duration:a,easing:l,lerp:c=.1,infinite:u=!1,orientation:d="vertical",gestureOrientation:f=d==="horizontal"?"both":"vertical",touchMultiplier:h=1,wheelMultiplier:_=1,autoResize:g=!0,prevent:m,virtualScroll:p,overscroll:b=!0,autoRaf:x=!1,anchors:v=!1,autoToggle:E=!1,allowNestedScroll:M=!1,__experimental__naiveDimensions:T=!1}={}){it(this,"_isScrolling",!1);it(this,"_isStopped",!1);it(this,"_isLocked",!1);it(this,"_preventNextNativeScrollEvent",!1);it(this,"_resetVelocityTimeout",null);it(this,"__rafID",null);it(this,"isTouching");it(this,"time",0);it(this,"userData",{});it(this,"lastVelocity",0);it(this,"velocity",0);it(this,"direction",0);it(this,"options");it(this,"targetScroll");it(this,"animatedScroll");it(this,"animate",new Pv);it(this,"emitter",new Lg);it(this,"dimensions");it(this,"virtualScroll");it(this,"onScrollEnd",r=>{r instanceof CustomEvent||(this.isScrolling==="smooth"||this.isScrolling===!1)&&r.stopPropagation()});it(this,"dispatchScrollendEvent",()=>{this.options.wrapper.dispatchEvent(new CustomEvent("scrollend",{bubbles:this.options.wrapper===window,detail:{lenisScrollEnd:!0}}))});it(this,"onTransitionEnd",r=>{if(r.propertyName.includes("overflow")){const e=this.isHorizontal?"overflow-x":"overflow-y",t=getComputedStyle(this.rootElement)[e];["hidden","clip"].includes(t)?this.internalStop():this.internalStart()}});it(this,"onClick",r=>{const t=r.composedPath().find(n=>{var i;return n instanceof HTMLAnchorElement&&((i=n.getAttribute("href"))==null?void 0:i.includes("#"))});if(t){const n=t.getAttribute("href");if(n){const i=typeof this.options.anchors=="object"&&this.options.anchors?this.options.anchors:void 0,s=`#${n.split("#")[1]}`;this.scrollTo(s,i)}}});it(this,"onPointerDown",r=>{r.button===1&&this.reset()});it(this,"onVirtualScroll",r=>{if(typeof this.options.virtualScroll=="function"&&this.options.virtualScroll(r)===!1)return;const{deltaX:e,deltaY:t,event:n}=r;if(this.emitter.emit("virtual-scroll",{deltaX:e,deltaY:t,event:n}),n.ctrlKey||n.lenisStopPropagation)return;const i=n.type.includes("touch"),s=n.type.includes("wheel");this.isTouching=n.type==="touchstart"||n.type==="touchmove";const o=e===0&&t===0;if(this.options.syncTouch&&i&&n.type==="touchstart"&&o&&!this.isStopped&&!this.isLocked){this.reset();return}const l=this.options.gestureOrientation==="vertical"&&t===0||this.options.gestureOrientation==="horizontal"&&e===0;if(o||l)return;let c=n.composedPath();c=c.slice(0,c.indexOf(this.rootElement));const u=this.options.prevent;if(c.find(m=>{var p,b,x;return m instanceof HTMLElement&&(typeof u=="function"&&(u==null?void 0:u(m))||((p=m.hasAttribute)==null?void 0:p.call(m,"data-lenis-prevent"))||i&&((b=m.hasAttribute)==null?void 0:b.call(m,"data-lenis-prevent-touch"))||s&&((x=m.hasAttribute)==null?void 0:x.call(m,"data-lenis-prevent-wheel"))||this.options.allowNestedScroll&&this.checkNestedScroll(m,{deltaX:e,deltaY:t}))}))return;if(this.isStopped||this.isLocked){n.cancelable&&n.preventDefault();return}if(!(this.options.syncTouch&&i||this.options.smoothWheel&&s)){this.isScrolling="native",this.animate.stop(),n.lenisStopPropagation=!0;return}let f=t;this.options.gestureOrientation==="both"?f=Math.abs(t)>Math.abs(e)?t:e:this.options.gestureOrientation==="horizontal"&&(f=e),(!this.options.overscroll||this.options.infinite||this.options.wrapper!==window&&this.limit>0&&(this.animatedScroll>0&&this.animatedScroll<this.limit||this.animatedScroll===0&&t>0||this.animatedScroll===this.limit&&t<0))&&(n.lenisStopPropagation=!0),n.cancelable&&n.preventDefault();const h=i&&this.options.syncTouch,g=i&&n.type==="touchend";g&&(f=Math.sign(this.velocity)*Math.pow(Math.abs(this.velocity),this.options.touchInertiaExponent)),this.scrollTo(this.targetScroll+f,{programmatic:!1,...h?{lerp:g?this.options.syncTouchLerp:1}:{lerp:this.options.lerp,duration:this.options.duration,easing:this.options.easing}})});it(this,"onNativeScroll",()=>{if(this._resetVelocityTimeout!==null&&(clearTimeout(this._resetVelocityTimeout),this._resetVelocityTimeout=null),this._preventNextNativeScrollEvent){this._preventNextNativeScrollEvent=!1;return}if(this.isScrolling===!1||this.isScrolling==="native"){const r=this.animatedScroll;this.animatedScroll=this.targetScroll=this.actualScroll,this.lastVelocity=this.velocity,this.velocity=this.animatedScroll-r,this.direction=Math.sign(this.animatedScroll-r),this.isStopped||(this.isScrolling="native"),this.emit(),this.velocity!==0&&(this._resetVelocityTimeout=setTimeout(()=>{this.lastVelocity=this.velocity,this.velocity=0,this.isScrolling=!1,this.emit()},400))}});it(this,"raf",r=>{const e=r-(this.time||r);this.time=r,this.animate.advance(e*.001),this.options.autoRaf&&(this.__rafID=requestAnimationFrame(this.raf))});window.lenisVersion=Ev,(!r||r===document.documentElement)&&(r=window),typeof a=="number"&&typeof l!="function"?l=Xp:typeof l=="function"&&typeof a!="number"&&(a=1),this.options={wrapper:r,content:e,eventsTarget:t,smoothWheel:n,syncTouch:i,syncTouchLerp:s,touchInertiaExponent:o,duration:a,easing:l,lerp:c,infinite:u,gestureOrientation:f,orientation:d,touchMultiplier:h,wheelMultiplier:_,autoResize:g,prevent:m,virtualScroll:p,overscroll:b,autoRaf:x,anchors:v,autoToggle:E,allowNestedScroll:M,__experimental__naiveDimensions:T},this.dimensions=new Dv(r,e,{autoResize:g}),this.updateClassName(),this.targetScroll=this.animatedScroll=this.actualScroll,this.options.wrapper.addEventListener("scroll",this.onNativeScroll,!1),this.options.wrapper.addEventListener("scrollend",this.onScrollEnd,{capture:!0}),this.options.anchors&&this.options.wrapper===window&&this.options.wrapper.addEventListener("click",this.onClick,!1),this.options.wrapper.addEventListener("pointerdown",this.onPointerDown,!1),this.virtualScroll=new Iv(t,{touchMultiplier:h,wheelMultiplier:_}),this.virtualScroll.on("scroll",this.onVirtualScroll),this.options.autoToggle&&this.rootElement.addEventListener("transitionend",this.onTransitionEnd,{passive:!0}),this.options.autoRaf&&(this.__rafID=requestAnimationFrame(this.raf))}destroy(){this.emitter.destroy(),this.options.wrapper.removeEventListener("scroll",this.onNativeScroll,!1),this.options.wrapper.removeEventListener("scrollend",this.onScrollEnd,{capture:!0}),this.options.wrapper.removeEventListener("pointerdown",this.onPointerDown,!1),this.options.anchors&&this.options.wrapper===window&&this.options.wrapper.removeEventListener("click",this.onClick,!1),this.virtualScroll.destroy(),this.dimensions.destroy(),this.cleanUpClassName(),this.__rafID&&cancelAnimationFrame(this.__rafID)}on(r,e){return this.emitter.on(r,e)}off(r,e){return this.emitter.off(r,e)}setScroll(r){this.isHorizontal?this.options.wrapper.scrollTo({left:r,behavior:"instant"}):this.options.wrapper.scrollTo({top:r,behavior:"instant"})}resize(){this.dimensions.resize(),this.animatedScroll=this.targetScroll=this.actualScroll,this.emit()}emit(){this.emitter.emit("scroll",this)}reset(){this.isLocked=!1,this.isScrolling=!1,this.animatedScroll=this.targetScroll=this.actualScroll,this.lastVelocity=this.velocity=0,this.animate.stop()}start(){if(this.isStopped){if(this.options.autoToggle){this.rootElement.style.removeProperty("overflow");return}this.internalStart()}}internalStart(){this.isStopped&&(this.reset(),this.isStopped=!1,this.emit())}stop(){if(!this.isStopped){if(this.options.autoToggle){this.rootElement.style.setProperty("overflow","clip");return}this.internalStop()}}internalStop(){this.isStopped||(this.reset(),this.isStopped=!0,this.emit())}scrollTo(r,{offset:e=0,immediate:t=!1,lock:n=!1,duration:i=this.options.duration,easing:s=this.options.easing,lerp:o=this.options.lerp,onStart:a,onComplete:l,force:c=!1,programmatic:u=!0,userData:d}={}){if(!((this.isStopped||this.isLocked)&&!c)){if(typeof r=="string"&&["top","left","start","#"].includes(r))r=0;else if(typeof r=="string"&&["bottom","right","end"].includes(r))r=this.limit;else{let f;if(typeof r=="string"?(f=document.querySelector(r),f||(r==="#top"?r=0:console.warn("Lenis: Target not found",r))):r instanceof HTMLElement&&(r!=null&&r.nodeType)&&(f=r),f){if(this.options.wrapper!==window){const _=this.rootElement.getBoundingClientRect();e-=this.isHorizontal?_.left:_.top}const h=f.getBoundingClientRect();r=(this.isHorizontal?h.left:h.top)+this.animatedScroll}}if(typeof r=="number"){if(r+=e,r=Math.round(r),this.options.infinite){if(u){this.targetScroll=this.animatedScroll=this.scroll;const f=r-this.animatedScroll;f>this.limit/2?r=r-this.limit:f<-this.limit/2&&(r=r+this.limit)}}else r=Pg(0,r,this.limit);if(r===this.targetScroll){a==null||a(this),l==null||l(this);return}if(this.userData=d??{},t){this.animatedScroll=this.targetScroll=r,this.setScroll(this.scroll),this.reset(),this.preventNextNativeScrollEvent(),this.emit(),l==null||l(this),this.userData={},requestAnimationFrame(()=>{this.dispatchScrollendEvent()});return}u||(this.targetScroll=r),typeof i=="number"&&typeof s!="function"?s=Xp:typeof s=="function"&&typeof i!="number"&&(i=1),this.animate.fromTo(this.animatedScroll,r,{duration:i,easing:s,lerp:o,onStart:()=>{n&&(this.isLocked=!0),this.isScrolling="smooth",a==null||a(this)},onUpdate:(f,h)=>{this.isScrolling="smooth",this.lastVelocity=this.velocity,this.velocity=f-this.animatedScroll,this.direction=Math.sign(this.velocity),this.animatedScroll=f,this.setScroll(this.scroll),u&&(this.targetScroll=f),h||this.emit(),h&&(this.reset(),this.emit(),l==null||l(this),this.userData={},requestAnimationFrame(()=>{this.dispatchScrollendEvent()}),this.preventNextNativeScrollEvent())}})}}}preventNextNativeScrollEvent(){this._preventNextNativeScrollEvent=!0,requestAnimationFrame(()=>{this._preventNextNativeScrollEvent=!1})}checkNestedScroll(r,{deltaX:e,deltaY:t}){const n=Date.now(),i=r._lenis??(r._lenis={});let s,o,a,l,c,u,d,f;const h=this.options.gestureOrientation;if(n-(i.time??0)>2e3){i.time=Date.now();const E=window.getComputedStyle(r);i.computedStyle=E;const M=E.overflowX,T=E.overflowY;if(s=["auto","overlay","scroll"].includes(M),o=["auto","overlay","scroll"].includes(T),i.hasOverflowX=s,i.hasOverflowY=o,!s&&!o||h==="vertical"&&!o||h==="horizontal"&&!s)return!1;c=r.scrollWidth,u=r.scrollHeight,d=r.clientWidth,f=r.clientHeight,a=c>d,l=u>f,i.isScrollableX=a,i.isScrollableY=l,i.scrollWidth=c,i.scrollHeight=u,i.clientWidth=d,i.clientHeight=f}else a=i.isScrollableX,l=i.isScrollableY,s=i.hasOverflowX,o=i.hasOverflowY,c=i.scrollWidth,u=i.scrollHeight,d=i.clientWidth,f=i.clientHeight;if(!s&&!o||!a&&!l||h==="vertical"&&(!o||!l)||h==="horizontal"&&(!s||!a))return!1;let _;if(h==="horizontal")_="x";else if(h==="vertical")_="y";else{const E=e!==0,M=t!==0;E&&s&&a&&(_="x"),M&&o&&l&&(_="y")}if(!_)return!1;let g,m,p,b,x;if(_==="x")g=r.scrollLeft,m=c-d,p=e,b=s,x=a;else if(_==="y")g=r.scrollTop,m=u-f,p=t,b=o,x=l;else return!1;return(p>0?g<m:g>0)&&b&&x}get rootElement(){return this.options.wrapper===window?document.documentElement:this.options.wrapper}get limit(){return this.options.__experimental__naiveDimensions?this.isHorizontal?this.rootElement.scrollWidth-this.rootElement.clientWidth:this.rootElement.scrollHeight-this.rootElement.clientHeight:this.dimensions.limit[this.isHorizontal?"x":"y"]}get isHorizontal(){return this.options.orientation==="horizontal"}get actualScroll(){const r=this.options.wrapper;return this.isHorizontal?r.scrollX??r.scrollLeft:r.scrollY??r.scrollTop}get scroll(){return this.options.infinite?Rv(this.animatedScroll,this.limit):this.animatedScroll}get progress(){return this.limit===0?1:this.scroll/this.limit}get isScrolling(){return this._isScrolling}set isScrolling(r){this._isScrolling!==r&&(this._isScrolling=r,this.updateClassName())}get isStopped(){return this._isStopped}set isStopped(r){this._isStopped!==r&&(this._isStopped=r,this.updateClassName())}get isLocked(){return this._isLocked}set isLocked(r){this._isLocked!==r&&(this._isLocked=r,this.updateClassName())}get isSmooth(){return this.isScrolling==="smooth"}get className(){let r="lenis";return this.options.autoToggle&&(r+=" lenis-autoToggle"),this.isStopped&&(r+=" lenis-stopped"),this.isLocked&&(r+=" lenis-locked"),this.isScrolling&&(r+=" lenis-scrolling"),this.isScrolling==="smooth"&&(r+=" lenis-smooth"),r}updateClassName(){this.cleanUpClassName(),this.rootElement.className=`${this.rootElement.className} ${this.className}`.trim()}cleanUpClassName(){this.rootElement.className=this.rootElement.className.replace(/lenis(-\w+)?/g,"").trim()}};/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Wh="181",Nv=0,qp=1,Fv=2,Dg=1,Uv=2,Hr=3,ts=0,_i=1,Wi=2,Jr=0,As=1,xu=2,Yp=3,$p=4,kv=5,ro=100,Bv=101,zv=102,Vv=103,Hv=104,Gv=200,Wv=201,Xv=202,qv=203,df=204,ff=205,Yv=206,$v=207,jv=208,Kv=209,Zv=210,Jv=211,Qv=212,ey=213,ty=214,hf=0,pf=1,mf=2,ya=3,gf=4,_f=5,xf=6,vf=7,Ig=0,ny=1,iy=2,Cs=0,ry=1,sy=2,oy=3,ay=4,ly=5,cy=6,uy=7,jp="attached",dy="detached",Og=300,ba=301,wa=302,yf=303,bf=304,Gu=306,Sa=1e3,wr=1001,vu=1002,hi=1003,Ng=1004,al=1005,jn=1006,tu=1007,Yr=1008,Pr=1009,Fg=1010,Ug=1011,Bl=1012,Xh=1013,bo=1014,sr=1015,Fa=1016,qh=1017,Yh=1018,zl=1020,kg=35902,Bg=35899,zg=1021,Vg=1022,Xi=1023,Vl=1026,Hl=1027,$h=1028,jh=1029,Kh=1030,Zh=1031,Jh=1033,nu=33776,iu=33777,ru=33778,su=33779,wf=35840,Sf=35841,Mf=35842,Tf=35843,Ef=36196,Af=37492,Cf=37496,Rf=37808,Pf=37809,Lf=37810,Df=37811,If=37812,Of=37813,Nf=37814,Ff=37815,Uf=37816,kf=37817,Bf=37818,zf=37819,Vf=37820,Hf=37821,Gf=36492,Wf=36494,Xf=36495,qf=36283,Yf=36284,$f=36285,jf=36286,Gl=2300,Wl=2301,sd=2302,Kp=2400,Zp=2401,Jp=2402,fy=2500,hy=0,Hg=1,Kf=2,py=3200,my=3201,Gg=0,gy=1,_s="",Mn="srgb",Zn="srgb-linear",yu="linear",Kt="srgb",Oo=7680,Qp=519,_y=512,xy=513,vy=514,Wg=515,yy=516,by=517,wy=518,Sy=519,Zf=35044,em="300 es",Sr=2e3,bu=2001;function Xg(r){for(let e=r.length-1;e>=0;--e)if(r[e]>=65535)return!0;return!1}function Xl(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function My(){const r=Xl("canvas");return r.style.display="block",r}const tm={};function wu(...r){const e="THREE."+r.shift();console.log(e,...r)}function st(...r){const e="THREE."+r.shift();console.warn(e,...r)}function Rt(...r){const e="THREE."+r.shift();console.error(e,...r)}function ql(...r){const e=r.join(" ");e in tm||(tm[e]=!0,st(...r))}function Ty(r,e,t){return new Promise(function(n,i){function s(){switch(r.clientWaitSync(e,r.SYNC_FLUSH_COMMANDS_BIT,0)){case r.WAIT_FAILED:i();break;case r.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:n()}}setTimeout(s,t)})}class Ua{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){const n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){const n=this._listeners;if(n===void 0)return;const i=n[e];if(i!==void 0){const s=i.indexOf(t);s!==-1&&i.splice(s,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const n=t[e.type];if(n!==void 0){e.target=this;const i=n.slice(0);for(let s=0,o=i.length;s<o;s++)i[s].call(this,e);e.target=null}}}const Gn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let nm=1234567;const yl=Math.PI/180,Ma=180/Math.PI;function or(){const r=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Gn[r&255]+Gn[r>>8&255]+Gn[r>>16&255]+Gn[r>>24&255]+"-"+Gn[e&255]+Gn[e>>8&255]+"-"+Gn[e>>16&15|64]+Gn[e>>24&255]+"-"+Gn[t&63|128]+Gn[t>>8&255]+"-"+Gn[t>>16&255]+Gn[t>>24&255]+Gn[n&255]+Gn[n>>8&255]+Gn[n>>16&255]+Gn[n>>24&255]).toLowerCase()}function Pt(r,e,t){return Math.max(e,Math.min(t,r))}function Qh(r,e){return(r%e+e)%e}function Ey(r,e,t,n,i){return n+(r-e)*(i-n)/(t-e)}function Ay(r,e,t){return r!==e?(t-r)/(e-r):0}function bl(r,e,t){return(1-t)*r+t*e}function Cy(r,e,t,n){return bl(r,e,1-Math.exp(-t*n))}function Ry(r,e=1){return e-Math.abs(Qh(r,e*2)-e)}function Py(r,e,t){return r<=e?0:r>=t?1:(r=(r-e)/(t-e),r*r*(3-2*r))}function Ly(r,e,t){return r<=e?0:r>=t?1:(r=(r-e)/(t-e),r*r*r*(r*(r*6-15)+10))}function Dy(r,e){return r+Math.floor(Math.random()*(e-r+1))}function Iy(r,e){return r+Math.random()*(e-r)}function Oy(r){return r*(.5-Math.random())}function Ny(r){r!==void 0&&(nm=r);let e=nm+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Fy(r){return r*yl}function Uy(r){return r*Ma}function ky(r){return(r&r-1)===0&&r!==0}function By(r){return Math.pow(2,Math.ceil(Math.log(r)/Math.LN2))}function zy(r){return Math.pow(2,Math.floor(Math.log(r)/Math.LN2))}function Vy(r,e,t,n,i){const s=Math.cos,o=Math.sin,a=s(t/2),l=o(t/2),c=s((e+n)/2),u=o((e+n)/2),d=s((e-n)/2),f=o((e-n)/2),h=s((n-e)/2),_=o((n-e)/2);switch(i){case"XYX":r.set(a*u,l*d,l*f,a*c);break;case"YZY":r.set(l*f,a*u,l*d,a*c);break;case"ZXZ":r.set(l*d,l*f,a*u,a*c);break;case"XZX":r.set(a*u,l*_,l*h,a*c);break;case"YXY":r.set(l*h,a*u,l*_,a*c);break;case"ZYZ":r.set(l*_,l*h,a*u,a*c);break;default:st("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function nr(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return r/4294967295;case Uint16Array:return r/65535;case Uint8Array:return r/255;case Int32Array:return Math.max(r/2147483647,-1);case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:throw new Error("Invalid component type.")}}function Yt(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return Math.round(r*4294967295);case Uint16Array:return Math.round(r*65535);case Uint8Array:return Math.round(r*255);case Int32Array:return Math.round(r*2147483647);case Int16Array:return Math.round(r*32767);case Int8Array:return Math.round(r*127);default:throw new Error("Invalid component type.")}}const Hy={DEG2RAD:yl,RAD2DEG:Ma,generateUUID:or,clamp:Pt,euclideanModulo:Qh,mapLinear:Ey,inverseLerp:Ay,lerp:bl,damp:Cy,pingpong:Ry,smoothstep:Py,smootherstep:Ly,randInt:Dy,randFloat:Iy,randFloatSpread:Oy,seededRandom:Ny,degToRad:Fy,radToDeg:Uy,isPowerOfTwo:ky,ceilPowerOfTwo:By,floorPowerOfTwo:zy,setQuaternionFromProperEuler:Vy,normalize:Yt,denormalize:nr};class Et{constructor(e=0,t=0){Et.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6],this.y=i[1]*t+i[4]*n+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Pt(this.x,e.x,t.x),this.y=Pt(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=Pt(this.x,e,t),this.y=Pt(this.y,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Pt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Pt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),i=Math.sin(t),s=this.x-e.x,o=this.y-e.y;return this.x=s*n-o*i+e.x,this.y=s*i+o*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class ks{constructor(e=0,t=0,n=0,i=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=i}static slerpFlat(e,t,n,i,s,o,a){let l=n[i+0],c=n[i+1],u=n[i+2],d=n[i+3],f=s[o+0],h=s[o+1],_=s[o+2],g=s[o+3];if(a<=0){e[t+0]=l,e[t+1]=c,e[t+2]=u,e[t+3]=d;return}if(a>=1){e[t+0]=f,e[t+1]=h,e[t+2]=_,e[t+3]=g;return}if(d!==g||l!==f||c!==h||u!==_){let m=l*f+c*h+u*_+d*g;m<0&&(f=-f,h=-h,_=-_,g=-g,m=-m);let p=1-a;if(m<.9995){const b=Math.acos(m),x=Math.sin(b);p=Math.sin(p*b)/x,a=Math.sin(a*b)/x,l=l*p+f*a,c=c*p+h*a,u=u*p+_*a,d=d*p+g*a}else{l=l*p+f*a,c=c*p+h*a,u=u*p+_*a,d=d*p+g*a;const b=1/Math.sqrt(l*l+c*c+u*u+d*d);l*=b,c*=b,u*=b,d*=b}}e[t]=l,e[t+1]=c,e[t+2]=u,e[t+3]=d}static multiplyQuaternionsFlat(e,t,n,i,s,o){const a=n[i],l=n[i+1],c=n[i+2],u=n[i+3],d=s[o],f=s[o+1],h=s[o+2],_=s[o+3];return e[t]=a*_+u*d+l*h-c*f,e[t+1]=l*_+u*f+c*d-a*h,e[t+2]=c*_+u*h+a*f-l*d,e[t+3]=u*_-a*d-l*f-c*h,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,i=e._y,s=e._z,o=e._order,a=Math.cos,l=Math.sin,c=a(n/2),u=a(i/2),d=a(s/2),f=l(n/2),h=l(i/2),_=l(s/2);switch(o){case"XYZ":this._x=f*u*d+c*h*_,this._y=c*h*d-f*u*_,this._z=c*u*_+f*h*d,this._w=c*u*d-f*h*_;break;case"YXZ":this._x=f*u*d+c*h*_,this._y=c*h*d-f*u*_,this._z=c*u*_-f*h*d,this._w=c*u*d+f*h*_;break;case"ZXY":this._x=f*u*d-c*h*_,this._y=c*h*d+f*u*_,this._z=c*u*_+f*h*d,this._w=c*u*d-f*h*_;break;case"ZYX":this._x=f*u*d-c*h*_,this._y=c*h*d+f*u*_,this._z=c*u*_-f*h*d,this._w=c*u*d+f*h*_;break;case"YZX":this._x=f*u*d+c*h*_,this._y=c*h*d+f*u*_,this._z=c*u*_-f*h*d,this._w=c*u*d-f*h*_;break;case"XZY":this._x=f*u*d-c*h*_,this._y=c*h*d-f*u*_,this._z=c*u*_+f*h*d,this._w=c*u*d+f*h*_;break;default:st("Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,i=Math.sin(n);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],i=t[4],s=t[8],o=t[1],a=t[5],l=t[9],c=t[2],u=t[6],d=t[10],f=n+a+d;if(f>0){const h=.5/Math.sqrt(f+1);this._w=.25/h,this._x=(u-l)*h,this._y=(s-c)*h,this._z=(o-i)*h}else if(n>a&&n>d){const h=2*Math.sqrt(1+n-a-d);this._w=(u-l)/h,this._x=.25*h,this._y=(i+o)/h,this._z=(s+c)/h}else if(a>d){const h=2*Math.sqrt(1+a-n-d);this._w=(s-c)/h,this._x=(i+o)/h,this._y=.25*h,this._z=(l+u)/h}else{const h=2*Math.sqrt(1+d-n-a);this._w=(o-i)/h,this._x=(s+c)/h,this._y=(l+u)/h,this._z=.25*h}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Pt(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const i=Math.min(1,t/n);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,i=e._y,s=e._z,o=e._w,a=t._x,l=t._y,c=t._z,u=t._w;return this._x=n*u+o*a+i*c-s*l,this._y=i*u+o*l+s*a-n*c,this._z=s*u+o*c+n*l-i*a,this._w=o*u-n*a-i*l-s*c,this._onChangeCallback(),this}slerp(e,t){if(t<=0)return this;if(t>=1)return this.copy(e);let n=e._x,i=e._y,s=e._z,o=e._w,a=this.dot(e);a<0&&(n=-n,i=-i,s=-s,o=-o,a=-a);let l=1-t;if(a<.9995){const c=Math.acos(a),u=Math.sin(c);l=Math.sin(l*c)/u,t=Math.sin(t*c)/u,this._x=this._x*l+n*t,this._y=this._y*l+i*t,this._z=this._z*l+s*t,this._w=this._w*l+o*t,this._onChangeCallback()}else this._x=this._x*l+n*t,this._y=this._y*l+i*t,this._z=this._z*l+s*t,this._w=this._w*l+o*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(i*Math.sin(e),i*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class ${constructor(e=0,t=0,n=0){$.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(im.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(im.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6]*i,this.y=s[1]*t+s[4]*n+s[7]*i,this.z=s[2]*t+s[5]*n+s[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,s=e.elements,o=1/(s[3]*t+s[7]*n+s[11]*i+s[15]);return this.x=(s[0]*t+s[4]*n+s[8]*i+s[12])*o,this.y=(s[1]*t+s[5]*n+s[9]*i+s[13])*o,this.z=(s[2]*t+s[6]*n+s[10]*i+s[14])*o,this}applyQuaternion(e){const t=this.x,n=this.y,i=this.z,s=e.x,o=e.y,a=e.z,l=e.w,c=2*(o*i-a*n),u=2*(a*t-s*i),d=2*(s*n-o*t);return this.x=t+l*c+o*d-a*u,this.y=n+l*u+a*c-s*d,this.z=i+l*d+s*u-o*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*i,this.y=s[1]*t+s[5]*n+s[9]*i,this.z=s[2]*t+s[6]*n+s[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Pt(this.x,e.x,t.x),this.y=Pt(this.y,e.y,t.y),this.z=Pt(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=Pt(this.x,e,t),this.y=Pt(this.y,e,t),this.z=Pt(this.z,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Pt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,i=e.y,s=e.z,o=t.x,a=t.y,l=t.z;return this.x=i*l-s*a,this.y=s*o-n*l,this.z=n*a-i*o,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return od.copy(this).projectOnVector(e),this.sub(od)}reflect(e){return this.sub(od.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Pt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,i=this.z-e.z;return t*t+n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const i=Math.sin(t)*e;return this.x=i*Math.sin(n),this.y=Math.cos(t)*e,this.z=i*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const od=new $,im=new ks;class xt{constructor(e,t,n,i,s,o,a,l,c){xt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,i,s,o,a,l,c)}set(e,t,n,i,s,o,a,l,c){const u=this.elements;return u[0]=e,u[1]=i,u[2]=a,u[3]=t,u[4]=s,u[5]=l,u[6]=n,u[7]=o,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,s=this.elements,o=n[0],a=n[3],l=n[6],c=n[1],u=n[4],d=n[7],f=n[2],h=n[5],_=n[8],g=i[0],m=i[3],p=i[6],b=i[1],x=i[4],v=i[7],E=i[2],M=i[5],T=i[8];return s[0]=o*g+a*b+l*E,s[3]=o*m+a*x+l*M,s[6]=o*p+a*v+l*T,s[1]=c*g+u*b+d*E,s[4]=c*m+u*x+d*M,s[7]=c*p+u*v+d*T,s[2]=f*g+h*b+_*E,s[5]=f*m+h*x+_*M,s[8]=f*p+h*v+_*T,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8];return t*o*u-t*a*c-n*s*u+n*a*l+i*s*c-i*o*l}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8],d=u*o-a*c,f=a*l-u*s,h=c*s-o*l,_=t*d+n*f+i*h;if(_===0)return this.set(0,0,0,0,0,0,0,0,0);const g=1/_;return e[0]=d*g,e[1]=(i*c-u*n)*g,e[2]=(a*n-i*o)*g,e[3]=f*g,e[4]=(u*t-i*l)*g,e[5]=(i*s-a*t)*g,e[6]=h*g,e[7]=(n*l-c*t)*g,e[8]=(o*t-n*s)*g,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,i,s,o,a){const l=Math.cos(s),c=Math.sin(s);return this.set(n*l,n*c,-n*(l*o+c*a)+o+e,-i*c,i*l,-i*(-c*o+l*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(ad.makeScale(e,t)),this}rotate(e){return this.premultiply(ad.makeRotation(-e)),this}translate(e,t){return this.premultiply(ad.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<9;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const ad=new xt,rm=new xt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),sm=new xt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Gy(){const r={enabled:!0,workingColorSpace:Zn,spaces:{},convert:function(i,s,o){return this.enabled===!1||s===o||!s||!o||(this.spaces[s].transfer===Kt&&(i.r=Qr(i.r),i.g=Qr(i.g),i.b=Qr(i.b)),this.spaces[s].primaries!==this.spaces[o].primaries&&(i.applyMatrix3(this.spaces[s].toXYZ),i.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===Kt&&(i.r=ca(i.r),i.g=ca(i.g),i.b=ca(i.b))),i},workingToColorSpace:function(i,s){return this.convert(i,this.workingColorSpace,s)},colorSpaceToWorking:function(i,s){return this.convert(i,s,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===_s?yu:this.spaces[i].transfer},getToneMappingMode:function(i){return this.spaces[i].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(i,s=this.workingColorSpace){return i.fromArray(this.spaces[s].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,s,o){return i.copy(this.spaces[s].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(i,s){return ql("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),r.workingToColorSpace(i,s)},toWorkingColorSpace:function(i,s){return ql("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),r.colorSpaceToWorking(i,s)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return r.define({[Zn]:{primaries:e,whitePoint:n,transfer:yu,toXYZ:rm,fromXYZ:sm,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Mn},outputColorSpaceConfig:{drawingBufferColorSpace:Mn}},[Mn]:{primaries:e,whitePoint:n,transfer:Kt,toXYZ:rm,fromXYZ:sm,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Mn}}}),r}const It=Gy();function Qr(r){return r<.04045?r*.0773993808:Math.pow(r*.9478672986+.0521327014,2.4)}function ca(r){return r<.0031308?r*12.92:1.055*Math.pow(r,.41666)-.055}let No;class Wy{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{No===void 0&&(No=Xl("canvas")),No.width=e.width,No.height=e.height;const i=No.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),n=No}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Xl("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const i=n.getImageData(0,0,e.width,e.height),s=i.data;for(let o=0;o<s.length;o++)s[o]=Qr(s[o]/255)*255;return n.putImageData(i,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Qr(t[n]/255)*255):t[n]=Qr(t[n]);return{data:t,width:e.width,height:e.height}}else return st("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Xy=0;class ep{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Xy++}),this.uuid=or(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):t instanceof VideoFrame?e.set(t.displayHeight,t.displayWidth,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let s;if(Array.isArray(i)){s=[];for(let o=0,a=i.length;o<a;o++)i[o].isDataTexture?s.push(ld(i[o].image)):s.push(ld(i[o]))}else s=ld(i);n.url=s}return t||(e.images[this.uuid]=n),n}}function ld(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?Wy.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(st("Texture: Unable to serialize Texture."),{})}let qy=0;const cd=new $;class Rn extends Ua{constructor(e=Rn.DEFAULT_IMAGE,t=Rn.DEFAULT_MAPPING,n=wr,i=wr,s=jn,o=Yr,a=Xi,l=Pr,c=Rn.DEFAULT_ANISOTROPY,u=_s){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:qy++}),this.uuid=or(),this.name="",this.source=new ep(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=s,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new Et(0,0),this.repeat=new Et(1,1),this.center=new Et(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new xt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(cd).x}get height(){return this.source.getSize(cd).y}get depth(){return this.source.getSize(cd).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const n=e[t];if(n===void 0){st(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const i=this[t];if(i===void 0){st(`Texture.setValues(): property '${t}' does not exist.`);continue}i&&n&&i.isVector2&&n.isVector2||i&&n&&i.isVector3&&n.isVector3||i&&n&&i.isMatrix3&&n.isMatrix3?i.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Og)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Sa:e.x=e.x-Math.floor(e.x);break;case wr:e.x=e.x<0?0:1;break;case vu:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Sa:e.y=e.y-Math.floor(e.y);break;case wr:e.y=e.y<0?0:1;break;case vu:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Rn.DEFAULT_IMAGE=null;Rn.DEFAULT_MAPPING=Og;Rn.DEFAULT_ANISOTROPY=1;class zt{constructor(e=0,t=0,n=0,i=1){zt.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,i){return this.x=e,this.y=t,this.z=n,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,s=this.w,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*i+o[12]*s,this.y=o[1]*t+o[5]*n+o[9]*i+o[13]*s,this.z=o[2]*t+o[6]*n+o[10]*i+o[14]*s,this.w=o[3]*t+o[7]*n+o[11]*i+o[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,i,s;const l=e.elements,c=l[0],u=l[4],d=l[8],f=l[1],h=l[5],_=l[9],g=l[2],m=l[6],p=l[10];if(Math.abs(u-f)<.01&&Math.abs(d-g)<.01&&Math.abs(_-m)<.01){if(Math.abs(u+f)<.1&&Math.abs(d+g)<.1&&Math.abs(_+m)<.1&&Math.abs(c+h+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const x=(c+1)/2,v=(h+1)/2,E=(p+1)/2,M=(u+f)/4,T=(d+g)/4,R=(_+m)/4;return x>v&&x>E?x<.01?(n=0,i=.707106781,s=.707106781):(n=Math.sqrt(x),i=M/n,s=T/n):v>E?v<.01?(n=.707106781,i=0,s=.707106781):(i=Math.sqrt(v),n=M/i,s=R/i):E<.01?(n=.707106781,i=.707106781,s=0):(s=Math.sqrt(E),n=T/s,i=R/s),this.set(n,i,s,t),this}let b=Math.sqrt((m-_)*(m-_)+(d-g)*(d-g)+(f-u)*(f-u));return Math.abs(b)<.001&&(b=1),this.x=(m-_)/b,this.y=(d-g)/b,this.z=(f-u)/b,this.w=Math.acos((c+h+p-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Pt(this.x,e.x,t.x),this.y=Pt(this.y,e.y,t.y),this.z=Pt(this.z,e.z,t.z),this.w=Pt(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=Pt(this.x,e,t),this.y=Pt(this.y,e,t),this.z=Pt(this.z,e,t),this.w=Pt(this.w,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Pt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Yy extends Ua{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:jn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new zt(0,0,e,t),this.scissorTest=!1,this.viewport=new zt(0,0,e,t);const i={width:e,height:t,depth:n.depth},s=new Rn(i);this.textures=[];const o=n.count;for(let a=0;a<o;a++)this.textures[a]=s.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(e={}){const t={minFilter:jn,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let i=0,s=this.textures.length;i<s;i++)this.textures[i].image.width=e,this.textures[i].image.height=t,this.textures[i].image.depth=n,this.textures[i].isData3DTexture!==!0&&(this.textures[i].isArrayTexture=this.textures[i].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const i=Object.assign({},e.textures[t].image);this.textures[t].source=new ep(i)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Is extends Yy{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class qg extends Rn{constructor(e=null,t=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=hi,this.minFilter=hi,this.wrapR=wr,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class $y extends Rn{constructor(e=null,t=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=hi,this.minFilter=hi,this.wrapR=wr,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class lr{constructor(e=new $(1/0,1/0,1/0),t=new $(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Ji.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Ji.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=Ji.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const s=n.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=s.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,Ji):Ji.fromBufferAttribute(s,o),Ji.applyMatrix4(e.matrixWorld),this.expandByPoint(Ji);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),uc.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),uc.copy(n.boundingBox)),uc.applyMatrix4(e.matrixWorld),this.union(uc)}const i=e.children;for(let s=0,o=i.length;s<o;s++)this.expandByObject(i[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Ji),Ji.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Ha),dc.subVectors(this.max,Ha),Fo.subVectors(e.a,Ha),Uo.subVectors(e.b,Ha),ko.subVectors(e.c,Ha),ls.subVectors(Uo,Fo),cs.subVectors(ko,Uo),Gs.subVectors(Fo,ko);let t=[0,-ls.z,ls.y,0,-cs.z,cs.y,0,-Gs.z,Gs.y,ls.z,0,-ls.x,cs.z,0,-cs.x,Gs.z,0,-Gs.x,-ls.y,ls.x,0,-cs.y,cs.x,0,-Gs.y,Gs.x,0];return!ud(t,Fo,Uo,ko,dc)||(t=[1,0,0,0,1,0,0,0,1],!ud(t,Fo,Uo,ko,dc))?!1:(fc.crossVectors(ls,cs),t=[fc.x,fc.y,fc.z],ud(t,Fo,Uo,ko,dc))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Ji).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Ji).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Or[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Or[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Or[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Or[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Or[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Or[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Or[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Or[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Or),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const Or=[new $,new $,new $,new $,new $,new $,new $,new $],Ji=new $,uc=new lr,Fo=new $,Uo=new $,ko=new $,ls=new $,cs=new $,Gs=new $,Ha=new $,dc=new $,fc=new $,Ws=new $;function ud(r,e,t,n,i){for(let s=0,o=r.length-3;s<=o;s+=3){Ws.fromArray(r,s);const a=i.x*Math.abs(Ws.x)+i.y*Math.abs(Ws.y)+i.z*Math.abs(Ws.z),l=e.dot(Ws),c=t.dot(Ws),u=n.dot(Ws);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>a)return!1}return!0}const jy=new lr,Ga=new $,dd=new $;class Ir{constructor(e=new $,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):jy.setFromPoints(e).getCenter(n);let i=0;for(let s=0,o=e.length;s<o;s++)i=Math.max(i,n.distanceToSquared(e[s]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Ga.subVectors(e,this.center);const t=Ga.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),i=(n-this.radius)*.5;this.center.addScaledVector(Ga,i/n),this.radius+=i}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(dd.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Ga.copy(e.center).add(dd)),this.expandByPoint(Ga.copy(e.center).sub(dd))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}const Nr=new $,fd=new $,hc=new $,us=new $,hd=new $,pc=new $,pd=new $;class Wu{constructor(e=new $,t=new $(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Nr)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Nr.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Nr.copy(this.origin).addScaledVector(this.direction,t),Nr.distanceToSquared(e))}distanceSqToSegment(e,t,n,i){fd.copy(e).add(t).multiplyScalar(.5),hc.copy(t).sub(e).normalize(),us.copy(this.origin).sub(fd);const s=e.distanceTo(t)*.5,o=-this.direction.dot(hc),a=us.dot(this.direction),l=-us.dot(hc),c=us.lengthSq(),u=Math.abs(1-o*o);let d,f,h,_;if(u>0)if(d=o*l-a,f=o*a-l,_=s*u,d>=0)if(f>=-_)if(f<=_){const g=1/u;d*=g,f*=g,h=d*(d+o*f+2*a)+f*(o*d+f+2*l)+c}else f=s,d=Math.max(0,-(o*f+a)),h=-d*d+f*(f+2*l)+c;else f=-s,d=Math.max(0,-(o*f+a)),h=-d*d+f*(f+2*l)+c;else f<=-_?(d=Math.max(0,-(-o*s+a)),f=d>0?-s:Math.min(Math.max(-s,-l),s),h=-d*d+f*(f+2*l)+c):f<=_?(d=0,f=Math.min(Math.max(-s,-l),s),h=f*(f+2*l)+c):(d=Math.max(0,-(o*s+a)),f=d>0?s:Math.min(Math.max(-s,-l),s),h=-d*d+f*(f+2*l)+c);else f=o>0?-s:s,d=Math.max(0,-(o*f+a)),h=-d*d+f*(f+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,d),i&&i.copy(fd).addScaledVector(hc,f),h}intersectSphere(e,t){Nr.subVectors(e.center,this.origin);const n=Nr.dot(this.direction),i=Nr.dot(Nr)-n*n,s=e.radius*e.radius;if(i>s)return null;const o=Math.sqrt(s-i),a=n-o,l=n+o;return l<0?null:a<0?this.at(l,t):this.at(a,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,i,s,o,a,l;const c=1/this.direction.x,u=1/this.direction.y,d=1/this.direction.z,f=this.origin;return c>=0?(n=(e.min.x-f.x)*c,i=(e.max.x-f.x)*c):(n=(e.max.x-f.x)*c,i=(e.min.x-f.x)*c),u>=0?(s=(e.min.y-f.y)*u,o=(e.max.y-f.y)*u):(s=(e.max.y-f.y)*u,o=(e.min.y-f.y)*u),n>o||s>i||((s>n||isNaN(n))&&(n=s),(o<i||isNaN(i))&&(i=o),d>=0?(a=(e.min.z-f.z)*d,l=(e.max.z-f.z)*d):(a=(e.max.z-f.z)*d,l=(e.min.z-f.z)*d),n>l||a>i)||((a>n||n!==n)&&(n=a),(l<i||i!==i)&&(i=l),i<0)?null:this.at(n>=0?n:i,t)}intersectsBox(e){return this.intersectBox(e,Nr)!==null}intersectTriangle(e,t,n,i,s){hd.subVectors(t,e),pc.subVectors(n,e),pd.crossVectors(hd,pc);let o=this.direction.dot(pd),a;if(o>0){if(i)return null;a=1}else if(o<0)a=-1,o=-o;else return null;us.subVectors(this.origin,e);const l=a*this.direction.dot(pc.crossVectors(us,pc));if(l<0)return null;const c=a*this.direction.dot(hd.cross(us));if(c<0||l+c>o)return null;const u=-a*us.dot(pd);return u<0?null:this.at(u/o,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class yt{constructor(e,t,n,i,s,o,a,l,c,u,d,f,h,_,g,m){yt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,i,s,o,a,l,c,u,d,f,h,_,g,m)}set(e,t,n,i,s,o,a,l,c,u,d,f,h,_,g,m){const p=this.elements;return p[0]=e,p[4]=t,p[8]=n,p[12]=i,p[1]=s,p[5]=o,p[9]=a,p[13]=l,p[2]=c,p[6]=u,p[10]=d,p[14]=f,p[3]=h,p[7]=_,p[11]=g,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new yt().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,i=1/Bo.setFromMatrixColumn(e,0).length(),s=1/Bo.setFromMatrixColumn(e,1).length(),o=1/Bo.setFromMatrixColumn(e,2).length();return t[0]=n[0]*i,t[1]=n[1]*i,t[2]=n[2]*i,t[3]=0,t[4]=n[4]*s,t[5]=n[5]*s,t[6]=n[6]*s,t[7]=0,t[8]=n[8]*o,t[9]=n[9]*o,t[10]=n[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,i=e.y,s=e.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(i),c=Math.sin(i),u=Math.cos(s),d=Math.sin(s);if(e.order==="XYZ"){const f=o*u,h=o*d,_=a*u,g=a*d;t[0]=l*u,t[4]=-l*d,t[8]=c,t[1]=h+_*c,t[5]=f-g*c,t[9]=-a*l,t[2]=g-f*c,t[6]=_+h*c,t[10]=o*l}else if(e.order==="YXZ"){const f=l*u,h=l*d,_=c*u,g=c*d;t[0]=f+g*a,t[4]=_*a-h,t[8]=o*c,t[1]=o*d,t[5]=o*u,t[9]=-a,t[2]=h*a-_,t[6]=g+f*a,t[10]=o*l}else if(e.order==="ZXY"){const f=l*u,h=l*d,_=c*u,g=c*d;t[0]=f-g*a,t[4]=-o*d,t[8]=_+h*a,t[1]=h+_*a,t[5]=o*u,t[9]=g-f*a,t[2]=-o*c,t[6]=a,t[10]=o*l}else if(e.order==="ZYX"){const f=o*u,h=o*d,_=a*u,g=a*d;t[0]=l*u,t[4]=_*c-h,t[8]=f*c+g,t[1]=l*d,t[5]=g*c+f,t[9]=h*c-_,t[2]=-c,t[6]=a*l,t[10]=o*l}else if(e.order==="YZX"){const f=o*l,h=o*c,_=a*l,g=a*c;t[0]=l*u,t[4]=g-f*d,t[8]=_*d+h,t[1]=d,t[5]=o*u,t[9]=-a*u,t[2]=-c*u,t[6]=h*d+_,t[10]=f-g*d}else if(e.order==="XZY"){const f=o*l,h=o*c,_=a*l,g=a*c;t[0]=l*u,t[4]=-d,t[8]=c*u,t[1]=f*d+g,t[5]=o*u,t[9]=h*d-_,t[2]=_*d-h,t[6]=a*u,t[10]=g*d+f}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Ky,e,Zy)}lookAt(e,t,n){const i=this.elements;return Mi.subVectors(e,t),Mi.lengthSq()===0&&(Mi.z=1),Mi.normalize(),ds.crossVectors(n,Mi),ds.lengthSq()===0&&(Math.abs(n.z)===1?Mi.x+=1e-4:Mi.z+=1e-4,Mi.normalize(),ds.crossVectors(n,Mi)),ds.normalize(),mc.crossVectors(Mi,ds),i[0]=ds.x,i[4]=mc.x,i[8]=Mi.x,i[1]=ds.y,i[5]=mc.y,i[9]=Mi.y,i[2]=ds.z,i[6]=mc.z,i[10]=Mi.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,s=this.elements,o=n[0],a=n[4],l=n[8],c=n[12],u=n[1],d=n[5],f=n[9],h=n[13],_=n[2],g=n[6],m=n[10],p=n[14],b=n[3],x=n[7],v=n[11],E=n[15],M=i[0],T=i[4],R=i[8],w=i[12],y=i[1],D=i[5],N=i[9],V=i[13],j=i[2],k=i[6],G=i[10],Y=i[14],F=i[3],ae=i[7],O=i[11],he=i[15];return s[0]=o*M+a*y+l*j+c*F,s[4]=o*T+a*D+l*k+c*ae,s[8]=o*R+a*N+l*G+c*O,s[12]=o*w+a*V+l*Y+c*he,s[1]=u*M+d*y+f*j+h*F,s[5]=u*T+d*D+f*k+h*ae,s[9]=u*R+d*N+f*G+h*O,s[13]=u*w+d*V+f*Y+h*he,s[2]=_*M+g*y+m*j+p*F,s[6]=_*T+g*D+m*k+p*ae,s[10]=_*R+g*N+m*G+p*O,s[14]=_*w+g*V+m*Y+p*he,s[3]=b*M+x*y+v*j+E*F,s[7]=b*T+x*D+v*k+E*ae,s[11]=b*R+x*N+v*G+E*O,s[15]=b*w+x*V+v*Y+E*he,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],i=e[8],s=e[12],o=e[1],a=e[5],l=e[9],c=e[13],u=e[2],d=e[6],f=e[10],h=e[14],_=e[3],g=e[7],m=e[11],p=e[15];return _*(+s*l*d-i*c*d-s*a*f+n*c*f+i*a*h-n*l*h)+g*(+t*l*h-t*c*f+s*o*f-i*o*h+i*c*u-s*l*u)+m*(+t*c*d-t*a*h-s*o*d+n*o*h+s*a*u-n*c*u)+p*(-i*a*u-t*l*d+t*a*f+i*o*d-n*o*f+n*l*u)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8],d=e[9],f=e[10],h=e[11],_=e[12],g=e[13],m=e[14],p=e[15],b=d*m*c-g*f*c+g*l*h-a*m*h-d*l*p+a*f*p,x=_*f*c-u*m*c-_*l*h+o*m*h+u*l*p-o*f*p,v=u*g*c-_*d*c+_*a*h-o*g*h-u*a*p+o*d*p,E=_*d*l-u*g*l-_*a*f+o*g*f+u*a*m-o*d*m,M=t*b+n*x+i*v+s*E;if(M===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const T=1/M;return e[0]=b*T,e[1]=(g*f*s-d*m*s-g*i*h+n*m*h+d*i*p-n*f*p)*T,e[2]=(a*m*s-g*l*s+g*i*c-n*m*c-a*i*p+n*l*p)*T,e[3]=(d*l*s-a*f*s-d*i*c+n*f*c+a*i*h-n*l*h)*T,e[4]=x*T,e[5]=(u*m*s-_*f*s+_*i*h-t*m*h-u*i*p+t*f*p)*T,e[6]=(_*l*s-o*m*s-_*i*c+t*m*c+o*i*p-t*l*p)*T,e[7]=(o*f*s-u*l*s+u*i*c-t*f*c-o*i*h+t*l*h)*T,e[8]=v*T,e[9]=(_*d*s-u*g*s-_*n*h+t*g*h+u*n*p-t*d*p)*T,e[10]=(o*g*s-_*a*s+_*n*c-t*g*c-o*n*p+t*a*p)*T,e[11]=(u*a*s-o*d*s-u*n*c+t*d*c+o*n*h-t*a*h)*T,e[12]=E*T,e[13]=(u*g*i-_*d*i+_*n*f-t*g*f-u*n*m+t*d*m)*T,e[14]=(_*a*i-o*g*i-_*n*l+t*g*l+o*n*m-t*a*m)*T,e[15]=(o*d*i-u*a*i+u*n*l-t*d*l-o*n*f+t*a*f)*T,this}scale(e){const t=this.elements,n=e.x,i=e.y,s=e.z;return t[0]*=n,t[4]*=i,t[8]*=s,t[1]*=n,t[5]*=i,t[9]*=s,t[2]*=n,t[6]*=i,t[10]*=s,t[3]*=n,t[7]*=i,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,i))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),i=Math.sin(t),s=1-n,o=e.x,a=e.y,l=e.z,c=s*o,u=s*a;return this.set(c*o+n,c*a-i*l,c*l+i*a,0,c*a+i*l,u*a+n,u*l-i*o,0,c*l-i*a,u*l+i*o,s*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,i,s,o){return this.set(1,n,s,0,e,1,o,0,t,i,1,0,0,0,0,1),this}compose(e,t,n){const i=this.elements,s=t._x,o=t._y,a=t._z,l=t._w,c=s+s,u=o+o,d=a+a,f=s*c,h=s*u,_=s*d,g=o*u,m=o*d,p=a*d,b=l*c,x=l*u,v=l*d,E=n.x,M=n.y,T=n.z;return i[0]=(1-(g+p))*E,i[1]=(h+v)*E,i[2]=(_-x)*E,i[3]=0,i[4]=(h-v)*M,i[5]=(1-(f+p))*M,i[6]=(m+b)*M,i[7]=0,i[8]=(_+x)*T,i[9]=(m-b)*T,i[10]=(1-(f+g))*T,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,n){const i=this.elements;let s=Bo.set(i[0],i[1],i[2]).length();const o=Bo.set(i[4],i[5],i[6]).length(),a=Bo.set(i[8],i[9],i[10]).length();this.determinant()<0&&(s=-s),e.x=i[12],e.y=i[13],e.z=i[14],Qi.copy(this);const c=1/s,u=1/o,d=1/a;return Qi.elements[0]*=c,Qi.elements[1]*=c,Qi.elements[2]*=c,Qi.elements[4]*=u,Qi.elements[5]*=u,Qi.elements[6]*=u,Qi.elements[8]*=d,Qi.elements[9]*=d,Qi.elements[10]*=d,t.setFromRotationMatrix(Qi),n.x=s,n.y=o,n.z=a,this}makePerspective(e,t,n,i,s,o,a=Sr,l=!1){const c=this.elements,u=2*s/(t-e),d=2*s/(n-i),f=(t+e)/(t-e),h=(n+i)/(n-i);let _,g;if(l)_=s/(o-s),g=o*s/(o-s);else if(a===Sr)_=-(o+s)/(o-s),g=-2*o*s/(o-s);else if(a===bu)_=-o/(o-s),g=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=u,c[4]=0,c[8]=f,c[12]=0,c[1]=0,c[5]=d,c[9]=h,c[13]=0,c[2]=0,c[6]=0,c[10]=_,c[14]=g,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,i,s,o,a=Sr,l=!1){const c=this.elements,u=2/(t-e),d=2/(n-i),f=-(t+e)/(t-e),h=-(n+i)/(n-i);let _,g;if(l)_=1/(o-s),g=o/(o-s);else if(a===Sr)_=-2/(o-s),g=-(o+s)/(o-s);else if(a===bu)_=-1/(o-s),g=-s/(o-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=u,c[4]=0,c[8]=0,c[12]=f,c[1]=0,c[5]=d,c[9]=0,c[13]=h,c[2]=0,c[6]=0,c[10]=_,c[14]=g,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<16;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const Bo=new $,Qi=new yt,Ky=new $(0,0,0),Zy=new $(1,1,1),ds=new $,mc=new $,Mi=new $,om=new yt,am=new ks;class Lr{constructor(e=0,t=0,n=0,i=Lr.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,i=this._order){return this._x=e,this._y=t,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const i=e.elements,s=i[0],o=i[4],a=i[8],l=i[1],c=i[5],u=i[9],d=i[2],f=i[6],h=i[10];switch(t){case"XYZ":this._y=Math.asin(Pt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,h),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(f,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Pt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,h),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,s),this._z=0);break;case"ZXY":this._x=Math.asin(Pt(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-d,h),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-Pt(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(f,h),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(Pt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-d,s)):(this._x=0,this._y=Math.atan2(a,h));break;case"XZY":this._z=Math.asin(-Pt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(f,c),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-u,h),this._y=0);break;default:st("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return om.makeRotationFromQuaternion(e),this.setFromRotationMatrix(om,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return am.setFromEuler(this),this.setFromQuaternion(am,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Lr.DEFAULT_ORDER="XYZ";class Yg{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Jy=0;const lm=new $,zo=new ks,Fr=new yt,gc=new $,Wa=new $,Qy=new $,eb=new ks,cm=new $(1,0,0),um=new $(0,1,0),dm=new $(0,0,1),fm={type:"added"},tb={type:"removed"},Vo={type:"childadded",child:null},md={type:"childremoved",child:null};class un extends Ua{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Jy++}),this.uuid=or(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=un.DEFAULT_UP.clone();const e=new $,t=new Lr,n=new ks,i=new $(1,1,1);function s(){n.setFromEuler(t,!1)}function o(){t.setFromQuaternion(n,void 0,!1)}t._onChange(s),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new yt},normalMatrix:{value:new xt}}),this.matrix=new yt,this.matrixWorld=new yt,this.matrixAutoUpdate=un.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=un.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Yg,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return zo.setFromAxisAngle(e,t),this.quaternion.multiply(zo),this}rotateOnWorldAxis(e,t){return zo.setFromAxisAngle(e,t),this.quaternion.premultiply(zo),this}rotateX(e){return this.rotateOnAxis(cm,e)}rotateY(e){return this.rotateOnAxis(um,e)}rotateZ(e){return this.rotateOnAxis(dm,e)}translateOnAxis(e,t){return lm.copy(e).applyQuaternion(this.quaternion),this.position.add(lm.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(cm,e)}translateY(e){return this.translateOnAxis(um,e)}translateZ(e){return this.translateOnAxis(dm,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Fr.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?gc.copy(e):gc.set(e,t,n);const i=this.parent;this.updateWorldMatrix(!0,!1),Wa.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Fr.lookAt(Wa,gc,this.up):Fr.lookAt(gc,Wa,this.up),this.quaternion.setFromRotationMatrix(Fr),i&&(Fr.extractRotation(i.matrixWorld),zo.setFromRotationMatrix(Fr),this.quaternion.premultiply(zo.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(Rt("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(fm),Vo.child=e,this.dispatchEvent(Vo),Vo.child=null):Rt("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(tb),md.child=e,this.dispatchEvent(md),md.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Fr.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Fr.multiply(e.parent.matrixWorld)),e.applyMatrix4(Fr),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(fm),Vo.child=e,this.dispatchEvent(Vo),Vo.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,i=this.children.length;n<i;n++){const o=this.children[n].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const i=this.children;for(let s=0,o=i.length;s<o;s++)i[s].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Wa,e,Qy),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Wa,eb,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const i=this.children;for(let s=0,o=i.length;s<o;s++)i[s].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),i.instanceInfo=this._instanceInfo.map(a=>({...a})),i.availableInstanceIds=this._availableInstanceIds.slice(),i.availableGeometryIds=this._availableGeometryIds.slice(),i.nextIndexStart=this._nextIndexStart,i.nextVertexStart=this._nextVertexStart,i.geometryCount=this._geometryCount,i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.matricesTexture=this._matricesTexture.toJSON(e),i.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(i.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(i.boundingBox=this.boundingBox.toJSON()));function s(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=s(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const d=l[c];s(e.shapes,d)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(s(e.materials,this.material[l]));i.material=a}else i.material=s(e.materials,this.material);if(this.children.length>0){i.children=[];for(let a=0;a<this.children.length;a++)i.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];i.animations.push(s(e.animations,l))}}if(t){const a=o(e.geometries),l=o(e.materials),c=o(e.textures),u=o(e.images),d=o(e.shapes),f=o(e.skeletons),h=o(e.animations),_=o(e.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),u.length>0&&(n.images=u),d.length>0&&(n.shapes=d),f.length>0&&(n.skeletons=f),h.length>0&&(n.animations=h),_.length>0&&(n.nodes=_)}return n.object=i,n;function o(a){const l=[];for(const c in a){const u=a[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const i=e.children[n];this.add(i.clone())}return this}}un.DEFAULT_UP=new $(0,1,0);un.DEFAULT_MATRIX_AUTO_UPDATE=!0;un.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const er=new $,Ur=new $,gd=new $,kr=new $,Ho=new $,Go=new $,hm=new $,_d=new $,xd=new $,vd=new $,yd=new zt,bd=new zt,wd=new zt;class ir{constructor(e=new $,t=new $,n=new $){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,i){i.subVectors(n,t),er.subVectors(e,t),i.cross(er);const s=i.lengthSq();return s>0?i.multiplyScalar(1/Math.sqrt(s)):i.set(0,0,0)}static getBarycoord(e,t,n,i,s){er.subVectors(i,t),Ur.subVectors(n,t),gd.subVectors(e,t);const o=er.dot(er),a=er.dot(Ur),l=er.dot(gd),c=Ur.dot(Ur),u=Ur.dot(gd),d=o*c-a*a;if(d===0)return s.set(0,0,0),null;const f=1/d,h=(c*l-a*u)*f,_=(o*u-a*l)*f;return s.set(1-h-_,_,h)}static containsPoint(e,t,n,i){return this.getBarycoord(e,t,n,i,kr)===null?!1:kr.x>=0&&kr.y>=0&&kr.x+kr.y<=1}static getInterpolation(e,t,n,i,s,o,a,l){return this.getBarycoord(e,t,n,i,kr)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,kr.x),l.addScaledVector(o,kr.y),l.addScaledVector(a,kr.z),l)}static getInterpolatedAttribute(e,t,n,i,s,o){return yd.setScalar(0),bd.setScalar(0),wd.setScalar(0),yd.fromBufferAttribute(e,t),bd.fromBufferAttribute(e,n),wd.fromBufferAttribute(e,i),o.setScalar(0),o.addScaledVector(yd,s.x),o.addScaledVector(bd,s.y),o.addScaledVector(wd,s.z),o}static isFrontFacing(e,t,n,i){return er.subVectors(n,t),Ur.subVectors(e,t),er.cross(Ur).dot(i)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,i){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,t,n,i){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return er.subVectors(this.c,this.b),Ur.subVectors(this.a,this.b),er.cross(Ur).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return ir.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return ir.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,i,s){return ir.getInterpolation(e,this.a,this.b,this.c,t,n,i,s)}containsPoint(e){return ir.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return ir.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,i=this.b,s=this.c;let o,a;Ho.subVectors(i,n),Go.subVectors(s,n),_d.subVectors(e,n);const l=Ho.dot(_d),c=Go.dot(_d);if(l<=0&&c<=0)return t.copy(n);xd.subVectors(e,i);const u=Ho.dot(xd),d=Go.dot(xd);if(u>=0&&d<=u)return t.copy(i);const f=l*d-u*c;if(f<=0&&l>=0&&u<=0)return o=l/(l-u),t.copy(n).addScaledVector(Ho,o);vd.subVectors(e,s);const h=Ho.dot(vd),_=Go.dot(vd);if(_>=0&&h<=_)return t.copy(s);const g=h*c-l*_;if(g<=0&&c>=0&&_<=0)return a=c/(c-_),t.copy(n).addScaledVector(Go,a);const m=u*_-h*d;if(m<=0&&d-u>=0&&h-_>=0)return hm.subVectors(s,i),a=(d-u)/(d-u+(h-_)),t.copy(i).addScaledVector(hm,a);const p=1/(m+g+f);return o=g*p,a=f*p,t.copy(n).addScaledVector(Ho,o).addScaledVector(Go,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const $g={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},fs={h:0,s:0,l:0},_c={h:0,s:0,l:0};function Sd(r,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?r+(e-r)*6*t:t<1/2?e:t<2/3?r+(e-r)*6*(2/3-t):r}let $e=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const i=e;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Mn){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,It.colorSpaceToWorking(this,t),this}setRGB(e,t,n,i=It.workingColorSpace){return this.r=e,this.g=t,this.b=n,It.colorSpaceToWorking(this,i),this}setHSL(e,t,n,i=It.workingColorSpace){if(e=Qh(e,1),t=Pt(t,0,1),n=Pt(n,0,1),t===0)this.r=this.g=this.b=n;else{const s=n<=.5?n*(1+t):n+t-n*t,o=2*n-s;this.r=Sd(o,s,e+1/3),this.g=Sd(o,s,e),this.b=Sd(o,s,e-1/3)}return It.colorSpaceToWorking(this,i),this}setStyle(e,t=Mn){function n(s){s!==void 0&&parseFloat(s)<1&&st("Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const o=i[1],a=i[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:st("Color: Unknown color model "+e)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=i[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(s,16),t);st("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Mn){const n=$g[e.toLowerCase()];return n!==void 0?this.setHex(n,t):st("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Qr(e.r),this.g=Qr(e.g),this.b=Qr(e.b),this}copyLinearToSRGB(e){return this.r=ca(e.r),this.g=ca(e.g),this.b=ca(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Mn){return It.workingToColorSpace(Wn.copy(this),e),Math.round(Pt(Wn.r*255,0,255))*65536+Math.round(Pt(Wn.g*255,0,255))*256+Math.round(Pt(Wn.b*255,0,255))}getHexString(e=Mn){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=It.workingColorSpace){It.workingToColorSpace(Wn.copy(this),t);const n=Wn.r,i=Wn.g,s=Wn.b,o=Math.max(n,i,s),a=Math.min(n,i,s);let l,c;const u=(a+o)/2;if(a===o)l=0,c=0;else{const d=o-a;switch(c=u<=.5?d/(o+a):d/(2-o-a),o){case n:l=(i-s)/d+(i<s?6:0);break;case i:l=(s-n)/d+2;break;case s:l=(n-i)/d+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,t=It.workingColorSpace){return It.workingToColorSpace(Wn.copy(this),t),e.r=Wn.r,e.g=Wn.g,e.b=Wn.b,e}getStyle(e=Mn){It.workingToColorSpace(Wn.copy(this),e);const t=Wn.r,n=Wn.g,i=Wn.b;return e!==Mn?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(e,t,n){return this.getHSL(fs),this.setHSL(fs.h+e,fs.s+t,fs.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(fs),e.getHSL(_c);const n=bl(fs.h,_c.h,t),i=bl(fs.s,_c.s,t),s=bl(fs.l,_c.l,t);return this.setHSL(n,i,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,i=this.b,s=e.elements;return this.r=s[0]*t+s[3]*n+s[6]*i,this.g=s[1]*t+s[4]*n+s[7]*i,this.b=s[2]*t+s[5]*n+s[8]*i,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}};const Wn=new $e;$e.NAMES=$g;let nb=0;class Ar extends Ua{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:nb++}),this.uuid=or(),this.name="",this.type="Material",this.blending=As,this.side=ts,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=df,this.blendDst=ff,this.blendEquation=ro,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new $e(0,0,0),this.blendAlpha=0,this.depthFunc=ya,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Qp,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Oo,this.stencilZFail=Oo,this.stencilZPass=Oo,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){st(`Material: parameter '${t}' has value of undefined.`);continue}const i=this[t];if(i===void 0){st(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==As&&(n.blending=this.blending),this.side!==ts&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==df&&(n.blendSrc=this.blendSrc),this.blendDst!==ff&&(n.blendDst=this.blendDst),this.blendEquation!==ro&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==ya&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Qp&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Oo&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Oo&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Oo&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(s){const o=[];for(const a in s){const l=s[a];delete l.metadata,o.push(l)}return o}if(t){const s=i(e.textures),o=i(e.images);s.length>0&&(n.textures=s),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const i=t.length;n=new Array(i);for(let s=0;s!==i;++s)n[s]=t[s].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class oo extends Ar{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new $e(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Lr,this.combine=Ig,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const bn=new $,xc=new Et;let ib=0;class Jt{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:ib++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Zf,this.updateRanges=[],this.gpuType=sr,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let i=0,s=this.itemSize;i<s;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)xc.fromBufferAttribute(this,t),xc.applyMatrix3(e),this.setXY(t,xc.x,xc.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)bn.fromBufferAttribute(this,t),bn.applyMatrix3(e),this.setXYZ(t,bn.x,bn.y,bn.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)bn.fromBufferAttribute(this,t),bn.applyMatrix4(e),this.setXYZ(t,bn.x,bn.y,bn.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)bn.fromBufferAttribute(this,t),bn.applyNormalMatrix(e),this.setXYZ(t,bn.x,bn.y,bn.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)bn.fromBufferAttribute(this,t),bn.transformDirection(e),this.setXYZ(t,bn.x,bn.y,bn.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=nr(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Yt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=nr(t,this.array)),t}setX(e,t){return this.normalized&&(t=Yt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=nr(t,this.array)),t}setY(e,t){return this.normalized&&(t=Yt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=nr(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Yt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=nr(t,this.array)),t}setW(e,t){return this.normalized&&(t=Yt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Yt(t,this.array),n=Yt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=Yt(t,this.array),n=Yt(n,this.array),i=Yt(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this}setXYZW(e,t,n,i,s){return e*=this.itemSize,this.normalized&&(t=Yt(t,this.array),n=Yt(n,this.array),i=Yt(i,this.array),s=Yt(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Zf&&(e.usage=this.usage),e}}class jg extends Jt{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class Kg extends Jt{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class $i extends Jt{constructor(e,t,n){super(new Float32Array(e),t,n)}}let rb=0;const Ui=new yt,Md=new un,Wo=new $,Ti=new lr,Xa=new lr,On=new $;class pi extends Ua{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:rb++}),this.uuid=or(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Xg(e)?Kg:jg)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const s=new xt().getNormalMatrix(e);n.applyNormalMatrix(s),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Ui.makeRotationFromQuaternion(e),this.applyMatrix4(Ui),this}rotateX(e){return Ui.makeRotationX(e),this.applyMatrix4(Ui),this}rotateY(e){return Ui.makeRotationY(e),this.applyMatrix4(Ui),this}rotateZ(e){return Ui.makeRotationZ(e),this.applyMatrix4(Ui),this}translate(e,t,n){return Ui.makeTranslation(e,t,n),this.applyMatrix4(Ui),this}scale(e,t,n){return Ui.makeScale(e,t,n),this.applyMatrix4(Ui),this}lookAt(e){return Md.lookAt(e),Md.updateMatrix(),this.applyMatrix4(Md.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Wo).negate(),this.translate(Wo.x,Wo.y,Wo.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let i=0,s=e.length;i<s;i++){const o=e[i];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new $i(n,3))}else{const n=Math.min(e.length,t.count);for(let i=0;i<n;i++){const s=e[i];t.setXYZ(i,s.x,s.y,s.z||0)}e.length>t.count&&st("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new lr);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Rt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new $(-1/0,-1/0,-1/0),new $(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,i=t.length;n<i;n++){const s=t[n];Ti.setFromBufferAttribute(s),this.morphTargetsRelative?(On.addVectors(this.boundingBox.min,Ti.min),this.boundingBox.expandByPoint(On),On.addVectors(this.boundingBox.max,Ti.max),this.boundingBox.expandByPoint(On)):(this.boundingBox.expandByPoint(Ti.min),this.boundingBox.expandByPoint(Ti.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Rt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ir);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Rt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new $,1/0);return}if(e){const n=this.boundingSphere.center;if(Ti.setFromBufferAttribute(e),t)for(let s=0,o=t.length;s<o;s++){const a=t[s];Xa.setFromBufferAttribute(a),this.morphTargetsRelative?(On.addVectors(Ti.min,Xa.min),Ti.expandByPoint(On),On.addVectors(Ti.max,Xa.max),Ti.expandByPoint(On)):(Ti.expandByPoint(Xa.min),Ti.expandByPoint(Xa.max))}Ti.getCenter(n);let i=0;for(let s=0,o=e.count;s<o;s++)On.fromBufferAttribute(e,s),i=Math.max(i,n.distanceToSquared(On));if(t)for(let s=0,o=t.length;s<o;s++){const a=t[s],l=this.morphTargetsRelative;for(let c=0,u=a.count;c<u;c++)On.fromBufferAttribute(a,c),l&&(Wo.fromBufferAttribute(e,c),On.add(Wo)),i=Math.max(i,n.distanceToSquared(On))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&Rt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){Rt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,i=t.normal,s=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Jt(new Float32Array(4*n.count),4));const o=this.getAttribute("tangent"),a=[],l=[];for(let R=0;R<n.count;R++)a[R]=new $,l[R]=new $;const c=new $,u=new $,d=new $,f=new Et,h=new Et,_=new Et,g=new $,m=new $;function p(R,w,y){c.fromBufferAttribute(n,R),u.fromBufferAttribute(n,w),d.fromBufferAttribute(n,y),f.fromBufferAttribute(s,R),h.fromBufferAttribute(s,w),_.fromBufferAttribute(s,y),u.sub(c),d.sub(c),h.sub(f),_.sub(f);const D=1/(h.x*_.y-_.x*h.y);isFinite(D)&&(g.copy(u).multiplyScalar(_.y).addScaledVector(d,-h.y).multiplyScalar(D),m.copy(d).multiplyScalar(h.x).addScaledVector(u,-_.x).multiplyScalar(D),a[R].add(g),a[w].add(g),a[y].add(g),l[R].add(m),l[w].add(m),l[y].add(m))}let b=this.groups;b.length===0&&(b=[{start:0,count:e.count}]);for(let R=0,w=b.length;R<w;++R){const y=b[R],D=y.start,N=y.count;for(let V=D,j=D+N;V<j;V+=3)p(e.getX(V+0),e.getX(V+1),e.getX(V+2))}const x=new $,v=new $,E=new $,M=new $;function T(R){E.fromBufferAttribute(i,R),M.copy(E);const w=a[R];x.copy(w),x.sub(E.multiplyScalar(E.dot(w))).normalize(),v.crossVectors(M,w);const D=v.dot(l[R])<0?-1:1;o.setXYZW(R,x.x,x.y,x.z,D)}for(let R=0,w=b.length;R<w;++R){const y=b[R],D=y.start,N=y.count;for(let V=D,j=D+N;V<j;V+=3)T(e.getX(V+0)),T(e.getX(V+1)),T(e.getX(V+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Jt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let f=0,h=n.count;f<h;f++)n.setXYZ(f,0,0,0);const i=new $,s=new $,o=new $,a=new $,l=new $,c=new $,u=new $,d=new $;if(e)for(let f=0,h=e.count;f<h;f+=3){const _=e.getX(f+0),g=e.getX(f+1),m=e.getX(f+2);i.fromBufferAttribute(t,_),s.fromBufferAttribute(t,g),o.fromBufferAttribute(t,m),u.subVectors(o,s),d.subVectors(i,s),u.cross(d),a.fromBufferAttribute(n,_),l.fromBufferAttribute(n,g),c.fromBufferAttribute(n,m),a.add(u),l.add(u),c.add(u),n.setXYZ(_,a.x,a.y,a.z),n.setXYZ(g,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let f=0,h=t.count;f<h;f+=3)i.fromBufferAttribute(t,f+0),s.fromBufferAttribute(t,f+1),o.fromBufferAttribute(t,f+2),u.subVectors(o,s),d.subVectors(i,s),u.cross(d),n.setXYZ(f+0,u.x,u.y,u.z),n.setXYZ(f+1,u.x,u.y,u.z),n.setXYZ(f+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)On.fromBufferAttribute(e,t),On.normalize(),e.setXYZ(t,On.x,On.y,On.z)}toNonIndexed(){function e(a,l){const c=a.array,u=a.itemSize,d=a.normalized,f=new c.constructor(l.length*u);let h=0,_=0;for(let g=0,m=l.length;g<m;g++){a.isInterleavedBufferAttribute?h=l[g]*a.data.stride+a.offset:h=l[g]*u;for(let p=0;p<u;p++)f[_++]=c[h++]}return new Jt(f,u,d)}if(this.index===null)return st("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new pi,n=this.index.array,i=this.attributes;for(const a in i){const l=i[a],c=e(l,n);t.setAttribute(a,c)}const s=this.morphAttributes;for(const a in s){const l=[],c=s[a];for(let u=0,d=c.length;u<d;u++){const f=c[u],h=e(f,n);l.push(h)}t.morphAttributes[a]=l}t.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const l in n){const c=n[l];e.data.attributes[l]=c.toJSON(e.data)}const i={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let d=0,f=c.length;d<f;d++){const h=c[d];u.push(h.toJSON(e.data))}u.length>0&&(i[l]=u,s=!0)}s&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere=a.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone());const i=e.attributes;for(const c in i){const u=i[c];this.setAttribute(c,u.clone(t))}const s=e.morphAttributes;for(const c in s){const u=[],d=s[c];for(let f=0,h=d.length;f<h;f++)u.push(d[f].clone(t));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let c=0,u=o.length;c<u;c++){const d=o[c];this.addGroup(d.start,d.count,d.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const pm=new yt,Xs=new Wu,vc=new Ir,mm=new $,yc=new $,bc=new $,wc=new $,Td=new $,Sc=new $,gm=new $,Mc=new $;class Jn extends un{constructor(e=new pi,t=new oo){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=i.length;s<o;s++){const a=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(e,t){const n=this.geometry,i=n.attributes.position,s=n.morphAttributes.position,o=n.morphTargetsRelative;t.fromBufferAttribute(i,e);const a=this.morphTargetInfluences;if(s&&a){Sc.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const u=a[l],d=s[l];u!==0&&(Td.fromBufferAttribute(d,e),o?Sc.addScaledVector(Td,u):Sc.addScaledVector(Td.sub(t),u))}t.add(Sc)}return t}raycast(e,t){const n=this.geometry,i=this.material,s=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),vc.copy(n.boundingSphere),vc.applyMatrix4(s),Xs.copy(e.ray).recast(e.near),!(vc.containsPoint(Xs.origin)===!1&&(Xs.intersectSphere(vc,mm)===null||Xs.origin.distanceToSquared(mm)>(e.far-e.near)**2))&&(pm.copy(s).invert(),Xs.copy(e.ray).applyMatrix4(pm),!(n.boundingBox!==null&&Xs.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Xs)))}_computeIntersections(e,t,n){let i;const s=this.geometry,o=this.material,a=s.index,l=s.attributes.position,c=s.attributes.uv,u=s.attributes.uv1,d=s.attributes.normal,f=s.groups,h=s.drawRange;if(a!==null)if(Array.isArray(o))for(let _=0,g=f.length;_<g;_++){const m=f[_],p=o[m.materialIndex],b=Math.max(m.start,h.start),x=Math.min(a.count,Math.min(m.start+m.count,h.start+h.count));for(let v=b,E=x;v<E;v+=3){const M=a.getX(v),T=a.getX(v+1),R=a.getX(v+2);i=Tc(this,p,e,n,c,u,d,M,T,R),i&&(i.faceIndex=Math.floor(v/3),i.face.materialIndex=m.materialIndex,t.push(i))}}else{const _=Math.max(0,h.start),g=Math.min(a.count,h.start+h.count);for(let m=_,p=g;m<p;m+=3){const b=a.getX(m),x=a.getX(m+1),v=a.getX(m+2);i=Tc(this,o,e,n,c,u,d,b,x,v),i&&(i.faceIndex=Math.floor(m/3),t.push(i))}}else if(l!==void 0)if(Array.isArray(o))for(let _=0,g=f.length;_<g;_++){const m=f[_],p=o[m.materialIndex],b=Math.max(m.start,h.start),x=Math.min(l.count,Math.min(m.start+m.count,h.start+h.count));for(let v=b,E=x;v<E;v+=3){const M=v,T=v+1,R=v+2;i=Tc(this,p,e,n,c,u,d,M,T,R),i&&(i.faceIndex=Math.floor(v/3),i.face.materialIndex=m.materialIndex,t.push(i))}}else{const _=Math.max(0,h.start),g=Math.min(l.count,h.start+h.count);for(let m=_,p=g;m<p;m+=3){const b=m,x=m+1,v=m+2;i=Tc(this,o,e,n,c,u,d,b,x,v),i&&(i.faceIndex=Math.floor(m/3),t.push(i))}}}}function sb(r,e,t,n,i,s,o,a){let l;if(e.side===_i?l=n.intersectTriangle(o,s,i,!0,a):l=n.intersectTriangle(i,s,o,e.side===ts,a),l===null)return null;Mc.copy(a),Mc.applyMatrix4(r.matrixWorld);const c=t.ray.origin.distanceTo(Mc);return c<t.near||c>t.far?null:{distance:c,point:Mc.clone(),object:r}}function Tc(r,e,t,n,i,s,o,a,l,c){r.getVertexPosition(a,yc),r.getVertexPosition(l,bc),r.getVertexPosition(c,wc);const u=sb(r,e,t,n,yc,bc,wc,gm);if(u){const d=new $;ir.getBarycoord(gm,yc,bc,wc,d),i&&(u.uv=ir.getInterpolatedAttribute(i,a,l,c,d,new Et)),s&&(u.uv1=ir.getInterpolatedAttribute(s,a,l,c,d,new Et)),o&&(u.normal=ir.getInterpolatedAttribute(o,a,l,c,d,new $),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));const f={a,b:l,c,normal:new $,materialIndex:0};ir.getNormal(yc,bc,wc,f.normal),u.face=f,u.barycoord=d}return u}class sc extends pi{constructor(e=1,t=1,n=1,i=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:i,heightSegments:s,depthSegments:o};const a=this;i=Math.floor(i),s=Math.floor(s),o=Math.floor(o);const l=[],c=[],u=[],d=[];let f=0,h=0;_("z","y","x",-1,-1,n,t,e,o,s,0),_("z","y","x",1,-1,n,t,-e,o,s,1),_("x","z","y",1,1,e,n,t,i,o,2),_("x","z","y",1,-1,e,n,-t,i,o,3),_("x","y","z",1,-1,e,t,n,i,s,4),_("x","y","z",-1,-1,e,t,-n,i,s,5),this.setIndex(l),this.setAttribute("position",new $i(c,3)),this.setAttribute("normal",new $i(u,3)),this.setAttribute("uv",new $i(d,2));function _(g,m,p,b,x,v,E,M,T,R,w){const y=v/T,D=E/R,N=v/2,V=E/2,j=M/2,k=T+1,G=R+1;let Y=0,F=0;const ae=new $;for(let O=0;O<G;O++){const he=O*D-V;for(let P=0;P<k;P++){const Me=P*y-N;ae[g]=Me*b,ae[m]=he*x,ae[p]=j,c.push(ae.x,ae.y,ae.z),ae[g]=0,ae[m]=0,ae[p]=M>0?1:-1,u.push(ae.x,ae.y,ae.z),d.push(P/T),d.push(1-O/R),Y+=1}}for(let O=0;O<R;O++)for(let he=0;he<T;he++){const P=f+he+k*O,Me=f+he+k*(O+1),Ne=f+(he+1)+k*(O+1),ze=f+(he+1)+k*O;l.push(P,Me,ze),l.push(Me,Ne,ze),F+=6}a.addGroup(h,F,w),h+=F,f+=Y}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new sc(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Ta(r){const e={};for(const t in r){e[t]={};for(const n in r[t]){const i=r[t][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(st("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=i.clone():Array.isArray(i)?e[t][n]=i.slice():e[t][n]=i}}return e}function ri(r){const e={};for(let t=0;t<r.length;t++){const n=Ta(r[t]);for(const i in n)e[i]=n[i]}return e}function ob(r){const e=[];for(let t=0;t<r.length;t++)e.push(r[t].clone());return e}function Zg(r){const e=r.getRenderTarget();return e===null?r.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:It.workingColorSpace}const ab={clone:Ta,merge:ri};var lb=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,cb=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class fi extends Ar{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=lb,this.fragmentShader=cb,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Ta(e.uniforms),this.uniformsGroups=ob(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const i in this.uniforms){const o=this.uniforms[i].value;o&&o.isTexture?t.uniforms[i]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[i]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[i]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[i]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[i]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[i]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[i]={type:"m4",value:o.toArray()}:t.uniforms[i]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class tp extends un{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new yt,this.projectionMatrix=new yt,this.projectionMatrixInverse=new yt,this.coordinateSystem=Sr,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const hs=new $,_m=new Et,xm=new Et;class li extends tp{constructor(e=50,t=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Ma*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(yl*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Ma*2*Math.atan(Math.tan(yl*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){hs.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(hs.x,hs.y).multiplyScalar(-e/hs.z),hs.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(hs.x,hs.y).multiplyScalar(-e/hs.z)}getViewSize(e,t){return this.getViewBounds(e,_m,xm),t.subVectors(xm,_m)}setViewOffset(e,t,n,i,s,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(yl*.5*this.fov)/this.zoom,n=2*t,i=this.aspect*n,s=-.5*i;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;s+=o.offsetX*i/l,t-=o.offsetY*n/c,i*=o.width/l,n*=o.height/c}const a=this.filmOffset;a!==0&&(s+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+i,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const Xo=-90,qo=1;class ub extends un{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const i=new li(Xo,qo,e,t);i.layers=this.layers,this.add(i);const s=new li(Xo,qo,e,t);s.layers=this.layers,this.add(s);const o=new li(Xo,qo,e,t);o.layers=this.layers,this.add(o);const a=new li(Xo,qo,e,t);a.layers=this.layers,this.add(a);const l=new li(Xo,qo,e,t);l.layers=this.layers,this.add(l);const c=new li(Xo,qo,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,i,s,o,a,l]=t;for(const c of t)this.remove(c);if(e===Sr)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===bu)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,o,a,l,c,u]=this.children,d=e.getRenderTarget(),f=e.getActiveCubeFace(),h=e.getActiveMipmapLevel(),_=e.xr.enabled;e.xr.enabled=!1;const g=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,i),e.render(t,s),e.setRenderTarget(n,1,i),e.render(t,o),e.setRenderTarget(n,2,i),e.render(t,a),e.setRenderTarget(n,3,i),e.render(t,l),e.setRenderTarget(n,4,i),e.render(t,c),n.texture.generateMipmaps=g,e.setRenderTarget(n,5,i),e.render(t,u),e.setRenderTarget(d,f,h),e.xr.enabled=_,n.texture.needsPMREMUpdate=!0}}class Jg extends Rn{constructor(e=[],t=ba,n,i,s,o,a,l,c,u){super(e,t,n,i,s,o,a,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class db extends Is{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},i=[n,n,n,n,n,n];this.texture=new Jg(i),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},i=new sc(5,5,5),s=new fi({name:"CubemapFromEquirect",uniforms:Ta(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:_i,blending:Jr});s.uniforms.tEquirect.value=t;const o=new Jn(i,s),a=t.minFilter;return t.minFilter===Yr&&(t.minFilter=jn),new ub(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t=!0,n=!0,i=!0){const s=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,n,i);e.setRenderTarget(s)}}class $r extends un{constructor(){super(),this.isGroup=!0,this.type="Group"}}const fb={type:"move"};class Ed{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new $r,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new $r,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new $,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new $),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new $r,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new $,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new $),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let i=null,s=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){o=!0;for(const g of e.hand.values()){const m=t.getJointPose(g,n),p=this._getHandJoint(c,g);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const u=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],f=u.position.distanceTo(d.position),h=.02,_=.005;c.inputState.pinching&&f>h+_?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&f<=h-_&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,n),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(i=t.getPose(e.targetRaySpace,n),i===null&&s!==null&&(i=s),i!==null&&(a.matrix.fromArray(i.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,i.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(i.linearVelocity)):a.hasLinearVelocity=!1,i.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(i.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(fb)))}return a!==null&&(a.visible=i!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new $r;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}class Su extends un{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Lr,this.environmentIntensity=1,this.environmentRotation=new Lr,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class Qg{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Zf,this.updateRanges=[],this.version=0,this.uuid=or()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let i=0,s=this.stride;i<s;i++)this.array[e+i]=t.array[n+i];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=or()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=or()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const ti=new $;class Xu{constructor(e,t,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)ti.fromBufferAttribute(this,t),ti.applyMatrix4(e),this.setXYZ(t,ti.x,ti.y,ti.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)ti.fromBufferAttribute(this,t),ti.applyNormalMatrix(e),this.setXYZ(t,ti.x,ti.y,ti.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)ti.fromBufferAttribute(this,t),ti.transformDirection(e),this.setXYZ(t,ti.x,ti.y,ti.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=nr(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Yt(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=Yt(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=Yt(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=Yt(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=Yt(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=nr(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=nr(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=nr(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=nr(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=Yt(t,this.array),n=Yt(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=Yt(t,this.array),n=Yt(n,this.array),i=Yt(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this}setXYZW(e,t,n,i,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=Yt(t,this.array),n=Yt(n,this.array),i=Yt(i,this.array),s=Yt(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this.data.array[e+3]=s,this}clone(e){if(e===void 0){wu("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[i+s])}return new Jt(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new Xu(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){wu("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[i+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}const vm=new $,ym=new zt,bm=new zt,hb=new $,wm=new yt,Ec=new $,Ad=new Ir,Sm=new yt,Cd=new Wu;class pb extends Jn{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=jp,this.bindMatrix=new yt,this.bindMatrixInverse=new yt,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){const e=this.geometry;this.boundingBox===null&&(this.boundingBox=new lr),this.boundingBox.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Ec),this.boundingBox.expandByPoint(Ec)}computeBoundingSphere(){const e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new Ir),this.boundingSphere.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Ec),this.boundingSphere.expandByPoint(Ec)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){const n=this.material,i=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Ad.copy(this.boundingSphere),Ad.applyMatrix4(i),e.ray.intersectsSphere(Ad)!==!1&&(Sm.copy(i).invert(),Cd.copy(e.ray).applyMatrix4(Sm),!(this.boundingBox!==null&&Cd.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,Cd)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const e=new zt,t=this.geometry.attributes.skinWeight;for(let n=0,i=t.count;n<i;n++){e.fromBufferAttribute(t,n);const s=1/e.manhattanLength();s!==1/0?e.multiplyScalar(s):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===jp?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===dy?this.bindMatrixInverse.copy(this.bindMatrix).invert():st("SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){const n=this.skeleton,i=this.geometry;ym.fromBufferAttribute(i.attributes.skinIndex,e),bm.fromBufferAttribute(i.attributes.skinWeight,e),vm.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let s=0;s<4;s++){const o=bm.getComponent(s);if(o!==0){const a=ym.getComponent(s);wm.multiplyMatrices(n.bones[a].matrixWorld,n.boneInverses[a]),t.addScaledVector(hb.copy(vm).applyMatrix4(wm),o)}}return t.applyMatrix4(this.bindMatrixInverse)}}class e_ extends un{constructor(){super(),this.isBone=!0,this.type="Bone"}}class np extends Rn{constructor(e=null,t=1,n=1,i,s,o,a,l,c=hi,u=hi,d,f){super(null,o,a,l,c,u,i,s,d,f),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Mm=new yt,mb=new yt;class ip{constructor(e=[],t=[]){this.uuid=or(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){const e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){st("Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,i=this.bones.length;n<i;n++)this.boneInverses.push(new yt)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){const n=new yt;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){const e=this.bones,t=this.boneInverses,n=this.boneMatrices,i=this.boneTexture;for(let s=0,o=e.length;s<o;s++){const a=e[s]?e[s].matrixWorld:mb;Mm.multiplyMatrices(a,t[s]),Mm.toArray(n,s*16)}i!==null&&(i.needsUpdate=!0)}clone(){return new ip(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);const t=new Float32Array(e*e*4);t.set(this.boneMatrices);const n=new np(t,e,e,Xi,sr);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){const i=this.bones[t];if(i.name===e)return i}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,i=e.bones.length;n<i;n++){const s=e.bones[n];let o=t[s];o===void 0&&(st("Skeleton: No bone found with UUID:",s),o=new e_),this.bones.push(o),this.boneInverses.push(new yt().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){const e={metadata:{version:4.7,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;const t=this.bones,n=this.boneInverses;for(let i=0,s=t.length;i<s;i++){const o=t[i];e.bones.push(o.uuid);const a=n[i];e.boneInverses.push(a.toArray())}return e}}class Jf extends Jt{constructor(e,t,n,i=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const Yo=new yt,Tm=new yt,Ac=[],Em=new lr,gb=new yt,qa=new Jn,Ya=new Ir;class t_ extends Jn{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Jf(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,gb)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new lr),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Yo),Em.copy(e.boundingBox).applyMatrix4(Yo),this.boundingBox.union(Em)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Ir),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Yo),Ya.copy(e.boundingSphere).applyMatrix4(Yo),this.boundingSphere.union(Ya)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const n=t.morphTargetInfluences,i=this.morphTexture.source.data.data,s=n.length+1,o=e*s+1;for(let a=0;a<n.length;a++)n[a]=i[o+a]}raycast(e,t){const n=this.matrixWorld,i=this.count;if(qa.geometry=this.geometry,qa.material=this.material,qa.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Ya.copy(this.boundingSphere),Ya.applyMatrix4(n),e.ray.intersectsSphere(Ya)!==!1))for(let s=0;s<i;s++){this.getMatrixAt(s,Yo),Tm.multiplyMatrices(n,Yo),qa.matrixWorld=Tm,qa.raycast(e,Ac);for(let o=0,a=Ac.length;o<a;o++){const l=Ac[o];l.instanceId=s,l.object=this,t.push(l)}Ac.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new Jf(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){const n=t.morphTargetInfluences,i=n.length+1;this.morphTexture===null&&(this.morphTexture=new np(new Float32Array(i*this.count),i,this.count,$h,sr));const s=this.morphTexture.source.data.data;let o=0;for(let c=0;c<n.length;c++)o+=n[c];const a=this.geometry.morphTargetsRelative?1:1-o,l=i*e;s[l]=a,s.set(n,l+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const Rd=new $,_b=new $,xb=new xt;class Qs{constructor(e=new $(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,i){return this.normal.set(e,t,n),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const i=Rd.subVectors(n,t).cross(_b.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(Rd),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/i;return s<0||s>1?null:t.copy(e.start).addScaledVector(n,s)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||xb.getNormalMatrix(e),i=this.coplanarPoint(Rd).applyMatrix4(e),s=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const qs=new Ir,vb=new Et(.5,.5),Cc=new $;class rp{constructor(e=new Qs,t=new Qs,n=new Qs,i=new Qs,s=new Qs,o=new Qs){this.planes=[e,t,n,i,s,o]}set(e,t,n,i,s,o){const a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(n),a[3].copy(i),a[4].copy(s),a[5].copy(o),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Sr,n=!1){const i=this.planes,s=e.elements,o=s[0],a=s[1],l=s[2],c=s[3],u=s[4],d=s[5],f=s[6],h=s[7],_=s[8],g=s[9],m=s[10],p=s[11],b=s[12],x=s[13],v=s[14],E=s[15];if(i[0].setComponents(c-o,h-u,p-_,E-b).normalize(),i[1].setComponents(c+o,h+u,p+_,E+b).normalize(),i[2].setComponents(c+a,h+d,p+g,E+x).normalize(),i[3].setComponents(c-a,h-d,p-g,E-x).normalize(),n)i[4].setComponents(l,f,m,v).normalize(),i[5].setComponents(c-l,h-f,p-m,E-v).normalize();else if(i[4].setComponents(c-l,h-f,p-m,E-v).normalize(),t===Sr)i[5].setComponents(c+l,h+f,p+m,E+v).normalize();else if(t===bu)i[5].setComponents(l,f,m,v).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),qs.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),qs.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(qs)}intersectsSprite(e){qs.center.set(0,0,0);const t=vb.distanceTo(e.center);return qs.radius=.7071067811865476+t,qs.applyMatrix4(e.matrixWorld),this.intersectsSphere(qs)}intersectsSphere(e){const t=this.planes,n=e.center,i=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(n)<i)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const i=t[n];if(Cc.x=i.normal.x>0?e.max.x:e.min.x,Cc.y=i.normal.y>0?e.max.y:e.min.y,Cc.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint(Cc)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class n_ extends Ar{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new $e(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Mu=new $,Tu=new $,Am=new yt,$a=new Wu,Rc=new Ir,Pd=new $,Cm=new $;class sp extends un{constructor(e=new pi,t=new n_){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let i=1,s=t.count;i<s;i++)Mu.fromBufferAttribute(t,i-1),Tu.fromBufferAttribute(t,i),n[i]=n[i-1],n[i]+=Mu.distanceTo(Tu);e.setAttribute("lineDistance",new $i(n,1))}else st("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,s=e.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Rc.copy(n.boundingSphere),Rc.applyMatrix4(i),Rc.radius+=s,e.ray.intersectsSphere(Rc)===!1)return;Am.copy(i).invert(),$a.copy(e.ray).applyMatrix4(Am);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=this.isLineSegments?2:1,u=n.index,f=n.attributes.position;if(u!==null){const h=Math.max(0,o.start),_=Math.min(u.count,o.start+o.count);for(let g=h,m=_-1;g<m;g+=c){const p=u.getX(g),b=u.getX(g+1),x=Pc(this,e,$a,l,p,b,g);x&&t.push(x)}if(this.isLineLoop){const g=u.getX(_-1),m=u.getX(h),p=Pc(this,e,$a,l,g,m,_-1);p&&t.push(p)}}else{const h=Math.max(0,o.start),_=Math.min(f.count,o.start+o.count);for(let g=h,m=_-1;g<m;g+=c){const p=Pc(this,e,$a,l,g,g+1,g);p&&t.push(p)}if(this.isLineLoop){const g=Pc(this,e,$a,l,_-1,h,_-1);g&&t.push(g)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=i.length;s<o;s++){const a=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}function Pc(r,e,t,n,i,s,o){const a=r.geometry.attributes.position;if(Mu.fromBufferAttribute(a,i),Tu.fromBufferAttribute(a,s),t.distanceSqToSegment(Mu,Tu,Pd,Cm)>n)return;Pd.applyMatrix4(r.matrixWorld);const c=e.ray.origin.distanceTo(Pd);if(!(c<e.near||c>e.far))return{distance:c,point:Cm.clone().applyMatrix4(r.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:r}}const Rm=new $,Pm=new $;class yb extends sp{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[];for(let i=0,s=t.count;i<s;i+=2)Rm.fromBufferAttribute(t,i),Pm.fromBufferAttribute(t,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+Rm.distanceTo(Pm);e.setAttribute("lineDistance",new $i(n,1))}else st("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class bb extends sp{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}}class i_ extends Ar{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new $e(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const Lm=new yt,Qf=new Wu,Lc=new Ir,Dc=new $;class eh extends un{constructor(e=new pi,t=new i_){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,s=e.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Lc.copy(n.boundingSphere),Lc.applyMatrix4(i),Lc.radius+=s,e.ray.intersectsSphere(Lc)===!1)return;Lm.copy(i).invert(),Qf.copy(e.ray).applyMatrix4(Lm);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=n.index,d=n.attributes.position;if(c!==null){const f=Math.max(0,o.start),h=Math.min(c.count,o.start+o.count);for(let _=f,g=h;_<g;_++){const m=c.getX(_);Dc.fromBufferAttribute(d,m),Dm(Dc,m,l,i,e,t,this)}}else{const f=Math.max(0,o.start),h=Math.min(d.count,o.start+o.count);for(let _=f,g=h;_<g;_++)Dc.fromBufferAttribute(d,_),Dm(Dc,_,l,i,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=i.length;s<o;s++){const a=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}function Dm(r,e,t,n,i,s,o){const a=Qf.distanceSqToPoint(r);if(a<t){const l=new $;Qf.closestPointToPoint(r,l),l.applyMatrix4(n);const c=i.ray.origin.distanceTo(l);if(c<i.near||c>i.far)return;s.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:o})}}class r_ extends Rn{constructor(e,t,n=bo,i,s,o,a=hi,l=hi,c,u=Vl,d=1){if(u!==Vl&&u!==Hl)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const f={width:e,height:t,depth:d};super(f,i,s,o,a,l,u,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new ep(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class s_ extends Rn{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class Vi extends pi{constructor(e=1,t=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:i};const s=e/2,o=t/2,a=Math.floor(n),l=Math.floor(i),c=a+1,u=l+1,d=e/a,f=t/l,h=[],_=[],g=[],m=[];for(let p=0;p<u;p++){const b=p*f-o;for(let x=0;x<c;x++){const v=x*d-s;_.push(v,-b,0),g.push(0,0,1),m.push(x/a),m.push(1-p/l)}}for(let p=0;p<l;p++)for(let b=0;b<a;b++){const x=b+c*p,v=b+c*(p+1),E=b+1+c*(p+1),M=b+1+c*p;h.push(x,v,M),h.push(v,E,M)}this.setIndex(h),this.setAttribute("position",new $i(_,3)),this.setAttribute("normal",new $i(g,3)),this.setAttribute("uv",new $i(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Vi(e.width,e.height,e.widthSegments,e.heightSegments)}}class qu extends pi{constructor(e=1,t=32,n=16,i=0,s=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:i,phiLength:s,thetaStart:o,thetaLength:a},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const l=Math.min(o+a,Math.PI);let c=0;const u=[],d=new $,f=new $,h=[],_=[],g=[],m=[];for(let p=0;p<=n;p++){const b=[],x=p/n;let v=0;p===0&&o===0?v=.5/t:p===n&&l===Math.PI&&(v=-.5/t);for(let E=0;E<=t;E++){const M=E/t;d.x=-e*Math.cos(i+M*s)*Math.sin(o+x*a),d.y=e*Math.cos(o+x*a),d.z=e*Math.sin(i+M*s)*Math.sin(o+x*a),_.push(d.x,d.y,d.z),f.copy(d).normalize(),g.push(f.x,f.y,f.z),m.push(M+v,1-x),b.push(c++)}u.push(b)}for(let p=0;p<n;p++)for(let b=0;b<t;b++){const x=u[p][b+1],v=u[p][b],E=u[p+1][b],M=u[p+1][b+1];(p!==0||o>0)&&h.push(x,v,M),(p!==n-1||l<Math.PI)&&h.push(v,E,M)}this.setIndex(h),this.setAttribute("position",new $i(_,3)),this.setAttribute("normal",new $i(g,3)),this.setAttribute("uv",new $i(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new qu(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class op extends Ar{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new $e(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new $e(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Gg,this.normalScale=new Et(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Lr,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class cr extends op{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new Et(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Pt(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new $e(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new $e(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new $e(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}class wb extends Ar{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=py,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Sb extends Ar{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}function Ic(r,e){return!r||r.constructor===e?r:typeof e.BYTES_PER_ELEMENT=="number"?new e(r):Array.prototype.slice.call(r)}function Mb(r){return ArrayBuffer.isView(r)&&!(r instanceof DataView)}function Tb(r){function e(i,s){return r[i]-r[s]}const t=r.length,n=new Array(t);for(let i=0;i!==t;++i)n[i]=i;return n.sort(e),n}function Im(r,e,t){const n=r.length,i=new r.constructor(n);for(let s=0,o=0;o!==n;++s){const a=t[s]*e;for(let l=0;l!==e;++l)i[o++]=r[a+l]}return i}function o_(r,e,t,n){let i=1,s=r[0];for(;s!==void 0&&s[n]===void 0;)s=r[i++];if(s===void 0)return;let o=s[n];if(o!==void 0)if(Array.isArray(o))do o=s[n],o!==void 0&&(e.push(s.time),t.push(...o)),s=r[i++];while(s!==void 0);else if(o.toArray!==void 0)do o=s[n],o!==void 0&&(e.push(s.time),o.toArray(t,t.length)),s=r[i++];while(s!==void 0);else do o=s[n],o!==void 0&&(e.push(s.time),t.push(o)),s=r[i++];while(s!==void 0)}class oc{constructor(e,t,n,i){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){const t=this.parameterPositions;let n=this._cachedIndex,i=t[n],s=t[n-1];n:{e:{let o;t:{i:if(!(e<i)){for(let a=n+2;;){if(i===void 0){if(e<s)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(s=i,i=t[++n],e<i)break e}o=t.length;break t}if(!(e>=s)){const a=t[1];e<a&&(n=2,s=a);for(let l=n-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(i=s,s=t[--n-1],e>=s)break e}o=n,n=0;break t}break n}for(;n<o;){const a=n+o>>>1;e<t[a]?o=a:n=a+1}if(i=t[n],s=t[n-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,s,i)}return this.interpolate_(n,s,e,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,s=e*i;for(let o=0;o!==i;++o)t[o]=n[s+o];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}}class Eb extends oc{constructor(e,t,n,i){super(e,t,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Kp,endingEnd:Kp}}intervalChanged_(e,t,n){const i=this.parameterPositions;let s=e-2,o=e+1,a=i[s],l=i[o];if(a===void 0)switch(this.getSettings_().endingStart){case Zp:s=e,a=2*t-n;break;case Jp:s=i.length-2,a=t+i[s]-i[s+1];break;default:s=e,a=n}if(l===void 0)switch(this.getSettings_().endingEnd){case Zp:o=e,l=2*n-t;break;case Jp:o=1,l=n+i[1]-i[0];break;default:o=e-1,l=t}const c=(n-t)*.5,u=this.valueSize;this._weightPrev=c/(t-a),this._weightNext=c/(l-n),this._offsetPrev=s*u,this._offsetNext=o*u}interpolate_(e,t,n,i){const s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,u=this._offsetPrev,d=this._offsetNext,f=this._weightPrev,h=this._weightNext,_=(n-t)/(i-t),g=_*_,m=g*_,p=-f*m+2*f*g-f*_,b=(1+f)*m+(-1.5-2*f)*g+(-.5+f)*_+1,x=(-1-h)*m+(1.5+h)*g+.5*_,v=h*m-h*g;for(let E=0;E!==a;++E)s[E]=p*o[u+E]+b*o[c+E]+x*o[l+E]+v*o[d+E];return s}}class Ab extends oc{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){const s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,u=(n-t)/(i-t),d=1-u;for(let f=0;f!==a;++f)s[f]=o[c+f]*d+o[l+f]*u;return s}}class Cb extends oc{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e){return this.copySampleValue_(e-1)}}class ur{constructor(e,t,n,i){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=Ic(t,this.TimeBufferType),this.values=Ic(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(e){const t=e.constructor;let n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:Ic(e.times,Array),values:Ic(e.values,Array)};const i=e.getInterpolation();i!==e.DefaultInterpolation&&(n.interpolation=i)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new Cb(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Ab(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Eb(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case Gl:t=this.InterpolantFactoryMethodDiscrete;break;case Wl:t=this.InterpolantFactoryMethodLinear;break;case sd:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){const n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return st("KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Gl;case this.InterpolantFactoryMethodLinear:return Wl;case this.InterpolantFactoryMethodSmooth:return sd}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){const t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]+=e}return this}scale(e){if(e!==1){const t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]*=e}return this}trim(e,t){const n=this.times,i=n.length;let s=0,o=i-1;for(;s!==i&&n[s]<e;)++s;for(;o!==-1&&n[o]>t;)--o;if(++o,s!==0||o!==i){s>=o&&(o=Math.max(o,1),s=o-1);const a=this.getValueSize();this.times=n.slice(s,o),this.values=this.values.slice(s*a,o*a)}return this}validate(){let e=!0;const t=this.getValueSize();t-Math.floor(t)!==0&&(Rt("KeyframeTrack: Invalid value size in track.",this),e=!1);const n=this.times,i=this.values,s=n.length;s===0&&(Rt("KeyframeTrack: Track is empty.",this),e=!1);let o=null;for(let a=0;a!==s;a++){const l=n[a];if(typeof l=="number"&&isNaN(l)){Rt("KeyframeTrack: Time is not a valid number.",this,a,l),e=!1;break}if(o!==null&&o>l){Rt("KeyframeTrack: Out of order keys.",this,a,l,o),e=!1;break}o=l}if(i!==void 0&&Mb(i))for(let a=0,l=i.length;a!==l;++a){const c=i[a];if(isNaN(c)){Rt("KeyframeTrack: Value is not a valid number.",this,a,c),e=!1;break}}return e}optimize(){const e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===sd,s=e.length-1;let o=1;for(let a=1;a<s;++a){let l=!1;const c=e[a],u=e[a+1];if(c!==u&&(a!==1||c!==e[0]))if(i)l=!0;else{const d=a*n,f=d-n,h=d+n;for(let _=0;_!==n;++_){const g=t[d+_];if(g!==t[f+_]||g!==t[h+_]){l=!0;break}}}if(l){if(a!==o){e[o]=e[a];const d=a*n,f=o*n;for(let h=0;h!==n;++h)t[f+h]=t[d+h]}++o}}if(s>0){e[o]=e[s];for(let a=s*n,l=o*n,c=0;c!==n;++c)t[l+c]=t[a+c];++o}return o!==e.length?(this.times=e.slice(0,o),this.values=t.slice(0,o*n)):(this.times=e,this.values=t),this}clone(){const e=this.times.slice(),t=this.values.slice(),n=this.constructor,i=new n(this.name,e,t);return i.createInterpolant=this.createInterpolant,i}}ur.prototype.ValueTypeName="";ur.prototype.TimeBufferType=Float32Array;ur.prototype.ValueBufferType=Float32Array;ur.prototype.DefaultInterpolation=Wl;class ka extends ur{constructor(e,t,n){super(e,t,n)}}ka.prototype.ValueTypeName="bool";ka.prototype.ValueBufferType=Array;ka.prototype.DefaultInterpolation=Gl;ka.prototype.InterpolantFactoryMethodLinear=void 0;ka.prototype.InterpolantFactoryMethodSmooth=void 0;class a_ extends ur{constructor(e,t,n,i){super(e,t,n,i)}}a_.prototype.ValueTypeName="color";class Ea extends ur{constructor(e,t,n,i){super(e,t,n,i)}}Ea.prototype.ValueTypeName="number";class Rb extends oc{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){const s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=(n-t)/(i-t);let c=e*a;for(let u=c+a;c!==u;c+=4)ks.slerpFlat(s,0,o,c-a,o,c,l);return s}}class Aa extends ur{constructor(e,t,n,i){super(e,t,n,i)}InterpolantFactoryMethodLinear(e){return new Rb(this.times,this.values,this.getValueSize(),e)}}Aa.prototype.ValueTypeName="quaternion";Aa.prototype.InterpolantFactoryMethodSmooth=void 0;class Ba extends ur{constructor(e,t,n){super(e,t,n)}}Ba.prototype.ValueTypeName="string";Ba.prototype.ValueBufferType=Array;Ba.prototype.DefaultInterpolation=Gl;Ba.prototype.InterpolantFactoryMethodLinear=void 0;Ba.prototype.InterpolantFactoryMethodSmooth=void 0;class Ca extends ur{constructor(e,t,n,i){super(e,t,n,i)}}Ca.prototype.ValueTypeName="vector";class Pb{constructor(e="",t=-1,n=[],i=fy){this.name=e,this.tracks=n,this.duration=t,this.blendMode=i,this.uuid=or(),this.userData={},this.duration<0&&this.resetDuration()}static parse(e){const t=[],n=e.tracks,i=1/(e.fps||1);for(let o=0,a=n.length;o!==a;++o)t.push(Db(n[o]).scale(i));const s=new this(e.name,e.duration,t,e.blendMode);return s.uuid=e.uuid,s.userData=JSON.parse(e.userData||"{}"),s}static toJSON(e){const t=[],n=e.tracks,i={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode,userData:JSON.stringify(e.userData)};for(let s=0,o=n.length;s!==o;++s)t.push(ur.toJSON(n[s]));return i}static CreateFromMorphTargetSequence(e,t,n,i){const s=t.length,o=[];for(let a=0;a<s;a++){let l=[],c=[];l.push((a+s-1)%s,a,(a+1)%s),c.push(0,1,0);const u=Tb(l);l=Im(l,1,u),c=Im(c,1,u),!i&&l[0]===0&&(l.push(s),c.push(c[0])),o.push(new Ea(".morphTargetInfluences["+t[a].name+"]",l,c).scale(1/n))}return new this(e,-1,o)}static findByName(e,t){let n=e;if(!Array.isArray(e)){const i=e;n=i.geometry&&i.geometry.animations||i.animations}for(let i=0;i<n.length;i++)if(n[i].name===t)return n[i];return null}static CreateClipsFromMorphTargetSequences(e,t,n){const i={},s=/^([\w-]*?)([\d]+)$/;for(let a=0,l=e.length;a<l;a++){const c=e[a],u=c.name.match(s);if(u&&u.length>1){const d=u[1];let f=i[d];f||(i[d]=f=[]),f.push(c)}}const o=[];for(const a in i)o.push(this.CreateFromMorphTargetSequence(a,i[a],t,n));return o}static parseAnimation(e,t){if(st("AnimationClip: parseAnimation() is deprecated and will be removed with r185"),!e)return Rt("AnimationClip: No animation in JSONLoader data."),null;const n=function(d,f,h,_,g){if(h.length!==0){const m=[],p=[];o_(h,m,p,_),m.length!==0&&g.push(new d(f,m,p))}},i=[],s=e.name||"default",o=e.fps||30,a=e.blendMode;let l=e.length||-1;const c=e.hierarchy||[];for(let d=0;d<c.length;d++){const f=c[d].keys;if(!(!f||f.length===0))if(f[0].morphTargets){const h={};let _;for(_=0;_<f.length;_++)if(f[_].morphTargets)for(let g=0;g<f[_].morphTargets.length;g++)h[f[_].morphTargets[g]]=-1;for(const g in h){const m=[],p=[];for(let b=0;b!==f[_].morphTargets.length;++b){const x=f[_];m.push(x.time),p.push(x.morphTarget===g?1:0)}i.push(new Ea(".morphTargetInfluence["+g+"]",m,p))}l=h.length*o}else{const h=".bones["+t[d].name+"]";n(Ca,h+".position",f,"pos",i),n(Aa,h+".quaternion",f,"rot",i),n(Ca,h+".scale",f,"scl",i)}}return i.length===0?null:new this(s,l,i,a)}resetDuration(){const e=this.tracks;let t=0;for(let n=0,i=e.length;n!==i;++n){const s=this.tracks[n];t=Math.max(t,s.times[s.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){const e=[];for(let n=0;n<this.tracks.length;n++)e.push(this.tracks[n].clone());const t=new this.constructor(this.name,this.duration,e,this.blendMode);return t.userData=JSON.parse(JSON.stringify(this.userData)),t}toJSON(){return this.constructor.toJSON(this)}}function Lb(r){switch(r.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return Ea;case"vector":case"vector2":case"vector3":case"vector4":return Ca;case"color":return a_;case"quaternion":return Aa;case"bool":case"boolean":return ka;case"string":return Ba}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+r)}function Db(r){if(r.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");const e=Lb(r.type);if(r.times===void 0){const t=[],n=[];o_(r.keys,t,n,"value"),r.times=t,r.values=n}return e.parse!==void 0?e.parse(r):new e(r.name,r.times,r.values,r.interpolation)}const jr={enabled:!1,files:{},add:function(r,e){this.enabled!==!1&&(this.files[r]=e)},get:function(r){if(this.enabled!==!1)return this.files[r]},remove:function(r){delete this.files[r]},clear:function(){this.files={}}};class Ib{constructor(e,t,n){const i=this;let s=!1,o=0,a=0,l;const c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this._abortController=null,this.itemStart=function(u){a++,s===!1&&i.onStart!==void 0&&i.onStart(u,o,a),s=!0},this.itemEnd=function(u){o++,i.onProgress!==void 0&&i.onProgress(u,o,a),o===a&&(s=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(u){i.onError!==void 0&&i.onError(u)},this.resolveURL=function(u){return l?l(u):u},this.setURLModifier=function(u){return l=u,this},this.addHandler=function(u,d){return c.push(u,d),this},this.removeHandler=function(u){const d=c.indexOf(u);return d!==-1&&c.splice(d,2),this},this.getHandler=function(u){for(let d=0,f=c.length;d<f;d+=2){const h=c[d],_=c[d+1];if(h.global&&(h.lastIndex=0),h.test(u))return _}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}}const Ob=new Ib;class Ao{constructor(e){this.manager=e!==void 0?e:Ob,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){const n=this;return new Promise(function(i,s){n.load(e,i,t,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}}Ao.DEFAULT_MATERIAL_NAME="__DEFAULT";const Br={};class Nb extends Error{constructor(e,t){super(e),this.response=t}}class Eu extends Ao{constructor(e){super(e),this.mimeType="",this.responseType="",this._abortController=new AbortController}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=jr.get(`file:${e}`);if(s!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(s),this.manager.itemEnd(e)},0),s;if(Br[e]!==void 0){Br[e].push({onLoad:t,onProgress:n,onError:i});return}Br[e]=[],Br[e].push({onLoad:t,onProgress:n,onError:i});const o=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin",signal:typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal}),a=this.mimeType,l=this.responseType;fetch(o).then(c=>{if(c.status===200||c.status===0){if(c.status===0&&st("FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||c.body===void 0||c.body.getReader===void 0)return c;const u=Br[e],d=c.body.getReader(),f=c.headers.get("X-File-Size")||c.headers.get("Content-Length"),h=f?parseInt(f):0,_=h!==0;let g=0;const m=new ReadableStream({start(p){b();function b(){d.read().then(({done:x,value:v})=>{if(x)p.close();else{g+=v.byteLength;const E=new ProgressEvent("progress",{lengthComputable:_,loaded:g,total:h});for(let M=0,T=u.length;M<T;M++){const R=u[M];R.onProgress&&R.onProgress(E)}p.enqueue(v),b()}},x=>{p.error(x)})}}});return new Response(m)}else throw new Nb(`fetch for "${c.url}" responded with ${c.status}: ${c.statusText}`,c)}).then(c=>{switch(l){case"arraybuffer":return c.arrayBuffer();case"blob":return c.blob();case"document":return c.text().then(u=>new DOMParser().parseFromString(u,a));case"json":return c.json();default:if(a==="")return c.text();{const d=/charset="?([^;"\s]*)"?/i.exec(a),f=d&&d[1]?d[1].toLowerCase():void 0,h=new TextDecoder(f);return c.arrayBuffer().then(_=>h.decode(_))}}}).then(c=>{jr.add(`file:${e}`,c);const u=Br[e];delete Br[e];for(let d=0,f=u.length;d<f;d++){const h=u[d];h.onLoad&&h.onLoad(c)}}).catch(c=>{const u=Br[e];if(u===void 0)throw this.manager.itemError(e),c;delete Br[e];for(let d=0,f=u.length;d<f;d++){const h=u[d];h.onError&&h.onError(c)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}}const $o=new WeakMap;class Fb extends Ao{constructor(e){super(e)}load(e,t,n,i){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=this,o=jr.get(`image:${e}`);if(o!==void 0){if(o.complete===!0)s.manager.itemStart(e),setTimeout(function(){t&&t(o),s.manager.itemEnd(e)},0);else{let d=$o.get(o);d===void 0&&(d=[],$o.set(o,d)),d.push({onLoad:t,onError:i})}return o}const a=Xl("img");function l(){u(),t&&t(this);const d=$o.get(this)||[];for(let f=0;f<d.length;f++){const h=d[f];h.onLoad&&h.onLoad(this)}$o.delete(this),s.manager.itemEnd(e)}function c(d){u(),i&&i(d),jr.remove(`image:${e}`);const f=$o.get(this)||[];for(let h=0;h<f.length;h++){const _=f[h];_.onError&&_.onError(d)}$o.delete(this),s.manager.itemError(e),s.manager.itemEnd(e)}function u(){a.removeEventListener("load",l,!1),a.removeEventListener("error",c,!1)}return a.addEventListener("load",l,!1),a.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),jr.add(`image:${e}`,a),s.manager.itemStart(e),a.src=e,a}}class Ub extends Ao{constructor(e){super(e)}load(e,t,n,i){const s=new Rn,o=new Fb(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(e,function(a){s.image=a,s.needsUpdate=!0,t!==void 0&&t(s)},n,i),s}}class Yu extends un{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new $e(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}const Ld=new yt,Om=new $,Nm=new $;class ap{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Et(512,512),this.mapType=Pr,this.map=null,this.mapPass=null,this.matrix=new yt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new rp,this._frameExtents=new Et(1,1),this._viewportCount=1,this._viewports=[new zt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;Om.setFromMatrixPosition(e.matrixWorld),t.position.copy(Om),Nm.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Nm),t.updateMatrixWorld(),Ld.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Ld,t.coordinateSystem,t.reversedDepth),t.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Ld)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class kb extends ap{constructor(){super(new li(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(e){const t=this.camera,n=Ma*2*e.angle*this.focus,i=this.mapSize.width/this.mapSize.height*this.aspect,s=e.distance||t.far;(n!==t.fov||i!==t.aspect||s!==t.far)&&(t.fov=n,t.aspect=i,t.far=s,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}}class Bb extends Yu{constructor(e,t,n=0,i=Math.PI/3,s=0,o=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(un.DEFAULT_UP),this.updateMatrix(),this.target=new un,this.distance=n,this.angle=i,this.penumbra=s,this.decay=o,this.map=null,this.shadow=new kb}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}const Fm=new yt,ja=new $,Dd=new $;class zb extends ap{constructor(){super(new li(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new Et(4,2),this._viewportCount=6,this._viewports=[new zt(2,1,1,1),new zt(0,1,1,1),new zt(3,1,1,1),new zt(1,1,1,1),new zt(3,0,1,1),new zt(1,0,1,1)],this._cubeDirections=[new $(1,0,0),new $(-1,0,0),new $(0,0,1),new $(0,0,-1),new $(0,1,0),new $(0,-1,0)],this._cubeUps=[new $(0,1,0),new $(0,1,0),new $(0,1,0),new $(0,1,0),new $(0,0,1),new $(0,0,-1)]}updateMatrices(e,t=0){const n=this.camera,i=this.matrix,s=e.distance||n.far;s!==n.far&&(n.far=s,n.updateProjectionMatrix()),ja.setFromMatrixPosition(e.matrixWorld),n.position.copy(ja),Dd.copy(n.position),Dd.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(Dd),n.updateMatrixWorld(),i.makeTranslation(-ja.x,-ja.y,-ja.z),Fm.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Fm,n.coordinateSystem,n.reversedDepth)}}class l_ extends Yu{constructor(e,t,n=0,i=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new zb}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class $u extends tp{constructor(e=-1,t=1,n=1,i=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=i,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,i,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let s=n-e,o=n+e,a=i+t,l=i-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,o=s+c*this.view.width,a-=u*this.view.offsetY,l=a-u*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class Vb extends ap{constructor(){super(new $u(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class c_ extends Yu{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(un.DEFAULT_UP),this.updateMatrix(),this.target=new un,this.shadow=new Vb}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class u_ extends Yu{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}class wl{static extractUrlBase(e){const t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}}const Id=new WeakMap;class Hb extends Ao{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&st("ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&st("ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"},this._abortController=new AbortController}setOptions(e){return this.options=e,this}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=this,o=jr.get(`image-bitmap:${e}`);if(o!==void 0){if(s.manager.itemStart(e),o.then){o.then(c=>{if(Id.has(o)===!0)i&&i(Id.get(o)),s.manager.itemError(e),s.manager.itemEnd(e);else return t&&t(c),s.manager.itemEnd(e),c});return}return setTimeout(function(){t&&t(o),s.manager.itemEnd(e)},0),o}const a={};a.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",a.headers=this.requestHeader,a.signal=typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal;const l=fetch(e,a).then(function(c){return c.blob()}).then(function(c){return createImageBitmap(c,Object.assign(s.options,{colorSpaceConversion:"none"}))}).then(function(c){return jr.add(`image-bitmap:${e}`,c),t&&t(c),s.manager.itemEnd(e),c}).catch(function(c){i&&i(c),Id.set(l,c),jr.remove(`image-bitmap:${e}`),s.manager.itemError(e),s.manager.itemEnd(e)});jr.add(`image-bitmap:${e}`,l),s.manager.itemStart(e)}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}}class Gb extends li{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}class Wb{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=performance.now(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const t=performance.now();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}}const lp="\\[\\]\\.:\\/",Xb=new RegExp("["+lp+"]","g"),cp="[^"+lp+"]",qb="[^"+lp.replace("\\.","")+"]",Yb=/((?:WC+[\/:])*)/.source.replace("WC",cp),$b=/(WCOD+)?/.source.replace("WCOD",qb),jb=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",cp),Kb=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",cp),Zb=new RegExp("^"+Yb+$b+jb+Kb+"$"),Jb=["material","materials","bones","map"];class Qb{constructor(e,t,n){const i=n||$t.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,i)}getValue(e,t){this.bind();const n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(e,t)}setValue(e,t){const n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,s=n.length;i!==s;++i)n[i].setValue(e,t)}bind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}}class $t{constructor(e,t,n){this.path=t,this.parsedPath=n||$t.parseTrackName(t),this.node=$t.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new $t.Composite(e,t,n):new $t(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(Xb,"")}static parseTrackName(e){const t=Zb.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);const n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){const s=n.nodeName.substring(i+1);Jb.indexOf(s)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=s)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){const n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){const n=function(s){for(let o=0;o<s.length;o++){const a=s[o];if(a.name===t||a.uuid===t)return a;const l=n(a.children);if(l)return l}return null},i=n(e.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)e[t++]=n[i]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++]}_setValue_array_setNeedsUpdate(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node;const t=this.parsedPath,n=t.objectName,i=t.propertyName;let s=t.propertyIndex;if(e||(e=$t.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){st("PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=t.objectIndex;switch(n){case"materials":if(!e.material){Rt("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){Rt("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){Rt("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let u=0;u<e.length;u++)if(e[u].name===c){c=u;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){Rt("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){Rt("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){Rt("PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(c!==void 0){if(e[c]===void 0){Rt("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}const o=e[i];if(o===void 0){const c=t.nodeName;Rt("PropertyBinding: Trying to update property for track: "+c+"."+i+" but it wasn't found.",e);return}let a=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?a=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(s!==void 0){if(i==="morphTargetInfluences"){if(!e.geometry){Rt("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){Rt("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[s]!==void 0&&(s=e.morphTargetDictionary[s])}l=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=s}else o.fromArray!==void 0&&o.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(l=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=i;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}$t.Composite=Qb;$t.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};$t.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};$t.prototype.GetterByBindingType=[$t.prototype._getValue_direct,$t.prototype._getValue_array,$t.prototype._getValue_arrayElement,$t.prototype._getValue_toArray];$t.prototype.SetterByBindingTypeAndVersioning=[[$t.prototype._setValue_direct,$t.prototype._setValue_direct_setNeedsUpdate,$t.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[$t.prototype._setValue_array,$t.prototype._setValue_array_setNeedsUpdate,$t.prototype._setValue_array_setMatrixWorldNeedsUpdate],[$t.prototype._setValue_arrayElement,$t.prototype._setValue_arrayElement_setNeedsUpdate,$t.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[$t.prototype._setValue_fromArray,$t.prototype._setValue_fromArray_setNeedsUpdate,$t.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];function Um(r,e,t,n){const i=ew(n);switch(t){case zg:return r*e;case $h:return r*e/i.components*i.byteLength;case jh:return r*e/i.components*i.byteLength;case Kh:return r*e*2/i.components*i.byteLength;case Zh:return r*e*2/i.components*i.byteLength;case Vg:return r*e*3/i.components*i.byteLength;case Xi:return r*e*4/i.components*i.byteLength;case Jh:return r*e*4/i.components*i.byteLength;case nu:case iu:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*8;case ru:case su:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case Sf:case Tf:return Math.max(r,16)*Math.max(e,8)/4;case wf:case Mf:return Math.max(r,8)*Math.max(e,8)/2;case Ef:case Af:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*8;case Cf:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case Rf:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case Pf:return Math.floor((r+4)/5)*Math.floor((e+3)/4)*16;case Lf:return Math.floor((r+4)/5)*Math.floor((e+4)/5)*16;case Df:return Math.floor((r+5)/6)*Math.floor((e+4)/5)*16;case If:return Math.floor((r+5)/6)*Math.floor((e+5)/6)*16;case Of:return Math.floor((r+7)/8)*Math.floor((e+4)/5)*16;case Nf:return Math.floor((r+7)/8)*Math.floor((e+5)/6)*16;case Ff:return Math.floor((r+7)/8)*Math.floor((e+7)/8)*16;case Uf:return Math.floor((r+9)/10)*Math.floor((e+4)/5)*16;case kf:return Math.floor((r+9)/10)*Math.floor((e+5)/6)*16;case Bf:return Math.floor((r+9)/10)*Math.floor((e+7)/8)*16;case zf:return Math.floor((r+9)/10)*Math.floor((e+9)/10)*16;case Vf:return Math.floor((r+11)/12)*Math.floor((e+9)/10)*16;case Hf:return Math.floor((r+11)/12)*Math.floor((e+11)/12)*16;case Gf:case Wf:case Xf:return Math.ceil(r/4)*Math.ceil(e/4)*16;case qf:case Yf:return Math.ceil(r/4)*Math.ceil(e/4)*8;case $f:case jf:return Math.ceil(r/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function ew(r){switch(r){case Pr:case Fg:return{byteLength:1,components:1};case Bl:case Ug:case Fa:return{byteLength:2,components:1};case qh:case Yh:return{byteLength:2,components:4};case bo:case Xh:case sr:return{byteLength:4,components:1};case kg:case Bg:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${r}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Wh}}));typeof window<"u"&&(window.__THREE__?st("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Wh);/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function d_(){let r=null,e=!1,t=null,n=null;function i(s,o){t(s,o),n=r.requestAnimationFrame(i)}return{start:function(){e!==!0&&t!==null&&(n=r.requestAnimationFrame(i),e=!0)},stop:function(){r.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){r=s}}}function tw(r){const e=new WeakMap;function t(a,l){const c=a.array,u=a.usage,d=c.byteLength,f=r.createBuffer();r.bindBuffer(l,f),r.bufferData(l,c,u),a.onUploadCallback();let h;if(c instanceof Float32Array)h=r.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)h=r.HALF_FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?h=r.HALF_FLOAT:h=r.UNSIGNED_SHORT;else if(c instanceof Int16Array)h=r.SHORT;else if(c instanceof Uint32Array)h=r.UNSIGNED_INT;else if(c instanceof Int32Array)h=r.INT;else if(c instanceof Int8Array)h=r.BYTE;else if(c instanceof Uint8Array)h=r.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)h=r.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:f,type:h,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:d}}function n(a,l,c){const u=l.array,d=l.updateRanges;if(r.bindBuffer(c,a),d.length===0)r.bufferSubData(c,0,u);else{d.sort((h,_)=>h.start-_.start);let f=0;for(let h=1;h<d.length;h++){const _=d[f],g=d[h];g.start<=_.start+_.count+1?_.count=Math.max(_.count,g.start+g.count-_.start):(++f,d[f]=g)}d.length=f+1;for(let h=0,_=d.length;h<_;h++){const g=d[h];r.bufferSubData(c,g.start*u.BYTES_PER_ELEMENT,u,g.start,g.count)}l.clearUpdateRanges()}l.onUploadCallback()}function i(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function s(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=e.get(a);l&&(r.deleteBuffer(l.buffer),e.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const u=e.get(a);(!u||u.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const c=e.get(a);if(c===void 0)e.set(a,t(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,a,l),c.version=a.version}}return{get:i,remove:s,update:o}}var nw=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,iw=`#ifdef USE_ALPHAHASH
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
#endif`,rw=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,sw=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,ow=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,aw=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,lw=`#ifdef USE_AOMAP
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
#endif`,cw=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,uw=`#ifdef USE_BATCHING
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
#endif`,dw=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,fw=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,hw=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,pw=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,mw=`#ifdef USE_IRIDESCENCE
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
#endif`,gw=`#ifdef USE_BUMPMAP
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
#endif`,_w=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,xw=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,vw=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,yw=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,bw=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,ww=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Sw=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Mw=`#if defined( USE_COLOR_ALPHA )
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
#endif`,Tw=`#define PI 3.141592653589793
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
} // validated`,Ew=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Aw=`vec3 transformedNormal = objectNormal;
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
#endif`,Cw=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Rw=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Pw=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Lw=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Dw="gl_FragColor = linearToOutputTexel( gl_FragColor );",Iw=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Ow=`#ifdef USE_ENVMAP
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
#endif`,Nw=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,Fw=`#ifdef USE_ENVMAP
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
#endif`,Uw=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,kw=`#ifdef USE_ENVMAP
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
#endif`,Bw=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,zw=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Vw=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Hw=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Gw=`#ifdef USE_GRADIENTMAP
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
}`,Ww=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Xw=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,qw=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Yw=`uniform bool receiveShadow;
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
#endif`,$w=`#ifdef USE_ENVMAP
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
#endif`,jw=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Kw=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Zw=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Jw=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Qw=`PhysicalMaterial material;
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
#endif`,eS=`uniform sampler2D dfgLUT;
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
}`,tS=`
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
#endif`,nS=`#if defined( RE_IndirectDiffuse )
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
#endif`,iS=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,rS=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,sS=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,oS=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,aS=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,lS=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,cS=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,uS=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,dS=`#if defined( USE_POINTS_UV )
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
#endif`,fS=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,hS=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,pS=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,mS=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,gS=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,_S=`#ifdef USE_MORPHTARGETS
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
#endif`,xS=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,vS=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,yS=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,bS=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,wS=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,SS=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,MS=`#ifdef USE_NORMALMAP
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
#endif`,TS=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,ES=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,AS=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,CS=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,RS=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,PS=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,LS=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,DS=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,IS=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,OS=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,NS=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,FS=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,US=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,kS=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,BS=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,zS=`float getShadowMask() {
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
}`,VS=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,HS=`#ifdef USE_SKINNING
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
#endif`,GS=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,WS=`#ifdef USE_SKINNING
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
#endif`,XS=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,qS=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,YS=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,$S=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,jS=`#ifdef USE_TRANSMISSION
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
#endif`,KS=`#ifdef USE_TRANSMISSION
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
#endif`,ZS=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,JS=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,QS=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,e1=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const t1=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,n1=`uniform sampler2D t2D;
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
}`,i1=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,r1=`#ifdef ENVMAP_TYPE_CUBE
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
}`,s1=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,o1=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,a1=`#include <common>
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
}`,l1=`#if DEPTH_PACKING == 3200
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
}`,c1=`#define DISTANCE
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
}`,u1=`#define DISTANCE
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
}`,d1=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,f1=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,h1=`uniform float scale;
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
}`,p1=`uniform vec3 diffuse;
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
}`,m1=`#include <common>
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
}`,g1=`uniform vec3 diffuse;
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
}`,_1=`#define LAMBERT
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
}`,x1=`#define LAMBERT
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
}`,v1=`#define MATCAP
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
}`,y1=`#define MATCAP
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
}`,b1=`#define NORMAL
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
}`,w1=`#define NORMAL
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
}`,S1=`#define PHONG
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
}`,M1=`#define PHONG
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
}`,T1=`#define STANDARD
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
}`,E1=`#define STANDARD
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
}`,A1=`#define TOON
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
}`,C1=`#define TOON
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
}`,R1=`uniform float size;
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
}`,P1=`uniform vec3 diffuse;
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
}`,L1=`#include <common>
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
}`,D1=`uniform vec3 color;
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
}`,I1=`uniform float rotation;
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
}`,O1=`uniform vec3 diffuse;
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
}`,vt={alphahash_fragment:nw,alphahash_pars_fragment:iw,alphamap_fragment:rw,alphamap_pars_fragment:sw,alphatest_fragment:ow,alphatest_pars_fragment:aw,aomap_fragment:lw,aomap_pars_fragment:cw,batching_pars_vertex:uw,batching_vertex:dw,begin_vertex:fw,beginnormal_vertex:hw,bsdfs:pw,iridescence_fragment:mw,bumpmap_pars_fragment:gw,clipping_planes_fragment:_w,clipping_planes_pars_fragment:xw,clipping_planes_pars_vertex:vw,clipping_planes_vertex:yw,color_fragment:bw,color_pars_fragment:ww,color_pars_vertex:Sw,color_vertex:Mw,common:Tw,cube_uv_reflection_fragment:Ew,defaultnormal_vertex:Aw,displacementmap_pars_vertex:Cw,displacementmap_vertex:Rw,emissivemap_fragment:Pw,emissivemap_pars_fragment:Lw,colorspace_fragment:Dw,colorspace_pars_fragment:Iw,envmap_fragment:Ow,envmap_common_pars_fragment:Nw,envmap_pars_fragment:Fw,envmap_pars_vertex:Uw,envmap_physical_pars_fragment:$w,envmap_vertex:kw,fog_vertex:Bw,fog_pars_vertex:zw,fog_fragment:Vw,fog_pars_fragment:Hw,gradientmap_pars_fragment:Gw,lightmap_pars_fragment:Ww,lights_lambert_fragment:Xw,lights_lambert_pars_fragment:qw,lights_pars_begin:Yw,lights_toon_fragment:jw,lights_toon_pars_fragment:Kw,lights_phong_fragment:Zw,lights_phong_pars_fragment:Jw,lights_physical_fragment:Qw,lights_physical_pars_fragment:eS,lights_fragment_begin:tS,lights_fragment_maps:nS,lights_fragment_end:iS,logdepthbuf_fragment:rS,logdepthbuf_pars_fragment:sS,logdepthbuf_pars_vertex:oS,logdepthbuf_vertex:aS,map_fragment:lS,map_pars_fragment:cS,map_particle_fragment:uS,map_particle_pars_fragment:dS,metalnessmap_fragment:fS,metalnessmap_pars_fragment:hS,morphinstance_vertex:pS,morphcolor_vertex:mS,morphnormal_vertex:gS,morphtarget_pars_vertex:_S,morphtarget_vertex:xS,normal_fragment_begin:vS,normal_fragment_maps:yS,normal_pars_fragment:bS,normal_pars_vertex:wS,normal_vertex:SS,normalmap_pars_fragment:MS,clearcoat_normal_fragment_begin:TS,clearcoat_normal_fragment_maps:ES,clearcoat_pars_fragment:AS,iridescence_pars_fragment:CS,opaque_fragment:RS,packing:PS,premultiplied_alpha_fragment:LS,project_vertex:DS,dithering_fragment:IS,dithering_pars_fragment:OS,roughnessmap_fragment:NS,roughnessmap_pars_fragment:FS,shadowmap_pars_fragment:US,shadowmap_pars_vertex:kS,shadowmap_vertex:BS,shadowmask_pars_fragment:zS,skinbase_vertex:VS,skinning_pars_vertex:HS,skinning_vertex:GS,skinnormal_vertex:WS,specularmap_fragment:XS,specularmap_pars_fragment:qS,tonemapping_fragment:YS,tonemapping_pars_fragment:$S,transmission_fragment:jS,transmission_pars_fragment:KS,uv_pars_fragment:ZS,uv_pars_vertex:JS,uv_vertex:QS,worldpos_vertex:e1,background_vert:t1,background_frag:n1,backgroundCube_vert:i1,backgroundCube_frag:r1,cube_vert:s1,cube_frag:o1,depth_vert:a1,depth_frag:l1,distanceRGBA_vert:c1,distanceRGBA_frag:u1,equirect_vert:d1,equirect_frag:f1,linedashed_vert:h1,linedashed_frag:p1,meshbasic_vert:m1,meshbasic_frag:g1,meshlambert_vert:_1,meshlambert_frag:x1,meshmatcap_vert:v1,meshmatcap_frag:y1,meshnormal_vert:b1,meshnormal_frag:w1,meshphong_vert:S1,meshphong_frag:M1,meshphysical_vert:T1,meshphysical_frag:E1,meshtoon_vert:A1,meshtoon_frag:C1,points_vert:R1,points_frag:P1,shadow_vert:L1,shadow_frag:D1,sprite_vert:I1,sprite_frag:O1},Oe={common:{diffuse:{value:new $e(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new xt},alphaMap:{value:null},alphaMapTransform:{value:new xt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new xt}},envmap:{envMap:{value:null},envMapRotation:{value:new xt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new xt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new xt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new xt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new xt},normalScale:{value:new Et(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new xt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new xt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new xt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new xt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new $e(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new $e(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new xt},alphaTest:{value:0},uvTransform:{value:new xt}},sprite:{diffuse:{value:new $e(16777215)},opacity:{value:1},center:{value:new Et(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new xt},alphaMap:{value:null},alphaMapTransform:{value:new xt},alphaTest:{value:0}}},vr={basic:{uniforms:ri([Oe.common,Oe.specularmap,Oe.envmap,Oe.aomap,Oe.lightmap,Oe.fog]),vertexShader:vt.meshbasic_vert,fragmentShader:vt.meshbasic_frag},lambert:{uniforms:ri([Oe.common,Oe.specularmap,Oe.envmap,Oe.aomap,Oe.lightmap,Oe.emissivemap,Oe.bumpmap,Oe.normalmap,Oe.displacementmap,Oe.fog,Oe.lights,{emissive:{value:new $e(0)}}]),vertexShader:vt.meshlambert_vert,fragmentShader:vt.meshlambert_frag},phong:{uniforms:ri([Oe.common,Oe.specularmap,Oe.envmap,Oe.aomap,Oe.lightmap,Oe.emissivemap,Oe.bumpmap,Oe.normalmap,Oe.displacementmap,Oe.fog,Oe.lights,{emissive:{value:new $e(0)},specular:{value:new $e(1118481)},shininess:{value:30}}]),vertexShader:vt.meshphong_vert,fragmentShader:vt.meshphong_frag},standard:{uniforms:ri([Oe.common,Oe.envmap,Oe.aomap,Oe.lightmap,Oe.emissivemap,Oe.bumpmap,Oe.normalmap,Oe.displacementmap,Oe.roughnessmap,Oe.metalnessmap,Oe.fog,Oe.lights,{emissive:{value:new $e(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:vt.meshphysical_vert,fragmentShader:vt.meshphysical_frag},toon:{uniforms:ri([Oe.common,Oe.aomap,Oe.lightmap,Oe.emissivemap,Oe.bumpmap,Oe.normalmap,Oe.displacementmap,Oe.gradientmap,Oe.fog,Oe.lights,{emissive:{value:new $e(0)}}]),vertexShader:vt.meshtoon_vert,fragmentShader:vt.meshtoon_frag},matcap:{uniforms:ri([Oe.common,Oe.bumpmap,Oe.normalmap,Oe.displacementmap,Oe.fog,{matcap:{value:null}}]),vertexShader:vt.meshmatcap_vert,fragmentShader:vt.meshmatcap_frag},points:{uniforms:ri([Oe.points,Oe.fog]),vertexShader:vt.points_vert,fragmentShader:vt.points_frag},dashed:{uniforms:ri([Oe.common,Oe.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:vt.linedashed_vert,fragmentShader:vt.linedashed_frag},depth:{uniforms:ri([Oe.common,Oe.displacementmap]),vertexShader:vt.depth_vert,fragmentShader:vt.depth_frag},normal:{uniforms:ri([Oe.common,Oe.bumpmap,Oe.normalmap,Oe.displacementmap,{opacity:{value:1}}]),vertexShader:vt.meshnormal_vert,fragmentShader:vt.meshnormal_frag},sprite:{uniforms:ri([Oe.sprite,Oe.fog]),vertexShader:vt.sprite_vert,fragmentShader:vt.sprite_frag},background:{uniforms:{uvTransform:{value:new xt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:vt.background_vert,fragmentShader:vt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new xt}},vertexShader:vt.backgroundCube_vert,fragmentShader:vt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:vt.cube_vert,fragmentShader:vt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:vt.equirect_vert,fragmentShader:vt.equirect_frag},distanceRGBA:{uniforms:ri([Oe.common,Oe.displacementmap,{referencePosition:{value:new $},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:vt.distanceRGBA_vert,fragmentShader:vt.distanceRGBA_frag},shadow:{uniforms:ri([Oe.lights,Oe.fog,{color:{value:new $e(0)},opacity:{value:1}}]),vertexShader:vt.shadow_vert,fragmentShader:vt.shadow_frag}};vr.physical={uniforms:ri([vr.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new xt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new xt},clearcoatNormalScale:{value:new Et(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new xt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new xt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new xt},sheen:{value:0},sheenColor:{value:new $e(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new xt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new xt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new xt},transmissionSamplerSize:{value:new Et},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new xt},attenuationDistance:{value:0},attenuationColor:{value:new $e(0)},specularColor:{value:new $e(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new xt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new xt},anisotropyVector:{value:new Et},anisotropyMap:{value:null},anisotropyMapTransform:{value:new xt}}]),vertexShader:vt.meshphysical_vert,fragmentShader:vt.meshphysical_frag};const Oc={r:0,b:0,g:0},Ys=new Lr,N1=new yt;function F1(r,e,t,n,i,s,o){const a=new $e(0);let l=s===!0?0:1,c,u,d=null,f=0,h=null;function _(x){let v=x.isScene===!0?x.background:null;return v&&v.isTexture&&(v=(x.backgroundBlurriness>0?t:e).get(v)),v}function g(x){let v=!1;const E=_(x);E===null?p(a,l):E&&E.isColor&&(p(E,1),v=!0);const M=r.xr.getEnvironmentBlendMode();M==="additive"?n.buffers.color.setClear(0,0,0,1,o):M==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(r.autoClear||v)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil))}function m(x,v){const E=_(v);E&&(E.isCubeTexture||E.mapping===Gu)?(u===void 0&&(u=new Jn(new sc(1,1,1),new fi({name:"BackgroundCubeMaterial",uniforms:Ta(vr.backgroundCube.uniforms),vertexShader:vr.backgroundCube.vertexShader,fragmentShader:vr.backgroundCube.fragmentShader,side:_i,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(M,T,R){this.matrixWorld.copyPosition(R.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(u)),Ys.copy(v.backgroundRotation),Ys.x*=-1,Ys.y*=-1,Ys.z*=-1,E.isCubeTexture&&E.isRenderTargetTexture===!1&&(Ys.y*=-1,Ys.z*=-1),u.material.uniforms.envMap.value=E,u.material.uniforms.flipEnvMap.value=E.isCubeTexture&&E.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=v.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(N1.makeRotationFromEuler(Ys)),u.material.toneMapped=It.getTransfer(E.colorSpace)!==Kt,(d!==E||f!==E.version||h!==r.toneMapping)&&(u.material.needsUpdate=!0,d=E,f=E.version,h=r.toneMapping),u.layers.enableAll(),x.unshift(u,u.geometry,u.material,0,0,null)):E&&E.isTexture&&(c===void 0&&(c=new Jn(new Vi(2,2),new fi({name:"BackgroundMaterial",uniforms:Ta(vr.background.uniforms),vertexShader:vr.background.vertexShader,fragmentShader:vr.background.fragmentShader,side:ts,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=E,c.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,c.material.toneMapped=It.getTransfer(E.colorSpace)!==Kt,E.matrixAutoUpdate===!0&&E.updateMatrix(),c.material.uniforms.uvTransform.value.copy(E.matrix),(d!==E||f!==E.version||h!==r.toneMapping)&&(c.material.needsUpdate=!0,d=E,f=E.version,h=r.toneMapping),c.layers.enableAll(),x.unshift(c,c.geometry,c.material,0,0,null))}function p(x,v){x.getRGB(Oc,Zg(r)),n.buffers.color.setClear(Oc.r,Oc.g,Oc.b,v,o)}function b(){u!==void 0&&(u.geometry.dispose(),u.material.dispose(),u=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(x,v=1){a.set(x),l=v,p(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(x){l=x,p(a,l)},render:g,addToRenderList:m,dispose:b}}function U1(r,e){const t=r.getParameter(r.MAX_VERTEX_ATTRIBS),n={},i=f(null);let s=i,o=!1;function a(y,D,N,V,j){let k=!1;const G=d(V,N,D);s!==G&&(s=G,c(s.object)),k=h(y,V,N,j),k&&_(y,V,N,j),j!==null&&e.update(j,r.ELEMENT_ARRAY_BUFFER),(k||o)&&(o=!1,v(y,D,N,V),j!==null&&r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,e.get(j).buffer))}function l(){return r.createVertexArray()}function c(y){return r.bindVertexArray(y)}function u(y){return r.deleteVertexArray(y)}function d(y,D,N){const V=N.wireframe===!0;let j=n[y.id];j===void 0&&(j={},n[y.id]=j);let k=j[D.id];k===void 0&&(k={},j[D.id]=k);let G=k[V];return G===void 0&&(G=f(l()),k[V]=G),G}function f(y){const D=[],N=[],V=[];for(let j=0;j<t;j++)D[j]=0,N[j]=0,V[j]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:D,enabledAttributes:N,attributeDivisors:V,object:y,attributes:{},index:null}}function h(y,D,N,V){const j=s.attributes,k=D.attributes;let G=0;const Y=N.getAttributes();for(const F in Y)if(Y[F].location>=0){const O=j[F];let he=k[F];if(he===void 0&&(F==="instanceMatrix"&&y.instanceMatrix&&(he=y.instanceMatrix),F==="instanceColor"&&y.instanceColor&&(he=y.instanceColor)),O===void 0||O.attribute!==he||he&&O.data!==he.data)return!0;G++}return s.attributesNum!==G||s.index!==V}function _(y,D,N,V){const j={},k=D.attributes;let G=0;const Y=N.getAttributes();for(const F in Y)if(Y[F].location>=0){let O=k[F];O===void 0&&(F==="instanceMatrix"&&y.instanceMatrix&&(O=y.instanceMatrix),F==="instanceColor"&&y.instanceColor&&(O=y.instanceColor));const he={};he.attribute=O,O&&O.data&&(he.data=O.data),j[F]=he,G++}s.attributes=j,s.attributesNum=G,s.index=V}function g(){const y=s.newAttributes;for(let D=0,N=y.length;D<N;D++)y[D]=0}function m(y){p(y,0)}function p(y,D){const N=s.newAttributes,V=s.enabledAttributes,j=s.attributeDivisors;N[y]=1,V[y]===0&&(r.enableVertexAttribArray(y),V[y]=1),j[y]!==D&&(r.vertexAttribDivisor(y,D),j[y]=D)}function b(){const y=s.newAttributes,D=s.enabledAttributes;for(let N=0,V=D.length;N<V;N++)D[N]!==y[N]&&(r.disableVertexAttribArray(N),D[N]=0)}function x(y,D,N,V,j,k,G){G===!0?r.vertexAttribIPointer(y,D,N,j,k):r.vertexAttribPointer(y,D,N,V,j,k)}function v(y,D,N,V){g();const j=V.attributes,k=N.getAttributes(),G=D.defaultAttributeValues;for(const Y in k){const F=k[Y];if(F.location>=0){let ae=j[Y];if(ae===void 0&&(Y==="instanceMatrix"&&y.instanceMatrix&&(ae=y.instanceMatrix),Y==="instanceColor"&&y.instanceColor&&(ae=y.instanceColor)),ae!==void 0){const O=ae.normalized,he=ae.itemSize,P=e.get(ae);if(P===void 0)continue;const Me=P.buffer,Ne=P.type,ze=P.bytesPerElement,te=Ne===r.INT||Ne===r.UNSIGNED_INT||ae.gpuType===Xh;if(ae.isInterleavedBufferAttribute){const ie=ae.data,K=ie.stride,Ue=ae.offset;if(ie.isInstancedInterleavedBuffer){for(let be=0;be<F.locationSize;be++)p(F.location+be,ie.meshPerAttribute);y.isInstancedMesh!==!0&&V._maxInstanceCount===void 0&&(V._maxInstanceCount=ie.meshPerAttribute*ie.count)}else for(let be=0;be<F.locationSize;be++)m(F.location+be);r.bindBuffer(r.ARRAY_BUFFER,Me);for(let be=0;be<F.locationSize;be++)x(F.location+be,he/F.locationSize,Ne,O,K*ze,(Ue+he/F.locationSize*be)*ze,te)}else{if(ae.isInstancedBufferAttribute){for(let ie=0;ie<F.locationSize;ie++)p(F.location+ie,ae.meshPerAttribute);y.isInstancedMesh!==!0&&V._maxInstanceCount===void 0&&(V._maxInstanceCount=ae.meshPerAttribute*ae.count)}else for(let ie=0;ie<F.locationSize;ie++)m(F.location+ie);r.bindBuffer(r.ARRAY_BUFFER,Me);for(let ie=0;ie<F.locationSize;ie++)x(F.location+ie,he/F.locationSize,Ne,O,he*ze,he/F.locationSize*ie*ze,te)}}else if(G!==void 0){const O=G[Y];if(O!==void 0)switch(O.length){case 2:r.vertexAttrib2fv(F.location,O);break;case 3:r.vertexAttrib3fv(F.location,O);break;case 4:r.vertexAttrib4fv(F.location,O);break;default:r.vertexAttrib1fv(F.location,O)}}}}b()}function E(){R();for(const y in n){const D=n[y];for(const N in D){const V=D[N];for(const j in V)u(V[j].object),delete V[j];delete D[N]}delete n[y]}}function M(y){if(n[y.id]===void 0)return;const D=n[y.id];for(const N in D){const V=D[N];for(const j in V)u(V[j].object),delete V[j];delete D[N]}delete n[y.id]}function T(y){for(const D in n){const N=n[D];if(N[y.id]===void 0)continue;const V=N[y.id];for(const j in V)u(V[j].object),delete V[j];delete N[y.id]}}function R(){w(),o=!0,s!==i&&(s=i,c(s.object))}function w(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:a,reset:R,resetDefaultState:w,dispose:E,releaseStatesOfGeometry:M,releaseStatesOfProgram:T,initAttributes:g,enableAttribute:m,disableUnusedAttributes:b}}function k1(r,e,t){let n;function i(c){n=c}function s(c,u){r.drawArrays(n,c,u),t.update(u,n,1)}function o(c,u,d){d!==0&&(r.drawArraysInstanced(n,c,u,d),t.update(u,n,d))}function a(c,u,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,u,0,d);let h=0;for(let _=0;_<d;_++)h+=u[_];t.update(h,n,1)}function l(c,u,d,f){if(d===0)return;const h=e.get("WEBGL_multi_draw");if(h===null)for(let _=0;_<c.length;_++)o(c[_],u[_],f[_]);else{h.multiDrawArraysInstancedWEBGL(n,c,0,u,0,f,0,d);let _=0;for(let g=0;g<d;g++)_+=u[g]*f[g];t.update(_,n,1)}}this.setMode=i,this.render=s,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function B1(r,e,t,n){let i;function s(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){const T=e.get("EXT_texture_filter_anisotropic");i=r.getParameter(T.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(T){return!(T!==Xi&&n.convert(T)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(T){const R=T===Fa&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(T!==Pr&&n.convert(T)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_TYPE)&&T!==sr&&!R)}function l(T){if(T==="highp"){if(r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.HIGH_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision>0)return"highp";T="mediump"}return T==="mediump"&&r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.MEDIUM_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const u=l(c);u!==c&&(st("WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);const d=t.logarithmicDepthBuffer===!0,f=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),h=r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS),_=r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS),g=r.getParameter(r.MAX_TEXTURE_SIZE),m=r.getParameter(r.MAX_CUBE_MAP_TEXTURE_SIZE),p=r.getParameter(r.MAX_VERTEX_ATTRIBS),b=r.getParameter(r.MAX_VERTEX_UNIFORM_VECTORS),x=r.getParameter(r.MAX_VARYING_VECTORS),v=r.getParameter(r.MAX_FRAGMENT_UNIFORM_VECTORS),E=_>0,M=r.getParameter(r.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:d,reversedDepthBuffer:f,maxTextures:h,maxVertexTextures:_,maxTextureSize:g,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:b,maxVaryings:x,maxFragmentUniforms:v,vertexTextures:E,maxSamples:M}}function z1(r){const e=this;let t=null,n=0,i=!1,s=!1;const o=new Qs,a=new xt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,f){const h=d.length!==0||f||n!==0||i;return i=f,n=d.length,h},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(d,f){t=u(d,f,0)},this.setState=function(d,f,h){const _=d.clippingPlanes,g=d.clipIntersection,m=d.clipShadows,p=r.get(d);if(!i||_===null||_.length===0||s&&!m)s?u(null):c();else{const b=s?0:n,x=b*4;let v=p.clippingState||null;l.value=v,v=u(_,f,x,h);for(let E=0;E!==x;++E)v[E]=t[E];p.clippingState=v,this.numIntersection=g?this.numPlanes:0,this.numPlanes+=b}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function u(d,f,h,_){const g=d!==null?d.length:0;let m=null;if(g!==0){if(m=l.value,_!==!0||m===null){const p=h+g*4,b=f.matrixWorldInverse;a.getNormalMatrix(b),(m===null||m.length<p)&&(m=new Float32Array(p));for(let x=0,v=h;x!==g;++x,v+=4)o.copy(d[x]).applyMatrix4(b,a),o.normal.toArray(m,v),m[v+3]=o.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=g,e.numIntersection=0,m}}function V1(r){let e=new WeakMap;function t(o,a){return a===yf?o.mapping=ba:a===bf&&(o.mapping=wa),o}function n(o){if(o&&o.isTexture){const a=o.mapping;if(a===yf||a===bf)if(e.has(o)){const l=e.get(o).texture;return t(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new db(l.height);return c.fromEquirectangularTexture(r,o),e.set(o,c),o.addEventListener("dispose",i),t(c.texture,o.mapping)}else return null}}return o}function i(o){const a=o.target;a.removeEventListener("dispose",i);const l=e.get(a);l!==void 0&&(e.delete(a),l.dispose())}function s(){e=new WeakMap}return{get:n,dispose:s}}const vs=4,km=[.125,.215,.35,.446,.526,.582],so=20,H1=512,Ka=new $u,Bm=new $e;let Od=null,Nd=0,Fd=0,Ud=!1;const G1=new $;class zm{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,i=100,s={}){const{size:o=256,position:a=G1}=s;Od=this._renderer.getRenderTarget(),Nd=this._renderer.getActiveCubeFace(),Fd=this._renderer.getActiveMipmapLevel(),Ud=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,n,i,l,a),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Gm(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Hm(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Od,Nd,Fd),this._renderer.xr.enabled=Ud,e.scissorTest=!1,jo(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===ba||e.mapping===wa?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Od=this._renderer.getRenderTarget(),Nd=this._renderer.getActiveCubeFace(),Fd=this._renderer.getActiveMipmapLevel(),Ud=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:jn,minFilter:jn,generateMipmaps:!1,type:Fa,format:Xi,colorSpace:Zn,depthBuffer:!1},i=Vm(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Vm(e,t,n);const{_lodMax:s}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=W1(s)),this._blurMaterial=q1(s,e,t)}return i}_compileMaterial(e){const t=new Jn(new pi,e);this._renderer.compile(t,Ka)}_sceneToCubeUV(e,t,n,i,s){const l=new li(90,1,t,n),c=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],d=this._renderer,f=d.autoClear,h=d.toneMapping;d.getClearColor(Bm),d.toneMapping=Cs,d.autoClear=!1,d.state.buffers.depth.getReversed()&&(d.setRenderTarget(i),d.clearDepth(),d.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Jn(new sc,new oo({name:"PMREM.Background",side:_i,depthWrite:!1,depthTest:!1})));const g=this._backgroundBox,m=g.material;let p=!1;const b=e.background;b?b.isColor&&(m.color.copy(b),e.background=null,p=!0):(m.color.copy(Bm),p=!0);for(let x=0;x<6;x++){const v=x%3;v===0?(l.up.set(0,c[x],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x+u[x],s.y,s.z)):v===1?(l.up.set(0,0,c[x]),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y+u[x],s.z)):(l.up.set(0,c[x],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y,s.z+u[x]));const E=this._cubeSize;jo(i,v*E,x>2?E:0,E,E),d.setRenderTarget(i),p&&d.render(g,l),d.render(e,l)}d.toneMapping=h,d.autoClear=f,e.background=b}_textureToCubeUV(e,t){const n=this._renderer,i=e.mapping===ba||e.mapping===wa;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=Gm()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Hm());const s=i?this._cubemapMaterial:this._equirectMaterial,o=this._lodMeshes[0];o.material=s;const a=s.uniforms;a.envMap.value=e;const l=this._cubeSize;jo(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(o,Ka)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const i=this._lodMeshes.length;for(let s=1;s<i;s++)this._applyGGXFilter(e,s-1,s);t.autoClear=n}_applyGGXFilter(e,t,n){const i=this._renderer,s=this._pingPongRenderTarget;if(this._ggxMaterial===null){const b=3*Math.max(this._cubeSize,16),x=4*this._cubeSize;this._ggxMaterial=X1(this._lodMax,b,x)}const o=this._ggxMaterial,a=this._lodMeshes[n];a.material=o;const l=o.uniforms,c=n/(this._lodMeshes.length-1),u=t/(this._lodMeshes.length-1),d=Math.sqrt(c*c-u*u),f=.05+c*.95,h=d*f,{_lodMax:_}=this,g=this._sizeLods[n],m=3*g*(n>_-vs?n-_+vs:0),p=4*(this._cubeSize-g);l.envMap.value=e.texture,l.roughness.value=h,l.mipInt.value=_-t,jo(s,m,p,3*g,2*g),i.setRenderTarget(s),i.render(a,Ka),l.envMap.value=s.texture,l.roughness.value=0,l.mipInt.value=_-n,jo(e,m,p,3*g,2*g),i.setRenderTarget(e),i.render(a,Ka)}_blur(e,t,n,i,s){const o=this._pingPongRenderTarget;this._halfBlur(e,o,t,n,i,"latitudinal",s),this._halfBlur(o,e,n,n,i,"longitudinal",s)}_halfBlur(e,t,n,i,s,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&Rt("blur direction must be either latitudinal or longitudinal!");const u=3,d=this._lodMeshes[i];d.material=c;const f=c.uniforms,h=this._sizeLods[n]-1,_=isFinite(s)?Math.PI/(2*h):2*Math.PI/(2*so-1),g=s/_,m=isFinite(s)?1+Math.floor(u*g):so;m>so&&st(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${so}`);const p=[];let b=0;for(let T=0;T<so;++T){const R=T/g,w=Math.exp(-R*R/2);p.push(w),T===0?b+=w:T<m&&(b+=2*w)}for(let T=0;T<p.length;T++)p[T]=p[T]/b;f.envMap.value=e.texture,f.samples.value=m,f.weights.value=p,f.latitudinal.value=o==="latitudinal",a&&(f.poleAxis.value=a);const{_lodMax:x}=this;f.dTheta.value=_,f.mipInt.value=x-n;const v=this._sizeLods[i],E=3*v*(i>x-vs?i-x+vs:0),M=4*(this._cubeSize-v);jo(t,E,M,3*v,2*v),l.setRenderTarget(t),l.render(d,Ka)}}function W1(r){const e=[],t=[],n=[];let i=r;const s=r-vs+1+km.length;for(let o=0;o<s;o++){const a=Math.pow(2,i);e.push(a);let l=1/a;o>r-vs?l=km[o-r+vs-1]:o===0&&(l=0),t.push(l);const c=1/(a-2),u=-c,d=1+c,f=[u,u,d,u,d,d,u,u,d,d,u,d],h=6,_=6,g=3,m=2,p=1,b=new Float32Array(g*_*h),x=new Float32Array(m*_*h),v=new Float32Array(p*_*h);for(let M=0;M<h;M++){const T=M%3*2/3-1,R=M>2?0:-1,w=[T,R,0,T+2/3,R,0,T+2/3,R+1,0,T,R,0,T+2/3,R+1,0,T,R+1,0];b.set(w,g*_*M),x.set(f,m*_*M);const y=[M,M,M,M,M,M];v.set(y,p*_*M)}const E=new pi;E.setAttribute("position",new Jt(b,g)),E.setAttribute("uv",new Jt(x,m)),E.setAttribute("faceIndex",new Jt(v,p)),n.push(new Jn(E,null)),i>vs&&i--}return{lodMeshes:n,sizeLods:e,sigmas:t}}function Vm(r,e,t){const n=new Is(r,e,t);return n.texture.mapping=Gu,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function jo(r,e,t,n,i){r.viewport.set(e,t,n,i),r.scissor.set(e,t,n,i)}function X1(r,e,t){return new fi({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:H1,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:ju(),fragmentShader:`

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
		`,blending:Jr,depthTest:!1,depthWrite:!1})}function q1(r,e,t){const n=new Float32Array(so),i=new $(0,1,0);return new fi({name:"SphericalGaussianBlur",defines:{n:so,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:ju(),fragmentShader:`

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
		`,blending:Jr,depthTest:!1,depthWrite:!1})}function Hm(){return new fi({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:ju(),fragmentShader:`

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
		`,blending:Jr,depthTest:!1,depthWrite:!1})}function Gm(){return new fi({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:ju(),fragmentShader:`

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
	`}function Y1(r){let e=new WeakMap,t=null;function n(a){if(a&&a.isTexture){const l=a.mapping,c=l===yf||l===bf,u=l===ba||l===wa;if(c||u){let d=e.get(a);const f=d!==void 0?d.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==f)return t===null&&(t=new zm(r)),d=c?t.fromEquirectangular(a,d):t.fromCubemap(a,d),d.texture.pmremVersion=a.pmremVersion,e.set(a,d),d.texture;if(d!==void 0)return d.texture;{const h=a.image;return c&&h&&h.height>0||u&&h&&i(h)?(t===null&&(t=new zm(r)),d=c?t.fromEquirectangular(a):t.fromCubemap(a),d.texture.pmremVersion=a.pmremVersion,e.set(a,d),a.addEventListener("dispose",s),d.texture):null}}}return a}function i(a){let l=0;const c=6;for(let u=0;u<c;u++)a[u]!==void 0&&l++;return l===c}function s(a){const l=a.target;l.removeEventListener("dispose",s);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:o}}function $1(r){const e={};function t(n){if(e[n]!==void 0)return e[n];const i=r.getExtension(n);return e[n]=i,i}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const i=t(n);return i===null&&ql("WebGLRenderer: "+n+" extension not supported."),i}}}function j1(r,e,t,n){const i={},s=new WeakMap;function o(d){const f=d.target;f.index!==null&&e.remove(f.index);for(const _ in f.attributes)e.remove(f.attributes[_]);f.removeEventListener("dispose",o),delete i[f.id];const h=s.get(f);h&&(e.remove(h),s.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,t.memory.geometries--}function a(d,f){return i[f.id]===!0||(f.addEventListener("dispose",o),i[f.id]=!0,t.memory.geometries++),f}function l(d){const f=d.attributes;for(const h in f)e.update(f[h],r.ARRAY_BUFFER)}function c(d){const f=[],h=d.index,_=d.attributes.position;let g=0;if(h!==null){const b=h.array;g=h.version;for(let x=0,v=b.length;x<v;x+=3){const E=b[x+0],M=b[x+1],T=b[x+2];f.push(E,M,M,T,T,E)}}else if(_!==void 0){const b=_.array;g=_.version;for(let x=0,v=b.length/3-1;x<v;x+=3){const E=x+0,M=x+1,T=x+2;f.push(E,M,M,T,T,E)}}else return;const m=new(Xg(f)?Kg:jg)(f,1);m.version=g;const p=s.get(d);p&&e.remove(p),s.set(d,m)}function u(d){const f=s.get(d);if(f){const h=d.index;h!==null&&f.version<h.version&&c(d)}else c(d);return s.get(d)}return{get:a,update:l,getWireframeAttribute:u}}function K1(r,e,t){let n;function i(f){n=f}let s,o;function a(f){s=f.type,o=f.bytesPerElement}function l(f,h){r.drawElements(n,h,s,f*o),t.update(h,n,1)}function c(f,h,_){_!==0&&(r.drawElementsInstanced(n,h,s,f*o,_),t.update(h,n,_))}function u(f,h,_){if(_===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,h,0,s,f,0,_);let m=0;for(let p=0;p<_;p++)m+=h[p];t.update(m,n,1)}function d(f,h,_,g){if(_===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<f.length;p++)c(f[p]/o,h[p],g[p]);else{m.multiDrawElementsInstancedWEBGL(n,h,0,s,f,0,g,0,_);let p=0;for(let b=0;b<_;b++)p+=h[b]*g[b];t.update(p,n,1)}}this.setMode=i,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=u,this.renderMultiDrawInstances=d}function Z1(r){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,o,a){switch(t.calls++,o){case r.TRIANGLES:t.triangles+=a*(s/3);break;case r.LINES:t.lines+=a*(s/2);break;case r.LINE_STRIP:t.lines+=a*(s-1);break;case r.LINE_LOOP:t.lines+=a*s;break;case r.POINTS:t.points+=a*s;break;default:Rt("WebGLInfo: Unknown draw mode:",o);break}}function i(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:i,update:n}}function J1(r,e,t){const n=new WeakMap,i=new zt;function s(o,a,l){const c=o.morphTargetInfluences,u=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,d=u!==void 0?u.length:0;let f=n.get(a);if(f===void 0||f.count!==d){let y=function(){R.dispose(),n.delete(a),a.removeEventListener("dispose",y)};var h=y;f!==void 0&&f.texture.dispose();const _=a.morphAttributes.position!==void 0,g=a.morphAttributes.normal!==void 0,m=a.morphAttributes.color!==void 0,p=a.morphAttributes.position||[],b=a.morphAttributes.normal||[],x=a.morphAttributes.color||[];let v=0;_===!0&&(v=1),g===!0&&(v=2),m===!0&&(v=3);let E=a.attributes.position.count*v,M=1;E>e.maxTextureSize&&(M=Math.ceil(E/e.maxTextureSize),E=e.maxTextureSize);const T=new Float32Array(E*M*4*d),R=new qg(T,E,M,d);R.type=sr,R.needsUpdate=!0;const w=v*4;for(let D=0;D<d;D++){const N=p[D],V=b[D],j=x[D],k=E*M*4*D;for(let G=0;G<N.count;G++){const Y=G*w;_===!0&&(i.fromBufferAttribute(N,G),T[k+Y+0]=i.x,T[k+Y+1]=i.y,T[k+Y+2]=i.z,T[k+Y+3]=0),g===!0&&(i.fromBufferAttribute(V,G),T[k+Y+4]=i.x,T[k+Y+5]=i.y,T[k+Y+6]=i.z,T[k+Y+7]=0),m===!0&&(i.fromBufferAttribute(j,G),T[k+Y+8]=i.x,T[k+Y+9]=i.y,T[k+Y+10]=i.z,T[k+Y+11]=j.itemSize===4?i.w:1)}}f={count:d,texture:R,size:new Et(E,M)},n.set(a,f),a.addEventListener("dispose",y)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(r,"morphTexture",o.morphTexture,t);else{let _=0;for(let m=0;m<c.length;m++)_+=c[m];const g=a.morphTargetsRelative?1:1-_;l.getUniforms().setValue(r,"morphTargetBaseInfluence",g),l.getUniforms().setValue(r,"morphTargetInfluences",c)}l.getUniforms().setValue(r,"morphTargetsTexture",f.texture,t),l.getUniforms().setValue(r,"morphTargetsTextureSize",f.size)}return{update:s}}function Q1(r,e,t,n){let i=new WeakMap;function s(l){const c=n.render.frame,u=l.geometry,d=e.get(l,u);if(i.get(d)!==c&&(e.update(d),i.set(d,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),i.get(l)!==c&&(t.update(l.instanceMatrix,r.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,r.ARRAY_BUFFER),i.set(l,c))),l.isSkinnedMesh){const f=l.skeleton;i.get(f)!==c&&(f.update(),i.set(f,c))}return d}function o(){i=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:s,dispose:o}}const f_=new Rn,Wm=new r_(1,1),h_=new qg,p_=new $y,m_=new Jg,Xm=[],qm=[],Ym=new Float32Array(16),$m=new Float32Array(9),jm=new Float32Array(4);function za(r,e,t){const n=r[0];if(n<=0||n>0)return r;const i=e*t;let s=Xm[i];if(s===void 0&&(s=new Float32Array(i),Xm[i]=s),e!==0){n.toArray(s,0);for(let o=1,a=0;o!==e;++o)a+=t,r[o].toArray(s,a)}return s}function Pn(r,e){if(r.length!==e.length)return!1;for(let t=0,n=r.length;t<n;t++)if(r[t]!==e[t])return!1;return!0}function Ln(r,e){for(let t=0,n=e.length;t<n;t++)r[t]=e[t]}function Ku(r,e){let t=qm[e];t===void 0&&(t=new Int32Array(e),qm[e]=t);for(let n=0;n!==e;++n)t[n]=r.allocateTextureUnit();return t}function eM(r,e){const t=this.cache;t[0]!==e&&(r.uniform1f(this.addr,e),t[0]=e)}function tM(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Pn(t,e))return;r.uniform2fv(this.addr,e),Ln(t,e)}}function nM(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(r.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Pn(t,e))return;r.uniform3fv(this.addr,e),Ln(t,e)}}function iM(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Pn(t,e))return;r.uniform4fv(this.addr,e),Ln(t,e)}}function rM(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(Pn(t,e))return;r.uniformMatrix2fv(this.addr,!1,e),Ln(t,e)}else{if(Pn(t,n))return;jm.set(n),r.uniformMatrix2fv(this.addr,!1,jm),Ln(t,n)}}function sM(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(Pn(t,e))return;r.uniformMatrix3fv(this.addr,!1,e),Ln(t,e)}else{if(Pn(t,n))return;$m.set(n),r.uniformMatrix3fv(this.addr,!1,$m),Ln(t,n)}}function oM(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(Pn(t,e))return;r.uniformMatrix4fv(this.addr,!1,e),Ln(t,e)}else{if(Pn(t,n))return;Ym.set(n),r.uniformMatrix4fv(this.addr,!1,Ym),Ln(t,n)}}function aM(r,e){const t=this.cache;t[0]!==e&&(r.uniform1i(this.addr,e),t[0]=e)}function lM(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Pn(t,e))return;r.uniform2iv(this.addr,e),Ln(t,e)}}function cM(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Pn(t,e))return;r.uniform3iv(this.addr,e),Ln(t,e)}}function uM(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Pn(t,e))return;r.uniform4iv(this.addr,e),Ln(t,e)}}function dM(r,e){const t=this.cache;t[0]!==e&&(r.uniform1ui(this.addr,e),t[0]=e)}function fM(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Pn(t,e))return;r.uniform2uiv(this.addr,e),Ln(t,e)}}function hM(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Pn(t,e))return;r.uniform3uiv(this.addr,e),Ln(t,e)}}function pM(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Pn(t,e))return;r.uniform4uiv(this.addr,e),Ln(t,e)}}function mM(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i);let s;this.type===r.SAMPLER_2D_SHADOW?(Wm.compareFunction=Wg,s=Wm):s=f_,t.setTexture2D(e||s,i)}function gM(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture3D(e||p_,i)}function _M(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTextureCube(e||m_,i)}function xM(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture2DArray(e||h_,i)}function vM(r){switch(r){case 5126:return eM;case 35664:return tM;case 35665:return nM;case 35666:return iM;case 35674:return rM;case 35675:return sM;case 35676:return oM;case 5124:case 35670:return aM;case 35667:case 35671:return lM;case 35668:case 35672:return cM;case 35669:case 35673:return uM;case 5125:return dM;case 36294:return fM;case 36295:return hM;case 36296:return pM;case 35678:case 36198:case 36298:case 36306:case 35682:return mM;case 35679:case 36299:case 36307:return gM;case 35680:case 36300:case 36308:case 36293:return _M;case 36289:case 36303:case 36311:case 36292:return xM}}function yM(r,e){r.uniform1fv(this.addr,e)}function bM(r,e){const t=za(e,this.size,2);r.uniform2fv(this.addr,t)}function wM(r,e){const t=za(e,this.size,3);r.uniform3fv(this.addr,t)}function SM(r,e){const t=za(e,this.size,4);r.uniform4fv(this.addr,t)}function MM(r,e){const t=za(e,this.size,4);r.uniformMatrix2fv(this.addr,!1,t)}function TM(r,e){const t=za(e,this.size,9);r.uniformMatrix3fv(this.addr,!1,t)}function EM(r,e){const t=za(e,this.size,16);r.uniformMatrix4fv(this.addr,!1,t)}function AM(r,e){r.uniform1iv(this.addr,e)}function CM(r,e){r.uniform2iv(this.addr,e)}function RM(r,e){r.uniform3iv(this.addr,e)}function PM(r,e){r.uniform4iv(this.addr,e)}function LM(r,e){r.uniform1uiv(this.addr,e)}function DM(r,e){r.uniform2uiv(this.addr,e)}function IM(r,e){r.uniform3uiv(this.addr,e)}function OM(r,e){r.uniform4uiv(this.addr,e)}function NM(r,e,t){const n=this.cache,i=e.length,s=Ku(t,i);Pn(n,s)||(r.uniform1iv(this.addr,s),Ln(n,s));for(let o=0;o!==i;++o)t.setTexture2D(e[o]||f_,s[o])}function FM(r,e,t){const n=this.cache,i=e.length,s=Ku(t,i);Pn(n,s)||(r.uniform1iv(this.addr,s),Ln(n,s));for(let o=0;o!==i;++o)t.setTexture3D(e[o]||p_,s[o])}function UM(r,e,t){const n=this.cache,i=e.length,s=Ku(t,i);Pn(n,s)||(r.uniform1iv(this.addr,s),Ln(n,s));for(let o=0;o!==i;++o)t.setTextureCube(e[o]||m_,s[o])}function kM(r,e,t){const n=this.cache,i=e.length,s=Ku(t,i);Pn(n,s)||(r.uniform1iv(this.addr,s),Ln(n,s));for(let o=0;o!==i;++o)t.setTexture2DArray(e[o]||h_,s[o])}function BM(r){switch(r){case 5126:return yM;case 35664:return bM;case 35665:return wM;case 35666:return SM;case 35674:return MM;case 35675:return TM;case 35676:return EM;case 5124:case 35670:return AM;case 35667:case 35671:return CM;case 35668:case 35672:return RM;case 35669:case 35673:return PM;case 5125:return LM;case 36294:return DM;case 36295:return IM;case 36296:return OM;case 35678:case 36198:case 36298:case 36306:case 35682:return NM;case 35679:case 36299:case 36307:return FM;case 35680:case 36300:case 36308:case 36293:return UM;case 36289:case 36303:case 36311:case 36292:return kM}}class zM{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=vM(t.type)}}class VM{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=BM(t.type)}}class HM{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const i=this.seq;for(let s=0,o=i.length;s!==o;++s){const a=i[s];a.setValue(e,t[a.id],n)}}}const kd=/(\w+)(\])?(\[|\.)?/g;function Km(r,e){r.seq.push(e),r.map[e.id]=e}function GM(r,e,t){const n=r.name,i=n.length;for(kd.lastIndex=0;;){const s=kd.exec(n),o=kd.lastIndex;let a=s[1];const l=s[2]==="]",c=s[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===i){Km(t,c===void 0?new zM(a,r,e):new VM(a,r,e));break}else{let d=t.map[a];d===void 0&&(d=new HM(a),Km(t,d)),t=d}}}class ou{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){const s=e.getActiveUniform(t,i),o=e.getUniformLocation(t,s.name);GM(s,o,this)}}setValue(e,t,n,i){const s=this.map[t];s!==void 0&&s.setValue(e,n,i)}setOptional(e,t,n){const i=t[n];i!==void 0&&this.setValue(e,n,i)}static upload(e,t,n,i){for(let s=0,o=t.length;s!==o;++s){const a=t[s],l=n[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,i)}}static seqWithValue(e,t){const n=[];for(let i=0,s=e.length;i!==s;++i){const o=e[i];o.id in t&&n.push(o)}return n}}function Zm(r,e,t){const n=r.createShader(e);return r.shaderSource(n,t),r.compileShader(n),n}const WM=37297;let XM=0;function qM(r,e){const t=r.split(`
`),n=[],i=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let o=i;o<s;o++){const a=o+1;n.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return n.join(`
`)}const Jm=new xt;function YM(r){It._getMatrix(Jm,It.workingColorSpace,r);const e=`mat3( ${Jm.elements.map(t=>t.toFixed(4))} )`;switch(It.getTransfer(r)){case yu:return[e,"LinearTransferOETF"];case Kt:return[e,"sRGBTransferOETF"];default:return st("WebGLProgram: Unsupported color space: ",r),[e,"LinearTransferOETF"]}}function Qm(r,e,t){const n=r.getShaderParameter(e,r.COMPILE_STATUS),s=(r.getShaderInfoLog(e)||"").trim();if(n&&s==="")return"";const o=/ERROR: 0:(\d+)/.exec(s);if(o){const a=parseInt(o[1]);return t.toUpperCase()+`

`+s+`

`+qM(r.getShaderSource(e),a)}else return s}function $M(r,e){const t=YM(e);return[`vec4 ${r}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function jM(r,e){let t;switch(e){case ry:t="Linear";break;case sy:t="Reinhard";break;case oy:t="Cineon";break;case ay:t="ACESFilmic";break;case cy:t="AgX";break;case uy:t="Neutral";break;case ly:t="Custom";break;default:st("WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+r+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Nc=new $;function KM(){It.getLuminanceCoefficients(Nc);const r=Nc.x.toFixed(4),e=Nc.y.toFixed(4),t=Nc.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${r}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function ZM(r){return[r.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",r.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(ll).join(`
`)}function JM(r){const e=[];for(const t in r){const n=r[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function QM(r,e){const t={},n=r.getProgramParameter(e,r.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){const s=r.getActiveAttrib(e,i),o=s.name;let a=1;s.type===r.FLOAT_MAT2&&(a=2),s.type===r.FLOAT_MAT3&&(a=3),s.type===r.FLOAT_MAT4&&(a=4),t[o]={type:s.type,location:r.getAttribLocation(e,o),locationSize:a}}return t}function ll(r){return r!==""}function e0(r,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return r.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function t0(r,e){return r.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const eT=/^[ \t]*#include +<([\w\d./]+)>/gm;function th(r){return r.replace(eT,nT)}const tT=new Map;function nT(r,e){let t=vt[e];if(t===void 0){const n=tT.get(e);if(n!==void 0)t=vt[n],st('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return th(t)}const iT=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function n0(r){return r.replace(iT,rT)}function rT(r,e,t,n){let i="";for(let s=parseInt(e);s<parseInt(t);s++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return i}function i0(r){let e=`precision ${r.precision} float;
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
#define LOW_PRECISION`),e}function sT(r){let e="SHADOWMAP_TYPE_BASIC";return r.shadowMapType===Dg?e="SHADOWMAP_TYPE_PCF":r.shadowMapType===Uv?e="SHADOWMAP_TYPE_PCF_SOFT":r.shadowMapType===Hr&&(e="SHADOWMAP_TYPE_VSM"),e}function oT(r){let e="ENVMAP_TYPE_CUBE";if(r.envMap)switch(r.envMapMode){case ba:case wa:e="ENVMAP_TYPE_CUBE";break;case Gu:e="ENVMAP_TYPE_CUBE_UV";break}return e}function aT(r){let e="ENVMAP_MODE_REFLECTION";if(r.envMap)switch(r.envMapMode){case wa:e="ENVMAP_MODE_REFRACTION";break}return e}function lT(r){let e="ENVMAP_BLENDING_NONE";if(r.envMap)switch(r.combine){case Ig:e="ENVMAP_BLENDING_MULTIPLY";break;case ny:e="ENVMAP_BLENDING_MIX";break;case iy:e="ENVMAP_BLENDING_ADD";break}return e}function cT(r){const e=r.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function uT(r,e,t,n){const i=r.getContext(),s=t.defines;let o=t.vertexShader,a=t.fragmentShader;const l=sT(t),c=oT(t),u=aT(t),d=lT(t),f=cT(t),h=ZM(t),_=JM(s),g=i.createProgram();let m,p,b=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(ll).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(ll).join(`
`),p.length>0&&(p+=`
`)):(m=[i0(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ll).join(`
`),p=[i0(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+u:"",t.envMap?"#define "+d:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Cs?"#define TONE_MAPPING":"",t.toneMapping!==Cs?vt.tonemapping_pars_fragment:"",t.toneMapping!==Cs?jM("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",vt.colorspace_pars_fragment,$M("linearToOutputTexel",t.outputColorSpace),KM(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(ll).join(`
`)),o=th(o),o=e0(o,t),o=t0(o,t),a=th(a),a=e0(a,t),a=t0(a,t),o=n0(o),a=n0(a),t.isRawShaderMaterial!==!0&&(b=`#version 300 es
`,m=[h,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",t.glslVersion===em?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===em?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const x=b+m+o,v=b+p+a,E=Zm(i,i.VERTEX_SHADER,x),M=Zm(i,i.FRAGMENT_SHADER,v);i.attachShader(g,E),i.attachShader(g,M),t.index0AttributeName!==void 0?i.bindAttribLocation(g,0,t.index0AttributeName):t.morphTargets===!0&&i.bindAttribLocation(g,0,"position"),i.linkProgram(g);function T(D){if(r.debug.checkShaderErrors){const N=i.getProgramInfoLog(g)||"",V=i.getShaderInfoLog(E)||"",j=i.getShaderInfoLog(M)||"",k=N.trim(),G=V.trim(),Y=j.trim();let F=!0,ae=!0;if(i.getProgramParameter(g,i.LINK_STATUS)===!1)if(F=!1,typeof r.debug.onShaderError=="function")r.debug.onShaderError(i,g,E,M);else{const O=Qm(i,E,"vertex"),he=Qm(i,M,"fragment");Rt("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(g,i.VALIDATE_STATUS)+`

Material Name: `+D.name+`
Material Type: `+D.type+`

Program Info Log: `+k+`
`+O+`
`+he)}else k!==""?st("WebGLProgram: Program Info Log:",k):(G===""||Y==="")&&(ae=!1);ae&&(D.diagnostics={runnable:F,programLog:k,vertexShader:{log:G,prefix:m},fragmentShader:{log:Y,prefix:p}})}i.deleteShader(E),i.deleteShader(M),R=new ou(i,g),w=QM(i,g)}let R;this.getUniforms=function(){return R===void 0&&T(this),R};let w;this.getAttributes=function(){return w===void 0&&T(this),w};let y=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return y===!1&&(y=i.getProgramParameter(g,WM)),y},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(g),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=XM++,this.cacheKey=e,this.usedTimes=1,this.program=g,this.vertexShader=E,this.fragmentShader=M,this}let dT=0;class fT{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,i=this._getShaderStage(t),s=this._getShaderStage(n),o=this._getShaderCacheForMaterial(e);return o.has(i)===!1&&(o.add(i),i.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new hT(e),t.set(e,n)),n}}class hT{constructor(e){this.id=dT++,this.code=e,this.usedTimes=0}}function pT(r,e,t,n,i,s,o){const a=new Yg,l=new fT,c=new Set,u=[],d=i.logarithmicDepthBuffer,f=i.vertexTextures;let h=i.precision;const _={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(w){return c.add(w),w===0?"uv":`uv${w}`}function m(w,y,D,N,V){const j=N.fog,k=V.geometry,G=w.isMeshStandardMaterial?N.environment:null,Y=(w.isMeshStandardMaterial?t:e).get(w.envMap||G),F=Y&&Y.mapping===Gu?Y.image.height:null,ae=_[w.type];w.precision!==null&&(h=i.getMaxPrecision(w.precision),h!==w.precision&&st("WebGLProgram.getParameters:",w.precision,"not supported, using",h,"instead."));const O=k.morphAttributes.position||k.morphAttributes.normal||k.morphAttributes.color,he=O!==void 0?O.length:0;let P=0;k.morphAttributes.position!==void 0&&(P=1),k.morphAttributes.normal!==void 0&&(P=2),k.morphAttributes.color!==void 0&&(P=3);let Me,Ne,ze,te;if(ae){const Se=vr[ae];Me=Se.vertexShader,Ne=Se.fragmentShader}else Me=w.vertexShader,Ne=w.fragmentShader,l.update(w),ze=l.getVertexShaderID(w),te=l.getFragmentShaderID(w);const ie=r.getRenderTarget(),K=r.state.buffers.depth.getReversed(),Ue=V.isInstancedMesh===!0,be=V.isBatchedMesh===!0,je=!!w.map,pt=!!w.matcap,Te=!!Y,tt=!!w.aoMap,U=!!w.lightMap,ot=!!w.bumpMap,X=!!w.normalMap,ft=!!w.displacementMap,Le=!!w.emissiveMap,wt=!!w.metalnessMap,Re=!!w.roughnessMap,Fe=w.anisotropy>0,I=w.clearcoat>0,C=w.dispersion>0,q=w.iridescence>0,oe=w.sheen>0,se=w.transmission>0,Q=Fe&&!!w.anisotropyMap,ke=I&&!!w.clearcoatMap,ve=I&&!!w.clearcoatNormalMap,Qe=I&&!!w.clearcoatRoughnessMap,Ce=q&&!!w.iridescenceMap,le=q&&!!w.iridescenceThicknessMap,me=oe&&!!w.sheenColorMap,Ge=oe&&!!w.sheenRoughnessMap,Ie=!!w.specularMap,Ee=!!w.specularColorMap,et=!!w.specularIntensityMap,L=se&&!!w.transmissionMap,xe=se&&!!w.thicknessMap,ge=!!w.gradientMap,_e=!!w.alphaMap,ne=w.alphaTest>0,ce=!!w.alphaHash,Ve=!!w.extensions;let we=Cs;w.toneMapped&&(ie===null||ie.isXRRenderTarget===!0)&&(we=r.toneMapping);const Ft={shaderID:ae,shaderType:w.type,shaderName:w.name,vertexShader:Me,fragmentShader:Ne,defines:w.defines,customVertexShaderID:ze,customFragmentShaderID:te,isRawShaderMaterial:w.isRawShaderMaterial===!0,glslVersion:w.glslVersion,precision:h,batching:be,batchingColor:be&&V._colorsTexture!==null,instancing:Ue,instancingColor:Ue&&V.instanceColor!==null,instancingMorph:Ue&&V.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:ie===null?r.outputColorSpace:ie.isXRRenderTarget===!0?ie.texture.colorSpace:Zn,alphaToCoverage:!!w.alphaToCoverage,map:je,matcap:pt,envMap:Te,envMapMode:Te&&Y.mapping,envMapCubeUVHeight:F,aoMap:tt,lightMap:U,bumpMap:ot,normalMap:X,displacementMap:f&&ft,emissiveMap:Le,normalMapObjectSpace:X&&w.normalMapType===gy,normalMapTangentSpace:X&&w.normalMapType===Gg,metalnessMap:wt,roughnessMap:Re,anisotropy:Fe,anisotropyMap:Q,clearcoat:I,clearcoatMap:ke,clearcoatNormalMap:ve,clearcoatRoughnessMap:Qe,dispersion:C,iridescence:q,iridescenceMap:Ce,iridescenceThicknessMap:le,sheen:oe,sheenColorMap:me,sheenRoughnessMap:Ge,specularMap:Ie,specularColorMap:Ee,specularIntensityMap:et,transmission:se,transmissionMap:L,thicknessMap:xe,gradientMap:ge,opaque:w.transparent===!1&&w.blending===As&&w.alphaToCoverage===!1,alphaMap:_e,alphaTest:ne,alphaHash:ce,combine:w.combine,mapUv:je&&g(w.map.channel),aoMapUv:tt&&g(w.aoMap.channel),lightMapUv:U&&g(w.lightMap.channel),bumpMapUv:ot&&g(w.bumpMap.channel),normalMapUv:X&&g(w.normalMap.channel),displacementMapUv:ft&&g(w.displacementMap.channel),emissiveMapUv:Le&&g(w.emissiveMap.channel),metalnessMapUv:wt&&g(w.metalnessMap.channel),roughnessMapUv:Re&&g(w.roughnessMap.channel),anisotropyMapUv:Q&&g(w.anisotropyMap.channel),clearcoatMapUv:ke&&g(w.clearcoatMap.channel),clearcoatNormalMapUv:ve&&g(w.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Qe&&g(w.clearcoatRoughnessMap.channel),iridescenceMapUv:Ce&&g(w.iridescenceMap.channel),iridescenceThicknessMapUv:le&&g(w.iridescenceThicknessMap.channel),sheenColorMapUv:me&&g(w.sheenColorMap.channel),sheenRoughnessMapUv:Ge&&g(w.sheenRoughnessMap.channel),specularMapUv:Ie&&g(w.specularMap.channel),specularColorMapUv:Ee&&g(w.specularColorMap.channel),specularIntensityMapUv:et&&g(w.specularIntensityMap.channel),transmissionMapUv:L&&g(w.transmissionMap.channel),thicknessMapUv:xe&&g(w.thicknessMap.channel),alphaMapUv:_e&&g(w.alphaMap.channel),vertexTangents:!!k.attributes.tangent&&(X||Fe),vertexColors:w.vertexColors,vertexAlphas:w.vertexColors===!0&&!!k.attributes.color&&k.attributes.color.itemSize===4,pointsUvs:V.isPoints===!0&&!!k.attributes.uv&&(je||_e),fog:!!j,useFog:w.fog===!0,fogExp2:!!j&&j.isFogExp2,flatShading:w.flatShading===!0&&w.wireframe===!1,sizeAttenuation:w.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:K,skinning:V.isSkinnedMesh===!0,morphTargets:k.morphAttributes.position!==void 0,morphNormals:k.morphAttributes.normal!==void 0,morphColors:k.morphAttributes.color!==void 0,morphTargetsCount:he,morphTextureStride:P,numDirLights:y.directional.length,numPointLights:y.point.length,numSpotLights:y.spot.length,numSpotLightMaps:y.spotLightMap.length,numRectAreaLights:y.rectArea.length,numHemiLights:y.hemi.length,numDirLightShadows:y.directionalShadowMap.length,numPointLightShadows:y.pointShadowMap.length,numSpotLightShadows:y.spotShadowMap.length,numSpotLightShadowsWithMaps:y.numSpotLightShadowsWithMaps,numLightProbes:y.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:w.dithering,shadowMapEnabled:r.shadowMap.enabled&&D.length>0,shadowMapType:r.shadowMap.type,toneMapping:we,decodeVideoTexture:je&&w.map.isVideoTexture===!0&&It.getTransfer(w.map.colorSpace)===Kt,decodeVideoTextureEmissive:Le&&w.emissiveMap.isVideoTexture===!0&&It.getTransfer(w.emissiveMap.colorSpace)===Kt,premultipliedAlpha:w.premultipliedAlpha,doubleSided:w.side===Wi,flipSided:w.side===_i,useDepthPacking:w.depthPacking>=0,depthPacking:w.depthPacking||0,index0AttributeName:w.index0AttributeName,extensionClipCullDistance:Ve&&w.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Ve&&w.extensions.multiDraw===!0||be)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:w.customProgramCacheKey()};return Ft.vertexUv1s=c.has(1),Ft.vertexUv2s=c.has(2),Ft.vertexUv3s=c.has(3),c.clear(),Ft}function p(w){const y=[];if(w.shaderID?y.push(w.shaderID):(y.push(w.customVertexShaderID),y.push(w.customFragmentShaderID)),w.defines!==void 0)for(const D in w.defines)y.push(D),y.push(w.defines[D]);return w.isRawShaderMaterial===!1&&(b(y,w),x(y,w),y.push(r.outputColorSpace)),y.push(w.customProgramCacheKey),y.join()}function b(w,y){w.push(y.precision),w.push(y.outputColorSpace),w.push(y.envMapMode),w.push(y.envMapCubeUVHeight),w.push(y.mapUv),w.push(y.alphaMapUv),w.push(y.lightMapUv),w.push(y.aoMapUv),w.push(y.bumpMapUv),w.push(y.normalMapUv),w.push(y.displacementMapUv),w.push(y.emissiveMapUv),w.push(y.metalnessMapUv),w.push(y.roughnessMapUv),w.push(y.anisotropyMapUv),w.push(y.clearcoatMapUv),w.push(y.clearcoatNormalMapUv),w.push(y.clearcoatRoughnessMapUv),w.push(y.iridescenceMapUv),w.push(y.iridescenceThicknessMapUv),w.push(y.sheenColorMapUv),w.push(y.sheenRoughnessMapUv),w.push(y.specularMapUv),w.push(y.specularColorMapUv),w.push(y.specularIntensityMapUv),w.push(y.transmissionMapUv),w.push(y.thicknessMapUv),w.push(y.combine),w.push(y.fogExp2),w.push(y.sizeAttenuation),w.push(y.morphTargetsCount),w.push(y.morphAttributeCount),w.push(y.numDirLights),w.push(y.numPointLights),w.push(y.numSpotLights),w.push(y.numSpotLightMaps),w.push(y.numHemiLights),w.push(y.numRectAreaLights),w.push(y.numDirLightShadows),w.push(y.numPointLightShadows),w.push(y.numSpotLightShadows),w.push(y.numSpotLightShadowsWithMaps),w.push(y.numLightProbes),w.push(y.shadowMapType),w.push(y.toneMapping),w.push(y.numClippingPlanes),w.push(y.numClipIntersection),w.push(y.depthPacking)}function x(w,y){a.disableAll(),y.supportsVertexTextures&&a.enable(0),y.instancing&&a.enable(1),y.instancingColor&&a.enable(2),y.instancingMorph&&a.enable(3),y.matcap&&a.enable(4),y.envMap&&a.enable(5),y.normalMapObjectSpace&&a.enable(6),y.normalMapTangentSpace&&a.enable(7),y.clearcoat&&a.enable(8),y.iridescence&&a.enable(9),y.alphaTest&&a.enable(10),y.vertexColors&&a.enable(11),y.vertexAlphas&&a.enable(12),y.vertexUv1s&&a.enable(13),y.vertexUv2s&&a.enable(14),y.vertexUv3s&&a.enable(15),y.vertexTangents&&a.enable(16),y.anisotropy&&a.enable(17),y.alphaHash&&a.enable(18),y.batching&&a.enable(19),y.dispersion&&a.enable(20),y.batchingColor&&a.enable(21),y.gradientMap&&a.enable(22),w.push(a.mask),a.disableAll(),y.fog&&a.enable(0),y.useFog&&a.enable(1),y.flatShading&&a.enable(2),y.logarithmicDepthBuffer&&a.enable(3),y.reversedDepthBuffer&&a.enable(4),y.skinning&&a.enable(5),y.morphTargets&&a.enable(6),y.morphNormals&&a.enable(7),y.morphColors&&a.enable(8),y.premultipliedAlpha&&a.enable(9),y.shadowMapEnabled&&a.enable(10),y.doubleSided&&a.enable(11),y.flipSided&&a.enable(12),y.useDepthPacking&&a.enable(13),y.dithering&&a.enable(14),y.transmission&&a.enable(15),y.sheen&&a.enable(16),y.opaque&&a.enable(17),y.pointsUvs&&a.enable(18),y.decodeVideoTexture&&a.enable(19),y.decodeVideoTextureEmissive&&a.enable(20),y.alphaToCoverage&&a.enable(21),w.push(a.mask)}function v(w){const y=_[w.type];let D;if(y){const N=vr[y];D=ab.clone(N.uniforms)}else D=w.uniforms;return D}function E(w,y){let D;for(let N=0,V=u.length;N<V;N++){const j=u[N];if(j.cacheKey===y){D=j,++D.usedTimes;break}}return D===void 0&&(D=new uT(r,y,w,s),u.push(D)),D}function M(w){if(--w.usedTimes===0){const y=u.indexOf(w);u[y]=u[u.length-1],u.pop(),w.destroy()}}function T(w){l.remove(w)}function R(){l.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:v,acquireProgram:E,releaseProgram:M,releaseShaderCache:T,programs:u,dispose:R}}function mT(){let r=new WeakMap;function e(o){return r.has(o)}function t(o){let a=r.get(o);return a===void 0&&(a={},r.set(o,a)),a}function n(o){r.delete(o)}function i(o,a,l){r.get(o)[a]=l}function s(){r=new WeakMap}return{has:e,get:t,remove:n,update:i,dispose:s}}function gT(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.material.id!==e.material.id?r.material.id-e.material.id:r.z!==e.z?r.z-e.z:r.id-e.id}function r0(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.z!==e.z?e.z-r.z:r.id-e.id}function s0(){const r=[];let e=0;const t=[],n=[],i=[];function s(){e=0,t.length=0,n.length=0,i.length=0}function o(d,f,h,_,g,m){let p=r[e];return p===void 0?(p={id:d.id,object:d,geometry:f,material:h,groupOrder:_,renderOrder:d.renderOrder,z:g,group:m},r[e]=p):(p.id=d.id,p.object=d,p.geometry=f,p.material=h,p.groupOrder=_,p.renderOrder=d.renderOrder,p.z=g,p.group=m),e++,p}function a(d,f,h,_,g,m){const p=o(d,f,h,_,g,m);h.transmission>0?n.push(p):h.transparent===!0?i.push(p):t.push(p)}function l(d,f,h,_,g,m){const p=o(d,f,h,_,g,m);h.transmission>0?n.unshift(p):h.transparent===!0?i.unshift(p):t.unshift(p)}function c(d,f){t.length>1&&t.sort(d||gT),n.length>1&&n.sort(f||r0),i.length>1&&i.sort(f||r0)}function u(){for(let d=e,f=r.length;d<f;d++){const h=r[d];if(h.id===null)break;h.id=null,h.object=null,h.geometry=null,h.material=null,h.group=null}}return{opaque:t,transmissive:n,transparent:i,init:s,push:a,unshift:l,finish:u,sort:c}}function _T(){let r=new WeakMap;function e(n,i){const s=r.get(n);let o;return s===void 0?(o=new s0,r.set(n,[o])):i>=s.length?(o=new s0,s.push(o)):o=s[i],o}function t(){r=new WeakMap}return{get:e,dispose:t}}function xT(){const r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new $,color:new $e};break;case"SpotLight":t={position:new $,direction:new $,color:new $e,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new $,color:new $e,distance:0,decay:0};break;case"HemisphereLight":t={direction:new $,skyColor:new $e,groundColor:new $e};break;case"RectAreaLight":t={color:new $e,position:new $,halfWidth:new $,halfHeight:new $};break}return r[e.id]=t,t}}}function vT(){const r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Et};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Et};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Et,shadowCameraNear:1,shadowCameraFar:1e3};break}return r[e.id]=t,t}}}let yT=0;function bT(r,e){return(e.castShadow?2:0)-(r.castShadow?2:0)+(e.map?1:0)-(r.map?1:0)}function wT(r){const e=new xT,t=vT(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new $);const i=new $,s=new yt,o=new yt;function a(c){let u=0,d=0,f=0;for(let w=0;w<9;w++)n.probe[w].set(0,0,0);let h=0,_=0,g=0,m=0,p=0,b=0,x=0,v=0,E=0,M=0,T=0;c.sort(bT);for(let w=0,y=c.length;w<y;w++){const D=c[w],N=D.color,V=D.intensity,j=D.distance,k=D.shadow&&D.shadow.map?D.shadow.map.texture:null;if(D.isAmbientLight)u+=N.r*V,d+=N.g*V,f+=N.b*V;else if(D.isLightProbe){for(let G=0;G<9;G++)n.probe[G].addScaledVector(D.sh.coefficients[G],V);T++}else if(D.isDirectionalLight){const G=e.get(D);if(G.color.copy(D.color).multiplyScalar(D.intensity),D.castShadow){const Y=D.shadow,F=t.get(D);F.shadowIntensity=Y.intensity,F.shadowBias=Y.bias,F.shadowNormalBias=Y.normalBias,F.shadowRadius=Y.radius,F.shadowMapSize=Y.mapSize,n.directionalShadow[h]=F,n.directionalShadowMap[h]=k,n.directionalShadowMatrix[h]=D.shadow.matrix,b++}n.directional[h]=G,h++}else if(D.isSpotLight){const G=e.get(D);G.position.setFromMatrixPosition(D.matrixWorld),G.color.copy(N).multiplyScalar(V),G.distance=j,G.coneCos=Math.cos(D.angle),G.penumbraCos=Math.cos(D.angle*(1-D.penumbra)),G.decay=D.decay,n.spot[g]=G;const Y=D.shadow;if(D.map&&(n.spotLightMap[E]=D.map,E++,Y.updateMatrices(D),D.castShadow&&M++),n.spotLightMatrix[g]=Y.matrix,D.castShadow){const F=t.get(D);F.shadowIntensity=Y.intensity,F.shadowBias=Y.bias,F.shadowNormalBias=Y.normalBias,F.shadowRadius=Y.radius,F.shadowMapSize=Y.mapSize,n.spotShadow[g]=F,n.spotShadowMap[g]=k,v++}g++}else if(D.isRectAreaLight){const G=e.get(D);G.color.copy(N).multiplyScalar(V),G.halfWidth.set(D.width*.5,0,0),G.halfHeight.set(0,D.height*.5,0),n.rectArea[m]=G,m++}else if(D.isPointLight){const G=e.get(D);if(G.color.copy(D.color).multiplyScalar(D.intensity),G.distance=D.distance,G.decay=D.decay,D.castShadow){const Y=D.shadow,F=t.get(D);F.shadowIntensity=Y.intensity,F.shadowBias=Y.bias,F.shadowNormalBias=Y.normalBias,F.shadowRadius=Y.radius,F.shadowMapSize=Y.mapSize,F.shadowCameraNear=Y.camera.near,F.shadowCameraFar=Y.camera.far,n.pointShadow[_]=F,n.pointShadowMap[_]=k,n.pointShadowMatrix[_]=D.shadow.matrix,x++}n.point[_]=G,_++}else if(D.isHemisphereLight){const G=e.get(D);G.skyColor.copy(D.color).multiplyScalar(V),G.groundColor.copy(D.groundColor).multiplyScalar(V),n.hemi[p]=G,p++}}m>0&&(r.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Oe.LTC_FLOAT_1,n.rectAreaLTC2=Oe.LTC_FLOAT_2):(n.rectAreaLTC1=Oe.LTC_HALF_1,n.rectAreaLTC2=Oe.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=d,n.ambient[2]=f;const R=n.hash;(R.directionalLength!==h||R.pointLength!==_||R.spotLength!==g||R.rectAreaLength!==m||R.hemiLength!==p||R.numDirectionalShadows!==b||R.numPointShadows!==x||R.numSpotShadows!==v||R.numSpotMaps!==E||R.numLightProbes!==T)&&(n.directional.length=h,n.spot.length=g,n.rectArea.length=m,n.point.length=_,n.hemi.length=p,n.directionalShadow.length=b,n.directionalShadowMap.length=b,n.pointShadow.length=x,n.pointShadowMap.length=x,n.spotShadow.length=v,n.spotShadowMap.length=v,n.directionalShadowMatrix.length=b,n.pointShadowMatrix.length=x,n.spotLightMatrix.length=v+E-M,n.spotLightMap.length=E,n.numSpotLightShadowsWithMaps=M,n.numLightProbes=T,R.directionalLength=h,R.pointLength=_,R.spotLength=g,R.rectAreaLength=m,R.hemiLength=p,R.numDirectionalShadows=b,R.numPointShadows=x,R.numSpotShadows=v,R.numSpotMaps=E,R.numLightProbes=T,n.version=yT++)}function l(c,u){let d=0,f=0,h=0,_=0,g=0;const m=u.matrixWorldInverse;for(let p=0,b=c.length;p<b;p++){const x=c[p];if(x.isDirectionalLight){const v=n.directional[d];v.direction.setFromMatrixPosition(x.matrixWorld),i.setFromMatrixPosition(x.target.matrixWorld),v.direction.sub(i),v.direction.transformDirection(m),d++}else if(x.isSpotLight){const v=n.spot[h];v.position.setFromMatrixPosition(x.matrixWorld),v.position.applyMatrix4(m),v.direction.setFromMatrixPosition(x.matrixWorld),i.setFromMatrixPosition(x.target.matrixWorld),v.direction.sub(i),v.direction.transformDirection(m),h++}else if(x.isRectAreaLight){const v=n.rectArea[_];v.position.setFromMatrixPosition(x.matrixWorld),v.position.applyMatrix4(m),o.identity(),s.copy(x.matrixWorld),s.premultiply(m),o.extractRotation(s),v.halfWidth.set(x.width*.5,0,0),v.halfHeight.set(0,x.height*.5,0),v.halfWidth.applyMatrix4(o),v.halfHeight.applyMatrix4(o),_++}else if(x.isPointLight){const v=n.point[f];v.position.setFromMatrixPosition(x.matrixWorld),v.position.applyMatrix4(m),f++}else if(x.isHemisphereLight){const v=n.hemi[g];v.direction.setFromMatrixPosition(x.matrixWorld),v.direction.transformDirection(m),g++}}}return{setup:a,setupView:l,state:n}}function o0(r){const e=new wT(r),t=[],n=[];function i(u){c.camera=u,t.length=0,n.length=0}function s(u){t.push(u)}function o(u){n.push(u)}function a(){e.setup(t)}function l(u){e.setupView(t,u)}const c={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:i,state:c,setupLights:a,setupLightsView:l,pushLight:s,pushShadow:o}}function ST(r){let e=new WeakMap;function t(i,s=0){const o=e.get(i);let a;return o===void 0?(a=new o0(r),e.set(i,[a])):s>=o.length?(a=new o0(r),o.push(a)):a=o[s],a}function n(){e=new WeakMap}return{get:t,dispose:n}}const MT=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,TT=`uniform sampler2D shadow_pass;
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
}`;function ET(r,e,t){let n=new rp;const i=new Et,s=new Et,o=new zt,a=new wb({depthPacking:my}),l=new Sb,c={},u=t.maxTextureSize,d={[ts]:_i,[_i]:ts,[Wi]:Wi},f=new fi({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Et},radius:{value:4}},vertexShader:MT,fragmentShader:TT}),h=f.clone();h.defines.HORIZONTAL_PASS=1;const _=new pi;_.setAttribute("position",new Jt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const g=new Jn(_,f),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Dg;let p=this.type;this.render=function(M,T,R){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||M.length===0)return;const w=r.getRenderTarget(),y=r.getActiveCubeFace(),D=r.getActiveMipmapLevel(),N=r.state;N.setBlending(Jr),N.buffers.depth.getReversed()===!0?N.buffers.color.setClear(0,0,0,0):N.buffers.color.setClear(1,1,1,1),N.buffers.depth.setTest(!0),N.setScissorTest(!1);const V=p!==Hr&&this.type===Hr,j=p===Hr&&this.type!==Hr;for(let k=0,G=M.length;k<G;k++){const Y=M[k],F=Y.shadow;if(F===void 0){st("WebGLShadowMap:",Y,"has no shadow.");continue}if(F.autoUpdate===!1&&F.needsUpdate===!1)continue;i.copy(F.mapSize);const ae=F.getFrameExtents();if(i.multiply(ae),s.copy(F.mapSize),(i.x>u||i.y>u)&&(i.x>u&&(s.x=Math.floor(u/ae.x),i.x=s.x*ae.x,F.mapSize.x=s.x),i.y>u&&(s.y=Math.floor(u/ae.y),i.y=s.y*ae.y,F.mapSize.y=s.y)),F.map===null||V===!0||j===!0){const he=this.type!==Hr?{minFilter:hi,magFilter:hi}:{};F.map!==null&&F.map.dispose(),F.map=new Is(i.x,i.y,he),F.map.texture.name=Y.name+".shadowMap",F.camera.updateProjectionMatrix()}r.setRenderTarget(F.map),r.clear();const O=F.getViewportCount();for(let he=0;he<O;he++){const P=F.getViewport(he);o.set(s.x*P.x,s.y*P.y,s.x*P.z,s.y*P.w),N.viewport(o),F.updateMatrices(Y,he),n=F.getFrustum(),v(T,R,F.camera,Y,this.type)}F.isPointLightShadow!==!0&&this.type===Hr&&b(F,R),F.needsUpdate=!1}p=this.type,m.needsUpdate=!1,r.setRenderTarget(w,y,D)};function b(M,T){const R=e.update(g);f.defines.VSM_SAMPLES!==M.blurSamples&&(f.defines.VSM_SAMPLES=M.blurSamples,h.defines.VSM_SAMPLES=M.blurSamples,f.needsUpdate=!0,h.needsUpdate=!0),M.mapPass===null&&(M.mapPass=new Is(i.x,i.y)),f.uniforms.shadow_pass.value=M.map.texture,f.uniforms.resolution.value=M.mapSize,f.uniforms.radius.value=M.radius,r.setRenderTarget(M.mapPass),r.clear(),r.renderBufferDirect(T,null,R,f,g,null),h.uniforms.shadow_pass.value=M.mapPass.texture,h.uniforms.resolution.value=M.mapSize,h.uniforms.radius.value=M.radius,r.setRenderTarget(M.map),r.clear(),r.renderBufferDirect(T,null,R,h,g,null)}function x(M,T,R,w){let y=null;const D=R.isPointLight===!0?M.customDistanceMaterial:M.customDepthMaterial;if(D!==void 0)y=D;else if(y=R.isPointLight===!0?l:a,r.localClippingEnabled&&T.clipShadows===!0&&Array.isArray(T.clippingPlanes)&&T.clippingPlanes.length!==0||T.displacementMap&&T.displacementScale!==0||T.alphaMap&&T.alphaTest>0||T.map&&T.alphaTest>0||T.alphaToCoverage===!0){const N=y.uuid,V=T.uuid;let j=c[N];j===void 0&&(j={},c[N]=j);let k=j[V];k===void 0&&(k=y.clone(),j[V]=k,T.addEventListener("dispose",E)),y=k}if(y.visible=T.visible,y.wireframe=T.wireframe,w===Hr?y.side=T.shadowSide!==null?T.shadowSide:T.side:y.side=T.shadowSide!==null?T.shadowSide:d[T.side],y.alphaMap=T.alphaMap,y.alphaTest=T.alphaToCoverage===!0?.5:T.alphaTest,y.map=T.map,y.clipShadows=T.clipShadows,y.clippingPlanes=T.clippingPlanes,y.clipIntersection=T.clipIntersection,y.displacementMap=T.displacementMap,y.displacementScale=T.displacementScale,y.displacementBias=T.displacementBias,y.wireframeLinewidth=T.wireframeLinewidth,y.linewidth=T.linewidth,R.isPointLight===!0&&y.isMeshDistanceMaterial===!0){const N=r.properties.get(y);N.light=R}return y}function v(M,T,R,w,y){if(M.visible===!1)return;if(M.layers.test(T.layers)&&(M.isMesh||M.isLine||M.isPoints)&&(M.castShadow||M.receiveShadow&&y===Hr)&&(!M.frustumCulled||n.intersectsObject(M))){M.modelViewMatrix.multiplyMatrices(R.matrixWorldInverse,M.matrixWorld);const V=e.update(M),j=M.material;if(Array.isArray(j)){const k=V.groups;for(let G=0,Y=k.length;G<Y;G++){const F=k[G],ae=j[F.materialIndex];if(ae&&ae.visible){const O=x(M,ae,w,y);M.onBeforeShadow(r,M,T,R,V,O,F),r.renderBufferDirect(R,null,V,O,M,F),M.onAfterShadow(r,M,T,R,V,O,F)}}}else if(j.visible){const k=x(M,j,w,y);M.onBeforeShadow(r,M,T,R,V,k,null),r.renderBufferDirect(R,null,V,k,M,null),M.onAfterShadow(r,M,T,R,V,k,null)}}const N=M.children;for(let V=0,j=N.length;V<j;V++)v(N[V],T,R,w,y)}function E(M){M.target.removeEventListener("dispose",E);for(const R in c){const w=c[R],y=M.target.uuid;y in w&&(w[y].dispose(),delete w[y])}}}const AT={[hf]:pf,[mf]:xf,[gf]:vf,[ya]:_f,[pf]:hf,[xf]:mf,[vf]:gf,[_f]:ya};function CT(r,e){function t(){let L=!1;const xe=new zt;let ge=null;const _e=new zt(0,0,0,0);return{setMask:function(ne){ge!==ne&&!L&&(r.colorMask(ne,ne,ne,ne),ge=ne)},setLocked:function(ne){L=ne},setClear:function(ne,ce,Ve,we,Ft){Ft===!0&&(ne*=we,ce*=we,Ve*=we),xe.set(ne,ce,Ve,we),_e.equals(xe)===!1&&(r.clearColor(ne,ce,Ve,we),_e.copy(xe))},reset:function(){L=!1,ge=null,_e.set(-1,0,0,0)}}}function n(){let L=!1,xe=!1,ge=null,_e=null,ne=null;return{setReversed:function(ce){if(xe!==ce){const Ve=e.get("EXT_clip_control");ce?Ve.clipControlEXT(Ve.LOWER_LEFT_EXT,Ve.ZERO_TO_ONE_EXT):Ve.clipControlEXT(Ve.LOWER_LEFT_EXT,Ve.NEGATIVE_ONE_TO_ONE_EXT),xe=ce;const we=ne;ne=null,this.setClear(we)}},getReversed:function(){return xe},setTest:function(ce){ce?ie(r.DEPTH_TEST):K(r.DEPTH_TEST)},setMask:function(ce){ge!==ce&&!L&&(r.depthMask(ce),ge=ce)},setFunc:function(ce){if(xe&&(ce=AT[ce]),_e!==ce){switch(ce){case hf:r.depthFunc(r.NEVER);break;case pf:r.depthFunc(r.ALWAYS);break;case mf:r.depthFunc(r.LESS);break;case ya:r.depthFunc(r.LEQUAL);break;case gf:r.depthFunc(r.EQUAL);break;case _f:r.depthFunc(r.GEQUAL);break;case xf:r.depthFunc(r.GREATER);break;case vf:r.depthFunc(r.NOTEQUAL);break;default:r.depthFunc(r.LEQUAL)}_e=ce}},setLocked:function(ce){L=ce},setClear:function(ce){ne!==ce&&(xe&&(ce=1-ce),r.clearDepth(ce),ne=ce)},reset:function(){L=!1,ge=null,_e=null,ne=null,xe=!1}}}function i(){let L=!1,xe=null,ge=null,_e=null,ne=null,ce=null,Ve=null,we=null,Ft=null;return{setTest:function(Se){L||(Se?ie(r.STENCIL_TEST):K(r.STENCIL_TEST))},setMask:function(Se){xe!==Se&&!L&&(r.stencilMask(Se),xe=Se)},setFunc:function(Se,Ke,at){(ge!==Se||_e!==Ke||ne!==at)&&(r.stencilFunc(Se,Ke,at),ge=Se,_e=Ke,ne=at)},setOp:function(Se,Ke,at){(ce!==Se||Ve!==Ke||we!==at)&&(r.stencilOp(Se,Ke,at),ce=Se,Ve=Ke,we=at)},setLocked:function(Se){L=Se},setClear:function(Se){Ft!==Se&&(r.clearStencil(Se),Ft=Se)},reset:function(){L=!1,xe=null,ge=null,_e=null,ne=null,ce=null,Ve=null,we=null,Ft=null}}}const s=new t,o=new n,a=new i,l=new WeakMap,c=new WeakMap;let u={},d={},f=new WeakMap,h=[],_=null,g=!1,m=null,p=null,b=null,x=null,v=null,E=null,M=null,T=new $e(0,0,0),R=0,w=!1,y=null,D=null,N=null,V=null,j=null;const k=r.getParameter(r.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let G=!1,Y=0;const F=r.getParameter(r.VERSION);F.indexOf("WebGL")!==-1?(Y=parseFloat(/^WebGL (\d)/.exec(F)[1]),G=Y>=1):F.indexOf("OpenGL ES")!==-1&&(Y=parseFloat(/^OpenGL ES (\d)/.exec(F)[1]),G=Y>=2);let ae=null,O={};const he=r.getParameter(r.SCISSOR_BOX),P=r.getParameter(r.VIEWPORT),Me=new zt().fromArray(he),Ne=new zt().fromArray(P);function ze(L,xe,ge,_e){const ne=new Uint8Array(4),ce=r.createTexture();r.bindTexture(L,ce),r.texParameteri(L,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(L,r.TEXTURE_MAG_FILTER,r.NEAREST);for(let Ve=0;Ve<ge;Ve++)L===r.TEXTURE_3D||L===r.TEXTURE_2D_ARRAY?r.texImage3D(xe,0,r.RGBA,1,1,_e,0,r.RGBA,r.UNSIGNED_BYTE,ne):r.texImage2D(xe+Ve,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,ne);return ce}const te={};te[r.TEXTURE_2D]=ze(r.TEXTURE_2D,r.TEXTURE_2D,1),te[r.TEXTURE_CUBE_MAP]=ze(r.TEXTURE_CUBE_MAP,r.TEXTURE_CUBE_MAP_POSITIVE_X,6),te[r.TEXTURE_2D_ARRAY]=ze(r.TEXTURE_2D_ARRAY,r.TEXTURE_2D_ARRAY,1,1),te[r.TEXTURE_3D]=ze(r.TEXTURE_3D,r.TEXTURE_3D,1,1),s.setClear(0,0,0,1),o.setClear(1),a.setClear(0),ie(r.DEPTH_TEST),o.setFunc(ya),ot(!1),X(qp),ie(r.CULL_FACE),tt(Jr);function ie(L){u[L]!==!0&&(r.enable(L),u[L]=!0)}function K(L){u[L]!==!1&&(r.disable(L),u[L]=!1)}function Ue(L,xe){return d[L]!==xe?(r.bindFramebuffer(L,xe),d[L]=xe,L===r.DRAW_FRAMEBUFFER&&(d[r.FRAMEBUFFER]=xe),L===r.FRAMEBUFFER&&(d[r.DRAW_FRAMEBUFFER]=xe),!0):!1}function be(L,xe){let ge=h,_e=!1;if(L){ge=f.get(xe),ge===void 0&&(ge=[],f.set(xe,ge));const ne=L.textures;if(ge.length!==ne.length||ge[0]!==r.COLOR_ATTACHMENT0){for(let ce=0,Ve=ne.length;ce<Ve;ce++)ge[ce]=r.COLOR_ATTACHMENT0+ce;ge.length=ne.length,_e=!0}}else ge[0]!==r.BACK&&(ge[0]=r.BACK,_e=!0);_e&&r.drawBuffers(ge)}function je(L){return _!==L?(r.useProgram(L),_=L,!0):!1}const pt={[ro]:r.FUNC_ADD,[Bv]:r.FUNC_SUBTRACT,[zv]:r.FUNC_REVERSE_SUBTRACT};pt[Vv]=r.MIN,pt[Hv]=r.MAX;const Te={[Gv]:r.ZERO,[Wv]:r.ONE,[Xv]:r.SRC_COLOR,[df]:r.SRC_ALPHA,[Zv]:r.SRC_ALPHA_SATURATE,[jv]:r.DST_COLOR,[Yv]:r.DST_ALPHA,[qv]:r.ONE_MINUS_SRC_COLOR,[ff]:r.ONE_MINUS_SRC_ALPHA,[Kv]:r.ONE_MINUS_DST_COLOR,[$v]:r.ONE_MINUS_DST_ALPHA,[Jv]:r.CONSTANT_COLOR,[Qv]:r.ONE_MINUS_CONSTANT_COLOR,[ey]:r.CONSTANT_ALPHA,[ty]:r.ONE_MINUS_CONSTANT_ALPHA};function tt(L,xe,ge,_e,ne,ce,Ve,we,Ft,Se){if(L===Jr){g===!0&&(K(r.BLEND),g=!1);return}if(g===!1&&(ie(r.BLEND),g=!0),L!==kv){if(L!==m||Se!==w){if((p!==ro||v!==ro)&&(r.blendEquation(r.FUNC_ADD),p=ro,v=ro),Se)switch(L){case As:r.blendFuncSeparate(r.ONE,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case xu:r.blendFunc(r.ONE,r.ONE);break;case Yp:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case $p:r.blendFuncSeparate(r.DST_COLOR,r.ONE_MINUS_SRC_ALPHA,r.ZERO,r.ONE);break;default:Rt("WebGLState: Invalid blending: ",L);break}else switch(L){case As:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case xu:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE,r.ONE,r.ONE);break;case Yp:Rt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case $p:Rt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Rt("WebGLState: Invalid blending: ",L);break}b=null,x=null,E=null,M=null,T.set(0,0,0),R=0,m=L,w=Se}return}ne=ne||xe,ce=ce||ge,Ve=Ve||_e,(xe!==p||ne!==v)&&(r.blendEquationSeparate(pt[xe],pt[ne]),p=xe,v=ne),(ge!==b||_e!==x||ce!==E||Ve!==M)&&(r.blendFuncSeparate(Te[ge],Te[_e],Te[ce],Te[Ve]),b=ge,x=_e,E=ce,M=Ve),(we.equals(T)===!1||Ft!==R)&&(r.blendColor(we.r,we.g,we.b,Ft),T.copy(we),R=Ft),m=L,w=!1}function U(L,xe){L.side===Wi?K(r.CULL_FACE):ie(r.CULL_FACE);let ge=L.side===_i;xe&&(ge=!ge),ot(ge),L.blending===As&&L.transparent===!1?tt(Jr):tt(L.blending,L.blendEquation,L.blendSrc,L.blendDst,L.blendEquationAlpha,L.blendSrcAlpha,L.blendDstAlpha,L.blendColor,L.blendAlpha,L.premultipliedAlpha),o.setFunc(L.depthFunc),o.setTest(L.depthTest),o.setMask(L.depthWrite),s.setMask(L.colorWrite);const _e=L.stencilWrite;a.setTest(_e),_e&&(a.setMask(L.stencilWriteMask),a.setFunc(L.stencilFunc,L.stencilRef,L.stencilFuncMask),a.setOp(L.stencilFail,L.stencilZFail,L.stencilZPass)),Le(L.polygonOffset,L.polygonOffsetFactor,L.polygonOffsetUnits),L.alphaToCoverage===!0?ie(r.SAMPLE_ALPHA_TO_COVERAGE):K(r.SAMPLE_ALPHA_TO_COVERAGE)}function ot(L){y!==L&&(L?r.frontFace(r.CW):r.frontFace(r.CCW),y=L)}function X(L){L!==Nv?(ie(r.CULL_FACE),L!==D&&(L===qp?r.cullFace(r.BACK):L===Fv?r.cullFace(r.FRONT):r.cullFace(r.FRONT_AND_BACK))):K(r.CULL_FACE),D=L}function ft(L){L!==N&&(G&&r.lineWidth(L),N=L)}function Le(L,xe,ge){L?(ie(r.POLYGON_OFFSET_FILL),(V!==xe||j!==ge)&&(r.polygonOffset(xe,ge),V=xe,j=ge)):K(r.POLYGON_OFFSET_FILL)}function wt(L){L?ie(r.SCISSOR_TEST):K(r.SCISSOR_TEST)}function Re(L){L===void 0&&(L=r.TEXTURE0+k-1),ae!==L&&(r.activeTexture(L),ae=L)}function Fe(L,xe,ge){ge===void 0&&(ae===null?ge=r.TEXTURE0+k-1:ge=ae);let _e=O[ge];_e===void 0&&(_e={type:void 0,texture:void 0},O[ge]=_e),(_e.type!==L||_e.texture!==xe)&&(ae!==ge&&(r.activeTexture(ge),ae=ge),r.bindTexture(L,xe||te[L]),_e.type=L,_e.texture=xe)}function I(){const L=O[ae];L!==void 0&&L.type!==void 0&&(r.bindTexture(L.type,null),L.type=void 0,L.texture=void 0)}function C(){try{r.compressedTexImage2D(...arguments)}catch(L){L("WebGLState:",L)}}function q(){try{r.compressedTexImage3D(...arguments)}catch(L){L("WebGLState:",L)}}function oe(){try{r.texSubImage2D(...arguments)}catch(L){L("WebGLState:",L)}}function se(){try{r.texSubImage3D(...arguments)}catch(L){L("WebGLState:",L)}}function Q(){try{r.compressedTexSubImage2D(...arguments)}catch(L){L("WebGLState:",L)}}function ke(){try{r.compressedTexSubImage3D(...arguments)}catch(L){L("WebGLState:",L)}}function ve(){try{r.texStorage2D(...arguments)}catch(L){L("WebGLState:",L)}}function Qe(){try{r.texStorage3D(...arguments)}catch(L){L("WebGLState:",L)}}function Ce(){try{r.texImage2D(...arguments)}catch(L){L("WebGLState:",L)}}function le(){try{r.texImage3D(...arguments)}catch(L){L("WebGLState:",L)}}function me(L){Me.equals(L)===!1&&(r.scissor(L.x,L.y,L.z,L.w),Me.copy(L))}function Ge(L){Ne.equals(L)===!1&&(r.viewport(L.x,L.y,L.z,L.w),Ne.copy(L))}function Ie(L,xe){let ge=c.get(xe);ge===void 0&&(ge=new WeakMap,c.set(xe,ge));let _e=ge.get(L);_e===void 0&&(_e=r.getUniformBlockIndex(xe,L.name),ge.set(L,_e))}function Ee(L,xe){const _e=c.get(xe).get(L);l.get(xe)!==_e&&(r.uniformBlockBinding(xe,_e,L.__bindingPointIndex),l.set(xe,_e))}function et(){r.disable(r.BLEND),r.disable(r.CULL_FACE),r.disable(r.DEPTH_TEST),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.disable(r.SAMPLE_ALPHA_TO_COVERAGE),r.blendEquation(r.FUNC_ADD),r.blendFunc(r.ONE,r.ZERO),r.blendFuncSeparate(r.ONE,r.ZERO,r.ONE,r.ZERO),r.blendColor(0,0,0,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(r.LESS),o.setReversed(!1),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(r.ALWAYS,0,4294967295),r.stencilOp(r.KEEP,r.KEEP,r.KEEP),r.clearStencil(0),r.cullFace(r.BACK),r.frontFace(r.CCW),r.polygonOffset(0,0),r.activeTexture(r.TEXTURE0),r.bindFramebuffer(r.FRAMEBUFFER,null),r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),r.bindFramebuffer(r.READ_FRAMEBUFFER,null),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),u={},ae=null,O={},d={},f=new WeakMap,h=[],_=null,g=!1,m=null,p=null,b=null,x=null,v=null,E=null,M=null,T=new $e(0,0,0),R=0,w=!1,y=null,D=null,N=null,V=null,j=null,Me.set(0,0,r.canvas.width,r.canvas.height),Ne.set(0,0,r.canvas.width,r.canvas.height),s.reset(),o.reset(),a.reset()}return{buffers:{color:s,depth:o,stencil:a},enable:ie,disable:K,bindFramebuffer:Ue,drawBuffers:be,useProgram:je,setBlending:tt,setMaterial:U,setFlipSided:ot,setCullFace:X,setLineWidth:ft,setPolygonOffset:Le,setScissorTest:wt,activeTexture:Re,bindTexture:Fe,unbindTexture:I,compressedTexImage2D:C,compressedTexImage3D:q,texImage2D:Ce,texImage3D:le,updateUBOMapping:Ie,uniformBlockBinding:Ee,texStorage2D:ve,texStorage3D:Qe,texSubImage2D:oe,texSubImage3D:se,compressedTexSubImage2D:Q,compressedTexSubImage3D:ke,scissor:me,viewport:Ge,reset:et}}function RT(r,e,t,n,i,s,o){const a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Et,u=new WeakMap;let d;const f=new WeakMap;let h=!1;try{h=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function _(I,C){return h?new OffscreenCanvas(I,C):Xl("canvas")}function g(I,C,q){let oe=1;const se=Fe(I);if((se.width>q||se.height>q)&&(oe=q/Math.max(se.width,se.height)),oe<1)if(typeof HTMLImageElement<"u"&&I instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&I instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&I instanceof ImageBitmap||typeof VideoFrame<"u"&&I instanceof VideoFrame){const Q=Math.floor(oe*se.width),ke=Math.floor(oe*se.height);d===void 0&&(d=_(Q,ke));const ve=C?_(Q,ke):d;return ve.width=Q,ve.height=ke,ve.getContext("2d").drawImage(I,0,0,Q,ke),st("WebGLRenderer: Texture has been resized from ("+se.width+"x"+se.height+") to ("+Q+"x"+ke+")."),ve}else return"data"in I&&st("WebGLRenderer: Image in DataTexture is too big ("+se.width+"x"+se.height+")."),I;return I}function m(I){return I.generateMipmaps}function p(I){r.generateMipmap(I)}function b(I){return I.isWebGLCubeRenderTarget?r.TEXTURE_CUBE_MAP:I.isWebGL3DRenderTarget?r.TEXTURE_3D:I.isWebGLArrayRenderTarget||I.isCompressedArrayTexture?r.TEXTURE_2D_ARRAY:r.TEXTURE_2D}function x(I,C,q,oe,se=!1){if(I!==null){if(r[I]!==void 0)return r[I];st("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+I+"'")}let Q=C;if(C===r.RED&&(q===r.FLOAT&&(Q=r.R32F),q===r.HALF_FLOAT&&(Q=r.R16F),q===r.UNSIGNED_BYTE&&(Q=r.R8)),C===r.RED_INTEGER&&(q===r.UNSIGNED_BYTE&&(Q=r.R8UI),q===r.UNSIGNED_SHORT&&(Q=r.R16UI),q===r.UNSIGNED_INT&&(Q=r.R32UI),q===r.BYTE&&(Q=r.R8I),q===r.SHORT&&(Q=r.R16I),q===r.INT&&(Q=r.R32I)),C===r.RG&&(q===r.FLOAT&&(Q=r.RG32F),q===r.HALF_FLOAT&&(Q=r.RG16F),q===r.UNSIGNED_BYTE&&(Q=r.RG8)),C===r.RG_INTEGER&&(q===r.UNSIGNED_BYTE&&(Q=r.RG8UI),q===r.UNSIGNED_SHORT&&(Q=r.RG16UI),q===r.UNSIGNED_INT&&(Q=r.RG32UI),q===r.BYTE&&(Q=r.RG8I),q===r.SHORT&&(Q=r.RG16I),q===r.INT&&(Q=r.RG32I)),C===r.RGB_INTEGER&&(q===r.UNSIGNED_BYTE&&(Q=r.RGB8UI),q===r.UNSIGNED_SHORT&&(Q=r.RGB16UI),q===r.UNSIGNED_INT&&(Q=r.RGB32UI),q===r.BYTE&&(Q=r.RGB8I),q===r.SHORT&&(Q=r.RGB16I),q===r.INT&&(Q=r.RGB32I)),C===r.RGBA_INTEGER&&(q===r.UNSIGNED_BYTE&&(Q=r.RGBA8UI),q===r.UNSIGNED_SHORT&&(Q=r.RGBA16UI),q===r.UNSIGNED_INT&&(Q=r.RGBA32UI),q===r.BYTE&&(Q=r.RGBA8I),q===r.SHORT&&(Q=r.RGBA16I),q===r.INT&&(Q=r.RGBA32I)),C===r.RGB&&(q===r.UNSIGNED_INT_5_9_9_9_REV&&(Q=r.RGB9_E5),q===r.UNSIGNED_INT_10F_11F_11F_REV&&(Q=r.R11F_G11F_B10F)),C===r.RGBA){const ke=se?yu:It.getTransfer(oe);q===r.FLOAT&&(Q=r.RGBA32F),q===r.HALF_FLOAT&&(Q=r.RGBA16F),q===r.UNSIGNED_BYTE&&(Q=ke===Kt?r.SRGB8_ALPHA8:r.RGBA8),q===r.UNSIGNED_SHORT_4_4_4_4&&(Q=r.RGBA4),q===r.UNSIGNED_SHORT_5_5_5_1&&(Q=r.RGB5_A1)}return(Q===r.R16F||Q===r.R32F||Q===r.RG16F||Q===r.RG32F||Q===r.RGBA16F||Q===r.RGBA32F)&&e.get("EXT_color_buffer_float"),Q}function v(I,C){let q;return I?C===null||C===bo||C===zl?q=r.DEPTH24_STENCIL8:C===sr?q=r.DEPTH32F_STENCIL8:C===Bl&&(q=r.DEPTH24_STENCIL8,st("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):C===null||C===bo||C===zl?q=r.DEPTH_COMPONENT24:C===sr?q=r.DEPTH_COMPONENT32F:C===Bl&&(q=r.DEPTH_COMPONENT16),q}function E(I,C){return m(I)===!0||I.isFramebufferTexture&&I.minFilter!==hi&&I.minFilter!==jn?Math.log2(Math.max(C.width,C.height))+1:I.mipmaps!==void 0&&I.mipmaps.length>0?I.mipmaps.length:I.isCompressedTexture&&Array.isArray(I.image)?C.mipmaps.length:1}function M(I){const C=I.target;C.removeEventListener("dispose",M),R(C),C.isVideoTexture&&u.delete(C)}function T(I){const C=I.target;C.removeEventListener("dispose",T),y(C)}function R(I){const C=n.get(I);if(C.__webglInit===void 0)return;const q=I.source,oe=f.get(q);if(oe){const se=oe[C.__cacheKey];se.usedTimes--,se.usedTimes===0&&w(I),Object.keys(oe).length===0&&f.delete(q)}n.remove(I)}function w(I){const C=n.get(I);r.deleteTexture(C.__webglTexture);const q=I.source,oe=f.get(q);delete oe[C.__cacheKey],o.memory.textures--}function y(I){const C=n.get(I);if(I.depthTexture&&(I.depthTexture.dispose(),n.remove(I.depthTexture)),I.isWebGLCubeRenderTarget)for(let oe=0;oe<6;oe++){if(Array.isArray(C.__webglFramebuffer[oe]))for(let se=0;se<C.__webglFramebuffer[oe].length;se++)r.deleteFramebuffer(C.__webglFramebuffer[oe][se]);else r.deleteFramebuffer(C.__webglFramebuffer[oe]);C.__webglDepthbuffer&&r.deleteRenderbuffer(C.__webglDepthbuffer[oe])}else{if(Array.isArray(C.__webglFramebuffer))for(let oe=0;oe<C.__webglFramebuffer.length;oe++)r.deleteFramebuffer(C.__webglFramebuffer[oe]);else r.deleteFramebuffer(C.__webglFramebuffer);if(C.__webglDepthbuffer&&r.deleteRenderbuffer(C.__webglDepthbuffer),C.__webglMultisampledFramebuffer&&r.deleteFramebuffer(C.__webglMultisampledFramebuffer),C.__webglColorRenderbuffer)for(let oe=0;oe<C.__webglColorRenderbuffer.length;oe++)C.__webglColorRenderbuffer[oe]&&r.deleteRenderbuffer(C.__webglColorRenderbuffer[oe]);C.__webglDepthRenderbuffer&&r.deleteRenderbuffer(C.__webglDepthRenderbuffer)}const q=I.textures;for(let oe=0,se=q.length;oe<se;oe++){const Q=n.get(q[oe]);Q.__webglTexture&&(r.deleteTexture(Q.__webglTexture),o.memory.textures--),n.remove(q[oe])}n.remove(I)}let D=0;function N(){D=0}function V(){const I=D;return I>=i.maxTextures&&st("WebGLTextures: Trying to use "+I+" texture units while this GPU supports only "+i.maxTextures),D+=1,I}function j(I){const C=[];return C.push(I.wrapS),C.push(I.wrapT),C.push(I.wrapR||0),C.push(I.magFilter),C.push(I.minFilter),C.push(I.anisotropy),C.push(I.internalFormat),C.push(I.format),C.push(I.type),C.push(I.generateMipmaps),C.push(I.premultiplyAlpha),C.push(I.flipY),C.push(I.unpackAlignment),C.push(I.colorSpace),C.join()}function k(I,C){const q=n.get(I);if(I.isVideoTexture&&wt(I),I.isRenderTargetTexture===!1&&I.isExternalTexture!==!0&&I.version>0&&q.__version!==I.version){const oe=I.image;if(oe===null)st("WebGLRenderer: Texture marked for update but no image data found.");else if(oe.complete===!1)st("WebGLRenderer: Texture marked for update but image is incomplete");else{te(q,I,C);return}}else I.isExternalTexture&&(q.__webglTexture=I.sourceTexture?I.sourceTexture:null);t.bindTexture(r.TEXTURE_2D,q.__webglTexture,r.TEXTURE0+C)}function G(I,C){const q=n.get(I);if(I.isRenderTargetTexture===!1&&I.version>0&&q.__version!==I.version){te(q,I,C);return}else I.isExternalTexture&&(q.__webglTexture=I.sourceTexture?I.sourceTexture:null);t.bindTexture(r.TEXTURE_2D_ARRAY,q.__webglTexture,r.TEXTURE0+C)}function Y(I,C){const q=n.get(I);if(I.isRenderTargetTexture===!1&&I.version>0&&q.__version!==I.version){te(q,I,C);return}t.bindTexture(r.TEXTURE_3D,q.__webglTexture,r.TEXTURE0+C)}function F(I,C){const q=n.get(I);if(I.version>0&&q.__version!==I.version){ie(q,I,C);return}t.bindTexture(r.TEXTURE_CUBE_MAP,q.__webglTexture,r.TEXTURE0+C)}const ae={[Sa]:r.REPEAT,[wr]:r.CLAMP_TO_EDGE,[vu]:r.MIRRORED_REPEAT},O={[hi]:r.NEAREST,[Ng]:r.NEAREST_MIPMAP_NEAREST,[al]:r.NEAREST_MIPMAP_LINEAR,[jn]:r.LINEAR,[tu]:r.LINEAR_MIPMAP_NEAREST,[Yr]:r.LINEAR_MIPMAP_LINEAR},he={[_y]:r.NEVER,[Sy]:r.ALWAYS,[xy]:r.LESS,[Wg]:r.LEQUAL,[vy]:r.EQUAL,[wy]:r.GEQUAL,[yy]:r.GREATER,[by]:r.NOTEQUAL};function P(I,C){if(C.type===sr&&e.has("OES_texture_float_linear")===!1&&(C.magFilter===jn||C.magFilter===tu||C.magFilter===al||C.magFilter===Yr||C.minFilter===jn||C.minFilter===tu||C.minFilter===al||C.minFilter===Yr)&&st("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),r.texParameteri(I,r.TEXTURE_WRAP_S,ae[C.wrapS]),r.texParameteri(I,r.TEXTURE_WRAP_T,ae[C.wrapT]),(I===r.TEXTURE_3D||I===r.TEXTURE_2D_ARRAY)&&r.texParameteri(I,r.TEXTURE_WRAP_R,ae[C.wrapR]),r.texParameteri(I,r.TEXTURE_MAG_FILTER,O[C.magFilter]),r.texParameteri(I,r.TEXTURE_MIN_FILTER,O[C.minFilter]),C.compareFunction&&(r.texParameteri(I,r.TEXTURE_COMPARE_MODE,r.COMPARE_REF_TO_TEXTURE),r.texParameteri(I,r.TEXTURE_COMPARE_FUNC,he[C.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(C.magFilter===hi||C.minFilter!==al&&C.minFilter!==Yr||C.type===sr&&e.has("OES_texture_float_linear")===!1)return;if(C.anisotropy>1||n.get(C).__currentAnisotropy){const q=e.get("EXT_texture_filter_anisotropic");r.texParameterf(I,q.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(C.anisotropy,i.getMaxAnisotropy())),n.get(C).__currentAnisotropy=C.anisotropy}}}function Me(I,C){let q=!1;I.__webglInit===void 0&&(I.__webglInit=!0,C.addEventListener("dispose",M));const oe=C.source;let se=f.get(oe);se===void 0&&(se={},f.set(oe,se));const Q=j(C);if(Q!==I.__cacheKey){se[Q]===void 0&&(se[Q]={texture:r.createTexture(),usedTimes:0},o.memory.textures++,q=!0),se[Q].usedTimes++;const ke=se[I.__cacheKey];ke!==void 0&&(se[I.__cacheKey].usedTimes--,ke.usedTimes===0&&w(C)),I.__cacheKey=Q,I.__webglTexture=se[Q].texture}return q}function Ne(I,C,q){return Math.floor(Math.floor(I/q)/C)}function ze(I,C,q,oe){const Q=I.updateRanges;if(Q.length===0)t.texSubImage2D(r.TEXTURE_2D,0,0,0,C.width,C.height,q,oe,C.data);else{Q.sort((le,me)=>le.start-me.start);let ke=0;for(let le=1;le<Q.length;le++){const me=Q[ke],Ge=Q[le],Ie=me.start+me.count,Ee=Ne(Ge.start,C.width,4),et=Ne(me.start,C.width,4);Ge.start<=Ie+1&&Ee===et&&Ne(Ge.start+Ge.count-1,C.width,4)===Ee?me.count=Math.max(me.count,Ge.start+Ge.count-me.start):(++ke,Q[ke]=Ge)}Q.length=ke+1;const ve=r.getParameter(r.UNPACK_ROW_LENGTH),Qe=r.getParameter(r.UNPACK_SKIP_PIXELS),Ce=r.getParameter(r.UNPACK_SKIP_ROWS);r.pixelStorei(r.UNPACK_ROW_LENGTH,C.width);for(let le=0,me=Q.length;le<me;le++){const Ge=Q[le],Ie=Math.floor(Ge.start/4),Ee=Math.ceil(Ge.count/4),et=Ie%C.width,L=Math.floor(Ie/C.width),xe=Ee,ge=1;r.pixelStorei(r.UNPACK_SKIP_PIXELS,et),r.pixelStorei(r.UNPACK_SKIP_ROWS,L),t.texSubImage2D(r.TEXTURE_2D,0,et,L,xe,ge,q,oe,C.data)}I.clearUpdateRanges(),r.pixelStorei(r.UNPACK_ROW_LENGTH,ve),r.pixelStorei(r.UNPACK_SKIP_PIXELS,Qe),r.pixelStorei(r.UNPACK_SKIP_ROWS,Ce)}}function te(I,C,q){let oe=r.TEXTURE_2D;(C.isDataArrayTexture||C.isCompressedArrayTexture)&&(oe=r.TEXTURE_2D_ARRAY),C.isData3DTexture&&(oe=r.TEXTURE_3D);const se=Me(I,C),Q=C.source;t.bindTexture(oe,I.__webglTexture,r.TEXTURE0+q);const ke=n.get(Q);if(Q.version!==ke.__version||se===!0){t.activeTexture(r.TEXTURE0+q);const ve=It.getPrimaries(It.workingColorSpace),Qe=C.colorSpace===_s?null:It.getPrimaries(C.colorSpace),Ce=C.colorSpace===_s||ve===Qe?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,C.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,C.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,C.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ce);let le=g(C.image,!1,i.maxTextureSize);le=Re(C,le);const me=s.convert(C.format,C.colorSpace),Ge=s.convert(C.type);let Ie=x(C.internalFormat,me,Ge,C.colorSpace,C.isVideoTexture);P(oe,C);let Ee;const et=C.mipmaps,L=C.isVideoTexture!==!0,xe=ke.__version===void 0||se===!0,ge=Q.dataReady,_e=E(C,le);if(C.isDepthTexture)Ie=v(C.format===Hl,C.type),xe&&(L?t.texStorage2D(r.TEXTURE_2D,1,Ie,le.width,le.height):t.texImage2D(r.TEXTURE_2D,0,Ie,le.width,le.height,0,me,Ge,null));else if(C.isDataTexture)if(et.length>0){L&&xe&&t.texStorage2D(r.TEXTURE_2D,_e,Ie,et[0].width,et[0].height);for(let ne=0,ce=et.length;ne<ce;ne++)Ee=et[ne],L?ge&&t.texSubImage2D(r.TEXTURE_2D,ne,0,0,Ee.width,Ee.height,me,Ge,Ee.data):t.texImage2D(r.TEXTURE_2D,ne,Ie,Ee.width,Ee.height,0,me,Ge,Ee.data);C.generateMipmaps=!1}else L?(xe&&t.texStorage2D(r.TEXTURE_2D,_e,Ie,le.width,le.height),ge&&ze(C,le,me,Ge)):t.texImage2D(r.TEXTURE_2D,0,Ie,le.width,le.height,0,me,Ge,le.data);else if(C.isCompressedTexture)if(C.isCompressedArrayTexture){L&&xe&&t.texStorage3D(r.TEXTURE_2D_ARRAY,_e,Ie,et[0].width,et[0].height,le.depth);for(let ne=0,ce=et.length;ne<ce;ne++)if(Ee=et[ne],C.format!==Xi)if(me!==null)if(L){if(ge)if(C.layerUpdates.size>0){const Ve=Um(Ee.width,Ee.height,C.format,C.type);for(const we of C.layerUpdates){const Ft=Ee.data.subarray(we*Ve/Ee.data.BYTES_PER_ELEMENT,(we+1)*Ve/Ee.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,ne,0,0,we,Ee.width,Ee.height,1,me,Ft)}C.clearLayerUpdates()}else t.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,ne,0,0,0,Ee.width,Ee.height,le.depth,me,Ee.data)}else t.compressedTexImage3D(r.TEXTURE_2D_ARRAY,ne,Ie,Ee.width,Ee.height,le.depth,0,Ee.data,0,0);else st("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else L?ge&&t.texSubImage3D(r.TEXTURE_2D_ARRAY,ne,0,0,0,Ee.width,Ee.height,le.depth,me,Ge,Ee.data):t.texImage3D(r.TEXTURE_2D_ARRAY,ne,Ie,Ee.width,Ee.height,le.depth,0,me,Ge,Ee.data)}else{L&&xe&&t.texStorage2D(r.TEXTURE_2D,_e,Ie,et[0].width,et[0].height);for(let ne=0,ce=et.length;ne<ce;ne++)Ee=et[ne],C.format!==Xi?me!==null?L?ge&&t.compressedTexSubImage2D(r.TEXTURE_2D,ne,0,0,Ee.width,Ee.height,me,Ee.data):t.compressedTexImage2D(r.TEXTURE_2D,ne,Ie,Ee.width,Ee.height,0,Ee.data):st("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):L?ge&&t.texSubImage2D(r.TEXTURE_2D,ne,0,0,Ee.width,Ee.height,me,Ge,Ee.data):t.texImage2D(r.TEXTURE_2D,ne,Ie,Ee.width,Ee.height,0,me,Ge,Ee.data)}else if(C.isDataArrayTexture)if(L){if(xe&&t.texStorage3D(r.TEXTURE_2D_ARRAY,_e,Ie,le.width,le.height,le.depth),ge)if(C.layerUpdates.size>0){const ne=Um(le.width,le.height,C.format,C.type);for(const ce of C.layerUpdates){const Ve=le.data.subarray(ce*ne/le.data.BYTES_PER_ELEMENT,(ce+1)*ne/le.data.BYTES_PER_ELEMENT);t.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,ce,le.width,le.height,1,me,Ge,Ve)}C.clearLayerUpdates()}else t.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,0,le.width,le.height,le.depth,me,Ge,le.data)}else t.texImage3D(r.TEXTURE_2D_ARRAY,0,Ie,le.width,le.height,le.depth,0,me,Ge,le.data);else if(C.isData3DTexture)L?(xe&&t.texStorage3D(r.TEXTURE_3D,_e,Ie,le.width,le.height,le.depth),ge&&t.texSubImage3D(r.TEXTURE_3D,0,0,0,0,le.width,le.height,le.depth,me,Ge,le.data)):t.texImage3D(r.TEXTURE_3D,0,Ie,le.width,le.height,le.depth,0,me,Ge,le.data);else if(C.isFramebufferTexture){if(xe)if(L)t.texStorage2D(r.TEXTURE_2D,_e,Ie,le.width,le.height);else{let ne=le.width,ce=le.height;for(let Ve=0;Ve<_e;Ve++)t.texImage2D(r.TEXTURE_2D,Ve,Ie,ne,ce,0,me,Ge,null),ne>>=1,ce>>=1}}else if(et.length>0){if(L&&xe){const ne=Fe(et[0]);t.texStorage2D(r.TEXTURE_2D,_e,Ie,ne.width,ne.height)}for(let ne=0,ce=et.length;ne<ce;ne++)Ee=et[ne],L?ge&&t.texSubImage2D(r.TEXTURE_2D,ne,0,0,me,Ge,Ee):t.texImage2D(r.TEXTURE_2D,ne,Ie,me,Ge,Ee);C.generateMipmaps=!1}else if(L){if(xe){const ne=Fe(le);t.texStorage2D(r.TEXTURE_2D,_e,Ie,ne.width,ne.height)}ge&&t.texSubImage2D(r.TEXTURE_2D,0,0,0,me,Ge,le)}else t.texImage2D(r.TEXTURE_2D,0,Ie,me,Ge,le);m(C)&&p(oe),ke.__version=Q.version,C.onUpdate&&C.onUpdate(C)}I.__version=C.version}function ie(I,C,q){if(C.image.length!==6)return;const oe=Me(I,C),se=C.source;t.bindTexture(r.TEXTURE_CUBE_MAP,I.__webglTexture,r.TEXTURE0+q);const Q=n.get(se);if(se.version!==Q.__version||oe===!0){t.activeTexture(r.TEXTURE0+q);const ke=It.getPrimaries(It.workingColorSpace),ve=C.colorSpace===_s?null:It.getPrimaries(C.colorSpace),Qe=C.colorSpace===_s||ke===ve?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,C.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,C.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,C.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,Qe);const Ce=C.isCompressedTexture||C.image[0].isCompressedTexture,le=C.image[0]&&C.image[0].isDataTexture,me=[];for(let ce=0;ce<6;ce++)!Ce&&!le?me[ce]=g(C.image[ce],!0,i.maxCubemapSize):me[ce]=le?C.image[ce].image:C.image[ce],me[ce]=Re(C,me[ce]);const Ge=me[0],Ie=s.convert(C.format,C.colorSpace),Ee=s.convert(C.type),et=x(C.internalFormat,Ie,Ee,C.colorSpace),L=C.isVideoTexture!==!0,xe=Q.__version===void 0||oe===!0,ge=se.dataReady;let _e=E(C,Ge);P(r.TEXTURE_CUBE_MAP,C);let ne;if(Ce){L&&xe&&t.texStorage2D(r.TEXTURE_CUBE_MAP,_e,et,Ge.width,Ge.height);for(let ce=0;ce<6;ce++){ne=me[ce].mipmaps;for(let Ve=0;Ve<ne.length;Ve++){const we=ne[Ve];C.format!==Xi?Ie!==null?L?ge&&t.compressedTexSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ce,Ve,0,0,we.width,we.height,Ie,we.data):t.compressedTexImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ce,Ve,et,we.width,we.height,0,we.data):st("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):L?ge&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ce,Ve,0,0,we.width,we.height,Ie,Ee,we.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ce,Ve,et,we.width,we.height,0,Ie,Ee,we.data)}}}else{if(ne=C.mipmaps,L&&xe){ne.length>0&&_e++;const ce=Fe(me[0]);t.texStorage2D(r.TEXTURE_CUBE_MAP,_e,et,ce.width,ce.height)}for(let ce=0;ce<6;ce++)if(le){L?ge&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ce,0,0,0,me[ce].width,me[ce].height,Ie,Ee,me[ce].data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ce,0,et,me[ce].width,me[ce].height,0,Ie,Ee,me[ce].data);for(let Ve=0;Ve<ne.length;Ve++){const Ft=ne[Ve].image[ce].image;L?ge&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ce,Ve+1,0,0,Ft.width,Ft.height,Ie,Ee,Ft.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ce,Ve+1,et,Ft.width,Ft.height,0,Ie,Ee,Ft.data)}}else{L?ge&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ce,0,0,0,Ie,Ee,me[ce]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ce,0,et,Ie,Ee,me[ce]);for(let Ve=0;Ve<ne.length;Ve++){const we=ne[Ve];L?ge&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ce,Ve+1,0,0,Ie,Ee,we.image[ce]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ce,Ve+1,et,Ie,Ee,we.image[ce])}}}m(C)&&p(r.TEXTURE_CUBE_MAP),Q.__version=se.version,C.onUpdate&&C.onUpdate(C)}I.__version=C.version}function K(I,C,q,oe,se,Q){const ke=s.convert(q.format,q.colorSpace),ve=s.convert(q.type),Qe=x(q.internalFormat,ke,ve,q.colorSpace),Ce=n.get(C),le=n.get(q);if(le.__renderTarget=C,!Ce.__hasExternalTextures){const me=Math.max(1,C.width>>Q),Ge=Math.max(1,C.height>>Q);se===r.TEXTURE_3D||se===r.TEXTURE_2D_ARRAY?t.texImage3D(se,Q,Qe,me,Ge,C.depth,0,ke,ve,null):t.texImage2D(se,Q,Qe,me,Ge,0,ke,ve,null)}t.bindFramebuffer(r.FRAMEBUFFER,I),Le(C)?a.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,oe,se,le.__webglTexture,0,ft(C)):(se===r.TEXTURE_2D||se>=r.TEXTURE_CUBE_MAP_POSITIVE_X&&se<=r.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&r.framebufferTexture2D(r.FRAMEBUFFER,oe,se,le.__webglTexture,Q),t.bindFramebuffer(r.FRAMEBUFFER,null)}function Ue(I,C,q){if(r.bindRenderbuffer(r.RENDERBUFFER,I),C.depthBuffer){const oe=C.depthTexture,se=oe&&oe.isDepthTexture?oe.type:null,Q=v(C.stencilBuffer,se),ke=C.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,ve=ft(C);Le(C)?a.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,ve,Q,C.width,C.height):q?r.renderbufferStorageMultisample(r.RENDERBUFFER,ve,Q,C.width,C.height):r.renderbufferStorage(r.RENDERBUFFER,Q,C.width,C.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,ke,r.RENDERBUFFER,I)}else{const oe=C.textures;for(let se=0;se<oe.length;se++){const Q=oe[se],ke=s.convert(Q.format,Q.colorSpace),ve=s.convert(Q.type),Qe=x(Q.internalFormat,ke,ve,Q.colorSpace),Ce=ft(C);q&&Le(C)===!1?r.renderbufferStorageMultisample(r.RENDERBUFFER,Ce,Qe,C.width,C.height):Le(C)?a.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,Ce,Qe,C.width,C.height):r.renderbufferStorage(r.RENDERBUFFER,Qe,C.width,C.height)}}r.bindRenderbuffer(r.RENDERBUFFER,null)}function be(I,C){if(C&&C.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(r.FRAMEBUFFER,I),!(C.depthTexture&&C.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const oe=n.get(C.depthTexture);oe.__renderTarget=C,(!oe.__webglTexture||C.depthTexture.image.width!==C.width||C.depthTexture.image.height!==C.height)&&(C.depthTexture.image.width=C.width,C.depthTexture.image.height=C.height,C.depthTexture.needsUpdate=!0),k(C.depthTexture,0);const se=oe.__webglTexture,Q=ft(C);if(C.depthTexture.format===Vl)Le(C)?a.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,se,0,Q):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,se,0);else if(C.depthTexture.format===Hl)Le(C)?a.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,se,0,Q):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,se,0);else throw new Error("Unknown depthTexture format")}function je(I){const C=n.get(I),q=I.isWebGLCubeRenderTarget===!0;if(C.__boundDepthTexture!==I.depthTexture){const oe=I.depthTexture;if(C.__depthDisposeCallback&&C.__depthDisposeCallback(),oe){const se=()=>{delete C.__boundDepthTexture,delete C.__depthDisposeCallback,oe.removeEventListener("dispose",se)};oe.addEventListener("dispose",se),C.__depthDisposeCallback=se}C.__boundDepthTexture=oe}if(I.depthTexture&&!C.__autoAllocateDepthBuffer){if(q)throw new Error("target.depthTexture not supported in Cube render targets");const oe=I.texture.mipmaps;oe&&oe.length>0?be(C.__webglFramebuffer[0],I):be(C.__webglFramebuffer,I)}else if(q){C.__webglDepthbuffer=[];for(let oe=0;oe<6;oe++)if(t.bindFramebuffer(r.FRAMEBUFFER,C.__webglFramebuffer[oe]),C.__webglDepthbuffer[oe]===void 0)C.__webglDepthbuffer[oe]=r.createRenderbuffer(),Ue(C.__webglDepthbuffer[oe],I,!1);else{const se=I.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,Q=C.__webglDepthbuffer[oe];r.bindRenderbuffer(r.RENDERBUFFER,Q),r.framebufferRenderbuffer(r.FRAMEBUFFER,se,r.RENDERBUFFER,Q)}}else{const oe=I.texture.mipmaps;if(oe&&oe.length>0?t.bindFramebuffer(r.FRAMEBUFFER,C.__webglFramebuffer[0]):t.bindFramebuffer(r.FRAMEBUFFER,C.__webglFramebuffer),C.__webglDepthbuffer===void 0)C.__webglDepthbuffer=r.createRenderbuffer(),Ue(C.__webglDepthbuffer,I,!1);else{const se=I.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,Q=C.__webglDepthbuffer;r.bindRenderbuffer(r.RENDERBUFFER,Q),r.framebufferRenderbuffer(r.FRAMEBUFFER,se,r.RENDERBUFFER,Q)}}t.bindFramebuffer(r.FRAMEBUFFER,null)}function pt(I,C,q){const oe=n.get(I);C!==void 0&&K(oe.__webglFramebuffer,I,I.texture,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,0),q!==void 0&&je(I)}function Te(I){const C=I.texture,q=n.get(I),oe=n.get(C);I.addEventListener("dispose",T);const se=I.textures,Q=I.isWebGLCubeRenderTarget===!0,ke=se.length>1;if(ke||(oe.__webglTexture===void 0&&(oe.__webglTexture=r.createTexture()),oe.__version=C.version,o.memory.textures++),Q){q.__webglFramebuffer=[];for(let ve=0;ve<6;ve++)if(C.mipmaps&&C.mipmaps.length>0){q.__webglFramebuffer[ve]=[];for(let Qe=0;Qe<C.mipmaps.length;Qe++)q.__webglFramebuffer[ve][Qe]=r.createFramebuffer()}else q.__webglFramebuffer[ve]=r.createFramebuffer()}else{if(C.mipmaps&&C.mipmaps.length>0){q.__webglFramebuffer=[];for(let ve=0;ve<C.mipmaps.length;ve++)q.__webglFramebuffer[ve]=r.createFramebuffer()}else q.__webglFramebuffer=r.createFramebuffer();if(ke)for(let ve=0,Qe=se.length;ve<Qe;ve++){const Ce=n.get(se[ve]);Ce.__webglTexture===void 0&&(Ce.__webglTexture=r.createTexture(),o.memory.textures++)}if(I.samples>0&&Le(I)===!1){q.__webglMultisampledFramebuffer=r.createFramebuffer(),q.__webglColorRenderbuffer=[],t.bindFramebuffer(r.FRAMEBUFFER,q.__webglMultisampledFramebuffer);for(let ve=0;ve<se.length;ve++){const Qe=se[ve];q.__webglColorRenderbuffer[ve]=r.createRenderbuffer(),r.bindRenderbuffer(r.RENDERBUFFER,q.__webglColorRenderbuffer[ve]);const Ce=s.convert(Qe.format,Qe.colorSpace),le=s.convert(Qe.type),me=x(Qe.internalFormat,Ce,le,Qe.colorSpace,I.isXRRenderTarget===!0),Ge=ft(I);r.renderbufferStorageMultisample(r.RENDERBUFFER,Ge,me,I.width,I.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+ve,r.RENDERBUFFER,q.__webglColorRenderbuffer[ve])}r.bindRenderbuffer(r.RENDERBUFFER,null),I.depthBuffer&&(q.__webglDepthRenderbuffer=r.createRenderbuffer(),Ue(q.__webglDepthRenderbuffer,I,!0)),t.bindFramebuffer(r.FRAMEBUFFER,null)}}if(Q){t.bindTexture(r.TEXTURE_CUBE_MAP,oe.__webglTexture),P(r.TEXTURE_CUBE_MAP,C);for(let ve=0;ve<6;ve++)if(C.mipmaps&&C.mipmaps.length>0)for(let Qe=0;Qe<C.mipmaps.length;Qe++)K(q.__webglFramebuffer[ve][Qe],I,C,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+ve,Qe);else K(q.__webglFramebuffer[ve],I,C,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+ve,0);m(C)&&p(r.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(ke){for(let ve=0,Qe=se.length;ve<Qe;ve++){const Ce=se[ve],le=n.get(Ce);let me=r.TEXTURE_2D;(I.isWebGL3DRenderTarget||I.isWebGLArrayRenderTarget)&&(me=I.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),t.bindTexture(me,le.__webglTexture),P(me,Ce),K(q.__webglFramebuffer,I,Ce,r.COLOR_ATTACHMENT0+ve,me,0),m(Ce)&&p(me)}t.unbindTexture()}else{let ve=r.TEXTURE_2D;if((I.isWebGL3DRenderTarget||I.isWebGLArrayRenderTarget)&&(ve=I.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),t.bindTexture(ve,oe.__webglTexture),P(ve,C),C.mipmaps&&C.mipmaps.length>0)for(let Qe=0;Qe<C.mipmaps.length;Qe++)K(q.__webglFramebuffer[Qe],I,C,r.COLOR_ATTACHMENT0,ve,Qe);else K(q.__webglFramebuffer,I,C,r.COLOR_ATTACHMENT0,ve,0);m(C)&&p(ve),t.unbindTexture()}I.depthBuffer&&je(I)}function tt(I){const C=I.textures;for(let q=0,oe=C.length;q<oe;q++){const se=C[q];if(m(se)){const Q=b(I),ke=n.get(se).__webglTexture;t.bindTexture(Q,ke),p(Q),t.unbindTexture()}}}const U=[],ot=[];function X(I){if(I.samples>0){if(Le(I)===!1){const C=I.textures,q=I.width,oe=I.height;let se=r.COLOR_BUFFER_BIT;const Q=I.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,ke=n.get(I),ve=C.length>1;if(ve)for(let Ce=0;Ce<C.length;Ce++)t.bindFramebuffer(r.FRAMEBUFFER,ke.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+Ce,r.RENDERBUFFER,null),t.bindFramebuffer(r.FRAMEBUFFER,ke.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+Ce,r.TEXTURE_2D,null,0);t.bindFramebuffer(r.READ_FRAMEBUFFER,ke.__webglMultisampledFramebuffer);const Qe=I.texture.mipmaps;Qe&&Qe.length>0?t.bindFramebuffer(r.DRAW_FRAMEBUFFER,ke.__webglFramebuffer[0]):t.bindFramebuffer(r.DRAW_FRAMEBUFFER,ke.__webglFramebuffer);for(let Ce=0;Ce<C.length;Ce++){if(I.resolveDepthBuffer&&(I.depthBuffer&&(se|=r.DEPTH_BUFFER_BIT),I.stencilBuffer&&I.resolveStencilBuffer&&(se|=r.STENCIL_BUFFER_BIT)),ve){r.framebufferRenderbuffer(r.READ_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,ke.__webglColorRenderbuffer[Ce]);const le=n.get(C[Ce]).__webglTexture;r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,le,0)}r.blitFramebuffer(0,0,q,oe,0,0,q,oe,se,r.NEAREST),l===!0&&(U.length=0,ot.length=0,U.push(r.COLOR_ATTACHMENT0+Ce),I.depthBuffer&&I.resolveDepthBuffer===!1&&(U.push(Q),ot.push(Q),r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,ot)),r.invalidateFramebuffer(r.READ_FRAMEBUFFER,U))}if(t.bindFramebuffer(r.READ_FRAMEBUFFER,null),t.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),ve)for(let Ce=0;Ce<C.length;Ce++){t.bindFramebuffer(r.FRAMEBUFFER,ke.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+Ce,r.RENDERBUFFER,ke.__webglColorRenderbuffer[Ce]);const le=n.get(C[Ce]).__webglTexture;t.bindFramebuffer(r.FRAMEBUFFER,ke.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+Ce,r.TEXTURE_2D,le,0)}t.bindFramebuffer(r.DRAW_FRAMEBUFFER,ke.__webglMultisampledFramebuffer)}else if(I.depthBuffer&&I.resolveDepthBuffer===!1&&l){const C=I.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,[C])}}}function ft(I){return Math.min(i.maxSamples,I.samples)}function Le(I){const C=n.get(I);return I.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&C.__useRenderToTexture!==!1}function wt(I){const C=o.render.frame;u.get(I)!==C&&(u.set(I,C),I.update())}function Re(I,C){const q=I.colorSpace,oe=I.format,se=I.type;return I.isCompressedTexture===!0||I.isVideoTexture===!0||q!==Zn&&q!==_s&&(It.getTransfer(q)===Kt?(oe!==Xi||se!==Pr)&&st("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Rt("WebGLTextures: Unsupported texture color space:",q)),C}function Fe(I){return typeof HTMLImageElement<"u"&&I instanceof HTMLImageElement?(c.width=I.naturalWidth||I.width,c.height=I.naturalHeight||I.height):typeof VideoFrame<"u"&&I instanceof VideoFrame?(c.width=I.displayWidth,c.height=I.displayHeight):(c.width=I.width,c.height=I.height),c}this.allocateTextureUnit=V,this.resetTextureUnits=N,this.setTexture2D=k,this.setTexture2DArray=G,this.setTexture3D=Y,this.setTextureCube=F,this.rebindTextures=pt,this.setupRenderTarget=Te,this.updateRenderTargetMipmap=tt,this.updateMultisampleRenderTarget=X,this.setupDepthRenderbuffer=je,this.setupFrameBufferTexture=K,this.useMultisampledRTT=Le}function PT(r,e){function t(n,i=_s){let s;const o=It.getTransfer(i);if(n===Pr)return r.UNSIGNED_BYTE;if(n===qh)return r.UNSIGNED_SHORT_4_4_4_4;if(n===Yh)return r.UNSIGNED_SHORT_5_5_5_1;if(n===kg)return r.UNSIGNED_INT_5_9_9_9_REV;if(n===Bg)return r.UNSIGNED_INT_10F_11F_11F_REV;if(n===Fg)return r.BYTE;if(n===Ug)return r.SHORT;if(n===Bl)return r.UNSIGNED_SHORT;if(n===Xh)return r.INT;if(n===bo)return r.UNSIGNED_INT;if(n===sr)return r.FLOAT;if(n===Fa)return r.HALF_FLOAT;if(n===zg)return r.ALPHA;if(n===Vg)return r.RGB;if(n===Xi)return r.RGBA;if(n===Vl)return r.DEPTH_COMPONENT;if(n===Hl)return r.DEPTH_STENCIL;if(n===$h)return r.RED;if(n===jh)return r.RED_INTEGER;if(n===Kh)return r.RG;if(n===Zh)return r.RG_INTEGER;if(n===Jh)return r.RGBA_INTEGER;if(n===nu||n===iu||n===ru||n===su)if(o===Kt)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(n===nu)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===iu)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===ru)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===su)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(n===nu)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===iu)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===ru)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===su)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===wf||n===Sf||n===Mf||n===Tf)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(n===wf)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Sf)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Mf)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Tf)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Ef||n===Af||n===Cf)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(n===Ef||n===Af)return o===Kt?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(n===Cf)return o===Kt?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===Rf||n===Pf||n===Lf||n===Df||n===If||n===Of||n===Nf||n===Ff||n===Uf||n===kf||n===Bf||n===zf||n===Vf||n===Hf)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(n===Rf)return o===Kt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Pf)return o===Kt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Lf)return o===Kt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Df)return o===Kt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===If)return o===Kt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Of)return o===Kt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Nf)return o===Kt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Ff)return o===Kt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Uf)return o===Kt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===kf)return o===Kt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Bf)return o===Kt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===zf)return o===Kt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Vf)return o===Kt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Hf)return o===Kt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Gf||n===Wf||n===Xf)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(n===Gf)return o===Kt?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Wf)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Xf)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===qf||n===Yf||n===$f||n===jf)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(n===qf)return s.COMPRESSED_RED_RGTC1_EXT;if(n===Yf)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===$f)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===jf)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===zl?r.UNSIGNED_INT_24_8:r[n]!==void 0?r[n]:null}return{convert:t}}const LT=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,DT=`
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

}`;class IT{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const n=new s_(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new fi({vertexShader:LT,fragmentShader:DT,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Jn(new Vi(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class OT extends Ua{constructor(e,t){super();const n=this;let i=null,s=1,o=null,a="local-floor",l=1,c=null,u=null,d=null,f=null,h=null,_=null;const g=typeof XRWebGLBinding<"u",m=new IT,p={},b=t.getContextAttributes();let x=null,v=null;const E=[],M=[],T=new Et;let R=null;const w=new li;w.viewport=new zt;const y=new li;y.viewport=new zt;const D=[w,y],N=new Gb;let V=null,j=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(te){let ie=E[te];return ie===void 0&&(ie=new Ed,E[te]=ie),ie.getTargetRaySpace()},this.getControllerGrip=function(te){let ie=E[te];return ie===void 0&&(ie=new Ed,E[te]=ie),ie.getGripSpace()},this.getHand=function(te){let ie=E[te];return ie===void 0&&(ie=new Ed,E[te]=ie),ie.getHandSpace()};function k(te){const ie=M.indexOf(te.inputSource);if(ie===-1)return;const K=E[ie];K!==void 0&&(K.update(te.inputSource,te.frame,c||o),K.dispatchEvent({type:te.type,data:te.inputSource}))}function G(){i.removeEventListener("select",k),i.removeEventListener("selectstart",k),i.removeEventListener("selectend",k),i.removeEventListener("squeeze",k),i.removeEventListener("squeezestart",k),i.removeEventListener("squeezeend",k),i.removeEventListener("end",G),i.removeEventListener("inputsourceschange",Y);for(let te=0;te<E.length;te++){const ie=M[te];ie!==null&&(M[te]=null,E[te].disconnect(ie))}V=null,j=null,m.reset();for(const te in p)delete p[te];e.setRenderTarget(x),h=null,f=null,d=null,i=null,v=null,ze.stop(),n.isPresenting=!1,e.setPixelRatio(R),e.setSize(T.width,T.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(te){s=te,n.isPresenting===!0&&st("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(te){a=te,n.isPresenting===!0&&st("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(te){c=te},this.getBaseLayer=function(){return f!==null?f:h},this.getBinding=function(){return d===null&&g&&(d=new XRWebGLBinding(i,t)),d},this.getFrame=function(){return _},this.getSession=function(){return i},this.setSession=async function(te){if(i=te,i!==null){if(x=e.getRenderTarget(),i.addEventListener("select",k),i.addEventListener("selectstart",k),i.addEventListener("selectend",k),i.addEventListener("squeeze",k),i.addEventListener("squeezestart",k),i.addEventListener("squeezeend",k),i.addEventListener("end",G),i.addEventListener("inputsourceschange",Y),b.xrCompatible!==!0&&await t.makeXRCompatible(),R=e.getPixelRatio(),e.getSize(T),g&&"createProjectionLayer"in XRWebGLBinding.prototype){let K=null,Ue=null,be=null;b.depth&&(be=b.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,K=b.stencil?Hl:Vl,Ue=b.stencil?zl:bo);const je={colorFormat:t.RGBA8,depthFormat:be,scaleFactor:s};d=this.getBinding(),f=d.createProjectionLayer(je),i.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),v=new Is(f.textureWidth,f.textureHeight,{format:Xi,type:Pr,depthTexture:new r_(f.textureWidth,f.textureHeight,Ue,void 0,void 0,void 0,void 0,void 0,void 0,K),stencilBuffer:b.stencil,colorSpace:e.outputColorSpace,samples:b.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}else{const K={antialias:b.antialias,alpha:!0,depth:b.depth,stencil:b.stencil,framebufferScaleFactor:s};h=new XRWebGLLayer(i,t,K),i.updateRenderState({baseLayer:h}),e.setPixelRatio(1),e.setSize(h.framebufferWidth,h.framebufferHeight,!1),v=new Is(h.framebufferWidth,h.framebufferHeight,{format:Xi,type:Pr,colorSpace:e.outputColorSpace,stencilBuffer:b.stencil,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1})}v.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await i.requestReferenceSpace(a),ze.setContext(i),ze.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function Y(te){for(let ie=0;ie<te.removed.length;ie++){const K=te.removed[ie],Ue=M.indexOf(K);Ue>=0&&(M[Ue]=null,E[Ue].disconnect(K))}for(let ie=0;ie<te.added.length;ie++){const K=te.added[ie];let Ue=M.indexOf(K);if(Ue===-1){for(let je=0;je<E.length;je++)if(je>=M.length){M.push(K),Ue=je;break}else if(M[je]===null){M[je]=K,Ue=je;break}if(Ue===-1)break}const be=E[Ue];be&&be.connect(K)}}const F=new $,ae=new $;function O(te,ie,K){F.setFromMatrixPosition(ie.matrixWorld),ae.setFromMatrixPosition(K.matrixWorld);const Ue=F.distanceTo(ae),be=ie.projectionMatrix.elements,je=K.projectionMatrix.elements,pt=be[14]/(be[10]-1),Te=be[14]/(be[10]+1),tt=(be[9]+1)/be[5],U=(be[9]-1)/be[5],ot=(be[8]-1)/be[0],X=(je[8]+1)/je[0],ft=pt*ot,Le=pt*X,wt=Ue/(-ot+X),Re=wt*-ot;if(ie.matrixWorld.decompose(te.position,te.quaternion,te.scale),te.translateX(Re),te.translateZ(wt),te.matrixWorld.compose(te.position,te.quaternion,te.scale),te.matrixWorldInverse.copy(te.matrixWorld).invert(),be[10]===-1)te.projectionMatrix.copy(ie.projectionMatrix),te.projectionMatrixInverse.copy(ie.projectionMatrixInverse);else{const Fe=pt+wt,I=Te+wt,C=ft-Re,q=Le+(Ue-Re),oe=tt*Te/I*Fe,se=U*Te/I*Fe;te.projectionMatrix.makePerspective(C,q,oe,se,Fe,I),te.projectionMatrixInverse.copy(te.projectionMatrix).invert()}}function he(te,ie){ie===null?te.matrixWorld.copy(te.matrix):te.matrixWorld.multiplyMatrices(ie.matrixWorld,te.matrix),te.matrixWorldInverse.copy(te.matrixWorld).invert()}this.updateCamera=function(te){if(i===null)return;let ie=te.near,K=te.far;m.texture!==null&&(m.depthNear>0&&(ie=m.depthNear),m.depthFar>0&&(K=m.depthFar)),N.near=y.near=w.near=ie,N.far=y.far=w.far=K,(V!==N.near||j!==N.far)&&(i.updateRenderState({depthNear:N.near,depthFar:N.far}),V=N.near,j=N.far),N.layers.mask=te.layers.mask|6,w.layers.mask=N.layers.mask&3,y.layers.mask=N.layers.mask&5;const Ue=te.parent,be=N.cameras;he(N,Ue);for(let je=0;je<be.length;je++)he(be[je],Ue);be.length===2?O(N,w,y):N.projectionMatrix.copy(w.projectionMatrix),P(te,N,Ue)};function P(te,ie,K){K===null?te.matrix.copy(ie.matrixWorld):(te.matrix.copy(K.matrixWorld),te.matrix.invert(),te.matrix.multiply(ie.matrixWorld)),te.matrix.decompose(te.position,te.quaternion,te.scale),te.updateMatrixWorld(!0),te.projectionMatrix.copy(ie.projectionMatrix),te.projectionMatrixInverse.copy(ie.projectionMatrixInverse),te.isPerspectiveCamera&&(te.fov=Ma*2*Math.atan(1/te.projectionMatrix.elements[5]),te.zoom=1)}this.getCamera=function(){return N},this.getFoveation=function(){if(!(f===null&&h===null))return l},this.setFoveation=function(te){l=te,f!==null&&(f.fixedFoveation=te),h!==null&&h.fixedFoveation!==void 0&&(h.fixedFoveation=te)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(N)},this.getCameraTexture=function(te){return p[te]};let Me=null;function Ne(te,ie){if(u=ie.getViewerPose(c||o),_=ie,u!==null){const K=u.views;h!==null&&(e.setRenderTargetFramebuffer(v,h.framebuffer),e.setRenderTarget(v));let Ue=!1;K.length!==N.cameras.length&&(N.cameras.length=0,Ue=!0);for(let Te=0;Te<K.length;Te++){const tt=K[Te];let U=null;if(h!==null)U=h.getViewport(tt);else{const X=d.getViewSubImage(f,tt);U=X.viewport,Te===0&&(e.setRenderTargetTextures(v,X.colorTexture,X.depthStencilTexture),e.setRenderTarget(v))}let ot=D[Te];ot===void 0&&(ot=new li,ot.layers.enable(Te),ot.viewport=new zt,D[Te]=ot),ot.matrix.fromArray(tt.transform.matrix),ot.matrix.decompose(ot.position,ot.quaternion,ot.scale),ot.projectionMatrix.fromArray(tt.projectionMatrix),ot.projectionMatrixInverse.copy(ot.projectionMatrix).invert(),ot.viewport.set(U.x,U.y,U.width,U.height),Te===0&&(N.matrix.copy(ot.matrix),N.matrix.decompose(N.position,N.quaternion,N.scale)),Ue===!0&&N.cameras.push(ot)}const be=i.enabledFeatures;if(be&&be.includes("depth-sensing")&&i.depthUsage=="gpu-optimized"&&g){d=n.getBinding();const Te=d.getDepthInformation(K[0]);Te&&Te.isValid&&Te.texture&&m.init(Te,i.renderState)}if(be&&be.includes("camera-access")&&g){e.state.unbindTexture(),d=n.getBinding();for(let Te=0;Te<K.length;Te++){const tt=K[Te].camera;if(tt){let U=p[tt];U||(U=new s_,p[tt]=U);const ot=d.getCameraImage(tt);U.sourceTexture=ot}}}}for(let K=0;K<E.length;K++){const Ue=M[K],be=E[K];Ue!==null&&be!==void 0&&be.update(Ue,ie,c||o)}Me&&Me(te,ie),ie.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:ie}),_=null}const ze=new d_;ze.setAnimationLoop(Ne),this.setAnimationLoop=function(te){Me=te},this.dispose=function(){}}}const $s=new Lr,NT=new yt;function FT(r,e){function t(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,Zg(r)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function i(m,p,b,x,v){p.isMeshBasicMaterial||p.isMeshLambertMaterial?s(m,p):p.isMeshToonMaterial?(s(m,p),d(m,p)):p.isMeshPhongMaterial?(s(m,p),u(m,p)):p.isMeshStandardMaterial?(s(m,p),f(m,p),p.isMeshPhysicalMaterial&&h(m,p,v)):p.isMeshMatcapMaterial?(s(m,p),_(m,p)):p.isMeshDepthMaterial?s(m,p):p.isMeshDistanceMaterial?(s(m,p),g(m,p)):p.isMeshNormalMaterial?s(m,p):p.isLineBasicMaterial?(o(m,p),p.isLineDashedMaterial&&a(m,p)):p.isPointsMaterial?l(m,p,b,x):p.isSpriteMaterial?c(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function s(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,t(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===_i&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,t(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===_i&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,t(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,t(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const b=e.get(p),x=b.envMap,v=b.envMapRotation;x&&(m.envMap.value=x,$s.copy(v),$s.x*=-1,$s.y*=-1,$s.z*=-1,x.isCubeTexture&&x.isRenderTargetTexture===!1&&($s.y*=-1,$s.z*=-1),m.envMapRotation.value.setFromMatrix4(NT.makeRotationFromEuler($s)),m.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,m.aoMapTransform))}function o(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform))}function a(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function l(m,p,b,x){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*b,m.scale.value=x*.5,p.map&&(m.map.value=p.map,t(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function c(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function u(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function d(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function f(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function h(m,p,b){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===_i&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=b.texture,m.transmissionSamplerSize.value.set(b.width,b.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,m.specularIntensityMapTransform))}function _(m,p){p.matcap&&(m.matcap.value=p.matcap)}function g(m,p){const b=e.get(p).light;m.referencePosition.value.setFromMatrixPosition(b.matrixWorld),m.nearDistance.value=b.shadow.camera.near,m.farDistance.value=b.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function UT(r,e,t,n){let i={},s={},o=[];const a=r.getParameter(r.MAX_UNIFORM_BUFFER_BINDINGS);function l(b,x){const v=x.program;n.uniformBlockBinding(b,v)}function c(b,x){let v=i[b.id];v===void 0&&(_(b),v=u(b),i[b.id]=v,b.addEventListener("dispose",m));const E=x.program;n.updateUBOMapping(b,E);const M=e.render.frame;s[b.id]!==M&&(f(b),s[b.id]=M)}function u(b){const x=d();b.__bindingPointIndex=x;const v=r.createBuffer(),E=b.__size,M=b.usage;return r.bindBuffer(r.UNIFORM_BUFFER,v),r.bufferData(r.UNIFORM_BUFFER,E,M),r.bindBuffer(r.UNIFORM_BUFFER,null),r.bindBufferBase(r.UNIFORM_BUFFER,x,v),v}function d(){for(let b=0;b<a;b++)if(o.indexOf(b)===-1)return o.push(b),b;return Rt("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(b){const x=i[b.id],v=b.uniforms,E=b.__cache;r.bindBuffer(r.UNIFORM_BUFFER,x);for(let M=0,T=v.length;M<T;M++){const R=Array.isArray(v[M])?v[M]:[v[M]];for(let w=0,y=R.length;w<y;w++){const D=R[w];if(h(D,M,w,E)===!0){const N=D.__offset,V=Array.isArray(D.value)?D.value:[D.value];let j=0;for(let k=0;k<V.length;k++){const G=V[k],Y=g(G);typeof G=="number"||typeof G=="boolean"?(D.__data[0]=G,r.bufferSubData(r.UNIFORM_BUFFER,N+j,D.__data)):G.isMatrix3?(D.__data[0]=G.elements[0],D.__data[1]=G.elements[1],D.__data[2]=G.elements[2],D.__data[3]=0,D.__data[4]=G.elements[3],D.__data[5]=G.elements[4],D.__data[6]=G.elements[5],D.__data[7]=0,D.__data[8]=G.elements[6],D.__data[9]=G.elements[7],D.__data[10]=G.elements[8],D.__data[11]=0):(G.toArray(D.__data,j),j+=Y.storage/Float32Array.BYTES_PER_ELEMENT)}r.bufferSubData(r.UNIFORM_BUFFER,N,D.__data)}}}r.bindBuffer(r.UNIFORM_BUFFER,null)}function h(b,x,v,E){const M=b.value,T=x+"_"+v;if(E[T]===void 0)return typeof M=="number"||typeof M=="boolean"?E[T]=M:E[T]=M.clone(),!0;{const R=E[T];if(typeof M=="number"||typeof M=="boolean"){if(R!==M)return E[T]=M,!0}else if(R.equals(M)===!1)return R.copy(M),!0}return!1}function _(b){const x=b.uniforms;let v=0;const E=16;for(let T=0,R=x.length;T<R;T++){const w=Array.isArray(x[T])?x[T]:[x[T]];for(let y=0,D=w.length;y<D;y++){const N=w[y],V=Array.isArray(N.value)?N.value:[N.value];for(let j=0,k=V.length;j<k;j++){const G=V[j],Y=g(G),F=v%E,ae=F%Y.boundary,O=F+ae;v+=ae,O!==0&&E-O<Y.storage&&(v+=E-O),N.__data=new Float32Array(Y.storage/Float32Array.BYTES_PER_ELEMENT),N.__offset=v,v+=Y.storage}}}const M=v%E;return M>0&&(v+=E-M),b.__size=v,b.__cache={},this}function g(b){const x={boundary:0,storage:0};return typeof b=="number"||typeof b=="boolean"?(x.boundary=4,x.storage=4):b.isVector2?(x.boundary=8,x.storage=8):b.isVector3||b.isColor?(x.boundary=16,x.storage=12):b.isVector4?(x.boundary=16,x.storage=16):b.isMatrix3?(x.boundary=48,x.storage=48):b.isMatrix4?(x.boundary=64,x.storage=64):b.isTexture?st("WebGLRenderer: Texture samplers can not be part of an uniforms group."):st("WebGLRenderer: Unsupported uniform value type.",b),x}function m(b){const x=b.target;x.removeEventListener("dispose",m);const v=o.indexOf(x.__bindingPointIndex);o.splice(v,1),r.deleteBuffer(i[x.id]),delete i[x.id],delete s[x.id]}function p(){for(const b in i)r.deleteBuffer(i[b]);o=[],i={},s={}}return{bind:l,update:c,dispose:p}}const kT=new Uint16Array([11481,15204,11534,15171,11808,15015,12385,14843,12894,14716,13396,14600,13693,14483,13976,14366,14237,14171,14405,13961,14511,13770,14605,13598,14687,13444,14760,13305,14822,13066,14876,12857,14923,12675,14963,12517,14997,12379,15025,12230,15049,12023,15070,11843,15086,11687,15100,11551,15111,11433,15120,11330,15127,11217,15132,11060,15135,10922,15138,10801,15139,10695,15139,10600,13012,14923,13020,14917,13064,14886,13176,14800,13349,14666,13513,14526,13724,14398,13960,14230,14200,14020,14383,13827,14488,13651,14583,13491,14667,13348,14740,13132,14803,12908,14856,12713,14901,12542,14938,12394,14968,12241,14992,12017,15010,11822,15024,11654,15034,11507,15041,11380,15044,11269,15044,11081,15042,10913,15037,10764,15031,10635,15023,10520,15014,10419,15003,10330,13657,14676,13658,14673,13670,14660,13698,14622,13750,14547,13834,14442,13956,14317,14112,14093,14291,13889,14407,13704,14499,13538,14586,13389,14664,13201,14733,12966,14792,12758,14842,12577,14882,12418,14915,12272,14940,12033,14959,11826,14972,11646,14980,11490,14983,11355,14983,11212,14979,11008,14971,10830,14961,10675,14950,10540,14936,10420,14923,10315,14909,10204,14894,10041,14089,14460,14090,14459,14096,14452,14112,14431,14141,14388,14186,14305,14252,14130,14341,13941,14399,13756,14467,13585,14539,13430,14610,13272,14677,13026,14737,12808,14790,12617,14833,12449,14869,12303,14896,12065,14916,11845,14929,11655,14937,11490,14939,11347,14936,11184,14930,10970,14921,10783,14912,10621,14900,10480,14885,10356,14867,10247,14848,10062,14827,9894,14805,9745,14400,14208,14400,14206,14402,14198,14406,14174,14415,14122,14427,14035,14444,13913,14469,13767,14504,13613,14548,13463,14598,13324,14651,13082,14704,12858,14752,12658,14795,12483,14831,12330,14860,12106,14881,11875,14895,11675,14903,11501,14905,11351,14903,11178,14900,10953,14892,10757,14880,10589,14865,10442,14847,10313,14827,10162,14805,9965,14782,9792,14757,9642,14731,9507,14562,13883,14562,13883,14563,13877,14566,13862,14570,13830,14576,13773,14584,13689,14595,13582,14613,13461,14637,13336,14668,13120,14704,12897,14741,12695,14776,12516,14808,12358,14835,12150,14856,11910,14870,11701,14878,11519,14882,11361,14884,11187,14880,10951,14871,10748,14858,10572,14842,10418,14823,10286,14801,10099,14777,9897,14751,9722,14725,9567,14696,9430,14666,9309,14702,13604,14702,13604,14702,13600,14703,13591,14705,13570,14707,13533,14709,13477,14712,13400,14718,13305,14727,13106,14743,12907,14762,12716,14784,12539,14807,12380,14827,12190,14844,11943,14855,11727,14863,11539,14870,11376,14871,11204,14868,10960,14858,10748,14845,10565,14829,10406,14809,10269,14786,10058,14761,9852,14734,9671,14705,9512,14674,9374,14641,9253,14608,9076,14821,13366,14821,13365,14821,13364,14821,13358,14821,13344,14821,13320,14819,13252,14817,13145,14815,13011,14814,12858,14817,12698,14823,12539,14832,12389,14841,12214,14850,11968,14856,11750,14861,11558,14866,11390,14867,11226,14862,10972,14853,10754,14840,10565,14823,10401,14803,10259,14780,10032,14754,9820,14725,9635,14694,9473,14661,9333,14627,9203,14593,8988,14557,8798,14923,13014,14922,13014,14922,13012,14922,13004,14920,12987,14919,12957,14915,12907,14909,12834,14902,12738,14894,12623,14888,12498,14883,12370,14880,12203,14878,11970,14875,11759,14873,11569,14874,11401,14872,11243,14865,10986,14855,10762,14842,10568,14825,10401,14804,10255,14781,10017,14754,9799,14725,9611,14692,9445,14658,9301,14623,9139,14587,8920,14548,8729,14509,8562,15008,12672,15008,12672,15008,12671,15007,12667,15005,12656,15001,12637,14997,12605,14989,12556,14978,12490,14966,12407,14953,12313,14940,12136,14927,11934,14914,11742,14903,11563,14896,11401,14889,11247,14879,10992,14866,10767,14851,10570,14833,10400,14812,10252,14789,10007,14761,9784,14731,9592,14698,9424,14663,9279,14627,9088,14588,8868,14548,8676,14508,8508,14467,8360,15080,12386,15080,12386,15079,12385,15078,12383,15076,12378,15072,12367,15066,12347,15057,12315,15045,12253,15030,12138,15012,11998,14993,11845,14972,11685,14951,11530,14935,11383,14920,11228,14904,10981,14887,10762,14870,10567,14850,10397,14827,10248,14803,9997,14774,9771,14743,9578,14710,9407,14674,9259,14637,9048,14596,8826,14555,8632,14514,8464,14471,8317,14427,8182,15139,12008,15139,12008,15138,12008,15137,12007,15135,12003,15130,11990,15124,11969,15115,11929,15102,11872,15086,11794,15064,11693,15041,11581,15013,11459,14987,11336,14966,11170,14944,10944,14921,10738,14898,10552,14875,10387,14850,10239,14824,9983,14794,9758,14762,9563,14728,9392,14692,9244,14653,9014,14611,8791,14569,8597,14526,8427,14481,8281,14436,8110,14391,7885,15188,11617,15188,11617,15187,11617,15186,11618,15183,11617,15179,11612,15173,11601,15163,11581,15150,11546,15133,11495,15110,11427,15083,11346,15051,11246,15024,11057,14996,10868,14967,10687,14938,10517,14911,10362,14882,10206,14853,9956,14821,9737,14787,9543,14752,9375,14715,9228,14675,8980,14632,8760,14589,8565,14544,8395,14498,8248,14451,8049,14404,7824,14357,7630,15228,11298,15228,11298,15227,11299,15226,11301,15223,11303,15219,11302,15213,11299,15204,11290,15191,11271,15174,11217,15150,11129,15119,11015,15087,10886,15057,10744,15024,10599,14990,10455,14957,10318,14924,10143,14891,9911,14856,9701,14820,9516,14782,9352,14744,9200,14703,8946,14659,8725,14615,8533,14568,8366,14521,8220,14472,7992,14423,7770,14374,7578,14315,7408,15260,10819,15260,10819,15259,10822,15258,10826,15256,10832,15251,10836,15246,10841,15237,10838,15225,10821,15207,10788,15183,10734,15151,10660,15120,10571,15087,10469,15049,10359,15012,10249,14974,10041,14937,9837,14900,9647,14860,9475,14820,9320,14779,9147,14736,8902,14691,8688,14646,8499,14598,8335,14549,8189,14499,7940,14448,7720,14397,7529,14347,7363,14256,7218,15285,10410,15285,10411,15285,10413,15284,10418,15282,10425,15278,10434,15272,10442,15264,10449,15252,10445,15235,10433,15210,10403,15179,10358,15149,10301,15113,10218,15073,10059,15033,9894,14991,9726,14951,9565,14909,9413,14865,9273,14822,9073,14777,8845,14730,8641,14682,8459,14633,8300,14583,8129,14531,7883,14479,7670,14426,7482,14373,7321,14305,7176,14201,6939,15305,9939,15305,9940,15305,9945,15304,9955,15302,9967,15298,9989,15293,10010,15286,10033,15274,10044,15258,10045,15233,10022,15205,9975,15174,9903,15136,9808,15095,9697,15053,9578,15009,9451,14965,9327,14918,9198,14871,8973,14825,8766,14775,8579,14725,8408,14675,8259,14622,8058,14569,7821,14515,7615,14460,7435,14405,7276,14350,7108,14256,6866,14149,6653,15321,9444,15321,9445,15321,9448,15320,9458,15317,9470,15314,9490,15310,9515,15302,9540,15292,9562,15276,9579,15251,9577,15226,9559,15195,9519,15156,9463,15116,9389,15071,9304,15025,9208,14978,9023,14927,8838,14878,8661,14827,8496,14774,8344,14722,8206,14667,7973,14612,7749,14556,7555,14499,7382,14443,7229,14385,7025,14322,6791,14210,6588,14100,6409,15333,8920,15333,8921,15332,8927,15332,8943,15329,8965,15326,9002,15322,9048,15316,9106,15307,9162,15291,9204,15267,9221,15244,9221,15212,9196,15175,9134,15133,9043,15088,8930,15040,8801,14990,8665,14938,8526,14886,8391,14830,8261,14775,8087,14719,7866,14661,7664,14603,7482,14544,7322,14485,7178,14426,6936,14367,6713,14281,6517,14166,6348,14054,6198,15341,8360,15341,8361,15341,8366,15341,8379,15339,8399,15336,8431,15332,8473,15326,8527,15318,8585,15302,8632,15281,8670,15258,8690,15227,8690,15191,8664,15149,8612,15104,8543,15055,8456,15001,8360,14948,8259,14892,8122,14834,7923,14776,7734,14716,7558,14656,7397,14595,7250,14534,7070,14472,6835,14410,6628,14350,6443,14243,6283,14125,6135,14010,5889,15348,7715,15348,7717,15348,7725,15347,7745,15345,7780,15343,7836,15339,7905,15334,8e3,15326,8103,15310,8193,15293,8239,15270,8270,15240,8287,15204,8283,15163,8260,15118,8223,15067,8143,15014,8014,14958,7873,14899,7723,14839,7573,14778,7430,14715,7293,14652,7164,14588,6931,14524,6720,14460,6531,14396,6362,14330,6210,14207,6015,14086,5781,13969,5576,15352,7114,15352,7116,15352,7128,15352,7159,15350,7195,15348,7237,15345,7299,15340,7374,15332,7457,15317,7544,15301,7633,15280,7703,15251,7754,15216,7775,15176,7767,15131,7733,15079,7670,15026,7588,14967,7492,14906,7387,14844,7278,14779,7171,14714,6965,14648,6770,14581,6587,14515,6420,14448,6269,14382,6123,14299,5881,14172,5665,14049,5477,13929,5310,15355,6329,15355,6330,15355,6339,15355,6362,15353,6410,15351,6472,15349,6572,15344,6688,15337,6835,15323,6985,15309,7142,15287,7220,15260,7277,15226,7310,15188,7326,15142,7318,15090,7285,15036,7239,14976,7177,14914,7045,14849,6892,14782,6736,14714,6581,14645,6433,14576,6293,14506,6164,14438,5946,14369,5733,14270,5540,14140,5369,14014,5216,13892,5043,15357,5483,15357,5484,15357,5496,15357,5528,15356,5597,15354,5692,15351,5835,15347,6011,15339,6195,15328,6317,15314,6446,15293,6566,15268,6668,15235,6746,15197,6796,15152,6811,15101,6790,15046,6748,14985,6673,14921,6583,14854,6479,14785,6371,14714,6259,14643,6149,14571,5946,14499,5750,14428,5567,14358,5401,14242,5250,14109,5111,13980,4870,13856,4657,15359,4555,15359,4557,15358,4573,15358,4633,15357,4715,15355,4841,15353,5061,15349,5216,15342,5391,15331,5577,15318,5770,15299,5967,15274,6150,15243,6223,15206,6280,15161,6310,15111,6317,15055,6300,14994,6262,14928,6208,14860,6141,14788,5994,14715,5838,14641,5684,14566,5529,14492,5384,14418,5247,14346,5121,14216,4892,14079,4682,13948,4496,13822,4330,15359,3498,15359,3501,15359,3520,15359,3598,15358,3719,15356,3860,15355,4137,15351,4305,15344,4563,15334,4809,15321,5116,15303,5273,15280,5418,15250,5547,15214,5653,15170,5722,15120,5761,15064,5763,15002,5733,14935,5673,14865,5597,14792,5504,14716,5400,14640,5294,14563,5185,14486,5041,14410,4841,14335,4655,14191,4482,14051,4325,13918,4183,13790,4012,15360,2282,15360,2285,15360,2306,15360,2401,15359,2547,15357,2748,15355,3103,15352,3349,15345,3675,15336,4020,15324,4272,15307,4496,15285,4716,15255,4908,15220,5086,15178,5170,15128,5214,15072,5234,15010,5231,14943,5206,14871,5166,14796,5102,14718,4971,14639,4833,14559,4687,14480,4541,14402,4401,14315,4268,14167,4142,14025,3958,13888,3747,13759,3556,15360,923,15360,925,15360,946,15360,1052,15359,1214,15357,1494,15356,1892,15352,2274,15346,2663,15338,3099,15326,3393,15309,3679,15288,3980,15260,4183,15226,4325,15185,4437,15136,4517,15080,4570,15018,4591,14950,4581,14877,4545,14800,4485,14720,4411,14638,4325,14556,4231,14475,4136,14395,3988,14297,3803,14145,3628,13999,3465,13861,3314,13729,3177,15360,263,15360,264,15360,272,15360,325,15359,407,15358,548,15356,780,15352,1144,15347,1580,15339,2099,15328,2425,15312,2795,15292,3133,15264,3329,15232,3517,15191,3689,15143,3819,15088,3923,15025,3978,14956,3999,14882,3979,14804,3931,14722,3855,14639,3756,14554,3645,14470,3529,14388,3409,14279,3289,14124,3173,13975,3055,13834,2848,13701,2658,15360,49,15360,49,15360,52,15360,75,15359,111,15358,201,15356,283,15353,519,15348,726,15340,1045,15329,1415,15314,1795,15295,2173,15269,2410,15237,2649,15197,2866,15150,3054,15095,3140,15032,3196,14963,3228,14888,3236,14808,3224,14725,3191,14639,3146,14553,3088,14466,2976,14382,2836,14262,2692,14103,2549,13952,2409,13808,2278,13674,2154,15360,4,15360,4,15360,4,15360,13,15359,33,15358,59,15357,112,15353,199,15348,302,15341,456,15331,628,15316,827,15297,1082,15272,1332,15241,1601,15202,1851,15156,2069,15101,2172,15039,2256,14970,2314,14894,2348,14813,2358,14728,2344,14640,2311,14551,2263,14463,2203,14376,2133,14247,2059,14084,1915,13930,1761,13784,1609,13648,1464,15360,0,15360,0,15360,0,15360,3,15359,18,15358,26,15357,53,15354,80,15348,97,15341,165,15332,238,15318,326,15299,427,15275,529,15245,654,15207,771,15161,885,15108,994,15046,1089,14976,1170,14900,1229,14817,1266,14731,1284,14641,1282,14550,1260,14460,1223,14370,1174,14232,1116,14066,1050,13909,981,13761,910,13623,839]);let zr=null;function BT(){return zr===null&&(zr=new np(kT,32,32,Kh,Fa),zr.minFilter=jn,zr.magFilter=jn,zr.wrapS=wr,zr.wrapT=wr,zr.generateMipmaps=!1,zr.needsUpdate=!0),zr}class g_{constructor(e={}){const{canvas:t=My(),context:n=null,depth:i=!0,stencil:s=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:f=!1}=e;this.isWebGLRenderer=!0;let h;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");h=n.getContextAttributes().alpha}else h=o;const _=new Set([Jh,Zh,jh]),g=new Set([Pr,bo,Bl,zl,qh,Yh]),m=new Uint32Array(4),p=new Int32Array(4);let b=null,x=null;const v=[],E=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Cs,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const M=this;let T=!1;this._outputColorSpace=Mn;let R=0,w=0,y=null,D=-1,N=null;const V=new zt,j=new zt;let k=null;const G=new $e(0);let Y=0,F=t.width,ae=t.height,O=1,he=null,P=null;const Me=new zt(0,0,F,ae),Ne=new zt(0,0,F,ae);let ze=!1;const te=new rp;let ie=!1,K=!1;const Ue=new yt,be=new $,je=new zt,pt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Te=!1;function tt(){return y===null?O:1}let U=n;function ot(A,z){return t.getContext(A,z)}try{const A={alpha:!0,depth:i,stencil:s,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Wh}`),t.addEventListener("webglcontextlost",ne,!1),t.addEventListener("webglcontextrestored",ce,!1),t.addEventListener("webglcontextcreationerror",Ve,!1),U===null){const z="webgl2";if(U=ot(z,A),U===null)throw ot(z)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(A){throw A("WebGLRenderer: "+A.message),A}let X,ft,Le,wt,Re,Fe,I,C,q,oe,se,Q,ke,ve,Qe,Ce,le,me,Ge,Ie,Ee,et,L,xe;function ge(){X=new $1(U),X.init(),et=new PT(U,X),ft=new B1(U,X,e,et),Le=new CT(U,X),ft.reversedDepthBuffer&&f&&Le.buffers.depth.setReversed(!0),wt=new Z1(U),Re=new mT,Fe=new RT(U,X,Le,Re,ft,et,wt),I=new V1(M),C=new Y1(M),q=new tw(U),L=new U1(U,q),oe=new j1(U,q,wt,L),se=new Q1(U,oe,q,wt),Ge=new J1(U,ft,Fe),Ce=new z1(Re),Q=new pT(M,I,C,X,ft,L,Ce),ke=new FT(M,Re),ve=new _T,Qe=new ST(X),me=new F1(M,I,C,Le,se,h,l),le=new ET(M,se,ft),xe=new UT(U,wt,ft,Le),Ie=new k1(U,X,wt),Ee=new K1(U,X,wt),wt.programs=Q.programs,M.capabilities=ft,M.extensions=X,M.properties=Re,M.renderLists=ve,M.shadowMap=le,M.state=Le,M.info=wt}ge();const _e=new OT(M,U);this.xr=_e,this.getContext=function(){return U},this.getContextAttributes=function(){return U.getContextAttributes()},this.forceContextLoss=function(){const A=X.get("WEBGL_lose_context");A&&A.loseContext()},this.forceContextRestore=function(){const A=X.get("WEBGL_lose_context");A&&A.restoreContext()},this.getPixelRatio=function(){return O},this.setPixelRatio=function(A){A!==void 0&&(O=A,this.setSize(F,ae,!1))},this.getSize=function(A){return A.set(F,ae)},this.setSize=function(A,z,Z=!0){if(_e.isPresenting){st("WebGLRenderer: Can't change size while VR device is presenting.");return}F=A,ae=z,t.width=Math.floor(A*O),t.height=Math.floor(z*O),Z===!0&&(t.style.width=A+"px",t.style.height=z+"px"),this.setViewport(0,0,A,z)},this.getDrawingBufferSize=function(A){return A.set(F*O,ae*O).floor()},this.setDrawingBufferSize=function(A,z,Z){F=A,ae=z,O=Z,t.width=Math.floor(A*Z),t.height=Math.floor(z*Z),this.setViewport(0,0,A,z)},this.getCurrentViewport=function(A){return A.copy(V)},this.getViewport=function(A){return A.copy(Me)},this.setViewport=function(A,z,Z,J){A.isVector4?Me.set(A.x,A.y,A.z,A.w):Me.set(A,z,Z,J),Le.viewport(V.copy(Me).multiplyScalar(O).round())},this.getScissor=function(A){return A.copy(Ne)},this.setScissor=function(A,z,Z,J){A.isVector4?Ne.set(A.x,A.y,A.z,A.w):Ne.set(A,z,Z,J),Le.scissor(j.copy(Ne).multiplyScalar(O).round())},this.getScissorTest=function(){return ze},this.setScissorTest=function(A){Le.setScissorTest(ze=A)},this.setOpaqueSort=function(A){he=A},this.setTransparentSort=function(A){P=A},this.getClearColor=function(A){return A.copy(me.getClearColor())},this.setClearColor=function(){me.setClearColor(...arguments)},this.getClearAlpha=function(){return me.getClearAlpha()},this.setClearAlpha=function(){me.setClearAlpha(...arguments)},this.clear=function(A=!0,z=!0,Z=!0){let J=0;if(A){let W=!1;if(y!==null){const ye=y.texture.format;W=_.has(ye)}if(W){const ye=y.texture.type,De=g.has(ye),Be=me.getClearColor(),Ae=me.getClearAlpha(),Ze=Be.r,He=Be.g,Ye=Be.b;De?(m[0]=Ze,m[1]=He,m[2]=Ye,m[3]=Ae,U.clearBufferuiv(U.COLOR,0,m)):(p[0]=Ze,p[1]=He,p[2]=Ye,p[3]=Ae,U.clearBufferiv(U.COLOR,0,p))}else J|=U.COLOR_BUFFER_BIT}z&&(J|=U.DEPTH_BUFFER_BIT),Z&&(J|=U.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),U.clear(J)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",ne,!1),t.removeEventListener("webglcontextrestored",ce,!1),t.removeEventListener("webglcontextcreationerror",Ve,!1),me.dispose(),ve.dispose(),Qe.dispose(),Re.dispose(),I.dispose(),C.dispose(),se.dispose(),L.dispose(),xe.dispose(),Q.dispose(),_e.dispose(),_e.removeEventListener("sessionstart",lt),_e.removeEventListener("sessionend",nt),We.stop()};function ne(A){A.preventDefault(),wu("WebGLRenderer: Context Lost."),T=!0}function ce(){wu("WebGLRenderer: Context Restored."),T=!1;const A=wt.autoReset,z=le.enabled,Z=le.autoUpdate,J=le.needsUpdate,W=le.type;ge(),wt.autoReset=A,le.enabled=z,le.autoUpdate=Z,le.needsUpdate=J,le.type=W}function Ve(A){Rt("WebGLRenderer: A WebGL context could not be created. Reason: ",A.statusMessage)}function we(A){const z=A.target;z.removeEventListener("dispose",we),Ft(z)}function Ft(A){Se(A),Re.remove(A)}function Se(A){const z=Re.get(A).programs;z!==void 0&&(z.forEach(function(Z){Q.releaseProgram(Z)}),A.isShaderMaterial&&Q.releaseShaderCache(A))}this.renderBufferDirect=function(A,z,Z,J,W,ye){z===null&&(z=pt);const De=W.isMesh&&W.matrixWorld.determinant()<0,Be=Ht(A,z,Z,J,W);Le.setMaterial(J,De);let Ae=Z.index,Ze=1;if(J.wireframe===!0){if(Ae=oe.getWireframeAttribute(Z),Ae===void 0)return;Ze=2}const He=Z.drawRange,Ye=Z.attributes.position;let St=He.start*Ze,dt=(He.start+He.count)*Ze;ye!==null&&(St=Math.max(St,ye.start*Ze),dt=Math.min(dt,(ye.start+ye.count)*Ze)),Ae!==null?(St=Math.max(St,0),dt=Math.min(dt,Ae.count)):Ye!=null&&(St=Math.max(St,0),dt=Math.min(dt,Ye.count));const on=dt-St;if(on<0||on===1/0)return;L.setup(W,J,Be,Z,Ae);let ln,Bt=Ie;if(Ae!==null&&(ln=q.get(Ae),Bt=Ee,Bt.setIndex(ln)),W.isMesh)J.wireframe===!0?(Le.setLineWidth(J.wireframeLinewidth*tt()),Bt.setMode(U.LINES)):Bt.setMode(U.TRIANGLES);else if(W.isLine){let rt=J.linewidth;rt===void 0&&(rt=1),Le.setLineWidth(rt*tt()),W.isLineSegments?Bt.setMode(U.LINES):W.isLineLoop?Bt.setMode(U.LINE_LOOP):Bt.setMode(U.LINE_STRIP)}else W.isPoints?Bt.setMode(U.POINTS):W.isSprite&&Bt.setMode(U.TRIANGLES);if(W.isBatchedMesh)if(W._multiDrawInstances!==null)ql("WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),Bt.renderMultiDrawInstances(W._multiDrawStarts,W._multiDrawCounts,W._multiDrawCount,W._multiDrawInstances);else if(X.get("WEBGL_multi_draw"))Bt.renderMultiDraw(W._multiDrawStarts,W._multiDrawCounts,W._multiDrawCount);else{const rt=W._multiDrawStarts,an=W._multiDrawCounts,Ct=W._multiDrawCount,mi=Ae?q.get(Ae).bytesPerElement:1,Zi=Re.get(J).currentProgram.getUniforms();for(let Dn=0;Dn<Ct;Dn++)Zi.setValue(U,"_gl_DrawID",Dn),Bt.render(rt[Dn]/mi,an[Dn])}else if(W.isInstancedMesh)Bt.renderInstances(St,on,W.count);else if(Z.isInstancedBufferGeometry){const rt=Z._maxInstanceCount!==void 0?Z._maxInstanceCount:1/0,an=Math.min(Z.instanceCount,rt);Bt.renderInstances(St,on,an)}else Bt.render(St,on)};function Ke(A,z,Z){A.transparent===!0&&A.side===Wi&&A.forceSinglePass===!1?(A.side=_i,A.needsUpdate=!0,kt(A,z,Z),A.side=ts,A.needsUpdate=!0,kt(A,z,Z),A.side=Wi):kt(A,z,Z)}this.compile=function(A,z,Z=null){Z===null&&(Z=A),x=Qe.get(Z),x.init(z),E.push(x),Z.traverseVisible(function(W){W.isLight&&W.layers.test(z.layers)&&(x.pushLight(W),W.castShadow&&x.pushShadow(W))}),A!==Z&&A.traverseVisible(function(W){W.isLight&&W.layers.test(z.layers)&&(x.pushLight(W),W.castShadow&&x.pushShadow(W))}),x.setupLights();const J=new Set;return A.traverse(function(W){if(!(W.isMesh||W.isPoints||W.isLine||W.isSprite))return;const ye=W.material;if(ye)if(Array.isArray(ye))for(let De=0;De<ye.length;De++){const Be=ye[De];Ke(Be,Z,W),J.add(Be)}else Ke(ye,Z,W),J.add(ye)}),x=E.pop(),J},this.compileAsync=function(A,z,Z=null){const J=this.compile(A,z,Z);return new Promise(W=>{function ye(){if(J.forEach(function(De){Re.get(De).currentProgram.isReady()&&J.delete(De)}),J.size===0){W(A);return}setTimeout(ye,10)}X.get("KHR_parallel_shader_compile")!==null?ye():setTimeout(ye,10)})};let at=null;function Pe(A){at&&at(A)}function lt(){We.stop()}function nt(){We.start()}const We=new d_;We.setAnimationLoop(Pe),typeof self<"u"&&We.setContext(self),this.setAnimationLoop=function(A){at=A,_e.setAnimationLoop(A),A===null?We.stop():We.start()},_e.addEventListener("sessionstart",lt),_e.addEventListener("sessionend",nt),this.render=function(A,z){if(z!==void 0&&z.isCamera!==!0){Rt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(T===!0)return;if(A.matrixWorldAutoUpdate===!0&&A.updateMatrixWorld(),z.parent===null&&z.matrixWorldAutoUpdate===!0&&z.updateMatrixWorld(),_e.enabled===!0&&_e.isPresenting===!0&&(_e.cameraAutoUpdate===!0&&_e.updateCamera(z),z=_e.getCamera()),A.isScene===!0&&A.onBeforeRender(M,A,z,y),x=Qe.get(A,E.length),x.init(z),E.push(x),Ue.multiplyMatrices(z.projectionMatrix,z.matrixWorldInverse),te.setFromProjectionMatrix(Ue,Sr,z.reversedDepth),K=this.localClippingEnabled,ie=Ce.init(this.clippingPlanes,K),b=ve.get(A,v.length),b.init(),v.push(b),_e.enabled===!0&&_e.isPresenting===!0){const ye=M.xr.getDepthSensingMesh();ye!==null&&en(ye,z,-1/0,M.sortObjects)}en(A,z,0,M.sortObjects),b.finish(),M.sortObjects===!0&&b.sort(he,P),Te=_e.enabled===!1||_e.isPresenting===!1||_e.hasDepthSensing()===!1,Te&&me.addToRenderList(b,A),this.info.render.frame++,ie===!0&&Ce.beginShadows();const Z=x.state.shadowsArray;le.render(Z,A,z),ie===!0&&Ce.endShadows(),this.info.autoReset===!0&&this.info.reset();const J=b.opaque,W=b.transmissive;if(x.setupLights(),z.isArrayCamera){const ye=z.cameras;if(W.length>0)for(let De=0,Be=ye.length;De<Be;De++){const Ae=ye[De];_t(J,W,A,Ae)}Te&&me.render(A);for(let De=0,Be=ye.length;De<Be;De++){const Ae=ye[De];gt(b,A,Ae,Ae.viewport)}}else W.length>0&&_t(J,W,A,z),Te&&me.render(A),gt(b,A,z);y!==null&&w===0&&(Fe.updateMultisampleRenderTarget(y),Fe.updateRenderTargetMipmap(y)),A.isScene===!0&&A.onAfterRender(M,A,z),L.resetDefaultState(),D=-1,N=null,E.pop(),E.length>0?(x=E[E.length-1],ie===!0&&Ce.setGlobalState(M.clippingPlanes,x.state.camera)):x=null,v.pop(),v.length>0?b=v[v.length-1]:b=null};function en(A,z,Z,J){if(A.visible===!1)return;if(A.layers.test(z.layers)){if(A.isGroup)Z=A.renderOrder;else if(A.isLOD)A.autoUpdate===!0&&A.update(z);else if(A.isLight)x.pushLight(A),A.castShadow&&x.pushShadow(A);else if(A.isSprite){if(!A.frustumCulled||te.intersectsSprite(A)){J&&je.setFromMatrixPosition(A.matrixWorld).applyMatrix4(Ue);const De=se.update(A),Be=A.material;Be.visible&&b.push(A,De,Be,Z,je.z,null)}}else if((A.isMesh||A.isLine||A.isPoints)&&(!A.frustumCulled||te.intersectsObject(A))){const De=se.update(A),Be=A.material;if(J&&(A.boundingSphere!==void 0?(A.boundingSphere===null&&A.computeBoundingSphere(),je.copy(A.boundingSphere.center)):(De.boundingSphere===null&&De.computeBoundingSphere(),je.copy(De.boundingSphere.center)),je.applyMatrix4(A.matrixWorld).applyMatrix4(Ue)),Array.isArray(Be)){const Ae=De.groups;for(let Ze=0,He=Ae.length;Ze<He;Ze++){const Ye=Ae[Ze],St=Be[Ye.materialIndex];St&&St.visible&&b.push(A,De,St,Z,je.z,Ye)}}else Be.visible&&b.push(A,De,Be,Z,je.z,null)}}const ye=A.children;for(let De=0,Be=ye.length;De<Be;De++)en(ye[De],z,Z,J)}function gt(A,z,Z,J){const{opaque:W,transmissive:ye,transparent:De}=A;x.setupLightsView(Z),ie===!0&&Ce.setGlobalState(M.clippingPlanes,Z),J&&Le.viewport(V.copy(J)),W.length>0&&Dt(W,z,Z),ye.length>0&&Dt(ye,z,Z),De.length>0&&Dt(De,z,Z),Le.buffers.depth.setTest(!0),Le.buffers.depth.setMask(!0),Le.buffers.color.setMask(!0),Le.setPolygonOffset(!1)}function _t(A,z,Z,J){if((Z.isScene===!0?Z.overrideMaterial:null)!==null)return;x.state.transmissionRenderTarget[J.id]===void 0&&(x.state.transmissionRenderTarget[J.id]=new Is(1,1,{generateMipmaps:!0,type:X.has("EXT_color_buffer_half_float")||X.has("EXT_color_buffer_float")?Fa:Pr,minFilter:Yr,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:It.workingColorSpace}));const ye=x.state.transmissionRenderTarget[J.id],De=J.viewport||V;ye.setSize(De.z*M.transmissionResolutionScale,De.w*M.transmissionResolutionScale);const Be=M.getRenderTarget(),Ae=M.getActiveCubeFace(),Ze=M.getActiveMipmapLevel();M.setRenderTarget(ye),M.getClearColor(G),Y=M.getClearAlpha(),Y<1&&M.setClearColor(16777215,.5),M.clear(),Te&&me.render(Z);const He=M.toneMapping;M.toneMapping=Cs;const Ye=J.viewport;if(J.viewport!==void 0&&(J.viewport=void 0),x.setupLightsView(J),ie===!0&&Ce.setGlobalState(M.clippingPlanes,J),Dt(A,Z,J),Fe.updateMultisampleRenderTarget(ye),Fe.updateRenderTargetMipmap(ye),X.has("WEBGL_multisampled_render_to_texture")===!1){let St=!1;for(let dt=0,on=z.length;dt<on;dt++){const ln=z[dt],{object:Bt,geometry:rt,material:an,group:Ct}=ln;if(an.side===Wi&&Bt.layers.test(J.layers)){const mi=an.side;an.side=_i,an.needsUpdate=!0,Vt(Bt,Z,J,rt,an,Ct),an.side=mi,an.needsUpdate=!0,St=!0}}St===!0&&(Fe.updateMultisampleRenderTarget(ye),Fe.updateRenderTargetMipmap(ye))}M.setRenderTarget(Be,Ae,Ze),M.setClearColor(G,Y),Ye!==void 0&&(J.viewport=Ye),M.toneMapping=He}function Dt(A,z,Z){const J=z.isScene===!0?z.overrideMaterial:null;for(let W=0,ye=A.length;W<ye;W++){const De=A[W],{object:Be,geometry:Ae,group:Ze}=De;let He=De.material;He.allowOverride===!0&&J!==null&&(He=J),Be.layers.test(Z.layers)&&Vt(Be,z,Z,Ae,He,Ze)}}function Vt(A,z,Z,J,W,ye){A.onBeforeRender(M,z,Z,J,W,ye),A.modelViewMatrix.multiplyMatrices(Z.matrixWorldInverse,A.matrixWorld),A.normalMatrix.getNormalMatrix(A.modelViewMatrix),W.onBeforeRender(M,z,Z,J,A,ye),W.transparent===!0&&W.side===Wi&&W.forceSinglePass===!1?(W.side=_i,W.needsUpdate=!0,M.renderBufferDirect(Z,z,J,W,A,ye),W.side=ts,W.needsUpdate=!0,M.renderBufferDirect(Z,z,J,W,A,ye),W.side=Wi):M.renderBufferDirect(Z,z,J,W,A,ye),A.onAfterRender(M,z,Z,J,W,ye)}function kt(A,z,Z){z.isScene!==!0&&(z=pt);const J=Re.get(A),W=x.state.lights,ye=x.state.shadowsArray,De=W.state.version,Be=Q.getParameters(A,W.state,ye,z,Z),Ae=Q.getProgramCacheKey(Be);let Ze=J.programs;J.environment=A.isMeshStandardMaterial?z.environment:null,J.fog=z.fog,J.envMap=(A.isMeshStandardMaterial?C:I).get(A.envMap||J.environment),J.envMapRotation=J.environment!==null&&A.envMap===null?z.environmentRotation:A.envMapRotation,Ze===void 0&&(A.addEventListener("dispose",we),Ze=new Map,J.programs=Ze);let He=Ze.get(Ae);if(He!==void 0){if(J.currentProgram===He&&J.lightsStateVersion===De)return dn(A,Be),He}else Be.uniforms=Q.getUniforms(A),A.onBeforeCompile(Be,M),He=Q.acquireProgram(Be,Ae),Ze.set(Ae,He),J.uniforms=Be.uniforms;const Ye=J.uniforms;return(!A.isShaderMaterial&&!A.isRawShaderMaterial||A.clipping===!0)&&(Ye.clippingPlanes=Ce.uniform),dn(A,Be),J.needsLights=Qn(A),J.lightsStateVersion=De,J.needsLights&&(Ye.ambientLightColor.value=W.state.ambient,Ye.lightProbe.value=W.state.probe,Ye.directionalLights.value=W.state.directional,Ye.directionalLightShadows.value=W.state.directionalShadow,Ye.spotLights.value=W.state.spot,Ye.spotLightShadows.value=W.state.spotShadow,Ye.rectAreaLights.value=W.state.rectArea,Ye.ltc_1.value=W.state.rectAreaLTC1,Ye.ltc_2.value=W.state.rectAreaLTC2,Ye.pointLights.value=W.state.point,Ye.pointLightShadows.value=W.state.pointShadow,Ye.hemisphereLights.value=W.state.hemi,Ye.directionalShadowMap.value=W.state.directionalShadowMap,Ye.directionalShadowMatrix.value=W.state.directionalShadowMatrix,Ye.spotShadowMap.value=W.state.spotShadowMap,Ye.spotLightMatrix.value=W.state.spotLightMatrix,Ye.spotLightMap.value=W.state.spotLightMap,Ye.pointShadowMap.value=W.state.pointShadowMap,Ye.pointShadowMatrix.value=W.state.pointShadowMatrix),J.currentProgram=He,J.uniformsList=null,He}function At(A){if(A.uniformsList===null){const z=A.currentProgram.getUniforms();A.uniformsList=ou.seqWithValue(z.seq,A.uniforms)}return A.uniformsList}function dn(A,z){const Z=Re.get(A);Z.outputColorSpace=z.outputColorSpace,Z.batching=z.batching,Z.batchingColor=z.batchingColor,Z.instancing=z.instancing,Z.instancingColor=z.instancingColor,Z.instancingMorph=z.instancingMorph,Z.skinning=z.skinning,Z.morphTargets=z.morphTargets,Z.morphNormals=z.morphNormals,Z.morphColors=z.morphColors,Z.morphTargetsCount=z.morphTargetsCount,Z.numClippingPlanes=z.numClippingPlanes,Z.numIntersection=z.numClipIntersection,Z.vertexAlphas=z.vertexAlphas,Z.vertexTangents=z.vertexTangents,Z.toneMapping=z.toneMapping}function Ht(A,z,Z,J,W){z.isScene!==!0&&(z=pt),Fe.resetTextureUnits();const ye=z.fog,De=J.isMeshStandardMaterial?z.environment:null,Be=y===null?M.outputColorSpace:y.isXRRenderTarget===!0?y.texture.colorSpace:Zn,Ae=(J.isMeshStandardMaterial?C:I).get(J.envMap||De),Ze=J.vertexColors===!0&&!!Z.attributes.color&&Z.attributes.color.itemSize===4,He=!!Z.attributes.tangent&&(!!J.normalMap||J.anisotropy>0),Ye=!!Z.morphAttributes.position,St=!!Z.morphAttributes.normal,dt=!!Z.morphAttributes.color;let on=Cs;J.toneMapped&&(y===null||y.isXRRenderTarget===!0)&&(on=M.toneMapping);const ln=Z.morphAttributes.position||Z.morphAttributes.normal||Z.morphAttributes.color,Bt=ln!==void 0?ln.length:0,rt=Re.get(J),an=x.state.lights;if(ie===!0&&(K===!0||A!==N)){const In=A===N&&J.id===D;Ce.setState(J,A,In)}let Ct=!1;J.version===rt.__version?(rt.needsLights&&rt.lightsStateVersion!==an.state.version||rt.outputColorSpace!==Be||W.isBatchedMesh&&rt.batching===!1||!W.isBatchedMesh&&rt.batching===!0||W.isBatchedMesh&&rt.batchingColor===!0&&W.colorTexture===null||W.isBatchedMesh&&rt.batchingColor===!1&&W.colorTexture!==null||W.isInstancedMesh&&rt.instancing===!1||!W.isInstancedMesh&&rt.instancing===!0||W.isSkinnedMesh&&rt.skinning===!1||!W.isSkinnedMesh&&rt.skinning===!0||W.isInstancedMesh&&rt.instancingColor===!0&&W.instanceColor===null||W.isInstancedMesh&&rt.instancingColor===!1&&W.instanceColor!==null||W.isInstancedMesh&&rt.instancingMorph===!0&&W.morphTexture===null||W.isInstancedMesh&&rt.instancingMorph===!1&&W.morphTexture!==null||rt.envMap!==Ae||J.fog===!0&&rt.fog!==ye||rt.numClippingPlanes!==void 0&&(rt.numClippingPlanes!==Ce.numPlanes||rt.numIntersection!==Ce.numIntersection)||rt.vertexAlphas!==Ze||rt.vertexTangents!==He||rt.morphTargets!==Ye||rt.morphNormals!==St||rt.morphColors!==dt||rt.toneMapping!==on||rt.morphTargetsCount!==Bt)&&(Ct=!0):(Ct=!0,rt.__version=J.version);let mi=rt.currentProgram;Ct===!0&&(mi=kt(J,z,W));let Zi=!1,Dn=!1,hr=!1;const Ut=mi.getUniforms(),xn=rt.uniforms;if(Le.useProgram(mi.program)&&(Zi=!0,Dn=!0,hr=!0),J.id!==D&&(D=J.id,Dn=!0),Zi||N!==A){Le.buffers.depth.getReversed()&&A.reversedDepth!==!0&&(A._reversedDepth=!0,A.updateProjectionMatrix()),Ut.setValue(U,"projectionMatrix",A.projectionMatrix),Ut.setValue(U,"viewMatrix",A.matrixWorldInverse);const Hn=Ut.map.cameraPosition;Hn!==void 0&&Hn.setValue(U,be.setFromMatrixPosition(A.matrixWorld)),ft.logarithmicDepthBuffer&&Ut.setValue(U,"logDepthBufFC",2/(Math.log(A.far+1)/Math.LN2)),(J.isMeshPhongMaterial||J.isMeshToonMaterial||J.isMeshLambertMaterial||J.isMeshBasicMaterial||J.isMeshStandardMaterial||J.isShaderMaterial)&&Ut.setValue(U,"isOrthographic",A.isOrthographicCamera===!0),N!==A&&(N=A,Dn=!0,hr=!0)}if(W.isSkinnedMesh){Ut.setOptional(U,W,"bindMatrix"),Ut.setOptional(U,W,"bindMatrixInverse");const In=W.skeleton;In&&(In.boneTexture===null&&In.computeBoneTexture(),Ut.setValue(U,"boneTexture",In.boneTexture,Fe))}W.isBatchedMesh&&(Ut.setOptional(U,W,"batchingTexture"),Ut.setValue(U,"batchingTexture",W._matricesTexture,Fe),Ut.setOptional(U,W,"batchingIdTexture"),Ut.setValue(U,"batchingIdTexture",W._indirectTexture,Fe),Ut.setOptional(U,W,"batchingColorTexture"),W._colorsTexture!==null&&Ut.setValue(U,"batchingColorTexture",W._colorsTexture,Fe));const ei=Z.morphAttributes;if((ei.position!==void 0||ei.normal!==void 0||ei.color!==void 0)&&Ge.update(W,Z,mi),(Dn||rt.receiveShadow!==W.receiveShadow)&&(rt.receiveShadow=W.receiveShadow,Ut.setValue(U,"receiveShadow",W.receiveShadow)),J.isMeshGouraudMaterial&&J.envMap!==null&&(xn.envMap.value=Ae,xn.flipEnvMap.value=Ae.isCubeTexture&&Ae.isRenderTargetTexture===!1?-1:1),J.isMeshStandardMaterial&&J.envMap===null&&z.environment!==null&&(xn.envMapIntensity.value=z.environmentIntensity),xn.dfgLUT!==void 0&&(xn.dfgLUT.value=BT()),Dn&&(Ut.setValue(U,"toneMappingExposure",M.toneMappingExposure),rt.needsLights&&Gt(xn,hr),ye&&J.fog===!0&&ke.refreshFogUniforms(xn,ye),ke.refreshMaterialUniforms(xn,J,O,ae,x.state.transmissionRenderTarget[A.id]),ou.upload(U,At(rt),xn,Fe)),J.isShaderMaterial&&J.uniformsNeedUpdate===!0&&(ou.upload(U,At(rt),xn,Fe),J.uniformsNeedUpdate=!1),J.isSpriteMaterial&&Ut.setValue(U,"center",W.center),Ut.setValue(U,"modelViewMatrix",W.modelViewMatrix),Ut.setValue(U,"normalMatrix",W.normalMatrix),Ut.setValue(U,"modelMatrix",W.matrixWorld),J.isShaderMaterial||J.isRawShaderMaterial){const In=J.uniformsGroups;for(let Hn=0,Hs=In.length;Hn<Hs;Hn++){const S=In[Hn];xe.update(S,mi),xe.bind(S,mi)}}return mi}function Gt(A,z){A.ambientLightColor.needsUpdate=z,A.lightProbe.needsUpdate=z,A.directionalLights.needsUpdate=z,A.directionalLightShadows.needsUpdate=z,A.pointLights.needsUpdate=z,A.pointLightShadows.needsUpdate=z,A.spotLights.needsUpdate=z,A.spotLightShadows.needsUpdate=z,A.rectAreaLights.needsUpdate=z,A.hemisphereLights.needsUpdate=z}function Qn(A){return A.isMeshLambertMaterial||A.isMeshToonMaterial||A.isMeshPhongMaterial||A.isMeshStandardMaterial||A.isShadowMaterial||A.isShaderMaterial&&A.lights===!0}this.getActiveCubeFace=function(){return R},this.getActiveMipmapLevel=function(){return w},this.getRenderTarget=function(){return y},this.setRenderTargetTextures=function(A,z,Z){const J=Re.get(A);J.__autoAllocateDepthBuffer=A.resolveDepthBuffer===!1,J.__autoAllocateDepthBuffer===!1&&(J.__useRenderToTexture=!1),Re.get(A.texture).__webglTexture=z,Re.get(A.depthTexture).__webglTexture=J.__autoAllocateDepthBuffer?void 0:Z,J.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(A,z){const Z=Re.get(A);Z.__webglFramebuffer=z,Z.__useDefaultFramebuffer=z===void 0};const Xt=U.createFramebuffer();this.setRenderTarget=function(A,z=0,Z=0){y=A,R=z,w=Z;let J=!0,W=null,ye=!1,De=!1;if(A){const Ae=Re.get(A);if(Ae.__useDefaultFramebuffer!==void 0)Le.bindFramebuffer(U.FRAMEBUFFER,null),J=!1;else if(Ae.__webglFramebuffer===void 0)Fe.setupRenderTarget(A);else if(Ae.__hasExternalTextures)Fe.rebindTextures(A,Re.get(A.texture).__webglTexture,Re.get(A.depthTexture).__webglTexture);else if(A.depthBuffer){const Ye=A.depthTexture;if(Ae.__boundDepthTexture!==Ye){if(Ye!==null&&Re.has(Ye)&&(A.width!==Ye.image.width||A.height!==Ye.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");Fe.setupDepthRenderbuffer(A)}}const Ze=A.texture;(Ze.isData3DTexture||Ze.isDataArrayTexture||Ze.isCompressedArrayTexture)&&(De=!0);const He=Re.get(A).__webglFramebuffer;A.isWebGLCubeRenderTarget?(Array.isArray(He[z])?W=He[z][Z]:W=He[z],ye=!0):A.samples>0&&Fe.useMultisampledRTT(A)===!1?W=Re.get(A).__webglMultisampledFramebuffer:Array.isArray(He)?W=He[Z]:W=He,V.copy(A.viewport),j.copy(A.scissor),k=A.scissorTest}else V.copy(Me).multiplyScalar(O).floor(),j.copy(Ne).multiplyScalar(O).floor(),k=ze;if(Z!==0&&(W=Xt),Le.bindFramebuffer(U.FRAMEBUFFER,W)&&J&&Le.drawBuffers(A,W),Le.viewport(V),Le.scissor(j),Le.setScissorTest(k),ye){const Ae=Re.get(A.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_CUBE_MAP_POSITIVE_X+z,Ae.__webglTexture,Z)}else if(De){const Ae=z;for(let Ze=0;Ze<A.textures.length;Ze++){const He=Re.get(A.textures[Ze]);U.framebufferTextureLayer(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0+Ze,He.__webglTexture,Z,Ae)}}else if(A!==null&&Z!==0){const Ae=Re.get(A.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,Ae.__webglTexture,Z)}D=-1},this.readRenderTargetPixels=function(A,z,Z,J,W,ye,De,Be=0){if(!(A&&A.isWebGLRenderTarget)){Rt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ae=Re.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&De!==void 0&&(Ae=Ae[De]),Ae){Le.bindFramebuffer(U.FRAMEBUFFER,Ae);try{const Ze=A.textures[Be],He=Ze.format,Ye=Ze.type;if(!ft.textureFormatReadable(He)){Rt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!ft.textureTypeReadable(Ye)){Rt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}z>=0&&z<=A.width-J&&Z>=0&&Z<=A.height-W&&(A.textures.length>1&&U.readBuffer(U.COLOR_ATTACHMENT0+Be),U.readPixels(z,Z,J,W,et.convert(He),et.convert(Ye),ye))}finally{const Ze=y!==null?Re.get(y).__webglFramebuffer:null;Le.bindFramebuffer(U.FRAMEBUFFER,Ze)}}},this.readRenderTargetPixelsAsync=async function(A,z,Z,J,W,ye,De,Be=0){if(!(A&&A.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ae=Re.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&De!==void 0&&(Ae=Ae[De]),Ae)if(z>=0&&z<=A.width-J&&Z>=0&&Z<=A.height-W){Le.bindFramebuffer(U.FRAMEBUFFER,Ae);const Ze=A.textures[Be],He=Ze.format,Ye=Ze.type;if(!ft.textureFormatReadable(He))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!ft.textureTypeReadable(Ye))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const St=U.createBuffer();U.bindBuffer(U.PIXEL_PACK_BUFFER,St),U.bufferData(U.PIXEL_PACK_BUFFER,ye.byteLength,U.STREAM_READ),A.textures.length>1&&U.readBuffer(U.COLOR_ATTACHMENT0+Be),U.readPixels(z,Z,J,W,et.convert(He),et.convert(Ye),0);const dt=y!==null?Re.get(y).__webglFramebuffer:null;Le.bindFramebuffer(U.FRAMEBUFFER,dt);const on=U.fenceSync(U.SYNC_GPU_COMMANDS_COMPLETE,0);return U.flush(),await Ty(U,on,4),U.bindBuffer(U.PIXEL_PACK_BUFFER,St),U.getBufferSubData(U.PIXEL_PACK_BUFFER,0,ye),U.deleteBuffer(St),U.deleteSync(on),ye}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(A,z=null,Z=0){const J=Math.pow(2,-Z),W=Math.floor(A.image.width*J),ye=Math.floor(A.image.height*J),De=z!==null?z.x:0,Be=z!==null?z.y:0;Fe.setTexture2D(A,0),U.copyTexSubImage2D(U.TEXTURE_2D,Z,0,0,De,Be,W,ye),Le.unbindTexture()};const qt=U.createFramebuffer(),jt=U.createFramebuffer();this.copyTextureToTexture=function(A,z,Z=null,J=null,W=0,ye=null){ye===null&&(W!==0?(ql("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),ye=W,W=0):ye=0);let De,Be,Ae,Ze,He,Ye,St,dt,on;const ln=A.isCompressedTexture?A.mipmaps[ye]:A.image;if(Z!==null)De=Z.max.x-Z.min.x,Be=Z.max.y-Z.min.y,Ae=Z.isBox3?Z.max.z-Z.min.z:1,Ze=Z.min.x,He=Z.min.y,Ye=Z.isBox3?Z.min.z:0;else{const ei=Math.pow(2,-W);De=Math.floor(ln.width*ei),Be=Math.floor(ln.height*ei),A.isDataArrayTexture?Ae=ln.depth:A.isData3DTexture?Ae=Math.floor(ln.depth*ei):Ae=1,Ze=0,He=0,Ye=0}J!==null?(St=J.x,dt=J.y,on=J.z):(St=0,dt=0,on=0);const Bt=et.convert(z.format),rt=et.convert(z.type);let an;z.isData3DTexture?(Fe.setTexture3D(z,0),an=U.TEXTURE_3D):z.isDataArrayTexture||z.isCompressedArrayTexture?(Fe.setTexture2DArray(z,0),an=U.TEXTURE_2D_ARRAY):(Fe.setTexture2D(z,0),an=U.TEXTURE_2D),U.pixelStorei(U.UNPACK_FLIP_Y_WEBGL,z.flipY),U.pixelStorei(U.UNPACK_PREMULTIPLY_ALPHA_WEBGL,z.premultiplyAlpha),U.pixelStorei(U.UNPACK_ALIGNMENT,z.unpackAlignment);const Ct=U.getParameter(U.UNPACK_ROW_LENGTH),mi=U.getParameter(U.UNPACK_IMAGE_HEIGHT),Zi=U.getParameter(U.UNPACK_SKIP_PIXELS),Dn=U.getParameter(U.UNPACK_SKIP_ROWS),hr=U.getParameter(U.UNPACK_SKIP_IMAGES);U.pixelStorei(U.UNPACK_ROW_LENGTH,ln.width),U.pixelStorei(U.UNPACK_IMAGE_HEIGHT,ln.height),U.pixelStorei(U.UNPACK_SKIP_PIXELS,Ze),U.pixelStorei(U.UNPACK_SKIP_ROWS,He),U.pixelStorei(U.UNPACK_SKIP_IMAGES,Ye);const Ut=A.isDataArrayTexture||A.isData3DTexture,xn=z.isDataArrayTexture||z.isData3DTexture;if(A.isDepthTexture){const ei=Re.get(A),In=Re.get(z),Hn=Re.get(ei.__renderTarget),Hs=Re.get(In.__renderTarget);Le.bindFramebuffer(U.READ_FRAMEBUFFER,Hn.__webglFramebuffer),Le.bindFramebuffer(U.DRAW_FRAMEBUFFER,Hs.__webglFramebuffer);for(let S=0;S<Ae;S++)Ut&&(U.framebufferTextureLayer(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,Re.get(A).__webglTexture,W,Ye+S),U.framebufferTextureLayer(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,Re.get(z).__webglTexture,ye,on+S)),U.blitFramebuffer(Ze,He,De,Be,St,dt,De,Be,U.DEPTH_BUFFER_BIT,U.NEAREST);Le.bindFramebuffer(U.READ_FRAMEBUFFER,null),Le.bindFramebuffer(U.DRAW_FRAMEBUFFER,null)}else if(W!==0||A.isRenderTargetTexture||Re.has(A)){const ei=Re.get(A),In=Re.get(z);Le.bindFramebuffer(U.READ_FRAMEBUFFER,qt),Le.bindFramebuffer(U.DRAW_FRAMEBUFFER,jt);for(let Hn=0;Hn<Ae;Hn++)Ut?U.framebufferTextureLayer(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,ei.__webglTexture,W,Ye+Hn):U.framebufferTexture2D(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,ei.__webglTexture,W),xn?U.framebufferTextureLayer(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,In.__webglTexture,ye,on+Hn):U.framebufferTexture2D(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,In.__webglTexture,ye),W!==0?U.blitFramebuffer(Ze,He,De,Be,St,dt,De,Be,U.COLOR_BUFFER_BIT,U.NEAREST):xn?U.copyTexSubImage3D(an,ye,St,dt,on+Hn,Ze,He,De,Be):U.copyTexSubImage2D(an,ye,St,dt,Ze,He,De,Be);Le.bindFramebuffer(U.READ_FRAMEBUFFER,null),Le.bindFramebuffer(U.DRAW_FRAMEBUFFER,null)}else xn?A.isDataTexture||A.isData3DTexture?U.texSubImage3D(an,ye,St,dt,on,De,Be,Ae,Bt,rt,ln.data):z.isCompressedArrayTexture?U.compressedTexSubImage3D(an,ye,St,dt,on,De,Be,Ae,Bt,ln.data):U.texSubImage3D(an,ye,St,dt,on,De,Be,Ae,Bt,rt,ln):A.isDataTexture?U.texSubImage2D(U.TEXTURE_2D,ye,St,dt,De,Be,Bt,rt,ln.data):A.isCompressedTexture?U.compressedTexSubImage2D(U.TEXTURE_2D,ye,St,dt,ln.width,ln.height,Bt,ln.data):U.texSubImage2D(U.TEXTURE_2D,ye,St,dt,De,Be,Bt,rt,ln);U.pixelStorei(U.UNPACK_ROW_LENGTH,Ct),U.pixelStorei(U.UNPACK_IMAGE_HEIGHT,mi),U.pixelStorei(U.UNPACK_SKIP_PIXELS,Zi),U.pixelStorei(U.UNPACK_SKIP_ROWS,Dn),U.pixelStorei(U.UNPACK_SKIP_IMAGES,hr),ye===0&&z.generateMipmaps&&U.generateMipmap(an),Le.unbindTexture()},this.initRenderTarget=function(A){Re.get(A).__webglFramebuffer===void 0&&Fe.setupRenderTarget(A)},this.initTexture=function(A){A.isCubeTexture?Fe.setTextureCube(A,0):A.isData3DTexture?Fe.setTexture3D(A,0):A.isDataArrayTexture||A.isCompressedArrayTexture?Fe.setTexture2DArray(A,0):Fe.setTexture2D(A,0),Le.unbindTexture()},this.resetState=function(){R=0,w=0,y=null,Le.reset(),L.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Sr}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=It._getDrawingBufferColorSpace(e),t.unpackColorSpace=It._getUnpackColorSpace()}}function zT(r){if(!(typeof window>"u")){var e=document.createElement("style");return e.setAttribute("type","text/css"),e.innerHTML=r,document.head.appendChild(e),r}}function ra(r,e){var t=r.__state.conversionName.toString(),n=Math.round(r.r),i=Math.round(r.g),s=Math.round(r.b),o=r.a,a=Math.round(r.h),l=r.s.toFixed(1),c=r.v.toFixed(1);if(e||t==="THREE_CHAR_HEX"||t==="SIX_CHAR_HEX"){for(var u=r.hex.toString(16);u.length<6;)u="0"+u;return"#"+u}else{if(t==="CSS_RGB")return"rgb("+n+","+i+","+s+")";if(t==="CSS_RGBA")return"rgba("+n+","+i+","+s+","+o+")";if(t==="HEX")return"0x"+r.hex.toString(16);if(t==="RGB_ARRAY")return"["+n+","+i+","+s+"]";if(t==="RGBA_ARRAY")return"["+n+","+i+","+s+","+o+"]";if(t==="RGB_OBJ")return"{r:"+n+",g:"+i+",b:"+s+"}";if(t==="RGBA_OBJ")return"{r:"+n+",g:"+i+",b:"+s+",a:"+o+"}";if(t==="HSV_OBJ")return"{h:"+a+",s:"+l+",v:"+c+"}";if(t==="HSVA_OBJ")return"{h:"+a+",s:"+l+",v:"+c+",a:"+o+"}"}return"unknown format"}var a0=Array.prototype.forEach,Za=Array.prototype.slice,de={BREAK:{},extend:function(e){return this.each(Za.call(arguments,1),function(t){var n=this.isObject(t)?Object.keys(t):[];n.forEach((function(i){this.isUndefined(t[i])||(e[i]=t[i])}).bind(this))},this),e},defaults:function(e){return this.each(Za.call(arguments,1),function(t){var n=this.isObject(t)?Object.keys(t):[];n.forEach((function(i){this.isUndefined(e[i])&&(e[i]=t[i])}).bind(this))},this),e},compose:function(){var e=Za.call(arguments);return function(){for(var t=Za.call(arguments),n=e.length-1;n>=0;n--)t=[e[n].apply(this,t)];return t[0]}},each:function(e,t,n){if(e){if(a0&&e.forEach&&e.forEach===a0)e.forEach(t,n);else if(e.length===e.length+0){var i=void 0,s=void 0;for(i=0,s=e.length;i<s;i++)if(i in e&&t.call(n,e[i],i)===this.BREAK)return}else for(var o in e)if(t.call(n,e[o],o)===this.BREAK)return}},defer:function(e){setTimeout(e,0)},debounce:function(e,t,n){var i=void 0;return function(){var s=this,o=arguments;function a(){i=null,n||e.apply(s,o)}var l=n||!i;clearTimeout(i),i=setTimeout(a,t),l&&e.apply(s,o)}},toArray:function(e){return e.toArray?e.toArray():Za.call(e)},isUndefined:function(e){return e===void 0},isNull:function(e){return e===null},isNaN:(function(r){function e(t){return r.apply(this,arguments)}return e.toString=function(){return r.toString()},e})(function(r){return isNaN(r)}),isArray:Array.isArray||function(r){return r.constructor===Array},isObject:function(e){return e===Object(e)},isNumber:function(e){return e===e+0},isString:function(e){return e===e+""},isBoolean:function(e){return e===!1||e===!0},isFunction:function(e){return e instanceof Function}},VT=[{litmus:de.isString,conversions:{THREE_CHAR_HEX:{read:function(e){var t=e.match(/^#([A-F0-9])([A-F0-9])([A-F0-9])$/i);return t===null?!1:{space:"HEX",hex:parseInt("0x"+t[1].toString()+t[1].toString()+t[2].toString()+t[2].toString()+t[3].toString()+t[3].toString(),0)}},write:ra},SIX_CHAR_HEX:{read:function(e){var t=e.match(/^#([A-F0-9]{6})$/i);return t===null?!1:{space:"HEX",hex:parseInt("0x"+t[1].toString(),0)}},write:ra},CSS_RGB:{read:function(e){var t=e.match(/^rgb\(\s*(\S+)\s*,\s*(\S+)\s*,\s*(\S+)\s*\)/);return t===null?!1:{space:"RGB",r:parseFloat(t[1]),g:parseFloat(t[2]),b:parseFloat(t[3])}},write:ra},CSS_RGBA:{read:function(e){var t=e.match(/^rgba\(\s*(\S+)\s*,\s*(\S+)\s*,\s*(\S+)\s*,\s*(\S+)\s*\)/);return t===null?!1:{space:"RGB",r:parseFloat(t[1]),g:parseFloat(t[2]),b:parseFloat(t[3]),a:parseFloat(t[4])}},write:ra}}},{litmus:de.isNumber,conversions:{HEX:{read:function(e){return{space:"HEX",hex:e,conversionName:"HEX"}},write:function(e){return e.hex}}}},{litmus:de.isArray,conversions:{RGB_ARRAY:{read:function(e){return e.length!==3?!1:{space:"RGB",r:e[0],g:e[1],b:e[2]}},write:function(e){return[e.r,e.g,e.b]}},RGBA_ARRAY:{read:function(e){return e.length!==4?!1:{space:"RGB",r:e[0],g:e[1],b:e[2],a:e[3]}},write:function(e){return[e.r,e.g,e.b,e.a]}}}},{litmus:de.isObject,conversions:{RGBA_OBJ:{read:function(e){return de.isNumber(e.r)&&de.isNumber(e.g)&&de.isNumber(e.b)&&de.isNumber(e.a)?{space:"RGB",r:e.r,g:e.g,b:e.b,a:e.a}:!1},write:function(e){return{r:e.r,g:e.g,b:e.b,a:e.a}}},RGB_OBJ:{read:function(e){return de.isNumber(e.r)&&de.isNumber(e.g)&&de.isNumber(e.b)?{space:"RGB",r:e.r,g:e.g,b:e.b}:!1},write:function(e){return{r:e.r,g:e.g,b:e.b}}},HSVA_OBJ:{read:function(e){return de.isNumber(e.h)&&de.isNumber(e.s)&&de.isNumber(e.v)&&de.isNumber(e.a)?{space:"HSV",h:e.h,s:e.s,v:e.v,a:e.a}:!1},write:function(e){return{h:e.h,s:e.s,v:e.v,a:e.a}}},HSV_OBJ:{read:function(e){return de.isNumber(e.h)&&de.isNumber(e.s)&&de.isNumber(e.v)?{space:"HSV",h:e.h,s:e.s,v:e.v}:!1},write:function(e){return{h:e.h,s:e.s,v:e.v}}}}}],Ja=void 0,Fc=void 0,nh=function(){Fc=!1;var e=arguments.length>1?de.toArray(arguments):arguments[0];return de.each(VT,function(t){if(t.litmus(e))return de.each(t.conversions,function(n,i){if(Ja=n.read(e),Fc===!1&&Ja!==!1)return Fc=Ja,Ja.conversionName=i,Ja.conversion=n,de.BREAK}),de.BREAK}),Fc},l0=void 0,Au={hsv_to_rgb:function(e,t,n){var i=Math.floor(e/60)%6,s=e/60-Math.floor(e/60),o=n*(1-t),a=n*(1-s*t),l=n*(1-(1-s)*t),c=[[n,l,o],[a,n,o],[o,n,l],[o,a,n],[l,o,n],[n,o,a]][i];return{r:c[0]*255,g:c[1]*255,b:c[2]*255}},rgb_to_hsv:function(e,t,n){var i=Math.min(e,t,n),s=Math.max(e,t,n),o=s-i,a=void 0,l=void 0;if(s!==0)l=o/s;else return{h:NaN,s:0,v:0};return e===s?a=(t-n)/o:t===s?a=2+(n-e)/o:a=4+(e-t)/o,a/=6,a<0&&(a+=1),{h:a*360,s:l,v:s/255}},rgb_to_hex:function(e,t,n){var i=this.hex_with_component(0,2,e);return i=this.hex_with_component(i,1,t),i=this.hex_with_component(i,0,n),i},component_from_hex:function(e,t){return e>>t*8&255},hex_with_component:function(e,t,n){return n<<(l0=t*8)|e&~(255<<l0)}},HT=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(r){return typeof r}:function(r){return r&&typeof Symbol=="function"&&r.constructor===Symbol&&r!==Symbol.prototype?"symbol":typeof r},dr=function(r,e){if(!(r instanceof e))throw new TypeError("Cannot call a class as a function")},fr=(function(){function r(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(e,t,n){return t&&r(e.prototype,t),n&&r(e,n),e}})(),Os=function r(e,t,n){e===null&&(e=Function.prototype);var i=Object.getOwnPropertyDescriptor(e,t);if(i===void 0){var s=Object.getPrototypeOf(e);return s===null?void 0:r(s,t,n)}else{if("value"in i)return i.value;var o=i.get;return o===void 0?void 0:o.call(n)}},Bs=function(r,e){if(typeof e!="function"&&e!==null)throw new TypeError("Super expression must either be null or a function, not "+typeof e);r.prototype=Object.create(e&&e.prototype,{constructor:{value:r,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(r,e):r.__proto__=e)},zs=function(r,e){if(!r)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e&&(typeof e=="object"||typeof e=="function")?e:r},Un=(function(){function r(){if(dr(this,r),this.__state=nh.apply(this,arguments),this.__state===!1)throw new Error("Failed to interpret color arguments");this.__state.a=this.__state.a||1}return fr(r,[{key:"toString",value:function(){return ra(this)}},{key:"toHexString",value:function(){return ra(this,!0)}},{key:"toOriginal",value:function(){return this.__state.conversion.write(this)}}]),r})();function up(r,e,t){Object.defineProperty(r,e,{get:function(){return this.__state.space==="RGB"?this.__state[e]:(Un.recalculateRGB(this,e,t),this.__state[e])},set:function(i){this.__state.space!=="RGB"&&(Un.recalculateRGB(this,e,t),this.__state.space="RGB"),this.__state[e]=i}})}function dp(r,e){Object.defineProperty(r,e,{get:function(){return this.__state.space==="HSV"?this.__state[e]:(Un.recalculateHSV(this),this.__state[e])},set:function(n){this.__state.space!=="HSV"&&(Un.recalculateHSV(this),this.__state.space="HSV"),this.__state[e]=n}})}Un.recalculateRGB=function(r,e,t){if(r.__state.space==="HEX")r.__state[e]=Au.component_from_hex(r.__state.hex,t);else if(r.__state.space==="HSV")de.extend(r.__state,Au.hsv_to_rgb(r.__state.h,r.__state.s,r.__state.v));else throw new Error("Corrupted color state")};Un.recalculateHSV=function(r){var e=Au.rgb_to_hsv(r.r,r.g,r.b);de.extend(r.__state,{s:e.s,v:e.v}),de.isNaN(e.h)?de.isUndefined(r.__state.h)&&(r.__state.h=0):r.__state.h=e.h};Un.COMPONENTS=["r","g","b","h","s","v","hex","a"];up(Un.prototype,"r",2);up(Un.prototype,"g",1);up(Un.prototype,"b",0);dp(Un.prototype,"h");dp(Un.prototype,"s");dp(Un.prototype,"v");Object.defineProperty(Un.prototype,"a",{get:function(){return this.__state.a},set:function(e){this.__state.a=e}});Object.defineProperty(Un.prototype,"hex",{get:function(){return this.__state.space!=="HEX"&&(this.__state.hex=Au.rgb_to_hex(this.r,this.g,this.b),this.__state.space="HEX"),this.__state.hex},set:function(e){this.__state.space="HEX",this.__state.hex=e}});var Co=(function(){function r(e,t){dr(this,r),this.initialValue=e[t],this.domElement=document.createElement("div"),this.object=e,this.property=t,this.__onChange=void 0,this.__onFinishChange=void 0}return fr(r,[{key:"onChange",value:function(t){return this.__onChange=t,this}},{key:"onFinishChange",value:function(t){return this.__onFinishChange=t,this}},{key:"setValue",value:function(t){return this.object[this.property]=t,this.__onChange&&this.__onChange.call(this,t),this.updateDisplay(),this}},{key:"getValue",value:function(){return this.object[this.property]}},{key:"updateDisplay",value:function(){return this}},{key:"isModified",value:function(){return this.initialValue!==this.getValue()}}]),r})(),GT={HTMLEvents:["change"],MouseEvents:["click","mousemove","mousedown","mouseup","mouseover"],KeyboardEvents:["keydown"]},__={};de.each(GT,function(r,e){de.each(r,function(t){__[t]=e})});var WT=/(\d+(\.\d+)?)px/;function mr(r){if(r==="0"||de.isUndefined(r))return 0;var e=r.match(WT);return de.isNull(e)?0:parseFloat(e[1])}var ee={makeSelectable:function(e,t){e===void 0||e.style===void 0||(e.onselectstart=t?function(){return!1}:function(){},e.style.MozUserSelect=t?"auto":"none",e.style.KhtmlUserSelect=t?"auto":"none",e.unselectable=t?"on":"off")},makeFullscreen:function(e,t,n){var i=n,s=t;de.isUndefined(s)&&(s=!0),de.isUndefined(i)&&(i=!0),e.style.position="absolute",s&&(e.style.left=0,e.style.right=0),i&&(e.style.top=0,e.style.bottom=0)},fakeEvent:function(e,t,n,i){var s=n||{},o=__[t];if(!o)throw new Error("Event type "+t+" not supported.");var a=document.createEvent(o);switch(o){case"MouseEvents":{var l=s.x||s.clientX||0,c=s.y||s.clientY||0;a.initMouseEvent(t,s.bubbles||!1,s.cancelable||!0,window,s.clickCount||1,0,0,l,c,!1,!1,!1,!1,0,null);break}case"KeyboardEvents":{var u=a.initKeyboardEvent||a.initKeyEvent;de.defaults(s,{cancelable:!0,ctrlKey:!1,altKey:!1,shiftKey:!1,metaKey:!1,keyCode:void 0,charCode:void 0}),u(t,s.bubbles||!1,s.cancelable,window,s.ctrlKey,s.altKey,s.shiftKey,s.metaKey,s.keyCode,s.charCode);break}default:{a.initEvent(t,s.bubbles||!1,s.cancelable||!0);break}}de.defaults(a,i),e.dispatchEvent(a)},bind:function(e,t,n,i){var s=i||!1;return e.addEventListener?e.addEventListener(t,n,s):e.attachEvent&&e.attachEvent("on"+t,n),ee},unbind:function(e,t,n,i){var s=i||!1;return e.removeEventListener?e.removeEventListener(t,n,s):e.detachEvent&&e.detachEvent("on"+t,n),ee},addClass:function(e,t){if(e.className===void 0)e.className=t;else if(e.className!==t){var n=e.className.split(/ +/);n.indexOf(t)===-1&&(n.push(t),e.className=n.join(" ").replace(/^\s+/,"").replace(/\s+$/,""))}return ee},removeClass:function(e,t){if(t)if(e.className===t)e.removeAttribute("class");else{var n=e.className.split(/ +/),i=n.indexOf(t);i!==-1&&(n.splice(i,1),e.className=n.join(" "))}else e.className=void 0;return ee},hasClass:function(e,t){return new RegExp("(?:^|\\s+)"+t+"(?:\\s+|$)").test(e.className)||!1},getWidth:function(e){var t=getComputedStyle(e);return mr(t["border-left-width"])+mr(t["border-right-width"])+mr(t["padding-left"])+mr(t["padding-right"])+mr(t.width)},getHeight:function(e){var t=getComputedStyle(e);return mr(t["border-top-width"])+mr(t["border-bottom-width"])+mr(t["padding-top"])+mr(t["padding-bottom"])+mr(t.height)},getOffset:function(e){var t=e,n={left:0,top:0};if(t.offsetParent)do n.left+=t.offsetLeft,n.top+=t.offsetTop,t=t.offsetParent;while(t);return n},isActive:function(e){return e===document.activeElement&&(e.type||e.href)}},x_=(function(r){Bs(e,r);function e(t,n){dr(this,e);var i=zs(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n)),s=i;i.__prev=i.getValue(),i.__checkbox=document.createElement("input"),i.__checkbox.setAttribute("type","checkbox");function o(){s.setValue(!s.__prev)}return ee.bind(i.__checkbox,"change",o,!1),i.domElement.appendChild(i.__checkbox),i.updateDisplay(),i}return fr(e,[{key:"setValue",value:function(n){var i=Os(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"setValue",this).call(this,n);return this.__onFinishChange&&this.__onFinishChange.call(this,this.getValue()),this.__prev=this.getValue(),i}},{key:"updateDisplay",value:function(){return this.getValue()===!0?(this.__checkbox.setAttribute("checked","checked"),this.__checkbox.checked=!0,this.__prev=!0):(this.__checkbox.checked=!1,this.__prev=!1),Os(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"updateDisplay",this).call(this)}}]),e})(Co),XT=(function(r){Bs(e,r);function e(t,n,i){dr(this,e);var s=zs(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n)),o=i,a=s;if(s.__select=document.createElement("select"),de.isArray(o)){var l={};de.each(o,function(c){l[c]=c}),o=l}return de.each(o,function(c,u){var d=document.createElement("option");d.innerHTML=u,d.setAttribute("value",c),a.__select.appendChild(d)}),s.updateDisplay(),ee.bind(s.__select,"change",function(){var c=this.options[this.selectedIndex].value;a.setValue(c)}),s.domElement.appendChild(s.__select),s}return fr(e,[{key:"setValue",value:function(n){var i=Os(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"setValue",this).call(this,n);return this.__onFinishChange&&this.__onFinishChange.call(this,this.getValue()),i}},{key:"updateDisplay",value:function(){return ee.isActive(this.__select)?this:(this.__select.value=this.getValue(),Os(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"updateDisplay",this).call(this))}}]),e})(Co),qT=(function(r){Bs(e,r);function e(t,n){dr(this,e);var i=zs(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n)),s=i;function o(){s.setValue(s.__input.value)}function a(){s.__onFinishChange&&s.__onFinishChange.call(s,s.getValue())}return i.__input=document.createElement("input"),i.__input.setAttribute("type","text"),ee.bind(i.__input,"keyup",o),ee.bind(i.__input,"change",o),ee.bind(i.__input,"blur",a),ee.bind(i.__input,"keydown",function(l){l.keyCode===13&&this.blur()}),i.updateDisplay(),i.domElement.appendChild(i.__input),i}return fr(e,[{key:"updateDisplay",value:function(){return ee.isActive(this.__input)||(this.__input.value=this.getValue()),Os(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"updateDisplay",this).call(this)}}]),e})(Co);function c0(r){var e=r.toString();return e.indexOf(".")>-1?e.length-e.indexOf(".")-1:0}var v_=(function(r){Bs(e,r);function e(t,n,i){dr(this,e);var s=zs(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n)),o=i||{};return s.__min=o.min,s.__max=o.max,s.__step=o.step,de.isUndefined(s.__step)?s.initialValue===0?s.__impliedStep=1:s.__impliedStep=Math.pow(10,Math.floor(Math.log(Math.abs(s.initialValue))/Math.LN10))/10:s.__impliedStep=s.__step,s.__precision=c0(s.__impliedStep),s}return fr(e,[{key:"setValue",value:function(n){var i=n;return this.__min!==void 0&&i<this.__min?i=this.__min:this.__max!==void 0&&i>this.__max&&(i=this.__max),this.__step!==void 0&&i%this.__step!==0&&(i=Math.round(i/this.__step)*this.__step),Os(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"setValue",this).call(this,i)}},{key:"min",value:function(n){return this.__min=n,this}},{key:"max",value:function(n){return this.__max=n,this}},{key:"step",value:function(n){return this.__step=n,this.__impliedStep=n,this.__precision=c0(n),this}}]),e})(Co);function YT(r,e){var t=Math.pow(10,e);return Math.round(r*t)/t}var Cu=(function(r){Bs(e,r);function e(t,n,i){dr(this,e);var s=zs(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n,i));s.__truncationSuspended=!1;var o=s,a=void 0;function l(){var _=parseFloat(o.__input.value);de.isNaN(_)||o.setValue(_)}function c(){o.__onFinishChange&&o.__onFinishChange.call(o,o.getValue())}function u(){c()}function d(_){var g=a-_.clientY;o.setValue(o.getValue()+g*o.__impliedStep),a=_.clientY}function f(){ee.unbind(window,"mousemove",d),ee.unbind(window,"mouseup",f),c()}function h(_){ee.bind(window,"mousemove",d),ee.bind(window,"mouseup",f),a=_.clientY}return s.__input=document.createElement("input"),s.__input.setAttribute("type","text"),ee.bind(s.__input,"change",l),ee.bind(s.__input,"blur",u),ee.bind(s.__input,"mousedown",h),ee.bind(s.__input,"keydown",function(_){_.keyCode===13&&(o.__truncationSuspended=!0,this.blur(),o.__truncationSuspended=!1,c())}),s.updateDisplay(),s.domElement.appendChild(s.__input),s}return fr(e,[{key:"updateDisplay",value:function(){return this.__input.value=this.__truncationSuspended?this.getValue():YT(this.getValue(),this.__precision),Os(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"updateDisplay",this).call(this)}}]),e})(v_);function u0(r,e,t,n,i){return n+(i-n)*((r-e)/(t-e))}var ih=(function(r){Bs(e,r);function e(t,n,i,s,o){dr(this,e);var a=zs(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n,{min:i,max:s,step:o})),l=a;a.__background=document.createElement("div"),a.__foreground=document.createElement("div"),ee.bind(a.__background,"mousedown",c),ee.bind(a.__background,"touchstart",f),ee.addClass(a.__background,"slider"),ee.addClass(a.__foreground,"slider-fg");function c(g){document.activeElement.blur(),ee.bind(window,"mousemove",u),ee.bind(window,"mouseup",d),u(g)}function u(g){g.preventDefault();var m=l.__background.getBoundingClientRect();return l.setValue(u0(g.clientX,m.left,m.right,l.__min,l.__max)),!1}function d(){ee.unbind(window,"mousemove",u),ee.unbind(window,"mouseup",d),l.__onFinishChange&&l.__onFinishChange.call(l,l.getValue())}function f(g){g.touches.length===1&&(ee.bind(window,"touchmove",h),ee.bind(window,"touchend",_),h(g))}function h(g){var m=g.touches[0].clientX,p=l.__background.getBoundingClientRect();l.setValue(u0(m,p.left,p.right,l.__min,l.__max))}function _(){ee.unbind(window,"touchmove",h),ee.unbind(window,"touchend",_),l.__onFinishChange&&l.__onFinishChange.call(l,l.getValue())}return a.updateDisplay(),a.__background.appendChild(a.__foreground),a.domElement.appendChild(a.__background),a}return fr(e,[{key:"updateDisplay",value:function(){var n=(this.getValue()-this.__min)/(this.__max-this.__min);return this.__foreground.style.width=n*100+"%",Os(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"updateDisplay",this).call(this)}}]),e})(v_),y_=(function(r){Bs(e,r);function e(t,n,i){dr(this,e);var s=zs(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n)),o=s;return s.__button=document.createElement("div"),s.__button.innerHTML=i===void 0?"Fire":i,ee.bind(s.__button,"click",function(a){return a.preventDefault(),o.fire(),!1}),ee.addClass(s.__button,"button"),s.domElement.appendChild(s.__button),s}return fr(e,[{key:"fire",value:function(){this.__onChange&&this.__onChange.call(this),this.getValue().call(this.object),this.__onFinishChange&&this.__onFinishChange.call(this,this.getValue())}}]),e})(Co),rh=(function(r){Bs(e,r);function e(t,n){dr(this,e);var i=zs(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n));i.__color=new Un(i.getValue()),i.__temp=new Un(0);var s=i;i.domElement=document.createElement("div"),ee.makeSelectable(i.domElement,!1),i.__selector=document.createElement("div"),i.__selector.className="selector",i.__saturation_field=document.createElement("div"),i.__saturation_field.className="saturation-field",i.__field_knob=document.createElement("div"),i.__field_knob.className="field-knob",i.__field_knob_border="2px solid ",i.__hue_knob=document.createElement("div"),i.__hue_knob.className="hue-knob",i.__hue_field=document.createElement("div"),i.__hue_field.className="hue-field",i.__input=document.createElement("input"),i.__input.type="text",i.__input_textShadow="0 1px 1px ",ee.bind(i.__input,"keydown",function(g){g.keyCode===13&&d.call(this)}),ee.bind(i.__input,"blur",d),ee.bind(i.__selector,"mousedown",function(){ee.addClass(this,"drag").bind(window,"mouseup",function(){ee.removeClass(s.__selector,"drag")})}),ee.bind(i.__selector,"touchstart",function(){ee.addClass(this,"drag").bind(window,"touchend",function(){ee.removeClass(s.__selector,"drag")})});var o=document.createElement("div");de.extend(i.__selector.style,{width:"122px",height:"102px",padding:"3px",backgroundColor:"#222",boxShadow:"0px 1px 3px rgba(0,0,0,0.3)"}),de.extend(i.__field_knob.style,{position:"absolute",width:"12px",height:"12px",border:i.__field_knob_border+(i.__color.v<.5?"#fff":"#000"),boxShadow:"0px 1px 3px rgba(0,0,0,0.5)",borderRadius:"12px",zIndex:1}),de.extend(i.__hue_knob.style,{position:"absolute",width:"15px",height:"2px",borderRight:"4px solid #fff",zIndex:1}),de.extend(i.__saturation_field.style,{width:"100px",height:"100px",border:"1px solid #555",marginRight:"3px",display:"inline-block",cursor:"pointer"}),de.extend(o.style,{width:"100%",height:"100%",background:"none"}),d0(o,"top","rgba(0,0,0,0)","#000"),de.extend(i.__hue_field.style,{width:"15px",height:"100px",border:"1px solid #555",cursor:"ns-resize",position:"absolute",top:"3px",right:"3px"}),jT(i.__hue_field),de.extend(i.__input.style,{outline:"none",textAlign:"center",color:"#fff",border:0,fontWeight:"bold",textShadow:i.__input_textShadow+"rgba(0,0,0,0.7)"}),ee.bind(i.__saturation_field,"mousedown",a),ee.bind(i.__saturation_field,"touchstart",a),ee.bind(i.__field_knob,"mousedown",a),ee.bind(i.__field_knob,"touchstart",a),ee.bind(i.__hue_field,"mousedown",l),ee.bind(i.__hue_field,"touchstart",l);function a(g){h(g),ee.bind(window,"mousemove",h),ee.bind(window,"touchmove",h),ee.bind(window,"mouseup",c),ee.bind(window,"touchend",c)}function l(g){_(g),ee.bind(window,"mousemove",_),ee.bind(window,"touchmove",_),ee.bind(window,"mouseup",u),ee.bind(window,"touchend",u)}function c(){ee.unbind(window,"mousemove",h),ee.unbind(window,"touchmove",h),ee.unbind(window,"mouseup",c),ee.unbind(window,"touchend",c),f()}function u(){ee.unbind(window,"mousemove",_),ee.unbind(window,"touchmove",_),ee.unbind(window,"mouseup",u),ee.unbind(window,"touchend",u),f()}function d(){var g=nh(this.value);g!==!1?(s.__color.__state=g,s.setValue(s.__color.toOriginal())):this.value=s.__color.toString()}function f(){s.__onFinishChange&&s.__onFinishChange.call(s,s.__color.toOriginal())}i.__saturation_field.appendChild(o),i.__selector.appendChild(i.__field_knob),i.__selector.appendChild(i.__saturation_field),i.__selector.appendChild(i.__hue_field),i.__hue_field.appendChild(i.__hue_knob),i.domElement.appendChild(i.__input),i.domElement.appendChild(i.__selector),i.updateDisplay();function h(g){g.type.indexOf("touch")===-1&&g.preventDefault();var m=s.__saturation_field.getBoundingClientRect(),p=g.touches&&g.touches[0]||g,b=p.clientX,x=p.clientY,v=(b-m.left)/(m.right-m.left),E=1-(x-m.top)/(m.bottom-m.top);return E>1?E=1:E<0&&(E=0),v>1?v=1:v<0&&(v=0),s.__color.v=E,s.__color.s=v,s.setValue(s.__color.toOriginal()),!1}function _(g){g.type.indexOf("touch")===-1&&g.preventDefault();var m=s.__hue_field.getBoundingClientRect(),p=g.touches&&g.touches[0]||g,b=p.clientY,x=1-(b-m.top)/(m.bottom-m.top);return x>1?x=1:x<0&&(x=0),s.__color.h=x*360,s.setValue(s.__color.toOriginal()),!1}return i}return fr(e,[{key:"updateDisplay",value:function(){var n=nh(this.getValue());if(n!==!1){var i=!1;de.each(Un.COMPONENTS,function(a){if(!de.isUndefined(n[a])&&!de.isUndefined(this.__color.__state[a])&&n[a]!==this.__color.__state[a])return i=!0,{}},this),i&&de.extend(this.__color.__state,n)}de.extend(this.__temp.__state,this.__color.__state),this.__temp.a=1;var s=this.__color.v<.5||this.__color.s>.5?255:0,o=255-s;de.extend(this.__field_knob.style,{marginLeft:100*this.__color.s-7+"px",marginTop:100*(1-this.__color.v)-7+"px",backgroundColor:this.__temp.toHexString(),border:this.__field_knob_border+"rgb("+s+","+s+","+s+")"}),this.__hue_knob.style.marginTop=(1-this.__color.h/360)*100+"px",this.__temp.s=1,this.__temp.v=1,d0(this.__saturation_field,"left","#fff",this.__temp.toHexString()),this.__input.value=this.__color.toString(),de.extend(this.__input.style,{backgroundColor:this.__color.toHexString(),color:"rgb("+s+","+s+","+s+")",textShadow:this.__input_textShadow+"rgba("+o+","+o+","+o+",.7)"})}}]),e})(Co),$T=["-moz-","-o-","-webkit-","-ms-",""];function d0(r,e,t,n){r.style.background="",de.each($T,function(i){r.style.cssText+="background: "+i+"linear-gradient("+e+", "+t+" 0%, "+n+" 100%); "})}function jT(r){r.style.background="",r.style.cssText+="background: -moz-linear-gradient(top,  #ff0000 0%, #ff00ff 17%, #0000ff 34%, #00ffff 50%, #00ff00 67%, #ffff00 84%, #ff0000 100%);",r.style.cssText+="background: -webkit-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);",r.style.cssText+="background: -o-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);",r.style.cssText+="background: -ms-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);",r.style.cssText+="background: linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);"}var KT={load:function(e,t){var n=t||document,i=n.createElement("link");i.type="text/css",i.rel="stylesheet",i.href=e,n.getElementsByTagName("head")[0].appendChild(i)},inject:function(e,t){var n=t||document,i=document.createElement("style");i.type="text/css",i.innerHTML=e;var s=n.getElementsByTagName("head")[0];try{s.appendChild(i)}catch{}}},ZT=`<div id="dg-save" class="dg dialogue">

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

</div>`,JT=function(e,t){var n=e[t];return de.isArray(arguments[2])||de.isObject(arguments[2])?new XT(e,t,arguments[2]):de.isNumber(n)?de.isNumber(arguments[2])&&de.isNumber(arguments[3])?de.isNumber(arguments[4])?new ih(e,t,arguments[2],arguments[3],arguments[4]):new ih(e,t,arguments[2],arguments[3]):de.isNumber(arguments[4])?new Cu(e,t,{min:arguments[2],max:arguments[3],step:arguments[4]}):new Cu(e,t,{min:arguments[2],max:arguments[3]}):de.isString(n)?new qT(e,t):de.isFunction(n)?new y_(e,t,""):de.isBoolean(n)?new x_(e,t):null};function QT(r){setTimeout(r,1e3/60)}var eE=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||QT,tE=(function(){function r(){dr(this,r),this.backgroundElement=document.createElement("div"),de.extend(this.backgroundElement.style,{backgroundColor:"rgba(0,0,0,0.8)",top:0,left:0,display:"none",zIndex:"1000",opacity:0,WebkitTransition:"opacity 0.2s linear",transition:"opacity 0.2s linear"}),ee.makeFullscreen(this.backgroundElement),this.backgroundElement.style.position="fixed",this.domElement=document.createElement("div"),de.extend(this.domElement.style,{position:"fixed",display:"none",zIndex:"1001",opacity:0,WebkitTransition:"-webkit-transform 0.2s ease-out, opacity 0.2s linear",transition:"transform 0.2s ease-out, opacity 0.2s linear"}),document.body.appendChild(this.backgroundElement),document.body.appendChild(this.domElement);var e=this;ee.bind(this.backgroundElement,"click",function(){e.hide()})}return fr(r,[{key:"show",value:function(){var t=this;this.backgroundElement.style.display="block",this.domElement.style.display="block",this.domElement.style.opacity=0,this.domElement.style.webkitTransform="scale(1.1)",this.layout(),de.defer(function(){t.backgroundElement.style.opacity=1,t.domElement.style.opacity=1,t.domElement.style.webkitTransform="scale(1)"})}},{key:"hide",value:function(){var t=this,n=function i(){t.domElement.style.display="none",t.backgroundElement.style.display="none",ee.unbind(t.domElement,"webkitTransitionEnd",i),ee.unbind(t.domElement,"transitionend",i),ee.unbind(t.domElement,"oTransitionEnd",i)};ee.bind(this.domElement,"webkitTransitionEnd",n),ee.bind(this.domElement,"transitionend",n),ee.bind(this.domElement,"oTransitionEnd",n),this.backgroundElement.style.opacity=0,this.domElement.style.opacity=0,this.domElement.style.webkitTransform="scale(1.1)"}},{key:"layout",value:function(){this.domElement.style.left=window.innerWidth/2-ee.getWidth(this.domElement)/2+"px",this.domElement.style.top=window.innerHeight/2-ee.getHeight(this.domElement)/2+"px"}}]),r})(),nE=zT(`.dg ul{list-style:none;margin:0;padding:0;width:100%;clear:both}.dg.ac{position:fixed;top:0;left:0;right:0;height:0;z-index:0}.dg:not(.ac) .main{overflow:hidden}.dg.main{-webkit-transition:opacity .1s linear;-o-transition:opacity .1s linear;-moz-transition:opacity .1s linear;transition:opacity .1s linear}.dg.main.taller-than-window{overflow-y:auto}.dg.main.taller-than-window .close-button{opacity:1;margin-top:-1px;border-top:1px solid #2c2c2c}.dg.main ul.closed .close-button{opacity:1 !important}.dg.main:hover .close-button,.dg.main .close-button.drag{opacity:1}.dg.main .close-button{-webkit-transition:opacity .1s linear;-o-transition:opacity .1s linear;-moz-transition:opacity .1s linear;transition:opacity .1s linear;border:0;line-height:19px;height:20px;cursor:pointer;text-align:center;background-color:#000}.dg.main .close-button.close-top{position:relative}.dg.main .close-button.close-bottom{position:absolute}.dg.main .close-button:hover{background-color:#111}.dg.a{float:right;margin-right:15px;overflow-y:visible}.dg.a.has-save>ul.close-top{margin-top:0}.dg.a.has-save>ul.close-bottom{margin-top:27px}.dg.a.has-save>ul.closed{margin-top:0}.dg.a .save-row{top:0;z-index:1002}.dg.a .save-row.close-top{position:relative}.dg.a .save-row.close-bottom{position:fixed}.dg li{-webkit-transition:height .1s ease-out;-o-transition:height .1s ease-out;-moz-transition:height .1s ease-out;transition:height .1s ease-out;-webkit-transition:overflow .1s linear;-o-transition:overflow .1s linear;-moz-transition:overflow .1s linear;transition:overflow .1s linear}.dg li:not(.folder){cursor:auto;height:27px;line-height:27px;padding:0 4px 0 5px}.dg li.folder{padding:0;border-left:4px solid rgba(0,0,0,0)}.dg li.title{cursor:pointer;margin-left:-4px}.dg .closed li:not(.title),.dg .closed ul li,.dg .closed ul li>*{height:0;overflow:hidden;border:0}.dg .cr{clear:both;padding-left:3px;height:27px;overflow:hidden}.dg .property-name{cursor:default;float:left;clear:left;width:40%;overflow:hidden;text-overflow:ellipsis}.dg .cr.function .property-name{width:100%}.dg .c{float:left;width:60%;position:relative}.dg .c input[type=text]{border:0;margin-top:4px;padding:3px;width:100%;float:right}.dg .has-slider input[type=text]{width:30%;margin-left:0}.dg .slider{float:left;width:66%;margin-left:-5px;margin-right:0;height:19px;margin-top:4px}.dg .slider-fg{height:100%}.dg .c input[type=checkbox]{margin-top:7px}.dg .c select{margin-top:5px}.dg .cr.function,.dg .cr.function .property-name,.dg .cr.function *,.dg .cr.boolean,.dg .cr.boolean *{cursor:pointer}.dg .cr.color{overflow:visible}.dg .selector{display:none;position:absolute;margin-left:-9px;margin-top:23px;z-index:10}.dg .c:hover .selector,.dg .selector.drag{display:block}.dg li.save-row{padding:0}.dg li.save-row .button{display:inline-block;padding:0px 6px}.dg.dialogue{background-color:#222;width:460px;padding:15px;font-size:13px;line-height:15px}#dg-new-constructor{padding:10px;color:#222;font-family:Monaco, monospace;font-size:10px;border:0;resize:none;box-shadow:inset 1px 1px 1px #888;word-wrap:break-word;margin:12px 0;display:block;width:440px;overflow-y:scroll;height:100px;position:relative}#dg-local-explain{display:none;font-size:11px;line-height:17px;border-radius:3px;background-color:#333;padding:8px;margin-top:10px}#dg-local-explain code{font-size:10px}#dat-gui-save-locally{display:none}.dg{color:#eee;font:11px 'Lucida Grande', sans-serif;text-shadow:0 -1px 0 #111}.dg.main::-webkit-scrollbar{width:5px;background:#1a1a1a}.dg.main::-webkit-scrollbar-corner{height:0;display:none}.dg.main::-webkit-scrollbar-thumb{border-radius:5px;background:#676767}.dg li:not(.folder){background:#1a1a1a;border-bottom:1px solid #2c2c2c}.dg li.save-row{line-height:25px;background:#dad5cb;border:0}.dg li.save-row select{margin-left:5px;width:108px}.dg li.save-row .button{margin-left:5px;margin-top:1px;border-radius:2px;font-size:9px;line-height:7px;padding:4px 4px 5px 4px;background:#c5bdad;color:#fff;text-shadow:0 1px 0 #b0a58f;box-shadow:0 -1px 0 #b0a58f;cursor:pointer}.dg li.save-row .button.gears{background:#c5bdad url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAANCAYAAAB/9ZQ7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAQJJREFUeNpiYKAU/P//PwGIC/ApCABiBSAW+I8AClAcgKxQ4T9hoMAEUrxx2QSGN6+egDX+/vWT4e7N82AMYoPAx/evwWoYoSYbACX2s7KxCxzcsezDh3evFoDEBYTEEqycggWAzA9AuUSQQgeYPa9fPv6/YWm/Acx5IPb7ty/fw+QZblw67vDs8R0YHyQhgObx+yAJkBqmG5dPPDh1aPOGR/eugW0G4vlIoTIfyFcA+QekhhHJhPdQxbiAIguMBTQZrPD7108M6roWYDFQiIAAv6Aow/1bFwXgis+f2LUAynwoIaNcz8XNx3Dl7MEJUDGQpx9gtQ8YCueB+D26OECAAQDadt7e46D42QAAAABJRU5ErkJggg==) 2px 1px no-repeat;height:7px;width:8px}.dg li.save-row .button:hover{background-color:#bab19e;box-shadow:0 -1px 0 #b0a58f}.dg li.folder{border-bottom:0}.dg li.title{padding-left:16px;background:#000 url(data:image/gif;base64,R0lGODlhBQAFAJEAAP////Pz8////////yH5BAEAAAIALAAAAAAFAAUAAAIIlI+hKgFxoCgAOw==) 6px 10px no-repeat;cursor:pointer;border-bottom:1px solid rgba(255,255,255,0.2)}.dg .closed li.title{background-image:url(data:image/gif;base64,R0lGODlhBQAFAJEAAP////Pz8////////yH5BAEAAAIALAAAAAAFAAUAAAIIlGIWqMCbWAEAOw==)}.dg .cr.boolean{border-left:3px solid #806787}.dg .cr.color{border-left:3px solid}.dg .cr.function{border-left:3px solid #e61d5f}.dg .cr.number{border-left:3px solid #2FA1D6}.dg .cr.number input[type=text]{color:#2FA1D6}.dg .cr.string{border-left:3px solid #1ed36f}.dg .cr.string input[type=text]{color:#1ed36f}.dg .cr.function:hover,.dg .cr.boolean:hover{background:#111}.dg .c input[type=text]{background:#303030;outline:none}.dg .c input[type=text]:hover{background:#3c3c3c}.dg .c input[type=text]:focus{background:#494949;color:#fff}.dg .c .slider{background:#303030;cursor:ew-resize}.dg .c .slider-fg{background:#2FA1D6;max-width:100%}.dg .c .slider:hover{background:#3c3c3c}.dg .c .slider:hover .slider-fg{background:#44abda}
`);KT.inject(nE);var f0="dg",h0=72,p0=20,Yl="Default",cl=(function(){try{return!!window.localStorage}catch{return!1}})(),Sl=void 0,m0=!0,ea=void 0,Bd=!1,b_=[],sn=function r(e){var t=this,n=e||{};this.domElement=document.createElement("div"),this.__ul=document.createElement("ul"),this.domElement.appendChild(this.__ul),ee.addClass(this.domElement,f0),this.__folders={},this.__controllers=[],this.__rememberedObjects=[],this.__rememberedObjectIndecesToControllers=[],this.__listening=[],n=de.defaults(n,{closeOnTop:!1,autoPlace:!0,width:r.DEFAULT_WIDTH}),n=de.defaults(n,{resizable:n.autoPlace,hideable:n.autoPlace}),de.isUndefined(n.load)?n.load={preset:Yl}:n.preset&&(n.load.preset=n.preset),de.isUndefined(n.parent)&&n.hideable&&b_.push(this),n.resizable=de.isUndefined(n.parent)&&n.resizable,n.autoPlace&&de.isUndefined(n.scrollable)&&(n.scrollable=!0);var i=cl&&localStorage.getItem(ta(this,"isLocal"))==="true",s=void 0,o=void 0;if(Object.defineProperties(this,{parent:{get:function(){return n.parent}},scrollable:{get:function(){return n.scrollable}},autoPlace:{get:function(){return n.autoPlace}},closeOnTop:{get:function(){return n.closeOnTop}},preset:{get:function(){return t.parent?t.getRoot().preset:n.load.preset},set:function(f){t.parent?t.getRoot().preset=f:n.load.preset=f,oE(this),t.revert()}},width:{get:function(){return n.width},set:function(f){n.width=f,ah(t,f)}},name:{get:function(){return n.name},set:function(f){n.name=f,o&&(o.innerHTML=n.name)}},closed:{get:function(){return n.closed},set:function(f){n.closed=f,n.closed?ee.addClass(t.__ul,r.CLASS_CLOSED):ee.removeClass(t.__ul,r.CLASS_CLOSED),this.onResize(),t.__closeButton&&(t.__closeButton.innerHTML=f?r.TEXT_OPEN:r.TEXT_CLOSED)}},load:{get:function(){return n.load}},useLocalStorage:{get:function(){return i},set:function(f){cl&&(i=f,f?ee.bind(window,"unload",s):ee.unbind(window,"unload",s),localStorage.setItem(ta(t,"isLocal"),f))}}}),de.isUndefined(n.parent)){if(this.closed=n.closed||!1,ee.addClass(this.domElement,r.CLASS_MAIN),ee.makeSelectable(this.domElement,!1),cl&&i){t.useLocalStorage=!0;var a=localStorage.getItem(ta(this,"gui"));a&&(n.load=JSON.parse(a))}this.__closeButton=document.createElement("div"),this.__closeButton.innerHTML=r.TEXT_CLOSED,ee.addClass(this.__closeButton,r.CLASS_CLOSE_BUTTON),n.closeOnTop?(ee.addClass(this.__closeButton,r.CLASS_CLOSE_TOP),this.domElement.insertBefore(this.__closeButton,this.domElement.childNodes[0])):(ee.addClass(this.__closeButton,r.CLASS_CLOSE_BOTTOM),this.domElement.appendChild(this.__closeButton)),ee.bind(this.__closeButton,"click",function(){t.closed=!t.closed})}else{n.closed===void 0&&(n.closed=!0);var l=document.createTextNode(n.name);ee.addClass(l,"controller-name"),o=fp(t,l);var c=function(f){return f.preventDefault(),t.closed=!t.closed,!1};ee.addClass(this.__ul,r.CLASS_CLOSED),ee.addClass(o,"title"),ee.bind(o,"click",c),n.closed||(this.closed=!1)}n.autoPlace&&(de.isUndefined(n.parent)&&(m0&&(ea=document.createElement("div"),ee.addClass(ea,f0),ee.addClass(ea,r.CLASS_AUTO_PLACE_CONTAINER),document.body.appendChild(ea),m0=!1),ea.appendChild(this.domElement),ee.addClass(this.domElement,r.CLASS_AUTO_PLACE)),this.parent||ah(t,n.width)),this.__resizeHandler=function(){t.onResizeDebounced()},ee.bind(window,"resize",this.__resizeHandler),ee.bind(this.__ul,"webkitTransitionEnd",this.__resizeHandler),ee.bind(this.__ul,"transitionend",this.__resizeHandler),ee.bind(this.__ul,"oTransitionEnd",this.__resizeHandler),this.onResize(),n.resizable&&sE(this),s=function(){cl&&localStorage.getItem(ta(t,"isLocal"))==="true"&&localStorage.setItem(ta(t,"gui"),JSON.stringify(t.getSaveObject()))},this.saveToLocalStorageIfPossible=s;function u(){var d=t.getRoot();d.width+=1,de.defer(function(){d.width-=1})}n.parent||u()};sn.toggleHide=function(){Bd=!Bd,de.each(b_,function(r){r.domElement.style.display=Bd?"none":""})};sn.CLASS_AUTO_PLACE="a";sn.CLASS_AUTO_PLACE_CONTAINER="ac";sn.CLASS_MAIN="main";sn.CLASS_CONTROLLER_ROW="cr";sn.CLASS_TOO_TALL="taller-than-window";sn.CLASS_CLOSED="closed";sn.CLASS_CLOSE_BUTTON="close-button";sn.CLASS_CLOSE_TOP="close-top";sn.CLASS_CLOSE_BOTTOM="close-bottom";sn.CLASS_DRAG="drag";sn.DEFAULT_WIDTH=245;sn.TEXT_CLOSED="Close Controls";sn.TEXT_OPEN="Open Controls";sn._keydownHandler=function(r){document.activeElement.type!=="text"&&(r.which===h0||r.keyCode===h0)&&sn.toggleHide()};ee.bind(window,"keydown",sn._keydownHandler,!1);de.extend(sn.prototype,{add:function(e,t){return Ml(this,e,t,{factoryArgs:Array.prototype.slice.call(arguments,2)})},addColor:function(e,t){return Ml(this,e,t,{color:!0})},remove:function(e){this.__ul.removeChild(e.__li),this.__controllers.splice(this.__controllers.indexOf(e),1);var t=this;de.defer(function(){t.onResize()})},destroy:function(){if(this.parent)throw new Error("Only the root GUI should be removed with .destroy(). For subfolders, use gui.removeFolder(folder) instead.");this.autoPlace&&ea.removeChild(this.domElement);var e=this;de.each(this.__folders,function(t){e.removeFolder(t)}),ee.unbind(window,"keydown",sn._keydownHandler,!1),g0(this)},addFolder:function(e){if(this.__folders[e]!==void 0)throw new Error('You already have a folder in this GUI by the name "'+e+'"');var t={name:e,parent:this};t.autoPlace=this.autoPlace,this.load&&this.load.folders&&this.load.folders[e]&&(t.closed=this.load.folders[e].closed,t.load=this.load.folders[e]);var n=new sn(t);this.__folders[e]=n;var i=fp(this,n.domElement);return ee.addClass(i,"folder"),n},removeFolder:function(e){this.__ul.removeChild(e.domElement.parentElement),delete this.__folders[e.name],this.load&&this.load.folders&&this.load.folders[e.name]&&delete this.load.folders[e.name],g0(e);var t=this;de.each(e.__folders,function(n){e.removeFolder(n)}),de.defer(function(){t.onResize()})},open:function(){this.closed=!1},close:function(){this.closed=!0},hide:function(){this.domElement.style.display="none"},show:function(){this.domElement.style.display=""},onResize:function(){var e=this.getRoot();if(e.scrollable){var t=ee.getOffset(e.__ul).top,n=0;de.each(e.__ul.childNodes,function(i){e.autoPlace&&i===e.__save_row||(n+=ee.getHeight(i))}),window.innerHeight-t-p0<n?(ee.addClass(e.domElement,sn.CLASS_TOO_TALL),e.__ul.style.height=window.innerHeight-t-p0+"px"):(ee.removeClass(e.domElement,sn.CLASS_TOO_TALL),e.__ul.style.height="auto")}e.__resize_handle&&de.defer(function(){e.__resize_handle.style.height=e.__ul.offsetHeight+"px"}),e.__closeButton&&(e.__closeButton.style.width=e.width+"px")},onResizeDebounced:de.debounce(function(){this.onResize()},50),remember:function(){if(de.isUndefined(Sl)&&(Sl=new tE,Sl.domElement.innerHTML=ZT),this.parent)throw new Error("You can only call remember on a top level GUI.");var e=this;de.each(Array.prototype.slice.call(arguments),function(t){e.__rememberedObjects.length===0&&rE(e),e.__rememberedObjects.indexOf(t)===-1&&e.__rememberedObjects.push(t)}),this.autoPlace&&ah(this,this.width)},getRoot:function(){for(var e=this;e.parent;)e=e.parent;return e},getSaveObject:function(){var e=this.load;return e.closed=this.closed,this.__rememberedObjects.length>0&&(e.preset=this.preset,e.remembered||(e.remembered={}),e.remembered[this.preset]=Uc(this)),e.folders={},de.each(this.__folders,function(t,n){e.folders[n]=t.getSaveObject()}),e},save:function(){this.load.remembered||(this.load.remembered={}),this.load.remembered[this.preset]=Uc(this),sh(this,!1),this.saveToLocalStorageIfPossible()},saveAs:function(e){this.load.remembered||(this.load.remembered={},this.load.remembered[Yl]=Uc(this,!0)),this.load.remembered[e]=Uc(this),this.preset=e,oh(this,e,!0),this.saveToLocalStorageIfPossible()},revert:function(e){de.each(this.__controllers,function(t){this.getRoot().load.remembered?w_(e||this.getRoot(),t):t.setValue(t.initialValue),t.__onFinishChange&&t.__onFinishChange.call(t,t.getValue())},this),de.each(this.__folders,function(t){t.revert(t)}),e||sh(this.getRoot(),!1)},listen:function(e){var t=this.__listening.length===0;this.__listening.push(e),t&&S_(this.__listening)},updateDisplay:function(){de.each(this.__controllers,function(e){e.updateDisplay()}),de.each(this.__folders,function(e){e.updateDisplay()})}});function fp(r,e,t){var n=document.createElement("li");return e&&n.appendChild(e),t?r.__ul.insertBefore(n,t):r.__ul.appendChild(n),r.onResize(),n}function g0(r){ee.unbind(window,"resize",r.__resizeHandler),r.saveToLocalStorageIfPossible&&ee.unbind(window,"unload",r.saveToLocalStorageIfPossible)}function sh(r,e){var t=r.__preset_select[r.__preset_select.selectedIndex];e?t.innerHTML=t.value+"*":t.innerHTML=t.value}function iE(r,e,t){if(t.__li=e,t.__gui=r,de.extend(t,{options:function(o){if(arguments.length>1){var a=t.__li.nextElementSibling;return t.remove(),Ml(r,t.object,t.property,{before:a,factoryArgs:[de.toArray(arguments)]})}if(de.isArray(o)||de.isObject(o)){var l=t.__li.nextElementSibling;return t.remove(),Ml(r,t.object,t.property,{before:l,factoryArgs:[o]})}},name:function(o){return t.__li.firstElementChild.firstElementChild.innerHTML=o,t},listen:function(){return t.__gui.listen(t),t},remove:function(){return t.__gui.remove(t),t}}),t instanceof ih){var n=new Cu(t.object,t.property,{min:t.__min,max:t.__max,step:t.__step});de.each(["updateDisplay","onChange","onFinishChange","step","min","max"],function(s){var o=t[s],a=n[s];t[s]=n[s]=function(){var l=Array.prototype.slice.call(arguments);return a.apply(n,l),o.apply(t,l)}}),ee.addClass(e,"has-slider"),t.domElement.insertBefore(n.domElement,t.domElement.firstElementChild)}else if(t instanceof Cu){var i=function(o){if(de.isNumber(t.__min)&&de.isNumber(t.__max)){var a=t.__li.firstElementChild.firstElementChild.innerHTML,l=t.__gui.__listening.indexOf(t)>-1;t.remove();var c=Ml(r,t.object,t.property,{before:t.__li.nextElementSibling,factoryArgs:[t.__min,t.__max,t.__step]});return c.name(a),l&&c.listen(),c}return o};t.min=de.compose(i,t.min),t.max=de.compose(i,t.max)}else t instanceof x_?(ee.bind(e,"click",function(){ee.fakeEvent(t.__checkbox,"click")}),ee.bind(t.__checkbox,"click",function(s){s.stopPropagation()})):t instanceof y_?(ee.bind(e,"click",function(){ee.fakeEvent(t.__button,"click")}),ee.bind(e,"mouseover",function(){ee.addClass(t.__button,"hover")}),ee.bind(e,"mouseout",function(){ee.removeClass(t.__button,"hover")})):t instanceof rh&&(ee.addClass(e,"color"),t.updateDisplay=de.compose(function(s){return e.style.borderLeftColor=t.__color.toString(),s},t.updateDisplay),t.updateDisplay());t.setValue=de.compose(function(s){return r.getRoot().__preset_select&&t.isModified()&&sh(r.getRoot(),!0),s},t.setValue)}function w_(r,e){var t=r.getRoot(),n=t.__rememberedObjects.indexOf(e.object);if(n!==-1){var i=t.__rememberedObjectIndecesToControllers[n];if(i===void 0&&(i={},t.__rememberedObjectIndecesToControllers[n]=i),i[e.property]=e,t.load&&t.load.remembered){var s=t.load.remembered,o=void 0;if(s[r.preset])o=s[r.preset];else if(s[Yl])o=s[Yl];else return;if(o[n]&&o[n][e.property]!==void 0){var a=o[n][e.property];e.initialValue=a,e.setValue(a)}}}}function Ml(r,e,t,n){if(e[t]===void 0)throw new Error('Object "'+e+'" has no property "'+t+'"');var i=void 0;if(n.color)i=new rh(e,t);else{var s=[e,t].concat(n.factoryArgs);i=JT.apply(r,s)}n.before instanceof Co&&(n.before=n.before.__li),w_(r,i),ee.addClass(i.domElement,"c");var o=document.createElement("span");ee.addClass(o,"property-name"),o.innerHTML=i.property;var a=document.createElement("div");a.appendChild(o),a.appendChild(i.domElement);var l=fp(r,a,n.before);return ee.addClass(l,sn.CLASS_CONTROLLER_ROW),i instanceof rh?ee.addClass(l,"color"):ee.addClass(l,HT(i.getValue())),iE(r,l,i),r.__controllers.push(i),i}function ta(r,e){return document.location.href+"."+e}function oh(r,e,t){var n=document.createElement("option");n.innerHTML=e,n.value=e,r.__preset_select.appendChild(n),t&&(r.__preset_select.selectedIndex=r.__preset_select.length-1)}function _0(r,e){e.style.display=r.useLocalStorage?"block":"none"}function rE(r){var e=r.__save_row=document.createElement("li");ee.addClass(r.domElement,"has-save"),r.__ul.insertBefore(e,r.__ul.firstChild),ee.addClass(e,"save-row");var t=document.createElement("span");t.innerHTML="&nbsp;",ee.addClass(t,"button gears");var n=document.createElement("span");n.innerHTML="Save",ee.addClass(n,"button"),ee.addClass(n,"save");var i=document.createElement("span");i.innerHTML="New",ee.addClass(i,"button"),ee.addClass(i,"save-as");var s=document.createElement("span");s.innerHTML="Revert",ee.addClass(s,"button"),ee.addClass(s,"revert");var o=r.__preset_select=document.createElement("select");if(r.load&&r.load.remembered?de.each(r.load.remembered,function(d,f){oh(r,f,f===r.preset)}):oh(r,Yl,!1),ee.bind(o,"change",function(){for(var d=0;d<r.__preset_select.length;d++)r.__preset_select[d].innerHTML=r.__preset_select[d].value;r.preset=this.value}),e.appendChild(o),e.appendChild(t),e.appendChild(n),e.appendChild(i),e.appendChild(s),cl){var a=document.getElementById("dg-local-explain"),l=document.getElementById("dg-local-storage"),c=document.getElementById("dg-save-locally");c.style.display="block",localStorage.getItem(ta(r,"isLocal"))==="true"&&l.setAttribute("checked","checked"),_0(r,a),ee.bind(l,"change",function(){r.useLocalStorage=!r.useLocalStorage,_0(r,a)})}var u=document.getElementById("dg-new-constructor");ee.bind(u,"keydown",function(d){d.metaKey&&(d.which===67||d.keyCode===67)&&Sl.hide()}),ee.bind(t,"click",function(){u.innerHTML=JSON.stringify(r.getSaveObject(),void 0,2),Sl.show(),u.focus(),u.select()}),ee.bind(n,"click",function(){r.save()}),ee.bind(i,"click",function(){var d=prompt("Enter a new preset name.");d&&r.saveAs(d)}),ee.bind(s,"click",function(){r.revert()})}function sE(r){var e=void 0;r.__resize_handle=document.createElement("div"),de.extend(r.__resize_handle.style,{width:"6px",marginLeft:"-3px",height:"200px",cursor:"ew-resize",position:"absolute"});function t(s){return s.preventDefault(),r.width+=e-s.clientX,r.onResize(),e=s.clientX,!1}function n(){ee.removeClass(r.__closeButton,sn.CLASS_DRAG),ee.unbind(window,"mousemove",t),ee.unbind(window,"mouseup",n)}function i(s){return s.preventDefault(),e=s.clientX,ee.addClass(r.__closeButton,sn.CLASS_DRAG),ee.bind(window,"mousemove",t),ee.bind(window,"mouseup",n),!1}ee.bind(r.__resize_handle,"mousedown",i),ee.bind(r.__closeButton,"mousedown",i),r.domElement.insertBefore(r.__resize_handle,r.domElement.firstElementChild)}function ah(r,e){r.domElement.style.width=e+"px",r.__save_row&&r.autoPlace&&(r.__save_row.style.width=e+"px"),r.__closeButton&&(r.__closeButton.style.width=e+"px")}function Uc(r,e){var t={};return de.each(r.__rememberedObjects,function(n,i){var s={},o=r.__rememberedObjectIndecesToControllers[i];de.each(o,function(a,l){s[l]=e?a.initialValue:a.getValue()}),t[i]=s}),t}function oE(r){for(var e=0;e<r.__preset_select.length;e++)r.__preset_select[e].value===r.preset&&(r.__preset_select.selectedIndex=e)}function S_(r){r.length!==0&&eE.call(window,function(){S_(r)}),de.each(r,function(e){e.updateDisplay()})}var aE=sn;function x0(r,e){if(e===hy)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),r;if(e===Kf||e===Hg){let t=r.getIndex();if(t===null){const o=[],a=r.getAttribute("position");if(a!==void 0){for(let l=0;l<a.count;l++)o.push(l);r.setIndex(o),t=r.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),r}const n=t.count-2,i=[];if(e===Kf)for(let o=1;o<=n;o++)i.push(t.getX(0)),i.push(t.getX(o)),i.push(t.getX(o+1));else for(let o=0;o<n;o++)o%2===0?(i.push(t.getX(o)),i.push(t.getX(o+1)),i.push(t.getX(o+2))):(i.push(t.getX(o+2)),i.push(t.getX(o+1)),i.push(t.getX(o)));i.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");const s=r.clone();return s.setIndex(i),s.clearGroups(),s}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),r}class lE extends Ao{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new hE(t)}),this.register(function(t){return new pE(t)}),this.register(function(t){return new SE(t)}),this.register(function(t){return new ME(t)}),this.register(function(t){return new TE(t)}),this.register(function(t){return new gE(t)}),this.register(function(t){return new _E(t)}),this.register(function(t){return new xE(t)}),this.register(function(t){return new vE(t)}),this.register(function(t){return new fE(t)}),this.register(function(t){return new yE(t)}),this.register(function(t){return new mE(t)}),this.register(function(t){return new wE(t)}),this.register(function(t){return new bE(t)}),this.register(function(t){return new uE(t)}),this.register(function(t){return new EE(t)}),this.register(function(t){return new AE(t)})}load(e,t,n,i){const s=this;let o;if(this.resourcePath!=="")o=this.resourcePath;else if(this.path!==""){const c=wl.extractUrlBase(e);o=wl.resolveURL(c,this.path)}else o=wl.extractUrlBase(e);this.manager.itemStart(e);const a=function(c){i?i(c):console.error(c),s.manager.itemError(e),s.manager.itemEnd(e)},l=new Eu(this.manager);l.setPath(this.path),l.setResponseType("arraybuffer"),l.setRequestHeader(this.requestHeader),l.setWithCredentials(this.withCredentials),l.load(e,function(c){try{s.parse(c,o,function(u){t(u),s.manager.itemEnd(e)},a)}catch(u){a(u)}},n,a)}setDRACOLoader(e){return this.dracoLoader=e,this}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,i){let s;const o={},a={},l=new TextDecoder;if(typeof e=="string")s=JSON.parse(e);else if(e instanceof ArrayBuffer)if(l.decode(new Uint8Array(e,0,4))===M_){try{o[Lt.KHR_BINARY_GLTF]=new CE(e)}catch(d){i&&i(d);return}s=JSON.parse(o[Lt.KHR_BINARY_GLTF].content)}else s=JSON.parse(l.decode(e));else s=e;if(s.asset===void 0||s.asset.version[0]<2){i&&i(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}const c=new VE(s,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});c.fileLoader.setRequestHeader(this.requestHeader);for(let u=0;u<this.pluginCallbacks.length;u++){const d=this.pluginCallbacks[u](c);d.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),a[d.name]=d,o[d.name]=!0}if(s.extensionsUsed)for(let u=0;u<s.extensionsUsed.length;++u){const d=s.extensionsUsed[u],f=s.extensionsRequired||[];switch(d){case Lt.KHR_MATERIALS_UNLIT:o[d]=new dE;break;case Lt.KHR_DRACO_MESH_COMPRESSION:o[d]=new RE(s,this.dracoLoader);break;case Lt.KHR_TEXTURE_TRANSFORM:o[d]=new PE;break;case Lt.KHR_MESH_QUANTIZATION:o[d]=new LE;break;default:f.indexOf(d)>=0&&a[d]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+d+'".')}}c.setExtensions(o),c.setPlugins(a),c.parse(n,i)}parseAsync(e,t){const n=this;return new Promise(function(i,s){n.parse(e,t,i,s)})}}function cE(){let r={};return{get:function(e){return r[e]},add:function(e,t){r[e]=t},remove:function(e){delete r[e]},removeAll:function(){r={}}}}const Lt={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"};class uE{constructor(e){this.parser=e,this.name=Lt.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){const e=this.parser,t=this.parser.json.nodes||[];for(let n=0,i=t.length;n<i;n++){const s=t[n];s.extensions&&s.extensions[this.name]&&s.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,s.extensions[this.name].light)}}_loadLight(e){const t=this.parser,n="light:"+e;let i=t.cache.get(n);if(i)return i;const s=t.json,l=((s.extensions&&s.extensions[this.name]||{}).lights||[])[e];let c;const u=new $e(16777215);l.color!==void 0&&u.setRGB(l.color[0],l.color[1],l.color[2],Zn);const d=l.range!==void 0?l.range:0;switch(l.type){case"directional":c=new c_(u),c.target.position.set(0,0,-1),c.add(c.target);break;case"point":c=new l_(u),c.distance=d;break;case"spot":c=new Bb(u),c.distance=d,l.spot=l.spot||{},l.spot.innerConeAngle=l.spot.innerConeAngle!==void 0?l.spot.innerConeAngle:0,l.spot.outerConeAngle=l.spot.outerConeAngle!==void 0?l.spot.outerConeAngle:Math.PI/4,c.angle=l.spot.outerConeAngle,c.penumbra=1-l.spot.innerConeAngle/l.spot.outerConeAngle,c.target.position.set(0,0,-1),c.add(c.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+l.type)}return c.position.set(0,0,0),gr(c,l),l.intensity!==void 0&&(c.intensity=l.intensity),c.name=t.createUniqueName(l.name||"light_"+e),i=Promise.resolve(c),t.cache.add(n,i),i}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){const t=this,n=this.parser,s=n.json.nodes[e],a=(s.extensions&&s.extensions[this.name]||{}).light;return a===void 0?null:this._loadLight(a).then(function(l){return n._getNodeRef(t.cache,a,l)})}}class dE{constructor(){this.name=Lt.KHR_MATERIALS_UNLIT}getMaterialType(){return oo}extendParams(e,t,n){const i=[];e.color=new $e(1,1,1),e.opacity=1;const s=t.pbrMetallicRoughness;if(s){if(Array.isArray(s.baseColorFactor)){const o=s.baseColorFactor;e.color.setRGB(o[0],o[1],o[2],Zn),e.opacity=o[3]}s.baseColorTexture!==void 0&&i.push(n.assignTexture(e,"map",s.baseColorTexture,Mn))}return Promise.all(i)}}class fE{constructor(e){this.parser=e,this.name=Lt.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){const i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=i.extensions[this.name].emissiveStrength;return s!==void 0&&(t.emissiveIntensity=s),Promise.resolve()}}class hE{constructor(e){this.parser=e,this.name=Lt.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:cr}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];if(o.clearcoatFactor!==void 0&&(t.clearcoat=o.clearcoatFactor),o.clearcoatTexture!==void 0&&s.push(n.assignTexture(t,"clearcoatMap",o.clearcoatTexture)),o.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=o.clearcoatRoughnessFactor),o.clearcoatRoughnessTexture!==void 0&&s.push(n.assignTexture(t,"clearcoatRoughnessMap",o.clearcoatRoughnessTexture)),o.clearcoatNormalTexture!==void 0&&(s.push(n.assignTexture(t,"clearcoatNormalMap",o.clearcoatNormalTexture)),o.clearcoatNormalTexture.scale!==void 0)){const a=o.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new Et(a,a)}return Promise.all(s)}}class pE{constructor(e){this.parser=e,this.name=Lt.KHR_MATERIALS_DISPERSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:cr}extendMaterialParams(e,t){const i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=i.extensions[this.name];return t.dispersion=s.dispersion!==void 0?s.dispersion:0,Promise.resolve()}}class mE{constructor(e){this.parser=e,this.name=Lt.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:cr}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];return o.iridescenceFactor!==void 0&&(t.iridescence=o.iridescenceFactor),o.iridescenceTexture!==void 0&&s.push(n.assignTexture(t,"iridescenceMap",o.iridescenceTexture)),o.iridescenceIor!==void 0&&(t.iridescenceIOR=o.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),o.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=o.iridescenceThicknessMinimum),o.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=o.iridescenceThicknessMaximum),o.iridescenceThicknessTexture!==void 0&&s.push(n.assignTexture(t,"iridescenceThicknessMap",o.iridescenceThicknessTexture)),Promise.all(s)}}class gE{constructor(e){this.parser=e,this.name=Lt.KHR_MATERIALS_SHEEN}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:cr}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[];t.sheenColor=new $e(0,0,0),t.sheenRoughness=0,t.sheen=1;const o=i.extensions[this.name];if(o.sheenColorFactor!==void 0){const a=o.sheenColorFactor;t.sheenColor.setRGB(a[0],a[1],a[2],Zn)}return o.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=o.sheenRoughnessFactor),o.sheenColorTexture!==void 0&&s.push(n.assignTexture(t,"sheenColorMap",o.sheenColorTexture,Mn)),o.sheenRoughnessTexture!==void 0&&s.push(n.assignTexture(t,"sheenRoughnessMap",o.sheenRoughnessTexture)),Promise.all(s)}}class _E{constructor(e){this.parser=e,this.name=Lt.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:cr}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];return o.transmissionFactor!==void 0&&(t.transmission=o.transmissionFactor),o.transmissionTexture!==void 0&&s.push(n.assignTexture(t,"transmissionMap",o.transmissionTexture)),Promise.all(s)}}class xE{constructor(e){this.parser=e,this.name=Lt.KHR_MATERIALS_VOLUME}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:cr}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];t.thickness=o.thicknessFactor!==void 0?o.thicknessFactor:0,o.thicknessTexture!==void 0&&s.push(n.assignTexture(t,"thicknessMap",o.thicknessTexture)),t.attenuationDistance=o.attenuationDistance||1/0;const a=o.attenuationColor||[1,1,1];return t.attenuationColor=new $e().setRGB(a[0],a[1],a[2],Zn),Promise.all(s)}}class vE{constructor(e){this.parser=e,this.name=Lt.KHR_MATERIALS_IOR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:cr}extendMaterialParams(e,t){const i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=i.extensions[this.name];return t.ior=s.ior!==void 0?s.ior:1.5,Promise.resolve()}}class yE{constructor(e){this.parser=e,this.name=Lt.KHR_MATERIALS_SPECULAR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:cr}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];t.specularIntensity=o.specularFactor!==void 0?o.specularFactor:1,o.specularTexture!==void 0&&s.push(n.assignTexture(t,"specularIntensityMap",o.specularTexture));const a=o.specularColorFactor||[1,1,1];return t.specularColor=new $e().setRGB(a[0],a[1],a[2],Zn),o.specularColorTexture!==void 0&&s.push(n.assignTexture(t,"specularColorMap",o.specularColorTexture,Mn)),Promise.all(s)}}class bE{constructor(e){this.parser=e,this.name=Lt.EXT_MATERIALS_BUMP}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:cr}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];return t.bumpScale=o.bumpFactor!==void 0?o.bumpFactor:1,o.bumpTexture!==void 0&&s.push(n.assignTexture(t,"bumpMap",o.bumpTexture)),Promise.all(s)}}class wE{constructor(e){this.parser=e,this.name=Lt.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:cr}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];return o.anisotropyStrength!==void 0&&(t.anisotropy=o.anisotropyStrength),o.anisotropyRotation!==void 0&&(t.anisotropyRotation=o.anisotropyRotation),o.anisotropyTexture!==void 0&&s.push(n.assignTexture(t,"anisotropyMap",o.anisotropyTexture)),Promise.all(s)}}class SE{constructor(e){this.parser=e,this.name=Lt.KHR_TEXTURE_BASISU}loadTexture(e){const t=this.parser,n=t.json,i=n.textures[e];if(!i.extensions||!i.extensions[this.name])return null;const s=i.extensions[this.name],o=t.options.ktx2Loader;if(!o){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,s.source,o)}}class ME{constructor(e){this.parser=e,this.name=Lt.EXT_TEXTURE_WEBP}loadTexture(e){const t=this.name,n=this.parser,i=n.json,s=i.textures[e];if(!s.extensions||!s.extensions[t])return null;const o=s.extensions[t],a=i.images[o.source];let l=n.textureLoader;if(a.uri){const c=n.options.manager.getHandler(a.uri);c!==null&&(l=c)}return n.loadTextureImage(e,o.source,l)}}class TE{constructor(e){this.parser=e,this.name=Lt.EXT_TEXTURE_AVIF}loadTexture(e){const t=this.name,n=this.parser,i=n.json,s=i.textures[e];if(!s.extensions||!s.extensions[t])return null;const o=s.extensions[t],a=i.images[o.source];let l=n.textureLoader;if(a.uri){const c=n.options.manager.getHandler(a.uri);c!==null&&(l=c)}return n.loadTextureImage(e,o.source,l)}}class EE{constructor(e){this.name=Lt.EXT_MESHOPT_COMPRESSION,this.parser=e}loadBufferView(e){const t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){const i=n.extensions[this.name],s=this.parser.getDependency("buffer",i.buffer),o=this.parser.options.meshoptDecoder;if(!o||!o.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return s.then(function(a){const l=i.byteOffset||0,c=i.byteLength||0,u=i.count,d=i.byteStride,f=new Uint8Array(a,l,c);return o.decodeGltfBufferAsync?o.decodeGltfBufferAsync(u,d,f,i.mode,i.filter).then(function(h){return h.buffer}):o.ready.then(function(){const h=new ArrayBuffer(u*d);return o.decodeGltfBuffer(new Uint8Array(h),u,d,f,i.mode,i.filter),h})})}else return null}}class AE{constructor(e){this.name=Lt.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){const t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;const i=t.meshes[n.mesh];for(const c of i.primitives)if(c.mode!==Bi.TRIANGLES&&c.mode!==Bi.TRIANGLE_STRIP&&c.mode!==Bi.TRIANGLE_FAN&&c.mode!==void 0)return null;const o=n.extensions[this.name].attributes,a=[],l={};for(const c in o)a.push(this.parser.getDependency("accessor",o[c]).then(u=>(l[c]=u,l[c])));return a.length<1?null:(a.push(this.parser.createNodeMesh(e)),Promise.all(a).then(c=>{const u=c.pop(),d=u.isGroup?u.children:[u],f=c[0].count,h=[];for(const _ of d){const g=new yt,m=new $,p=new ks,b=new $(1,1,1),x=new t_(_.geometry,_.material,f);for(let v=0;v<f;v++)l.TRANSLATION&&m.fromBufferAttribute(l.TRANSLATION,v),l.ROTATION&&p.fromBufferAttribute(l.ROTATION,v),l.SCALE&&b.fromBufferAttribute(l.SCALE,v),x.setMatrixAt(v,g.compose(m,p,b));for(const v in l)if(v==="_COLOR_0"){const E=l[v];x.instanceColor=new Jf(E.array,E.itemSize,E.normalized)}else v!=="TRANSLATION"&&v!=="ROTATION"&&v!=="SCALE"&&_.geometry.setAttribute(v,l[v]);un.prototype.copy.call(x,_),this.parser.assignFinalMaterial(x),h.push(x)}return u.isGroup?(u.clear(),u.add(...h),u):h[0]}))}}const M_="glTF",Qa=12,v0={JSON:1313821514,BIN:5130562};class CE{constructor(e){this.name=Lt.KHR_BINARY_GLTF,this.content=null,this.body=null;const t=new DataView(e,0,Qa),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==M_)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");const i=this.header.length-Qa,s=new DataView(e,Qa);let o=0;for(;o<i;){const a=s.getUint32(o,!0);o+=4;const l=s.getUint32(o,!0);if(o+=4,l===v0.JSON){const c=new Uint8Array(e,Qa+o,a);this.content=n.decode(c)}else if(l===v0.BIN){const c=Qa+o;this.body=e.slice(c,c+a)}o+=a}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}}class RE{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=Lt.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){const n=this.json,i=this.dracoLoader,s=e.extensions[this.name].bufferView,o=e.extensions[this.name].attributes,a={},l={},c={};for(const u in o){const d=lh[u]||u.toLowerCase();a[d]=o[u]}for(const u in e.attributes){const d=lh[u]||u.toLowerCase();if(o[u]!==void 0){const f=n.accessors[e.attributes[u]],h=ua[f.componentType];c[d]=h.name,l[d]=f.normalized===!0}}return t.getDependency("bufferView",s).then(function(u){return new Promise(function(d,f){i.decodeDracoFile(u,function(h){for(const _ in h.attributes){const g=h.attributes[_],m=l[_];m!==void 0&&(g.normalized=m)}d(h)},a,c,Zn,f)})})}}class PE{constructor(){this.name=Lt.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}}class LE{constructor(){this.name=Lt.KHR_MESH_QUANTIZATION}}class T_ extends oc{constructor(e,t,n,i){super(e,t,n,i)}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,s=e*i*3+i;for(let o=0;o!==i;o++)t[o]=n[s+o];return t}interpolate_(e,t,n,i){const s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=a*2,c=a*3,u=i-t,d=(n-t)/u,f=d*d,h=f*d,_=e*c,g=_-c,m=-2*h+3*f,p=h-f,b=1-m,x=p-f+d;for(let v=0;v!==a;v++){const E=o[g+v+a],M=o[g+v+l]*u,T=o[_+v+a],R=o[_+v]*u;s[v]=b*E+x*M+m*T+p*R}return s}}const DE=new ks;class IE extends T_{interpolate_(e,t,n,i){const s=super.interpolate_(e,t,n,i);return DE.fromArray(s).normalize().toArray(s),s}}const Bi={POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6},ua={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},y0={9728:hi,9729:jn,9984:Ng,9985:tu,9986:al,9987:Yr},b0={33071:wr,33648:vu,10497:Sa},zd={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},lh={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},ps={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},OE={CUBICSPLINE:void 0,LINEAR:Wl,STEP:Gl},Vd={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function NE(r){return r.DefaultMaterial===void 0&&(r.DefaultMaterial=new op({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:ts})),r.DefaultMaterial}function js(r,e,t){for(const n in t.extensions)r[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function gr(r,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(r.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function FE(r,e,t){let n=!1,i=!1,s=!1;for(let c=0,u=e.length;c<u;c++){const d=e[c];if(d.POSITION!==void 0&&(n=!0),d.NORMAL!==void 0&&(i=!0),d.COLOR_0!==void 0&&(s=!0),n&&i&&s)break}if(!n&&!i&&!s)return Promise.resolve(r);const o=[],a=[],l=[];for(let c=0,u=e.length;c<u;c++){const d=e[c];if(n){const f=d.POSITION!==void 0?t.getDependency("accessor",d.POSITION):r.attributes.position;o.push(f)}if(i){const f=d.NORMAL!==void 0?t.getDependency("accessor",d.NORMAL):r.attributes.normal;a.push(f)}if(s){const f=d.COLOR_0!==void 0?t.getDependency("accessor",d.COLOR_0):r.attributes.color;l.push(f)}}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(l)]).then(function(c){const u=c[0],d=c[1],f=c[2];return n&&(r.morphAttributes.position=u),i&&(r.morphAttributes.normal=d),s&&(r.morphAttributes.color=f),r.morphTargetsRelative=!0,r})}function UE(r,e){if(r.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)r.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){const t=e.extras.targetNames;if(r.morphTargetInfluences.length===t.length){r.morphTargetDictionary={};for(let n=0,i=t.length;n<i;n++)r.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function kE(r){let e;const t=r.extensions&&r.extensions[Lt.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+Hd(t.attributes):e=r.indices+":"+Hd(r.attributes)+":"+r.mode,r.targets!==void 0)for(let n=0,i=r.targets.length;n<i;n++)e+=":"+Hd(r.targets[n]);return e}function Hd(r){let e="";const t=Object.keys(r).sort();for(let n=0,i=t.length;n<i;n++)e+=t[n]+":"+r[t[n]]+";";return e}function ch(r){switch(r){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function BE(r){return r.search(/\.jpe?g($|\?)/i)>0||r.search(/^data\:image\/jpeg/)===0?"image/jpeg":r.search(/\.webp($|\?)/i)>0||r.search(/^data\:image\/webp/)===0?"image/webp":r.search(/\.ktx2($|\?)/i)>0||r.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}const zE=new yt;class VE{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new cE,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,i=-1,s=!1,o=-1;if(typeof navigator<"u"){const a=navigator.userAgent;n=/^((?!chrome|android).)*safari/i.test(a)===!0;const l=a.match(/Version\/(\d+)/);i=n&&l?parseInt(l[1],10):-1,s=a.indexOf("Firefox")>-1,o=s?a.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||n&&i<17||s&&o<98?this.textureLoader=new Ub(this.options.manager):this.textureLoader=new Hb(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new Eu(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){const n=this,i=this.json,s=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(o){return o._markDefs&&o._markDefs()}),Promise.all(this._invokeAll(function(o){return o.beforeRoot&&o.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(o){const a={scene:o[0][i.scene||0],scenes:o[0],animations:o[1],cameras:o[2],asset:i.asset,parser:n,userData:{}};return js(s,a,i),gr(a,i),Promise.all(n._invokeAll(function(l){return l.afterRoot&&l.afterRoot(a)})).then(function(){for(const l of a.scenes)l.updateMatrixWorld();e(a)})}).catch(t)}_markDefs(){const e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let i=0,s=t.length;i<s;i++){const o=t[i].joints;for(let a=0,l=o.length;a<l;a++)e[o[a]].isBone=!0}for(let i=0,s=e.length;i<s;i++){const o=e[i];o.mesh!==void 0&&(this._addNodeRef(this.meshCache,o.mesh),o.skin!==void 0&&(n[o.mesh].isSkinnedMesh=!0)),o.camera!==void 0&&this._addNodeRef(this.cameraCache,o.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;const i=n.clone(),s=(o,a)=>{const l=this.associations.get(o);l!=null&&this.associations.set(a,l);for(const[c,u]of o.children.entries())s(u,a.children[c])};return s(n,i),i.name+="_instance_"+e.uses[t]++,i}_invokeOne(e){const t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){const i=e(t[n]);if(i)return i}return null}_invokeAll(e){const t=Object.values(this.plugins);t.unshift(this);const n=[];for(let i=0;i<t.length;i++){const s=e(t[i]);s&&n.push(s)}return n}getDependency(e,t){const n=e+":"+t;let i=this.cache.get(n);if(!i){switch(e){case"scene":i=this.loadScene(t);break;case"node":i=this._invokeOne(function(s){return s.loadNode&&s.loadNode(t)});break;case"mesh":i=this._invokeOne(function(s){return s.loadMesh&&s.loadMesh(t)});break;case"accessor":i=this.loadAccessor(t);break;case"bufferView":i=this._invokeOne(function(s){return s.loadBufferView&&s.loadBufferView(t)});break;case"buffer":i=this.loadBuffer(t);break;case"material":i=this._invokeOne(function(s){return s.loadMaterial&&s.loadMaterial(t)});break;case"texture":i=this._invokeOne(function(s){return s.loadTexture&&s.loadTexture(t)});break;case"skin":i=this.loadSkin(t);break;case"animation":i=this._invokeOne(function(s){return s.loadAnimation&&s.loadAnimation(t)});break;case"camera":i=this.loadCamera(t);break;default:if(i=this._invokeOne(function(s){return s!=this&&s.getDependency&&s.getDependency(e,t)}),!i)throw new Error("Unknown type: "+e);break}this.cache.add(n,i)}return i}getDependencies(e){let t=this.cache.get(e);if(!t){const n=this,i=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(i.map(function(s,o){return n.getDependency(e,o)})),this.cache.add(e,t)}return t}loadBuffer(e){const t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[Lt.KHR_BINARY_GLTF].body);const i=this.options;return new Promise(function(s,o){n.load(wl.resolveURL(t.uri,i.path),s,void 0,function(){o(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){const t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){const i=t.byteLength||0,s=t.byteOffset||0;return n.slice(s,s+i)})}loadAccessor(e){const t=this,n=this.json,i=this.json.accessors[e];if(i.bufferView===void 0&&i.sparse===void 0){const o=zd[i.type],a=ua[i.componentType],l=i.normalized===!0,c=new a(i.count*o);return Promise.resolve(new Jt(c,o,l))}const s=[];return i.bufferView!==void 0?s.push(this.getDependency("bufferView",i.bufferView)):s.push(null),i.sparse!==void 0&&(s.push(this.getDependency("bufferView",i.sparse.indices.bufferView)),s.push(this.getDependency("bufferView",i.sparse.values.bufferView))),Promise.all(s).then(function(o){const a=o[0],l=zd[i.type],c=ua[i.componentType],u=c.BYTES_PER_ELEMENT,d=u*l,f=i.byteOffset||0,h=i.bufferView!==void 0?n.bufferViews[i.bufferView].byteStride:void 0,_=i.normalized===!0;let g,m;if(h&&h!==d){const p=Math.floor(f/h),b="InterleavedBuffer:"+i.bufferView+":"+i.componentType+":"+p+":"+i.count;let x=t.cache.get(b);x||(g=new c(a,p*h,i.count*h/u),x=new Qg(g,h/u),t.cache.add(b,x)),m=new Xu(x,l,f%h/u,_)}else a===null?g=new c(i.count*l):g=new c(a,f,i.count*l),m=new Jt(g,l,_);if(i.sparse!==void 0){const p=zd.SCALAR,b=ua[i.sparse.indices.componentType],x=i.sparse.indices.byteOffset||0,v=i.sparse.values.byteOffset||0,E=new b(o[1],x,i.sparse.count*p),M=new c(o[2],v,i.sparse.count*l);a!==null&&(m=new Jt(m.array.slice(),m.itemSize,m.normalized)),m.normalized=!1;for(let T=0,R=E.length;T<R;T++){const w=E[T];if(m.setX(w,M[T*l]),l>=2&&m.setY(w,M[T*l+1]),l>=3&&m.setZ(w,M[T*l+2]),l>=4&&m.setW(w,M[T*l+3]),l>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}m.normalized=_}return m})}loadTexture(e){const t=this.json,n=this.options,s=t.textures[e].source,o=t.images[s];let a=this.textureLoader;if(o.uri){const l=n.manager.getHandler(o.uri);l!==null&&(a=l)}return this.loadTextureImage(e,s,a)}loadTextureImage(e,t,n){const i=this,s=this.json,o=s.textures[e],a=s.images[t],l=(a.uri||a.bufferView)+":"+o.sampler;if(this.textureCache[l])return this.textureCache[l];const c=this.loadImageSource(t,n).then(function(u){u.flipY=!1,u.name=o.name||a.name||"",u.name===""&&typeof a.uri=="string"&&a.uri.startsWith("data:image/")===!1&&(u.name=a.uri);const f=(s.samplers||{})[o.sampler]||{};return u.magFilter=y0[f.magFilter]||jn,u.minFilter=y0[f.minFilter]||Yr,u.wrapS=b0[f.wrapS]||Sa,u.wrapT=b0[f.wrapT]||Sa,u.generateMipmaps=!u.isCompressedTexture&&u.minFilter!==hi&&u.minFilter!==jn,i.associations.set(u,{textures:e}),u}).catch(function(){return null});return this.textureCache[l]=c,c}loadImageSource(e,t){const n=this,i=this.json,s=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(d=>d.clone());const o=i.images[e],a=self.URL||self.webkitURL;let l=o.uri||"",c=!1;if(o.bufferView!==void 0)l=n.getDependency("bufferView",o.bufferView).then(function(d){c=!0;const f=new Blob([d],{type:o.mimeType});return l=a.createObjectURL(f),l});else if(o.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");const u=Promise.resolve(l).then(function(d){return new Promise(function(f,h){let _=f;t.isImageBitmapLoader===!0&&(_=function(g){const m=new Rn(g);m.needsUpdate=!0,f(m)}),t.load(wl.resolveURL(d,s.path),_,void 0,h)})}).then(function(d){return c===!0&&a.revokeObjectURL(l),gr(d,o),d.userData.mimeType=o.mimeType||BE(o.uri),d}).catch(function(d){throw console.error("THREE.GLTFLoader: Couldn't load texture",l),d});return this.sourceCache[e]=u,u}assignTexture(e,t,n,i){const s=this;return this.getDependency("texture",n.index).then(function(o){if(!o)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(o=o.clone(),o.channel=n.texCoord),s.extensions[Lt.KHR_TEXTURE_TRANSFORM]){const a=n.extensions!==void 0?n.extensions[Lt.KHR_TEXTURE_TRANSFORM]:void 0;if(a){const l=s.associations.get(o);o=s.extensions[Lt.KHR_TEXTURE_TRANSFORM].extendTexture(o,a),s.associations.set(o,l)}}return i!==void 0&&(o.colorSpace=i),e[t]=o,o})}assignFinalMaterial(e){const t=e.geometry;let n=e.material;const i=t.attributes.tangent===void 0,s=t.attributes.color!==void 0,o=t.attributes.normal===void 0;if(e.isPoints){const a="PointsMaterial:"+n.uuid;let l=this.cache.get(a);l||(l=new i_,Ar.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,l.sizeAttenuation=!1,this.cache.add(a,l)),n=l}else if(e.isLine){const a="LineBasicMaterial:"+n.uuid;let l=this.cache.get(a);l||(l=new n_,Ar.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,this.cache.add(a,l)),n=l}if(i||s||o){let a="ClonedMaterial:"+n.uuid+":";i&&(a+="derivative-tangents:"),s&&(a+="vertex-colors:"),o&&(a+="flat-shading:");let l=this.cache.get(a);l||(l=n.clone(),s&&(l.vertexColors=!0),o&&(l.flatShading=!0),i&&(l.normalScale&&(l.normalScale.y*=-1),l.clearcoatNormalScale&&(l.clearcoatNormalScale.y*=-1)),this.cache.add(a,l),this.associations.set(l,this.associations.get(n))),n=l}e.material=n}getMaterialType(){return op}loadMaterial(e){const t=this,n=this.json,i=this.extensions,s=n.materials[e];let o;const a={},l=s.extensions||{},c=[];if(l[Lt.KHR_MATERIALS_UNLIT]){const d=i[Lt.KHR_MATERIALS_UNLIT];o=d.getMaterialType(),c.push(d.extendParams(a,s,t))}else{const d=s.pbrMetallicRoughness||{};if(a.color=new $e(1,1,1),a.opacity=1,Array.isArray(d.baseColorFactor)){const f=d.baseColorFactor;a.color.setRGB(f[0],f[1],f[2],Zn),a.opacity=f[3]}d.baseColorTexture!==void 0&&c.push(t.assignTexture(a,"map",d.baseColorTexture,Mn)),a.metalness=d.metallicFactor!==void 0?d.metallicFactor:1,a.roughness=d.roughnessFactor!==void 0?d.roughnessFactor:1,d.metallicRoughnessTexture!==void 0&&(c.push(t.assignTexture(a,"metalnessMap",d.metallicRoughnessTexture)),c.push(t.assignTexture(a,"roughnessMap",d.metallicRoughnessTexture))),o=this._invokeOne(function(f){return f.getMaterialType&&f.getMaterialType(e)}),c.push(Promise.all(this._invokeAll(function(f){return f.extendMaterialParams&&f.extendMaterialParams(e,a)})))}s.doubleSided===!0&&(a.side=Wi);const u=s.alphaMode||Vd.OPAQUE;if(u===Vd.BLEND?(a.transparent=!0,a.depthWrite=!1):(a.transparent=!1,u===Vd.MASK&&(a.alphaTest=s.alphaCutoff!==void 0?s.alphaCutoff:.5)),s.normalTexture!==void 0&&o!==oo&&(c.push(t.assignTexture(a,"normalMap",s.normalTexture)),a.normalScale=new Et(1,1),s.normalTexture.scale!==void 0)){const d=s.normalTexture.scale;a.normalScale.set(d,d)}if(s.occlusionTexture!==void 0&&o!==oo&&(c.push(t.assignTexture(a,"aoMap",s.occlusionTexture)),s.occlusionTexture.strength!==void 0&&(a.aoMapIntensity=s.occlusionTexture.strength)),s.emissiveFactor!==void 0&&o!==oo){const d=s.emissiveFactor;a.emissive=new $e().setRGB(d[0],d[1],d[2],Zn)}return s.emissiveTexture!==void 0&&o!==oo&&c.push(t.assignTexture(a,"emissiveMap",s.emissiveTexture,Mn)),Promise.all(c).then(function(){const d=new o(a);return s.name&&(d.name=s.name),gr(d,s),t.associations.set(d,{materials:e}),s.extensions&&js(i,d,s),d})}createUniqueName(e){const t=$t.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){const t=this,n=this.extensions,i=this.primitiveCache;function s(a){return n[Lt.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(a,t).then(function(l){return w0(l,a,t)})}const o=[];for(let a=0,l=e.length;a<l;a++){const c=e[a],u=kE(c),d=i[u];if(d)o.push(d.promise);else{let f;c.extensions&&c.extensions[Lt.KHR_DRACO_MESH_COMPRESSION]?f=s(c):f=w0(new pi,c,t),i[u]={primitive:c,promise:f},o.push(f)}}return Promise.all(o)}loadMesh(e){const t=this,n=this.json,i=this.extensions,s=n.meshes[e],o=s.primitives,a=[];for(let l=0,c=o.length;l<c;l++){const u=o[l].material===void 0?NE(this.cache):this.getDependency("material",o[l].material);a.push(u)}return a.push(t.loadGeometries(o)),Promise.all(a).then(function(l){const c=l.slice(0,l.length-1),u=l[l.length-1],d=[];for(let h=0,_=u.length;h<_;h++){const g=u[h],m=o[h];let p;const b=c[h];if(m.mode===Bi.TRIANGLES||m.mode===Bi.TRIANGLE_STRIP||m.mode===Bi.TRIANGLE_FAN||m.mode===void 0)p=s.isSkinnedMesh===!0?new pb(g,b):new Jn(g,b),p.isSkinnedMesh===!0&&p.normalizeSkinWeights(),m.mode===Bi.TRIANGLE_STRIP?p.geometry=x0(p.geometry,Hg):m.mode===Bi.TRIANGLE_FAN&&(p.geometry=x0(p.geometry,Kf));else if(m.mode===Bi.LINES)p=new yb(g,b);else if(m.mode===Bi.LINE_STRIP)p=new sp(g,b);else if(m.mode===Bi.LINE_LOOP)p=new bb(g,b);else if(m.mode===Bi.POINTS)p=new eh(g,b);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+m.mode);Object.keys(p.geometry.morphAttributes).length>0&&UE(p,s),p.name=t.createUniqueName(s.name||"mesh_"+e),gr(p,s),m.extensions&&js(i,p,m),t.assignFinalMaterial(p),d.push(p)}for(let h=0,_=d.length;h<_;h++)t.associations.set(d[h],{meshes:e,primitives:h});if(d.length===1)return s.extensions&&js(i,d[0],s),d[0];const f=new $r;s.extensions&&js(i,f,s),t.associations.set(f,{meshes:e});for(let h=0,_=d.length;h<_;h++)f.add(d[h]);return f})}loadCamera(e){let t;const n=this.json.cameras[e],i=n[n.type];if(!i){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new li(Hy.radToDeg(i.yfov),i.aspectRatio||1,i.znear||1,i.zfar||2e6):n.type==="orthographic"&&(t=new $u(-i.xmag,i.xmag,i.ymag,-i.ymag,i.znear,i.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),gr(t,n),Promise.resolve(t)}loadSkin(e){const t=this.json.skins[e],n=[];for(let i=0,s=t.joints.length;i<s;i++)n.push(this._loadNodeShallow(t.joints[i]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(i){const s=i.pop(),o=i,a=[],l=[];for(let c=0,u=o.length;c<u;c++){const d=o[c];if(d){a.push(d);const f=new yt;s!==null&&f.fromArray(s.array,c*16),l.push(f)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[c])}return new ip(a,l)})}loadAnimation(e){const t=this.json,n=this,i=t.animations[e],s=i.name?i.name:"animation_"+e,o=[],a=[],l=[],c=[],u=[];for(let d=0,f=i.channels.length;d<f;d++){const h=i.channels[d],_=i.samplers[h.sampler],g=h.target,m=g.node,p=i.parameters!==void 0?i.parameters[_.input]:_.input,b=i.parameters!==void 0?i.parameters[_.output]:_.output;g.node!==void 0&&(o.push(this.getDependency("node",m)),a.push(this.getDependency("accessor",p)),l.push(this.getDependency("accessor",b)),c.push(_),u.push(g))}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(l),Promise.all(c),Promise.all(u)]).then(function(d){const f=d[0],h=d[1],_=d[2],g=d[3],m=d[4],p=[];for(let x=0,v=f.length;x<v;x++){const E=f[x],M=h[x],T=_[x],R=g[x],w=m[x];if(E===void 0)continue;E.updateMatrix&&E.updateMatrix();const y=n._createAnimationTracks(E,M,T,R,w);if(y)for(let D=0;D<y.length;D++)p.push(y[D])}const b=new Pb(s,void 0,p);return gr(b,i),b})}createNodeMesh(e){const t=this.json,n=this,i=t.nodes[e];return i.mesh===void 0?null:n.getDependency("mesh",i.mesh).then(function(s){const o=n._getNodeRef(n.meshCache,i.mesh,s);return i.weights!==void 0&&o.traverse(function(a){if(a.isMesh)for(let l=0,c=i.weights.length;l<c;l++)a.morphTargetInfluences[l]=i.weights[l]}),o})}loadNode(e){const t=this.json,n=this,i=t.nodes[e],s=n._loadNodeShallow(e),o=[],a=i.children||[];for(let c=0,u=a.length;c<u;c++)o.push(n.getDependency("node",a[c]));const l=i.skin===void 0?Promise.resolve(null):n.getDependency("skin",i.skin);return Promise.all([s,Promise.all(o),l]).then(function(c){const u=c[0],d=c[1],f=c[2];f!==null&&u.traverse(function(h){h.isSkinnedMesh&&h.bind(f,zE)});for(let h=0,_=d.length;h<_;h++)u.add(d[h]);return u})}_loadNodeShallow(e){const t=this.json,n=this.extensions,i=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];const s=t.nodes[e],o=s.name?i.createUniqueName(s.name):"",a=[],l=i._invokeOne(function(c){return c.createNodeMesh&&c.createNodeMesh(e)});return l&&a.push(l),s.camera!==void 0&&a.push(i.getDependency("camera",s.camera).then(function(c){return i._getNodeRef(i.cameraCache,s.camera,c)})),i._invokeAll(function(c){return c.createNodeAttachment&&c.createNodeAttachment(e)}).forEach(function(c){a.push(c)}),this.nodeCache[e]=Promise.all(a).then(function(c){let u;if(s.isBone===!0?u=new e_:c.length>1?u=new $r:c.length===1?u=c[0]:u=new un,u!==c[0])for(let d=0,f=c.length;d<f;d++)u.add(c[d]);if(s.name&&(u.userData.name=s.name,u.name=o),gr(u,s),s.extensions&&js(n,u,s),s.matrix!==void 0){const d=new yt;d.fromArray(s.matrix),u.applyMatrix4(d)}else s.translation!==void 0&&u.position.fromArray(s.translation),s.rotation!==void 0&&u.quaternion.fromArray(s.rotation),s.scale!==void 0&&u.scale.fromArray(s.scale);if(!i.associations.has(u))i.associations.set(u,{});else if(s.mesh!==void 0&&i.meshCache.refs[s.mesh]>1){const d=i.associations.get(u);i.associations.set(u,{...d})}return i.associations.get(u).nodes=e,u}),this.nodeCache[e]}loadScene(e){const t=this.extensions,n=this.json.scenes[e],i=this,s=new $r;n.name&&(s.name=i.createUniqueName(n.name)),gr(s,n),n.extensions&&js(t,s,n);const o=n.nodes||[],a=[];for(let l=0,c=o.length;l<c;l++)a.push(i.getDependency("node",o[l]));return Promise.all(a).then(function(l){for(let u=0,d=l.length;u<d;u++)s.add(l[u]);const c=u=>{const d=new Map;for(const[f,h]of i.associations)(f instanceof Ar||f instanceof Rn)&&d.set(f,h);return u.traverse(f=>{const h=i.associations.get(f);h!=null&&d.set(f,h)}),d};return i.associations=c(s),s})}_createAnimationTracks(e,t,n,i,s){const o=[],a=e.name?e.name:e.uuid,l=[];ps[s.path]===ps.weights?e.traverse(function(f){f.morphTargetInfluences&&l.push(f.name?f.name:f.uuid)}):l.push(a);let c;switch(ps[s.path]){case ps.weights:c=Ea;break;case ps.rotation:c=Aa;break;case ps.translation:case ps.scale:c=Ca;break;default:switch(n.itemSize){case 1:c=Ea;break;case 2:case 3:default:c=Ca;break}break}const u=i.interpolation!==void 0?OE[i.interpolation]:Wl,d=this._getArrayFromAccessor(n);for(let f=0,h=l.length;f<h;f++){const _=new c(l[f]+"."+ps[s.path],t.array,d,u);i.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(_),o.push(_)}return o}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){const n=ch(t.constructor),i=new Float32Array(t.length);for(let s=0,o=t.length;s<o;s++)i[s]=t[s]*n;t=i}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){const i=this instanceof Aa?IE:T_;return new i(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}}function HE(r,e,t){const n=e.attributes,i=new lr;if(n.POSITION!==void 0){const a=t.json.accessors[n.POSITION],l=a.min,c=a.max;if(l!==void 0&&c!==void 0){if(i.set(new $(l[0],l[1],l[2]),new $(c[0],c[1],c[2])),a.normalized){const u=ch(ua[a.componentType]);i.min.multiplyScalar(u),i.max.multiplyScalar(u)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;const s=e.targets;if(s!==void 0){const a=new $,l=new $;for(let c=0,u=s.length;c<u;c++){const d=s[c];if(d.POSITION!==void 0){const f=t.json.accessors[d.POSITION],h=f.min,_=f.max;if(h!==void 0&&_!==void 0){if(l.setX(Math.max(Math.abs(h[0]),Math.abs(_[0]))),l.setY(Math.max(Math.abs(h[1]),Math.abs(_[1]))),l.setZ(Math.max(Math.abs(h[2]),Math.abs(_[2]))),f.normalized){const g=ch(ua[f.componentType]);l.multiplyScalar(g)}a.max(l)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}i.expandByVector(a)}r.boundingBox=i;const o=new Ir;i.getCenter(o.center),o.radius=i.min.distanceTo(i.max)/2,r.boundingSphere=o}function w0(r,e,t){const n=e.attributes,i=[];function s(o,a){return t.getDependency("accessor",o).then(function(l){r.setAttribute(a,l)})}for(const o in n){const a=lh[o]||o.toLowerCase();a in r.attributes||i.push(s(n[o],a))}if(e.indices!==void 0&&!r.index){const o=t.getDependency("accessor",e.indices).then(function(a){r.setIndex(a)});i.push(o)}return It.workingColorSpace!==Zn&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${It.workingColorSpace}" not supported.`),gr(r,e),HE(r,e,t),Promise.all(i).then(function(){return e.targets!==void 0?FE(r,e.targets,t):r})}const Gd=new WeakMap;class GE extends Ao{constructor(e){super(e),this.decoderPath="",this.decoderConfig={},this.decoderBinary=null,this.decoderPending=null,this.workerLimit=4,this.workerPool=[],this.workerNextTaskID=1,this.workerSourceURL="",this.defaultAttributeIDs={position:"POSITION",normal:"NORMAL",color:"COLOR",uv:"TEX_COORD"},this.defaultAttributeTypes={position:"Float32Array",normal:"Float32Array",color:"Float32Array",uv:"Float32Array"}}setDecoderPath(e){return this.decoderPath=e,this}setDecoderConfig(e){return this.decoderConfig=e,this}setWorkerLimit(e){return this.workerLimit=e,this}load(e,t,n,i){const s=new Eu(this.manager);s.setPath(this.path),s.setResponseType("arraybuffer"),s.setRequestHeader(this.requestHeader),s.setWithCredentials(this.withCredentials),s.load(e,o=>{this.parse(o,t,i)},n,i)}parse(e,t,n=()=>{}){this.decodeDracoFile(e,t,null,null,Mn,n).catch(n)}decodeDracoFile(e,t,n,i,s=Zn,o=()=>{}){const a={attributeIDs:n||this.defaultAttributeIDs,attributeTypes:i||this.defaultAttributeTypes,useUniqueIDs:!!n,vertexColorSpace:s};return this.decodeGeometry(e,a).then(t).catch(o)}decodeGeometry(e,t){const n=JSON.stringify(t);if(Gd.has(e)){const l=Gd.get(e);if(l.key===n)return l.promise;if(e.byteLength===0)throw new Error("THREE.DRACOLoader: Unable to re-decode a buffer with different settings. Buffer has already been transferred.")}let i;const s=this.workerNextTaskID++,o=e.byteLength,a=this._getWorker(s,o).then(l=>(i=l,new Promise((c,u)=>{i._callbacks[s]={resolve:c,reject:u},i.postMessage({type:"decode",id:s,taskConfig:t,buffer:e},[e])}))).then(l=>this._createGeometry(l.geometry));return a.catch(()=>!0).then(()=>{i&&s&&this._releaseTask(i,s)}),Gd.set(e,{key:n,promise:a}),a}_createGeometry(e){const t=new pi;e.index&&t.setIndex(new Jt(e.index.array,1));for(let n=0;n<e.attributes.length;n++){const{name:i,array:s,itemSize:o,stride:a,vertexColorSpace:l}=e.attributes[n];let c;if(o===a)c=new Jt(s,o);else{const u=new Qg(s,a);c=new Xu(u,o,0)}i==="color"&&(this._assignVertexColorSpace(c,l),c.normalized=!(s instanceof Float32Array)),t.setAttribute(i,c)}return t}_assignVertexColorSpace(e,t){if(t!==Mn)return;const n=new $e;for(let i=0,s=e.count;i<s;i++)n.fromBufferAttribute(e,i),It.colorSpaceToWorking(n,Mn),e.setXYZ(i,n.r,n.g,n.b)}_loadLibrary(e,t){const n=new Eu(this.manager);return n.setPath(this.decoderPath),n.setResponseType(t),n.setWithCredentials(this.withCredentials),new Promise((i,s)=>{n.load(e,i,void 0,s)})}preload(){return this._initDecoder(),this}_initDecoder(){if(this.decoderPending)return this.decoderPending;const e=typeof WebAssembly!="object"||this.decoderConfig.type==="js",t=[];return e?t.push(this._loadLibrary("draco_decoder.js","text")):(t.push(this._loadLibrary("draco_wasm_wrapper.js","text")),t.push(this._loadLibrary("draco_decoder.wasm","arraybuffer"))),this.decoderPending=Promise.all(t).then(n=>{const i=n[0];e||(this.decoderConfig.wasmBinary=n[1]);const s=WE.toString(),o=["/* draco decoder */",i,"","/* worker */",s.substring(s.indexOf("{")+1,s.lastIndexOf("}"))].join(`
`);this.workerSourceURL=URL.createObjectURL(new Blob([o]))}),this.decoderPending}_getWorker(e,t){return this._initDecoder().then(()=>{if(this.workerPool.length<this.workerLimit){const i=new Worker(this.workerSourceURL);i._callbacks={},i._taskCosts={},i._taskLoad=0,i.postMessage({type:"init",decoderConfig:this.decoderConfig}),i.onmessage=function(s){const o=s.data;switch(o.type){case"decode":i._callbacks[o.id].resolve(o);break;case"error":i._callbacks[o.id].reject(o);break;default:console.error('THREE.DRACOLoader: Unexpected message, "'+o.type+'"')}},this.workerPool.push(i)}else this.workerPool.sort(function(i,s){return i._taskLoad>s._taskLoad?-1:1});const n=this.workerPool[this.workerPool.length-1];return n._taskCosts[e]=t,n._taskLoad+=t,n})}_releaseTask(e,t){e._taskLoad-=e._taskCosts[t],delete e._callbacks[t],delete e._taskCosts[t]}debug(){console.log("Task load: ",this.workerPool.map(e=>e._taskLoad))}dispose(){for(let e=0;e<this.workerPool.length;++e)this.workerPool[e].terminate();return this.workerPool.length=0,this.workerSourceURL!==""&&URL.revokeObjectURL(this.workerSourceURL),this}}function WE(){let r,e;onmessage=function(o){const a=o.data;switch(a.type){case"init":r=a.decoderConfig,e=new Promise(function(u){r.onModuleLoaded=function(d){u({draco:d})},DracoDecoderModule(r)});break;case"decode":const l=a.buffer,c=a.taskConfig;e.then(u=>{const d=u.draco,f=new d.Decoder;try{const h=t(d,f,new Int8Array(l),c),_=h.attributes.map(g=>g.array.buffer);h.index&&_.push(h.index.array.buffer),self.postMessage({type:"decode",id:a.id,geometry:h},_)}catch(h){console.error(h),self.postMessage({type:"error",id:a.id,error:h.message})}finally{d.destroy(f)}});break}};function t(o,a,l,c){const u=c.attributeIDs,d=c.attributeTypes;let f,h;const _=a.GetEncodedGeometryType(l);if(_===o.TRIANGULAR_MESH)f=new o.Mesh,h=a.DecodeArrayToMesh(l,l.byteLength,f);else if(_===o.POINT_CLOUD)f=new o.PointCloud,h=a.DecodeArrayToPointCloud(l,l.byteLength,f);else throw new Error("THREE.DRACOLoader: Unexpected geometry type.");if(!h.ok()||f.ptr===0)throw new Error("THREE.DRACOLoader: Decoding failed: "+h.error_msg());const g={index:null,attributes:[]};for(const m in u){const p=self[d[m]];let b,x;if(c.useUniqueIDs)x=u[m],b=a.GetAttributeByUniqueId(f,x);else{if(x=a.GetAttributeId(f,o[u[m]]),x===-1)continue;b=a.GetAttribute(f,x)}const v=i(o,a,f,m,p,b);m==="color"&&(v.vertexColorSpace=c.vertexColorSpace),g.attributes.push(v)}return _===o.TRIANGULAR_MESH&&(g.index=n(o,a,f)),o.destroy(f),g}function n(o,a,l){const u=l.num_faces()*3,d=u*4,f=o._malloc(d);a.GetTrianglesUInt32Array(l,d,f);const h=new Uint32Array(o.HEAPF32.buffer,f,u).slice();return o._free(f),{array:h,itemSize:1}}function i(o,a,l,c,u,d){const f=l.num_points(),h=d.num_components(),_=s(o,u),g=h*u.BYTES_PER_ELEMENT,m=Math.ceil(g/4)*4,p=m/u.BYTES_PER_ELEMENT,b=f*g,x=f*m,v=o._malloc(b);a.GetAttributeDataArrayForAllPoints(l,d,_,b,v);const E=new u(o.HEAPF32.buffer,v,b/u.BYTES_PER_ELEMENT);let M;if(g===m)M=E.slice();else{M=new u(x/u.BYTES_PER_ELEMENT);let T=0;for(let R=0,w=E.length;R<w;R++){for(let y=0;y<h;y++)M[T+y]=E[R*h+y];T+=p}}return o._free(v),{name:c,count:f,itemSize:h,array:M,stride:p}}function s(o,a){switch(a){case Float32Array:return o.DT_FLOAT32;case Int8Array:return o.DT_INT8;case Int16Array:return o.DT_INT16;case Int32Array:return o.DT_INT32;case Uint8Array:return o.DT_UINT8;case Uint16Array:return o.DT_UINT16;case Uint32Array:return o.DT_UINT32}}}const XE="/150-lab/assets/models/globe-hd.glb";class qE{constructor(){this.tier=null,this.metrics={isMobile:!1,isLowEnd:!1,hardwareConcurrency:navigator.hardwareConcurrency||2,deviceMemory:navigator.deviceMemory||4,connectionSpeed:this.getConnectionSpeed(),isAEMEmbedded:this.checkAEMEmbedded(),pixelRatio:window.devicePixelRatio||1,screenSize:window.innerWidth*window.innerHeight,gpuTier:null}}checkAEMEmbedded(){try{if(window.self!==window.top)return!0;const e=window.location.href.toLowerCase();return e.includes("adobeaemcloud.com")||e.includes("aem")}catch{return!0}}getConnectionSpeed(){if(navigator.connection){const t=navigator.connection.effectiveType;return t==="4g"?"fast":t==="3g"?"medium":"slow"}return"fast"}detectMobile(){const e=navigator.userAgent||navigator.vendor||window.opera,t=/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(e),n="ontouchstart"in window||navigator.maxTouchPoints>0,i=window.innerWidth<=768;return t||n&&i}async benchmarkGPU(){return new Promise(e=>{const t=document.createElement("canvas"),n=t.getContext("webgl")||t.getContext("experimental-webgl");if(!n){e("low");return}const i=n.getExtension("WEBGL_debug_renderer_info");let s="unknown";if(i){if(s=n.getParameter(i.UNMASKED_RENDERER_WEBGL).toLowerCase(),["intel hd 3000","intel hd 4000","intel hd graphics","powervr","mali-400","mali-450","adreno 3","adreno 4","swiftshader"].some(m=>s.includes(m))){e("low");return}if(["nvidia","geforce","rtx","gtx","radeon","adreno 6","adreno 7","apple gpu","m1","m2"].some(m=>s.includes(m))){e("high");return}}const o=performance.now(),a=new Float32Array(1e4*3);for(let d=0;d<a.length;d++)a[d]=Math.random();const l=n.createBuffer();n.bindBuffer(n.ARRAY_BUFFER,l),n.bufferData(n.ARRAY_BUFFER,a,n.STATIC_DRAW),n.finish();const u=performance.now()-o;n.deleteBuffer(l),t.remove(),u<5?e("high"):u<15?e("medium"):e("low")})}async detect(){if(this.tier)return this.tier;this.metrics.isMobile=this.detectMobile(),this.metrics.gpuTier=await this.benchmarkGPU();let e=100;return this.metrics.isMobile&&(e-=30),this.metrics.screenSize<800*600?e-=10:this.metrics.screenSize>1920*1080&&(e-=15),this.metrics.hardwareConcurrency<=2?e-=20:this.metrics.hardwareConcurrency>=8&&(e+=10),this.metrics.deviceMemory<=2?e-=30:this.metrics.deviceMemory>=8&&(e+=10),this.metrics.gpuTier==="low"?e-=30:this.metrics.gpuTier==="high"&&(e+=20),this.metrics.connectionSpeed==="slow"&&(e-=20),this.metrics.isAEMEmbedded&&(e-=15),this.metrics.pixelRatio>2&&(e-=10),e>=70?this.tier="high":e>=40?this.tier="medium":this.tier="low",console.log("[Performance Detector] Metrics:",this.metrics),console.log("[Performance Detector] Score:",e),console.log("[Performance Detector] Tier:",this.tier),this.tier}getSettings(){const e=this.tier||"medium";return{high:{particleCount:150,pixelRatio:Math.min(window.devicePixelRatio,2),antialias:!1,shadowsEnabled:!1,shaderQuality:"high",globeQuality:"high",mouseParticles:!0,targetFPS:60,enablePostProcessing:!1,maxLights:3},medium:{particleCount:80,pixelRatio:Math.min(window.devicePixelRatio,1.5),antialias:!1,shadowsEnabled:!1,shaderQuality:"medium",globeQuality:"medium",mouseParticles:!this.metrics.isMobile,targetFPS:45,enablePostProcessing:!1,maxLights:2},low:{particleCount:40,pixelRatio:1,antialias:!1,shadowsEnabled:!1,shaderQuality:"low",globeQuality:"low",mouseParticles:!1,targetFPS:30,enablePostProcessing:!1,maxLights:1}}[e]}isLowEnd(){return this.tier==="low"}isMobile(){return this.metrics.isMobile}isAEMEmbedded(){return this.metrics.isAEMEmbedded}}const Wd=new qE;class YE{constructor(e,t=60){this.animateCallback=e,this.targetFPS=t,this.frameInterval=1e3/t,this.lastFrameTime=0,this.isVisible=!0,this.isRunning=!1,this.rafId=null,this.pausedByTimeline=!1,this.frameCount=0,this.fpsCheckInterval=1e3,this.lastFPSCheck=performance.now(),this.currentFPS=t,this.setupVisibilityObserver(),this.setupPageVisibilityListener()}setupVisibilityObserver(){const e=document.getElementById("shaderBackground");if(!e)return;const t={root:null,rootMargin:"50px",threshold:.1};this.observer=new IntersectionObserver(n=>{n.forEach(i=>{this.isVisible=i.isIntersecting,this.isVisible&&this.isRunning?console.log("[Adaptive Renderer] Canvas visible, resuming rendering"):this.isVisible||console.log("[Adaptive Renderer] Canvas not visible, pausing rendering")})},t),this.observer.observe(e)}setupPageVisibilityListener(){document.addEventListener("visibilitychange",()=>{document.hidden?(console.log("[Adaptive Renderer] Page hidden, pausing rendering"),this.pause()):(console.log("[Adaptive Renderer] Page visible, resuming rendering"),this.resume())})}start(){this.isRunning||(this.isRunning=!0,this.lastFrameTime=performance.now(),this.lastFPSCheck=performance.now(),this.frameCount=0,this.loop())}loop(){if(!this.isRunning)return;this.rafId=requestAnimationFrame(()=>this.loop());const e=performance.now(),t=e-this.lastFrameTime;e-this.lastFPSCheck>=this.fpsCheckInterval&&(this.currentFPS=this.frameCount,this.frameCount=0,this.lastFPSCheck=e,this.currentFPS<this.targetFPS*.8&&console.warn(`[Adaptive Renderer] FPS below target (${this.currentFPS}/${this.targetFPS}), consider reducing quality`)),!(t<this.frameInterval)&&(!this.isVisible||this.pausedByTimeline||document.hidden||(this.lastFrameTime=e-t%this.frameInterval,this.frameCount++,this.animateCallback&&this.animateCallback(t)))}pause(){this.isRunning=!1,this.rafId&&(cancelAnimationFrame(this.rafId),this.rafId=null)}resume(){this.isRunning||this.start()}setPausedByTimeline(e){this.pausedByTimeline=e}setTargetFPS(e){this.targetFPS=e,this.frameInterval=1e3/e}getCurrentFPS(){return this.currentFPS}destroy(){this.pause(),this.observer&&this.observer.disconnect()}}class $E{constructor(){this.metrics={fps:0,frameTime:0,memory:0,drawCalls:0,triangles:0,geometries:0,textures:0},this.frameCount=0,this.lastTime=performance.now(),this.fpsHistory=[],this.maxHistoryLength=60,this.warningThreshold={fps:30,frameTime:33,memory:200},this.onWarning=null,this.lastWarningTime=0,this.warningCooldown=3e4,this.warningHistory=new Map}update(e){const t=performance.now(),n=t-this.lastTime;if(this.frameCount++,n>=1e3){if(this.metrics.fps=Math.round(this.frameCount*1e3/n),this.metrics.frameTime=n/this.frameCount,this.fpsHistory.push(this.metrics.fps),this.fpsHistory.length>this.maxHistoryLength&&this.fpsHistory.shift(),e&&e.info){const i=e.info;this.metrics.drawCalls=i.render.calls,this.metrics.triangles=i.render.triangles,this.metrics.geometries=i.memory.geometries,this.metrics.textures=i.memory.textures}performance.memory&&(this.metrics.memory=Math.round(performance.memory.usedJSHeapSize/1048576)),this.checkWarnings(),this.frameCount=0,this.lastTime=t}}checkWarnings(){const e=performance.now();if(e-this.lastWarningTime<this.warningCooldown)return;const t=[];if(this.metrics.fps<this.warningThreshold.fps&&this.getAverageFPS()<this.warningThreshold.fps&&(!this.warningHistory.has("fps")||e-this.warningHistory.get("fps")>this.warningCooldown)&&(t.push(`Low FPS: ${this.metrics.fps} (avg: ${this.getAverageFPS()})`),this.warningHistory.set("fps",e)),this.metrics.frameTime>this.warningThreshold.frameTime){const n="frameTime";(!this.warningHistory.has(n)||e-this.warningHistory.get(n)>this.warningCooldown)&&(t.push(`High frame time: ${this.metrics.frameTime.toFixed(1)}ms`),this.warningHistory.set(n,e))}if(this.metrics.memory>this.warningThreshold.memory*1.2){const n="memory";(!this.warningHistory.has(n)||e-this.warningHistory.get(n)>this.warningCooldown)&&(t.push(`High memory usage: ${this.metrics.memory}MB (threshold: ${this.warningThreshold.memory}MB)`),this.warningHistory.set(n,e))}t.length>0&&this.onWarning&&(this.lastWarningTime=e,this.onWarning(t))}getAverageFPS(){if(this.fpsHistory.length===0)return 0;const e=this.fpsHistory.reduce((t,n)=>t+n,0);return Math.round(e/this.fpsHistory.length)}getMetrics(){return{...this.metrics}}log(){console.log("[Performance Monitor]",{fps:this.metrics.fps,avgFPS:this.getAverageFPS(),frameTime:`${this.metrics.frameTime.toFixed(1)}ms`,memory:`${this.metrics.memory}MB`,drawCalls:this.metrics.drawCalls,triangles:this.metrics.triangles,geometries:this.metrics.geometries,textures:this.metrics.textures})}createDebugOverlay(){const e=document.createElement("div");return e.id="perf-monitor-overlay",e.style.cssText=`
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
      `},1e3),e}removeDebugOverlay(){const e=document.getElementById("perf-monitor-overlay");e&&e.remove()}setWarningCallback(e){this.onWarning=e}}class jE{constructor(){this.disposables=new Set,this.textures=new Set,this.geometries=new Set,this.materials=new Set}track(e,t="disposable"){if(e)switch(t){case"texture":this.textures.add(e);break;case"geometry":this.geometries.add(e);break;case"material":this.materials.add(e);break;default:this.disposables.add(e)}}dispose(e){if(e)try{e.dispose&&typeof e.dispose=="function"&&e.dispose(),this.disposables.delete(e),this.textures.delete(e),this.geometries.delete(e),this.materials.delete(e)}catch(t){console.warn("[Memory Manager] Error disposing resource:",t)}}disposeAll(){let e=0;return this.textures.forEach(t=>{try{t&&t.dispose&&(t.dispose(),e++)}catch(n){console.warn("[Memory Manager] Error disposing texture:",n)}}),this.textures.clear(),this.geometries.forEach(t=>{try{t&&t.dispose&&(t.dispose(),e++)}catch(n){console.warn("[Memory Manager] Error disposing geometry:",n)}}),this.geometries.clear(),this.materials.forEach(t=>{try{t&&t.dispose&&(t.dispose(),e++)}catch(n){console.warn("[Memory Manager] Error disposing material:",n)}}),this.materials.clear(),this.disposables.forEach(t=>{try{t&&t.dispose&&(t.dispose(),e++)}catch(n){console.warn("[Memory Manager] Error disposing resource:",n)}}),this.disposables.clear(),console.log(`[Memory Manager] Disposed ${e} resources`),e}disposeObject(e){e&&(e.children&&e.children.forEach(t=>this.disposeObject(t)),e.geometry&&this.dispose(e.geometry),e.material&&(Array.isArray(e.material)?e.material.forEach(t=>{this.disposeMaterial(t)}):this.disposeMaterial(e.material)),e.parent&&e.parent.remove(e))}disposeMaterial(e){if(!e)return;["map","lightMap","bumpMap","normalMap","specularMap","envMap","alphaMap","aoMap","displacementMap","emissiveMap","gradientMap","metalnessMap","roughnessMap"].forEach(n=>{e[n]&&this.dispose(e[n])}),this.dispose(e)}getStats(){return{textures:this.textures.size,geometries:this.geometries.size,materials:this.materials.size,disposables:this.disposables.size,total:this.textures.size+this.geometries.size+this.materials.size+this.disposables.size}}forceGC(){try{if(window.gc)window.gc(),console.log("[Memory Manager] Forced garbage collection");else{const e=new Array(1e6);e.fill(0),e.length=0}}catch{}}}const el=new jE;class KE{constructor(){this.isAuthorMode=!1,this.isEditMode=!1,this.isPreviewMode=!1,this.isPublishMode=!0,this.detected=!1}isDevelopmentEnvironment(){const e=window.location.hostname,t=["localhost","127.0.0.1","0.0.0.0",".local","dev.","test.","staging."],n=window.location.port,i=["3000","4200","5173","8080","8000","9000"];return!!(t.some(s=>e.includes(s))||i.includes(n))}detect(){if(this.detected)return this.getMode();if(this.isDevelopmentEnvironment())return console.log("[AEM Mode Detector] Development environment detected - skipping AEM detection"),this.isPublishMode=!0,this.isAuthorMode=!1,this.isEditMode=!1,this.isPreviewMode=!1,this.detected=!0,"publish";const e=window.location.href,t=window.location.pathname,n=window.location.hostname;if(e.includes("wcmmode=disabled"))return console.log("[AEM Mode Detector] wcmmode=disabled detected - using publish mode"),this.isPublishMode=!0,this.isAuthorMode=!1,this.isEditMode=!1,this.isPreviewMode=!1,this.detected=!0,"publish";const i=n.includes("adobeaemcloud.com")||n.includes("aem")||n.includes("author")||n.includes("publish"),s=e.includes("/editor.html/")||t.includes("/editor.html/")||e.includes("/cf#/"),o=e.includes("wcmmode=edit")||e.includes("wcmmode=design"),a=e.includes("wcmmode=preview");(s||o)&&(i||t.includes("/content/"))&&(this.isAuthorMode=!0,this.isPublishMode=!1,this.isEditMode=!0,console.log("[AEM Mode Detector] Edit mode detected via URL")),a&&(i||t.includes("/content/"))&&(this.isAuthorMode=!0,this.isPublishMode=!1,this.isPreviewMode=!0,console.log("[AEM Mode Detector] Preview mode detected via URL")),typeof window.Granite<"u"&&i&&!this.isEditMode&&!this.isPreviewMode&&(this.isAuthorMode=!0,this.isPublishMode=!1,console.log("[AEM Mode Detector] Granite namespace detected (author environment)"));const l=document.querySelector(".aem-AuthorLayer-Edit")||document.body.classList.contains("aem-AuthorLayer-Edit"),c=document.querySelector(".granite-author-layer");l&&(i||s)?(this.isAuthorMode=!0,this.isEditMode=!0,this.isPublishMode=!1,console.log("[AEM Mode Detector] AEM Edit UI elements detected")):c&&i&&!this.isEditMode&&(this.isAuthorMode=!0,this.isPublishMode=!1,console.log("[AEM Mode Detector] AEM Author UI detected (not edit mode)"));const u=document.cookie.split(";");for(let f of u){const[h,_]=f.trim().split("=");if(h==="wcmmode"&&(i||s)){if(_==="disabled"){this.isPublishMode=!0,this.isAuthorMode=!1,this.isEditMode=!1,this.isPreviewMode=!1,console.log("[AEM Mode Detector] wcmmode=disabled cookie - using publish mode");break}else _==="edit"||_==="design"?(this.isAuthorMode=!0,this.isEditMode=!0,this.isPublishMode=!1,console.log("[AEM Mode Detector] wcmmode=edit/design cookie detected")):_==="preview"&&(this.isAuthorMode=!0,this.isPreviewMode=!0,this.isPublishMode=!1,console.log("[AEM Mode Detector] wcmmode=preview cookie detected"));break}}try{if(window.self!==window.top&&!this.isEditMode){const f=document.referrer;(f.includes("/editor.html/")||f.includes("adobeaemcloud.com")&&f.includes("/editor.html/"))&&(this.isAuthorMode=!0,this.isEditMode=!0,this.isPublishMode=!1,console.log("[AEM Mode Detector] AEM Editor iframe detected"))}}catch{this.isEditMode&&i&&console.log("[AEM Mode Detector] Cross-origin iframe in edit context")}this.detected=!0;const d=this.getMode();return console.log("[AEM Mode Detector] Detection complete:",{mode:d,url:e,hostname:n,isAuthorMode:this.isAuthorMode,isEditMode:this.isEditMode,isPreviewMode:this.isPreviewMode,isPublishMode:this.isPublishMode,isDevelopment:this.isDevelopmentEnvironment()}),d}getMode(){return this.isEditMode?"edit":this.isPreviewMode?"preview":this.isAuthorMode?"author":"publish"}shouldUseFallbackMode(){return this.detected||this.detect(),this.isEditMode}shouldUseLimitedMode(){return this.detected||this.detect(),this.isAuthorMode&&!this.isEditMode}isFullFeatureMode(){return this.detected||this.detect(),this.isPublishMode}getSettings(){return this.detected||this.detect(),this.shouldUseFallbackMode()?{mode:"fallback",enableBackground:!1,enableAnimations:!1,enableVideo:!1,enableParticles:!1,enableMouseParticles:!1,enableAudio:!1,enableScrollEffects:!1,showStaticBackground:!0,showPlaceholderMessage:!0}:this.shouldUseLimitedMode()?{mode:"limited",enableBackground:!0,enableAnimations:!0,enableVideo:!0,enableParticles:!0,enableMouseParticles:!0,enableAudio:!1,enableScrollEffects:!0,showStaticBackground:!1,showPlaceholderMessage:!1}:{mode:"full",enableBackground:!0,enableAnimations:!0,enableVideo:!0,enableParticles:!0,enableMouseParticles:!0,enableAudio:!0,enableScrollEffects:!0,showStaticBackground:!1,showPlaceholderMessage:!1}}applyStaticBackground(){const e=document.body,t=document.getElementById("shaderBackground");t&&(t.style.display="none"),e.style.background="linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #1a1a2e 100%)",e.style.backgroundAttachment="fixed",console.log("[AEM Mode] Applied static background")}showPlaceholderMessage(){if(document.getElementById("aem-edit-mode-message"))return;const e=document.createElement("div");e.id="aem-edit-mode-message",e.style.cssText=`
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
    `,document.body.appendChild(e),console.log("[AEM Mode] Showing edit mode message")}}const xs=new KE;function ZE(r,e){if(window.PRELOADED_ASSETS&&window.PRELOADED_ASSETS[r]){const t=window.PRELOADED_ASSETS[r];if(t instanceof ArrayBuffer){const n=new Blob([t]);return URL.createObjectURL(n)}}return e}async function E_(){if(window.shaderBackgroundInitialized){console.warn("Shader background already initialized. Skipping...");return}const r=xs.detect(),e=xs.getSettings();if(e.mode==="fallback"||!e.enableBackground){console.log("[Background Init] Skipping initialization - AEM fallback mode detected"),console.log("[Background Init] AEM Mode:",r),xs.applyStaticBackground(),window.shaderBackgroundInitialized=!0;return}const t=await Wd.detect(),n=Wd.getSettings();console.log("[Background Init] AEM Mode:",r),console.log("[Background Init] Performance Tier:",t),console.log("[Background Init] Settings:",n),window.colorPhase=1,window.specialColorsActive=!1,window.particlesFullyHidden=!1,window.particlesMovementPaused=!1;let i=Date.now();const s=6e9;function o(){const S=document.querySelector("#events");if(!S)return!0;const B=S.getBoundingClientRect(),re=window.innerHeight*1.2;return B.top>re}const a=document.getElementById("shaderBackground");if(!a)return;function l(){try{const S=document.createElement("canvas");return!!(S.getContext("webgl")||S.getContext("experimental-webgl"))}catch{return!1}}if(!l()){console.warn("WebGL is not supported on this device/browser. Skipping shader background initialization."),a.style.display="none",document.body.style.backgroundColor="#1a1a2e";return}window.specialColorsActive=!1,window.colorPhase=0,setTimeout(()=>{typeof window.gsap<"u"?c(window.gsap,window.gsap.ScrollTrigger):console.warn("GSAP not found on window object - ScrollTrigger animations may not work")},200);function c(S,B){let H,re,pe,ue,ct,Je,mt,ht;if(!document.querySelector("#video-travel-area")){console.warn("Could not find #video-travel-area element for shader animation");return}if(P&&P.color1&&P.color2&&(H=P.color1.value.clone(),re=P.color2.value.clone(),pe=P.waveSpeed.value,ue=P.waveAmplitude.value,ct=P.waveFrequency.value,Je=P.ambientLight.value,mt=P.directionalLight.value,ht=P.yOffset.value),S.timeline({scrollTrigger:{trigger:"#video-travel-area",start:"top 135%",end:"top 20%",scrub:!0,markers:!1,onUpdate:vn=>{P&&P.colorDarkness&&(P.colorDarkness.value=vn.progress*2,P.colorDarkness.value>=1.95?window.colorPhase===1?(P.color1&&P.color1.value.set(H),P.color2&&P.color2.value.set(re),window.specialColorsActive=!0):window.colorPhase===0&&(P.color1&&P.color1.value.set("#e2e2e2"),P.color2&&P.color2.value.set("#515151"),window.specialColorsActive=!0):H&&re&&(window.colorPhase===1?(P.color1&&P.color1.value.copy(H),P.color2&&P.color2.value.copy(re),window.specialColorsActive=!1):window.colorPhase===0&&(P.color1&&P.color1.value.set("#e2e2e2"),P.color2&&P.color2.value.set("#515151"),window.specialColorsActive=!1)),d())}}}),setTimeout(()=>{u(S)},100),!document.querySelector("#get-involved")){console.warn("Could not find #get-involved element for globe opacity animation");return}S.timeline({scrollTrigger:{trigger:"#get-involved",start:"top bottom",end:"#get-involved-earth center center",scrub:!0,markers:!1,onUpdate:vn=>{const ut=vn.progress;F&&(ut>.01&&!F.visible?(F.visible=!0,k.visible=!0,_()):ut<=.01&&F.visible&&(F.visible=!1,k.visible=!1,_()),F.visible&&(F.traverse(tn=>{tn.isMesh&&tn.material&&(tn.material.transparent=!0,tn.material.opacity=ut)}),k.opacity=ut,h())),D&&(ut>.01&&!D.visible?(D.visible=!0,N.enabled=!0,g()):ut<=.01&&D.visible&&(D.visible=!1,N.enabled=!1,g()),y&&y.uniforms&&(ut>.01&&D.visible?(y.uniforms.startOpacity.value=N.startOpacity*ut,y.uniforms.endOpacity.value=N.endOpacity*ut):(y.uniforms.startOpacity.value=0,y.uniforms.endOpacity.value=0)))}}}),S.timeline({scrollTrigger:{trigger:"#get-involved",start:"top 90%",end:"bottom top",scrub:.5,markers:!1,onUpdate:vn=>{const ut=vn.progress,tn=.15;if(!window.particlesFullyHidden&&ut>=tn?(window.particlesFullyHidden=!0,window.particlesMovementPaused=!0):window.particlesFullyHidden&&ut<tn*.8&&(window.particlesFullyHidden=!1,window.particlesMovementPaused=!1),window.particlesFullyHidden){we&&we.uniforms&&we.uniforms.opacity&&(we.uniforms.opacity.value=0,Do());return}const Bn=1-Math.min(ut/tn,1),ss=.5*Math.pow(Bn,3);we&&we.uniforms&&we.uniforms.opacity&&(we.uniforms.opacity.value=ss,Do())}}}),S.timeline({scrollTrigger:{trigger:"#get-involved-earth",start:"top bottom",end:"bottom top",scrub:.3,markers:!1,onUpdate:vn=>{const ut=vn.progress;if(w){const Si=-322+120*(1-Math.pow(1-ut,3));if(w.position.y=Si,K&&K.__folders["Globe Model Controls"]){const rs=K.__folders["Globe Model Controls"].__folders.Position;if(rs&&rs.__controllers){for(let ss of rs.__controllers)if(ss.property==="positionY"){ss.updateDisplay();break}}}}}}}),S.timeline({scrollTrigger:{trigger:"#hero-travel-area",start:"top bottom",end:"top top",scrub:!0,markers:!1,onUpdate:vn=>{if(!P||!P.color1||!P.color2)return;const ut=vn.progress,tn=new $e("#e2e2e2"),yn=new $e("#515151"),Bn=new $e("#32c2d6"),Si=new $e("#004199"),rs=tn.clone().lerp(Bn,ut),ss=yn.clone().lerp(Si,ut);P.color1.value.copy(rs),P.color2.value.copy(ss),ut>.9?window.colorPhase=1:ut<.1?window.colorPhase=0:window.colorPhase=.5,window.specialColorsActive=!0,f(),Vr();const os=document.querySelector("#cover-area-overlay");if(os){const Io=1-ut,cc=1+ut*1.2;os.style.opacity=Io,os.style.filter=`saturate(${cc})`}}}}),S.timeline({scrollTrigger:{trigger:"#hero-travel-area",start:"top top",end:"bottom bottom",scrub:!0,markers:!1,onUpdate:vn=>{if(!P||!P.color1||!P.color2)return;const ut=vn.progress,tn=new $e("#32c2d6"),yn=new $e("#004199"),Bn=new $e("#B225B1"),Si=new $e("#FCC72D"),rs=new $e("#DA281C"),ss=new $e("#FCC72D");let os,Io;if(ut<=.4)os=tn.clone();else if(ut<=.8){const pr=(ut-.4)/.4;os=tn.clone().lerp(Bn,pr)}else{const pr=(ut-.8)/.2;os=Bn.clone().lerp(rs,pr)}if(ut<=.6)Io=yn.clone();else if(ut<=.8){const pr=(ut-.6)/.20000000000000007;Io=yn.clone().lerp(Si,pr)}else{const pr=(ut-.8)/.2;Io=Si.clone().lerp(ss,pr)}P.color1.value.copy(os),P.color2.value.copy(Io);const cc=document.getElementById("shaderBackground");cc&&(cc.style.filter="hue-rotate(0deg)"),ut>.9?window.colorPhase=2:ut<.1?window.colorPhase=1:window.colorPhase=1.5,i=Date.now(),window.specialColorsActive=!0;const rd=document.querySelector("#cover-area-overlay");if(rd){let pr=0;if(ut>=.3){const Sv=(ut-.3)/.7;pr=Math.min(.5,Sv*.5)}const wv=1+ut*1.2;rd.style.opacity=pr,rd.style.filter=`saturate(${wv})`}f(),Vr()}}}),S.timeline({scrollTrigger:{trigger:"#video-travel-area",start:"top top",end:"bottom top",scrub:!1,markers:!1,onEnter:()=>{P&&P.color1&&P.color2&&(P.color1.value.set("#DA281C"),P.color2.value.set("#FCC72D"),window.colorPhase=2,window.specialColorsActive=!0,f())},onLeaveBack:()=>{}}}),S.timeline({scrollTrigger:{trigger:"#video-travel-area",start:"top bottom",end:"top 66.67%",scrub:!0,markers:!1,onUpdate:vn=>{const ut=vn.progress,tn=document.querySelector("#cover-area-overlay");if(tn){const yn=.5-ut*.5;tn.style.opacity=yn,tn.style.filter="saturate(2.2)"}}}}),S.timeline({scrollTrigger:{trigger:"#get-involved-cards",start:"top 50%",end:"top -10%",scrub:!0,markers:!1,onUpdate:vn=>{if(!P||!P.color1||!P.color2)return;const ut=vn.progress;if(ut>.1)P.color1.value.set("#dcfff6"),P.color2.value.set("#5dff9d"),P.yOffset&&(P.yOffset.value=-.05),P.ambientLight.value=.4,P.directionalLight.value=.4,P.waveAmplitude.value=1.2,P.waveFrequency.value=2.2,window.colorPhase=3,window.specialColorsActive=!0,f(),Ks(),Vr();else if(ut<=.1&&window.colorPhase===3){const tn=P.time.value+P.colorCycleOffset.value;P.colorCycleOffset.value=tn,P.time.value=0,P.color1.value.set("#DA281C"),P.color2.value.set("#FCC72D"),P.yOffset&&ht!==void 0&&(P.yOffset.value=ht),Je!==void 0&&(P.ambientLight.value=Je),mt!==void 0&&(P.directionalLight.value=mt),P.waveSpeed.value=1,ue!==void 0&&(P.waveAmplitude.value=ue),ct!==void 0&&(P.waveFrequency.value=ct),window.colorPhase=2,i=Date.now(),window.specialColorsActive=!0,f(),Ks(),Vr()}d()}}}),S.timeline({scrollTrigger:{trigger:"#get-involved-cards",start:"top 50%",end:"top -10%",scrub:1,markers:!1,onUpdate:vn=>{const tn=1-vn.progress,yn=Math.pow(tn,3);F&&(F.visible=!0,F.traverse(Bn=>{Bn.isMesh&&Bn.material&&(Array.isArray(Bn.material)?Bn.material.forEach(Si=>{Si.transparent=!0,Si.opacity=yn,Si.depthWrite=yn>.1,Si.blending=As,Si.needsUpdate=!0}):(Bn.material.transparent=!0,Bn.material.opacity=yn,Bn.material.depthWrite=yn>.1,Bn.material.blending=As,Bn.material.needsUpdate=!0))}),yn<.01&&(F.visible=!1),k.opacity=yn,k.rotationPaused=yn<.01,h()),D&&y&&y.uniforms&&(D.visible=yn>.01,y.uniforms.startOpacity.value=N.startOpacity*yn,y.uniforms.endOpacity.value=N.endOpacity*yn,N.enabled=yn>.01,g())}}}),S.timeline({scrollTrigger:{trigger:"#get-involved",start:"bottom bottom",end:"top top",scrub:!0,markers:!1,onUpdate:vn=>{vn.progress<=.1&&pe!==void 0&&window.colorPhase===1&&(P.waveSpeed&&(P.waveSpeed.value=pe),P.waveAmplitude&&(P.waveAmplitude.value=ue),P.waveFrequency&&(P.waveFrequency.value=ct),P.yOffset&&(P.yOffset.value=ht),Ks(),Vr())}}});function Do(vn){if(typeof K<"u"&&K&&K.__folders&&K.__folders["Particle System"]){const ut=K.__folders["Particle System"];if(ut&&ut.__controllers){for(let tn of ut.__controllers)if(tn.property==="value"&&tn.object===we.uniforms.opacity){tn.updateDisplay();break}}}}}function u(S,B,H,re){if(!document.querySelector("#events")){document.addEventListener("DOMContentLoaded",()=>{u(S)});return}S.timeline({scrollTrigger:{trigger:"#events",start:"top 110%",end:"top 50%",scrub:!0,markers:!1,onUpdate:ue=>{P&&P.colorDarkness&&(P.colorDarkness.value=2-ue.progress*2,window.colorPhase===3?(P.color1&&P.color1.value.set("#dcfff6"),P.color2&&P.color2.value.set("#5dff9d"),P.ambientLight&&(P.ambientLight.value=.4),P.directionalLight&&(P.directionalLight.value=.4),P.waveSpeed&&(P.waveSpeed.value=.9),P.waveAmplitude&&(P.waveAmplitude.value=1.2),window.specialColorsActive=!0,f(),Ks(),Vr()):window.colorPhase===2?(P.color1&&P.color1.value.set("#da281c"),P.color2&&P.color2.value.set("#FCC72D"),window.specialColorsActive=!0,f(),Ks(),Vr()):window.colorPhase===1?(P.color1&&P.color1.value.set("#32c2d6"),P.color2&&P.color2.value.set("#004199"),window.specialColorsActive=!0,f(),Ks(),Vr()):(P.color1&&P.color1.value.set("#e2e2e2"),P.color2&&P.color2.value.set("#515151"),window.specialColorsActive=!0,f(),Ks(),Vr()),d())}}})}function d(){const S=window.gui,B=window.uniforms;if(typeof S<"u"&&S&&S.__folders&&S.__folders["Color Controls"]){const H=S.__folders["Color Controls"];if(H&&H.__controllers){for(let re of H.__controllers)if(re.property==="value"&&re.object===B.colorDarkness){re.updateDisplay();break}}}}function f(){const S=window.gui,B=window.uniforms;if(typeof S<"u"&&S&&S.__folders&&S.__folders["Color Controls"]){const H=S.__folders["Color Controls"];H&&H.__controllers&&H.__controllers.forEach(re=>{if(re.property==="color"&&re.__color){if(re.property==="color"&&re.__li&&re.__li.querySelector(".property-name").textContent==="Color 1"){const ue="#"+B.color1.value.getHexString();re.setValue(ue)}else if(re.property==="color"&&re.__li&&re.__li.querySelector(".property-name").textContent==="Color 2"){const ue="#"+B.color2.value.getHexString();re.setValue(ue)}}})}}function h(){if(typeof K<"u"&&K&&K.__folders&&K.__folders["Globe Model Controls"]&&K.__folders["Globe Model Controls"].__folders&&K.__folders["Globe Model Controls"].__folders.Material){const S=K.__folders["Globe Model Controls"].__folders.Material;if(S&&S.__controllers)for(let B of S.__controllers)B.property==="opacity"&&B.updateDisplay()}}function _(){if(typeof K<"u"&&K&&K.__folders&&K.__folders["Globe Model Controls"]){const S=K.__folders["Globe Model Controls"];if(S&&S.__controllers){for(let B of S.__controllers)if(B.property==="visible"){B.updateDisplay();break}}}}function g(){if(typeof K<"u"&&K&&K.__folders&&K.__folders["Gradient Overlay Controls"]){const S=K.__folders["Gradient Overlay Controls"];if(S&&S.__controllers){for(let B of S.__controllers)if(B.property==="enabled"){B.updateDisplay();break}}}}function m(){return Math.max(window.innerHeight,document.documentElement.clientHeight)}const p=window.innerWidth,b=m();a.style.position="fixed",a.style.top="0",a.style.left="0",a.style.width="100vw",a.style.height="100svh",a.style.zIndex="-1",a.style.transform="translateZ(0)",a.style.transformStyle="preserve-3d",a.style.willChange="transform";let x;try{x=new g_({canvas:a,alpha:!0,antialias:n.antialias,powerPreference:t==="high"?"high-performance":"default",failIfMajorPerformanceCaveat:!1}),x.setSize(p,b),x.setPixelRatio(n.pixelRatio),console.log("[Background Init] Renderer pixel ratio:",n.pixelRatio)}catch(S){console.error("Failed to create WebGL renderer:",S),console.warn("Falling back to fallback background. WebGL initialization failed."),a.style.display="none",document.body.style.backgroundColor="#1a1a2e",document.body.style.background="linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #1a1a2e 100%)";return}window.shaderBackgroundInitialized=!0,window.addEventListener("beforeunload",S=>{if(window._isMailtoOperation||window._preventBackgroundCleanup){console.log("[Background] Skipping cleanup for mailto/non-navigation action");return}console.log("[Background] Cleaning up resources before page unload"),window.shaderBackgroundRenderer&&window.shaderBackgroundRenderer.pause();const B=el.disposeAll();console.log(`[Background] Disposed ${B} Three.js resources`),x&&(x.dispose(),x.forceContextLoss()),el.forceGC()}),a.addEventListener("webglcontextlost",function(S){console.warn("WebGL context lost. Attempting to restore..."),S.preventDefault(),window.shaderBackgroundInitialized=!1}),a.addEventListener("webglcontextrestored",function(){setTimeout(()=>{if(!window.shaderBackgroundReinitializing){window.shaderBackgroundReinitializing=!0;try{E_()}catch(S){console.error("Failed to reinitialize shader background after context restore:",S)}finally{window.shaderBackgroundReinitializing=!1}}},100)});const v=new Su,E=new Su;let M=0;const T={zoom:2.471,zPosition:1},R=new $u(-window.innerWidth/2,window.innerWidth/2,window.innerHeight/2,-window.innerHeight/2,-1e3,1e3);R.position.z=T.zPosition,R.zoom=T.zoom,R.updateProjectionMatrix();const w=new $r;w.position.y=-322,w.frustumCulled=!0,v.add(w);let y,D;const N={enabled:!1,startOpacity:0,endOpacity:1,offsetY:.22,height:3,color:"#000000",yOffset:-.03};function V(){y=new fi({transparent:!0,uniforms:{startOpacity:{value:N.startOpacity},endOpacity:{value:N.endOpacity},overlayColor:{value:new $e(N.color)},offsetY:{value:N.offsetY},heightMultiplier:{value:N.height}},vertexShader:`
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
      `,depthTest:!1,depthWrite:!1,side:Wi});const S=window.innerHeight,B=R.right-R.left,H=R.top-R.bottom,re=S*.66*(H/S),pe=new Vi(B,re);D=new Jn(pe,y),D.rotation.set(0,0,0),D.position.x=0,D.position.y=N.yOffset*H,D.position.z=-100,D.frustumCulled=!1,D.renderOrder=9999,D.visible=N.enabled,v.add(D)}function j(){if(!D)return;D.rotation.set(0,0,0),D.position.x=0;const S=R.top-R.bottom;D.position.y=N.yOffset*S,D.position.z=-100}V();const k={visible:!1,scale:25,positionX:0,positionY:-280,positionZ:0,rotationX:0,rotationY:0,rotationZ:0,autoRotate:!0,autoRotateSpeed:.05,baseRotateSpeed:.05,scrollRotateSpeed:.075,responsive:!0,baseScale:25,opacity:0,rotationPaused:!1},G=new lE,Y=new GE;Y.setDecoderPath("https://www.gstatic.com/draco/versioned/decoders/1.5.6/"),Y.setDecoderConfig({type:"js"}),G.setDRACOLoader(Y);let F;const ae=t==="low"||Wd.isAEMEmbedded(),O=S=>{F=S.scene;let H=new lr().setFromObject(F).getCenter(new $),re=new $r;re.add(F),F.position.set(-H.x,-H.y,-H.z),F=re,F.visible=k.visible,F.frustumCulled=!0,F.traverse(ct=>{ct.isMesh&&(ct.frustumCulled=!0)}),w.add(F),F.position.set(k.positionX,k.positionY,k.positionZ),F.rotation.set(k.rotationX*Math.PI/180,k.rotationY*Math.PI/180,k.rotationZ*Math.PI/180),k.responsive?se():(F.scale.set(k.scale,k.scale,k.scale),oe());const pe=Fe.addFolder("Material");let ue=0;F.traverse(ct=>{if(ct.isMesh&&ct.material){const Je=ct.material;if(ue++,Je.isMeshStandardMaterial||Je.isMeshPhongMaterial){Je.metalness!==void 0&&pe.add({metalness:Je.metalness},"metalness",0,1).name(`Metalness${ue>1?" "+ue:""}`).onChange(ht=>{Je.metalness=ht}),Je.roughness!==void 0&&pe.add({roughness:Je.roughness},"roughness",0,1).name(`Roughness${ue>1?" "+ue:""}`).onChange(ht=>{Je.roughness=ht}),Je.shininess!==void 0&&pe.add({shininess:Je.shininess},"shininess",0,100).name(`Shininess${ue>1?" "+ue:""}`).onChange(ht=>{Je.shininess=ht}),pe.add({opacity:Je.opacity},"opacity",0,1).name(`Opacity${ue>1?" "+ue:""}`).onChange(ht=>{Je.opacity=ht,Je.transparent=ht<1});const mt=Je.emissive?"#"+Je.emissive.getHexString():"#000000";pe.addColor({color:mt},"color").name(`Emissive Color${ue>1?" "+ue:""}`).onChange(ht=>{Je.emissive&&Je.emissive.set(ht)})}}})},he=()=>{const S=ZE("globe-hd.glb",XE);console.log("[Background Init] Loading globe model..."),G.load(S,O,B=>{if(B.lengthComputable){const H=B.loaded/B.total*100;H%25===0&&console.log(`[Background Init] Globe loading: ${H.toFixed(0)}%`)}},B=>{console.error("Error loading globe model:",B)})};ae?(console.log("[Background Init] Deferring globe model load for performance"),"requestIdleCallback"in window?requestIdleCallback(()=>he(),{timeout:2e3}):setTimeout(()=>he(),1e3)):he(),window.uniforms={time:{value:0},resolution:{value:new Et(window.innerWidth,window.innerHeight)},mainSpeed:{value:12e-5},waveSpeed:{value:1},noiseSpeed:{value:.45},colorCycleSpeed:{value:2},colorCycleOffset:{value:0},color1:{value:new $e("#e2e2e2")},color2:{value:new $e("#515151")},colorDarkness:{value:0},colorWaveInfluence:{value:0},colorFrequencyShift:{value:0},colorAmplitudeEffect:{value:0},waveAmplitude:{value:.8},waveFrequency:{value:4},waveDepth:{value:.6},flowDirection:{value:new Et(-.7,.82)},noiseScale:{value:2.5},noiseInfluence:{value:0},layerOffset:{value:.4},yOffset:{value:.29},topEdgeSoftness:{value:1},bottomEdgeSoftness:{value:1},leftEdgeSoftness:{value:.2},rightEdgeSoftness:{value:.5},fadeWidth:{value:1},leftCornerRoundness:{value:.8},rightCornerRoundness:{value:1},edgeNoiseAmount:{value:.12},edgeNoiseScale:{value:3},edgeDepth:{value:.9},edgeContrast:{value:2},bottomWaveEnabled:{value:!0},bottomWaveDepth:{value:.117},bottomWaveWidth:{value:6.475},bottomWaveSpeed:{value:0},bottomWaveOffset:{value:-2.207},filmNoiseIntensity:{value:.088},filmNoiseSpeed:{value:1e-5},filmGrainSize:{value:10},filmScratchIntensity:{value:0},lightDirection:{value:new $(.5,.5,1).normalize()},ambientLight:{value:.6},directionalLight:{value:.6},specularStrength:{value:0},shininess:{value:128},displacementStrength:{value:0},displacementScale:{value:1e-4},displacementDepth:{value:0},xOffset:{value:-.104}};const P=window.uniforms,Me=`
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
  `,Ne=`
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
  `,ze=new Vi(window.innerWidth,window.innerHeight,window.innerWidth/10,window.innerHeight/10),te=new fi({vertexShader:Me,fragmentShader:Ne,uniforms:P,transparent:!0,side:Wi}),ie=new Jn(ze,te);v.add(ie),window.gui=new aE({width:300,closed:!0});const K=window.gui;K.domElement.style.position="absolute",K.domElement.style.top="10px",K.domElement.style.right="10px";const Ue=K.domElement.querySelector(".close-button");Ue&&(Ue.innerHTML="Open Controls",Ue.addEventListener("click",function(){setTimeout(()=>{this.innerHTML=K.closed?"Open Controls":"Close Controls"},50)}));const be=K.addFolder("Camera Controls");be.add(T,"zoom",.1,5).name("Zoom Level").step(.001).onChange(S=>{R.zoom=S,R.updateProjectionMatrix()}),be.close();const je=K.addFolder("Animation Speed Controls");je.add(P.mainSpeed,"value",1e-4,.1).name("Main Speed").step(1e-4).onChange(S=>{P.mainSpeed.value=S}),je.add(P.waveSpeed,"value",1e-4,5).name("Wave Speed").step(1e-4).onChange(S=>{P.waveSpeed.value=S}),je.add(P.noiseSpeed,"value",1e-4,5).name("Noise Speed").step(1e-4).onChange(S=>{P.noiseSpeed.value=S}),je.add(P.colorCycleSpeed,"value",1e-6,5).name("Color Cycle Speed").step(1e-6).onChange(S=>{P.colorCycleSpeed.value=S}),je.add(P.colorCycleOffset,"value",0,6.28).name("Color Cycle Offset").step(.01).onChange(S=>{P.colorCycleOffset.value=S}),je.open();const pt=K.addFolder("Color Controls"),Te="#"+P.color1.value.getHexString(),tt="#"+P.color2.value.getHexString();pt.addColor({color:Te},"color").name("Color 1").onChange(S=>{typeof S=="string"?P.color1.value.set(S):P.color1.value.setRGB(S.r/255,S.g/255,S.b/255)}),pt.addColor({color:tt},"color").name("Color 2").onChange(S=>{typeof S=="string"?P.color2.value.set(S):P.color2.value.setRGB(S.r/255,S.g/255,S.b/255)}),pt.add(P.colorDarkness,"value",0,2).name("Color Darkness").step(.001).onChange(S=>{P.colorDarkness.value=S}),pt.add(P.colorWaveInfluence,"value",0,1).name("Color → Wave Influence").onChange(S=>{P.colorWaveInfluence.value=S}),pt.add(P.colorFrequencyShift,"value",0,1).name("Color → Frequency Effect").onChange(S=>{P.colorFrequencyShift.value=S}),pt.add(P.colorAmplitudeEffect,"value",0,1).name("Color → Amplitude Effect").onChange(S=>{P.colorAmplitudeEffect.value=S}),pt.open();const U=K.addFolder("Wave Controls");U.add(P.waveAmplitude,"value",0,12).step(1e-4).name("Wave Amplitude").onChange(S=>{P.waveAmplitude.value=S}),U.add(P.waveFrequency,"value",.1,5).name("Wave Frequency").onChange(S=>{P.waveFrequency.value=S}),U.add(P.waveDepth,"value",0,1).name("Wave Depth Effect").onChange(S=>{P.waveDepth.value=S}),U.add(P.noiseScale,"value",0,5).name("Noise Scale").onChange(S=>{P.noiseScale.value=S}),U.add(P.noiseInfluence,"value",0,1).name("Noise Influence").onChange(S=>{P.noiseInfluence.value=S}),U.add(P.layerOffset,"value",0,1).name("Layer Depth Offset").onChange(S=>{P.layerOffset.value=S});const ot=U.addFolder("Flow Direction");ot.add(P.flowDirection.value,"x",-2,2).name("Horizontal Flow").onChange(S=>{P.flowDirection.value.x=S}),ot.add(P.flowDirection.value,"y",-2,2).name("Vertical Flow").onChange(S=>{P.flowDirection.value.y=S});const X=K.addFolder("Appearance Controls"),ft=K.addFolder("Film Noise Controls");ft.add(P.filmNoiseIntensity,"value",0,1).name("Noise Intensity").onChange(S=>{P.filmNoiseIntensity.value=S}),ft.add(P.filmNoiseSpeed,"value",1e-5,5e-5).name("Noise Speed").step(1e-5).onChange(S=>{P.filmNoiseSpeed.value=S}),ft.add(P.filmGrainSize,"value",.5,50).name("Grain Size").onChange(S=>{P.filmGrainSize.value=S}),ft.add(P.filmScratchIntensity,"value",0,.1).name("Scratch Intensity").onChange(S=>{P.filmScratchIntensity.value=S}),X.add(P.xOffset,"value",-1,1).step(.001).name("X Position").onChange(S=>{P.xOffset.value=S}),X.add(P.yOffset,"value",-1,1).step(.001).name("Y Position").onChange(S=>{P.yOffset.value=S}),X.add(P.fadeWidth,"value",.1,1).name("Visible Area Size").onChange(S=>{P.fadeWidth.value=S}),X.add(P.topEdgeSoftness,"value",0,1).name("Top Edge Softness").onChange(S=>{P.topEdgeSoftness.value=S}),X.add(P.bottomEdgeSoftness,"value",0,1).name("Bottom Edge Softness").onChange(S=>{P.bottomEdgeSoftness.value=S}),X.add(P.leftEdgeSoftness,"value",0,1).name("Left Edge Softness").onChange(S=>{P.leftEdgeSoftness.value=S}),X.add(P.rightEdgeSoftness,"value",0,1).name("Right Edge Softness").onChange(S=>{P.rightEdgeSoftness.value=S}),X.add(P.leftCornerRoundness,"value",0,1).name("Left Corner Roundness").onChange(S=>{P.leftCornerRoundness.value=S}),X.add(P.rightCornerRoundness,"value",0,1).name("Right Corner Roundness").onChange(S=>{P.rightCornerRoundness.value=S}),X.add(P.edgeDepth,"value",.1,3).name("Edge Burn-in Depth").onChange(S=>{P.edgeDepth.value=S}),X.add(P.edgeContrast,"value",.5,3).name("Edge Contrast").onChange(S=>{P.edgeContrast.value=S}),X.add(P.edgeNoiseAmount,"value",0,1).name("Edge Noise Amount").onChange(S=>{P.edgeNoiseAmount.value=S}),X.add(P.edgeNoiseScale,"value",.5,10).name("Edge Noise Scale").onChange(S=>{P.edgeNoiseScale.value=S});const Le=K.addFolder("Bottom Wave Edge Controls");Le.add(P.bottomWaveEnabled,"value").name("Enable Bottom Wave").onChange(S=>{P.bottomWaveEnabled.value=S,F&&k.responsive&&oe()}),Le.add(P.bottomWaveDepth,"value",0,.5).name("Wave Depth").step(.001).onChange(S=>{P.bottomWaveDepth.value=S,F&&k.responsive&&oe()}),Le.add(P.bottomWaveWidth,"value",1,20).name("Wave Width").step(.001).onChange(S=>{P.bottomWaveWidth.value=S}),Le.add(P.bottomWaveSpeed,"value",0,5).name("Wave Speed").step(.001).onChange(S=>{P.bottomWaveSpeed.value=S}),Le.add(P.bottomWaveOffset,"value",-5,5).name("Wave Offset").step(.001).onChange(S=>{P.bottomWaveOffset.value=S});const wt=K.addFolder("Lighting Controls");wt.add(P.ambientLight,"value",0,1).name("Ambient Light").onChange(S=>{P.ambientLight.value=S}),wt.add(P.directionalLight,"value",0,1).name("Directional Light").step(.001).onChange(S=>{P.directionalLight.value=S}),wt.add(P.specularStrength,"value",0,1).step(.001).name("Specular Strength").onChange(S=>{P.specularStrength.value=S}),wt.add(P.shininess,"value",1,128).name("Shininess").onChange(S=>{P.shininess.value=S});const Re=wt.addFolder("Light Direction");Re.add(P.lightDirection.value,"x",-1,1).name("X").onChange(()=>{P.lightDirection.value.normalize()}),Re.add(P.lightDirection.value,"y",-1,1).name("Y").onChange(()=>{P.lightDirection.value.normalize()}),Re.add(P.lightDirection.value,"z",0,1).name("Z").onChange(()=>{P.lightDirection.value.normalize()});const Fe=K.addFolder("Globe Model Controls"),I=new c_(16777215,10);I.position.set(1,1,1),v.add(I);const C=new u_(16777215,.5);v.add(C);const q=Fe.addFolder("Lighting");q.add({intensity:3},"intensity",0,5).name("Direct Light").onChange(S=>{I.intensity=S}),I.intensity=3,q.add({intensity:C.intensity},"intensity",0,5).name("Ambient Light").onChange(S=>{C.intensity=S}),Fe.add(k,"visible").name("Show Globe").onChange(S=>{F&&(F.visible=S)}),Fe.add(k,"scale",.1,50).name("Size").step(.1).onChange(S=>{F&&(k.baseScale=S,F.scale.set(S,S,S))}),Fe.add(k,"responsive").name("Responsive Size").onChange(S=>{!S&&F?F.scale.set(k.baseScale,k.baseScale,k.baseScale):S&&se()}),Fe.add({resizeGlobe:function(){F&&se()}},"resizeGlobe").name("Force Resize"),Fe.add({positionBehindWave:function(){F&&oe()}},"positionBehindWave").name("Position Behind Wave");function oe(){if(!F)return;const S=window.innerWidth;if(S<=640){F.position.y=192,F.position.z=-10;for(let re=0;re<Q.__controllers.length;re++){const pe=Q.__controllers[re];pe.property==="positionY"?pe.setValue(192):pe.property==="positionZ"&&pe.setValue(-10)}return}if(S>640&&S<=1024){F.position.y=192,F.position.z=-10;for(let pe=0;pe<Q.__controllers.length;pe++){const ue=Q.__controllers[pe];ue.property==="positionY"?ue.setValue(192):ue.property==="positionZ"&&ue.setValue(-10)}return}const B=-40,H=-10;F.position.y=B,F.position.z=H;for(let re=0;re<Q.__controllers.length;re++){const pe=Q.__controllers[re];pe.property==="positionY"?pe.setValue(B):pe.property==="positionZ"&&pe.setValue(H)}}function se(){if(!F||!k.responsive)return;const S=window.innerWidth;if(S>1024){F.scale.set(40,40,40);for(let pe=0;pe<Fe.__controllers.length;pe++)if(Fe.__controllers[pe].property==="scale"){Fe.__controllers[pe].setValue(40);break}oe();return}let B;S<=640?B=S*1.2:B=S*.9;const H={x:F.scale.x,y:F.scale.y,z:F.scale.z};try{F.scale.set(1,1,1),F.updateMatrixWorld(!0);const re=new lr().setFromObject(F),pe=re.max.x-re.min.x;F.scale.set(H.x,H.y,H.z);const ct=(R.right-R.left)/R.zoom/S,mt=B*ct/pe;F.scale.set(mt,mt,mt);for(let ht=0;ht<Fe.__controllers.length;ht++)if(Fe.__controllers[ht].property==="scale"){Fe.__controllers[ht].setValue(mt);break}oe()}catch(re){console.error("Error updating globe size:",re),F.scale.set(H.x,H.y,H.z)}}const Q=Fe.addFolder("Position");Q.add(k,"positionX",-500,500).name("X Position").step(1).onChange(S=>{F&&(F.position.x=S)}),Q.add(k,"positionY",-500,500).name("Y Position").step(1).onChange(S=>{F&&(F.position.y=S)}),Q.add(k,"positionZ",-500,500).name("Z Position").step(1).onChange(S=>{F&&(F.position.z=S)});const ke=Fe.addFolder("Rotation");ke.add(k,"rotationX",0,360).name("X Rotation").step(1).onChange(S=>{F&&(F.rotation.x=S*Math.PI/180)}),ke.add(k,"rotationY",0,360).name("Y Rotation").step(1).onChange(S=>{F&&(F.rotation.y=S*Math.PI/180)}),ke.add(k,"rotationZ",0,360).name("Z Rotation").step(1).onChange(S=>{F&&(F.rotation.z=S*Math.PI/180)}),Fe.add(k,"autoRotate").name("Auto Rotate").onChange(S=>{k.autoRotate=S}),Fe.add(k,"baseRotateSpeed",.05,1).name("Base Rotation Speed").step(.01).onChange(S=>{k.baseRotateSpeed=S}),Fe.add(k,"scrollRotateSpeed",.05,1).name("Scroll Rotation Speed").step(.01).onChange(S=>{k.scrollRotateSpeed=S}),Fe.open();const ve=K.addFolder("Gradient Overlay Controls");ve.add(N,"enabled").name("Show Overlay").onChange(S=>{D&&(D.visible=S)});const Qe=ve.add(N,"startOpacity",0,1).name("Top Opacity").step(.01).onChange(S=>{y&&(y.uniforms.startOpacity.value=S)});Qe.__li.querySelector(".property-name").innerHTML="Top Opacity (Top Edge)";const Ce=ve.add(N,"endOpacity",0,1).name("Bottom Opacity").step(.01).onChange(S=>{y&&(y.uniforms.endOpacity.value=S)});Ce.__li.querySelector(".property-name").innerHTML="Bottom Opacity (Bottom Edge)",ve.add(N,"yOffset",-2,2).name("Vertical Position (moves only)").step(.01).onChange(S=>{D&&j()}),ve.add(N,"offsetY",-1,1).name("Gradient Shift").step(.01).onChange(S=>{y&&(y.uniforms.offsetY.value=S)}),ve.add(N,"height",.1,5).name("Gradient Distribution (not size)").step(.1).onChange(S=>{y&&(y.uniforms.heightMultiplier.value=S)}),ve.addColor(N,"color").name("Color").onChange(S=>{y&&y.uniforms.overlayColor.value.set(S)}),ve.add({debugOverlay:function(){if(y){const S=y.uniforms.startOpacity.value,B=y.uniforms.endOpacity.value;y.uniforms.startOpacity.value=1,y.uniforms.endOpacity.value=1,y.uniforms.overlayColor.value.set("#FF00FF"),setTimeout(()=>{y.uniforms.startOpacity.value=S,y.uniforms.endOpacity.value=B,y.uniforms.overlayColor.value.set(N.color)},2e3)}}},"debugOverlay").name("Debug Visibility"),ve.open();let le=n.particleCount;console.log("[Background Init] Using particle count:",le);let me=new Float32Array(le*3),Ge=new Float32Array(le*3),Ie=new Float32Array(le*3),Ee=0,et=0;const L={scrollSpeed:.005,verticalSpread:1,horizontalSpread:.56,damping:.95,depthRange:1e3,sizeMin:1.1,sizeMax:4,floatSpeed:.8,verticalOffset:0};let xe=window.innerHeight*L.verticalSpread,ge=window.innerWidth*L.horizontalSpread;function _e(){const S=new Float32Array(le),B=new $e(at.color);for(let H=0;H<le;H++){const re=H*3,pe=Math.random(),ue=L.sizeMin+pe*(L.sizeMax-L.sizeMin);S[H]=ue/we.uniforms.baseSize.value;const ct=.8+pe*.6;Ie[re]=B.r*ct,Ie[re+1]=B.g*ct,Ie[re+2]=B.b*ct}ne.setAttribute("size",new Jt(S,1)),ne.attributes.position.needsUpdate=!0,ne.attributes.color.needsUpdate=!0,ne.attributes.size.needsUpdate=!0}for(let S=0;S<le;S++){const B=S*3;me[B]=(Math.random()-.5)*ge,me[B+1]=(Math.random()-.5)*xe+L.verticalOffset,me[B+2]=Math.random()*500-250,Ge[B]=(Math.random()-.5)*.5,Ge[B+1]=(Math.random()-.5)*.5,Ge[B+2]=(Math.random()-.5)*.2;const H=new $e("#25e5ff");Ie[B]=H.r,Ie[B+1]=H.g,Ie[B+2]=H.b}const ne=new pi;ne.setAttribute("position",new Jt(me,3)),ne.setAttribute("color",new Jt(Ie,3)),el.track(ne,"geometry");const ce=Ve();el.track(ce,"texture");function Ve(){const S=document.createElement("canvas");S.width=256,S.height=256;const B=S.getContext("2d"),H=B.createRadialGradient(S.width/2,S.height/2,0,S.width/2,S.height/2,S.width/2);H.addColorStop(0,"rgba(255, 255, 255, 1.0)"),H.addColorStop(.05,"rgba(255, 255, 255, 1.0)"),H.addColorStop(.2,"rgba(255, 255, 255, 0.9)"),H.addColorStop(.4,"rgba(255, 255, 255, 0.5)"),H.addColorStop(.6,"rgba(255, 255, 255, 0.3)"),H.addColorStop(.8,"rgba(255, 255, 255, 0.1)"),H.addColorStop(1,"rgba(255, 255, 255, 0)"),B.fillStyle=H,B.fillRect(0,0,S.width,S.height),B.beginPath(),B.moveTo(S.width/2,S.width*.3),B.lineTo(S.width/2,S.width*.7),B.moveTo(S.width*.3,S.height/2),B.lineTo(S.width*.7,S.height/2),B.moveTo(S.width*.35,S.height*.35),B.lineTo(S.width*.65,S.height*.65),B.moveTo(S.width*.65,S.height*.35),B.lineTo(S.width*.35,S.height*.65),B.strokeStyle="rgba(255, 255, 255, 1.0)",B.lineWidth=4,B.stroke();const re=B.createRadialGradient(S.width/2,S.height/2,S.width*.2,S.width/2,S.height/2,S.width*.7);re.addColorStop(0,"rgba(255, 255, 255, 0.3)"),re.addColorStop(.5,"rgba(255, 255, 255, 0.1)"),re.addColorStop(1,"rgba(255, 255, 255, 0)"),B.globalCompositeOperation="lighter",B.fillStyle=re,B.fillRect(0,0,S.width,S.height);const pe=new Rn(S);return pe.needsUpdate=!0,pe}const we=new fi({uniforms:{baseSize:{value:6},opacity:{value:0},map:{value:ce},brightness:{value:1.4},haloStrength:{value:1.4},haloSize:{value:1.3}},vertexShader:`
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
    `,transparent:!0,blending:xu,depthWrite:!1,depthTest:!1}),Ft=new eh(ne,we);Ft.frustumCulled=!0,E.add(Ft);const Se=K.addFolder("Particle System"),Ke={count:le};Se.add(Ke,"count",100,1e3,10).name("Particle Count").onChange(S=>{le=Math.floor(S);const B=new Float32Array(le*3),H=new Float32Array(le*3),re=new Float32Array(le*3);for(let pe=0;pe<le;pe++){const ue=pe*3;if(pe<me.length/3)B[ue]=me[ue],B[ue+1]=me[ue+1],B[ue+2]=me[ue+2],H[ue]=Ge[ue],H[ue+1]=Ge[ue+1],H[ue+2]=Ge[ue+2],re[ue]=Ie[ue],re[ue+1]=Ie[ue+1],re[ue+2]=Ie[ue+2];else{B[ue]=(Math.random()-.5)*ge,B[ue+1]=(Math.random()-.5)*xe+L.verticalOffset,B[ue+2]=Math.random()*500-250,H[ue]=(Math.random()-.5)*.5,H[ue+1]=(Math.random()-.5)*.5,H[ue+2]=(Math.random()-.5)*.2;const ct=new $e(at.color);re[ue]=ct.r,re[ue+1]=ct.g,re[ue+2]=ct.b}}me=B,Ge=H,Ie=re,ne.attributes.position&&(ne.attributes.position.array=null),ne.attributes.color&&(ne.attributes.color.array=null),ne.setAttribute("position",new Jt(me,3)),ne.setAttribute("color",new Jt(Ie,3)),ne.attributes.position.needsUpdate=!0,ne.attributes.color.needsUpdate=!0,_e()});const at={color:"#25e5ff"};Se.addColor(at,"color").name("Particle Color").onChange(S=>{const B=new $e(S);for(let H=0;H<le;H++){const re=H*3;Ie[re]=B.r,Ie[re+1]=B.g,Ie[re+2]=B.b}ne.attributes.color?(ne.attributes.color.array.set(Ie),ne.attributes.color.needsUpdate=!0):ne.setAttribute("color",new Jt(Ie,3))}),Se.add(we.uniforms.baseSize,"value",2,15,.5).name("Base Particle Size").onChange(S=>{_e()}),Se.add(we.uniforms.opacity,"value",0,1,.1).name("Opacity"),Se.add(we.uniforms.brightness,"value",1,3,.1).name("Brightness").onChange(S=>{we.uniforms.brightness.value=S});const Pe={intensity:1.5};Se.add(Pe,"intensity",.1,3,.1).name("Sparkle Intensity").onChange(S=>{we.uniforms.opacity.value=S});const lt={enabled:!1},nt=Se.add(lt,"enabled").name("Size Attenuation").onChange(S=>{S?we.vertexShader=`
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
        `,we.needsUpdate=!0,_e()}),We=document.createElement("div");We.className="gui-tooltip",We.textContent="When enabled, particles appear smaller as they move further away",We.style.position="absolute",We.style.backgroundColor="rgba(0,0,0,0.8)",We.style.color="#fff",We.style.padding="5px",We.style.borderRadius="3px",We.style.fontSize="11px",We.style.zIndex="10000",We.style.display="none",document.body.appendChild(We);const en=nt.domElement;en.addEventListener("mouseenter",S=>{const B=en.getBoundingClientRect();We.style.left=B.right+"px",We.style.top=B.top+"px",We.style.display="block"}),en.addEventListener("mouseleave",()=>{We.style.display="none"});let gt=0;window.addEventListener("scroll",()=>{Ee=window.scrollY});let _t=[],Dt={x:0,y:0},Vt={x:0,y:0},kt=0,At=0,dn=!1,Ht=250,Gt=[],Qn=10,Xt,qt=!1,jt=[];const A={enabled:!1,mobileDisabled:!n.mouseParticles,spawnRate:t==="high"?.52:t==="medium"?.35:0,maxParticles:t==="high"?150:t==="medium"?75:0,baseSize:1.9,fadeInSpeed:.62,fadeOutSpeed:.88,trailLength:5e-4,speedVariation:.2,jitterAmount:.08,spawnOffsetMin:.08,spawnOffsetMax:.8,minLifetime:1.5,maxLifetime:3.5,drawnLife:12};Xt=A.spawnOffsetMin,window.enableMouseParticles=function(){A.mobileDisabled||(A.enabled=!0)};const z=new pi;el.track(z,"geometry");const Z=new fi({uniforms:{baseSize:{value:A.baseSize},map:{value:ce},brightness:{value:1.4},haloStrength:{value:1.4},haloSize:{value:1.3}},vertexShader:`
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
    `,transparent:!0,blending:xu,depthWrite:!1,depthTest:!1}),J=new eh(z,Z);E.add(J);function W(S,B){const H=S/window.innerWidth*2-1,re=-(B/window.innerHeight)*2+1,pe=H*(R.right-R.left)/2/R.zoom,ue=re*(R.top-R.bottom)/2/R.zoom;return{x:pe,y:ue}}function ye(S,B){return{id:kt++,position:{x:S,y:B,z:Math.random()*100-50},targetPosition:{x:S,y:B},velocity:{x:0,y:0},size:.8+Math.random()*.4,opacity:0,targetOpacity:1,life:0,maxLife:A.minLifetime+Math.random()*(A.maxLifetime-A.minLifetime),color:{r:.145,g:.898,b:1},trailSpeed:.05+Math.random()*.03,fadePhase:"in"}}function De(S,B){return{id:kt++,position:{x:S,y:B,z:Math.random()*100-50},originalPosition:{x:S,y:B},targetPosition:{x:S,y:B},velocity:{x:0,y:0},size:.8+Math.random()*.4,opacity:0,baseOpacity:0,targetOpacity:1,life:0,maxLife:A.drawnLife,color:{r:1,g:.647,b:0},trailSpeed:0,fadePhase:"in",isDrawn:!0,twinklePhase:Math.random()*Math.PI*2,twinkleSpeed:.8+Math.random()*.4,twinkleRadius:2+Math.random()*3}}let Be=0;function Ae(){const S=[..._t,...jt],B=S.length;if(B===0){if(Be===0)return;z.deleteAttribute("position"),z.deleteAttribute("color"),z.deleteAttribute("size"),z.deleteAttribute("opacity"),Be=0;return}const H=new Float32Array(B*3),re=new Float32Array(B*3),pe=new Float32Array(B),ue=new Float32Array(B);for(let Je=0;Je<B;Je++){const mt=S[Je],ht=Je*3;H[ht]=mt.position.x,H[ht+1]=mt.position.y,H[ht+2]=mt.position.z,re[ht]=mt.color.r,re[ht+1]=mt.color.g,re[ht+2]=mt.color.b,pe[Je]=mt.size,ue[Je]=mt.opacity}B!==Be?(z.attributes.position&&(z.deleteAttribute("position"),z.deleteAttribute("color"),z.deleteAttribute("size"),z.deleteAttribute("opacity")),z.setAttribute("position",new Jt(H,3)),z.setAttribute("color",new Jt(re,3)),z.setAttribute("size",new Jt(pe,1)),z.setAttribute("opacity",new Jt(ue,1)),Be=B):(z.attributes.position.array.set(H),z.attributes.color.array.set(re),z.attributes.size.array.set(pe),z.attributes.opacity.array.set(ue),z.attributes.position.needsUpdate=!0,z.attributes.color.needsUpdate=!0,z.attributes.size.needsUpdate=!0,z.attributes.opacity.needsUpdate=!0)}window.addEventListener("mousemove",S=>{if(!A.enabled||A.mobileDisabled)return;Vt.x=Dt.x,Vt.y=Dt.y,Dt.x=S.clientX,Dt.y=S.clientY;const B=Dt.x-Vt.x,H=Dt.y-Vt.y,re=Math.sqrt(B*B+H*H);if(dn||(At+=re,At>=Ht&&(dn=!0)),Gt.push(re),Gt.length>Qn&&Gt.shift(),Gt.length>0){const pe=Gt.reduce((Je,mt)=>Je+mt,0)/Gt.length,ct=Math.min(pe/20,1);Xt=A.spawnOffsetMin+(A.spawnOffsetMax-A.spawnOffsetMin)*ct}if(dn&&re>1&&_t.length<A.maxParticles&&Math.random()<A.spawnRate){const pe=W(Dt.x,Dt.y),ue=Xt*50,ct=Math.random()*Math.PI*2,Je=Math.cos(ct)*ue*Math.random(),mt=Math.sin(ct)*ue*Math.random(),ht=ye(pe.x+Je,pe.y+mt);_t.push(ht)}if(qt&&_t.length<A.maxParticles&&Math.random()<.8){const pe=W(Dt.x,Dt.y),ue=10,ct=Math.random()*Math.PI*2,Je=Math.cos(ct)*ue*Math.random(),mt=Math.sin(ct)*ue*Math.random(),ht=De(pe.x+Je,pe.y+mt);jt.push(ht)}}),window.addEventListener("mousedown",S=>{!A.enabled||A.mobileDisabled||S.button===0&&(qt=!0)}),window.addEventListener("mouseup",S=>{S.button===0&&(qt=!1)});let Ze={x:0,y:0},He={x:0,y:0},Ye=!1;window.addEventListener("touchstart",S=>{if(!A.enabled||A.mobileDisabled)return;const B=S.target;B.tagName==="BUTTON"||B.tagName==="A"||B.closest("button")||B.closest("a")||B.closest("header")||B.closest("nav")||S.preventDefault();const re=S.touches[0];He.x=re.clientX,He.y=re.clientY,Ze.x=He.x,Ze.y=He.y,Ye=!0,qt=!0},{passive:!1}),window.addEventListener("touchmove",S=>{if(!A.enabled||A.mobileDisabled||!Ye)return;const B=S.target;B.tagName==="BUTTON"||B.tagName==="A"||B.closest("button")||B.closest("a")||B.closest("header")||B.closest("nav")||S.preventDefault();const re=S.touches[0];Ze.x=He.x,Ze.y=He.y,He.x=re.clientX,He.y=re.clientY,Dt.x=He.x,Dt.y=He.y;const pe=He.x-Ze.x,ue=He.y-Ze.y,ct=Math.sqrt(pe*pe+ue*ue);if(dn||(At+=ct,At>=Ht&&(dn=!0)),Gt.push(ct),Gt.length>Qn&&Gt.shift(),Gt.length>0){const Je=Gt.reduce((Po,Lo)=>Po+Lo,0)/Gt.length,ht=Math.min(Je/20,1);Xt=A.spawnOffsetMin+(A.spawnOffsetMax-A.spawnOffsetMin)*ht}if(dn&&ct>1&&_t.length<A.maxParticles&&Math.random()<A.spawnRate){const Je=W(He.x,He.y),mt=Xt*50,ht=Math.random()*Math.PI*2,Po=Math.cos(ht)*mt*Math.random(),Lo=Math.sin(ht)*mt*Math.random(),Do=ye(Je.x+Po,Je.y+Lo);_t.push(Do)}if(qt&&_t.length<A.maxParticles&&Math.random()<.8){const Je=W(He.x,He.y),mt=10,ht=Math.random()*Math.PI*2,Po=Math.cos(ht)*mt*Math.random(),Lo=Math.sin(ht)*mt*Math.random(),Do=De(Je.x+Po,Je.y+Lo);jt.push(Do)}},{passive:!1}),window.addEventListener("touchend",S=>{Ye=!1,qt=!1}),window.addEventListener("touchcancel",S=>{Ye=!1,qt=!1});function St(){if(_t.length===0&&jt.length===0||A.mobileDisabled)return;const S=W(Dt.x,Dt.y);for(let B=_t.length-1;B>=0;B--){const H=_t[B];if(H.life+=.016,!H.isDrawn){H.targetPosition.x=S.x,H.targetPosition.y=S.y;const pe=H.trailSpeed*A.trailLength;H.position.x+=(H.targetPosition.x-H.position.x)*pe,H.position.y+=(H.targetPosition.y-H.position.y)*pe,H.position.x+=(Math.random()-.5)*2*A.jitterAmount,H.position.y+=(Math.random()-.5)*2*A.jitterAmount}const re=H.life/H.maxLife;if(re<.15){H.fadePhase="in";const pe=re/.15,ue=1-Math.pow(1-pe,2);H.opacity=ue*A.fadeInSpeed}else if(re<.65)H.fadePhase="hold",H.opacity=A.fadeInSpeed;else{H.fadePhase="out";const pe=(re-.65)/.35,ue=Math.pow(1-pe,2);H.opacity=ue*A.fadeInSpeed*A.fadeOutSpeed}(H.life>=H.maxLife||H.opacity<=0)&&_t.splice(B,1)}for(let B=jt.length-1;B>=0;B--){const H=jt[B];H.life+=.016,H.twinklePhase+=.016*H.twinkleSpeed;const re=Math.sin(H.twinklePhase)*H.twinkleRadius*.4,pe=Math.cos(H.twinklePhase*1.05)*H.twinkleRadius*.4;H.position.x=H.originalPosition.x+re,H.position.y=H.originalPosition.y+pe;const ue=H.life/H.maxLife;if(ue<.15){H.fadePhase="in";const Je=ue/.15,mt=1-Math.pow(1-Je,2);H.baseOpacity=mt*A.fadeInSpeed}else if(ue<.85)H.fadePhase="hold",H.baseOpacity=A.fadeInSpeed;else{H.fadePhase="out";const Je=(ue-.85)/.15,mt=Math.pow(1-Je,2);H.baseOpacity=mt*A.fadeInSpeed*A.fadeOutSpeed}const ct=.7+.3*Math.sin(H.twinklePhase*2);H.opacity=H.baseOpacity*ct,(H.life>=H.maxLife||H.opacity<=0)&&jt.splice(B,1)}Ae(),on.currentOffset=Xt}const dt=K.addFolder("Mouse Follow Particles");dt.add({mobileDetected:A.mobileDisabled},"mobileDetected").name("Mobile Detected (Disabled)").listen(),dt.add(A,"enabled").name("Enable Mouse Particles").onChange(S=>{S||(_t=[],jt=[],Ae(),dn=!1,At=0,Gt=[],Xt=A.spawnOffsetMin,qt=!1)}),dt.add(A,"spawnRate",.1,1,.1).name("Spawn Rate").onChange(S=>{A.spawnRate=S}),dt.add(A,"maxParticles",10,50,1).name("Max Particles").onChange(S=>{for(A.maxParticles=S;_t.length>S;)_t.pop();Ae()}),dt.add(A,"baseSize",2,10,.5).name("Particle Size").onChange(S=>{Z.uniforms.baseSize.value=S}),dt.add(A,"trailLength",.1,1,.1).name("Trail Length").onChange(S=>{A.trailLength=S}),dt.add(A,"speedVariation",0,1,.1).name("Speed Variation").onChange(S=>{A.speedVariation=S}),dt.add(A,"jitterAmount",0,1,.05).name("Jitter Amount").onChange(S=>{A.jitterAmount=S}),dt.add(A,"spawnOffsetMin",0,1,.05).name("Spawn Offset Min").onChange(S=>{A.spawnOffsetMin=S}),dt.add(A,"spawnOffsetMax",0,1,.05).name("Spawn Offset Max").onChange(S=>{A.spawnOffsetMax=S});const on={currentOffset:Xt};dt.add(on,"currentOffset",0,1).name("Current Offset (Dynamic)").listen(),dt.add(A,"fadeInSpeed",.1,1,.01).name("Max Opacity").onChange(S=>{A.fadeInSpeed=S}),dt.add(A,"fadeOutSpeed",.1,1,.01).name("Fade Strength").onChange(S=>{A.fadeOutSpeed=S}),dt.add(A,"drawnLife",1,10,.1).name("Drawn Particle Life").onChange(S=>{A.drawnLife=S}),dt.add({movementThreshold:Ht},"movementThreshold",100,400,10).name("Initial Movement Needed").onChange(S=>{Ht=S}),dt.add({resetActivation:function(){dn=!1,At=0,Gt=[],Xt=A.spawnOffsetMin,_t=[],jt=[],qt=!1,Ae()}},"resetActivation").name("Reset Activation"),dt.close();function ln(){const S=ne.attributes.position.array,B=L.previousOffset||0,H=L.verticalOffset-B;L.previousOffset=L.verticalOffset;for(let re=0;re<le;re++){const pe=re*3;S[pe+1]+=H;const ue=S[pe+1]-L.verticalOffset,ct=xe/2;ue>ct?S[pe+1]=-ct+L.verticalOffset:ue<-ct&&(S[pe+1]=ct+L.verticalOffset)}ne.attributes.position.needsUpdate=!0}const Bt=new $e;function rt(){const S=ne.attributes.position.array,B=ne.attributes.color.array,H=ne.attributes.size?ne.attributes.size.array:null;gt+=.01;const re=(Ee-et)*L.scrollSpeed;if(et=Ee*(1-L.damping)+et*L.damping,!window.particlesMovementPaused){for(let pe=0;pe<le;pe++){const ue=pe*3,ct=H?(H[pe]-L.sizeMin)/(L.sizeMax-L.sizeMin):.5,Je=L.floatSpeed*(.5+ct*.5);S[ue]+=Ge[ue]*Je,S[ue+1]+=Ge[ue+1]*Je,S[ue+2]+=Ge[ue+2]*Je,S[ue+1]+=re*(.5+ct*.5),Math.abs(S[ue])>ge/2&&(Ge[ue]*=-1);const mt=S[ue+1]-L.verticalOffset,ht=xe/2;mt>ht?S[ue+1]=-ht+L.verticalOffset:mt<-ht&&(S[ue+1]=ht+L.verticalOffset),Math.abs(S[ue+2])>250&&(Ge[ue+2]*=-1)}ne.attributes.position.needsUpdate=!0}Bt.set(at.color);for(let pe=0;pe<le;pe++){const ue=pe*3,ct=H?(H[pe]-L.sizeMin)/(L.sizeMax-L.sizeMin):.5,Je=.2*Math.sin(gt+pe*.1)+.9,mt=.8+ct*.6;B[ue]=Bt.r*Je*mt,B[ue+1]=Bt.g*Je*mt,B[ue+2]=Bt.b*Je*mt}ne.attributes.color.needsUpdate=!0,requestAnimationFrame(rt)}rt();function an(S){if(!window.backgroundPaused){if(P.time.value+=.001,o()&&Date.now()-i>s){const H=P.time.value+P.colorCycleOffset.value;P.colorCycleOffset.value=H,P.time.value=0,i=Date.now()}if(St(),!window.particlesFullyHidden&&we.uniforms.opacity.value<M&&(we.uniforms.opacity.value+=.001,we.uniforms.opacity.value>M&&(we.uniforms.opacity.value=M)),window.particlesFullyHidden&&we.uniforms.opacity.value>0&&(we.uniforms.opacity.value=0),F&&k.autoRotate&&!k.rotationPaused){const B=k.baseRotateSpeed;F.rotation.y+=B*.01}D&&(D.rotation.set(0,0,0),j()),x.autoClear=!0,x.render(v,R),(!window.particlesFullyHidden||_t.length>0&&A.enabled)&&(x.autoClear=!1,x.render(E,R))}}const Ct=new $E;window.shaderBackgroundPerfMonitor=Ct,new URLSearchParams(window.location.search).has("debugPerf")&&(Ct.createDebugOverlay(),console.log("[Background Init] Performance monitoring enabled")),Ct.setWarningCallback(S=>{console.warn("[Performance Warning]",S)});const Zi=new YE(S=>{an(),Ct.update(x)},n.targetFPS);Zi.start(),window.shaderBackgroundRenderer=Zi,Object.defineProperty(window,"backgroundPaused",{get(){return this._backgroundPaused||!1},set(S){this._backgroundPaused=S,Zi&&Zi.setPausedByTimeline(S)}}),document.addEventListener("veryEarlyParticleFade",()=>{M=.3,we&&we.uniforms&&we.uniforms.opacity&&we.uniforms.opacity.value<.1&&(we.uniforms.opacity.value=.05)}),document.addEventListener("particleFadeStart",()=>{M=.3}),document.addEventListener("heroAnimationComplete",()=>{M=.5});function Dn(){if(D){const S=window.innerHeight,B=R.right-R.left,re=(R.top-R.bottom)/S,pe=B,ue=S*.66*re;D.geometry.dispose(),D.geometry=new Vi(pe,ue),D.rotation.set(0,0,0),j()}}let hr,Ut;function xn(){const S=window.innerWidth,B=m();if(x.setSize(S,B),R.left=-S/2,R.right=S/2,R.top=B/2,R.bottom=-B/2,R.updateProjectionMatrix(),P.resolution.value.set(S,B),ie.geometry.dispose(),ie.geometry=new Vi(S,B,S/10,B/10),xe=B*L.verticalSpread,ge=S*L.horizontalSpread,typeof K<"u"&&K&&K.__folders["Particle System"]){const H=K.__folders["Particle System"];if(H&&H.__controllers){for(let re=0;re<H.__controllers.length;re++)if(H.__controllers[re].property==="verticalOffset"){H.__controllers[re].min(-B*3),H.__controllers[re].max(B*2);break}}}if(F&&k.responsive){clearTimeout(Ut),Ut=setTimeout(()=>{se()},150);for(let H=0;H<Q.__controllers.length;H++){const re=Q.__controllers[H];re.property==="positionX"?(re.min(-S/2),re.max(S/2)):re.property==="positionY"&&(re.min(-B/2),re.max(B/2))}}Dn()}window.addEventListener("resize",()=>{clearTimeout(hr),clearTimeout(Ut),F&&k.responsive&&(Ut=setTimeout(()=>{se()},150)),hr=setTimeout(xn,150)}),window.addEventListener("orientationchange",()=>{clearTimeout(hr),clearTimeout(Ut),F&&k.responsive&&(Ut=setTimeout(()=>{se()},300)),hr=setTimeout(xn,300)}),document.addEventListener("visibilitychange",()=>{if(document.visibilityState==="visible"){clearTimeout(Ut);const S=window.innerWidth,B=m();window.lastKnownDimensions||(window.lastKnownDimensions={width:S,height:B});const H=Math.abs(S-window.lastKnownDimensions.width)/window.lastKnownDimensions.width,re=Math.abs(B-window.lastKnownDimensions.height)/window.lastKnownDimensions.height;(H>.05||re>.05)&&(window.lastKnownDimensions.width=S,window.lastKnownDimensions.height=B,F&&k.responsive&&(Ut=setTimeout(()=>{se()},150)),setTimeout(xn,100))}else window.lastKnownDimensions={width:window.innerWidth,height:m()}});let ei=m();function In(){const S=m();Math.abs(S-ei)>50&&(xn(),ei=S),requestAnimationFrame(In)}In(),window.addEventListener("keydown",S=>{if((S.key==="+"||S.key==="=")&&(T.zoom=Math.min(T.zoom+.1,5),R.zoom=T.zoom,R.updateProjectionMatrix(),typeof K<"u"&&K&&K.__folders["Camera Controls"])){const B=K.__folders["Camera Controls"];if(B&&B.__controllers){for(let H=0;H<B.__controllers.length;H++)if(B.__controllers[H].property==="zoom"){B.__controllers[H].updateDisplay();break}}}if((S.key==="-"||S.key==="_")&&(T.zoom=Math.max(T.zoom-.1,.1),R.zoom=T.zoom,R.updateProjectionMatrix(),typeof K<"u"&&K&&K.__folders["Camera Controls"])){const B=K.__folders["Camera Controls"];if(B&&B.__controllers){for(let H=0;H<B.__controllers.length;H++)if(B.__controllers[H].property==="zoom"){B.__controllers[H].updateDisplay();break}}}}),Se.add(L,"scrollSpeed",.001,.05,.018).name("Scroll Sensitivity").step(.001).onChange(S=>{L.scrollSpeed=S}),Se.add(L,"damping",.8,.99,.01).name("Scroll Damping").onChange(S=>{L.damping=S}),Se.add(L,"verticalSpread",1,5,.5).name("Vertical Spread").onChange(S=>{const B=xe;xe=window.innerHeight*S;const H=xe/B,re=ne.attributes.position.array;for(let pe=0;pe<le;pe++){const ue=pe*3,Je=(re[ue+1]-L.verticalOffset)*H;re[ue+1]=Je+L.verticalOffset,Math.abs(Je)>xe/2&&(re[ue+1]=(Math.random()-.5)*xe+L.verticalOffset)}ne.attributes.position.needsUpdate=!0}),Se.add(L,"horizontalSpread",.02,5,.01).name("Horizontal Spread").onChange(S=>{const B=ge;ge=window.innerWidth*S;const H=ge/B,re=ne.attributes.position.array;for(let pe=0;pe<le;pe++){const ue=pe*3,Je=re[ue]*H;re[ue]=Je,Math.abs(Je)>ge/2&&(re[ue]=(Math.random()-.5)*ge)}ne.attributes.position.needsUpdate=!0}),Se.add(L,"verticalOffset",-window.innerHeight*3,window.innerHeight*2,10).name("Vertical Position").onChange(S=>{L.previousOffset===void 0&&(L.previousOffset=0),L.verticalOffset=S,ln()}),Se.add(L,"sizeMin",1,5,.01).name("Min Particle Size").onChange(S=>{if(L.sizeMin=S,L.sizeMin>=L.sizeMax&&(L.sizeMax=L.sizeMin+1,typeof K<"u"&&K&&K.__folders["Particle System"])){const B=K.__folders["Particle System"];if(B&&B.__controllers){for(let H=0;H<B.__controllers.length;H++)if(B.__controllers[H].property==="sizeMax"){B.__controllers[H].updateDisplay();break}}}_e()}),Se.add(L,"sizeMax",5,10,.01).name("Max Particle Size").onChange(S=>{if(L.sizeMax=S,L.sizeMax<=L.sizeMin&&(L.sizeMin=L.sizeMax-1,typeof K<"u"&&K&&K.__folders["Particle System"])){const B=K.__folders["Particle System"];if(B&&B.__controllers){for(let H=0;H<B.__controllers.length;H++)if(B.__controllers[H].property==="sizeMin"){B.__controllers[H].updateDisplay();break}}}_e()}),Se.add(L,"floatSpeed",.1,3,.1).name("Float Speed").onChange(S=>{L.floatSpeed=S}),_e();const Hn=ne.attributes.position.array;for(let S=0;S<le;S++){const B=S*3;Hn[B+1]=(Math.random()-.5)*xe+L.verticalOffset}ne.attributes.position.needsUpdate=!0,Se.add(we.uniforms.haloStrength,"value",0,2,.1).name("Halo Intensity").onChange(S=>{we.uniforms.haloStrength.value=S}),Se.add(we.uniforms.haloSize,"value",1,2,.1).name("Halo Size").onChange(S=>{we.uniforms.haloSize.value=S});let Hs;window.addEventListener("scroll",()=>{Hs&&clearTimeout(Hs),Hs=setTimeout(()=>{},150)})}function Ks(){const r=window.gui,e=window.uniforms;if(typeof r>"u"||!r||!r.__folders||!r.__folders["Lighting Controls"])return;const t=r.__folders["Lighting Controls"];for(let n=0;n<t.__controllers.length;n++){const i=t.__controllers[n];i.property==="value"&&i.object===e.ambientLight&&i.setValue(e.ambientLight.value),i.property==="value"&&i.object===e.directionalLight&&i.setValue(e.directionalLight.value)}}function Vr(){const r=window.gui,e=window.uniforms;if(r.__folders["Animation Speed Controls"]){const t=r.__folders["Animation Speed Controls"];for(let n=0;n<t.__controllers.length;n++){const i=t.__controllers[n];if(i.property==="value"&&i.object===e.waveSpeed){i.setValue(e.waveSpeed.value);break}}}if(r.__folders["Wave Controls"]){const t=r.__folders["Wave Controls"];for(let n=0;n<t.__controllers.length;n++){const i=t.__controllers[n];i.property==="value"&&i.object===e.waveAmplitude&&i.setValue(e.waveAmplitude.value),i.property==="value"&&i.object===e.waveFrequency&&i.setValue(e.waveFrequency.value)}}}const JE="/150-lab/assets/video/acs-150-compressed.mp4",QE="/150-lab/assets/images/anniversary-video-poster.jpg";let Xd=!1;function eA(){const r=document.getElementById("anniversary-video"),e=document.querySelector("#video");if(!r||!e)return;r.src=JE,r.poster=QE,r.addEventListener("error",P=>{var Me,Ne;console.error("Video loading error:",P),console.error("Video src:",r.src),console.error("Video error code:",(Me=r.error)==null?void 0:Me.code),console.error("Video error message:",(Ne=r.error)==null?void 0:Ne.message)}),r.addEventListener("loadeddata",()=>{r.style.opacity="1",r.pause()}),r.addEventListener("loadedmetadata",()=>{r.style.display="none",r.offsetHeight,r.style.display=""});const t=document.createElement("div");t.className="video-overlay";const n=document.createElement("div");n.className="play-button",t.appendChild(n),r.parentNode.insertBefore(t,r.nextSibling);const i=document.createElement("div");i.className="video-audio-slider",i.innerHTML=`
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
  `,r.parentNode.appendChild(c);let h=!1;const _=.3,g=.18,m=()=>{const Me=r.volume/_*100;o.style.width=Me+"%",a.style.left=Me+"%"},p=P=>{const Me=s.getBoundingClientRect(),ze=Math.max(0,Math.min(100,(P-Me.left)/Me.width*100))/100*_;if(window.audioMuted&&ze>0){const te=document.querySelector(".sound-toggle");te&&te.classList.contains("muted")&&(Xd=!0,te.click(),setTimeout(()=>{Xd=!1},100))}ze>0?r.muted=!1:r.muted=!0,r.volume=ze,ze>0&&(j=ze),m()};s.addEventListener("mousedown",P=>{h=!0,p(P.clientX),P.preventDefault()}),document.addEventListener("mousemove",P=>{h&&p(P.clientX)}),document.addEventListener("mouseup",()=>{h=!1});const b=r.parentNode;b.addEventListener("mouseenter",()=>{r.paused||(i.style.opacity="1",i.style.pointerEvents="auto")}),b.addEventListener("mouseleave",()=>{i.style.opacity="0",i.style.pointerEvents="none"}),r.addEventListener("volumechange",m),r.volume=g,window.audioMuted?(r.muted=!0,r.volume=0):r.muted=!1,m();let x=!1;const v=()=>{if(r.duration&&!x){const P=r.currentTime/r.duration*100;d.style.transition="none",d.style.width=P+"%",f.style.left=P+"%"}},E=P=>{const Me=u.getBoundingClientRect(),ze=Math.max(0,Math.min(100,(P-Me.left)/Me.width*100))/100*r.duration;r.currentTime=ze,v(),r.paused||D()},M=()=>{d.style.transition="none",f.style.transition="opacity 0.2s"},T=()=>{d.style.transition="width 0.1s linear",f.style.transition="opacity 0.2s"};u.addEventListener("mousedown",P=>{x=!0,M(),E(P.clientX),P.preventDefault()}),u.addEventListener("click",P=>{x||(M(),E(P.clientX),setTimeout(()=>{T()},50))}),document.addEventListener("mousemove",P=>{x&&E(P.clientX)}),document.addEventListener("mouseup",()=>{x=!1,T()}),c.addEventListener("mouseenter",()=>{f.style.opacity="1",c.style.height="8px",c.style.background="rgba(0, 0, 0, 0.3)"}),c.addEventListener("mouseleave",()=>{x||(f.style.opacity="0"),c.style.height="4px",c.style.background="rgba(0, 0, 0, 0)"});let R=null,w=0;const y=()=>{if(r.duration&&!x&&!r.paused){const P=performance.now();if(P-w>=16.67){const Me=r.currentTime/r.duration*100;d.style.width=Me+"%",f.style.left=Me+"%",w=P}R=requestAnimationFrame(y)}},D=()=>{R&&cancelAnimationFrame(R),w=performance.now(),R=requestAnimationFrame(y)},N=()=>{R&&(cancelAnimationFrame(R),R=null)};r.addEventListener("play",D),r.addEventListener("pause",N),r.addEventListener("timeupdate",v),v();const V=(P,Me,Ne=1e3)=>{if(!P)return;const ze=P.volume,te=performance.now(),ie=K=>{const Ue=K-te,be=Math.min(Ue/Ne,1),je=be*be;P.volume=ze+(Me-ze)*je,be<1&&requestAnimationFrame(ie)};requestAnimationFrame(ie)};let j=g,k=null;const G=()=>{r.paused||(j=r.volume,V(r,0,600),k=setTimeout(()=>{r.pause(),t.classList.remove("hidden"),i.style.opacity="0",i.style.pointerEvents="none",window.backgroundAudio&&!window.audioMuted&&V(window.backgroundAudio,.25),k=null},600))},Y=()=>{r.paused||(k&&(clearTimeout(k),k=null),r.pause(),t.classList.remove("hidden"),i.style.opacity="0",i.style.pointerEvents="none",window.backgroundAudio&&!window.audioMuted&&V(window.backgroundAudio,.25))},F=()=>{r.paused?(k&&(clearTimeout(k),k=null),r.play(),t.classList.add("hidden"),window.backgroundAudio&&V(window.backgroundAudio,0),window.audioMuted?(r.volume=0,r.muted=!0):(r.muted=!1,r.volume=j),m(),D()):Y()};t.addEventListener("click",F),r.addEventListener("click",F),r.addEventListener("ended",()=>{t.classList.remove("hidden"),i.style.opacity="0",i.style.pointerEvents="none",window.backgroundAudio&&!window.audioMuted&&V(window.backgroundAudio,.25)}),r.addEventListener("pause",()=>{t.classList.remove("hidden"),i.style.opacity="0",i.style.pointerEvents="none",window.backgroundAudio&&!window.audioMuted&&V(window.backgroundAudio,.25)}),new IntersectionObserver(P=>{P.forEach(Me=>{Me.isIntersecting||G()})},{threshold:.5}).observe(e);const O=()=>{!r.paused&&!r.ended&&(window.audioMuted?(r.volume=0,r.muted=!0):(r.muted=!1,Xd||(r.volume=j),window.backgroundAudio&&!window.backgroundAudio.paused&&V(window.backgroundAudio,0)),m())},he=document.querySelector(".sound-toggle");if(he){he.addEventListener("click",()=>{setTimeout(()=>{O()},50)}),new MutationObserver(Ne=>{Ne.forEach(ze=>{ze.type==="attributes"&&ze.attributeName==="class"&&setTimeout(()=>{O()},50)})}).observe(he,{attributes:!0,attributeFilter:["class"]});let Me=window.audioMuted;setInterval(()=>{window.audioMuted!==Me&&(Me=window.audioMuted,O())},500),setTimeout(()=>{O()},1e3)}}function Gr(r){if(r===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return r}function A_(r,e){r.prototype=Object.create(e.prototype),r.prototype.constructor=r,r.__proto__=e}/*!
 * GSAP 3.12.7
 * https://gsap.com
 *
 * @license Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license or for
 * Club GSAP members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/var Oi={autoSleep:120,force3D:"auto",nullTargetWarn:1,units:{lineHeight:""}},Ra={duration:.5,overwrite:!1,delay:0},hp,Vn,cn,qi=1e8,Qt=1/qi,uh=Math.PI*2,tA=uh/4,nA=0,C_=Math.sqrt,iA=Math.cos,rA=Math.sin,kn=function(e){return typeof e=="string"},mn=function(e){return typeof e=="function"},ns=function(e){return typeof e=="number"},pp=function(e){return typeof e>"u"},Dr=function(e){return typeof e=="object"},xi=function(e){return e!==!1},mp=function(){return typeof window<"u"},kc=function(e){return mn(e)||kn(e)},R_=typeof ArrayBuffer=="function"&&ArrayBuffer.isView||function(){},Kn=Array.isArray,dh=/(?:-?\.?\d|\.)+/gi,P_=/[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,sa=/[-+=.]*\d+[.e-]*\d*[a-z%]*/g,qd=/[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,L_=/[+-]=-?[.\d]+/,D_=/[^,'"\[\]\s]+/gi,sA=/^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,fn,_r,fh,gp,Ni={},Ru={},I_,O_=function(e){return(Ru=Pa(e,Ni))&&wi},_p=function(e,t){return console.warn("Invalid property",e,"set to",t,"Missing plugin? gsap.registerPlugin()")},$l=function(e,t){return!t&&console.warn(e)},N_=function(e,t){return e&&(Ni[e]=t)&&Ru&&(Ru[e]=t)||Ni},jl=function(){return 0},oA={suppressEvents:!0,isStart:!0,kill:!1},au={suppressEvents:!0,kill:!1},aA={suppressEvents:!0},xp={},Rs=[],hh={},F_,Ci={},Yd={},S0=30,lu=[],vp="",yp=function(e){var t=e[0],n,i;if(Dr(t)||mn(t)||(e=[e]),!(n=(t._gsap||{}).harness)){for(i=lu.length;i--&&!lu[i].targetTest(t););n=lu[i]}for(i=e.length;i--;)e[i]&&(e[i]._gsap||(e[i]._gsap=new ox(e[i],n)))||e.splice(i,1);return e},ho=function(e){return e._gsap||yp(Yi(e))[0]._gsap},U_=function(e,t,n){return(n=e[t])&&mn(n)?e[t]():pp(n)&&e.getAttribute&&e.getAttribute(t)||n},vi=function(e,t){return(e=e.split(",")).forEach(t)||e},gn=function(e){return Math.round(e*1e5)/1e5||0},Tn=function(e){return Math.round(e*1e7)/1e7||0},da=function(e,t){var n=t.charAt(0),i=parseFloat(t.substr(2));return e=parseFloat(e),n==="+"?e+i:n==="-"?e-i:n==="*"?e*i:e/i},lA=function(e,t){for(var n=t.length,i=0;e.indexOf(t[i])<0&&++i<n;);return i<n},Pu=function(){var e=Rs.length,t=Rs.slice(0),n,i;for(hh={},Rs.length=0,n=0;n<e;n++)i=t[n],i&&i._lazy&&(i.render(i._lazy[0],i._lazy[1],!0)._lazy=0)},k_=function(e,t,n,i){Rs.length&&!Vn&&Pu(),e.render(t,n,Vn&&t<0&&(e._initted||e._startAt)),Rs.length&&!Vn&&Pu()},B_=function(e){var t=parseFloat(e);return(t||t===0)&&(e+"").match(D_).length<2?t:kn(e)?e.trim():e},z_=function(e){return e},Fi=function(e,t){for(var n in t)n in e||(e[n]=t[n]);return e},cA=function(e){return function(t,n){for(var i in n)i in t||i==="duration"&&e||i==="ease"||(t[i]=n[i])}},Pa=function(e,t){for(var n in t)e[n]=t[n];return e},M0=function r(e,t){for(var n in t)n!=="__proto__"&&n!=="constructor"&&n!=="prototype"&&(e[n]=Dr(t[n])?r(e[n]||(e[n]={}),t[n]):t[n]);return e},Lu=function(e,t){var n={},i;for(i in e)i in t||(n[i]=e[i]);return n},Tl=function(e){var t=e.parent||fn,n=e.keyframes?cA(Kn(e.keyframes)):Fi;if(xi(e.inherit))for(;t;)n(e,t.vars.defaults),t=t.parent||t._dp;return e},uA=function(e,t){for(var n=e.length,i=n===t.length;i&&n--&&e[n]===t[n];);return n<0},V_=function(e,t,n,i,s){var o=e[i],a;if(s)for(a=t[s];o&&o[s]>a;)o=o._prev;return o?(t._next=o._next,o._next=t):(t._next=e[n],e[n]=t),t._next?t._next._prev=t:e[i]=t,t._prev=o,t.parent=t._dp=e,t},Zu=function(e,t,n,i){n===void 0&&(n="_first"),i===void 0&&(i="_last");var s=t._prev,o=t._next;s?s._next=o:e[n]===t&&(e[n]=o),o?o._prev=s:e[i]===t&&(e[i]=s),t._next=t._prev=t.parent=null},Ns=function(e,t){e.parent&&(!t||e.parent.autoRemoveChildren)&&e.parent.remove&&e.parent.remove(e),e._act=0},po=function(e,t){if(e&&(!t||t._end>e._dur||t._start<0))for(var n=e;n;)n._dirty=1,n=n.parent;return e},dA=function(e){for(var t=e.parent;t&&t.parent;)t._dirty=1,t.totalDuration(),t=t.parent;return e},ph=function(e,t,n,i){return e._startAt&&(Vn?e._startAt.revert(au):e.vars.immediateRender&&!e.vars.autoRevert||e._startAt.render(t,!0,i))},fA=function r(e){return!e||e._ts&&r(e.parent)},T0=function(e){return e._repeat?La(e._tTime,e=e.duration()+e._rDelay)*e:0},La=function(e,t){var n=Math.floor(e=Tn(e/t));return e&&n===e?n-1:n},Du=function(e,t){return(e-t._start)*t._ts+(t._ts>=0?0:t._dirty?t.totalDuration():t._tDur)},Ju=function(e){return e._end=Tn(e._start+(e._tDur/Math.abs(e._ts||e._rts||Qt)||0))},Qu=function(e,t){var n=e._dp;return n&&n.smoothChildTiming&&e._ts&&(e._start=Tn(n._time-(e._ts>0?t/e._ts:((e._dirty?e.totalDuration():e._tDur)-t)/-e._ts)),Ju(e),n._dirty||po(n,e)),e},H_=function(e,t){var n;if((t._time||!t._dur&&t._initted||t._start<e._time&&(t._dur||!t.add))&&(n=Du(e.rawTime(),t),(!t._dur||ac(0,t.totalDuration(),n)-t._tTime>Qt)&&t.render(n,!0)),po(e,t)._dp&&e._initted&&e._time>=e._dur&&e._ts){if(e._dur<e.duration())for(n=e;n._dp;)n.rawTime()>=0&&n.totalTime(n._tTime),n=n._dp;e._zTime=-Qt}},yr=function(e,t,n,i){return t.parent&&Ns(t),t._start=Tn((ns(n)?n:n||e!==fn?ki(e,n,t):e._time)+t._delay),t._end=Tn(t._start+(t.totalDuration()/Math.abs(t.timeScale())||0)),V_(e,t,"_first","_last",e._sort?"_start":0),mh(t)||(e._recent=t),i||H_(e,t),e._ts<0&&Qu(e,e._tTime),e},G_=function(e,t){return(Ni.ScrollTrigger||_p("scrollTrigger",t))&&Ni.ScrollTrigger.create(t,e)},W_=function(e,t,n,i,s){if(wp(e,t,s),!e._initted)return 1;if(!n&&e._pt&&!Vn&&(e._dur&&e.vars.lazy!==!1||!e._dur&&e.vars.lazy)&&F_!==Pi.frame)return Rs.push(e),e._lazy=[s,i],1},hA=function r(e){var t=e.parent;return t&&t._ts&&t._initted&&!t._lock&&(t.rawTime()<0||r(t))},mh=function(e){var t=e.data;return t==="isFromStart"||t==="isStart"},pA=function(e,t,n,i){var s=e.ratio,o=t<0||!t&&(!e._start&&hA(e)&&!(!e._initted&&mh(e))||(e._ts<0||e._dp._ts<0)&&!mh(e))?0:1,a=e._rDelay,l=0,c,u,d;if(a&&e._repeat&&(l=ac(0,e._tDur,t),u=La(l,a),e._yoyo&&u&1&&(o=1-o),u!==La(e._tTime,a)&&(s=1-o,e.vars.repeatRefresh&&e._initted&&e.invalidate())),o!==s||Vn||i||e._zTime===Qt||!t&&e._zTime){if(!e._initted&&W_(e,t,i,n,l))return;for(d=e._zTime,e._zTime=t||(n?Qt:0),n||(n=t&&!d),e.ratio=o,e._from&&(o=1-o),e._time=0,e._tTime=l,c=e._pt;c;)c.r(o,c.d),c=c._next;t<0&&ph(e,t,n,!0),e._onUpdate&&!n&&Ii(e,"onUpdate"),l&&e._repeat&&!n&&e.parent&&Ii(e,"onRepeat"),(t>=e._tDur||t<0)&&e.ratio===o&&(o&&Ns(e,1),!n&&!Vn&&(Ii(e,o?"onComplete":"onReverseComplete",!0),e._prom&&e._prom()))}else e._zTime||(e._zTime=t)},mA=function(e,t,n){var i;if(n>t)for(i=e._first;i&&i._start<=n;){if(i.data==="isPause"&&i._start>t)return i;i=i._next}else for(i=e._last;i&&i._start>=n;){if(i.data==="isPause"&&i._start<t)return i;i=i._prev}},Da=function(e,t,n,i){var s=e._repeat,o=Tn(t)||0,a=e._tTime/e._tDur;return a&&!i&&(e._time*=o/e._dur),e._dur=o,e._tDur=s?s<0?1e10:Tn(o*(s+1)+e._rDelay*s):o,a>0&&!i&&Qu(e,e._tTime=e._tDur*a),e.parent&&Ju(e),n||po(e.parent,e),e},E0=function(e){return e instanceof ui?po(e):Da(e,e._dur)},gA={_start:0,endTime:jl,totalDuration:jl},ki=function r(e,t,n){var i=e.labels,s=e._recent||gA,o=e.duration()>=qi?s.endTime(!1):e._dur,a,l,c;return kn(t)&&(isNaN(t)||t in i)?(l=t.charAt(0),c=t.substr(-1)==="%",a=t.indexOf("="),l==="<"||l===">"?(a>=0&&(t=t.replace(/=/,"")),(l==="<"?s._start:s.endTime(s._repeat>=0))+(parseFloat(t.substr(1))||0)*(c?(a<0?s:n).totalDuration()/100:1)):a<0?(t in i||(i[t]=o),i[t]):(l=parseFloat(t.charAt(a-1)+t.substr(a+1)),c&&n&&(l=l/100*(Kn(n)?n[0]:n).totalDuration()),a>1?r(e,t.substr(0,a-1),n)+l:o+l)):t==null?o:+t},El=function(e,t,n){var i=ns(t[1]),s=(i?2:1)+(e<2?0:1),o=t[s],a,l;if(i&&(o.duration=t[1]),o.parent=n,e){for(a=o,l=n;l&&!("immediateRender"in a);)a=l.vars.defaults||{},l=xi(l.vars.inherit)&&l.parent;o.immediateRender=xi(a.immediateRender),e<2?o.runBackwards=1:o.startAt=t[s-1]}return new Sn(t[0],o,t[s+1])},Vs=function(e,t){return e||e===0?t(e):t},ac=function(e,t,n){return n<e?e:n>t?t:n},Yn=function(e,t){return!kn(e)||!(t=sA.exec(e))?"":t[1]},_A=function(e,t,n){return Vs(n,function(i){return ac(e,t,i)})},gh=[].slice,X_=function(e,t){return e&&Dr(e)&&"length"in e&&(!t&&!e.length||e.length-1 in e&&Dr(e[0]))&&!e.nodeType&&e!==_r},xA=function(e,t,n){return n===void 0&&(n=[]),e.forEach(function(i){var s;return kn(i)&&!t||X_(i,1)?(s=n).push.apply(s,Yi(i)):n.push(i)})||n},Yi=function(e,t,n){return cn&&!t&&cn.selector?cn.selector(e):kn(e)&&!n&&(fh||!Ia())?gh.call((t||gp).querySelectorAll(e),0):Kn(e)?xA(e,n):X_(e)?gh.call(e,0):e?[e]:[]},_h=function(e){return e=Yi(e)[0]||$l("Invalid scope")||{},function(t){var n=e.current||e.nativeElement||e;return Yi(t,n.querySelectorAll?n:n===e?$l("Invalid scope")||gp.createElement("div"):e)}},q_=function(e){return e.sort(function(){return .5-Math.random()})},Y_=function(e){if(mn(e))return e;var t=Dr(e)?e:{each:e},n=mo(t.ease),i=t.from||0,s=parseFloat(t.base)||0,o={},a=i>0&&i<1,l=isNaN(i)||a,c=t.axis,u=i,d=i;return kn(i)?u=d={center:.5,edges:.5,end:1}[i]||0:!a&&l&&(u=i[0],d=i[1]),function(f,h,_){var g=(_||t).length,m=o[g],p,b,x,v,E,M,T,R,w;if(!m){if(w=t.grid==="auto"?0:(t.grid||[1,qi])[1],!w){for(T=-qi;T<(T=_[w++].getBoundingClientRect().left)&&w<g;);w<g&&w--}for(m=o[g]=[],p=l?Math.min(w,g)*u-.5:i%w,b=w===qi?0:l?g*d/w-.5:i/w|0,T=0,R=qi,M=0;M<g;M++)x=M%w-p,v=b-(M/w|0),m[M]=E=c?Math.abs(c==="y"?v:x):C_(x*x+v*v),E>T&&(T=E),E<R&&(R=E);i==="random"&&q_(m),m.max=T-R,m.min=R,m.v=g=(parseFloat(t.amount)||parseFloat(t.each)*(w>g?g-1:c?c==="y"?g/w:w:Math.max(w,g/w))||0)*(i==="edges"?-1:1),m.b=g<0?s-g:s,m.u=Yn(t.amount||t.each)||0,n=n&&g<0?ix(n):n}return g=(m[f]-m.min)/m.max||0,Tn(m.b+(n?n(g):g)*m.v)+m.u}},xh=function(e){var t=Math.pow(10,((e+"").split(".")[1]||"").length);return function(n){var i=Tn(Math.round(parseFloat(n)/e)*e*t);return(i-i%1)/t+(ns(n)?0:Yn(n))}},$_=function(e,t){var n=Kn(e),i,s;return!n&&Dr(e)&&(i=n=e.radius||qi,e.values?(e=Yi(e.values),(s=!ns(e[0]))&&(i*=i)):e=xh(e.increment)),Vs(t,n?mn(e)?function(o){return s=e(o),Math.abs(s-o)<=i?s:o}:function(o){for(var a=parseFloat(s?o.x:o),l=parseFloat(s?o.y:0),c=qi,u=0,d=e.length,f,h;d--;)s?(f=e[d].x-a,h=e[d].y-l,f=f*f+h*h):f=Math.abs(e[d]-a),f<c&&(c=f,u=d);return u=!i||c<=i?e[u]:o,s||u===o||ns(o)?u:u+Yn(o)}:xh(e))},j_=function(e,t,n,i){return Vs(Kn(e)?!t:n===!0?!!(n=0):!i,function(){return Kn(e)?e[~~(Math.random()*e.length)]:(n=n||1e-5)&&(i=n<1?Math.pow(10,(n+"").length-2):1)&&Math.floor(Math.round((e-n/2+Math.random()*(t-e+n*.99))/n)*n*i)/i})},vA=function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return function(i){return t.reduce(function(s,o){return o(s)},i)}},yA=function(e,t){return function(n){return e(parseFloat(n))+(t||Yn(n))}},bA=function(e,t,n){return Z_(e,t,0,1,n)},K_=function(e,t,n){return Vs(n,function(i){return e[~~t(i)]})},wA=function r(e,t,n){var i=t-e;return Kn(e)?K_(e,r(0,e.length),t):Vs(n,function(s){return(i+(s-e)%i)%i+e})},SA=function r(e,t,n){var i=t-e,s=i*2;return Kn(e)?K_(e,r(0,e.length-1),t):Vs(n,function(o){return o=(s+(o-e)%s)%s||0,e+(o>i?s-o:o)})},Kl=function(e){for(var t=0,n="",i,s,o,a;~(i=e.indexOf("random(",t));)o=e.indexOf(")",i),a=e.charAt(i+7)==="[",s=e.substr(i+7,o-i-7).match(a?D_:dh),n+=e.substr(t,i-t)+j_(a?s:+s[0],a?0:+s[1],+s[2]||1e-5),t=o+1;return n+e.substr(t,e.length-t)},Z_=function(e,t,n,i,s){var o=t-e,a=i-n;return Vs(s,function(l){return n+((l-e)/o*a||0)})},MA=function r(e,t,n,i){var s=isNaN(e+t)?0:function(h){return(1-h)*e+h*t};if(!s){var o=kn(e),a={},l,c,u,d,f;if(n===!0&&(i=1)&&(n=null),o)e={p:e},t={p:t};else if(Kn(e)&&!Kn(t)){for(u=[],d=e.length,f=d-2,c=1;c<d;c++)u.push(r(e[c-1],e[c]));d--,s=function(_){_*=d;var g=Math.min(f,~~_);return u[g](_-g)},n=t}else i||(e=Pa(Kn(e)?[]:{},e));if(!u){for(l in t)bp.call(a,e,l,"get",t[l]);s=function(_){return Tp(_,a)||(o?e.p:e)}}}return Vs(n,s)},A0=function(e,t,n){var i=e.labels,s=qi,o,a,l;for(o in i)a=i[o]-t,a<0==!!n&&a&&s>(a=Math.abs(a))&&(l=o,s=a);return l},Ii=function(e,t,n){var i=e.vars,s=i[t],o=cn,a=e._ctx,l,c,u;if(s)return l=i[t+"Params"],c=i.callbackScope||e,n&&Rs.length&&Pu(),a&&(cn=a),u=l?s.apply(c,l):s.call(c),cn=o,u},ul=function(e){return Ns(e),e.scrollTrigger&&e.scrollTrigger.kill(!!Vn),e.progress()<1&&Ii(e,"onInterrupt"),e},oa,J_=[],Q_=function(e){if(e)if(e=!e.name&&e.default||e,mp()||e.headless){var t=e.name,n=mn(e),i=t&&!n&&e.init?function(){this._props=[]}:e,s={init:jl,render:Tp,add:bp,kill:zA,modifier:BA,rawVars:0},o={targetTest:0,get:0,getSetter:Mp,aliases:{},register:0};if(Ia(),e!==i){if(Ci[t])return;Fi(i,Fi(Lu(e,s),o)),Pa(i.prototype,Pa(s,Lu(e,o))),Ci[i.prop=t]=i,e.targetTest&&(lu.push(i),xp[t]=1),t=(t==="css"?"CSS":t.charAt(0).toUpperCase()+t.substr(1))+"Plugin"}N_(t,i),e.register&&e.register(wi,i,yi)}else J_.push(e)},Zt=255,dl={aqua:[0,Zt,Zt],lime:[0,Zt,0],silver:[192,192,192],black:[0,0,0],maroon:[128,0,0],teal:[0,128,128],blue:[0,0,Zt],navy:[0,0,128],white:[Zt,Zt,Zt],olive:[128,128,0],yellow:[Zt,Zt,0],orange:[Zt,165,0],gray:[128,128,128],purple:[128,0,128],green:[0,128,0],red:[Zt,0,0],pink:[Zt,192,203],cyan:[0,Zt,Zt],transparent:[Zt,Zt,Zt,0]},$d=function(e,t,n){return e+=e<0?1:e>1?-1:0,(e*6<1?t+(n-t)*e*6:e<.5?n:e*3<2?t+(n-t)*(2/3-e)*6:t)*Zt+.5|0},ex=function(e,t,n){var i=e?ns(e)?[e>>16,e>>8&Zt,e&Zt]:0:dl.black,s,o,a,l,c,u,d,f,h,_;if(!i){if(e.substr(-1)===","&&(e=e.substr(0,e.length-1)),dl[e])i=dl[e];else if(e.charAt(0)==="#"){if(e.length<6&&(s=e.charAt(1),o=e.charAt(2),a=e.charAt(3),e="#"+s+s+o+o+a+a+(e.length===5?e.charAt(4)+e.charAt(4):"")),e.length===9)return i=parseInt(e.substr(1,6),16),[i>>16,i>>8&Zt,i&Zt,parseInt(e.substr(7),16)/255];e=parseInt(e.substr(1),16),i=[e>>16,e>>8&Zt,e&Zt]}else if(e.substr(0,3)==="hsl"){if(i=_=e.match(dh),!t)l=+i[0]%360/360,c=+i[1]/100,u=+i[2]/100,o=u<=.5?u*(c+1):u+c-u*c,s=u*2-o,i.length>3&&(i[3]*=1),i[0]=$d(l+1/3,s,o),i[1]=$d(l,s,o),i[2]=$d(l-1/3,s,o);else if(~e.indexOf("="))return i=e.match(P_),n&&i.length<4&&(i[3]=1),i}else i=e.match(dh)||dl.transparent;i=i.map(Number)}return t&&!_&&(s=i[0]/Zt,o=i[1]/Zt,a=i[2]/Zt,d=Math.max(s,o,a),f=Math.min(s,o,a),u=(d+f)/2,d===f?l=c=0:(h=d-f,c=u>.5?h/(2-d-f):h/(d+f),l=d===s?(o-a)/h+(o<a?6:0):d===o?(a-s)/h+2:(s-o)/h+4,l*=60),i[0]=~~(l+.5),i[1]=~~(c*100+.5),i[2]=~~(u*100+.5)),n&&i.length<4&&(i[3]=1),i},tx=function(e){var t=[],n=[],i=-1;return e.split(Ps).forEach(function(s){var o=s.match(sa)||[];t.push.apply(t,o),n.push(i+=o.length+1)}),t.c=n,t},C0=function(e,t,n){var i="",s=(e+i).match(Ps),o=t?"hsla(":"rgba(",a=0,l,c,u,d;if(!s)return e;if(s=s.map(function(f){return(f=ex(f,t,1))&&o+(t?f[0]+","+f[1]+"%,"+f[2]+"%,"+f[3]:f.join(","))+")"}),n&&(u=tx(e),l=n.c,l.join(i)!==u.c.join(i)))for(c=e.replace(Ps,"1").split(sa),d=c.length-1;a<d;a++)i+=c[a]+(~l.indexOf(a)?s.shift()||o+"0,0,0,0)":(u.length?u:s.length?s:n).shift());if(!c)for(c=e.split(Ps),d=c.length-1;a<d;a++)i+=c[a]+s[a];return i+c[d]},Ps=(function(){var r="(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b",e;for(e in dl)r+="|"+e+"\\b";return new RegExp(r+")","gi")})(),TA=/hsl[a]?\(/,nx=function(e){var t=e.join(" "),n;if(Ps.lastIndex=0,Ps.test(t))return n=TA.test(t),e[1]=C0(e[1],n),e[0]=C0(e[0],n,tx(e[1])),!0},Zl,Pi=(function(){var r=Date.now,e=500,t=33,n=r(),i=n,s=1e3/240,o=s,a=[],l,c,u,d,f,h,_=function g(m){var p=r()-i,b=m===!0,x,v,E,M;if((p>e||p<0)&&(n+=p-t),i+=p,E=i-n,x=E-o,(x>0||b)&&(M=++d.frame,f=E-d.time*1e3,d.time=E=E/1e3,o+=x+(x>=s?4:s-x),v=1),b||(l=c(g)),v)for(h=0;h<a.length;h++)a[h](E,f,M,m)};return d={time:0,frame:0,tick:function(){_(!0)},deltaRatio:function(m){return f/(1e3/(m||60))},wake:function(){I_&&(!fh&&mp()&&(_r=fh=window,gp=_r.document||{},Ni.gsap=wi,(_r.gsapVersions||(_r.gsapVersions=[])).push(wi.version),O_(Ru||_r.GreenSockGlobals||!_r.gsap&&_r||{}),J_.forEach(Q_)),u=typeof requestAnimationFrame<"u"&&requestAnimationFrame,l&&d.sleep(),c=u||function(m){return setTimeout(m,o-d.time*1e3+1|0)},Zl=1,_(2))},sleep:function(){(u?cancelAnimationFrame:clearTimeout)(l),Zl=0,c=jl},lagSmoothing:function(m,p){e=m||1/0,t=Math.min(p||33,e)},fps:function(m){s=1e3/(m||240),o=d.time*1e3+s},add:function(m,p,b){var x=p?function(v,E,M,T){m(v,E,M,T),d.remove(x)}:m;return d.remove(m),a[b?"unshift":"push"](x),Ia(),x},remove:function(m,p){~(p=a.indexOf(m))&&a.splice(p,1)&&h>=p&&h--},_listeners:a},d})(),Ia=function(){return!Zl&&Pi.wake()},Nt={},EA=/^[\d.\-M][\d.\-,\s]/,AA=/["']/g,CA=function(e){for(var t={},n=e.substr(1,e.length-3).split(":"),i=n[0],s=1,o=n.length,a,l,c;s<o;s++)l=n[s],a=s!==o-1?l.lastIndexOf(","):l.length,c=l.substr(0,a),t[i]=isNaN(c)?c.replace(AA,"").trim():+c,i=l.substr(a+1).trim();return t},RA=function(e){var t=e.indexOf("(")+1,n=e.indexOf(")"),i=e.indexOf("(",t);return e.substring(t,~i&&i<n?e.indexOf(")",n+1):n)},PA=function(e){var t=(e+"").split("("),n=Nt[t[0]];return n&&t.length>1&&n.config?n.config.apply(null,~e.indexOf("{")?[CA(t[1])]:RA(e).split(",").map(B_)):Nt._CE&&EA.test(e)?Nt._CE("",e):n},ix=function(e){return function(t){return 1-e(1-t)}},rx=function r(e,t){for(var n=e._first,i;n;)n instanceof ui?r(n,t):n.vars.yoyoEase&&(!n._yoyo||!n._repeat)&&n._yoyo!==t&&(n.timeline?r(n.timeline,t):(i=n._ease,n._ease=n._yEase,n._yEase=i,n._yoyo=t)),n=n._next},mo=function(e,t){return e&&(mn(e)?e:Nt[e]||PA(e))||t},Ro=function(e,t,n,i){n===void 0&&(n=function(l){return 1-t(1-l)}),i===void 0&&(i=function(l){return l<.5?t(l*2)/2:1-t((1-l)*2)/2});var s={easeIn:t,easeOut:n,easeInOut:i},o;return vi(e,function(a){Nt[a]=Ni[a]=s,Nt[o=a.toLowerCase()]=n;for(var l in s)Nt[o+(l==="easeIn"?".in":l==="easeOut"?".out":".inOut")]=Nt[a+"."+l]=s[l]}),s},sx=function(e){return function(t){return t<.5?(1-e(1-t*2))/2:.5+e((t-.5)*2)/2}},jd=function r(e,t,n){var i=t>=1?t:1,s=(n||(e?.3:.45))/(t<1?t:1),o=s/uh*(Math.asin(1/i)||0),a=function(u){return u===1?1:i*Math.pow(2,-10*u)*rA((u-o)*s)+1},l=e==="out"?a:e==="in"?function(c){return 1-a(1-c)}:sx(a);return s=uh/s,l.config=function(c,u){return r(e,c,u)},l},Kd=function r(e,t){t===void 0&&(t=1.70158);var n=function(o){return o?--o*o*((t+1)*o+t)+1:0},i=e==="out"?n:e==="in"?function(s){return 1-n(1-s)}:sx(n);return i.config=function(s){return r(e,s)},i};vi("Linear,Quad,Cubic,Quart,Quint,Strong",function(r,e){var t=e<5?e+1:e;Ro(r+",Power"+(t-1),e?function(n){return Math.pow(n,t)}:function(n){return n},function(n){return 1-Math.pow(1-n,t)},function(n){return n<.5?Math.pow(n*2,t)/2:1-Math.pow((1-n)*2,t)/2})});Nt.Linear.easeNone=Nt.none=Nt.Linear.easeIn;Ro("Elastic",jd("in"),jd("out"),jd());(function(r,e){var t=1/e,n=2*t,i=2.5*t,s=function(a){return a<t?r*a*a:a<n?r*Math.pow(a-1.5/e,2)+.75:a<i?r*(a-=2.25/e)*a+.9375:r*Math.pow(a-2.625/e,2)+.984375};Ro("Bounce",function(o){return 1-s(1-o)},s)})(7.5625,2.75);Ro("Expo",function(r){return Math.pow(2,10*(r-1))*r+r*r*r*r*r*r*(1-r)});Ro("Circ",function(r){return-(C_(1-r*r)-1)});Ro("Sine",function(r){return r===1?1:-iA(r*tA)+1});Ro("Back",Kd("in"),Kd("out"),Kd());Nt.SteppedEase=Nt.steps=Ni.SteppedEase={config:function(e,t){e===void 0&&(e=1);var n=1/e,i=e+(t?0:1),s=t?1:0,o=1-Qt;return function(a){return((i*ac(0,o,a)|0)+s)*n}}};Ra.ease=Nt["quad.out"];vi("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt",function(r){return vp+=r+","+r+"Params,"});var ox=function(e,t){this.id=nA++,e._gsap=this,this.target=e,this.harness=t,this.get=t?t.get:U_,this.set=t?t.getSetter:Mp},Jl=(function(){function r(t){this.vars=t,this._delay=+t.delay||0,(this._repeat=t.repeat===1/0?-2:t.repeat||0)&&(this._rDelay=t.repeatDelay||0,this._yoyo=!!t.yoyo||!!t.yoyoEase),this._ts=1,Da(this,+t.duration,1,1),this.data=t.data,cn&&(this._ctx=cn,cn.data.push(this)),Zl||Pi.wake()}var e=r.prototype;return e.delay=function(n){return n||n===0?(this.parent&&this.parent.smoothChildTiming&&this.startTime(this._start+n-this._delay),this._delay=n,this):this._delay},e.duration=function(n){return arguments.length?this.totalDuration(this._repeat>0?n+(n+this._rDelay)*this._repeat:n):this.totalDuration()&&this._dur},e.totalDuration=function(n){return arguments.length?(this._dirty=0,Da(this,this._repeat<0?n:(n-this._repeat*this._rDelay)/(this._repeat+1))):this._tDur},e.totalTime=function(n,i){if(Ia(),!arguments.length)return this._tTime;var s=this._dp;if(s&&s.smoothChildTiming&&this._ts){for(Qu(this,n),!s._dp||s.parent||H_(s,this);s&&s.parent;)s.parent._time!==s._start+(s._ts>=0?s._tTime/s._ts:(s.totalDuration()-s._tTime)/-s._ts)&&s.totalTime(s._tTime,!0),s=s.parent;!this.parent&&this._dp.autoRemoveChildren&&(this._ts>0&&n<this._tDur||this._ts<0&&n>0||!this._tDur&&!n)&&yr(this._dp,this,this._start-this._delay)}return(this._tTime!==n||!this._dur&&!i||this._initted&&Math.abs(this._zTime)===Qt||!n&&!this._initted&&(this.add||this._ptLookup))&&(this._ts||(this._pTime=n),k_(this,n,i)),this},e.time=function(n,i){return arguments.length?this.totalTime(Math.min(this.totalDuration(),n+T0(this))%(this._dur+this._rDelay)||(n?this._dur:0),i):this._time},e.totalProgress=function(n,i){return arguments.length?this.totalTime(this.totalDuration()*n,i):this.totalDuration()?Math.min(1,this._tTime/this._tDur):this.rawTime()>=0&&this._initted?1:0},e.progress=function(n,i){return arguments.length?this.totalTime(this.duration()*(this._yoyo&&!(this.iteration()&1)?1-n:n)+T0(this),i):this.duration()?Math.min(1,this._time/this._dur):this.rawTime()>0?1:0},e.iteration=function(n,i){var s=this.duration()+this._rDelay;return arguments.length?this.totalTime(this._time+(n-1)*s,i):this._repeat?La(this._tTime,s)+1:1},e.timeScale=function(n,i){if(!arguments.length)return this._rts===-Qt?0:this._rts;if(this._rts===n)return this;var s=this.parent&&this._ts?Du(this.parent._time,this):this._tTime;return this._rts=+n||0,this._ts=this._ps||n===-Qt?0:this._rts,this.totalTime(ac(-Math.abs(this._delay),this._tDur,s),i!==!1),Ju(this),dA(this)},e.paused=function(n){return arguments.length?(this._ps!==n&&(this._ps=n,n?(this._pTime=this._tTime||Math.max(-this._delay,this.rawTime()),this._ts=this._act=0):(Ia(),this._ts=this._rts,this.totalTime(this.parent&&!this.parent.smoothChildTiming?this.rawTime():this._tTime||this._pTime,this.progress()===1&&Math.abs(this._zTime)!==Qt&&(this._tTime-=Qt)))),this):this._ps},e.startTime=function(n){if(arguments.length){this._start=n;var i=this.parent||this._dp;return i&&(i._sort||!this.parent)&&yr(i,this,n-this._delay),this}return this._start},e.endTime=function(n){return this._start+(xi(n)?this.totalDuration():this.duration())/Math.abs(this._ts||1)},e.rawTime=function(n){var i=this.parent||this._dp;return i?n&&(!this._ts||this._repeat&&this._time&&this.totalProgress()<1)?this._tTime%(this._dur+this._rDelay):this._ts?Du(i.rawTime(n),this):this._tTime:this._tTime},e.revert=function(n){n===void 0&&(n=aA);var i=Vn;return Vn=n,(this._initted||this._startAt)&&(this.timeline&&this.timeline.revert(n),this.totalTime(-.01,n.suppressEvents)),this.data!=="nested"&&n.kill!==!1&&this.kill(),Vn=i,this},e.globalTime=function(n){for(var i=this,s=arguments.length?n:i.rawTime();i;)s=i._start+s/(Math.abs(i._ts)||1),i=i._dp;return!this.parent&&this._sat?this._sat.globalTime(n):s},e.repeat=function(n){return arguments.length?(this._repeat=n===1/0?-2:n,E0(this)):this._repeat===-2?1/0:this._repeat},e.repeatDelay=function(n){if(arguments.length){var i=this._time;return this._rDelay=n,E0(this),i?this.time(i):this}return this._rDelay},e.yoyo=function(n){return arguments.length?(this._yoyo=n,this):this._yoyo},e.seek=function(n,i){return this.totalTime(ki(this,n),xi(i))},e.restart=function(n,i){return this.play().totalTime(n?-this._delay:0,xi(i)),this._dur||(this._zTime=-Qt),this},e.play=function(n,i){return n!=null&&this.seek(n,i),this.reversed(!1).paused(!1)},e.reverse=function(n,i){return n!=null&&this.seek(n||this.totalDuration(),i),this.reversed(!0).paused(!1)},e.pause=function(n,i){return n!=null&&this.seek(n,i),this.paused(!0)},e.resume=function(){return this.paused(!1)},e.reversed=function(n){return arguments.length?(!!n!==this.reversed()&&this.timeScale(-this._rts||(n?-Qt:0)),this):this._rts<0},e.invalidate=function(){return this._initted=this._act=0,this._zTime=-Qt,this},e.isActive=function(){var n=this.parent||this._dp,i=this._start,s;return!!(!n||this._ts&&this._initted&&n.isActive()&&(s=n.rawTime(!0))>=i&&s<this.endTime(!0)-Qt)},e.eventCallback=function(n,i,s){var o=this.vars;return arguments.length>1?(i?(o[n]=i,s&&(o[n+"Params"]=s),n==="onUpdate"&&(this._onUpdate=i)):delete o[n],this):o[n]},e.then=function(n){var i=this;return new Promise(function(s){var o=mn(n)?n:z_,a=function(){var c=i.then;i.then=null,mn(o)&&(o=o(i))&&(o.then||o===i)&&(i.then=c),s(o),i.then=c};i._initted&&i.totalProgress()===1&&i._ts>=0||!i._tTime&&i._ts<0?a():i._prom=a})},e.kill=function(){ul(this)},r})();Fi(Jl.prototype,{_time:0,_start:0,_end:0,_tTime:0,_tDur:0,_dirty:0,_repeat:0,_yoyo:!1,parent:null,_initted:!1,_rDelay:0,_ts:1,_dp:0,ratio:0,_zTime:-Qt,_prom:0,_ps:!1,_rts:1});var ui=(function(r){A_(e,r);function e(n,i){var s;return n===void 0&&(n={}),s=r.call(this,n)||this,s.labels={},s.smoothChildTiming=!!n.smoothChildTiming,s.autoRemoveChildren=!!n.autoRemoveChildren,s._sort=xi(n.sortChildren),fn&&yr(n.parent||fn,Gr(s),i),n.reversed&&s.reverse(),n.paused&&s.paused(!0),n.scrollTrigger&&G_(Gr(s),n.scrollTrigger),s}var t=e.prototype;return t.to=function(i,s,o){return El(0,arguments,this),this},t.from=function(i,s,o){return El(1,arguments,this),this},t.fromTo=function(i,s,o,a){return El(2,arguments,this),this},t.set=function(i,s,o){return s.duration=0,s.parent=this,Tl(s).repeatDelay||(s.repeat=0),s.immediateRender=!!s.immediateRender,new Sn(i,s,ki(this,o),1),this},t.call=function(i,s,o){return yr(this,Sn.delayedCall(0,i,s),o)},t.staggerTo=function(i,s,o,a,l,c,u){return o.duration=s,o.stagger=o.stagger||a,o.onComplete=c,o.onCompleteParams=u,o.parent=this,new Sn(i,o,ki(this,l)),this},t.staggerFrom=function(i,s,o,a,l,c,u){return o.runBackwards=1,Tl(o).immediateRender=xi(o.immediateRender),this.staggerTo(i,s,o,a,l,c,u)},t.staggerFromTo=function(i,s,o,a,l,c,u,d){return a.startAt=o,Tl(a).immediateRender=xi(a.immediateRender),this.staggerTo(i,s,a,l,c,u,d)},t.render=function(i,s,o){var a=this._time,l=this._dirty?this.totalDuration():this._tDur,c=this._dur,u=i<=0?0:Tn(i),d=this._zTime<0!=i<0&&(this._initted||!c),f,h,_,g,m,p,b,x,v,E,M,T;if(this!==fn&&u>l&&i>=0&&(u=l),u!==this._tTime||o||d){if(a!==this._time&&c&&(u+=this._time-a,i+=this._time-a),f=u,v=this._start,x=this._ts,p=!x,d&&(c||(a=this._zTime),(i||!s)&&(this._zTime=i)),this._repeat){if(M=this._yoyo,m=c+this._rDelay,this._repeat<-1&&i<0)return this.totalTime(m*100+i,s,o);if(f=Tn(u%m),u===l?(g=this._repeat,f=c):(E=Tn(u/m),g=~~E,g&&g===E&&(f=c,g--),f>c&&(f=c)),E=La(this._tTime,m),!a&&this._tTime&&E!==g&&this._tTime-E*m-this._dur<=0&&(E=g),M&&g&1&&(f=c-f,T=1),g!==E&&!this._lock){var R=M&&E&1,w=R===(M&&g&1);if(g<E&&(R=!R),a=R?0:u%c?c:u,this._lock=1,this.render(a||(T?0:Tn(g*m)),s,!c)._lock=0,this._tTime=u,!s&&this.parent&&Ii(this,"onRepeat"),this.vars.repeatRefresh&&!T&&(this.invalidate()._lock=1),a&&a!==this._time||p!==!this._ts||this.vars.onRepeat&&!this.parent&&!this._act)return this;if(c=this._dur,l=this._tDur,w&&(this._lock=2,a=R?c:-1e-4,this.render(a,!0),this.vars.repeatRefresh&&!T&&this.invalidate()),this._lock=0,!this._ts&&!p)return this;rx(this,T)}}if(this._hasPause&&!this._forcing&&this._lock<2&&(b=mA(this,Tn(a),Tn(f)),b&&(u-=f-(f=b._start))),this._tTime=u,this._time=f,this._act=!x,this._initted||(this._onUpdate=this.vars.onUpdate,this._initted=1,this._zTime=i,a=0),!a&&f&&!s&&!g&&(Ii(this,"onStart"),this._tTime!==u))return this;if(f>=a&&i>=0)for(h=this._first;h;){if(_=h._next,(h._act||f>=h._start)&&h._ts&&b!==h){if(h.parent!==this)return this.render(i,s,o);if(h.render(h._ts>0?(f-h._start)*h._ts:(h._dirty?h.totalDuration():h._tDur)+(f-h._start)*h._ts,s,o),f!==this._time||!this._ts&&!p){b=0,_&&(u+=this._zTime=-Qt);break}}h=_}else{h=this._last;for(var y=i<0?i:f;h;){if(_=h._prev,(h._act||y<=h._end)&&h._ts&&b!==h){if(h.parent!==this)return this.render(i,s,o);if(h.render(h._ts>0?(y-h._start)*h._ts:(h._dirty?h.totalDuration():h._tDur)+(y-h._start)*h._ts,s,o||Vn&&(h._initted||h._startAt)),f!==this._time||!this._ts&&!p){b=0,_&&(u+=this._zTime=y?-Qt:Qt);break}}h=_}}if(b&&!s&&(this.pause(),b.render(f>=a?0:-Qt)._zTime=f>=a?1:-1,this._ts))return this._start=v,Ju(this),this.render(i,s,o);this._onUpdate&&!s&&Ii(this,"onUpdate",!0),(u===l&&this._tTime>=this.totalDuration()||!u&&a)&&(v===this._start||Math.abs(x)!==Math.abs(this._ts))&&(this._lock||((i||!c)&&(u===l&&this._ts>0||!u&&this._ts<0)&&Ns(this,1),!s&&!(i<0&&!a)&&(u||a||!l)&&(Ii(this,u===l&&i>=0?"onComplete":"onReverseComplete",!0),this._prom&&!(u<l&&this.timeScale()>0)&&this._prom())))}return this},t.add=function(i,s){var o=this;if(ns(s)||(s=ki(this,s,i)),!(i instanceof Jl)){if(Kn(i))return i.forEach(function(a){return o.add(a,s)}),this;if(kn(i))return this.addLabel(i,s);if(mn(i))i=Sn.delayedCall(0,i);else return this}return this!==i?yr(this,i,s):this},t.getChildren=function(i,s,o,a){i===void 0&&(i=!0),s===void 0&&(s=!0),o===void 0&&(o=!0),a===void 0&&(a=-qi);for(var l=[],c=this._first;c;)c._start>=a&&(c instanceof Sn?s&&l.push(c):(o&&l.push(c),i&&l.push.apply(l,c.getChildren(!0,s,o)))),c=c._next;return l},t.getById=function(i){for(var s=this.getChildren(1,1,1),o=s.length;o--;)if(s[o].vars.id===i)return s[o]},t.remove=function(i){return kn(i)?this.removeLabel(i):mn(i)?this.killTweensOf(i):(i.parent===this&&Zu(this,i),i===this._recent&&(this._recent=this._last),po(this))},t.totalTime=function(i,s){return arguments.length?(this._forcing=1,!this._dp&&this._ts&&(this._start=Tn(Pi.time-(this._ts>0?i/this._ts:(this.totalDuration()-i)/-this._ts))),r.prototype.totalTime.call(this,i,s),this._forcing=0,this):this._tTime},t.addLabel=function(i,s){return this.labels[i]=ki(this,s),this},t.removeLabel=function(i){return delete this.labels[i],this},t.addPause=function(i,s,o){var a=Sn.delayedCall(0,s||jl,o);return a.data="isPause",this._hasPause=1,yr(this,a,ki(this,i))},t.removePause=function(i){var s=this._first;for(i=ki(this,i);s;)s._start===i&&s.data==="isPause"&&Ns(s),s=s._next},t.killTweensOf=function(i,s,o){for(var a=this.getTweensOf(i,o),l=a.length;l--;)ys!==a[l]&&a[l].kill(i,s);return this},t.getTweensOf=function(i,s){for(var o=[],a=Yi(i),l=this._first,c=ns(s),u;l;)l instanceof Sn?lA(l._targets,a)&&(c?(!ys||l._initted&&l._ts)&&l.globalTime(0)<=s&&l.globalTime(l.totalDuration())>s:!s||l.isActive())&&o.push(l):(u=l.getTweensOf(a,s)).length&&o.push.apply(o,u),l=l._next;return o},t.tweenTo=function(i,s){s=s||{};var o=this,a=ki(o,i),l=s,c=l.startAt,u=l.onStart,d=l.onStartParams,f=l.immediateRender,h,_=Sn.to(o,Fi({ease:s.ease||"none",lazy:!1,immediateRender:!1,time:a,overwrite:"auto",duration:s.duration||Math.abs((a-(c&&"time"in c?c.time:o._time))/o.timeScale())||Qt,onStart:function(){if(o.pause(),!h){var m=s.duration||Math.abs((a-(c&&"time"in c?c.time:o._time))/o.timeScale());_._dur!==m&&Da(_,m,0,1).render(_._time,!0,!0),h=1}u&&u.apply(_,d||[])}},s));return f?_.render(0):_},t.tweenFromTo=function(i,s,o){return this.tweenTo(s,Fi({startAt:{time:ki(this,i)}},o))},t.recent=function(){return this._recent},t.nextLabel=function(i){return i===void 0&&(i=this._time),A0(this,ki(this,i))},t.previousLabel=function(i){return i===void 0&&(i=this._time),A0(this,ki(this,i),1)},t.currentLabel=function(i){return arguments.length?this.seek(i,!0):this.previousLabel(this._time+Qt)},t.shiftChildren=function(i,s,o){o===void 0&&(o=0);for(var a=this._first,l=this.labels,c;a;)a._start>=o&&(a._start+=i,a._end+=i),a=a._next;if(s)for(c in l)l[c]>=o&&(l[c]+=i);return po(this)},t.invalidate=function(i){var s=this._first;for(this._lock=0;s;)s.invalidate(i),s=s._next;return r.prototype.invalidate.call(this,i)},t.clear=function(i){i===void 0&&(i=!0);for(var s=this._first,o;s;)o=s._next,this.remove(s),s=o;return this._dp&&(this._time=this._tTime=this._pTime=0),i&&(this.labels={}),po(this)},t.totalDuration=function(i){var s=0,o=this,a=o._last,l=qi,c,u,d;if(arguments.length)return o.timeScale((o._repeat<0?o.duration():o.totalDuration())/(o.reversed()?-i:i));if(o._dirty){for(d=o.parent;a;)c=a._prev,a._dirty&&a.totalDuration(),u=a._start,u>l&&o._sort&&a._ts&&!o._lock?(o._lock=1,yr(o,a,u-a._delay,1)._lock=0):l=u,u<0&&a._ts&&(s-=u,(!d&&!o._dp||d&&d.smoothChildTiming)&&(o._start+=u/o._ts,o._time-=u,o._tTime-=u),o.shiftChildren(-u,!1,-1/0),l=0),a._end>s&&a._ts&&(s=a._end),a=c;Da(o,o===fn&&o._time>s?o._time:s,1,1),o._dirty=0}return o._tDur},e.updateRoot=function(i){if(fn._ts&&(k_(fn,Du(i,fn)),F_=Pi.frame),Pi.frame>=S0){S0+=Oi.autoSleep||120;var s=fn._first;if((!s||!s._ts)&&Oi.autoSleep&&Pi._listeners.length<2){for(;s&&!s._ts;)s=s._next;s||Pi.sleep()}}},e})(Jl);Fi(ui.prototype,{_lock:0,_hasPause:0,_forcing:0});var LA=function(e,t,n,i,s,o,a){var l=new yi(this._pt,e,t,0,1,fx,null,s),c=0,u=0,d,f,h,_,g,m,p,b;for(l.b=n,l.e=i,n+="",i+="",(p=~i.indexOf("random("))&&(i=Kl(i)),o&&(b=[n,i],o(b,e,t),n=b[0],i=b[1]),f=n.match(qd)||[];d=qd.exec(i);)_=d[0],g=i.substring(c,d.index),h?h=(h+1)%5:g.substr(-5)==="rgba("&&(h=1),_!==f[u++]&&(m=parseFloat(f[u-1])||0,l._pt={_next:l._pt,p:g||u===1?g:",",s:m,c:_.charAt(1)==="="?da(m,_)-m:parseFloat(_)-m,m:h&&h<4?Math.round:0},c=qd.lastIndex);return l.c=c<i.length?i.substring(c,i.length):"",l.fp=a,(L_.test(i)||p)&&(l.e=0),this._pt=l,l},bp=function(e,t,n,i,s,o,a,l,c,u){mn(i)&&(i=i(s||0,e,o));var d=e[t],f=n!=="get"?n:mn(d)?c?e[t.indexOf("set")||!mn(e["get"+t.substr(3)])?t:"get"+t.substr(3)](c):e[t]():d,h=mn(d)?c?FA:ux:Sp,_;if(kn(i)&&(~i.indexOf("random(")&&(i=Kl(i)),i.charAt(1)==="="&&(_=da(f,i)+(Yn(f)||0),(_||_===0)&&(i=_))),!u||f!==i||vh)return!isNaN(f*i)&&i!==""?(_=new yi(this._pt,e,t,+f||0,i-(f||0),typeof d=="boolean"?kA:dx,0,h),c&&(_.fp=c),a&&_.modifier(a,this,e),this._pt=_):(!d&&!(t in e)&&_p(t,i),LA.call(this,e,t,f,i,h,l||Oi.stringFilter,c))},DA=function(e,t,n,i,s){if(mn(e)&&(e=Al(e,s,t,n,i)),!Dr(e)||e.style&&e.nodeType||Kn(e)||R_(e))return kn(e)?Al(e,s,t,n,i):e;var o={},a;for(a in e)o[a]=Al(e[a],s,t,n,i);return o},ax=function(e,t,n,i,s,o){var a,l,c,u;if(Ci[e]&&(a=new Ci[e]).init(s,a.rawVars?t[e]:DA(t[e],i,s,o,n),n,i,o)!==!1&&(n._pt=l=new yi(n._pt,s,e,0,1,a.render,a,0,a.priority),n!==oa))for(c=n._ptLookup[n._targets.indexOf(s)],u=a._props.length;u--;)c[a._props[u]]=l;return a},ys,vh,wp=function r(e,t,n){var i=e.vars,s=i.ease,o=i.startAt,a=i.immediateRender,l=i.lazy,c=i.onUpdate,u=i.runBackwards,d=i.yoyoEase,f=i.keyframes,h=i.autoRevert,_=e._dur,g=e._startAt,m=e._targets,p=e.parent,b=p&&p.data==="nested"?p.vars.targets:m,x=e._overwrite==="auto"&&!hp,v=e.timeline,E,M,T,R,w,y,D,N,V,j,k,G,Y;if(v&&(!f||!s)&&(s="none"),e._ease=mo(s,Ra.ease),e._yEase=d?ix(mo(d===!0?s:d,Ra.ease)):0,d&&e._yoyo&&!e._repeat&&(d=e._yEase,e._yEase=e._ease,e._ease=d),e._from=!v&&!!i.runBackwards,!v||f&&!i.stagger){if(N=m[0]?ho(m[0]).harness:0,G=N&&i[N.prop],E=Lu(i,xp),g&&(g._zTime<0&&g.progress(1),t<0&&u&&a&&!h?g.render(-1,!0):g.revert(u&&_?au:oA),g._lazy=0),o){if(Ns(e._startAt=Sn.set(m,Fi({data:"isStart",overwrite:!1,parent:p,immediateRender:!0,lazy:!g&&xi(l),startAt:null,delay:0,onUpdate:c&&function(){return Ii(e,"onUpdate")},stagger:0},o))),e._startAt._dp=0,e._startAt._sat=e,t<0&&(Vn||!a&&!h)&&e._startAt.revert(au),a&&_&&t<=0&&n<=0){t&&(e._zTime=t);return}}else if(u&&_&&!g){if(t&&(a=!1),T=Fi({overwrite:!1,data:"isFromStart",lazy:a&&!g&&xi(l),immediateRender:a,stagger:0,parent:p},E),G&&(T[N.prop]=G),Ns(e._startAt=Sn.set(m,T)),e._startAt._dp=0,e._startAt._sat=e,t<0&&(Vn?e._startAt.revert(au):e._startAt.render(-1,!0)),e._zTime=t,!a)r(e._startAt,Qt,Qt);else if(!t)return}for(e._pt=e._ptCache=0,l=_&&xi(l)||l&&!_,M=0;M<m.length;M++){if(w=m[M],D=w._gsap||yp(m)[M]._gsap,e._ptLookup[M]=j={},hh[D.id]&&Rs.length&&Pu(),k=b===m?M:b.indexOf(w),N&&(V=new N).init(w,G||E,e,k,b)!==!1&&(e._pt=R=new yi(e._pt,w,V.name,0,1,V.render,V,0,V.priority),V._props.forEach(function(F){j[F]=R}),V.priority&&(y=1)),!N||G)for(T in E)Ci[T]&&(V=ax(T,E,e,k,w,b))?V.priority&&(y=1):j[T]=R=bp.call(e,w,T,"get",E[T],k,b,0,i.stringFilter);e._op&&e._op[M]&&e.kill(w,e._op[M]),x&&e._pt&&(ys=e,fn.killTweensOf(w,j,e.globalTime(t)),Y=!e.parent,ys=0),e._pt&&l&&(hh[D.id]=1)}y&&hx(e),e._onInit&&e._onInit(e)}e._onUpdate=c,e._initted=(!e._op||e._pt)&&!Y,f&&t<=0&&v.render(qi,!0,!0)},IA=function(e,t,n,i,s,o,a,l){var c=(e._pt&&e._ptCache||(e._ptCache={}))[t],u,d,f,h;if(!c)for(c=e._ptCache[t]=[],f=e._ptLookup,h=e._targets.length;h--;){if(u=f[h][t],u&&u.d&&u.d._pt)for(u=u.d._pt;u&&u.p!==t&&u.fp!==t;)u=u._next;if(!u)return vh=1,e.vars[t]="+=0",wp(e,a),vh=0,l?$l(t+" not eligible for reset"):1;c.push(u)}for(h=c.length;h--;)d=c[h],u=d._pt||d,u.s=(i||i===0)&&!s?i:u.s+(i||0)+o*u.c,u.c=n-u.s,d.e&&(d.e=gn(n)+Yn(d.e)),d.b&&(d.b=u.s+Yn(d.b))},OA=function(e,t){var n=e[0]?ho(e[0]).harness:0,i=n&&n.aliases,s,o,a,l;if(!i)return t;s=Pa({},t);for(o in i)if(o in s)for(l=i[o].split(","),a=l.length;a--;)s[l[a]]=s[o];return s},NA=function(e,t,n,i){var s=t.ease||i||"power1.inOut",o,a;if(Kn(t))a=n[e]||(n[e]=[]),t.forEach(function(l,c){return a.push({t:c/(t.length-1)*100,v:l,e:s})});else for(o in t)a=n[o]||(n[o]=[]),o==="ease"||a.push({t:parseFloat(e),v:t[o],e:s})},Al=function(e,t,n,i,s){return mn(e)?e.call(t,n,i,s):kn(e)&&~e.indexOf("random(")?Kl(e):e},lx=vp+"repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,autoRevert",cx={};vi(lx+",id,stagger,delay,duration,paused,scrollTrigger",function(r){return cx[r]=1});var Sn=(function(r){A_(e,r);function e(n,i,s,o){var a;typeof i=="number"&&(s.duration=i,i=s,s=null),a=r.call(this,o?i:Tl(i))||this;var l=a.vars,c=l.duration,u=l.delay,d=l.immediateRender,f=l.stagger,h=l.overwrite,_=l.keyframes,g=l.defaults,m=l.scrollTrigger,p=l.yoyoEase,b=i.parent||fn,x=(Kn(n)||R_(n)?ns(n[0]):"length"in i)?[n]:Yi(n),v,E,M,T,R,w,y,D;if(a._targets=x.length?yp(x):$l("GSAP target "+n+" not found. https://gsap.com",!Oi.nullTargetWarn)||[],a._ptLookup=[],a._overwrite=h,_||f||kc(c)||kc(u)){if(i=a.vars,v=a.timeline=new ui({data:"nested",defaults:g||{},targets:b&&b.data==="nested"?b.vars.targets:x}),v.kill(),v.parent=v._dp=Gr(a),v._start=0,f||kc(c)||kc(u)){if(T=x.length,y=f&&Y_(f),Dr(f))for(R in f)~lx.indexOf(R)&&(D||(D={}),D[R]=f[R]);for(E=0;E<T;E++)M=Lu(i,cx),M.stagger=0,p&&(M.yoyoEase=p),D&&Pa(M,D),w=x[E],M.duration=+Al(c,Gr(a),E,w,x),M.delay=(+Al(u,Gr(a),E,w,x)||0)-a._delay,!f&&T===1&&M.delay&&(a._delay=u=M.delay,a._start+=u,M.delay=0),v.to(w,M,y?y(E,w,x):0),v._ease=Nt.none;v.duration()?c=u=0:a.timeline=0}else if(_){Tl(Fi(v.vars.defaults,{ease:"none"})),v._ease=mo(_.ease||i.ease||"none");var N=0,V,j,k;if(Kn(_))_.forEach(function(G){return v.to(x,G,">")}),v.duration();else{M={};for(R in _)R==="ease"||R==="easeEach"||NA(R,_[R],M,_.easeEach);for(R in M)for(V=M[R].sort(function(G,Y){return G.t-Y.t}),N=0,E=0;E<V.length;E++)j=V[E],k={ease:j.e,duration:(j.t-(E?V[E-1].t:0))/100*c},k[R]=j.v,v.to(x,k,N),N+=k.duration;v.duration()<c&&v.to({},{duration:c-v.duration()})}}c||a.duration(c=v.duration())}else a.timeline=0;return h===!0&&!hp&&(ys=Gr(a),fn.killTweensOf(x),ys=0),yr(b,Gr(a),s),i.reversed&&a.reverse(),i.paused&&a.paused(!0),(d||!c&&!_&&a._start===Tn(b._time)&&xi(d)&&fA(Gr(a))&&b.data!=="nested")&&(a._tTime=-Qt,a.render(Math.max(0,-u)||0)),m&&G_(Gr(a),m),a}var t=e.prototype;return t.render=function(i,s,o){var a=this._time,l=this._tDur,c=this._dur,u=i<0,d=i>l-Qt&&!u?l:i<Qt?0:i,f,h,_,g,m,p,b,x,v;if(!c)pA(this,i,s,o);else if(d!==this._tTime||!i||o||!this._initted&&this._tTime||this._startAt&&this._zTime<0!==u||this._lazy){if(f=d,x=this.timeline,this._repeat){if(g=c+this._rDelay,this._repeat<-1&&u)return this.totalTime(g*100+i,s,o);if(f=Tn(d%g),d===l?(_=this._repeat,f=c):(m=Tn(d/g),_=~~m,_&&_===m?(f=c,_--):f>c&&(f=c)),p=this._yoyo&&_&1,p&&(v=this._yEase,f=c-f),m=La(this._tTime,g),f===a&&!o&&this._initted&&_===m)return this._tTime=d,this;_!==m&&(x&&this._yEase&&rx(x,p),this.vars.repeatRefresh&&!p&&!this._lock&&f!==g&&this._initted&&(this._lock=o=1,this.render(Tn(g*_),!0).invalidate()._lock=0))}if(!this._initted){if(W_(this,u?i:f,o,s,d))return this._tTime=0,this;if(a!==this._time&&!(o&&this.vars.repeatRefresh&&_!==m))return this;if(c!==this._dur)return this.render(i,s,o)}if(this._tTime=d,this._time=f,!this._act&&this._ts&&(this._act=1,this._lazy=0),this.ratio=b=(v||this._ease)(f/c),this._from&&(this.ratio=b=1-b),f&&!a&&!s&&!_&&(Ii(this,"onStart"),this._tTime!==d))return this;for(h=this._pt;h;)h.r(b,h.d),h=h._next;x&&x.render(i<0?i:x._dur*x._ease(f/this._dur),s,o)||this._startAt&&(this._zTime=i),this._onUpdate&&!s&&(u&&ph(this,i,s,o),Ii(this,"onUpdate")),this._repeat&&_!==m&&this.vars.onRepeat&&!s&&this.parent&&Ii(this,"onRepeat"),(d===this._tDur||!d)&&this._tTime===d&&(u&&!this._onUpdate&&ph(this,i,!0,!0),(i||!c)&&(d===this._tDur&&this._ts>0||!d&&this._ts<0)&&Ns(this,1),!s&&!(u&&!a)&&(d||a||p)&&(Ii(this,d===l?"onComplete":"onReverseComplete",!0),this._prom&&!(d<l&&this.timeScale()>0)&&this._prom()))}return this},t.targets=function(){return this._targets},t.invalidate=function(i){return(!i||!this.vars.runBackwards)&&(this._startAt=0),this._pt=this._op=this._onUpdate=this._lazy=this.ratio=0,this._ptLookup=[],this.timeline&&this.timeline.invalidate(i),r.prototype.invalidate.call(this,i)},t.resetTo=function(i,s,o,a,l){Zl||Pi.wake(),this._ts||this.play();var c=Math.min(this._dur,(this._dp._time-this._start)*this._ts),u;return this._initted||wp(this,c),u=this._ease(c/this._dur),IA(this,i,s,o,a,u,c,l)?this.resetTo(i,s,o,a,1):(Qu(this,0),this.parent||V_(this._dp,this,"_first","_last",this._dp._sort?"_start":0),this.render(0))},t.kill=function(i,s){if(s===void 0&&(s="all"),!i&&(!s||s==="all"))return this._lazy=this._pt=0,this.parent?ul(this):this.scrollTrigger&&this.scrollTrigger.kill(!!Vn),this;if(this.timeline){var o=this.timeline.totalDuration();return this.timeline.killTweensOf(i,s,ys&&ys.vars.overwrite!==!0)._first||ul(this),this.parent&&o!==this.timeline.totalDuration()&&Da(this,this._dur*this.timeline._tDur/o,0,1),this}var a=this._targets,l=i?Yi(i):a,c=this._ptLookup,u=this._pt,d,f,h,_,g,m,p;if((!s||s==="all")&&uA(a,l))return s==="all"&&(this._pt=0),ul(this);for(d=this._op=this._op||[],s!=="all"&&(kn(s)&&(g={},vi(s,function(b){return g[b]=1}),s=g),s=OA(a,s)),p=a.length;p--;)if(~l.indexOf(a[p])){f=c[p],s==="all"?(d[p]=s,_=f,h={}):(h=d[p]=d[p]||{},_=s);for(g in _)m=f&&f[g],m&&((!("kill"in m.d)||m.d.kill(g)===!0)&&Zu(this,m,"_pt"),delete f[g]),h!=="all"&&(h[g]=1)}return this._initted&&!this._pt&&u&&ul(this),this},e.to=function(i,s){return new e(i,s,arguments[2])},e.from=function(i,s){return El(1,arguments)},e.delayedCall=function(i,s,o,a){return new e(s,0,{immediateRender:!1,lazy:!1,overwrite:!1,delay:i,onComplete:s,onReverseComplete:s,onCompleteParams:o,onReverseCompleteParams:o,callbackScope:a})},e.fromTo=function(i,s,o){return El(2,arguments)},e.set=function(i,s){return s.duration=0,s.repeatDelay||(s.repeat=0),new e(i,s)},e.killTweensOf=function(i,s,o){return fn.killTweensOf(i,s,o)},e})(Jl);Fi(Sn.prototype,{_targets:[],_lazy:0,_startAt:0,_op:0,_onInit:0});vi("staggerTo,staggerFrom,staggerFromTo",function(r){Sn[r]=function(){var e=new ui,t=gh.call(arguments,0);return t.splice(r==="staggerFromTo"?5:4,0,0),e[r].apply(e,t)}});var Sp=function(e,t,n){return e[t]=n},ux=function(e,t,n){return e[t](n)},FA=function(e,t,n,i){return e[t](i.fp,n)},UA=function(e,t,n){return e.setAttribute(t,n)},Mp=function(e,t){return mn(e[t])?ux:pp(e[t])&&e.setAttribute?UA:Sp},dx=function(e,t){return t.set(t.t,t.p,Math.round((t.s+t.c*e)*1e6)/1e6,t)},kA=function(e,t){return t.set(t.t,t.p,!!(t.s+t.c*e),t)},fx=function(e,t){var n=t._pt,i="";if(!e&&t.b)i=t.b;else if(e===1&&t.e)i=t.e;else{for(;n;)i=n.p+(n.m?n.m(n.s+n.c*e):Math.round((n.s+n.c*e)*1e4)/1e4)+i,n=n._next;i+=t.c}t.set(t.t,t.p,i,t)},Tp=function(e,t){for(var n=t._pt;n;)n.r(e,n.d),n=n._next},BA=function(e,t,n,i){for(var s=this._pt,o;s;)o=s._next,s.p===i&&s.modifier(e,t,n),s=o},zA=function(e){for(var t=this._pt,n,i;t;)i=t._next,t.p===e&&!t.op||t.op===e?Zu(this,t,"_pt"):t.dep||(n=1),t=i;return!n},VA=function(e,t,n,i){i.mSet(e,t,i.m.call(i.tween,n,i.mt),i)},hx=function(e){for(var t=e._pt,n,i,s,o;t;){for(n=t._next,i=s;i&&i.pr>t.pr;)i=i._next;(t._prev=i?i._prev:o)?t._prev._next=t:s=t,(t._next=i)?i._prev=t:o=t,t=n}e._pt=s},yi=(function(){function r(t,n,i,s,o,a,l,c,u){this.t=n,this.s=s,this.c=o,this.p=i,this.r=a||dx,this.d=l||this,this.set=c||Sp,this.pr=u||0,this._next=t,t&&(t._prev=this)}var e=r.prototype;return e.modifier=function(n,i,s){this.mSet=this.mSet||this.set,this.set=VA,this.m=n,this.mt=s,this.tween=i},r})();vi(vp+"parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger",function(r){return xp[r]=1});Ni.TweenMax=Ni.TweenLite=Sn;Ni.TimelineLite=Ni.TimelineMax=ui;fn=new ui({sortChildren:!1,defaults:Ra,autoRemoveChildren:!0,id:"root",smoothChildTiming:!0});Oi.stringFilter=nx;var go=[],cu={},HA=[],R0=0,GA=0,Zd=function(e){return(cu[e]||HA).map(function(t){return t()})},yh=function(){var e=Date.now(),t=[];e-R0>2&&(Zd("matchMediaInit"),go.forEach(function(n){var i=n.queries,s=n.conditions,o,a,l,c;for(a in i)o=_r.matchMedia(i[a]).matches,o&&(l=1),o!==s[a]&&(s[a]=o,c=1);c&&(n.revert(),l&&t.push(n))}),Zd("matchMediaRevert"),t.forEach(function(n){return n.onMatch(n,function(i){return n.add(null,i)})}),R0=e,Zd("matchMedia"))},px=(function(){function r(t,n){this.selector=n&&_h(n),this.data=[],this._r=[],this.isReverted=!1,this.id=GA++,t&&this.add(t)}var e=r.prototype;return e.add=function(n,i,s){mn(n)&&(s=i,i=n,n=mn);var o=this,a=function(){var c=cn,u=o.selector,d;return c&&c!==o&&c.data.push(o),s&&(o.selector=_h(s)),cn=o,d=i.apply(o,arguments),mn(d)&&o._r.push(d),cn=c,o.selector=u,o.isReverted=!1,d};return o.last=a,n===mn?a(o,function(l){return o.add(null,l)}):n?o[n]=a:a},e.ignore=function(n){var i=cn;cn=null,n(this),cn=i},e.getTweens=function(){var n=[];return this.data.forEach(function(i){return i instanceof r?n.push.apply(n,i.getTweens()):i instanceof Sn&&!(i.parent&&i.parent.data==="nested")&&n.push(i)}),n},e.clear=function(){this._r.length=this.data.length=0},e.kill=function(n,i){var s=this;if(n?(function(){for(var a=s.getTweens(),l=s.data.length,c;l--;)c=s.data[l],c.data==="isFlip"&&(c.revert(),c.getChildren(!0,!0,!1).forEach(function(u){return a.splice(a.indexOf(u),1)}));for(a.map(function(u){return{g:u._dur||u._delay||u._sat&&!u._sat.vars.immediateRender?u.globalTime(0):-1/0,t:u}}).sort(function(u,d){return d.g-u.g||-1/0}).forEach(function(u){return u.t.revert(n)}),l=s.data.length;l--;)c=s.data[l],c instanceof ui?c.data!=="nested"&&(c.scrollTrigger&&c.scrollTrigger.revert(),c.kill()):!(c instanceof Sn)&&c.revert&&c.revert(n);s._r.forEach(function(u){return u(n,s)}),s.isReverted=!0})():this.data.forEach(function(a){return a.kill&&a.kill()}),this.clear(),i)for(var o=go.length;o--;)go[o].id===this.id&&go.splice(o,1)},e.revert=function(n){this.kill(n||{})},r})(),WA=(function(){function r(t){this.contexts=[],this.scope=t,cn&&cn.data.push(this)}var e=r.prototype;return e.add=function(n,i,s){Dr(n)||(n={matches:n});var o=new px(0,s||this.scope),a=o.conditions={},l,c,u;cn&&!o.selector&&(o.selector=cn.selector),this.contexts.push(o),i=o.add("onMatch",i),o.queries=n;for(c in n)c==="all"?u=1:(l=_r.matchMedia(n[c]),l&&(go.indexOf(o)<0&&go.push(o),(a[c]=l.matches)&&(u=1),l.addListener?l.addListener(yh):l.addEventListener("change",yh)));return u&&i(o,function(d){return o.add(null,d)}),this},e.revert=function(n){this.kill(n||{})},e.kill=function(n){this.contexts.forEach(function(i){return i.kill(n,!0)})},r})(),Iu={registerPlugin:function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];t.forEach(function(i){return Q_(i)})},timeline:function(e){return new ui(e)},getTweensOf:function(e,t){return fn.getTweensOf(e,t)},getProperty:function(e,t,n,i){kn(e)&&(e=Yi(e)[0]);var s=ho(e||{}).get,o=n?z_:B_;return n==="native"&&(n=""),e&&(t?o((Ci[t]&&Ci[t].get||s)(e,t,n,i)):function(a,l,c){return o((Ci[a]&&Ci[a].get||s)(e,a,l,c))})},quickSetter:function(e,t,n){if(e=Yi(e),e.length>1){var i=e.map(function(u){return wi.quickSetter(u,t,n)}),s=i.length;return function(u){for(var d=s;d--;)i[d](u)}}e=e[0]||{};var o=Ci[t],a=ho(e),l=a.harness&&(a.harness.aliases||{})[t]||t,c=o?function(u){var d=new o;oa._pt=0,d.init(e,n?u+n:u,oa,0,[e]),d.render(1,d),oa._pt&&Tp(1,oa)}:a.set(e,l);return o?c:function(u){return c(e,l,n?u+n:u,a,1)}},quickTo:function(e,t,n){var i,s=wi.to(e,Fi((i={},i[t]="+=0.1",i.paused=!0,i.stagger=0,i),n||{})),o=function(l,c,u){return s.resetTo(t,l,c,u)};return o.tween=s,o},isTweening:function(e){return fn.getTweensOf(e,!0).length>0},defaults:function(e){return e&&e.ease&&(e.ease=mo(e.ease,Ra.ease)),M0(Ra,e||{})},config:function(e){return M0(Oi,e||{})},registerEffect:function(e){var t=e.name,n=e.effect,i=e.plugins,s=e.defaults,o=e.extendTimeline;(i||"").split(",").forEach(function(a){return a&&!Ci[a]&&!Ni[a]&&$l(t+" effect requires "+a+" plugin.")}),Yd[t]=function(a,l,c){return n(Yi(a),Fi(l||{},s),c)},o&&(ui.prototype[t]=function(a,l,c){return this.add(Yd[t](a,Dr(l)?l:(c=l)&&{},this),c)})},registerEase:function(e,t){Nt[e]=mo(t)},parseEase:function(e,t){return arguments.length?mo(e,t):Nt},getById:function(e){return fn.getById(e)},exportRoot:function(e,t){e===void 0&&(e={});var n=new ui(e),i,s;for(n.smoothChildTiming=xi(e.smoothChildTiming),fn.remove(n),n._dp=0,n._time=n._tTime=fn._time,i=fn._first;i;)s=i._next,(t||!(!i._dur&&i instanceof Sn&&i.vars.onComplete===i._targets[0]))&&yr(n,i,i._start-i._delay),i=s;return yr(fn,n,0),n},context:function(e,t){return e?new px(e,t):cn},matchMedia:function(e){return new WA(e)},matchMediaRefresh:function(){return go.forEach(function(e){var t=e.conditions,n,i;for(i in t)t[i]&&(t[i]=!1,n=1);n&&e.revert()})||yh()},addEventListener:function(e,t){var n=cu[e]||(cu[e]=[]);~n.indexOf(t)||n.push(t)},removeEventListener:function(e,t){var n=cu[e],i=n&&n.indexOf(t);i>=0&&n.splice(i,1)},utils:{wrap:wA,wrapYoyo:SA,distribute:Y_,random:j_,snap:$_,normalize:bA,getUnit:Yn,clamp:_A,splitColor:ex,toArray:Yi,selector:_h,mapRange:Z_,pipe:vA,unitize:yA,interpolate:MA,shuffle:q_},install:O_,effects:Yd,ticker:Pi,updateRoot:ui.updateRoot,plugins:Ci,globalTimeline:fn,core:{PropTween:yi,globals:N_,Tween:Sn,Timeline:ui,Animation:Jl,getCache:ho,_removeLinkedListItem:Zu,reverting:function(){return Vn},context:function(e){return e&&cn&&(cn.data.push(e),e._ctx=cn),cn},suppressOverwrites:function(e){return hp=e}}};vi("to,from,fromTo,delayedCall,set,killTweensOf",function(r){return Iu[r]=Sn[r]});Pi.add(ui.updateRoot);oa=Iu.to({},{duration:0});var XA=function(e,t){for(var n=e._pt;n&&n.p!==t&&n.op!==t&&n.fp!==t;)n=n._next;return n},qA=function(e,t){var n=e._targets,i,s,o;for(i in t)for(s=n.length;s--;)o=e._ptLookup[s][i],o&&(o=o.d)&&(o._pt&&(o=XA(o,i)),o&&o.modifier&&o.modifier(t[i],e,n[s],i))},Jd=function(e,t){return{name:e,rawVars:1,init:function(i,s,o){o._onInit=function(a){var l,c;if(kn(s)&&(l={},vi(s,function(u){return l[u]=1}),s=l),t){l={};for(c in s)l[c]=t(s[c]);s=l}qA(a,s)}}}},wi=Iu.registerPlugin({name:"attr",init:function(e,t,n,i,s){var o,a,l;this.tween=n;for(o in t)l=e.getAttribute(o)||"",a=this.add(e,"setAttribute",(l||0)+"",t[o],i,s,0,0,o),a.op=o,a.b=l,this._props.push(o)},render:function(e,t){for(var n=t._pt;n;)Vn?n.set(n.t,n.p,n.b,n):n.r(e,n.d),n=n._next}},{name:"endArray",init:function(e,t){for(var n=t.length;n--;)this.add(e,n,e[n]||0,t[n],0,0,0,0,0,1)}},Jd("roundProps",xh),Jd("modifiers"),Jd("snap",$_))||Iu;Sn.version=ui.version=wi.version="3.12.7";I_=1;mp()&&Ia();Nt.Power0;Nt.Power1;Nt.Power2;Nt.Power3;Nt.Power4;Nt.Linear;Nt.Quad;Nt.Cubic;Nt.Quart;Nt.Quint;Nt.Strong;Nt.Elastic;Nt.Back;Nt.SteppedEase;Nt.Bounce;Nt.Sine;Nt.Expo;Nt.Circ;/*!
 * CSSPlugin 3.12.7
 * https://gsap.com
 *
 * Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license or for
 * Club GSAP members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/var P0,bs,fa,Ep,ao,L0,Ap,YA=function(){return typeof window<"u"},is={},eo=180/Math.PI,ha=Math.PI/180,Ko=Math.atan2,D0=1e8,Cp=/([A-Z])/g,$A=/(left|right|width|margin|padding|x)/i,jA=/[\s,\(]\S/,Mr={autoAlpha:"opacity,visibility",scale:"scaleX,scaleY",alpha:"opacity"},bh=function(e,t){return t.set(t.t,t.p,Math.round((t.s+t.c*e)*1e4)/1e4+t.u,t)},KA=function(e,t){return t.set(t.t,t.p,e===1?t.e:Math.round((t.s+t.c*e)*1e4)/1e4+t.u,t)},ZA=function(e,t){return t.set(t.t,t.p,e?Math.round((t.s+t.c*e)*1e4)/1e4+t.u:t.b,t)},JA=function(e,t){var n=t.s+t.c*e;t.set(t.t,t.p,~~(n+(n<0?-.5:.5))+t.u,t)},mx=function(e,t){return t.set(t.t,t.p,e?t.e:t.b,t)},gx=function(e,t){return t.set(t.t,t.p,e!==1?t.b:t.e,t)},QA=function(e,t,n){return e.style[t]=n},eC=function(e,t,n){return e.style.setProperty(t,n)},tC=function(e,t,n){return e._gsap[t]=n},nC=function(e,t,n){return e._gsap.scaleX=e._gsap.scaleY=n},iC=function(e,t,n,i,s){var o=e._gsap;o.scaleX=o.scaleY=n,o.renderTransform(s,o)},rC=function(e,t,n,i,s){var o=e._gsap;o[t]=n,o.renderTransform(s,o)},hn="transform",bi=hn+"Origin",sC=function r(e,t){var n=this,i=this.target,s=i.style,o=i._gsap;if(e in is&&s){if(this.tfm=this.tfm||{},e!=="transform")e=Mr[e]||e,~e.indexOf(",")?e.split(",").forEach(function(a){return n.tfm[a]=Wr(i,a)}):this.tfm[e]=o.x?o[e]:Wr(i,e),e===bi&&(this.tfm.zOrigin=o.zOrigin);else return Mr.transform.split(",").forEach(function(a){return r.call(n,a,t)});if(this.props.indexOf(hn)>=0)return;o.svg&&(this.svgo=i.getAttribute("data-svg-origin"),this.props.push(bi,t,"")),e=hn}(s||t)&&this.props.push(e,t,s[e])},_x=function(e){e.translate&&(e.removeProperty("translate"),e.removeProperty("scale"),e.removeProperty("rotate"))},oC=function(){var e=this.props,t=this.target,n=t.style,i=t._gsap,s,o;for(s=0;s<e.length;s+=3)e[s+1]?e[s+1]===2?t[e[s]](e[s+2]):t[e[s]]=e[s+2]:e[s+2]?n[e[s]]=e[s+2]:n.removeProperty(e[s].substr(0,2)==="--"?e[s]:e[s].replace(Cp,"-$1").toLowerCase());if(this.tfm){for(o in this.tfm)i[o]=this.tfm[o];i.svg&&(i.renderTransform(),t.setAttribute("data-svg-origin",this.svgo||"")),s=Ap(),(!s||!s.isStart)&&!n[hn]&&(_x(n),i.zOrigin&&n[bi]&&(n[bi]+=" "+i.zOrigin+"px",i.zOrigin=0,i.renderTransform()),i.uncache=1)}},xx=function(e,t){var n={target:e,props:[],revert:oC,save:sC};return e._gsap||wi.core.getCache(e),t&&e.style&&e.nodeType&&t.split(",").forEach(function(i){return n.save(i)}),n},vx,wh=function(e,t){var n=bs.createElementNS?bs.createElementNS((t||"http://www.w3.org/1999/xhtml").replace(/^https/,"http"),e):bs.createElement(e);return n&&n.style?n:bs.createElement(e)},Cr=function r(e,t,n){var i=getComputedStyle(e);return i[t]||i.getPropertyValue(t.replace(Cp,"-$1").toLowerCase())||i.getPropertyValue(t)||!n&&r(e,Oa(t)||t,1)||""},I0="O,Moz,ms,Ms,Webkit".split(","),Oa=function(e,t,n){var i=t||ao,s=i.style,o=5;if(e in s&&!n)return e;for(e=e.charAt(0).toUpperCase()+e.substr(1);o--&&!(I0[o]+e in s););return o<0?null:(o===3?"ms":o>=0?I0[o]:"")+e},Sh=function(){YA()&&window.document&&(P0=window,bs=P0.document,fa=bs.documentElement,ao=wh("div")||{style:{}},wh("div"),hn=Oa(hn),bi=hn+"Origin",ao.style.cssText="border-width:0;line-height:0;position:absolute;padding:0",vx=!!Oa("perspective"),Ap=wi.core.reverting,Ep=1)},O0=function(e){var t=e.ownerSVGElement,n=wh("svg",t&&t.getAttribute("xmlns")||"http://www.w3.org/2000/svg"),i=e.cloneNode(!0),s;i.style.display="block",n.appendChild(i),fa.appendChild(n);try{s=i.getBBox()}catch{}return n.removeChild(i),fa.removeChild(n),s},N0=function(e,t){for(var n=t.length;n--;)if(e.hasAttribute(t[n]))return e.getAttribute(t[n])},yx=function(e){var t,n;try{t=e.getBBox()}catch{t=O0(e),n=1}return t&&(t.width||t.height)||n||(t=O0(e)),t&&!t.width&&!t.x&&!t.y?{x:+N0(e,["x","cx","x1"])||0,y:+N0(e,["y","cy","y1"])||0,width:0,height:0}:t},bx=function(e){return!!(e.getCTM&&(!e.parentNode||e.ownerSVGElement)&&yx(e))},wo=function(e,t){if(t){var n=e.style,i;t in is&&t!==bi&&(t=hn),n.removeProperty?(i=t.substr(0,2),(i==="ms"||t.substr(0,6)==="webkit")&&(t="-"+t),n.removeProperty(i==="--"?t:t.replace(Cp,"-$1").toLowerCase())):n.removeAttribute(t)}},ws=function(e,t,n,i,s,o){var a=new yi(e._pt,t,n,0,1,o?gx:mx);return e._pt=a,a.b=i,a.e=s,e._props.push(n),a},F0={deg:1,rad:1,turn:1},aC={grid:1,flex:1},Fs=function r(e,t,n,i){var s=parseFloat(n)||0,o=(n+"").trim().substr((s+"").length)||"px",a=ao.style,l=$A.test(t),c=e.tagName.toLowerCase()==="svg",u=(c?"client":"offset")+(l?"Width":"Height"),d=100,f=i==="px",h=i==="%",_,g,m,p;if(i===o||!s||F0[i]||F0[o])return s;if(o!=="px"&&!f&&(s=r(e,t,n,"px")),p=e.getCTM&&bx(e),(h||o==="%")&&(is[t]||~t.indexOf("adius")))return _=p?e.getBBox()[l?"width":"height"]:e[u],gn(h?s/_*d:s/100*_);if(a[l?"width":"height"]=d+(f?o:i),g=i!=="rem"&&~t.indexOf("adius")||i==="em"&&e.appendChild&&!c?e:e.parentNode,p&&(g=(e.ownerSVGElement||{}).parentNode),(!g||g===bs||!g.appendChild)&&(g=bs.body),m=g._gsap,m&&h&&m.width&&l&&m.time===Pi.time&&!m.uncache)return gn(s/m.width*d);if(h&&(t==="height"||t==="width")){var b=e.style[t];e.style[t]=d+i,_=e[u],b?e.style[t]=b:wo(e,t)}else(h||o==="%")&&!aC[Cr(g,"display")]&&(a.position=Cr(e,"position")),g===e&&(a.position="static"),g.appendChild(ao),_=ao[u],g.removeChild(ao),a.position="absolute";return l&&h&&(m=ho(g),m.time=Pi.time,m.width=g[u]),gn(f?_*s/d:_&&s?d/_*s:0)},Wr=function(e,t,n,i){var s;return Ep||Sh(),t in Mr&&t!=="transform"&&(t=Mr[t],~t.indexOf(",")&&(t=t.split(",")[0])),is[t]&&t!=="transform"?(s=ec(e,i),s=t!=="transformOrigin"?s[t]:s.svg?s.origin:Nu(Cr(e,bi))+" "+s.zOrigin+"px"):(s=e.style[t],(!s||s==="auto"||i||~(s+"").indexOf("calc("))&&(s=Ou[t]&&Ou[t](e,t,n)||Cr(e,t)||U_(e,t)||(t==="opacity"?1:0))),n&&!~(s+"").trim().indexOf(" ")?Fs(e,t,s,n)+n:s},lC=function(e,t,n,i){if(!n||n==="none"){var s=Oa(t,e,1),o=s&&Cr(e,s,1);o&&o!==n?(t=s,n=o):t==="borderColor"&&(n=Cr(e,"borderTopColor"))}var a=new yi(this._pt,e.style,t,0,1,fx),l=0,c=0,u,d,f,h,_,g,m,p,b,x,v,E;if(a.b=n,a.e=i,n+="",i+="",i==="auto"&&(g=e.style[t],e.style[t]=i,i=Cr(e,t)||i,g?e.style[t]=g:wo(e,t)),u=[n,i],nx(u),n=u[0],i=u[1],f=n.match(sa)||[],E=i.match(sa)||[],E.length){for(;d=sa.exec(i);)m=d[0],b=i.substring(l,d.index),_?_=(_+1)%5:(b.substr(-5)==="rgba("||b.substr(-5)==="hsla(")&&(_=1),m!==(g=f[c++]||"")&&(h=parseFloat(g)||0,v=g.substr((h+"").length),m.charAt(1)==="="&&(m=da(h,m)+v),p=parseFloat(m),x=m.substr((p+"").length),l=sa.lastIndex-x.length,x||(x=x||Oi.units[t]||v,l===i.length&&(i+=x,a.e+=x)),v!==x&&(h=Fs(e,t,g,x)||0),a._pt={_next:a._pt,p:b||c===1?b:",",s:h,c:p-h,m:_&&_<4||t==="zIndex"?Math.round:0});a.c=l<i.length?i.substring(l,i.length):""}else a.r=t==="display"&&i==="none"?gx:mx;return L_.test(i)&&(a.e=0),this._pt=a,a},U0={top:"0%",bottom:"100%",left:"0%",right:"100%",center:"50%"},cC=function(e){var t=e.split(" "),n=t[0],i=t[1]||"50%";return(n==="top"||n==="bottom"||i==="left"||i==="right")&&(e=n,n=i,i=e),t[0]=U0[n]||n,t[1]=U0[i]||i,t.join(" ")},uC=function(e,t){if(t.tween&&t.tween._time===t.tween._dur){var n=t.t,i=n.style,s=t.u,o=n._gsap,a,l,c;if(s==="all"||s===!0)i.cssText="",l=1;else for(s=s.split(","),c=s.length;--c>-1;)a=s[c],is[a]&&(l=1,a=a==="transformOrigin"?bi:hn),wo(n,a);l&&(wo(n,hn),o&&(o.svg&&n.removeAttribute("transform"),i.scale=i.rotate=i.translate="none",ec(n,1),o.uncache=1,_x(i)))}},Ou={clearProps:function(e,t,n,i,s){if(s.data!=="isFromStart"){var o=e._pt=new yi(e._pt,t,n,0,0,uC);return o.u=i,o.pr=-10,o.tween=s,e._props.push(n),1}}},Ql=[1,0,0,1,0,0],wx={},Sx=function(e){return e==="matrix(1, 0, 0, 1, 0, 0)"||e==="none"||!e},k0=function(e){var t=Cr(e,hn);return Sx(t)?Ql:t.substr(7).match(P_).map(gn)},Rp=function(e,t){var n=e._gsap||ho(e),i=e.style,s=k0(e),o,a,l,c;return n.svg&&e.getAttribute("transform")?(l=e.transform.baseVal.consolidate().matrix,s=[l.a,l.b,l.c,l.d,l.e,l.f],s.join(",")==="1,0,0,1,0,0"?Ql:s):(s===Ql&&!e.offsetParent&&e!==fa&&!n.svg&&(l=i.display,i.display="block",o=e.parentNode,(!o||!e.offsetParent&&!e.getBoundingClientRect().width)&&(c=1,a=e.nextElementSibling,fa.appendChild(e)),s=k0(e),l?i.display=l:wo(e,"display"),c&&(a?o.insertBefore(e,a):o?o.appendChild(e):fa.removeChild(e))),t&&s.length>6?[s[0],s[1],s[4],s[5],s[12],s[13]]:s)},Mh=function(e,t,n,i,s,o){var a=e._gsap,l=s||Rp(e,!0),c=a.xOrigin||0,u=a.yOrigin||0,d=a.xOffset||0,f=a.yOffset||0,h=l[0],_=l[1],g=l[2],m=l[3],p=l[4],b=l[5],x=t.split(" "),v=parseFloat(x[0])||0,E=parseFloat(x[1])||0,M,T,R,w;n?l!==Ql&&(T=h*m-_*g)&&(R=v*(m/T)+E*(-g/T)+(g*b-m*p)/T,w=v*(-_/T)+E*(h/T)-(h*b-_*p)/T,v=R,E=w):(M=yx(e),v=M.x+(~x[0].indexOf("%")?v/100*M.width:v),E=M.y+(~(x[1]||x[0]).indexOf("%")?E/100*M.height:E)),i||i!==!1&&a.smooth?(p=v-c,b=E-u,a.xOffset=d+(p*h+b*g)-p,a.yOffset=f+(p*_+b*m)-b):a.xOffset=a.yOffset=0,a.xOrigin=v,a.yOrigin=E,a.smooth=!!i,a.origin=t,a.originIsAbsolute=!!n,e.style[bi]="0px 0px",o&&(ws(o,a,"xOrigin",c,v),ws(o,a,"yOrigin",u,E),ws(o,a,"xOffset",d,a.xOffset),ws(o,a,"yOffset",f,a.yOffset)),e.setAttribute("data-svg-origin",v+" "+E)},ec=function(e,t){var n=e._gsap||new ox(e);if("x"in n&&!t&&!n.uncache)return n;var i=e.style,s=n.scaleX<0,o="px",a="deg",l=getComputedStyle(e),c=Cr(e,bi)||"0",u,d,f,h,_,g,m,p,b,x,v,E,M,T,R,w,y,D,N,V,j,k,G,Y,F,ae,O,he,P,Me,Ne,ze;return u=d=f=g=m=p=b=x=v=0,h=_=1,n.svg=!!(e.getCTM&&bx(e)),l.translate&&((l.translate!=="none"||l.scale!=="none"||l.rotate!=="none")&&(i[hn]=(l.translate!=="none"?"translate3d("+(l.translate+" 0 0").split(" ").slice(0,3).join(", ")+") ":"")+(l.rotate!=="none"?"rotate("+l.rotate+") ":"")+(l.scale!=="none"?"scale("+l.scale.split(" ").join(",")+") ":"")+(l[hn]!=="none"?l[hn]:"")),i.scale=i.rotate=i.translate="none"),T=Rp(e,n.svg),n.svg&&(n.uncache?(F=e.getBBox(),c=n.xOrigin-F.x+"px "+(n.yOrigin-F.y)+"px",Y=""):Y=!t&&e.getAttribute("data-svg-origin"),Mh(e,Y||c,!!Y||n.originIsAbsolute,n.smooth!==!1,T)),E=n.xOrigin||0,M=n.yOrigin||0,T!==Ql&&(D=T[0],N=T[1],V=T[2],j=T[3],u=k=T[4],d=G=T[5],T.length===6?(h=Math.sqrt(D*D+N*N),_=Math.sqrt(j*j+V*V),g=D||N?Ko(N,D)*eo:0,b=V||j?Ko(V,j)*eo+g:0,b&&(_*=Math.abs(Math.cos(b*ha))),n.svg&&(u-=E-(E*D+M*V),d-=M-(E*N+M*j))):(ze=T[6],Me=T[7],O=T[8],he=T[9],P=T[10],Ne=T[11],u=T[12],d=T[13],f=T[14],R=Ko(ze,P),m=R*eo,R&&(w=Math.cos(-R),y=Math.sin(-R),Y=k*w+O*y,F=G*w+he*y,ae=ze*w+P*y,O=k*-y+O*w,he=G*-y+he*w,P=ze*-y+P*w,Ne=Me*-y+Ne*w,k=Y,G=F,ze=ae),R=Ko(-V,P),p=R*eo,R&&(w=Math.cos(-R),y=Math.sin(-R),Y=D*w-O*y,F=N*w-he*y,ae=V*w-P*y,Ne=j*y+Ne*w,D=Y,N=F,V=ae),R=Ko(N,D),g=R*eo,R&&(w=Math.cos(R),y=Math.sin(R),Y=D*w+N*y,F=k*w+G*y,N=N*w-D*y,G=G*w-k*y,D=Y,k=F),m&&Math.abs(m)+Math.abs(g)>359.9&&(m=g=0,p=180-p),h=gn(Math.sqrt(D*D+N*N+V*V)),_=gn(Math.sqrt(G*G+ze*ze)),R=Ko(k,G),b=Math.abs(R)>2e-4?R*eo:0,v=Ne?1/(Ne<0?-Ne:Ne):0),n.svg&&(Y=e.getAttribute("transform"),n.forceCSS=e.setAttribute("transform","")||!Sx(Cr(e,hn)),Y&&e.setAttribute("transform",Y))),Math.abs(b)>90&&Math.abs(b)<270&&(s?(h*=-1,b+=g<=0?180:-180,g+=g<=0?180:-180):(_*=-1,b+=b<=0?180:-180)),t=t||n.uncache,n.x=u-((n.xPercent=u&&(!t&&n.xPercent||(Math.round(e.offsetWidth/2)===Math.round(-u)?-50:0)))?e.offsetWidth*n.xPercent/100:0)+o,n.y=d-((n.yPercent=d&&(!t&&n.yPercent||(Math.round(e.offsetHeight/2)===Math.round(-d)?-50:0)))?e.offsetHeight*n.yPercent/100:0)+o,n.z=f+o,n.scaleX=gn(h),n.scaleY=gn(_),n.rotation=gn(g)+a,n.rotationX=gn(m)+a,n.rotationY=gn(p)+a,n.skewX=b+a,n.skewY=x+a,n.transformPerspective=v+o,(n.zOrigin=parseFloat(c.split(" ")[2])||!t&&n.zOrigin||0)&&(i[bi]=Nu(c)),n.xOffset=n.yOffset=0,n.force3D=Oi.force3D,n.renderTransform=n.svg?fC:vx?Mx:dC,n.uncache=0,n},Nu=function(e){return(e=e.split(" "))[0]+" "+e[1]},Qd=function(e,t,n){var i=Yn(t);return gn(parseFloat(t)+parseFloat(Fs(e,"x",n+"px",i)))+i},dC=function(e,t){t.z="0px",t.rotationY=t.rotationX="0deg",t.force3D=0,Mx(e,t)},Zs="0deg",tl="0px",Js=") ",Mx=function(e,t){var n=t||this,i=n.xPercent,s=n.yPercent,o=n.x,a=n.y,l=n.z,c=n.rotation,u=n.rotationY,d=n.rotationX,f=n.skewX,h=n.skewY,_=n.scaleX,g=n.scaleY,m=n.transformPerspective,p=n.force3D,b=n.target,x=n.zOrigin,v="",E=p==="auto"&&e&&e!==1||p===!0;if(x&&(d!==Zs||u!==Zs)){var M=parseFloat(u)*ha,T=Math.sin(M),R=Math.cos(M),w;M=parseFloat(d)*ha,w=Math.cos(M),o=Qd(b,o,T*w*-x),a=Qd(b,a,-Math.sin(M)*-x),l=Qd(b,l,R*w*-x+x)}m!==tl&&(v+="perspective("+m+Js),(i||s)&&(v+="translate("+i+"%, "+s+"%) "),(E||o!==tl||a!==tl||l!==tl)&&(v+=l!==tl||E?"translate3d("+o+", "+a+", "+l+") ":"translate("+o+", "+a+Js),c!==Zs&&(v+="rotate("+c+Js),u!==Zs&&(v+="rotateY("+u+Js),d!==Zs&&(v+="rotateX("+d+Js),(f!==Zs||h!==Zs)&&(v+="skew("+f+", "+h+Js),(_!==1||g!==1)&&(v+="scale("+_+", "+g+Js),b.style[hn]=v||"translate(0, 0)"},fC=function(e,t){var n=t||this,i=n.xPercent,s=n.yPercent,o=n.x,a=n.y,l=n.rotation,c=n.skewX,u=n.skewY,d=n.scaleX,f=n.scaleY,h=n.target,_=n.xOrigin,g=n.yOrigin,m=n.xOffset,p=n.yOffset,b=n.forceCSS,x=parseFloat(o),v=parseFloat(a),E,M,T,R,w;l=parseFloat(l),c=parseFloat(c),u=parseFloat(u),u&&(u=parseFloat(u),c+=u,l+=u),l||c?(l*=ha,c*=ha,E=Math.cos(l)*d,M=Math.sin(l)*d,T=Math.sin(l-c)*-f,R=Math.cos(l-c)*f,c&&(u*=ha,w=Math.tan(c-u),w=Math.sqrt(1+w*w),T*=w,R*=w,u&&(w=Math.tan(u),w=Math.sqrt(1+w*w),E*=w,M*=w)),E=gn(E),M=gn(M),T=gn(T),R=gn(R)):(E=d,R=f,M=T=0),(x&&!~(o+"").indexOf("px")||v&&!~(a+"").indexOf("px"))&&(x=Fs(h,"x",o,"px"),v=Fs(h,"y",a,"px")),(_||g||m||p)&&(x=gn(x+_-(_*E+g*T)+m),v=gn(v+g-(_*M+g*R)+p)),(i||s)&&(w=h.getBBox(),x=gn(x+i/100*w.width),v=gn(v+s/100*w.height)),w="matrix("+E+","+M+","+T+","+R+","+x+","+v+")",h.setAttribute("transform",w),b&&(h.style[hn]=w)},hC=function(e,t,n,i,s){var o=360,a=kn(s),l=parseFloat(s)*(a&&~s.indexOf("rad")?eo:1),c=l-i,u=i+c+"deg",d,f;return a&&(d=s.split("_")[1],d==="short"&&(c%=o,c!==c%(o/2)&&(c+=c<0?o:-o)),d==="cw"&&c<0?c=(c+o*D0)%o-~~(c/o)*o:d==="ccw"&&c>0&&(c=(c-o*D0)%o-~~(c/o)*o)),e._pt=f=new yi(e._pt,t,n,i,c,KA),f.e=u,f.u="deg",e._props.push(n),f},B0=function(e,t){for(var n in t)e[n]=t[n];return e},pC=function(e,t,n){var i=B0({},n._gsap),s="perspective,force3D,transformOrigin,svgOrigin",o=n.style,a,l,c,u,d,f,h,_;i.svg?(c=n.getAttribute("transform"),n.setAttribute("transform",""),o[hn]=t,a=ec(n,1),wo(n,hn),n.setAttribute("transform",c)):(c=getComputedStyle(n)[hn],o[hn]=t,a=ec(n,1),o[hn]=c);for(l in is)c=i[l],u=a[l],c!==u&&s.indexOf(l)<0&&(h=Yn(c),_=Yn(u),d=h!==_?Fs(n,l,c,_):parseFloat(c),f=parseFloat(u),e._pt=new yi(e._pt,a,l,d,f-d,bh),e._pt.u=_||0,e._props.push(l));B0(a,i)};vi("padding,margin,Width,Radius",function(r,e){var t="Top",n="Right",i="Bottom",s="Left",o=(e<3?[t,n,i,s]:[t+s,t+n,i+n,i+s]).map(function(a){return e<2?r+a:"border"+a+r});Ou[e>1?"border"+r:r]=function(a,l,c,u,d){var f,h;if(arguments.length<4)return f=o.map(function(_){return Wr(a,_,c)}),h=f.join(" "),h.split(f[0]).length===5?f[0]:h;f=(u+"").split(" "),h={},o.forEach(function(_,g){return h[_]=f[g]=f[g]||f[(g-1)/2|0]}),a.init(l,h,d)}});var Tx={name:"css",register:Sh,targetTest:function(e){return e.style&&e.nodeType},init:function(e,t,n,i,s){var o=this._props,a=e.style,l=n.vars.startAt,c,u,d,f,h,_,g,m,p,b,x,v,E,M,T,R;Ep||Sh(),this.styles=this.styles||xx(e),R=this.styles.props,this.tween=n;for(g in t)if(g!=="autoRound"&&(u=t[g],!(Ci[g]&&ax(g,t,n,i,e,s)))){if(h=typeof u,_=Ou[g],h==="function"&&(u=u.call(n,i,e,s),h=typeof u),h==="string"&&~u.indexOf("random(")&&(u=Kl(u)),_)_(this,e,g,u,n)&&(T=1);else if(g.substr(0,2)==="--")c=(getComputedStyle(e).getPropertyValue(g)+"").trim(),u+="",Ps.lastIndex=0,Ps.test(c)||(m=Yn(c),p=Yn(u)),p?m!==p&&(c=Fs(e,g,c,p)+p):m&&(u+=m),this.add(a,"setProperty",c,u,i,s,0,0,g),o.push(g),R.push(g,0,a[g]);else if(h!=="undefined"){if(l&&g in l?(c=typeof l[g]=="function"?l[g].call(n,i,e,s):l[g],kn(c)&&~c.indexOf("random(")&&(c=Kl(c)),Yn(c+"")||c==="auto"||(c+=Oi.units[g]||Yn(Wr(e,g))||""),(c+"").charAt(1)==="="&&(c=Wr(e,g))):c=Wr(e,g),f=parseFloat(c),b=h==="string"&&u.charAt(1)==="="&&u.substr(0,2),b&&(u=u.substr(2)),d=parseFloat(u),g in Mr&&(g==="autoAlpha"&&(f===1&&Wr(e,"visibility")==="hidden"&&d&&(f=0),R.push("visibility",0,a.visibility),ws(this,a,"visibility",f?"inherit":"hidden",d?"inherit":"hidden",!d)),g!=="scale"&&g!=="transform"&&(g=Mr[g],~g.indexOf(",")&&(g=g.split(",")[0]))),x=g in is,x){if(this.styles.save(g),v||(E=e._gsap,E.renderTransform&&!t.parseTransform||ec(e,t.parseTransform),M=t.smoothOrigin!==!1&&E.smooth,v=this._pt=new yi(this._pt,a,hn,0,1,E.renderTransform,E,0,-1),v.dep=1),g==="scale")this._pt=new yi(this._pt,E,"scaleY",E.scaleY,(b?da(E.scaleY,b+d):d)-E.scaleY||0,bh),this._pt.u=0,o.push("scaleY",g),g+="X";else if(g==="transformOrigin"){R.push(bi,0,a[bi]),u=cC(u),E.svg?Mh(e,u,0,M,0,this):(p=parseFloat(u.split(" ")[2])||0,p!==E.zOrigin&&ws(this,E,"zOrigin",E.zOrigin,p),ws(this,a,g,Nu(c),Nu(u)));continue}else if(g==="svgOrigin"){Mh(e,u,1,M,0,this);continue}else if(g in wx){hC(this,E,g,f,b?da(f,b+u):u);continue}else if(g==="smoothOrigin"){ws(this,E,"smooth",E.smooth,u);continue}else if(g==="force3D"){E[g]=u;continue}else if(g==="transform"){pC(this,u,e);continue}}else g in a||(g=Oa(g)||g);if(x||(d||d===0)&&(f||f===0)&&!jA.test(u)&&g in a)m=(c+"").substr((f+"").length),d||(d=0),p=Yn(u)||(g in Oi.units?Oi.units[g]:m),m!==p&&(f=Fs(e,g,c,p)),this._pt=new yi(this._pt,x?E:a,g,f,(b?da(f,b+d):d)-f,!x&&(p==="px"||g==="zIndex")&&t.autoRound!==!1?JA:bh),this._pt.u=p||0,m!==p&&p!=="%"&&(this._pt.b=c,this._pt.r=ZA);else if(g in a)lC.call(this,e,g,c,b?b+u:u);else if(g in e)this.add(e,g,c||e[g],b?b+u:u,i,s);else if(g!=="parseTransform"){_p(g,u);continue}x||(g in a?R.push(g,0,a[g]):typeof e[g]=="function"?R.push(g,2,e[g]()):R.push(g,1,c||e[g])),o.push(g)}}T&&hx(this)},render:function(e,t){if(t.tween._time||!Ap())for(var n=t._pt;n;)n.r(e,n.d),n=n._next;else t.styles.revert()},get:Wr,aliases:Mr,getSetter:function(e,t,n){var i=Mr[t];return i&&i.indexOf(",")<0&&(t=i),t in is&&t!==bi&&(e._gsap.x||Wr(e,"x"))?n&&L0===n?t==="scale"?nC:tC:(L0=n||{})&&(t==="scale"?iC:rC):e.style&&!pp(e.style[t])?QA:~t.indexOf("-")?eC:Mp(e,t)},core:{_removeProperty:wo,_getMatrix:Rp}};wi.utils.checkPrefix=Oa;wi.core.getStyleSaver=xx;(function(r,e,t,n){var i=vi(r+","+e+","+t,function(s){is[s]=1});vi(e,function(s){Oi.units[s]="deg",wx[s]=1}),Mr[i[13]]=r+","+e,vi(n,function(s){var o=s.split(":");Mr[o[1]]=i[o[0]]})})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent","rotation,rotationX,rotationY,skewX,skewY","transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective","0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");vi("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective",function(r){Oi.units[r]="px"});wi.registerPlugin(Tx);var fe=wi.registerPlugin(Tx)||wi;fe.core.Tween;function Bc(r,e){const t=document.querySelector(`#${r} .number`);if(!t)return;let n;r==="days"&&e>=100?n=String(e):n=("0"+e).slice(-2),t.textContent!==n?fe.to(t,{duration:.2,opacity:0,y:-10,ease:"power2.in",onComplete:()=>{t.textContent=n,fe.fromTo(t,{opacity:0,y:10},{duration:.3,opacity:1,y:0,ease:"power2.out"})}}):t.textContent=n}function mC(r){function e(){const t=Date.now(),n=r-t;if(n<0)return;const i=Math.floor(n/(1e3*60*60*24)),s=Math.floor(n%(1e3*60*60*24)/(1e3*60*60)),o=Math.floor(n%(1e3*60*60)/(1e3*60)),a=Math.floor(n%(1e3*60)/1e3);i>=100?String(i):("0"+i).slice(-2),("0"+s).slice(-2),("0"+o).slice(-2),("0"+a).slice(-2),Bc("days",i),Bc("hours",s),Bc("minutes",o),Bc("seconds",a)}e(),setInterval(e,1e3)}function gC(r,e){for(var t=0;t<e.length;t++){var n=e[t];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(r,n.key,n)}}function _C(r,e,t){return e&&gC(r.prototype,e),r}/*!
 * Observer 3.12.7
 * https://gsap.com
 *
 * @license Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license or for
 * Club GSAP members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/var zn,uu,Li,Ss,Ms,pa,Ex,to,Cl,Ax,Kr,tr,Cx,Rx=function(){return zn||typeof window<"u"&&(zn=window.gsap)&&zn.registerPlugin&&zn},Px=1,aa=[],Tt=[],Rr=[],Rl=Date.now,Th=function(e,t){return t},xC=function(){var e=Cl.core,t=e.bridge||{},n=e._scrollers,i=e._proxies;n.push.apply(n,Tt),i.push.apply(i,Rr),Tt=n,Rr=i,Th=function(o,a){return t[o](a)}},Ls=function(e,t){return~Rr.indexOf(e)&&Rr[Rr.indexOf(e)+1][t]},Pl=function(e){return!!~Ax.indexOf(e)},ii=function(e,t,n,i,s){return e.addEventListener(t,n,{passive:i!==!1,capture:!!s})},ni=function(e,t,n,i){return e.removeEventListener(t,n,!!i)},zc="scrollLeft",Vc="scrollTop",Eh=function(){return Kr&&Kr.isPressed||Tt.cache++},Fu=function(e,t){var n=function i(s){if(s||s===0){Px&&(Li.history.scrollRestoration="manual");var o=Kr&&Kr.isPressed;s=i.v=Math.round(s)||(Kr&&Kr.iOS?1:0),e(s),i.cacheID=Tt.cache,o&&Th("ss",s)}else(t||Tt.cache!==i.cacheID||Th("ref"))&&(i.cacheID=Tt.cache,i.v=e());return i.v+i.offset};return n.offset=0,e&&n},di={s:zc,p:"left",p2:"Left",os:"right",os2:"Right",d:"width",d2:"Width",a:"x",sc:Fu(function(r){return arguments.length?Li.scrollTo(r,An.sc()):Li.pageXOffset||Ss[zc]||Ms[zc]||pa[zc]||0})},An={s:Vc,p:"top",p2:"Top",os:"bottom",os2:"Bottom",d:"height",d2:"Height",a:"y",op:di,sc:Fu(function(r){return arguments.length?Li.scrollTo(di.sc(),r):Li.pageYOffset||Ss[Vc]||Ms[Vc]||pa[Vc]||0})},gi=function(e,t){return(t&&t._ctx&&t._ctx.selector||zn.utils.toArray)(e)[0]||(typeof e=="string"&&zn.config().nullTargetWarn!==!1?console.warn("Element not found:",e):null)},Us=function(e,t){var n=t.s,i=t.sc;Pl(e)&&(e=Ss.scrollingElement||Ms);var s=Tt.indexOf(e),o=i===An.sc?1:2;!~s&&(s=Tt.push(e)-1),Tt[s+o]||ii(e,"scroll",Eh);var a=Tt[s+o],l=a||(Tt[s+o]=Fu(Ls(e,n),!0)||(Pl(e)?i:Fu(function(c){return arguments.length?e[n]=c:e[n]})));return l.target=e,a||(l.smooth=zn.getProperty(e,"scrollBehavior")==="smooth"),l},Ah=function(e,t,n){var i=e,s=e,o=Rl(),a=o,l=t||50,c=Math.max(500,l*3),u=function(_,g){var m=Rl();g||m-o>l?(s=i,i=_,a=o,o=m):n?i+=_:i=s+(_-s)/(m-a)*(o-a)},d=function(){s=i=n?0:i,a=o=0},f=function(_){var g=a,m=s,p=Rl();return(_||_===0)&&_!==i&&u(_),o===a||p-a>c?0:(i+(n?m:-m))/((n?p:o)-g)*1e3};return{update:u,reset:d,getVelocity:f}},nl=function(e,t){return t&&!e._gsapAllow&&e.preventDefault(),e.changedTouches?e.changedTouches[0]:e},z0=function(e){var t=Math.max.apply(Math,e),n=Math.min.apply(Math,e);return Math.abs(t)>=Math.abs(n)?t:n},Lx=function(){Cl=zn.core.globals().ScrollTrigger,Cl&&Cl.core&&xC()},Dx=function(e){return zn=e||Rx(),!uu&&zn&&typeof document<"u"&&document.body&&(Li=window,Ss=document,Ms=Ss.documentElement,pa=Ss.body,Ax=[Li,Ss,Ms,pa],zn.utils.clamp,Cx=zn.core.context||function(){},to="onpointerenter"in pa?"pointer":"mouse",Ex=_n.isTouch=Li.matchMedia&&Li.matchMedia("(hover: none), (pointer: coarse)").matches?1:"ontouchstart"in Li||navigator.maxTouchPoints>0||navigator.msMaxTouchPoints>0?2:0,tr=_n.eventTypes=("ontouchstart"in Ms?"touchstart,touchmove,touchcancel,touchend":"onpointerdown"in Ms?"pointerdown,pointermove,pointercancel,pointerup":"mousedown,mousemove,mouseup,mouseup").split(","),setTimeout(function(){return Px=0},500),Lx(),uu=1),uu};di.op=An;Tt.cache=0;var _n=(function(){function r(t){this.init(t)}var e=r.prototype;return e.init=function(n){uu||Dx(zn)||console.warn("Please gsap.registerPlugin(Observer)"),Cl||Lx();var i=n.tolerance,s=n.dragMinimum,o=n.type,a=n.target,l=n.lineHeight,c=n.debounce,u=n.preventDefault,d=n.onStop,f=n.onStopDelay,h=n.ignore,_=n.wheelSpeed,g=n.event,m=n.onDragStart,p=n.onDragEnd,b=n.onDrag,x=n.onPress,v=n.onRelease,E=n.onRight,M=n.onLeft,T=n.onUp,R=n.onDown,w=n.onChangeX,y=n.onChangeY,D=n.onChange,N=n.onToggleX,V=n.onToggleY,j=n.onHover,k=n.onHoverEnd,G=n.onMove,Y=n.ignoreCheck,F=n.isNormalizer,ae=n.onGestureStart,O=n.onGestureEnd,he=n.onWheel,P=n.onEnable,Me=n.onDisable,Ne=n.onClick,ze=n.scrollSpeed,te=n.capture,ie=n.allowClicks,K=n.lockAxis,Ue=n.onLockAxis;this.target=a=gi(a)||Ms,this.vars=n,h&&(h=zn.utils.toArray(h)),i=i||1e-9,s=s||0,_=_||1,ze=ze||1,o=o||"wheel,touch,pointer",c=c!==!1,l||(l=parseFloat(Li.getComputedStyle(pa).lineHeight)||22);var be,je,pt,Te,tt,U,ot,X=this,ft=0,Le=0,wt=n.passive||!u&&n.passive!==!1,Re=Us(a,di),Fe=Us(a,An),I=Re(),C=Fe(),q=~o.indexOf("touch")&&!~o.indexOf("pointer")&&tr[0]==="pointerdown",oe=Pl(a),se=a.ownerDocument||Ss,Q=[0,0,0],ke=[0,0,0],ve=0,Qe=function(){return ve=Rl()},Ce=function(Ke,at){return(X.event=Ke)&&h&&~h.indexOf(Ke.target)||at&&q&&Ke.pointerType!=="touch"||Y&&Y(Ke,at)},le=function(){X._vx.reset(),X._vy.reset(),je.pause(),d&&d(X)},me=function(){var Ke=X.deltaX=z0(Q),at=X.deltaY=z0(ke),Pe=Math.abs(Ke)>=i,lt=Math.abs(at)>=i;D&&(Pe||lt)&&D(X,Ke,at,Q,ke),Pe&&(E&&X.deltaX>0&&E(X),M&&X.deltaX<0&&M(X),w&&w(X),N&&X.deltaX<0!=ft<0&&N(X),ft=X.deltaX,Q[0]=Q[1]=Q[2]=0),lt&&(R&&X.deltaY>0&&R(X),T&&X.deltaY<0&&T(X),y&&y(X),V&&X.deltaY<0!=Le<0&&V(X),Le=X.deltaY,ke[0]=ke[1]=ke[2]=0),(Te||pt)&&(G&&G(X),pt&&(m&&pt===1&&m(X),b&&b(X),pt=0),Te=!1),U&&!(U=!1)&&Ue&&Ue(X),tt&&(he(X),tt=!1),be=0},Ge=function(Ke,at,Pe){Q[Pe]+=Ke,ke[Pe]+=at,X._vx.update(Ke),X._vy.update(at),c?be||(be=requestAnimationFrame(me)):me()},Ie=function(Ke,at){K&&!ot&&(X.axis=ot=Math.abs(Ke)>Math.abs(at)?"x":"y",U=!0),ot!=="y"&&(Q[2]+=Ke,X._vx.update(Ke,!0)),ot!=="x"&&(ke[2]+=at,X._vy.update(at,!0)),c?be||(be=requestAnimationFrame(me)):me()},Ee=function(Ke){if(!Ce(Ke,1)){Ke=nl(Ke,u);var at=Ke.clientX,Pe=Ke.clientY,lt=at-X.x,nt=Pe-X.y,We=X.isDragging;X.x=at,X.y=Pe,(We||(lt||nt)&&(Math.abs(X.startX-at)>=s||Math.abs(X.startY-Pe)>=s))&&(pt=We?2:1,We||(X.isDragging=!0),Ie(lt,nt))}},et=X.onPress=function(Se){Ce(Se,1)||Se&&Se.button||(X.axis=ot=null,je.pause(),X.isPressed=!0,Se=nl(Se),ft=Le=0,X.startX=X.x=Se.clientX,X.startY=X.y=Se.clientY,X._vx.reset(),X._vy.reset(),ii(F?a:se,tr[1],Ee,wt,!0),X.deltaX=X.deltaY=0,x&&x(X))},L=X.onRelease=function(Se){if(!Ce(Se,1)){ni(F?a:se,tr[1],Ee,!0);var Ke=!isNaN(X.y-X.startY),at=X.isDragging,Pe=at&&(Math.abs(X.x-X.startX)>3||Math.abs(X.y-X.startY)>3),lt=nl(Se);!Pe&&Ke&&(X._vx.reset(),X._vy.reset(),u&&ie&&zn.delayedCall(.08,function(){if(Rl()-ve>300&&!Se.defaultPrevented){if(Se.target.click)Se.target.click();else if(se.createEvent){var nt=se.createEvent("MouseEvents");nt.initMouseEvent("click",!0,!0,Li,1,lt.screenX,lt.screenY,lt.clientX,lt.clientY,!1,!1,!1,!1,0,null),Se.target.dispatchEvent(nt)}}})),X.isDragging=X.isGesturing=X.isPressed=!1,d&&at&&!F&&je.restart(!0),pt&&me(),p&&at&&p(X),v&&v(X,Pe)}},xe=function(Ke){return Ke.touches&&Ke.touches.length>1&&(X.isGesturing=!0)&&ae(Ke,X.isDragging)},ge=function(){return(X.isGesturing=!1)||O(X)},_e=function(Ke){if(!Ce(Ke)){var at=Re(),Pe=Fe();Ge((at-I)*ze,(Pe-C)*ze,1),I=at,C=Pe,d&&je.restart(!0)}},ne=function(Ke){if(!Ce(Ke)){Ke=nl(Ke,u),he&&(tt=!0);var at=(Ke.deltaMode===1?l:Ke.deltaMode===2?Li.innerHeight:1)*_;Ge(Ke.deltaX*at,Ke.deltaY*at,0),d&&!F&&je.restart(!0)}},ce=function(Ke){if(!Ce(Ke)){var at=Ke.clientX,Pe=Ke.clientY,lt=at-X.x,nt=Pe-X.y;X.x=at,X.y=Pe,Te=!0,d&&je.restart(!0),(lt||nt)&&Ie(lt,nt)}},Ve=function(Ke){X.event=Ke,j(X)},we=function(Ke){X.event=Ke,k(X)},Ft=function(Ke){return Ce(Ke)||nl(Ke,u)&&Ne(X)};je=X._dc=zn.delayedCall(f||.25,le).pause(),X.deltaX=X.deltaY=0,X._vx=Ah(0,50,!0),X._vy=Ah(0,50,!0),X.scrollX=Re,X.scrollY=Fe,X.isDragging=X.isGesturing=X.isPressed=!1,Cx(this),X.enable=function(Se){return X.isEnabled||(ii(oe?se:a,"scroll",Eh),o.indexOf("scroll")>=0&&ii(oe?se:a,"scroll",_e,wt,te),o.indexOf("wheel")>=0&&ii(a,"wheel",ne,wt,te),(o.indexOf("touch")>=0&&Ex||o.indexOf("pointer")>=0)&&(ii(a,tr[0],et,wt,te),ii(se,tr[2],L),ii(se,tr[3],L),ie&&ii(a,"click",Qe,!0,!0),Ne&&ii(a,"click",Ft),ae&&ii(se,"gesturestart",xe),O&&ii(se,"gestureend",ge),j&&ii(a,to+"enter",Ve),k&&ii(a,to+"leave",we),G&&ii(a,to+"move",ce)),X.isEnabled=!0,X.isDragging=X.isGesturing=X.isPressed=Te=pt=!1,X._vx.reset(),X._vy.reset(),I=Re(),C=Fe(),Se&&Se.type&&et(Se),P&&P(X)),X},X.disable=function(){X.isEnabled&&(aa.filter(function(Se){return Se!==X&&Pl(Se.target)}).length||ni(oe?se:a,"scroll",Eh),X.isPressed&&(X._vx.reset(),X._vy.reset(),ni(F?a:se,tr[1],Ee,!0)),ni(oe?se:a,"scroll",_e,te),ni(a,"wheel",ne,te),ni(a,tr[0],et,te),ni(se,tr[2],L),ni(se,tr[3],L),ni(a,"click",Qe,!0),ni(a,"click",Ft),ni(se,"gesturestart",xe),ni(se,"gestureend",ge),ni(a,to+"enter",Ve),ni(a,to+"leave",we),ni(a,to+"move",ce),X.isEnabled=X.isPressed=X.isDragging=!1,Me&&Me(X))},X.kill=X.revert=function(){X.disable();var Se=aa.indexOf(X);Se>=0&&aa.splice(Se,1),Kr===X&&(Kr=0)},aa.push(X),F&&Pl(a)&&(Kr=X),X.enable(g)},_C(r,[{key:"velocityX",get:function(){return this._vx.getVelocity()}},{key:"velocityY",get:function(){return this._vy.getVelocity()}}]),r})();_n.version="3.12.7";_n.create=function(r){return new _n(r)};_n.register=Dx;_n.getAll=function(){return aa.slice()};_n.getById=function(r){return aa.filter(function(e){return e.vars.id===r})[0]};Rx()&&zn.registerPlugin(_n);/*!
 * ScrollTrigger 3.12.7
 * https://gsap.com
 *
 * @license Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license or for
 * Club GSAP members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/var qe,na,Mt,nn,Ri,Wt,Pp,Uu,tc,Ll,fl,Hc,Xn,ed,Ch,oi,V0,H0,ia,Ix,ef,Ox,si,Rh,Nx,Fx,gs,Ph,Lp,ma,Dp,ku,Lh,tf,Gc=1,qn=Date.now,nf=qn(),ji=0,hl=0,G0=function(e,t,n){var i=Ai(e)&&(e.substr(0,6)==="clamp("||e.indexOf("max")>-1);return n["_"+t+"Clamp"]=i,i?e.substr(6,e.length-7):e},W0=function(e,t){return t&&(!Ai(e)||e.substr(0,6)!=="clamp(")?"clamp("+e+")":e},vC=function r(){return hl&&requestAnimationFrame(r)},X0=function(){return ed=1},q0=function(){return ed=0},xr=function(e){return e},pl=function(e){return Math.round(e*1e5)/1e5||0},Ux=function(){return typeof window<"u"},kx=function(){return qe||Ux()&&(qe=window.gsap)&&qe.registerPlugin&&qe},So=function(e){return!!~Pp.indexOf(e)},Bx=function(e){return(e==="Height"?Dp:Mt["inner"+e])||Ri["client"+e]||Wt["client"+e]},zx=function(e){return Ls(e,"getBoundingClientRect")||(So(e)?function(){return mu.width=Mt.innerWidth,mu.height=Dp,mu}:function(){return qr(e)})},yC=function(e,t,n){var i=n.d,s=n.d2,o=n.a;return(o=Ls(e,"getBoundingClientRect"))?function(){return o()[i]}:function(){return(t?Bx(s):e["client"+s])||0}},bC=function(e,t){return!t||~Rr.indexOf(e)?zx(e):function(){return mu}},Tr=function(e,t){var n=t.s,i=t.d2,s=t.d,o=t.a;return Math.max(0,(n="scroll"+i)&&(o=Ls(e,n))?o()-zx(e)()[s]:So(e)?(Ri[n]||Wt[n])-Bx(i):e[n]-e["offset"+i])},Wc=function(e,t){for(var n=0;n<ia.length;n+=3)(!t||~t.indexOf(ia[n+1]))&&e(ia[n],ia[n+1],ia[n+2])},Ai=function(e){return typeof e=="string"},$n=function(e){return typeof e=="function"},ml=function(e){return typeof e=="number"},no=function(e){return typeof e=="object"},il=function(e,t,n){return e&&e.progress(t?0:1)&&n&&e.pause()},rf=function(e,t){if(e.enabled){var n=e._ctx?e._ctx.add(function(){return t(e)}):t(e);n&&n.totalTime&&(e.callbackAnimation=n)}},Zo=Math.abs,Vx="left",Hx="top",Ip="right",Op="bottom",_o="width",xo="height",Dl="Right",Il="Left",Ol="Top",Nl="Bottom",wn="padding",Hi="margin",Na="Width",Np="Height",En="px",Gi=function(e){return Mt.getComputedStyle(e)},wC=function(e){var t=Gi(e).position;e.style.position=t==="absolute"||t==="fixed"?t:"relative"},Y0=function(e,t){for(var n in t)n in e||(e[n]=t[n]);return e},qr=function(e,t){var n=t&&Gi(e)[Ch]!=="matrix(1, 0, 0, 1, 0, 0)"&&qe.to(e,{x:0,y:0,xPercent:0,yPercent:0,rotation:0,rotationX:0,rotationY:0,scale:1,skewX:0,skewY:0}).progress(1),i=e.getBoundingClientRect();return n&&n.progress(0).kill(),i},Bu=function(e,t){var n=t.d2;return e["offset"+n]||e["client"+n]||0},Gx=function(e){var t=[],n=e.labels,i=e.duration(),s;for(s in n)t.push(n[s]/i);return t},SC=function(e){return function(t){return qe.utils.snap(Gx(e),t)}},Fp=function(e){var t=qe.utils.snap(e),n=Array.isArray(e)&&e.slice(0).sort(function(i,s){return i-s});return n?function(i,s,o){o===void 0&&(o=.001);var a;if(!s)return t(i);if(s>0){for(i-=o,a=0;a<n.length;a++)if(n[a]>=i)return n[a];return n[a-1]}else for(a=n.length,i+=o;a--;)if(n[a]<=i)return n[a];return n[0]}:function(i,s,o){o===void 0&&(o=.001);var a=t(i);return!s||Math.abs(a-i)<o||a-i<0==s<0?a:t(s<0?i-e:i+e)}},MC=function(e){return function(t,n){return Fp(Gx(e))(t,n.direction)}},Xc=function(e,t,n,i){return n.split(",").forEach(function(s){return e(t,s,i)})},Fn=function(e,t,n,i,s){return e.addEventListener(t,n,{passive:!i,capture:!!s})},Nn=function(e,t,n,i){return e.removeEventListener(t,n,!!i)},qc=function(e,t,n){n=n&&n.wheelHandler,n&&(e(t,"wheel",n),e(t,"touchmove",n))},$0={startColor:"green",endColor:"red",indent:0,fontSize:"16px",fontWeight:"normal"},Yc={toggleActions:"play",anticipatePin:0},zu={top:0,left:0,center:.5,bottom:1,right:1},du=function(e,t){if(Ai(e)){var n=e.indexOf("="),i=~n?+(e.charAt(n-1)+1)*parseFloat(e.substr(n+1)):0;~n&&(e.indexOf("%")>n&&(i*=t/100),e=e.substr(0,n-1)),e=i+(e in zu?zu[e]*t:~e.indexOf("%")?parseFloat(e)*t/100:parseFloat(e)||0)}return e},$c=function(e,t,n,i,s,o,a,l){var c=s.startColor,u=s.endColor,d=s.fontSize,f=s.indent,h=s.fontWeight,_=nn.createElement("div"),g=So(n)||Ls(n,"pinType")==="fixed",m=e.indexOf("scroller")!==-1,p=g?Wt:n,b=e.indexOf("start")!==-1,x=b?c:u,v="border-color:"+x+";font-size:"+d+";color:"+x+";font-weight:"+h+";pointer-events:none;white-space:nowrap;font-family:sans-serif,Arial;z-index:1000;padding:4px 8px;border-width:0;border-style:solid;";return v+="position:"+((m||l)&&g?"fixed;":"absolute;"),(m||l||!g)&&(v+=(i===An?Ip:Op)+":"+(o+parseFloat(f))+"px;"),a&&(v+="box-sizing:border-box;text-align:left;width:"+a.offsetWidth+"px;"),_._isStart=b,_.setAttribute("class","gsap-marker-"+e+(t?" marker-"+t:"")),_.style.cssText=v,_.innerText=t||t===0?e+"-"+t:e,p.children[0]?p.insertBefore(_,p.children[0]):p.appendChild(_),_._offset=_["offset"+i.op.d2],fu(_,0,i,b),_},fu=function(e,t,n,i){var s={display:"block"},o=n[i?"os2":"p2"],a=n[i?"p2":"os2"];e._isFlipped=i,s[n.a+"Percent"]=i?-100:0,s[n.a]=i?"1px":0,s["border"+o+Na]=1,s["border"+a+Na]=0,s[n.p]=t+"px",qe.set(e,s)},bt=[],Dh={},nc,j0=function(){return qn()-ji>34&&(nc||(nc=requestAnimationFrame(es)))},Jo=function(){(!si||!si.isPressed||si.startX>Wt.clientWidth)&&(Tt.cache++,si?nc||(nc=requestAnimationFrame(es)):es(),ji||To("scrollStart"),ji=qn())},sf=function(){Fx=Mt.innerWidth,Nx=Mt.innerHeight},gl=function(e){Tt.cache++,(e===!0||!Xn&&!Ox&&!nn.fullscreenElement&&!nn.webkitFullscreenElement&&(!Rh||Fx!==Mt.innerWidth||Math.abs(Mt.innerHeight-Nx)>Mt.innerHeight*.25))&&Uu.restart(!0)},Mo={},TC=[],Wx=function r(){return Nn(Xe,"scrollEnd",r)||lo(!0)},To=function(e){return Mo[e]&&Mo[e].map(function(t){return t()})||TC},Ei=[],Xx=function(e){for(var t=0;t<Ei.length;t+=5)(!e||Ei[t+4]&&Ei[t+4].query===e)&&(Ei[t].style.cssText=Ei[t+1],Ei[t].getBBox&&Ei[t].setAttribute("transform",Ei[t+2]||""),Ei[t+3].uncache=1)},Up=function(e,t){var n;for(oi=0;oi<bt.length;oi++)n=bt[oi],n&&(!t||n._ctx===t)&&(e?n.kill(1):n.revert(!0,!0));ku=!0,t&&Xx(t),t||To("revert")},qx=function(e,t){Tt.cache++,(t||!ai)&&Tt.forEach(function(n){return $n(n)&&n.cacheID++&&(n.rec=0)}),Ai(e)&&(Mt.history.scrollRestoration=Lp=e)},ai,vo=0,K0,EC=function(){if(K0!==vo){var e=K0=vo;requestAnimationFrame(function(){return e===vo&&lo(!0)})}},Yx=function(){Wt.appendChild(ma),Dp=!si&&ma.offsetHeight||Mt.innerHeight,Wt.removeChild(ma)},Z0=function(e){return tc(".gsap-marker-start, .gsap-marker-end, .gsap-marker-scroller-start, .gsap-marker-scroller-end").forEach(function(t){return t.style.display=e?"none":"block"})},lo=function(e,t){if(Ri=nn.documentElement,Wt=nn.body,Pp=[Mt,nn,Ri,Wt],ji&&!e&&!ku){Fn(Xe,"scrollEnd",Wx);return}Yx(),ai=Xe.isRefreshing=!0,Tt.forEach(function(i){return $n(i)&&++i.cacheID&&(i.rec=i())});var n=To("refreshInit");Ix&&Xe.sort(),t||Up(),Tt.forEach(function(i){$n(i)&&(i.smooth&&(i.target.style.scrollBehavior="auto"),i(0))}),bt.slice(0).forEach(function(i){return i.refresh()}),ku=!1,bt.forEach(function(i){if(i._subPinOffset&&i.pin){var s=i.vars.horizontal?"offsetWidth":"offsetHeight",o=i.pin[s];i.revert(!0,1),i.adjustPinSpacing(i.pin[s]-o),i.refresh()}}),Lh=1,Z0(!0),bt.forEach(function(i){var s=Tr(i.scroller,i._dir),o=i.vars.end==="max"||i._endClamp&&i.end>s,a=i._startClamp&&i.start>=s;(o||a)&&i.setPositions(a?s-1:i.start,o?Math.max(a?s:i.start+1,s):i.end,!0)}),Z0(!1),Lh=0,n.forEach(function(i){return i&&i.render&&i.render(-1)}),Tt.forEach(function(i){$n(i)&&(i.smooth&&requestAnimationFrame(function(){return i.target.style.scrollBehavior="smooth"}),i.rec&&i(i.rec))}),qx(Lp,1),Uu.pause(),vo++,ai=2,es(2),bt.forEach(function(i){return $n(i.vars.onRefresh)&&i.vars.onRefresh(i)}),ai=Xe.isRefreshing=!1,To("refresh")},Ih=0,hu=1,Fl,es=function(e){if(e===2||!ai&&!ku){Xe.isUpdating=!0,Fl&&Fl.update(0);var t=bt.length,n=qn(),i=n-nf>=50,s=t&&bt[0].scroll();if(hu=Ih>s?-1:1,ai||(Ih=s),i&&(ji&&!ed&&n-ji>200&&(ji=0,To("scrollEnd")),fl=nf,nf=n),hu<0){for(oi=t;oi-- >0;)bt[oi]&&bt[oi].update(0,i);hu=1}else for(oi=0;oi<t;oi++)bt[oi]&&bt[oi].update(0,i);Xe.isUpdating=!1}nc=0},Oh=[Vx,Hx,Op,Ip,Hi+Nl,Hi+Dl,Hi+Ol,Hi+Il,"display","flexShrink","float","zIndex","gridColumnStart","gridColumnEnd","gridRowStart","gridRowEnd","gridArea","justifySelf","alignSelf","placeSelf","order"],pu=Oh.concat([_o,xo,"boxSizing","max"+Na,"max"+Np,"position",Hi,wn,wn+Ol,wn+Dl,wn+Nl,wn+Il]),AC=function(e,t,n){ga(n);var i=e._gsap;if(i.spacerIsNative)ga(i.spacerState);else if(e._gsap.swappedIn){var s=t.parentNode;s&&(s.insertBefore(e,t),s.removeChild(t))}e._gsap.swappedIn=!1},of=function(e,t,n,i){if(!e._gsap.swappedIn){for(var s=Oh.length,o=t.style,a=e.style,l;s--;)l=Oh[s],o[l]=n[l];o.position=n.position==="absolute"?"absolute":"relative",n.display==="inline"&&(o.display="inline-block"),a[Op]=a[Ip]="auto",o.flexBasis=n.flexBasis||"auto",o.overflow="visible",o.boxSizing="border-box",o[_o]=Bu(e,di)+En,o[xo]=Bu(e,An)+En,o[wn]=a[Hi]=a[Hx]=a[Vx]="0",ga(i),a[_o]=a["max"+Na]=n[_o],a[xo]=a["max"+Np]=n[xo],a[wn]=n[wn],e.parentNode!==t&&(e.parentNode.insertBefore(t,e),t.appendChild(e)),e._gsap.swappedIn=!0}},CC=/([A-Z])/g,ga=function(e){if(e){var t=e.t.style,n=e.length,i=0,s,o;for((e.t._gsap||qe.core.getCache(e.t)).uncache=1;i<n;i+=2)o=e[i+1],s=e[i],o?t[s]=o:t[s]&&t.removeProperty(s.replace(CC,"-$1").toLowerCase())}},jc=function(e){for(var t=pu.length,n=e.style,i=[],s=0;s<t;s++)i.push(pu[s],n[pu[s]]);return i.t=e,i},RC=function(e,t,n){for(var i=[],s=e.length,o=n?8:0,a;o<s;o+=2)a=e[o],i.push(a,a in t?t[a]:e[o+1]);return i.t=e.t,i},mu={left:0,top:0},J0=function(e,t,n,i,s,o,a,l,c,u,d,f,h,_){$n(e)&&(e=e(l)),Ai(e)&&e.substr(0,3)==="max"&&(e=f+(e.charAt(4)==="="?du("0"+e.substr(3),n):0));var g=h?h.time():0,m,p,b;if(h&&h.seek(0),isNaN(e)||(e=+e),ml(e))h&&(e=qe.utils.mapRange(h.scrollTrigger.start,h.scrollTrigger.end,0,f,e)),a&&fu(a,n,i,!0);else{$n(t)&&(t=t(l));var x=(e||"0").split(" "),v,E,M,T;b=gi(t,l)||Wt,v=qr(b)||{},(!v||!v.left&&!v.top)&&Gi(b).display==="none"&&(T=b.style.display,b.style.display="block",v=qr(b),T?b.style.display=T:b.style.removeProperty("display")),E=du(x[0],v[i.d]),M=du(x[1]||"0",n),e=v[i.p]-c[i.p]-u+E+s-M,a&&fu(a,M,i,n-M<20||a._isStart&&M>20),n-=n-M}if(_&&(l[_]=e||-.001,e<0&&(e=0)),o){var R=e+n,w=o._isStart;m="scroll"+i.d2,fu(o,R,i,w&&R>20||!w&&(d?Math.max(Wt[m],Ri[m]):o.parentNode[m])<=R+1),d&&(c=qr(a),d&&(o.style[i.op.p]=c[i.op.p]-i.op.m-o._offset+En))}return h&&b&&(m=qr(b),h.seek(f),p=qr(b),h._caScrollDist=m[i.p]-p[i.p],e=e/h._caScrollDist*f),h&&h.seek(g),h?e:Math.round(e)},PC=/(webkit|moz|length|cssText|inset)/i,Q0=function(e,t,n,i){if(e.parentNode!==t){var s=e.style,o,a;if(t===Wt){e._stOrig=s.cssText,a=Gi(e);for(o in a)!+o&&!PC.test(o)&&a[o]&&typeof s[o]=="string"&&o!=="0"&&(s[o]=a[o]);s.top=n,s.left=i}else s.cssText=e._stOrig;qe.core.getCache(e).uncache=1,t.appendChild(e)}},$x=function(e,t,n){var i=t,s=i;return function(o){var a=Math.round(e());return a!==i&&a!==s&&Math.abs(a-i)>3&&Math.abs(a-s)>3&&(o=a,n&&n()),s=i,i=Math.round(o),i}},Kc=function(e,t,n){var i={};i[t.p]="+="+n,qe.set(e,i)},eg=function(e,t){var n=Us(e,t),i="_scroll"+t.p2,s=function o(a,l,c,u,d){var f=o.tween,h=l.onComplete,_={};c=c||n();var g=$x(n,c,function(){f.kill(),o.tween=0});return d=u&&d||0,u=u||a-c,f&&f.kill(),l[i]=a,l.inherit=!1,l.modifiers=_,_[i]=function(){return g(c+u*f.ratio+d*f.ratio*f.ratio)},l.onUpdate=function(){Tt.cache++,o.tween&&es()},l.onComplete=function(){o.tween=0,h&&h.call(f)},f=o.tween=qe.to(e,l),f};return e[i]=n,n.wheelHandler=function(){return s.tween&&s.tween.kill()&&(s.tween=0)},Fn(e,"wheel",n.wheelHandler),Xe.isTouch&&Fn(e,"touchmove",n.wheelHandler),s},Xe=(function(){function r(t,n){na||r.register(qe)||console.warn("Please gsap.registerPlugin(ScrollTrigger)"),Ph(this),this.init(t,n)}var e=r.prototype;return e.init=function(n,i){if(this.progress=this.start=0,this.vars&&this.kill(!0,!0),!hl){this.update=this.refresh=this.kill=xr;return}n=Y0(Ai(n)||ml(n)||n.nodeType?{trigger:n}:n,Yc);var s=n,o=s.onUpdate,a=s.toggleClass,l=s.id,c=s.onToggle,u=s.onRefresh,d=s.scrub,f=s.trigger,h=s.pin,_=s.pinSpacing,g=s.invalidateOnRefresh,m=s.anticipatePin,p=s.onScrubComplete,b=s.onSnapComplete,x=s.once,v=s.snap,E=s.pinReparent,M=s.pinSpacer,T=s.containerAnimation,R=s.fastScrollEnd,w=s.preventOverlaps,y=n.horizontal||n.containerAnimation&&n.horizontal!==!1?di:An,D=!d&&d!==0,N=gi(n.scroller||Mt),V=qe.core.getCache(N),j=So(N),k=("pinType"in n?n.pinType:Ls(N,"pinType")||j&&"fixed")==="fixed",G=[n.onEnter,n.onLeave,n.onEnterBack,n.onLeaveBack],Y=D&&n.toggleActions.split(" "),F="markers"in n?n.markers:Yc.markers,ae=j?0:parseFloat(Gi(N)["border"+y.p2+Na])||0,O=this,he=n.onRefreshInit&&function(){return n.onRefreshInit(O)},P=yC(N,j,y),Me=bC(N,j),Ne=0,ze=0,te=0,ie=Us(N,y),K,Ue,be,je,pt,Te,tt,U,ot,X,ft,Le,wt,Re,Fe,I,C,q,oe,se,Q,ke,ve,Qe,Ce,le,me,Ge,Ie,Ee,et,L,xe,ge,_e,ne,ce,Ve,we;if(O._startClamp=O._endClamp=!1,O._dir=y,m*=45,O.scroller=N,O.scroll=T?T.time.bind(T):ie,je=ie(),O.vars=n,i=i||n.animation,"refreshPriority"in n&&(Ix=1,n.refreshPriority===-9999&&(Fl=O)),V.tweenScroll=V.tweenScroll||{top:eg(N,An),left:eg(N,di)},O.tweenTo=K=V.tweenScroll[y.p],O.scrubDuration=function(Pe){xe=ml(Pe)&&Pe,xe?L?L.duration(Pe):L=qe.to(i,{ease:"expo",totalProgress:"+=0",inherit:!1,duration:xe,paused:!0,onComplete:function(){return p&&p(O)}}):(L&&L.progress(1).kill(),L=0)},i&&(i.vars.lazy=!1,i._initted&&!O.isReverted||i.vars.immediateRender!==!1&&n.immediateRender!==!1&&i.duration()&&i.render(0,!0,!0),O.animation=i.pause(),i.scrollTrigger=O,O.scrubDuration(d),Ee=0,l||(l=i.vars.id)),v&&((!no(v)||v.push)&&(v={snapTo:v}),"scrollBehavior"in Wt.style&&qe.set(j?[Wt,Ri]:N,{scrollBehavior:"auto"}),Tt.forEach(function(Pe){return $n(Pe)&&Pe.target===(j?nn.scrollingElement||Ri:N)&&(Pe.smooth=!1)}),be=$n(v.snapTo)?v.snapTo:v.snapTo==="labels"?SC(i):v.snapTo==="labelsDirectional"?MC(i):v.directional!==!1?function(Pe,lt){return Fp(v.snapTo)(Pe,qn()-ze<500?0:lt.direction)}:qe.utils.snap(v.snapTo),ge=v.duration||{min:.1,max:2},ge=no(ge)?Ll(ge.min,ge.max):Ll(ge,ge),_e=qe.delayedCall(v.delay||xe/2||.1,function(){var Pe=ie(),lt=qn()-ze<500,nt=K.tween;if((lt||Math.abs(O.getVelocity())<10)&&!nt&&!ed&&Ne!==Pe){var We=(Pe-Te)/Re,en=i&&!D?i.totalProgress():We,gt=lt?0:(en-et)/(qn()-fl)*1e3||0,_t=qe.utils.clamp(-We,1-We,Zo(gt/2)*gt/.185),Dt=We+(v.inertia===!1?0:_t),Vt,kt,At=v,dn=At.onStart,Ht=At.onInterrupt,Gt=At.onComplete;if(Vt=be(Dt,O),ml(Vt)||(Vt=Dt),kt=Math.max(0,Math.round(Te+Vt*Re)),Pe<=tt&&Pe>=Te&&kt!==Pe){if(nt&&!nt._initted&&nt.data<=Zo(kt-Pe))return;v.inertia===!1&&(_t=Vt-We),K(kt,{duration:ge(Zo(Math.max(Zo(Dt-en),Zo(Vt-en))*.185/gt/.05||0)),ease:v.ease||"power3",data:Zo(kt-Pe),onInterrupt:function(){return _e.restart(!0)&&Ht&&Ht(O)},onComplete:function(){O.update(),Ne=ie(),i&&!D&&(L?L.resetTo("totalProgress",Vt,i._tTime/i._tDur):i.progress(Vt)),Ee=et=i&&!D?i.totalProgress():O.progress,b&&b(O),Gt&&Gt(O)}},Pe,_t*Re,kt-Pe-_t*Re),dn&&dn(O,K.tween)}}else O.isActive&&Ne!==Pe&&_e.restart(!0)}).pause()),l&&(Dh[l]=O),f=O.trigger=gi(f||h!==!0&&h),we=f&&f._gsap&&f._gsap.stRevert,we&&(we=we(O)),h=h===!0?f:gi(h),Ai(a)&&(a={targets:f,className:a}),h&&(_===!1||_===Hi||(_=!_&&h.parentNode&&h.parentNode.style&&Gi(h.parentNode).display==="flex"?!1:wn),O.pin=h,Ue=qe.core.getCache(h),Ue.spacer?Fe=Ue.pinState:(M&&(M=gi(M),M&&!M.nodeType&&(M=M.current||M.nativeElement),Ue.spacerIsNative=!!M,M&&(Ue.spacerState=jc(M))),Ue.spacer=q=M||nn.createElement("div"),q.classList.add("pin-spacer"),l&&q.classList.add("pin-spacer-"+l),Ue.pinState=Fe=jc(h)),n.force3D!==!1&&qe.set(h,{force3D:!0}),O.spacer=q=Ue.spacer,Ie=Gi(h),Qe=Ie[_+y.os2],se=qe.getProperty(h),Q=qe.quickSetter(h,y.a,En),of(h,q,Ie),C=jc(h)),F){Le=no(F)?Y0(F,$0):$0,X=$c("scroller-start",l,N,y,Le,0),ft=$c("scroller-end",l,N,y,Le,0,X),oe=X["offset"+y.op.d2];var Ft=gi(Ls(N,"content")||N);U=this.markerStart=$c("start",l,Ft,y,Le,oe,0,T),ot=this.markerEnd=$c("end",l,Ft,y,Le,oe,0,T),T&&(Ve=qe.quickSetter([U,ot],y.a,En)),!k&&!(Rr.length&&Ls(N,"fixedMarkers")===!0)&&(wC(j?Wt:N),qe.set([X,ft],{force3D:!0}),le=qe.quickSetter(X,y.a,En),Ge=qe.quickSetter(ft,y.a,En))}if(T){var Se=T.vars.onUpdate,Ke=T.vars.onUpdateParams;T.eventCallback("onUpdate",function(){O.update(0,0,1),Se&&Se.apply(T,Ke||[])})}if(O.previous=function(){return bt[bt.indexOf(O)-1]},O.next=function(){return bt[bt.indexOf(O)+1]},O.revert=function(Pe,lt){if(!lt)return O.kill(!0);var nt=Pe!==!1||!O.enabled,We=Xn;nt!==O.isReverted&&(nt&&(ne=Math.max(ie(),O.scroll.rec||0),te=O.progress,ce=i&&i.progress()),U&&[U,ot,X,ft].forEach(function(en){return en.style.display=nt?"none":"block"}),nt&&(Xn=O,O.update(nt)),h&&(!E||!O.isActive)&&(nt?AC(h,q,Fe):of(h,q,Gi(h),Ce)),nt||O.update(nt),Xn=We,O.isReverted=nt)},O.refresh=function(Pe,lt,nt,We){if(!((Xn||!O.enabled)&&!lt)){if(h&&Pe&&ji){Fn(r,"scrollEnd",Wx);return}!ai&&he&&he(O),Xn=O,K.tween&&!nt&&(K.tween.kill(),K.tween=0),L&&L.pause(),g&&i&&i.revert({kill:!1}).invalidate(),O.isReverted||O.revert(!0,!0),O._subPinOffset=!1;var en=P(),gt=Me(),_t=T?T.duration():Tr(N,y),Dt=Re<=.01,Vt=0,kt=We||0,At=no(nt)?nt.end:n.end,dn=n.endTrigger||f,Ht=no(nt)?nt.start:n.start||(n.start===0||!f?0:h?"0 0":"0 100%"),Gt=O.pinnedContainer=n.pinnedContainer&&gi(n.pinnedContainer,O),Qn=f&&Math.max(0,bt.indexOf(O))||0,Xt=Qn,qt,jt,A,z,Z,J,W,ye,De,Be,Ae,Ze,He;for(F&&no(nt)&&(Ze=qe.getProperty(X,y.p),He=qe.getProperty(ft,y.p));Xt-- >0;)J=bt[Xt],J.end||J.refresh(0,1)||(Xn=O),W=J.pin,W&&(W===f||W===h||W===Gt)&&!J.isReverted&&(Be||(Be=[]),Be.unshift(J),J.revert(!0,!0)),J!==bt[Xt]&&(Qn--,Xt--);for($n(Ht)&&(Ht=Ht(O)),Ht=G0(Ht,"start",O),Te=J0(Ht,f,en,y,ie(),U,X,O,gt,ae,k,_t,T,O._startClamp&&"_startClamp")||(h?-.001:0),$n(At)&&(At=At(O)),Ai(At)&&!At.indexOf("+=")&&(~At.indexOf(" ")?At=(Ai(Ht)?Ht.split(" ")[0]:"")+At:(Vt=du(At.substr(2),en),At=Ai(Ht)?Ht:(T?qe.utils.mapRange(0,T.duration(),T.scrollTrigger.start,T.scrollTrigger.end,Te):Te)+Vt,dn=f)),At=G0(At,"end",O),tt=Math.max(Te,J0(At||(dn?"100% 0":_t),dn,en,y,ie()+Vt,ot,ft,O,gt,ae,k,_t,T,O._endClamp&&"_endClamp"))||-.001,Vt=0,Xt=Qn;Xt--;)J=bt[Xt],W=J.pin,W&&J.start-J._pinPush<=Te&&!T&&J.end>0&&(qt=J.end-(O._startClamp?Math.max(0,J.start):J.start),(W===f&&J.start-J._pinPush<Te||W===Gt)&&isNaN(Ht)&&(Vt+=qt*(1-J.progress)),W===h&&(kt+=qt));if(Te+=Vt,tt+=Vt,O._startClamp&&(O._startClamp+=Vt),O._endClamp&&!ai&&(O._endClamp=tt||-.001,tt=Math.min(tt,Tr(N,y))),Re=tt-Te||(Te-=.01)&&.001,Dt&&(te=qe.utils.clamp(0,1,qe.utils.normalize(Te,tt,ne))),O._pinPush=kt,U&&Vt&&(qt={},qt[y.a]="+="+Vt,Gt&&(qt[y.p]="-="+ie()),qe.set([U,ot],qt)),h&&!(Lh&&O.end>=Tr(N,y)))qt=Gi(h),z=y===An,A=ie(),ke=parseFloat(se(y.a))+kt,!_t&&tt>1&&(Ae=(j?nn.scrollingElement||Ri:N).style,Ae={style:Ae,value:Ae["overflow"+y.a.toUpperCase()]},j&&Gi(Wt)["overflow"+y.a.toUpperCase()]!=="scroll"&&(Ae.style["overflow"+y.a.toUpperCase()]="scroll")),of(h,q,qt),C=jc(h),jt=qr(h,!0),ye=k&&Us(N,z?di:An)(),_?(Ce=[_+y.os2,Re+kt+En],Ce.t=q,Xt=_===wn?Bu(h,y)+Re+kt:0,Xt&&(Ce.push(y.d,Xt+En),q.style.flexBasis!=="auto"&&(q.style.flexBasis=Xt+En)),ga(Ce),Gt&&bt.forEach(function(Ye){Ye.pin===Gt&&Ye.vars.pinSpacing!==!1&&(Ye._subPinOffset=!0)}),k&&ie(ne)):(Xt=Bu(h,y),Xt&&q.style.flexBasis!=="auto"&&(q.style.flexBasis=Xt+En)),k&&(Z={top:jt.top+(z?A-Te:ye)+En,left:jt.left+(z?ye:A-Te)+En,boxSizing:"border-box",position:"fixed"},Z[_o]=Z["max"+Na]=Math.ceil(jt.width)+En,Z[xo]=Z["max"+Np]=Math.ceil(jt.height)+En,Z[Hi]=Z[Hi+Ol]=Z[Hi+Dl]=Z[Hi+Nl]=Z[Hi+Il]="0",Z[wn]=qt[wn],Z[wn+Ol]=qt[wn+Ol],Z[wn+Dl]=qt[wn+Dl],Z[wn+Nl]=qt[wn+Nl],Z[wn+Il]=qt[wn+Il],I=RC(Fe,Z,E),ai&&ie(0)),i?(De=i._initted,ef(1),i.render(i.duration(),!0,!0),ve=se(y.a)-ke+Re+kt,me=Math.abs(Re-ve)>1,k&&me&&I.splice(I.length-2,2),i.render(0,!0,!0),De||i.invalidate(!0),i.parent||i.totalTime(i.totalTime()),ef(0)):ve=Re,Ae&&(Ae.value?Ae.style["overflow"+y.a.toUpperCase()]=Ae.value:Ae.style.removeProperty("overflow-"+y.a));else if(f&&ie()&&!T)for(jt=f.parentNode;jt&&jt!==Wt;)jt._pinOffset&&(Te-=jt._pinOffset,tt-=jt._pinOffset),jt=jt.parentNode;Be&&Be.forEach(function(Ye){return Ye.revert(!1,!0)}),O.start=Te,O.end=tt,je=pt=ai?ne:ie(),!T&&!ai&&(je<ne&&ie(ne),O.scroll.rec=0),O.revert(!1,!0),ze=qn(),_e&&(Ne=-1,_e.restart(!0)),Xn=0,i&&D&&(i._initted||ce)&&i.progress()!==ce&&i.progress(ce||0,!0).render(i.time(),!0,!0),(Dt||te!==O.progress||T||g||i&&!i._initted)&&(i&&!D&&i.totalProgress(T&&Te<-.001&&!te?qe.utils.normalize(Te,tt,0):te,!0),O.progress=Dt||(je-Te)/Re===te?0:te),h&&_&&(q._pinOffset=Math.round(O.progress*ve)),L&&L.invalidate(),isNaN(Ze)||(Ze-=qe.getProperty(X,y.p),He-=qe.getProperty(ft,y.p),Kc(X,y,Ze),Kc(U,y,Ze-(We||0)),Kc(ft,y,He),Kc(ot,y,He-(We||0))),Dt&&!ai&&O.update(),u&&!ai&&!wt&&(wt=!0,u(O),wt=!1)}},O.getVelocity=function(){return(ie()-pt)/(qn()-fl)*1e3||0},O.endAnimation=function(){il(O.callbackAnimation),i&&(L?L.progress(1):i.paused()?D||il(i,O.direction<0,1):il(i,i.reversed()))},O.labelToScroll=function(Pe){return i&&i.labels&&(Te||O.refresh()||Te)+i.labels[Pe]/i.duration()*Re||0},O.getTrailing=function(Pe){var lt=bt.indexOf(O),nt=O.direction>0?bt.slice(0,lt).reverse():bt.slice(lt+1);return(Ai(Pe)?nt.filter(function(We){return We.vars.preventOverlaps===Pe}):nt).filter(function(We){return O.direction>0?We.end<=Te:We.start>=tt})},O.update=function(Pe,lt,nt){if(!(T&&!nt&&!Pe)){var We=ai===!0?ne:O.scroll(),en=Pe?0:(We-Te)/Re,gt=en<0?0:en>1?1:en||0,_t=O.progress,Dt,Vt,kt,At,dn,Ht,Gt,Qn;if(lt&&(pt=je,je=T?ie():We,v&&(et=Ee,Ee=i&&!D?i.totalProgress():gt)),m&&h&&!Xn&&!Gc&&ji&&(!gt&&Te<We+(We-pt)/(qn()-fl)*m?gt=1e-4:gt===1&&tt>We+(We-pt)/(qn()-fl)*m&&(gt=.9999)),gt!==_t&&O.enabled){if(Dt=O.isActive=!!gt&&gt<1,Vt=!!_t&&_t<1,Ht=Dt!==Vt,dn=Ht||!!gt!=!!_t,O.direction=gt>_t?1:-1,O.progress=gt,dn&&!Xn&&(kt=gt&&!_t?0:gt===1?1:_t===1?2:3,D&&(At=!Ht&&Y[kt+1]!=="none"&&Y[kt+1]||Y[kt],Qn=i&&(At==="complete"||At==="reset"||At in i))),w&&(Ht||Qn)&&(Qn||d||!i)&&($n(w)?w(O):O.getTrailing(w).forEach(function(A){return A.endAnimation()})),D||(L&&!Xn&&!Gc?(L._dp._time-L._start!==L._time&&L.render(L._dp._time-L._start),L.resetTo?L.resetTo("totalProgress",gt,i._tTime/i._tDur):(L.vars.totalProgress=gt,L.invalidate().restart())):i&&i.totalProgress(gt,!!(Xn&&(ze||Pe)))),h){if(Pe&&_&&(q.style[_+y.os2]=Qe),!k)Q(pl(ke+ve*gt));else if(dn){if(Gt=!Pe&&gt>_t&&tt+1>We&&We+1>=Tr(N,y),E)if(!Pe&&(Dt||Gt)){var Xt=qr(h,!0),qt=We-Te;Q0(h,Wt,Xt.top+(y===An?qt:0)+En,Xt.left+(y===An?0:qt)+En)}else Q0(h,q);ga(Dt||Gt?I:C),me&&gt<1&&Dt||Q(ke+(gt===1&&!Gt?ve:0))}}v&&!K.tween&&!Xn&&!Gc&&_e.restart(!0),a&&(Ht||x&&gt&&(gt<1||!tf))&&tc(a.targets).forEach(function(A){return A.classList[Dt||x?"add":"remove"](a.className)}),o&&!D&&!Pe&&o(O),dn&&!Xn?(D&&(Qn&&(At==="complete"?i.pause().totalProgress(1):At==="reset"?i.restart(!0).pause():At==="restart"?i.restart(!0):i[At]()),o&&o(O)),(Ht||!tf)&&(c&&Ht&&rf(O,c),G[kt]&&rf(O,G[kt]),x&&(gt===1?O.kill(!1,1):G[kt]=0),Ht||(kt=gt===1?1:3,G[kt]&&rf(O,G[kt]))),R&&!Dt&&Math.abs(O.getVelocity())>(ml(R)?R:2500)&&(il(O.callbackAnimation),L?L.progress(1):il(i,At==="reverse"?1:!gt,1))):D&&o&&!Xn&&o(O)}if(Ge){var jt=T?We/T.duration()*(T._caScrollDist||0):We;le(jt+(X._isFlipped?1:0)),Ge(jt)}Ve&&Ve(-We/T.duration()*(T._caScrollDist||0))}},O.enable=function(Pe,lt){O.enabled||(O.enabled=!0,Fn(N,"resize",gl),j||Fn(N,"scroll",Jo),he&&Fn(r,"refreshInit",he),Pe!==!1&&(O.progress=te=0,je=pt=Ne=ie()),lt!==!1&&O.refresh())},O.getTween=function(Pe){return Pe&&K?K.tween:L},O.setPositions=function(Pe,lt,nt,We){if(T){var en=T.scrollTrigger,gt=T.duration(),_t=en.end-en.start;Pe=en.start+_t*Pe/gt,lt=en.start+_t*lt/gt}O.refresh(!1,!1,{start:W0(Pe,nt&&!!O._startClamp),end:W0(lt,nt&&!!O._endClamp)},We),O.update()},O.adjustPinSpacing=function(Pe){if(Ce&&Pe){var lt=Ce.indexOf(y.d)+1;Ce[lt]=parseFloat(Ce[lt])+Pe+En,Ce[1]=parseFloat(Ce[1])+Pe+En,ga(Ce)}},O.disable=function(Pe,lt){if(O.enabled&&(Pe!==!1&&O.revert(!0,!0),O.enabled=O.isActive=!1,lt||L&&L.pause(),ne=0,Ue&&(Ue.uncache=1),he&&Nn(r,"refreshInit",he),_e&&(_e.pause(),K.tween&&K.tween.kill()&&(K.tween=0)),!j)){for(var nt=bt.length;nt--;)if(bt[nt].scroller===N&&bt[nt]!==O)return;Nn(N,"resize",gl),j||Nn(N,"scroll",Jo)}},O.kill=function(Pe,lt){O.disable(Pe,lt),L&&!lt&&L.kill(),l&&delete Dh[l];var nt=bt.indexOf(O);nt>=0&&bt.splice(nt,1),nt===oi&&hu>0&&oi--,nt=0,bt.forEach(function(We){return We.scroller===O.scroller&&(nt=1)}),nt||ai||(O.scroll.rec=0),i&&(i.scrollTrigger=null,Pe&&i.revert({kill:!1}),lt||i.kill()),U&&[U,ot,X,ft].forEach(function(We){return We.parentNode&&We.parentNode.removeChild(We)}),Fl===O&&(Fl=0),h&&(Ue&&(Ue.uncache=1),nt=0,bt.forEach(function(We){return We.pin===h&&nt++}),nt||(Ue.spacer=0)),n.onKill&&n.onKill(O)},bt.push(O),O.enable(!1,!1),we&&we(O),i&&i.add&&!Re){var at=O.update;O.update=function(){O.update=at,Tt.cache++,Te||tt||O.refresh()},qe.delayedCall(.01,O.update),Re=.01,Te=tt=0}else O.refresh();h&&EC()},r.register=function(n){return na||(qe=n||kx(),Ux()&&window.document&&r.enable(),na=hl),na},r.defaults=function(n){if(n)for(var i in n)Yc[i]=n[i];return Yc},r.disable=function(n,i){hl=0,bt.forEach(function(o){return o[i?"kill":"disable"](n)}),Nn(Mt,"wheel",Jo),Nn(nn,"scroll",Jo),clearInterval(Hc),Nn(nn,"touchcancel",xr),Nn(Wt,"touchstart",xr),Xc(Nn,nn,"pointerdown,touchstart,mousedown",X0),Xc(Nn,nn,"pointerup,touchend,mouseup",q0),Uu.kill(),Wc(Nn);for(var s=0;s<Tt.length;s+=3)qc(Nn,Tt[s],Tt[s+1]),qc(Nn,Tt[s],Tt[s+2])},r.enable=function(){if(Mt=window,nn=document,Ri=nn.documentElement,Wt=nn.body,qe&&(tc=qe.utils.toArray,Ll=qe.utils.clamp,Ph=qe.core.context||xr,ef=qe.core.suppressOverwrites||xr,Lp=Mt.history.scrollRestoration||"auto",Ih=Mt.pageYOffset||0,qe.core.globals("ScrollTrigger",r),Wt)){hl=1,ma=document.createElement("div"),ma.style.height="100vh",ma.style.position="absolute",Yx(),vC(),_n.register(qe),r.isTouch=_n.isTouch,gs=_n.isTouch&&/(iPad|iPhone|iPod|Mac)/g.test(navigator.userAgent),Rh=_n.isTouch===1,Fn(Mt,"wheel",Jo),Pp=[Mt,nn,Ri,Wt],qe.matchMedia?(r.matchMedia=function(c){var u=qe.matchMedia(),d;for(d in c)u.add(d,c[d]);return u},qe.addEventListener("matchMediaInit",function(){return Up()}),qe.addEventListener("matchMediaRevert",function(){return Xx()}),qe.addEventListener("matchMedia",function(){lo(0,1),To("matchMedia")}),qe.matchMedia().add("(orientation: portrait)",function(){return sf(),sf})):console.warn("Requires GSAP 3.11.0 or later"),sf(),Fn(nn,"scroll",Jo);var n=Wt.hasAttribute("style"),i=Wt.style,s=i.borderTopStyle,o=qe.core.Animation.prototype,a,l;for(o.revert||Object.defineProperty(o,"revert",{value:function(){return this.time(-.01,!0)}}),i.borderTopStyle="solid",a=qr(Wt),An.m=Math.round(a.top+An.sc())||0,di.m=Math.round(a.left+di.sc())||0,s?i.borderTopStyle=s:i.removeProperty("border-top-style"),n||(Wt.setAttribute("style",""),Wt.removeAttribute("style")),Hc=setInterval(j0,250),qe.delayedCall(.5,function(){return Gc=0}),Fn(nn,"touchcancel",xr),Fn(Wt,"touchstart",xr),Xc(Fn,nn,"pointerdown,touchstart,mousedown",X0),Xc(Fn,nn,"pointerup,touchend,mouseup",q0),Ch=qe.utils.checkPrefix("transform"),pu.push(Ch),na=qn(),Uu=qe.delayedCall(.2,lo).pause(),ia=[nn,"visibilitychange",function(){var c=Mt.innerWidth,u=Mt.innerHeight;nn.hidden?(V0=c,H0=u):(V0!==c||H0!==u)&&gl()},nn,"DOMContentLoaded",lo,Mt,"load",lo,Mt,"resize",gl],Wc(Fn),bt.forEach(function(c){return c.enable(0,1)}),l=0;l<Tt.length;l+=3)qc(Nn,Tt[l],Tt[l+1]),qc(Nn,Tt[l],Tt[l+2])}},r.config=function(n){"limitCallbacks"in n&&(tf=!!n.limitCallbacks);var i=n.syncInterval;i&&clearInterval(Hc)||(Hc=i)&&setInterval(j0,i),"ignoreMobileResize"in n&&(Rh=r.isTouch===1&&n.ignoreMobileResize),"autoRefreshEvents"in n&&(Wc(Nn)||Wc(Fn,n.autoRefreshEvents||"none"),Ox=(n.autoRefreshEvents+"").indexOf("resize")===-1)},r.scrollerProxy=function(n,i){var s=gi(n),o=Tt.indexOf(s),a=So(s);~o&&Tt.splice(o,a?6:2),i&&(a?Rr.unshift(Mt,i,Wt,i,Ri,i):Rr.unshift(s,i))},r.clearMatchMedia=function(n){bt.forEach(function(i){return i._ctx&&i._ctx.query===n&&i._ctx.kill(!0,!0)})},r.isInViewport=function(n,i,s){var o=(Ai(n)?gi(n):n).getBoundingClientRect(),a=o[s?_o:xo]*i||0;return s?o.right-a>0&&o.left+a<Mt.innerWidth:o.bottom-a>0&&o.top+a<Mt.innerHeight},r.positionInViewport=function(n,i,s){Ai(n)&&(n=gi(n));var o=n.getBoundingClientRect(),a=o[s?_o:xo],l=i==null?a/2:i in zu?zu[i]*a:~i.indexOf("%")?parseFloat(i)*a/100:parseFloat(i)||0;return s?(o.left+l)/Mt.innerWidth:(o.top+l)/Mt.innerHeight},r.killAll=function(n){if(bt.slice(0).forEach(function(s){return s.vars.id!=="ScrollSmoother"&&s.kill()}),n!==!0){var i=Mo.killAll||[];Mo={},i.forEach(function(s){return s()})}},r})();Xe.version="3.12.7";Xe.saveStyles=function(r){return r?tc(r).forEach(function(e){if(e&&e.style){var t=Ei.indexOf(e);t>=0&&Ei.splice(t,5),Ei.push(e,e.style.cssText,e.getBBox&&e.getAttribute("transform"),qe.core.getCache(e),Ph())}}):Ei};Xe.revert=function(r,e){return Up(!r,e)};Xe.create=function(r,e){return new Xe(r,e)};Xe.refresh=function(r){return r?gl(!0):(na||Xe.register())&&lo(!0)};Xe.update=function(r){return++Tt.cache&&es(r===!0?2:0)};Xe.clearScrollMemory=qx;Xe.maxScroll=function(r,e){return Tr(r,e?di:An)};Xe.getScrollFunc=function(r,e){return Us(gi(r),e?di:An)};Xe.getById=function(r){return Dh[r]};Xe.getAll=function(){return bt.filter(function(r){return r.vars.id!=="ScrollSmoother"})};Xe.isScrolling=function(){return!!ji};Xe.snapDirectional=Fp;Xe.addEventListener=function(r,e){var t=Mo[r]||(Mo[r]=[]);~t.indexOf(e)||t.push(e)};Xe.removeEventListener=function(r,e){var t=Mo[r],n=t&&t.indexOf(e);n>=0&&t.splice(n,1)};Xe.batch=function(r,e){var t=[],n={},i=e.interval||.016,s=e.batchMax||1e9,o=function(c,u){var d=[],f=[],h=qe.delayedCall(i,function(){u(d,f),d=[],f=[]}).pause();return function(_){d.length||h.restart(!0),d.push(_.trigger),f.push(_),s<=d.length&&h.progress(1)}},a;for(a in e)n[a]=a.substr(0,2)==="on"&&$n(e[a])&&a!=="onRefreshInit"?o(a,e[a]):e[a];return $n(s)&&(s=s(),Fn(Xe,"refresh",function(){return s=e.batchMax()})),tc(r).forEach(function(l){var c={};for(a in n)c[a]=n[a];c.trigger=l,t.push(Xe.create(c))}),t};var tg=function(e,t,n,i){return t>i?e(i):t<0&&e(0),n>i?(i-t)/(n-t):n<0?t/(t-n):1},af=function r(e,t){t===!0?e.style.removeProperty("touch-action"):e.style.touchAction=t===!0?"auto":t?"pan-"+t+(_n.isTouch?" pinch-zoom":""):"none",e===Ri&&r(Wt,t)},Zc={auto:1,scroll:1},LC=function(e){var t=e.event,n=e.target,i=e.axis,s=(t.changedTouches?t.changedTouches[0]:t).target,o=s._gsap||qe.core.getCache(s),a=qn(),l;if(!o._isScrollT||a-o._isScrollT>2e3){for(;s&&s!==Wt&&(s.scrollHeight<=s.clientHeight&&s.scrollWidth<=s.clientWidth||!(Zc[(l=Gi(s)).overflowY]||Zc[l.overflowX]));)s=s.parentNode;o._isScroll=s&&s!==n&&!So(s)&&(Zc[(l=Gi(s)).overflowY]||Zc[l.overflowX]),o._isScrollT=a}(o._isScroll||i==="x")&&(t.stopPropagation(),t._gsapAllow=!0)},jx=function(e,t,n,i){return _n.create({target:e,capture:!0,debounce:!1,lockAxis:!0,type:t,onWheel:i=i&&LC,onPress:i,onDrag:i,onScroll:i,onEnable:function(){return n&&Fn(nn,_n.eventTypes[0],ig,!1,!0)},onDisable:function(){return Nn(nn,_n.eventTypes[0],ig,!0)}})},DC=/(input|label|select|textarea)/i,ng,ig=function(e){var t=DC.test(e.target.tagName);(t||ng)&&(e._gsapAllow=!0,ng=t)},IC=function(e){no(e)||(e={}),e.preventDefault=e.isNormalizer=e.allowClicks=!0,e.type||(e.type="wheel,touch"),e.debounce=!!e.debounce,e.id=e.id||"normalizer";var t=e,n=t.normalizeScrollX,i=t.momentum,s=t.allowNestedScroll,o=t.onRelease,a,l,c=gi(e.target)||Ri,u=qe.core.globals().ScrollSmoother,d=u&&u.get(),f=gs&&(e.content&&gi(e.content)||d&&e.content!==!1&&!d.smooth()&&d.content()),h=Us(c,An),_=Us(c,di),g=1,m=(_n.isTouch&&Mt.visualViewport?Mt.visualViewport.scale*Mt.visualViewport.width:Mt.outerWidth)/Mt.innerWidth,p=0,b=$n(i)?function(){return i(a)}:function(){return i||2.8},x,v,E=jx(c,e.type,!0,s),M=function(){return v=!1},T=xr,R=xr,w=function(){l=Tr(c,An),R=Ll(gs?1:0,l),n&&(T=Ll(0,Tr(c,di))),x=vo},y=function(){f._gsap.y=pl(parseFloat(f._gsap.y)+h.offset)+"px",f.style.transform="matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, "+parseFloat(f._gsap.y)+", 0, 1)",h.offset=h.cacheID=0},D=function(){if(v){requestAnimationFrame(M);var F=pl(a.deltaY/2),ae=R(h.v-F);if(f&&ae!==h.v+h.offset){h.offset=ae-h.v;var O=pl((parseFloat(f&&f._gsap.y)||0)-h.offset);f.style.transform="matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, "+O+", 0, 1)",f._gsap.y=O+"px",h.cacheID=Tt.cache,es()}return!0}h.offset&&y(),v=!0},N,V,j,k,G=function(){w(),N.isActive()&&N.vars.scrollY>l&&(h()>l?N.progress(1)&&h(l):N.resetTo("scrollY",l))};return f&&qe.set(f,{y:"+=0"}),e.ignoreCheck=function(Y){return gs&&Y.type==="touchmove"&&D()||g>1.05&&Y.type!=="touchstart"||a.isGesturing||Y.touches&&Y.touches.length>1},e.onPress=function(){v=!1;var Y=g;g=pl((Mt.visualViewport&&Mt.visualViewport.scale||1)/m),N.pause(),Y!==g&&af(c,g>1.01?!0:n?!1:"x"),V=_(),j=h(),w(),x=vo},e.onRelease=e.onGestureStart=function(Y,F){if(h.offset&&y(),!F)k.restart(!0);else{Tt.cache++;var ae=b(),O,he;n&&(O=_(),he=O+ae*.05*-Y.velocityX/.227,ae*=tg(_,O,he,Tr(c,di)),N.vars.scrollX=T(he)),O=h(),he=O+ae*.05*-Y.velocityY/.227,ae*=tg(h,O,he,Tr(c,An)),N.vars.scrollY=R(he),N.invalidate().duration(ae).play(.01),(gs&&N.vars.scrollY>=l||O>=l-1)&&qe.to({},{onUpdate:G,duration:ae})}o&&o(Y)},e.onWheel=function(){N._ts&&N.pause(),qn()-p>1e3&&(x=0,p=qn())},e.onChange=function(Y,F,ae,O,he){if(vo!==x&&w(),F&&n&&_(T(O[2]===F?V+(Y.startX-Y.x):_()+F-O[1])),ae){h.offset&&y();var P=he[2]===ae,Me=P?j+Y.startY-Y.y:h()+ae-he[1],Ne=R(Me);P&&Me!==Ne&&(j+=Ne-Me),h(Ne)}(ae||F)&&es()},e.onEnable=function(){af(c,n?!1:"x"),Xe.addEventListener("refresh",G),Fn(Mt,"resize",G),h.smooth&&(h.target.style.scrollBehavior="auto",h.smooth=_.smooth=!1),E.enable()},e.onDisable=function(){af(c,!0),Nn(Mt,"resize",G),Xe.removeEventListener("refresh",G),E.kill()},e.lockAxis=e.lockAxis!==!1,a=new _n(e),a.iOS=gs,gs&&!h()&&h(1),gs&&qe.ticker.add(xr),k=a._dc,N=qe.to(a,{ease:"power4",paused:!0,inherit:!1,scrollX:n?"+=0.1":"+=0",scrollY:"+=0.1",modifiers:{scrollY:$x(h,h(),function(){return N.pause()})},onUpdate:es,onComplete:k.vars.onComplete}),a};Xe.sort=function(r){if($n(r))return bt.sort(r);var e=Mt.pageYOffset||0;return Xe.getAll().forEach(function(t){return t._sortY=t.trigger?e+t.trigger.getBoundingClientRect().top:t.start+Mt.innerHeight}),bt.sort(r||function(t,n){return(t.vars.refreshPriority||0)*-1e6+(t.vars.containerAnimation?1e6:t._sortY)-((n.vars.containerAnimation?1e6:n._sortY)+(n.vars.refreshPriority||0)*-1e6)})};Xe.observe=function(r){return new _n(r)};Xe.normalizeScroll=function(r){if(typeof r>"u")return si;if(r===!0&&si)return si.enable();if(r===!1){si&&si.kill(),si=r;return}var e=r instanceof _n?r:IC(r);return si&&si.target===e.target&&si.kill(),So(e.target)&&(si=e),e};Xe.core={_getVelocityProp:Ah,_inputObserver:jx,_scrollers:Tt,_proxies:Rr,bridge:{ss:function(){ji||To("scrollStart"),ji=qn()},ref:function(){return Xn}}};kx()&&qe.registerPlugin(Xe);/*!
 * paths 3.12.7
 * https://gsap.com
 *
 * Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license or for
 * Club GSAP members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/var OC=/[achlmqstvz]|(-?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/ig,NC=/(?:(-)?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/ig,FC=/[\+\-]?\d*\.?\d+e[\+\-]?\d+/ig,UC=/(^[#\.][a-z]|[a-y][a-z])/i,kC=Math.PI/180,Jc=Math.sin,Qc=Math.cos,Ul=Math.abs,rl=Math.sqrt,rg=function(e){return typeof e=="string"},Kx=function(e){return typeof e=="number"},sg=1e5,ms=function(e){return Math.round(e*sg)/sg||0};function BC(r){r=rg(r)&&UC.test(r)&&document.querySelector(r)||r;var e=r.getAttribute?r:0,t;return e&&(r=r.getAttribute("d"))?(e._gsPath||(e._gsPath={}),t=e._gsPath[r],t&&!t._dirty?t:e._gsPath[r]=Ds(r)):r?rg(r)?Ds(r):Kx(r[0])?[r]:r:console.warn("Expecting a <path> element or an SVG path data string")}function _l(r){var e=0,t;for(r.reverse();e<r.length;e+=2)t=r[e],r[e]=r[e+1],r[e+1]=t;r.reversed=!r.reversed}var zC=function(e,t){var n=document.createElementNS("http://www.w3.org/2000/svg","path"),i=[].slice.call(e.attributes),s=i.length,o;for(t=","+t+",";--s>-1;)o=i[s].nodeName.toLowerCase(),t.indexOf(","+o+",")<0&&n.setAttributeNS(null,o,i[s].nodeValue);return n},VC={rect:"rx,ry,x,y,width,height",circle:"r,cx,cy",ellipse:"rx,ry,cx,cy",line:"x1,x2,y1,y2"},HC=function(e,t){for(var n=t?t.split(","):[],i={},s=n.length;--s>-1;)i[n[s]]=+e.getAttribute(n[s])||0;return i};function Zx(r,e){var t=r.tagName.toLowerCase(),n=.552284749831,i,s,o,a,l,c,u,d,f,h,_,g,m,p,b,x,v,E,M,T,R,w;return t==="path"||!r.getBBox?r:(c=zC(r,"x,y,width,height,cx,cy,rx,ry,r,x1,x2,y1,y2,points"),w=HC(r,VC[t]),t==="rect"?(a=w.rx,l=w.ry||a,s=w.x,o=w.y,h=w.width-a*2,_=w.height-l*2,a||l?(g=s+a*(1-n),m=s+a,p=m+h,b=p+a*n,x=p+a,v=o+l*(1-n),E=o+l,M=E+_,T=M+l*n,R=M+l,i="M"+x+","+E+" V"+M+" C"+[x,T,b,R,p,R,p-(p-m)/3,R,m+(p-m)/3,R,m,R,g,R,s,T,s,M,s,M-(M-E)/3,s,E+(M-E)/3,s,E,s,v,g,o,m,o,m+(p-m)/3,o,p-(p-m)/3,o,p,o,b,o,x,v,x,E].join(",")+"z"):i="M"+(s+h)+","+o+" v"+_+" h"+-h+" v"+-_+" h"+h+"z"):t==="circle"||t==="ellipse"?(t==="circle"?(a=l=w.r,d=a*n):(a=w.rx,l=w.ry,d=l*n),s=w.cx,o=w.cy,u=a*n,i="M"+(s+a)+","+o+" C"+[s+a,o+d,s+u,o+l,s,o+l,s-u,o+l,s-a,o+d,s-a,o,s-a,o-d,s-u,o-l,s,o-l,s+u,o-l,s+a,o-d,s+a,o].join(",")+"z"):t==="line"?i="M"+w.x1+","+w.y1+" L"+w.x2+","+w.y2:(t==="polyline"||t==="polygon")&&(f=(r.getAttribute("points")+"").match(NC)||[],s=f.shift(),o=f.shift(),i="M"+s+","+o+" L"+f.join(","),t==="polygon"&&(i+=","+s+","+o+"z")),c.setAttribute("d",_a(c._gsRawPath=Ds(i))),e&&r.parentNode&&(r.parentNode.insertBefore(c,r),r.parentNode.removeChild(r)),c)}function GC(r,e,t,n,i,s,o,a,l){if(!(r===a&&e===l)){t=Ul(t),n=Ul(n);var c=i%360*kC,u=Qc(c),d=Jc(c),f=Math.PI,h=f*2,_=(r-a)/2,g=(e-l)/2,m=u*_+d*g,p=-d*_+u*g,b=m*m,x=p*p,v=b/(t*t)+x/(n*n);v>1&&(t=rl(v)*t,n=rl(v)*n);var E=t*t,M=n*n,T=(E*M-E*x-M*b)/(E*x+M*b);T<0&&(T=0);var R=(s===o?-1:1)*rl(T),w=R*(t*p/n),y=R*-(n*m/t),D=(r+a)/2,N=(e+l)/2,V=D+(u*w-d*y),j=N+(d*w+u*y),k=(m-w)/t,G=(p-y)/n,Y=(-m-w)/t,F=(-p-y)/n,ae=k*k+G*G,O=(G<0?-1:1)*Math.acos(k/rl(ae)),he=(k*F-G*Y<0?-1:1)*Math.acos((k*Y+G*F)/rl(ae*(Y*Y+F*F)));isNaN(he)&&(he=f),!o&&he>0?he-=h:o&&he<0&&(he+=h),O%=h,he%=h;var P=Math.ceil(Ul(he)/(h/4)),Me=[],Ne=he/P,ze=4/3*Jc(Ne/2)/(1+Qc(Ne/2)),te=u*t,ie=d*t,K=d*-n,Ue=u*n,be;for(be=0;be<P;be++)i=O+be*Ne,m=Qc(i),p=Jc(i),k=Qc(i+=Ne),G=Jc(i),Me.push(m-ze*p,p+ze*m,k+ze*G,G-ze*k,k,G);for(be=0;be<Me.length;be+=2)m=Me[be],p=Me[be+1],Me[be]=m*te+p*K+V,Me[be+1]=m*ie+p*Ue+j;return Me[be-2]=a,Me[be-1]=l,Me}}function Ds(r){var e=(r+"").replace(FC,function(w){var y=+w;return y<1e-4&&y>-1e-4?0:y}).match(OC)||[],t=[],n=0,i=0,s=2/3,o=e.length,a=0,l="ERROR: malformed path: "+r,c,u,d,f,h,_,g,m,p,b,x,v,E,M,T,R=function(y,D,N,V){b=(N-y)/3,x=(V-D)/3,g.push(y+b,D+x,N-b,V-x,N,V)};if(!r||!isNaN(e[0])||isNaN(e[1]))return console.log(l),t;for(c=0;c<o;c++)if(E=h,isNaN(e[c])?(h=e[c].toUpperCase(),_=h!==e[c]):c--,d=+e[c+1],f=+e[c+2],_&&(d+=n,f+=i),c||(m=d,p=f),h==="M")g&&(g.length<8?t.length-=1:a+=g.length),n=m=d,i=p=f,g=[d,f],t.push(g),c+=2,h="L";else if(h==="C")g||(g=[0,0]),_||(n=i=0),g.push(d,f,n+e[c+3]*1,i+e[c+4]*1,n+=e[c+5]*1,i+=e[c+6]*1),c+=6;else if(h==="S")b=n,x=i,(E==="C"||E==="S")&&(b+=n-g[g.length-4],x+=i-g[g.length-3]),_||(n=i=0),g.push(b,x,d,f,n+=e[c+3]*1,i+=e[c+4]*1),c+=4;else if(h==="Q")b=n+(d-n)*s,x=i+(f-i)*s,_||(n=i=0),n+=e[c+3]*1,i+=e[c+4]*1,g.push(b,x,n+(d-n)*s,i+(f-i)*s,n,i),c+=4;else if(h==="T")b=n-g[g.length-4],x=i-g[g.length-3],g.push(n+b,i+x,d+(n+b*1.5-d)*s,f+(i+x*1.5-f)*s,n=d,i=f),c+=2;else if(h==="H")R(n,i,n=d,i),c+=1;else if(h==="V")R(n,i,n,i=d+(_?i-n:0)),c+=1;else if(h==="L"||h==="Z")h==="Z"&&(d=m,f=p,g.closed=!0),(h==="L"||Ul(n-d)>.5||Ul(i-f)>.5)&&(R(n,i,d,f),h==="L"&&(c+=2)),n=d,i=f;else if(h==="A"){if(M=e[c+4],T=e[c+5],b=e[c+6],x=e[c+7],u=7,M.length>1&&(M.length<3?(x=b,b=T,u--):(x=T,b=M.substr(2),u-=2),T=M.charAt(1),M=M.charAt(0)),v=GC(n,i,+e[c+1],+e[c+2],+e[c+3],+M,+T,(_?n:0)+b*1,(_?i:0)+x*1),c+=u,v)for(u=0;u<v.length;u++)g.push(v[u]);n=g[g.length-2],i=g[g.length-1]}else console.log(l);return c=g.length,c<6?(t.pop(),c=0):g[0]===g[c-2]&&g[1]===g[c-1]&&(g.closed=!0),t.totalPoints=a+c,t}function _a(r){Kx(r[0])&&(r=[r]);var e="",t=r.length,n,i,s,o;for(i=0;i<t;i++){for(o=r[i],e+="M"+ms(o[0])+","+ms(o[1])+" C",n=o.length,s=2;s<n;s++)e+=ms(o[s++])+","+ms(o[s++])+" "+ms(o[s++])+","+ms(o[s++])+" "+ms(o[s++])+","+ms(o[s])+" ";o.closed&&(e+="z")}return e}/*!
 * MorphSVGPlugin 3.12.7
 * https://gsap.com
 *
 * @license Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license or for
 * Club GSAP members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/var rr,kp,xl,Jx,vl,Qx=function(){return rr||typeof window<"u"&&(rr=window.gsap)&&rr.registerPlugin&&rr},lf=function(e){return typeof e=="function"},co=Math.atan2,og=Math.cos,ag=Math.sin,Zr=Math.sqrt,td=Math.PI,lg=td*2,WC=td*.3,XC=td*.7,ev=1e20,ic=/[-+=\.]*\d+[\.e\-\+]*\d*[e\-\+]*\d*/gi,qC=/(^[#\.][a-z]|[a-y][a-z])/i,YC=/[achlmqstvz]/i,Ts=function(e){return console&&console.warn(e)},$C=1,cg=function(e){var t=e.length,n=0,i=0,s;for(s=0;s<t;s++)n+=e[s++],i+=e[s];return[n/(t/2),i/(t/2)]},xa=function(e){var t=e.length,n=e[0],i=n,s=e[1],o=s,a,l,c;for(c=6;c<t;c+=6)a=e[c],l=e[c+1],a>n?n=a:a<i&&(i=a),l>s?s=l:l<o&&(o=l);return e.centerX=(n+i)/2,e.centerY=(s+o)/2,e.size=(n-i)*(s-o)},kl=function(e,t){t===void 0&&(t=3);for(var n=e.length,i=e[0][0],s=i,o=e[0][1],a=o,l=1/t,c,u,d,f,h,_,g,m,p,b,x,v,E,M,T,R;--n>-1;)for(h=e[n],c=h.length,f=6;f<c;f+=6)for(p=h[f],b=h[f+1],x=h[f+2]-p,M=h[f+3]-b,v=h[f+4]-p,T=h[f+5]-b,E=h[f+6]-p,R=h[f+7]-b,_=t;--_>-1;)g=l*_,m=1-g,u=(g*g*E+3*m*(g*v+m*x))*g+p,d=(g*g*R+3*m*(g*T+m*M))*g+b,u>i?i=u:u<s&&(s=u),d>o?o=d:d<a&&(a=d);return e.centerX=(i+s)/2,e.centerY=(o+a)/2,e.left=s,e.width=i-s,e.top=a,e.height=o-a,e.size=(i-s)*(o-a)},jC=function(e,t){return t.length-e.length},ug=function(e,t){var n=e.size||xa(e),i=t.size||xa(t);return Math.abs(i-n)<(n+i)/20?t.centerX-e.centerX||t.centerY-e.centerY:i-n},dg=function(e,t){var n=e.slice(0),i=e.length,s=i-2,o,a;for(t=t|0,o=0;o<i;o++)a=(o+t)%s,e[o++]=n[a],e[o]=n[a+1]},cf=function(e,t,n,i,s){var o=e.length,a=0,l=o-2,c,u,d,f;for(n*=6,u=0;u<o;u+=6)c=(u+n)%l,f=e[c]-(t[u]-i),d=e[c+1]-(t[u+1]-s),a+=Zr(d*d+f*f);return a},KC=function(e,t,n){var i=e.length,s=cg(e),o=cg(t),a=o[0]-s[0],l=o[1]-s[1],c=cf(e,t,0,a,l),u=0,d,f,h;for(h=6;h<i;h+=6)f=cf(e,t,h/6,a,l),f<c&&(c=f,u=h);if(n)for(d=e.slice(0),_l(d),h=6;h<i;h+=6)f=cf(d,t,h/6,a,l),f<c&&(c=f,u=-h);return u/6},ZC=function(e,t,n){for(var i=e.length,s=ev,o=0,a=0,l,c,u,d,f,h;--i>-1;)for(l=e[i],h=l.length,f=0;f<h;f+=6)c=l[f]-t,u=l[f+1]-n,d=Zr(c*c+u*u),d<s&&(s=d,o=l[f],a=l[f+1]);return[o,a]},JC=function(e,t,n,i,s,o){var a=t.length,l=0,c=Math.min(e.size||xa(e),t[n].size||xa(t[n]))*i,u=ev,d=e.centerX+s,f=e.centerY+o,h,_,g,m,p;for(_=n;_<a&&(h=t[_].size||xa(t[_]),!(h<c));_++)g=t[_].centerX-d,m=t[_].centerY-f,p=Zr(g*g+m*m),p<u&&(l=_,u=p);return p=t[l],t.splice(l,1),p},uf=function(e,t){var n=0,i=.999999,s=e.length,o=t/((s-2)/6),a,l,c,u,d,f,h,_,g,m,p,b,x,v;for(x=2;x<s;x+=6)for(n+=o;n>i;)a=e[x-2],l=e[x-1],c=e[x],u=e[x+1],d=e[x+2],f=e[x+3],h=e[x+4],_=e[x+5],v=1/((Math.floor(n)||1)+1),g=a+(c-a)*v,p=c+(d-c)*v,g+=(p-g)*v,p+=(d+(h-d)*v-p)*v,m=l+(u-l)*v,b=u+(f-u)*v,m+=(b-m)*v,b+=(f+(_-f)*v-b)*v,e.splice(x,4,a+(c-a)*v,l+(u-l)*v,g,m,g+(p-g)*v,m+(b-m)*v,p,b,d+(h-d)*v,f+(_-f)*v),x+=6,s+=6,n--;return e},Nh=function(e,t,n,i,s){var o=t.length-e.length,a=o>0?t:e,l=o>0?e:t,c=0,u=i==="complexity"?jC:ug,d=i==="position"?0:typeof i=="number"?i:.8,f=l.length,h=typeof n=="object"&&n.push?n.slice(0):[n],_=h[0]==="reverse"||h[0]<0,g=n==="log",m,p,b,x,v,E,M;if(l[0]){if(a.length>1&&(e.sort(u),t.sort(u),E=a.size||kl(a),E=l.size||kl(l),E=a.centerX-l.centerX,M=a.centerY-l.centerY,u===ug))for(f=0;f<l.length;f++)a.splice(f,0,JC(l[f],a,f,d,E,M));if(o)for(o<0&&(o=-o),a[0].length>l[0].length&&uf(l[0],(a[0].length-l[0].length)/6|0),f=l.length;c<o;)x=a[f].size||xa(a[f]),b=ZC(l,a[f].centerX,a[f].centerY),x=b[0],v=b[1],l[f++]=[x,v,x,v,x,v,x,v],l.totalPoints+=8,c++;for(f=0;f<e.length;f++)m=t[f],p=e[f],o=m.length-p.length,o<0?uf(m,-o/6|0):o>0&&uf(p,o/6|0),_&&s!==!1&&!p.reversed&&_l(p),n=h[f]||h[f]===0?h[f]:"auto",n&&(p.closed||Math.abs(p[0]-p[p.length-2])<.5&&Math.abs(p[1]-p[p.length-1])<.5?n==="auto"||n==="log"?(h[f]=n=KC(p,m,!f||s===!1),n<0&&(_=!0,_l(p),n=-n),dg(p,n*6)):n!=="reverse"&&(f&&n<0&&_l(p),dg(p,(n<0?-n:n)*6)):!_&&(n==="auto"&&Math.abs(m[0]-p[0])+Math.abs(m[1]-p[1])+Math.abs(m[m.length-2]-p[p.length-2])+Math.abs(m[m.length-1]-p[p.length-1])>Math.abs(m[0]-p[p.length-2])+Math.abs(m[1]-p[p.length-1])+Math.abs(m[m.length-2]-p[0])+Math.abs(m[m.length-1]-p[1])||n%2)?(_l(p),h[f]=-1,_=!0):n==="auto"?h[f]=0:n==="reverse"&&(h[f]=-1),p.closed!==m.closed&&(p.closed=m.closed=!1));return g&&Ts("shapeIndex:["+h.join(",")+"]"),e.shapeIndex=h,h}},fg=function(e,t,n,i,s){var o=Ds(e[0]),a=Ds(e[1]);Nh(o,a,t||t===0?t:"auto",n,s)&&(e[0]=_a(o),e[1]=_a(a),(i==="log"||i===!0)&&Ts('precompile:["'+e[0]+'","'+e[1]+'"]'))},QC=function(e,t){if(!t)return e;var n=e.match(ic)||[],i=n.length,s="",o,a,l;for(t==="reverse"?(a=i-1,o=-2):(a=((parseInt(t,10)||0)*2+1+i*100)%i,o=2),l=0;l<i;l+=2)s+=n[a-1]+","+n[a]+" ",a=(a+o)%i;return s},hg=function(e,t){var n=0,i=parseFloat(e[0]),s=parseFloat(e[1]),o=i+","+s+" ",a=.999999,l,c,u,d,f,h,_;for(u=e.length,l=t*.5/(u*.5-1),c=0;c<u-2;c+=2){if(n+=l,h=parseFloat(e[c+2]),_=parseFloat(e[c+3]),n>a)for(f=1/(Math.floor(n)+1),d=1;n>a;)o+=(i+(h-i)*f*d).toFixed(2)+","+(s+(_-s)*f*d).toFixed(2)+" ",n--,d++;o+=h+","+_+" ",i=h,s=_}return o},Fh=function(e){var t=e[0].match(ic)||[],n=e[1].match(ic)||[],i=n.length-t.length;i>0?e[0]=hg(t,i):e[1]=hg(n,-i)},e2=function(e){return isNaN(e)?Fh:function(t){Fh(t),t[1]=QC(t[1],parseInt(e,10))}},t2=function(e,t,n){var i=typeof e=="string",s,o;return(!i||qC.test(e)||(e.match(ic)||[]).length<3)&&(s=kp(e)[0],s?(o=(s.nodeName+"").toUpperCase(),t&&o!=="PATH"&&(s=Zx(s,!1),o="PATH"),e=s.getAttribute(o==="PATH"?"d":"points")||"",s===n&&(e=s.getAttributeNS(null,"data-original")||e)):(Ts("WARNING: invalid morph to: "+e),e=!1)),e},pg=function(e,t){for(var n=e.length,i=.2*(t||1),s,o,a,l,c,u,d,f,h,_,g,m;--n>-1;){for(o=e[n],g=o.isSmooth=o.isSmooth||[0,0,0,0],m=o.smoothData=o.smoothData||[0,0,0,0],g.length=4,f=o.length-2,d=6;d<f;d+=6)a=o[d]-o[d-2],l=o[d+1]-o[d-1],c=o[d+2]-o[d],u=o[d+3]-o[d+1],h=co(l,a),_=co(u,c),s=Math.abs(h-_)<i,s&&(m[d-2]=h,m[d+2]=_,m[d-1]=Zr(a*a+l*l),m[d+3]=Zr(c*c+u*u)),g.push(s,s,0,0,s,s);o[f]===o[0]&&o[f+1]===o[1]&&(a=o[0]-o[f-2],l=o[1]-o[f-1],c=o[2]-o[0],u=o[3]-o[1],h=co(l,a),_=co(u,c),Math.abs(h-_)<i&&(m[f-2]=h,m[2]=_,m[f-1]=Zr(a*a+l*l),m[3]=Zr(c*c+u*u),g[f-2]=g[f-1]=!0))}return e},mg=function(e){var t=e.trim().split(" "),n=~e.indexOf("left")?0:~e.indexOf("right")?100:isNaN(parseFloat(t[0]))?50:parseFloat(t[0]),i=~e.indexOf("top")?0:~e.indexOf("bottom")?100:isNaN(parseFloat(t[1]))?50:parseFloat(t[1]);return{x:n/100,y:i/100}},n2=function(e){return e!==e%td?e+(e<0?lg:-lg):e},gg="Use MorphSVGPlugin.convertToPath() to convert to a path before morphing.",i2=function(e,t,n,i){var s=this._origin,o=this._eOrigin,a=e[n]-s.x,l=e[n+1]-s.y,c=Zr(a*a+l*l),u=co(l,a),d,f;return a=t[n]-o.x,l=t[n+1]-o.y,d=co(l,a)-u,f=n2(d),!i&&xl&&Math.abs(f+xl.ca)<WC&&(i=xl),this._anchorPT=xl={_next:this._anchorPT,t:e,sa:u,ca:i&&f*i.ca<0&&Math.abs(f)>XC?d:f,sl:c,cl:Zr(a*a+l*l)-c,i:n}},_g=function(e){rr=Qx(),vl=vl||rr&&rr.plugins.morphSVG,rr&&vl?(kp=rr.utils.toArray,vl.prototype._tweenRotation=i2,Jx=1):e&&Ts("Please gsap.registerPlugin(MorphSVGPlugin)")},la={version:"3.12.7",name:"morphSVG",rawVars:1,register:function(e,t){rr=e,vl=t,_g()},init:function(e,t,n,i,s){if(Jx||_g(1),!t)return Ts("invalid shape"),!1;lf(t)&&(t=t.call(n,i,e,s));var o,a,l,c,u,d,f,h,_,g,m,p,b,x,v,E,M,T,R,w,y,D;if(typeof t=="string"||t.getBBox||t[0])t={shape:t};else if(typeof t=="object"){o={};for(a in t)o[a]=lf(t[a])&&a!=="render"?t[a].call(n,i,e,s):t[a];t=o}var N=e.nodeType?window.getComputedStyle(e):{},V=N.fill+"",j=!(V==="none"||(V.match(ic)||[])[3]==="0"||N.fillRule==="evenodd"),k=(t.origin||"50 50").split(",");if(o=(e.nodeName+"").toUpperCase(),u=o==="POLYLINE"||o==="POLYGON",o!=="PATH"&&!u&&!t.prop)return Ts("Cannot morph a <"+o+"> element. "+gg),!1;if(a=o==="PATH"?"d":"points",!t.prop&&!lf(e.setAttribute))return!1;if(c=t2(t.shape||t.d||t.points||"",a==="d",e),u&&YC.test(c))return Ts("A <"+o+"> cannot accept path data. "+gg),!1;if(d=t.shapeIndex||t.shapeIndex===0?t.shapeIndex:"auto",f=t.map||la.defaultMap,this._prop=t.prop,this._render=t.render||la.defaultRender,this._apply="updateTarget"in t?t.updateTarget:la.defaultUpdateTarget,this._rnd=Math.pow(10,isNaN(t.precision)?2:+t.precision),this._tween=n,c){if(this._target=e,M=typeof t.precompile=="object",g=this._prop?e[this._prop]:e.getAttribute(a),!this._prop&&!e.getAttributeNS(null,"data-original")&&e.setAttributeNS(null,"data-original",g),a==="d"||this._prop){if(g=Ds(M?t.precompile[0]:g),m=Ds(M?t.precompile[1]:c),!M&&!Nh(g,m,d,f,j))return!1;for((t.precompile==="log"||t.precompile===!0)&&Ts('precompile:["'+_a(g)+'","'+_a(m)+'"]'),y=(t.type||la.defaultType)!=="linear",y&&(g=pg(g,t.smoothTolerance),m=pg(m,t.smoothTolerance),g.size||kl(g),m.size||kl(m),w=mg(k[0]),this._origin=g.origin={x:g.left+w.x*g.width,y:g.top+w.y*g.height},k[1]&&(w=mg(k[1])),this._eOrigin={x:m.left+w.x*m.width,y:m.top+w.y*m.height}),this._rawPath=e._gsRawPath=g,b=g.length;--b>-1;)for(v=g[b],E=m[b],h=v.isSmooth||[],_=E.isSmooth||[],x=v.length,xl=0,p=0;p<x;p+=2)(E[p]!==v[p]||E[p+1]!==v[p+1])&&(y?h[p]&&_[p]?(T=v.smoothData,R=E.smoothData,D=p+(p===x-4?7-x:5),this._controlPT={_next:this._controlPT,i:p,j:b,l1s:T[p+1],l1c:R[p+1]-T[p+1],l2s:T[D],l2c:R[D]-T[D]},l=this._tweenRotation(v,E,p+2),this._tweenRotation(v,E,p,l),this._tweenRotation(v,E,D-1,l),p+=4):this._tweenRotation(v,E,p):(l=this.add(v,p,v[p],E[p],0,0,0,0,0,1),l=this.add(v,p+1,v[p+1],E[p+1],0,0,0,0,0,1)||l))}else l=this.add(e,"setAttribute",e.getAttribute(a)+"",c+"",i,s,0,e2(d),a);y&&(this.add(this._origin,"x",this._origin.x,this._eOrigin.x,0,0,0,0,0,1),l=this.add(this._origin,"y",this._origin.y,this._eOrigin.y,0,0,0,0,0,1)),l&&(this._props.push("morphSVG"),l.end=c,l.endProp=a)}return $C},render:function(e,t){for(var n=t._rawPath,i=t._controlPT,s=t._anchorPT,o=t._rnd,a=t._target,l=t._pt,c,u,d,f,h,_,g,m,p,b,x,v,E;l;)l.r(e,l.d),l=l._next;if(e===1&&t._apply)for(l=t._pt;l;)l.end&&(t._prop?a[t._prop]=l.end:a.setAttribute(l.endProp,l.end)),l=l._next;else if(n){for(;s;)_=s.sa+e*s.ca,h=s.sl+e*s.cl,s.t[s.i]=t._origin.x+og(_)*h,s.t[s.i+1]=t._origin.y+ag(_)*h,s=s._next;for(d=e<.5?2*e*e:(4-2*e)*e-1;i;)g=i.i,f=n[i.j],E=g+(g===f.length-4?7-f.length:5),_=co(f[E]-f[g+1],f[E-1]-f[g]),x=ag(_),v=og(_),p=f[g+2],b=f[g+3],h=i.l1s+d*i.l1c,f[g]=p-v*h,f[g+1]=b-x*h,h=i.l2s+d*i.l2c,f[E-1]=p+v*h,f[E]=b+x*h,i=i._next;if(a._gsRawPath=n,t._apply){for(c="",u=" ",m=0;m<n.length;m++)for(f=n[m],h=f.length,c+="M"+(f[0]*o|0)/o+u+(f[1]*o|0)/o+" C",g=2;g<h;g++)c+=(f[g]*o|0)/o+u;t._prop?a[t._prop]=c:a.setAttribute("d",c)}}t._render&&n&&t._render.call(t._tween,n,a)},kill:function(e){this._pt=this._rawPath=0},getRawPath:BC,stringToRawPath:Ds,rawPathToString:_a,normalizeStrings:function(e,t,n){var i=n.shapeIndex,s=n.map,o=[e,t];return fg(o,i,s),o},pathFilter:fg,pointsFilter:Fh,getTotalSize:kl,equalizeSegmentQuantity:Nh,convertToPath:function(e,t){return kp(e).map(function(n){return Zx(n,t!==!1)})},defaultType:"linear",defaultUpdateTarget:!0,defaultMap:"size"};Qx()&&rr.registerPlugin(la);(function(){function r(){for(var n=arguments.length,i=0;i<n;i++){var s=i<0||arguments.length<=i?void 0:arguments[i];s.nodeType===1||s.nodeType===11?this.appendChild(s):this.appendChild(document.createTextNode(String(s)))}}function e(){for(;this.lastChild;)this.removeChild(this.lastChild);arguments.length&&this.append.apply(this,arguments)}function t(){for(var n=this.parentNode,i=arguments.length,s=new Array(i),o=0;o<i;o++)s[o]=arguments[o];var a=s.length;if(n)for(a||n.removeChild(this);a--;){var l=s[a];typeof l!="object"?l=this.ownerDocument.createTextNode(l):l.parentNode&&l.parentNode.removeChild(l),a?n.insertBefore(this.previousSibling,l):n.replaceChild(l,this)}}typeof Element<"u"&&(Element.prototype.append||(Element.prototype.append=r,DocumentFragment.prototype.append=r),Element.prototype.replaceChildren||(Element.prototype.replaceChildren=e,DocumentFragment.prototype.replaceChildren=e),Element.prototype.replaceWith||(Element.prototype.replaceWith=t,DocumentFragment.prototype.replaceWith=t))})();function r2(r,e){if(!(r instanceof e))throw new TypeError("Cannot call a class as a function")}function xg(r,e){for(var t=0;t<e.length;t++){var n=e[t];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(r,n.key,n)}}function vg(r,e,t){return e&&xg(r.prototype,e),t&&xg(r,t),r}function s2(r,e,t){return e in r?Object.defineProperty(r,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):r[e]=t,r}function yg(r,e){var t=Object.keys(r);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(r);e&&(n=n.filter(function(i){return Object.getOwnPropertyDescriptor(r,i).enumerable})),t.push.apply(t,n)}return t}function bg(r){for(var e=1;e<arguments.length;e++){var t=arguments[e]!=null?arguments[e]:{};e%2?yg(Object(t),!0).forEach(function(n){s2(r,n,t[n])}):Object.getOwnPropertyDescriptors?Object.defineProperties(r,Object.getOwnPropertyDescriptors(t)):yg(Object(t)).forEach(function(n){Object.defineProperty(r,n,Object.getOwnPropertyDescriptor(t,n))})}return r}function tv(r,e){return a2(r)||c2(r,e)||nv(r,e)||d2()}function ci(r){return o2(r)||l2(r)||nv(r)||u2()}function o2(r){if(Array.isArray(r))return Uh(r)}function a2(r){if(Array.isArray(r))return r}function l2(r){if(typeof Symbol<"u"&&Symbol.iterator in Object(r))return Array.from(r)}function c2(r,e){if(!(typeof Symbol>"u"||!(Symbol.iterator in Object(r)))){var t=[],n=!0,i=!1,s=void 0;try{for(var o=r[Symbol.iterator](),a;!(n=(a=o.next()).done)&&(t.push(a.value),!(e&&t.length===e));n=!0);}catch(l){i=!0,s=l}finally{try{!n&&o.return!=null&&o.return()}finally{if(i)throw s}}return t}}function nv(r,e){if(r){if(typeof r=="string")return Uh(r,e);var t=Object.prototype.toString.call(r).slice(8,-1);if(t==="Object"&&r.constructor&&(t=r.constructor.name),t==="Map"||t==="Set")return Array.from(r);if(t==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))return Uh(r,e)}}function Uh(r,e){(e==null||e>r.length)&&(e=r.length);for(var t=0,n=new Array(e);t<e;t++)n[t]=r[t];return n}function u2(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function d2(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function uo(r,e){return Object.getOwnPropertyNames(Object(r)).reduce(function(t,n){var i=Object.getOwnPropertyDescriptor(Object(r),n),s=Object.getOwnPropertyDescriptor(Object(e),n);return Object.defineProperty(t,n,s||i)},{})}function lc(r){return typeof r=="string"}function Bp(r){return Array.isArray(r)}function eu(){var r=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},e=uo(r),t;return e.types!==void 0?t=e.types:e.split!==void 0&&(t=e.split),t!==void 0&&(e.types=(lc(t)||Bp(t)?String(t):"").split(",").map(function(n){return String(n).trim()}).filter(function(n){return/((line)|(word)|(char))/i.test(n)})),(e.absolute||e.position)&&(e.absolute=e.absolute||/absolute/.test(r.position)),e}function zp(r){var e=lc(r)||Bp(r)?String(r):"";return{none:!e,lines:/line/i.test(e),words:/word/i.test(e),chars:/char/i.test(e)}}function nd(r){return r!==null&&typeof r=="object"}function f2(r){return nd(r)&&/^(1|3|11)$/.test(r.nodeType)}function h2(r){return typeof r=="number"&&r>-1&&r%1===0}function p2(r){return nd(r)&&h2(r.length)}function Eo(r){return Bp(r)?r:r==null?[]:p2(r)?Array.prototype.slice.call(r):[r]}function wg(r){var e=r;return lc(r)&&(/^(#[a-z]\w+)$/.test(r.trim())?e=document.getElementById(r.trim().slice(1)):e=document.querySelectorAll(r)),Eo(e).reduce(function(t,n){return[].concat(ci(t),ci(Eo(n).filter(f2)))},[])}var m2=Object.entries,Vu="_splittype",ar={},g2=0;function Er(r,e,t){if(!nd(r))return console.warn("[data.set] owner is not an object"),null;var n=r[Vu]||(r[Vu]=++g2),i=ar[n]||(ar[n]={});return t===void 0?e&&Object.getPrototypeOf(e)===Object.prototype&&(ar[n]=bg(bg({},i),e)):e!==void 0&&(i[e]=t),t}function fo(r,e){var t=nd(r)?r[Vu]:null,n=t&&ar[t]||{};return n}function iv(r){var e=r&&r[Vu];e&&(delete r[e],delete ar[e])}function _2(){Object.keys(ar).forEach(function(r){delete ar[r]})}function x2(){m2(ar).forEach(function(r){var e=tv(r,2),t=e[0],n=e[1],i=n.isRoot,s=n.isSplit;(!i||!s)&&(ar[t]=null,delete ar[t])})}function v2(r){var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:" ",t=r?String(r):"";return t.trim().replace(/\s+/g," ").split(e)}var Vp="\\ud800-\\udfff",rv="\\u0300-\\u036f\\ufe20-\\ufe23",sv="\\u20d0-\\u20f0",ov="\\ufe0e\\ufe0f",y2="[".concat(Vp,"]"),kh="[".concat(rv).concat(sv,"]"),Bh="\\ud83c[\\udffb-\\udfff]",b2="(?:".concat(kh,"|").concat(Bh,")"),av="[^".concat(Vp,"]"),lv="(?:\\ud83c[\\udde6-\\uddff]){2}",cv="[\\ud800-\\udbff][\\udc00-\\udfff]",uv="\\u200d",dv="".concat(b2,"?"),fv="[".concat(ov,"]?"),w2="(?:"+uv+"(?:"+[av,lv,cv].join("|")+")"+fv+dv+")*",S2=fv+dv+w2,M2="(?:".concat(["".concat(av).concat(kh,"?"),kh,lv,cv,y2].join("|"),`
)`),T2=RegExp("".concat(Bh,"(?=").concat(Bh,")|").concat(M2).concat(S2),"g"),E2=[uv,Vp,rv,sv,ov],A2=RegExp("[".concat(E2.join(""),"]"));function C2(r){return r.split("")}function hv(r){return A2.test(r)}function R2(r){return r.match(T2)||[]}function P2(r){return hv(r)?R2(r):C2(r)}function L2(r){return r==null?"":String(r)}function D2(r){var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:"";return r=L2(r),r&&lc(r)&&!e&&hv(r)?P2(r):r.split(e)}function zh(r,e){var t=document.createElement(r);return e&&Object.keys(e).forEach(function(n){var i=e[n],s=lc(i)?i.trim():i;s===null||s===""||(n==="children"?t.append.apply(t,ci(Eo(s))):t.setAttribute(n,s))}),t}var Hp={splitClass:"",lineClass:"line",wordClass:"word",charClass:"char",types:["lines","words","chars"],absolute:!1,tagName:"div"};function I2(r,e){e=uo(Hp,e);var t=zp(e.types),n=e.tagName,i=r.nodeValue,s=document.createDocumentFragment(),o=[],a=[];return/^\s/.test(i)&&s.append(" "),o=v2(i).reduce(function(l,c,u,d){var f,h;return t.chars&&(h=D2(c).map(function(_){var g=zh(n,{class:"".concat(e.splitClass," ").concat(e.charClass),style:"display: inline-block;",children:_});return Er(g,"isChar",!0),a=[].concat(ci(a),[g]),g})),t.words||t.lines?(f=zh(n,{class:"".concat(e.wordClass," ").concat(e.splitClass),style:"display: inline-block; ".concat(t.words&&e.absolute?"position: relative;":""),children:t.chars?h:c}),Er(f,{isWord:!0,isWordStart:!0,isWordEnd:!0}),s.appendChild(f)):h.forEach(function(_){s.appendChild(_)}),u<d.length-1&&s.append(" "),t.words?l.concat(f):l},[]),/\s$/.test(i)&&s.append(" "),r.replaceWith(s),{words:o,chars:a}}function pv(r,e){var t=r.nodeType,n={words:[],chars:[]};if(!/(1|3|11)/.test(t))return n;if(t===3&&/\S/.test(r.nodeValue))return I2(r,e);var i=Eo(r.childNodes);if(i.length&&(Er(r,"isSplit",!0),!fo(r).isRoot)){r.style.display="inline-block",r.style.position="relative";var s=r.nextSibling,o=r.previousSibling,a=r.textContent||"",l=s?s.textContent:" ",c=o?o.textContent:" ";Er(r,{isWordEnd:/\s$/.test(a)||/^\s/.test(l),isWordStart:/^\s/.test(a)||/\s$/.test(c)})}return i.reduce(function(u,d){var f=pv(d,e),h=f.words,_=f.chars;return{words:[].concat(ci(u.words),ci(h)),chars:[].concat(ci(u.chars),ci(_))}},n)}function O2(r,e,t,n){if(!t.absolute)return{top:e?r.offsetTop:null};var i=r.offsetParent,s=tv(n,2),o=s[0],a=s[1],l=0,c=0;if(i&&i!==document.body){var u=i.getBoundingClientRect();l=u.x+o,c=u.y+a}var d=r.getBoundingClientRect(),f=d.width,h=d.height,_=d.x,g=d.y,m=g+a-c,p=_+o-l;return{width:f,height:h,top:m,left:p}}function mv(r){fo(r).isWord?(iv(r),r.replaceWith.apply(r,ci(r.childNodes))):Eo(r.children).forEach(function(e){return mv(e)})}var N2=function(){return document.createDocumentFragment()};function F2(r,e,t){var n=zp(e.types),i=e.tagName,s=r.getElementsByTagName("*"),o=[],a=[],l=null,c,u,d,f=[],h=r.parentElement,_=r.nextElementSibling,g=N2(),m=window.getComputedStyle(r),p=m.textAlign,b=parseFloat(m.fontSize),x=b*.2;return e.absolute&&(d={left:r.offsetLeft,top:r.offsetTop,width:r.offsetWidth},u=r.offsetWidth,c=r.offsetHeight,Er(r,{cssWidth:r.style.width,cssHeight:r.style.height})),Eo(s).forEach(function(v){var E=v.parentElement===r,M=O2(v,E,e,t),T=M.width,R=M.height,w=M.top,y=M.left;/^br$/i.test(v.nodeName)||(n.lines&&E&&((l===null||w-l>=x)&&(l=w,o.push(a=[])),a.push(v)),e.absolute&&Er(v,{top:w,left:y,width:T,height:R}))}),h&&h.removeChild(r),n.lines&&(f=o.map(function(v){var E=zh(i,{class:"".concat(e.splitClass," ").concat(e.lineClass),style:"display: block; text-align: ".concat(p,"; width: 100%;")});Er(E,"isLine",!0);var M={height:0,top:1e4};return g.appendChild(E),v.forEach(function(T,R,w){var y=fo(T),D=y.isWordEnd,N=y.top,V=y.height,j=w[R+1];M.height=Math.max(M.height,V),M.top=Math.min(M.top,N),E.appendChild(T),D&&fo(j).isWordStart&&E.append(" ")}),e.absolute&&Er(E,{height:M.height,top:M.top}),E}),n.words||mv(g),r.replaceChildren(g)),e.absolute&&(r.style.width="".concat(r.style.width||u,"px"),r.style.height="".concat(c,"px"),Eo(s).forEach(function(v){var E=fo(v),M=E.isLine,T=E.top,R=E.left,w=E.width,y=E.height,D=fo(v.parentElement),N=!M&&D.isLine;v.style.top="".concat(N?T-D.top:T,"px"),v.style.left=M?"".concat(d.left,"px"):"".concat(R-(N?d.left:0),"px"),v.style.height="".concat(y,"px"),v.style.width=M?"".concat(d.width,"px"):"".concat(w,"px"),v.style.position="absolute"})),h&&(_?h.insertBefore(r,_):h.appendChild(r)),f}var Qo=uo(Hp,{}),Va=(function(){vg(r,null,[{key:"clearData",value:function(){_2()}},{key:"setDefaults",value:function(t){return Qo=uo(Qo,eu(t)),Hp}},{key:"revert",value:function(t){wg(t).forEach(function(n){var i=fo(n),s=i.isSplit,o=i.html,a=i.cssWidth,l=i.cssHeight;s&&(n.innerHTML=o,n.style.width=a||"",n.style.height=l||"",iv(n))})}},{key:"create",value:function(t,n){return new r(t,n)}},{key:"data",get:function(){return ar}},{key:"defaults",get:function(){return Qo},set:function(t){Qo=uo(Qo,eu(t))}}]);function r(e,t){r2(this,r),this.isSplit=!1,this.settings=uo(Qo,eu(t)),this.elements=wg(e),this.split()}return vg(r,[{key:"split",value:function(t){var n=this;this.revert(),this.elements.forEach(function(o){Er(o,"html",o.innerHTML)}),this.lines=[],this.words=[],this.chars=[];var i=[window.pageXOffset,window.pageYOffset];t!==void 0&&(this.settings=uo(this.settings,eu(t)));var s=zp(this.settings.types);s.none||(this.elements.forEach(function(o){Er(o,"isRoot",!0);var a=pv(o,n.settings),l=a.words,c=a.chars;n.words=[].concat(ci(n.words),ci(l)),n.chars=[].concat(ci(n.chars),ci(c))}),this.elements.forEach(function(o){if(s.lines||n.settings.absolute){var a=F2(o,n.settings,i);n.lines=[].concat(ci(n.lines),ci(a))}}),this.isSplit=!0,window.scrollTo(i[0],i[1]),x2())}},{key:"revert",value:function(){this.isSplit&&(this.lines=null,this.words=null,this.chars=null,this.isSplit=!1),r.revert(this.elements)}}]),r})();const Ot={heroYearObj:{year:2026},heroNumberTween:null,heroHeadingFadeScrollTrigger:null};function U2(){Ot.heroYearObj.year=2026,Ot.heroNumberTween&&(Ot.heroNumberTween.kill(),Ot.heroNumberTween=null),Ot.heroHeadingFadeScrollTrigger&&(Ot.heroHeadingFadeScrollTrigger.kill(),Ot.heroHeadingFadeScrollTrigger=null)}function k2(r){if(window.scrollDownIcon&&document.contains(window.scrollDownIcon))return;const e=document.createElement("div");e.className="scroll-down-icon",e.innerHTML=`
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
    `);const n=r.parentElement;n?n.appendChild(e):document.body.appendChild(e),fe.to(e,{opacity:1,duration:.8,ease:"power2.out",delay:.3});const i=e.querySelector(".scroll-indicator");fe.to(i,{y:3,duration:1.2,ease:"power2.inOut",repeat:-1,yoyo:!0});const s=e.querySelector(".scroll-arrow");fe.to(s,{opacity:.6,duration:1.5,ease:"power2.inOut",repeat:-1,yoyo:!0}),Xe.create({trigger:"#cover-travel-area",start:"top top",end:"bottom 70%",scrub:.5,markers:!1,onUpdate:o=>{const a=1-o.progress;fe.set(e,{opacity:a,overwrite:!0})},onLeave:()=>{fe.set(e,{opacity:0})},onEnterBack:()=>{fe.set(e,{opacity:0})}}),window.scrollDownIcon=e,window.scrollDownIconCleanup=()=>{Xe.getAll().forEach(o=>{var a;(o.trigger===e||((a=o.vars)==null?void 0:a.trigger)==="#cover-travel-area")&&(o.trigger===e||o.animation&&o.animation.targets().includes(e))&&o.kill()}),e&&e.parentNode&&e.remove(),window.scrollDownIcon=null,window.scrollDownIconCleanup=null}}const B2="/150-lab/assets/audio/ui-click.mp3",z2="/150-lab/assets/audio/chemistry-3-final.mp3";let rn=null,Cn=!1,pn=!1,Hu=!1,Ki=!1,Xr=0;const br=25;let zi=null,va=!1,Es=null;function Gp(){Es||(Es=new Audio(B2),Es.volume=.35,Es.preload="auto")}const io=()=>{if(!pn)try{Es||Gp();const r=Es.cloneNode();r.volume=.35,r.play().catch(e=>{console.warn("UI click sound play was prevented:",e)})}catch(r){console.error("Error playing UI click sound:",r)}};function Sg(r){pn&&(r.volume=0,r.muted=!0),r.addEventListener("play",()=>{const e=document.querySelector(".sound-toggle");e&&e.classList.contains("muted")&&(r.volume=0,r.muted=!0)})}function V2(){new MutationObserver(e=>{e.forEach(t=>{t.type==="childList"&&t.addedNodes.forEach(n=>{n.nodeName==="AUDIO"||n.nodeName==="VIDEO"?Sg(n):n.querySelectorAll&&n.querySelectorAll("audio, video").forEach(s=>{Sg(s)})})})}).observe(document.body,{childList:!0,subtree:!0})}function rc(r=!1){if(!(Cn||pn)){if(Xr++,window.audioRetryCount=Xr,window.maxAudioRetries=br,Xr>=br){console.warn(`Exceeded maximum audio retry attempts (${br}). Stopping retries.`);return}try{if(rn.volume=.22,r)try{const e=new(window.AudioContext||window.webkitAudioContext),t=e.createBufferSource();t.connect(e.destination),t.start(0)}catch(e){console.warn("Could not create audio context:",e)}rn.play().then(()=>{Cn=!0,window.audioInitialized=!0;const e=document.querySelector(".sound-toggle");e&&e.classList.add("active"),Xr=0,window.audioRetryCount=0}).catch(e=>{console.error("Audio play was prevented:",e),Cn=!1,(r||Ki)&&Xr<br&&setTimeout(()=>{!Cn&&!pn&&rc(!0)},500)})}catch(e){console.error("Error playing audio:",e),Cn=!1,(r||Ki)&&Xr<br&&setTimeout(()=>{!Cn&&!pn&&rc(!0)},500)}}}const H2=()=>{document.hidden?rn&&!rn.paused&&Cn&&(va=!0,rn.pause()):rn&&va&&Cn&&!pn&&(va=!1,rn.play().catch(r=>{console.warn("Could not resume background audio:",r),Cn=!1,Ki&&setTimeout(()=>{yo(!0)},100)}))};function G2(){document.addEventListener("visibilitychange",H2),window.addEventListener("blur",()=>{rn&&!rn.paused&&Cn&&(va=!0,rn.pause())}),window.addEventListener("focus",()=>{rn&&va&&Cn&&!pn&&(va=!1,rn.play().catch(r=>{console.warn("Could not resume background audio on focus:",r),Cn=!1,Ki&&setTimeout(()=>{yo(!0)},100)}))})}const yo=(r=!1)=>{if(!pn&&(r&&(Ki=!0,window.enterButtonClicked=!0),!!Ki&&!Cn)){if(Xr>=br){console.warn(`Exceeded maximum audio retry attempts (${br}). Stopping retries.`),zi&&(clearInterval(zi),zi=null);return}if(r){setTimeout(()=>{if(!pn)if(Hu||rn&&rn.readyState>=3)rc(!0);else try{rn.load()}catch(e){console.warn("Error reloading background audio:",e)}},2e3);return}if(Hu||rn&&rn.readyState>=3)rc(r);else if(r)try{rn.load()}catch(e){console.warn("Error reloading background audio:",e)}}};function W2(){const r=new Audio;r.addEventListener("canplaythrough",()=>{Hu=!0,Ki&&!Cn&&!pn&&rc(!0)}),r.addEventListener("error",e=>{console.error("Audio loading error:",e),console.error("Audio src:",r.src),(window.location.hostname==="localhost"||window.location.hostname.includes("127.0.0.1"))&&console.warn("Audio failed to load in dev mode. Ensure audio files are in 150-lab/public/audio/ directory.")}),r.loop=!0,r.volume=0,r.preload="auto",r.src=z2;try{r.load()}catch(e){console.error("Error loading background audio:",e)}rn=r,window.backgroundAudioInstance=r,window.backgroundAudio=r,Cn=!1,pn=!1,Hu=!1,Ki=!1,Xr=0,window.audioInitialized=!1,window.audioMuted=!1,window.userInteracted=!1,window.heroAnimationComplete=!1,window.enterButtonClicked=!1,window.audioRetryCount=0,window.maxAudioRetries=br,window.audioRetryTimer=null,G2()}const X2=()=>{Gp(),document.querySelectorAll('a, button, input[type="button"], input[type="submit"], input[type="reset"], input[type="checkbox"], input[type="radio"]').forEach(t=>{t.addEventListener("click",n=>{if(t.classList.contains("enter-experience")){t.dataset.clickSoundPlayed||(pn||io(),t.dataset.clickSoundPlayed="true");return}pn||io()})}),new MutationObserver(t=>{t.forEach(n=>{n.type==="childList"&&n.addedNodes.forEach(i=>{i.nodeType===1&&(i.matches('a, button, input[type="button"], input[type="submit"], input[type="reset"], input[type="checkbox"], input[type="radio"]')&&i.addEventListener("click",o=>{if(i.classList.contains("enter-experience")){i.dataset.clickSoundPlayed||(pn||io(),i.dataset.clickSoundPlayed="true");return}pn||io()}),i.querySelectorAll('a, button, input[type="button"], input[type="submit"], input[type="reset"], input[type="checkbox"], input[type="radio"]').forEach(o=>{o.addEventListener("click",a=>{if(o.classList.contains("enter-experience")){o.dataset.clickSoundPlayed||(pn||io(),o.dataset.clickSoundPlayed="true");return}pn||io()})}))})})}).observe(document.body,{childList:!0,subtree:!0}),V2()};function q2(){const r=document.querySelector(".sound-toggle");if(r){const e=document.getElementById("waveGroup");e&&(window.waveAnimation=fe.to(e,{x:"-=100",ease:"linear",duration:2,repeat:-1})),r.addEventListener("click",()=>{const t=pn;if(r.classList.toggle("muted"),pn=r.classList.contains("muted"),window.audioMuted=pn,t)try{Es||Gp();const i=Es.cloneNode();i.volume=.38,i.play().catch(s=>{console.warn("UI click sound play was prevented:",s)})}catch(i){console.error("Error playing UI click sound:",i)}else io();const n=window.waveAnimation;if(pn)n&&n.pause(),rn&&(rn.volume=0,zi&&(clearInterval(zi),zi=null));else{n&&n.resume();const i=document.getElementById("anniversary-video");i&&!i.paused&&!i.ended||(!Cn&&Ki&&rn?(yo(!0),zi||(zi=setInterval(()=>{Cn?(clearInterval(zi),zi=null):!pn&&Ki&&(Xr<br?yo(!0):(console.warn(`Exceeded maximum audio retry attempts (${br}). Stopping retries.`),clearInterval(zi),zi=null))},500))):Cn&&rn&&(rn.volume=.22,rn.paused&&rn.play().catch(o=>{console.warn("Audio play was prevented:",o),Cn=!1,Ki&&yo(!0)})))}})}}function Y2(r){window.heroAnimationComplete=r}function $2(r){Ki=r,window.enterButtonClicked=r}let sl=null,ol=null;function Vh(){Ot.heroHeadingFadeScrollTrigger&&(Ot.heroHeadingFadeScrollTrigger.kill(),Ot.heroHeadingFadeScrollTrigger=null);const r=document.querySelector("#hero-area h1");if(r){let e=r.querySelectorAll(".char");if(!e||e.length===0){const i=r.getAttribute("data-original-content")||r.textContent;r.innerHTML=i;try{ol&&(ol.revert(),ol=null),ol=new Va(r,{types:"words,chars",absolute:!1}),e=ol.chars,fe.set(e,{opacity:1,z:0,scale:1,filter:"blur(0px)",transformPerspective:1e3,transformOrigin:"center center"})}catch(s){console.error("Error re-splitting hero heading:",s);return}}if(!e||e.length===0){console.warn("Still no hero heading characters found after attempting re-split. Aborting animation setup.");return}r.offsetHeight;const t=[...e];for(let i=t.length-1;i>0;i--){const s=Math.floor(Math.random()*(i+1));[t[i],t[s]]=[t[s],t[i]]}const n=fe.timeline({paused:!0});n.to(t,{opacity:0,z:-50,filter:"blur(16px)",stagger:.02,ease:"power1.in"},0),Ot.heroHeadingFadeScrollTrigger=Xe.create({animation:n,trigger:"#hero-travel-area",start:"16% top",end:"36% top",scrub:!0,markers:!1,invalidateOnRefresh:!0,onUpdate:i=>{i.progress===0?fe.set(t,{opacity:1,z:0,scale:1,filter:"blur(0px)",clearProps:"transform"}):i.progress===1&&fe.set(t,{opacity:0,z:-50,filter:"blur(16px)"})},onRefresh:i=>{n&&n.progress(i.progress)},onLeave:()=>{fe.set(t,{opacity:0,z:-50,filter:"blur(16px)"})},onEnterBack:()=>{const i=Ot.heroHeadingFadeScrollTrigger?Ot.heroHeadingFadeScrollTrigger.progress:0;n&&n.progress(i)},onLeaveBack:()=>{fe.set(t,{opacity:1,z:0,scale:1,filter:"blur(0px)",clearProps:"transform"}),n&&n.progress(0)}})}else console.warn("#hero-area h1 not found for fade animation setup.")}function j2(){const r=document.querySelector("#cover-area .cover-logo"),e=document.querySelector("#countdown"),t=document.querySelector("#cover-area button.enter-experience"),n=document.querySelector("header"),i=document.querySelector("nav"),s=document.querySelector(".section-timeline"),o=document.querySelector("#app");if(!r||!t)return;n&&fe.set(n,{opacity:0}),s&&fe.set(s,{opacity:0});const a=document.querySelector(".share-button-pinned");a&&fe.set(a,{opacity:0}),window.lenis&&window.lenis.stop(),fe.set(i,{opacity:1}),fe.set(r,{position:"fixed",top:"calc(50% - 100px)",left:"50%",transform:"translate(-50%, -50%)",zIndex:1e3}),e&&fe.set(e,{opacity:0});const l=fe.timeline({delay:.6});o&&l.fromTo(o,{opacity:0},{opacity:1,duration:.8,ease:"power2.out"}),l.fromTo(r,{opacity:0,scale:.95},{opacity:1,scale:1,duration:1.8,ease:"power1.out"}),e&&l.to(e,{opacity:1,duration:.4,ease:"power1.out"},"-=0.4"),l.to(t,{opacity:1,duration:.6,ease:"power2.out",onComplete:()=>{t.style.pointerEvents="auto"}},"-=0.3"),t&&t.addEventListener("click",()=>{t.style.pointerEvents="none",n&&fe.to(n,{opacity:1,duration:.8,ease:"power2.inOut"}),s&&fe.to(s,{opacity:1,duration:.8,ease:"power2.inOut",delay:.2}),window.userInteracted=!0,$2(!0),window.enterButtonClicked=!0,window.enableMouseParticles&&window.enableMouseParticles(),document.dispatchEvent(new CustomEvent("veryEarlyParticleFade")),yo(!0),window.audioRetryTimer||(window.audioRetryTimer=setInterval(()=>{window.audioInitialized?(clearInterval(window.audioRetryTimer),window.audioRetryTimer=null):window.enterButtonClicked&&!window.audioMuted&&(window.audioRetryCount<window.maxAudioRetries?yo(!0):(console.warn(`Exceeded maximum audio retry attempts (${window.maxAudioRetries}). Stopping retries.`),clearInterval(window.audioRetryTimer),window.audioRetryTimer=null))},500)),window.lenis&&window.lenis.start(),fe.to(t,{opacity:0,duration:.5,ease:"power2.in",onComplete:()=>{k2(t),t.style.pointerEvents="none"}}),a&&fe.to(a,{opacity:1,duration:.8,delay:.4,ease:"power2.out"});const c=document.querySelector(".sound-toggle");c&&c.classList.add("active"),setTimeout(()=>{K2(r,e)},100)})}function K2(r,e){let t=null,n=-1,i=null,s=!1,o=!1;const a=document.querySelector("#cover-travel-area");if(a){const c=a.getBoundingClientRect(),u=c.height,d=window.innerHeight,f=Math.abs(c.top)/(u-d*.67);if(f>=.9)o=!0,fe.set([r,e],{opacity:0}),n=0;else{const h=Math.max(0,1-f);fe.set([r,e],{opacity:h}),n=h}}else fe.set([r,e],{opacity:1});function l(){return t&&t.kill(),t=Xe.create({trigger:"#cover-travel-area",start:"top top",end:"67% center",scrub:.5,markers:!1,id:"cover-logo-fade",invalidateOnRefresh:!0,fastScrollEnd:!0,onUpdate:c=>{if(!s)return;const u=1-c.progress;Math.abs(u-n)>.01&&(n=u,r.style.opacity=u,i&&(i.kill(),i=null),e&&(e.style.opacity=u))},onLeave:()=>{s&&(i&&(i.kill(),i=null),r.style.opacity="0",n=0,e&&(e.style.opacity="0"))},onEnterBack:()=>{if(!s)return;const u=1-t.progress;r.style.opacity=u,n=u,i&&(i.kill(),i=null),e&&(i=fe.to(e,{opacity:u,duration:.8,delay:.4,ease:"power2.out",onUpdate:function(){parseFloat(e.style.opacity)},onComplete:function(){i=null}}))},onLeaveBack:()=>{s&&(i&&(i.kill(),i=null),r.style.opacity="1",n=1,e&&(e.style.opacity="1"))}}),setTimeout(()=>{if(s=!0,!o&&t){const c=t.progress,u=1-c;c>0&&c<1?(r.style.opacity=u,n=u,e&&(e.style.opacity=u)):c>=1&&(r.style.opacity="0",n=0,e&&(e.style.opacity="0"))}},200),t}return l()}function Z2(){const r=document.querySelector("#hero-area h1"),e=document.querySelector("#hero-number");if(!r||!e)return;r.getAttribute("data-original-content")||r.setAttribute("data-original-content",r.textContent),Xe.getAll().forEach(a=>{(a.vars.trigger==="#hero-area"||a.vars.trigger==="#hero-travel-area")&&a.kill()});const t=e.innerText||"2026";e.getAttribute("data-original-content")||e.setAttribute("data-original-content",t),e.innerHTML="",e.style.setProperty("--digit-opacity","0"),t.split("").forEach(a=>{const l=document.createElement("span");l.className="digit",l.textContent=a,l.setAttribute("data-digit",a),e.appendChild(l)}),fe.set(e,{opacity:0}),fe.set(r,{opacity:0}),sl&&(sl.revert(),sl=null),sl=new Va(r,{types:"words,chars",absolute:!1});const n=sl;fe.set(n.chars,{opacity:0,z:150,scale:1.2,transformPerspective:1e3,transformOrigin:"center center",filter:"blur(16px)"});const i=[...n.chars];for(let a=i.length-1;a>0;a--){const l=Math.floor(Math.random()*(a+1));[i[a],i[l]]=[i[l],i[a]]}const s=fe.timeline({paused:!0,onComplete:()=>{Y2(!0),window.heroAnimationComplete=!0;const a=new CustomEvent("heroAnimationComplete");document.dispatchEvent(a)}});s.to(r,{opacity:1,duration:.8,ease:"power2.out"}),s.to(i,{opacity:1,z:0,scale:1,filter:"blur(0px)",duration:1.25,stagger:.03,ease:"power2.out",onComplete:()=>{const a=new CustomEvent("particleFadeStart");document.dispatchEvent(a)}}),s.to(e,{opacity:1,duration:1.5,scrub:1.5,ease:"power1.inOut"});const o=e.querySelectorAll(".digit");fe.set(o,{y:10,z:-120,transformPerspective:1e3,transformOrigin:"center center"}),s.to(o,{y:0,z:0,duration:2.5,stagger:.1,ease:"power3.out"},"-=0.6"),s.to(e,{"--digit-opacity":.44,duration:2.5,ease:"power3.out"},"-=2.5"),Xe.create({trigger:"#hero-travel-area",start:"top 90%",end:"top 0%",animation:s,scrub:.5,markers:!1,invalidateOnRefresh:!0,fastScrollEnd:!0,onEnter:()=>{const a=new CustomEvent("veryEarlyParticleFade");document.dispatchEvent(a)},onUpdate:a=>{s&&s.progress(a.progress)}}),e&&(Xe.create({trigger:"#hero-travel-area",start:"15% top",end:"bottom bottom",scrub:.3,markers:!1,invalidateOnRefresh:!0,fastScrollEnd:!0,onUpdate:a=>{const l=1-a.progress*.5;e.style.transform=`scale(${l})`},onLeave:()=>{e.style.transform="scale(0.5)"},onEnterBack:()=>{const l=1-(Xe.getById("hero-scale")?Xe.getById("hero-scale").progress:0)*.5;e.style.transform=`scale(${l})`},onLeaveBack:()=>{e.style.transform="scale(1)"},id:"hero-scale"}),Xe.create({trigger:"#hero-travel-area",start:"bottom 90%",end:"bottom 80%",scrub:.3,markers:!1,invalidateOnRefresh:!0,fastScrollEnd:!0,onUpdate:function(a){const l=a.progress;let c=1;Ot.heroNumberTween&&Ot.heroNumberTween.scrollTrigger&&(c=.44+Ot.heroNumberTween.scrollTrigger.progress*.56);const u=c*(1-l),d=l*16;e.style.setProperty("--digit-opacity",u),e.style.filter=`blur(${d}px)`},onLeave:()=>{e.style.setProperty("--digit-opacity","0"),e.style.filter="blur(16px)"},onEnterBack:()=>{const a=Xe.getById("hero-fade-out");if(a){const l=a.progress;let c=1;Ot.heroNumberTween&&Ot.heroNumberTween.scrollTrigger&&(c=.44+Ot.heroNumberTween.scrollTrigger.progress*.56);const u=c*(1-l),d=l*16;e.style.setProperty("--digit-opacity",u),e.style.filter=`blur(${d}px)`}},id:"hero-fade-out"}),Xe.create({trigger:"#hero-travel-area",start:"bottom 80%",end:"bottom 60%",scrub:.5,markers:!1,invalidateOnRefresh:!0,fastScrollEnd:!0,onUpdate:function(a){e.style.setProperty("--digit-opacity","0"),e.style.filter="blur(16px)",e.style.opacity="0"},onLeave:()=>{e.style.setProperty("--digit-opacity","0"),e.style.filter="blur(16px)",e.style.opacity="0"},onEnterBack:()=>{},onLeaveBack:()=>{e.style.opacity="1"},id:"hero-backup-fade-out"}))}function J2(){const r=document.querySelector("#hero-number");r?Ot.heroNumberTween?(Ot.heroNumberTween.scrollTrigger&&Ot.heroNumberTween.scrollTrigger.enable(),Ot.heroNumberTween.resume()):(Ot.heroNumberTween=fe.to(Ot.heroYearObj,{year:1876,ease:"none",paused:!0,scrollTrigger:{trigger:"#hero-travel-area",start:"15% top",end:"75% bottom",scrub:.5,markers:!1,invalidateOnRefresh:!0,fastScrollEnd:!0,id:"hero-countdown",onUpdate:function(e){const t=Math.round(2026-e.progress*150);Ot.heroYearObj.year=t;const n=.44+e.progress*.56,i=t.toString(),s=r.querySelectorAll(".digit"),o=i.split("");let a=!1;if(s.length!==o.length)a=!0;else for(let l=0;l<s.length;l++)if(s[l].textContent!==o[l]){a=!0;break}a&&(s.length!==o.length?(r.innerHTML="",o.forEach(l=>{const c=document.createElement("span");c.className="digit",c.textContent=l,c.setAttribute("data-digit",l),r.appendChild(c)})):s.forEach((l,c)=>{l.textContent!==o[c]&&(l.textContent=o[c],l.setAttribute("data-digit",o[c]))})),r.style.setProperty("--digit-opacity",n),r.style.filter="blur(0px)"},onLeave:function(e){requestAnimationFrame(()=>{r.style.setProperty("--digit-opacity","1.0"),r.style.filter="blur(0px)"})},onComplete:function(){Ot.heroYearObj.year=1876;const e=document.querySelector("#hero-number");if(e){const t=e.querySelectorAll(".digit"),n="1876".split("");t.forEach((i,s)=>{i.textContent!==n[s]&&(i.textContent=n[s],i.setAttribute("data-digit",n[s]))}),requestAnimationFrame(()=>{e.style.setProperty("--digit-opacity","1.0"),e.style.filter="blur(0px)"})}},onLeaveBack:function(e){Ot.heroYearObj.year=2026;const t=document.querySelector("#hero-number");if(t){const n=t.querySelectorAll(".digit"),i="2026".split("");n.forEach((s,o)=>{s.textContent!==i[o]&&(s.textContent=i[o],s.setAttribute("data-digit",i[o]))}),requestAnimationFrame(()=>{t.style.setProperty("--digit-opacity","0.44"),t.style.filter="blur(0px)"})}},onRefresh:e=>{const t=.44+e.progress*.56;requestAnimationFrame(()=>{r.style.setProperty("--digit-opacity",t),r.style.filter="blur(0px)"})}}}),Ot.heroNumberTween.scrollTrigger?Xe.refresh():console.error("Hero countdown: ScrollTrigger creation failed!")):console.warn("#hero-number element not found for countdown animation.")}function Q2(){document.querySelectorAll(".pin-top-top").forEach(function(r){let e=r.parentElement;r.id==="cover-area"?Xe.create({trigger:"#cover-travel-area",start:"top top",end:"bottom top",pin:r,pinSpacing:!1,anticipatePin:1,onLeaveBack:t=>{t.pin.style.transform="translate3d(0px, 0px, 0px)"}}):r.id==="hero-area"?Xe.create({trigger:r,endTrigger:"#hero-travel-area",start:"top top",end:"bottom 80%",pin:r,pinSpacing:!1,anticipatePin:1,onLeaveBack:t=>{t.pin.style.transform="translate3d(0px, 0px, 0px)"}}):Xe.create({trigger:e,start:"top top",end:"bottom bottom",pin:r,pinSpacing:!1})})}function e3(){const r=document.querySelector("#video .video-wrapper"),e=document.querySelector("#video"),t=document.querySelector("#video-travel-area");r&&e&&t&&(fe.set(r,{scale:.4,opacity:0,transformOrigin:"center center"}),fe.set(e,{pointerEvents:"none"}),fe.timeline({scrollTrigger:{trigger:"#video",start:"top top",end:"top -50%",scrub:!0,markers:!1,onUpdate:i=>{i.progress>.8?r.classList.add("scale-active"):r.classList.remove("scale-active")}}}).to(r,{scale:1,opacity:1,ease:"power2.out"}),Xe.create({trigger:"#video",start:"top 20%",end:"top top",markers:!1,onEnter:()=>{fe.set(e,{pointerEvents:"auto"})},onLeaveBack:()=>{fe.set(e,{pointerEvents:"none"})}}),Xe.create({trigger:"#video",start:"top top",endTrigger:"#video-travel-area",end:"bottom bottom",pin:!0,pinSpacing:!1,anticipatePin:1,markers:!1,id:"video-pin"}))}function id(r,e){let t;return function(...i){const s=()=>{clearTimeout(t),r(...i)};clearTimeout(t),t=setTimeout(s,e)}}function t3(){const r=document.querySelector("#get-involved-text p");r&&(fe.set(r,{opacity:1,visibility:"visible",autoAlpha:1}),setTimeout(()=>{document.body.offsetHeight,r.offsetHeight,r.style.width=r.offsetWidth+"px";const e=new Va(r,{types:"lines",lineClass:"line",absolute:!1});e.lines&&e.lines.length>0?(fe.set(e.lines,{opacity:0,y:40,transformOrigin:"center center"}),fe.timeline({scrollTrigger:{trigger:"#get-involved",start:"top 65%",end:"top 20%",scrub:!1,markers:!1,toggleActions:"play none none reverse"}}).to(e.lines,{opacity:1,y:0,duration:1.2,stagger:.25,ease:"power1.out"})):console.warn("SplitType failed to detect lines properly")},100))}function n3(){const r=document.querySelector(".get-involved-150-logo");if(!r){console.warn("No .get-involved-150-logo element found");return}fe.set(r,{opacity:0,y:50}),Xe.create({trigger:r,start:"top 85%",once:!1,markers:!1,id:"get-involved-logo-fade",onEnter:()=>{fe.to(r,{opacity:1,y:0,duration:1.2,ease:"power2.out",overwrite:!0})},onLeaveBack:()=>{fe.to(r,{opacity:0,y:50,duration:.8,ease:"power2.in",overwrite:!0})}})}function i3(){const r=document.querySelector(".sliding-card-row-wrapper"),e=document.querySelector("#get-involved-cards"),t=document.querySelector("#hero-travel-area");let n,i;if(r&&e){const s=()=>{const l=window.innerWidth>1280;n&&!l&&(n.kill(),n=null,fe.set(r,{x:0})),l&&!n?n=fe.fromTo(r,{x:"44vw"},{x:"-20vw",ease:"power1.inOut",scrollTrigger:{trigger:"#get-involved-cards",start:"top 80%",end:"bottom 20%",scrub:1.5,invalidateOnRefresh:!0,markers:!1,id:"sliding-cards-animation",refreshPriority:-1}}).scrollTrigger:n&&n.refresh()},o=()=>{i&&(i.kill(),i=null),t&&(i=Xe.create({trigger:"#get-involved-cards",start:"top 80%",end:"top 20%",scrub:!0,markers:!1,id:"hero-fade-animation",onUpdate:l=>{const c=1-l.progress;fe.set(t,{opacity:c})},onLeaveBack:()=>{fe.set(t,{opacity:1})}}))};s(),o();const a=id(()=>{s(),o()},250);window.addEventListener("resize",a)}else console.warn("Could not find sliding card wrapper or get-involved-cards section")}function r3(){const r=document.querySelector(".form-panel .animation-column"),e=r==null?void 0:r.querySelector("img");if(!r||!e){console.warn("Form panel animation column or image not found");return}let t=r.querySelector(".marquee-container");if(!t){t=document.createElement("div"),t.className="marquee-container";const u=e.cloneNode(!0);u.className+=" cloned-image",e.remove(),t.appendChild(e),t.appendChild(u),r.appendChild(t)}const n=[e,t.querySelector(".cloned-image")];let i=null;const s=()=>{i&&(i.kill(),i=null),r.offsetHeight,e.offsetHeight,setTimeout(()=>{const d=e.getBoundingClientRect().height;if(d<=0){if(window.innerWidth<580)return;console.warn("Image height is 0, retrying marquee setup..."),setTimeout(s,200);return}fe.set(n,{y:0,top:"auto",opacity:1}),fe.set(e,{position:"absolute",top:0,left:0}),fe.set(n[1],{position:"absolute",top:d+"px",left:0});const f=fe.timeline({repeat:-1,ease:"none"}),h=Math.max(d/30,2);f.to(n,{y:-d,duration:h,ease:"none"}),f.set(n,{y:0}),i=f},100)},o=id(()=>{document.body.offsetHeight,s()},250);(()=>{e.complete&&e.naturalHeight!==0?s():(e.addEventListener("load",s),setTimeout(s,1e3))})(),window.addEventListener("resize",o),window.addEventListener("orientationchange",()=>{setTimeout(o,300)}),window.cleanupInfiniteMarquee=()=>{i&&(i.kill(),i=null),window.removeEventListener("resize",o)};let l=!1;const c=()=>{if(!l){l=!0;const u=e.getBoundingClientRect().height,d=parseFloat(n[1].style.top||"0");Math.abs(u-d)>5&&s(),window.removeEventListener("scroll",c)}};window.addEventListener("scroll",c),document.fonts&&document.fonts.ready&&document.fonts.ready.then(()=>{setTimeout(s,100)})}function s3(){const r=document.querySelectorAll(".scroll-reveal, .reveal-top-center, .reveal-center-center");if(!r.length){console.warn("No reveal elements found");return}r.forEach((e,t)=>{const n=e.classList.contains("fancy-btn"),i=parseFloat(e.getAttribute("data-reveal-delay"))||0;let s=50,o="top 85%";e.classList.contains("reveal-top-center")?(s=-50,o="top 50%"):e.classList.contains("reveal-center-center")&&(s=0,o="center 50%"),n?(fe.set(e,{y:s,filter:"opacity(0)"}),Xe.create({trigger:e,start:o,once:!1,markers:!1,id:`scroll-reveal-button-${t}`,onEnter:()=>{fe.to(e,{y:0,filter:"opacity(1)",duration:1.2,delay:i,ease:"power2.out",overwrite:!0})},onLeaveBack:()=>{fe.to(e,{y:s,filter:"opacity(0)",duration:.8,ease:"power2.in",overwrite:!0})}})):(fe.set(e,{opacity:0,y:s}),Xe.create({trigger:e,start:o,once:!1,markers:!1,id:`scroll-reveal-${t}`,onEnter:()=>{fe.to(e,{opacity:1,y:0,duration:1.2,delay:i,ease:"power2.out",overwrite:!0})},onLeaveBack:()=>{fe.to(e,{opacity:0,y:s,duration:.8,ease:"power2.in",overwrite:!0})}}))})}function o3(){const r=new Is(window.innerWidth,window.innerHeight);r.texture.generateMipmaps=!1,r.texture.minFilter=jn;const e=new Su,t=new tp,n=new Vi(2,2),i=new fi({uniforms:{uTime:{value:0},uResolution:{value:new Et(window.innerWidth,window.innerHeight)}},vertexShader:`
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
    `,depthWrite:!1}),s=new Jn(n,i);e.add(s);const o=new qu(1,128,128),a=new cr({transmission:1,transparent:!0,opacity:1,thickness:2,roughness:.02,reflectivity:.8,ior:1.45,attenuationColor:new $e("#4fb8e9"),attenuationDistance:2,envMap:r.texture,envMapIntensity:1.5,clearcoat:1,clearcoatRoughness:.05}),l=new Jn(o,a);l.position.set(0,0,0);const c=o.attributes.position,u=Float32Array.from(c.array);return{sphere:l,geometry:o,basePositions:u,bgScene:e,bgCamera:t,bgMaterial:i,refractRT:r}}function a3(r,e,t,n){r.bgMaterial.uniforms.uTime.value=e,t.setRenderTarget(r.refractRT),t.render(r.bgScene,r.bgCamera),t.setRenderTarget(null);const i=r.geometry.attributes.position,s=r.basePositions,o=i.count;for(let a=0;a<o;a++){const l=a*3,c=s[l],u=s[l+1],d=s[l+2];i.array[l]=c+.08*Math.sin(e*.7+c*2.1+u*1.7),i.array[l+1]=u+.08*Math.sin(e*.7+u*2.3+d*1.9),i.array[l+2]=d+.08*Math.sin(e*.7+d*2.5+c*1.3)}i.needsUpdate=!0,r.geometry.computeVertexNormals(),r.sphere.rotation.y+=.002}function l3(r,e,t){r.bgMaterial.uniforms.uResolution.value.set(e,t),r.refractRT.setSize(e,t)}function c3(){const i=new qu(.02,8,8),s=new fi({uniforms:{uTime:{value:0},uWaveStrength:{value:.3},uWaveSpeed:{value:.5}},vertexShader:`
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
    `,transparent:!0,depthWrite:!1}),o=new t_(i,s,2400),a=new un;let l=0;for(let c=0;c<40;c++)for(let u=0;u<60;u++)a.position.set(u*.3-60*.3/2,c*.3-40*.3/2,-3),a.updateMatrix(),o.setMatrixAt(l,a.matrix),l++;return o.instanceMatrix.needsUpdate=!0,o}class u3{constructor(){if(this.canvas=document.getElementById("timeline-canvas"),!this.canvas)throw new Error("Timeline canvas not found");this.scene=null,this.camera=null,this.renderer=null,this.sphereSystem=null,this.dotPlane=null,this.clock=new Wb,this.isAnimating=!1,this.init()}init(){this.scene=new Su,this.camera=new li(45,window.innerWidth/window.innerHeight,.1,100),this.camera.position.set(0,0,3),this.renderer=new g_({canvas:this.canvas,alpha:!0,antialias:!0}),this.renderer.setSize(window.innerWidth,window.innerHeight),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));const e=new l_(16777215,1);e.position.set(5,5,5),this.scene.add(e);const t=new u_(16777215,.6);this.scene.add(t),this.sphereSystem=o3(),this.scene.add(this.sphereSystem.sphere),this.dotPlane=c3(),this.scene.add(this.dotPlane),window.addEventListener("resize",()=>this.onResize()),this.startAnimation()}startAnimation(){this.isAnimating||(this.isAnimating=!0,this.animate())}stopAnimation(){this.isAnimating=!1}animate(){if(!this.isAnimating)return;requestAnimationFrame(()=>this.animate());const e=this.clock.getElapsedTime();a3(this.sphereSystem,e,this.renderer,this.camera),this.dotPlane&&this.dotPlane.material.uniforms&&(this.dotPlane.material.uniforms.uTime.value=e),this.renderer.autoClear=!0,this.renderer.render(this.scene,this.camera)}onResize(){const e=window.innerWidth,t=window.innerHeight;this.camera.aspect=e/t,this.camera.updateProjectionMatrix(),this.renderer.setSize(e,t),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,2)),this.sphereSystem&&l3(this.sphereSystem,e,t)}dispose(){this.stopAnimation(),this.sphereSystem&&(this.sphereSystem.sphere.geometry.dispose(),this.sphereSystem.sphere.material.dispose(),this.sphereSystem.bgMaterial.dispose(),this.sphereSystem.refractRT.dispose()),this.dotPlane&&(this.dotPlane.geometry.dispose(),this.dotPlane.material.dispose()),this.renderer.dispose()}}function d3(){return new u3}let f3=null;function Mg(r,e,t){const n=c=>{const u=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(c);return u?{r:parseInt(u[1],16),g:parseInt(u[2],16),b:parseInt(u[3],16)}:null},i=n(r),s=n(e);if(!i||!s)return r;const o=Math.round(i.r+(s.r-i.r)*t),a=Math.round(i.g+(s.g-i.g)*t),l=Math.round(i.b+(s.b-i.b)*t);return`#${((1<<24)+(o<<16)+(a<<8)+l).toString(16).slice(1)}`}function h3(){const r=document.querySelector("#acs-timeline"),e=document.querySelector("#timeline-window-start"),t=document.querySelector("#timeline-window-bg"),n=document.querySelector(".get-involved-message");if(!r||!e||!t||!n){console.warn("Timeline: Required elements not found. Skipping timeline initialization.");return}const i=r.querySelector(".timeline-container"),s=r.querySelector(".timeline-track");if(!i||!s){console.warn("Timeline: Container or track not found. Skipping timeline initialization.");return}typeof window.backgroundPaused>"u"&&(window.backgroundPaused=!1);try{f3=d3(),console.log("Timeline: Three.js scene initialized")}catch(G){console.error("Timeline: Failed to initialize Three.js scene:",G)}const o=()=>{const G=e.getBoundingClientRect(),Y=window.getComputedStyle(e);parseFloat(Y.fontSize);const F=t.style.opacity||"0";fe.set(t,{position:"fixed",top:`${G.top}px`,left:`${G.left}px`,width:`${G.width}px`,height:`${G.height}px`,backgroundImage:"linear-gradient(to bottom, #0493E2, #0493E2)",zIndex:0,opacity:F,borderRadius:"4px"})};fe.set(t,{opacity:0}),requestAnimationFrame(()=>{setTimeout(()=>{o()},100)});const a=new ResizeObserver(()=>{o()});a.observe(document.body);let l=!0;const c=()=>{l&&window.lenis&&o()};window.lenis&&window.lenis.on("scroll",c);let u=setInterval(()=>{l&&o()},16);const d=fe.utils.toArray(".timeline-event"),f=fe.utils.toArray(".timeline-decade"),h=d.length-1,_=window.innerHeight*1,g=window.innerHeight*2,m=_+h*g,p=1,b=.2,x=p+b,v=.09+b,E=h*x,M=v+E;let T={isLocked:!1,targetIndex:-1,unlockTimer:null};const R=G=>{const Y=document.querySelector(".scrubber-progress"),F=fe.utils.toArray(".marker");if(!Y||!f.length)return;const ae=F.length;let O=0,he=0;if(T.isLocked&&T.targetIndex>=0)O=T.targetIndex,he=(2*O+1)/(2*ae);else{const P=v/M;if(G<P)O=0,he=1/(2*ae);else{const Me=G-P,Ne=1-P,ze=Me/Ne,te=f[0],ie=fe.utils.toArray(".timeline-event",te),K=ie.length===1&&ie[0].classList.contains("timeline-cover");let Ue=0,be=0;const pt=Math.floor(ze*h);if(K){const Te=f.slice(1);for(let tt=0;tt<Te.length;tt++){const U=fe.utils.toArray(".timeline-event",Te[tt]);if(pt<Ue+U.length){be=tt+1;break}Ue+=U.length,be=tt+1}}else for(let Te=0;Te<f.length;Te++){const tt=fe.utils.toArray(".timeline-event",f[Te]);if(pt<Ue+tt.length){be=Te;break}Ue+=tt.length,be=Te}O=Math.min(be,ae-1),he=(2*O+1)/(2*ae)}}fe.to(Y,{scaleX:he,transformOrigin:"left",duration:.3,ease:"power2.out"}),F.length>0&&F.forEach((P,Me)=>{P.classList.remove("active","complete"),Me===O?P.classList.add("active"):Me<O&&P.classList.add("complete")})},w=G=>{if(G===0)return(.09+b*.5)/M;let Y=0;for(let P=0;P<G&&P<f.length;P++){const Me=fe.utils.toArray(".timeline-event",f[P]);Y+=Me.length}const F=f[G];if(fe.utils.toArray(".timeline-event",F).length===0)return console.warn(`Decade ${G} has no events`),0;const O=Y-1,he=v+O*x+p+b*.5;return Math.min(he/M,.99)};fe.timeline({scrollTrigger:{trigger:e,start:"top 90%",end:"top 70%",scrub:1,onLeaveBack:()=>{fe.to(t,{opacity:0,duration:.3})}}}).to(t,{opacity:.5,ease:"power2.out"});let y=null;const D=fe.timeline({scrollTrigger:{trigger:n,start:"center center",end:"+=600",pin:!0,scrub:1,anticipatePin:1,onUpdate:G=>{if(G.progress<.01&&!y){const Y=e.getBoundingClientRect();y={top:Y.top,left:Y.left,width:Y.width,height:Y.height}}},onEnter:()=>{l=!1,y&&fe.set(t,{top:`${y.top}px`,left:`${y.left}px`,width:`${y.width}px`,height:`${y.height}px`,backgroundImage:"linear-gradient(to bottom, #0493E2, #0493E2)",borderRadius:"4px"}),console.log("Timeline: Pinning get-involved-message and expanding background",y)},onLeaveBack:()=>{l=!0,y=null,requestAnimationFrame(()=>{o(),requestAnimationFrame(()=>{o(),setTimeout(()=>{o()},50)})}),console.log("Timeline: Resuming background tracking")}}}),N={progress:0};D.fromTo(t,()=>{if(y)return{top:`${y.top}px`,left:`${y.left}px`,width:`${y.width}px`,height:`${y.height}px`};const G=e.getBoundingClientRect();return{top:`${G.top}px`,left:`${G.left}px`,width:`${G.width}px`,height:`${G.height}px`}},{top:0,left:0,width:"100vw",height:"100vh",opacity:1,borderRadius:"0px",ease:"power2.inOut",duration:.7},0),D.to(N,{progress:1,duration:.7,ease:"power2.inOut",onUpdate:()=>{const G=Mg("#0493E2","#0493AB",N.progress),Y=Mg("#0493E2","#0657A4",N.progress);t.style.backgroundImage=`linear-gradient(to bottom, ${G}, ${Y})`}},0),D.to(n,{opacity:0,ease:"power2.in",duration:.6},.4);const V=fe.timeline({scrollTrigger:{trigger:r,start:"top top",end:`+=${m}`,pin:i,scrub:1,anticipatePin:1,invalidateOnRefresh:!0,onUpdate:G=>{R(G.animation.progress()),x3(G.progress),G.progress>0&&G.progress<.95&&t.style.opacity!=="1"&&(t.style.opacity="1")},onEnter:()=>{console.log("Timeline: Entering timeline section"),fe.to(t,{opacity:1,duration:.2,overwrite:"auto"})},onLeave:()=>{console.log("Timeline: Leaving timeline section")}}});if(V.fromTo(".timeline-scrubber",{opacity:0,y:30},{opacity:1,y:0,duration:.05,ease:"power2.out"},0),V.from(".timeline-threejs-container",{opacity:0,scale:.8,duration:.03},.01),V.from(".timeline-close",{opacity:0,scale:.8,duration:.03},.02),d.length>0){const G=d[0],Y=d.slice(1);V.fromTo(G,{opacity:0,scale:.98},{opacity:1,scale:1,duration:.05,ease:"power1.out"},.04),V.to({},{duration:b},">"),V.to(t,{"--decal-opacity":1,duration:b*.6,ease:"power2.out",onUpdate:function(){const F=fe.getProperty(t,"--decal-opacity")||0;t.style.setProperty("--decal-opacity",F)}},`<+=${b*.2}`),Y.forEach((F,ae)=>{const O=-(ae+1)*window.innerWidth,he=`event-${ae}`;V.to(s,{x:O,duration:p,ease:"power1.inOut"},he);const P=ae===0?G:Y[ae-1];V.to(P,{opacity:0,scale:1.02,duration:p*.5,ease:"power1.in"},`${he}+=${p*.4}`),V.fromTo(F,{opacity:0,scale:.98},{opacity:1,scale:1,duration:p*.5,ease:"power1.out"},`${he}+=${p*.3}`),V.to({},{duration:b})})}const j=r.querySelector(".timeline-close");j&&j.addEventListener("click",()=>{var Y;const G=r.offsetTop+r.offsetHeight;(Y=window.lenis)==null||Y.scrollTo(G,{duration:1.5})});const k=fe.utils.toArray(".marker");return k.forEach((G,Y)=>{G.addEventListener("click",()=>{T.isLocked=!0,T.targetIndex=Y,T.unlockTimer&&clearTimeout(T.unlockTimer),k.forEach((Ne,ze)=>{Ne.classList.remove("active","complete"),ze===Y?Ne.classList.add("active"):ze<Y&&Ne.classList.add("complete")});const F=w(Y),ae=V.scrollTrigger;if(!ae)return;const O=ae.start,P=ae.end-O,Me=O+P*F;console.log(`Marker Click: Index ${Y}, Target Progress: ${F.toFixed(3)}, Target Scroll: ${Me.toFixed(0)}`),window.lenis?window.lenis.scrollTo(Me,{duration:1.2,easing:Ne=>Math.min(1,1.001-Math.pow(2,-10*Ne)),onComplete:()=>{T.unlockTimer=setTimeout(()=>{T.isLocked=!1,T.targetIndex=-1,console.log("Marker Click: Unlocked after scroll complete")},500)}}):(window.scrollTo({top:Me,behavior:"smooth"}),T.unlockTimer=setTimeout(()=>{T.isLocked=!1,T.targetIndex=-1,console.log("Marker Click: Unlocked after scroll complete (native)")},1500))}),G.style.cursor="pointer"}),fe.timeline({scrollTrigger:{trigger:r,start:"bottom bottom",end:"bottom 80%",scrub:1,onEnterBack:()=>{fe.to([t,r],{opacity:1,duration:.3})}}}).to([t,r],{opacity:0,ease:"power2.in"}),window._timelineCleanup={interval:u,resizeObserver:a,lenisCallback:c},V.scrollTrigger&&(Di.timelineScrollTrigger=V.scrollTrigger),requestAnimationFrame(()=>{Xe.refresh()}),V}let Di={isResizing:!1,savedProgress:null,timelineScrollTrigger:null};function p3(){const r=Di.timelineScrollTrigger;if(!r||!r.isActive)return null;const e=r.progress,t=fe.utils.toArray(".timeline-event"),n=fe.utils.toArray(".timeline-decade");let i=0,s=0;const o=t.length;if(o>0&&e>0){i=Math.min(Math.floor(e*o),o-1);let a=0;for(let l=0;l<n.length;l++){const c=fe.utils.toArray(".timeline-event",n[l]);if(i<a+c.length){s=l;break}a+=c.length}}return{progress:e,activeEventIndex:i,activeDecadeIndex:s,scrollPosition:window.pageYOffset||document.documentElement.scrollTop}}function m3(r){if(!r||!Di.timelineScrollTrigger)return;const e=Di.timelineScrollTrigger,t=e.start,i=e.end-t,s=t+i*r.progress;console.log(`Timeline Resize: Restoring to event ${r.activeEventIndex}, decade ${r.activeDecadeIndex}, progress ${r.progress.toFixed(3)}`),window.lenis?window.lenis.scrollTo(s,{immediate:!0,force:!0,lock:!0}):window.scrollTo({top:s,behavior:"auto"})}let Tg=null,Eg=null;function g3(){Di.isResizing||(Di.isResizing=!0,Di.savedProgress=p3(),document.body.classList.add("timeline-resizing"),Di.savedProgress&&console.log("Timeline Resize: Captured state -",Di.savedProgress))}function _3(){Xe.refresh(),requestAnimationFrame(()=>{setTimeout(()=>{Di.savedProgress&&m3(Di.savedProgress),setTimeout(()=>{document.body.classList.remove("timeline-resizing"),Di.isResizing=!1,Di.savedProgress=null},150)},50)})}window.addEventListener("resize",()=>{clearTimeout(Eg),clearTimeout(Tg),Eg=setTimeout(g3,10),Tg=setTimeout(_3,300)});function x3(r){r>.1&&r<.95?window.backgroundPaused||(window.backgroundPaused=!0,console.log("[Timeline] Pausing background shader for performance (film grain, waves, particles frozen)"),window.dispatchEvent(new CustomEvent("timeline:backgroundPaused",{detail:{paused:!0}}))):window.backgroundPaused&&(window.backgroundPaused=!1,console.log("[Timeline] Resuming background shader (film grain, waves, particles active)"),window.dispatchEvent(new CustomEvent("timeline:backgroundPaused",{detail:{paused:!1}})))}let Ag=!1;function Cg(r){let e=!1;r.addEventListener("mouseenter",()=>{e=!0,r.classList.add("fancy-btn-active"),r.style.transform="translateY(-2px) scale(1.02)"}),r.addEventListener("mouseleave",()=>{e=!1,r.classList.remove("fancy-btn-active"),r.style.transform=""}),r.addEventListener("mousedown",()=>{r.style.transform="translateY(1px) scale(0.98)"}),r.addEventListener("mouseup",()=>{e&&(r.style.transform="translateY(-2px) scale(1.02)")})}function v3(){const r=document.querySelectorAll(".fancy-btn"),e=()=>{r.forEach(t=>{t.dataset.fancyInitialized!=="true"&&(Cg(t),t.dataset.fancyInitialized="true")})};Ag||(document.addEventListener("heroAnimationComplete",e),Ag=!0),r.forEach(t=>{t.classList.contains("enter-experience")||(Cg(t),t.dataset.fancyInitialized="true")}),window.heroAnimationComplete&&e()}function y3(){const r=document.querySelector("#hero-travel-area"),e=document.querySelector("#get-involved"),t=document.querySelector("#events");document.querySelector("#video-travel-area");const n=document.querySelector(".page-nav"),i=document.querySelector(".section-timeline .indicator .active-title"),s=document.querySelector(".section-timeline"),o=document.querySelector(".form-panel"),a=document.querySelector(".timeline-nav-wrapper");if(!r||!e||!n||!i||!s)return;fe.set(n,{opacity:0,pointerEvents:"none"});let l=!1;const c=T=>{if(!o)return!1;const R=o.getBoundingClientRect(),w=T.clientX,y=T.clientY;return w>=R.left&&w<=R.right&&y>=R.top&&y<=R.bottom};s.addEventListener("mouseenter",T=>{!l&&!c(T)&&fe.to(n,{opacity:1,pointerEvents:"auto",duration:.3,ease:"power2.out"})}),s.addEventListener("mouseleave",()=>{fe.to(n,{opacity:0,pointerEvents:"none",duration:.3,ease:"power2.out"}),l=!1}),n.addEventListener("mouseenter",T=>{c(T)||fe.to(i,{opacity:0,duration:.2,ease:"power2.out"})}),n.addEventListener("mouseleave",()=>{fe.to(i,{opacity:1,duration:.2,ease:"power2.out"})}),o&&a&&(o.addEventListener("mouseenter",()=>{fe.set(a,{pointerEvents:"none"})}),o.addEventListener("mouseleave",()=>{fe.set(a,{pointerEvents:"auto"})}));const u=n.querySelector(".anniversary"),d=n.querySelector(".get-involved"),f=n.querySelector(".events"),h=T=>{if(i.textContent===T)return;const R=fe.timeline();R.to(i,{opacity:0,duration:.18,onComplete:()=>{i.textContent=T}}),R.to(i,{opacity:1,duration:.24})},_=T=>{if(!T)return 0;T.offsetHeight;let R=0,w=T;for(;w;)R+=w.offsetTop,w=w.offsetParent;return R};u.addEventListener("click",T=>{T.preventDefault(),n.querySelectorAll("a").forEach(R=>R.classList.remove("active")),u.classList.add("active"),h("150 Years of ACS"),fe.to(n,{opacity:0,pointerEvents:"none",duration:.2,ease:"power2.out"}),l=!0,window.scrollTo({top:0,behavior:"smooth"})}),d.addEventListener("click",T=>{T.preventDefault(),n.querySelectorAll("a").forEach(R=>R.classList.remove("active")),d.classList.add("active"),h("Get Involved"),fe.to(n,{opacity:0,pointerEvents:"none",duration:.2,ease:"power2.out"}),l=!0,e&&setTimeout(()=>{const R=_(e);window.scrollTo({top:R,behavior:"smooth"})},50)}),f.addEventListener("click",T=>{T.preventDefault(),n.querySelectorAll("a").forEach(R=>R.classList.remove("active")),f.classList.add("active"),h("Events"),fe.to(n,{opacity:0,pointerEvents:"none",duration:.2,ease:"power2.out"}),l=!0,t&&setTimeout(()=>{const R=_(t);window.scrollTo({top:R,behavior:"smooth"})},50)});const g=[{id:"hero",element:r,title:"150 Years of ACS",link:u,top:0,bottom:0},{id:"getinvolved",element:e,title:"Get Involved",link:d,top:0,bottom:0},{id:"events",element:t,title:"Events",link:f,top:0,bottom:0}];function m(){if(g.forEach(T=>{T.element&&(T.top=_(T.element),T.bottom=T.top+T.element.offsetHeight)}),g[0].element&&e&&(g[0].bottom=_(e)),e&&t){const T=g.find(R=>R.id==="getinvolved");T&&(T.top=_(e),T.bottom=_(t))}}m();let p=null;function b(){requestAnimationFrame(()=>{const T=window.pageYOffset+window.innerHeight/2;let R=g[0];for(let w=g.length-1;w>=0;w--){const y=g[w];if(y.element&&T>=y.top&&T<y.bottom){R=y;break}}p!==R.id&&(p=R.id,n.querySelectorAll("a").forEach(w=>w.classList.remove("active")),R.link&&R.link.classList.add("active"),h(R.title))})}window.removeEventListener("scroll",b),window.addEventListener("scroll",b);const x=id(()=>{document.body.offsetHeight,m(),requestAnimationFrame(()=>{m(),b()})},150);window.addEventListener("resize",x),window.addEventListener("orientationchange",()=>{setTimeout(()=>{x()},300)});const v=()=>{m(),b()};v(),setTimeout(v,500),document.fonts&&document.fonts.ready&&document.fonts.ready.then(v);let E=!1;const M=()=>{E||(E=!0,m(),window.removeEventListener("scroll",M))};window.addEventListener("scroll",M)}function b3(){const r=document.querySelector(".share-button-pinned"),e=document.querySelector(".events-panel");if(!r||!e){console.warn("Share button or events panel not found for overlap detection");return}const t=()=>{const s=r.getBoundingClientRect(),o=e.getBoundingClientRect();!(s.right<o.left||s.left>o.right||s.bottom<o.top||s.top>o.bottom)?r.style.backgroundColor="rgba(20,181,0,0.75)":r.style.backgroundColor=""};let n=!1;const i=()=>{n||(requestAnimationFrame(()=>{t(),n=!1}),n=!0)};window.addEventListener("scroll",i),window.addEventListener("resize",i),t(),window.cleanupShareButtonOverlap=()=>{window.removeEventListener("scroll",i),window.removeEventListener("resize",i),r&&(r.style.backgroundColor="")}}function w3(){const r=document.querySelector(".share-button-pinned");if(!r){console.warn("Share button not found for share panel initialization");return}const e=document.createElement("div");e.className="share-panel",e.innerHTML=`
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
  `,document.body.appendChild(e),S3(r,e)}function S3(r,e){let t=!1;const n=()=>({url:window.location.href,title:"American Chemical Society - 150 Years of Innovation",description:"Join us in celebrating 150 years of advancing chemistry and chemical sciences. #ACS150",hashtags:"ACS150,Chemistry,Science,Innovation"}),i=(c,u)=>{const d={facebook:`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(u.url)}`,linkedin:`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(u.url)}`,instagram:"https://www.instagram.com/"};d[c]&&window.open(d[c],"_blank","width=600,height=400")},s=async c=>{try{return await navigator.clipboard.writeText(c),!0}catch(u){return console.error("Failed to copy text: ",u),!1}},o=c=>{const u=document.createElement("div");u.textContent=c,u.style.cssText=`
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
    `,document.head.appendChild(c)}}const M3="/150-lab/assets/images/pacifichem-event1.jpg",T3="/150-lab/assets/images/green-chemistry-event2.jpg",E3="/150-lab/assets/images/acs-spring-meeting-event3.jpg";function A3(){const r=document.querySelectorAll(".event-list-item");if(!r.length){console.warn("No .event-list-item elements found");return}const e=[M3,T3,E3];r.forEach((t,n)=>{const i=e[n];if(!i){console.warn(`No image mapped for event item ${n}`);return}const s=document.createElement("img");s.className="pinned-hover-image",s.src=i,s.style.cssText=`
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
    `,document.body.appendChild(s);const o=()=>{const l=t.getBoundingClientRect(),c=-20;s.style.left=l.right-200-c+"px",s.style.top=l.top+l.height/2+"px"};t.addEventListener("mouseenter",()=>{o(),s.style.opacity="1",s.style.transform="translateY(-50%) scale(1)",t.classList.add("active")}),t.addEventListener("mouseleave",()=>{s.style.opacity="0",s.style.transform="translateY(-50%) scale(0.9)",t.classList.remove("active")});const a=()=>{s.style.opacity!=="0"&&o()};window.addEventListener("scroll",a),window.addEventListener("resize",a)})}const gu=[],_u=[],gv=()=>new Promise(r=>{document.fonts&&document.fonts.ready?document.fonts.ready.then(()=>{r()}):setTimeout(r,100)}),_v=r=>new Promise(e=>{const t=r.closest("section")||r.parentNode;if(!t){e();return}const n=t.querySelectorAll("img");if(n.length===0){e();return}const i=setTimeout(e,2e3);let s=0,o=!0;if(n.forEach(a=>{a.complete||(o=!1)}),o){clearTimeout(i),e();return}n.forEach(a=>{a.complete?(s++,s===n.length&&(clearTimeout(i),e())):(a.addEventListener("load",()=>{s++,s===n.length&&(clearTimeout(i),e())}),a.addEventListener("error",()=>{s++,s===n.length&&(clearTimeout(i),e())}))})}),xv=(r,e)=>{const t=r.innerHTML;r.setAttribute("data-original-content",t),Promise.all([gv(),_v(r)]).then(()=>{r.offsetHeight;const n=(i=0)=>{const s=new Va(r,{types:"lines",lineClass:"split-line",absolute:!1,tagName:"div"});s.lines&&s.lines.length>0?(gu.push({element:r,splitText:s,originalContent:t}),fe.set(s.lines,{opacity:0,y:50}),Xe.create({trigger:r,start:"top 85%",once:!1,markers:!1,id:`split-lines-${e}`,onEnter:()=>{const a=e*200;fe.to(s.lines,{opacity:1,y:0,duration:1.2,stagger:.1,ease:"power2.out",delay:a/1e3,overwrite:!0})},onLeaveBack:()=>{fe.to(s.lines,{opacity:0,y:50,duration:.8,stagger:.05,ease:"power2.in",overwrite:!0})}})):i<3?(s&&typeof s.revert=="function"&&s.revert(),setTimeout(()=>{n(i+1)},300*(i+1))):(console.warn("SplitType failed to create lines properly after multiple attempts:",r),r.innerHTML=t)};n()})},vv=(r,e)=>{const t=r.innerHTML;r.setAttribute("data-original-content",t),Promise.all([gv(),_v(r)]).then(()=>{r.offsetHeight;const n=(i=0)=>{const s=new Va(r,{types:"chars",charClass:"split-char",absolute:!1,tagName:"span"});s.chars&&s.chars.length>0?(_u.push({element:r,splitText:s,originalContent:t}),fe.set(s.chars,{opacity:0,y:50,display:"inline-block"}),Xe.create({trigger:r,start:"top 85%",once:!1,markers:!1,id:`split-chars-${e}`,onEnter:()=>{fe.to(s.chars,{opacity:1,y:0,duration:1.2,stagger:.02,ease:"power2.out",overwrite:!0})},onLeaveBack:()=>{fe.to(s.chars,{opacity:0,y:50,duration:.8,stagger:.01,ease:"power2.in",overwrite:!0})}})):i<3?(s&&typeof s.revert=="function"&&s.revert(),setTimeout(()=>{n(i+1)},300*(i+1))):(console.warn("SplitType failed to create chars after multiple attempts:",r),r.innerHTML=t)};n()})};function Hh(r=null){const e=r||document.querySelectorAll(".split-lines");if(!e||e.length===0){console.warn("No .split-lines elements found or provided for initialization");return}e.forEach((t,n)=>{xv(t,n)})}function Gh(r=null){const e=r||document.querySelectorAll(".split-chars");if(!e||e.length===0){console.warn("No .split-chars elements found or provided for initialization");return}e.forEach((t,n)=>{vv(t,n)})}function yv(){gu.forEach(r=>{r.element&&r.originalContent&&(r.element.innerHTML=r.originalContent);const e=gu.indexOf(r);e>-1&&gu.splice(e,1)})}function C3(){yv(),setTimeout(()=>{document.querySelectorAll(".split-lines").forEach((e,t)=>{xv(e,t)})},100)}function bv(){_u.forEach(r=>{r.element&&r.originalContent&&(r.element.innerHTML=r.originalContent);const e=_u.indexOf(r);e>-1&&_u.splice(e,1)})}function R3(){bv(),setTimeout(()=>{document.querySelectorAll(".split-chars").forEach((e,t)=>{vv(e,t)})},100)}window.cleanupSplitLines=yv;window.refreshSplitLines=C3;window.cleanupSplitChars=bv;window.refreshSplitChars=R3;function Rg(){typeof window.cleanupSplitLines=="function"&&window.cleanupSplitLines(),typeof window.cleanupSplitChars=="function"&&window.cleanupSplitChars();const r=document.querySelector("#hero-area h1");if(r){let n=0;if(Ot.heroHeadingFadeScrollTrigger&&Ot.heroHeadingFadeScrollTrigger.animation){n=Ot.heroHeadingFadeScrollTrigger.progress;const i=r.querySelectorAll(".char");if(i.length>0){const s=fe.timeline({paused:!0});s.to(i,{opacity:0,z:-50,stagger:.02,ease:"power1.in"},0),s.progress(n)}}if(Ot.heroHeadingFadeScrollTrigger&&(Ot.heroHeadingFadeScrollTrigger.kill(),Ot.heroHeadingFadeScrollTrigger=null),!r.querySelector(".char")){const i=r.getAttribute("data-original-content")||r.textContent;r.innerHTML=i}}const e=Array.from(document.querySelectorAll(".split-lines")).filter(n=>!n.closest("#hero-area")),t=Array.from(document.querySelectorAll(".split-chars")).filter(n=>!n.closest("#hero-area"));e.forEach(n=>{const i=n.getAttribute("data-original-content");i&&(n.innerHTML=i)}),t.forEach(n=>{const i=n.getAttribute("data-original-content");i&&(n.innerHTML=i)}),setTimeout(()=>{e.length&&typeof Hh=="function"&&Hh(e),t.length&&typeof Gh=="function"&&Gh(t),typeof Vh=="function"&&Vh(),Xe.refresh()},50)}function P3(){window.globalResizeHandler&&window.removeEventListener("resize",window.globalResizeHandler),window.globalResizeHandler=id(()=>{Rg()},250),window.addEventListener("resize",window.globalResizeHandler),window.addEventListener("orientationchange",()=>{Rg()})}fe.registerPlugin(Xe);fe.registerPlugin(la);fe.registerPlugin(Va);window.gsap=fe;const L3=new Date("2026-04-06T00:00:00").getTime();function D3(){const r=window.location.href.toLowerCase(),e=window.location.pathname.toLowerCase();return r.includes("/editor.html/")||r.includes("globe.html")?(console.log("Not on main page"),!1):r.includes("index.html")||r.includes("acs.org/150")||r.includes("localhost:5173")||r.includes("192.168")||r.includes("cmswwwdev.acs.org/150")||r.includes("adobeaemcloud.com")&&e.includes("/150")||r.includes("awolfe-acs.github.io/150-lab")&&(e==="/150-lab/"||e==="/150-lab/index.html")||r.includes("github.io/150-lab")&&(e==="/150-lab/"||e==="/150-lab/index.html")}function I3(){W2(),Xe.refresh(),Xe.clearMatchMedia(),U2(),Z2(),J2(),Q2(),Vh(),e3(),t3(),i3(),n3(),r3(),s3(),h3(),y3(),v3(),X2(),q2(),b3(),w3(),A3(),Hh(null),Gh(null),P3();const r=document.querySelector("button.toggle-menu");r&&r.addEventListener("click",()=>{const n=document.querySelector("nav"),i=document.querySelector("header");n&&n.classList.toggle("active"),i&&i.classList.toggle("nav-active")});let e=0;window.addEventListener("scroll",()=>{const n=window.scrollY,i=document.querySelector("header.anniversary");i&&(n>e?i.classList.remove("active"):i.classList.add("active")),e=n});const t=document.querySelector("button.close-toggle-menu");t&&t.addEventListener("click",()=>{const n=document.querySelector("nav"),i=document.querySelector("header");n&&n.classList.remove("active"),i&&i.classList.remove("nav-active")})}history.scrollRestoration&&(history.scrollRestoration="manual");window.scrollTo(0,0);window.addEventListener("beforeunload",()=>{window.scrollTo(0,0),sessionStorage.setItem("scrollToTop","true")});window.addEventListener("load",()=>{window.scrollTo({top:0,left:0,behavior:"instant"}),setTimeout(()=>{window.scrollTo(0,0)},10)});document.addEventListener("DOMContentLoaded",()=>{window.scrollTo(0,0);const r=xs.detect(),e=xs.getSettings();console.log("[Main] AEM Mode:",r),console.log("[Main] Settings:",e),e.showStaticBackground&&xs.applyStaticBackground(),e.showPlaceholderMessage&&xs.showPlaceholderMessage();const t=/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)||window.innerWidth<=768||"ontouchstart"in window;window.lenis=new Ov({autoRaf:!0,infinite:!1,syncTouch:!0,smoothWheel:!0,touchInertiaMultiplier:35,duration:1.2,easing:i=>Math.min(1,1.001-Math.pow(2,-10*i))}),console.log(t?"Mobile device detected - optimizing for touch":"Desktop device detected"),window.lenis.on("scroll",i=>{}),t&&(document.addEventListener("touchstart",function(i){},{passive:!0}),document.addEventListener("touchmove",function(i){Math.abs(i.touches[0].clientX-i.touches[0].clientY)>Math.abs(i.touches[0].clientY-i.touches[0].clientX)},{passive:!1}),window.addEventListener("resize",()=>{window.lenis&&window.lenis.resize()})),mC(L3),e.enableBackground?setTimeout(async()=>{try{await E_(),console.log("[Main] Shader background initialized successfully")}catch(i){console.error("Failed to initialize shader background:",i),console.warn("Continuing without shader background..."),xs.applyStaticBackground()}},100):console.log("[Main] Skipping shader background (AEM mode or fallback)"),D3()?(j2(),e.enableAnimations?(I3(),console.log("[Main] Animations initialized")):console.log("[Main] Skipping animations (AEM fallback mode)"),e.enableVideo?(eA(),console.log("[Main] Video initialized")):console.log("[Main] Skipping video (AEM fallback mode)")):console.log("Running in lightweight mode - animations and video disabled"),setTimeout(()=>{window.scrollTo(0,0),window.lenis.scrollTo(0,{immediate:!0})},100)});
