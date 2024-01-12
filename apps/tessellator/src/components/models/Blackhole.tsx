/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Author: rubykamen (https://sketchfab.com/rubykamen)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/blackhole-74cbeaeae2174a218fe9455d77902b5c
Title: Blackhole
*/

import React, { Suspense, useEffect, useRef } from "react";
import { meshBounds, useAnimations, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { GLTF } from "three-stdlib";

type ActionName = "Take 001";
interface GLTFAction extends THREE.AnimationClip {
  name: ActionName;
}

type GLTFResult = GLTF & {
  nodes: {
    Blackhole_core_Blackhole_core_0: THREE.Mesh;
    Blackhole_ring_Blackhole_ring_0: THREE.Mesh;
    Blackhole_skin_001_Blackhole_skin_0: THREE.Mesh;
    Blackhole_skin_002_Blackhole_core_0: THREE.Mesh;
    Blackhole_skin_003_Blackhole_skin_0: THREE.Mesh;
    Blackhole_skin_004_Blackhole_core_0: THREE.Mesh;
    Blackhole_skin_005_Blackhole_skin_0: THREE.Mesh;
    Blackhole_skin_006_Blackhole_skin_inner_0: THREE.Mesh;
    Blackhole_skin_007_Blackhole_core_0: THREE.Mesh;
    Blackhole_core001_Blackhole_core_0: THREE.Mesh;
    Blackhole_skin_008_Blackhole_skin_inner_0: THREE.Mesh;
    Blackhole_skin_009_Blackhole_skin_0: THREE.Mesh;
    Blackhole_skin_010_Blackhole_skin_0: THREE.Mesh;
    Blackhole_skin_011_Blackhole_core_0: THREE.Mesh;
    Blackhole_skin_012_Blackhole_skin_inner_0: THREE.Mesh;
    Blackhole_skin_013_Blackhole_ring2_0: THREE.Mesh;
    Blackhole_core002_Blackhole_ring2_0: THREE.Mesh;
  };
  materials: {
    Blackhole_core: THREE.MeshStandardMaterial;
    Blackhole_ring: THREE.MeshStandardMaterial;
    Blackhole_skin: THREE.MeshStandardMaterial;
    Blackhole_skin_inner: THREE.MeshStandardMaterial;
    Blackhole_ring2: THREE.MeshStandardMaterial;
  };
  animations: GLTFAction[];
};

export default function Model(props: JSX.IntrinsicElements["group"]) {
  const group = useRef<THREE.Group>(null);
  const { nodes, materials, animations } = useGLTF(
    "/models/blackhole.glb"
  ) as GLTFResult;
  const { actions } = useAnimations<GLTFAction>(animations, group);

  useEffect(() => {
    actions["Take 001"]?.play();
  }, [actions]);

  return (
    <Suspense fallback={null}>
      <group raycast={meshBounds} ref={group} {...props} dispose={null}>
        <group name="415c209837844e7b91255101a7c3eb67fbx">
          <group name="Object_2">
            <group name="RootNode">
              <group name="Blackhole_core">
                <mesh
                  castShadow
                  geometry={nodes.Blackhole_core_Blackhole_core_0.geometry}
                  material={materials.Blackhole_core}
                  name="Blackhole_core_Blackhole_core_0"
                  receiveShadow
                  scale={46.4}
                />
              </group>
              <group name="Blackhole_ring" rotation={[-Math.PI / 2, 0, 0]}>
                <mesh
                  castShadow
                  geometry={nodes.Blackhole_ring_Blackhole_ring_0.geometry}
                  material={materials.Blackhole_ring}
                  name="Blackhole_ring_Blackhole_ring_0"
                  receiveShadow
                  scale={195.369}
                />
              </group>
              <group
                name="Blackhole_skin_001"
                rotation={[-Math.PI / 2, 0, 0]}
                scale={0.959}
              >
                <mesh
                  castShadow
                  geometry={nodes.Blackhole_skin_001_Blackhole_skin_0.geometry}
                  material={materials.Blackhole_skin}
                  name="Blackhole_skin_001_Blackhole_skin_0"
                  receiveShadow
                  scale={66.308}
                />
              </group>
              <group
                name="Blackhole_skin_002"
                rotation={[-Math.PI / 2, 0, 0]}
                scale={0.957}
              >
                <mesh
                  castShadow
                  geometry={nodes.Blackhole_skin_002_Blackhole_core_0.geometry}
                  material={materials.Blackhole_core}
                  name="Blackhole_skin_002_Blackhole_core_0"
                  receiveShadow
                  scale={63.936}
                />
              </group>
              <group
                name="Blackhole_skin_003"
                rotation={[-Math.PI / 2, 0, 0]}
                scale={0.91}
              >
                <mesh
                  castShadow
                  geometry={nodes.Blackhole_skin_003_Blackhole_skin_0.geometry}
                  material={materials.Blackhole_skin}
                  name="Blackhole_skin_003_Blackhole_skin_0"
                  receiveShadow
                  scale={65.34}
                />
              </group>
              <group
                name="Blackhole_skin_004"
                rotation={[-Math.PI / 2, 0, 0]}
                scale={0.908}
              >
                <mesh
                  castShadow
                  geometry={nodes.Blackhole_skin_004_Blackhole_core_0.geometry}
                  material={materials.Blackhole_core}
                  name="Blackhole_skin_004_Blackhole_core_0"
                  receiveShadow
                  scale={63.859}
                />
              </group>
              <group
                name="Blackhole_skin_005"
                rotation={[-Math.PI / 2, 0, 0.96]}
                scale={0.9}
              >
                <mesh
                  castShadow
                  geometry={nodes.Blackhole_skin_005_Blackhole_skin_0.geometry}
                  material={materials.Blackhole_skin}
                  name="Blackhole_skin_005_Blackhole_skin_0"
                  receiveShadow
                  scale={64.281}
                />
              </group>
              <group
                name="Blackhole_skin_006"
                rotation={[-Math.PI / 2, 0, -2.007]}
                scale={0.864}
              >
                <mesh
                  castShadow
                  geometry={
                    nodes.Blackhole_skin_006_Blackhole_skin_inner_0.geometry
                  }
                  material={materials.Blackhole_skin_inner}
                  name="Blackhole_skin_006_Blackhole_skin_inner_0"
                  receiveShadow
                  scale={63.936}
                />
              </group>
              <group
                name="Blackhole_skin_007"
                rotation={[-Math.PI / 2, 0, -2.007]}
                scale={0.866}
              >
                <mesh
                  castShadow
                  geometry={nodes.Blackhole_skin_007_Blackhole_core_0.geometry}
                  material={materials.Blackhole_core}
                  name="Blackhole_skin_007_Blackhole_core_0"
                  receiveShadow
                  scale={63.936}
                />
              </group>
              <group name="Blackhole_core001" rotation={[-Math.PI / 2, 0, 0]}>
                <mesh
                  castShadow
                  geometry={nodes.Blackhole_core001_Blackhole_core_0.geometry}
                  material={materials.Blackhole_core}
                  name="Blackhole_core001_Blackhole_core_0"
                  receiveShadow
                  scale={49.391}
                />
              </group>
              <group
                name="Blackhole_skin_008"
                rotation={[-Math.PI / 2, 0, 0.087]}
                scale={0.845}
              >
                <mesh
                  castShadow
                  geometry={
                    nodes.Blackhole_skin_008_Blackhole_skin_inner_0.geometry
                  }
                  material={materials.Blackhole_skin_inner}
                  name="Blackhole_skin_008_Blackhole_skin_inner_0"
                  receiveShadow
                  scale={62.21}
                />
              </group>
              <group
                name="Blackhole_skin_009"
                rotation={[-Math.PI / 2, 0, -0.611]}
                scale={0.887}
              >
                <mesh
                  castShadow
                  geometry={nodes.Blackhole_skin_009_Blackhole_skin_0.geometry}
                  material={materials.Blackhole_skin}
                  name="Blackhole_skin_009_Blackhole_skin_0"
                  receiveShadow
                  scale={63.936}
                />
              </group>
              <group
                name="Blackhole_skin_010"
                rotation={[-Math.PI / 2, 0, -2.531]}
                scale={0.929}
              >
                <mesh
                  castShadow
                  geometry={nodes.Blackhole_skin_010_Blackhole_skin_0.geometry}
                  material={materials.Blackhole_skin}
                  name="Blackhole_skin_010_Blackhole_skin_0"
                  receiveShadow
                  scale={65.788}
                />
              </group>
              <group
                name="Blackhole_skin_011"
                rotation={[-Math.PI / 2, 0, -2.531]}
                scale={0.928}
              >
                <mesh
                  castShadow
                  geometry={nodes.Blackhole_skin_011_Blackhole_core_0.geometry}
                  material={materials.Blackhole_core}
                  name="Blackhole_skin_011_Blackhole_core_0"
                  receiveShadow
                  scale={64.243}
                />
              </group>
              <group
                name="Blackhole_skin_012"
                rotation={[-Math.PI / 2, 0, 2.094]}
                scale={0.856}
              >
                <mesh
                  castShadow
                  geometry={
                    nodes.Blackhole_skin_012_Blackhole_skin_inner_0.geometry
                  }
                  material={materials.Blackhole_skin_inner}
                  name="Blackhole_skin_012_Blackhole_skin_inner_0"
                  receiveShadow
                  scale={62.21}
                />
              </group>
              <group
                name="Blackhole_skin_013"
                rotation={[-Math.PI / 2, 0, -2.967]}
                scale={0.835}
              >
                <mesh
                  castShadow
                  geometry={nodes.Blackhole_skin_013_Blackhole_ring2_0.geometry}
                  material={materials.Blackhole_ring2}
                  name="Blackhole_skin_013_Blackhole_ring2_0"
                  receiveShadow
                  scale={61.101}
                />
              </group>
              <group
                name="Blackhole_core002"
                rotation={[-Math.PI / 2, 0, 0]}
                scale={0.928}
              >
                <mesh
                  castShadow
                  geometry={nodes.Blackhole_core002_Blackhole_ring2_0.geometry}
                  material={materials.Blackhole_ring2}
                  name="Blackhole_core002_Blackhole_ring2_0"
                  receiveShadow
                  scale={48.72}
                />
              </group>
            </group>
          </group>
        </group>
      </group>
    </Suspense>
  );
}

useGLTF.preload("/models/blackhole.glb");
