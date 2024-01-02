import { shaderMaterial } from "@react-three/drei";
import { extend, ReactThreeFiber } from "@react-three/fiber";
import { Color, ShaderMaterial } from "three";

// @ts-ignore
import fragment from "./glsl/shader.frag";
// @ts-ignore
import vertex from "./glsl/shader.vert";

export const FractalMaterial2 = shaderMaterial(
  {
    uOpacity: 0,
    uColor: new Color("#fff"),
    uTime: 0,
    uIterations: 1,
    uEnergy: 1,
    uGlow: 1,
    uNoise: 1,
    uBeatCount: 0,
    // uOffset: 22 / 7,
  },
  vertex,
  fragment
);

extend({ FractalMaterial2 });

declare global {
  // eslint-disable-next-line no-unused-vars
  namespace JSX {
    // eslint-disable-next-line no-unused-vars
    interface IntrinsicElements {
      fractalMaterial2: ReactThreeFiber.Object3DNode<
        ShaderMaterial,
        typeof FractalMaterial2
      >;
    }
  }
}
