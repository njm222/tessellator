import { ShaderMaterial, Vector3 } from "three";
import { extend, ReactThreeFiber } from "@react-three/fiber";

export default class ParticleMaterial extends ShaderMaterial {
  constructor() {
    super({
      uniforms: {
        uTime: { value: 0 },
        uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
        uSize: { value: 4.0 },
        uColour: { value: new Vector3(1.0, 1.0, 1.0) },
      },
      vertexShader: `
      varying vec3 vUv; 
      uniform float uSize;

      void main() {
        vUv = position; 

        gl_PointSize = uSize;
        vec4 modelViewPosition = modelViewMatrix * vec4(position, 1.0);
        gl_Position = projectionMatrix * modelViewPosition; 
      }
      `,
      fragmentShader: `
      uniform vec3 uColour;

      void main() {
        float distanceToCenter = distance(gl_PointCoord, vec2(0.5));
        float strength = 0.5 / distanceToCenter;
        gl_FragColor = vec4(uColour.xyz, strength);
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

declare global {
  // eslint-disable-next-line no-unused-vars
  namespace JSX {
    // eslint-disable-next-line no-unused-vars
    interface IntrinsicElements {
      particleMaterial: ReactThreeFiber.Object3DNode<
        ParticleMaterial,
        typeof ParticleMaterial
      >;
    }
  }
}
