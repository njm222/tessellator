import { useEffect, useRef, useState } from "react";
import { animated, config, useSpring } from "@react-spring/three";
import { Instance, Instances, RoundedBox, useCursor } from "@react-three/drei";
import { GroupProps, useFrame } from "@react-three/fiber";
import { Box } from "@react-three/flex";
import { Color, Group, Mesh } from "three";

import { getFibonacciSpherePosition } from "../../../helpers/getFibonacciSpherePosition";

import { FlexTextProps } from "./FlexText";
import { Text, TextGeo } from "./Text";

type FlexLinkProps = FlexTextProps & {
  onClick: () => void;
  disabled?: boolean;
  overlayText?: string;
};

const instanceLimit = 50;
const instanceRadius = 35;

export function FlexLink({
  children,
  onClick,
  disabled = false,
  scale = 4,
  colour = new Color(),
  marginRight = 5,
  marginTop = 5,
  overlayText,
  ...props
}: FlexLinkProps) {
  const overlayRef = useRef<any>(null);
  const boxRef = useRef<Mesh>(null);
  const ref = useRef<Group>(null);
  const [hover, setHover] = useState(false);
  useCursor(!disabled && hover);

  const { opacity } = useSpring({
    opacity: hover ? 0.6 : 0,
    config: config.slow,
  });

  useEffect(() => {
    if (!boxRef.current) return;
    if (!ref.current) return;

    boxRef.current.position.set(
      ref.current.position.x + 1 + children.length * 1.75,
      ref.current.position.y + 2,
      ref.current.position.z
    );

    if (!overlayRef.current) return;
    overlayRef.current.position.set(
      boxRef.current.position.x,
      boxRef.current.position.y,
      boxRef.current.position.z
    );
  }, [children.length, hover]);

  return (
    <group {...props}>
      <Box marginRight={marginRight} marginTop={marginTop} ref={ref}>
        <Box onPointerOver={() => setHover(true)}>
          <Text colour={colour} hover scale={scale}>
            {children}
          </Text>
        </Box>
      </Box>
      {overlayText ? (
        <Instances limit={instanceLimit} range={instanceLimit} ref={overlayRef}>
          <TextGeo colour={colour} opacity={opacity}>
            {overlayText}
          </TextGeo>
          {getFibonacciSpherePosition(instanceLimit, instanceRadius).map(
            ({ x, y, z }) => (
              <Bubbles key={`${x}${y}${z}`} x={x} y={y} z={z} />
            )
          )}
        </Instances>
      ) : null}
      <RoundedBox
        args={[10 + 3.5 * children.length, 10, 5]}
        onPointerDown={() => (disabled ? null : onClick())}
        onPointerOut={() => setHover(false)}
        onPointerOver={() => setHover(true)}
        radius={2}
        ref={boxRef}
        smoothness={5}
      >
        {/* @ts-ignore: Type instantiation is excessively deep and possibly infinite. */}
        <animated.meshPhongMaterial
          color={colour}
          opacity={opacity}
          transparent={true}
          wireframe={true}
        />
      </RoundedBox>
    </group>
  );
}

type BubblesProp = GroupProps & {
  x: number;
  y: number;
  z: number;
};

function Bubbles({ x, y, z, ...props }: BubblesProp) {
  const groupRef = useRef<Group>(null);

  useFrame((state) => {
    if (!groupRef.current) {
      return;
    }
    const t = state.clock.getElapsedTime() + x + y + z * 10000;
    groupRef.current.rotation.set(
      Math.cos(t / 4) / 2,
      Math.sin(t / 4) / 2,
      Math.cos(t / 1.5) / 2
    );

    groupRef.current.position.set(x, y, z);
  });
  return (
    <group {...props} ref={groupRef}>
      <Instance />
    </group>
  );
}
