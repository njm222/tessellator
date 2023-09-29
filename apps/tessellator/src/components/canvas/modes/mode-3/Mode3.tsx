import { useEffect, useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Color, MathUtils } from "three";

import { useAnalyser } from "../../../../utils/analyserContext";
import { usePlayer } from "../../../../utils/playerContext";
import { WaveMaterial } from "../../shaders/wave/WaveMaterial";
import { ModeProps } from "../Modes";
import { useGetColour } from "../useGetColour";

const Mode3 = ({ opacity, ...props }: ModeProps) => {
  const { getColour } = useGetColour({ minLightness: 125, minSaturation: 100 });
  const { audioAnalyser } = useAnalyser();
  const { spotifyAnalyser, trackFeatures } = usePlayer();
  const { width, height } = useThree((state) => state.viewport);
  const materialRef = useRef(new WaveMaterial());
  const realBarCounter = useRef(0);
  const currentBarStart = useRef(0);
  const [barThreshold, setBarThreshold] = useState(0.7);

  useEffect(() => {
    if (!materialRef.current) return;

    materialRef.current.uniforms.uResolution.value =
      (1 - trackFeatures.speechiness) * (height * trackFeatures.energy);
  }, [trackFeatures.speechiness, trackFeatures.energy, height]);

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

    const dynamicDelta = delta * trackFeatures.tempo * factor;

    const { uTime, uColorStart, uStrengthFactor, uOpacity } =
      materialRef.current.uniforms;

    const timbre = spotifyAnalyser.getCurrentSegment().timbre;

    uStrengthFactor.value = MathUtils.lerp(
      uStrengthFactor.value,
      (audioAnalyser.analyserData.rms +
        Math.abs(
          audioAnalyser.snareSection.average - audioAnalyser.snareSection.energy
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
          audioAnalyser.bassSection.average - audioAnalyser.midSection.average
        ) *
          factor *
          direction,
      dynamicDelta
    );

    uColorStart.value.lerp(new Color(getColour()), dynamicDelta);
    // Update the material opacity
    uOpacity.value = opacity.get();

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
      <mesh scale={[width, height, 1]}>
        <planeGeometry />
        <waveMaterial ref={materialRef} transparent />
      </mesh>
    </group>
  );
};

export default Mode3;
