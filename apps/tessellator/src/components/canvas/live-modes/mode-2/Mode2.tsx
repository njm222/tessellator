import { useAnalyser } from "../../../../utils/analyserContext";
import { usePlayer } from "../../../../utils/playerContext";
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
      ? 1
      : -1;
  }

  function getXRotation() {
    return (
      (audioAnalyser.midSection.average / 10000) *
      (audioAnalyser.snareSection.energy > audioAnalyser.snareSection.average
        ? 1
        : -1)
    );
  }

  function getYRotation() {
    return (
      (audioAnalyser.midSection.average / 10000) *
      (audioAnalyser.snareSection.energy > audioAnalyser.snareSection.average
        ? 1
        : -1)
    );
  }

  function getDeltaFactor() {
    return 1;
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
