import React from "react";
import { useFrame } from "@react-three/fiber";

import { useAnalyser } from "../../utils/analyserContext";
import { useControls } from "../dom/controls/controlsContext";

import { Modes } from "./modes/Modes";

const LiveVisualizer = () => {
  const { audioAnalyser } = useAnalyser();
  // const { randomizeMode, randomizeColorMode, changeColorMode, changeMode } =
  //   useControls();

  useFrame((_, delta) => {
    if (!audioAnalyser.context) return;

    audioAnalyser.updateData();

    // // change mode on section change
    // const sectionStart = spotifyAnalyser.sections?.current?.start;
    // if (sectionChangeRef.current !== sectionStart) {
    //   sectionChangeRef.current = sectionStart;
    //   if (randomizeMode) {
    //     changeMode();
    //   }
    // }
    // // change color mode on bar change
    // const barStart = spotifyAnalyser.bars?.current?.start;
    // if (barChangeRef.current !== barStart) {
    //   barChangeRef.current = barStart;
    //   if (randomizeColorMode) {
    //     changeColorMode();
    //   }
    // }
  });

  if (!audioAnalyser.context) return null;

  return <Modes />;
};

export default LiveVisualizer;
