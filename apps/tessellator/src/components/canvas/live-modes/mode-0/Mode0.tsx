import React, { useRef } from "react";
import { useAspect } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { Color, MathUtils } from "three";

import { useAnalyser } from "../../../../utils/analyserContext";
import { TerrainMaterial } from "../../shaders/terrain/TerrainMaterial";
import { ModeProps } from "../LiveModes";
import { useGetColor } from "../useGetColor";

const Mode0 = ({ opacity }: ModeProps) => {
  const { audioAnalyser } = useAnalyser();
  const { getColor } = useGetColor();

  const colorRef = useRef(new Color());
  // Get reference of the terrain
  const materialRef = useRef(new TerrainMaterial());
  const { width, height } = useThree((state) => state.viewport);
  const [vpWidth, vpHeight] = useAspect(width, height, 2);

  // TODO: useModeFrame / useFrameMode hook
  useFrame((_, delta) => {
    // Wait for material to load
    if (!materialRef.current) {
      return;
    }

    // Wait for audio analyzer data to load
    if (!audioAnalyser) {
      return;
    }

    const { snareSection, bassSection, kickSection, highSection, midSection } =
      audioAnalyser;

    const { uTime, uXScale, uYScale, uAmplitude, uColor, uOpacity } =
      materialRef.current.uniforms;

    // Update the material opacity
    uOpacity.value = MathUtils.lerp(uOpacity.value, opacity, delta);
    if (uOpacity.value <= 0.01) {
      materialRef.current.visible = false;
      return;
    }
    materialRef.current.visible = true;

    const dynamicDelta = delta;

    const limit = 0.5;
    const midDifference = Math.abs(midSection?.average - midSection?.energy);

    // Set the variables for simplex
    uTime.value = MathUtils.lerp(
      uTime.value,
      uTime.value + midDifference,
      dynamicDelta
    );
    uXScale.value = MathUtils.lerp(
      uXScale.value,
      uXScale.value + midDifference,
      dynamicDelta
    );
    uYScale.value = MathUtils.lerp(
      uYScale.value,
      uYScale.value + midDifference,
      dynamicDelta
    );
    uAmplitude.value = MathUtils.lerp(
      uAmplitude.value,
      snareSection.average,
      dynamicDelta * 10
    );

    // Update the material color
    uColor.value.lerp(colorRef.current.set(getColor()), dynamicDelta);

    // Update the material wireframe
    // materialRef.current.wireframe = spotifyAnalyser.beats.counter % 2 === 0;
  });

  return (
    <mesh position={[0, 0.75, 0]} receiveShadow rotation={[-Math.PI / 5, 0, 0]}>
      <planeGeometry args={[vpWidth, vpHeight, 256, 256]} />
      <terrainMaterial depthWrite={false} ref={materialRef} transparent />
    </mesh>
  );
};

export default Mode0;
