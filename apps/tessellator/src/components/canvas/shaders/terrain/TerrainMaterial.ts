import { extend, ReactThreeFiber } from "@react-three/fiber";
import { Color, ShaderMaterial } from "three";

// @ts-ignore
import fragment from "./glsl/shader.frag";
// @ts-ignore
import vertex from "./glsl/shader.vert";

export default class TerrainMaterial extends ShaderMaterial {
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

extend({ TerrainMaterial });

declare global {
  // eslint-disable-next-line no-unused-vars
  namespace JSX {
    // eslint-disable-next-line no-unused-vars
    interface IntrinsicElements {
      terrainMaterial: ReactThreeFiber.Object3DNode<
        TerrainMaterial,
        typeof TerrainMaterial
      >;
    }
  }
}
