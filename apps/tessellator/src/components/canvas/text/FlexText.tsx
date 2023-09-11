import { useState } from "react";
import { Color } from "three";
import { Box, BoxProps } from "@react-three/flex";
import { animated, useSpring } from "@react-spring/three";

import { meshBounds, RoundedBox, useCursor } from "@react-three/drei";
import { Text } from "../text/Text";
import { openNewTabLink } from "../../../helpers/global";

type FlexTextProps = BoxProps & {
  children: string;
  scale?: number;
  colour?: Color;
  hover?: boolean;
};

export function FlexText({
  children,
  scale = 4,
  colour = new Color(),
  marginRight = 5,
  marginTop = 5,
  hover = false,
  ...props
}: FlexTextProps) {
  return (
    <Box marginRight={marginRight} marginTop={marginTop} {...props}>
      <Text colour={colour} scale={scale} hover>
        {children}
      </Text>
    </Box>
  );
}

type FlexLinkProps = FlexTextProps & {
  link: string;
};

export function FlexLink({ children, link, ...props }: FlexLinkProps) {
  const [hover, setHover] = useState(false);
  useCursor(hover);

  const { opacity } = useSpring({
    opacity: hover ? 1 : 0,
  });

  return (
    <group
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
      onClick={() => openNewTabLink(link)}
      raycast={meshBounds}
    >
      <FlexText hover {...props}>
        {children}
      </FlexText>
    </group>
  );
}
