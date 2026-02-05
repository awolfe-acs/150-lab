const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/mobileFilmGrain-3z14cPLz.js","assets/logger-2Ii2FPkr.js"])))=>i.map(i=>d[i]);
import{_ as wt}from"./index-DCnErEpO.js";import{p as U,m as Ee}from"./mobileFilmGrain-3z14cPLz.js";import{l as y}from"./logger-2Ii2FPkr.js";import Ht from"./aemModeDetector-DID0UQIE.js";import"./vendor-gsap-BYvdLAYj.js";class Co{onChange(){return this}onFinishChange(){return this}setValue(){return this}getValue(){}listen(){return this}name(){return this}min(){return this}max(){return this}step(){return this}options(){return this}disable(){return this}enable(){return this}show(){return this}hide(){return this}destroy(){}remove(){}}class qt{constructor(){this.domElement=document.createElement("div"),this.closed=!0,this.__controllers=[],this.__folders={}}add(){return new Co}addColor(){return new Co}addFolder(a){const l=new qt;return this.__folders[a]=l,l}remove(){}destroy(){}close(){return this.closed=!0,this}open(){return this.closed=!1,this}hide(){return this}show(){return this}listen(){return this}remember(){}onChange(){return this}onFinishChange(){return this}title(){return this}}const Zo="/150-lab/assets/models/globe-hd.glb";class Ko{constructor(a,l=60){this.animateCallback=a,this.targetFPS=Math.min(l,60),this.baseTargetFPS=this.targetFPS,this.frameInterval=1e3/this.targetFPS,this.lastFrameTime=0,this.isVisible=!0,this.isRunning=!1,this.rafId=null,this.pausedByTimeline=!1,this.inTimeline=!1,this.frameCount=0,this.fpsCheckInterval=1e3,this.lastFPSCheck=performance.now(),this.currentFPS=this.targetFPS,this.isDegraded=!1,this.minFPS=30,this.currentCanvasId="shaderBackground",this.observers=new Map,this.isScrolling=!1,this.isMobile=U.isMobile(),this.scrollThrottleFPS=this.isMobile?30:45,this.setupVisibilityObserver(this.currentCanvasId),this.setupPageVisibilityListener(),this.setupDegradationListener(),this.setupScrollListener()}setupScrollListener(){U.onScrollStateChange(({isScrolling:a})=>{if(this.isScrolling=a,a){const l=Math.min(this.scrollThrottleFPS,this.baseTargetFPS);this.setTargetFPS(l)}else this.setTargetFPS(this.baseTargetFPS)})}setupDegradationListener(){U.onDegradation(a=>{a.tier==="low"&&!this.isDegraded&&(y.log("[Adaptive Renderer] Received degradation signal - reducing to 30fps"),this.isDegraded=!0,this.setTargetFPS(a.targetFPS||this.minFPS))}),U.onFpsCapChange(a=>{if(y.log(`[Adaptive Renderer] Received FPS cap signal: ${a.cap}fps (${a.reason})`),a.reason==="performance_improved"&&a.cap>this.baseTargetFPS){y.log(`[Adaptive Renderer] Performance improved - upgrading from ${this.baseTargetFPS}fps to ${a.cap}fps`),this.baseTargetFPS=a.cap,this.isDegraded=!1,this.scrollThrottleFPS=this.isMobile?30:45,this.isScrolling||this.setTargetFPS(a.cap);return}a.cap<this.baseTargetFPS&&(this.baseTargetFPS=a.cap,y.log(`[Adaptive Renderer] Updated base target FPS to ${a.cap}fps`)),a.cap===30&&(this.scrollThrottleFPS=30,this.isDegraded=!0),a.cap<this.targetFPS&&!this.isScrolling&&this.setTargetFPS(a.cap)})}setupVisibilityObserver(a){const l=document.getElementById(a);if(!l){y.warn(`[Adaptive Renderer] Canvas #${a} not found for observation`);return}const m={root:null,rootMargin:"50px",threshold:.1},x=new IntersectionObserver(he=>{he.forEach(pe=>{pe.target.id===this.currentCanvasId&&(this.isVisible=pe.isIntersecting,this.isVisible&&this.isRunning||this.isVisible)})},m);x.observe(l),this.observers.set(a,x)}setupPageVisibilityListener(){document.addEventListener("visibilitychange",()=>{document.hidden?this.pause():this.resume()})}start(){this.isRunning||(this.isRunning=!0,this.lastFrameTime=performance.now(),this.lastFPSCheck=performance.now(),this.frameCount=0,this.loop())}loop(){if(!this.isRunning)return;this.rafId=requestAnimationFrame(()=>this.loop());const a=performance.now(),l=a-this.lastFrameTime;a-this.lastFPSCheck>=this.fpsCheckInterval&&(this.currentFPS=this.frameCount,this.frameCount=0,this.lastFPSCheck=a,!this.pausedByTimeline&&this.isVisible&&!document.hidden&&U.recordFpsSample(this.currentFPS)),!(l<this.frameInterval)&&(!this.isVisible||this.pausedByTimeline||document.hidden||(this.lastFrameTime=a-l%this.frameInterval,this.frameCount++,this.animateCallback&&this.animateCallback(l)))}pause(){this.isRunning=!1,this.rafId&&(cancelAnimationFrame(this.rafId),this.rafId=null)}resume(){this.isRunning||this.start()}setPausedByTimeline(a){this.pausedByTimeline=a,a&&this.currentCanvasId==="shaderBackground"&&(this.frameCount=0,this.lastFPSCheck=performance.now())}setInTimeline(a){this.inTimeline!==a&&(this.inTimeline=a,a?this.switchCanvasMonitoring("timeline-shader-bg"):this.switchCanvasMonitoring("shaderBackground"))}switchCanvasMonitoring(a){this.currentCanvasId!==a&&(this.currentCanvasId=a,this.observers.has(a)||this.setupVisibilityObserver(a),this.frameCount=0,this.lastFPSCheck=performance.now())}setTargetFPS(a){this.targetFPS=a,this.frameInterval=1e3/a}getCurrentFPS(){return this.currentFPS}destroy(){this.pause(),this.observers.forEach(a=>a.disconnect()),this.observers.clear()}}class Jo{constructor(){this.metrics={fps:0,frameTime:0,memory:0,drawCalls:0,triangles:0,geometries:0,textures:0},this.frameCount=0,this.lastTime=performance.now(),this.fpsHistory=[],this.maxHistoryLength=60,this.warningThreshold={fps:30,frameTime:33,memory:200},this.onWarning=null,this.lastWarningTime=0,this.warningCooldown=6e4,this.warningHistory=new Map,this.consecutiveLowFps=0,this.persistenceThreshold=5}update(a){const l=performance.now(),m=l-this.lastTime;if(this.frameCount++,m>=1e3){if(this.metrics.fps=Math.round(this.frameCount*1e3/m),this.metrics.frameTime=m/this.frameCount,this.fpsHistory.push(this.metrics.fps),this.fpsHistory.length>this.maxHistoryLength&&this.fpsHistory.shift(),a&&a.info){const x=a.info;this.metrics.drawCalls=x.render.calls,this.metrics.triangles=x.render.triangles,this.metrics.geometries=x.memory.geometries,this.metrics.textures=x.memory.textures}performance.memory&&(this.metrics.memory=Math.round(performance.memory.usedJSHeapSize/1048576)),this.checkWarnings(),this.frameCount=0,this.lastTime=l}}checkWarnings(){const a=performance.now();if(this.metrics.fps<this.warningThreshold.fps&&this.getAverageFPS()<this.warningThreshold.fps?this.consecutiveLowFps++:this.consecutiveLowFps=Math.max(0,this.consecutiveLowFps-1),a-this.lastWarningTime<this.warningCooldown)return;const l=[];if(this.consecutiveLowFps>=this.persistenceThreshold&&this.metrics.fps<this.warningThreshold.fps&&this.getAverageFPS()<this.warningThreshold.fps&&(!this.warningHistory.has("fps")||a-this.warningHistory.get("fps")>this.warningCooldown)&&(l.push(`Persistent low FPS: ${this.metrics.fps} (avg: ${this.getAverageFPS()}, streak: ${this.consecutiveLowFps})`),this.warningHistory.set("fps",a)),this.metrics.memory>this.warningThreshold.memory*1.5){const m="memory";(!this.warningHistory.has(m)||a-this.warningHistory.get(m)>this.warningCooldown)&&(l.push(`High memory usage: ${this.metrics.memory}MB (threshold: ${this.warningThreshold.memory}MB)`),this.warningHistory.set(m,a))}l.length>0&&this.onWarning&&(this.lastWarningTime=a,this.onWarning(l))}getAverageFPS(){if(this.fpsHistory.length===0)return 0;const a=this.fpsHistory.reduce((l,m)=>l+m,0);return Math.round(a/this.fpsHistory.length)}getMetrics(){return{...this.metrics}}log(){y.log("[Performance Monitor]",{fps:this.metrics.fps,avgFPS:this.getAverageFPS(),frameTime:`${this.metrics.frameTime.toFixed(1)}ms`,memory:`${this.metrics.memory}MB`,drawCalls:this.metrics.drawCalls,triangles:this.metrics.triangles,geometries:this.metrics.geometries,textures:this.metrics.textures})}createDebugOverlay(){const a=document.createElement("div");return a.id="perf-monitor-overlay",a.style.cssText=`
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
    `,document.body.appendChild(a),setInterval(()=>{const l=this.getMetrics();a.innerHTML=`
        <div style="font-weight: bold; margin-bottom: 5px;">Performance Monitor</div>
        <div>FPS: ${l.fps} (avg: ${this.getAverageFPS()})</div>
        <div>Frame Time: ${l.frameTime.toFixed(1)}ms</div>
        <div>Memory: ${l.memory}MB</div>
        <div>Draw Calls: ${l.drawCalls}</div>
        <div>Triangles: ${l.triangles}</div>
        <div>Geometries: ${l.geometries}</div>
        <div>Textures: ${l.textures}</div>
      `},1e3),a}removeDebugOverlay(){const a=document.getElementById("perf-monitor-overlay");a&&a.remove()}createFpsCounter(){return wt(()=>import("./mobileFilmGrain-3z14cPLz.js").then(a=>a.a),__vite__mapDeps([0,1])).then(a=>{const l=a.default,m=document.createElement("div");m.id="fps-counter",m.style.cssText=`
        position: fixed;
        bottom: 10px;
        left: 10px;
        background: rgba(0, 0, 0, 0.7);
        color: #0f0;
        font-family: 'SF Mono', 'Monaco', 'Consolas', monospace;
        font-size: 11px;
        padding: 4px 8px;
        border-radius: 4px;
        z-index: 999999;
        pointer-events: none;
        user-select: none;
        min-width: 60px;
        text-align: center;
      `,document.body.appendChild(m);let x=null;l.onFpsCapChange(ge=>{x=ge.cap});let he=0,pe=performance.now(),O=60,me=[];const yt=10,Ie=()=>{if(!document.getElementById("fps-counter"))return;he++;const ge=performance.now(),Ce=ge-pe;if(Ce>=1e3){O=Math.round(he*1e3/Ce),he=0,pe=ge,me.push(O),me.length>yt&&me.shift();const je=Math.round(me.reduce((ve,xe)=>ve+xe,0)/me.length);let Se="#0f0";const Me=x||60,ae=Me*.8,Xe=Me*.5;O<Xe?Se="#f00":O<ae&&(Se="#ff0"),m.style.color=Se;let Be="";if(x){const ve=x===30?"#f80":"#0af",xe=x===30?"cap:30 (degraded)":`cap:${x}`;Be=` <span style="color: ${ve}; font-size: 9px;">${xe}</span>`}m.innerHTML=`${O} FPS <span style="color: #888; font-size: 9px;">(avg: ${je})</span>${Be}`}requestAnimationFrame(Ie)};requestAnimationFrame(Ie)}),document.getElementById("fps-counter")}removeFpsCounter(){const a=document.getElementById("fps-counter");a&&a.remove(),this.fpsCounterInterval&&(clearInterval(this.fpsCounterInterval),this.fpsCounterInterval=null)}setWarningCallback(a){this.onWarning=a}}class Qo{constructor(){this.disposables=new Set,this.textures=new Set,this.geometries=new Set,this.materials=new Set}track(a,l="disposable"){if(a)switch(l){case"texture":this.textures.add(a);break;case"geometry":this.geometries.add(a);break;case"material":this.materials.add(a);break;default:this.disposables.add(a)}}dispose(a){if(a)try{a.dispose&&typeof a.dispose=="function"&&a.dispose(),this.disposables.delete(a),this.textures.delete(a),this.geometries.delete(a),this.materials.delete(a)}catch(l){y.warn("[Memory Manager] Error disposing resource:",l)}}disposeAll(){let a=0;return this.textures.forEach(l=>{try{l&&l.dispose&&(l.dispose(),a++)}catch(m){y.warn("[Memory Manager] Error disposing texture:",m)}}),this.textures.clear(),this.geometries.forEach(l=>{try{l&&l.dispose&&(l.dispose(),a++)}catch(m){y.warn("[Memory Manager] Error disposing geometry:",m)}}),this.geometries.clear(),this.materials.forEach(l=>{try{l&&l.dispose&&(l.dispose(),a++)}catch(m){y.warn("[Memory Manager] Error disposing material:",m)}}),this.materials.clear(),this.disposables.forEach(l=>{try{l&&l.dispose&&(l.dispose(),a++)}catch(m){y.warn("[Memory Manager] Error disposing resource:",m)}}),this.disposables.clear(),y.log(`[Memory Manager] Disposed ${a} resources`),a}disposeObject(a){a&&(a.children&&a.children.forEach(l=>this.disposeObject(l)),a.geometry&&this.dispose(a.geometry),a.material&&(Array.isArray(a.material)?a.material.forEach(l=>{this.disposeMaterial(l)}):this.disposeMaterial(a.material)),a.parent&&a.parent.remove(a))}disposeMaterial(a){if(!a)return;["map","lightMap","bumpMap","normalMap","specularMap","envMap","alphaMap","aoMap","displacementMap","emissiveMap","gradientMap","metalnessMap","roughnessMap"].forEach(m=>{a[m]&&this.dispose(a[m])}),this.dispose(a)}getStats(){return{textures:this.textures.size,geometries:this.geometries.size,materials:this.materials.size,disposables:this.disposables.size,total:this.textures.size+this.geometries.size+this.materials.size+this.disposables.size}}forceGC(){try{if(window.gc)window.gc(),y.log("[Memory Manager] Forced garbage collection");else{const a=new Array(1e6);a.fill(0),a.length=0}}catch{}}}const Ye=new Qo;let c,So,Mo;async function ei(){if(!c){console.log("[background.js] Loading Three.js dependencies...");try{const[D,a,l]=await Promise.all([wt(()=>import("./vendor-three-B90GZkEf.js").then(m=>m.t),[]),wt(()=>import("./vendor-three-B90GZkEf.js").then(m=>m.G),[]),wt(()=>import("./vendor-three-B90GZkEf.js").then(m=>m.D),[])]);c=D,So=a.GLTFLoader,Mo=l.DRACOLoader}catch(D){throw console.error("[background.js] Failed to load Three.js dependencies:",D),D}}}function ti(D,a){if(window.PRELOADED_ASSETS&&window.PRELOADED_ASSETS[D]){const l=window.PRELOADED_ASSETS[D];if(l instanceof ArrayBuffer){const m=new Blob([l]);return URL.createObjectURL(m)}}return a}async function oi(){if(window.shaderBackgroundInitialized){y.warn("Shader background already initialized. Skipping...");return}await ei();const D=Ht.detect(),a=Ht.getSettings();if(a.mode==="fallback"||!a.enableBackground){y.log("[Background Init] Skipping initialization - AEM fallback mode detected"),y.log("[Background Init] AEM Mode:",D),Ht.applyStaticBackground(),window.shaderBackgroundInitialized=!0;return}const l=await U.detect(),m=U.getSettings();y.log("[Background Init] AEM Mode:",D),y.log("[Background Init] Performance Tier:",l),y.log("[Background Init] Settings:",m),window.colorPhase=1,window.specialColorsActive=!1,window.particlesFullyHidden=!1,window.particlesMovementPaused=!1;let x=Date.now();const he=6e9;function pe(){const e=document.querySelector("#events");if(!e)return!0;const t=e.getBoundingClientRect(),n=window.innerHeight*1.2;return t.top>n}const O=document.getElementById("shaderBackground");if(!O)return;function me(){try{const e=document.createElement("canvas");return!!(e.getContext("webgl")||e.getContext("experimental-webgl"))}catch{return!1}}if(!me()){y.warn("WebGL is not supported on this device/browser. Skipping shader background initialization."),O.style.display="none",document.body.style.backgroundColor="#1a1a2e";return}window.specialColorsActive=!1,window.colorPhase=0;function yt(e,t){let i,n,s,r,h,g,b,v;if(!document.querySelector("#video-travel-area")){y.warn("Could not find #video-travel-area element for shader animation");return}if(o&&o.color1&&o.color2&&(i=o.color1.value.clone(),n=o.color2.value.clone(),s=o.waveSpeed.value,r=o.waveAmplitude.value,h=o.waveFrequency.value,g=o.ambientLight.value,b=o.directionalLight.value,v=o.yOffset.value),e.timeline({scrollTrigger:{trigger:"#intro-text-travel-area",start:"35% top",end:"45% top",scrub:!0,markers:!1,invalidateOnRefresh:!0,onUpdate:W=>{o&&o.colorDarkness&&(o.colorDarkness.value=W.progress*2,o.colorDarkness.value>=1.95?window.colorPhase===1?(o.color1&&o.color1.value.set(i),o.color2&&o.color2.value.set(n),window.specialColorsActive=!0):window.colorPhase===0&&(o.color1&&o.color1.value.set("#e2e2e2"),o.color2&&o.color2.value.set("#515151"),window.specialColorsActive=!0):i&&n&&(window.colorPhase===1?(o.color1&&o.color1.value.copy(i),o.color2&&o.color2.value.copy(n),window.specialColorsActive=!1):window.colorPhase===0&&(o.color1&&o.color1.value.set("#e2e2e2"),o.color2&&o.color2.value.set("#515151"),window.specialColorsActive=!1)),ge())}}}),setTimeout(()=>{Ie(e)},100),!document.querySelector("#get-involved")){y.warn("Could not find #get-involved element for globe opacity animation");return}e.timeline({scrollTrigger:{trigger:"#get-involved",start:"top bottom",end:"#get-involved-earth center center",scrub:!0,markers:!1,onUpdate:W=>{const w=W.progress;f&&(w>.01&&!f.visible?(f.visible=!0,S.visible=!0,Se()):w<=.01&&f.visible&&(f.visible=!1,S.visible=!1,Se()),f.visible&&(f.traverse(_=>{_.isMesh&&_.material&&(_.material.transparent=!0,_.material.opacity=w)}),S.opacity=w,je())),M&&(w>.01&&!M.visible?(M.visible=!0,A.enabled=!0,Me()):w<=.01&&M.visible&&(M.visible=!1,A.enabled=!1,Me()),z&&z.uniforms&&(w>.01&&M.visible?(z.uniforms.startOpacity.value=A.startOpacity*w,z.uniforms.endOpacity.value=A.endOpacity*w):(z.uniforms.startOpacity.value=0,z.uniforms.endOpacity.value=0)))}}}),e.timeline({scrollTrigger:{trigger:"#get-involved",start:"top 90%",end:"bottom top",scrub:.5,markers:!1,onUpdate:W=>{const w=W.progress,_=.15;if(!window.particlesFullyHidden&&w>=_?(window.particlesFullyHidden=!0,window.particlesMovementPaused=!0):window.particlesFullyHidden&&w<_*.8&&(window.particlesFullyHidden=!1,window.particlesMovementPaused=!1),window.particlesFullyHidden){P&&P.uniforms&&P.uniforms.opacity&&(P.uniforms.opacity.value=0,bo());return}const N=1-Math.min(w/_,1),vt=.5*Math.pow(N,3);P&&P.uniforms&&P.uniforms.opacity&&(P.uniforms.opacity.value=vt,bo())}}}),e.timeline({scrollTrigger:{trigger:"#get-involved-earth",start:"top bottom",end:"bottom top",scrub:.3,markers:!1,onUpdate:W=>{const w=W.progress;if(we){if(window.innerWidth<=768){we.position.y=0;return}const _=-322,E=120,N=1-Math.pow(1-w,3),ue=_+E*N;if(we.position.y=ue,d&&d.__folders["Globe Model Controls"]){const gt=d.__folders["Globe Model Controls"].__folders.Position;if(gt&&gt.__controllers){for(let vt of gt.__controllers)if(vt.property==="positionY"){vt.updateDisplay();break}}}}}}});const Y=new c.Color("#e2e2e2"),$e=new c.Color("#515151"),qo=new c.Color("#32c2d6"),Yo=new c.Color("#004199"),uo=new c.Color,ho=new c.Color;let po=-1,ut=null;const Vt=document.querySelector("#hero-travel-area");if(!Vt){y.warn("[Background] #hero-travel-area not found - color animations will not work");return}y.log("[Background] #hero-travel-area found, creating color ScrollTriggers"),e.timeline({scrollTrigger:{trigger:Vt,start:"top bottom",end:"top top",scrub:1,markers:!1,fastScrollEnd:!0,onUpdate:W=>{if(!o||!o.color1||!o.color2)return;const w=Math.round(W.progress*100)/100;if(w!==po&&(po=w,uo.copy(Y).lerp(qo,w),ho.copy($e).lerp(Yo,w),o.color1.value.copy(uo),o.color2.value.copy(ho),w>.9?window.colorPhase=1:w<.1?window.colorPhase=0:window.colorPhase=.5,window.specialColorsActive=!0,ut||(ut=document.querySelector("#cover-area-overlay")),ut)){const _=Math.round((1-w)*10)/10,E=Math.round((1+w*1.2)*5)/5;ut.style.cssText=`opacity: ${_}; filter: saturate(${E})`}}}});const mo=new c.Color("#32c2d6"),go=new c.Color("#004199"),vo=new c.Color("#B225B1"),wo=new c.Color("#FCC72D"),jo=new c.Color("#DA281C"),Xo=new c.Color("#FCC72D"),ht=new c.Color,pt=new c.Color;let yo=-1,qe=null,mt=null,Gt=!1;e.timeline({scrollTrigger:{trigger:Vt,start:"top top",end:"bottom bottom",scrub:1,markers:!1,fastScrollEnd:!0,onUpdate:W=>{if(!o||!o.color1||!o.color2)return;const w=Math.round(W.progress*100)/100;if(w!==yo){if(yo=w,w<=.4)ht.copy(mo);else if(w<=.8){const _=(w-.4)/.4;ht.copy(mo).lerp(vo,_)}else{const _=(w-.8)/.2;ht.copy(vo).lerp(jo,_)}if(w<=.6)pt.copy(go);else if(w<=.8){const _=(w-.6)/.2;pt.copy(go).lerp(wo,_)}else{const _=(w-.8)/.2;pt.copy(wo).lerp(Xo,_)}if(o.color1.value.copy(ht),o.color2.value.copy(pt),Gt||(mt||(mt=document.getElementById("shaderBackground")),mt&&(mt.style.filter="hue-rotate(0deg)",Gt=!0)),w>.9?window.colorPhase=2:w<.1?window.colorPhase=1:window.colorPhase=1.5,x=Date.now(),window.specialColorsActive=!0,qe||(qe=document.querySelector("#cover-area-overlay")),qe){let _=0;if(w>=.3){const N=(w-.3)/.7;_=Math.min(.5,N*.5)}const E=1+w*1.2;qe.style.opacity=_,qe.style.filter=`saturate(${E})`}}},onLeaveBack:()=>{Gt=!1}}}),requestAnimationFrame(()=>{t&&typeof t.refresh=="function"&&(t.refresh(),y.log("[Background] ScrollTrigger refreshed after color animation setup"))}),e.timeline({scrollTrigger:{trigger:"#video-travel-area",start:"top top",end:"bottom top",scrub:!1,markers:!1,onEnter:()=>{o&&o.color1&&o.color2&&(o.color1.value.set("#DA281C"),o.color2.value.set("#FCC72D"),window.colorPhase=2,window.specialColorsActive=!0,Ce())},onLeaveBack:()=>{}}}),e.timeline({scrollTrigger:{trigger:"#video-travel-area",start:"top bottom",end:"top 66.67%",scrub:!0,markers:!1,onUpdate:W=>{const w=W.progress,_=document.querySelector("#cover-area-overlay");if(_){const E=.5-w*.5;_.style.opacity=E,_.style.filter="saturate(2.2)"}}}}),e.timeline({scrollTrigger:{trigger:"#get-involved-cards",start:"top 50%",end:"top -10%",scrub:!0,markers:!1,onUpdate:W=>{if(!o||!o.color1||!o.color2)return;const w=W.progress;if(w>.1)o.color1.value.set("#8300ff"),o.color2.value.set("#14d15f"),o.yOffset&&(o.yOffset.value=-.05),o.ambientLight.value=.4,o.directionalLight.value=.4,o.waveAmplitude.value=1.2,o.waveFrequency.value=2.2,window.colorPhase=3,window.specialColorsActive=!0,Ce(),Nt(),$t();else if(w<=.1&&window.colorPhase===3){const _=o.time.value+o.colorCycleOffset.value;o.colorCycleOffset.value=_,o.time.value=0,o.color1.value.set("#DA281C"),o.color2.value.set("#FCC72D"),o.yOffset&&v!==void 0&&(o.yOffset.value=v),g!==void 0&&(o.ambientLight.value=g),b!==void 0&&(o.directionalLight.value=b),o.waveSpeed.value=1,r!==void 0&&(o.waveAmplitude.value=r),h!==void 0&&(o.waveFrequency.value=h),window.colorPhase=2,x=Date.now(),window.specialColorsActive=!0,Ce(),Nt(),$t()}ge()}}}),e.timeline({scrollTrigger:{trigger:"#get-involved-cards",start:"top 50%",end:"top -10%",scrub:1,markers:!1,onUpdate:W=>{const _=1-W.progress,E=Math.pow(_,3);f&&(f.visible=!0,f.traverse(N=>{N.isMesh&&N.material&&(Array.isArray(N.material)?N.material.forEach(ue=>{ue.transparent=!0,ue.opacity=E,ue.depthWrite=E>.1,ue.blending=c.NormalBlending,ue.needsUpdate=!0}):(N.material.transparent=!0,N.material.opacity=E,N.material.depthWrite=E>.1,N.material.blending=c.NormalBlending,N.material.needsUpdate=!0))}),E<.01&&(f.visible=!1),S.opacity=E,S.rotationPaused=E<.01,je()),M&&z&&z.uniforms&&(M.visible=E>.01,z.uniforms.startOpacity.value=A.startOpacity*E,z.uniforms.endOpacity.value=A.endOpacity*E,A.enabled=E>.01,Me())}}}),e.timeline({scrollTrigger:{trigger:"#get-involved",start:"bottom bottom",end:"top top",scrub:!0,markers:!1,onUpdate:W=>{W.progress<=.1&&s!==void 0&&window.colorPhase===1&&(o.waveSpeed&&(o.waveSpeed.value=s),o.waveAmplitude&&(o.waveAmplitude.value=r),o.waveFrequency&&(o.waveFrequency.value=h),o.yOffset&&(o.yOffset.value=v),Nt(),$t())}}});function bo(W){if(typeof d<"u"&&d&&d.__folders&&d.__folders["Particle System"]){const w=d.__folders["Particle System"];if(w&&w.__controllers){for(let _ of w.__controllers)if(_.property==="value"&&_.object===P.uniforms.opacity){_.updateDisplay();break}}}}}function Ie(e,t,i,n){if(!document.querySelector("#events")){document.addEventListener("DOMContentLoaded",()=>{Ie(e)});return}const r=new c.Color("#8300ff"),h=new c.Color("#dcfff6");e.timeline({scrollTrigger:{trigger:"#get-involved-cards",start:"top 50%",end:"bottom 50%",scrub:!0,markers:!1,onUpdate:g=>{if(o&&o.colorDarkness)if(o.colorDarkness.value=1.5-g.progress*2,window.colorPhase===3){const b=g.progress;o.color1&&(o.color1.value.r=r.r+(h.r-r.r)*b,o.color1.value.g=r.g+(h.g-r.g)*b,o.color1.value.b=r.b+(h.b-r.b)*b),o.color2&&o.color2.value.set("#14d15f"),o.ambientLight.value=.4,o.directionalLight.value=.4,o.waveSpeed.value=.9,o.waveAmplitude.value=1.2,window.specialColorsActive=!0}else window.colorPhase===2?(o.color1&&o.color1.value.set("#da281c"),o.color2&&o.color2.value.set("#FCC72D"),window.specialColorsActive=!0):window.colorPhase===1?(o.color1&&o.color1.value.set("#32c2d6"),o.color2&&o.color2.value.set("#004199"),window.specialColorsActive=!0):(o.color1&&o.color1.value.set("#e2e2e2"),o.color2&&o.color2.value.set("#515151"),window.specialColorsActive=!0)}}})}function ge(){const e=window.gui,t=window.uniforms;if(typeof e<"u"&&e&&e.__folders&&e.__folders["Color Controls"]){const i=e.__folders["Color Controls"];if(i&&i.__controllers){for(let n of i.__controllers)if(n.property==="value"&&n.object===t.colorDarkness){n.updateDisplay();break}}}}function Ce(){const e=window.gui,t=window.uniforms;if(typeof e<"u"&&e&&e.__folders&&e.__folders["Color Controls"]){const i=e.__folders["Color Controls"];i&&i.__controllers&&i.__controllers.forEach(n=>{if(n.property==="color"&&n.__color){if(n.property==="color"&&n.__li&&n.__li.querySelector(".property-name").textContent==="Color 1"){const r="#"+t.color1.value.getHexString();n.setValue(r)}else if(n.property==="color"&&n.__li&&n.__li.querySelector(".property-name").textContent==="Color 2"){const r="#"+t.color2.value.getHexString();n.setValue(r)}}})}}function je(){if(typeof d<"u"&&d&&d.__folders&&d.__folders["Globe Model Controls"]&&d.__folders["Globe Model Controls"].__folders&&d.__folders["Globe Model Controls"].__folders.Material){const e=d.__folders["Globe Model Controls"].__folders.Material;if(e&&e.__controllers)for(let t of e.__controllers)t.property==="opacity"&&t.updateDisplay()}}function Se(){if(typeof d<"u"&&d&&d.__folders&&d.__folders["Globe Model Controls"]){const e=d.__folders["Globe Model Controls"];if(e&&e.__controllers){for(let t of e.__controllers)if(t.property==="visible"){t.updateDisplay();break}}}}function Me(){if(typeof d<"u"&&d&&d.__folders&&d.__folders["Gradient Overlay Controls"]){const e=d.__folders["Gradient Overlay Controls"];if(e&&e.__controllers){for(let t of e.__controllers)if(t.property==="enabled"){t.updateDisplay();break}}}}function ae(){return Math.max(window.innerHeight,document.documentElement.clientHeight)}const Xe=window.innerWidth,Be=ae();O.style.position="fixed",O.style.top="0",O.style.left="0",O.style.width=`${Xe}px`,O.style.height=`${Be}px`,O.style.zIndex="-1";const ve=/^((?!chrome|android).)*safari/i.test(navigator.userAgent),xe=window.innerWidth<640,Ze=1.5,Yt=xe&&!ve;Yt?(O.style.transform=`translateZ(0) scaleX(${Ze})`,O.style.transformOrigin="center center",y.log(`[Background Init] Mobile shader widening enabled: ${Ze}x width`),console.log(`%c[ShaderBackground] Mobile widening ACTIVE - CSS scaleX(${Ze})`,"color: orange; font-weight: bold")):(O.style.transform="translateZ(0)",ve&&xe&&y.log("[Background Init] Safari detected - mobile shader widening DISABLED to prevent stretch")),O.style.transformStyle="preserve-3d",O.style.willChange="transform",window._mobileShaderScale=Yt?Ze:1,window._isSafariBrowser=ve;let j;try{j=new c.WebGLRenderer({canvas:O,alpha:!0,antialias:m.antialias,powerPreference:l==="high"?"high-performance":"default",failIfMajorPerformanceCaveat:!1}),j.setSize(Xe,Be),j.setPixelRatio(m.pixelRatio),y.log("[Background Init] Renderer pixel ratio:",m.pixelRatio)}catch(e){y.error("Failed to create WebGL renderer:",e),y.warn("Falling back to fallback background. WebGL initialization failed."),O.style.display="none",document.body.style.backgroundColor="#1a1a2e",document.body.style.background="linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #1a1a2e 100%)";return}window.shaderBackgroundInitialized=!0,window.addEventListener("beforeunload",e=>{if(window._isMailtoOperation||window._preventBackgroundCleanup){y.log("[Background] Skipping cleanup for mailto/non-navigation action");return}y.log("[Background] Cleaning up resources before page unload"),window.shaderBackgroundRenderer&&window.shaderBackgroundRenderer.pause(),U.isMobile()&&Ee.destroy();const t=Ye.disposeAll();y.log(`[Background] Disposed ${t} Three.js resources`),j&&(j.dispose(),j.forceContextLoss()),Ye.forceGC()}),O.addEventListener("webglcontextlost",function(e){y.warn("WebGL context lost. Attempting to restore..."),e.preventDefault(),window.shaderBackgroundInitialized=!1}),O.addEventListener("webglcontextrestored",function(){setTimeout(()=>{if(!window.shaderBackgroundReinitializing){window.shaderBackgroundReinitializing=!0;try{oi()}catch(e){y.error("Failed to reinitialize shader background after context restore:",e)}finally{window.shaderBackgroundReinitializing=!1}}},100)});const Pe=new c.Scene,bt=new c.Scene;let _e=0;const ne={zoom:2.471,zPosition:1},C=new c.OrthographicCamera(-window.innerWidth/2,window.innerWidth/2,window.innerHeight/2,-window.innerHeight/2,-1e3,1e3);C.position.z=ne.zPosition,C.zoom=ne.zoom,C.updateProjectionMatrix();const we=new c.Group;we.position.y=-322,we.frustumCulled=!0,Pe.add(we);let z,M;const A={enabled:!1,startOpacity:0,endOpacity:1,offsetY:.05,height:2.5,color:"#000000",yOffset:.09};function xo(){z=new c.ShaderMaterial({transparent:!0,uniforms:{startOpacity:{value:A.startOpacity},endOpacity:{value:A.endOpacity},overlayColor:{value:new c.Color(A.color)},offsetY:{value:A.offsetY},heightMultiplier:{value:A.height}},vertexShader:`
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
      `,depthTest:!1,depthWrite:!1,side:c.DoubleSide});const e=window.innerHeight,t=C.right-C.left,i=C.top-C.bottom,n=e*.66*(i/e),s=new c.PlaneGeometry(t,n);M=new c.Mesh(s,z),M.rotation.set(0,0,0),M.position.x=0,M.position.y=A.yOffset*i,M.position.z=-100,M.frustumCulled=!1,M.renderOrder=9999,M.visible=A.enabled,Pe.add(M)}function Le(){if(!M)return;M.rotation.set(0,0,0),M.position.x=0;const e=C.top-C.bottom;M.position.y=A.yOffset*e,M.position.z=-100}xo();const S={visible:!1,scale:25,positionX:0,positionY:-280,positionZ:0,rotationX:0,rotationY:0,rotationZ:0,autoRotate:!0,autoRotateSpeed:.05,baseRotateSpeed:.05,scrollRotateSpeed:.075,responsive:!0,baseScale:25,opacity:0,rotationPaused:!1},jt=new So,Ct=new Mo;Ct.setDecoderPath("https://www.gstatic.com/draco/versioned/decoders/1.5.6/"),Ct.setDecoderConfig({type:"js"}),jt.setDRACOLoader(Ct);let f,St=1;function Fe(e){if(!f)return;St=e;const t=window.innerWidth,i=window._mobileShaderScale||1;if(t<640&&i>1){const s=1/i,r=e*s;f.scale.set(r,e,e),console.log(`%c[Globe Compensation] shaderScale: ${i}, compensation: ${s.toFixed(4)}`,"color: cyan; font-weight: bold"),console.log(`%c[Globe Compensation] Applied scale - X: ${r.toFixed(2)}, Y: ${e.toFixed(2)}, Z: ${e.toFixed(2)}`,"color: cyan"),console.log(`%c[Globe Compensation] Visual after CSS: X: ${(r*i).toFixed(2)}, Y: ${e.toFixed(2)} (should match)`,"color: lime"),y.log(`[Globe] Logical scale: ${e.toFixed(2)}, Applied X: ${r.toFixed(2)} (comp: ${s.toFixed(4)})`)}else f.scale.set(e,e,e)}function Mt(){!f||St<=0||Fe(St)}const Po=l==="low"||U.isAEMEmbedded(),_o=e=>{f=e.scene;let i=new c.Box3().setFromObject(f).getCenter(new c.Vector3),n=new c.Group;n.add(f),f.position.set(-i.x,-i.y,-i.z),f=n,f.visible=S.visible,f.frustumCulled=!0,f.traverse(h=>{h.isMesh&&(h.frustumCulled=!0)}),we.add(f),f.position.set(S.positionX,S.positionY,S.positionZ),f.rotation.set(S.rotationX*Math.PI/180,S.rotationY*Math.PI/180,S.rotationZ*Math.PI/180),S.responsive?(ce(),window.innerWidth<640&&window._mobileShaderScale>1&&setTimeout(()=>{f&&(Mt(),y.log("[Globe] Reapplied scale compensation after delay"))},100)):(Fe(S.scale),Oe());const s=I.addFolder("Material");let r=0;f.traverse(h=>{if(h.isMesh&&h.material){const g=h.material;if(r++,g.isMeshStandardMaterial||g.isMeshPhongMaterial){g.metalness!==void 0&&s.add({metalness:g.metalness},"metalness",0,1).name(`Metalness${r>1?" "+r:""}`).onChange(v=>{g.metalness=v}),g.roughness!==void 0&&s.add({roughness:g.roughness},"roughness",0,1).name(`Roughness${r>1?" "+r:""}`).onChange(v=>{g.roughness=v}),g.shininess!==void 0&&s.add({shininess:g.shininess},"shininess",0,100).name(`Shininess${r>1?" "+r:""}`).onChange(v=>{g.shininess=v}),s.add({opacity:g.opacity},"opacity",0,1).name(`Opacity${r>1?" "+r:""}`).onChange(v=>{g.opacity=v,g.transparent=v<1});const b=g.emissive?"#"+g.emissive.getHexString():"#000000";s.addColor({color:b},"color").name(`Emissive Color${r>1?" "+r:""}`).onChange(v=>{g.emissive&&g.emissive.set(v)})}}})},xt=()=>{const e=ti("globe-hd.glb",Zo);y.log("[Background Init] Loading globe model..."),jt.load(e,_o,t=>{if(t.lengthComputable){const i=t.loaded/t.total*100;i%25===0&&y.log(`[Background Init] Globe loading: ${i.toFixed(0)}%`)}},t=>{y.error("Error loading globe model:",t)})};Po?(y.log("[Background Init] Deferring globe model load for performance"),"requestIdleCallback"in window?requestIdleCallback(()=>xt(),{timeout:2e3}):setTimeout(()=>xt(),1e3)):xt(),window.uniforms={time:{value:0},resolution:{value:new c.Vector2(window.innerWidth,window.innerHeight)},mainSpeed:{value:12e-5},waveSpeed:{value:1},noiseSpeed:{value:.45},colorCycleSpeed:{value:2},colorCycleOffset:{value:0},color1:{value:new c.Color("#e2e2e2")},color2:{value:new c.Color("#515151")},colorDarkness:{value:0},colorWaveInfluence:{value:0},colorFrequencyShift:{value:0},colorAmplitudeEffect:{value:0},waveAmplitude:{value:.8},waveFrequency:{value:4},waveDepth:{value:.6},flowDirection:{value:new c.Vector2(-.7,.82)},noiseScale:{value:2.5},noiseInfluence:{value:0},layerOffset:{value:.4},yOffset:{value:.29},topEdgeSoftness:{value:1},bottomEdgeSoftness:{value:1},leftEdgeSoftness:{value:.2},rightEdgeSoftness:{value:.5},fadeWidth:{value:1},leftCornerRoundness:{value:.8},rightCornerRoundness:{value:1},edgeNoiseAmount:{value:.12},edgeNoiseScale:{value:3},edgeDepth:{value:.9},edgeContrast:{value:2},bottomWaveEnabled:{value:!0},bottomWaveDepth:{value:.117},bottomWaveWidth:{value:6.475},bottomWaveSpeed:{value:0},bottomWaveOffset:{value:-2.207},filmNoiseIntensity:{value:U.isMobile()?0:.056},filmNoiseSpeed:{value:28e-7},filmGrainSize:{value:6},filmScratchIntensity:{value:0},filmGrainEnabled:{value:!U.isMobile()},lightDirection:{value:new c.Vector3(.5,.5,1).normalize()},ambientLight:{value:.6},directionalLight:{value:.6},specularStrength:{value:0},shininess:{value:128},displacementStrength:{value:0},displacementScale:{value:1e-4},displacementDepth:{value:0},xOffset:{value:-.104}};const o=window.uniforms,Xt=()=>{typeof window.gsap<"u"&&window.gsap.ScrollTrigger?(y.log("[Background] GSAP and ScrollTrigger ready, initializing color animations"),yt(window.gsap,window.gsap.ScrollTrigger)):y.warn("GSAP or ScrollTrigger not found on window object - ScrollTrigger animations may not work")};if(window.gsapReady&&window.gsap&&window.gsap.ScrollTrigger)Xt();else{let e=0;const t=20,i=()=>{e++,window.gsapReady&&window.gsap&&window.gsap.ScrollTrigger?Xt():e<t?setTimeout(i,100):y.error("[Background] GSAP not available after waiting - color animations disabled")};setTimeout(i,50)}U.isMobile()&&(Ee.setIntensity(.06),Ee.setOpacity(.8),Ee.start(),U.onScrollStateChange(({isScrolling:e})=>{e?Ee.pauseForScroll():Ee.resumeAfterScroll()}),y.log("[Background Init] Using lightweight mobile film grain with scroll-pause optimization"));const Fo=`
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
  `,zo=`
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
    uniform bool filmGrainEnabled; // Flag to completely disable film grain for performance
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
    
    // Function to generate film grain noise (optimized)
    float filmGrain(vec2 uv, float grainTime) {
      // Single random call instead of two for better performance
      // Pre-multiply by filmGrainSize to reduce per-pixel calculations
      return random(uv * filmGrainSize + grainTime) * 2.0 - 1.0;
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
    
    // Function to apply film noise effects (optimized)
    vec3 applyFilmNoise(vec3 color, vec2 uv) {
      // Early exit if film grain is disabled or intensity is zero
      if (!filmGrainEnabled || (filmNoiseIntensity == 0.0 && filmScratchIntensity == 0.0)) {
        return color;
      }
      
      // Cache time calculation (single operation instead of multiple)
      float grainTime = time * filmNoiseSpeed * 10.0;
      
      // Apply grain only if intensity > 0
      if (filmNoiseIntensity > 0.0) {
        float grain = filmGrain(uv, grainTime);
        color += grain * filmNoiseIntensity;
      }
      
      // Apply scratches only if intensity > 0 (scratches are disabled by default)
      if (filmScratchIntensity > 0.0) {
        float scratches = filmScratches(uv, grainTime * 0.5);
        color += scratches * filmScratchIntensity;
      }
      
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
  `,Oo=new c.PlaneGeometry(window.innerWidth,window.innerHeight,window.innerWidth/10,window.innerHeight/10),Do=new c.ShaderMaterial({vertexShader:Fo,fragmentShader:zo,uniforms:o,transparent:!0,side:c.DoubleSide}),Re=new c.Mesh(Oo,Do);Pe.add(Re),window.gui=new qt({width:300,closed:!0});const d=window.gui;d.domElement.style.position="absolute",d.domElement.style.top="10px",d.domElement.style.right="10px";const Pt=d.domElement.querySelector(".close-button");Pt&&(Pt.innerHTML="Open Controls",Pt.addEventListener("click",function(){setTimeout(()=>{this.innerHTML=d.closed?"Open Controls":"Close Controls"},50)}));const Zt=d.addFolder("Camera Controls");Zt.add(ne,"zoom",.1,5).name("Zoom Level").step(.001).onChange(e=>{C.zoom=e,C.updateProjectionMatrix()}),Zt.close();const ze=d.addFolder("Animation Speed Controls");ze.add(o.mainSpeed,"value",1e-4,.1).name("Main Speed").step(1e-4).onChange(e=>{o.mainSpeed.value=e}),ze.add(o.waveSpeed,"value",1e-4,5).name("Wave Speed").step(1e-4).onChange(e=>{o.waveSpeed.value=e}),ze.add(o.noiseSpeed,"value",1e-4,5).name("Noise Speed").step(1e-4).onChange(e=>{o.noiseSpeed.value=e}),ze.add(o.colorCycleSpeed,"value",1e-6,5).name("Color Cycle Speed").step(1e-6).onChange(e=>{o.colorCycleSpeed.value=e}),ze.add(o.colorCycleOffset,"value",0,6.28).name("Color Cycle Offset").step(.01).onChange(e=>{o.colorCycleOffset.value=e}),ze.open();const ye=d.addFolder("Color Controls"),Ao="#"+o.color1.value.getHexString(),ko="#"+o.color2.value.getHexString();ye.addColor({color:Ao},"color").name("Color 1").onChange(e=>{typeof e=="string"?o.color1.value.set(e):o.color1.value.setRGB(e.r/255,e.g/255,e.b/255)}),ye.addColor({color:ko},"color").name("Color 2").onChange(e=>{typeof e=="string"?o.color2.value.set(e):o.color2.value.setRGB(e.r/255,e.g/255,e.b/255)}),ye.add(o.colorDarkness,"value",0,2).name("Color Darkness").step(.001).onChange(e=>{o.colorDarkness.value=e}),ye.add(o.colorWaveInfluence,"value",0,1).name("Color → Wave Influence").onChange(e=>{o.colorWaveInfluence.value=e}),ye.add(o.colorFrequencyShift,"value",0,1).name("Color → Frequency Effect").onChange(e=>{o.colorFrequencyShift.value=e}),ye.add(o.colorAmplitudeEffect,"value",0,1).name("Color → Amplitude Effect").onChange(e=>{o.colorAmplitudeEffect.value=e}),ye.open();const be=d.addFolder("Wave Controls");be.add(o.waveAmplitude,"value",0,12).step(1e-4).name("Wave Amplitude").onChange(e=>{o.waveAmplitude.value=e}),be.add(o.waveFrequency,"value",.1,5).name("Wave Frequency").onChange(e=>{o.waveFrequency.value=e}),be.add(o.waveDepth,"value",0,1).name("Wave Depth Effect").onChange(e=>{o.waveDepth.value=e}),be.add(o.noiseScale,"value",0,5).name("Noise Scale").onChange(e=>{o.noiseScale.value=e}),be.add(o.noiseInfluence,"value",0,1).name("Noise Influence").onChange(e=>{o.noiseInfluence.value=e}),be.add(o.layerOffset,"value",0,1).name("Layer Depth Offset").onChange(e=>{o.layerOffset.value=e});const Kt=be.addFolder("Flow Direction");Kt.add(o.flowDirection.value,"x",-2,2).name("Horizontal Flow").onChange(e=>{o.flowDirection.value.x=e}),Kt.add(o.flowDirection.value,"y",-2,2).name("Vertical Flow").onChange(e=>{o.flowDirection.value.y=e});const X=d.addFolder("Appearance Controls"),Ke=d.addFolder("Film Noise Controls");Ke.add(o.filmNoiseIntensity,"value",0,1).name("Noise Intensity").onChange(e=>{o.filmNoiseIntensity.value=e}),Ke.add({speed:o.filmNoiseSpeed.value*1e6},"speed",1,8).name("Noise Speed (×1e-6)").step(.1).onChange(e=>{o.filmNoiseSpeed.value=e*1e-6}),Ke.add(o.filmGrainSize,"value",.5,50).name("Grain Size").onChange(e=>{o.filmGrainSize.value=e}),Ke.add(o.filmScratchIntensity,"value",0,.1).name("Scratch Intensity").onChange(e=>{o.filmScratchIntensity.value=e}),X.add(o.xOffset,"value",-1,1).step(.001).name("X Position").onChange(e=>{o.xOffset.value=e}),X.add(o.yOffset,"value",-1,1).step(.001).name("Y Position").onChange(e=>{o.yOffset.value=e}),X.add(o.fadeWidth,"value",.1,1).name("Visible Area Size").onChange(e=>{o.fadeWidth.value=e}),X.add(o.topEdgeSoftness,"value",0,1).name("Top Edge Softness").onChange(e=>{o.topEdgeSoftness.value=e}),X.add(o.bottomEdgeSoftness,"value",0,1).name("Bottom Edge Softness").onChange(e=>{o.bottomEdgeSoftness.value=e}),X.add(o.leftEdgeSoftness,"value",0,1).name("Left Edge Softness").onChange(e=>{o.leftEdgeSoftness.value=e}),X.add(o.rightEdgeSoftness,"value",0,1).name("Right Edge Softness").onChange(e=>{o.rightEdgeSoftness.value=e}),X.add(o.leftCornerRoundness,"value",0,1).name("Left Corner Roundness").onChange(e=>{o.leftCornerRoundness.value=e}),X.add(o.rightCornerRoundness,"value",0,1).name("Right Corner Roundness").onChange(e=>{o.rightCornerRoundness.value=e}),X.add(o.edgeDepth,"value",.1,3).name("Edge Burn-in Depth").onChange(e=>{o.edgeDepth.value=e}),X.add(o.edgeContrast,"value",.5,3).name("Edge Contrast").onChange(e=>{o.edgeContrast.value=e}),X.add(o.edgeNoiseAmount,"value",0,1).name("Edge Noise Amount").onChange(e=>{o.edgeNoiseAmount.value=e}),X.add(o.edgeNoiseScale,"value",.5,10).name("Edge Noise Scale").onChange(e=>{o.edgeNoiseScale.value=e});const Ue=d.addFolder("Bottom Wave Edge Controls");Ue.add(o.bottomWaveEnabled,"value").name("Enable Bottom Wave").onChange(e=>{o.bottomWaveEnabled.value=e,f&&S.responsive&&Oe()}),Ue.add(o.bottomWaveDepth,"value",0,.5).name("Wave Depth").step(.001).onChange(e=>{o.bottomWaveDepth.value=e,f&&S.responsive&&Oe()}),Ue.add(o.bottomWaveWidth,"value",1,20).name("Wave Width").step(.001).onChange(e=>{o.bottomWaveWidth.value=e}),Ue.add(o.bottomWaveSpeed,"value",0,5).name("Wave Speed").step(.001).onChange(e=>{o.bottomWaveSpeed.value=e}),Ue.add(o.bottomWaveOffset,"value",-5,5).name("Wave Offset").step(.001).onChange(e=>{o.bottomWaveOffset.value=e});const Ve=d.addFolder("Lighting Controls");Ve.add(o.ambientLight,"value",0,1).name("Ambient Light").onChange(e=>{o.ambientLight.value=e}),Ve.add(o.directionalLight,"value",0,1).name("Directional Light").step(.001).onChange(e=>{o.directionalLight.value=e}),Ve.add(o.specularStrength,"value",0,1).step(.001).name("Specular Strength").onChange(e=>{o.specularStrength.value=e}),Ve.add(o.shininess,"value",1,128).name("Shininess").onChange(e=>{o.shininess.value=e});const _t=Ve.addFolder("Light Direction");_t.add(o.lightDirection.value,"x",-1,1).name("X").onChange(()=>{o.lightDirection.value.normalize()}),_t.add(o.lightDirection.value,"y",-1,1).name("Y").onChange(()=>{o.lightDirection.value.normalize()}),_t.add(o.lightDirection.value,"z",0,1).name("Z").onChange(()=>{o.lightDirection.value.normalize()});const I=d.addFolder("Globe Model Controls"),Je=new c.DirectionalLight(16777215,10);Je.position.set(1,1,1),Pe.add(Je);const Ft=new c.AmbientLight(16777215,.5);Pe.add(Ft);const Jt=I.addFolder("Lighting");Jt.add({intensity:3},"intensity",0,5).name("Direct Light").onChange(e=>{Je.intensity=e}),Je.intensity=3,Jt.add({intensity:Ft.intensity},"intensity",0,5).name("Ambient Light").onChange(e=>{Ft.intensity=e}),I.add(S,"visible").name("Show Globe").onChange(e=>{f&&(f.visible=e)}),I.add(S,"scale",.1,50).name("Size").step(.1).onChange(e=>{f&&(S.baseScale=e,Fe(e))}),I.add(S,"responsive").name("Responsive Size").onChange(e=>{!e&&f?Fe(S.baseScale):e&&ce()}),I.add({resizeGlobe:function(){f&&ce()}},"resizeGlobe").name("Force Resize"),I.add({positionBehindWave:function(){f&&Oe()}},"positionBehindWave").name("Position Behind Wave");function Oe(){if(!f)return;const e=window.innerWidth;if(e<=768){f.position.y=0,f.position.z=-10;for(let n=0;n<Q.__controllers.length;n++){const s=Q.__controllers[n];s.property==="positionY"?s.setValue(0):s.property==="positionZ"&&s.setValue(-10)}return}if(e>768&&e<=1024){f.position.y=192,f.position.z=-10;for(let s=0;s<Q.__controllers.length;s++){const r=Q.__controllers[s];r.property==="positionY"?r.setValue(192):r.property==="positionZ"&&r.setValue(-10)}return}const t=-40,i=-10;f.position.y=t,f.position.z=i;for(let n=0;n<Q.__controllers.length;n++){const s=Q.__controllers[n];s.property==="positionY"?s.setValue(t):s.property==="positionZ"&&s.setValue(i)}}function ce(){if(!f||!S.responsive)return;const e=window.innerWidth;if(e>1024){Fe(40);for(let s=0;s<I.__controllers.length;s++)if(I.__controllers[s].property==="scale"){I.__controllers[s].setValue(40);break}Oe();return}let t;e<=768?t=e*1.2:t=e*.9;const i={x:f.scale.x,y:f.scale.y,z:f.scale.z};try{f.scale.set(1,1,1),f.updateMatrixWorld(!0);const n=new c.Box3().setFromObject(f),s=n.max.x-n.min.x;f.scale.set(i.x,i.y,i.z);const h=(C.right-C.left)/C.zoom/e,b=t*h/s;Fe(b);for(let v=0;v<I.__controllers.length;v++)if(I.__controllers[v].property==="scale"){I.__controllers[v].setValue(b);break}Oe()}catch(n){y.error("Error updating globe size:",n),f.scale.set(i.x,i.y,i.z)}}const Q=I.addFolder("Position");Q.add(S,"positionX",-500,500).name("X Position").step(1).onChange(e=>{f&&(f.position.x=e)}),Q.add(S,"positionY",-500,500).name("Y Position").step(1).onChange(e=>{f&&(f.position.y=e)}),Q.add(S,"positionZ",-500,500).name("Z Position").step(1).onChange(e=>{f&&(f.position.z=e)});const zt=I.addFolder("Rotation");zt.add(S,"rotationX",0,360).name("X Rotation").step(1).onChange(e=>{f&&(f.rotation.x=e*Math.PI/180)}),zt.add(S,"rotationY",0,360).name("Y Rotation").step(1).onChange(e=>{f&&(f.rotation.y=e*Math.PI/180)}),zt.add(S,"rotationZ",0,360).name("Z Rotation").step(1).onChange(e=>{f&&(f.rotation.z=e*Math.PI/180)}),I.add(S,"autoRotate").name("Auto Rotate").onChange(e=>{S.autoRotate=e}),I.add(S,"baseRotateSpeed",.05,1).name("Base Rotation Speed").step(.01).onChange(e=>{S.baseRotateSpeed=e}),I.add(S,"scrollRotateSpeed",.05,1).name("Scroll Rotation Speed").step(.01).onChange(e=>{S.scrollRotateSpeed=e}),I.open();const re=d.addFolder("Gradient Overlay Controls");re.add(A,"enabled").name("Show Overlay").onChange(e=>{M&&(M.visible=e)});const To=re.add(A,"startOpacity",0,1).name("Top Opacity").step(.01).onChange(e=>{z&&(z.uniforms.startOpacity.value=e)});To.__li.querySelector(".property-name").innerHTML="Top Opacity (Top Edge)";const Wo=re.add(A,"endOpacity",0,1).name("Bottom Opacity").step(.01).onChange(e=>{z&&(z.uniforms.endOpacity.value=e)});Wo.__li.querySelector(".property-name").innerHTML="Bottom Opacity (Bottom Edge)",re.add(A,"yOffset",-2,2).name("Vertical Position (moves only)").step(.01).onChange(e=>{M&&Le()}),re.add(A,"offsetY",-1,1).name("Gradient Shift").step(.01).onChange(e=>{z&&(z.uniforms.offsetY.value=e)}),re.add(A,"height",.1,5).name("Gradient Distribution (not size)").step(.1).onChange(e=>{z&&(z.uniforms.heightMultiplier.value=e)}),re.addColor(A,"color").name("Color").onChange(e=>{z&&z.uniforms.overlayColor.value.set(e)}),re.add({debugOverlay:function(){if(z){const e=z.uniforms.startOpacity.value,t=z.uniforms.endOpacity.value;z.uniforms.startOpacity.value=1,z.uniforms.endOpacity.value=1,z.uniforms.overlayColor.value.set("#FF00FF"),setTimeout(()=>{z.uniforms.startOpacity.value=e,z.uniforms.endOpacity.value=t,z.uniforms.overlayColor.value.set(A.color)},2e3)}}},"debugOverlay").name("Debug Visibility"),re.open();let T=m.particleCount;y.log("[Background Init] Using particle count:",T);let te=new Float32Array(T*3),K=new Float32Array(T*3),B=new Float32Array(T*3),Ot=0,Dt=0;const p={scrollSpeed:.005,verticalSpread:1,horizontalSpread:.56,damping:.95,depthRange:1e3,sizeMin:1.1,sizeMax:4,floatSpeed:.8,verticalOffset:0};let J=window.innerHeight*p.verticalSpread,oe=window.innerWidth*p.horizontalSpread;function De(){const e=new Float32Array(T),t=new c.Color(et.color);for(let i=0;i<T;i++){const n=i*3,s=Math.random(),r=p.sizeMin+s*(p.sizeMax-p.sizeMin);e[i]=r/P.uniforms.baseSize.value;const h=.8+s*.6;B[n]=t.r*h,B[n+1]=t.g*h,B[n+2]=t.b*h}F.setAttribute("size",new c.BufferAttribute(e,1)),F.attributes.position.needsUpdate=!0,F.attributes.color.needsUpdate=!0,F.attributes.size.needsUpdate=!0}for(let e=0;e<T;e++){const t=e*3;te[t]=(Math.random()-.5)*oe,te[t+1]=(Math.random()-.5)*J+p.verticalOffset,te[t+2]=Math.random()*500-250,K[t]=(Math.random()-.5)*.5,K[t+1]=(Math.random()-.5)*.5,K[t+2]=(Math.random()-.5)*.2;const i=new c.Color("#25e5ff");B[t]=i.r,B[t+1]=i.g,B[t+2]=i.b}const F=new c.BufferGeometry;F.setAttribute("position",new c.BufferAttribute(te,3)),F.setAttribute("color",new c.BufferAttribute(B,3)),Ye.track(F,"geometry");const At=Eo();Ye.track(At,"texture");function Eo(){const e=document.createElement("canvas");e.width=256,e.height=256;const t=e.getContext("2d"),i=t.createRadialGradient(e.width/2,e.height/2,0,e.width/2,e.height/2,e.width/2);i.addColorStop(0,"rgba(255, 255, 255, 1.0)"),i.addColorStop(.05,"rgba(255, 255, 255, 1.0)"),i.addColorStop(.2,"rgba(255, 255, 255, 0.9)"),i.addColorStop(.4,"rgba(255, 255, 255, 0.5)"),i.addColorStop(.6,"rgba(255, 255, 255, 0.3)"),i.addColorStop(.8,"rgba(255, 255, 255, 0.1)"),i.addColorStop(1,"rgba(255, 255, 255, 0)"),t.fillStyle=i,t.fillRect(0,0,e.width,e.height),t.beginPath(),t.moveTo(e.width/2,e.width*.3),t.lineTo(e.width/2,e.width*.7),t.moveTo(e.width*.3,e.height/2),t.lineTo(e.width*.7,e.height/2),t.moveTo(e.width*.35,e.height*.35),t.lineTo(e.width*.65,e.height*.65),t.moveTo(e.width*.65,e.height*.35),t.lineTo(e.width*.35,e.height*.65),t.strokeStyle="rgba(255, 255, 255, 1.0)",t.lineWidth=4,t.stroke();const n=t.createRadialGradient(e.width/2,e.height/2,e.width*.2,e.width/2,e.height/2,e.width*.7);n.addColorStop(0,"rgba(255, 255, 255, 0.3)"),n.addColorStop(.5,"rgba(255, 255, 255, 0.1)"),n.addColorStop(1,"rgba(255, 255, 255, 0)"),t.globalCompositeOperation="lighter",t.fillStyle=n,t.fillRect(0,0,e.width,e.height);const s=new c.Texture(e);return s.needsUpdate=!0,s}const Qt=window.innerWidth<640&&window._mobileShaderScale>1?1/window._mobileShaderScale:1,P=new c.ShaderMaterial({uniforms:{baseSize:{value:6},opacity:{value:0},map:{value:At},brightness:{value:1.4},haloStrength:{value:1.4},haloSize:{value:1.3},aspectCompensation:{value:Qt}},vertexShader:`
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
      uniform float aspectCompensation; // 1.0 = no compensation, < 1.0 = squish X to counteract CSS stretch
      
      varying vec3 vColor;
      varying float vSize;
      
      void main() {
        // Compensate for CSS scaleX stretch by squishing UV coordinates in X
        // When CSS applies scaleX(1.5), we need to use aspectCompensation = 0.667
        // This makes the particle appear circular despite the stretched canvas
        vec2 compensatedUV = gl_PointCoord - 0.5;
        compensatedUV.x *= (1.0 / aspectCompensation); // Stretch X in UV space to counteract CSS squish
        
        // Calculate distance from center using compensated coordinates
        float dist = length(compensatedUV) * 2.0; // 0 at center, 1 at edge
        
        // Sample the texture with compensated UVs
        vec2 texUV = compensatedUV + 0.5;
        vec4 texColor = texture2D(map, texUV);
        
        // Discard pixels outside the circular area (important for stretched particles)
        if (dist > 1.0) discard;
        
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
    `,transparent:!0,blending:c.AdditiveBlending,depthWrite:!1,depthTest:!1}),Qe=new c.Points(F,P);Qe.frustumCulled=!0,bt.add(Qe);function kt(){const e=window.innerWidth,t=window._mobileShaderScale||1;if(e<640&&t>1){const n=1/t;Qe.scale.set(n,1,1),P.uniforms.aspectCompensation.value=n,console.log(`%c[Particles] Applied compensation: scale=${n.toFixed(4)}, shader=${n.toFixed(4)}`,"color: cyan")}else Qe.scale.set(1,1,1),P.uniforms.aspectCompensation.value=1}kt();const L=d.addFolder("Particle System"),Io={count:T};L.add(Io,"count",100,1e3,10).name("Particle Count").onChange(e=>{T=Math.floor(e);const t=new Float32Array(T*3),i=new Float32Array(T*3),n=new Float32Array(T*3);for(let s=0;s<T;s++){const r=s*3;if(s<te.length/3)t[r]=te[r],t[r+1]=te[r+1],t[r+2]=te[r+2],i[r]=K[r],i[r+1]=K[r+1],i[r+2]=K[r+2],n[r]=B[r],n[r+1]=B[r+1],n[r+2]=B[r+2];else{t[r]=(Math.random()-.5)*oe,t[r+1]=(Math.random()-.5)*J+p.verticalOffset,t[r+2]=Math.random()*500-250,i[r]=(Math.random()-.5)*.5,i[r+1]=(Math.random()-.5)*.5,i[r+2]=(Math.random()-.5)*.2;const h=new c.Color(et.color);n[r]=h.r,n[r+1]=h.g,n[r+2]=h.b}}te=t,K=i,B=n,F.attributes.position&&(F.attributes.position.array=null),F.attributes.color&&(F.attributes.color.array=null),F.setAttribute("position",new c.BufferAttribute(te,3)),F.setAttribute("color",new c.BufferAttribute(B,3)),F.attributes.position.needsUpdate=!0,F.attributes.color.needsUpdate=!0,De()});const et={color:"#25e5ff"};L.addColor(et,"color").name("Particle Color").onChange(e=>{const t=new c.Color(e);for(let i=0;i<T;i++){const n=i*3;B[n]=t.r,B[n+1]=t.g,B[n+2]=t.b}F.attributes.color?(F.attributes.color.array.set(B),F.attributes.color.needsUpdate=!0):F.setAttribute("color",new c.BufferAttribute(B,3))}),L.add(P.uniforms.baseSize,"value",2,15,.5).name("Base Particle Size").onChange(e=>{De()}),L.add(P.uniforms.opacity,"value",0,1,.1).name("Opacity"),L.add(P.uniforms.brightness,"value",1,3,.1).name("Brightness").onChange(e=>{P.uniforms.brightness.value=e});const Bo={intensity:1.5};L.add(Bo,"intensity",.1,3,.1).name("Sparkle Intensity").onChange(e=>{P.uniforms.opacity.value=e});const Lo={enabled:!1},Ro=L.add(Lo,"enabled").name("Size Attenuation").onChange(e=>{e?P.vertexShader=`
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
        `:P.vertexShader=`
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
        `,P.needsUpdate=!0,De()}),H=document.createElement("div");H.className="gui-tooltip",H.textContent="When enabled, particles appear smaller as they move further away",H.style.position="absolute",H.style.backgroundColor="rgba(0,0,0,0.8)",H.style.color="#fff",H.style.padding="5px",H.style.borderRadius="3px",H.style.fontSize="11px",H.style.zIndex="10000",H.style.display="none",document.body.appendChild(H);const Tt=Ro.domElement;Tt.addEventListener("mouseenter",e=>{const t=Tt.getBoundingClientRect();H.style.left=t.right+"px",H.style.top=t.top+"px",H.style.display="block"}),Tt.addEventListener("mouseleave",()=>{H.style.display="none"});let eo=0;window.addEventListener("scroll",()=>{Ot=window.scrollY});let V=[],$={x:0,y:0},tt={x:0,y:0},to=0,Ae=0,fe=!1,ot=250,q=[],oo=10,se,le=!1,de=[];const u={enabled:!1,mobileDisabled:/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)||window.innerWidth<=768||window.matchMedia&&window.matchMedia("(hover: none)").matches||"ontouchstart"in window||!m.mouseParticles,spawnRate:l==="high"?.52:l==="medium"?.35:0,maxParticles:l==="high"?150:l==="medium"?75:0,baseSize:1.9,fadeInSpeed:.62,fadeOutSpeed:.88,trailLength:5e-4,speedVariation:.2,jitterAmount:.08,spawnOffsetMin:.08,spawnOffsetMax:.8,minLifetime:1.5,maxLifetime:3.5,drawnLife:12};se=u.spawnOffsetMin,window.enableMouseParticles=function(){u.mobileDisabled||(u.enabled=!0)};const k=new c.BufferGeometry;Ye.track(k,"geometry");const it=new c.ShaderMaterial({uniforms:{baseSize:{value:u.baseSize},map:{value:At},brightness:{value:1.4},haloStrength:{value:1.4},haloSize:{value:1.3},aspectCompensation:{value:Qt}},vertexShader:`
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
      uniform float aspectCompensation;
      
      varying vec3 vColor;
      varying float vOpacity;
      
      void main() {
        // Compensate for CSS scaleX stretch by adjusting UV coordinates
        vec2 compensatedUV = gl_PointCoord - 0.5;
        compensatedUV.x *= (1.0 / aspectCompensation);
        
        // Calculate distance using compensated coordinates
        float dist = length(compensatedUV) * 2.0;
        
        // Sample the texture with compensated UVs
        vec2 texUV = compensatedUV + 0.5;
        vec4 texColor = texture2D(map, texUV);
        
        // Discard pixels outside the circular area
        if (dist > 1.0) discard;
        
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
    `,transparent:!0,blending:c.AdditiveBlending,depthWrite:!1,depthTest:!1}),Wt=new c.Points(k,it);bt.add(Wt);function Et(){const e=window.innerWidth,t=window._mobileShaderScale||1;if(e<640&&t>1){const n=1/t;Wt.scale.set(n,1,1),it.uniforms.aspectCompensation.value=n}else Wt.scale.set(1,1,1),it.uniforms.aspectCompensation.value=1}Et();function Ge(e,t){const i=e/window.innerWidth*2-1,n=-(t/window.innerHeight)*2+1,s=i*(C.right-C.left)/2/C.zoom,r=n*(C.top-C.bottom)/2/C.zoom;return{x:s,y:r}}function io(e,t){return{id:to++,position:{x:e,y:t,z:Math.random()*100-50},targetPosition:{x:e,y:t},velocity:{x:0,y:0},size:.8+Math.random()*.4,opacity:0,targetOpacity:1,life:0,maxLife:u.minLifetime+Math.random()*(u.maxLifetime-u.minLifetime),color:{r:.145,g:.898,b:1},trailSpeed:.05+Math.random()*.03,fadePhase:"in"}}function ao(e,t){return{id:to++,position:{x:e,y:t,z:Math.random()*100-50},originalPosition:{x:e,y:t},targetPosition:{x:e,y:t},velocity:{x:0,y:0},size:.8+Math.random()*.4,opacity:0,baseOpacity:0,targetOpacity:1,life:0,maxLife:u.drawnLife,color:{r:1,g:.647,b:0},trailSpeed:0,fadePhase:"in",isDrawn:!0,twinklePhase:Math.random()*Math.PI*2,twinkleSpeed:.8+Math.random()*.4,twinkleRadius:2+Math.random()*3}}let at=0;function nt(){const e=[...V,...de],t=e.length;if(t===0){if(at===0)return;k.deleteAttribute("position"),k.deleteAttribute("color"),k.deleteAttribute("size"),k.deleteAttribute("opacity"),at=0;return}const i=new Float32Array(t*3),n=new Float32Array(t*3),s=new Float32Array(t),r=new Float32Array(t);for(let g=0;g<t;g++){const b=e[g],v=g*3;i[v]=b.position.x,i[v+1]=b.position.y,i[v+2]=b.position.z,n[v]=b.color.r,n[v+1]=b.color.g,n[v+2]=b.color.b,s[g]=b.size,r[g]=b.opacity}t!==at?(k.attributes.position&&(k.deleteAttribute("position"),k.deleteAttribute("color"),k.deleteAttribute("size"),k.deleteAttribute("opacity")),k.setAttribute("position",new c.BufferAttribute(i,3)),k.setAttribute("color",new c.BufferAttribute(n,3)),k.setAttribute("size",new c.BufferAttribute(s,1)),k.setAttribute("opacity",new c.BufferAttribute(r,1)),at=t):(k.attributes.position.array.set(i),k.attributes.color.array.set(n),k.attributes.size.array.set(s),k.attributes.opacity.array.set(r),k.attributes.position.needsUpdate=!0,k.attributes.color.needsUpdate=!0,k.attributes.size.needsUpdate=!0,k.attributes.opacity.needsUpdate=!0)}window.addEventListener("mousemove",e=>{if(!u.enabled||u.mobileDisabled)return;tt.x=$.x,tt.y=$.y,$.x=e.clientX,$.y=e.clientY;const t=$.x-tt.x,i=$.y-tt.y,n=Math.sqrt(t*t+i*i);if(fe||(Ae+=n,Ae>=ot&&(fe=!0)),q.push(n),q.length>oo&&q.shift(),q.length>0){const s=q.reduce((g,b)=>g+b,0)/q.length,h=Math.min(s/20,1);se=u.spawnOffsetMin+(u.spawnOffsetMax-u.spawnOffsetMin)*h}if(fe&&n>1&&V.length<u.maxParticles&&Math.random()<u.spawnRate){const s=Ge($.x,$.y),r=se*50,h=Math.random()*Math.PI*2,g=Math.cos(h)*r*Math.random(),b=Math.sin(h)*r*Math.random(),v=io(s.x+g,s.y+b);V.push(v)}if(le&&V.length<u.maxParticles&&Math.random()<.8){const s=Ge($.x,$.y),r=10,h=Math.random()*Math.PI*2,g=Math.cos(h)*r*Math.random(),b=Math.sin(h)*r*Math.random(),v=ao(s.x+g,s.y+b);de.push(v)}}),window.addEventListener("mousedown",e=>{!u.enabled||u.mobileDisabled||e.button===0&&(le=!0)}),window.addEventListener("mouseup",e=>{e.button===0&&(le=!1)});let ke={x:0,y:0},G={x:0,y:0},rt=!1;window.addEventListener("touchstart",e=>{if(!u.enabled||u.mobileDisabled)return;const t=e.target;t.tagName==="BUTTON"||t.tagName==="A"||t.closest("button")||t.closest("a")||t.closest("header")||t.closest("nav")||e.preventDefault();const n=e.touches[0];G.x=n.clientX,G.y=n.clientY,ke.x=G.x,ke.y=G.y,rt=!0,le=!0},{passive:!1}),window.addEventListener("touchmove",e=>{if(!u.enabled||u.mobileDisabled||!rt)return;const t=e.target;t.tagName==="BUTTON"||t.tagName==="A"||t.closest("button")||t.closest("a")||t.closest("header")||t.closest("nav")||e.preventDefault();const n=e.touches[0];ke.x=G.x,ke.y=G.y,G.x=n.clientX,G.y=n.clientY,$.x=G.x,$.y=G.y;const s=G.x-ke.x,r=G.y-ke.y,h=Math.sqrt(s*s+r*r);if(fe||(Ae+=h,Ae>=ot&&(fe=!0)),q.push(h),q.length>oo&&q.shift(),q.length>0){const g=q.reduce((ee,Z)=>ee+Z,0)/q.length,v=Math.min(g/20,1);se=u.spawnOffsetMin+(u.spawnOffsetMax-u.spawnOffsetMin)*v}if(fe&&h>1&&V.length<u.maxParticles&&Math.random()<u.spawnRate){const g=Ge(G.x,G.y),b=se*50,v=Math.random()*Math.PI*2,ee=Math.cos(v)*b*Math.random(),Z=Math.sin(v)*b*Math.random(),Y=io(g.x+ee,g.y+Z);V.push(Y)}if(le&&V.length<u.maxParticles&&Math.random()<.8){const g=Ge(G.x,G.y),b=10,v=Math.random()*Math.PI*2,ee=Math.cos(v)*b*Math.random(),Z=Math.sin(v)*b*Math.random(),Y=ao(g.x+ee,g.y+Z);de.push(Y)}},{passive:!1}),window.addEventListener("touchend",e=>{rt=!1,le=!1}),window.addEventListener("touchcancel",e=>{rt=!1,le=!1});function Uo(){if(V.length===0&&de.length===0||u.mobileDisabled)return;const e=Ge($.x,$.y);for(let t=V.length-1;t>=0;t--){const i=V[t];if(i.life+=.016,!i.isDrawn){i.targetPosition.x=e.x,i.targetPosition.y=e.y;const s=i.trailSpeed*u.trailLength;i.position.x+=(i.targetPosition.x-i.position.x)*s,i.position.y+=(i.targetPosition.y-i.position.y)*s,i.position.x+=(Math.random()-.5)*2*u.jitterAmount,i.position.y+=(Math.random()-.5)*2*u.jitterAmount}const n=i.life/i.maxLife;if(n<.15){i.fadePhase="in";const s=n/.15,r=1-Math.pow(1-s,2);i.opacity=r*u.fadeInSpeed}else if(n<.65)i.fadePhase="hold",i.opacity=u.fadeInSpeed;else{i.fadePhase="out";const s=(n-.65)/.35,r=Math.pow(1-s,2);i.opacity=r*u.fadeInSpeed*u.fadeOutSpeed}(i.life>=i.maxLife||i.opacity<=0)&&V.splice(t,1)}for(let t=de.length-1;t>=0;t--){const i=de[t];i.life+=.016,i.twinklePhase+=.016*i.twinkleSpeed;const n=Math.sin(i.twinklePhase)*i.twinkleRadius*.4,s=Math.cos(i.twinklePhase*1.05)*i.twinkleRadius*.4;i.position.x=i.originalPosition.x+n,i.position.y=i.originalPosition.y+s;const r=i.life/i.maxLife;if(r<.15){i.fadePhase="in";const g=r/.15,b=1-Math.pow(1-g,2);i.baseOpacity=b*u.fadeInSpeed}else if(r<.85)i.fadePhase="hold",i.baseOpacity=u.fadeInSpeed;else{i.fadePhase="out";const g=(r-.85)/.15,b=Math.pow(1-g,2);i.baseOpacity=b*u.fadeInSpeed*u.fadeOutSpeed}const h=.7+.3*Math.sin(i.twinklePhase*2);i.opacity=i.baseOpacity*h,(i.life>=i.maxLife||i.opacity<=0)&&de.splice(t,1)}nt(),no.currentOffset=se}const R=d.addFolder("Mouse Follow Particles");R.add({mobileDetected:u.mobileDisabled},"mobileDetected").name("Mobile Detected (Disabled)").listen(),R.add(u,"enabled").name("Enable Mouse Particles").onChange(e=>{e||(V=[],de=[],nt(),fe=!1,Ae=0,q=[],se=u.spawnOffsetMin,le=!1)}),R.add(u,"spawnRate",.1,1,.1).name("Spawn Rate").onChange(e=>{u.spawnRate=e}),R.add(u,"maxParticles",10,50,1).name("Max Particles").onChange(e=>{for(u.maxParticles=e;V.length>e;)V.pop();nt()}),R.add(u,"baseSize",2,10,.5).name("Particle Size").onChange(e=>{it.uniforms.baseSize.value=e}),R.add(u,"trailLength",.1,1,.1).name("Trail Length").onChange(e=>{u.trailLength=e}),R.add(u,"speedVariation",0,1,.1).name("Speed Variation").onChange(e=>{u.speedVariation=e}),R.add(u,"jitterAmount",0,1,.05).name("Jitter Amount").onChange(e=>{u.jitterAmount=e}),R.add(u,"spawnOffsetMin",0,1,.05).name("Spawn Offset Min").onChange(e=>{u.spawnOffsetMin=e}),R.add(u,"spawnOffsetMax",0,1,.05).name("Spawn Offset Max").onChange(e=>{u.spawnOffsetMax=e});const no={currentOffset:se};R.add(no,"currentOffset",0,1).name("Current Offset (Dynamic)").listen(),R.add(u,"fadeInSpeed",.1,1,.01).name("Max Opacity").onChange(e=>{u.fadeInSpeed=e}),R.add(u,"fadeOutSpeed",.1,1,.01).name("Fade Strength").onChange(e=>{u.fadeOutSpeed=e}),R.add(u,"drawnLife",1,10,.1).name("Drawn Particle Life").onChange(e=>{u.drawnLife=e}),R.add({movementThreshold:ot},"movementThreshold",100,400,10).name("Initial Movement Needed").onChange(e=>{ot=e}),R.add({resetActivation:function(){fe=!1,Ae=0,q=[],se=u.spawnOffsetMin,V=[],de=[],le=!1,nt()}},"resetActivation").name("Reset Activation"),R.close();function Vo(){const e=F.attributes.position.array,t=p.previousOffset||0,i=p.verticalOffset-t;p.previousOffset=p.verticalOffset;for(let n=0;n<T;n++){const s=n*3;e[s+1]+=i;const r=e[s+1]-p.verticalOffset,h=J/2;r>h?e[s+1]=-h+p.verticalOffset:r<-h&&(e[s+1]=h+p.verticalOffset)}F.attributes.position.needsUpdate=!0}const st=new c.Color,He=U.isMobile();let It=!1;const ro=He?20:40,Go=He?15:20;let Bt=1e3/ro,so=0,Lt=0;const Ho=He?4:2;U.onScrollStateChange(({isScrolling:e})=>{It=e,Bt=1e3/(e?Go:ro)});function lo(){requestAnimationFrame(lo);const e=performance.now(),t=e-so;if(t<Bt||document.hidden||window.backgroundPaused)return;so=e-t%Bt;const i=F.attributes.position.array,n=F.attributes.color.array,s=F.attributes.size?F.attributes.size.array:null;eo+=.01;const r=(Ot-Dt)*p.scrollSpeed;Dt=Ot*(1-p.damping)+Dt*p.damping;const h=He&&It&&m.skipParticleUpdatesOnScroll;if(!window.particlesMovementPaused){for(let b=0;b<T;b++){const v=b*3,ee=s?(s[b]-p.sizeMin)/(p.sizeMax-p.sizeMin):.5;if(!h){const $e=p.floatSpeed*(.5+ee*.5);i[v]+=K[v]*$e,i[v+1]+=K[v+1]*$e,i[v+2]+=K[v+2]*$e}i[v+1]+=r*(.5+ee*.5),Math.abs(i[v])>oe/2&&(K[v]*=-1);const Z=i[v+1]-p.verticalOffset,Y=J/2;Z>Y?i[v+1]=-Y+p.verticalOffset:Z<-Y&&(i[v+1]=Y+p.verticalOffset),Math.abs(i[v+2])>250&&(K[v+2]*=-1)}F.attributes.position.needsUpdate=!0}if(Lt++,!It||!He||Lt>=Ho){Lt=0,st.set(et.color);for(let b=0;b<T;b++){const v=b*3,ee=s?(s[b]-p.sizeMin)/(p.sizeMax-p.sizeMin):.5,Z=.2*Math.sin(eo+b*.1)+.9,Y=.8+ee*.6;n[v]=st.r*Z*Y,n[v+1]=st.g*Z*Y,n[v+2]=st.b*Z*Y}F.attributes.color.needsUpdate=!0}}lo();const Te=U.isMobile();let We=!1;Te&&U.onScrollStateChange(({isScrolling:e})=>{We=e});function No(e){if(window.backgroundPaused)return;const t=Te?We?5e-5:5e-4:.001;if(o.time.value+=t,pe()&&Date.now()-x>he){const r=o.time.value+o.colorCycleOffset.value;o.colorCycleOffset.value=r,o.time.value=0,x=Date.now()}Te&&We||Uo(),Te&&We||(!window.particlesFullyHidden&&P.uniforms.opacity.value<_e&&(P.uniforms.opacity.value+=.001,P.uniforms.opacity.value>_e&&(P.uniforms.opacity.value=_e)),window.particlesFullyHidden&&P.uniforms.opacity.value>0&&(P.uniforms.opacity.value=0));const n=Te&&We;if(f&&S.autoRotate&&!S.rotationPaused&&!n){const s=S.baseRotateSpeed;f.rotation.y+=s*.01}M&&!(Te&&We)&&(M.rotation.set(0,0,0),Le()),j.autoClear=!0,j.render(Pe,C),(!window.particlesFullyHidden||V.length>0&&u.enabled)&&(j.autoClear=!1,j.render(bt,C))}const lt=new Jo;window.shaderBackgroundPerfMonitor=lt,new URLSearchParams(window.location.search).has("debugPerf")&&(lt.createDebugOverlay(),y.log("[Background Init] Full performance monitoring enabled")),lt.setWarningCallback(e=>{y.warn("[Performance Warning]",e)});const dt=new Ko(e=>{No(),lt.update(j)},m.targetFPS);dt.start(),window.shaderBackgroundRenderer=dt,Object.defineProperty(window,"backgroundPaused",{get(){return this._backgroundPaused||!1},set(e){this._backgroundPaused=e,dt&&dt.setPausedByTimeline(e)}}),window.addEventListener("timeline:backgroundPaused",e=>{o&&o.filmGrainEnabled&&(o.filmGrainEnabled.value=!e.detail.paused)}),document.addEventListener("veryEarlyParticleFade",()=>{_e=.3,P&&P.uniforms&&P.uniforms.opacity&&P.uniforms.opacity.value<.1&&(P.uniforms.opacity.value=.05)}),document.addEventListener("particleFadeStart",()=>{_e=.3}),document.addEventListener("heroAnimationComplete",()=>{_e=.5});function ct(){if(M){const e=window.innerHeight,t=C.right-C.left,n=(C.top-C.bottom)/e,s=t,r=e*.66*n;M.geometry.dispose(),M.geometry=new c.PlaneGeometry(s,r),M.rotation.set(0,0,0),Le()}}let ft,ie;const Rt=1.5;function Ne(){const e=window.innerWidth,t=ae();O.style.width=`${e}px`,O.style.height=`${t}px`;const i=e<640,n=window._mobileShaderScale&&window._mobileShaderScale>1,s=window._isSafariBrowser;if(i&&!n&&!s?(O.style.transform=`translateZ(0) scaleX(${Rt})`,O.style.transformOrigin="center center",window._mobileShaderScale=Rt,y.log(`[Background Resize] Mobile shader widening enabled: ${Rt}x width`),Mt(),kt(),Et()):!i&&n&&(O.style.transform="translateZ(0)",window._mobileShaderScale=1,y.log("[Background Resize] Mobile shader widening disabled"),Mt(),kt(),Et()),j.setSize(e,t),C.left=-e/2,C.right=e/2,C.top=t/2,C.bottom=-t/2,C.updateProjectionMatrix(),o.resolution.value.set(e,t),Re.geometry.dispose(),Re.geometry=new c.PlaneGeometry(e,t,e/10,t/10),J=t*p.verticalSpread,oe=e*p.horizontalSpread,typeof d<"u"&&d&&d.__folders["Particle System"]){const r=d.__folders["Particle System"];if(r&&r.__controllers){for(let h=0;h<r.__controllers.length;h++)if(r.__controllers[h].property==="verticalOffset"){r.__controllers[h].min(-t*3),r.__controllers[h].max(t*2);break}}}if(f&&S.responsive){clearTimeout(ie),ie=setTimeout(()=>{ce()},150);for(let r=0;r<Q.__controllers.length;r++){const h=Q.__controllers[r];h.property==="positionX"?(h.min(-e/2),h.max(e/2)):h.property==="positionY"&&(h.min(-t/2),h.max(t/2))}}ct()}window.addEventListener("resize",()=>{clearTimeout(ft),clearTimeout(ie),f&&S.responsive&&(ie=setTimeout(()=>{ce()},150)),ft=setTimeout(Ne,150)}),window.addEventListener("orientationchange",()=>{clearTimeout(ft),clearTimeout(ie),f&&S.responsive&&(ie=setTimeout(()=>{ce()},300)),ft=setTimeout(Ne,300)}),document.addEventListener("visibilitychange",()=>{if(document.visibilityState==="visible"){clearTimeout(ie);const e=window.innerWidth,t=ae();window.lastKnownDimensions||(window.lastKnownDimensions={width:e,height:t});const i=Math.abs(e-window.lastKnownDimensions.width)/window.lastKnownDimensions.width,n=Math.abs(t-window.lastKnownDimensions.height)/window.lastKnownDimensions.height;(i>.05||n>.05)&&(window.lastKnownDimensions.width=e,window.lastKnownDimensions.height=t,f&&S.responsive&&(ie=setTimeout(()=>{ce()},150)),setTimeout(Ne,100))}else window.lastKnownDimensions={width:window.innerWidth,height:ae()}});let co=ae();function fo(){const e=ae();Math.abs(e-co)>50&&(Ne(),co=e),requestAnimationFrame(fo)}fo(),window.addEventListener("keydown",e=>{if((e.key==="+"||e.key==="=")&&(ne.zoom=Math.min(ne.zoom+.1,5),C.zoom=ne.zoom,C.updateProjectionMatrix(),typeof d<"u"&&d&&d.__folders["Camera Controls"])){const t=d.__folders["Camera Controls"];if(t&&t.__controllers){for(let i=0;i<t.__controllers.length;i++)if(t.__controllers[i].property==="zoom"){t.__controllers[i].updateDisplay();break}}}if((e.key==="-"||e.key==="_")&&(ne.zoom=Math.max(ne.zoom-.1,.1),C.zoom=ne.zoom,C.updateProjectionMatrix(),typeof d<"u"&&d&&d.__folders["Camera Controls"])){const t=d.__folders["Camera Controls"];if(t&&t.__controllers){for(let i=0;i<t.__controllers.length;i++)if(t.__controllers[i].property==="zoom"){t.__controllers[i].updateDisplay();break}}}}),L.add(p,"scrollSpeed",.001,.05,.018).name("Scroll Sensitivity").step(.001).onChange(e=>{p.scrollSpeed=e}),L.add(p,"damping",.8,.99,.01).name("Scroll Damping").onChange(e=>{p.damping=e}),L.add(p,"verticalSpread",1,5,.5).name("Vertical Spread").onChange(e=>{const t=J;J=window.innerHeight*e;const i=J/t,n=F.attributes.position.array;for(let s=0;s<T;s++){const r=s*3,g=(n[r+1]-p.verticalOffset)*i;n[r+1]=g+p.verticalOffset,Math.abs(g)>J/2&&(n[r+1]=(Math.random()-.5)*J+p.verticalOffset)}F.attributes.position.needsUpdate=!0}),L.add(p,"horizontalSpread",.02,5,.01).name("Horizontal Spread").onChange(e=>{const t=oe;oe=window.innerWidth*e;const i=oe/t,n=F.attributes.position.array;for(let s=0;s<T;s++){const r=s*3,g=n[r]*i;n[r]=g,Math.abs(g)>oe/2&&(n[r]=(Math.random()-.5)*oe)}F.attributes.position.needsUpdate=!0}),L.add(p,"verticalOffset",-window.innerHeight*3,window.innerHeight*2,10).name("Vertical Position").onChange(e=>{p.previousOffset===void 0&&(p.previousOffset=0),p.verticalOffset=e,Vo()}),L.add(p,"sizeMin",1,5,.01).name("Min Particle Size").onChange(e=>{if(p.sizeMin=e,p.sizeMin>=p.sizeMax&&(p.sizeMax=p.sizeMin+1,typeof d<"u"&&d&&d.__folders["Particle System"])){const t=d.__folders["Particle System"];if(t&&t.__controllers){for(let i=0;i<t.__controllers.length;i++)if(t.__controllers[i].property==="sizeMax"){t.__controllers[i].updateDisplay();break}}}De()}),L.add(p,"sizeMax",5,10,.01).name("Max Particle Size").onChange(e=>{if(p.sizeMax=e,p.sizeMax<=p.sizeMin&&(p.sizeMin=p.sizeMax-1,typeof d<"u"&&d&&d.__folders["Particle System"])){const t=d.__folders["Particle System"];if(t&&t.__controllers){for(let i=0;i<t.__controllers.length;i++)if(t.__controllers[i].property==="sizeMin"){t.__controllers[i].updateDisplay();break}}}De()}),L.add(p,"floatSpeed",.1,3,.1).name("Float Speed").onChange(e=>{p.floatSpeed=e}),De();const $o=F.attributes.position.array;for(let e=0;e<T;e++){const t=e*3;$o[t+1]=(Math.random()-.5)*J+p.verticalOffset}F.attributes.position.needsUpdate=!0,L.add(P.uniforms.haloStrength,"value",0,2,.1).name("Halo Intensity").onChange(e=>{P.uniforms.haloStrength.value=e}),L.add(P.uniforms.haloSize,"value",1,2,.1).name("Halo Size").onChange(e=>{P.uniforms.haloSize.value=e});let Ut;window.addEventListener("scroll",()=>{Ut&&clearTimeout(Ut),Ut=setTimeout(()=>{},150)})}function Nt(){const D=window.gui,a=window.uniforms;if(typeof D>"u"||!D||!D.__folders||!D.__folders["Lighting Controls"])return;const l=D.__folders["Lighting Controls"];for(let m=0;m<l.__controllers.length;m++){const x=l.__controllers[m];x.property==="value"&&x.object===a.ambientLight&&x.setValue(a.ambientLight.value),x.property==="value"&&x.object===a.directionalLight&&x.setValue(a.directionalLight.value)}}function $t(){const D=window.gui,a=window.uniforms;if(D.__folders["Animation Speed Controls"]){const l=D.__folders["Animation Speed Controls"];for(let m=0;m<l.__controllers.length;m++){const x=l.__controllers[m];if(x.property==="value"&&x.object===a.waveSpeed){x.setValue(a.waveSpeed.value);break}}}if(D.__folders["Wave Controls"]){const l=D.__folders["Wave Controls"];for(let m=0;m<l.__controllers.length;m++){const x=l.__controllers[m];x.property==="value"&&x.object===a.waveAmplitude&&x.setValue(a.waveAmplitude.value),x.property==="value"&&x.object===a.waveFrequency&&x.setValue(a.waveFrequency.value)}}}export{oi as initShaderBackground};
