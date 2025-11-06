import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.min.js";

let renderer, scene, camera, bgScene, bgCamera, bgMaterial, sphere, geometry, pos, base, count, refractRT, clock;

init();
animate();

function init() {
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setClearColor(0x000000, 0);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // === Background shader ===
  bgScene = new THREE.Scene();
  bgCamera = new THREE.Camera();

  const bgGeo = new THREE.PlaneGeometry(2, 2);
  bgMaterial = new THREE.ShaderMaterial({
    uniforms: {
      u_time: { value: 0.0 },
      u_resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
    },
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      precision highp float;
      varying vec2 vUv;
      uniform float u_time;
      uniform vec2 u_resolution;

      vec3 c1 = vec3(0.0, 0.68, 0.95);
      vec3 c2 = vec3(0.47, 0.74, 0.24);
      vec3 c3 = vec3(0.96, 0.51, 0.09);
      vec3 c4 = vec3(0.89, 0.22, 0.13);
      vec3 c5 = vec3(0.5, 0.3, 0.8);

      float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453123);}
      float noise(vec2 p){
        vec2 i=floor(p); vec2 f=fract(p);
        float a=hash(i), b=hash(i+vec2(1,0)), c=hash(i+vec2(0,1)), d=hash(i+vec2(1,1));
        vec2 u=f*f*(3.-2.*f);
        return mix(a,b,u.x)+(c-a)*u.y*(1.-u.x)+(d-b)*u.x*u.y;
      }

      void main(){
        vec2 uv=(gl_FragCoord.xy/u_resolution.xy);
        uv-=.5; uv.x*=u_resolution.x/u_resolution.y;
        float t=u_time*.05;

        float n=noise(uv*2.+t);
        n+=.5*noise(uv*4.-t*.5);
        n+=.25*noise(uv*8.+t*.25);
        n=smoothstep(.3,.8,n);

        vec3 col=mix(c1,c2,abs(sin(u_time*.2)));
        col=mix(col,c3,abs(sin(u_time*.3+1.)));
        col=mix(col,c4,abs(sin(u_time*.4+2.)));
        col=mix(col,c5,n);
        gl_FragColor=vec4(col,1.);
      }
    `,
    depthWrite: false,
  });

  const bgMesh = new THREE.Mesh(bgGeo, bgMaterial);
  bgScene.add(bgMesh);

  // === Render target for refraction ===
  refractRT = new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight);
  refractRT.texture.generateMipmaps = false; // 👈 crucial
  refractRT.texture.minFilter = THREE.LinearFilter; // 👈 crucial

  // === Foreground scene ===
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.set(0, 0, 3);

  const light = new THREE.PointLight(0xffffff, 1);
  light.position.set(5, 5, 5);
  scene.add(light, new THREE.AmbientLight(0xffffff, 0.6));

  // === Refractive material ===
  const glassMaterial = new THREE.MeshPhysicalMaterial({
    transmission: 1.0,
    transparent: true,
    opacity: 1.0,
    thickness: 2.0,
    roughness: 0.02,
    reflectivity: 0.8,
    ior: 1.45,
    attenuationColor: new THREE.Color("#cde9ff"),
    attenuationDistance: 2.0,
    envMap: refractRT.texture,
    envMapIntensity: 1.5,
    clearcoat: 1.0,
    clearcoatRoughness: 0.05,
  });

  geometry = new THREE.SphereGeometry(1, 128, 128);
  sphere = new THREE.Mesh(geometry, glassMaterial);
  scene.add(sphere);

  pos = geometry.attributes.position;
  base = Float32Array.from(pos.array);
  count = pos.count;
  clock = new THREE.Clock();

  window.addEventListener("resize", onResize);
}

function onResize() {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  bgMaterial.uniforms.u_resolution.value.set(window.innerWidth, window.innerHeight);
  refractRT.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  requestAnimationFrame(animate);
  const t = clock.getElapsedTime();

  // Background update
  bgMaterial.uniforms.u_time.value = t;

  // Render background to texture for refraction
  renderer.setRenderTarget(refractRT);
  renderer.render(bgScene, bgCamera);
  renderer.setRenderTarget(null);

  // Morph sphere
  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    const bx = base[i3], by = base[i3 + 1], bz = base[i3 + 2];
    pos.array[i3]     = bx + 0.08 * Math.sin(t * 0.7 + bx * 2.1 + by * 1.7);
    pos.array[i3 + 1] = by + 0.08 * Math.sin(t * 0.7 + by * 2.3 + bz * 1.9);
    pos.array[i3 + 2] = bz + 0.08 * Math.sin(t * 0.7 + bz * 2.5 + bx * 1.3);
  }
  pos.needsUpdate = true;
  geometry.computeVertexNormals();

  sphere.rotation.y += 0.002;

  // Render visible background + sphere
  renderer.autoClear = true;
  renderer.render(bgScene, bgCamera);
  renderer.render(scene, camera);
}
