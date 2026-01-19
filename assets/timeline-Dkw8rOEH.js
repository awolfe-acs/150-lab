import{g as o,S as ee}from"./index-BGEClKDe.js";import Lt from"./index-BbrXr4yz.js";import{ac as Te,ae as lt,W as ct,ad as dt,ag as ut,C as Ae,ak as It,E as Ft,al as mt,K as zt,z as Mt,am as At,ai as Bt}from"./performanceDetector-Ba6QjR4c.js";import{l as u}from"./logger-2Ii2FPkr.js";function Dt(){const c=document.querySelector("#timeline-cover-canvas");if(!c){u.warn("Cover orb canvas not found");return}if(window.coverOrbInitialized)return u.warn("Cover orb already initialized, skipping duplicate call"),window.coverOrbControls;window.coverOrbInitialized=!0;const v=Te.isMobile(),e=new lt,y=new ct(45,c.clientWidth/c.clientHeight,.1,100);y.position.z=3.5;const i=new dt({canvas:c,alpha:!0,antialias:!v,powerPreference:v?"low-power":"default"});i.setSize(c.clientWidth,c.clientHeight),i.setPixelRatio(Math.min(window.devicePixelRatio,v?1.25:2));const a={noiseStrength:.13,noiseSpeed:.11,noiseDensity:.73,colorDeep:"#9b7bff",colorLight:"#0063d8",colorHighlight:"#00a4af",fresnelPower:1.3,fresnelIntensity:.33,pulseSpeed:.68,pulseIntensity:.14,rotationSpeed:.24,glitterStrength:.078,glitterDensity:70,specularStrength:1.2,glossiness:28},L=`
    uniform float uTime;
    uniform float uNoiseStrength;
    uniform float uNoiseSpeed;
    uniform float uNoiseDensity;
    
    varying vec2 vUv;
    varying vec3 vNormal;
    varying float vDisplacement;
    varying vec3 vPosition;
    varying vec3 vViewPosition;

    // Simplex 3D Noise 
    // by Ian McEwan, Ashima Arts
    vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
    vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}

    float snoise(vec3 v){ 
      const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
      const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);

      // First corner
      vec3 i  = floor(v + dot(v, C.yyy) );
      vec3 x0 = v - i + dot(i, C.xxx) ;

      // Other corners
      vec3 g = step(x0.yzx, x0.xyz);
      vec3 l = 1.0 - g;
      vec3 i1 = min( g.xyz, l.zxy );
      vec3 i2 = max( g.xyz, l.zxy );

      //  x0 = x0 - 0.0 + 0.0 * C 
      vec3 x1 = x0 - i1 + 1.0 * C.xxx;
      vec3 x2 = x0 - i2 + 2.0 * C.xxx;
      vec3 x3 = x0 - 1.0 + 3.0 * C.xxx;

      // Permutations
      i = mod(i, 289.0 ); 
      vec4 p = permute( permute( permute( 
                 i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
               + i.y + vec4(0.0, i1.y, i2.y, 1.0 )) 
               + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));

      // Gradients
      // ( N*N points uniformly over a square, mapped onto an octahedron.)
      float n_ = 1.0/7.0; // N=7
      vec3  ns = n_ * D.wyz - D.xzx;

      vec4 j = p - 49.0 * floor(p * ns.z *ns.z);  //  mod(p,N*N)

      vec4 x_ = floor(j * ns.z);
      vec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)

      vec4 x = x_ *ns.x + ns.yyyy;
      vec4 y = y_ *ns.x + ns.yyyy;
      vec4 h = 1.0 - abs(x) - abs(y);

      vec4 b0 = vec4( x.xy, y.xy );
      vec4 b1 = vec4( x.zw, y.zw );

      vec4 s0 = floor(b0)*2.0 + 1.0;
      vec4 s1 = floor(b1)*2.0 + 1.0;
      vec4 sh = -step(h, vec4(0.0));

      vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
      vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;

      vec3 p0 = vec3(a0.xy,h.x);
      vec3 p1 = vec3(a0.zw,h.y);
      vec3 p2 = vec3(a1.xy,h.z);
      vec3 p3 = vec3(a1.zw,h.w);

      //Normalise gradients
      vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
      p0 *= norm.x;
      p1 *= norm.y;
      p2 *= norm.z;
      p3 *= norm.w;

      // Mix final noise value
      vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
      m = m * m;
      return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), 
                                    dot(p2,x2), dot(p3,x3) ) );
    }

    void main() {
      vUv = uv;
      vNormal = normal;
      
      // Calculate noise based displacement
      float noiseVal = snoise(position * uNoiseDensity + uTime * uNoiseSpeed);
      vDisplacement = noiseVal;
      
      // Displace position along normal
      vec3 newPosition = position + normal * (noiseVal * uNoiseStrength);
      vPosition = newPosition;
      
      vec4 mvPosition = modelViewMatrix * vec4(newPosition, 1.0);
      vViewPosition = -mvPosition.xyz;
      
      gl_Position = projectionMatrix * mvPosition;
    }
  `,P=`
    uniform float uTime;
    uniform vec3 uColorDeep;
    uniform vec3 uColorLight;
    uniform vec3 uColorHighlight;
    uniform float uFresnelPower;
    uniform float uFresnelIntensity;
    uniform float uPulseSpeed;
    uniform float uPulseIntensity;
    uniform float uGlitterStrength;
    uniform float uGlitterDensity;
    uniform float uSpecularStrength;
    uniform float uGlossiness;
    
    varying vec2 vUv;
    varying vec3 vNormal;
    varying float vDisplacement;
    varying vec3 vPosition;
    varying vec3 vViewPosition;

    // Simple pseudo-random function
    float random(vec2 st) {
        return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
    }

    void main() {
      // Mix colors based on displacement/noise
      float mixFactor = smoothstep(-0.5, 0.5, vDisplacement);
      vec3 baseColor = mix(uColorDeep, uColorLight, mixFactor);
      
      vec3 viewDirection = normalize(vViewPosition);
      vec3 normal = normalize(vNormal);
      
      // Fresnel effect for metallic look
      float fresnel = pow(1.0 - dot(viewDirection, normal), uFresnelPower);
      
      // Specular Reflection (Blinn-Phong)
      vec3 lightDir = normalize(vec3(1.0, 1.0, 1.0)); // Directional light from top-right-front
      vec3 halfDir = normalize(lightDir + viewDirection);
      float specAngle = max(dot(normal, halfDir), 0.0);
      float specular = pow(specAngle, uGlossiness);
      
      // Glitter Effect
      // Use normal direction for sparkles so they move naturally with rotation
      // Add very slow time component for subtle life
      float glitterNoise = random(vNormal.xy * uGlitterDensity + uTime * 0.05);
      
      // Use smoothstep for softer, more blended sparkles instead of harsh static
      // High threshold (0.95) ensures only peaks sparkle
      float glitter = smoothstep(0.95, 1.0, glitterNoise) * uGlitterStrength * (fresnel + specular);
      
      // Combine
      vec3 finalColor = baseColor;
      finalColor += uColorHighlight * fresnel * uFresnelIntensity; // Rim light
      finalColor += uColorHighlight * specular * uSpecularStrength; // Glossy highlight
      finalColor += vec3(1.0) * glitter; // White sparkles
      
      // Add subtle pulse to alpha/brightness
      float pulse = 1.0 - uPulseIntensity + uPulseIntensity * sin(uTime * uPulseSpeed);
      
      gl_FragColor = vec4(finalColor * pulse, 1.0);
    }
  `,b=new ut({vertexShader:L,fragmentShader:P,uniforms:{uTime:{value:0},uNoiseStrength:{value:a.noiseStrength},uNoiseSpeed:{value:a.noiseSpeed},uNoiseDensity:{value:a.noiseDensity},uColorDeep:{value:new Ae(a.colorDeep)},uColorLight:{value:new Ae(a.colorLight)},uColorHighlight:{value:new Ae(a.colorHighlight)},uFresnelPower:{value:a.fresnelPower},uFresnelIntensity:{value:a.fresnelIntensity},uPulseSpeed:{value:a.pulseSpeed},uPulseIntensity:{value:a.pulseIntensity},uGlitterStrength:{value:a.glitterStrength},uGlitterDensity:{value:a.glitterDensity},uSpecularStrength:{value:a.specularStrength},uGlossiness:{value:a.glossiness}},transparent:!0}),X=v?64:128,B=new It(1,X,X),_=new Ft(B,b);e.add(_),window.coverOrbParams=a,window.coverOrbUniforms=b.uniforms,window.coverOrbMaterial=b,window.coverOrbOrb=_;const S=()=>{if(window.gui){if(window.gui.__folders&&window.gui.__folders["Cover Orb"])return;const T=window.gui.addFolder("Cover Orb");T.add(a,"noiseStrength",0,2).name("Noise Strength"),T.add(a,"noiseSpeed",0,2).name("Noise Speed"),T.add(a,"noiseDensity",0,5).name("Noise Density"),T.addColor(a,"colorDeep").name("Color Deep"),T.addColor(a,"colorLight").name("Color Light"),T.addColor(a,"colorHighlight").name("Color Highlight"),T.add(a,"fresnelPower",0,5).name("Fresnel Power"),T.add(a,"fresnelIntensity",0,5).name("Fresnel Intensity"),T.add(a,"specularStrength",0,2).name("Spec Strength"),T.add(a,"glossiness",1,100).name("Glossiness"),T.add(a,"glitterStrength",0,2).name("Glitter Str"),T.add(a,"glitterDensity",1,200).name("Glitter Dens"),T.add(a,"pulseSpeed",0,5).name("Pulse Speed"),T.add(a,"pulseIntensity",0,1).name("Pulse Intensity"),T.add(a,"rotationSpeed",0,1).name("Rotation Speed"),T.open()}else setTimeout(S,1500)};setTimeout(S,1500);const k=new mt;let $,H=!1;const Z=v?45:60,te=v?30:45;let U=Z,le=1e3/U,ye=0;Te.onScrollStateChange(({isScrolling:T})=>{U=T?te:Z,le=1e3/U});const ie=()=>{if(H)return;$=requestAnimationFrame(ie);const T=performance.now(),oe=T-ye;if(oe<le||document.hidden)return;ye=T-oe%le;const N=k.getElapsedTime();b.uniforms.uTime.value=N,b.uniforms.uNoiseStrength.value=a.noiseStrength,b.uniforms.uNoiseSpeed.value=a.noiseSpeed,b.uniforms.uNoiseDensity.value=a.noiseDensity,b.uniforms.uColorDeep.value.set(a.colorDeep),b.uniforms.uColorLight.value.set(a.colorLight),b.uniforms.uColorHighlight.value.set(a.colorHighlight),b.uniforms.uFresnelPower.value=a.fresnelPower,b.uniforms.uFresnelIntensity.value=a.fresnelIntensity,b.uniforms.uPulseSpeed.value=a.pulseSpeed,b.uniforms.uPulseIntensity.value=a.pulseIntensity,b.uniforms.uGlitterStrength.value=a.glitterStrength,b.uniforms.uGlitterDensity.value=a.glitterDensity,b.uniforms.uSpecularStrength.value=a.specularStrength,b.uniforms.uGlossiness.value=a.glossiness,_.rotation.y=N*a.rotationSpeed,_.rotation.z=N*(a.rotationSpeed*.5),i.render(e,y)};ie();const j=()=>{if(!c)return;const T=c.clientWidth,oe=c.clientHeight,N=T/oe;y.aspect=N,y.updateProjectionMatrix();const h=3.5,V=2.7/N;y.position.z=Math.max(h,V),i.setSize(T,oe),i.setPixelRatio(Math.min(window.devicePixelRatio,2))};window.addEventListener("resize",j),j();const J={pause:()=>{H=!0,$&&cancelAnimationFrame($)},resume:()=>{H&&(H=!1,ie())},cleanup:()=>{H=!0,$&&cancelAnimationFrame($),window.removeEventListener("resize",j),i.dispose(),B.dispose(),b.dispose(),window.coverOrbInitialized=!1}};return window.coverOrbControls=J,J}function qt(){const c=document.querySelector("#timeline-shader-bg");if(!c){u.warn("Timeline Shader: Canvas #timeline-shader-bg not found");return}const v=Te.getSettings(),e=Te.isMobile(),y=v.timelineShaderDotCount||{x:98,y:54},i={dotCountX:y.x,dotCountY:y.y,spacing:.8,dotSize:e?8:10,waveSpeed:.32,waveFrequencyX:.16,waveFrequencyY:.32,waveAmplitude:1.9,color:"#4fb3d9",opacity:.58,rotationX:-1.7,rotationY:0,rotationZ:.26,cameraZ:60,bobbingAmplitude:1.4,bobbingSpeed:.22,positionX:-2,positionY:-30,positionZ:-16,fadeIntensity:.86};window.timelineShaderParams=i,i.scale=window.innerWidth>1440?6:3.4,setTimeout(()=>{if(window.gui){let h=window.gui.__folders["Timeline Shader"];h||(h=window.gui.addFolder("Timeline Shader")),h.add(i,"waveSpeed",0,2).name("Wave Speed"),h.add(i,"waveAmplitude",0,10).name("Amplitude"),h.add(i,"waveFrequencyX",0,1).name("Freq X"),h.add(i,"waveFrequencyY",0,1).name("Freq Y"),h.add(i,"bobbingAmplitude",0,20).name("Bob Amplitude"),h.add(i,"bobbingSpeed",0,2).name("Bob Speed"),h.add(i,"fadeIntensity",0,1).name("Fade Intensity").onChange(C=>{S&&S.uniforms&&(S.uniforms.uFadeIntensity.value=C)}),h.add(i,"dotSize",.1,10).name("Dot Size").onChange(C=>{S&&S.uniforms&&(S.uniforms.uSize.value=C*P.getPixelRatio())}),h.addColor(i,"color").name("Dot Color").onChange(C=>{S&&S.uniforms&&S.uniforms.uColor.value.set(C)}),h.add(i,"opacity",0,1).name("Opacity").onChange(C=>{S&&S.uniforms&&(S.uniforms.uOpacity.value=C)}),h.add(i,"scale",.1,5).name("Scale").onChange(C=>{k&&k.scale.set(C,C,C)});const V=h.addFolder("Position");V.add(i,"positionX",-200,200).name("Pos X"),V.add(i,"positionY",-200,200).name("Pos Y"),V.add(i,"positionZ",-200,200).name("Pos Z");const re=h.addFolder("Rotation");re.add(i,"rotationX",-Math.PI,Math.PI).name("Rot X"),re.add(i,"rotationY",-Math.PI,Math.PI).name("Rot Y"),re.add(i,"rotationZ",-Math.PI,Math.PI).name("Rot Z")}},1e3);const a=new lt,L=new ct(75,window.innerWidth/window.innerHeight,.1,1e3);L.position.z=i.cameraZ;const P=new dt({canvas:c,alpha:!0,antialias:!1,powerPreference:e?"low-power":"default"});P.setSize(window.innerWidth,window.innerHeight),P.setPixelRatio(Math.min(window.devicePixelRatio,e?.75:1.25)),c.style.width=`${window.innerWidth}px`,c.style.height=`${window.innerHeight}px`;const b=new Mt,X=[],B=-(i.dotCountX*i.spacing)/2,_=-(i.dotCountY*i.spacing)/2;for(let h=0;h<i.dotCountX;h++)for(let V=0;V<i.dotCountY;V++){const re=B+h*i.spacing,C=_+V*i.spacing;X.push(re,C,0)}b.setAttribute("position",new At(X,3));const S=new ut({uniforms:{uTime:{value:0},uColor:{value:new Ae(i.color)},uOpacity:{value:i.opacity},uSize:{value:i.dotSize*P.getPixelRatio()},uFrequencyX:{value:i.waveFrequencyX},uFrequencyY:{value:i.waveFrequencyY},uAmplitude:{value:i.waveAmplitude},uFadeIntensity:{value:i.fadeIntensity}},vertexShader:`
      uniform float uTime;
      uniform float uSize;
      uniform float uFrequencyX;
      uniform float uFrequencyY;
      uniform float uAmplitude;
      
      varying float vDepth;
      
      void main() {
        vec3 pos = position;
        
        // Calculate wave displacement
        // Combine sine waves for organic movement
        float wave1 = sin(pos.x * uFrequencyX + uTime) * uAmplitude;
        float wave2 = cos(pos.y * uFrequencyY + uTime * 0.8) * uAmplitude * 0.5;
        
        pos.z += wave1 + wave2;
        
        vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
        gl_Position = projectionMatrix * mvPosition;
        
        // Pass depth to fragment shader for fade effect
        vDepth = -mvPosition.z;
        
        // Size attenuation based on depth
        gl_PointSize = uSize * (30.0 / vDepth);
      }
    `,fragmentShader:`
      uniform vec3 uColor;
      uniform float uOpacity;
      uniform float uFadeIntensity;
      
      varying float vDepth;
      
      void main() {
        // Circular dot shape
        vec2 center = gl_PointCoord - vec2(0.5);
        float dist = length(center);
        
        if (dist > 0.5) discard;
        
        // Soft edge
        float alpha = 1.0 - smoothstep(0.3, 0.5, dist);
        
        // Apply fog-like fade based on depth
        // Normalize depth to 0-1 range (adjust these values for fade distance)
        float depthFade = 1.0 - smoothstep(30.0, 100.0, vDepth);
        depthFade = mix(1.0, depthFade, uFadeIntensity);
        
        gl_FragColor = vec4(uColor, uOpacity * alpha * depthFade);
      }
    `,transparent:!0,depthWrite:!1,blending:Bt}),k=new zt(b,S);k.rotation.x=i.rotationX,k.rotation.y=i.rotationY,k.rotation.z=i.rotationZ,k.scale.set(i.scale,i.scale,i.scale),k.position.set(i.positionX,i.positionY,i.positionZ),a.add(k);const $=new mt;let H,Z=!1,te=!0,U=!1;const le=e?30:60,ye=e?20:45;let ie=le,j=1e3/ie,J=0;Te.onScrollStateChange(({isScrolling:h})=>{U=h,ie=h?le:ye,j=1e3/ie});const T=new IntersectionObserver(h=>{h.forEach(V=>{te=V.isIntersecting})},{threshold:.1,rootMargin:"50px"});T.observe(c);function oe(){if(Z)return;H=requestAnimationFrame(oe);const h=performance.now(),V=h-J;if(V<j||!te||document.hidden)return;J=h-V%j;const re=$.getElapsedTime();e&&U?S.uniforms.uTime.value+=.008:S.uniforms.uTime.value=re*i.waveSpeed,(!e||!U)&&(S.uniforms.uFrequencyX.value=i.waveFrequencyX,S.uniforms.uFrequencyY.value=i.waveFrequencyY,S.uniforms.uAmplitude.value=i.waveAmplitude,S.uniforms.uColor.value.set(i.color),S.uniforms.uFadeIntensity.value=i.fadeIntensity),S.uniforms.uOpacity.value=i.opacity;let C=0;(!e||!U)&&(C=Math.sin(re*i.bobbingSpeed)*i.bobbingAmplitude),k.position.set(i.positionX,i.positionY+C,i.positionZ),(!e||!U)&&(k.rotation.x=i.rotationX,k.rotation.y=i.rotationY,k.rotation.z=i.rotationZ,k.scale.set(i.scale,i.scale,i.scale)),P.render(a,L)}function N(){L.aspect=window.innerWidth/window.innerHeight,L.updateProjectionMatrix(),P.setSize(window.innerWidth,window.innerHeight),S.uniforms.uSize.value=i.dotSize*P.getPixelRatio(),c.style.width=`${window.innerWidth}px`,c.style.height=`${window.innerHeight}px`,i.scale=window.innerWidth>1440?6:3.4,k.scale.set(i.scale,i.scale,i.scale)}return window.addEventListener("resize",N),requestAnimationFrame(oe),{stop:()=>{Z=!0,cancelAnimationFrame(H),window.removeEventListener("resize",N),T.disconnect()},resume:()=>{Z&&(Z=!1,window.addEventListener("resize",N),N(),$.start(),J=performance.now(),requestAnimationFrame(oe))},updateParams:h=>{Object.assign(i,h)},setTargetFPS:h=>{ie=h,j=1e3/h}}}o.ticker.lagSmoothing(0);Te.onFpsCapChange(c=>{u.log(`[Timeline] Applying GSAP ticker fps cap: ${c.cap}fps (${c.reason})`),o.ticker.fps(c.cap)});let He=0;const _t=window.matchMedia("(max-width: 1024px)").matches?250:150;function Ut(){const c=document.querySelector("#acs-timeline"),v=document.querySelector("#timeline-window-start"),e=document.querySelector("#timeline-window-bg"),y=document.querySelector(".get-involved-message");if(document.querySelector("#timeline-shader-bg")&&!window.timelineShaderControls&&(window.timelineShaderControls=qt(),window.timelineShaderControls&&window.timelineShaderControls.stop&&window.timelineShaderControls.stop()),document.querySelector("#timeline-cover-canvas")&&!window.coverOrbControls&&(window.coverOrbControls=Dt(),window.coverOrbControls&&window.coverOrbControls.pause&&window.coverOrbControls.pause()),!c||!v||!e||!y){u.warn("Timeline: Required elements not found. Skipping timeline initialization.");return}const i=c.querySelector(".timeline-container"),a=c.querySelector(".timeline-track");if(!i||!a){u.warn("Timeline: Container or track not found. Skipping timeline initialization.");return}typeof window.backgroundPaused>"u"&&(window.backgroundPaused=!1);let L=null,P=null,b=!0;const X=(t,n,l)=>t+(n-t)*l,B=()=>{if(!v)return null;const t=v.getBoundingClientRect();return t.width===0||t.height===0?null:{top:t.top-2,left:t.left-6,width:t.width+12,height:t.height+4}},_=()=>{const t=B();return!t||!e?!1:(L={...t},P={...t},q={...t},e.style.position="fixed",e.style.top=`${t.top}px`,e.style.left=`${t.left}px`,e.style.width=`${t.width}px`,e.style.height=`${t.height}px`,e.style.background="linear-gradient(rgb(4, 147, 171), rgb(6, 87, 164))",e.style.borderRadius="4px",e.style.zIndex="0",!0)},S=()=>{if(!v||!e||!b)return;const t=v.getBoundingClientRect();if(t.width===0||t.height===0)return;const n=.1,l=.5,m=.5;P||(P={top:0,left:0,width:0,height:0}),!(!(Math.abs(t.top-P.top)>n||Math.abs(t.left-P.left)>l||Math.abs(t.width-P.width)>m||Math.abs(t.height-P.height)>m)&&P.top!==0)&&(P={top:t.top,left:t.left,width:t.width,height:t.height},L?L={top:X(L.top,t.top,.6),left:X(L.left,t.left,.6),width:X(L.width,t.width,.6),height:X(L.height,t.height,.6)}:L={top:t.top,left:t.left,width:t.width,height:t.height},e.style.position="fixed",e.style.top=`${L.top}px`,e.style.left=`${L.left}px`,e.style.width=`${L.width}px`,e.style.height=`${L.height}px`,e.style.background="linear-gradient(rgb(4, 147, 171), rgb(6, 87, 164))",e.style.zIndex="0",e.style.borderRadius="4px")};o.set(e,{opacity:0,visibility:"hidden"});const k=document.createElement("style");k.id="timeline-window-start-bg-style",k.textContent=`
    #timeline-window-start::before {
      content: '';
      position: absolute;
      top: -2px;
      left: -6px;
      right: -6px;
      bottom: -2px;
      background: linear-gradient(rgb(4, 147, 171), rgb(6, 87, 164));
      border-radius: 4px;
      opacity: 0;
      z-index: -1;
      pointer-events: none;
      transition: opacity 0.3s ease;
    }
  `,document.head.appendChild(k),v.style.position="relative",v.style.zIndex="1";const $=()=>{const t=B();return t?(L={...t},P={...t},q={...t},e.style.position="fixed",e.style.top=`${t.top}px`,e.style.left=`${t.left}px`,e.style.width=`${t.width}px`,e.style.height=`${t.height}px`,e.style.background="linear-gradient(rgb(4, 147, 171), rgb(6, 87, 164))",e.style.borderRadius="4px",!0):!1};requestAnimationFrame(()=>{$()||setTimeout(()=>{$()||setTimeout($,200)},100)});const H=new ResizeObserver(()=>{b&&!document.body.classList.contains("in-timeline")&&_()});H.observe(document.body);let Z=null,te=!1,U=0;const le=window.matchMedia("(max-width: 1024px)").matches?5:3,ye=()=>{if(te)return;te=!0,U=0;const t=()=>{te&&(U++,U%le===0&&S(),Z=requestAnimationFrame(t))};t()},ie=()=>{te&&(te=!1,Z!==null&&(cancelAnimationFrame(Z),Z=null),U=0)};ee.create({trigger:y,start:"top bottom",end:"bottom top",onEnter:()=>{_(),ye()},onLeave:()=>{},onEnterBack:()=>{_(),ye()},onLeaveBack:()=>{ie()}});const j=o.utils.toArray(".timeline-event"),J=o.utils.toArray(".timeline-decade"),T=j.length-1,oe=()=>{const t=window.innerWidth;return t<1025?t:t>=1280?Math.min(1324,t*.92):t*.5},N=()=>window.matchMedia("(max-width: 1024px)").matches,h=()=>window.innerHeight*1,V=()=>window.innerHeight*(N()?.7:.88),re=()=>h()+T*V();V(),re();const C=N()?.6:.88,de=.08,Be=C+de,De=.09+de,pt=T*Be,Ee=De+pt;let F={isLocked:!1,targetIndex:-1,unlockTimer:null,reason:""},qe=0,R=null,D=null,Pe=null,ue=!1,_e=0,E;const Ve=(t,n,l=0)=>{if(!t||!E)return;const m=[],p=t.querySelector(".event-year"),s=t.querySelector(".event-description"),w=t.querySelector(".event-image");p&&m.push(p),s&&m.push(s),w&&m.push(w),m.length&&E.fromTo(m,{opacity:0},{opacity:1,duration:Math.max(.25,C*.65),ease:"power2.out",stagger:.08,force3D:!0},n?`${n}+=${l}`:l)},Ge=t=>{if(R||(R=document.querySelector("#current-timeline-year")),!R){ue=!1;return}o.set(R,{opacity:1}),R.textContent=t,Pe=t,D=new Lt(R,{types:"chars",charClass:"split-char"}),D.chars&&D.chars.length>0?(o.set(D.chars,{opacity:0,y:20,display:"inline-block",force3D:!0}),o.to(D.chars,{opacity:1,y:0,duration:.27,stagger:.02,ease:"power2.out",overwrite:!0,force3D:!0,onComplete:()=>{ue=!1}})):ue=!1},gt=t=>{if(!(!t||t===Pe||ue)){if(ue=!0,R||(R=document.querySelector("#current-timeline-year")),!R){ue=!1;return}D&&D.chars&&D.chars.length>0?o.to(D.chars,{opacity:0,y:-20,duration:.17,stagger:.01,ease:"power2.in",force3D:!0,onComplete:()=>{D&&typeof D.revert=="function"&&D.revert(),Ge(t)}}):Ge(t)}},Ze=()=>{R||(R=document.querySelector("#current-timeline-year")),R&&o.to(R,{opacity:0,duration:.3,ease:"power2.out",force3D:!0,onComplete:()=>{D&&typeof D.revert=="function"&&D.revert(),R.textContent="",Pe=null,ue=!1}})};function ft(){u.log("[Re-entry] Starting timeline re-entry"),he=!0,u.log("[Re-entry] Set isReEntering flag to TRUE - scroll positioning disabled"),Re=!1,xe=!1,window._isTimelineDismissed=!1,window._isDismissing=!1,o.set(y,{opacity:1}),c.classList.contains("closed")||u.warn("[Re-entry] Timeline was not collapsed, should have been"),o.killTweensOf(e),e.style.cssText="";const t=B(),n=t?t.top:window.innerHeight/2-20,l=t?t.left:window.innerWidth/2-100,m=t?t.width:200,p=t?t.height:40;t&&(q={...t}),e.style.position="fixed",e.style.top=`${n}px`,e.style.left=`${l}px`,e.style.width=`${m}px`,e.style.height=`${p}px`,e.style.zIndex="9999",e.style.background="linear-gradient(rgb(4, 147, 171), rgb(6, 87, 164))",e.style.pointerEvents="none",e.style.visibility="visible",e.style.display="block",e.style.borderRadius="4px",e.style.opacity="0.5",u.log("[Re-entry] Background positioned to match timeline-window-start:",{top:n,left:l,width:m,height:p,posValid:!!t});function s(){u.log("[Re-entry] Starting background expansion animation"),e.style.setProperty("--decal-opacity","0"),u.log("[Re-entry] Set shader background (--decal-opacity) to 0");const g=document.getElementById("timeline-window-start-bg-style");g&&(g.textContent=`
          #timeline-window-start::before {
            content: '';
            position: absolute;
            top: -2px;
            left: -6px;
            right: -6px;
            bottom: -2px;
            background: linear-gradient(rgb(4, 147, 171), rgb(6, 87, 164));
            border-radius: 4px;
            opacity: 0 !important;
            z-index: -1;
            pointer-events: none;
            transition: none !important;
          }
        `);const f=o.timeline({onComplete:()=>{u.log("[Re-entry] Expansion complete, now locking background"),e.style.position="fixed",e.style.top="0",e.style.left="0",e.style.width="100vw",e.style.height="100vh",e.style.opacity="1",e.style.visibility="visible",e.style.display="block",e.style.borderRadius="0px",e.style.background="linear-gradient(rgb(4, 147, 171), rgb(6, 87, 164))",e.style.zIndex="9999",ge=!0,u.log("[Re-entry] Background locked at fullscreen - isBgLockedFullscreen = TRUE");function A(){if(!ge)return;const I=e.getBoundingClientRect(),G=e.style.top!=="0px"||e.style.left!=="0px"||e.style.width!=="100vw"||e.style.height!=="100vh",O=Math.abs(I.top)>2||Math.abs(I.left)>2||Math.abs(I.width-window.innerWidth)>5||Math.abs(I.height-window.innerHeight)>5;(G||O)&&(u.warn("[Re-entry] AGGRESSIVE LOCK: Background moved! Inline styles:",{top:e.style.top,left:e.style.left,width:e.style.width,height:e.style.height},"Computed position:",{top:I.top,left:I.left,width:I.width,height:I.height}),e.style.position="fixed",e.style.top="0",e.style.left="0",e.style.width="100vw",e.style.height="100vh",e.style.opacity="1",e.style.visibility="visible",e.style.display="block",e.style.zIndex="9999",e.style.transform="none",e.style.margin="0",e.style.padding="0"),requestAnimationFrame(A)}A(),u.log("[Re-entry] Started aggressive fullscreen protection loop"),document.body.classList.add("in-timeline"),u.log("[Re-entry] Added .in-timeline class for protection"),u.log("[Re-entry] Background locked at fullscreen, now restoring timeline content"),w()}});f.to(e,{top:0,left:0,width:"100vw",height:"100vh",borderRadius:"0px",opacity:1,duration:.6,ease:"power2.inOut",onStart:()=>{u.log("[Re-entry] Background expansion started"),e.style.background="linear-gradient(rgb(4, 147, 171), rgb(6, 87, 164))",e.style.visibility="visible",e.style.display="block",e.style.zIndex="9999"},onUpdate:function(){const A=this.progress();e.style.visibility="visible",e.style.display="block",e.style.background="linear-gradient(rgb(4, 147, 171), rgb(6, 87, 164))",(A===0||A===.5||A===1)&&u.log(`[Re-entry] Expansion progress: ${(A*100).toFixed(0)}%, opacity: ${e.style.opacity}, size: ${e.style.width} x ${e.style.height}`)},onComplete:()=>{u.log("[Re-entry] Background expansion animation complete"),e.style.opacity="1",e.style.background="linear-gradient(rgb(4, 147, 171), rgb(6, 87, 164))"}},0),f.fromTo(e,{opacity:.5},{opacity:1,duration:.6,ease:"none"},0),f.to(y,{opacity:0,duration:.4,ease:"power2.in"},.2);const r=document.querySelector("#background-canvas");r&&f.to(r,{opacity:0,duration:.5,ease:"power2.inOut"},0);const M=document.documentElement;M.style.background="linear-gradient(rgb(4, 147, 171), rgb(6, 87, 164))",u.log("[Re-entry] Starting expansion timeline, duration:",f.duration()),f.play()}function w(){u.log("[Re-entry] Restoring timeline content and structure"),c.style.pointerEvents="",c.style.display="",c.classList.remove("closed"),c.style.opacity="0",i.style.opacity="0",Fe.forEach(r=>{r&&r.enable&&r.enable()}),ee.getAll().forEach(r=>{(r.vars.trigger===c||r.vars.trigger===y||r.vars.pin===i)&&r.enable()}),o.utils.toArray(".timeline-event").forEach(r=>{o.set(r,{opacity:0})});const f=document.querySelector(".timeline-track");f&&o.set(f,{x:0,y:0}),requestAnimationFrame(()=>{ee.refresh(),requestAnimationFrame(()=>{u.log("[Re-entry] Content restored, now scrolling to timeline"),d()})})}function d(){let g;if(E&&E.scrollTrigger){const f=window.innerHeight*.35;g=E.scrollTrigger.start+f}else g=c.getBoundingClientRect().top+window.scrollY;u.log("[Re-entry] Scrolling to timeline position:",g),document.body.classList.add("in-timeline"),window.backgroundPaused||(window.backgroundPaused=!0,window.dispatchEvent(new CustomEvent("timeline:backgroundPaused",{detail:{paused:!0}}))),window.shaderBackgroundRenderer&&window.shaderBackgroundRenderer.setInTimeline&&window.shaderBackgroundRenderer.setInTimeline(!0),window.coverOrbControls&&window.coverOrbControls.resume&&window.coverOrbControls.resume(),window.timelineShaderControls&&window.timelineShaderControls.resume&&window.timelineShaderControls.resume(),E&&E.scrollTrigger&&E.progress(0),window.lenis?window.lenis.scrollTo(g,{duration:.8,easing:f=>Math.min(1,1.001-Math.pow(2,-10*f)),onComplete:()=>{u.log("[Re-entry] Scroll complete, fading in timeline"),e.style.position="fixed",e.style.top="0",e.style.left="0",e.style.width="100vw",e.style.height="100vh",e.style.opacity="1",e.style.visibility="visible",e.style.display="block",e.style.borderRadius="0px",e.style.background="linear-gradient(rgb(4, 147, 171), rgb(6, 87, 164))",u.log("[Re-entry] Locked background at fullscreen state"),he=!1,ge=!1,u.log("[Re-entry] Cleared isReEntering and isBgLockedFullscreen flags to FALSE - scroll positioning re-enabled"),e.style.zIndex="5",o.to(c,{opacity:1,duration:.3,ease:"power2.out"}),o.to(i,{opacity:1,duration:.3,ease:"power2.out"}),o.to(e,{"--decal-opacity":1,duration:.5,ease:"power2.out",onUpdate:function(){const f=o.getProperty(e,"--decal-opacity")||0;e.style.setProperty("--decal-opacity",f)}}),u.log("[Re-entry] Fading in shader background (--decal-opacity)")}}):(window.scrollTo({top:g,behavior:"smooth"}),setTimeout(()=>{u.log("[Re-entry] Scroll complete, fading in timeline"),e.style.position="fixed",e.style.top="0",e.style.left="0",e.style.width="100vw",e.style.height="100vh",e.style.opacity="1",e.style.visibility="visible",e.style.display="block",e.style.borderRadius="0px",e.style.background="linear-gradient(rgb(4, 147, 171), rgb(6, 87, 164))",u.log("[Re-entry] Locked background at fullscreen state (fallback)"),he=!1,ge=!1,u.log("[Re-entry] Cleared isReEntering and isBgLockedFullscreen flags to FALSE - scroll positioning re-enabled"),e.style.zIndex="5",o.to(c,{opacity:1,duration:.3,ease:"power2.out"}),o.to(i,{opacity:1,duration:.3,ease:"power2.out"}),o.to(e,{"--decal-opacity":1,duration:.5,ease:"power2.out",onUpdate:function(){const f=o.getProperty(e,"--decal-opacity")||0;e.style.setProperty("--decal-opacity",f)}}),u.log("[Re-entry] Fading in shader background (--decal-opacity) - fallback")},800))}s()}if(v){const t=n=>{(Re||window._isTimelineDismissed)&&(n.preventDefault(),n.stopPropagation(),ft())};v.addEventListener("click",t,{capture:!0}),v.addEventListener("touchend",t,{passive:!1,capture:!0}),v.style.pointerEvents="auto"}const wt=()=>{R||(R=document.querySelector("#current-timeline-year")),R&&R.style.opacity!=="1"&&o.to(R,{opacity:1,duration:.3,ease:"power2.out"})};let Oe=!1,Ue=-1,je=0;const yt=N()?.003:.001,ht=N()?2:1,be=t=>{Math.abs(t-Ue)<yt||(je++,je%ht===0&&(Ue=t,!Oe&&(Oe=!0,requestAnimationFrame(()=>{Oe=!1,vt()}))))};let $e=null,Ne=null,Ye=null,Le=null,Ie=null;const vt=t=>{$e||($e=document.querySelector(".scrubber-progress")),Ne||(Ne=o.utils.toArray(".marker")),Ye||(Ye=o.utils.toArray(".minor-node"));const n=$e,l=Ne,m=Ye;if(!n||!J.length)return;const p=l.length;let s=0,w=0,d=-1;if(F.isLocked&&F.targetIndex>=0)s=F.targetIndex,w=(2*s+1)/(2*p);else{const g=window.matchMedia("(max-width: 1024px)").matches,f=g?window.innerHeight/2:window.innerWidth/2;let r=null,M=1/0,A=-1;if(j.forEach((I,G)=>{const O=I.getBoundingClientRect(),ce=g?O.top+O.height/2:O.left+O.width/2,ae=Math.abs(ce-f);ae<M&&(M=ae,r=I,A=G)}),A!==-1&&(_e=A),r&&r.classList.contains("timeline-cover"))s=0,d=0,w=1/(2*p),Ze();else if(r){d=A-1,d=Math.max(0,Math.min(d,m.length-1)),wt();const I=r.getAttribute("data-year");if(I&&gt(I),d>=0&&m.length>0){const G=m[d];if(G){const O=parseInt(G.getAttribute("data-decade-index")||"0");s=Math.min(O,p-1)}else s=0}else s=0}else s=0,d=0,w=1/(2*p),Ze()}if(d>=0&&m.length>0){const g=m[d];if(g)if(Le||(Le=document.querySelector(".scrubber-line")),Ie||(Ie=document.querySelector(".scrubber-content")),Le&&Ie){const f=Le.getBoundingClientRect(),r=g.getBoundingClientRect();Ie.getBoundingClientRect();const M=r.left+r.width/2-f.left,A=f.width;w=Math.max(0,Math.min(1,M/A))}else w=(2*s+1)/(2*p);else w=(2*s+1)/(2*p)}else w=(2*s+1)/(2*p);if(o.to(n,{scaleX:w,transformOrigin:"left",duration:.3,ease:"power2.out",force3D:!0,overwrite:"auto"}),l.length>0&&l.forEach((g,f)=>{g.classList.remove("active","complete"),f===s?g.classList.add("active"):f<s&&g.classList.add("complete")}),m.length>0&&m.forEach((g,f)=>{g.classList.remove("active","complete");const r=parseInt(g.getAttribute("data-minor-index")||f);r===d?g.classList.add("active"):r<d&&g.classList.add("complete")}),window.scrubberAutoScroll&&!F.isLocked){const g=s>qe?1:s<qe?-1:0;window.scrubberAutoScroll(s,g),qe=s}};window._updateScrubber=be;const bt=t=>{if(t===0)return(.09+de*.5)/Ee;let n=0;for(let w=0;w<t&&w<J.length;w++){const d=o.utils.toArray(".timeline-event",J[w]);n+=d.length}const l=J[t];if(o.utils.toArray(".timeline-event",l).length===0)return u.warn(`Decade ${t} has no events`),0;const p=n-1,s=De+p*Be+C+de*.5;return Math.min(s/Ee,.99)},Ke=o.timeline({scrollTrigger:{trigger:v,start:"top 90%",end:"top 70%",scrub:1,onLeaveBack:()=>{const t=document.getElementById("timeline-window-start-bg-style");t&&(t.textContent=t.textContent.replace(/opacity: [0-9.]+/,"opacity: 0"))}}}).to({},{duration:1,ease:"power2.out",onUpdate:function(){const n=this.progress()*.5,l=document.getElementById("timeline-window-start-bg-style");l&&(l.textContent=`
          #timeline-window-start::before {
            content: '';
            position: absolute;
            top: -2px;
            left: -6px;
            right: -6px;
            bottom: -2px;
            background: linear-gradient(rgb(4, 147, 171), rgb(6, 87, 164));
            border-radius: 4px;
            opacity: ${n};
            z-index: -1;
            pointer-events: none;
          }
        `)}});let q=null;const Fe=[];typeof window._isTimelineDismissed>"u"&&(window._isTimelineDismissed=!1),typeof window._isDismissing>"u"&&(window._isDismissing=!1);let Re=window._isTimelineDismissed,xe=window._isDismissing,he=!1,ge=!1;function xt(){o.to(i,{opacity:0,duration:.44,ease:"power2.out",onComplete:()=>{St()}})}function St(){xe=!0,window._isDismissing=!0,Re=!0,window._isTimelineDismissed=!0,document.body.classList.remove("in-timeline");const t=document.querySelector("#current-timeline-year");t&&o.to(t,{opacity:0,duration:.44,ease:"power2.out"});const n=document.getElementById("timeline-window-start-bg-style");n&&(n.textContent=`
        #timeline-window-start::before {
          content: '';
          position: absolute;
          top: -2px;
          left: -6px;
          right: -6px;
          bottom: -2px;
          background: linear-gradient(rgb(4, 147, 171), rgb(6, 87, 164));
          border-radius: 4px;
          opacity: 0.5;
          z-index: -1;
          pointer-events: none;
          transition: opacity 0.3s ease;
        }
      `),o.to(y,{opacity:1,duration:.3,ease:"power2.out"}),Fe.forEach(d=>{d&&d.disable&&d.disable()}),ee.getAll().forEach(d=>{(d.vars.trigger===c||d.vars.trigger===y||d.vars.pin===i)&&d.disable()});const l=y.getBoundingClientRect(),m=l.top+window.scrollY,p=window.innerHeight;m-p/2+l.height/2,window.backgroundPaused&&(window.backgroundPaused=!1,window.dispatchEvent(new CustomEvent("timeline:backgroundPaused",{detail:{paused:!1}}))),window.shaderBackgroundRenderer&&window.shaderBackgroundRenderer.setInTimeline&&window.shaderBackgroundRenderer.setInTimeline(!1);const s=document.querySelector("#background-canvas");s&&o.set(s,{opacity:1});const w=document.documentElement;w.style.background="",e.style.cssText=`
      position: fixed !important;
      top: 0 !important;
      left: 0 !important;
      width: 100vw !important;
      height: 100vh !important;
      opacity: 1 !important;
      z-index: 5 !important; /* Behind container (z-index 10) but above other content */
      background: linear-gradient(rgb(4, 147, 171), rgb(6, 87, 164)) !important;
      pointer-events: none !important;
      visibility: visible !important;
      transform: none !important;
      transition: none !important;
    `,c.style.opacity="1",c.style.transition="none",o.to(c,{opacity:0,duration:.44,ease:"power2.inOut",onComplete:()=>{e.style.zIndex="9999",window.lenis?window.lenis.scrollTo(0,{immediate:!0,force:!0,lock:!0}):window.scrollTo(0,0),c.classList.add("closed"),ee.refresh();const d=y.getBoundingClientRect(),g=d.top+window.scrollY,f=window.innerHeight,r=g-f/2+d.height/2;window.lenis?(window.lenis.scrollTo(r,{immediate:!0,force:!0,lock:!0}),window.lenis.resize(),window.lenis.raf(Date.now())):window.scrollTo(0,r),setTimeout(()=>{window.lenis&&window.lenis.resize(),o.to(e,{opacity:0,duration:.44,ease:"power2.inOut",onComplete:()=>{e.style.cssText="",e.style.position="",e.style.top="",e.style.left="",e.style.width="",e.style.height="",e.style.zIndex="",e.style.opacity="",e.style.visibility="",e.style.background="",e.style.pointerEvents="",e.style.transform="",e.style.transition="",e.style.borderRadius="",c.style.pointerEvents="none",document.body.classList.remove("in-timeline"),xe=!1,window._isDismissing=!1}})},100)}})}const Je=window.innerHeight*.33,Qe=Je+600,se=Je/Qe,ze=o.timeline({scrollTrigger:{trigger:y,start:"center center",end:`+=${Qe}`,pin:!0,scrub:N()?1.5:1,anticipatePin:1,invalidateOnRefresh:!0,onRefresh:t=>{if(he){u.log("[Re-entry] onRefresh blocked by isReEntering flag");return}if(ge){u.log("[Re-entry] onRefresh blocked by isBgLockedFullscreen flag");return}if(document.body.classList.contains("in-timeline")){u.log("[Re-entry] onRefresh blocked - already in timeline");return}q=null;const n=se+.01*(1-se),l=B();t.progress>0&&t.progress<n?l&&(e.style.position="fixed",e.style.top=`${l.top}px`,e.style.left=`${l.left}px`,e.style.width=`${l.width}px`,e.style.height=`${l.height}px`,e.style.opacity="0",e.style.visibility="hidden",q={...l}):t.progress>=n&&t.progress<1&&l&&(q={...l})},onUpdate:t=>{if(xe||window._isDismissing||he)return;if(ge){(e.style.top!=="0px"||e.style.left!=="0px"||e.style.width!=="100vw"||e.style.height!=="100vh"||e.style.opacity!=="1")&&(u.log("[Timeline] FULLSCREEN LOCK: Re-locking background at fullscreen"),e.style.position="fixed",e.style.top="0",e.style.left="0",e.style.width="100vw",e.style.height="100vh",e.style.opacity="1",e.style.visibility="visible",e.style.display="block");return}if(document.body.classList.contains("in-timeline")){(e.style.opacity!=="1"||e.style.visibility!=="visible")&&(u.log("[Timeline] onUpdate safety: Forcing background visible (in-timeline)"),e.style.opacity="1",e.style.visibility="visible",e.style.display="block");return}const n=t.progress,l=se+.01*(1-se),m=Math.max(0,(n-se)/(1-se));n>=se&&m<.1&&(window.timelineShaderControls&&window.timelineShaderControls.resume?(window.timelineShaderControls.resume(),t._loggedShaderResume||(t._loggedShaderResume=!0)):t._loggedShaderMissing||(t._loggedShaderMissing=!0,u.warn("[Timeline] Timeline shader controls not available at progress:",n.toFixed(4))),window.coverOrbControls&&window.coverOrbControls.resume?(window.coverOrbControls.resume(),t._loggedOrbResume||(t._loggedOrbResume=!0)):t._loggedOrbMissing||(t._loggedOrbMissing=!0,u.warn("[Timeline] Cover orb controls not available at progress:",n.toFixed(4))));const p=document.getElementById("timeline-window-start-bg-style"),s=performance.now();if(s-He>=_t){He=s;const w=e.getBoundingClientRect();if(Math.abs(w.width-window.innerWidth)<10&&Math.abs(w.height-window.innerHeight)<10&&Math.abs(w.top)<10&&Math.abs(w.left)<10){const r=parseFloat(e.style.opacity||"0");Math.abs(r-1)>.01&&(u.log("[Timeline] SAFETY CHECK: Forcing BG to opacity 1 (was",r,")"),e.style.opacity="1",e.style.visibility="visible");return}const g=window.getComputedStyle(v,"::before");parseFloat(g.opacity||"0")>0&&parseFloat(e.style.opacity||"1")>0&&(e.style.opacity="0",e.style.visibility="hidden")}if(n<l){if(document.body.classList.contains("in-timeline"))return;if(s-He<50){const d=B();d&&(e.style.position="fixed",e.style.top=`${d.top}px`,e.style.left=`${d.left}px`,e.style.width=`${d.width}px`,e.style.height=`${d.height}px`,e.style.background="linear-gradient(rgb(4, 147, 171), rgb(6, 87, 164))",e.style.borderRadius="4px",e.style.opacity="0",e.style.visibility="hidden",q={...d}),p&&(p.textContent=`
                #timeline-window-start::before {
                  content: '';
                  position: absolute;
                  top: -2px;
                  left: -6px;
                  right: -6px;
                  bottom: -2px;
                  background: linear-gradient(rgb(4, 147, 171), rgb(6, 87, 164));
                  border-radius: 4px;
                  opacity: 0.5 !important;
                  z-index: -1;
                  pointer-events: none;
                  transition: none !important;
                }
              `)}}else document.body.classList.contains("in-timeline")&&e.style.opacity!=="1"&&(e.style.opacity="1",e.style.visibility="visible",u.log("[Timeline] Forcing background to opacity 1 - already in timeline")),p&&(p.textContent=`
              #timeline-window-start::before {
                content: '';
                position: absolute;
                top: -2px;
                left: -6px;
                right: -6px;
                bottom: -2px;
                background: linear-gradient(rgb(4, 147, 171), rgb(6, 87, 164));
                border-radius: 4px;
                opacity: 0 !important;
                z-index: -1;
                pointer-events: none;
                transition: none !important;
              }
            `),document.body.classList.contains("in-timeline")||(e.style.opacity="0.5",e.style.visibility="visible")},onEnter:()=>{b=!1,ie(),Ke&&Ke.kill();const t=document.getElementById("timeline-window-start-bg-style");t&&(t.textContent=`
            #timeline-window-start::before {
              content: '';
              position: absolute;
              top: -2px;
              left: -6px;
              right: -6px;
              bottom: -2px;
              background: linear-gradient(rgb(4, 147, 171), rgb(6, 87, 164));
              border-radius: 4px;
              opacity: 0.5 !important;
              z-index: -1;
              pointer-events: none;
              transition: none !important;
            }
          `);const n=B();n?(e.style.position="fixed",e.style.top=`${n.top}px`,e.style.left=`${n.left}px`,e.style.width=`${n.width}px`,e.style.height=`${n.height}px`,e.style.background="linear-gradient(rgb(4, 147, 171), rgb(6, 87, 164))",e.style.borderRadius="4px",e.style.zIndex="0",e.style.opacity="0",e.style.visibility="hidden",q={...n}):u.warn("[Timeline] onEnter: Could not get valid span position")},onLeaveBack:()=>{b=!0,_(),S(),e.style.opacity="0",e.style.visibility="hidden";const t=document.getElementById("timeline-window-start-bg-style");t&&(t.textContent=`
            #timeline-window-start::before {
              content: '';
              position: absolute;
              top: -2px;
              left: -6px;
              right: -6px;
              bottom: -2px;
              background: linear-gradient(rgb(4, 147, 171), rgb(6, 87, 164));
              border-radius: 4px;
              opacity: 0.5;
              z-index: -1;
              pointer-events: none;
              transition: opacity 0.3s ease;
            }
          `)}}});Fe.push(ze.scrollTrigger),ze.fromTo(e,()=>{if(e.style.background="linear-gradient(rgb(4, 147, 171), rgb(6, 87, 164))",q&&q.width>0&&q.height>0)return{top:`${q.top}px`,left:`${q.left}px`,width:`${q.width}px`,height:`${q.height}px`};const t=B();if(t)return q={...t},{top:`${t.top}px`,left:`${t.left}px`,width:`${t.width}px`,height:`${t.height}px`};u.warn("[Timeline] No valid position for expansion animation - using viewport center fallback");const n=200,l=40;return{top:`${(window.innerHeight-l)/2}px`,left:`${(window.innerWidth-n)/2}px`,width:`${n}px`,height:`${l}px`}},{top:0,left:0,width:"100vw",height:"100vh",borderRadius:"0px",ease:"power2.inOut",duration:.7,immediateRender:!1,onStart:()=>{const t=B();if(t&&q){const n=Math.abs(t.top-q.top)+Math.abs(t.left-q.left)+Math.abs(t.width-q.width)+Math.abs(t.height-q.height);n>5&&(u.log("[Timeline] Position drift detected on expansion start, syncing:",n.toFixed(1),"px"),e.style.top=`${t.top}px`,e.style.left=`${t.left}px`,e.style.width=`${t.width}px`,e.style.height=`${t.height}px`,q={...t})}},onUpdate:()=>{e.style.background="linear-gradient(rgb(4, 147, 171), rgb(6, 87, 164))"},onReverseComplete:()=>{e.style.opacity="0"}},se),ze.fromTo(e,{opacity:.5},{opacity:1,duration:.7,ease:"none"},se),document.fonts&&document.fonts.ready&&document.fonts.ready.then(()=>{ee.refresh()});const kt=se+.4*(1-se);ze.to(y,{opacity:0,ease:"power2.in",duration:.6},kt);const z={waveSpeed:.32,waveAmplitude:1.9,waveFrequencyX:.16,waveFrequencyY:.32,bobbingAmplitude:1.4,bobbingSpeed:.22,fadeIntensity:.86,opacity:.58,scale:3.4,rotationX:-1.7,rotationZ:.26,positionY:-30,positionZ:-16},Q={waveSpeed:.2,waveAmplitude:5,waveFrequencyX:.6,waveFrequencyY:1,bobbingAmplitude:2.2,bobbingSpeed:.24,fadeIntensity:.39,opacity:1,scale:3.3,rotationX:-1.6,rotationZ:-1.44,positionY:-20,positionZ:-20},K={};let et=0;const Ct=N()?2:1;let tt=-1;if(E=o.timeline({scrollTrigger:{trigger:c,start:"top top",end:()=>`+=${re()}`,pin:i,scrub:N()?1:.2,anticipatePin:1,invalidateOnRefresh:!0,onRefresh:t=>{if(!(xe||window._isDismissing||he)){if(ge){u.log("[Timeline] Timeline onRefresh blocked by isBgLockedFullscreen flag"),t.animation&&be(t.animation.progress());return}if(document.body.classList.contains("in-timeline")){u.log("[Timeline] Timeline onRefresh - in timeline, skipping background updates"),t.animation&&be(t.animation.progress());return}t.animation&&(be(t.animation.progress()),be(t.animation.progress()))}},onUpdate:t=>{if(xe||window._isDismissing||he||ge)return;const n=t.animation.progress();be(n);const l=.75;if(n>l&&window.timelineShaderControls&&window.timelineShaderControls.updateParams){et++;const m=Math.abs(n-tt);if(!(et%Ct===0||m>.01))return;tt=n;let s=(n-l)/(1-l);s=Math.max(0,Math.min(1,s)),K.waveSpeed=z.waveSpeed+(Q.waveSpeed-z.waveSpeed)*s,K.waveAmplitude=z.waveAmplitude+(Q.waveAmplitude-z.waveAmplitude)*s,K.waveFrequencyX=z.waveFrequencyX+(Q.waveFrequencyX-z.waveFrequencyX)*s,K.waveFrequencyY=z.waveFrequencyY+(Q.waveFrequencyY-z.waveFrequencyY)*s,K.bobbingAmplitude=z.bobbingAmplitude+(Q.bobbingAmplitude-z.bobbingAmplitude)*s,K.bobbingSpeed=z.bobbingSpeed+(Q.bobbingSpeed-z.bobbingSpeed)*s,K.fadeIntensity=z.fadeIntensity+(Q.fadeIntensity-z.fadeIntensity)*s,K.opacity=z.opacity+(Q.opacity-z.opacity)*s,K.scale=z.scale+(Q.scale-z.scale)*s,K.rotationX=z.rotationX+(Q.rotationX-z.rotationX)*s,K.rotationZ=z.rotationZ+(Q.rotationZ-z.rotationZ)*s,K.positionY=z.positionY+(Q.positionY-z.positionY)*s,K.positionZ=z.positionZ+(Q.positionZ-z.positionZ)*s,window.timelineShaderControls.updateParams(K)}},onEnter:()=>{if(!Re&&!window._isTimelineDismissed){document.body.classList.add("in-timeline");const d=document.querySelector('meta[name="theme-color"]');d&&d.setAttribute("content","#000000"),window.backgroundPaused||(window.backgroundPaused=!0,window.dispatchEvent(new CustomEvent("timeline:backgroundPaused",{detail:{paused:!0}}))),window.shaderBackgroundRenderer&&window.shaderBackgroundRenderer.setInTimeline&&window.shaderBackgroundRenderer.setInTimeline(!0),window.coverOrbControls&&window.coverOrbControls.resume&&window.coverOrbControls.resume(),window.timelineShaderControls&&window.timelineShaderControls.resume&&window.timelineShaderControls.resume(),window._timelinePauseTimeout&&(clearTimeout(window._timelinePauseTimeout),window._timelinePauseTimeout=null)}o.set(i,{opacity:1,display:"block",pointerEvents:"auto",visibility:"visible"}),a&&o.set(a,{opacity:1,visibility:"visible",clearProps:N()?"x":"y"}),o.utils.toArray(".timeline-event").forEach(d=>{o.set(d,{visibility:"visible",display:"flex"})});const n=document.querySelector(".timeline-event.timeline-cover");n&&o.set(n,{opacity:1,scale:1,visibility:"visible"}),e.style.zIndex="0",o.to(e,{opacity:1,duration:.2,ease:"none",overwrite:"auto"});const l=document.querySelector("#background-canvas");l&&o.to(l,{opacity:0,duration:.5,ease:"power2.inOut"});const m=document.documentElement;m.style.background="linear-gradient(rgb(4, 147, 171), rgb(6, 87, 164))";const p=o.utils.toArray(".minor-node"),s=o.utils.toArray(".marker"),w=document.querySelector(".scrubber-progress");if(p.length>0&&w){const d=p[0];p.forEach(f=>{f.classList.remove("active","complete")}),d.classList.add("active"),s.length>0&&(s.forEach(f=>{f.classList.remove("active","complete")}),s[0].classList.add("active"));const g=document.querySelector(".scrubber-line");if(g){const f=g.getBoundingClientRect(),r=d.getBoundingClientRect(),M=r.left+r.width/2-f.left,A=f.width,I=Math.max(0,Math.min(1,M/A));o.set(w,{scaleX:I,transformOrigin:"left"})}}R||(R=document.querySelector("#current-timeline-year")),R&&(o.set(R,{opacity:0}),R.textContent="",D&&typeof D.revert=="function"&&(D.revert(),D=null),Pe=null,ue=!1)},onLeave:()=>{document.body.classList.remove("in-timeline"),window.backgroundPaused&&(window.backgroundPaused=!1,window.dispatchEvent(new CustomEvent("timeline:backgroundPaused",{detail:{paused:!1}}))),window.shaderBackgroundRenderer&&window.shaderBackgroundRenderer.setInTimeline&&window.shaderBackgroundRenderer.setInTimeline(!1);const t=document.querySelector("#background-canvas");t&&o.to(t,{opacity:1,duration:.5,ease:"power2.inOut"});const n=document.documentElement;o.to(n,{duration:.5,ease:"power2.inOut",onComplete:function(){n.style.background=""}})},onLeaveBack:()=>{document.body.classList.remove("in-timeline"),window.backgroundPaused&&(window.backgroundPaused=!1,window.dispatchEvent(new CustomEvent("timeline:backgroundPaused",{detail:{paused:!1}}))),window.shaderBackgroundRenderer&&window.shaderBackgroundRenderer.setInTimeline&&window.shaderBackgroundRenderer.setInTimeline(!1);const t=setTimeout(()=>{document.body.classList.contains("in-timeline")||(window.coverOrbControls&&window.coverOrbControls.pause&&window.coverOrbControls.pause(),window.timelineShaderControls&&window.timelineShaderControls.stop&&window.timelineShaderControls.stop())},1e3);window._timelinePauseTimeout=t,R||(R=document.querySelector("#current-timeline-year")),R&&(o.set(R,{opacity:0}),R.textContent="",D&&typeof D.revert=="function"&&(D.revert(),D=null),Pe=null,ue=!1)},onEnterBack:()=>{!Re&&!window._isTimelineDismissed&&(document.body.classList.add("in-timeline"),window.backgroundPaused||(window.backgroundPaused=!0,window.dispatchEvent(new CustomEvent("timeline:backgroundPaused",{detail:{paused:!0}}))),window.shaderBackgroundRenderer&&window.shaderBackgroundRenderer.setInTimeline&&window.shaderBackgroundRenderer.setInTimeline(!0),window.coverOrbControls&&window.coverOrbControls.resume&&window.coverOrbControls.resume(),window.timelineShaderControls&&window.timelineShaderControls.resume&&window.timelineShaderControls.resume(),window._timelinePauseTimeout&&(clearTimeout(window._timelinePauseTimeout),window._timelinePauseTimeout=null)),o.set(i,{opacity:1,display:"block",pointerEvents:"auto",visibility:"visible"}),a&&o.set(a,{opacity:1,visibility:"visible"}),o.utils.toArray(".timeline-event").forEach(m=>{o.set(m,{visibility:"visible",display:"flex"})}),e.style.zIndex="0",o.to(e,{opacity:1,duration:.2,ease:"none",overwrite:"auto"});const n=document.querySelector("#background-canvas");n&&o.to(n,{opacity:0,duration:.5,ease:"power2.inOut"});const l=document.documentElement;l.style.background="linear-gradient(rgb(4, 147, 171), rgb(6, 87, 164))"}}}),Fe.push(E.scrollTrigger),E.fromTo(".timeline-scrubber",{opacity:0,y:30},{opacity:1,y:0,duration:.05,ease:"power2.out",force3D:!0},0),E.to(e,{"--decal-opacity":1,duration:.5,ease:"power2.out",onUpdate:function(){const t=o.getProperty(e,"--decal-opacity")||0;e.style.setProperty("--decal-opacity",t)}},.01),j.length>0){const t=j[0],n=j.slice(1),l="first-event";E.add(l,0),E.fromTo(t,{opacity:0,scale:.95},{opacity:1,scale:1,duration:.25,ease:"power2.out",force3D:!0},l),Ve(t,l,C*.05),E.to({},{duration:de},">"),n.forEach((m,p)=>{const s=()=>window.matchMedia("(max-width: 1024px)").matches,w=()=>{if(s())return 0;const r=oe(),M=window.innerWidth,A=window.innerWidth*.5,I=M+p*r+r*.5;return A-I},d=()=>s()?`${-(p+1)*100}vh`:0,g=`event-${p}`;E.to(a,{x:w,y:d,duration:C,ease:"power1.inOut",force3D:!0},g);const f=p===0?t:n[p-1];E.to(f,{opacity:0,scale:.94,duration:C*.28,ease:"power1.in",force3D:!0},`${g}+=${C*.34}`),E.fromTo(m,{opacity:0,scale:.9},{opacity:1,scale:1,duration:C*1.15,ease:"power2.out",force3D:!0},`${g}+=${C*.1}`),Ve(m,g,C*.12),p===0&&E.fromTo(".timeline-close",{opacity:0},{opacity:1,duration:C*.5,ease:"power2.out",force3D:!0},`${g}+=${C*.3}`),E.to({},{duration:de})})}const it=c.querySelector(".timeline-close");it&&it.addEventListener("click",()=>{xt()});function nt(){const t=o.utils.toArray(".marker");if(!t.length||!J.length){u.warn("Timeline: Markers or decades not found");return}let n=0,l=0;J.forEach((m,p)=>{const s=m.getAttribute("data-decade"),w=o.utils.toArray(".timeline-event",m),d=t.find(r=>r.getAttribute("data-decade")===s);if(!d){u.warn(`Timeline: No marker found for decade ${s}`);return}const g=d.querySelector(".marker-minor-nodes");if(!g){u.warn(`Timeline: No minor nodes container found for decade ${s}`);return}g.innerHTML="";const f=parseInt(s)||0;w.forEach((r,M)=>{if(r.classList.contains("timeline-cover")){n++;return}const I=n===0?(.09+de*.5)/Ee:(De+(n-1)*Be+C+de*.5)/Ee,G=r.getAttribute("data-year")||"";let O=0;const ce=G.match(/\d{4}/);ce&&(O=parseInt(ce[0]));let ae=0;O>0&&f>0&&(ae=(O-f)/10,ae=Math.max(0,Math.min(.95,ae)));const Y=document.createElement("div");Y.className="minor-node",Y.setAttribute("data-event-index",n),Y.setAttribute("data-minor-index",l),Y.setAttribute("data-decade-index",p),Y.setAttribute("data-local-index",M),Y.setAttribute("data-year",G),Y.setAttribute("data-year-numeric",O.toString()),Y.setAttribute("data-year-position",ae.toFixed(3));const Se=document.createElement("div");if(Se.className="minor-node-dot",Y.appendChild(Se),G){const me=document.createElement("div");me.className="minor-node-label",me.textContent=G,Y.appendChild(me)}requestAnimationFrame(()=>{const me=d.getBoundingClientRect(),pe=o.utils.toArray(".marker"),We=p+1;if(We<pe.length){const ve=pe[We].getBoundingClientRect(),ke=me.right,Ce=ve.left-ke,we=30,W=20,ne=Ce-we-W,Me=we+W+ne*ae;Y.style.left=`${Me}px`}else{const fe=window.innerWidth,ve=fe>768?120:100,ke=fe>768?5:fe<640?2:4,Xe=(fe-ve)/ke,Ce=30,we=20,W=Xe-Ce-we,ne=Ce+we+W*ae;Y.style.left=`${ne}px`}}),Y.addEventListener("click",me=>{me.stopPropagation(),F.isLocked=!0,F.reason="minor-node-click",F.unlockTimer&&clearTimeout(F.unlockTimer),o.utils.toArray(".minor-node").forEach(W=>{W.classList.remove("active","complete");const ne=parseInt(W.getAttribute("data-minor-index")||"0");ne<l?W.classList.add("complete"):ne===l&&W.classList.add("active")}),o.utils.toArray(".marker").forEach((W,ne)=>{W.classList.remove("active","complete"),ne===p?W.classList.add("active"):ne<p&&W.classList.add("complete")});const fe=document.querySelector(".scrubber-progress");if(fe){const W=document.querySelector(".scrubber-line");if(W){const ne=W.getBoundingClientRect(),Me=Y.getBoundingClientRect(),Pt=Me.left+Me.width/2-ne.left,Rt=ne.width,Et=Math.max(0,Math.min(1,Pt/Rt));o.to(fe,{scaleX:Et,transformOrigin:"left",duration:.3,ease:"power2.out"})}}const ve=E.scrollTrigger;if(!ve)return;const ke=ve.start,Ce=ve.end-ke,we=ke+Ce*I;window.lenis?window.lenis.scrollTo(we,{duration:1,easing:W=>Math.min(1,1.001-Math.pow(2,-10*W)),onComplete:()=>{F.unlockTimer=setTimeout(()=>{F.isLocked=!1,F.targetIndex=-1,F.reason=""},500)}}):(window.scrollTo({top:we,behavior:"smooth"}),F.unlockTimer=setTimeout(()=>{F.isLocked=!1,F.targetIndex=-1,F.reason=""},1500))}),g.appendChild(Y),n++,l++}),w.filter(r=>!r.classList.contains("timeline-cover")).length})}nt(),window._generateMinorNodes=nt;function Tt(){const t=document.querySelector(".scrubber-scroll-wrapper"),n=document.querySelector(".scrubber-nav-prev"),l=document.querySelector(".scrubber-nav-next"),m=o.utils.toArray(".marker");if(!t||!n||!l){u.warn("Timeline: Scrubber scroll elements not found");return}function p(){const r=t.scrollLeft,M=t.scrollWidth-t.clientWidth;r<=10?n.classList.add("disabled"):n.classList.remove("disabled"),r>=M-10?l.classList.add("disabled"):l.classList.remove("disabled")}function s(r){if(r<0||r>=m.length)return;const M=m[r],A=M.getBoundingClientRect();t.getBoundingClientRect();const I=M.offsetLeft+A.width/2,G=t.clientWidth/2,O=I-G;t.scrollTo({left:Math.max(0,O),behavior:"smooth"})}function w(r){const M=window.innerWidth,A=M>768?120:100,I=M>768?5:M<640?2:4,O=((M-A)/I+60)*3,ce=t.scrollLeft+O*r;t.scrollTo({left:Math.max(0,ce),behavior:"smooth"})}n.addEventListener("click",()=>{w(-1)}),l.addEventListener("click",()=>{w(1)}),t.addEventListener("scroll",p),p();let d=!1,g,f;t.style.cursor="",t.style.userSelect="none",t.addEventListener("mousedown",r=>{d=!0,t.classList.add("active"),t.style.cursor="grabbing",g=r.pageX-t.offsetLeft,f=t.scrollLeft}),t.addEventListener("mouseleave",()=>{d=!1,t.classList.remove("active"),t.style.cursor=""}),t.addEventListener("mouseup",()=>{d=!1,t.classList.remove("active"),t.style.cursor=""}),t.addEventListener("mousemove",r=>{if(!d)return;r.preventDefault();const A=(r.pageX-t.offsetLeft-g)*1.5;t.scrollLeft=f-A}),window.scrubberAutoScroll=(r,M=0)=>{if(r<0||r>=m.length)return;const I=m[r].getBoundingClientRect(),G=t.getBoundingClientRect(),O=G.left+100,ce=G.right-100,ae=I.left>=O&&I.right<=ce;let Y=!1,Se=r;if(!ae)Y=!0;else if(M>0){if(r+1<m.length){const pe=m[r+1].getBoundingClientRect();(pe.right>ce||pe.left>ce)&&(Y=!0,Se=r+1)}}else if(M<0&&r-1>=0){const pe=m[r-1].getBoundingClientRect();(pe.left<O||pe.right<O)&&(Y=!0,Se=r-1)}Y&&s(Se)}}return Tt(),o.utils.toArray(".marker").forEach((t,n)=>{t.addEventListener("click",()=>{F.isLocked=!0,F.targetIndex=n,F.reason="click",F.unlockTimer&&clearTimeout(F.unlockTimer),F.unlockTimer=setTimeout(()=>{F.isLocked=!1,F.targetIndex=-1,F.reason=""},100);const l=bt(n),m=E.scrollTrigger;if(!m)return;const p=m.start,w=m.end-p,d=p+w*l;window.lenis?window.lenis.scrollTo(d,{duration:1.2,easing:g=>Math.min(1,1.001-Math.pow(2,-10*g))}):window.scrollTo({top:d,behavior:"smooth"})}),t.style.cursor="pointer"}),o.timeline({scrollTrigger:{trigger:c,start:"bottom bottom",end:"bottom 80%",scrub:1,onEnterBack:()=>{o.to([e,c],{opacity:1,duration:.3})},onLeave:()=>{}}}).to([e,c],{opacity:0,ease:"power2.in"}),ee.addEventListener("refreshInit",()=>{}),ee.addEventListener("refresh",()=>{if(_e>0){const n=`event-${_e-1}`;if(E.labels[n]!==void 0){const p=(E.labels[n]+C)/E.duration(),s=E.scrollTrigger;if(s){const w=s.start+p*(s.end-s.start);window.scrollTo(0,w)}}}}),window._timelineCleanup={rafId:Z,resizeObserver:H,stopTracking:ie},window._timelinePositioning={positionBgToSpan:S,syncBgToSpanImmediate:_,resetCapturedPosition:()=>{q=null,L={top:0,left:0,width:0,height:0},P={top:0,left:0,width:0,height:0}},setTrackingSpan:t=>{b=t},getTrackingSpan:()=>b},E.scrollTrigger&&(x.timelineScrollTrigger=E.scrollTrigger),x.markerLockRef=F,requestAnimationFrame(()=>{ee.refresh()}),E}let x={isResizing:!1,savedProgress:null,timelineScrollTrigger:null,markerLockRef:null};function Ot(){const c=typeof x<"u"&&x?x.timelineScrollTrigger:null;if(!c||!c.isActive)return null;const v=c.progress,e=o.utils.toArray(".timeline-event"),y=o.utils.toArray(".timeline-decade"),i=o.utils.toArray(".marker");let a=0,L=0,P=-1;i.forEach((X,B)=>{X.classList.contains("active")&&(P=B)});const b=e.length;if(b>0&&v>0){a=Math.min(Math.floor(v*b),b-1);let X=0;for(let B=0;B<y.length;B++){const _=o.utils.toArray(".timeline-event",y[B]);if(a<X+_.length){L=B;break}X+=_.length}}return P>=0&&(L=P),{progress:v,activeEventIndex:a,activeDecadeIndex:L,activeMarkerIndex:P,scrollPosition:window.pageYOffset||document.documentElement.scrollTop}}let ot=null,rt=null,st=window.innerWidth,at=window.innerHeight;function $t(){x.isResizing||(x.isResizing=!0,x.savedProgress=Ot(),document.body.classList.add("timeline-resizing"))}function Nt(){const c=window.innerWidth,v=window.innerHeight,e=Math.abs(c-st),y=Math.abs(v-at),i=e<5&&y>40&&y<200;return st=c,at=v,i}function Yt(){const c=Nt(),v=document.querySelector("#timeline-shader-bg");v&&(v.style.width=`${window.innerWidth}px`,v.style.height=`${window.innerHeight}px`),window._generateMinorNodes&&!c&&window._generateMinorNodes();const e=document.querySelector("#acs-timeline");if(e&&window._timelinePositioning){const y=document.body.classList.contains("in-timeline"),a=e.getBoundingClientRect().top>window.innerHeight*.3;!y&&a?(u.log("[Resize] Before timeline - resetting background position"),window._timelinePositioning.resetCapturedPosition(),window._timelinePositioning.setTrackingSpan&&window._timelinePositioning.setTrackingSpan(!0),requestAnimationFrame(()=>{window._timelinePositioning.syncBgToSpanImmediate&&window._timelinePositioning.syncBgToSpanImmediate()})):y||requestAnimationFrame(()=>{window._timelinePositioning.syncBgToSpanImmediate&&window._timelinePositioning.syncBgToSpanImmediate()})}if(c){u.log("[Resize] Mobile address bar change detected - lightweight refresh"),ee.update(),requestAnimationFrame(()=>{window._timelinePositioning&&window._timelinePositioning.syncBgToSpanImmediate&&window._timelinePositioning.syncBgToSpanImmediate(),document.body.classList.remove("timeline-resizing"),x.isResizing=!1,x.savedProgress=null});return}ee.refresh(!0),requestAnimationFrame(()=>{requestAnimationFrame(()=>{if(ee.update(),e&&window._timelinePositioning){const y=document.body.classList.contains("in-timeline"),a=e.getBoundingClientRect().top>window.innerHeight*.3;!y&&a&&(u.log("[Resize] Post-refresh: Re-syncing background position"),window._timelinePositioning.syncBgToSpanImmediate&&window._timelinePositioning.syncBgToSpanImmediate())}if(x.savedProgress&&x.timelineScrollTrigger){const y=x.timelineScrollTrigger,i=y.start,L=y.end-i,P=i+L*x.savedProgress.progress;if(window.lenis?window.lenis.scrollTo(P,{immediate:!0,force:!0}):window.scrollTo({top:P,behavior:"auto"}),x.savedProgress.activeMarkerIndex>=0&&x.markerLockRef){x.markerLockRef.isLocked=!0,x.markerLockRef.targetIndex=x.savedProgress.activeMarkerIndex,x.markerLockRef.reason="resize",o.utils.toArray(".marker").forEach((k,$)=>{k.classList.remove("active","complete"),$===x.savedProgress.activeMarkerIndex?k.classList.add("active"):$<x.savedProgress.activeMarkerIndex&&k.classList.add("complete")});const X=x.savedProgress.activeEventIndex,B=o.utils.toArray(".minor-node"),_=X-1;B.forEach((k,$)=>{k.classList.remove("active","complete");const H=parseInt(k.getAttribute("data-minor-index")||$);H===_?k.classList.add("active"):H<_&&k.classList.add("complete")});const S=document.querySelector(".scrubber-progress");if(S&&_>=0&&B[_]){const k=B[_],$=document.querySelector(".scrubber-line");$&&k&&requestAnimationFrame(()=>{const H=$.getBoundingClientRect(),Z=k.getBoundingClientRect(),te=Z.left+Z.width/2-H.left,U=H.width,le=Math.max(0,Math.min(1,te/U));o.set(S,{scaleX:le,transformOrigin:"left"})})}}setTimeout(()=>{ee.update(),y.animation&&(y.animation.invalidate(),y.animation.progress(y.animation.progress())),window.dispatchEvent(new Event("scroll")),y.animation&&window._updateScrubber&&requestAnimationFrame(()=>{window._updateScrubber(y.animation.progress())}),setTimeout(()=>{x.markerLockRef&&x.markerLockRef.reason==="resize"&&(x.markerLockRef.isLocked=!1,x.markerLockRef.targetIndex=-1,x.markerLockRef.reason="")},500),document.body.classList.remove("timeline-resizing"),x.isResizing=!1,x.savedProgress=null},150)}else document.body.classList.remove("timeline-resizing"),x.isResizing=!1,x.savedProgress=null})})}window.addEventListener("resize",()=>{clearTimeout(rt),clearTimeout(ot),rt=setTimeout($t,10),ot=setTimeout(Yt,300)});if(window.visualViewport){let c=null;window.visualViewport.addEventListener("resize",()=>{clearTimeout(c),c=setTimeout(()=>{!x.isResizing&&window._timelinePositioning&&(document.body.classList.contains("in-timeline")||(u.log("[VisualViewport] Address bar change - syncing background"),window._timelinePositioning.setTrackingSpan&&window._timelinePositioning.setTrackingSpan(!0),window._timelinePositioning.syncBgToSpanImmediate&&window._timelinePositioning.syncBgToSpanImmediate()))},100)})}function jt(){window._timelineCleanup&&(window._timelineCleanup.rafId&&cancelAnimationFrame(window._timelineCleanup.rafId),window._timelineCleanup.resizeObserver&&window._timelineCleanup.resizeObserver.disconnect(),window._timelineCleanup.lenisCallback&&window.lenis&&window.lenis.off("scroll",window._timelineCleanup.lenisCallback),window._timelineCleanup.scrollCallback&&window.removeEventListener("scroll",window._timelineCleanup.scrollCallback),window._timelineCleanup=null),window.timelineShaderControls&&(window.timelineShaderControls.stop(),window.timelineShaderControls=null),window.backgroundPaused&&(window.backgroundPaused=!1,window.dispatchEvent(new CustomEvent("timeline:backgroundPaused",{detail:{paused:!1}})))}export{jt as disposeTimeline,Ut as initTimelineAnimation};
