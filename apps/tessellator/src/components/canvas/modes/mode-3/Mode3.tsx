import { useEffect, useRef, useState } from "react";
import { useAspect } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { Color, ColorRepresentation, MathUtils } from "three";

import { WaveMaterial } from "../../shaders/wave/WaveMaterial";

export type Mode2Props = { getOpacity: () => number } & {
  getColor: () => ColorRepresentation;
  getDeltaFactor: () => number;
  getResolution: () => number;
  getNoise: () => number;
  getTime: () => number;
  getStrengthFactor: () => number;
};

const Mode3 = ({
  getColor,
  getDeltaFactor,
  getOpacity,
  getNoise,
  getResolution,
  getTime,
  getStrengthFactor,
}: Mode2Props) => {
  const { width, height } = useThree((state) => state.viewport);
  const [vpWidth, vpHeight] = useAspect(width, height, 2);
  const materialRef = useRef(new WaveMaterial());
  const colorRef = useRef(new Color());

  // useEffect(() => {
  //   setBarThreshold(
  //     trackFeatures.danceability > 0.5
  //       ? trackFeatures.danceability > 0.75
  //         ? 0.95
  //         : 0.8
  //       : 0.65
  //   );
  // }, [trackFeatures.danceability]);

  useFrame((state, delta) => {
    if (!materialRef.current) return;

    const {
      uTime,
      uColorStart,
      uStrengthFactor,
      uOpacity,
      uNoise,
      uResolution,
    } = materialRef.current.uniforms;

    // Update the material opacity
    uOpacity.value = MathUtils.lerp(uOpacity.value, getOpacity(), delta);
    if (uOpacity.value <= 0.01) {
      materialRef.current.visible = false;
      return;
    }
    materialRef.current.visible = true;

    const dynamicDelta = delta * getDeltaFactor();

    uStrengthFactor.value = MathUtils.lerp(
      uStrengthFactor.value,
      getStrengthFactor(),
      dynamicDelta
    );

    uTime.value = MathUtils.lerp(
      uTime.value,
      uTime.value + getTime(),
      dynamicDelta
    );

    uNoise.value = MathUtils.lerp(uNoise.value, getNoise(), dynamicDelta);

    uResolution.value = MathUtils.lerp(
      uResolution.value,
      getResolution(),
      dynamicDelta
    );

    // Update the material color
    uColorStart.value.lerp(colorRef.current.set(getColor()), dynamicDelta);
  });

  return (
    <mesh position={[0, 0, -3]} scale={[vpWidth, vpHeight, 1]}>
      <planeGeometry />
      <waveMaterial depthWrite={false} ref={materialRef} transparent />
    </mesh>
  );
};

export default Mode3;
