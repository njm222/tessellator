import { useAnalyser } from "../../../../utils/analyserContext";
import Mode2 from "../../modes/mode-2/Mode2";
import { ModeProps } from "../LiveModes";
import { useGetColor } from "../useGetColor";

const LiveMode2 = ({ opacity }: ModeProps) => {
  const { getColor } = useGetColor();
  const { audioAnalyser } = useAnalyser();

  function getScale() {
    return Math.abs(
      (audioAnalyser.bassSection.average - audioAnalyser.snareSection.average) /
        5
    );
  }

  function getZValue() {
    return audioAnalyser.snareSection.energy >
      audioAnalyser.snareSection.average
      ? -2
      : 2;
  }

  function getXRotation() {
    return (
      (audioAnalyser.midSection.average / 10000) *
      (audioAnalyser.kickSection.energy - audioAnalyser.kickSection.average >
      audioAnalyser.kickSection.deviation * 2
        ? 1
        : -1)
    );
  }

  function getYRotation() {
    return (
      (audioAnalyser.midSection.average / 10000) *
      (audioAnalyser.snareSection.energy - audioAnalyser.snareSection.average >
      audioAnalyser.snareSection.deviation * 2
        ? 1
        : -1)
    );
  }

  function getDeltaFactor() {
    return (audioAnalyser.analyserData.averageFrequency / 255) * 3;
  }

  function getWireframe() {
    return (
      audioAnalyser.snareSection.energy > audioAnalyser.snareSection.average
    );
  }

  return (
    <Mode2
      getColor={getColor}
      getDeltaFactor={getDeltaFactor}
      getOpacity={() => opacity}
      getScale={getScale}
      getWireframe={getWireframe}
      getXRotation={getXRotation}
      getYRotation={getYRotation}
      getZValue={getZValue}
    />
  );
};

export default LiveMode2;
