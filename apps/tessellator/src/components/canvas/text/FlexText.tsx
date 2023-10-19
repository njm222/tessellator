import { Box, BoxProps } from "@react-three/flex";
import { Color } from "three";

import { Text } from "../text/Text";

export type FlexTextProps = BoxProps & {
  children: string;
  scale?: number;
  color?: Color;
};

export function FlexText({
  children,
  scale = 4,
  color = new Color(),
  marginRight = 5,
  marginTop = 5,
  ...props
}: FlexTextProps) {
  return (
    <Box marginRight={marginRight} marginTop={marginTop} {...props}>
      <Text color={color} scale={scale}>
        {children}
      </Text>
    </Box>
  );
}
