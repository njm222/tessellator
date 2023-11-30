import { useEffect, useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";

import { useAnalyser } from "../../../../utils/analyserContext";
import { usePlayer } from "../../../../utils/playerContext";
import Mode3 from "../../modes/mode-3/Mode3";
import { ModeProps } from "../SpotifyModes";
import { useGetColor } from "../useGetColor";

const SpotifyMode3 = ({ opacity }: ModeProps) => {
  const { getColor } = useGetColor({ minLightness: 125, minSaturation: 100 });
  const { audioAnalyser } = useAnalyser();
  const { spotifyAnalyser, trackFeatures } = usePlayer();
  const { width } = useThree((state) => state.viewport);
  const realBarCounter = useRef(0);
  const currentBarStart = useRef(0);
  const [barThreshold, setBarThreshold] = useState(0.7);

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

  function getFactor() {
    return (
      trackFeatures.energy *
      trackFeatures.danceability *
      (1 - trackFeatures.valence) *
      0.1
    );
  }

  function getDirection() {
    return realBarCounter.current % 2 === 0 ? 1 : -1;
  }

  function getTime() {
    return (
      Math.abs(
        audioAnalyser.bassSection.average - audioAnalyser.snareSection.average
      ) *
      getFactor() *
      getDirection()
    );
  }

  function getNoise() {
    return (
      (spotifyAnalyser.getCurrentSegment()?.pitches?.reduce((acc, curr) => {
        acc += curr;
        return acc;
      }, 0) || 12) / 12
    );
  }

  function getStrengthFactor() {
    const timbre = spotifyAnalyser.getCurrentSegment().timbre;

    return (
      (audioAnalyser.analyserData.rms +
        Math.abs(
          audioAnalyser.midSection.average - audioAnalyser.midSection.energy
        )) *
      Math.abs(timbre?.length ? timbre[0] : 1) *
      getFactor()
    );
  }

  function getResolution() {
    return (1 - trackFeatures.speechiness) * (width * trackFeatures.energy);
  }

  function getDeltaFactor() {
    return (trackFeatures.tempo / 2) * getFactor();
  }

  return (
    <Mode3
      getColor={getColor}
      getDeltaFactor={getDeltaFactor}
      getNoise={getNoise}
      getOpacity={() => opacity}
      getResolution={getResolution}
      getStrengthFactor={getStrengthFactor}
      getTime={getTime}
    />
  );
};

export default SpotifyMode3;
