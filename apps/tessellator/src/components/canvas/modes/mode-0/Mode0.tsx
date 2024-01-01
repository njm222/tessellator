import React, { useRef } from "react";
import { useAspect } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { Color, ColorRepresentation, MathUtils } from "three";

import { TerrainMaterial } from "../../shaders/terrain/TerrainMaterial";

export type Mode0Props = { getOpacity: () => number } & {
  getColor: () => ColorRepresentation;
  getTime: () => number;
  getXScale: () => number;
  getYScale: () => number;
  getAmplitude: () => number;
  getDeltaFactor: () => number;
  getWireframe: () => boolean;
};

const Mode0 = ({
  getAmplitude,
  getColor,
  getDeltaFactor,
  getOpacity,
  getTime,
  getWireframe,
  getXScale,
  getYScale,
}: Mode0Props) => {
  const colorRef = useRef(new Color());
  // Get reference of the terrain
  const materialRef = useRef(new TerrainMaterial());
  const { width, height } = useThree((state) => state.viewport);
  const [vpWidth, vpHeight] = useAspect(width, height, 2);

  useFrame((_, delta) => {
    // Wait for material to load
    if (!materialRef.current) {
      return;
    }
    const { uTime, uXScale, uYScale, uAmplitude, uColor, uOpacity } =
      materialRef.current.uniforms;

    // Update the material opacity
    uOpacity.value = MathUtils.lerp(uOpacity.value, getOpacity(), delta);
    if (uOpacity.value <= 0.01) {
      materialRef.current.visible = false;
      return;
    }
    materialRef.current.visible = true;

    const limit = 0.5;

    const dynamicDelta = delta * getDeltaFactor();

    // Set the variables for simplex
    uTime.value = MathUtils.lerp(uTime.value, getTime(), dynamicDelta);
    uXScale.value = MathUtils.lerp(
      uXScale.value,
      Math.max(getXScale(), limit),
      dynamicDelta
    );
    uYScale.value = MathUtils.lerp(
      uYScale.value,
      Math.max(getYScale(), limit),
      dynamicDelta
    );
    uAmplitude.value = MathUtils.lerp(
      uAmplitude.value,
      Math.max(getAmplitude(), 0.1),
      dynamicDelta * 10
    );

    // Update the material color
    uColor.value.lerp(colorRef.current.set(getColor()), dynamicDelta);

    // Update the material wireframe
    materialRef.current.wireframe = getWireframe();
  });

  return (
    <mesh position={[0, 1, -1]} receiveShadow rotation={[-Math.PI / 5, 0, 0]}>
      <planeGeometry args={[vpWidth, vpHeight, 256, 256]} />
      <terrainMaterial depthWrite={false} ref={materialRef} transparent />
    </mesh>
  );
};

export default Mode0;
