import { shaderMaterial } from "@react-three/drei";
import { extend, ReactThreeFiber } from "@react-three/fiber";
import { Color, ShaderMaterial, Vector2 } from "three";

// @ts-ignore
import fragment from "./glsl/shader.frag";
// @ts-ignore
import vertex from "./glsl/shader.vert";

export const FractalMaterial2 = shaderMaterial(
  {
    uOpacity: 1,
    uColor: new Color("#fff"),
    uTime: 0,
    uIterations: 1,
    uEnergy: 1,
    uValence: 1,
    uFactor: 1,
    uHigh: 1,
    uBeatCount: 1,
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
