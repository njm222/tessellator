import { useEffect, useRef, useState } from "react";
import { animated, config, useSpring } from "@react-spring/three";
import { Instance, Instances, RoundedBox, useCursor } from "@react-three/drei";
import { GroupProps, useFrame } from "@react-three/fiber";
import { Box } from "@react-three/flex";
import { Color, Group, Mesh } from "three";

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
  }, [children.length, hover]);

  return (
    <group {...props}>
      <Box marginRight={marginRight} marginTop={marginTop} ref={ref}>
        <Box onPointerOver={() => setHover(true)}>
          <Text colour={colour} hover scale={scale}>
            {children}
          </Text>
        </Box>
        {overlayText ? (
          <Instances
            limit={instanceLimit}
            range={instanceLimit}
            visible={!!overlayText}
          >
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
      </Box>
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
  const ref = useRef<any>(null);
  const groupRef = useRef<Group>(null);

  useFrame((state) => {
    if (!ref.current) {
      return;
    }
    if (!groupRef.current) {
      return;
    }
    const t = state.clock.getElapsedTime() + y * 10000;
    groupRef.current.rotation.set(
      Math.cos(t / 4) / 2,
      Math.sin(t / 4) / 2,
      Math.cos(t / 1.5) / 2
    );

    ref.current.position.set(x, y, z);
  });
  return (
    <group {...props} ref={groupRef}>
      <Instance ref={ref} />
    </group>
  );
}

// adapted from https://gist.github.com/stephanbogner/a5f50548a06bec723dcb0991dcbb0856 by https://twitter.com/st_phan
function getFibonacciSpherePosition(
  samples = 100,
  radius = 50,
  randomize = false
) {
  var random = 1;
  if (randomize === true) {
    random = Math.random() * samples;
  }

  const points = [];
  const offset = 2 / samples;
  const increment = Math.PI * (3 - Math.sqrt(5));

  for (let i = 0; i < samples; i++) {
    let y = i * offset - 1 + offset / 2;
    const distance = Math.sqrt(1 - Math.pow(y, 2));
    const phi = ((i + random) % samples) * increment;
    let x = Math.cos(phi) * distance;
    let z = Math.sin(phi) * distance;
    x = x * radius;
    y = y * radius;
    z = z * radius;

    const point = {
      x: x,
      y: y,
      z: z,
    };
    points.push(point);
  }
  return points;
}
