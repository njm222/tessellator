import { useRef } from "react";

import { useAnalyser } from "../../../../utils/analyserContext";
import Mode5 from "../../modes/mode-5/Mode5";
import { ModeProps } from "../LiveModes";
import { useGetColor } from "../useGetColor";

const LiveMode5 = ({ opacity }: ModeProps) => {
  const { getColor } = useGetColor({ minLightness: 125, minSaturation: 100 });
  const { audioAnalyser } = useAnalyser();
  const beatCount = useRef(0);
  const beatCountChangeTimeout = useRef<NodeJS.Timeout | null>(null);

  function getBeatCount() {
    if (
      audioAnalyser.snareSection.energy - audioAnalyser.snareSection.average >
      audioAnalyser.snareSection.deviation * 3.5
    ) {
      if (beatCountChangeTimeout.current) {
        clearTimeout(beatCountChangeTimeout.current);
      }
      beatCountChangeTimeout.current = setTimeout(
        () => beatCount.current++,
        100
      );
    }
    if (beatCount.current > 1024) {
      beatCount.current = 0;
    }
    return beatCount.current;
  }

  function getDirection() {
    return audioAnalyser.snareSection.energy -
      audioAnalyser.snareSection.average >
      audioAnalyser.snareSection.deviation * 3.5
      ? -1
      : 1;
  }

  function getTime() {
    return audioAnalyser.midSection.average * getDirection() * 0.01;
  }

  function getNoise() {
    return (audioAnalyser.analyserData.averageFrequency / 255) * 2;
  }

  function getIterations() {
    return Math.min(
      Math.ceil(
        Math.abs(
          audioAnalyser.snareSection.average - audioAnalyser.snareSection.energy
        ) / audioAnalyser.highSection.energy
      ),
      5
    );
  }

  function getEnergy() {
    return audioAnalyser.midSection.average / 255;
  }

  function getGlow() {
    return (audioAnalyser.kickSection.average / 255) * 2;
  }

  function getDeltaFactor() {
    return Math.max(getEnergy(), getGlow());
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

export default LiveMode5;
