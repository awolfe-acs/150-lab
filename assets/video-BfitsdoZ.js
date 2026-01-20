import{l as t}from"./logger-2Ii2FPkr.js";const re=document.querySelector('script[src*="/content/dam/acsorg/150/"]')!==null,ne=window.location.hostname.includes("github.io")||window.location.pathname.startsWith("/150-lab/"),K=re?"/content/dam/acsorg/150/assets":ne?"/150-lab/assets":"",U=/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)||navigator.maxTouchPoints&&navigator.maxTouchPoints>2||window.matchMedia("(max-width: 768px)").matches,J=U?"acs-150-compressed-4.mp4":"acs-150-compressed-3.mp4",G=`${K}/video/${J}`,ae=`${K}/images/ACS150-promo-cover.jpg`,se=/^((?!chrome|android).)*safari/i.test(navigator.userAgent),de=/iPad|iPhone|iPod/.test(navigator.userAgent)&&!window.MSStream,Q=se||de;console.log("[video.js] Device detection:",{isMobile:U,isSafariOrIOS:Q,videoFileName:J});let O=!1,b=null,F=!1,k=!1;function le(i){try{if(k){t.log("YouTube player already initialized, skipping"),i&&i();return}if(window.YT&&window.YT.Player){t.log("YouTube API already loaded, initializing player immediately"),M(),i&&i();return}if(window.onYouTubeIframeAPIReady){t.log("YouTube API is loading, chaining our callback");const e=window.onYouTubeIframeAPIReady;window.onYouTubeIframeAPIReady=()=>{try{typeof e=="function"&&e()}catch(l){t.warn("Error in chained onYouTubeIframeAPIReady callback:",l)}k||M(),i&&i()};return}t.log("Loading YouTube API for the first time");const s=document.createElement("script");s.src="https://www.youtube.com/iframe_api";const g=document.getElementsByTagName("script")[0];g&&g.parentNode?g.parentNode.insertBefore(s,g):document.head.appendChild(s),window.onYouTubeIframeAPIReady=()=>{t.log("YouTube API ready, initializing player"),k||M(),i&&i()}}catch(s){t.error("Error in initYouTubeAPI:",s),i&&i()}}function ue(){if(F){t.log("YouTube iframe already loaded, skipping");return}const i=document.getElementById("youtube-video-iframe");if(i){if(i.src&&i.src!=="about:blank"&&i.src!==""){t.log("YouTube iframe already has src, marking as loaded"),F=!0;return}i.dataset.src&&(t.log("Lazy loading YouTube iframe from data-src"),i.src=i.dataset.src,F=!0)}}let Y=!1;function M(){if(k){t.log("YouTube player already initialized (initPlayer check), skipping");return}const i=document.getElementById("youtube-video-iframe");if(!i||!document.body.contains(i)){t.warn("YouTube iframe not found or not in DOM, delaying player init"),setTimeout(M,100);return}if(!i.src||i.src==="about:blank"){t.warn("YouTube iframe src not set, delaying player init"),setTimeout(M,100);return}k=!0,i.setAttribute("data-player-managed","true"),i.setAttribute("data-yt-player-initialized","true"),window.mainYouTubePlayerManaged=!0,window.mainYouTubePlayerInitializing=!0;try{b=new YT.Player("youtube-video-iframe",{events:{onReady:ce,onStateChange:ge}}),window.isMainVideoPlaying=()=>{try{return Y&&b&&b.getPlayerState&&b.getPlayerState()===1}catch{return!1}},window.isMainYouTubePlayerReady=()=>Y}catch(s){t.error("Error creating YouTube player:",s),k=!1,window.mainYouTubePlayerManaged=!1}}function P(){const i=document.getElementById("youtube-video-wrapper");if(!i)return;i.querySelectorAll("div:not(.video-start-overlay):not(.play-button-overlay)").forEach(g=>{const e=g.style;e.position==="absolute"&&e.top==="0px"&&e.left==="0px"&&e.width==="100%"&&e.height==="100%"&&!g.classList.length&&(t.log("Removing YouTube blocking div"),g.remove())})}function ce(i){t.log("YouTube player ready"),Y=!0,window.mainYouTubePlayerInitializing=!1,window.mainYouTubePlayerReady=!0,P(),setTimeout(P,500),setTimeout(P,1e3)}function ge(i){if(!Y){t.warn("Player state change received but player not ready yet");return}t.log("Main video state changed:",i.data),i.data===1?(P(),t.log("[video.js] Video playing, pausing background audio"),window.cancelActiveFade&&window.cancelActiveFade(),window.backgroundAudio&&(window.fadeBackgroundAudio?window.fadeBackgroundAudio(.001,1e3,()=>{t.log("[video.js] Background audio ducked (vol 0.001)")}):window.backgroundAudio.volume=.001)):(i.data===0||i.data===2)&&(t.log("[video.js] Video paused/ended, calling resumeBackgroundAudio"),window.resumeBackgroundAudio?window.resumeBackgroundAudio():t.error("[video.js] resumeBackgroundAudio not found on window"))}function N(i,s,g=1e3){if(!i)return;const e=i.volume,l=performance.now(),A=a=>{const E=a-l,h=Math.min(E/g,1),L=h*h;i.volume=e+(s-e)*L,h<1&&requestAnimationFrame(A)};requestAnimationFrame(A)}function pe(){const i=document.querySelector("#video"),s=document.querySelector(".video-wrapper");if(!i||!s)return;if(s.querySelector("iframe#youtube-video-iframe")){t.log("YouTube iframe detected, setting up lazy loading");const o=document.querySelector(".video-start-overlay");o&&o.addEventListener("click",function m(n){n.preventDefault(),n.stopPropagation();try{if(!window.audioMuted&&window.playUIClickSound)try{window.playUIClickSound()}catch(d){t.warn("Could not play UI click sound:",d)}t.log("[video.js] Overlay clicked, fading out audio immediately");try{window.cancelActiveFade&&window.cancelActiveFade(),window.fadeBackgroundAudio?window.fadeBackgroundAudio(.001,1e3,()=>{t.log("[video.js] Background audio ducked (vol 0.001) via overlay click")}):window.backgroundAudio&&(window.backgroundAudio.volume=.001)}catch(d){t.warn("Audio fade error (non-critical):",d)}o.classList.add("hidden"),ue();const c=document.getElementById("youtube-video-iframe");if(c){const d=()=>{try{le(()=>{t.log("[video.js] YouTube player initialized after lazy load"),P()})}catch(oe){t.error("YouTube player init error:",oe)}};c.src&&c.contentWindow?setTimeout(d,200):(c.addEventListener("load",d,{once:!0}),setTimeout(d,1e3))}setTimeout(()=>{try{o.remove(),P()}catch(d){t.warn("Overlay remove error:",d)}},400),setTimeout(()=>{try{window.lenis&&typeof window.lenis.start=="function"&&(window.lenis.start(),t.log("[video.js] Ensured Lenis is running after video click")),window.ScrollTrigger&&typeof window.ScrollTrigger.refresh=="function"&&(window.ScrollTrigger.refresh(),t.log("[video.js] Refreshed ScrollTrigger after video click"))}catch(d){t.warn("Scroll safeguard error:",d)}},500)}catch(c){t.error("Video overlay click error (caught to prevent page break):",c),setTimeout(()=>{try{window.lenis&&typeof window.lenis.start=="function"&&window.lenis.start(),window.ScrollTrigger&&typeof window.ScrollTrigger.refresh=="function"&&window.ScrollTrigger.refresh()}catch{}},100)}o.removeEventListener("click",m)});const r=document.querySelector("#video");r&&new IntersectionObserver(n=>{n.forEach(c=>{if(!c.isIntersecting&&b){t.log("[video.js] Main video scrolled out of view, pausing");try{b.getPlayerState()===1&&b.pauseVideo()}catch(d){t.warn("[video.js] Could not pause video:",d)}setTimeout(()=>{!(window.isMainVideoPlaying?window.isMainVideoPlaying():!1)&&window.resumeBackgroundAudio&&!window.audioMuted&&window.resumeBackgroundAudio()},300)}})},{threshold:.25}).observe(r);return}const e=s.querySelector("video");if(!e){t.log("No <video> element found in .video-wrapper, skipping custom video controls");return}t.log("Custom .mp4 video player detected, initializing controls"),window.isMainVideoPlaying=()=>{try{return e&&!e.paused}catch{return!1}},e.setAttribute("playsinline",""),e.setAttribute("webkit-playsinline",""),Q&&e.setAttribute("x-webkit-airplay","allow"),e.src=G,e.poster=ae,e.load(),t.log("[video.js] Video source set:",G,"| Mobile:",U),e.addEventListener("error",o=>{t.error("Video loading error:",o),t.error("Video src:",e.src),t.error("Video error code:",e.error?.code),t.error("Video error message:",e.error?.message)}),e.addEventListener("loadeddata",()=>{t.log("[video.js] Video data loaded successfully"),e.style.opacity="1",e.pause()}),e.addEventListener("loadedmetadata",()=>{t.log("[video.js] Video metadata loaded"),e.style.display="none",e.offsetHeight,e.style.display=""});const l=document.createElement("div");l.className="video-overlay";const A=document.createElement("div");A.className="play-button",l.appendChild(A),e.parentNode.insertBefore(l,e.nextSibling);const a=document.createElement("div");a.className="video-audio-slider",a.innerHTML=`
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
  `;const E=a.querySelector(".audio-slider-track");E.style.cssText=`
    width: 80px;
    height: 4px;
    background: rgba(255, 255, 255, 0.3);
    border-radius: 2px;
    position: relative;
    cursor: pointer;
  `;const h=a.querySelector(".audio-slider-fill");h.style.cssText=`
    height: 100%;
    background: white;
    border-radius: 2px;
    width: 50%;
    transition: width 0.1s ease;
  `;const L=a.querySelector(".audio-slider-thumb");L.style.cssText=`
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
  `;const Z=a.querySelector(".audio-icon");Z.style.cssText=`
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
  `,e.parentNode.appendChild(u);let V=!1;const D=.3,X=.18,f=()=>{const r=e.volume/D*100;h.style.width=r+"%",L.style.left=r+"%"},H=o=>{const r=E.getBoundingClientRect(),n=Math.max(0,Math.min(100,(o-r.left)/r.width*100))/100*D;if(window.audioMuted&&n>0){const c=document.querySelector(".sound-toggle");c&&c.classList.contains("muted")&&(O=!0,c.click(),setTimeout(()=>{O=!1},100))}n>0?e.muted=!1:e.muted=!0,e.volume=n,n>0&&(x=n),f()};E.addEventListener("mousedown",o=>{V=!0,H(o.clientX),o.preventDefault()}),document.addEventListener("mousemove",o=>{V&&H(o.clientX)}),document.addEventListener("mouseup",()=>{V=!1}),s.addEventListener("mouseenter",()=>{e.paused||(a.style.opacity="1",a.style.pointerEvents="auto")}),s.addEventListener("mouseleave",()=>{a.style.opacity="0",a.style.pointerEvents="none"}),e.addEventListener("volumechange",f),e.volume=X,window.audioMuted?(e.muted=!0,e.volume=0):e.muted=!1,f();let w=!1;const j=()=>{if(e.duration&&!w){const o=e.currentTime/e.duration*100;T.style.transition="none",T.style.width=o+"%",y.style.left=o+"%"}},q=o=>{const r=I.getBoundingClientRect(),n=Math.max(0,Math.min(100,(o-r.left)/r.width*100))/100*e.duration;e.currentTime=n,j(),e.paused||S()},R=()=>{T.style.transition="none",y.style.transition="opacity 0.2s"},W=()=>{T.style.transition="width 0.1s linear",y.style.transition="opacity 0.2s"};I.addEventListener("mousedown",o=>{w=!0,R(),q(o.clientX),o.preventDefault()}),I.addEventListener("click",o=>{w||(R(),q(o.clientX),setTimeout(()=>{W()},50))}),document.addEventListener("mousemove",o=>{w&&q(o.clientX)}),document.addEventListener("mouseup",()=>{w=!1,W()}),u.addEventListener("mouseenter",()=>{y.style.opacity="1",u.style.height="8px",u.style.background="rgba(0, 0, 0, 0.3)"}),u.addEventListener("mouseleave",()=>{w||(y.style.opacity="0"),u.style.height="4px",u.style.background="rgba(0, 0, 0, 0)"});let v=null,z=0;const _=()=>{if(e.duration&&!w&&!e.paused){const o=performance.now();if(o-z>=16.67){const r=e.currentTime/e.duration*100;T.style.width=r+"%",y.style.left=r+"%",z=o}v=requestAnimationFrame(_)}},S=()=>{v&&cancelAnimationFrame(v),z=performance.now(),v=requestAnimationFrame(_)},ee=()=>{v&&(cancelAnimationFrame(v),v=null)};e.addEventListener("play",S),e.addEventListener("pause",ee),e.addEventListener("timeupdate",j),j();let x=X,p=null;const te=()=>{e.paused||(x=e.volume,N(e,0,600),p=setTimeout(()=>{e.pause(),p=null},600))},ie=()=>{e.paused||(p&&(clearTimeout(p),p=null),e.pause())},$=()=>{if(e.paused){p&&(clearTimeout(p),p=null),window.backgroundAudio&&N(window.backgroundAudio,0),window.audioMuted?(e.volume=0,e.muted=!0):(e.muted=!1,e.volume=x);const o=e.play();o!==void 0?o.then(()=>{t.log("[video.js] Video playback started successfully"),l.classList.add("hidden"),f(),S()}).catch(r=>{t.warn("[video.js] Play failed:",r.name,r.message),t.log("[video.js] Trying muted playback fallback..."),e.muted=!0,e.volume=0;const m=e.play();m!==void 0&&m.then(()=>{t.log("[video.js] Muted playback started, video is now playing"),l.classList.add("hidden"),f(),S(),window.audioMuted||setTimeout(()=>{try{e.muted=!1,e.volume=x,f(),t.log("[video.js] Successfully unmuted video")}catch(n){t.warn("[video.js] Could not unmute:",n)}},100)}).catch(n=>{t.error("[video.js] Even muted playback failed:",n.name,n.message),l.classList.remove("hidden")})}):(l.classList.add("hidden"),f(),S())}else ie()};l.addEventListener("click",$),e.addEventListener("click",$),e.addEventListener("ended",()=>{l.classList.remove("hidden"),a.style.opacity="0",a.style.pointerEvents="none",!window.audioMuted&&window.resumeBackgroundAudio&&(t.log("[video.js] Video ended, resuming background audio"),window.resumeBackgroundAudio())}),e.addEventListener("pause",()=>{l.classList.remove("hidden"),a.style.opacity="0",a.style.pointerEvents="none",!window.audioMuted&&window.resumeBackgroundAudio&&(t.log("[video.js] Video paused, resuming background audio"),window.resumeBackgroundAudio())}),new IntersectionObserver(o=>{o.forEach(r=>{if(!r.isIntersecting){const m=!e.paused;te(),m&&(t.log("[video.js] Custom video left viewport after playing, ensuring background audio resumes"),setTimeout(()=>{!(window.isMainVideoPlaying?window.isMainVideoPlaying():!1)&&window.resumeBackgroundAudio&&!window.audioMuted&&window.resumeBackgroundAudio()},800))}})},{threshold:.5}).observe(i);const B=()=>{!e.paused&&!e.ended&&(window.audioMuted?(e.volume=0,e.muted=!0):(e.muted=!1,O||(e.volume=x),window.backgroundAudio&&!window.backgroundAudio.paused&&N(window.backgroundAudio,0)),f())},C=document.querySelector(".sound-toggle");if(C){C.addEventListener("click",()=>{setTimeout(()=>{B()},50)}),new MutationObserver(m=>{m.forEach(n=>{n.type==="attributes"&&n.attributeName==="class"&&setTimeout(()=>{B()},50)})}).observe(C,{attributes:!0,attributeFilter:["class"]});let r=window.audioMuted;setInterval(()=>{window.audioMuted!==r&&(r=window.audioMuted,B())},500),setTimeout(()=>{B()},1e3)}}export{pe as initVideo};
