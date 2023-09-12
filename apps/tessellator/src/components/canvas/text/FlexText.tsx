import { useRef, useState } from "react";
import { useSpring, animated } from "@react-spring/three";
import { RoundedBox, useCursor } from "@react-three/drei";
import { Box, BoxProps } from "@react-three/flex";
import { Color, Group, Mesh } from "three";

import { openNewTabLink } from "../../../helpers/global";
import { Text } from "../text/Text";
import { useFrame } from "@react-three/fiber";

type FlexTextProps = BoxProps & {
  children: string;
  scale?: number;
  colour?: Color;
};

export function FlexText({
  children,
  scale = 4,
  colour = new Color(),
  marginRight = 5,
  marginTop = 5,
  ...props
}: FlexTextProps) {
  return (
    <Box marginRight={marginRight} marginTop={marginTop} {...props}>
      <Text colour={colour} scale={scale}>
        {children}
      </Text>
    </Box>
  );
}

type FlexLinkProps = FlexTextProps & {
  link: string;
};

export function FlexLink({
  children,
  link,
  scale = 4,
  colour = new Color(),
  marginRight = 5,
  marginTop = 5,
  ...props
}: FlexLinkProps) {
  const boxRef = useRef<Mesh>(null);
  const ref = useRef<Group>(null);
  const [hover, setHover] = useState(false);
  useCursor(hover);
  console.log(children, hover);

  const { opacity } = useSpring({
    opacity: hover ? 1 : 0,
  });

  useFrame(() => {
    if (!boxRef.current) return;
    if (!ref.current) return;

    boxRef.current.position.set(
      ref.current.position.x + children.length * 1.75,
      ref.current.position.y + 2,
      ref.current.position.z
    );
  });

  return (
    <>
      <Box
        marginRight={marginRight}
        marginTop={marginTop}
        {...props}
        ref={ref}
        onPointerOver={() => setHover(true)}
        onPointerOut={() => setHover(false)}
        onClick={() => openNewTabLink(link)}
      >
        <Text colour={colour} hover scale={scale}>
          {children}
        </Text>
      </Box>
      <RoundedBox
        args={[4.5 * children.length, 10, 5]}
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
    </>
  );
}
