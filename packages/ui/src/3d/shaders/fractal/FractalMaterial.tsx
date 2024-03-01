import { shaderMaterial } from "@react-three/drei";
import { extend, ReactThreeFiber } from "@react-three/fiber";
import { Color, ShaderMaterial, ColorRepresentation } from "three";

// @ts-ignore
import fragment from "./glsl/shader.frag";
// @ts-ignore
import vertex from "./glsl/shader.vert";

export type FractalMaterialUniforms = {
  uTime: number;
  uIterations: number;
  uEnergy: number;
  uGlow: number;
  uFactor: number;
  uHigh: number;
  uColor: ColorRepresentation;
  uOpacity: number;
};

export const FractalMaterial = shaderMaterial(
  {
    uOpacity: 0,
    uColor: new Color("#fff"),
    uTime: 0,
    uIterations: 1,
    uEnergy: 1,
    uGlow: 1,
    uFactor: 1,
    uHigh: 1,
  },
  vertex,
  fragment
);

extend({ FractalMaterial });

declare global {
  // eslint-disable-next-line no-unused-vars
  namespace JSX {
    // eslint-disable-next-line no-unused-vars
    interface IntrinsicElements {
      fractalMaterial: ReactThreeFiber.Object3DNode<
        ShaderMaterial,
        typeof FractalMaterial
      >;
    }
  }
}
