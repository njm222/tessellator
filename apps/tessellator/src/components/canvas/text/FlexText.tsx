import { Box, BoxProps } from "@react-three/flex";
import { Color } from "three";

import { Text } from "../text/Text";

export type FlexTextProps = BoxProps & {
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
