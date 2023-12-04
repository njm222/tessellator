import { useAnalyser } from "../../../../utils/analyserContext";
import Mode4 from "../../modes/mode-4/Mode4";
import { ModeProps } from "../LiveModes";
import { useGetColor } from "../useGetColor";

const LiveMode4 = ({ opacity }: ModeProps) => {
  const { getColor } = useGetColor({ minLightness: 125, minSaturation: 100 });
  const { audioAnalyser } = useAnalyser();

  function getTime() {
    return (
      Math.sin(
        audioAnalyser.midSection.average - audioAnalyser.midSection.energy
      ) / 10
    );
  }

  function getFactor() {
    return (
      (audioAnalyser.analyserData.averageFrequency / 255) *
      audioAnalyser.highSection.average
    );
  }

  function getIterations() {
    return Math.floor(
      Math.abs(
        audioAnalyser.snareSection.average - audioAnalyser.snareSection.energy
      ) / 10
    );
  }

  function getHigh() {
    return audioAnalyser.highSection.energy;
  }

  function getEnergy() {
    return audioAnalyser.midSection.energy / 255;
  }

  function getGlow() {
    return (audioAnalyser.kickSection.average / 255) * 2;
  }

  function getDeltaFactor() {
    return 1;
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

export default LiveMode4;
