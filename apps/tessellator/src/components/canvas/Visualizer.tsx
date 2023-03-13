import React, { memo, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { mutations } from "../../utils/store";
import Mode0 from "./modes/Mode0";
import Mode1 from "./modes/Mode1";
import { useAnalyser } from "../../utils/analyserContext";
import { usePlayer } from "../../utils/playerContext";
import {
  numModes,
  numColourModes,
  useControls,
} from "../dom/controls/controlsContext";

function Lights() {
  return (
    <>
      <color attach="background" args={["#000000"]} />
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
      setModeKey(Math.floor(Math.random() * numModes));
      setColourKey(Math.floor(Math.random() * numColourModes));
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
