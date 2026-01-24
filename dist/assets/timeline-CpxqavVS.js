import{g as o,S as J}from"./index-B8M1MhT3.js";import Ft from"./index-BbrXr4yz.js";import{ac as Re,af as mt,W as pt,ad as gt,ah as wt,C as _e,al as Mt,E as Dt,am as ft,K as zt,z as At,an as Bt,aj as _t,ae as Be}from"./mobileFilmGrain-CmB6Tq7x.js";import{l}from"./logger-2Ii2FPkr.js";function qt(){const d=document.querySelector("#timeline-cover-canvas");if(!d){l.warn("Cover orb canvas not found");return}if(window.coverOrbInitialized)return l.warn("Cover orb already initialized, skipping duplicate call"),window.coverOrbControls;window.coverOrbInitialized=!0;const v=Re.isMobile(),e=new mt,h=new pt(45,d.clientWidth/d.clientHeight,.1,100);h.position.z=3.5;const i=new gt({canvas:d,alpha:!0,antialias:!v,powerPreference:v?"low-power":"default"});i.setSize(d.clientWidth,d.clientHeight),i.setPixelRatio(Math.min(window.devicePixelRatio,v?1.25:2));const c={noiseStrength:.13,noiseSpeed:.11,noiseDensity:.73,colorDeep:"#9b7bff",colorLight:"#0063d8",colorHighlight:"#00a4af",fresnelPower:1.3,fresnelIntensity:.33,pulseSpeed:.68,pulseIntensity:.14,rotationSpeed:.24,glitterStrength:.078,glitterDensity:70,specularStrength:1.2,glossiness:28},E=`
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
  `,R=`
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
  `,b=new wt({vertexShader:E,fragmentShader:R,uniforms:{uTime:{value:0},uNoiseStrength:{value:c.noiseStrength},uNoiseSpeed:{value:c.noiseSpeed},uNoiseDensity:{value:c.noiseDensity},uColorDeep:{value:new _e(c.colorDeep)},uColorLight:{value:new _e(c.colorLight)},uColorHighlight:{value:new _e(c.colorHighlight)},uFresnelPower:{value:c.fresnelPower},uFresnelIntensity:{value:c.fresnelIntensity},uPulseSpeed:{value:c.pulseSpeed},uPulseIntensity:{value:c.pulseIntensity},uGlitterStrength:{value:c.glitterStrength},uGlitterDensity:{value:c.glitterDensity},uSpecularStrength:{value:c.specularStrength},uGlossiness:{value:c.glossiness}},transparent:!0}),X=v?64:128,D=new Mt(1,X,X),_=new Dt(D,b);e.add(_),window.coverOrbParams=c,window.coverOrbUniforms=b.uniforms,window.coverOrbMaterial=b,window.coverOrbOrb=_;const k=()=>{if(window.gui){if(window.gui.__folders&&window.gui.__folders["Cover Orb"])return;const x=window.gui.addFolder("Cover Orb");x.add(c,"noiseStrength",0,2).name("Noise Strength"),x.add(c,"noiseSpeed",0,2).name("Noise Speed"),x.add(c,"noiseDensity",0,5).name("Noise Density"),x.addColor(c,"colorDeep").name("Color Deep"),x.addColor(c,"colorLight").name("Color Light"),x.addColor(c,"colorHighlight").name("Color Highlight"),x.add(c,"fresnelPower",0,5).name("Fresnel Power"),x.add(c,"fresnelIntensity",0,5).name("Fresnel Intensity"),x.add(c,"specularStrength",0,2).name("Spec Strength"),x.add(c,"glossiness",1,100).name("Glossiness"),x.add(c,"glitterStrength",0,2).name("Glitter Str"),x.add(c,"glitterDensity",1,200).name("Glitter Dens"),x.add(c,"pulseSpeed",0,5).name("Pulse Speed"),x.add(c,"pulseIntensity",0,1).name("Pulse Intensity"),x.add(c,"rotationSpeed",0,1).name("Rotation Speed"),x.open()}else setTimeout(k,1500)};setTimeout(k,1500);const C=new ft;let O,H=!1;const G=v?45:60,te=v?30:45;let j=G,ce=1e3/j,ve=0;Re.onScrollStateChange(({isScrolling:x})=>{j=x?te:G,ce=1e3/j});const ie=()=>{if(H)return;O=requestAnimationFrame(ie);const x=performance.now(),oe=x-ve;if(oe<ce||document.hidden)return;ve=x-oe%ce;const Q=C.getElapsedTime();b.uniforms.uTime.value=Q,b.uniforms.uNoiseStrength.value=c.noiseStrength,b.uniforms.uNoiseSpeed.value=c.noiseSpeed,b.uniforms.uNoiseDensity.value=c.noiseDensity,b.uniforms.uColorDeep.value.set(c.colorDeep),b.uniforms.uColorLight.value.set(c.colorLight),b.uniforms.uColorHighlight.value.set(c.colorHighlight),b.uniforms.uFresnelPower.value=c.fresnelPower,b.uniforms.uFresnelIntensity.value=c.fresnelIntensity,b.uniforms.uPulseSpeed.value=c.pulseSpeed,b.uniforms.uPulseIntensity.value=c.pulseIntensity,b.uniforms.uGlitterStrength.value=c.glitterStrength,b.uniforms.uGlitterDensity.value=c.glitterDensity,b.uniforms.uSpecularStrength.value=c.specularStrength,b.uniforms.uGlossiness.value=c.glossiness,_.rotation.y=Q*c.rotationSpeed,_.rotation.z=Q*(c.rotationSpeed*.5),i.render(e,h)};ie();const ue=()=>{if(!d)return;const x=d.clientWidth,oe=d.clientHeight,Q=x/oe;h.aspect=Q,h.updateProjectionMatrix();const w=3.5,V=2.7/Q;h.position.z=Math.max(w,V),i.setSize(x,oe),i.setPixelRatio(Math.min(window.devicePixelRatio,2))};window.addEventListener("resize",ue),ue();const ne={pause:()=>{H=!0,O&&cancelAnimationFrame(O)},resume:()=>{H&&(H=!1,ie())},cleanup:()=>{H=!0,O&&cancelAnimationFrame(O),window.removeEventListener("resize",ue),i.dispose(),D.dispose(),b.dispose(),window.coverOrbInitialized=!1}};return window.coverOrbControls=ne,ne}function Ot(){const d=document.querySelector("#timeline-shader-bg");if(!d){l.warn("Timeline Shader: Canvas #timeline-shader-bg not found");return}const v=Re.getSettings(),e=Re.isMobile(),h=v.timelineShaderDotCount||{x:62,y:36},i={dotCountX:h.x,dotCountY:h.y,spacing:.8,dotSize:e?8:10,waveSpeed:.32,waveFrequencyX:.16,waveFrequencyY:.32,waveAmplitude:1.9,color:"#4fb3d9",opacity:.58,rotationX:-1.7,rotationY:0,rotationZ:.26,cameraZ:60,bobbingAmplitude:1.4,bobbingSpeed:.22,positionX:-2,positionY:-30,positionZ:-16,fadeIntensity:.86};window.timelineShaderParams=i,i.scale=(window.innerWidth>1440,3.4),setTimeout(()=>{if(window.gui){let w=window.gui.__folders["Timeline Shader"];w||(w=window.gui.addFolder("Timeline Shader")),w.add(i,"waveSpeed",0,2).name("Wave Speed"),w.add(i,"waveAmplitude",0,10).name("Amplitude"),w.add(i,"waveFrequencyX",0,1).name("Freq X"),w.add(i,"waveFrequencyY",0,1).name("Freq Y"),w.add(i,"bobbingAmplitude",0,20).name("Bob Amplitude"),w.add(i,"bobbingSpeed",0,2).name("Bob Speed"),w.add(i,"fadeIntensity",0,1).name("Fade Intensity").onChange(Y=>{k&&k.uniforms&&(k.uniforms.uFadeIntensity.value=Y)}),w.add(i,"dotSize",.1,10).name("Dot Size").onChange(Y=>{k&&k.uniforms&&(k.uniforms.uSize.value=Y*R.getPixelRatio())}),w.addColor(i,"color").name("Dot Color").onChange(Y=>{k&&k.uniforms&&k.uniforms.uColor.value.set(Y)}),w.add(i,"opacity",0,1).name("Opacity").onChange(Y=>{k&&k.uniforms&&(k.uniforms.uOpacity.value=Y)}),w.add(i,"scale",.1,5).name("Scale").onChange(Y=>{C&&C.scale.set(Y,Y,Y)});const V=w.addFolder("Position");V.add(i,"positionX",-200,200).name("Pos X"),V.add(i,"positionY",-200,200).name("Pos Y"),V.add(i,"positionZ",-200,200).name("Pos Z");const re=w.addFolder("Rotation");re.add(i,"rotationX",-Math.PI,Math.PI).name("Rot X"),re.add(i,"rotationY",-Math.PI,Math.PI).name("Rot Y"),re.add(i,"rotationZ",-Math.PI,Math.PI).name("Rot Z")}},1e3);const c=new mt,E=new pt(75,window.innerWidth/window.innerHeight,.1,1e3);E.position.z=i.cameraZ;const R=new gt({canvas:d,alpha:!0,antialias:!1,powerPreference:e?"low-power":"default"});R.setSize(window.innerWidth,window.innerHeight),R.setPixelRatio(Math.min(window.devicePixelRatio,e?.75:1.25)),d.style.width=`${window.innerWidth}px`,d.style.height=`${window.innerHeight}px`;const b=new At,X=[],D=-(i.dotCountX*i.spacing)/2,_=-(i.dotCountY*i.spacing)/2;for(let w=0;w<i.dotCountX;w++)for(let V=0;V<i.dotCountY;V++){const re=D+w*i.spacing,Y=_+V*i.spacing;X.push(re,Y,0)}b.setAttribute("position",new Bt(X,3));const k=new wt({uniforms:{uTime:{value:0},uColor:{value:new _e(i.color)},uOpacity:{value:i.opacity},uSize:{value:i.dotSize*R.getPixelRatio()},uFrequencyX:{value:i.waveFrequencyX},uFrequencyY:{value:i.waveFrequencyY},uAmplitude:{value:i.waveAmplitude},uFadeIntensity:{value:i.fadeIntensity}},vertexShader:`
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
    `,transparent:!0,depthWrite:!1,blending:_t}),C=new zt(b,k);C.rotation.x=i.rotationX,C.rotation.y=i.rotationY,C.rotation.z=i.rotationZ,C.scale.set(i.scale,i.scale,i.scale),C.position.set(i.positionX,i.positionY,i.positionZ),c.add(C);const O=new ft;let H,G=!1,te=!0,j=!1;const ce=e?30:60,ve=e?20:45;let ie=ce,ue=1e3/ie,ne=0;Re.onScrollStateChange(({isScrolling:w})=>{j=w,ie=w?ce:ve,ue=1e3/ie});const x=new IntersectionObserver(w=>{w.forEach(V=>{te=V.isIntersecting})},{threshold:.1,rootMargin:"50px"});x.observe(d);function oe(){if(G)return;H=requestAnimationFrame(oe);const w=performance.now(),V=w-ne;if(V<ue||!te||document.hidden)return;ne=w-V%ue;const re=O.getElapsedTime();if(e&&j?k.uniforms.uTime.value+=.008:k.uniforms.uTime.value=re*i.waveSpeed,(!e||!j)&&(k.uniforms.uFrequencyX.value=i.waveFrequencyX,k.uniforms.uFrequencyY.value=i.waveFrequencyY,k.uniforms.uAmplitude.value=i.waveAmplitude,k.uniforms.uColor.value.set(i.color),k.uniforms.uFadeIntensity.value=i.fadeIntensity),k.uniforms.uOpacity.value=i.opacity,!e){const Y=Math.sin(re*i.bobbingSpeed)*i.bobbingAmplitude;C.position.set(i.positionX,i.positionY+Y,i.positionZ),C.rotation.x=i.rotationX,C.rotation.y=i.rotationY,C.rotation.z=i.rotationZ,C.scale.set(i.scale,i.scale,i.scale)}R.render(c,E)}function Q(){E.aspect=window.innerWidth/window.innerHeight,E.updateProjectionMatrix(),R.setSize(window.innerWidth,window.innerHeight),k.uniforms.uSize.value=i.dotSize*R.getPixelRatio(),d.style.width=`${window.innerWidth}px`,d.style.height=`${window.innerHeight}px`,i.scale=(window.innerWidth>1440,3.4),C.scale.set(i.scale,i.scale,i.scale)}return window.addEventListener("resize",Q),requestAnimationFrame(oe),{stop:()=>{G=!0,cancelAnimationFrame(H),window.removeEventListener("resize",Q),x.disconnect()},resume:()=>{G&&(G=!1,window.addEventListener("resize",Q),e||Q(),O.start(),ne=performance.now(),requestAnimationFrame(oe))},updateParams:w=>{Object.assign(i,w)},setTargetFPS:w=>{ie=w,ue=1e3/w}}}o.ticker.lagSmoothing(0);Re.onFpsCapChange(d=>{l.log(`[Timeline] Applying GSAP ticker fps cap: ${d.cap}fps (${d.reason})`),o.ticker.fps(d.cap)});let Ze=0;const $t=window.matchMedia("(max-width: 1024px)").matches?250:150;function Kt(){const d=document.querySelector("#acs-timeline"),v=document.querySelector("#timeline-window-start"),e=document.querySelector("#timeline-window-bg"),h=document.querySelector(".get-involved-message");if(document.querySelector("#timeline-shader-bg")&&!window.timelineShaderControls&&(window.timelineShaderControls=Ot(),window.timelineShaderControls&&window.timelineShaderControls.stop&&window.timelineShaderControls.stop()),document.querySelector("#timeline-cover-canvas")&&!window.coverOrbControls&&(window.coverOrbControls=qt(),window.coverOrbControls&&window.coverOrbControls.pause&&window.coverOrbControls.pause()),!d||!v||!e||!h){l.warn("Timeline: Required elements not found. Skipping timeline initialization.");return}const i=d.querySelector(".timeline-container"),c=d.querySelector(".timeline-track");if(!i||!c){l.warn("Timeline: Container or track not found. Skipping timeline initialization.");return}typeof window.backgroundPaused>"u"&&(window.backgroundPaused=!1);let E=null,R=null,b=!0;const X=(t,n,r)=>t+(n-t)*r,D=()=>{if(!v)return null;const t=v.getBoundingClientRect();return t.width===0||t.height===0?null:{top:t.top-2,left:t.left-6,width:t.width+12,height:t.height+4}},_=()=>{const t=D();return!t||!e?!1:(E={...t},R={...t},B={...t},e.style.position="fixed",e.style.top=`${t.top}px`,e.style.left=`${t.left}px`,e.style.width=`${t.width}px`,e.style.height=`${t.height}px`,e.style.background="linear-gradient(rgb(4, 147, 171), rgb(6, 87, 164))",e.style.borderRadius="4px",e.style.zIndex="0",!0)},k=()=>{if(!v||!e||!b)return;const t=v.getBoundingClientRect();if(t.width===0||t.height===0)return;const n=.1,r=.5,m=.5;R||(R={top:0,left:0,width:0,height:0}),!(!(Math.abs(t.top-R.top)>n||Math.abs(t.left-R.left)>r||Math.abs(t.width-R.width)>m||Math.abs(t.height-R.height)>m)&&R.top!==0)&&(R={top:t.top,left:t.left,width:t.width,height:t.height},E?E={top:X(E.top,t.top,.6),left:X(E.left,t.left,.6),width:X(E.width,t.width,.6),height:X(E.height,t.height,.6)}:E={top:t.top,left:t.left,width:t.width,height:t.height},e.style.position="fixed",e.style.top=`${E.top}px`,e.style.left=`${E.left}px`,e.style.width=`${E.width}px`,e.style.height=`${E.height}px`,e.style.background="linear-gradient(rgb(4, 147, 171), rgb(6, 87, 164))",e.style.zIndex="0",e.style.borderRadius="4px")};o.set(e,{opacity:0,visibility:"hidden"});const C=document.createElement("style");C.id="timeline-window-start-bg-style",C.textContent=`
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
  `,document.head.appendChild(C),v.style.position="relative",v.style.zIndex="1";const O=()=>{const t=D();return t?(E={...t},R={...t},B={...t},e.style.position="fixed",e.style.top=`${t.top}px`,e.style.left=`${t.left}px`,e.style.width=`${t.width}px`,e.style.height=`${t.height}px`,e.style.background="linear-gradient(rgb(4, 147, 171), rgb(6, 87, 164))",e.style.borderRadius="4px",!0):!1};requestAnimationFrame(()=>{O()||setTimeout(()=>{O()||setTimeout(O,200)},100)});const H=new ResizeObserver(()=>{b&&!document.body.classList.contains("in-timeline")&&_()});H.observe(document.body);let G=null,te=!1,j=0;const ce=window.matchMedia("(max-width: 1024px)").matches?5:3,ve=()=>{if(te)return;te=!0,j=0;const t=()=>{te&&(j++,j%ce===0&&k(),G=requestAnimationFrame(t))};t()},ie=()=>{te&&(te=!1,G!==null&&(cancelAnimationFrame(G),G=null),j=0)};if(J.create({trigger:h,start:"top bottom",end:"bottom top",onEnter:()=>{Z||window._isTimelineDismissed||(_(),ve())},onLeave:()=>{},onEnterBack:()=>{if(Z||window._isTimelineDismissed){l.log("[Tracking] onEnterBack blocked - timeline is dismissed");return}_(),ve()},onLeaveBack:()=>{ie()}}),window.matchMedia("(max-width: 1024px)").matches&&d){const t=()=>{Be.hide(),Be.setOpacity(0);const r=document.getElementById("mobile-film-grain");r&&(r.style.opacity="0",r.style.display="none",r.style.visibility="hidden")},n=()=>{Be.setOpacity(.25),Be.show();const r=document.getElementById("mobile-film-grain");r&&(r.style.visibility="visible",r.style.display="block",r.style.opacity="0.25")};J.create({trigger:d,start:"top 80%",end:"bottom 20%",onEnter:()=>{Z||window._isTimelineDismissed||(l.log("[Timeline] Mobile: Pausing background elements for performance"),window.backgroundPaused=!0,t())},onLeave:()=>{Z||window._isTimelineDismissed||(l.log("[Timeline] Mobile: Resuming background elements"),window.backgroundPaused=!1,n())},onEnterBack:()=>{if(Z||window._isTimelineDismissed){l.log("[Timeline] Mobile onEnterBack blocked - timeline is dismissed");return}l.log("[Timeline] Mobile: Pausing background elements (scrolled back)"),window.backgroundPaused=!0,t()},onLeaveBack:()=>{Z||window._isTimelineDismissed||(l.log("[Timeline] Mobile: Resuming background elements (scrolled back up)"),window.backgroundPaused=!1,n())}})}const ne=o.utils.toArray(".timeline-event"),x=o.utils.toArray(".timeline-decade"),oe=ne.length-1,Q=()=>{const t=window.innerWidth;return t<1025?t:t>=1280?Math.min(1324,t*.92):t*.5},w=()=>window.matchMedia("(max-width: 1024px)").matches,V=()=>window.innerHeight*1,re=()=>window.innerHeight*(w()?.7:.88),Y=()=>V()+oe*re();re(),Y();const U=w()?.6:.88,we=.08,qe=U+we,Oe=.09+we,yt=oe*qe,Le=Oe+yt;let I={isLocked:!1,targetIndex:-1,unlockTimer:null,reason:""},$e=0,z=null,A=null,Ee=null,me=!1,Ne=0,T;const Ue=(t,n,r=0)=>{if(!t||!T)return;const m=[],g=t.querySelector(".event-year"),a=t.querySelector(".event-description"),f=t.querySelector(".event-image");g&&m.push(g),a&&m.push(a),f&&m.push(f),m.length&&T.fromTo(m,{opacity:0},{opacity:1,duration:Math.max(.25,U*.65),ease:"power2.out",stagger:.08,force3D:!0},n?`${n}+=${r}`:r)},je=t=>{if(z||(z=document.querySelector("#current-timeline-year")),!z){me=!1;return}o.set(z,{opacity:1}),z.textContent=t,Ee=t,A=new Ft(z,{types:"chars",charClass:"split-char"}),A.chars&&A.chars.length>0?(o.set(A.chars,{opacity:0,y:20,display:"inline-block",force3D:!0}),o.to(A.chars,{opacity:1,y:0,duration:.27,stagger:.02,ease:"power2.out",overwrite:!0,force3D:!0,onComplete:()=>{me=!1}})):me=!1},ht=t=>{if(!(!t||t===Ee||me)){if(me=!0,z||(z=document.querySelector("#current-timeline-year")),!z){me=!1;return}A&&A.chars&&A.chars.length>0?o.to(A.chars,{opacity:0,y:-20,duration:.17,stagger:.01,ease:"power2.in",force3D:!0,onComplete:()=>{A&&typeof A.revert=="function"&&A.revert(),je(t)}}):je(t)}},Ke=()=>{z||(z=document.querySelector("#current-timeline-year")),z&&o.to(z,{opacity:0,duration:.3,ease:"power2.out",force3D:!0,onComplete:()=>{A&&typeof A.revert=="function"&&A.revert(),z.textContent="",Ee=null,me=!1}})};function Je(){l.log("[Re-entry] Starting timeline re-entry"),be=!0,l.log("[Re-entry] Set isReEntering flag to TRUE - scroll positioning disabled"),Z=!1,ke=!1,window._isTimelineDismissed=!1,window._isDismissing=!1,o.set(h,{opacity:1}),d.classList.contains("closed")||l.warn("[Re-entry] Timeline was not collapsed, should have been"),o.killTweensOf(e),e.style.cssText="";const t=D(),n=t?t.top:window.innerHeight/2-20,r=t?t.left:window.innerWidth/2-100,m=t?t.width:200,g=t?t.height:40;t&&(B={...t}),e.style.position="fixed",e.style.top=`${n}px`,e.style.left=`${r}px`,e.style.width=`${m}px`,e.style.height=`${g}px`,e.style.zIndex="9999",e.style.background="linear-gradient(rgb(4, 147, 171), rgb(6, 87, 164))",e.style.pointerEvents="none",e.style.visibility="visible",e.style.display="block",e.style.borderRadius="4px",e.style.opacity="0.5",l.log("[Re-entry] Background positioned to match timeline-window-start:",{top:n,left:r,width:m,height:g,posValid:!!t});function a(){l.log("[Re-entry] Starting background expansion animation"),e.style.setProperty("--decal-opacity","0"),l.log("[Re-entry] Set shader background (--decal-opacity) to 0");const p=document.getElementById("timeline-window-start-bg-style");p&&(p.textContent=`
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
        `);const y=o.timeline({onComplete:()=>{l.log("[Re-entry] Expansion complete, now locking background"),e.style.position="fixed",e.style.top="0",e.style.left="0",e.style.width="100vw",e.style.height="100vh",e.style.opacity="1",e.style.visibility="visible",e.style.display="block",e.style.borderRadius="0px",e.style.background="linear-gradient(rgb(4, 147, 171), rgb(6, 87, 164))",e.style.zIndex="9999",fe=!0,l.log("[Re-entry] Background locked at fullscreen - isBgLockedFullscreen = TRUE");function M(){if(!fe)return;const L=e.getBoundingClientRect(),N=e.style.top!=="0px"||e.style.left!=="0px"||e.style.width!=="100vw"||e.style.height!=="100vh",q=Math.abs(L.top)>2||Math.abs(L.left)>2||Math.abs(L.width-window.innerWidth)>5||Math.abs(L.height-window.innerHeight)>5;(N||q)&&(l.warn("[Re-entry] AGGRESSIVE LOCK: Background moved! Inline styles:",{top:e.style.top,left:e.style.left,width:e.style.width,height:e.style.height},"Computed position:",{top:L.top,left:L.left,width:L.width,height:L.height}),e.style.position="fixed",e.style.top="0",e.style.left="0",e.style.width="100vw",e.style.height="100vh",e.style.opacity="1",e.style.visibility="visible",e.style.display="block",e.style.zIndex="9999",e.style.transform="none",e.style.margin="0",e.style.padding="0"),requestAnimationFrame(M)}M(),l.log("[Re-entry] Started aggressive fullscreen protection loop"),document.body.classList.add("in-timeline"),l.log("[Re-entry] Added .in-timeline class for protection"),l.log("[Re-entry] Background locked at fullscreen, now restoring timeline content"),f()}});y.to(e,{top:0,left:0,width:"100vw",height:"100vh",borderRadius:"0px",opacity:1,duration:.6,ease:"power2.inOut",onStart:()=>{l.log("[Re-entry] Background expansion started"),e.style.background="linear-gradient(rgb(4, 147, 171), rgb(6, 87, 164))",e.style.visibility="visible",e.style.display="block",e.style.zIndex="9999"},onUpdate:function(){const M=this.progress();e.style.visibility="visible",e.style.display="block",e.style.background="linear-gradient(rgb(4, 147, 171), rgb(6, 87, 164))",(M===0||M===.5||M===1)&&l.log(`[Re-entry] Expansion progress: ${(M*100).toFixed(0)}%, opacity: ${e.style.opacity}, size: ${e.style.width} x ${e.style.height}`)},onComplete:()=>{l.log("[Re-entry] Background expansion animation complete"),e.style.opacity="1",e.style.background="linear-gradient(rgb(4, 147, 171), rgb(6, 87, 164))"}},0),y.fromTo(e,{opacity:.5},{opacity:1,duration:.6,ease:"none"},0),y.to(h,{opacity:0,duration:.4,ease:"power2.in"},.2);const s=document.querySelector("#background-canvas");s&&y.to(s,{opacity:0,duration:.5,ease:"power2.inOut"},0);const P=document.documentElement;P.style.background="linear-gradient(rgb(4, 147, 171), rgb(6, 87, 164))",l.log("[Re-entry] Starting expansion timeline, duration:",y.duration()),y.play()}function f(){l.log("[Re-entry] Restoring timeline content and structure"),d.style.pointerEvents="",d.style.display="",d.classList.remove("closed"),d.style.opacity="0",i.style.opacity="0",De.forEach(s=>{s&&s.enable&&s.enable()}),J.getAll().forEach(s=>{(s.vars.trigger===d||s.vars.trigger===h||s.vars.pin===i)&&s.enable()}),o.utils.toArray(".timeline-event").forEach(s=>{o.set(s,{opacity:0})});const y=document.querySelector(".timeline-track");y&&o.set(y,{x:0,y:0}),requestAnimationFrame(()=>{J.refresh(),requestAnimationFrame(()=>{l.log("[Re-entry] Content restored, now scrolling to timeline"),u()})})}function u(){let p;if(T&&T.scrollTrigger){const y=window.innerHeight*.35;p=T.scrollTrigger.start+y}else p=d.getBoundingClientRect().top+window.scrollY;l.log("[Re-entry] Scrolling to timeline position:",p),document.body.classList.add("in-timeline"),window.backgroundPaused||(window.backgroundPaused=!0,window.dispatchEvent(new CustomEvent("timeline:backgroundPaused",{detail:{paused:!0}}))),window.shaderBackgroundRenderer&&window.shaderBackgroundRenderer.setInTimeline&&window.shaderBackgroundRenderer.setInTimeline(!0),window.coverOrbControls&&window.coverOrbControls.resume&&window.coverOrbControls.resume(),window.timelineShaderControls&&window.timelineShaderControls.resume&&window.timelineShaderControls.resume(),T&&T.scrollTrigger&&T.progress(0),window.lenis?window.lenis.scrollTo(p,{duration:.8,easing:y=>Math.min(1,1.001-Math.pow(2,-10*y)),onComplete:()=>{l.log("[Re-entry] Scroll complete, fading in timeline"),e.style.position="fixed",e.style.top="0",e.style.left="0",e.style.width="100vw",e.style.height="100vh",e.style.opacity="1",e.style.visibility="visible",e.style.display="block",e.style.borderRadius="0px",e.style.background="linear-gradient(rgb(4, 147, 171), rgb(6, 87, 164))",l.log("[Re-entry] Locked background at fullscreen state"),be=!1,fe=!1,l.log("[Re-entry] Cleared isReEntering and isBgLockedFullscreen flags to FALSE - scroll positioning re-enabled"),e.style.zIndex="5",o.to(d,{opacity:1,duration:.3,ease:"power2.out"}),o.to(i,{opacity:1,duration:.3,ease:"power2.out"}),o.to(e,{"--decal-opacity":1,duration:.5,ease:"power2.out",onUpdate:function(){const y=o.getProperty(e,"--decal-opacity")||0;e.style.setProperty("--decal-opacity",y)}}),l.log("[Re-entry] Fading in shader background (--decal-opacity)")}}):(window.scrollTo({top:p,behavior:"smooth"}),setTimeout(()=>{l.log("[Re-entry] Scroll complete, fading in timeline"),e.style.position="fixed",e.style.top="0",e.style.left="0",e.style.width="100vw",e.style.height="100vh",e.style.opacity="1",e.style.visibility="visible",e.style.display="block",e.style.borderRadius="0px",e.style.background="linear-gradient(rgb(4, 147, 171), rgb(6, 87, 164))",l.log("[Re-entry] Locked background at fullscreen state (fallback)"),be=!1,fe=!1,l.log("[Re-entry] Cleared isReEntering and isBgLockedFullscreen flags to FALSE - scroll positioning re-enabled"),e.style.zIndex="5",o.to(d,{opacity:1,duration:.3,ease:"power2.out"}),o.to(i,{opacity:1,duration:.3,ease:"power2.out"}),o.to(e,{"--decal-opacity":1,duration:.5,ease:"power2.out",onUpdate:function(){const y=o.getProperty(e,"--decal-opacity")||0;e.style.setProperty("--decal-opacity",y)}}),l.log("[Re-entry] Fading in shader background (--decal-opacity) - fallback")},800))}a()}if(v){const t=n=>{(Z||window._isTimelineDismissed)&&(n.preventDefault(),n.stopPropagation(),Je())};v.addEventListener("click",t,{capture:!0}),v.addEventListener("touchend",t,{passive:!1,capture:!0}),v.style.pointerEvents="auto"}const Ie=document.querySelector(".re-enter-timeline");if(Ie){const t=n=>{(Z||window._isTimelineDismissed)&&(window.playUIClickSound&&!window.audioMuted&&window.playUIClickSound(),n.preventDefault(),n.stopPropagation(),Ie.classList.remove("active"),Je())};Ie.addEventListener("click",t,{capture:!0}),Ie.addEventListener("touchend",t,{passive:!1,capture:!0})}let Ye=!1,Qe=-1,et=0;const vt=w()?.003:.001,bt=w()?2:1,Se=t=>{Math.abs(t-Qe)<vt||(et++,et%bt===0&&(Qe=t,!Ye&&(Ye=!0,requestAnimationFrame(()=>{Ye=!1,xt()}))))};let We=null,Xe=null,He=null,Fe=null,Me=null;const xt=t=>{We||(We=document.querySelector(".scrubber-progress")),Xe||(Xe=o.utils.toArray(".marker")),He||(He=o.utils.toArray(".minor-node"));const n=We,r=Xe,m=He;if(!n||!x.length)return;const g=r.length;let a=0,f=0,u=-1;if(I.isLocked&&I.targetIndex>=0)a=I.targetIndex,f=(2*a+1)/(2*g);else{const p=window.matchMedia("(max-width: 1024px)").matches,y=p?window.innerHeight/2:window.innerWidth/2;let s=null,P=1/0,M=-1;if(ne.forEach((L,N)=>{const q=L.getBoundingClientRect(),de=p?q.top+q.height/2:q.left+q.width/2,le=Math.abs(de-y);le<P&&(P=le,s=L,M=N)}),M!==-1&&(Ne=M),s&&s.classList.contains("timeline-cover"))a=0,u=0,f=1/(2*g),Ke();else if(s){u=M-1,u=Math.max(0,Math.min(u,m.length-1));const L=s.getAttribute("data-year");if(L&&ht(L),u>=0&&m.length>0){const N=m[u];if(N){const q=parseInt(N.getAttribute("data-decade-index")||"0");a=Math.min(q,g-1)}else a=0}else a=0}else a=0,u=0,f=1/(2*g),Ke()}if(u>=0&&m.length>0){const p=m[u];if(p)if(Fe||(Fe=document.querySelector(".scrubber-line")),Me||(Me=document.querySelector(".scrubber-content")),Fe&&Me){const y=Fe.getBoundingClientRect(),s=p.getBoundingClientRect();Me.getBoundingClientRect();const P=s.left+s.width/2-y.left,M=y.width;f=Math.max(0,Math.min(1,P/M))}else f=(2*a+1)/(2*g);else f=(2*a+1)/(2*g)}else f=(2*a+1)/(2*g);if(o.to(n,{scaleX:f,transformOrigin:"left",duration:.3,ease:"power2.out",force3D:!0,overwrite:"auto"}),r.length>0&&r.forEach((p,y)=>{p.classList.remove("active","complete"),y===a?p.classList.add("active"):y<a&&p.classList.add("complete")}),m.length>0&&m.forEach((p,y)=>{p.classList.remove("active","complete");const s=parseInt(p.getAttribute("data-minor-index")||y);s===u?p.classList.add("active"):s<u&&p.classList.add("complete")}),window.scrubberAutoScroll&&!I.isLocked){const p=a>$e?1:a<$e?-1:0;window.scrubberAutoScroll(a,p),$e=a}};window._updateScrubber=Se;const St=t=>{if(t===0)return(.09+we*.5)/Le;let n=0;for(let f=0;f<t&&f<x.length;f++){const u=o.utils.toArray(".timeline-event",x[f]);n+=u.length}const r=x[t];if(o.utils.toArray(".timeline-event",r).length===0)return l.warn(`Decade ${t} has no events`),0;const g=n-1,a=Oe+g*qe+U+we*.5;return Math.min(a/Le,.99)},tt=o.timeline({scrollTrigger:{trigger:v,start:"top 90%",end:"top 70%",scrub:1,onLeaveBack:()=>{const t=document.getElementById("timeline-window-start-bg-style");t&&(t.textContent=t.textContent.replace(/opacity: [0-9.]+/,"opacity: 0"))}}}).to({},{duration:1,ease:"power2.out",onUpdate:function(){const n=this.progress()*.5,r=document.getElementById("timeline-window-start-bg-style");r&&(r.textContent=`
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
        `)}});let B=null;const De=[];typeof window._isTimelineDismissed>"u"&&(window._isTimelineDismissed=!1),typeof window._isDismissing>"u"&&(window._isDismissing=!1);let Z=window._isTimelineDismissed,ke=window._isDismissing,be=!1,fe=!1;function kt(){o.to(i,{opacity:0,duration:.44,ease:"power2.out",onComplete:()=>{Ct()}})}function Ct(){ke=!0,window._isDismissing=!0,Z=!0,window._isTimelineDismissed=!0,document.body.classList.remove("in-timeline");const t=document.querySelector("#current-timeline-year");t&&o.to(t,{opacity:0,duration:.44,ease:"power2.out"});const n=document.getElementById("timeline-window-start-bg-style");n&&(n.textContent=`
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
      `),o.to(h,{opacity:1,duration:.3,ease:"power2.out"}),De.forEach(u=>{u&&u.disable&&u.disable()}),J.getAll().forEach(u=>{(u.vars.trigger===d||u.vars.trigger===h||u.vars.pin===i)&&u.disable()});const r=h.getBoundingClientRect(),m=r.top+window.scrollY,g=window.innerHeight;m-g/2+r.height/2,window.backgroundPaused&&(window.backgroundPaused=!1,window.dispatchEvent(new CustomEvent("timeline:backgroundPaused",{detail:{paused:!1}}))),window.shaderBackgroundRenderer&&window.shaderBackgroundRenderer.setInTimeline&&window.shaderBackgroundRenderer.setInTimeline(!1);const a=document.querySelector("#background-canvas");a&&o.set(a,{opacity:1});const f=document.documentElement;f.style.background="",e.style.cssText=`
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
    `,d.style.opacity="1",d.style.transition="none",o.to(d,{opacity:0,duration:.44,ease:"power2.inOut",onComplete:()=>{e.style.zIndex="9999",window.lenis?window.lenis.scrollTo(0,{immediate:!0,force:!0,lock:!0}):window.scrollTo(0,0),d.classList.add("closed"),J.refresh();const u=h.getBoundingClientRect(),p=u.top+window.scrollY,y=window.innerHeight,s=p-y/2+u.height/2;window.lenis?(window.lenis.scrollTo(s,{immediate:!0,force:!0,lock:!0}),window.lenis.resize(),window.lenis.raf(Date.now())):window.scrollTo(0,s),setTimeout(()=>{window.lenis&&window.lenis.resize(),o.to(e,{opacity:0,duration:.44,ease:"power2.inOut",onComplete:()=>{e.style.cssText="",e.style.position="",e.style.top="",e.style.left="",e.style.width="",e.style.height="",e.style.zIndex="",e.style.opacity="",e.style.visibility="",e.style.background="",e.style.pointerEvents="",e.style.transform="",e.style.transition="",e.style.borderRadius="",d.style.pointerEvents="none",document.body.classList.remove("in-timeline"),ke=!1,window._isDismissing=!1;const P=document.querySelector(".re-enter-timeline");P&&P.classList.add("active")}})},100)}})}const it=window.innerHeight*.33,nt=it+600,ae=it/nt,ze=o.timeline({scrollTrigger:{trigger:h,start:"center center",end:`+=${nt}`,pin:!0,scrub:w()?1.5:1,anticipatePin:1,invalidateOnRefresh:!0,onRefresh:t=>{if(Z||window._isTimelineDismissed){l.log("[Expansion] onRefresh blocked - timeline is dismissed");return}if(be){l.log("[Re-entry] onRefresh blocked by isReEntering flag");return}if(fe){l.log("[Re-entry] onRefresh blocked by isBgLockedFullscreen flag");return}if(document.body.classList.contains("in-timeline")){l.log("[Re-entry] onRefresh blocked - already in timeline");return}B=null;const n=ae+.01*(1-ae),r=D();t.progress>0&&t.progress<n?r&&(e.style.position="fixed",e.style.top=`${r.top}px`,e.style.left=`${r.left}px`,e.style.width=`${r.width}px`,e.style.height=`${r.height}px`,e.style.opacity="0",e.style.visibility="hidden",B={...r}):t.progress>=n&&t.progress<1&&r&&(B={...r})},onUpdate:t=>{if(Z||window._isTimelineDismissed||ke||window._isDismissing||be)return;if(fe){(e.style.top!=="0px"||e.style.left!=="0px"||e.style.width!=="100vw"||e.style.height!=="100vh"||e.style.opacity!=="1")&&(l.log("[Timeline] FULLSCREEN LOCK: Re-locking background at fullscreen"),e.style.position="fixed",e.style.top="0",e.style.left="0",e.style.width="100vw",e.style.height="100vh",e.style.opacity="1",e.style.visibility="visible",e.style.display="block");return}if(document.body.classList.contains("in-timeline")){(e.style.opacity!=="1"||e.style.visibility!=="visible")&&(l.log("[Timeline] onUpdate safety: Forcing background visible (in-timeline)"),e.style.opacity="1",e.style.visibility="visible",e.style.display="block");return}const n=t.progress,r=ae+.01*(1-ae),m=Math.max(0,(n-ae)/(1-ae));n>=ae&&m<.1&&(window.timelineShaderControls&&window.timelineShaderControls.resume?(window.timelineShaderControls.resume(),t._loggedShaderResume||(t._loggedShaderResume=!0)):t._loggedShaderMissing||(t._loggedShaderMissing=!0,l.warn("[Timeline] Timeline shader controls not available at progress:",n.toFixed(4))),window.coverOrbControls&&window.coverOrbControls.resume?(window.coverOrbControls.resume(),t._loggedOrbResume||(t._loggedOrbResume=!0)):t._loggedOrbMissing||(t._loggedOrbMissing=!0,l.warn("[Timeline] Cover orb controls not available at progress:",n.toFixed(4))));const g=document.getElementById("timeline-window-start-bg-style"),a=performance.now();if(a-Ze>=$t){Ze=a;const f=e.getBoundingClientRect();if(Math.abs(f.width-window.innerWidth)<10&&Math.abs(f.height-window.innerHeight)<10&&Math.abs(f.top)<10&&Math.abs(f.left)<10){const s=parseFloat(e.style.opacity||"0");Math.abs(s-1)>.01&&(l.log("[Timeline] SAFETY CHECK: Forcing BG to opacity 1 (was",s,")"),e.style.opacity="1",e.style.visibility="visible");return}const p=window.getComputedStyle(v,"::before");parseFloat(p.opacity||"0")>0&&parseFloat(e.style.opacity||"1")>0&&(e.style.opacity="0",e.style.visibility="hidden")}if(n<r){if(document.body.classList.contains("in-timeline"))return;if(a-Ze<50){const u=D();u&&(e.style.position="fixed",e.style.top=`${u.top}px`,e.style.left=`${u.left}px`,e.style.width=`${u.width}px`,e.style.height=`${u.height}px`,e.style.background="linear-gradient(rgb(4, 147, 171), rgb(6, 87, 164))",e.style.borderRadius="4px",e.style.opacity="0",e.style.visibility="hidden",B={...u}),g&&(g.textContent=`
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
              `)}}else document.body.classList.contains("in-timeline")&&e.style.opacity!=="1"&&(e.style.opacity="1",e.style.visibility="visible",l.log("[Timeline] Forcing background to opacity 1 - already in timeline")),g&&(g.textContent=`
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
            `),document.body.classList.contains("in-timeline")||(e.style.opacity="0.5",e.style.visibility="visible")},onEnter:()=>{b=!1,ie(),tt&&tt.kill();const t=document.getElementById("timeline-window-start-bg-style");t&&(t.textContent=`
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
          `);const n=D();n?(e.style.position="fixed",e.style.top=`${n.top}px`,e.style.left=`${n.left}px`,e.style.width=`${n.width}px`,e.style.height=`${n.height}px`,e.style.background="linear-gradient(rgb(4, 147, 171), rgb(6, 87, 164))",e.style.borderRadius="4px",e.style.zIndex="0",e.style.opacity="0",e.style.visibility="hidden",B={...n}):l.warn("[Timeline] onEnter: Could not get valid span position")},onLeaveBack:()=>{b=!0,_(),k(),e.style.opacity="0",e.style.visibility="hidden";const t=document.getElementById("timeline-window-start-bg-style");t&&(t.textContent=`
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
          `)}}});De.push(ze.scrollTrigger),ze.fromTo(e,()=>{if(e.style.background="linear-gradient(rgb(4, 147, 171), rgb(6, 87, 164))",B&&B.width>0&&B.height>0)return{top:`${B.top}px`,left:`${B.left}px`,width:`${B.width}px`,height:`${B.height}px`};const t=D();if(t)return B={...t},{top:`${t.top}px`,left:`${t.left}px`,width:`${t.width}px`,height:`${t.height}px`};l.warn("[Timeline] No valid position for expansion animation - using viewport center fallback");const n=200,r=40;return{top:`${(window.innerHeight-r)/2}px`,left:`${(window.innerWidth-n)/2}px`,width:`${n}px`,height:`${r}px`}},{top:0,left:0,width:"100vw",height:"100vh",borderRadius:"0px",ease:"power2.inOut",duration:.7,immediateRender:!1,onStart:()=>{const t=D();if(t&&B){const n=Math.abs(t.top-B.top)+Math.abs(t.left-B.left)+Math.abs(t.width-B.width)+Math.abs(t.height-B.height);n>5&&(l.log("[Timeline] Position drift detected on expansion start, syncing:",n.toFixed(1),"px"),e.style.top=`${t.top}px`,e.style.left=`${t.left}px`,e.style.width=`${t.width}px`,e.style.height=`${t.height}px`,B={...t})}},onUpdate:()=>{e.style.background="linear-gradient(rgb(4, 147, 171), rgb(6, 87, 164))"},onReverseComplete:()=>{e.style.opacity="0"}},ae),ze.fromTo(e,{opacity:.5},{opacity:1,duration:.7,ease:"none"},ae),document.fonts&&document.fonts.ready&&document.fonts.ready.then(()=>{J.refresh()});const Tt=ae+.4*(1-ae);ze.to(h,{opacity:0,ease:"power2.in",duration:.6},Tt);const F={waveSpeed:.26,waveAmplitude:1.9,waveFrequencyX:.16,waveFrequencyY:.32,bobbingAmplitude:1.4,bobbingSpeed:.22,fadeIntensity:.86,opacity:.58,scale:3.4,rotationX:-1.7,rotationZ:.26,positionY:-30,positionZ:-16},ee={waveSpeed:.18,waveAmplitude:5,waveFrequencyX:.6,waveFrequencyY:1,bobbingAmplitude:2.2,bobbingSpeed:.24,fadeIntensity:.39,opacity:1,scale:5,rotationX:-1.6,rotationZ:-1.44,positionY:-20,positionZ:-20},K={};let ot=0;const Pt=w()?2:1;let st=-1;if(T=o.timeline({scrollTrigger:{trigger:d,start:"top top",end:()=>`+=${Y()}`,pin:i,scrub:w()?1:.2,anticipatePin:1,invalidateOnRefresh:!0,onRefresh:t=>{if(Z||window._isTimelineDismissed){l.log("[Timeline] Timeline onRefresh blocked - timeline is dismissed");return}if(!(ke||window._isDismissing||be)){if(fe){l.log("[Timeline] Timeline onRefresh blocked by isBgLockedFullscreen flag"),t.animation&&Se(t.animation.progress());return}if(document.body.classList.contains("in-timeline")){l.log("[Timeline] Timeline onRefresh - in timeline, skipping background updates"),t.animation&&Se(t.animation.progress());return}t.animation&&(Se(t.animation.progress()),Se(t.animation.progress()))}},onUpdate:t=>{if(Z||window._isTimelineDismissed||ke||window._isDismissing||be||fe)return;const n=t.animation.progress();Se(n);const r=.75;if(!w()&&n>r&&window.timelineShaderControls&&window.timelineShaderControls.updateParams){ot++;const m=Math.abs(n-st);if(!(ot%Pt===0||m>.01))return;st=n;let a=(n-r)/(1-r);a=Math.max(0,Math.min(1,a)),K.waveSpeed=F.waveSpeed+(ee.waveSpeed-F.waveSpeed)*a,K.waveAmplitude=F.waveAmplitude+(ee.waveAmplitude-F.waveAmplitude)*a,K.waveFrequencyX=F.waveFrequencyX+(ee.waveFrequencyX-F.waveFrequencyX)*a,K.waveFrequencyY=F.waveFrequencyY+(ee.waveFrequencyY-F.waveFrequencyY)*a,K.bobbingAmplitude=F.bobbingAmplitude+(ee.bobbingAmplitude-F.bobbingAmplitude)*a,K.bobbingSpeed=F.bobbingSpeed+(ee.bobbingSpeed-F.bobbingSpeed)*a,K.fadeIntensity=F.fadeIntensity+(ee.fadeIntensity-F.fadeIntensity)*a,K.opacity=F.opacity+(ee.opacity-F.opacity)*a,K.scale=F.scale+(ee.scale-F.scale)*a,K.rotationX=F.rotationX+(ee.rotationX-F.rotationX)*a,K.rotationZ=F.rotationZ+(ee.rotationZ-F.rotationZ)*a,K.positionY=F.positionY+(ee.positionY-F.positionY)*a,K.positionZ=F.positionZ+(ee.positionZ-F.positionZ)*a,window.timelineShaderControls.updateParams(K)}},onEnter:()=>{if(Z||window._isTimelineDismissed){l.log("[Timeline] onEnter blocked - timeline is dismissed");return}document.body.classList.add("in-timeline");const t=document.querySelector('meta[name="theme-color"]');t&&t.setAttribute("content","#000000"),window.backgroundPaused||(window.backgroundPaused=!0,window.dispatchEvent(new CustomEvent("timeline:backgroundPaused",{detail:{paused:!0}}))),window.shaderBackgroundRenderer&&window.shaderBackgroundRenderer.setInTimeline&&window.shaderBackgroundRenderer.setInTimeline(!0),window.coverOrbControls&&window.coverOrbControls.resume&&window.coverOrbControls.resume(),window.timelineShaderControls&&window.timelineShaderControls.resume&&window.timelineShaderControls.resume(),window._timelinePauseTimeout&&(clearTimeout(window._timelinePauseTimeout),window._timelinePauseTimeout=null),o.set(i,{opacity:1,display:"block",pointerEvents:"auto",visibility:"visible"}),c&&o.set(c,{opacity:1,visibility:"visible",clearProps:w()?"x":"y"}),o.utils.toArray(".timeline-event").forEach(p=>{o.set(p,{visibility:"visible",display:"flex"})});const r=document.querySelector(".timeline-event.timeline-cover");r&&o.set(r,{opacity:1,scale:1,visibility:"visible"}),e.style.zIndex="0",o.to(e,{opacity:1,duration:.2,ease:"none",overwrite:"auto"});const m=document.querySelector("#background-canvas");m&&o.to(m,{opacity:0,duration:.5,ease:"power2.inOut"});const g=document.documentElement;g.style.background="linear-gradient(rgb(4, 147, 171), rgb(6, 87, 164))";const a=o.utils.toArray(".minor-node"),f=o.utils.toArray(".marker"),u=document.querySelector(".scrubber-progress");if(a.length>0&&u){const p=a[0];a.forEach(s=>{s.classList.remove("active","complete")}),p.classList.add("active"),f.length>0&&(f.forEach(s=>{s.classList.remove("active","complete")}),f[0].classList.add("active"));const y=document.querySelector(".scrubber-line");if(y){const s=y.getBoundingClientRect(),P=p.getBoundingClientRect(),M=P.left+P.width/2-s.left,L=s.width,N=Math.max(0,Math.min(1,M/L));o.set(u,{scaleX:N,transformOrigin:"left"})}}z||(z=document.querySelector("#current-timeline-year")),z&&(o.set(z,{opacity:0}),z.textContent="",A&&typeof A.revert=="function"&&(A.revert(),A=null),Ee=null,me=!1)},onLeave:()=>{document.body.classList.remove("in-timeline"),window.backgroundPaused&&(window.backgroundPaused=!1,window.dispatchEvent(new CustomEvent("timeline:backgroundPaused",{detail:{paused:!1}}))),window.shaderBackgroundRenderer&&window.shaderBackgroundRenderer.setInTimeline&&window.shaderBackgroundRenderer.setInTimeline(!1);const t=document.querySelector("#background-canvas");t&&o.to(t,{opacity:1,duration:.5,ease:"power2.inOut"});const n=document.documentElement;o.to(n,{duration:.5,ease:"power2.inOut",onComplete:function(){n.style.background=""}})},onLeaveBack:()=>{document.body.classList.remove("in-timeline"),window.backgroundPaused&&(window.backgroundPaused=!1,window.dispatchEvent(new CustomEvent("timeline:backgroundPaused",{detail:{paused:!1}}))),window.shaderBackgroundRenderer&&window.shaderBackgroundRenderer.setInTimeline&&window.shaderBackgroundRenderer.setInTimeline(!1);const t=setTimeout(()=>{document.body.classList.contains("in-timeline")||(window.coverOrbControls&&window.coverOrbControls.pause&&window.coverOrbControls.pause(),window.timelineShaderControls&&window.timelineShaderControls.stop&&window.timelineShaderControls.stop())},1e3);window._timelinePauseTimeout=t,z||(z=document.querySelector("#current-timeline-year")),z&&(o.set(z,{opacity:0}),z.textContent="",A&&typeof A.revert=="function"&&(A.revert(),A=null),Ee=null,me=!1)},onEnterBack:()=>{if(Z||window._isTimelineDismissed){l.log("[Timeline] onEnterBack blocked - timeline is dismissed");return}document.body.classList.add("in-timeline"),window.backgroundPaused||(window.backgroundPaused=!0,window.dispatchEvent(new CustomEvent("timeline:backgroundPaused",{detail:{paused:!0}}))),window.shaderBackgroundRenderer&&window.shaderBackgroundRenderer.setInTimeline&&window.shaderBackgroundRenderer.setInTimeline(!0),window.coverOrbControls&&window.coverOrbControls.resume&&window.coverOrbControls.resume(),window.timelineShaderControls&&window.timelineShaderControls.resume&&window.timelineShaderControls.resume(),window._timelinePauseTimeout&&(clearTimeout(window._timelinePauseTimeout),window._timelinePauseTimeout=null),o.set(i,{opacity:1,display:"block",pointerEvents:"auto",visibility:"visible"}),c&&o.set(c,{opacity:1,visibility:"visible"}),o.utils.toArray(".timeline-event").forEach(m=>{o.set(m,{visibility:"visible",display:"flex"})}),e.style.zIndex="0",o.to(e,{opacity:1,duration:.2,ease:"none",overwrite:"auto"});const n=document.querySelector("#background-canvas");n&&o.to(n,{opacity:0,duration:.5,ease:"power2.inOut"});const r=document.documentElement;r.style.background="linear-gradient(rgb(4, 147, 171), rgb(6, 87, 164))"}}}),De.push(T.scrollTrigger),T.fromTo(".timeline-scrubber",{opacity:0,y:30},{opacity:1,y:0,duration:.05,ease:"power2.out",force3D:!0},0),T.to(".scrubber-nav",{opacity:1,duration:.05,ease:"power2.out",force3D:!0},0),T.to(e,{"--decal-opacity":1,duration:.5,ease:"power2.out",onUpdate:function(){const t=o.getProperty(e,"--decal-opacity")||0;e.style.setProperty("--decal-opacity",t)}},.01),ne.length>0){const t=ne[0],n=ne.slice(1),r="first-event";T.add(r,0),T.fromTo(t,{opacity:0,scale:.95},{opacity:1,scale:1,duration:.25,ease:"power2.out",force3D:!0},r),Ue(t,r,U*.05),T.to({},{duration:we},">"),n.forEach((m,g)=>{const a=()=>window.matchMedia("(max-width: 1024px)").matches,f=()=>{if(a())return 0;const s=Q(),P=window.innerWidth,M=window.innerWidth*.5,L=P+g*s+s*.5;return M-L},u=()=>a()?`${-(g+1)*100}vh`:0,p=`event-${g}`;T.to(c,{x:f,y:u,duration:U,ease:"power1.inOut",force3D:!0},p);const y=g===0?t:n[g-1];T.to(y,{opacity:0,scale:.94,duration:U*.28,ease:"power1.in",force3D:!0},`${p}+=${U*.34}`),T.fromTo(m,{opacity:0,scale:.9},{opacity:1,scale:1,duration:U*1.15,ease:"power2.out",force3D:!0},`${p}+=${U*.1}`),Ue(m,p,U*.12),g===0&&T.fromTo(".timeline-close",{opacity:0},{opacity:1,duration:U*.5,ease:"power2.out",force3D:!0},`${p}+=${U*.3}`),T.to({},{duration:we})})}const rt=d.querySelector(".timeline-close");rt&&rt.addEventListener("click",()=>{kt()});function at(){const t=o.utils.toArray(".marker");if(!t.length||!x.length){l.warn("Timeline: Markers or decades not found");return}let n=0,r=0;x.forEach((m,g)=>{const a=m.getAttribute("data-decade"),f=o.utils.toArray(".timeline-event",m),u=t.find(s=>s.getAttribute("data-decade")===a);if(!u){l.warn(`Timeline: No marker found for decade ${a}`);return}const p=u.querySelector(".marker-minor-nodes");if(!p){l.warn(`Timeline: No minor nodes container found for decade ${a}`);return}p.innerHTML="";const y=parseInt(a)||0;f.forEach((s,P)=>{if(s.classList.contains("timeline-cover")){n++;return}const L=n===0?(.09+we*.5)/Le:(Oe+(n-1)*qe+U+we*.5)/Le,N=s.getAttribute("data-year")||"";let q=0;const de=N.match(/\d{4}/);de&&(q=parseInt(de[0]));let le=0;q>0&&y>0&&(le=(q-y)/10,le=Math.max(0,Math.min(.95,le)));const $=document.createElement("div");$.className="minor-node",$.setAttribute("data-event-index",n),$.setAttribute("data-minor-index",r),$.setAttribute("data-decade-index",g),$.setAttribute("data-local-index",P),$.setAttribute("data-year",N),$.setAttribute("data-year-numeric",q.toString()),$.setAttribute("data-year-position",le.toFixed(3));const Ce=document.createElement("div");if(Ce.className="minor-node-dot",$.appendChild(Ce),N){const pe=document.createElement("div");pe.className="minor-node-label",pe.textContent=N,$.appendChild(pe)}requestAnimationFrame(()=>{const pe=u.getBoundingClientRect(),ge=o.utils.toArray(".marker"),Ge=g+1;if(Ge<ge.length){const xe=ge[Ge].getBoundingClientRect(),Te=pe.right,Pe=xe.left-Te,he=30,W=20,se=Pe-he-W,Ae=he+W+se*le;$.style.left=`${Ae}px`}else{const ye=window.innerWidth,xe=ye>768?120:100,Te=ye>768?5:ye<640?2:4,Ve=(ye-xe)/Te,Pe=30,he=20,W=Ve-Pe-he,se=Pe+he+W*le;$.style.left=`${se}px`}}),$.addEventListener("click",pe=>{pe.stopPropagation(),I.isLocked=!0,I.reason="minor-node-click",I.unlockTimer&&clearTimeout(I.unlockTimer),o.utils.toArray(".minor-node").forEach(W=>{W.classList.remove("active","complete");const se=parseInt(W.getAttribute("data-minor-index")||"0");se<r?W.classList.add("complete"):se===r&&W.classList.add("active")}),o.utils.toArray(".marker").forEach((W,se)=>{W.classList.remove("active","complete"),se===g?W.classList.add("active"):se<g&&W.classList.add("complete")});const ye=document.querySelector(".scrubber-progress");if(ye){const W=document.querySelector(".scrubber-line");if(W){const se=W.getBoundingClientRect(),Ae=$.getBoundingClientRect(),Et=Ae.left+Ae.width/2-se.left,Lt=se.width,It=Math.max(0,Math.min(1,Et/Lt));o.to(ye,{scaleX:It,transformOrigin:"left",duration:.3,ease:"power2.out"})}}const xe=T.scrollTrigger;if(!xe)return;const Te=xe.start,Pe=xe.end-Te,he=Te+Pe*L;window.lenis?window.lenis.scrollTo(he,{duration:1,easing:W=>Math.min(1,1.001-Math.pow(2,-10*W)),onComplete:()=>{I.unlockTimer=setTimeout(()=>{I.isLocked=!1,I.targetIndex=-1,I.reason=""},500)}}):(window.scrollTo({top:he,behavior:"smooth"}),I.unlockTimer=setTimeout(()=>{I.isLocked=!1,I.targetIndex=-1,I.reason=""},1500))}),p.appendChild($),n++,r++}),f.filter(s=>!s.classList.contains("timeline-cover")).length})}at(),window._generateMinorNodes=at;function Rt(){const t=document.querySelector(".scrubber-scroll-wrapper"),n=document.querySelector(".scrubber-nav-prev"),r=document.querySelector(".scrubber-nav-next"),m=o.utils.toArray(".marker");if(!t||!n||!r){l.warn("Timeline: Scrubber scroll elements not found");return}function g(){const s=t.scrollLeft,P=t.scrollWidth-t.clientWidth;s<=10?n.classList.add("disabled"):n.classList.remove("disabled"),s>=P-10?r.classList.add("disabled"):r.classList.remove("disabled")}function a(s){if(s<0||s>=m.length)return;const P=m[s],M=P.getBoundingClientRect();t.getBoundingClientRect();const L=P.offsetLeft+M.width/2,N=t.clientWidth/2,q=L-N;t.scrollTo({left:Math.max(0,q),behavior:"smooth"})}function f(s){const P=window.innerWidth,M=P>768?120:100,L=P>768?5:P<640?2:4,q=((P-M)/L+60)*3,de=t.scrollLeft+q*s;t.scrollTo({left:Math.max(0,de),behavior:"smooth"})}n.addEventListener("click",()=>{f(-1)}),r.addEventListener("click",()=>{f(1)}),t.addEventListener("scroll",g),g();let u=!1,p,y;t.style.cursor="",t.style.userSelect="none",t.addEventListener("mousedown",s=>{u=!0,t.classList.add("active"),t.style.cursor="grabbing",p=s.pageX-t.offsetLeft,y=t.scrollLeft}),t.addEventListener("mouseleave",()=>{u=!1,t.classList.remove("active"),t.style.cursor=""}),t.addEventListener("mouseup",()=>{u=!1,t.classList.remove("active"),t.style.cursor=""}),t.addEventListener("mousemove",s=>{if(!u)return;s.preventDefault();const M=(s.pageX-t.offsetLeft-p)*1.5;t.scrollLeft=y-M}),window.scrubberAutoScroll=(s,P=0)=>{if(s<0||s>=m.length)return;const L=m[s].getBoundingClientRect(),N=t.getBoundingClientRect(),q=N.left+100,de=N.right-100,le=L.left>=q&&L.right<=de;let $=!1,Ce=s;if(!le)$=!0;else if(P>0){if(s+1<m.length){const ge=m[s+1].getBoundingClientRect();(ge.right>de||ge.left>de)&&($=!0,Ce=s+1)}}else if(P<0&&s-1>=0){const ge=m[s-1].getBoundingClientRect();(ge.left<q||ge.right<q)&&($=!0,Ce=s-1)}$&&a(Ce)}}return Rt(),o.utils.toArray(".marker").forEach((t,n)=>{t.addEventListener("click",()=>{I.isLocked=!0,I.targetIndex=n,I.reason="click",I.unlockTimer&&clearTimeout(I.unlockTimer),I.unlockTimer=setTimeout(()=>{I.isLocked=!1,I.targetIndex=-1,I.reason=""},100);const r=St(n),m=T.scrollTrigger;if(!m)return;const g=m.start,f=m.end-g,u=g+f*r;window.lenis?window.lenis.scrollTo(u,{duration:1.2,easing:p=>Math.min(1,1.001-Math.pow(2,-10*p))}):window.scrollTo({top:u,behavior:"smooth"})}),t.style.cursor="pointer"}),o.timeline({scrollTrigger:{trigger:d,start:"bottom bottom",end:"bottom 80%",scrub:1,onEnterBack:()=>{o.to([e,d],{opacity:1,duration:.3})},onLeave:()=>{}}}).to([e,d],{opacity:0,ease:"power2.in"}),J.addEventListener("refreshInit",()=>{}),J.addEventListener("refresh",()=>{if(Ne>0){const n=`event-${Ne-1}`;if(T.labels[n]!==void 0){const g=(T.labels[n]+U)/T.duration(),a=T.scrollTrigger;if(a){const f=a.start+g*(a.end-a.start);window.scrollTo(0,f)}}}}),window._timelineCleanup={rafId:G,resizeObserver:H,stopTracking:ie},window._timelinePositioning={positionBgToSpan:k,syncBgToSpanImmediate:_,resetCapturedPosition:()=>{B=null,E={top:0,left:0,width:0,height:0},R={top:0,left:0,width:0,height:0}},setTrackingSpan:t=>{b=t},getTrackingSpan:()=>b},T.scrollTrigger&&(S.timelineScrollTrigger=T.scrollTrigger),S.markerLockRef=I,requestAnimationFrame(()=>{J.refresh()}),T}let S={isResizing:!1,savedProgress:null,timelineScrollTrigger:null,markerLockRef:null};function Nt(){const d=typeof S<"u"&&S?S.timelineScrollTrigger:null;if(!d||!d.isActive)return null;const v=d.progress,e=o.utils.toArray(".timeline-event"),h=o.utils.toArray(".timeline-decade"),i=o.utils.toArray(".marker");let c=0,E=0,R=-1;i.forEach((X,D)=>{X.classList.contains("active")&&(R=D)});const b=e.length;if(b>0&&v>0){c=Math.min(Math.floor(v*b),b-1);let X=0;for(let D=0;D<h.length;D++){const _=o.utils.toArray(".timeline-event",h[D]);if(c<X+_.length){E=D;break}X+=_.length}}return R>=0&&(E=R),{progress:v,activeEventIndex:c,activeDecadeIndex:E,activeMarkerIndex:R,scrollPosition:window.pageYOffset||document.documentElement.scrollTop}}let lt=null,ct=null,dt=window.innerWidth,ut=window.innerHeight;function Yt(){S.isResizing||(S.isResizing=!0,S.savedProgress=Nt(),document.body.classList.add("timeline-resizing"))}function Wt(){const d=window.innerWidth,v=window.innerHeight,e=Math.abs(d-dt),h=Math.abs(v-ut),i=e<5&&h>40&&h<200;return dt=d,ut=v,i}function Xt(){const d=Wt(),v=document.querySelector("#timeline-shader-bg");v&&(v.style.width=`${window.innerWidth}px`,v.style.height=`${window.innerHeight}px`),window._generateMinorNodes&&!d&&window._generateMinorNodes();const e=document.querySelector("#acs-timeline");if(e&&window._timelinePositioning){const h=document.body.classList.contains("in-timeline"),c=e.getBoundingClientRect().top>window.innerHeight*.3;!h&&c?(l.log("[Resize] Before timeline - resetting background position"),window._timelinePositioning.resetCapturedPosition(),window._timelinePositioning.setTrackingSpan&&window._timelinePositioning.setTrackingSpan(!0),requestAnimationFrame(()=>{window._timelinePositioning.syncBgToSpanImmediate&&window._timelinePositioning.syncBgToSpanImmediate()})):h||requestAnimationFrame(()=>{window._timelinePositioning.syncBgToSpanImmediate&&window._timelinePositioning.syncBgToSpanImmediate()})}if(d){l.log("[Resize] Mobile address bar change detected - lightweight refresh"),J.update(),requestAnimationFrame(()=>{window._timelinePositioning&&window._timelinePositioning.syncBgToSpanImmediate&&window._timelinePositioning.syncBgToSpanImmediate(),document.body.classList.remove("timeline-resizing"),S.isResizing=!1,S.savedProgress=null});return}J.refresh(!0),requestAnimationFrame(()=>{requestAnimationFrame(()=>{if(J.update(),e&&window._timelinePositioning){const h=document.body.classList.contains("in-timeline"),c=e.getBoundingClientRect().top>window.innerHeight*.3;!h&&c&&(l.log("[Resize] Post-refresh: Re-syncing background position"),window._timelinePositioning.syncBgToSpanImmediate&&window._timelinePositioning.syncBgToSpanImmediate())}if(S.savedProgress&&S.timelineScrollTrigger){const h=S.timelineScrollTrigger,i=h.start,E=h.end-i,R=i+E*S.savedProgress.progress;if(window.lenis?window.lenis.scrollTo(R,{immediate:!0,force:!0}):window.scrollTo({top:R,behavior:"auto"}),S.savedProgress.activeMarkerIndex>=0&&S.markerLockRef){S.markerLockRef.isLocked=!0,S.markerLockRef.targetIndex=S.savedProgress.activeMarkerIndex,S.markerLockRef.reason="resize",o.utils.toArray(".marker").forEach((C,O)=>{C.classList.remove("active","complete"),O===S.savedProgress.activeMarkerIndex?C.classList.add("active"):O<S.savedProgress.activeMarkerIndex&&C.classList.add("complete")});const X=S.savedProgress.activeEventIndex,D=o.utils.toArray(".minor-node"),_=X-1;D.forEach((C,O)=>{C.classList.remove("active","complete");const H=parseInt(C.getAttribute("data-minor-index")||O);H===_?C.classList.add("active"):H<_&&C.classList.add("complete")});const k=document.querySelector(".scrubber-progress");if(k&&_>=0&&D[_]){const C=D[_],O=document.querySelector(".scrubber-line");O&&C&&requestAnimationFrame(()=>{const H=O.getBoundingClientRect(),G=C.getBoundingClientRect(),te=G.left+G.width/2-H.left,j=H.width,ce=Math.max(0,Math.min(1,te/j));o.set(k,{scaleX:ce,transformOrigin:"left"})})}}setTimeout(()=>{J.update(),h.animation&&(h.animation.invalidate(),h.animation.progress(h.animation.progress())),window.dispatchEvent(new Event("scroll")),h.animation&&window._updateScrubber&&requestAnimationFrame(()=>{window._updateScrubber(h.animation.progress())}),setTimeout(()=>{S.markerLockRef&&S.markerLockRef.reason==="resize"&&(S.markerLockRef.isLocked=!1,S.markerLockRef.targetIndex=-1,S.markerLockRef.reason="")},500),document.body.classList.remove("timeline-resizing"),S.isResizing=!1,S.savedProgress=null},150)}else document.body.classList.remove("timeline-resizing"),S.isResizing=!1,S.savedProgress=null})})}window.addEventListener("resize",()=>{clearTimeout(ct),clearTimeout(lt),ct=setTimeout(Yt,10),lt=setTimeout(Xt,300)});if(window.visualViewport){let d=null;window.visualViewport.addEventListener("resize",()=>{clearTimeout(d),d=setTimeout(()=>{!S.isResizing&&window._timelinePositioning&&(document.body.classList.contains("in-timeline")||(l.log("[VisualViewport] Address bar change - syncing background"),window._timelinePositioning.setTrackingSpan&&window._timelinePositioning.setTrackingSpan(!0),window._timelinePositioning.syncBgToSpanImmediate&&window._timelinePositioning.syncBgToSpanImmediate()))},100)})}function Jt(){window._timelineCleanup&&(window._timelineCleanup.rafId&&cancelAnimationFrame(window._timelineCleanup.rafId),window._timelineCleanup.resizeObserver&&window._timelineCleanup.resizeObserver.disconnect(),window._timelineCleanup.lenisCallback&&window.lenis&&window.lenis.off("scroll",window._timelineCleanup.lenisCallback),window._timelineCleanup.scrollCallback&&window.removeEventListener("scroll",window._timelineCleanup.scrollCallback),window._timelineCleanup=null),window.timelineShaderControls&&(window.timelineShaderControls.stop(),window.timelineShaderControls=null),window.backgroundPaused&&(window.backgroundPaused=!1,window.dispatchEvent(new CustomEvent("timeline:backgroundPaused",{detail:{paused:!1}})))}export{Jt as disposeTimeline,Kt as initTimelineAnimation};
