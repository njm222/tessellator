import React from "react";

import { useAnalyser } from "../../../../utils/analyserContext";
import { ModeProps } from "../LiveModes";
import { useGetColor } from "../useGetColor";
import Mode0 from "../../modes/mode-0/Mode0";

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
      getOpacity={() => opacity}
      getColor={getColor}
      getTime={getTime}
      getXScale={getXScale}
      getYScale={getYScale}
      getAmplitude={getAmplitude}
      getDeltaFactor={getDeltaFactor}
      getWireframe={getWireframe}
    />
  );
};

export default LiveMode0;
