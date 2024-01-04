import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";

import { useAnalyser } from "../../utils/analyserContext";
import { usePlayer } from "../../utils/playerContext";
import { mutations } from "../../utils/store";
import { useControls } from "../dom/controls/controlsContext";

import { SpotifyModes } from "./spotify-modes/SpotifyModes";

const SpotifyVisualizer = () => {
  const { audioAnalyser } = useAnalyser();
  const { spotifyAnalyser } = usePlayer();
  const { randomizeMode, randomizeColorMode, changeColorMode, changeMode } =
    useControls();
  const sectionChangeRef = useRef(spotifyAnalyser?.sections?.current?.start);
  const barChangeRef = useRef(spotifyAnalyser?.bars?.current?.start);

  useFrame((_, delta) => {
    if (!audioAnalyser.context || !spotifyAnalyser) return;

    audioAnalyser.updateData();
    spotifyAnalyser.updateData({
      position: mutations.position || 1000,
      delay: delta,
    });

    // change mode on section change
    const sectionStart = spotifyAnalyser.sections?.current?.start;
    if (sectionChangeRef.current !== sectionStart) {
      sectionChangeRef.current = sectionStart;
      if (randomizeMode) {
        changeMode();
      }
    }
    // change color mode on bar change
    const barStart = spotifyAnalyser.bars?.current?.start;
    if (barChangeRef.current !== barStart) {
      barChangeRef.current = barStart;
      if (randomizeColorMode) {
        changeColorMode();
      }
    }
  });

  if (!audioAnalyser.context || !spotifyAnalyser) return null;

  return <SpotifyModes />;
};

export default SpotifyVisualizer;
