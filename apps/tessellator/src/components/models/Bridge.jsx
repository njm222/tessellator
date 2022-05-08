import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

const bridgeScale = 2;

export default function Model(props) {
  const group = useRef();
  const { nodes, materials } = useGLTF("/models/bridge.glb");
  return (
    <group ref={group} {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Bridge01.geometry}
        material={materials.Base_Material}
        scale={[bridgeScale, bridgeScale, bridgeScale]}
      />
    </group>
  );
}

useGLTF.preload("/bridge.glb");
