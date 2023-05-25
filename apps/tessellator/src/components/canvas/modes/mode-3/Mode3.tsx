import { useEffect, useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { getIndexOfMax, getIndexOfMin } from "core";
import { Color, MathUtils, ShaderMaterial } from "three";

import "../../shaders/wave/WaveMaterial";

import { useAnalyser } from "../../../../utils/analyserContext";
import { usePlayer } from "../../../../utils/playerContext";
import { useGetColour } from "../useGetColour";

const Mode3 = ({ visible }: { visible: boolean }) => {
  const { getColour } = useGetColour({ minLightness: 125, minSaturation: 100 });
  const { audioAnalyser } = useAnalyser();
  const { spotifyAnalyser, trackFeatures } = usePlayer();
  const { width, height } = useThree((state) => state.viewport);
  const materialRef = useRef<ShaderMaterial>();
  const realBeatCounter = useRef(0);
  const currentBeatStart = useRef(0);
  const [beatThreshold, setBeatThreshold] = useState(0.5);

  useEffect(() => {
    if (!materialRef.current) return;

    materialRef.current.uniforms.uResolution.value =
      (1 - trackFeatures.speechiness) * (height * trackFeatures.energy);
  }, [trackFeatures.speechiness, trackFeatures.energy, height]);

  useEffect(() => {
    setBeatThreshold(
      trackFeatures.danceability > 0.5
        ? trackFeatures.danceability > 0.75
          ? 0.85
          : 0.8
        : 0.65
    );
  }, [trackFeatures.danceability]);

  useFrame((state, delta) => {
    if (!visible) return;

    if (!materialRef.current) return;

    const { uTime, uColorStart, uStrengthFactor } =
      materialRef.current.uniforms;

    uStrengthFactor.value = MathUtils.lerp(
      uStrengthFactor.value,
      ((spotifyAnalyser.sections.counter % 2 === 0
        ? getIndexOfMax(spotifyAnalyser.getCurrentSegment()?.pitches)
        : getIndexOfMin(spotifyAnalyser.getCurrentSegment()?.pitches)) +
        1) *
        (1 - trackFeatures.danceability) *
        trackFeatures.valence,
      delta * trackFeatures.energy * 10
    );

    const direction = realBeatCounter.current % 2 === 0 ? 1 : -1;

    uTime.value +=
      audioAnalyser.midSection.average *
      (1 - trackFeatures.valence) *
      direction *
      0.0001;

    uColorStart.value = new Color(getColour());

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
    <group visible={visible}>
      <mesh scale={[width, height, 1]}>
        <planeGeometry />
        <waveMaterial ref={materialRef} />
      </mesh>
    </group>
  );
};

export default Mode3;
