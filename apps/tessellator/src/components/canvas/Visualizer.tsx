import React, { memo, useRef } from "react";
import { useFrame } from "@react-three/fiber";

import { useAnalyser } from "../../utils/analyserContext";
import { usePlayer } from "../../utils/playerContext";
import { mutations } from "../../utils/store";
import { useControls } from "../dom/controls/controlsContext";

import Mode0 from "./modes/mode-0/Mode0";
import Mode1 from "./modes/mode-1/Mode1";
import Mode2 from "./modes/mode-2/Mode2";

const Visualizer = () => {
  const { audioAnalyser } = useAnalyser();
  const { spotifyAnalyser } = usePlayer();
  const {
    modeKey,
    randomizeMode,
    randomizeColourMode,
    changeColourMode,
    changeMode,
  } = useControls();
  const sectionChangeRef = useRef(spotifyAnalyser?.sections?.current?.start);

  useFrame(() => {
    if (!audioAnalyser.context || !spotifyAnalyser) return;

    audioAnalyser.updateData();
    spotifyAnalyser.updateData({ position: mutations.position || 1000 });

    // change mode on section change
    const sectionStart = spotifyAnalyser.sections?.current?.start;
    if (sectionChangeRef.current !== sectionStart) {
      sectionChangeRef.current = sectionStart;
      if (randomizeMode) {
        changeMode();
      }
      if (randomizeColourMode) {
        changeColourMode();
      }
    }
  });

  if (!audioAnalyser.context || !spotifyAnalyser) return null;

  return (
    <>
      <Mode0 visible={modeKey === 0} />
      <Mode1 visible={modeKey === 1} />
      <Mode2 visible={modeKey === 2} />
    </>
  );
};

export default memo(Visualizer);
