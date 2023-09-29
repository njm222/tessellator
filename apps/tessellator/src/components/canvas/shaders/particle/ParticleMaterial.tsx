import { shaderMaterial } from "@react-three/drei";
import { extend, ReactThreeFiber } from "@react-three/fiber";
import { Color, ShaderMaterial } from "three";

// @ts-ignore
import fragment from "./glsl/shader.frag";
// @ts-ignore
import vertex from "./glsl/shader.vert";

export const ParticleMaterial = shaderMaterial(
  {
    uTime: 0,
    uRadius: 1.0,
    uPixelRatio: Math.min(window.devicePixelRatio, 2),
    uSize: 4.0,
    uColour: new Color("#fff"),
    uOpacity: 1.0,
  },
  vertex,
  fragment
);

extend({ ParticleMaterial });

declare global {
  // eslint-disable-next-line no-unused-vars
  namespace JSX {
    // eslint-disable-next-line no-unused-vars
    interface IntrinsicElements {
      particleMaterial: ReactThreeFiber.Object3DNode<
        ShaderMaterial,
        typeof ParticleMaterial
      >;
    }
  }
}
