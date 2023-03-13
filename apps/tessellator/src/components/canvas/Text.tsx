import React, { useRef, ReactNode } from "react";

import {
  Center,
  Float,
  meshBounds,
  RoundedBox,
  Text3D,
} from "@react-three/drei";
import { Mesh, MeshNormalMaterial } from "three";

const fontUrl = "/fonts/tomorrow_extralight_regular.json";

// eslint-disable-next-line react/display-name
export function Text({
  children,
  size = 1,
  color = "#000000",
  ...props
}: {
  children: ReactNode | string;
  size?: number;
  color?: string;
  onPointerDown: () => Promise<void>;
}) {
  const meshRef = useRef<Mesh>(new Mesh());
  const boxRef = useRef<Mesh>(new Mesh());

  function handleHover(isHover: boolean) {
    if (!meshRef.current) return;
    (meshRef.current.material as MeshNormalMaterial).wireframe = !isHover;
    boxRef.current.visible = isHover;
    document.documentElement.style.cursor = isHover ? "pointer" : "unset";
  }

  return (
    <>
      <Float floatIntensity={2} speed={2}>
        <group
          raycast={meshBounds}
          onPointerEnter={() => handleHover(true)}
          onPointerLeave={() => handleHover(false)}
          {...props}
        >
          <Center>
            <RoundedBox
              ref={boxRef}
              args={[70, 15, 5]}
              radius={2}
              smoothness={5}
              visible={false}
            >
              <meshNormalMaterial wireframe={true} />
            </RoundedBox>
          </Center>
          <Center>
            <Text3D
              ref={meshRef}
              font={fontUrl}
              bevelEnabled
              bevelSize={0.05}
              scale={6}
            >
              {children}
              <meshNormalMaterial wireframe={true} />
            </Text3D>
          </Center>
        </group>
      </Float>
    </>
  );
}
