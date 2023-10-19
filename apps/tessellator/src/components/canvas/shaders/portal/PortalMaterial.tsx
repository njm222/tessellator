import { shaderMaterial } from "@react-three/drei";
import { extend, ReactThreeFiber } from "@react-three/fiber";
import { Color, ShaderMaterial } from "three";

// @ts-ignore
import fragment from "./glsl/shader.frag";
// @ts-ignore
import vertex from "./glsl/shader.vert";

export const PortalMaterial = shaderMaterial(
  {
    uColor: new Color("#1db954"),
    uOpacity: 1,
  },
  vertex,
  fragment
);

extend({ PortalMaterial });

declare global {
  // eslint-disable-next-line no-unused-vars
  namespace JSX {
    // eslint-disable-next-line no-unused-vars
    interface IntrinsicElements {
      portalMaterial: ReactThreeFiber.Object3DNode<
        ShaderMaterial,
        typeof PortalMaterial
      >;
    }
  }
}
