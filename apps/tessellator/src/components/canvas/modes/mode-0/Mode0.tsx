import React, { memo, useRef } from "react";
import { a, SpringValue } from "@react-spring/three";
import { useAspect } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { getIndexOfMax, getIndexOfMin } from "core";
import { Color, MathUtils } from "three";

import { useAnalyser } from "../../../../utils/analyserContext";
import { usePlayer } from "../../../../utils/playerContext";
import TerrainMaterial from "../../shaders/terrain/TerrainMaterial";
import { useGetColour } from "../useGetColour";

const Mode0 = ({ opacity }: { opacity: SpringValue<number> }) => {
  const { audioAnalyser } = useAnalyser();
  const { spotifyAnalyser, trackFeatures } = usePlayer();
  const { getColour } = useGetColour();

  // Get reference of the terrain
  const terrainMaterialRef = useRef(new TerrainMaterial());
  const { viewport } = useThree();
  const [vpWidth, vpHeight] = useAspect(viewport.width, viewport.height, 2);

  useFrame((_, delta) => {
    // Wait for material to load
    if (!terrainMaterialRef.current) {
      return;
    }

    // Wait for spotify data to load
    if (!trackFeatures || !spotifyAnalyser?.tatums?.current || !audioAnalyser) {
      return;
    }

    const { snareSection, bassSection, kickSection, highSection, midSection } =
      audioAnalyser;
    const { energy, danceability, valence } = trackFeatures;

    const { uTime, uXScale, uYScale, uAmplitude, uColour, uOpacity } =
      terrainMaterialRef.current.uniforms;

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

    // Update the material colour
    uColour.value.lerp(new Color(getColour()), dynamicDelta);

    // Update the material opacity
    uOpacity.value = opacity.get();
  });

  return (
    <mesh position={[0, 2, -1]} receiveShadow rotation={[-Math.PI / 5, 0, 0]}>
      <planeGeometry args={[vpWidth, vpHeight, 512, 512]} />
      <terrainMaterial ref={terrainMaterialRef} transparent wireframe />
    </mesh>
  );
};

export default memo(Mode0);
