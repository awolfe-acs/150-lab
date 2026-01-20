import{g as o,S as K}from"./index-DnrpVRni.js";import It from"./index-BbrXr4yz.js";import{ac as Pe,af as dt,W as ut,ad as mt,ah as pt,C as De,al as Ft,E as Mt,am as gt,K as zt,z as At,an as Bt,aj as Dt,ae as Be}from"./mobileFilmGrain-CmB6Tq7x.js";import{l as d}from"./logger-2Ii2FPkr.js";function qt(){const c=document.querySelector("#timeline-cover-canvas");if(!c){d.warn("Cover orb canvas not found");return}if(window.coverOrbInitialized)return d.warn("Cover orb already initialized, skipping duplicate call"),window.coverOrbControls;window.coverOrbInitialized=!0;const v=Pe.isMobile(),e=new dt,h=new ut(45,c.clientWidth/c.clientHeight,.1,100);h.position.z=3.5;const i=new mt({canvas:c,alpha:!0,antialias:!v,powerPreference:v?"low-power":"default"});i.setSize(c.clientWidth,c.clientHeight),i.setPixelRatio(Math.min(window.devicePixelRatio,v?1.25:2));const l={noiseStrength:.13,noiseSpeed:.11,noiseDensity:.73,colorDeep:"#9b7bff",colorLight:"#0063d8",colorHighlight:"#00a4af",fresnelPower:1.3,fresnelIntensity:.33,pulseSpeed:.68,pulseIntensity:.14,rotationSpeed:.24,glitterStrength:.078,glitterDensity:70,specularStrength:1.2,glossiness:28},R=`
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
  `,T=`
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
  `,b=new pt({vertexShader:R,fragmentShader:T,uniforms:{uTime:{value:0},uNoiseStrength:{value:l.noiseStrength},uNoiseSpeed:{value:l.noiseSpeed},uNoiseDensity:{value:l.noiseDensity},uColorDeep:{value:new De(l.colorDeep)},uColorLight:{value:new De(l.colorLight)},uColorHighlight:{value:new De(l.colorHighlight)},uFresnelPower:{value:l.fresnelPower},uFresnelIntensity:{value:l.fresnelIntensity},uPulseSpeed:{value:l.pulseSpeed},uPulseIntensity:{value:l.pulseIntensity},uGlitterStrength:{value:l.glitterStrength},uGlitterDensity:{value:l.glitterDensity},uSpecularStrength:{value:l.specularStrength},uGlossiness:{value:l.glossiness}},transparent:!0}),W=v?64:128,z=new Ft(1,W,W),q=new Mt(z,b);e.add(q),window.coverOrbParams=l,window.coverOrbUniforms=b.uniforms,window.coverOrbMaterial=b,window.coverOrbOrb=q;const k=()=>{if(window.gui){if(window.gui.__folders&&window.gui.__folders["Cover Orb"])return;const x=window.gui.addFolder("Cover Orb");x.add(l,"noiseStrength",0,2).name("Noise Strength"),x.add(l,"noiseSpeed",0,2).name("Noise Speed"),x.add(l,"noiseDensity",0,5).name("Noise Density"),x.addColor(l,"colorDeep").name("Color Deep"),x.addColor(l,"colorLight").name("Color Light"),x.addColor(l,"colorHighlight").name("Color Highlight"),x.add(l,"fresnelPower",0,5).name("Fresnel Power"),x.add(l,"fresnelIntensity",0,5).name("Fresnel Intensity"),x.add(l,"specularStrength",0,2).name("Spec Strength"),x.add(l,"glossiness",1,100).name("Glossiness"),x.add(l,"glitterStrength",0,2).name("Glitter Str"),x.add(l,"glitterDensity",1,200).name("Glitter Dens"),x.add(l,"pulseSpeed",0,5).name("Pulse Speed"),x.add(l,"pulseIntensity",0,1).name("Pulse Intensity"),x.add(l,"rotationSpeed",0,1).name("Rotation Speed"),x.open()}else setTimeout(k,1500)};setTimeout(k,1500);const C=new gt;let O,X=!1;const G=v?45:60,ee=v?30:45;let U=G,le=1e3/U,he=0;Pe.onScrollStateChange(({isScrolling:x})=>{U=x?ee:G,le=1e3/U});const te=()=>{if(X)return;O=requestAnimationFrame(te);const x=performance.now(),ne=x-he;if(ne<le||document.hidden)return;he=x-ne%le;const J=C.getElapsedTime();b.uniforms.uTime.value=J,b.uniforms.uNoiseStrength.value=l.noiseStrength,b.uniforms.uNoiseSpeed.value=l.noiseSpeed,b.uniforms.uNoiseDensity.value=l.noiseDensity,b.uniforms.uColorDeep.value.set(l.colorDeep),b.uniforms.uColorLight.value.set(l.colorLight),b.uniforms.uColorHighlight.value.set(l.colorHighlight),b.uniforms.uFresnelPower.value=l.fresnelPower,b.uniforms.uFresnelIntensity.value=l.fresnelIntensity,b.uniforms.uPulseSpeed.value=l.pulseSpeed,b.uniforms.uPulseIntensity.value=l.pulseIntensity,b.uniforms.uGlitterStrength.value=l.glitterStrength,b.uniforms.uGlitterDensity.value=l.glitterDensity,b.uniforms.uSpecularStrength.value=l.specularStrength,b.uniforms.uGlossiness.value=l.glossiness,q.rotation.y=J*l.rotationSpeed,q.rotation.z=J*(l.rotationSpeed*.5),i.render(e,h)};te();const de=()=>{if(!c)return;const x=c.clientWidth,ne=c.clientHeight,J=x/ne;h.aspect=J,h.updateProjectionMatrix();const w=3.5,V=2.7/J;h.position.z=Math.max(w,V),i.setSize(x,ne),i.setPixelRatio(Math.min(window.devicePixelRatio,2))};window.addEventListener("resize",de),de();const ie={pause:()=>{X=!0,O&&cancelAnimationFrame(O)},resume:()=>{X&&(X=!1,te())},cleanup:()=>{X=!0,O&&cancelAnimationFrame(O),window.removeEventListener("resize",de),i.dispose(),z.dispose(),b.dispose(),window.coverOrbInitialized=!1}};return window.coverOrbControls=ie,ie}function _t(){const c=document.querySelector("#timeline-shader-bg");if(!c){d.warn("Timeline Shader: Canvas #timeline-shader-bg not found");return}const v=Pe.getSettings(),e=Pe.isMobile(),h=v.timelineShaderDotCount||{x:98,y:54},i={dotCountX:h.x,dotCountY:h.y,spacing:.8,dotSize:e?8:10,waveSpeed:.32,waveFrequencyX:.16,waveFrequencyY:.32,waveAmplitude:1.9,color:"#4fb3d9",opacity:.58,rotationX:-1.7,rotationY:0,rotationZ:.26,cameraZ:60,bobbingAmplitude:1.4,bobbingSpeed:.22,positionX:-2,positionY:-30,positionZ:-16,fadeIntensity:.86};window.timelineShaderParams=i,i.scale=window.innerWidth>1440?6:3.4,setTimeout(()=>{if(window.gui){let w=window.gui.__folders["Timeline Shader"];w||(w=window.gui.addFolder("Timeline Shader")),w.add(i,"waveSpeed",0,2).name("Wave Speed"),w.add(i,"waveAmplitude",0,10).name("Amplitude"),w.add(i,"waveFrequencyX",0,1).name("Freq X"),w.add(i,"waveFrequencyY",0,1).name("Freq Y"),w.add(i,"bobbingAmplitude",0,20).name("Bob Amplitude"),w.add(i,"bobbingSpeed",0,2).name("Bob Speed"),w.add(i,"fadeIntensity",0,1).name("Fade Intensity").onChange(N=>{k&&k.uniforms&&(k.uniforms.uFadeIntensity.value=N)}),w.add(i,"dotSize",.1,10).name("Dot Size").onChange(N=>{k&&k.uniforms&&(k.uniforms.uSize.value=N*T.getPixelRatio())}),w.addColor(i,"color").name("Dot Color").onChange(N=>{k&&k.uniforms&&k.uniforms.uColor.value.set(N)}),w.add(i,"opacity",0,1).name("Opacity").onChange(N=>{k&&k.uniforms&&(k.uniforms.uOpacity.value=N)}),w.add(i,"scale",.1,5).name("Scale").onChange(N=>{C&&C.scale.set(N,N,N)});const V=w.addFolder("Position");V.add(i,"positionX",-200,200).name("Pos X"),V.add(i,"positionY",-200,200).name("Pos Y"),V.add(i,"positionZ",-200,200).name("Pos Z");const se=w.addFolder("Rotation");se.add(i,"rotationX",-Math.PI,Math.PI).name("Rot X"),se.add(i,"rotationY",-Math.PI,Math.PI).name("Rot Y"),se.add(i,"rotationZ",-Math.PI,Math.PI).name("Rot Z")}},1e3);const l=new dt,R=new ut(75,window.innerWidth/window.innerHeight,.1,1e3);R.position.z=i.cameraZ;const T=new mt({canvas:c,alpha:!0,antialias:!1,powerPreference:e?"low-power":"default"});T.setSize(window.innerWidth,window.innerHeight),T.setPixelRatio(Math.min(window.devicePixelRatio,e?.75:1.25)),c.style.width=`${window.innerWidth}px`,c.style.height=`${window.innerHeight}px`;const b=new At,W=[],z=-(i.dotCountX*i.spacing)/2,q=-(i.dotCountY*i.spacing)/2;for(let w=0;w<i.dotCountX;w++)for(let V=0;V<i.dotCountY;V++){const se=z+w*i.spacing,N=q+V*i.spacing;W.push(se,N,0)}b.setAttribute("position",new Bt(W,3));const k=new pt({uniforms:{uTime:{value:0},uColor:{value:new De(i.color)},uOpacity:{value:i.opacity},uSize:{value:i.dotSize*T.getPixelRatio()},uFrequencyX:{value:i.waveFrequencyX},uFrequencyY:{value:i.waveFrequencyY},uAmplitude:{value:i.waveAmplitude},uFadeIntensity:{value:i.fadeIntensity}},vertexShader:`
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
    `,transparent:!0,depthWrite:!1,blending:Dt}),C=new zt(b,k);C.rotation.x=i.rotationX,C.rotation.y=i.rotationY,C.rotation.z=i.rotationZ,C.scale.set(i.scale,i.scale,i.scale),C.position.set(i.positionX,i.positionY,i.positionZ),l.add(C);const O=new gt;let X,G=!1,ee=!0,U=!1;const le=e?30:60,he=e?20:45;let te=le,de=1e3/te,ie=0;Pe.onScrollStateChange(({isScrolling:w})=>{U=w,te=w?le:he,de=1e3/te});const x=new IntersectionObserver(w=>{w.forEach(V=>{ee=V.isIntersecting})},{threshold:.1,rootMargin:"50px"});x.observe(c);function ne(){if(G)return;X=requestAnimationFrame(ne);const w=performance.now(),V=w-ie;if(V<de||!ee||document.hidden)return;ie=w-V%de;const se=O.getElapsedTime();if(e&&U?k.uniforms.uTime.value+=.008:k.uniforms.uTime.value=se*i.waveSpeed,(!e||!U)&&(k.uniforms.uFrequencyX.value=i.waveFrequencyX,k.uniforms.uFrequencyY.value=i.waveFrequencyY,k.uniforms.uAmplitude.value=i.waveAmplitude,k.uniforms.uColor.value.set(i.color),k.uniforms.uFadeIntensity.value=i.fadeIntensity),k.uniforms.uOpacity.value=i.opacity,!e){const N=Math.sin(se*i.bobbingSpeed)*i.bobbingAmplitude;C.position.set(i.positionX,i.positionY+N,i.positionZ),C.rotation.x=i.rotationX,C.rotation.y=i.rotationY,C.rotation.z=i.rotationZ,C.scale.set(i.scale,i.scale,i.scale)}T.render(l,R)}function J(){R.aspect=window.innerWidth/window.innerHeight,R.updateProjectionMatrix(),T.setSize(window.innerWidth,window.innerHeight),k.uniforms.uSize.value=i.dotSize*T.getPixelRatio(),c.style.width=`${window.innerWidth}px`,c.style.height=`${window.innerHeight}px`,i.scale=window.innerWidth>1440?6:3.4,C.scale.set(i.scale,i.scale,i.scale)}return window.addEventListener("resize",J),requestAnimationFrame(ne),{stop:()=>{G=!0,cancelAnimationFrame(X),window.removeEventListener("resize",J),x.disconnect()},resume:()=>{G&&(G=!1,window.addEventListener("resize",J),e||J(),O.start(),ie=performance.now(),requestAnimationFrame(ne))},updateParams:w=>{Object.assign(i,w)},setTargetFPS:w=>{te=w,de=1e3/w}}}o.ticker.lagSmoothing(0);Pe.onFpsCapChange(c=>{d.log(`[Timeline] Applying GSAP ticker fps cap: ${c.cap}fps (${c.reason})`),o.ticker.fps(c.cap)});let Ve=0;const Ot=window.matchMedia("(max-width: 1024px)").matches?250:150;function jt(){const c=document.querySelector("#acs-timeline"),v=document.querySelector("#timeline-window-start"),e=document.querySelector("#timeline-window-bg"),h=document.querySelector(".get-involved-message");if(document.querySelector("#timeline-shader-bg")&&!window.timelineShaderControls&&(window.timelineShaderControls=_t(),window.timelineShaderControls&&window.timelineShaderControls.stop&&window.timelineShaderControls.stop()),document.querySelector("#timeline-cover-canvas")&&!window.coverOrbControls&&(window.coverOrbControls=qt(),window.coverOrbControls&&window.coverOrbControls.pause&&window.coverOrbControls.pause()),!c||!v||!e||!h){d.warn("Timeline: Required elements not found. Skipping timeline initialization.");return}const i=c.querySelector(".timeline-container"),l=c.querySelector(".timeline-track");if(!i||!l){d.warn("Timeline: Container or track not found. Skipping timeline initialization.");return}typeof window.backgroundPaused>"u"&&(window.backgroundPaused=!1);let R=null,T=null,b=!0;const W=(t,n,s)=>t+(n-t)*s,z=()=>{if(!v)return null;const t=v.getBoundingClientRect();return t.width===0||t.height===0?null:{top:t.top-2,left:t.left-6,width:t.width+12,height:t.height+4}},q=()=>{const t=z();return!t||!e?!1:(R={...t},T={...t},D={...t},e.style.position="fixed",e.style.top=`${t.top}px`,e.style.left=`${t.left}px`,e.style.width=`${t.width}px`,e.style.height=`${t.height}px`,e.style.background="linear-gradient(rgb(4, 147, 171), rgb(6, 87, 164))",e.style.borderRadius="4px",e.style.zIndex="0",!0)},k=()=>{if(!v||!e||!b)return;const t=v.getBoundingClientRect();if(t.width===0||t.height===0)return;const n=.1,s=.5,m=.5;T||(T={top:0,left:0,width:0,height:0}),!(!(Math.abs(t.top-T.top)>n||Math.abs(t.left-T.left)>s||Math.abs(t.width-T.width)>m||Math.abs(t.height-T.height)>m)&&T.top!==0)&&(T={top:t.top,left:t.left,width:t.width,height:t.height},R?R={top:W(R.top,t.top,.6),left:W(R.left,t.left,.6),width:W(R.width,t.width,.6),height:W(R.height,t.height,.6)}:R={top:t.top,left:t.left,width:t.width,height:t.height},e.style.position="fixed",e.style.top=`${R.top}px`,e.style.left=`${R.left}px`,e.style.width=`${R.width}px`,e.style.height=`${R.height}px`,e.style.background="linear-gradient(rgb(4, 147, 171), rgb(6, 87, 164))",e.style.zIndex="0",e.style.borderRadius="4px")};o.set(e,{opacity:0,visibility:"hidden"});const C=document.createElement("style");C.id="timeline-window-start-bg-style",C.textContent=`
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
  `,document.head.appendChild(C),v.style.position="relative",v.style.zIndex="1";const O=()=>{const t=z();return t?(R={...t},T={...t},D={...t},e.style.position="fixed",e.style.top=`${t.top}px`,e.style.left=`${t.left}px`,e.style.width=`${t.width}px`,e.style.height=`${t.height}px`,e.style.background="linear-gradient(rgb(4, 147, 171), rgb(6, 87, 164))",e.style.borderRadius="4px",!0):!1};requestAnimationFrame(()=>{O()||setTimeout(()=>{O()||setTimeout(O,200)},100)});const X=new ResizeObserver(()=>{b&&!document.body.classList.contains("in-timeline")&&q()});X.observe(document.body);let G=null,ee=!1,U=0;const le=window.matchMedia("(max-width: 1024px)").matches?5:3,he=()=>{if(ee)return;ee=!0,U=0;const t=()=>{ee&&(U++,U%le===0&&k(),G=requestAnimationFrame(t))};t()},te=()=>{ee&&(ee=!1,G!==null&&(cancelAnimationFrame(G),G=null),U=0)};if(K.create({trigger:h,start:"top bottom",end:"bottom top",onEnter:()=>{q(),he()},onLeave:()=>{},onEnterBack:()=>{q(),he()},onLeaveBack:()=>{te()}}),window.matchMedia("(max-width: 1024px)").matches&&c){const t=()=>{Be.hide(),Be.setOpacity(0);const s=document.getElementById("mobile-film-grain");s&&(s.style.opacity="0",s.style.display="none",s.style.visibility="hidden")},n=()=>{Be.setOpacity(.25),Be.show();const s=document.getElementById("mobile-film-grain");s&&(s.style.visibility="visible",s.style.display="block",s.style.opacity="0.25")};K.create({trigger:c,start:"top 80%",end:"bottom 20%",onEnter:()=>{d.log("[Timeline] Mobile: Pausing background elements for performance"),window.backgroundPaused=!0,t()},onLeave:()=>{d.log("[Timeline] Mobile: Resuming background elements"),window.backgroundPaused=!1,n()},onEnterBack:()=>{d.log("[Timeline] Mobile: Pausing background elements (scrolled back)"),window.backgroundPaused=!0,t()},onLeaveBack:()=>{d.log("[Timeline] Mobile: Resuming background elements (scrolled back up)"),window.backgroundPaused=!1,n()}})}const ie=o.utils.toArray(".timeline-event"),x=o.utils.toArray(".timeline-decade"),ne=ie.length-1,J=()=>{const t=window.innerWidth;return t<1025?t:t>=1280?Math.min(1324,t*.92):t*.5},w=()=>window.matchMedia("(max-width: 1024px)").matches,V=()=>window.innerHeight*1,se=()=>window.innerHeight*(w()?.7:.88),N=()=>V()+ne*se();se(),N();const Z=w()?.6:.88,ge=.08,qe=Z+ge,_e=.09+ge,ft=ne*qe,Le=_e+ft;let L={isLocked:!1,targetIndex:-1,unlockTimer:null,reason:""},Oe=0,A=null,B=null,Re=null,ue=!1,$e=0,P;const Ze=(t,n,s=0)=>{if(!t||!P)return;const m=[],p=t.querySelector(".event-year"),a=t.querySelector(".event-description"),y=t.querySelector(".event-image");p&&m.push(p),a&&m.push(a),y&&m.push(y),m.length&&P.fromTo(m,{opacity:0},{opacity:1,duration:Math.max(.25,Z*.65),ease:"power2.out",stagger:.08,force3D:!0},n?`${n}+=${s}`:s)},Ue=t=>{if(A||(A=document.querySelector("#current-timeline-year")),!A){ue=!1;return}o.set(A,{opacity:1}),A.textContent=t,Re=t,B=new It(A,{types:"chars",charClass:"split-char"}),B.chars&&B.chars.length>0?(o.set(B.chars,{opacity:0,y:20,display:"inline-block",force3D:!0}),o.to(B.chars,{opacity:1,y:0,duration:.27,stagger:.02,ease:"power2.out",overwrite:!0,force3D:!0,onComplete:()=>{ue=!1}})):ue=!1},wt=t=>{if(!(!t||t===Re||ue)){if(ue=!0,A||(A=document.querySelector("#current-timeline-year")),!A){ue=!1;return}B&&B.chars&&B.chars.length>0?o.to(B.chars,{opacity:0,y:-20,duration:.17,stagger:.01,ease:"power2.in",force3D:!0,onComplete:()=>{B&&typeof B.revert=="function"&&B.revert(),Ue(t)}}):Ue(t)}},je=()=>{A||(A=document.querySelector("#current-timeline-year")),A&&o.to(A,{opacity:0,duration:.3,ease:"power2.out",force3D:!0,onComplete:()=>{B&&typeof B.revert=="function"&&B.revert(),A.textContent="",Re=null,ue=!1}})};function yt(){d.log("[Re-entry] Starting timeline re-entry"),ve=!0,d.log("[Re-entry] Set isReEntering flag to TRUE - scroll positioning disabled"),Ee=!1,Se=!1,window._isTimelineDismissed=!1,window._isDismissing=!1,o.set(h,{opacity:1}),c.classList.contains("closed")||d.warn("[Re-entry] Timeline was not collapsed, should have been"),o.killTweensOf(e),e.style.cssText="";const t=z(),n=t?t.top:window.innerHeight/2-20,s=t?t.left:window.innerWidth/2-100,m=t?t.width:200,p=t?t.height:40;t&&(D={...t}),e.style.position="fixed",e.style.top=`${n}px`,e.style.left=`${s}px`,e.style.width=`${m}px`,e.style.height=`${p}px`,e.style.zIndex="9999",e.style.background="linear-gradient(rgb(4, 147, 171), rgb(6, 87, 164))",e.style.pointerEvents="none",e.style.visibility="visible",e.style.display="block",e.style.borderRadius="4px",e.style.opacity="0.5",d.log("[Re-entry] Background positioned to match timeline-window-start:",{top:n,left:s,width:m,height:p,posValid:!!t});function a(){d.log("[Re-entry] Starting background expansion animation"),e.style.setProperty("--decal-opacity","0"),d.log("[Re-entry] Set shader background (--decal-opacity) to 0");const g=document.getElementById("timeline-window-start-bg-style");g&&(g.textContent=`
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
        `);const f=o.timeline({onComplete:()=>{d.log("[Re-entry] Expansion complete, now locking background"),e.style.position="fixed",e.style.top="0",e.style.left="0",e.style.width="100vw",e.style.height="100vh",e.style.opacity="1",e.style.visibility="visible",e.style.display="block",e.style.borderRadius="0px",e.style.background="linear-gradient(rgb(4, 147, 171), rgb(6, 87, 164))",e.style.zIndex="9999",fe=!0,d.log("[Re-entry] Background locked at fullscreen - isBgLockedFullscreen = TRUE");function M(){if(!fe)return;const E=e.getBoundingClientRect(),H=e.style.top!=="0px"||e.style.left!=="0px"||e.style.width!=="100vw"||e.style.height!=="100vh",_=Math.abs(E.top)>2||Math.abs(E.left)>2||Math.abs(E.width-window.innerWidth)>5||Math.abs(E.height-window.innerHeight)>5;(H||_)&&(d.warn("[Re-entry] AGGRESSIVE LOCK: Background moved! Inline styles:",{top:e.style.top,left:e.style.left,width:e.style.width,height:e.style.height},"Computed position:",{top:E.top,left:E.left,width:E.width,height:E.height}),e.style.position="fixed",e.style.top="0",e.style.left="0",e.style.width="100vw",e.style.height="100vh",e.style.opacity="1",e.style.visibility="visible",e.style.display="block",e.style.zIndex="9999",e.style.transform="none",e.style.margin="0",e.style.padding="0"),requestAnimationFrame(M)}M(),d.log("[Re-entry] Started aggressive fullscreen protection loop"),document.body.classList.add("in-timeline"),d.log("[Re-entry] Added .in-timeline class for protection"),d.log("[Re-entry] Background locked at fullscreen, now restoring timeline content"),y()}});f.to(e,{top:0,left:0,width:"100vw",height:"100vh",borderRadius:"0px",opacity:1,duration:.6,ease:"power2.inOut",onStart:()=>{d.log("[Re-entry] Background expansion started"),e.style.background="linear-gradient(rgb(4, 147, 171), rgb(6, 87, 164))",e.style.visibility="visible",e.style.display="block",e.style.zIndex="9999"},onUpdate:function(){const M=this.progress();e.style.visibility="visible",e.style.display="block",e.style.background="linear-gradient(rgb(4, 147, 171), rgb(6, 87, 164))",(M===0||M===.5||M===1)&&d.log(`[Re-entry] Expansion progress: ${(M*100).toFixed(0)}%, opacity: ${e.style.opacity}, size: ${e.style.width} x ${e.style.height}`)},onComplete:()=>{d.log("[Re-entry] Background expansion animation complete"),e.style.opacity="1",e.style.background="linear-gradient(rgb(4, 147, 171), rgb(6, 87, 164))"}},0),f.fromTo(e,{opacity:.5},{opacity:1,duration:.6,ease:"none"},0),f.to(h,{opacity:0,duration:.4,ease:"power2.in"},.2);const r=document.querySelector("#background-canvas");r&&f.to(r,{opacity:0,duration:.5,ease:"power2.inOut"},0);const F=document.documentElement;F.style.background="linear-gradient(rgb(4, 147, 171), rgb(6, 87, 164))",d.log("[Re-entry] Starting expansion timeline, duration:",f.duration()),f.play()}function y(){d.log("[Re-entry] Restoring timeline content and structure"),c.style.pointerEvents="",c.style.display="",c.classList.remove("closed"),c.style.opacity="0",i.style.opacity="0",Me.forEach(r=>{r&&r.enable&&r.enable()}),K.getAll().forEach(r=>{(r.vars.trigger===c||r.vars.trigger===h||r.vars.pin===i)&&r.enable()}),o.utils.toArray(".timeline-event").forEach(r=>{o.set(r,{opacity:0})});const f=document.querySelector(".timeline-track");f&&o.set(f,{x:0,y:0}),requestAnimationFrame(()=>{K.refresh(),requestAnimationFrame(()=>{d.log("[Re-entry] Content restored, now scrolling to timeline"),u()})})}function u(){let g;if(P&&P.scrollTrigger){const f=window.innerHeight*.35;g=P.scrollTrigger.start+f}else g=c.getBoundingClientRect().top+window.scrollY;d.log("[Re-entry] Scrolling to timeline position:",g),document.body.classList.add("in-timeline"),window.backgroundPaused||(window.backgroundPaused=!0,window.dispatchEvent(new CustomEvent("timeline:backgroundPaused",{detail:{paused:!0}}))),window.shaderBackgroundRenderer&&window.shaderBackgroundRenderer.setInTimeline&&window.shaderBackgroundRenderer.setInTimeline(!0),window.coverOrbControls&&window.coverOrbControls.resume&&window.coverOrbControls.resume(),window.timelineShaderControls&&window.timelineShaderControls.resume&&window.timelineShaderControls.resume(),P&&P.scrollTrigger&&P.progress(0),window.lenis?window.lenis.scrollTo(g,{duration:.8,easing:f=>Math.min(1,1.001-Math.pow(2,-10*f)),onComplete:()=>{d.log("[Re-entry] Scroll complete, fading in timeline"),e.style.position="fixed",e.style.top="0",e.style.left="0",e.style.width="100vw",e.style.height="100vh",e.style.opacity="1",e.style.visibility="visible",e.style.display="block",e.style.borderRadius="0px",e.style.background="linear-gradient(rgb(4, 147, 171), rgb(6, 87, 164))",d.log("[Re-entry] Locked background at fullscreen state"),ve=!1,fe=!1,d.log("[Re-entry] Cleared isReEntering and isBgLockedFullscreen flags to FALSE - scroll positioning re-enabled"),e.style.zIndex="5",o.to(c,{opacity:1,duration:.3,ease:"power2.out"}),o.to(i,{opacity:1,duration:.3,ease:"power2.out"}),o.to(e,{"--decal-opacity":1,duration:.5,ease:"power2.out",onUpdate:function(){const f=o.getProperty(e,"--decal-opacity")||0;e.style.setProperty("--decal-opacity",f)}}),d.log("[Re-entry] Fading in shader background (--decal-opacity)")}}):(window.scrollTo({top:g,behavior:"smooth"}),setTimeout(()=>{d.log("[Re-entry] Scroll complete, fading in timeline"),e.style.position="fixed",e.style.top="0",e.style.left="0",e.style.width="100vw",e.style.height="100vh",e.style.opacity="1",e.style.visibility="visible",e.style.display="block",e.style.borderRadius="0px",e.style.background="linear-gradient(rgb(4, 147, 171), rgb(6, 87, 164))",d.log("[Re-entry] Locked background at fullscreen state (fallback)"),ve=!1,fe=!1,d.log("[Re-entry] Cleared isReEntering and isBgLockedFullscreen flags to FALSE - scroll positioning re-enabled"),e.style.zIndex="5",o.to(c,{opacity:1,duration:.3,ease:"power2.out"}),o.to(i,{opacity:1,duration:.3,ease:"power2.out"}),o.to(e,{"--decal-opacity":1,duration:.5,ease:"power2.out",onUpdate:function(){const f=o.getProperty(e,"--decal-opacity")||0;e.style.setProperty("--decal-opacity",f)}}),d.log("[Re-entry] Fading in shader background (--decal-opacity) - fallback")},800))}a()}if(v){const t=n=>{(Ee||window._isTimelineDismissed)&&(n.preventDefault(),n.stopPropagation(),yt())};v.addEventListener("click",t,{capture:!0}),v.addEventListener("touchend",t,{passive:!1,capture:!0}),v.style.pointerEvents="auto"}let Ne=!1,Ke=-1,Je=0;const ht=w()?.003:.001,vt=w()?2:1,xe=t=>{Math.abs(t-Ke)<ht||(Je++,Je%vt===0&&(Ke=t,!Ne&&(Ne=!0,requestAnimationFrame(()=>{Ne=!1,bt()}))))};let Ye=null,We=null,Xe=null,Ie=null,Fe=null;const bt=t=>{Ye||(Ye=document.querySelector(".scrubber-progress")),We||(We=o.utils.toArray(".marker")),Xe||(Xe=o.utils.toArray(".minor-node"));const n=Ye,s=We,m=Xe;if(!n||!x.length)return;const p=s.length;let a=0,y=0,u=-1;if(L.isLocked&&L.targetIndex>=0)a=L.targetIndex,y=(2*a+1)/(2*p);else{const g=window.matchMedia("(max-width: 1024px)").matches,f=g?window.innerHeight/2:window.innerWidth/2;let r=null,F=1/0,M=-1;if(ie.forEach((E,H)=>{const _=E.getBoundingClientRect(),ce=g?_.top+_.height/2:_.left+_.width/2,ae=Math.abs(ce-f);ae<F&&(F=ae,r=E,M=H)}),M!==-1&&($e=M),r&&r.classList.contains("timeline-cover"))a=0,u=0,y=1/(2*p),je();else if(r){u=M-1,u=Math.max(0,Math.min(u,m.length-1));const E=r.getAttribute("data-year");if(E&&wt(E),u>=0&&m.length>0){const H=m[u];if(H){const _=parseInt(H.getAttribute("data-decade-index")||"0");a=Math.min(_,p-1)}else a=0}else a=0}else a=0,u=0,y=1/(2*p),je()}if(u>=0&&m.length>0){const g=m[u];if(g)if(Ie||(Ie=document.querySelector(".scrubber-line")),Fe||(Fe=document.querySelector(".scrubber-content")),Ie&&Fe){const f=Ie.getBoundingClientRect(),r=g.getBoundingClientRect();Fe.getBoundingClientRect();const F=r.left+r.width/2-f.left,M=f.width;y=Math.max(0,Math.min(1,F/M))}else y=(2*a+1)/(2*p);else y=(2*a+1)/(2*p)}else y=(2*a+1)/(2*p);if(o.to(n,{scaleX:y,transformOrigin:"left",duration:.3,ease:"power2.out",force3D:!0,overwrite:"auto"}),s.length>0&&s.forEach((g,f)=>{g.classList.remove("active","complete"),f===a?g.classList.add("active"):f<a&&g.classList.add("complete")}),m.length>0&&m.forEach((g,f)=>{g.classList.remove("active","complete");const r=parseInt(g.getAttribute("data-minor-index")||f);r===u?g.classList.add("active"):r<u&&g.classList.add("complete")}),window.scrubberAutoScroll&&!L.isLocked){const g=a>Oe?1:a<Oe?-1:0;window.scrubberAutoScroll(a,g),Oe=a}};window._updateScrubber=xe;const xt=t=>{if(t===0)return(.09+ge*.5)/Le;let n=0;for(let y=0;y<t&&y<x.length;y++){const u=o.utils.toArray(".timeline-event",x[y]);n+=u.length}const s=x[t];if(o.utils.toArray(".timeline-event",s).length===0)return d.warn(`Decade ${t} has no events`),0;const p=n-1,a=_e+p*qe+Z+ge*.5;return Math.min(a/Le,.99)},Qe=o.timeline({scrollTrigger:{trigger:v,start:"top 90%",end:"top 70%",scrub:1,onLeaveBack:()=>{const t=document.getElementById("timeline-window-start-bg-style");t&&(t.textContent=t.textContent.replace(/opacity: [0-9.]+/,"opacity: 0"))}}}).to({},{duration:1,ease:"power2.out",onUpdate:function(){const n=this.progress()*.5,s=document.getElementById("timeline-window-start-bg-style");s&&(s.textContent=`
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
        `)}});let D=null;const Me=[];typeof window._isTimelineDismissed>"u"&&(window._isTimelineDismissed=!1),typeof window._isDismissing>"u"&&(window._isDismissing=!1);let Ee=window._isTimelineDismissed,Se=window._isDismissing,ve=!1,fe=!1;function St(){o.to(i,{opacity:0,duration:.44,ease:"power2.out",onComplete:()=>{kt()}})}function kt(){Se=!0,window._isDismissing=!0,Ee=!0,window._isTimelineDismissed=!0,document.body.classList.remove("in-timeline");const t=document.querySelector("#current-timeline-year");t&&o.to(t,{opacity:0,duration:.44,ease:"power2.out"});const n=document.getElementById("timeline-window-start-bg-style");n&&(n.textContent=`
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
      `),o.to(h,{opacity:1,duration:.3,ease:"power2.out"}),Me.forEach(u=>{u&&u.disable&&u.disable()}),K.getAll().forEach(u=>{(u.vars.trigger===c||u.vars.trigger===h||u.vars.pin===i)&&u.disable()});const s=h.getBoundingClientRect(),m=s.top+window.scrollY,p=window.innerHeight;m-p/2+s.height/2,window.backgroundPaused&&(window.backgroundPaused=!1,window.dispatchEvent(new CustomEvent("timeline:backgroundPaused",{detail:{paused:!1}}))),window.shaderBackgroundRenderer&&window.shaderBackgroundRenderer.setInTimeline&&window.shaderBackgroundRenderer.setInTimeline(!1);const a=document.querySelector("#background-canvas");a&&o.set(a,{opacity:1});const y=document.documentElement;y.style.background="",e.style.cssText=`
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
    `,c.style.opacity="1",c.style.transition="none",o.to(c,{opacity:0,duration:.44,ease:"power2.inOut",onComplete:()=>{e.style.zIndex="9999",window.lenis?window.lenis.scrollTo(0,{immediate:!0,force:!0,lock:!0}):window.scrollTo(0,0),c.classList.add("closed"),K.refresh();const u=h.getBoundingClientRect(),g=u.top+window.scrollY,f=window.innerHeight,r=g-f/2+u.height/2;window.lenis?(window.lenis.scrollTo(r,{immediate:!0,force:!0,lock:!0}),window.lenis.resize(),window.lenis.raf(Date.now())):window.scrollTo(0,r),setTimeout(()=>{window.lenis&&window.lenis.resize(),o.to(e,{opacity:0,duration:.44,ease:"power2.inOut",onComplete:()=>{e.style.cssText="",e.style.position="",e.style.top="",e.style.left="",e.style.width="",e.style.height="",e.style.zIndex="",e.style.opacity="",e.style.visibility="",e.style.background="",e.style.pointerEvents="",e.style.transform="",e.style.transition="",e.style.borderRadius="",c.style.pointerEvents="none",document.body.classList.remove("in-timeline"),Se=!1,window._isDismissing=!1}})},100)}})}const et=window.innerHeight*.33,tt=et+600,re=et/tt,ze=o.timeline({scrollTrigger:{trigger:h,start:"center center",end:`+=${tt}`,pin:!0,scrub:w()?1.5:1,anticipatePin:1,invalidateOnRefresh:!0,onRefresh:t=>{if(ve){d.log("[Re-entry] onRefresh blocked by isReEntering flag");return}if(fe){d.log("[Re-entry] onRefresh blocked by isBgLockedFullscreen flag");return}if(document.body.classList.contains("in-timeline")){d.log("[Re-entry] onRefresh blocked - already in timeline");return}D=null;const n=re+.01*(1-re),s=z();t.progress>0&&t.progress<n?s&&(e.style.position="fixed",e.style.top=`${s.top}px`,e.style.left=`${s.left}px`,e.style.width=`${s.width}px`,e.style.height=`${s.height}px`,e.style.opacity="0",e.style.visibility="hidden",D={...s}):t.progress>=n&&t.progress<1&&s&&(D={...s})},onUpdate:t=>{if(Se||window._isDismissing||ve)return;if(fe){(e.style.top!=="0px"||e.style.left!=="0px"||e.style.width!=="100vw"||e.style.height!=="100vh"||e.style.opacity!=="1")&&(d.log("[Timeline] FULLSCREEN LOCK: Re-locking background at fullscreen"),e.style.position="fixed",e.style.top="0",e.style.left="0",e.style.width="100vw",e.style.height="100vh",e.style.opacity="1",e.style.visibility="visible",e.style.display="block");return}if(document.body.classList.contains("in-timeline")){(e.style.opacity!=="1"||e.style.visibility!=="visible")&&(d.log("[Timeline] onUpdate safety: Forcing background visible (in-timeline)"),e.style.opacity="1",e.style.visibility="visible",e.style.display="block");return}const n=t.progress,s=re+.01*(1-re),m=Math.max(0,(n-re)/(1-re));n>=re&&m<.1&&(window.timelineShaderControls&&window.timelineShaderControls.resume?(window.timelineShaderControls.resume(),t._loggedShaderResume||(t._loggedShaderResume=!0)):t._loggedShaderMissing||(t._loggedShaderMissing=!0,d.warn("[Timeline] Timeline shader controls not available at progress:",n.toFixed(4))),window.coverOrbControls&&window.coverOrbControls.resume?(window.coverOrbControls.resume(),t._loggedOrbResume||(t._loggedOrbResume=!0)):t._loggedOrbMissing||(t._loggedOrbMissing=!0,d.warn("[Timeline] Cover orb controls not available at progress:",n.toFixed(4))));const p=document.getElementById("timeline-window-start-bg-style"),a=performance.now();if(a-Ve>=Ot){Ve=a;const y=e.getBoundingClientRect();if(Math.abs(y.width-window.innerWidth)<10&&Math.abs(y.height-window.innerHeight)<10&&Math.abs(y.top)<10&&Math.abs(y.left)<10){const r=parseFloat(e.style.opacity||"0");Math.abs(r-1)>.01&&(d.log("[Timeline] SAFETY CHECK: Forcing BG to opacity 1 (was",r,")"),e.style.opacity="1",e.style.visibility="visible");return}const g=window.getComputedStyle(v,"::before");parseFloat(g.opacity||"0")>0&&parseFloat(e.style.opacity||"1")>0&&(e.style.opacity="0",e.style.visibility="hidden")}if(n<s){if(document.body.classList.contains("in-timeline"))return;if(a-Ve<50){const u=z();u&&(e.style.position="fixed",e.style.top=`${u.top}px`,e.style.left=`${u.left}px`,e.style.width=`${u.width}px`,e.style.height=`${u.height}px`,e.style.background="linear-gradient(rgb(4, 147, 171), rgb(6, 87, 164))",e.style.borderRadius="4px",e.style.opacity="0",e.style.visibility="hidden",D={...u}),p&&(p.textContent=`
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
              `)}}else document.body.classList.contains("in-timeline")&&e.style.opacity!=="1"&&(e.style.opacity="1",e.style.visibility="visible",d.log("[Timeline] Forcing background to opacity 1 - already in timeline")),p&&(p.textContent=`
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
            `),document.body.classList.contains("in-timeline")||(e.style.opacity="0.5",e.style.visibility="visible")},onEnter:()=>{b=!1,te(),Qe&&Qe.kill();const t=document.getElementById("timeline-window-start-bg-style");t&&(t.textContent=`
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
          `);const n=z();n?(e.style.position="fixed",e.style.top=`${n.top}px`,e.style.left=`${n.left}px`,e.style.width=`${n.width}px`,e.style.height=`${n.height}px`,e.style.background="linear-gradient(rgb(4, 147, 171), rgb(6, 87, 164))",e.style.borderRadius="4px",e.style.zIndex="0",e.style.opacity="0",e.style.visibility="hidden",D={...n}):d.warn("[Timeline] onEnter: Could not get valid span position")},onLeaveBack:()=>{b=!0,q(),k(),e.style.opacity="0",e.style.visibility="hidden";const t=document.getElementById("timeline-window-start-bg-style");t&&(t.textContent=`
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
          `)}}});Me.push(ze.scrollTrigger),ze.fromTo(e,()=>{if(e.style.background="linear-gradient(rgb(4, 147, 171), rgb(6, 87, 164))",D&&D.width>0&&D.height>0)return{top:`${D.top}px`,left:`${D.left}px`,width:`${D.width}px`,height:`${D.height}px`};const t=z();if(t)return D={...t},{top:`${t.top}px`,left:`${t.left}px`,width:`${t.width}px`,height:`${t.height}px`};d.warn("[Timeline] No valid position for expansion animation - using viewport center fallback");const n=200,s=40;return{top:`${(window.innerHeight-s)/2}px`,left:`${(window.innerWidth-n)/2}px`,width:`${n}px`,height:`${s}px`}},{top:0,left:0,width:"100vw",height:"100vh",borderRadius:"0px",ease:"power2.inOut",duration:.7,immediateRender:!1,onStart:()=>{const t=z();if(t&&D){const n=Math.abs(t.top-D.top)+Math.abs(t.left-D.left)+Math.abs(t.width-D.width)+Math.abs(t.height-D.height);n>5&&(d.log("[Timeline] Position drift detected on expansion start, syncing:",n.toFixed(1),"px"),e.style.top=`${t.top}px`,e.style.left=`${t.left}px`,e.style.width=`${t.width}px`,e.style.height=`${t.height}px`,D={...t})}},onUpdate:()=>{e.style.background="linear-gradient(rgb(4, 147, 171), rgb(6, 87, 164))"},onReverseComplete:()=>{e.style.opacity="0"}},re),ze.fromTo(e,{opacity:.5},{opacity:1,duration:.7,ease:"none"},re),document.fonts&&document.fonts.ready&&document.fonts.ready.then(()=>{K.refresh()});const Ct=re+.4*(1-re);ze.to(h,{opacity:0,ease:"power2.in",duration:.6},Ct);const I={waveSpeed:.32,waveAmplitude:1.9,waveFrequencyX:.16,waveFrequencyY:.32,bobbingAmplitude:1.4,bobbingSpeed:.22,fadeIntensity:.86,opacity:.58,scale:3.4,rotationX:-1.7,rotationZ:.26,positionY:-30,positionZ:-16},Q={waveSpeed:.2,waveAmplitude:5,waveFrequencyX:.6,waveFrequencyY:1,bobbingAmplitude:2.2,bobbingSpeed:.24,fadeIntensity:.39,opacity:1,scale:3.3,rotationX:-1.6,rotationZ:-1.44,positionY:-20,positionZ:-20},j={};let it=0;const Tt=w()?2:1;let nt=-1;if(P=o.timeline({scrollTrigger:{trigger:c,start:"top top",end:()=>`+=${N()}`,pin:i,scrub:w()?1:.2,anticipatePin:1,invalidateOnRefresh:!0,onRefresh:t=>{if(!(Se||window._isDismissing||ve)){if(fe){d.log("[Timeline] Timeline onRefresh blocked by isBgLockedFullscreen flag"),t.animation&&xe(t.animation.progress());return}if(document.body.classList.contains("in-timeline")){d.log("[Timeline] Timeline onRefresh - in timeline, skipping background updates"),t.animation&&xe(t.animation.progress());return}t.animation&&(xe(t.animation.progress()),xe(t.animation.progress()))}},onUpdate:t=>{if(Se||window._isDismissing||ve||fe)return;const n=t.animation.progress();xe(n);const s=.75;if(!w()&&n>s&&window.timelineShaderControls&&window.timelineShaderControls.updateParams){it++;const m=Math.abs(n-nt);if(!(it%Tt===0||m>.01))return;nt=n;let a=(n-s)/(1-s);a=Math.max(0,Math.min(1,a)),j.waveSpeed=I.waveSpeed+(Q.waveSpeed-I.waveSpeed)*a,j.waveAmplitude=I.waveAmplitude+(Q.waveAmplitude-I.waveAmplitude)*a,j.waveFrequencyX=I.waveFrequencyX+(Q.waveFrequencyX-I.waveFrequencyX)*a,j.waveFrequencyY=I.waveFrequencyY+(Q.waveFrequencyY-I.waveFrequencyY)*a,j.bobbingAmplitude=I.bobbingAmplitude+(Q.bobbingAmplitude-I.bobbingAmplitude)*a,j.bobbingSpeed=I.bobbingSpeed+(Q.bobbingSpeed-I.bobbingSpeed)*a,j.fadeIntensity=I.fadeIntensity+(Q.fadeIntensity-I.fadeIntensity)*a,j.opacity=I.opacity+(Q.opacity-I.opacity)*a,j.scale=I.scale+(Q.scale-I.scale)*a,j.rotationX=I.rotationX+(Q.rotationX-I.rotationX)*a,j.rotationZ=I.rotationZ+(Q.rotationZ-I.rotationZ)*a,j.positionY=I.positionY+(Q.positionY-I.positionY)*a,j.positionZ=I.positionZ+(Q.positionZ-I.positionZ)*a,window.timelineShaderControls.updateParams(j)}},onEnter:()=>{if(!Ee&&!window._isTimelineDismissed){document.body.classList.add("in-timeline");const u=document.querySelector('meta[name="theme-color"]');u&&u.setAttribute("content","#000000"),window.backgroundPaused||(window.backgroundPaused=!0,window.dispatchEvent(new CustomEvent("timeline:backgroundPaused",{detail:{paused:!0}}))),window.shaderBackgroundRenderer&&window.shaderBackgroundRenderer.setInTimeline&&window.shaderBackgroundRenderer.setInTimeline(!0),window.coverOrbControls&&window.coverOrbControls.resume&&window.coverOrbControls.resume(),window.timelineShaderControls&&window.timelineShaderControls.resume&&window.timelineShaderControls.resume(),window._timelinePauseTimeout&&(clearTimeout(window._timelinePauseTimeout),window._timelinePauseTimeout=null)}o.set(i,{opacity:1,display:"block",pointerEvents:"auto",visibility:"visible"}),l&&o.set(l,{opacity:1,visibility:"visible",clearProps:w()?"x":"y"}),o.utils.toArray(".timeline-event").forEach(u=>{o.set(u,{visibility:"visible",display:"flex"})});const n=document.querySelector(".timeline-event.timeline-cover");n&&o.set(n,{opacity:1,scale:1,visibility:"visible"}),e.style.zIndex="0",o.to(e,{opacity:1,duration:.2,ease:"none",overwrite:"auto"});const s=document.querySelector("#background-canvas");s&&o.to(s,{opacity:0,duration:.5,ease:"power2.inOut"});const m=document.documentElement;m.style.background="linear-gradient(rgb(4, 147, 171), rgb(6, 87, 164))";const p=o.utils.toArray(".minor-node"),a=o.utils.toArray(".marker"),y=document.querySelector(".scrubber-progress");if(p.length>0&&y){const u=p[0];p.forEach(f=>{f.classList.remove("active","complete")}),u.classList.add("active"),a.length>0&&(a.forEach(f=>{f.classList.remove("active","complete")}),a[0].classList.add("active"));const g=document.querySelector(".scrubber-line");if(g){const f=g.getBoundingClientRect(),r=u.getBoundingClientRect(),F=r.left+r.width/2-f.left,M=f.width,E=Math.max(0,Math.min(1,F/M));o.set(y,{scaleX:E,transformOrigin:"left"})}}A||(A=document.querySelector("#current-timeline-year")),A&&(o.set(A,{opacity:0}),A.textContent="",B&&typeof B.revert=="function"&&(B.revert(),B=null),Re=null,ue=!1)},onLeave:()=>{document.body.classList.remove("in-timeline"),window.backgroundPaused&&(window.backgroundPaused=!1,window.dispatchEvent(new CustomEvent("timeline:backgroundPaused",{detail:{paused:!1}}))),window.shaderBackgroundRenderer&&window.shaderBackgroundRenderer.setInTimeline&&window.shaderBackgroundRenderer.setInTimeline(!1);const t=document.querySelector("#background-canvas");t&&o.to(t,{opacity:1,duration:.5,ease:"power2.inOut"});const n=document.documentElement;o.to(n,{duration:.5,ease:"power2.inOut",onComplete:function(){n.style.background=""}})},onLeaveBack:()=>{document.body.classList.remove("in-timeline"),window.backgroundPaused&&(window.backgroundPaused=!1,window.dispatchEvent(new CustomEvent("timeline:backgroundPaused",{detail:{paused:!1}}))),window.shaderBackgroundRenderer&&window.shaderBackgroundRenderer.setInTimeline&&window.shaderBackgroundRenderer.setInTimeline(!1);const t=setTimeout(()=>{document.body.classList.contains("in-timeline")||(window.coverOrbControls&&window.coverOrbControls.pause&&window.coverOrbControls.pause(),window.timelineShaderControls&&window.timelineShaderControls.stop&&window.timelineShaderControls.stop())},1e3);window._timelinePauseTimeout=t,A||(A=document.querySelector("#current-timeline-year")),A&&(o.set(A,{opacity:0}),A.textContent="",B&&typeof B.revert=="function"&&(B.revert(),B=null),Re=null,ue=!1)},onEnterBack:()=>{!Ee&&!window._isTimelineDismissed&&(document.body.classList.add("in-timeline"),window.backgroundPaused||(window.backgroundPaused=!0,window.dispatchEvent(new CustomEvent("timeline:backgroundPaused",{detail:{paused:!0}}))),window.shaderBackgroundRenderer&&window.shaderBackgroundRenderer.setInTimeline&&window.shaderBackgroundRenderer.setInTimeline(!0),window.coverOrbControls&&window.coverOrbControls.resume&&window.coverOrbControls.resume(),window.timelineShaderControls&&window.timelineShaderControls.resume&&window.timelineShaderControls.resume(),window._timelinePauseTimeout&&(clearTimeout(window._timelinePauseTimeout),window._timelinePauseTimeout=null)),o.set(i,{opacity:1,display:"block",pointerEvents:"auto",visibility:"visible"}),l&&o.set(l,{opacity:1,visibility:"visible"}),o.utils.toArray(".timeline-event").forEach(m=>{o.set(m,{visibility:"visible",display:"flex"})}),e.style.zIndex="0",o.to(e,{opacity:1,duration:.2,ease:"none",overwrite:"auto"});const n=document.querySelector("#background-canvas");n&&o.to(n,{opacity:0,duration:.5,ease:"power2.inOut"});const s=document.documentElement;s.style.background="linear-gradient(rgb(4, 147, 171), rgb(6, 87, 164))"}}}),Me.push(P.scrollTrigger),P.fromTo(".timeline-scrubber",{opacity:0,y:30},{opacity:1,y:0,duration:.05,ease:"power2.out",force3D:!0},0),P.to(e,{"--decal-opacity":1,duration:.5,ease:"power2.out",onUpdate:function(){const t=o.getProperty(e,"--decal-opacity")||0;e.style.setProperty("--decal-opacity",t)}},.01),ie.length>0){const t=ie[0],n=ie.slice(1),s="first-event";P.add(s,0),P.fromTo(t,{opacity:0,scale:.95},{opacity:1,scale:1,duration:.25,ease:"power2.out",force3D:!0},s),Ze(t,s,Z*.05),P.to({},{duration:ge},">"),n.forEach((m,p)=>{const a=()=>window.matchMedia("(max-width: 1024px)").matches,y=()=>{if(a())return 0;const r=J(),F=window.innerWidth,M=window.innerWidth*.5,E=F+p*r+r*.5;return M-E},u=()=>a()?`${-(p+1)*100}vh`:0,g=`event-${p}`;P.to(l,{x:y,y:u,duration:Z,ease:"power1.inOut",force3D:!0},g);const f=p===0?t:n[p-1];P.to(f,{opacity:0,scale:.94,duration:Z*.28,ease:"power1.in",force3D:!0},`${g}+=${Z*.34}`),P.fromTo(m,{opacity:0,scale:.9},{opacity:1,scale:1,duration:Z*1.15,ease:"power2.out",force3D:!0},`${g}+=${Z*.1}`),Ze(m,g,Z*.12),p===0&&P.fromTo(".timeline-close",{opacity:0},{opacity:1,duration:Z*.5,ease:"power2.out",force3D:!0},`${g}+=${Z*.3}`),P.to({},{duration:ge})})}const ot=c.querySelector(".timeline-close");ot&&ot.addEventListener("click",()=>{St()});function st(){const t=o.utils.toArray(".marker");if(!t.length||!x.length){d.warn("Timeline: Markers or decades not found");return}let n=0,s=0;x.forEach((m,p)=>{const a=m.getAttribute("data-decade"),y=o.utils.toArray(".timeline-event",m),u=t.find(r=>r.getAttribute("data-decade")===a);if(!u){d.warn(`Timeline: No marker found for decade ${a}`);return}const g=u.querySelector(".marker-minor-nodes");if(!g){d.warn(`Timeline: No minor nodes container found for decade ${a}`);return}g.innerHTML="";const f=parseInt(a)||0;y.forEach((r,F)=>{if(r.classList.contains("timeline-cover")){n++;return}const E=n===0?(.09+ge*.5)/Le:(_e+(n-1)*qe+Z+ge*.5)/Le,H=r.getAttribute("data-year")||"";let _=0;const ce=H.match(/\d{4}/);ce&&(_=parseInt(ce[0]));let ae=0;_>0&&f>0&&(ae=(_-f)/10,ae=Math.max(0,Math.min(.95,ae)));const $=document.createElement("div");$.className="minor-node",$.setAttribute("data-event-index",n),$.setAttribute("data-minor-index",s),$.setAttribute("data-decade-index",p),$.setAttribute("data-local-index",F),$.setAttribute("data-year",H),$.setAttribute("data-year-numeric",_.toString()),$.setAttribute("data-year-position",ae.toFixed(3));const ke=document.createElement("div");if(ke.className="minor-node-dot",$.appendChild(ke),H){const me=document.createElement("div");me.className="minor-node-label",me.textContent=H,$.appendChild(me)}requestAnimationFrame(()=>{const me=u.getBoundingClientRect(),pe=o.utils.toArray(".marker"),He=p+1;if(He<pe.length){const be=pe[He].getBoundingClientRect(),Ce=me.right,Te=be.left-Ce,ye=30,Y=20,oe=Te-ye-Y,Ae=ye+Y+oe*ae;$.style.left=`${Ae}px`}else{const we=window.innerWidth,be=we>768?120:100,Ce=we>768?5:we<640?2:4,Ge=(we-be)/Ce,Te=30,ye=20,Y=Ge-Te-ye,oe=Te+ye+Y*ae;$.style.left=`${oe}px`}}),$.addEventListener("click",me=>{me.stopPropagation(),L.isLocked=!0,L.reason="minor-node-click",L.unlockTimer&&clearTimeout(L.unlockTimer),o.utils.toArray(".minor-node").forEach(Y=>{Y.classList.remove("active","complete");const oe=parseInt(Y.getAttribute("data-minor-index")||"0");oe<s?Y.classList.add("complete"):oe===s&&Y.classList.add("active")}),o.utils.toArray(".marker").forEach((Y,oe)=>{Y.classList.remove("active","complete"),oe===p?Y.classList.add("active"):oe<p&&Y.classList.add("complete")});const we=document.querySelector(".scrubber-progress");if(we){const Y=document.querySelector(".scrubber-line");if(Y){const oe=Y.getBoundingClientRect(),Ae=$.getBoundingClientRect(),Rt=Ae.left+Ae.width/2-oe.left,Et=oe.width,Lt=Math.max(0,Math.min(1,Rt/Et));o.to(we,{scaleX:Lt,transformOrigin:"left",duration:.3,ease:"power2.out"})}}const be=P.scrollTrigger;if(!be)return;const Ce=be.start,Te=be.end-Ce,ye=Ce+Te*E;window.lenis?window.lenis.scrollTo(ye,{duration:1,easing:Y=>Math.min(1,1.001-Math.pow(2,-10*Y)),onComplete:()=>{L.unlockTimer=setTimeout(()=>{L.isLocked=!1,L.targetIndex=-1,L.reason=""},500)}}):(window.scrollTo({top:ye,behavior:"smooth"}),L.unlockTimer=setTimeout(()=>{L.isLocked=!1,L.targetIndex=-1,L.reason=""},1500))}),g.appendChild($),n++,s++}),y.filter(r=>!r.classList.contains("timeline-cover")).length})}st(),window._generateMinorNodes=st;function Pt(){const t=document.querySelector(".scrubber-scroll-wrapper"),n=document.querySelector(".scrubber-nav-prev"),s=document.querySelector(".scrubber-nav-next"),m=o.utils.toArray(".marker");if(!t||!n||!s){d.warn("Timeline: Scrubber scroll elements not found");return}function p(){const r=t.scrollLeft,F=t.scrollWidth-t.clientWidth;r<=10?n.classList.add("disabled"):n.classList.remove("disabled"),r>=F-10?s.classList.add("disabled"):s.classList.remove("disabled")}function a(r){if(r<0||r>=m.length)return;const F=m[r],M=F.getBoundingClientRect();t.getBoundingClientRect();const E=F.offsetLeft+M.width/2,H=t.clientWidth/2,_=E-H;t.scrollTo({left:Math.max(0,_),behavior:"smooth"})}function y(r){const F=window.innerWidth,M=F>768?120:100,E=F>768?5:F<640?2:4,_=((F-M)/E+60)*3,ce=t.scrollLeft+_*r;t.scrollTo({left:Math.max(0,ce),behavior:"smooth"})}n.addEventListener("click",()=>{y(-1)}),s.addEventListener("click",()=>{y(1)}),t.addEventListener("scroll",p),p();let u=!1,g,f;t.style.cursor="",t.style.userSelect="none",t.addEventListener("mousedown",r=>{u=!0,t.classList.add("active"),t.style.cursor="grabbing",g=r.pageX-t.offsetLeft,f=t.scrollLeft}),t.addEventListener("mouseleave",()=>{u=!1,t.classList.remove("active"),t.style.cursor=""}),t.addEventListener("mouseup",()=>{u=!1,t.classList.remove("active"),t.style.cursor=""}),t.addEventListener("mousemove",r=>{if(!u)return;r.preventDefault();const M=(r.pageX-t.offsetLeft-g)*1.5;t.scrollLeft=f-M}),window.scrubberAutoScroll=(r,F=0)=>{if(r<0||r>=m.length)return;const E=m[r].getBoundingClientRect(),H=t.getBoundingClientRect(),_=H.left+100,ce=H.right-100,ae=E.left>=_&&E.right<=ce;let $=!1,ke=r;if(!ae)$=!0;else if(F>0){if(r+1<m.length){const pe=m[r+1].getBoundingClientRect();(pe.right>ce||pe.left>ce)&&($=!0,ke=r+1)}}else if(F<0&&r-1>=0){const pe=m[r-1].getBoundingClientRect();(pe.left<_||pe.right<_)&&($=!0,ke=r-1)}$&&a(ke)}}return Pt(),o.utils.toArray(".marker").forEach((t,n)=>{t.addEventListener("click",()=>{L.isLocked=!0,L.targetIndex=n,L.reason="click",L.unlockTimer&&clearTimeout(L.unlockTimer),L.unlockTimer=setTimeout(()=>{L.isLocked=!1,L.targetIndex=-1,L.reason=""},100);const s=xt(n),m=P.scrollTrigger;if(!m)return;const p=m.start,y=m.end-p,u=p+y*s;window.lenis?window.lenis.scrollTo(u,{duration:1.2,easing:g=>Math.min(1,1.001-Math.pow(2,-10*g))}):window.scrollTo({top:u,behavior:"smooth"})}),t.style.cursor="pointer"}),o.timeline({scrollTrigger:{trigger:c,start:"bottom bottom",end:"bottom 80%",scrub:1,onEnterBack:()=>{o.to([e,c],{opacity:1,duration:.3})},onLeave:()=>{}}}).to([e,c],{opacity:0,ease:"power2.in"}),K.addEventListener("refreshInit",()=>{}),K.addEventListener("refresh",()=>{if($e>0){const n=`event-${$e-1}`;if(P.labels[n]!==void 0){const p=(P.labels[n]+Z)/P.duration(),a=P.scrollTrigger;if(a){const y=a.start+p*(a.end-a.start);window.scrollTo(0,y)}}}}),window._timelineCleanup={rafId:G,resizeObserver:X,stopTracking:te},window._timelinePositioning={positionBgToSpan:k,syncBgToSpanImmediate:q,resetCapturedPosition:()=>{D=null,R={top:0,left:0,width:0,height:0},T={top:0,left:0,width:0,height:0}},setTrackingSpan:t=>{b=t},getTrackingSpan:()=>b},P.scrollTrigger&&(S.timelineScrollTrigger=P.scrollTrigger),S.markerLockRef=L,requestAnimationFrame(()=>{K.refresh()}),P}let S={isResizing:!1,savedProgress:null,timelineScrollTrigger:null,markerLockRef:null};function $t(){const c=typeof S<"u"&&S?S.timelineScrollTrigger:null;if(!c||!c.isActive)return null;const v=c.progress,e=o.utils.toArray(".timeline-event"),h=o.utils.toArray(".timeline-decade"),i=o.utils.toArray(".marker");let l=0,R=0,T=-1;i.forEach((W,z)=>{W.classList.contains("active")&&(T=z)});const b=e.length;if(b>0&&v>0){l=Math.min(Math.floor(v*b),b-1);let W=0;for(let z=0;z<h.length;z++){const q=o.utils.toArray(".timeline-event",h[z]);if(l<W+q.length){R=z;break}W+=q.length}}return T>=0&&(R=T),{progress:v,activeEventIndex:l,activeDecadeIndex:R,activeMarkerIndex:T,scrollPosition:window.pageYOffset||document.documentElement.scrollTop}}let rt=null,at=null,lt=window.innerWidth,ct=window.innerHeight;function Nt(){S.isResizing||(S.isResizing=!0,S.savedProgress=$t(),document.body.classList.add("timeline-resizing"))}function Yt(){const c=window.innerWidth,v=window.innerHeight,e=Math.abs(c-lt),h=Math.abs(v-ct),i=e<5&&h>40&&h<200;return lt=c,ct=v,i}function Wt(){const c=Yt(),v=document.querySelector("#timeline-shader-bg");v&&(v.style.width=`${window.innerWidth}px`,v.style.height=`${window.innerHeight}px`),window._generateMinorNodes&&!c&&window._generateMinorNodes();const e=document.querySelector("#acs-timeline");if(e&&window._timelinePositioning){const h=document.body.classList.contains("in-timeline"),l=e.getBoundingClientRect().top>window.innerHeight*.3;!h&&l?(d.log("[Resize] Before timeline - resetting background position"),window._timelinePositioning.resetCapturedPosition(),window._timelinePositioning.setTrackingSpan&&window._timelinePositioning.setTrackingSpan(!0),requestAnimationFrame(()=>{window._timelinePositioning.syncBgToSpanImmediate&&window._timelinePositioning.syncBgToSpanImmediate()})):h||requestAnimationFrame(()=>{window._timelinePositioning.syncBgToSpanImmediate&&window._timelinePositioning.syncBgToSpanImmediate()})}if(c){d.log("[Resize] Mobile address bar change detected - lightweight refresh"),K.update(),requestAnimationFrame(()=>{window._timelinePositioning&&window._timelinePositioning.syncBgToSpanImmediate&&window._timelinePositioning.syncBgToSpanImmediate(),document.body.classList.remove("timeline-resizing"),S.isResizing=!1,S.savedProgress=null});return}K.refresh(!0),requestAnimationFrame(()=>{requestAnimationFrame(()=>{if(K.update(),e&&window._timelinePositioning){const h=document.body.classList.contains("in-timeline"),l=e.getBoundingClientRect().top>window.innerHeight*.3;!h&&l&&(d.log("[Resize] Post-refresh: Re-syncing background position"),window._timelinePositioning.syncBgToSpanImmediate&&window._timelinePositioning.syncBgToSpanImmediate())}if(S.savedProgress&&S.timelineScrollTrigger){const h=S.timelineScrollTrigger,i=h.start,R=h.end-i,T=i+R*S.savedProgress.progress;if(window.lenis?window.lenis.scrollTo(T,{immediate:!0,force:!0}):window.scrollTo({top:T,behavior:"auto"}),S.savedProgress.activeMarkerIndex>=0&&S.markerLockRef){S.markerLockRef.isLocked=!0,S.markerLockRef.targetIndex=S.savedProgress.activeMarkerIndex,S.markerLockRef.reason="resize",o.utils.toArray(".marker").forEach((C,O)=>{C.classList.remove("active","complete"),O===S.savedProgress.activeMarkerIndex?C.classList.add("active"):O<S.savedProgress.activeMarkerIndex&&C.classList.add("complete")});const W=S.savedProgress.activeEventIndex,z=o.utils.toArray(".minor-node"),q=W-1;z.forEach((C,O)=>{C.classList.remove("active","complete");const X=parseInt(C.getAttribute("data-minor-index")||O);X===q?C.classList.add("active"):X<q&&C.classList.add("complete")});const k=document.querySelector(".scrubber-progress");if(k&&q>=0&&z[q]){const C=z[q],O=document.querySelector(".scrubber-line");O&&C&&requestAnimationFrame(()=>{const X=O.getBoundingClientRect(),G=C.getBoundingClientRect(),ee=G.left+G.width/2-X.left,U=X.width,le=Math.max(0,Math.min(1,ee/U));o.set(k,{scaleX:le,transformOrigin:"left"})})}}setTimeout(()=>{K.update(),h.animation&&(h.animation.invalidate(),h.animation.progress(h.animation.progress())),window.dispatchEvent(new Event("scroll")),h.animation&&window._updateScrubber&&requestAnimationFrame(()=>{window._updateScrubber(h.animation.progress())}),setTimeout(()=>{S.markerLockRef&&S.markerLockRef.reason==="resize"&&(S.markerLockRef.isLocked=!1,S.markerLockRef.targetIndex=-1,S.markerLockRef.reason="")},500),document.body.classList.remove("timeline-resizing"),S.isResizing=!1,S.savedProgress=null},150)}else document.body.classList.remove("timeline-resizing"),S.isResizing=!1,S.savedProgress=null})})}window.addEventListener("resize",()=>{clearTimeout(at),clearTimeout(rt),at=setTimeout(Nt,10),rt=setTimeout(Wt,300)});if(window.visualViewport){let c=null;window.visualViewport.addEventListener("resize",()=>{clearTimeout(c),c=setTimeout(()=>{!S.isResizing&&window._timelinePositioning&&(document.body.classList.contains("in-timeline")||(d.log("[VisualViewport] Address bar change - syncing background"),window._timelinePositioning.setTrackingSpan&&window._timelinePositioning.setTrackingSpan(!0),window._timelinePositioning.syncBgToSpanImmediate&&window._timelinePositioning.syncBgToSpanImmediate()))},100)})}function Kt(){window._timelineCleanup&&(window._timelineCleanup.rafId&&cancelAnimationFrame(window._timelineCleanup.rafId),window._timelineCleanup.resizeObserver&&window._timelineCleanup.resizeObserver.disconnect(),window._timelineCleanup.lenisCallback&&window.lenis&&window.lenis.off("scroll",window._timelineCleanup.lenisCallback),window._timelineCleanup.scrollCallback&&window.removeEventListener("scroll",window._timelineCleanup.scrollCallback),window._timelineCleanup=null),window.timelineShaderControls&&(window.timelineShaderControls.stop(),window.timelineShaderControls=null),window.backgroundPaused&&(window.backgroundPaused=!1,window.dispatchEvent(new CustomEvent("timeline:backgroundPaused",{detail:{paused:!1}})))}export{Kt as disposeTimeline,jt as initTimelineAnimation};
