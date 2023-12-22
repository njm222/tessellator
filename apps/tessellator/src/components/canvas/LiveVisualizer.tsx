import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";

import { useAnalyser } from "../../utils/analyserContext";
import { useControls } from "../dom/controls/controlsContext";

import { LiveModes } from "./live-modes/LiveModes";

const LiveVisualizer = () => {
  const { audioAnalyser } = useAnalyser();
  const { randomizeMode, randomizeColorMode, changeColorMode, changeMode } =
    useControls();

  const modeChangeRef = useRef<NodeJS.Timeout | null>(null);
  const colorModeChangeRef = useRef<NodeJS.Timeout | null>(null);

  useFrame((_, delta) => {
    if (!audioAnalyser.context) return;

    audioAnalyser.updateData();

    // change mode on deviation
    if (
      audioAnalyser.bassSection.energy - audioAnalyser.bassSection.average >
      audioAnalyser.bassSection.deviation * 3
    ) {
      if (randomizeMode) {
        if (modeChangeRef.current) {
          clearTimeout(modeChangeRef.current);
        }
        modeChangeRef.current = setTimeout(() => changeMode(), 100);
      }
    }
    // change color mode on deviation
    if (
      audioAnalyser.midSection.energy - audioAnalyser.midSection.average >
      audioAnalyser.midSection.deviation * 3
    ) {
      if (randomizeColorMode) {
        if (colorModeChangeRef.current) {
          clearTimeout(colorModeChangeRef.current);
        }
        colorModeChangeRef.current = setTimeout(() => changeColorMode(), 100);
      }
    }
  });

  return <LiveModes />;
};

export default LiveVisualizer;
