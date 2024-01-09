import { forwardRef, useMemo } from "react";
import { Camera, useThree } from "@react-three/fiber";
import { Effect } from "postprocessing";
import { Uniform, Vector2, Vector3 } from "three";

// @ts-ignore
import fragment from "./glsl/shader.frag";
// @ts-ignore
import vertex from "./glsl/shader.vert";

const HALF_PI = Math.PI * 0.5;
const v = /* @__PURE__ */ new Vector3();
const ab = /* @__PURE__ */ new Vector3();

/**
 * A shock wave effect.
 *
 * Based on a Gist by Jean-Philippe Sarda:
 * https://gist.github.com/jpsarda/33cea67a9f2ecb0a0eda
 */

let _uSpeed: number,
  _uTime: number,
  _uCamera: Camera,
  _uPosition: Vector3,
  _uScreenPosition: Vector3,
  _uActive: boolean;

export class ShockWaveEffect extends Effect {
  /**
   * Constructs a new shock wave effect.
   *
   * @param {Camera} camera - The main camera.
   * @param {Vector3} [position] - The world position of the shock wave.
   * @param {Object} [options] - The options.
   * @param {Number} [options.speed=2.0] - The animation speed.
   * @param {Number} [options.maxRadius=1.0] - The extent of the shock wave.
   * @param {Number} [options.waveSize=0.2] - The wave size.
   * @param {Number} [options.amplitude=0.05] - The distortion amplitude.
   */

  constructor(
    camera,
    position = new Vector3(),
    { speed = 2.0, maxRadius = 1.0, waveSize = 0.2, amplitude = 0.05 } = {}
  ) {
    super("ShockWaveEffect", fragment, {
      vertexShader: vertex,
      uniforms: new Map<string, Uniform>([
        ["active", new Uniform(false)],
        ["center", new Uniform(new Vector2(0.5, 0.5))],
        ["cameraDistance", new Uniform(1.0)],
        ["size", new Uniform(1.0)],
        ["radius", new Uniform(-waveSize)],
        ["maxRadius", new Uniform(maxRadius)],
        ["waveSize", new Uniform(waveSize)],
        ["amplitude", new Uniform(amplitude)],
      ]),
    });

    /**
     * The position of the shock wave.
     *
     * @type {Vector3}
     */

    _uPosition = position;

    /**
     * The speed of the shock wave animation.
     *
     * @type {Number}
     */

    _uSpeed = speed;

    /**
     * The main camera.
     *
     * @type {Camera}
     * @private
     */

    _uCamera = camera;

    /**
     * The object position in screen space.
     *
     * @type {Vector3}
     * @private
     */

    _uScreenPosition = this.uniforms.get("center").value;

    /**
     * A time accumulator.
     *
     * @type {Number}
     * @private
     */

    _uTime = 0.0;

    /**
     * Indicates whether the shock wave animation is active.
     *
     * @type {Boolean}
     * @private
     */

    _uActive = false;
  }

  set mainCamera(value: Camera) {
    _uCamera = value;
  }

  set position(value: Vector3) {
    _uPosition = value;
  }

  /**
   * The amplitude.
   *
   * @type {Number}
   */

  get amplitude() {
    return this.uniforms.get("amplitude").value;
  }

  set amplitude(value) {
    this.uniforms.get("amplitude").value = value;
  }

  /**
   * The wave size.
   *
   * @type {Number}
   */

  get waveSize() {
    return this.uniforms.get("waveSize").value;
  }

  set waveSize(value) {
    this.uniforms.get("waveSize").value = value;
  }

  /**
   * The maximum radius.
   *
   * @type {Number}
   */

  get maxRadius() {
    return this.uniforms.get("maxRadius").value;
  }

  set maxRadius(value) {
    this.uniforms.get("maxRadius").value = value;
  }

  /**
   * Emits the shock wave.
   */

  explode() {
    _uTime = 0.0;
    _uActive = true;
    this.uniforms.get("active").value = true;
  }

  /**
   * Updates this effect.
   *
   * @param {WebGLRenderer} renderer - The renderer.
   * @param {WebGLRenderTarget} inputBuffer - A frame buffer that contains the result of the previous pass.
   * @param {Number} [delta] - The time between the last frame and the current one in seconds.
   */

  update(renderer, inputBuffer, delta) {
    const position = _uPosition;
    const camera = _uCamera;
    const uniforms = this.uniforms;
    const uActive = uniforms.get("active");

    if (_uActive) {
      const waveSize = uniforms.get("waveSize").value;

      // Calculate direction vectors.
      camera.getWorldDirection(v);
      ab.copy(camera.position).sub(position);

      // Don't render the effect if the object is behind the camera.
      uActive.value = v.angleTo(ab) > HALF_PI;

      if (uActive.value) {
        // Scale the effect based on distance to the object.
        uniforms.get("cameraDistance").value =
          camera.position.distanceTo(position);

        // Calculate the screen position of the shock wave.
        v.copy(position).project(camera);
        _uScreenPosition.set((v.x + 1.0) * 0.5, (v.y + 1.0) * 0.5);
      }

      // Update the shock wave radius based on time.
      _uTime += delta * _uSpeed;
      const radius = _uTime - waveSize;
      uniforms.get("radius").value = radius;

      if (radius >= (uniforms.get("maxRadius").value + waveSize) * 2.0) {
        _uActive = false;
        uActive.value = false;
      }
    }
  }
}

export const ShockWave = forwardRef(
  (
    {
      speed = 3.0,
      maxRadius = 100.0,
      waveSize = 0.8,
      amplitude = 0.33,
    }: {
      speed?: number;
      maxRadius?: number;
      waveSize?: number;
      amplitude?: number;
    },
    ref
  ) => {
    const camera = useThree((state) => state.camera);
    const effect = useMemo(
      () =>
        new ShockWaveEffect(camera, new Vector3(), {
          maxRadius,
          waveSize,
          speed,
          amplitude,
        }),
      [maxRadius, waveSize, speed, amplitude, camera]
    );
    return <primitive dispose={null} object={effect} ref={ref} />;
  }
);

ShockWave.displayName = "ShockWave";
