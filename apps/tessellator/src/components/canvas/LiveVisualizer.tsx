import React from "react";
import { useFrame } from "@react-three/fiber";

import { useAnalyser } from "../../utils/analyserContext";

import { LiveModes } from "./live-modes/LiveModes";

const LiveVisualizer = () => {
  const { audioAnalyser } = useAnalyser();

  useFrame((_, delta) => {
    if (!audioAnalyser.context) return;

    audioAnalyser.updateData();
  });

  return <LiveModes />;
};

export default LiveVisualizer;
