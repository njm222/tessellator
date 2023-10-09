import React from "react";
import { animated, SpringValue } from "@react-spring/three";
import { Text3D } from "@react-three/drei";
import { extend, Object3DNode } from "@react-three/fiber";
import { ColorRepresentation } from "three";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";

import myFont from "../../../../public/fonts/tomorrow_extralight_regular.json";

extend({ TextGeometry });

const fontUrl = "/fonts/tomorrow_extralight_regular.json";

export function Text({
  children,
  hover,
  colour,
  scale = 6,
  bevelSize = 0.05,
  bevelEnabled = true,
  letterSpacing = 0.3,
}: {
  children: string;
  colour: ColorRepresentation;
  hover?: boolean;
  scale?: number;
  bevelSize?: number;
  bevelEnabled?: boolean;
  letterSpacing?: number;
}) {
  return (
    <Text3D
      bevelEnabled={bevelEnabled}
      bevelSize={bevelSize}
      font={fontUrl}
      letterSpacing={letterSpacing}
      scale={scale}
    >
      {children}
      <meshPhongMaterial color={colour} wireframe={!hover} />
    </Text3D>
  );
}

export function TextGeo({
  children,
  colour,
  size = 2,
  opacity,
}: {
  children: string;
  colour: ColorRepresentation;
  size?: number;
  opacity?: SpringValue<number>;
}) {
  const font = new FontLoader().parse(myFont);

  return (
    <>
      <textGeometry args={[children, { font, size, height: 1 }]} />
      {/* @ts-ignore: Type instantiation is excessively deep and possibly infinite. */}
      <animated.meshPhongMaterial
        color={colour}
        opacity={opacity}
        transparent={true}
        wireframe={true}
      />
    </>
  );
}
declare module "@react-three/fiber" {
  interface ThreeElements {
    textGeometry: Object3DNode<TextGeometry, typeof TextGeometry>;
  }
}
