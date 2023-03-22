import React, { ReactNode,useRef } from "react";
import {
  Center,
  Float,
  meshBounds,
  RoundedBox,
  Text3D,
} from "@react-three/drei";
import { Mesh, MeshNormalMaterial } from "three";

const fontUrl = "/fonts/tomorrow_extralight_regular.json";

export function Text({
  children,
  ...props
}: {
  children: ReactNode | string;
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
          onPointerEnter={() => handleHover(true)}
          onPointerLeave={() => handleHover(false)}
          raycast={meshBounds}
          {...props}
        >
          <Center>
            <RoundedBox
              args={[70, 15, 5]}
              radius={2}
              ref={boxRef}
              smoothness={5}
              visible={false}
            >
              <meshNormalMaterial wireframe={true} />
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
              <meshNormalMaterial wireframe={true} />
            </Text3D>
          </Center>
        </group>
      </Float>
    </>
  );
}
