import * as THREE from "three";
import { extend } from "@react-three/fiber";

export default class ParticleMaterial extends THREE.ShaderMaterial {
  constructor() {
    super({
      uniforms: {
        uTime: { value: 0 },
        uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
        uSize: { value: 150 },
      },
      vertexShader: `
      varying vec3 vUv; 

      void main() {
        vUv = position; 

        vec4 modelViewPosition = modelViewMatrix * vec4(position, 1.0);
        gl_Position = projectionMatrix * modelViewPosition; 
      }
      `,
      fragmentShader: `
      void main() {
        float distanceToCenter = distance(gl_PointCoord, vec2(0.5));
        float strength = 0.5 / distanceToCenter - 0.1;
        gl_FragColor = vec4(1.0, 1.0, 1.0, strength);
      }`,
    });
  }

  get time() {
    return this.uniforms.uTime.value;
  }

  set time(v) {
    this.uniforms.uTime.value = v;
  }
}

extend({ ParticleMaterial });
