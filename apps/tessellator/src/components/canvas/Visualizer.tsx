import React, { memo, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { generateRandomInteger } from "core";

import { useAnalyser } from "../../utils/analyserContext";
import { usePlayer } from "../../utils/playerContext";
import { mutations } from "../../utils/store";
import {
  numColourModes,
  numModes,
  useControls,
} from "../dom/controls/controlsContext";

import Mode0 from "./modes/mode-0/Mode0";
import Mode1 from "./modes/mode-1/Mode1";

function Lights() {
  return (
    <>
      <color args={["#000000"]} attach="background" />
      <ambientLight intensity={0.5} />
      <pointLight intensity={0.5} position={[20, 30, 10]} />
      <pointLight intensity={0.5} position={[-10, -10, -10]} />
    </>
  );
}

const Visualizer = () => {
  const { audioAnalyser } = useAnalyser();
  const { spotifyAnalyser } = usePlayer();
  const { modeKey, setModeKey, setColourKey } = useControls();
  const sectionChangeRef = useRef(spotifyAnalyser?.sections?.current?.start);

  useFrame(() => {
    if (!audioAnalyser.context || !spotifyAnalyser) return;

    audioAnalyser.updateData();
    spotifyAnalyser.updateData({ position: mutations.position || 1000 });

    // change mode on section change
    const sectionStart = spotifyAnalyser.sections?.current?.start;
    if (sectionChangeRef.current !== sectionStart) {
      sectionChangeRef.current = sectionStart;
      setModeKey(generateRandomInteger(0, numModes - 1));
      setColourKey(generateRandomInteger(0, numColourModes - 1));
    }
  });

  const Mode = useMemo(() => {
    switch (modeKey) {
      case 0:
        return <Mode0 />;
      case 1:
        return <Mode1 />;
      default:
        return null;
    }
  }, [modeKey]);

  return (
    <>
      <Lights />
      {Mode}
    </>
  );
};

export default memo(Visualizer);
