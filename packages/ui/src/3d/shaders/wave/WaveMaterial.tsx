import { shaderMaterial } from "@react-three/drei";
import { extend, ReactThreeFiber } from "@react-three/fiber";
import { Color, ShaderMaterial, ColorRepresentation } from "three";

// @ts-ignore
import fragment from "./glsl/shader.frag";
// @ts-ignore
import vertex from "./glsl/shader.vert";

export type WaveMaterialUniforms = {
  uTime: number;
  uNoise: number;
  uResolution: number;
  uStrengthFactor: number;
  uColorStart: ColorRepresentation;
  uColorEnd: ColorRepresentation;
  uOpacity: number;
};

export const WaveMaterial = shaderMaterial(
  {
    uTime: 0,
    uNoise: 0.5,
    uResolution: 5.0,
    uStrengthFactor: 5.0,
    uColorStart: new Color("#fff"),
    uColorEnd: new Color("#000"),
    uOpacity: 0,
  },
  vertex,
  fragment
);

extend({ WaveMaterial });

declare global {
  // eslint-disable-next-line no-unused-vars
  namespace JSX {
    // eslint-disable-next-line no-unused-vars
    interface IntrinsicElements {
      waveMaterial: ReactThreeFiber.Object3DNode<
        ShaderMaterial,
        typeof WaveMaterial
      >;
    }
  }
}
