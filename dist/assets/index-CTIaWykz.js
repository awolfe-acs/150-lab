var h_=Object.defineProperty;var d_=(r,e,t)=>e in r?h_(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t;var Ie=(r,e,t)=>d_(r,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function t(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(i){if(i.ep)return;i.ep=!0;const s=t(i);fetch(i.href,s)}})();var p_="1.1.20";function Zd(r,e,t){return Math.max(r,Math.min(e,t))}function m_(r,e,t){return(1-t)*r+t*e}function __(r,e,t,n){return m_(r,e,1-Math.exp(-t*n))}function g_(r,e){return(r%e+e)%e}var v_=class{constructor(){Ie(this,"isRunning",!1);Ie(this,"value",0);Ie(this,"from",0);Ie(this,"to",0);Ie(this,"currentTime",0);Ie(this,"lerp");Ie(this,"duration");Ie(this,"easing");Ie(this,"onUpdate")}advance(r){var t;if(!this.isRunning)return;let e=!1;if(this.duration&&this.easing){this.currentTime+=r;const n=Zd(0,this.currentTime/this.duration,1);e=n>=1;const i=e?1:this.easing(n);this.value=this.from+(this.to-this.from)*i}else this.lerp?(this.value=__(this.value,this.to,this.lerp*60,r),Math.round(this.value)===this.to&&(this.value=this.to,e=!0)):(this.value=this.to,e=!0);e&&this.stop(),(t=this.onUpdate)==null||t.call(this,this.value,e)}stop(){this.isRunning=!1}fromTo(r,e,{lerp:t,duration:n,easing:i,onStart:s,onUpdate:o}){this.from=this.value=r,this.to=e,this.lerp=t,this.duration=n,this.easing=i,this.currentTime=0,this.isRunning=!0,s==null||s(),this.onUpdate=o}};function x_(r,e){let t;return function(...n){let i=this;clearTimeout(t),t=setTimeout(()=>{t=void 0,r.apply(i,n)},e)}}var S_=class{constructor(r,e,{autoResize:t=!0,debounce:n=250}={}){Ie(this,"width",0);Ie(this,"height",0);Ie(this,"scrollHeight",0);Ie(this,"scrollWidth",0);Ie(this,"debouncedResize");Ie(this,"wrapperResizeObserver");Ie(this,"contentResizeObserver");Ie(this,"resize",()=>{this.onWrapperResize(),this.onContentResize()});Ie(this,"onWrapperResize",()=>{this.wrapper instanceof Window?(this.width=window.innerWidth,this.height=window.innerHeight):(this.width=this.wrapper.clientWidth,this.height=this.wrapper.clientHeight)});Ie(this,"onContentResize",()=>{this.wrapper instanceof Window?(this.scrollHeight=this.content.scrollHeight,this.scrollWidth=this.content.scrollWidth):(this.scrollHeight=this.wrapper.scrollHeight,this.scrollWidth=this.wrapper.scrollWidth)});this.wrapper=r,this.content=e,t&&(this.debouncedResize=x_(this.resize,n),this.wrapper instanceof Window?window.addEventListener("resize",this.debouncedResize,!1):(this.wrapperResizeObserver=new ResizeObserver(this.debouncedResize),this.wrapperResizeObserver.observe(this.wrapper)),this.contentResizeObserver=new ResizeObserver(this.debouncedResize),this.contentResizeObserver.observe(this.content)),this.resize()}destroy(){var r,e;(r=this.wrapperResizeObserver)==null||r.disconnect(),(e=this.contentResizeObserver)==null||e.disconnect(),this.wrapper===window&&this.debouncedResize&&window.removeEventListener("resize",this.debouncedResize,!1)}get limit(){return{x:this.scrollWidth-this.width,y:this.scrollHeight-this.height}}},jd=class{constructor(){Ie(this,"events",{})}emit(r,...e){var n;let t=this.events[r]||[];for(let i=0,s=t.length;i<s;i++)(n=t[i])==null||n.call(t,...e)}on(r,e){var t;return(t=this.events[r])!=null&&t.push(e)||(this.events[r]=[e]),()=>{var n;this.events[r]=(n=this.events[r])==null?void 0:n.filter(i=>e!==i)}}off(r,e){var t;this.events[r]=(t=this.events[r])==null?void 0:t.filter(n=>e!==n)}destroy(){this.events={}}},$f=100/6,Qi={passive:!1},y_=class{constructor(r,e={wheelMultiplier:1,touchMultiplier:1}){Ie(this,"touchStart",{x:0,y:0});Ie(this,"lastDelta",{x:0,y:0});Ie(this,"window",{width:0,height:0});Ie(this,"emitter",new jd);Ie(this,"onTouchStart",r=>{const{clientX:e,clientY:t}=r.targetTouches?r.targetTouches[0]:r;this.touchStart.x=e,this.touchStart.y=t,this.lastDelta={x:0,y:0},this.emitter.emit("scroll",{deltaX:0,deltaY:0,event:r})});Ie(this,"onTouchMove",r=>{const{clientX:e,clientY:t}=r.targetTouches?r.targetTouches[0]:r,n=-(e-this.touchStart.x)*this.options.touchMultiplier,i=-(t-this.touchStart.y)*this.options.touchMultiplier;this.touchStart.x=e,this.touchStart.y=t,this.lastDelta={x:n,y:i},this.emitter.emit("scroll",{deltaX:n,deltaY:i,event:r})});Ie(this,"onTouchEnd",r=>{this.emitter.emit("scroll",{deltaX:this.lastDelta.x,deltaY:this.lastDelta.y,event:r})});Ie(this,"onWheel",r=>{let{deltaX:e,deltaY:t,deltaMode:n}=r;const i=n===1?$f:n===2?this.window.width:1,s=n===1?$f:n===2?this.window.height:1;e*=i,t*=s,e*=this.options.wheelMultiplier,t*=this.options.wheelMultiplier,this.emitter.emit("scroll",{deltaX:e,deltaY:t,event:r})});Ie(this,"onWindowResize",()=>{this.window={width:window.innerWidth,height:window.innerHeight}});this.element=r,this.options=e,window.addEventListener("resize",this.onWindowResize,!1),this.onWindowResize(),this.element.addEventListener("wheel",this.onWheel,Qi),this.element.addEventListener("touchstart",this.onTouchStart,Qi),this.element.addEventListener("touchmove",this.onTouchMove,Qi),this.element.addEventListener("touchend",this.onTouchEnd,Qi)}on(r,e){return this.emitter.on(r,e)}destroy(){this.emitter.destroy(),window.removeEventListener("resize",this.onWindowResize,!1),this.element.removeEventListener("wheel",this.onWheel,Qi),this.element.removeEventListener("touchstart",this.onTouchStart,Qi),this.element.removeEventListener("touchmove",this.onTouchMove,Qi),this.element.removeEventListener("touchend",this.onTouchEnd,Qi)}},M_=class{constructor({wrapper:r=window,content:e=document.documentElement,eventsTarget:t=r,smoothWheel:n=!0,syncTouch:i=!1,syncTouchLerp:s=.075,touchInertiaMultiplier:o=35,duration:a,easing:l=C=>Math.min(1,1.001-Math.pow(2,-10*C)),lerp:c=.1,infinite:u=!1,orientation:h="vertical",gestureOrientation:f="vertical",touchMultiplier:d=1,wheelMultiplier:g=1,autoResize:_=!0,prevent:m,virtualScroll:p,overscroll:M=!0,autoRaf:y=!1,anchors:v=!1,__experimental__naiveDimensions:A=!1}={}){Ie(this,"_isScrolling",!1);Ie(this,"_isStopped",!1);Ie(this,"_isLocked",!1);Ie(this,"_preventNextNativeScrollEvent",!1);Ie(this,"_resetVelocityTimeout",null);Ie(this,"__rafID",null);Ie(this,"isTouching");Ie(this,"time",0);Ie(this,"userData",{});Ie(this,"lastVelocity",0);Ie(this,"velocity",0);Ie(this,"direction",0);Ie(this,"options");Ie(this,"targetScroll");Ie(this,"animatedScroll");Ie(this,"animate",new v_);Ie(this,"emitter",new jd);Ie(this,"dimensions");Ie(this,"virtualScroll");Ie(this,"onScrollEnd",r=>{r instanceof CustomEvent||(this.isScrolling==="smooth"||this.isScrolling===!1)&&r.stopPropagation()});Ie(this,"dispatchScrollendEvent",()=>{this.options.wrapper.dispatchEvent(new CustomEvent("scrollend",{bubbles:this.options.wrapper===window,detail:{lenisScrollEnd:!0}}))});Ie(this,"onClick",r=>{const t=r.composedPath().find(n=>{var i;return n instanceof HTMLAnchorElement&&((i=n.getAttribute("href"))==null?void 0:i.startsWith("#"))});if(t){const n=t.getAttribute("href");if(n){const i=typeof this.options.anchors=="object"&&this.options.anchors?this.options.anchors:void 0;this.scrollTo(n,i)}}});Ie(this,"onPointerDown",r=>{r.button===1&&this.reset()});Ie(this,"onVirtualScroll",r=>{if(typeof this.options.virtualScroll=="function"&&this.options.virtualScroll(r)===!1)return;const{deltaX:e,deltaY:t,event:n}=r;if(this.emitter.emit("virtual-scroll",{deltaX:e,deltaY:t,event:n}),n.ctrlKey||n.lenisStopPropagation)return;const i=n.type.includes("touch"),s=n.type.includes("wheel");this.isTouching=n.type==="touchstart"||n.type==="touchmove";const o=e===0&&t===0;if(this.options.syncTouch&&i&&n.type==="touchstart"&&o&&!this.isStopped&&!this.isLocked){this.reset();return}const l=this.options.gestureOrientation==="vertical"&&t===0||this.options.gestureOrientation==="horizontal"&&e===0;if(o||l)return;let c=n.composedPath();c=c.slice(0,c.indexOf(this.rootElement));const u=this.options.prevent;if(c.find(m=>{var p,M,y;return m instanceof HTMLElement&&(typeof u=="function"&&(u==null?void 0:u(m))||((p=m.hasAttribute)==null?void 0:p.call(m,"data-lenis-prevent"))||i&&((M=m.hasAttribute)==null?void 0:M.call(m,"data-lenis-prevent-touch"))||s&&((y=m.hasAttribute)==null?void 0:y.call(m,"data-lenis-prevent-wheel")))}))return;if(this.isStopped||this.isLocked){n.preventDefault();return}if(!(this.options.syncTouch&&i||this.options.smoothWheel&&s)){this.isScrolling="native",this.animate.stop(),n.lenisStopPropagation=!0;return}let f=t;this.options.gestureOrientation==="both"?f=Math.abs(t)>Math.abs(e)?t:e:this.options.gestureOrientation==="horizontal"&&(f=e),(!this.options.overscroll||this.options.infinite||this.options.wrapper!==window&&(this.animatedScroll>0&&this.animatedScroll<this.limit||this.animatedScroll===0&&t>0||this.animatedScroll===this.limit&&t<0))&&(n.lenisStopPropagation=!0),n.preventDefault();const d=i&&this.options.syncTouch,_=i&&n.type==="touchend"&&Math.abs(f)>5;_&&(f=this.velocity*this.options.touchInertiaMultiplier),this.scrollTo(this.targetScroll+f,{programmatic:!1,...d?{lerp:_?this.options.syncTouchLerp:1}:{lerp:this.options.lerp,duration:this.options.duration,easing:this.options.easing}})});Ie(this,"onNativeScroll",()=>{if(this._resetVelocityTimeout!==null&&(clearTimeout(this._resetVelocityTimeout),this._resetVelocityTimeout=null),this._preventNextNativeScrollEvent){this._preventNextNativeScrollEvent=!1;return}if(this.isScrolling===!1||this.isScrolling==="native"){const r=this.animatedScroll;this.animatedScroll=this.targetScroll=this.actualScroll,this.lastVelocity=this.velocity,this.velocity=this.animatedScroll-r,this.direction=Math.sign(this.animatedScroll-r),this.isStopped||(this.isScrolling="native"),this.emit(),this.velocity!==0&&(this._resetVelocityTimeout=setTimeout(()=>{this.lastVelocity=this.velocity,this.velocity=0,this.isScrolling=!1,this.emit()},400))}});Ie(this,"raf",r=>{const e=r-(this.time||r);this.time=r,this.animate.advance(e*.001),this.options.autoRaf&&(this.__rafID=requestAnimationFrame(this.raf))});window.lenisVersion=p_,(!r||r===document.documentElement)&&(r=window),this.options={wrapper:r,content:e,eventsTarget:t,smoothWheel:n,syncTouch:i,syncTouchLerp:s,touchInertiaMultiplier:o,duration:a,easing:l,lerp:c,infinite:u,gestureOrientation:f,orientation:h,touchMultiplier:d,wheelMultiplier:g,autoResize:_,prevent:m,virtualScroll:p,overscroll:M,autoRaf:y,anchors:v,__experimental__naiveDimensions:A},this.dimensions=new S_(r,e,{autoResize:_}),this.updateClassName(),this.targetScroll=this.animatedScroll=this.actualScroll,this.options.wrapper.addEventListener("scroll",this.onNativeScroll,!1),this.options.wrapper.addEventListener("scrollend",this.onScrollEnd,{capture:!0}),this.options.anchors&&this.options.wrapper===window&&this.options.wrapper.addEventListener("click",this.onClick,!1),this.options.wrapper.addEventListener("pointerdown",this.onPointerDown,!1),this.virtualScroll=new y_(t,{touchMultiplier:d,wheelMultiplier:g}),this.virtualScroll.on("scroll",this.onVirtualScroll),this.options.autoRaf&&(this.__rafID=requestAnimationFrame(this.raf))}destroy(){this.emitter.destroy(),this.options.wrapper.removeEventListener("scroll",this.onNativeScroll,!1),this.options.wrapper.removeEventListener("scrollend",this.onScrollEnd,{capture:!0}),this.options.wrapper.removeEventListener("pointerdown",this.onPointerDown,!1),this.options.anchors&&this.options.wrapper===window&&this.options.wrapper.removeEventListener("click",this.onClick,!1),this.virtualScroll.destroy(),this.dimensions.destroy(),this.cleanUpClassName(),this.__rafID&&cancelAnimationFrame(this.__rafID)}on(r,e){return this.emitter.on(r,e)}off(r,e){return this.emitter.off(r,e)}setScroll(r){this.isHorizontal?this.options.wrapper.scrollTo({left:r,behavior:"instant"}):this.options.wrapper.scrollTo({top:r,behavior:"instant"})}resize(){this.dimensions.resize(),this.animatedScroll=this.targetScroll=this.actualScroll,this.emit()}emit(){this.emitter.emit("scroll",this)}reset(){this.isLocked=!1,this.isScrolling=!1,this.animatedScroll=this.targetScroll=this.actualScroll,this.lastVelocity=this.velocity=0,this.animate.stop()}start(){this.isStopped&&(this.reset(),this.isStopped=!1)}stop(){this.isStopped||(this.reset(),this.isStopped=!0)}scrollTo(r,{offset:e=0,immediate:t=!1,lock:n=!1,duration:i=this.options.duration,easing:s=this.options.easing,lerp:o=this.options.lerp,onStart:a,onComplete:l,force:c=!1,programmatic:u=!0,userData:h}={}){if(!((this.isStopped||this.isLocked)&&!c)){if(typeof r=="string"&&["top","left","start"].includes(r))r=0;else if(typeof r=="string"&&["bottom","right","end"].includes(r))r=this.limit;else{let f;if(typeof r=="string"?f=document.querySelector(r):r instanceof HTMLElement&&(r!=null&&r.nodeType)&&(f=r),f){if(this.options.wrapper!==window){const g=this.rootElement.getBoundingClientRect();e-=this.isHorizontal?g.left:g.top}const d=f.getBoundingClientRect();r=(this.isHorizontal?d.left:d.top)+this.animatedScroll}}if(typeof r=="number"){if(r+=e,r=Math.round(r),this.options.infinite?u&&(this.targetScroll=this.animatedScroll=this.scroll):r=Zd(0,r,this.limit),r===this.targetScroll){a==null||a(this),l==null||l(this);return}if(this.userData=h??{},t){this.animatedScroll=this.targetScroll=r,this.setScroll(this.scroll),this.reset(),this.preventNextNativeScrollEvent(),this.emit(),l==null||l(this),this.userData={},requestAnimationFrame(()=>{this.dispatchScrollendEvent()});return}u||(this.targetScroll=r),this.animate.fromTo(this.animatedScroll,r,{duration:i,easing:s,lerp:o,onStart:()=>{n&&(this.isLocked=!0),this.isScrolling="smooth",a==null||a(this)},onUpdate:(f,d)=>{this.isScrolling="smooth",this.lastVelocity=this.velocity,this.velocity=f-this.animatedScroll,this.direction=Math.sign(this.velocity),this.animatedScroll=f,this.setScroll(this.scroll),u&&(this.targetScroll=f),d||this.emit(),d&&(this.reset(),this.emit(),l==null||l(this),this.userData={},requestAnimationFrame(()=>{this.dispatchScrollendEvent()}),this.preventNextNativeScrollEvent())}})}}}preventNextNativeScrollEvent(){this._preventNextNativeScrollEvent=!0,requestAnimationFrame(()=>{this._preventNextNativeScrollEvent=!1})}get rootElement(){return this.options.wrapper===window?document.documentElement:this.options.wrapper}get limit(){return this.options.__experimental__naiveDimensions?this.isHorizontal?this.rootElement.scrollWidth-this.rootElement.clientWidth:this.rootElement.scrollHeight-this.rootElement.clientHeight:this.dimensions.limit[this.isHorizontal?"x":"y"]}get isHorizontal(){return this.options.orientation==="horizontal"}get actualScroll(){const r=this.options.wrapper;return this.isHorizontal?r.scrollX??r.scrollLeft:r.scrollY??r.scrollTop}get scroll(){return this.options.infinite?g_(this.animatedScroll,this.limit):this.animatedScroll}get progress(){return this.limit===0?1:this.scroll/this.limit}get isScrolling(){return this._isScrolling}set isScrolling(r){this._isScrolling!==r&&(this._isScrolling=r,this.updateClassName())}get isStopped(){return this._isStopped}set isStopped(r){this._isStopped!==r&&(this._isStopped=r,this.updateClassName())}get isLocked(){return this._isLocked}set isLocked(r){this._isLocked!==r&&(this._isLocked=r,this.updateClassName())}get isSmooth(){return this.isScrolling==="smooth"}get className(){let r="lenis";return this.isStopped&&(r+=" lenis-stopped"),this.isLocked&&(r+=" lenis-locked"),this.isScrolling&&(r+=" lenis-scrolling"),this.isScrolling==="smooth"&&(r+=" lenis-smooth"),r}updateClassName(){this.cleanUpClassName(),this.rootElement.className=`${this.rootElement.className} ${this.className}`.trim()}cleanUpClassName(){this.rootElement.className=this.rootElement.className.replace(/lenis(-\w+)?/g,"").trim()}};/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const uf="173",E_=0,Kf=1,b_=2,Jd=1,T_=2,Bi=3,yr=0,Cn=1,Mi=2,mr=0,Vs=1,Zf=2,jf=3,Jf=4,w_=5,Gr=100,A_=101,C_=102,R_=103,P_=104,D_=200,L_=201,U_=202,I_=203,Gc=204,Wc=205,N_=206,F_=207,O_=208,B_=209,z_=210,k_=211,H_=212,V_=213,G_=214,Xc=0,Yc=1,qc=2,Qs=3,$c=4,Kc=5,Zc=6,jc=7,Qd=0,W_=1,X_=2,_r=0,Y_=1,q_=2,$_=3,K_=4,Z_=5,j_=6,J_=7,ep=300,eo=301,to=302,Jc=303,Qc=304,zl=306,eu=1e3,Xr=1001,tu=1002,mi=1003,Q_=1004,ya=1005,bi=1006,$l=1007,Yr=1008,$i=1009,tp=1010,np=1011,ia=1012,ff=1013,rs=1014,Vi=1015,ma=1016,hf=1017,df=1018,no=1020,ip=35902,rp=1021,sp=1022,pi=1023,op=1024,ap=1025,Gs=1026,io=1027,lp=1028,pf=1029,cp=1030,mf=1031,_f=1033,al=33776,ll=33777,cl=33778,ul=33779,nu=35840,iu=35841,ru=35842,su=35843,ou=36196,au=37492,lu=37496,cu=37808,uu=37809,fu=37810,hu=37811,du=37812,pu=37813,mu=37814,_u=37815,gu=37816,vu=37817,xu=37818,Su=37819,yu=37820,Mu=37821,fl=36492,Eu=36494,bu=36495,up=36283,Tu=36284,wu=36285,Au=36286,eg=3200,tg=3201,ng=0,ig=1,lr="",ti="srgb",ro="srgb-linear",Ml="linear",vt="srgb",ps=7680,Qf=519,rg=512,sg=513,og=514,fp=515,ag=516,lg=517,cg=518,ug=519,eh=35044,th="300 es",Gi=2e3,El=2001;class mo{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){const n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){const n=this._listeners;if(n===void 0)return;const i=n[e];if(i!==void 0){const s=i.indexOf(t);s!==-1&&i.splice(s,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const n=t[e.type];if(n!==void 0){e.target=this;const i=n.slice(0);for(let s=0,o=i.length;s<o;s++)i[s].call(this,e);e.target=null}}}const on=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Kl=Math.PI/180,Cu=180/Math.PI;function _a(){const r=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(on[r&255]+on[r>>8&255]+on[r>>16&255]+on[r>>24&255]+"-"+on[e&255]+on[e>>8&255]+"-"+on[e>>16&15|64]+on[e>>24&255]+"-"+on[t&63|128]+on[t>>8&255]+"-"+on[t>>16&255]+on[t>>24&255]+on[n&255]+on[n>>8&255]+on[n>>16&255]+on[n>>24&255]).toLowerCase()}function ot(r,e,t){return Math.max(e,Math.min(t,r))}function fg(r,e){return(r%e+e)%e}function Zl(r,e,t){return(1-t)*r+t*e}function vo(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return r/4294967295;case Uint16Array:return r/65535;case Uint8Array:return r/255;case Int32Array:return Math.max(r/2147483647,-1);case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:throw new Error("Invalid component type.")}}function wn(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return Math.round(r*4294967295);case Uint16Array:return Math.round(r*65535);case Uint8Array:return Math.round(r*255);case Int32Array:return Math.round(r*2147483647);case Int16Array:return Math.round(r*32767);case Int8Array:return Math.round(r*127);default:throw new Error("Invalid component type.")}}class gt{constructor(e=0,t=0){gt.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6],this.y=i[1]*t+i[4]*n+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=ot(this.x,e.x,t.x),this.y=ot(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=ot(this.x,e,t),this.y=ot(this.y,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(ot(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(ot(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),i=Math.sin(t),s=this.x-e.x,o=this.y-e.y;return this.x=s*n-o*i+e.x,this.y=s*i+o*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Ze{constructor(e,t,n,i,s,o,a,l,c){Ze.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,i,s,o,a,l,c)}set(e,t,n,i,s,o,a,l,c){const u=this.elements;return u[0]=e,u[1]=i,u[2]=a,u[3]=t,u[4]=s,u[5]=l,u[6]=n,u[7]=o,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,s=this.elements,o=n[0],a=n[3],l=n[6],c=n[1],u=n[4],h=n[7],f=n[2],d=n[5],g=n[8],_=i[0],m=i[3],p=i[6],M=i[1],y=i[4],v=i[7],A=i[2],C=i[5],w=i[8];return s[0]=o*_+a*M+l*A,s[3]=o*m+a*y+l*C,s[6]=o*p+a*v+l*w,s[1]=c*_+u*M+h*A,s[4]=c*m+u*y+h*C,s[7]=c*p+u*v+h*w,s[2]=f*_+d*M+g*A,s[5]=f*m+d*y+g*C,s[8]=f*p+d*v+g*w,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8];return t*o*u-t*a*c-n*s*u+n*a*l+i*s*c-i*o*l}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8],h=u*o-a*c,f=a*l-u*s,d=c*s-o*l,g=t*h+n*f+i*d;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return e[0]=h*_,e[1]=(i*c-u*n)*_,e[2]=(a*n-i*o)*_,e[3]=f*_,e[4]=(u*t-i*l)*_,e[5]=(i*s-a*t)*_,e[6]=d*_,e[7]=(n*l-c*t)*_,e[8]=(o*t-n*s)*_,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,i,s,o,a){const l=Math.cos(s),c=Math.sin(s);return this.set(n*l,n*c,-n*(l*o+c*a)+o+e,-i*c,i*l,-i*(-c*o+l*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(jl.makeScale(e,t)),this}rotate(e){return this.premultiply(jl.makeRotation(-e)),this}translate(e,t){return this.premultiply(jl.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<9;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const jl=new Ze;function hp(r){for(let e=r.length-1;e>=0;--e)if(r[e]>=65535)return!0;return!1}function bl(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function hg(){const r=bl("canvas");return r.style.display="block",r}const nh={};function Ds(r){r in nh||(nh[r]=!0,console.warn(r))}function dg(r,e,t){return new Promise(function(n,i){function s(){switch(r.clientWaitSync(e,r.SYNC_FLUSH_COMMANDS_BIT,0)){case r.WAIT_FAILED:i();break;case r.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:n()}}setTimeout(s,t)})}function pg(r){const e=r.elements;e[2]=.5*e[2]+.5*e[3],e[6]=.5*e[6]+.5*e[7],e[10]=.5*e[10]+.5*e[11],e[14]=.5*e[14]+.5*e[15]}function mg(r){const e=r.elements;e[11]===-1?(e[10]=-e[10]-1,e[14]=-e[14]):(e[10]=-e[10],e[14]=-e[14]+1)}const ih=new Ze().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),rh=new Ze().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function _g(){const r={enabled:!0,workingColorSpace:ro,spaces:{},convert:function(i,s,o){return this.enabled===!1||s===o||!s||!o||(this.spaces[s].transfer===vt&&(i.r=Yi(i.r),i.g=Yi(i.g),i.b=Yi(i.b)),this.spaces[s].primaries!==this.spaces[o].primaries&&(i.applyMatrix3(this.spaces[s].toXYZ),i.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===vt&&(i.r=Ws(i.r),i.g=Ws(i.g),i.b=Ws(i.b))),i},fromWorkingColorSpace:function(i,s){return this.convert(i,this.workingColorSpace,s)},toWorkingColorSpace:function(i,s){return this.convert(i,s,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===lr?Ml:this.spaces[i].transfer},getLuminanceCoefficients:function(i,s=this.workingColorSpace){return i.fromArray(this.spaces[s].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,s,o){return i.copy(this.spaces[s].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return r.define({[ro]:{primaries:e,whitePoint:n,transfer:Ml,toXYZ:ih,fromXYZ:rh,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:ti},outputColorSpaceConfig:{drawingBufferColorSpace:ti}},[ti]:{primaries:e,whitePoint:n,transfer:vt,toXYZ:ih,fromXYZ:rh,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:ti}}}),r}const ft=_g();function Yi(r){return r<.04045?r*.0773993808:Math.pow(r*.9478672986+.0521327014,2.4)}function Ws(r){return r<.0031308?r*12.92:1.055*Math.pow(r,.41666)-.055}let ms;class gg{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{ms===void 0&&(ms=bl("canvas")),ms.width=e.width,ms.height=e.height;const n=ms.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=ms}return t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=bl("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const i=n.getImageData(0,0,e.width,e.height),s=i.data;for(let o=0;o<s.length;o++)s[o]=Yi(s[o]/255)*255;return n.putImageData(i,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Yi(t[n]/255)*255):t[n]=Yi(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let vg=0;class dp{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:vg++}),this.uuid=_a(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let s;if(Array.isArray(i)){s=[];for(let o=0,a=i.length;o<a;o++)i[o].isDataTexture?s.push(Jl(i[o].image)):s.push(Jl(i[o]))}else s=Jl(i);n.url=s}return t||(e.images[this.uuid]=n),n}}function Jl(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?gg.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let xg=0;class Rn extends mo{constructor(e=Rn.DEFAULT_IMAGE,t=Rn.DEFAULT_MAPPING,n=Xr,i=Xr,s=bi,o=Yr,a=pi,l=$i,c=Rn.DEFAULT_ANISOTROPY,u=lr){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:xg++}),this.uuid=_a(),this.name="",this.source=new dp(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=s,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new gt(0,0),this.repeat=new gt(1,1),this.center=new gt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ze,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==ep)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case eu:e.x=e.x-Math.floor(e.x);break;case Xr:e.x=e.x<0?0:1;break;case tu:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case eu:e.y=e.y-Math.floor(e.y);break;case Xr:e.y=e.y<0?0:1;break;case tu:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Rn.DEFAULT_IMAGE=null;Rn.DEFAULT_MAPPING=ep;Rn.DEFAULT_ANISOTROPY=1;class Ft{constructor(e=0,t=0,n=0,i=1){Ft.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,i){return this.x=e,this.y=t,this.z=n,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,s=this.w,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*i+o[12]*s,this.y=o[1]*t+o[5]*n+o[9]*i+o[13]*s,this.z=o[2]*t+o[6]*n+o[10]*i+o[14]*s,this.w=o[3]*t+o[7]*n+o[11]*i+o[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,i,s;const l=e.elements,c=l[0],u=l[4],h=l[8],f=l[1],d=l[5],g=l[9],_=l[2],m=l[6],p=l[10];if(Math.abs(u-f)<.01&&Math.abs(h-_)<.01&&Math.abs(g-m)<.01){if(Math.abs(u+f)<.1&&Math.abs(h+_)<.1&&Math.abs(g+m)<.1&&Math.abs(c+d+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const y=(c+1)/2,v=(d+1)/2,A=(p+1)/2,C=(u+f)/4,w=(h+_)/4,E=(g+m)/4;return y>v&&y>A?y<.01?(n=0,i=.707106781,s=.707106781):(n=Math.sqrt(y),i=C/n,s=w/n):v>A?v<.01?(n=.707106781,i=0,s=.707106781):(i=Math.sqrt(v),n=C/i,s=E/i):A<.01?(n=.707106781,i=.707106781,s=0):(s=Math.sqrt(A),n=w/s,i=E/s),this.set(n,i,s,t),this}let M=Math.sqrt((m-g)*(m-g)+(h-_)*(h-_)+(f-u)*(f-u));return Math.abs(M)<.001&&(M=1),this.x=(m-g)/M,this.y=(h-_)/M,this.z=(f-u)/M,this.w=Math.acos((c+d+p-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=ot(this.x,e.x,t.x),this.y=ot(this.y,e.y,t.y),this.z=ot(this.z,e.z,t.z),this.w=ot(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=ot(this.x,e,t),this.y=ot(this.y,e,t),this.z=ot(this.z,e,t),this.w=ot(this.w,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(ot(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Sg extends mo{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new Ft(0,0,e,t),this.scissorTest=!1,this.viewport=new Ft(0,0,e,t);const i={width:e,height:t,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:bi,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const s=new Rn(i,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);s.flipY=!1,s.generateMipmaps=n.generateMipmaps,s.internalFormat=n.internalFormat,this.textures=[];const o=n.count;for(let a=0;a<o;a++)this.textures[a]=s.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let i=0,s=this.textures.length;i<s;i++)this.textures[i].image.width=e,this.textures[i].image.height=t,this.textures[i].image.depth=n;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let n=0,i=e.textures.length;n<i;n++)this.textures[n]=e.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0,this.textures[n].renderTarget=this;const t=Object.assign({},e.texture.image);return this.texture.source=new dp(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class ss extends Sg{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class pp extends Rn{constructor(e=null,t=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=mi,this.minFilter=mi,this.wrapR=Xr,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class yg extends Rn{constructor(e=null,t=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=mi,this.minFilter=mi,this.wrapR=Xr,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class ga{constructor(e=0,t=0,n=0,i=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=i}static slerpFlat(e,t,n,i,s,o,a){let l=n[i+0],c=n[i+1],u=n[i+2],h=n[i+3];const f=s[o+0],d=s[o+1],g=s[o+2],_=s[o+3];if(a===0){e[t+0]=l,e[t+1]=c,e[t+2]=u,e[t+3]=h;return}if(a===1){e[t+0]=f,e[t+1]=d,e[t+2]=g,e[t+3]=_;return}if(h!==_||l!==f||c!==d||u!==g){let m=1-a;const p=l*f+c*d+u*g+h*_,M=p>=0?1:-1,y=1-p*p;if(y>Number.EPSILON){const A=Math.sqrt(y),C=Math.atan2(A,p*M);m=Math.sin(m*C)/A,a=Math.sin(a*C)/A}const v=a*M;if(l=l*m+f*v,c=c*m+d*v,u=u*m+g*v,h=h*m+_*v,m===1-a){const A=1/Math.sqrt(l*l+c*c+u*u+h*h);l*=A,c*=A,u*=A,h*=A}}e[t]=l,e[t+1]=c,e[t+2]=u,e[t+3]=h}static multiplyQuaternionsFlat(e,t,n,i,s,o){const a=n[i],l=n[i+1],c=n[i+2],u=n[i+3],h=s[o],f=s[o+1],d=s[o+2],g=s[o+3];return e[t]=a*g+u*h+l*d-c*f,e[t+1]=l*g+u*f+c*h-a*d,e[t+2]=c*g+u*d+a*f-l*h,e[t+3]=u*g-a*h-l*f-c*d,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,i=e._y,s=e._z,o=e._order,a=Math.cos,l=Math.sin,c=a(n/2),u=a(i/2),h=a(s/2),f=l(n/2),d=l(i/2),g=l(s/2);switch(o){case"XYZ":this._x=f*u*h+c*d*g,this._y=c*d*h-f*u*g,this._z=c*u*g+f*d*h,this._w=c*u*h-f*d*g;break;case"YXZ":this._x=f*u*h+c*d*g,this._y=c*d*h-f*u*g,this._z=c*u*g-f*d*h,this._w=c*u*h+f*d*g;break;case"ZXY":this._x=f*u*h-c*d*g,this._y=c*d*h+f*u*g,this._z=c*u*g+f*d*h,this._w=c*u*h-f*d*g;break;case"ZYX":this._x=f*u*h-c*d*g,this._y=c*d*h+f*u*g,this._z=c*u*g-f*d*h,this._w=c*u*h+f*d*g;break;case"YZX":this._x=f*u*h+c*d*g,this._y=c*d*h+f*u*g,this._z=c*u*g-f*d*h,this._w=c*u*h-f*d*g;break;case"XZY":this._x=f*u*h-c*d*g,this._y=c*d*h-f*u*g,this._z=c*u*g+f*d*h,this._w=c*u*h+f*d*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,i=Math.sin(n);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],i=t[4],s=t[8],o=t[1],a=t[5],l=t[9],c=t[2],u=t[6],h=t[10],f=n+a+h;if(f>0){const d=.5/Math.sqrt(f+1);this._w=.25/d,this._x=(u-l)*d,this._y=(s-c)*d,this._z=(o-i)*d}else if(n>a&&n>h){const d=2*Math.sqrt(1+n-a-h);this._w=(u-l)/d,this._x=.25*d,this._y=(i+o)/d,this._z=(s+c)/d}else if(a>h){const d=2*Math.sqrt(1+a-n-h);this._w=(s-c)/d,this._x=(i+o)/d,this._y=.25*d,this._z=(l+u)/d}else{const d=2*Math.sqrt(1+h-n-a);this._w=(o-i)/d,this._x=(s+c)/d,this._y=(l+u)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(ot(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const i=Math.min(1,t/n);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,i=e._y,s=e._z,o=e._w,a=t._x,l=t._y,c=t._z,u=t._w;return this._x=n*u+o*a+i*c-s*l,this._y=i*u+o*l+s*a-n*c,this._z=s*u+o*c+n*l-i*a,this._w=o*u-n*a-i*l-s*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,i=this._y,s=this._z,o=this._w;let a=o*e._w+n*e._x+i*e._y+s*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=n,this._y=i,this._z=s,this;const l=1-a*a;if(l<=Number.EPSILON){const d=1-t;return this._w=d*o+t*this._w,this._x=d*n+t*this._x,this._y=d*i+t*this._y,this._z=d*s+t*this._z,this.normalize(),this}const c=Math.sqrt(l),u=Math.atan2(c,a),h=Math.sin((1-t)*u)/c,f=Math.sin(t*u)/c;return this._w=o*h+this._w*f,this._x=n*h+this._x*f,this._y=i*h+this._y*f,this._z=s*h+this._z*f,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(i*Math.sin(e),i*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class Z{constructor(e=0,t=0,n=0){Z.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(sh.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(sh.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6]*i,this.y=s[1]*t+s[4]*n+s[7]*i,this.z=s[2]*t+s[5]*n+s[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,s=e.elements,o=1/(s[3]*t+s[7]*n+s[11]*i+s[15]);return this.x=(s[0]*t+s[4]*n+s[8]*i+s[12])*o,this.y=(s[1]*t+s[5]*n+s[9]*i+s[13])*o,this.z=(s[2]*t+s[6]*n+s[10]*i+s[14])*o,this}applyQuaternion(e){const t=this.x,n=this.y,i=this.z,s=e.x,o=e.y,a=e.z,l=e.w,c=2*(o*i-a*n),u=2*(a*t-s*i),h=2*(s*n-o*t);return this.x=t+l*c+o*h-a*u,this.y=n+l*u+a*c-s*h,this.z=i+l*h+s*u-o*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*i,this.y=s[1]*t+s[5]*n+s[9]*i,this.z=s[2]*t+s[6]*n+s[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=ot(this.x,e.x,t.x),this.y=ot(this.y,e.y,t.y),this.z=ot(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=ot(this.x,e,t),this.y=ot(this.y,e,t),this.z=ot(this.z,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(ot(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,i=e.y,s=e.z,o=t.x,a=t.y,l=t.z;return this.x=i*l-s*a,this.y=s*o-n*l,this.z=n*a-i*o,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Ql.copy(this).projectOnVector(e),this.sub(Ql)}reflect(e){return this.sub(Ql.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(ot(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,i=this.z-e.z;return t*t+n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const i=Math.sin(t)*e;return this.x=i*Math.sin(n),this.y=Math.cos(t)*e,this.z=i*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Ql=new Z,sh=new ga;class va{constructor(e=new Z(1/0,1/0,1/0),t=new Z(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(ai.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(ai.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=ai.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const s=n.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=s.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,ai):ai.fromBufferAttribute(s,o),ai.applyMatrix4(e.matrixWorld),this.expandByPoint(ai);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Ma.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Ma.copy(n.boundingBox)),Ma.applyMatrix4(e.matrixWorld),this.union(Ma)}const i=e.children;for(let s=0,o=i.length;s<o;s++)this.expandByObject(i[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,ai),ai.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(xo),Ea.subVectors(this.max,xo),_s.subVectors(e.a,xo),gs.subVectors(e.b,xo),vs.subVectors(e.c,xo),er.subVectors(gs,_s),tr.subVectors(vs,gs),Pr.subVectors(_s,vs);let t=[0,-er.z,er.y,0,-tr.z,tr.y,0,-Pr.z,Pr.y,er.z,0,-er.x,tr.z,0,-tr.x,Pr.z,0,-Pr.x,-er.y,er.x,0,-tr.y,tr.x,0,-Pr.y,Pr.x,0];return!ec(t,_s,gs,vs,Ea)||(t=[1,0,0,0,1,0,0,0,1],!ec(t,_s,gs,vs,Ea))?!1:(ba.crossVectors(er,tr),t=[ba.x,ba.y,ba.z],ec(t,_s,gs,vs,Ea))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,ai).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(ai).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Ui[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Ui[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Ui[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Ui[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Ui[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Ui[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Ui[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Ui[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Ui),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const Ui=[new Z,new Z,new Z,new Z,new Z,new Z,new Z,new Z],ai=new Z,Ma=new va,_s=new Z,gs=new Z,vs=new Z,er=new Z,tr=new Z,Pr=new Z,xo=new Z,Ea=new Z,ba=new Z,Dr=new Z;function ec(r,e,t,n,i){for(let s=0,o=r.length-3;s<=o;s+=3){Dr.fromArray(r,s);const a=i.x*Math.abs(Dr.x)+i.y*Math.abs(Dr.y)+i.z*Math.abs(Dr.z),l=e.dot(Dr),c=t.dot(Dr),u=n.dot(Dr);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>a)return!1}return!0}const Mg=new va,So=new Z,tc=new Z;class gf{constructor(e=new Z,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):Mg.setFromPoints(e).getCenter(n);let i=0;for(let s=0,o=e.length;s<o;s++)i=Math.max(i,n.distanceToSquared(e[s]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;So.subVectors(e,this.center);const t=So.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),i=(n-this.radius)*.5;this.center.addScaledVector(So,i/n),this.radius+=i}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(tc.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(So.copy(e.center).add(tc)),this.expandByPoint(So.copy(e.center).sub(tc))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Ii=new Z,nc=new Z,Ta=new Z,nr=new Z,ic=new Z,wa=new Z,rc=new Z;class Eg{constructor(e=new Z,t=new Z(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Ii)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Ii.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Ii.copy(this.origin).addScaledVector(this.direction,t),Ii.distanceToSquared(e))}distanceSqToSegment(e,t,n,i){nc.copy(e).add(t).multiplyScalar(.5),Ta.copy(t).sub(e).normalize(),nr.copy(this.origin).sub(nc);const s=e.distanceTo(t)*.5,o=-this.direction.dot(Ta),a=nr.dot(this.direction),l=-nr.dot(Ta),c=nr.lengthSq(),u=Math.abs(1-o*o);let h,f,d,g;if(u>0)if(h=o*l-a,f=o*a-l,g=s*u,h>=0)if(f>=-g)if(f<=g){const _=1/u;h*=_,f*=_,d=h*(h+o*f+2*a)+f*(o*h+f+2*l)+c}else f=s,h=Math.max(0,-(o*f+a)),d=-h*h+f*(f+2*l)+c;else f=-s,h=Math.max(0,-(o*f+a)),d=-h*h+f*(f+2*l)+c;else f<=-g?(h=Math.max(0,-(-o*s+a)),f=h>0?-s:Math.min(Math.max(-s,-l),s),d=-h*h+f*(f+2*l)+c):f<=g?(h=0,f=Math.min(Math.max(-s,-l),s),d=f*(f+2*l)+c):(h=Math.max(0,-(o*s+a)),f=h>0?s:Math.min(Math.max(-s,-l),s),d=-h*h+f*(f+2*l)+c);else f=o>0?-s:s,h=Math.max(0,-(o*f+a)),d=-h*h+f*(f+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,h),i&&i.copy(nc).addScaledVector(Ta,f),d}intersectSphere(e,t){Ii.subVectors(e.center,this.origin);const n=Ii.dot(this.direction),i=Ii.dot(Ii)-n*n,s=e.radius*e.radius;if(i>s)return null;const o=Math.sqrt(s-i),a=n-o,l=n+o;return l<0?null:a<0?this.at(l,t):this.at(a,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,i,s,o,a,l;const c=1/this.direction.x,u=1/this.direction.y,h=1/this.direction.z,f=this.origin;return c>=0?(n=(e.min.x-f.x)*c,i=(e.max.x-f.x)*c):(n=(e.max.x-f.x)*c,i=(e.min.x-f.x)*c),u>=0?(s=(e.min.y-f.y)*u,o=(e.max.y-f.y)*u):(s=(e.max.y-f.y)*u,o=(e.min.y-f.y)*u),n>o||s>i||((s>n||isNaN(n))&&(n=s),(o<i||isNaN(i))&&(i=o),h>=0?(a=(e.min.z-f.z)*h,l=(e.max.z-f.z)*h):(a=(e.max.z-f.z)*h,l=(e.min.z-f.z)*h),n>l||a>i)||((a>n||n!==n)&&(n=a),(l<i||i!==i)&&(i=l),i<0)?null:this.at(n>=0?n:i,t)}intersectsBox(e){return this.intersectBox(e,Ii)!==null}intersectTriangle(e,t,n,i,s){ic.subVectors(t,e),wa.subVectors(n,e),rc.crossVectors(ic,wa);let o=this.direction.dot(rc),a;if(o>0){if(i)return null;a=1}else if(o<0)a=-1,o=-o;else return null;nr.subVectors(this.origin,e);const l=a*this.direction.dot(wa.crossVectors(nr,wa));if(l<0)return null;const c=a*this.direction.dot(ic.cross(nr));if(c<0||l+c>o)return null;const u=-a*nr.dot(rc);return u<0?null:this.at(u/o,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Gt{constructor(e,t,n,i,s,o,a,l,c,u,h,f,d,g,_,m){Gt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,i,s,o,a,l,c,u,h,f,d,g,_,m)}set(e,t,n,i,s,o,a,l,c,u,h,f,d,g,_,m){const p=this.elements;return p[0]=e,p[4]=t,p[8]=n,p[12]=i,p[1]=s,p[5]=o,p[9]=a,p[13]=l,p[2]=c,p[6]=u,p[10]=h,p[14]=f,p[3]=d,p[7]=g,p[11]=_,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Gt().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,i=1/xs.setFromMatrixColumn(e,0).length(),s=1/xs.setFromMatrixColumn(e,1).length(),o=1/xs.setFromMatrixColumn(e,2).length();return t[0]=n[0]*i,t[1]=n[1]*i,t[2]=n[2]*i,t[3]=0,t[4]=n[4]*s,t[5]=n[5]*s,t[6]=n[6]*s,t[7]=0,t[8]=n[8]*o,t[9]=n[9]*o,t[10]=n[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,i=e.y,s=e.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(i),c=Math.sin(i),u=Math.cos(s),h=Math.sin(s);if(e.order==="XYZ"){const f=o*u,d=o*h,g=a*u,_=a*h;t[0]=l*u,t[4]=-l*h,t[8]=c,t[1]=d+g*c,t[5]=f-_*c,t[9]=-a*l,t[2]=_-f*c,t[6]=g+d*c,t[10]=o*l}else if(e.order==="YXZ"){const f=l*u,d=l*h,g=c*u,_=c*h;t[0]=f+_*a,t[4]=g*a-d,t[8]=o*c,t[1]=o*h,t[5]=o*u,t[9]=-a,t[2]=d*a-g,t[6]=_+f*a,t[10]=o*l}else if(e.order==="ZXY"){const f=l*u,d=l*h,g=c*u,_=c*h;t[0]=f-_*a,t[4]=-o*h,t[8]=g+d*a,t[1]=d+g*a,t[5]=o*u,t[9]=_-f*a,t[2]=-o*c,t[6]=a,t[10]=o*l}else if(e.order==="ZYX"){const f=o*u,d=o*h,g=a*u,_=a*h;t[0]=l*u,t[4]=g*c-d,t[8]=f*c+_,t[1]=l*h,t[5]=_*c+f,t[9]=d*c-g,t[2]=-c,t[6]=a*l,t[10]=o*l}else if(e.order==="YZX"){const f=o*l,d=o*c,g=a*l,_=a*c;t[0]=l*u,t[4]=_-f*h,t[8]=g*h+d,t[1]=h,t[5]=o*u,t[9]=-a*u,t[2]=-c*u,t[6]=d*h+g,t[10]=f-_*h}else if(e.order==="XZY"){const f=o*l,d=o*c,g=a*l,_=a*c;t[0]=l*u,t[4]=-h,t[8]=c*u,t[1]=f*h+_,t[5]=o*u,t[9]=d*h-g,t[2]=g*h-d,t[6]=a*u,t[10]=_*h+f}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(bg,e,Tg)}lookAt(e,t,n){const i=this.elements;return On.subVectors(e,t),On.lengthSq()===0&&(On.z=1),On.normalize(),ir.crossVectors(n,On),ir.lengthSq()===0&&(Math.abs(n.z)===1?On.x+=1e-4:On.z+=1e-4,On.normalize(),ir.crossVectors(n,On)),ir.normalize(),Aa.crossVectors(On,ir),i[0]=ir.x,i[4]=Aa.x,i[8]=On.x,i[1]=ir.y,i[5]=Aa.y,i[9]=On.y,i[2]=ir.z,i[6]=Aa.z,i[10]=On.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,s=this.elements,o=n[0],a=n[4],l=n[8],c=n[12],u=n[1],h=n[5],f=n[9],d=n[13],g=n[2],_=n[6],m=n[10],p=n[14],M=n[3],y=n[7],v=n[11],A=n[15],C=i[0],w=i[4],E=i[8],x=i[12],S=i[1],P=i[5],I=i[9],O=i[13],q=i[2],W=i[6],V=i[10],X=i[14],z=i[3],re=i[7],D=i[11],ae=i[15];return s[0]=o*C+a*S+l*q+c*z,s[4]=o*w+a*P+l*W+c*re,s[8]=o*E+a*I+l*V+c*D,s[12]=o*x+a*O+l*X+c*ae,s[1]=u*C+h*S+f*q+d*z,s[5]=u*w+h*P+f*W+d*re,s[9]=u*E+h*I+f*V+d*D,s[13]=u*x+h*O+f*X+d*ae,s[2]=g*C+_*S+m*q+p*z,s[6]=g*w+_*P+m*W+p*re,s[10]=g*E+_*I+m*V+p*D,s[14]=g*x+_*O+m*X+p*ae,s[3]=M*C+y*S+v*q+A*z,s[7]=M*w+y*P+v*W+A*re,s[11]=M*E+y*I+v*V+A*D,s[15]=M*x+y*O+v*X+A*ae,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],i=e[8],s=e[12],o=e[1],a=e[5],l=e[9],c=e[13],u=e[2],h=e[6],f=e[10],d=e[14],g=e[3],_=e[7],m=e[11],p=e[15];return g*(+s*l*h-i*c*h-s*a*f+n*c*f+i*a*d-n*l*d)+_*(+t*l*d-t*c*f+s*o*f-i*o*d+i*c*u-s*l*u)+m*(+t*c*h-t*a*d-s*o*h+n*o*d+s*a*u-n*c*u)+p*(-i*a*u-t*l*h+t*a*f+i*o*h-n*o*f+n*l*u)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8],h=e[9],f=e[10],d=e[11],g=e[12],_=e[13],m=e[14],p=e[15],M=h*m*c-_*f*c+_*l*d-a*m*d-h*l*p+a*f*p,y=g*f*c-u*m*c-g*l*d+o*m*d+u*l*p-o*f*p,v=u*_*c-g*h*c+g*a*d-o*_*d-u*a*p+o*h*p,A=g*h*l-u*_*l-g*a*f+o*_*f+u*a*m-o*h*m,C=t*M+n*y+i*v+s*A;if(C===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const w=1/C;return e[0]=M*w,e[1]=(_*f*s-h*m*s-_*i*d+n*m*d+h*i*p-n*f*p)*w,e[2]=(a*m*s-_*l*s+_*i*c-n*m*c-a*i*p+n*l*p)*w,e[3]=(h*l*s-a*f*s-h*i*c+n*f*c+a*i*d-n*l*d)*w,e[4]=y*w,e[5]=(u*m*s-g*f*s+g*i*d-t*m*d-u*i*p+t*f*p)*w,e[6]=(g*l*s-o*m*s-g*i*c+t*m*c+o*i*p-t*l*p)*w,e[7]=(o*f*s-u*l*s+u*i*c-t*f*c-o*i*d+t*l*d)*w,e[8]=v*w,e[9]=(g*h*s-u*_*s-g*n*d+t*_*d+u*n*p-t*h*p)*w,e[10]=(o*_*s-g*a*s+g*n*c-t*_*c-o*n*p+t*a*p)*w,e[11]=(u*a*s-o*h*s-u*n*c+t*h*c+o*n*d-t*a*d)*w,e[12]=A*w,e[13]=(u*_*i-g*h*i+g*n*f-t*_*f-u*n*m+t*h*m)*w,e[14]=(g*a*i-o*_*i-g*n*l+t*_*l+o*n*m-t*a*m)*w,e[15]=(o*h*i-u*a*i+u*n*l-t*h*l-o*n*f+t*a*f)*w,this}scale(e){const t=this.elements,n=e.x,i=e.y,s=e.z;return t[0]*=n,t[4]*=i,t[8]*=s,t[1]*=n,t[5]*=i,t[9]*=s,t[2]*=n,t[6]*=i,t[10]*=s,t[3]*=n,t[7]*=i,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,i))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),i=Math.sin(t),s=1-n,o=e.x,a=e.y,l=e.z,c=s*o,u=s*a;return this.set(c*o+n,c*a-i*l,c*l+i*a,0,c*a+i*l,u*a+n,u*l-i*o,0,c*l-i*a,u*l+i*o,s*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,i,s,o){return this.set(1,n,s,0,e,1,o,0,t,i,1,0,0,0,0,1),this}compose(e,t,n){const i=this.elements,s=t._x,o=t._y,a=t._z,l=t._w,c=s+s,u=o+o,h=a+a,f=s*c,d=s*u,g=s*h,_=o*u,m=o*h,p=a*h,M=l*c,y=l*u,v=l*h,A=n.x,C=n.y,w=n.z;return i[0]=(1-(_+p))*A,i[1]=(d+v)*A,i[2]=(g-y)*A,i[3]=0,i[4]=(d-v)*C,i[5]=(1-(f+p))*C,i[6]=(m+M)*C,i[7]=0,i[8]=(g+y)*w,i[9]=(m-M)*w,i[10]=(1-(f+_))*w,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,n){const i=this.elements;let s=xs.set(i[0],i[1],i[2]).length();const o=xs.set(i[4],i[5],i[6]).length(),a=xs.set(i[8],i[9],i[10]).length();this.determinant()<0&&(s=-s),e.x=i[12],e.y=i[13],e.z=i[14],li.copy(this);const c=1/s,u=1/o,h=1/a;return li.elements[0]*=c,li.elements[1]*=c,li.elements[2]*=c,li.elements[4]*=u,li.elements[5]*=u,li.elements[6]*=u,li.elements[8]*=h,li.elements[9]*=h,li.elements[10]*=h,t.setFromRotationMatrix(li),n.x=s,n.y=o,n.z=a,this}makePerspective(e,t,n,i,s,o,a=Gi){const l=this.elements,c=2*s/(t-e),u=2*s/(n-i),h=(t+e)/(t-e),f=(n+i)/(n-i);let d,g;if(a===Gi)d=-(o+s)/(o-s),g=-2*o*s/(o-s);else if(a===El)d=-o/(o-s),g=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=c,l[4]=0,l[8]=h,l[12]=0,l[1]=0,l[5]=u,l[9]=f,l[13]=0,l[2]=0,l[6]=0,l[10]=d,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,i,s,o,a=Gi){const l=this.elements,c=1/(t-e),u=1/(n-i),h=1/(o-s),f=(t+e)*c,d=(n+i)*u;let g,_;if(a===Gi)g=(o+s)*h,_=-2*h;else if(a===El)g=s*h,_=-1*h;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-f,l[1]=0,l[5]=2*u,l[9]=0,l[13]=-d,l[2]=0,l[6]=0,l[10]=_,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<16;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const xs=new Z,li=new Gt,bg=new Z(0,0,0),Tg=new Z(1,1,1),ir=new Z,Aa=new Z,On=new Z,oh=new Gt,ah=new ga;class Ki{constructor(e=0,t=0,n=0,i=Ki.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,i=this._order){return this._x=e,this._y=t,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const i=e.elements,s=i[0],o=i[4],a=i[8],l=i[1],c=i[5],u=i[9],h=i[2],f=i[6],d=i[10];switch(t){case"XYZ":this._y=Math.asin(ot(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,d),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(f,c),this._z=0);break;case"YXZ":this._x=Math.asin(-ot(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,d),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-h,s),this._z=0);break;case"ZXY":this._x=Math.asin(ot(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-h,d),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-ot(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(f,d),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(ot(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-h,s)):(this._x=0,this._y=Math.atan2(a,d));break;case"XZY":this._z=Math.asin(-ot(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(f,c),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-u,d),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return oh.makeRotationFromQuaternion(e),this.setFromRotationMatrix(oh,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return ah.setFromEuler(this),this.setFromQuaternion(ah,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Ki.DEFAULT_ORDER="XYZ";class mp{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let wg=0;const lh=new Z,Ss=new ga,Ni=new Gt,Ca=new Z,yo=new Z,Ag=new Z,Cg=new ga,ch=new Z(1,0,0),uh=new Z(0,1,0),fh=new Z(0,0,1),hh={type:"added"},Rg={type:"removed"},ys={type:"childadded",child:null},sc={type:"childremoved",child:null};class Yn extends mo{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:wg++}),this.uuid=_a(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Yn.DEFAULT_UP.clone();const e=new Z,t=new Ki,n=new ga,i=new Z(1,1,1);function s(){n.setFromEuler(t,!1)}function o(){t.setFromQuaternion(n,void 0,!1)}t._onChange(s),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new Gt},normalMatrix:{value:new Ze}}),this.matrix=new Gt,this.matrixWorld=new Gt,this.matrixAutoUpdate=Yn.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Yn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new mp,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Ss.setFromAxisAngle(e,t),this.quaternion.multiply(Ss),this}rotateOnWorldAxis(e,t){return Ss.setFromAxisAngle(e,t),this.quaternion.premultiply(Ss),this}rotateX(e){return this.rotateOnAxis(ch,e)}rotateY(e){return this.rotateOnAxis(uh,e)}rotateZ(e){return this.rotateOnAxis(fh,e)}translateOnAxis(e,t){return lh.copy(e).applyQuaternion(this.quaternion),this.position.add(lh.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(ch,e)}translateY(e){return this.translateOnAxis(uh,e)}translateZ(e){return this.translateOnAxis(fh,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Ni.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Ca.copy(e):Ca.set(e,t,n);const i=this.parent;this.updateWorldMatrix(!0,!1),yo.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Ni.lookAt(yo,Ca,this.up):Ni.lookAt(Ca,yo,this.up),this.quaternion.setFromRotationMatrix(Ni),i&&(Ni.extractRotation(i.matrixWorld),Ss.setFromRotationMatrix(Ni),this.quaternion.premultiply(Ss.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(hh),ys.child=e,this.dispatchEvent(ys),ys.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Rg),sc.child=e,this.dispatchEvent(sc),sc.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Ni.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Ni.multiply(e.parent.matrixWorld)),e.applyMatrix4(Ni),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(hh),ys.child=e,this.dispatchEvent(ys),ys.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,i=this.children.length;n<i;n++){const o=this.children[n].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const i=this.children;for(let s=0,o=i.length;s<o;s++)i[s].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(yo,e,Ag),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(yo,Cg,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const i=this.children;for(let s=0,o=i.length;s<o;s++)i[s].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.visibility=this._visibility,i.active=this._active,i.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.geometryCount=this._geometryCount,i.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(i.boundingSphere={center:i.boundingSphere.center.toArray(),radius:i.boundingSphere.radius}),this.boundingBox!==null&&(i.boundingBox={min:i.boundingBox.min.toArray(),max:i.boundingBox.max.toArray()}));function s(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=s(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const h=l[c];s(e.shapes,h)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(s(e.materials,this.material[l]));i.material=a}else i.material=s(e.materials,this.material);if(this.children.length>0){i.children=[];for(let a=0;a<this.children.length;a++)i.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];i.animations.push(s(e.animations,l))}}if(t){const a=o(e.geometries),l=o(e.materials),c=o(e.textures),u=o(e.images),h=o(e.shapes),f=o(e.skeletons),d=o(e.animations),g=o(e.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),u.length>0&&(n.images=u),h.length>0&&(n.shapes=h),f.length>0&&(n.skeletons=f),d.length>0&&(n.animations=d),g.length>0&&(n.nodes=g)}return n.object=i,n;function o(a){const l=[];for(const c in a){const u=a[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const i=e.children[n];this.add(i.clone())}return this}}Yn.DEFAULT_UP=new Z(0,1,0);Yn.DEFAULT_MATRIX_AUTO_UPDATE=!0;Yn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const ci=new Z,Fi=new Z,oc=new Z,Oi=new Z,Ms=new Z,Es=new Z,dh=new Z,ac=new Z,lc=new Z,cc=new Z,uc=new Ft,fc=new Ft,hc=new Ft;class hi{constructor(e=new Z,t=new Z,n=new Z){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,i){i.subVectors(n,t),ci.subVectors(e,t),i.cross(ci);const s=i.lengthSq();return s>0?i.multiplyScalar(1/Math.sqrt(s)):i.set(0,0,0)}static getBarycoord(e,t,n,i,s){ci.subVectors(i,t),Fi.subVectors(n,t),oc.subVectors(e,t);const o=ci.dot(ci),a=ci.dot(Fi),l=ci.dot(oc),c=Fi.dot(Fi),u=Fi.dot(oc),h=o*c-a*a;if(h===0)return s.set(0,0,0),null;const f=1/h,d=(c*l-a*u)*f,g=(o*u-a*l)*f;return s.set(1-d-g,g,d)}static containsPoint(e,t,n,i){return this.getBarycoord(e,t,n,i,Oi)===null?!1:Oi.x>=0&&Oi.y>=0&&Oi.x+Oi.y<=1}static getInterpolation(e,t,n,i,s,o,a,l){return this.getBarycoord(e,t,n,i,Oi)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,Oi.x),l.addScaledVector(o,Oi.y),l.addScaledVector(a,Oi.z),l)}static getInterpolatedAttribute(e,t,n,i,s,o){return uc.setScalar(0),fc.setScalar(0),hc.setScalar(0),uc.fromBufferAttribute(e,t),fc.fromBufferAttribute(e,n),hc.fromBufferAttribute(e,i),o.setScalar(0),o.addScaledVector(uc,s.x),o.addScaledVector(fc,s.y),o.addScaledVector(hc,s.z),o}static isFrontFacing(e,t,n,i){return ci.subVectors(n,t),Fi.subVectors(e,t),ci.cross(Fi).dot(i)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,i){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,t,n,i){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return ci.subVectors(this.c,this.b),Fi.subVectors(this.a,this.b),ci.cross(Fi).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return hi.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return hi.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,i,s){return hi.getInterpolation(e,this.a,this.b,this.c,t,n,i,s)}containsPoint(e){return hi.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return hi.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,i=this.b,s=this.c;let o,a;Ms.subVectors(i,n),Es.subVectors(s,n),ac.subVectors(e,n);const l=Ms.dot(ac),c=Es.dot(ac);if(l<=0&&c<=0)return t.copy(n);lc.subVectors(e,i);const u=Ms.dot(lc),h=Es.dot(lc);if(u>=0&&h<=u)return t.copy(i);const f=l*h-u*c;if(f<=0&&l>=0&&u<=0)return o=l/(l-u),t.copy(n).addScaledVector(Ms,o);cc.subVectors(e,s);const d=Ms.dot(cc),g=Es.dot(cc);if(g>=0&&d<=g)return t.copy(s);const _=d*c-l*g;if(_<=0&&c>=0&&g<=0)return a=c/(c-g),t.copy(n).addScaledVector(Es,a);const m=u*g-d*h;if(m<=0&&h-u>=0&&d-g>=0)return dh.subVectors(s,i),a=(h-u)/(h-u+(d-g)),t.copy(i).addScaledVector(dh,a);const p=1/(m+_+f);return o=_*p,a=f*p,t.copy(n).addScaledVector(Ms,o).addScaledVector(Es,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const _p={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},rr={h:0,s:0,l:0},Ra={h:0,s:0,l:0};function dc(r,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?r+(e-r)*6*t:t<1/2?e:t<2/3?r+(e-r)*6*(2/3-t):r}let _t=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const i=e;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=ti){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,ft.toWorkingColorSpace(this,t),this}setRGB(e,t,n,i=ft.workingColorSpace){return this.r=e,this.g=t,this.b=n,ft.toWorkingColorSpace(this,i),this}setHSL(e,t,n,i=ft.workingColorSpace){if(e=fg(e,1),t=ot(t,0,1),n=ot(n,0,1),t===0)this.r=this.g=this.b=n;else{const s=n<=.5?n*(1+t):n+t-n*t,o=2*n-s;this.r=dc(o,s,e+1/3),this.g=dc(o,s,e),this.b=dc(o,s,e-1/3)}return ft.toWorkingColorSpace(this,i),this}setStyle(e,t=ti){function n(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const o=i[1],a=i[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=i[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(s,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=ti){const n=_p[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Yi(e.r),this.g=Yi(e.g),this.b=Yi(e.b),this}copyLinearToSRGB(e){return this.r=Ws(e.r),this.g=Ws(e.g),this.b=Ws(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=ti){return ft.fromWorkingColorSpace(an.copy(this),e),Math.round(ot(an.r*255,0,255))*65536+Math.round(ot(an.g*255,0,255))*256+Math.round(ot(an.b*255,0,255))}getHexString(e=ti){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=ft.workingColorSpace){ft.fromWorkingColorSpace(an.copy(this),t);const n=an.r,i=an.g,s=an.b,o=Math.max(n,i,s),a=Math.min(n,i,s);let l,c;const u=(a+o)/2;if(a===o)l=0,c=0;else{const h=o-a;switch(c=u<=.5?h/(o+a):h/(2-o-a),o){case n:l=(i-s)/h+(i<s?6:0);break;case i:l=(s-n)/h+2;break;case s:l=(n-i)/h+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,t=ft.workingColorSpace){return ft.fromWorkingColorSpace(an.copy(this),t),e.r=an.r,e.g=an.g,e.b=an.b,e}getStyle(e=ti){ft.fromWorkingColorSpace(an.copy(this),e);const t=an.r,n=an.g,i=an.b;return e!==ti?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(e,t,n){return this.getHSL(rr),this.setHSL(rr.h+e,rr.s+t,rr.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(rr),e.getHSL(Ra);const n=Zl(rr.h,Ra.h,t),i=Zl(rr.s,Ra.s,t),s=Zl(rr.l,Ra.l,t);return this.setHSL(n,i,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,i=this.b,s=e.elements;return this.r=s[0]*t+s[3]*n+s[6]*i,this.g=s[1]*t+s[4]*n+s[7]*i,this.b=s[2]*t+s[5]*n+s[8]*i,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}};const an=new _t;_t.NAMES=_p;let Pg=0;class kl extends mo{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Pg++}),this.uuid=_a(),this.name="",this.type="Material",this.blending=Vs,this.side=yr,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Gc,this.blendDst=Wc,this.blendEquation=Gr,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new _t(0,0,0),this.blendAlpha=0,this.depthFunc=Qs,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Qf,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ps,this.stencilZFail=ps,this.stencilZPass=ps,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const i=this[t];if(i===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Vs&&(n.blending=this.blending),this.side!==yr&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Gc&&(n.blendSrc=this.blendSrc),this.blendDst!==Wc&&(n.blendDst=this.blendDst),this.blendEquation!==Gr&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Qs&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Qf&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==ps&&(n.stencilFail=this.stencilFail),this.stencilZFail!==ps&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==ps&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(s){const o=[];for(const a in s){const l=s[a];delete l.metadata,o.push(l)}return o}if(t){const s=i(e.textures),o=i(e.images);s.length>0&&(n.textures=s),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const i=t.length;n=new Array(i);for(let s=0;s!==i;++s)n[s]=t[s].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class gp extends kl{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new _t(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ki,this.combine=Qd,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const zt=new Z,Pa=new gt;let Dg=0;class Ci{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Dg++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=eh,this.updateRanges=[],this.gpuType=Vi,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let i=0,s=this.itemSize;i<s;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Pa.fromBufferAttribute(this,t),Pa.applyMatrix3(e),this.setXY(t,Pa.x,Pa.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)zt.fromBufferAttribute(this,t),zt.applyMatrix3(e),this.setXYZ(t,zt.x,zt.y,zt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)zt.fromBufferAttribute(this,t),zt.applyMatrix4(e),this.setXYZ(t,zt.x,zt.y,zt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)zt.fromBufferAttribute(this,t),zt.applyNormalMatrix(e),this.setXYZ(t,zt.x,zt.y,zt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)zt.fromBufferAttribute(this,t),zt.transformDirection(e),this.setXYZ(t,zt.x,zt.y,zt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=vo(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=wn(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=vo(t,this.array)),t}setX(e,t){return this.normalized&&(t=wn(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=vo(t,this.array)),t}setY(e,t){return this.normalized&&(t=wn(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=vo(t,this.array)),t}setZ(e,t){return this.normalized&&(t=wn(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=vo(t,this.array)),t}setW(e,t){return this.normalized&&(t=wn(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=wn(t,this.array),n=wn(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=wn(t,this.array),n=wn(n,this.array),i=wn(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this}setXYZW(e,t,n,i,s){return e*=this.itemSize,this.normalized&&(t=wn(t,this.array),n=wn(n,this.array),i=wn(i,this.array),s=wn(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==eh&&(e.usage=this.usage),e}}class vp extends Ci{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class xp extends Ci{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class Zr extends Ci{constructor(e,t,n){super(new Float32Array(e),t,n)}}let Lg=0;const Qn=new Gt,pc=new Yn,bs=new Z,Bn=new va,Mo=new va,jt=new Z;class us extends mo{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Lg++}),this.uuid=_a(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(hp(e)?xp:vp)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const s=new Ze().getNormalMatrix(e);n.applyNormalMatrix(s),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Qn.makeRotationFromQuaternion(e),this.applyMatrix4(Qn),this}rotateX(e){return Qn.makeRotationX(e),this.applyMatrix4(Qn),this}rotateY(e){return Qn.makeRotationY(e),this.applyMatrix4(Qn),this}rotateZ(e){return Qn.makeRotationZ(e),this.applyMatrix4(Qn),this}translate(e,t,n){return Qn.makeTranslation(e,t,n),this.applyMatrix4(Qn),this}scale(e,t,n){return Qn.makeScale(e,t,n),this.applyMatrix4(Qn),this}lookAt(e){return pc.lookAt(e),pc.updateMatrix(),this.applyMatrix4(pc.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(bs).negate(),this.translate(bs.x,bs.y,bs.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let i=0,s=e.length;i<s;i++){const o=e[i];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new Zr(n,3))}else{const n=Math.min(e.length,t.count);for(let i=0;i<n;i++){const s=e[i];t.setXYZ(i,s.x,s.y,s.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new va);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new Z(-1/0,-1/0,-1/0),new Z(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,i=t.length;n<i;n++){const s=t[n];Bn.setFromBufferAttribute(s),this.morphTargetsRelative?(jt.addVectors(this.boundingBox.min,Bn.min),this.boundingBox.expandByPoint(jt),jt.addVectors(this.boundingBox.max,Bn.max),this.boundingBox.expandByPoint(jt)):(this.boundingBox.expandByPoint(Bn.min),this.boundingBox.expandByPoint(Bn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new gf);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new Z,1/0);return}if(e){const n=this.boundingSphere.center;if(Bn.setFromBufferAttribute(e),t)for(let s=0,o=t.length;s<o;s++){const a=t[s];Mo.setFromBufferAttribute(a),this.morphTargetsRelative?(jt.addVectors(Bn.min,Mo.min),Bn.expandByPoint(jt),jt.addVectors(Bn.max,Mo.max),Bn.expandByPoint(jt)):(Bn.expandByPoint(Mo.min),Bn.expandByPoint(Mo.max))}Bn.getCenter(n);let i=0;for(let s=0,o=e.count;s<o;s++)jt.fromBufferAttribute(e,s),i=Math.max(i,n.distanceToSquared(jt));if(t)for(let s=0,o=t.length;s<o;s++){const a=t[s],l=this.morphTargetsRelative;for(let c=0,u=a.count;c<u;c++)jt.fromBufferAttribute(a,c),l&&(bs.fromBufferAttribute(e,c),jt.add(bs)),i=Math.max(i,n.distanceToSquared(jt))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,i=t.normal,s=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Ci(new Float32Array(4*n.count),4));const o=this.getAttribute("tangent"),a=[],l=[];for(let E=0;E<n.count;E++)a[E]=new Z,l[E]=new Z;const c=new Z,u=new Z,h=new Z,f=new gt,d=new gt,g=new gt,_=new Z,m=new Z;function p(E,x,S){c.fromBufferAttribute(n,E),u.fromBufferAttribute(n,x),h.fromBufferAttribute(n,S),f.fromBufferAttribute(s,E),d.fromBufferAttribute(s,x),g.fromBufferAttribute(s,S),u.sub(c),h.sub(c),d.sub(f),g.sub(f);const P=1/(d.x*g.y-g.x*d.y);isFinite(P)&&(_.copy(u).multiplyScalar(g.y).addScaledVector(h,-d.y).multiplyScalar(P),m.copy(h).multiplyScalar(d.x).addScaledVector(u,-g.x).multiplyScalar(P),a[E].add(_),a[x].add(_),a[S].add(_),l[E].add(m),l[x].add(m),l[S].add(m))}let M=this.groups;M.length===0&&(M=[{start:0,count:e.count}]);for(let E=0,x=M.length;E<x;++E){const S=M[E],P=S.start,I=S.count;for(let O=P,q=P+I;O<q;O+=3)p(e.getX(O+0),e.getX(O+1),e.getX(O+2))}const y=new Z,v=new Z,A=new Z,C=new Z;function w(E){A.fromBufferAttribute(i,E),C.copy(A);const x=a[E];y.copy(x),y.sub(A.multiplyScalar(A.dot(x))).normalize(),v.crossVectors(C,x);const P=v.dot(l[E])<0?-1:1;o.setXYZW(E,y.x,y.y,y.z,P)}for(let E=0,x=M.length;E<x;++E){const S=M[E],P=S.start,I=S.count;for(let O=P,q=P+I;O<q;O+=3)w(e.getX(O+0)),w(e.getX(O+1)),w(e.getX(O+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Ci(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let f=0,d=n.count;f<d;f++)n.setXYZ(f,0,0,0);const i=new Z,s=new Z,o=new Z,a=new Z,l=new Z,c=new Z,u=new Z,h=new Z;if(e)for(let f=0,d=e.count;f<d;f+=3){const g=e.getX(f+0),_=e.getX(f+1),m=e.getX(f+2);i.fromBufferAttribute(t,g),s.fromBufferAttribute(t,_),o.fromBufferAttribute(t,m),u.subVectors(o,s),h.subVectors(i,s),u.cross(h),a.fromBufferAttribute(n,g),l.fromBufferAttribute(n,_),c.fromBufferAttribute(n,m),a.add(u),l.add(u),c.add(u),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(_,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let f=0,d=t.count;f<d;f+=3)i.fromBufferAttribute(t,f+0),s.fromBufferAttribute(t,f+1),o.fromBufferAttribute(t,f+2),u.subVectors(o,s),h.subVectors(i,s),u.cross(h),n.setXYZ(f+0,u.x,u.y,u.z),n.setXYZ(f+1,u.x,u.y,u.z),n.setXYZ(f+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)jt.fromBufferAttribute(e,t),jt.normalize(),e.setXYZ(t,jt.x,jt.y,jt.z)}toNonIndexed(){function e(a,l){const c=a.array,u=a.itemSize,h=a.normalized,f=new c.constructor(l.length*u);let d=0,g=0;for(let _=0,m=l.length;_<m;_++){a.isInterleavedBufferAttribute?d=l[_]*a.data.stride+a.offset:d=l[_]*u;for(let p=0;p<u;p++)f[g++]=c[d++]}return new Ci(f,u,h)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new us,n=this.index.array,i=this.attributes;for(const a in i){const l=i[a],c=e(l,n);t.setAttribute(a,c)}const s=this.morphAttributes;for(const a in s){const l=[],c=s[a];for(let u=0,h=c.length;u<h;u++){const f=c[u],d=e(f,n);l.push(d)}t.morphAttributes[a]=l}t.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const l in n){const c=n[l];e.data.attributes[l]=c.toJSON(e.data)}const i={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let h=0,f=c.length;h<f;h++){const d=c[h];u.push(d.toJSON(e.data))}u.length>0&&(i[l]=u,s=!0)}s&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone(t));const i=e.attributes;for(const c in i){const u=i[c];this.setAttribute(c,u.clone(t))}const s=e.morphAttributes;for(const c in s){const u=[],h=s[c];for(let f=0,d=h.length;f<d;f++)u.push(h[f].clone(t));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let c=0,u=o.length;c<u;c++){const h=o[c];this.addGroup(h.start,h.count,h.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const ph=new Gt,Lr=new Eg,Da=new gf,mh=new Z,La=new Z,Ua=new Z,Ia=new Z,mc=new Z,Na=new Z,_h=new Z,Fa=new Z;class Ti extends Yn{constructor(e=new us,t=new gp){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=i.length;s<o;s++){const a=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(e,t){const n=this.geometry,i=n.attributes.position,s=n.morphAttributes.position,o=n.morphTargetsRelative;t.fromBufferAttribute(i,e);const a=this.morphTargetInfluences;if(s&&a){Na.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const u=a[l],h=s[l];u!==0&&(mc.fromBufferAttribute(h,e),o?Na.addScaledVector(mc,u):Na.addScaledVector(mc.sub(t),u))}t.add(Na)}return t}raycast(e,t){const n=this.geometry,i=this.material,s=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Da.copy(n.boundingSphere),Da.applyMatrix4(s),Lr.copy(e.ray).recast(e.near),!(Da.containsPoint(Lr.origin)===!1&&(Lr.intersectSphere(Da,mh)===null||Lr.origin.distanceToSquared(mh)>(e.far-e.near)**2))&&(ph.copy(s).invert(),Lr.copy(e.ray).applyMatrix4(ph),!(n.boundingBox!==null&&Lr.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Lr)))}_computeIntersections(e,t,n){let i;const s=this.geometry,o=this.material,a=s.index,l=s.attributes.position,c=s.attributes.uv,u=s.attributes.uv1,h=s.attributes.normal,f=s.groups,d=s.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,_=f.length;g<_;g++){const m=f[g],p=o[m.materialIndex],M=Math.max(m.start,d.start),y=Math.min(a.count,Math.min(m.start+m.count,d.start+d.count));for(let v=M,A=y;v<A;v+=3){const C=a.getX(v),w=a.getX(v+1),E=a.getX(v+2);i=Oa(this,p,e,n,c,u,h,C,w,E),i&&(i.faceIndex=Math.floor(v/3),i.face.materialIndex=m.materialIndex,t.push(i))}}else{const g=Math.max(0,d.start),_=Math.min(a.count,d.start+d.count);for(let m=g,p=_;m<p;m+=3){const M=a.getX(m),y=a.getX(m+1),v=a.getX(m+2);i=Oa(this,o,e,n,c,u,h,M,y,v),i&&(i.faceIndex=Math.floor(m/3),t.push(i))}}else if(l!==void 0)if(Array.isArray(o))for(let g=0,_=f.length;g<_;g++){const m=f[g],p=o[m.materialIndex],M=Math.max(m.start,d.start),y=Math.min(l.count,Math.min(m.start+m.count,d.start+d.count));for(let v=M,A=y;v<A;v+=3){const C=v,w=v+1,E=v+2;i=Oa(this,p,e,n,c,u,h,C,w,E),i&&(i.faceIndex=Math.floor(v/3),i.face.materialIndex=m.materialIndex,t.push(i))}}else{const g=Math.max(0,d.start),_=Math.min(l.count,d.start+d.count);for(let m=g,p=_;m<p;m+=3){const M=m,y=m+1,v=m+2;i=Oa(this,o,e,n,c,u,h,M,y,v),i&&(i.faceIndex=Math.floor(m/3),t.push(i))}}}}function Ug(r,e,t,n,i,s,o,a){let l;if(e.side===Cn?l=n.intersectTriangle(o,s,i,!0,a):l=n.intersectTriangle(i,s,o,e.side===yr,a),l===null)return null;Fa.copy(a),Fa.applyMatrix4(r.matrixWorld);const c=t.ray.origin.distanceTo(Fa);return c<t.near||c>t.far?null:{distance:c,point:Fa.clone(),object:r}}function Oa(r,e,t,n,i,s,o,a,l,c){r.getVertexPosition(a,La),r.getVertexPosition(l,Ua),r.getVertexPosition(c,Ia);const u=Ug(r,e,t,n,La,Ua,Ia,_h);if(u){const h=new Z;hi.getBarycoord(_h,La,Ua,Ia,h),i&&(u.uv=hi.getInterpolatedAttribute(i,a,l,c,h,new gt)),s&&(u.uv1=hi.getInterpolatedAttribute(s,a,l,c,h,new gt)),o&&(u.normal=hi.getInterpolatedAttribute(o,a,l,c,h,new Z),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));const f={a,b:l,c,normal:new Z,materialIndex:0};hi.getNormal(La,Ua,Ia,f.normal),u.face=f,u.barycoord=h}return u}class xa extends us{constructor(e=1,t=1,n=1,i=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:i,heightSegments:s,depthSegments:o};const a=this;i=Math.floor(i),s=Math.floor(s),o=Math.floor(o);const l=[],c=[],u=[],h=[];let f=0,d=0;g("z","y","x",-1,-1,n,t,e,o,s,0),g("z","y","x",1,-1,n,t,-e,o,s,1),g("x","z","y",1,1,e,n,t,i,o,2),g("x","z","y",1,-1,e,n,-t,i,o,3),g("x","y","z",1,-1,e,t,n,i,s,4),g("x","y","z",-1,-1,e,t,-n,i,s,5),this.setIndex(l),this.setAttribute("position",new Zr(c,3)),this.setAttribute("normal",new Zr(u,3)),this.setAttribute("uv",new Zr(h,2));function g(_,m,p,M,y,v,A,C,w,E,x){const S=v/w,P=A/E,I=v/2,O=A/2,q=C/2,W=w+1,V=E+1;let X=0,z=0;const re=new Z;for(let D=0;D<V;D++){const ae=D*P-O;for(let Le=0;Le<W;Le++){const ke=Le*S-I;re[_]=ke*M,re[m]=ae*y,re[p]=q,c.push(re.x,re.y,re.z),re[_]=0,re[m]=0,re[p]=C>0?1:-1,u.push(re.x,re.y,re.z),h.push(Le/w),h.push(1-D/E),X+=1}}for(let D=0;D<E;D++)for(let ae=0;ae<w;ae++){const Le=f+ae+W*D,ke=f+ae+W*(D+1),$=f+(ae+1)+W*(D+1),ne=f+(ae+1)+W*D;l.push(Le,ke,ne),l.push(ke,$,ne),z+=6}a.addGroup(d,z,x),d+=z,f+=X}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new xa(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function so(r){const e={};for(const t in r){e[t]={};for(const n in r[t]){const i=r[t][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=i.clone():Array.isArray(i)?e[t][n]=i.slice():e[t][n]=i}}return e}function xn(r){const e={};for(let t=0;t<r.length;t++){const n=so(r[t]);for(const i in n)e[i]=n[i]}return e}function Ig(r){const e=[];for(let t=0;t<r.length;t++)e.push(r[t].clone());return e}function Sp(r){const e=r.getRenderTarget();return e===null?r.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:ft.workingColorSpace}const Ng={clone:so,merge:xn};var Fg=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Og=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Zi extends kl{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Fg,this.fragmentShader=Og,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=so(e.uniforms),this.uniformsGroups=Ig(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const i in this.uniforms){const o=this.uniforms[i].value;o&&o.isTexture?t.uniforms[i]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[i]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[i]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[i]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[i]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[i]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[i]={type:"m4",value:o.toArray()}:t.uniforms[i]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class yp extends Yn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Gt,this.projectionMatrix=new Gt,this.projectionMatrixInverse=new Gt,this.coordinateSystem=Gi}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const sr=new Z,gh=new gt,vh=new gt;class fi extends yp{constructor(e=50,t=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Cu*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Kl*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Cu*2*Math.atan(Math.tan(Kl*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){sr.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(sr.x,sr.y).multiplyScalar(-e/sr.z),sr.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(sr.x,sr.y).multiplyScalar(-e/sr.z)}getViewSize(e,t){return this.getViewBounds(e,gh,vh),t.subVectors(vh,gh)}setViewOffset(e,t,n,i,s,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Kl*.5*this.fov)/this.zoom,n=2*t,i=this.aspect*n,s=-.5*i;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;s+=o.offsetX*i/l,t-=o.offsetY*n/c,i*=o.width/l,n*=o.height/c}const a=this.filmOffset;a!==0&&(s+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+i,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const Ts=-90,ws=1;class Bg extends Yn{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const i=new fi(Ts,ws,e,t);i.layers=this.layers,this.add(i);const s=new fi(Ts,ws,e,t);s.layers=this.layers,this.add(s);const o=new fi(Ts,ws,e,t);o.layers=this.layers,this.add(o);const a=new fi(Ts,ws,e,t);a.layers=this.layers,this.add(a);const l=new fi(Ts,ws,e,t);l.layers=this.layers,this.add(l);const c=new fi(Ts,ws,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,i,s,o,a,l]=t;for(const c of t)this.remove(c);if(e===Gi)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===El)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,o,a,l,c,u]=this.children,h=e.getRenderTarget(),f=e.getActiveCubeFace(),d=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,i),e.render(t,s),e.setRenderTarget(n,1,i),e.render(t,o),e.setRenderTarget(n,2,i),e.render(t,a),e.setRenderTarget(n,3,i),e.render(t,l),e.setRenderTarget(n,4,i),e.render(t,c),n.texture.generateMipmaps=_,e.setRenderTarget(n,5,i),e.render(t,u),e.setRenderTarget(h,f,d),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class Mp extends Rn{constructor(e,t,n,i,s,o,a,l,c,u){e=e!==void 0?e:[],t=t!==void 0?t:eo,super(e,t,n,i,s,o,a,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class zg extends ss{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},i=[n,n,n,n,n,n];this.texture=new Mp(i,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:bi}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},i=new xa(5,5,5),s=new Zi({name:"CubemapFromEquirect",uniforms:so(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Cn,blending:mr});s.uniforms.tEquirect.value=t;const o=new Ti(i,s),a=t.minFilter;return t.minFilter===Yr&&(t.minFilter=bi),new Bg(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t,n,i){const s=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,n,i);e.setRenderTarget(s)}}class Ba extends Yn{constructor(){super(),this.isGroup=!0,this.type="Group"}}const kg={type:"move"};class _c{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ba,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ba,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new Z,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new Z),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ba,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new Z,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new Z),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let i=null,s=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){o=!0;for(const _ of e.hand.values()){const m=t.getJointPose(_,n),p=this._getHandJoint(c,_);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const u=c.joints["index-finger-tip"],h=c.joints["thumb-tip"],f=u.position.distanceTo(h.position),d=.02,g=.005;c.inputState.pinching&&f>d+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&f<=d-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,n),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(i=t.getPose(e.targetRaySpace,n),i===null&&s!==null&&(i=s),i!==null&&(a.matrix.fromArray(i.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,i.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(i.linearVelocity)):a.hasLinearVelocity=!1,i.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(i.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(kg)))}return a!==null&&(a.visible=i!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new Ba;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}class Hg extends Yn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Ki,this.environmentIntensity=1,this.environmentRotation=new Ki,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}const gc=new Z,Vg=new Z,Gg=new Ze;class Br{constructor(e=new Z(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,i){return this.normal.set(e,t,n),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const i=gc.subVectors(n,t).cross(Vg.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(gc),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/i;return s<0||s>1?null:t.copy(e.start).addScaledVector(n,s)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||Gg.getNormalMatrix(e),i=this.coplanarPoint(gc).applyMatrix4(e),s=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Ur=new gf,za=new Z;class Ep{constructor(e=new Br,t=new Br,n=new Br,i=new Br,s=new Br,o=new Br){this.planes=[e,t,n,i,s,o]}set(e,t,n,i,s,o){const a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(n),a[3].copy(i),a[4].copy(s),a[5].copy(o),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Gi){const n=this.planes,i=e.elements,s=i[0],o=i[1],a=i[2],l=i[3],c=i[4],u=i[5],h=i[6],f=i[7],d=i[8],g=i[9],_=i[10],m=i[11],p=i[12],M=i[13],y=i[14],v=i[15];if(n[0].setComponents(l-s,f-c,m-d,v-p).normalize(),n[1].setComponents(l+s,f+c,m+d,v+p).normalize(),n[2].setComponents(l+o,f+u,m+g,v+M).normalize(),n[3].setComponents(l-o,f-u,m-g,v-M).normalize(),n[4].setComponents(l-a,f-h,m-_,v-y).normalize(),t===Gi)n[5].setComponents(l+a,f+h,m+_,v+y).normalize();else if(t===El)n[5].setComponents(a,h,_,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Ur.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Ur.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Ur)}intersectsSprite(e){return Ur.center.set(0,0,0),Ur.radius=.7071067811865476,Ur.applyMatrix4(e.matrixWorld),this.intersectsSphere(Ur)}intersectsSphere(e){const t=this.planes,n=e.center,i=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(n)<i)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const i=t[n];if(za.x=i.normal.x>0?e.max.x:e.min.x,za.y=i.normal.y>0?e.max.y:e.min.y,za.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint(za)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class bp extends Rn{constructor(e,t,n,i,s,o,a,l,c,u=Gs){if(u!==Gs&&u!==io)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&u===Gs&&(n=rs),n===void 0&&u===io&&(n=no),super(null,i,s,o,a,l,u,n,c),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=a!==void 0?a:mi,this.minFilter=l!==void 0?l:mi,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class oo extends us{constructor(e=1,t=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:i};const s=e/2,o=t/2,a=Math.floor(n),l=Math.floor(i),c=a+1,u=l+1,h=e/a,f=t/l,d=[],g=[],_=[],m=[];for(let p=0;p<u;p++){const M=p*f-o;for(let y=0;y<c;y++){const v=y*h-s;g.push(v,-M,0),_.push(0,0,1),m.push(y/a),m.push(1-p/l)}}for(let p=0;p<l;p++)for(let M=0;M<a;M++){const y=M+c*p,v=M+c*(p+1),A=M+1+c*(p+1),C=M+1+c*p;d.push(y,v,C),d.push(v,A,C)}this.setIndex(d),this.setAttribute("position",new Zr(g,3)),this.setAttribute("normal",new Zr(_,3)),this.setAttribute("uv",new Zr(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new oo(e.width,e.height,e.widthSegments,e.heightSegments)}}class Wg extends kl{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=eg,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Xg extends kl{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class Tp extends yp{constructor(e=-1,t=1,n=1,i=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=i,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,i,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let s=n-e,o=n+e,a=i+t,l=i-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,o=s+c*this.view.width,a-=u*this.view.offsetY,l=a-u*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class Yg extends fi{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e,this.index=0}}function xh(r,e,t,n){const i=qg(n);switch(t){case rp:return r*e;case op:return r*e;case ap:return r*e*2;case lp:return r*e/i.components*i.byteLength;case pf:return r*e/i.components*i.byteLength;case cp:return r*e*2/i.components*i.byteLength;case mf:return r*e*2/i.components*i.byteLength;case sp:return r*e*3/i.components*i.byteLength;case pi:return r*e*4/i.components*i.byteLength;case _f:return r*e*4/i.components*i.byteLength;case al:case ll:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*8;case cl:case ul:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case iu:case su:return Math.max(r,16)*Math.max(e,8)/4;case nu:case ru:return Math.max(r,8)*Math.max(e,8)/2;case ou:case au:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*8;case lu:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case cu:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case uu:return Math.floor((r+4)/5)*Math.floor((e+3)/4)*16;case fu:return Math.floor((r+4)/5)*Math.floor((e+4)/5)*16;case hu:return Math.floor((r+5)/6)*Math.floor((e+4)/5)*16;case du:return Math.floor((r+5)/6)*Math.floor((e+5)/6)*16;case pu:return Math.floor((r+7)/8)*Math.floor((e+4)/5)*16;case mu:return Math.floor((r+7)/8)*Math.floor((e+5)/6)*16;case _u:return Math.floor((r+7)/8)*Math.floor((e+7)/8)*16;case gu:return Math.floor((r+9)/10)*Math.floor((e+4)/5)*16;case vu:return Math.floor((r+9)/10)*Math.floor((e+5)/6)*16;case xu:return Math.floor((r+9)/10)*Math.floor((e+7)/8)*16;case Su:return Math.floor((r+9)/10)*Math.floor((e+9)/10)*16;case yu:return Math.floor((r+11)/12)*Math.floor((e+9)/10)*16;case Mu:return Math.floor((r+11)/12)*Math.floor((e+11)/12)*16;case fl:case Eu:case bu:return Math.ceil(r/4)*Math.ceil(e/4)*16;case up:case Tu:return Math.ceil(r/4)*Math.ceil(e/4)*8;case wu:case Au:return Math.ceil(r/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function qg(r){switch(r){case $i:case tp:return{byteLength:1,components:1};case ia:case np:case ma:return{byteLength:2,components:1};case hf:case df:return{byteLength:2,components:4};case rs:case ff:case Vi:return{byteLength:4,components:1};case ip:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${r}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:uf}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=uf);/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function wp(){let r=null,e=!1,t=null,n=null;function i(s,o){t(s,o),n=r.requestAnimationFrame(i)}return{start:function(){e!==!0&&t!==null&&(n=r.requestAnimationFrame(i),e=!0)},stop:function(){r.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){r=s}}}function $g(r){const e=new WeakMap;function t(a,l){const c=a.array,u=a.usage,h=c.byteLength,f=r.createBuffer();r.bindBuffer(l,f),r.bufferData(l,c,u),a.onUploadCallback();let d;if(c instanceof Float32Array)d=r.FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?d=r.HALF_FLOAT:d=r.UNSIGNED_SHORT;else if(c instanceof Int16Array)d=r.SHORT;else if(c instanceof Uint32Array)d=r.UNSIGNED_INT;else if(c instanceof Int32Array)d=r.INT;else if(c instanceof Int8Array)d=r.BYTE;else if(c instanceof Uint8Array)d=r.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)d=r.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:f,type:d,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:h}}function n(a,l,c){const u=l.array,h=l.updateRanges;if(r.bindBuffer(c,a),h.length===0)r.bufferSubData(c,0,u);else{h.sort((d,g)=>d.start-g.start);let f=0;for(let d=1;d<h.length;d++){const g=h[f],_=h[d];_.start<=g.start+g.count+1?g.count=Math.max(g.count,_.start+_.count-g.start):(++f,h[f]=_)}h.length=f+1;for(let d=0,g=h.length;d<g;d++){const _=h[d];r.bufferSubData(c,_.start*u.BYTES_PER_ELEMENT,u,_.start,_.count)}l.clearUpdateRanges()}l.onUploadCallback()}function i(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function s(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=e.get(a);l&&(r.deleteBuffer(l.buffer),e.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const u=e.get(a);(!u||u.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const c=e.get(a);if(c===void 0)e.set(a,t(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,a,l),c.version=a.version}}return{get:i,remove:s,update:o}}var Kg=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Zg=`#ifdef USE_ALPHAHASH
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
#endif`,jg=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Jg=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Qg=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,e0=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,t0=`#ifdef USE_AOMAP
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
#endif`,n0=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,i0=`#ifdef USE_BATCHING
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
#endif`,r0=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,s0=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,o0=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,a0=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,l0=`#ifdef USE_IRIDESCENCE
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
#endif`,c0=`#ifdef USE_BUMPMAP
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
#endif`,u0=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,f0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,h0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,d0=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,p0=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,m0=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,_0=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,g0=`#if defined( USE_COLOR_ALPHA )
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
#endif`,v0=`#define PI 3.141592653589793
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
} // validated`,x0=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,S0=`vec3 transformedNormal = objectNormal;
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
#endif`,y0=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,M0=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,E0=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,b0=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,T0="gl_FragColor = linearToOutputTexel( gl_FragColor );",w0=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,A0=`#ifdef USE_ENVMAP
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
#endif`,C0=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,R0=`#ifdef USE_ENVMAP
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
#endif`,P0=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,D0=`#ifdef USE_ENVMAP
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
#endif`,L0=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,U0=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,I0=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,N0=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,F0=`#ifdef USE_GRADIENTMAP
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
}`,O0=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,B0=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,z0=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,k0=`uniform bool receiveShadow;
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
#endif`,H0=`#ifdef USE_ENVMAP
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
#endif`,V0=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,G0=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,W0=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,X0=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Y0=`PhysicalMaterial material;
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
#endif`,q0=`struct PhysicalMaterial {
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
}`,$0=`
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
#endif`,K0=`#if defined( RE_IndirectDiffuse )
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
#endif`,Z0=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,j0=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,J0=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Q0=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,ev=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,tv=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,nv=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,iv=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,rv=`#if defined( USE_POINTS_UV )
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
#endif`,sv=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,ov=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,av=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,lv=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,cv=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,uv=`#ifdef USE_MORPHTARGETS
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
#endif`,fv=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,hv=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,dv=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,pv=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,mv=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,_v=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,gv=`#ifdef USE_NORMALMAP
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
#endif`,vv=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,xv=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Sv=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,yv=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Mv=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Ev=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,bv=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Tv=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,wv=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Av=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Cv=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Rv=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Pv=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Dv=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Lv=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Uv=`float getShadowMask() {
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
}`,Iv=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Nv=`#ifdef USE_SKINNING
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
#endif`,Fv=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Ov=`#ifdef USE_SKINNING
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
#endif`,Bv=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,zv=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,kv=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Hv=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Vv=`#ifdef USE_TRANSMISSION
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
#endif`,Gv=`#ifdef USE_TRANSMISSION
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
#endif`,Wv=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Xv=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Yv=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,qv=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const $v=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Kv=`uniform sampler2D t2D;
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
}`,Zv=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,jv=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Jv=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Qv=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,ex=`#include <common>
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
}`,tx=`#if DEPTH_PACKING == 3200
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
}`,nx=`#define DISTANCE
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
}`,ix=`#define DISTANCE
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
}`,rx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,sx=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,ox=`uniform float scale;
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
}`,ax=`uniform vec3 diffuse;
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
}`,lx=`#include <common>
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
}`,cx=`uniform vec3 diffuse;
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
}`,ux=`#define LAMBERT
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
}`,fx=`#define LAMBERT
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
}`,hx=`#define MATCAP
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
}`,dx=`#define MATCAP
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
}`,px=`#define NORMAL
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
}`,mx=`#define NORMAL
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
}`,_x=`#define PHONG
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
}`,gx=`#define PHONG
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
}`,vx=`#define STANDARD
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
}`,xx=`#define STANDARD
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
}`,Sx=`#define TOON
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
}`,yx=`#define TOON
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
}`,Mx=`uniform float size;
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
}`,Ex=`uniform vec3 diffuse;
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
}`,bx=`#include <common>
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
}`,Tx=`uniform vec3 color;
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
}`,wx=`uniform float rotation;
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
}`,Ax=`uniform vec3 diffuse;
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
}`,je={alphahash_fragment:Kg,alphahash_pars_fragment:Zg,alphamap_fragment:jg,alphamap_pars_fragment:Jg,alphatest_fragment:Qg,alphatest_pars_fragment:e0,aomap_fragment:t0,aomap_pars_fragment:n0,batching_pars_vertex:i0,batching_vertex:r0,begin_vertex:s0,beginnormal_vertex:o0,bsdfs:a0,iridescence_fragment:l0,bumpmap_pars_fragment:c0,clipping_planes_fragment:u0,clipping_planes_pars_fragment:f0,clipping_planes_pars_vertex:h0,clipping_planes_vertex:d0,color_fragment:p0,color_pars_fragment:m0,color_pars_vertex:_0,color_vertex:g0,common:v0,cube_uv_reflection_fragment:x0,defaultnormal_vertex:S0,displacementmap_pars_vertex:y0,displacementmap_vertex:M0,emissivemap_fragment:E0,emissivemap_pars_fragment:b0,colorspace_fragment:T0,colorspace_pars_fragment:w0,envmap_fragment:A0,envmap_common_pars_fragment:C0,envmap_pars_fragment:R0,envmap_pars_vertex:P0,envmap_physical_pars_fragment:H0,envmap_vertex:D0,fog_vertex:L0,fog_pars_vertex:U0,fog_fragment:I0,fog_pars_fragment:N0,gradientmap_pars_fragment:F0,lightmap_pars_fragment:O0,lights_lambert_fragment:B0,lights_lambert_pars_fragment:z0,lights_pars_begin:k0,lights_toon_fragment:V0,lights_toon_pars_fragment:G0,lights_phong_fragment:W0,lights_phong_pars_fragment:X0,lights_physical_fragment:Y0,lights_physical_pars_fragment:q0,lights_fragment_begin:$0,lights_fragment_maps:K0,lights_fragment_end:Z0,logdepthbuf_fragment:j0,logdepthbuf_pars_fragment:J0,logdepthbuf_pars_vertex:Q0,logdepthbuf_vertex:ev,map_fragment:tv,map_pars_fragment:nv,map_particle_fragment:iv,map_particle_pars_fragment:rv,metalnessmap_fragment:sv,metalnessmap_pars_fragment:ov,morphinstance_vertex:av,morphcolor_vertex:lv,morphnormal_vertex:cv,morphtarget_pars_vertex:uv,morphtarget_vertex:fv,normal_fragment_begin:hv,normal_fragment_maps:dv,normal_pars_fragment:pv,normal_pars_vertex:mv,normal_vertex:_v,normalmap_pars_fragment:gv,clearcoat_normal_fragment_begin:vv,clearcoat_normal_fragment_maps:xv,clearcoat_pars_fragment:Sv,iridescence_pars_fragment:yv,opaque_fragment:Mv,packing:Ev,premultiplied_alpha_fragment:bv,project_vertex:Tv,dithering_fragment:wv,dithering_pars_fragment:Av,roughnessmap_fragment:Cv,roughnessmap_pars_fragment:Rv,shadowmap_pars_fragment:Pv,shadowmap_pars_vertex:Dv,shadowmap_vertex:Lv,shadowmask_pars_fragment:Uv,skinbase_vertex:Iv,skinning_pars_vertex:Nv,skinning_vertex:Fv,skinnormal_vertex:Ov,specularmap_fragment:Bv,specularmap_pars_fragment:zv,tonemapping_fragment:kv,tonemapping_pars_fragment:Hv,transmission_fragment:Vv,transmission_pars_fragment:Gv,uv_pars_fragment:Wv,uv_pars_vertex:Xv,uv_vertex:Yv,worldpos_vertex:qv,background_vert:$v,background_frag:Kv,backgroundCube_vert:Zv,backgroundCube_frag:jv,cube_vert:Jv,cube_frag:Qv,depth_vert:ex,depth_frag:tx,distanceRGBA_vert:nx,distanceRGBA_frag:ix,equirect_vert:rx,equirect_frag:sx,linedashed_vert:ox,linedashed_frag:ax,meshbasic_vert:lx,meshbasic_frag:cx,meshlambert_vert:ux,meshlambert_frag:fx,meshmatcap_vert:hx,meshmatcap_frag:dx,meshnormal_vert:px,meshnormal_frag:mx,meshphong_vert:_x,meshphong_frag:gx,meshphysical_vert:vx,meshphysical_frag:xx,meshtoon_vert:Sx,meshtoon_frag:yx,points_vert:Mx,points_frag:Ex,shadow_vert:bx,shadow_frag:Tx,sprite_vert:wx,sprite_frag:Ax},ve={common:{diffuse:{value:new _t(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ze},alphaMap:{value:null},alphaMapTransform:{value:new Ze},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ze}},envmap:{envMap:{value:null},envMapRotation:{value:new Ze},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ze}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ze}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ze},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ze},normalScale:{value:new gt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ze},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ze}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ze}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ze}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new _t(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new _t(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ze},alphaTest:{value:0},uvTransform:{value:new Ze}},sprite:{diffuse:{value:new _t(16777215)},opacity:{value:1},center:{value:new gt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ze},alphaMap:{value:null},alphaMapTransform:{value:new Ze},alphaTest:{value:0}}},yi={basic:{uniforms:xn([ve.common,ve.specularmap,ve.envmap,ve.aomap,ve.lightmap,ve.fog]),vertexShader:je.meshbasic_vert,fragmentShader:je.meshbasic_frag},lambert:{uniforms:xn([ve.common,ve.specularmap,ve.envmap,ve.aomap,ve.lightmap,ve.emissivemap,ve.bumpmap,ve.normalmap,ve.displacementmap,ve.fog,ve.lights,{emissive:{value:new _t(0)}}]),vertexShader:je.meshlambert_vert,fragmentShader:je.meshlambert_frag},phong:{uniforms:xn([ve.common,ve.specularmap,ve.envmap,ve.aomap,ve.lightmap,ve.emissivemap,ve.bumpmap,ve.normalmap,ve.displacementmap,ve.fog,ve.lights,{emissive:{value:new _t(0)},specular:{value:new _t(1118481)},shininess:{value:30}}]),vertexShader:je.meshphong_vert,fragmentShader:je.meshphong_frag},standard:{uniforms:xn([ve.common,ve.envmap,ve.aomap,ve.lightmap,ve.emissivemap,ve.bumpmap,ve.normalmap,ve.displacementmap,ve.roughnessmap,ve.metalnessmap,ve.fog,ve.lights,{emissive:{value:new _t(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:je.meshphysical_vert,fragmentShader:je.meshphysical_frag},toon:{uniforms:xn([ve.common,ve.aomap,ve.lightmap,ve.emissivemap,ve.bumpmap,ve.normalmap,ve.displacementmap,ve.gradientmap,ve.fog,ve.lights,{emissive:{value:new _t(0)}}]),vertexShader:je.meshtoon_vert,fragmentShader:je.meshtoon_frag},matcap:{uniforms:xn([ve.common,ve.bumpmap,ve.normalmap,ve.displacementmap,ve.fog,{matcap:{value:null}}]),vertexShader:je.meshmatcap_vert,fragmentShader:je.meshmatcap_frag},points:{uniforms:xn([ve.points,ve.fog]),vertexShader:je.points_vert,fragmentShader:je.points_frag},dashed:{uniforms:xn([ve.common,ve.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:je.linedashed_vert,fragmentShader:je.linedashed_frag},depth:{uniforms:xn([ve.common,ve.displacementmap]),vertexShader:je.depth_vert,fragmentShader:je.depth_frag},normal:{uniforms:xn([ve.common,ve.bumpmap,ve.normalmap,ve.displacementmap,{opacity:{value:1}}]),vertexShader:je.meshnormal_vert,fragmentShader:je.meshnormal_frag},sprite:{uniforms:xn([ve.sprite,ve.fog]),vertexShader:je.sprite_vert,fragmentShader:je.sprite_frag},background:{uniforms:{uvTransform:{value:new Ze},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:je.background_vert,fragmentShader:je.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ze}},vertexShader:je.backgroundCube_vert,fragmentShader:je.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:je.cube_vert,fragmentShader:je.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:je.equirect_vert,fragmentShader:je.equirect_frag},distanceRGBA:{uniforms:xn([ve.common,ve.displacementmap,{referencePosition:{value:new Z},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:je.distanceRGBA_vert,fragmentShader:je.distanceRGBA_frag},shadow:{uniforms:xn([ve.lights,ve.fog,{color:{value:new _t(0)},opacity:{value:1}}]),vertexShader:je.shadow_vert,fragmentShader:je.shadow_frag}};yi.physical={uniforms:xn([yi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ze},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ze},clearcoatNormalScale:{value:new gt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ze},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ze},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ze},sheen:{value:0},sheenColor:{value:new _t(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ze},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ze},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ze},transmissionSamplerSize:{value:new gt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ze},attenuationDistance:{value:0},attenuationColor:{value:new _t(0)},specularColor:{value:new _t(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ze},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ze},anisotropyVector:{value:new gt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ze}}]),vertexShader:je.meshphysical_vert,fragmentShader:je.meshphysical_frag};const ka={r:0,b:0,g:0},Ir=new Ki,Cx=new Gt;function Rx(r,e,t,n,i,s,o){const a=new _t(0);let l=s===!0?0:1,c,u,h=null,f=0,d=null;function g(y){let v=y.isScene===!0?y.background:null;return v&&v.isTexture&&(v=(y.backgroundBlurriness>0?t:e).get(v)),v}function _(y){let v=!1;const A=g(y);A===null?p(a,l):A&&A.isColor&&(p(A,1),v=!0);const C=r.xr.getEnvironmentBlendMode();C==="additive"?n.buffers.color.setClear(0,0,0,1,o):C==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(r.autoClear||v)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil))}function m(y,v){const A=g(v);A&&(A.isCubeTexture||A.mapping===zl)?(u===void 0&&(u=new Ti(new xa(1,1,1),new Zi({name:"BackgroundCubeMaterial",uniforms:so(yi.backgroundCube.uniforms),vertexShader:yi.backgroundCube.vertexShader,fragmentShader:yi.backgroundCube.fragmentShader,side:Cn,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(C,w,E){this.matrixWorld.copyPosition(E.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(u)),Ir.copy(v.backgroundRotation),Ir.x*=-1,Ir.y*=-1,Ir.z*=-1,A.isCubeTexture&&A.isRenderTargetTexture===!1&&(Ir.y*=-1,Ir.z*=-1),u.material.uniforms.envMap.value=A,u.material.uniforms.flipEnvMap.value=A.isCubeTexture&&A.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=v.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(Cx.makeRotationFromEuler(Ir)),u.material.toneMapped=ft.getTransfer(A.colorSpace)!==vt,(h!==A||f!==A.version||d!==r.toneMapping)&&(u.material.needsUpdate=!0,h=A,f=A.version,d=r.toneMapping),u.layers.enableAll(),y.unshift(u,u.geometry,u.material,0,0,null)):A&&A.isTexture&&(c===void 0&&(c=new Ti(new oo(2,2),new Zi({name:"BackgroundMaterial",uniforms:so(yi.background.uniforms),vertexShader:yi.background.vertexShader,fragmentShader:yi.background.fragmentShader,side:yr,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=A,c.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,c.material.toneMapped=ft.getTransfer(A.colorSpace)!==vt,A.matrixAutoUpdate===!0&&A.updateMatrix(),c.material.uniforms.uvTransform.value.copy(A.matrix),(h!==A||f!==A.version||d!==r.toneMapping)&&(c.material.needsUpdate=!0,h=A,f=A.version,d=r.toneMapping),c.layers.enableAll(),y.unshift(c,c.geometry,c.material,0,0,null))}function p(y,v){y.getRGB(ka,Sp(r)),n.buffers.color.setClear(ka.r,ka.g,ka.b,v,o)}function M(){u!==void 0&&(u.geometry.dispose(),u.material.dispose(),u=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(y,v=1){a.set(y),l=v,p(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(y){l=y,p(a,l)},render:_,addToRenderList:m,dispose:M}}function Px(r,e){const t=r.getParameter(r.MAX_VERTEX_ATTRIBS),n={},i=f(null);let s=i,o=!1;function a(S,P,I,O,q){let W=!1;const V=h(O,I,P);s!==V&&(s=V,c(s.object)),W=d(S,O,I,q),W&&g(S,O,I,q),q!==null&&e.update(q,r.ELEMENT_ARRAY_BUFFER),(W||o)&&(o=!1,v(S,P,I,O),q!==null&&r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,e.get(q).buffer))}function l(){return r.createVertexArray()}function c(S){return r.bindVertexArray(S)}function u(S){return r.deleteVertexArray(S)}function h(S,P,I){const O=I.wireframe===!0;let q=n[S.id];q===void 0&&(q={},n[S.id]=q);let W=q[P.id];W===void 0&&(W={},q[P.id]=W);let V=W[O];return V===void 0&&(V=f(l()),W[O]=V),V}function f(S){const P=[],I=[],O=[];for(let q=0;q<t;q++)P[q]=0,I[q]=0,O[q]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:P,enabledAttributes:I,attributeDivisors:O,object:S,attributes:{},index:null}}function d(S,P,I,O){const q=s.attributes,W=P.attributes;let V=0;const X=I.getAttributes();for(const z in X)if(X[z].location>=0){const D=q[z];let ae=W[z];if(ae===void 0&&(z==="instanceMatrix"&&S.instanceMatrix&&(ae=S.instanceMatrix),z==="instanceColor"&&S.instanceColor&&(ae=S.instanceColor)),D===void 0||D.attribute!==ae||ae&&D.data!==ae.data)return!0;V++}return s.attributesNum!==V||s.index!==O}function g(S,P,I,O){const q={},W=P.attributes;let V=0;const X=I.getAttributes();for(const z in X)if(X[z].location>=0){let D=W[z];D===void 0&&(z==="instanceMatrix"&&S.instanceMatrix&&(D=S.instanceMatrix),z==="instanceColor"&&S.instanceColor&&(D=S.instanceColor));const ae={};ae.attribute=D,D&&D.data&&(ae.data=D.data),q[z]=ae,V++}s.attributes=q,s.attributesNum=V,s.index=O}function _(){const S=s.newAttributes;for(let P=0,I=S.length;P<I;P++)S[P]=0}function m(S){p(S,0)}function p(S,P){const I=s.newAttributes,O=s.enabledAttributes,q=s.attributeDivisors;I[S]=1,O[S]===0&&(r.enableVertexAttribArray(S),O[S]=1),q[S]!==P&&(r.vertexAttribDivisor(S,P),q[S]=P)}function M(){const S=s.newAttributes,P=s.enabledAttributes;for(let I=0,O=P.length;I<O;I++)P[I]!==S[I]&&(r.disableVertexAttribArray(I),P[I]=0)}function y(S,P,I,O,q,W,V){V===!0?r.vertexAttribIPointer(S,P,I,q,W):r.vertexAttribPointer(S,P,I,O,q,W)}function v(S,P,I,O){_();const q=O.attributes,W=I.getAttributes(),V=P.defaultAttributeValues;for(const X in W){const z=W[X];if(z.location>=0){let re=q[X];if(re===void 0&&(X==="instanceMatrix"&&S.instanceMatrix&&(re=S.instanceMatrix),X==="instanceColor"&&S.instanceColor&&(re=S.instanceColor)),re!==void 0){const D=re.normalized,ae=re.itemSize,Le=e.get(re);if(Le===void 0)continue;const ke=Le.buffer,$=Le.type,ne=Le.bytesPerElement,pe=$===r.INT||$===r.UNSIGNED_INT||re.gpuType===ff;if(re.isInterleavedBufferAttribute){const se=re.data,we=se.stride,Be=re.offset;if(se.isInstancedInterleavedBuffer){for(let ye=0;ye<z.locationSize;ye++)p(z.location+ye,se.meshPerAttribute);S.isInstancedMesh!==!0&&O._maxInstanceCount===void 0&&(O._maxInstanceCount=se.meshPerAttribute*se.count)}else for(let ye=0;ye<z.locationSize;ye++)m(z.location+ye);r.bindBuffer(r.ARRAY_BUFFER,ke);for(let ye=0;ye<z.locationSize;ye++)y(z.location+ye,ae/z.locationSize,$,D,we*ne,(Be+ae/z.locationSize*ye)*ne,pe)}else{if(re.isInstancedBufferAttribute){for(let se=0;se<z.locationSize;se++)p(z.location+se,re.meshPerAttribute);S.isInstancedMesh!==!0&&O._maxInstanceCount===void 0&&(O._maxInstanceCount=re.meshPerAttribute*re.count)}else for(let se=0;se<z.locationSize;se++)m(z.location+se);r.bindBuffer(r.ARRAY_BUFFER,ke);for(let se=0;se<z.locationSize;se++)y(z.location+se,ae/z.locationSize,$,D,ae*ne,ae/z.locationSize*se*ne,pe)}}else if(V!==void 0){const D=V[X];if(D!==void 0)switch(D.length){case 2:r.vertexAttrib2fv(z.location,D);break;case 3:r.vertexAttrib3fv(z.location,D);break;case 4:r.vertexAttrib4fv(z.location,D);break;default:r.vertexAttrib1fv(z.location,D)}}}}M()}function A(){E();for(const S in n){const P=n[S];for(const I in P){const O=P[I];for(const q in O)u(O[q].object),delete O[q];delete P[I]}delete n[S]}}function C(S){if(n[S.id]===void 0)return;const P=n[S.id];for(const I in P){const O=P[I];for(const q in O)u(O[q].object),delete O[q];delete P[I]}delete n[S.id]}function w(S){for(const P in n){const I=n[P];if(I[S.id]===void 0)continue;const O=I[S.id];for(const q in O)u(O[q].object),delete O[q];delete I[S.id]}}function E(){x(),o=!0,s!==i&&(s=i,c(s.object))}function x(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:a,reset:E,resetDefaultState:x,dispose:A,releaseStatesOfGeometry:C,releaseStatesOfProgram:w,initAttributes:_,enableAttribute:m,disableUnusedAttributes:M}}function Dx(r,e,t){let n;function i(c){n=c}function s(c,u){r.drawArrays(n,c,u),t.update(u,n,1)}function o(c,u,h){h!==0&&(r.drawArraysInstanced(n,c,u,h),t.update(u,n,h))}function a(c,u,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,u,0,h);let d=0;for(let g=0;g<h;g++)d+=u[g];t.update(d,n,1)}function l(c,u,h,f){if(h===0)return;const d=e.get("WEBGL_multi_draw");if(d===null)for(let g=0;g<c.length;g++)o(c[g],u[g],f[g]);else{d.multiDrawArraysInstancedWEBGL(n,c,0,u,0,f,0,h);let g=0;for(let _=0;_<h;_++)g+=u[_]*f[_];t.update(g,n,1)}}this.setMode=i,this.render=s,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function Lx(r,e,t,n){let i;function s(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){const w=e.get("EXT_texture_filter_anisotropic");i=r.getParameter(w.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(w){return!(w!==pi&&n.convert(w)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(w){const E=w===ma&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(w!==$i&&n.convert(w)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_TYPE)&&w!==Vi&&!E)}function l(w){if(w==="highp"){if(r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.HIGH_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision>0)return"highp";w="mediump"}return w==="mediump"&&r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.MEDIUM_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const u=l(c);u!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);const h=t.logarithmicDepthBuffer===!0,f=t.reverseDepthBuffer===!0&&e.has("EXT_clip_control"),d=r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS),g=r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=r.getParameter(r.MAX_TEXTURE_SIZE),m=r.getParameter(r.MAX_CUBE_MAP_TEXTURE_SIZE),p=r.getParameter(r.MAX_VERTEX_ATTRIBS),M=r.getParameter(r.MAX_VERTEX_UNIFORM_VECTORS),y=r.getParameter(r.MAX_VARYING_VECTORS),v=r.getParameter(r.MAX_FRAGMENT_UNIFORM_VECTORS),A=g>0,C=r.getParameter(r.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:h,reverseDepthBuffer:f,maxTextures:d,maxVertexTextures:g,maxTextureSize:_,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:M,maxVaryings:y,maxFragmentUniforms:v,vertexTextures:A,maxSamples:C}}function Ux(r){const e=this;let t=null,n=0,i=!1,s=!1;const o=new Br,a=new Ze,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(h,f){const d=h.length!==0||f||n!==0||i;return i=f,n=h.length,d},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(h,f){t=u(h,f,0)},this.setState=function(h,f,d){const g=h.clippingPlanes,_=h.clipIntersection,m=h.clipShadows,p=r.get(h);if(!i||g===null||g.length===0||s&&!m)s?u(null):c();else{const M=s?0:n,y=M*4;let v=p.clippingState||null;l.value=v,v=u(g,f,y,d);for(let A=0;A!==y;++A)v[A]=t[A];p.clippingState=v,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=M}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function u(h,f,d,g){const _=h!==null?h.length:0;let m=null;if(_!==0){if(m=l.value,g!==!0||m===null){const p=d+_*4,M=f.matrixWorldInverse;a.getNormalMatrix(M),(m===null||m.length<p)&&(m=new Float32Array(p));for(let y=0,v=d;y!==_;++y,v+=4)o.copy(h[y]).applyMatrix4(M,a),o.normal.toArray(m,v),m[v+3]=o.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,m}}function Ix(r){let e=new WeakMap;function t(o,a){return a===Jc?o.mapping=eo:a===Qc&&(o.mapping=to),o}function n(o){if(o&&o.isTexture){const a=o.mapping;if(a===Jc||a===Qc)if(e.has(o)){const l=e.get(o).texture;return t(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new zg(l.height);return c.fromEquirectangularTexture(r,o),e.set(o,c),o.addEventListener("dispose",i),t(c.texture,o.mapping)}else return null}}return o}function i(o){const a=o.target;a.removeEventListener("dispose",i);const l=e.get(a);l!==void 0&&(e.delete(a),l.dispose())}function s(){e=new WeakMap}return{get:n,dispose:s}}const Fs=4,Sh=[.125,.215,.35,.446,.526,.582],Wr=20,vc=new Tp,yh=new _t;let xc=null,Sc=0,yc=0,Mc=!1;const zr=(1+Math.sqrt(5))/2,As=1/zr,Mh=[new Z(-zr,As,0),new Z(zr,As,0),new Z(-As,0,zr),new Z(As,0,zr),new Z(0,zr,-As),new Z(0,zr,As),new Z(-1,1,-1),new Z(1,1,-1),new Z(-1,1,1),new Z(1,1,1)];class Eh{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,i=100){xc=this._renderer.getRenderTarget(),Sc=this._renderer.getActiveCubeFace(),yc=this._renderer.getActiveMipmapLevel(),Mc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,n,i,s),t>0&&this._blur(s,0,0,t),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=wh(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Th(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(xc,Sc,yc),this._renderer.xr.enabled=Mc,e.scissorTest=!1,Ha(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===eo||e.mapping===to?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),xc=this._renderer.getRenderTarget(),Sc=this._renderer.getActiveCubeFace(),yc=this._renderer.getActiveMipmapLevel(),Mc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:bi,minFilter:bi,generateMipmaps:!1,type:ma,format:pi,colorSpace:ro,depthBuffer:!1},i=bh(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=bh(e,t,n);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Nx(s)),this._blurMaterial=Fx(s,e,t)}return i}_compileMaterial(e){const t=new Ti(this._lodPlanes[0],e);this._renderer.compile(t,vc)}_sceneToCubeUV(e,t,n,i){const a=new fi(90,1,t,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],u=this._renderer,h=u.autoClear,f=u.toneMapping;u.getClearColor(yh),u.toneMapping=_r,u.autoClear=!1;const d=new gp({name:"PMREM.Background",side:Cn,depthWrite:!1,depthTest:!1}),g=new Ti(new xa,d);let _=!1;const m=e.background;m?m.isColor&&(d.color.copy(m),e.background=null,_=!0):(d.color.copy(yh),_=!0);for(let p=0;p<6;p++){const M=p%3;M===0?(a.up.set(0,l[p],0),a.lookAt(c[p],0,0)):M===1?(a.up.set(0,0,l[p]),a.lookAt(0,c[p],0)):(a.up.set(0,l[p],0),a.lookAt(0,0,c[p]));const y=this._cubeSize;Ha(i,M*y,p>2?y:0,y,y),u.setRenderTarget(i),_&&u.render(g,a),u.render(e,a)}g.geometry.dispose(),g.material.dispose(),u.toneMapping=f,u.autoClear=h,e.background=m}_textureToCubeUV(e,t){const n=this._renderer,i=e.mapping===eo||e.mapping===to;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=wh()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Th());const s=i?this._cubemapMaterial:this._equirectMaterial,o=new Ti(this._lodPlanes[0],s),a=s.uniforms;a.envMap.value=e;const l=this._cubeSize;Ha(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(o,vc)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const i=this._lodPlanes.length;for(let s=1;s<i;s++){const o=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),a=Mh[(i-s-1)%Mh.length];this._blur(e,s-1,s,o,a)}t.autoClear=n}_blur(e,t,n,i,s){const o=this._pingPongRenderTarget;this._halfBlur(e,o,t,n,i,"latitudinal",s),this._halfBlur(o,e,n,n,i,"longitudinal",s)}_halfBlur(e,t,n,i,s,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,h=new Ti(this._lodPlanes[i],c),f=c.uniforms,d=this._sizeLods[n]-1,g=isFinite(s)?Math.PI/(2*d):2*Math.PI/(2*Wr-1),_=s/g,m=isFinite(s)?1+Math.floor(u*_):Wr;m>Wr&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Wr}`);const p=[];let M=0;for(let w=0;w<Wr;++w){const E=w/_,x=Math.exp(-E*E/2);p.push(x),w===0?M+=x:w<m&&(M+=2*x)}for(let w=0;w<p.length;w++)p[w]=p[w]/M;f.envMap.value=e.texture,f.samples.value=m,f.weights.value=p,f.latitudinal.value=o==="latitudinal",a&&(f.poleAxis.value=a);const{_lodMax:y}=this;f.dTheta.value=g,f.mipInt.value=y-n;const v=this._sizeLods[i],A=3*v*(i>y-Fs?i-y+Fs:0),C=4*(this._cubeSize-v);Ha(t,A,C,3*v,2*v),l.setRenderTarget(t),l.render(h,vc)}}function Nx(r){const e=[],t=[],n=[];let i=r;const s=r-Fs+1+Sh.length;for(let o=0;o<s;o++){const a=Math.pow(2,i);t.push(a);let l=1/a;o>r-Fs?l=Sh[o-r+Fs-1]:o===0&&(l=0),n.push(l);const c=1/(a-2),u=-c,h=1+c,f=[u,u,h,u,h,h,u,u,h,h,u,h],d=6,g=6,_=3,m=2,p=1,M=new Float32Array(_*g*d),y=new Float32Array(m*g*d),v=new Float32Array(p*g*d);for(let C=0;C<d;C++){const w=C%3*2/3-1,E=C>2?0:-1,x=[w,E,0,w+2/3,E,0,w+2/3,E+1,0,w,E,0,w+2/3,E+1,0,w,E+1,0];M.set(x,_*g*C),y.set(f,m*g*C);const S=[C,C,C,C,C,C];v.set(S,p*g*C)}const A=new us;A.setAttribute("position",new Ci(M,_)),A.setAttribute("uv",new Ci(y,m)),A.setAttribute("faceIndex",new Ci(v,p)),e.push(A),i>Fs&&i--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function bh(r,e,t){const n=new ss(r,e,t);return n.texture.mapping=zl,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Ha(r,e,t,n,i){r.viewport.set(e,t,n,i),r.scissor.set(e,t,n,i)}function Fx(r,e,t){const n=new Float32Array(Wr),i=new Z(0,1,0);return new Zi({name:"SphericalGaussianBlur",defines:{n:Wr,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:vf(),fragmentShader:`

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
		`,blending:mr,depthTest:!1,depthWrite:!1})}function Th(){return new Zi({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:vf(),fragmentShader:`

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
		`,blending:mr,depthTest:!1,depthWrite:!1})}function wh(){return new Zi({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:vf(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:mr,depthTest:!1,depthWrite:!1})}function vf(){return`

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
	`}function Ox(r){let e=new WeakMap,t=null;function n(a){if(a&&a.isTexture){const l=a.mapping,c=l===Jc||l===Qc,u=l===eo||l===to;if(c||u){let h=e.get(a);const f=h!==void 0?h.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==f)return t===null&&(t=new Eh(r)),h=c?t.fromEquirectangular(a,h):t.fromCubemap(a,h),h.texture.pmremVersion=a.pmremVersion,e.set(a,h),h.texture;if(h!==void 0)return h.texture;{const d=a.image;return c&&d&&d.height>0||u&&d&&i(d)?(t===null&&(t=new Eh(r)),h=c?t.fromEquirectangular(a):t.fromCubemap(a),h.texture.pmremVersion=a.pmremVersion,e.set(a,h),a.addEventListener("dispose",s),h.texture):null}}}return a}function i(a){let l=0;const c=6;for(let u=0;u<c;u++)a[u]!==void 0&&l++;return l===c}function s(a){const l=a.target;l.removeEventListener("dispose",s);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:o}}function Bx(r){const e={};function t(n){if(e[n]!==void 0)return e[n];let i;switch(n){case"WEBGL_depth_texture":i=r.getExtension("WEBGL_depth_texture")||r.getExtension("MOZ_WEBGL_depth_texture")||r.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=r.getExtension("EXT_texture_filter_anisotropic")||r.getExtension("MOZ_EXT_texture_filter_anisotropic")||r.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=r.getExtension("WEBGL_compressed_texture_s3tc")||r.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=r.getExtension("WEBGL_compressed_texture_pvrtc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=r.getExtension(n)}return e[n]=i,i}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const i=t(n);return i===null&&Ds("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function zx(r,e,t,n){const i={},s=new WeakMap;function o(h){const f=h.target;f.index!==null&&e.remove(f.index);for(const g in f.attributes)e.remove(f.attributes[g]);f.removeEventListener("dispose",o),delete i[f.id];const d=s.get(f);d&&(e.remove(d),s.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,t.memory.geometries--}function a(h,f){return i[f.id]===!0||(f.addEventListener("dispose",o),i[f.id]=!0,t.memory.geometries++),f}function l(h){const f=h.attributes;for(const d in f)e.update(f[d],r.ARRAY_BUFFER)}function c(h){const f=[],d=h.index,g=h.attributes.position;let _=0;if(d!==null){const M=d.array;_=d.version;for(let y=0,v=M.length;y<v;y+=3){const A=M[y+0],C=M[y+1],w=M[y+2];f.push(A,C,C,w,w,A)}}else if(g!==void 0){const M=g.array;_=g.version;for(let y=0,v=M.length/3-1;y<v;y+=3){const A=y+0,C=y+1,w=y+2;f.push(A,C,C,w,w,A)}}else return;const m=new(hp(f)?xp:vp)(f,1);m.version=_;const p=s.get(h);p&&e.remove(p),s.set(h,m)}function u(h){const f=s.get(h);if(f){const d=h.index;d!==null&&f.version<d.version&&c(h)}else c(h);return s.get(h)}return{get:a,update:l,getWireframeAttribute:u}}function kx(r,e,t){let n;function i(f){n=f}let s,o;function a(f){s=f.type,o=f.bytesPerElement}function l(f,d){r.drawElements(n,d,s,f*o),t.update(d,n,1)}function c(f,d,g){g!==0&&(r.drawElementsInstanced(n,d,s,f*o,g),t.update(d,n,g))}function u(f,d,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,d,0,s,f,0,g);let m=0;for(let p=0;p<g;p++)m+=d[p];t.update(m,n,1)}function h(f,d,g,_){if(g===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<f.length;p++)c(f[p]/o,d[p],_[p]);else{m.multiDrawElementsInstancedWEBGL(n,d,0,s,f,0,_,0,g);let p=0;for(let M=0;M<g;M++)p+=d[M]*_[M];t.update(p,n,1)}}this.setMode=i,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=u,this.renderMultiDrawInstances=h}function Hx(r){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,o,a){switch(t.calls++,o){case r.TRIANGLES:t.triangles+=a*(s/3);break;case r.LINES:t.lines+=a*(s/2);break;case r.LINE_STRIP:t.lines+=a*(s-1);break;case r.LINE_LOOP:t.lines+=a*s;break;case r.POINTS:t.points+=a*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function i(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:i,update:n}}function Vx(r,e,t){const n=new WeakMap,i=new Ft;function s(o,a,l){const c=o.morphTargetInfluences,u=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,h=u!==void 0?u.length:0;let f=n.get(a);if(f===void 0||f.count!==h){let S=function(){E.dispose(),n.delete(a),a.removeEventListener("dispose",S)};var d=S;f!==void 0&&f.texture.dispose();const g=a.morphAttributes.position!==void 0,_=a.morphAttributes.normal!==void 0,m=a.morphAttributes.color!==void 0,p=a.morphAttributes.position||[],M=a.morphAttributes.normal||[],y=a.morphAttributes.color||[];let v=0;g===!0&&(v=1),_===!0&&(v=2),m===!0&&(v=3);let A=a.attributes.position.count*v,C=1;A>e.maxTextureSize&&(C=Math.ceil(A/e.maxTextureSize),A=e.maxTextureSize);const w=new Float32Array(A*C*4*h),E=new pp(w,A,C,h);E.type=Vi,E.needsUpdate=!0;const x=v*4;for(let P=0;P<h;P++){const I=p[P],O=M[P],q=y[P],W=A*C*4*P;for(let V=0;V<I.count;V++){const X=V*x;g===!0&&(i.fromBufferAttribute(I,V),w[W+X+0]=i.x,w[W+X+1]=i.y,w[W+X+2]=i.z,w[W+X+3]=0),_===!0&&(i.fromBufferAttribute(O,V),w[W+X+4]=i.x,w[W+X+5]=i.y,w[W+X+6]=i.z,w[W+X+7]=0),m===!0&&(i.fromBufferAttribute(q,V),w[W+X+8]=i.x,w[W+X+9]=i.y,w[W+X+10]=i.z,w[W+X+11]=q.itemSize===4?i.w:1)}}f={count:h,texture:E,size:new gt(A,C)},n.set(a,f),a.addEventListener("dispose",S)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(r,"morphTexture",o.morphTexture,t);else{let g=0;for(let m=0;m<c.length;m++)g+=c[m];const _=a.morphTargetsRelative?1:1-g;l.getUniforms().setValue(r,"morphTargetBaseInfluence",_),l.getUniforms().setValue(r,"morphTargetInfluences",c)}l.getUniforms().setValue(r,"morphTargetsTexture",f.texture,t),l.getUniforms().setValue(r,"morphTargetsTextureSize",f.size)}return{update:s}}function Gx(r,e,t,n){let i=new WeakMap;function s(l){const c=n.render.frame,u=l.geometry,h=e.get(l,u);if(i.get(h)!==c&&(e.update(h),i.set(h,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),i.get(l)!==c&&(t.update(l.instanceMatrix,r.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,r.ARRAY_BUFFER),i.set(l,c))),l.isSkinnedMesh){const f=l.skeleton;i.get(f)!==c&&(f.update(),i.set(f,c))}return h}function o(){i=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:s,dispose:o}}const Ap=new Rn,Ah=new bp(1,1),Cp=new pp,Rp=new yg,Pp=new Mp,Ch=[],Rh=[],Ph=new Float32Array(16),Dh=new Float32Array(9),Lh=new Float32Array(4);function _o(r,e,t){const n=r[0];if(n<=0||n>0)return r;const i=e*t;let s=Ch[i];if(s===void 0&&(s=new Float32Array(i),Ch[i]=s),e!==0){n.toArray(s,0);for(let o=1,a=0;o!==e;++o)a+=t,r[o].toArray(s,a)}return s}function Kt(r,e){if(r.length!==e.length)return!1;for(let t=0,n=r.length;t<n;t++)if(r[t]!==e[t])return!1;return!0}function Zt(r,e){for(let t=0,n=e.length;t<n;t++)r[t]=e[t]}function Hl(r,e){let t=Rh[e];t===void 0&&(t=new Int32Array(e),Rh[e]=t);for(let n=0;n!==e;++n)t[n]=r.allocateTextureUnit();return t}function Wx(r,e){const t=this.cache;t[0]!==e&&(r.uniform1f(this.addr,e),t[0]=e)}function Xx(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Kt(t,e))return;r.uniform2fv(this.addr,e),Zt(t,e)}}function Yx(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(r.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Kt(t,e))return;r.uniform3fv(this.addr,e),Zt(t,e)}}function qx(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Kt(t,e))return;r.uniform4fv(this.addr,e),Zt(t,e)}}function $x(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(Kt(t,e))return;r.uniformMatrix2fv(this.addr,!1,e),Zt(t,e)}else{if(Kt(t,n))return;Lh.set(n),r.uniformMatrix2fv(this.addr,!1,Lh),Zt(t,n)}}function Kx(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(Kt(t,e))return;r.uniformMatrix3fv(this.addr,!1,e),Zt(t,e)}else{if(Kt(t,n))return;Dh.set(n),r.uniformMatrix3fv(this.addr,!1,Dh),Zt(t,n)}}function Zx(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(Kt(t,e))return;r.uniformMatrix4fv(this.addr,!1,e),Zt(t,e)}else{if(Kt(t,n))return;Ph.set(n),r.uniformMatrix4fv(this.addr,!1,Ph),Zt(t,n)}}function jx(r,e){const t=this.cache;t[0]!==e&&(r.uniform1i(this.addr,e),t[0]=e)}function Jx(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Kt(t,e))return;r.uniform2iv(this.addr,e),Zt(t,e)}}function Qx(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Kt(t,e))return;r.uniform3iv(this.addr,e),Zt(t,e)}}function eS(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Kt(t,e))return;r.uniform4iv(this.addr,e),Zt(t,e)}}function tS(r,e){const t=this.cache;t[0]!==e&&(r.uniform1ui(this.addr,e),t[0]=e)}function nS(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Kt(t,e))return;r.uniform2uiv(this.addr,e),Zt(t,e)}}function iS(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Kt(t,e))return;r.uniform3uiv(this.addr,e),Zt(t,e)}}function rS(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Kt(t,e))return;r.uniform4uiv(this.addr,e),Zt(t,e)}}function sS(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i);let s;this.type===r.SAMPLER_2D_SHADOW?(Ah.compareFunction=fp,s=Ah):s=Ap,t.setTexture2D(e||s,i)}function oS(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture3D(e||Rp,i)}function aS(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTextureCube(e||Pp,i)}function lS(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture2DArray(e||Cp,i)}function cS(r){switch(r){case 5126:return Wx;case 35664:return Xx;case 35665:return Yx;case 35666:return qx;case 35674:return $x;case 35675:return Kx;case 35676:return Zx;case 5124:case 35670:return jx;case 35667:case 35671:return Jx;case 35668:case 35672:return Qx;case 35669:case 35673:return eS;case 5125:return tS;case 36294:return nS;case 36295:return iS;case 36296:return rS;case 35678:case 36198:case 36298:case 36306:case 35682:return sS;case 35679:case 36299:case 36307:return oS;case 35680:case 36300:case 36308:case 36293:return aS;case 36289:case 36303:case 36311:case 36292:return lS}}function uS(r,e){r.uniform1fv(this.addr,e)}function fS(r,e){const t=_o(e,this.size,2);r.uniform2fv(this.addr,t)}function hS(r,e){const t=_o(e,this.size,3);r.uniform3fv(this.addr,t)}function dS(r,e){const t=_o(e,this.size,4);r.uniform4fv(this.addr,t)}function pS(r,e){const t=_o(e,this.size,4);r.uniformMatrix2fv(this.addr,!1,t)}function mS(r,e){const t=_o(e,this.size,9);r.uniformMatrix3fv(this.addr,!1,t)}function _S(r,e){const t=_o(e,this.size,16);r.uniformMatrix4fv(this.addr,!1,t)}function gS(r,e){r.uniform1iv(this.addr,e)}function vS(r,e){r.uniform2iv(this.addr,e)}function xS(r,e){r.uniform3iv(this.addr,e)}function SS(r,e){r.uniform4iv(this.addr,e)}function yS(r,e){r.uniform1uiv(this.addr,e)}function MS(r,e){r.uniform2uiv(this.addr,e)}function ES(r,e){r.uniform3uiv(this.addr,e)}function bS(r,e){r.uniform4uiv(this.addr,e)}function TS(r,e,t){const n=this.cache,i=e.length,s=Hl(t,i);Kt(n,s)||(r.uniform1iv(this.addr,s),Zt(n,s));for(let o=0;o!==i;++o)t.setTexture2D(e[o]||Ap,s[o])}function wS(r,e,t){const n=this.cache,i=e.length,s=Hl(t,i);Kt(n,s)||(r.uniform1iv(this.addr,s),Zt(n,s));for(let o=0;o!==i;++o)t.setTexture3D(e[o]||Rp,s[o])}function AS(r,e,t){const n=this.cache,i=e.length,s=Hl(t,i);Kt(n,s)||(r.uniform1iv(this.addr,s),Zt(n,s));for(let o=0;o!==i;++o)t.setTextureCube(e[o]||Pp,s[o])}function CS(r,e,t){const n=this.cache,i=e.length,s=Hl(t,i);Kt(n,s)||(r.uniform1iv(this.addr,s),Zt(n,s));for(let o=0;o!==i;++o)t.setTexture2DArray(e[o]||Cp,s[o])}function RS(r){switch(r){case 5126:return uS;case 35664:return fS;case 35665:return hS;case 35666:return dS;case 35674:return pS;case 35675:return mS;case 35676:return _S;case 5124:case 35670:return gS;case 35667:case 35671:return vS;case 35668:case 35672:return xS;case 35669:case 35673:return SS;case 5125:return yS;case 36294:return MS;case 36295:return ES;case 36296:return bS;case 35678:case 36198:case 36298:case 36306:case 35682:return TS;case 35679:case 36299:case 36307:return wS;case 35680:case 36300:case 36308:case 36293:return AS;case 36289:case 36303:case 36311:case 36292:return CS}}class PS{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=cS(t.type)}}class DS{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=RS(t.type)}}class LS{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const i=this.seq;for(let s=0,o=i.length;s!==o;++s){const a=i[s];a.setValue(e,t[a.id],n)}}}const Ec=/(\w+)(\])?(\[|\.)?/g;function Uh(r,e){r.seq.push(e),r.map[e.id]=e}function US(r,e,t){const n=r.name,i=n.length;for(Ec.lastIndex=0;;){const s=Ec.exec(n),o=Ec.lastIndex;let a=s[1];const l=s[2]==="]",c=s[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===i){Uh(t,c===void 0?new PS(a,r,e):new DS(a,r,e));break}else{let h=t.map[a];h===void 0&&(h=new LS(a),Uh(t,h)),t=h}}}class hl{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){const s=e.getActiveUniform(t,i),o=e.getUniformLocation(t,s.name);US(s,o,this)}}setValue(e,t,n,i){const s=this.map[t];s!==void 0&&s.setValue(e,n,i)}setOptional(e,t,n){const i=t[n];i!==void 0&&this.setValue(e,n,i)}static upload(e,t,n,i){for(let s=0,o=t.length;s!==o;++s){const a=t[s],l=n[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,i)}}static seqWithValue(e,t){const n=[];for(let i=0,s=e.length;i!==s;++i){const o=e[i];o.id in t&&n.push(o)}return n}}function Ih(r,e,t){const n=r.createShader(e);return r.shaderSource(n,t),r.compileShader(n),n}const IS=37297;let NS=0;function FS(r,e){const t=r.split(`
`),n=[],i=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let o=i;o<s;o++){const a=o+1;n.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return n.join(`
`)}const Nh=new Ze;function OS(r){ft._getMatrix(Nh,ft.workingColorSpace,r);const e=`mat3( ${Nh.elements.map(t=>t.toFixed(4))} )`;switch(ft.getTransfer(r)){case Ml:return[e,"LinearTransferOETF"];case vt:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",r),[e,"LinearTransferOETF"]}}function Fh(r,e,t){const n=r.getShaderParameter(e,r.COMPILE_STATUS),i=r.getShaderInfoLog(e).trim();if(n&&i==="")return"";const s=/ERROR: 0:(\d+)/.exec(i);if(s){const o=parseInt(s[1]);return t.toUpperCase()+`

`+i+`

`+FS(r.getShaderSource(e),o)}else return i}function BS(r,e){const t=OS(e);return[`vec4 ${r}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function zS(r,e){let t;switch(e){case Y_:t="Linear";break;case q_:t="Reinhard";break;case $_:t="Cineon";break;case K_:t="ACESFilmic";break;case j_:t="AgX";break;case J_:t="Neutral";break;case Z_:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+r+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Va=new Z;function kS(){ft.getLuminanceCoefficients(Va);const r=Va.x.toFixed(4),e=Va.y.toFixed(4),t=Va.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${r}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function HS(r){return[r.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",r.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Ro).join(`
`)}function VS(r){const e=[];for(const t in r){const n=r[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function GS(r,e){const t={},n=r.getProgramParameter(e,r.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){const s=r.getActiveAttrib(e,i),o=s.name;let a=1;s.type===r.FLOAT_MAT2&&(a=2),s.type===r.FLOAT_MAT3&&(a=3),s.type===r.FLOAT_MAT4&&(a=4),t[o]={type:s.type,location:r.getAttribLocation(e,o),locationSize:a}}return t}function Ro(r){return r!==""}function Oh(r,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return r.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Bh(r,e){return r.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const WS=/^[ \t]*#include +<([\w\d./]+)>/gm;function Ru(r){return r.replace(WS,YS)}const XS=new Map;function YS(r,e){let t=je[e];if(t===void 0){const n=XS.get(e);if(n!==void 0)t=je[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return Ru(t)}const qS=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function zh(r){return r.replace(qS,$S)}function $S(r,e,t,n){let i="";for(let s=parseInt(e);s<parseInt(t);s++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return i}function kh(r){let e=`precision ${r.precision} float;
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
#define LOW_PRECISION`),e}function KS(r){let e="SHADOWMAP_TYPE_BASIC";return r.shadowMapType===Jd?e="SHADOWMAP_TYPE_PCF":r.shadowMapType===T_?e="SHADOWMAP_TYPE_PCF_SOFT":r.shadowMapType===Bi&&(e="SHADOWMAP_TYPE_VSM"),e}function ZS(r){let e="ENVMAP_TYPE_CUBE";if(r.envMap)switch(r.envMapMode){case eo:case to:e="ENVMAP_TYPE_CUBE";break;case zl:e="ENVMAP_TYPE_CUBE_UV";break}return e}function jS(r){let e="ENVMAP_MODE_REFLECTION";if(r.envMap)switch(r.envMapMode){case to:e="ENVMAP_MODE_REFRACTION";break}return e}function JS(r){let e="ENVMAP_BLENDING_NONE";if(r.envMap)switch(r.combine){case Qd:e="ENVMAP_BLENDING_MULTIPLY";break;case W_:e="ENVMAP_BLENDING_MIX";break;case X_:e="ENVMAP_BLENDING_ADD";break}return e}function QS(r){const e=r.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:n,maxMip:t}}function ey(r,e,t,n){const i=r.getContext(),s=t.defines;let o=t.vertexShader,a=t.fragmentShader;const l=KS(t),c=ZS(t),u=jS(t),h=JS(t),f=QS(t),d=HS(t),g=VS(s),_=i.createProgram();let m,p,M=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Ro).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Ro).join(`
`),p.length>0&&(p+=`
`)):(m=[kh(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ro).join(`
`),p=[kh(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+u:"",t.envMap?"#define "+h:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==_r?"#define TONE_MAPPING":"",t.toneMapping!==_r?je.tonemapping_pars_fragment:"",t.toneMapping!==_r?zS("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",je.colorspace_pars_fragment,BS("linearToOutputTexel",t.outputColorSpace),kS(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Ro).join(`
`)),o=Ru(o),o=Oh(o,t),o=Bh(o,t),a=Ru(a),a=Oh(a,t),a=Bh(a,t),o=zh(o),a=zh(a),t.isRawShaderMaterial!==!0&&(M=`#version 300 es
`,m=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",t.glslVersion===th?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===th?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const y=M+m+o,v=M+p+a,A=Ih(i,i.VERTEX_SHADER,y),C=Ih(i,i.FRAGMENT_SHADER,v);i.attachShader(_,A),i.attachShader(_,C),t.index0AttributeName!==void 0?i.bindAttribLocation(_,0,t.index0AttributeName):t.morphTargets===!0&&i.bindAttribLocation(_,0,"position"),i.linkProgram(_);function w(P){if(r.debug.checkShaderErrors){const I=i.getProgramInfoLog(_).trim(),O=i.getShaderInfoLog(A).trim(),q=i.getShaderInfoLog(C).trim();let W=!0,V=!0;if(i.getProgramParameter(_,i.LINK_STATUS)===!1)if(W=!1,typeof r.debug.onShaderError=="function")r.debug.onShaderError(i,_,A,C);else{const X=Fh(i,A,"vertex"),z=Fh(i,C,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(_,i.VALIDATE_STATUS)+`

Material Name: `+P.name+`
Material Type: `+P.type+`

Program Info Log: `+I+`
`+X+`
`+z)}else I!==""?console.warn("THREE.WebGLProgram: Program Info Log:",I):(O===""||q==="")&&(V=!1);V&&(P.diagnostics={runnable:W,programLog:I,vertexShader:{log:O,prefix:m},fragmentShader:{log:q,prefix:p}})}i.deleteShader(A),i.deleteShader(C),E=new hl(i,_),x=GS(i,_)}let E;this.getUniforms=function(){return E===void 0&&w(this),E};let x;this.getAttributes=function(){return x===void 0&&w(this),x};let S=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return S===!1&&(S=i.getProgramParameter(_,IS)),S},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(_),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=NS++,this.cacheKey=e,this.usedTimes=1,this.program=_,this.vertexShader=A,this.fragmentShader=C,this}let ty=0;class ny{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,i=this._getShaderStage(t),s=this._getShaderStage(n),o=this._getShaderCacheForMaterial(e);return o.has(i)===!1&&(o.add(i),i.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new iy(e),t.set(e,n)),n}}class iy{constructor(e){this.id=ty++,this.code=e,this.usedTimes=0}}function ry(r,e,t,n,i,s,o){const a=new mp,l=new ny,c=new Set,u=[],h=i.logarithmicDepthBuffer,f=i.vertexTextures;let d=i.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(x){return c.add(x),x===0?"uv":`uv${x}`}function m(x,S,P,I,O){const q=I.fog,W=O.geometry,V=x.isMeshStandardMaterial?I.environment:null,X=(x.isMeshStandardMaterial?t:e).get(x.envMap||V),z=X&&X.mapping===zl?X.image.height:null,re=g[x.type];x.precision!==null&&(d=i.getMaxPrecision(x.precision),d!==x.precision&&console.warn("THREE.WebGLProgram.getParameters:",x.precision,"not supported, using",d,"instead."));const D=W.morphAttributes.position||W.morphAttributes.normal||W.morphAttributes.color,ae=D!==void 0?D.length:0;let Le=0;W.morphAttributes.position!==void 0&&(Le=1),W.morphAttributes.normal!==void 0&&(Le=2),W.morphAttributes.color!==void 0&&(Le=3);let ke,$,ne,pe;if(re){const xe=yi[re];ke=xe.vertexShader,$=xe.fragmentShader}else ke=x.vertexShader,$=x.fragmentShader,l.update(x),ne=l.getVertexShaderID(x),pe=l.getFragmentShaderID(x);const se=r.getRenderTarget(),we=r.state.buffers.depth.getReversed(),Be=O.isInstancedMesh===!0,ye=O.isBatchedMesh===!0,rt=!!x.map,et=!!x.matcap,Ee=!!X,L=!!x.aoMap,xt=!!x.lightMap,Ve=!!x.bumpMap,B=!!x.normalMap,Te=!!x.displacementMap,st=!!x.emissiveMap,Ce=!!x.metalnessMap,R=!!x.roughnessMap,b=x.anisotropy>0,k=x.clearcoat>0,ee=x.dispersion>0,Q=x.iridescence>0,j=x.sheen>0,he=x.transmission>0,ce=b&&!!x.anisotropyMap,me=k&&!!x.clearcoatMap,Ye=k&&!!x.clearcoatNormalMap,oe=k&&!!x.clearcoatRoughnessMap,le=Q&&!!x.iridescenceMap,Fe=Q&&!!x.iridescenceThicknessMap,Ne=j&&!!x.sheenColorMap,Se=j&&!!x.sheenRoughnessMap,$e=!!x.specularMap,He=!!x.specularColorMap,lt=!!x.specularIntensityMap,U=he&&!!x.transmissionMap,fe=he&&!!x.thicknessMap,K=!!x.gradientMap,J=!!x.alphaMap,ue=x.alphaTest>0,de=!!x.alphaHash,Ge=!!x.extensions;let ct=_r;x.toneMapped&&(se===null||se.isXRRenderTarget===!0)&&(ct=r.toneMapping);const Dt={shaderID:re,shaderType:x.type,shaderName:x.name,vertexShader:ke,fragmentShader:$,defines:x.defines,customVertexShaderID:ne,customFragmentShaderID:pe,isRawShaderMaterial:x.isRawShaderMaterial===!0,glslVersion:x.glslVersion,precision:d,batching:ye,batchingColor:ye&&O._colorsTexture!==null,instancing:Be,instancingColor:Be&&O.instanceColor!==null,instancingMorph:Be&&O.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:se===null?r.outputColorSpace:se.isXRRenderTarget===!0?se.texture.colorSpace:ro,alphaToCoverage:!!x.alphaToCoverage,map:rt,matcap:et,envMap:Ee,envMapMode:Ee&&X.mapping,envMapCubeUVHeight:z,aoMap:L,lightMap:xt,bumpMap:Ve,normalMap:B,displacementMap:f&&Te,emissiveMap:st,normalMapObjectSpace:B&&x.normalMapType===ig,normalMapTangentSpace:B&&x.normalMapType===ng,metalnessMap:Ce,roughnessMap:R,anisotropy:b,anisotropyMap:ce,clearcoat:k,clearcoatMap:me,clearcoatNormalMap:Ye,clearcoatRoughnessMap:oe,dispersion:ee,iridescence:Q,iridescenceMap:le,iridescenceThicknessMap:Fe,sheen:j,sheenColorMap:Ne,sheenRoughnessMap:Se,specularMap:$e,specularColorMap:He,specularIntensityMap:lt,transmission:he,transmissionMap:U,thicknessMap:fe,gradientMap:K,opaque:x.transparent===!1&&x.blending===Vs&&x.alphaToCoverage===!1,alphaMap:J,alphaTest:ue,alphaHash:de,combine:x.combine,mapUv:rt&&_(x.map.channel),aoMapUv:L&&_(x.aoMap.channel),lightMapUv:xt&&_(x.lightMap.channel),bumpMapUv:Ve&&_(x.bumpMap.channel),normalMapUv:B&&_(x.normalMap.channel),displacementMapUv:Te&&_(x.displacementMap.channel),emissiveMapUv:st&&_(x.emissiveMap.channel),metalnessMapUv:Ce&&_(x.metalnessMap.channel),roughnessMapUv:R&&_(x.roughnessMap.channel),anisotropyMapUv:ce&&_(x.anisotropyMap.channel),clearcoatMapUv:me&&_(x.clearcoatMap.channel),clearcoatNormalMapUv:Ye&&_(x.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:oe&&_(x.clearcoatRoughnessMap.channel),iridescenceMapUv:le&&_(x.iridescenceMap.channel),iridescenceThicknessMapUv:Fe&&_(x.iridescenceThicknessMap.channel),sheenColorMapUv:Ne&&_(x.sheenColorMap.channel),sheenRoughnessMapUv:Se&&_(x.sheenRoughnessMap.channel),specularMapUv:$e&&_(x.specularMap.channel),specularColorMapUv:He&&_(x.specularColorMap.channel),specularIntensityMapUv:lt&&_(x.specularIntensityMap.channel),transmissionMapUv:U&&_(x.transmissionMap.channel),thicknessMapUv:fe&&_(x.thicknessMap.channel),alphaMapUv:J&&_(x.alphaMap.channel),vertexTangents:!!W.attributes.tangent&&(B||b),vertexColors:x.vertexColors,vertexAlphas:x.vertexColors===!0&&!!W.attributes.color&&W.attributes.color.itemSize===4,pointsUvs:O.isPoints===!0&&!!W.attributes.uv&&(rt||J),fog:!!q,useFog:x.fog===!0,fogExp2:!!q&&q.isFogExp2,flatShading:x.flatShading===!0,sizeAttenuation:x.sizeAttenuation===!0,logarithmicDepthBuffer:h,reverseDepthBuffer:we,skinning:O.isSkinnedMesh===!0,morphTargets:W.morphAttributes.position!==void 0,morphNormals:W.morphAttributes.normal!==void 0,morphColors:W.morphAttributes.color!==void 0,morphTargetsCount:ae,morphTextureStride:Le,numDirLights:S.directional.length,numPointLights:S.point.length,numSpotLights:S.spot.length,numSpotLightMaps:S.spotLightMap.length,numRectAreaLights:S.rectArea.length,numHemiLights:S.hemi.length,numDirLightShadows:S.directionalShadowMap.length,numPointLightShadows:S.pointShadowMap.length,numSpotLightShadows:S.spotShadowMap.length,numSpotLightShadowsWithMaps:S.numSpotLightShadowsWithMaps,numLightProbes:S.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:x.dithering,shadowMapEnabled:r.shadowMap.enabled&&P.length>0,shadowMapType:r.shadowMap.type,toneMapping:ct,decodeVideoTexture:rt&&x.map.isVideoTexture===!0&&ft.getTransfer(x.map.colorSpace)===vt,decodeVideoTextureEmissive:st&&x.emissiveMap.isVideoTexture===!0&&ft.getTransfer(x.emissiveMap.colorSpace)===vt,premultipliedAlpha:x.premultipliedAlpha,doubleSided:x.side===Mi,flipSided:x.side===Cn,useDepthPacking:x.depthPacking>=0,depthPacking:x.depthPacking||0,index0AttributeName:x.index0AttributeName,extensionClipCullDistance:Ge&&x.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Ge&&x.extensions.multiDraw===!0||ye)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:x.customProgramCacheKey()};return Dt.vertexUv1s=c.has(1),Dt.vertexUv2s=c.has(2),Dt.vertexUv3s=c.has(3),c.clear(),Dt}function p(x){const S=[];if(x.shaderID?S.push(x.shaderID):(S.push(x.customVertexShaderID),S.push(x.customFragmentShaderID)),x.defines!==void 0)for(const P in x.defines)S.push(P),S.push(x.defines[P]);return x.isRawShaderMaterial===!1&&(M(S,x),y(S,x),S.push(r.outputColorSpace)),S.push(x.customProgramCacheKey),S.join()}function M(x,S){x.push(S.precision),x.push(S.outputColorSpace),x.push(S.envMapMode),x.push(S.envMapCubeUVHeight),x.push(S.mapUv),x.push(S.alphaMapUv),x.push(S.lightMapUv),x.push(S.aoMapUv),x.push(S.bumpMapUv),x.push(S.normalMapUv),x.push(S.displacementMapUv),x.push(S.emissiveMapUv),x.push(S.metalnessMapUv),x.push(S.roughnessMapUv),x.push(S.anisotropyMapUv),x.push(S.clearcoatMapUv),x.push(S.clearcoatNormalMapUv),x.push(S.clearcoatRoughnessMapUv),x.push(S.iridescenceMapUv),x.push(S.iridescenceThicknessMapUv),x.push(S.sheenColorMapUv),x.push(S.sheenRoughnessMapUv),x.push(S.specularMapUv),x.push(S.specularColorMapUv),x.push(S.specularIntensityMapUv),x.push(S.transmissionMapUv),x.push(S.thicknessMapUv),x.push(S.combine),x.push(S.fogExp2),x.push(S.sizeAttenuation),x.push(S.morphTargetsCount),x.push(S.morphAttributeCount),x.push(S.numDirLights),x.push(S.numPointLights),x.push(S.numSpotLights),x.push(S.numSpotLightMaps),x.push(S.numHemiLights),x.push(S.numRectAreaLights),x.push(S.numDirLightShadows),x.push(S.numPointLightShadows),x.push(S.numSpotLightShadows),x.push(S.numSpotLightShadowsWithMaps),x.push(S.numLightProbes),x.push(S.shadowMapType),x.push(S.toneMapping),x.push(S.numClippingPlanes),x.push(S.numClipIntersection),x.push(S.depthPacking)}function y(x,S){a.disableAll(),S.supportsVertexTextures&&a.enable(0),S.instancing&&a.enable(1),S.instancingColor&&a.enable(2),S.instancingMorph&&a.enable(3),S.matcap&&a.enable(4),S.envMap&&a.enable(5),S.normalMapObjectSpace&&a.enable(6),S.normalMapTangentSpace&&a.enable(7),S.clearcoat&&a.enable(8),S.iridescence&&a.enable(9),S.alphaTest&&a.enable(10),S.vertexColors&&a.enable(11),S.vertexAlphas&&a.enable(12),S.vertexUv1s&&a.enable(13),S.vertexUv2s&&a.enable(14),S.vertexUv3s&&a.enable(15),S.vertexTangents&&a.enable(16),S.anisotropy&&a.enable(17),S.alphaHash&&a.enable(18),S.batching&&a.enable(19),S.dispersion&&a.enable(20),S.batchingColor&&a.enable(21),x.push(a.mask),a.disableAll(),S.fog&&a.enable(0),S.useFog&&a.enable(1),S.flatShading&&a.enable(2),S.logarithmicDepthBuffer&&a.enable(3),S.reverseDepthBuffer&&a.enable(4),S.skinning&&a.enable(5),S.morphTargets&&a.enable(6),S.morphNormals&&a.enable(7),S.morphColors&&a.enable(8),S.premultipliedAlpha&&a.enable(9),S.shadowMapEnabled&&a.enable(10),S.doubleSided&&a.enable(11),S.flipSided&&a.enable(12),S.useDepthPacking&&a.enable(13),S.dithering&&a.enable(14),S.transmission&&a.enable(15),S.sheen&&a.enable(16),S.opaque&&a.enable(17),S.pointsUvs&&a.enable(18),S.decodeVideoTexture&&a.enable(19),S.decodeVideoTextureEmissive&&a.enable(20),S.alphaToCoverage&&a.enable(21),x.push(a.mask)}function v(x){const S=g[x.type];let P;if(S){const I=yi[S];P=Ng.clone(I.uniforms)}else P=x.uniforms;return P}function A(x,S){let P;for(let I=0,O=u.length;I<O;I++){const q=u[I];if(q.cacheKey===S){P=q,++P.usedTimes;break}}return P===void 0&&(P=new ey(r,S,x,s),u.push(P)),P}function C(x){if(--x.usedTimes===0){const S=u.indexOf(x);u[S]=u[u.length-1],u.pop(),x.destroy()}}function w(x){l.remove(x)}function E(){l.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:v,acquireProgram:A,releaseProgram:C,releaseShaderCache:w,programs:u,dispose:E}}function sy(){let r=new WeakMap;function e(o){return r.has(o)}function t(o){let a=r.get(o);return a===void 0&&(a={},r.set(o,a)),a}function n(o){r.delete(o)}function i(o,a,l){r.get(o)[a]=l}function s(){r=new WeakMap}return{has:e,get:t,remove:n,update:i,dispose:s}}function oy(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.material.id!==e.material.id?r.material.id-e.material.id:r.z!==e.z?r.z-e.z:r.id-e.id}function Hh(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.z!==e.z?e.z-r.z:r.id-e.id}function Vh(){const r=[];let e=0;const t=[],n=[],i=[];function s(){e=0,t.length=0,n.length=0,i.length=0}function o(h,f,d,g,_,m){let p=r[e];return p===void 0?(p={id:h.id,object:h,geometry:f,material:d,groupOrder:g,renderOrder:h.renderOrder,z:_,group:m},r[e]=p):(p.id=h.id,p.object=h,p.geometry=f,p.material=d,p.groupOrder=g,p.renderOrder=h.renderOrder,p.z=_,p.group=m),e++,p}function a(h,f,d,g,_,m){const p=o(h,f,d,g,_,m);d.transmission>0?n.push(p):d.transparent===!0?i.push(p):t.push(p)}function l(h,f,d,g,_,m){const p=o(h,f,d,g,_,m);d.transmission>0?n.unshift(p):d.transparent===!0?i.unshift(p):t.unshift(p)}function c(h,f){t.length>1&&t.sort(h||oy),n.length>1&&n.sort(f||Hh),i.length>1&&i.sort(f||Hh)}function u(){for(let h=e,f=r.length;h<f;h++){const d=r[h];if(d.id===null)break;d.id=null,d.object=null,d.geometry=null,d.material=null,d.group=null}}return{opaque:t,transmissive:n,transparent:i,init:s,push:a,unshift:l,finish:u,sort:c}}function ay(){let r=new WeakMap;function e(n,i){const s=r.get(n);let o;return s===void 0?(o=new Vh,r.set(n,[o])):i>=s.length?(o=new Vh,s.push(o)):o=s[i],o}function t(){r=new WeakMap}return{get:e,dispose:t}}function ly(){const r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new Z,color:new _t};break;case"SpotLight":t={position:new Z,direction:new Z,color:new _t,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new Z,color:new _t,distance:0,decay:0};break;case"HemisphereLight":t={direction:new Z,skyColor:new _t,groundColor:new _t};break;case"RectAreaLight":t={color:new _t,position:new Z,halfWidth:new Z,halfHeight:new Z};break}return r[e.id]=t,t}}}function cy(){const r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new gt};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new gt};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new gt,shadowCameraNear:1,shadowCameraFar:1e3};break}return r[e.id]=t,t}}}let uy=0;function fy(r,e){return(e.castShadow?2:0)-(r.castShadow?2:0)+(e.map?1:0)-(r.map?1:0)}function hy(r){const e=new ly,t=cy(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new Z);const i=new Z,s=new Gt,o=new Gt;function a(c){let u=0,h=0,f=0;for(let x=0;x<9;x++)n.probe[x].set(0,0,0);let d=0,g=0,_=0,m=0,p=0,M=0,y=0,v=0,A=0,C=0,w=0;c.sort(fy);for(let x=0,S=c.length;x<S;x++){const P=c[x],I=P.color,O=P.intensity,q=P.distance,W=P.shadow&&P.shadow.map?P.shadow.map.texture:null;if(P.isAmbientLight)u+=I.r*O,h+=I.g*O,f+=I.b*O;else if(P.isLightProbe){for(let V=0;V<9;V++)n.probe[V].addScaledVector(P.sh.coefficients[V],O);w++}else if(P.isDirectionalLight){const V=e.get(P);if(V.color.copy(P.color).multiplyScalar(P.intensity),P.castShadow){const X=P.shadow,z=t.get(P);z.shadowIntensity=X.intensity,z.shadowBias=X.bias,z.shadowNormalBias=X.normalBias,z.shadowRadius=X.radius,z.shadowMapSize=X.mapSize,n.directionalShadow[d]=z,n.directionalShadowMap[d]=W,n.directionalShadowMatrix[d]=P.shadow.matrix,M++}n.directional[d]=V,d++}else if(P.isSpotLight){const V=e.get(P);V.position.setFromMatrixPosition(P.matrixWorld),V.color.copy(I).multiplyScalar(O),V.distance=q,V.coneCos=Math.cos(P.angle),V.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),V.decay=P.decay,n.spot[_]=V;const X=P.shadow;if(P.map&&(n.spotLightMap[A]=P.map,A++,X.updateMatrices(P),P.castShadow&&C++),n.spotLightMatrix[_]=X.matrix,P.castShadow){const z=t.get(P);z.shadowIntensity=X.intensity,z.shadowBias=X.bias,z.shadowNormalBias=X.normalBias,z.shadowRadius=X.radius,z.shadowMapSize=X.mapSize,n.spotShadow[_]=z,n.spotShadowMap[_]=W,v++}_++}else if(P.isRectAreaLight){const V=e.get(P);V.color.copy(I).multiplyScalar(O),V.halfWidth.set(P.width*.5,0,0),V.halfHeight.set(0,P.height*.5,0),n.rectArea[m]=V,m++}else if(P.isPointLight){const V=e.get(P);if(V.color.copy(P.color).multiplyScalar(P.intensity),V.distance=P.distance,V.decay=P.decay,P.castShadow){const X=P.shadow,z=t.get(P);z.shadowIntensity=X.intensity,z.shadowBias=X.bias,z.shadowNormalBias=X.normalBias,z.shadowRadius=X.radius,z.shadowMapSize=X.mapSize,z.shadowCameraNear=X.camera.near,z.shadowCameraFar=X.camera.far,n.pointShadow[g]=z,n.pointShadowMap[g]=W,n.pointShadowMatrix[g]=P.shadow.matrix,y++}n.point[g]=V,g++}else if(P.isHemisphereLight){const V=e.get(P);V.skyColor.copy(P.color).multiplyScalar(O),V.groundColor.copy(P.groundColor).multiplyScalar(O),n.hemi[p]=V,p++}}m>0&&(r.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=ve.LTC_FLOAT_1,n.rectAreaLTC2=ve.LTC_FLOAT_2):(n.rectAreaLTC1=ve.LTC_HALF_1,n.rectAreaLTC2=ve.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=h,n.ambient[2]=f;const E=n.hash;(E.directionalLength!==d||E.pointLength!==g||E.spotLength!==_||E.rectAreaLength!==m||E.hemiLength!==p||E.numDirectionalShadows!==M||E.numPointShadows!==y||E.numSpotShadows!==v||E.numSpotMaps!==A||E.numLightProbes!==w)&&(n.directional.length=d,n.spot.length=_,n.rectArea.length=m,n.point.length=g,n.hemi.length=p,n.directionalShadow.length=M,n.directionalShadowMap.length=M,n.pointShadow.length=y,n.pointShadowMap.length=y,n.spotShadow.length=v,n.spotShadowMap.length=v,n.directionalShadowMatrix.length=M,n.pointShadowMatrix.length=y,n.spotLightMatrix.length=v+A-C,n.spotLightMap.length=A,n.numSpotLightShadowsWithMaps=C,n.numLightProbes=w,E.directionalLength=d,E.pointLength=g,E.spotLength=_,E.rectAreaLength=m,E.hemiLength=p,E.numDirectionalShadows=M,E.numPointShadows=y,E.numSpotShadows=v,E.numSpotMaps=A,E.numLightProbes=w,n.version=uy++)}function l(c,u){let h=0,f=0,d=0,g=0,_=0;const m=u.matrixWorldInverse;for(let p=0,M=c.length;p<M;p++){const y=c[p];if(y.isDirectionalLight){const v=n.directional[h];v.direction.setFromMatrixPosition(y.matrixWorld),i.setFromMatrixPosition(y.target.matrixWorld),v.direction.sub(i),v.direction.transformDirection(m),h++}else if(y.isSpotLight){const v=n.spot[d];v.position.setFromMatrixPosition(y.matrixWorld),v.position.applyMatrix4(m),v.direction.setFromMatrixPosition(y.matrixWorld),i.setFromMatrixPosition(y.target.matrixWorld),v.direction.sub(i),v.direction.transformDirection(m),d++}else if(y.isRectAreaLight){const v=n.rectArea[g];v.position.setFromMatrixPosition(y.matrixWorld),v.position.applyMatrix4(m),o.identity(),s.copy(y.matrixWorld),s.premultiply(m),o.extractRotation(s),v.halfWidth.set(y.width*.5,0,0),v.halfHeight.set(0,y.height*.5,0),v.halfWidth.applyMatrix4(o),v.halfHeight.applyMatrix4(o),g++}else if(y.isPointLight){const v=n.point[f];v.position.setFromMatrixPosition(y.matrixWorld),v.position.applyMatrix4(m),f++}else if(y.isHemisphereLight){const v=n.hemi[_];v.direction.setFromMatrixPosition(y.matrixWorld),v.direction.transformDirection(m),_++}}}return{setup:a,setupView:l,state:n}}function Gh(r){const e=new hy(r),t=[],n=[];function i(u){c.camera=u,t.length=0,n.length=0}function s(u){t.push(u)}function o(u){n.push(u)}function a(){e.setup(t)}function l(u){e.setupView(t,u)}const c={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:i,state:c,setupLights:a,setupLightsView:l,pushLight:s,pushShadow:o}}function dy(r){let e=new WeakMap;function t(i,s=0){const o=e.get(i);let a;return o===void 0?(a=new Gh(r),e.set(i,[a])):s>=o.length?(a=new Gh(r),o.push(a)):a=o[s],a}function n(){e=new WeakMap}return{get:t,dispose:n}}const py=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,my=`uniform sampler2D shadow_pass;
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
}`;function _y(r,e,t){let n=new Ep;const i=new gt,s=new gt,o=new Ft,a=new Wg({depthPacking:tg}),l=new Xg,c={},u=t.maxTextureSize,h={[yr]:Cn,[Cn]:yr,[Mi]:Mi},f=new Zi({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new gt},radius:{value:4}},vertexShader:py,fragmentShader:my}),d=f.clone();d.defines.HORIZONTAL_PASS=1;const g=new us;g.setAttribute("position",new Ci(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new Ti(g,f),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Jd;let p=this.type;this.render=function(C,w,E){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||C.length===0)return;const x=r.getRenderTarget(),S=r.getActiveCubeFace(),P=r.getActiveMipmapLevel(),I=r.state;I.setBlending(mr),I.buffers.color.setClear(1,1,1,1),I.buffers.depth.setTest(!0),I.setScissorTest(!1);const O=p!==Bi&&this.type===Bi,q=p===Bi&&this.type!==Bi;for(let W=0,V=C.length;W<V;W++){const X=C[W],z=X.shadow;if(z===void 0){console.warn("THREE.WebGLShadowMap:",X,"has no shadow.");continue}if(z.autoUpdate===!1&&z.needsUpdate===!1)continue;i.copy(z.mapSize);const re=z.getFrameExtents();if(i.multiply(re),s.copy(z.mapSize),(i.x>u||i.y>u)&&(i.x>u&&(s.x=Math.floor(u/re.x),i.x=s.x*re.x,z.mapSize.x=s.x),i.y>u&&(s.y=Math.floor(u/re.y),i.y=s.y*re.y,z.mapSize.y=s.y)),z.map===null||O===!0||q===!0){const ae=this.type!==Bi?{minFilter:mi,magFilter:mi}:{};z.map!==null&&z.map.dispose(),z.map=new ss(i.x,i.y,ae),z.map.texture.name=X.name+".shadowMap",z.camera.updateProjectionMatrix()}r.setRenderTarget(z.map),r.clear();const D=z.getViewportCount();for(let ae=0;ae<D;ae++){const Le=z.getViewport(ae);o.set(s.x*Le.x,s.y*Le.y,s.x*Le.z,s.y*Le.w),I.viewport(o),z.updateMatrices(X,ae),n=z.getFrustum(),v(w,E,z.camera,X,this.type)}z.isPointLightShadow!==!0&&this.type===Bi&&M(z,E),z.needsUpdate=!1}p=this.type,m.needsUpdate=!1,r.setRenderTarget(x,S,P)};function M(C,w){const E=e.update(_);f.defines.VSM_SAMPLES!==C.blurSamples&&(f.defines.VSM_SAMPLES=C.blurSamples,d.defines.VSM_SAMPLES=C.blurSamples,f.needsUpdate=!0,d.needsUpdate=!0),C.mapPass===null&&(C.mapPass=new ss(i.x,i.y)),f.uniforms.shadow_pass.value=C.map.texture,f.uniforms.resolution.value=C.mapSize,f.uniforms.radius.value=C.radius,r.setRenderTarget(C.mapPass),r.clear(),r.renderBufferDirect(w,null,E,f,_,null),d.uniforms.shadow_pass.value=C.mapPass.texture,d.uniforms.resolution.value=C.mapSize,d.uniforms.radius.value=C.radius,r.setRenderTarget(C.map),r.clear(),r.renderBufferDirect(w,null,E,d,_,null)}function y(C,w,E,x){let S=null;const P=E.isPointLight===!0?C.customDistanceMaterial:C.customDepthMaterial;if(P!==void 0)S=P;else if(S=E.isPointLight===!0?l:a,r.localClippingEnabled&&w.clipShadows===!0&&Array.isArray(w.clippingPlanes)&&w.clippingPlanes.length!==0||w.displacementMap&&w.displacementScale!==0||w.alphaMap&&w.alphaTest>0||w.map&&w.alphaTest>0){const I=S.uuid,O=w.uuid;let q=c[I];q===void 0&&(q={},c[I]=q);let W=q[O];W===void 0&&(W=S.clone(),q[O]=W,w.addEventListener("dispose",A)),S=W}if(S.visible=w.visible,S.wireframe=w.wireframe,x===Bi?S.side=w.shadowSide!==null?w.shadowSide:w.side:S.side=w.shadowSide!==null?w.shadowSide:h[w.side],S.alphaMap=w.alphaMap,S.alphaTest=w.alphaTest,S.map=w.map,S.clipShadows=w.clipShadows,S.clippingPlanes=w.clippingPlanes,S.clipIntersection=w.clipIntersection,S.displacementMap=w.displacementMap,S.displacementScale=w.displacementScale,S.displacementBias=w.displacementBias,S.wireframeLinewidth=w.wireframeLinewidth,S.linewidth=w.linewidth,E.isPointLight===!0&&S.isMeshDistanceMaterial===!0){const I=r.properties.get(S);I.light=E}return S}function v(C,w,E,x,S){if(C.visible===!1)return;if(C.layers.test(w.layers)&&(C.isMesh||C.isLine||C.isPoints)&&(C.castShadow||C.receiveShadow&&S===Bi)&&(!C.frustumCulled||n.intersectsObject(C))){C.modelViewMatrix.multiplyMatrices(E.matrixWorldInverse,C.matrixWorld);const O=e.update(C),q=C.material;if(Array.isArray(q)){const W=O.groups;for(let V=0,X=W.length;V<X;V++){const z=W[V],re=q[z.materialIndex];if(re&&re.visible){const D=y(C,re,x,S);C.onBeforeShadow(r,C,w,E,O,D,z),r.renderBufferDirect(E,null,O,D,C,z),C.onAfterShadow(r,C,w,E,O,D,z)}}}else if(q.visible){const W=y(C,q,x,S);C.onBeforeShadow(r,C,w,E,O,W,null),r.renderBufferDirect(E,null,O,W,C,null),C.onAfterShadow(r,C,w,E,O,W,null)}}const I=C.children;for(let O=0,q=I.length;O<q;O++)v(I[O],w,E,x,S)}function A(C){C.target.removeEventListener("dispose",A);for(const E in c){const x=c[E],S=C.target.uuid;S in x&&(x[S].dispose(),delete x[S])}}}const gy={[Xc]:Yc,[qc]:Zc,[$c]:jc,[Qs]:Kc,[Yc]:Xc,[Zc]:qc,[jc]:$c,[Kc]:Qs};function vy(r,e){function t(){let U=!1;const fe=new Ft;let K=null;const J=new Ft(0,0,0,0);return{setMask:function(ue){K!==ue&&!U&&(r.colorMask(ue,ue,ue,ue),K=ue)},setLocked:function(ue){U=ue},setClear:function(ue,de,Ge,ct,Dt){Dt===!0&&(ue*=ct,de*=ct,Ge*=ct),fe.set(ue,de,Ge,ct),J.equals(fe)===!1&&(r.clearColor(ue,de,Ge,ct),J.copy(fe))},reset:function(){U=!1,K=null,J.set(-1,0,0,0)}}}function n(){let U=!1,fe=!1,K=null,J=null,ue=null;return{setReversed:function(de){if(fe!==de){const Ge=e.get("EXT_clip_control");fe?Ge.clipControlEXT(Ge.LOWER_LEFT_EXT,Ge.ZERO_TO_ONE_EXT):Ge.clipControlEXT(Ge.LOWER_LEFT_EXT,Ge.NEGATIVE_ONE_TO_ONE_EXT);const ct=ue;ue=null,this.setClear(ct)}fe=de},getReversed:function(){return fe},setTest:function(de){de?se(r.DEPTH_TEST):we(r.DEPTH_TEST)},setMask:function(de){K!==de&&!U&&(r.depthMask(de),K=de)},setFunc:function(de){if(fe&&(de=gy[de]),J!==de){switch(de){case Xc:r.depthFunc(r.NEVER);break;case Yc:r.depthFunc(r.ALWAYS);break;case qc:r.depthFunc(r.LESS);break;case Qs:r.depthFunc(r.LEQUAL);break;case $c:r.depthFunc(r.EQUAL);break;case Kc:r.depthFunc(r.GEQUAL);break;case Zc:r.depthFunc(r.GREATER);break;case jc:r.depthFunc(r.NOTEQUAL);break;default:r.depthFunc(r.LEQUAL)}J=de}},setLocked:function(de){U=de},setClear:function(de){ue!==de&&(fe&&(de=1-de),r.clearDepth(de),ue=de)},reset:function(){U=!1,K=null,J=null,ue=null,fe=!1}}}function i(){let U=!1,fe=null,K=null,J=null,ue=null,de=null,Ge=null,ct=null,Dt=null;return{setTest:function(xe){U||(xe?se(r.STENCIL_TEST):we(r.STENCIL_TEST))},setMask:function(xe){fe!==xe&&!U&&(r.stencilMask(xe),fe=xe)},setFunc:function(xe,Re,Ke){(K!==xe||J!==Re||ue!==Ke)&&(r.stencilFunc(xe,Re,Ke),K=xe,J=Re,ue=Ke)},setOp:function(xe,Re,Ke){(de!==xe||Ge!==Re||ct!==Ke)&&(r.stencilOp(xe,Re,Ke),de=xe,Ge=Re,ct=Ke)},setLocked:function(xe){U=xe},setClear:function(xe){Dt!==xe&&(r.clearStencil(xe),Dt=xe)},reset:function(){U=!1,fe=null,K=null,J=null,ue=null,de=null,Ge=null,ct=null,Dt=null}}}const s=new t,o=new n,a=new i,l=new WeakMap,c=new WeakMap;let u={},h={},f=new WeakMap,d=[],g=null,_=!1,m=null,p=null,M=null,y=null,v=null,A=null,C=null,w=new _t(0,0,0),E=0,x=!1,S=null,P=null,I=null,O=null,q=null;const W=r.getParameter(r.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let V=!1,X=0;const z=r.getParameter(r.VERSION);z.indexOf("WebGL")!==-1?(X=parseFloat(/^WebGL (\d)/.exec(z)[1]),V=X>=1):z.indexOf("OpenGL ES")!==-1&&(X=parseFloat(/^OpenGL ES (\d)/.exec(z)[1]),V=X>=2);let re=null,D={};const ae=r.getParameter(r.SCISSOR_BOX),Le=r.getParameter(r.VIEWPORT),ke=new Ft().fromArray(ae),$=new Ft().fromArray(Le);function ne(U,fe,K,J){const ue=new Uint8Array(4),de=r.createTexture();r.bindTexture(U,de),r.texParameteri(U,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(U,r.TEXTURE_MAG_FILTER,r.NEAREST);for(let Ge=0;Ge<K;Ge++)U===r.TEXTURE_3D||U===r.TEXTURE_2D_ARRAY?r.texImage3D(fe,0,r.RGBA,1,1,J,0,r.RGBA,r.UNSIGNED_BYTE,ue):r.texImage2D(fe+Ge,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,ue);return de}const pe={};pe[r.TEXTURE_2D]=ne(r.TEXTURE_2D,r.TEXTURE_2D,1),pe[r.TEXTURE_CUBE_MAP]=ne(r.TEXTURE_CUBE_MAP,r.TEXTURE_CUBE_MAP_POSITIVE_X,6),pe[r.TEXTURE_2D_ARRAY]=ne(r.TEXTURE_2D_ARRAY,r.TEXTURE_2D_ARRAY,1,1),pe[r.TEXTURE_3D]=ne(r.TEXTURE_3D,r.TEXTURE_3D,1,1),s.setClear(0,0,0,1),o.setClear(1),a.setClear(0),se(r.DEPTH_TEST),o.setFunc(Qs),Ve(!1),B(Kf),se(r.CULL_FACE),L(mr);function se(U){u[U]!==!0&&(r.enable(U),u[U]=!0)}function we(U){u[U]!==!1&&(r.disable(U),u[U]=!1)}function Be(U,fe){return h[U]!==fe?(r.bindFramebuffer(U,fe),h[U]=fe,U===r.DRAW_FRAMEBUFFER&&(h[r.FRAMEBUFFER]=fe),U===r.FRAMEBUFFER&&(h[r.DRAW_FRAMEBUFFER]=fe),!0):!1}function ye(U,fe){let K=d,J=!1;if(U){K=f.get(fe),K===void 0&&(K=[],f.set(fe,K));const ue=U.textures;if(K.length!==ue.length||K[0]!==r.COLOR_ATTACHMENT0){for(let de=0,Ge=ue.length;de<Ge;de++)K[de]=r.COLOR_ATTACHMENT0+de;K.length=ue.length,J=!0}}else K[0]!==r.BACK&&(K[0]=r.BACK,J=!0);J&&r.drawBuffers(K)}function rt(U){return g!==U?(r.useProgram(U),g=U,!0):!1}const et={[Gr]:r.FUNC_ADD,[A_]:r.FUNC_SUBTRACT,[C_]:r.FUNC_REVERSE_SUBTRACT};et[R_]=r.MIN,et[P_]=r.MAX;const Ee={[D_]:r.ZERO,[L_]:r.ONE,[U_]:r.SRC_COLOR,[Gc]:r.SRC_ALPHA,[z_]:r.SRC_ALPHA_SATURATE,[O_]:r.DST_COLOR,[N_]:r.DST_ALPHA,[I_]:r.ONE_MINUS_SRC_COLOR,[Wc]:r.ONE_MINUS_SRC_ALPHA,[B_]:r.ONE_MINUS_DST_COLOR,[F_]:r.ONE_MINUS_DST_ALPHA,[k_]:r.CONSTANT_COLOR,[H_]:r.ONE_MINUS_CONSTANT_COLOR,[V_]:r.CONSTANT_ALPHA,[G_]:r.ONE_MINUS_CONSTANT_ALPHA};function L(U,fe,K,J,ue,de,Ge,ct,Dt,xe){if(U===mr){_===!0&&(we(r.BLEND),_=!1);return}if(_===!1&&(se(r.BLEND),_=!0),U!==w_){if(U!==m||xe!==x){if((p!==Gr||v!==Gr)&&(r.blendEquation(r.FUNC_ADD),p=Gr,v=Gr),xe)switch(U){case Vs:r.blendFuncSeparate(r.ONE,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case Zf:r.blendFunc(r.ONE,r.ONE);break;case jf:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case Jf:r.blendFuncSeparate(r.ZERO,r.SRC_COLOR,r.ZERO,r.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",U);break}else switch(U){case Vs:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case Zf:r.blendFunc(r.SRC_ALPHA,r.ONE);break;case jf:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case Jf:r.blendFunc(r.ZERO,r.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",U);break}M=null,y=null,A=null,C=null,w.set(0,0,0),E=0,m=U,x=xe}return}ue=ue||fe,de=de||K,Ge=Ge||J,(fe!==p||ue!==v)&&(r.blendEquationSeparate(et[fe],et[ue]),p=fe,v=ue),(K!==M||J!==y||de!==A||Ge!==C)&&(r.blendFuncSeparate(Ee[K],Ee[J],Ee[de],Ee[Ge]),M=K,y=J,A=de,C=Ge),(ct.equals(w)===!1||Dt!==E)&&(r.blendColor(ct.r,ct.g,ct.b,Dt),w.copy(ct),E=Dt),m=U,x=!1}function xt(U,fe){U.side===Mi?we(r.CULL_FACE):se(r.CULL_FACE);let K=U.side===Cn;fe&&(K=!K),Ve(K),U.blending===Vs&&U.transparent===!1?L(mr):L(U.blending,U.blendEquation,U.blendSrc,U.blendDst,U.blendEquationAlpha,U.blendSrcAlpha,U.blendDstAlpha,U.blendColor,U.blendAlpha,U.premultipliedAlpha),o.setFunc(U.depthFunc),o.setTest(U.depthTest),o.setMask(U.depthWrite),s.setMask(U.colorWrite);const J=U.stencilWrite;a.setTest(J),J&&(a.setMask(U.stencilWriteMask),a.setFunc(U.stencilFunc,U.stencilRef,U.stencilFuncMask),a.setOp(U.stencilFail,U.stencilZFail,U.stencilZPass)),st(U.polygonOffset,U.polygonOffsetFactor,U.polygonOffsetUnits),U.alphaToCoverage===!0?se(r.SAMPLE_ALPHA_TO_COVERAGE):we(r.SAMPLE_ALPHA_TO_COVERAGE)}function Ve(U){S!==U&&(U?r.frontFace(r.CW):r.frontFace(r.CCW),S=U)}function B(U){U!==E_?(se(r.CULL_FACE),U!==P&&(U===Kf?r.cullFace(r.BACK):U===b_?r.cullFace(r.FRONT):r.cullFace(r.FRONT_AND_BACK))):we(r.CULL_FACE),P=U}function Te(U){U!==I&&(V&&r.lineWidth(U),I=U)}function st(U,fe,K){U?(se(r.POLYGON_OFFSET_FILL),(O!==fe||q!==K)&&(r.polygonOffset(fe,K),O=fe,q=K)):we(r.POLYGON_OFFSET_FILL)}function Ce(U){U?se(r.SCISSOR_TEST):we(r.SCISSOR_TEST)}function R(U){U===void 0&&(U=r.TEXTURE0+W-1),re!==U&&(r.activeTexture(U),re=U)}function b(U,fe,K){K===void 0&&(re===null?K=r.TEXTURE0+W-1:K=re);let J=D[K];J===void 0&&(J={type:void 0,texture:void 0},D[K]=J),(J.type!==U||J.texture!==fe)&&(re!==K&&(r.activeTexture(K),re=K),r.bindTexture(U,fe||pe[U]),J.type=U,J.texture=fe)}function k(){const U=D[re];U!==void 0&&U.type!==void 0&&(r.bindTexture(U.type,null),U.type=void 0,U.texture=void 0)}function ee(){try{r.compressedTexImage2D.apply(r,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Q(){try{r.compressedTexImage3D.apply(r,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function j(){try{r.texSubImage2D.apply(r,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function he(){try{r.texSubImage3D.apply(r,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function ce(){try{r.compressedTexSubImage2D.apply(r,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function me(){try{r.compressedTexSubImage3D.apply(r,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Ye(){try{r.texStorage2D.apply(r,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function oe(){try{r.texStorage3D.apply(r,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function le(){try{r.texImage2D.apply(r,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Fe(){try{r.texImage3D.apply(r,arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Ne(U){ke.equals(U)===!1&&(r.scissor(U.x,U.y,U.z,U.w),ke.copy(U))}function Se(U){$.equals(U)===!1&&(r.viewport(U.x,U.y,U.z,U.w),$.copy(U))}function $e(U,fe){let K=c.get(fe);K===void 0&&(K=new WeakMap,c.set(fe,K));let J=K.get(U);J===void 0&&(J=r.getUniformBlockIndex(fe,U.name),K.set(U,J))}function He(U,fe){const J=c.get(fe).get(U);l.get(fe)!==J&&(r.uniformBlockBinding(fe,J,U.__bindingPointIndex),l.set(fe,J))}function lt(){r.disable(r.BLEND),r.disable(r.CULL_FACE),r.disable(r.DEPTH_TEST),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.disable(r.SAMPLE_ALPHA_TO_COVERAGE),r.blendEquation(r.FUNC_ADD),r.blendFunc(r.ONE,r.ZERO),r.blendFuncSeparate(r.ONE,r.ZERO,r.ONE,r.ZERO),r.blendColor(0,0,0,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(r.LESS),o.setReversed(!1),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(r.ALWAYS,0,4294967295),r.stencilOp(r.KEEP,r.KEEP,r.KEEP),r.clearStencil(0),r.cullFace(r.BACK),r.frontFace(r.CCW),r.polygonOffset(0,0),r.activeTexture(r.TEXTURE0),r.bindFramebuffer(r.FRAMEBUFFER,null),r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),r.bindFramebuffer(r.READ_FRAMEBUFFER,null),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),u={},re=null,D={},h={},f=new WeakMap,d=[],g=null,_=!1,m=null,p=null,M=null,y=null,v=null,A=null,C=null,w=new _t(0,0,0),E=0,x=!1,S=null,P=null,I=null,O=null,q=null,ke.set(0,0,r.canvas.width,r.canvas.height),$.set(0,0,r.canvas.width,r.canvas.height),s.reset(),o.reset(),a.reset()}return{buffers:{color:s,depth:o,stencil:a},enable:se,disable:we,bindFramebuffer:Be,drawBuffers:ye,useProgram:rt,setBlending:L,setMaterial:xt,setFlipSided:Ve,setCullFace:B,setLineWidth:Te,setPolygonOffset:st,setScissorTest:Ce,activeTexture:R,bindTexture:b,unbindTexture:k,compressedTexImage2D:ee,compressedTexImage3D:Q,texImage2D:le,texImage3D:Fe,updateUBOMapping:$e,uniformBlockBinding:He,texStorage2D:Ye,texStorage3D:oe,texSubImage2D:j,texSubImage3D:he,compressedTexSubImage2D:ce,compressedTexSubImage3D:me,scissor:Ne,viewport:Se,reset:lt}}function xy(r,e,t,n,i,s,o){const a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new gt,u=new WeakMap;let h;const f=new WeakMap;let d=!1;try{d=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(R,b){return d?new OffscreenCanvas(R,b):bl("canvas")}function _(R,b,k){let ee=1;const Q=Ce(R);if((Q.width>k||Q.height>k)&&(ee=k/Math.max(Q.width,Q.height)),ee<1)if(typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&R instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&R instanceof ImageBitmap||typeof VideoFrame<"u"&&R instanceof VideoFrame){const j=Math.floor(ee*Q.width),he=Math.floor(ee*Q.height);h===void 0&&(h=g(j,he));const ce=b?g(j,he):h;return ce.width=j,ce.height=he,ce.getContext("2d").drawImage(R,0,0,j,he),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+Q.width+"x"+Q.height+") to ("+j+"x"+he+")."),ce}else return"data"in R&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+Q.width+"x"+Q.height+")."),R;return R}function m(R){return R.generateMipmaps}function p(R){r.generateMipmap(R)}function M(R){return R.isWebGLCubeRenderTarget?r.TEXTURE_CUBE_MAP:R.isWebGL3DRenderTarget?r.TEXTURE_3D:R.isWebGLArrayRenderTarget||R.isCompressedArrayTexture?r.TEXTURE_2D_ARRAY:r.TEXTURE_2D}function y(R,b,k,ee,Q=!1){if(R!==null){if(r[R]!==void 0)return r[R];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+R+"'")}let j=b;if(b===r.RED&&(k===r.FLOAT&&(j=r.R32F),k===r.HALF_FLOAT&&(j=r.R16F),k===r.UNSIGNED_BYTE&&(j=r.R8)),b===r.RED_INTEGER&&(k===r.UNSIGNED_BYTE&&(j=r.R8UI),k===r.UNSIGNED_SHORT&&(j=r.R16UI),k===r.UNSIGNED_INT&&(j=r.R32UI),k===r.BYTE&&(j=r.R8I),k===r.SHORT&&(j=r.R16I),k===r.INT&&(j=r.R32I)),b===r.RG&&(k===r.FLOAT&&(j=r.RG32F),k===r.HALF_FLOAT&&(j=r.RG16F),k===r.UNSIGNED_BYTE&&(j=r.RG8)),b===r.RG_INTEGER&&(k===r.UNSIGNED_BYTE&&(j=r.RG8UI),k===r.UNSIGNED_SHORT&&(j=r.RG16UI),k===r.UNSIGNED_INT&&(j=r.RG32UI),k===r.BYTE&&(j=r.RG8I),k===r.SHORT&&(j=r.RG16I),k===r.INT&&(j=r.RG32I)),b===r.RGB_INTEGER&&(k===r.UNSIGNED_BYTE&&(j=r.RGB8UI),k===r.UNSIGNED_SHORT&&(j=r.RGB16UI),k===r.UNSIGNED_INT&&(j=r.RGB32UI),k===r.BYTE&&(j=r.RGB8I),k===r.SHORT&&(j=r.RGB16I),k===r.INT&&(j=r.RGB32I)),b===r.RGBA_INTEGER&&(k===r.UNSIGNED_BYTE&&(j=r.RGBA8UI),k===r.UNSIGNED_SHORT&&(j=r.RGBA16UI),k===r.UNSIGNED_INT&&(j=r.RGBA32UI),k===r.BYTE&&(j=r.RGBA8I),k===r.SHORT&&(j=r.RGBA16I),k===r.INT&&(j=r.RGBA32I)),b===r.RGB&&k===r.UNSIGNED_INT_5_9_9_9_REV&&(j=r.RGB9_E5),b===r.RGBA){const he=Q?Ml:ft.getTransfer(ee);k===r.FLOAT&&(j=r.RGBA32F),k===r.HALF_FLOAT&&(j=r.RGBA16F),k===r.UNSIGNED_BYTE&&(j=he===vt?r.SRGB8_ALPHA8:r.RGBA8),k===r.UNSIGNED_SHORT_4_4_4_4&&(j=r.RGBA4),k===r.UNSIGNED_SHORT_5_5_5_1&&(j=r.RGB5_A1)}return(j===r.R16F||j===r.R32F||j===r.RG16F||j===r.RG32F||j===r.RGBA16F||j===r.RGBA32F)&&e.get("EXT_color_buffer_float"),j}function v(R,b){let k;return R?b===null||b===rs||b===no?k=r.DEPTH24_STENCIL8:b===Vi?k=r.DEPTH32F_STENCIL8:b===ia&&(k=r.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):b===null||b===rs||b===no?k=r.DEPTH_COMPONENT24:b===Vi?k=r.DEPTH_COMPONENT32F:b===ia&&(k=r.DEPTH_COMPONENT16),k}function A(R,b){return m(R)===!0||R.isFramebufferTexture&&R.minFilter!==mi&&R.minFilter!==bi?Math.log2(Math.max(b.width,b.height))+1:R.mipmaps!==void 0&&R.mipmaps.length>0?R.mipmaps.length:R.isCompressedTexture&&Array.isArray(R.image)?b.mipmaps.length:1}function C(R){const b=R.target;b.removeEventListener("dispose",C),E(b),b.isVideoTexture&&u.delete(b)}function w(R){const b=R.target;b.removeEventListener("dispose",w),S(b)}function E(R){const b=n.get(R);if(b.__webglInit===void 0)return;const k=R.source,ee=f.get(k);if(ee){const Q=ee[b.__cacheKey];Q.usedTimes--,Q.usedTimes===0&&x(R),Object.keys(ee).length===0&&f.delete(k)}n.remove(R)}function x(R){const b=n.get(R);r.deleteTexture(b.__webglTexture);const k=R.source,ee=f.get(k);delete ee[b.__cacheKey],o.memory.textures--}function S(R){const b=n.get(R);if(R.depthTexture&&(R.depthTexture.dispose(),n.remove(R.depthTexture)),R.isWebGLCubeRenderTarget)for(let ee=0;ee<6;ee++){if(Array.isArray(b.__webglFramebuffer[ee]))for(let Q=0;Q<b.__webglFramebuffer[ee].length;Q++)r.deleteFramebuffer(b.__webglFramebuffer[ee][Q]);else r.deleteFramebuffer(b.__webglFramebuffer[ee]);b.__webglDepthbuffer&&r.deleteRenderbuffer(b.__webglDepthbuffer[ee])}else{if(Array.isArray(b.__webglFramebuffer))for(let ee=0;ee<b.__webglFramebuffer.length;ee++)r.deleteFramebuffer(b.__webglFramebuffer[ee]);else r.deleteFramebuffer(b.__webglFramebuffer);if(b.__webglDepthbuffer&&r.deleteRenderbuffer(b.__webglDepthbuffer),b.__webglMultisampledFramebuffer&&r.deleteFramebuffer(b.__webglMultisampledFramebuffer),b.__webglColorRenderbuffer)for(let ee=0;ee<b.__webglColorRenderbuffer.length;ee++)b.__webglColorRenderbuffer[ee]&&r.deleteRenderbuffer(b.__webglColorRenderbuffer[ee]);b.__webglDepthRenderbuffer&&r.deleteRenderbuffer(b.__webglDepthRenderbuffer)}const k=R.textures;for(let ee=0,Q=k.length;ee<Q;ee++){const j=n.get(k[ee]);j.__webglTexture&&(r.deleteTexture(j.__webglTexture),o.memory.textures--),n.remove(k[ee])}n.remove(R)}let P=0;function I(){P=0}function O(){const R=P;return R>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+R+" texture units while this GPU supports only "+i.maxTextures),P+=1,R}function q(R){const b=[];return b.push(R.wrapS),b.push(R.wrapT),b.push(R.wrapR||0),b.push(R.magFilter),b.push(R.minFilter),b.push(R.anisotropy),b.push(R.internalFormat),b.push(R.format),b.push(R.type),b.push(R.generateMipmaps),b.push(R.premultiplyAlpha),b.push(R.flipY),b.push(R.unpackAlignment),b.push(R.colorSpace),b.join()}function W(R,b){const k=n.get(R);if(R.isVideoTexture&&Te(R),R.isRenderTargetTexture===!1&&R.version>0&&k.__version!==R.version){const ee=R.image;if(ee===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(ee.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{$(k,R,b);return}}t.bindTexture(r.TEXTURE_2D,k.__webglTexture,r.TEXTURE0+b)}function V(R,b){const k=n.get(R);if(R.version>0&&k.__version!==R.version){$(k,R,b);return}t.bindTexture(r.TEXTURE_2D_ARRAY,k.__webglTexture,r.TEXTURE0+b)}function X(R,b){const k=n.get(R);if(R.version>0&&k.__version!==R.version){$(k,R,b);return}t.bindTexture(r.TEXTURE_3D,k.__webglTexture,r.TEXTURE0+b)}function z(R,b){const k=n.get(R);if(R.version>0&&k.__version!==R.version){ne(k,R,b);return}t.bindTexture(r.TEXTURE_CUBE_MAP,k.__webglTexture,r.TEXTURE0+b)}const re={[eu]:r.REPEAT,[Xr]:r.CLAMP_TO_EDGE,[tu]:r.MIRRORED_REPEAT},D={[mi]:r.NEAREST,[Q_]:r.NEAREST_MIPMAP_NEAREST,[ya]:r.NEAREST_MIPMAP_LINEAR,[bi]:r.LINEAR,[$l]:r.LINEAR_MIPMAP_NEAREST,[Yr]:r.LINEAR_MIPMAP_LINEAR},ae={[rg]:r.NEVER,[ug]:r.ALWAYS,[sg]:r.LESS,[fp]:r.LEQUAL,[og]:r.EQUAL,[cg]:r.GEQUAL,[ag]:r.GREATER,[lg]:r.NOTEQUAL};function Le(R,b){if(b.type===Vi&&e.has("OES_texture_float_linear")===!1&&(b.magFilter===bi||b.magFilter===$l||b.magFilter===ya||b.magFilter===Yr||b.minFilter===bi||b.minFilter===$l||b.minFilter===ya||b.minFilter===Yr)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),r.texParameteri(R,r.TEXTURE_WRAP_S,re[b.wrapS]),r.texParameteri(R,r.TEXTURE_WRAP_T,re[b.wrapT]),(R===r.TEXTURE_3D||R===r.TEXTURE_2D_ARRAY)&&r.texParameteri(R,r.TEXTURE_WRAP_R,re[b.wrapR]),r.texParameteri(R,r.TEXTURE_MAG_FILTER,D[b.magFilter]),r.texParameteri(R,r.TEXTURE_MIN_FILTER,D[b.minFilter]),b.compareFunction&&(r.texParameteri(R,r.TEXTURE_COMPARE_MODE,r.COMPARE_REF_TO_TEXTURE),r.texParameteri(R,r.TEXTURE_COMPARE_FUNC,ae[b.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(b.magFilter===mi||b.minFilter!==ya&&b.minFilter!==Yr||b.type===Vi&&e.has("OES_texture_float_linear")===!1)return;if(b.anisotropy>1||n.get(b).__currentAnisotropy){const k=e.get("EXT_texture_filter_anisotropic");r.texParameterf(R,k.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(b.anisotropy,i.getMaxAnisotropy())),n.get(b).__currentAnisotropy=b.anisotropy}}}function ke(R,b){let k=!1;R.__webglInit===void 0&&(R.__webglInit=!0,b.addEventListener("dispose",C));const ee=b.source;let Q=f.get(ee);Q===void 0&&(Q={},f.set(ee,Q));const j=q(b);if(j!==R.__cacheKey){Q[j]===void 0&&(Q[j]={texture:r.createTexture(),usedTimes:0},o.memory.textures++,k=!0),Q[j].usedTimes++;const he=Q[R.__cacheKey];he!==void 0&&(Q[R.__cacheKey].usedTimes--,he.usedTimes===0&&x(b)),R.__cacheKey=j,R.__webglTexture=Q[j].texture}return k}function $(R,b,k){let ee=r.TEXTURE_2D;(b.isDataArrayTexture||b.isCompressedArrayTexture)&&(ee=r.TEXTURE_2D_ARRAY),b.isData3DTexture&&(ee=r.TEXTURE_3D);const Q=ke(R,b),j=b.source;t.bindTexture(ee,R.__webglTexture,r.TEXTURE0+k);const he=n.get(j);if(j.version!==he.__version||Q===!0){t.activeTexture(r.TEXTURE0+k);const ce=ft.getPrimaries(ft.workingColorSpace),me=b.colorSpace===lr?null:ft.getPrimaries(b.colorSpace),Ye=b.colorSpace===lr||ce===me?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,b.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,b.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ye);let oe=_(b.image,!1,i.maxTextureSize);oe=st(b,oe);const le=s.convert(b.format,b.colorSpace),Fe=s.convert(b.type);let Ne=y(b.internalFormat,le,Fe,b.colorSpace,b.isVideoTexture);Le(ee,b);let Se;const $e=b.mipmaps,He=b.isVideoTexture!==!0,lt=he.__version===void 0||Q===!0,U=j.dataReady,fe=A(b,oe);if(b.isDepthTexture)Ne=v(b.format===io,b.type),lt&&(He?t.texStorage2D(r.TEXTURE_2D,1,Ne,oe.width,oe.height):t.texImage2D(r.TEXTURE_2D,0,Ne,oe.width,oe.height,0,le,Fe,null));else if(b.isDataTexture)if($e.length>0){He&&lt&&t.texStorage2D(r.TEXTURE_2D,fe,Ne,$e[0].width,$e[0].height);for(let K=0,J=$e.length;K<J;K++)Se=$e[K],He?U&&t.texSubImage2D(r.TEXTURE_2D,K,0,0,Se.width,Se.height,le,Fe,Se.data):t.texImage2D(r.TEXTURE_2D,K,Ne,Se.width,Se.height,0,le,Fe,Se.data);b.generateMipmaps=!1}else He?(lt&&t.texStorage2D(r.TEXTURE_2D,fe,Ne,oe.width,oe.height),U&&t.texSubImage2D(r.TEXTURE_2D,0,0,0,oe.width,oe.height,le,Fe,oe.data)):t.texImage2D(r.TEXTURE_2D,0,Ne,oe.width,oe.height,0,le,Fe,oe.data);else if(b.isCompressedTexture)if(b.isCompressedArrayTexture){He&&lt&&t.texStorage3D(r.TEXTURE_2D_ARRAY,fe,Ne,$e[0].width,$e[0].height,oe.depth);for(let K=0,J=$e.length;K<J;K++)if(Se=$e[K],b.format!==pi)if(le!==null)if(He){if(U)if(b.layerUpdates.size>0){const ue=xh(Se.width,Se.height,b.format,b.type);for(const de of b.layerUpdates){const Ge=Se.data.subarray(de*ue/Se.data.BYTES_PER_ELEMENT,(de+1)*ue/Se.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,K,0,0,de,Se.width,Se.height,1,le,Ge)}b.clearLayerUpdates()}else t.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,K,0,0,0,Se.width,Se.height,oe.depth,le,Se.data)}else t.compressedTexImage3D(r.TEXTURE_2D_ARRAY,K,Ne,Se.width,Se.height,oe.depth,0,Se.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else He?U&&t.texSubImage3D(r.TEXTURE_2D_ARRAY,K,0,0,0,Se.width,Se.height,oe.depth,le,Fe,Se.data):t.texImage3D(r.TEXTURE_2D_ARRAY,K,Ne,Se.width,Se.height,oe.depth,0,le,Fe,Se.data)}else{He&&lt&&t.texStorage2D(r.TEXTURE_2D,fe,Ne,$e[0].width,$e[0].height);for(let K=0,J=$e.length;K<J;K++)Se=$e[K],b.format!==pi?le!==null?He?U&&t.compressedTexSubImage2D(r.TEXTURE_2D,K,0,0,Se.width,Se.height,le,Se.data):t.compressedTexImage2D(r.TEXTURE_2D,K,Ne,Se.width,Se.height,0,Se.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):He?U&&t.texSubImage2D(r.TEXTURE_2D,K,0,0,Se.width,Se.height,le,Fe,Se.data):t.texImage2D(r.TEXTURE_2D,K,Ne,Se.width,Se.height,0,le,Fe,Se.data)}else if(b.isDataArrayTexture)if(He){if(lt&&t.texStorage3D(r.TEXTURE_2D_ARRAY,fe,Ne,oe.width,oe.height,oe.depth),U)if(b.layerUpdates.size>0){const K=xh(oe.width,oe.height,b.format,b.type);for(const J of b.layerUpdates){const ue=oe.data.subarray(J*K/oe.data.BYTES_PER_ELEMENT,(J+1)*K/oe.data.BYTES_PER_ELEMENT);t.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,J,oe.width,oe.height,1,le,Fe,ue)}b.clearLayerUpdates()}else t.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,0,oe.width,oe.height,oe.depth,le,Fe,oe.data)}else t.texImage3D(r.TEXTURE_2D_ARRAY,0,Ne,oe.width,oe.height,oe.depth,0,le,Fe,oe.data);else if(b.isData3DTexture)He?(lt&&t.texStorage3D(r.TEXTURE_3D,fe,Ne,oe.width,oe.height,oe.depth),U&&t.texSubImage3D(r.TEXTURE_3D,0,0,0,0,oe.width,oe.height,oe.depth,le,Fe,oe.data)):t.texImage3D(r.TEXTURE_3D,0,Ne,oe.width,oe.height,oe.depth,0,le,Fe,oe.data);else if(b.isFramebufferTexture){if(lt)if(He)t.texStorage2D(r.TEXTURE_2D,fe,Ne,oe.width,oe.height);else{let K=oe.width,J=oe.height;for(let ue=0;ue<fe;ue++)t.texImage2D(r.TEXTURE_2D,ue,Ne,K,J,0,le,Fe,null),K>>=1,J>>=1}}else if($e.length>0){if(He&&lt){const K=Ce($e[0]);t.texStorage2D(r.TEXTURE_2D,fe,Ne,K.width,K.height)}for(let K=0,J=$e.length;K<J;K++)Se=$e[K],He?U&&t.texSubImage2D(r.TEXTURE_2D,K,0,0,le,Fe,Se):t.texImage2D(r.TEXTURE_2D,K,Ne,le,Fe,Se);b.generateMipmaps=!1}else if(He){if(lt){const K=Ce(oe);t.texStorage2D(r.TEXTURE_2D,fe,Ne,K.width,K.height)}U&&t.texSubImage2D(r.TEXTURE_2D,0,0,0,le,Fe,oe)}else t.texImage2D(r.TEXTURE_2D,0,Ne,le,Fe,oe);m(b)&&p(ee),he.__version=j.version,b.onUpdate&&b.onUpdate(b)}R.__version=b.version}function ne(R,b,k){if(b.image.length!==6)return;const ee=ke(R,b),Q=b.source;t.bindTexture(r.TEXTURE_CUBE_MAP,R.__webglTexture,r.TEXTURE0+k);const j=n.get(Q);if(Q.version!==j.__version||ee===!0){t.activeTexture(r.TEXTURE0+k);const he=ft.getPrimaries(ft.workingColorSpace),ce=b.colorSpace===lr?null:ft.getPrimaries(b.colorSpace),me=b.colorSpace===lr||he===ce?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,b.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,b.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,me);const Ye=b.isCompressedTexture||b.image[0].isCompressedTexture,oe=b.image[0]&&b.image[0].isDataTexture,le=[];for(let J=0;J<6;J++)!Ye&&!oe?le[J]=_(b.image[J],!0,i.maxCubemapSize):le[J]=oe?b.image[J].image:b.image[J],le[J]=st(b,le[J]);const Fe=le[0],Ne=s.convert(b.format,b.colorSpace),Se=s.convert(b.type),$e=y(b.internalFormat,Ne,Se,b.colorSpace),He=b.isVideoTexture!==!0,lt=j.__version===void 0||ee===!0,U=Q.dataReady;let fe=A(b,Fe);Le(r.TEXTURE_CUBE_MAP,b);let K;if(Ye){He&&lt&&t.texStorage2D(r.TEXTURE_CUBE_MAP,fe,$e,Fe.width,Fe.height);for(let J=0;J<6;J++){K=le[J].mipmaps;for(let ue=0;ue<K.length;ue++){const de=K[ue];b.format!==pi?Ne!==null?He?U&&t.compressedTexSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+J,ue,0,0,de.width,de.height,Ne,de.data):t.compressedTexImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+J,ue,$e,de.width,de.height,0,de.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):He?U&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+J,ue,0,0,de.width,de.height,Ne,Se,de.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+J,ue,$e,de.width,de.height,0,Ne,Se,de.data)}}}else{if(K=b.mipmaps,He&&lt){K.length>0&&fe++;const J=Ce(le[0]);t.texStorage2D(r.TEXTURE_CUBE_MAP,fe,$e,J.width,J.height)}for(let J=0;J<6;J++)if(oe){He?U&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,0,0,le[J].width,le[J].height,Ne,Se,le[J].data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,$e,le[J].width,le[J].height,0,Ne,Se,le[J].data);for(let ue=0;ue<K.length;ue++){const Ge=K[ue].image[J].image;He?U&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+J,ue+1,0,0,Ge.width,Ge.height,Ne,Se,Ge.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+J,ue+1,$e,Ge.width,Ge.height,0,Ne,Se,Ge.data)}}else{He?U&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,0,0,Ne,Se,le[J]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+J,0,$e,Ne,Se,le[J]);for(let ue=0;ue<K.length;ue++){const de=K[ue];He?U&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+J,ue+1,0,0,Ne,Se,de.image[J]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+J,ue+1,$e,Ne,Se,de.image[J])}}}m(b)&&p(r.TEXTURE_CUBE_MAP),j.__version=Q.version,b.onUpdate&&b.onUpdate(b)}R.__version=b.version}function pe(R,b,k,ee,Q,j){const he=s.convert(k.format,k.colorSpace),ce=s.convert(k.type),me=y(k.internalFormat,he,ce,k.colorSpace),Ye=n.get(b),oe=n.get(k);if(oe.__renderTarget=b,!Ye.__hasExternalTextures){const le=Math.max(1,b.width>>j),Fe=Math.max(1,b.height>>j);Q===r.TEXTURE_3D||Q===r.TEXTURE_2D_ARRAY?t.texImage3D(Q,j,me,le,Fe,b.depth,0,he,ce,null):t.texImage2D(Q,j,me,le,Fe,0,he,ce,null)}t.bindFramebuffer(r.FRAMEBUFFER,R),B(b)?a.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,ee,Q,oe.__webglTexture,0,Ve(b)):(Q===r.TEXTURE_2D||Q>=r.TEXTURE_CUBE_MAP_POSITIVE_X&&Q<=r.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&r.framebufferTexture2D(r.FRAMEBUFFER,ee,Q,oe.__webglTexture,j),t.bindFramebuffer(r.FRAMEBUFFER,null)}function se(R,b,k){if(r.bindRenderbuffer(r.RENDERBUFFER,R),b.depthBuffer){const ee=b.depthTexture,Q=ee&&ee.isDepthTexture?ee.type:null,j=v(b.stencilBuffer,Q),he=b.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,ce=Ve(b);B(b)?a.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,ce,j,b.width,b.height):k?r.renderbufferStorageMultisample(r.RENDERBUFFER,ce,j,b.width,b.height):r.renderbufferStorage(r.RENDERBUFFER,j,b.width,b.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,he,r.RENDERBUFFER,R)}else{const ee=b.textures;for(let Q=0;Q<ee.length;Q++){const j=ee[Q],he=s.convert(j.format,j.colorSpace),ce=s.convert(j.type),me=y(j.internalFormat,he,ce,j.colorSpace),Ye=Ve(b);k&&B(b)===!1?r.renderbufferStorageMultisample(r.RENDERBUFFER,Ye,me,b.width,b.height):B(b)?a.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,Ye,me,b.width,b.height):r.renderbufferStorage(r.RENDERBUFFER,me,b.width,b.height)}}r.bindRenderbuffer(r.RENDERBUFFER,null)}function we(R,b){if(b&&b.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(r.FRAMEBUFFER,R),!(b.depthTexture&&b.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const ee=n.get(b.depthTexture);ee.__renderTarget=b,(!ee.__webglTexture||b.depthTexture.image.width!==b.width||b.depthTexture.image.height!==b.height)&&(b.depthTexture.image.width=b.width,b.depthTexture.image.height=b.height,b.depthTexture.needsUpdate=!0),W(b.depthTexture,0);const Q=ee.__webglTexture,j=Ve(b);if(b.depthTexture.format===Gs)B(b)?a.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,Q,0,j):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,Q,0);else if(b.depthTexture.format===io)B(b)?a.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,Q,0,j):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,Q,0);else throw new Error("Unknown depthTexture format")}function Be(R){const b=n.get(R),k=R.isWebGLCubeRenderTarget===!0;if(b.__boundDepthTexture!==R.depthTexture){const ee=R.depthTexture;if(b.__depthDisposeCallback&&b.__depthDisposeCallback(),ee){const Q=()=>{delete b.__boundDepthTexture,delete b.__depthDisposeCallback,ee.removeEventListener("dispose",Q)};ee.addEventListener("dispose",Q),b.__depthDisposeCallback=Q}b.__boundDepthTexture=ee}if(R.depthTexture&&!b.__autoAllocateDepthBuffer){if(k)throw new Error("target.depthTexture not supported in Cube render targets");we(b.__webglFramebuffer,R)}else if(k){b.__webglDepthbuffer=[];for(let ee=0;ee<6;ee++)if(t.bindFramebuffer(r.FRAMEBUFFER,b.__webglFramebuffer[ee]),b.__webglDepthbuffer[ee]===void 0)b.__webglDepthbuffer[ee]=r.createRenderbuffer(),se(b.__webglDepthbuffer[ee],R,!1);else{const Q=R.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,j=b.__webglDepthbuffer[ee];r.bindRenderbuffer(r.RENDERBUFFER,j),r.framebufferRenderbuffer(r.FRAMEBUFFER,Q,r.RENDERBUFFER,j)}}else if(t.bindFramebuffer(r.FRAMEBUFFER,b.__webglFramebuffer),b.__webglDepthbuffer===void 0)b.__webglDepthbuffer=r.createRenderbuffer(),se(b.__webglDepthbuffer,R,!1);else{const ee=R.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,Q=b.__webglDepthbuffer;r.bindRenderbuffer(r.RENDERBUFFER,Q),r.framebufferRenderbuffer(r.FRAMEBUFFER,ee,r.RENDERBUFFER,Q)}t.bindFramebuffer(r.FRAMEBUFFER,null)}function ye(R,b,k){const ee=n.get(R);b!==void 0&&pe(ee.__webglFramebuffer,R,R.texture,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,0),k!==void 0&&Be(R)}function rt(R){const b=R.texture,k=n.get(R),ee=n.get(b);R.addEventListener("dispose",w);const Q=R.textures,j=R.isWebGLCubeRenderTarget===!0,he=Q.length>1;if(he||(ee.__webglTexture===void 0&&(ee.__webglTexture=r.createTexture()),ee.__version=b.version,o.memory.textures++),j){k.__webglFramebuffer=[];for(let ce=0;ce<6;ce++)if(b.mipmaps&&b.mipmaps.length>0){k.__webglFramebuffer[ce]=[];for(let me=0;me<b.mipmaps.length;me++)k.__webglFramebuffer[ce][me]=r.createFramebuffer()}else k.__webglFramebuffer[ce]=r.createFramebuffer()}else{if(b.mipmaps&&b.mipmaps.length>0){k.__webglFramebuffer=[];for(let ce=0;ce<b.mipmaps.length;ce++)k.__webglFramebuffer[ce]=r.createFramebuffer()}else k.__webglFramebuffer=r.createFramebuffer();if(he)for(let ce=0,me=Q.length;ce<me;ce++){const Ye=n.get(Q[ce]);Ye.__webglTexture===void 0&&(Ye.__webglTexture=r.createTexture(),o.memory.textures++)}if(R.samples>0&&B(R)===!1){k.__webglMultisampledFramebuffer=r.createFramebuffer(),k.__webglColorRenderbuffer=[],t.bindFramebuffer(r.FRAMEBUFFER,k.__webglMultisampledFramebuffer);for(let ce=0;ce<Q.length;ce++){const me=Q[ce];k.__webglColorRenderbuffer[ce]=r.createRenderbuffer(),r.bindRenderbuffer(r.RENDERBUFFER,k.__webglColorRenderbuffer[ce]);const Ye=s.convert(me.format,me.colorSpace),oe=s.convert(me.type),le=y(me.internalFormat,Ye,oe,me.colorSpace,R.isXRRenderTarget===!0),Fe=Ve(R);r.renderbufferStorageMultisample(r.RENDERBUFFER,Fe,le,R.width,R.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+ce,r.RENDERBUFFER,k.__webglColorRenderbuffer[ce])}r.bindRenderbuffer(r.RENDERBUFFER,null),R.depthBuffer&&(k.__webglDepthRenderbuffer=r.createRenderbuffer(),se(k.__webglDepthRenderbuffer,R,!0)),t.bindFramebuffer(r.FRAMEBUFFER,null)}}if(j){t.bindTexture(r.TEXTURE_CUBE_MAP,ee.__webglTexture),Le(r.TEXTURE_CUBE_MAP,b);for(let ce=0;ce<6;ce++)if(b.mipmaps&&b.mipmaps.length>0)for(let me=0;me<b.mipmaps.length;me++)pe(k.__webglFramebuffer[ce][me],R,b,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+ce,me);else pe(k.__webglFramebuffer[ce],R,b,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+ce,0);m(b)&&p(r.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(he){for(let ce=0,me=Q.length;ce<me;ce++){const Ye=Q[ce],oe=n.get(Ye);t.bindTexture(r.TEXTURE_2D,oe.__webglTexture),Le(r.TEXTURE_2D,Ye),pe(k.__webglFramebuffer,R,Ye,r.COLOR_ATTACHMENT0+ce,r.TEXTURE_2D,0),m(Ye)&&p(r.TEXTURE_2D)}t.unbindTexture()}else{let ce=r.TEXTURE_2D;if((R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(ce=R.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),t.bindTexture(ce,ee.__webglTexture),Le(ce,b),b.mipmaps&&b.mipmaps.length>0)for(let me=0;me<b.mipmaps.length;me++)pe(k.__webglFramebuffer[me],R,b,r.COLOR_ATTACHMENT0,ce,me);else pe(k.__webglFramebuffer,R,b,r.COLOR_ATTACHMENT0,ce,0);m(b)&&p(ce),t.unbindTexture()}R.depthBuffer&&Be(R)}function et(R){const b=R.textures;for(let k=0,ee=b.length;k<ee;k++){const Q=b[k];if(m(Q)){const j=M(R),he=n.get(Q).__webglTexture;t.bindTexture(j,he),p(j),t.unbindTexture()}}}const Ee=[],L=[];function xt(R){if(R.samples>0){if(B(R)===!1){const b=R.textures,k=R.width,ee=R.height;let Q=r.COLOR_BUFFER_BIT;const j=R.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,he=n.get(R),ce=b.length>1;if(ce)for(let me=0;me<b.length;me++)t.bindFramebuffer(r.FRAMEBUFFER,he.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+me,r.RENDERBUFFER,null),t.bindFramebuffer(r.FRAMEBUFFER,he.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+me,r.TEXTURE_2D,null,0);t.bindFramebuffer(r.READ_FRAMEBUFFER,he.__webglMultisampledFramebuffer),t.bindFramebuffer(r.DRAW_FRAMEBUFFER,he.__webglFramebuffer);for(let me=0;me<b.length;me++){if(R.resolveDepthBuffer&&(R.depthBuffer&&(Q|=r.DEPTH_BUFFER_BIT),R.stencilBuffer&&R.resolveStencilBuffer&&(Q|=r.STENCIL_BUFFER_BIT)),ce){r.framebufferRenderbuffer(r.READ_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,he.__webglColorRenderbuffer[me]);const Ye=n.get(b[me]).__webglTexture;r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,Ye,0)}r.blitFramebuffer(0,0,k,ee,0,0,k,ee,Q,r.NEAREST),l===!0&&(Ee.length=0,L.length=0,Ee.push(r.COLOR_ATTACHMENT0+me),R.depthBuffer&&R.resolveDepthBuffer===!1&&(Ee.push(j),L.push(j),r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,L)),r.invalidateFramebuffer(r.READ_FRAMEBUFFER,Ee))}if(t.bindFramebuffer(r.READ_FRAMEBUFFER,null),t.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),ce)for(let me=0;me<b.length;me++){t.bindFramebuffer(r.FRAMEBUFFER,he.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+me,r.RENDERBUFFER,he.__webglColorRenderbuffer[me]);const Ye=n.get(b[me]).__webglTexture;t.bindFramebuffer(r.FRAMEBUFFER,he.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+me,r.TEXTURE_2D,Ye,0)}t.bindFramebuffer(r.DRAW_FRAMEBUFFER,he.__webglMultisampledFramebuffer)}else if(R.depthBuffer&&R.resolveDepthBuffer===!1&&l){const b=R.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,[b])}}}function Ve(R){return Math.min(i.maxSamples,R.samples)}function B(R){const b=n.get(R);return R.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&b.__useRenderToTexture!==!1}function Te(R){const b=o.render.frame;u.get(R)!==b&&(u.set(R,b),R.update())}function st(R,b){const k=R.colorSpace,ee=R.format,Q=R.type;return R.isCompressedTexture===!0||R.isVideoTexture===!0||k!==ro&&k!==lr&&(ft.getTransfer(k)===vt?(ee!==pi||Q!==$i)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",k)),b}function Ce(R){return typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement?(c.width=R.naturalWidth||R.width,c.height=R.naturalHeight||R.height):typeof VideoFrame<"u"&&R instanceof VideoFrame?(c.width=R.displayWidth,c.height=R.displayHeight):(c.width=R.width,c.height=R.height),c}this.allocateTextureUnit=O,this.resetTextureUnits=I,this.setTexture2D=W,this.setTexture2DArray=V,this.setTexture3D=X,this.setTextureCube=z,this.rebindTextures=ye,this.setupRenderTarget=rt,this.updateRenderTargetMipmap=et,this.updateMultisampleRenderTarget=xt,this.setupDepthRenderbuffer=Be,this.setupFrameBufferTexture=pe,this.useMultisampledRTT=B}function Sy(r,e){function t(n,i=lr){let s;const o=ft.getTransfer(i);if(n===$i)return r.UNSIGNED_BYTE;if(n===hf)return r.UNSIGNED_SHORT_4_4_4_4;if(n===df)return r.UNSIGNED_SHORT_5_5_5_1;if(n===ip)return r.UNSIGNED_INT_5_9_9_9_REV;if(n===tp)return r.BYTE;if(n===np)return r.SHORT;if(n===ia)return r.UNSIGNED_SHORT;if(n===ff)return r.INT;if(n===rs)return r.UNSIGNED_INT;if(n===Vi)return r.FLOAT;if(n===ma)return r.HALF_FLOAT;if(n===rp)return r.ALPHA;if(n===sp)return r.RGB;if(n===pi)return r.RGBA;if(n===op)return r.LUMINANCE;if(n===ap)return r.LUMINANCE_ALPHA;if(n===Gs)return r.DEPTH_COMPONENT;if(n===io)return r.DEPTH_STENCIL;if(n===lp)return r.RED;if(n===pf)return r.RED_INTEGER;if(n===cp)return r.RG;if(n===mf)return r.RG_INTEGER;if(n===_f)return r.RGBA_INTEGER;if(n===al||n===ll||n===cl||n===ul)if(o===vt)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(n===al)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===ll)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===cl)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===ul)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(n===al)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===ll)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===cl)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===ul)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===nu||n===iu||n===ru||n===su)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(n===nu)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===iu)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===ru)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===su)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===ou||n===au||n===lu)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(n===ou||n===au)return o===vt?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(n===lu)return o===vt?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===cu||n===uu||n===fu||n===hu||n===du||n===pu||n===mu||n===_u||n===gu||n===vu||n===xu||n===Su||n===yu||n===Mu)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(n===cu)return o===vt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===uu)return o===vt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===fu)return o===vt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===hu)return o===vt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===du)return o===vt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===pu)return o===vt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===mu)return o===vt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===_u)return o===vt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===gu)return o===vt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===vu)return o===vt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===xu)return o===vt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Su)return o===vt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===yu)return o===vt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Mu)return o===vt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===fl||n===Eu||n===bu)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(n===fl)return o===vt?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Eu)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===bu)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===up||n===Tu||n===wu||n===Au)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(n===fl)return s.COMPRESSED_RED_RGTC1_EXT;if(n===Tu)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===wu)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Au)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===no?r.UNSIGNED_INT_24_8:r[n]!==void 0?r[n]:null}return{convert:t}}const yy=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,My=`
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

}`;class Ey{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,n){if(this.texture===null){const i=new Rn,s=e.properties.get(i);s.__webglTexture=t.texture,(t.depthNear!==n.depthNear||t.depthFar!==n.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new Zi({vertexShader:yy,fragmentShader:My,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Ti(new oo(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class by extends mo{constructor(e,t){super();const n=this;let i=null,s=1,o=null,a="local-floor",l=1,c=null,u=null,h=null,f=null,d=null,g=null;const _=new Ey,m=t.getContextAttributes();let p=null,M=null;const y=[],v=[],A=new gt;let C=null;const w=new fi;w.viewport=new Ft;const E=new fi;E.viewport=new Ft;const x=[w,E],S=new Yg;let P=null,I=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function($){let ne=y[$];return ne===void 0&&(ne=new _c,y[$]=ne),ne.getTargetRaySpace()},this.getControllerGrip=function($){let ne=y[$];return ne===void 0&&(ne=new _c,y[$]=ne),ne.getGripSpace()},this.getHand=function($){let ne=y[$];return ne===void 0&&(ne=new _c,y[$]=ne),ne.getHandSpace()};function O($){const ne=v.indexOf($.inputSource);if(ne===-1)return;const pe=y[ne];pe!==void 0&&(pe.update($.inputSource,$.frame,c||o),pe.dispatchEvent({type:$.type,data:$.inputSource}))}function q(){i.removeEventListener("select",O),i.removeEventListener("selectstart",O),i.removeEventListener("selectend",O),i.removeEventListener("squeeze",O),i.removeEventListener("squeezestart",O),i.removeEventListener("squeezeend",O),i.removeEventListener("end",q),i.removeEventListener("inputsourceschange",W);for(let $=0;$<y.length;$++){const ne=v[$];ne!==null&&(v[$]=null,y[$].disconnect(ne))}P=null,I=null,_.reset(),e.setRenderTarget(p),d=null,f=null,h=null,i=null,M=null,ke.stop(),n.isPresenting=!1,e.setPixelRatio(C),e.setSize(A.width,A.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function($){s=$,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function($){a=$,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function($){c=$},this.getBaseLayer=function(){return f!==null?f:d},this.getBinding=function(){return h},this.getFrame=function(){return g},this.getSession=function(){return i},this.setSession=async function($){if(i=$,i!==null){if(p=e.getRenderTarget(),i.addEventListener("select",O),i.addEventListener("selectstart",O),i.addEventListener("selectend",O),i.addEventListener("squeeze",O),i.addEventListener("squeezestart",O),i.addEventListener("squeezeend",O),i.addEventListener("end",q),i.addEventListener("inputsourceschange",W),m.xrCompatible!==!0&&await t.makeXRCompatible(),C=e.getPixelRatio(),e.getSize(A),typeof XRWebGLBinding<"u"&&"createProjectionLayer"in XRWebGLBinding.prototype){let pe=null,se=null,we=null;m.depth&&(we=m.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,pe=m.stencil?io:Gs,se=m.stencil?no:rs);const Be={colorFormat:t.RGBA8,depthFormat:we,scaleFactor:s};h=new XRWebGLBinding(i,t),f=h.createProjectionLayer(Be),i.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),M=new ss(f.textureWidth,f.textureHeight,{format:pi,type:$i,depthTexture:new bp(f.textureWidth,f.textureHeight,se,void 0,void 0,void 0,void 0,void 0,void 0,pe),stencilBuffer:m.stencil,colorSpace:e.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1})}else{const pe={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:s};d=new XRWebGLLayer(i,t,pe),i.updateRenderState({baseLayer:d}),e.setPixelRatio(1),e.setSize(d.framebufferWidth,d.framebufferHeight,!1),M=new ss(d.framebufferWidth,d.framebufferHeight,{format:pi,type:$i,colorSpace:e.outputColorSpace,stencilBuffer:m.stencil})}M.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await i.requestReferenceSpace(a),ke.setContext(i),ke.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};function W($){for(let ne=0;ne<$.removed.length;ne++){const pe=$.removed[ne],se=v.indexOf(pe);se>=0&&(v[se]=null,y[se].disconnect(pe))}for(let ne=0;ne<$.added.length;ne++){const pe=$.added[ne];let se=v.indexOf(pe);if(se===-1){for(let Be=0;Be<y.length;Be++)if(Be>=v.length){v.push(pe),se=Be;break}else if(v[Be]===null){v[Be]=pe,se=Be;break}if(se===-1)break}const we=y[se];we&&we.connect(pe)}}const V=new Z,X=new Z;function z($,ne,pe){V.setFromMatrixPosition(ne.matrixWorld),X.setFromMatrixPosition(pe.matrixWorld);const se=V.distanceTo(X),we=ne.projectionMatrix.elements,Be=pe.projectionMatrix.elements,ye=we[14]/(we[10]-1),rt=we[14]/(we[10]+1),et=(we[9]+1)/we[5],Ee=(we[9]-1)/we[5],L=(we[8]-1)/we[0],xt=(Be[8]+1)/Be[0],Ve=ye*L,B=ye*xt,Te=se/(-L+xt),st=Te*-L;if(ne.matrixWorld.decompose($.position,$.quaternion,$.scale),$.translateX(st),$.translateZ(Te),$.matrixWorld.compose($.position,$.quaternion,$.scale),$.matrixWorldInverse.copy($.matrixWorld).invert(),we[10]===-1)$.projectionMatrix.copy(ne.projectionMatrix),$.projectionMatrixInverse.copy(ne.projectionMatrixInverse);else{const Ce=ye+Te,R=rt+Te,b=Ve-st,k=B+(se-st),ee=et*rt/R*Ce,Q=Ee*rt/R*Ce;$.projectionMatrix.makePerspective(b,k,ee,Q,Ce,R),$.projectionMatrixInverse.copy($.projectionMatrix).invert()}}function re($,ne){ne===null?$.matrixWorld.copy($.matrix):$.matrixWorld.multiplyMatrices(ne.matrixWorld,$.matrix),$.matrixWorldInverse.copy($.matrixWorld).invert()}this.updateCamera=function($){if(i===null)return;let ne=$.near,pe=$.far;_.texture!==null&&(_.depthNear>0&&(ne=_.depthNear),_.depthFar>0&&(pe=_.depthFar)),S.near=E.near=w.near=ne,S.far=E.far=w.far=pe,(P!==S.near||I!==S.far)&&(i.updateRenderState({depthNear:S.near,depthFar:S.far}),P=S.near,I=S.far),w.layers.mask=$.layers.mask|2,E.layers.mask=$.layers.mask|4,S.layers.mask=w.layers.mask|E.layers.mask;const se=$.parent,we=S.cameras;re(S,se);for(let Be=0;Be<we.length;Be++)re(we[Be],se);we.length===2?z(S,w,E):S.projectionMatrix.copy(w.projectionMatrix),D($,S,se)};function D($,ne,pe){pe===null?$.matrix.copy(ne.matrixWorld):($.matrix.copy(pe.matrixWorld),$.matrix.invert(),$.matrix.multiply(ne.matrixWorld)),$.matrix.decompose($.position,$.quaternion,$.scale),$.updateMatrixWorld(!0),$.projectionMatrix.copy(ne.projectionMatrix),$.projectionMatrixInverse.copy(ne.projectionMatrixInverse),$.isPerspectiveCamera&&($.fov=Cu*2*Math.atan(1/$.projectionMatrix.elements[5]),$.zoom=1)}this.getCamera=function(){return S},this.getFoveation=function(){if(!(f===null&&d===null))return l},this.setFoveation=function($){l=$,f!==null&&(f.fixedFoveation=$),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=$)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(S)};let ae=null;function Le($,ne){if(u=ne.getViewerPose(c||o),g=ne,u!==null){const pe=u.views;d!==null&&(e.setRenderTargetFramebuffer(M,d.framebuffer),e.setRenderTarget(M));let se=!1;pe.length!==S.cameras.length&&(S.cameras.length=0,se=!0);for(let ye=0;ye<pe.length;ye++){const rt=pe[ye];let et=null;if(d!==null)et=d.getViewport(rt);else{const L=h.getViewSubImage(f,rt);et=L.viewport,ye===0&&(e.setRenderTargetTextures(M,L.colorTexture,f.ignoreDepthValues?void 0:L.depthStencilTexture),e.setRenderTarget(M))}let Ee=x[ye];Ee===void 0&&(Ee=new fi,Ee.layers.enable(ye),Ee.viewport=new Ft,x[ye]=Ee),Ee.matrix.fromArray(rt.transform.matrix),Ee.matrix.decompose(Ee.position,Ee.quaternion,Ee.scale),Ee.projectionMatrix.fromArray(rt.projectionMatrix),Ee.projectionMatrixInverse.copy(Ee.projectionMatrix).invert(),Ee.viewport.set(et.x,et.y,et.width,et.height),ye===0&&(S.matrix.copy(Ee.matrix),S.matrix.decompose(S.position,S.quaternion,S.scale)),se===!0&&S.cameras.push(Ee)}const we=i.enabledFeatures;if(we&&we.includes("depth-sensing")&&i.depthUsage=="gpu-optimized"&&h){const ye=h.getDepthInformation(pe[0]);ye&&ye.isValid&&ye.texture&&_.init(e,ye,i.renderState)}}for(let pe=0;pe<y.length;pe++){const se=v[pe],we=y[pe];se!==null&&we!==void 0&&we.update(se,ne,c||o)}ae&&ae($,ne),ne.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:ne}),g=null}const ke=new wp;ke.setAnimationLoop(Le),this.setAnimationLoop=function($){ae=$},this.dispose=function(){}}}const Nr=new Ki,Ty=new Gt;function wy(r,e){function t(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,Sp(r)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function i(m,p,M,y,v){p.isMeshBasicMaterial||p.isMeshLambertMaterial?s(m,p):p.isMeshToonMaterial?(s(m,p),h(m,p)):p.isMeshPhongMaterial?(s(m,p),u(m,p)):p.isMeshStandardMaterial?(s(m,p),f(m,p),p.isMeshPhysicalMaterial&&d(m,p,v)):p.isMeshMatcapMaterial?(s(m,p),g(m,p)):p.isMeshDepthMaterial?s(m,p):p.isMeshDistanceMaterial?(s(m,p),_(m,p)):p.isMeshNormalMaterial?s(m,p):p.isLineBasicMaterial?(o(m,p),p.isLineDashedMaterial&&a(m,p)):p.isPointsMaterial?l(m,p,M,y):p.isSpriteMaterial?c(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function s(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,t(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===Cn&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,t(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===Cn&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,t(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,t(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const M=e.get(p),y=M.envMap,v=M.envMapRotation;y&&(m.envMap.value=y,Nr.copy(v),Nr.x*=-1,Nr.y*=-1,Nr.z*=-1,y.isCubeTexture&&y.isRenderTargetTexture===!1&&(Nr.y*=-1,Nr.z*=-1),m.envMapRotation.value.setFromMatrix4(Ty.makeRotationFromEuler(Nr)),m.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,m.aoMapTransform))}function o(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform))}function a(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function l(m,p,M,y){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*M,m.scale.value=y*.5,p.map&&(m.map.value=p.map,t(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function c(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function u(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function h(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function f(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function d(m,p,M){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Cn&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=M.texture,m.transmissionSamplerSize.value.set(M.width,M.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function _(m,p){const M=e.get(p).light;m.referencePosition.value.setFromMatrixPosition(M.matrixWorld),m.nearDistance.value=M.shadow.camera.near,m.farDistance.value=M.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function Ay(r,e,t,n){let i={},s={},o=[];const a=r.getParameter(r.MAX_UNIFORM_BUFFER_BINDINGS);function l(M,y){const v=y.program;n.uniformBlockBinding(M,v)}function c(M,y){let v=i[M.id];v===void 0&&(g(M),v=u(M),i[M.id]=v,M.addEventListener("dispose",m));const A=y.program;n.updateUBOMapping(M,A);const C=e.render.frame;s[M.id]!==C&&(f(M),s[M.id]=C)}function u(M){const y=h();M.__bindingPointIndex=y;const v=r.createBuffer(),A=M.__size,C=M.usage;return r.bindBuffer(r.UNIFORM_BUFFER,v),r.bufferData(r.UNIFORM_BUFFER,A,C),r.bindBuffer(r.UNIFORM_BUFFER,null),r.bindBufferBase(r.UNIFORM_BUFFER,y,v),v}function h(){for(let M=0;M<a;M++)if(o.indexOf(M)===-1)return o.push(M),M;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(M){const y=i[M.id],v=M.uniforms,A=M.__cache;r.bindBuffer(r.UNIFORM_BUFFER,y);for(let C=0,w=v.length;C<w;C++){const E=Array.isArray(v[C])?v[C]:[v[C]];for(let x=0,S=E.length;x<S;x++){const P=E[x];if(d(P,C,x,A)===!0){const I=P.__offset,O=Array.isArray(P.value)?P.value:[P.value];let q=0;for(let W=0;W<O.length;W++){const V=O[W],X=_(V);typeof V=="number"||typeof V=="boolean"?(P.__data[0]=V,r.bufferSubData(r.UNIFORM_BUFFER,I+q,P.__data)):V.isMatrix3?(P.__data[0]=V.elements[0],P.__data[1]=V.elements[1],P.__data[2]=V.elements[2],P.__data[3]=0,P.__data[4]=V.elements[3],P.__data[5]=V.elements[4],P.__data[6]=V.elements[5],P.__data[7]=0,P.__data[8]=V.elements[6],P.__data[9]=V.elements[7],P.__data[10]=V.elements[8],P.__data[11]=0):(V.toArray(P.__data,q),q+=X.storage/Float32Array.BYTES_PER_ELEMENT)}r.bufferSubData(r.UNIFORM_BUFFER,I,P.__data)}}}r.bindBuffer(r.UNIFORM_BUFFER,null)}function d(M,y,v,A){const C=M.value,w=y+"_"+v;if(A[w]===void 0)return typeof C=="number"||typeof C=="boolean"?A[w]=C:A[w]=C.clone(),!0;{const E=A[w];if(typeof C=="number"||typeof C=="boolean"){if(E!==C)return A[w]=C,!0}else if(E.equals(C)===!1)return E.copy(C),!0}return!1}function g(M){const y=M.uniforms;let v=0;const A=16;for(let w=0,E=y.length;w<E;w++){const x=Array.isArray(y[w])?y[w]:[y[w]];for(let S=0,P=x.length;S<P;S++){const I=x[S],O=Array.isArray(I.value)?I.value:[I.value];for(let q=0,W=O.length;q<W;q++){const V=O[q],X=_(V),z=v%A,re=z%X.boundary,D=z+re;v+=re,D!==0&&A-D<X.storage&&(v+=A-D),I.__data=new Float32Array(X.storage/Float32Array.BYTES_PER_ELEMENT),I.__offset=v,v+=X.storage}}}const C=v%A;return C>0&&(v+=A-C),M.__size=v,M.__cache={},this}function _(M){const y={boundary:0,storage:0};return typeof M=="number"||typeof M=="boolean"?(y.boundary=4,y.storage=4):M.isVector2?(y.boundary=8,y.storage=8):M.isVector3||M.isColor?(y.boundary=16,y.storage=12):M.isVector4?(y.boundary=16,y.storage=16):M.isMatrix3?(y.boundary=48,y.storage=48):M.isMatrix4?(y.boundary=64,y.storage=64):M.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",M),y}function m(M){const y=M.target;y.removeEventListener("dispose",m);const v=o.indexOf(y.__bindingPointIndex);o.splice(v,1),r.deleteBuffer(i[y.id]),delete i[y.id],delete s[y.id]}function p(){for(const M in i)r.deleteBuffer(i[M]);o=[],i={},s={}}return{bind:l,update:c,dispose:p}}class Cy{constructor(e={}){const{canvas:t=hg(),context:n=null,depth:i=!0,stencil:s=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:h=!1,reverseDepthBuffer:f=!1}=e;this.isWebGLRenderer=!0;let d;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");d=n.getContextAttributes().alpha}else d=o;const g=new Uint32Array(4),_=new Int32Array(4);let m=null,p=null;const M=[],y=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=ti,this.toneMapping=_r,this.toneMappingExposure=1;const v=this;let A=!1,C=0,w=0,E=null,x=-1,S=null;const P=new Ft,I=new Ft;let O=null;const q=new _t(0);let W=0,V=t.width,X=t.height,z=1,re=null,D=null;const ae=new Ft(0,0,V,X),Le=new Ft(0,0,V,X);let ke=!1;const $=new Ep;let ne=!1,pe=!1;this.transmissionResolutionScale=1;const se=new Gt,we=new Gt,Be=new Z,ye=new Ft,rt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let et=!1;function Ee(){return E===null?z:1}let L=n;function xt(T,F){return t.getContext(T,F)}try{const T={alpha:!0,depth:i,stencil:s,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:h};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${uf}`),t.addEventListener("webglcontextlost",J,!1),t.addEventListener("webglcontextrestored",ue,!1),t.addEventListener("webglcontextcreationerror",de,!1),L===null){const F="webgl2";if(L=xt(F,T),L===null)throw xt(F)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(T){throw console.error("THREE.WebGLRenderer: "+T.message),T}let Ve,B,Te,st,Ce,R,b,k,ee,Q,j,he,ce,me,Ye,oe,le,Fe,Ne,Se,$e,He,lt,U;function fe(){Ve=new Bx(L),Ve.init(),He=new Sy(L,Ve),B=new Lx(L,Ve,e,He),Te=new vy(L,Ve),B.reverseDepthBuffer&&f&&Te.buffers.depth.setReversed(!0),st=new Hx(L),Ce=new sy,R=new xy(L,Ve,Te,Ce,B,He,st),b=new Ix(v),k=new Ox(v),ee=new $g(L),lt=new Px(L,ee),Q=new zx(L,ee,st,lt),j=new Gx(L,Q,ee,st),Ne=new Vx(L,B,R),oe=new Ux(Ce),he=new ry(v,b,k,Ve,B,lt,oe),ce=new wy(v,Ce),me=new ay,Ye=new dy(Ve),Fe=new Rx(v,b,k,Te,j,d,l),le=new _y(v,j,B),U=new Ay(L,st,B,Te),Se=new Dx(L,Ve,st),$e=new kx(L,Ve,st),st.programs=he.programs,v.capabilities=B,v.extensions=Ve,v.properties=Ce,v.renderLists=me,v.shadowMap=le,v.state=Te,v.info=st}fe();const K=new by(v,L);this.xr=K,this.getContext=function(){return L},this.getContextAttributes=function(){return L.getContextAttributes()},this.forceContextLoss=function(){const T=Ve.get("WEBGL_lose_context");T&&T.loseContext()},this.forceContextRestore=function(){const T=Ve.get("WEBGL_lose_context");T&&T.restoreContext()},this.getPixelRatio=function(){return z},this.setPixelRatio=function(T){T!==void 0&&(z=T,this.setSize(V,X,!1))},this.getSize=function(T){return T.set(V,X)},this.setSize=function(T,F,G=!0){if(K.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}V=T,X=F,t.width=Math.floor(T*z),t.height=Math.floor(F*z),G===!0&&(t.style.width=T+"px",t.style.height=F+"px"),this.setViewport(0,0,T,F)},this.getDrawingBufferSize=function(T){return T.set(V*z,X*z).floor()},this.setDrawingBufferSize=function(T,F,G){V=T,X=F,z=G,t.width=Math.floor(T*G),t.height=Math.floor(F*G),this.setViewport(0,0,T,F)},this.getCurrentViewport=function(T){return T.copy(P)},this.getViewport=function(T){return T.copy(ae)},this.setViewport=function(T,F,G,H){T.isVector4?ae.set(T.x,T.y,T.z,T.w):ae.set(T,F,G,H),Te.viewport(P.copy(ae).multiplyScalar(z).round())},this.getScissor=function(T){return T.copy(Le)},this.setScissor=function(T,F,G,H){T.isVector4?Le.set(T.x,T.y,T.z,T.w):Le.set(T,F,G,H),Te.scissor(I.copy(Le).multiplyScalar(z).round())},this.getScissorTest=function(){return ke},this.setScissorTest=function(T){Te.setScissorTest(ke=T)},this.setOpaqueSort=function(T){re=T},this.setTransparentSort=function(T){D=T},this.getClearColor=function(T){return T.copy(Fe.getClearColor())},this.setClearColor=function(){Fe.setClearColor.apply(Fe,arguments)},this.getClearAlpha=function(){return Fe.getClearAlpha()},this.setClearAlpha=function(){Fe.setClearAlpha.apply(Fe,arguments)},this.clear=function(T=!0,F=!0,G=!0){let H=0;if(T){let N=!1;if(E!==null){const ie=E.texture.format;N=ie===_f||ie===mf||ie===pf}if(N){const ie=E.texture.type,ge=ie===$i||ie===rs||ie===ia||ie===no||ie===hf||ie===df,be=Fe.getClearColor(),Me=Fe.getClearAlpha(),Ue=be.r,ze=be.g,De=be.b;ge?(g[0]=Ue,g[1]=ze,g[2]=De,g[3]=Me,L.clearBufferuiv(L.COLOR,0,g)):(_[0]=Ue,_[1]=ze,_[2]=De,_[3]=Me,L.clearBufferiv(L.COLOR,0,_))}else H|=L.COLOR_BUFFER_BIT}F&&(H|=L.DEPTH_BUFFER_BIT),G&&(H|=L.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),L.clear(H)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",J,!1),t.removeEventListener("webglcontextrestored",ue,!1),t.removeEventListener("webglcontextcreationerror",de,!1),Fe.dispose(),me.dispose(),Ye.dispose(),Ce.dispose(),b.dispose(),k.dispose(),j.dispose(),lt.dispose(),U.dispose(),he.dispose(),K.dispose(),K.removeEventListener("sessionstart",_e),K.removeEventListener("sessionend",Xe),Pe.stop()};function J(T){T.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),A=!0}function ue(){console.log("THREE.WebGLRenderer: Context Restored."),A=!1;const T=st.autoReset,F=le.enabled,G=le.autoUpdate,H=le.needsUpdate,N=le.type;fe(),st.autoReset=T,le.enabled=F,le.autoUpdate=G,le.needsUpdate=H,le.type=N}function de(T){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",T.statusMessage)}function Ge(T){const F=T.target;F.removeEventListener("dispose",Ge),ct(F)}function ct(T){Dt(T),Ce.remove(T)}function Dt(T){const F=Ce.get(T).programs;F!==void 0&&(F.forEach(function(G){he.releaseProgram(G)}),T.isShaderMaterial&&he.releaseShaderCache(T))}this.renderBufferDirect=function(T,F,G,H,N,ie){F===null&&(F=rt);const ge=N.isMesh&&N.matrixWorld.determinant()<0,be=Nn(T,F,G,H,N);Te.setMaterial(H,ge);let Me=G.index,Ue=1;if(H.wireframe===!0){if(Me=Q.getWireframeAttribute(G),Me===void 0)return;Ue=2}const ze=G.drawRange,De=G.attributes.position;let Je=ze.start*Ue,dt=(ze.start+ze.count)*Ue;ie!==null&&(Je=Math.max(Je,ie.start*Ue),dt=Math.min(dt,(ie.start+ie.count)*Ue)),Me!==null?(Je=Math.max(Je,0),dt=Math.min(dt,Me.count)):De!=null&&(Je=Math.max(Je,0),dt=Math.min(dt,De.count));const Bt=dt-Je;if(Bt<0||Bt===1/0)return;lt.setup(N,H,be,G,Me);let Lt,ut=Se;if(Me!==null&&(Lt=ee.get(Me),ut=$e,ut.setIndex(Lt)),N.isMesh)H.wireframe===!0?(Te.setLineWidth(H.wireframeLinewidth*Ee()),ut.setMode(L.LINES)):ut.setMode(L.TRIANGLES);else if(N.isLine){let Oe=H.linewidth;Oe===void 0&&(Oe=1),Te.setLineWidth(Oe*Ee()),N.isLineSegments?ut.setMode(L.LINES):N.isLineLoop?ut.setMode(L.LINE_LOOP):ut.setMode(L.LINE_STRIP)}else N.isPoints?ut.setMode(L.POINTS):N.isSprite&&ut.setMode(L.TRIANGLES);if(N.isBatchedMesh)if(N._multiDrawInstances!==null)ut.renderMultiDrawInstances(N._multiDrawStarts,N._multiDrawCounts,N._multiDrawCount,N._multiDrawInstances);else if(Ve.get("WEBGL_multi_draw"))ut.renderMultiDraw(N._multiDrawStarts,N._multiDrawCounts,N._multiDrawCount);else{const Oe=N._multiDrawStarts,nn=N._multiDrawCounts,pt=N._multiDrawCount,oi=Me?ee.get(Me).bytesPerElement:1,ds=Ce.get(H).currentProgram.getUniforms();for(let Fn=0;Fn<pt;Fn++)ds.setValue(L,"_gl_DrawID",Fn),ut.render(Oe[Fn]/oi,nn[Fn])}else if(N.isInstancedMesh)ut.renderInstances(Je,Bt,N.count);else if(G.isInstancedBufferGeometry){const Oe=G._maxInstanceCount!==void 0?G._maxInstanceCount:1/0,nn=Math.min(G.instanceCount,Oe);ut.renderInstances(Je,Bt,nn)}else ut.render(Je,Bt)};function xe(T,F,G){T.transparent===!0&&T.side===Mi&&T.forceSinglePass===!1?(T.side=Cn,T.needsUpdate=!0,St(T,F,G),T.side=yr,T.needsUpdate=!0,St(T,F,G),T.side=Mi):St(T,F,G)}this.compile=function(T,F,G=null){G===null&&(G=T),p=Ye.get(G),p.init(F),y.push(p),G.traverseVisible(function(N){N.isLight&&N.layers.test(F.layers)&&(p.pushLight(N),N.castShadow&&p.pushShadow(N))}),T!==G&&T.traverseVisible(function(N){N.isLight&&N.layers.test(F.layers)&&(p.pushLight(N),N.castShadow&&p.pushShadow(N))}),p.setupLights();const H=new Set;return T.traverse(function(N){if(!(N.isMesh||N.isPoints||N.isLine||N.isSprite))return;const ie=N.material;if(ie)if(Array.isArray(ie))for(let ge=0;ge<ie.length;ge++){const be=ie[ge];xe(be,G,N),H.add(be)}else xe(ie,G,N),H.add(ie)}),y.pop(),p=null,H},this.compileAsync=function(T,F,G=null){const H=this.compile(T,F,G);return new Promise(N=>{function ie(){if(H.forEach(function(ge){Ce.get(ge).currentProgram.isReady()&&H.delete(ge)}),H.size===0){N(T);return}setTimeout(ie,10)}Ve.get("KHR_parallel_shader_compile")!==null?ie():setTimeout(ie,10)})};let Re=null;function Ke(T){Re&&Re(T)}function _e(){Pe.stop()}function Xe(){Pe.start()}const Pe=new wp;Pe.setAnimationLoop(Ke),typeof self<"u"&&Pe.setContext(self),this.setAnimationLoop=function(T){Re=T,K.setAnimationLoop(T),T===null?Pe.stop():Pe.start()},K.addEventListener("sessionstart",_e),K.addEventListener("sessionend",Xe),this.render=function(T,F){if(F!==void 0&&F.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(A===!0)return;if(T.matrixWorldAutoUpdate===!0&&T.updateMatrixWorld(),F.parent===null&&F.matrixWorldAutoUpdate===!0&&F.updateMatrixWorld(),K.enabled===!0&&K.isPresenting===!0&&(K.cameraAutoUpdate===!0&&K.updateCamera(F),F=K.getCamera()),T.isScene===!0&&T.onBeforeRender(v,T,F,E),p=Ye.get(T,y.length),p.init(F),y.push(p),we.multiplyMatrices(F.projectionMatrix,F.matrixWorldInverse),$.setFromProjectionMatrix(we),pe=this.localClippingEnabled,ne=oe.init(this.clippingPlanes,pe),m=me.get(T,M.length),m.init(),M.push(m),K.enabled===!0&&K.isPresenting===!0){const ie=v.xr.getDepthSensingMesh();ie!==null&&We(ie,F,-1/0,v.sortObjects)}We(T,F,0,v.sortObjects),m.finish(),v.sortObjects===!0&&m.sort(re,D),et=K.enabled===!1||K.isPresenting===!1||K.hasDepthSensing()===!1,et&&Fe.addToRenderList(m,T),this.info.render.frame++,ne===!0&&oe.beginShadows();const G=p.state.shadowsArray;le.render(G,T,F),ne===!0&&oe.endShadows(),this.info.autoReset===!0&&this.info.reset();const H=m.opaque,N=m.transmissive;if(p.setupLights(),F.isArrayCamera){const ie=F.cameras;if(N.length>0)for(let ge=0,be=ie.length;ge<be;ge++){const Me=ie[ge];tt(H,N,T,Me)}et&&Fe.render(T);for(let ge=0,be=ie.length;ge<be;ge++){const Me=ie[ge];It(m,T,Me,Me.viewport)}}else N.length>0&&tt(H,N,T,F),et&&Fe.render(T),It(m,T,F);E!==null&&w===0&&(R.updateMultisampleRenderTarget(E),R.updateRenderTargetMipmap(E)),T.isScene===!0&&T.onAfterRender(v,T,F),lt.resetDefaultState(),x=-1,S=null,y.pop(),y.length>0?(p=y[y.length-1],ne===!0&&oe.setGlobalState(v.clippingPlanes,p.state.camera)):p=null,M.pop(),M.length>0?m=M[M.length-1]:m=null};function We(T,F,G,H){if(T.visible===!1)return;if(T.layers.test(F.layers)){if(T.isGroup)G=T.renderOrder;else if(T.isLOD)T.autoUpdate===!0&&T.update(F);else if(T.isLight)p.pushLight(T),T.castShadow&&p.pushShadow(T);else if(T.isSprite){if(!T.frustumCulled||$.intersectsSprite(T)){H&&ye.setFromMatrixPosition(T.matrixWorld).applyMatrix4(we);const ge=j.update(T),be=T.material;be.visible&&m.push(T,ge,be,G,ye.z,null)}}else if((T.isMesh||T.isLine||T.isPoints)&&(!T.frustumCulled||$.intersectsObject(T))){const ge=j.update(T),be=T.material;if(H&&(T.boundingSphere!==void 0?(T.boundingSphere===null&&T.computeBoundingSphere(),ye.copy(T.boundingSphere.center)):(ge.boundingSphere===null&&ge.computeBoundingSphere(),ye.copy(ge.boundingSphere.center)),ye.applyMatrix4(T.matrixWorld).applyMatrix4(we)),Array.isArray(be)){const Me=ge.groups;for(let Ue=0,ze=Me.length;Ue<ze;Ue++){const De=Me[Ue],Je=be[De.materialIndex];Je&&Je.visible&&m.push(T,ge,Je,G,ye.z,De)}}else be.visible&&m.push(T,ge,be,G,ye.z,null)}}const ie=T.children;for(let ge=0,be=ie.length;ge<be;ge++)We(ie[ge],F,G,H)}function It(T,F,G,H){const N=T.opaque,ie=T.transmissive,ge=T.transparent;p.setupLightsView(G),ne===!0&&oe.setGlobalState(v.clippingPlanes,G),H&&Te.viewport(P.copy(H)),N.length>0&&Et(N,F,G),ie.length>0&&Et(ie,F,G),ge.length>0&&Et(ge,F,G),Te.buffers.depth.setTest(!0),Te.buffers.depth.setMask(!0),Te.buffers.color.setMask(!0),Te.setPolygonOffset(!1)}function tt(T,F,G,H){if((G.isScene===!0?G.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[H.id]===void 0&&(p.state.transmissionRenderTarget[H.id]=new ss(1,1,{generateMipmaps:!0,type:Ve.has("EXT_color_buffer_half_float")||Ve.has("EXT_color_buffer_float")?ma:$i,minFilter:Yr,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:ft.workingColorSpace}));const ie=p.state.transmissionRenderTarget[H.id],ge=H.viewport||P;ie.setSize(ge.z*v.transmissionResolutionScale,ge.w*v.transmissionResolutionScale);const be=v.getRenderTarget();v.setRenderTarget(ie),v.getClearColor(q),W=v.getClearAlpha(),W<1&&v.setClearColor(16777215,.5),v.clear(),et&&Fe.render(G);const Me=v.toneMapping;v.toneMapping=_r;const Ue=H.viewport;if(H.viewport!==void 0&&(H.viewport=void 0),p.setupLightsView(H),ne===!0&&oe.setGlobalState(v.clippingPlanes,H),Et(T,G,H),R.updateMultisampleRenderTarget(ie),R.updateRenderTargetMipmap(ie),Ve.has("WEBGL_multisampled_render_to_texture")===!1){let ze=!1;for(let De=0,Je=F.length;De<Je;De++){const dt=F[De],Bt=dt.object,Lt=dt.geometry,ut=dt.material,Oe=dt.group;if(ut.side===Mi&&Bt.layers.test(H.layers)){const nn=ut.side;ut.side=Cn,ut.needsUpdate=!0,Wt(Bt,G,H,Lt,ut,Oe),ut.side=nn,ut.needsUpdate=!0,ze=!0}}ze===!0&&(R.updateMultisampleRenderTarget(ie),R.updateRenderTargetMipmap(ie))}v.setRenderTarget(be),v.setClearColor(q,W),Ue!==void 0&&(H.viewport=Ue),v.toneMapping=Me}function Et(T,F,G){const H=F.isScene===!0?F.overrideMaterial:null;for(let N=0,ie=T.length;N<ie;N++){const ge=T[N],be=ge.object,Me=ge.geometry,Ue=H===null?ge.material:H,ze=ge.group;be.layers.test(G.layers)&&Wt(be,F,G,Me,Ue,ze)}}function Wt(T,F,G,H,N,ie){T.onBeforeRender(v,F,G,H,N,ie),T.modelViewMatrix.multiplyMatrices(G.matrixWorldInverse,T.matrixWorld),T.normalMatrix.getNormalMatrix(T.modelViewMatrix),N.onBeforeRender(v,F,G,H,T,ie),N.transparent===!0&&N.side===Mi&&N.forceSinglePass===!1?(N.side=Cn,N.needsUpdate=!0,v.renderBufferDirect(G,F,H,N,T,ie),N.side=yr,N.needsUpdate=!0,v.renderBufferDirect(G,F,H,N,T,ie),N.side=Mi):v.renderBufferDirect(G,F,H,N,T,ie),T.onAfterRender(v,F,G,H,N,ie)}function St(T,F,G){F.isScene!==!0&&(F=rt);const H=Ce.get(T),N=p.state.lights,ie=p.state.shadowsArray,ge=N.state.version,be=he.getParameters(T,N.state,ie,F,G),Me=he.getProgramCacheKey(be);let Ue=H.programs;H.environment=T.isMeshStandardMaterial?F.environment:null,H.fog=F.fog,H.envMap=(T.isMeshStandardMaterial?k:b).get(T.envMap||H.environment),H.envMapRotation=H.environment!==null&&T.envMap===null?F.environmentRotation:T.envMapRotation,Ue===void 0&&(T.addEventListener("dispose",Ge),Ue=new Map,H.programs=Ue);let ze=Ue.get(Me);if(ze!==void 0){if(H.currentProgram===ze&&H.lightsStateVersion===ge)return ht(T,be),ze}else be.uniforms=he.getUniforms(T),T.onBeforeCompile(be,v),ze=he.acquireProgram(be,Me),Ue.set(Me,ze),H.uniforms=be.uniforms;const De=H.uniforms;return(!T.isShaderMaterial&&!T.isRawShaderMaterial||T.clipping===!0)&&(De.clippingPlanes=oe.uniform),ht(T,be),H.needsLights=mn(T),H.lightsStateVersion=ge,H.needsLights&&(De.ambientLightColor.value=N.state.ambient,De.lightProbe.value=N.state.probe,De.directionalLights.value=N.state.directional,De.directionalLightShadows.value=N.state.directionalShadow,De.spotLights.value=N.state.spot,De.spotLightShadows.value=N.state.spotShadow,De.rectAreaLights.value=N.state.rectArea,De.ltc_1.value=N.state.rectAreaLTC1,De.ltc_2.value=N.state.rectAreaLTC2,De.pointLights.value=N.state.point,De.pointLightShadows.value=N.state.pointShadow,De.hemisphereLights.value=N.state.hemi,De.directionalShadowMap.value=N.state.directionalShadowMap,De.directionalShadowMatrix.value=N.state.directionalShadowMatrix,De.spotShadowMap.value=N.state.spotShadowMap,De.spotLightMatrix.value=N.state.spotLightMatrix,De.spotLightMap.value=N.state.spotLightMap,De.pointShadowMap.value=N.state.pointShadowMap,De.pointShadowMatrix.value=N.state.pointShadowMatrix),H.currentProgram=ze,H.uniformsList=null,ze}function yt(T){if(T.uniformsList===null){const F=T.currentProgram.getUniforms();T.uniformsList=hl.seqWithValue(F.seq,T.uniforms)}return T.uniformsList}function ht(T,F){const G=Ce.get(T);G.outputColorSpace=F.outputColorSpace,G.batching=F.batching,G.batchingColor=F.batchingColor,G.instancing=F.instancing,G.instancingColor=F.instancingColor,G.instancingMorph=F.instancingMorph,G.skinning=F.skinning,G.morphTargets=F.morphTargets,G.morphNormals=F.morphNormals,G.morphColors=F.morphColors,G.morphTargetsCount=F.morphTargetsCount,G.numClippingPlanes=F.numClippingPlanes,G.numIntersection=F.numClipIntersection,G.vertexAlphas=F.vertexAlphas,G.vertexTangents=F.vertexTangents,G.toneMapping=F.toneMapping}function Nn(T,F,G,H,N){F.isScene!==!0&&(F=rt),R.resetTextureUnits();const ie=F.fog,ge=H.isMeshStandardMaterial?F.environment:null,be=E===null?v.outputColorSpace:E.isXRRenderTarget===!0?E.texture.colorSpace:ro,Me=(H.isMeshStandardMaterial?k:b).get(H.envMap||ge),Ue=H.vertexColors===!0&&!!G.attributes.color&&G.attributes.color.itemSize===4,ze=!!G.attributes.tangent&&(!!H.normalMap||H.anisotropy>0),De=!!G.morphAttributes.position,Je=!!G.morphAttributes.normal,dt=!!G.morphAttributes.color;let Bt=_r;H.toneMapped&&(E===null||E.isXRRenderTarget===!0)&&(Bt=v.toneMapping);const Lt=G.morphAttributes.position||G.morphAttributes.normal||G.morphAttributes.color,ut=Lt!==void 0?Lt.length:0,Oe=Ce.get(H),nn=p.state.lights;if(ne===!0&&(pe===!0||T!==S)){const _n=T===S&&H.id===x;oe.setState(H,T,_n)}let pt=!1;H.version===Oe.__version?(Oe.needsLights&&Oe.lightsStateVersion!==nn.state.version||Oe.outputColorSpace!==be||N.isBatchedMesh&&Oe.batching===!1||!N.isBatchedMesh&&Oe.batching===!0||N.isBatchedMesh&&Oe.batchingColor===!0&&N.colorTexture===null||N.isBatchedMesh&&Oe.batchingColor===!1&&N.colorTexture!==null||N.isInstancedMesh&&Oe.instancing===!1||!N.isInstancedMesh&&Oe.instancing===!0||N.isSkinnedMesh&&Oe.skinning===!1||!N.isSkinnedMesh&&Oe.skinning===!0||N.isInstancedMesh&&Oe.instancingColor===!0&&N.instanceColor===null||N.isInstancedMesh&&Oe.instancingColor===!1&&N.instanceColor!==null||N.isInstancedMesh&&Oe.instancingMorph===!0&&N.morphTexture===null||N.isInstancedMesh&&Oe.instancingMorph===!1&&N.morphTexture!==null||Oe.envMap!==Me||H.fog===!0&&Oe.fog!==ie||Oe.numClippingPlanes!==void 0&&(Oe.numClippingPlanes!==oe.numPlanes||Oe.numIntersection!==oe.numIntersection)||Oe.vertexAlphas!==Ue||Oe.vertexTangents!==ze||Oe.morphTargets!==De||Oe.morphNormals!==Je||Oe.morphColors!==dt||Oe.toneMapping!==Bt||Oe.morphTargetsCount!==ut)&&(pt=!0):(pt=!0,Oe.__version=H.version);let oi=Oe.currentProgram;pt===!0&&(oi=St(H,F,N));let ds=!1,Fn=!1,go=!1;const At=oi.getUniforms(),jn=Oe.uniforms;if(Te.useProgram(oi.program)&&(ds=!0,Fn=!0,go=!0),H.id!==x&&(x=H.id,Fn=!0),ds||S!==T){Te.buffers.depth.getReversed()?(se.copy(T.projectionMatrix),pg(se),mg(se),At.setValue(L,"projectionMatrix",se)):At.setValue(L,"projectionMatrix",T.projectionMatrix),At.setValue(L,"viewMatrix",T.matrixWorldInverse);const Tn=At.map.cameraPosition;Tn!==void 0&&Tn.setValue(L,Be.setFromMatrixPosition(T.matrixWorld)),B.logarithmicDepthBuffer&&At.setValue(L,"logDepthBufFC",2/(Math.log(T.far+1)/Math.LN2)),(H.isMeshPhongMaterial||H.isMeshToonMaterial||H.isMeshLambertMaterial||H.isMeshBasicMaterial||H.isMeshStandardMaterial||H.isShaderMaterial)&&At.setValue(L,"isOrthographic",T.isOrthographicCamera===!0),S!==T&&(S=T,Fn=!0,go=!0)}if(N.isSkinnedMesh){At.setOptional(L,N,"bindMatrix"),At.setOptional(L,N,"bindMatrixInverse");const _n=N.skeleton;_n&&(_n.boneTexture===null&&_n.computeBoneTexture(),At.setValue(L,"boneTexture",_n.boneTexture,R))}N.isBatchedMesh&&(At.setOptional(L,N,"batchingTexture"),At.setValue(L,"batchingTexture",N._matricesTexture,R),At.setOptional(L,N,"batchingIdTexture"),At.setValue(L,"batchingIdTexture",N._indirectTexture,R),At.setOptional(L,N,"batchingColorTexture"),N._colorsTexture!==null&&At.setValue(L,"batchingColorTexture",N._colorsTexture,R));const Jn=G.morphAttributes;if((Jn.position!==void 0||Jn.normal!==void 0||Jn.color!==void 0)&&Ne.update(N,G,oi),(Fn||Oe.receiveShadow!==N.receiveShadow)&&(Oe.receiveShadow=N.receiveShadow,At.setValue(L,"receiveShadow",N.receiveShadow)),H.isMeshGouraudMaterial&&H.envMap!==null&&(jn.envMap.value=Me,jn.flipEnvMap.value=Me.isCubeTexture&&Me.isRenderTargetTexture===!1?-1:1),H.isMeshStandardMaterial&&H.envMap===null&&F.environment!==null&&(jn.envMapIntensity.value=F.environmentIntensity),Fn&&(At.setValue(L,"toneMappingExposure",v.toneMappingExposure),Oe.needsLights&&wt(jn,go),ie&&H.fog===!0&&ce.refreshFogUniforms(jn,ie),ce.refreshMaterialUniforms(jn,H,z,X,p.state.transmissionRenderTarget[T.id]),hl.upload(L,yt(Oe),jn,R)),H.isShaderMaterial&&H.uniformsNeedUpdate===!0&&(hl.upload(L,yt(Oe),jn,R),H.uniformsNeedUpdate=!1),H.isSpriteMaterial&&At.setValue(L,"center",N.center),At.setValue(L,"modelViewMatrix",N.modelViewMatrix),At.setValue(L,"normalMatrix",N.normalMatrix),At.setValue(L,"modelMatrix",N.matrixWorld),H.isShaderMaterial||H.isRawShaderMaterial){const _n=H.uniformsGroups;for(let Tn=0,ql=_n.length;Tn<ql;Tn++){const Rr=_n[Tn];U.update(Rr,oi),U.bind(Rr,oi)}}return oi}function wt(T,F){T.ambientLightColor.needsUpdate=F,T.lightProbe.needsUpdate=F,T.directionalLights.needsUpdate=F,T.directionalLightShadows.needsUpdate=F,T.pointLights.needsUpdate=F,T.pointLightShadows.needsUpdate=F,T.spotLights.needsUpdate=F,T.spotLightShadows.needsUpdate=F,T.rectAreaLights.needsUpdate=F,T.hemisphereLights.needsUpdate=F}function mn(T){return T.isMeshLambertMaterial||T.isMeshToonMaterial||T.isMeshPhongMaterial||T.isMeshStandardMaterial||T.isShadowMaterial||T.isShaderMaterial&&T.lights===!0}this.getActiveCubeFace=function(){return C},this.getActiveMipmapLevel=function(){return w},this.getRenderTarget=function(){return E},this.setRenderTargetTextures=function(T,F,G){Ce.get(T.texture).__webglTexture=F,Ce.get(T.depthTexture).__webglTexture=G;const H=Ce.get(T);H.__hasExternalTextures=!0,H.__autoAllocateDepthBuffer=G===void 0,H.__autoAllocateDepthBuffer||Ve.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),H.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(T,F){const G=Ce.get(T);G.__webglFramebuffer=F,G.__useDefaultFramebuffer=F===void 0};const Zn=L.createFramebuffer();this.setRenderTarget=function(T,F=0,G=0){E=T,C=F,w=G;let H=!0,N=null,ie=!1,ge=!1;if(T){const Me=Ce.get(T);if(Me.__useDefaultFramebuffer!==void 0)Te.bindFramebuffer(L.FRAMEBUFFER,null),H=!1;else if(Me.__webglFramebuffer===void 0)R.setupRenderTarget(T);else if(Me.__hasExternalTextures)R.rebindTextures(T,Ce.get(T.texture).__webglTexture,Ce.get(T.depthTexture).__webglTexture);else if(T.depthBuffer){const De=T.depthTexture;if(Me.__boundDepthTexture!==De){if(De!==null&&Ce.has(De)&&(T.width!==De.image.width||T.height!==De.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");R.setupDepthRenderbuffer(T)}}const Ue=T.texture;(Ue.isData3DTexture||Ue.isDataArrayTexture||Ue.isCompressedArrayTexture)&&(ge=!0);const ze=Ce.get(T).__webglFramebuffer;T.isWebGLCubeRenderTarget?(Array.isArray(ze[F])?N=ze[F][G]:N=ze[F],ie=!0):T.samples>0&&R.useMultisampledRTT(T)===!1?N=Ce.get(T).__webglMultisampledFramebuffer:Array.isArray(ze)?N=ze[G]:N=ze,P.copy(T.viewport),I.copy(T.scissor),O=T.scissorTest}else P.copy(ae).multiplyScalar(z).floor(),I.copy(Le).multiplyScalar(z).floor(),O=ke;if(G!==0&&(N=Zn),Te.bindFramebuffer(L.FRAMEBUFFER,N)&&H&&Te.drawBuffers(T,N),Te.viewport(P),Te.scissor(I),Te.setScissorTest(O),ie){const Me=Ce.get(T.texture);L.framebufferTexture2D(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_CUBE_MAP_POSITIVE_X+F,Me.__webglTexture,G)}else if(ge){const Me=Ce.get(T.texture),Ue=F;L.framebufferTextureLayer(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,Me.__webglTexture,G,Ue)}else if(T!==null&&G!==0){const Me=Ce.get(T.texture);L.framebufferTexture2D(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,Me.__webglTexture,G)}x=-1},this.readRenderTargetPixels=function(T,F,G,H,N,ie,ge){if(!(T&&T.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let be=Ce.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&ge!==void 0&&(be=be[ge]),be){Te.bindFramebuffer(L.FRAMEBUFFER,be);try{const Me=T.texture,Ue=Me.format,ze=Me.type;if(!B.textureFormatReadable(Ue)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!B.textureTypeReadable(ze)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}F>=0&&F<=T.width-H&&G>=0&&G<=T.height-N&&L.readPixels(F,G,H,N,He.convert(Ue),He.convert(ze),ie)}finally{const Me=E!==null?Ce.get(E).__webglFramebuffer:null;Te.bindFramebuffer(L.FRAMEBUFFER,Me)}}},this.readRenderTargetPixelsAsync=async function(T,F,G,H,N,ie,ge){if(!(T&&T.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let be=Ce.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&ge!==void 0&&(be=be[ge]),be){const Me=T.texture,Ue=Me.format,ze=Me.type;if(!B.textureFormatReadable(Ue))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!B.textureTypeReadable(ze))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(F>=0&&F<=T.width-H&&G>=0&&G<=T.height-N){Te.bindFramebuffer(L.FRAMEBUFFER,be);const De=L.createBuffer();L.bindBuffer(L.PIXEL_PACK_BUFFER,De),L.bufferData(L.PIXEL_PACK_BUFFER,ie.byteLength,L.STREAM_READ),L.readPixels(F,G,H,N,He.convert(Ue),He.convert(ze),0);const Je=E!==null?Ce.get(E).__webglFramebuffer:null;Te.bindFramebuffer(L.FRAMEBUFFER,Je);const dt=L.fenceSync(L.SYNC_GPU_COMMANDS_COMPLETE,0);return L.flush(),await dg(L,dt,4),L.bindBuffer(L.PIXEL_PACK_BUFFER,De),L.getBufferSubData(L.PIXEL_PACK_BUFFER,0,ie),L.deleteBuffer(De),L.deleteSync(dt),ie}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(T,F=null,G=0){T.isTexture!==!0&&(Ds("WebGLRenderer: copyFramebufferToTexture function signature has changed."),F=arguments[0]||null,T=arguments[1]);const H=Math.pow(2,-G),N=Math.floor(T.image.width*H),ie=Math.floor(T.image.height*H),ge=F!==null?F.x:0,be=F!==null?F.y:0;R.setTexture2D(T,0),L.copyTexSubImage2D(L.TEXTURE_2D,G,0,0,ge,be,N,ie),Te.unbindTexture()};const Xt=L.createFramebuffer(),Yt=L.createFramebuffer();this.copyTextureToTexture=function(T,F,G=null,H=null,N=0,ie=null){T.isTexture!==!0&&(Ds("WebGLRenderer: copyTextureToTexture function signature has changed."),H=arguments[0]||null,T=arguments[1],F=arguments[2],ie=arguments[3]||0,G=null),ie===null&&(N!==0?(Ds("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),ie=N,N=0):ie=0);let ge,be,Me,Ue,ze,De,Je,dt,Bt;const Lt=T.isCompressedTexture?T.mipmaps[ie]:T.image;if(G!==null)ge=G.max.x-G.min.x,be=G.max.y-G.min.y,Me=G.isBox3?G.max.z-G.min.z:1,Ue=G.min.x,ze=G.min.y,De=G.isBox3?G.min.z:0;else{const Jn=Math.pow(2,-N);ge=Math.floor(Lt.width*Jn),be=Math.floor(Lt.height*Jn),T.isDataArrayTexture?Me=Lt.depth:T.isData3DTexture?Me=Math.floor(Lt.depth*Jn):Me=1,Ue=0,ze=0,De=0}H!==null?(Je=H.x,dt=H.y,Bt=H.z):(Je=0,dt=0,Bt=0);const ut=He.convert(F.format),Oe=He.convert(F.type);let nn;F.isData3DTexture?(R.setTexture3D(F,0),nn=L.TEXTURE_3D):F.isDataArrayTexture||F.isCompressedArrayTexture?(R.setTexture2DArray(F,0),nn=L.TEXTURE_2D_ARRAY):(R.setTexture2D(F,0),nn=L.TEXTURE_2D),L.pixelStorei(L.UNPACK_FLIP_Y_WEBGL,F.flipY),L.pixelStorei(L.UNPACK_PREMULTIPLY_ALPHA_WEBGL,F.premultiplyAlpha),L.pixelStorei(L.UNPACK_ALIGNMENT,F.unpackAlignment);const pt=L.getParameter(L.UNPACK_ROW_LENGTH),oi=L.getParameter(L.UNPACK_IMAGE_HEIGHT),ds=L.getParameter(L.UNPACK_SKIP_PIXELS),Fn=L.getParameter(L.UNPACK_SKIP_ROWS),go=L.getParameter(L.UNPACK_SKIP_IMAGES);L.pixelStorei(L.UNPACK_ROW_LENGTH,Lt.width),L.pixelStorei(L.UNPACK_IMAGE_HEIGHT,Lt.height),L.pixelStorei(L.UNPACK_SKIP_PIXELS,Ue),L.pixelStorei(L.UNPACK_SKIP_ROWS,ze),L.pixelStorei(L.UNPACK_SKIP_IMAGES,De);const At=T.isDataArrayTexture||T.isData3DTexture,jn=F.isDataArrayTexture||F.isData3DTexture;if(T.isDepthTexture){const Jn=Ce.get(T),_n=Ce.get(F),Tn=Ce.get(Jn.__renderTarget),ql=Ce.get(_n.__renderTarget);Te.bindFramebuffer(L.READ_FRAMEBUFFER,Tn.__webglFramebuffer),Te.bindFramebuffer(L.DRAW_FRAMEBUFFER,ql.__webglFramebuffer);for(let Rr=0;Rr<Me;Rr++)At&&(L.framebufferTextureLayer(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,Ce.get(T).__webglTexture,N,De+Rr),L.framebufferTextureLayer(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,Ce.get(F).__webglTexture,ie,Bt+Rr)),L.blitFramebuffer(Ue,ze,ge,be,Je,dt,ge,be,L.DEPTH_BUFFER_BIT,L.NEAREST);Te.bindFramebuffer(L.READ_FRAMEBUFFER,null),Te.bindFramebuffer(L.DRAW_FRAMEBUFFER,null)}else if(N!==0||T.isRenderTargetTexture||Ce.has(T)){const Jn=Ce.get(T),_n=Ce.get(F);Te.bindFramebuffer(L.READ_FRAMEBUFFER,Xt),Te.bindFramebuffer(L.DRAW_FRAMEBUFFER,Yt);for(let Tn=0;Tn<Me;Tn++)At?L.framebufferTextureLayer(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,Jn.__webglTexture,N,De+Tn):L.framebufferTexture2D(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,Jn.__webglTexture,N),jn?L.framebufferTextureLayer(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,_n.__webglTexture,ie,Bt+Tn):L.framebufferTexture2D(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,_n.__webglTexture,ie),N!==0?L.blitFramebuffer(Ue,ze,ge,be,Je,dt,ge,be,L.COLOR_BUFFER_BIT,L.NEAREST):jn?L.copyTexSubImage3D(nn,ie,Je,dt,Bt+Tn,Ue,ze,ge,be):L.copyTexSubImage2D(nn,ie,Je,dt,Ue,ze,ge,be);Te.bindFramebuffer(L.READ_FRAMEBUFFER,null),Te.bindFramebuffer(L.DRAW_FRAMEBUFFER,null)}else jn?T.isDataTexture||T.isData3DTexture?L.texSubImage3D(nn,ie,Je,dt,Bt,ge,be,Me,ut,Oe,Lt.data):F.isCompressedArrayTexture?L.compressedTexSubImage3D(nn,ie,Je,dt,Bt,ge,be,Me,ut,Lt.data):L.texSubImage3D(nn,ie,Je,dt,Bt,ge,be,Me,ut,Oe,Lt):T.isDataTexture?L.texSubImage2D(L.TEXTURE_2D,ie,Je,dt,ge,be,ut,Oe,Lt.data):T.isCompressedTexture?L.compressedTexSubImage2D(L.TEXTURE_2D,ie,Je,dt,Lt.width,Lt.height,ut,Lt.data):L.texSubImage2D(L.TEXTURE_2D,ie,Je,dt,ge,be,ut,Oe,Lt);L.pixelStorei(L.UNPACK_ROW_LENGTH,pt),L.pixelStorei(L.UNPACK_IMAGE_HEIGHT,oi),L.pixelStorei(L.UNPACK_SKIP_PIXELS,ds),L.pixelStorei(L.UNPACK_SKIP_ROWS,Fn),L.pixelStorei(L.UNPACK_SKIP_IMAGES,go),ie===0&&F.generateMipmaps&&L.generateMipmap(nn),Te.unbindTexture()},this.copyTextureToTexture3D=function(T,F,G=null,H=null,N=0){return T.isTexture!==!0&&(Ds("WebGLRenderer: copyTextureToTexture3D function signature has changed."),G=arguments[0]||null,H=arguments[1]||null,T=arguments[2],F=arguments[3],N=arguments[4]||0),Ds('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(T,F,G,H,N)},this.initRenderTarget=function(T){Ce.get(T).__webglFramebuffer===void 0&&R.setupRenderTarget(T)},this.initTexture=function(T){T.isCubeTexture?R.setTextureCube(T,0):T.isData3DTexture?R.setTexture3D(T,0):T.isDataArrayTexture||T.isCompressedArrayTexture?R.setTexture2DArray(T,0):R.setTexture2D(T,0),Te.unbindTexture()},this.resetState=function(){C=0,w=0,E=null,Te.reset(),lt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Gi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorspace=ft._getDrawingBufferColorSpace(e),t.unpackColorSpace=ft._getUnpackColorSpace()}}function Ry(r){if(!(typeof window>"u")){var e=document.createElement("style");return e.setAttribute("type","text/css"),e.innerHTML=r,document.head.appendChild(e),r}}function Os(r,e){var t=r.__state.conversionName.toString(),n=Math.round(r.r),i=Math.round(r.g),s=Math.round(r.b),o=r.a,a=Math.round(r.h),l=r.s.toFixed(1),c=r.v.toFixed(1);if(e||t==="THREE_CHAR_HEX"||t==="SIX_CHAR_HEX"){for(var u=r.hex.toString(16);u.length<6;)u="0"+u;return"#"+u}else{if(t==="CSS_RGB")return"rgb("+n+","+i+","+s+")";if(t==="CSS_RGBA")return"rgba("+n+","+i+","+s+","+o+")";if(t==="HEX")return"0x"+r.hex.toString(16);if(t==="RGB_ARRAY")return"["+n+","+i+","+s+"]";if(t==="RGBA_ARRAY")return"["+n+","+i+","+s+","+o+"]";if(t==="RGB_OBJ")return"{r:"+n+",g:"+i+",b:"+s+"}";if(t==="RGBA_OBJ")return"{r:"+n+",g:"+i+",b:"+s+",a:"+o+"}";if(t==="HSV_OBJ")return"{h:"+a+",s:"+l+",v:"+c+"}";if(t==="HSVA_OBJ")return"{h:"+a+",s:"+l+",v:"+c+",a:"+o+"}"}return"unknown format"}var Wh=Array.prototype.forEach,Eo=Array.prototype.slice,te={BREAK:{},extend:function(e){return this.each(Eo.call(arguments,1),function(t){var n=this.isObject(t)?Object.keys(t):[];n.forEach((function(i){this.isUndefined(t[i])||(e[i]=t[i])}).bind(this))},this),e},defaults:function(e){return this.each(Eo.call(arguments,1),function(t){var n=this.isObject(t)?Object.keys(t):[];n.forEach((function(i){this.isUndefined(e[i])&&(e[i]=t[i])}).bind(this))},this),e},compose:function(){var e=Eo.call(arguments);return function(){for(var t=Eo.call(arguments),n=e.length-1;n>=0;n--)t=[e[n].apply(this,t)];return t[0]}},each:function(e,t,n){if(e){if(Wh&&e.forEach&&e.forEach===Wh)e.forEach(t,n);else if(e.length===e.length+0){var i=void 0,s=void 0;for(i=0,s=e.length;i<s;i++)if(i in e&&t.call(n,e[i],i)===this.BREAK)return}else for(var o in e)if(t.call(n,e[o],o)===this.BREAK)return}},defer:function(e){setTimeout(e,0)},debounce:function(e,t,n){var i=void 0;return function(){var s=this,o=arguments;function a(){i=null,n||e.apply(s,o)}var l=n||!i;clearTimeout(i),i=setTimeout(a,t),l&&e.apply(s,o)}},toArray:function(e){return e.toArray?e.toArray():Eo.call(e)},isUndefined:function(e){return e===void 0},isNull:function(e){return e===null},isNaN:function(r){function e(t){return r.apply(this,arguments)}return e.toString=function(){return r.toString()},e}(function(r){return isNaN(r)}),isArray:Array.isArray||function(r){return r.constructor===Array},isObject:function(e){return e===Object(e)},isNumber:function(e){return e===e+0},isString:function(e){return e===e+""},isBoolean:function(e){return e===!1||e===!0},isFunction:function(e){return e instanceof Function}},Py=[{litmus:te.isString,conversions:{THREE_CHAR_HEX:{read:function(e){var t=e.match(/^#([A-F0-9])([A-F0-9])([A-F0-9])$/i);return t===null?!1:{space:"HEX",hex:parseInt("0x"+t[1].toString()+t[1].toString()+t[2].toString()+t[2].toString()+t[3].toString()+t[3].toString(),0)}},write:Os},SIX_CHAR_HEX:{read:function(e){var t=e.match(/^#([A-F0-9]{6})$/i);return t===null?!1:{space:"HEX",hex:parseInt("0x"+t[1].toString(),0)}},write:Os},CSS_RGB:{read:function(e){var t=e.match(/^rgb\(\s*(\S+)\s*,\s*(\S+)\s*,\s*(\S+)\s*\)/);return t===null?!1:{space:"RGB",r:parseFloat(t[1]),g:parseFloat(t[2]),b:parseFloat(t[3])}},write:Os},CSS_RGBA:{read:function(e){var t=e.match(/^rgba\(\s*(\S+)\s*,\s*(\S+)\s*,\s*(\S+)\s*,\s*(\S+)\s*\)/);return t===null?!1:{space:"RGB",r:parseFloat(t[1]),g:parseFloat(t[2]),b:parseFloat(t[3]),a:parseFloat(t[4])}},write:Os}}},{litmus:te.isNumber,conversions:{HEX:{read:function(e){return{space:"HEX",hex:e,conversionName:"HEX"}},write:function(e){return e.hex}}}},{litmus:te.isArray,conversions:{RGB_ARRAY:{read:function(e){return e.length!==3?!1:{space:"RGB",r:e[0],g:e[1],b:e[2]}},write:function(e){return[e.r,e.g,e.b]}},RGBA_ARRAY:{read:function(e){return e.length!==4?!1:{space:"RGB",r:e[0],g:e[1],b:e[2],a:e[3]}},write:function(e){return[e.r,e.g,e.b,e.a]}}}},{litmus:te.isObject,conversions:{RGBA_OBJ:{read:function(e){return te.isNumber(e.r)&&te.isNumber(e.g)&&te.isNumber(e.b)&&te.isNumber(e.a)?{space:"RGB",r:e.r,g:e.g,b:e.b,a:e.a}:!1},write:function(e){return{r:e.r,g:e.g,b:e.b,a:e.a}}},RGB_OBJ:{read:function(e){return te.isNumber(e.r)&&te.isNumber(e.g)&&te.isNumber(e.b)?{space:"RGB",r:e.r,g:e.g,b:e.b}:!1},write:function(e){return{r:e.r,g:e.g,b:e.b}}},HSVA_OBJ:{read:function(e){return te.isNumber(e.h)&&te.isNumber(e.s)&&te.isNumber(e.v)&&te.isNumber(e.a)?{space:"HSV",h:e.h,s:e.s,v:e.v,a:e.a}:!1},write:function(e){return{h:e.h,s:e.s,v:e.v,a:e.a}}},HSV_OBJ:{read:function(e){return te.isNumber(e.h)&&te.isNumber(e.s)&&te.isNumber(e.v)?{space:"HSV",h:e.h,s:e.s,v:e.v}:!1},write:function(e){return{h:e.h,s:e.s,v:e.v}}}}}],bo=void 0,Ga=void 0,Pu=function(){Ga=!1;var e=arguments.length>1?te.toArray(arguments):arguments[0];return te.each(Py,function(t){if(t.litmus(e))return te.each(t.conversions,function(n,i){if(bo=n.read(e),Ga===!1&&bo!==!1)return Ga=bo,bo.conversionName=i,bo.conversion=n,te.BREAK}),te.BREAK}),Ga},Xh=void 0,Tl={hsv_to_rgb:function(e,t,n){var i=Math.floor(e/60)%6,s=e/60-Math.floor(e/60),o=n*(1-t),a=n*(1-s*t),l=n*(1-(1-s)*t),c=[[n,l,o],[a,n,o],[o,n,l],[o,a,n],[l,o,n],[n,o,a]][i];return{r:c[0]*255,g:c[1]*255,b:c[2]*255}},rgb_to_hsv:function(e,t,n){var i=Math.min(e,t,n),s=Math.max(e,t,n),o=s-i,a=void 0,l=void 0;if(s!==0)l=o/s;else return{h:NaN,s:0,v:0};return e===s?a=(t-n)/o:t===s?a=2+(n-e)/o:a=4+(e-t)/o,a/=6,a<0&&(a+=1),{h:a*360,s:l,v:s/255}},rgb_to_hex:function(e,t,n){var i=this.hex_with_component(0,2,e);return i=this.hex_with_component(i,1,t),i=this.hex_with_component(i,0,n),i},component_from_hex:function(e,t){return e>>t*8&255},hex_with_component:function(e,t,n){return n<<(Xh=t*8)|e&~(255<<Xh)}},Dy=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(r){return typeof r}:function(r){return r&&typeof Symbol=="function"&&r.constructor===Symbol&&r!==Symbol.prototype?"symbol":typeof r},_i=function(r,e){if(!(r instanceof e))throw new TypeError("Cannot call a class as a function")},gi=function(){function r(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(e,t,n){return t&&r(e.prototype,t),n&&r(e,n),e}}(),Mr=function r(e,t,n){e===null&&(e=Function.prototype);var i=Object.getOwnPropertyDescriptor(e,t);if(i===void 0){var s=Object.getPrototypeOf(e);return s===null?void 0:r(s,t,n)}else{if("value"in i)return i.value;var o=i.get;return o===void 0?void 0:o.call(n)}},wr=function(r,e){if(typeof e!="function"&&e!==null)throw new TypeError("Super expression must either be null or a function, not "+typeof e);r.prototype=Object.create(e&&e.prototype,{constructor:{value:r,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(r,e):r.__proto__=e)},Ar=function(r,e){if(!r)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e&&(typeof e=="object"||typeof e=="function")?e:r},en=function(){function r(){if(_i(this,r),this.__state=Pu.apply(this,arguments),this.__state===!1)throw new Error("Failed to interpret color arguments");this.__state.a=this.__state.a||1}return gi(r,[{key:"toString",value:function(){return Os(this)}},{key:"toHexString",value:function(){return Os(this,!0)}},{key:"toOriginal",value:function(){return this.__state.conversion.write(this)}}]),r}();function xf(r,e,t){Object.defineProperty(r,e,{get:function(){return this.__state.space==="RGB"?this.__state[e]:(en.recalculateRGB(this,e,t),this.__state[e])},set:function(i){this.__state.space!=="RGB"&&(en.recalculateRGB(this,e,t),this.__state.space="RGB"),this.__state[e]=i}})}function Sf(r,e){Object.defineProperty(r,e,{get:function(){return this.__state.space==="HSV"?this.__state[e]:(en.recalculateHSV(this),this.__state[e])},set:function(n){this.__state.space!=="HSV"&&(en.recalculateHSV(this),this.__state.space="HSV"),this.__state[e]=n}})}en.recalculateRGB=function(r,e,t){if(r.__state.space==="HEX")r.__state[e]=Tl.component_from_hex(r.__state.hex,t);else if(r.__state.space==="HSV")te.extend(r.__state,Tl.hsv_to_rgb(r.__state.h,r.__state.s,r.__state.v));else throw new Error("Corrupted color state")};en.recalculateHSV=function(r){var e=Tl.rgb_to_hsv(r.r,r.g,r.b);te.extend(r.__state,{s:e.s,v:e.v}),te.isNaN(e.h)?te.isUndefined(r.__state.h)&&(r.__state.h=0):r.__state.h=e.h};en.COMPONENTS=["r","g","b","h","s","v","hex","a"];xf(en.prototype,"r",2);xf(en.prototype,"g",1);xf(en.prototype,"b",0);Sf(en.prototype,"h");Sf(en.prototype,"s");Sf(en.prototype,"v");Object.defineProperty(en.prototype,"a",{get:function(){return this.__state.a},set:function(e){this.__state.a=e}});Object.defineProperty(en.prototype,"hex",{get:function(){return this.__state.space!=="HEX"&&(this.__state.hex=Tl.rgb_to_hex(this.r,this.g,this.b),this.__state.space="HEX"),this.__state.hex},set:function(e){this.__state.space="HEX",this.__state.hex=e}});var fs=function(){function r(e,t){_i(this,r),this.initialValue=e[t],this.domElement=document.createElement("div"),this.object=e,this.property=t,this.__onChange=void 0,this.__onFinishChange=void 0}return gi(r,[{key:"onChange",value:function(t){return this.__onChange=t,this}},{key:"onFinishChange",value:function(t){return this.__onFinishChange=t,this}},{key:"setValue",value:function(t){return this.object[this.property]=t,this.__onChange&&this.__onChange.call(this,t),this.updateDisplay(),this}},{key:"getValue",value:function(){return this.object[this.property]}},{key:"updateDisplay",value:function(){return this}},{key:"isModified",value:function(){return this.initialValue!==this.getValue()}}]),r}(),Ly={HTMLEvents:["change"],MouseEvents:["click","mousemove","mousedown","mouseup","mouseover"],KeyboardEvents:["keydown"]},Dp={};te.each(Ly,function(r,e){te.each(r,function(t){Dp[t]=e})});var Uy=/(\d+(\.\d+)?)px/;function vi(r){if(r==="0"||te.isUndefined(r))return 0;var e=r.match(Uy);return te.isNull(e)?0:parseFloat(e[1])}var Y={makeSelectable:function(e,t){e===void 0||e.style===void 0||(e.onselectstart=t?function(){return!1}:function(){},e.style.MozUserSelect=t?"auto":"none",e.style.KhtmlUserSelect=t?"auto":"none",e.unselectable=t?"on":"off")},makeFullscreen:function(e,t,n){var i=n,s=t;te.isUndefined(s)&&(s=!0),te.isUndefined(i)&&(i=!0),e.style.position="absolute",s&&(e.style.left=0,e.style.right=0),i&&(e.style.top=0,e.style.bottom=0)},fakeEvent:function(e,t,n,i){var s=n||{},o=Dp[t];if(!o)throw new Error("Event type "+t+" not supported.");var a=document.createEvent(o);switch(o){case"MouseEvents":{var l=s.x||s.clientX||0,c=s.y||s.clientY||0;a.initMouseEvent(t,s.bubbles||!1,s.cancelable||!0,window,s.clickCount||1,0,0,l,c,!1,!1,!1,!1,0,null);break}case"KeyboardEvents":{var u=a.initKeyboardEvent||a.initKeyEvent;te.defaults(s,{cancelable:!0,ctrlKey:!1,altKey:!1,shiftKey:!1,metaKey:!1,keyCode:void 0,charCode:void 0}),u(t,s.bubbles||!1,s.cancelable,window,s.ctrlKey,s.altKey,s.shiftKey,s.metaKey,s.keyCode,s.charCode);break}default:{a.initEvent(t,s.bubbles||!1,s.cancelable||!0);break}}te.defaults(a,i),e.dispatchEvent(a)},bind:function(e,t,n,i){var s=i||!1;return e.addEventListener?e.addEventListener(t,n,s):e.attachEvent&&e.attachEvent("on"+t,n),Y},unbind:function(e,t,n,i){var s=i||!1;return e.removeEventListener?e.removeEventListener(t,n,s):e.detachEvent&&e.detachEvent("on"+t,n),Y},addClass:function(e,t){if(e.className===void 0)e.className=t;else if(e.className!==t){var n=e.className.split(/ +/);n.indexOf(t)===-1&&(n.push(t),e.className=n.join(" ").replace(/^\s+/,"").replace(/\s+$/,""))}return Y},removeClass:function(e,t){if(t)if(e.className===t)e.removeAttribute("class");else{var n=e.className.split(/ +/),i=n.indexOf(t);i!==-1&&(n.splice(i,1),e.className=n.join(" "))}else e.className=void 0;return Y},hasClass:function(e,t){return new RegExp("(?:^|\\s+)"+t+"(?:\\s+|$)").test(e.className)||!1},getWidth:function(e){var t=getComputedStyle(e);return vi(t["border-left-width"])+vi(t["border-right-width"])+vi(t["padding-left"])+vi(t["padding-right"])+vi(t.width)},getHeight:function(e){var t=getComputedStyle(e);return vi(t["border-top-width"])+vi(t["border-bottom-width"])+vi(t["padding-top"])+vi(t["padding-bottom"])+vi(t.height)},getOffset:function(e){var t=e,n={left:0,top:0};if(t.offsetParent)do n.left+=t.offsetLeft,n.top+=t.offsetTop,t=t.offsetParent;while(t);return n},isActive:function(e){return e===document.activeElement&&(e.type||e.href)}},Lp=function(r){wr(e,r);function e(t,n){_i(this,e);var i=Ar(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n)),s=i;i.__prev=i.getValue(),i.__checkbox=document.createElement("input"),i.__checkbox.setAttribute("type","checkbox");function o(){s.setValue(!s.__prev)}return Y.bind(i.__checkbox,"change",o,!1),i.domElement.appendChild(i.__checkbox),i.updateDisplay(),i}return gi(e,[{key:"setValue",value:function(n){var i=Mr(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"setValue",this).call(this,n);return this.__onFinishChange&&this.__onFinishChange.call(this,this.getValue()),this.__prev=this.getValue(),i}},{key:"updateDisplay",value:function(){return this.getValue()===!0?(this.__checkbox.setAttribute("checked","checked"),this.__checkbox.checked=!0,this.__prev=!0):(this.__checkbox.checked=!1,this.__prev=!1),Mr(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"updateDisplay",this).call(this)}}]),e}(fs),Iy=function(r){wr(e,r);function e(t,n,i){_i(this,e);var s=Ar(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n)),o=i,a=s;if(s.__select=document.createElement("select"),te.isArray(o)){var l={};te.each(o,function(c){l[c]=c}),o=l}return te.each(o,function(c,u){var h=document.createElement("option");h.innerHTML=u,h.setAttribute("value",c),a.__select.appendChild(h)}),s.updateDisplay(),Y.bind(s.__select,"change",function(){var c=this.options[this.selectedIndex].value;a.setValue(c)}),s.domElement.appendChild(s.__select),s}return gi(e,[{key:"setValue",value:function(n){var i=Mr(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"setValue",this).call(this,n);return this.__onFinishChange&&this.__onFinishChange.call(this,this.getValue()),i}},{key:"updateDisplay",value:function(){return Y.isActive(this.__select)?this:(this.__select.value=this.getValue(),Mr(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"updateDisplay",this).call(this))}}]),e}(fs),Ny=function(r){wr(e,r);function e(t,n){_i(this,e);var i=Ar(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n)),s=i;function o(){s.setValue(s.__input.value)}function a(){s.__onFinishChange&&s.__onFinishChange.call(s,s.getValue())}return i.__input=document.createElement("input"),i.__input.setAttribute("type","text"),Y.bind(i.__input,"keyup",o),Y.bind(i.__input,"change",o),Y.bind(i.__input,"blur",a),Y.bind(i.__input,"keydown",function(l){l.keyCode===13&&this.blur()}),i.updateDisplay(),i.domElement.appendChild(i.__input),i}return gi(e,[{key:"updateDisplay",value:function(){return Y.isActive(this.__input)||(this.__input.value=this.getValue()),Mr(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"updateDisplay",this).call(this)}}]),e}(fs);function Yh(r){var e=r.toString();return e.indexOf(".")>-1?e.length-e.indexOf(".")-1:0}var Up=function(r){wr(e,r);function e(t,n,i){_i(this,e);var s=Ar(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n)),o=i||{};return s.__min=o.min,s.__max=o.max,s.__step=o.step,te.isUndefined(s.__step)?s.initialValue===0?s.__impliedStep=1:s.__impliedStep=Math.pow(10,Math.floor(Math.log(Math.abs(s.initialValue))/Math.LN10))/10:s.__impliedStep=s.__step,s.__precision=Yh(s.__impliedStep),s}return gi(e,[{key:"setValue",value:function(n){var i=n;return this.__min!==void 0&&i<this.__min?i=this.__min:this.__max!==void 0&&i>this.__max&&(i=this.__max),this.__step!==void 0&&i%this.__step!==0&&(i=Math.round(i/this.__step)*this.__step),Mr(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"setValue",this).call(this,i)}},{key:"min",value:function(n){return this.__min=n,this}},{key:"max",value:function(n){return this.__max=n,this}},{key:"step",value:function(n){return this.__step=n,this.__impliedStep=n,this.__precision=Yh(n),this}}]),e}(fs);function Fy(r,e){var t=Math.pow(10,e);return Math.round(r*t)/t}var wl=function(r){wr(e,r);function e(t,n,i){_i(this,e);var s=Ar(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n,i));s.__truncationSuspended=!1;var o=s,a=void 0;function l(){var g=parseFloat(o.__input.value);te.isNaN(g)||o.setValue(g)}function c(){o.__onFinishChange&&o.__onFinishChange.call(o,o.getValue())}function u(){c()}function h(g){var _=a-g.clientY;o.setValue(o.getValue()+_*o.__impliedStep),a=g.clientY}function f(){Y.unbind(window,"mousemove",h),Y.unbind(window,"mouseup",f),c()}function d(g){Y.bind(window,"mousemove",h),Y.bind(window,"mouseup",f),a=g.clientY}return s.__input=document.createElement("input"),s.__input.setAttribute("type","text"),Y.bind(s.__input,"change",l),Y.bind(s.__input,"blur",u),Y.bind(s.__input,"mousedown",d),Y.bind(s.__input,"keydown",function(g){g.keyCode===13&&(o.__truncationSuspended=!0,this.blur(),o.__truncationSuspended=!1,c())}),s.updateDisplay(),s.domElement.appendChild(s.__input),s}return gi(e,[{key:"updateDisplay",value:function(){return this.__input.value=this.__truncationSuspended?this.getValue():Fy(this.getValue(),this.__precision),Mr(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"updateDisplay",this).call(this)}}]),e}(Up);function qh(r,e,t,n,i){return n+(i-n)*((r-e)/(t-e))}var Du=function(r){wr(e,r);function e(t,n,i,s,o){_i(this,e);var a=Ar(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n,{min:i,max:s,step:o})),l=a;a.__background=document.createElement("div"),a.__foreground=document.createElement("div"),Y.bind(a.__background,"mousedown",c),Y.bind(a.__background,"touchstart",f),Y.addClass(a.__background,"slider"),Y.addClass(a.__foreground,"slider-fg");function c(_){document.activeElement.blur(),Y.bind(window,"mousemove",u),Y.bind(window,"mouseup",h),u(_)}function u(_){_.preventDefault();var m=l.__background.getBoundingClientRect();return l.setValue(qh(_.clientX,m.left,m.right,l.__min,l.__max)),!1}function h(){Y.unbind(window,"mousemove",u),Y.unbind(window,"mouseup",h),l.__onFinishChange&&l.__onFinishChange.call(l,l.getValue())}function f(_){_.touches.length===1&&(Y.bind(window,"touchmove",d),Y.bind(window,"touchend",g),d(_))}function d(_){var m=_.touches[0].clientX,p=l.__background.getBoundingClientRect();l.setValue(qh(m,p.left,p.right,l.__min,l.__max))}function g(){Y.unbind(window,"touchmove",d),Y.unbind(window,"touchend",g),l.__onFinishChange&&l.__onFinishChange.call(l,l.getValue())}return a.updateDisplay(),a.__background.appendChild(a.__foreground),a.domElement.appendChild(a.__background),a}return gi(e,[{key:"updateDisplay",value:function(){var n=(this.getValue()-this.__min)/(this.__max-this.__min);return this.__foreground.style.width=n*100+"%",Mr(e.prototype.__proto__||Object.getPrototypeOf(e.prototype),"updateDisplay",this).call(this)}}]),e}(Up),Ip=function(r){wr(e,r);function e(t,n,i){_i(this,e);var s=Ar(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n)),o=s;return s.__button=document.createElement("div"),s.__button.innerHTML=i===void 0?"Fire":i,Y.bind(s.__button,"click",function(a){return a.preventDefault(),o.fire(),!1}),Y.addClass(s.__button,"button"),s.domElement.appendChild(s.__button),s}return gi(e,[{key:"fire",value:function(){this.__onChange&&this.__onChange.call(this),this.getValue().call(this.object),this.__onFinishChange&&this.__onFinishChange.call(this,this.getValue())}}]),e}(fs),Lu=function(r){wr(e,r);function e(t,n){_i(this,e);var i=Ar(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t,n));i.__color=new en(i.getValue()),i.__temp=new en(0);var s=i;i.domElement=document.createElement("div"),Y.makeSelectable(i.domElement,!1),i.__selector=document.createElement("div"),i.__selector.className="selector",i.__saturation_field=document.createElement("div"),i.__saturation_field.className="saturation-field",i.__field_knob=document.createElement("div"),i.__field_knob.className="field-knob",i.__field_knob_border="2px solid ",i.__hue_knob=document.createElement("div"),i.__hue_knob.className="hue-knob",i.__hue_field=document.createElement("div"),i.__hue_field.className="hue-field",i.__input=document.createElement("input"),i.__input.type="text",i.__input_textShadow="0 1px 1px ",Y.bind(i.__input,"keydown",function(_){_.keyCode===13&&h.call(this)}),Y.bind(i.__input,"blur",h),Y.bind(i.__selector,"mousedown",function(){Y.addClass(this,"drag").bind(window,"mouseup",function(){Y.removeClass(s.__selector,"drag")})}),Y.bind(i.__selector,"touchstart",function(){Y.addClass(this,"drag").bind(window,"touchend",function(){Y.removeClass(s.__selector,"drag")})});var o=document.createElement("div");te.extend(i.__selector.style,{width:"122px",height:"102px",padding:"3px",backgroundColor:"#222",boxShadow:"0px 1px 3px rgba(0,0,0,0.3)"}),te.extend(i.__field_knob.style,{position:"absolute",width:"12px",height:"12px",border:i.__field_knob_border+(i.__color.v<.5?"#fff":"#000"),boxShadow:"0px 1px 3px rgba(0,0,0,0.5)",borderRadius:"12px",zIndex:1}),te.extend(i.__hue_knob.style,{position:"absolute",width:"15px",height:"2px",borderRight:"4px solid #fff",zIndex:1}),te.extend(i.__saturation_field.style,{width:"100px",height:"100px",border:"1px solid #555",marginRight:"3px",display:"inline-block",cursor:"pointer"}),te.extend(o.style,{width:"100%",height:"100%",background:"none"}),$h(o,"top","rgba(0,0,0,0)","#000"),te.extend(i.__hue_field.style,{width:"15px",height:"100px",border:"1px solid #555",cursor:"ns-resize",position:"absolute",top:"3px",right:"3px"}),By(i.__hue_field),te.extend(i.__input.style,{outline:"none",textAlign:"center",color:"#fff",border:0,fontWeight:"bold",textShadow:i.__input_textShadow+"rgba(0,0,0,0.7)"}),Y.bind(i.__saturation_field,"mousedown",a),Y.bind(i.__saturation_field,"touchstart",a),Y.bind(i.__field_knob,"mousedown",a),Y.bind(i.__field_knob,"touchstart",a),Y.bind(i.__hue_field,"mousedown",l),Y.bind(i.__hue_field,"touchstart",l);function a(_){d(_),Y.bind(window,"mousemove",d),Y.bind(window,"touchmove",d),Y.bind(window,"mouseup",c),Y.bind(window,"touchend",c)}function l(_){g(_),Y.bind(window,"mousemove",g),Y.bind(window,"touchmove",g),Y.bind(window,"mouseup",u),Y.bind(window,"touchend",u)}function c(){Y.unbind(window,"mousemove",d),Y.unbind(window,"touchmove",d),Y.unbind(window,"mouseup",c),Y.unbind(window,"touchend",c),f()}function u(){Y.unbind(window,"mousemove",g),Y.unbind(window,"touchmove",g),Y.unbind(window,"mouseup",u),Y.unbind(window,"touchend",u),f()}function h(){var _=Pu(this.value);_!==!1?(s.__color.__state=_,s.setValue(s.__color.toOriginal())):this.value=s.__color.toString()}function f(){s.__onFinishChange&&s.__onFinishChange.call(s,s.__color.toOriginal())}i.__saturation_field.appendChild(o),i.__selector.appendChild(i.__field_knob),i.__selector.appendChild(i.__saturation_field),i.__selector.appendChild(i.__hue_field),i.__hue_field.appendChild(i.__hue_knob),i.domElement.appendChild(i.__input),i.domElement.appendChild(i.__selector),i.updateDisplay();function d(_){_.type.indexOf("touch")===-1&&_.preventDefault();var m=s.__saturation_field.getBoundingClientRect(),p=_.touches&&_.touches[0]||_,M=p.clientX,y=p.clientY,v=(M-m.left)/(m.right-m.left),A=1-(y-m.top)/(m.bottom-m.top);return A>1?A=1:A<0&&(A=0),v>1?v=1:v<0&&(v=0),s.__color.v=A,s.__color.s=v,s.setValue(s.__color.toOriginal()),!1}function g(_){_.type.indexOf("touch")===-1&&_.preventDefault();var m=s.__hue_field.getBoundingClientRect(),p=_.touches&&_.touches[0]||_,M=p.clientY,y=1-(M-m.top)/(m.bottom-m.top);return y>1?y=1:y<0&&(y=0),s.__color.h=y*360,s.setValue(s.__color.toOriginal()),!1}return i}return gi(e,[{key:"updateDisplay",value:function(){var n=Pu(this.getValue());if(n!==!1){var i=!1;te.each(en.COMPONENTS,function(a){if(!te.isUndefined(n[a])&&!te.isUndefined(this.__color.__state[a])&&n[a]!==this.__color.__state[a])return i=!0,{}},this),i&&te.extend(this.__color.__state,n)}te.extend(this.__temp.__state,this.__color.__state),this.__temp.a=1;var s=this.__color.v<.5||this.__color.s>.5?255:0,o=255-s;te.extend(this.__field_knob.style,{marginLeft:100*this.__color.s-7+"px",marginTop:100*(1-this.__color.v)-7+"px",backgroundColor:this.__temp.toHexString(),border:this.__field_knob_border+"rgb("+s+","+s+","+s+")"}),this.__hue_knob.style.marginTop=(1-this.__color.h/360)*100+"px",this.__temp.s=1,this.__temp.v=1,$h(this.__saturation_field,"left","#fff",this.__temp.toHexString()),this.__input.value=this.__color.toString(),te.extend(this.__input.style,{backgroundColor:this.__color.toHexString(),color:"rgb("+s+","+s+","+s+")",textShadow:this.__input_textShadow+"rgba("+o+","+o+","+o+",.7)"})}}]),e}(fs),Oy=["-moz-","-o-","-webkit-","-ms-",""];function $h(r,e,t,n){r.style.background="",te.each(Oy,function(i){r.style.cssText+="background: "+i+"linear-gradient("+e+", "+t+" 0%, "+n+" 100%); "})}function By(r){r.style.background="",r.style.cssText+="background: -moz-linear-gradient(top,  #ff0000 0%, #ff00ff 17%, #0000ff 34%, #00ffff 50%, #00ff00 67%, #ffff00 84%, #ff0000 100%);",r.style.cssText+="background: -webkit-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);",r.style.cssText+="background: -o-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);",r.style.cssText+="background: -ms-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);",r.style.cssText+="background: linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);"}var zy={load:function(e,t){var n=t||document,i=n.createElement("link");i.type="text/css",i.rel="stylesheet",i.href=e,n.getElementsByTagName("head")[0].appendChild(i)},inject:function(e,t){var n=t||document,i=document.createElement("style");i.type="text/css",i.innerHTML=e;var s=n.getElementsByTagName("head")[0];try{s.appendChild(i)}catch{}}},ky=`<div id="dg-save" class="dg dialogue">

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

</div>`,Hy=function(e,t){var n=e[t];return te.isArray(arguments[2])||te.isObject(arguments[2])?new Iy(e,t,arguments[2]):te.isNumber(n)?te.isNumber(arguments[2])&&te.isNumber(arguments[3])?te.isNumber(arguments[4])?new Du(e,t,arguments[2],arguments[3],arguments[4]):new Du(e,t,arguments[2],arguments[3]):te.isNumber(arguments[4])?new wl(e,t,{min:arguments[2],max:arguments[3],step:arguments[4]}):new wl(e,t,{min:arguments[2],max:arguments[3]}):te.isString(n)?new Ny(e,t):te.isFunction(n)?new Ip(e,t,""):te.isBoolean(n)?new Lp(e,t):null};function Vy(r){setTimeout(r,1e3/60)}var Gy=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||Vy,Wy=function(){function r(){_i(this,r),this.backgroundElement=document.createElement("div"),te.extend(this.backgroundElement.style,{backgroundColor:"rgba(0,0,0,0.8)",top:0,left:0,display:"none",zIndex:"1000",opacity:0,WebkitTransition:"opacity 0.2s linear",transition:"opacity 0.2s linear"}),Y.makeFullscreen(this.backgroundElement),this.backgroundElement.style.position="fixed",this.domElement=document.createElement("div"),te.extend(this.domElement.style,{position:"fixed",display:"none",zIndex:"1001",opacity:0,WebkitTransition:"-webkit-transform 0.2s ease-out, opacity 0.2s linear",transition:"transform 0.2s ease-out, opacity 0.2s linear"}),document.body.appendChild(this.backgroundElement),document.body.appendChild(this.domElement);var e=this;Y.bind(this.backgroundElement,"click",function(){e.hide()})}return gi(r,[{key:"show",value:function(){var t=this;this.backgroundElement.style.display="block",this.domElement.style.display="block",this.domElement.style.opacity=0,this.domElement.style.webkitTransform="scale(1.1)",this.layout(),te.defer(function(){t.backgroundElement.style.opacity=1,t.domElement.style.opacity=1,t.domElement.style.webkitTransform="scale(1)"})}},{key:"hide",value:function(){var t=this,n=function i(){t.domElement.style.display="none",t.backgroundElement.style.display="none",Y.unbind(t.domElement,"webkitTransitionEnd",i),Y.unbind(t.domElement,"transitionend",i),Y.unbind(t.domElement,"oTransitionEnd",i)};Y.bind(this.domElement,"webkitTransitionEnd",n),Y.bind(this.domElement,"transitionend",n),Y.bind(this.domElement,"oTransitionEnd",n),this.backgroundElement.style.opacity=0,this.domElement.style.opacity=0,this.domElement.style.webkitTransform="scale(1.1)"}},{key:"layout",value:function(){this.domElement.style.left=window.innerWidth/2-Y.getWidth(this.domElement)/2+"px",this.domElement.style.top=window.innerHeight/2-Y.getHeight(this.domElement)/2+"px"}}]),r}(),Xy=Ry(`.dg ul{list-style:none;margin:0;padding:0;width:100%;clear:both}.dg.ac{position:fixed;top:0;left:0;right:0;height:0;z-index:0}.dg:not(.ac) .main{overflow:hidden}.dg.main{-webkit-transition:opacity .1s linear;-o-transition:opacity .1s linear;-moz-transition:opacity .1s linear;transition:opacity .1s linear}.dg.main.taller-than-window{overflow-y:auto}.dg.main.taller-than-window .close-button{opacity:1;margin-top:-1px;border-top:1px solid #2c2c2c}.dg.main ul.closed .close-button{opacity:1 !important}.dg.main:hover .close-button,.dg.main .close-button.drag{opacity:1}.dg.main .close-button{-webkit-transition:opacity .1s linear;-o-transition:opacity .1s linear;-moz-transition:opacity .1s linear;transition:opacity .1s linear;border:0;line-height:19px;height:20px;cursor:pointer;text-align:center;background-color:#000}.dg.main .close-button.close-top{position:relative}.dg.main .close-button.close-bottom{position:absolute}.dg.main .close-button:hover{background-color:#111}.dg.a{float:right;margin-right:15px;overflow-y:visible}.dg.a.has-save>ul.close-top{margin-top:0}.dg.a.has-save>ul.close-bottom{margin-top:27px}.dg.a.has-save>ul.closed{margin-top:0}.dg.a .save-row{top:0;z-index:1002}.dg.a .save-row.close-top{position:relative}.dg.a .save-row.close-bottom{position:fixed}.dg li{-webkit-transition:height .1s ease-out;-o-transition:height .1s ease-out;-moz-transition:height .1s ease-out;transition:height .1s ease-out;-webkit-transition:overflow .1s linear;-o-transition:overflow .1s linear;-moz-transition:overflow .1s linear;transition:overflow .1s linear}.dg li:not(.folder){cursor:auto;height:27px;line-height:27px;padding:0 4px 0 5px}.dg li.folder{padding:0;border-left:4px solid rgba(0,0,0,0)}.dg li.title{cursor:pointer;margin-left:-4px}.dg .closed li:not(.title),.dg .closed ul li,.dg .closed ul li>*{height:0;overflow:hidden;border:0}.dg .cr{clear:both;padding-left:3px;height:27px;overflow:hidden}.dg .property-name{cursor:default;float:left;clear:left;width:40%;overflow:hidden;text-overflow:ellipsis}.dg .cr.function .property-name{width:100%}.dg .c{float:left;width:60%;position:relative}.dg .c input[type=text]{border:0;margin-top:4px;padding:3px;width:100%;float:right}.dg .has-slider input[type=text]{width:30%;margin-left:0}.dg .slider{float:left;width:66%;margin-left:-5px;margin-right:0;height:19px;margin-top:4px}.dg .slider-fg{height:100%}.dg .c input[type=checkbox]{margin-top:7px}.dg .c select{margin-top:5px}.dg .cr.function,.dg .cr.function .property-name,.dg .cr.function *,.dg .cr.boolean,.dg .cr.boolean *{cursor:pointer}.dg .cr.color{overflow:visible}.dg .selector{display:none;position:absolute;margin-left:-9px;margin-top:23px;z-index:10}.dg .c:hover .selector,.dg .selector.drag{display:block}.dg li.save-row{padding:0}.dg li.save-row .button{display:inline-block;padding:0px 6px}.dg.dialogue{background-color:#222;width:460px;padding:15px;font-size:13px;line-height:15px}#dg-new-constructor{padding:10px;color:#222;font-family:Monaco, monospace;font-size:10px;border:0;resize:none;box-shadow:inset 1px 1px 1px #888;word-wrap:break-word;margin:12px 0;display:block;width:440px;overflow-y:scroll;height:100px;position:relative}#dg-local-explain{display:none;font-size:11px;line-height:17px;border-radius:3px;background-color:#333;padding:8px;margin-top:10px}#dg-local-explain code{font-size:10px}#dat-gui-save-locally{display:none}.dg{color:#eee;font:11px 'Lucida Grande', sans-serif;text-shadow:0 -1px 0 #111}.dg.main::-webkit-scrollbar{width:5px;background:#1a1a1a}.dg.main::-webkit-scrollbar-corner{height:0;display:none}.dg.main::-webkit-scrollbar-thumb{border-radius:5px;background:#676767}.dg li:not(.folder){background:#1a1a1a;border-bottom:1px solid #2c2c2c}.dg li.save-row{line-height:25px;background:#dad5cb;border:0}.dg li.save-row select{margin-left:5px;width:108px}.dg li.save-row .button{margin-left:5px;margin-top:1px;border-radius:2px;font-size:9px;line-height:7px;padding:4px 4px 5px 4px;background:#c5bdad;color:#fff;text-shadow:0 1px 0 #b0a58f;box-shadow:0 -1px 0 #b0a58f;cursor:pointer}.dg li.save-row .button.gears{background:#c5bdad url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAANCAYAAAB/9ZQ7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAQJJREFUeNpiYKAU/P//PwGIC/ApCABiBSAW+I8AClAcgKxQ4T9hoMAEUrxx2QSGN6+egDX+/vWT4e7N82AMYoPAx/evwWoYoSYbACX2s7KxCxzcsezDh3evFoDEBYTEEqycggWAzA9AuUSQQgeYPa9fPv6/YWm/Acx5IPb7ty/fw+QZblw67vDs8R0YHyQhgObx+yAJkBqmG5dPPDh1aPOGR/eugW0G4vlIoTIfyFcA+QekhhHJhPdQxbiAIguMBTQZrPD7108M6roWYDFQiIAAv6Aow/1bFwXgis+f2LUAynwoIaNcz8XNx3Dl7MEJUDGQpx9gtQ8YCueB+D26OECAAQDadt7e46D42QAAAABJRU5ErkJggg==) 2px 1px no-repeat;height:7px;width:8px}.dg li.save-row .button:hover{background-color:#bab19e;box-shadow:0 -1px 0 #b0a58f}.dg li.folder{border-bottom:0}.dg li.title{padding-left:16px;background:#000 url(data:image/gif;base64,R0lGODlhBQAFAJEAAP////Pz8////////yH5BAEAAAIALAAAAAAFAAUAAAIIlI+hKgFxoCgAOw==) 6px 10px no-repeat;cursor:pointer;border-bottom:1px solid rgba(255,255,255,0.2)}.dg .closed li.title{background-image:url(data:image/gif;base64,R0lGODlhBQAFAJEAAP////Pz8////////yH5BAEAAAIALAAAAAAFAAUAAAIIlGIWqMCbWAEAOw==)}.dg .cr.boolean{border-left:3px solid #806787}.dg .cr.color{border-left:3px solid}.dg .cr.function{border-left:3px solid #e61d5f}.dg .cr.number{border-left:3px solid #2FA1D6}.dg .cr.number input[type=text]{color:#2FA1D6}.dg .cr.string{border-left:3px solid #1ed36f}.dg .cr.string input[type=text]{color:#1ed36f}.dg .cr.function:hover,.dg .cr.boolean:hover{background:#111}.dg .c input[type=text]{background:#303030;outline:none}.dg .c input[type=text]:hover{background:#3c3c3c}.dg .c input[type=text]:focus{background:#494949;color:#fff}.dg .c .slider{background:#303030;cursor:ew-resize}.dg .c .slider-fg{background:#2FA1D6;max-width:100%}.dg .c .slider:hover{background:#3c3c3c}.dg .c .slider:hover .slider-fg{background:#44abda}
`);zy.inject(Xy);var Kh="dg",Zh=72,jh=20,ra="Default",Po=function(){try{return!!window.localStorage}catch{return!1}}(),Ho=void 0,Jh=!0,Ls=void 0,bc=!1,Np=[],Tt=function r(e){var t=this,n=e||{};this.domElement=document.createElement("div"),this.__ul=document.createElement("ul"),this.domElement.appendChild(this.__ul),Y.addClass(this.domElement,Kh),this.__folders={},this.__controllers=[],this.__rememberedObjects=[],this.__rememberedObjectIndecesToControllers=[],this.__listening=[],n=te.defaults(n,{closeOnTop:!1,autoPlace:!0,width:r.DEFAULT_WIDTH}),n=te.defaults(n,{resizable:n.autoPlace,hideable:n.autoPlace}),te.isUndefined(n.load)?n.load={preset:ra}:n.preset&&(n.load.preset=n.preset),te.isUndefined(n.parent)&&n.hideable&&Np.push(this),n.resizable=te.isUndefined(n.parent)&&n.resizable,n.autoPlace&&te.isUndefined(n.scrollable)&&(n.scrollable=!0);var i=Po&&localStorage.getItem(Us(this,"isLocal"))==="true",s=void 0,o=void 0;if(Object.defineProperties(this,{parent:{get:function(){return n.parent}},scrollable:{get:function(){return n.scrollable}},autoPlace:{get:function(){return n.autoPlace}},closeOnTop:{get:function(){return n.closeOnTop}},preset:{get:function(){return t.parent?t.getRoot().preset:n.load.preset},set:function(f){t.parent?t.getRoot().preset=f:n.load.preset=f,Ky(this),t.revert()}},width:{get:function(){return n.width},set:function(f){n.width=f,Nu(t,f)}},name:{get:function(){return n.name},set:function(f){n.name=f,o&&(o.innerHTML=n.name)}},closed:{get:function(){return n.closed},set:function(f){n.closed=f,n.closed?Y.addClass(t.__ul,r.CLASS_CLOSED):Y.removeClass(t.__ul,r.CLASS_CLOSED),this.onResize(),t.__closeButton&&(t.__closeButton.innerHTML=f?r.TEXT_OPEN:r.TEXT_CLOSED)}},load:{get:function(){return n.load}},useLocalStorage:{get:function(){return i},set:function(f){Po&&(i=f,f?Y.bind(window,"unload",s):Y.unbind(window,"unload",s),localStorage.setItem(Us(t,"isLocal"),f))}}}),te.isUndefined(n.parent)){if(this.closed=n.closed||!1,Y.addClass(this.domElement,r.CLASS_MAIN),Y.makeSelectable(this.domElement,!1),Po&&i){t.useLocalStorage=!0;var a=localStorage.getItem(Us(this,"gui"));a&&(n.load=JSON.parse(a))}this.__closeButton=document.createElement("div"),this.__closeButton.innerHTML=r.TEXT_CLOSED,Y.addClass(this.__closeButton,r.CLASS_CLOSE_BUTTON),n.closeOnTop?(Y.addClass(this.__closeButton,r.CLASS_CLOSE_TOP),this.domElement.insertBefore(this.__closeButton,this.domElement.childNodes[0])):(Y.addClass(this.__closeButton,r.CLASS_CLOSE_BOTTOM),this.domElement.appendChild(this.__closeButton)),Y.bind(this.__closeButton,"click",function(){t.closed=!t.closed})}else{n.closed===void 0&&(n.closed=!0);var l=document.createTextNode(n.name);Y.addClass(l,"controller-name"),o=yf(t,l);var c=function(f){return f.preventDefault(),t.closed=!t.closed,!1};Y.addClass(this.__ul,r.CLASS_CLOSED),Y.addClass(o,"title"),Y.bind(o,"click",c),n.closed||(this.closed=!1)}n.autoPlace&&(te.isUndefined(n.parent)&&(Jh&&(Ls=document.createElement("div"),Y.addClass(Ls,Kh),Y.addClass(Ls,r.CLASS_AUTO_PLACE_CONTAINER),document.body.appendChild(Ls),Jh=!1),Ls.appendChild(this.domElement),Y.addClass(this.domElement,r.CLASS_AUTO_PLACE)),this.parent||Nu(t,n.width)),this.__resizeHandler=function(){t.onResizeDebounced()},Y.bind(window,"resize",this.__resizeHandler),Y.bind(this.__ul,"webkitTransitionEnd",this.__resizeHandler),Y.bind(this.__ul,"transitionend",this.__resizeHandler),Y.bind(this.__ul,"oTransitionEnd",this.__resizeHandler),this.onResize(),n.resizable&&$y(this),s=function(){Po&&localStorage.getItem(Us(t,"isLocal"))==="true"&&localStorage.setItem(Us(t,"gui"),JSON.stringify(t.getSaveObject()))},this.saveToLocalStorageIfPossible=s;function u(){var h=t.getRoot();h.width+=1,te.defer(function(){h.width-=1})}n.parent||u()};Tt.toggleHide=function(){bc=!bc,te.each(Np,function(r){r.domElement.style.display=bc?"none":""})};Tt.CLASS_AUTO_PLACE="a";Tt.CLASS_AUTO_PLACE_CONTAINER="ac";Tt.CLASS_MAIN="main";Tt.CLASS_CONTROLLER_ROW="cr";Tt.CLASS_TOO_TALL="taller-than-window";Tt.CLASS_CLOSED="closed";Tt.CLASS_CLOSE_BUTTON="close-button";Tt.CLASS_CLOSE_TOP="close-top";Tt.CLASS_CLOSE_BOTTOM="close-bottom";Tt.CLASS_DRAG="drag";Tt.DEFAULT_WIDTH=245;Tt.TEXT_CLOSED="Close Controls";Tt.TEXT_OPEN="Open Controls";Tt._keydownHandler=function(r){document.activeElement.type!=="text"&&(r.which===Zh||r.keyCode===Zh)&&Tt.toggleHide()};Y.bind(window,"keydown",Tt._keydownHandler,!1);te.extend(Tt.prototype,{add:function(e,t){return Vo(this,e,t,{factoryArgs:Array.prototype.slice.call(arguments,2)})},addColor:function(e,t){return Vo(this,e,t,{color:!0})},remove:function(e){this.__ul.removeChild(e.__li),this.__controllers.splice(this.__controllers.indexOf(e),1);var t=this;te.defer(function(){t.onResize()})},destroy:function(){if(this.parent)throw new Error("Only the root GUI should be removed with .destroy(). For subfolders, use gui.removeFolder(folder) instead.");this.autoPlace&&Ls.removeChild(this.domElement);var e=this;te.each(this.__folders,function(t){e.removeFolder(t)}),Y.unbind(window,"keydown",Tt._keydownHandler,!1),Qh(this)},addFolder:function(e){if(this.__folders[e]!==void 0)throw new Error('You already have a folder in this GUI by the name "'+e+'"');var t={name:e,parent:this};t.autoPlace=this.autoPlace,this.load&&this.load.folders&&this.load.folders[e]&&(t.closed=this.load.folders[e].closed,t.load=this.load.folders[e]);var n=new Tt(t);this.__folders[e]=n;var i=yf(this,n.domElement);return Y.addClass(i,"folder"),n},removeFolder:function(e){this.__ul.removeChild(e.domElement.parentElement),delete this.__folders[e.name],this.load&&this.load.folders&&this.load.folders[e.name]&&delete this.load.folders[e.name],Qh(e);var t=this;te.each(e.__folders,function(n){e.removeFolder(n)}),te.defer(function(){t.onResize()})},open:function(){this.closed=!1},close:function(){this.closed=!0},hide:function(){this.domElement.style.display="none"},show:function(){this.domElement.style.display=""},onResize:function(){var e=this.getRoot();if(e.scrollable){var t=Y.getOffset(e.__ul).top,n=0;te.each(e.__ul.childNodes,function(i){e.autoPlace&&i===e.__save_row||(n+=Y.getHeight(i))}),window.innerHeight-t-jh<n?(Y.addClass(e.domElement,Tt.CLASS_TOO_TALL),e.__ul.style.height=window.innerHeight-t-jh+"px"):(Y.removeClass(e.domElement,Tt.CLASS_TOO_TALL),e.__ul.style.height="auto")}e.__resize_handle&&te.defer(function(){e.__resize_handle.style.height=e.__ul.offsetHeight+"px"}),e.__closeButton&&(e.__closeButton.style.width=e.width+"px")},onResizeDebounced:te.debounce(function(){this.onResize()},50),remember:function(){if(te.isUndefined(Ho)&&(Ho=new Wy,Ho.domElement.innerHTML=ky),this.parent)throw new Error("You can only call remember on a top level GUI.");var e=this;te.each(Array.prototype.slice.call(arguments),function(t){e.__rememberedObjects.length===0&&qy(e),e.__rememberedObjects.indexOf(t)===-1&&e.__rememberedObjects.push(t)}),this.autoPlace&&Nu(this,this.width)},getRoot:function(){for(var e=this;e.parent;)e=e.parent;return e},getSaveObject:function(){var e=this.load;return e.closed=this.closed,this.__rememberedObjects.length>0&&(e.preset=this.preset,e.remembered||(e.remembered={}),e.remembered[this.preset]=Wa(this)),e.folders={},te.each(this.__folders,function(t,n){e.folders[n]=t.getSaveObject()}),e},save:function(){this.load.remembered||(this.load.remembered={}),this.load.remembered[this.preset]=Wa(this),Uu(this,!1),this.saveToLocalStorageIfPossible()},saveAs:function(e){this.load.remembered||(this.load.remembered={},this.load.remembered[ra]=Wa(this,!0)),this.load.remembered[e]=Wa(this),this.preset=e,Iu(this,e,!0),this.saveToLocalStorageIfPossible()},revert:function(e){te.each(this.__controllers,function(t){this.getRoot().load.remembered?Fp(e||this.getRoot(),t):t.setValue(t.initialValue),t.__onFinishChange&&t.__onFinishChange.call(t,t.getValue())},this),te.each(this.__folders,function(t){t.revert(t)}),e||Uu(this.getRoot(),!1)},listen:function(e){var t=this.__listening.length===0;this.__listening.push(e),t&&Op(this.__listening)},updateDisplay:function(){te.each(this.__controllers,function(e){e.updateDisplay()}),te.each(this.__folders,function(e){e.updateDisplay()})}});function yf(r,e,t){var n=document.createElement("li");return e&&n.appendChild(e),t?r.__ul.insertBefore(n,t):r.__ul.appendChild(n),r.onResize(),n}function Qh(r){Y.unbind(window,"resize",r.__resizeHandler),r.saveToLocalStorageIfPossible&&Y.unbind(window,"unload",r.saveToLocalStorageIfPossible)}function Uu(r,e){var t=r.__preset_select[r.__preset_select.selectedIndex];e?t.innerHTML=t.value+"*":t.innerHTML=t.value}function Yy(r,e,t){if(t.__li=e,t.__gui=r,te.extend(t,{options:function(o){if(arguments.length>1){var a=t.__li.nextElementSibling;return t.remove(),Vo(r,t.object,t.property,{before:a,factoryArgs:[te.toArray(arguments)]})}if(te.isArray(o)||te.isObject(o)){var l=t.__li.nextElementSibling;return t.remove(),Vo(r,t.object,t.property,{before:l,factoryArgs:[o]})}},name:function(o){return t.__li.firstElementChild.firstElementChild.innerHTML=o,t},listen:function(){return t.__gui.listen(t),t},remove:function(){return t.__gui.remove(t),t}}),t instanceof Du){var n=new wl(t.object,t.property,{min:t.__min,max:t.__max,step:t.__step});te.each(["updateDisplay","onChange","onFinishChange","step","min","max"],function(s){var o=t[s],a=n[s];t[s]=n[s]=function(){var l=Array.prototype.slice.call(arguments);return a.apply(n,l),o.apply(t,l)}}),Y.addClass(e,"has-slider"),t.domElement.insertBefore(n.domElement,t.domElement.firstElementChild)}else if(t instanceof wl){var i=function(o){if(te.isNumber(t.__min)&&te.isNumber(t.__max)){var a=t.__li.firstElementChild.firstElementChild.innerHTML,l=t.__gui.__listening.indexOf(t)>-1;t.remove();var c=Vo(r,t.object,t.property,{before:t.__li.nextElementSibling,factoryArgs:[t.__min,t.__max,t.__step]});return c.name(a),l&&c.listen(),c}return o};t.min=te.compose(i,t.min),t.max=te.compose(i,t.max)}else t instanceof Lp?(Y.bind(e,"click",function(){Y.fakeEvent(t.__checkbox,"click")}),Y.bind(t.__checkbox,"click",function(s){s.stopPropagation()})):t instanceof Ip?(Y.bind(e,"click",function(){Y.fakeEvent(t.__button,"click")}),Y.bind(e,"mouseover",function(){Y.addClass(t.__button,"hover")}),Y.bind(e,"mouseout",function(){Y.removeClass(t.__button,"hover")})):t instanceof Lu&&(Y.addClass(e,"color"),t.updateDisplay=te.compose(function(s){return e.style.borderLeftColor=t.__color.toString(),s},t.updateDisplay),t.updateDisplay());t.setValue=te.compose(function(s){return r.getRoot().__preset_select&&t.isModified()&&Uu(r.getRoot(),!0),s},t.setValue)}function Fp(r,e){var t=r.getRoot(),n=t.__rememberedObjects.indexOf(e.object);if(n!==-1){var i=t.__rememberedObjectIndecesToControllers[n];if(i===void 0&&(i={},t.__rememberedObjectIndecesToControllers[n]=i),i[e.property]=e,t.load&&t.load.remembered){var s=t.load.remembered,o=void 0;if(s[r.preset])o=s[r.preset];else if(s[ra])o=s[ra];else return;if(o[n]&&o[n][e.property]!==void 0){var a=o[n][e.property];e.initialValue=a,e.setValue(a)}}}}function Vo(r,e,t,n){if(e[t]===void 0)throw new Error('Object "'+e+'" has no property "'+t+'"');var i=void 0;if(n.color)i=new Lu(e,t);else{var s=[e,t].concat(n.factoryArgs);i=Hy.apply(r,s)}n.before instanceof fs&&(n.before=n.before.__li),Fp(r,i),Y.addClass(i.domElement,"c");var o=document.createElement("span");Y.addClass(o,"property-name"),o.innerHTML=i.property;var a=document.createElement("div");a.appendChild(o),a.appendChild(i.domElement);var l=yf(r,a,n.before);return Y.addClass(l,Tt.CLASS_CONTROLLER_ROW),i instanceof Lu?Y.addClass(l,"color"):Y.addClass(l,Dy(i.getValue())),Yy(r,l,i),r.__controllers.push(i),i}function Us(r,e){return document.location.href+"."+e}function Iu(r,e,t){var n=document.createElement("option");n.innerHTML=e,n.value=e,r.__preset_select.appendChild(n),t&&(r.__preset_select.selectedIndex=r.__preset_select.length-1)}function ed(r,e){e.style.display=r.useLocalStorage?"block":"none"}function qy(r){var e=r.__save_row=document.createElement("li");Y.addClass(r.domElement,"has-save"),r.__ul.insertBefore(e,r.__ul.firstChild),Y.addClass(e,"save-row");var t=document.createElement("span");t.innerHTML="&nbsp;",Y.addClass(t,"button gears");var n=document.createElement("span");n.innerHTML="Save",Y.addClass(n,"button"),Y.addClass(n,"save");var i=document.createElement("span");i.innerHTML="New",Y.addClass(i,"button"),Y.addClass(i,"save-as");var s=document.createElement("span");s.innerHTML="Revert",Y.addClass(s,"button"),Y.addClass(s,"revert");var o=r.__preset_select=document.createElement("select");if(r.load&&r.load.remembered?te.each(r.load.remembered,function(h,f){Iu(r,f,f===r.preset)}):Iu(r,ra,!1),Y.bind(o,"change",function(){for(var h=0;h<r.__preset_select.length;h++)r.__preset_select[h].innerHTML=r.__preset_select[h].value;r.preset=this.value}),e.appendChild(o),e.appendChild(t),e.appendChild(n),e.appendChild(i),e.appendChild(s),Po){var a=document.getElementById("dg-local-explain"),l=document.getElementById("dg-local-storage"),c=document.getElementById("dg-save-locally");c.style.display="block",localStorage.getItem(Us(r,"isLocal"))==="true"&&l.setAttribute("checked","checked"),ed(r,a),Y.bind(l,"change",function(){r.useLocalStorage=!r.useLocalStorage,ed(r,a)})}var u=document.getElementById("dg-new-constructor");Y.bind(u,"keydown",function(h){h.metaKey&&(h.which===67||h.keyCode===67)&&Ho.hide()}),Y.bind(t,"click",function(){u.innerHTML=JSON.stringify(r.getSaveObject(),void 0,2),Ho.show(),u.focus(),u.select()}),Y.bind(n,"click",function(){r.save()}),Y.bind(i,"click",function(){var h=prompt("Enter a new preset name.");h&&r.saveAs(h)}),Y.bind(s,"click",function(){r.revert()})}function $y(r){var e=void 0;r.__resize_handle=document.createElement("div"),te.extend(r.__resize_handle.style,{width:"6px",marginLeft:"-3px",height:"200px",cursor:"ew-resize",position:"absolute"});function t(s){return s.preventDefault(),r.width+=e-s.clientX,r.onResize(),e=s.clientX,!1}function n(){Y.removeClass(r.__closeButton,Tt.CLASS_DRAG),Y.unbind(window,"mousemove",t),Y.unbind(window,"mouseup",n)}function i(s){return s.preventDefault(),e=s.clientX,Y.addClass(r.__closeButton,Tt.CLASS_DRAG),Y.bind(window,"mousemove",t),Y.bind(window,"mouseup",n),!1}Y.bind(r.__resize_handle,"mousedown",i),Y.bind(r.__closeButton,"mousedown",i),r.domElement.insertBefore(r.__resize_handle,r.domElement.firstElementChild)}function Nu(r,e){r.domElement.style.width=e+"px",r.__save_row&&r.autoPlace&&(r.__save_row.style.width=e+"px"),r.__closeButton&&(r.__closeButton.style.width=e+"px")}function Wa(r,e){var t={};return te.each(r.__rememberedObjects,function(n,i){var s={},o=r.__rememberedObjectIndecesToControllers[i];te.each(o,function(a,l){s[l]=e?a.initialValue:a.getValue()}),t[i]=s}),t}function Ky(r){for(var e=0;e<r.__preset_select.length;e++)r.__preset_select[e].value===r.preset&&(r.__preset_select.selectedIndex=e)}function Op(r){r.length!==0&&Gy.call(window,function(){Op(r)}),te.each(r,function(e){e.updateDisplay()})}var Zy=Tt;function jy(){const r=document.getElementById("shaderBackground");if(!r)return;r.style.position="fixed",r.style.top="0",r.style.left="0",r.style.width="100vw",r.style.height="100vh",r.style.zIndex="-1";const e=new Cy({canvas:r,alpha:!0});e.setSize(window.innerWidth,window.innerHeight),e.setPixelRatio(window.devicePixelRatio);const t=new Hg,n={zoom:1.08,zPosition:1},i=new Tp(-window.innerWidth/2,window.innerWidth/2,window.innerHeight/2,-window.innerHeight/2,-1e3,1e3);i.position.z=n.zPosition,i.zoom=n.zoom,i.updateProjectionMatrix();const s={time:{value:0},resolution:{value:new gt(window.innerWidth,window.innerHeight)},mainSpeed:{value:.0164},waveSpeed:{value:2.1},noiseSpeed:{value:3},colorCycleSpeed:{value:3},color1:{value:new _t(3326678)},color2:{value:new _t(16793)},colorDarkness:{value:0},colorWaveInfluence:{value:.5},colorFrequencyShift:{value:1},colorAmplitudeEffect:{value:1},waveAmplitude:{value:1.66},waveFrequency:{value:5},waveDepth:{value:1},flowDirection:{value:new gt(-1.3,.4)},noiseScale:{value:.1},noiseInfluence:{value:.28},layerOffset:{value:.2},yOffset:{value:.12},topEdgeSoftness:{value:1},bottomEdgeSoftness:{value:1},fadeWidth:{value:1},leftCornerRoundness:{value:.8},rightCornerRoundness:{value:1},edgeNoiseAmount:{value:.12},edgeNoiseScale:{value:3},edgeDepth:{value:.86},edgeContrast:{value:2},filmNoiseIntensity:{value:.05},filmNoiseSpeed:{value:1e-5},filmGrainSize:{value:10},filmScratchIntensity:{value:0},lightDirection:{value:new Z(.5,.5,1).normalize()},ambientLight:{value:.4},directionalLight:{value:1},specularStrength:{value:.05},shininess:{value:1},displacementStrength:{value:0},displacementScale:{value:1e-4},displacementDepth:{value:0}},o=`
    uniform float time;
    uniform float waveSpeed;
    uniform float noiseSpeed;
    uniform vec2 resolution;
    uniform float yOffset;
    varying vec2 vUv;
    varying vec3 vViewPosition;
    varying vec3 vNormal;
    
    void main() {
      vUv = uv;
      
      // Apply yOffset to the entire mesh by shifting the y position
      vec3 positionWithOffset = position;
      positionWithOffset.y += yOffset * resolution.y; // Scale by resolution for pixel-based offset
      
      // Pass normal and view position for lighting calculations
      vNormal = normalMatrix * normal;
      vec4 mvPosition = modelViewMatrix * vec4(positionWithOffset, 1.0);
      vViewPosition = -mvPosition.xyz;
      
      gl_Position = projectionMatrix * modelViewMatrix * vec4(positionWithOffset, 1.0);
    }
  `,a=`
    uniform float time;
    uniform vec2 resolution;
    uniform float yOffset;
    uniform float topEdgeSoftness;
    uniform float bottomEdgeSoftness;
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
      vec2 flowUv = uv + colorModifiedFlow * time * waveSpeed * 0.1;
      
      // Modify frequency based on color
      float frequencyMod = waveFrequency * (1.0 + (colorHue - 0.5) * colorFrequencyShift);
      
      // Create multiple wave layers with different frequencies for depth
      // Use color intensity to modify wave phase
      float colorPhaseShift = colorIntensity * colorWaveInfluence * 3.0;
      
      float wave1 = sin(flowUv.x * frequencyMod * 4.0 + time * colorCycleSpeed + colorPhaseShift) * 0.5 + 0.5;
      float wave2 = sin(flowUv.y * frequencyMod * 3.0 + time * colorCycleSpeed * 0.7 + colorPhaseShift * 0.8) * 0.5 + 0.5;
      float wave3 = sin((flowUv.x + flowUv.y) * frequencyMod * 2.0 + time * colorCycleSpeed * 1.3 + colorPhaseShift * 0.6) * 0.5 + 0.5;
      
      // Apply depth offset to create parallax effect
      float depthOffset = depth * layerOffset;
      wave1 = sin(flowUv.x * frequencyMod * 4.0 + time * colorCycleSpeed + depthOffset + colorPhaseShift) * 0.5 + 0.5;
      wave2 = sin(flowUv.y * frequencyMod * 3.0 + time * colorCycleSpeed * 0.7 + depthOffset + colorPhaseShift * 0.8) * 0.5 + 0.5;
      wave3 = sin((flowUv.x + flowUv.y) * frequencyMod * 2.0 + time * colorCycleSpeed * 1.3 + depthOffset + colorPhaseShift * 0.6) * 0.5 + 0.5;
      
      // Combine waves with weighted averaging for a more complex pattern
      // Use color components to weight the waves differently
      float rWeight = localColor.r * 0.5 + 0.2; // 0.2-0.7 range
      float gWeight = localColor.g * 0.5 + 0.2; // 0.2-0.7 range
      float bWeight = localColor.b * 0.5 + 0.2; // 0.2-0.7 range
      
      // Normalize weights
      float totalWeight = rWeight + gWeight + bWeight;
      rWeight /= totalWeight;
      gWeight /= totalWeight;
      bWeight /= totalWeight;
      
      float wave = wave1 * rWeight + wave2 * gWeight + wave3 * bWeight;
      
      // Apply noise influence for organic movement
      float noiseValue = fbm(uv * noiseScale + time * 0.1 * noiseSpeed);
      // Use color intensity to control noise mixing
      float noiseMix = noiseInfluence * (1.0 - depth * 0.5) * (1.0 + colorIntensity * colorWaveInfluence);
      wave = mix(wave, noiseValue, clamp(noiseMix, 0.0, 1.0));
      
      // Apply color-based amplitude modulation
      float amplitudeMod = 1.0 + (colorIntensity - 0.5) * colorAmplitudeEffect;
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
      // Use color intensity to affect the wave amplitude
      float colorIntensity = getColorIntensity(localColor);
      float amplitudeMod = waveAmplitude * (1.0 + (colorIntensity - 0.5) * colorAmplitudeEffect);
      
      vec3 dx = vec3(epsilon, 0.0, (right - center) * amplitudeMod);
      vec3 dy = vec3(0.0, epsilon, (top - center) * amplitudeMod);
      
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
        verticalDist = abs(centeredUV.y) / (0.5 * edgeDepth);
      } else {
        // Top half - adjust for corner roundness to prevent cutting off
        verticalDist = abs(centeredUV.y) / (0.5 * edgeDepth);
      }
      
      // Calculate horizontal distance for corner rounding
      float horizontalDist = abs(centeredUV.x) / (0.5 * edgeDepth);
      
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
      vec3 initialColor = mix(color1, color2, 0.5);
      
      // Create multiple depth layers for parallax effect with color influence
      float foregroundWave = wavePattern(uv, 0.0, mix(color1, color2, 0.3)); // Foreground layer
      float middleWave = wavePattern(uv, 0.5, mix(color1, color2, 0.5));     // Middle layer
      float backgroundWave = wavePattern(uv, 1.0, mix(color1, color2, 0.7)); // Background layer
      
      // Create depth-based color mixing
      vec3 foregroundColor = mix(color1, color2, foregroundWave);
      vec3 backgroundColor = mix(color2, color1, backgroundWave);
      
      // Blend layers based on wave depth to create parallax effect
      float depthBlend = smoothInterpolation(0.3, 0.7, middleWave);
      vec3 baseColor = mix(backgroundColor, foregroundColor, depthBlend);
      
      // Apply darkness to the colors
      baseColor = mix(baseColor, vec3(0.0, 0.0, 0.0), colorDarkness);
      
      // Calculate lighting based on wave normal with color influence
      vec3 waveNormal = calculateNormal(uv, baseColor);
      
      // Blend between the wave normal and the surface normal for subtle effect
      vec3 normal = normalize(mix(vNormal, waveNormal, waveDepth));
      
      // Lighting calculations
      vec3 viewDir = normalize(vViewPosition);
      vec3 lightDir = normalize(lightDirection);
      
      // Ambient lighting
      vec3 ambient = ambientLight * baseColor;
      
      // Diffuse lighting
      float diff = max(dot(normal, lightDir), 0.0);
      vec3 diffuse = directionalLight * diff * baseColor;
      
      // Specular lighting (Blinn-Phong)
      vec3 halfwayDir = normalize(lightDir + viewDir);
      float spec = pow(max(dot(normal, halfwayDir), 0.0), shininess);
      vec3 specular = specularStrength * spec * vec3(1.0);
      
      // Combine lighting components
      vec3 color = ambient + diffuse + specular;
      
      // Add highlights based on wave height for extra depth
      float highlightIntensity = smoothInterpolation(0.4, 0.6, foregroundWave) * waveDepth;
      color += vec3(0.1, 0.1, 0.15) * highlightIntensity;
      
      // Apply film noise effects
      color = applyFilmNoise(color, uv);
      
      // Calculate non-linear edge fade with corner rounding
      float distanceField = calculateEdgeFade(uv);
      
      // Apply different softness to top and bottom edges
      float alpha;
      if (uv.y >= 0.5) {
        // Top half
        float normalizedDist = (distanceField - 0.5) / 0.5; // Normalize to 0-1 range for top half
        alpha = 1.0 - smoothInterpolation(1.0 - topEdgeSoftness, 1.0, normalizedDist);
      } else {
        // Bottom half
        float normalizedDist = (distanceField - 0.5) / 0.5; // Normalize to 0-1 range for bottom half
        alpha = 1.0 - smoothInterpolation(1.0 - bottomEdgeSoftness, 1.0, normalizedDist);
      }
      
      // Add subtle noise to alpha for a more organic edge
      float edgeNoise = fbm(uv * noiseScale * 2.0 + time * 0.05 * noiseSpeed);
      alpha *= 0.95 + edgeNoise * 0.05;

      gl_FragColor = vec4(color, alpha);
    }
  `,l=new oo(window.innerWidth,window.innerHeight,window.innerWidth/10,window.innerHeight/10),c=new Zi({vertexShader:o,fragmentShader:a,uniforms:s,transparent:!0,side:Mi}),u=new Ti(l,c);t.add(u);const h=new Zy({width:300});h.domElement.style.position="absolute",h.domElement.style.top="10px",h.domElement.style.right="10px";const f=h.addFolder("Camera Controls");f.add(n,"zoom",.1,5).name("Zoom Level").step(.001).onChange(E=>{i.zoom=E,i.updateProjectionMatrix()}),f.add(n,"zPosition",.1,10).name("Camera Distance").onChange(E=>{i.position.z=E}),f.open();const d=h.addFolder("Animation Speed Controls");d.add(s.mainSpeed,"value",0,.1).name("Main Speed").step(1e-4).onChange(E=>{s.mainSpeed.value=E}),d.add(s.waveSpeed,"value",0,5).name("Wave Speed").onChange(E=>{s.waveSpeed.value=E}),d.add(s.noiseSpeed,"value",0,5).name("Noise Speed").onChange(E=>{s.noiseSpeed.value=E}),d.add(s.colorCycleSpeed,"value",0,5).name("Color Cycle Speed").onChange(E=>{s.colorCycleSpeed.value=E}),d.open();const g=h.addFolder("Wave Controls");g.add(s.waveAmplitude,"value",0,2).step(1e-4).name("Wave Amplitude").onChange(E=>{s.waveAmplitude.value=E}),g.add(s.waveFrequency,"value",.1,5).name("Wave Frequency").onChange(E=>{s.waveFrequency.value=E}),g.add(s.waveDepth,"value",0,1).name("Wave Depth Effect").onChange(E=>{s.waveDepth.value=E}),g.add(s.noiseScale,"value",.1,5).name("Noise Scale").onChange(E=>{s.noiseScale.value=E}),g.add(s.noiseInfluence,"value",0,1).name("Noise Influence").onChange(E=>{s.noiseInfluence.value=E}),g.add(s.layerOffset,"value",0,1).name("Layer Depth Offset").onChange(E=>{s.layerOffset.value=E});const _=g.addFolder("Flow Direction");_.add(s.flowDirection.value,"x",-2,2).name("X Direction").onChange(E=>{s.flowDirection.value.x=E}),_.add(s.flowDirection.value,"y",-2,2).name("Y Direction").onChange(E=>{s.flowDirection.value.y=E}),g.open();const m=h.addFolder("Appearance Controls"),p=h.addFolder("Film Noise Controls");p.add(s.filmNoiseIntensity,"value",0,1).name("Noise Intensity").onChange(E=>{s.filmNoiseIntensity.value=E}),p.add(s.filmNoiseSpeed,"value",1e-5,1).name("Noise Speed").step(1e-5).onChange(E=>{s.filmNoiseSpeed.value=E}),p.add(s.filmGrainSize,"value",.5,10).name("Grain Size").onChange(E=>{s.filmGrainSize.value=E}),p.add(s.filmScratchIntensity,"value",0,.1).name("Scratch Intensity").onChange(E=>{s.filmScratchIntensity.value=E}),p.open();const M=h.addFolder("Color Controls"),y="#"+s.color1.value.getHexString(),v="#"+s.color2.value.getHexString();M.addColor({color:y},"color").name("Color 1").onChange(E=>{typeof E=="string"?s.color1.value.set(E):s.color1.value.setRGB(E.r/255,E.g/255,E.b/255)}),M.addColor({color:v},"color").name("Color 2").onChange(E=>{typeof E=="string"?s.color2.value.set(E):s.color2.value.setRGB(E.r/255,E.g/255,E.b/255)}),M.add(s.colorDarkness,"value",0,1).name("Color Darkness").onChange(E=>{s.colorDarkness.value=E}),M.add(s.colorWaveInfluence,"value",0,1).name("Color-Wave Influence").onChange(E=>{s.colorWaveInfluence.value=E}),M.add(s.colorFrequencyShift,"value",0,1).name("Color Frequency Effect").onChange(E=>{s.colorFrequencyShift.value=E}),M.add(s.colorAmplitudeEffect,"value",0,1).name("Color Amplitude Effect").onChange(E=>{s.colorAmplitudeEffect.value=E}),M.open(),m.add(s.yOffset,"value",-1,1).step(.001).name("Y Position").onChange(E=>{s.yOffset.value=E}),m.add(s.fadeWidth,"value",.1,1).name("Visible Area Size").onChange(E=>{s.fadeWidth.value=E}),m.add(s.topEdgeSoftness,"value",0,1).name("Top Edge Softness").onChange(E=>{s.topEdgeSoftness.value=E}),m.add(s.bottomEdgeSoftness,"value",0,1).name("Bottom Edge Softness").onChange(E=>{s.bottomEdgeSoftness.value=E}),m.add(s.leftCornerRoundness,"value",0,1).name("Left Corner Roundness").onChange(E=>{s.leftCornerRoundness.value=E}),m.add(s.rightCornerRoundness,"value",0,1).name("Right Corner Roundness").onChange(E=>{s.rightCornerRoundness.value=E}),m.add(s.edgeDepth,"value",.1,3).name("Edge Burn-in Depth").onChange(E=>{s.edgeDepth.value=E}),m.add(s.edgeContrast,"value",.5,3).name("Edge Contrast").onChange(E=>{s.edgeContrast.value=E}),m.add(s.edgeNoiseAmount,"value",0,1).name("Edge Noise Amount").onChange(E=>{s.edgeNoiseAmount.value=E}),m.add(s.edgeNoiseScale,"value",.5,10).name("Edge Noise Scale").onChange(E=>{s.edgeNoiseScale.value=E});const A=h.addFolder("Lighting Controls");A.add(s.ambientLight,"value",0,1).name("Ambient Light").onChange(E=>{s.ambientLight.value=E}),A.add(s.directionalLight,"value",0,1).name("Directional Light").onChange(E=>{s.directionalLight.value=E}),A.add(s.specularStrength,"value",0,1).name("Specular Strength").onChange(E=>{s.specularStrength.value=E}),A.add(s.shininess,"value",1,128).name("Shininess").onChange(E=>{s.shininess.value=E});const C=A.addFolder("Light Direction");C.add(s.lightDirection.value,"x",-1,1).name("X").onChange(()=>{s.lightDirection.value.normalize()}),C.add(s.lightDirection.value,"y",-1,1).name("Y").onChange(()=>{s.lightDirection.value.normalize()}),C.add(s.lightDirection.value,"z",0,2).name("Z").onChange(()=>{s.lightDirection.value.normalize()}),A.open(),m.open();function w(){requestAnimationFrame(w),s.time.value+=.01*s.mainSpeed.value,e.render(t,i)}w(),window.addEventListener("resize",()=>{e.setSize(window.innerWidth,window.innerHeight),i.left=-window.innerWidth/2,i.right=window.innerWidth/2,i.top=window.innerHeight/2,i.bottom=-window.innerHeight/2,i.updateProjectionMatrix(),s.resolution.value.set(window.innerWidth,window.innerHeight),u.geometry.dispose(),u.geometry=new oo(window.innerWidth,window.innerHeight,window.innerWidth/10,window.innerHeight/10)}),window.addEventListener("keydown",E=>{if(E.key==="+"||E.key==="="){n.zoom=Math.min(n.zoom+.1,5),i.zoom=n.zoom,i.updateProjectionMatrix();for(let x=0;x<f.__controllers.length;x++)if(f.__controllers[x].property==="zoom"){f.__controllers[x].updateDisplay();break}}if(E.key==="-"||E.key==="_"){n.zoom=Math.max(n.zoom-.1,.1),i.zoom=n.zoom,i.updateProjectionMatrix();for(let x=0;x<f.__controllers.length;x++)if(f.__controllers[x].property==="zoom"){f.__controllers[x].updateDisplay();break}}})}function zi(r){if(r===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return r}function Bp(r,e){r.prototype=Object.create(e.prototype),r.prototype.constructor=r,r.__proto__=e}/*!
 * GSAP 3.12.7
 * https://gsap.com
 *
 * @license Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license or for
 * Club GSAP members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/var qn={autoSleep:120,force3D:"auto",nullTargetWarn:1,units:{lineHeight:""}},ao={duration:.5,overwrite:!1,delay:0},Mf,sn,Ct,Ri=1e8,dn=1/Ri,Fu=Math.PI*2,Jy=Fu/4,Qy=0,zp=Math.sqrt,eM=Math.cos,tM=Math.sin,tn=function(e){return typeof e=="string"},Ut=function(e){return typeof e=="function"},ji=function(e){return typeof e=="number"},Ef=function(e){return typeof e>"u"},Li=function(e){return typeof e=="object"},Pn=function(e){return e!==!1},bf=function(){return typeof window<"u"},Xa=function(e){return Ut(e)||tn(e)},kp=typeof ArrayBuffer=="function"&&ArrayBuffer.isView||function(){},pn=Array.isArray,Ou=/(?:-?\.?\d|\.)+/gi,Hp=/[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,Bs=/[-+=.]*\d+[.e-]*\d*[a-z%]*/g,Tc=/[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,Vp=/[+-]=-?[.\d]+/,Gp=/[^,'"\[\]\s]+/gi,nM=/^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,Rt,xi,Bu,Tf,$n={},Al={},Wp,Xp=function(e){return(Al=lo(e,$n))&&In},wf=function(e,t){return console.warn("Invalid property",e,"set to",t,"Missing plugin? gsap.registerPlugin()")},sa=function(e,t){return!t&&console.warn(e)},Yp=function(e,t){return e&&($n[e]=t)&&Al&&(Al[e]=t)||$n},oa=function(){return 0},iM={suppressEvents:!0,isStart:!0,kill:!1},dl={suppressEvents:!0,kill:!1},rM={suppressEvents:!0},Af={},gr=[],zu={},qp,Hn={},wc={},td=30,pl=[],Cf="",Rf=function(e){var t=e[0],n,i;if(Li(t)||Ut(t)||(e=[e]),!(n=(t._gsap||{}).harness)){for(i=pl.length;i--&&!pl[i].targetTest(t););n=pl[i]}for(i=e.length;i--;)e[i]&&(e[i]._gsap||(e[i]._gsap=new gm(e[i],n)))||e.splice(i,1);return e},jr=function(e){return e._gsap||Rf(ri(e))[0]._gsap},$p=function(e,t,n){return(n=e[t])&&Ut(n)?e[t]():Ef(n)&&e.getAttribute&&e.getAttribute(t)||n},Dn=function(e,t){return(e=e.split(",")).forEach(t)||e},Nt=function(e){return Math.round(e*1e5)/1e5||0},Vt=function(e){return Math.round(e*1e7)/1e7||0},Xs=function(e,t){var n=t.charAt(0),i=parseFloat(t.substr(2));return e=parseFloat(e),n==="+"?e+i:n==="-"?e-i:n==="*"?e*i:e/i},sM=function(e,t){for(var n=t.length,i=0;e.indexOf(t[i])<0&&++i<n;);return i<n},Cl=function(){var e=gr.length,t=gr.slice(0),n,i;for(zu={},gr.length=0,n=0;n<e;n++)i=t[n],i&&i._lazy&&(i.render(i._lazy[0],i._lazy[1],!0)._lazy=0)},Kp=function(e,t,n,i){gr.length&&!sn&&Cl(),e.render(t,n,sn&&t<0&&(e._initted||e._startAt)),gr.length&&!sn&&Cl()},Zp=function(e){var t=parseFloat(e);return(t||t===0)&&(e+"").match(Gp).length<2?t:tn(e)?e.trim():e},jp=function(e){return e},Kn=function(e,t){for(var n in t)n in e||(e[n]=t[n]);return e},oM=function(e){return function(t,n){for(var i in n)i in t||i==="duration"&&e||i==="ease"||(t[i]=n[i])}},lo=function(e,t){for(var n in t)e[n]=t[n];return e},nd=function r(e,t){for(var n in t)n!=="__proto__"&&n!=="constructor"&&n!=="prototype"&&(e[n]=Li(t[n])?r(e[n]||(e[n]={}),t[n]):t[n]);return e},Rl=function(e,t){var n={},i;for(i in e)i in t||(n[i]=e[i]);return n},Go=function(e){var t=e.parent||Rt,n=e.keyframes?oM(pn(e.keyframes)):Kn;if(Pn(e.inherit))for(;t;)n(e,t.vars.defaults),t=t.parent||t._dp;return e},aM=function(e,t){for(var n=e.length,i=n===t.length;i&&n--&&e[n]===t[n];);return n<0},Jp=function(e,t,n,i,s){var o=e[i],a;if(s)for(a=t[s];o&&o[s]>a;)o=o._prev;return o?(t._next=o._next,o._next=t):(t._next=e[n],e[n]=t),t._next?t._next._prev=t:e[i]=t,t._prev=o,t.parent=t._dp=e,t},Vl=function(e,t,n,i){n===void 0&&(n="_first"),i===void 0&&(i="_last");var s=t._prev,o=t._next;s?s._next=o:e[n]===t&&(e[n]=o),o?o._prev=s:e[i]===t&&(e[i]=s),t._next=t._prev=t.parent=null},Er=function(e,t){e.parent&&(!t||e.parent.autoRemoveChildren)&&e.parent.remove&&e.parent.remove(e),e._act=0},Jr=function(e,t){if(e&&(!t||t._end>e._dur||t._start<0))for(var n=e;n;)n._dirty=1,n=n.parent;return e},lM=function(e){for(var t=e.parent;t&&t.parent;)t._dirty=1,t.totalDuration(),t=t.parent;return e},ku=function(e,t,n,i){return e._startAt&&(sn?e._startAt.revert(dl):e.vars.immediateRender&&!e.vars.autoRevert||e._startAt.render(t,!0,i))},cM=function r(e){return!e||e._ts&&r(e.parent)},id=function(e){return e._repeat?co(e._tTime,e=e.duration()+e._rDelay)*e:0},co=function(e,t){var n=Math.floor(e=Vt(e/t));return e&&n===e?n-1:n},Pl=function(e,t){return(e-t._start)*t._ts+(t._ts>=0?0:t._dirty?t.totalDuration():t._tDur)},Gl=function(e){return e._end=Vt(e._start+(e._tDur/Math.abs(e._ts||e._rts||dn)||0))},Wl=function(e,t){var n=e._dp;return n&&n.smoothChildTiming&&e._ts&&(e._start=Vt(n._time-(e._ts>0?t/e._ts:((e._dirty?e.totalDuration():e._tDur)-t)/-e._ts)),Gl(e),n._dirty||Jr(n,e)),e},Qp=function(e,t){var n;if((t._time||!t._dur&&t._initted||t._start<e._time&&(t._dur||!t.add))&&(n=Pl(e.rawTime(),t),(!t._dur||Sa(0,t.totalDuration(),n)-t._tTime>dn)&&t.render(n,!0)),Jr(e,t)._dp&&e._initted&&e._time>=e._dur&&e._ts){if(e._dur<e.duration())for(n=e;n._dp;)n.rawTime()>=0&&n.totalTime(n._tTime),n=n._dp;e._zTime=-1e-8}},Ei=function(e,t,n,i){return t.parent&&Er(t),t._start=Vt((ji(n)?n:n||e!==Rt?ei(e,n,t):e._time)+t._delay),t._end=Vt(t._start+(t.totalDuration()/Math.abs(t.timeScale())||0)),Jp(e,t,"_first","_last",e._sort?"_start":0),Hu(t)||(e._recent=t),i||Qp(e,t),e._ts<0&&Wl(e,e._tTime),e},em=function(e,t){return($n.ScrollTrigger||wf("scrollTrigger",t))&&$n.ScrollTrigger.create(t,e)},tm=function(e,t,n,i,s){if(Df(e,t,s),!e._initted)return 1;if(!n&&e._pt&&!sn&&(e._dur&&e.vars.lazy!==!1||!e._dur&&e.vars.lazy)&&qp!==Gn.frame)return gr.push(e),e._lazy=[s,i],1},uM=function r(e){var t=e.parent;return t&&t._ts&&t._initted&&!t._lock&&(t.rawTime()<0||r(t))},Hu=function(e){var t=e.data;return t==="isFromStart"||t==="isStart"},fM=function(e,t,n,i){var s=e.ratio,o=t<0||!t&&(!e._start&&uM(e)&&!(!e._initted&&Hu(e))||(e._ts<0||e._dp._ts<0)&&!Hu(e))?0:1,a=e._rDelay,l=0,c,u,h;if(a&&e._repeat&&(l=Sa(0,e._tDur,t),u=co(l,a),e._yoyo&&u&1&&(o=1-o),u!==co(e._tTime,a)&&(s=1-o,e.vars.repeatRefresh&&e._initted&&e.invalidate())),o!==s||sn||i||e._zTime===dn||!t&&e._zTime){if(!e._initted&&tm(e,t,i,n,l))return;for(h=e._zTime,e._zTime=t||(n?dn:0),n||(n=t&&!h),e.ratio=o,e._from&&(o=1-o),e._time=0,e._tTime=l,c=e._pt;c;)c.r(o,c.d),c=c._next;t<0&&ku(e,t,n,!0),e._onUpdate&&!n&&Xn(e,"onUpdate"),l&&e._repeat&&!n&&e.parent&&Xn(e,"onRepeat"),(t>=e._tDur||t<0)&&e.ratio===o&&(o&&Er(e,1),!n&&!sn&&(Xn(e,o?"onComplete":"onReverseComplete",!0),e._prom&&e._prom()))}else e._zTime||(e._zTime=t)},hM=function(e,t,n){var i;if(n>t)for(i=e._first;i&&i._start<=n;){if(i.data==="isPause"&&i._start>t)return i;i=i._next}else for(i=e._last;i&&i._start>=n;){if(i.data==="isPause"&&i._start<t)return i;i=i._prev}},uo=function(e,t,n,i){var s=e._repeat,o=Vt(t)||0,a=e._tTime/e._tDur;return a&&!i&&(e._time*=o/e._dur),e._dur=o,e._tDur=s?s<0?1e10:Vt(o*(s+1)+e._rDelay*s):o,a>0&&!i&&Wl(e,e._tTime=e._tDur*a),e.parent&&Gl(e),n||Jr(e.parent,e),e},rd=function(e){return e instanceof En?Jr(e):uo(e,e._dur)},dM={_start:0,endTime:oa,totalDuration:oa},ei=function r(e,t,n){var i=e.labels,s=e._recent||dM,o=e.duration()>=Ri?s.endTime(!1):e._dur,a,l,c;return tn(t)&&(isNaN(t)||t in i)?(l=t.charAt(0),c=t.substr(-1)==="%",a=t.indexOf("="),l==="<"||l===">"?(a>=0&&(t=t.replace(/=/,"")),(l==="<"?s._start:s.endTime(s._repeat>=0))+(parseFloat(t.substr(1))||0)*(c?(a<0?s:n).totalDuration()/100:1)):a<0?(t in i||(i[t]=o),i[t]):(l=parseFloat(t.charAt(a-1)+t.substr(a+1)),c&&n&&(l=l/100*(pn(n)?n[0]:n).totalDuration()),a>1?r(e,t.substr(0,a-1),n)+l:o+l)):t==null?o:+t},Wo=function(e,t,n){var i=ji(t[1]),s=(i?2:1)+(e<2?0:1),o=t[s],a,l;if(i&&(o.duration=t[1]),o.parent=n,e){for(a=o,l=n;l&&!("immediateRender"in a);)a=l.vars.defaults||{},l=Pn(l.vars.inherit)&&l.parent;o.immediateRender=Pn(a.immediateRender),e<2?o.runBackwards=1:o.startAt=t[s-1]}return new Ht(t[0],o,t[s+1])},Cr=function(e,t){return e||e===0?t(e):t},Sa=function(e,t,n){return n<e?e:n>t?t:n},fn=function(e,t){return!tn(e)||!(t=nM.exec(e))?"":t[1]},pM=function(e,t,n){return Cr(n,function(i){return Sa(e,t,i)})},Vu=[].slice,nm=function(e,t){return e&&Li(e)&&"length"in e&&(!t&&!e.length||e.length-1 in e&&Li(e[0]))&&!e.nodeType&&e!==xi},mM=function(e,t,n){return n===void 0&&(n=[]),e.forEach(function(i){var s;return tn(i)&&!t||nm(i,1)?(s=n).push.apply(s,ri(i)):n.push(i)})||n},ri=function(e,t,n){return Ct&&!t&&Ct.selector?Ct.selector(e):tn(e)&&!n&&(Bu||!fo())?Vu.call((t||Tf).querySelectorAll(e),0):pn(e)?mM(e,n):nm(e)?Vu.call(e,0):e?[e]:[]},Gu=function(e){return e=ri(e)[0]||sa("Invalid scope")||{},function(t){var n=e.current||e.nativeElement||e;return ri(t,n.querySelectorAll?n:n===e?sa("Invalid scope")||Tf.createElement("div"):e)}},im=function(e){return e.sort(function(){return .5-Math.random()})},rm=function(e){if(Ut(e))return e;var t=Li(e)?e:{each:e},n=Qr(t.ease),i=t.from||0,s=parseFloat(t.base)||0,o={},a=i>0&&i<1,l=isNaN(i)||a,c=t.axis,u=i,h=i;return tn(i)?u=h={center:.5,edges:.5,end:1}[i]||0:!a&&l&&(u=i[0],h=i[1]),function(f,d,g){var _=(g||t).length,m=o[_],p,M,y,v,A,C,w,E,x;if(!m){if(x=t.grid==="auto"?0:(t.grid||[1,Ri])[1],!x){for(w=-1e8;w<(w=g[x++].getBoundingClientRect().left)&&x<_;);x<_&&x--}for(m=o[_]=[],p=l?Math.min(x,_)*u-.5:i%x,M=x===Ri?0:l?_*h/x-.5:i/x|0,w=0,E=Ri,C=0;C<_;C++)y=C%x-p,v=M-(C/x|0),m[C]=A=c?Math.abs(c==="y"?v:y):zp(y*y+v*v),A>w&&(w=A),A<E&&(E=A);i==="random"&&im(m),m.max=w-E,m.min=E,m.v=_=(parseFloat(t.amount)||parseFloat(t.each)*(x>_?_-1:c?c==="y"?_/x:x:Math.max(x,_/x))||0)*(i==="edges"?-1:1),m.b=_<0?s-_:s,m.u=fn(t.amount||t.each)||0,n=n&&_<0?pm(n):n}return _=(m[f]-m.min)/m.max||0,Vt(m.b+(n?n(_):_)*m.v)+m.u}},Wu=function(e){var t=Math.pow(10,((e+"").split(".")[1]||"").length);return function(n){var i=Vt(Math.round(parseFloat(n)/e)*e*t);return(i-i%1)/t+(ji(n)?0:fn(n))}},sm=function(e,t){var n=pn(e),i,s;return!n&&Li(e)&&(i=n=e.radius||Ri,e.values?(e=ri(e.values),(s=!ji(e[0]))&&(i*=i)):e=Wu(e.increment)),Cr(t,n?Ut(e)?function(o){return s=e(o),Math.abs(s-o)<=i?s:o}:function(o){for(var a=parseFloat(s?o.x:o),l=parseFloat(s?o.y:0),c=Ri,u=0,h=e.length,f,d;h--;)s?(f=e[h].x-a,d=e[h].y-l,f=f*f+d*d):f=Math.abs(e[h]-a),f<c&&(c=f,u=h);return u=!i||c<=i?e[u]:o,s||u===o||ji(o)?u:u+fn(o)}:Wu(e))},om=function(e,t,n,i){return Cr(pn(e)?!t:n===!0?!!(n=0):!i,function(){return pn(e)?e[~~(Math.random()*e.length)]:(n=n||1e-5)&&(i=n<1?Math.pow(10,(n+"").length-2):1)&&Math.floor(Math.round((e-n/2+Math.random()*(t-e+n*.99))/n)*n*i)/i})},_M=function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return function(i){return t.reduce(function(s,o){return o(s)},i)}},gM=function(e,t){return function(n){return e(parseFloat(n))+(t||fn(n))}},vM=function(e,t,n){return lm(e,t,0,1,n)},am=function(e,t,n){return Cr(n,function(i){return e[~~t(i)]})},xM=function r(e,t,n){var i=t-e;return pn(e)?am(e,r(0,e.length),t):Cr(n,function(s){return(i+(s-e)%i)%i+e})},SM=function r(e,t,n){var i=t-e,s=i*2;return pn(e)?am(e,r(0,e.length-1),t):Cr(n,function(o){return o=(s+(o-e)%s)%s||0,e+(o>i?s-o:o)})},aa=function(e){for(var t=0,n="",i,s,o,a;~(i=e.indexOf("random(",t));)o=e.indexOf(")",i),a=e.charAt(i+7)==="[",s=e.substr(i+7,o-i-7).match(a?Gp:Ou),n+=e.substr(t,i-t)+om(a?s:+s[0],a?0:+s[1],+s[2]||1e-5),t=o+1;return n+e.substr(t,e.length-t)},lm=function(e,t,n,i,s){var o=t-e,a=i-n;return Cr(s,function(l){return n+((l-e)/o*a||0)})},yM=function r(e,t,n,i){var s=isNaN(e+t)?0:function(d){return(1-d)*e+d*t};if(!s){var o=tn(e),a={},l,c,u,h,f;if(n===!0&&(i=1)&&(n=null),o)e={p:e},t={p:t};else if(pn(e)&&!pn(t)){for(u=[],h=e.length,f=h-2,c=1;c<h;c++)u.push(r(e[c-1],e[c]));h--,s=function(g){g*=h;var _=Math.min(f,~~g);return u[_](g-_)},n=t}else i||(e=lo(pn(e)?[]:{},e));if(!u){for(l in t)Pf.call(a,e,l,"get",t[l]);s=function(g){return If(g,a)||(o?e.p:e)}}}return Cr(n,s)},sd=function(e,t,n){var i=e.labels,s=Ri,o,a,l;for(o in i)a=i[o]-t,a<0==!!n&&a&&s>(a=Math.abs(a))&&(l=o,s=a);return l},Xn=function(e,t,n){var i=e.vars,s=i[t],o=Ct,a=e._ctx,l,c,u;if(s)return l=i[t+"Params"],c=i.callbackScope||e,n&&gr.length&&Cl(),a&&(Ct=a),u=l?s.apply(c,l):s.call(c),Ct=o,u},Do=function(e){return Er(e),e.scrollTrigger&&e.scrollTrigger.kill(!!sn),e.progress()<1&&Xn(e,"onInterrupt"),e},zs,cm=[],um=function(e){if(e)if(e=!e.name&&e.default||e,bf()||e.headless){var t=e.name,n=Ut(e),i=t&&!n&&e.init?function(){this._props=[]}:e,s={init:oa,render:If,add:Pf,kill:OM,modifier:FM,rawVars:0},o={targetTest:0,get:0,getSetter:Uf,aliases:{},register:0};if(fo(),e!==i){if(Hn[t])return;Kn(i,Kn(Rl(e,s),o)),lo(i.prototype,lo(s,Rl(e,o))),Hn[i.prop=t]=i,e.targetTest&&(pl.push(i),Af[t]=1),t=(t==="css"?"CSS":t.charAt(0).toUpperCase()+t.substr(1))+"Plugin"}Yp(t,i),e.register&&e.register(In,i,Ln)}else cm.push(e)},Mt=255,Lo={aqua:[0,Mt,Mt],lime:[0,Mt,0],silver:[192,192,192],black:[0,0,0],maroon:[128,0,0],teal:[0,128,128],blue:[0,0,Mt],navy:[0,0,128],white:[Mt,Mt,Mt],olive:[128,128,0],yellow:[Mt,Mt,0],orange:[Mt,165,0],gray:[128,128,128],purple:[128,0,128],green:[0,128,0],red:[Mt,0,0],pink:[Mt,192,203],cyan:[0,Mt,Mt],transparent:[Mt,Mt,Mt,0]},Ac=function(e,t,n){return e+=e<0?1:e>1?-1:0,(e*6<1?t+(n-t)*e*6:e<.5?n:e*3<2?t+(n-t)*(2/3-e)*6:t)*Mt+.5|0},fm=function(e,t,n){var i=e?ji(e)?[e>>16,e>>8&Mt,e&Mt]:0:Lo.black,s,o,a,l,c,u,h,f,d,g;if(!i){if(e.substr(-1)===","&&(e=e.substr(0,e.length-1)),Lo[e])i=Lo[e];else if(e.charAt(0)==="#"){if(e.length<6&&(s=e.charAt(1),o=e.charAt(2),a=e.charAt(3),e="#"+s+s+o+o+a+a+(e.length===5?e.charAt(4)+e.charAt(4):"")),e.length===9)return i=parseInt(e.substr(1,6),16),[i>>16,i>>8&Mt,i&Mt,parseInt(e.substr(7),16)/255];e=parseInt(e.substr(1),16),i=[e>>16,e>>8&Mt,e&Mt]}else if(e.substr(0,3)==="hsl"){if(i=g=e.match(Ou),!t)l=+i[0]%360/360,c=+i[1]/100,u=+i[2]/100,o=u<=.5?u*(c+1):u+c-u*c,s=u*2-o,i.length>3&&(i[3]*=1),i[0]=Ac(l+1/3,s,o),i[1]=Ac(l,s,o),i[2]=Ac(l-1/3,s,o);else if(~e.indexOf("="))return i=e.match(Hp),n&&i.length<4&&(i[3]=1),i}else i=e.match(Ou)||Lo.transparent;i=i.map(Number)}return t&&!g&&(s=i[0]/Mt,o=i[1]/Mt,a=i[2]/Mt,h=Math.max(s,o,a),f=Math.min(s,o,a),u=(h+f)/2,h===f?l=c=0:(d=h-f,c=u>.5?d/(2-h-f):d/(h+f),l=h===s?(o-a)/d+(o<a?6:0):h===o?(a-s)/d+2:(s-o)/d+4,l*=60),i[0]=~~(l+.5),i[1]=~~(c*100+.5),i[2]=~~(u*100+.5)),n&&i.length<4&&(i[3]=1),i},hm=function(e){var t=[],n=[],i=-1;return e.split(vr).forEach(function(s){var o=s.match(Bs)||[];t.push.apply(t,o),n.push(i+=o.length+1)}),t.c=n,t},od=function(e,t,n){var i="",s=(e+i).match(vr),o=t?"hsla(":"rgba(",a=0,l,c,u,h;if(!s)return e;if(s=s.map(function(f){return(f=fm(f,t,1))&&o+(t?f[0]+","+f[1]+"%,"+f[2]+"%,"+f[3]:f.join(","))+")"}),n&&(u=hm(e),l=n.c,l.join(i)!==u.c.join(i)))for(c=e.replace(vr,"1").split(Bs),h=c.length-1;a<h;a++)i+=c[a]+(~l.indexOf(a)?s.shift()||o+"0,0,0,0)":(u.length?u:s.length?s:n).shift());if(!c)for(c=e.split(vr),h=c.length-1;a<h;a++)i+=c[a]+s[a];return i+c[h]},vr=function(){var r="(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b",e;for(e in Lo)r+="|"+e+"\\b";return new RegExp(r+")","gi")}(),MM=/hsl[a]?\(/,dm=function(e){var t=e.join(" "),n;if(vr.lastIndex=0,vr.test(t))return n=MM.test(t),e[1]=od(e[1],n),e[0]=od(e[0],n,hm(e[1])),!0},la,Gn=function(){var r=Date.now,e=500,t=33,n=r(),i=n,s=1e3/240,o=s,a=[],l,c,u,h,f,d,g=function _(m){var p=r()-i,M=m===!0,y,v,A,C;if((p>e||p<0)&&(n+=p-t),i+=p,A=i-n,y=A-o,(y>0||M)&&(C=++h.frame,f=A-h.time*1e3,h.time=A=A/1e3,o+=y+(y>=s?4:s-y),v=1),M||(l=c(_)),v)for(d=0;d<a.length;d++)a[d](A,f,C,m)};return h={time:0,frame:0,tick:function(){g(!0)},deltaRatio:function(m){return f/(1e3/(m||60))},wake:function(){Wp&&(!Bu&&bf()&&(xi=Bu=window,Tf=xi.document||{},$n.gsap=In,(xi.gsapVersions||(xi.gsapVersions=[])).push(In.version),Xp(Al||xi.GreenSockGlobals||!xi.gsap&&xi||{}),cm.forEach(um)),u=typeof requestAnimationFrame<"u"&&requestAnimationFrame,l&&h.sleep(),c=u||function(m){return setTimeout(m,o-h.time*1e3+1|0)},la=1,g(2))},sleep:function(){(u?cancelAnimationFrame:clearTimeout)(l),la=0,c=oa},lagSmoothing:function(m,p){e=m||1/0,t=Math.min(p||33,e)},fps:function(m){s=1e3/(m||240),o=h.time*1e3+s},add:function(m,p,M){var y=p?function(v,A,C,w){m(v,A,C,w),h.remove(y)}:m;return h.remove(m),a[M?"unshift":"push"](y),fo(),y},remove:function(m,p){~(p=a.indexOf(m))&&a.splice(p,1)&&d>=p&&d--},_listeners:a},h}(),fo=function(){return!la&&Gn.wake()},at={},EM=/^[\d.\-M][\d.\-,\s]/,bM=/["']/g,TM=function(e){for(var t={},n=e.substr(1,e.length-3).split(":"),i=n[0],s=1,o=n.length,a,l,c;s<o;s++)l=n[s],a=s!==o-1?l.lastIndexOf(","):l.length,c=l.substr(0,a),t[i]=isNaN(c)?c.replace(bM,"").trim():+c,i=l.substr(a+1).trim();return t},wM=function(e){var t=e.indexOf("(")+1,n=e.indexOf(")"),i=e.indexOf("(",t);return e.substring(t,~i&&i<n?e.indexOf(")",n+1):n)},AM=function(e){var t=(e+"").split("("),n=at[t[0]];return n&&t.length>1&&n.config?n.config.apply(null,~e.indexOf("{")?[TM(t[1])]:wM(e).split(",").map(Zp)):at._CE&&EM.test(e)?at._CE("",e):n},pm=function(e){return function(t){return 1-e(1-t)}},mm=function r(e,t){for(var n=e._first,i;n;)n instanceof En?r(n,t):n.vars.yoyoEase&&(!n._yoyo||!n._repeat)&&n._yoyo!==t&&(n.timeline?r(n.timeline,t):(i=n._ease,n._ease=n._yEase,n._yEase=i,n._yoyo=t)),n=n._next},Qr=function(e,t){return e&&(Ut(e)?e:at[e]||AM(e))||t},hs=function(e,t,n,i){n===void 0&&(n=function(l){return 1-t(1-l)}),i===void 0&&(i=function(l){return l<.5?t(l*2)/2:1-t((1-l)*2)/2});var s={easeIn:t,easeOut:n,easeInOut:i},o;return Dn(e,function(a){at[a]=$n[a]=s,at[o=a.toLowerCase()]=n;for(var l in s)at[o+(l==="easeIn"?".in":l==="easeOut"?".out":".inOut")]=at[a+"."+l]=s[l]}),s},_m=function(e){return function(t){return t<.5?(1-e(1-t*2))/2:.5+e((t-.5)*2)/2}},Cc=function r(e,t,n){var i=t>=1?t:1,s=(n||(e?.3:.45))/(t<1?t:1),o=s/Fu*(Math.asin(1/i)||0),a=function(u){return u===1?1:i*Math.pow(2,-10*u)*tM((u-o)*s)+1},l=e==="out"?a:e==="in"?function(c){return 1-a(1-c)}:_m(a);return s=Fu/s,l.config=function(c,u){return r(e,c,u)},l},Rc=function r(e,t){t===void 0&&(t=1.70158);var n=function(o){return o?--o*o*((t+1)*o+t)+1:0},i=e==="out"?n:e==="in"?function(s){return 1-n(1-s)}:_m(n);return i.config=function(s){return r(e,s)},i};Dn("Linear,Quad,Cubic,Quart,Quint,Strong",function(r,e){var t=e<5?e+1:e;hs(r+",Power"+(t-1),e?function(n){return Math.pow(n,t)}:function(n){return n},function(n){return 1-Math.pow(1-n,t)},function(n){return n<.5?Math.pow(n*2,t)/2:1-Math.pow((1-n)*2,t)/2})});at.Linear.easeNone=at.none=at.Linear.easeIn;hs("Elastic",Cc("in"),Cc("out"),Cc());(function(r,e){var t=1/e,n=2*t,i=2.5*t,s=function(a){return a<t?r*a*a:a<n?r*Math.pow(a-1.5/e,2)+.75:a<i?r*(a-=2.25/e)*a+.9375:r*Math.pow(a-2.625/e,2)+.984375};hs("Bounce",function(o){return 1-s(1-o)},s)})(7.5625,2.75);hs("Expo",function(r){return Math.pow(2,10*(r-1))*r+r*r*r*r*r*r*(1-r)});hs("Circ",function(r){return-(zp(1-r*r)-1)});hs("Sine",function(r){return r===1?1:-eM(r*Jy)+1});hs("Back",Rc("in"),Rc("out"),Rc());at.SteppedEase=at.steps=$n.SteppedEase={config:function(e,t){e===void 0&&(e=1);var n=1/e,i=e+(t?0:1),s=t?1:0,o=1-dn;return function(a){return((i*Sa(0,o,a)|0)+s)*n}}};ao.ease=at["quad.out"];Dn("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt",function(r){return Cf+=r+","+r+"Params,"});var gm=function(e,t){this.id=Qy++,e._gsap=this,this.target=e,this.harness=t,this.get=t?t.get:$p,this.set=t?t.getSetter:Uf},ca=function(){function r(t){this.vars=t,this._delay=+t.delay||0,(this._repeat=t.repeat===1/0?-2:t.repeat||0)&&(this._rDelay=t.repeatDelay||0,this._yoyo=!!t.yoyo||!!t.yoyoEase),this._ts=1,uo(this,+t.duration,1,1),this.data=t.data,Ct&&(this._ctx=Ct,Ct.data.push(this)),la||Gn.wake()}var e=r.prototype;return e.delay=function(n){return n||n===0?(this.parent&&this.parent.smoothChildTiming&&this.startTime(this._start+n-this._delay),this._delay=n,this):this._delay},e.duration=function(n){return arguments.length?this.totalDuration(this._repeat>0?n+(n+this._rDelay)*this._repeat:n):this.totalDuration()&&this._dur},e.totalDuration=function(n){return arguments.length?(this._dirty=0,uo(this,this._repeat<0?n:(n-this._repeat*this._rDelay)/(this._repeat+1))):this._tDur},e.totalTime=function(n,i){if(fo(),!arguments.length)return this._tTime;var s=this._dp;if(s&&s.smoothChildTiming&&this._ts){for(Wl(this,n),!s._dp||s.parent||Qp(s,this);s&&s.parent;)s.parent._time!==s._start+(s._ts>=0?s._tTime/s._ts:(s.totalDuration()-s._tTime)/-s._ts)&&s.totalTime(s._tTime,!0),s=s.parent;!this.parent&&this._dp.autoRemoveChildren&&(this._ts>0&&n<this._tDur||this._ts<0&&n>0||!this._tDur&&!n)&&Ei(this._dp,this,this._start-this._delay)}return(this._tTime!==n||!this._dur&&!i||this._initted&&Math.abs(this._zTime)===dn||!n&&!this._initted&&(this.add||this._ptLookup))&&(this._ts||(this._pTime=n),Kp(this,n,i)),this},e.time=function(n,i){return arguments.length?this.totalTime(Math.min(this.totalDuration(),n+id(this))%(this._dur+this._rDelay)||(n?this._dur:0),i):this._time},e.totalProgress=function(n,i){return arguments.length?this.totalTime(this.totalDuration()*n,i):this.totalDuration()?Math.min(1,this._tTime/this._tDur):this.rawTime()>=0&&this._initted?1:0},e.progress=function(n,i){return arguments.length?this.totalTime(this.duration()*(this._yoyo&&!(this.iteration()&1)?1-n:n)+id(this),i):this.duration()?Math.min(1,this._time/this._dur):this.rawTime()>0?1:0},e.iteration=function(n,i){var s=this.duration()+this._rDelay;return arguments.length?this.totalTime(this._time+(n-1)*s,i):this._repeat?co(this._tTime,s)+1:1},e.timeScale=function(n,i){if(!arguments.length)return this._rts===-1e-8?0:this._rts;if(this._rts===n)return this;var s=this.parent&&this._ts?Pl(this.parent._time,this):this._tTime;return this._rts=+n||0,this._ts=this._ps||n===-1e-8?0:this._rts,this.totalTime(Sa(-Math.abs(this._delay),this._tDur,s),i!==!1),Gl(this),lM(this)},e.paused=function(n){return arguments.length?(this._ps!==n&&(this._ps=n,n?(this._pTime=this._tTime||Math.max(-this._delay,this.rawTime()),this._ts=this._act=0):(fo(),this._ts=this._rts,this.totalTime(this.parent&&!this.parent.smoothChildTiming?this.rawTime():this._tTime||this._pTime,this.progress()===1&&Math.abs(this._zTime)!==dn&&(this._tTime-=dn)))),this):this._ps},e.startTime=function(n){if(arguments.length){this._start=n;var i=this.parent||this._dp;return i&&(i._sort||!this.parent)&&Ei(i,this,n-this._delay),this}return this._start},e.endTime=function(n){return this._start+(Pn(n)?this.totalDuration():this.duration())/Math.abs(this._ts||1)},e.rawTime=function(n){var i=this.parent||this._dp;return i?n&&(!this._ts||this._repeat&&this._time&&this.totalProgress()<1)?this._tTime%(this._dur+this._rDelay):this._ts?Pl(i.rawTime(n),this):this._tTime:this._tTime},e.revert=function(n){n===void 0&&(n=rM);var i=sn;return sn=n,(this._initted||this._startAt)&&(this.timeline&&this.timeline.revert(n),this.totalTime(-.01,n.suppressEvents)),this.data!=="nested"&&n.kill!==!1&&this.kill(),sn=i,this},e.globalTime=function(n){for(var i=this,s=arguments.length?n:i.rawTime();i;)s=i._start+s/(Math.abs(i._ts)||1),i=i._dp;return!this.parent&&this._sat?this._sat.globalTime(n):s},e.repeat=function(n){return arguments.length?(this._repeat=n===1/0?-2:n,rd(this)):this._repeat===-2?1/0:this._repeat},e.repeatDelay=function(n){if(arguments.length){var i=this._time;return this._rDelay=n,rd(this),i?this.time(i):this}return this._rDelay},e.yoyo=function(n){return arguments.length?(this._yoyo=n,this):this._yoyo},e.seek=function(n,i){return this.totalTime(ei(this,n),Pn(i))},e.restart=function(n,i){return this.play().totalTime(n?-this._delay:0,Pn(i)),this._dur||(this._zTime=-1e-8),this},e.play=function(n,i){return n!=null&&this.seek(n,i),this.reversed(!1).paused(!1)},e.reverse=function(n,i){return n!=null&&this.seek(n||this.totalDuration(),i),this.reversed(!0).paused(!1)},e.pause=function(n,i){return n!=null&&this.seek(n,i),this.paused(!0)},e.resume=function(){return this.paused(!1)},e.reversed=function(n){return arguments.length?(!!n!==this.reversed()&&this.timeScale(-this._rts||(n?-1e-8:0)),this):this._rts<0},e.invalidate=function(){return this._initted=this._act=0,this._zTime=-1e-8,this},e.isActive=function(){var n=this.parent||this._dp,i=this._start,s;return!!(!n||this._ts&&this._initted&&n.isActive()&&(s=n.rawTime(!0))>=i&&s<this.endTime(!0)-dn)},e.eventCallback=function(n,i,s){var o=this.vars;return arguments.length>1?(i?(o[n]=i,s&&(o[n+"Params"]=s),n==="onUpdate"&&(this._onUpdate=i)):delete o[n],this):o[n]},e.then=function(n){var i=this;return new Promise(function(s){var o=Ut(n)?n:jp,a=function(){var c=i.then;i.then=null,Ut(o)&&(o=o(i))&&(o.then||o===i)&&(i.then=c),s(o),i.then=c};i._initted&&i.totalProgress()===1&&i._ts>=0||!i._tTime&&i._ts<0?a():i._prom=a})},e.kill=function(){Do(this)},r}();Kn(ca.prototype,{_time:0,_start:0,_end:0,_tTime:0,_tDur:0,_dirty:0,_repeat:0,_yoyo:!1,parent:null,_initted:!1,_rDelay:0,_ts:1,_dp:0,ratio:0,_zTime:-1e-8,_prom:0,_ps:!1,_rts:1});var En=function(r){Bp(e,r);function e(n,i){var s;return n===void 0&&(n={}),s=r.call(this,n)||this,s.labels={},s.smoothChildTiming=!!n.smoothChildTiming,s.autoRemoveChildren=!!n.autoRemoveChildren,s._sort=Pn(n.sortChildren),Rt&&Ei(n.parent||Rt,zi(s),i),n.reversed&&s.reverse(),n.paused&&s.paused(!0),n.scrollTrigger&&em(zi(s),n.scrollTrigger),s}var t=e.prototype;return t.to=function(i,s,o){return Wo(0,arguments,this),this},t.from=function(i,s,o){return Wo(1,arguments,this),this},t.fromTo=function(i,s,o,a){return Wo(2,arguments,this),this},t.set=function(i,s,o){return s.duration=0,s.parent=this,Go(s).repeatDelay||(s.repeat=0),s.immediateRender=!!s.immediateRender,new Ht(i,s,ei(this,o),1),this},t.call=function(i,s,o){return Ei(this,Ht.delayedCall(0,i,s),o)},t.staggerTo=function(i,s,o,a,l,c,u){return o.duration=s,o.stagger=o.stagger||a,o.onComplete=c,o.onCompleteParams=u,o.parent=this,new Ht(i,o,ei(this,l)),this},t.staggerFrom=function(i,s,o,a,l,c,u){return o.runBackwards=1,Go(o).immediateRender=Pn(o.immediateRender),this.staggerTo(i,s,o,a,l,c,u)},t.staggerFromTo=function(i,s,o,a,l,c,u,h){return a.startAt=o,Go(a).immediateRender=Pn(a.immediateRender),this.staggerTo(i,s,a,l,c,u,h)},t.render=function(i,s,o){var a=this._time,l=this._dirty?this.totalDuration():this._tDur,c=this._dur,u=i<=0?0:Vt(i),h=this._zTime<0!=i<0&&(this._initted||!c),f,d,g,_,m,p,M,y,v,A,C,w;if(this!==Rt&&u>l&&i>=0&&(u=l),u!==this._tTime||o||h){if(a!==this._time&&c&&(u+=this._time-a,i+=this._time-a),f=u,v=this._start,y=this._ts,p=!y,h&&(c||(a=this._zTime),(i||!s)&&(this._zTime=i)),this._repeat){if(C=this._yoyo,m=c+this._rDelay,this._repeat<-1&&i<0)return this.totalTime(m*100+i,s,o);if(f=Vt(u%m),u===l?(_=this._repeat,f=c):(A=Vt(u/m),_=~~A,_&&_===A&&(f=c,_--),f>c&&(f=c)),A=co(this._tTime,m),!a&&this._tTime&&A!==_&&this._tTime-A*m-this._dur<=0&&(A=_),C&&_&1&&(f=c-f,w=1),_!==A&&!this._lock){var E=C&&A&1,x=E===(C&&_&1);if(_<A&&(E=!E),a=E?0:u%c?c:u,this._lock=1,this.render(a||(w?0:Vt(_*m)),s,!c)._lock=0,this._tTime=u,!s&&this.parent&&Xn(this,"onRepeat"),this.vars.repeatRefresh&&!w&&(this.invalidate()._lock=1),a&&a!==this._time||p!==!this._ts||this.vars.onRepeat&&!this.parent&&!this._act)return this;if(c=this._dur,l=this._tDur,x&&(this._lock=2,a=E?c:-1e-4,this.render(a,!0),this.vars.repeatRefresh&&!w&&this.invalidate()),this._lock=0,!this._ts&&!p)return this;mm(this,w)}}if(this._hasPause&&!this._forcing&&this._lock<2&&(M=hM(this,Vt(a),Vt(f)),M&&(u-=f-(f=M._start))),this._tTime=u,this._time=f,this._act=!y,this._initted||(this._onUpdate=this.vars.onUpdate,this._initted=1,this._zTime=i,a=0),!a&&f&&!s&&!_&&(Xn(this,"onStart"),this._tTime!==u))return this;if(f>=a&&i>=0)for(d=this._first;d;){if(g=d._next,(d._act||f>=d._start)&&d._ts&&M!==d){if(d.parent!==this)return this.render(i,s,o);if(d.render(d._ts>0?(f-d._start)*d._ts:(d._dirty?d.totalDuration():d._tDur)+(f-d._start)*d._ts,s,o),f!==this._time||!this._ts&&!p){M=0,g&&(u+=this._zTime=-1e-8);break}}d=g}else{d=this._last;for(var S=i<0?i:f;d;){if(g=d._prev,(d._act||S<=d._end)&&d._ts&&M!==d){if(d.parent!==this)return this.render(i,s,o);if(d.render(d._ts>0?(S-d._start)*d._ts:(d._dirty?d.totalDuration():d._tDur)+(S-d._start)*d._ts,s,o||sn&&(d._initted||d._startAt)),f!==this._time||!this._ts&&!p){M=0,g&&(u+=this._zTime=S?-1e-8:dn);break}}d=g}}if(M&&!s&&(this.pause(),M.render(f>=a?0:-1e-8)._zTime=f>=a?1:-1,this._ts))return this._start=v,Gl(this),this.render(i,s,o);this._onUpdate&&!s&&Xn(this,"onUpdate",!0),(u===l&&this._tTime>=this.totalDuration()||!u&&a)&&(v===this._start||Math.abs(y)!==Math.abs(this._ts))&&(this._lock||((i||!c)&&(u===l&&this._ts>0||!u&&this._ts<0)&&Er(this,1),!s&&!(i<0&&!a)&&(u||a||!l)&&(Xn(this,u===l&&i>=0?"onComplete":"onReverseComplete",!0),this._prom&&!(u<l&&this.timeScale()>0)&&this._prom())))}return this},t.add=function(i,s){var o=this;if(ji(s)||(s=ei(this,s,i)),!(i instanceof ca)){if(pn(i))return i.forEach(function(a){return o.add(a,s)}),this;if(tn(i))return this.addLabel(i,s);if(Ut(i))i=Ht.delayedCall(0,i);else return this}return this!==i?Ei(this,i,s):this},t.getChildren=function(i,s,o,a){i===void 0&&(i=!0),s===void 0&&(s=!0),o===void 0&&(o=!0),a===void 0&&(a=-1e8);for(var l=[],c=this._first;c;)c._start>=a&&(c instanceof Ht?s&&l.push(c):(o&&l.push(c),i&&l.push.apply(l,c.getChildren(!0,s,o)))),c=c._next;return l},t.getById=function(i){for(var s=this.getChildren(1,1,1),o=s.length;o--;)if(s[o].vars.id===i)return s[o]},t.remove=function(i){return tn(i)?this.removeLabel(i):Ut(i)?this.killTweensOf(i):(i.parent===this&&Vl(this,i),i===this._recent&&(this._recent=this._last),Jr(this))},t.totalTime=function(i,s){return arguments.length?(this._forcing=1,!this._dp&&this._ts&&(this._start=Vt(Gn.time-(this._ts>0?i/this._ts:(this.totalDuration()-i)/-this._ts))),r.prototype.totalTime.call(this,i,s),this._forcing=0,this):this._tTime},t.addLabel=function(i,s){return this.labels[i]=ei(this,s),this},t.removeLabel=function(i){return delete this.labels[i],this},t.addPause=function(i,s,o){var a=Ht.delayedCall(0,s||oa,o);return a.data="isPause",this._hasPause=1,Ei(this,a,ei(this,i))},t.removePause=function(i){var s=this._first;for(i=ei(this,i);s;)s._start===i&&s.data==="isPause"&&Er(s),s=s._next},t.killTweensOf=function(i,s,o){for(var a=this.getTweensOf(i,o),l=a.length;l--;)cr!==a[l]&&a[l].kill(i,s);return this},t.getTweensOf=function(i,s){for(var o=[],a=ri(i),l=this._first,c=ji(s),u;l;)l instanceof Ht?sM(l._targets,a)&&(c?(!cr||l._initted&&l._ts)&&l.globalTime(0)<=s&&l.globalTime(l.totalDuration())>s:!s||l.isActive())&&o.push(l):(u=l.getTweensOf(a,s)).length&&o.push.apply(o,u),l=l._next;return o},t.tweenTo=function(i,s){s=s||{};var o=this,a=ei(o,i),l=s,c=l.startAt,u=l.onStart,h=l.onStartParams,f=l.immediateRender,d,g=Ht.to(o,Kn({ease:s.ease||"none",lazy:!1,immediateRender:!1,time:a,overwrite:"auto",duration:s.duration||Math.abs((a-(c&&"time"in c?c.time:o._time))/o.timeScale())||dn,onStart:function(){if(o.pause(),!d){var m=s.duration||Math.abs((a-(c&&"time"in c?c.time:o._time))/o.timeScale());g._dur!==m&&uo(g,m,0,1).render(g._time,!0,!0),d=1}u&&u.apply(g,h||[])}},s));return f?g.render(0):g},t.tweenFromTo=function(i,s,o){return this.tweenTo(s,Kn({startAt:{time:ei(this,i)}},o))},t.recent=function(){return this._recent},t.nextLabel=function(i){return i===void 0&&(i=this._time),sd(this,ei(this,i))},t.previousLabel=function(i){return i===void 0&&(i=this._time),sd(this,ei(this,i),1)},t.currentLabel=function(i){return arguments.length?this.seek(i,!0):this.previousLabel(this._time+dn)},t.shiftChildren=function(i,s,o){o===void 0&&(o=0);for(var a=this._first,l=this.labels,c;a;)a._start>=o&&(a._start+=i,a._end+=i),a=a._next;if(s)for(c in l)l[c]>=o&&(l[c]+=i);return Jr(this)},t.invalidate=function(i){var s=this._first;for(this._lock=0;s;)s.invalidate(i),s=s._next;return r.prototype.invalidate.call(this,i)},t.clear=function(i){i===void 0&&(i=!0);for(var s=this._first,o;s;)o=s._next,this.remove(s),s=o;return this._dp&&(this._time=this._tTime=this._pTime=0),i&&(this.labels={}),Jr(this)},t.totalDuration=function(i){var s=0,o=this,a=o._last,l=Ri,c,u,h;if(arguments.length)return o.timeScale((o._repeat<0?o.duration():o.totalDuration())/(o.reversed()?-i:i));if(o._dirty){for(h=o.parent;a;)c=a._prev,a._dirty&&a.totalDuration(),u=a._start,u>l&&o._sort&&a._ts&&!o._lock?(o._lock=1,Ei(o,a,u-a._delay,1)._lock=0):l=u,u<0&&a._ts&&(s-=u,(!h&&!o._dp||h&&h.smoothChildTiming)&&(o._start+=u/o._ts,o._time-=u,o._tTime-=u),o.shiftChildren(-u,!1,-1/0),l=0),a._end>s&&a._ts&&(s=a._end),a=c;uo(o,o===Rt&&o._time>s?o._time:s,1,1),o._dirty=0}return o._tDur},e.updateRoot=function(i){if(Rt._ts&&(Kp(Rt,Pl(i,Rt)),qp=Gn.frame),Gn.frame>=td){td+=qn.autoSleep||120;var s=Rt._first;if((!s||!s._ts)&&qn.autoSleep&&Gn._listeners.length<2){for(;s&&!s._ts;)s=s._next;s||Gn.sleep()}}},e}(ca);Kn(En.prototype,{_lock:0,_hasPause:0,_forcing:0});var CM=function(e,t,n,i,s,o,a){var l=new Ln(this._pt,e,t,0,1,Em,null,s),c=0,u=0,h,f,d,g,_,m,p,M;for(l.b=n,l.e=i,n+="",i+="",(p=~i.indexOf("random("))&&(i=aa(i)),o&&(M=[n,i],o(M,e,t),n=M[0],i=M[1]),f=n.match(Tc)||[];h=Tc.exec(i);)g=h[0],_=i.substring(c,h.index),d?d=(d+1)%5:_.substr(-5)==="rgba("&&(d=1),g!==f[u++]&&(m=parseFloat(f[u-1])||0,l._pt={_next:l._pt,p:_||u===1?_:",",s:m,c:g.charAt(1)==="="?Xs(m,g)-m:parseFloat(g)-m,m:d&&d<4?Math.round:0},c=Tc.lastIndex);return l.c=c<i.length?i.substring(c,i.length):"",l.fp=a,(Vp.test(i)||p)&&(l.e=0),this._pt=l,l},Pf=function(e,t,n,i,s,o,a,l,c,u){Ut(i)&&(i=i(s||0,e,o));var h=e[t],f=n!=="get"?n:Ut(h)?c?e[t.indexOf("set")||!Ut(e["get"+t.substr(3)])?t:"get"+t.substr(3)](c):e[t]():h,d=Ut(h)?c?UM:ym:Lf,g;if(tn(i)&&(~i.indexOf("random(")&&(i=aa(i)),i.charAt(1)==="="&&(g=Xs(f,i)+(fn(f)||0),(g||g===0)&&(i=g))),!u||f!==i||Xu)return!isNaN(f*i)&&i!==""?(g=new Ln(this._pt,e,t,+f||0,i-(f||0),typeof h=="boolean"?NM:Mm,0,d),c&&(g.fp=c),a&&g.modifier(a,this,e),this._pt=g):(!h&&!(t in e)&&wf(t,i),CM.call(this,e,t,f,i,d,l||qn.stringFilter,c))},RM=function(e,t,n,i,s){if(Ut(e)&&(e=Xo(e,s,t,n,i)),!Li(e)||e.style&&e.nodeType||pn(e)||kp(e))return tn(e)?Xo(e,s,t,n,i):e;var o={},a;for(a in e)o[a]=Xo(e[a],s,t,n,i);return o},vm=function(e,t,n,i,s,o){var a,l,c,u;if(Hn[e]&&(a=new Hn[e]).init(s,a.rawVars?t[e]:RM(t[e],i,s,o,n),n,i,o)!==!1&&(n._pt=l=new Ln(n._pt,s,e,0,1,a.render,a,0,a.priority),n!==zs))for(c=n._ptLookup[n._targets.indexOf(s)],u=a._props.length;u--;)c[a._props[u]]=l;return a},cr,Xu,Df=function r(e,t,n){var i=e.vars,s=i.ease,o=i.startAt,a=i.immediateRender,l=i.lazy,c=i.onUpdate,u=i.runBackwards,h=i.yoyoEase,f=i.keyframes,d=i.autoRevert,g=e._dur,_=e._startAt,m=e._targets,p=e.parent,M=p&&p.data==="nested"?p.vars.targets:m,y=e._overwrite==="auto"&&!Mf,v=e.timeline,A,C,w,E,x,S,P,I,O,q,W,V,X;if(v&&(!f||!s)&&(s="none"),e._ease=Qr(s,ao.ease),e._yEase=h?pm(Qr(h===!0?s:h,ao.ease)):0,h&&e._yoyo&&!e._repeat&&(h=e._yEase,e._yEase=e._ease,e._ease=h),e._from=!v&&!!i.runBackwards,!v||f&&!i.stagger){if(I=m[0]?jr(m[0]).harness:0,V=I&&i[I.prop],A=Rl(i,Af),_&&(_._zTime<0&&_.progress(1),t<0&&u&&a&&!d?_.render(-1,!0):_.revert(u&&g?dl:iM),_._lazy=0),o){if(Er(e._startAt=Ht.set(m,Kn({data:"isStart",overwrite:!1,parent:p,immediateRender:!0,lazy:!_&&Pn(l),startAt:null,delay:0,onUpdate:c&&function(){return Xn(e,"onUpdate")},stagger:0},o))),e._startAt._dp=0,e._startAt._sat=e,t<0&&(sn||!a&&!d)&&e._startAt.revert(dl),a&&g&&t<=0&&n<=0){t&&(e._zTime=t);return}}else if(u&&g&&!_){if(t&&(a=!1),w=Kn({overwrite:!1,data:"isFromStart",lazy:a&&!_&&Pn(l),immediateRender:a,stagger:0,parent:p},A),V&&(w[I.prop]=V),Er(e._startAt=Ht.set(m,w)),e._startAt._dp=0,e._startAt._sat=e,t<0&&(sn?e._startAt.revert(dl):e._startAt.render(-1,!0)),e._zTime=t,!a)r(e._startAt,dn,dn);else if(!t)return}for(e._pt=e._ptCache=0,l=g&&Pn(l)||l&&!g,C=0;C<m.length;C++){if(x=m[C],P=x._gsap||Rf(m)[C]._gsap,e._ptLookup[C]=q={},zu[P.id]&&gr.length&&Cl(),W=M===m?C:M.indexOf(x),I&&(O=new I).init(x,V||A,e,W,M)!==!1&&(e._pt=E=new Ln(e._pt,x,O.name,0,1,O.render,O,0,O.priority),O._props.forEach(function(z){q[z]=E}),O.priority&&(S=1)),!I||V)for(w in A)Hn[w]&&(O=vm(w,A,e,W,x,M))?O.priority&&(S=1):q[w]=E=Pf.call(e,x,w,"get",A[w],W,M,0,i.stringFilter);e._op&&e._op[C]&&e.kill(x,e._op[C]),y&&e._pt&&(cr=e,Rt.killTweensOf(x,q,e.globalTime(t)),X=!e.parent,cr=0),e._pt&&l&&(zu[P.id]=1)}S&&bm(e),e._onInit&&e._onInit(e)}e._onUpdate=c,e._initted=(!e._op||e._pt)&&!X,f&&t<=0&&v.render(Ri,!0,!0)},PM=function(e,t,n,i,s,o,a,l){var c=(e._pt&&e._ptCache||(e._ptCache={}))[t],u,h,f,d;if(!c)for(c=e._ptCache[t]=[],f=e._ptLookup,d=e._targets.length;d--;){if(u=f[d][t],u&&u.d&&u.d._pt)for(u=u.d._pt;u&&u.p!==t&&u.fp!==t;)u=u._next;if(!u)return Xu=1,e.vars[t]="+=0",Df(e,a),Xu=0,l?sa(t+" not eligible for reset"):1;c.push(u)}for(d=c.length;d--;)h=c[d],u=h._pt||h,u.s=(i||i===0)&&!s?i:u.s+(i||0)+o*u.c,u.c=n-u.s,h.e&&(h.e=Nt(n)+fn(h.e)),h.b&&(h.b=u.s+fn(h.b))},DM=function(e,t){var n=e[0]?jr(e[0]).harness:0,i=n&&n.aliases,s,o,a,l;if(!i)return t;s=lo({},t);for(o in i)if(o in s)for(l=i[o].split(","),a=l.length;a--;)s[l[a]]=s[o];return s},LM=function(e,t,n,i){var s=t.ease||i||"power1.inOut",o,a;if(pn(t))a=n[e]||(n[e]=[]),t.forEach(function(l,c){return a.push({t:c/(t.length-1)*100,v:l,e:s})});else for(o in t)a=n[o]||(n[o]=[]),o==="ease"||a.push({t:parseFloat(e),v:t[o],e:s})},Xo=function(e,t,n,i,s){return Ut(e)?e.call(t,n,i,s):tn(e)&&~e.indexOf("random(")?aa(e):e},xm=Cf+"repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,autoRevert",Sm={};Dn(xm+",id,stagger,delay,duration,paused,scrollTrigger",function(r){return Sm[r]=1});var Ht=function(r){Bp(e,r);function e(n,i,s,o){var a;typeof i=="number"&&(s.duration=i,i=s,s=null),a=r.call(this,o?i:Go(i))||this;var l=a.vars,c=l.duration,u=l.delay,h=l.immediateRender,f=l.stagger,d=l.overwrite,g=l.keyframes,_=l.defaults,m=l.scrollTrigger,p=l.yoyoEase,M=i.parent||Rt,y=(pn(n)||kp(n)?ji(n[0]):"length"in i)?[n]:ri(n),v,A,C,w,E,x,S,P;if(a._targets=y.length?Rf(y):sa("GSAP target "+n+" not found. https://gsap.com",!qn.nullTargetWarn)||[],a._ptLookup=[],a._overwrite=d,g||f||Xa(c)||Xa(u)){if(i=a.vars,v=a.timeline=new En({data:"nested",defaults:_||{},targets:M&&M.data==="nested"?M.vars.targets:y}),v.kill(),v.parent=v._dp=zi(a),v._start=0,f||Xa(c)||Xa(u)){if(w=y.length,S=f&&rm(f),Li(f))for(E in f)~xm.indexOf(E)&&(P||(P={}),P[E]=f[E]);for(A=0;A<w;A++)C=Rl(i,Sm),C.stagger=0,p&&(C.yoyoEase=p),P&&lo(C,P),x=y[A],C.duration=+Xo(c,zi(a),A,x,y),C.delay=(+Xo(u,zi(a),A,x,y)||0)-a._delay,!f&&w===1&&C.delay&&(a._delay=u=C.delay,a._start+=u,C.delay=0),v.to(x,C,S?S(A,x,y):0),v._ease=at.none;v.duration()?c=u=0:a.timeline=0}else if(g){Go(Kn(v.vars.defaults,{ease:"none"})),v._ease=Qr(g.ease||i.ease||"none");var I=0,O,q,W;if(pn(g))g.forEach(function(V){return v.to(y,V,">")}),v.duration();else{C={};for(E in g)E==="ease"||E==="easeEach"||LM(E,g[E],C,g.easeEach);for(E in C)for(O=C[E].sort(function(V,X){return V.t-X.t}),I=0,A=0;A<O.length;A++)q=O[A],W={ease:q.e,duration:(q.t-(A?O[A-1].t:0))/100*c},W[E]=q.v,v.to(y,W,I),I+=W.duration;v.duration()<c&&v.to({},{duration:c-v.duration()})}}c||a.duration(c=v.duration())}else a.timeline=0;return d===!0&&!Mf&&(cr=zi(a),Rt.killTweensOf(y),cr=0),Ei(M,zi(a),s),i.reversed&&a.reverse(),i.paused&&a.paused(!0),(h||!c&&!g&&a._start===Vt(M._time)&&Pn(h)&&cM(zi(a))&&M.data!=="nested")&&(a._tTime=-1e-8,a.render(Math.max(0,-u)||0)),m&&em(zi(a),m),a}var t=e.prototype;return t.render=function(i,s,o){var a=this._time,l=this._tDur,c=this._dur,u=i<0,h=i>l-dn&&!u?l:i<dn?0:i,f,d,g,_,m,p,M,y,v;if(!c)fM(this,i,s,o);else if(h!==this._tTime||!i||o||!this._initted&&this._tTime||this._startAt&&this._zTime<0!==u||this._lazy){if(f=h,y=this.timeline,this._repeat){if(_=c+this._rDelay,this._repeat<-1&&u)return this.totalTime(_*100+i,s,o);if(f=Vt(h%_),h===l?(g=this._repeat,f=c):(m=Vt(h/_),g=~~m,g&&g===m?(f=c,g--):f>c&&(f=c)),p=this._yoyo&&g&1,p&&(v=this._yEase,f=c-f),m=co(this._tTime,_),f===a&&!o&&this._initted&&g===m)return this._tTime=h,this;g!==m&&(y&&this._yEase&&mm(y,p),this.vars.repeatRefresh&&!p&&!this._lock&&f!==_&&this._initted&&(this._lock=o=1,this.render(Vt(_*g),!0).invalidate()._lock=0))}if(!this._initted){if(tm(this,u?i:f,o,s,h))return this._tTime=0,this;if(a!==this._time&&!(o&&this.vars.repeatRefresh&&g!==m))return this;if(c!==this._dur)return this.render(i,s,o)}if(this._tTime=h,this._time=f,!this._act&&this._ts&&(this._act=1,this._lazy=0),this.ratio=M=(v||this._ease)(f/c),this._from&&(this.ratio=M=1-M),f&&!a&&!s&&!g&&(Xn(this,"onStart"),this._tTime!==h))return this;for(d=this._pt;d;)d.r(M,d.d),d=d._next;y&&y.render(i<0?i:y._dur*y._ease(f/this._dur),s,o)||this._startAt&&(this._zTime=i),this._onUpdate&&!s&&(u&&ku(this,i,s,o),Xn(this,"onUpdate")),this._repeat&&g!==m&&this.vars.onRepeat&&!s&&this.parent&&Xn(this,"onRepeat"),(h===this._tDur||!h)&&this._tTime===h&&(u&&!this._onUpdate&&ku(this,i,!0,!0),(i||!c)&&(h===this._tDur&&this._ts>0||!h&&this._ts<0)&&Er(this,1),!s&&!(u&&!a)&&(h||a||p)&&(Xn(this,h===l?"onComplete":"onReverseComplete",!0),this._prom&&!(h<l&&this.timeScale()>0)&&this._prom()))}return this},t.targets=function(){return this._targets},t.invalidate=function(i){return(!i||!this.vars.runBackwards)&&(this._startAt=0),this._pt=this._op=this._onUpdate=this._lazy=this.ratio=0,this._ptLookup=[],this.timeline&&this.timeline.invalidate(i),r.prototype.invalidate.call(this,i)},t.resetTo=function(i,s,o,a,l){la||Gn.wake(),this._ts||this.play();var c=Math.min(this._dur,(this._dp._time-this._start)*this._ts),u;return this._initted||Df(this,c),u=this._ease(c/this._dur),PM(this,i,s,o,a,u,c,l)?this.resetTo(i,s,o,a,1):(Wl(this,0),this.parent||Jp(this._dp,this,"_first","_last",this._dp._sort?"_start":0),this.render(0))},t.kill=function(i,s){if(s===void 0&&(s="all"),!i&&(!s||s==="all"))return this._lazy=this._pt=0,this.parent?Do(this):this.scrollTrigger&&this.scrollTrigger.kill(!!sn),this;if(this.timeline){var o=this.timeline.totalDuration();return this.timeline.killTweensOf(i,s,cr&&cr.vars.overwrite!==!0)._first||Do(this),this.parent&&o!==this.timeline.totalDuration()&&uo(this,this._dur*this.timeline._tDur/o,0,1),this}var a=this._targets,l=i?ri(i):a,c=this._ptLookup,u=this._pt,h,f,d,g,_,m,p;if((!s||s==="all")&&aM(a,l))return s==="all"&&(this._pt=0),Do(this);for(h=this._op=this._op||[],s!=="all"&&(tn(s)&&(_={},Dn(s,function(M){return _[M]=1}),s=_),s=DM(a,s)),p=a.length;p--;)if(~l.indexOf(a[p])){f=c[p],s==="all"?(h[p]=s,g=f,d={}):(d=h[p]=h[p]||{},g=s);for(_ in g)m=f&&f[_],m&&((!("kill"in m.d)||m.d.kill(_)===!0)&&Vl(this,m,"_pt"),delete f[_]),d!=="all"&&(d[_]=1)}return this._initted&&!this._pt&&u&&Do(this),this},e.to=function(i,s){return new e(i,s,arguments[2])},e.from=function(i,s){return Wo(1,arguments)},e.delayedCall=function(i,s,o,a){return new e(s,0,{immediateRender:!1,lazy:!1,overwrite:!1,delay:i,onComplete:s,onReverseComplete:s,onCompleteParams:o,onReverseCompleteParams:o,callbackScope:a})},e.fromTo=function(i,s,o){return Wo(2,arguments)},e.set=function(i,s){return s.duration=0,s.repeatDelay||(s.repeat=0),new e(i,s)},e.killTweensOf=function(i,s,o){return Rt.killTweensOf(i,s,o)},e}(ca);Kn(Ht.prototype,{_targets:[],_lazy:0,_startAt:0,_op:0,_onInit:0});Dn("staggerTo,staggerFrom,staggerFromTo",function(r){Ht[r]=function(){var e=new En,t=Vu.call(arguments,0);return t.splice(r==="staggerFromTo"?5:4,0,0),e[r].apply(e,t)}});var Lf=function(e,t,n){return e[t]=n},ym=function(e,t,n){return e[t](n)},UM=function(e,t,n,i){return e[t](i.fp,n)},IM=function(e,t,n){return e.setAttribute(t,n)},Uf=function(e,t){return Ut(e[t])?ym:Ef(e[t])&&e.setAttribute?IM:Lf},Mm=function(e,t){return t.set(t.t,t.p,Math.round((t.s+t.c*e)*1e6)/1e6,t)},NM=function(e,t){return t.set(t.t,t.p,!!(t.s+t.c*e),t)},Em=function(e,t){var n=t._pt,i="";if(!e&&t.b)i=t.b;else if(e===1&&t.e)i=t.e;else{for(;n;)i=n.p+(n.m?n.m(n.s+n.c*e):Math.round((n.s+n.c*e)*1e4)/1e4)+i,n=n._next;i+=t.c}t.set(t.t,t.p,i,t)},If=function(e,t){for(var n=t._pt;n;)n.r(e,n.d),n=n._next},FM=function(e,t,n,i){for(var s=this._pt,o;s;)o=s._next,s.p===i&&s.modifier(e,t,n),s=o},OM=function(e){for(var t=this._pt,n,i;t;)i=t._next,t.p===e&&!t.op||t.op===e?Vl(this,t,"_pt"):t.dep||(n=1),t=i;return!n},BM=function(e,t,n,i){i.mSet(e,t,i.m.call(i.tween,n,i.mt),i)},bm=function(e){for(var t=e._pt,n,i,s,o;t;){for(n=t._next,i=s;i&&i.pr>t.pr;)i=i._next;(t._prev=i?i._prev:o)?t._prev._next=t:s=t,(t._next=i)?i._prev=t:o=t,t=n}e._pt=s},Ln=function(){function r(t,n,i,s,o,a,l,c,u){this.t=n,this.s=s,this.c=o,this.p=i,this.r=a||Mm,this.d=l||this,this.set=c||Lf,this.pr=u||0,this._next=t,t&&(t._prev=this)}var e=r.prototype;return e.modifier=function(n,i,s){this.mSet=this.mSet||this.set,this.set=BM,this.m=n,this.mt=s,this.tween=i},r}();Dn(Cf+"parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger",function(r){return Af[r]=1});$n.TweenMax=$n.TweenLite=Ht;$n.TimelineLite=$n.TimelineMax=En;Rt=new En({sortChildren:!1,defaults:ao,autoRemoveChildren:!0,id:"root",smoothChildTiming:!0});qn.stringFilter=dm;var es=[],ml={},zM=[],ad=0,kM=0,Pc=function(e){return(ml[e]||zM).map(function(t){return t()})},Yu=function(){var e=Date.now(),t=[];e-ad>2&&(Pc("matchMediaInit"),es.forEach(function(n){var i=n.queries,s=n.conditions,o,a,l,c;for(a in i)o=xi.matchMedia(i[a]).matches,o&&(l=1),o!==s[a]&&(s[a]=o,c=1);c&&(n.revert(),l&&t.push(n))}),Pc("matchMediaRevert"),t.forEach(function(n){return n.onMatch(n,function(i){return n.add(null,i)})}),ad=e,Pc("matchMedia"))},Tm=function(){function r(t,n){this.selector=n&&Gu(n),this.data=[],this._r=[],this.isReverted=!1,this.id=kM++,t&&this.add(t)}var e=r.prototype;return e.add=function(n,i,s){Ut(n)&&(s=i,i=n,n=Ut);var o=this,a=function(){var c=Ct,u=o.selector,h;return c&&c!==o&&c.data.push(o),s&&(o.selector=Gu(s)),Ct=o,h=i.apply(o,arguments),Ut(h)&&o._r.push(h),Ct=c,o.selector=u,o.isReverted=!1,h};return o.last=a,n===Ut?a(o,function(l){return o.add(null,l)}):n?o[n]=a:a},e.ignore=function(n){var i=Ct;Ct=null,n(this),Ct=i},e.getTweens=function(){var n=[];return this.data.forEach(function(i){return i instanceof r?n.push.apply(n,i.getTweens()):i instanceof Ht&&!(i.parent&&i.parent.data==="nested")&&n.push(i)}),n},e.clear=function(){this._r.length=this.data.length=0},e.kill=function(n,i){var s=this;if(n?function(){for(var a=s.getTweens(),l=s.data.length,c;l--;)c=s.data[l],c.data==="isFlip"&&(c.revert(),c.getChildren(!0,!0,!1).forEach(function(u){return a.splice(a.indexOf(u),1)}));for(a.map(function(u){return{g:u._dur||u._delay||u._sat&&!u._sat.vars.immediateRender?u.globalTime(0):-1/0,t:u}}).sort(function(u,h){return h.g-u.g||-1/0}).forEach(function(u){return u.t.revert(n)}),l=s.data.length;l--;)c=s.data[l],c instanceof En?c.data!=="nested"&&(c.scrollTrigger&&c.scrollTrigger.revert(),c.kill()):!(c instanceof Ht)&&c.revert&&c.revert(n);s._r.forEach(function(u){return u(n,s)}),s.isReverted=!0}():this.data.forEach(function(a){return a.kill&&a.kill()}),this.clear(),i)for(var o=es.length;o--;)es[o].id===this.id&&es.splice(o,1)},e.revert=function(n){this.kill(n||{})},r}(),HM=function(){function r(t){this.contexts=[],this.scope=t,Ct&&Ct.data.push(this)}var e=r.prototype;return e.add=function(n,i,s){Li(n)||(n={matches:n});var o=new Tm(0,s||this.scope),a=o.conditions={},l,c,u;Ct&&!o.selector&&(o.selector=Ct.selector),this.contexts.push(o),i=o.add("onMatch",i),o.queries=n;for(c in n)c==="all"?u=1:(l=xi.matchMedia(n[c]),l&&(es.indexOf(o)<0&&es.push(o),(a[c]=l.matches)&&(u=1),l.addListener?l.addListener(Yu):l.addEventListener("change",Yu)));return u&&i(o,function(h){return o.add(null,h)}),this},e.revert=function(n){this.kill(n||{})},e.kill=function(n){this.contexts.forEach(function(i){return i.kill(n,!0)})},r}(),Dl={registerPlugin:function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];t.forEach(function(i){return um(i)})},timeline:function(e){return new En(e)},getTweensOf:function(e,t){return Rt.getTweensOf(e,t)},getProperty:function(e,t,n,i){tn(e)&&(e=ri(e)[0]);var s=jr(e||{}).get,o=n?jp:Zp;return n==="native"&&(n=""),e&&(t?o((Hn[t]&&Hn[t].get||s)(e,t,n,i)):function(a,l,c){return o((Hn[a]&&Hn[a].get||s)(e,a,l,c))})},quickSetter:function(e,t,n){if(e=ri(e),e.length>1){var i=e.map(function(u){return In.quickSetter(u,t,n)}),s=i.length;return function(u){for(var h=s;h--;)i[h](u)}}e=e[0]||{};var o=Hn[t],a=jr(e),l=a.harness&&(a.harness.aliases||{})[t]||t,c=o?function(u){var h=new o;zs._pt=0,h.init(e,n?u+n:u,zs,0,[e]),h.render(1,h),zs._pt&&If(1,zs)}:a.set(e,l);return o?c:function(u){return c(e,l,n?u+n:u,a,1)}},quickTo:function(e,t,n){var i,s=In.to(e,Kn((i={},i[t]="+=0.1",i.paused=!0,i.stagger=0,i),n||{})),o=function(l,c,u){return s.resetTo(t,l,c,u)};return o.tween=s,o},isTweening:function(e){return Rt.getTweensOf(e,!0).length>0},defaults:function(e){return e&&e.ease&&(e.ease=Qr(e.ease,ao.ease)),nd(ao,e||{})},config:function(e){return nd(qn,e||{})},registerEffect:function(e){var t=e.name,n=e.effect,i=e.plugins,s=e.defaults,o=e.extendTimeline;(i||"").split(",").forEach(function(a){return a&&!Hn[a]&&!$n[a]&&sa(t+" effect requires "+a+" plugin.")}),wc[t]=function(a,l,c){return n(ri(a),Kn(l||{},s),c)},o&&(En.prototype[t]=function(a,l,c){return this.add(wc[t](a,Li(l)?l:(c=l)&&{},this),c)})},registerEase:function(e,t){at[e]=Qr(t)},parseEase:function(e,t){return arguments.length?Qr(e,t):at},getById:function(e){return Rt.getById(e)},exportRoot:function(e,t){e===void 0&&(e={});var n=new En(e),i,s;for(n.smoothChildTiming=Pn(e.smoothChildTiming),Rt.remove(n),n._dp=0,n._time=n._tTime=Rt._time,i=Rt._first;i;)s=i._next,(t||!(!i._dur&&i instanceof Ht&&i.vars.onComplete===i._targets[0]))&&Ei(n,i,i._start-i._delay),i=s;return Ei(Rt,n,0),n},context:function(e,t){return e?new Tm(e,t):Ct},matchMedia:function(e){return new HM(e)},matchMediaRefresh:function(){return es.forEach(function(e){var t=e.conditions,n,i;for(i in t)t[i]&&(t[i]=!1,n=1);n&&e.revert()})||Yu()},addEventListener:function(e,t){var n=ml[e]||(ml[e]=[]);~n.indexOf(t)||n.push(t)},removeEventListener:function(e,t){var n=ml[e],i=n&&n.indexOf(t);i>=0&&n.splice(i,1)},utils:{wrap:xM,wrapYoyo:SM,distribute:rm,random:om,snap:sm,normalize:vM,getUnit:fn,clamp:pM,splitColor:fm,toArray:ri,selector:Gu,mapRange:lm,pipe:_M,unitize:gM,interpolate:yM,shuffle:im},install:Xp,effects:wc,ticker:Gn,updateRoot:En.updateRoot,plugins:Hn,globalTimeline:Rt,core:{PropTween:Ln,globals:Yp,Tween:Ht,Timeline:En,Animation:ca,getCache:jr,_removeLinkedListItem:Vl,reverting:function(){return sn},context:function(e){return e&&Ct&&(Ct.data.push(e),e._ctx=Ct),Ct},suppressOverwrites:function(e){return Mf=e}}};Dn("to,from,fromTo,delayedCall,set,killTweensOf",function(r){return Dl[r]=Ht[r]});Gn.add(En.updateRoot);zs=Dl.to({},{duration:0});var VM=function(e,t){for(var n=e._pt;n&&n.p!==t&&n.op!==t&&n.fp!==t;)n=n._next;return n},GM=function(e,t){var n=e._targets,i,s,o;for(i in t)for(s=n.length;s--;)o=e._ptLookup[s][i],o&&(o=o.d)&&(o._pt&&(o=VM(o,i)),o&&o.modifier&&o.modifier(t[i],e,n[s],i))},Dc=function(e,t){return{name:e,rawVars:1,init:function(i,s,o){o._onInit=function(a){var l,c;if(tn(s)&&(l={},Dn(s,function(u){return l[u]=1}),s=l),t){l={};for(c in s)l[c]=t(s[c]);s=l}GM(a,s)}}}},In=Dl.registerPlugin({name:"attr",init:function(e,t,n,i,s){var o,a,l;this.tween=n;for(o in t)l=e.getAttribute(o)||"",a=this.add(e,"setAttribute",(l||0)+"",t[o],i,s,0,0,o),a.op=o,a.b=l,this._props.push(o)},render:function(e,t){for(var n=t._pt;n;)sn?n.set(n.t,n.p,n.b,n):n.r(e,n.d),n=n._next}},{name:"endArray",init:function(e,t){for(var n=t.length;n--;)this.add(e,n,e[n]||0,t[n],0,0,0,0,0,1)}},Dc("roundProps",Wu),Dc("modifiers"),Dc("snap",sm))||Dl;Ht.version=En.version=In.version="3.12.7";Wp=1;bf()&&fo();at.Power0;at.Power1;at.Power2;at.Power3;at.Power4;at.Linear;at.Quad;at.Cubic;at.Quart;at.Quint;at.Strong;at.Elastic;at.Back;at.SteppedEase;at.Bounce;at.Sine;at.Expo;at.Circ;/*!
 * CSSPlugin 3.12.7
 * https://gsap.com
 *
 * Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license or for
 * Club GSAP members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/var ld,ur,Ys,Nf,qr,cd,Ff,WM=function(){return typeof window<"u"},Ji={},kr=180/Math.PI,qs=Math.PI/180,Cs=Math.atan2,ud=1e8,Of=/([A-Z])/g,XM=/(left|right|width|margin|padding|x)/i,YM=/[\s,\(]\S/,wi={autoAlpha:"opacity,visibility",scale:"scaleX,scaleY",alpha:"opacity"},qu=function(e,t){return t.set(t.t,t.p,Math.round((t.s+t.c*e)*1e4)/1e4+t.u,t)},qM=function(e,t){return t.set(t.t,t.p,e===1?t.e:Math.round((t.s+t.c*e)*1e4)/1e4+t.u,t)},$M=function(e,t){return t.set(t.t,t.p,e?Math.round((t.s+t.c*e)*1e4)/1e4+t.u:t.b,t)},KM=function(e,t){var n=t.s+t.c*e;t.set(t.t,t.p,~~(n+(n<0?-.5:.5))+t.u,t)},wm=function(e,t){return t.set(t.t,t.p,e?t.e:t.b,t)},Am=function(e,t){return t.set(t.t,t.p,e!==1?t.b:t.e,t)},ZM=function(e,t,n){return e.style[t]=n},jM=function(e,t,n){return e.style.setProperty(t,n)},JM=function(e,t,n){return e._gsap[t]=n},QM=function(e,t,n){return e._gsap.scaleX=e._gsap.scaleY=n},eE=function(e,t,n,i,s){var o=e._gsap;o.scaleX=o.scaleY=n,o.renderTransform(s,o)},tE=function(e,t,n,i,s){var o=e._gsap;o[t]=n,o.renderTransform(s,o)},Pt="transform",Un=Pt+"Origin",nE=function r(e,t){var n=this,i=this.target,s=i.style,o=i._gsap;if(e in Ji&&s){if(this.tfm=this.tfm||{},e!=="transform")e=wi[e]||e,~e.indexOf(",")?e.split(",").forEach(function(a){return n.tfm[a]=ki(i,a)}):this.tfm[e]=o.x?o[e]:ki(i,e),e===Un&&(this.tfm.zOrigin=o.zOrigin);else return wi.transform.split(",").forEach(function(a){return r.call(n,a,t)});if(this.props.indexOf(Pt)>=0)return;o.svg&&(this.svgo=i.getAttribute("data-svg-origin"),this.props.push(Un,t,"")),e=Pt}(s||t)&&this.props.push(e,t,s[e])},Cm=function(e){e.translate&&(e.removeProperty("translate"),e.removeProperty("scale"),e.removeProperty("rotate"))},iE=function(){var e=this.props,t=this.target,n=t.style,i=t._gsap,s,o;for(s=0;s<e.length;s+=3)e[s+1]?e[s+1]===2?t[e[s]](e[s+2]):t[e[s]]=e[s+2]:e[s+2]?n[e[s]]=e[s+2]:n.removeProperty(e[s].substr(0,2)==="--"?e[s]:e[s].replace(Of,"-$1").toLowerCase());if(this.tfm){for(o in this.tfm)i[o]=this.tfm[o];i.svg&&(i.renderTransform(),t.setAttribute("data-svg-origin",this.svgo||"")),s=Ff(),(!s||!s.isStart)&&!n[Pt]&&(Cm(n),i.zOrigin&&n[Un]&&(n[Un]+=" "+i.zOrigin+"px",i.zOrigin=0,i.renderTransform()),i.uncache=1)}},Rm=function(e,t){var n={target:e,props:[],revert:iE,save:nE};return e._gsap||In.core.getCache(e),t&&e.style&&e.nodeType&&t.split(",").forEach(function(i){return n.save(i)}),n},Pm,$u=function(e,t){var n=ur.createElementNS?ur.createElementNS((t||"http://www.w3.org/1999/xhtml").replace(/^https/,"http"),e):ur.createElement(e);return n&&n.style?n:ur.createElement(e)},Pi=function r(e,t,n){var i=getComputedStyle(e);return i[t]||i.getPropertyValue(t.replace(Of,"-$1").toLowerCase())||i.getPropertyValue(t)||!n&&r(e,ho(t)||t,1)||""},fd="O,Moz,ms,Ms,Webkit".split(","),ho=function(e,t,n){var i=t||qr,s=i.style,o=5;if(e in s&&!n)return e;for(e=e.charAt(0).toUpperCase()+e.substr(1);o--&&!(fd[o]+e in s););return o<0?null:(o===3?"ms":o>=0?fd[o]:"")+e},Ku=function(){WM()&&window.document&&(ld=window,ur=ld.document,Ys=ur.documentElement,qr=$u("div")||{style:{}},$u("div"),Pt=ho(Pt),Un=Pt+"Origin",qr.style.cssText="border-width:0;line-height:0;position:absolute;padding:0",Pm=!!ho("perspective"),Ff=In.core.reverting,Nf=1)},hd=function(e){var t=e.ownerSVGElement,n=$u("svg",t&&t.getAttribute("xmlns")||"http://www.w3.org/2000/svg"),i=e.cloneNode(!0),s;i.style.display="block",n.appendChild(i),Ys.appendChild(n);try{s=i.getBBox()}catch{}return n.removeChild(i),Ys.removeChild(n),s},dd=function(e,t){for(var n=t.length;n--;)if(e.hasAttribute(t[n]))return e.getAttribute(t[n])},Dm=function(e){var t,n;try{t=e.getBBox()}catch{t=hd(e),n=1}return t&&(t.width||t.height)||n||(t=hd(e)),t&&!t.width&&!t.x&&!t.y?{x:+dd(e,["x","cx","x1"])||0,y:+dd(e,["y","cy","y1"])||0,width:0,height:0}:t},Lm=function(e){return!!(e.getCTM&&(!e.parentNode||e.ownerSVGElement)&&Dm(e))},os=function(e,t){if(t){var n=e.style,i;t in Ji&&t!==Un&&(t=Pt),n.removeProperty?(i=t.substr(0,2),(i==="ms"||t.substr(0,6)==="webkit")&&(t="-"+t),n.removeProperty(i==="--"?t:t.replace(Of,"-$1").toLowerCase())):n.removeAttribute(t)}},fr=function(e,t,n,i,s,o){var a=new Ln(e._pt,t,n,0,1,o?Am:wm);return e._pt=a,a.b=i,a.e=s,e._props.push(n),a},pd={deg:1,rad:1,turn:1},rE={grid:1,flex:1},br=function r(e,t,n,i){var s=parseFloat(n)||0,o=(n+"").trim().substr((s+"").length)||"px",a=qr.style,l=XM.test(t),c=e.tagName.toLowerCase()==="svg",u=(c?"client":"offset")+(l?"Width":"Height"),h=100,f=i==="px",d=i==="%",g,_,m,p;if(i===o||!s||pd[i]||pd[o])return s;if(o!=="px"&&!f&&(s=r(e,t,n,"px")),p=e.getCTM&&Lm(e),(d||o==="%")&&(Ji[t]||~t.indexOf("adius")))return g=p?e.getBBox()[l?"width":"height"]:e[u],Nt(d?s/g*h:s/100*g);if(a[l?"width":"height"]=h+(f?o:i),_=i!=="rem"&&~t.indexOf("adius")||i==="em"&&e.appendChild&&!c?e:e.parentNode,p&&(_=(e.ownerSVGElement||{}).parentNode),(!_||_===ur||!_.appendChild)&&(_=ur.body),m=_._gsap,m&&d&&m.width&&l&&m.time===Gn.time&&!m.uncache)return Nt(s/m.width*h);if(d&&(t==="height"||t==="width")){var M=e.style[t];e.style[t]=h+i,g=e[u],M?e.style[t]=M:os(e,t)}else(d||o==="%")&&!rE[Pi(_,"display")]&&(a.position=Pi(e,"position")),_===e&&(a.position="static"),_.appendChild(qr),g=qr[u],_.removeChild(qr),a.position="absolute";return l&&d&&(m=jr(_),m.time=Gn.time,m.width=_[u]),Nt(f?g*s/h:g&&s?h/g*s:0)},ki=function(e,t,n,i){var s;return Nf||Ku(),t in wi&&t!=="transform"&&(t=wi[t],~t.indexOf(",")&&(t=t.split(",")[0])),Ji[t]&&t!=="transform"?(s=fa(e,i),s=t!=="transformOrigin"?s[t]:s.svg?s.origin:Ul(Pi(e,Un))+" "+s.zOrigin+"px"):(s=e.style[t],(!s||s==="auto"||i||~(s+"").indexOf("calc("))&&(s=Ll[t]&&Ll[t](e,t,n)||Pi(e,t)||$p(e,t)||(t==="opacity"?1:0))),n&&!~(s+"").trim().indexOf(" ")?br(e,t,s,n)+n:s},sE=function(e,t,n,i){if(!n||n==="none"){var s=ho(t,e,1),o=s&&Pi(e,s,1);o&&o!==n?(t=s,n=o):t==="borderColor"&&(n=Pi(e,"borderTopColor"))}var a=new Ln(this._pt,e.style,t,0,1,Em),l=0,c=0,u,h,f,d,g,_,m,p,M,y,v,A;if(a.b=n,a.e=i,n+="",i+="",i==="auto"&&(_=e.style[t],e.style[t]=i,i=Pi(e,t)||i,_?e.style[t]=_:os(e,t)),u=[n,i],dm(u),n=u[0],i=u[1],f=n.match(Bs)||[],A=i.match(Bs)||[],A.length){for(;h=Bs.exec(i);)m=h[0],M=i.substring(l,h.index),g?g=(g+1)%5:(M.substr(-5)==="rgba("||M.substr(-5)==="hsla(")&&(g=1),m!==(_=f[c++]||"")&&(d=parseFloat(_)||0,v=_.substr((d+"").length),m.charAt(1)==="="&&(m=Xs(d,m)+v),p=parseFloat(m),y=m.substr((p+"").length),l=Bs.lastIndex-y.length,y||(y=y||qn.units[t]||v,l===i.length&&(i+=y,a.e+=y)),v!==y&&(d=br(e,t,_,y)||0),a._pt={_next:a._pt,p:M||c===1?M:",",s:d,c:p-d,m:g&&g<4||t==="zIndex"?Math.round:0});a.c=l<i.length?i.substring(l,i.length):""}else a.r=t==="display"&&i==="none"?Am:wm;return Vp.test(i)&&(a.e=0),this._pt=a,a},md={top:"0%",bottom:"100%",left:"0%",right:"100%",center:"50%"},oE=function(e){var t=e.split(" "),n=t[0],i=t[1]||"50%";return(n==="top"||n==="bottom"||i==="left"||i==="right")&&(e=n,n=i,i=e),t[0]=md[n]||n,t[1]=md[i]||i,t.join(" ")},aE=function(e,t){if(t.tween&&t.tween._time===t.tween._dur){var n=t.t,i=n.style,s=t.u,o=n._gsap,a,l,c;if(s==="all"||s===!0)i.cssText="",l=1;else for(s=s.split(","),c=s.length;--c>-1;)a=s[c],Ji[a]&&(l=1,a=a==="transformOrigin"?Un:Pt),os(n,a);l&&(os(n,Pt),o&&(o.svg&&n.removeAttribute("transform"),i.scale=i.rotate=i.translate="none",fa(n,1),o.uncache=1,Cm(i)))}},Ll={clearProps:function(e,t,n,i,s){if(s.data!=="isFromStart"){var o=e._pt=new Ln(e._pt,t,n,0,0,aE);return o.u=i,o.pr=-10,o.tween=s,e._props.push(n),1}}},ua=[1,0,0,1,0,0],Um={},Im=function(e){return e==="matrix(1, 0, 0, 1, 0, 0)"||e==="none"||!e},_d=function(e){var t=Pi(e,Pt);return Im(t)?ua:t.substr(7).match(Hp).map(Nt)},Bf=function(e,t){var n=e._gsap||jr(e),i=e.style,s=_d(e),o,a,l,c;return n.svg&&e.getAttribute("transform")?(l=e.transform.baseVal.consolidate().matrix,s=[l.a,l.b,l.c,l.d,l.e,l.f],s.join(",")==="1,0,0,1,0,0"?ua:s):(s===ua&&!e.offsetParent&&e!==Ys&&!n.svg&&(l=i.display,i.display="block",o=e.parentNode,(!o||!e.offsetParent&&!e.getBoundingClientRect().width)&&(c=1,a=e.nextElementSibling,Ys.appendChild(e)),s=_d(e),l?i.display=l:os(e,"display"),c&&(a?o.insertBefore(e,a):o?o.appendChild(e):Ys.removeChild(e))),t&&s.length>6?[s[0],s[1],s[4],s[5],s[12],s[13]]:s)},Zu=function(e,t,n,i,s,o){var a=e._gsap,l=s||Bf(e,!0),c=a.xOrigin||0,u=a.yOrigin||0,h=a.xOffset||0,f=a.yOffset||0,d=l[0],g=l[1],_=l[2],m=l[3],p=l[4],M=l[5],y=t.split(" "),v=parseFloat(y[0])||0,A=parseFloat(y[1])||0,C,w,E,x;n?l!==ua&&(w=d*m-g*_)&&(E=v*(m/w)+A*(-_/w)+(_*M-m*p)/w,x=v*(-g/w)+A*(d/w)-(d*M-g*p)/w,v=E,A=x):(C=Dm(e),v=C.x+(~y[0].indexOf("%")?v/100*C.width:v),A=C.y+(~(y[1]||y[0]).indexOf("%")?A/100*C.height:A)),i||i!==!1&&a.smooth?(p=v-c,M=A-u,a.xOffset=h+(p*d+M*_)-p,a.yOffset=f+(p*g+M*m)-M):a.xOffset=a.yOffset=0,a.xOrigin=v,a.yOrigin=A,a.smooth=!!i,a.origin=t,a.originIsAbsolute=!!n,e.style[Un]="0px 0px",o&&(fr(o,a,"xOrigin",c,v),fr(o,a,"yOrigin",u,A),fr(o,a,"xOffset",h,a.xOffset),fr(o,a,"yOffset",f,a.yOffset)),e.setAttribute("data-svg-origin",v+" "+A)},fa=function(e,t){var n=e._gsap||new gm(e);if("x"in n&&!t&&!n.uncache)return n;var i=e.style,s=n.scaleX<0,o="px",a="deg",l=getComputedStyle(e),c=Pi(e,Un)||"0",u,h,f,d,g,_,m,p,M,y,v,A,C,w,E,x,S,P,I,O,q,W,V,X,z,re,D,ae,Le,ke,$,ne;return u=h=f=_=m=p=M=y=v=0,d=g=1,n.svg=!!(e.getCTM&&Lm(e)),l.translate&&((l.translate!=="none"||l.scale!=="none"||l.rotate!=="none")&&(i[Pt]=(l.translate!=="none"?"translate3d("+(l.translate+" 0 0").split(" ").slice(0,3).join(", ")+") ":"")+(l.rotate!=="none"?"rotate("+l.rotate+") ":"")+(l.scale!=="none"?"scale("+l.scale.split(" ").join(",")+") ":"")+(l[Pt]!=="none"?l[Pt]:"")),i.scale=i.rotate=i.translate="none"),w=Bf(e,n.svg),n.svg&&(n.uncache?(z=e.getBBox(),c=n.xOrigin-z.x+"px "+(n.yOrigin-z.y)+"px",X=""):X=!t&&e.getAttribute("data-svg-origin"),Zu(e,X||c,!!X||n.originIsAbsolute,n.smooth!==!1,w)),A=n.xOrigin||0,C=n.yOrigin||0,w!==ua&&(P=w[0],I=w[1],O=w[2],q=w[3],u=W=w[4],h=V=w[5],w.length===6?(d=Math.sqrt(P*P+I*I),g=Math.sqrt(q*q+O*O),_=P||I?Cs(I,P)*kr:0,M=O||q?Cs(O,q)*kr+_:0,M&&(g*=Math.abs(Math.cos(M*qs))),n.svg&&(u-=A-(A*P+C*O),h-=C-(A*I+C*q))):(ne=w[6],ke=w[7],D=w[8],ae=w[9],Le=w[10],$=w[11],u=w[12],h=w[13],f=w[14],E=Cs(ne,Le),m=E*kr,E&&(x=Math.cos(-E),S=Math.sin(-E),X=W*x+D*S,z=V*x+ae*S,re=ne*x+Le*S,D=W*-S+D*x,ae=V*-S+ae*x,Le=ne*-S+Le*x,$=ke*-S+$*x,W=X,V=z,ne=re),E=Cs(-O,Le),p=E*kr,E&&(x=Math.cos(-E),S=Math.sin(-E),X=P*x-D*S,z=I*x-ae*S,re=O*x-Le*S,$=q*S+$*x,P=X,I=z,O=re),E=Cs(I,P),_=E*kr,E&&(x=Math.cos(E),S=Math.sin(E),X=P*x+I*S,z=W*x+V*S,I=I*x-P*S,V=V*x-W*S,P=X,W=z),m&&Math.abs(m)+Math.abs(_)>359.9&&(m=_=0,p=180-p),d=Nt(Math.sqrt(P*P+I*I+O*O)),g=Nt(Math.sqrt(V*V+ne*ne)),E=Cs(W,V),M=Math.abs(E)>2e-4?E*kr:0,v=$?1/($<0?-$:$):0),n.svg&&(X=e.getAttribute("transform"),n.forceCSS=e.setAttribute("transform","")||!Im(Pi(e,Pt)),X&&e.setAttribute("transform",X))),Math.abs(M)>90&&Math.abs(M)<270&&(s?(d*=-1,M+=_<=0?180:-180,_+=_<=0?180:-180):(g*=-1,M+=M<=0?180:-180)),t=t||n.uncache,n.x=u-((n.xPercent=u&&(!t&&n.xPercent||(Math.round(e.offsetWidth/2)===Math.round(-u)?-50:0)))?e.offsetWidth*n.xPercent/100:0)+o,n.y=h-((n.yPercent=h&&(!t&&n.yPercent||(Math.round(e.offsetHeight/2)===Math.round(-h)?-50:0)))?e.offsetHeight*n.yPercent/100:0)+o,n.z=f+o,n.scaleX=Nt(d),n.scaleY=Nt(g),n.rotation=Nt(_)+a,n.rotationX=Nt(m)+a,n.rotationY=Nt(p)+a,n.skewX=M+a,n.skewY=y+a,n.transformPerspective=v+o,(n.zOrigin=parseFloat(c.split(" ")[2])||!t&&n.zOrigin||0)&&(i[Un]=Ul(c)),n.xOffset=n.yOffset=0,n.force3D=qn.force3D,n.renderTransform=n.svg?cE:Pm?Nm:lE,n.uncache=0,n},Ul=function(e){return(e=e.split(" "))[0]+" "+e[1]},Lc=function(e,t,n){var i=fn(t);return Nt(parseFloat(t)+parseFloat(br(e,"x",n+"px",i)))+i},lE=function(e,t){t.z="0px",t.rotationY=t.rotationX="0deg",t.force3D=0,Nm(e,t)},Fr="0deg",To="0px",Or=") ",Nm=function(e,t){var n=t||this,i=n.xPercent,s=n.yPercent,o=n.x,a=n.y,l=n.z,c=n.rotation,u=n.rotationY,h=n.rotationX,f=n.skewX,d=n.skewY,g=n.scaleX,_=n.scaleY,m=n.transformPerspective,p=n.force3D,M=n.target,y=n.zOrigin,v="",A=p==="auto"&&e&&e!==1||p===!0;if(y&&(h!==Fr||u!==Fr)){var C=parseFloat(u)*qs,w=Math.sin(C),E=Math.cos(C),x;C=parseFloat(h)*qs,x=Math.cos(C),o=Lc(M,o,w*x*-y),a=Lc(M,a,-Math.sin(C)*-y),l=Lc(M,l,E*x*-y+y)}m!==To&&(v+="perspective("+m+Or),(i||s)&&(v+="translate("+i+"%, "+s+"%) "),(A||o!==To||a!==To||l!==To)&&(v+=l!==To||A?"translate3d("+o+", "+a+", "+l+") ":"translate("+o+", "+a+Or),c!==Fr&&(v+="rotate("+c+Or),u!==Fr&&(v+="rotateY("+u+Or),h!==Fr&&(v+="rotateX("+h+Or),(f!==Fr||d!==Fr)&&(v+="skew("+f+", "+d+Or),(g!==1||_!==1)&&(v+="scale("+g+", "+_+Or),M.style[Pt]=v||"translate(0, 0)"},cE=function(e,t){var n=t||this,i=n.xPercent,s=n.yPercent,o=n.x,a=n.y,l=n.rotation,c=n.skewX,u=n.skewY,h=n.scaleX,f=n.scaleY,d=n.target,g=n.xOrigin,_=n.yOrigin,m=n.xOffset,p=n.yOffset,M=n.forceCSS,y=parseFloat(o),v=parseFloat(a),A,C,w,E,x;l=parseFloat(l),c=parseFloat(c),u=parseFloat(u),u&&(u=parseFloat(u),c+=u,l+=u),l||c?(l*=qs,c*=qs,A=Math.cos(l)*h,C=Math.sin(l)*h,w=Math.sin(l-c)*-f,E=Math.cos(l-c)*f,c&&(u*=qs,x=Math.tan(c-u),x=Math.sqrt(1+x*x),w*=x,E*=x,u&&(x=Math.tan(u),x=Math.sqrt(1+x*x),A*=x,C*=x)),A=Nt(A),C=Nt(C),w=Nt(w),E=Nt(E)):(A=h,E=f,C=w=0),(y&&!~(o+"").indexOf("px")||v&&!~(a+"").indexOf("px"))&&(y=br(d,"x",o,"px"),v=br(d,"y",a,"px")),(g||_||m||p)&&(y=Nt(y+g-(g*A+_*w)+m),v=Nt(v+_-(g*C+_*E)+p)),(i||s)&&(x=d.getBBox(),y=Nt(y+i/100*x.width),v=Nt(v+s/100*x.height)),x="matrix("+A+","+C+","+w+","+E+","+y+","+v+")",d.setAttribute("transform",x),M&&(d.style[Pt]=x)},uE=function(e,t,n,i,s){var o=360,a=tn(s),l=parseFloat(s)*(a&&~s.indexOf("rad")?kr:1),c=l-i,u=i+c+"deg",h,f;return a&&(h=s.split("_")[1],h==="short"&&(c%=o,c!==c%(o/2)&&(c+=c<0?o:-360)),h==="cw"&&c<0?c=(c+o*ud)%o-~~(c/o)*o:h==="ccw"&&c>0&&(c=(c-o*ud)%o-~~(c/o)*o)),e._pt=f=new Ln(e._pt,t,n,i,c,qM),f.e=u,f.u="deg",e._props.push(n),f},gd=function(e,t){for(var n in t)e[n]=t[n];return e},fE=function(e,t,n){var i=gd({},n._gsap),s="perspective,force3D,transformOrigin,svgOrigin",o=n.style,a,l,c,u,h,f,d,g;i.svg?(c=n.getAttribute("transform"),n.setAttribute("transform",""),o[Pt]=t,a=fa(n,1),os(n,Pt),n.setAttribute("transform",c)):(c=getComputedStyle(n)[Pt],o[Pt]=t,a=fa(n,1),o[Pt]=c);for(l in Ji)c=i[l],u=a[l],c!==u&&s.indexOf(l)<0&&(d=fn(c),g=fn(u),h=d!==g?br(n,l,c,g):parseFloat(c),f=parseFloat(u),e._pt=new Ln(e._pt,a,l,h,f-h,qu),e._pt.u=g||0,e._props.push(l));gd(a,i)};Dn("padding,margin,Width,Radius",function(r,e){var t="Top",n="Right",i="Bottom",s="Left",o=(e<3?[t,n,i,s]:[t+s,t+n,i+n,i+s]).map(function(a){return e<2?r+a:"border"+a+r});Ll[e>1?"border"+r:r]=function(a,l,c,u,h){var f,d;if(arguments.length<4)return f=o.map(function(g){return ki(a,g,c)}),d=f.join(" "),d.split(f[0]).length===5?f[0]:d;f=(u+"").split(" "),d={},o.forEach(function(g,_){return d[g]=f[_]=f[_]||f[(_-1)/2|0]}),a.init(l,d,h)}});var Fm={name:"css",register:Ku,targetTest:function(e){return e.style&&e.nodeType},init:function(e,t,n,i,s){var o=this._props,a=e.style,l=n.vars.startAt,c,u,h,f,d,g,_,m,p,M,y,v,A,C,w,E;Nf||Ku(),this.styles=this.styles||Rm(e),E=this.styles.props,this.tween=n;for(_ in t)if(_!=="autoRound"&&(u=t[_],!(Hn[_]&&vm(_,t,n,i,e,s)))){if(d=typeof u,g=Ll[_],d==="function"&&(u=u.call(n,i,e,s),d=typeof u),d==="string"&&~u.indexOf("random(")&&(u=aa(u)),g)g(this,e,_,u,n)&&(w=1);else if(_.substr(0,2)==="--")c=(getComputedStyle(e).getPropertyValue(_)+"").trim(),u+="",vr.lastIndex=0,vr.test(c)||(m=fn(c),p=fn(u)),p?m!==p&&(c=br(e,_,c,p)+p):m&&(u+=m),this.add(a,"setProperty",c,u,i,s,0,0,_),o.push(_),E.push(_,0,a[_]);else if(d!=="undefined"){if(l&&_ in l?(c=typeof l[_]=="function"?l[_].call(n,i,e,s):l[_],tn(c)&&~c.indexOf("random(")&&(c=aa(c)),fn(c+"")||c==="auto"||(c+=qn.units[_]||fn(ki(e,_))||""),(c+"").charAt(1)==="="&&(c=ki(e,_))):c=ki(e,_),f=parseFloat(c),M=d==="string"&&u.charAt(1)==="="&&u.substr(0,2),M&&(u=u.substr(2)),h=parseFloat(u),_ in wi&&(_==="autoAlpha"&&(f===1&&ki(e,"visibility")==="hidden"&&h&&(f=0),E.push("visibility",0,a.visibility),fr(this,a,"visibility",f?"inherit":"hidden",h?"inherit":"hidden",!h)),_!=="scale"&&_!=="transform"&&(_=wi[_],~_.indexOf(",")&&(_=_.split(",")[0]))),y=_ in Ji,y){if(this.styles.save(_),v||(A=e._gsap,A.renderTransform&&!t.parseTransform||fa(e,t.parseTransform),C=t.smoothOrigin!==!1&&A.smooth,v=this._pt=new Ln(this._pt,a,Pt,0,1,A.renderTransform,A,0,-1),v.dep=1),_==="scale")this._pt=new Ln(this._pt,A,"scaleY",A.scaleY,(M?Xs(A.scaleY,M+h):h)-A.scaleY||0,qu),this._pt.u=0,o.push("scaleY",_),_+="X";else if(_==="transformOrigin"){E.push(Un,0,a[Un]),u=oE(u),A.svg?Zu(e,u,0,C,0,this):(p=parseFloat(u.split(" ")[2])||0,p!==A.zOrigin&&fr(this,A,"zOrigin",A.zOrigin,p),fr(this,a,_,Ul(c),Ul(u)));continue}else if(_==="svgOrigin"){Zu(e,u,1,C,0,this);continue}else if(_ in Um){uE(this,A,_,f,M?Xs(f,M+u):u);continue}else if(_==="smoothOrigin"){fr(this,A,"smooth",A.smooth,u);continue}else if(_==="force3D"){A[_]=u;continue}else if(_==="transform"){fE(this,u,e);continue}}else _ in a||(_=ho(_)||_);if(y||(h||h===0)&&(f||f===0)&&!YM.test(u)&&_ in a)m=(c+"").substr((f+"").length),h||(h=0),p=fn(u)||(_ in qn.units?qn.units[_]:m),m!==p&&(f=br(e,_,c,p)),this._pt=new Ln(this._pt,y?A:a,_,f,(M?Xs(f,M+h):h)-f,!y&&(p==="px"||_==="zIndex")&&t.autoRound!==!1?KM:qu),this._pt.u=p||0,m!==p&&p!=="%"&&(this._pt.b=c,this._pt.r=$M);else if(_ in a)sE.call(this,e,_,c,M?M+u:u);else if(_ in e)this.add(e,_,c||e[_],M?M+u:u,i,s);else if(_!=="parseTransform"){wf(_,u);continue}y||(_ in a?E.push(_,0,a[_]):typeof e[_]=="function"?E.push(_,2,e[_]()):E.push(_,1,c||e[_])),o.push(_)}}w&&bm(this)},render:function(e,t){if(t.tween._time||!Ff())for(var n=t._pt;n;)n.r(e,n.d),n=n._next;else t.styles.revert()},get:ki,aliases:wi,getSetter:function(e,t,n){var i=wi[t];return i&&i.indexOf(",")<0&&(t=i),t in Ji&&t!==Un&&(e._gsap.x||ki(e,"x"))?n&&cd===n?t==="scale"?QM:JM:(cd=n||{})&&(t==="scale"?eE:tE):e.style&&!Ef(e.style[t])?ZM:~t.indexOf("-")?jM:Uf(e,t)},core:{_removeProperty:os,_getMatrix:Bf}};In.utils.checkPrefix=ho;In.core.getStyleSaver=Rm;(function(r,e,t,n){var i=Dn(r+","+e+","+t,function(s){Ji[s]=1});Dn(e,function(s){qn.units[s]="deg",Um[s]=1}),wi[i[13]]=r+","+e,Dn(n,function(s){var o=s.split(":");wi[o[1]]=i[o[0]]})})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent","rotation,rotationX,rotationY,skewX,skewY","transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective","0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");Dn("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective",function(r){qn.units[r]="px"});In.registerPlugin(Fm);var cn=In.registerPlugin(Fm)||In;cn.core.Tween;function hE(r,e){for(var t=0;t<e.length;t++){var n=e[t];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(r,n.key,n)}}function dE(r,e,t){return e&&hE(r.prototype,e),r}/*!
 * Observer 3.12.7
 * https://gsap.com
 *
 * @license Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license or for
 * Club GSAP members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/var rn,_l,Wn,hr,dr,$s,Om,Hr,Yo,Bm,Wi,ui,zm,km=function(){return rn||typeof window<"u"&&(rn=window.gsap)&&rn.registerPlugin&&rn},Hm=1,ks=[],it=[],Di=[],qo=Date.now,ju=function(e,t){return t},pE=function(){var e=Yo.core,t=e.bridge||{},n=e._scrollers,i=e._proxies;n.push.apply(n,it),i.push.apply(i,Di),it=n,Di=i,ju=function(o,a){return t[o](a)}},xr=function(e,t){return~Di.indexOf(e)&&Di[Di.indexOf(e)+1][t]},$o=function(e){return!!~Bm.indexOf(e)},vn=function(e,t,n,i,s){return e.addEventListener(t,n,{passive:i!==!1,capture:!!s})},gn=function(e,t,n,i){return e.removeEventListener(t,n,!!i)},Ya="scrollLeft",qa="scrollTop",Ju=function(){return Wi&&Wi.isPressed||it.cache++},Il=function(e,t){var n=function i(s){if(s||s===0){Hm&&(Wn.history.scrollRestoration="manual");var o=Wi&&Wi.isPressed;s=i.v=Math.round(s)||(Wi&&Wi.iOS?1:0),e(s),i.cacheID=it.cache,o&&ju("ss",s)}else(t||it.cache!==i.cacheID||ju("ref"))&&(i.cacheID=it.cache,i.v=e());return i.v+i.offset};return n.offset=0,e&&n},bn={s:Ya,p:"left",p2:"Left",os:"right",os2:"Right",d:"width",d2:"Width",a:"x",sc:Il(function(r){return arguments.length?Wn.scrollTo(r,$t.sc()):Wn.pageXOffset||hr[Ya]||dr[Ya]||$s[Ya]||0})},$t={s:qa,p:"top",p2:"Top",os:"bottom",os2:"Bottom",d:"height",d2:"Height",a:"y",op:bn,sc:Il(function(r){return arguments.length?Wn.scrollTo(bn.sc(),r):Wn.pageYOffset||hr[qa]||dr[qa]||$s[qa]||0})},An=function(e,t){return(t&&t._ctx&&t._ctx.selector||rn.utils.toArray)(e)[0]||(typeof e=="string"&&rn.config().nullTargetWarn!==!1?console.warn("Element not found:",e):null)},Tr=function(e,t){var n=t.s,i=t.sc;$o(e)&&(e=hr.scrollingElement||dr);var s=it.indexOf(e),o=i===$t.sc?1:2;!~s&&(s=it.push(e)-1),it[s+o]||vn(e,"scroll",Ju);var a=it[s+o],l=a||(it[s+o]=Il(xr(e,n),!0)||($o(e)?i:Il(function(c){return arguments.length?e[n]=c:e[n]})));return l.target=e,a||(l.smooth=rn.getProperty(e,"scrollBehavior")==="smooth"),l},Qu=function(e,t,n){var i=e,s=e,o=qo(),a=o,l=t||50,c=Math.max(500,l*3),u=function(g,_){var m=qo();_||m-o>l?(s=i,i=g,a=o,o=m):n?i+=g:i=s+(g-s)/(m-a)*(o-a)},h=function(){s=i=n?0:i,a=o=0},f=function(g){var _=a,m=s,p=qo();return(g||g===0)&&g!==i&&u(g),o===a||p-a>c?0:(i+(n?m:-m))/((n?p:o)-_)*1e3};return{update:u,reset:h,getVelocity:f}},wo=function(e,t){return t&&!e._gsapAllow&&e.preventDefault(),e.changedTouches?e.changedTouches[0]:e},vd=function(e){var t=Math.max.apply(Math,e),n=Math.min.apply(Math,e);return Math.abs(t)>=Math.abs(n)?t:n},Vm=function(){Yo=rn.core.globals().ScrollTrigger,Yo&&Yo.core&&pE()},Gm=function(e){return rn=e||km(),!_l&&rn&&typeof document<"u"&&document.body&&(Wn=window,hr=document,dr=hr.documentElement,$s=hr.body,Bm=[Wn,hr,dr,$s],rn.utils.clamp,zm=rn.core.context||function(){},Hr="onpointerenter"in $s?"pointer":"mouse",Om=Ot.isTouch=Wn.matchMedia&&Wn.matchMedia("(hover: none), (pointer: coarse)").matches?1:"ontouchstart"in Wn||navigator.maxTouchPoints>0||navigator.msMaxTouchPoints>0?2:0,ui=Ot.eventTypes=("ontouchstart"in dr?"touchstart,touchmove,touchcancel,touchend":"onpointerdown"in dr?"pointerdown,pointermove,pointercancel,pointerup":"mousedown,mousemove,mouseup,mouseup").split(","),setTimeout(function(){return Hm=0},500),Vm(),_l=1),_l};bn.op=$t;it.cache=0;var Ot=function(){function r(t){this.init(t)}var e=r.prototype;return e.init=function(n){_l||Gm(rn)||console.warn("Please gsap.registerPlugin(Observer)"),Yo||Vm();var i=n.tolerance,s=n.dragMinimum,o=n.type,a=n.target,l=n.lineHeight,c=n.debounce,u=n.preventDefault,h=n.onStop,f=n.onStopDelay,d=n.ignore,g=n.wheelSpeed,_=n.event,m=n.onDragStart,p=n.onDragEnd,M=n.onDrag,y=n.onPress,v=n.onRelease,A=n.onRight,C=n.onLeft,w=n.onUp,E=n.onDown,x=n.onChangeX,S=n.onChangeY,P=n.onChange,I=n.onToggleX,O=n.onToggleY,q=n.onHover,W=n.onHoverEnd,V=n.onMove,X=n.ignoreCheck,z=n.isNormalizer,re=n.onGestureStart,D=n.onGestureEnd,ae=n.onWheel,Le=n.onEnable,ke=n.onDisable,$=n.onClick,ne=n.scrollSpeed,pe=n.capture,se=n.allowClicks,we=n.lockAxis,Be=n.onLockAxis;this.target=a=An(a)||dr,this.vars=n,d&&(d=rn.utils.toArray(d)),i=i||1e-9,s=s||0,g=g||1,ne=ne||1,o=o||"wheel,touch,pointer",c=c!==!1,l||(l=parseFloat(Wn.getComputedStyle($s).lineHeight)||22);var ye,rt,et,Ee,L,xt,Ve,B=this,Te=0,st=0,Ce=n.passive||!u&&n.passive!==!1,R=Tr(a,bn),b=Tr(a,$t),k=R(),ee=b(),Q=~o.indexOf("touch")&&!~o.indexOf("pointer")&&ui[0]==="pointerdown",j=$o(a),he=a.ownerDocument||hr,ce=[0,0,0],me=[0,0,0],Ye=0,oe=function(){return Ye=qo()},le=function(Re,Ke){return(B.event=Re)&&d&&~d.indexOf(Re.target)||Ke&&Q&&Re.pointerType!=="touch"||X&&X(Re,Ke)},Fe=function(){B._vx.reset(),B._vy.reset(),rt.pause(),h&&h(B)},Ne=function(){var Re=B.deltaX=vd(ce),Ke=B.deltaY=vd(me),_e=Math.abs(Re)>=i,Xe=Math.abs(Ke)>=i;P&&(_e||Xe)&&P(B,Re,Ke,ce,me),_e&&(A&&B.deltaX>0&&A(B),C&&B.deltaX<0&&C(B),x&&x(B),I&&B.deltaX<0!=Te<0&&I(B),Te=B.deltaX,ce[0]=ce[1]=ce[2]=0),Xe&&(E&&B.deltaY>0&&E(B),w&&B.deltaY<0&&w(B),S&&S(B),O&&B.deltaY<0!=st<0&&O(B),st=B.deltaY,me[0]=me[1]=me[2]=0),(Ee||et)&&(V&&V(B),et&&(m&&et===1&&m(B),M&&M(B),et=0),Ee=!1),xt&&!(xt=!1)&&Be&&Be(B),L&&(ae(B),L=!1),ye=0},Se=function(Re,Ke,_e){ce[_e]+=Re,me[_e]+=Ke,B._vx.update(Re),B._vy.update(Ke),c?ye||(ye=requestAnimationFrame(Ne)):Ne()},$e=function(Re,Ke){we&&!Ve&&(B.axis=Ve=Math.abs(Re)>Math.abs(Ke)?"x":"y",xt=!0),Ve!=="y"&&(ce[2]+=Re,B._vx.update(Re,!0)),Ve!=="x"&&(me[2]+=Ke,B._vy.update(Ke,!0)),c?ye||(ye=requestAnimationFrame(Ne)):Ne()},He=function(Re){if(!le(Re,1)){Re=wo(Re,u);var Ke=Re.clientX,_e=Re.clientY,Xe=Ke-B.x,Pe=_e-B.y,We=B.isDragging;B.x=Ke,B.y=_e,(We||(Xe||Pe)&&(Math.abs(B.startX-Ke)>=s||Math.abs(B.startY-_e)>=s))&&(et=We?2:1,We||(B.isDragging=!0),$e(Xe,Pe))}},lt=B.onPress=function(xe){le(xe,1)||xe&&xe.button||(B.axis=Ve=null,rt.pause(),B.isPressed=!0,xe=wo(xe),Te=st=0,B.startX=B.x=xe.clientX,B.startY=B.y=xe.clientY,B._vx.reset(),B._vy.reset(),vn(z?a:he,ui[1],He,Ce,!0),B.deltaX=B.deltaY=0,y&&y(B))},U=B.onRelease=function(xe){if(!le(xe,1)){gn(z?a:he,ui[1],He,!0);var Re=!isNaN(B.y-B.startY),Ke=B.isDragging,_e=Ke&&(Math.abs(B.x-B.startX)>3||Math.abs(B.y-B.startY)>3),Xe=wo(xe);!_e&&Re&&(B._vx.reset(),B._vy.reset(),u&&se&&rn.delayedCall(.08,function(){if(qo()-Ye>300&&!xe.defaultPrevented){if(xe.target.click)xe.target.click();else if(he.createEvent){var Pe=he.createEvent("MouseEvents");Pe.initMouseEvent("click",!0,!0,Wn,1,Xe.screenX,Xe.screenY,Xe.clientX,Xe.clientY,!1,!1,!1,!1,0,null),xe.target.dispatchEvent(Pe)}}})),B.isDragging=B.isGesturing=B.isPressed=!1,h&&Ke&&!z&&rt.restart(!0),et&&Ne(),p&&Ke&&p(B),v&&v(B,_e)}},fe=function(Re){return Re.touches&&Re.touches.length>1&&(B.isGesturing=!0)&&re(Re,B.isDragging)},K=function(){return(B.isGesturing=!1)||D(B)},J=function(Re){if(!le(Re)){var Ke=R(),_e=b();Se((Ke-k)*ne,(_e-ee)*ne,1),k=Ke,ee=_e,h&&rt.restart(!0)}},ue=function(Re){if(!le(Re)){Re=wo(Re,u),ae&&(L=!0);var Ke=(Re.deltaMode===1?l:Re.deltaMode===2?Wn.innerHeight:1)*g;Se(Re.deltaX*Ke,Re.deltaY*Ke,0),h&&!z&&rt.restart(!0)}},de=function(Re){if(!le(Re)){var Ke=Re.clientX,_e=Re.clientY,Xe=Ke-B.x,Pe=_e-B.y;B.x=Ke,B.y=_e,Ee=!0,h&&rt.restart(!0),(Xe||Pe)&&$e(Xe,Pe)}},Ge=function(Re){B.event=Re,q(B)},ct=function(Re){B.event=Re,W(B)},Dt=function(Re){return le(Re)||wo(Re,u)&&$(B)};rt=B._dc=rn.delayedCall(f||.25,Fe).pause(),B.deltaX=B.deltaY=0,B._vx=Qu(0,50,!0),B._vy=Qu(0,50,!0),B.scrollX=R,B.scrollY=b,B.isDragging=B.isGesturing=B.isPressed=!1,zm(this),B.enable=function(xe){return B.isEnabled||(vn(j?he:a,"scroll",Ju),o.indexOf("scroll")>=0&&vn(j?he:a,"scroll",J,Ce,pe),o.indexOf("wheel")>=0&&vn(a,"wheel",ue,Ce,pe),(o.indexOf("touch")>=0&&Om||o.indexOf("pointer")>=0)&&(vn(a,ui[0],lt,Ce,pe),vn(he,ui[2],U),vn(he,ui[3],U),se&&vn(a,"click",oe,!0,!0),$&&vn(a,"click",Dt),re&&vn(he,"gesturestart",fe),D&&vn(he,"gestureend",K),q&&vn(a,Hr+"enter",Ge),W&&vn(a,Hr+"leave",ct),V&&vn(a,Hr+"move",de)),B.isEnabled=!0,B.isDragging=B.isGesturing=B.isPressed=Ee=et=!1,B._vx.reset(),B._vy.reset(),k=R(),ee=b(),xe&&xe.type&&lt(xe),Le&&Le(B)),B},B.disable=function(){B.isEnabled&&(ks.filter(function(xe){return xe!==B&&$o(xe.target)}).length||gn(j?he:a,"scroll",Ju),B.isPressed&&(B._vx.reset(),B._vy.reset(),gn(z?a:he,ui[1],He,!0)),gn(j?he:a,"scroll",J,pe),gn(a,"wheel",ue,pe),gn(a,ui[0],lt,pe),gn(he,ui[2],U),gn(he,ui[3],U),gn(a,"click",oe,!0),gn(a,"click",Dt),gn(he,"gesturestart",fe),gn(he,"gestureend",K),gn(a,Hr+"enter",Ge),gn(a,Hr+"leave",ct),gn(a,Hr+"move",de),B.isEnabled=B.isPressed=B.isDragging=!1,ke&&ke(B))},B.kill=B.revert=function(){B.disable();var xe=ks.indexOf(B);xe>=0&&ks.splice(xe,1),Wi===B&&(Wi=0)},ks.push(B),z&&$o(a)&&(Wi=B),B.enable(_)},dE(r,[{key:"velocityX",get:function(){return this._vx.getVelocity()}},{key:"velocityY",get:function(){return this._vy.getVelocity()}}]),r}();Ot.version="3.12.7";Ot.create=function(r){return new Ot(r)};Ot.register=Gm;Ot.getAll=function(){return ks.slice()};Ot.getById=function(r){return ks.filter(function(e){return e.vars.id===r})[0]};km()&&rn.registerPlugin(Ot);/*!
 * ScrollTrigger 3.12.7
 * https://gsap.com
 *
 * @license Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license or for
 * Club GSAP members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/var Ae,Is,nt,bt,Vn,mt,zf,Nl,ha,Ko,Uo,$a,ln,Xl,ef,yn,xd,Sd,Ns,Wm,Uc,Xm,Sn,tf,Ym,qm,ar,nf,kf,Ks,Hf,Fl,rf,Ic,Ka=1,un=Date.now,Nc=un(),si=0,Io=0,yd=function(e,t,n){var i=kn(e)&&(e.substr(0,6)==="clamp("||e.indexOf("max")>-1);return n["_"+t+"Clamp"]=i,i?e.substr(6,e.length-7):e},Md=function(e,t){return t&&(!kn(e)||e.substr(0,6)!=="clamp(")?"clamp("+e+")":e},mE=function r(){return Io&&requestAnimationFrame(r)},Ed=function(){return Xl=1},bd=function(){return Xl=0},Si=function(e){return e},No=function(e){return Math.round(e*1e5)/1e5||0},$m=function(){return typeof window<"u"},Km=function(){return Ae||$m()&&(Ae=window.gsap)&&Ae.registerPlugin&&Ae},as=function(e){return!!~zf.indexOf(e)},Zm=function(e){return(e==="Height"?Hf:nt["inner"+e])||Vn["client"+e]||mt["client"+e]},jm=function(e){return xr(e,"getBoundingClientRect")||(as(e)?function(){return yl.width=nt.innerWidth,yl.height=Hf,yl}:function(){return Hi(e)})},_E=function(e,t,n){var i=n.d,s=n.d2,o=n.a;return(o=xr(e,"getBoundingClientRect"))?function(){return o()[i]}:function(){return(t?Zm(s):e["client"+s])||0}},gE=function(e,t){return!t||~Di.indexOf(e)?jm(e):function(){return yl}},Ai=function(e,t){var n=t.s,i=t.d2,s=t.d,o=t.a;return Math.max(0,(n="scroll"+i)&&(o=xr(e,n))?o()-jm(e)()[s]:as(e)?(Vn[n]||mt[n])-Zm(i):e[n]-e["offset"+i])},Za=function(e,t){for(var n=0;n<Ns.length;n+=3)(!t||~t.indexOf(Ns[n+1]))&&e(Ns[n],Ns[n+1],Ns[n+2])},kn=function(e){return typeof e=="string"},hn=function(e){return typeof e=="function"},Fo=function(e){return typeof e=="number"},Vr=function(e){return typeof e=="object"},Ao=function(e,t,n){return e&&e.progress(t?0:1)&&n&&e.pause()},Fc=function(e,t){if(e.enabled){var n=e._ctx?e._ctx.add(function(){return t(e)}):t(e);n&&n.totalTime&&(e.callbackAnimation=n)}},Rs=Math.abs,Jm="left",Qm="top",Vf="right",Gf="bottom",ts="width",ns="height",Zo="Right",jo="Left",Jo="Top",Qo="Bottom",kt="padding",ni="margin",po="Width",Wf="Height",qt="px",ii=function(e){return nt.getComputedStyle(e)},vE=function(e){var t=ii(e).position;e.style.position=t==="absolute"||t==="fixed"?t:"relative"},Td=function(e,t){for(var n in t)n in e||(e[n]=t[n]);return e},Hi=function(e,t){var n=t&&ii(e)[ef]!=="matrix(1, 0, 0, 1, 0, 0)"&&Ae.to(e,{x:0,y:0,xPercent:0,yPercent:0,rotation:0,rotationX:0,rotationY:0,scale:1,skewX:0,skewY:0}).progress(1),i=e.getBoundingClientRect();return n&&n.progress(0).kill(),i},Ol=function(e,t){var n=t.d2;return e["offset"+n]||e["client"+n]||0},e_=function(e){var t=[],n=e.labels,i=e.duration(),s;for(s in n)t.push(n[s]/i);return t},xE=function(e){return function(t){return Ae.utils.snap(e_(e),t)}},Xf=function(e){var t=Ae.utils.snap(e),n=Array.isArray(e)&&e.slice(0).sort(function(i,s){return i-s});return n?function(i,s,o){o===void 0&&(o=.001);var a;if(!s)return t(i);if(s>0){for(i-=o,a=0;a<n.length;a++)if(n[a]>=i)return n[a];return n[a-1]}else for(a=n.length,i+=o;a--;)if(n[a]<=i)return n[a];return n[0]}:function(i,s,o){o===void 0&&(o=.001);var a=t(i);return!s||Math.abs(a-i)<o||a-i<0==s<0?a:t(s<0?i-e:i+e)}},SE=function(e){return function(t,n){return Xf(e_(e))(t,n.direction)}},ja=function(e,t,n,i){return n.split(",").forEach(function(s){return e(t,s,i)})},Qt=function(e,t,n,i,s){return e.addEventListener(t,n,{passive:!i,capture:!!s})},Jt=function(e,t,n,i){return e.removeEventListener(t,n,!!i)},Ja=function(e,t,n){n=n&&n.wheelHandler,n&&(e(t,"wheel",n),e(t,"touchmove",n))},wd={startColor:"green",endColor:"red",indent:0,fontSize:"16px",fontWeight:"normal"},Qa={toggleActions:"play",anticipatePin:0},Bl={top:0,left:0,center:.5,bottom:1,right:1},gl=function(e,t){if(kn(e)){var n=e.indexOf("="),i=~n?+(e.charAt(n-1)+1)*parseFloat(e.substr(n+1)):0;~n&&(e.indexOf("%")>n&&(i*=t/100),e=e.substr(0,n-1)),e=i+(e in Bl?Bl[e]*t:~e.indexOf("%")?parseFloat(e)*t/100:parseFloat(e)||0)}return e},el=function(e,t,n,i,s,o,a,l){var c=s.startColor,u=s.endColor,h=s.fontSize,f=s.indent,d=s.fontWeight,g=bt.createElement("div"),_=as(n)||xr(n,"pinType")==="fixed",m=e.indexOf("scroller")!==-1,p=_?mt:n,M=e.indexOf("start")!==-1,y=M?c:u,v="border-color:"+y+";font-size:"+h+";color:"+y+";font-weight:"+d+";pointer-events:none;white-space:nowrap;font-family:sans-serif,Arial;z-index:1000;padding:4px 8px;border-width:0;border-style:solid;";return v+="position:"+((m||l)&&_?"fixed;":"absolute;"),(m||l||!_)&&(v+=(i===$t?Vf:Gf)+":"+(o+parseFloat(f))+"px;"),a&&(v+="box-sizing:border-box;text-align:left;width:"+a.offsetWidth+"px;"),g._isStart=M,g.setAttribute("class","gsap-marker-"+e+(t?" marker-"+t:"")),g.style.cssText=v,g.innerText=t||t===0?e+"-"+t:e,p.children[0]?p.insertBefore(g,p.children[0]):p.appendChild(g),g._offset=g["offset"+i.op.d2],vl(g,0,i,M),g},vl=function(e,t,n,i){var s={display:"block"},o=n[i?"os2":"p2"],a=n[i?"p2":"os2"];e._isFlipped=i,s[n.a+"Percent"]=i?-100:0,s[n.a]=i?"1px":0,s["border"+o+po]=1,s["border"+a+po]=0,s[n.p]=t+"px",Ae.set(e,s)},Qe=[],sf={},da,Ad=function(){return un()-si>34&&(da||(da=requestAnimationFrame(qi)))},Ps=function(){(!Sn||!Sn.isPressed||Sn.startX>mt.clientWidth)&&(it.cache++,Sn?da||(da=requestAnimationFrame(qi)):qi(),si||cs("scrollStart"),si=un())},Oc=function(){qm=nt.innerWidth,Ym=nt.innerHeight},Oo=function(e){it.cache++,(e===!0||!ln&&!Xm&&!bt.fullscreenElement&&!bt.webkitFullscreenElement&&(!tf||qm!==nt.innerWidth||Math.abs(nt.innerHeight-Ym)>nt.innerHeight*.25))&&Nl.restart(!0)},ls={},yE=[],t_=function r(){return Jt(qe,"scrollEnd",r)||$r(!0)},cs=function(e){return ls[e]&&ls[e].map(function(t){return t()})||yE},zn=[],n_=function(e){for(var t=0;t<zn.length;t+=5)(!e||zn[t+4]&&zn[t+4].query===e)&&(zn[t].style.cssText=zn[t+1],zn[t].getBBox&&zn[t].setAttribute("transform",zn[t+2]||""),zn[t+3].uncache=1)},Yf=function(e,t){var n;for(yn=0;yn<Qe.length;yn++)n=Qe[yn],n&&(!t||n._ctx===t)&&(e?n.kill(1):n.revert(!0,!0));Fl=!0,t&&n_(t),t||cs("revert")},i_=function(e,t){it.cache++,(t||!Mn)&&it.forEach(function(n){return hn(n)&&n.cacheID++&&(n.rec=0)}),kn(e)&&(nt.history.scrollRestoration=kf=e)},Mn,is=0,Cd,ME=function(){if(Cd!==is){var e=Cd=is;requestAnimationFrame(function(){return e===is&&$r(!0)})}},r_=function(){mt.appendChild(Ks),Hf=!Sn&&Ks.offsetHeight||nt.innerHeight,mt.removeChild(Ks)},Rd=function(e){return ha(".gsap-marker-start, .gsap-marker-end, .gsap-marker-scroller-start, .gsap-marker-scroller-end").forEach(function(t){return t.style.display=e?"none":"block"})},$r=function(e,t){if(Vn=bt.documentElement,mt=bt.body,zf=[nt,bt,Vn,mt],si&&!e&&!Fl){Qt(qe,"scrollEnd",t_);return}r_(),Mn=qe.isRefreshing=!0,it.forEach(function(i){return hn(i)&&++i.cacheID&&(i.rec=i())});var n=cs("refreshInit");Wm&&qe.sort(),t||Yf(),it.forEach(function(i){hn(i)&&(i.smooth&&(i.target.style.scrollBehavior="auto"),i(0))}),Qe.slice(0).forEach(function(i){return i.refresh()}),Fl=!1,Qe.forEach(function(i){if(i._subPinOffset&&i.pin){var s=i.vars.horizontal?"offsetWidth":"offsetHeight",o=i.pin[s];i.revert(!0,1),i.adjustPinSpacing(i.pin[s]-o),i.refresh()}}),rf=1,Rd(!0),Qe.forEach(function(i){var s=Ai(i.scroller,i._dir),o=i.vars.end==="max"||i._endClamp&&i.end>s,a=i._startClamp&&i.start>=s;(o||a)&&i.setPositions(a?s-1:i.start,o?Math.max(a?s:i.start+1,s):i.end,!0)}),Rd(!1),rf=0,n.forEach(function(i){return i&&i.render&&i.render(-1)}),it.forEach(function(i){hn(i)&&(i.smooth&&requestAnimationFrame(function(){return i.target.style.scrollBehavior="smooth"}),i.rec&&i(i.rec))}),i_(kf,1),Nl.pause(),is++,Mn=2,qi(2),Qe.forEach(function(i){return hn(i.vars.onRefresh)&&i.vars.onRefresh(i)}),Mn=qe.isRefreshing=!1,cs("refresh")},of=0,xl=1,ea,qi=function(e){if(e===2||!Mn&&!Fl){qe.isUpdating=!0,ea&&ea.update(0);var t=Qe.length,n=un(),i=n-Nc>=50,s=t&&Qe[0].scroll();if(xl=of>s?-1:1,Mn||(of=s),i&&(si&&!Xl&&n-si>200&&(si=0,cs("scrollEnd")),Uo=Nc,Nc=n),xl<0){for(yn=t;yn-- >0;)Qe[yn]&&Qe[yn].update(0,i);xl=1}else for(yn=0;yn<t;yn++)Qe[yn]&&Qe[yn].update(0,i);qe.isUpdating=!1}da=0},af=[Jm,Qm,Gf,Vf,ni+Qo,ni+Zo,ni+Jo,ni+jo,"display","flexShrink","float","zIndex","gridColumnStart","gridColumnEnd","gridRowStart","gridRowEnd","gridArea","justifySelf","alignSelf","placeSelf","order"],Sl=af.concat([ts,ns,"boxSizing","max"+po,"max"+Wf,"position",ni,kt,kt+Jo,kt+Zo,kt+Qo,kt+jo]),EE=function(e,t,n){Zs(n);var i=e._gsap;if(i.spacerIsNative)Zs(i.spacerState);else if(e._gsap.swappedIn){var s=t.parentNode;s&&(s.insertBefore(e,t),s.removeChild(t))}e._gsap.swappedIn=!1},Bc=function(e,t,n,i){if(!e._gsap.swappedIn){for(var s=af.length,o=t.style,a=e.style,l;s--;)l=af[s],o[l]=n[l];o.position=n.position==="absolute"?"absolute":"relative",n.display==="inline"&&(o.display="inline-block"),a[Gf]=a[Vf]="auto",o.flexBasis=n.flexBasis||"auto",o.overflow="visible",o.boxSizing="border-box",o[ts]=Ol(e,bn)+qt,o[ns]=Ol(e,$t)+qt,o[kt]=a[ni]=a[Qm]=a[Jm]="0",Zs(i),a[ts]=a["max"+po]=n[ts],a[ns]=a["max"+Wf]=n[ns],a[kt]=n[kt],e.parentNode!==t&&(e.parentNode.insertBefore(t,e),t.appendChild(e)),e._gsap.swappedIn=!0}},bE=/([A-Z])/g,Zs=function(e){if(e){var t=e.t.style,n=e.length,i=0,s,o;for((e.t._gsap||Ae.core.getCache(e.t)).uncache=1;i<n;i+=2)o=e[i+1],s=e[i],o?t[s]=o:t[s]&&t.removeProperty(s.replace(bE,"-$1").toLowerCase())}},tl=function(e){for(var t=Sl.length,n=e.style,i=[],s=0;s<t;s++)i.push(Sl[s],n[Sl[s]]);return i.t=e,i},TE=function(e,t,n){for(var i=[],s=e.length,o=n?8:0,a;o<s;o+=2)a=e[o],i.push(a,a in t?t[a]:e[o+1]);return i.t=e.t,i},yl={left:0,top:0},Pd=function(e,t,n,i,s,o,a,l,c,u,h,f,d,g){hn(e)&&(e=e(l)),kn(e)&&e.substr(0,3)==="max"&&(e=f+(e.charAt(4)==="="?gl("0"+e.substr(3),n):0));var _=d?d.time():0,m,p,M;if(d&&d.seek(0),isNaN(e)||(e=+e),Fo(e))d&&(e=Ae.utils.mapRange(d.scrollTrigger.start,d.scrollTrigger.end,0,f,e)),a&&vl(a,n,i,!0);else{hn(t)&&(t=t(l));var y=(e||"0").split(" "),v,A,C,w;M=An(t,l)||mt,v=Hi(M)||{},(!v||!v.left&&!v.top)&&ii(M).display==="none"&&(w=M.style.display,M.style.display="block",v=Hi(M),w?M.style.display=w:M.style.removeProperty("display")),A=gl(y[0],v[i.d]),C=gl(y[1]||"0",n),e=v[i.p]-c[i.p]-u+A+s-C,a&&vl(a,C,i,n-C<20||a._isStart&&C>20),n-=n-C}if(g&&(l[g]=e||-.001,e<0&&(e=0)),o){var E=e+n,x=o._isStart;m="scroll"+i.d2,vl(o,E,i,x&&E>20||!x&&(h?Math.max(mt[m],Vn[m]):o.parentNode[m])<=E+1),h&&(c=Hi(a),h&&(o.style[i.op.p]=c[i.op.p]-i.op.m-o._offset+qt))}return d&&M&&(m=Hi(M),d.seek(f),p=Hi(M),d._caScrollDist=m[i.p]-p[i.p],e=e/d._caScrollDist*f),d&&d.seek(_),d?e:Math.round(e)},wE=/(webkit|moz|length|cssText|inset)/i,Dd=function(e,t,n,i){if(e.parentNode!==t){var s=e.style,o,a;if(t===mt){e._stOrig=s.cssText,a=ii(e);for(o in a)!+o&&!wE.test(o)&&a[o]&&typeof s[o]=="string"&&o!=="0"&&(s[o]=a[o]);s.top=n,s.left=i}else s.cssText=e._stOrig;Ae.core.getCache(e).uncache=1,t.appendChild(e)}},s_=function(e,t,n){var i=t,s=i;return function(o){var a=Math.round(e());return a!==i&&a!==s&&Math.abs(a-i)>3&&Math.abs(a-s)>3&&(o=a,n&&n()),s=i,i=Math.round(o),i}},nl=function(e,t,n){var i={};i[t.p]="+="+n,Ae.set(e,i)},Ld=function(e,t){var n=Tr(e,t),i="_scroll"+t.p2,s=function o(a,l,c,u,h){var f=o.tween,d=l.onComplete,g={};c=c||n();var _=s_(n,c,function(){f.kill(),o.tween=0});return h=u&&h||0,u=u||a-c,f&&f.kill(),l[i]=a,l.inherit=!1,l.modifiers=g,g[i]=function(){return _(c+u*f.ratio+h*f.ratio*f.ratio)},l.onUpdate=function(){it.cache++,o.tween&&qi()},l.onComplete=function(){o.tween=0,d&&d.call(f)},f=o.tween=Ae.to(e,l),f};return e[i]=n,n.wheelHandler=function(){return s.tween&&s.tween.kill()&&(s.tween=0)},Qt(e,"wheel",n.wheelHandler),qe.isTouch&&Qt(e,"touchmove",n.wheelHandler),s},qe=function(){function r(t,n){Is||r.register(Ae)||console.warn("Please gsap.registerPlugin(ScrollTrigger)"),nf(this),this.init(t,n)}var e=r.prototype;return e.init=function(n,i){if(this.progress=this.start=0,this.vars&&this.kill(!0,!0),!Io){this.update=this.refresh=this.kill=Si;return}n=Td(kn(n)||Fo(n)||n.nodeType?{trigger:n}:n,Qa);var s=n,o=s.onUpdate,a=s.toggleClass,l=s.id,c=s.onToggle,u=s.onRefresh,h=s.scrub,f=s.trigger,d=s.pin,g=s.pinSpacing,_=s.invalidateOnRefresh,m=s.anticipatePin,p=s.onScrubComplete,M=s.onSnapComplete,y=s.once,v=s.snap,A=s.pinReparent,C=s.pinSpacer,w=s.containerAnimation,E=s.fastScrollEnd,x=s.preventOverlaps,S=n.horizontal||n.containerAnimation&&n.horizontal!==!1?bn:$t,P=!h&&h!==0,I=An(n.scroller||nt),O=Ae.core.getCache(I),q=as(I),W=("pinType"in n?n.pinType:xr(I,"pinType")||q&&"fixed")==="fixed",V=[n.onEnter,n.onLeave,n.onEnterBack,n.onLeaveBack],X=P&&n.toggleActions.split(" "),z="markers"in n?n.markers:Qa.markers,re=q?0:parseFloat(ii(I)["border"+S.p2+po])||0,D=this,ae=n.onRefreshInit&&function(){return n.onRefreshInit(D)},Le=_E(I,q,S),ke=gE(I,q),$=0,ne=0,pe=0,se=Tr(I,S),we,Be,ye,rt,et,Ee,L,xt,Ve,B,Te,st,Ce,R,b,k,ee,Q,j,he,ce,me,Ye,oe,le,Fe,Ne,Se,$e,He,lt,U,fe,K,J,ue,de,Ge,ct;if(D._startClamp=D._endClamp=!1,D._dir=S,m*=45,D.scroller=I,D.scroll=w?w.time.bind(w):se,rt=se(),D.vars=n,i=i||n.animation,"refreshPriority"in n&&(Wm=1,n.refreshPriority===-9999&&(ea=D)),O.tweenScroll=O.tweenScroll||{top:Ld(I,$t),left:Ld(I,bn)},D.tweenTo=we=O.tweenScroll[S.p],D.scrubDuration=function(_e){fe=Fo(_e)&&_e,fe?U?U.duration(_e):U=Ae.to(i,{ease:"expo",totalProgress:"+=0",inherit:!1,duration:fe,paused:!0,onComplete:function(){return p&&p(D)}}):(U&&U.progress(1).kill(),U=0)},i&&(i.vars.lazy=!1,i._initted&&!D.isReverted||i.vars.immediateRender!==!1&&n.immediateRender!==!1&&i.duration()&&i.render(0,!0,!0),D.animation=i.pause(),i.scrollTrigger=D,D.scrubDuration(h),He=0,l||(l=i.vars.id)),v&&((!Vr(v)||v.push)&&(v={snapTo:v}),"scrollBehavior"in mt.style&&Ae.set(q?[mt,Vn]:I,{scrollBehavior:"auto"}),it.forEach(function(_e){return hn(_e)&&_e.target===(q?bt.scrollingElement||Vn:I)&&(_e.smooth=!1)}),ye=hn(v.snapTo)?v.snapTo:v.snapTo==="labels"?xE(i):v.snapTo==="labelsDirectional"?SE(i):v.directional!==!1?function(_e,Xe){return Xf(v.snapTo)(_e,un()-ne<500?0:Xe.direction)}:Ae.utils.snap(v.snapTo),K=v.duration||{min:.1,max:2},K=Vr(K)?Ko(K.min,K.max):Ko(K,K),J=Ae.delayedCall(v.delay||fe/2||.1,function(){var _e=se(),Xe=un()-ne<500,Pe=we.tween;if((Xe||Math.abs(D.getVelocity())<10)&&!Pe&&!Xl&&$!==_e){var We=(_e-Ee)/R,It=i&&!P?i.totalProgress():We,tt=Xe?0:(It-lt)/(un()-Uo)*1e3||0,Et=Ae.utils.clamp(-We,1-We,Rs(tt/2)*tt/.185),Wt=We+(v.inertia===!1?0:Et),St,yt,ht=v,Nn=ht.onStart,wt=ht.onInterrupt,mn=ht.onComplete;if(St=ye(Wt,D),Fo(St)||(St=Wt),yt=Math.max(0,Math.round(Ee+St*R)),_e<=L&&_e>=Ee&&yt!==_e){if(Pe&&!Pe._initted&&Pe.data<=Rs(yt-_e))return;v.inertia===!1&&(Et=St-We),we(yt,{duration:K(Rs(Math.max(Rs(Wt-It),Rs(St-It))*.185/tt/.05||0)),ease:v.ease||"power3",data:Rs(yt-_e),onInterrupt:function(){return J.restart(!0)&&wt&&wt(D)},onComplete:function(){D.update(),$=se(),i&&!P&&(U?U.resetTo("totalProgress",St,i._tTime/i._tDur):i.progress(St)),He=lt=i&&!P?i.totalProgress():D.progress,M&&M(D),mn&&mn(D)}},_e,Et*R,yt-_e-Et*R),Nn&&Nn(D,we.tween)}}else D.isActive&&$!==_e&&J.restart(!0)}).pause()),l&&(sf[l]=D),f=D.trigger=An(f||d!==!0&&d),ct=f&&f._gsap&&f._gsap.stRevert,ct&&(ct=ct(D)),d=d===!0?f:An(d),kn(a)&&(a={targets:f,className:a}),d&&(g===!1||g===ni||(g=!g&&d.parentNode&&d.parentNode.style&&ii(d.parentNode).display==="flex"?!1:kt),D.pin=d,Be=Ae.core.getCache(d),Be.spacer?b=Be.pinState:(C&&(C=An(C),C&&!C.nodeType&&(C=C.current||C.nativeElement),Be.spacerIsNative=!!C,C&&(Be.spacerState=tl(C))),Be.spacer=Q=C||bt.createElement("div"),Q.classList.add("pin-spacer"),l&&Q.classList.add("pin-spacer-"+l),Be.pinState=b=tl(d)),n.force3D!==!1&&Ae.set(d,{force3D:!0}),D.spacer=Q=Be.spacer,$e=ii(d),oe=$e[g+S.os2],he=Ae.getProperty(d),ce=Ae.quickSetter(d,S.a,qt),Bc(d,Q,$e),ee=tl(d)),z){st=Vr(z)?Td(z,wd):wd,B=el("scroller-start",l,I,S,st,0),Te=el("scroller-end",l,I,S,st,0,B),j=B["offset"+S.op.d2];var Dt=An(xr(I,"content")||I);xt=this.markerStart=el("start",l,Dt,S,st,j,0,w),Ve=this.markerEnd=el("end",l,Dt,S,st,j,0,w),w&&(Ge=Ae.quickSetter([xt,Ve],S.a,qt)),!W&&!(Di.length&&xr(I,"fixedMarkers")===!0)&&(vE(q?mt:I),Ae.set([B,Te],{force3D:!0}),Fe=Ae.quickSetter(B,S.a,qt),Se=Ae.quickSetter(Te,S.a,qt))}if(w){var xe=w.vars.onUpdate,Re=w.vars.onUpdateParams;w.eventCallback("onUpdate",function(){D.update(0,0,1),xe&&xe.apply(w,Re||[])})}if(D.previous=function(){return Qe[Qe.indexOf(D)-1]},D.next=function(){return Qe[Qe.indexOf(D)+1]},D.revert=function(_e,Xe){if(!Xe)return D.kill(!0);var Pe=_e!==!1||!D.enabled,We=ln;Pe!==D.isReverted&&(Pe&&(ue=Math.max(se(),D.scroll.rec||0),pe=D.progress,de=i&&i.progress()),xt&&[xt,Ve,B,Te].forEach(function(It){return It.style.display=Pe?"none":"block"}),Pe&&(ln=D,D.update(Pe)),d&&(!A||!D.isActive)&&(Pe?EE(d,Q,b):Bc(d,Q,ii(d),le)),Pe||D.update(Pe),ln=We,D.isReverted=Pe)},D.refresh=function(_e,Xe,Pe,We){if(!((ln||!D.enabled)&&!Xe)){if(d&&_e&&si){Qt(r,"scrollEnd",t_);return}!Mn&&ae&&ae(D),ln=D,we.tween&&!Pe&&(we.tween.kill(),we.tween=0),U&&U.pause(),_&&i&&i.revert({kill:!1}).invalidate(),D.isReverted||D.revert(!0,!0),D._subPinOffset=!1;var It=Le(),tt=ke(),Et=w?w.duration():Ai(I,S),Wt=R<=.01,St=0,yt=We||0,ht=Vr(Pe)?Pe.end:n.end,Nn=n.endTrigger||f,wt=Vr(Pe)?Pe.start:n.start||(n.start===0||!f?0:d?"0 0":"0 100%"),mn=D.pinnedContainer=n.pinnedContainer&&An(n.pinnedContainer,D),Zn=f&&Math.max(0,Qe.indexOf(D))||0,Xt=Zn,Yt,T,F,G,H,N,ie,ge,be,Me,Ue,ze,De;for(z&&Vr(Pe)&&(ze=Ae.getProperty(B,S.p),De=Ae.getProperty(Te,S.p));Xt-- >0;)N=Qe[Xt],N.end||N.refresh(0,1)||(ln=D),ie=N.pin,ie&&(ie===f||ie===d||ie===mn)&&!N.isReverted&&(Me||(Me=[]),Me.unshift(N),N.revert(!0,!0)),N!==Qe[Xt]&&(Zn--,Xt--);for(hn(wt)&&(wt=wt(D)),wt=yd(wt,"start",D),Ee=Pd(wt,f,It,S,se(),xt,B,D,tt,re,W,Et,w,D._startClamp&&"_startClamp")||(d?-.001:0),hn(ht)&&(ht=ht(D)),kn(ht)&&!ht.indexOf("+=")&&(~ht.indexOf(" ")?ht=(kn(wt)?wt.split(" ")[0]:"")+ht:(St=gl(ht.substr(2),It),ht=kn(wt)?wt:(w?Ae.utils.mapRange(0,w.duration(),w.scrollTrigger.start,w.scrollTrigger.end,Ee):Ee)+St,Nn=f)),ht=yd(ht,"end",D),L=Math.max(Ee,Pd(ht||(Nn?"100% 0":Et),Nn,It,S,se()+St,Ve,Te,D,tt,re,W,Et,w,D._endClamp&&"_endClamp"))||-.001,St=0,Xt=Zn;Xt--;)N=Qe[Xt],ie=N.pin,ie&&N.start-N._pinPush<=Ee&&!w&&N.end>0&&(Yt=N.end-(D._startClamp?Math.max(0,N.start):N.start),(ie===f&&N.start-N._pinPush<Ee||ie===mn)&&isNaN(wt)&&(St+=Yt*(1-N.progress)),ie===d&&(yt+=Yt));if(Ee+=St,L+=St,D._startClamp&&(D._startClamp+=St),D._endClamp&&!Mn&&(D._endClamp=L||-.001,L=Math.min(L,Ai(I,S))),R=L-Ee||(Ee-=.01)&&.001,Wt&&(pe=Ae.utils.clamp(0,1,Ae.utils.normalize(Ee,L,ue))),D._pinPush=yt,xt&&St&&(Yt={},Yt[S.a]="+="+St,mn&&(Yt[S.p]="-="+se()),Ae.set([xt,Ve],Yt)),d&&!(rf&&D.end>=Ai(I,S)))Yt=ii(d),G=S===$t,F=se(),me=parseFloat(he(S.a))+yt,!Et&&L>1&&(Ue=(q?bt.scrollingElement||Vn:I).style,Ue={style:Ue,value:Ue["overflow"+S.a.toUpperCase()]},q&&ii(mt)["overflow"+S.a.toUpperCase()]!=="scroll"&&(Ue.style["overflow"+S.a.toUpperCase()]="scroll")),Bc(d,Q,Yt),ee=tl(d),T=Hi(d,!0),ge=W&&Tr(I,G?bn:$t)(),g?(le=[g+S.os2,R+yt+qt],le.t=Q,Xt=g===kt?Ol(d,S)+R+yt:0,Xt&&(le.push(S.d,Xt+qt),Q.style.flexBasis!=="auto"&&(Q.style.flexBasis=Xt+qt)),Zs(le),mn&&Qe.forEach(function(Je){Je.pin===mn&&Je.vars.pinSpacing!==!1&&(Je._subPinOffset=!0)}),W&&se(ue)):(Xt=Ol(d,S),Xt&&Q.style.flexBasis!=="auto"&&(Q.style.flexBasis=Xt+qt)),W&&(H={top:T.top+(G?F-Ee:ge)+qt,left:T.left+(G?ge:F-Ee)+qt,boxSizing:"border-box",position:"fixed"},H[ts]=H["max"+po]=Math.ceil(T.width)+qt,H[ns]=H["max"+Wf]=Math.ceil(T.height)+qt,H[ni]=H[ni+Jo]=H[ni+Zo]=H[ni+Qo]=H[ni+jo]="0",H[kt]=Yt[kt],H[kt+Jo]=Yt[kt+Jo],H[kt+Zo]=Yt[kt+Zo],H[kt+Qo]=Yt[kt+Qo],H[kt+jo]=Yt[kt+jo],k=TE(b,H,A),Mn&&se(0)),i?(be=i._initted,Uc(1),i.render(i.duration(),!0,!0),Ye=he(S.a)-me+R+yt,Ne=Math.abs(R-Ye)>1,W&&Ne&&k.splice(k.length-2,2),i.render(0,!0,!0),be||i.invalidate(!0),i.parent||i.totalTime(i.totalTime()),Uc(0)):Ye=R,Ue&&(Ue.value?Ue.style["overflow"+S.a.toUpperCase()]=Ue.value:Ue.style.removeProperty("overflow-"+S.a));else if(f&&se()&&!w)for(T=f.parentNode;T&&T!==mt;)T._pinOffset&&(Ee-=T._pinOffset,L-=T._pinOffset),T=T.parentNode;Me&&Me.forEach(function(Je){return Je.revert(!1,!0)}),D.start=Ee,D.end=L,rt=et=Mn?ue:se(),!w&&!Mn&&(rt<ue&&se(ue),D.scroll.rec=0),D.revert(!1,!0),ne=un(),J&&($=-1,J.restart(!0)),ln=0,i&&P&&(i._initted||de)&&i.progress()!==de&&i.progress(de||0,!0).render(i.time(),!0,!0),(Wt||pe!==D.progress||w||_||i&&!i._initted)&&(i&&!P&&i.totalProgress(w&&Ee<-.001&&!pe?Ae.utils.normalize(Ee,L,0):pe,!0),D.progress=Wt||(rt-Ee)/R===pe?0:pe),d&&g&&(Q._pinOffset=Math.round(D.progress*Ye)),U&&U.invalidate(),isNaN(ze)||(ze-=Ae.getProperty(B,S.p),De-=Ae.getProperty(Te,S.p),nl(B,S,ze),nl(xt,S,ze-(We||0)),nl(Te,S,De),nl(Ve,S,De-(We||0))),Wt&&!Mn&&D.update(),u&&!Mn&&!Ce&&(Ce=!0,u(D),Ce=!1)}},D.getVelocity=function(){return(se()-et)/(un()-Uo)*1e3||0},D.endAnimation=function(){Ao(D.callbackAnimation),i&&(U?U.progress(1):i.paused()?P||Ao(i,D.direction<0,1):Ao(i,i.reversed()))},D.labelToScroll=function(_e){return i&&i.labels&&(Ee||D.refresh()||Ee)+i.labels[_e]/i.duration()*R||0},D.getTrailing=function(_e){var Xe=Qe.indexOf(D),Pe=D.direction>0?Qe.slice(0,Xe).reverse():Qe.slice(Xe+1);return(kn(_e)?Pe.filter(function(We){return We.vars.preventOverlaps===_e}):Pe).filter(function(We){return D.direction>0?We.end<=Ee:We.start>=L})},D.update=function(_e,Xe,Pe){if(!(w&&!Pe&&!_e)){var We=Mn===!0?ue:D.scroll(),It=_e?0:(We-Ee)/R,tt=It<0?0:It>1?1:It||0,Et=D.progress,Wt,St,yt,ht,Nn,wt,mn,Zn;if(Xe&&(et=rt,rt=w?se():We,v&&(lt=He,He=i&&!P?i.totalProgress():tt)),m&&d&&!ln&&!Ka&&si&&(!tt&&Ee<We+(We-et)/(un()-Uo)*m?tt=1e-4:tt===1&&L>We+(We-et)/(un()-Uo)*m&&(tt=.9999)),tt!==Et&&D.enabled){if(Wt=D.isActive=!!tt&&tt<1,St=!!Et&&Et<1,wt=Wt!==St,Nn=wt||!!tt!=!!Et,D.direction=tt>Et?1:-1,D.progress=tt,Nn&&!ln&&(yt=tt&&!Et?0:tt===1?1:Et===1?2:3,P&&(ht=!wt&&X[yt+1]!=="none"&&X[yt+1]||X[yt],Zn=i&&(ht==="complete"||ht==="reset"||ht in i))),x&&(wt||Zn)&&(Zn||h||!i)&&(hn(x)?x(D):D.getTrailing(x).forEach(function(F){return F.endAnimation()})),P||(U&&!ln&&!Ka?(U._dp._time-U._start!==U._time&&U.render(U._dp._time-U._start),U.resetTo?U.resetTo("totalProgress",tt,i._tTime/i._tDur):(U.vars.totalProgress=tt,U.invalidate().restart())):i&&i.totalProgress(tt,!!(ln&&(ne||_e)))),d){if(_e&&g&&(Q.style[g+S.os2]=oe),!W)ce(No(me+Ye*tt));else if(Nn){if(mn=!_e&&tt>Et&&L+1>We&&We+1>=Ai(I,S),A)if(!_e&&(Wt||mn)){var Xt=Hi(d,!0),Yt=We-Ee;Dd(d,mt,Xt.top+(S===$t?Yt:0)+qt,Xt.left+(S===$t?0:Yt)+qt)}else Dd(d,Q);Zs(Wt||mn?k:ee),Ne&&tt<1&&Wt||ce(me+(tt===1&&!mn?Ye:0))}}v&&!we.tween&&!ln&&!Ka&&J.restart(!0),a&&(wt||y&&tt&&(tt<1||!Ic))&&ha(a.targets).forEach(function(F){return F.classList[Wt||y?"add":"remove"](a.className)}),o&&!P&&!_e&&o(D),Nn&&!ln?(P&&(Zn&&(ht==="complete"?i.pause().totalProgress(1):ht==="reset"?i.restart(!0).pause():ht==="restart"?i.restart(!0):i[ht]()),o&&o(D)),(wt||!Ic)&&(c&&wt&&Fc(D,c),V[yt]&&Fc(D,V[yt]),y&&(tt===1?D.kill(!1,1):V[yt]=0),wt||(yt=tt===1?1:3,V[yt]&&Fc(D,V[yt]))),E&&!Wt&&Math.abs(D.getVelocity())>(Fo(E)?E:2500)&&(Ao(D.callbackAnimation),U?U.progress(1):Ao(i,ht==="reverse"?1:!tt,1))):P&&o&&!ln&&o(D)}if(Se){var T=w?We/w.duration()*(w._caScrollDist||0):We;Fe(T+(B._isFlipped?1:0)),Se(T)}Ge&&Ge(-We/w.duration()*(w._caScrollDist||0))}},D.enable=function(_e,Xe){D.enabled||(D.enabled=!0,Qt(I,"resize",Oo),q||Qt(I,"scroll",Ps),ae&&Qt(r,"refreshInit",ae),_e!==!1&&(D.progress=pe=0,rt=et=$=se()),Xe!==!1&&D.refresh())},D.getTween=function(_e){return _e&&we?we.tween:U},D.setPositions=function(_e,Xe,Pe,We){if(w){var It=w.scrollTrigger,tt=w.duration(),Et=It.end-It.start;_e=It.start+Et*_e/tt,Xe=It.start+Et*Xe/tt}D.refresh(!1,!1,{start:Md(_e,Pe&&!!D._startClamp),end:Md(Xe,Pe&&!!D._endClamp)},We),D.update()},D.adjustPinSpacing=function(_e){if(le&&_e){var Xe=le.indexOf(S.d)+1;le[Xe]=parseFloat(le[Xe])+_e+qt,le[1]=parseFloat(le[1])+_e+qt,Zs(le)}},D.disable=function(_e,Xe){if(D.enabled&&(_e!==!1&&D.revert(!0,!0),D.enabled=D.isActive=!1,Xe||U&&U.pause(),ue=0,Be&&(Be.uncache=1),ae&&Jt(r,"refreshInit",ae),J&&(J.pause(),we.tween&&we.tween.kill()&&(we.tween=0)),!q)){for(var Pe=Qe.length;Pe--;)if(Qe[Pe].scroller===I&&Qe[Pe]!==D)return;Jt(I,"resize",Oo),q||Jt(I,"scroll",Ps)}},D.kill=function(_e,Xe){D.disable(_e,Xe),U&&!Xe&&U.kill(),l&&delete sf[l];var Pe=Qe.indexOf(D);Pe>=0&&Qe.splice(Pe,1),Pe===yn&&xl>0&&yn--,Pe=0,Qe.forEach(function(We){return We.scroller===D.scroller&&(Pe=1)}),Pe||Mn||(D.scroll.rec=0),i&&(i.scrollTrigger=null,_e&&i.revert({kill:!1}),Xe||i.kill()),xt&&[xt,Ve,B,Te].forEach(function(We){return We.parentNode&&We.parentNode.removeChild(We)}),ea===D&&(ea=0),d&&(Be&&(Be.uncache=1),Pe=0,Qe.forEach(function(We){return We.pin===d&&Pe++}),Pe||(Be.spacer=0)),n.onKill&&n.onKill(D)},Qe.push(D),D.enable(!1,!1),ct&&ct(D),i&&i.add&&!R){var Ke=D.update;D.update=function(){D.update=Ke,it.cache++,Ee||L||D.refresh()},Ae.delayedCall(.01,D.update),R=.01,Ee=L=0}else D.refresh();d&&ME()},r.register=function(n){return Is||(Ae=n||Km(),$m()&&window.document&&r.enable(),Is=Io),Is},r.defaults=function(n){if(n)for(var i in n)Qa[i]=n[i];return Qa},r.disable=function(n,i){Io=0,Qe.forEach(function(o){return o[i?"kill":"disable"](n)}),Jt(nt,"wheel",Ps),Jt(bt,"scroll",Ps),clearInterval($a),Jt(bt,"touchcancel",Si),Jt(mt,"touchstart",Si),ja(Jt,bt,"pointerdown,touchstart,mousedown",Ed),ja(Jt,bt,"pointerup,touchend,mouseup",bd),Nl.kill(),Za(Jt);for(var s=0;s<it.length;s+=3)Ja(Jt,it[s],it[s+1]),Ja(Jt,it[s],it[s+2])},r.enable=function(){if(nt=window,bt=document,Vn=bt.documentElement,mt=bt.body,Ae&&(ha=Ae.utils.toArray,Ko=Ae.utils.clamp,nf=Ae.core.context||Si,Uc=Ae.core.suppressOverwrites||Si,kf=nt.history.scrollRestoration||"auto",of=nt.pageYOffset||0,Ae.core.globals("ScrollTrigger",r),mt)){Io=1,Ks=document.createElement("div"),Ks.style.height="100vh",Ks.style.position="absolute",r_(),mE(),Ot.register(Ae),r.isTouch=Ot.isTouch,ar=Ot.isTouch&&/(iPad|iPhone|iPod|Mac)/g.test(navigator.userAgent),tf=Ot.isTouch===1,Qt(nt,"wheel",Ps),zf=[nt,bt,Vn,mt],Ae.matchMedia?(r.matchMedia=function(c){var u=Ae.matchMedia(),h;for(h in c)u.add(h,c[h]);return u},Ae.addEventListener("matchMediaInit",function(){return Yf()}),Ae.addEventListener("matchMediaRevert",function(){return n_()}),Ae.addEventListener("matchMedia",function(){$r(0,1),cs("matchMedia")}),Ae.matchMedia().add("(orientation: portrait)",function(){return Oc(),Oc})):console.warn("Requires GSAP 3.11.0 or later"),Oc(),Qt(bt,"scroll",Ps);var n=mt.hasAttribute("style"),i=mt.style,s=i.borderTopStyle,o=Ae.core.Animation.prototype,a,l;for(o.revert||Object.defineProperty(o,"revert",{value:function(){return this.time(-.01,!0)}}),i.borderTopStyle="solid",a=Hi(mt),$t.m=Math.round(a.top+$t.sc())||0,bn.m=Math.round(a.left+bn.sc())||0,s?i.borderTopStyle=s:i.removeProperty("border-top-style"),n||(mt.setAttribute("style",""),mt.removeAttribute("style")),$a=setInterval(Ad,250),Ae.delayedCall(.5,function(){return Ka=0}),Qt(bt,"touchcancel",Si),Qt(mt,"touchstart",Si),ja(Qt,bt,"pointerdown,touchstart,mousedown",Ed),ja(Qt,bt,"pointerup,touchend,mouseup",bd),ef=Ae.utils.checkPrefix("transform"),Sl.push(ef),Is=un(),Nl=Ae.delayedCall(.2,$r).pause(),Ns=[bt,"visibilitychange",function(){var c=nt.innerWidth,u=nt.innerHeight;bt.hidden?(xd=c,Sd=u):(xd!==c||Sd!==u)&&Oo()},bt,"DOMContentLoaded",$r,nt,"load",$r,nt,"resize",Oo],Za(Qt),Qe.forEach(function(c){return c.enable(0,1)}),l=0;l<it.length;l+=3)Ja(Jt,it[l],it[l+1]),Ja(Jt,it[l],it[l+2])}},r.config=function(n){"limitCallbacks"in n&&(Ic=!!n.limitCallbacks);var i=n.syncInterval;i&&clearInterval($a)||($a=i)&&setInterval(Ad,i),"ignoreMobileResize"in n&&(tf=r.isTouch===1&&n.ignoreMobileResize),"autoRefreshEvents"in n&&(Za(Jt)||Za(Qt,n.autoRefreshEvents||"none"),Xm=(n.autoRefreshEvents+"").indexOf("resize")===-1)},r.scrollerProxy=function(n,i){var s=An(n),o=it.indexOf(s),a=as(s);~o&&it.splice(o,a?6:2),i&&(a?Di.unshift(nt,i,mt,i,Vn,i):Di.unshift(s,i))},r.clearMatchMedia=function(n){Qe.forEach(function(i){return i._ctx&&i._ctx.query===n&&i._ctx.kill(!0,!0)})},r.isInViewport=function(n,i,s){var o=(kn(n)?An(n):n).getBoundingClientRect(),a=o[s?ts:ns]*i||0;return s?o.right-a>0&&o.left+a<nt.innerWidth:o.bottom-a>0&&o.top+a<nt.innerHeight},r.positionInViewport=function(n,i,s){kn(n)&&(n=An(n));var o=n.getBoundingClientRect(),a=o[s?ts:ns],l=i==null?a/2:i in Bl?Bl[i]*a:~i.indexOf("%")?parseFloat(i)*a/100:parseFloat(i)||0;return s?(o.left+l)/nt.innerWidth:(o.top+l)/nt.innerHeight},r.killAll=function(n){if(Qe.slice(0).forEach(function(s){return s.vars.id!=="ScrollSmoother"&&s.kill()}),n!==!0){var i=ls.killAll||[];ls={},i.forEach(function(s){return s()})}},r}();qe.version="3.12.7";qe.saveStyles=function(r){return r?ha(r).forEach(function(e){if(e&&e.style){var t=zn.indexOf(e);t>=0&&zn.splice(t,5),zn.push(e,e.style.cssText,e.getBBox&&e.getAttribute("transform"),Ae.core.getCache(e),nf())}}):zn};qe.revert=function(r,e){return Yf(!r,e)};qe.create=function(r,e){return new qe(r,e)};qe.refresh=function(r){return r?Oo(!0):(Is||qe.register())&&$r(!0)};qe.update=function(r){return++it.cache&&qi(r===!0?2:0)};qe.clearScrollMemory=i_;qe.maxScroll=function(r,e){return Ai(r,e?bn:$t)};qe.getScrollFunc=function(r,e){return Tr(An(r),e?bn:$t)};qe.getById=function(r){return sf[r]};qe.getAll=function(){return Qe.filter(function(r){return r.vars.id!=="ScrollSmoother"})};qe.isScrolling=function(){return!!si};qe.snapDirectional=Xf;qe.addEventListener=function(r,e){var t=ls[r]||(ls[r]=[]);~t.indexOf(e)||t.push(e)};qe.removeEventListener=function(r,e){var t=ls[r],n=t&&t.indexOf(e);n>=0&&t.splice(n,1)};qe.batch=function(r,e){var t=[],n={},i=e.interval||.016,s=e.batchMax||1e9,o=function(c,u){var h=[],f=[],d=Ae.delayedCall(i,function(){u(h,f),h=[],f=[]}).pause();return function(g){h.length||d.restart(!0),h.push(g.trigger),f.push(g),s<=h.length&&d.progress(1)}},a;for(a in e)n[a]=a.substr(0,2)==="on"&&hn(e[a])&&a!=="onRefreshInit"?o(a,e[a]):e[a];return hn(s)&&(s=s(),Qt(qe,"refresh",function(){return s=e.batchMax()})),ha(r).forEach(function(l){var c={};for(a in n)c[a]=n[a];c.trigger=l,t.push(qe.create(c))}),t};var Ud=function(e,t,n,i){return t>i?e(i):t<0&&e(0),n>i?(i-t)/(n-t):n<0?t/(t-n):1},zc=function r(e,t){t===!0?e.style.removeProperty("touch-action"):e.style.touchAction=t===!0?"auto":t?"pan-"+t+(Ot.isTouch?" pinch-zoom":""):"none",e===Vn&&r(mt,t)},il={auto:1,scroll:1},AE=function(e){var t=e.event,n=e.target,i=e.axis,s=(t.changedTouches?t.changedTouches[0]:t).target,o=s._gsap||Ae.core.getCache(s),a=un(),l;if(!o._isScrollT||a-o._isScrollT>2e3){for(;s&&s!==mt&&(s.scrollHeight<=s.clientHeight&&s.scrollWidth<=s.clientWidth||!(il[(l=ii(s)).overflowY]||il[l.overflowX]));)s=s.parentNode;o._isScroll=s&&s!==n&&!as(s)&&(il[(l=ii(s)).overflowY]||il[l.overflowX]),o._isScrollT=a}(o._isScroll||i==="x")&&(t.stopPropagation(),t._gsapAllow=!0)},o_=function(e,t,n,i){return Ot.create({target:e,capture:!0,debounce:!1,lockAxis:!0,type:t,onWheel:i=i&&AE,onPress:i,onDrag:i,onScroll:i,onEnable:function(){return n&&Qt(bt,Ot.eventTypes[0],Nd,!1,!0)},onDisable:function(){return Jt(bt,Ot.eventTypes[0],Nd,!0)}})},CE=/(input|label|select|textarea)/i,Id,Nd=function(e){var t=CE.test(e.target.tagName);(t||Id)&&(e._gsapAllow=!0,Id=t)},RE=function(e){Vr(e)||(e={}),e.preventDefault=e.isNormalizer=e.allowClicks=!0,e.type||(e.type="wheel,touch"),e.debounce=!!e.debounce,e.id=e.id||"normalizer";var t=e,n=t.normalizeScrollX,i=t.momentum,s=t.allowNestedScroll,o=t.onRelease,a,l,c=An(e.target)||Vn,u=Ae.core.globals().ScrollSmoother,h=u&&u.get(),f=ar&&(e.content&&An(e.content)||h&&e.content!==!1&&!h.smooth()&&h.content()),d=Tr(c,$t),g=Tr(c,bn),_=1,m=(Ot.isTouch&&nt.visualViewport?nt.visualViewport.scale*nt.visualViewport.width:nt.outerWidth)/nt.innerWidth,p=0,M=hn(i)?function(){return i(a)}:function(){return i||2.8},y,v,A=o_(c,e.type,!0,s),C=function(){return v=!1},w=Si,E=Si,x=function(){l=Ai(c,$t),E=Ko(ar?1:0,l),n&&(w=Ko(0,Ai(c,bn))),y=is},S=function(){f._gsap.y=No(parseFloat(f._gsap.y)+d.offset)+"px",f.style.transform="matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, "+parseFloat(f._gsap.y)+", 0, 1)",d.offset=d.cacheID=0},P=function(){if(v){requestAnimationFrame(C);var z=No(a.deltaY/2),re=E(d.v-z);if(f&&re!==d.v+d.offset){d.offset=re-d.v;var D=No((parseFloat(f&&f._gsap.y)||0)-d.offset);f.style.transform="matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, "+D+", 0, 1)",f._gsap.y=D+"px",d.cacheID=it.cache,qi()}return!0}d.offset&&S(),v=!0},I,O,q,W,V=function(){x(),I.isActive()&&I.vars.scrollY>l&&(d()>l?I.progress(1)&&d(l):I.resetTo("scrollY",l))};return f&&Ae.set(f,{y:"+=0"}),e.ignoreCheck=function(X){return ar&&X.type==="touchmove"&&P()||_>1.05&&X.type!=="touchstart"||a.isGesturing||X.touches&&X.touches.length>1},e.onPress=function(){v=!1;var X=_;_=No((nt.visualViewport&&nt.visualViewport.scale||1)/m),I.pause(),X!==_&&zc(c,_>1.01?!0:n?!1:"x"),O=g(),q=d(),x(),y=is},e.onRelease=e.onGestureStart=function(X,z){if(d.offset&&S(),!z)W.restart(!0);else{it.cache++;var re=M(),D,ae;n&&(D=g(),ae=D+re*.05*-X.velocityX/.227,re*=Ud(g,D,ae,Ai(c,bn)),I.vars.scrollX=w(ae)),D=d(),ae=D+re*.05*-X.velocityY/.227,re*=Ud(d,D,ae,Ai(c,$t)),I.vars.scrollY=E(ae),I.invalidate().duration(re).play(.01),(ar&&I.vars.scrollY>=l||D>=l-1)&&Ae.to({},{onUpdate:V,duration:re})}o&&o(X)},e.onWheel=function(){I._ts&&I.pause(),un()-p>1e3&&(y=0,p=un())},e.onChange=function(X,z,re,D,ae){if(is!==y&&x(),z&&n&&g(w(D[2]===z?O+(X.startX-X.x):g()+z-D[1])),re){d.offset&&S();var Le=ae[2]===re,ke=Le?q+X.startY-X.y:d()+re-ae[1],$=E(ke);Le&&ke!==$&&(q+=$-ke),d($)}(re||z)&&qi()},e.onEnable=function(){zc(c,n?!1:"x"),qe.addEventListener("refresh",V),Qt(nt,"resize",V),d.smooth&&(d.target.style.scrollBehavior="auto",d.smooth=g.smooth=!1),A.enable()},e.onDisable=function(){zc(c,!0),Jt(nt,"resize",V),qe.removeEventListener("refresh",V),A.kill()},e.lockAxis=e.lockAxis!==!1,a=new Ot(e),a.iOS=ar,ar&&!d()&&d(1),ar&&Ae.ticker.add(Si),W=a._dc,I=Ae.to(a,{ease:"power4",paused:!0,inherit:!1,scrollX:n?"+=0.1":"+=0",scrollY:"+=0.1",modifiers:{scrollY:s_(d,d(),function(){return I.pause()})},onUpdate:qi,onComplete:W.vars.onComplete}),a};qe.sort=function(r){if(hn(r))return Qe.sort(r);var e=nt.pageYOffset||0;return qe.getAll().forEach(function(t){return t._sortY=t.trigger?e+t.trigger.getBoundingClientRect().top:t.start+nt.innerHeight}),Qe.sort(r||function(t,n){return(t.vars.refreshPriority||0)*-1e6+(t.vars.containerAnimation?1e6:t._sortY)-((n.vars.containerAnimation?1e6:n._sortY)+(n.vars.refreshPriority||0)*-1e6)})};qe.observe=function(r){return new Ot(r)};qe.normalizeScroll=function(r){if(typeof r>"u")return Sn;if(r===!0&&Sn)return Sn.enable();if(r===!1){Sn&&Sn.kill(),Sn=r;return}var e=r instanceof Ot?r:RE(r);return Sn&&Sn.target===e.target&&Sn.kill(),as(e.target)&&(Sn=e),e};qe.core={_getVelocityProp:Qu,_inputObserver:o_,_scrollers:it,_proxies:Di,bridge:{ss:function(){si||cs("scrollStart"),si=un()},ref:function(){return ln}}};Km()&&Ae.registerPlugin(qe);/*!
 * paths 3.12.7
 * https://gsap.com
 *
 * Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license or for
 * Club GSAP members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/var PE=/[achlmqstvz]|(-?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/ig,DE=/(?:(-)?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/ig,LE=/[\+\-]?\d*\.?\d+e[\+\-]?\d+/ig,UE=/(^[#\.][a-z]|[a-y][a-z])/i,IE=Math.PI/180,rl=Math.sin,sl=Math.cos,ta=Math.abs,Co=Math.sqrt,Fd=function(e){return typeof e=="string"},a_=function(e){return typeof e=="number"},Od=1e5,or=function(e){return Math.round(e*Od)/Od||0};function NE(r){r=Fd(r)&&UE.test(r)&&document.querySelector(r)||r;var e=r.getAttribute?r:0,t;return e&&(r=r.getAttribute("d"))?(e._gsPath||(e._gsPath={}),t=e._gsPath[r],t&&!t._dirty?t:e._gsPath[r]=Sr(r)):r?Fd(r)?Sr(r):a_(r[0])?[r]:r:console.warn("Expecting a <path> element or an SVG path data string")}function Bo(r){var e=0,t;for(r.reverse();e<r.length;e+=2)t=r[e],r[e]=r[e+1],r[e+1]=t;r.reversed=!r.reversed}var FE=function(e,t){var n=document.createElementNS("http://www.w3.org/2000/svg","path"),i=[].slice.call(e.attributes),s=i.length,o;for(t=","+t+",";--s>-1;)o=i[s].nodeName.toLowerCase(),t.indexOf(","+o+",")<0&&n.setAttributeNS(null,o,i[s].nodeValue);return n},OE={rect:"rx,ry,x,y,width,height",circle:"r,cx,cy",ellipse:"rx,ry,cx,cy",line:"x1,x2,y1,y2"},BE=function(e,t){for(var n=t?t.split(","):[],i={},s=n.length;--s>-1;)i[n[s]]=+e.getAttribute(n[s])||0;return i};function l_(r,e){var t=r.tagName.toLowerCase(),n=.552284749831,i,s,o,a,l,c,u,h,f,d,g,_,m,p,M,y,v,A,C,w,E,x;return t==="path"||!r.getBBox?r:(c=FE(r,"x,y,width,height,cx,cy,rx,ry,r,x1,x2,y1,y2,points"),x=BE(r,OE[t]),t==="rect"?(a=x.rx,l=x.ry||a,s=x.x,o=x.y,d=x.width-a*2,g=x.height-l*2,a||l?(_=s+a*(1-n),m=s+a,p=m+d,M=p+a*n,y=p+a,v=o+l*(1-n),A=o+l,C=A+g,w=C+l*n,E=C+l,i="M"+y+","+A+" V"+C+" C"+[y,w,M,E,p,E,p-(p-m)/3,E,m+(p-m)/3,E,m,E,_,E,s,w,s,C,s,C-(C-A)/3,s,A+(C-A)/3,s,A,s,v,_,o,m,o,m+(p-m)/3,o,p-(p-m)/3,o,p,o,M,o,y,v,y,A].join(",")+"z"):i="M"+(s+d)+","+o+" v"+g+" h"+-d+" v"+-g+" h"+d+"z"):t==="circle"||t==="ellipse"?(t==="circle"?(a=l=x.r,h=a*n):(a=x.rx,l=x.ry,h=l*n),s=x.cx,o=x.cy,u=a*n,i="M"+(s+a)+","+o+" C"+[s+a,o+h,s+u,o+l,s,o+l,s-u,o+l,s-a,o+h,s-a,o,s-a,o-h,s-u,o-l,s,o-l,s+u,o-l,s+a,o-h,s+a,o].join(",")+"z"):t==="line"?i="M"+x.x1+","+x.y1+" L"+x.x2+","+x.y2:(t==="polyline"||t==="polygon")&&(f=(r.getAttribute("points")+"").match(DE)||[],s=f.shift(),o=f.shift(),i="M"+s+","+o+" L"+f.join(","),t==="polygon"&&(i+=","+s+","+o+"z")),c.setAttribute("d",js(c._gsRawPath=Sr(i))),e&&r.parentNode&&(r.parentNode.insertBefore(c,r),r.parentNode.removeChild(r)),c)}function zE(r,e,t,n,i,s,o,a,l){if(!(r===a&&e===l)){t=ta(t),n=ta(n);var c=i%360*IE,u=sl(c),h=rl(c),f=Math.PI,d=f*2,g=(r-a)/2,_=(e-l)/2,m=u*g+h*_,p=-h*g+u*_,M=m*m,y=p*p,v=M/(t*t)+y/(n*n);v>1&&(t=Co(v)*t,n=Co(v)*n);var A=t*t,C=n*n,w=(A*C-A*y-C*M)/(A*y+C*M);w<0&&(w=0);var E=(s===o?-1:1)*Co(w),x=E*(t*p/n),S=E*-(n*m/t),P=(r+a)/2,I=(e+l)/2,O=P+(u*x-h*S),q=I+(h*x+u*S),W=(m-x)/t,V=(p-S)/n,X=(-m-x)/t,z=(-p-S)/n,re=W*W+V*V,D=(V<0?-1:1)*Math.acos(W/Co(re)),ae=(W*z-V*X<0?-1:1)*Math.acos((W*X+V*z)/Co(re*(X*X+z*z)));isNaN(ae)&&(ae=f),!o&&ae>0?ae-=d:o&&ae<0&&(ae+=d),D%=d,ae%=d;var Le=Math.ceil(ta(ae)/(d/4)),ke=[],$=ae/Le,ne=4/3*rl($/2)/(1+sl($/2)),pe=u*t,se=h*t,we=h*-n,Be=u*n,ye;for(ye=0;ye<Le;ye++)i=D+ye*$,m=sl(i),p=rl(i),W=sl(i+=$),V=rl(i),ke.push(m-ne*p,p+ne*m,W+ne*V,V-ne*W,W,V);for(ye=0;ye<ke.length;ye+=2)m=ke[ye],p=ke[ye+1],ke[ye]=m*pe+p*we+O,ke[ye+1]=m*se+p*Be+q;return ke[ye-2]=a,ke[ye-1]=l,ke}}function Sr(r){var e=(r+"").replace(LE,function(x){var S=+x;return S<1e-4&&S>-1e-4?0:S}).match(PE)||[],t=[],n=0,i=0,s=2/3,o=e.length,a=0,l="ERROR: malformed path: "+r,c,u,h,f,d,g,_,m,p,M,y,v,A,C,w,E=function(S,P,I,O){M=(I-S)/3,y=(O-P)/3,_.push(S+M,P+y,I-M,O-y,I,O)};if(!r||!isNaN(e[0])||isNaN(e[1]))return console.log(l),t;for(c=0;c<o;c++)if(A=d,isNaN(e[c])?(d=e[c].toUpperCase(),g=d!==e[c]):c--,h=+e[c+1],f=+e[c+2],g&&(h+=n,f+=i),c||(m=h,p=f),d==="M")_&&(_.length<8?t.length-=1:a+=_.length),n=m=h,i=p=f,_=[h,f],t.push(_),c+=2,d="L";else if(d==="C")_||(_=[0,0]),g||(n=i=0),_.push(h,f,n+e[c+3]*1,i+e[c+4]*1,n+=e[c+5]*1,i+=e[c+6]*1),c+=6;else if(d==="S")M=n,y=i,(A==="C"||A==="S")&&(M+=n-_[_.length-4],y+=i-_[_.length-3]),g||(n=i=0),_.push(M,y,h,f,n+=e[c+3]*1,i+=e[c+4]*1),c+=4;else if(d==="Q")M=n+(h-n)*s,y=i+(f-i)*s,g||(n=i=0),n+=e[c+3]*1,i+=e[c+4]*1,_.push(M,y,n+(h-n)*s,i+(f-i)*s,n,i),c+=4;else if(d==="T")M=n-_[_.length-4],y=i-_[_.length-3],_.push(n+M,i+y,h+(n+M*1.5-h)*s,f+(i+y*1.5-f)*s,n=h,i=f),c+=2;else if(d==="H")E(n,i,n=h,i),c+=1;else if(d==="V")E(n,i,n,i=h+(g?i-n:0)),c+=1;else if(d==="L"||d==="Z")d==="Z"&&(h=m,f=p,_.closed=!0),(d==="L"||ta(n-h)>.5||ta(i-f)>.5)&&(E(n,i,h,f),d==="L"&&(c+=2)),n=h,i=f;else if(d==="A"){if(C=e[c+4],w=e[c+5],M=e[c+6],y=e[c+7],u=7,C.length>1&&(C.length<3?(y=M,M=w,u--):(y=w,M=C.substr(2),u-=2),w=C.charAt(1),C=C.charAt(0)),v=zE(n,i,+e[c+1],+e[c+2],+e[c+3],+C,+w,(g?n:0)+M*1,(g?i:0)+y*1),c+=u,v)for(u=0;u<v.length;u++)_.push(v[u]);n=_[_.length-2],i=_[_.length-1]}else console.log(l);return c=_.length,c<6?(t.pop(),c=0):_[0]===_[c-2]&&_[1]===_[c-1]&&(_.closed=!0),t.totalPoints=a+c,t}function js(r){a_(r[0])&&(r=[r]);var e="",t=r.length,n,i,s,o;for(i=0;i<t;i++){for(o=r[i],e+="M"+or(o[0])+","+or(o[1])+" C",n=o.length,s=2;s<n;s++)e+=or(o[s++])+","+or(o[s++])+" "+or(o[s++])+","+or(o[s++])+" "+or(o[s++])+","+or(o[s])+" ";o.closed&&(e+="z")}return e}/*!
 * MorphSVGPlugin 3.12.7
 * https://gsap.com
 *
 * @license Copyright 2008-2025, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license or for
 * Club GSAP members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/var di,qf,zo,c_,ko,u_=function(){return di||typeof window<"u"&&(di=window.gsap)&&di.registerPlugin&&di},kc=function(e){return typeof e=="function"},Kr=Math.atan2,Bd=Math.cos,zd=Math.sin,Xi=Math.sqrt,Yl=Math.PI,kd=Yl*2,kE=Yl*.3,HE=Yl*.7,f_=1e20,pa=/[-+=\.]*\d+[\.e\-\+]*\d*[e\-\+]*\d*/gi,VE=/(^[#\.][a-z]|[a-y][a-z])/i,GE=/[achlmqstvz]/i,pr=function(e){return console&&console.warn(e)},WE=1,Hd=function(e){var t=e.length,n=0,i=0,s;for(s=0;s<t;s++)n+=e[s++],i+=e[s];return[n/(t/2),i/(t/2)]},Js=function(e){var t=e.length,n=e[0],i=n,s=e[1],o=s,a,l,c;for(c=6;c<t;c+=6)a=e[c],l=e[c+1],a>n?n=a:a<i&&(i=a),l>s?s=l:l<o&&(o=l);return e.centerX=(n+i)/2,e.centerY=(s+o)/2,e.size=(n-i)*(s-o)},na=function(e,t){t===void 0&&(t=3);for(var n=e.length,i=e[0][0],s=i,o=e[0][1],a=o,l=1/t,c,u,h,f,d,g,_,m,p,M,y,v,A,C,w,E;--n>-1;)for(d=e[n],c=d.length,f=6;f<c;f+=6)for(p=d[f],M=d[f+1],y=d[f+2]-p,C=d[f+3]-M,v=d[f+4]-p,w=d[f+5]-M,A=d[f+6]-p,E=d[f+7]-M,g=t;--g>-1;)_=l*g,m=1-_,u=(_*_*A+3*m*(_*v+m*y))*_+p,h=(_*_*E+3*m*(_*w+m*C))*_+M,u>i?i=u:u<s&&(s=u),h>o?o=h:h<a&&(a=h);return e.centerX=(i+s)/2,e.centerY=(o+a)/2,e.left=s,e.width=i-s,e.top=a,e.height=o-a,e.size=(i-s)*(o-a)},XE=function(e,t){return t.length-e.length},Vd=function(e,t){var n=e.size||Js(e),i=t.size||Js(t);return Math.abs(i-n)<(n+i)/20?t.centerX-e.centerX||t.centerY-e.centerY:i-n},Gd=function(e,t){var n=e.slice(0),i=e.length,s=i-2,o,a;for(t=t|0,o=0;o<i;o++)a=(o+t)%s,e[o++]=n[a],e[o]=n[a+1]},Hc=function(e,t,n,i,s){var o=e.length,a=0,l=o-2,c,u,h,f;for(n*=6,u=0;u<o;u+=6)c=(u+n)%l,f=e[c]-(t[u]-i),h=e[c+1]-(t[u+1]-s),a+=Xi(h*h+f*f);return a},YE=function(e,t,n){var i=e.length,s=Hd(e),o=Hd(t),a=o[0]-s[0],l=o[1]-s[1],c=Hc(e,t,0,a,l),u=0,h,f,d;for(d=6;d<i;d+=6)f=Hc(e,t,d/6,a,l),f<c&&(c=f,u=d);if(n)for(h=e.slice(0),Bo(h),d=6;d<i;d+=6)f=Hc(h,t,d/6,a,l),f<c&&(c=f,u=-d);return u/6},qE=function(e,t,n){for(var i=e.length,s=f_,o=0,a=0,l,c,u,h,f,d;--i>-1;)for(l=e[i],d=l.length,f=0;f<d;f+=6)c=l[f]-t,u=l[f+1]-n,h=Xi(c*c+u*u),h<s&&(s=h,o=l[f],a=l[f+1]);return[o,a]},$E=function(e,t,n,i,s,o){var a=t.length,l=0,c=Math.min(e.size||Js(e),t[n].size||Js(t[n]))*i,u=f_,h=e.centerX+s,f=e.centerY+o,d,g,_,m,p;for(g=n;g<a&&(d=t[g].size||Js(t[g]),!(d<c));g++)_=t[g].centerX-h,m=t[g].centerY-f,p=Xi(_*_+m*m),p<u&&(l=g,u=p);return p=t[l],t.splice(l,1),p},Vc=function(e,t){var n=0,i=.999999,s=e.length,o=t/((s-2)/6),a,l,c,u,h,f,d,g,_,m,p,M,y,v;for(y=2;y<s;y+=6)for(n+=o;n>i;)a=e[y-2],l=e[y-1],c=e[y],u=e[y+1],h=e[y+2],f=e[y+3],d=e[y+4],g=e[y+5],v=1/((Math.floor(n)||1)+1),_=a+(c-a)*v,p=c+(h-c)*v,_+=(p-_)*v,p+=(h+(d-h)*v-p)*v,m=l+(u-l)*v,M=u+(f-u)*v,m+=(M-m)*v,M+=(f+(g-f)*v-M)*v,e.splice(y,4,a+(c-a)*v,l+(u-l)*v,_,m,_+(p-_)*v,m+(M-m)*v,p,M,h+(d-h)*v,f+(g-f)*v),y+=6,s+=6,n--;return e},lf=function(e,t,n,i,s){var o=t.length-e.length,a=o>0?t:e,l=o>0?e:t,c=0,u=i==="complexity"?XE:Vd,h=i==="position"?0:typeof i=="number"?i:.8,f=l.length,d=typeof n=="object"&&n.push?n.slice(0):[n],g=d[0]==="reverse"||d[0]<0,_=n==="log",m,p,M,y,v,A,C;if(l[0]){if(a.length>1&&(e.sort(u),t.sort(u),A=a.size||na(a),A=l.size||na(l),A=a.centerX-l.centerX,C=a.centerY-l.centerY,u===Vd))for(f=0;f<l.length;f++)a.splice(f,0,$E(l[f],a,f,h,A,C));if(o)for(o<0&&(o=-o),a[0].length>l[0].length&&Vc(l[0],(a[0].length-l[0].length)/6|0),f=l.length;c<o;)y=a[f].size||Js(a[f]),M=qE(l,a[f].centerX,a[f].centerY),y=M[0],v=M[1],l[f++]=[y,v,y,v,y,v,y,v],l.totalPoints+=8,c++;for(f=0;f<e.length;f++)m=t[f],p=e[f],o=m.length-p.length,o<0?Vc(m,-o/6|0):o>0&&Vc(p,o/6|0),g&&s!==!1&&!p.reversed&&Bo(p),n=d[f]||d[f]===0?d[f]:"auto",n&&(p.closed||Math.abs(p[0]-p[p.length-2])<.5&&Math.abs(p[1]-p[p.length-1])<.5?n==="auto"||n==="log"?(d[f]=n=YE(p,m,!f||s===!1),n<0&&(g=!0,Bo(p),n=-n),Gd(p,n*6)):n!=="reverse"&&(f&&n<0&&Bo(p),Gd(p,(n<0?-n:n)*6)):!g&&(n==="auto"&&Math.abs(m[0]-p[0])+Math.abs(m[1]-p[1])+Math.abs(m[m.length-2]-p[p.length-2])+Math.abs(m[m.length-1]-p[p.length-1])>Math.abs(m[0]-p[p.length-2])+Math.abs(m[1]-p[p.length-1])+Math.abs(m[m.length-2]-p[0])+Math.abs(m[m.length-1]-p[1])||n%2)?(Bo(p),d[f]=-1,g=!0):n==="auto"?d[f]=0:n==="reverse"&&(d[f]=-1),p.closed!==m.closed&&(p.closed=m.closed=!1));return _&&pr("shapeIndex:["+d.join(",")+"]"),e.shapeIndex=d,d}},Wd=function(e,t,n,i,s){var o=Sr(e[0]),a=Sr(e[1]);lf(o,a,t||t===0?t:"auto",n,s)&&(e[0]=js(o),e[1]=js(a),(i==="log"||i===!0)&&pr('precompile:["'+e[0]+'","'+e[1]+'"]'))},KE=function(e,t){if(!t)return e;var n=e.match(pa)||[],i=n.length,s="",o,a,l;for(t==="reverse"?(a=i-1,o=-2):(a=((parseInt(t,10)||0)*2+1+i*100)%i,o=2),l=0;l<i;l+=2)s+=n[a-1]+","+n[a]+" ",a=(a+o)%i;return s},Xd=function(e,t){var n=0,i=parseFloat(e[0]),s=parseFloat(e[1]),o=i+","+s+" ",a=.999999,l,c,u,h,f,d,g;for(u=e.length,l=t*.5/(u*.5-1),c=0;c<u-2;c+=2){if(n+=l,d=parseFloat(e[c+2]),g=parseFloat(e[c+3]),n>a)for(f=1/(Math.floor(n)+1),h=1;n>a;)o+=(i+(d-i)*f*h).toFixed(2)+","+(s+(g-s)*f*h).toFixed(2)+" ",n--,h++;o+=d+","+g+" ",i=d,s=g}return o},cf=function(e){var t=e[0].match(pa)||[],n=e[1].match(pa)||[],i=n.length-t.length;i>0?e[0]=Xd(t,i):e[1]=Xd(n,-i)},ZE=function(e){return isNaN(e)?cf:function(t){cf(t),t[1]=KE(t[1],parseInt(e,10))}},jE=function(e,t,n){var i=typeof e=="string",s,o;return(!i||VE.test(e)||(e.match(pa)||[]).length<3)&&(s=qf(e)[0],s?(o=(s.nodeName+"").toUpperCase(),t&&o!=="PATH"&&(s=l_(s,!1),o="PATH"),e=s.getAttribute(o==="PATH"?"d":"points")||"",s===n&&(e=s.getAttributeNS(null,"data-original")||e)):(pr("WARNING: invalid morph to: "+e),e=!1)),e},Yd=function(e,t){for(var n=e.length,i=.2*(t||1),s,o,a,l,c,u,h,f,d,g,_,m;--n>-1;){for(o=e[n],_=o.isSmooth=o.isSmooth||[0,0,0,0],m=o.smoothData=o.smoothData||[0,0,0,0],_.length=4,f=o.length-2,h=6;h<f;h+=6)a=o[h]-o[h-2],l=o[h+1]-o[h-1],c=o[h+2]-o[h],u=o[h+3]-o[h+1],d=Kr(l,a),g=Kr(u,c),s=Math.abs(d-g)<i,s&&(m[h-2]=d,m[h+2]=g,m[h-1]=Xi(a*a+l*l),m[h+3]=Xi(c*c+u*u)),_.push(s,s,0,0,s,s);o[f]===o[0]&&o[f+1]===o[1]&&(a=o[0]-o[f-2],l=o[1]-o[f-1],c=o[2]-o[0],u=o[3]-o[1],d=Kr(l,a),g=Kr(u,c),Math.abs(d-g)<i&&(m[f-2]=d,m[2]=g,m[f-1]=Xi(a*a+l*l),m[3]=Xi(c*c+u*u),_[f-2]=_[f-1]=!0))}return e},qd=function(e){var t=e.trim().split(" "),n=~e.indexOf("left")?0:~e.indexOf("right")?100:isNaN(parseFloat(t[0]))?50:parseFloat(t[0]),i=~e.indexOf("top")?0:~e.indexOf("bottom")?100:isNaN(parseFloat(t[1]))?50:parseFloat(t[1]);return{x:n/100,y:i/100}},JE=function(e){return e!==e%Yl?e+(e<0?kd:-kd):e},$d="Use MorphSVGPlugin.convertToPath() to convert to a path before morphing.",QE=function(e,t,n,i){var s=this._origin,o=this._eOrigin,a=e[n]-s.x,l=e[n+1]-s.y,c=Xi(a*a+l*l),u=Kr(l,a),h,f;return a=t[n]-o.x,l=t[n+1]-o.y,h=Kr(l,a)-u,f=JE(h),!i&&zo&&Math.abs(f+zo.ca)<kE&&(i=zo),this._anchorPT=zo={_next:this._anchorPT,t:e,sa:u,ca:i&&f*i.ca<0&&Math.abs(f)>HE?h:f,sl:c,cl:Xi(a*a+l*l)-c,i:n}},Kd=function(e){di=u_(),ko=ko||di&&di.plugins.morphSVG,di&&ko?(qf=di.utils.toArray,ko.prototype._tweenRotation=QE,c_=1):e&&pr("Please gsap.registerPlugin(MorphSVGPlugin)")},Hs={version:"3.12.7",name:"morphSVG",rawVars:1,register:function(e,t){di=e,ko=t,Kd()},init:function(e,t,n,i,s){if(c_||Kd(1),!t)return pr("invalid shape"),!1;kc(t)&&(t=t.call(n,i,e,s));var o,a,l,c,u,h,f,d,g,_,m,p,M,y,v,A,C,w,E,x,S,P;if(typeof t=="string"||t.getBBox||t[0])t={shape:t};else if(typeof t=="object"){o={};for(a in t)o[a]=kc(t[a])&&a!=="render"?t[a].call(n,i,e,s):t[a];t=o}var I=e.nodeType?window.getComputedStyle(e):{},O=I.fill+"",q=!(O==="none"||(O.match(pa)||[])[3]==="0"||I.fillRule==="evenodd"),W=(t.origin||"50 50").split(",");if(o=(e.nodeName+"").toUpperCase(),u=o==="POLYLINE"||o==="POLYGON",o!=="PATH"&&!u&&!t.prop)return pr("Cannot morph a <"+o+"> element. "+$d),!1;if(a=o==="PATH"?"d":"points",!t.prop&&!kc(e.setAttribute))return!1;if(c=jE(t.shape||t.d||t.points||"",a==="d",e),u&&GE.test(c))return pr("A <"+o+"> cannot accept path data. "+$d),!1;if(h=t.shapeIndex||t.shapeIndex===0?t.shapeIndex:"auto",f=t.map||Hs.defaultMap,this._prop=t.prop,this._render=t.render||Hs.defaultRender,this._apply="updateTarget"in t?t.updateTarget:Hs.defaultUpdateTarget,this._rnd=Math.pow(10,isNaN(t.precision)?2:+t.precision),this._tween=n,c){if(this._target=e,C=typeof t.precompile=="object",_=this._prop?e[this._prop]:e.getAttribute(a),!this._prop&&!e.getAttributeNS(null,"data-original")&&e.setAttributeNS(null,"data-original",_),a==="d"||this._prop){if(_=Sr(C?t.precompile[0]:_),m=Sr(C?t.precompile[1]:c),!C&&!lf(_,m,h,f,q))return!1;for((t.precompile==="log"||t.precompile===!0)&&pr('precompile:["'+js(_)+'","'+js(m)+'"]'),S=(t.type||Hs.defaultType)!=="linear",S&&(_=Yd(_,t.smoothTolerance),m=Yd(m,t.smoothTolerance),_.size||na(_),m.size||na(m),x=qd(W[0]),this._origin=_.origin={x:_.left+x.x*_.width,y:_.top+x.y*_.height},W[1]&&(x=qd(W[1])),this._eOrigin={x:m.left+x.x*m.width,y:m.top+x.y*m.height}),this._rawPath=e._gsRawPath=_,M=_.length;--M>-1;)for(v=_[M],A=m[M],d=v.isSmooth||[],g=A.isSmooth||[],y=v.length,zo=0,p=0;p<y;p+=2)(A[p]!==v[p]||A[p+1]!==v[p+1])&&(S?d[p]&&g[p]?(w=v.smoothData,E=A.smoothData,P=p+(p===y-4?7-y:5),this._controlPT={_next:this._controlPT,i:p,j:M,l1s:w[p+1],l1c:E[p+1]-w[p+1],l2s:w[P],l2c:E[P]-w[P]},l=this._tweenRotation(v,A,p+2),this._tweenRotation(v,A,p,l),this._tweenRotation(v,A,P-1,l),p+=4):this._tweenRotation(v,A,p):(l=this.add(v,p,v[p],A[p],0,0,0,0,0,1),l=this.add(v,p+1,v[p+1],A[p+1],0,0,0,0,0,1)||l))}else l=this.add(e,"setAttribute",e.getAttribute(a)+"",c+"",i,s,0,ZE(h),a);S&&(this.add(this._origin,"x",this._origin.x,this._eOrigin.x,0,0,0,0,0,1),l=this.add(this._origin,"y",this._origin.y,this._eOrigin.y,0,0,0,0,0,1)),l&&(this._props.push("morphSVG"),l.end=c,l.endProp=a)}return WE},render:function(e,t){for(var n=t._rawPath,i=t._controlPT,s=t._anchorPT,o=t._rnd,a=t._target,l=t._pt,c,u,h,f,d,g,_,m,p,M,y,v,A;l;)l.r(e,l.d),l=l._next;if(e===1&&t._apply)for(l=t._pt;l;)l.end&&(t._prop?a[t._prop]=l.end:a.setAttribute(l.endProp,l.end)),l=l._next;else if(n){for(;s;)g=s.sa+e*s.ca,d=s.sl+e*s.cl,s.t[s.i]=t._origin.x+Bd(g)*d,s.t[s.i+1]=t._origin.y+zd(g)*d,s=s._next;for(h=e<.5?2*e*e:(4-2*e)*e-1;i;)_=i.i,f=n[i.j],A=_+(_===f.length-4?7-f.length:5),g=Kr(f[A]-f[_+1],f[A-1]-f[_]),y=zd(g),v=Bd(g),p=f[_+2],M=f[_+3],d=i.l1s+h*i.l1c,f[_]=p-v*d,f[_+1]=M-y*d,d=i.l2s+h*i.l2c,f[A-1]=p+v*d,f[A]=M+y*d,i=i._next;if(a._gsRawPath=n,t._apply){for(c="",u=" ",m=0;m<n.length;m++)for(f=n[m],d=f.length,c+="M"+(f[0]*o|0)/o+u+(f[1]*o|0)/o+" C",_=2;_<d;_++)c+=(f[_]*o|0)/o+u;t._prop?a[t._prop]=c:a.setAttribute("d",c)}}t._render&&n&&t._render.call(t._tween,n,a)},kill:function(e){this._pt=this._rawPath=0},getRawPath:NE,stringToRawPath:Sr,rawPathToString:js,normalizeStrings:function(e,t,n){var i=n.shapeIndex,s=n.map,o=[e,t];return Wd(o,i,s),o},pathFilter:Wd,pointsFilter:cf,getTotalSize:na,equalizeSegmentQuantity:lf,convertToPath:function(e,t){return qf(e).map(function(n){return l_(n,t!==!1)})},defaultType:"linear",defaultUpdateTarget:!0,defaultMap:"size"};u_()&&di.registerPlugin(Hs);cn.registerPlugin(qe);cn.registerPlugin(Hs);function ol(r,e){const t=document.querySelector(`#${r} .number`),n=r==="days"&&e>=100?String(e):("0"+e).slice(-2);if(t.dataset.value===n)return;t.dataset.value=n;const i=t.querySelectorAll(".char");cn.to(i,{y:-12,opacity:0,duration:.4,stagger:.05,onComplete:()=>{t.innerHTML=n.split("").map(o=>`<span class="char">${o}</span>`).join("");const s=t.querySelectorAll(".char");cn.from(s,{y:20,z:-500,opacity:0,duration:.42,stagger:.05,ease:"power1.out"})}})}function eb(){document.querySelectorAll(".reveal-top-center").forEach(function(i){cn.set(i,{opacity:0}),cn.to(i,{opacity:1,ease:"power1.out",scrollTrigger:{trigger:i,start:"top center",toggleActions:"restart none none reverse"}})}),document.querySelectorAll(".reveal-center-center").forEach(function(i){cn.set(i,{opacity:0}),cn.to(i,{opacity:1,ease:"power1.out",scrollTrigger:{trigger:i,start:"center center",toggleActions:"restart none none reverse"}})}),document.querySelectorAll(".pin-top-top").forEach(function(i){let s=i.parentElement;qe.create({trigger:s,start:"top top",end:"bottom bottom",pin:i,pinSpacing:!1})}),document.querySelectorAll(".pin-top-center").forEach(function(i){let s=i.parentElement;qe.create({trigger:s,start:"top center",end:"bottom bottom",pin:i,pinSpacing:!1})}),document.querySelectorAll(".pin-center-center").forEach(function(i){let s=i.parentElement;qe.create({trigger:s,start:"center center",end:"bottom bottom",pin:i,pinSpacing:!1})}),document.querySelectorAll(".pin-bottom-bottom").forEach(function(i){let s=i.parentElement;qe.create({trigger:s,start:"bottom bottom",end:"",pin:i,pinSpacing:!1})});const r=document.querySelector(".years"),e={weight:100};if(r){const i={year:2026};r.innerText=i.year.toString(),cn.to(i,{year:1876,ease:"none",scrollTrigger:{trigger:"#years-travel-area",start:"top -80%",end:"bottom 180%",scrub:!0},onUpdate:function(){r.innerText=Math.round(i.year).toString()}}),cn.to(e,{weight:900,ease:"power2.inOut",scrollTrigger:{trigger:"#years-travel-area",start:"top -80%",end:"bottom 180%",scrub:!0},onUpdate:function(){r.style.fontWeight=Math.round(e.weight).toString()}}),cn.fromTo(r,{scale:.5},{scale:1.5,ease:"power2.inOut",scrollTrigger:{trigger:"#years-travel-area",start:"top top",end:"bottom bottom",scrub:!0}})}qe.create({trigger:"#anniversary-area",start:"top top",onEnter:()=>{cn.to(".years",{opacity:0,duration:.3,ease:"none"})},onLeaveBack:()=>{cn.to(".years",{opacity:1,duration:.3,ease:"none"})}});const t=document.getElementById("anniversary-area");if(t){let i=t.querySelector("#marquee");if(!i){i=document.createElement("div"),i.id="marquee",i.style.position="absolute",i.style.bottom="0",i.style.left="0";const s="150 YEARS OF AMERICAN CHEMICAL SOCIETY ";i.innerHTML=`<span>${s}</span><span>${s}</span>`,t.appendChild(i),cn.to(i,{xPercent:-50,ease:"linear",duration:20,repeat:-1})}}const n=document.getElementById("waveGroup");n&&cn.to(n,{x:"-=100",ease:"linear",duration:2,repeat:-1})}function tb(r){function e(){const t=Date.now(),n=r-t;if(n<0)return;const i=Math.floor(n/(1e3*60*60*24)),s=Math.floor(n%(1e3*60*60*24)/(1e3*60*60)),o=Math.floor(n%(1e3*60*60)/(1e3*60)),a=Math.floor(n%(1e3*60)/1e3);i>=100?String(i):("0"+i).slice(-2),("0"+s).slice(-2),("0"+o).slice(-2),("0"+a).slice(-2),ol("days",i),ol("hours",s),ol("minutes",o),ol("seconds",a)}e(),setInterval(e,1e3)}function nb(){document.querySelectorAll("section").forEach(function(e){e.style.border="1px solid red",window.getComputedStyle(e).position==="static"&&(e.style.position="relative");let t=e.querySelector(":scope > .debug-dimensions");t||(t=document.createElement("span"),t.className="debug-dimensions",t.style.position="absolute",t.style.bottom="0",t.style.right="0",t.style.backgroundColor="rgba(0,0,0,0.5)",t.style.color="white",t.style.fontSize="12px",t.style.padding="2px 4px",t.style.zIndex="9999",e.appendChild(t))});function r(){const e=qe.getAll();document.querySelectorAll("section").forEach(function(t){const n=t.getBoundingClientRect(),i=t.querySelector(":scope > .debug-dimensions"),s=e.some(o=>o.pin===t);t.style.border=s?"1px solid green":"1px solid red",i&&(i.textContent=`${t.id||"no-id"}: ${Math.round(n.width)}x${Math.round(n.height)}`+(s?" pinned":""))})}r(),window.addEventListener("resize",r)}const ib=new Date("2026-04-06T00:00:00").getTime();window.scrollTo(0,0);window.addEventListener("load",()=>{window.scrollTo(0,0)});document.addEventListener("DOMContentLoaded",()=>{window.scrollTo(0,0),new M_({autoRaf:!0}).on("scroll",e=>{}),tb(ib),nb(),jy(),eb()});
