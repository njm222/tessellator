import React, { memo, Suspense, useEffect, useRef } from "react";
import {
  a,
  SpringValue,
  useSpringRef,
  useTransition,
} from "@react-spring/three";
import { useFrame } from "@react-three/fiber";

import { useAnalyser } from "../../utils/analyserContext";
import { usePlayer } from "../../utils/playerContext";
import { mutations } from "../../utils/store";
import { useControls } from "../dom/controls/controlsContext";

import Mode0 from "./modes/mode-0/Mode0";
import Mode1 from "./modes/mode-1/Mode1";
import Mode2 from "./modes/mode-2/Mode2";
import Mode3 from "./modes/mode-3/Mode3";

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
  const barChangeRef = useRef(spotifyAnalyser?.bars?.current?.start);

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
    }
    // change colour mode on bar change
    const barStart = spotifyAnalyser.bars?.current?.start;
    if (barChangeRef.current !== barStart) {
      barChangeRef.current = barStart;
      if (randomizeColourMode) {
        changeColourMode();
      }
    }
  });

  const transRef = useSpringRef();

  const transitions = useTransition(modeKey, {
    ref: transRef,
    keys: null,
    from: { opacity: 0, position: [0, 0, -2], scale: 2 },
    enter: { opacity: 1, position: [0, 0, 0], scale: 1 },
    leave: { opacity: 0, position: [0, 0, 2], scale: 2 },
    config: {
      precision: 0.0001,
      clamp: true,
      tension: 180,
      friction: 12,
    },
  });

  useEffect(() => {
    transRef.start();
  }, [modeKey, transRef]);

  if (!audioAnalyser.context || !spotifyAnalyser) return null;

  return (
    <Suspense>
      {transitions((props, i) => {
        const Mode = getMode(i);
        return <Mode {...props} />;
      })}
    </Suspense>
  );
};

type AnimatedModeProps = {
  opacity: SpringValue<number>;
  // @ts-ignore: Type 'SpringValue<number[]>' is not assignable to type 'Vector3'.
  position: SpringValue<any>;
  scale: SpringValue<number>;
};

function getMode(index: number) {
  switch (index) {
    case 0:
      return function AnimatedMode0(props: AnimatedModeProps) {
        return (
          <a.group {...props}>
            <Mode0 opacity={props.opacity} />
          </a.group>
        );
      };
    case 1:
      return function AnimatedMode1(props: AnimatedModeProps) {
        return (
          <a.group {...props}>
            <Mode1 opacity={props.opacity} />
          </a.group>
        );
      };
    case 2:
      return function AnimatedMode2(props: AnimatedModeProps) {
        return (
          <a.group {...props}>
            <Mode2 opacity={props.opacity} />
          </a.group>
        );
      };
    case 3:
      return function AnimatedMode3(props: AnimatedModeProps) {
        return (
          <a.group {...props}>
            <Mode3 opacity={props.opacity} />
          </a.group>
        );
      };

    default:
      return function AnimatedMode1(props: AnimatedModeProps) {
        return (
          <a.group {...props}>
            <Mode1 opacity={props.opacity} />
          </a.group>
        );
      };
  }
}

export default memo(Visualizer);
