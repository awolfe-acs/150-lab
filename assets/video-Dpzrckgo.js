import{l as t}from"./logger-2Ii2FPkr.js";const ee=document.querySelector('script[src*="/content/dam/acsorg/150/"]')!==null,te=window.location.hostname.includes("github.io")||window.location.pathname.startsWith("/150-lab/"),$=ee?"/content/dam/acsorg/150/assets":te?"/150-lab/assets":"",oe=`${$}/video/acs-150-compressed-3.mp4`,ie=`${$}/images/ACS150-promo-cover.jpg`,re=/^((?!chrome|android).)*safari/i.test(navigator.userAgent),ne=/iPad|iPhone|iPod/.test(navigator.userAgent)&&!window.MSStream,ae=re||ne;ae&&console.log("[video.js] Safari/iOS detected - will use Safari-specific video handling");let O=!1,v=null,F=!1,T=!1;function se(o){try{if(T){t.log("YouTube player already initialized, skipping"),o&&o();return}if(window.YT&&window.YT.Player){t.log("YouTube API already loaded, initializing player immediately"),E(),o&&o();return}if(window.onYouTubeIframeAPIReady){t.log("YouTube API is loading, chaining our callback");const e=window.onYouTubeIframeAPIReady;window.onYouTubeIframeAPIReady=()=>{try{typeof e=="function"&&e()}catch(g){t.warn("Error in chained onYouTubeIframeAPIReady callback:",g)}T||E(),o&&o()};return}t.log("Loading YouTube API for the first time");const a=document.createElement("script");a.src="https://www.youtube.com/iframe_api";const c=document.getElementsByTagName("script")[0];c&&c.parentNode?c.parentNode.insertBefore(a,c):document.head.appendChild(a),window.onYouTubeIframeAPIReady=()=>{t.log("YouTube API ready, initializing player"),T||E(),o&&o()}}catch(a){t.error("Error in initYouTubeAPI:",a),o&&o()}}function de(){if(F){t.log("YouTube iframe already loaded, skipping");return}const o=document.getElementById("youtube-video-iframe");if(o){if(o.src&&o.src!=="about:blank"&&o.src!==""){t.log("YouTube iframe already has src, marking as loaded"),F=!0;return}o.dataset.src&&(t.log("Lazy loading YouTube iframe from data-src"),o.src=o.dataset.src,F=!0)}}let B=!1;function E(){if(T){t.log("YouTube player already initialized (initPlayer check), skipping");return}const o=document.getElementById("youtube-video-iframe");if(!o||!document.body.contains(o)){t.warn("YouTube iframe not found or not in DOM, delaying player init"),setTimeout(E,100);return}if(!o.src||o.src==="about:blank"){t.warn("YouTube iframe src not set, delaying player init"),setTimeout(E,100);return}T=!0,o.setAttribute("data-player-managed","true"),o.setAttribute("data-yt-player-initialized","true"),window.mainYouTubePlayerManaged=!0,window.mainYouTubePlayerInitializing=!0;try{v=new YT.Player("youtube-video-iframe",{events:{onReady:ue,onStateChange:le}}),window.isMainVideoPlaying=()=>{try{return B&&v&&v.getPlayerState&&v.getPlayerState()===1}catch{return!1}},window.isMainYouTubePlayerReady=()=>B}catch(a){t.error("Error creating YouTube player:",a),T=!1,window.mainYouTubePlayerManaged=!1}}function k(){const o=document.getElementById("youtube-video-wrapper");if(!o)return;o.querySelectorAll("div:not(.video-start-overlay):not(.play-button-overlay)").forEach(c=>{const e=c.style;e.position==="absolute"&&e.top==="0px"&&e.left==="0px"&&e.width==="100%"&&e.height==="100%"&&!c.classList.length&&(t.log("Removing YouTube blocking div"),c.remove())})}function ue(o){t.log("YouTube player ready"),B=!0,window.mainYouTubePlayerInitializing=!1,window.mainYouTubePlayerReady=!0,k(),setTimeout(k,500),setTimeout(k,1e3)}function le(o){if(!B){t.warn("Player state change received but player not ready yet");return}t.log("Main video state changed:",o.data),o.data===1?(k(),t.log("[video.js] Video playing, pausing background audio"),window.cancelActiveFade&&window.cancelActiveFade(),window.backgroundAudio&&(window.fadeBackgroundAudio?window.fadeBackgroundAudio(.001,1e3,()=>{t.log("[video.js] Background audio ducked (vol 0.001)")}):window.backgroundAudio.volume=.001)):(o.data===0||o.data===2)&&(t.log("[video.js] Video paused/ended, calling resumeBackgroundAudio"),window.resumeBackgroundAudio?window.resumeBackgroundAudio():t.error("[video.js] resumeBackgroundAudio not found on window"))}function N(o,a,c=1e3){if(!o)return;const e=o.volume,g=performance.now(),A=n=>{const P=n-g,b=Math.min(P/c,1),x=b*b;o.volume=e+(a-e)*x,b<1&&requestAnimationFrame(A)};requestAnimationFrame(A)}function me(){const o=document.querySelector("#video"),a=document.querySelector(".video-wrapper");if(!o||!a)return;if(a.querySelector("iframe#youtube-video-iframe")){t.log("YouTube iframe detected, setting up lazy loading");const i=document.querySelector(".video-start-overlay");i&&i.addEventListener("click",function f(s){s.preventDefault(),s.stopPropagation();try{if(!window.audioMuted&&window.playUIClickSound)try{window.playUIClickSound()}catch(d){t.warn("Could not play UI click sound:",d)}t.log("[video.js] Overlay clicked, fading out audio immediately");try{window.cancelActiveFade&&window.cancelActiveFade(),window.fadeBackgroundAudio?window.fadeBackgroundAudio(.001,1e3,()=>{t.log("[video.js] Background audio ducked (vol 0.001) via overlay click")}):window.backgroundAudio&&(window.backgroundAudio.volume=.001)}catch(d){t.warn("Audio fade error (non-critical):",d)}i.classList.add("hidden"),de();const l=document.getElementById("youtube-video-iframe");if(l){const d=()=>{try{se(()=>{t.log("[video.js] YouTube player initialized after lazy load"),k()})}catch(Z){t.error("YouTube player init error:",Z)}};l.src&&l.contentWindow?setTimeout(d,200):(l.addEventListener("load",d,{once:!0}),setTimeout(d,1e3))}setTimeout(()=>{try{i.remove(),k()}catch(d){t.warn("Overlay remove error:",d)}},400),setTimeout(()=>{try{window.lenis&&typeof window.lenis.start=="function"&&(window.lenis.start(),t.log("[video.js] Ensured Lenis is running after video click")),window.ScrollTrigger&&typeof window.ScrollTrigger.refresh=="function"&&(window.ScrollTrigger.refresh(),t.log("[video.js] Refreshed ScrollTrigger after video click"))}catch(d){t.warn("Scroll safeguard error:",d)}},500)}catch(l){t.error("Video overlay click error (caught to prevent page break):",l),setTimeout(()=>{try{window.lenis&&typeof window.lenis.start=="function"&&window.lenis.start(),window.ScrollTrigger&&typeof window.ScrollTrigger.refresh=="function"&&window.ScrollTrigger.refresh()}catch{}},100)}i.removeEventListener("click",f)});const r=document.querySelector("#video");r&&new IntersectionObserver(s=>{s.forEach(l=>{if(!l.isIntersecting&&v){t.log("[video.js] Main video scrolled out of view, pausing");try{v.getPlayerState()===1&&v.pauseVideo()}catch(d){t.warn("[video.js] Could not pause video:",d)}setTimeout(()=>{!(window.isMainVideoPlaying?window.isMainVideoPlaying():!1)&&window.resumeBackgroundAudio&&!window.audioMuted&&window.resumeBackgroundAudio()},300)}})},{threshold:.25}).observe(r);return}const e=a.querySelector("video");if(!e){t.log("No <video> element found in .video-wrapper, skipping custom video controls");return}t.log("Custom .mp4 video player detected, initializing controls"),window.isMainVideoPlaying=()=>{try{return e&&!e.paused}catch{return!1}},e.src=oe,e.poster=ie,t.log("[video.js] Video source and poster set immediately"),e.addEventListener("error",i=>{t.error("Video loading error:",i),t.error("Video src:",e.src),t.error("Video error code:",e.error?.code),t.error("Video error message:",e.error?.message)}),e.addEventListener("loadeddata",()=>{t.log("[video.js] Video data loaded successfully"),e.style.opacity="1",e.pause()}),e.addEventListener("loadedmetadata",()=>{t.log("[video.js] Video metadata loaded"),e.style.display="none",e.offsetHeight,e.style.display=""});const g=document.createElement("div");g.className="video-overlay";const A=document.createElement("div");A.className="play-button",g.appendChild(A),e.parentNode.insertBefore(g,e.nextSibling);const n=document.createElement("div");n.className="video-audio-slider",n.innerHTML=`
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
  `;const P=n.querySelector(".audio-slider-track");P.style.cssText=`
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
  `;const G=n.querySelector(".audio-icon");G.style.cssText=`
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
  `;const L=u.querySelector(".progress-bar-track");L.style.cssText=`
    width: 100%;
    height: 100%;
    position: relative;
    cursor: pointer;
  `;const h=u.querySelector(".progress-bar-fill");h.style.cssText=`
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
  `,e.parentNode.appendChild(u);let Y=!1;const U=.3,D=.18,S=()=>{const r=e.volume/U*100;b.style.width=r+"%",x.style.left=r+"%"},X=i=>{const r=P.getBoundingClientRect(),s=Math.max(0,Math.min(100,(i-r.left)/r.width*100))/100*U;if(window.audioMuted&&s>0){const l=document.querySelector(".sound-toggle");l&&l.classList.contains("muted")&&(O=!0,l.click(),setTimeout(()=>{O=!1},100))}s>0?e.muted=!1:e.muted=!0,e.volume=s,s>0&&(I=s),S()};P.addEventListener("mousedown",i=>{Y=!0,X(i.clientX),i.preventDefault()}),document.addEventListener("mousemove",i=>{Y&&X(i.clientX)}),document.addEventListener("mouseup",()=>{Y=!1}),a.addEventListener("mouseenter",()=>{e.paused||(n.style.opacity="1",n.style.pointerEvents="auto")}),a.addEventListener("mouseleave",()=>{n.style.opacity="0",n.style.pointerEvents="none"}),e.addEventListener("volumechange",S),e.volume=D,window.audioMuted?(e.muted=!0,e.volume=0):e.muted=!1,S();let w=!1;const V=()=>{if(e.duration&&!w){const i=e.currentTime/e.duration*100;h.style.transition="none",h.style.width=i+"%",p.style.left=i+"%"}},q=i=>{const r=L.getBoundingClientRect(),s=Math.max(0,Math.min(100,(i-r.left)/r.width*100))/100*e.duration;e.currentTime=s,V(),e.paused||z()},H=()=>{h.style.transition="none",p.style.transition="opacity 0.2s"},R=()=>{h.style.transition="width 0.1s linear",p.style.transition="opacity 0.2s"};L.addEventListener("mousedown",i=>{w=!0,H(),q(i.clientX),i.preventDefault()}),L.addEventListener("click",i=>{w||(H(),q(i.clientX),setTimeout(()=>{R()},50))}),document.addEventListener("mousemove",i=>{w&&q(i.clientX)}),document.addEventListener("mouseup",()=>{w=!1,R()}),u.addEventListener("mouseenter",()=>{p.style.opacity="1",u.style.height="8px",u.style.background="rgba(0, 0, 0, 0.3)"}),u.addEventListener("mouseleave",()=>{w||(p.style.opacity="0"),u.style.height="4px",u.style.background="rgba(0, 0, 0, 0)"});let y=null,j=0;const W=()=>{if(e.duration&&!w&&!e.paused){const i=performance.now();if(i-j>=16.67){const r=e.currentTime/e.duration*100;h.style.width=r+"%",p.style.left=r+"%",j=i}y=requestAnimationFrame(W)}},z=()=>{y&&cancelAnimationFrame(y),j=performance.now(),y=requestAnimationFrame(W)},K=()=>{y&&(cancelAnimationFrame(y),y=null)};e.addEventListener("play",z),e.addEventListener("pause",K),e.addEventListener("timeupdate",V),V();let I=D,m=null;const J=()=>{e.paused||(I=e.volume,N(e,0,600),m=setTimeout(()=>{e.pause(),m=null},600))},Q=()=>{e.paused||(m&&(clearTimeout(m),m=null),e.pause())},_=()=>{e.paused?(m&&(clearTimeout(m),m=null),e.play(),g.classList.add("hidden"),window.backgroundAudio&&N(window.backgroundAudio,0),window.audioMuted?(e.volume=0,e.muted=!0):(e.muted=!1,e.volume=I),S(),z()):Q()};g.addEventListener("click",_),e.addEventListener("click",_),e.addEventListener("ended",()=>{g.classList.remove("hidden"),n.style.opacity="0",n.style.pointerEvents="none",!window.audioMuted&&window.resumeBackgroundAudio&&(t.log("[video.js] Video ended, resuming background audio"),window.resumeBackgroundAudio())}),e.addEventListener("pause",()=>{g.classList.remove("hidden"),n.style.opacity="0",n.style.pointerEvents="none",!window.audioMuted&&window.resumeBackgroundAudio&&(t.log("[video.js] Video paused, resuming background audio"),window.resumeBackgroundAudio())}),new IntersectionObserver(i=>{i.forEach(r=>{if(!r.isIntersecting){const f=!e.paused;J(),f&&(t.log("[video.js] Custom video left viewport after playing, ensuring background audio resumes"),setTimeout(()=>{!(window.isMainVideoPlaying?window.isMainVideoPlaying():!1)&&window.resumeBackgroundAudio&&!window.audioMuted&&window.resumeBackgroundAudio()},800))}})},{threshold:.5}).observe(o);const M=()=>{!e.paused&&!e.ended&&(window.audioMuted?(e.volume=0,e.muted=!0):(e.muted=!1,O||(e.volume=I),window.backgroundAudio&&!window.backgroundAudio.paused&&N(window.backgroundAudio,0)),S())},C=document.querySelector(".sound-toggle");if(C){C.addEventListener("click",()=>{setTimeout(()=>{M()},50)}),new MutationObserver(f=>{f.forEach(s=>{s.type==="attributes"&&s.attributeName==="class"&&setTimeout(()=>{M()},50)})}).observe(C,{attributes:!0,attributeFilter:["class"]});let r=window.audioMuted;setInterval(()=>{window.audioMuted!==r&&(r=window.audioMuted,M())},500),setTimeout(()=>{M()},1e3)}}export{me as initVideo};
