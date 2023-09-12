import React, { useRef, useState } from "react";
import { animated, useSpring } from "@react-spring/three";
import {
  Center,
  Float,
  meshBounds,
  RoundedBox,
  useCursor,
} from "@react-three/drei";
import { hslToHex } from "core";
import { ColorRepresentation, Mesh } from "three";

import { Text } from "./Text";

const fontUrl = "/fonts/tomorrow_extralight_regular.json";

export function NavigationText({
  children,
  ...props
}: {
  children: string;
  onPointerDown: () => void;
}) {
  const boxRef = useRef<Mesh>(new Mesh());
  const colour = hslToHex(Math.random() * 360, 50, 100) as ColorRepresentation;

  const [hover, setHover] = useState(false);
  useCursor(hover);

  const { opacity, scale } = useSpring({
    opacity: hover ? 1 : 0,
    scale: hover ? 1 : 0.9,
  });

  return (
    <Float floatIntensity={2} speed={2}>
      <animated.group
        onPointerEnter={() => setHover(true)}
        onPointerLeave={() => setHover(false)}
        raycast={meshBounds}
        scale={scale}
        {...props}
      >
        <Center>
          <RoundedBox args={[70, 15, 5]} radius={2} ref={boxRef} smoothness={5}>
            {/* @ts-ignore: Type instantiation is excessively deep and possibly infinite. */}
            <animated.meshPhongMaterial
              color={colour}
              opacity={opacity}
              transparent={true}
              wireframe={true}
            />
          </RoundedBox>
        </Center>
        <Center>
          <Text bevelEnabled colour={colour} hover>
            {children}
          </Text>
        </Center>
      </animated.group>
    </Float>
  );
}
