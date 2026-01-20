import{l as t}from"./logger-2Ii2FPkr.js";const de=document.querySelector('script[src*="/content/dam/acsorg/150/"]')!==null,se=window.location.hostname.includes("github.io")||window.location.pathname.startsWith("/150-lab/"),Z=de?"/content/dam/acsorg/150/assets":se?"/150-lab/assets":"",le=`${Z}/video/acs-150-compressed-3.mp4`,ue=`${Z}/images/ACS150-promo-cover.jpg`,ce=/^((?!chrome|android).)*safari/i.test(navigator.userAgent),ge=/iPad|iPhone|iPod/.test(navigator.userAgent)&&!window.MSStream,B=ce||ge;B&&console.log("[video.js] Safari/iOS detected - will use Safari-specific video handling");let U=!1,h=null,D=!1,S=!1;function me(i){try{if(S){t.log("YouTube player already initialized, skipping"),i&&i();return}if(window.YT&&window.YT.Player){t.log("YouTube API already loaded, initializing player immediately"),A(),i&&i();return}if(window.onYouTubeIframeAPIReady){t.log("YouTube API is loading, chaining our callback");const e=window.onYouTubeIframeAPIReady;window.onYouTubeIframeAPIReady=()=>{try{typeof e=="function"&&e()}catch(f){t.warn("Error in chained onYouTubeIframeAPIReady callback:",f)}S||A(),i&&i()};return}t.log("Loading YouTube API for the first time");const d=document.createElement("script");d.src="https://www.youtube.com/iframe_api";const g=document.getElementsByTagName("script")[0];g&&g.parentNode?g.parentNode.insertBefore(d,g):document.head.appendChild(d),window.onYouTubeIframeAPIReady=()=>{t.log("YouTube API ready, initializing player"),S||A(),i&&i()}}catch(d){t.error("Error in initYouTubeAPI:",d),i&&i()}}function fe(){if(D){t.log("YouTube iframe already loaded, skipping");return}const i=document.getElementById("youtube-video-iframe");if(i){if(i.src&&i.src!=="about:blank"&&i.src!==""){t.log("YouTube iframe already has src, marking as loaded"),D=!0;return}i.dataset.src&&(t.log("Lazy loading YouTube iframe from data-src"),i.src=i.dataset.src,D=!0)}}let Y=!1;function A(){if(S){t.log("YouTube player already initialized (initPlayer check), skipping");return}const i=document.getElementById("youtube-video-iframe");if(!i||!document.body.contains(i)){t.warn("YouTube iframe not found or not in DOM, delaying player init"),setTimeout(A,100);return}if(!i.src||i.src==="about:blank"){t.warn("YouTube iframe src not set, delaying player init"),setTimeout(A,100);return}S=!0,i.setAttribute("data-player-managed","true"),i.setAttribute("data-yt-player-initialized","true"),window.mainYouTubePlayerManaged=!0,window.mainYouTubePlayerInitializing=!0;try{h=new YT.Player("youtube-video-iframe",{events:{onReady:ye,onStateChange:pe}}),window.isMainVideoPlaying=()=>{try{return Y&&h&&h.getPlayerState&&h.getPlayerState()===1}catch{return!1}},window.isMainYouTubePlayerReady=()=>Y}catch(d){t.error("Error creating YouTube player:",d),S=!1,window.mainYouTubePlayerManaged=!1}}function E(){const i=document.getElementById("youtube-video-wrapper");if(!i)return;i.querySelectorAll("div:not(.video-start-overlay):not(.play-button-overlay)").forEach(g=>{const e=g.style;e.position==="absolute"&&e.top==="0px"&&e.left==="0px"&&e.width==="100%"&&e.height==="100%"&&!g.classList.length&&(t.log("Removing YouTube blocking div"),g.remove())})}function ye(i){t.log("YouTube player ready"),Y=!0,window.mainYouTubePlayerInitializing=!1,window.mainYouTubePlayerReady=!0,E(),setTimeout(E,500),setTimeout(E,1e3)}function pe(i){if(!Y){t.warn("Player state change received but player not ready yet");return}t.log("Main video state changed:",i.data),i.data===1?(E(),t.log("[video.js] Video playing, pausing background audio"),window.cancelActiveFade&&window.cancelActiveFade(),window.backgroundAudio&&(window.fadeBackgroundAudio?window.fadeBackgroundAudio(.001,1e3,()=>{t.log("[video.js] Background audio ducked (vol 0.001)")}):window.backgroundAudio.volume=.001)):(i.data===0||i.data===2)&&(t.log("[video.js] Video paused/ended, calling resumeBackgroundAudio"),window.resumeBackgroundAudio?window.resumeBackgroundAudio():t.error("[video.js] resumeBackgroundAudio not found on window"))}function R(i,d,g=1e3){if(!i)return;const e=i.volume,f=performance.now(),y=s=>{const L=s-f,a=Math.min(L/g,1),P=a*a;i.volume=e+(d-e)*P,a<1&&requestAnimationFrame(y)};requestAnimationFrame(y)}function be(){const i=document.querySelector("#video"),d=document.querySelector(".video-wrapper");if(!i||!d)return;if(d.querySelector("iframe#youtube-video-iframe")){t.log("YouTube iframe detected, setting up lazy loading");const o=document.querySelector(".video-start-overlay");o&&o.addEventListener("click",function m(n){n.preventDefault(),n.stopPropagation();try{if(!window.audioMuted&&window.playUIClickSound)try{window.playUIClickSound()}catch(l){t.warn("Could not play UI click sound:",l)}t.log("[video.js] Overlay clicked, fading out audio immediately");try{window.cancelActiveFade&&window.cancelActiveFade(),window.fadeBackgroundAudio?window.fadeBackgroundAudio(.001,1e3,()=>{t.log("[video.js] Background audio ducked (vol 0.001) via overlay click")}):window.backgroundAudio&&(window.backgroundAudio.volume=.001)}catch(l){t.warn("Audio fade error (non-critical):",l)}o.classList.add("hidden"),fe();const c=document.getElementById("youtube-video-iframe");if(c){const l=()=>{try{me(()=>{t.log("[video.js] YouTube player initialized after lazy load"),E()})}catch(ne){t.error("YouTube player init error:",ne)}};c.src&&c.contentWindow?setTimeout(l,200):(c.addEventListener("load",l,{once:!0}),setTimeout(l,1e3))}setTimeout(()=>{try{o.remove(),E()}catch(l){t.warn("Overlay remove error:",l)}},400),setTimeout(()=>{try{window.lenis&&typeof window.lenis.start=="function"&&(window.lenis.start(),t.log("[video.js] Ensured Lenis is running after video click")),window.ScrollTrigger&&typeof window.ScrollTrigger.refresh=="function"&&(window.ScrollTrigger.refresh(),t.log("[video.js] Refreshed ScrollTrigger after video click"))}catch(l){t.warn("Scroll safeguard error:",l)}},500)}catch(c){t.error("Video overlay click error (caught to prevent page break):",c),setTimeout(()=>{try{window.lenis&&typeof window.lenis.start=="function"&&window.lenis.start(),window.ScrollTrigger&&typeof window.ScrollTrigger.refresh=="function"&&window.ScrollTrigger.refresh()}catch{}},100)}o.removeEventListener("click",m)});const r=document.querySelector("#video");r&&new IntersectionObserver(n=>{n.forEach(c=>{if(!c.isIntersecting&&h){t.log("[video.js] Main video scrolled out of view, pausing");try{h.getPlayerState()===1&&h.pauseVideo()}catch(l){t.warn("[video.js] Could not pause video:",l)}setTimeout(()=>{!(window.isMainVideoPlaying?window.isMainVideoPlaying():!1)&&window.resumeBackgroundAudio&&!window.audioMuted&&window.resumeBackgroundAudio()},300)}})},{threshold:.25}).observe(r);return}const e=d.querySelector("video");if(!e){t.log("No <video> element found in .video-wrapper, skipping custom video controls");return}t.log("Custom .mp4 video player detected, initializing controls"),window.isMainVideoPlaying=()=>{try{return e&&!e.paused}catch{return!1}};let f=!1;const y=()=>{f||(f=!0,t.log("[video.js] Loading video source..."+(B?" [Safari/iOS mode]":"")),e.src=le,e.load(),t.log("[video.js] Video source set and load() called"))};if(e.poster=ue,e.setAttribute("playsinline",""),e.setAttribute("webkit-playsinline",""),B&&(e.setAttribute("x-webkit-airplay","allow"),t.log("[video.js] Safari/iOS: Set required video attributes")),B)t.log("[video.js] Safari/iOS detected - loading video source immediately"),y();else{const o=()=>{typeof requestIdleCallback<"u"?(requestIdleCallback(()=>{y()},{timeout:4e3}),t.log("[video.js] Scheduled video load via requestIdleCallback")):(setTimeout(()=>{y()},2e3),t.log("[video.js] Scheduled video load via setTimeout (fallback)"))};if(i){const r=new IntersectionObserver(m=>{m.forEach(n=>{n.isIntersecting&&!f&&(t.log("[video.js] Video section approaching viewport, loading immediately"),y(),r.disconnect())})},{rootMargin:"50% 0px",threshold:0});r.observe(i)}o()}e.addEventListener("error",o=>{f&&(t.error("Video loading error:",o),t.error("Video src:",e.src),t.error("Video error code:",e.error?.code),t.error("Video error message:",e.error?.message))}),e.addEventListener("loadeddata",()=>{t.log("[video.js] Video data loaded successfully"),e.style.opacity="1",e.pause()}),e.addEventListener("loadedmetadata",()=>{t.log("[video.js] Video metadata loaded"),e.style.display="none",e.offsetHeight,e.style.display=""});const s=document.createElement("div");s.className="video-overlay";const L=document.createElement("div");L.className="play-button",s.appendChild(L),e.parentNode.insertBefore(s,e.nextSibling);const a=document.createElement("div");a.className="video-audio-slider",a.innerHTML=`
    <div class="audio-slider-track">
      <div class="audio-slider-fill"></div>
      <div class="audio-slider-thumb"></div>
    </div>
    <div class="audio-icon">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" fill="currentColor"/>
      </svg>
    </div>
  `,a.style.cssText=`
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
  `;const P=a.querySelector(".audio-slider-track");P.style.cssText=`
    width: 80px;
    height: 4px;
    background: rgba(255, 255, 255, 0.3);
    border-radius: 2px;
    position: relative;
    cursor: pointer;
  `;const X=a.querySelector(".audio-slider-fill");X.style.cssText=`
    height: 100%;
    background: white;
    border-radius: 2px;
    width: 50%;
    transition: width 0.1s ease;
  `;const H=a.querySelector(".audio-slider-thumb");H.style.cssText=`
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
  `;const ee=a.querySelector(".audio-icon");ee.style.cssText=`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 16px;
    height: 16px;
  `,e.parentNode.appendChild(a);const u=document.createElement("div");u.className="video-progress-bar",u.innerHTML=`
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
  `;const v=u.querySelector(".progress-bar-thumb");v.style.cssText=`
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
  `,e.parentNode.appendChild(u);let q=!1;const _=.3,W=.18,k=()=>{const r=e.volume/_*100;X.style.width=r+"%",H.style.left=r+"%"},$=o=>{const r=P.getBoundingClientRect(),n=Math.max(0,Math.min(100,(o-r.left)/r.width*100))/100*_;if(window.audioMuted&&n>0){const c=document.querySelector(".sound-toggle");c&&c.classList.contains("muted")&&(U=!0,c.click(),setTimeout(()=>{U=!1},100))}n>0?e.muted=!1:e.muted=!0,e.volume=n,n>0&&(M=n),k()};P.addEventListener("mousedown",o=>{q=!0,$(o.clientX),o.preventDefault()}),document.addEventListener("mousemove",o=>{q&&$(o.clientX)}),document.addEventListener("mouseup",()=>{q=!1}),d.addEventListener("mouseenter",()=>{e.paused||(a.style.opacity="1",a.style.pointerEvents="auto")}),d.addEventListener("mouseleave",()=>{a.style.opacity="0",a.style.pointerEvents="none"}),e.addEventListener("volumechange",k),e.volume=W,window.audioMuted?(e.muted=!0,e.volume=0):e.muted=!1,k();let w=!1;const O=()=>{if(e.duration&&!w){const o=e.currentTime/e.duration*100;T.style.transition="none",T.style.width=o+"%",v.style.left=o+"%"}},C=o=>{const r=I.getBoundingClientRect(),n=Math.max(0,Math.min(100,(o-r.left)/r.width*100))/100*e.duration;e.currentTime=n,O(),e.paused||x()},G=()=>{T.style.transition="none",v.style.transition="opacity 0.2s"},K=()=>{T.style.transition="width 0.1s linear",v.style.transition="opacity 0.2s"};I.addEventListener("mousedown",o=>{w=!0,G(),C(o.clientX),o.preventDefault()}),I.addEventListener("click",o=>{w||(G(),C(o.clientX),setTimeout(()=>{K()},50))}),document.addEventListener("mousemove",o=>{w&&C(o.clientX)}),document.addEventListener("mouseup",()=>{w=!1,K()}),u.addEventListener("mouseenter",()=>{v.style.opacity="1",u.style.height="8px",u.style.background="rgba(0, 0, 0, 0.3)"}),u.addEventListener("mouseleave",()=>{w||(v.style.opacity="0"),u.style.height="4px",u.style.background="rgba(0, 0, 0, 0)"});let b=null,z=0;const J=()=>{if(e.duration&&!w&&!e.paused){const o=performance.now();if(o-z>=16.67){const r=e.currentTime/e.duration*100;T.style.width=r+"%",v.style.left=r+"%",z=o}b=requestAnimationFrame(J)}},x=()=>{b&&cancelAnimationFrame(b),z=performance.now(),b=requestAnimationFrame(J)},te=()=>{b&&(cancelAnimationFrame(b),b=null)};e.addEventListener("play",x),e.addEventListener("pause",te),e.addEventListener("timeupdate",O),O();let M=W,p=null;const oe=()=>{e.paused||(M=e.volume,R(e,0,600),p=setTimeout(()=>{e.pause(),p=null},600))},ie=()=>{e.paused||(p&&(clearTimeout(p),p=null),e.pause())},re=()=>{if(!s.classList.contains("loading"))if(e.paused){if(p&&(clearTimeout(p),p=null),f||(t.log("[video.js] User clicked play before lazy load, loading immediately"),y()),e.readyState<1){t.log("[video.js] Video not ready (readyState: "+e.readyState+"), waiting for metadata..."),s.classList.add("loading");const o=()=>{t.log("[video.js] Video ready event fired, readyState: "+e.readyState),e.removeEventListener("loadedmetadata",o),e.removeEventListener("canplay",o),clearTimeout(r),F()};e.addEventListener("loadedmetadata",o),e.addEventListener("canplay",o);const r=setTimeout(()=>{e.removeEventListener("loadedmetadata",o),e.removeEventListener("canplay",o),t.log("[video.js] Timeout reached, attempting to play anyway (readyState: "+e.readyState+")"),F()},3e3);return}F()}else ie()},F=async()=>{t.log("[video.js] playVideo called - readyState: "+e.readyState+", paused: "+e.paused),s.classList.remove("loading"),window.backgroundAudio&&R(window.backgroundAudio,0),window.audioMuted?(e.volume=0,e.muted=!0):(e.muted=!1,e.volume=M);try{t.log("[video.js] Attempting to play video...");const o=e.play();o!==void 0&&await o,s.classList.add("hidden"),k(),x(),t.log("[video.js] Video playback started successfully")}catch(o){t.warn("[video.js] Play failed:",o.name,o.message);try{t.log("[video.js] Retrying with muted video..."),e.muted=!0,e.volume=0;const r=e.play();r!==void 0&&await r,s.classList.add("hidden"),t.log("[video.js] Playing muted due to autoplay policy"),k(),x()}catch(r){t.error("[video.js] Play failed even when muted:",r.name,r.message),s.classList.remove("hidden"),s.classList.remove("loading")}}};let Q=0;const ae=300,V=o=>{const r=Date.now();if(r-Q<ae){t.log("[video.js] Debounced duplicate play/pause trigger");return}Q=r,re()};s.addEventListener("click",V),e.addEventListener("click",V),s.addEventListener("touchend",o=>{o.preventDefault(),V()},{passive:!1}),e.addEventListener("touchend",o=>{o.preventDefault(),V()},{passive:!1}),e.addEventListener("ended",()=>{s.classList.remove("hidden"),a.style.opacity="0",a.style.pointerEvents="none",!window.audioMuted&&window.resumeBackgroundAudio&&(t.log("[video.js] Video ended, resuming background audio"),window.resumeBackgroundAudio())}),e.addEventListener("pause",()=>{s.classList.remove("hidden"),a.style.opacity="0",a.style.pointerEvents="none",!window.audioMuted&&window.resumeBackgroundAudio&&(t.log("[video.js] Video paused, resuming background audio"),window.resumeBackgroundAudio())}),new IntersectionObserver(o=>{o.forEach(r=>{if(!r.isIntersecting){const m=!e.paused;oe(),m&&(t.log("[video.js] Custom video left viewport after playing, ensuring background audio resumes"),setTimeout(()=>{!(window.isMainVideoPlaying?window.isMainVideoPlaying():!1)&&window.resumeBackgroundAudio&&!window.audioMuted&&window.resumeBackgroundAudio()},800))}})},{threshold:.5}).observe(i);const j=()=>{!e.paused&&!e.ended&&(window.audioMuted?(e.volume=0,e.muted=!0):(e.muted=!1,U||(e.volume=M),window.backgroundAudio&&!window.backgroundAudio.paused&&R(window.backgroundAudio,0)),k())},N=document.querySelector(".sound-toggle");if(N){N.addEventListener("click",()=>{setTimeout(()=>{j()},50)}),new MutationObserver(m=>{m.forEach(n=>{n.type==="attributes"&&n.attributeName==="class"&&setTimeout(()=>{j()},50)})}).observe(N,{attributes:!0,attributeFilter:["class"]});let r=window.audioMuted;setInterval(()=>{window.audioMuted!==r&&(r=window.audioMuted,j())},500),setTimeout(()=>{j()},1e3)}}export{be as initVideo};
