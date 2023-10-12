import { useEffect, useRef } from "react";
import { BakeShadows, Stars } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { Bloom, EffectComposer, Pixelation } from "@react-three/postprocessing";
import { PixelationEffect } from "postprocessing";

import Bridge from "../../models/Bridge";
import Portal from "../Portal";
import Visualizer from "../Visualizer";

const OuterScene = () => {
  return (
    <>
      <Stars count={5000} depth={50} factor={2} fade radius={10} />
      <Bridge
        position={[0, -3.5, 5]}
        rotation={[0, Math.PI / 2, 0]}
        scale={2}
      />
    </>
  );
};

export const VisualizerScene = () => {
  const camera = useThree((state) => state.camera);
  const pixelationRef = useRef(new PixelationEffect());

  useEffect(() => {
    camera.position.set(-50, 50, 150);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useFrame(() => {
    if (!pixelationRef.current) return;

    if (camera.position.z < 0) {
      pixelationRef.current.setGranularity(0);
      return;
    }

    pixelationRef.current.setGranularity(
      camera.position.z > 5 ? 0 : (5 - camera.position.z) * 10
    );
  });

  return (
    <>
      <Portal>
        <Visualizer />
      </Portal>
      <OuterScene />
      <BakeShadows />
      <EffectComposer disableNormalPass multisampling={0}>
        <Bloom luminanceSmoothing={0.1} luminanceThreshold={0.2} />
        <Pixelation granularity={0} ref={pixelationRef} />
      </EffectComposer>
    </>
  );
};

VisualizerScene.displayName = "VisualizerScene";
