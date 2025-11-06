import * as THREE from 'three';

export function createTimelineDotPlane() {
  // Configuration
  const dotSpacing = 0.3;
  const cols = 60;
  const rows = 40;
  const totalDots = cols * rows;

  // Create geometry for instanced mesh
  const dotGeometry = new THREE.SphereGeometry(0.02, 8, 8);

  // Custom shader material for wave animation
  const material = new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uWaveStrength: { value: 0.3 },
      uWaveSpeed: { value: 0.5 }
    },
    vertexShader: `
      uniform float uTime;
      uniform float uWaveStrength;
      uniform float uWaveSpeed;
      
      varying float vOpacity;
      
      void main() {
        vec3 pos = position;
        
        // Get instance position
        vec3 instancePos = vec3(
          mod(float(gl_InstanceID), 60.0) * 0.3 - 9.0,
          floor(float(gl_InstanceID) / 60.0) * 0.3 - 6.0,
          0.0
        );
        
        // Calculate wave displacement
        float wave = sin(instancePos.x * 0.5 + instancePos.y * 0.5 + uTime * uWaveSpeed) * uWaveStrength;
        instancePos.z += wave;
        
        // Calculate opacity based on wave
        vOpacity = 0.3 + sin(instancePos.x * 0.5 + uTime * uWaveSpeed) * 0.2;
        
        // Apply transformations
        vec4 mvPosition = modelViewMatrix * vec4(instancePos + pos, 1.0);
        gl_Position = projectionMatrix * mvPosition;
      }
    `,
    fragmentShader: `
      varying float vOpacity;
      
      void main() {
        // Circular point shape
        vec2 coord = gl_PointCoord - vec2(0.5);
        if (length(coord) > 0.5) discard;
        
        gl_FragColor = vec4(1.0, 1.0, 1.0, vOpacity);
      }
    `,
    transparent: true,
    depthWrite: false
  });

  // Create instanced mesh
  const instancedMesh = new THREE.InstancedMesh(dotGeometry, material, totalDots);

  // Position instances in grid
  const dummy = new THREE.Object3D();
  let index = 0;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      dummy.position.set(
        col * dotSpacing - (cols * dotSpacing) / 2,
        row * dotSpacing - (rows * dotSpacing) / 2,
        -3 // Position behind sphere
      );

      dummy.updateMatrix();
      instancedMesh.setMatrixAt(index, dummy.matrix);
      index++;
    }
  }

  instancedMesh.instanceMatrix.needsUpdate = true;

  return instancedMesh;
}

