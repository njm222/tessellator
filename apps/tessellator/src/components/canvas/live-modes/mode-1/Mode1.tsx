import { useAnalyser } from "../../../../utils/analyserContext";
import { ModeProps } from "../LiveModes";
import { useGetColor } from "../useGetColor";
import Mode1 from "../../modes/mode-1/Mode1";

const LiveMode1 = ({ opacity }: ModeProps) => {
  const { audioAnalyser } = useAnalyser();
  const { getColor } = useGetColor({ minSaturation: 75, minLightness: 150 });

  function getDeltaFactor() {
    return 1;
  }

  function getSize() {
    return (
      Math.abs(
        audioAnalyser.snareSection.average - audioAnalyser.snareSection.energy
      ) * 10
    );
  }

  function getNoise() {
    return (audioAnalyser.analyserData.averageFrequency / 255) * 2;
  }

  function getRadius() {
    return (
      Math.abs(
        audioAnalyser.bassSection.average - audioAnalyser.snareSection.energy
      ) / 5
    );
  }

  function getTube() {
    return (
      10 +
      Math.abs(
        audioAnalyser.bassSection.average - audioAnalyser.kickSection.energy
      ) /
        2
    );
  }

  function getTubularSegments() {
    return audioAnalyser.midSection.average;
  }

  function getRadialSegments() {
    return audioAnalyser.analyserData.averageFrequency;
  }

  function getP() {
    return Math.abs(
      audioAnalyser.snareSection.average - audioAnalyser.snareSection.energy
    );
  }

  function getQ() {
    return audioAnalyser.analyserData.averageFrequency / 5;
  }

  return (
    <Mode1
      getOpacity={() => opacity}
      getColor={getColor}
      getSize={getSize}
      getNoise={getNoise}
      getRadius={getRadius}
      getTube={getTube}
      getDeltaFactor={getDeltaFactor}
      getTubularSegments={getTubularSegments}
      getRadialSegments={getRadialSegments}
      getP={getP}
      getQ={getQ}
    />
  );
};

export default LiveMode1;
