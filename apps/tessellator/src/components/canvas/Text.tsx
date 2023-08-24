import React, { ReactNode, useRef, useState } from "react";
import { animated, useSpring } from "@react-spring/three";
import {
  Center,
  Float,
  meshBounds,
  RoundedBox,
  Text3D,
} from "@react-three/drei";
import { hslToHex } from "core";
import { ColorRepresentation, Mesh } from "three";

const fontUrl = "/fonts/tomorrow_extralight_regular.json";

export function Text({
  children,
  ...props
}: {
  children: string;
  onPointerDown: () => void;
}) {
  const meshRef = useRef<Mesh>(new Mesh());
  const boxRef = useRef<Mesh>(new Mesh());
  const colour = hslToHex(Math.random() * 360, 50, 100) as ColorRepresentation;

  const [hover, setHover] = useState(false);

  const { opacity, scale } = useSpring({
    opacity: hover ? 1 : 0,
    scale: hover ? 1 : 0.9,
  });

  function handleHover(isHover: boolean) {
    setHover(isHover);
    document.documentElement.style.cursor = isHover ? "pointer" : "unset";
  }

  return (
    <Float floatIntensity={2} speed={2}>
      <animated.group
        onPointerEnter={() => handleHover(true)}
        onPointerLeave={() => handleHover(false)}
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
          <Text3D
            bevelEnabled
            bevelSize={0.05}
            font={fontUrl}
            ref={meshRef}
            scale={6}
          >
            {children}
            <meshPhongMaterial color={colour} wireframe={!hover} />
          </Text3D>
        </Center>
      </animated.group>
    </Float>
  );
}
