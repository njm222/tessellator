import { useEffect, useRef, useState } from "react";
import { useAspect } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { Color, MathUtils } from "three";

import { useAnalyser } from "../../../../utils/analyserContext";
import { usePlayer } from "../../../../utils/playerContext";
import { WaveMaterial } from "../../shaders/wave/WaveMaterial";
import { ModeProps } from "../Modes";
import { useGetColor } from "../useGetColor";

const Mode3 = ({ opacity, ...props }: ModeProps) => {
  const { getColor } = useGetColor({ minLightness: 125, minSaturation: 100 });
  const { audioAnalyser } = useAnalyser();
  const { spotifyAnalyser, trackFeatures } = usePlayer();
  const { width, height } = useThree((state) => state.viewport);
  const [vpWidth, vpHeight] = useAspect(width, height, 2);
  const materialRef = useRef(new WaveMaterial());
  const colorRef = useRef(new Color());
  const realBarCounter = useRef(0);
  const currentBarStart = useRef(0);
  const [barThreshold, setBarThreshold] = useState(0.7);

  useEffect(() => {
    if (!materialRef.current) return;

    materialRef.current.uniforms.uResolution.value =
      (1 - trackFeatures.speechiness) * (width * trackFeatures.energy);
  }, [trackFeatures.speechiness, trackFeatures.energy, width]);

  useEffect(() => {
    setBarThreshold(
      trackFeatures.danceability > 0.5
        ? trackFeatures.danceability > 0.75
          ? 0.95
          : 0.8
        : 0.65
    );
  }, [trackFeatures.danceability]);

  useFrame((state, delta) => {
    if (!materialRef.current) return;

    const factor =
      trackFeatures.energy *
      trackFeatures.danceability *
      (1 - trackFeatures.valence) *
      0.1;

    const dynamicDelta = delta * (trackFeatures.tempo / 2) * factor;

    const { uTime, uColorStart, uStrengthFactor, uOpacity, uNoise } =
      materialRef.current.uniforms;

    // Update material opacity
    uOpacity.value = opacity.get();

    const timbre = spotifyAnalyser.getCurrentSegment().timbre;

    uStrengthFactor.value = MathUtils.lerp(
      uStrengthFactor.value,
      (audioAnalyser.analyserData.rms +
        Math.abs(
          audioAnalyser.midSection.average - audioAnalyser.midSection.energy
        )) *
        Math.abs(timbre?.length ? timbre[0] : 1) *
        factor *
        trackFeatures.speechiness,
      dynamicDelta
    );

    const direction = realBarCounter.current % 2 === 0 ? 1 : -1;

    uTime.value = MathUtils.lerp(
      uTime.value,
      uTime.value +
        Math.abs(
          audioAnalyser.bassSection.average - audioAnalyser.snareSection.average
        ) *
          factor *
          direction,
      dynamicDelta
    );

    const pitchTotal =
      (spotifyAnalyser.getCurrentSegment()?.pitches?.reduce((acc, curr) => {
        acc += curr;
        return acc;
      }, 0) || 12) / 12;

    uNoise.value = MathUtils.lerp(uNoise.value, pitchTotal / 12, dynamicDelta);

    // Update the material color
    uColorStart.value.lerp(colorRef.current.set(getColor()), dynamicDelta);

    if (spotifyAnalyser.bars.current.start === currentBarStart.current) {
      return;
    }

    if (spotifyAnalyser.bars.current.confidence > barThreshold) {
      realBarCounter.current++;
      if (spotifyAnalyser.bars.counter === 0) {
        realBarCounter.current = 0;
      }
      currentBarStart.current = spotifyAnalyser.bars.current.start;
    }
  });

  return (
    <group {...props}>
      <mesh scale={[vpWidth, vpHeight, 1]}>
        <planeGeometry />
        <waveMaterial depthWrite={false} ref={materialRef} transparent />
      </mesh>
    </group>
  );
};

export default Mode3;
