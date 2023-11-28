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
      Math.abs(
        audioAnalyser.midSection?.average - audioAnalyser.midSection?.energy
      ) / 10
    );
  }

  function getXScale() {
    return (
      Math.abs(
        audioAnalyser.snareSection?.average - audioAnalyser.snareSection?.energy
      ) / 10
    );
  }

  function getYScale() {
    return (
      Math.abs(
        audioAnalyser.bassSection?.average - audioAnalyser.bassSection?.energy
      ) / 10
    );
  }

  function getAmplitude() {
    return (
      Math.abs(
        audioAnalyser.snareSection?.average - audioAnalyser.snareSection?.energy
      ) * 5
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
