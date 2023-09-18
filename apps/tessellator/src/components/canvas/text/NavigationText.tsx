import React, { useRef, useState } from "react";
import { animated, useSpring } from "@react-spring/three";
import { meshBounds, RoundedBox, useCursor } from "@react-three/drei";
import { hslToHex } from "core";
import { ColorRepresentation, Mesh } from "three";

import { Text } from "./Text";

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
    <animated.group
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
      raycast={meshBounds}
      scale={scale}
      {...props}
    >
      <RoundedBox args={[100, 15, 5]} radius={2} ref={boxRef} smoothness={5}>
        {/* @ts-ignore: Type instantiation is excessively deep and possibly infinite. */}
        <animated.meshPhongMaterial
          color={colour}
          opacity={opacity}
          transparent={true}
          wireframe={true}
        />
      </RoundedBox>
      <Text bevelEnabled colour={colour} hover>
        {children}
      </Text>
    </animated.group>
  );
}