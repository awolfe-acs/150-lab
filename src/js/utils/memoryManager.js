/**
 * Memory Manager
 * Utilities for managing and cleaning up Three.js resources
 */

export class MemoryManager {
  constructor() {
    this.disposables = new Set();
    this.textures = new Set();
    this.geometries = new Set();
    this.materials = new Set();
  }

  /**
   * Track a disposable resource
   */
  track(resource, type = 'disposable') {
    if (!resource) return;
    
    switch (type) {
      case 'texture':
        this.textures.add(resource);
        break;
      case 'geometry':
        this.geometries.add(resource);
        break;
      case 'material':
        this.materials.add(resource);
        break;
      default:
        this.disposables.add(resource);
    }
  }

  /**
   * Dispose a specific resource
   */
  dispose(resource) {
    if (!resource) return;
    
    try {
      if (resource.dispose && typeof resource.dispose === 'function') {
        resource.dispose();
      }
      
      // Remove from tracking
      this.disposables.delete(resource);
      this.textures.delete(resource);
      this.geometries.delete(resource);
      this.materials.delete(resource);
    } catch (error) {
      console.warn('[Memory Manager] Error disposing resource:', error);
    }
  }

  /**
   * Dispose all tracked resources
   */
  disposeAll() {
    let disposed = 0;
    
    // Dispose textures first
    this.textures.forEach(texture => {
      try {
        if (texture && texture.dispose) {
          texture.dispose();
          disposed++;
        }
      } catch (error) {
        console.warn('[Memory Manager] Error disposing texture:', error);
      }
    });
    this.textures.clear();
    
    // Then geometries
    this.geometries.forEach(geometry => {
      try {
        if (geometry && geometry.dispose) {
          geometry.dispose();
          disposed++;
        }
      } catch (error) {
        console.warn('[Memory Manager] Error disposing geometry:', error);
      }
    });
    this.geometries.clear();
    
    // Then materials
    this.materials.forEach(material => {
      try {
        if (material && material.dispose) {
          material.dispose();
          disposed++;
        }
      } catch (error) {
        console.warn('[Memory Manager] Error disposing material:', error);
      }
    });
    this.materials.clear();
    
    // Finally other disposables
    this.disposables.forEach(resource => {
      try {
        if (resource && resource.dispose) {
          resource.dispose();
          disposed++;
        }
      } catch (error) {
        console.warn('[Memory Manager] Error disposing resource:', error);
      }
    });
    this.disposables.clear();
    
    console.log(`[Memory Manager] Disposed ${disposed} resources`);
    
    return disposed;
  }

  /**
   * Safely dispose a Three.js object and all its children
   */
  disposeObject(object) {
    if (!object) return;
    
    // Traverse and dispose children first
    if (object.children) {
      object.children.forEach(child => this.disposeObject(child));
    }
    
    // Dispose geometry
    if (object.geometry) {
      this.dispose(object.geometry);
    }
    
    // Dispose material(s)
    if (object.material) {
      if (Array.isArray(object.material)) {
        object.material.forEach(material => {
          this.disposeMaterial(material);
        });
      } else {
        this.disposeMaterial(object.material);
      }
    }
    
    // Remove from parent
    if (object.parent) {
      object.parent.remove(object);
    }
  }

  /**
   * Dispose a material and its textures
   */
  disposeMaterial(material) {
    if (!material) return;
    
    // Dispose textures
    const textures = [
      'map',
      'lightMap',
      'bumpMap',
      'normalMap',
      'specularMap',
      'envMap',
      'alphaMap',
      'aoMap',
      'displacementMap',
      'emissiveMap',
      'gradientMap',
      'metalnessMap',
      'roughnessMap',
    ];
    
    textures.forEach(textureName => {
      if (material[textureName]) {
        this.dispose(material[textureName]);
      }
    });
    
    // Dispose material
    this.dispose(material);
  }

  /**
   * Get memory stats
   */
  getStats() {
    return {
      textures: this.textures.size,
      geometries: this.geometries.size,
      materials: this.materials.size,
      disposables: this.disposables.size,
      total: this.textures.size + this.geometries.size + this.materials.size + this.disposables.size,
    };
  }

  /**
   * Force garbage collection hint (if available)
   */
  forceGC() {
    // Try to trigger garbage collection by creating and clearing large arrays
    // This is just a hint to the JS engine
    try {
      if (window.gc) {
        window.gc();
        console.log('[Memory Manager] Forced garbage collection');
      } else {
        // Create and discard large arrays to hint at garbage collection
        const hint = new Array(1000000);
        hint.fill(0);
        hint.length = 0;
      }
    } catch (error) {
      // Ignore errors
    }
  }
}

// Create singleton instance
const memoryManager = new MemoryManager();

export default memoryManager;

