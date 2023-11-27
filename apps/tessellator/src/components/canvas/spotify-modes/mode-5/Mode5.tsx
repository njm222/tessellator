import { useEffect, useRef, useState } from "react";
import { useAspect } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { Color, MathUtils } from "three";

import { useAnalyser } from "../../../../utils/analyserContext";
import { usePlayer } from "../../../../utils/playerContext";
import { FractalMaterial2 } from "../../shaders/fractal2/FractalMaterial2";
import { ModeProps } from "../SpotifyModes";
import { useGetColor } from "../useGetColor";

const Mode5 = ({ opacity }: ModeProps) => {
  const { getColor } = useGetColor({ minLightness: 125, minSaturation: 100 });
  const { audioAnalyser } = useAnalyser();
  const { spotifyAnalyser, trackFeatures } = usePlayer();
  const { width, height } = useThree((state) => state.viewport);
  const [vpWidth, vpHeight] = useAspect(width, height, 2);
  const materialRef = useRef(new FractalMaterial2());
  const colorRef = useRef(new Color());
  const realBeatCounter = useRef(0);
  const currentBeatStart = useRef(0);
  const [beatThreshold, setBeatThreshold] = useState(0.7);

  useEffect(() => {
    realBeatCounter.current = 0;
    setBeatThreshold(
      trackFeatures.danceability > 0.5
        ? trackFeatures.danceability > 0.75
          ? 0.8
          : 0.65
        : 0.5
    );
  }, [trackFeatures.danceability]);

  useEffect(() => {
    materialRef.current.uniforms.uEnergy.value = trackFeatures.energy;
  }, [trackFeatures.energy]);

  useEffect(() => {
    materialRef.current.uniforms.uValence.value = 2.0 - trackFeatures.valence;
  }, [trackFeatures.valence]);

  useFrame((state, delta) => {
    if (!materialRef.current) return;

    const {
      uTime,
      uOpacity,
      uIterations,
      uNoise,
      uColor,
      uValence,
      uBeatCount,
    } = materialRef.current.uniforms;

    // Update the material opacity
    uOpacity.value = MathUtils.lerp(uOpacity.value, opacity, delta);
    if (uOpacity.value <= 0.01) {
      materialRef.current.visible = false;
      return;
    }
    materialRef.current.visible = true;

    const dynamicDelta = delta * trackFeatures.danceability * uValence.value;

    // Update the material color
    uColor.value.lerp(colorRef.current.set(getColor()), dynamicDelta);

    uBeatCount.value = MathUtils.lerp(
      uBeatCount.value,
      realBeatCounter.current,
      dynamicDelta
    );

    const direction = realBeatCounter.current % 2 === 0 ? 1 : -1;

    uTime.value = MathUtils.lerp(
      uTime.value,
      uTime.value +
        (trackFeatures.danceability > 0.5
          ? audioAnalyser.snareSection.average
          : audioAnalyser.midSection.average) *
          direction,
      dynamicDelta
    );

    const segment = spotifyAnalyser.getCurrentSegment();

    const pitchTotal =
      segment?.pitches?.reduce((acc, curr) => {
        acc += curr;
        return acc;
      }, 0) || 12;

    uNoise.value = MathUtils.lerp(uNoise.value, pitchTotal / 12, dynamicDelta);

    const numIteration = segment?.timbre?.length
      ? Math.abs(segment.timbre[11])
      : 1;

    uIterations.value =
      Math.floor(
        MathUtils.lerp(
          uIterations.value,
          numIteration / (numIteration > 100 ? 20 : 10),
          dynamicDelta
        )
      ) + 1;

    if (spotifyAnalyser.beats.current.start === currentBeatStart.current) {
      return;
    }

    if (spotifyAnalyser.beats.current.confidence > beatThreshold) {
      realBeatCounter.current++;
      if (spotifyAnalyser.beats.counter === 0) {
        realBeatCounter.current = 0;
      }
      currentBeatStart.current = spotifyAnalyser.beats.current.start;
    }
  });

  return (
    <mesh position={[0, 0, -3]} scale={[vpWidth, vpHeight, 1]}>
      <planeGeometry />
      <fractalMaterial2 depthWrite={false} ref={materialRef} transparent />
    </mesh>
  );
};

export default Mode5;
