import React, { Suspense, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { GroupProps } from "@react-three/fiber";
import { Group } from "three";

const bridgeScale = 2;

export default function Model(props: GroupProps) {
  const group = useRef(new Group());
  const bridge: any = useGLTF("/models/bridge.glb");

  const { nodes, materials } = bridge;

  return (
    <Suspense fallback={null}>
      <group ref={group} {...props} dispose={null}>
        <mesh
          castShadow
          geometry={nodes.Bridge01.geometry}
          material={materials.Base_Material}
          receiveShadow
          scale={[bridgeScale, bridgeScale, bridgeScale]}
        />
      </group>
    </Suspense>
  );
}

useGLTF.preload("/models/bridge.glb");
