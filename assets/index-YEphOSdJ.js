
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

var tv=Object.defineProperty;var nv=(r,e,t)=>e in r?tv(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t;var nt=(r,e,t)=>nv(r,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function t(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(i){if(i.ep)return;i.ep=!0;const s=t(i);fetch(i.href,s)}})();var iv="1.3.13";function ug(r,e,t){return Math.max(r,Math.min(e,t))}function rv(r,e,t){return(1-t)*r+t*e}function sv(r,e,t,n){return rv(r,e,1-Math.exp(-t*n))}function ov(r,e){return(r%e+e)%e}var av=class{constructor(){nt(this,"isRunning",!1);nt(this,"value",0);nt(this,"from",0);nt(this,"to",0);nt(this,"currentTime",0);nt(this,"lerp");nt(this,"duration");nt(this,"easing");nt(this,"onUpdate")}advance(r){var t;if(!this.isRunning)return;let e=!1;if(this.duration&&this.easing){this.currentTime+=r;const n=ug(0,this.currentTime/this.duration,1);e=n>=1;const i=e?1:this.easing(n);this.value=this.from+(this.to-this.from)*i}else this.lerp?(this.value=sv(this.value,this.to,this.lerp*60,r),Math.round(this.value)===this.to&&(this.value=this.to,e=!0)):(this.value=this.to,e=!0);e&&this.stop(),(t=this.onUpdate)==null||t.call(this,this.value,e)}stop(){this.isRunning=!1}fromTo(r,e,{lerp:t,duration:n,easing:i,onStart:s,onUpdate:o}){this.from=this.value=r,this.to=e,this.lerp=t,this.duration=n,this.easing=i,this.currentTime=0,this.isRunning=!0,s==null||s(),this.onUpdate=o}};function lv(r,e){let t;return function(...n){let i=this;clearTimeout(t),t=setTimeout(()=>{t=void 0,r.apply(i,n)},e)}}var cv=class{constructor(r,e,{autoResize:t=!0,debounce:n=250}={}){nt(this,"width",0);nt(this,"height",0);nt(this,"scrollHeight",0);nt(this,"scrollWidth",0);nt(this,"debouncedResize");nt(this,"wrapperResizeObserver");nt(this,"contentResizeObserver");nt(this,"resize",()=>{this.onWrapperResize(),this.onContentResize()});nt(this,"onWrapperResize",()=>{this.wrapper instanceof Window?(this.width=window.innerWidth,this.height=window.innerHeight):(this.width=this.wrapper.clientWidth,this.height=this.wrapper.clientHeight)});nt(this,"onContentResize",()=>{this.wrapper instanceof Window?(this.scrollHeight=this.content.scrollHeight,this.scrollWidth=this.content.scrollWidth):(this.scrollHeight=this.wrapper.scrollHeight,this.scrollWidth=this.wrapper.scrollWidth)});this.wrapper=r,this.content=e,t&&(this.debouncedResize=lv(this.resize,n),this.wrapper instanceof Window?window.addEventListener("resize",this.debouncedResize,!1):(this.wrapperResizeObserver=new ResizeObserver(this.debouncedResize),this.wrapperResizeObserver.observe(this.wrapper)),this.contentResizeObserver=new ResizeObserver(this.debouncedResize),this.contentResizeObserver.observe(this.content)),this.resize()}destroy(){var r,e;(r=this.wrapperResizeObserver)==null||r.disconnect(),(e=this.contentResizeObserver)==null||e.disconnect(),this.wrapper===window&&this.debouncedResize&&window.removeEventListener("resize",this.debouncedResize,!1)}get limit(){return{x:this.scrollWidth-this.width,y:this.scrollHeight-this.height}}},dg=class{constructor(){nt(this,"events",{})}emit(r,...e){var n;let t=this.events[r]||[];for(let i=0,s=t.length;i<s;i++)(n=t[i])==null||n.call(t,...e)}on(r,e){var t;return(t=this.events[r])!=null&&t.push(e)||(this.events[r]=[e]),()=>{var n;this.events[r]=(n=this.events[r])==null?void 0:n.filter(i=>e!==i)}}off(r,e){var t;this.events[r]=(t=this.events[r])==null?void 0:t.filter(n=>e!==n)}destroy(){this.events={}}},Ep=100/6,Jr={passive:!1},uv=class{constructor(r,e={wheelMultiplier:1,touchMultiplier:1}){nt(this,"touchStart",{x:0,y:0});nt(this,"lastDelta",{x:0,y:0});nt(this,"window",{width:0,height:0});nt(this,"emitter",new dg);nt(this,"onTouchStart",r=>{const{clientX:e,clientY:t}=r.targetTouches?r.targetTouches[0]:r;this.touchStart.x=e,this.touchStart.y=t,this.lastDelta={x:0,y:0},this.emitter.emit("scroll",{deltaX:0,deltaY:0,event:r})});nt(this,"onTouchMove",r=>{const{clientX:e,clientY:t}=r.targetTouches?r.targetTouches[0]:r,n=-(e-this.touchStart.x)*this.options.touchMultiplier,i=-(t-this.touchStart.y)*this.options.touchMultiplier;this.touchStart.x=e,this.touchStart.y=t,this.lastDelta={x:n,y:i},this.emitter.emit("scroll",{deltaX:n,deltaY:i,event:r})});nt(this,"onTouchEnd",r=>{this.emitter.emit("scroll",{deltaX:this.lastDelta.x,deltaY:this.lastDelta.y,event:r})});nt(this,"onWheel",r=>{let{deltaX:e,deltaY:t,deltaMode:n}=r;const i=n===1?Ep:n===2?this.window.width:1,s=n===1?Ep:n===2?this.window.height:1;e*=i,t*=s,e*=this.options.wheelMultiplier,t*=this.options.wheelMultiplier,this.emitter.emit("scroll",{deltaX:e,deltaY:t,event:r})});nt(this,"onWindowResize",()=>{this.window={width:window.innerWidth,height:window.innerHeight}});this.element=r,this.options=e,window.addEventListener("resize",this.onWindowResize,!1),this.onWindowResize(),this.element.addEventListener("wheel",this.onWheel,Jr),this.element.addEventListener("touchstart",this.onTouchStart,Jr),this.element.addEventListener("touchmove",this.onTouchMove,Jr),this.element.addEventListener("touchend",this.onTouchEnd,Jr)}on(r,e){return this.emitter.on(r,e)}destroy(){this.emitter.destroy(),window.removeEventListener("resize",this.onWindowResize,!1),this.element.removeEventListener("wheel",this.onWheel,Jr),this.element.removeEventListener("touchstart",this.onTouchStart,Jr),this.element.removeEventListener("touchmove",this.onTouchMove,Jr),this.element.removeEventListener("touchend",this.onTouchEnd,Jr)}},Ap=r=>Math.min(1,1.001-Math.pow(2,-10*r)),dv=class{constructor({wrapper:r=window,content:e=document.documentElement,eventsTarget:t=r,smoothWheel:n=!0,syncTouch:i=!1,syncTouchLerp:s=.075,touchInertiaExponent:o=1.7,duration:a,easing:l,lerp:c=.1,infinite:u=!1,orientation:d="vertical",gestureOrientation:f=d==="horizontal"?"both":"vertical",touchMultiplier:h=1,wheelMultiplier:_=1,autoResize:g=!0,prevent:m,virtualScroll:p,overscroll:y=!0,autoRaf:v=!1,anchors:x=!1,autoToggle:E=!1,allowNestedScroll:b=!1,__experimental__naiveDimensions:S=!1}={}){nt(this,"_isScrolling",!1);nt(this,"_isStopped",!1);nt(this,"_isLocked",!1);nt(this,"_preventNextNativeScrollEvent",!1);nt(this,"_resetVelocityTimeout",null);nt(this,"__rafID",null);nt(this,"isTouching");nt(this,"time",0);nt(this,"userData",{});nt(this,"lastVelocity",0);nt(this,"velocity",0);nt(this,"direction",0);nt(this,"options");nt(this,"targetScroll");nt(this,"animatedScroll");nt(this,"animate",new av);nt(this,"emitter",new dg);nt(this,"dimensions");nt(this,"virtualScroll");nt(this,"onScrollEnd",r=>{r instanceof CustomEvent||(this.isScrolling==="smooth"||this.isScrolling===!1)&&r.stopPropagation()});nt(this,"dispatchScrollendEvent",()=>{this.options.wrapper.dispatchEvent(new CustomEvent("scrollend",{bubbles:this.options.wrapper===window,detail:{lenisScrollEnd:!0}}))});nt(this,"onTransitionEnd",r=>{if(r.propertyName.includes("overflow")){const e=this.isHorizontal?"overflow-x":"overflow-y",t=getComputedStyle(this.rootElement)[e];["hidden","clip"].includes(t)?this.internalStop():this.internalStart()}});nt(this,"onClick",r=>{const t=r.composedPath().find(n=>{var i;return n instanceof HTMLAnchorElement&&((i=n.getAttribute("href"))==null?void 0:i.includes("#"))});if(t){const n=t.getAttribute("href");if(n){const i=typeof this.options.anchors=="object"&&this.options.anchors?this.options.anchors:void 0,s=`#${n.split("#")[1]}`;this.scrollTo(s,i)}}});nt(this,"onPointerDown",r=>{r.button===1&&this.reset()});nt(this,"onVirtualScroll",r=>{if(typeof this.options.virtualScroll=="function"&&this.options.virtualScroll(r)===!1)return;const{deltaX:e,deltaY:t,event:n}=r;if(this.emitter.emit("virtual-scroll",{deltaX:e,deltaY:t,event:n}),n.ctrlKey||n.lenisStopPropagation)return;const i=n.type.includes("touch"),s=n.type.includes("wheel");this.isTouching=n.type==="touchstart"||n.type==="touchmove";const o=e===0&&t===0;if(this.options.syncTouch&&i&&n.type==="touchstart"&&o&&!this.isStopped&&!this.isLocked){this.reset();return}const l=this.options.gestureOrientation==="vertical"&&t===0||this.options.gestureOrientation==="horizontal"&&e===0;if(o||l)return;let c=n.composedPath();c=c.slice(0,c.indexOf(this.rootElement));const u=this.options.prevent;if(c.find(m=>{var p,y,v;return m instanceof HTMLElement&&(typeof u=="function"&&(u==null?void 0:u(m))||((p=m.hasAttribute)==null?void 0:p.call(m,"data-lenis-prevent"))||i&&((y=m.hasAttribute)==null?void 0:y.call(m,"data-lenis-prevent-touch"))||s&&((v=m.hasAttribute)==null?void 0:v.call(m,"data-lenis-prevent-wheel"))||this.options.allowNestedScroll&&this.checkNestedScroll(m,{deltaX:e,deltaY:t}))}))return;if(this.isStopped||this.isLocked){n.cancelable&&n.preventDefault();return}if(!(this.options.syncTouch&&i||this.options.smoothWheel&&s)){this.isScrolling="native",this.animate.stop(),n.lenisStopPropagation=!0;return}let f=t;this.options.gestureOrientation==="both"?f=Math.abs(t)>Math.abs(e)?t:e:this.options.gestureOrientation==="horizontal"&&(f=e),(!this.options.overscroll||this.options.infinite||this.options.wrapper!==window&&this.limit>0&&(this.animatedScroll>0&&this.animatedScroll<this.limit||this.animatedScroll===0&&t>0||this.animatedScroll===this.limit&&t<0))&&(n.lenisStopPropagation=!0),n.cancelable&&n.preventDefault();const h=i&&this.options.syncTouch,g=i&&n.type==="touchend";g&&(f=Math.sign(this.velocity)*Math.pow(Math.abs(this.velocity),this.options.touchInertiaExponent)),this.scrollTo(this.targetScroll+f,{programmatic:!1,...h?{lerp:g?this.options.syncTouchLerp:1}:{lerp:this.options.lerp,duration:this.options.duration,easing:this.options.easing}})});nt(this,"onNativeScroll",()=>{if(this._resetVelocityTimeout!==null&&(clearTimeout(this._resetVelocityTimeout),this._resetVelocityTimeout=null),this._preventNextNativeScrollEvent){this._preventNextNativeScrollEvent=!1;return}if(this.isScrolling===!1||this.isScrolling==="native"){const r=this.animatedScroll;this.animatedScroll=this.targetScroll=this.actualScroll,this.lastVelocity=this.velocity,this.velocity=this.animatedScroll-r,this.direction=Math.sign(this.animatedScroll-r),this.isStopped||(this.isScrolling="native"),this.emit(),this.velocity!==0&&(this._resetVelocityTimeout=setTimeout(()=>{this.lastVelocity=this.velocity,this.velocity=0,this.isScrolling=!1,this.emit()},400))}});nt(this,"raf",r=>{const e=r-(this.time||r);this.time=r,this.animate.advance(e*.001),this.options.autoRaf&&(this.__rafID=requestAnimationFrame(this.raf))});window.lenisVersion=iv,(!r||r===document.documentElement)&&(r=window),typeof a=="number"&&typeof l!="function"?l=Ap:typeof l=="function"&&typeof a!="number"&&(a=1),this.options={wrapper:r,content:e,eventsTarget:t,smoothWheel:n,syncTouch:i,syncTouchLerp:s,touchInertiaExponent:o,duration:a,easing:l,lerp:c,infinite:u,gestureOrientation:f,orientation:d,touchMultiplier:h,wheelMultiplier:_,autoResize:g,prevent:m,virtualScroll:p,overscroll:y,autoRaf:v,anchors:x,autoToggle:E,allowNestedScroll:b,__experimental__naiveDimensions:S},this.dimensions=new cv(r,e,{autoResize:g}),this.updateClassName(),this.targetScroll=this.animatedScroll=this.actualScroll,this.options.wrapper.addEventListener("scroll",this.onNativeScroll,!1),this.options.wrapper.addEventListener("scrollend",this.onScrollEnd,{capture:!0}),this.options.anchors&&this.options.wrapper===window&&this.options.wrapper.addEventListener("click",this.onClick,!1),this.options.wrapper.addEventListener("pointerdown",this.onPointerDown,!1),this.virtualScroll=new uv(t,{touchMultiplier:h,wheelMultiplier:_}),this.virtualScroll.on("scroll",this.onVirtualScroll),this.options.autoToggle&&this.rootElement.addEventListener("transitionend",this.onTransitionEnd,{passive:!0}),this.options.autoRaf&&(this.__rafID=requestAnimationFrame(this.raf))}destroy(){this.emitter.destroy(),this.options.wrapper.removeEventListener("scroll",this.onNativeScroll,!1),this.options.wrapper.removeEventListener("scrollend",this.onScrollEnd,{capture:!0}),this.options.wrapper.removeEventListener("pointerdown",this.onPointerDown,!1),this.options.anchors&&this.options.wrapper===window&&this.options.wrapper.removeEventListener("click",this.onClick,!1),this.virtualScroll.destroy(),this.dimensions.destroy(),this.cleanUpClassName(),this.__rafID&&cancelAnimationFrame(this.__rafID)}on(r,e){return this.emitter.on(r,e)}off(r,e){return this.emitter.off(r,e)}setScroll(r){this.isHorizontal?this.options.wrapper.scrollTo({left:r,behavior:"instant"}):this.options.wrapper.scrollTo({top:r,behavior:"instant"})}resize(){this.dimensions.resize(),this.animatedScroll=this.targetScroll=this.actualScroll,this.emit()}emit(){this.emitter.emit("scroll",this)}reset(){this.isLocked=!1,this.isScrolling=!1,this.animatedScroll=this.targetScroll=this.actualScroll,this.lastVelocity=this.velocity=0,this.animate.stop()}start(){if(this.isStopped){if(this.options.autoToggle){this.rootElement.style.removeProperty("overflow");return}this.internalStart()}}internalStart(){this.isStopped&&(this.reset(),this.isStopped=!1,this.emit())}stop(){if(!this.isStopped){if(this.options.autoToggle){this.rootElement.style.setProperty("overflow","clip");return}this.internalStop()}}internalStop(){this.isStopped||(this.reset(),this.isStopped=!0,this.emit())}scrollTo(r,{offset:e=0,immediate:t=!1,lock:n=!1,duration:i=this.options.duration,easing:s=this.options.easing,lerp:o=this.options.lerp,onStart:a,onComplete:l,force:c=!1,programmatic:u=!0,userData:d}={}){if(!((this.isStopped||this.isLocked)&&!c)){if(typeof r=="string"&&["top","left","start","#"].includes(r))r=0;else if(typeof r=="string"&&["bottom","right","end"].includes(r))r=this.limit;else{let f;if(typeof r=="string"?(f=document.querySelector(r),f||(r==="#top"?r=0:console.warn("Lenis: Target not found",r))):r instanceof HTMLElement&&(r!=null&&r.nodeType)&&(f=r),f){if(this.options.wrapper!==window){const _=this.rootElement.getBoundingClientRect();e-=this.isHorizontal?_.left:_.top}const h=f.getBoundingClientRect();r=(this.isHorizontal?h.left:h.top)+this.animatedScroll}}if(typeof r=="number"){if(r+=e,r=Math.round(r),this.options.infinite){if(u){this.targetScroll=this.animatedScroll=this.scroll;const f=r-this.animatedScroll;f>this.limit/2?r=r-this.limit:f<-this.limit/2&&(r=r+this.limit)}}else r=ug(0,r,this.limit);if(r===this.targetScroll){a==null||a(this),l==null||l(this);return}if(this.userData=d??{},t){this.animatedScroll=this.targetScroll=r,this.setScroll(this.scroll),this.reset(),this.preventNextNativeScrollEvent(),this.emit(),l==null||l(this),this.userData={},requestAnimationFrame(()=>{this.dispatchScrollendEvent()});return}u||(this.targetScroll=r),typeof i=="number"&&typeof s!="function"?s=Ap:typeof s=="function"&&typeof i!="number"&&(i=1),this.animate.fromTo(this.animatedScroll,r,{duration:i,easing:s,lerp:o,onStart:()=>{n&&(this.isLocked=!0),this.isScrolling="smooth",a==null||a(this)},onUpdate:(f,h)=>{this.isScrolling="smooth",this.lastVelocity=this.velocity,this.velocity=f-this.animatedScroll,this.direction=Math.sign(this.velocity),this.animatedScroll=f,this.setScroll(this.scroll),u&&(this.targetScroll=f),h||this.emit(),h&&(this.reset(),this.emit(),l==null||l(this),this.userData={},requestAnimationFrame(()=>{this.dispatchScrollendEvent()}),this.preventNextNativeScrollEvent())}})}}}preventNextNativeScrollEvent(){this._preventNextNativeScrollEvent=!0,requestAnimationFrame(()=>{this._preventNextNativeScrollEvent=!1})}checkNestedScroll(r,{deltaX:e,deltaY:t}){const n=Date.now(),i=r._lenis??(r._lenis={});let s,o,a,l,c,u,d,f;const h=this.options.gestureOrientation;if(n-(i.time??0)>2e3){i.time=Date.now();const E=window.getComputedStyle(r);i.computedStyle=E;const b=E.overflowX,S=E.overflowY;if(s=["auto","overlay","scroll"].includes(b),o=["auto","overlay","scroll"].includes(S),i.hasOverflowX=s,i.hasOverflowY=o,!s&&!o||h==="vertical"&&!o||h==="horizontal"&&!s)return!1;c=r.scrollWidth,u=r.scrollHeight,d=r.clientWidth,f=r.clientHeight,a=c>d,l=u>f,i.isScrollableX=a,i.isScrollableY=l,i.scrollWidth=c,i.scrollHeight=u,i.clientWidth=d,i.clientHeight=f}else a=i.isScrollableX,l=i.isScrollableY,s=i.hasOverflowX,o=i.hasOverflowY,c=i.scrollWidth,u=i.scrollHeight,d=i.clientWidth,f=i.clientHeight;if(!s&&!o||!a&&!l||h==="vertical"&&(!o||!l)||h==="horizontal"&&(!s||!a))return!1;let _;if(h==="horizontal")_="x";else if(h==="vertical")_="y";else{const E=e!==0,b=t!==0;E&&s&&a&&(_="x"),b&&o&&l&&(_="y")}if(!_)return!1;let g,m,p,y,v;if(_==="x")g=r.scrollLeft,m=c-d,p=e,y=s,v=a;else if(_==="y")g=r.scrollTop,m=u-f,p=t,y=o,v=l;else return!1;return(p>0?g<m:g>0)&&y&&v}get rootElement(){return this.options.wrapper===window?document.documentElement:this.options.wrapper}get limit(){return this.options.__experimental__naiveDimensions?this.isHorizontal?this.rootElement.scrollWidth-this.rootElement.clientWidth:this.rootElement.scrollHeight-this.rootElement.clientHeight:this.dimensions.limit[this.isHorizontal?"x":"y"]}get isHorizontal(){return this.options.orientation==="horizontal"}get actualScroll(){const r=this.options.wrapper;return this.isHorizontal?r.scrollX??r.scrollLeft:r.scrollY??r.scrollTop}get scroll(){return this.options.infinite?ov(this.animatedScroll,this.limit):this.animatedScroll}get progress(){return this.limit===0?1:this.scroll/this.limit}get isScrolling(){return this._isScrolling}set isScrolling(r){this._isScrolling!==r&&(this._isScrolling=r,this.updateClassName())}get isStopped(){return this._isStopped}set isStopped(r){this._isStopped!==r&&(this._isStopped=r,this.updateClassName())}get isLocked(){return this._isLocked}set isLocked(r){this._isLocked!==r&&(this._isLocked=r,this.updateClassName())}get isSmooth(){return this.isScrolling==="smooth"}get className(){let r="lenis";return this.options.autoToggle&&(r+=" lenis-autoToggle"),this.isStopped&&(r+=" lenis-stopped"),this.isLocked&&(r+=" lenis-locked"),this.isScrolling&&(r+=" lenis-scrolling"),this.isScrolling==="smooth"&&(r+=" lenis-smooth"),r}updateClassName(){this.cleanUpClassName(),this.rootElement.className=`${this.rootElement.className} ${this.className}`.trim()}cleanUpClassName(){this.rootElement.className=this.rootElement.className.replace(/lenis(-\w+)?/g,"").trim()}};/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Ah="181",fv=0,Cp=1,hv=2,fg=1,pv=2,Dr=3,qr=0,li=1,Fi=2,Hr=0,_s=1,ru=2,Rp=3,Pp=4,mv=5,qs=100,gv=101,_v=102,xv=103,vv=104,yv=200,bv=201,Sv=202,wv=203,Yd=204,jd=205,Mv=206,Tv=207,Ev=208,Av=209,Cv=210,Rv=211,Pv=212,Lv=213,Dv=214,$d=0,Kd=1,Zd=2,ca=3,Jd=4,Qd=5,ef=6,tf=7,hg=0,Iv=1,Ov=2,xs=0,Nv=1,Fv=2,Uv=3,kv=4,Bv=5,zv=6,Vv=7,Lp="attached",Hv="detached",pg=300,ua=301,da=302,nf=303,rf=304,Cu=306,fa=1e3,dr=1001,su=1002,si=1003,mg=1004,Ya=1005,ri=1006,Vc=1007,Ur=1008,vr=1009,gg=1010,_g=1011,Tl=1012,Ch=1013,lo=1014,Ki=1015,Ta=1016,Rh=1017,Ph=1018,El=1020,xg=35902,vg=35899,yg=1021,bg=1022,Ui=1023,Al=1026,Cl=1027,Lh=1028,Dh=1029,Ih=1030,Oh=1031,Nh=1033,Hc=33776,Gc=33777,Wc=33778,Xc=33779,sf=35840,of=35841,af=35842,lf=35843,cf=36196,uf=37492,df=37496,ff=37808,hf=37809,pf=37810,mf=37811,gf=37812,_f=37813,xf=37814,vf=37815,yf=37816,bf=37817,Sf=37818,wf=37819,Mf=37820,Tf=37821,Ef=36492,Af=36494,Cf=36495,Rf=36283,Pf=36284,Lf=36285,Df=36286,Rl=2300,Pl=2301,Gu=2302,Dp=2400,Ip=2401,Op=2402,Gv=2500,Wv=0,Sg=1,If=2,Xv=3200,qv=3201,wg=0,Yv=1,ls="",Sn="srgb",Yn="srgb-linear",ou="linear",jt="srgb",wo=7680,Np=519,jv=512,$v=513,Kv=514,Mg=515,Zv=516,Jv=517,Qv=518,ey=519,Of=35044,Fp="300 es",fr=2e3,au=2001;function Tg(r){for(let e=r.length-1;e>=0;--e)if(r[e]>=65535)return!0;return!1}function Ll(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function ty(){const r=Ll("canvas");return r.style.display="block",r}const Up={};function lu(...r){const e="THREE."+r.shift();console.log(e,...r)}function lt(...r){const e="THREE."+r.shift();console.warn(e,...r)}function Et(...r){const e="THREE."+r.shift();console.error(e,...r)}function Dl(...r){const e=r.join(" ");e in Up||(Up[e]=!0,lt(...r))}function ny(r,e,t){return new Promise(function(n,i){function s(){switch(r.clientWaitSync(e,r.SYNC_FLUSH_COMMANDS_BIT,0)){case r.WAIT_FAILED:i();break;case r.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:n()}}setTimeout(s,t)})}class Ea{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){const n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){const n=this._listeners;if(n===void 0)return;const i=n[e];if(i!==void 0){const s=i.indexOf(t);s!==-1&&i.splice(s,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const n=t[e.type];if(n!==void 0){e.target=this;const i=n.slice(0);for(let s=0,o=i.length;s<o;s++)i[s].call(this,e);e.target=null}}}const zn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let kp=1234567;const ol=Math.PI/180,ha=180/Math.PI;function Zi(){const r=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(zn[r&255]+zn[r>>8&255]+zn[r>>16&255]+zn[r>>24&255]+"-"+zn[e&255]+zn[e>>8&255]+"-"+zn[e>>16&15|64]+zn[e>>24&255]+"-"+zn[t&63|128]+zn[t>>8&255]+"-"+zn[t>>16&255]+zn[t>>24&255]+zn[n&255]+zn[n>>8&255]+zn[n>>16&255]+zn[n>>24&255]).toLowerCase()}function At(r,e,t){return Math.max(e,Math.min(t,r))}function Fh(r,e){return(r%e+e)%e}function iy(r,e,t,n,i){return n+(r-e)*(i-n)/(t-e)}function ry(r,e,t){return r!==e?(t-r)/(e-r):0}function al(r,e,t){return(1-t)*r+t*e}function sy(r,e,t,n){return al(r,e,1-Math.exp(-t*n))}function oy(r,e=1){return e-Math.abs(Fh(r,e*2)-e)}function ay(r,e,t){return r<=e?0:r>=t?1:(r=(r-e)/(t-e),r*r*(3-2*r))}function ly(r,e,t){return r<=e?0:r>=t?1:(r=(r-e)/(t-e),r*r*r*(r*(r*6-15)+10))}function cy(r,e){return r+Math.floor(Math.random()*(e-r+1))}function uy(r,e){return r+Math.random()*(e-r)}function dy(r){return r*(.5-Math.random())}function fy(r){r!==void 0&&(kp=r);let e=kp+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function hy(r){return r*ol}function py(r){return r*ha}function my(r){return(r&r-1)===0&&r!==0}function gy(r){return Math.pow(2,Math.ceil(Math.log(r)/Math.LN2))}function _y(r){return Math.pow(2,Math.floor(Math.log(r)/Math.LN2))}function xy(r,e,t,n,i){const s=Math.cos,o=Math.sin,a=s(t/2),l=o(t/2),c=s((e+n)/2),u=o((e+n)/2),d=s((e-n)/2),f=o((e-n)/2),h=s((n-e)/2),_=o((n-e)/2);switch(i){case"XYX":r.set(a*u,l*d,l*f,a*c);break;case"YZY":r.set(l*f,a*u,l*d,a*c);break;case"ZXZ":r.set(l*d,l*f,a*u,a*c);break;case"XZX":r.set(a*u,l*_,l*h,a*c);break;case"YXY":r.set(l*h,a*u,l*_,a*c);break;case"ZYZ":r.set(l*_,l*h,a*u,a*c);break;default:lt("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function Yi(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return r/4294967295;case Uint16Array:return r/65535;case Uint8Array:return r/255;case Int32Array:return Math.max(r/2147483647,-1);case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:throw new Error("Invalid component type.")}}function qt(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return Math.round(r*4294967295);case Uint16Array:return Math.round(r*65535);case Uint8Array:return Math.round(r*255);case Int32Array:return Math.round(r*2147483647);case Int16Array:return Math.round(r*32767);case Int8Array:return Math.round(r*127);default:throw new Error("Invalid component type.")}}const vy={DEG2RAD:ol,RAD2DEG:ha,generateUUID:Zi,clamp:At,euclideanModulo:Fh,mapLinear:iy,inverseLerp:ry,lerp:al,damp:sy,pingpong:oy,smoothstep:ay,smootherstep:ly,randInt:cy,randFloat:uy,randFloatSpread:dy,seededRandom:fy,degToRad:hy,radToDeg:py,isPowerOfTwo:my,ceilPowerOfTwo:gy,floorPowerOfTwo:_y,setQuaternionFromProperEuler:xy,normalize:qt,denormalize:Yi};class Rt{constructor(e=0,t=0){Rt.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6],this.y=i[1]*t+i[4]*n+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=At(this.x,e.x,t.x),this.y=At(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=At(this.x,e,t),this.y=At(this.y,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(At(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(At(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),i=Math.sin(t),s=this.x-e.x,o=this.y-e.y;return this.x=s*n-o*i+e.x,this.y=s*i+o*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class As{constructor(e=0,t=0,n=0,i=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=i}static slerpFlat(e,t,n,i,s,o,a){let l=n[i+0],c=n[i+1],u=n[i+2],d=n[i+3],f=s[o+0],h=s[o+1],_=s[o+2],g=s[o+3];if(a<=0){e[t+0]=l,e[t+1]=c,e[t+2]=u,e[t+3]=d;return}if(a>=1){e[t+0]=f,e[t+1]=h,e[t+2]=_,e[t+3]=g;return}if(d!==g||l!==f||c!==h||u!==_){let m=l*f+c*h+u*_+d*g;m<0&&(f=-f,h=-h,_=-_,g=-g,m=-m);let p=1-a;if(m<.9995){const y=Math.acos(m),v=Math.sin(y);p=Math.sin(p*y)/v,a=Math.sin(a*y)/v,l=l*p+f*a,c=c*p+h*a,u=u*p+_*a,d=d*p+g*a}else{l=l*p+f*a,c=c*p+h*a,u=u*p+_*a,d=d*p+g*a;const y=1/Math.sqrt(l*l+c*c+u*u+d*d);l*=y,c*=y,u*=y,d*=y}}e[t]=l,e[t+1]=c,e[t+2]=u,e[t+3]=d}static multiplyQuaternionsFlat(e,t,n,i,s,o){const a=n[i],l=n[i+1],c=n[i+2],u=n[i+3],d=s[o],f=s[o+1],h=s[o+2],_=s[o+3];return e[t]=a*_+u*d+l*h-c*f,e[t+1]=l*_+u*f+c*d-a*h,e[t+2]=c*_+u*h+a*f-l*d,e[t+3]=u*_-a*d-l*f-c*h,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,i=e._y,s=e._z,o=e._order,a=Math.cos,l=Math.sin,c=a(n/2),u=a(i/2),d=a(s/2),f=l(n/2),h=l(i/2),_=l(s/2);switch(o){case"XYZ":this._x=f*u*d+c*h*_,this._y=c*h*d-f*u*_,this._z=c*u*_+f*h*d,this._w=c*u*d-f*h*_;break;case"YXZ":this._x=f*u*d+c*h*_,this._y=c*h*d-f*u*_,this._z=c*u*_-f*h*d,this._w=c*u*d+f*h*_;break;case"ZXY":this._x=f*u*d-c*h*_,this._y=c*h*d+f*u*_,this._z=c*u*_+f*h*d,this._w=c*u*d-f*h*_;break;case"ZYX":this._x=f*u*d-c*h*_,this._y=c*h*d+f*u*_,this._z=c*u*_-f*h*d,this._w=c*u*d+f*h*_;break;case"YZX":this._x=f*u*d+c*h*_,this._y=c*h*d+f*u*_,this._z=c*u*_-f*h*d,this._w=c*u*d-f*h*_;break;case"XZY":this._x=f*u*d-c*h*_,this._y=c*h*d-f*u*_,this._z=c*u*_+f*h*d,this._w=c*u*d+f*h*_;break;default:lt("Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,i=Math.sin(n);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],i=t[4],s=t[8],o=t[1],a=t[5],l=t[9],c=t[2],u=t[6],d=t[10],f=n+a+d;if(f>0){const h=.5/Math.sqrt(f+1);this._w=.25/h,this._x=(u-l)*h,this._y=(s-c)*h,this._z=(o-i)*h}else if(n>a&&n>d){const h=2*Math.sqrt(1+n-a-d);this._w=(u-l)/h,this._x=.25*h,this._y=(i+o)/h,this._z=(s+c)/h}else if(a>d){const h=2*Math.sqrt(1+a-n-d);this._w=(s-c)/h,this._x=(i+o)/h,this._y=.25*h,this._z=(l+u)/h}else{const h=2*Math.sqrt(1+d-n-a);this._w=(o-i)/h,this._x=(s+c)/h,this._y=(l+u)/h,this._z=.25*h}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(At(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const i=Math.min(1,t/n);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,i=e._y,s=e._z,o=e._w,a=t._x,l=t._y,c=t._z,u=t._w;return this._x=n*u+o*a+i*c-s*l,this._y=i*u+o*l+s*a-n*c,this._z=s*u+o*c+n*l-i*a,this._w=o*u-n*a-i*l-s*c,this._onChangeCallback(),this}slerp(e,t){if(t<=0)return this;if(t>=1)return this.copy(e);let n=e._x,i=e._y,s=e._z,o=e._w,a=this.dot(e);a<0&&(n=-n,i=-i,s=-s,o=-o,a=-a);let l=1-t;if(a<.9995){const c=Math.acos(a),u=Math.sin(c);l=Math.sin(l*c)/u,t=Math.sin(t*c)/u,this._x=this._x*l+n*t,this._y=this._y*l+i*t,this._z=this._z*l+s*t,this._w=this._w*l+o*t,this._onChangeCallback()}else this._x=this._x*l+n*t,this._y=this._y*l+i*t,this._z=this._z*l+s*t,this._w=this._w*l+o*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(i*Math.sin(e),i*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class q{constructor(e=0,t=0,n=0){q.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Bp.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Bp.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6]*i,this.y=s[1]*t+s[4]*n+s[7]*i,this.z=s[2]*t+s[5]*n+s[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,s=e.elements,o=1/(s[3]*t+s[7]*n+s[11]*i+s[15]);return this.x=(s[0]*t+s[4]*n+s[8]*i+s[12])*o,this.y=(s[1]*t+s[5]*n+s[9]*i+s[13])*o,this.z=(s[2]*t+s[6]*n+s[10]*i+s[14])*o,this}applyQuaternion(e){const t=this.x,n=this.y,i=this.z,s=e.x,o=e.y,a=e.z,l=e.w,c=2*(o*i-a*n),u=2*(a*t-s*i),d=2*(s*n-o*t);return this.x=t+l*c+o*d-a*u,this.y=n+l*u+a*c-s*d,this.z=i+l*d+s*u-o*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*i,this.y=s[1]*t+s[5]*n+s[9]*i,this.z=s[2]*t+s[6]*n+s[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=At(this.x,e.x,t.x),this.y=At(this.y,e.y,t.y),this.z=At(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=At(this.x,e,t),this.y=At(this.y,e,t),this.z=At(this.z,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(At(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,i=e.y,s=e.z,o=t.x,a=t.y,l=t.z;return this.x=i*l-s*a,this.y=s*o-n*l,this.z=n*a-i*o,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Wu.copy(this).projectOnVector(e),this.sub(Wu)}reflect(e){return this.sub(Wu.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(At(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,i=this.z-e.z;return t*t+n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const i=Math.sin(t)*e;return this.x=i*Math.sin(n),this.y=Math.cos(t)*e,this.z=i*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Wu=new q,Bp=new As;class gt{constructor(e,t,n,i,s,o,a,l,c){gt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,i,s,o,a,l,c)}set(e,t,n,i,s,o,a,l,c){const u=this.elements;return u[0]=e,u[1]=i,u[2]=a,u[3]=t,u[4]=s,u[5]=l,u[6]=n,u[7]=o,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,s=this.elements,o=n[0],a=n[3],l=n[6],c=n[1],u=n[4],d=n[7],f=n[2],h=n[5],_=n[8],g=i[0],m=i[3],p=i[6],y=i[1],v=i[4],x=i[7],E=i[2],b=i[5],S=i[8];return s[0]=o*g+a*y+l*E,s[3]=o*m+a*v+l*b,s[6]=o*p+a*x+l*S,s[1]=c*g+u*y+d*E,s[4]=c*m+u*v+d*b,s[7]=c*p+u*x+d*S,s[2]=f*g+h*y+_*E,s[5]=f*m+h*v+_*b,s[8]=f*p+h*x+_*S,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8];return t*o*u-t*a*c-n*s*u+n*a*l+i*s*c-i*o*l}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8],d=u*o-a*c,f=a*l-u*s,h=c*s-o*l,_=t*d+n*f+i*h;if(_===0)return this.set(0,0,0,0,0,0,0,0,0);const g=1/_;return e[0]=d*g,e[1]=(i*c-u*n)*g,e[2]=(a*n-i*o)*g,e[3]=f*g,e[4]=(u*t-i*l)*g,e[5]=(i*s-a*t)*g,e[6]=h*g,e[7]=(n*l-c*t)*g,e[8]=(o*t-n*s)*g,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,i,s,o,a){const l=Math.cos(s),c=Math.sin(s);return this.set(n*l,n*c,-n*(l*o+c*a)+o+e,-i*c,i*l,-i*(-c*o+l*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(Xu.makeScale(e,t)),this}rotate(e){return this.premultiply(Xu.makeRotation(-e)),this}translate(e,t){return this.premultiply(Xu.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<9;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Xu=new gt,zp=new gt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Vp=new gt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function yy(){const r={enabled:!0,workingColorSpace:Yn,spaces:{},convert:function(i,s,o){return this.enabled===!1||s===o||!s||!o||(this.spaces[s].transfer===jt&&(i.r=Gr(i.r),i.g=Gr(i.g),i.b=Gr(i.b)),this.spaces[s].primaries!==this.spaces[o].primaries&&(i.applyMatrix3(this.spaces[s].toXYZ),i.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===jt&&(i.r=Jo(i.r),i.g=Jo(i.g),i.b=Jo(i.b))),i},workingToColorSpace:function(i,s){return this.convert(i,this.workingColorSpace,s)},colorSpaceToWorking:function(i,s){return this.convert(i,s,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===ls?ou:this.spaces[i].transfer},getToneMappingMode:function(i){return this.spaces[i].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(i,s=this.workingColorSpace){return i.fromArray(this.spaces[s].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,s,o){return i.copy(this.spaces[s].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(i,s){return Dl("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),r.workingToColorSpace(i,s)},toWorkingColorSpace:function(i,s){return Dl("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),r.colorSpaceToWorking(i,s)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return r.define({[Yn]:{primaries:e,whitePoint:n,transfer:ou,toXYZ:zp,fromXYZ:Vp,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Sn},outputColorSpaceConfig:{drawingBufferColorSpace:Sn}},[Sn]:{primaries:e,whitePoint:n,transfer:jt,toXYZ:zp,fromXYZ:Vp,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Sn}}}),r}const Dt=yy();function Gr(r){return r<.04045?r*.0773993808:Math.pow(r*.9478672986+.0521327014,2.4)}function Jo(r){return r<.0031308?r*12.92:1.055*Math.pow(r,.41666)-.055}let Mo;class by{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{Mo===void 0&&(Mo=Ll("canvas")),Mo.width=e.width,Mo.height=e.height;const i=Mo.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),n=Mo}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Ll("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const i=n.getImageData(0,0,e.width,e.height),s=i.data;for(let o=0;o<s.length;o++)s[o]=Gr(s[o]/255)*255;return n.putImageData(i,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Gr(t[n]/255)*255):t[n]=Gr(t[n]);return{data:t,width:e.width,height:e.height}}else return lt("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Sy=0;class Uh{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Sy++}),this.uuid=Zi(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):t instanceof VideoFrame?e.set(t.displayHeight,t.displayWidth,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let s;if(Array.isArray(i)){s=[];for(let o=0,a=i.length;o<a;o++)i[o].isDataTexture?s.push(qu(i[o].image)):s.push(qu(i[o]))}else s=qu(i);n.url=s}return t||(e.images[this.uuid]=n),n}}function qu(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?by.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(lt("Texture: Unable to serialize Texture."),{})}let wy=0;const Yu=new q;class An extends Ea{constructor(e=An.DEFAULT_IMAGE,t=An.DEFAULT_MAPPING,n=dr,i=dr,s=ri,o=Ur,a=Ui,l=vr,c=An.DEFAULT_ANISOTROPY,u=ls){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:wy++}),this.uuid=Zi(),this.name="",this.source=new Uh(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=s,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new Rt(0,0),this.repeat=new Rt(1,1),this.center=new Rt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new gt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(Yu).x}get height(){return this.source.getSize(Yu).y}get depth(){return this.source.getSize(Yu).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const n=e[t];if(n===void 0){lt(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const i=this[t];if(i===void 0){lt(`Texture.setValues(): property '${t}' does not exist.`);continue}i&&n&&i.isVector2&&n.isVector2||i&&n&&i.isVector3&&n.isVector3||i&&n&&i.isMatrix3&&n.isMatrix3?i.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==pg)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case fa:e.x=e.x-Math.floor(e.x);break;case dr:e.x=e.x<0?0:1;break;case su:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case fa:e.y=e.y-Math.floor(e.y);break;case dr:e.y=e.y<0?0:1;break;case su:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}An.DEFAULT_IMAGE=null;An.DEFAULT_MAPPING=pg;An.DEFAULT_ANISOTROPY=1;class Wt{constructor(e=0,t=0,n=0,i=1){Wt.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,i){return this.x=e,this.y=t,this.z=n,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,s=this.w,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*i+o[12]*s,this.y=o[1]*t+o[5]*n+o[9]*i+o[13]*s,this.z=o[2]*t+o[6]*n+o[10]*i+o[14]*s,this.w=o[3]*t+o[7]*n+o[11]*i+o[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,i,s;const l=e.elements,c=l[0],u=l[4],d=l[8],f=l[1],h=l[5],_=l[9],g=l[2],m=l[6],p=l[10];if(Math.abs(u-f)<.01&&Math.abs(d-g)<.01&&Math.abs(_-m)<.01){if(Math.abs(u+f)<.1&&Math.abs(d+g)<.1&&Math.abs(_+m)<.1&&Math.abs(c+h+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const v=(c+1)/2,x=(h+1)/2,E=(p+1)/2,b=(u+f)/4,S=(d+g)/4,P=(_+m)/4;return v>x&&v>E?v<.01?(n=0,i=.707106781,s=.707106781):(n=Math.sqrt(v),i=b/n,s=S/n):x>E?x<.01?(n=.707106781,i=0,s=.707106781):(i=Math.sqrt(x),n=b/i,s=P/i):E<.01?(n=.707106781,i=.707106781,s=0):(s=Math.sqrt(E),n=S/s,i=P/s),this.set(n,i,s,t),this}let y=Math.sqrt((m-_)*(m-_)+(d-g)*(d-g)+(f-u)*(f-u));return Math.abs(y)<.001&&(y=1),this.x=(m-_)/y,this.y=(d-g)/y,this.z=(f-u)/y,this.w=Math.acos((c+h+p-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=At(this.x,e.x,t.x),this.y=At(this.y,e.y,t.y),this.z=At(this.z,e.z,t.z),this.w=At(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=At(this.x,e,t),this.y=At(this.y,e,t),this.z=At(this.z,e,t),this.w=At(this.w,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(At(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class My extends Ea{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:ri,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new Wt(0,0,e,t),this.scissorTest=!1,this.viewport=new Wt(0,0,e,t);const i={width:e,height:t,depth:n.depth},s=new An(i);this.textures=[];const o=n.count;for(let a=0;a<o;a++)this.textures[a]=s.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(e={}){const t={minFilter:ri,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let i=0,s=this.textures.length;i<s;i++)this.textures[i].image.width=e,this.textures[i].image.height=t,this.textures[i].image.depth=n,this.textures[i].isData3DTexture!==!0&&(this.textures[i].isArrayTexture=this.textures[i].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const i=Object.assign({},e.textures[t].image);this.textures[t].source=new Uh(i)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class co extends My{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class Eg extends An{constructor(e=null,t=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=si,this.minFilter=si,this.wrapR=dr,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class Ty extends An{constructor(e=null,t=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=si,this.minFilter=si,this.wrapR=dr,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Qi{constructor(e=new q(1/0,1/0,1/0),t=new q(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Hi.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Hi.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=Hi.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const s=n.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=s.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,Hi):Hi.fromBufferAttribute(s,o),Hi.applyMatrix4(e.matrixWorld),this.expandByPoint(Hi);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Kl.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Kl.copy(n.boundingBox)),Kl.applyMatrix4(e.matrixWorld),this.union(Kl)}const i=e.children;for(let s=0,o=i.length;s<o;s++)this.expandByObject(i[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Hi),Hi.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(La),Zl.subVectors(this.max,La),To.subVectors(e.a,La),Eo.subVectors(e.b,La),Ao.subVectors(e.c,La),Qr.subVectors(Eo,To),es.subVectors(Ao,Eo),Ls.subVectors(To,Ao);let t=[0,-Qr.z,Qr.y,0,-es.z,es.y,0,-Ls.z,Ls.y,Qr.z,0,-Qr.x,es.z,0,-es.x,Ls.z,0,-Ls.x,-Qr.y,Qr.x,0,-es.y,es.x,0,-Ls.y,Ls.x,0];return!ju(t,To,Eo,Ao,Zl)||(t=[1,0,0,0,1,0,0,0,1],!ju(t,To,Eo,Ao,Zl))?!1:(Jl.crossVectors(Qr,es),t=[Jl.x,Jl.y,Jl.z],ju(t,To,Eo,Ao,Zl))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Hi).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Hi).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Mr[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Mr[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Mr[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Mr[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Mr[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Mr[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Mr[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Mr[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Mr),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const Mr=[new q,new q,new q,new q,new q,new q,new q,new q],Hi=new q,Kl=new Qi,To=new q,Eo=new q,Ao=new q,Qr=new q,es=new q,Ls=new q,La=new q,Zl=new q,Jl=new q,Ds=new q;function ju(r,e,t,n,i){for(let s=0,o=r.length-3;s<=o;s+=3){Ds.fromArray(r,s);const a=i.x*Math.abs(Ds.x)+i.y*Math.abs(Ds.y)+i.z*Math.abs(Ds.z),l=e.dot(Ds),c=t.dot(Ds),u=n.dot(Ds);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>a)return!1}return!0}const Ey=new Qi,Da=new q,$u=new q;class Sr{constructor(e=new q,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):Ey.setFromPoints(e).getCenter(n);let i=0;for(let s=0,o=e.length;s<o;s++)i=Math.max(i,n.distanceToSquared(e[s]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Da.subVectors(e,this.center);const t=Da.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),i=(n-this.radius)*.5;this.center.addScaledVector(Da,i/n),this.radius+=i}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):($u.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Da.copy(e.center).add($u)),this.expandByPoint(Da.copy(e.center).sub($u))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}const Tr=new q,Ku=new q,Ql=new q,ts=new q,Zu=new q,ec=new q,Ju=new q;class Ru{constructor(e=new q,t=new q(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Tr)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Tr.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Tr.copy(this.origin).addScaledVector(this.direction,t),Tr.distanceToSquared(e))}distanceSqToSegment(e,t,n,i){Ku.copy(e).add(t).multiplyScalar(.5),Ql.copy(t).sub(e).normalize(),ts.copy(this.origin).sub(Ku);const s=e.distanceTo(t)*.5,o=-this.direction.dot(Ql),a=ts.dot(this.direction),l=-ts.dot(Ql),c=ts.lengthSq(),u=Math.abs(1-o*o);let d,f,h,_;if(u>0)if(d=o*l-a,f=o*a-l,_=s*u,d>=0)if(f>=-_)if(f<=_){const g=1/u;d*=g,f*=g,h=d*(d+o*f+2*a)+f*(o*d+f+2*l)+c}else f=s,d=Math.max(0,-(o*f+a)),h=-d*d+f*(f+2*l)+c;else f=-s,d=Math.max(0,-(o*f+a)),h=-d*d+f*(f+2*l)+c;else f<=-_?(d=Math.max(0,-(-o*s+a)),f=d>0?-s:Math.min(Math.max(-s,-l),s),h=-d*d+f*(f+2*l)+c):f<=_?(d=0,f=Math.min(Math.max(-s,-l),s),h=f*(f+2*l)+c):(d=Math.max(0,-(o*s+a)),f=d>0?s:Math.min(Math.max(-s,-l),s),h=-d*d+f*(f+2*l)+c);else f=o>0?-s:s,d=Math.max(0,-(o*f+a)),h=-d*d+f*(f+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,d),i&&i.copy(Ku).addScaledVector(Ql,f),h}intersectSphere(e,t){Tr.subVectors(e.center,this.origin);const n=Tr.dot(this.direction),i=Tr.dot(Tr)-n*n,s=e.radius*e.radius;if(i>s)return null;const o=Math.sqrt(s-i),a=n-o,l=n+o;return l<0?null:a<0?this.at(l,t):this.at(a,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,i,s,o,a,l;const c=1/this.direction.x,u=1/this.direction.y,d=1/this.direction.z,f=this.origin;return c>=0?(n=(e.min.x-f.x)*c,i=(e.max.x-f.x)*c):(n=(e.max.x-f.x)*c,i=(e.min.x-f.x)*c),u>=0?(s=(e.min.y-f.y)*u,o=(e.max.y-f.y)*u):(s=(e.max.y-f.y)*u,o=(e.min.y-f.y)*u),n>o||s>i||((s>n||isNaN(n))&&(n=s),(o<i||isNaN(i))&&(i=o),d>=0?(a=(e.min.z-f.z)*d,l=(e.max.z-f.z)*d):(a=(e.max.z-f.z)*d,l=(e.min.z-f.z)*d),n>l||a>i)||((a>n||n!==n)&&(n=a),(l<i||i!==i)&&(i=l),i<0)?null:this.at(n>=0?n:i,t)}intersectsBox(e){return this.intersectBox(e,Tr)!==null}intersectTriangle(e,t,n,i,s){Zu.subVectors(t,e),ec.subVectors(n,e),Ju.crossVectors(Zu,ec);let o=this.direction.dot(Ju),a;if(o>0){if(i)return null;a=1}else if(o<0)a=-1,o=-o;else return null;ts.subVectors(this.origin,e);const l=a*this.direction.dot(ec.crossVectors(ts,ec));if(l<0)return null;const c=a*this.direction.dot(Zu.cross(ts));if(c<0||l+c>o)return null;const u=-a*ts.dot(Ju);return u<0?null:this.at(u/o,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class yt{constructor(e,t,n,i,s,o,a,l,c,u,d,f,h,_,g,m){yt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,i,s,o,a,l,c,u,d,f,h,_,g,m)}set(e,t,n,i,s,o,a,l,c,u,d,f,h,_,g,m){const p=this.elements;return p[0]=e,p[4]=t,p[8]=n,p[12]=i,p[1]=s,p[5]=o,p[9]=a,p[13]=l,p[2]=c,p[6]=u,p[10]=d,p[14]=f,p[3]=h,p[7]=_,p[11]=g,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new yt().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,i=1/Co.setFromMatrixColumn(e,0).length(),s=1/Co.setFromMatrixColumn(e,1).length(),o=1/Co.setFromMatrixColumn(e,2).length();return t[0]=n[0]*i,t[1]=n[1]*i,t[2]=n[2]*i,t[3]=0,t[4]=n[4]*s,t[5]=n[5]*s,t[6]=n[6]*s,t[7]=0,t[8]=n[8]*o,t[9]=n[9]*o,t[10]=n[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,i=e.y,s=e.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(i),c=Math.sin(i),u=Math.cos(s),d=Math.sin(s);if(e.order==="XYZ"){const f=o*u,h=o*d,_=a*u,g=a*d;t[0]=l*u,t[4]=-l*d,t[8]=c,t[1]=h+_*c,t[5]=f-g*c,t[9]=-a*l,t[2]=g-f*c,t[6]=_+h*c,t[10]=o*l}else if(e.order==="YXZ"){const f=l*u,h=l*d,_=c*u,g=c*d;t[0]=f+g*a,t[4]=_*a-h,t[8]=o*c,t[1]=o*d,t[5]=o*u,t[9]=-a,t[2]=h*a-_,t[6]=g+f*a,t[10]=o*l}else if(e.order==="ZXY"){const f=l*u,h=l*d,_=c*u,g=c*d;t[0]=f-g*a,t[4]=-o*d,t[8]=_+h*a,t[1]=h+_*a,t[5]=o*u,t[9]=g-f*a,t[2]=-o*c,t[6]=a,t[10]=o*l}else if(e.order==="ZYX"){const f=o*u,h=o*d,_=a*u,g=a*d;t[0]=l*u,t[4]=_*c-h,t[8]=f*c+g,t[1]=l*d,t[5]=g*c+f,t[9]=h*c-_,t[2]=-c,t[6]=a*l,t[10]=o*l}else if(e.order==="YZX"){const f=o*l,h=o*c,_=a*l,g=a*c;t[0]=l*u,t[4]=g-f*d,t[8]=_*d+h,t[1]=d,t[5]=o*u,t[9]=-a*u,t[2]=-c*u,t[6]=h*d+_,t[10]=f-g*d}else if(e.order==="XZY"){const f=o*l,h=o*c,_=a*l,g=a*c;t[0]=l*u,t[4]=-d,t[8]=c*u,t[1]=f*d+g,t[5]=o*u,t[9]=h*d-_,t[2]=_*d-h,t[6]=a*u,t[10]=g*d+f}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Ay,e,Cy)}lookAt(e,t,n){const i=this.elements;return _i.subVectors(e,t),_i.lengthSq()===0&&(_i.z=1),_i.normalize(),ns.crossVectors(n,_i),ns.lengthSq()===0&&(Math.abs(n.z)===1?_i.x+=1e-4:_i.z+=1e-4,_i.normalize(),ns.crossVectors(n,_i)),ns.normalize(),tc.crossVectors(_i,ns),i[0]=ns.x,i[4]=tc.x,i[8]=_i.x,i[1]=ns.y,i[5]=tc.y,i[9]=_i.y,i[2]=ns.z,i[6]=tc.z,i[10]=_i.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,s=this.elements,o=n[0],a=n[4],l=n[8],c=n[12],u=n[1],d=n[5],f=n[9],h=n[13],_=n[2],g=n[6],m=n[10],p=n[14],y=n[3],v=n[7],x=n[11],E=n[15],b=i[0],S=i[4],P=i[8],w=i[12],M=i[1],L=i[5],F=i[9],G=i[13],U=i[2],X=i[6],Z=i[10],C=i[14],Y=i[3],de=i[7],I=i[11],xe=i[15];return s[0]=o*b+a*M+l*U+c*Y,s[4]=o*S+a*L+l*X+c*de,s[8]=o*P+a*F+l*Z+c*I,s[12]=o*w+a*G+l*C+c*xe,s[1]=u*b+d*M+f*U+h*Y,s[5]=u*S+d*L+f*X+h*de,s[9]=u*P+d*F+f*Z+h*I,s[13]=u*w+d*G+f*C+h*xe,s[2]=_*b+g*M+m*U+p*Y,s[6]=_*S+g*L+m*X+p*de,s[10]=_*P+g*F+m*Z+p*I,s[14]=_*w+g*G+m*C+p*xe,s[3]=y*b+v*M+x*U+E*Y,s[7]=y*S+v*L+x*X+E*de,s[11]=y*P+v*F+x*Z+E*I,s[15]=y*w+v*G+x*C+E*xe,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],i=e[8],s=e[12],o=e[1],a=e[5],l=e[9],c=e[13],u=e[2],d=e[6],f=e[10],h=e[14],_=e[3],g=e[7],m=e[11],p=e[15];return _*(+s*l*d-i*c*d-s*a*f+n*c*f+i*a*h-n*l*h)+g*(+t*l*h-t*c*f+s*o*f-i*o*h+i*c*u-s*l*u)+m*(+t*c*d-t*a*h-s*o*d+n*o*h+s*a*u-n*c*u)+p*(-i*a*u-t*l*d+t*a*f+i*o*d-n*o*f+n*l*u)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8],d=e[9],f=e[10],h=e[11],_=e[12],g=e[13],m=e[14],p=e[15],y=d*m*c-g*f*c+g*l*h-a*m*h-d*l*p+a*f*p,v=_*f*c-u*m*c-_*l*h+o*m*h+u*l*p-o*f*p,x=u*g*c-_*d*c+_*a*h-o*g*h-u*a*p+o*d*p,E=_*d*l-u*g*l-_*a*f+o*g*f+u*a*m-o*d*m,b=t*y+n*v+i*x+s*E;if(b===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const S=1/b;return e[0]=y*S,e[1]=(g*f*s-d*m*s-g*i*h+n*m*h+d*i*p-n*f*p)*S,e[2]=(a*m*s-g*l*s+g*i*c-n*m*c-a*i*p+n*l*p)*S,e[3]=(d*l*s-a*f*s-d*i*c+n*f*c+a*i*h-n*l*h)*S,e[4]=v*S,e[5]=(u*m*s-_*f*s+_*i*h-t*m*h-u*i*p+t*f*p)*S,e[6]=(_*l*s-o*m*s-_*i*c+t*m*c+o*i*p-t*l*p)*S,e[7]=(o*f*s-u*l*s+u*i*c-t*f*c-o*i*h+t*l*h)*S,e[8]=x*S,e[9]=(_*d*s-u*g*s-_*n*h+t*g*h+u*n*p-t*d*p)*S,e[10]=(o*g*s-_*a*s+_*n*c-t*g*c-o*n*p+t*a*p)*S,e[11]=(u*a*s-o*d*s-u*n*c+t*d*c+o*n*h-t*a*h)*S,e[12]=E*S,e[13]=(u*g*i-_*d*i+_*n*f-t*g*f-u*n*m+t*d*m)*S,e[14]=(_*a*i-o*g*i-_*n*l+t*g*l+o*n*m-t*a*m)*S,e[15]=(o*d*i-u*a*i+u*n*l-t*d*l-o*n*f+t*a*f)*S,this}scale(e){const t=this.elements,n=e.x,i=e.y,s=e.z;return t[0]*=n,t[4]*=i,t[8]*=s,t[1]*=n,t[5]*=i,t[9]*=s,t[2]*=n,t[6]*=i,t[10]*=s,t[3]*=n,t[7]*=i,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,i))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),i=Math.sin(t),s=1-n,o=e.x,a=e.y,l=e.z,c=s*o,u=s*a;return this.set(c*o+n,c*a-i*l,c*l+i*a,0,c*a+i*l,u*a+n,u*l-i*o,0,c*l-i*a,u*l+i*o,s*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,i,s,o){return this.set(1,n,s,0,e,1,o,0,t,i,1,0,0,0,0,1),this}compose(e,t,n){const i=this.elements,s=t._x,o=t._y,a=t._z,l=t._w,c=s+s,u=o+o,d=a+a,f=s*c,h=s*u,_=s*d,g=o*u,m=o*d,p=a*d,y=l*c,v=l*u,x=l*d,E=n.x,b=n.y,S=n.z;return i[0]=(1-(g+p))*E,i[1]=(h+x)*E,i[2]=(_-v)*E,i[3]=0,i[4]=(h-x)*b,i[5]=(1-(f+p))*b,i[6]=(m+y)*b,i[7]=0,i[8]=(_+v)*S,i[9]=(m-y)*S,i[10]=(1-(f+g))*S,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,n){const i=this.elements;let s=Co.set(i[0],i[1],i[2]).length();const o=Co.set(i[4],i[5],i[6]).length(),a=Co.set(i[8],i[9],i[10]).length();this.determinant()<0&&(s=-s),e.x=i[12],e.y=i[13],e.z=i[14],Gi.copy(this);const c=1/s,u=1/o,d=1/a;return Gi.elements[0]*=c,Gi.elements[1]*=c,Gi.elements[2]*=c,Gi.elements[4]*=u,Gi.elements[5]*=u,Gi.elements[6]*=u,Gi.elements[8]*=d,Gi.elements[9]*=d,Gi.elements[10]*=d,t.setFromRotationMatrix(Gi),n.x=s,n.y=o,n.z=a,this}makePerspective(e,t,n,i,s,o,a=fr,l=!1){const c=this.elements,u=2*s/(t-e),d=2*s/(n-i),f=(t+e)/(t-e),h=(n+i)/(n-i);let _,g;if(l)_=s/(o-s),g=o*s/(o-s);else if(a===fr)_=-(o+s)/(o-s),g=-2*o*s/(o-s);else if(a===au)_=-o/(o-s),g=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=u,c[4]=0,c[8]=f,c[12]=0,c[1]=0,c[5]=d,c[9]=h,c[13]=0,c[2]=0,c[6]=0,c[10]=_,c[14]=g,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,i,s,o,a=fr,l=!1){const c=this.elements,u=2/(t-e),d=2/(n-i),f=-(t+e)/(t-e),h=-(n+i)/(n-i);let _,g;if(l)_=1/(o-s),g=o/(o-s);else if(a===fr)_=-2/(o-s),g=-(o+s)/(o-s);else if(a===au)_=-1/(o-s),g=-s/(o-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=u,c[4]=0,c[8]=0,c[12]=f,c[1]=0,c[5]=d,c[9]=0,c[13]=h,c[2]=0,c[6]=0,c[10]=_,c[14]=g,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<16;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const Co=new q,Gi=new yt,Ay=new q(0,0,0),Cy=new q(1,1,1),ns=new q,tc=new q,_i=new q,Hp=new yt,Gp=new As;class yr{constructor(e=0,t=0,n=0,i=yr.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,i=this._order){return this._x=e,this._y=t,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const i=e.elements,s=i[0],o=i[4],a=i[8],l=i[1],c=i[5],u=i[9],d=i[2],f=i[6],h=i[10];switch(t){case"XYZ":this._y=Math.asin(At(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,h),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(f,c),this._z=0);break;case"YXZ":this._x=Math.asin(-At(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,h),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,s),this._z=0);break;case"ZXY":this._x=Math.asin(At(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-d,h),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-At(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(f,h),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(At(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-d,s)):(this._x=0,this._y=Math.atan2(a,h));break;case"XZY":this._z=Math.asin(-At(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(f,c),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-u,h),this._y=0);break;default:lt("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Hp.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Hp,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Gp.setFromEuler(this),this.setFromQuaternion(Gp,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}yr.DEFAULT_ORDER="XYZ";class Ag{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Ry=0;const Wp=new q,Ro=new As,Er=new yt,nc=new q,Ia=new q,Py=new q,Ly=new As,Xp=new q(1,0,0),qp=new q(0,1,0),Yp=new q(0,0,1),jp={type:"added"},Dy={type:"removed"},Po={type:"childadded",child:null},Qu={type:"childremoved",child:null};class un extends Ea{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Ry++}),this.uuid=Zi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=un.DEFAULT_UP.clone();const e=new q,t=new yr,n=new As,i=new q(1,1,1);function s(){n.setFromEuler(t,!1)}function o(){t.setFromQuaternion(n,void 0,!1)}t._onChange(s),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new yt},normalMatrix:{value:new gt}}),this.matrix=new yt,this.matrixWorld=new yt,this.matrixAutoUpdate=un.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=un.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Ag,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Ro.setFromAxisAngle(e,t),this.quaternion.multiply(Ro),this}rotateOnWorldAxis(e,t){return Ro.setFromAxisAngle(e,t),this.quaternion.premultiply(Ro),this}rotateX(e){return this.rotateOnAxis(Xp,e)}rotateY(e){return this.rotateOnAxis(qp,e)}rotateZ(e){return this.rotateOnAxis(Yp,e)}translateOnAxis(e,t){return Wp.copy(e).applyQuaternion(this.quaternion),this.position.add(Wp.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Xp,e)}translateY(e){return this.translateOnAxis(qp,e)}translateZ(e){return this.translateOnAxis(Yp,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Er.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?nc.copy(e):nc.set(e,t,n);const i=this.parent;this.updateWorldMatrix(!0,!1),Ia.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Er.lookAt(Ia,nc,this.up):Er.lookAt(nc,Ia,this.up),this.quaternion.setFromRotationMatrix(Er),i&&(Er.extractRotation(i.matrixWorld),Ro.setFromRotationMatrix(Er),this.quaternion.premultiply(Ro.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(Et("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(jp),Po.child=e,this.dispatchEvent(Po),Po.child=null):Et("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Dy),Qu.child=e,this.dispatchEvent(Qu),Qu.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Er.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Er.multiply(e.parent.matrixWorld)),e.applyMatrix4(Er),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(jp),Po.child=e,this.dispatchEvent(Po),Po.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,i=this.children.length;n<i;n++){const o=this.children[n].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const i=this.children;for(let s=0,o=i.length;s<o;s++)i[s].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ia,e,Py),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ia,Ly,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const i=this.children;for(let s=0,o=i.length;s<o;s++)i[s].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),i.instanceInfo=this._instanceInfo.map(a=>({...a})),i.availableInstanceIds=this._availableInstanceIds.slice(),i.availableGeometryIds=this._availableGeometryIds.slice(),i.nextIndexStart=this._nextIndexStart,i.nextVertexStart=this._nextVertexStart,i.geometryCount=this._geometryCount,i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.matricesTexture=this._matricesTexture.toJSON(e),i.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(i.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(i.boundingBox=this.boundingBox.toJSON()));function s(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=s(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const d=l[c];s(e.shapes,d)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(s(e.materials,this.material[l]));i.material=a}else i.material=s(e.materials,this.material);if(this.children.length>0){i.children=[];for(let a=0;a<this.children.length;a++)i.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];i.animations.push(s(e.animations,l))}}if(t){const a=o(e.geometries),l=o(e.materials),c=o(e.textures),u=o(e.images),d=o(e.shapes),f=o(e.skeletons),h=o(e.animations),_=o(e.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),u.length>0&&(n.images=u),d.length>0&&(n.shapes=d),f.length>0&&(n.skeletons=f),h.length>0&&(n.animations=h),_.length>0&&(n.nodes=_)}return n.object=i,n;function o(a){const l=[];for(const c in a){const u=a[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const i=e.children[n];this.add(i.clone())}return this}}un.DEFAULT_UP=new q(0,1,0);un.DEFAULT_MATRIX_AUTO_UPDATE=!0;un.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Wi=new q,Ar=new q,ed=new q,Cr=new q,Lo=new q,Do=new q,$p=new q,td=new q,nd=new q,id=new q,rd=new Wt,sd=new Wt,od=new Wt;class ji{constructor(e=new q,t=new q,n=new q){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,i){i.subVectors(n,t),Wi.subVectors(e,t),i.cross(Wi);const s=i.lengthSq();return s>0?i.multiplyScalar(1/Math.sqrt(s)):i.set(0,0,0)}static getBarycoord(e,t,n,i,s){Wi.subVectors(i,t),Ar.subVectors(n,t),ed.subVectors(e,t);const o=Wi.dot(Wi),a=Wi.dot(Ar),l=Wi.dot(ed),c=Ar.dot(Ar),u=Ar.dot(ed),d=o*c-a*a;if(d===0)return s.set(0,0,0),null;const f=1/d,h=(c*l-a*u)*f,_=(o*u-a*l)*f;return s.set(1-h-_,_,h)}static containsPoint(e,t,n,i){return this.getBarycoord(e,t,n,i,Cr)===null?!1:Cr.x>=0&&Cr.y>=0&&Cr.x+Cr.y<=1}static getInterpolation(e,t,n,i,s,o,a,l){return this.getBarycoord(e,t,n,i,Cr)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,Cr.x),l.addScaledVector(o,Cr.y),l.addScaledVector(a,Cr.z),l)}static getInterpolatedAttribute(e,t,n,i,s,o){return rd.setScalar(0),sd.setScalar(0),od.setScalar(0),rd.fromBufferAttribute(e,t),sd.fromBufferAttribute(e,n),od.fromBufferAttribute(e,i),o.setScalar(0),o.addScaledVector(rd,s.x),o.addScaledVector(sd,s.y),o.addScaledVector(od,s.z),o}static isFrontFacing(e,t,n,i){return Wi.subVectors(n,t),Ar.subVectors(e,t),Wi.cross(Ar).dot(i)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,i){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,t,n,i){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Wi.subVectors(this.c,this.b),Ar.subVectors(this.a,this.b),Wi.cross(Ar).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return ji.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return ji.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,i,s){return ji.getInterpolation(e,this.a,this.b,this.c,t,n,i,s)}containsPoint(e){return ji.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return ji.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,i=this.b,s=this.c;let o,a;Lo.subVectors(i,n),Do.subVectors(s,n),td.subVectors(e,n);const l=Lo.dot(td),c=Do.dot(td);if(l<=0&&c<=0)return t.copy(n);nd.subVectors(e,i);const u=Lo.dot(nd),d=Do.dot(nd);if(u>=0&&d<=u)return t.copy(i);const f=l*d-u*c;if(f<=0&&l>=0&&u<=0)return o=l/(l-u),t.copy(n).addScaledVector(Lo,o);id.subVectors(e,s);const h=Lo.dot(id),_=Do.dot(id);if(_>=0&&h<=_)return t.copy(s);const g=h*c-l*_;if(g<=0&&c>=0&&_<=0)return a=c/(c-_),t.copy(n).addScaledVector(Do,a);const m=u*_-h*d;if(m<=0&&d-u>=0&&h-_>=0)return $p.subVectors(s,i),a=(d-u)/(d-u+(h-_)),t.copy(i).addScaledVector($p,a);const p=1/(m+g+f);return o=g*p,a=f*p,t.copy(n).addScaledVector(Lo,o).addScaledVector(Do,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const Cg={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},is={h:0,s:0,l:0},ic={h:0,s:0,l:0};function ad(r,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?r+(e-r)*6*t:t<1/2?e:t<2/3?r+(e-r)*6*(2/3-t):r}let Qe=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const i=e;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Sn){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Dt.colorSpaceToWorking(this,t),this}setRGB(e,t,n,i=Dt.workingColorSpace){return this.r=e,this.g=t,this.b=n,Dt.colorSpaceToWorking(this,i),this}setHSL(e,t,n,i=Dt.workingColorSpace){if(e=Fh(e,1),t=At(t,0,1),n=At(n,0,1),t===0)this.r=this.g=this.b=n;else{const s=n<=.5?n*(1+t):n+t-n*t,o=2*n-s;this.r=ad(o,s,e+1/3),this.g=ad(o,s,e),this.b=ad(o,s,e-1/3)}return Dt.colorSpaceToWorking(this,i),this}setStyle(e,t=Sn){function n(s){s!==void 0&&parseFloat(s)<1&&lt("Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const o=i[1],a=i[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:lt("Color: Unknown color model "+e)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=i[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(s,16),t);lt("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Sn){const n=Cg[e.toLowerCase()];return n!==void 0?this.setHex(n,t):lt("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Gr(e.r),this.g=Gr(e.g),this.b=Gr(e.b),this}copyLinearToSRGB(e){return this.r=Jo(e.r),this.g=Jo(e.g),this.b=Jo(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Sn){return Dt.workingToColorSpace(Vn.copy(this),e),Math.round(At(Vn.r*255,0,255))*65536+Math.round(At(Vn.g*255,0,255))*256+Math.round(At(Vn.b*255,0,255))}getHexString(e=Sn){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Dt.workingColorSpace){Dt.workingToColorSpace(Vn.copy(this),t);const n=Vn.r,i=Vn.g,s=Vn.b,o=Math.max(n,i,s),a=Math.min(n,i,s);let l,c;const u=(a+o)/2;if(a===o)l=0,c=0;else{const d=o-a;switch(c=u<=.5?d/(o+a):d/(2-o-a),o){case n:l=(i-s)/d+(i<s?6:0);break;case i:l=(s-n)/d+2;break;case s:l=(n-i)/d+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,t=Dt.workingColorSpace){return Dt.workingToColorSpace(Vn.copy(this),t),e.r=Vn.r,e.g=Vn.g,e.b=Vn.b,e}getStyle(e=Sn){Dt.workingToColorSpace(Vn.copy(this),e);const t=Vn.r,n=Vn.g,i=Vn.b;return e!==Sn?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(e,t,n){return this.getHSL(is),this.setHSL(is.h+e,is.s+t,is.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(is),e.getHSL(ic);const n=al(is.h,ic.h,t),i=al(is.s,ic.s,t),s=al(is.l,ic.l,t);return this.setHSL(n,i,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,i=this.b,s=e.elements;return this.r=s[0]*t+s[3]*n+s[6]*i,this.g=s[1]*t+s[4]*n+s[7]*i,this.b=s[2]*t+s[5]*n+s[8]*i,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}};const Vn=new Qe;Qe.NAMES=Cg;let Iy=0;class gr extends Ea{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Iy++}),this.uuid=Zi(),this.name="",this.type="Material",this.blending=_s,this.side=qr,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Yd,this.blendDst=jd,this.blendEquation=qs,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Qe(0,0,0),this.blendAlpha=0,this.depthFunc=ca,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Np,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=wo,this.stencilZFail=wo,this.stencilZPass=wo,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){lt(`Material: parameter '${t}' has value of undefined.`);continue}const i=this[t];if(i===void 0){lt(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==_s&&(n.blending=this.blending),this.side!==qr&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Yd&&(n.blendSrc=this.blendSrc),this.blendDst!==jd&&(n.blendDst=this.blendDst),this.blendEquation!==qs&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==ca&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Np&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==wo&&(n.stencilFail=this.stencilFail),this.stencilZFail!==wo&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==wo&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(s){const o=[];for(const a in s){const l=s[a];delete l.metadata,o.push(l)}return o}if(t){const s=i(e.textures),o=i(e.images);s.length>0&&(n.textures=s),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const i=t.length;n=new Array(i);for(let s=0;s!==i;++s)n[s]=t[s].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class js extends gr{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Qe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new yr,this.combine=hg,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const vn=new q,rc=new Rt;let Oy=0;class Gt{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Oy++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Of,this.updateRanges=[],this.gpuType=Ki,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let i=0,s=this.itemSize;i<s;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)rc.fromBufferAttribute(this,t),rc.applyMatrix3(e),this.setXY(t,rc.x,rc.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)vn.fromBufferAttribute(this,t),vn.applyMatrix3(e),this.setXYZ(t,vn.x,vn.y,vn.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)vn.fromBufferAttribute(this,t),vn.applyMatrix4(e),this.setXYZ(t,vn.x,vn.y,vn.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)vn.fromBufferAttribute(this,t),vn.applyNormalMatrix(e),this.setXYZ(t,vn.x,vn.y,vn.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)vn.fromBufferAttribute(this,t),vn.transformDirection(e),this.setXYZ(t,vn.x,vn.y,vn.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Yi(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=qt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Yi(t,this.array)),t}setX(e,t){return this.normalized&&(t=qt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Yi(t,this.array)),t}setY(e,t){return this.normalized&&(t=qt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Yi(t,this.array)),t}setZ(e,t){return this.normalized&&(t=qt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Yi(t,this.array)),t}setW(e,t){return this.normalized&&(t=qt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=qt(t,this.array),n=qt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=qt(t,this.array),n=qt(n,this.array),i=qt(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this}setXYZW(e,t,n,i,s){return e*=this.itemSize,this.normalized&&(t=qt(t,this.array),n=qt(n,this.array),i=qt(i,this.array),s=qt(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Of&&(e.usage=this.usage),e}}class Rg extends Gt{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class Pg extends Gt{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class Wr extends Gt{constructor(e,t,n){super(new Float32Array(e),t,n)}}let Ny=0;const Pi=new yt,ld=new un,Io=new q,xi=new Qi,Oa=new Qi,Pn=new q;class hi extends Ea{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Ny++}),this.uuid=Zi(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Tg(e)?Pg:Rg)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const s=new gt().getNormalMatrix(e);n.applyNormalMatrix(s),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Pi.makeRotationFromQuaternion(e),this.applyMatrix4(Pi),this}rotateX(e){return Pi.makeRotationX(e),this.applyMatrix4(Pi),this}rotateY(e){return Pi.makeRotationY(e),this.applyMatrix4(Pi),this}rotateZ(e){return Pi.makeRotationZ(e),this.applyMatrix4(Pi),this}translate(e,t,n){return Pi.makeTranslation(e,t,n),this.applyMatrix4(Pi),this}scale(e,t,n){return Pi.makeScale(e,t,n),this.applyMatrix4(Pi),this}lookAt(e){return ld.lookAt(e),ld.updateMatrix(),this.applyMatrix4(ld.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Io).negate(),this.translate(Io.x,Io.y,Io.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let i=0,s=e.length;i<s;i++){const o=e[i];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new Wr(n,3))}else{const n=Math.min(e.length,t.count);for(let i=0;i<n;i++){const s=e[i];t.setXYZ(i,s.x,s.y,s.z||0)}e.length>t.count&&lt("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Qi);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Et("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new q(-1/0,-1/0,-1/0),new q(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,i=t.length;n<i;n++){const s=t[n];xi.setFromBufferAttribute(s),this.morphTargetsRelative?(Pn.addVectors(this.boundingBox.min,xi.min),this.boundingBox.expandByPoint(Pn),Pn.addVectors(this.boundingBox.max,xi.max),this.boundingBox.expandByPoint(Pn)):(this.boundingBox.expandByPoint(xi.min),this.boundingBox.expandByPoint(xi.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Et('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Sr);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Et("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new q,1/0);return}if(e){const n=this.boundingSphere.center;if(xi.setFromBufferAttribute(e),t)for(let s=0,o=t.length;s<o;s++){const a=t[s];Oa.setFromBufferAttribute(a),this.morphTargetsRelative?(Pn.addVectors(xi.min,Oa.min),xi.expandByPoint(Pn),Pn.addVectors(xi.max,Oa.max),xi.expandByPoint(Pn)):(xi.expandByPoint(Oa.min),xi.expandByPoint(Oa.max))}xi.getCenter(n);let i=0;for(let s=0,o=e.count;s<o;s++)Pn.fromBufferAttribute(e,s),i=Math.max(i,n.distanceToSquared(Pn));if(t)for(let s=0,o=t.length;s<o;s++){const a=t[s],l=this.morphTargetsRelative;for(let c=0,u=a.count;c<u;c++)Pn.fromBufferAttribute(a,c),l&&(Io.fromBufferAttribute(e,c),Pn.add(Io)),i=Math.max(i,n.distanceToSquared(Pn))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&Et('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){Et("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,i=t.normal,s=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Gt(new Float32Array(4*n.count),4));const o=this.getAttribute("tangent"),a=[],l=[];for(let P=0;P<n.count;P++)a[P]=new q,l[P]=new q;const c=new q,u=new q,d=new q,f=new Rt,h=new Rt,_=new Rt,g=new q,m=new q;function p(P,w,M){c.fromBufferAttribute(n,P),u.fromBufferAttribute(n,w),d.fromBufferAttribute(n,M),f.fromBufferAttribute(s,P),h.fromBufferAttribute(s,w),_.fromBufferAttribute(s,M),u.sub(c),d.sub(c),h.sub(f),_.sub(f);const L=1/(h.x*_.y-_.x*h.y);isFinite(L)&&(g.copy(u).multiplyScalar(_.y).addScaledVector(d,-h.y).multiplyScalar(L),m.copy(d).multiplyScalar(h.x).addScaledVector(u,-_.x).multiplyScalar(L),a[P].add(g),a[w].add(g),a[M].add(g),l[P].add(m),l[w].add(m),l[M].add(m))}let y=this.groups;y.length===0&&(y=[{start:0,count:e.count}]);for(let P=0,w=y.length;P<w;++P){const M=y[P],L=M.start,F=M.count;for(let G=L,U=L+F;G<U;G+=3)p(e.getX(G+0),e.getX(G+1),e.getX(G+2))}const v=new q,x=new q,E=new q,b=new q;function S(P){E.fromBufferAttribute(i,P),b.copy(E);const w=a[P];v.copy(w),v.sub(E.multiplyScalar(E.dot(w))).normalize(),x.crossVectors(b,w);const L=x.dot(l[P])<0?-1:1;o.setXYZW(P,v.x,v.y,v.z,L)}for(let P=0,w=y.length;P<w;++P){const M=y[P],L=M.start,F=M.count;for(let G=L,U=L+F;G<U;G+=3)S(e.getX(G+0)),S(e.getX(G+1)),S(e.getX(G+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Gt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let f=0,h=n.count;f<h;f++)n.setXYZ(f,0,0,0);const i=new q,s=new q,o=new q,a=new q,l=new q,c=new q,u=new q,d=new q;if(e)for(let f=0,h=e.count;f<h;f+=3){const _=e.getX(f+0),g=e.getX(f+1),m=e.getX(f+2);i.fromBufferAttribute(t,_),s.fromBufferAttribute(t,g),o.fromBufferAttribute(t,m),u.subVectors(o,s),d.subVectors(i,s),u.cross(d),a.fromBufferAttribute(n,_),l.fromBufferAttribute(n,g),c.fromBufferAttribute(n,m),a.add(u),l.add(u),c.add(u),n.setXYZ(_,a.x,a.y,a.z),n.setXYZ(g,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let f=0,h=t.count;f<h;f+=3)i.fromBufferAttribute(t,f+0),s.fromBufferAttribute(t,f+1),o.fromBufferAttribute(t,f+2),u.subVectors(o,s),d.subVectors(i,s),u.cross(d),n.setXYZ(f+0,u.x,u.y,u.z),n.setXYZ(f+1,u.x,u.y,u.z),n.setXYZ(f+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Pn.fromBufferAttribute(e,t),Pn.normalize(),e.setXYZ(t,Pn.x,Pn.y,Pn.z)}toNonIndexed(){function e(a,l){const c=a.array,u=a.itemSize,d=a.normalized,f=new c.constructor(l.length*u);let h=0,_=0;for(let g=0,m=l.length;g<m;g++){a.isInterleavedBufferAttribute?h=l[g]*a.data.stride+a.offset:h=l[g]*u;for(let p=0;p<u;p++)f[_++]=c[h++]}return new Gt(f,u,d)}if(this.index===null)return lt("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new hi,n=this.index.array,i=this.attributes;for(const a in i){const l=i[a],c=e(l,n);t.setAttribute(a,c)}const s=this.morphAttributes;for(const a in s){const l=[],c=s[a];for(let u=0,d=c.length;u<d;u++){const f=c[u],h=e(f,n);l.push(h)}t.morphAttributes[a]=l}t.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const l in n){const c=n[l];e.data.attributes[l]=c.toJSON(e.data)}const i={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let d=0,f=c.length;d<f;d++){const h=c[d];u.push(h.toJSON(e.data))}u.length>0&&(i[l]=u,s=!0)}s&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere=a.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone());const i=e.attributes;for(const c in i){const u=i[c];this.setAttribute(c,u.clone(t))}const s=e.morphAttributes;for(const c in s){const u=[],d=s[c];for(let f=0,h=d.length;f<h;f++)u.push(d[f].clone(t));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let c=0,u=o.length;c<u;c++){const d=o[c];this.addGroup(d.start,d.count,d.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Kp=new yt,Is=new Ru,sc=new Sr,Zp=new q,oc=new q,ac=new q,lc=new q,cd=new q,cc=new q,Jp=new q,uc=new q;class pi extends un{constructor(e=new hi,t=new js){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=i.length;s<o;s++){const a=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(e,t){const n=this.geometry,i=n.attributes.position,s=n.morphAttributes.position,o=n.morphTargetsRelative;t.fromBufferAttribute(i,e);const a=this.morphTargetInfluences;if(s&&a){cc.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const u=a[l],d=s[l];u!==0&&(cd.fromBufferAttribute(d,e),o?cc.addScaledVector(cd,u):cc.addScaledVector(cd.sub(t),u))}t.add(cc)}return t}raycast(e,t){const n=this.geometry,i=this.material,s=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),sc.copy(n.boundingSphere),sc.applyMatrix4(s),Is.copy(e.ray).recast(e.near),!(sc.containsPoint(Is.origin)===!1&&(Is.intersectSphere(sc,Zp)===null||Is.origin.distanceToSquared(Zp)>(e.far-e.near)**2))&&(Kp.copy(s).invert(),Is.copy(e.ray).applyMatrix4(Kp),!(n.boundingBox!==null&&Is.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Is)))}_computeIntersections(e,t,n){let i;const s=this.geometry,o=this.material,a=s.index,l=s.attributes.position,c=s.attributes.uv,u=s.attributes.uv1,d=s.attributes.normal,f=s.groups,h=s.drawRange;if(a!==null)if(Array.isArray(o))for(let _=0,g=f.length;_<g;_++){const m=f[_],p=o[m.materialIndex],y=Math.max(m.start,h.start),v=Math.min(a.count,Math.min(m.start+m.count,h.start+h.count));for(let x=y,E=v;x<E;x+=3){const b=a.getX(x),S=a.getX(x+1),P=a.getX(x+2);i=dc(this,p,e,n,c,u,d,b,S,P),i&&(i.faceIndex=Math.floor(x/3),i.face.materialIndex=m.materialIndex,t.push(i))}}else{const _=Math.max(0,h.start),g=Math.min(a.count,h.start+h.count);for(let m=_,p=g;m<p;m+=3){const y=a.getX(m),v=a.getX(m+1),x=a.getX(m+2);i=dc(this,o,e,n,c,u,d,y,v,x),i&&(i.faceIndex=Math.floor(m/3),t.push(i))}}else if(l!==void 0)if(Array.isArray(o))for(let _=0,g=f.length;_<g;_++){const m=f[_],p=o[m.materialIndex],y=Math.max(m.start,h.start),v=Math.min(l.count,Math.min(m.start+m.count,h.start+h.count));for(let x=y,E=v;x<E;x+=3){const b=x,S=x+1,P=x+2;i=dc(this,p,e,n,c,u,d,b,S,P),i&&(i.faceIndex=Math.floor(x/3),i.face.materialIndex=m.materialIndex,t.push(i))}}else{const _=Math.max(0,h.start),g=Math.min(l.count,h.start+h.count);for(let m=_,p=g;m<p;m+=3){const y=m,v=m+1,x=m+2;i=dc(this,o,e,n,c,u,d,y,v,x),i&&(i.faceIndex=Math.floor(m/3),t.push(i))}}}}function Fy(r,e,t,n,i,s,o,a){let l;if(e.side===li?l=n.intersectTriangle(o,s,i,!0,a):l=n.intersectTriangle(i,s,o,e.side===qr,a),l===null)return null;uc.copy(a),uc.applyMatrix4(r.matrixWorld);const c=t.ray.origin.distanceTo(uc);return c<t.near||c>t.far?null:{distance:c,point:uc.clone(),object:r}}function dc(r,e,t,n,i,s,o,a,l,c){r.getVertexPosition(a,oc),r.getVertexPosition(l,ac),r.getVertexPosition(c,lc);const u=Fy(r,e,t,n,oc,ac,lc,Jp);if(u){const d=new q;ji.getBarycoord(Jp,oc,ac,lc,d),i&&(u.uv=ji.getInterpolatedAttribute(i,a,l,c,d,new Rt)),s&&(u.uv1=ji.getInterpolatedAttribute(s,a,l,c,d,new Rt)),o&&(u.normal=ji.getInterpolatedAttribute(o,a,l,c,d,new q),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));const f={a,b:l,c,normal:new q,materialIndex:0};ji.getNormal(oc,ac,lc,f.normal),u.face=f,u.barycoord=d}return u}class Xl extends hi{constructor(e=1,t=1,n=1,i=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:i,heightSegments:s,depthSegments:o};const a=this;i=Math.floor(i),s=Math.floor(s),o=Math.floor(o);const l=[],c=[],u=[],d=[];let f=0,h=0;_("z","y","x",-1,-1,n,t,e,o,s,0),_("z","y","x",1,-1,n,t,-e,o,s,1),_("x","z","y",1,1,e,n,t,i,o,2),_("x","z","y",1,-1,e,n,-t,i,o,3),_("x","y","z",1,-1,e,t,n,i,s,4),_("x","y","z",-1,-1,e,t,-n,i,s,5),this.setIndex(l),this.setAttribute("position",new Wr(c,3)),this.setAttribute("normal",new Wr(u,3)),this.setAttribute("uv",new Wr(d,2));function _(g,m,p,y,v,x,E,b,S,P,w){const M=x/S,L=E/P,F=x/2,G=E/2,U=b/2,X=S+1,Z=P+1;let C=0,Y=0;const de=new q;for(let I=0;I<Z;I++){const xe=I*L-G;for(let ve=0;ve<X;ve++){const ee=ve*M-F;de[g]=ee*y,de[m]=xe*v,de[p]=U,c.push(de.x,de.y,de.z),de[g]=0,de[m]=0,de[p]=b>0?1:-1,u.push(de.x,de.y,de.z),d.push(ve/S),d.push(1-I/P),C+=1}}for(let I=0;I<P;I++)for(let xe=0;xe<S;xe++){const ve=f+xe+X*I,ee=f+xe+X*(I+1),Xe=f+(xe+1)+X*(I+1),qe=f+(xe+1)+X*I;l.push(ve,ee,qe),l.push(ee,Xe,qe),Y+=6}a.addGroup(h,Y,w),h+=Y,f+=C}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Xl(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function pa(r){const e={};for(const t in r){e[t]={};for(const n in r[t]){const i=r[t][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(lt("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=i.clone():Array.isArray(i)?e[t][n]=i.slice():e[t][n]=i}}return e}function Zn(r){const e={};for(let t=0;t<r.length;t++){const n=pa(r[t]);for(const i in n)e[i]=n[i]}return e}function Uy(r){const e=[];for(let t=0;t<r.length;t++)e.push(r[t].clone());return e}function Lg(r){const e=r.getRenderTarget();return e===null?r.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Dt.workingColorSpace}const ky={clone:pa,merge:Zn};var By=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,zy=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Ti extends gr{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=By,this.fragmentShader=zy,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=pa(e.uniforms),this.uniformsGroups=Uy(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const i in this.uniforms){const o=this.uniforms[i].value;o&&o.isTexture?t.uniforms[i]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[i]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[i]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[i]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[i]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[i]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[i]={type:"m4",value:o.toArray()}:t.uniforms[i]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class Dg extends un{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new yt,this.projectionMatrix=new yt,this.projectionMatrixInverse=new yt,this.coordinateSystem=fr,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const rs=new q,Qp=new Rt,em=new Rt;class ai extends Dg{constructor(e=50,t=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=ha*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(ol*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return ha*2*Math.atan(Math.tan(ol*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){rs.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(rs.x,rs.y).multiplyScalar(-e/rs.z),rs.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(rs.x,rs.y).multiplyScalar(-e/rs.z)}getViewSize(e,t){return this.getViewBounds(e,Qp,em),t.subVectors(em,Qp)}setViewOffset(e,t,n,i,s,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(ol*.5*this.fov)/this.zoom,n=2*t,i=this.aspect*n,s=-.5*i;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;s+=o.offsetX*i/l,t-=o.offsetY*n/c,i*=o.width/l,n*=o.height/c}const a=this.filmOffset;a!==0&&(s+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+i,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const Oo=-90,No=1;class Vy extends un{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const i=new ai(Oo,No,e,t);i.layers=this.layers,this.add(i);const s=new ai(Oo,No,e,t);s.layers=this.layers,this.add(s);const o=new ai(Oo,No,e,t);o.layers=this.layers,this.add(o);const a=new ai(Oo,No,e,t);a.layers=this.layers,this.add(a);const l=new ai(Oo,No,e,t);l.layers=this.layers,this.add(l);const c=new ai(Oo,No,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,i,s,o,a,l]=t;for(const c of t)this.remove(c);if(e===fr)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===au)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,o,a,l,c,u]=this.children,d=e.getRenderTarget(),f=e.getActiveCubeFace(),h=e.getActiveMipmapLevel(),_=e.xr.enabled;e.xr.enabled=!1;const g=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,i),e.render(t,s),e.setRenderTarget(n,1,i),e.render(t,o),e.setRenderTarget(n,2,i),e.render(t,a),e.setRenderTarget(n,3,i),e.render(t,l),e.setRenderTarget(n,4,i),e.render(t,c),n.texture.generateMipmaps=g,e.setRenderTarget(n,5,i),e.render(t,u),e.setRenderTarget(d,f,h),e.xr.enabled=_,n.texture.needsPMREMUpdate=!0}}class Ig extends An{constructor(e=[],t=ua,n,i,s,o,a,l,c,u){super(e,t,n,i,s,o,a,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Hy extends co{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},i=[n,n,n,n,n,n];this.texture=new Ig(i),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},i=new Xl(5,5,5),s=new Ti({name:"CubemapFromEquirect",uniforms:pa(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:li,blending:Hr});s.uniforms.tEquirect.value=t;const o=new pi(i,s),a=t.minFilter;return t.minFilter===Ur&&(t.minFilter=ri),new Vy(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t=!0,n=!0,i=!0){const s=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,n,i);e.setRenderTarget(s)}}class kr extends un{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Gy={type:"move"};class ud{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new kr,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new kr,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new q,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new q),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new kr,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new q,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new q),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let i=null,s=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){o=!0;for(const g of e.hand.values()){const m=t.getJointPose(g,n),p=this._getHandJoint(c,g);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const u=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],f=u.position.distanceTo(d.position),h=.02,_=.005;c.inputState.pinching&&f>h+_?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&f<=h-_&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,n),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(i=t.getPose(e.targetRaySpace,n),i===null&&s!==null&&(i=s),i!==null&&(a.matrix.fromArray(i.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,i.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(i.linearVelocity)):a.hasLinearVelocity=!1,i.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(i.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Gy)))}return a!==null&&(a.visible=i!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new kr;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}class tm extends un{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new yr,this.environmentIntensity=1,this.environmentRotation=new yr,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class Og{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Of,this.updateRanges=[],this.version=0,this.uuid=Zi()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let i=0,s=this.stride;i<s;i++)this.array[e+i]=t.array[n+i];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Zi()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Zi()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const jn=new q;class Pu{constructor(e,t,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)jn.fromBufferAttribute(this,t),jn.applyMatrix4(e),this.setXYZ(t,jn.x,jn.y,jn.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)jn.fromBufferAttribute(this,t),jn.applyNormalMatrix(e),this.setXYZ(t,jn.x,jn.y,jn.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)jn.fromBufferAttribute(this,t),jn.transformDirection(e),this.setXYZ(t,jn.x,jn.y,jn.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=Yi(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=qt(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=qt(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=qt(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=qt(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=qt(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=Yi(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=Yi(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=Yi(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=Yi(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=qt(t,this.array),n=qt(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=qt(t,this.array),n=qt(n,this.array),i=qt(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this}setXYZW(e,t,n,i,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=qt(t,this.array),n=qt(n,this.array),i=qt(i,this.array),s=qt(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this.data.array[e+3]=s,this}clone(e){if(e===void 0){lu("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[i+s])}return new Gt(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new Pu(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){lu("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[i+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}const nm=new q,im=new Wt,rm=new Wt,Wy=new q,sm=new yt,fc=new q,dd=new Sr,om=new yt,fd=new Ru;class Xy extends pi{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=Lp,this.bindMatrix=new yt,this.bindMatrixInverse=new yt,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){const e=this.geometry;this.boundingBox===null&&(this.boundingBox=new Qi),this.boundingBox.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,fc),this.boundingBox.expandByPoint(fc)}computeBoundingSphere(){const e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new Sr),this.boundingSphere.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,fc),this.boundingSphere.expandByPoint(fc)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){const n=this.material,i=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),dd.copy(this.boundingSphere),dd.applyMatrix4(i),e.ray.intersectsSphere(dd)!==!1&&(om.copy(i).invert(),fd.copy(e.ray).applyMatrix4(om),!(this.boundingBox!==null&&fd.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,fd)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const e=new Wt,t=this.geometry.attributes.skinWeight;for(let n=0,i=t.count;n<i;n++){e.fromBufferAttribute(t,n);const s=1/e.manhattanLength();s!==1/0?e.multiplyScalar(s):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===Lp?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===Hv?this.bindMatrixInverse.copy(this.bindMatrix).invert():lt("SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){const n=this.skeleton,i=this.geometry;im.fromBufferAttribute(i.attributes.skinIndex,e),rm.fromBufferAttribute(i.attributes.skinWeight,e),nm.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let s=0;s<4;s++){const o=rm.getComponent(s);if(o!==0){const a=im.getComponent(s);sm.multiplyMatrices(n.bones[a].matrixWorld,n.boneInverses[a]),t.addScaledVector(Wy.copy(nm).applyMatrix4(sm),o)}}return t.applyMatrix4(this.bindMatrixInverse)}}class Ng extends un{constructor(){super(),this.isBone=!0,this.type="Bone"}}class kh extends An{constructor(e=null,t=1,n=1,i,s,o,a,l,c=si,u=si,d,f){super(null,o,a,l,c,u,i,s,d,f),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const am=new yt,qy=new yt;class Bh{constructor(e=[],t=[]){this.uuid=Zi(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){const e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){lt("Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,i=this.bones.length;n<i;n++)this.boneInverses.push(new yt)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){const n=new yt;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){const e=this.bones,t=this.boneInverses,n=this.boneMatrices,i=this.boneTexture;for(let s=0,o=e.length;s<o;s++){const a=e[s]?e[s].matrixWorld:qy;am.multiplyMatrices(a,t[s]),am.toArray(n,s*16)}i!==null&&(i.needsUpdate=!0)}clone(){return new Bh(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);const t=new Float32Array(e*e*4);t.set(this.boneMatrices);const n=new kh(t,e,e,Ui,Ki);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){const i=this.bones[t];if(i.name===e)return i}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,i=e.bones.length;n<i;n++){const s=e.bones[n];let o=t[s];o===void 0&&(lt("Skeleton: No bone found with UUID:",s),o=new Ng),this.bones.push(o),this.boneInverses.push(new yt().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){const e={metadata:{version:4.7,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;const t=this.bones,n=this.boneInverses;for(let i=0,s=t.length;i<s;i++){const o=t[i];e.bones.push(o.uuid);const a=n[i];e.boneInverses.push(a.toArray())}return e}}class Nf extends Gt{constructor(e,t,n,i=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const Fo=new yt,lm=new yt,hc=[],cm=new Qi,Yy=new yt,Na=new pi,Fa=new Sr;class jy extends pi{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Nf(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,Yy)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Qi),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Fo),cm.copy(e.boundingBox).applyMatrix4(Fo),this.boundingBox.union(cm)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Sr),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Fo),Fa.copy(e.boundingSphere).applyMatrix4(Fo),this.boundingSphere.union(Fa)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const n=t.morphTargetInfluences,i=this.morphTexture.source.data.data,s=n.length+1,o=e*s+1;for(let a=0;a<n.length;a++)n[a]=i[o+a]}raycast(e,t){const n=this.matrixWorld,i=this.count;if(Na.geometry=this.geometry,Na.material=this.material,Na.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Fa.copy(this.boundingSphere),Fa.applyMatrix4(n),e.ray.intersectsSphere(Fa)!==!1))for(let s=0;s<i;s++){this.getMatrixAt(s,Fo),lm.multiplyMatrices(n,Fo),Na.matrixWorld=lm,Na.raycast(e,hc);for(let o=0,a=hc.length;o<a;o++){const l=hc[o];l.instanceId=s,l.object=this,t.push(l)}hc.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new Nf(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){const n=t.morphTargetInfluences,i=n.length+1;this.morphTexture===null&&(this.morphTexture=new kh(new Float32Array(i*this.count),i,this.count,Lh,Ki));const s=this.morphTexture.source.data.data;let o=0;for(let c=0;c<n.length;c++)o+=n[c];const a=this.geometry.morphTargetsRelative?1:1-o,l=i*e;s[l]=a,s.set(n,l+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const hd=new q,$y=new q,Ky=new gt;class Vs{constructor(e=new q(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,i){return this.normal.set(e,t,n),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const i=hd.subVectors(n,t).cross($y.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(hd),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/i;return s<0||s>1?null:t.copy(e.start).addScaledVector(n,s)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||Ky.getNormalMatrix(e),i=this.coplanarPoint(hd).applyMatrix4(e),s=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Os=new Sr,Zy=new Rt(.5,.5),pc=new q;class zh{constructor(e=new Vs,t=new Vs,n=new Vs,i=new Vs,s=new Vs,o=new Vs){this.planes=[e,t,n,i,s,o]}set(e,t,n,i,s,o){const a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(n),a[3].copy(i),a[4].copy(s),a[5].copy(o),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=fr,n=!1){const i=this.planes,s=e.elements,o=s[0],a=s[1],l=s[2],c=s[3],u=s[4],d=s[5],f=s[6],h=s[7],_=s[8],g=s[9],m=s[10],p=s[11],y=s[12],v=s[13],x=s[14],E=s[15];if(i[0].setComponents(c-o,h-u,p-_,E-y).normalize(),i[1].setComponents(c+o,h+u,p+_,E+y).normalize(),i[2].setComponents(c+a,h+d,p+g,E+v).normalize(),i[3].setComponents(c-a,h-d,p-g,E-v).normalize(),n)i[4].setComponents(l,f,m,x).normalize(),i[5].setComponents(c-l,h-f,p-m,E-x).normalize();else if(i[4].setComponents(c-l,h-f,p-m,E-x).normalize(),t===fr)i[5].setComponents(c+l,h+f,p+m,E+x).normalize();else if(t===au)i[5].setComponents(l,f,m,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Os.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Os.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Os)}intersectsSprite(e){Os.center.set(0,0,0);const t=Zy.distanceTo(e.center);return Os.radius=.7071067811865476+t,Os.applyMatrix4(e.matrixWorld),this.intersectsSphere(Os)}intersectsSphere(e){const t=this.planes,n=e.center,i=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(n)<i)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const i=t[n];if(pc.x=i.normal.x>0?e.max.x:e.min.x,pc.y=i.normal.y>0?e.max.y:e.min.y,pc.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint(pc)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Fg extends gr{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Qe(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const cu=new q,uu=new q,um=new yt,Ua=new Ru,mc=new Sr,pd=new q,dm=new q;class Vh extends un{constructor(e=new hi,t=new Fg){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let i=1,s=t.count;i<s;i++)cu.fromBufferAttribute(t,i-1),uu.fromBufferAttribute(t,i),n[i]=n[i-1],n[i]+=cu.distanceTo(uu);e.setAttribute("lineDistance",new Wr(n,1))}else lt("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,s=e.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),mc.copy(n.boundingSphere),mc.applyMatrix4(i),mc.radius+=s,e.ray.intersectsSphere(mc)===!1)return;um.copy(i).invert(),Ua.copy(e.ray).applyMatrix4(um);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=this.isLineSegments?2:1,u=n.index,f=n.attributes.position;if(u!==null){const h=Math.max(0,o.start),_=Math.min(u.count,o.start+o.count);for(let g=h,m=_-1;g<m;g+=c){const p=u.getX(g),y=u.getX(g+1),v=gc(this,e,Ua,l,p,y,g);v&&t.push(v)}if(this.isLineLoop){const g=u.getX(_-1),m=u.getX(h),p=gc(this,e,Ua,l,g,m,_-1);p&&t.push(p)}}else{const h=Math.max(0,o.start),_=Math.min(f.count,o.start+o.count);for(let g=h,m=_-1;g<m;g+=c){const p=gc(this,e,Ua,l,g,g+1,g);p&&t.push(p)}if(this.isLineLoop){const g=gc(this,e,Ua,l,_-1,h,_-1);g&&t.push(g)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=i.length;s<o;s++){const a=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}function gc(r,e,t,n,i,s,o){const a=r.geometry.attributes.position;if(cu.fromBufferAttribute(a,i),uu.fromBufferAttribute(a,s),t.distanceSqToSegment(cu,uu,pd,dm)>n)return;pd.applyMatrix4(r.matrixWorld);const c=e.ray.origin.distanceTo(pd);if(!(c<e.near||c>e.far))return{distance:c,point:dm.clone().applyMatrix4(r.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:r}}const fm=new q,hm=new q;class Jy extends Vh{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[];for(let i=0,s=t.count;i<s;i+=2)fm.fromBufferAttribute(t,i),hm.fromBufferAttribute(t,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+fm.distanceTo(hm);e.setAttribute("lineDistance",new Wr(n,1))}else lt("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Qy extends Vh{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}}class Ug extends gr{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Qe(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const pm=new yt,Ff=new Ru,_c=new Sr,xc=new q;class Uf extends un{constructor(e=new hi,t=new Ug){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,s=e.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),_c.copy(n.boundingSphere),_c.applyMatrix4(i),_c.radius+=s,e.ray.intersectsSphere(_c)===!1)return;pm.copy(i).invert(),Ff.copy(e.ray).applyMatrix4(pm);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=n.index,d=n.attributes.position;if(c!==null){const f=Math.max(0,o.start),h=Math.min(c.count,o.start+o.count);for(let _=f,g=h;_<g;_++){const m=c.getX(_);xc.fromBufferAttribute(d,m),mm(xc,m,l,i,e,t,this)}}else{const f=Math.max(0,o.start),h=Math.min(d.count,o.start+o.count);for(let _=f,g=h;_<g;_++)xc.fromBufferAttribute(d,_),mm(xc,_,l,i,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=i.length;s<o;s++){const a=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}function mm(r,e,t,n,i,s,o){const a=Ff.distanceSqToPoint(r);if(a<t){const l=new q;Ff.closestPointToPoint(r,l),l.applyMatrix4(n);const c=i.ray.origin.distanceTo(l);if(c<i.near||c>i.far)return;s.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:o})}}class kg extends An{constructor(e,t,n=lo,i,s,o,a=si,l=si,c,u=Al,d=1){if(u!==Al&&u!==Cl)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const f={width:e,height:t,depth:d};super(f,i,s,o,a,l,u,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Uh(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class Bg extends An{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class qi extends hi{constructor(e=1,t=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:i};const s=e/2,o=t/2,a=Math.floor(n),l=Math.floor(i),c=a+1,u=l+1,d=e/a,f=t/l,h=[],_=[],g=[],m=[];for(let p=0;p<u;p++){const y=p*f-o;for(let v=0;v<c;v++){const x=v*d-s;_.push(x,-y,0),g.push(0,0,1),m.push(v/a),m.push(1-p/l)}}for(let p=0;p<l;p++)for(let y=0;y<a;y++){const v=y+c*p,x=y+c*(p+1),E=y+1+c*(p+1),b=y+1+c*p;h.push(v,x,b),h.push(x,E,b)}this.setIndex(h),this.setAttribute("position",new Wr(_,3)),this.setAttribute("normal",new Wr(g,3)),this.setAttribute("uv",new Wr(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new qi(e.width,e.height,e.widthSegments,e.heightSegments)}}class Hh extends gr{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Qe(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Qe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=wg,this.normalScale=new Rt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new yr,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class wr extends Hh{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new Rt(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return At(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Qe(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Qe(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Qe(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}class eb extends gr{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Xv,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class tb extends gr{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}function vc(r,e){return!r||r.constructor===e?r:typeof e.BYTES_PER_ELEMENT=="number"?new e(r):Array.prototype.slice.call(r)}function nb(r){return ArrayBuffer.isView(r)&&!(r instanceof DataView)}function ib(r){function e(i,s){return r[i]-r[s]}const t=r.length,n=new Array(t);for(let i=0;i!==t;++i)n[i]=i;return n.sort(e),n}function gm(r,e,t){const n=r.length,i=new r.constructor(n);for(let s=0,o=0;o!==n;++s){const a=t[s]*e;for(let l=0;l!==e;++l)i[o++]=r[a+l]}return i}function zg(r,e,t,n){let i=1,s=r[0];for(;s!==void 0&&s[n]===void 0;)s=r[i++];if(s===void 0)return;let o=s[n];if(o!==void 0)if(Array.isArray(o))do o=s[n],o!==void 0&&(e.push(s.time),t.push(...o)),s=r[i++];while(s!==void 0);else if(o.toArray!==void 0)do o=s[n],o!==void 0&&(e.push(s.time),o.toArray(t,t.length)),s=r[i++];while(s!==void 0);else do o=s[n],o!==void 0&&(e.push(s.time),t.push(o)),s=r[i++];while(s!==void 0)}class ql{constructor(e,t,n,i){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){const t=this.parameterPositions;let n=this._cachedIndex,i=t[n],s=t[n-1];n:{e:{let o;t:{i:if(!(e<i)){for(let a=n+2;;){if(i===void 0){if(e<s)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(s=i,i=t[++n],e<i)break e}o=t.length;break t}if(!(e>=s)){const a=t[1];e<a&&(n=2,s=a);for(let l=n-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(i=s,s=t[--n-1],e>=s)break e}o=n,n=0;break t}break n}for(;n<o;){const a=n+o>>>1;e<t[a]?o=a:n=a+1}if(i=t[n],s=t[n-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,s,i)}return this.interpolate_(n,s,e,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,s=e*i;for(let o=0;o!==i;++o)t[o]=n[s+o];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}}class rb extends ql{constructor(e,t,n,i){super(e,t,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Dp,endingEnd:Dp}}intervalChanged_(e,t,n){const i=this.parameterPositions;let s=e-2,o=e+1,a=i[s],l=i[o];if(a===void 0)switch(this.getSettings_().endingStart){case Ip:s=e,a=2*t-n;break;case Op:s=i.length-2,a=t+i[s]-i[s+1];break;default:s=e,a=n}if(l===void 0)switch(this.getSettings_().endingEnd){case Ip:o=e,l=2*n-t;break;case Op:o=1,l=n+i[1]-i[0];break;default:o=e-1,l=t}const c=(n-t)*.5,u=this.valueSize;this._weightPrev=c/(t-a),this._weightNext=c/(l-n),this._offsetPrev=s*u,this._offsetNext=o*u}interpolate_(e,t,n,i){const s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,u=this._offsetPrev,d=this._offsetNext,f=this._weightPrev,h=this._weightNext,_=(n-t)/(i-t),g=_*_,m=g*_,p=-f*m+2*f*g-f*_,y=(1+f)*m+(-1.5-2*f)*g+(-.5+f)*_+1,v=(-1-h)*m+(1.5+h)*g+.5*_,x=h*m-h*g;for(let E=0;E!==a;++E)s[E]=p*o[u+E]+y*o[c+E]+v*o[l+E]+x*o[d+E];return s}}class sb extends ql{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){const s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,u=(n-t)/(i-t),d=1-u;for(let f=0;f!==a;++f)s[f]=o[c+f]*d+o[l+f]*u;return s}}class ob extends ql{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e){return this.copySampleValue_(e-1)}}class er{constructor(e,t,n,i){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=vc(t,this.TimeBufferType),this.values=vc(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(e){const t=e.constructor;let n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:vc(e.times,Array),values:vc(e.values,Array)};const i=e.getInterpolation();i!==e.DefaultInterpolation&&(n.interpolation=i)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new ob(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new sb(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new rb(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case Rl:t=this.InterpolantFactoryMethodDiscrete;break;case Pl:t=this.InterpolantFactoryMethodLinear;break;case Gu:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){const n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return lt("KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Rl;case this.InterpolantFactoryMethodLinear:return Pl;case this.InterpolantFactoryMethodSmooth:return Gu}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){const t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]+=e}return this}scale(e){if(e!==1){const t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]*=e}return this}trim(e,t){const n=this.times,i=n.length;let s=0,o=i-1;for(;s!==i&&n[s]<e;)++s;for(;o!==-1&&n[o]>t;)--o;if(++o,s!==0||o!==i){s>=o&&(o=Math.max(o,1),s=o-1);const a=this.getValueSize();this.times=n.slice(s,o),this.values=this.values.slice(s*a,o*a)}return this}validate(){let e=!0;const t=this.getValueSize();t-Math.floor(t)!==0&&(Et("KeyframeTrack: Invalid value size in track.",this),e=!1);const n=this.times,i=this.values,s=n.length;s===0&&(Et("KeyframeTrack: Track is empty.",this),e=!1);let o=null;for(let a=0;a!==s;a++){const l=n[a];if(typeof l=="number"&&isNaN(l)){Et("KeyframeTrack: Time is not a valid number.",this,a,l),e=!1;break}if(o!==null&&o>l){Et("KeyframeTrack: Out of order keys.",this,a,l,o),e=!1;break}o=l}if(i!==void 0&&nb(i))for(let a=0,l=i.length;a!==l;++a){const c=i[a];if(isNaN(c)){Et("KeyframeTrack: Value is not a valid number.",this,a,c),e=!1;break}}return e}optimize(){const e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===Gu,s=e.length-1;let o=1;for(let a=1;a<s;++a){let l=!1;const c=e[a],u=e[a+1];if(c!==u&&(a!==1||c!==e[0]))if(i)l=!0;else{const d=a*n,f=d-n,h=d+n;for(let _=0;_!==n;++_){const g=t[d+_];if(g!==t[f+_]||g!==t[h+_]){l=!0;break}}}if(l){if(a!==o){e[o]=e[a];const d=a*n,f=o*n;for(let h=0;h!==n;++h)t[f+h]=t[d+h]}++o}}if(s>0){e[o]=e[s];for(let a=s*n,l=o*n,c=0;c!==n;++c)t[l+c]=t[a+c];++o}return o!==e.length?(this.times=e.slice(0,o),this.values=t.slice(0,o*n)):(this.times=e,this.values=t),this}clone(){const e=this.times.slice(),t=this.values.slice(),n=this.constructor,i=new n(this.name,e,t);return i.createInterpolant=this.createInterpolant,i}}er.prototype.ValueTypeName="";er.prototype.TimeBufferType=Float32Array;er.prototype.ValueBufferType=Float32Array;er.prototype.DefaultInterpolation=Pl;class Aa extends er{constructor(e,t,n){super(e,t,n)}}Aa.prototype.ValueTypeName="bool";Aa.prototype.ValueBufferType=Array;Aa.prototype.DefaultInterpolation=Rl;Aa.prototype.InterpolantFactoryMethodLinear=void 0;Aa.prototype.InterpolantFactoryMethodSmooth=void 0;class Vg extends er{constructor(e,t,n,i){super(e,t,n,i)}}Vg.prototype.ValueTypeName="color";class ma extends er{constructor(e,t,n,i){super(e,t,n,i)}}ma.prototype.ValueTypeName="number";class ab extends ql{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){const s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=(n-t)/(i-t);let c=e*a;for(let u=c+a;c!==u;c+=4)As.slerpFlat(s,0,o,c-a,o,c,l);return s}}class ga extends er{constructor(e,t,n,i){super(e,t,n,i)}InterpolantFactoryMethodLinear(e){return new ab(this.times,this.values,this.getValueSize(),e)}}ga.prototype.ValueTypeName="quaternion";ga.prototype.InterpolantFactoryMethodSmooth=void 0;class Ca extends er{constructor(e,t,n){super(e,t,n)}}Ca.prototype.ValueTypeName="string";Ca.prototype.ValueBufferType=Array;Ca.prototype.DefaultInterpolation=Rl;Ca.prototype.InterpolantFactoryMethodLinear=void 0;Ca.prototype.InterpolantFactoryMethodSmooth=void 0;class _a extends er{constructor(e,t,n,i){super(e,t,n,i)}}_a.prototype.ValueTypeName="vector";class lb{constructor(e="",t=-1,n=[],i=Gv){this.name=e,this.tracks=n,this.duration=t,this.blendMode=i,this.uuid=Zi(),this.userData={},this.duration<0&&this.resetDuration()}static parse(e){const t=[],n=e.tracks,i=1/(e.fps||1);for(let o=0,a=n.length;o!==a;++o)t.push(ub(n[o]).scale(i));const s=new this(e.name,e.duration,t,e.blendMode);return s.uuid=e.uuid,s.userData=JSON.parse(e.userData||"{}"),s}static toJSON(e){const t=[],n=e.tracks,i={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode,userData:JSON.stringify(e.userData)};for(let s=0,o=n.length;s!==o;++s)t.push(er.toJSON(n[s]));return i}static CreateFromMorphTargetSequence(e,t,n,i){const s=t.length,o=[];for(let a=0;a<s;a++){let l=[],c=[];l.push((a+s-1)%s,a,(a+1)%s),c.push(0,1,0);const u=ib(l);l=gm(l,1,u),c=gm(c,1,u),!i&&l[0]===0&&(l.push(s),c.push(c[0])),o.push(new ma(".morphTargetInfluences["+t[a].name+"]",l,c).scale(1/n))}return new this(e,-1,o)}static findByName(e,t){let n=e;if(!Array.isArray(e)){const i=e;n=i.geometry&&i.geometry.animations||i.animations}for(let i=0;i<n.length;i++)if(n[i].name===t)return n[i];return null}static CreateClipsFromMorphTargetSequences(e,t,n){const i={},s=/^([\w-]*?)([\d]+)$/;for(let a=0,l=e.length;a<l;a++){const c=e[a],u=c.name.match(s);if(u&&u.length>1){const d=u[1];let f=i[d];f||(i[d]=f=[]),f.push(c)}}const o=[];for(const a in i)o.push(this.CreateFromMorphTargetSequence(a,i[a],t,n));return o}static parseAnimation(e,t){if(lt("AnimationClip: parseAnimation() is deprecated and will be removed with r185"),!e)return Et("AnimationClip: No animation in JSONLoader data."),null;const n=function(d,f,h,_,g){if(h.length!==0){const m=[],p=[];zg(h,m,p,_),m.length!==0&&g.push(new d(f,m,p))}},i=[],s=e.name||"default",o=e.fps||30,a=e.blendMode;let l=e.length||-1;const c=e.hierarchy||[];for(let d=0;d<c.length;d++){const f=c[d].keys;if(!(!f||f.length===0))if(f[0].morphTargets){const h={};let _;for(_=0;_<f.length;_++)if(f[_].morphTargets)for(let g=0;g<f[_].morphTargets.length;g++)h[f[_].morphTargets[g]]=-1;for(const g in h){const m=[],p=[];for(let y=0;y!==f[_].morphTargets.length;++y){const v=f[_];m.push(v.time),p.push(v.morphTarget===g?1:0)}i.push(new ma(".morphTargetInfluence["+g+"]",m,p))}l=h.length*o}else{const h=".bones["+t[d].name+"]";n(_a,h+".position",f,"pos",i),n(ga,h+".quaternion",f,"rot",i),n(_a,h+".scale",f,"scl",i)}}return i.length===0?null:new this(s,l,i,a)}resetDuration(){const e=this.tracks;let t=0;for(let n=0,i=e.length;n!==i;++n){const s=this.tracks[n];t=Math.max(t,s.times[s.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){const e=[];for(let n=0;n<this.tracks.length;n++)e.push(this.tracks[n].clone());const t=new this.constructor(this.name,this.duration,e,this.blendMode);return t.userData=JSON.parse(JSON.stringify(this.userData)),t}toJSON(){return this.constructor.toJSON(this)}}function cb(r){switch(r.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return ma;case"vector":case"vector2":case"vector3":case"vector4":return _a;case"color":return Vg;case"quaternion":return ga;case"bool":case"boolean":return Aa;case"string":return Ca}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+r)}function ub(r){if(r.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");const e=cb(r.type);if(r.times===void 0){const t=[],n=[];zg(r.keys,t,n,"value"),r.times=t,r.values=n}return e.parse!==void 0?e.parse(r):new e(r.name,r.times,r.values,r.interpolation)}const Br={enabled:!1,files:{},add:function(r,e){this.enabled!==!1&&(this.files[r]=e)},get:function(r){if(this.enabled!==!1)return this.files[r]},remove:function(r){delete this.files[r]},clear:function(){this.files={}}};class db{constructor(e,t,n){const i=this;let s=!1,o=0,a=0,l;const c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this._abortController=null,this.itemStart=function(u){a++,s===!1&&i.onStart!==void 0&&i.onStart(u,o,a),s=!0},this.itemEnd=function(u){o++,i.onProgress!==void 0&&i.onProgress(u,o,a),o===a&&(s=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(u){i.onError!==void 0&&i.onError(u)},this.resolveURL=function(u){return l?l(u):u},this.setURLModifier=function(u){return l=u,this},this.addHandler=function(u,d){return c.push(u,d),this},this.removeHandler=function(u){const d=c.indexOf(u);return d!==-1&&c.splice(d,2),this},this.getHandler=function(u){for(let d=0,f=c.length;d<f;d+=2){const h=c[d],_=c[d+1];if(h.global&&(h.lastIndex=0),h.test(u))return _}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}}const fb=new db;class go{constructor(e){this.manager=e!==void 0?e:fb,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){const n=this;return new Promise(function(i,s){n.load(e,i,t,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}}go.DEFAULT_MATERIAL_NAME="__DEFAULT";const Rr={};class hb extends Error{constructor(e,t){super(e),this.response=t}}class du extends go{constructor(e){super(e),this.mimeType="",this.responseType="",this._abortController=new AbortController}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=Br.get(`file:${e}`);if(s!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(s),this.manager.itemEnd(e)},0),s;if(Rr[e]!==void 0){Rr[e].push({onLoad:t,onProgress:n,onError:i});return}Rr[e]=[],Rr[e].push({onLoad:t,onProgress:n,onError:i});const o=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin",signal:typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal}),a=this.mimeType,l=this.responseType;fetch(o).then(c=>{if(c.status===200||c.status===0){if(c.status===0&&lt("FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||c.body===void 0||c.body.getReader===void 0)return c;const u=Rr[e],d=c.body.getReader(),f=c.headers.get("X-File-Size")||c.headers.get("Content-Length"),h=f?parseInt(f):0,_=h!==0;let g=0;const m=new ReadableStream({start(p){y();function y(){d.read().then(({done:v,value:x})=>{if(v)p.close();else{g+=x.byteLength;const E=new ProgressEvent("progress",{lengthComputable:_,loaded:g,total:h});for(let b=0,S=u.length;b<S;b++){const P=u[b];P.onProgress&&P.onProgress(E)}p.enqueue(x),y()}},v=>{p.error(v)})}}});return new Response(m)}else throw new hb(`fetch for "${c.url}" responded with ${c.status}: ${c.statusText}`,c)}).then(c=>{switch(l){case"arraybuffer":return c.arrayBuffer();case"blob":return c.blob();case"document":return c.text().then(u=>new DOMParser().parseFromString(u,a));case"json":return c.json();default:if(a==="")return c.text();{const d=/charset="?([^;"\s]*)"?/i.exec(a),f=d&&d[1]?d[1].toLowerCase():void 0,h=new TextDecoder(f);return c.arrayBuffer().then(_=>h.decode(_))}}}).then(c=>{Br.add(`file:${e}`,c);const u=Rr[e];delete Rr[e];for(let d=0,f=u.length;d<f;d++){const h=u[d];h.onLoad&&h.onLoad(c)}}).catch(c=>{const u=Rr[e];if(u===void 0)throw this.manager.itemError(e),c;delete Rr[e];for(let d=0,f=u.length;d<f;d++){const h=u[d];h.onError&&h.onError(c)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}}const Uo=new WeakMap;class pb extends go{constructor(e){super(e)}load(e,t,n,i){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=this,o=Br.get(`image:${e}`);if(o!==void 0){if(o.complete===!0)s.manager.itemStart(e),setTimeout(function(){t&&t(o),s.manager.itemEnd(e)},0);else{let d=Uo.get(o);d===void 0&&(d=[],Uo.set(o,d)),d.push({onLoad:t,onError:i})}return o}const a=Ll("img");function l(){u(),t&&t(this);const d=Uo.get(this)||[];for(let f=0;f<d.length;f++){const h=d[f];h.onLoad&&h.onLoad(this)}Uo.delete(this),s.manager.itemEnd(e)}function c(d){u(),i&&i(d),Br.remove(`image:${e}`);const f=Uo.get(this)||[];for(let h=0;h<f.length;h++){const _=f[h];_.onError&&_.onError(d)}Uo.delete(this),s.manager.itemError(e),s.manager.itemEnd(e)}function u(){a.removeEventListener("load",l,!1),a.removeEventListener("error",c,!1)}return a.addEventListener("load",l,!1),a.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),Br.add(`image:${e}`,a),s.manager.itemStart(e),a.src=e,a}}class mb extends go{constructor(e){super(e)}load(e,t,n,i){const s=new An,o=new pb(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(e,function(a){s.image=a,s.needsUpdate=!0,t!==void 0&&t(s)},n,i),s}}class Lu extends un{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Qe(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}const md=new yt,_m=new q,xm=new q;class Gh{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Rt(512,512),this.mapType=vr,this.map=null,this.mapPass=null,this.matrix=new yt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new zh,this._frameExtents=new Rt(1,1),this._viewportCount=1,this._viewports=[new Wt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;_m.setFromMatrixPosition(e.matrixWorld),t.position.copy(_m),xm.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(xm),t.updateMatrixWorld(),md.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(md,t.coordinateSystem,t.reversedDepth),t.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(md)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class gb extends Gh{constructor(){super(new ai(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(e){const t=this.camera,n=ha*2*e.angle*this.focus,i=this.mapSize.width/this.mapSize.height*this.aspect,s=e.distance||t.far;(n!==t.fov||i!==t.aspect||s!==t.far)&&(t.fov=n,t.aspect=i,t.far=s,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}}class _b extends Lu{constructor(e,t,n=0,i=Math.PI/3,s=0,o=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(un.DEFAULT_UP),this.updateMatrix(),this.target=new un,this.distance=n,this.angle=i,this.penumbra=s,this.decay=o,this.map=null,this.shadow=new gb}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}const vm=new yt,ka=new q,gd=new q;class xb extends Gh{constructor(){super(new ai(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new Rt(4,2),this._viewportCount=6,this._viewports=[new Wt(2,1,1,1),new Wt(0,1,1,1),new Wt(3,1,1,1),new Wt(1,1,1,1),new Wt(3,0,1,1),new Wt(1,0,1,1)],this._cubeDirections=[new q(1,0,0),new q(-1,0,0),new q(0,0,1),new q(0,0,-1),new q(0,1,0),new q(0,-1,0)],this._cubeUps=[new q(0,1,0),new q(0,1,0),new q(0,1,0),new q(0,1,0),new q(0,0,1),new q(0,0,-1)]}updateMatrices(e,t=0){const n=this.camera,i=this.matrix,s=e.distance||n.far;s!==n.far&&(n.far=s,n.updateProjectionMatrix()),ka.setFromMatrixPosition(e.matrixWorld),n.position.copy(ka),gd.copy(n.position),gd.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(gd),n.updateMatrixWorld(),i.makeTranslation(-ka.x,-ka.y,-ka.z),vm.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(vm,n.coordinateSystem,n.reversedDepth)}}class vb extends Lu{constructor(e,t,n=0,i=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new xb}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class Du extends Dg{constructor(e=-1,t=1,n=1,i=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=i,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,i,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let s=n-e,o=n+e,a=i+t,l=i-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,o=s+c*this.view.width,a-=u*this.view.offsetY,l=a-u*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class yb extends Gh{constructor(){super(new Du(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Hg extends Lu{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(un.DEFAULT_UP),this.updateMatrix(),this.target=new un,this.shadow=new yb}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class bb extends Lu{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}class ll{static extractUrlBase(e){const t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}}const _d=new WeakMap;class Sb extends go{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&lt("ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&lt("ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"},this._abortController=new AbortController}setOptions(e){return this.options=e,this}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=this,o=Br.get(`image-bitmap:${e}`);if(o!==void 0){if(s.manager.itemStart(e),o.then){o.then(c=>{if(_d.has(o)===!0)i&&i(_d.get(o)),s.manager.itemError(e),s.manager.itemEnd(e);else return t&&t(c),s.manager.itemEnd(e),c});return}return setTimeout(function(){t&&t(o),s.manager.itemEnd(e)},0),o}const a={};a.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",a.headers=this.requestHeader,a.signal=typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal;const l=fetch(e,a).then(function(c){return c.blob()}).then(function(c){return createImageBitmap(c,Object.assign(s.options,{colorSpaceConversion:"none"}))}).then(function(c){return Br.add(`image-bitmap:${e}`,c),t&&t(c),s.manager.itemEnd(e),c}).catch(function(c){i&&i(c),_d.set(l,c),Br.remove(`image-bitmap:${e}`),s.manager.itemError(e),s.manager.itemEnd(e)});Br.add(`image-bitmap:${e}`,l),s.manager.itemStart(e)}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}}class wb extends ai{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}const Wh="\\[\\]\\.:\\/",Mb=new RegExp("["+Wh+"]","g"),Xh="[^"+Wh+"]",Tb="[^"+Wh.replace("\\.","")+"]",Eb=/((?:WC+[\/:])*)/.source.replace("WC",Xh),Ab=/(WCOD+)?/.source.replace("WCOD",Tb),Cb=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Xh),Rb=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Xh),Pb=new RegExp("^"+Eb+Ab+Cb+Rb+"$"),Lb=["material","materials","bones","map"];class Db{constructor(e,t,n){const i=n||Yt.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,i)}getValue(e,t){this.bind();const n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(e,t)}setValue(e,t){const n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,s=n.length;i!==s;++i)n[i].setValue(e,t)}bind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}}class Yt{constructor(e,t,n){this.path=t,this.parsedPath=n||Yt.parseTrackName(t),this.node=Yt.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new Yt.Composite(e,t,n):new Yt(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(Mb,"")}static parseTrackName(e){const t=Pb.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);const n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){const s=n.nodeName.substring(i+1);Lb.indexOf(s)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=s)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){const n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){const n=function(s){for(let o=0;o<s.length;o++){const a=s[o];if(a.name===t||a.uuid===t)return a;const l=n(a.children);if(l)return l}return null},i=n(e.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)e[t++]=n[i]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++]}_setValue_array_setNeedsUpdate(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node;const t=this.parsedPath,n=t.objectName,i=t.propertyName;let s=t.propertyIndex;if(e||(e=Yt.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){lt("PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=t.objectIndex;switch(n){case"materials":if(!e.material){Et("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){Et("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){Et("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let u=0;u<e.length;u++)if(e[u].name===c){c=u;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){Et("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){Et("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){Et("PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(c!==void 0){if(e[c]===void 0){Et("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}const o=e[i];if(o===void 0){const c=t.nodeName;Et("PropertyBinding: Trying to update property for track: "+c+"."+i+" but it wasn't found.",e);return}let a=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?a=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(s!==void 0){if(i==="morphTargetInfluences"){if(!e.geometry){Et("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){Et("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[s]!==void 0&&(s=e.morphTargetDictionary[s])}l=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=s}else o.fromArray!==void 0&&o.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(l=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=i;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}Yt.Composite=Db;Yt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Yt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Yt.prototype.GetterByBindingType=[Yt.prototype._getValue_direct,Yt.prototype._getValue_array,Yt.prototype._getValue_arrayElement,Yt.prototype._getValue_toArray];Yt.prototype.SetterByBindingTypeAndVersioning=[[Yt.prototype._setValue_direct,Yt.prototype._setValue_direct_setNeedsUpdate,Yt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Yt.prototype._setValue_array,Yt.prototype._setValue_array_setNeedsUpdate,Yt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Yt.prototype._setValue_arrayElement,Yt.prototype._setValue_arrayElement_setNeedsUpdate,Yt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Yt.prototype._setValue_fromArray,Yt.prototype._setValue_fromArray_setNeedsUpdate,Yt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];function ym(r,e,t,n){const i=Ib(n);switch(t){case yg:return r*e;case Lh:return r*e/i.components*i.byteLength;case Dh:return r*e/i.components*i.byteLength;case Ih:return r*e*2/i.components*i.byteLength;case Oh:return r*e*2/i.components*i.byteLength;case bg:return r*e*3/i.components*i.byteLength;case Ui:return r*e*4/i.components*i.byteLength;case Nh:return r*e*4/i.components*i.byteLength;case Hc:case Gc:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*8;case Wc:case Xc:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case of:case lf:return Math.max(r,16)*Math.max(e,8)/4;case sf:case af:return Math.max(r,8)*Math.max(e,8)/2;case cf:case uf:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*8;case df:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case ff:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case hf:return Math.floor((r+4)/5)*Math.floor((e+3)/4)*16;case pf:return Math.floor((r+4)/5)*Math.floor((e+4)/5)*16;case mf:return Math.floor((r+5)/6)*Math.floor((e+4)/5)*16;case gf:return Math.floor((r+5)/6)*Math.floor((e+5)/6)*16;case _f:return Math.floor((r+7)/8)*Math.floor((e+4)/5)*16;case xf:return Math.floor((r+7)/8)*Math.floor((e+5)/6)*16;case vf:return Math.floor((r+7)/8)*Math.floor((e+7)/8)*16;case yf:return Math.floor((r+9)/10)*Math.floor((e+4)/5)*16;case bf:return Math.floor((r+9)/10)*Math.floor((e+5)/6)*16;case Sf:return Math.floor((r+9)/10)*Math.floor((e+7)/8)*16;case wf:return Math.floor((r+9)/10)*Math.floor((e+9)/10)*16;case Mf:return Math.floor((r+11)/12)*Math.floor((e+9)/10)*16;case Tf:return Math.floor((r+11)/12)*Math.floor((e+11)/12)*16;case Ef:case Af:case Cf:return Math.ceil(r/4)*Math.ceil(e/4)*16;case Rf:case Pf:return Math.ceil(r/4)*Math.ceil(e/4)*8;case Lf:case Df:return Math.ceil(r/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Ib(r){switch(r){case vr:case gg:return{byteLength:1,components:1};case Tl:case _g:case Ta:return{byteLength:2,components:1};case Rh:case Ph:return{byteLength:2,components:4};case lo:case Ch:case Ki:return{byteLength:4,components:1};case xg:case vg:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${r}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Ah}}));typeof window<"u"&&(window.__THREE__?lt("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Ah);/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function Gg(){let r=null,e=!1,t=null,n=null;function i(s,o){t(s,o),n=r.requestAnimationFrame(i)}return{start:function(){e!==!0&&t!==null&&(n=r.requestAnimationFrame(i),e=!0)},stop:function(){r.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){r=s}}}function Ob(r){const e=new WeakMap;function t(a,l){const c=a.array,u=a.usage,d=c.byteLength,f=r.createBuffer();r.bindBuffer(l,f),r.bufferData(l,c,u),a.onUploadCallback();let h;if(c instanceof Float32Array)h=r.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)h=r.HALF_FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?h=r.HALF_FLOAT:h=r.UNSIGNED_SHORT;else if(c instanceof Int16Array)h=r.SHORT;else if(c instanceof Uint32Array)h=r.UNSIGNED_INT;else if(c instanceof Int32Array)h=r.INT;else if(c instanceof Int8Array)h=r.BYTE;else if(c instanceof Uint8Array)h=r.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)h=r.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:f,type:h,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:d}}function n(a,l,c){const u=l.array,d=l.updateRanges;if(r.bindBuffer(c,a),d.length===0)r.bufferSubData(c,0,u);else{d.sort((h,_)=>h.start-_.start);let f=0;for(let h=1;h<d.length;h++){const _=d[f],g=d[h];g.start<=_.start+_.count+1?_.count=Math.max(_.count,g.start+g.count-_.start):(++f,d[f]=g)}d.length=f+1;for(let h=0,_=d.length;h<_;h++){const g=d[h];r.bufferSubData(c,g.start*u.BYTES_PER_ELEMENT,u,g.start,g.count)}l.clearUpdateRanges()}l.onUploadCallback()}function i(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function s(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=e.get(a);l&&(r.deleteBuffer(l.buffer),e.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const u=e.get(a);(!u||u.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const c=e.get(a);if(c===void 0)e.set(a,t(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,a,l),c.version=a.version}}return{get:i,remove:s,update:o}}var Nb=`#ifdef USE_ALPHAHASH
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
#endif`,Ub=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,kb=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Bb=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,zb=`#ifdef USE_ALPHATEST
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
#endif`,Hb=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Gb=`#ifdef USE_BATCHING
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
#endif`,Wb=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Xb=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,qb=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Yb=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,jb=`#ifdef USE_IRIDESCENCE
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
#endif`,$b=`#ifdef USE_BUMPMAP
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
#endif`,Kb=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Zb=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Jb=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Qb=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,eS=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,tS=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,nS=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,iS=`#if defined( USE_COLOR_ALPHA )
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
#endif`,rS=`#define PI 3.141592653589793
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
} // validated`,sS=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,oS=`vec3 transformedNormal = objectNormal;
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
#endif`,aS=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,lS=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,cS=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,uS=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,dS="gl_FragColor = linearToOutputTexel( gl_FragColor );",fS=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,hS=`#ifdef USE_ENVMAP
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
#endif`,pS=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,mS=`#ifdef USE_ENVMAP
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
#endif`,gS=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,_S=`#ifdef USE_ENVMAP
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
#endif`,xS=`#ifdef USE_FOG
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
#endif`,bS=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,SS=`#ifdef USE_GRADIENTMAP
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
}`,wS=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,MS=`LambertMaterial material;
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
#endif`,AS=`#ifdef USE_ENVMAP
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
#endif`,CS=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,RS=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,PS=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,LS=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,DS=`PhysicalMaterial material;
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
#endif`,IS=`uniform sampler2D dfgLUT;
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
}`,OS=`
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
#endif`,NS=`#if defined( RE_IndirectDiffuse )
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
#endif`,US=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,kS=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,BS=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,zS=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,VS=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,HS=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,GS=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,WS=`#if defined( USE_POINTS_UV )
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
#endif`,XS=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,qS=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,YS=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,jS=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,$S=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,KS=`#ifdef USE_MORPHTARGETS
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
#endif`,ZS=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,JS=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,QS=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,e1=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,t1=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,n1=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,i1=`#ifdef USE_NORMALMAP
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
#endif`,r1=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,s1=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,o1=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,a1=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,l1=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,c1=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,u1=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,d1=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,f1=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,h1=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,p1=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,m1=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,g1=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,_1=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,x1=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,v1=`float getShadowMask() {
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
}`,y1=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,b1=`#ifdef USE_SKINNING
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
#endif`,S1=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,w1=`#ifdef USE_SKINNING
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
#endif`,M1=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,T1=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,E1=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,A1=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,C1=`#ifdef USE_TRANSMISSION
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
#endif`,R1=`#ifdef USE_TRANSMISSION
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
#endif`,P1=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,L1=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,D1=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,I1=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const O1=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,N1=`uniform sampler2D t2D;
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
}`,F1=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,U1=`#ifdef ENVMAP_TYPE_CUBE
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
}`,k1=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,B1=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,z1=`#include <common>
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
}`,V1=`#if DEPTH_PACKING == 3200
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
}`,H1=`#define DISTANCE
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
}`,G1=`#define DISTANCE
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
}`,W1=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,X1=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,q1=`uniform float scale;
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
}`,Y1=`uniform vec3 diffuse;
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
}`,j1=`#include <common>
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
}`,$1=`uniform vec3 diffuse;
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
}`,K1=`#define LAMBERT
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
}`,Z1=`#define LAMBERT
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
}`,J1=`#define MATCAP
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
}`,Q1=`#define MATCAP
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
}`,ew=`#define NORMAL
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
}`,tw=`#define NORMAL
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
}`,nw=`#define PHONG
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
}`,iw=`#define PHONG
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
}`,rw=`#define STANDARD
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
}`,sw=`#define STANDARD
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
}`,ow=`#define TOON
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
}`,aw=`#define TOON
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
}`,lw=`uniform float size;
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
}`,cw=`uniform vec3 diffuse;
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
}`,uw=`#include <common>
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
}`,dw=`uniform vec3 color;
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
}`,fw=`uniform float rotation;
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
}`,hw=`uniform vec3 diffuse;
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
}`,vt={alphahash_fragment:Nb,alphahash_pars_fragment:Fb,alphamap_fragment:Ub,alphamap_pars_fragment:kb,alphatest_fragment:Bb,alphatest_pars_fragment:zb,aomap_fragment:Vb,aomap_pars_fragment:Hb,batching_pars_vertex:Gb,batching_vertex:Wb,begin_vertex:Xb,beginnormal_vertex:qb,bsdfs:Yb,iridescence_fragment:jb,bumpmap_pars_fragment:$b,clipping_planes_fragment:Kb,clipping_planes_pars_fragment:Zb,clipping_planes_pars_vertex:Jb,clipping_planes_vertex:Qb,color_fragment:eS,color_pars_fragment:tS,color_pars_vertex:nS,color_vertex:iS,common:rS,cube_uv_reflection_fragment:sS,defaultnormal_vertex:oS,displacementmap_pars_vertex:aS,displacementmap_vertex:lS,emissivemap_fragment:cS,emissivemap_pars_fragment:uS,colorspace_fragment:dS,colorspace_pars_fragment:fS,envmap_fragment:hS,envmap_common_pars_fragment:pS,envmap_pars_fragment:mS,envmap_pars_vertex:gS,envmap_physical_pars_fragment:AS,envmap_vertex:_S,fog_vertex:xS,fog_pars_vertex:vS,fog_fragment:yS,fog_pars_fragment:bS,gradientmap_pars_fragment:SS,lightmap_pars_fragment:wS,lights_lambert_fragment:MS,lights_lambert_pars_fragment:TS,lights_pars_begin:ES,lights_toon_fragment:CS,lights_toon_pars_fragment:RS,lights_phong_fragment:PS,lights_phong_pars_fragment:LS,lights_physical_fragment:DS,lights_physical_pars_fragment:IS,lights_fragment_begin:OS,lights_fragment_maps:NS,lights_fragment_end:FS,logdepthbuf_fragment:US,logdepthbuf_pars_fragment:kS,logdepthbuf_pars_vertex:BS,logdepthbuf_vertex:zS,map_fragment:VS,map_pars_fragment:HS,map_particle_fragment:GS,map_particle_pars_fragment:WS,metalnessmap_fragment:XS,metalnessmap_pars_fragment:qS,morphinstance_vertex:YS,morphcolor_vertex:jS,morphnormal_vertex:$S,morphtarget_pars_vertex:KS,morphtarget_vertex:ZS,normal_fragment_begin:JS,normal_fragment_maps:QS,normal_pars_fragment:e1,normal_pars_vertex:t1,normal_vertex:n1,normalmap_pars_fragment:i1,clearcoat_normal_fragment_begin:r1,clearcoat_normal_fragment_maps:s1,clearcoat_pars_fragment:o1,iridescence_pars_fragment:a1,opaque_fragment:l1,packing:c1,premultiplied_alpha_fragment:u1,project_vertex:d1,dithering_fragment:f1,dithering_pars_fragment:h1,roughnessmap_fragment:p1,roughnessmap_pars_fragment:m1,shadowmap_pars_fragment:g1,shadowmap_pars_vertex:_1,shadowmap_vertex:x1,shadowmask_pars_fragment:v1,skinbase_vertex:y1,skinning_pars_vertex:b1,skinning_vertex:S1,skinnormal_vertex:w1,specularmap_fragment:M1,specularmap_pars_fragment:T1,tonemapping_fragment:E1,tonemapping_pars_fragment:A1,transmission_fragment:C1,transmission_pars_fragment:R1,uv_pars_fragment:P1,uv_pars_vertex:L1,uv_vertex:D1,worldpos_vertex:I1,background_vert:O1,background_frag:N1,backgroundCube_vert:F1,backgroundCube_frag:U1,cube_vert:k1,cube_frag:B1,depth_vert:z1,depth_frag:V1,distanceRGBA_vert:H1,distanceRGBA_frag:G1,equirect_vert:W1,equirect_frag:X1,linedashed_vert:q1,linedashed_frag:Y1,meshbasic_vert:j1,meshbasic_frag:$1,meshlambert_vert:K1,meshlambert_frag:Z1,meshmatcap_vert:J1,meshmatcap_frag:Q1,meshnormal_vert:ew,meshnormal_frag:tw,meshphong_vert:nw,meshphong_frag:iw,meshphysical_vert:rw,meshphysical_frag:sw,meshtoon_vert:ow,meshtoon_frag:aw,points_vert:lw,points_frag:cw,shadow_vert:uw,shadow_frag:dw,sprite_vert:fw,sprite_frag:hw},Ne={common:{diffuse:{value:new Qe(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new gt},alphaMap:{value:null},alphaMapTransform:{value:new gt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new gt}},envmap:{envMap:{value:null},envMapRotation:{value:new gt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new gt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new gt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new gt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new gt},normalScale:{value:new Rt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new gt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new gt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new gt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new gt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Qe(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Qe(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new gt},alphaTest:{value:0},uvTransform:{value:new gt}},sprite:{diffuse:{value:new Qe(16777215)},opacity:{value:1},center:{value:new Rt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new gt},alphaMap:{value:null},alphaMapTransform:{value:new gt},alphaTest:{value:0}}},lr={basic:{uniforms:Zn([Ne.common,Ne.specularmap,Ne.envmap,Ne.aomap,Ne.lightmap,Ne.fog]),vertexShader:vt.meshbasic_vert,fragmentShader:vt.meshbasic_frag},lambert:{uniforms:Zn([Ne.common,Ne.specularmap,Ne.envmap,Ne.aomap,Ne.lightmap,Ne.emissivemap,Ne.bumpmap,Ne.normalmap,Ne.displacementmap,Ne.fog,Ne.lights,{emissive:{value:new Qe(0)}}]),vertexShader:vt.meshlambert_vert,fragmentShader:vt.meshlambert_frag},phong:{uniforms:Zn([Ne.common,Ne.specularmap,Ne.envmap,Ne.aomap,Ne.lightmap,Ne.emissivemap,Ne.bumpmap,Ne.normalmap,Ne.displacementmap,Ne.fog,Ne.lights,{emissive:{value:new Qe(0)},specular:{value:new Qe(1118481)},shininess:{value:30}}]),vertexShader:vt.meshphong_vert,fragmentShader:vt.meshphong_frag},standard:{uniforms:Zn([Ne.common,Ne.envmap,Ne.aomap,Ne.lightmap,Ne.emissivemap,Ne.bumpmap,Ne.normalmap,Ne.displacementmap,Ne.roughnessmap,Ne.metalnessmap,Ne.fog,Ne.lights,{emissive:{value:new Qe(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:vt.meshphysical_vert,fragmentShader:vt.meshphysical_frag},toon:{uniforms:Zn([Ne.common,Ne.aomap,Ne.lightmap,Ne.emissivemap,Ne.bumpmap,Ne.normalmap,Ne.displacementmap,Ne.gradientmap,Ne.fog,Ne.lights,{emissive:{value:new Qe(0)}}]),vertexShader:vt.meshtoon_vert,fragmentShader:vt.meshtoon_frag},matcap:{uniforms:Zn([Ne.common,Ne.bumpmap,Ne.normalmap,Ne.displacementmap,Ne.fog,{matcap:{value:null}}]),vertexShader:vt.meshmatcap_vert,fragmentShader:vt.meshmatcap_frag},points:{uniforms:Zn([Ne.points,Ne.fog]),vertexShader:vt.points_vert,fragmentShader:vt.points_frag},dashed:{uniforms:Zn([Ne.common,Ne.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:vt.linedashed_vert,fragmentShader:vt.linedashed_frag},depth:{uniforms:Zn([Ne.common,Ne.displacementmap]),vertexShader:vt.depth_vert,fragmentShader:vt.depth_frag},normal:{uniforms:Zn([Ne.common,Ne.bumpmap,Ne.normalmap,Ne.displacementmap,{opacity:{value:1}}]),vertexShader:vt.meshnormal_vert,fragmentShader:vt.meshnormal_frag},sprite:{uniforms:Zn([Ne.sprite,Ne.fog]),vertexShader:vt.sprite_vert,fragmentShader:vt.sprite_frag},background:{uniforms:{uvTransform:{value:new gt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:vt.background_vert,fragmentShader:vt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new gt}},vertexShader:vt.backgroundCube_vert,fragmentShader:vt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:vt.cube_vert,fragmentShader:vt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:vt.equirect_vert,fragmentShader:vt.equirect_frag},distanceRGBA:{uniforms:Zn([Ne.common,Ne.displacementmap,{referencePosition:{value:new q},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:vt.distanceRGBA_vert,fragmentShader:vt.distanceRGBA_frag},shadow:{uniforms:Zn([Ne.lights,Ne.fog,{color:{value:new Qe(0)},opacity:{value:1}}]),vertexShader:vt.shadow_vert,fragmentShader:vt.shadow_frag}};lr.physical={uniforms:Zn([lr.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new gt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new gt},clearcoatNormalScale:{value:new Rt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new gt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new gt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new gt},sheen:{value:0},sheenColor:{value:new Qe(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new gt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new gt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new gt},transmissionSamplerSize:{value:new Rt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new gt},attenuationDistance:{value:0},attenuationColor:{value:new Qe(0)},specularColor:{value:new Qe(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new gt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new gt},anisotropyVector:{value:new Rt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new gt}}]),vertexShader:vt.meshphysical_vert,fragmentShader:vt.meshphysical_frag};const yc={r:0,b:0,g:0},Ns=new yr,pw=new yt;function mw(r,e,t,n,i,s,o){const a=new Qe(0);let l=s===!0?0:1,c,u,d=null,f=0,h=null;function _(v){let x=v.isScene===!0?v.background:null;return x&&x.isTexture&&(x=(v.backgroundBlurriness>0?t:e).get(x)),x}function g(v){let x=!1;const E=_(v);E===null?p(a,l):E&&E.isColor&&(p(E,1),x=!0);const b=r.xr.getEnvironmentBlendMode();b==="additive"?n.buffers.color.setClear(0,0,0,1,o):b==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(r.autoClear||x)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil))}function m(v,x){const E=_(x);E&&(E.isCubeTexture||E.mapping===Cu)?(u===void 0&&(u=new pi(new Xl(1,1,1),new Ti({name:"BackgroundCubeMaterial",uniforms:pa(lr.backgroundCube.uniforms),vertexShader:lr.backgroundCube.vertexShader,fragmentShader:lr.backgroundCube.fragmentShader,side:li,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(b,S,P){this.matrixWorld.copyPosition(P.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(u)),Ns.copy(x.backgroundRotation),Ns.x*=-1,Ns.y*=-1,Ns.z*=-1,E.isCubeTexture&&E.isRenderTargetTexture===!1&&(Ns.y*=-1,Ns.z*=-1),u.material.uniforms.envMap.value=E,u.material.uniforms.flipEnvMap.value=E.isCubeTexture&&E.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=x.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(pw.makeRotationFromEuler(Ns)),u.material.toneMapped=Dt.getTransfer(E.colorSpace)!==jt,(d!==E||f!==E.version||h!==r.toneMapping)&&(u.material.needsUpdate=!0,d=E,f=E.version,h=r.toneMapping),u.layers.enableAll(),v.unshift(u,u.geometry,u.material,0,0,null)):E&&E.isTexture&&(c===void 0&&(c=new pi(new qi(2,2),new Ti({name:"BackgroundMaterial",uniforms:pa(lr.background.uniforms),vertexShader:lr.background.vertexShader,fragmentShader:lr.background.fragmentShader,side:qr,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=E,c.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,c.material.toneMapped=Dt.getTransfer(E.colorSpace)!==jt,E.matrixAutoUpdate===!0&&E.updateMatrix(),c.material.uniforms.uvTransform.value.copy(E.matrix),(d!==E||f!==E.version||h!==r.toneMapping)&&(c.material.needsUpdate=!0,d=E,f=E.version,h=r.toneMapping),c.layers.enableAll(),v.unshift(c,c.geometry,c.material,0,0,null))}function p(v,x){v.getRGB(yc,Lg(r)),n.buffers.color.setClear(yc.r,yc.g,yc.b,x,o)}function y(){u!==void 0&&(u.geometry.dispose(),u.material.dispose(),u=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(v,x=1){a.set(v),l=x,p(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(v){l=v,p(a,l)},render:g,addToRenderList:m,dispose:y}}function gw(r,e){const t=r.getParameter(r.MAX_VERTEX_ATTRIBS),n={},i=f(null);let s=i,o=!1;function a(M,L,F,G,U){let X=!1;const Z=d(G,F,L);s!==Z&&(s=Z,c(s.object)),X=h(M,G,F,U),X&&_(M,G,F,U),U!==null&&e.update(U,r.ELEMENT_ARRAY_BUFFER),(X||o)&&(o=!1,x(M,L,F,G),U!==null&&r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,e.get(U).buffer))}function l(){return r.createVertexArray()}function c(M){return r.bindVertexArray(M)}function u(M){return r.deleteVertexArray(M)}function d(M,L,F){const G=F.wireframe===!0;let U=n[M.id];U===void 0&&(U={},n[M.id]=U);let X=U[L.id];X===void 0&&(X={},U[L.id]=X);let Z=X[G];return Z===void 0&&(Z=f(l()),X[G]=Z),Z}function f(M){const L=[],F=[],G=[];for(let U=0;U<t;U++)L[U]=0,F[U]=0,G[U]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:L,enabledAttributes:F,attributeDivisors:G,object:M,attributes:{},index:null}}function h(M,L,F,G){const U=s.attributes,X=L.attributes;let Z=0;const C=F.getAttributes();for(const Y in C)if(C[Y].location>=0){const I=U[Y];let xe=X[Y];if(xe===void 0&&(Y==="instanceMatrix"&&M.instanceMatrix&&(xe=M.instanceMatrix),Y==="instanceColor"&&M.instanceColor&&(xe=M.instanceColor)),I===void 0||I.attribute!==xe||xe&&I.data!==xe.data)return!0;Z++}return s.attributesNum!==Z||s.index!==G}function _(M,L,F,G){const U={},X=L.attributes;let Z=0;const C=F.getAttributes();for(const Y in C)if(C[Y].location>=0){let I=X[Y];I===void 0&&(Y==="instanceMatrix"&&M.instanceMatrix&&(I=M.instanceMatrix),Y==="instanceColor"&&M.instanceColor&&(I=M.instanceColor));const xe={};xe.attribute=I,I&&I.data&&(xe.data=I.data),U[Y]=xe,Z++}s.attributes=U,s.attributesNum=Z,s.index=G}function g(){const M=s.newAttributes;for(let L=0,F=M.length;L<F;L++)M[L]=0}function m(M){p(M,0)}function p(M,L){const F=s.newAttributes,G=s.enabledAttributes,U=s.attributeDivisors;F[M]=1,G[M]===0&&(r.enableVertexAttribArray(M),G[M]=1),U[M]!==L&&(r.vertexAttribDivisor(M,L),U[M]=L)}function y(){const M=s.newAttributes,L=s.enabledAttributes;for(let F=0,G=L.length;F<G;F++)L[F]!==M[F]&&(r.disableVertexAttribArray(F),L[F]=0)}function v(M,L,F,G,U,X,Z){Z===!0?r.vertexAttribIPointer(M,L,F,U,X):r.vertexAttribPointer(M,L,F,G,U,X)}function x(M,L,F,G){g();const U=G.attributes,X=F.getAttributes(),Z=L.defaultAttributeValues;for(const C in X){const Y=X[C];if(Y.location>=0){let de=U[C];if(de===void 0&&(C==="instanceMatrix"&&M.instanceMatrix&&(de=M.instanceMatrix),C==="instanceColor"&&M.instanceColor&&(de=M.instanceColor)),de!==void 0){const I=de.normalized,xe=de.itemSize,ve=e.get(de);if(ve===void 0)continue;const ee=ve.buffer,Xe=ve.type,qe=ve.bytesPerElement,ne=Xe===r.INT||Xe===r.UNSIGNED_INT||de.gpuType===Ch;if(de.isInterleavedBufferAttribute){const ie=de.data,be=ie.stride,Ye=de.offset;if(ie.isInstancedInterleavedBuffer){for(let ye=0;ye<Y.locationSize;ye++)p(Y.location+ye,ie.meshPerAttribute);M.isInstancedMesh!==!0&&G._maxInstanceCount===void 0&&(G._maxInstanceCount=ie.meshPerAttribute*ie.count)}else for(let ye=0;ye<Y.locationSize;ye++)m(Y.location+ye);r.bindBuffer(r.ARRAY_BUFFER,ee);for(let ye=0;ye<Y.locationSize;ye++)v(Y.location+ye,xe/Y.locationSize,Xe,I,be*qe,(Ye+xe/Y.locationSize*ye)*qe,ne)}else{if(de.isInstancedBufferAttribute){for(let ie=0;ie<Y.locationSize;ie++)p(Y.location+ie,de.meshPerAttribute);M.isInstancedMesh!==!0&&G._maxInstanceCount===void 0&&(G._maxInstanceCount=de.meshPerAttribute*de.count)}else for(let ie=0;ie<Y.locationSize;ie++)m(Y.location+ie);r.bindBuffer(r.ARRAY_BUFFER,ee);for(let ie=0;ie<Y.locationSize;ie++)v(Y.location+ie,xe/Y.locationSize,Xe,I,xe*qe,xe/Y.locationSize*ie*qe,ne)}}else if(Z!==void 0){const I=Z[C];if(I!==void 0)switch(I.length){case 2:r.vertexAttrib2fv(Y.location,I);break;case 3:r.vertexAttrib3fv(Y.location,I);break;case 4:r.vertexAttrib4fv(Y.location,I);break;default:r.vertexAttrib1fv(Y.location,I)}}}}y()}function E(){P();for(const M in n){const L=n[M];for(const F in L){const G=L[F];for(const U in G)u(G[U].object),delete G[U];delete L[F]}delete n[M]}}function b(M){if(n[M.id]===void 0)return;const L=n[M.id];for(const F in L){const G=L[F];for(const U in G)u(G[U].object),delete G[U];delete L[F]}delete n[M.id]}function S(M){for(const L in n){const F=n[L];if(F[M.id]===void 0)continue;const G=F[M.id];for(const U in G)u(G[U].object),delete G[U];delete F[M.id]}}function P(){w(),o=!0,s!==i&&(s=i,c(s.object))}function w(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:a,reset:P,resetDefaultState:w,dispose:E,releaseStatesOfGeometry:b,releaseStatesOfProgram:S,initAttributes:g,enableAttribute:m,disableUnusedAttributes:y}}function _w(r,e,t){let n;function i(c){n=c}function s(c,u){r.drawArrays(n,c,u),t.update(u,n,1)}function o(c,u,d){d!==0&&(r.drawArraysInstanced(n,c,u,d),t.update(u,n,d))}function a(c,u,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,u,0,d);let h=0;for(let _=0;_<d;_++)h+=u[_];t.update(h,n,1)}function l(c,u,d,f){if(d===0)return;const h=e.get("WEBGL_multi_draw");if(h===null)for(let _=0;_<c.length;_++)o(c[_],u[_],f[_]);else{h.multiDrawArraysInstancedWEBGL(n,c,0,u,0,f,0,d);let _=0;for(let g=0;g<d;g++)_+=u[g]*f[g];t.update(_,n,1)}}this.setMode=i,this.render=s,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function xw(r,e,t,n){let i;function s(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){const S=e.get("EXT_texture_filter_anisotropic");i=r.getParameter(S.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(S){return!(S!==Ui&&n.convert(S)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(S){const P=S===Ta&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(S!==vr&&n.convert(S)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_TYPE)&&S!==Ki&&!P)}function l(S){if(S==="highp"){if(r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.HIGH_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision>0)return"highp";S="mediump"}return S==="mediump"&&r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.MEDIUM_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const u=l(c);u!==c&&(lt("WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);const d=t.logarithmicDepthBuffer===!0,f=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),h=r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS),_=r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS),g=r.getParameter(r.MAX_TEXTURE_SIZE),m=r.getParameter(r.MAX_CUBE_MAP_TEXTURE_SIZE),p=r.getParameter(r.MAX_VERTEX_ATTRIBS),y=r.getParameter(r.MAX_VERTEX_UNIFORM_VECTORS),v=r.getParameter(r.MAX_VARYING_VECTORS),x=r.getParameter(r.MAX_FRAGMENT_UNIFORM_VECTORS),E=_>0,b=r.getParameter(r.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:d,reversedDepthBuffer:f,maxTextures:h,maxVertexTextures:_,maxTextureSize:g,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:y,maxVaryings:v,maxFragmentUniforms:x,vertexTextures:E,maxSamples:b}}function vw(r){const e=this;let t=null,n=0,i=!1,s=!1;const o=new Vs,a=new gt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,f){const h=d.length!==0||f||n!==0||i;return i=f,n=d.length,h},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(d,f){t=u(d,f,0)},this.setState=function(d,f,h){const _=d.clippingPlanes,g=d.clipIntersection,m=d.clipShadows,p=r.get(d);if(!i||_===null||_.length===0||s&&!m)s?u(null):c();else{const y=s?0:n,v=y*4;let x=p.clippingState||null;l.value=x,x=u(_,f,v,h);for(let E=0;E!==v;++E)x[E]=t[E];p.clippingState=x,this.numIntersection=g?this.numPlanes:0,this.numPlanes+=y}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function u(d,f,h,_){const g=d!==null?d.length:0;let m=null;if(g!==0){if(m=l.value,_!==!0||m===null){const p=h+g*4,y=f.matrixWorldInverse;a.getNormalMatrix(y),(m===null||m.length<p)&&(m=new Float32Array(p));for(let v=0,x=h;v!==g;++v,x+=4)o.copy(d[v]).applyMatrix4(y,a),o.normal.toArray(m,x),m[x+3]=o.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=g,e.numIntersection=0,m}}function yw(r){let e=new WeakMap;function t(o,a){return a===nf?o.mapping=ua:a===rf&&(o.mapping=da),o}function n(o){if(o&&o.isTexture){const a=o.mapping;if(a===nf||a===rf)if(e.has(o)){const l=e.get(o).texture;return t(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new Hy(l.height);return c.fromEquirectangularTexture(r,o),e.set(o,c),o.addEventListener("dispose",i),t(c.texture,o.mapping)}else return null}}return o}function i(o){const a=o.target;a.removeEventListener("dispose",i);const l=e.get(a);l!==void 0&&(e.delete(a),l.dispose())}function s(){e=new WeakMap}return{get:n,dispose:s}}const cs=4,bm=[.125,.215,.35,.446,.526,.582],Ys=20,bw=512,Ba=new Du,Sm=new Qe;let xd=null,vd=0,yd=0,bd=!1;const Sw=new q;class wm{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,i=100,s={}){const{size:o=256,position:a=Sw}=s;xd=this._renderer.getRenderTarget(),vd=this._renderer.getActiveCubeFace(),yd=this._renderer.getActiveMipmapLevel(),bd=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,n,i,l,a),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Em(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Tm(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(xd,vd,yd),this._renderer.xr.enabled=bd,e.scissorTest=!1,ko(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===ua||e.mapping===da?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),xd=this._renderer.getRenderTarget(),vd=this._renderer.getActiveCubeFace(),yd=this._renderer.getActiveMipmapLevel(),bd=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:ri,minFilter:ri,generateMipmaps:!1,type:Ta,format:Ui,colorSpace:Yn,depthBuffer:!1},i=Mm(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Mm(e,t,n);const{_lodMax:s}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=ww(s)),this._blurMaterial=Tw(s,e,t)}return i}_compileMaterial(e){const t=new pi(new hi,e);this._renderer.compile(t,Ba)}_sceneToCubeUV(e,t,n,i,s){const l=new ai(90,1,t,n),c=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],d=this._renderer,f=d.autoClear,h=d.toneMapping;d.getClearColor(Sm),d.toneMapping=xs,d.autoClear=!1,d.state.buffers.depth.getReversed()&&(d.setRenderTarget(i),d.clearDepth(),d.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new pi(new Xl,new js({name:"PMREM.Background",side:li,depthWrite:!1,depthTest:!1})));const g=this._backgroundBox,m=g.material;let p=!1;const y=e.background;y?y.isColor&&(m.color.copy(y),e.background=null,p=!0):(m.color.copy(Sm),p=!0);for(let v=0;v<6;v++){const x=v%3;x===0?(l.up.set(0,c[v],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x+u[v],s.y,s.z)):x===1?(l.up.set(0,0,c[v]),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y+u[v],s.z)):(l.up.set(0,c[v],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y,s.z+u[v]));const E=this._cubeSize;ko(i,x*E,v>2?E:0,E,E),d.setRenderTarget(i),p&&d.render(g,l),d.render(e,l)}d.toneMapping=h,d.autoClear=f,e.background=y}_textureToCubeUV(e,t){const n=this._renderer,i=e.mapping===ua||e.mapping===da;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=Em()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Tm());const s=i?this._cubemapMaterial:this._equirectMaterial,o=this._lodMeshes[0];o.material=s;const a=s.uniforms;a.envMap.value=e;const l=this._cubeSize;ko(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(o,Ba)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const i=this._lodMeshes.length;for(let s=1;s<i;s++)this._applyGGXFilter(e,s-1,s);t.autoClear=n}_applyGGXFilter(e,t,n){const i=this._renderer,s=this._pingPongRenderTarget;if(this._ggxMaterial===null){const y=3*Math.max(this._cubeSize,16),v=4*this._cubeSize;this._ggxMaterial=Mw(this._lodMax,y,v)}const o=this._ggxMaterial,a=this._lodMeshes[n];a.material=o;const l=o.uniforms,c=n/(this._lodMeshes.length-1),u=t/(this._lodMeshes.length-1),d=Math.sqrt(c*c-u*u),f=.05+c*.95,h=d*f,{_lodMax:_}=this,g=this._sizeLods[n],m=3*g*(n>_-cs?n-_+cs:0),p=4*(this._cubeSize-g);l.envMap.value=e.texture,l.roughness.value=h,l.mipInt.value=_-t,ko(s,m,p,3*g,2*g),i.setRenderTarget(s),i.render(a,Ba),l.envMap.value=s.texture,l.roughness.value=0,l.mipInt.value=_-n,ko(e,m,p,3*g,2*g),i.setRenderTarget(e),i.render(a,Ba)}_blur(e,t,n,i,s){const o=this._pingPongRenderTarget;this._halfBlur(e,o,t,n,i,"latitudinal",s),this._halfBlur(o,e,n,n,i,"longitudinal",s)}_halfBlur(e,t,n,i,s,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&Et("blur direction must be either latitudinal or longitudinal!");const u=3,d=this._lodMeshes[i];d.material=c;const f=c.uniforms,h=this._sizeLods[n]-1,_=isFinite(s)?Math.PI/(2*h):2*Math.PI/(2*Ys-1),g=s/_,m=isFinite(s)?1+Math.floor(u*g):Ys;m>Ys&&lt(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Ys}`);const p=[];let y=0;for(let S=0;S<Ys;++S){const P=S/g,w=Math.exp(-P*P/2);p.push(w),S===0?y+=w:S<m&&(y+=2*w)}for(let S=0;S<p.length;S++)p[S]=p[S]/y;f.envMap.value=e.texture,f.samples.value=m,f.weights.value=p,f.latitudinal.value=o==="latitudinal",a&&(f.poleAxis.value=a);const{_lodMax:v}=this;f.dTheta.value=_,f.mipInt.value=v-n;const x=this._sizeLods[i],E=3*x*(i>v-cs?i-v+cs:0),b=4*(this._cubeSize-x);ko(t,E,b,3*x,2*x),l.setRenderTarget(t),l.render(d,Ba)}}function ww(r){const e=[],t=[],n=[];let i=r;const s=r-cs+1+bm.length;for(let o=0;o<s;o++){const a=Math.pow(2,i);e.push(a);let l=1/a;o>r-cs?l=bm[o-r+cs-1]:o===0&&(l=0),t.push(l);const c=1/(a-2),u=-c,d=1+c,f=[u,u,d,u,d,d,u,u,d,d,u,d],h=6,_=6,g=3,m=2,p=1,y=new Float32Array(g*_*h),v=new Float32Array(m*_*h),x=new Float32Array(p*_*h);for(let b=0;b<h;b++){const S=b%3*2/3-1,P=b>2?0:-1,w=[S,P,0,S+2/3,P,0,S+2/3,P+1,0,S,P,0,S+2/3,P+1,0,S,P+1,0];y.set(w,g*_*b),v.set(f,m*_*b);const M=[b,b,b,b,b,b];x.set(M,p*_*b)}const E=new hi;E.setAttribute("position",new Gt(y,g)),E.setAttribute("uv",new Gt(v,m)),E.setAttribute("faceIndex",new Gt(x,p)),n.push(new pi(E,null)),i>cs&&i--}return{lodMeshes:n,sizeLods:e,sigmas:t}}function Mm(r,e,t){const n=new co(r,e,t);return n.texture.mapping=Cu,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function ko(r,e,t,n,i){r.viewport.set(e,t,n,i),r.scissor.set(e,t,n,i)}function Mw(r,e,t){return new Ti({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:bw,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Iu(),fragmentShader:`

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
		`,blending:Hr,depthTest:!1,depthWrite:!1})}function Tw(r,e,t){const n=new Float32Array(Ys),i=new q(0,1,0);return new Ti({name:"SphericalGaussianBlur",defines:{n:Ys,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:Iu(),fragmentShader:`

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
		`,blending:Hr,depthTest:!1,depthWrite:!1})}function Tm(){return new Ti({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Iu(),fragmentShader:`

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
		`,blending:Hr,depthTest:!1,depthWrite:!1})}function Em(){return new Ti({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Iu(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Hr,depthTest:!1,depthWrite:!1})}function Iu(){return`

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
	`}function Ew(r){let e=new WeakMap,t=null;function n(a){if(a&&a.isTexture){const l=a.mapping,c=l===nf||l===rf,u=l===ua||l===da;if(c||u){let d=e.get(a);const f=d!==void 0?d.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==f)return t===null&&(t=new wm(r)),d=c?t.fromEquirectangular(a,d):t.fromCubemap(a,d),d.texture.pmremVersion=a.pmremVersion,e.set(a,d),d.texture;if(d!==void 0)return d.texture;{const h=a.image;return c&&h&&h.height>0||u&&h&&i(h)?(t===null&&(t=new wm(r)),d=c?t.fromEquirectangular(a):t.fromCubemap(a),d.texture.pmremVersion=a.pmremVersion,e.set(a,d),a.addEventListener("dispose",s),d.texture):null}}}return a}function i(a){let l=0;const c=6;for(let u=0;u<c;u++)a[u]!==void 0&&l++;return l===c}function s(a){const l=a.target;l.removeEventListener("dispose",s);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:o}}function Aw(r){const e={};function t(n){if(e[n]!==void 0)return e[n];const i=r.getExtension(n);return e[n]=i,i}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const i=t(n);return i===null&&Dl("WebGLRenderer: "+n+" extension not supported."),i}}}function Cw(r,e,t,n){const i={},s=new WeakMap;function o(d){const f=d.target;f.index!==null&&e.remove(f.index);for(const _ in f.attributes)e.remove(f.attributes[_]);f.removeEventListener("dispose",o),delete i[f.id];const h=s.get(f);h&&(e.remove(h),s.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,t.memory.geometries--}function a(d,f){return i[f.id]===!0||(f.addEventListener("dispose",o),i[f.id]=!0,t.memory.geometries++),f}function l(d){const f=d.attributes;for(const h in f)e.update(f[h],r.ARRAY_BUFFER)}function c(d){const f=[],h=d.index,_=d.attributes.position;let g=0;if(h!==null){const y=h.array;g=h.version;for(let v=0,x=y.length;v<x;v+=3){const E=y[v+0],b=y[v+1],S=y[v+2];f.push(E,b,b,S,S,E)}}else if(_!==void 0){const y=_.array;g=_.version;for(let v=0,x=y.length/3-1;v<x;v+=3){const E=v+0,b=v+1,S=v+2;f.push(E,b,b,S,S,E)}}else return;const m=new(Tg(f)?Pg:Rg)(f,1);m.version=g;const p=s.get(d);p&&e.remove(p),s.set(d,m)}function u(d){const f=s.get(d);if(f){const h=d.index;h!==null&&f.version<h.version&&c(d)}else c(d);return s.get(d)}return{get:a,update:l,getWireframeAttribute:u}}function Rw(r,e,t){let n;function i(f){n=f}let s,o;function a(f){s=f.type,o=f.bytesPerElement}function l(f,h){r.drawElements(n,h,s,f*o),t.update(h,n,1)}function c(f,h,_){_!==0&&(r.drawElementsInstanced(n,h,s,f*o,_),t.update(h,n,_))}function u(f,h,_){if(_===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,h,0,s,f,0,_);let m=0;for(let p=0;p<_;p++)m+=h[p];t.update(m,n,1)}function d(f,h,_,g){if(_===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<f.length;p++)c(f[p]/o,h[p],g[p]);else{m.multiDrawElementsInstancedWEBGL(n,h,0,s,f,0,g,0,_);let p=0;for(let y=0;y<_;y++)p+=h[y]*g[y];t.update(p,n,1)}}this.setMode=i,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=u,this.renderMultiDrawInstances=d}function Pw(r){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,o,a){switch(t.calls++,o){case r.TRIANGLES:t.triangles+=a*(s/3);break;case r.LINES:t.lines+=a*(s/2);break;case r.LINE_STRIP:t.lines+=a*(s-1);break;case r.LINE_LOOP:t.lines+=a*s;break;case r.POINTS:t.points+=a*s;break;default:Et("WebGLInfo: Unknown draw mode:",o);break}}function i(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:i,update:n}}function Lw(r,e,t){const n=new WeakMap,i=new Wt;function s(o,a,l){const c=o.morphTargetInfluences,u=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,d=u!==void 0?u.length:0;let f=n.get(a);if(f===void 0||f.count!==d){let M=function(){P.dispose(),n.delete(a),a.removeEventListener("dispose",M)};var h=M;f!==void 0&&f.texture.dispose();const _=a.morphAttributes.position!==void 0,g=a.morphAttributes.normal!==void 0,m=a.morphAttributes.color!==void 0,p=a.morphAttributes.position||[],y=a.morphAttributes.normal||[],v=a.morphAttributes.color||[];let x=0;_===!0&&(x=1),g===!0&&(x=2),m===!0&&(x=3);let E=a.attributes.position.count*x,b=1;E>e.maxTextureSize&&(b=Math.ceil(E/e.maxTextureSize),E=e.maxTextureSize);const S=new Float32Array(E*b*4*d),P=new Eg(S,E,b,d);P.type=Ki,P.needsUpdate=!0;const w=x*4;for(let L=0;L<d;L++){const F=p[L],G=y[L],U=v[L],X=E*b*4*L;for(let Z=0;Z<F.count;Z++){const C=Z*w;_===!0&&(i.fromBufferAttribute(F,Z),S[X+C+0]=i.x,S[X+C+1]=i.y,S[X+C+2]=i.z,S[X+C+3]=0),g===!0&&(i.fromBufferAttribute(G,Z),S[X+C+4]=i.x,S[X+C+5]=i.y,S[X+C+6]=i.z,S[X+C+7]=0),m===!0&&(i.fromBufferAttribute(U,Z),S[X+C+8]=i.x,S[X+C+9]=i.y,S[X+C+10]=i.z,S[X+C+11]=U.itemSize===4?i.w:1)}}f={count:d,texture:P,size:new Rt(E,b)},n.set(a,f),a.addEventListener("dispose",M)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(r,"morphTexture",o.morphTexture,t);else{let _=0;for(let m=0;m<c.length;m++)_+=c[m];const g=a.morphTargetsRelative?1:1-_;l.getUniforms().setValue(r,"morphTargetBaseInfluence",g),l.getUniforms().setValue(r,"morphTargetInfluences",c)}l.getUniforms().setValue(r,"morphTargetsTexture",f.texture,t),l.getUniforms().setValue(r,"morphTargetsTextureSize",f.size)}return{update:s}}function Dw(r,e,t,n){let i=new WeakMap;function s(l){const c=n.render.frame,u=l.geometry,d=e.get(l,u);if(i.get(d)!==c&&(e.update(d),i.set(d,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),i.get(l)!==c&&(t.update(l.instanceMatrix,r.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,r.ARRAY_BUFFER),i.set(l,c))),l.isSkinnedMesh){const f=l.skeleton;i.get(f)!==c&&(f.update(),i.set(f,c))}return d}function o(){i=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:s,dispose:o}}const Wg=new An,Am=new kg(1,1),Xg=new Eg,qg=new Ty,Yg=new Ig,Cm=[],Rm=[],Pm=new Float32Array(16),Lm=new Float32Array(9),Dm=new Float32Array(4);function Ra(r,e,t){const n=r[0];if(n<=0||n>0)return r;const i=e*t;let s=Cm[i];if(s===void 0&&(s=new Float32Array(i),Cm[i]=s),e!==0){n.toArray(s,0);for(let o=1,a=0;o!==e;++o)a+=t,r[o].toArray(s,a)}return s}function Cn(r,e){if(r.length!==e.length)return!1;for(let t=0,n=r.length;t<n;t++)if(r[t]!==e[t])return!1;return!0}function Rn(r,e){for(let t=0,n=e.length;t<n;t++)r[t]=e[t]}function Ou(r,e){let t=Rm[e];t===void 0&&(t=new Int32Array(e),Rm[e]=t);for(let n=0;n!==e;++n)t[n]=r.allocateTextureUnit();return t}function Iw(r,e){const t=this.cache;t[0]!==e&&(r.uniform1f(this.addr,e),t[0]=e)}function Ow(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Cn(t,e))return;r.uniform2fv(this.addr,e),Rn(t,e)}}function Nw(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(r.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Cn(t,e))return;r.uniform3fv(this.addr,e),Rn(t,e)}}function Fw(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Cn(t,e))return;r.uniform4fv(this.addr,e),Rn(t,e)}}function Uw(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(Cn(t,e))return;r.uniformMatrix2fv(this.addr,!1,e),Rn(t,e)}else{if(Cn(t,n))return;Dm.set(n),r.uniformMatrix2fv(this.addr,!1,Dm),Rn(t,n)}}function kw(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(Cn(t,e))return;r.uniformMatrix3fv(this.addr,!1,e),Rn(t,e)}else{if(Cn(t,n))return;Lm.set(n),r.uniformMatrix3fv(this.addr,!1,Lm),Rn(t,n)}}function Bw(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(Cn(t,e))return;r.uniformMatrix4fv(this.addr,!1,e),Rn(t,e)}else{if(Cn(t,n))return;Pm.set(n),r.uniformMatrix4fv(this.addr,!1,Pm),Rn(t,n)}}function zw(r,e){const t=this.cache;t[0]!==e&&(r.uniform1i(this.addr,e),t[0]=e)}function Vw(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Cn(t,e))return;r.uniform2iv(this.addr,e),Rn(t,e)}}function Hw(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Cn(t,e))return;r.uniform3iv(this.addr,e),Rn(t,e)}}function Gw(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Cn(t,e))return;r.uniform4iv(this.addr,e),Rn(t,e)}}function Ww(r,e){const t=this.cache;t[0]!==e&&(r.uniform1ui(this.addr,e),t[0]=e)}function Xw(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Cn(t,e))return;r.uniform2uiv(this.addr,e),Rn(t,e)}}function qw(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Cn(t,e))return;r.uniform3uiv(this.addr,e),Rn(t,e)}}function Yw(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Cn(t,e))return;r.uniform4uiv(this.addr,e),Rn(t,e)}}function jw(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i);let s;this.type===r.SAMPLER_2D_SHADOW?(Am.compareFunction=Mg,s=Am):s=Wg,t.setTexture2D(e||s,i)}function $w(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture3D(e||qg,i)}function Kw(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTextureCube(e||Yg,i)}function Zw(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture2DArray(e||Xg,i)}function Jw(r){switch(r){case 5126:return Iw;case 35664:return Ow;case 35665:return Nw;case 35666:return Fw;case 35674:return Uw;case 35675:return kw;case 35676:return Bw;case 5124:case 35670:return zw;case 35667:case 35671:return Vw;case 35668:case 35672:return Hw;case 35669:case 35673:return Gw;case 5125:return Ww;case 36294:return Xw;case 36295:return qw;case 36296:return Yw;case 35678:case 36198:case 36298:case 36306:case 35682:return jw;case 35679:case 36299:case 36307:return $w;case 35680:case 36300:case 36308:case 36293:return Kw;case 36289:case 36303:case 36311:case 36292:return Zw}}function Qw(r,e){r.uniform1fv(this.addr,e)}function eM(r,e){const t=Ra(e,this.size,2);r.uniform2fv(this.addr,t)}function tM(r,e){const t=Ra(e,this.size,3);r.uniform3fv(this.addr,t)}function nM(r,e){const t=Ra(e,this.size,4);r.uniform4fv(this.addr,t)}function iM(r,e){const t=Ra(e,this.size,4);r.uniformMatrix2fv(this.addr,!1,t)}function rM(r,e){const t=Ra(e,this.size,9);r.uniformMatrix3fv(this.addr,!1,t)}function sM(r,e){const t=Ra(e,this.size,16);r.uniformMatrix4fv(this.addr,!1,t)}function oM(r,e){r.uniform1iv(this.addr,e)}function aM(r,e){r.uniform2iv(this.addr,e)}function lM(r,e){r.uniform3iv(this.addr,e)}function cM(r,e){r.uniform4iv(this.addr,e)}function uM(r,e){r.uniform1uiv(this.addr,e)}function dM(r,e){r.uniform2uiv(this.addr,e)}function fM(r,e){r.uniform3uiv(this.addr,e)}function hM(r,e){r.uniform4uiv(this.addr,e)}function pM(r,e,t){const n=this.cache,i=e.length,s=Ou(t,i);Cn(n,s)||(r.uniform1iv(this.addr,s),Rn(n,s));for(let o=0;o!==i;++o)t.setTexture2D(e[o]||Wg,s[o])}function mM(r,e,t){const n=this.cache,i=e.length,s=Ou(t,i);Cn(n,s)||(r.uniform1iv(this.addr,s),Rn(n,s));for(let o=0;o!==i;++o)t.setTexture3D(e[o]||qg,s[o])}function gM(r,e,t){const n=this.cache,i=e.length,s=Ou(t,i);Cn(n,s)||(r.uniform1iv(this.addr,s),Rn(n,s));for(let o=0;o!==i;++o)t.setTextureCube(e[o]||Yg,s[o])}function _M(r,e,t){const n=this.cache,i=e.length,s=Ou(t,i);Cn(n,s)||(r.uniform1iv(this.addr,s),Rn(n,s));for(let o=0;o!==i;++o)t.setTexture2DArray(e[o]||Xg,s[o])}function xM(r){switch(r){case 5126:return Qw;case 35664:return eM;case 35665:return tM;case 35666:return nM;case 35674:return iM;case 35675:return rM;case 35676:return sM;case 5124:case 35670:return oM;case 35667:case 35671:return aM;case 35668:case 35672:return lM;case 35669:case 35673:return cM;case 5125:return uM;case 36294:return dM;case 36295:return fM;case 36296:return hM;case 35678:case 36198:case 36298:case 36306:case 35682:return pM;case 35679:case 36299:case 36307:return mM;case 35680:case 36300:case 36308:case 36293:return gM;case 36289:case 36303:case 36311:case 36292:return _M}}class vM{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=Jw(t.type)}}class yM{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=xM(t.type)}}class bM{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const i=this.seq;for(let s=0,o=i.length;s!==o;++s){const a=i[s];a.setValue(e,t[a.id],n)}}}const Sd=/(\w+)(\])?(\[|\.)?/g;function Im(r,e){r.seq.push(e),r.map[e.id]=e}function SM(r,e,t){const n=r.name,i=n.length;for(Sd.lastIndex=0;;){const s=Sd.exec(n),o=Sd.lastIndex;let a=s[1];const l=s[2]==="]",c=s[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===i){Im(t,c===void 0?new vM(a,r,e):new yM(a,r,e));break}else{let d=t.map[a];d===void 0&&(d=new bM(a),Im(t,d)),t=d}}}class qc{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){const s=e.getActiveUniform(t,i),o=e.getUniformLocation(t,s.name);SM(s,o,this)}}setValue(e,t,n,i){const s=this.map[t];s!==void 0&&s.setValue(e,n,i)}setOptional(e,t,n){const i=t[n];i!==void 0&&this.setValue(e,n,i)}static upload(e,t,n,i){for(let s=0,o=t.length;s!==o;++s){const a=t[s],l=n[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,i)}}static seqWithValue(e,t){const n=[];for(let i=0,s=e.length;i!==s;++i){const o=e[i];o.id in t&&n.push(o)}return n}}function Om(r,e,t){const n=r.createShader(e);return r.shaderSource(n,t),r.compileShader(n),n}const wM=37297;let MM=0;function TM(r,e){const t=r.split(`
`),n=[],i=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let o=i;o<s;o++){const a=o+1;n.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return n.join(`
`)}const Nm=new gt;function EM(r){Dt._getMatrix(Nm,Dt.workingColorSpace,r);const e=`mat3( ${Nm.elements.map(t=>t.toFixed(4))} )`;switch(Dt.getTransfer(r)){case ou:return[e,"LinearTransferOETF"];case jt:return[e,"sRGBTransferOETF"];default:return lt("WebGLProgram: Unsupported color space: ",r),[e,"LinearTransferOETF"]}}function Fm(r,e,t){const n=r.getShaderParameter(e,r.COMPILE_STATUS),s=(r.getShaderInfoLog(e)||"").trim();if(n&&s==="")return"";const o=/ERROR: 0:(\d+)/.exec(s);if(o){const a=parseInt(o[1]);return t.toUpperCase()+`

`+s+`

`+TM(r.getShaderSource(e),a)}else return s}function AM(r,e){const t=EM(e);return[`vec4 ${r}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function CM(r,e){let t;switch(e){case Nv:t="Linear";break;case Fv:t="Reinhard";break;case Uv:t="Cineon";break;case kv:t="ACESFilmic";break;case zv:t="AgX";break;case Vv:t="Neutral";break;case Bv:t="Custom";break;default:lt("WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+r+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const bc=new q;function RM(){Dt.getLuminanceCoefficients(bc);const r=bc.x.toFixed(4),e=bc.y.toFixed(4),t=bc.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${r}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function PM(r){return[r.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",r.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(ja).join(`
`)}function LM(r){const e=[];for(const t in r){const n=r[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function DM(r,e){const t={},n=r.getProgramParameter(e,r.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){const s=r.getActiveAttrib(e,i),o=s.name;let a=1;s.type===r.FLOAT_MAT2&&(a=2),s.type===r.FLOAT_MAT3&&(a=3),s.type===r.FLOAT_MAT4&&(a=4),t[o]={type:s.type,location:r.getAttribLocation(e,o),locationSize:a}}return t}function ja(r){return r!==""}function Um(r,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return r.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function km(r,e){return r.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const IM=/^[ \t]*#include +<([\w\d./]+)>/gm;function kf(r){return r.replace(IM,NM)}const OM=new Map;function NM(r,e){let t=vt[e];if(t===void 0){const n=OM.get(e);if(n!==void 0)t=vt[n],lt('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return kf(t)}const FM=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Bm(r){return r.replace(FM,UM)}function UM(r,e,t,n){let i="";for(let s=parseInt(e);s<parseInt(t);s++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return i}function zm(r){let e=`precision ${r.precision} float;
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
#define LOW_PRECISION`),e}function kM(r){let e="SHADOWMAP_TYPE_BASIC";return r.shadowMapType===fg?e="SHADOWMAP_TYPE_PCF":r.shadowMapType===pv?e="SHADOWMAP_TYPE_PCF_SOFT":r.shadowMapType===Dr&&(e="SHADOWMAP_TYPE_VSM"),e}function BM(r){let e="ENVMAP_TYPE_CUBE";if(r.envMap)switch(r.envMapMode){case ua:case da:e="ENVMAP_TYPE_CUBE";break;case Cu:e="ENVMAP_TYPE_CUBE_UV";break}return e}function zM(r){let e="ENVMAP_MODE_REFLECTION";if(r.envMap)switch(r.envMapMode){case da:e="ENVMAP_MODE_REFRACTION";break}return e}function VM(r){let e="ENVMAP_BLENDING_NONE";if(r.envMap)switch(r.combine){case hg:e="ENVMAP_BLENDING_MULTIPLY";break;case Iv:e="ENVMAP_BLENDING_MIX";break;case Ov:e="ENVMAP_BLENDING_ADD";break}return e}function HM(r){const e=r.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function GM(r,e,t,n){const i=r.getContext(),s=t.defines;let o=t.vertexShader,a=t.fragmentShader;const l=kM(t),c=BM(t),u=zM(t),d=VM(t),f=HM(t),h=PM(t),_=LM(s),g=i.createProgram();let m,p,y=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(ja).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(ja).join(`
`),p.length>0&&(p+=`
`)):(m=[zm(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ja).join(`
`),p=[zm(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+u:"",t.envMap?"#define "+d:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==xs?"#define TONE_MAPPING":"",t.toneMapping!==xs?vt.tonemapping_pars_fragment:"",t.toneMapping!==xs?CM("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",vt.colorspace_pars_fragment,AM("linearToOutputTexel",t.outputColorSpace),RM(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(ja).join(`
`)),o=kf(o),o=Um(o,t),o=km(o,t),a=kf(a),a=Um(a,t),a=km(a,t),o=Bm(o),a=Bm(a),t.isRawShaderMaterial!==!0&&(y=`#version 300 es
`,m=[h,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",t.glslVersion===Fp?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Fp?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const v=y+m+o,x=y+p+a,E=Om(i,i.VERTEX_SHADER,v),b=Om(i,i.FRAGMENT_SHADER,x);i.attachShader(g,E),i.attachShader(g,b),t.index0AttributeName!==void 0?i.bindAttribLocation(g,0,t.index0AttributeName):t.morphTargets===!0&&i.bindAttribLocation(g,0,"position"),i.linkProgram(g);function S(L){if(r.debug.checkShaderErrors){const F=i.getProgramInfoLog(g)||"",G=i.getShaderInfoLog(E)||"",U=i.getShaderInfoLog(b)||"",X=F.trim(),Z=G.trim(),C=U.trim();let Y=!0,de=!0;if(i.getProgramParameter(g,i.LINK_STATUS)===!1)if(Y=!1,typeof r.debug.onShaderError=="function")r.debug.onShaderError(i,g,E,b);else{const I=Fm(i,E,"vertex"),xe=Fm(i,b,"fragment");Et("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(g,i.VALIDATE_STATUS)+`

Material Name: `+L.name+`
Material Type: `+L.type+`

Program Info Log: `+X+`
`+I+`
`+xe)}else X!==""?lt("WebGLProgram: Program Info Log:",X):(Z===""||C==="")&&(de=!1);de&&(L.diagnostics={runnable:Y,programLog:X,vertexShader:{log:Z,prefix:m},fragmentShader:{log:C,prefix:p}})}i.deleteShader(E),i.deleteShader(b),P=new qc(i,g),w=DM(i,g)}let P;this.getUniforms=function(){return P===void 0&&S(this),P};let w;this.getAttributes=function(){return w===void 0&&S(this),w};let M=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return M===!1&&(M=i.getProgramParameter(g,wM)),M},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(g),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=MM++,this.cacheKey=e,this.usedTimes=1,this.program=g,this.vertexShader=E,this.fragmentShader=b,this}let WM=0;class XM{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,i=this._getShaderStage(t),s=this._getShaderStage(n),o=this._getShaderCacheForMaterial(e);return o.has(i)===!1&&(o.add(i),i.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new qM(e),t.set(e,n)),n}}class qM{constructor(e){this.id=WM++,this.code=e,this.usedTimes=0}}function YM(r,e,t,n,i,s,o){const a=new Ag,l=new XM,c=new Set,u=[],d=i.logarithmicDepthBuffer,f=i.vertexTextures;let h=i.precision;const _={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(w){return c.add(w),w===0?"uv":`uv${w}`}function m(w,M,L,F,G){const U=F.fog,X=G.geometry,Z=w.isMeshStandardMaterial?F.environment:null,C=(w.isMeshStandardMaterial?t:e).get(w.envMap||Z),Y=C&&C.mapping===Cu?C.image.height:null,de=_[w.type];w.precision!==null&&(h=i.getMaxPrecision(w.precision),h!==w.precision&&lt("WebGLProgram.getParameters:",w.precision,"not supported, using",h,"instead."));const I=X.morphAttributes.position||X.morphAttributes.normal||X.morphAttributes.color,xe=I!==void 0?I.length:0;let ve=0;X.morphAttributes.position!==void 0&&(ve=1),X.morphAttributes.normal!==void 0&&(ve=2),X.morphAttributes.color!==void 0&&(ve=3);let ee,Xe,qe,ne;if(de){const Be=lr[de];ee=Be.vertexShader,Xe=Be.fragmentShader}else ee=w.vertexShader,Xe=w.fragmentShader,l.update(w),qe=l.getVertexShaderID(w),ne=l.getFragmentShaderID(w);const ie=r.getRenderTarget(),be=r.state.buffers.depth.getReversed(),Ye=G.isInstancedMesh===!0,ye=G.isBatchedMesh===!0,tt=!!w.map,ht=!!w.matcap,Ie=!!C,ct=!!w.aoMap,N=!!w.lightMap,st=!!w.bumpMap,z=!!w.normalMap,pt=!!w.displacementMap,Fe=!!w.emissiveMap,Pt=!!w.metalnessMap,Ae=!!w.roughnessMap,Ze=w.anisotropy>0,D=w.clearcoat>0,A=w.dispersion>0,H=w.iridescence>0,ae=w.sheen>0,oe=w.transmission>0,$=Ze&&!!w.anisotropyMap,Ce=D&&!!w.clearcoatMap,me=D&&!!w.clearcoatNormalMap,Ue=D&&!!w.clearcoatRoughnessMap,Te=H&&!!w.iridescenceMap,he=H&&!!w.iridescenceThicknessMap,Q=ae&&!!w.sheenColorMap,Ge=ae&&!!w.sheenRoughnessMap,We=!!w.specularMap,Se=!!w.specularColorMap,Ee=!!w.specularIntensityMap,O=oe&&!!w.transmissionMap,we=oe&&!!w.thicknessMap,se=!!w.gradientMap,ge=!!w.alphaMap,le=w.alphaTest>0,ue=!!w.alphaHash,ke=!!w.extensions;let it=xs;w.toneMapped&&(ie===null||ie.isXRRenderTarget===!0)&&(it=r.toneMapping);const Ut={shaderID:de,shaderType:w.type,shaderName:w.name,vertexShader:ee,fragmentShader:Xe,defines:w.defines,customVertexShaderID:qe,customFragmentShaderID:ne,isRawShaderMaterial:w.isRawShaderMaterial===!0,glslVersion:w.glslVersion,precision:h,batching:ye,batchingColor:ye&&G._colorsTexture!==null,instancing:Ye,instancingColor:Ye&&G.instanceColor!==null,instancingMorph:Ye&&G.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:ie===null?r.outputColorSpace:ie.isXRRenderTarget===!0?ie.texture.colorSpace:Yn,alphaToCoverage:!!w.alphaToCoverage,map:tt,matcap:ht,envMap:Ie,envMapMode:Ie&&C.mapping,envMapCubeUVHeight:Y,aoMap:ct,lightMap:N,bumpMap:st,normalMap:z,displacementMap:f&&pt,emissiveMap:Fe,normalMapObjectSpace:z&&w.normalMapType===Yv,normalMapTangentSpace:z&&w.normalMapType===wg,metalnessMap:Pt,roughnessMap:Ae,anisotropy:Ze,anisotropyMap:$,clearcoat:D,clearcoatMap:Ce,clearcoatNormalMap:me,clearcoatRoughnessMap:Ue,dispersion:A,iridescence:H,iridescenceMap:Te,iridescenceThicknessMap:he,sheen:ae,sheenColorMap:Q,sheenRoughnessMap:Ge,specularMap:We,specularColorMap:Se,specularIntensityMap:Ee,transmission:oe,transmissionMap:O,thicknessMap:we,gradientMap:se,opaque:w.transparent===!1&&w.blending===_s&&w.alphaToCoverage===!1,alphaMap:ge,alphaTest:le,alphaHash:ue,combine:w.combine,mapUv:tt&&g(w.map.channel),aoMapUv:ct&&g(w.aoMap.channel),lightMapUv:N&&g(w.lightMap.channel),bumpMapUv:st&&g(w.bumpMap.channel),normalMapUv:z&&g(w.normalMap.channel),displacementMapUv:pt&&g(w.displacementMap.channel),emissiveMapUv:Fe&&g(w.emissiveMap.channel),metalnessMapUv:Pt&&g(w.metalnessMap.channel),roughnessMapUv:Ae&&g(w.roughnessMap.channel),anisotropyMapUv:$&&g(w.anisotropyMap.channel),clearcoatMapUv:Ce&&g(w.clearcoatMap.channel),clearcoatNormalMapUv:me&&g(w.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Ue&&g(w.clearcoatRoughnessMap.channel),iridescenceMapUv:Te&&g(w.iridescenceMap.channel),iridescenceThicknessMapUv:he&&g(w.iridescenceThicknessMap.channel),sheenColorMapUv:Q&&g(w.sheenColorMap.channel),sheenRoughnessMapUv:Ge&&g(w.sheenRoughnessMap.channel),specularMapUv:We&&g(w.specularMap.channel),specularColorMapUv:Se&&g(w.specularColorMap.channel),specularIntensityMapUv:Ee&&g(w.specularIntensityMap.channel),transmissionMapUv:O&&g(w.transmissionMap.channel),thicknessMapUv:we&&g(w.thicknessMap.channel),alphaMapUv:ge&&g(w.alphaMap.channel),vertexTangents:!!X.attributes.tangent&&(z||Ze),vertexColors:w.vertexColors,vertexAlphas:w.vertexColors===!0&&!!X.attributes.color&&X.attributes.color.itemSize===4,pointsUvs:G.isPoints===!0&&!!X.attributes.uv&&(tt||ge),fog:!!U,useFog:w.fog===!0,fogExp2:!!U&&U.isFogExp2,flatShading:w.flatShading===!0&&w.wireframe===!1,sizeAttenuation:w.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:be,skinning:G.isSkinnedMesh===!0,morphTargets:X.morphAttributes.position!==void 0,morphNormals:X.morphAttributes.normal!==void 0,morphColors:X.morphAttributes.color!==void 0,morphTargetsCount:xe,morphTextureStride:ve,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:w.dithering,shadowMapEnabled:r.shadowMap.enabled&&L.length>0,shadowMapType:r.shadowMap.type,toneMapping:it,decodeVideoTexture:tt&&w.map.isVideoTexture===!0&&Dt.getTransfer(w.map.colorSpace)===jt,decodeVideoTextureEmissive:Fe&&w.emissiveMap.isVideoTexture===!0&&Dt.getTransfer(w.emissiveMap.colorSpace)===jt,premultipliedAlpha:w.premultipliedAlpha,doubleSided:w.side===Fi,flipSided:w.side===li,useDepthPacking:w.depthPacking>=0,depthPacking:w.depthPacking||0,index0AttributeName:w.index0AttributeName,extensionClipCullDistance:ke&&w.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(ke&&w.extensions.multiDraw===!0||ye)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:w.customProgramCacheKey()};return Ut.vertexUv1s=c.has(1),Ut.vertexUv2s=c.has(2),Ut.vertexUv3s=c.has(3),c.clear(),Ut}function p(w){const M=[];if(w.shaderID?M.push(w.shaderID):(M.push(w.customVertexShaderID),M.push(w.customFragmentShaderID)),w.defines!==void 0)for(const L in w.defines)M.push(L),M.push(w.defines[L]);return w.isRawShaderMaterial===!1&&(y(M,w),v(M,w),M.push(r.outputColorSpace)),M.push(w.customProgramCacheKey),M.join()}function y(w,M){w.push(M.precision),w.push(M.outputColorSpace),w.push(M.envMapMode),w.push(M.envMapCubeUVHeight),w.push(M.mapUv),w.push(M.alphaMapUv),w.push(M.lightMapUv),w.push(M.aoMapUv),w.push(M.bumpMapUv),w.push(M.normalMapUv),w.push(M.displacementMapUv),w.push(M.emissiveMapUv),w.push(M.metalnessMapUv),w.push(M.roughnessMapUv),w.push(M.anisotropyMapUv),w.push(M.clearcoatMapUv),w.push(M.clearcoatNormalMapUv),w.push(M.clearcoatRoughnessMapUv),w.push(M.iridescenceMapUv),w.push(M.iridescenceThicknessMapUv),w.push(M.sheenColorMapUv),w.push(M.sheenRoughnessMapUv),w.push(M.specularMapUv),w.push(M.specularColorMapUv),w.push(M.specularIntensityMapUv),w.push(M.transmissionMapUv),w.push(M.thicknessMapUv),w.push(M.combine),w.push(M.fogExp2),w.push(M.sizeAttenuation),w.push(M.morphTargetsCount),w.push(M.morphAttributeCount),w.push(M.numDirLights),w.push(M.numPointLights),w.push(M.numSpotLights),w.push(M.numSpotLightMaps),w.push(M.numHemiLights),w.push(M.numRectAreaLights),w.push(M.numDirLightShadows),w.push(M.numPointLightShadows),w.push(M.numSpotLightShadows),w.push(M.numSpotLightShadowsWithMaps),w.push(M.numLightProbes),w.push(M.shadowMapType),w.push(M.toneMapping),w.push(M.numClippingPlanes),w.push(M.numClipIntersection),w.push(M.depthPacking)}function v(w,M){a.disableAll(),M.supportsVertexTextures&&a.enable(0),M.instancing&&a.enable(1),M.instancingColor&&a.enable(2),M.instancingMorph&&a.enable(3),M.matcap&&a.enable(4),M.envMap&&a.enable(5),M.normalMapObjectSpace&&a.enable(6),M.normalMapTangentSpace&&a.enable(7),M.clearcoat&&a.enable(8),M.iridescence&&a.enable(9),M.alphaTest&&a.enable(10),M.vertexColors&&a.enable(11),M.vertexAlphas&&a.enable(12),M.vertexUv1s&&a.enable(13),M.vertexUv2s&&a.enable(14),M.vertexUv3s&&a.enable(15),M.vertexTangents&&a.enable(16),M.anisotropy&&a.enable(17),M.alphaHash&&a.enable(18),M.batching&&a.enable(19),M.dispersion&&a.enable(20),M.batchingColor&&a.enable(21),M.gradientMap&&a.enable(22),w.push(a.mask),a.disableAll(),M.fog&&a.enable(0),M.useFog&&a.enable(1),M.flatShading&&a.enable(2),M.logarithmicDepthBuffer&&a.enable(3),M.reversedDepthBuffer&&a.enable(4),M.skinning&&a.enable(5),M.morphTargets&&a.enable(6),M.morphNormals&&a.enable(7),M.morphColors&&a.enable(8),M.premultipliedAlpha&&a.enable(9),M.shadowMapEnabled&&a.enable(10),M.doubleSided&&a.enable(11),M.flipSided&&a.enable(12),M.useDepthPacking&&a.enable(13),M.dithering&&a.enable(14),M.transmission&&a.enable(15),M.sheen&&a.enable(16),M.opaque&&a.enable(17),M.pointsUvs&&a.enable(18),M.decodeVideoTexture&&a.enable(19),M.decodeVideoTextureEmissive&&a.enable(20),M.alphaToCoverage&&a.enable(21),w.push(a.mask)}function x(w){const M=_[w.type];let L;if(M){const F=lr[M];L=ky.clone(F.uniforms)}else L=w.uniforms;return L}function E(w,M){let L;for(let F=0,G=u.length;F<G;F++){const U=u[F];if(U.cacheKey===M){L=U,++L.usedTimes;break}}return L===void 0&&(L=new GM(r,M,w,s),u.push(L)),L}function b(w){if(--w.usedTimes===0){const M=u.indexOf(w);u[M]=u[u.length-1],u.pop(),w.destroy()}}function S(w){l.remove(w)}function P(){l.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:x,acquireProgram:E,releaseProgram:b,releaseShaderCache:S,programs:u,dispose:P}}function jM(){let r=new WeakMap;function e(o){return r.has(o)}function t(o){let a=r.get(o);return a===void 0&&(a={},r.set(o,a)),a}function n(o){r.delete(o)}function i(o,a,l){r.get(o)[a]=l}function s(){r=new WeakMap}return{has:e,get:t,remove:n,update:i,dispose:s}}function $M(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.material.id!==e.material.id?r.material.id-e.material.id:r.z!==e.z?r.z-e.z:r.id-e.id}function Vm(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.z!==e.z?e.z-r.z:r.id-e.id}function Hm(){const r=[];let e=0;const t=[],n=[],i=[];function s(){e=0,t.length=0,n.length=0,i.length=0}function o(d,f,h,_,g,m){let p=r[e];return p===void 0?(p={id:d.id,object:d,geometry:f,material:h,groupOrder:_,renderOrder:d.renderOrder,z:g,group:m},r[e]=p):(p.id=d.id,p.object=d,p.geometry=f,p.material=h,p.groupOrder=_,p.renderOrder=d.renderOrder,p.z=g,p.group=m),e++,p}function a(d,f,h,_,g,m){const p=o(d,f,h,_,g,m);h.transmission>0?n.push(p):h.transparent===!0?i.push(p):t.push(p)}function l(d,f,h,_,g,m){const p=o(d,f,h,_,g,m);h.transmission>0?n.unshift(p):h.transparent===!0?i.unshift(p):t.unshift(p)}function c(d,f){t.length>1&&t.sort(d||$M),n.length>1&&n.sort(f||Vm),i.length>1&&i.sort(f||Vm)}function u(){for(let d=e,f=r.length;d<f;d++){const h=r[d];if(h.id===null)break;h.id=null,h.object=null,h.geometry=null,h.material=null,h.group=null}}return{opaque:t,transmissive:n,transparent:i,init:s,push:a,unshift:l,finish:u,sort:c}}function KM(){let r=new WeakMap;function e(n,i){const s=r.get(n);let o;return s===void 0?(o=new Hm,r.set(n,[o])):i>=s.length?(o=new Hm,s.push(o)):o=s[i],o}function t(){r=new WeakMap}return{get:e,dispose:t}}function ZM(){const r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new q,color:new Qe};break;case"SpotLight":t={position:new q,direction:new q,color:new Qe,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new q,color:new Qe,distance:0,decay:0};break;case"HemisphereLight":t={direction:new q,skyColor:new Qe,groundColor:new Qe};break;case"RectAreaLight":t={color:new Qe,position:new q,halfWidth:new q,halfHeight:new q};break}return r[e.id]=t,t}}}function JM(){const r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Rt};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Rt};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Rt,shadowCameraNear:1,shadowCameraFar:1e3};break}return r[e.id]=t,t}}}let QM=0;function eT(r,e){return(e.castShadow?2:0)-(r.castShadow?2:0)+(e.map?1:0)-(r.map?1:0)}function tT(r){const e=new ZM,t=JM(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new q);const i=new q,s=new yt,o=new yt;function a(c){let u=0,d=0,f=0;for(let w=0;w<9;w++)n.probe[w].set(0,0,0);let h=0,_=0,g=0,m=0,p=0,y=0,v=0,x=0,E=0,b=0,S=0;c.sort(eT);for(let w=0,M=c.length;w<M;w++){const L=c[w],F=L.color,G=L.intensity,U=L.distance,X=L.shadow&&L.shadow.map?L.shadow.map.texture:null;if(L.isAmbientLight)u+=F.r*G,d+=F.g*G,f+=F.b*G;else if(L.isLightProbe){for(let Z=0;Z<9;Z++)n.probe[Z].addScaledVector(L.sh.coefficients[Z],G);S++}else if(L.isDirectionalLight){const Z=e.get(L);if(Z.color.copy(L.color).multiplyScalar(L.intensity),L.castShadow){const C=L.shadow,Y=t.get(L);Y.shadowIntensity=C.intensity,Y.shadowBias=C.bias,Y.shadowNormalBias=C.normalBias,Y.shadowRadius=C.radius,Y.shadowMapSize=C.mapSize,n.directionalShadow[h]=Y,n.directionalShadowMap[h]=X,n.directionalShadowMatrix[h]=L.shadow.matrix,y++}n.directional[h]=Z,h++}else if(L.isSpotLight){const Z=e.get(L);Z.position.setFromMatrixPosition(L.matrixWorld),Z.color.copy(F).multiplyScalar(G),Z.distance=U,Z.coneCos=Math.cos(L.angle),Z.penumbraCos=Math.cos(L.angle*(1-L.penumbra)),Z.decay=L.decay,n.spot[g]=Z;const C=L.shadow;if(L.map&&(n.spotLightMap[E]=L.map,E++,C.updateMatrices(L),L.castShadow&&b++),n.spotLightMatrix[g]=C.matrix,L.castShadow){const Y=t.get(L);Y.shadowIntensity=C.intensity,Y.shadowBias=C.bias,Y.shadowNormalBias=C.normalBias,Y.shadowRadius=C.radius,Y.shadowMapSize=C.mapSize,n.spotShadow[g]=Y,n.spotShadowMap[g]=X,x++}g++}else if(L.isRectAreaLight){const Z=e.get(L);Z.color.copy(F).multiplyScalar(G),Z.halfWidth.set(L.width*.5,0,0),Z.halfHeight.set(0,L.height*.5,0),n.rectArea[m]=Z,m++}else if(L.isPointLight){const Z=e.get(L);if(Z.color.copy(L.color).multiplyScalar(L.intensity),Z.distance=L.distance,Z.decay=L.decay,L.castShadow){const C=L.shadow,Y=t.get(L);Y.shadowIntensity=C.intensity,Y.shadowBias=C.bias,Y.shadowNormalBias=C.normalBias,Y.shadowRadius=C.radius,Y.shadowMapSize=C.mapSize,Y.shadowCameraNear=C.camera.near,Y.shadowCameraFar=C.camera.far,n.pointShadow[_]=Y,n.pointShadowMap[_]=X,n.pointShadowMatrix[_]=L.shadow.matrix,v++}n.point[_]=Z,_++}else if(L.isHemisphereLight){const Z=e.get(L);Z.skyColor.copy(L.color).multiplyScalar(G),Z.groundColor.copy(L.groundColor).multiplyScalar(G),n.hemi[p]=Z,p++}}m>0&&(r.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Ne.LTC_FLOAT_1,n.rectAreaLTC2=Ne.LTC_FLOAT_2):(n.rectAreaLTC1=Ne.LTC_HALF_1,n.rectAreaLTC2=Ne.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=d,n.ambient[2]=f;const P=n.hash;(P.directionalLength!==h||P.pointLength!==_||P.spotLength!==g||P.rectAreaLength!==m||P.hemiLength!==p||P.numDirectionalShadows!==y||P.numPointShadows!==v||P.numSpotShadows!==x||P.numSpotMaps!==E||P.numLightProbes!==S)&&(n.directional.length=h,n.spot.length=g,n.rectArea.length=m,n.point.length=_,n.hemi.length=p,n.directionalShadow.length=y,n.directionalShadowMap.length=y,n.pointShadow.length=v,n.pointShadowMap.length=v,n.spotShadow.length=x,n.spotShadowMap.length=x,n.directionalShadowMatrix.length=y,n.pointShadowMatrix.length=v,n.spotLightMatrix.length=x+E-b,n.spotLightMap.length=E,n.numSpotLightShadowsWithMaps=b,n.numLightProbes=S,P.directionalLength=h,P.pointLength=_,P.spotLength=g,P.rectAreaLength=m,P.hemiLength=p,P.numDirectionalShadows=y,P.numPointShadows=v,P.numSpotShadows=x,P.numSpotMaps=E,P.numLightProbes=S,n.version=QM++)}function l(c,u){let d=0,f=0,h=0,_=0,g=0;const m=u.matrixWorldInverse;for(let p=0,y=c.length;p<y;p++){const v=c[p];if(v.isDirectionalLight){const x=n.directional[d];x.direction.setFromMatrixPosition(v.matrixWorld),i.setFromMatrixPosition(v.target.matrixWorld),x.direction.sub(i),x.direction.transformDirection(m),d++}else if(v.isSpotLight){const x=n.spot[h];x.position.setFromMatrixPosition(v.matrixWorld),x.position.applyMatrix4(m),x.direction.setFromMatrixPosition(v.matrixWorld),i.setFromMatrixPosition(v.target.matrixWorld),x.direction.sub(i),x.direction.transformDirection(m),h++}else if(v.isRectAreaLight){const x=n.rectArea[_];x.position.setFromMatrixPosition(v.matrixWorld),x.position.applyMatrix4(m),o.identity(),s.copy(v.matrixWorld),s.premultiply(m),o.extractRotation(s),x.halfWidth.set(v.width*.5,0,0),x.halfHeight.set(0,v.height*.5,0),x.halfWidth.applyMatrix4(o),x.halfHeight.applyMatrix4(o),_++}else if(v.isPointLight){const x=n.point[f];x.position.setFromMatrixPosition(v.matrixWorld),x.position.applyMatrix4(m),f++}else if(v.isHemisphereLight){const x=n.hemi[g];x.direction.setFromMatrixPosition(v.matrixWorld),x.direction.transformDirection(m),g++}}}return{setup:a,setupView:l,state:n}}function Gm(r){const e=new tT(r),t=[],n=[];function i(u){c.camera=u,t.length=0,n.length=0}function s(u){t.push(u)}function o(u){n.push(u)}function a(){e.setup(t)}function l(u){e.setupView(t,u)}const c={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:i,state:c,setupLights:a,setupLightsView:l,pushLight:s,pushShadow:o}}function nT(r){let e=new WeakMap;function t(i,s=0){const o=e.get(i);let a;return o===void 0?(a=new Gm(r),e.set(i,[a])):s>=o.length?(a=new Gm(r),o.push(a)):a=o[s],a}function n(){e=new WeakMap}return{get:t,dispose:n}}const iT=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,rT=`uniform sampler2D shadow_pass;
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
}`;function sT(r,e,t){let n=new zh;const i=new Rt,s=new Rt,o=new Wt,a=new eb({depthPacking:qv}),l=new tb,c={},u=t.maxTextureSize,d={[qr]:li,[li]:qr,[Fi]:Fi},f=new Ti({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Rt},radius:{value:4}},vertexShader:iT,fragmentShader:rT}),h=f.clone();h.defines.HORIZONTAL_PASS=1;const _=new hi;_.setAttribute("position",new Gt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const g=new pi(_,f),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=fg;let p=this.type;this.render=function(b,S,P){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||b.length===0)return;const w=r.getRenderTarget(),M=r.getActiveCubeFace(),L=r.getActiveMipmapLevel(),F=r.state;F.setBlending(Hr),F.buffers.depth.getReversed()===!0?F.buffers.color.setClear(0,0,0,0):F.buffers.color.setClear(1,1,1,1),F.buffers.depth.setTest(!0),F.setScissorTest(!1);const G=p!==Dr&&this.type===Dr,U=p===Dr&&this.type!==Dr;for(let X=0,Z=b.length;X<Z;X++){const C=b[X],Y=C.shadow;if(Y===void 0){lt("WebGLShadowMap:",C,"has no shadow.");continue}if(Y.autoUpdate===!1&&Y.needsUpdate===!1)continue;i.copy(Y.mapSize);const de=Y.getFrameExtents();if(i.multiply(de),s.copy(Y.mapSize),(i.x>u||i.y>u)&&(i.x>u&&(s.x=Math.floor(u/de.x),i.x=s.x*de.x,Y.mapSize.x=s.x),i.y>u&&(s.y=Math.floor(u/de.y),i.y=s.y*de.y,Y.mapSize.y=s.y)),Y.map===null||G===!0||U===!0){const xe=this.type!==Dr?{minFilter:si,magFilter:si}:{};Y.map!==null&&Y.map.dispose(),Y.map=new co(i.x,i.y,xe),Y.map.texture.name=C.name+".shadowMap",Y.camera.updateProjectionMatrix()}r.setRenderTarget(Y.map),r.clear();const I=Y.getViewportCount();for(let xe=0;xe<I;xe++){const ve=Y.getViewport(xe);o.set(s.x*ve.x,s.y*ve.y,s.x*ve.z,s.y*ve.w),F.viewport(o),Y.updateMatrices(C,xe),n=Y.getFrustum(),x(S,P,Y.camera,C,this.type)}Y.isPointLightShadow!==!0&&this.type===Dr&&y(Y,P),Y.needsUpdate=!1}p=this.type,m.needsUpdate=!1,r.setRenderTarget(w,M,L)};function y(b,S){const P=e.update(g);f.defines.VSM_SAMPLES!==b.blurSamples&&(f.defines.VSM_SAMPLES=b.blurSamples,h.defines.VSM_SAMPLES=b.blurSamples,f.needsUpdate=!0,h.needsUpdate=!0),b.mapPass===null&&(b.mapPass=new co(i.x,i.y)),f.uniforms.shadow_pass.value=b.map.texture,f.uniforms.resolution.value=b.mapSize,f.uniforms.radius.value=b.radius,r.setRenderTarget(b.mapPass),r.clear(),r.renderBufferDirect(S,null,P,f,g,null),h.uniforms.shadow_pass.value=b.mapPass.texture,h.uniforms.resolution.value=b.mapSize,h.uniforms.radius.value=b.radius,r.setRenderTarget(b.map),r.clear(),r.renderBufferDirect(S,null,P,h,g,null)}function v(b,S,P,w){let M=null;const L=P.isPointLight===!0?b.customDistanceMaterial:b.customDepthMaterial;if(L!==void 0)M=L;else if(M=P.isPointLight===!0?l:a,r.localClippingEnabled&&S.clipShadows===!0&&Array.isArray(S.clippingPlanes)&&S.clippingPlanes.length!==0||S.displacementMap&&S.displacementScale!==0||S.alphaMap&&S.alphaTest>0||S.map&&S.alphaTest>0||S.alphaToCoverage===!0){const F=M.uuid,G=S.uuid;let U=c[F];U===void 0&&(U={},c[F]=U);let X=U[G];X===void 0&&(X=M.clone(),U[G]=X,S.addEventListener("dispose",E)),M=X}if(M.visible=S.visible,M.wireframe=S.wireframe,w===Dr?M.side=S.shadowSide!==null?S.shadowSide:S.side:M.side=S.shadowSide!==null?S.shadowSide:d[S.side],M.alphaMap=S.alphaMap,M.alphaTest=S.alphaToCoverage===!0?.5:S.alphaTest,M.map=S.map,M.clipShadows=S.clipShadows,M.clippingPlanes=S.clippingPlanes,M.clipIntersection=S.clipIntersection,M.displacementMap=S.displacementMap,M.displacementScale=S.displacementScale,M.displacementBias=S.displacementBias,M.wireframeLinewidth=S.wireframeLinewidth,M.linewidth=S.linewidth,P.isPointLight===!0&&M.isMeshDistanceMaterial===!0){const F=r.properties.get(M);F.light=P}return M}function x(b,S,P,w,M){if(b.visible===!1)return;if(b.layers.test(S.layers)&&(b.isMesh||b.isLine||b.isPoints)&&(b.castShadow||b.receiveShadow&&M===Dr)&&(!b.frustumCulled||n.intersectsObject(b))){b.modelViewMatrix.multiplyMatrices(P.matrixWorldInverse,b.matrixWorld);const G=e.update(b),U=b.material;if(Array.isArray(U)){const X=G.groups;for(let Z=0,C=X.length;Z<C;Z++){const Y=X[Z],de=U[Y.materialIndex];if(de&&de.visible){const I=v(b,de,w,M);b.onBeforeShadow(r,b,S,P,G,I,Y),r.renderBufferDirect(P,null,G,I,b,Y),b.onAfterShadow(r,b,S,P,G,I,Y)}}}else if(U.visible){const X=v(b,U,w,M);b.onBeforeShadow(r,b,S,P,G,X,null),r.renderBufferDirect(P,null,G,X,b,null),b.onAfterShadow(r,b,S,P,G,X,null)}}const F=b.children;for(let G=0,U=F.length;G<U;G++)x(F[G],S,P,w,M)}function E(b){b.target.removeEventListener("dispose",E);for(const P in c){const w=c[P],M=b.target.uuid;M in w&&(w[M].dispose(),delete w[M])}}}const oT={[$d]:Kd,[Zd]:ef,[Jd]:tf,[ca]:Qd,[Kd]:$d,[ef]:Zd,[tf]:Jd,[Qd]:ca};function aT(r,e){function t(){let O=!1;const we=new Wt;let se=null;const ge=new Wt(0,0,0,0);return{setMask:function(le){se!==le&&!O&&(r.colorMask(le,le,le,le),se=le)},setLocked:function(le){O=le},setClear:function(le,ue,ke,it,Ut){Ut===!0&&(le*=it,ue*=it,ke*=it),we.set(le,ue,ke,it),ge.equals(we)===!1&&(r.clearColor(le,ue,ke,it),ge.copy(we))},reset:function(){O=!1,se=null,ge.set(-1,0,0,0)}}}function n(){let O=!1,we=!1,se=null,ge=null,le=null;return{setReversed:function(ue){if(we!==ue){const ke=e.get("EXT_clip_control");ue?ke.clipControlEXT(ke.LOWER_LEFT_EXT,ke.ZERO_TO_ONE_EXT):ke.clipControlEXT(ke.LOWER_LEFT_EXT,ke.NEGATIVE_ONE_TO_ONE_EXT),we=ue;const it=le;le=null,this.setClear(it)}},getReversed:function(){return we},setTest:function(ue){ue?ie(r.DEPTH_TEST):be(r.DEPTH_TEST)},setMask:function(ue){se!==ue&&!O&&(r.depthMask(ue),se=ue)},setFunc:function(ue){if(we&&(ue=oT[ue]),ge!==ue){switch(ue){case $d:r.depthFunc(r.NEVER);break;case Kd:r.depthFunc(r.ALWAYS);break;case Zd:r.depthFunc(r.LESS);break;case ca:r.depthFunc(r.LEQUAL);break;case Jd:r.depthFunc(r.EQUAL);break;case Qd:r.depthFunc(r.GEQUAL);break;case ef:r.depthFunc(r.GREATER);break;case tf:r.depthFunc(r.NOTEQUAL);break;default:r.depthFunc(r.LEQUAL)}ge=ue}},setLocked:function(ue){O=ue},setClear:function(ue){le!==ue&&(we&&(ue=1-ue),r.clearDepth(ue),le=ue)},reset:function(){O=!1,se=null,ge=null,le=null,we=!1}}}function i(){let O=!1,we=null,se=null,ge=null,le=null,ue=null,ke=null,it=null,Ut=null;return{setTest:function(Be){O||(Be?ie(r.STENCIL_TEST):be(r.STENCIL_TEST))},setMask:function(Be){we!==Be&&!O&&(r.stencilMask(Be),we=Be)},setFunc:function(Be,Oe,dt){(se!==Be||ge!==Oe||le!==dt)&&(r.stencilFunc(Be,Oe,dt),se=Be,ge=Oe,le=dt)},setOp:function(Be,Oe,dt){(ue!==Be||ke!==Oe||it!==dt)&&(r.stencilOp(Be,Oe,dt),ue=Be,ke=Oe,it=dt)},setLocked:function(Be){O=Be},setClear:function(Be){Ut!==Be&&(r.clearStencil(Be),Ut=Be)},reset:function(){O=!1,we=null,se=null,ge=null,le=null,ue=null,ke=null,it=null,Ut=null}}}const s=new t,o=new n,a=new i,l=new WeakMap,c=new WeakMap;let u={},d={},f=new WeakMap,h=[],_=null,g=!1,m=null,p=null,y=null,v=null,x=null,E=null,b=null,S=new Qe(0,0,0),P=0,w=!1,M=null,L=null,F=null,G=null,U=null;const X=r.getParameter(r.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let Z=!1,C=0;const Y=r.getParameter(r.VERSION);Y.indexOf("WebGL")!==-1?(C=parseFloat(/^WebGL (\d)/.exec(Y)[1]),Z=C>=1):Y.indexOf("OpenGL ES")!==-1&&(C=parseFloat(/^OpenGL ES (\d)/.exec(Y)[1]),Z=C>=2);let de=null,I={};const xe=r.getParameter(r.SCISSOR_BOX),ve=r.getParameter(r.VIEWPORT),ee=new Wt().fromArray(xe),Xe=new Wt().fromArray(ve);function qe(O,we,se,ge){const le=new Uint8Array(4),ue=r.createTexture();r.bindTexture(O,ue),r.texParameteri(O,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(O,r.TEXTURE_MAG_FILTER,r.NEAREST);for(let ke=0;ke<se;ke++)O===r.TEXTURE_3D||O===r.TEXTURE_2D_ARRAY?r.texImage3D(we,0,r.RGBA,1,1,ge,0,r.RGBA,r.UNSIGNED_BYTE,le):r.texImage2D(we+ke,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,le);return ue}const ne={};ne[r.TEXTURE_2D]=qe(r.TEXTURE_2D,r.TEXTURE_2D,1),ne[r.TEXTURE_CUBE_MAP]=qe(r.TEXTURE_CUBE_MAP,r.TEXTURE_CUBE_MAP_POSITIVE_X,6),ne[r.TEXTURE_2D_ARRAY]=qe(r.TEXTURE_2D_ARRAY,r.TEXTURE_2D_ARRAY,1,1),ne[r.TEXTURE_3D]=qe(r.TEXTURE_3D,r.TEXTURE_3D,1,1),s.setClear(0,0,0,1),o.setClear(1),a.setClear(0),ie(r.DEPTH_TEST),o.setFunc(ca),st(!1),z(Cp),ie(r.CULL_FACE),ct(Hr);function ie(O){u[O]!==!0&&(r.enable(O),u[O]=!0)}function be(O){u[O]!==!1&&(r.disable(O),u[O]=!1)}function Ye(O,we){return d[O]!==we?(r.bindFramebuffer(O,we),d[O]=we,O===r.DRAW_FRAMEBUFFER&&(d[r.FRAMEBUFFER]=we),O===r.FRAMEBUFFER&&(d[r.DRAW_FRAMEBUFFER]=we),!0):!1}function ye(O,we){let se=h,ge=!1;if(O){se=f.get(we),se===void 0&&(se=[],f.set(we,se));const le=O.textures;if(se.length!==le.length||se[0]!==r.COLOR_ATTACHMENT0){for(let ue=0,ke=le.length;ue<ke;ue++)se[ue]=r.COLOR_ATTACHMENT0+ue;se.length=le.length,ge=!0}}else se[0]!==r.BACK&&(se[0]=r.BACK,ge=!0);ge&&r.drawBuffers(se)}function tt(O){return _!==O?(r.useProgram(O),_=O,!0):!1}const ht={[qs]:r.FUNC_ADD,[gv]:r.FUNC_SUBTRACT,[_v]:r.FUNC_REVERSE_SUBTRACT};ht[xv]=r.MIN,ht[vv]=r.MAX;const Ie={[yv]:r.ZERO,[bv]:r.ONE,[Sv]:r.SRC_COLOR,[Yd]:r.SRC_ALPHA,[Cv]:r.SRC_ALPHA_SATURATE,[Ev]:r.DST_COLOR,[Mv]:r.DST_ALPHA,[wv]:r.ONE_MINUS_SRC_COLOR,[jd]:r.ONE_MINUS_SRC_ALPHA,[Av]:r.ONE_MINUS_DST_COLOR,[Tv]:r.ONE_MINUS_DST_ALPHA,[Rv]:r.CONSTANT_COLOR,[Pv]:r.ONE_MINUS_CONSTANT_COLOR,[Lv]:r.CONSTANT_ALPHA,[Dv]:r.ONE_MINUS_CONSTANT_ALPHA};function ct(O,we,se,ge,le,ue,ke,it,Ut,Be){if(O===Hr){g===!0&&(be(r.BLEND),g=!1);return}if(g===!1&&(ie(r.BLEND),g=!0),O!==mv){if(O!==m||Be!==w){if((p!==qs||x!==qs)&&(r.blendEquation(r.FUNC_ADD),p=qs,x=qs),Be)switch(O){case _s:r.blendFuncSeparate(r.ONE,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case ru:r.blendFunc(r.ONE,r.ONE);break;case Rp:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case Pp:r.blendFuncSeparate(r.DST_COLOR,r.ONE_MINUS_SRC_ALPHA,r.ZERO,r.ONE);break;default:Et("WebGLState: Invalid blending: ",O);break}else switch(O){case _s:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case ru:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE,r.ONE,r.ONE);break;case Rp:Et("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Pp:Et("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Et("WebGLState: Invalid blending: ",O);break}y=null,v=null,E=null,b=null,S.set(0,0,0),P=0,m=O,w=Be}return}le=le||we,ue=ue||se,ke=ke||ge,(we!==p||le!==x)&&(r.blendEquationSeparate(ht[we],ht[le]),p=we,x=le),(se!==y||ge!==v||ue!==E||ke!==b)&&(r.blendFuncSeparate(Ie[se],Ie[ge],Ie[ue],Ie[ke]),y=se,v=ge,E=ue,b=ke),(it.equals(S)===!1||Ut!==P)&&(r.blendColor(it.r,it.g,it.b,Ut),S.copy(it),P=Ut),m=O,w=!1}function N(O,we){O.side===Fi?be(r.CULL_FACE):ie(r.CULL_FACE);let se=O.side===li;we&&(se=!se),st(se),O.blending===_s&&O.transparent===!1?ct(Hr):ct(O.blending,O.blendEquation,O.blendSrc,O.blendDst,O.blendEquationAlpha,O.blendSrcAlpha,O.blendDstAlpha,O.blendColor,O.blendAlpha,O.premultipliedAlpha),o.setFunc(O.depthFunc),o.setTest(O.depthTest),o.setMask(O.depthWrite),s.setMask(O.colorWrite);const ge=O.stencilWrite;a.setTest(ge),ge&&(a.setMask(O.stencilWriteMask),a.setFunc(O.stencilFunc,O.stencilRef,O.stencilFuncMask),a.setOp(O.stencilFail,O.stencilZFail,O.stencilZPass)),Fe(O.polygonOffset,O.polygonOffsetFactor,O.polygonOffsetUnits),O.alphaToCoverage===!0?ie(r.SAMPLE_ALPHA_TO_COVERAGE):be(r.SAMPLE_ALPHA_TO_COVERAGE)}function st(O){M!==O&&(O?r.frontFace(r.CW):r.frontFace(r.CCW),M=O)}function z(O){O!==fv?(ie(r.CULL_FACE),O!==L&&(O===Cp?r.cullFace(r.BACK):O===hv?r.cullFace(r.FRONT):r.cullFace(r.FRONT_AND_BACK))):be(r.CULL_FACE),L=O}function pt(O){O!==F&&(Z&&r.lineWidth(O),F=O)}function Fe(O,we,se){O?(ie(r.POLYGON_OFFSET_FILL),(G!==we||U!==se)&&(r.polygonOffset(we,se),G=we,U=se)):be(r.POLYGON_OFFSET_FILL)}function Pt(O){O?ie(r.SCISSOR_TEST):be(r.SCISSOR_TEST)}function Ae(O){O===void 0&&(O=r.TEXTURE0+X-1),de!==O&&(r.activeTexture(O),de=O)}function Ze(O,we,se){se===void 0&&(de===null?se=r.TEXTURE0+X-1:se=de);let ge=I[se];ge===void 0&&(ge={type:void 0,texture:void 0},I[se]=ge),(ge.type!==O||ge.texture!==we)&&(de!==se&&(r.activeTexture(se),de=se),r.bindTexture(O,we||ne[O]),ge.type=O,ge.texture=we)}function D(){const O=I[de];O!==void 0&&O.type!==void 0&&(r.bindTexture(O.type,null),O.type=void 0,O.texture=void 0)}function A(){try{r.compressedTexImage2D(...arguments)}catch(O){O("WebGLState:",O)}}function H(){try{r.compressedTexImage3D(...arguments)}catch(O){O("WebGLState:",O)}}function ae(){try{r.texSubImage2D(...arguments)}catch(O){O("WebGLState:",O)}}function oe(){try{r.texSubImage3D(...arguments)}catch(O){O("WebGLState:",O)}}function $(){try{r.compressedTexSubImage2D(...arguments)}catch(O){O("WebGLState:",O)}}function Ce(){try{r.compressedTexSubImage3D(...arguments)}catch(O){O("WebGLState:",O)}}function me(){try{r.texStorage2D(...arguments)}catch(O){O("WebGLState:",O)}}function Ue(){try{r.texStorage3D(...arguments)}catch(O){O("WebGLState:",O)}}function Te(){try{r.texImage2D(...arguments)}catch(O){O("WebGLState:",O)}}function he(){try{r.texImage3D(...arguments)}catch(O){O("WebGLState:",O)}}function Q(O){ee.equals(O)===!1&&(r.scissor(O.x,O.y,O.z,O.w),ee.copy(O))}function Ge(O){Xe.equals(O)===!1&&(r.viewport(O.x,O.y,O.z,O.w),Xe.copy(O))}function We(O,we){let se=c.get(we);se===void 0&&(se=new WeakMap,c.set(we,se));let ge=se.get(O);ge===void 0&&(ge=r.getUniformBlockIndex(we,O.name),se.set(O,ge))}function Se(O,we){const ge=c.get(we).get(O);l.get(we)!==ge&&(r.uniformBlockBinding(we,ge,O.__bindingPointIndex),l.set(we,ge))}function Ee(){r.disable(r.BLEND),r.disable(r.CULL_FACE),r.disable(r.DEPTH_TEST),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.disable(r.SAMPLE_ALPHA_TO_COVERAGE),r.blendEquation(r.FUNC_ADD),r.blendFunc(r.ONE,r.ZERO),r.blendFuncSeparate(r.ONE,r.ZERO,r.ONE,r.ZERO),r.blendColor(0,0,0,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(r.LESS),o.setReversed(!1),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(r.ALWAYS,0,4294967295),r.stencilOp(r.KEEP,r.KEEP,r.KEEP),r.clearStencil(0),r.cullFace(r.BACK),r.frontFace(r.CCW),r.polygonOffset(0,0),r.activeTexture(r.TEXTURE0),r.bindFramebuffer(r.FRAMEBUFFER,null),r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),r.bindFramebuffer(r.READ_FRAMEBUFFER,null),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),u={},de=null,I={},d={},f=new WeakMap,h=[],_=null,g=!1,m=null,p=null,y=null,v=null,x=null,E=null,b=null,S=new Qe(0,0,0),P=0,w=!1,M=null,L=null,F=null,G=null,U=null,ee.set(0,0,r.canvas.width,r.canvas.height),Xe.set(0,0,r.canvas.width,r.canvas.height),s.reset(),o.reset(),a.reset()}return{buffers:{color:s,depth:o,stencil:a},enable:ie,disable:be,bindFramebuffer:Ye,drawBuffers:ye,useProgram:tt,setBlending:ct,setMaterial:N,setFlipSided:st,setCullFace:z,setLineWidth:pt,setPolygonOffset:Fe,setScissorTest:Pt,activeTexture:Ae,bindTexture:Ze,unbindTexture:D,compressedTexImage2D:A,compressedTexImage3D:H,texImage2D:Te,texImage3D:he,updateUBOMapping:We,uniformBlockBinding:Se,texStorage2D:me,texStorage3D:Ue,texSubImage2D:ae,texSubImage3D:oe,compressedTexSubImage2D:$,compressedTexSubImage3D:Ce,scissor:Q,viewport:Ge,reset:Ee}}function lT(r,e,t,n,i,s,o){const a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Rt,u=new WeakMap;let d;const f=new WeakMap;let h=!1;try{h=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function _(D,A){return h?new OffscreenCanvas(D,A):Ll("canvas")}function g(D,A,H){let ae=1;const oe=Ze(D);if((oe.width>H||oe.height>H)&&(ae=H/Math.max(oe.width,oe.height)),ae<1)if(typeof HTMLImageElement<"u"&&D instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&D instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&D instanceof ImageBitmap||typeof VideoFrame<"u"&&D instanceof VideoFrame){const $=Math.floor(ae*oe.width),Ce=Math.floor(ae*oe.height);d===void 0&&(d=_($,Ce));const me=A?_($,Ce):d;return me.width=$,me.height=Ce,me.getContext("2d").drawImage(D,0,0,$,Ce),lt("WebGLRenderer: Texture has been resized from ("+oe.width+"x"+oe.height+") to ("+$+"x"+Ce+")."),me}else return"data"in D&&lt("WebGLRenderer: Image in DataTexture is too big ("+oe.width+"x"+oe.height+")."),D;return D}function m(D){return D.generateMipmaps}function p(D){r.generateMipmap(D)}function y(D){return D.isWebGLCubeRenderTarget?r.TEXTURE_CUBE_MAP:D.isWebGL3DRenderTarget?r.TEXTURE_3D:D.isWebGLArrayRenderTarget||D.isCompressedArrayTexture?r.TEXTURE_2D_ARRAY:r.TEXTURE_2D}function v(D,A,H,ae,oe=!1){if(D!==null){if(r[D]!==void 0)return r[D];lt("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+D+"'")}let $=A;if(A===r.RED&&(H===r.FLOAT&&($=r.R32F),H===r.HALF_FLOAT&&($=r.R16F),H===r.UNSIGNED_BYTE&&($=r.R8)),A===r.RED_INTEGER&&(H===r.UNSIGNED_BYTE&&($=r.R8UI),H===r.UNSIGNED_SHORT&&($=r.R16UI),H===r.UNSIGNED_INT&&($=r.R32UI),H===r.BYTE&&($=r.R8I),H===r.SHORT&&($=r.R16I),H===r.INT&&($=r.R32I)),A===r.RG&&(H===r.FLOAT&&($=r.RG32F),H===r.HALF_FLOAT&&($=r.RG16F),H===r.UNSIGNED_BYTE&&($=r.RG8)),A===r.RG_INTEGER&&(H===r.UNSIGNED_BYTE&&($=r.RG8UI),H===r.UNSIGNED_SHORT&&($=r.RG16UI),H===r.UNSIGNED_INT&&($=r.RG32UI),H===r.BYTE&&($=r.RG8I),H===r.SHORT&&($=r.RG16I),H===r.INT&&($=r.RG32I)),A===r.RGB_INTEGER&&(H===r.UNSIGNED_BYTE&&($=r.RGB8UI),H===r.UNSIGNED_SHORT&&($=r.RGB16UI),H===r.UNSIGNED_INT&&($=r.RGB32UI),H===r.BYTE&&($=r.RGB8I),H===r.SHORT&&($=r.RGB16I),H===r.INT&&($=r.RGB32I)),A===r.RGBA_INTEGER&&(H===r.UNSIGNED_BYTE&&($=r.RGBA8UI),H===r.UNSIGNED_SHORT&&($=r.RGBA16UI),H===r.UNSIGNED_INT&&($=r.RGBA32UI),H===r.BYTE&&($=r.RGBA8I),H===r.SHORT&&($=r.RGBA16I),H===r.INT&&($=r.RGBA32I)),A===r.RGB&&(H===r.UNSIGNED_INT_5_9_9_9_REV&&($=r.RGB9_E5),H===r.UNSIGNED_INT_10F_11F_11F_REV&&($=r.R11F_G11F_B10F)),A===r.RGBA){const Ce=oe?ou:Dt.getTransfer(ae);H===r.FLOAT&&($=r.RGBA32F),H===r.HALF_FLOAT&&($=r.RGBA16F),H===r.UNSIGNED_BYTE&&($=Ce===jt?r.SRGB8_ALPHA8:r.RGBA8),H===r.UNSIGNED_SHORT_4_4_4_4&&($=r.RGBA4),H===r.UNSIGNED_SHORT_5_5_5_1&&($=r.RGB5_A1)}return($===r.R16F||$===r.R32F||$===r.RG16F||$===r.RG32F||$===r.RGBA16F||$===r.RGBA32F)&&e.get("EXT_color_buffer_float"),$}function x(D,A){let H;return D?A===null||A===lo||A===El?H=r.DEPTH24_STENCIL8:A===Ki?H=r.DEPTH32F_STENCIL8:A===Tl&&(H=r.DEPTH24_STENCIL8,lt("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):A===null||A===lo||A===El?H=r.DEPTH_COMPONENT24:A===Ki?H=r.DEPTH_COMPONENT32F:A===Tl&&(H=r.DEPTH_COMPONENT16),H}function E(D,A){return m(D)===!0||D.isFramebufferTexture&&D.minFilter!==si&&D.minFilter!==ri?Math.log2(Math.max(A.width,A.height))+1:D.mipmaps!==void 0&&D.mipmaps.length>0?D.mipmaps.length:D.isCompressedTexture&&Array.isArray(D.image)?A.mipmaps.length:1}function b(D){const A=D.target;A.removeEventListener("dispose",b),P(A),A.isVideoTexture&&u.delete(A)}function S(D){const A=D.target;A.removeEventListener("dispose",S),M(A)}function P(D){const A=n.get(D);if(A.__webglInit===void 0)return;const H=D.source,ae=f.get(H);if(ae){const oe=ae[A.__cacheKey];oe.usedTimes--,oe.usedTimes===0&&w(D),Object.keys(ae).length===0&&f.delete(H)}n.remove(D)}function w(D){const A=n.get(D);r.deleteTexture(A.__webglTexture);const H=D.source,ae=f.get(H);delete ae[A.__cacheKey],o.memory.textures--}function M(D){const A=n.get(D);if(D.depthTexture&&(D.depthTexture.dispose(),n.remove(D.depthTexture)),D.isWebGLCubeRenderTarget)for(let ae=0;ae<6;ae++){if(Array.isArray(A.__webglFramebuffer[ae]))for(let oe=0;oe<A.__webglFramebuffer[ae].length;oe++)r.deleteFramebuffer(A.__webglFramebuffer[ae][oe]);else r.deleteFramebuffer(A.__webglFramebuffer[ae]);A.__webglDepthbuffer&&r.deleteRenderbuffer(A.__webglDepthbuffer[ae])}else{if(Array.isArray(A.__webglFramebuffer))for(let ae=0;ae<A.__webglFramebuffer.length;ae++)r.deleteFramebuffer(A.__webglFramebuffer[ae]);else r.deleteFramebuffer(A.__webglFramebuffer);if(A.__webglDepthbuffer&&r.deleteRenderbuffer(A.__webglDepthbuffer),A.__webglMultisampledFramebuffer&&r.deleteFramebuffer(A.__webglMultisampledFramebuffer),A.__webglColorRenderbuffer)for(let ae=0;ae<A.__webglColorRenderbuffer.length;ae++)A.__webglColorRenderbuffer[ae]&&r.deleteRenderbuffer(A.__webglColorRenderbuffer[ae]);A.__webglDepthRenderbuffer&&r.deleteRenderbuffer(A.__webglDepthRenderbuffer)}const H=D.textures;for(let ae=0,oe=H.length;ae<oe;ae++){const $=n.get(H[ae]);$.__webglTexture&&(r.deleteTexture($.__webglTexture),o.memory.textures--),n.remove(H[ae])}n.remove(D)}let L=0;function F(){L=0}function G(){const D=L;return D>=i.maxTextures&&lt("WebGLTextures: Trying to use "+D+" texture units while this GPU supports only "+i.maxTextures),L+=1,D}function U(D){const A=[];return A.push(D.wrapS),A.push(D.wrapT),A.push(D.wrapR||0),A.push(D.magFilter),A.push(D.minFilter),A.push(D.anisotropy),A.push(D.internalFormat),A.push(D.format),A.push(D.type),A.push(D.generateMipmaps),A.push(D.premultiplyAlpha),A.push(D.flipY),A.push(D.unpackAlignment),A.push(D.colorSpace),A.join()}function X(D,A){const H=n.get(D);if(D.isVideoTexture&&Pt(D),D.isRenderTargetTexture===!1&&D.isExternalTexture!==!0&&D.version>0&&H.__version!==D.version){const ae=D.image;if(ae===null)lt("WebGLRenderer: Texture marked for update but no image data found.");else if(ae.complete===!1)lt("WebGLRenderer: Texture marked for update but image is incomplete");else{ne(H,D,A);return}}else D.isExternalTexture&&(H.__webglTexture=D.sourceTexture?D.sourceTexture:null);t.bindTexture(r.TEXTURE_2D,H.__webglTexture,r.TEXTURE0+A)}function Z(D,A){const H=n.get(D);if(D.isRenderTargetTexture===!1&&D.version>0&&H.__version!==D.version){ne(H,D,A);return}else D.isExternalTexture&&(H.__webglTexture=D.sourceTexture?D.sourceTexture:null);t.bindTexture(r.TEXTURE_2D_ARRAY,H.__webglTexture,r.TEXTURE0+A)}function C(D,A){const H=n.get(D);if(D.isRenderTargetTexture===!1&&D.version>0&&H.__version!==D.version){ne(H,D,A);return}t.bindTexture(r.TEXTURE_3D,H.__webglTexture,r.TEXTURE0+A)}function Y(D,A){const H=n.get(D);if(D.version>0&&H.__version!==D.version){ie(H,D,A);return}t.bindTexture(r.TEXTURE_CUBE_MAP,H.__webglTexture,r.TEXTURE0+A)}const de={[fa]:r.REPEAT,[dr]:r.CLAMP_TO_EDGE,[su]:r.MIRRORED_REPEAT},I={[si]:r.NEAREST,[mg]:r.NEAREST_MIPMAP_NEAREST,[Ya]:r.NEAREST_MIPMAP_LINEAR,[ri]:r.LINEAR,[Vc]:r.LINEAR_MIPMAP_NEAREST,[Ur]:r.LINEAR_MIPMAP_LINEAR},xe={[jv]:r.NEVER,[ey]:r.ALWAYS,[$v]:r.LESS,[Mg]:r.LEQUAL,[Kv]:r.EQUAL,[Qv]:r.GEQUAL,[Zv]:r.GREATER,[Jv]:r.NOTEQUAL};function ve(D,A){if(A.type===Ki&&e.has("OES_texture_float_linear")===!1&&(A.magFilter===ri||A.magFilter===Vc||A.magFilter===Ya||A.magFilter===Ur||A.minFilter===ri||A.minFilter===Vc||A.minFilter===Ya||A.minFilter===Ur)&&lt("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),r.texParameteri(D,r.TEXTURE_WRAP_S,de[A.wrapS]),r.texParameteri(D,r.TEXTURE_WRAP_T,de[A.wrapT]),(D===r.TEXTURE_3D||D===r.TEXTURE_2D_ARRAY)&&r.texParameteri(D,r.TEXTURE_WRAP_R,de[A.wrapR]),r.texParameteri(D,r.TEXTURE_MAG_FILTER,I[A.magFilter]),r.texParameteri(D,r.TEXTURE_MIN_FILTER,I[A.minFilter]),A.compareFunction&&(r.texParameteri(D,r.TEXTURE_COMPARE_MODE,r.COMPARE_REF_TO_TEXTURE),r.texParameteri(D,r.TEXTURE_COMPARE_FUNC,xe[A.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(A.magFilter===si||A.minFilter!==Ya&&A.minFilter!==Ur||A.type===Ki&&e.has("OES_texture_float_linear")===!1)return;if(A.anisotropy>1||n.get(A).__currentAnisotropy){const H=e.get("EXT_texture_filter_anisotropic");r.texParameterf(D,H.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(A.anisotropy,i.getMaxAnisotropy())),n.get(A).__currentAnisotropy=A.anisotropy}}}function ee(D,A){let H=!1;D.__webglInit===void 0&&(D.__webglInit=!0,A.addEventListener("dispose",b));const ae=A.source;let oe=f.get(ae);oe===void 0&&(oe={},f.set(ae,oe));const $=U(A);if($!==D.__cacheKey){oe[$]===void 0&&(oe[$]={texture:r.createTexture(),usedTimes:0},o.memory.textures++,H=!0),oe[$].usedTimes++;const Ce=oe[D.__cacheKey];Ce!==void 0&&(oe[D.__cacheKey].usedTimes--,Ce.usedTimes===0&&w(A)),D.__cacheKey=$,D.__webglTexture=oe[$].texture}return H}function Xe(D,A,H){return Math.floor(Math.floor(D/H)/A)}function qe(D,A,H,ae){const $=D.updateRanges;if($.length===0)t.texSubImage2D(r.TEXTURE_2D,0,0,0,A.width,A.height,H,ae,A.data);else{$.sort((he,Q)=>he.start-Q.start);let Ce=0;for(let he=1;he<$.length;he++){const Q=$[Ce],Ge=$[he],We=Q.start+Q.count,Se=Xe(Ge.start,A.width,4),Ee=Xe(Q.start,A.width,4);Ge.start<=We+1&&Se===Ee&&Xe(Ge.start+Ge.count-1,A.width,4)===Se?Q.count=Math.max(Q.count,Ge.start+Ge.count-Q.start):(++Ce,$[Ce]=Ge)}$.length=Ce+1;const me=r.getParameter(r.UNPACK_ROW_LENGTH),Ue=r.getParameter(r.UNPACK_SKIP_PIXELS),Te=r.getParameter(r.UNPACK_SKIP_ROWS);r.pixelStorei(r.UNPACK_ROW_LENGTH,A.width);for(let he=0,Q=$.length;he<Q;he++){const Ge=$[he],We=Math.floor(Ge.start/4),Se=Math.ceil(Ge.count/4),Ee=We%A.width,O=Math.floor(We/A.width),we=Se,se=1;r.pixelStorei(r.UNPACK_SKIP_PIXELS,Ee),r.pixelStorei(r.UNPACK_SKIP_ROWS,O),t.texSubImage2D(r.TEXTURE_2D,0,Ee,O,we,se,H,ae,A.data)}D.clearUpdateRanges(),r.pixelStorei(r.UNPACK_ROW_LENGTH,me),r.pixelStorei(r.UNPACK_SKIP_PIXELS,Ue),r.pixelStorei(r.UNPACK_SKIP_ROWS,Te)}}function ne(D,A,H){let ae=r.TEXTURE_2D;(A.isDataArrayTexture||A.isCompressedArrayTexture)&&(ae=r.TEXTURE_2D_ARRAY),A.isData3DTexture&&(ae=r.TEXTURE_3D);const oe=ee(D,A),$=A.source;t.bindTexture(ae,D.__webglTexture,r.TEXTURE0+H);const Ce=n.get($);if($.version!==Ce.__version||oe===!0){t.activeTexture(r.TEXTURE0+H);const me=Dt.getPrimaries(Dt.workingColorSpace),Ue=A.colorSpace===ls?null:Dt.getPrimaries(A.colorSpace),Te=A.colorSpace===ls||me===Ue?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,A.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,A.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,A.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,Te);let he=g(A.image,!1,i.maxTextureSize);he=Ae(A,he);const Q=s.convert(A.format,A.colorSpace),Ge=s.convert(A.type);let We=v(A.internalFormat,Q,Ge,A.colorSpace,A.isVideoTexture);ve(ae,A);let Se;const Ee=A.mipmaps,O=A.isVideoTexture!==!0,we=Ce.__version===void 0||oe===!0,se=$.dataReady,ge=E(A,he);if(A.isDepthTexture)We=x(A.format===Cl,A.type),we&&(O?t.texStorage2D(r.TEXTURE_2D,1,We,he.width,he.height):t.texImage2D(r.TEXTURE_2D,0,We,he.width,he.height,0,Q,Ge,null));else if(A.isDataTexture)if(Ee.length>0){O&&we&&t.texStorage2D(r.TEXTURE_2D,ge,We,Ee[0].width,Ee[0].height);for(let le=0,ue=Ee.length;le<ue;le++)Se=Ee[le],O?se&&t.texSubImage2D(r.TEXTURE_2D,le,0,0,Se.width,Se.height,Q,Ge,Se.data):t.texImage2D(r.TEXTURE_2D,le,We,Se.width,Se.height,0,Q,Ge,Se.data);A.generateMipmaps=!1}else O?(we&&t.texStorage2D(r.TEXTURE_2D,ge,We,he.width,he.height),se&&qe(A,he,Q,Ge)):t.texImage2D(r.TEXTURE_2D,0,We,he.width,he.height,0,Q,Ge,he.data);else if(A.isCompressedTexture)if(A.isCompressedArrayTexture){O&&we&&t.texStorage3D(r.TEXTURE_2D_ARRAY,ge,We,Ee[0].width,Ee[0].height,he.depth);for(let le=0,ue=Ee.length;le<ue;le++)if(Se=Ee[le],A.format!==Ui)if(Q!==null)if(O){if(se)if(A.layerUpdates.size>0){const ke=ym(Se.width,Se.height,A.format,A.type);for(const it of A.layerUpdates){const Ut=Se.data.subarray(it*ke/Se.data.BYTES_PER_ELEMENT,(it+1)*ke/Se.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,le,0,0,it,Se.width,Se.height,1,Q,Ut)}A.clearLayerUpdates()}else t.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,le,0,0,0,Se.width,Se.height,he.depth,Q,Se.data)}else t.compressedTexImage3D(r.TEXTURE_2D_ARRAY,le,We,Se.width,Se.height,he.depth,0,Se.data,0,0);else lt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else O?se&&t.texSubImage3D(r.TEXTURE_2D_ARRAY,le,0,0,0,Se.width,Se.height,he.depth,Q,Ge,Se.data):t.texImage3D(r.TEXTURE_2D_ARRAY,le,We,Se.width,Se.height,he.depth,0,Q,Ge,Se.data)}else{O&&we&&t.texStorage2D(r.TEXTURE_2D,ge,We,Ee[0].width,Ee[0].height);for(let le=0,ue=Ee.length;le<ue;le++)Se=Ee[le],A.format!==Ui?Q!==null?O?se&&t.compressedTexSubImage2D(r.TEXTURE_2D,le,0,0,Se.width,Se.height,Q,Se.data):t.compressedTexImage2D(r.TEXTURE_2D,le,We,Se.width,Se.height,0,Se.data):lt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):O?se&&t.texSubImage2D(r.TEXTURE_2D,le,0,0,Se.width,Se.height,Q,Ge,Se.data):t.texImage2D(r.TEXTURE_2D,le,We,Se.width,Se.height,0,Q,Ge,Se.data)}else if(A.isDataArrayTexture)if(O){if(we&&t.texStorage3D(r.TEXTURE_2D_ARRAY,ge,We,he.width,he.height,he.depth),se)if(A.layerUpdates.size>0){const le=ym(he.width,he.height,A.format,A.type);for(const ue of A.layerUpdates){const ke=he.data.subarray(ue*le/he.data.BYTES_PER_ELEMENT,(ue+1)*le/he.data.BYTES_PER_ELEMENT);t.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,ue,he.width,he.height,1,Q,Ge,ke)}A.clearLayerUpdates()}else t.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,0,he.width,he.height,he.depth,Q,Ge,he.data)}else t.texImage3D(r.TEXTURE_2D_ARRAY,0,We,he.width,he.height,he.depth,0,Q,Ge,he.data);else if(A.isData3DTexture)O?(we&&t.texStorage3D(r.TEXTURE_3D,ge,We,he.width,he.height,he.depth),se&&t.texSubImage3D(r.TEXTURE_3D,0,0,0,0,he.width,he.height,he.depth,Q,Ge,he.data)):t.texImage3D(r.TEXTURE_3D,0,We,he.width,he.height,he.depth,0,Q,Ge,he.data);else if(A.isFramebufferTexture){if(we)if(O)t.texStorage2D(r.TEXTURE_2D,ge,We,he.width,he.height);else{let le=he.width,ue=he.height;for(let ke=0;ke<ge;ke++)t.texImage2D(r.TEXTURE_2D,ke,We,le,ue,0,Q,Ge,null),le>>=1,ue>>=1}}else if(Ee.length>0){if(O&&we){const le=Ze(Ee[0]);t.texStorage2D(r.TEXTURE_2D,ge,We,le.width,le.height)}for(let le=0,ue=Ee.length;le<ue;le++)Se=Ee[le],O?se&&t.texSubImage2D(r.TEXTURE_2D,le,0,0,Q,Ge,Se):t.texImage2D(r.TEXTURE_2D,le,We,Q,Ge,Se);A.generateMipmaps=!1}else if(O){if(we){const le=Ze(he);t.texStorage2D(r.TEXTURE_2D,ge,We,le.width,le.height)}se&&t.texSubImage2D(r.TEXTURE_2D,0,0,0,Q,Ge,he)}else t.texImage2D(r.TEXTURE_2D,0,We,Q,Ge,he);m(A)&&p(ae),Ce.__version=$.version,A.onUpdate&&A.onUpdate(A)}D.__version=A.version}function ie(D,A,H){if(A.image.length!==6)return;const ae=ee(D,A),oe=A.source;t.bindTexture(r.TEXTURE_CUBE_MAP,D.__webglTexture,r.TEXTURE0+H);const $=n.get(oe);if(oe.version!==$.__version||ae===!0){t.activeTexture(r.TEXTURE0+H);const Ce=Dt.getPrimaries(Dt.workingColorSpace),me=A.colorSpace===ls?null:Dt.getPrimaries(A.colorSpace),Ue=A.colorSpace===ls||Ce===me?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,A.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,A.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,A.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ue);const Te=A.isCompressedTexture||A.image[0].isCompressedTexture,he=A.image[0]&&A.image[0].isDataTexture,Q=[];for(let ue=0;ue<6;ue++)!Te&&!he?Q[ue]=g(A.image[ue],!0,i.maxCubemapSize):Q[ue]=he?A.image[ue].image:A.image[ue],Q[ue]=Ae(A,Q[ue]);const Ge=Q[0],We=s.convert(A.format,A.colorSpace),Se=s.convert(A.type),Ee=v(A.internalFormat,We,Se,A.colorSpace),O=A.isVideoTexture!==!0,we=$.__version===void 0||ae===!0,se=oe.dataReady;let ge=E(A,Ge);ve(r.TEXTURE_CUBE_MAP,A);let le;if(Te){O&&we&&t.texStorage2D(r.TEXTURE_CUBE_MAP,ge,Ee,Ge.width,Ge.height);for(let ue=0;ue<6;ue++){le=Q[ue].mipmaps;for(let ke=0;ke<le.length;ke++){const it=le[ke];A.format!==Ui?We!==null?O?se&&t.compressedTexSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ue,ke,0,0,it.width,it.height,We,it.data):t.compressedTexImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ue,ke,Ee,it.width,it.height,0,it.data):lt("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):O?se&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ue,ke,0,0,it.width,it.height,We,Se,it.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ue,ke,Ee,it.width,it.height,0,We,Se,it.data)}}}else{if(le=A.mipmaps,O&&we){le.length>0&&ge++;const ue=Ze(Q[0]);t.texStorage2D(r.TEXTURE_CUBE_MAP,ge,Ee,ue.width,ue.height)}for(let ue=0;ue<6;ue++)if(he){O?se&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ue,0,0,0,Q[ue].width,Q[ue].height,We,Se,Q[ue].data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ue,0,Ee,Q[ue].width,Q[ue].height,0,We,Se,Q[ue].data);for(let ke=0;ke<le.length;ke++){const Ut=le[ke].image[ue].image;O?se&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ue,ke+1,0,0,Ut.width,Ut.height,We,Se,Ut.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ue,ke+1,Ee,Ut.width,Ut.height,0,We,Se,Ut.data)}}else{O?se&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ue,0,0,0,We,Se,Q[ue]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ue,0,Ee,We,Se,Q[ue]);for(let ke=0;ke<le.length;ke++){const it=le[ke];O?se&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ue,ke+1,0,0,We,Se,it.image[ue]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ue,ke+1,Ee,We,Se,it.image[ue])}}}m(A)&&p(r.TEXTURE_CUBE_MAP),$.__version=oe.version,A.onUpdate&&A.onUpdate(A)}D.__version=A.version}function be(D,A,H,ae,oe,$){const Ce=s.convert(H.format,H.colorSpace),me=s.convert(H.type),Ue=v(H.internalFormat,Ce,me,H.colorSpace),Te=n.get(A),he=n.get(H);if(he.__renderTarget=A,!Te.__hasExternalTextures){const Q=Math.max(1,A.width>>$),Ge=Math.max(1,A.height>>$);oe===r.TEXTURE_3D||oe===r.TEXTURE_2D_ARRAY?t.texImage3D(oe,$,Ue,Q,Ge,A.depth,0,Ce,me,null):t.texImage2D(oe,$,Ue,Q,Ge,0,Ce,me,null)}t.bindFramebuffer(r.FRAMEBUFFER,D),Fe(A)?a.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,ae,oe,he.__webglTexture,0,pt(A)):(oe===r.TEXTURE_2D||oe>=r.TEXTURE_CUBE_MAP_POSITIVE_X&&oe<=r.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&r.framebufferTexture2D(r.FRAMEBUFFER,ae,oe,he.__webglTexture,$),t.bindFramebuffer(r.FRAMEBUFFER,null)}function Ye(D,A,H){if(r.bindRenderbuffer(r.RENDERBUFFER,D),A.depthBuffer){const ae=A.depthTexture,oe=ae&&ae.isDepthTexture?ae.type:null,$=x(A.stencilBuffer,oe),Ce=A.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,me=pt(A);Fe(A)?a.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,me,$,A.width,A.height):H?r.renderbufferStorageMultisample(r.RENDERBUFFER,me,$,A.width,A.height):r.renderbufferStorage(r.RENDERBUFFER,$,A.width,A.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,Ce,r.RENDERBUFFER,D)}else{const ae=A.textures;for(let oe=0;oe<ae.length;oe++){const $=ae[oe],Ce=s.convert($.format,$.colorSpace),me=s.convert($.type),Ue=v($.internalFormat,Ce,me,$.colorSpace),Te=pt(A);H&&Fe(A)===!1?r.renderbufferStorageMultisample(r.RENDERBUFFER,Te,Ue,A.width,A.height):Fe(A)?a.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,Te,Ue,A.width,A.height):r.renderbufferStorage(r.RENDERBUFFER,Ue,A.width,A.height)}}r.bindRenderbuffer(r.RENDERBUFFER,null)}function ye(D,A){if(A&&A.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(r.FRAMEBUFFER,D),!(A.depthTexture&&A.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const ae=n.get(A.depthTexture);ae.__renderTarget=A,(!ae.__webglTexture||A.depthTexture.image.width!==A.width||A.depthTexture.image.height!==A.height)&&(A.depthTexture.image.width=A.width,A.depthTexture.image.height=A.height,A.depthTexture.needsUpdate=!0),X(A.depthTexture,0);const oe=ae.__webglTexture,$=pt(A);if(A.depthTexture.format===Al)Fe(A)?a.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,oe,0,$):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,oe,0);else if(A.depthTexture.format===Cl)Fe(A)?a.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,oe,0,$):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,oe,0);else throw new Error("Unknown depthTexture format")}function tt(D){const A=n.get(D),H=D.isWebGLCubeRenderTarget===!0;if(A.__boundDepthTexture!==D.depthTexture){const ae=D.depthTexture;if(A.__depthDisposeCallback&&A.__depthDisposeCallback(),ae){const oe=()=>{delete A.__boundDepthTexture,delete A.__depthDisposeCallback,ae.removeEventListener("dispose",oe)};ae.addEventListener("dispose",oe),A.__depthDisposeCallback=oe}A.__boundDepthTexture=ae}if(D.depthTexture&&!A.__autoAllocateDepthBuffer){if(H)throw new Error("target.depthTexture not supported in Cube render targets");const ae=D.texture.mipmaps;ae&&ae.length>0?ye(A.__webglFramebuffer[0],D):ye(A.__webglFramebuffer,D)}else if(H){A.__webglDepthbuffer=[];for(let ae=0;ae<6;ae++)if(t.bindFramebuffer(r.FRAMEBUFFER,A.__webglFramebuffer[ae]),A.__webglDepthbuffer[ae]===void 0)A.__webglDepthbuffer[ae]=r.createRenderbuffer(),Ye(A.__webglDepthbuffer[ae],D,!1);else{const oe=D.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,$=A.__webglDepthbuffer[ae];r.bindRenderbuffer(r.RENDERBUFFER,$),r.framebufferRenderbuffer(r.FRAMEBUFFER,oe,r.RENDERBUFFER,$)}}else{const ae=D.texture.mipmaps;if(ae&&ae.length>0?t.bindFramebuffer(r.FRAMEBUFFER,A.__webglFramebuffer[0]):t.bindFramebuffer(r.FRAMEBUFFER,A.__webglFramebuffer),A.__webglDepthbuffer===void 0)A.__webglDepthbuffer=r.createRenderbuffer(),Ye(A.__webglDepthbuffer,D,!1);else{const oe=D.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,$=A.__webglDepthbuffer;r.bindRenderbuffer(r.RENDERBUFFER,$),r.framebufferRenderbuffer(r.FRAMEBUFFER,oe,r.RENDERBUFFER,$)}}t.bindFramebuffer(r.FRAMEBUFFER,null)}function ht(D,A,H){const ae=n.get(D);A!==void 0&&be(ae.__webglFramebuffer,D,D.texture,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,0),H!==void 0&&tt(D)}function Ie(D){const A=D.texture,H=n.get(D),ae=n.get(A);D.addEventListener("dispose",S);const oe=D.textures,$=D.isWebGLCubeRenderTarget===!0,Ce=oe.length>1;if(Ce||(ae.__webglTexture===void 0&&(ae.__webglTexture=r.createTexture()),ae.__version=A.version,o.memory.textures++),$){H.__webglFramebuffer=[];for(let me=0;me<6;me++)if(A.mipmaps&&A.mipmaps.length>0){H.__webglFramebuffer[me]=[];for(let Ue=0;Ue<A.mipmaps.length;Ue++)H.__webglFramebuffer[me][Ue]=r.createFramebuffer()}else H.__webglFramebuffer[me]=r.createFramebuffer()}else{if(A.mipmaps&&A.mipmaps.length>0){H.__webglFramebuffer=[];for(let me=0;me<A.mipmaps.length;me++)H.__webglFramebuffer[me]=r.createFramebuffer()}else H.__webglFramebuffer=r.createFramebuffer();if(Ce)for(let me=0,Ue=oe.length;me<Ue;me++){const Te=n.get(oe[me]);Te.__webglTexture===void 0&&(Te.__webglTexture=r.createTexture(),o.memory.textures++)}if(D.samples>0&&Fe(D)===!1){H.__webglMultisampledFramebuffer=r.createFramebuffer(),H.__webglColorRenderbuffer=[],t.bindFramebuffer(r.FRAMEBUFFER,H.__webglMultisampledFramebuffer);for(let me=0;me<oe.length;me++){const Ue=oe[me];H.__webglColorRenderbuffer[me]=r.createRenderbuffer(),r.bindRenderbuffer(r.RENDERBUFFER,H.__webglColorRenderbuffer[me]);const Te=s.convert(Ue.format,Ue.colorSpace),he=s.convert(Ue.type),Q=v(Ue.internalFormat,Te,he,Ue.colorSpace,D.isXRRenderTarget===!0),Ge=pt(D);r.renderbufferStorageMultisample(r.RENDERBUFFER,Ge,Q,D.width,D.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+me,r.RENDERBUFFER,H.__webglColorRenderbuffer[me])}r.bindRenderbuffer(r.RENDERBUFFER,null),D.depthBuffer&&(H.__webglDepthRenderbuffer=r.createRenderbuffer(),Ye(H.__webglDepthRenderbuffer,D,!0)),t.bindFramebuffer(r.FRAMEBUFFER,null)}}if($){t.bindTexture(r.TEXTURE_CUBE_MAP,ae.__webglTexture),ve(r.TEXTURE_CUBE_MAP,A);for(let me=0;me<6;me++)if(A.mipmaps&&A.mipmaps.length>0)for(let Ue=0;Ue<A.mipmaps.length;Ue++)be(H.__webglFramebuffer[me][Ue],D,A,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+me,Ue);else be(H.__webglFramebuffer[me],D,A,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+me,0);m(A)&&p(r.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Ce){for(let me=0,Ue=oe.length;me<Ue;me++){const Te=oe[me],he=n.get(Te);let Q=r.TEXTURE_2D;(D.isWebGL3DRenderTarget||D.isWebGLArrayRenderTarget)&&(Q=D.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),t.bindTexture(Q,he.__webglTexture),ve(Q,Te),be(H.__webglFramebuffer,D,Te,r.COLOR_ATTACHMENT0+me,Q,0),m(Te)&&p(Q)}t.unbindTexture()}else{let me=r.TEXTURE_2D;if((D.isWebGL3DRenderTarget||D.isWebGLArrayRenderTarget)&&(me=D.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),t.bindTexture(me,ae.__webglTexture),ve(me,A),A.mipmaps&&A.mipmaps.length>0)for(let Ue=0;Ue<A.mipmaps.length;Ue++)be(H.__webglFramebuffer[Ue],D,A,r.COLOR_ATTACHMENT0,me,Ue);else be(H.__webglFramebuffer,D,A,r.COLOR_ATTACHMENT0,me,0);m(A)&&p(me),t.unbindTexture()}D.depthBuffer&&tt(D)}function ct(D){const A=D.textures;for(let H=0,ae=A.length;H<ae;H++){const oe=A[H];if(m(oe)){const $=y(D),Ce=n.get(oe).__webglTexture;t.bindTexture($,Ce),p($),t.unbindTexture()}}}const N=[],st=[];function z(D){if(D.samples>0){if(Fe(D)===!1){const A=D.textures,H=D.width,ae=D.height;let oe=r.COLOR_BUFFER_BIT;const $=D.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,Ce=n.get(D),me=A.length>1;if(me)for(let Te=0;Te<A.length;Te++)t.bindFramebuffer(r.FRAMEBUFFER,Ce.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+Te,r.RENDERBUFFER,null),t.bindFramebuffer(r.FRAMEBUFFER,Ce.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+Te,r.TEXTURE_2D,null,0);t.bindFramebuffer(r.READ_FRAMEBUFFER,Ce.__webglMultisampledFramebuffer);const Ue=D.texture.mipmaps;Ue&&Ue.length>0?t.bindFramebuffer(r.DRAW_FRAMEBUFFER,Ce.__webglFramebuffer[0]):t.bindFramebuffer(r.DRAW_FRAMEBUFFER,Ce.__webglFramebuffer);for(let Te=0;Te<A.length;Te++){if(D.resolveDepthBuffer&&(D.depthBuffer&&(oe|=r.DEPTH_BUFFER_BIT),D.stencilBuffer&&D.resolveStencilBuffer&&(oe|=r.STENCIL_BUFFER_BIT)),me){r.framebufferRenderbuffer(r.READ_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,Ce.__webglColorRenderbuffer[Te]);const he=n.get(A[Te]).__webglTexture;r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,he,0)}r.blitFramebuffer(0,0,H,ae,0,0,H,ae,oe,r.NEAREST),l===!0&&(N.length=0,st.length=0,N.push(r.COLOR_ATTACHMENT0+Te),D.depthBuffer&&D.resolveDepthBuffer===!1&&(N.push($),st.push($),r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,st)),r.invalidateFramebuffer(r.READ_FRAMEBUFFER,N))}if(t.bindFramebuffer(r.READ_FRAMEBUFFER,null),t.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),me)for(let Te=0;Te<A.length;Te++){t.bindFramebuffer(r.FRAMEBUFFER,Ce.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+Te,r.RENDERBUFFER,Ce.__webglColorRenderbuffer[Te]);const he=n.get(A[Te]).__webglTexture;t.bindFramebuffer(r.FRAMEBUFFER,Ce.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+Te,r.TEXTURE_2D,he,0)}t.bindFramebuffer(r.DRAW_FRAMEBUFFER,Ce.__webglMultisampledFramebuffer)}else if(D.depthBuffer&&D.resolveDepthBuffer===!1&&l){const A=D.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,[A])}}}function pt(D){return Math.min(i.maxSamples,D.samples)}function Fe(D){const A=n.get(D);return D.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&A.__useRenderToTexture!==!1}function Pt(D){const A=o.render.frame;u.get(D)!==A&&(u.set(D,A),D.update())}function Ae(D,A){const H=D.colorSpace,ae=D.format,oe=D.type;return D.isCompressedTexture===!0||D.isVideoTexture===!0||H!==Yn&&H!==ls&&(Dt.getTransfer(H)===jt?(ae!==Ui||oe!==vr)&&lt("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Et("WebGLTextures: Unsupported texture color space:",H)),A}function Ze(D){return typeof HTMLImageElement<"u"&&D instanceof HTMLImageElement?(c.width=D.naturalWidth||D.width,c.height=D.naturalHeight||D.height):typeof VideoFrame<"u"&&D instanceof VideoFrame?(c.width=D.displayWidth,c.height=D.displayHeight):(c.width=D.width,c.height=D.height),c}this.allocateTextureUnit=G,this.resetTextureUnits=F,this.setTexture2D=X,this.setTexture2DArray=Z,this.setTexture3D=C,this.setTextureCube=Y,this.rebindTextures=ht,this.setupRenderTarget=Ie,this.updateRenderTargetMipmap=ct,this.updateMultisampleRenderTarget=z,this.setupDepthRenderbuffer=tt,this.setupFrameBufferTexture=be,this.useMultisampledRTT=Fe}function cT(r,e){function t(n,i=ls){let s;const o=Dt.getTransfer(i);if(n===vr)return r.UNSIGNED_BYTE;if(n===Rh)return r.UNSIGNED_SHORT_4_4_4_4;if(n===Ph)return r.UNSIGNED_SHORT_5_5_5_1;if(n===xg)return r.UNSIGNED_INT_5_9_9_9_REV;if(n===vg)return r.UNSIGNED_INT_10F_11F_11F_REV;if(n===gg)return r.BYTE;if(n===_g)return r.SHORT;if(n===Tl)return r.UNSIGNED_SHORT;if(n===Ch)return r.INT;if(n===lo)return r.UNSIGNED_INT;if(n===Ki)return r.FLOAT;if(n===Ta)return r.HALF_FLOAT;if(n===yg)return r.ALPHA;if(n===bg)return r.RGB;if(n===Ui)return r.RGBA;if(n===Al)return r.DEPTH_COMPONENT;if(n===Cl)return r.DEPTH_STENCIL;if(n===Lh)return r.RED;if(n===Dh)return r.RED_INTEGER;if(n===Ih)return r.RG;if(n===Oh)return r.RG_INTEGER;if(n===Nh)return r.RGBA_INTEGER;if(n===Hc||n===Gc||n===Wc||n===Xc)if(o===jt)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(n===Hc)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Gc)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Wc)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Xc)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(n===Hc)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Gc)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Wc)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Xc)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===sf||n===of||n===af||n===lf)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(n===sf)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===of)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===af)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===lf)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===cf||n===uf||n===df)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(n===cf||n===uf)return o===jt?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(n===df)return o===jt?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===ff||n===hf||n===pf||n===mf||n===gf||n===_f||n===xf||n===vf||n===yf||n===bf||n===Sf||n===wf||n===Mf||n===Tf)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(n===ff)return o===jt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===hf)return o===jt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===pf)return o===jt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===mf)return o===jt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===gf)return o===jt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===_f)return o===jt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===xf)return o===jt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===vf)return o===jt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===yf)return o===jt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===bf)return o===jt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Sf)return o===jt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===wf)return o===jt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Mf)return o===jt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Tf)return o===jt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Ef||n===Af||n===Cf)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(n===Ef)return o===jt?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Af)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Cf)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Rf||n===Pf||n===Lf||n===Df)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(n===Rf)return s.COMPRESSED_RED_RGTC1_EXT;if(n===Pf)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Lf)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Df)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===El?r.UNSIGNED_INT_24_8:r[n]!==void 0?r[n]:null}return{convert:t}}const uT=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,dT=`
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

}`;class fT{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const n=new Bg(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new Ti({vertexShader:uT,fragmentShader:dT,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new pi(new qi(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class hT extends Ea{constructor(e,t){super();const n=this;let i=null,s=1,o=null,a="local-floor",l=1,c=null,u=null,d=null,f=null,h=null,_=null;const g=typeof XRWebGLBinding<"u",m=new fT,p={},y=t.getContextAttributes();let v=null,x=null;const E=[],b=[],S=new Rt;let P=null;const w=new ai;w.viewport=new Wt;const M=new ai;M.viewport=new Wt;const L=[w,M],F=new wb;let G=null,U=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(ne){let ie=E[ne];return ie===void 0&&(ie=new ud,E[ne]=ie),ie.getTargetRaySpace()},this.getControllerGrip=function(ne){let ie=E[ne];return ie===void 0&&(ie=new ud,E[ne]=ie),ie.getGripSpace()},this.getHand=function(ne){let ie=E[ne];return ie===void 0&&(ie=new ud,E[ne]=ie),ie.getHandSpace()};function X(ne){const ie=b.indexOf(ne.inputSource);if(ie===-1)return;const be=E[ie];be!==void 0&&(be.update(ne.inputSource,ne.frame,c||o),be.dispatchEvent({type:ne.type,data:ne.inputSource}))}function Z(){i.removeEventListener("select",X),i.removeEventListener("selectstart",X),i.removeEventListener("selectend",X),i.removeEventListener("squeeze",X),i.removeEventListener("squeezestart",X),i.removeEventListener("squeezeend",X),i.removeEventListener("end",Z),i.removeEventListener("inputsourceschange",C);for(let ne=0;ne<E.length;ne++){const ie=b[ne];ie!==null&&(b[ne]=null,E[ne].disconnect(ie))}G=null,U=null,m.reset();for(const ne in p)delete p[ne];e.setRenderTarget(v),h=null,f=null,d=null,i=null,x=null,qe.stop(),n.isPresenting=!1,e.setPixelRatio(P),e.setSize(S.width,S.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(ne){s=ne,n.isPresenting===!0&&lt("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(ne){a=ne,n.isPresenting===!0&&lt("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(ne){c=ne},this.getBaseLayer=function(){return f!==null?f:h},this.getBinding=function(){return d===null&&g&&(d=new XRWebGLBinding(i,t)),d},this.getFrame=function(){return _},this.getSession=function(){return i},this.setSession=async function(ne){if(i=ne,i!==null){if(v=e.getRenderTarget(),i.addEventListener("select",X),i.addEventListener("selectstart",X),i.addEventListener("selectend",X),i.addEventListener("squeeze",X),i.addEventListener("squeezestart",X),i.addEventListener("squeezeend",X),i.addEventListener("end",Z),i.addEventListener("inputsourceschange",C),y.xrCompatible!==!0&&await t.makeXRCompatible(),P=e.getPixelRatio(),e.getSize(S),g&&"createProjectionLayer"in XRWebGLBinding.prototype){let be=null,Ye=null,ye=null;y.depth&&(ye=y.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,be=y.stencil?Cl:Al,Ye=y.stencil?El:lo);const tt={colorFormat:t.RGBA8,depthFormat:ye,scaleFactor:s};d=this.getBinding(),f=d.createProjectionLayer(tt),i.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),x=new co(f.textureWidth,f.textureHeight,{format:Ui,type:vr,depthTexture:new kg(f.textureWidth,f.textureHeight,Ye,void 0,void 0,void 0,void 0,void 0,void 0,be),stencilBuffer:y.stencil,colorSpace:e.outputColorSpace,samples:y.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}else{const be={antialias:y.antialias,alpha:!0,depth:y.depth,stencil:y.stencil,framebufferScaleFactor:s};h=new XRWebGLLayer(i,t,be),i.updateRenderState({baseLayer:h}),e.setPixelRatio(1),e.setSize(h.framebufferWidth,h.framebufferHeight,!1),x=new co(h.framebufferWidth,h.framebufferHeight,{format:Ui,type:vr,colorSpace:e.outputColorSpace,stencilBuffer:y.stencil,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1})}x.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await i.requestReferenceSpace(a),qe.setContext(i),qe.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function C(ne){for(let ie=0;ie<ne.removed.length;ie++){const be=ne.removed[ie],Ye=b.indexOf(be);Ye>=0&&(b[Ye]=null,E[Ye].disconnect(be))}for(let ie=0;ie<ne.added.length;ie++){const be=ne.added[ie];let Ye=b.indexOf(be);if(Ye===-1){for(let tt=0;tt<E.length;tt++)if(tt>=b.length){b.push(be),Ye=tt;break}else if(b[tt]===null){b[tt]=be,Ye=tt;break}if(Ye===-1)break}const ye=E[Ye];ye&&ye.connect(be)}}const Y=new q,de=new q;function I(ne,ie,be){Y.setFromMatrixPosition(ie.matrixWorld),de.setFromMatrixPosition(be.matrixWorld);const Ye=Y.distanceTo(de),ye=ie.projectionMatrix.elements,tt=be.projectionMatrix.elements,ht=ye[14]/(ye[10]-1),Ie=ye[14]/(ye[10]+1),ct=(ye[9]+1)/ye[5],N=(ye[9]-1)/ye[5],st=(ye[8]-1)/ye[0],z=(tt[8]+1)/tt[0],pt=ht*st,Fe=ht*z,Pt=Ye/(-st+z),Ae=Pt*-st;if(ie.matrixWorld.decompose(ne.position,ne.quaternion,ne.scale),ne.translateX(Ae),ne.translateZ(Pt),ne.matrixWorld.compose(ne.position,ne.quaternion,ne.scale),ne.matrixWorldInverse.copy(ne.matrixWorld).invert(),ye[10]===-1)ne.projectionMatrix.copy(ie.projectionMatrix),ne.projectionMatrixInverse.copy(ie.projectionMatrixInverse);else{const Ze=ht+Pt,D=Ie+Pt,A=pt-Ae,H=Fe+(Ye-Ae),ae=ct*Ie/D*Ze,oe=N*Ie/D*Ze;ne.projectionMatrix.makePerspective(A,H,ae,oe,Ze,D),ne.projectionMatrixInverse.copy(ne.projectionMatrix).invert()}}function xe(ne,ie){ie===null?ne.matrixWorld.copy(ne.matrix):ne.matrixWorld.multiplyMatrices(ie.matrixWorld,ne.matrix),ne.matrixWorldInverse.copy(ne.matrixWorld).invert()}this.updateCamera=function(ne){if(i===null)return;let ie=ne.near,be=ne.far;m.texture!==null&&(m.depthNear>0&&(ie=m.depthNear),m.depthFar>0&&(be=m.depthFar)),F.near=M.near=w.near=ie,F.far=M.far=w.far=be,(G!==F.near||U!==F.far)&&(i.updateRenderState({depthNear:F.near,depthFar:F.far}),G=F.near,U=F.far),F.layers.mask=ne.layers.mask|6,w.layers.mask=F.layers.mask&3,M.layers.mask=F.layers.mask&5;const Ye=ne.parent,ye=F.cameras;xe(F,Ye);for(let tt=0;tt<ye.length;tt++)xe(ye[tt],Ye);ye.length===2?I(F,w,M):F.projectionMatrix.copy(w.projectionMatrix),ve(ne,F,Ye)};function ve(ne,ie,be){be===null?ne.matrix.copy(ie.matrixWorld):(ne.matrix.copy(be.matrixWorld),ne.matrix.invert(),ne.matrix.multiply(ie.matrixWorld)),ne.matrix.decompose(ne.position,ne.quaternion,ne.scale),ne.updateMatrixWorld(!0),ne.projectionMatrix.copy(ie.projectionMatrix),ne.projectionMatrixInverse.copy(ie.projectionMatrixInverse),ne.isPerspectiveCamera&&(ne.fov=ha*2*Math.atan(1/ne.projectionMatrix.elements[5]),ne.zoom=1)}this.getCamera=function(){return F},this.getFoveation=function(){if(!(f===null&&h===null))return l},this.setFoveation=function(ne){l=ne,f!==null&&(f.fixedFoveation=ne),h!==null&&h.fixedFoveation!==void 0&&(h.fixedFoveation=ne)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(F)},this.getCameraTexture=function(ne){return p[ne]};let ee=null;function Xe(ne,ie){if(u=ie.getViewerPose(c||o),_=ie,u!==null){const be=u.views;h!==null&&(e.setRenderTargetFramebuffer(x,h.framebuffer),e.setRenderTarget(x));let Ye=!1;be.length!==F.cameras.length&&(F.cameras.length=0,Ye=!0);for(let Ie=0;Ie<be.length;Ie++){const ct=be[Ie];let N=null;if(h!==null)N=h.getViewport(ct);else{const z=d.getViewSubImage(f,ct);N=z.viewport,Ie===0&&(e.setRenderTargetTextures(x,z.colorTexture,z.depthStencilTexture),e.setRenderTarget(x))}let st=L[Ie];st===void 0&&(st=new ai,st.layers.enable(Ie),st.viewport=new Wt,L[Ie]=st),st.matrix.fromArray(ct.transform.matrix),st.matrix.decompose(st.position,st.quaternion,st.scale),st.projectionMatrix.fromArray(ct.projectionMatrix),st.projectionMatrixInverse.copy(st.projectionMatrix).invert(),st.viewport.set(N.x,N.y,N.width,N.height),Ie===0&&(F.matrix.copy(st.matrix),F.matrix.decompose(F.position,F.quaternion,F.scale)),Ye===!0&&F.cameras.push(st)}const ye=i.enabledFeatures;if(ye&&ye.includes("depth-sensing")&&i.depthUsage=="gpu-optimized"&&g){d=n.getBinding();const Ie=d.getDepthInformation(be[0]);Ie&&Ie.isValid&&Ie.texture&&m.init(Ie,i.renderState)}if(ye&&ye.includes("camera-access")&&g){e.state.unbindTexture(),d=n.getBinding();for(let Ie=0;Ie<be.length;Ie++){const ct=be[Ie].camera;if(ct){let N=p[ct];N||(N=new Bg,p[ct]=N);const st=d.getCameraImage(ct);N.sourceTexture=st}}}}for(let be=0;be<E.length;be++){const Ye=b[be],ye=E[be];Ye!==null&&ye!==void 0&&ye.update(Ye,ie,c||o)}ee&&ee(ne,ie),ie.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:ie}),_=null}const qe=new Gg;qe.setAnimationLoop(Xe),this.setAnimationLoop=function(ne){ee=ne},this.dispose=function(){}}}const Fs=new yr,pT=new yt;function mT(r,e){function t(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,Lg(r)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function i(m,p,y,v,x){p.isMeshBasicMaterial||p.isMeshLambertMaterial?s(m,p):p.isMeshToonMaterial?(s(m,p),d(m,p)):p.isMeshPhongMaterial?(s(m,p),u(m,p)):p.isMeshStandardMaterial?(s(m,p),f(m,p),p.isMeshPhysicalMaterial&&h(m,p,x)):p.isMeshMatcapMaterial?(s(m,p),_(m,p)):p.isMeshDepthMaterial?s(m,p):p.isMeshDistanceMaterial?(s(m,p),g(m,p)):p.isMeshNormalMaterial?s(m,p):p.isLineBasicMaterial?(o(m,p),p.isLineDashedMaterial&&a(m,p)):p.isPointsMaterial?l(m,p,y,v):p.isSpriteMaterial?c(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function s(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,t(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===li&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,t(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===li&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,t(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,t(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const y=e.get(p),v=y.envMap,x=y.envMapRotation;v&&(m.envMap.value=v,Fs.copy(x),Fs.x*=-1,Fs.y*=-1,Fs.z*=-1,v.isCubeTexture&&v.isRenderTargetTexture===!1&&(Fs.y*=-1,Fs.z*=-1),m.envMapRotation.value.setFromMatrix4(pT.makeRotationFromEuler(Fs)),m.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,m.aoMapTransform))}function o(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform))}function a(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function l(m,p,y,v){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*y,m.scale.value=v*.5,p.map&&(m.map.value=p.map,t(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function c(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function u(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function d(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function f(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function h(m,p,y){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===li&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=y.texture,m.transmissionSamplerSize.value.set(y.width,y.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,m.specularIntensityMapTransform))}function _(m,p){p.matcap&&(m.matcap.value=p.matcap)}function g(m,p){const y=e.get(p).light;m.referencePosition.value.setFromMatrixPosition(y.matrixWorld),m.nearDistance.value=y.shadow.camera.near,m.farDistance.value=y.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function gT(r,e,t,n){let i={},s={},o=[];const a=r.getParameter(r.MAX_UNIFORM_BUFFER_BINDINGS);function l(y,v){const x=v.program;n.uniformBlockBinding(y,x)}function c(y,v){let x=i[y.id];x===void 0&&(_(y),x=u(y),i[y.id]=x,y.addEventListener("dispose",m));const E=v.program;n.updateUBOMapping(y,E);const b=e.render.frame;s[y.id]!==b&&(f(y),s[y.id]=b)}function u(y){const v=d();y.__bindingPointIndex=v;const x=r.createBuffer(),E=y.__size,b=y.usage;return r.bindBuffer(r.UNIFORM_BUFFER,x),r.bufferData(r.UNIFORM_BUFFER,E,b),r.bindBuffer(r.UNIFORM_BUFFER,null),r.bindBufferBase(r.UNIFORM_BUFFER,v,x),x}function d(){for(let y=0;y<a;y++)if(o.indexOf(y)===-1)return o.push(y),y;return Et("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(y){const v=i[y.id],x=y.uniforms,E=y.__cache;r.bindBuffer(r.UNIFORM_BUFFER,v);for(let b=0,S=x.length;b<S;b++){const P=Array.isArray(x[b])?x[b]:[x[b]];for(let w=0,M=P.length;w<M;w++){const L=P[w];if(h(L,b,w,E)===!0){const F=L.__offset,G=Array.isArray(L.value)?L.value:[L.value];let U=0;for(let X=0;X<G.length;X++){const Z=G[X],C=g(Z);typeof Z=="number"||typeof Z=="boolean"?(L.__data[0]=Z,r.bufferSubData(r.UNIFORM_BUFFER,F+U,L.__data)):Z.isMatrix3?(L.__data[0]=Z.elements[0],L.__data[1]=Z.elements[1],L.__data[2]=Z.elements[2],L.__data[3]=0,L.__data[4]=Z.elements[3],L.__data[5]=Z.elements[4],L.__data[6]=Z.elements[5],L.__data[7]=0,L.__data[8]=Z.elements[6],L.__data[9]=Z.elements[7],L.__data[10]=Z.elements[8],L.__data[11]=0):(Z.toArray(L.__data,U),U+=C.storage/Float32Array.BYTES_PER_ELEMENT)}r.bufferSubData(r.UNIFORM_BUFFER,F,L.__data)}}}r.bindBuffer(r.UNIFORM_BUFFER,null)}function h(y,v,x,E){const b=y.value,S=v+"_"+x;if(E[S]===void 0)return typeof b=="number"||typeof b=="boolean"?E[S]=b:E[S]=b.clone(),!0;{const P=E[S];if(typeof b=="number"||typeof b=="boolean"){if(P!==b)return E[S]=b,!0}else if(P.equals(b)===!1)return P.copy(b),!0}return!1}function _(y){const v=y.uniforms;let x=0;const E=16;for(let S=0,P=v.length;S<P;S++){const w=Array.isArray(v[S])?v[S]:[v[S]];for(let M=0,L=w.length;M<L;M++){const F=w[M],G=Array.isArray(F.value)?F.value:[F.value];for(let U=0,X=G.length;U<X;U++){const Z=G[U],C=g(Z),Y=x%E,de=Y%C.boundary,I=Y+de;x+=de,I!==0&&E-I<C.storage&&(x+=E-I),F.__data=new Float32Array(C.storage/Float32Array.BYTES_PER_ELEMENT),F.__offset=x,x+=C.storage}}}const b=x%E;return b>0&&(x+=E-b),y.__size=x,y.__cache={},this}function g(y){const v={boundary:0,storage:0};return typeof y=="number"||typeof y=="boolean"?(v.boundary=4,v.storage=4):y.isVector2?(v.boundary=8,v.storage=8):y.isVector3||y.isColor?(v.boundary=16,v.storage=12):y.isVector4?(v.boundary=16,v.storage=16):y.isMatrix3?(v.boundary=48,v.storage=48):y.isMatrix4?(v.boundary=64,v.storage=64):y.isTexture?lt("WebGLRenderer: Texture samplers can not be part of an uniforms group."):lt("WebGLRenderer: Unsupported uniform value type.",y),v}function m(y){const v=y.target;v.removeEventListener("dispose",m);const x=o.indexOf(v.__bindingPointIndex);o.splice(x,1),r.deleteBuffer(i[v.id]),delete i[v.id],delete s[v.id]}function p(){for(const y in i)r.deleteBuffer(i[y]);o=[],i={},s={}}return{bind:l,update:c,dispose:p}}const _T=new Uint16Array([11481,15204,11534,15171,11808,15015,12385,14843,12894,14716,13396,14600,13693,14483,13976,14366,14237,14171,14405,13961,14511,13770,14605,13598,14687,13444,14760,13305,14822,13066,14876,12857,14923,12675,14963,12517,14997,12379,15025,12230,15049,12023,15070,11843,15086,11687,15100,11551,15111,11433,15120,11330,15127,11217,15132,11060,15135,10922,15138,10801,15139,10695,15139,10600,13012,14923,13020,14917,13064,14886,13176,14800,13349,14666,13513,14526,13724,14398,13960,14230,14200,14020,14383,13827,14488,13651,14583,13491,14667,13348,14740,13132,14803,12908,14856,12713,14901,12542,14938,12394,14968,12241,14992,12017,15010,11822,15024,11654,15034,11507,15041,11380,15044,11269,15044,11081,15042,10913,15037,10764,15031,10635,15023,10520,15014,10419,15003,10330,13657,14676,13658,14673,13670,14660,13698,14622,13750,14547,13834,14442,13956,14317,14112,14093,14291,13889,14407,13704,14499,13538,14586,13389,14664,13201,14733,12966,14792,12758,14842,12577,14882,12418,14915,12272,14940,12033,14959,11826,14972,11646,14980,11490,14983,11355,14983,11212,14979,11008,14971,10830,14961,10675,14950,10540,14936,10420,14923,10315,14909,10204,14894,10041,14089,14460,14090,14459,14096,14452,14112,14431,14141,14388,14186,14305,14252,14130,14341,13941,14399,13756,14467,13585,14539,13430,14610,13272,14677,13026,14737,12808,14790,12617,14833,12449,14869,12303,14896,12065,14916,11845,14929,11655,14937,11490,14939,11347,14936,11184,14930,10970,14921,10783,14912,10621,14900,10480,14885,10356,14867,10247,14848,10062,14827,9894,14805,9745,14400,14208,14400,14206,14402,14198,14406,14174,14415,14122,14427,14035,14444,13913,14469,13767,14504,13613,14548,13463,14598,13324,14651,13082,14704,12858,14752,12658,14795,12483,14831,12330,14860,12106,14881,11875,14895,11675,14903,11501,14905,11351,14903,11178,14900,10953,14892,10757,14880,10589,14865,10442,14847,10313,14827,10162,14805,9965,14782,9792,14757,9642,14731,9507,14562,13883,14562,13883,14563,13877,14566,13862,14570,13830,14576,13773,14584,13689,14595,13582,14613,13461,14637,13336,14668,13120,14704,12897,14741,12695,14776,12516,14808,12358,14835,12150,14856,11910,14870,11701,14878,11519,14882,11361,14884,11187,14880,10951,14871,10748,14858,10572,14842,10418,14823,10286,14801,10099,14777,9897,14751,9722,14725,9567,14696,9430,14666,9309,14702,13604,14702,13604,14702,13600,14703,13591,14705,13570,14707,13533,14709,13477,14712,13400,14718,13305,14727,13106,14743,12907,14762,12716,14784,12539,14807,12380,14827,12190,14844,11943,14855,11727,14863,11539,14870,11376,14871,11204,14868,10960,14858,10748,14845,10565,14829,10406,14809,10269,14786,10058,14761,9852,14734,9671,14705,9512,14674,9374,14641,9253,14608,9076,14821,13366,14821,13365,14821,13364,14821,13358,14821,13344,14821,13320,14819,13252,14817,13145,14815,13011,14814,12858,14817,12698,14823,12539,14832,12389,14841,12214,14850,11968,14856,11750,14861,11558,14866,11390,14867,11226,14862,10972,14853,10754,14840,10565,14823,10401,14803,10259,14780,10032,14754,9820,14725,9635,14694,9473,14661,9333,14627,9203,14593,8988,14557,8798,14923,13014,14922,13014,14922,13012,14922,13004,14920,12987,14919,12957,14915,12907,14909,12834,14902,12738,14894,12623,14888,12498,14883,12370,14880,12203,14878,11970,14875,11759,14873,11569,14874,11401,14872,11243,14865,10986,14855,10762,14842,10568,14825,10401,14804,10255,14781,10017,14754,9799,14725,9611,14692,9445,14658,9301,14623,9139,14587,8920,14548,8729,14509,8562,15008,12672,15008,12672,15008,12671,15007,12667,15005,12656,15001,12637,14997,12605,14989,12556,14978,12490,14966,12407,14953,12313,14940,12136,14927,11934,14914,11742,14903,11563,14896,11401,14889,11247,14879,10992,14866,10767,14851,10570,14833,10400,14812,10252,14789,10007,14761,9784,14731,9592,14698,9424,14663,9279,14627,9088,14588,8868,14548,8676,14508,8508,14467,8360,15080,12386,15080,12386,15079,12385,15078,12383,15076,12378,15072,12367,15066,12347,15057,12315,15045,12253,15030,12138,15012,11998,14993,11845,14972,11685,14951,11530,14935,11383,14920,11228,14904,10981,14887,10762,14870,10567,14850,10397,14827,10248,14803,9997,14774,9771,14743,9578,14710,9407,14674,9259,14637,9048,14596,8826,14555,8632,14514,8464,14471,8317,14427,8182,15139,12008,15139,12008,15138,12008,15137,12007,15135,12003,15130,11990,15124,11969,15115,11929,15102,11872,15086,11794,15064,11693,15041,11581,15013,11459,14987,11336,14966,11170,14944,10944,14921,10738,14898,10552,14875,10387,14850,10239,14824,9983,14794,9758,14762,9563,14728,9392,14692,9244,14653,9014,14611,8791,14569,8597,14526,8427,14481,8281,14436,8110,14391,7885,15188,11617,15188,11617,15187,11617,15186,11618,15183,11617,15179,11612,15173,11601,15163,11581,15150,11546,15133,11495,15110,11427,15083,11346,15051,11246,15024,11057,14996,10868,14967,10687,14938,10517,14911,10362,14882,10206,14853,9956,14821,9737,14787,9543,14752,9375,14715,9228,14675,8980,14632,8760,14589,8565,14544,8395,14498,8248,14451,8049,14404,7824,14357,7630,15228,11298,15228,11298,15227,11299,15226,11301,15223,11303,15219,11302,15213,11299,15204,11290,15191,11271,15174,11217,15150,11129,15119,11015,15087,10886,15057,10744,15024,10599,14990,10455,14957,10318,14924,10143,14891,9911,14856,9701,14820,9516,14782,9352,14744,9200,14703,8946,14659,8725,14615,8533,14568,8366,14521,8220,14472,7992,14423,7770,14374,7578,14315,7408,15260,10819,15260,10819,15259,10822,15258,10826,15256,10832,15251,10836,15246,10841,15237,10838,15225,10821,15207,10788,15183,10734,15151,10660,15120,10571,15087,10469,15049,10359,15012,10249,14974,10041,14937,9837,14900,9647,14860,9475,14820,9320,14779,9147,14736,8902,14691,8688,14646,8499,14598,8335,14549,8189,14499,7940,14448,7720,14397,7529,14347,7363,14256,7218,15285,10410,15285,10411,15285,10413,15284,10418,15282,10425,15278,10434,15272,10442,15264,10449,15252,10445,15235,10433,15210,10403,15179,10358,15149,10301,15113,10218,15073,10059,15033,9894,14991,9726,14951,9565,14909,9413,14865,9273,14822,9073,14777,8845,14730,8641,14682,8459,14633,8300,14583,8129,14531,7883,14479,7670,14426,7482,14373,7321,14305,7176,14201,6939,15305,9939,15305,9940,15305,9945,15304,9955,15302,9967,15298,9989,15293,10010,15286,10033,15274,10044,15258,10045,15233,10022,15205,9975,15174,9903,15136,9808,15095,9697,15053,9578,15009,9451,14965,9327,14918,9198,14871,8973,14825,8766,14775,8579,14725,8408,14675,8259,14622,8058,14569,7821,14515,7615,14460,7435,14405,7276,14350,7108,14256,6866,14149,6653,15321,9444,15321,9445,15321,9448,15320,9458,15317,9470,15314,9490,15310,9515,15302,9540,15292,9562,15276,9579,15251,9577,15226,9559,15195,9519,15156,9463,15116,9389,15071,9304,15025,9208,14978,9023,14927,8838,14878,8661,14827,8496,14774,8344,14722,8206,14667,7973,14612,7749,14556,7555,14499,7382,14443,7229,14385,7025,14322,6791,14210,6588,14100,6409,15333,8920,15333,8921,15332,8927,15332,8943,15329,8965,15326,9002,15322,9048,15316,9106,15307,9162,15291,9204,15267,9221,15244,9221,15212,9196,15175,9134,15133,9043,15088,8930,15040,8801,14990,8665,14938,8526,14886,8391,14830,8261,14775,8087,14719,7866,14661,7664,14603,7482,14544,7322,14485,7178,14426,6936,14367,6713,14281,6517,14166,6348,14054,6198,15341,8360,15341,8361,15341,8366,15341,8379,15339,8399,15336,8431,15332,8473,15326,8527,15318,8585,15302,8632,15281,8670,15258,8690,15227,8690,15191,8664,15149,8612,15104,8543,15055,8456,15001,8360,14948,8259,14892,8122,14834,7923,14776,7734,14716,7558,14656,7397,14595,7250,14534,7070,14472,6835,14410,6628,14350,6443,14243,6283,14125,6135,14010,5889,15348,7715,15348,7717,15348,7725,15347,7745,15345,7780,15343,7836,15339,7905,15334,8e3,15326,8103,15310,8193,15293,8239,15270,8270,15240,8287,15204,8283,15163,8260,15118,8223,15067,8143,15014,8014,14958,7873,14899,7723,14839,7573,14778,7430,14715,7293,14652,7164,14588,6931,14524,6720,14460,6531,14396,6362,14330,6210,14207,6015,14086,5781,13969,5576,15352,7114,15352,7116,15352,7128,15352,7159,15350,7195,15348,7237,15345,7299,15340,7374,15332,7457,15317,7544,15301,7633,15280,7703,15251,7754,15216,7775,15176,7767,15131,7733,15079,7670,15026,7588,14967,7492,14906,7387,14844,7278,14779,7171,14714,6965,14648,6770,14581,6587,14515,6420,14448,6269,14382,6123,14299,5881,14172,5665,14049,5477,13929,5310,15355,6329,15355,6330,15355,6339,15355,6362,15353,6410,15351,6472,15349,6572,15344,6688,15337,6835,15323,6985,15309,7142,15287,7220,15260,7277,15226,7310,15188,7326,15142,7318,15090,7285,15036,7239,14976,7177,14914,7045,14849,6892,14782,6736,14714,6581,14645,6433,14576,6293,14506,6164,14438,5946,14369,5733,14270,5540,14140,5369,14014,5216,13892,5043,15357,5483,15357,5484,15357,5496,15357,5528,15356,5597,15354,5692,15351,5835,15347,6011,15339,6195,15328,6317,15314,6446,15293,6566,15268,6668,15235,6746,15197,6796,15152,6811,15101,6790,15046,6748,14985,6673,14921,6583,14854,6479,14785,6371,14714,6259,14643,6149,14571,5946,14499,5750,14428,5567,14358,5401,14242,5250,14109,5111,13980,4870,13856,4657,15359,4555,15359,4557,15358,4573,15358,4633,15357,4715,15355,4841,15353,5061,15349,5216,15342,5391,15331,5577,15318,5770,15299,5967,15274,6150,15243,6223,15206,6280,15161,6310,15111,6317,15055,6300,14994,6262,14928,6208,14860,6141,14788,5994,14715,5838,14641,5684,14566,5529,14492,5384,14418,5247,14346,5121,14216,4892,14079,4682,13948,4496,13822,4330,15359,3498,15359,3501,15359,3520,15359,3598,15358,3719,15356,3860,15355,4137,15351,4305,15344,4563,15334,4809,15321,5116,15303,5273,15280,5418,15250,5547,15214,5653,15170,5722,15120,5761,15064,5763,15002,5733,14935,5673,14865,5597,14792,5504,14716,5400,14640,5294,14563,5185,14486,5041,14410,4841,14335,4655,14191,4482,14051,4325,13918,4183,13790,4012,15360,2282,15360,2285,15360,2306,15360,2401,15359,2547,15357,2748,15355,3103,15352,3349,15345,3675,15336,4020,15324,4272,15307,4496,15285,4716,15255,4908,15220,5086,15178,5170,15128,5214,15072,5234,15010,5231,14943,5206,14871,5166,14796,5102,14718,4971,14639,4833,14559,4687,14480,4541,14402,4401,14315,4268,14167,4142,14025,3958,13888,3747,13759,3556,15360,923,15360,925,15360,946,15360,1052,15359,1214,15357,1494,15356,1892,15352,2274,15346,2663,15338,3099,15326,3393,15309,3679,15288,3980,15260,4183,15226,4325,15185,4437,15136,4517,15080,4570,15018,4591,14950,4581,14877,4545,14800,4485,14720,4411,14638,4325,14556,4231,14475,4136,14395,3988,14297,3803,14145,3628,13999,3465,13861,3314,13729,3177,15360,263,15360,264,15360,272,15360,325,15359,407,15358,548,15356,780,15352,1144,15347,1580,15339,2099,15328,2425,15312,2795,15292,3133,15264,3329,15232,3517,15191,3689,15143,3819,15088,3923,15025,3978,14956,3999,14882,3979,14804,3931,14722,3855,14639,3756,14554,3645,14470,3529,14388,3409,14279,3289,14124,3173,13975,3055,13834,2848,13701,2658,15360,49,15360,49,15360,52,15360,75,15359,111,15358,201,15356,283,15353,519,15348,726,15340,1045,15329,1415,15314,1795,15295,2173,15269,2410,15237,2649,15197,2866,15150,3054,15095,3140,15032,3196,14963,3228,14888,3236,14808,3224,14725,3191,14639,3146,14553,3088,14466,2976,14382,2836,14262,2692,14103,2549,13952,2409,13808,2278,13674,2154,15360,4,15360,4,15360,4,15360,13,15359,33,15358,59,15357,112,15353,199,15348,302,15341,456,15331,628,15316,827,15297,1082,15272,1332,15241,1601,15202,1851,15156,2069,15101,2172,15039,2256,14970,2314,14894,2348,14813,2358,14728,2344,14640,2311,14551,2263,14463,2203,14376,2133,14247,2059,14084,1915,13930,1761,13784,1609,13648,1464,15360,0,15360,0,15360,0,15360,3,15359,18,15358,26,15357,53,15354,80,15348,97,15341,165,15332,238,15318,326,15299,427,15275,529,15245,654,15207,771,15161,885,15108,994,15046,1089,14976,1170,14900,1229,14817,1266,14731,1284,14641,1282,14550,1260,14460,1223,14370,1174,14232,1116,14066,1050,13909,981,13761,910,13623,839]);let Pr=null;function xT(){return Pr===null&&(Pr=new kh(_T,32,32,Ih,Ta),Pr.minFilter=ri,Pr.magFilter=ri,Pr.wrapS=dr,Pr.wrapT=dr,Pr.generateMipmaps=!1,Pr.needsUpdate=!0),Pr}class vT{constructor(e={}){const{canvas:t=ty(),context:n=null,depth:i=!0,stencil:s=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:f=!1}=e;this.isWebGLRenderer=!0;let h;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");h=n.getContextAttributes().alpha}else h=o;const _=new Set([Nh,Oh,Dh]),g=new Set([vr,lo,Tl,El,Rh,Ph]),m=new Uint32Array(4),p=new Int32Array(4);let y=null,v=null;const x=[],E=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=xs,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const b=this;let S=!1;this._outputColorSpace=Sn;let P=0,w=0,M=null,L=-1,F=null;const G=new Wt,U=new Wt;let X=null;const Z=new Qe(0);let C=0,Y=t.width,de=t.height,I=1,xe=null,ve=null;const ee=new Wt(0,0,Y,de),Xe=new Wt(0,0,Y,de);let qe=!1;const ne=new zh;let ie=!1,be=!1;const Ye=new yt,ye=new q,tt=new Wt,ht={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Ie=!1;function ct(){return M===null?I:1}let N=n;function st(R,W){return t.getContext(R,W)}try{const R={alpha:!0,depth:i,stencil:s,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Ah}`),t.addEventListener("webglcontextlost",le,!1),t.addEventListener("webglcontextrestored",ue,!1),t.addEventListener("webglcontextcreationerror",ke,!1),N===null){const W="webgl2";if(N=st(W,R),N===null)throw st(W)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(R){throw R("WebGLRenderer: "+R.message),R}let z,pt,Fe,Pt,Ae,Ze,D,A,H,ae,oe,$,Ce,me,Ue,Te,he,Q,Ge,We,Se,Ee,O,we;function se(){z=new Aw(N),z.init(),Ee=new cT(N,z),pt=new xw(N,z,e,Ee),Fe=new aT(N,z),pt.reversedDepthBuffer&&f&&Fe.buffers.depth.setReversed(!0),Pt=new Pw(N),Ae=new jM,Ze=new lT(N,z,Fe,Ae,pt,Ee,Pt),D=new yw(b),A=new Ew(b),H=new Ob(N),O=new gw(N,H),ae=new Cw(N,H,Pt,O),oe=new Dw(N,ae,H,Pt),Ge=new Lw(N,pt,Ze),Te=new vw(Ae),$=new YM(b,D,A,z,pt,O,Te),Ce=new mT(b,Ae),me=new KM,Ue=new nT(z),Q=new mw(b,D,A,Fe,oe,h,l),he=new sT(b,oe,pt),we=new gT(N,Pt,pt,Fe),We=new _w(N,z,Pt),Se=new Rw(N,z,Pt),Pt.programs=$.programs,b.capabilities=pt,b.extensions=z,b.properties=Ae,b.renderLists=me,b.shadowMap=he,b.state=Fe,b.info=Pt}se();const ge=new hT(b,N);this.xr=ge,this.getContext=function(){return N},this.getContextAttributes=function(){return N.getContextAttributes()},this.forceContextLoss=function(){const R=z.get("WEBGL_lose_context");R&&R.loseContext()},this.forceContextRestore=function(){const R=z.get("WEBGL_lose_context");R&&R.restoreContext()},this.getPixelRatio=function(){return I},this.setPixelRatio=function(R){R!==void 0&&(I=R,this.setSize(Y,de,!1))},this.getSize=function(R){return R.set(Y,de)},this.setSize=function(R,W,K=!0){if(ge.isPresenting){lt("WebGLRenderer: Can't change size while VR device is presenting.");return}Y=R,de=W,t.width=Math.floor(R*I),t.height=Math.floor(W*I),K===!0&&(t.style.width=R+"px",t.style.height=W+"px"),this.setViewport(0,0,R,W)},this.getDrawingBufferSize=function(R){return R.set(Y*I,de*I).floor()},this.setDrawingBufferSize=function(R,W,K){Y=R,de=W,I=K,t.width=Math.floor(R*K),t.height=Math.floor(W*K),this.setViewport(0,0,R,W)},this.getCurrentViewport=function(R){return R.copy(G)},this.getViewport=function(R){return R.copy(ee)},this.setViewport=function(R,W,K,j){R.isVector4?ee.set(R.x,R.y,R.z,R.w):ee.set(R,W,K,j),Fe.viewport(G.copy(ee).multiplyScalar(I).round())},this.getScissor=function(R){return R.copy(Xe)},this.setScissor=function(R,W,K,j){R.isVector4?Xe.set(R.x,R.y,R.z,R.w):Xe.set(R,W,K,j),Fe.scissor(U.copy(Xe).multiplyScalar(I).round())},this.getScissorTest=function(){return qe},this.setScissorTest=function(R){Fe.setScissorTest(qe=R)},this.setOpaqueSort=function(R){xe=R},this.setTransparentSort=function(R){ve=R},this.getClearColor=function(R){return R.copy(Q.getClearColor())},this.setClearColor=function(){Q.setClearColor(...arguments)},this.getClearAlpha=function(){return Q.getClearAlpha()},this.setClearAlpha=function(){Q.setClearAlpha(...arguments)},this.clear=function(R=!0,W=!0,K=!0){let j=0;if(R){let V=!1;if(M!==null){const pe=M.texture.format;V=_.has(pe)}if(V){const pe=M.texture.type,Le=g.has(pe),He=Q.getClearColor(),_e=Q.getClearAlpha(),et=He.r,ot=He.g,Je=He.b;Le?(m[0]=et,m[1]=ot,m[2]=Je,m[3]=_e,N.clearBufferuiv(N.COLOR,0,m)):(p[0]=et,p[1]=ot,p[2]=Je,p[3]=_e,N.clearBufferiv(N.COLOR,0,p))}else j|=N.COLOR_BUFFER_BIT}W&&(j|=N.DEPTH_BUFFER_BIT),K&&(j|=N.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),N.clear(j)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",le,!1),t.removeEventListener("webglcontextrestored",ue,!1),t.removeEventListener("webglcontextcreationerror",ke,!1),Q.dispose(),me.dispose(),Ue.dispose(),Ae.dispose(),D.dispose(),A.dispose(),oe.dispose(),O.dispose(),we.dispose(),$.dispose(),ge.dispose(),ge.removeEventListener("sessionstart",Ke),ge.removeEventListener("sessionend",Ve),rt.stop()};function le(R){R.preventDefault(),lu("WebGLRenderer: Context Lost."),S=!0}function ue(){lu("WebGLRenderer: Context Restored."),S=!1;const R=Pt.autoReset,W=he.enabled,K=he.autoUpdate,j=he.needsUpdate,V=he.type;se(),Pt.autoReset=R,he.enabled=W,he.autoUpdate=K,he.needsUpdate=j,he.type=V}function ke(R){Et("WebGLRenderer: A WebGL context could not be created. Reason: ",R.statusMessage)}function it(R){const W=R.target;W.removeEventListener("dispose",it),Ut(W)}function Ut(R){Be(R),Ae.remove(R)}function Be(R){const W=Ae.get(R).programs;W!==void 0&&(W.forEach(function(K){$.releaseProgram(K)}),R.isShaderMaterial&&$.releaseShaderCache(R))}this.renderBufferDirect=function(R,W,K,j,V,pe){W===null&&(W=ht);const Le=V.isMesh&&V.matrixWorld.determinant()<0,He=Lt(R,W,K,j,V);Fe.setMaterial(j,Le);let _e=K.index,et=1;if(j.wireframe===!0){if(_e=ae.getWireframeAttribute(K),_e===void 0)return;et=2}const ot=K.drawRange,Je=K.attributes.position;let bt=ot.start*et,Bt=(ot.start+ot.count)*et;pe!==null&&(bt=Math.max(bt,pe.start*et),Bt=Math.min(Bt,(pe.start+pe.count)*et)),_e!==null?(bt=Math.max(bt,0),Bt=Math.min(Bt,_e.count)):Je!=null&&(bt=Math.max(bt,0),Bt=Math.min(Bt,Je.count));const $t=Bt-bt;if($t<0||$t===1/0)return;O.setup(V,j,He,K,_e);let zt,Vt=We;if(_e!==null&&(zt=H.get(_e),Vt=Se,Vt.setIndex(zt)),V.isMesh)j.wireframe===!0?(Fe.setLineWidth(j.wireframeLinewidth*ct()),Vt.setMode(N.LINES)):Vt.setMode(N.TRIANGLES);else if(V.isLine){let at=j.linewidth;at===void 0&&(at=1),Fe.setLineWidth(at*ct()),V.isLineSegments?Vt.setMode(N.LINES):V.isLineLoop?Vt.setMode(N.LINE_LOOP):Vt.setMode(N.LINE_STRIP)}else V.isPoints?Vt.setMode(N.POINTS):V.isSprite&&Vt.setMode(N.TRIANGLES);if(V.isBatchedMesh)if(V._multiDrawInstances!==null)Dl("WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),Vt.renderMultiDrawInstances(V._multiDrawStarts,V._multiDrawCounts,V._multiDrawCount,V._multiDrawInstances);else if(z.get("WEBGL_multi_draw"))Vt.renderMultiDraw(V._multiDrawStarts,V._multiDrawCounts,V._multiDrawCount);else{const at=V._multiDrawStarts,Qt=V._multiDrawCounts,Ft=V._multiDrawCount,Nn=_e?H.get(_e).bytesPerElement:1,T=Ae.get(j).currentProgram.getUniforms();for(let k=0;k<Ft;k++)T.setValue(N,"_gl_DrawID",k),Vt.render(at[k]/Nn,Qt[k])}else if(V.isInstancedMesh)Vt.renderInstances(bt,$t,V.count);else if(K.isInstancedBufferGeometry){const at=K._maxInstanceCount!==void 0?K._maxInstanceCount:1/0,Qt=Math.min(K.instanceCount,at);Vt.renderInstances(bt,$t,Qt)}else Vt.render(bt,$t)};function Oe(R,W,K){R.transparent===!0&&R.side===Fi&&R.forceSinglePass===!1?(R.side=li,R.needsUpdate=!0,Ht(R,W,K),R.side=qr,R.needsUpdate=!0,Ht(R,W,K),R.side=Fi):Ht(R,W,K)}this.compile=function(R,W,K=null){K===null&&(K=R),v=Ue.get(K),v.init(W),E.push(v),K.traverseVisible(function(V){V.isLight&&V.layers.test(W.layers)&&(v.pushLight(V),V.castShadow&&v.pushShadow(V))}),R!==K&&R.traverseVisible(function(V){V.isLight&&V.layers.test(W.layers)&&(v.pushLight(V),V.castShadow&&v.pushShadow(V))}),v.setupLights();const j=new Set;return R.traverse(function(V){if(!(V.isMesh||V.isPoints||V.isLine||V.isSprite))return;const pe=V.material;if(pe)if(Array.isArray(pe))for(let Le=0;Le<pe.length;Le++){const He=pe[Le];Oe(He,K,V),j.add(He)}else Oe(pe,K,V),j.add(pe)}),v=E.pop(),j},this.compileAsync=function(R,W,K=null){const j=this.compile(R,W,K);return new Promise(V=>{function pe(){if(j.forEach(function(Le){Ae.get(Le).currentProgram.isReady()&&j.delete(Le)}),j.size===0){V(R);return}setTimeout(pe,10)}z.get("KHR_parallel_shader_compile")!==null?pe():setTimeout(pe,10)})};let dt=null;function Pe(R){dt&&dt(R)}function Ke(){rt.stop()}function Ve(){rt.start()}const rt=new Gg;rt.setAnimationLoop(Pe),typeof self<"u"&&rt.setContext(self),this.setAnimationLoop=function(R){dt=R,ge.setAnimationLoop(R),R===null?rt.stop():rt.start()},ge.addEventListener("sessionstart",Ke),ge.addEventListener("sessionend",Ve),this.render=function(R,W){if(W!==void 0&&W.isCamera!==!0){Et("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(S===!0)return;if(R.matrixWorldAutoUpdate===!0&&R.updateMatrixWorld(),W.parent===null&&W.matrixWorldAutoUpdate===!0&&W.updateMatrixWorld(),ge.enabled===!0&&ge.isPresenting===!0&&(ge.cameraAutoUpdate===!0&&ge.updateCamera(W),W=ge.getCamera()),R.isScene===!0&&R.onBeforeRender(b,R,W,M),v=Ue.get(R,E.length),v.init(W),E.push(v),Ye.multiplyMatrices(W.projectionMatrix,W.matrixWorldInverse),ne.setFromProjectionMatrix(Ye,fr,W.reversedDepth),be=this.localClippingEnabled,ie=Te.init(this.clippingPlanes,be),y=me.get(R,x.length),y.init(),x.push(y),ge.enabled===!0&&ge.isPresenting===!0){const pe=b.xr.getDepthSensingMesh();pe!==null&&sn(pe,W,-1/0,b.sortObjects)}sn(R,W,0,b.sortObjects),y.finish(),b.sortObjects===!0&&y.sort(xe,ve),Ie=ge.enabled===!1||ge.isPresenting===!1||ge.hasDepthSensing()===!1,Ie&&Q.addToRenderList(y,R),this.info.render.frame++,ie===!0&&Te.beginShadows();const K=v.state.shadowsArray;he.render(K,R,W),ie===!0&&Te.endShadows(),this.info.autoReset===!0&&this.info.reset();const j=y.opaque,V=y.transmissive;if(v.setupLights(),W.isArrayCamera){const pe=W.cameras;if(V.length>0)for(let Le=0,He=pe.length;Le<He;Le++){const _e=pe[Le];kt(j,V,R,_e)}Ie&&Q.render(R);for(let Le=0,He=pe.length;Le<He;Le++){const _e=pe[Le];mt(y,R,_e,_e.viewport)}}else V.length>0&&kt(j,V,R,W),Ie&&Q.render(R),mt(y,R,W);M!==null&&w===0&&(Ze.updateMultisampleRenderTarget(M),Ze.updateRenderTargetMipmap(M)),R.isScene===!0&&R.onAfterRender(b,R,W),O.resetDefaultState(),L=-1,F=null,E.pop(),E.length>0?(v=E[E.length-1],ie===!0&&Te.setGlobalState(b.clippingPlanes,v.state.camera)):v=null,x.pop(),x.length>0?y=x[x.length-1]:y=null};function sn(R,W,K,j){if(R.visible===!1)return;if(R.layers.test(W.layers)){if(R.isGroup)K=R.renderOrder;else if(R.isLOD)R.autoUpdate===!0&&R.update(W);else if(R.isLight)v.pushLight(R),R.castShadow&&v.pushShadow(R);else if(R.isSprite){if(!R.frustumCulled||ne.intersectsSprite(R)){j&&tt.setFromMatrixPosition(R.matrixWorld).applyMatrix4(Ye);const Le=oe.update(R),He=R.material;He.visible&&y.push(R,Le,He,K,tt.z,null)}}else if((R.isMesh||R.isLine||R.isPoints)&&(!R.frustumCulled||ne.intersectsObject(R))){const Le=oe.update(R),He=R.material;if(j&&(R.boundingSphere!==void 0?(R.boundingSphere===null&&R.computeBoundingSphere(),tt.copy(R.boundingSphere.center)):(Le.boundingSphere===null&&Le.computeBoundingSphere(),tt.copy(Le.boundingSphere.center)),tt.applyMatrix4(R.matrixWorld).applyMatrix4(Ye)),Array.isArray(He)){const _e=Le.groups;for(let et=0,ot=_e.length;et<ot;et++){const Je=_e[et],bt=He[Je.materialIndex];bt&&bt.visible&&y.push(R,Le,bt,K,tt.z,Je)}}else He.visible&&y.push(R,Le,He,K,tt.z,null)}}const pe=R.children;for(let Le=0,He=pe.length;Le<He;Le++)sn(pe[Le],W,K,j)}function mt(R,W,K,j){const{opaque:V,transmissive:pe,transparent:Le}=R;v.setupLightsView(K),ie===!0&&Te.setGlobalState(b.clippingPlanes,K),j&&Fe.viewport(G.copy(j)),V.length>0&&Jt(V,W,K),pe.length>0&&Jt(pe,W,K),Le.length>0&&Jt(Le,W,K),Fe.buffers.depth.setTest(!0),Fe.buffers.depth.setMask(!0),Fe.buffers.color.setMask(!0),Fe.setPolygonOffset(!1)}function kt(R,W,K,j){if((K.isScene===!0?K.overrideMaterial:null)!==null)return;v.state.transmissionRenderTarget[j.id]===void 0&&(v.state.transmissionRenderTarget[j.id]=new co(1,1,{generateMipmaps:!0,type:z.has("EXT_color_buffer_half_float")||z.has("EXT_color_buffer_float")?Ta:vr,minFilter:Ur,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Dt.workingColorSpace}));const pe=v.state.transmissionRenderTarget[j.id],Le=j.viewport||G;pe.setSize(Le.z*b.transmissionResolutionScale,Le.w*b.transmissionResolutionScale);const He=b.getRenderTarget(),_e=b.getActiveCubeFace(),et=b.getActiveMipmapLevel();b.setRenderTarget(pe),b.getClearColor(Z),C=b.getClearAlpha(),C<1&&b.setClearColor(16777215,.5),b.clear(),Ie&&Q.render(K);const ot=b.toneMapping;b.toneMapping=xs;const Je=j.viewport;if(j.viewport!==void 0&&(j.viewport=void 0),v.setupLightsView(j),ie===!0&&Te.setGlobalState(b.clippingPlanes,j),Jt(R,K,j),Ze.updateMultisampleRenderTarget(pe),Ze.updateRenderTargetMipmap(pe),z.has("WEBGL_multisampled_render_to_texture")===!1){let bt=!1;for(let Bt=0,$t=W.length;Bt<$t;Bt++){const zt=W[Bt],{object:Vt,geometry:at,material:Qt,group:Ft}=zt;if(Qt.side===Fi&&Vt.layers.test(j.layers)){const Nn=Qt.side;Qt.side=li,Qt.needsUpdate=!0,_t(Vt,K,j,at,Qt,Ft),Qt.side=Nn,Qt.needsUpdate=!0,bt=!0}}bt===!0&&(Ze.updateMultisampleRenderTarget(pe),Ze.updateRenderTargetMipmap(pe))}b.setRenderTarget(He,_e,et),b.setClearColor(Z,C),Je!==void 0&&(j.viewport=Je),b.toneMapping=ot}function Jt(R,W,K){const j=W.isScene===!0?W.overrideMaterial:null;for(let V=0,pe=R.length;V<pe;V++){const Le=R[V],{object:He,geometry:_e,group:et}=Le;let ot=Le.material;ot.allowOverride===!0&&j!==null&&(ot=j),He.layers.test(K.layers)&&_t(He,W,K,_e,ot,et)}}function _t(R,W,K,j,V,pe){R.onBeforeRender(b,W,K,j,V,pe),R.modelViewMatrix.multiplyMatrices(K.matrixWorldInverse,R.matrixWorld),R.normalMatrix.getNormalMatrix(R.modelViewMatrix),V.onBeforeRender(b,W,K,j,R,pe),V.transparent===!0&&V.side===Fi&&V.forceSinglePass===!1?(V.side=li,V.needsUpdate=!0,b.renderBufferDirect(K,W,j,V,R,pe),V.side=qr,V.needsUpdate=!0,b.renderBufferDirect(K,W,j,V,R,pe),V.side=Fi):b.renderBufferDirect(K,W,j,V,R,pe),R.onAfterRender(b,W,K,j,V,pe)}function Ht(R,W,K){W.isScene!==!0&&(W=ht);const j=Ae.get(R),V=v.state.lights,pe=v.state.shadowsArray,Le=V.state.version,He=$.getParameters(R,V.state,pe,W,K),_e=$.getProgramCacheKey(He);let et=j.programs;j.environment=R.isMeshStandardMaterial?W.environment:null,j.fog=W.fog,j.envMap=(R.isMeshStandardMaterial?A:D).get(R.envMap||j.environment),j.envMapRotation=j.environment!==null&&R.envMap===null?W.environmentRotation:R.envMapRotation,et===void 0&&(R.addEventListener("dispose",it),et=new Map,j.programs=et);let ot=et.get(_e);if(ot!==void 0){if(j.currentProgram===ot&&j.lightsStateVersion===Le)return on(R,He),ot}else He.uniforms=$.getUniforms(R),R.onBeforeCompile(He,b),ot=$.acquireProgram(He,_e),et.set(_e,ot),j.uniforms=He.uniforms;const Je=j.uniforms;return(!R.isShaderMaterial&&!R.isRawShaderMaterial||R.clipping===!0)&&(Je.clippingPlanes=Te.uniform),on(R,He),j.needsLights=Re(R),j.lightsStateVersion=Le,j.needsLights&&(Je.ambientLightColor.value=V.state.ambient,Je.lightProbe.value=V.state.probe,Je.directionalLights.value=V.state.directional,Je.directionalLightShadows.value=V.state.directionalShadow,Je.spotLights.value=V.state.spot,Je.spotLightShadows.value=V.state.spotShadow,Je.rectAreaLights.value=V.state.rectArea,Je.ltc_1.value=V.state.rectAreaLTC1,Je.ltc_2.value=V.state.rectAreaLTC2,Je.pointLights.value=V.state.point,Je.pointLightShadows.value=V.state.pointShadow,Je.hemisphereLights.value=V.state.hemi,Je.directionalShadowMap.value=V.state.directionalShadowMap,Je.directionalShadowMatrix.value=V.state.directionalShadowMatrix,Je.spotShadowMap.value=V.state.spotShadowMap,Je.spotLightMatrix.value=V.state.spotLightMatrix,Je.spotLightMap.value=V.state.spotLightMap,Je.pointShadowMap.value=V.state.pointShadowMap,Je.pointShadowMatrix.value=V.state.pointShadowMatrix),j.currentProgram=ot,j.uniformsList=null,ot}function xt(R){if(R.uniformsList===null){const W=R.currentProgram.getUniforms();R.uniformsList=qc.seqWithValue(W.seq,R.uniforms)}return R.uniformsList}function on(R,W){const K=Ae.get(R);K.outputColorSpace=W.outputColorSpace,K.batching=W.batching,K.batchingColor=W.batchingColor,K.instancing=W.instancing,K.instancingColor=W.instancingColor,K.instancingMorph=W.instancingMorph,K.skinning=W.skinning,K.morphTargets=W.morphTargets,K.morphNormals=W.morphNormals,K.morphColors=W.morphColors,K.morphTargetsCount=W.morphTargetsCount,K.numClippingPlanes=W.numClippingPlanes,K.numIntersection=W.numClipIntersection,K.vertexAlphas=W.vertexAlphas,K.vertexTangents=W.vertexTangents,K.toneMapping=W.toneMapping}function Lt(R,W,K,j,V){W.isScene!==!0&&(W=ht),Ze.resetTextureUnits();const pe=W.fog,Le=j.isMeshStandardMaterial?W.environment:null,He=M===null?b.outputColorSpace:M.isXRRenderTarget===!0?M.texture.colorSpace:Yn,_e=(j.isMeshStandardMaterial?A:D).get(j.envMap||Le),et=j.vertexColors===!0&&!!K.attributes.color&&K.attributes.color.itemSize===4,ot=!!K.attributes.tangent&&(!!j.normalMap||j.anisotropy>0),Je=!!K.morphAttributes.position,bt=!!K.morphAttributes.normal,Bt=!!K.morphAttributes.color;let $t=xs;j.toneMapped&&(M===null||M.isXRRenderTarget===!0)&&($t=b.toneMapping);const zt=K.morphAttributes.position||K.morphAttributes.normal||K.morphAttributes.color,Vt=zt!==void 0?zt.length:0,at=Ae.get(j),Qt=v.state.lights;if(ie===!0&&(be===!0||R!==F)){const ze=R===F&&j.id===L;Te.setState(j,R,ze)}let Ft=!1;j.version===at.__version?(at.needsLights&&at.lightsStateVersion!==Qt.state.version||at.outputColorSpace!==He||V.isBatchedMesh&&at.batching===!1||!V.isBatchedMesh&&at.batching===!0||V.isBatchedMesh&&at.batchingColor===!0&&V.colorTexture===null||V.isBatchedMesh&&at.batchingColor===!1&&V.colorTexture!==null||V.isInstancedMesh&&at.instancing===!1||!V.isInstancedMesh&&at.instancing===!0||V.isSkinnedMesh&&at.skinning===!1||!V.isSkinnedMesh&&at.skinning===!0||V.isInstancedMesh&&at.instancingColor===!0&&V.instanceColor===null||V.isInstancedMesh&&at.instancingColor===!1&&V.instanceColor!==null||V.isInstancedMesh&&at.instancingMorph===!0&&V.morphTexture===null||V.isInstancedMesh&&at.instancingMorph===!1&&V.morphTexture!==null||at.envMap!==_e||j.fog===!0&&at.fog!==pe||at.numClippingPlanes!==void 0&&(at.numClippingPlanes!==Te.numPlanes||at.numIntersection!==Te.numIntersection)||at.vertexAlphas!==et||at.vertexTangents!==ot||at.morphTargets!==Je||at.morphNormals!==bt||at.morphColors!==Bt||at.toneMapping!==$t||at.morphTargetsCount!==Vt)&&(Ft=!0):(Ft=!0,at.__version=j.version);let Nn=at.currentProgram;Ft===!0&&(Nn=Ht(j,W,V));let T=!1,k=!1,B=!1;const J=Nn.getUniforms(),ce=at.uniforms;if(Fe.useProgram(Nn.program)&&(T=!0,k=!0,B=!0),j.id!==L&&(L=j.id,k=!0),T||F!==R){Fe.buffers.depth.getReversed()&&R.reversedDepth!==!0&&(R._reversedDepth=!0,R.updateProjectionMatrix()),J.setValue(N,"projectionMatrix",R.projectionMatrix),J.setValue(N,"viewMatrix",R.matrixWorldInverse);const De=J.map.cameraPosition;De!==void 0&&De.setValue(N,ye.setFromMatrixPosition(R.matrixWorld)),pt.logarithmicDepthBuffer&&J.setValue(N,"logDepthBufFC",2/(Math.log(R.far+1)/Math.LN2)),(j.isMeshPhongMaterial||j.isMeshToonMaterial||j.isMeshLambertMaterial||j.isMeshBasicMaterial||j.isMeshStandardMaterial||j.isShaderMaterial)&&J.setValue(N,"isOrthographic",R.isOrthographicCamera===!0),F!==R&&(F=R,k=!0,B=!0)}if(V.isSkinnedMesh){J.setOptional(N,V,"bindMatrix"),J.setOptional(N,V,"bindMatrixInverse");const ze=V.skeleton;ze&&(ze.boneTexture===null&&ze.computeBoneTexture(),J.setValue(N,"boneTexture",ze.boneTexture,Ze))}V.isBatchedMesh&&(J.setOptional(N,V,"batchingTexture"),J.setValue(N,"batchingTexture",V._matricesTexture,Ze),J.setOptional(N,V,"batchingIdTexture"),J.setValue(N,"batchingIdTexture",V._indirectTexture,Ze),J.setOptional(N,V,"batchingColorTexture"),V._colorsTexture!==null&&J.setValue(N,"batchingColorTexture",V._colorsTexture,Ze));const re=K.morphAttributes;if((re.position!==void 0||re.normal!==void 0||re.color!==void 0)&&Ge.update(V,K,Nn),(k||at.receiveShadow!==V.receiveShadow)&&(at.receiveShadow=V.receiveShadow,J.setValue(N,"receiveShadow",V.receiveShadow)),j.isMeshGouraudMaterial&&j.envMap!==null&&(ce.envMap.value=_e,ce.flipEnvMap.value=_e.isCubeTexture&&_e.isRenderTargetTexture===!1?-1:1),j.isMeshStandardMaterial&&j.envMap===null&&W.environment!==null&&(ce.envMapIntensity.value=W.environmentIntensity),ce.dfgLUT!==void 0&&(ce.dfgLUT.value=xT()),k&&(J.setValue(N,"toneMappingExposure",b.toneMappingExposure),at.needsLights&&Bn(ce,B),pe&&j.fog===!0&&Ce.refreshFogUniforms(ce,pe),Ce.refreshMaterialUniforms(ce,j,I,de,v.state.transmissionRenderTarget[R.id]),qc.upload(N,xt(at),ce,Ze)),j.isShaderMaterial&&j.uniformsNeedUpdate===!0&&(qc.upload(N,xt(at),ce,Ze),j.uniformsNeedUpdate=!1),j.isSpriteMaterial&&J.setValue(N,"center",V.center),J.setValue(N,"modelViewMatrix",V.modelViewMatrix),J.setValue(N,"normalMatrix",V.normalMatrix),J.setValue(N,"modelMatrix",V.matrixWorld),j.isShaderMaterial||j.isRawShaderMaterial){const ze=j.uniformsGroups;for(let De=0,wt=ze.length;De<wt;De++){const ut=ze[De];we.update(ut,Nn),we.bind(ut,Nn)}}return Nn}function Bn(R,W){R.ambientLightColor.needsUpdate=W,R.lightProbe.needsUpdate=W,R.directionalLights.needsUpdate=W,R.directionalLightShadows.needsUpdate=W,R.pointLights.needsUpdate=W,R.pointLightShadows.needsUpdate=W,R.spotLights.needsUpdate=W,R.spotLightShadows.needsUpdate=W,R.rectAreaLights.needsUpdate=W,R.hemisphereLights.needsUpdate=W}function Re(R){return R.isMeshLambertMaterial||R.isMeshToonMaterial||R.isMeshPhongMaterial||R.isMeshStandardMaterial||R.isShadowMaterial||R.isShaderMaterial&&R.lights===!0}this.getActiveCubeFace=function(){return P},this.getActiveMipmapLevel=function(){return w},this.getRenderTarget=function(){return M},this.setRenderTargetTextures=function(R,W,K){const j=Ae.get(R);j.__autoAllocateDepthBuffer=R.resolveDepthBuffer===!1,j.__autoAllocateDepthBuffer===!1&&(j.__useRenderToTexture=!1),Ae.get(R.texture).__webglTexture=W,Ae.get(R.depthTexture).__webglTexture=j.__autoAllocateDepthBuffer?void 0:K,j.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(R,W){const K=Ae.get(R);K.__webglFramebuffer=W,K.__useDefaultFramebuffer=W===void 0};const Nt=N.createFramebuffer();this.setRenderTarget=function(R,W=0,K=0){M=R,P=W,w=K;let j=!0,V=null,pe=!1,Le=!1;if(R){const _e=Ae.get(R);if(_e.__useDefaultFramebuffer!==void 0)Fe.bindFramebuffer(N.FRAMEBUFFER,null),j=!1;else if(_e.__webglFramebuffer===void 0)Ze.setupRenderTarget(R);else if(_e.__hasExternalTextures)Ze.rebindTextures(R,Ae.get(R.texture).__webglTexture,Ae.get(R.depthTexture).__webglTexture);else if(R.depthBuffer){const Je=R.depthTexture;if(_e.__boundDepthTexture!==Je){if(Je!==null&&Ae.has(Je)&&(R.width!==Je.image.width||R.height!==Je.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");Ze.setupDepthRenderbuffer(R)}}const et=R.texture;(et.isData3DTexture||et.isDataArrayTexture||et.isCompressedArrayTexture)&&(Le=!0);const ot=Ae.get(R).__webglFramebuffer;R.isWebGLCubeRenderTarget?(Array.isArray(ot[W])?V=ot[W][K]:V=ot[W],pe=!0):R.samples>0&&Ze.useMultisampledRTT(R)===!1?V=Ae.get(R).__webglMultisampledFramebuffer:Array.isArray(ot)?V=ot[K]:V=ot,G.copy(R.viewport),U.copy(R.scissor),X=R.scissorTest}else G.copy(ee).multiplyScalar(I).floor(),U.copy(Xe).multiplyScalar(I).floor(),X=qe;if(K!==0&&(V=Nt),Fe.bindFramebuffer(N.FRAMEBUFFER,V)&&j&&Fe.drawBuffers(R,V),Fe.viewport(G),Fe.scissor(U),Fe.setScissorTest(X),pe){const _e=Ae.get(R.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_CUBE_MAP_POSITIVE_X+W,_e.__webglTexture,K)}else if(Le){const _e=W;for(let et=0;et<R.textures.length;et++){const ot=Ae.get(R.textures[et]);N.framebufferTextureLayer(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0+et,ot.__webglTexture,K,_e)}}else if(R!==null&&K!==0){const _e=Ae.get(R.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,_e.__webglTexture,K)}L=-1},this.readRenderTargetPixels=function(R,W,K,j,V,pe,Le,He=0){if(!(R&&R.isWebGLRenderTarget)){Et("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let _e=Ae.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget&&Le!==void 0&&(_e=_e[Le]),_e){Fe.bindFramebuffer(N.FRAMEBUFFER,_e);try{const et=R.textures[He],ot=et.format,Je=et.type;if(!pt.textureFormatReadable(ot)){Et("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!pt.textureTypeReadable(Je)){Et("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}W>=0&&W<=R.width-j&&K>=0&&K<=R.height-V&&(R.textures.length>1&&N.readBuffer(N.COLOR_ATTACHMENT0+He),N.readPixels(W,K,j,V,Ee.convert(ot),Ee.convert(Je),pe))}finally{const et=M!==null?Ae.get(M).__webglFramebuffer:null;Fe.bindFramebuffer(N.FRAMEBUFFER,et)}}},this.readRenderTargetPixelsAsync=async function(R,W,K,j,V,pe,Le,He=0){if(!(R&&R.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let _e=Ae.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget&&Le!==void 0&&(_e=_e[Le]),_e)if(W>=0&&W<=R.width-j&&K>=0&&K<=R.height-V){Fe.bindFramebuffer(N.FRAMEBUFFER,_e);const et=R.textures[He],ot=et.format,Je=et.type;if(!pt.textureFormatReadable(ot))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!pt.textureTypeReadable(Je))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const bt=N.createBuffer();N.bindBuffer(N.PIXEL_PACK_BUFFER,bt),N.bufferData(N.PIXEL_PACK_BUFFER,pe.byteLength,N.STREAM_READ),R.textures.length>1&&N.readBuffer(N.COLOR_ATTACHMENT0+He),N.readPixels(W,K,j,V,Ee.convert(ot),Ee.convert(Je),0);const Bt=M!==null?Ae.get(M).__webglFramebuffer:null;Fe.bindFramebuffer(N.FRAMEBUFFER,Bt);const $t=N.fenceSync(N.SYNC_GPU_COMMANDS_COMPLETE,0);return N.flush(),await ny(N,$t,4),N.bindBuffer(N.PIXEL_PACK_BUFFER,bt),N.getBufferSubData(N.PIXEL_PACK_BUFFER,0,pe),N.deleteBuffer(bt),N.deleteSync($t),pe}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(R,W=null,K=0){const j=Math.pow(2,-K),V=Math.floor(R.image.width*j),pe=Math.floor(R.image.height*j),Le=W!==null?W.x:0,He=W!==null?W.y:0;Ze.setTexture2D(R,0),N.copyTexSubImage2D(N.TEXTURE_2D,K,0,0,Le,He,V,pe),Fe.unbindTexture()};const dn=N.createFramebuffer(),gn=N.createFramebuffer();this.copyTextureToTexture=function(R,W,K=null,j=null,V=0,pe=null){pe===null&&(V!==0?(Dl("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),pe=V,V=0):pe=0);let Le,He,_e,et,ot,Je,bt,Bt,$t;const zt=R.isCompressedTexture?R.mipmaps[pe]:R.image;if(K!==null)Le=K.max.x-K.min.x,He=K.max.y-K.min.y,_e=K.isBox3?K.max.z-K.min.z:1,et=K.min.x,ot=K.min.y,Je=K.isBox3?K.min.z:0;else{const re=Math.pow(2,-V);Le=Math.floor(zt.width*re),He=Math.floor(zt.height*re),R.isDataArrayTexture?_e=zt.depth:R.isData3DTexture?_e=Math.floor(zt.depth*re):_e=1,et=0,ot=0,Je=0}j!==null?(bt=j.x,Bt=j.y,$t=j.z):(bt=0,Bt=0,$t=0);const Vt=Ee.convert(W.format),at=Ee.convert(W.type);let Qt;W.isData3DTexture?(Ze.setTexture3D(W,0),Qt=N.TEXTURE_3D):W.isDataArrayTexture||W.isCompressedArrayTexture?(Ze.setTexture2DArray(W,0),Qt=N.TEXTURE_2D_ARRAY):(Ze.setTexture2D(W,0),Qt=N.TEXTURE_2D),N.pixelStorei(N.UNPACK_FLIP_Y_WEBGL,W.flipY),N.pixelStorei(N.UNPACK_PREMULTIPLY_ALPHA_WEBGL,W.premultiplyAlpha),N.pixelStorei(N.UNPACK_ALIGNMENT,W.unpackAlignment);const Ft=N.getParameter(N.UNPACK_ROW_LENGTH),Nn=N.getParameter(N.UNPACK_IMAGE_HEIGHT),T=N.getParameter(N.UNPACK_SKIP_PIXELS),k=N.getParameter(N.UNPACK_SKIP_ROWS),B=N.getParameter(N.UNPACK_SKIP_IMAGES);N.pixelStorei(N.UNPACK_ROW_LENGTH,zt.width),N.pixelStorei(N.UNPACK_IMAGE_HEIGHT,zt.height),N.pixelStorei(N.UNPACK_SKIP_PIXELS,et),N.pixelStorei(N.UNPACK_SKIP_ROWS,ot),N.pixelStorei(N.UNPACK_SKIP_IMAGES,Je);const J=R.isDataArrayTexture||R.isData3DTexture,ce=W.isDataArrayTexture||W.isData3DTexture;if(R.isDepthTexture){const re=Ae.get(R),ze=Ae.get(W),De=Ae.get(re.__renderTarget),wt=Ae.get(ze.__renderTarget);Fe.bindFramebuffer(N.READ_FRAMEBUFFER,De.__webglFramebuffer),Fe.bindFramebuffer(N.DRAW_FRAMEBUFFER,wt.__webglFramebuffer);for(let ut=0;ut<_e;ut++)J&&(N.framebufferTextureLayer(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,Ae.get(R).__webglTexture,V,Je+ut),N.framebufferTextureLayer(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,Ae.get(W).__webglTexture,pe,$t+ut)),N.blitFramebuffer(et,ot,Le,He,bt,Bt,Le,He,N.DEPTH_BUFFER_BIT,N.NEAREST);Fe.bindFramebuffer(N.READ_FRAMEBUFFER,null),Fe.bindFramebuffer(N.DRAW_FRAMEBUFFER,null)}else if(V!==0||R.isRenderTargetTexture||Ae.has(R)){const re=Ae.get(R),ze=Ae.get(W);Fe.bindFramebuffer(N.READ_FRAMEBUFFER,dn),Fe.bindFramebuffer(N.DRAW_FRAMEBUFFER,gn);for(let De=0;De<_e;De++)J?N.framebufferTextureLayer(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,re.__webglTexture,V,Je+De):N.framebufferTexture2D(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,re.__webglTexture,V),ce?N.framebufferTextureLayer(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,ze.__webglTexture,pe,$t+De):N.framebufferTexture2D(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,ze.__webglTexture,pe),V!==0?N.blitFramebuffer(et,ot,Le,He,bt,Bt,Le,He,N.COLOR_BUFFER_BIT,N.NEAREST):ce?N.copyTexSubImage3D(Qt,pe,bt,Bt,$t+De,et,ot,Le,He):N.copyTexSubImage2D(Qt,pe,bt,Bt,et,ot,Le,He);Fe.bindFramebuffer(N.READ_FRAMEBUFFER,null),Fe.bindFramebuffer(N.DRAW_FRAMEBUFFER,null)}else ce?R.isDataTexture||R.isData3DTexture?N.texSubImage3D(Qt,pe,bt,Bt,$t,Le,He,_e,Vt,at,zt.data):W.isCompressedArrayTexture?N.compressedTexSubImage3D(Qt,pe,bt,Bt,$t,Le,He,_e,Vt,zt.data):N.texSubImage3D(Qt,pe,bt,Bt,$t,Le,He,_e,Vt,at,zt):R.isDataTexture?N.texSubImage2D(N.TEXTURE_2D,pe,bt,Bt,Le,He,Vt,at,zt.data):R.isCompressedTexture?N.compressedTexSubImage2D(N.TEXTURE_2D,pe,bt,Bt,zt.width,zt.height,Vt,zt.data):N.texSubImage2D(N.TEXTURE_2D,pe,bt,Bt,Le,He,Vt,at,zt);N.pixelStorei(N.UNPACK_ROW_LENGTH,Ft),N.pixelStorei(N.UNPACK_IMAGE_HEIGHT,Nn),N.pixelStorei(N.UNPACK_SKIP_PIXELS,T),N.pixelStorei(N.UNPACK_SKIP_ROWS,k),N.pixelStorei(N.UNPACK_SKIP_IMAGES,B),pe===0&&W.generateMipmaps&&N.generateMipmap(Qt),Fe.unbindTexture()},this.initRenderTarget=function(R){Ae.get(R).__webglFramebuffer===void 0&&Ze.setupRenderTarget(R)},this.initTexture=function(R){R.isCubeTexture?Ze.setTextureCube(R,0):R.isData3DTexture?Ze.setTexture3D(R,0):R.isDataArrayTexture||R.isCompressedArrayTexture?Ze.setTexture2DArray(R,0):Ze.setTexture2D(R,0),Fe.unbindTexture()},this.resetState=function(){P=0,w=0,M=null,Fe.reset(),O.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return fr}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=Dt._getDrawingBufferColorSpace(e),t.unpackColorSpace=Dt._getUnpackColorSpace()}}function yT(r){if(!(typeof window>"u")){var e=document.createElement("style");return e.setAttribute("type","text/css"),e.innerHTML=r,document.head.appendChild(e),r}}function Yo(r,e){var t=r.__state.conversionName.toString(),n=Math.round(r.r),i=Math.round(r.g),s=Math.round(r.b),o=r.a,a=Math.round(r.h),l=r.s.toFixed(1),c=r.v.toFixed(1);if(e||t==="THREE_CHAR_HEX"||t==="SIX_CHAR_HEX"){for(var u=r.hex.toString(16);u.length<6;)u="0"+u;return"#"+u}else{if(t==="CSS_RGB")return"rgb("+n+","+i+","+s+")";if(t==="CSS_RGBA")return"rgba("+n+","+i+","+s+","+o+")";if(t==="HEX")return"0x"+r.hex.toString(16);if(t==="RGB_ARRAY")return"["+n+","+i+","+s+"]";if(t==="RGBA_ARRAY")return"["+n+","+i+","+s+","+o+"]";if(t==="RGB_OBJ")return"{r:"+n+",g:"+i+",b:"+s+"}";if(t==="RGBA_OBJ")return"{r:"+n+",g:"+i+",b:"+s+",a:"+o+"}";if(t==="HSV_OBJ")return"{h:"+a+",s:"+l+",v:"+c+"}";if(t==="HSVA_OBJ")return"{h:"+a+",s:"+l+",v:"+c+",a:"+o+"}"}return"unknown format"}var Wm=Array.prototype.forEach,za=Array.prototype.slice,fe={BREAK:{},extend:function(e){return this.each(za.call(arguments,1),function(t){var n=this.isObject(t)?Object.keys(t):[];n.forEach((function(i){this.isUndefined(t[i])||(e[i]=t[i])}).bind(this))},this),e},defaults:function(e){return this.each(za.call(arguments,1),function(t){var n=this.isObject(t)?Object.keys(t):[];n.forEach((function(i){this.isUndefined(e[i])&&(e[i]=t[i])}).bind(this))},this),e},compose:function(){var e=za.call(arguments);return function(){for(var t=za.call(arguments),n=e.length-1;n>=0;n--)t=[e[n].apply(this,t)];return t[0]}},each:function(e,t,n){if(e){if(Wm&&e.forEach&&e.forEach===Wm)e.forEach(t,n);else if(e.length===e.length+0){var i=void 0,s=void 0;for(i=0,s=e.length;i<s;i++)if(i in e&&t.call(n,e[i],i)===this.BREAK)return}else for(var o in e)if(t.call(n,e[o],o)===this.BREAK)return}},defer:function(e){setTimeout(e,0)},debounce:function(e,t,n){var i=void 0;return function(){var s=this,o=arguments;function a(){i=null,n||e.apply(s,o)}var l=n||!i;clearTimeout(i),i=setTimeout(a,t),l&&e.apply(s,o)}},toArray:function(e){return e.toArray?e.toArray():za.call(e)},isUndefined:function(e){return e===void 0},isNull:function(e){return e===null},isNaN:(function(r){function e(t){return r.apply(this,arguments)}return e.toString=function(){return r.toString()},e})(function(r){return isNaN(r)}),isArray:Array.isArray||function(r){return r.constructor===Array},isObject:function(e){return e===Object(e)},isNumber:function(e){return e===e+0},isString:function(e){return e===e+""},isBoolean:function(e){return e===!1||e===!0},isFunction:function(e){return e instanceof Function}},bT=[{litmus:fe.isString,conversions:{THREE_CHAR_HEX:{read:function(e){var t=e.match(/^#([A-F0-9])([A-F0-9])([A-F0-9])$/i);return t===null?!1:{space:"HEX",hex:parseInt("0x"+t[1].toString()+t[1].toString()+t[2].toString()+t[2].toString()+t[3].toString()+t[3].toString(),0)}},write:Yo},SIX_CHAR_HEX:{read:function(e){var t=e.match(/^#([A-F0-9]{6})$/i);return t===null?!1:{space:"HEX",hex:parseInt("0x"+t[1].toString(),0)}},write:Yo},CSS_RGB:{read:function(e){var t=e.match(/^rgb\(\s*(\S+)\s*,\s*(\S+)\s*,\s*(\S+)\s*\)/);return t===null?!1:{space:"RGB",r:parseFloat(t[1]),g:parseFloat(t[2]),b:parseFloat(t[3])}},write:Yo},CSS_RGBA:{read:function(e){var t=e.match(/^rgba\(\s*(\S+)\s*,\s*(\S+)\s*,\s*(\S+)\s*,\s*(\S+)\s*\)/);return t===null?!1:{space:"RGB",r:parseFloat(t[1]),g:parseFloat(t[2]),b:parseFloat(t[3]),a:parseFloat(t[4])}},write:Yo}}},{litmus:fe.isNumber,conversions:{HEX:{read:function(e){return{space:"HEX",hex:e,conversionName:"HEX"}},write:function(e){return e.hex}}}},{litmus:fe.isArray,conversions:{RGB_ARRAY:{read:function(e){return e.length!==3?!1:{space:"RGB",r:e[0],g:e[1],b:e[2]}},write:function(e){return[e.r,e.g,e.b]}},RGBA_ARRAY:{read:function(e){return e.length!==4?!1:{space:"RGB",r:e[0],g:e[1],b:e[2],a:e[3]}},write:function(e){return[e.r,e.g,e.b,e.a]}}}},{litmus:fe.isObject,conversions:{RGBA_OBJ:{read:function(e){return fe.isNumber(e.r)&&fe.isNumber(e.g)&&fe.isNumber(e.b)&&fe.isNumber(e.a)?{space:"RGB",r:e.r,g:e.g,b:e.b,a:e.a}:!1},write:function(e){return{r:e.r,g:e.g,b:e.b,a:e.a}}},RGB_OBJ:{read:function(e){return fe.isNumber(e.r)&&fe.isNumber(e.g)&&fe.isNumber(e.b)?{space:"RGB",r:e.r,g:e.g,b:e.b}:!1},write:function(e){return{r:e.r,g:e.g,b:e.b}}},HSVA_OBJ:{read:function(e){return fe.isNumber(e.h)&&fe.isNumber(e.s)&&fe.isNumber(e.v)&&fe.isNumber(e.a)?{space:"HSV",h:e.h,s:e.s,v:e.v,a:e.a}:!1},write:function(e){return{h:e.h,s:e.s,v:e.v,a:e.a}}},HSV_OBJ:{read:function(e){return fe.isNumber(e.h)&&fe.isNumber(e.s)&&fe.isNumber(e.v)?{space:"HSV",h:e.h,s:e.s,v:e.v}:!1},write:function(e){return{h:e.h,s:e.s,v:e.v}}}}}],Va=void 0,Sc=void 0,Bf=function(){Sc=!1;var e=arguments.length>1?fe.toArray(arguments):arguments[0];return fe.each(bT,function(t){if(t.litmus(e))return fe.each(t.conversions,function(n,i){if(Va=n.read(e),Sc===!1&&Va!==!1)return Sc=Va,Va.conversionName=i,Va.conversion=n,fe.BREAK}),fe.BREAK}),Sc},Xm=void 0,fu={hsv_to_rgb:function(e,t,n){var i=Math.floor(e/60)%6,s=e/60-Math.floor(e/60),o=n*(1-t),a=n*(1-s*t),l=n*(1-(1-s)*t),c=[[n,l,o],[a,n,o],[o,n,l],[o,a,n],[l,o,n],[n,o,a]][i];return{r:c[0]*255,g:c[1]*255,b:c[2]*255}},rgb_to_hsv:function(e,t,n){var i=Math.min(e,t,n),s=Math.max(e,t,n),o=s-i,a=void 0,l=void 0;if(s!==0)l=o/s;else return{h:NaN,s:0,v:0};return e===s?a=(t-n)/o:t===s?a=2+(n-e)/o:a=4+(e-t)/o,a/=6,a<0&&(a+=1),{h:a*360,s:l,v:s/255}},rgb_to_hex:function(e,t,n){var i=this.hex_with_component(0,2,e);return i=this.hex_with_component(i,1,t),i=this.hex_with_component(i,0,n),i},component_from_hex:function(e,t){return e>>t*8&255},hex_with_component:function(e,t,n){return n<<(Xm=t*8)|e&~(255<<Xm)}},ST=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(r){return typeof r}:function(r){return r&&typeof Symbol=="function"&&r.constructor===Symbol&&r!==Symbol.prototype?"symbol":typeof r},tr=function(r,e){if(!(r instanceof e))throw new TypeError("Cannot call a class as a function")},nr=(function(){function r(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(e,t,n){return t&&r(e.prototype,t),n&&r(e,n),e}})(),ws=function r(e,t,n){e===null&&(e=Function.prototype);var i=Object.getOwnPropertyDescriptor(e,t);if(i===void 0){var s=Object.getPrototypeOf(e);return s===null?void 0:r(s,t,n)}else{if("value"in i)return i.value;var o=i.get;return o===void 0?void 0:o.call(n)}},Cs=function(r,e){if(typeof e!="function"&&e!==null)throw new TypeError("Super expression must either be null or a function, not "+typeof e);r.prototype=Object.create(e&&e.prototype,{constructor:{value:r,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(r,e):r.__proto__=e)},Rs=function(r,e){if(!r)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e&&(typeof e=="object"||typeof e=="function")?e:r},In=(function(){function r(){if(tr(this,r),this.__state=Bf.apply(this,arguments),this.__state===!1)throw new Error("Failed to interpret color arguments");this.__state.a=this.__state.a||1}return nr(r,[{key:"toString",value:function(){return Yo(this)}},{key:"toHexString",value:function(){return Yo(this,!0)}},{key:"toOriginal",value:function(){return this.__state.conversion.write(this)}}]),r})();function qh(r,e,t){Object.defineProperty(r,e,{get:function(){return this.__state.space==="RGB"?this.__state[e]:(In.recalculateRGB(this,e,t),this.__state[e])},set:function(i){this.__state.space!=="RGB"&&(In.recalculateRGB(this,e,t),this.__state.space="RGB"),this.__state[e]=i}})}function Yh(r,e){Object.defineProperty(r,e,{get:function(){return this.__state.space==="HSV"?this.__state[e]:(In.recalculateHSV(this),this.__state[e])},set:function(n){this.__state.space!=="HSV"&&(In.recalculateHSV(this),this.__state.space="HSV"),this.__state[e]=n}})}In.recalculateRGB=function(r,e,t){if(r.__state.space==="HEX")r.__state[e]=fu.component_from_hex(r.__state.hex,t);else if(r.__state.space==="HSV")fe.extend(r.__state,fu.hsv_to_rgb(r.__state.h,r.__state.s,r.__state.v));else throw new Error("Corrupted color state")};In.recalculateHSV=function(r){var e=fu.rgb_to_hsv(r.r,r.g,r.b);fe.extend(r.__state,{s:e.s,v:e.v}),fe.isNaN(e.h)?fe.isUndefined(r.__state.h)&&(r.__state.h=0):r.__state.h=e.h};In.COMPONENTS=["r","g","b","h","s","v","hex","a"];qh(In.prototype,"r",2);qh(In.prototype,"g",1);qh(In.prototype,"b",0);Yh(In.prototype,"h");Yh(In.prototype,"s");Yh(In.prototype,"v");Object.defineProperty(In.prototype,"a",{get:function(){return this.__state.a},set:function(e){this.__state.a=e}});Object.defineProperty(In.prototype,"hex",{get:function(){return this.__state.space!=="HEX"&&(this.__state.hex=fu.rgb_to_hex(this.r,this.g,this.b),this.__state.space="HEX"),this.__state.hex},set:function(e){this.__state.space="HEX",this.__state.hex=e}});var _o=(function(){function r(e,t){tr(this,r),this.initialValue=e[t],this.domElement=document.createElement("div"),this.object=e,this.property=t,this.__onChange=void 0,this.__onFinishChange=void 0}return nr(r,[{key:"onChange",value:function(t){return this.__onChange=t,this}},{key:"onFinishChange",value:function(t){return this.__onFinishChange=t,this}},{key:"setValue",value:function(t){return this.object[this.property]=t,this.__onChange&&this.__onChange.call(this,t),this.updateDisplay(),this}},{key:"getValue",value:function(){return this.object[this.property]}},{key:"updateDisplay",value:function(){return this}},{key:"isModified",value:function(){return this.initialValue!==this.getValue()}}]),r})(),wT={HTMLEvents:["change"],MouseEvents:["click","mousemove","mousedown","mouseup","mouseover"],KeyboardEvents:["keydown"]},jg={};fe.each(wT,function(r,e){fe.each(r,function(t){jg[t]=e})});var MT=/(\d+(\.\d+)?)px/;function rr(r){if(r==="0"||fe.isUndefined(r))return 0;var e=r.match(MT);return fe.isNull(e)?0:parseFloat(e[1])}var te={makeSelectable:function(e,t){e===void 0||e.style===void 0||(e.onselectstart=t?function(){return!1}:function(){},e.style.MozUserSelect=t?"auto":"none",e.style.KhtmlUserSelect=t?"auto":"none",e.unselectable=t?"on":"off")},makeFullscreen:function(e,t,n){var i=n,s=t;fe.isUndefined(s)&&(s=!0),fe.isUndefined(i)&&(i=!0),e.style.position="absolute",s&&(e.style.left=0,e.style.right=0),i&&(e.style.top=0,e.style.bottom=0)},fakeEvent:function(e,t,n,i){var s=n||{},o=jg[t];if(!o)throw new Error("Event type "+t+" not supported.");var a=document.createEvent(o);switch(o){case"MouseEvents":{var l=s.x||s.clientX||0,c=s.y||s.clientY||0;a.initMouseEvent(t,s.bubbles||!1,s.cancelable||!0,window,s.clickCount||1,0,0,l,c,!1,!1,!1,!1,0,null);break}case"KeyboardEvents":{var u=a.initKeyboardEvent||a.initKeyEvent;fe.defaults(s,{cancelable:!0,ctrlKey:!1,altKey:!1,shiftKey:!1,metaKey:!1,keyCode:void 0,charCode:void 0}),u(t,s.bubbles||!1,s.cancelable,window,s.ctrlKey,s.altKey,s.shiftKey,s.metaKey,s.keyCode,s.charCode);break}default:{a.initEvent(t,s.bubbles||!1,s.cancelable||!0);break}}fe.defaults(a,i),e.dispatchEvent(a)},bind:function(e,t,n,i){var s=i||!1;return e.addEventListener?e.addEventListener(t,n,s):e.attachEvent&&e.attachEvent("on"+t,n),te},unbind:function(e,t,n,i){var s=i||!1;return e.removeEventListener?e.removeEventListener(t,n,s):e.detachEvent&&e.detachEvent("on"+t,n),te},addClass:function(e,t){if(e.className===void 0)e.className=t;else if(e.className!==t){var n=e.className.split(/ +/);n.indexOf(t)===-1&&(n.push(t),e.className=n.join(" ").replace(/^\s+/,"").replace(/\s+$/,""))}return te},removeClass:function(e,t){if(t)if(e.className===t)e.removeAttribute("class");else{var n=e.className.split(/ +/),i=n.indexOf(t);i!==-1&&(n.splice(i,1),e.className=n.join(" "))}else e.className=void 0;return te},hasClass:function(e,t){return new RegExp("(?:^|\\s+)"+t+"(?:\\s+|$)").test(e.className)||!1},getWidth:function(e){var t=getComputedStyle(e);return rr(t["border-left-width"])+rr(t["border-right-width"])+rr(t["padding-left"])+rr(t["padding-right"])+rr(t.width)},getHeight:function(e){var t=getComputedStyle(e);return rr(t["border-top-width"])+rr(t["border-bottom-width"])+rr(t["padding-top"])+rr(t["padding-bottom"])+rr(t.height)},getOffset:function(e){var t=e,n={left:0,top:0};if(t.offsetParent)do n.left+=t.offsetLeft,n.top+=t.offsetTop,t=t.offsetParent;while(t);return n},isActive:function(e){return e===document.activeElement&&(e.type||e.href)}},$g=(function(r){Cs(e,r);function e(t,n){tr(this,e);var i=Rs(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n)),s=i;i.__prev=i.getValue(),i.__checkbox=document.createElement("input"),i.__checkbox.setAttribute("type","checkbox");function o(){s.setValue(!s.__prev)}return te.bind(i.__checkbox,"change",o,!1),i.domElement.appendChild(i.__checkbox),i.updateDisplay(),i}return nr(e,[{key:"setValue",value:function(n){var i=ws(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"setValue",this).call(this,n);return this.__onFinishChange&&this.__onFinishChange.call(this,this.getValue()),this.__prev=this.getValue(),i}},{key:"updateDisplay",value:function(){return this.getValue()===!0?(this.__checkbox.setAttribute("checked","checked"),this.__checkbox.checked=!0,this.__prev=!0):(this.__checkbox.checked=!1,this.__prev=!1),ws(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"updateDisplay",this).call(this)}}]),e})(_o),TT=(function(r){Cs(e,r);function e(t,n,i){tr(this,e);var s=Rs(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n)),o=i,a=s;if(s.__select=document.createElement("select"),fe.isArray(o)){var l={};fe.each(o,function(c){l[c]=c}),o=l}return fe.each(o,function(c,u){var d=document.createElement("option");d.innerHTML=u,d.setAttribute("value",c),a.__select.appendChild(d)}),s.updateDisplay(),te.bind(s.__select,"change",function(){var c=this.options[this.selectedIndex].value;a.setValue(c)}),s.domElement.appendChild(s.__select),s}return nr(e,[{key:"setValue",value:function(n){var i=ws(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"setValue",this).call(this,n);return this.__onFinishChange&&this.__onFinishChange.call(this,this.getValue()),i}},{key:"updateDisplay",value:function(){return te.isActive(this.__select)?this:(this.__select.value=this.getValue(),ws(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"updateDisplay",this).call(this))}}]),e})(_o),ET=(function(r){Cs(e,r);function e(t,n){tr(this,e);var i=Rs(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n)),s=i;function o(){s.setValue(s.__input.value)}function a(){s.__onFinishChange&&s.__onFinishChange.call(s,s.getValue())}return i.__input=document.createElement("input"),i.__input.setAttribute("type","text"),te.bind(i.__input,"keyup",o),te.bind(i.__input,"change",o),te.bind(i.__input,"blur",a),te.bind(i.__input,"keydown",function(l){l.keyCode===13&&this.blur()}),i.updateDisplay(),i.domElement.appendChild(i.__input),i}return nr(e,[{key:"updateDisplay",value:function(){return te.isActive(this.__input)||(this.__input.value=this.getValue()),ws(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"updateDisplay",this).call(this)}}]),e})(_o);function qm(r){var e=r.toString();return e.indexOf(".")>-1?e.length-e.indexOf(".")-1:0}var Kg=(function(r){Cs(e,r);function e(t,n,i){tr(this,e);var s=Rs(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n)),o=i||{};return s.__min=o.min,s.__max=o.max,s.__step=o.step,fe.isUndefined(s.__step)?s.initialValue===0?s.__impliedStep=1:s.__impliedStep=Math.pow(10,Math.floor(Math.log(Math.abs(s.initialValue))/Math.LN10))/10:s.__impliedStep=s.__step,s.__precision=qm(s.__impliedStep),s}return nr(e,[{key:"setValue",value:function(n){var i=n;return this.__min!==void 0&&i<this.__min?i=this.__min:this.__max!==void 0&&i>this.__max&&(i=this.__max),this.__step!==void 0&&i%this.__step!==0&&(i=Math.round(i/this.__step)*this.__step),ws(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"setValue",this).call(this,i)}},{key:"min",value:function(n){return this.__min=n,this}},{key:"max",value:function(n){return this.__max=n,this}},{key:"step",value:function(n){return this.__step=n,this.__impliedStep=n,this.__precision=qm(n),this}}]),e})(_o);function AT(r,e){var t=Math.pow(10,e);return Math.round(r*t)/t}var hu=(function(r){Cs(e,r);function e(t,n,i){tr(this,e);var s=Rs(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n,i));s.__truncationSuspended=!1;var o=s,a=void 0;function l(){var _=parseFloat(o.__input.value);fe.isNaN(_)||o.setValue(_)}function c(){o.__onFinishChange&&o.__onFinishChange.call(o,o.getValue())}function u(){c()}function d(_){var g=a-_.clientY;o.setValue(o.getValue()+g*o.__impliedStep),a=_.clientY}function f(){te.unbind(window,"mousemove",d),te.unbind(window,"mouseup",f),c()}function h(_){te.bind(window,"mousemove",d),te.bind(window,"mouseup",f),a=_.clientY}return s.__input=document.createElement("input"),s.__input.setAttribute("type","text"),te.bind(s.__input,"change",l),te.bind(s.__input,"blur",u),te.bind(s.__input,"mousedown",h),te.bind(s.__input,"keydown",function(_){_.keyCode===13&&(o.__truncationSuspended=!0,this.blur(),o.__truncationSuspended=!1,c())}),s.updateDisplay(),s.domElement.appendChild(s.__input),s}return nr(e,[{key:"updateDisplay",value:function(){return this.__input.value=this.__truncationSuspended?this.getValue():AT(this.getValue(),this.__precision),ws(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"updateDisplay",this).call(this)}}]),e})(Kg);function Ym(r,e,t,n,i){return n+(i-n)*((r-e)/(t-e))}var zf=(function(r){Cs(e,r);function e(t,n,i,s,o){tr(this,e);var a=Rs(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n,{min:i,max:s,step:o})),l=a;a.__background=document.createElement("div"),a.__foreground=document.createElement("div"),te.bind(a.__background,"mousedown",c),te.bind(a.__background,"touchstart",f),te.addClass(a.__background,"slider"),te.addClass(a.__foreground,"slider-fg");function c(g){document.activeElement.blur(),te.bind(window,"mousemove",u),te.bind(window,"mouseup",d),u(g)}function u(g){g.preventDefault();var m=l.__background.getBoundingClientRect();return l.setValue(Ym(g.clientX,m.left,m.right,l.__min,l.__max)),!1}function d(){te.unbind(window,"mousemove",u),te.unbind(window,"mouseup",d),l.__onFinishChange&&l.__onFinishChange.call(l,l.getValue())}function f(g){g.touches.length===1&&(te.bind(window,"touchmove",h),te.bind(window,"touchend",_),h(g))}function h(g){var m=g.touches[0].clientX,p=l.__background.getBoundingClientRect();l.setValue(Ym(m,p.left,p.right,l.__min,l.__max))}function _(){te.unbind(window,"touchmove",h),te.unbind(window,"touchend",_),l.__onFinishChange&&l.__onFinishChange.call(l,l.getValue())}return a.updateDisplay(),a.__background.appendChild(a.__foreground),a.domElement.appendChild(a.__background),a}return nr(e,[{key:"updateDisplay",value:function(){var n=(this.getValue()-this.__min)/(this.__max-this.__min);return this.__foreground.style.width=n*100+"%",ws(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"updateDisplay",this).call(this)}}]),e})(Kg),Zg=(function(r){Cs(e,r);function e(t,n,i){tr(this,e);var s=Rs(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n)),o=s;return s.__button=document.createElement("div"),s.__button.innerHTML=i===void 0?"Fire":i,te.bind(s.__button,"click",function(a){return a.preventDefault(),o.fire(),!1}),te.addClass(s.__button,"button"),s.domElement.appendChild(s.__button),s}return nr(e,[{key:"fire",value:function(){this.__onChange&&this.__onChange.call(this),this.getValue().call(this.object),this.__onFinishChange&&this.__onFinishChange.call(this,this.getValue())}}]),e})(_o),Vf=(function(r){Cs(e,r);function e(t,n){tr(this,e);var i=Rs(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n));i.__color=new In(i.getValue()),i.__temp=new In(0);var s=i;i.domElement=document.createElement("div"),te.makeSelectable(i.domElement,!1),i.__selector=document.createElement("div"),i.__selector.className="selector",i.__saturation_field=document.createElement("div"),i.__saturation_field.className="saturation-field",i.__field_knob=document.createElement("div"),i.__field_knob.className="field-knob",i.__field_knob_border="2px solid ",i.__hue_knob=document.createElement("div"),i.__hue_knob.className="hue-knob",i.__hue_field=document.createElement("div"),i.__hue_field.className="hue-field",i.__input=document.createElement("input"),i.__input.type="text",i.__input_textShadow="0 1px 1px ",te.bind(i.__input,"keydown",function(g){g.keyCode===13&&d.call(this)}),te.bind(i.__input,"blur",d),te.bind(i.__selector,"mousedown",function(){te.addClass(this,"drag").bind(window,"mouseup",function(){te.removeClass(s.__selector,"drag")})}),te.bind(i.__selector,"touchstart",function(){te.addClass(this,"drag").bind(window,"touchend",function(){te.removeClass(s.__selector,"drag")})});var o=document.createElement("div");fe.extend(i.__selector.style,{width:"122px",height:"102px",padding:"3px",backgroundColor:"#222",boxShadow:"0px 1px 3px rgba(0,0,0,0.3)"}),fe.extend(i.__field_knob.style,{position:"absolute",width:"12px",height:"12px",border:i.__field_knob_border+(i.__color.v<.5?"#fff":"#000"),boxShadow:"0px 1px 3px rgba(0,0,0,0.5)",borderRadius:"12px",zIndex:1}),fe.extend(i.__hue_knob.style,{position:"absolute",width:"15px",height:"2px",borderRight:"4px solid #fff",zIndex:1}),fe.extend(i.__saturation_field.style,{width:"100px",height:"100px",border:"1px solid #555",marginRight:"3px",display:"inline-block",cursor:"pointer"}),fe.extend(o.style,{width:"100%",height:"100%",background:"none"}),jm(o,"top","rgba(0,0,0,0)","#000"),fe.extend(i.__hue_field.style,{width:"15px",height:"100px",border:"1px solid #555",cursor:"ns-resize",position:"absolute",top:"3px",right:"3px"}),RT(i.__hue_field),fe.extend(i.__input.style,{outline:"none",textAlign:"center",color:"#fff",border:0,fontWeight:"bold",textShadow:i.__input_textShadow+"rgba(0,0,0,0.7)"}),te.bind(i.__saturation_field,"mousedown",a),te.bind(i.__saturation_field,"touchstart",a),te.bind(i.__field_knob,"mousedown",a),te.bind(i.__field_knob,"touchstart",a),te.bind(i.__hue_field,"mousedown",l),te.bind(i.__hue_field,"touchstart",l);function a(g){h(g),te.bind(window,"mousemove",h),te.bind(window,"touchmove",h),te.bind(window,"mouseup",c),te.bind(window,"touchend",c)}function l(g){_(g),te.bind(window,"mousemove",_),te.bind(window,"touchmove",_),te.bind(window,"mouseup",u),te.bind(window,"touchend",u)}function c(){te.unbind(window,"mousemove",h),te.unbind(window,"touchmove",h),te.unbind(window,"mouseup",c),te.unbind(window,"touchend",c),f()}function u(){te.unbind(window,"mousemove",_),te.unbind(window,"touchmove",_),te.unbind(window,"mouseup",u),te.unbind(window,"touchend",u),f()}function d(){var g=Bf(this.value);g!==!1?(s.__color.__state=g,s.setValue(s.__color.toOriginal())):this.value=s.__color.toString()}function f(){s.__onFinishChange&&s.__onFinishChange.call(s,s.__color.toOriginal())}i.__saturation_field.appendChild(o),i.__selector.appendChild(i.__field_knob),i.__selector.appendChild(i.__saturation_field),i.__selector.appendChild(i.__hue_field),i.__hue_field.appendChild(i.__hue_knob),i.domElement.appendChild(i.__input),i.domElement.appendChild(i.__selector),i.updateDisplay();function h(g){g.type.indexOf("touch")===-1&&g.preventDefault();var m=s.__saturation_field.getBoundingClientRect(),p=g.touches&&g.touches[0]||g,y=p.clientX,v=p.clientY,x=(y-m.left)/(m.right-m.left),E=1-(v-m.top)/(m.bottom-m.top);return E>1?E=1:E<0&&(E=0),x>1?x=1:x<0&&(x=0),s.__color.v=E,s.__color.s=x,s.setValue(s.__color.toOriginal()),!1}function _(g){g.type.indexOf("touch")===-1&&g.preventDefault();var m=s.__hue_field.getBoundingClientRect(),p=g.touches&&g.touches[0]||g,y=p.clientY,v=1-(y-m.top)/(m.bottom-m.top);return v>1?v=1:v<0&&(v=0),s.__color.h=v*360,s.setValue(s.__color.toOriginal()),!1}return i}return nr(e,[{key:"updateDisplay",value:function(){var n=Bf(this.getValue());if(n!==!1){var i=!1;fe.each(In.COMPONENTS,function(a){if(!fe.isUndefined(n[a])&&!fe.isUndefined(this.__color.__state[a])&&n[a]!==this.__color.__state[a])return i=!0,{}},this),i&&fe.extend(this.__color.__state,n)}fe.extend(this.__temp.__state,this.__color.__state),this.__temp.a=1;var s=this.__color.v<.5||this.__color.s>.5?255:0,o=255-s;fe.extend(this.__field_knob.style,{marginLeft:100*this.__color.s-7+"px",marginTop:100*(1-this.__color.v)-7+"px",backgroundColor:this.__temp.toHexString(),border:this.__field_knob_border+"rgb("+s+","+s+","+s+")"}),this.__hue_knob.style.marginTop=(1-this.__color.h/360)*100+"px",this.__temp.s=1,this.__temp.v=1,jm(this.__saturation_field,"left","#fff",this.__temp.toHexString()),this.__input.value=this.__color.toString(),fe.extend(this.__input.style,{backgroundColor:this.__color.toHexString(),color:"rgb("+s+","+s+","+s+")",textShadow:this.__input_textShadow+"rgba("+o+","+o+","+o+",.7)"})}}]),e})(_o),CT=["-moz-","-o-","-webkit-","-ms-",""];function jm(r,e,t,n){r.style.background="",fe.each(CT,function(i){r.style.cssText+="background: "+i+"linear-gradient("+e+", "+t+" 0%, "+n+" 100%); "})}function RT(r){r.style.background="",r.style.cssText+="background: -moz-linear-gradient(top,  #ff0000 0%, #ff00ff 17%, #0000ff 34%, #00ffff 50%, #00ff00 67%, #ffff00 84%, #ff0000 100%);",r.style.cssText+="background: -webkit-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);",r.style.cssText+="background: -o-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);",r.style.cssText+="background: -ms-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);",r.style.cssText+="background: linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);"}var PT={load:function(e,t){var n=t||document,i=n.createElement("link");i.type="text/css",i.rel="stylesheet",i.href=e,n.getElementsByTagName("head")[0].appendChild(i)},inject:function(e,t){var n=t||document,i=document.createElement("style");i.type="text/css",i.innerHTML=e;var s=n.getElementsByTagName("head")[0];try{s.appendChild(i)}catch{}}},LT=`<div id="dg-save" class="dg dialogue">

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

</div>`,DT=function(e,t){var n=e[t];return fe.isArray(arguments[2])||fe.isObject(arguments[2])?new TT(e,t,arguments[2]):fe.isNumber(n)?fe.isNumber(arguments[2])&&fe.isNumber(arguments[3])?fe.isNumber(arguments[4])?new zf(e,t,arguments[2],arguments[3],arguments[4]):new zf(e,t,arguments[2],arguments[3]):fe.isNumber(arguments[4])?new hu(e,t,{min:arguments[2],max:arguments[3],step:arguments[4]}):new hu(e,t,{min:arguments[2],max:arguments[3]}):fe.isString(n)?new ET(e,t):fe.isFunction(n)?new Zg(e,t,""):fe.isBoolean(n)?new $g(e,t):null};function IT(r){setTimeout(r,1e3/60)}var OT=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||IT,NT=(function(){function r(){tr(this,r),this.backgroundElement=document.createElement("div"),fe.extend(this.backgroundElement.style,{backgroundColor:"rgba(0,0,0,0.8)",top:0,left:0,display:"none",zIndex:"1000",opacity:0,WebkitTransition:"opacity 0.2s linear",transition:"opacity 0.2s linear"}),te.makeFullscreen(this.backgroundElement),this.backgroundElement.style.position="fixed",this.domElement=document.createElement("div"),fe.extend(this.domElement.style,{position:"fixed",display:"none",zIndex:"1001",opacity:0,WebkitTransition:"-webkit-transform 0.2s ease-out, opacity 0.2s linear",transition:"transform 0.2s ease-out, opacity 0.2s linear"}),document.body.appendChild(this.backgroundElement),document.body.appendChild(this.domElement);var e=this;te.bind(this.backgroundElement,"click",function(){e.hide()})}return nr(r,[{key:"show",value:function(){var t=this;this.backgroundElement.style.display="block",this.domElement.style.display="block",this.domElement.style.opacity=0,this.domElement.style.webkitTransform="scale(1.1)",this.layout(),fe.defer(function(){t.backgroundElement.style.opacity=1,t.domElement.style.opacity=1,t.domElement.style.webkitTransform="scale(1)"})}},{key:"hide",value:function(){var t=this,n=function i(){t.domElement.style.display="none",t.backgroundElement.style.display="none",te.unbind(t.domElement,"webkitTransitionEnd",i),te.unbind(t.domElement,"transitionend",i),te.unbind(t.domElement,"oTransitionEnd",i)};te.bind(this.domElement,"webkitTransitionEnd",n),te.bind(this.domElement,"transitionend",n),te.bind(this.domElement,"oTransitionEnd",n),this.backgroundElement.style.opacity=0,this.domElement.style.opacity=0,this.domElement.style.webkitTransform="scale(1.1)"}},{key:"layout",value:function(){this.domElement.style.left=window.innerWidth/2-te.getWidth(this.domElement)/2+"px",this.domElement.style.top=window.innerHeight/2-te.getHeight(this.domElement)/2+"px"}}]),r})(),FT=yT(`.dg ul{list-style:none;margin:0;padding:0;width:100%;clear:both}.dg.ac{position:fixed;top:0;left:0;right:0;height:0;z-index:0}.dg:not(.ac) .main{overflow:hidden}.dg.main{-webkit-transition:opacity .1s linear;-o-transition:opacity .1s linear;-moz-transition:opacity .1s linear;transition:opacity .1s linear}.dg.main.taller-than-window{overflow-y:auto}.dg.main.taller-than-window .close-button{opacity:1;margin-top:-1px;border-top:1px solid #2c2c2c}.dg.main ul.closed .close-button{opacity:1 !important}.dg.main:hover .close-button,.dg.main .close-button.drag{opacity:1}.dg.main .close-button{-webkit-transition:opacity .1s linear;-o-transition:opacity .1s linear;-moz-transition:opacity .1s linear;transition:opacity .1s linear;border:0;line-height:19px;height:20px;cursor:pointer;text-align:center;background-color:#000}.dg.main .close-button.close-top{position:relative}.dg.main .close-button.close-bottom{position:absolute}.dg.main .close-button:hover{background-color:#111}.dg.a{float:right;margin-right:15px;overflow-y:visible}.dg.a.has-save>ul.close-top{margin-top:0}.dg.a.has-save>ul.close-bottom{margin-top:27px}.dg.a.has-save>ul.closed{margin-top:0}.dg.a .save-row{top:0;z-index:1002}.dg.a .save-row.close-top{position:relative}.dg.a .save-row.close-bottom{position:fixed}.dg li{-webkit-transition:height .1s ease-out;-o-transition:height .1s ease-out;-moz-transition:height .1s ease-out;transition:height .1s ease-out;-webkit-transition:overflow .1s linear;-o-transition:overflow .1s linear;-moz-transition:overflow .1s linear;transition:overflow .1s linear}.dg li:not(.folder){cursor:auto;height:27px;line-height:27px;padding:0 4px 0 5px}.dg li.folder{padding:0;border-left:4px solid rgba(0,0,0,0)}.dg li.title{cursor:pointer;margin-left:-4px}.dg .closed li:not(.title),.dg .closed ul li,.dg .closed ul li>*{height:0;overflow:hidden;border:0}.dg .cr{clear:both;padding-left:3px;height:27px;overflow:hidden}.dg .property-name{cursor:default;float:left;clear:left;width:40%;overflow:hidden;text-overflow:ellipsis}.dg .cr.function .property-name{width:100%}.dg .c{float:left;width:60%;position:relative}.dg .c input[type=text]{border:0;margin-top:4px;padding:3px;width:100%;float:right}.dg .has-slider input[type=text]{width:30%;margin-left:0}.dg .slider{float:left;width:66%;margin-left:-5px;margin-right:0;height:19px;margin-top:4px}.dg .slider-fg{height:100%}.dg .c input[type=checkbox]{margin-top:7px}.dg .c select{margin-top:5px}.dg .cr.function,.dg .cr.function .property-name,.dg .cr.function *,.dg .cr.boolean,.dg .cr.boolean *{cursor:pointer}.dg .cr.color{overflow:visible}.dg .selector{display:none;position:absolute;margin-left:-9px;margin-top:23px;z-index:10}.dg .c:hover .selector,.dg .selector.drag{display:block}.dg li.save-row{padding:0}.dg li.save-row .button{display:inline-block;padding:0px 6px}.dg.dialogue{background-color:#222;width:460px;padding:15px;font-size:13px;line-height:15px}#dg-new-constructor{padding:10px;color:#222;font-family:Monaco, monospace;font-size:10px;border:0;resize:none;box-shadow:inset 1px 1px 1px #888;word-wrap:break-word;margin:12px 0;display:block;width:440px;overflow-y:scroll;height:100px;position:relative}#dg-local-explain{display:none;font-size:11px;line-height:17px;border-radius:3px;background-color:#333;padding:8px;margin-top:10px}#dg-local-explain code{font-size:10px}#dat-gui-save-locally{display:none}.dg{color:#eee;font:11px 'Lucida Grande', sans-serif;text-shadow:0 -1px 0 #111}.dg.main::-webkit-scrollbar{width:5px;background:#1a1a1a}.dg.main::-webkit-scrollbar-corner{height:0;display:none}.dg.main::-webkit-scrollbar-thumb{border-radius:5px;background:#676767}.dg li:not(.folder){background:#1a1a1a;border-bottom:1px solid #2c2c2c}.dg li.save-row{line-height:25px;background:#dad5cb;border:0}.dg li.save-row select{margin-left:5px;width:108px}.dg li.save-row .button{margin-left:5px;margin-top:1px;border-radius:2px;font-size:9px;line-height:7px;padding:4px 4px 5px 4px;background:#c5bdad;color:#fff;text-shadow:0 1px 0 #b0a58f;box-shadow:0 -1px 0 #b0a58f;cursor:pointer}.dg li.save-row .button.gears{background:#c5bdad url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAANCAYAAAB/9ZQ7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAQJJREFUeNpiYKAU/P//PwGIC/ApCABiBSAW+I8AClAcgKxQ4T9hoMAEUrxx2QSGN6+egDX+/vWT4e7N82AMYoPAx/evwWoYoSYbACX2s7KxCxzcsezDh3evFoDEBYTEEqycggWAzA9AuUSQQgeYPa9fPv6/YWm/Acx5IPb7ty/fw+QZblw67vDs8R0YHyQhgObx+yAJkBqmG5dPPDh1aPOGR/eugW0G4vlIoTIfyFcA+QekhhHJhPdQxbiAIguMBTQZrPD7108M6roWYDFQiIAAv6Aow/1bFwXgis+f2LUAynwoIaNcz8XNx3Dl7MEJUDGQpx9gtQ8YCueB+D26OECAAQDadt7e46D42QAAAABJRU5ErkJggg==) 2px 1px no-repeat;height:7px;width:8px}.dg li.save-row .button:hover{background-color:#bab19e;box-shadow:0 -1px 0 #b0a58f}.dg li.folder{border-bottom:0}.dg li.title{padding-left:16px;background:#000 url(data:image/gif;base64,R0lGODlhBQAFAJEAAP////Pz8////////yH5BAEAAAIALAAAAAAFAAUAAAIIlI+hKgFxoCgAOw==) 6px 10px no-repeat;cursor:pointer;border-bottom:1px solid rgba(255,255,255,0.2)}.dg .closed li.title{background-image:url(data:image/gif;base64,R0lGODlhBQAFAJEAAP////Pz8////////yH5BAEAAAIALAAAAAAFAAUAAAIIlGIWqMCbWAEAOw==)}.dg .cr.boolean{border-left:3px solid #806787}.dg .cr.color{border-left:3px solid}.dg .cr.function{border-left:3px solid #e61d5f}.dg .cr.number{border-left:3px solid #2FA1D6}.dg .cr.number input[type=text]{color:#2FA1D6}.dg .cr.string{border-left:3px solid #1ed36f}.dg .cr.string input[type=text]{color:#1ed36f}.dg .cr.function:hover,.dg .cr.boolean:hover{background:#111}.dg .c input[type=text]{background:#303030;outline:none}.dg .c input[type=text]:hover{background:#3c3c3c}.dg .c input[type=text]:focus{background:#494949;color:#fff}.dg .c .slider{background:#303030;cursor:ew-resize}.dg .c .slider-fg{background:#2FA1D6;max-width:100%}.dg .c .slider:hover{background:#3c3c3c}.dg .c .slider:hover .slider-fg{background:#44abda}
`);PT.inject(FT);var $m="dg",Km=72,Zm=20,Il="Default",$a=(function(){try{return!!window.localStorage}catch{return!1}})(),cl=void 0,Jm=!0,Go=void 0,wd=!1,Jg=[],rn=function r(e){var t=this,n=e||{};this.domElement=document.createElement("div"),this.__ul=document.createElement("ul"),this.domElement.appendChild(this.__ul),te.addClass(this.domElement,$m),this.__folders={},this.__controllers=[],this.__rememberedObjects=[],this.__rememberedObjectIndecesToControllers=[],this.__listening=[],n=fe.defaults(n,{closeOnTop:!1,autoPlace:!0,width:r.DEFAULT_WIDTH}),n=fe.defaults(n,{resizable:n.autoPlace,hideable:n.autoPlace}),fe.isUndefined(n.load)?n.load={preset:Il}:n.preset&&(n.load.preset=n.preset),fe.isUndefined(n.parent)&&n.hideable&&Jg.push(this),n.resizable=fe.isUndefined(n.parent)&&n.resizable,n.autoPlace&&fe.isUndefined(n.scrollable)&&(n.scrollable=!0);var i=$a&&localStorage.getItem(Wo(this,"isLocal"))==="true",s=void 0,o=void 0;if(Object.defineProperties(this,{parent:{get:function(){return n.parent}},scrollable:{get:function(){return n.scrollable}},autoPlace:{get:function(){return n.autoPlace}},closeOnTop:{get:function(){return n.closeOnTop}},preset:{get:function(){return t.parent?t.getRoot().preset:n.load.preset},set:function(f){t.parent?t.getRoot().preset=f:n.load.preset=f,zT(this),t.revert()}},width:{get:function(){return n.width},set:function(f){n.width=f,Wf(t,f)}},name:{get:function(){return n.name},set:function(f){n.name=f,o&&(o.innerHTML=n.name)}},closed:{get:function(){return n.closed},set:function(f){n.closed=f,n.closed?te.addClass(t.__ul,r.CLASS_CLOSED):te.removeClass(t.__ul,r.CLASS_CLOSED),this.onResize(),t.__closeButton&&(t.__closeButton.innerHTML=f?r.TEXT_OPEN:r.TEXT_CLOSED)}},load:{get:function(){return n.load}},useLocalStorage:{get:function(){return i},set:function(f){$a&&(i=f,f?te.bind(window,"unload",s):te.unbind(window,"unload",s),localStorage.setItem(Wo(t,"isLocal"),f))}}}),fe.isUndefined(n.parent)){if(this.closed=n.closed||!1,te.addClass(this.domElement,r.CLASS_MAIN),te.makeSelectable(this.domElement,!1),$a&&i){t.useLocalStorage=!0;var a=localStorage.getItem(Wo(this,"gui"));a&&(n.load=JSON.parse(a))}this.__closeButton=document.createElement("div"),this.__closeButton.innerHTML=r.TEXT_CLOSED,te.addClass(this.__closeButton,r.CLASS_CLOSE_BUTTON),n.closeOnTop?(te.addClass(this.__closeButton,r.CLASS_CLOSE_TOP),this.domElement.insertBefore(this.__closeButton,this.domElement.childNodes[0])):(te.addClass(this.__closeButton,r.CLASS_CLOSE_BOTTOM),this.domElement.appendChild(this.__closeButton)),te.bind(this.__closeButton,"click",function(){t.closed=!t.closed})}else{n.closed===void 0&&(n.closed=!0);var l=document.createTextNode(n.name);te.addClass(l,"controller-name"),o=jh(t,l);var c=function(f){return f.preventDefault(),t.closed=!t.closed,!1};te.addClass(this.__ul,r.CLASS_CLOSED),te.addClass(o,"title"),te.bind(o,"click",c),n.closed||(this.closed=!1)}n.autoPlace&&(fe.isUndefined(n.parent)&&(Jm&&(Go=document.createElement("div"),te.addClass(Go,$m),te.addClass(Go,r.CLASS_AUTO_PLACE_CONTAINER),document.body.appendChild(Go),Jm=!1),Go.appendChild(this.domElement),te.addClass(this.domElement,r.CLASS_AUTO_PLACE)),this.parent||Wf(t,n.width)),this.__resizeHandler=function(){t.onResizeDebounced()},te.bind(window,"resize",this.__resizeHandler),te.bind(this.__ul,"webkitTransitionEnd",this.__resizeHandler),te.bind(this.__ul,"transitionend",this.__resizeHandler),te.bind(this.__ul,"oTransitionEnd",this.__resizeHandler),this.onResize(),n.resizable&&BT(this),s=function(){$a&&localStorage.getItem(Wo(t,"isLocal"))==="true"&&localStorage.setItem(Wo(t,"gui"),JSON.stringify(t.getSaveObject()))},this.saveToLocalStorageIfPossible=s;function u(){var d=t.getRoot();d.width+=1,fe.defer(function(){d.width-=1})}n.parent||u()};rn.toggleHide=function(){wd=!wd,fe.each(Jg,function(r){r.domElement.style.display=wd?"none":""})};rn.CLASS_AUTO_PLACE="a";rn.CLASS_AUTO_PLACE_CONTAINER="ac";rn.CLASS_MAIN="main";rn.CLASS_CONTROLLER_ROW="cr";rn.CLASS_TOO_TALL="taller-than-window";rn.CLASS_CLOSED="closed";rn.CLASS_CLOSE_BUTTON="close-button";rn.CLASS_CLOSE_TOP="close-top";rn.CLASS_CLOSE_BOTTOM="close-bottom";rn.CLASS_DRAG="drag";rn.DEFAULT_WIDTH=245;rn.TEXT_CLOSED="Close Controls";rn.TEXT_OPEN="Open Controls";rn._keydownHandler=function(r){document.activeElement.type!=="text"&&(r.which===Km||r.keyCode===Km)&&rn.toggleHide()};te.bind(window,"keydown",rn._keydownHandler,!1);fe.extend(rn.prototype,{add:function(e,t){return ul(this,e,t,{factoryArgs:Array.prototype.slice.call(arguments,2)})},addColor:function(e,t){return ul(this,e,t,{color:!0})},remove:function(e){this.__ul.removeChild(e.__li),this.__controllers.splice(this.__controllers.indexOf(e),1);var t=this;fe.defer(function(){t.onResize()})},destroy:function(){if(this.parent)throw new Error("Only the root GUI should be removed with .destroy(). For subfolders, use gui.removeFolder(folder) instead.");this.autoPlace&&Go.removeChild(this.domElement);var e=this;fe.each(this.__folders,function(t){e.removeFolder(t)}),te.unbind(window,"keydown",rn._keydownHandler,!1),Qm(this)},addFolder:function(e){if(this.__folders[e]!==void 0)throw new Error('You already have a folder in this GUI by the name "'+e+'"');var t={name:e,parent:this};t.autoPlace=this.autoPlace,this.load&&this.load.folders&&this.load.folders[e]&&(t.closed=this.load.folders[e].closed,t.load=this.load.folders[e]);var n=new rn(t);this.__folders[e]=n;var i=jh(this,n.domElement);return te.addClass(i,"folder"),n},removeFolder:function(e){this.__ul.removeChild(e.domElement.parentElement),delete this.__folders[e.name],this.load&&this.load.folders&&this.load.folders[e.name]&&delete this.load.folders[e.name],Qm(e);var t=this;fe.each(e.__folders,function(n){e.removeFolder(n)}),fe.defer(function(){t.onResize()})},open:function(){this.closed=!1},close:function(){this.closed=!0},hide:function(){this.domElement.style.display="none"},show:function(){this.domElement.style.display=""},onResize:function(){var e=this.getRoot();if(e.scrollable){var t=te.getOffset(e.__ul).top,n=0;fe.each(e.__ul.childNodes,function(i){e.autoPlace&&i===e.__save_row||(n+=te.getHeight(i))}),window.innerHeight-t-Zm<n?(te.addClass(e.domElement,rn.CLASS_TOO_TALL),e.__ul.style.height=window.innerHeight-t-Zm+"px"):(te.removeClass(e.domElement,rn.CLASS_TOO_TALL),e.__ul.style.height="auto")}e.__resize_handle&&fe.defer(function(){e.__resize_handle.style.height=e.__ul.offsetHeight+"px"}),e.__closeButton&&(e.__closeButton.style.width=e.width+"px")},onResizeDebounced:fe.debounce(function(){this.onResize()},50),remember:function(){if(fe.isUndefined(cl)&&(cl=new NT,cl.domElement.innerHTML=LT),this.parent)throw new Error("You can only call remember on a top level GUI.");var e=this;fe.each(Array.prototype.slice.call(arguments),function(t){e.__rememberedObjects.length===0&&kT(e),e.__rememberedObjects.indexOf(t)===-1&&e.__rememberedObjects.push(t)}),this.autoPlace&&Wf(this,this.width)},getRoot:function(){for(var e=this;e.parent;)e=e.parent;return e},getSaveObject:function(){var e=this.load;return e.closed=this.closed,this.__rememberedObjects.length>0&&(e.preset=this.preset,e.remembered||(e.remembered={}),e.remembered[this.preset]=wc(this)),e.folders={},fe.each(this.__folders,function(t,n){e.folders[n]=t.getSaveObject()}),e},save:function(){this.load.remembered||(this.load.remembered={}),this.load.remembered[this.preset]=wc(this),Hf(this,!1),this.saveToLocalStorageIfPossible()},saveAs:function(e){this.load.remembered||(this.load.remembered={},this.load.remembered[Il]=wc(this,!0)),this.load.remembered[e]=wc(this),this.preset=e,Gf(this,e,!0),this.saveToLocalStorageIfPossible()},revert:function(e){fe.each(this.__controllers,function(t){this.getRoot().load.remembered?Qg(e||this.getRoot(),t):t.setValue(t.initialValue),t.__onFinishChange&&t.__onFinishChange.call(t,t.getValue())},this),fe.each(this.__folders,function(t){t.revert(t)}),e||Hf(this.getRoot(),!1)},listen:function(e){var t=this.__listening.length===0;this.__listening.push(e),t&&e_(this.__listening)},updateDisplay:function(){fe.each(this.__controllers,function(e){e.updateDisplay()}),fe.each(this.__folders,function(e){e.updateDisplay()})}});function jh(r,e,t){var n=document.createElement("li");return e&&n.appendChild(e),t?r.__ul.insertBefore(n,t):r.__ul.appendChild(n),r.onResize(),n}function Qm(r){te.unbind(window,"resize",r.__resizeHandler),r.saveToLocalStorageIfPossible&&te.unbind(window,"unload",r.saveToLocalStorageIfPossible)}function Hf(r,e){var t=r.__preset_select[r.__preset_select.selectedIndex];e?t.innerHTML=t.value+"*":t.innerHTML=t.value}function UT(r,e,t){if(t.__li=e,t.__gui=r,fe.extend(t,{options:function(o){if(arguments.length>1){var a=t.__li.nextElementSibling;return t.remove(),ul(r,t.object,t.property,{before:a,factoryArgs:[fe.toArray(arguments)]})}if(fe.isArray(o)||fe.isObject(o)){var l=t.__li.nextElementSibling;return t.remove(),ul(r,t.object,t.property,{before:l,factoryArgs:[o]})}},name:function(o){return t.__li.firstElementChild.firstElementChild.innerHTML=o,t},listen:function(){return t.__gui.listen(t),t},remove:function(){return t.__gui.remove(t),t}}),t instanceof zf){var n=new hu(t.object,t.property,{min:t.__min,max:t.__max,step:t.__step});fe.each(["updateDisplay","onChange","onFinishChange","step","min","max"],function(s){var o=t[s],a=n[s];t[s]=n[s]=function(){var l=Array.prototype.slice.call(arguments);return a.apply(n,l),o.apply(t,l)}}),te.addClass(e,"has-slider"),t.domElement.insertBefore(n.domElement,t.domElement.firstElementChild)}else if(t instanceof hu){var i=function(o){if(fe.isNumber(t.__min)&&fe.isNumber(t.__max)){var a=t.__li.firstElementChild.firstElementChild.innerHTML,l=t.__gui.__listening.indexOf(t)>-1;t.remove();var c=ul(r,t.object,t.property,{before:t.__li.nextElementSibling,factoryArgs:[t.__min,t.__max,t.__step]});return c.name(a),l&&c.listen(),c}return o};t.min=fe.compose(i,t.min),t.max=fe.compose(i,t.max)}else t instanceof $g?(te.bind(e,"click",function(){te.fakeEvent(t.__checkbox,"click")}),te.bind(t.__checkbox,"click",function(s){s.stopPropagation()})):t instanceof Zg?(te.bind(e,"click",function(){te.fakeEvent(t.__button,"click")}),te.bind(e,"mouseover",function(){te.addClass(t.__button,"hover")}),te.bind(e,"mouseout",function(){te.removeClass(t.__button,"hover")})):t instanceof Vf&&(te.addClass(e,"color"),t.updateDisplay=fe.compose(function(s){return e.style.borderLeftColor=t.__color.toString(),s},t.updateDisplay),t.updateDisplay());t.setValue=fe.compose(function(s){return r.getRoot().__preset_select&&t.isModified()&&Hf(r.getRoot(),!0),s},t.setValue)}function Qg(r,e){var t=r.getRoot(),n=t.__rememberedObjects.indexOf(e.object);if(n!==-1){var i=t.__rememberedObjectIndecesToControllers[n];if(i===void 0&&(i={},t.__rememberedObjectIndecesToControllers[n]=i),i[e.property]=e,t.load&&t.load.remembered){var s=t.load.remembered,o=void 0;if(s[r.preset])o=s[r.preset];else if(s[Il])o=s[Il];else return;if(o[n]&&o[n][e.property]!==void 0){var a=o[n][e.property];e.initialValue=a,e.setValue(a)}}}}function ul(r,e,t,n){if(e[t]===void 0)throw new Error('Object "'+e+'" has no property "'+t+'"');var i=void 0;if(n.color)i=new Vf(e,t);else{var s=[e,t].concat(n.factoryArgs);i=DT.apply(r,s)}n.before instanceof _o&&(n.before=n.before.__li),Qg(r,i),te.addClass(i.domElement,"c");var o=document.createElement("span");te.addClass(o,"property-name"),o.innerHTML=i.property;var a=document.createElement("div");a.appendChild(o),a.appendChild(i.domElement);var l=jh(r,a,n.before);return te.addClass(l,rn.CLASS_CONTROLLER_ROW),i instanceof Vf?te.addClass(l,"color"):te.addClass(l,ST(i.getValue())),UT(r,l,i),r.__controllers.push(i),i}function Wo(r,e){return document.location.href+"."+e}function Gf(r,e,t){var n=document.createElement("option");n.innerHTML=e,n.value=e,r.__preset_select.appendChild(n),t&&(r.__preset_select.selectedIndex=r.__preset_select.length-1)}function e0(r,e){e.style.display=r.useLocalStorage?"block":"none"}function kT(r){var e=r.__save_row=document.createElement("li");te.addClass(r.domElement,"has-save"),r.__ul.insertBefore(e,r.__ul.firstChild),te.addClass(e,"save-row");var t=document.createElement("span");t.innerHTML="&nbsp;",te.addClass(t,"button gears");var n=document.createElement("span");n.innerHTML="Save",te.addClass(n,"button"),te.addClass(n,"save");var i=document.createElement("span");i.innerHTML="New",te.addClass(i,"button"),te.addClass(i,"save-as");var s=document.createElement("span");s.innerHTML="Revert",te.addClass(s,"button"),te.addClass(s,"revert");var o=r.__preset_select=document.createElement("select");if(r.load&&r.load.remembered?fe.each(r.load.remembered,function(d,f){Gf(r,f,f===r.preset)}):Gf(r,Il,!1),te.bind(o,"change",function(){for(var d=0;d<r.__preset_select.length;d++)r.__preset_select[d].innerHTML=r.__preset_select[d].value;r.preset=this.value}),e.appendChild(o),e.appendChild(t),e.appendChild(n),e.appendChild(i),e.appendChild(s),$a){var a=document.getElementById("dg-local-explain"),l=document.getElementById("dg-local-storage"),c=document.getElementById("dg-save-locally");c.style.display="block",localStorage.getItem(Wo(r,"isLocal"))==="true"&&l.setAttribute("checked","checked"),e0(r,a),te.bind(l,"change",function(){r.useLocalStorage=!r.useLocalStorage,e0(r,a)})}var u=document.getElementById("dg-new-constructor");te.bind(u,"keydown",function(d){d.metaKey&&(d.which===67||d.keyCode===67)&&cl.hide()}),te.bind(t,"click",function(){u.innerHTML=JSON.stringify(r.getSaveObject(),void 0,2),cl.show(),u.focus(),u.select()}),te.bind(n,"click",function(){r.save()}),te.bind(i,"click",function(){var d=prompt("Enter a new preset name.");d&&r.saveAs(d)}),te.bind(s,"click",function(){r.revert()})}function BT(r){var e=void 0;r.__resize_handle=document.createElement("div"),fe.extend(r.__resize_handle.style,{width:"6px",marginLeft:"-3px",height:"200px",cursor:"ew-resize",position:"absolute"});function t(s){return s.preventDefault(),r.width+=e-s.clientX,r.onResize(),e=s.clientX,!1}function n(){te.removeClass(r.__closeButton,rn.CLASS_DRAG),te.unbind(window,"mousemove",t),te.unbind(window,"mouseup",n)}function i(s){return s.preventDefault(),e=s.clientX,te.addClass(r.__closeButton,rn.CLASS_DRAG),te.bind(window,"mousemove",t),te.bind(window,"mouseup",n),!1}te.bind(r.__resize_handle,"mousedown",i),te.bind(r.__closeButton,"mousedown",i),r.domElement.insertBefore(r.__resize_handle,r.domElement.firstElementChild)}function Wf(r,e){r.domElement.style.width=e+"px",r.__save_row&&r.autoPlace&&(r.__save_row.style.width=e+"px"),r.__closeButton&&(r.__closeButton.style.width=e+"px")}function wc(r,e){var t={};return fe.each(r.__rememberedObjects,function(n,i){var s={},o=r.__rememberedObjectIndecesToControllers[i];fe.each(o,function(a,l){s[l]=e?a.initialValue:a.getValue()}),t[i]=s}),t}function zT(r){for(var e=0;e<r.__preset_select.length;e++)r.__preset_select[e].value===r.preset&&(r.__preset_select.selectedIndex=e)}function e_(r){r.length!==0&&OT.call(window,function(){e_(r)}),fe.each(r,function(e){e.updateDisplay()})}var VT=rn;function t0(r,e){if(e===Wv)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),r;if(e===If||e===Sg){let t=r.getIndex();if(t===null){const o=[],a=r.getAttribute("position");if(a!==void 0){for(let l=0;l<a.count;l++)o.push(l);r.setIndex(o),t=r.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),r}const n=t.count-2,i=[];if(e===If)for(let o=1;o<=n;o++)i.push(t.getX(0)),i.push(t.getX(o)),i.push(t.getX(o+1));else for(let o=0;o<n;o++)o%2===0?(i.push(t.getX(o)),i.push(t.getX(o+1)),i.push(t.getX(o+2))):(i.push(t.getX(o+2)),i.push(t.getX(o+1)),i.push(t.getX(o)));i.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");const s=r.clone();return s.setIndex(i),s.clearGroups(),s}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),r}class HT extends go{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new YT(t)}),this.register(function(t){return new jT(t)}),this.register(function(t){return new iE(t)}),this.register(function(t){return new rE(t)}),this.register(function(t){return new sE(t)}),this.register(function(t){return new KT(t)}),this.register(function(t){return new ZT(t)}),this.register(function(t){return new JT(t)}),this.register(function(t){return new QT(t)}),this.register(function(t){return new qT(t)}),this.register(function(t){return new eE(t)}),this.register(function(t){return new $T(t)}),this.register(function(t){return new nE(t)}),this.register(function(t){return new tE(t)}),this.register(function(t){return new WT(t)}),this.register(function(t){return new oE(t)}),this.register(function(t){return new aE(t)})}load(e,t,n,i){const s=this;let o;if(this.resourcePath!=="")o=this.resourcePath;else if(this.path!==""){const c=ll.extractUrlBase(e);o=ll.resolveURL(c,this.path)}else o=ll.extractUrlBase(e);this.manager.itemStart(e);const a=function(c){i?i(c):console.error(c),s.manager.itemError(e),s.manager.itemEnd(e)},l=new du(this.manager);l.setPath(this.path),l.setResponseType("arraybuffer"),l.setRequestHeader(this.requestHeader),l.setWithCredentials(this.withCredentials),l.load(e,function(c){try{s.parse(c,o,function(u){t(u),s.manager.itemEnd(e)},a)}catch(u){a(u)}},n,a)}setDRACOLoader(e){return this.dracoLoader=e,this}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,i){let s;const o={},a={},l=new TextDecoder;if(typeof e=="string")s=JSON.parse(e);else if(e instanceof ArrayBuffer)if(l.decode(new Uint8Array(e,0,4))===t_){try{o[Ct.KHR_BINARY_GLTF]=new lE(e)}catch(d){i&&i(d);return}s=JSON.parse(o[Ct.KHR_BINARY_GLTF].content)}else s=JSON.parse(l.decode(e));else s=e;if(s.asset===void 0||s.asset.version[0]<2){i&&i(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}const c=new bE(s,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});c.fileLoader.setRequestHeader(this.requestHeader);for(let u=0;u<this.pluginCallbacks.length;u++){const d=this.pluginCallbacks[u](c);d.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),a[d.name]=d,o[d.name]=!0}if(s.extensionsUsed)for(let u=0;u<s.extensionsUsed.length;++u){const d=s.extensionsUsed[u],f=s.extensionsRequired||[];switch(d){case Ct.KHR_MATERIALS_UNLIT:o[d]=new XT;break;case Ct.KHR_DRACO_MESH_COMPRESSION:o[d]=new cE(s,this.dracoLoader);break;case Ct.KHR_TEXTURE_TRANSFORM:o[d]=new uE;break;case Ct.KHR_MESH_QUANTIZATION:o[d]=new dE;break;default:f.indexOf(d)>=0&&a[d]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+d+'".')}}c.setExtensions(o),c.setPlugins(a),c.parse(n,i)}parseAsync(e,t){const n=this;return new Promise(function(i,s){n.parse(e,t,i,s)})}}function GT(){let r={};return{get:function(e){return r[e]},add:function(e,t){r[e]=t},remove:function(e){delete r[e]},removeAll:function(){r={}}}}const Ct={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"};class WT{constructor(e){this.parser=e,this.name=Ct.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){const e=this.parser,t=this.parser.json.nodes||[];for(let n=0,i=t.length;n<i;n++){const s=t[n];s.extensions&&s.extensions[this.name]&&s.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,s.extensions[this.name].light)}}_loadLight(e){const t=this.parser,n="light:"+e;let i=t.cache.get(n);if(i)return i;const s=t.json,l=((s.extensions&&s.extensions[this.name]||{}).lights||[])[e];let c;const u=new Qe(16777215);l.color!==void 0&&u.setRGB(l.color[0],l.color[1],l.color[2],Yn);const d=l.range!==void 0?l.range:0;switch(l.type){case"directional":c=new Hg(u),c.target.position.set(0,0,-1),c.add(c.target);break;case"point":c=new vb(u),c.distance=d;break;case"spot":c=new _b(u),c.distance=d,l.spot=l.spot||{},l.spot.innerConeAngle=l.spot.innerConeAngle!==void 0?l.spot.innerConeAngle:0,l.spot.outerConeAngle=l.spot.outerConeAngle!==void 0?l.spot.outerConeAngle:Math.PI/4,c.angle=l.spot.outerConeAngle,c.penumbra=1-l.spot.innerConeAngle/l.spot.outerConeAngle,c.target.position.set(0,0,-1),c.add(c.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+l.type)}return c.position.set(0,0,0),sr(c,l),l.intensity!==void 0&&(c.intensity=l.intensity),c.name=t.createUniqueName(l.name||"light_"+e),i=Promise.resolve(c),t.cache.add(n,i),i}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){const t=this,n=this.parser,s=n.json.nodes[e],a=(s.extensions&&s.extensions[this.name]||{}).light;return a===void 0?null:this._loadLight(a).then(function(l){return n._getNodeRef(t.cache,a,l)})}}class XT{constructor(){this.name=Ct.KHR_MATERIALS_UNLIT}getMaterialType(){return js}extendParams(e,t,n){const i=[];e.color=new Qe(1,1,1),e.opacity=1;const s=t.pbrMetallicRoughness;if(s){if(Array.isArray(s.baseColorFactor)){const o=s.baseColorFactor;e.color.setRGB(o[0],o[1],o[2],Yn),e.opacity=o[3]}s.baseColorTexture!==void 0&&i.push(n.assignTexture(e,"map",s.baseColorTexture,Sn))}return Promise.all(i)}}class qT{constructor(e){this.parser=e,this.name=Ct.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){const i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=i.extensions[this.name].emissiveStrength;return s!==void 0&&(t.emissiveIntensity=s),Promise.resolve()}}class YT{constructor(e){this.parser=e,this.name=Ct.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:wr}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];if(o.clearcoatFactor!==void 0&&(t.clearcoat=o.clearcoatFactor),o.clearcoatTexture!==void 0&&s.push(n.assignTexture(t,"clearcoatMap",o.clearcoatTexture)),o.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=o.clearcoatRoughnessFactor),o.clearcoatRoughnessTexture!==void 0&&s.push(n.assignTexture(t,"clearcoatRoughnessMap",o.clearcoatRoughnessTexture)),o.clearcoatNormalTexture!==void 0&&(s.push(n.assignTexture(t,"clearcoatNormalMap",o.clearcoatNormalTexture)),o.clearcoatNormalTexture.scale!==void 0)){const a=o.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new Rt(a,a)}return Promise.all(s)}}class jT{constructor(e){this.parser=e,this.name=Ct.KHR_MATERIALS_DISPERSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:wr}extendMaterialParams(e,t){const i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=i.extensions[this.name];return t.dispersion=s.dispersion!==void 0?s.dispersion:0,Promise.resolve()}}class $T{constructor(e){this.parser=e,this.name=Ct.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:wr}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];return o.iridescenceFactor!==void 0&&(t.iridescence=o.iridescenceFactor),o.iridescenceTexture!==void 0&&s.push(n.assignTexture(t,"iridescenceMap",o.iridescenceTexture)),o.iridescenceIor!==void 0&&(t.iridescenceIOR=o.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),o.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=o.iridescenceThicknessMinimum),o.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=o.iridescenceThicknessMaximum),o.iridescenceThicknessTexture!==void 0&&s.push(n.assignTexture(t,"iridescenceThicknessMap",o.iridescenceThicknessTexture)),Promise.all(s)}}class KT{constructor(e){this.parser=e,this.name=Ct.KHR_MATERIALS_SHEEN}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:wr}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[];t.sheenColor=new Qe(0,0,0),t.sheenRoughness=0,t.sheen=1;const o=i.extensions[this.name];if(o.sheenColorFactor!==void 0){const a=o.sheenColorFactor;t.sheenColor.setRGB(a[0],a[1],a[2],Yn)}return o.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=o.sheenRoughnessFactor),o.sheenColorTexture!==void 0&&s.push(n.assignTexture(t,"sheenColorMap",o.sheenColorTexture,Sn)),o.sheenRoughnessTexture!==void 0&&s.push(n.assignTexture(t,"sheenRoughnessMap",o.sheenRoughnessTexture)),Promise.all(s)}}class ZT{constructor(e){this.parser=e,this.name=Ct.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:wr}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];return o.transmissionFactor!==void 0&&(t.transmission=o.transmissionFactor),o.transmissionTexture!==void 0&&s.push(n.assignTexture(t,"transmissionMap",o.transmissionTexture)),Promise.all(s)}}class JT{constructor(e){this.parser=e,this.name=Ct.KHR_MATERIALS_VOLUME}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:wr}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];t.thickness=o.thicknessFactor!==void 0?o.thicknessFactor:0,o.thicknessTexture!==void 0&&s.push(n.assignTexture(t,"thicknessMap",o.thicknessTexture)),t.attenuationDistance=o.attenuationDistance||1/0;const a=o.attenuationColor||[1,1,1];return t.attenuationColor=new Qe().setRGB(a[0],a[1],a[2],Yn),Promise.all(s)}}class QT{constructor(e){this.parser=e,this.name=Ct.KHR_MATERIALS_IOR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:wr}extendMaterialParams(e,t){const i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=i.extensions[this.name];return t.ior=s.ior!==void 0?s.ior:1.5,Promise.resolve()}}class eE{constructor(e){this.parser=e,this.name=Ct.KHR_MATERIALS_SPECULAR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:wr}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];t.specularIntensity=o.specularFactor!==void 0?o.specularFactor:1,o.specularTexture!==void 0&&s.push(n.assignTexture(t,"specularIntensityMap",o.specularTexture));const a=o.specularColorFactor||[1,1,1];return t.specularColor=new Qe().setRGB(a[0],a[1],a[2],Yn),o.specularColorTexture!==void 0&&s.push(n.assignTexture(t,"specularColorMap",o.specularColorTexture,Sn)),Promise.all(s)}}class tE{constructor(e){this.parser=e,this.name=Ct.EXT_MATERIALS_BUMP}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:wr}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];return t.bumpScale=o.bumpFactor!==void 0?o.bumpFactor:1,o.bumpTexture!==void 0&&s.push(n.assignTexture(t,"bumpMap",o.bumpTexture)),Promise.all(s)}}class nE{constructor(e){this.parser=e,this.name=Ct.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:wr}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];return o.anisotropyStrength!==void 0&&(t.anisotropy=o.anisotropyStrength),o.anisotropyRotation!==void 0&&(t.anisotropyRotation=o.anisotropyRotation),o.anisotropyTexture!==void 0&&s.push(n.assignTexture(t,"anisotropyMap",o.anisotropyTexture)),Promise.all(s)}}class iE{constructor(e){this.parser=e,this.name=Ct.KHR_TEXTURE_BASISU}loadTexture(e){const t=this.parser,n=t.json,i=n.textures[e];if(!i.extensions||!i.extensions[this.name])return null;const s=i.extensions[this.name],o=t.options.ktx2Loader;if(!o){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,s.source,o)}}class rE{constructor(e){this.parser=e,this.name=Ct.EXT_TEXTURE_WEBP}loadTexture(e){const t=this.name,n=this.parser,i=n.json,s=i.textures[e];if(!s.extensions||!s.extensions[t])return null;const o=s.extensions[t],a=i.images[o.source];let l=n.textureLoader;if(a.uri){const c=n.options.manager.getHandler(a.uri);c!==null&&(l=c)}return n.loadTextureImage(e,o.source,l)}}class sE{constructor(e){this.parser=e,this.name=Ct.EXT_TEXTURE_AVIF}loadTexture(e){const t=this.name,n=this.parser,i=n.json,s=i.textures[e];if(!s.extensions||!s.extensions[t])return null;const o=s.extensions[t],a=i.images[o.source];let l=n.textureLoader;if(a.uri){const c=n.options.manager.getHandler(a.uri);c!==null&&(l=c)}return n.loadTextureImage(e,o.source,l)}}class oE{constructor(e){this.name=Ct.EXT_MESHOPT_COMPRESSION,this.parser=e}loadBufferView(e){const t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){const i=n.extensions[this.name],s=this.parser.getDependency("buffer",i.buffer),o=this.parser.options.meshoptDecoder;if(!o||!o.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return s.then(function(a){const l=i.byteOffset||0,c=i.byteLength||0,u=i.count,d=i.byteStride,f=new Uint8Array(a,l,c);return o.decodeGltfBufferAsync?o.decodeGltfBufferAsync(u,d,f,i.mode,i.filter).then(function(h){return h.buffer}):o.ready.then(function(){const h=new ArrayBuffer(u*d);return o.decodeGltfBuffer(new Uint8Array(h),u,d,f,i.mode,i.filter),h})})}else return null}}class aE{constructor(e){this.name=Ct.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){const t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;const i=t.meshes[n.mesh];for(const c of i.primitives)if(c.mode!==Di.TRIANGLES&&c.mode!==Di.TRIANGLE_STRIP&&c.mode!==Di.TRIANGLE_FAN&&c.mode!==void 0)return null;const o=n.extensions[this.name].attributes,a=[],l={};for(const c in o)a.push(this.parser.getDependency("accessor",o[c]).then(u=>(l[c]=u,l[c])));return a.length<1?null:(a.push(this.parser.createNodeMesh(e)),Promise.all(a).then(c=>{const u=c.pop(),d=u.isGroup?u.children:[u],f=c[0].count,h=[];for(const _ of d){const g=new yt,m=new q,p=new As,y=new q(1,1,1),v=new jy(_.geometry,_.material,f);for(let x=0;x<f;x++)l.TRANSLATION&&m.fromBufferAttribute(l.TRANSLATION,x),l.ROTATION&&p.fromBufferAttribute(l.ROTATION,x),l.SCALE&&y.fromBufferAttribute(l.SCALE,x),v.setMatrixAt(x,g.compose(m,p,y));for(const x in l)if(x==="_COLOR_0"){const E=l[x];v.instanceColor=new Nf(E.array,E.itemSize,E.normalized)}else x!=="TRANSLATION"&&x!=="ROTATION"&&x!=="SCALE"&&_.geometry.setAttribute(x,l[x]);un.prototype.copy.call(v,_),this.parser.assignFinalMaterial(v),h.push(v)}return u.isGroup?(u.clear(),u.add(...h),u):h[0]}))}}const t_="glTF",Ha=12,n0={JSON:1313821514,BIN:5130562};class lE{constructor(e){this.name=Ct.KHR_BINARY_GLTF,this.content=null,this.body=null;const t=new DataView(e,0,Ha),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==t_)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");const i=this.header.length-Ha,s=new DataView(e,Ha);let o=0;for(;o<i;){const a=s.getUint32(o,!0);o+=4;const l=s.getUint32(o,!0);if(o+=4,l===n0.JSON){const c=new Uint8Array(e,Ha+o,a);this.content=n.decode(c)}else if(l===n0.BIN){const c=Ha+o;this.body=e.slice(c,c+a)}o+=a}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}}class cE{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=Ct.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){const n=this.json,i=this.dracoLoader,s=e.extensions[this.name].bufferView,o=e.extensions[this.name].attributes,a={},l={},c={};for(const u in o){const d=Xf[u]||u.toLowerCase();a[d]=o[u]}for(const u in e.attributes){const d=Xf[u]||u.toLowerCase();if(o[u]!==void 0){const f=n.accessors[e.attributes[u]],h=Qo[f.componentType];c[d]=h.name,l[d]=f.normalized===!0}}return t.getDependency("bufferView",s).then(function(u){return new Promise(function(d,f){i.decodeDracoFile(u,function(h){for(const _ in h.attributes){const g=h.attributes[_],m=l[_];m!==void 0&&(g.normalized=m)}d(h)},a,c,Yn,f)})})}}class uE{constructor(){this.name=Ct.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}}class dE{constructor(){this.name=Ct.KHR_MESH_QUANTIZATION}}class n_ extends ql{constructor(e,t,n,i){super(e,t,n,i)}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,s=e*i*3+i;for(let o=0;o!==i;o++)t[o]=n[s+o];return t}interpolate_(e,t,n,i){const s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=a*2,c=a*3,u=i-t,d=(n-t)/u,f=d*d,h=f*d,_=e*c,g=_-c,m=-2*h+3*f,p=h-f,y=1-m,v=p-f+d;for(let x=0;x!==a;x++){const E=o[g+x+a],b=o[g+x+l]*u,S=o[_+x+a],P=o[_+x]*u;s[x]=y*E+v*b+m*S+p*P}return s}}const fE=new As;class hE extends n_{interpolate_(e,t,n,i){const s=super.interpolate_(e,t,n,i);return fE.fromArray(s).normalize().toArray(s),s}}const Di={POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6},Qo={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},i0={9728:si,9729:ri,9984:mg,9985:Vc,9986:Ya,9987:Ur},r0={33071:dr,33648:su,10497:fa},Md={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},Xf={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},ss={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},pE={CUBICSPLINE:void 0,LINEAR:Pl,STEP:Rl},Td={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function mE(r){return r.DefaultMaterial===void 0&&(r.DefaultMaterial=new Hh({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:qr})),r.DefaultMaterial}function Us(r,e,t){for(const n in t.extensions)r[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function sr(r,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(r.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function gE(r,e,t){let n=!1,i=!1,s=!1;for(let c=0,u=e.length;c<u;c++){const d=e[c];if(d.POSITION!==void 0&&(n=!0),d.NORMAL!==void 0&&(i=!0),d.COLOR_0!==void 0&&(s=!0),n&&i&&s)break}if(!n&&!i&&!s)return Promise.resolve(r);const o=[],a=[],l=[];for(let c=0,u=e.length;c<u;c++){const d=e[c];if(n){const f=d.POSITION!==void 0?t.getDependency("accessor",d.POSITION):r.attributes.position;o.push(f)}if(i){const f=d.NORMAL!==void 0?t.getDependency("accessor",d.NORMAL):r.attributes.normal;a.push(f)}if(s){const f=d.COLOR_0!==void 0?t.getDependency("accessor",d.COLOR_0):r.attributes.color;l.push(f)}}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(l)]).then(function(c){const u=c[0],d=c[1],f=c[2];return n&&(r.morphAttributes.position=u),i&&(r.morphAttributes.normal=d),s&&(r.morphAttributes.color=f),r.morphTargetsRelative=!0,r})}function _E(r,e){if(r.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)r.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){const t=e.extras.targetNames;if(r.morphTargetInfluences.length===t.length){r.morphTargetDictionary={};for(let n=0,i=t.length;n<i;n++)r.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function xE(r){let e;const t=r.extensions&&r.extensions[Ct.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+Ed(t.attributes):e=r.indices+":"+Ed(r.attributes)+":"+r.mode,r.targets!==void 0)for(let n=0,i=r.targets.length;n<i;n++)e+=":"+Ed(r.targets[n]);return e}function Ed(r){let e="";const t=Object.keys(r).sort();for(let n=0,i=t.length;n<i;n++)e+=t[n]+":"+r[t[n]]+";";return e}function qf(r){switch(r){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function vE(r){return r.search(/\.jpe?g($|\?)/i)>0||r.search(/^data\:image\/jpeg/)===0?"image/jpeg":r.search(/\.webp($|\?)/i)>0||r.search(/^data\:image\/webp/)===0?"image/webp":r.search(/\.ktx2($|\?)/i)>0||r.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}const yE=new yt;class bE{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new GT,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,i=-1,s=!1,o=-1;if(typeof navigator<"u"){const a=navigator.userAgent;n=/^((?!chrome|android).)*safari/i.test(a)===!0;const l=a.match(/Version\/(\d+)/);i=n&&l?parseInt(l[1],10):-1,s=a.indexOf("Firefox")>-1,o=s?a.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||n&&i<17||s&&o<98?this.textureLoader=new mb(this.options.manager):this.textureLoader=new Sb(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new du(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){const n=this,i=this.json,s=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(o){return o._markDefs&&o._markDefs()}),Promise.all(this._invokeAll(function(o){return o.beforeRoot&&o.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(o){const a={scene:o[0][i.scene||0],scenes:o[0],animations:o[1],cameras:o[2],asset:i.asset,parser:n,userData:{}};return Us(s,a,i),sr(a,i),Promise.all(n._invokeAll(function(l){return l.afterRoot&&l.afterRoot(a)})).then(function(){for(const l of a.scenes)l.updateMatrixWorld();e(a)})}).catch(t)}_markDefs(){const e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let i=0,s=t.length;i<s;i++){const o=t[i].joints;for(let a=0,l=o.length;a<l;a++)e[o[a]].isBone=!0}for(let i=0,s=e.length;i<s;i++){const o=e[i];o.mesh!==void 0&&(this._addNodeRef(this.meshCache,o.mesh),o.skin!==void 0&&(n[o.mesh].isSkinnedMesh=!0)),o.camera!==void 0&&this._addNodeRef(this.cameraCache,o.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;const i=n.clone(),s=(o,a)=>{const l=this.associations.get(o);l!=null&&this.associations.set(a,l);for(const[c,u]of o.children.entries())s(u,a.children[c])};return s(n,i),i.name+="_instance_"+e.uses[t]++,i}_invokeOne(e){const t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){const i=e(t[n]);if(i)return i}return null}_invokeAll(e){const t=Object.values(this.plugins);t.unshift(this);const n=[];for(let i=0;i<t.length;i++){const s=e(t[i]);s&&n.push(s)}return n}getDependency(e,t){const n=e+":"+t;let i=this.cache.get(n);if(!i){switch(e){case"scene":i=this.loadScene(t);break;case"node":i=this._invokeOne(function(s){return s.loadNode&&s.loadNode(t)});break;case"mesh":i=this._invokeOne(function(s){return s.loadMesh&&s.loadMesh(t)});break;case"accessor":i=this.loadAccessor(t);break;case"bufferView":i=this._invokeOne(function(s){return s.loadBufferView&&s.loadBufferView(t)});break;case"buffer":i=this.loadBuffer(t);break;case"material":i=this._invokeOne(function(s){return s.loadMaterial&&s.loadMaterial(t)});break;case"texture":i=this._invokeOne(function(s){return s.loadTexture&&s.loadTexture(t)});break;case"skin":i=this.loadSkin(t);break;case"animation":i=this._invokeOne(function(s){return s.loadAnimation&&s.loadAnimation(t)});break;case"camera":i=this.loadCamera(t);break;default:if(i=this._invokeOne(function(s){return s!=this&&s.getDependency&&s.getDependency(e,t)}),!i)throw new Error("Unknown type: "+e);break}this.cache.add(n,i)}return i}getDependencies(e){let t=this.cache.get(e);if(!t){const n=this,i=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(i.map(function(s,o){return n.getDependency(e,o)})),this.cache.add(e,t)}return t}loadBuffer(e){const t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[Ct.KHR_BINARY_GLTF].body);const i=this.options;return new Promise(function(s,o){n.load(ll.resolveURL(t.uri,i.path),s,void 0,function(){o(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){const t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){const i=t.byteLength||0,s=t.byteOffset||0;return n.slice(s,s+i)})}loadAccessor(e){const t=this,n=this.json,i=this.json.accessors[e];if(i.bufferView===void 0&&i.sparse===void 0){const o=Md[i.type],a=Qo[i.componentType],l=i.normalized===!0,c=new a(i.count*o);return Promise.resolve(new Gt(c,o,l))}const s=[];return i.bufferView!==void 0?s.push(this.getDependency("bufferView",i.bufferView)):s.push(null),i.sparse!==void 0&&(s.push(this.getDependency("bufferView",i.sparse.indices.bufferView)),s.push(this.getDependency("bufferView",i.sparse.values.bufferView))),Promise.all(s).then(function(o){const a=o[0],l=Md[i.type],c=Qo[i.componentType],u=c.BYTES_PER_ELEMENT,d=u*l,f=i.byteOffset||0,h=i.bufferView!==void 0?n.bufferViews[i.bufferView].byteStride:void 0,_=i.normalized===!0;let g,m;if(h&&h!==d){const p=Math.floor(f/h),y="InterleavedBuffer:"+i.bufferView+":"+i.componentType+":"+p+":"+i.count;let v=t.cache.get(y);v||(g=new c(a,p*h,i.count*h/u),v=new Og(g,h/u),t.cache.add(y,v)),m=new Pu(v,l,f%h/u,_)}else a===null?g=new c(i.count*l):g=new c(a,f,i.count*l),m=new Gt(g,l,_);if(i.sparse!==void 0){const p=Md.SCALAR,y=Qo[i.sparse.indices.componentType],v=i.sparse.indices.byteOffset||0,x=i.sparse.values.byteOffset||0,E=new y(o[1],v,i.sparse.count*p),b=new c(o[2],x,i.sparse.count*l);a!==null&&(m=new Gt(m.array.slice(),m.itemSize,m.normalized)),m.normalized=!1;for(let S=0,P=E.length;S<P;S++){const w=E[S];if(m.setX(w,b[S*l]),l>=2&&m.setY(w,b[S*l+1]),l>=3&&m.setZ(w,b[S*l+2]),l>=4&&m.setW(w,b[S*l+3]),l>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}m.normalized=_}return m})}loadTexture(e){const t=this.json,n=this.options,s=t.textures[e].source,o=t.images[s];let a=this.textureLoader;if(o.uri){const l=n.manager.getHandler(o.uri);l!==null&&(a=l)}return this.loadTextureImage(e,s,a)}loadTextureImage(e,t,n){const i=this,s=this.json,o=s.textures[e],a=s.images[t],l=(a.uri||a.bufferView)+":"+o.sampler;if(this.textureCache[l])return this.textureCache[l];const c=this.loadImageSource(t,n).then(function(u){u.flipY=!1,u.name=o.name||a.name||"",u.name===""&&typeof a.uri=="string"&&a.uri.startsWith("data:image/")===!1&&(u.name=a.uri);const f=(s.samplers||{})[o.sampler]||{};return u.magFilter=i0[f.magFilter]||ri,u.minFilter=i0[f.minFilter]||Ur,u.wrapS=r0[f.wrapS]||fa,u.wrapT=r0[f.wrapT]||fa,u.generateMipmaps=!u.isCompressedTexture&&u.minFilter!==si&&u.minFilter!==ri,i.associations.set(u,{textures:e}),u}).catch(function(){return null});return this.textureCache[l]=c,c}loadImageSource(e,t){const n=this,i=this.json,s=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(d=>d.clone());const o=i.images[e],a=self.URL||self.webkitURL;let l=o.uri||"",c=!1;if(o.bufferView!==void 0)l=n.getDependency("bufferView",o.bufferView).then(function(d){c=!0;const f=new Blob([d],{type:o.mimeType});return l=a.createObjectURL(f),l});else if(o.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");const u=Promise.resolve(l).then(function(d){return new Promise(function(f,h){let _=f;t.isImageBitmapLoader===!0&&(_=function(g){const m=new An(g);m.needsUpdate=!0,f(m)}),t.load(ll.resolveURL(d,s.path),_,void 0,h)})}).then(function(d){return c===!0&&a.revokeObjectURL(l),sr(d,o),d.userData.mimeType=o.mimeType||vE(o.uri),d}).catch(function(d){throw console.error("THREE.GLTFLoader: Couldn't load texture",l),d});return this.sourceCache[e]=u,u}assignTexture(e,t,n,i){const s=this;return this.getDependency("texture",n.index).then(function(o){if(!o)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(o=o.clone(),o.channel=n.texCoord),s.extensions[Ct.KHR_TEXTURE_TRANSFORM]){const a=n.extensions!==void 0?n.extensions[Ct.KHR_TEXTURE_TRANSFORM]:void 0;if(a){const l=s.associations.get(o);o=s.extensions[Ct.KHR_TEXTURE_TRANSFORM].extendTexture(o,a),s.associations.set(o,l)}}return i!==void 0&&(o.colorSpace=i),e[t]=o,o})}assignFinalMaterial(e){const t=e.geometry;let n=e.material;const i=t.attributes.tangent===void 0,s=t.attributes.color!==void 0,o=t.attributes.normal===void 0;if(e.isPoints){const a="PointsMaterial:"+n.uuid;let l=this.cache.get(a);l||(l=new Ug,gr.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,l.sizeAttenuation=!1,this.cache.add(a,l)),n=l}else if(e.isLine){const a="LineBasicMaterial:"+n.uuid;let l=this.cache.get(a);l||(l=new Fg,gr.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,this.cache.add(a,l)),n=l}if(i||s||o){let a="ClonedMaterial:"+n.uuid+":";i&&(a+="derivative-tangents:"),s&&(a+="vertex-colors:"),o&&(a+="flat-shading:");let l=this.cache.get(a);l||(l=n.clone(),s&&(l.vertexColors=!0),o&&(l.flatShading=!0),i&&(l.normalScale&&(l.normalScale.y*=-1),l.clearcoatNormalScale&&(l.clearcoatNormalScale.y*=-1)),this.cache.add(a,l),this.associations.set(l,this.associations.get(n))),n=l}e.material=n}getMaterialType(){return Hh}loadMaterial(e){const t=this,n=this.json,i=this.extensions,s=n.materials[e];let o;const a={},l=s.extensions||{},c=[];if(l[Ct.KHR_MATERIALS_UNLIT]){const d=i[Ct.KHR_MATERIALS_UNLIT];o=d.getMaterialType(),c.push(d.extendParams(a,s,t))}else{const d=s.pbrMetallicRoughness||{};if(a.color=new Qe(1,1,1),a.opacity=1,Array.isArray(d.baseColorFactor)){const f=d.baseColorFactor;a.color.setRGB(f[0],f[1],f[2],Yn),a.opacity=f[3]}d.baseColorTexture!==void 0&&c.push(t.assignTexture(a,"map",d.baseColorTexture,Sn)),a.metalness=d.metallicFactor!==void 0?d.metallicFactor:1,a.roughness=d.roughnessFactor!==void 0?d.roughnessFactor:1,d.metallicRoughnessTexture!==void 0&&(c.push(t.assignTexture(a,"metalnessMap",d.metallicRoughnessTexture)),c.push(t.assignTexture(a,"roughnessMap",d.metallicRoughnessTexture))),o=this._invokeOne(function(f){return f.getMaterialType&&f.getMaterialType(e)}),c.push(Promise.all(this._invokeAll(function(f){return f.extendMaterialParams&&f.extendMaterialParams(e,a)})))}s.doubleSided===!0&&(a.side=Fi);const u=s.alphaMode||Td.OPAQUE;if(u===Td.BLEND?(a.transparent=!0,a.depthWrite=!1):(a.transparent=!1,u===Td.MASK&&(a.alphaTest=s.alphaCutoff!==void 0?s.alphaCutoff:.5)),s.normalTexture!==void 0&&o!==js&&(c.push(t.assignTexture(a,"normalMap",s.normalTexture)),a.normalScale=new Rt(1,1),s.normalTexture.scale!==void 0)){const d=s.normalTexture.scale;a.normalScale.set(d,d)}if(s.occlusionTexture!==void 0&&o!==js&&(c.push(t.assignTexture(a,"aoMap",s.occlusionTexture)),s.occlusionTexture.strength!==void 0&&(a.aoMapIntensity=s.occlusionTexture.strength)),s.emissiveFactor!==void 0&&o!==js){const d=s.emissiveFactor;a.emissive=new Qe().setRGB(d[0],d[1],d[2],Yn)}return s.emissiveTexture!==void 0&&o!==js&&c.push(t.assignTexture(a,"emissiveMap",s.emissiveTexture,Sn)),Promise.all(c).then(function(){const d=new o(a);return s.name&&(d.name=s.name),sr(d,s),t.associations.set(d,{materials:e}),s.extensions&&Us(i,d,s),d})}createUniqueName(e){const t=Yt.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){const t=this,n=this.extensions,i=this.primitiveCache;function s(a){return n[Ct.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(a,t).then(function(l){return s0(l,a,t)})}const o=[];for(let a=0,l=e.length;a<l;a++){const c=e[a],u=xE(c),d=i[u];if(d)o.push(d.promise);else{let f;c.extensions&&c.extensions[Ct.KHR_DRACO_MESH_COMPRESSION]?f=s(c):f=s0(new hi,c,t),i[u]={primitive:c,promise:f},o.push(f)}}return Promise.all(o)}loadMesh(e){const t=this,n=this.json,i=this.extensions,s=n.meshes[e],o=s.primitives,a=[];for(let l=0,c=o.length;l<c;l++){const u=o[l].material===void 0?mE(this.cache):this.getDependency("material",o[l].material);a.push(u)}return a.push(t.loadGeometries(o)),Promise.all(a).then(function(l){const c=l.slice(0,l.length-1),u=l[l.length-1],d=[];for(let h=0,_=u.length;h<_;h++){const g=u[h],m=o[h];let p;const y=c[h];if(m.mode===Di.TRIANGLES||m.mode===Di.TRIANGLE_STRIP||m.mode===Di.TRIANGLE_FAN||m.mode===void 0)p=s.isSkinnedMesh===!0?new Xy(g,y):new pi(g,y),p.isSkinnedMesh===!0&&p.normalizeSkinWeights(),m.mode===Di.TRIANGLE_STRIP?p.geometry=t0(p.geometry,Sg):m.mode===Di.TRIANGLE_FAN&&(p.geometry=t0(p.geometry,If));else if(m.mode===Di.LINES)p=new Jy(g,y);else if(m.mode===Di.LINE_STRIP)p=new Vh(g,y);else if(m.mode===Di.LINE_LOOP)p=new Qy(g,y);else if(m.mode===Di.POINTS)p=new Uf(g,y);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+m.mode);Object.keys(p.geometry.morphAttributes).length>0&&_E(p,s),p.name=t.createUniqueName(s.name||"mesh_"+e),sr(p,s),m.extensions&&Us(i,p,m),t.assignFinalMaterial(p),d.push(p)}for(let h=0,_=d.length;h<_;h++)t.associations.set(d[h],{meshes:e,primitives:h});if(d.length===1)return s.extensions&&Us(i,d[0],s),d[0];const f=new kr;s.extensions&&Us(i,f,s),t.associations.set(f,{meshes:e});for(let h=0,_=d.length;h<_;h++)f.add(d[h]);return f})}loadCamera(e){let t;const n=this.json.cameras[e],i=n[n.type];if(!i){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new ai(vy.radToDeg(i.yfov),i.aspectRatio||1,i.znear||1,i.zfar||2e6):n.type==="orthographic"&&(t=new Du(-i.xmag,i.xmag,i.ymag,-i.ymag,i.znear,i.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),sr(t,n),Promise.resolve(t)}loadSkin(e){const t=this.json.skins[e],n=[];for(let i=0,s=t.joints.length;i<s;i++)n.push(this._loadNodeShallow(t.joints[i]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(i){const s=i.pop(),o=i,a=[],l=[];for(let c=0,u=o.length;c<u;c++){const d=o[c];if(d){a.push(d);const f=new yt;s!==null&&f.fromArray(s.array,c*16),l.push(f)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[c])}return new Bh(a,l)})}loadAnimation(e){const t=this.json,n=this,i=t.animations[e],s=i.name?i.name:"animation_"+e,o=[],a=[],l=[],c=[],u=[];for(let d=0,f=i.channels.length;d<f;d++){const h=i.channels[d],_=i.samplers[h.sampler],g=h.target,m=g.node,p=i.parameters!==void 0?i.parameters[_.input]:_.input,y=i.parameters!==void 0?i.parameters[_.output]:_.output;g.node!==void 0&&(o.push(this.getDependency("node",m)),a.push(this.getDependency("accessor",p)),l.push(this.getDependency("accessor",y)),c.push(_),u.push(g))}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(l),Promise.all(c),Promise.all(u)]).then(function(d){const f=d[0],h=d[1],_=d[2],g=d[3],m=d[4],p=[];for(let v=0,x=f.length;v<x;v++){const E=f[v],b=h[v],S=_[v],P=g[v],w=m[v];if(E===void 0)continue;E.updateMatrix&&E.updateMatrix();const M=n._createAnimationTracks(E,b,S,P,w);if(M)for(let L=0;L<M.length;L++)p.push(M[L])}const y=new lb(s,void 0,p);return sr(y,i),y})}createNodeMesh(e){const t=this.json,n=this,i=t.nodes[e];return i.mesh===void 0?null:n.getDependency("mesh",i.mesh).then(function(s){const o=n._getNodeRef(n.meshCache,i.mesh,s);return i.weights!==void 0&&o.traverse(function(a){if(a.isMesh)for(let l=0,c=i.weights.length;l<c;l++)a.morphTargetInfluences[l]=i.weights[l]}),o})}loadNode(e){const t=this.json,n=this,i=t.nodes[e],s=n._loadNodeShallow(e),o=[],a=i.children||[];for(let c=0,u=a.length;c<u;c++)o.push(n.getDependency("node",a[c]));const l=i.skin===void 0?Promise.resolve(null):n.getDependency("skin",i.skin);return Promise.all([s,Promise.all(o),l]).then(function(c){const u=c[0],d=c[1],f=c[2];f!==null&&u.traverse(function(h){h.isSkinnedMesh&&h.bind(f,yE)});for(let h=0,_=d.length;h<_;h++)u.add(d[h]);return u})}_loadNodeShallow(e){const t=this.json,n=this.extensions,i=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];const s=t.nodes[e],o=s.name?i.createUniqueName(s.name):"",a=[],l=i._invokeOne(function(c){return c.createNodeMesh&&c.createNodeMesh(e)});return l&&a.push(l),s.camera!==void 0&&a.push(i.getDependency("camera",s.camera).then(function(c){return i._getNodeRef(i.cameraCache,s.camera,c)})),i._invokeAll(function(c){return c.createNodeAttachment&&c.createNodeAttachment(e)}).forEach(function(c){a.push(c)}),this.nodeCache[e]=Promise.all(a).then(function(c){let u;if(s.isBone===!0?u=new Ng:c.length>1?u=new kr:c.length===1?u=c[0]:u=new un,u!==c[0])for(let d=0,f=c.length;d<f;d++)u.add(c[d]);if(s.name&&(u.userData.name=s.name,u.name=o),sr(u,s),s.extensions&&Us(n,u,s),s.matrix!==void 0){const d=new yt;d.fromArray(s.matrix),u.applyMatrix4(d)}else s.translation!==void 0&&u.position.fromArray(s.translation),s.rotation!==void 0&&u.quaternion.fromArray(s.rotation),s.scale!==void 0&&u.scale.fromArray(s.scale);if(!i.associations.has(u))i.associations.set(u,{});else if(s.mesh!==void 0&&i.meshCache.refs[s.mesh]>1){const d=i.associations.get(u);i.associations.set(u,{...d})}return i.associations.get(u).nodes=e,u}),this.nodeCache[e]}loadScene(e){const t=this.extensions,n=this.json.scenes[e],i=this,s=new kr;n.name&&(s.name=i.createUniqueName(n.name)),sr(s,n),n.extensions&&Us(t,s,n);const o=n.nodes||[],a=[];for(let l=0,c=o.length;l<c;l++)a.push(i.getDependency("node",o[l]));return Promise.all(a).then(function(l){for(let u=0,d=l.length;u<d;u++)s.add(l[u]);const c=u=>{const d=new Map;for(const[f,h]of i.associations)(f instanceof gr||f instanceof An)&&d.set(f,h);return u.traverse(f=>{const h=i.associations.get(f);h!=null&&d.set(f,h)}),d};return i.associations=c(s),s})}_createAnimationTracks(e,t,n,i,s){const o=[],a=e.name?e.name:e.uuid,l=[];ss[s.path]===ss.weights?e.traverse(function(f){f.morphTargetInfluences&&l.push(f.name?f.name:f.uuid)}):l.push(a);let c;switch(ss[s.path]){case ss.weights:c=ma;break;case ss.rotation:c=ga;break;case ss.translation:case ss.scale:c=_a;break;default:switch(n.itemSize){case 1:c=ma;break;case 2:case 3:default:c=_a;break}break}const u=i.interpolation!==void 0?pE[i.interpolation]:Pl,d=this._getArrayFromAccessor(n);for(let f=0,h=l.length;f<h;f++){const _=new c(l[f]+"."+ss[s.path],t.array,d,u);i.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(_),o.push(_)}return o}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){const n=qf(t.constructor),i=new Float32Array(t.length);for(let s=0,o=t.length;s<o;s++)i[s]=t[s]*n;t=i}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){const i=this instanceof ga?hE:n_;return new i(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}}function SE(r,e,t){const n=e.attributes,i=new Qi;if(n.POSITION!==void 0){const a=t.json.accessors[n.POSITION],l=a.min,c=a.max;if(l!==void 0&&c!==void 0){if(i.set(new q(l[0],l[1],l[2]),new q(c[0],c[1],c[2])),a.normalized){const u=qf(Qo[a.componentType]);i.min.multiplyScalar(u),i.max.multiplyScalar(u)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;const s=e.targets;if(s!==void 0){const a=new q,l=new q;for(let c=0,u=s.length;c<u;c++){const d=s[c];if(d.POSITION!==void 0){const f=t.json.accessors[d.POSITION],h=f.min,_=f.max;if(h!==void 0&&_!==void 0){if(l.setX(Math.max(Math.abs(h[0]),Math.abs(_[0]))),l.setY(Math.max(Math.abs(h[1]),Math.abs(_[1]))),l.setZ(Math.max(Math.abs(h[2]),Math.abs(_[2]))),f.normalized){const g=qf(Qo[f.componentType]);l.multiplyScalar(g)}a.max(l)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}i.expandByVector(a)}r.boundingBox=i;const o=new Sr;i.getCenter(o.center),o.radius=i.min.distanceTo(i.max)/2,r.boundingSphere=o}function s0(r,e,t){const n=e.attributes,i=[];function s(o,a){return t.getDependency("accessor",o).then(function(l){r.setAttribute(a,l)})}for(const o in n){const a=Xf[o]||o.toLowerCase();a in r.attributes||i.push(s(n[o],a))}if(e.indices!==void 0&&!r.index){const o=t.getDependency("accessor",e.indices).then(function(a){r.setIndex(a)});i.push(o)}return Dt.workingColorSpace!==Yn&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${Dt.workingColorSpace}" not supported.`),sr(r,e),SE(r,e,t),Promise.all(i).then(function(){return e.targets!==void 0?gE(r,e.targets,t):r})}const Ad=new WeakMap;class wE extends go{constructor(e){super(e),this.decoderPath="",this.decoderConfig={},this.decoderBinary=null,this.decoderPending=null,this.workerLimit=4,this.workerPool=[],this.workerNextTaskID=1,this.workerSourceURL="",this.defaultAttributeIDs={position:"POSITION",normal:"NORMAL",color:"COLOR",uv:"TEX_COORD"},this.defaultAttributeTypes={position:"Float32Array",normal:"Float32Array",color:"Float32Array",uv:"Float32Array"}}setDecoderPath(e){return this.decoderPath=e,this}setDecoderConfig(e){return this.decoderConfig=e,this}setWorkerLimit(e){return this.workerLimit=e,this}load(e,t,n,i){const s=new du(this.manager);s.setPath(this.path),s.setResponseType("arraybuffer"),s.setRequestHeader(this.requestHeader),s.setWithCredentials(this.withCredentials),s.load(e,o=>{this.parse(o,t,i)},n,i)}parse(e,t,n=()=>{}){this.decodeDracoFile(e,t,null,null,Sn,n).catch(n)}decodeDracoFile(e,t,n,i,s=Yn,o=()=>{}){const a={attributeIDs:n||this.defaultAttributeIDs,attributeTypes:i||this.defaultAttributeTypes,useUniqueIDs:!!n,vertexColorSpace:s};return this.decodeGeometry(e,a).then(t).catch(o)}decodeGeometry(e,t){const n=JSON.stringify(t);if(Ad.has(e)){const l=Ad.get(e);if(l.key===n)return l.promise;if(e.byteLength===0)throw new Error("THREE.DRACOLoader: Unable to re-decode a buffer with different settings. Buffer has already been transferred.")}let i;const s=this.workerNextTaskID++,o=e.byteLength,a=this._getWorker(s,o).then(l=>(i=l,new Promise((c,u)=>{i._callbacks[s]={resolve:c,reject:u},i.postMessage({type:"decode",id:s,taskConfig:t,buffer:e},[e])}))).then(l=>this._createGeometry(l.geometry));return a.catch(()=>!0).then(()=>{i&&s&&this._releaseTask(i,s)}),Ad.set(e,{key:n,promise:a}),a}_createGeometry(e){const t=new hi;e.index&&t.setIndex(new Gt(e.index.array,1));for(let n=0;n<e.attributes.length;n++){const{name:i,array:s,itemSize:o,stride:a,vertexColorSpace:l}=e.attributes[n];let c;if(o===a)c=new Gt(s,o);else{const u=new Og(s,a);c=new Pu(u,o,0)}i==="color"&&(this._assignVertexColorSpace(c,l),c.normalized=!(s instanceof Float32Array)),t.setAttribute(i,c)}return t}_assignVertexColorSpace(e,t){if(t!==Sn)return;const n=new Qe;for(let i=0,s=e.count;i<s;i++)n.fromBufferAttribute(e,i),Dt.colorSpaceToWorking(n,Sn),e.setXYZ(i,n.r,n.g,n.b)}_loadLibrary(e,t){const n=new du(this.manager);return n.setPath(this.decoderPath),n.setResponseType(t),n.setWithCredentials(this.withCredentials),new Promise((i,s)=>{n.load(e,i,void 0,s)})}preload(){return this._initDecoder(),this}_initDecoder(){if(this.decoderPending)return this.decoderPending;const e=typeof WebAssembly!="object"||this.decoderConfig.type==="js",t=[];return e?t.push(this._loadLibrary("draco_decoder.js","text")):(t.push(this._loadLibrary("draco_wasm_wrapper.js","text")),t.push(this._loadLibrary("draco_decoder.wasm","arraybuffer"))),this.decoderPending=Promise.all(t).then(n=>{const i=n[0];e||(this.decoderConfig.wasmBinary=n[1]);const s=ME.toString(),o=["/* draco decoder */",i,"","/* worker */",s.substring(s.indexOf("{")+1,s.lastIndexOf("}"))].join(`
`);this.workerSourceURL=URL.createObjectURL(new Blob([o]))}),this.decoderPending}_getWorker(e,t){return this._initDecoder().then(()=>{if(this.workerPool.length<this.workerLimit){const i=new Worker(this.workerSourceURL);i._callbacks={},i._taskCosts={},i._taskLoad=0,i.postMessage({type:"init",decoderConfig:this.decoderConfig}),i.onmessage=function(s){const o=s.data;switch(o.type){case"decode":i._callbacks[o.id].resolve(o);break;case"error":i._callbacks[o.id].reject(o);break;default:console.error('THREE.DRACOLoader: Unexpected message, "'+o.type+'"')}},this.workerPool.push(i)}else this.workerPool.sort(function(i,s){return i._taskLoad>s._taskLoad?-1:1});const n=this.workerPool[this.workerPool.length-1];return n._taskCosts[e]=t,n._taskLoad+=t,n})}_releaseTask(e,t){e._taskLoad-=e._taskCosts[t],delete e._callbacks[t],delete e._taskCosts[t]}debug(){console.log("Task load: ",this.workerPool.map(e=>e._taskLoad))}dispose(){for(let e=0;e<this.workerPool.length;++e)this.workerPool[e].terminate();return this.workerPool.length=0,this.workerSourceURL!==""&&URL.revokeObjectURL(this.workerSourceURL),this}}function ME(){let r,e;onmessage=function(o){const a=o.data;switch(a.type){case"init":r=a.decoderConfig,e=new Promise(function(u){r.onModuleLoaded=function(d){u({draco:d})},DracoDecoderModule(r)});break;case"decode":const l=a.buffer,c=a.taskConfig;e.then(u=>{const d=u.draco,f=new d.Decoder;try{const h=t(d,f,new Int8Array(l),c),_=h.attributes.map(g=>g.array.buffer);h.index&&_.push(h.index.array.buffer),self.postMessage({type:"decode",id:a.id,geometry:h},_)}catch(h){console.error(h),self.postMessage({type:"error",id:a.id,error:h.message})}finally{d.destroy(f)}});break}};function t(o,a,l,c){const u=c.attributeIDs,d=c.attributeTypes;let f,h;const _=a.GetEncodedGeometryType(l);if(_===o.TRIANGULAR_MESH)f=new o.Mesh,h=a.DecodeArrayToMesh(l,l.byteLength,f);else if(_===o.POINT_CLOUD)f=new o.PointCloud,h=a.DecodeArrayToPointCloud(l,l.byteLength,f);else throw new Error("THREE.DRACOLoader: Unexpected geometry type.");if(!h.ok()||f.ptr===0)throw new Error("THREE.DRACOLoader: Decoding failed: "+h.error_msg());const g={index:null,attributes:[]};for(const m in u){const p=self[d[m]];let y,v;if(c.useUniqueIDs)v=u[m],y=a.GetAttributeByUniqueId(f,v);else{if(v=a.GetAttributeId(f,o[u[m]]),v===-1)continue;y=a.GetAttribute(f,v)}const x=i(o,a,f,m,p,y);m==="color"&&(x.vertexColorSpace=c.vertexColorSpace),g.attributes.push(x)}return _===o.TRIANGULAR_MESH&&(g.index=n(o,a,f)),o.destroy(f),g}function n(o,a,l){const u=l.num_faces()*3,d=u*4,f=o._malloc(d);a.GetTrianglesUInt32Array(l,d,f);const h=new Uint32Array(o.HEAPF32.buffer,f,u).slice();return o._free(f),{array:h,itemSize:1}}function i(o,a,l,c,u,d){const f=l.num_points(),h=d.num_components(),_=s(o,u),g=h*u.BYTES_PER_ELEMENT,m=Math.ceil(g/4)*4,p=m/u.BYTES_PER_ELEMENT,y=f*g,v=f*m,x=o._malloc(y);a.GetAttributeDataArrayForAllPoints(l,d,_,y,x);const E=new u(o.HEAPF32.buffer,x,y/u.BYTES_PER_ELEMENT);let b;if(g===m)b=E.slice();else{b=new u(v/u.BYTES_PER_ELEMENT);let S=0;for(let P=0,w=E.length;P<w;P++){for(let M=0;M<h;M++)b[S+M]=E[P*h+M];S+=p}}return o._free(x),{name:c,count:f,itemSize:h,array:b,stride:p}}function s(o,a){switch(a){case Float32Array:return o.DT_FLOAT32;case Int8Array:return o.DT_INT8;case Int16Array:return o.DT_INT16;case Int32Array:return o.DT_INT32;case Uint8Array:return o.DT_UINT8;case Uint16Array:return o.DT_UINT16;case Uint32Array:return o.DT_UINT32}}}const TE="/150-lab/assets/models/globe-hd.glb";function EE(r,e){if(window.PRELOADED_ASSETS&&window.PRELOADED_ASSETS[r]){const t=window.PRELOADED_ASSETS[r];if(t instanceof ArrayBuffer){const n=new Blob([t]);return URL.createObjectURL(n)}}return e}function i_(){if(window.shaderBackgroundInitialized){console.warn("Shader background already initialized. Skipping...");return}window.colorPhase=1,window.specialColorsActive=!1,window.particlesFullyHidden=!1,window.particlesMovementPaused=!1;let r=Date.now();const e=6e9;function t(){const T=document.querySelector("#events");if(!T)return!0;const k=T.getBoundingClientRect(),J=window.innerHeight*1.2;return k.top>J}const n=document.getElementById("shaderBackground");if(!n)return;function i(){try{const T=document.createElement("canvas");return!!(T.getContext("webgl")||T.getContext("experimental-webgl"))}catch{return!1}}if(!i()){console.warn("WebGL is not supported on this device/browser. Skipping shader background initialization."),n.style.display="none",document.body.style.backgroundColor="#1a1a2e";return}window.specialColorsActive=!1,window.colorPhase=0,setTimeout(()=>{typeof window.gsap<"u"?s(window.gsap,window.gsap.ScrollTrigger):console.warn("GSAP not found on window object - ScrollTrigger animations may not work")},200);function s(T,k){let B,J,ce,re,ze,De,wt,ut;if(!document.querySelector("#video-travel-area")){console.warn("Could not find #video-travel-area element for shader animation");return}if(C&&C.color1&&C.color2&&(B=C.color1.value.clone(),J=C.color2.value.clone(),ce=C.waveSpeed.value,re=C.waveAmplitude.value,ze=C.waveFrequency.value,De=C.ambientLight.value,wt=C.directionalLight.value,ut=C.yOffset.value),T.timeline({scrollTrigger:{trigger:"#video-travel-area",start:"top 135%",end:"top 20%",scrub:!0,markers:!1,onUpdate:_n=>{C&&C.colorDarkness&&(C.colorDarkness.value=_n.progress*2,C.colorDarkness.value>=1.95?window.colorPhase===1?(C.color1&&C.color1.value.set(B),C.color2&&C.color2.value.set(J),window.specialColorsActive=!0):window.colorPhase===0&&(C.color1&&C.color1.value.set("#e2e2e2"),C.color2&&C.color2.value.set("#515151"),window.specialColorsActive=!0):B&&J&&(window.colorPhase===1?(C.color1&&C.color1.value.copy(B),C.color2&&C.color2.value.copy(J),window.specialColorsActive=!1):window.colorPhase===0&&(C.color1&&C.color1.value.set("#e2e2e2"),C.color2&&C.color2.value.set("#515151"),window.specialColorsActive=!1)),a())}}}),setTimeout(()=>{o(T)},100),!document.querySelector("#get-involved")){console.warn("Could not find #get-involved element for globe opacity animation");return}T.timeline({scrollTrigger:{trigger:"#get-involved",start:"top bottom",end:"#get-involved-earth center center",scrub:!0,markers:!1,onUpdate:_n=>{const ft=_n.progress;U&&(ft>.01&&!U.visible?(U.visible=!0,L.visible=!0,u()):ft<=.01&&U.visible&&(U.visible=!1,L.visible=!1,u()),U.visible&&(U.traverse(en=>{en.isMesh&&en.material&&(en.material.transparent=!0,en.material.opacity=ft)}),L.opacity=ft,c())),S&&(ft>.01&&!S.visible?(S.visible=!0,P.enabled=!0,d()):ft<=.01&&S.visible&&(S.visible=!1,P.enabled=!1,d()),b&&b.uniforms&&(ft>.01&&S.visible?(b.uniforms.startOpacity.value=P.startOpacity*ft,b.uniforms.endOpacity.value=P.endOpacity*ft):(b.uniforms.startOpacity.value=0,b.uniforms.endOpacity.value=0)))}}}),T.timeline({scrollTrigger:{trigger:"#get-involved",start:"top 90%",end:"bottom top",scrub:.5,markers:!1,onUpdate:_n=>{const ft=_n.progress,en=.15;if(!window.particlesFullyHidden&&ft>=en?(window.particlesFullyHidden=!0,window.particlesMovementPaused=!0):window.particlesFullyHidden&&ft<en*.8&&(window.particlesFullyHidden=!1,window.particlesMovementPaused=!1),window.particlesFullyHidden){se&&se.uniforms&&se.uniforms.opacity&&(se.uniforms.opacity.value=0,bo());return}const Fn=1-Math.min(ft/en,1),Kr=.5*Math.pow(Fn,3);se&&se.uniforms&&se.uniforms.opacity&&(se.uniforms.opacity.value=Kr,bo())}}}),T.timeline({scrollTrigger:{trigger:"#get-involved-earth",start:"top bottom",end:"bottom top",scrub:.3,markers:!1,onUpdate:_n=>{const ft=_n.progress;if(E){const gi=-322+120*(1-Math.pow(1-ft,3));if(E.position.y=gi,ee&&ee.__folders["Globe Model Controls"]){const $r=ee.__folders["Globe Model Controls"].__folders.Position;if($r&&$r.__controllers){for(let Kr of $r.__controllers)if(Kr.property==="positionY"){Kr.updateDisplay();break}}}}}}}),T.timeline({scrollTrigger:{trigger:"#hero-travel-area",start:"top bottom",end:"top top",scrub:!0,markers:!1,onUpdate:_n=>{if(!C||!C.color1||!C.color2)return;const ft=_n.progress,en=new Qe("#e2e2e2"),xn=new Qe("#515151"),Fn=new Qe("#32c2d6"),gi=new Qe("#004199"),$r=en.clone().lerp(Fn,ft),Kr=xn.clone().lerp(gi,ft);C.color1.value.copy($r),C.color2.value.copy(Kr),ft>.9?window.colorPhase=1:ft<.1?window.colorPhase=0:window.colorPhase=.5,window.specialColorsActive=!0,l(),Lr();const Zr=document.querySelector("#cover-area-overlay");if(Zr){const So=1-ft,$l=1+ft*1.2;Zr.style.opacity=So,Zr.style.filter=`saturate(${$l})`}}}}),T.timeline({scrollTrigger:{trigger:"#hero-travel-area",start:"top top",end:"bottom bottom",scrub:!0,markers:!1,onUpdate:_n=>{if(!C||!C.color1||!C.color2)return;const ft=_n.progress,en=new Qe("#32c2d6"),xn=new Qe("#004199"),Fn=new Qe("#B225B1"),gi=new Qe("#FCC72D"),$r=new Qe("#DA281C"),Kr=new Qe("#FCC72D");let Zr,So;if(ft<=.4)Zr=en.clone();else if(ft<=.8){const ir=(ft-.4)/.4;Zr=en.clone().lerp(Fn,ir)}else{const ir=(ft-.8)/.2;Zr=Fn.clone().lerp($r,ir)}if(ft<=.6)So=xn.clone();else if(ft<=.8){const ir=(ft-.6)/.20000000000000007;So=xn.clone().lerp(gi,ir)}else{const ir=(ft-.8)/.2;So=gi.clone().lerp(Kr,ir)}C.color1.value.copy(Zr),C.color2.value.copy(So);const $l=document.getElementById("shaderBackground");$l&&($l.style.filter="hue-rotate(0deg)"),ft>.9?window.colorPhase=2:ft<.1?window.colorPhase=1:window.colorPhase=1.5,r=Date.now(),window.specialColorsActive=!0;const Hu=document.querySelector("#cover-area-overlay");if(Hu){let ir=0;if(ft>=.3){const ev=(ft-.3)/.7;ir=Math.min(.5,ev*.5)}const Qx=1+ft*1.2;Hu.style.opacity=ir,Hu.style.filter=`saturate(${Qx})`}l(),Lr()}}}),T.timeline({scrollTrigger:{trigger:"#video-travel-area",start:"top top",end:"bottom top",scrub:!1,markers:!1,onEnter:()=>{C&&C.color1&&C.color2&&(C.color1.value.set("#DA281C"),C.color2.value.set("#FCC72D"),window.colorPhase=2,window.specialColorsActive=!0,l())},onLeaveBack:()=>{}}}),T.timeline({scrollTrigger:{trigger:"#video-travel-area",start:"top bottom",end:"top 66.67%",scrub:!0,markers:!1,onUpdate:_n=>{const ft=_n.progress,en=document.querySelector("#cover-area-overlay");if(en){const xn=.5-ft*.5;en.style.opacity=xn,en.style.filter="saturate(2.2)"}}}}),T.timeline({scrollTrigger:{trigger:"#get-involved-cards",start:"top 50%",end:"top -10%",scrub:!0,markers:!1,onUpdate:_n=>{if(!C||!C.color1||!C.color2)return;const ft=_n.progress;if(ft>.1)C.color1.value.set("#dcfff6"),C.color2.value.set("#5dff9d"),C.yOffset&&(C.yOffset.value=-.05),C.ambientLight.value=.4,C.directionalLight.value=.4,C.waveAmplitude.value=1.2,C.waveFrequency.value=2.2,window.colorPhase=3,window.specialColorsActive=!0,l(),ks(),Lr();else if(ft<=.1&&window.colorPhase===3){const en=C.time.value+C.colorCycleOffset.value;C.colorCycleOffset.value=en,C.time.value=0,C.color1.value.set("#DA281C"),C.color2.value.set("#FCC72D"),C.yOffset&&ut!==void 0&&(C.yOffset.value=ut),De!==void 0&&(C.ambientLight.value=De),wt!==void 0&&(C.directionalLight.value=wt),C.waveSpeed.value=1,re!==void 0&&(C.waveAmplitude.value=re),ze!==void 0&&(C.waveFrequency.value=ze),window.colorPhase=2,r=Date.now(),window.specialColorsActive=!0,l(),ks(),Lr()}a()}}}),T.timeline({scrollTrigger:{trigger:"#get-involved-cards",start:"top 50%",end:"top -10%",scrub:1,markers:!1,onUpdate:_n=>{const en=1-_n.progress,xn=Math.pow(en,3);U&&(U.visible=!0,U.traverse(Fn=>{Fn.isMesh&&Fn.material&&(Array.isArray(Fn.material)?Fn.material.forEach(gi=>{gi.transparent=!0,gi.opacity=xn,gi.depthWrite=xn>.1,gi.blending=_s,gi.needsUpdate=!0}):(Fn.material.transparent=!0,Fn.material.opacity=xn,Fn.material.depthWrite=xn>.1,Fn.material.blending=_s,Fn.material.needsUpdate=!0))}),xn<.01&&(U.visible=!1),L.opacity=xn,L.rotationPaused=xn<.01,c()),S&&b&&b.uniforms&&(S.visible=xn>.01,b.uniforms.startOpacity.value=P.startOpacity*xn,b.uniforms.endOpacity.value=P.endOpacity*xn,P.enabled=xn>.01,d())}}}),T.timeline({scrollTrigger:{trigger:"#get-involved",start:"bottom bottom",end:"top top",scrub:!0,markers:!1,onUpdate:_n=>{_n.progress<=.1&&ce!==void 0&&window.colorPhase===1&&(C.waveSpeed&&(C.waveSpeed.value=ce),C.waveAmplitude&&(C.waveAmplitude.value=re),C.waveFrequency&&(C.waveFrequency.value=ze),C.yOffset&&(C.yOffset.value=ut),ks(),Lr())}}});function bo(_n){if(typeof ee<"u"&&ee&&ee.__folders&&ee.__folders["Particle System"]){const ft=ee.__folders["Particle System"];if(ft&&ft.__controllers){for(let en of ft.__controllers)if(en.property==="value"&&en.object===se.uniforms.opacity){en.updateDisplay();break}}}}}function o(T,k,B,J){if(!document.querySelector("#events")){document.addEventListener("DOMContentLoaded",()=>{o(T)});return}T.timeline({scrollTrigger:{trigger:"#events",start:"top 110%",end:"top 50%",scrub:!0,markers:!1,onUpdate:re=>{C&&C.colorDarkness&&(C.colorDarkness.value=2-re.progress*2,window.colorPhase===3?(C.color1&&C.color1.value.set("#dcfff6"),C.color2&&C.color2.value.set("#5dff9d"),C.ambientLight&&(C.ambientLight.value=.4),C.directionalLight&&(C.directionalLight.value=.4),C.waveSpeed&&(C.waveSpeed.value=.9),C.waveAmplitude&&(C.waveAmplitude.value=1.2),window.specialColorsActive=!0,l(),ks(),Lr()):window.colorPhase===2?(C.color1&&C.color1.value.set("#da281c"),C.color2&&C.color2.value.set("#FCC72D"),window.specialColorsActive=!0,l(),ks(),Lr()):window.colorPhase===1?(C.color1&&C.color1.value.set("#32c2d6"),C.color2&&C.color2.value.set("#004199"),window.specialColorsActive=!0,l(),ks(),Lr()):(C.color1&&C.color1.value.set("#e2e2e2"),C.color2&&C.color2.value.set("#515151"),window.specialColorsActive=!0,l(),ks(),Lr()),a())}}})}function a(){const T=window.gui,k=window.uniforms;if(typeof T<"u"&&T&&T.__folders&&T.__folders["Color Controls"]){const B=T.__folders["Color Controls"];if(B&&B.__controllers){for(let J of B.__controllers)if(J.property==="value"&&J.object===k.colorDarkness){J.updateDisplay();break}}}}function l(){const T=window.gui,k=window.uniforms;if(typeof T<"u"&&T&&T.__folders&&T.__folders["Color Controls"]){const B=T.__folders["Color Controls"];B&&B.__controllers&&B.__controllers.forEach(J=>{if(J.property==="color"&&J.__color){if(J.property==="color"&&J.__li&&J.__li.querySelector(".property-name").textContent==="Color 1"){const re="#"+k.color1.value.getHexString();J.setValue(re)}else if(J.property==="color"&&J.__li&&J.__li.querySelector(".property-name").textContent==="Color 2"){const re="#"+k.color2.value.getHexString();J.setValue(re)}}})}}function c(){if(typeof ee<"u"&&ee&&ee.__folders&&ee.__folders["Globe Model Controls"]&&ee.__folders["Globe Model Controls"].__folders&&ee.__folders["Globe Model Controls"].__folders.Material){const T=ee.__folders["Globe Model Controls"].__folders.Material;if(T&&T.__controllers)for(let k of T.__controllers)k.property==="opacity"&&k.updateDisplay()}}function u(){if(typeof ee<"u"&&ee&&ee.__folders&&ee.__folders["Globe Model Controls"]){const T=ee.__folders["Globe Model Controls"];if(T&&T.__controllers){for(let k of T.__controllers)if(k.property==="visible"){k.updateDisplay();break}}}}function d(){if(typeof ee<"u"&&ee&&ee.__folders&&ee.__folders["Gradient Overlay Controls"]){const T=ee.__folders["Gradient Overlay Controls"];if(T&&T.__controllers){for(let k of T.__controllers)if(k.property==="enabled"){k.updateDisplay();break}}}}function f(){return Math.max(window.innerHeight,document.documentElement.clientHeight)}const h=window.innerWidth,_=f();n.style.position="fixed",n.style.top="0",n.style.left="0",n.style.width="100vw",n.style.height="100svh",n.style.zIndex="-1",n.style.transform="translateZ(0)",n.style.transformStyle="preserve-3d",n.style.willChange="transform";let g;try{g=new vT({canvas:n,alpha:!0,antialias:!1,powerPreference:"default",failIfMajorPerformanceCaveat:!1}),g.setSize(h,_),g.setPixelRatio(Math.min(window.devicePixelRatio,2))}catch(T){console.error("Failed to create WebGL renderer:",T),console.warn("Falling back to fallback background. WebGL initialization failed."),n.style.display="none",document.body.style.backgroundColor="#1a1a2e",document.body.style.background="linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #1a1a2e 100%)";return}window.shaderBackgroundInitialized=!0,n.addEventListener("webglcontextlost",function(T){console.warn("WebGL context lost. Attempting to restore..."),T.preventDefault(),window.shaderBackgroundInitialized=!1}),n.addEventListener("webglcontextrestored",function(){setTimeout(()=>{if(!window.shaderBackgroundReinitializing){window.shaderBackgroundReinitializing=!0;try{i_()}catch(T){console.error("Failed to reinitialize shader background after context restore:",T)}finally{window.shaderBackgroundReinitializing=!1}}},100)});const m=new tm,p=new tm;let y=0;const v={zoom:2.471,zPosition:1},x=new Du(-window.innerWidth/2,window.innerWidth/2,window.innerHeight/2,-window.innerHeight/2,-1e3,1e3);x.position.z=v.zPosition,x.zoom=v.zoom,x.updateProjectionMatrix();const E=new kr;E.position.y=-322,E.frustumCulled=!0,m.add(E);let b,S;const P={enabled:!1,startOpacity:0,endOpacity:1,offsetY:.22,height:3,color:"#000000",yOffset:-.03};function w(){b=new Ti({transparent:!0,uniforms:{startOpacity:{value:P.startOpacity},endOpacity:{value:P.endOpacity},overlayColor:{value:new Qe(P.color)},offsetY:{value:P.offsetY},heightMultiplier:{value:P.height}},vertexShader:`
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
      `,depthTest:!1,depthWrite:!1,side:Fi});const T=window.innerHeight,k=x.right-x.left,B=x.top-x.bottom,J=T*.66*(B/T),ce=new qi(k,J);S=new pi(ce,b),S.rotation.set(0,0,0),S.position.x=0,S.position.y=P.yOffset*B,S.position.z=-100,S.frustumCulled=!1,S.renderOrder=9999,S.visible=P.enabled,m.add(S)}function M(){if(!S)return;S.rotation.set(0,0,0),S.position.x=0;const T=x.top-x.bottom;S.position.y=P.yOffset*T,S.position.z=-100}w();const L={visible:!1,scale:25,positionX:0,positionY:-280,positionZ:0,rotationX:0,rotationY:0,rotationZ:0,autoRotate:!0,autoRotateSpeed:.05,baseRotateSpeed:.05,scrollRotateSpeed:.075,responsive:!0,baseScale:25,opacity:0,rotationPaused:!1},F=new HT,G=new wE;G.setDecoderPath("https://www.gstatic.com/draco/versioned/decoders/1.5.6/"),G.setDecoderConfig({type:"js"}),F.setDRACOLoader(G);let U;const X=T=>{U=T.scene;let B=new Qi().setFromObject(U).getCenter(new q),J=new kr;J.add(U),U.position.set(-B.x,-B.y,-B.z),U=J,U.visible=L.visible,U.frustumCulled=!0,U.traverse(ze=>{ze.isMesh&&(ze.frustumCulled=!0)}),E.add(U),U.position.set(L.positionX,L.positionY,L.positionZ),U.rotation.set(L.rotationX*Math.PI/180,L.rotationY*Math.PI/180,L.rotationZ*Math.PI/180),L.responsive?Ze():(U.scale.set(L.scale,L.scale,L.scale),Ae());const ce=z.addFolder("Material");let re=0;U.traverse(ze=>{if(ze.isMesh&&ze.material){const De=ze.material;if(re++,De.isMeshStandardMaterial||De.isMeshPhongMaterial){De.metalness!==void 0&&ce.add({metalness:De.metalness},"metalness",0,1).name(`Metalness${re>1?" "+re:""}`).onChange(ut=>{De.metalness=ut}),De.roughness!==void 0&&ce.add({roughness:De.roughness},"roughness",0,1).name(`Roughness${re>1?" "+re:""}`).onChange(ut=>{De.roughness=ut}),De.shininess!==void 0&&ce.add({shininess:De.shininess},"shininess",0,100).name(`Shininess${re>1?" "+re:""}`).onChange(ut=>{De.shininess=ut}),ce.add({opacity:De.opacity},"opacity",0,1).name(`Opacity${re>1?" "+re:""}`).onChange(ut=>{De.opacity=ut,De.transparent=ut<1});const wt=De.emissive?"#"+De.emissive.getHexString():"#000000";ce.addColor({color:wt},"color").name(`Emissive Color${re>1?" "+re:""}`).onChange(ut=>{De.emissive&&De.emissive.set(ut)})}}})},Z=EE("globe-hd.glb",TE);F.load(Z,X,T=>{},T=>{console.error("Error loading globe model:",T)}),window.uniforms={time:{value:0},resolution:{value:new Rt(window.innerWidth,window.innerHeight)},mainSpeed:{value:12e-5},waveSpeed:{value:1},noiseSpeed:{value:.45},colorCycleSpeed:{value:2},colorCycleOffset:{value:0},color1:{value:new Qe("#e2e2e2")},color2:{value:new Qe("#515151")},colorDarkness:{value:0},colorWaveInfluence:{value:0},colorFrequencyShift:{value:0},colorAmplitudeEffect:{value:0},waveAmplitude:{value:.8},waveFrequency:{value:4},waveDepth:{value:.6},flowDirection:{value:new Rt(-.7,.82)},noiseScale:{value:2.5},noiseInfluence:{value:0},layerOffset:{value:.4},yOffset:{value:.29},topEdgeSoftness:{value:1},bottomEdgeSoftness:{value:1},leftEdgeSoftness:{value:.2},rightEdgeSoftness:{value:.5},fadeWidth:{value:1},leftCornerRoundness:{value:.8},rightCornerRoundness:{value:1},edgeNoiseAmount:{value:.12},edgeNoiseScale:{value:3},edgeDepth:{value:.9},edgeContrast:{value:2},bottomWaveEnabled:{value:!0},bottomWaveDepth:{value:.117},bottomWaveWidth:{value:6.475},bottomWaveSpeed:{value:0},bottomWaveOffset:{value:-2.207},filmNoiseIntensity:{value:.088},filmNoiseSpeed:{value:1e-5},filmGrainSize:{value:10},filmScratchIntensity:{value:0},lightDirection:{value:new q(.5,.5,1).normalize()},ambientLight:{value:.6},directionalLight:{value:.6},specularStrength:{value:0},shininess:{value:128},displacementStrength:{value:0},displacementScale:{value:1e-4},displacementDepth:{value:0},xOffset:{value:-.104}};const C=window.uniforms,Y=`
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
  `,de=`
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
  `,I=new qi(window.innerWidth,window.innerHeight,window.innerWidth/10,window.innerHeight/10),xe=new Ti({vertexShader:Y,fragmentShader:de,uniforms:C,transparent:!0,side:Fi}),ve=new pi(I,xe);m.add(ve),window.gui=new VT({width:300,closed:!0});const ee=window.gui;ee.domElement.style.position="absolute",ee.domElement.style.top="10px",ee.domElement.style.right="10px";const Xe=ee.domElement.querySelector(".close-button");Xe&&(Xe.innerHTML="Open Controls",Xe.addEventListener("click",function(){setTimeout(()=>{this.innerHTML=ee.closed?"Open Controls":"Close Controls"},50)}));const qe=ee.addFolder("Camera Controls");qe.add(v,"zoom",.1,5).name("Zoom Level").step(.001).onChange(T=>{x.zoom=T,x.updateProjectionMatrix()}),qe.close();const ne=ee.addFolder("Animation Speed Controls");ne.add(C.mainSpeed,"value",1e-4,.1).name("Main Speed").step(1e-4).onChange(T=>{C.mainSpeed.value=T}),ne.add(C.waveSpeed,"value",1e-4,5).name("Wave Speed").step(1e-4).onChange(T=>{C.waveSpeed.value=T}),ne.add(C.noiseSpeed,"value",1e-4,5).name("Noise Speed").step(1e-4).onChange(T=>{C.noiseSpeed.value=T}),ne.add(C.colorCycleSpeed,"value",1e-6,5).name("Color Cycle Speed").step(1e-6).onChange(T=>{C.colorCycleSpeed.value=T}),ne.add(C.colorCycleOffset,"value",0,6.28).name("Color Cycle Offset").step(.01).onChange(T=>{C.colorCycleOffset.value=T}),ne.open();const ie=ee.addFolder("Color Controls"),be="#"+C.color1.value.getHexString(),Ye="#"+C.color2.value.getHexString();ie.addColor({color:be},"color").name("Color 1").onChange(T=>{typeof T=="string"?C.color1.value.set(T):C.color1.value.setRGB(T.r/255,T.g/255,T.b/255)}),ie.addColor({color:Ye},"color").name("Color 2").onChange(T=>{typeof T=="string"?C.color2.value.set(T):C.color2.value.setRGB(T.r/255,T.g/255,T.b/255)}),ie.add(C.colorDarkness,"value",0,2).name("Color Darkness").step(.001).onChange(T=>{C.colorDarkness.value=T}),ie.add(C.colorWaveInfluence,"value",0,1).name("Color → Wave Influence").onChange(T=>{C.colorWaveInfluence.value=T}),ie.add(C.colorFrequencyShift,"value",0,1).name("Color → Frequency Effect").onChange(T=>{C.colorFrequencyShift.value=T}),ie.add(C.colorAmplitudeEffect,"value",0,1).name("Color → Amplitude Effect").onChange(T=>{C.colorAmplitudeEffect.value=T}),ie.open();const ye=ee.addFolder("Wave Controls");ye.add(C.waveAmplitude,"value",0,12).step(1e-4).name("Wave Amplitude").onChange(T=>{C.waveAmplitude.value=T}),ye.add(C.waveFrequency,"value",.1,5).name("Wave Frequency").onChange(T=>{C.waveFrequency.value=T}),ye.add(C.waveDepth,"value",0,1).name("Wave Depth Effect").onChange(T=>{C.waveDepth.value=T}),ye.add(C.noiseScale,"value",0,5).name("Noise Scale").onChange(T=>{C.noiseScale.value=T}),ye.add(C.noiseInfluence,"value",0,1).name("Noise Influence").onChange(T=>{C.noiseInfluence.value=T}),ye.add(C.layerOffset,"value",0,1).name("Layer Depth Offset").onChange(T=>{C.layerOffset.value=T});const tt=ye.addFolder("Flow Direction");tt.add(C.flowDirection.value,"x",-2,2).name("Horizontal Flow").onChange(T=>{C.flowDirection.value.x=T}),tt.add(C.flowDirection.value,"y",-2,2).name("Vertical Flow").onChange(T=>{C.flowDirection.value.y=T});const ht=ee.addFolder("Appearance Controls"),Ie=ee.addFolder("Film Noise Controls");Ie.add(C.filmNoiseIntensity,"value",0,1).name("Noise Intensity").onChange(T=>{C.filmNoiseIntensity.value=T}),Ie.add(C.filmNoiseSpeed,"value",1e-5,5e-5).name("Noise Speed").step(1e-5).onChange(T=>{C.filmNoiseSpeed.value=T}),Ie.add(C.filmGrainSize,"value",.5,50).name("Grain Size").onChange(T=>{C.filmGrainSize.value=T}),Ie.add(C.filmScratchIntensity,"value",0,.1).name("Scratch Intensity").onChange(T=>{C.filmScratchIntensity.value=T}),ht.add(C.xOffset,"value",-1,1).step(.001).name("X Position").onChange(T=>{C.xOffset.value=T}),ht.add(C.yOffset,"value",-1,1).step(.001).name("Y Position").onChange(T=>{C.yOffset.value=T}),ht.add(C.fadeWidth,"value",.1,1).name("Visible Area Size").onChange(T=>{C.fadeWidth.value=T}),ht.add(C.topEdgeSoftness,"value",0,1).name("Top Edge Softness").onChange(T=>{C.topEdgeSoftness.value=T}),ht.add(C.bottomEdgeSoftness,"value",0,1).name("Bottom Edge Softness").onChange(T=>{C.bottomEdgeSoftness.value=T}),ht.add(C.leftEdgeSoftness,"value",0,1).name("Left Edge Softness").onChange(T=>{C.leftEdgeSoftness.value=T}),ht.add(C.rightEdgeSoftness,"value",0,1).name("Right Edge Softness").onChange(T=>{C.rightEdgeSoftness.value=T}),ht.add(C.leftCornerRoundness,"value",0,1).name("Left Corner Roundness").onChange(T=>{C.leftCornerRoundness.value=T}),ht.add(C.rightCornerRoundness,"value",0,1).name("Right Corner Roundness").onChange(T=>{C.rightCornerRoundness.value=T}),ht.add(C.edgeDepth,"value",.1,3).name("Edge Burn-in Depth").onChange(T=>{C.edgeDepth.value=T}),ht.add(C.edgeContrast,"value",.5,3).name("Edge Contrast").onChange(T=>{C.edgeContrast.value=T}),ht.add(C.edgeNoiseAmount,"value",0,1).name("Edge Noise Amount").onChange(T=>{C.edgeNoiseAmount.value=T}),ht.add(C.edgeNoiseScale,"value",.5,10).name("Edge Noise Scale").onChange(T=>{C.edgeNoiseScale.value=T});const ct=ee.addFolder("Bottom Wave Edge Controls");ct.add(C.bottomWaveEnabled,"value").name("Enable Bottom Wave").onChange(T=>{C.bottomWaveEnabled.value=T,U&&L.responsive&&Ae()}),ct.add(C.bottomWaveDepth,"value",0,.5).name("Wave Depth").step(.001).onChange(T=>{C.bottomWaveDepth.value=T,U&&L.responsive&&Ae()}),ct.add(C.bottomWaveWidth,"value",1,20).name("Wave Width").step(.001).onChange(T=>{C.bottomWaveWidth.value=T}),ct.add(C.bottomWaveSpeed,"value",0,5).name("Wave Speed").step(.001).onChange(T=>{C.bottomWaveSpeed.value=T}),ct.add(C.bottomWaveOffset,"value",-5,5).name("Wave Offset").step(.001).onChange(T=>{C.bottomWaveOffset.value=T});const N=ee.addFolder("Lighting Controls");N.add(C.ambientLight,"value",0,1).name("Ambient Light").onChange(T=>{C.ambientLight.value=T}),N.add(C.directionalLight,"value",0,1).name("Directional Light").step(.001).onChange(T=>{C.directionalLight.value=T}),N.add(C.specularStrength,"value",0,1).step(.001).name("Specular Strength").onChange(T=>{C.specularStrength.value=T}),N.add(C.shininess,"value",1,128).name("Shininess").onChange(T=>{C.shininess.value=T});const st=N.addFolder("Light Direction");st.add(C.lightDirection.value,"x",-1,1).name("X").onChange(()=>{C.lightDirection.value.normalize()}),st.add(C.lightDirection.value,"y",-1,1).name("Y").onChange(()=>{C.lightDirection.value.normalize()}),st.add(C.lightDirection.value,"z",0,1).name("Z").onChange(()=>{C.lightDirection.value.normalize()});const z=ee.addFolder("Globe Model Controls"),pt=new Hg(16777215,10);pt.position.set(1,1,1),m.add(pt);const Fe=new bb(16777215,.5);m.add(Fe);const Pt=z.addFolder("Lighting");Pt.add({intensity:3},"intensity",0,5).name("Direct Light").onChange(T=>{pt.intensity=T}),pt.intensity=3,Pt.add({intensity:Fe.intensity},"intensity",0,5).name("Ambient Light").onChange(T=>{Fe.intensity=T}),z.add(L,"visible").name("Show Globe").onChange(T=>{U&&(U.visible=T)}),z.add(L,"scale",.1,50).name("Size").step(.1).onChange(T=>{U&&(L.baseScale=T,U.scale.set(T,T,T))}),z.add(L,"responsive").name("Responsive Size").onChange(T=>{!T&&U?U.scale.set(L.baseScale,L.baseScale,L.baseScale):T&&Ze()}),z.add({resizeGlobe:function(){U&&Ze()}},"resizeGlobe").name("Force Resize"),z.add({positionBehindWave:function(){U&&Ae()}},"positionBehindWave").name("Position Behind Wave");function Ae(){if(!U)return;const T=window.innerWidth;if(T<=640){U.position.y=192,U.position.z=-10;for(let J=0;J<D.__controllers.length;J++){const ce=D.__controllers[J];ce.property==="positionY"?ce.setValue(192):ce.property==="positionZ"&&ce.setValue(-10)}return}if(T>640&&T<=1024){U.position.y=192,U.position.z=-10;for(let ce=0;ce<D.__controllers.length;ce++){const re=D.__controllers[ce];re.property==="positionY"?re.setValue(192):re.property==="positionZ"&&re.setValue(-10)}return}const k=-40,B=-10;U.position.y=k,U.position.z=B;for(let J=0;J<D.__controllers.length;J++){const ce=D.__controllers[J];ce.property==="positionY"?ce.setValue(k):ce.property==="positionZ"&&ce.setValue(B)}}function Ze(){if(!U||!L.responsive)return;const T=window.innerWidth;if(T>1024){U.scale.set(40,40,40);for(let ce=0;ce<z.__controllers.length;ce++)if(z.__controllers[ce].property==="scale"){z.__controllers[ce].setValue(40);break}Ae();return}let k;T<=640?k=T*1.2:k=T*.9;const B={x:U.scale.x,y:U.scale.y,z:U.scale.z};try{U.scale.set(1,1,1),U.updateMatrixWorld(!0);const J=new Qi().setFromObject(U),ce=J.max.x-J.min.x;U.scale.set(B.x,B.y,B.z);const ze=(x.right-x.left)/x.zoom/T,wt=k*ze/ce;U.scale.set(wt,wt,wt);for(let ut=0;ut<z.__controllers.length;ut++)if(z.__controllers[ut].property==="scale"){z.__controllers[ut].setValue(wt);break}Ae()}catch(J){console.error("Error updating globe size:",J),U.scale.set(B.x,B.y,B.z)}}const D=z.addFolder("Position");D.add(L,"positionX",-500,500).name("X Position").step(1).onChange(T=>{U&&(U.position.x=T)}),D.add(L,"positionY",-500,500).name("Y Position").step(1).onChange(T=>{U&&(U.position.y=T)}),D.add(L,"positionZ",-500,500).name("Z Position").step(1).onChange(T=>{U&&(U.position.z=T)});const A=z.addFolder("Rotation");A.add(L,"rotationX",0,360).name("X Rotation").step(1).onChange(T=>{U&&(U.rotation.x=T*Math.PI/180)}),A.add(L,"rotationY",0,360).name("Y Rotation").step(1).onChange(T=>{U&&(U.rotation.y=T*Math.PI/180)}),A.add(L,"rotationZ",0,360).name("Z Rotation").step(1).onChange(T=>{U&&(U.rotation.z=T*Math.PI/180)}),z.add(L,"autoRotate").name("Auto Rotate").onChange(T=>{L.autoRotate=T}),z.add(L,"baseRotateSpeed",.05,1).name("Base Rotation Speed").step(.01).onChange(T=>{L.baseRotateSpeed=T}),z.add(L,"scrollRotateSpeed",.05,1).name("Scroll Rotation Speed").step(.01).onChange(T=>{L.scrollRotateSpeed=T}),z.open();const H=ee.addFolder("Gradient Overlay Controls");H.add(P,"enabled").name("Show Overlay").onChange(T=>{S&&(S.visible=T)});const ae=H.add(P,"startOpacity",0,1).name("Top Opacity").step(.01).onChange(T=>{b&&(b.uniforms.startOpacity.value=T)});ae.__li.querySelector(".property-name").innerHTML="Top Opacity (Top Edge)";const oe=H.add(P,"endOpacity",0,1).name("Bottom Opacity").step(.01).onChange(T=>{b&&(b.uniforms.endOpacity.value=T)});oe.__li.querySelector(".property-name").innerHTML="Bottom Opacity (Bottom Edge)",H.add(P,"yOffset",-2,2).name("Vertical Position (moves only)").step(.01).onChange(T=>{S&&M()}),H.add(P,"offsetY",-1,1).name("Gradient Shift").step(.01).onChange(T=>{b&&(b.uniforms.offsetY.value=T)}),H.add(P,"height",.1,5).name("Gradient Distribution (not size)").step(.1).onChange(T=>{b&&(b.uniforms.heightMultiplier.value=T)}),H.addColor(P,"color").name("Color").onChange(T=>{b&&b.uniforms.overlayColor.value.set(T)}),H.add({debugOverlay:function(){if(b){const T=b.uniforms.startOpacity.value,k=b.uniforms.endOpacity.value;b.uniforms.startOpacity.value=1,b.uniforms.endOpacity.value=1,b.uniforms.overlayColor.value.set("#FF00FF"),setTimeout(()=>{b.uniforms.startOpacity.value=T,b.uniforms.endOpacity.value=k,b.uniforms.overlayColor.value.set(P.color)},2e3)}}},"debugOverlay").name("Debug Visibility"),H.open();let $=150,Ce=new Float32Array($*3),me=new Float32Array($*3),Ue=new Float32Array($*3),Te=0,he=0;const Q={scrollSpeed:.005,verticalSpread:1,horizontalSpread:.56,damping:.95,depthRange:1e3,sizeMin:1.1,sizeMax:4,floatSpeed:.8,verticalOffset:0};let Ge=window.innerHeight*Q.verticalSpread,We=window.innerWidth*Q.horizontalSpread;function Se(){const T=new Float32Array($);for(let k=0;k<$;k++){const B=k*3,J=Math.random(),ce=Q.sizeMin+J*(Q.sizeMax-Q.sizeMin);T[k]=ce/se.uniforms.baseSize.value;const re=new Qe(ke.color),ze=.8+J*.6;Ue[B]=re.r*ze,Ue[B+1]=re.g*ze,Ue[B+2]=re.b*ze}Ee.setAttribute("size",new Gt(T,1)),Ee.attributes.position.needsUpdate=!0,Ee.attributes.color.needsUpdate=!0,Ee.attributes.size.needsUpdate=!0}for(let T=0;T<$;T++){const k=T*3;Ce[k]=(Math.random()-.5)*We,Ce[k+1]=(Math.random()-.5)*Ge+Q.verticalOffset,Ce[k+2]=Math.random()*500-250,me[k]=(Math.random()-.5)*.5,me[k+1]=(Math.random()-.5)*.5,me[k+2]=(Math.random()-.5)*.2;const B=new Qe("#25e5ff");Ue[k]=B.r,Ue[k+1]=B.g,Ue[k+2]=B.b}const Ee=new hi;Ee.setAttribute("position",new Gt(Ce,3)),Ee.setAttribute("color",new Gt(Ue,3));const O=we();function we(){const T=document.createElement("canvas");T.width=256,T.height=256;const k=T.getContext("2d"),B=k.createRadialGradient(T.width/2,T.height/2,0,T.width/2,T.height/2,T.width/2);B.addColorStop(0,"rgba(255, 255, 255, 1.0)"),B.addColorStop(.05,"rgba(255, 255, 255, 1.0)"),B.addColorStop(.2,"rgba(255, 255, 255, 0.9)"),B.addColorStop(.4,"rgba(255, 255, 255, 0.5)"),B.addColorStop(.6,"rgba(255, 255, 255, 0.3)"),B.addColorStop(.8,"rgba(255, 255, 255, 0.1)"),B.addColorStop(1,"rgba(255, 255, 255, 0)"),k.fillStyle=B,k.fillRect(0,0,T.width,T.height),k.beginPath(),k.moveTo(T.width/2,T.width*.3),k.lineTo(T.width/2,T.width*.7),k.moveTo(T.width*.3,T.height/2),k.lineTo(T.width*.7,T.height/2),k.moveTo(T.width*.35,T.height*.35),k.lineTo(T.width*.65,T.height*.65),k.moveTo(T.width*.65,T.height*.35),k.lineTo(T.width*.35,T.height*.65),k.strokeStyle="rgba(255, 255, 255, 1.0)",k.lineWidth=4,k.stroke();const J=k.createRadialGradient(T.width/2,T.height/2,T.width*.2,T.width/2,T.height/2,T.width*.7);J.addColorStop(0,"rgba(255, 255, 255, 0.3)"),J.addColorStop(.5,"rgba(255, 255, 255, 0.1)"),J.addColorStop(1,"rgba(255, 255, 255, 0)"),k.globalCompositeOperation="lighter",k.fillStyle=J,k.fillRect(0,0,T.width,T.height);const ce=new An(T);return ce.needsUpdate=!0,ce}const se=new Ti({uniforms:{baseSize:{value:6},opacity:{value:0},map:{value:O},brightness:{value:1.4},haloStrength:{value:1.4},haloSize:{value:1.3}},vertexShader:`
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
    `,transparent:!0,blending:ru,depthWrite:!1,depthTest:!1}),ge=new Uf(Ee,se);ge.frustumCulled=!0,p.add(ge);const le=ee.addFolder("Particle System"),ue={count:$};le.add(ue,"count",100,1e3,10).name("Particle Count").onChange(T=>{$=Math.floor(T);const k=new Float32Array($*3),B=new Float32Array($*3),J=new Float32Array($*3);for(let ce=0;ce<$;ce++){const re=ce*3;if(ce<Ce.length/3)k[re]=Ce[re],k[re+1]=Ce[re+1],k[re+2]=Ce[re+2],B[re]=me[re],B[re+1]=me[re+1],B[re+2]=me[re+2],J[re]=Ue[re],J[re+1]=Ue[re+1],J[re+2]=Ue[re+2];else{k[re]=(Math.random()-.5)*We,k[re+1]=(Math.random()-.5)*Ge+Q.verticalOffset,k[re+2]=Math.random()*500-250,B[re]=(Math.random()-.5)*.5,B[re+1]=(Math.random()-.5)*.5,B[re+2]=(Math.random()-.5)*.2;const ze=new Qe(ke.color);J[re]=ze.r,J[re+1]=ze.g,J[re+2]=ze.b}}Ce=k,me=B,Ue=J,Ee.setAttribute("position",new Gt(Ce,3)),Ee.setAttribute("color",new Gt(Ue,3)),Ee.attributes.position.needsUpdate=!0,Ee.attributes.color.needsUpdate=!0,Se()});const ke={color:"#25e5ff"};le.addColor(ke,"color").name("Particle Color").onChange(T=>{const k=new Qe(T);for(let B=0;B<$;B++){const J=B*3;Ue[J]=k.r,Ue[J+1]=k.g,Ue[J+2]=k.b}Ee.setAttribute("color",new Gt(Ue,3)),Ee.attributes.color.needsUpdate=!0}),le.add(se.uniforms.baseSize,"value",2,15,.5).name("Base Particle Size").onChange(T=>{Se()}),le.add(se.uniforms.opacity,"value",0,1,.1).name("Opacity"),le.add(se.uniforms.brightness,"value",1,3,.1).name("Brightness").onChange(T=>{se.uniforms.brightness.value=T});const it={intensity:1.5};le.add(it,"intensity",.1,3,.1).name("Sparkle Intensity").onChange(T=>{se.uniforms.opacity.value=T});const Ut={enabled:!1},Be=le.add(Ut,"enabled").name("Size Attenuation").onChange(T=>{T?se.vertexShader=`
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
        `:se.vertexShader=`
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
        `,se.needsUpdate=!0,Se()}),Oe=document.createElement("div");Oe.className="gui-tooltip",Oe.textContent="When enabled, particles appear smaller as they move further away",Oe.style.position="absolute",Oe.style.backgroundColor="rgba(0,0,0,0.8)",Oe.style.color="#fff",Oe.style.padding="5px",Oe.style.borderRadius="3px",Oe.style.fontSize="11px",Oe.style.zIndex="10000",Oe.style.display="none",document.body.appendChild(Oe);const dt=Be.domElement;dt.addEventListener("mouseenter",T=>{const k=dt.getBoundingClientRect();Oe.style.left=k.right+"px",Oe.style.top=k.top+"px",Oe.style.display="block"}),dt.addEventListener("mouseleave",()=>{Oe.style.display="none"});let Pe=0;window.addEventListener("scroll",()=>{Te=window.scrollY});let Ke=[],Ve={x:0,y:0},rt={x:0,y:0},sn=0,mt=0,kt=!1,Jt=250,_t=[],Ht=10,xt,on=!1,Lt=[];const Re={enabled:!1,mobileDisabled:/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)||window.innerWidth<=768||"ontouchstart"in window,spawnRate:.52,maxParticles:150,baseSize:1.9,fadeInSpeed:.62,fadeOutSpeed:.88,trailLength:5e-4,speedVariation:.2,jitterAmount:.08,spawnOffsetMin:.08,spawnOffsetMax:.8,minLifetime:1.5,maxLifetime:3.5,drawnLife:12};xt=Re.spawnOffsetMin,window.enableMouseParticles=function(){Re.mobileDisabled||(Re.enabled=!0)};const Nt=new hi,dn=new Ti({uniforms:{baseSize:{value:Re.baseSize},map:{value:O},brightness:{value:1.4},haloStrength:{value:1.4},haloSize:{value:1.3}},vertexShader:`
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
    `,transparent:!0,blending:ru,depthWrite:!1,depthTest:!1}),gn=new Uf(Nt,dn);p.add(gn);function R(T,k){const B=T/window.innerWidth*2-1,J=-(k/window.innerHeight)*2+1,ce=B*(x.right-x.left)/2/x.zoom,re=J*(x.top-x.bottom)/2/x.zoom;return{x:ce,y:re}}function W(T,k){return{id:sn++,position:{x:T,y:k,z:Math.random()*100-50},targetPosition:{x:T,y:k},velocity:{x:0,y:0},size:.8+Math.random()*.4,opacity:0,targetOpacity:1,life:0,maxLife:Re.minLifetime+Math.random()*(Re.maxLifetime-Re.minLifetime),color:{r:.145,g:.898,b:1},trailSpeed:.05+Math.random()*.03,fadePhase:"in"}}function K(T,k){return{id:sn++,position:{x:T,y:k,z:Math.random()*100-50},originalPosition:{x:T,y:k},targetPosition:{x:T,y:k},velocity:{x:0,y:0},size:.8+Math.random()*.4,opacity:0,baseOpacity:0,targetOpacity:1,life:0,maxLife:Re.drawnLife,color:{r:1,g:.647,b:0},trailSpeed:0,fadePhase:"in",isDrawn:!0,twinklePhase:Math.random()*Math.PI*2,twinkleSpeed:.8+Math.random()*.4,twinkleRadius:2+Math.random()*3}}function j(){const T=[...Ke,...Lt];if(T.length===0){Nt.attributes.position&&(Nt.setAttribute("position",new Gt(new Float32Array(0),3)),Nt.setAttribute("color",new Gt(new Float32Array(0),3)),Nt.setAttribute("size",new Gt(new Float32Array(0),1)),Nt.setAttribute("opacity",new Gt(new Float32Array(0),1)));return}const k=new Float32Array(T.length*3),B=new Float32Array(T.length*3),J=new Float32Array(T.length),ce=new Float32Array(T.length);for(let re=0;re<T.length;re++){const ze=T[re],De=re*3;k[De]=ze.position.x,k[De+1]=ze.position.y,k[De+2]=ze.position.z,B[De]=ze.color.r,B[De+1]=ze.color.g,B[De+2]=ze.color.b,J[re]=ze.size,ce[re]=ze.opacity}Nt.setAttribute("position",new Gt(k,3)),Nt.setAttribute("color",new Gt(B,3)),Nt.setAttribute("size",new Gt(J,1)),Nt.setAttribute("opacity",new Gt(ce,1)),Nt.attributes.position.needsUpdate=!0,Nt.attributes.color.needsUpdate=!0,Nt.attributes.size.needsUpdate=!0,Nt.attributes.opacity.needsUpdate=!0}window.addEventListener("mousemove",T=>{if(!Re.enabled||Re.mobileDisabled)return;rt.x=Ve.x,rt.y=Ve.y,Ve.x=T.clientX,Ve.y=T.clientY;const k=Ve.x-rt.x,B=Ve.y-rt.y,J=Math.sqrt(k*k+B*B);if(kt||(mt+=J,mt>=Jt&&(kt=!0)),_t.push(J),_t.length>Ht&&_t.shift(),_t.length>0){const ce=_t.reduce((De,wt)=>De+wt,0)/_t.length,ze=Math.min(ce/20,1);xt=Re.spawnOffsetMin+(Re.spawnOffsetMax-Re.spawnOffsetMin)*ze}if(kt&&J>1&&Ke.length<Re.maxParticles&&Math.random()<Re.spawnRate){const ce=R(Ve.x,Ve.y),re=xt*50,ze=Math.random()*Math.PI*2,De=Math.cos(ze)*re*Math.random(),wt=Math.sin(ze)*re*Math.random(),ut=W(ce.x+De,ce.y+wt);Ke.push(ut)}if(on&&Ke.length<Re.maxParticles&&Math.random()<.8){const ce=R(Ve.x,Ve.y),re=10,ze=Math.random()*Math.PI*2,De=Math.cos(ze)*re*Math.random(),wt=Math.sin(ze)*re*Math.random(),ut=K(ce.x+De,ce.y+wt);Lt.push(ut)}}),window.addEventListener("mousedown",T=>{!Re.enabled||Re.mobileDisabled||T.button===0&&(on=!0)}),window.addEventListener("mouseup",T=>{T.button===0&&(on=!1)});let V={x:0,y:0},pe={x:0,y:0},Le=!1;window.addEventListener("touchstart",T=>{if(!Re.enabled||Re.mobileDisabled)return;const k=T.target;k.tagName==="BUTTON"||k.tagName==="A"||k.closest("button")||k.closest("a")||k.closest("header")||k.closest("nav")||T.preventDefault();const J=T.touches[0];pe.x=J.clientX,pe.y=J.clientY,V.x=pe.x,V.y=pe.y,Le=!0,on=!0},{passive:!1}),window.addEventListener("touchmove",T=>{if(!Re.enabled||Re.mobileDisabled||!Le)return;const k=T.target;k.tagName==="BUTTON"||k.tagName==="A"||k.closest("button")||k.closest("a")||k.closest("header")||k.closest("nav")||T.preventDefault();const J=T.touches[0];V.x=pe.x,V.y=pe.y,pe.x=J.clientX,pe.y=J.clientY,Ve.x=pe.x,Ve.y=pe.y;const ce=pe.x-V.x,re=pe.y-V.y,ze=Math.sqrt(ce*ce+re*re);if(kt||(mt+=ze,mt>=Jt&&(kt=!0)),_t.push(ze),_t.length>Ht&&_t.shift(),_t.length>0){const De=_t.reduce((vo,yo)=>vo+yo,0)/_t.length,ut=Math.min(De/20,1);xt=Re.spawnOffsetMin+(Re.spawnOffsetMax-Re.spawnOffsetMin)*ut}if(kt&&ze>1&&Ke.length<Re.maxParticles&&Math.random()<Re.spawnRate){const De=R(pe.x,pe.y),wt=xt*50,ut=Math.random()*Math.PI*2,vo=Math.cos(ut)*wt*Math.random(),yo=Math.sin(ut)*wt*Math.random(),bo=W(De.x+vo,De.y+yo);Ke.push(bo)}if(on&&Ke.length<Re.maxParticles&&Math.random()<.8){const De=R(pe.x,pe.y),wt=10,ut=Math.random()*Math.PI*2,vo=Math.cos(ut)*wt*Math.random(),yo=Math.sin(ut)*wt*Math.random(),bo=K(De.x+vo,De.y+yo);Lt.push(bo)}},{passive:!1}),window.addEventListener("touchend",T=>{Le=!1,on=!1}),window.addEventListener("touchcancel",T=>{Le=!1,on=!1});function He(){if(Ke.length===0&&Lt.length===0||Re.mobileDisabled)return;const T=R(Ve.x,Ve.y);for(let k=Ke.length-1;k>=0;k--){const B=Ke[k];if(B.life+=.016,!B.isDrawn){B.targetPosition.x=T.x,B.targetPosition.y=T.y;const ce=B.trailSpeed*Re.trailLength;B.position.x+=(B.targetPosition.x-B.position.x)*ce,B.position.y+=(B.targetPosition.y-B.position.y)*ce,B.position.x+=(Math.random()-.5)*2*Re.jitterAmount,B.position.y+=(Math.random()-.5)*2*Re.jitterAmount}const J=B.life/B.maxLife;if(J<.15){B.fadePhase="in";const ce=J/.15,re=1-Math.pow(1-ce,2);B.opacity=re*Re.fadeInSpeed}else if(J<.65)B.fadePhase="hold",B.opacity=Re.fadeInSpeed;else{B.fadePhase="out";const ce=(J-.65)/.35,re=Math.pow(1-ce,2);B.opacity=re*Re.fadeInSpeed*Re.fadeOutSpeed}(B.life>=B.maxLife||B.opacity<=0)&&Ke.splice(k,1)}for(let k=Lt.length-1;k>=0;k--){const B=Lt[k];B.life+=.016,B.twinklePhase+=.016*B.twinkleSpeed;const J=Math.sin(B.twinklePhase)*B.twinkleRadius*.4,ce=Math.cos(B.twinklePhase*1.05)*B.twinkleRadius*.4;B.position.x=B.originalPosition.x+J,B.position.y=B.originalPosition.y+ce;const re=B.life/B.maxLife;if(re<.15){B.fadePhase="in";const De=re/.15,wt=1-Math.pow(1-De,2);B.baseOpacity=wt*Re.fadeInSpeed}else if(re<.85)B.fadePhase="hold",B.baseOpacity=Re.fadeInSpeed;else{B.fadePhase="out";const De=(re-.85)/.15,wt=Math.pow(1-De,2);B.baseOpacity=wt*Re.fadeInSpeed*Re.fadeOutSpeed}const ze=.7+.3*Math.sin(B.twinklePhase*2);B.opacity=B.baseOpacity*ze,(B.life>=B.maxLife||B.opacity<=0)&&Lt.splice(k,1)}j(),et.currentOffset=xt}const _e=ee.addFolder("Mouse Follow Particles");_e.add({mobileDetected:Re.mobileDisabled},"mobileDetected").name("Mobile Detected (Disabled)").listen(),_e.add(Re,"enabled").name("Enable Mouse Particles").onChange(T=>{T||(Ke=[],Lt=[],j(),kt=!1,mt=0,_t=[],xt=Re.spawnOffsetMin,on=!1)}),_e.add(Re,"spawnRate",.1,1,.1).name("Spawn Rate").onChange(T=>{Re.spawnRate=T}),_e.add(Re,"maxParticles",10,50,1).name("Max Particles").onChange(T=>{for(Re.maxParticles=T;Ke.length>T;)Ke.pop();j()}),_e.add(Re,"baseSize",2,10,.5).name("Particle Size").onChange(T=>{dn.uniforms.baseSize.value=T}),_e.add(Re,"trailLength",.1,1,.1).name("Trail Length").onChange(T=>{Re.trailLength=T}),_e.add(Re,"speedVariation",0,1,.1).name("Speed Variation").onChange(T=>{Re.speedVariation=T}),_e.add(Re,"jitterAmount",0,1,.05).name("Jitter Amount").onChange(T=>{Re.jitterAmount=T}),_e.add(Re,"spawnOffsetMin",0,1,.05).name("Spawn Offset Min").onChange(T=>{Re.spawnOffsetMin=T}),_e.add(Re,"spawnOffsetMax",0,1,.05).name("Spawn Offset Max").onChange(T=>{Re.spawnOffsetMax=T});const et={currentOffset:xt};_e.add(et,"currentOffset",0,1).name("Current Offset (Dynamic)").listen(),_e.add(Re,"fadeInSpeed",.1,1,.01).name("Max Opacity").onChange(T=>{Re.fadeInSpeed=T}),_e.add(Re,"fadeOutSpeed",.1,1,.01).name("Fade Strength").onChange(T=>{Re.fadeOutSpeed=T}),_e.add(Re,"drawnLife",1,10,.1).name("Drawn Particle Life").onChange(T=>{Re.drawnLife=T}),_e.add({movementThreshold:Jt},"movementThreshold",100,400,10).name("Initial Movement Needed").onChange(T=>{Jt=T}),_e.add({resetActivation:function(){kt=!1,mt=0,_t=[],xt=Re.spawnOffsetMin,Ke=[],Lt=[],on=!1,j()}},"resetActivation").name("Reset Activation"),_e.close();function ot(){const T=Ee.attributes.position.array,k=Q.previousOffset||0,B=Q.verticalOffset-k;Q.previousOffset=Q.verticalOffset;for(let J=0;J<$;J++){const ce=J*3;T[ce+1]+=B;const re=T[ce+1]-Q.verticalOffset,ze=Ge/2;re>ze?T[ce+1]=-ze+Q.verticalOffset:re<-ze&&(T[ce+1]=ze+Q.verticalOffset)}Ee.attributes.position.needsUpdate=!0}function Je(){const T=Ee.attributes.position.array,k=Ee.attributes.color.array,B=Ee.attributes.size?Ee.attributes.size.array:null;Pe+=.01;const J=(Te-he)*Q.scrollSpeed;if(he=Te*(1-Q.damping)+he*Q.damping,!window.particlesMovementPaused){for(let ce=0;ce<$;ce++){const re=ce*3,ze=B?(B[ce]-Q.sizeMin)/(Q.sizeMax-Q.sizeMin):.5,De=Q.floatSpeed*(.5+ze*.5);T[re]+=me[re]*De,T[re+1]+=me[re+1]*De,T[re+2]+=me[re+2]*De,T[re+1]+=J*(.5+ze*.5),Math.abs(T[re])>We/2&&(me[re]*=-1);const wt=T[re+1]-Q.verticalOffset,ut=Ge/2;wt>ut?T[re+1]=-ut+Q.verticalOffset:wt<-ut&&(T[re+1]=ut+Q.verticalOffset),Math.abs(T[re+2])>250&&(me[re+2]*=-1)}Ee.attributes.position.needsUpdate=!0}for(let ce=0;ce<$;ce++){const re=ce*3,ze=B?(B[ce]-Q.sizeMin)/(Q.sizeMax-Q.sizeMin):.5,De=new Qe(ke.color),wt=.2*Math.sin(Pe+ce*.1)+.9,ut=.8+ze*.6;k[re]=De.r*wt*ut,k[re+1]=De.g*wt*ut,k[re+2]=De.b*wt*ut}Ee.attributes.color.needsUpdate=!0,requestAnimationFrame(Je)}Je();function bt(){if(requestAnimationFrame(bt),C.time.value+=.001,t()&&Date.now()-r>e){const k=C.time.value+C.colorCycleOffset.value;C.colorCycleOffset.value=k,C.time.value=0,r=Date.now()}if(He(),!window.particlesFullyHidden&&se.uniforms.opacity.value<y&&(se.uniforms.opacity.value+=.001,se.uniforms.opacity.value>y&&(se.uniforms.opacity.value=y)),window.particlesFullyHidden&&se.uniforms.opacity.value>0&&(se.uniforms.opacity.value=0),U&&L.autoRotate&&!L.rotationPaused){const T=L.baseRotateSpeed;U.rotation.y+=T*.01}S&&(S.rotation.set(0,0,0),M()),g.autoClear=!0,g.render(m,x),(!window.particlesFullyHidden||Ke.length>0&&Re.enabled)&&(g.autoClear=!1,g.render(p,x))}bt(),document.addEventListener("veryEarlyParticleFade",()=>{y=.3,se&&se.uniforms&&se.uniforms.opacity&&se.uniforms.opacity.value<.1&&(se.uniforms.opacity.value=.05)}),document.addEventListener("particleFadeStart",()=>{y=.3}),document.addEventListener("heroAnimationComplete",()=>{y=.5});function Bt(){if(S){const T=window.innerHeight,k=x.right-x.left,J=(x.top-x.bottom)/T,ce=k,re=T*.66*J;S.geometry.dispose(),S.geometry=new qi(ce,re),S.rotation.set(0,0,0),M()}}let $t,zt;function Vt(){const T=window.innerWidth,k=f();if(g.setSize(T,k),x.left=-T/2,x.right=T/2,x.top=k/2,x.bottom=-k/2,x.updateProjectionMatrix(),C.resolution.value.set(T,k),ve.geometry.dispose(),ve.geometry=new qi(T,k,T/10,k/10),Ge=k*Q.verticalSpread,We=T*Q.horizontalSpread,typeof ee<"u"&&ee&&ee.__folders["Particle System"]){const B=ee.__folders["Particle System"];if(B&&B.__controllers){for(let J=0;J<B.__controllers.length;J++)if(B.__controllers[J].property==="verticalOffset"){B.__controllers[J].min(-k*3),B.__controllers[J].max(k*2);break}}}if(U&&L.responsive){clearTimeout(zt),zt=setTimeout(()=>{Ze()},150);for(let B=0;B<D.__controllers.length;B++){const J=D.__controllers[B];J.property==="positionX"?(J.min(-T/2),J.max(T/2)):J.property==="positionY"&&(J.min(-k/2),J.max(k/2))}}Bt()}window.addEventListener("resize",()=>{clearTimeout($t),clearTimeout(zt),U&&L.responsive&&(zt=setTimeout(()=>{Ze()},150)),$t=setTimeout(Vt,150)}),window.addEventListener("orientationchange",()=>{clearTimeout($t),clearTimeout(zt),U&&L.responsive&&(zt=setTimeout(()=>{Ze()},300)),$t=setTimeout(Vt,300)}),document.addEventListener("visibilitychange",()=>{if(document.visibilityState==="visible"){clearTimeout(zt);const T=window.innerWidth,k=f();window.lastKnownDimensions||(window.lastKnownDimensions={width:T,height:k});const B=Math.abs(T-window.lastKnownDimensions.width)/window.lastKnownDimensions.width,J=Math.abs(k-window.lastKnownDimensions.height)/window.lastKnownDimensions.height;(B>.05||J>.05)&&(window.lastKnownDimensions.width=T,window.lastKnownDimensions.height=k,U&&L.responsive&&(zt=setTimeout(()=>{Ze()},150)),setTimeout(Vt,100))}else window.lastKnownDimensions={width:window.innerWidth,height:f()}});let at=f();function Qt(){const T=f();Math.abs(T-at)>50&&(Vt(),at=T),requestAnimationFrame(Qt)}Qt(),window.addEventListener("keydown",T=>{if((T.key==="+"||T.key==="=")&&(v.zoom=Math.min(v.zoom+.1,5),x.zoom=v.zoom,x.updateProjectionMatrix(),typeof ee<"u"&&ee&&ee.__folders["Camera Controls"])){const k=ee.__folders["Camera Controls"];if(k&&k.__controllers){for(let B=0;B<k.__controllers.length;B++)if(k.__controllers[B].property==="zoom"){k.__controllers[B].updateDisplay();break}}}if((T.key==="-"||T.key==="_")&&(v.zoom=Math.max(v.zoom-.1,.1),x.zoom=v.zoom,x.updateProjectionMatrix(),typeof ee<"u"&&ee&&ee.__folders["Camera Controls"])){const k=ee.__folders["Camera Controls"];if(k&&k.__controllers){for(let B=0;B<k.__controllers.length;B++)if(k.__controllers[B].property==="zoom"){k.__controllers[B].updateDisplay();break}}}}),le.add(Q,"scrollSpeed",.001,.05,.018).name("Scroll Sensitivity").step(.001).onChange(T=>{Q.scrollSpeed=T}),le.add(Q,"damping",.8,.99,.01).name("Scroll Damping").onChange(T=>{Q.damping=T}),le.add(Q,"verticalSpread",1,5,.5).name("Vertical Spread").onChange(T=>{const k=Ge;Ge=window.innerHeight*T;const B=Ge/k,J=Ee.attributes.position.array;for(let ce=0;ce<$;ce++){const re=ce*3,De=(J[re+1]-Q.verticalOffset)*B;J[re+1]=De+Q.verticalOffset,Math.abs(De)>Ge/2&&(J[re+1]=(Math.random()-.5)*Ge+Q.verticalOffset)}Ee.attributes.position.needsUpdate=!0}),le.add(Q,"horizontalSpread",.02,5,.01).name("Horizontal Spread").onChange(T=>{const k=We;We=window.innerWidth*T;const B=We/k,J=Ee.attributes.position.array;for(let ce=0;ce<$;ce++){const re=ce*3,De=J[re]*B;J[re]=De,Math.abs(De)>We/2&&(J[re]=(Math.random()-.5)*We)}Ee.attributes.position.needsUpdate=!0}),le.add(Q,"verticalOffset",-window.innerHeight*3,window.innerHeight*2,10).name("Vertical Position").onChange(T=>{Q.previousOffset===void 0&&(Q.previousOffset=0),Q.verticalOffset=T,ot()}),le.add(Q,"sizeMin",1,5,.01).name("Min Particle Size").onChange(T=>{if(Q.sizeMin=T,Q.sizeMin>=Q.sizeMax&&(Q.sizeMax=Q.sizeMin+1,typeof ee<"u"&&ee&&ee.__folders["Particle System"])){const k=ee.__folders["Particle System"];if(k&&k.__controllers){for(let B=0;B<k.__controllers.length;B++)if(k.__controllers[B].property==="sizeMax"){k.__controllers[B].updateDisplay();break}}}Se()}),le.add(Q,"sizeMax",5,10,.01).name("Max Particle Size").onChange(T=>{if(Q.sizeMax=T,Q.sizeMax<=Q.sizeMin&&(Q.sizeMin=Q.sizeMax-1,typeof ee<"u"&&ee&&ee.__folders["Particle System"])){const k=ee.__folders["Particle System"];if(k&&k.__controllers){for(let B=0;B<k.__controllers.length;B++)if(k.__controllers[B].property==="sizeMin"){k.__controllers[B].updateDisplay();break}}}Se()}),le.add(Q,"floatSpeed",.1,3,.1).name("Float Speed").onChange(T=>{Q.floatSpeed=T}),Se();const Ft=Ee.attributes.position.array;for(let T=0;T<$;T++){const k=T*3;Ft[k+1]=(Math.random()-.5)*Ge+Q.verticalOffset}Ee.attributes.position.needsUpdate=!0,le.add(se.uniforms.haloStrength,"value",0,2,.1).name("Halo Intensity").onChange(T=>{se.uniforms.haloStrength.value=T}),le.add(se.uniforms.haloSize,"value",1,2,.1).name("Halo Size").onChange(T=>{se.uniforms.haloSize.value=T});let Nn;window.addEventListener("scroll",()=>{Nn&&clearTimeout(Nn),Nn=setTimeout(()=>{},150)})}function ks(){const r=window.gui,e=window.uniforms;if(typeof r>"u"||!r||!r.__folders||!r.__folders["Lighting Controls"])return;const t=r.__folders["Lighting Controls"];for(let n=0;n<t.__controllers.length;n++){const i=t.__controllers[n];i.property==="value"&&i.object===e.ambientLight&&i.setValue(e.ambientLight.value),i.property==="value"&&i.object===e.directionalLight&&i.setValue(e.directionalLight.value)}}function Lr(){const r=window.gui,e=window.uniforms;if(r.__folders["Animation Speed Controls"]){const t=r.__folders["Animation Speed Controls"];for(let n=0;n<t.__controllers.length;n++){const i=t.__controllers[n];if(i.property==="value"&&i.object===e.waveSpeed){i.setValue(e.waveSpeed.value);break}}}if(r.__folders["Wave Controls"]){const t=r.__folders["Wave Controls"];for(let n=0;n<t.__controllers.length;n++){const i=t.__controllers[n];i.property==="value"&&i.object===e.waveAmplitude&&i.setValue(e.waveAmplitude.value),i.property==="value"&&i.object===e.waveFrequency&&i.setValue(e.waveFrequency.value)}}}const AE="/150-lab/assets/video/acs-150-compressed.mp4",CE="/150-lab/assets/images/anniversary-video-poster.jpg";let Cd=!1;function RE(){const r=document.getElementById("anniversary-video"),e=document.querySelector("#video");if(!r||!e)return;r.src=AE,r.poster=CE,r.addEventListener("error",ve=>{var ee,Xe;console.error("Video loading error:",ve),console.error("Video src:",r.src),console.error("Video error code:",(ee=r.error)==null?void 0:ee.code),console.error("Video error message:",(Xe=r.error)==null?void 0:Xe.message)}),r.addEventListener("loadeddata",()=>{r.style.opacity="1",r.pause()}),r.addEventListener("loadedmetadata",()=>{r.style.display="none",r.offsetHeight,r.style.display=""});const t=document.createElement("div");t.className="video-overlay";const n=document.createElement("div");n.className="play-button",t.appendChild(n),r.parentNode.insertBefore(t,r.nextSibling);const i=document.createElement("div");i.className="video-audio-slider",i.innerHTML=`
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
  `,r.parentNode.appendChild(c);let h=!1;const _=.3,g=.18,m=()=>{const ee=r.volume/_*100;o.style.width=ee+"%",a.style.left=ee+"%"},p=ve=>{const ee=s.getBoundingClientRect(),qe=Math.max(0,Math.min(100,(ve-ee.left)/ee.width*100))/100*_;if(window.audioMuted&&qe>0){const ne=document.querySelector(".sound-toggle");ne&&ne.classList.contains("muted")&&(Cd=!0,ne.click(),setTimeout(()=>{Cd=!1},100))}qe>0?r.muted=!1:r.muted=!0,r.volume=qe,qe>0&&(U=qe),m()};s.addEventListener("mousedown",ve=>{h=!0,p(ve.clientX),ve.preventDefault()}),document.addEventListener("mousemove",ve=>{h&&p(ve.clientX)}),document.addEventListener("mouseup",()=>{h=!1});const y=r.parentNode;y.addEventListener("mouseenter",()=>{r.paused||(i.style.opacity="1",i.style.pointerEvents="auto")}),y.addEventListener("mouseleave",()=>{i.style.opacity="0",i.style.pointerEvents="none"}),r.addEventListener("volumechange",m),r.volume=g,window.audioMuted?(r.muted=!0,r.volume=0):r.muted=!1,m();let v=!1;const x=()=>{if(r.duration&&!v){const ve=r.currentTime/r.duration*100;d.style.transition="none",d.style.width=ve+"%",f.style.left=ve+"%"}},E=ve=>{const ee=u.getBoundingClientRect(),qe=Math.max(0,Math.min(100,(ve-ee.left)/ee.width*100))/100*r.duration;r.currentTime=qe,x(),r.paused||L()},b=()=>{d.style.transition="none",f.style.transition="opacity 0.2s"},S=()=>{d.style.transition="width 0.1s linear",f.style.transition="opacity 0.2s"};u.addEventListener("mousedown",ve=>{v=!0,b(),E(ve.clientX),ve.preventDefault()}),u.addEventListener("click",ve=>{v||(b(),E(ve.clientX),setTimeout(()=>{S()},50))}),document.addEventListener("mousemove",ve=>{v&&E(ve.clientX)}),document.addEventListener("mouseup",()=>{v=!1,S()}),c.addEventListener("mouseenter",()=>{f.style.opacity="1",c.style.height="8px",c.style.background="rgba(0, 0, 0, 0.3)"}),c.addEventListener("mouseleave",()=>{v||(f.style.opacity="0"),c.style.height="4px",c.style.background="rgba(0, 0, 0, 0)"});let P=null,w=0;const M=()=>{if(r.duration&&!v&&!r.paused){const ve=performance.now();if(ve-w>=16.67){const ee=r.currentTime/r.duration*100;d.style.width=ee+"%",f.style.left=ee+"%",w=ve}P=requestAnimationFrame(M)}},L=()=>{P&&cancelAnimationFrame(P),w=performance.now(),P=requestAnimationFrame(M)},F=()=>{P&&(cancelAnimationFrame(P),P=null)};r.addEventListener("play",L),r.addEventListener("pause",F),r.addEventListener("timeupdate",x),x();const G=(ve,ee,Xe=1e3)=>{if(!ve)return;const qe=ve.volume,ne=performance.now(),ie=be=>{const Ye=be-ne,ye=Math.min(Ye/Xe,1),tt=ye*ye;ve.volume=qe+(ee-qe)*tt,ye<1&&requestAnimationFrame(ie)};requestAnimationFrame(ie)};let U=g,X=null;const Z=()=>{r.paused||(U=r.volume,G(r,0,600),X=setTimeout(()=>{r.pause(),t.classList.remove("hidden"),i.style.opacity="0",i.style.pointerEvents="none",window.backgroundAudio&&!window.audioMuted&&G(window.backgroundAudio,.25),X=null},600))},C=()=>{r.paused||(X&&(clearTimeout(X),X=null),r.pause(),t.classList.remove("hidden"),i.style.opacity="0",i.style.pointerEvents="none",window.backgroundAudio&&!window.audioMuted&&G(window.backgroundAudio,.25))},Y=()=>{r.paused?(X&&(clearTimeout(X),X=null),r.play(),t.classList.add("hidden"),window.backgroundAudio&&G(window.backgroundAudio,0),window.audioMuted?(r.volume=0,r.muted=!0):(r.muted=!1,r.volume=U),m(),L()):C()};t.addEventListener("click",Y),r.addEventListener("click",Y),r.addEventListener("ended",()=>{t.classList.remove("hidden"),i.style.opacity="0",i.style.pointerEvents="none",window.backgroundAudio&&!window.audioMuted&&G(window.backgroundAudio,.25)}),r.addEventListener("pause",()=>{t.classList.remove("hidden"),i.style.opacity="0",i.style.pointerEvents="none",window.backgroundAudio&&!window.audioMuted&&G(window.backgroundAudio,.25)}),new IntersectionObserver(ve=>{ve.forEach(ee=>{ee.isIntersecting||Z()})},{threshold:.5}).observe(e);const I=()=>{!r.paused&&!r.ended&&(window.audioMuted?(r.volume=0,r.muted=!0):(r.muted=!1,Cd||(r.volume=U),window.backgroundAudio&&!window.backgroundAudio.paused&&G(window.backgroundAudio,0)),m())},xe=document.querySelector(".sound-toggle");if(xe){xe.addEventListener("click",()=>{setTimeout(()=>{I()},50)}),new MutationObserver(Xe=>{Xe.forEach(qe=>{qe.type==="attributes"&&qe.attributeName==="class"&&setTimeout(()=>{I()},50)})}).observe(xe,{attributes:!0,attributeFilter:["class"]});let ee=window.audioMuted;setInterval(()=>{window.audioMuted!==ee&&(ee=window.audioMuted,I())},500),setTimeout(()=>{I()},1e3)}}function Ir(r){if(r===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return r}function r_(r,e){r.prototype=Object.create(e.prototype),r.prototype.constructor=r,r.__proto__=e}/*!
 * GSAP 3.12.7
 * https://gsap.com
 *
 * @license Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license or for
 * Club GSAP members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/var Ai={autoSleep:120,force3D:"auto",nullTargetWarn:1,units:{lineHeight:""}},xa={duration:.5,overwrite:!1,delay:0},$h,kn,an,ki=1e8,Zt=1/ki,Yf=Math.PI*2,PE=Yf/4,LE=0,s_=Math.sqrt,DE=Math.cos,IE=Math.sin,On=function(e){return typeof e=="string"},hn=function(e){return typeof e=="function"},Yr=function(e){return typeof e=="number"},Kh=function(e){return typeof e>"u"},br=function(e){return typeof e=="object"},ci=function(e){return e!==!1},Zh=function(){return typeof window<"u"},Mc=function(e){return hn(e)||On(e)},o_=typeof ArrayBuffer=="function"&&ArrayBuffer.isView||function(){},qn=Array.isArray,jf=/(?:-?\.?\d|\.)+/gi,a_=/[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,jo=/[-+=.]*\d+[.e-]*\d*[a-z%]*/g,Rd=/[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,l_=/[+-]=-?[.\d]+/,c_=/[^,'"\[\]\s]+/gi,OE=/^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,ln,or,$f,Jh,Ci={},pu={},u_,d_=function(e){return(pu=va(e,Ci))&&mi},Qh=function(e,t){return console.warn("Invalid property",e,"set to",t,"Missing plugin? gsap.registerPlugin()")},Ol=function(e,t){return!t&&console.warn(e)},f_=function(e,t){return e&&(Ci[e]=t)&&pu&&(pu[e]=t)||Ci},Nl=function(){return 0},NE={suppressEvents:!0,isStart:!0,kill:!1},Yc={suppressEvents:!0,kill:!1},FE={suppressEvents:!0},ep={},vs=[],Kf={},h_,bi={},Pd={},o0=30,jc=[],tp="",np=function(e){var t=e[0],n,i;if(br(t)||hn(t)||(e=[e]),!(n=(t._gsap||{}).harness)){for(i=jc.length;i--&&!jc[i].targetTest(t););n=jc[i]}for(i=e.length;i--;)e[i]&&(e[i]._gsap||(e[i]._gsap=new U_(e[i],n)))||e.splice(i,1);return e},eo=function(e){return e._gsap||np(Bi(e))[0]._gsap},p_=function(e,t,n){return(n=e[t])&&hn(n)?e[t]():Kh(n)&&e.getAttribute&&e.getAttribute(t)||n},ui=function(e,t){return(e=e.split(",")).forEach(t)||e},pn=function(e){return Math.round(e*1e5)/1e5||0},wn=function(e){return Math.round(e*1e7)/1e7||0},ea=function(e,t){var n=t.charAt(0),i=parseFloat(t.substr(2));return e=parseFloat(e),n==="+"?e+i:n==="-"?e-i:n==="*"?e*i:e/i},UE=function(e,t){for(var n=t.length,i=0;e.indexOf(t[i])<0&&++i<n;);return i<n},mu=function(){var e=vs.length,t=vs.slice(0),n,i;for(Kf={},vs.length=0,n=0;n<e;n++)i=t[n],i&&i._lazy&&(i.render(i._lazy[0],i._lazy[1],!0)._lazy=0)},m_=function(e,t,n,i){vs.length&&!kn&&mu(),e.render(t,n,kn&&t<0&&(e._initted||e._startAt)),vs.length&&!kn&&mu()},g_=function(e){var t=parseFloat(e);return(t||t===0)&&(e+"").match(c_).length<2?t:On(e)?e.trim():e},__=function(e){return e},Ri=function(e,t){for(var n in t)n in e||(e[n]=t[n]);return e},kE=function(e){return function(t,n){for(var i in n)i in t||i==="duration"&&e||i==="ease"||(t[i]=n[i])}},va=function(e,t){for(var n in t)e[n]=t[n];return e},a0=function r(e,t){for(var n in t)n!=="__proto__"&&n!=="constructor"&&n!=="prototype"&&(e[n]=br(t[n])?r(e[n]||(e[n]={}),t[n]):t[n]);return e},gu=function(e,t){var n={},i;for(i in e)i in t||(n[i]=e[i]);return n},dl=function(e){var t=e.parent||ln,n=e.keyframes?kE(qn(e.keyframes)):Ri;if(ci(e.inherit))for(;t;)n(e,t.vars.defaults),t=t.parent||t._dp;return e},BE=function(e,t){for(var n=e.length,i=n===t.length;i&&n--&&e[n]===t[n];);return n<0},x_=function(e,t,n,i,s){var o=e[i],a;if(s)for(a=t[s];o&&o[s]>a;)o=o._prev;return o?(t._next=o._next,o._next=t):(t._next=e[n],e[n]=t),t._next?t._next._prev=t:e[i]=t,t._prev=o,t.parent=t._dp=e,t},Nu=function(e,t,n,i){n===void 0&&(n="_first"),i===void 0&&(i="_last");var s=t._prev,o=t._next;s?s._next=o:e[n]===t&&(e[n]=o),o?o._prev=s:e[i]===t&&(e[i]=s),t._next=t._prev=t.parent=null},Ms=function(e,t){e.parent&&(!t||e.parent.autoRemoveChildren)&&e.parent.remove&&e.parent.remove(e),e._act=0},to=function(e,t){if(e&&(!t||t._end>e._dur||t._start<0))for(var n=e;n;)n._dirty=1,n=n.parent;return e},zE=function(e){for(var t=e.parent;t&&t.parent;)t._dirty=1,t.totalDuration(),t=t.parent;return e},Zf=function(e,t,n,i){return e._startAt&&(kn?e._startAt.revert(Yc):e.vars.immediateRender&&!e.vars.autoRevert||e._startAt.render(t,!0,i))},VE=function r(e){return!e||e._ts&&r(e.parent)},l0=function(e){return e._repeat?ya(e._tTime,e=e.duration()+e._rDelay)*e:0},ya=function(e,t){var n=Math.floor(e=wn(e/t));return e&&n===e?n-1:n},_u=function(e,t){return(e-t._start)*t._ts+(t._ts>=0?0:t._dirty?t.totalDuration():t._tDur)},Fu=function(e){return e._end=wn(e._start+(e._tDur/Math.abs(e._ts||e._rts||Zt)||0))},Uu=function(e,t){var n=e._dp;return n&&n.smoothChildTiming&&e._ts&&(e._start=wn(n._time-(e._ts>0?t/e._ts:((e._dirty?e.totalDuration():e._tDur)-t)/-e._ts)),Fu(e),n._dirty||to(n,e)),e},v_=function(e,t){var n;if((t._time||!t._dur&&t._initted||t._start<e._time&&(t._dur||!t.add))&&(n=_u(e.rawTime(),t),(!t._dur||Yl(0,t.totalDuration(),n)-t._tTime>Zt)&&t.render(n,!0)),to(e,t)._dp&&e._initted&&e._time>=e._dur&&e._ts){if(e._dur<e.duration())for(n=e;n._dp;)n.rawTime()>=0&&n.totalTime(n._tTime),n=n._dp;e._zTime=-Zt}},cr=function(e,t,n,i){return t.parent&&Ms(t),t._start=wn((Yr(n)?n:n||e!==ln?Li(e,n,t):e._time)+t._delay),t._end=wn(t._start+(t.totalDuration()/Math.abs(t.timeScale())||0)),x_(e,t,"_first","_last",e._sort?"_start":0),Jf(t)||(e._recent=t),i||v_(e,t),e._ts<0&&Uu(e,e._tTime),e},y_=function(e,t){return(Ci.ScrollTrigger||Qh("scrollTrigger",t))&&Ci.ScrollTrigger.create(t,e)},b_=function(e,t,n,i,s){if(rp(e,t,s),!e._initted)return 1;if(!n&&e._pt&&!kn&&(e._dur&&e.vars.lazy!==!1||!e._dur&&e.vars.lazy)&&h_!==wi.frame)return vs.push(e),e._lazy=[s,i],1},HE=function r(e){var t=e.parent;return t&&t._ts&&t._initted&&!t._lock&&(t.rawTime()<0||r(t))},Jf=function(e){var t=e.data;return t==="isFromStart"||t==="isStart"},GE=function(e,t,n,i){var s=e.ratio,o=t<0||!t&&(!e._start&&HE(e)&&!(!e._initted&&Jf(e))||(e._ts<0||e._dp._ts<0)&&!Jf(e))?0:1,a=e._rDelay,l=0,c,u,d;if(a&&e._repeat&&(l=Yl(0,e._tDur,t),u=ya(l,a),e._yoyo&&u&1&&(o=1-o),u!==ya(e._tTime,a)&&(s=1-o,e.vars.repeatRefresh&&e._initted&&e.invalidate())),o!==s||kn||i||e._zTime===Zt||!t&&e._zTime){if(!e._initted&&b_(e,t,i,n,l))return;for(d=e._zTime,e._zTime=t||(n?Zt:0),n||(n=t&&!d),e.ratio=o,e._from&&(o=1-o),e._time=0,e._tTime=l,c=e._pt;c;)c.r(o,c.d),c=c._next;t<0&&Zf(e,t,n,!0),e._onUpdate&&!n&&Ei(e,"onUpdate"),l&&e._repeat&&!n&&e.parent&&Ei(e,"onRepeat"),(t>=e._tDur||t<0)&&e.ratio===o&&(o&&Ms(e,1),!n&&!kn&&(Ei(e,o?"onComplete":"onReverseComplete",!0),e._prom&&e._prom()))}else e._zTime||(e._zTime=t)},WE=function(e,t,n){var i;if(n>t)for(i=e._first;i&&i._start<=n;){if(i.data==="isPause"&&i._start>t)return i;i=i._next}else for(i=e._last;i&&i._start>=n;){if(i.data==="isPause"&&i._start<t)return i;i=i._prev}},ba=function(e,t,n,i){var s=e._repeat,o=wn(t)||0,a=e._tTime/e._tDur;return a&&!i&&(e._time*=o/e._dur),e._dur=o,e._tDur=s?s<0?1e10:wn(o*(s+1)+e._rDelay*s):o,a>0&&!i&&Uu(e,e._tTime=e._tDur*a),e.parent&&Fu(e),n||to(e.parent,e),e},c0=function(e){return e instanceof ni?to(e):ba(e,e._dur)},XE={_start:0,endTime:Nl,totalDuration:Nl},Li=function r(e,t,n){var i=e.labels,s=e._recent||XE,o=e.duration()>=ki?s.endTime(!1):e._dur,a,l,c;return On(t)&&(isNaN(t)||t in i)?(l=t.charAt(0),c=t.substr(-1)==="%",a=t.indexOf("="),l==="<"||l===">"?(a>=0&&(t=t.replace(/=/,"")),(l==="<"?s._start:s.endTime(s._repeat>=0))+(parseFloat(t.substr(1))||0)*(c?(a<0?s:n).totalDuration()/100:1)):a<0?(t in i||(i[t]=o),i[t]):(l=parseFloat(t.charAt(a-1)+t.substr(a+1)),c&&n&&(l=l/100*(qn(n)?n[0]:n).totalDuration()),a>1?r(e,t.substr(0,a-1),n)+l:o+l)):t==null?o:+t},fl=function(e,t,n){var i=Yr(t[1]),s=(i?2:1)+(e<2?0:1),o=t[s],a,l;if(i&&(o.duration=t[1]),o.parent=n,e){for(a=o,l=n;l&&!("immediateRender"in a);)a=l.vars.defaults||{},l=ci(l.vars.inherit)&&l.parent;o.immediateRender=ci(a.immediateRender),e<2?o.runBackwards=1:o.startAt=t[s-1]}return new bn(t[0],o,t[s+1])},Ps=function(e,t){return e||e===0?t(e):t},Yl=function(e,t,n){return n<e?e:n>t?t:n},Wn=function(e,t){return!On(e)||!(t=OE.exec(e))?"":t[1]},qE=function(e,t,n){return Ps(n,function(i){return Yl(e,t,i)})},Qf=[].slice,S_=function(e,t){return e&&br(e)&&"length"in e&&(!t&&!e.length||e.length-1 in e&&br(e[0]))&&!e.nodeType&&e!==or},YE=function(e,t,n){return n===void 0&&(n=[]),e.forEach(function(i){var s;return On(i)&&!t||S_(i,1)?(s=n).push.apply(s,Bi(i)):n.push(i)})||n},Bi=function(e,t,n){return an&&!t&&an.selector?an.selector(e):On(e)&&!n&&($f||!Sa())?Qf.call((t||Jh).querySelectorAll(e),0):qn(e)?YE(e,n):S_(e)?Qf.call(e,0):e?[e]:[]},eh=function(e){return e=Bi(e)[0]||Ol("Invalid scope")||{},function(t){var n=e.current||e.nativeElement||e;return Bi(t,n.querySelectorAll?n:n===e?Ol("Invalid scope")||Jh.createElement("div"):e)}},w_=function(e){return e.sort(function(){return .5-Math.random()})},M_=function(e){if(hn(e))return e;var t=br(e)?e:{each:e},n=no(t.ease),i=t.from||0,s=parseFloat(t.base)||0,o={},a=i>0&&i<1,l=isNaN(i)||a,c=t.axis,u=i,d=i;return On(i)?u=d={center:.5,edges:.5,end:1}[i]||0:!a&&l&&(u=i[0],d=i[1]),function(f,h,_){var g=(_||t).length,m=o[g],p,y,v,x,E,b,S,P,w;if(!m){if(w=t.grid==="auto"?0:(t.grid||[1,ki])[1],!w){for(S=-ki;S<(S=_[w++].getBoundingClientRect().left)&&w<g;);w<g&&w--}for(m=o[g]=[],p=l?Math.min(w,g)*u-.5:i%w,y=w===ki?0:l?g*d/w-.5:i/w|0,S=0,P=ki,b=0;b<g;b++)v=b%w-p,x=y-(b/w|0),m[b]=E=c?Math.abs(c==="y"?x:v):s_(v*v+x*x),E>S&&(S=E),E<P&&(P=E);i==="random"&&w_(m),m.max=S-P,m.min=P,m.v=g=(parseFloat(t.amount)||parseFloat(t.each)*(w>g?g-1:c?c==="y"?g/w:w:Math.max(w,g/w))||0)*(i==="edges"?-1:1),m.b=g<0?s-g:s,m.u=Wn(t.amount||t.each)||0,n=n&&g<0?O_(n):n}return g=(m[f]-m.min)/m.max||0,wn(m.b+(n?n(g):g)*m.v)+m.u}},th=function(e){var t=Math.pow(10,((e+"").split(".")[1]||"").length);return function(n){var i=wn(Math.round(parseFloat(n)/e)*e*t);return(i-i%1)/t+(Yr(n)?0:Wn(n))}},T_=function(e,t){var n=qn(e),i,s;return!n&&br(e)&&(i=n=e.radius||ki,e.values?(e=Bi(e.values),(s=!Yr(e[0]))&&(i*=i)):e=th(e.increment)),Ps(t,n?hn(e)?function(o){return s=e(o),Math.abs(s-o)<=i?s:o}:function(o){for(var a=parseFloat(s?o.x:o),l=parseFloat(s?o.y:0),c=ki,u=0,d=e.length,f,h;d--;)s?(f=e[d].x-a,h=e[d].y-l,f=f*f+h*h):f=Math.abs(e[d]-a),f<c&&(c=f,u=d);return u=!i||c<=i?e[u]:o,s||u===o||Yr(o)?u:u+Wn(o)}:th(e))},E_=function(e,t,n,i){return Ps(qn(e)?!t:n===!0?!!(n=0):!i,function(){return qn(e)?e[~~(Math.random()*e.length)]:(n=n||1e-5)&&(i=n<1?Math.pow(10,(n+"").length-2):1)&&Math.floor(Math.round((e-n/2+Math.random()*(t-e+n*.99))/n)*n*i)/i})},jE=function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return function(i){return t.reduce(function(s,o){return o(s)},i)}},$E=function(e,t){return function(n){return e(parseFloat(n))+(t||Wn(n))}},KE=function(e,t,n){return C_(e,t,0,1,n)},A_=function(e,t,n){return Ps(n,function(i){return e[~~t(i)]})},ZE=function r(e,t,n){var i=t-e;return qn(e)?A_(e,r(0,e.length),t):Ps(n,function(s){return(i+(s-e)%i)%i+e})},JE=function r(e,t,n){var i=t-e,s=i*2;return qn(e)?A_(e,r(0,e.length-1),t):Ps(n,function(o){return o=(s+(o-e)%s)%s||0,e+(o>i?s-o:o)})},Fl=function(e){for(var t=0,n="",i,s,o,a;~(i=e.indexOf("random(",t));)o=e.indexOf(")",i),a=e.charAt(i+7)==="[",s=e.substr(i+7,o-i-7).match(a?c_:jf),n+=e.substr(t,i-t)+E_(a?s:+s[0],a?0:+s[1],+s[2]||1e-5),t=o+1;return n+e.substr(t,e.length-t)},C_=function(e,t,n,i,s){var o=t-e,a=i-n;return Ps(s,function(l){return n+((l-e)/o*a||0)})},QE=function r(e,t,n,i){var s=isNaN(e+t)?0:function(h){return(1-h)*e+h*t};if(!s){var o=On(e),a={},l,c,u,d,f;if(n===!0&&(i=1)&&(n=null),o)e={p:e},t={p:t};else if(qn(e)&&!qn(t)){for(u=[],d=e.length,f=d-2,c=1;c<d;c++)u.push(r(e[c-1],e[c]));d--,s=function(_){_*=d;var g=Math.min(f,~~_);return u[g](_-g)},n=t}else i||(e=va(qn(e)?[]:{},e));if(!u){for(l in t)ip.call(a,e,l,"get",t[l]);s=function(_){return ap(_,a)||(o?e.p:e)}}}return Ps(n,s)},u0=function(e,t,n){var i=e.labels,s=ki,o,a,l;for(o in i)a=i[o]-t,a<0==!!n&&a&&s>(a=Math.abs(a))&&(l=o,s=a);return l},Ei=function(e,t,n){var i=e.vars,s=i[t],o=an,a=e._ctx,l,c,u;if(s)return l=i[t+"Params"],c=i.callbackScope||e,n&&vs.length&&mu(),a&&(an=a),u=l?s.apply(c,l):s.call(c),an=o,u},Ka=function(e){return Ms(e),e.scrollTrigger&&e.scrollTrigger.kill(!!kn),e.progress()<1&&Ei(e,"onInterrupt"),e},$o,R_=[],P_=function(e){if(e)if(e=!e.name&&e.default||e,Zh()||e.headless){var t=e.name,n=hn(e),i=t&&!n&&e.init?function(){this._props=[]}:e,s={init:Nl,render:ap,add:ip,kill:mA,modifier:pA,rawVars:0},o={targetTest:0,get:0,getSetter:op,aliases:{},register:0};if(Sa(),e!==i){if(bi[t])return;Ri(i,Ri(gu(e,s),o)),va(i.prototype,va(s,gu(e,o))),bi[i.prop=t]=i,e.targetTest&&(jc.push(i),ep[t]=1),t=(t==="css"?"CSS":t.charAt(0).toUpperCase()+t.substr(1))+"Plugin"}f_(t,i),e.register&&e.register(mi,i,di)}else R_.push(e)},Kt=255,Za={aqua:[0,Kt,Kt],lime:[0,Kt,0],silver:[192,192,192],black:[0,0,0],maroon:[128,0,0],teal:[0,128,128],blue:[0,0,Kt],navy:[0,0,128],white:[Kt,Kt,Kt],olive:[128,128,0],yellow:[Kt,Kt,0],orange:[Kt,165,0],gray:[128,128,128],purple:[128,0,128],green:[0,128,0],red:[Kt,0,0],pink:[Kt,192,203],cyan:[0,Kt,Kt],transparent:[Kt,Kt,Kt,0]},Ld=function(e,t,n){return e+=e<0?1:e>1?-1:0,(e*6<1?t+(n-t)*e*6:e<.5?n:e*3<2?t+(n-t)*(2/3-e)*6:t)*Kt+.5|0},L_=function(e,t,n){var i=e?Yr(e)?[e>>16,e>>8&Kt,e&Kt]:0:Za.black,s,o,a,l,c,u,d,f,h,_;if(!i){if(e.substr(-1)===","&&(e=e.substr(0,e.length-1)),Za[e])i=Za[e];else if(e.charAt(0)==="#"){if(e.length<6&&(s=e.charAt(1),o=e.charAt(2),a=e.charAt(3),e="#"+s+s+o+o+a+a+(e.length===5?e.charAt(4)+e.charAt(4):"")),e.length===9)return i=parseInt(e.substr(1,6),16),[i>>16,i>>8&Kt,i&Kt,parseInt(e.substr(7),16)/255];e=parseInt(e.substr(1),16),i=[e>>16,e>>8&Kt,e&Kt]}else if(e.substr(0,3)==="hsl"){if(i=_=e.match(jf),!t)l=+i[0]%360/360,c=+i[1]/100,u=+i[2]/100,o=u<=.5?u*(c+1):u+c-u*c,s=u*2-o,i.length>3&&(i[3]*=1),i[0]=Ld(l+1/3,s,o),i[1]=Ld(l,s,o),i[2]=Ld(l-1/3,s,o);else if(~e.indexOf("="))return i=e.match(a_),n&&i.length<4&&(i[3]=1),i}else i=e.match(jf)||Za.transparent;i=i.map(Number)}return t&&!_&&(s=i[0]/Kt,o=i[1]/Kt,a=i[2]/Kt,d=Math.max(s,o,a),f=Math.min(s,o,a),u=(d+f)/2,d===f?l=c=0:(h=d-f,c=u>.5?h/(2-d-f):h/(d+f),l=d===s?(o-a)/h+(o<a?6:0):d===o?(a-s)/h+2:(s-o)/h+4,l*=60),i[0]=~~(l+.5),i[1]=~~(c*100+.5),i[2]=~~(u*100+.5)),n&&i.length<4&&(i[3]=1),i},D_=function(e){var t=[],n=[],i=-1;return e.split(ys).forEach(function(s){var o=s.match(jo)||[];t.push.apply(t,o),n.push(i+=o.length+1)}),t.c=n,t},d0=function(e,t,n){var i="",s=(e+i).match(ys),o=t?"hsla(":"rgba(",a=0,l,c,u,d;if(!s)return e;if(s=s.map(function(f){return(f=L_(f,t,1))&&o+(t?f[0]+","+f[1]+"%,"+f[2]+"%,"+f[3]:f.join(","))+")"}),n&&(u=D_(e),l=n.c,l.join(i)!==u.c.join(i)))for(c=e.replace(ys,"1").split(jo),d=c.length-1;a<d;a++)i+=c[a]+(~l.indexOf(a)?s.shift()||o+"0,0,0,0)":(u.length?u:s.length?s:n).shift());if(!c)for(c=e.split(ys),d=c.length-1;a<d;a++)i+=c[a]+s[a];return i+c[d]},ys=(function(){var r="(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b",e;for(e in Za)r+="|"+e+"\\b";return new RegExp(r+")","gi")})(),eA=/hsl[a]?\(/,I_=function(e){var t=e.join(" "),n;if(ys.lastIndex=0,ys.test(t))return n=eA.test(t),e[1]=d0(e[1],n),e[0]=d0(e[0],n,D_(e[1])),!0},Ul,wi=(function(){var r=Date.now,e=500,t=33,n=r(),i=n,s=1e3/240,o=s,a=[],l,c,u,d,f,h,_=function g(m){var p=r()-i,y=m===!0,v,x,E,b;if((p>e||p<0)&&(n+=p-t),i+=p,E=i-n,v=E-o,(v>0||y)&&(b=++d.frame,f=E-d.time*1e3,d.time=E=E/1e3,o+=v+(v>=s?4:s-v),x=1),y||(l=c(g)),x)for(h=0;h<a.length;h++)a[h](E,f,b,m)};return d={time:0,frame:0,tick:function(){_(!0)},deltaRatio:function(m){return f/(1e3/(m||60))},wake:function(){u_&&(!$f&&Zh()&&(or=$f=window,Jh=or.document||{},Ci.gsap=mi,(or.gsapVersions||(or.gsapVersions=[])).push(mi.version),d_(pu||or.GreenSockGlobals||!or.gsap&&or||{}),R_.forEach(P_)),u=typeof requestAnimationFrame<"u"&&requestAnimationFrame,l&&d.sleep(),c=u||function(m){return setTimeout(m,o-d.time*1e3+1|0)},Ul=1,_(2))},sleep:function(){(u?cancelAnimationFrame:clearTimeout)(l),Ul=0,c=Nl},lagSmoothing:function(m,p){e=m||1/0,t=Math.min(p||33,e)},fps:function(m){s=1e3/(m||240),o=d.time*1e3+s},add:function(m,p,y){var v=p?function(x,E,b,S){m(x,E,b,S),d.remove(v)}:m;return d.remove(m),a[y?"unshift":"push"](v),Sa(),v},remove:function(m,p){~(p=a.indexOf(m))&&a.splice(p,1)&&h>=p&&h--},_listeners:a},d})(),Sa=function(){return!Ul&&wi.wake()},Ot={},tA=/^[\d.\-M][\d.\-,\s]/,nA=/["']/g,iA=function(e){for(var t={},n=e.substr(1,e.length-3).split(":"),i=n[0],s=1,o=n.length,a,l,c;s<o;s++)l=n[s],a=s!==o-1?l.lastIndexOf(","):l.length,c=l.substr(0,a),t[i]=isNaN(c)?c.replace(nA,"").trim():+c,i=l.substr(a+1).trim();return t},rA=function(e){var t=e.indexOf("(")+1,n=e.indexOf(")"),i=e.indexOf("(",t);return e.substring(t,~i&&i<n?e.indexOf(")",n+1):n)},sA=function(e){var t=(e+"").split("("),n=Ot[t[0]];return n&&t.length>1&&n.config?n.config.apply(null,~e.indexOf("{")?[iA(t[1])]:rA(e).split(",").map(g_)):Ot._CE&&tA.test(e)?Ot._CE("",e):n},O_=function(e){return function(t){return 1-e(1-t)}},N_=function r(e,t){for(var n=e._first,i;n;)n instanceof ni?r(n,t):n.vars.yoyoEase&&(!n._yoyo||!n._repeat)&&n._yoyo!==t&&(n.timeline?r(n.timeline,t):(i=n._ease,n._ease=n._yEase,n._yEase=i,n._yoyo=t)),n=n._next},no=function(e,t){return e&&(hn(e)?e:Ot[e]||sA(e))||t},xo=function(e,t,n,i){n===void 0&&(n=function(l){return 1-t(1-l)}),i===void 0&&(i=function(l){return l<.5?t(l*2)/2:1-t((1-l)*2)/2});var s={easeIn:t,easeOut:n,easeInOut:i},o;return ui(e,function(a){Ot[a]=Ci[a]=s,Ot[o=a.toLowerCase()]=n;for(var l in s)Ot[o+(l==="easeIn"?".in":l==="easeOut"?".out":".inOut")]=Ot[a+"."+l]=s[l]}),s},F_=function(e){return function(t){return t<.5?(1-e(1-t*2))/2:.5+e((t-.5)*2)/2}},Dd=function r(e,t,n){var i=t>=1?t:1,s=(n||(e?.3:.45))/(t<1?t:1),o=s/Yf*(Math.asin(1/i)||0),a=function(u){return u===1?1:i*Math.pow(2,-10*u)*IE((u-o)*s)+1},l=e==="out"?a:e==="in"?function(c){return 1-a(1-c)}:F_(a);return s=Yf/s,l.config=function(c,u){return r(e,c,u)},l},Id=function r(e,t){t===void 0&&(t=1.70158);var n=function(o){return o?--o*o*((t+1)*o+t)+1:0},i=e==="out"?n:e==="in"?function(s){return 1-n(1-s)}:F_(n);return i.config=function(s){return r(e,s)},i};ui("Linear,Quad,Cubic,Quart,Quint,Strong",function(r,e){var t=e<5?e+1:e;xo(r+",Power"+(t-1),e?function(n){return Math.pow(n,t)}:function(n){return n},function(n){return 1-Math.pow(1-n,t)},function(n){return n<.5?Math.pow(n*2,t)/2:1-Math.pow((1-n)*2,t)/2})});Ot.Linear.easeNone=Ot.none=Ot.Linear.easeIn;xo("Elastic",Dd("in"),Dd("out"),Dd());(function(r,e){var t=1/e,n=2*t,i=2.5*t,s=function(a){return a<t?r*a*a:a<n?r*Math.pow(a-1.5/e,2)+.75:a<i?r*(a-=2.25/e)*a+.9375:r*Math.pow(a-2.625/e,2)+.984375};xo("Bounce",function(o){return 1-s(1-o)},s)})(7.5625,2.75);xo("Expo",function(r){return Math.pow(2,10*(r-1))*r+r*r*r*r*r*r*(1-r)});xo("Circ",function(r){return-(s_(1-r*r)-1)});xo("Sine",function(r){return r===1?1:-DE(r*PE)+1});xo("Back",Id("in"),Id("out"),Id());Ot.SteppedEase=Ot.steps=Ci.SteppedEase={config:function(e,t){e===void 0&&(e=1);var n=1/e,i=e+(t?0:1),s=t?1:0,o=1-Zt;return function(a){return((i*Yl(0,o,a)|0)+s)*n}}};xa.ease=Ot["quad.out"];ui("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt",function(r){return tp+=r+","+r+"Params,"});var U_=function(e,t){this.id=LE++,e._gsap=this,this.target=e,this.harness=t,this.get=t?t.get:p_,this.set=t?t.getSetter:op},kl=(function(){function r(t){this.vars=t,this._delay=+t.delay||0,(this._repeat=t.repeat===1/0?-2:t.repeat||0)&&(this._rDelay=t.repeatDelay||0,this._yoyo=!!t.yoyo||!!t.yoyoEase),this._ts=1,ba(this,+t.duration,1,1),this.data=t.data,an&&(this._ctx=an,an.data.push(this)),Ul||wi.wake()}var e=r.prototype;return e.delay=function(n){return n||n===0?(this.parent&&this.parent.smoothChildTiming&&this.startTime(this._start+n-this._delay),this._delay=n,this):this._delay},e.duration=function(n){return arguments.length?this.totalDuration(this._repeat>0?n+(n+this._rDelay)*this._repeat:n):this.totalDuration()&&this._dur},e.totalDuration=function(n){return arguments.length?(this._dirty=0,ba(this,this._repeat<0?n:(n-this._repeat*this._rDelay)/(this._repeat+1))):this._tDur},e.totalTime=function(n,i){if(Sa(),!arguments.length)return this._tTime;var s=this._dp;if(s&&s.smoothChildTiming&&this._ts){for(Uu(this,n),!s._dp||s.parent||v_(s,this);s&&s.parent;)s.parent._time!==s._start+(s._ts>=0?s._tTime/s._ts:(s.totalDuration()-s._tTime)/-s._ts)&&s.totalTime(s._tTime,!0),s=s.parent;!this.parent&&this._dp.autoRemoveChildren&&(this._ts>0&&n<this._tDur||this._ts<0&&n>0||!this._tDur&&!n)&&cr(this._dp,this,this._start-this._delay)}return(this._tTime!==n||!this._dur&&!i||this._initted&&Math.abs(this._zTime)===Zt||!n&&!this._initted&&(this.add||this._ptLookup))&&(this._ts||(this._pTime=n),m_(this,n,i)),this},e.time=function(n,i){return arguments.length?this.totalTime(Math.min(this.totalDuration(),n+l0(this))%(this._dur+this._rDelay)||(n?this._dur:0),i):this._time},e.totalProgress=function(n,i){return arguments.length?this.totalTime(this.totalDuration()*n,i):this.totalDuration()?Math.min(1,this._tTime/this._tDur):this.rawTime()>=0&&this._initted?1:0},e.progress=function(n,i){return arguments.length?this.totalTime(this.duration()*(this._yoyo&&!(this.iteration()&1)?1-n:n)+l0(this),i):this.duration()?Math.min(1,this._time/this._dur):this.rawTime()>0?1:0},e.iteration=function(n,i){var s=this.duration()+this._rDelay;return arguments.length?this.totalTime(this._time+(n-1)*s,i):this._repeat?ya(this._tTime,s)+1:1},e.timeScale=function(n,i){if(!arguments.length)return this._rts===-Zt?0:this._rts;if(this._rts===n)return this;var s=this.parent&&this._ts?_u(this.parent._time,this):this._tTime;return this._rts=+n||0,this._ts=this._ps||n===-Zt?0:this._rts,this.totalTime(Yl(-Math.abs(this._delay),this._tDur,s),i!==!1),Fu(this),zE(this)},e.paused=function(n){return arguments.length?(this._ps!==n&&(this._ps=n,n?(this._pTime=this._tTime||Math.max(-this._delay,this.rawTime()),this._ts=this._act=0):(Sa(),this._ts=this._rts,this.totalTime(this.parent&&!this.parent.smoothChildTiming?this.rawTime():this._tTime||this._pTime,this.progress()===1&&Math.abs(this._zTime)!==Zt&&(this._tTime-=Zt)))),this):this._ps},e.startTime=function(n){if(arguments.length){this._start=n;var i=this.parent||this._dp;return i&&(i._sort||!this.parent)&&cr(i,this,n-this._delay),this}return this._start},e.endTime=function(n){return this._start+(ci(n)?this.totalDuration():this.duration())/Math.abs(this._ts||1)},e.rawTime=function(n){var i=this.parent||this._dp;return i?n&&(!this._ts||this._repeat&&this._time&&this.totalProgress()<1)?this._tTime%(this._dur+this._rDelay):this._ts?_u(i.rawTime(n),this):this._tTime:this._tTime},e.revert=function(n){n===void 0&&(n=FE);var i=kn;return kn=n,(this._initted||this._startAt)&&(this.timeline&&this.timeline.revert(n),this.totalTime(-.01,n.suppressEvents)),this.data!=="nested"&&n.kill!==!1&&this.kill(),kn=i,this},e.globalTime=function(n){for(var i=this,s=arguments.length?n:i.rawTime();i;)s=i._start+s/(Math.abs(i._ts)||1),i=i._dp;return!this.parent&&this._sat?this._sat.globalTime(n):s},e.repeat=function(n){return arguments.length?(this._repeat=n===1/0?-2:n,c0(this)):this._repeat===-2?1/0:this._repeat},e.repeatDelay=function(n){if(arguments.length){var i=this._time;return this._rDelay=n,c0(this),i?this.time(i):this}return this._rDelay},e.yoyo=function(n){return arguments.length?(this._yoyo=n,this):this._yoyo},e.seek=function(n,i){return this.totalTime(Li(this,n),ci(i))},e.restart=function(n,i){return this.play().totalTime(n?-this._delay:0,ci(i)),this._dur||(this._zTime=-Zt),this},e.play=function(n,i){return n!=null&&this.seek(n,i),this.reversed(!1).paused(!1)},e.reverse=function(n,i){return n!=null&&this.seek(n||this.totalDuration(),i),this.reversed(!0).paused(!1)},e.pause=function(n,i){return n!=null&&this.seek(n,i),this.paused(!0)},e.resume=function(){return this.paused(!1)},e.reversed=function(n){return arguments.length?(!!n!==this.reversed()&&this.timeScale(-this._rts||(n?-Zt:0)),this):this._rts<0},e.invalidate=function(){return this._initted=this._act=0,this._zTime=-Zt,this},e.isActive=function(){var n=this.parent||this._dp,i=this._start,s;return!!(!n||this._ts&&this._initted&&n.isActive()&&(s=n.rawTime(!0))>=i&&s<this.endTime(!0)-Zt)},e.eventCallback=function(n,i,s){var o=this.vars;return arguments.length>1?(i?(o[n]=i,s&&(o[n+"Params"]=s),n==="onUpdate"&&(this._onUpdate=i)):delete o[n],this):o[n]},e.then=function(n){var i=this;return new Promise(function(s){var o=hn(n)?n:__,a=function(){var c=i.then;i.then=null,hn(o)&&(o=o(i))&&(o.then||o===i)&&(i.then=c),s(o),i.then=c};i._initted&&i.totalProgress()===1&&i._ts>=0||!i._tTime&&i._ts<0?a():i._prom=a})},e.kill=function(){Ka(this)},r})();Ri(kl.prototype,{_time:0,_start:0,_end:0,_tTime:0,_tDur:0,_dirty:0,_repeat:0,_yoyo:!1,parent:null,_initted:!1,_rDelay:0,_ts:1,_dp:0,ratio:0,_zTime:-Zt,_prom:0,_ps:!1,_rts:1});var ni=(function(r){r_(e,r);function e(n,i){var s;return n===void 0&&(n={}),s=r.call(this,n)||this,s.labels={},s.smoothChildTiming=!!n.smoothChildTiming,s.autoRemoveChildren=!!n.autoRemoveChildren,s._sort=ci(n.sortChildren),ln&&cr(n.parent||ln,Ir(s),i),n.reversed&&s.reverse(),n.paused&&s.paused(!0),n.scrollTrigger&&y_(Ir(s),n.scrollTrigger),s}var t=e.prototype;return t.to=function(i,s,o){return fl(0,arguments,this),this},t.from=function(i,s,o){return fl(1,arguments,this),this},t.fromTo=function(i,s,o,a){return fl(2,arguments,this),this},t.set=function(i,s,o){return s.duration=0,s.parent=this,dl(s).repeatDelay||(s.repeat=0),s.immediateRender=!!s.immediateRender,new bn(i,s,Li(this,o),1),this},t.call=function(i,s,o){return cr(this,bn.delayedCall(0,i,s),o)},t.staggerTo=function(i,s,o,a,l,c,u){return o.duration=s,o.stagger=o.stagger||a,o.onComplete=c,o.onCompleteParams=u,o.parent=this,new bn(i,o,Li(this,l)),this},t.staggerFrom=function(i,s,o,a,l,c,u){return o.runBackwards=1,dl(o).immediateRender=ci(o.immediateRender),this.staggerTo(i,s,o,a,l,c,u)},t.staggerFromTo=function(i,s,o,a,l,c,u,d){return a.startAt=o,dl(a).immediateRender=ci(a.immediateRender),this.staggerTo(i,s,a,l,c,u,d)},t.render=function(i,s,o){var a=this._time,l=this._dirty?this.totalDuration():this._tDur,c=this._dur,u=i<=0?0:wn(i),d=this._zTime<0!=i<0&&(this._initted||!c),f,h,_,g,m,p,y,v,x,E,b,S;if(this!==ln&&u>l&&i>=0&&(u=l),u!==this._tTime||o||d){if(a!==this._time&&c&&(u+=this._time-a,i+=this._time-a),f=u,x=this._start,v=this._ts,p=!v,d&&(c||(a=this._zTime),(i||!s)&&(this._zTime=i)),this._repeat){if(b=this._yoyo,m=c+this._rDelay,this._repeat<-1&&i<0)return this.totalTime(m*100+i,s,o);if(f=wn(u%m),u===l?(g=this._repeat,f=c):(E=wn(u/m),g=~~E,g&&g===E&&(f=c,g--),f>c&&(f=c)),E=ya(this._tTime,m),!a&&this._tTime&&E!==g&&this._tTime-E*m-this._dur<=0&&(E=g),b&&g&1&&(f=c-f,S=1),g!==E&&!this._lock){var P=b&&E&1,w=P===(b&&g&1);if(g<E&&(P=!P),a=P?0:u%c?c:u,this._lock=1,this.render(a||(S?0:wn(g*m)),s,!c)._lock=0,this._tTime=u,!s&&this.parent&&Ei(this,"onRepeat"),this.vars.repeatRefresh&&!S&&(this.invalidate()._lock=1),a&&a!==this._time||p!==!this._ts||this.vars.onRepeat&&!this.parent&&!this._act)return this;if(c=this._dur,l=this._tDur,w&&(this._lock=2,a=P?c:-1e-4,this.render(a,!0),this.vars.repeatRefresh&&!S&&this.invalidate()),this._lock=0,!this._ts&&!p)return this;N_(this,S)}}if(this._hasPause&&!this._forcing&&this._lock<2&&(y=WE(this,wn(a),wn(f)),y&&(u-=f-(f=y._start))),this._tTime=u,this._time=f,this._act=!v,this._initted||(this._onUpdate=this.vars.onUpdate,this._initted=1,this._zTime=i,a=0),!a&&f&&!s&&!g&&(Ei(this,"onStart"),this._tTime!==u))return this;if(f>=a&&i>=0)for(h=this._first;h;){if(_=h._next,(h._act||f>=h._start)&&h._ts&&y!==h){if(h.parent!==this)return this.render(i,s,o);if(h.render(h._ts>0?(f-h._start)*h._ts:(h._dirty?h.totalDuration():h._tDur)+(f-h._start)*h._ts,s,o),f!==this._time||!this._ts&&!p){y=0,_&&(u+=this._zTime=-Zt);break}}h=_}else{h=this._last;for(var M=i<0?i:f;h;){if(_=h._prev,(h._act||M<=h._end)&&h._ts&&y!==h){if(h.parent!==this)return this.render(i,s,o);if(h.render(h._ts>0?(M-h._start)*h._ts:(h._dirty?h.totalDuration():h._tDur)+(M-h._start)*h._ts,s,o||kn&&(h._initted||h._startAt)),f!==this._time||!this._ts&&!p){y=0,_&&(u+=this._zTime=M?-Zt:Zt);break}}h=_}}if(y&&!s&&(this.pause(),y.render(f>=a?0:-Zt)._zTime=f>=a?1:-1,this._ts))return this._start=x,Fu(this),this.render(i,s,o);this._onUpdate&&!s&&Ei(this,"onUpdate",!0),(u===l&&this._tTime>=this.totalDuration()||!u&&a)&&(x===this._start||Math.abs(v)!==Math.abs(this._ts))&&(this._lock||((i||!c)&&(u===l&&this._ts>0||!u&&this._ts<0)&&Ms(this,1),!s&&!(i<0&&!a)&&(u||a||!l)&&(Ei(this,u===l&&i>=0?"onComplete":"onReverseComplete",!0),this._prom&&!(u<l&&this.timeScale()>0)&&this._prom())))}return this},t.add=function(i,s){var o=this;if(Yr(s)||(s=Li(this,s,i)),!(i instanceof kl)){if(qn(i))return i.forEach(function(a){return o.add(a,s)}),this;if(On(i))return this.addLabel(i,s);if(hn(i))i=bn.delayedCall(0,i);else return this}return this!==i?cr(this,i,s):this},t.getChildren=function(i,s,o,a){i===void 0&&(i=!0),s===void 0&&(s=!0),o===void 0&&(o=!0),a===void 0&&(a=-ki);for(var l=[],c=this._first;c;)c._start>=a&&(c instanceof bn?s&&l.push(c):(o&&l.push(c),i&&l.push.apply(l,c.getChildren(!0,s,o)))),c=c._next;return l},t.getById=function(i){for(var s=this.getChildren(1,1,1),o=s.length;o--;)if(s[o].vars.id===i)return s[o]},t.remove=function(i){return On(i)?this.removeLabel(i):hn(i)?this.killTweensOf(i):(i.parent===this&&Nu(this,i),i===this._recent&&(this._recent=this._last),to(this))},t.totalTime=function(i,s){return arguments.length?(this._forcing=1,!this._dp&&this._ts&&(this._start=wn(wi.time-(this._ts>0?i/this._ts:(this.totalDuration()-i)/-this._ts))),r.prototype.totalTime.call(this,i,s),this._forcing=0,this):this._tTime},t.addLabel=function(i,s){return this.labels[i]=Li(this,s),this},t.removeLabel=function(i){return delete this.labels[i],this},t.addPause=function(i,s,o){var a=bn.delayedCall(0,s||Nl,o);return a.data="isPause",this._hasPause=1,cr(this,a,Li(this,i))},t.removePause=function(i){var s=this._first;for(i=Li(this,i);s;)s._start===i&&s.data==="isPause"&&Ms(s),s=s._next},t.killTweensOf=function(i,s,o){for(var a=this.getTweensOf(i,o),l=a.length;l--;)us!==a[l]&&a[l].kill(i,s);return this},t.getTweensOf=function(i,s){for(var o=[],a=Bi(i),l=this._first,c=Yr(s),u;l;)l instanceof bn?UE(l._targets,a)&&(c?(!us||l._initted&&l._ts)&&l.globalTime(0)<=s&&l.globalTime(l.totalDuration())>s:!s||l.isActive())&&o.push(l):(u=l.getTweensOf(a,s)).length&&o.push.apply(o,u),l=l._next;return o},t.tweenTo=function(i,s){s=s||{};var o=this,a=Li(o,i),l=s,c=l.startAt,u=l.onStart,d=l.onStartParams,f=l.immediateRender,h,_=bn.to(o,Ri({ease:s.ease||"none",lazy:!1,immediateRender:!1,time:a,overwrite:"auto",duration:s.duration||Math.abs((a-(c&&"time"in c?c.time:o._time))/o.timeScale())||Zt,onStart:function(){if(o.pause(),!h){var m=s.duration||Math.abs((a-(c&&"time"in c?c.time:o._time))/o.timeScale());_._dur!==m&&ba(_,m,0,1).render(_._time,!0,!0),h=1}u&&u.apply(_,d||[])}},s));return f?_.render(0):_},t.tweenFromTo=function(i,s,o){return this.tweenTo(s,Ri({startAt:{time:Li(this,i)}},o))},t.recent=function(){return this._recent},t.nextLabel=function(i){return i===void 0&&(i=this._time),u0(this,Li(this,i))},t.previousLabel=function(i){return i===void 0&&(i=this._time),u0(this,Li(this,i),1)},t.currentLabel=function(i){return arguments.length?this.seek(i,!0):this.previousLabel(this._time+Zt)},t.shiftChildren=function(i,s,o){o===void 0&&(o=0);for(var a=this._first,l=this.labels,c;a;)a._start>=o&&(a._start+=i,a._end+=i),a=a._next;if(s)for(c in l)l[c]>=o&&(l[c]+=i);return to(this)},t.invalidate=function(i){var s=this._first;for(this._lock=0;s;)s.invalidate(i),s=s._next;return r.prototype.invalidate.call(this,i)},t.clear=function(i){i===void 0&&(i=!0);for(var s=this._first,o;s;)o=s._next,this.remove(s),s=o;return this._dp&&(this._time=this._tTime=this._pTime=0),i&&(this.labels={}),to(this)},t.totalDuration=function(i){var s=0,o=this,a=o._last,l=ki,c,u,d;if(arguments.length)return o.timeScale((o._repeat<0?o.duration():o.totalDuration())/(o.reversed()?-i:i));if(o._dirty){for(d=o.parent;a;)c=a._prev,a._dirty&&a.totalDuration(),u=a._start,u>l&&o._sort&&a._ts&&!o._lock?(o._lock=1,cr(o,a,u-a._delay,1)._lock=0):l=u,u<0&&a._ts&&(s-=u,(!d&&!o._dp||d&&d.smoothChildTiming)&&(o._start+=u/o._ts,o._time-=u,o._tTime-=u),o.shiftChildren(-u,!1,-1/0),l=0),a._end>s&&a._ts&&(s=a._end),a=c;ba(o,o===ln&&o._time>s?o._time:s,1,1),o._dirty=0}return o._tDur},e.updateRoot=function(i){if(ln._ts&&(m_(ln,_u(i,ln)),h_=wi.frame),wi.frame>=o0){o0+=Ai.autoSleep||120;var s=ln._first;if((!s||!s._ts)&&Ai.autoSleep&&wi._listeners.length<2){for(;s&&!s._ts;)s=s._next;s||wi.sleep()}}},e})(kl);Ri(ni.prototype,{_lock:0,_hasPause:0,_forcing:0});var oA=function(e,t,n,i,s,o,a){var l=new di(this._pt,e,t,0,1,G_,null,s),c=0,u=0,d,f,h,_,g,m,p,y;for(l.b=n,l.e=i,n+="",i+="",(p=~i.indexOf("random("))&&(i=Fl(i)),o&&(y=[n,i],o(y,e,t),n=y[0],i=y[1]),f=n.match(Rd)||[];d=Rd.exec(i);)_=d[0],g=i.substring(c,d.index),h?h=(h+1)%5:g.substr(-5)==="rgba("&&(h=1),_!==f[u++]&&(m=parseFloat(f[u-1])||0,l._pt={_next:l._pt,p:g||u===1?g:",",s:m,c:_.charAt(1)==="="?ea(m,_)-m:parseFloat(_)-m,m:h&&h<4?Math.round:0},c=Rd.lastIndex);return l.c=c<i.length?i.substring(c,i.length):"",l.fp=a,(l_.test(i)||p)&&(l.e=0),this._pt=l,l},ip=function(e,t,n,i,s,o,a,l,c,u){hn(i)&&(i=i(s||0,e,o));var d=e[t],f=n!=="get"?n:hn(d)?c?e[t.indexOf("set")||!hn(e["get"+t.substr(3)])?t:"get"+t.substr(3)](c):e[t]():d,h=hn(d)?c?dA:V_:sp,_;if(On(i)&&(~i.indexOf("random(")&&(i=Fl(i)),i.charAt(1)==="="&&(_=ea(f,i)+(Wn(f)||0),(_||_===0)&&(i=_))),!u||f!==i||nh)return!isNaN(f*i)&&i!==""?(_=new di(this._pt,e,t,+f||0,i-(f||0),typeof d=="boolean"?hA:H_,0,h),c&&(_.fp=c),a&&_.modifier(a,this,e),this._pt=_):(!d&&!(t in e)&&Qh(t,i),oA.call(this,e,t,f,i,h,l||Ai.stringFilter,c))},aA=function(e,t,n,i,s){if(hn(e)&&(e=hl(e,s,t,n,i)),!br(e)||e.style&&e.nodeType||qn(e)||o_(e))return On(e)?hl(e,s,t,n,i):e;var o={},a;for(a in e)o[a]=hl(e[a],s,t,n,i);return o},k_=function(e,t,n,i,s,o){var a,l,c,u;if(bi[e]&&(a=new bi[e]).init(s,a.rawVars?t[e]:aA(t[e],i,s,o,n),n,i,o)!==!1&&(n._pt=l=new di(n._pt,s,e,0,1,a.render,a,0,a.priority),n!==$o))for(c=n._ptLookup[n._targets.indexOf(s)],u=a._props.length;u--;)c[a._props[u]]=l;return a},us,nh,rp=function r(e,t,n){var i=e.vars,s=i.ease,o=i.startAt,a=i.immediateRender,l=i.lazy,c=i.onUpdate,u=i.runBackwards,d=i.yoyoEase,f=i.keyframes,h=i.autoRevert,_=e._dur,g=e._startAt,m=e._targets,p=e.parent,y=p&&p.data==="nested"?p.vars.targets:m,v=e._overwrite==="auto"&&!$h,x=e.timeline,E,b,S,P,w,M,L,F,G,U,X,Z,C;if(x&&(!f||!s)&&(s="none"),e._ease=no(s,xa.ease),e._yEase=d?O_(no(d===!0?s:d,xa.ease)):0,d&&e._yoyo&&!e._repeat&&(d=e._yEase,e._yEase=e._ease,e._ease=d),e._from=!x&&!!i.runBackwards,!x||f&&!i.stagger){if(F=m[0]?eo(m[0]).harness:0,Z=F&&i[F.prop],E=gu(i,ep),g&&(g._zTime<0&&g.progress(1),t<0&&u&&a&&!h?g.render(-1,!0):g.revert(u&&_?Yc:NE),g._lazy=0),o){if(Ms(e._startAt=bn.set(m,Ri({data:"isStart",overwrite:!1,parent:p,immediateRender:!0,lazy:!g&&ci(l),startAt:null,delay:0,onUpdate:c&&function(){return Ei(e,"onUpdate")},stagger:0},o))),e._startAt._dp=0,e._startAt._sat=e,t<0&&(kn||!a&&!h)&&e._startAt.revert(Yc),a&&_&&t<=0&&n<=0){t&&(e._zTime=t);return}}else if(u&&_&&!g){if(t&&(a=!1),S=Ri({overwrite:!1,data:"isFromStart",lazy:a&&!g&&ci(l),immediateRender:a,stagger:0,parent:p},E),Z&&(S[F.prop]=Z),Ms(e._startAt=bn.set(m,S)),e._startAt._dp=0,e._startAt._sat=e,t<0&&(kn?e._startAt.revert(Yc):e._startAt.render(-1,!0)),e._zTime=t,!a)r(e._startAt,Zt,Zt);else if(!t)return}for(e._pt=e._ptCache=0,l=_&&ci(l)||l&&!_,b=0;b<m.length;b++){if(w=m[b],L=w._gsap||np(m)[b]._gsap,e._ptLookup[b]=U={},Kf[L.id]&&vs.length&&mu(),X=y===m?b:y.indexOf(w),F&&(G=new F).init(w,Z||E,e,X,y)!==!1&&(e._pt=P=new di(e._pt,w,G.name,0,1,G.render,G,0,G.priority),G._props.forEach(function(Y){U[Y]=P}),G.priority&&(M=1)),!F||Z)for(S in E)bi[S]&&(G=k_(S,E,e,X,w,y))?G.priority&&(M=1):U[S]=P=ip.call(e,w,S,"get",E[S],X,y,0,i.stringFilter);e._op&&e._op[b]&&e.kill(w,e._op[b]),v&&e._pt&&(us=e,ln.killTweensOf(w,U,e.globalTime(t)),C=!e.parent,us=0),e._pt&&l&&(Kf[L.id]=1)}M&&W_(e),e._onInit&&e._onInit(e)}e._onUpdate=c,e._initted=(!e._op||e._pt)&&!C,f&&t<=0&&x.render(ki,!0,!0)},lA=function(e,t,n,i,s,o,a,l){var c=(e._pt&&e._ptCache||(e._ptCache={}))[t],u,d,f,h;if(!c)for(c=e._ptCache[t]=[],f=e._ptLookup,h=e._targets.length;h--;){if(u=f[h][t],u&&u.d&&u.d._pt)for(u=u.d._pt;u&&u.p!==t&&u.fp!==t;)u=u._next;if(!u)return nh=1,e.vars[t]="+=0",rp(e,a),nh=0,l?Ol(t+" not eligible for reset"):1;c.push(u)}for(h=c.length;h--;)d=c[h],u=d._pt||d,u.s=(i||i===0)&&!s?i:u.s+(i||0)+o*u.c,u.c=n-u.s,d.e&&(d.e=pn(n)+Wn(d.e)),d.b&&(d.b=u.s+Wn(d.b))},cA=function(e,t){var n=e[0]?eo(e[0]).harness:0,i=n&&n.aliases,s,o,a,l;if(!i)return t;s=va({},t);for(o in i)if(o in s)for(l=i[o].split(","),a=l.length;a--;)s[l[a]]=s[o];return s},uA=function(e,t,n,i){var s=t.ease||i||"power1.inOut",o,a;if(qn(t))a=n[e]||(n[e]=[]),t.forEach(function(l,c){return a.push({t:c/(t.length-1)*100,v:l,e:s})});else for(o in t)a=n[o]||(n[o]=[]),o==="ease"||a.push({t:parseFloat(e),v:t[o],e:s})},hl=function(e,t,n,i,s){return hn(e)?e.call(t,n,i,s):On(e)&&~e.indexOf("random(")?Fl(e):e},B_=tp+"repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,autoRevert",z_={};ui(B_+",id,stagger,delay,duration,paused,scrollTrigger",function(r){return z_[r]=1});var bn=(function(r){r_(e,r);function e(n,i,s,o){var a;typeof i=="number"&&(s.duration=i,i=s,s=null),a=r.call(this,o?i:dl(i))||this;var l=a.vars,c=l.duration,u=l.delay,d=l.immediateRender,f=l.stagger,h=l.overwrite,_=l.keyframes,g=l.defaults,m=l.scrollTrigger,p=l.yoyoEase,y=i.parent||ln,v=(qn(n)||o_(n)?Yr(n[0]):"length"in i)?[n]:Bi(n),x,E,b,S,P,w,M,L;if(a._targets=v.length?np(v):Ol("GSAP target "+n+" not found. https://gsap.com",!Ai.nullTargetWarn)||[],a._ptLookup=[],a._overwrite=h,_||f||Mc(c)||Mc(u)){if(i=a.vars,x=a.timeline=new ni({data:"nested",defaults:g||{},targets:y&&y.data==="nested"?y.vars.targets:v}),x.kill(),x.parent=x._dp=Ir(a),x._start=0,f||Mc(c)||Mc(u)){if(S=v.length,M=f&&M_(f),br(f))for(P in f)~B_.indexOf(P)&&(L||(L={}),L[P]=f[P]);for(E=0;E<S;E++)b=gu(i,z_),b.stagger=0,p&&(b.yoyoEase=p),L&&va(b,L),w=v[E],b.duration=+hl(c,Ir(a),E,w,v),b.delay=(+hl(u,Ir(a),E,w,v)||0)-a._delay,!f&&S===1&&b.delay&&(a._delay=u=b.delay,a._start+=u,b.delay=0),x.to(w,b,M?M(E,w,v):0),x._ease=Ot.none;x.duration()?c=u=0:a.timeline=0}else if(_){dl(Ri(x.vars.defaults,{ease:"none"})),x._ease=no(_.ease||i.ease||"none");var F=0,G,U,X;if(qn(_))_.forEach(function(Z){return x.to(v,Z,">")}),x.duration();else{b={};for(P in _)P==="ease"||P==="easeEach"||uA(P,_[P],b,_.easeEach);for(P in b)for(G=b[P].sort(function(Z,C){return Z.t-C.t}),F=0,E=0;E<G.length;E++)U=G[E],X={ease:U.e,duration:(U.t-(E?G[E-1].t:0))/100*c},X[P]=U.v,x.to(v,X,F),F+=X.duration;x.duration()<c&&x.to({},{duration:c-x.duration()})}}c||a.duration(c=x.duration())}else a.timeline=0;return h===!0&&!$h&&(us=Ir(a),ln.killTweensOf(v),us=0),cr(y,Ir(a),s),i.reversed&&a.reverse(),i.paused&&a.paused(!0),(d||!c&&!_&&a._start===wn(y._time)&&ci(d)&&VE(Ir(a))&&y.data!=="nested")&&(a._tTime=-Zt,a.render(Math.max(0,-u)||0)),m&&y_(Ir(a),m),a}var t=e.prototype;return t.render=function(i,s,o){var a=this._time,l=this._tDur,c=this._dur,u=i<0,d=i>l-Zt&&!u?l:i<Zt?0:i,f,h,_,g,m,p,y,v,x;if(!c)GE(this,i,s,o);else if(d!==this._tTime||!i||o||!this._initted&&this._tTime||this._startAt&&this._zTime<0!==u||this._lazy){if(f=d,v=this.timeline,this._repeat){if(g=c+this._rDelay,this._repeat<-1&&u)return this.totalTime(g*100+i,s,o);if(f=wn(d%g),d===l?(_=this._repeat,f=c):(m=wn(d/g),_=~~m,_&&_===m?(f=c,_--):f>c&&(f=c)),p=this._yoyo&&_&1,p&&(x=this._yEase,f=c-f),m=ya(this._tTime,g),f===a&&!o&&this._initted&&_===m)return this._tTime=d,this;_!==m&&(v&&this._yEase&&N_(v,p),this.vars.repeatRefresh&&!p&&!this._lock&&f!==g&&this._initted&&(this._lock=o=1,this.render(wn(g*_),!0).invalidate()._lock=0))}if(!this._initted){if(b_(this,u?i:f,o,s,d))return this._tTime=0,this;if(a!==this._time&&!(o&&this.vars.repeatRefresh&&_!==m))return this;if(c!==this._dur)return this.render(i,s,o)}if(this._tTime=d,this._time=f,!this._act&&this._ts&&(this._act=1,this._lazy=0),this.ratio=y=(x||this._ease)(f/c),this._from&&(this.ratio=y=1-y),f&&!a&&!s&&!_&&(Ei(this,"onStart"),this._tTime!==d))return this;for(h=this._pt;h;)h.r(y,h.d),h=h._next;v&&v.render(i<0?i:v._dur*v._ease(f/this._dur),s,o)||this._startAt&&(this._zTime=i),this._onUpdate&&!s&&(u&&Zf(this,i,s,o),Ei(this,"onUpdate")),this._repeat&&_!==m&&this.vars.onRepeat&&!s&&this.parent&&Ei(this,"onRepeat"),(d===this._tDur||!d)&&this._tTime===d&&(u&&!this._onUpdate&&Zf(this,i,!0,!0),(i||!c)&&(d===this._tDur&&this._ts>0||!d&&this._ts<0)&&Ms(this,1),!s&&!(u&&!a)&&(d||a||p)&&(Ei(this,d===l?"onComplete":"onReverseComplete",!0),this._prom&&!(d<l&&this.timeScale()>0)&&this._prom()))}return this},t.targets=function(){return this._targets},t.invalidate=function(i){return(!i||!this.vars.runBackwards)&&(this._startAt=0),this._pt=this._op=this._onUpdate=this._lazy=this.ratio=0,this._ptLookup=[],this.timeline&&this.timeline.invalidate(i),r.prototype.invalidate.call(this,i)},t.resetTo=function(i,s,o,a,l){Ul||wi.wake(),this._ts||this.play();var c=Math.min(this._dur,(this._dp._time-this._start)*this._ts),u;return this._initted||rp(this,c),u=this._ease(c/this._dur),lA(this,i,s,o,a,u,c,l)?this.resetTo(i,s,o,a,1):(Uu(this,0),this.parent||x_(this._dp,this,"_first","_last",this._dp._sort?"_start":0),this.render(0))},t.kill=function(i,s){if(s===void 0&&(s="all"),!i&&(!s||s==="all"))return this._lazy=this._pt=0,this.parent?Ka(this):this.scrollTrigger&&this.scrollTrigger.kill(!!kn),this;if(this.timeline){var o=this.timeline.totalDuration();return this.timeline.killTweensOf(i,s,us&&us.vars.overwrite!==!0)._first||Ka(this),this.parent&&o!==this.timeline.totalDuration()&&ba(this,this._dur*this.timeline._tDur/o,0,1),this}var a=this._targets,l=i?Bi(i):a,c=this._ptLookup,u=this._pt,d,f,h,_,g,m,p;if((!s||s==="all")&&BE(a,l))return s==="all"&&(this._pt=0),Ka(this);for(d=this._op=this._op||[],s!=="all"&&(On(s)&&(g={},ui(s,function(y){return g[y]=1}),s=g),s=cA(a,s)),p=a.length;p--;)if(~l.indexOf(a[p])){f=c[p],s==="all"?(d[p]=s,_=f,h={}):(h=d[p]=d[p]||{},_=s);for(g in _)m=f&&f[g],m&&((!("kill"in m.d)||m.d.kill(g)===!0)&&Nu(this,m,"_pt"),delete f[g]),h!=="all"&&(h[g]=1)}return this._initted&&!this._pt&&u&&Ka(this),this},e.to=function(i,s){return new e(i,s,arguments[2])},e.from=function(i,s){return fl(1,arguments)},e.delayedCall=function(i,s,o,a){return new e(s,0,{immediateRender:!1,lazy:!1,overwrite:!1,delay:i,onComplete:s,onReverseComplete:s,onCompleteParams:o,onReverseCompleteParams:o,callbackScope:a})},e.fromTo=function(i,s,o){return fl(2,arguments)},e.set=function(i,s){return s.duration=0,s.repeatDelay||(s.repeat=0),new e(i,s)},e.killTweensOf=function(i,s,o){return ln.killTweensOf(i,s,o)},e})(kl);Ri(bn.prototype,{_targets:[],_lazy:0,_startAt:0,_op:0,_onInit:0});ui("staggerTo,staggerFrom,staggerFromTo",function(r){bn[r]=function(){var e=new ni,t=Qf.call(arguments,0);return t.splice(r==="staggerFromTo"?5:4,0,0),e[r].apply(e,t)}});var sp=function(e,t,n){return e[t]=n},V_=function(e,t,n){return e[t](n)},dA=function(e,t,n,i){return e[t](i.fp,n)},fA=function(e,t,n){return e.setAttribute(t,n)},op=function(e,t){return hn(e[t])?V_:Kh(e[t])&&e.setAttribute?fA:sp},H_=function(e,t){return t.set(t.t,t.p,Math.round((t.s+t.c*e)*1e6)/1e6,t)},hA=function(e,t){return t.set(t.t,t.p,!!(t.s+t.c*e),t)},G_=function(e,t){var n=t._pt,i="";if(!e&&t.b)i=t.b;else if(e===1&&t.e)i=t.e;else{for(;n;)i=n.p+(n.m?n.m(n.s+n.c*e):Math.round((n.s+n.c*e)*1e4)/1e4)+i,n=n._next;i+=t.c}t.set(t.t,t.p,i,t)},ap=function(e,t){for(var n=t._pt;n;)n.r(e,n.d),n=n._next},pA=function(e,t,n,i){for(var s=this._pt,o;s;)o=s._next,s.p===i&&s.modifier(e,t,n),s=o},mA=function(e){for(var t=this._pt,n,i;t;)i=t._next,t.p===e&&!t.op||t.op===e?Nu(this,t,"_pt"):t.dep||(n=1),t=i;return!n},gA=function(e,t,n,i){i.mSet(e,t,i.m.call(i.tween,n,i.mt),i)},W_=function(e){for(var t=e._pt,n,i,s,o;t;){for(n=t._next,i=s;i&&i.pr>t.pr;)i=i._next;(t._prev=i?i._prev:o)?t._prev._next=t:s=t,(t._next=i)?i._prev=t:o=t,t=n}e._pt=s},di=(function(){function r(t,n,i,s,o,a,l,c,u){this.t=n,this.s=s,this.c=o,this.p=i,this.r=a||H_,this.d=l||this,this.set=c||sp,this.pr=u||0,this._next=t,t&&(t._prev=this)}var e=r.prototype;return e.modifier=function(n,i,s){this.mSet=this.mSet||this.set,this.set=gA,this.m=n,this.mt=s,this.tween=i},r})();ui(tp+"parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger",function(r){return ep[r]=1});Ci.TweenMax=Ci.TweenLite=bn;Ci.TimelineLite=Ci.TimelineMax=ni;ln=new ni({sortChildren:!1,defaults:xa,autoRemoveChildren:!0,id:"root",smoothChildTiming:!0});Ai.stringFilter=I_;var io=[],$c={},_A=[],f0=0,xA=0,Od=function(e){return($c[e]||_A).map(function(t){return t()})},ih=function(){var e=Date.now(),t=[];e-f0>2&&(Od("matchMediaInit"),io.forEach(function(n){var i=n.queries,s=n.conditions,o,a,l,c;for(a in i)o=or.matchMedia(i[a]).matches,o&&(l=1),o!==s[a]&&(s[a]=o,c=1);c&&(n.revert(),l&&t.push(n))}),Od("matchMediaRevert"),t.forEach(function(n){return n.onMatch(n,function(i){return n.add(null,i)})}),f0=e,Od("matchMedia"))},X_=(function(){function r(t,n){this.selector=n&&eh(n),this.data=[],this._r=[],this.isReverted=!1,this.id=xA++,t&&this.add(t)}var e=r.prototype;return e.add=function(n,i,s){hn(n)&&(s=i,i=n,n=hn);var o=this,a=function(){var c=an,u=o.selector,d;return c&&c!==o&&c.data.push(o),s&&(o.selector=eh(s)),an=o,d=i.apply(o,arguments),hn(d)&&o._r.push(d),an=c,o.selector=u,o.isReverted=!1,d};return o.last=a,n===hn?a(o,function(l){return o.add(null,l)}):n?o[n]=a:a},e.ignore=function(n){var i=an;an=null,n(this),an=i},e.getTweens=function(){var n=[];return this.data.forEach(function(i){return i instanceof r?n.push.apply(n,i.getTweens()):i instanceof bn&&!(i.parent&&i.parent.data==="nested")&&n.push(i)}),n},e.clear=function(){this._r.length=this.data.length=0},e.kill=function(n,i){var s=this;if(n?(function(){for(var a=s.getTweens(),l=s.data.length,c;l--;)c=s.data[l],c.data==="isFlip"&&(c.revert(),c.getChildren(!0,!0,!1).forEach(function(u){return a.splice(a.indexOf(u),1)}));for(a.map(function(u){return{g:u._dur||u._delay||u._sat&&!u._sat.vars.immediateRender?u.globalTime(0):-1/0,t:u}}).sort(function(u,d){return d.g-u.g||-1/0}).forEach(function(u){return u.t.revert(n)}),l=s.data.length;l--;)c=s.data[l],c instanceof ni?c.data!=="nested"&&(c.scrollTrigger&&c.scrollTrigger.revert(),c.kill()):!(c instanceof bn)&&c.revert&&c.revert(n);s._r.forEach(function(u){return u(n,s)}),s.isReverted=!0})():this.data.forEach(function(a){return a.kill&&a.kill()}),this.clear(),i)for(var o=io.length;o--;)io[o].id===this.id&&io.splice(o,1)},e.revert=function(n){this.kill(n||{})},r})(),vA=(function(){function r(t){this.contexts=[],this.scope=t,an&&an.data.push(this)}var e=r.prototype;return e.add=function(n,i,s){br(n)||(n={matches:n});var o=new X_(0,s||this.scope),a=o.conditions={},l,c,u;an&&!o.selector&&(o.selector=an.selector),this.contexts.push(o),i=o.add("onMatch",i),o.queries=n;for(c in n)c==="all"?u=1:(l=or.matchMedia(n[c]),l&&(io.indexOf(o)<0&&io.push(o),(a[c]=l.matches)&&(u=1),l.addListener?l.addListener(ih):l.addEventListener("change",ih)));return u&&i(o,function(d){return o.add(null,d)}),this},e.revert=function(n){this.kill(n||{})},e.kill=function(n){this.contexts.forEach(function(i){return i.kill(n,!0)})},r})(),xu={registerPlugin:function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];t.forEach(function(i){return P_(i)})},timeline:function(e){return new ni(e)},getTweensOf:function(e,t){return ln.getTweensOf(e,t)},getProperty:function(e,t,n,i){On(e)&&(e=Bi(e)[0]);var s=eo(e||{}).get,o=n?__:g_;return n==="native"&&(n=""),e&&(t?o((bi[t]&&bi[t].get||s)(e,t,n,i)):function(a,l,c){return o((bi[a]&&bi[a].get||s)(e,a,l,c))})},quickSetter:function(e,t,n){if(e=Bi(e),e.length>1){var i=e.map(function(u){return mi.quickSetter(u,t,n)}),s=i.length;return function(u){for(var d=s;d--;)i[d](u)}}e=e[0]||{};var o=bi[t],a=eo(e),l=a.harness&&(a.harness.aliases||{})[t]||t,c=o?function(u){var d=new o;$o._pt=0,d.init(e,n?u+n:u,$o,0,[e]),d.render(1,d),$o._pt&&ap(1,$o)}:a.set(e,l);return o?c:function(u){return c(e,l,n?u+n:u,a,1)}},quickTo:function(e,t,n){var i,s=mi.to(e,Ri((i={},i[t]="+=0.1",i.paused=!0,i.stagger=0,i),n||{})),o=function(l,c,u){return s.resetTo(t,l,c,u)};return o.tween=s,o},isTweening:function(e){return ln.getTweensOf(e,!0).length>0},defaults:function(e){return e&&e.ease&&(e.ease=no(e.ease,xa.ease)),a0(xa,e||{})},config:function(e){return a0(Ai,e||{})},registerEffect:function(e){var t=e.name,n=e.effect,i=e.plugins,s=e.defaults,o=e.extendTimeline;(i||"").split(",").forEach(function(a){return a&&!bi[a]&&!Ci[a]&&Ol(t+" effect requires "+a+" plugin.")}),Pd[t]=function(a,l,c){return n(Bi(a),Ri(l||{},s),c)},o&&(ni.prototype[t]=function(a,l,c){return this.add(Pd[t](a,br(l)?l:(c=l)&&{},this),c)})},registerEase:function(e,t){Ot[e]=no(t)},parseEase:function(e,t){return arguments.length?no(e,t):Ot},getById:function(e){return ln.getById(e)},exportRoot:function(e,t){e===void 0&&(e={});var n=new ni(e),i,s;for(n.smoothChildTiming=ci(e.smoothChildTiming),ln.remove(n),n._dp=0,n._time=n._tTime=ln._time,i=ln._first;i;)s=i._next,(t||!(!i._dur&&i instanceof bn&&i.vars.onComplete===i._targets[0]))&&cr(n,i,i._start-i._delay),i=s;return cr(ln,n,0),n},context:function(e,t){return e?new X_(e,t):an},matchMedia:function(e){return new vA(e)},matchMediaRefresh:function(){return io.forEach(function(e){var t=e.conditions,n,i;for(i in t)t[i]&&(t[i]=!1,n=1);n&&e.revert()})||ih()},addEventListener:function(e,t){var n=$c[e]||($c[e]=[]);~n.indexOf(t)||n.push(t)},removeEventListener:function(e,t){var n=$c[e],i=n&&n.indexOf(t);i>=0&&n.splice(i,1)},utils:{wrap:ZE,wrapYoyo:JE,distribute:M_,random:E_,snap:T_,normalize:KE,getUnit:Wn,clamp:qE,splitColor:L_,toArray:Bi,selector:eh,mapRange:C_,pipe:jE,unitize:$E,interpolate:QE,shuffle:w_},install:d_,effects:Pd,ticker:wi,updateRoot:ni.updateRoot,plugins:bi,globalTimeline:ln,core:{PropTween:di,globals:f_,Tween:bn,Timeline:ni,Animation:kl,getCache:eo,_removeLinkedListItem:Nu,reverting:function(){return kn},context:function(e){return e&&an&&(an.data.push(e),e._ctx=an),an},suppressOverwrites:function(e){return $h=e}}};ui("to,from,fromTo,delayedCall,set,killTweensOf",function(r){return xu[r]=bn[r]});wi.add(ni.updateRoot);$o=xu.to({},{duration:0});var yA=function(e,t){for(var n=e._pt;n&&n.p!==t&&n.op!==t&&n.fp!==t;)n=n._next;return n},bA=function(e,t){var n=e._targets,i,s,o;for(i in t)for(s=n.length;s--;)o=e._ptLookup[s][i],o&&(o=o.d)&&(o._pt&&(o=yA(o,i)),o&&o.modifier&&o.modifier(t[i],e,n[s],i))},Nd=function(e,t){return{name:e,rawVars:1,init:function(i,s,o){o._onInit=function(a){var l,c;if(On(s)&&(l={},ui(s,function(u){return l[u]=1}),s=l),t){l={};for(c in s)l[c]=t(s[c]);s=l}bA(a,s)}}}},mi=xu.registerPlugin({name:"attr",init:function(e,t,n,i,s){var o,a,l;this.tween=n;for(o in t)l=e.getAttribute(o)||"",a=this.add(e,"setAttribute",(l||0)+"",t[o],i,s,0,0,o),a.op=o,a.b=l,this._props.push(o)},render:function(e,t){for(var n=t._pt;n;)kn?n.set(n.t,n.p,n.b,n):n.r(e,n.d),n=n._next}},{name:"endArray",init:function(e,t){for(var n=t.length;n--;)this.add(e,n,e[n]||0,t[n],0,0,0,0,0,1)}},Nd("roundProps",th),Nd("modifiers"),Nd("snap",T_))||xu;bn.version=ni.version=mi.version="3.12.7";u_=1;Zh()&&Sa();Ot.Power0;Ot.Power1;Ot.Power2;Ot.Power3;Ot.Power4;Ot.Linear;Ot.Quad;Ot.Cubic;Ot.Quart;Ot.Quint;Ot.Strong;Ot.Elastic;Ot.Back;Ot.SteppedEase;Ot.Bounce;Ot.Sine;Ot.Expo;Ot.Circ;/*!
 * CSSPlugin 3.12.7
 * https://gsap.com
 *
 * Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license or for
 * Club GSAP members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/var h0,ds,ta,lp,$s,p0,cp,SA=function(){return typeof window<"u"},jr={},Hs=180/Math.PI,na=Math.PI/180,Bo=Math.atan2,m0=1e8,up=/([A-Z])/g,wA=/(left|right|width|margin|padding|x)/i,MA=/[\s,\(]\S/,hr={autoAlpha:"opacity,visibility",scale:"scaleX,scaleY",alpha:"opacity"},rh=function(e,t){return t.set(t.t,t.p,Math.round((t.s+t.c*e)*1e4)/1e4+t.u,t)},TA=function(e,t){return t.set(t.t,t.p,e===1?t.e:Math.round((t.s+t.c*e)*1e4)/1e4+t.u,t)},EA=function(e,t){return t.set(t.t,t.p,e?Math.round((t.s+t.c*e)*1e4)/1e4+t.u:t.b,t)},AA=function(e,t){var n=t.s+t.c*e;t.set(t.t,t.p,~~(n+(n<0?-.5:.5))+t.u,t)},q_=function(e,t){return t.set(t.t,t.p,e?t.e:t.b,t)},Y_=function(e,t){return t.set(t.t,t.p,e!==1?t.b:t.e,t)},CA=function(e,t,n){return e.style[t]=n},RA=function(e,t,n){return e.style.setProperty(t,n)},PA=function(e,t,n){return e._gsap[t]=n},LA=function(e,t,n){return e._gsap.scaleX=e._gsap.scaleY=n},DA=function(e,t,n,i,s){var o=e._gsap;o.scaleX=o.scaleY=n,o.renderTransform(s,o)},IA=function(e,t,n,i,s){var o=e._gsap;o[t]=n,o.renderTransform(s,o)},cn="transform",fi=cn+"Origin",OA=function r(e,t){var n=this,i=this.target,s=i.style,o=i._gsap;if(e in jr&&s){if(this.tfm=this.tfm||{},e!=="transform")e=hr[e]||e,~e.indexOf(",")?e.split(",").forEach(function(a){return n.tfm[a]=Or(i,a)}):this.tfm[e]=o.x?o[e]:Or(i,e),e===fi&&(this.tfm.zOrigin=o.zOrigin);else return hr.transform.split(",").forEach(function(a){return r.call(n,a,t)});if(this.props.indexOf(cn)>=0)return;o.svg&&(this.svgo=i.getAttribute("data-svg-origin"),this.props.push(fi,t,"")),e=cn}(s||t)&&this.props.push(e,t,s[e])},j_=function(e){e.translate&&(e.removeProperty("translate"),e.removeProperty("scale"),e.removeProperty("rotate"))},NA=function(){var e=this.props,t=this.target,n=t.style,i=t._gsap,s,o;for(s=0;s<e.length;s+=3)e[s+1]?e[s+1]===2?t[e[s]](e[s+2]):t[e[s]]=e[s+2]:e[s+2]?n[e[s]]=e[s+2]:n.removeProperty(e[s].substr(0,2)==="--"?e[s]:e[s].replace(up,"-$1").toLowerCase());if(this.tfm){for(o in this.tfm)i[o]=this.tfm[o];i.svg&&(i.renderTransform(),t.setAttribute("data-svg-origin",this.svgo||"")),s=cp(),(!s||!s.isStart)&&!n[cn]&&(j_(n),i.zOrigin&&n[fi]&&(n[fi]+=" "+i.zOrigin+"px",i.zOrigin=0,i.renderTransform()),i.uncache=1)}},$_=function(e,t){var n={target:e,props:[],revert:NA,save:OA};return e._gsap||mi.core.getCache(e),t&&e.style&&e.nodeType&&t.split(",").forEach(function(i){return n.save(i)}),n},K_,sh=function(e,t){var n=ds.createElementNS?ds.createElementNS((t||"http://www.w3.org/1999/xhtml").replace(/^https/,"http"),e):ds.createElement(e);return n&&n.style?n:ds.createElement(e)},_r=function r(e,t,n){var i=getComputedStyle(e);return i[t]||i.getPropertyValue(t.replace(up,"-$1").toLowerCase())||i.getPropertyValue(t)||!n&&r(e,wa(t)||t,1)||""},g0="O,Moz,ms,Ms,Webkit".split(","),wa=function(e,t,n){var i=t||$s,s=i.style,o=5;if(e in s&&!n)return e;for(e=e.charAt(0).toUpperCase()+e.substr(1);o--&&!(g0[o]+e in s););return o<0?null:(o===3?"ms":o>=0?g0[o]:"")+e},oh=function(){SA()&&window.document&&(h0=window,ds=h0.document,ta=ds.documentElement,$s=sh("div")||{style:{}},sh("div"),cn=wa(cn),fi=cn+"Origin",$s.style.cssText="border-width:0;line-height:0;position:absolute;padding:0",K_=!!wa("perspective"),cp=mi.core.reverting,lp=1)},_0=function(e){var t=e.ownerSVGElement,n=sh("svg",t&&t.getAttribute("xmlns")||"http://www.w3.org/2000/svg"),i=e.cloneNode(!0),s;i.style.display="block",n.appendChild(i),ta.appendChild(n);try{s=i.getBBox()}catch{}return n.removeChild(i),ta.removeChild(n),s},x0=function(e,t){for(var n=t.length;n--;)if(e.hasAttribute(t[n]))return e.getAttribute(t[n])},Z_=function(e){var t,n;try{t=e.getBBox()}catch{t=_0(e),n=1}return t&&(t.width||t.height)||n||(t=_0(e)),t&&!t.width&&!t.x&&!t.y?{x:+x0(e,["x","cx","x1"])||0,y:+x0(e,["y","cy","y1"])||0,width:0,height:0}:t},J_=function(e){return!!(e.getCTM&&(!e.parentNode||e.ownerSVGElement)&&Z_(e))},uo=function(e,t){if(t){var n=e.style,i;t in jr&&t!==fi&&(t=cn),n.removeProperty?(i=t.substr(0,2),(i==="ms"||t.substr(0,6)==="webkit")&&(t="-"+t),n.removeProperty(i==="--"?t:t.replace(up,"-$1").toLowerCase())):n.removeAttribute(t)}},fs=function(e,t,n,i,s,o){var a=new di(e._pt,t,n,0,1,o?Y_:q_);return e._pt=a,a.b=i,a.e=s,e._props.push(n),a},v0={deg:1,rad:1,turn:1},FA={grid:1,flex:1},Ts=function r(e,t,n,i){var s=parseFloat(n)||0,o=(n+"").trim().substr((s+"").length)||"px",a=$s.style,l=wA.test(t),c=e.tagName.toLowerCase()==="svg",u=(c?"client":"offset")+(l?"Width":"Height"),d=100,f=i==="px",h=i==="%",_,g,m,p;if(i===o||!s||v0[i]||v0[o])return s;if(o!=="px"&&!f&&(s=r(e,t,n,"px")),p=e.getCTM&&J_(e),(h||o==="%")&&(jr[t]||~t.indexOf("adius")))return _=p?e.getBBox()[l?"width":"height"]:e[u],pn(h?s/_*d:s/100*_);if(a[l?"width":"height"]=d+(f?o:i),g=i!=="rem"&&~t.indexOf("adius")||i==="em"&&e.appendChild&&!c?e:e.parentNode,p&&(g=(e.ownerSVGElement||{}).parentNode),(!g||g===ds||!g.appendChild)&&(g=ds.body),m=g._gsap,m&&h&&m.width&&l&&m.time===wi.time&&!m.uncache)return pn(s/m.width*d);if(h&&(t==="height"||t==="width")){var y=e.style[t];e.style[t]=d+i,_=e[u],y?e.style[t]=y:uo(e,t)}else(h||o==="%")&&!FA[_r(g,"display")]&&(a.position=_r(e,"position")),g===e&&(a.position="static"),g.appendChild($s),_=$s[u],g.removeChild($s),a.position="absolute";return l&&h&&(m=eo(g),m.time=wi.time,m.width=g[u]),pn(f?_*s/d:_&&s?d/_*s:0)},Or=function(e,t,n,i){var s;return lp||oh(),t in hr&&t!=="transform"&&(t=hr[t],~t.indexOf(",")&&(t=t.split(",")[0])),jr[t]&&t!=="transform"?(s=zl(e,i),s=t!=="transformOrigin"?s[t]:s.svg?s.origin:yu(_r(e,fi))+" "+s.zOrigin+"px"):(s=e.style[t],(!s||s==="auto"||i||~(s+"").indexOf("calc("))&&(s=vu[t]&&vu[t](e,t,n)||_r(e,t)||p_(e,t)||(t==="opacity"?1:0))),n&&!~(s+"").trim().indexOf(" ")?Ts(e,t,s,n)+n:s},UA=function(e,t,n,i){if(!n||n==="none"){var s=wa(t,e,1),o=s&&_r(e,s,1);o&&o!==n?(t=s,n=o):t==="borderColor"&&(n=_r(e,"borderTopColor"))}var a=new di(this._pt,e.style,t,0,1,G_),l=0,c=0,u,d,f,h,_,g,m,p,y,v,x,E;if(a.b=n,a.e=i,n+="",i+="",i==="auto"&&(g=e.style[t],e.style[t]=i,i=_r(e,t)||i,g?e.style[t]=g:uo(e,t)),u=[n,i],I_(u),n=u[0],i=u[1],f=n.match(jo)||[],E=i.match(jo)||[],E.length){for(;d=jo.exec(i);)m=d[0],y=i.substring(l,d.index),_?_=(_+1)%5:(y.substr(-5)==="rgba("||y.substr(-5)==="hsla(")&&(_=1),m!==(g=f[c++]||"")&&(h=parseFloat(g)||0,x=g.substr((h+"").length),m.charAt(1)==="="&&(m=ea(h,m)+x),p=parseFloat(m),v=m.substr((p+"").length),l=jo.lastIndex-v.length,v||(v=v||Ai.units[t]||x,l===i.length&&(i+=v,a.e+=v)),x!==v&&(h=Ts(e,t,g,v)||0),a._pt={_next:a._pt,p:y||c===1?y:",",s:h,c:p-h,m:_&&_<4||t==="zIndex"?Math.round:0});a.c=l<i.length?i.substring(l,i.length):""}else a.r=t==="display"&&i==="none"?Y_:q_;return l_.test(i)&&(a.e=0),this._pt=a,a},y0={top:"0%",bottom:"100%",left:"0%",right:"100%",center:"50%"},kA=function(e){var t=e.split(" "),n=t[0],i=t[1]||"50%";return(n==="top"||n==="bottom"||i==="left"||i==="right")&&(e=n,n=i,i=e),t[0]=y0[n]||n,t[1]=y0[i]||i,t.join(" ")},BA=function(e,t){if(t.tween&&t.tween._time===t.tween._dur){var n=t.t,i=n.style,s=t.u,o=n._gsap,a,l,c;if(s==="all"||s===!0)i.cssText="",l=1;else for(s=s.split(","),c=s.length;--c>-1;)a=s[c],jr[a]&&(l=1,a=a==="transformOrigin"?fi:cn),uo(n,a);l&&(uo(n,cn),o&&(o.svg&&n.removeAttribute("transform"),i.scale=i.rotate=i.translate="none",zl(n,1),o.uncache=1,j_(i)))}},vu={clearProps:function(e,t,n,i,s){if(s.data!=="isFromStart"){var o=e._pt=new di(e._pt,t,n,0,0,BA);return o.u=i,o.pr=-10,o.tween=s,e._props.push(n),1}}},Bl=[1,0,0,1,0,0],Q_={},ex=function(e){return e==="matrix(1, 0, 0, 1, 0, 0)"||e==="none"||!e},b0=function(e){var t=_r(e,cn);return ex(t)?Bl:t.substr(7).match(a_).map(pn)},dp=function(e,t){var n=e._gsap||eo(e),i=e.style,s=b0(e),o,a,l,c;return n.svg&&e.getAttribute("transform")?(l=e.transform.baseVal.consolidate().matrix,s=[l.a,l.b,l.c,l.d,l.e,l.f],s.join(",")==="1,0,0,1,0,0"?Bl:s):(s===Bl&&!e.offsetParent&&e!==ta&&!n.svg&&(l=i.display,i.display="block",o=e.parentNode,(!o||!e.offsetParent&&!e.getBoundingClientRect().width)&&(c=1,a=e.nextElementSibling,ta.appendChild(e)),s=b0(e),l?i.display=l:uo(e,"display"),c&&(a?o.insertBefore(e,a):o?o.appendChild(e):ta.removeChild(e))),t&&s.length>6?[s[0],s[1],s[4],s[5],s[12],s[13]]:s)},ah=function(e,t,n,i,s,o){var a=e._gsap,l=s||dp(e,!0),c=a.xOrigin||0,u=a.yOrigin||0,d=a.xOffset||0,f=a.yOffset||0,h=l[0],_=l[1],g=l[2],m=l[3],p=l[4],y=l[5],v=t.split(" "),x=parseFloat(v[0])||0,E=parseFloat(v[1])||0,b,S,P,w;n?l!==Bl&&(S=h*m-_*g)&&(P=x*(m/S)+E*(-g/S)+(g*y-m*p)/S,w=x*(-_/S)+E*(h/S)-(h*y-_*p)/S,x=P,E=w):(b=Z_(e),x=b.x+(~v[0].indexOf("%")?x/100*b.width:x),E=b.y+(~(v[1]||v[0]).indexOf("%")?E/100*b.height:E)),i||i!==!1&&a.smooth?(p=x-c,y=E-u,a.xOffset=d+(p*h+y*g)-p,a.yOffset=f+(p*_+y*m)-y):a.xOffset=a.yOffset=0,a.xOrigin=x,a.yOrigin=E,a.smooth=!!i,a.origin=t,a.originIsAbsolute=!!n,e.style[fi]="0px 0px",o&&(fs(o,a,"xOrigin",c,x),fs(o,a,"yOrigin",u,E),fs(o,a,"xOffset",d,a.xOffset),fs(o,a,"yOffset",f,a.yOffset)),e.setAttribute("data-svg-origin",x+" "+E)},zl=function(e,t){var n=e._gsap||new U_(e);if("x"in n&&!t&&!n.uncache)return n;var i=e.style,s=n.scaleX<0,o="px",a="deg",l=getComputedStyle(e),c=_r(e,fi)||"0",u,d,f,h,_,g,m,p,y,v,x,E,b,S,P,w,M,L,F,G,U,X,Z,C,Y,de,I,xe,ve,ee,Xe,qe;return u=d=f=g=m=p=y=v=x=0,h=_=1,n.svg=!!(e.getCTM&&J_(e)),l.translate&&((l.translate!=="none"||l.scale!=="none"||l.rotate!=="none")&&(i[cn]=(l.translate!=="none"?"translate3d("+(l.translate+" 0 0").split(" ").slice(0,3).join(", ")+") ":"")+(l.rotate!=="none"?"rotate("+l.rotate+") ":"")+(l.scale!=="none"?"scale("+l.scale.split(" ").join(",")+") ":"")+(l[cn]!=="none"?l[cn]:"")),i.scale=i.rotate=i.translate="none"),S=dp(e,n.svg),n.svg&&(n.uncache?(Y=e.getBBox(),c=n.xOrigin-Y.x+"px "+(n.yOrigin-Y.y)+"px",C=""):C=!t&&e.getAttribute("data-svg-origin"),ah(e,C||c,!!C||n.originIsAbsolute,n.smooth!==!1,S)),E=n.xOrigin||0,b=n.yOrigin||0,S!==Bl&&(L=S[0],F=S[1],G=S[2],U=S[3],u=X=S[4],d=Z=S[5],S.length===6?(h=Math.sqrt(L*L+F*F),_=Math.sqrt(U*U+G*G),g=L||F?Bo(F,L)*Hs:0,y=G||U?Bo(G,U)*Hs+g:0,y&&(_*=Math.abs(Math.cos(y*na))),n.svg&&(u-=E-(E*L+b*G),d-=b-(E*F+b*U))):(qe=S[6],ee=S[7],I=S[8],xe=S[9],ve=S[10],Xe=S[11],u=S[12],d=S[13],f=S[14],P=Bo(qe,ve),m=P*Hs,P&&(w=Math.cos(-P),M=Math.sin(-P),C=X*w+I*M,Y=Z*w+xe*M,de=qe*w+ve*M,I=X*-M+I*w,xe=Z*-M+xe*w,ve=qe*-M+ve*w,Xe=ee*-M+Xe*w,X=C,Z=Y,qe=de),P=Bo(-G,ve),p=P*Hs,P&&(w=Math.cos(-P),M=Math.sin(-P),C=L*w-I*M,Y=F*w-xe*M,de=G*w-ve*M,Xe=U*M+Xe*w,L=C,F=Y,G=de),P=Bo(F,L),g=P*Hs,P&&(w=Math.cos(P),M=Math.sin(P),C=L*w+F*M,Y=X*w+Z*M,F=F*w-L*M,Z=Z*w-X*M,L=C,X=Y),m&&Math.abs(m)+Math.abs(g)>359.9&&(m=g=0,p=180-p),h=pn(Math.sqrt(L*L+F*F+G*G)),_=pn(Math.sqrt(Z*Z+qe*qe)),P=Bo(X,Z),y=Math.abs(P)>2e-4?P*Hs:0,x=Xe?1/(Xe<0?-Xe:Xe):0),n.svg&&(C=e.getAttribute("transform"),n.forceCSS=e.setAttribute("transform","")||!ex(_r(e,cn)),C&&e.setAttribute("transform",C))),Math.abs(y)>90&&Math.abs(y)<270&&(s?(h*=-1,y+=g<=0?180:-180,g+=g<=0?180:-180):(_*=-1,y+=y<=0?180:-180)),t=t||n.uncache,n.x=u-((n.xPercent=u&&(!t&&n.xPercent||(Math.round(e.offsetWidth/2)===Math.round(-u)?-50:0)))?e.offsetWidth*n.xPercent/100:0)+o,n.y=d-((n.yPercent=d&&(!t&&n.yPercent||(Math.round(e.offsetHeight/2)===Math.round(-d)?-50:0)))?e.offsetHeight*n.yPercent/100:0)+o,n.z=f+o,n.scaleX=pn(h),n.scaleY=pn(_),n.rotation=pn(g)+a,n.rotationX=pn(m)+a,n.rotationY=pn(p)+a,n.skewX=y+a,n.skewY=v+a,n.transformPerspective=x+o,(n.zOrigin=parseFloat(c.split(" ")[2])||!t&&n.zOrigin||0)&&(i[fi]=yu(c)),n.xOffset=n.yOffset=0,n.force3D=Ai.force3D,n.renderTransform=n.svg?VA:K_?tx:zA,n.uncache=0,n},yu=function(e){return(e=e.split(" "))[0]+" "+e[1]},Fd=function(e,t,n){var i=Wn(t);return pn(parseFloat(t)+parseFloat(Ts(e,"x",n+"px",i)))+i},zA=function(e,t){t.z="0px",t.rotationY=t.rotationX="0deg",t.force3D=0,tx(e,t)},Bs="0deg",Ga="0px",zs=") ",tx=function(e,t){var n=t||this,i=n.xPercent,s=n.yPercent,o=n.x,a=n.y,l=n.z,c=n.rotation,u=n.rotationY,d=n.rotationX,f=n.skewX,h=n.skewY,_=n.scaleX,g=n.scaleY,m=n.transformPerspective,p=n.force3D,y=n.target,v=n.zOrigin,x="",E=p==="auto"&&e&&e!==1||p===!0;if(v&&(d!==Bs||u!==Bs)){var b=parseFloat(u)*na,S=Math.sin(b),P=Math.cos(b),w;b=parseFloat(d)*na,w=Math.cos(b),o=Fd(y,o,S*w*-v),a=Fd(y,a,-Math.sin(b)*-v),l=Fd(y,l,P*w*-v+v)}m!==Ga&&(x+="perspective("+m+zs),(i||s)&&(x+="translate("+i+"%, "+s+"%) "),(E||o!==Ga||a!==Ga||l!==Ga)&&(x+=l!==Ga||E?"translate3d("+o+", "+a+", "+l+") ":"translate("+o+", "+a+zs),c!==Bs&&(x+="rotate("+c+zs),u!==Bs&&(x+="rotateY("+u+zs),d!==Bs&&(x+="rotateX("+d+zs),(f!==Bs||h!==Bs)&&(x+="skew("+f+", "+h+zs),(_!==1||g!==1)&&(x+="scale("+_+", "+g+zs),y.style[cn]=x||"translate(0, 0)"},VA=function(e,t){var n=t||this,i=n.xPercent,s=n.yPercent,o=n.x,a=n.y,l=n.rotation,c=n.skewX,u=n.skewY,d=n.scaleX,f=n.scaleY,h=n.target,_=n.xOrigin,g=n.yOrigin,m=n.xOffset,p=n.yOffset,y=n.forceCSS,v=parseFloat(o),x=parseFloat(a),E,b,S,P,w;l=parseFloat(l),c=parseFloat(c),u=parseFloat(u),u&&(u=parseFloat(u),c+=u,l+=u),l||c?(l*=na,c*=na,E=Math.cos(l)*d,b=Math.sin(l)*d,S=Math.sin(l-c)*-f,P=Math.cos(l-c)*f,c&&(u*=na,w=Math.tan(c-u),w=Math.sqrt(1+w*w),S*=w,P*=w,u&&(w=Math.tan(u),w=Math.sqrt(1+w*w),E*=w,b*=w)),E=pn(E),b=pn(b),S=pn(S),P=pn(P)):(E=d,P=f,b=S=0),(v&&!~(o+"").indexOf("px")||x&&!~(a+"").indexOf("px"))&&(v=Ts(h,"x",o,"px"),x=Ts(h,"y",a,"px")),(_||g||m||p)&&(v=pn(v+_-(_*E+g*S)+m),x=pn(x+g-(_*b+g*P)+p)),(i||s)&&(w=h.getBBox(),v=pn(v+i/100*w.width),x=pn(x+s/100*w.height)),w="matrix("+E+","+b+","+S+","+P+","+v+","+x+")",h.setAttribute("transform",w),y&&(h.style[cn]=w)},HA=function(e,t,n,i,s){var o=360,a=On(s),l=parseFloat(s)*(a&&~s.indexOf("rad")?Hs:1),c=l-i,u=i+c+"deg",d,f;return a&&(d=s.split("_")[1],d==="short"&&(c%=o,c!==c%(o/2)&&(c+=c<0?o:-o)),d==="cw"&&c<0?c=(c+o*m0)%o-~~(c/o)*o:d==="ccw"&&c>0&&(c=(c-o*m0)%o-~~(c/o)*o)),e._pt=f=new di(e._pt,t,n,i,c,TA),f.e=u,f.u="deg",e._props.push(n),f},S0=function(e,t){for(var n in t)e[n]=t[n];return e},GA=function(e,t,n){var i=S0({},n._gsap),s="perspective,force3D,transformOrigin,svgOrigin",o=n.style,a,l,c,u,d,f,h,_;i.svg?(c=n.getAttribute("transform"),n.setAttribute("transform",""),o[cn]=t,a=zl(n,1),uo(n,cn),n.setAttribute("transform",c)):(c=getComputedStyle(n)[cn],o[cn]=t,a=zl(n,1),o[cn]=c);for(l in jr)c=i[l],u=a[l],c!==u&&s.indexOf(l)<0&&(h=Wn(c),_=Wn(u),d=h!==_?Ts(n,l,c,_):parseFloat(c),f=parseFloat(u),e._pt=new di(e._pt,a,l,d,f-d,rh),e._pt.u=_||0,e._props.push(l));S0(a,i)};ui("padding,margin,Width,Radius",function(r,e){var t="Top",n="Right",i="Bottom",s="Left",o=(e<3?[t,n,i,s]:[t+s,t+n,i+n,i+s]).map(function(a){return e<2?r+a:"border"+a+r});vu[e>1?"border"+r:r]=function(a,l,c,u,d){var f,h;if(arguments.length<4)return f=o.map(function(_){return Or(a,_,c)}),h=f.join(" "),h.split(f[0]).length===5?f[0]:h;f=(u+"").split(" "),h={},o.forEach(function(_,g){return h[_]=f[g]=f[g]||f[(g-1)/2|0]}),a.init(l,h,d)}});var nx={name:"css",register:oh,targetTest:function(e){return e.style&&e.nodeType},init:function(e,t,n,i,s){var o=this._props,a=e.style,l=n.vars.startAt,c,u,d,f,h,_,g,m,p,y,v,x,E,b,S,P;lp||oh(),this.styles=this.styles||$_(e),P=this.styles.props,this.tween=n;for(g in t)if(g!=="autoRound"&&(u=t[g],!(bi[g]&&k_(g,t,n,i,e,s)))){if(h=typeof u,_=vu[g],h==="function"&&(u=u.call(n,i,e,s),h=typeof u),h==="string"&&~u.indexOf("random(")&&(u=Fl(u)),_)_(this,e,g,u,n)&&(S=1);else if(g.substr(0,2)==="--")c=(getComputedStyle(e).getPropertyValue(g)+"").trim(),u+="",ys.lastIndex=0,ys.test(c)||(m=Wn(c),p=Wn(u)),p?m!==p&&(c=Ts(e,g,c,p)+p):m&&(u+=m),this.add(a,"setProperty",c,u,i,s,0,0,g),o.push(g),P.push(g,0,a[g]);else if(h!=="undefined"){if(l&&g in l?(c=typeof l[g]=="function"?l[g].call(n,i,e,s):l[g],On(c)&&~c.indexOf("random(")&&(c=Fl(c)),Wn(c+"")||c==="auto"||(c+=Ai.units[g]||Wn(Or(e,g))||""),(c+"").charAt(1)==="="&&(c=Or(e,g))):c=Or(e,g),f=parseFloat(c),y=h==="string"&&u.charAt(1)==="="&&u.substr(0,2),y&&(u=u.substr(2)),d=parseFloat(u),g in hr&&(g==="autoAlpha"&&(f===1&&Or(e,"visibility")==="hidden"&&d&&(f=0),P.push("visibility",0,a.visibility),fs(this,a,"visibility",f?"inherit":"hidden",d?"inherit":"hidden",!d)),g!=="scale"&&g!=="transform"&&(g=hr[g],~g.indexOf(",")&&(g=g.split(",")[0]))),v=g in jr,v){if(this.styles.save(g),x||(E=e._gsap,E.renderTransform&&!t.parseTransform||zl(e,t.parseTransform),b=t.smoothOrigin!==!1&&E.smooth,x=this._pt=new di(this._pt,a,cn,0,1,E.renderTransform,E,0,-1),x.dep=1),g==="scale")this._pt=new di(this._pt,E,"scaleY",E.scaleY,(y?ea(E.scaleY,y+d):d)-E.scaleY||0,rh),this._pt.u=0,o.push("scaleY",g),g+="X";else if(g==="transformOrigin"){P.push(fi,0,a[fi]),u=kA(u),E.svg?ah(e,u,0,b,0,this):(p=parseFloat(u.split(" ")[2])||0,p!==E.zOrigin&&fs(this,E,"zOrigin",E.zOrigin,p),fs(this,a,g,yu(c),yu(u)));continue}else if(g==="svgOrigin"){ah(e,u,1,b,0,this);continue}else if(g in Q_){HA(this,E,g,f,y?ea(f,y+u):u);continue}else if(g==="smoothOrigin"){fs(this,E,"smooth",E.smooth,u);continue}else if(g==="force3D"){E[g]=u;continue}else if(g==="transform"){GA(this,u,e);continue}}else g in a||(g=wa(g)||g);if(v||(d||d===0)&&(f||f===0)&&!MA.test(u)&&g in a)m=(c+"").substr((f+"").length),d||(d=0),p=Wn(u)||(g in Ai.units?Ai.units[g]:m),m!==p&&(f=Ts(e,g,c,p)),this._pt=new di(this._pt,v?E:a,g,f,(y?ea(f,y+d):d)-f,!v&&(p==="px"||g==="zIndex")&&t.autoRound!==!1?AA:rh),this._pt.u=p||0,m!==p&&p!=="%"&&(this._pt.b=c,this._pt.r=EA);else if(g in a)UA.call(this,e,g,c,y?y+u:u);else if(g in e)this.add(e,g,c||e[g],y?y+u:u,i,s);else if(g!=="parseTransform"){Qh(g,u);continue}v||(g in a?P.push(g,0,a[g]):typeof e[g]=="function"?P.push(g,2,e[g]()):P.push(g,1,c||e[g])),o.push(g)}}S&&W_(this)},render:function(e,t){if(t.tween._time||!cp())for(var n=t._pt;n;)n.r(e,n.d),n=n._next;else t.styles.revert()},get:Or,aliases:hr,getSetter:function(e,t,n){var i=hr[t];return i&&i.indexOf(",")<0&&(t=i),t in jr&&t!==fi&&(e._gsap.x||Or(e,"x"))?n&&p0===n?t==="scale"?LA:PA:(p0=n||{})&&(t==="scale"?DA:IA):e.style&&!Kh(e.style[t])?CA:~t.indexOf("-")?RA:op(e,t)},core:{_removeProperty:uo,_getMatrix:dp}};mi.utils.checkPrefix=wa;mi.core.getStyleSaver=$_;(function(r,e,t,n){var i=ui(r+","+e+","+t,function(s){jr[s]=1});ui(e,function(s){Ai.units[s]="deg",Q_[s]=1}),hr[i[13]]=r+","+e,ui(n,function(s){var o=s.split(":");hr[o[1]]=i[o[0]]})})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent","rotation,rotationX,rotationY,skewX,skewY","transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective","0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");ui("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective",function(r){Ai.units[r]="px"});mi.registerPlugin(nx);var Me=mi.registerPlugin(nx)||mi;Me.core.Tween;function Tc(r,e){const t=document.querySelector(`#${r} .number`);if(!t)return;let n;r==="days"&&e>=100?n=String(e):n=("0"+e).slice(-2),t.textContent!==n?Me.to(t,{duration:.2,opacity:0,y:-10,ease:"power2.in",onComplete:()=>{t.textContent=n,Me.fromTo(t,{opacity:0,y:10},{duration:.3,opacity:1,y:0,ease:"power2.out"})}}):t.textContent=n}function WA(r){function e(){const t=Date.now(),n=r-t;if(n<0)return;const i=Math.floor(n/(1e3*60*60*24)),s=Math.floor(n%(1e3*60*60*24)/(1e3*60*60)),o=Math.floor(n%(1e3*60*60)/(1e3*60)),a=Math.floor(n%(1e3*60)/1e3);i>=100?String(i):("0"+i).slice(-2),("0"+s).slice(-2),("0"+o).slice(-2),("0"+a).slice(-2),Tc("days",i),Tc("hours",s),Tc("minutes",o),Tc("seconds",a)}e(),setInterval(e,1e3)}function XA(r,e){for(var t=0;t<e.length;t++){var n=e[t];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(r,n.key,n)}}function qA(r,e,t){return e&&XA(r.prototype,e),r}/*!
 * Observer 3.12.7
 * https://gsap.com
 *
 * @license Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license or for
 * Club GSAP members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/var Un,Kc,Mi,hs,ps,ia,ix,Gs,pl,rx,zr,Xi,sx,ox=function(){return Un||typeof window<"u"&&(Un=window.gsap)&&Un.registerPlugin&&Un},ax=1,Ko=[],Tt=[],xr=[],ml=Date.now,lh=function(e,t){return t},YA=function(){var e=pl.core,t=e.bridge||{},n=e._scrollers,i=e._proxies;n.push.apply(n,Tt),i.push.apply(i,xr),Tt=n,xr=i,lh=function(o,a){return t[o](a)}},bs=function(e,t){return~xr.indexOf(e)&&xr[xr.indexOf(e)+1][t]},gl=function(e){return!!~rx.indexOf(e)},Kn=function(e,t,n,i,s){return e.addEventListener(t,n,{passive:i!==!1,capture:!!s})},$n=function(e,t,n,i){return e.removeEventListener(t,n,!!i)},Ec="scrollLeft",Ac="scrollTop",ch=function(){return zr&&zr.isPressed||Tt.cache++},bu=function(e,t){var n=function i(s){if(s||s===0){ax&&(Mi.history.scrollRestoration="manual");var o=zr&&zr.isPressed;s=i.v=Math.round(s)||(zr&&zr.iOS?1:0),e(s),i.cacheID=Tt.cache,o&&lh("ss",s)}else(t||Tt.cache!==i.cacheID||lh("ref"))&&(i.cacheID=Tt.cache,i.v=e());return i.v+i.offset};return n.offset=0,e&&n},ii={s:Ec,p:"left",p2:"Left",os:"right",os2:"Right",d:"width",d2:"Width",a:"x",sc:bu(function(r){return arguments.length?Mi.scrollTo(r,Tn.sc()):Mi.pageXOffset||hs[Ec]||ps[Ec]||ia[Ec]||0})},Tn={s:Ac,p:"top",p2:"Top",os:"bottom",os2:"Bottom",d:"height",d2:"Height",a:"y",op:ii,sc:bu(function(r){return arguments.length?Mi.scrollTo(ii.sc(),r):Mi.pageYOffset||hs[Ac]||ps[Ac]||ia[Ac]||0})},oi=function(e,t){return(t&&t._ctx&&t._ctx.selector||Un.utils.toArray)(e)[0]||(typeof e=="string"&&Un.config().nullTargetWarn!==!1?console.warn("Element not found:",e):null)},Es=function(e,t){var n=t.s,i=t.sc;gl(e)&&(e=hs.scrollingElement||ps);var s=Tt.indexOf(e),o=i===Tn.sc?1:2;!~s&&(s=Tt.push(e)-1),Tt[s+o]||Kn(e,"scroll",ch);var a=Tt[s+o],l=a||(Tt[s+o]=bu(bs(e,n),!0)||(gl(e)?i:bu(function(c){return arguments.length?e[n]=c:e[n]})));return l.target=e,a||(l.smooth=Un.getProperty(e,"scrollBehavior")==="smooth"),l},uh=function(e,t,n){var i=e,s=e,o=ml(),a=o,l=t||50,c=Math.max(500,l*3),u=function(_,g){var m=ml();g||m-o>l?(s=i,i=_,a=o,o=m):n?i+=_:i=s+(_-s)/(m-a)*(o-a)},d=function(){s=i=n?0:i,a=o=0},f=function(_){var g=a,m=s,p=ml();return(_||_===0)&&_!==i&&u(_),o===a||p-a>c?0:(i+(n?m:-m))/((n?p:o)-g)*1e3};return{update:u,reset:d,getVelocity:f}},Wa=function(e,t){return t&&!e._gsapAllow&&e.preventDefault(),e.changedTouches?e.changedTouches[0]:e},w0=function(e){var t=Math.max.apply(Math,e),n=Math.min.apply(Math,e);return Math.abs(t)>=Math.abs(n)?t:n},lx=function(){pl=Un.core.globals().ScrollTrigger,pl&&pl.core&&YA()},cx=function(e){return Un=e||ox(),!Kc&&Un&&typeof document<"u"&&document.body&&(Mi=window,hs=document,ps=hs.documentElement,ia=hs.body,rx=[Mi,hs,ps,ia],Un.utils.clamp,sx=Un.core.context||function(){},Gs="onpointerenter"in ia?"pointer":"mouse",ix=mn.isTouch=Mi.matchMedia&&Mi.matchMedia("(hover: none), (pointer: coarse)").matches?1:"ontouchstart"in Mi||navigator.maxTouchPoints>0||navigator.msMaxTouchPoints>0?2:0,Xi=mn.eventTypes=("ontouchstart"in ps?"touchstart,touchmove,touchcancel,touchend":"onpointerdown"in ps?"pointerdown,pointermove,pointercancel,pointerup":"mousedown,mousemove,mouseup,mouseup").split(","),setTimeout(function(){return ax=0},500),lx(),Kc=1),Kc};ii.op=Tn;Tt.cache=0;var mn=(function(){function r(t){this.init(t)}var e=r.prototype;return e.init=function(n){Kc||cx(Un)||console.warn("Please gsap.registerPlugin(Observer)"),pl||lx();var i=n.tolerance,s=n.dragMinimum,o=n.type,a=n.target,l=n.lineHeight,c=n.debounce,u=n.preventDefault,d=n.onStop,f=n.onStopDelay,h=n.ignore,_=n.wheelSpeed,g=n.event,m=n.onDragStart,p=n.onDragEnd,y=n.onDrag,v=n.onPress,x=n.onRelease,E=n.onRight,b=n.onLeft,S=n.onUp,P=n.onDown,w=n.onChangeX,M=n.onChangeY,L=n.onChange,F=n.onToggleX,G=n.onToggleY,U=n.onHover,X=n.onHoverEnd,Z=n.onMove,C=n.ignoreCheck,Y=n.isNormalizer,de=n.onGestureStart,I=n.onGestureEnd,xe=n.onWheel,ve=n.onEnable,ee=n.onDisable,Xe=n.onClick,qe=n.scrollSpeed,ne=n.capture,ie=n.allowClicks,be=n.lockAxis,Ye=n.onLockAxis;this.target=a=oi(a)||ps,this.vars=n,h&&(h=Un.utils.toArray(h)),i=i||1e-9,s=s||0,_=_||1,qe=qe||1,o=o||"wheel,touch,pointer",c=c!==!1,l||(l=parseFloat(Mi.getComputedStyle(ia).lineHeight)||22);var ye,tt,ht,Ie,ct,N,st,z=this,pt=0,Fe=0,Pt=n.passive||!u&&n.passive!==!1,Ae=Es(a,ii),Ze=Es(a,Tn),D=Ae(),A=Ze(),H=~o.indexOf("touch")&&!~o.indexOf("pointer")&&Xi[0]==="pointerdown",ae=gl(a),oe=a.ownerDocument||hs,$=[0,0,0],Ce=[0,0,0],me=0,Ue=function(){return me=ml()},Te=function(Oe,dt){return(z.event=Oe)&&h&&~h.indexOf(Oe.target)||dt&&H&&Oe.pointerType!=="touch"||C&&C(Oe,dt)},he=function(){z._vx.reset(),z._vy.reset(),tt.pause(),d&&d(z)},Q=function(){var Oe=z.deltaX=w0($),dt=z.deltaY=w0(Ce),Pe=Math.abs(Oe)>=i,Ke=Math.abs(dt)>=i;L&&(Pe||Ke)&&L(z,Oe,dt,$,Ce),Pe&&(E&&z.deltaX>0&&E(z),b&&z.deltaX<0&&b(z),w&&w(z),F&&z.deltaX<0!=pt<0&&F(z),pt=z.deltaX,$[0]=$[1]=$[2]=0),Ke&&(P&&z.deltaY>0&&P(z),S&&z.deltaY<0&&S(z),M&&M(z),G&&z.deltaY<0!=Fe<0&&G(z),Fe=z.deltaY,Ce[0]=Ce[1]=Ce[2]=0),(Ie||ht)&&(Z&&Z(z),ht&&(m&&ht===1&&m(z),y&&y(z),ht=0),Ie=!1),N&&!(N=!1)&&Ye&&Ye(z),ct&&(xe(z),ct=!1),ye=0},Ge=function(Oe,dt,Pe){$[Pe]+=Oe,Ce[Pe]+=dt,z._vx.update(Oe),z._vy.update(dt),c?ye||(ye=requestAnimationFrame(Q)):Q()},We=function(Oe,dt){be&&!st&&(z.axis=st=Math.abs(Oe)>Math.abs(dt)?"x":"y",N=!0),st!=="y"&&($[2]+=Oe,z._vx.update(Oe,!0)),st!=="x"&&(Ce[2]+=dt,z._vy.update(dt,!0)),c?ye||(ye=requestAnimationFrame(Q)):Q()},Se=function(Oe){if(!Te(Oe,1)){Oe=Wa(Oe,u);var dt=Oe.clientX,Pe=Oe.clientY,Ke=dt-z.x,Ve=Pe-z.y,rt=z.isDragging;z.x=dt,z.y=Pe,(rt||(Ke||Ve)&&(Math.abs(z.startX-dt)>=s||Math.abs(z.startY-Pe)>=s))&&(ht=rt?2:1,rt||(z.isDragging=!0),We(Ke,Ve))}},Ee=z.onPress=function(Be){Te(Be,1)||Be&&Be.button||(z.axis=st=null,tt.pause(),z.isPressed=!0,Be=Wa(Be),pt=Fe=0,z.startX=z.x=Be.clientX,z.startY=z.y=Be.clientY,z._vx.reset(),z._vy.reset(),Kn(Y?a:oe,Xi[1],Se,Pt,!0),z.deltaX=z.deltaY=0,v&&v(z))},O=z.onRelease=function(Be){if(!Te(Be,1)){$n(Y?a:oe,Xi[1],Se,!0);var Oe=!isNaN(z.y-z.startY),dt=z.isDragging,Pe=dt&&(Math.abs(z.x-z.startX)>3||Math.abs(z.y-z.startY)>3),Ke=Wa(Be);!Pe&&Oe&&(z._vx.reset(),z._vy.reset(),u&&ie&&Un.delayedCall(.08,function(){if(ml()-me>300&&!Be.defaultPrevented){if(Be.target.click)Be.target.click();else if(oe.createEvent){var Ve=oe.createEvent("MouseEvents");Ve.initMouseEvent("click",!0,!0,Mi,1,Ke.screenX,Ke.screenY,Ke.clientX,Ke.clientY,!1,!1,!1,!1,0,null),Be.target.dispatchEvent(Ve)}}})),z.isDragging=z.isGesturing=z.isPressed=!1,d&&dt&&!Y&&tt.restart(!0),ht&&Q(),p&&dt&&p(z),x&&x(z,Pe)}},we=function(Oe){return Oe.touches&&Oe.touches.length>1&&(z.isGesturing=!0)&&de(Oe,z.isDragging)},se=function(){return(z.isGesturing=!1)||I(z)},ge=function(Oe){if(!Te(Oe)){var dt=Ae(),Pe=Ze();Ge((dt-D)*qe,(Pe-A)*qe,1),D=dt,A=Pe,d&&tt.restart(!0)}},le=function(Oe){if(!Te(Oe)){Oe=Wa(Oe,u),xe&&(ct=!0);var dt=(Oe.deltaMode===1?l:Oe.deltaMode===2?Mi.innerHeight:1)*_;Ge(Oe.deltaX*dt,Oe.deltaY*dt,0),d&&!Y&&tt.restart(!0)}},ue=function(Oe){if(!Te(Oe)){var dt=Oe.clientX,Pe=Oe.clientY,Ke=dt-z.x,Ve=Pe-z.y;z.x=dt,z.y=Pe,Ie=!0,d&&tt.restart(!0),(Ke||Ve)&&We(Ke,Ve)}},ke=function(Oe){z.event=Oe,U(z)},it=function(Oe){z.event=Oe,X(z)},Ut=function(Oe){return Te(Oe)||Wa(Oe,u)&&Xe(z)};tt=z._dc=Un.delayedCall(f||.25,he).pause(),z.deltaX=z.deltaY=0,z._vx=uh(0,50,!0),z._vy=uh(0,50,!0),z.scrollX=Ae,z.scrollY=Ze,z.isDragging=z.isGesturing=z.isPressed=!1,sx(this),z.enable=function(Be){return z.isEnabled||(Kn(ae?oe:a,"scroll",ch),o.indexOf("scroll")>=0&&Kn(ae?oe:a,"scroll",ge,Pt,ne),o.indexOf("wheel")>=0&&Kn(a,"wheel",le,Pt,ne),(o.indexOf("touch")>=0&&ix||o.indexOf("pointer")>=0)&&(Kn(a,Xi[0],Ee,Pt,ne),Kn(oe,Xi[2],O),Kn(oe,Xi[3],O),ie&&Kn(a,"click",Ue,!0,!0),Xe&&Kn(a,"click",Ut),de&&Kn(oe,"gesturestart",we),I&&Kn(oe,"gestureend",se),U&&Kn(a,Gs+"enter",ke),X&&Kn(a,Gs+"leave",it),Z&&Kn(a,Gs+"move",ue)),z.isEnabled=!0,z.isDragging=z.isGesturing=z.isPressed=Ie=ht=!1,z._vx.reset(),z._vy.reset(),D=Ae(),A=Ze(),Be&&Be.type&&Ee(Be),ve&&ve(z)),z},z.disable=function(){z.isEnabled&&(Ko.filter(function(Be){return Be!==z&&gl(Be.target)}).length||$n(ae?oe:a,"scroll",ch),z.isPressed&&(z._vx.reset(),z._vy.reset(),$n(Y?a:oe,Xi[1],Se,!0)),$n(ae?oe:a,"scroll",ge,ne),$n(a,"wheel",le,ne),$n(a,Xi[0],Ee,ne),$n(oe,Xi[2],O),$n(oe,Xi[3],O),$n(a,"click",Ue,!0),$n(a,"click",Ut),$n(oe,"gesturestart",we),$n(oe,"gestureend",se),$n(a,Gs+"enter",ke),$n(a,Gs+"leave",it),$n(a,Gs+"move",ue),z.isEnabled=z.isPressed=z.isDragging=!1,ee&&ee(z))},z.kill=z.revert=function(){z.disable();var Be=Ko.indexOf(z);Be>=0&&Ko.splice(Be,1),zr===z&&(zr=0)},Ko.push(z),Y&&gl(a)&&(zr=z),z.enable(g)},qA(r,[{key:"velocityX",get:function(){return this._vx.getVelocity()}},{key:"velocityY",get:function(){return this._vy.getVelocity()}}]),r})();mn.version="3.12.7";mn.create=function(r){return new mn(r)};mn.register=cx;mn.getAll=function(){return Ko.slice()};mn.getById=function(r){return Ko.filter(function(e){return e.vars.id===r})[0]};ox()&&Un.registerPlugin(mn);/*!
 * ScrollTrigger 3.12.7
 * https://gsap.com
 *
 * @license Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license or for
 * Club GSAP members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/var je,Xo,Mt,tn,Si,Xt,fp,Su,Vl,_l,Ja,Cc,Hn,ku,dh,Qn,M0,T0,qo,ux,Ud,dx,Jn,fh,fx,hx,as,hh,hp,ra,pp,wu,ph,kd,Rc=1,Gn=Date.now,Bd=Gn(),zi=0,Qa=0,E0=function(e,t,n){var i=yi(e)&&(e.substr(0,6)==="clamp("||e.indexOf("max")>-1);return n["_"+t+"Clamp"]=i,i?e.substr(6,e.length-7):e},A0=function(e,t){return t&&(!yi(e)||e.substr(0,6)!=="clamp(")?"clamp("+e+")":e},jA=function r(){return Qa&&requestAnimationFrame(r)},C0=function(){return ku=1},R0=function(){return ku=0},ar=function(e){return e},el=function(e){return Math.round(e*1e5)/1e5||0},px=function(){return typeof window<"u"},mx=function(){return je||px()&&(je=window.gsap)&&je.registerPlugin&&je},fo=function(e){return!!~fp.indexOf(e)},gx=function(e){return(e==="Height"?pp:Mt["inner"+e])||Si["client"+e]||Xt["client"+e]},_x=function(e){return bs(e,"getBoundingClientRect")||(fo(e)?function(){return tu.width=Mt.innerWidth,tu.height=pp,tu}:function(){return Fr(e)})},$A=function(e,t,n){var i=n.d,s=n.d2,o=n.a;return(o=bs(e,"getBoundingClientRect"))?function(){return o()[i]}:function(){return(t?gx(s):e["client"+s])||0}},KA=function(e,t){return!t||~xr.indexOf(e)?_x(e):function(){return tu}},pr=function(e,t){var n=t.s,i=t.d2,s=t.d,o=t.a;return Math.max(0,(n="scroll"+i)&&(o=bs(e,n))?o()-_x(e)()[s]:fo(e)?(Si[n]||Xt[n])-gx(i):e[n]-e["offset"+i])},Pc=function(e,t){for(var n=0;n<qo.length;n+=3)(!t||~t.indexOf(qo[n+1]))&&e(qo[n],qo[n+1],qo[n+2])},yi=function(e){return typeof e=="string"},Xn=function(e){return typeof e=="function"},tl=function(e){return typeof e=="number"},Ws=function(e){return typeof e=="object"},Xa=function(e,t,n){return e&&e.progress(t?0:1)&&n&&e.pause()},zd=function(e,t){if(e.enabled){var n=e._ctx?e._ctx.add(function(){return t(e)}):t(e);n&&n.totalTime&&(e.callbackAnimation=n)}},zo=Math.abs,xx="left",vx="top",mp="right",gp="bottom",ro="width",so="height",xl="Right",vl="Left",yl="Top",bl="Bottom",yn="padding",Oi="margin",Ma="Width",_p="Height",Mn="px",Ni=function(e){return Mt.getComputedStyle(e)},ZA=function(e){var t=Ni(e).position;e.style.position=t==="absolute"||t==="fixed"?t:"relative"},P0=function(e,t){for(var n in t)n in e||(e[n]=t[n]);return e},Fr=function(e,t){var n=t&&Ni(e)[dh]!=="matrix(1, 0, 0, 1, 0, 0)"&&je.to(e,{x:0,y:0,xPercent:0,yPercent:0,rotation:0,rotationX:0,rotationY:0,scale:1,skewX:0,skewY:0}).progress(1),i=e.getBoundingClientRect();return n&&n.progress(0).kill(),i},Mu=function(e,t){var n=t.d2;return e["offset"+n]||e["client"+n]||0},yx=function(e){var t=[],n=e.labels,i=e.duration(),s;for(s in n)t.push(n[s]/i);return t},JA=function(e){return function(t){return je.utils.snap(yx(e),t)}},xp=function(e){var t=je.utils.snap(e),n=Array.isArray(e)&&e.slice(0).sort(function(i,s){return i-s});return n?function(i,s,o){o===void 0&&(o=.001);var a;if(!s)return t(i);if(s>0){for(i-=o,a=0;a<n.length;a++)if(n[a]>=i)return n[a];return n[a-1]}else for(a=n.length,i+=o;a--;)if(n[a]<=i)return n[a];return n[0]}:function(i,s,o){o===void 0&&(o=.001);var a=t(i);return!s||Math.abs(a-i)<o||a-i<0==s<0?a:t(s<0?i-e:i+e)}},QA=function(e){return function(t,n){return xp(yx(e))(t,n.direction)}},Lc=function(e,t,n,i){return n.split(",").forEach(function(s){return e(t,s,i)})},Dn=function(e,t,n,i,s){return e.addEventListener(t,n,{passive:!i,capture:!!s})},Ln=function(e,t,n,i){return e.removeEventListener(t,n,!!i)},Dc=function(e,t,n){n=n&&n.wheelHandler,n&&(e(t,"wheel",n),e(t,"touchmove",n))},L0={startColor:"green",endColor:"red",indent:0,fontSize:"16px",fontWeight:"normal"},Ic={toggleActions:"play",anticipatePin:0},Tu={top:0,left:0,center:.5,bottom:1,right:1},Zc=function(e,t){if(yi(e)){var n=e.indexOf("="),i=~n?+(e.charAt(n-1)+1)*parseFloat(e.substr(n+1)):0;~n&&(e.indexOf("%")>n&&(i*=t/100),e=e.substr(0,n-1)),e=i+(e in Tu?Tu[e]*t:~e.indexOf("%")?parseFloat(e)*t/100:parseFloat(e)||0)}return e},Oc=function(e,t,n,i,s,o,a,l){var c=s.startColor,u=s.endColor,d=s.fontSize,f=s.indent,h=s.fontWeight,_=tn.createElement("div"),g=fo(n)||bs(n,"pinType")==="fixed",m=e.indexOf("scroller")!==-1,p=g?Xt:n,y=e.indexOf("start")!==-1,v=y?c:u,x="border-color:"+v+";font-size:"+d+";color:"+v+";font-weight:"+h+";pointer-events:none;white-space:nowrap;font-family:sans-serif,Arial;z-index:1000;padding:4px 8px;border-width:0;border-style:solid;";return x+="position:"+((m||l)&&g?"fixed;":"absolute;"),(m||l||!g)&&(x+=(i===Tn?mp:gp)+":"+(o+parseFloat(f))+"px;"),a&&(x+="box-sizing:border-box;text-align:left;width:"+a.offsetWidth+"px;"),_._isStart=y,_.setAttribute("class","gsap-marker-"+e+(t?" marker-"+t:"")),_.style.cssText=x,_.innerText=t||t===0?e+"-"+t:e,p.children[0]?p.insertBefore(_,p.children[0]):p.appendChild(_),_._offset=_["offset"+i.op.d2],Jc(_,0,i,y),_},Jc=function(e,t,n,i){var s={display:"block"},o=n[i?"os2":"p2"],a=n[i?"p2":"os2"];e._isFlipped=i,s[n.a+"Percent"]=i?-100:0,s[n.a]=i?"1px":0,s["border"+o+Ma]=1,s["border"+a+Ma]=0,s[n.p]=t+"px",je.set(e,s)},St=[],mh={},Hl,D0=function(){return Gn()-zi>34&&(Hl||(Hl=requestAnimationFrame(Xr)))},Vo=function(){(!Jn||!Jn.isPressed||Jn.startX>Xt.clientWidth)&&(Tt.cache++,Jn?Hl||(Hl=requestAnimationFrame(Xr)):Xr(),zi||po("scrollStart"),zi=Gn())},Vd=function(){hx=Mt.innerWidth,fx=Mt.innerHeight},nl=function(e){Tt.cache++,(e===!0||!Hn&&!dx&&!tn.fullscreenElement&&!tn.webkitFullscreenElement&&(!fh||hx!==Mt.innerWidth||Math.abs(Mt.innerHeight-fx)>Mt.innerHeight*.25))&&Su.restart(!0)},ho={},eC=[],bx=function r(){return Ln($e,"scrollEnd",r)||Ks(!0)},po=function(e){return ho[e]&&ho[e].map(function(t){return t()})||eC},vi=[],Sx=function(e){for(var t=0;t<vi.length;t+=5)(!e||vi[t+4]&&vi[t+4].query===e)&&(vi[t].style.cssText=vi[t+1],vi[t].getBBox&&vi[t].setAttribute("transform",vi[t+2]||""),vi[t+3].uncache=1)},vp=function(e,t){var n;for(Qn=0;Qn<St.length;Qn++)n=St[Qn],n&&(!t||n._ctx===t)&&(e?n.kill(1):n.revert(!0,!0));wu=!0,t&&Sx(t),t||po("revert")},wx=function(e,t){Tt.cache++,(t||!ei)&&Tt.forEach(function(n){return Xn(n)&&n.cacheID++&&(n.rec=0)}),yi(e)&&(Mt.history.scrollRestoration=hp=e)},ei,oo=0,I0,tC=function(){if(I0!==oo){var e=I0=oo;requestAnimationFrame(function(){return e===oo&&Ks(!0)})}},Mx=function(){Xt.appendChild(ra),pp=!Jn&&ra.offsetHeight||Mt.innerHeight,Xt.removeChild(ra)},O0=function(e){return Vl(".gsap-marker-start, .gsap-marker-end, .gsap-marker-scroller-start, .gsap-marker-scroller-end").forEach(function(t){return t.style.display=e?"none":"block"})},Ks=function(e,t){if(Si=tn.documentElement,Xt=tn.body,fp=[Mt,tn,Si,Xt],zi&&!e&&!wu){Dn($e,"scrollEnd",bx);return}Mx(),ei=$e.isRefreshing=!0,Tt.forEach(function(i){return Xn(i)&&++i.cacheID&&(i.rec=i())});var n=po("refreshInit");ux&&$e.sort(),t||vp(),Tt.forEach(function(i){Xn(i)&&(i.smooth&&(i.target.style.scrollBehavior="auto"),i(0))}),St.slice(0).forEach(function(i){return i.refresh()}),wu=!1,St.forEach(function(i){if(i._subPinOffset&&i.pin){var s=i.vars.horizontal?"offsetWidth":"offsetHeight",o=i.pin[s];i.revert(!0,1),i.adjustPinSpacing(i.pin[s]-o),i.refresh()}}),ph=1,O0(!0),St.forEach(function(i){var s=pr(i.scroller,i._dir),o=i.vars.end==="max"||i._endClamp&&i.end>s,a=i._startClamp&&i.start>=s;(o||a)&&i.setPositions(a?s-1:i.start,o?Math.max(a?s:i.start+1,s):i.end,!0)}),O0(!1),ph=0,n.forEach(function(i){return i&&i.render&&i.render(-1)}),Tt.forEach(function(i){Xn(i)&&(i.smooth&&requestAnimationFrame(function(){return i.target.style.scrollBehavior="smooth"}),i.rec&&i(i.rec))}),wx(hp,1),Su.pause(),oo++,ei=2,Xr(2),St.forEach(function(i){return Xn(i.vars.onRefresh)&&i.vars.onRefresh(i)}),ei=$e.isRefreshing=!1,po("refresh")},gh=0,Qc=1,Sl,Xr=function(e){if(e===2||!ei&&!wu){$e.isUpdating=!0,Sl&&Sl.update(0);var t=St.length,n=Gn(),i=n-Bd>=50,s=t&&St[0].scroll();if(Qc=gh>s?-1:1,ei||(gh=s),i&&(zi&&!ku&&n-zi>200&&(zi=0,po("scrollEnd")),Ja=Bd,Bd=n),Qc<0){for(Qn=t;Qn-- >0;)St[Qn]&&St[Qn].update(0,i);Qc=1}else for(Qn=0;Qn<t;Qn++)St[Qn]&&St[Qn].update(0,i);$e.isUpdating=!1}Hl=0},_h=[xx,vx,gp,mp,Oi+bl,Oi+xl,Oi+yl,Oi+vl,"display","flexShrink","float","zIndex","gridColumnStart","gridColumnEnd","gridRowStart","gridRowEnd","gridArea","justifySelf","alignSelf","placeSelf","order"],eu=_h.concat([ro,so,"boxSizing","max"+Ma,"max"+_p,"position",Oi,yn,yn+yl,yn+xl,yn+bl,yn+vl]),nC=function(e,t,n){sa(n);var i=e._gsap;if(i.spacerIsNative)sa(i.spacerState);else if(e._gsap.swappedIn){var s=t.parentNode;s&&(s.insertBefore(e,t),s.removeChild(t))}e._gsap.swappedIn=!1},Hd=function(e,t,n,i){if(!e._gsap.swappedIn){for(var s=_h.length,o=t.style,a=e.style,l;s--;)l=_h[s],o[l]=n[l];o.position=n.position==="absolute"?"absolute":"relative",n.display==="inline"&&(o.display="inline-block"),a[gp]=a[mp]="auto",o.flexBasis=n.flexBasis||"auto",o.overflow="visible",o.boxSizing="border-box",o[ro]=Mu(e,ii)+Mn,o[so]=Mu(e,Tn)+Mn,o[yn]=a[Oi]=a[vx]=a[xx]="0",sa(i),a[ro]=a["max"+Ma]=n[ro],a[so]=a["max"+_p]=n[so],a[yn]=n[yn],e.parentNode!==t&&(e.parentNode.insertBefore(t,e),t.appendChild(e)),e._gsap.swappedIn=!0}},iC=/([A-Z])/g,sa=function(e){if(e){var t=e.t.style,n=e.length,i=0,s,o;for((e.t._gsap||je.core.getCache(e.t)).uncache=1;i<n;i+=2)o=e[i+1],s=e[i],o?t[s]=o:t[s]&&t.removeProperty(s.replace(iC,"-$1").toLowerCase())}},Nc=function(e){for(var t=eu.length,n=e.style,i=[],s=0;s<t;s++)i.push(eu[s],n[eu[s]]);return i.t=e,i},rC=function(e,t,n){for(var i=[],s=e.length,o=n?8:0,a;o<s;o+=2)a=e[o],i.push(a,a in t?t[a]:e[o+1]);return i.t=e.t,i},tu={left:0,top:0},N0=function(e,t,n,i,s,o,a,l,c,u,d,f,h,_){Xn(e)&&(e=e(l)),yi(e)&&e.substr(0,3)==="max"&&(e=f+(e.charAt(4)==="="?Zc("0"+e.substr(3),n):0));var g=h?h.time():0,m,p,y;if(h&&h.seek(0),isNaN(e)||(e=+e),tl(e))h&&(e=je.utils.mapRange(h.scrollTrigger.start,h.scrollTrigger.end,0,f,e)),a&&Jc(a,n,i,!0);else{Xn(t)&&(t=t(l));var v=(e||"0").split(" "),x,E,b,S;y=oi(t,l)||Xt,x=Fr(y)||{},(!x||!x.left&&!x.top)&&Ni(y).display==="none"&&(S=y.style.display,y.style.display="block",x=Fr(y),S?y.style.display=S:y.style.removeProperty("display")),E=Zc(v[0],x[i.d]),b=Zc(v[1]||"0",n),e=x[i.p]-c[i.p]-u+E+s-b,a&&Jc(a,b,i,n-b<20||a._isStart&&b>20),n-=n-b}if(_&&(l[_]=e||-.001,e<0&&(e=0)),o){var P=e+n,w=o._isStart;m="scroll"+i.d2,Jc(o,P,i,w&&P>20||!w&&(d?Math.max(Xt[m],Si[m]):o.parentNode[m])<=P+1),d&&(c=Fr(a),d&&(o.style[i.op.p]=c[i.op.p]-i.op.m-o._offset+Mn))}return h&&y&&(m=Fr(y),h.seek(f),p=Fr(y),h._caScrollDist=m[i.p]-p[i.p],e=e/h._caScrollDist*f),h&&h.seek(g),h?e:Math.round(e)},sC=/(webkit|moz|length|cssText|inset)/i,F0=function(e,t,n,i){if(e.parentNode!==t){var s=e.style,o,a;if(t===Xt){e._stOrig=s.cssText,a=Ni(e);for(o in a)!+o&&!sC.test(o)&&a[o]&&typeof s[o]=="string"&&o!=="0"&&(s[o]=a[o]);s.top=n,s.left=i}else s.cssText=e._stOrig;je.core.getCache(e).uncache=1,t.appendChild(e)}},Tx=function(e,t,n){var i=t,s=i;return function(o){var a=Math.round(e());return a!==i&&a!==s&&Math.abs(a-i)>3&&Math.abs(a-s)>3&&(o=a,n&&n()),s=i,i=Math.round(o),i}},Fc=function(e,t,n){var i={};i[t.p]="+="+n,je.set(e,i)},U0=function(e,t){var n=Es(e,t),i="_scroll"+t.p2,s=function o(a,l,c,u,d){var f=o.tween,h=l.onComplete,_={};c=c||n();var g=Tx(n,c,function(){f.kill(),o.tween=0});return d=u&&d||0,u=u||a-c,f&&f.kill(),l[i]=a,l.inherit=!1,l.modifiers=_,_[i]=function(){return g(c+u*f.ratio+d*f.ratio*f.ratio)},l.onUpdate=function(){Tt.cache++,o.tween&&Xr()},l.onComplete=function(){o.tween=0,h&&h.call(f)},f=o.tween=je.to(e,l),f};return e[i]=n,n.wheelHandler=function(){return s.tween&&s.tween.kill()&&(s.tween=0)},Dn(e,"wheel",n.wheelHandler),$e.isTouch&&Dn(e,"touchmove",n.wheelHandler),s},$e=(function(){function r(t,n){Xo||r.register(je)||console.warn("Please gsap.registerPlugin(ScrollTrigger)"),hh(this),this.init(t,n)}var e=r.prototype;return e.init=function(n,i){if(this.progress=this.start=0,this.vars&&this.kill(!0,!0),!Qa){this.update=this.refresh=this.kill=ar;return}n=P0(yi(n)||tl(n)||n.nodeType?{trigger:n}:n,Ic);var s=n,o=s.onUpdate,a=s.toggleClass,l=s.id,c=s.onToggle,u=s.onRefresh,d=s.scrub,f=s.trigger,h=s.pin,_=s.pinSpacing,g=s.invalidateOnRefresh,m=s.anticipatePin,p=s.onScrubComplete,y=s.onSnapComplete,v=s.once,x=s.snap,E=s.pinReparent,b=s.pinSpacer,S=s.containerAnimation,P=s.fastScrollEnd,w=s.preventOverlaps,M=n.horizontal||n.containerAnimation&&n.horizontal!==!1?ii:Tn,L=!d&&d!==0,F=oi(n.scroller||Mt),G=je.core.getCache(F),U=fo(F),X=("pinType"in n?n.pinType:bs(F,"pinType")||U&&"fixed")==="fixed",Z=[n.onEnter,n.onLeave,n.onEnterBack,n.onLeaveBack],C=L&&n.toggleActions.split(" "),Y="markers"in n?n.markers:Ic.markers,de=U?0:parseFloat(Ni(F)["border"+M.p2+Ma])||0,I=this,xe=n.onRefreshInit&&function(){return n.onRefreshInit(I)},ve=$A(F,U,M),ee=KA(F,U),Xe=0,qe=0,ne=0,ie=Es(F,M),be,Ye,ye,tt,ht,Ie,ct,N,st,z,pt,Fe,Pt,Ae,Ze,D,A,H,ae,oe,$,Ce,me,Ue,Te,he,Q,Ge,We,Se,Ee,O,we,se,ge,le,ue,ke,it;if(I._startClamp=I._endClamp=!1,I._dir=M,m*=45,I.scroller=F,I.scroll=S?S.time.bind(S):ie,tt=ie(),I.vars=n,i=i||n.animation,"refreshPriority"in n&&(ux=1,n.refreshPriority===-9999&&(Sl=I)),G.tweenScroll=G.tweenScroll||{top:U0(F,Tn),left:U0(F,ii)},I.tweenTo=be=G.tweenScroll[M.p],I.scrubDuration=function(Pe){we=tl(Pe)&&Pe,we?O?O.duration(Pe):O=je.to(i,{ease:"expo",totalProgress:"+=0",inherit:!1,duration:we,paused:!0,onComplete:function(){return p&&p(I)}}):(O&&O.progress(1).kill(),O=0)},i&&(i.vars.lazy=!1,i._initted&&!I.isReverted||i.vars.immediateRender!==!1&&n.immediateRender!==!1&&i.duration()&&i.render(0,!0,!0),I.animation=i.pause(),i.scrollTrigger=I,I.scrubDuration(d),Se=0,l||(l=i.vars.id)),x&&((!Ws(x)||x.push)&&(x={snapTo:x}),"scrollBehavior"in Xt.style&&je.set(U?[Xt,Si]:F,{scrollBehavior:"auto"}),Tt.forEach(function(Pe){return Xn(Pe)&&Pe.target===(U?tn.scrollingElement||Si:F)&&(Pe.smooth=!1)}),ye=Xn(x.snapTo)?x.snapTo:x.snapTo==="labels"?JA(i):x.snapTo==="labelsDirectional"?QA(i):x.directional!==!1?function(Pe,Ke){return xp(x.snapTo)(Pe,Gn()-qe<500?0:Ke.direction)}:je.utils.snap(x.snapTo),se=x.duration||{min:.1,max:2},se=Ws(se)?_l(se.min,se.max):_l(se,se),ge=je.delayedCall(x.delay||we/2||.1,function(){var Pe=ie(),Ke=Gn()-qe<500,Ve=be.tween;if((Ke||Math.abs(I.getVelocity())<10)&&!Ve&&!ku&&Xe!==Pe){var rt=(Pe-Ie)/Ae,sn=i&&!L?i.totalProgress():rt,mt=Ke?0:(sn-Ee)/(Gn()-Ja)*1e3||0,kt=je.utils.clamp(-rt,1-rt,zo(mt/2)*mt/.185),Jt=rt+(x.inertia===!1?0:kt),_t,Ht,xt=x,on=xt.onStart,Lt=xt.onInterrupt,Bn=xt.onComplete;if(_t=ye(Jt,I),tl(_t)||(_t=Jt),Ht=Math.max(0,Math.round(Ie+_t*Ae)),Pe<=ct&&Pe>=Ie&&Ht!==Pe){if(Ve&&!Ve._initted&&Ve.data<=zo(Ht-Pe))return;x.inertia===!1&&(kt=_t-rt),be(Ht,{duration:se(zo(Math.max(zo(Jt-sn),zo(_t-sn))*.185/mt/.05||0)),ease:x.ease||"power3",data:zo(Ht-Pe),onInterrupt:function(){return ge.restart(!0)&&Lt&&Lt(I)},onComplete:function(){I.update(),Xe=ie(),i&&!L&&(O?O.resetTo("totalProgress",_t,i._tTime/i._tDur):i.progress(_t)),Se=Ee=i&&!L?i.totalProgress():I.progress,y&&y(I),Bn&&Bn(I)}},Pe,kt*Ae,Ht-Pe-kt*Ae),on&&on(I,be.tween)}}else I.isActive&&Xe!==Pe&&ge.restart(!0)}).pause()),l&&(mh[l]=I),f=I.trigger=oi(f||h!==!0&&h),it=f&&f._gsap&&f._gsap.stRevert,it&&(it=it(I)),h=h===!0?f:oi(h),yi(a)&&(a={targets:f,className:a}),h&&(_===!1||_===Oi||(_=!_&&h.parentNode&&h.parentNode.style&&Ni(h.parentNode).display==="flex"?!1:yn),I.pin=h,Ye=je.core.getCache(h),Ye.spacer?Ze=Ye.pinState:(b&&(b=oi(b),b&&!b.nodeType&&(b=b.current||b.nativeElement),Ye.spacerIsNative=!!b,b&&(Ye.spacerState=Nc(b))),Ye.spacer=H=b||tn.createElement("div"),H.classList.add("pin-spacer"),l&&H.classList.add("pin-spacer-"+l),Ye.pinState=Ze=Nc(h)),n.force3D!==!1&&je.set(h,{force3D:!0}),I.spacer=H=Ye.spacer,We=Ni(h),Ue=We[_+M.os2],oe=je.getProperty(h),$=je.quickSetter(h,M.a,Mn),Hd(h,H,We),A=Nc(h)),Y){Fe=Ws(Y)?P0(Y,L0):L0,z=Oc("scroller-start",l,F,M,Fe,0),pt=Oc("scroller-end",l,F,M,Fe,0,z),ae=z["offset"+M.op.d2];var Ut=oi(bs(F,"content")||F);N=this.markerStart=Oc("start",l,Ut,M,Fe,ae,0,S),st=this.markerEnd=Oc("end",l,Ut,M,Fe,ae,0,S),S&&(ke=je.quickSetter([N,st],M.a,Mn)),!X&&!(xr.length&&bs(F,"fixedMarkers")===!0)&&(ZA(U?Xt:F),je.set([z,pt],{force3D:!0}),he=je.quickSetter(z,M.a,Mn),Ge=je.quickSetter(pt,M.a,Mn))}if(S){var Be=S.vars.onUpdate,Oe=S.vars.onUpdateParams;S.eventCallback("onUpdate",function(){I.update(0,0,1),Be&&Be.apply(S,Oe||[])})}if(I.previous=function(){return St[St.indexOf(I)-1]},I.next=function(){return St[St.indexOf(I)+1]},I.revert=function(Pe,Ke){if(!Ke)return I.kill(!0);var Ve=Pe!==!1||!I.enabled,rt=Hn;Ve!==I.isReverted&&(Ve&&(le=Math.max(ie(),I.scroll.rec||0),ne=I.progress,ue=i&&i.progress()),N&&[N,st,z,pt].forEach(function(sn){return sn.style.display=Ve?"none":"block"}),Ve&&(Hn=I,I.update(Ve)),h&&(!E||!I.isActive)&&(Ve?nC(h,H,Ze):Hd(h,H,Ni(h),Te)),Ve||I.update(Ve),Hn=rt,I.isReverted=Ve)},I.refresh=function(Pe,Ke,Ve,rt){if(!((Hn||!I.enabled)&&!Ke)){if(h&&Pe&&zi){Dn(r,"scrollEnd",bx);return}!ei&&xe&&xe(I),Hn=I,be.tween&&!Ve&&(be.tween.kill(),be.tween=0),O&&O.pause(),g&&i&&i.revert({kill:!1}).invalidate(),I.isReverted||I.revert(!0,!0),I._subPinOffset=!1;var sn=ve(),mt=ee(),kt=S?S.duration():pr(F,M),Jt=Ae<=.01,_t=0,Ht=rt||0,xt=Ws(Ve)?Ve.end:n.end,on=n.endTrigger||f,Lt=Ws(Ve)?Ve.start:n.start||(n.start===0||!f?0:h?"0 0":"0 100%"),Bn=I.pinnedContainer=n.pinnedContainer&&oi(n.pinnedContainer,I),Re=f&&Math.max(0,St.indexOf(I))||0,Nt=Re,dn,gn,R,W,K,j,V,pe,Le,He,_e,et,ot;for(Y&&Ws(Ve)&&(et=je.getProperty(z,M.p),ot=je.getProperty(pt,M.p));Nt-- >0;)j=St[Nt],j.end||j.refresh(0,1)||(Hn=I),V=j.pin,V&&(V===f||V===h||V===Bn)&&!j.isReverted&&(He||(He=[]),He.unshift(j),j.revert(!0,!0)),j!==St[Nt]&&(Re--,Nt--);for(Xn(Lt)&&(Lt=Lt(I)),Lt=E0(Lt,"start",I),Ie=N0(Lt,f,sn,M,ie(),N,z,I,mt,de,X,kt,S,I._startClamp&&"_startClamp")||(h?-.001:0),Xn(xt)&&(xt=xt(I)),yi(xt)&&!xt.indexOf("+=")&&(~xt.indexOf(" ")?xt=(yi(Lt)?Lt.split(" ")[0]:"")+xt:(_t=Zc(xt.substr(2),sn),xt=yi(Lt)?Lt:(S?je.utils.mapRange(0,S.duration(),S.scrollTrigger.start,S.scrollTrigger.end,Ie):Ie)+_t,on=f)),xt=E0(xt,"end",I),ct=Math.max(Ie,N0(xt||(on?"100% 0":kt),on,sn,M,ie()+_t,st,pt,I,mt,de,X,kt,S,I._endClamp&&"_endClamp"))||-.001,_t=0,Nt=Re;Nt--;)j=St[Nt],V=j.pin,V&&j.start-j._pinPush<=Ie&&!S&&j.end>0&&(dn=j.end-(I._startClamp?Math.max(0,j.start):j.start),(V===f&&j.start-j._pinPush<Ie||V===Bn)&&isNaN(Lt)&&(_t+=dn*(1-j.progress)),V===h&&(Ht+=dn));if(Ie+=_t,ct+=_t,I._startClamp&&(I._startClamp+=_t),I._endClamp&&!ei&&(I._endClamp=ct||-.001,ct=Math.min(ct,pr(F,M))),Ae=ct-Ie||(Ie-=.01)&&.001,Jt&&(ne=je.utils.clamp(0,1,je.utils.normalize(Ie,ct,le))),I._pinPush=Ht,N&&_t&&(dn={},dn[M.a]="+="+_t,Bn&&(dn[M.p]="-="+ie()),je.set([N,st],dn)),h&&!(ph&&I.end>=pr(F,M)))dn=Ni(h),W=M===Tn,R=ie(),Ce=parseFloat(oe(M.a))+Ht,!kt&&ct>1&&(_e=(U?tn.scrollingElement||Si:F).style,_e={style:_e,value:_e["overflow"+M.a.toUpperCase()]},U&&Ni(Xt)["overflow"+M.a.toUpperCase()]!=="scroll"&&(_e.style["overflow"+M.a.toUpperCase()]="scroll")),Hd(h,H,dn),A=Nc(h),gn=Fr(h,!0),pe=X&&Es(F,W?ii:Tn)(),_?(Te=[_+M.os2,Ae+Ht+Mn],Te.t=H,Nt=_===yn?Mu(h,M)+Ae+Ht:0,Nt&&(Te.push(M.d,Nt+Mn),H.style.flexBasis!=="auto"&&(H.style.flexBasis=Nt+Mn)),sa(Te),Bn&&St.forEach(function(Je){Je.pin===Bn&&Je.vars.pinSpacing!==!1&&(Je._subPinOffset=!0)}),X&&ie(le)):(Nt=Mu(h,M),Nt&&H.style.flexBasis!=="auto"&&(H.style.flexBasis=Nt+Mn)),X&&(K={top:gn.top+(W?R-Ie:pe)+Mn,left:gn.left+(W?pe:R-Ie)+Mn,boxSizing:"border-box",position:"fixed"},K[ro]=K["max"+Ma]=Math.ceil(gn.width)+Mn,K[so]=K["max"+_p]=Math.ceil(gn.height)+Mn,K[Oi]=K[Oi+yl]=K[Oi+xl]=K[Oi+bl]=K[Oi+vl]="0",K[yn]=dn[yn],K[yn+yl]=dn[yn+yl],K[yn+xl]=dn[yn+xl],K[yn+bl]=dn[yn+bl],K[yn+vl]=dn[yn+vl],D=rC(Ze,K,E),ei&&ie(0)),i?(Le=i._initted,Ud(1),i.render(i.duration(),!0,!0),me=oe(M.a)-Ce+Ae+Ht,Q=Math.abs(Ae-me)>1,X&&Q&&D.splice(D.length-2,2),i.render(0,!0,!0),Le||i.invalidate(!0),i.parent||i.totalTime(i.totalTime()),Ud(0)):me=Ae,_e&&(_e.value?_e.style["overflow"+M.a.toUpperCase()]=_e.value:_e.style.removeProperty("overflow-"+M.a));else if(f&&ie()&&!S)for(gn=f.parentNode;gn&&gn!==Xt;)gn._pinOffset&&(Ie-=gn._pinOffset,ct-=gn._pinOffset),gn=gn.parentNode;He&&He.forEach(function(Je){return Je.revert(!1,!0)}),I.start=Ie,I.end=ct,tt=ht=ei?le:ie(),!S&&!ei&&(tt<le&&ie(le),I.scroll.rec=0),I.revert(!1,!0),qe=Gn(),ge&&(Xe=-1,ge.restart(!0)),Hn=0,i&&L&&(i._initted||ue)&&i.progress()!==ue&&i.progress(ue||0,!0).render(i.time(),!0,!0),(Jt||ne!==I.progress||S||g||i&&!i._initted)&&(i&&!L&&i.totalProgress(S&&Ie<-.001&&!ne?je.utils.normalize(Ie,ct,0):ne,!0),I.progress=Jt||(tt-Ie)/Ae===ne?0:ne),h&&_&&(H._pinOffset=Math.round(I.progress*me)),O&&O.invalidate(),isNaN(et)||(et-=je.getProperty(z,M.p),ot-=je.getProperty(pt,M.p),Fc(z,M,et),Fc(N,M,et-(rt||0)),Fc(pt,M,ot),Fc(st,M,ot-(rt||0))),Jt&&!ei&&I.update(),u&&!ei&&!Pt&&(Pt=!0,u(I),Pt=!1)}},I.getVelocity=function(){return(ie()-ht)/(Gn()-Ja)*1e3||0},I.endAnimation=function(){Xa(I.callbackAnimation),i&&(O?O.progress(1):i.paused()?L||Xa(i,I.direction<0,1):Xa(i,i.reversed()))},I.labelToScroll=function(Pe){return i&&i.labels&&(Ie||I.refresh()||Ie)+i.labels[Pe]/i.duration()*Ae||0},I.getTrailing=function(Pe){var Ke=St.indexOf(I),Ve=I.direction>0?St.slice(0,Ke).reverse():St.slice(Ke+1);return(yi(Pe)?Ve.filter(function(rt){return rt.vars.preventOverlaps===Pe}):Ve).filter(function(rt){return I.direction>0?rt.end<=Ie:rt.start>=ct})},I.update=function(Pe,Ke,Ve){if(!(S&&!Ve&&!Pe)){var rt=ei===!0?le:I.scroll(),sn=Pe?0:(rt-Ie)/Ae,mt=sn<0?0:sn>1?1:sn||0,kt=I.progress,Jt,_t,Ht,xt,on,Lt,Bn,Re;if(Ke&&(ht=tt,tt=S?ie():rt,x&&(Ee=Se,Se=i&&!L?i.totalProgress():mt)),m&&h&&!Hn&&!Rc&&zi&&(!mt&&Ie<rt+(rt-ht)/(Gn()-Ja)*m?mt=1e-4:mt===1&&ct>rt+(rt-ht)/(Gn()-Ja)*m&&(mt=.9999)),mt!==kt&&I.enabled){if(Jt=I.isActive=!!mt&&mt<1,_t=!!kt&&kt<1,Lt=Jt!==_t,on=Lt||!!mt!=!!kt,I.direction=mt>kt?1:-1,I.progress=mt,on&&!Hn&&(Ht=mt&&!kt?0:mt===1?1:kt===1?2:3,L&&(xt=!Lt&&C[Ht+1]!=="none"&&C[Ht+1]||C[Ht],Re=i&&(xt==="complete"||xt==="reset"||xt in i))),w&&(Lt||Re)&&(Re||d||!i)&&(Xn(w)?w(I):I.getTrailing(w).forEach(function(R){return R.endAnimation()})),L||(O&&!Hn&&!Rc?(O._dp._time-O._start!==O._time&&O.render(O._dp._time-O._start),O.resetTo?O.resetTo("totalProgress",mt,i._tTime/i._tDur):(O.vars.totalProgress=mt,O.invalidate().restart())):i&&i.totalProgress(mt,!!(Hn&&(qe||Pe)))),h){if(Pe&&_&&(H.style[_+M.os2]=Ue),!X)$(el(Ce+me*mt));else if(on){if(Bn=!Pe&&mt>kt&&ct+1>rt&&rt+1>=pr(F,M),E)if(!Pe&&(Jt||Bn)){var Nt=Fr(h,!0),dn=rt-Ie;F0(h,Xt,Nt.top+(M===Tn?dn:0)+Mn,Nt.left+(M===Tn?0:dn)+Mn)}else F0(h,H);sa(Jt||Bn?D:A),Q&&mt<1&&Jt||$(Ce+(mt===1&&!Bn?me:0))}}x&&!be.tween&&!Hn&&!Rc&&ge.restart(!0),a&&(Lt||v&&mt&&(mt<1||!kd))&&Vl(a.targets).forEach(function(R){return R.classList[Jt||v?"add":"remove"](a.className)}),o&&!L&&!Pe&&o(I),on&&!Hn?(L&&(Re&&(xt==="complete"?i.pause().totalProgress(1):xt==="reset"?i.restart(!0).pause():xt==="restart"?i.restart(!0):i[xt]()),o&&o(I)),(Lt||!kd)&&(c&&Lt&&zd(I,c),Z[Ht]&&zd(I,Z[Ht]),v&&(mt===1?I.kill(!1,1):Z[Ht]=0),Lt||(Ht=mt===1?1:3,Z[Ht]&&zd(I,Z[Ht]))),P&&!Jt&&Math.abs(I.getVelocity())>(tl(P)?P:2500)&&(Xa(I.callbackAnimation),O?O.progress(1):Xa(i,xt==="reverse"?1:!mt,1))):L&&o&&!Hn&&o(I)}if(Ge){var gn=S?rt/S.duration()*(S._caScrollDist||0):rt;he(gn+(z._isFlipped?1:0)),Ge(gn)}ke&&ke(-rt/S.duration()*(S._caScrollDist||0))}},I.enable=function(Pe,Ke){I.enabled||(I.enabled=!0,Dn(F,"resize",nl),U||Dn(F,"scroll",Vo),xe&&Dn(r,"refreshInit",xe),Pe!==!1&&(I.progress=ne=0,tt=ht=Xe=ie()),Ke!==!1&&I.refresh())},I.getTween=function(Pe){return Pe&&be?be.tween:O},I.setPositions=function(Pe,Ke,Ve,rt){if(S){var sn=S.scrollTrigger,mt=S.duration(),kt=sn.end-sn.start;Pe=sn.start+kt*Pe/mt,Ke=sn.start+kt*Ke/mt}I.refresh(!1,!1,{start:A0(Pe,Ve&&!!I._startClamp),end:A0(Ke,Ve&&!!I._endClamp)},rt),I.update()},I.adjustPinSpacing=function(Pe){if(Te&&Pe){var Ke=Te.indexOf(M.d)+1;Te[Ke]=parseFloat(Te[Ke])+Pe+Mn,Te[1]=parseFloat(Te[1])+Pe+Mn,sa(Te)}},I.disable=function(Pe,Ke){if(I.enabled&&(Pe!==!1&&I.revert(!0,!0),I.enabled=I.isActive=!1,Ke||O&&O.pause(),le=0,Ye&&(Ye.uncache=1),xe&&Ln(r,"refreshInit",xe),ge&&(ge.pause(),be.tween&&be.tween.kill()&&(be.tween=0)),!U)){for(var Ve=St.length;Ve--;)if(St[Ve].scroller===F&&St[Ve]!==I)return;Ln(F,"resize",nl),U||Ln(F,"scroll",Vo)}},I.kill=function(Pe,Ke){I.disable(Pe,Ke),O&&!Ke&&O.kill(),l&&delete mh[l];var Ve=St.indexOf(I);Ve>=0&&St.splice(Ve,1),Ve===Qn&&Qc>0&&Qn--,Ve=0,St.forEach(function(rt){return rt.scroller===I.scroller&&(Ve=1)}),Ve||ei||(I.scroll.rec=0),i&&(i.scrollTrigger=null,Pe&&i.revert({kill:!1}),Ke||i.kill()),N&&[N,st,z,pt].forEach(function(rt){return rt.parentNode&&rt.parentNode.removeChild(rt)}),Sl===I&&(Sl=0),h&&(Ye&&(Ye.uncache=1),Ve=0,St.forEach(function(rt){return rt.pin===h&&Ve++}),Ve||(Ye.spacer=0)),n.onKill&&n.onKill(I)},St.push(I),I.enable(!1,!1),it&&it(I),i&&i.add&&!Ae){var dt=I.update;I.update=function(){I.update=dt,Tt.cache++,Ie||ct||I.refresh()},je.delayedCall(.01,I.update),Ae=.01,Ie=ct=0}else I.refresh();h&&tC()},r.register=function(n){return Xo||(je=n||mx(),px()&&window.document&&r.enable(),Xo=Qa),Xo},r.defaults=function(n){if(n)for(var i in n)Ic[i]=n[i];return Ic},r.disable=function(n,i){Qa=0,St.forEach(function(o){return o[i?"kill":"disable"](n)}),Ln(Mt,"wheel",Vo),Ln(tn,"scroll",Vo),clearInterval(Cc),Ln(tn,"touchcancel",ar),Ln(Xt,"touchstart",ar),Lc(Ln,tn,"pointerdown,touchstart,mousedown",C0),Lc(Ln,tn,"pointerup,touchend,mouseup",R0),Su.kill(),Pc(Ln);for(var s=0;s<Tt.length;s+=3)Dc(Ln,Tt[s],Tt[s+1]),Dc(Ln,Tt[s],Tt[s+2])},r.enable=function(){if(Mt=window,tn=document,Si=tn.documentElement,Xt=tn.body,je&&(Vl=je.utils.toArray,_l=je.utils.clamp,hh=je.core.context||ar,Ud=je.core.suppressOverwrites||ar,hp=Mt.history.scrollRestoration||"auto",gh=Mt.pageYOffset||0,je.core.globals("ScrollTrigger",r),Xt)){Qa=1,ra=document.createElement("div"),ra.style.height="100vh",ra.style.position="absolute",Mx(),jA(),mn.register(je),r.isTouch=mn.isTouch,as=mn.isTouch&&/(iPad|iPhone|iPod|Mac)/g.test(navigator.userAgent),fh=mn.isTouch===1,Dn(Mt,"wheel",Vo),fp=[Mt,tn,Si,Xt],je.matchMedia?(r.matchMedia=function(c){var u=je.matchMedia(),d;for(d in c)u.add(d,c[d]);return u},je.addEventListener("matchMediaInit",function(){return vp()}),je.addEventListener("matchMediaRevert",function(){return Sx()}),je.addEventListener("matchMedia",function(){Ks(0,1),po("matchMedia")}),je.matchMedia().add("(orientation: portrait)",function(){return Vd(),Vd})):console.warn("Requires GSAP 3.11.0 or later"),Vd(),Dn(tn,"scroll",Vo);var n=Xt.hasAttribute("style"),i=Xt.style,s=i.borderTopStyle,o=je.core.Animation.prototype,a,l;for(o.revert||Object.defineProperty(o,"revert",{value:function(){return this.time(-.01,!0)}}),i.borderTopStyle="solid",a=Fr(Xt),Tn.m=Math.round(a.top+Tn.sc())||0,ii.m=Math.round(a.left+ii.sc())||0,s?i.borderTopStyle=s:i.removeProperty("border-top-style"),n||(Xt.setAttribute("style",""),Xt.removeAttribute("style")),Cc=setInterval(D0,250),je.delayedCall(.5,function(){return Rc=0}),Dn(tn,"touchcancel",ar),Dn(Xt,"touchstart",ar),Lc(Dn,tn,"pointerdown,touchstart,mousedown",C0),Lc(Dn,tn,"pointerup,touchend,mouseup",R0),dh=je.utils.checkPrefix("transform"),eu.push(dh),Xo=Gn(),Su=je.delayedCall(.2,Ks).pause(),qo=[tn,"visibilitychange",function(){var c=Mt.innerWidth,u=Mt.innerHeight;tn.hidden?(M0=c,T0=u):(M0!==c||T0!==u)&&nl()},tn,"DOMContentLoaded",Ks,Mt,"load",Ks,Mt,"resize",nl],Pc(Dn),St.forEach(function(c){return c.enable(0,1)}),l=0;l<Tt.length;l+=3)Dc(Ln,Tt[l],Tt[l+1]),Dc(Ln,Tt[l],Tt[l+2])}},r.config=function(n){"limitCallbacks"in n&&(kd=!!n.limitCallbacks);var i=n.syncInterval;i&&clearInterval(Cc)||(Cc=i)&&setInterval(D0,i),"ignoreMobileResize"in n&&(fh=r.isTouch===1&&n.ignoreMobileResize),"autoRefreshEvents"in n&&(Pc(Ln)||Pc(Dn,n.autoRefreshEvents||"none"),dx=(n.autoRefreshEvents+"").indexOf("resize")===-1)},r.scrollerProxy=function(n,i){var s=oi(n),o=Tt.indexOf(s),a=fo(s);~o&&Tt.splice(o,a?6:2),i&&(a?xr.unshift(Mt,i,Xt,i,Si,i):xr.unshift(s,i))},r.clearMatchMedia=function(n){St.forEach(function(i){return i._ctx&&i._ctx.query===n&&i._ctx.kill(!0,!0)})},r.isInViewport=function(n,i,s){var o=(yi(n)?oi(n):n).getBoundingClientRect(),a=o[s?ro:so]*i||0;return s?o.right-a>0&&o.left+a<Mt.innerWidth:o.bottom-a>0&&o.top+a<Mt.innerHeight},r.positionInViewport=function(n,i,s){yi(n)&&(n=oi(n));var o=n.getBoundingClientRect(),a=o[s?ro:so],l=i==null?a/2:i in Tu?Tu[i]*a:~i.indexOf("%")?parseFloat(i)*a/100:parseFloat(i)||0;return s?(o.left+l)/Mt.innerWidth:(o.top+l)/Mt.innerHeight},r.killAll=function(n){if(St.slice(0).forEach(function(s){return s.vars.id!=="ScrollSmoother"&&s.kill()}),n!==!0){var i=ho.killAll||[];ho={},i.forEach(function(s){return s()})}},r})();$e.version="3.12.7";$e.saveStyles=function(r){return r?Vl(r).forEach(function(e){if(e&&e.style){var t=vi.indexOf(e);t>=0&&vi.splice(t,5),vi.push(e,e.style.cssText,e.getBBox&&e.getAttribute("transform"),je.core.getCache(e),hh())}}):vi};$e.revert=function(r,e){return vp(!r,e)};$e.create=function(r,e){return new $e(r,e)};$e.refresh=function(r){return r?nl(!0):(Xo||$e.register())&&Ks(!0)};$e.update=function(r){return++Tt.cache&&Xr(r===!0?2:0)};$e.clearScrollMemory=wx;$e.maxScroll=function(r,e){return pr(r,e?ii:Tn)};$e.getScrollFunc=function(r,e){return Es(oi(r),e?ii:Tn)};$e.getById=function(r){return mh[r]};$e.getAll=function(){return St.filter(function(r){return r.vars.id!=="ScrollSmoother"})};$e.isScrolling=function(){return!!zi};$e.snapDirectional=xp;$e.addEventListener=function(r,e){var t=ho[r]||(ho[r]=[]);~t.indexOf(e)||t.push(e)};$e.removeEventListener=function(r,e){var t=ho[r],n=t&&t.indexOf(e);n>=0&&t.splice(n,1)};$e.batch=function(r,e){var t=[],n={},i=e.interval||.016,s=e.batchMax||1e9,o=function(c,u){var d=[],f=[],h=je.delayedCall(i,function(){u(d,f),d=[],f=[]}).pause();return function(_){d.length||h.restart(!0),d.push(_.trigger),f.push(_),s<=d.length&&h.progress(1)}},a;for(a in e)n[a]=a.substr(0,2)==="on"&&Xn(e[a])&&a!=="onRefreshInit"?o(a,e[a]):e[a];return Xn(s)&&(s=s(),Dn($e,"refresh",function(){return s=e.batchMax()})),Vl(r).forEach(function(l){var c={};for(a in n)c[a]=n[a];c.trigger=l,t.push($e.create(c))}),t};var k0=function(e,t,n,i){return t>i?e(i):t<0&&e(0),n>i?(i-t)/(n-t):n<0?t/(t-n):1},Gd=function r(e,t){t===!0?e.style.removeProperty("touch-action"):e.style.touchAction=t===!0?"auto":t?"pan-"+t+(mn.isTouch?" pinch-zoom":""):"none",e===Si&&r(Xt,t)},Uc={auto:1,scroll:1},oC=function(e){var t=e.event,n=e.target,i=e.axis,s=(t.changedTouches?t.changedTouches[0]:t).target,o=s._gsap||je.core.getCache(s),a=Gn(),l;if(!o._isScrollT||a-o._isScrollT>2e3){for(;s&&s!==Xt&&(s.scrollHeight<=s.clientHeight&&s.scrollWidth<=s.clientWidth||!(Uc[(l=Ni(s)).overflowY]||Uc[l.overflowX]));)s=s.parentNode;o._isScroll=s&&s!==n&&!fo(s)&&(Uc[(l=Ni(s)).overflowY]||Uc[l.overflowX]),o._isScrollT=a}(o._isScroll||i==="x")&&(t.stopPropagation(),t._gsapAllow=!0)},Ex=function(e,t,n,i){return mn.create({target:e,capture:!0,debounce:!1,lockAxis:!0,type:t,onWheel:i=i&&oC,onPress:i,onDrag:i,onScroll:i,onEnable:function(){return n&&Dn(tn,mn.eventTypes[0],z0,!1,!0)},onDisable:function(){return Ln(tn,mn.eventTypes[0],z0,!0)}})},aC=/(input|label|select|textarea)/i,B0,z0=function(e){var t=aC.test(e.target.tagName);(t||B0)&&(e._gsapAllow=!0,B0=t)},lC=function(e){Ws(e)||(e={}),e.preventDefault=e.isNormalizer=e.allowClicks=!0,e.type||(e.type="wheel,touch"),e.debounce=!!e.debounce,e.id=e.id||"normalizer";var t=e,n=t.normalizeScrollX,i=t.momentum,s=t.allowNestedScroll,o=t.onRelease,a,l,c=oi(e.target)||Si,u=je.core.globals().ScrollSmoother,d=u&&u.get(),f=as&&(e.content&&oi(e.content)||d&&e.content!==!1&&!d.smooth()&&d.content()),h=Es(c,Tn),_=Es(c,ii),g=1,m=(mn.isTouch&&Mt.visualViewport?Mt.visualViewport.scale*Mt.visualViewport.width:Mt.outerWidth)/Mt.innerWidth,p=0,y=Xn(i)?function(){return i(a)}:function(){return i||2.8},v,x,E=Ex(c,e.type,!0,s),b=function(){return x=!1},S=ar,P=ar,w=function(){l=pr(c,Tn),P=_l(as?1:0,l),n&&(S=_l(0,pr(c,ii))),v=oo},M=function(){f._gsap.y=el(parseFloat(f._gsap.y)+h.offset)+"px",f.style.transform="matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, "+parseFloat(f._gsap.y)+", 0, 1)",h.offset=h.cacheID=0},L=function(){if(x){requestAnimationFrame(b);var Y=el(a.deltaY/2),de=P(h.v-Y);if(f&&de!==h.v+h.offset){h.offset=de-h.v;var I=el((parseFloat(f&&f._gsap.y)||0)-h.offset);f.style.transform="matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, "+I+", 0, 1)",f._gsap.y=I+"px",h.cacheID=Tt.cache,Xr()}return!0}h.offset&&M(),x=!0},F,G,U,X,Z=function(){w(),F.isActive()&&F.vars.scrollY>l&&(h()>l?F.progress(1)&&h(l):F.resetTo("scrollY",l))};return f&&je.set(f,{y:"+=0"}),e.ignoreCheck=function(C){return as&&C.type==="touchmove"&&L()||g>1.05&&C.type!=="touchstart"||a.isGesturing||C.touches&&C.touches.length>1},e.onPress=function(){x=!1;var C=g;g=el((Mt.visualViewport&&Mt.visualViewport.scale||1)/m),F.pause(),C!==g&&Gd(c,g>1.01?!0:n?!1:"x"),G=_(),U=h(),w(),v=oo},e.onRelease=e.onGestureStart=function(C,Y){if(h.offset&&M(),!Y)X.restart(!0);else{Tt.cache++;var de=y(),I,xe;n&&(I=_(),xe=I+de*.05*-C.velocityX/.227,de*=k0(_,I,xe,pr(c,ii)),F.vars.scrollX=S(xe)),I=h(),xe=I+de*.05*-C.velocityY/.227,de*=k0(h,I,xe,pr(c,Tn)),F.vars.scrollY=P(xe),F.invalidate().duration(de).play(.01),(as&&F.vars.scrollY>=l||I>=l-1)&&je.to({},{onUpdate:Z,duration:de})}o&&o(C)},e.onWheel=function(){F._ts&&F.pause(),Gn()-p>1e3&&(v=0,p=Gn())},e.onChange=function(C,Y,de,I,xe){if(oo!==v&&w(),Y&&n&&_(S(I[2]===Y?G+(C.startX-C.x):_()+Y-I[1])),de){h.offset&&M();var ve=xe[2]===de,ee=ve?U+C.startY-C.y:h()+de-xe[1],Xe=P(ee);ve&&ee!==Xe&&(U+=Xe-ee),h(Xe)}(de||Y)&&Xr()},e.onEnable=function(){Gd(c,n?!1:"x"),$e.addEventListener("refresh",Z),Dn(Mt,"resize",Z),h.smooth&&(h.target.style.scrollBehavior="auto",h.smooth=_.smooth=!1),E.enable()},e.onDisable=function(){Gd(c,!0),Ln(Mt,"resize",Z),$e.removeEventListener("refresh",Z),E.kill()},e.lockAxis=e.lockAxis!==!1,a=new mn(e),a.iOS=as,as&&!h()&&h(1),as&&je.ticker.add(ar),X=a._dc,F=je.to(a,{ease:"power4",paused:!0,inherit:!1,scrollX:n?"+=0.1":"+=0",scrollY:"+=0.1",modifiers:{scrollY:Tx(h,h(),function(){return F.pause()})},onUpdate:Xr,onComplete:X.vars.onComplete}),a};$e.sort=function(r){if(Xn(r))return St.sort(r);var e=Mt.pageYOffset||0;return $e.getAll().forEach(function(t){return t._sortY=t.trigger?e+t.trigger.getBoundingClientRect().top:t.start+Mt.innerHeight}),St.sort(r||function(t,n){return(t.vars.refreshPriority||0)*-1e6+(t.vars.containerAnimation?1e6:t._sortY)-((n.vars.containerAnimation?1e6:n._sortY)+(n.vars.refreshPriority||0)*-1e6)})};$e.observe=function(r){return new mn(r)};$e.normalizeScroll=function(r){if(typeof r>"u")return Jn;if(r===!0&&Jn)return Jn.enable();if(r===!1){Jn&&Jn.kill(),Jn=r;return}var e=r instanceof mn?r:lC(r);return Jn&&Jn.target===e.target&&Jn.kill(),fo(e.target)&&(Jn=e),e};$e.core={_getVelocityProp:uh,_inputObserver:Ex,_scrollers:Tt,_proxies:xr,bridge:{ss:function(){zi||po("scrollStart"),zi=Gn()},ref:function(){return Hn}}};mx()&&je.registerPlugin($e);/*!
 * paths 3.12.7
 * https://gsap.com
 *
 * Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license or for
 * Club GSAP members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/var cC=/[achlmqstvz]|(-?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/ig,uC=/(?:(-)?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/ig,dC=/[\+\-]?\d*\.?\d+e[\+\-]?\d+/ig,fC=/(^[#\.][a-z]|[a-y][a-z])/i,hC=Math.PI/180,kc=Math.sin,Bc=Math.cos,wl=Math.abs,qa=Math.sqrt,V0=function(e){return typeof e=="string"},Ax=function(e){return typeof e=="number"},H0=1e5,os=function(e){return Math.round(e*H0)/H0||0};function pC(r){r=V0(r)&&fC.test(r)&&document.querySelector(r)||r;var e=r.getAttribute?r:0,t;return e&&(r=r.getAttribute("d"))?(e._gsPath||(e._gsPath={}),t=e._gsPath[r],t&&!t._dirty?t:e._gsPath[r]=Ss(r)):r?V0(r)?Ss(r):Ax(r[0])?[r]:r:console.warn("Expecting a <path> element or an SVG path data string")}function il(r){var e=0,t;for(r.reverse();e<r.length;e+=2)t=r[e],r[e]=r[e+1],r[e+1]=t;r.reversed=!r.reversed}var mC=function(e,t){var n=document.createElementNS("http://www.w3.org/2000/svg","path"),i=[].slice.call(e.attributes),s=i.length,o;for(t=","+t+",";--s>-1;)o=i[s].nodeName.toLowerCase(),t.indexOf(","+o+",")<0&&n.setAttributeNS(null,o,i[s].nodeValue);return n},gC={rect:"rx,ry,x,y,width,height",circle:"r,cx,cy",ellipse:"rx,ry,cx,cy",line:"x1,x2,y1,y2"},_C=function(e,t){for(var n=t?t.split(","):[],i={},s=n.length;--s>-1;)i[n[s]]=+e.getAttribute(n[s])||0;return i};function Cx(r,e){var t=r.tagName.toLowerCase(),n=.552284749831,i,s,o,a,l,c,u,d,f,h,_,g,m,p,y,v,x,E,b,S,P,w;return t==="path"||!r.getBBox?r:(c=mC(r,"x,y,width,height,cx,cy,rx,ry,r,x1,x2,y1,y2,points"),w=_C(r,gC[t]),t==="rect"?(a=w.rx,l=w.ry||a,s=w.x,o=w.y,h=w.width-a*2,_=w.height-l*2,a||l?(g=s+a*(1-n),m=s+a,p=m+h,y=p+a*n,v=p+a,x=o+l*(1-n),E=o+l,b=E+_,S=b+l*n,P=b+l,i="M"+v+","+E+" V"+b+" C"+[v,S,y,P,p,P,p-(p-m)/3,P,m+(p-m)/3,P,m,P,g,P,s,S,s,b,s,b-(b-E)/3,s,E+(b-E)/3,s,E,s,x,g,o,m,o,m+(p-m)/3,o,p-(p-m)/3,o,p,o,y,o,v,x,v,E].join(",")+"z"):i="M"+(s+h)+","+o+" v"+_+" h"+-h+" v"+-_+" h"+h+"z"):t==="circle"||t==="ellipse"?(t==="circle"?(a=l=w.r,d=a*n):(a=w.rx,l=w.ry,d=l*n),s=w.cx,o=w.cy,u=a*n,i="M"+(s+a)+","+o+" C"+[s+a,o+d,s+u,o+l,s,o+l,s-u,o+l,s-a,o+d,s-a,o,s-a,o-d,s-u,o-l,s,o-l,s+u,o-l,s+a,o-d,s+a,o].join(",")+"z"):t==="line"?i="M"+w.x1+","+w.y1+" L"+w.x2+","+w.y2:(t==="polyline"||t==="polygon")&&(f=(r.getAttribute("points")+"").match(uC)||[],s=f.shift(),o=f.shift(),i="M"+s+","+o+" L"+f.join(","),t==="polygon"&&(i+=","+s+","+o+"z")),c.setAttribute("d",oa(c._gsRawPath=Ss(i))),e&&r.parentNode&&(r.parentNode.insertBefore(c,r),r.parentNode.removeChild(r)),c)}function xC(r,e,t,n,i,s,o,a,l){if(!(r===a&&e===l)){t=wl(t),n=wl(n);var c=i%360*hC,u=Bc(c),d=kc(c),f=Math.PI,h=f*2,_=(r-a)/2,g=(e-l)/2,m=u*_+d*g,p=-d*_+u*g,y=m*m,v=p*p,x=y/(t*t)+v/(n*n);x>1&&(t=qa(x)*t,n=qa(x)*n);var E=t*t,b=n*n,S=(E*b-E*v-b*y)/(E*v+b*y);S<0&&(S=0);var P=(s===o?-1:1)*qa(S),w=P*(t*p/n),M=P*-(n*m/t),L=(r+a)/2,F=(e+l)/2,G=L+(u*w-d*M),U=F+(d*w+u*M),X=(m-w)/t,Z=(p-M)/n,C=(-m-w)/t,Y=(-p-M)/n,de=X*X+Z*Z,I=(Z<0?-1:1)*Math.acos(X/qa(de)),xe=(X*Y-Z*C<0?-1:1)*Math.acos((X*C+Z*Y)/qa(de*(C*C+Y*Y)));isNaN(xe)&&(xe=f),!o&&xe>0?xe-=h:o&&xe<0&&(xe+=h),I%=h,xe%=h;var ve=Math.ceil(wl(xe)/(h/4)),ee=[],Xe=xe/ve,qe=4/3*kc(Xe/2)/(1+Bc(Xe/2)),ne=u*t,ie=d*t,be=d*-n,Ye=u*n,ye;for(ye=0;ye<ve;ye++)i=I+ye*Xe,m=Bc(i),p=kc(i),X=Bc(i+=Xe),Z=kc(i),ee.push(m-qe*p,p+qe*m,X+qe*Z,Z-qe*X,X,Z);for(ye=0;ye<ee.length;ye+=2)m=ee[ye],p=ee[ye+1],ee[ye]=m*ne+p*be+G,ee[ye+1]=m*ie+p*Ye+U;return ee[ye-2]=a,ee[ye-1]=l,ee}}function Ss(r){var e=(r+"").replace(dC,function(w){var M=+w;return M<1e-4&&M>-1e-4?0:M}).match(cC)||[],t=[],n=0,i=0,s=2/3,o=e.length,a=0,l="ERROR: malformed path: "+r,c,u,d,f,h,_,g,m,p,y,v,x,E,b,S,P=function(M,L,F,G){y=(F-M)/3,v=(G-L)/3,g.push(M+y,L+v,F-y,G-v,F,G)};if(!r||!isNaN(e[0])||isNaN(e[1]))return console.log(l),t;for(c=0;c<o;c++)if(E=h,isNaN(e[c])?(h=e[c].toUpperCase(),_=h!==e[c]):c--,d=+e[c+1],f=+e[c+2],_&&(d+=n,f+=i),c||(m=d,p=f),h==="M")g&&(g.length<8?t.length-=1:a+=g.length),n=m=d,i=p=f,g=[d,f],t.push(g),c+=2,h="L";else if(h==="C")g||(g=[0,0]),_||(n=i=0),g.push(d,f,n+e[c+3]*1,i+e[c+4]*1,n+=e[c+5]*1,i+=e[c+6]*1),c+=6;else if(h==="S")y=n,v=i,(E==="C"||E==="S")&&(y+=n-g[g.length-4],v+=i-g[g.length-3]),_||(n=i=0),g.push(y,v,d,f,n+=e[c+3]*1,i+=e[c+4]*1),c+=4;else if(h==="Q")y=n+(d-n)*s,v=i+(f-i)*s,_||(n=i=0),n+=e[c+3]*1,i+=e[c+4]*1,g.push(y,v,n+(d-n)*s,i+(f-i)*s,n,i),c+=4;else if(h==="T")y=n-g[g.length-4],v=i-g[g.length-3],g.push(n+y,i+v,d+(n+y*1.5-d)*s,f+(i+v*1.5-f)*s,n=d,i=f),c+=2;else if(h==="H")P(n,i,n=d,i),c+=1;else if(h==="V")P(n,i,n,i=d+(_?i-n:0)),c+=1;else if(h==="L"||h==="Z")h==="Z"&&(d=m,f=p,g.closed=!0),(h==="L"||wl(n-d)>.5||wl(i-f)>.5)&&(P(n,i,d,f),h==="L"&&(c+=2)),n=d,i=f;else if(h==="A"){if(b=e[c+4],S=e[c+5],y=e[c+6],v=e[c+7],u=7,b.length>1&&(b.length<3?(v=y,y=S,u--):(v=S,y=b.substr(2),u-=2),S=b.charAt(1),b=b.charAt(0)),x=xC(n,i,+e[c+1],+e[c+2],+e[c+3],+b,+S,(_?n:0)+y*1,(_?i:0)+v*1),c+=u,x)for(u=0;u<x.length;u++)g.push(x[u]);n=g[g.length-2],i=g[g.length-1]}else console.log(l);return c=g.length,c<6?(t.pop(),c=0):g[0]===g[c-2]&&g[1]===g[c-1]&&(g.closed=!0),t.totalPoints=a+c,t}function oa(r){Ax(r[0])&&(r=[r]);var e="",t=r.length,n,i,s,o;for(i=0;i<t;i++){for(o=r[i],e+="M"+os(o[0])+","+os(o[1])+" C",n=o.length,s=2;s<n;s++)e+=os(o[s++])+","+os(o[s++])+" "+os(o[s++])+","+os(o[s++])+" "+os(o[s++])+","+os(o[s])+" ";o.closed&&(e+="z")}return e}/*!
 * MorphSVGPlugin 3.12.7
 * https://gsap.com
 *
 * @license Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license or for
 * Club GSAP members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/var $i,yp,rl,Rx,sl,Px=function(){return $i||typeof window<"u"&&($i=window.gsap)&&$i.registerPlugin&&$i},Wd=function(e){return typeof e=="function"},Zs=Math.atan2,G0=Math.cos,W0=Math.sin,Vr=Math.sqrt,Bu=Math.PI,X0=Bu*2,vC=Bu*.3,yC=Bu*.7,Lx=1e20,Gl=/[-+=\.]*\d+[\.e\-\+]*\d*[e\-\+]*\d*/gi,bC=/(^[#\.][a-z]|[a-y][a-z])/i,SC=/[achlmqstvz]/i,ms=function(e){return console&&console.warn(e)},wC=1,q0=function(e){var t=e.length,n=0,i=0,s;for(s=0;s<t;s++)n+=e[s++],i+=e[s];return[n/(t/2),i/(t/2)]},aa=function(e){var t=e.length,n=e[0],i=n,s=e[1],o=s,a,l,c;for(c=6;c<t;c+=6)a=e[c],l=e[c+1],a>n?n=a:a<i&&(i=a),l>s?s=l:l<o&&(o=l);return e.centerX=(n+i)/2,e.centerY=(s+o)/2,e.size=(n-i)*(s-o)},Ml=function(e,t){t===void 0&&(t=3);for(var n=e.length,i=e[0][0],s=i,o=e[0][1],a=o,l=1/t,c,u,d,f,h,_,g,m,p,y,v,x,E,b,S,P;--n>-1;)for(h=e[n],c=h.length,f=6;f<c;f+=6)for(p=h[f],y=h[f+1],v=h[f+2]-p,b=h[f+3]-y,x=h[f+4]-p,S=h[f+5]-y,E=h[f+6]-p,P=h[f+7]-y,_=t;--_>-1;)g=l*_,m=1-g,u=(g*g*E+3*m*(g*x+m*v))*g+p,d=(g*g*P+3*m*(g*S+m*b))*g+y,u>i?i=u:u<s&&(s=u),d>o?o=d:d<a&&(a=d);return e.centerX=(i+s)/2,e.centerY=(o+a)/2,e.left=s,e.width=i-s,e.top=a,e.height=o-a,e.size=(i-s)*(o-a)},MC=function(e,t){return t.length-e.length},Y0=function(e,t){var n=e.size||aa(e),i=t.size||aa(t);return Math.abs(i-n)<(n+i)/20?t.centerX-e.centerX||t.centerY-e.centerY:i-n},j0=function(e,t){var n=e.slice(0),i=e.length,s=i-2,o,a;for(t=t|0,o=0;o<i;o++)a=(o+t)%s,e[o++]=n[a],e[o]=n[a+1]},Xd=function(e,t,n,i,s){var o=e.length,a=0,l=o-2,c,u,d,f;for(n*=6,u=0;u<o;u+=6)c=(u+n)%l,f=e[c]-(t[u]-i),d=e[c+1]-(t[u+1]-s),a+=Vr(d*d+f*f);return a},TC=function(e,t,n){var i=e.length,s=q0(e),o=q0(t),a=o[0]-s[0],l=o[1]-s[1],c=Xd(e,t,0,a,l),u=0,d,f,h;for(h=6;h<i;h+=6)f=Xd(e,t,h/6,a,l),f<c&&(c=f,u=h);if(n)for(d=e.slice(0),il(d),h=6;h<i;h+=6)f=Xd(d,t,h/6,a,l),f<c&&(c=f,u=-h);return u/6},EC=function(e,t,n){for(var i=e.length,s=Lx,o=0,a=0,l,c,u,d,f,h;--i>-1;)for(l=e[i],h=l.length,f=0;f<h;f+=6)c=l[f]-t,u=l[f+1]-n,d=Vr(c*c+u*u),d<s&&(s=d,o=l[f],a=l[f+1]);return[o,a]},AC=function(e,t,n,i,s,o){var a=t.length,l=0,c=Math.min(e.size||aa(e),t[n].size||aa(t[n]))*i,u=Lx,d=e.centerX+s,f=e.centerY+o,h,_,g,m,p;for(_=n;_<a&&(h=t[_].size||aa(t[_]),!(h<c));_++)g=t[_].centerX-d,m=t[_].centerY-f,p=Vr(g*g+m*m),p<u&&(l=_,u=p);return p=t[l],t.splice(l,1),p},qd=function(e,t){var n=0,i=.999999,s=e.length,o=t/((s-2)/6),a,l,c,u,d,f,h,_,g,m,p,y,v,x;for(v=2;v<s;v+=6)for(n+=o;n>i;)a=e[v-2],l=e[v-1],c=e[v],u=e[v+1],d=e[v+2],f=e[v+3],h=e[v+4],_=e[v+5],x=1/((Math.floor(n)||1)+1),g=a+(c-a)*x,p=c+(d-c)*x,g+=(p-g)*x,p+=(d+(h-d)*x-p)*x,m=l+(u-l)*x,y=u+(f-u)*x,m+=(y-m)*x,y+=(f+(_-f)*x-y)*x,e.splice(v,4,a+(c-a)*x,l+(u-l)*x,g,m,g+(p-g)*x,m+(y-m)*x,p,y,d+(h-d)*x,f+(_-f)*x),v+=6,s+=6,n--;return e},xh=function(e,t,n,i,s){var o=t.length-e.length,a=o>0?t:e,l=o>0?e:t,c=0,u=i==="complexity"?MC:Y0,d=i==="position"?0:typeof i=="number"?i:.8,f=l.length,h=typeof n=="object"&&n.push?n.slice(0):[n],_=h[0]==="reverse"||h[0]<0,g=n==="log",m,p,y,v,x,E,b;if(l[0]){if(a.length>1&&(e.sort(u),t.sort(u),E=a.size||Ml(a),E=l.size||Ml(l),E=a.centerX-l.centerX,b=a.centerY-l.centerY,u===Y0))for(f=0;f<l.length;f++)a.splice(f,0,AC(l[f],a,f,d,E,b));if(o)for(o<0&&(o=-o),a[0].length>l[0].length&&qd(l[0],(a[0].length-l[0].length)/6|0),f=l.length;c<o;)v=a[f].size||aa(a[f]),y=EC(l,a[f].centerX,a[f].centerY),v=y[0],x=y[1],l[f++]=[v,x,v,x,v,x,v,x],l.totalPoints+=8,c++;for(f=0;f<e.length;f++)m=t[f],p=e[f],o=m.length-p.length,o<0?qd(m,-o/6|0):o>0&&qd(p,o/6|0),_&&s!==!1&&!p.reversed&&il(p),n=h[f]||h[f]===0?h[f]:"auto",n&&(p.closed||Math.abs(p[0]-p[p.length-2])<.5&&Math.abs(p[1]-p[p.length-1])<.5?n==="auto"||n==="log"?(h[f]=n=TC(p,m,!f||s===!1),n<0&&(_=!0,il(p),n=-n),j0(p,n*6)):n!=="reverse"&&(f&&n<0&&il(p),j0(p,(n<0?-n:n)*6)):!_&&(n==="auto"&&Math.abs(m[0]-p[0])+Math.abs(m[1]-p[1])+Math.abs(m[m.length-2]-p[p.length-2])+Math.abs(m[m.length-1]-p[p.length-1])>Math.abs(m[0]-p[p.length-2])+Math.abs(m[1]-p[p.length-1])+Math.abs(m[m.length-2]-p[0])+Math.abs(m[m.length-1]-p[1])||n%2)?(il(p),h[f]=-1,_=!0):n==="auto"?h[f]=0:n==="reverse"&&(h[f]=-1),p.closed!==m.closed&&(p.closed=m.closed=!1));return g&&ms("shapeIndex:["+h.join(",")+"]"),e.shapeIndex=h,h}},$0=function(e,t,n,i,s){var o=Ss(e[0]),a=Ss(e[1]);xh(o,a,t||t===0?t:"auto",n,s)&&(e[0]=oa(o),e[1]=oa(a),(i==="log"||i===!0)&&ms('precompile:["'+e[0]+'","'+e[1]+'"]'))},CC=function(e,t){if(!t)return e;var n=e.match(Gl)||[],i=n.length,s="",o,a,l;for(t==="reverse"?(a=i-1,o=-2):(a=((parseInt(t,10)||0)*2+1+i*100)%i,o=2),l=0;l<i;l+=2)s+=n[a-1]+","+n[a]+" ",a=(a+o)%i;return s},K0=function(e,t){var n=0,i=parseFloat(e[0]),s=parseFloat(e[1]),o=i+","+s+" ",a=.999999,l,c,u,d,f,h,_;for(u=e.length,l=t*.5/(u*.5-1),c=0;c<u-2;c+=2){if(n+=l,h=parseFloat(e[c+2]),_=parseFloat(e[c+3]),n>a)for(f=1/(Math.floor(n)+1),d=1;n>a;)o+=(i+(h-i)*f*d).toFixed(2)+","+(s+(_-s)*f*d).toFixed(2)+" ",n--,d++;o+=h+","+_+" ",i=h,s=_}return o},vh=function(e){var t=e[0].match(Gl)||[],n=e[1].match(Gl)||[],i=n.length-t.length;i>0?e[0]=K0(t,i):e[1]=K0(n,-i)},RC=function(e){return isNaN(e)?vh:function(t){vh(t),t[1]=CC(t[1],parseInt(e,10))}},PC=function(e,t,n){var i=typeof e=="string",s,o;return(!i||bC.test(e)||(e.match(Gl)||[]).length<3)&&(s=yp(e)[0],s?(o=(s.nodeName+"").toUpperCase(),t&&o!=="PATH"&&(s=Cx(s,!1),o="PATH"),e=s.getAttribute(o==="PATH"?"d":"points")||"",s===n&&(e=s.getAttributeNS(null,"data-original")||e)):(ms("WARNING: invalid morph to: "+e),e=!1)),e},Z0=function(e,t){for(var n=e.length,i=.2*(t||1),s,o,a,l,c,u,d,f,h,_,g,m;--n>-1;){for(o=e[n],g=o.isSmooth=o.isSmooth||[0,0,0,0],m=o.smoothData=o.smoothData||[0,0,0,0],g.length=4,f=o.length-2,d=6;d<f;d+=6)a=o[d]-o[d-2],l=o[d+1]-o[d-1],c=o[d+2]-o[d],u=o[d+3]-o[d+1],h=Zs(l,a),_=Zs(u,c),s=Math.abs(h-_)<i,s&&(m[d-2]=h,m[d+2]=_,m[d-1]=Vr(a*a+l*l),m[d+3]=Vr(c*c+u*u)),g.push(s,s,0,0,s,s);o[f]===o[0]&&o[f+1]===o[1]&&(a=o[0]-o[f-2],l=o[1]-o[f-1],c=o[2]-o[0],u=o[3]-o[1],h=Zs(l,a),_=Zs(u,c),Math.abs(h-_)<i&&(m[f-2]=h,m[2]=_,m[f-1]=Vr(a*a+l*l),m[3]=Vr(c*c+u*u),g[f-2]=g[f-1]=!0))}return e},J0=function(e){var t=e.trim().split(" "),n=~e.indexOf("left")?0:~e.indexOf("right")?100:isNaN(parseFloat(t[0]))?50:parseFloat(t[0]),i=~e.indexOf("top")?0:~e.indexOf("bottom")?100:isNaN(parseFloat(t[1]))?50:parseFloat(t[1]);return{x:n/100,y:i/100}},LC=function(e){return e!==e%Bu?e+(e<0?X0:-X0):e},Q0="Use MorphSVGPlugin.convertToPath() to convert to a path before morphing.",DC=function(e,t,n,i){var s=this._origin,o=this._eOrigin,a=e[n]-s.x,l=e[n+1]-s.y,c=Vr(a*a+l*l),u=Zs(l,a),d,f;return a=t[n]-o.x,l=t[n+1]-o.y,d=Zs(l,a)-u,f=LC(d),!i&&rl&&Math.abs(f+rl.ca)<vC&&(i=rl),this._anchorPT=rl={_next:this._anchorPT,t:e,sa:u,ca:i&&f*i.ca<0&&Math.abs(f)>yC?d:f,sl:c,cl:Vr(a*a+l*l)-c,i:n}},eg=function(e){$i=Px(),sl=sl||$i&&$i.plugins.morphSVG,$i&&sl?(yp=$i.utils.toArray,sl.prototype._tweenRotation=DC,Rx=1):e&&ms("Please gsap.registerPlugin(MorphSVGPlugin)")},Zo={version:"3.12.7",name:"morphSVG",rawVars:1,register:function(e,t){$i=e,sl=t,eg()},init:function(e,t,n,i,s){if(Rx||eg(1),!t)return ms("invalid shape"),!1;Wd(t)&&(t=t.call(n,i,e,s));var o,a,l,c,u,d,f,h,_,g,m,p,y,v,x,E,b,S,P,w,M,L;if(typeof t=="string"||t.getBBox||t[0])t={shape:t};else if(typeof t=="object"){o={};for(a in t)o[a]=Wd(t[a])&&a!=="render"?t[a].call(n,i,e,s):t[a];t=o}var F=e.nodeType?window.getComputedStyle(e):{},G=F.fill+"",U=!(G==="none"||(G.match(Gl)||[])[3]==="0"||F.fillRule==="evenodd"),X=(t.origin||"50 50").split(",");if(o=(e.nodeName+"").toUpperCase(),u=o==="POLYLINE"||o==="POLYGON",o!=="PATH"&&!u&&!t.prop)return ms("Cannot morph a <"+o+"> element. "+Q0),!1;if(a=o==="PATH"?"d":"points",!t.prop&&!Wd(e.setAttribute))return!1;if(c=PC(t.shape||t.d||t.points||"",a==="d",e),u&&SC.test(c))return ms("A <"+o+"> cannot accept path data. "+Q0),!1;if(d=t.shapeIndex||t.shapeIndex===0?t.shapeIndex:"auto",f=t.map||Zo.defaultMap,this._prop=t.prop,this._render=t.render||Zo.defaultRender,this._apply="updateTarget"in t?t.updateTarget:Zo.defaultUpdateTarget,this._rnd=Math.pow(10,isNaN(t.precision)?2:+t.precision),this._tween=n,c){if(this._target=e,b=typeof t.precompile=="object",g=this._prop?e[this._prop]:e.getAttribute(a),!this._prop&&!e.getAttributeNS(null,"data-original")&&e.setAttributeNS(null,"data-original",g),a==="d"||this._prop){if(g=Ss(b?t.precompile[0]:g),m=Ss(b?t.precompile[1]:c),!b&&!xh(g,m,d,f,U))return!1;for((t.precompile==="log"||t.precompile===!0)&&ms('precompile:["'+oa(g)+'","'+oa(m)+'"]'),M=(t.type||Zo.defaultType)!=="linear",M&&(g=Z0(g,t.smoothTolerance),m=Z0(m,t.smoothTolerance),g.size||Ml(g),m.size||Ml(m),w=J0(X[0]),this._origin=g.origin={x:g.left+w.x*g.width,y:g.top+w.y*g.height},X[1]&&(w=J0(X[1])),this._eOrigin={x:m.left+w.x*m.width,y:m.top+w.y*m.height}),this._rawPath=e._gsRawPath=g,y=g.length;--y>-1;)for(x=g[y],E=m[y],h=x.isSmooth||[],_=E.isSmooth||[],v=x.length,rl=0,p=0;p<v;p+=2)(E[p]!==x[p]||E[p+1]!==x[p+1])&&(M?h[p]&&_[p]?(S=x.smoothData,P=E.smoothData,L=p+(p===v-4?7-v:5),this._controlPT={_next:this._controlPT,i:p,j:y,l1s:S[p+1],l1c:P[p+1]-S[p+1],l2s:S[L],l2c:P[L]-S[L]},l=this._tweenRotation(x,E,p+2),this._tweenRotation(x,E,p,l),this._tweenRotation(x,E,L-1,l),p+=4):this._tweenRotation(x,E,p):(l=this.add(x,p,x[p],E[p],0,0,0,0,0,1),l=this.add(x,p+1,x[p+1],E[p+1],0,0,0,0,0,1)||l))}else l=this.add(e,"setAttribute",e.getAttribute(a)+"",c+"",i,s,0,RC(d),a);M&&(this.add(this._origin,"x",this._origin.x,this._eOrigin.x,0,0,0,0,0,1),l=this.add(this._origin,"y",this._origin.y,this._eOrigin.y,0,0,0,0,0,1)),l&&(this._props.push("morphSVG"),l.end=c,l.endProp=a)}return wC},render:function(e,t){for(var n=t._rawPath,i=t._controlPT,s=t._anchorPT,o=t._rnd,a=t._target,l=t._pt,c,u,d,f,h,_,g,m,p,y,v,x,E;l;)l.r(e,l.d),l=l._next;if(e===1&&t._apply)for(l=t._pt;l;)l.end&&(t._prop?a[t._prop]=l.end:a.setAttribute(l.endProp,l.end)),l=l._next;else if(n){for(;s;)_=s.sa+e*s.ca,h=s.sl+e*s.cl,s.t[s.i]=t._origin.x+G0(_)*h,s.t[s.i+1]=t._origin.y+W0(_)*h,s=s._next;for(d=e<.5?2*e*e:(4-2*e)*e-1;i;)g=i.i,f=n[i.j],E=g+(g===f.length-4?7-f.length:5),_=Zs(f[E]-f[g+1],f[E-1]-f[g]),v=W0(_),x=G0(_),p=f[g+2],y=f[g+3],h=i.l1s+d*i.l1c,f[g]=p-x*h,f[g+1]=y-v*h,h=i.l2s+d*i.l2c,f[E-1]=p+x*h,f[E]=y+v*h,i=i._next;if(a._gsRawPath=n,t._apply){for(c="",u=" ",m=0;m<n.length;m++)for(f=n[m],h=f.length,c+="M"+(f[0]*o|0)/o+u+(f[1]*o|0)/o+" C",g=2;g<h;g++)c+=(f[g]*o|0)/o+u;t._prop?a[t._prop]=c:a.setAttribute("d",c)}}t._render&&n&&t._render.call(t._tween,n,a)},kill:function(e){this._pt=this._rawPath=0},getRawPath:pC,stringToRawPath:Ss,rawPathToString:oa,normalizeStrings:function(e,t,n){var i=n.shapeIndex,s=n.map,o=[e,t];return $0(o,i,s),o},pathFilter:$0,pointsFilter:vh,getTotalSize:Ml,equalizeSegmentQuantity:xh,convertToPath:function(e,t){return yp(e).map(function(n){return Cx(n,t!==!1)})},defaultType:"linear",defaultUpdateTarget:!0,defaultMap:"size"};Px()&&$i.registerPlugin(Zo);(function(){function r(){for(var n=arguments.length,i=0;i<n;i++){var s=i<0||arguments.length<=i?void 0:arguments[i];s.nodeType===1||s.nodeType===11?this.appendChild(s):this.appendChild(document.createTextNode(String(s)))}}function e(){for(;this.lastChild;)this.removeChild(this.lastChild);arguments.length&&this.append.apply(this,arguments)}function t(){for(var n=this.parentNode,i=arguments.length,s=new Array(i),o=0;o<i;o++)s[o]=arguments[o];var a=s.length;if(n)for(a||n.removeChild(this);a--;){var l=s[a];typeof l!="object"?l=this.ownerDocument.createTextNode(l):l.parentNode&&l.parentNode.removeChild(l),a?n.insertBefore(this.previousSibling,l):n.replaceChild(l,this)}}typeof Element<"u"&&(Element.prototype.append||(Element.prototype.append=r,DocumentFragment.prototype.append=r),Element.prototype.replaceChildren||(Element.prototype.replaceChildren=e,DocumentFragment.prototype.replaceChildren=e),Element.prototype.replaceWith||(Element.prototype.replaceWith=t,DocumentFragment.prototype.replaceWith=t))})();function IC(r,e){if(!(r instanceof e))throw new TypeError("Cannot call a class as a function")}function tg(r,e){for(var t=0;t<e.length;t++){var n=e[t];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(r,n.key,n)}}function ng(r,e,t){return e&&tg(r.prototype,e),t&&tg(r,t),r}function OC(r,e,t){return e in r?Object.defineProperty(r,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):r[e]=t,r}function ig(r,e){var t=Object.keys(r);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(r);e&&(n=n.filter(function(i){return Object.getOwnPropertyDescriptor(r,i).enumerable})),t.push.apply(t,n)}return t}function rg(r){for(var e=1;e<arguments.length;e++){var t=arguments[e]!=null?arguments[e]:{};e%2?ig(Object(t),!0).forEach(function(n){OC(r,n,t[n])}):Object.getOwnPropertyDescriptors?Object.defineProperties(r,Object.getOwnPropertyDescriptors(t)):ig(Object(t)).forEach(function(n){Object.defineProperty(r,n,Object.getOwnPropertyDescriptor(t,n))})}return r}function Dx(r,e){return FC(r)||kC(r,e)||Ix(r,e)||zC()}function ti(r){return NC(r)||UC(r)||Ix(r)||BC()}function NC(r){if(Array.isArray(r))return yh(r)}function FC(r){if(Array.isArray(r))return r}function UC(r){if(typeof Symbol<"u"&&Symbol.iterator in Object(r))return Array.from(r)}function kC(r,e){if(!(typeof Symbol>"u"||!(Symbol.iterator in Object(r)))){var t=[],n=!0,i=!1,s=void 0;try{for(var o=r[Symbol.iterator](),a;!(n=(a=o.next()).done)&&(t.push(a.value),!(e&&t.length===e));n=!0);}catch(l){i=!0,s=l}finally{try{!n&&o.return!=null&&o.return()}finally{if(i)throw s}}return t}}function Ix(r,e){if(r){if(typeof r=="string")return yh(r,e);var t=Object.prototype.toString.call(r).slice(8,-1);if(t==="Object"&&r.constructor&&(t=r.constructor.name),t==="Map"||t==="Set")return Array.from(r);if(t==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))return yh(r,e)}}function yh(r,e){(e==null||e>r.length)&&(e=r.length);for(var t=0,n=new Array(e);t<e;t++)n[t]=r[t];return n}function BC(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function zC(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function Js(r,e){return Object.getOwnPropertyNames(Object(r)).reduce(function(t,n){var i=Object.getOwnPropertyDescriptor(Object(r),n),s=Object.getOwnPropertyDescriptor(Object(e),n);return Object.defineProperty(t,n,s||i)},{})}function jl(r){return typeof r=="string"}function bp(r){return Array.isArray(r)}function zc(){var r=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},e=Js(r),t;return e.types!==void 0?t=e.types:e.split!==void 0&&(t=e.split),t!==void 0&&(e.types=(jl(t)||bp(t)?String(t):"").split(",").map(function(n){return String(n).trim()}).filter(function(n){return/((line)|(word)|(char))/i.test(n)})),(e.absolute||e.position)&&(e.absolute=e.absolute||/absolute/.test(r.position)),e}function Sp(r){var e=jl(r)||bp(r)?String(r):"";return{none:!e,lines:/line/i.test(e),words:/word/i.test(e),chars:/char/i.test(e)}}function zu(r){return r!==null&&typeof r=="object"}function VC(r){return zu(r)&&/^(1|3|11)$/.test(r.nodeType)}function HC(r){return typeof r=="number"&&r>-1&&r%1===0}function GC(r){return zu(r)&&HC(r.length)}function mo(r){return bp(r)?r:r==null?[]:GC(r)?Array.prototype.slice.call(r):[r]}function sg(r){var e=r;return jl(r)&&(/^(#[a-z]\w+)$/.test(r.trim())?e=document.getElementById(r.trim().slice(1)):e=document.querySelectorAll(r)),mo(e).reduce(function(t,n){return[].concat(ti(t),ti(mo(n).filter(VC)))},[])}var WC=Object.entries,Eu="_splittype",Ji={},XC=0;function mr(r,e,t){if(!zu(r))return console.warn("[data.set] owner is not an object"),null;var n=r[Eu]||(r[Eu]=++XC),i=Ji[n]||(Ji[n]={});return t===void 0?e&&Object.getPrototypeOf(e)===Object.prototype&&(Ji[n]=rg(rg({},i),e)):e!==void 0&&(i[e]=t),t}function Qs(r,e){var t=zu(r)?r[Eu]:null,n=t&&Ji[t]||{};return n}function Ox(r){var e=r&&r[Eu];e&&(delete r[e],delete Ji[e])}function qC(){Object.keys(Ji).forEach(function(r){delete Ji[r]})}function YC(){WC(Ji).forEach(function(r){var e=Dx(r,2),t=e[0],n=e[1],i=n.isRoot,s=n.isSplit;(!i||!s)&&(Ji[t]=null,delete Ji[t])})}function jC(r){var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:" ",t=r?String(r):"";return t.trim().replace(/\s+/g," ").split(e)}var wp="\\ud800-\\udfff",Nx="\\u0300-\\u036f\\ufe20-\\ufe23",Fx="\\u20d0-\\u20f0",Ux="\\ufe0e\\ufe0f",$C="[".concat(wp,"]"),bh="[".concat(Nx).concat(Fx,"]"),Sh="\\ud83c[\\udffb-\\udfff]",KC="(?:".concat(bh,"|").concat(Sh,")"),kx="[^".concat(wp,"]"),Bx="(?:\\ud83c[\\udde6-\\uddff]){2}",zx="[\\ud800-\\udbff][\\udc00-\\udfff]",Vx="\\u200d",Hx="".concat(KC,"?"),Gx="[".concat(Ux,"]?"),ZC="(?:"+Vx+"(?:"+[kx,Bx,zx].join("|")+")"+Gx+Hx+")*",JC=Gx+Hx+ZC,QC="(?:".concat(["".concat(kx).concat(bh,"?"),bh,Bx,zx,$C].join("|"),`
)`),e2=RegExp("".concat(Sh,"(?=").concat(Sh,")|").concat(QC).concat(JC),"g"),t2=[Vx,wp,Nx,Fx,Ux],n2=RegExp("[".concat(t2.join(""),"]"));function i2(r){return r.split("")}function Wx(r){return n2.test(r)}function r2(r){return r.match(e2)||[]}function s2(r){return Wx(r)?r2(r):i2(r)}function o2(r){return r==null?"":String(r)}function a2(r){var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:"";return r=o2(r),r&&jl(r)&&!e&&Wx(r)?s2(r):r.split(e)}function wh(r,e){var t=document.createElement(r);return e&&Object.keys(e).forEach(function(n){var i=e[n],s=jl(i)?i.trim():i;s===null||s===""||(n==="children"?t.append.apply(t,ti(mo(s))):t.setAttribute(n,s))}),t}var Mp={splitClass:"",lineClass:"line",wordClass:"word",charClass:"char",types:["lines","words","chars"],absolute:!1,tagName:"div"};function l2(r,e){e=Js(Mp,e);var t=Sp(e.types),n=e.tagName,i=r.nodeValue,s=document.createDocumentFragment(),o=[],a=[];return/^\s/.test(i)&&s.append(" "),o=jC(i).reduce(function(l,c,u,d){var f,h;return t.chars&&(h=a2(c).map(function(_){var g=wh(n,{class:"".concat(e.splitClass," ").concat(e.charClass),style:"display: inline-block;",children:_});return mr(g,"isChar",!0),a=[].concat(ti(a),[g]),g})),t.words||t.lines?(f=wh(n,{class:"".concat(e.wordClass," ").concat(e.splitClass),style:"display: inline-block; ".concat(t.words&&e.absolute?"position: relative;":""),children:t.chars?h:c}),mr(f,{isWord:!0,isWordStart:!0,isWordEnd:!0}),s.appendChild(f)):h.forEach(function(_){s.appendChild(_)}),u<d.length-1&&s.append(" "),t.words?l.concat(f):l},[]),/\s$/.test(i)&&s.append(" "),r.replaceWith(s),{words:o,chars:a}}function Xx(r,e){var t=r.nodeType,n={words:[],chars:[]};if(!/(1|3|11)/.test(t))return n;if(t===3&&/\S/.test(r.nodeValue))return l2(r,e);var i=mo(r.childNodes);if(i.length&&(mr(r,"isSplit",!0),!Qs(r).isRoot)){r.style.display="inline-block",r.style.position="relative";var s=r.nextSibling,o=r.previousSibling,a=r.textContent||"",l=s?s.textContent:" ",c=o?o.textContent:" ";mr(r,{isWordEnd:/\s$/.test(a)||/^\s/.test(l),isWordStart:/^\s/.test(a)||/\s$/.test(c)})}return i.reduce(function(u,d){var f=Xx(d,e),h=f.words,_=f.chars;return{words:[].concat(ti(u.words),ti(h)),chars:[].concat(ti(u.chars),ti(_))}},n)}function c2(r,e,t,n){if(!t.absolute)return{top:e?r.offsetTop:null};var i=r.offsetParent,s=Dx(n,2),o=s[0],a=s[1],l=0,c=0;if(i&&i!==document.body){var u=i.getBoundingClientRect();l=u.x+o,c=u.y+a}var d=r.getBoundingClientRect(),f=d.width,h=d.height,_=d.x,g=d.y,m=g+a-c,p=_+o-l;return{width:f,height:h,top:m,left:p}}function qx(r){Qs(r).isWord?(Ox(r),r.replaceWith.apply(r,ti(r.childNodes))):mo(r.children).forEach(function(e){return qx(e)})}var u2=function(){return document.createDocumentFragment()};function d2(r,e,t){var n=Sp(e.types),i=e.tagName,s=r.getElementsByTagName("*"),o=[],a=[],l=null,c,u,d,f=[],h=r.parentElement,_=r.nextElementSibling,g=u2(),m=window.getComputedStyle(r),p=m.textAlign,y=parseFloat(m.fontSize),v=y*.2;return e.absolute&&(d={left:r.offsetLeft,top:r.offsetTop,width:r.offsetWidth},u=r.offsetWidth,c=r.offsetHeight,mr(r,{cssWidth:r.style.width,cssHeight:r.style.height})),mo(s).forEach(function(x){var E=x.parentElement===r,b=c2(x,E,e,t),S=b.width,P=b.height,w=b.top,M=b.left;/^br$/i.test(x.nodeName)||(n.lines&&E&&((l===null||w-l>=v)&&(l=w,o.push(a=[])),a.push(x)),e.absolute&&mr(x,{top:w,left:M,width:S,height:P}))}),h&&h.removeChild(r),n.lines&&(f=o.map(function(x){var E=wh(i,{class:"".concat(e.splitClass," ").concat(e.lineClass),style:"display: block; text-align: ".concat(p,"; width: 100%;")});mr(E,"isLine",!0);var b={height:0,top:1e4};return g.appendChild(E),x.forEach(function(S,P,w){var M=Qs(S),L=M.isWordEnd,F=M.top,G=M.height,U=w[P+1];b.height=Math.max(b.height,G),b.top=Math.min(b.top,F),E.appendChild(S),L&&Qs(U).isWordStart&&E.append(" ")}),e.absolute&&mr(E,{height:b.height,top:b.top}),E}),n.words||qx(g),r.replaceChildren(g)),e.absolute&&(r.style.width="".concat(r.style.width||u,"px"),r.style.height="".concat(c,"px"),mo(s).forEach(function(x){var E=Qs(x),b=E.isLine,S=E.top,P=E.left,w=E.width,M=E.height,L=Qs(x.parentElement),F=!b&&L.isLine;x.style.top="".concat(F?S-L.top:S,"px"),x.style.left=b?"".concat(d.left,"px"):"".concat(P-(F?d.left:0),"px"),x.style.height="".concat(M,"px"),x.style.width=b?"".concat(d.width,"px"):"".concat(w,"px"),x.style.position="absolute"})),h&&(_?h.insertBefore(r,_):h.appendChild(r)),f}var Ho=Js(Mp,{}),Pa=(function(){ng(r,null,[{key:"clearData",value:function(){qC()}},{key:"setDefaults",value:function(t){return Ho=Js(Ho,zc(t)),Mp}},{key:"revert",value:function(t){sg(t).forEach(function(n){var i=Qs(n),s=i.isSplit,o=i.html,a=i.cssWidth,l=i.cssHeight;s&&(n.innerHTML=o,n.style.width=a||"",n.style.height=l||"",Ox(n))})}},{key:"create",value:function(t,n){return new r(t,n)}},{key:"data",get:function(){return Ji}},{key:"defaults",get:function(){return Ho},set:function(t){Ho=Js(Ho,zc(t))}}]);function r(e,t){IC(this,r),this.isSplit=!1,this.settings=Js(Ho,zc(t)),this.elements=sg(e),this.split()}return ng(r,[{key:"split",value:function(t){var n=this;this.revert(),this.elements.forEach(function(o){mr(o,"html",o.innerHTML)}),this.lines=[],this.words=[],this.chars=[];var i=[window.pageXOffset,window.pageYOffset];t!==void 0&&(this.settings=Js(this.settings,zc(t)));var s=Sp(this.settings.types);s.none||(this.elements.forEach(function(o){mr(o,"isRoot",!0);var a=Xx(o,n.settings),l=a.words,c=a.chars;n.words=[].concat(ti(n.words),ti(l)),n.chars=[].concat(ti(n.chars),ti(c))}),this.elements.forEach(function(o){if(s.lines||n.settings.absolute){var a=d2(o,n.settings,i);n.lines=[].concat(ti(n.lines),ti(a))}}),this.isSplit=!0,window.scrollTo(i[0],i[1]),YC())}},{key:"revert",value:function(){this.isSplit&&(this.lines=null,this.words=null,this.chars=null,this.isSplit=!1),r.revert(this.elements)}}]),r})();const It={heroYearObj:{year:2026},heroNumberTween:null,heroHeadingFadeScrollTrigger:null};function f2(){It.heroYearObj.year=2026,It.heroNumberTween&&(It.heroNumberTween.kill(),It.heroNumberTween=null),It.heroHeadingFadeScrollTrigger&&(It.heroHeadingFadeScrollTrigger.kill(),It.heroHeadingFadeScrollTrigger=null)}function h2(r){if(window.scrollDownIcon&&document.contains(window.scrollDownIcon))return;const e=document.createElement("div");e.className="scroll-down-icon",e.innerHTML=`
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
    `);const n=r.parentElement;n?n.appendChild(e):document.body.appendChild(e),Me.to(e,{opacity:1,duration:.8,ease:"power2.out",delay:.3});const i=e.querySelector(".scroll-indicator");Me.to(i,{y:3,duration:1.2,ease:"power2.inOut",repeat:-1,yoyo:!0});const s=e.querySelector(".scroll-arrow");Me.to(s,{opacity:.6,duration:1.5,ease:"power2.inOut",repeat:-1,yoyo:!0}),$e.create({trigger:"#cover-travel-area",start:"top top",end:"bottom 70%",scrub:.5,markers:!1,onUpdate:o=>{const a=1-o.progress;Me.set(e,{opacity:a,overwrite:!0})},onLeave:()=>{Me.set(e,{opacity:0})},onEnterBack:()=>{Me.set(e,{opacity:0})}}),window.scrollDownIcon=e,window.scrollDownIconCleanup=()=>{$e.getAll().forEach(o=>{var a;(o.trigger===e||((a=o.vars)==null?void 0:a.trigger)==="#cover-travel-area")&&(o.trigger===e||o.animation&&o.animation.targets().includes(e))&&o.kill()}),e&&e.parentNode&&e.remove(),window.scrollDownIcon=null,window.scrollDownIconCleanup=null}}const p2="/150-lab/assets/audio/ui-click.mp3",m2="/150-lab/assets/audio/chemistry-3-final.mp3";let nn=null,En=!1,fn=!1,Au=!1,Vi=!1,Nr=0;const ur=25;let Ii=null,la=!1,gs=null;function Tp(){gs||(gs=new Audio(p2),gs.volume=.35,gs.preload="auto")}const Xs=()=>{if(!fn)try{gs||Tp();const r=gs.cloneNode();r.volume=.35,r.play().catch(e=>{console.warn("UI click sound play was prevented:",e)})}catch(r){console.error("Error playing UI click sound:",r)}};function og(r){fn&&(r.volume=0,r.muted=!0),r.addEventListener("play",()=>{const e=document.querySelector(".sound-toggle");e&&e.classList.contains("muted")&&(r.volume=0,r.muted=!0)})}function g2(){new MutationObserver(e=>{e.forEach(t=>{t.type==="childList"&&t.addedNodes.forEach(n=>{n.nodeName==="AUDIO"||n.nodeName==="VIDEO"?og(n):n.querySelectorAll&&n.querySelectorAll("audio, video").forEach(s=>{og(s)})})})}).observe(document.body,{childList:!0,subtree:!0})}function Wl(r=!1){if(!(En||fn)){if(Nr++,window.audioRetryCount=Nr,window.maxAudioRetries=ur,Nr>=ur){console.warn(`Exceeded maximum audio retry attempts (${ur}). Stopping retries.`);return}try{if(nn.volume=.22,r)try{const e=new(window.AudioContext||window.webkitAudioContext),t=e.createBufferSource();t.connect(e.destination),t.start(0)}catch(e){console.warn("Could not create audio context:",e)}nn.play().then(()=>{En=!0,window.audioInitialized=!0;const e=document.querySelector(".sound-toggle");e&&e.classList.add("active"),Nr=0,window.audioRetryCount=0}).catch(e=>{console.error("Audio play was prevented:",e),En=!1,(r||Vi)&&Nr<ur&&setTimeout(()=>{!En&&!fn&&Wl(!0)},500)})}catch(e){console.error("Error playing audio:",e),En=!1,(r||Vi)&&Nr<ur&&setTimeout(()=>{!En&&!fn&&Wl(!0)},500)}}}const _2=()=>{document.hidden?nn&&!nn.paused&&En&&(la=!0,nn.pause()):nn&&la&&En&&!fn&&(la=!1,nn.play().catch(r=>{console.warn("Could not resume background audio:",r),En=!1,Vi&&setTimeout(()=>{ao(!0)},100)}))};function x2(){document.addEventListener("visibilitychange",_2),window.addEventListener("blur",()=>{nn&&!nn.paused&&En&&(la=!0,nn.pause())}),window.addEventListener("focus",()=>{nn&&la&&En&&!fn&&(la=!1,nn.play().catch(r=>{console.warn("Could not resume background audio on focus:",r),En=!1,Vi&&setTimeout(()=>{ao(!0)},100)}))})}const ao=(r=!1)=>{if(!fn&&(r&&(Vi=!0,window.enterButtonClicked=!0),!!Vi&&!En)){if(Nr>=ur){console.warn(`Exceeded maximum audio retry attempts (${ur}). Stopping retries.`),Ii&&(clearInterval(Ii),Ii=null);return}if(r){setTimeout(()=>{if(!fn)if(Au||nn&&nn.readyState>=3)Wl(!0);else try{nn.load()}catch(e){console.warn("Error reloading background audio:",e)}},2e3);return}if(Au||nn&&nn.readyState>=3)Wl(r);else if(r)try{nn.load()}catch(e){console.warn("Error reloading background audio:",e)}}};function v2(){const r=new Audio;r.addEventListener("canplaythrough",()=>{Au=!0,Vi&&!En&&!fn&&Wl(!0)}),r.addEventListener("error",e=>{console.error("Audio loading error:",e),console.error("Audio src:",r.src),(window.location.hostname==="localhost"||window.location.hostname.includes("127.0.0.1"))&&console.warn("Audio failed to load in dev mode. Ensure audio files are in 150-lab/public/audio/ directory.")}),r.loop=!0,r.volume=0,r.preload="auto",r.src=m2;try{r.load()}catch(e){console.error("Error loading background audio:",e)}nn=r,window.backgroundAudioInstance=r,window.backgroundAudio=r,En=!1,fn=!1,Au=!1,Vi=!1,Nr=0,window.audioInitialized=!1,window.audioMuted=!1,window.userInteracted=!1,window.heroAnimationComplete=!1,window.enterButtonClicked=!1,window.audioRetryCount=0,window.maxAudioRetries=ur,window.audioRetryTimer=null,x2()}const y2=()=>{Tp(),document.querySelectorAll('a, button, input[type="button"], input[type="submit"], input[type="reset"], input[type="checkbox"], input[type="radio"]').forEach(t=>{t.addEventListener("click",n=>{if(t.classList.contains("enter-experience")){t.dataset.clickSoundPlayed||(fn||Xs(),t.dataset.clickSoundPlayed="true");return}fn||Xs()})}),new MutationObserver(t=>{t.forEach(n=>{n.type==="childList"&&n.addedNodes.forEach(i=>{i.nodeType===1&&(i.matches('a, button, input[type="button"], input[type="submit"], input[type="reset"], input[type="checkbox"], input[type="radio"]')&&i.addEventListener("click",o=>{if(i.classList.contains("enter-experience")){i.dataset.clickSoundPlayed||(fn||Xs(),i.dataset.clickSoundPlayed="true");return}fn||Xs()}),i.querySelectorAll('a, button, input[type="button"], input[type="submit"], input[type="reset"], input[type="checkbox"], input[type="radio"]').forEach(o=>{o.addEventListener("click",a=>{if(o.classList.contains("enter-experience")){o.dataset.clickSoundPlayed||(fn||Xs(),o.dataset.clickSoundPlayed="true");return}fn||Xs()})}))})})}).observe(document.body,{childList:!0,subtree:!0}),g2()};function b2(){const r=document.querySelector(".sound-toggle");if(r){const e=document.getElementById("waveGroup");e&&(window.waveAnimation=Me.to(e,{x:"-=100",ease:"linear",duration:2,repeat:-1})),r.addEventListener("click",()=>{const t=fn;if(r.classList.toggle("muted"),fn=r.classList.contains("muted"),window.audioMuted=fn,t)try{gs||Tp();const i=gs.cloneNode();i.volume=.38,i.play().catch(s=>{console.warn("UI click sound play was prevented:",s)})}catch(i){console.error("Error playing UI click sound:",i)}else Xs();const n=window.waveAnimation;if(fn)n&&n.pause(),nn&&(nn.volume=0,Ii&&(clearInterval(Ii),Ii=null));else{n&&n.resume();const i=document.getElementById("anniversary-video");i&&!i.paused&&!i.ended||(!En&&Vi&&nn?(ao(!0),Ii||(Ii=setInterval(()=>{En?(clearInterval(Ii),Ii=null):!fn&&Vi&&(Nr<ur?ao(!0):(console.warn(`Exceeded maximum audio retry attempts (${ur}). Stopping retries.`),clearInterval(Ii),Ii=null))},500))):En&&nn&&(nn.volume=.22,nn.paused&&nn.play().catch(o=>{console.warn("Audio play was prevented:",o),En=!1,Vi&&ao(!0)})))}})}}function S2(r){window.heroAnimationComplete=r}function w2(r){Vi=r,window.enterButtonClicked=r}function Mh(){It.heroHeadingFadeScrollTrigger&&(It.heroHeadingFadeScrollTrigger.kill(),It.heroHeadingFadeScrollTrigger=null);const r=document.querySelector("#hero-area h1");if(r){let e=r.querySelectorAll(".char");if(!e||e.length===0){const i=r.getAttribute("data-original-content")||r.textContent;r.innerHTML=i;try{e=new Pa(r,{types:"words,chars",absolute:!1}).chars,Me.set(e,{opacity:1,z:0,scale:1,filter:"blur(0px)",transformPerspective:1e3,transformOrigin:"center center"})}catch(s){console.error("Error re-splitting hero heading:",s);return}}if(!e||e.length===0){console.warn("Still no hero heading characters found after attempting re-split. Aborting animation setup.");return}r.offsetHeight;const t=[...e];for(let i=t.length-1;i>0;i--){const s=Math.floor(Math.random()*(i+1));[t[i],t[s]]=[t[s],t[i]]}const n=Me.timeline({paused:!0});n.to(t,{opacity:0,z:-50,filter:"blur(16px)",stagger:.02,ease:"power1.in"},0),It.heroHeadingFadeScrollTrigger=$e.create({animation:n,trigger:"#hero-travel-area",start:"16% top",end:"36% top",scrub:!0,markers:!1,invalidateOnRefresh:!0,onUpdate:i=>{i.progress===0?Me.set(t,{opacity:1,z:0,scale:1,filter:"blur(0px)",clearProps:"transform"}):i.progress===1&&Me.set(t,{opacity:0,z:-50,filter:"blur(16px)"})},onRefresh:i=>{n&&n.progress(i.progress)},onLeave:()=>{Me.set(t,{opacity:0,z:-50,filter:"blur(16px)"})},onEnterBack:()=>{const i=It.heroHeadingFadeScrollTrigger?It.heroHeadingFadeScrollTrigger.progress:0;n&&n.progress(i)},onLeaveBack:()=>{Me.set(t,{opacity:1,z:0,scale:1,filter:"blur(0px)",clearProps:"transform"}),n&&n.progress(0)}})}else console.warn("#hero-area h1 not found for fade animation setup.")}function M2(){const r=document.querySelector("#cover-area .cover-logo"),e=document.querySelector("#countdown"),t=document.querySelector("#cover-area button.enter-experience"),n=document.querySelector("header"),i=document.querySelector("nav"),s=document.querySelector(".section-timeline"),o=document.querySelector("#app");if(!r||!t)return;n&&Me.set(n,{opacity:0}),s&&Me.set(s,{opacity:0});const a=document.querySelector(".share-button-pinned");a&&Me.set(a,{opacity:0}),window.lenis&&window.lenis.stop(),Me.set(i,{opacity:1}),Me.set(r,{position:"fixed",top:"calc(50% - 100px)",left:"50%",transform:"translate(-50%, -50%)",zIndex:1e3}),e&&Me.set(e,{opacity:0});const l=Me.timeline({delay:.6});o&&l.fromTo(o,{opacity:0},{opacity:1,duration:.8,ease:"power2.out"}),l.fromTo(r,{opacity:0,scale:.95},{opacity:1,scale:1,duration:1.8,ease:"power1.out"}),e&&l.to(e,{opacity:1,duration:.4,ease:"power1.out"},"-=0.4"),l.to(t,{opacity:1,duration:.6,ease:"power2.out",onComplete:()=>{t.style.pointerEvents="auto"}},"-=0.3"),t&&t.addEventListener("click",()=>{t.style.pointerEvents="none",n&&Me.to(n,{opacity:1,duration:.8,ease:"power2.inOut"}),s&&Me.to(s,{opacity:1,duration:.8,ease:"power2.inOut",delay:.2}),window.userInteracted=!0,w2(!0),window.enterButtonClicked=!0,window.enableMouseParticles&&window.enableMouseParticles(),document.dispatchEvent(new CustomEvent("veryEarlyParticleFade")),ao(!0),window.audioRetryTimer||(window.audioRetryTimer=setInterval(()=>{window.audioInitialized?(clearInterval(window.audioRetryTimer),window.audioRetryTimer=null):window.enterButtonClicked&&!window.audioMuted&&(window.audioRetryCount<window.maxAudioRetries?ao(!0):(console.warn(`Exceeded maximum audio retry attempts (${window.maxAudioRetries}). Stopping retries.`),clearInterval(window.audioRetryTimer),window.audioRetryTimer=null))},500)),window.lenis&&window.lenis.start(),Me.to(t,{opacity:0,duration:.5,ease:"power2.in",onComplete:()=>{h2(t),t.style.pointerEvents="none"}}),a&&Me.to(a,{opacity:1,duration:.8,delay:.4,ease:"power2.out"});const c=document.querySelector(".sound-toggle");c&&c.classList.add("active"),setTimeout(()=>{T2(r,e)},100)})}function T2(r,e){let t=null,n=-1,i=null,s=!1,o=!1;const a=document.querySelector("#cover-travel-area");if(a){const c=a.getBoundingClientRect(),u=c.height,d=window.innerHeight,f=Math.abs(c.top)/(u-d*.67);if(f>=.9)o=!0,Me.set([r,e],{opacity:0}),n=0;else{const h=Math.max(0,1-f);Me.set([r,e],{opacity:h}),n=h}}else Me.set([r,e],{opacity:1});function l(){return t&&t.kill(),t=$e.create({trigger:"#cover-travel-area",start:"top top",end:"67% center",scrub:.5,markers:!1,id:"cover-logo-fade",invalidateOnRefresh:!0,fastScrollEnd:!0,onUpdate:c=>{if(!s)return;const u=1-c.progress;Math.abs(u-n)>.01&&(n=u,r.style.opacity=u,i&&(i.kill(),i=null),e&&(e.style.opacity=u))},onLeave:()=>{s&&(i&&(i.kill(),i=null),r.style.opacity="0",n=0,e&&(e.style.opacity="0"))},onEnterBack:()=>{if(!s)return;const u=1-t.progress;r.style.opacity=u,n=u,i&&(i.kill(),i=null),e&&(i=Me.to(e,{opacity:u,duration:.8,delay:.4,ease:"power2.out",onUpdate:function(){parseFloat(e.style.opacity)},onComplete:function(){i=null}}))},onLeaveBack:()=>{s&&(i&&(i.kill(),i=null),r.style.opacity="1",n=1,e&&(e.style.opacity="1"))}}),setTimeout(()=>{if(s=!0,!o&&t){const c=t.progress,u=1-c;c>0&&c<1?(r.style.opacity=u,n=u,e&&(e.style.opacity=u)):c>=1&&(r.style.opacity="0",n=0,e&&(e.style.opacity="0"))}},200),t}return l()}function E2(){const r=document.querySelector("#hero-area h1"),e=document.querySelector("#hero-number");if(!r||!e)return;r.getAttribute("data-original-content")||r.setAttribute("data-original-content",r.textContent),$e.getAll().forEach(a=>{(a.vars.trigger==="#hero-area"||a.vars.trigger==="#hero-travel-area")&&a.kill()});const t=e.innerText||"2026";e.getAttribute("data-original-content")||e.setAttribute("data-original-content",t),e.innerHTML="",e.style.setProperty("--digit-opacity","0"),t.split("").forEach(a=>{const l=document.createElement("span");l.className="digit",l.textContent=a,l.setAttribute("data-digit",a),e.appendChild(l)}),Me.set(e,{opacity:0}),Me.set(r,{opacity:0});const n=new Pa(r,{types:"words,chars",absolute:!1});Me.set(n.chars,{opacity:0,z:150,scale:1.2,transformPerspective:1e3,transformOrigin:"center center",filter:"blur(16px)"});const i=[...n.chars];for(let a=i.length-1;a>0;a--){const l=Math.floor(Math.random()*(a+1));[i[a],i[l]]=[i[l],i[a]]}const s=Me.timeline({paused:!0,onComplete:()=>{S2(!0),window.heroAnimationComplete=!0;const a=new CustomEvent("heroAnimationComplete");document.dispatchEvent(a)}});s.to(r,{opacity:1,duration:.8,ease:"power2.out"}),s.to(i,{opacity:1,z:0,scale:1,filter:"blur(0px)",duration:1.25,stagger:.03,ease:"power2.out",onComplete:()=>{const a=new CustomEvent("particleFadeStart");document.dispatchEvent(a)}}),s.to(e,{opacity:1,duration:1.5,scrub:1.5,ease:"power1.inOut"});const o=e.querySelectorAll(".digit");Me.set(o,{y:10,z:-120,transformPerspective:1e3,transformOrigin:"center center"}),s.to(o,{y:0,z:0,duration:2.5,stagger:.1,ease:"power3.out"},"-=0.6"),s.to(e,{"--digit-opacity":.44,duration:2.5,ease:"power3.out"},"-=2.5"),$e.create({trigger:"#hero-travel-area",start:"top 90%",end:"top 0%",animation:s,scrub:.5,markers:!1,invalidateOnRefresh:!0,fastScrollEnd:!0,onEnter:()=>{const a=new CustomEvent("veryEarlyParticleFade");document.dispatchEvent(a)},onUpdate:a=>{s&&s.progress(a.progress)}}),e&&($e.create({trigger:"#hero-travel-area",start:"15% top",end:"bottom bottom",scrub:.3,markers:!1,invalidateOnRefresh:!0,fastScrollEnd:!0,onUpdate:a=>{const l=1-a.progress*.5;e.style.transform=`scale(${l})`},onLeave:()=>{e.style.transform="scale(0.5)"},onEnterBack:()=>{const l=1-($e.getById("hero-scale")?$e.getById("hero-scale").progress:0)*.5;e.style.transform=`scale(${l})`},onLeaveBack:()=>{e.style.transform="scale(1)"},id:"hero-scale"}),$e.create({trigger:"#hero-travel-area",start:"bottom 90%",end:"bottom 80%",scrub:.3,markers:!1,invalidateOnRefresh:!0,fastScrollEnd:!0,onUpdate:function(a){const l=a.progress;let c=1;It.heroNumberTween&&It.heroNumberTween.scrollTrigger&&(c=.44+It.heroNumberTween.scrollTrigger.progress*.56);const u=c*(1-l),d=l*16;e.style.setProperty("--digit-opacity",u),e.style.filter=`blur(${d}px)`},onLeave:()=>{e.style.setProperty("--digit-opacity","0"),e.style.filter="blur(16px)"},onEnterBack:()=>{const a=$e.getById("hero-fade-out");if(a){const l=a.progress;let c=1;It.heroNumberTween&&It.heroNumberTween.scrollTrigger&&(c=.44+It.heroNumberTween.scrollTrigger.progress*.56);const u=c*(1-l),d=l*16;e.style.setProperty("--digit-opacity",u),e.style.filter=`blur(${d}px)`}},id:"hero-fade-out"}),$e.create({trigger:"#hero-travel-area",start:"bottom 80%",end:"bottom 60%",scrub:.5,markers:!1,invalidateOnRefresh:!0,fastScrollEnd:!0,onUpdate:function(a){e.style.setProperty("--digit-opacity","0"),e.style.filter="blur(16px)",e.style.opacity="0"},onLeave:()=>{e.style.setProperty("--digit-opacity","0"),e.style.filter="blur(16px)",e.style.opacity="0"},onEnterBack:()=>{},onLeaveBack:()=>{e.style.opacity="1"},id:"hero-backup-fade-out"}))}function A2(){const r=document.querySelector("#hero-number");r?It.heroNumberTween?(It.heroNumberTween.scrollTrigger&&It.heroNumberTween.scrollTrigger.enable(),It.heroNumberTween.resume()):(It.heroNumberTween=Me.to(It.heroYearObj,{year:1876,ease:"none",paused:!0,scrollTrigger:{trigger:"#hero-travel-area",start:"15% top",end:"75% bottom",scrub:.5,markers:!1,invalidateOnRefresh:!0,fastScrollEnd:!0,id:"hero-countdown",onUpdate:function(e){const t=Math.round(2026-e.progress*150);It.heroYearObj.year=t;const n=.44+e.progress*.56,i=t.toString(),s=r.querySelectorAll(".digit"),o=i.split("");let a=!1;if(s.length!==o.length)a=!0;else for(let l=0;l<s.length;l++)if(s[l].textContent!==o[l]){a=!0;break}a&&(s.length!==o.length?(r.innerHTML="",o.forEach(l=>{const c=document.createElement("span");c.className="digit",c.textContent=l,c.setAttribute("data-digit",l),r.appendChild(c)})):s.forEach((l,c)=>{l.textContent!==o[c]&&(l.textContent=o[c],l.setAttribute("data-digit",o[c]))})),r.style.setProperty("--digit-opacity",n),r.style.filter="blur(0px)"},onLeave:function(e){requestAnimationFrame(()=>{r.style.setProperty("--digit-opacity","1.0"),r.style.filter="blur(0px)"})},onComplete:function(){It.heroYearObj.year=1876;const e=document.querySelector("#hero-number");if(e){const t=e.querySelectorAll(".digit"),n="1876".split("");t.forEach((i,s)=>{i.textContent!==n[s]&&(i.textContent=n[s],i.setAttribute("data-digit",n[s]))}),requestAnimationFrame(()=>{e.style.setProperty("--digit-opacity","1.0"),e.style.filter="blur(0px)"})}},onLeaveBack:function(e){It.heroYearObj.year=2026;const t=document.querySelector("#hero-number");if(t){const n=t.querySelectorAll(".digit"),i="2026".split("");n.forEach((s,o)=>{s.textContent!==i[o]&&(s.textContent=i[o],s.setAttribute("data-digit",i[o]))}),requestAnimationFrame(()=>{t.style.setProperty("--digit-opacity","0.44"),t.style.filter="blur(0px)"})}},onRefresh:e=>{const t=.44+e.progress*.56;requestAnimationFrame(()=>{r.style.setProperty("--digit-opacity",t),r.style.filter="blur(0px)"})}}}),It.heroNumberTween.scrollTrigger?$e.refresh():console.error("Hero countdown: ScrollTrigger creation failed!")):console.warn("#hero-number element not found for countdown animation.")}function C2(){document.querySelectorAll(".pin-top-top").forEach(function(r){let e=r.parentElement;r.id==="cover-area"?$e.create({trigger:"#cover-travel-area",start:"top top",end:"bottom top",pin:r,pinSpacing:!1,anticipatePin:1,onLeaveBack:t=>{t.pin.style.transform="translate3d(0px, 0px, 0px)"}}):r.id==="hero-area"?$e.create({trigger:r,endTrigger:"#hero-travel-area",start:"top top",end:"bottom 80%",pin:r,pinSpacing:!1,anticipatePin:1,onLeaveBack:t=>{t.pin.style.transform="translate3d(0px, 0px, 0px)"}}):$e.create({trigger:e,start:"top top",end:"bottom bottom",pin:r,pinSpacing:!1})})}function R2(){const r=document.querySelector("#video .video-wrapper"),e=document.querySelector("#video"),t=document.querySelector("#video-travel-area");r&&e&&t&&(Me.set(r,{scale:.4,opacity:0,transformOrigin:"center center"}),Me.set(e,{pointerEvents:"none"}),Me.timeline({scrollTrigger:{trigger:"#video",start:"top top",end:"top -50%",scrub:!0,markers:!1,onUpdate:i=>{i.progress>.8?r.classList.add("scale-active"):r.classList.remove("scale-active")}}}).to(r,{scale:1,opacity:1,ease:"power2.out"}),$e.create({trigger:"#video",start:"top 20%",end:"top top",markers:!1,onEnter:()=>{Me.set(e,{pointerEvents:"auto"})},onLeaveBack:()=>{Me.set(e,{pointerEvents:"none"})}}),$e.create({trigger:"#video",start:"top top",endTrigger:"#video-travel-area",end:"bottom bottom",pin:!0,pinSpacing:!1,anticipatePin:1,markers:!1,id:"video-pin"}))}function Vu(r,e){let t;return function(...i){const s=()=>{clearTimeout(t),r(...i)};clearTimeout(t),t=setTimeout(s,e)}}function P2(){const r=document.querySelector("#get-involved-text p");r&&(Me.set(r,{opacity:1,visibility:"visible",autoAlpha:1}),setTimeout(()=>{document.body.offsetHeight,r.offsetHeight,r.style.width=r.offsetWidth+"px";const e=new Pa(r,{types:"lines",lineClass:"line",absolute:!1});e.lines&&e.lines.length>0?(Me.set(e.lines,{opacity:0,y:40,transformOrigin:"center center"}),Me.timeline({scrollTrigger:{trigger:"#get-involved",start:"top 65%",end:"top 20%",scrub:!1,markers:!1,toggleActions:"play none none reverse"}}).to(e.lines,{opacity:1,y:0,duration:1.2,stagger:.25,ease:"power1.out"})):console.warn("SplitType failed to detect lines properly")},100))}function L2(){const r=document.querySelector(".get-involved-150-logo");if(!r){console.warn("No .get-involved-150-logo element found");return}Me.set(r,{opacity:0,y:50}),$e.create({trigger:r,start:"top 85%",once:!1,markers:!1,id:"get-involved-logo-fade",onEnter:()=>{Me.to(r,{opacity:1,y:0,duration:1.2,ease:"power2.out",overwrite:!0})},onLeaveBack:()=>{Me.to(r,{opacity:0,y:50,duration:.8,ease:"power2.in",overwrite:!0})}})}function D2(){const r=document.querySelector(".sliding-card-row-wrapper"),e=document.querySelector("#get-involved-cards"),t=document.querySelector("#hero-travel-area");let n,i;if(r&&e){const s=()=>{const l=window.innerWidth>1280;n&&!l&&(n.kill(),n=null,Me.set(r,{x:0})),l&&!n&&(n=Me.fromTo(r,{x:"44vw"},{x:"-20vw",ease:"power1.inOut",scrollTrigger:{trigger:"#get-involved-cards",start:"top 80%",end:"bottom 20%",scrub:1.5,invalidateOnRefresh:!0,markers:!1,id:"sliding-cards-animation"}}).scrollTrigger)},o=()=>{i&&(i.kill(),i=null),t&&(i=$e.create({trigger:"#get-involved-cards",start:"top 80%",end:"top 20%",scrub:!0,markers:!1,id:"hero-fade-animation",onUpdate:l=>{const c=1-l.progress;Me.set(t,{opacity:c})},onLeaveBack:()=>{Me.set(t,{opacity:1})}}))};s(),o();const a=Vu(()=>{s(),o()},250);window.addEventListener("resize",a)}else console.warn("Could not find sliding card wrapper or get-involved-cards section")}function I2(){const r=document.querySelector(".form-panel .animation-column"),e=r==null?void 0:r.querySelector("img");if(!r||!e){console.warn("Form panel animation column or image not found");return}let t=r.querySelector(".marquee-container");if(!t){t=document.createElement("div"),t.className="marquee-container";const u=e.cloneNode(!0);u.className+=" cloned-image",e.remove(),t.appendChild(e),t.appendChild(u),r.appendChild(t)}const n=[e,t.querySelector(".cloned-image")];let i=null;const s=()=>{i&&(i.kill(),i=null),r.offsetHeight,e.offsetHeight,setTimeout(()=>{const d=e.getBoundingClientRect().height;if(d<=0){if(window.innerWidth<580)return;console.warn("Image height is 0, retrying marquee setup..."),setTimeout(s,200);return}Me.set(n,{y:0,top:"auto",opacity:1}),Me.set(e,{position:"absolute",top:0,left:0}),Me.set(n[1],{position:"absolute",top:d+"px",left:0});const f=Me.timeline({repeat:-1,ease:"none"}),h=Math.max(d/30,2);f.to(n,{y:-d,duration:h,ease:"none"}),f.set(n,{y:0}),i=f},100)},o=Vu(()=>{document.body.offsetHeight,s()},250);(()=>{e.complete&&e.naturalHeight!==0?s():(e.addEventListener("load",s),setTimeout(s,1e3))})(),window.addEventListener("resize",o),window.addEventListener("orientationchange",()=>{setTimeout(o,300)}),window.cleanupInfiniteMarquee=()=>{i&&(i.kill(),i=null),window.removeEventListener("resize",o)};let l=!1;const c=()=>{if(!l){l=!0;const u=e.getBoundingClientRect().height,d=parseFloat(n[1].style.top||"0");Math.abs(u-d)>5&&s(),window.removeEventListener("scroll",c)}};window.addEventListener("scroll",c),document.fonts&&document.fonts.ready&&document.fonts.ready.then(()=>{setTimeout(s,100)})}function O2(){const r=document.querySelectorAll(".scroll-reveal, .reveal-top-center, .reveal-center-center");if(!r.length){console.warn("No reveal elements found");return}r.forEach((e,t)=>{const n=e.classList.contains("fancy-btn"),i=parseFloat(e.getAttribute("data-reveal-delay"))||0;let s=50,o="top 85%";e.classList.contains("reveal-top-center")?(s=-50,o="top 50%"):e.classList.contains("reveal-center-center")&&(s=0,o="center 50%"),n?(Me.set(e,{y:s,filter:"opacity(0)"}),$e.create({trigger:e,start:o,once:!1,markers:!1,id:`scroll-reveal-button-${t}`,onEnter:()=>{Me.to(e,{y:0,filter:"opacity(1)",duration:1.2,delay:i,ease:"power2.out",overwrite:!0})},onLeaveBack:()=>{Me.to(e,{y:s,filter:"opacity(0)",duration:.8,ease:"power2.in",overwrite:!0})}})):(Me.set(e,{opacity:0,y:s}),$e.create({trigger:e,start:o,once:!1,markers:!1,id:`scroll-reveal-${t}`,onEnter:()=>{Me.to(e,{opacity:1,y:0,duration:1.2,delay:i,ease:"power2.out",overwrite:!0})},onLeaveBack:()=>{Me.to(e,{opacity:0,y:s,duration:.8,ease:"power2.in",overwrite:!0})}}))})}let ag=!1;function lg(r){let e=!1;r.addEventListener("mouseenter",()=>{e=!0,r.classList.add("fancy-btn-active"),r.style.transform="translateY(-2px) scale(1.02)"}),r.addEventListener("mouseleave",()=>{e=!1,r.classList.remove("fancy-btn-active"),r.style.transform=""}),r.addEventListener("mousedown",()=>{r.style.transform="translateY(1px) scale(0.98)"}),r.addEventListener("mouseup",()=>{e&&(r.style.transform="translateY(-2px) scale(1.02)")})}function N2(){const r=document.querySelectorAll(".fancy-btn"),e=()=>{r.forEach(t=>{t.dataset.fancyInitialized!=="true"&&(lg(t),t.dataset.fancyInitialized="true")})};ag||(document.addEventListener("heroAnimationComplete",e),ag=!0),r.forEach(t=>{t.classList.contains("enter-experience")||(lg(t),t.dataset.fancyInitialized="true")}),window.heroAnimationComplete&&e()}function F2(){const r=document.querySelector("#hero-travel-area"),e=document.querySelector("#get-involved"),t=document.querySelector("#events");document.querySelector("#video-travel-area");const n=document.querySelector(".page-nav"),i=document.querySelector(".section-timeline .indicator .active-title"),s=document.querySelector(".section-timeline"),o=document.querySelector(".form-panel"),a=document.querySelector(".timeline-nav-wrapper");if(!r||!e||!n||!i||!s)return;Me.set(n,{opacity:0,pointerEvents:"none"});let l=!1;const c=S=>{if(!o)return!1;const P=o.getBoundingClientRect(),w=S.clientX,M=S.clientY;return w>=P.left&&w<=P.right&&M>=P.top&&M<=P.bottom};s.addEventListener("mouseenter",S=>{!l&&!c(S)&&Me.to(n,{opacity:1,pointerEvents:"auto",duration:.3,ease:"power2.out"})}),s.addEventListener("mouseleave",()=>{Me.to(n,{opacity:0,pointerEvents:"none",duration:.3,ease:"power2.out"}),l=!1}),n.addEventListener("mouseenter",S=>{c(S)||Me.to(i,{opacity:0,duration:.2,ease:"power2.out"})}),n.addEventListener("mouseleave",()=>{Me.to(i,{opacity:1,duration:.2,ease:"power2.out"})}),o&&a&&(o.addEventListener("mouseenter",()=>{Me.set(a,{pointerEvents:"none"})}),o.addEventListener("mouseleave",()=>{Me.set(a,{pointerEvents:"auto"})}));const u=n.querySelector(".anniversary"),d=n.querySelector(".get-involved"),f=n.querySelector(".events"),h=S=>{if(i.textContent===S)return;const P=Me.timeline();P.to(i,{opacity:0,duration:.18,onComplete:()=>{i.textContent=S}}),P.to(i,{opacity:1,duration:.24})},_=S=>{if(!S)return 0;S.offsetHeight;let P=0,w=S;for(;w;)P+=w.offsetTop,w=w.offsetParent;return P};u.addEventListener("click",S=>{S.preventDefault(),n.querySelectorAll("a").forEach(P=>P.classList.remove("active")),u.classList.add("active"),h("150 Years of ACS"),Me.to(n,{opacity:0,pointerEvents:"none",duration:.2,ease:"power2.out"}),l=!0,window.scrollTo({top:0,behavior:"smooth"})}),d.addEventListener("click",S=>{S.preventDefault(),n.querySelectorAll("a").forEach(P=>P.classList.remove("active")),d.classList.add("active"),h("Get Involved"),Me.to(n,{opacity:0,pointerEvents:"none",duration:.2,ease:"power2.out"}),l=!0,e&&setTimeout(()=>{const P=_(e);window.scrollTo({top:P,behavior:"smooth"})},50)}),f.addEventListener("click",S=>{S.preventDefault(),n.querySelectorAll("a").forEach(P=>P.classList.remove("active")),f.classList.add("active"),h("Events"),Me.to(n,{opacity:0,pointerEvents:"none",duration:.2,ease:"power2.out"}),l=!0,t&&setTimeout(()=>{const P=_(t);window.scrollTo({top:P,behavior:"smooth"})},50)});const g=[{id:"hero",element:r,title:"150 Years of ACS",link:u,top:0,bottom:0},{id:"getinvolved",element:e,title:"Get Involved",link:d,top:0,bottom:0},{id:"events",element:t,title:"Events",link:f,top:0,bottom:0}];function m(){if(g.forEach(S=>{S.element&&(S.top=_(S.element),S.bottom=S.top+S.element.offsetHeight)}),g[0].element&&e&&(g[0].bottom=_(e)),e&&t){const S=g.find(P=>P.id==="getinvolved");S&&(S.top=_(e),S.bottom=_(t))}}m();let p=null;function y(){requestAnimationFrame(()=>{const S=window.pageYOffset+window.innerHeight/2;let P=g[0];for(let w=g.length-1;w>=0;w--){const M=g[w];if(M.element&&S>=M.top&&S<M.bottom){P=M;break}}p!==P.id&&(p=P.id,n.querySelectorAll("a").forEach(w=>w.classList.remove("active")),P.link&&P.link.classList.add("active"),h(P.title))})}window.removeEventListener("scroll",y),window.addEventListener("scroll",y);const v=Vu(()=>{document.body.offsetHeight,m(),requestAnimationFrame(()=>{m(),y()})},150);window.addEventListener("resize",v),window.addEventListener("orientationchange",()=>{setTimeout(()=>{v()},300)});const x=()=>{m(),y()};x(),setTimeout(x,500),document.fonts&&document.fonts.ready&&document.fonts.ready.then(x);let E=!1;const b=()=>{E||(E=!0,m(),window.removeEventListener("scroll",b))};window.addEventListener("scroll",b)}function U2(){const r=document.querySelector(".share-button-pinned"),e=document.querySelector(".events-panel");if(!r||!e){console.warn("Share button or events panel not found for overlap detection");return}const t=()=>{const s=r.getBoundingClientRect(),o=e.getBoundingClientRect();!(s.right<o.left||s.left>o.right||s.bottom<o.top||s.top>o.bottom)?r.style.backgroundColor="rgba(20,181,0,0.75)":r.style.backgroundColor=""};let n=!1;const i=()=>{n||(requestAnimationFrame(()=>{t(),n=!1}),n=!0)};window.addEventListener("scroll",i),window.addEventListener("resize",i),t(),window.cleanupShareButtonOverlap=()=>{window.removeEventListener("scroll",i),window.removeEventListener("resize",i),r&&(r.style.backgroundColor="")}}function k2(){const r=document.querySelector(".share-button-pinned");if(!r){console.warn("Share button not found for share panel initialization");return}const e=document.createElement("div");e.className="share-panel",e.innerHTML=`
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
  `,document.body.appendChild(e),B2(r,e)}function B2(r,e){let t=!1;const n=()=>({url:window.location.href,title:"American Chemical Society - 150 Years of Innovation",description:"Join us in celebrating 150 years of advancing chemistry and chemical sciences. #ACS150",hashtags:"ACS150,Chemistry,Science,Innovation"}),i=(c,u)=>{const d={facebook:`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(u.url)}`,linkedin:`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(u.url)}`,instagram:"https://www.instagram.com/"};d[c]&&window.open(d[c],"_blank","width=600,height=400")},s=async c=>{try{return await navigator.clipboard.writeText(c),!0}catch(u){return console.error("Failed to copy text: ",u),!1}},o=c=>{const u=document.createElement("div");u.textContent=c,u.style.cssText=`
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
    `,document.head.appendChild(c)}}const z2="/150-lab/assets/images/pacifichem-event1.jpg",V2="/150-lab/assets/images/green-chemistry-event2.jpg",H2="/150-lab/assets/images/acs-spring-meeting-event3.jpg";function G2(){const r=document.querySelectorAll(".event-list-item");if(!r.length){console.warn("No .event-list-item elements found");return}const e=[z2,V2,H2];r.forEach((t,n)=>{const i=e[n];if(!i){console.warn(`No image mapped for event item ${n}`);return}const s=document.createElement("img");s.className="pinned-hover-image",s.src=i,s.style.cssText=`
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
    `,document.body.appendChild(s);const o=()=>{const l=t.getBoundingClientRect(),c=-20;s.style.left=l.right-200-c+"px",s.style.top=l.top+l.height/2+"px"};t.addEventListener("mouseenter",()=>{o(),s.style.opacity="1",s.style.transform="translateY(-50%) scale(1)",t.classList.add("active")}),t.addEventListener("mouseleave",()=>{s.style.opacity="0",s.style.transform="translateY(-50%) scale(0.9)",t.classList.remove("active")});const a=()=>{s.style.opacity!=="0"&&o()};window.addEventListener("scroll",a),window.addEventListener("resize",a)})}const nu=[],iu=[],Yx=()=>new Promise(r=>{document.fonts&&document.fonts.ready?document.fonts.ready.then(()=>{r()}):setTimeout(r,100)}),jx=r=>new Promise(e=>{const t=r.closest("section")||r.parentNode;if(!t){e();return}const n=t.querySelectorAll("img");if(n.length===0){e();return}const i=setTimeout(e,2e3);let s=0,o=!0;if(n.forEach(a=>{a.complete||(o=!1)}),o){clearTimeout(i),e();return}n.forEach(a=>{a.complete?(s++,s===n.length&&(clearTimeout(i),e())):(a.addEventListener("load",()=>{s++,s===n.length&&(clearTimeout(i),e())}),a.addEventListener("error",()=>{s++,s===n.length&&(clearTimeout(i),e())}))})}),$x=(r,e)=>{const t=r.innerHTML;r.setAttribute("data-original-content",t),Promise.all([Yx(),jx(r)]).then(()=>{r.offsetHeight;const n=(i=0)=>{const s=new Pa(r,{types:"lines",lineClass:"split-line",absolute:!1,tagName:"div"});s.lines&&s.lines.length>0?(nu.push({element:r,splitText:s,originalContent:t}),Me.set(s.lines,{opacity:0,y:50}),$e.create({trigger:r,start:"top 85%",once:!1,markers:!1,id:`split-lines-${e}`,onEnter:()=>{const a=e*200;Me.to(s.lines,{opacity:1,y:0,duration:1.2,stagger:.1,ease:"power2.out",delay:a/1e3,overwrite:!0})},onLeaveBack:()=>{Me.to(s.lines,{opacity:0,y:50,duration:.8,stagger:.05,ease:"power2.in",overwrite:!0})}})):i<3?(s&&typeof s.revert=="function"&&s.revert(),setTimeout(()=>{n(i+1)},300*(i+1))):(console.warn("SplitType failed to create lines properly after multiple attempts:",r),r.innerHTML=t)};n()})},Kx=(r,e)=>{const t=r.innerHTML;r.setAttribute("data-original-content",t),Promise.all([Yx(),jx(r)]).then(()=>{r.offsetHeight;const n=(i=0)=>{const s=new Pa(r,{types:"chars",charClass:"split-char",absolute:!1,tagName:"span"});s.chars&&s.chars.length>0?(iu.push({element:r,splitText:s,originalContent:t}),Me.set(s.chars,{opacity:0,y:50,display:"inline-block"}),$e.create({trigger:r,start:"top 85%",once:!1,markers:!1,id:`split-chars-${e}`,onEnter:()=>{Me.to(s.chars,{opacity:1,y:0,duration:1.2,stagger:.02,ease:"power2.out",overwrite:!0})},onLeaveBack:()=>{Me.to(s.chars,{opacity:0,y:50,duration:.8,stagger:.01,ease:"power2.in",overwrite:!0})}})):i<3?(s&&typeof s.revert=="function"&&s.revert(),setTimeout(()=>{n(i+1)},300*(i+1))):(console.warn("SplitType failed to create chars after multiple attempts:",r),r.innerHTML=t)};n()})};function Th(r=null){const e=r||document.querySelectorAll(".split-lines");if(!e||e.length===0){console.warn("No .split-lines elements found or provided for initialization");return}e.forEach((t,n)=>{$x(t,n)})}function Eh(r=null){const e=r||document.querySelectorAll(".split-chars");if(!e||e.length===0){console.warn("No .split-chars elements found or provided for initialization");return}e.forEach((t,n)=>{Kx(t,n)})}function Zx(){nu.forEach(r=>{r.element&&r.originalContent&&(r.element.innerHTML=r.originalContent);const e=nu.indexOf(r);e>-1&&nu.splice(e,1)})}function W2(){Zx(),setTimeout(()=>{document.querySelectorAll(".split-lines").forEach((e,t)=>{$x(e,t)})},100)}function Jx(){iu.forEach(r=>{r.element&&r.originalContent&&(r.element.innerHTML=r.originalContent);const e=iu.indexOf(r);e>-1&&iu.splice(e,1)})}function X2(){Jx(),setTimeout(()=>{document.querySelectorAll(".split-chars").forEach((e,t)=>{Kx(e,t)})},100)}window.cleanupSplitLines=Zx;window.refreshSplitLines=W2;window.cleanupSplitChars=Jx;window.refreshSplitChars=X2;function cg(){typeof window.cleanupSplitLines=="function"&&window.cleanupSplitLines(),typeof window.cleanupSplitChars=="function"&&window.cleanupSplitChars();const r=document.querySelector("#hero-area h1");if(r){let n=0;if(It.heroHeadingFadeScrollTrigger&&It.heroHeadingFadeScrollTrigger.animation){n=It.heroHeadingFadeScrollTrigger.progress;const i=r.querySelectorAll(".char");if(i.length>0){const s=Me.timeline({paused:!0});s.to(i,{opacity:0,z:-50,stagger:.02,ease:"power1.in"},0),s.progress(n)}}if(It.heroHeadingFadeScrollTrigger&&(It.heroHeadingFadeScrollTrigger.kill(),It.heroHeadingFadeScrollTrigger=null),!r.querySelector(".char")){const i=r.getAttribute("data-original-content")||r.textContent;r.innerHTML=i}}const e=Array.from(document.querySelectorAll(".split-lines")).filter(n=>!n.closest("#hero-area")),t=Array.from(document.querySelectorAll(".split-chars")).filter(n=>!n.closest("#hero-area"));e.forEach(n=>{const i=n.getAttribute("data-original-content");i&&(n.innerHTML=i)}),t.forEach(n=>{const i=n.getAttribute("data-original-content");i&&(n.innerHTML=i)}),setTimeout(()=>{e.length&&typeof Th=="function"&&Th(e),t.length&&typeof Eh=="function"&&Eh(t),typeof Mh=="function"&&Mh(),$e.refresh()},50)}function q2(){window.globalResizeHandler&&window.removeEventListener("resize",window.globalResizeHandler),window.globalResizeHandler=Vu(()=>{cg()},250),window.addEventListener("resize",window.globalResizeHandler),window.addEventListener("orientationchange",()=>{cg()})}Me.registerPlugin($e);Me.registerPlugin(Zo);Me.registerPlugin(Pa);window.gsap=Me;const Y2=new Date("2026-04-06T00:00:00").getTime();function j2(){const r=window.location.href.toLowerCase(),e=window.location.pathname.toLowerCase();return r.includes("/editor.html/")||r.includes("globe.html")?(console.log("Not on main page"),!1):r.includes("index.html")||r.includes("acs.org/150")||r.includes("localhost:5173")||r.includes("192.168")||r.includes("cmswwwdev.acs.org/150")||r.includes("adobeaemcloud.com")&&e.includes("/150")||r.includes("awolfe-acs.github.io/150-lab")&&(e==="/150-lab/"||e==="/150-lab/index.html")||r.includes("github.io/150-lab")&&(e==="/150-lab/"||e==="/150-lab/index.html")}function $2(){v2(),$e.refresh(),$e.clearMatchMedia(),f2(),E2(),A2(),C2(),Mh(),R2(),P2(),D2(),L2(),I2(),O2(),F2(),N2(),y2(),b2(),U2(),k2(),G2(),Th(null),Eh(null),q2();const r=document.querySelector("button.toggle-menu");r&&r.addEventListener("click",()=>{const n=document.querySelector("nav"),i=document.querySelector("header");n&&n.classList.toggle("active"),i&&i.classList.toggle("nav-active")});let e=0;window.addEventListener("scroll",()=>{const n=window.scrollY,i=document.querySelector("header.anniversary");i&&(n>e?i.classList.remove("active"):i.classList.add("active")),e=n});const t=document.querySelector("button.close-toggle-menu");t&&t.addEventListener("click",()=>{const n=document.querySelector("nav"),i=document.querySelector("header");n&&n.classList.remove("active"),i&&i.classList.remove("nav-active")})}history.scrollRestoration&&(history.scrollRestoration="manual");window.scrollTo(0,0);window.addEventListener("beforeunload",()=>{window.scrollTo(0,0),sessionStorage.setItem("scrollToTop","true")});window.addEventListener("load",()=>{window.scrollTo({top:0,left:0,behavior:"instant"}),setTimeout(()=>{window.scrollTo(0,0)},10)});document.addEventListener("DOMContentLoaded",()=>{window.scrollTo(0,0);const r=/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)||window.innerWidth<=768||"ontouchstart"in window;window.lenis=new dv({autoRaf:!0,infinite:!1,syncTouch:!0,smoothWheel:!0,touchInertiaMultiplier:35,duration:1.2,easing:t=>Math.min(1,1.001-Math.pow(2,-10*t))}),console.log(r?"Mobile device detected - optimizing for touch":"Desktop device detected"),window.lenis.on("scroll",t=>{}),r&&(document.addEventListener("touchstart",function(t){},{passive:!0}),document.addEventListener("touchmove",function(t){Math.abs(t.touches[0].clientX-t.touches[0].clientY)>Math.abs(t.touches[0].clientY-t.touches[0].clientX)},{passive:!1}),window.addEventListener("resize",()=>{window.lenis&&window.lenis.resize()})),WA(Y2),setTimeout(()=>{try{i_()}catch(t){console.error("Failed to initialize shader background:",t),console.warn("Continuing without shader background...")}},100),j2()?(M2(),$2(),RE()):console.log("Running in lightweight mode - animations and video disabled"),setTimeout(()=>{window.scrollTo(0,0),window.lenis.scrollTo(0,{immediate:!0})},100)});
