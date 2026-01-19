function r(){if(!window.visualViewport)return;const o=()=>{let e=document.getElementById("android-nav-probe-wrapper"),t=document.getElementById("android-nav-probe");return e||(e=document.createElement("div"),e.id="android-nav-probe-wrapper",e.style.cssText=`
        position: fixed;
        left: 0;
        top: 0;
        height: 100vh;
        width: 1px;
        pointer-events: none;
        visibility: hidden;
        z-index: -1;
      `,t=document.createElement("div"),t.id="android-nav-probe",t.style.cssText=`
        position: absolute;
        bottom: 0;
        left: 0;
        height: 0;
        width: 1px;
      `,e.appendChild(t),document.body.appendChild(e)),t},n=()=>{const t=o().getBoundingClientRect().bottom,i=window.visualViewport.height,d=Math.max(0,t-i);document.documentElement.style.setProperty("--js-detected-nav-height",`${d}px`)};n(),window.visualViewport.addEventListener("resize",n),window.visualViewport.addEventListener("scroll",n),window.addEventListener("resize",n),window.addEventListener("orientationchange",()=>setTimeout(n,120))}function s(){r()}export{r as adjustForAndroidNav,s as initAndroidNavAdjustments};
