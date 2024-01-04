import React from "react";

import { useAnalyser } from "../../../../utils/analyserContext";
import Mode0 from "../../modes/mode-0/Mode0";
import { ModeProps } from "../LiveModes";
import { useGetColor } from "../useGetColor";

const LiveMode0 = ({ opacity }: ModeProps) => {
  const { audioAnalyser } = useAnalyser();
  const { getColor } = useGetColor();

  function getTime() {
    return (
      (audioAnalyser.midSection?.average - audioAnalyser.midSection?.energy) /
      10
    );
  }

  function getXScale() {
    return Math.abs(
      (audioAnalyser.snareSection?.average -
        audioAnalyser.snareSection?.energy) /
        (audioAnalyser.bassSection?.average - audioAnalyser.bassSection?.energy)
    );
  }

  function getYScale() {
    return Math.abs(
      (audioAnalyser.kickSection?.average - audioAnalyser.kickSection?.energy) /
        (audioAnalyser.bassSection?.average - audioAnalyser.bassSection?.energy)
    );
  }

  function getAmplitude() {
    return (
      Math.abs(
        audioAnalyser.midSection?.average - audioAnalyser.midSection?.energy
      ) / Math.max(audioAnalyser.highSection?.average, 15)
    );
  }

  function getDeltaFactor() {
    return (audioAnalyser.analyserData.averageFrequency / 255) * 3;
  }

  function getWireframe() {
    return (
      audioAnalyser.snareSection.energy - audioAnalyser.snareSection.average <=
      audioAnalyser.snareSection.deviation * 3
    );
  }

  return (
    <Mode0
      getAmplitude={getAmplitude}
      getColor={getColor}
      getDeltaFactor={getDeltaFactor}
      getOpacity={() => opacity}
      getTime={getTime}
      getWireframe={getWireframe}
      getXScale={getXScale}
      getYScale={getYScale}
    />
  );
};

export default LiveMode0;
