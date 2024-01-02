import { useEffect, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";

import { useAnalyser } from "../../../../utils/analyserContext";
import { usePlayer } from "../../../../utils/playerContext";
import Mode5 from "../../modes/mode-5/Mode5";
import { ModeProps } from "../SpotifyModes";
import { useGetColor } from "../useGetColor";

const SpotifyMode5 = ({ opacity }: ModeProps) => {
  const { getColor } = useGetColor({ minLightness: 125, minSaturation: 100 });
  const { audioAnalyser } = useAnalyser();
  const { spotifyAnalyser, trackFeatures } = usePlayer();
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

  function getBeatCount() {
    return realBeatCounter.current;
  }

  function getDirection() {
    return realBeatCounter.current % 2 === 0 ? 1 : -1;
  }

  function getTime() {
    return audioAnalyser.midSection.average * getDirection() * 0.01;
  }

  function getNoise() {
    const segment = spotifyAnalyser.getCurrentSegment();
    const pitchTotal =
      segment?.pitches?.reduce((acc, curr) => {
        acc += curr;
        return acc;
      }, 0) || 12;
    return pitchTotal / 12;
  }

  function getIterations() {
    const segment = spotifyAnalyser.getCurrentSegment();

    const numIteration = segment?.timbre?.length
      ? Math.abs(segment.timbre[11])
      : 1;

    return numIteration / (numIteration > 100 ? 25 : 15);
  }

  function getEnergy() {
    return trackFeatures.energy;
  }

  function getGlow() {
    return 2.0 - trackFeatures.valence;
  }

  function getDeltaFactor() {
    return trackFeatures.danceability * getGlow();
  }

  return (
    <Mode5
      getBeatCount={getBeatCount}
      getColor={getColor}
      getDeltaFactor={getDeltaFactor}
      getEnergy={getEnergy}
      getGlow={getGlow}
      getIterations={getIterations}
      getNoise={getNoise}
      getOpacity={() => opacity}
      getTime={getTime}
    />
  );
};

export default SpotifyMode5;
