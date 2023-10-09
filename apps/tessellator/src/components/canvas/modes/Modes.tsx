import React, { Suspense, useEffect } from "react";
import {
  a,
  SpringValue,
  useSpringRef,
  useTransition,
} from "@react-spring/three";
import { GroupProps } from "@react-three/fiber";

import { useControls } from "../../dom/controls/controlsContext";

import Mode0 from "./mode-0/Mode0";
import Mode1 from "./mode-1/Mode1";
import Mode2 from "./mode-2/Mode2";
import Mode3 from "./mode-3/Mode3";
import Mode4 from "./mode-4/Mode4";

export function Modes() {
  const { modeKey } = useControls();
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

  return (
    <Suspense>
      {transitions((props, i) => {
        const Mode = getModeByIndex(i);
        return <Mode {...props} />;
      })}
    </Suspense>
  );
}

export type ModeProps = Omit<GroupProps, "position" | "scale"> & {
  opacity: SpringValue<number>;
};

type AnimatedModeProps = ModeProps & {
  // @ts-ignore: Type 'SpringValue<number[]>' is not assignable to type 'Vector3'.
  position: SpringValue<any>;
  scale: SpringValue<number>;
};

function getModeByIndex(index: number) {
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
    case 4:
      return function AnimatedMode4(props: AnimatedModeProps) {
        return (
          <a.group {...props}>
            <Mode4 opacity={props.opacity} />
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
