import { useRef } from "react";
import { useAspect } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { Color, ColorRepresentation, MathUtils } from "three";

import { FractalMaterial } from "../../shaders/fractal/FractalMaterial";

export type Mode4Props = { getOpacity: () => number } & {
  getColor: () => ColorRepresentation;
  getDeltaFactor: () => number;
  getHigh: () => number;
  getFactor: () => number;
  getTime: () => number;
  getIterations: () => number;
  getEnergy: () => number;
  getGlow: () => number;
};

const Mode4 = ({
  getColor,
  getDeltaFactor,
  getOpacity,
  getFactor,
  getHigh,
  getTime,
  getIterations,
  getEnergy,
  getGlow,
}: Mode4Props) => {
  const { width, height } = useThree((state) => state.viewport);
  const [vpWidth, vpHeight] = useAspect(width, height, 2);
  const materialRef = useRef(new FractalMaterial());
  const colorRef = useRef(new Color());

  useFrame((state, delta) => {
    if (!materialRef.current) return;

    const {
      uTime,
      uOpacity,
      uIterations,
      uFactor,
      uColor,
      uHigh,
      uGlow,
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

    uHigh.value = MathUtils.lerp(uHigh.value, getHigh(), dynamicDelta);

    const time = getTime();
    uTime.value = MathUtils.lerp(
      uTime.value,
      uTime.value + (isNaN(time) || !isFinite(time) ? 0 : time),
      dynamicDelta
    );

    uFactor.value = MathUtils.lerp(uFactor.value, getFactor(), dynamicDelta);

    const iterations = getIterations();
    uIterations.value =
      Math.floor(
        MathUtils.lerp(
          uIterations.value,
          isNaN(iterations) ? 0 : iterations,
          dynamicDelta
        )
      ) + 1;
  });

  return (
    <mesh position={[0, 0, -3]} scale={[vpWidth, vpHeight, 1]}>
      <planeGeometry />
      <fractalMaterial depthWrite={false} ref={materialRef} transparent />
    </mesh>
  );
};

export default Mode4;
