import{l as t}from"./logger-2Ii2FPkr.js";const se=document.querySelector('script[src*="/content/dam/acsorg/150/"]')!==null,de=window.location.hostname.includes("github.io")||window.location.pathname.startsWith("/150-lab/"),Q=se?"/content/dam/acsorg/150/assets":de?"/150-lab/assets":"",R=/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)||navigator.maxTouchPoints&&navigator.maxTouchPoints>2||window.matchMedia("(max-width: 768px)").matches,Z=R?"ACS-150-720.mp4":"ACS-150.mp4",X=`${Q}/video/${Z}`,le=`${Q}/images/ACS150-promo-cover.jpg`;console.log("[video.js] Module loading...");const ee=/^((?!chrome|android).)*safari/i.test(navigator.userAgent),te=/iPad|iPhone|iPod/.test(navigator.userAgent)&&!window.MSStream,H=ee||te;console.log("[video.js] Device detection:",{isMobile:R,isSafariOrIOS:H,isSafari:ee,isIOS:te,videoFileName:Z,videoUrl:X});let N=!1,b=null,U=!1,k=!1;function ue(i){try{if(k){t.log("YouTube player already initialized, skipping"),i&&i();return}if(window.YT&&window.YT.Player){t.log("YouTube API already loaded, initializing player immediately"),M(),i&&i();return}if(window.onYouTubeIframeAPIReady){t.log("YouTube API is loading, chaining our callback");const e=window.onYouTubeIframeAPIReady;window.onYouTubeIframeAPIReady=()=>{try{typeof e=="function"&&e()}catch(l){t.warn("Error in chained onYouTubeIframeAPIReady callback:",l)}k||M(),i&&i()};return}t.log("Loading YouTube API for the first time");const s=document.createElement("script");s.src="https://www.youtube.com/iframe_api";const g=document.getElementsByTagName("script")[0];g&&g.parentNode?g.parentNode.insertBefore(s,g):document.head.appendChild(s),window.onYouTubeIframeAPIReady=()=>{t.log("YouTube API ready, initializing player"),k||M(),i&&i()}}catch(s){t.error("Error in initYouTubeAPI:",s),i&&i()}}function ce(){if(U){t.log("YouTube iframe already loaded, skipping");return}const i=document.getElementById("youtube-video-iframe");if(i){if(i.src&&i.src!=="about:blank"&&i.src!==""){t.log("YouTube iframe already has src, marking as loaded"),U=!0;return}i.dataset.src&&(t.log("Lazy loading YouTube iframe from data-src"),i.src=i.dataset.src,U=!0)}}let j=!1;function M(){if(k){t.log("YouTube player already initialized (initPlayer check), skipping");return}const i=document.getElementById("youtube-video-iframe");if(!i||!document.body.contains(i)){t.warn("YouTube iframe not found or not in DOM, delaying player init"),setTimeout(M,100);return}if(!i.src||i.src==="about:blank"){t.warn("YouTube iframe src not set, delaying player init"),setTimeout(M,100);return}k=!0,i.setAttribute("data-player-managed","true"),i.setAttribute("data-yt-player-initialized","true"),window.mainYouTubePlayerManaged=!0,window.mainYouTubePlayerInitializing=!0;try{b=new YT.Player("youtube-video-iframe",{events:{onReady:ge,onStateChange:me}}),window.isMainVideoPlaying=()=>{try{return j&&b&&b.getPlayerState&&b.getPlayerState()===1}catch{return!1}},window.isMainYouTubePlayerReady=()=>j}catch(s){t.error("Error creating YouTube player:",s),k=!1,window.mainYouTubePlayerManaged=!1}}function P(){const i=document.getElementById("youtube-video-wrapper");if(!i)return;i.querySelectorAll("div:not(.video-start-overlay):not(.play-button-overlay)").forEach(g=>{const e=g.style;e.position==="absolute"&&e.top==="0px"&&e.left==="0px"&&e.width==="100%"&&e.height==="100%"&&!g.classList.length&&(t.log("Removing YouTube blocking div"),g.remove())})}function ge(i){t.log("YouTube player ready"),j=!0,window.mainYouTubePlayerInitializing=!1,window.mainYouTubePlayerReady=!0,P(),setTimeout(P,500),setTimeout(P,1e3)}function me(i){if(!j){t.warn("Player state change received but player not ready yet");return}t.log("Main video state changed:",i.data),i.data===1?(P(),t.log("[video.js] Video playing, pausing background audio"),window.cancelActiveFade&&window.cancelActiveFade(),window.backgroundAudio&&(window.fadeBackgroundAudio?window.fadeBackgroundAudio(.001,1e3,()=>{t.log("[video.js] Background audio ducked (vol 0.001)")}):window.backgroundAudio.volume=.001)):(i.data===0||i.data===2)&&(t.log("[video.js] Video paused/ended, calling resumeBackgroundAudio"),window.resumeBackgroundAudio?window.resumeBackgroundAudio():t.error("[video.js] resumeBackgroundAudio not found on window"))}function D(i,s,g=1e3){if(!i)return;const e=i.volume,l=performance.now(),A=n=>{const E=n-l,h=Math.min(E/g,1),x=h*h;i.volume=e+(s-e)*x,h<1&&requestAnimationFrame(A)};requestAnimationFrame(A)}function pe(){const i=document.querySelector("#video"),s=document.querySelector(".video-wrapper");if(!i||!s)return;if(s.querySelector("iframe#youtube-video-iframe")){t.log("YouTube iframe detected, setting up lazy loading");const o=document.querySelector(".video-start-overlay");o&&o.addEventListener("click",function m(a){a.preventDefault(),a.stopPropagation();try{if(!window.audioMuted&&window.playUIClickSound)try{window.playUIClickSound()}catch(d){t.warn("Could not play UI click sound:",d)}t.log("[video.js] Overlay clicked, fading out audio immediately");try{window.cancelActiveFade&&window.cancelActiveFade(),window.fadeBackgroundAudio?window.fadeBackgroundAudio(.001,1e3,()=>{t.log("[video.js] Background audio ducked (vol 0.001) via overlay click")}):window.backgroundAudio&&(window.backgroundAudio.volume=.001)}catch(d){t.warn("Audio fade error (non-critical):",d)}o.classList.add("hidden"),ce();const c=document.getElementById("youtube-video-iframe");if(c){const d=()=>{try{ue(()=>{t.log("[video.js] YouTube player initialized after lazy load"),P()})}catch(ne){t.error("YouTube player init error:",ne)}};c.src&&c.contentWindow?setTimeout(d,200):(c.addEventListener("load",d,{once:!0}),setTimeout(d,1e3))}setTimeout(()=>{try{o.remove(),P()}catch(d){t.warn("Overlay remove error:",d)}},400),setTimeout(()=>{try{window.lenis&&typeof window.lenis.start=="function"&&(window.lenis.start(),t.log("[video.js] Ensured Lenis is running after video click")),window.ScrollTrigger&&typeof window.ScrollTrigger.refresh=="function"&&(window.ScrollTrigger.refresh(),t.log("[video.js] Refreshed ScrollTrigger after video click"))}catch(d){t.warn("Scroll safeguard error:",d)}},500)}catch(c){t.error("Video overlay click error (caught to prevent page break):",c),setTimeout(()=>{try{window.lenis&&typeof window.lenis.start=="function"&&window.lenis.start(),window.ScrollTrigger&&typeof window.ScrollTrigger.refresh=="function"&&window.ScrollTrigger.refresh()}catch{}},100)}o.removeEventListener("click",m)});const r=document.querySelector("#video");r&&new IntersectionObserver(a=>{a.forEach(c=>{if(!c.isIntersecting&&b){t.log("[video.js] Main video scrolled out of view, pausing");try{b.getPlayerState()===1&&b.pauseVideo()}catch(d){t.warn("[video.js] Could not pause video:",d)}setTimeout(()=>{!(window.isMainVideoPlaying?window.isMainVideoPlaying():!1)&&window.resumeBackgroundAudio&&!window.audioMuted&&window.resumeBackgroundAudio()},300)}})},{threshold:.25}).observe(r);return}const e=s.querySelector("video");if(!e){t.log("No <video> element found in .video-wrapper, skipping custom video controls");return}t.log("Custom .mp4 video player detected, initializing controls"),window.isMainVideoPlaying=()=>{try{return e&&!e.paused}catch{return!1}},e.setAttribute("playsinline",""),e.setAttribute("webkit-playsinline",""),H&&e.setAttribute("x-webkit-airplay","allow");try{e.src=X,e.poster=le,e.load(),t.log("[video.js] Video source set:",X,"| Mobile:",R)}catch(o){console.error("[video.js] Error setting video source or loading:",o)}e.addEventListener("error",o=>{t.error("Video loading error:",o),t.error("Video src:",e.src),t.error("Video error code:",e.error?.code),t.error("Video error message:",e.error?.message)}),e.addEventListener("loadeddata",()=>{t.log("[video.js] Video data loaded successfully"),e.style.opacity="1",e.pause()}),e.addEventListener("loadedmetadata",()=>{t.log("[video.js] Video metadata loaded"),e.style.display="none",e.offsetHeight,e.style.display=""});const l=document.createElement("div");l.className="video-overlay";const A=document.createElement("div");A.className="play-button",l.appendChild(A),e.parentNode.insertBefore(l,e.nextSibling);const n=document.createElement("div");n.className="video-audio-slider",n.innerHTML=`
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
  `;const E=n.querySelector(".audio-slider-track");E.style.cssText=`
    width: 80px;
    height: 4px;
    background: rgba(255, 255, 255, 0.3);
    border-radius: 2px;
    position: relative;
    cursor: pointer;
  `;const h=n.querySelector(".audio-slider-fill");h.style.cssText=`
    height: 100%;
    background: white;
    border-radius: 2px;
    width: 50%;
    transition: width 0.1s ease;
  `;const x=n.querySelector(".audio-slider-thumb");x.style.cssText=`
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
  `;const oe=n.querySelector(".audio-icon");oe.style.cssText=`
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
  `;const p=u.querySelector(".progress-bar-thumb");p.style.cssText=`
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
  `,e.parentNode.appendChild(u);let Y=!1;const W=.3,_=.18,y=()=>{const r=e.volume/W*100;h.style.width=r+"%",x.style.left=r+"%"},$=o=>{const r=E.getBoundingClientRect(),a=Math.max(0,Math.min(100,(o-r.left)/r.width*100))/100*W;if(window.audioMuted&&a>0){const c=document.querySelector(".sound-toggle");c&&c.classList.contains("muted")&&(N=!0,c.click(),setTimeout(()=>{N=!1},100))}a>0?e.muted=!1:e.muted=!0,e.volume=a,a>0&&(L=a),y()};E.addEventListener("mousedown",o=>{Y=!0,$(o.clientX),o.preventDefault()}),document.addEventListener("mousemove",o=>{Y&&$(o.clientX)}),document.addEventListener("mouseup",()=>{Y=!1}),s.addEventListener("mouseenter",()=>{e.paused||(n.style.opacity="1",n.style.pointerEvents="auto")}),s.addEventListener("mouseleave",()=>{n.style.opacity="0",n.style.pointerEvents="none"}),e.addEventListener("volumechange",y),e.volume=_,window.audioMuted?(e.muted=!0,e.volume=0):e.muted=!1,y();let v=!1;const V=()=>{if(e.duration&&!v){const o=e.currentTime/e.duration*100;T.style.transition="none",T.style.width=o+"%",p.style.left=o+"%"}},C=o=>{const r=I.getBoundingClientRect(),a=Math.max(0,Math.min(100,(o-r.left)/r.width*100))/100*e.duration;e.currentTime=a,V(),e.paused||S()},G=()=>{T.style.transition="none",p.style.transition="opacity 0.2s"},K=()=>{T.style.transition="width 0.1s linear",p.style.transition="opacity 0.2s"};I.addEventListener("mousedown",o=>{v=!0,G(),C(o.clientX),o.preventDefault()}),I.addEventListener("click",o=>{v||(G(),C(o.clientX),setTimeout(()=>{K()},50))}),document.addEventListener("mousemove",o=>{v&&C(o.clientX)}),document.addEventListener("mouseup",()=>{v=!1,K()}),u.addEventListener("mouseenter",()=>{p.style.opacity="1",u.style.height="8px",u.style.background="rgba(0, 0, 0, 0.3)"}),u.addEventListener("mouseleave",()=>{v||(p.style.opacity="0"),u.style.height="4px",u.style.background="rgba(0, 0, 0, 0)"});let w=null,q=0;const J=()=>{if(e.duration&&!v&&!e.paused){const o=performance.now();if(o-q>=16.67){const r=e.currentTime/e.duration*100;T.style.width=r+"%",p.style.left=r+"%",q=o}w=requestAnimationFrame(J)}},S=()=>{w&&cancelAnimationFrame(w),q=performance.now(),w=requestAnimationFrame(J)},ie=()=>{w&&(cancelAnimationFrame(w),w=null)};e.addEventListener("play",S),e.addEventListener("pause",ie),e.addEventListener("timeupdate",V),V();let L=_,f=null;const re=()=>{e.paused||(L=e.volume,D(e,0,600),f=setTimeout(()=>{e.pause(),f=null},600))},ae=()=>{e.paused||(f&&(clearTimeout(f),f=null),e.pause())},z=()=>{window.audioMuted?(e.volume=0,e.muted=!0):(e.muted=!1,e.volume=L);const o=e.play();o!==void 0?o.then(()=>{t.log("[video.js] Video playback started successfully"),l.classList.add("hidden"),y(),S()}).catch(r=>{t.warn("[video.js] Play failed:",r.name,r.message),t.log("[video.js] Trying muted playback fallback..."),e.muted=!0,e.volume=0;const m=e.play();m!==void 0&&m.then(()=>{t.log("[video.js] Muted playback started, video is now playing"),l.classList.add("hidden"),y(),S(),window.audioMuted||setTimeout(()=>{try{e.muted=!1,e.volume=L,y(),t.log("[video.js] Successfully unmuted video")}catch(a){t.warn("[video.js] Could not unmute:",a)}},100)}).catch(a=>{t.error("[video.js] Even muted playback failed:",a.name,a.message),l.classList.remove("hidden")})}):(l.classList.add("hidden"),y(),S())},O=()=>{if(t.log("[video.js] handlePlayPause called, paused:",e.paused,"readyState:",e.readyState),e.paused){if(f&&(clearTimeout(f),f=null),window.backgroundAudio&&D(window.backgroundAudio,0),e.readyState<3){t.log("[video.js] Video not loaded yet (readyState:",e.readyState,"), loading within user gesture..."),e.load();const o=()=>{t.log("[video.js] Video canplay fired, attempting playback"),e.removeEventListener("canplay",o),e.removeEventListener("canplaythrough",o),z()};e.addEventListener("canplay",o,{once:!0}),e.addEventListener("canplaythrough",o,{once:!0}),setTimeout(()=>{e.paused&&e.readyState>=2&&(t.log("[video.js] Timeout fallback: attempting play with readyState:",e.readyState),z())},500);return}z()}else ae()};if(l.addEventListener("click",O),e.addEventListener("click",O),H){console.log("[video.js] Adding Safari touchend handlers");const o=r=>{console.log("[video.js] touchend fired on",r.target.className||r.target.tagName),r.preventDefault(),O()};l.addEventListener("touchend",o,{passive:!1}),e.addEventListener("touchend",o,{passive:!1})}console.log("[video.js] Event handlers attached to overlay and video element"),e.addEventListener("ended",()=>{l.classList.remove("hidden"),n.style.opacity="0",n.style.pointerEvents="none",!window.audioMuted&&window.resumeBackgroundAudio&&(t.log("[video.js] Video ended, resuming background audio"),window.resumeBackgroundAudio())}),e.addEventListener("pause",()=>{l.classList.remove("hidden"),n.style.opacity="0",n.style.pointerEvents="none",!window.audioMuted&&window.resumeBackgroundAudio&&(t.log("[video.js] Video paused, resuming background audio"),window.resumeBackgroundAudio())}),new IntersectionObserver(o=>{o.forEach(r=>{if(!r.isIntersecting){const m=!e.paused;re(),m&&(t.log("[video.js] Custom video left viewport after playing, ensuring background audio resumes"),setTimeout(()=>{!(window.isMainVideoPlaying?window.isMainVideoPlaying():!1)&&window.resumeBackgroundAudio&&!window.audioMuted&&window.resumeBackgroundAudio()},800))}})},{threshold:.5}).observe(i);const B=()=>{!e.paused&&!e.ended&&(window.audioMuted?(e.volume=0,e.muted=!0):(e.muted=!1,N||(e.volume=L),window.backgroundAudio&&!window.backgroundAudio.paused&&D(window.backgroundAudio,0)),y())},F=document.querySelector(".sound-toggle");if(F){F.addEventListener("click",()=>{setTimeout(()=>{B()},50)}),new MutationObserver(m=>{m.forEach(a=>{a.type==="attributes"&&a.attributeName==="class"&&setTimeout(()=>{B()},50)})}).observe(F,{attributes:!0,attributeFilter:["class"]});let r=window.audioMuted;setInterval(()=>{window.audioMuted!==r&&(r=window.audioMuted,B())},500),setTimeout(()=>{B()},1e3)}}export{pe as initVideo};
