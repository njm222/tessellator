import { extend, ReactThreeFiber } from "@react-three/fiber";
import { Color, ShaderMaterial } from "three";

// @ts-ignore
import fragment from "./glsl/shader.frag";
// @ts-ignore
import vertex from "./glsl/shader.vert";

export default class FractalMaterial extends ShaderMaterial {
  constructor() {
    super({
      uniforms: {
        uColour: { value: new Color("#fff") },
        uTime: { value: 0 },
        uXScale: { value: 1 },
        uYScale: { value: 1 },
        uAmplitude: { value: 1 },
        uOpacity: { value: 1 },
      },
      vertexShader: vertex,
      fragmentShader: fragment,
    });
  }
}

extend({ FractalMaterial });

declare global {
  // eslint-disable-next-line no-unused-vars
  namespace JSX {
    // eslint-disable-next-line no-unused-vars
    interface IntrinsicElements {
      FractalMaterial: ReactThreeFiber.Object3DNode<
        FractalMaterial,
        typeof FractalMaterial
      >;
    }
  }
}
