import { useAnalyser } from "../../../../utils/analyserContext";
import Mode5 from "../../modes/mode-5/Mode5";
import { ModeProps } from "../LiveModes";
import { useGetColor } from "../useGetColor";

const LiveMode5 = ({ opacity }: ModeProps) => {
  const { getColor } = useGetColor({ minLightness: 125, minSaturation: 100 });
  const { audioAnalyser } = useAnalyser();

  function getBeatCount() {
    return (
      Math.sin(
        (audioAnalyser.highSection.average - audioAnalyser.highSection.energy) /
          audioAnalyser.analyserData.averageFrequency
      ) * 4
    );
  }

  function getTime() {
    return (
      Math.sin(
        audioAnalyser.midSection.average - audioAnalyser.midSection.energy
      ) * 5
    );
  }

  function getNoise() {
    return (
      (audioAnalyser.analyserData.averageFrequency / 255) *
      audioAnalyser.highSection.average
    );
  }

  function getIterations() {
    return Math.ceil(
      Math.abs(
        audioAnalyser.snareSection.average - audioAnalyser.snareSection.energy
      ) / 5
    );
  }

  function getEnergy() {
    return audioAnalyser.midSection.average / 255;
  }

  function getGlow() {
    return audioAnalyser.kickSection.average / 255;
  }

  function getDeltaFactor() {
    return 1;
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
