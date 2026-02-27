import{l as t}from"./logger-2Ii2FPkr.js";const re=document.querySelector('script[src*="/content/dam/acsorg/150/"]')!==null,ae=window.location.hostname.includes("github.io")||window.location.pathname.startsWith("/150-lab/"),G=re?"/content/dam/acsorg/150/assets":ae?"/150-lab/assets":"",U=/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)||navigator.maxTouchPoints&&navigator.maxTouchPoints>2||window.matchMedia("(max-width: 768px)").matches,J=U?"ACS-150-720.mp4":"ACS-150.mp4",M=`${G}/video/${J}`,ne=`${G}/images/ACS150-promo-cover.jpg`;console.log("[video.js] Module loading...");const K=/^((?!chrome|android).)*safari/i.test(navigator.userAgent),Q=/iPad|iPhone|iPod/.test(navigator.userAgent)&&!window.MSStream,N=K||Q;console.log("[video.js] Device detection:",{isMobile:U,isSafariOrIOS:N,isSafari:K,isIOS:Q,videoFileName:J,videoUrl:M});let h=null,F=!1,k=!1;function se(i){try{if(k){t.log("YouTube player already initialized, skipping"),i&&i();return}if(window.YT&&window.YT.Player){t.log("YouTube API already loaded, initializing player immediately"),x(),i&&i();return}if(window.onYouTubeIframeAPIReady){t.log("YouTube API is loading, chaining our callback");const e=window.onYouTubeIframeAPIReady;window.onYouTubeIframeAPIReady=()=>{try{typeof e=="function"&&e()}catch(l){t.warn("Error in chained onYouTubeIframeAPIReady callback:",l)}k||x(),i&&i()};return}t.log("Loading YouTube API for the first time");const a=document.createElement("script");a.src="https://www.youtube.com/iframe_api";const c=document.getElementsByTagName("script")[0];c&&c.parentNode?c.parentNode.insertBefore(a,c):document.head.appendChild(a),window.onYouTubeIframeAPIReady=()=>{t.log("YouTube API ready, initializing player"),k||x(),i&&i()}}catch(a){t.error("Error in initYouTubeAPI:",a),i&&i()}}function de(){if(F){t.log("YouTube iframe already loaded, skipping");return}const i=document.getElementById("youtube-video-iframe");if(i){if(i.src&&i.src!=="about:blank"&&i.src!==""){t.log("YouTube iframe already has src, marking as loaded"),F=!0;return}i.dataset.src&&(t.log("Lazy loading YouTube iframe from data-src"),i.src=i.dataset.src,F=!0)}}let j=!1;function x(){if(k){t.log("YouTube player already initialized (initPlayer check), skipping");return}const i=document.getElementById("youtube-video-iframe");if(!i||!document.body.contains(i)){t.warn("YouTube iframe not found or not in DOM, delaying player init"),setTimeout(x,100);return}if(!i.src||i.src==="about:blank"){t.warn("YouTube iframe src not set, delaying player init"),setTimeout(x,100);return}k=!0,i.setAttribute("data-player-managed","true"),i.setAttribute("data-yt-player-initialized","true"),window.mainYouTubePlayerManaged=!0,window.mainYouTubePlayerInitializing=!0;try{h=new YT.Player("youtube-video-iframe",{events:{onReady:le,onStateChange:ue}}),window.isMainVideoPlaying=()=>{try{return j&&h&&h.getPlayerState&&h.getPlayerState()===1}catch{return!1}},window.isMainYouTubePlayerReady=()=>j}catch(a){t.error("Error creating YouTube player:",a),k=!1,window.mainYouTubePlayerManaged=!1}}function P(){const i=document.getElementById("youtube-video-wrapper");if(!i)return;i.querySelectorAll("div:not(.video-start-overlay):not(.play-button-overlay)").forEach(c=>{const e=c.style;e.position==="absolute"&&e.top==="0px"&&e.left==="0px"&&e.width==="100%"&&e.height==="100%"&&!c.classList.length&&(t.log("Removing YouTube blocking div"),c.remove())})}function le(i){t.log("YouTube player ready"),j=!0,window.mainYouTubePlayerInitializing=!1,window.mainYouTubePlayerReady=!0,P(),setTimeout(P,500),setTimeout(P,1e3)}function ue(i){if(!j){t.warn("Player state change received but player not ready yet");return}t.log("Main video state changed:",i.data),i.data===1?(P(),t.log("[video.js] Video playing, pausing background audio"),window.cancelActiveFade&&window.cancelActiveFade(),window.backgroundAudio&&(window.fadeBackgroundAudio?window.fadeBackgroundAudio(.001,1e3,()=>{t.log("[video.js] Background audio ducked (vol 0.001)")}):window.backgroundAudio.volume=.001)):(i.data===0||i.data===2)&&(t.log("[video.js] Video paused/ended, calling resumeBackgroundAudio"),window.resumeBackgroundAudio?window.resumeBackgroundAudio():t.error("[video.js] resumeBackgroundAudio not found on window"))}function $(i,a,c=1e3){if(!i)return;const e=i.volume,l=performance.now(),E=n=>{const A=n-l,b=Math.min(A/c,1),L=b*b;i.volume=e+(a-e)*L,b<1&&requestAnimationFrame(E)};requestAnimationFrame(E)}function me(){const i=document.querySelector("#video"),a=document.querySelector(".video-wrapper");if(!i||!a)return;if(a.querySelector("iframe#youtube-video-iframe")){t.log("YouTube iframe detected, setting up lazy loading");const o=document.querySelector(".video-start-overlay");o&&o.addEventListener("click",function g(s){s.preventDefault(),s.stopPropagation();try{if(!window.audioMuted&&window.playUIClickSound)try{window.playUIClickSound()}catch(d){t.warn("Could not play UI click sound:",d)}t.log("[video.js] Overlay clicked, fading out audio immediately");try{window.cancelActiveFade&&window.cancelActiveFade(),window.fadeBackgroundAudio?window.fadeBackgroundAudio(.001,1e3,()=>{t.log("[video.js] Background audio ducked (vol 0.001) via overlay click")}):window.backgroundAudio&&(window.backgroundAudio.volume=.001)}catch(d){t.warn("Audio fade error (non-critical):",d)}o.classList.add("hidden"),de();const p=document.getElementById("youtube-video-iframe");if(p){const d=()=>{try{se(()=>{t.log("[video.js] YouTube player initialized after lazy load"),P()})}catch(ie){t.error("YouTube player init error:",ie)}};p.src&&p.contentWindow?setTimeout(d,200):(p.addEventListener("load",d,{once:!0}),setTimeout(d,1e3))}setTimeout(()=>{try{o.remove(),P()}catch(d){t.warn("Overlay remove error:",d)}},400),setTimeout(()=>{try{window.lenis&&typeof window.lenis.start=="function"&&(window.lenis.start(),t.log("[video.js] Ensured Lenis is running after video click")),window.ScrollTrigger&&typeof window.ScrollTrigger.refresh=="function"&&(window.ScrollTrigger.refresh(),t.log("[video.js] Refreshed ScrollTrigger after video click"))}catch(d){t.warn("Scroll safeguard error:",d)}},500)}catch(p){t.error("Video overlay click error (caught to prevent page break):",p),setTimeout(()=>{try{window.lenis&&typeof window.lenis.start=="function"&&window.lenis.start(),window.ScrollTrigger&&typeof window.ScrollTrigger.refresh=="function"&&window.ScrollTrigger.refresh()}catch{}},100)}o.removeEventListener("click",g)});const r=document.querySelector("#video");r&&new IntersectionObserver(s=>{s.forEach(p=>{if(!p.isIntersecting&&h){t.log("[video.js] Main video scrolled out of view, pausing");try{h.getPlayerState()===1&&h.pauseVideo()}catch(d){t.warn("[video.js] Could not pause video:",d)}setTimeout(()=>{!(window.isMainVideoPlaying?window.isMainVideoPlaying():!1)&&window.resumeBackgroundAudio&&!window.audioMuted&&window.resumeBackgroundAudio()},300)}})},{threshold:.25}).observe(r);return}const e=a.querySelector("video");if(!e){t.log("No <video> element found in .video-wrapper, skipping custom video controls");return}t.log("Custom .mp4 video player detected, initializing controls"),window.isMainVideoPlaying=()=>{try{return e&&!e.paused}catch{return!1}},e.setAttribute("playsinline",""),e.setAttribute("webkit-playsinline",""),N&&e.setAttribute("x-webkit-airplay","allow");try{e.poster=ne,e.preload="none";const o=new IntersectionObserver(r=>{r.forEach(g=>{g.isIntersecting&&(t.log("[video.js] User approaching video section — setting src and buffering"),e.src=M,e.preload="auto",o.disconnect())})},{rootMargin:"800px 0px",threshold:0});o.observe(a),t.log("[video.js] Progressive video loading configured:",M,"| Mobile:",U)}catch(o){console.error("[video.js] Error configuring video source:",o);try{e.src=M,e.preload="metadata"}catch{}}e.addEventListener("error",o=>{t.error("Video loading error:",o),t.error("Video src:",e.src),t.error("Video error code:",e.error?.code),t.error("Video error message:",e.error?.message)}),e.addEventListener("loadeddata",()=>{t.log("[video.js] Video data loaded successfully"),e.style.opacity="1",e.pause()}),e.addEventListener("loadedmetadata",()=>{t.log("[video.js] Video metadata loaded"),e.style.display="none",e.offsetHeight,e.style.display=""});const l=document.createElement("div");l.className="video-overlay";const E=document.createElement("div");E.className="play-button",l.appendChild(E),e.parentNode.insertBefore(l,e.nextSibling);const n=document.createElement("div");n.className="video-audio-slider",n.innerHTML=`
    <div class="audio-slider-track">
      <div class="audio-slider-fill"></div>
      <div class="audio-slider-thumb"></div>
    </div>
    <div class="audio-icon">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" fill="currentColor"/>
      </svg>
    </div>
  `,n.style.cssText=`
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
  `;const A=n.querySelector(".audio-slider-track");A.style.cssText=`
    width: 80px;
    height: 4px;
    background: rgba(255, 255, 255, 0.3);
    border-radius: 2px;
    position: relative;
    cursor: pointer;
  `;const b=n.querySelector(".audio-slider-fill");b.style.cssText=`
    height: 100%;
    background: white;
    border-radius: 2px;
    width: 50%;
    transition: width 0.1s ease;
  `;const L=n.querySelector(".audio-slider-thumb");L.style.cssText=`
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
  `;const Z=n.querySelector(".audio-icon");Z.style.cssText=`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 16px;
    height: 16px;
  `,e.parentNode.appendChild(n);const u=document.createElement("div");u.className="video-progress-bar",u.innerHTML=`
    <div class="progress-bar-track">
      <div class="progress-bar-fill"></div>
      <div class="progress-bar-thumb"></div>
    </div>
  `,u.style.cssText=`
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: rgba(0, 0, 0, 0);
    cursor: pointer;
    z-index: 10;
    transition: height 0.2s ease, background 0.2s ease;
  `;const I=u.querySelector(".progress-bar-track");I.style.cssText=`
    width: 100%;
    height: 100%;
    position: relative;
    cursor: pointer;
  `;const T=u.querySelector(".progress-bar-fill");T.style.cssText=`
    height: 100%;
    background:rgba(111, 237, 238, 0.88);
    width: 0%;
    transition: width 0.1s linear;
    pointer-events: none;
  `;const y=u.querySelector(".progress-bar-thumb");y.style.cssText=`
    position: absolute;
    top: 50%;
    left: 0%;
    transform: translate(-50%, -50%);
    width: 8px;
    height: 8px;
    background: rgba(111, 237, 238, 1);
    border-radius: 50%;
    cursor: pointer;
    opacity: 0;
    transition: opacity 0.2s ease;
    pointer-events: none;
  `,e.parentNode.appendChild(u);let Y=!1;const D=.5,X=.4,f=()=>{const r=e.volume/D*100;b.style.width=r+"%",L.style.left=r+"%"},H=o=>{const r=A.getBoundingClientRect(),s=Math.max(0,Math.min(100,(o-r.left)/r.width*100))/100*D;s>0?e.muted=!1:e.muted=!0,e.volume=s,s>0&&(B=s),f()};A.addEventListener("mousedown",o=>{Y=!0,H(o.clientX),o.preventDefault()}),document.addEventListener("mousemove",o=>{Y&&H(o.clientX)}),document.addEventListener("mouseup",()=>{Y=!1}),a.addEventListener("mouseenter",()=>{e.paused||(n.style.opacity="1",n.style.pointerEvents="auto")}),a.addEventListener("mouseleave",()=>{n.style.opacity="0",n.style.pointerEvents="none"}),e.addEventListener("volumechange",f),e.volume=X,e.muted=!1,f();let v=!1;const V=()=>{if(e.duration&&!v){const o=e.currentTime/e.duration*100;T.style.transition="none",T.style.width=o+"%",y.style.left=o+"%"}},C=o=>{const r=I.getBoundingClientRect(),s=Math.max(0,Math.min(100,(o-r.left)/r.width*100))/100*e.duration;e.currentTime=s,V(),e.paused||S()},R=()=>{T.style.transition="none",y.style.transition="opacity 0.2s"},W=()=>{T.style.transition="width 0.1s linear",y.style.transition="opacity 0.2s"};I.addEventListener("mousedown",o=>{v=!0,R(),C(o.clientX),o.preventDefault()}),I.addEventListener("click",o=>{v||(R(),C(o.clientX),setTimeout(()=>{W()},50))}),document.addEventListener("mousemove",o=>{v&&C(o.clientX)}),document.addEventListener("mouseup",()=>{v=!1,W()}),u.addEventListener("mouseenter",()=>{y.style.opacity="1",u.style.height="8px",u.style.background="rgba(0, 0, 0, 0.3)"}),u.addEventListener("mouseleave",()=>{v||(y.style.opacity="0"),u.style.height="4px",u.style.background="rgba(0, 0, 0, 0)"});let w=null,q=0;const _=()=>{if(e.duration&&!v&&!e.paused){const o=performance.now();if(o-q>=16.67){const r=e.currentTime/e.duration*100;T.style.width=r+"%",y.style.left=r+"%",q=o}w=requestAnimationFrame(_)}},S=()=>{w&&cancelAnimationFrame(w),q=performance.now(),w=requestAnimationFrame(_)},ee=()=>{w&&(cancelAnimationFrame(w),w=null)};e.addEventListener("play",S),e.addEventListener("pause",ee),e.addEventListener("timeupdate",V),V();let B=X,m=null;const te=()=>{e.paused||(B=e.volume,$(e,0,600),m=setTimeout(()=>{e.pause(),m=null},600))},oe=()=>{e.paused||(m&&(clearTimeout(m),m=null),e.pause())},z=()=>{e.muted=!1,e.volume=B;const o=e.play();o!==void 0?o.then(()=>{t.log("[video.js] Video playback started successfully"),l.classList.add("hidden"),f(),S()}).catch(r=>{t.warn("[video.js] Play failed:",r.name,r.message),t.log("[video.js] Trying muted playback fallback..."),e.muted=!0,e.volume=0;const g=e.play();g!==void 0&&g.then(()=>{t.log("[video.js] Muted playback started, video is now playing"),l.classList.add("hidden"),f(),S(),setTimeout(()=>{try{e.muted=!1,e.volume=B,f(),t.log("[video.js] Successfully unmuted video")}catch(s){t.warn("[video.js] Could not unmute:",s)}},100)}).catch(s=>{t.error("[video.js] Even muted playback failed:",s.name,s.message),l.classList.remove("hidden")})}):(l.classList.add("hidden"),f(),S())},O=()=>{if(t.log("[video.js] handlePlayPause called, paused:",e.paused,"readyState:",e.readyState),e.paused){if(m&&(clearTimeout(m),m=null),window.backgroundAudio&&$(window.backgroundAudio,0),e.readyState<3){t.log("[video.js] Video not loaded yet (readyState:",e.readyState,"), loading within user gesture..."),e.load();const o=()=>{t.log("[video.js] Video canplay fired, attempting playback"),e.removeEventListener("canplay",o),e.removeEventListener("canplaythrough",o),z()};e.addEventListener("canplay",o,{once:!0}),e.addEventListener("canplaythrough",o,{once:!0}),setTimeout(()=>{e.paused&&e.readyState>=2&&(t.log("[video.js] Timeout fallback: attempting play with readyState:",e.readyState),z())},500);return}z()}else oe()};if(l.addEventListener("click",O),e.addEventListener("click",O),N){console.log("[video.js] Adding Safari touchend handlers");const o=r=>{console.log("[video.js] touchend fired on",r.target.className||r.target.tagName),r.preventDefault(),O()};l.addEventListener("touchend",o,{passive:!1}),e.addEventListener("touchend",o,{passive:!1})}console.log("[video.js] Event handlers attached to overlay and video element"),e.addEventListener("ended",()=>{l.classList.remove("hidden"),n.style.opacity="0",n.style.pointerEvents="none",!window.audioMuted&&window.resumeBackgroundAudio&&(t.log("[video.js] Video ended, resuming background audio"),window.resumeBackgroundAudio())}),e.addEventListener("pause",()=>{l.classList.remove("hidden"),n.style.opacity="0",n.style.pointerEvents="none",!window.audioMuted&&window.resumeBackgroundAudio&&(t.log("[video.js] Video paused, resuming background audio"),window.resumeBackgroundAudio())}),new IntersectionObserver(o=>{o.forEach(r=>{if(!r.isIntersecting){const g=!e.paused;te(),g&&(t.log("[video.js] Custom video left viewport after playing, ensuring background audio resumes"),setTimeout(()=>{!(window.isMainVideoPlaying?window.isMainVideoPlaying():!1)&&window.resumeBackgroundAudio&&!window.audioMuted&&window.resumeBackgroundAudio()},800))}})},{threshold:.5}).observe(i)}export{me as initVideo};
