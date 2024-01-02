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
      Math.max(
        (audioAnalyser.midSection.average / audioAnalyser.midSection.energy +
          audioAnalyser.snareSection.average /
            audioAnalyser.snareSection.energy +
          audioAnalyser.kickSection.average / audioAnalyser.kickSection.energy +
          audioAnalyser.bassSection.average /
            audioAnalyser.bassSection.energy) /
          4,
        0.5
      ) * getDirection()
    );
  }

  function getFactor() {
    return (
      (audioAnalyser.analyserData.averageFrequency / 255) *
      Math.abs(
        audioAnalyser.midSection.average - audioAnalyser.midSection.energy
      )
    );
  }

  function getIterations() {
    return Math.min(
      Math.ceil(
        Math.abs(
          audioAnalyser.snareSection.average - audioAnalyser.snareSection.energy
        ) / audioAnalyser.highSection.average
      ),
      5
    );
  }

  function getHigh() {
    return audioAnalyser.highSection.energy;
  }

  function getEnergy() {
    return (audioAnalyser.analyserData.averageFrequency / 255) * 2;
  }

  function getGlow() {
    return (audioAnalyser.bassSection.average / 255) * 10;
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
