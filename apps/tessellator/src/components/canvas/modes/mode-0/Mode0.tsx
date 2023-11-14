import React, { useRef } from "react";
import { useAspect } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { getIndexOfMax, getIndexOfMin } from "@tessellator/core";
import { Color, MathUtils } from "three";

import { useAnalyser } from "../../../../utils/analyserContext";
import { usePlayer } from "../../../../utils/playerContext";
import { TerrainMaterial } from "../../shaders/terrain/TerrainMaterial";
import { ModeProps } from "../Modes";
import { useGetColor } from "../useGetColor";

const Mode0 = ({ opacity }: ModeProps) => {
  const { audioAnalyser } = useAnalyser();
  const { spotifyAnalyser, trackFeatures } = usePlayer();
  const { getColor } = useGetColor();

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

    // Wait for spotify data to load
    if (!trackFeatures || !spotifyAnalyser?.tatums?.current || !audioAnalyser) {
      return;
    }

    const { snareSection, bassSection, kickSection, highSection, midSection } =
      audioAnalyser;
    const { energy, danceability, valence } = trackFeatures;

    const { uTime, uXScale, uYScale, uAmplitude, uColor, uOpacity } =
      materialRef.current.uniforms;

    // Update the material opacity
    uOpacity.value = MathUtils.lerp(uOpacity.value, opacity, delta);

    if (uOpacity.value <= 0.01) {
      materialRef.current.visible = false;
      return;
    }
    materialRef.current.visible = true;

    const dynamicDelta =
      delta *
      (trackFeatures.tempo / 10) *
      trackFeatures.energy *
      trackFeatures.danceability *
      (1 - trackFeatures.valence);

    const limit = 0.5;
    const timbre = spotifyAnalyser.getCurrentSegment().timbre;
    const midDifference = Math.abs(midSection?.average - midSection?.energy);

    // Set the variables for simplex
    uTime.value = MathUtils.lerp(
      uTime.value,
      uTime.value + Math.max(timbre?.length ? timbre[0] / 100 : 0.0001, 0.0001),
      dynamicDelta
    );
    uXScale.value = MathUtils.lerp(
      uXScale.value,
      Math.max(
        danceability *
          (getIndexOfMin(spotifyAnalyser.getCurrentSegment()?.pitches) + 1) +
          Math.abs(bassSection?.average - kickSection?.energy) -
          midDifference,
        limit
      ),
      dynamicDelta
    );
    uYScale.value = MathUtils.lerp(
      uYScale.value,
      Math.max(
        energy *
          (getIndexOfMax(spotifyAnalyser.getCurrentSegment()?.pitches) + 1) +
          Math.abs(bassSection?.average - snareSection?.energy) -
          midDifference,
        limit
      ),
      dynamicDelta
    );
    uAmplitude.value = MathUtils.lerp(
      uAmplitude.value,
      Math.max(
        Math.abs(midSection?.average - midSection?.energy) /
          Math.max(highSection?.average * valence, 15),
        0.1
      ),
      dynamicDelta * 10
    );

    // Update the material color
    uColor.value.lerp(colorRef.current.set(getColor()), dynamicDelta);

    // Update the material wireframe
    materialRef.current.wireframe = spotifyAnalyser.beats.counter % 2 === 0;
  });

  return (
    <mesh position={[0, 0.75, 0]} receiveShadow rotation={[-Math.PI / 5, 0, 0]}>
      <planeGeometry args={[vpWidth, vpHeight, 256, 256]} />
      <terrainMaterial depthWrite={false} ref={materialRef} transparent />
    </mesh>
  );
};

export default Mode0;
