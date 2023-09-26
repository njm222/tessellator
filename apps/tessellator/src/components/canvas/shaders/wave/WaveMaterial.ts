import { extend, ReactThreeFiber } from "@react-three/fiber";
import { Color, ShaderMaterial } from "three";

// @ts-ignore
import fragment from "./glsl/shader.frag";
// @ts-ignore
import vertex from "./glsl/shader.vert";

export default class WaveMaterial extends ShaderMaterial {
  constructor() {
    super({
      uniforms: {
        uTime: { value: 0 },
        uResolution: { value: 5.0 },
        uStrengthFactor: { value: 5.0 },
        uColorStart: { value: new Color("#fff") },
        uColorEnd: { value: new Color("#000") },
        uOpacity: { value: 1 },
      },
      vertexShader: vertex,
      fragmentShader: fragment,
    });
  }
}

extend({ WaveMaterial });

declare global {
  // eslint-disable-next-line no-unused-vars
  namespace JSX {
    // eslint-disable-next-line no-unused-vars
    interface IntrinsicElements {
      waveMaterial: ReactThreeFiber.Object3DNode<
        WaveMaterial,
        typeof WaveMaterial
      >;
    }
  }
}
