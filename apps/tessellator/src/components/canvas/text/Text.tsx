import React from "react";
import { Text3D } from "@react-three/drei";
import { ColorRepresentation } from "three";

const fontUrl = "/fonts/tomorrow_extralight_regular.json";

export function Text({
  children,
  hover,
  colour,
  scale = 6,
  bevelSize = 0.05,
  bevelEnabled = true,
}: {
  children: string;
  colour: ColorRepresentation;
  hover?: boolean;
  scale?: number;
  bevelSize?: number;
  bevelEnabled?: boolean;
}) {
  return (
    <Text3D
      bevelEnabled={bevelEnabled}
      bevelSize={bevelSize}
      scale={scale}
      font={fontUrl}
    >
      {children}
      <meshPhongMaterial color={colour} wireframe={!hover} />
    </Text3D>
  );
}
