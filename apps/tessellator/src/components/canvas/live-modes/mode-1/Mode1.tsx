import { useAnalyser } from "../../../../utils/analyserContext";
import Mode1 from "../../modes/mode-1/Mode1";
import { ModeProps } from "../LiveModes";
import { useGetColor } from "../useGetColor";

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
      ) * 5
    );
  }

  function getNoise() {
    return (
      (audioAnalyser.analyserData.averageFrequency / 255) *
      (audioAnalyser.analyserData.peak / 50)
    );
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
    return (
      Math.abs(
        audioAnalyser.snareSection.average - audioAnalyser.snareSection.energy
      ) / Math.max(audioAnalyser.highSection.average, 1)
    );
  }

  function getQ() {
    return (
      Math.abs(
        audioAnalyser.kickSection.average - audioAnalyser.kickSection.energy
      ) / Math.max(audioAnalyser.highSection.energy, 1)
    );
  }

  return (
    <Mode1
      getColor={getColor}
      getDeltaFactor={getDeltaFactor}
      getNoise={getNoise}
      getOpacity={() => opacity}
      getP={getP}
      getQ={getQ}
      getRadialSegments={getRadialSegments}
      getRadius={getRadius}
      getSize={getSize}
      getTube={getTube}
      getTubularSegments={getTubularSegments}
    />
  );
};

export default LiveMode1;
