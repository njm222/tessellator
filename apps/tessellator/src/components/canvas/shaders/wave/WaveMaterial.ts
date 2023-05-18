import { extend } from "@react-three/fiber";
import { Color, ShaderMaterial } from "three";

// @ts-ignore
import fragment from "./glsl/shader.frag";
// @ts-ignore
import vertex from "./glsl/shader.vert";

class WaveMaterial extends ShaderMaterial {
  constructor() {
    super({
      uniforms: {
        uTime: { value: 0 },
        uResolution: { value: 5.0 },
        uStrengthFactor: { value: 5.0 },
        uColorStart: { value: new Color("#fff") },
        uColorEnd: { value: new Color("#000") },
      },
      vertexShader: vertex,
      fragmentShader: fragment,
    });
  }
}

extend({ WaveMaterial });
