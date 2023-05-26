import { extend, ReactThreeFiber } from "@react-three/fiber";
import { Color,ShaderMaterial } from "three";

export default class ParticleMaterial extends ShaderMaterial {
  constructor() {
    super({
      uniforms: {
        uTime: { value: 0 },
        uRadius: { value: 1.0 },
        uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
        uSize: { value: 4.0 },
        uColour: { value: new Color("#fff") },
      },
      vertexShader: `
      varying vec3 vUv; 
      varying float vDistance;
      uniform float uSize;
      uniform float uRadius;

      void main() {
        vUv = position; 

        gl_PointSize = clamp(uSize, 0.75, 20.0);
        vDistance = uRadius - distance(position.xy, vec2(0.0));
        vec4 modelViewPosition = modelViewMatrix * vec4(position, 1.5);
        gl_Position = projectionMatrix * modelViewPosition; 
      }
      `,
      fragmentShader: `
      varying float vDistance;
      uniform vec3 uColour;

      void main() {
        float distanceToCenter = distance(gl_PointCoord, vec2(0.5));
        float strength = pow(1.0 - distanceToCenter, 3.0);

        vec3 color = mix(uColour, vec3(0.98, 0.78, 0.39), vDistance * 0.5);
        color = mix(vec3(0.0), color, strength);
        
        gl_FragColor = vec4(color, strength);
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
