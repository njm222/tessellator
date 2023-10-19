import { shaderMaterial } from "@react-three/drei";
import { extend, ReactThreeFiber } from "@react-three/fiber";
import { Color, ShaderMaterial } from "three";

// @ts-ignore
import fragment from "./glsl/shader.frag";
// @ts-ignore
import vertex from "./glsl/shader.vert";

export const TerrainMaterial = shaderMaterial(
  {
    uColor: new Color("#fff"),
    uTime: 0,
    uXScale: 1,
    uYScale: 1,
    uAmplitude: 1,
    uOpacity: 1,
  },
  vertex,
  fragment
);

extend({ TerrainMaterial });

declare global {
  // eslint-disable-next-line no-unused-vars
  namespace JSX {
    // eslint-disable-next-line no-unused-vars
    interface IntrinsicElements {
      terrainMaterial: ReactThreeFiber.Object3DNode<
        ShaderMaterial,
        typeof TerrainMaterial
      >;
    }
  }
}
