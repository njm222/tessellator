import { useRef } from "react";
import { useAspect } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { Color, ColorRepresentation, MathUtils } from "three";

import { FractalMaterial2 } from "../../shaders/fractal2/FractalMaterial2";

export type Mode5Props = { getOpacity: () => number } & {
  getColor: () => ColorRepresentation;
  getDeltaFactor: () => number;
  getNoise: () => number;
  getBeatCount: () => number;
  getTime: () => number;
  getIterations: () => number;
  getEnergy: () => number;
  getGlow: () => number;
};

const Mode5 = ({
  getColor,
  getDeltaFactor,
  getOpacity,
  getNoise,
  getBeatCount,
  getTime,
  getIterations,
  getEnergy,
  getGlow,
}: Mode5Props) => {
  const { width, height } = useThree((state) => state.viewport);
  const [vpWidth, vpHeight] = useAspect(width, height, 2);
  const materialRef = useRef(new FractalMaterial2());
  const colorRef = useRef(new Color());

  useFrame((state, delta) => {
    if (!materialRef.current) return;

    const {
      uTime,
      uOpacity,
      uIterations,
      uNoise,
      uColor,
      uGlow,
      uBeatCount,
      uEnergy,
    } = materialRef.current.uniforms;

    // Update the material opacity
    uOpacity.value = MathUtils.lerp(uOpacity.value, getOpacity(), delta);
    if (uOpacity.value <= 0.01) {
      materialRef.current.visible = false;
      return;
    }
    materialRef.current.visible = true;

    const dynamicDelta = delta * getDeltaFactor();

    // Update the material color
    uColor.value.lerp(colorRef.current.set(getColor()), dynamicDelta);

    uEnergy.value = MathUtils.lerp(uEnergy.value, getEnergy(), dynamicDelta);

    uGlow.value = MathUtils.lerp(uGlow.value, getGlow(), dynamicDelta);

    uBeatCount.value = MathUtils.lerp(
      uBeatCount.value,
      getBeatCount(),
      dynamicDelta
    );

    const time = getTime();
    uTime.value = MathUtils.lerp(
      uTime.value,
      uTime.value + (isNaN(time) || !isFinite(time) ? 0 : time),
      dynamicDelta
    );

    // uNoise.value = MathUtils.lerp(uNoise.value, getNoise(), dynamicDelta);

    const iterations = getIterations();
    uIterations.value =
      Math.floor(
        MathUtils.lerp(
          uIterations.value,
          isNaN(iterations) ? 1 : iterations,
          dynamicDelta
        )
      ) + 1;
  });

  return (
    <mesh position={[0, 0, -3]} scale={[vpWidth, vpHeight, 1]}>
      <planeGeometry />
      <fractalMaterial2 depthWrite={false} ref={materialRef} transparent />
    </mesh>
  );
};

export default Mode5;
