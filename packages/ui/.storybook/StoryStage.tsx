import React from "react";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  OrthographicCamera,
  useHelper,
  Center,
} from "@react-three/drei";

const Lights = ({ position, debug }) => {
  const light = React.useRef();
  useHelper(light, THREE.SpotLightHelper, "yellow");

  return (
    <>
      <ambientLight intensity={0.5} />
      <spotLight
        ref={debug ? light : null}
        position={position}
        penumbra={1}
        angle={Math.PI / 7}
      />
      <pointLight position={[-10, -10, -10]} />
    </>
  );
};

export function StoryStage({
  children,
  cameraPosition = new THREE.Vector3(-5, 5, 5),
  zoom = 10,
  controls = true,
  lights = true,
  lightPosition = [-10, -35, 5],
  center = false,
  debugLights = false,
  ...restProps
}) {
  return (
    <Canvas
      shadows
      dpr={window.devicePixelRatio}
      style={{ width: "100vw", height: "100vh" }}
      {...restProps}
    >
      <color attach="background" args={["#fff"]} />
      {center ? <Center>{children}</Center> : children}
      {lights && <Lights debug={debugLights} position={lightPosition} />}
      {controls && <OrbitControls />}
    </Canvas>
  );
}
