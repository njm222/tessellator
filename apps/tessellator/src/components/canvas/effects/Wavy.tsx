import { forwardRef, useMemo } from "react";
import { Effect } from "postprocessing";
import { MathUtils, Uniform, WebGLRenderer,WebGLRenderTarget } from "three";

// @ts-ignore
import fragment from "./glsl/shader.frag";

let _uDistortion: number, _uDistortion2: number, _uSpeed: number;

// Effect implementation
export class WavyEffect extends Effect {
  constructor({ distortion = 3.0, distortion2 = 6.0, speed = 0.5 }) {
    super("WavyEffect", fragment, {
      uniforms: new Map<string, Uniform>([
        ["texture", new Uniform(null)],
        ["distortion", new Uniform(distortion)],
        ["distortion2", new Uniform(distortion2)],
        ["speed", new Uniform(speed)],
      ]),
    });

    _uDistortion = distortion;
    _uDistortion2 = distortion2;
    _uSpeed = speed;
  }

  /**
   * Updates this effect.
   *
   * @param {WebGLRenderer} renderer - The renderer.
   * @param {WebGLRenderTarget} inputBuffer - A frame buffer that contains the result of the previous pass.
   * @param {Number} [deltaTime] - The time between the last frame and the current one in seconds.
   */

  // getUniform(u: string) {
  //   const uniform = this.uniforms.get(u);

  //   if (!uniform) return;

  //   return uniform.value;
  // }

  update(
    renderer: WebGLRenderer | null,
    inputBuffer: WebGLRenderTarget | null,
    deltaTime: number
  ) {
    this.uniforms.get("distortion").value = MathUtils.lerp(
      this.uniforms.get("distortion")?.value || 0,
      _uDistortion,
      deltaTime
    );
    this.uniforms.get("distortion2").value = MathUtils.lerp(
      this.uniforms.get("distortion2")?.value || 0,
      _uDistortion2,
      deltaTime
    );
    this.uniforms.get("speed").value = MathUtils.lerp(
      this.uniforms.get("speed")?.value || 0,
      _uSpeed,
      deltaTime
    );
  }

  setSpeed(speed: number) {
    _uSpeed = speed;
    _uDistortion = speed > 0 ? 3.0 : 0;
    _uDistortion2 = speed > 0 ? 5.0 : 0;
  }
}

export const Wavy = forwardRef(
  ({ distortion = 3.0, distortion2 = 5.0, speed = 0.2 }: any, ref) => {
    const effect = useMemo(
      () =>
        new WavyEffect({
          distortion,
          distortion2,
          speed,
        }),
      [distortion, distortion2, speed]
    );
    return <primitive dispose={null} object={effect} ref={ref} />;
  }
);
