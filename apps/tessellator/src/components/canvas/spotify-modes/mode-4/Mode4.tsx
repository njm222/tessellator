import { useEffect, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";

import { useAnalyser } from "../../../../utils/analyserContext";
import { usePlayer } from "../../../../utils/playerContext";
import Mode4 from "../../modes/mode-4/Mode4";
import { ModeProps } from "../SpotifyModes";
import { useGetColor } from "../useGetColor";

const SpotifyMode4 = ({ opacity }: ModeProps) => {
  const { getColor } = useGetColor({ minLightness: 125, minSaturation: 100 });
  const { audioAnalyser } = useAnalyser();
  const { spotifyAnalyser, trackFeatures } = usePlayer();
  const realBeatCounter = useRef(0);
  const currentBeatStart = useRef(0);
  const [beatThreshold, setBeatThreshold] = useState(0.7);

  useEffect(() => {
    setBeatThreshold(
      trackFeatures.danceability > 0.5
        ? trackFeatures.danceability > 0.75
          ? 0.8
          : 0.65
        : 0.5
    );
  }, [trackFeatures.danceability]);

  useFrame((state, delta) => {
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

  function getDirection() {
    return realBeatCounter.current % 2 === 0 ? 1 : -1;
  }

  function getTime() {
    return (
      (trackFeatures.danceability > 0.5
        ? audioAnalyser.snareSection.average
        : audioAnalyser.midSection.average) *
      trackFeatures.energy *
      trackFeatures.danceability *
      0.01 *
      getDirection()
    );
  }

  function getFactor() {
    const segment = spotifyAnalyser.getCurrentSegment();
    const pitchTotal =
      segment?.pitches?.reduce((acc, curr) => {
        acc += curr;
        return acc;
      }, 0) || 12;
    return 1 + pitchTotal / 13;
  }

  function getIterations() {
    const segment = spotifyAnalyser.getCurrentSegment();

    const numIteration = segment?.timbre?.length
      ? Math.abs(segment.timbre[11])
      : 1;

    return numIteration / (numIteration > 100 ? 20 : 10);
  }

  function getHigh() {
    return audioAnalyser.highSection.energy;
  }

  function getEnergy() {
    return trackFeatures.energy;
  }

  function getGlow() {
    return 1.5 - trackFeatures.valence;
  }

  function getDeltaFactor() {
    return 2 * trackFeatures.danceability;
  }

  return (
    <Mode4
      getColor={getColor}
      getDeltaFactor={getDeltaFactor}
      getEnergy={getEnergy}
      getFactor={getFactor}
      getGlow={getGlow}
      getHigh={getHigh}
      getIterations={getIterations}
      getOpacity={() => opacity}
      getTime={getTime}
    />
  );
};

export default SpotifyMode4;
