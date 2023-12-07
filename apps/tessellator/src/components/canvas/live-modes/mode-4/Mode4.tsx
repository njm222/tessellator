import { useAnalyser } from "../../../../utils/analyserContext";
import Mode4 from "../../modes/mode-4/Mode4";
import { ModeProps } from "../LiveModes";
import { useGetColor } from "../useGetColor";

const LiveMode4 = ({ opacity }: ModeProps) => {
  const { getColor } = useGetColor({ minLightness: 125, minSaturation: 100 });
  const { audioAnalyser } = useAnalyser();

  function getDirection() {
    return audioAnalyser.snareSection.energy >=
      audioAnalyser.snareSection.average
      ? -1
      : 1;
  }

  function getTime() {
    return (
      (audioAnalyser.midSection.average / audioAnalyser.midSection.energy) *
      getDirection()
    );
  }

  function getFactor() {
    return Math.max(
      (audioAnalyser.analyserData.averageFrequency / 255) *
        (audioAnalyser.highSection.energy / 2),
      1
    );
  }

  function getIterations() {
    return Math.ceil(
      Math.abs(
        audioAnalyser.snareSection.average - audioAnalyser.snareSection.energy
      ) / 10
    );
  }

  function getHigh() {
    return audioAnalyser.highSection.energy;
  }

  function getEnergy() {
    return Math.min((audioAnalyser.analyserData.averageFrequency / 255) * 2, 1);
  }

  function getGlow() {
    return (audioAnalyser.bassSection.average / 255) * 5;
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
