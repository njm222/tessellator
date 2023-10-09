import { useEffect, useRef } from "react";
import { BakeShadows, Stars } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { EffectComposer, Pixelation } from "@react-three/postprocessing";

import Bridge from "../../models/Bridge";
import Portal from "../Portal";
import Visualizer from "../Visualizer";
import { PixelationEffect } from "postprocessing";

const OuterScene = () => {
  return (
    <>
      <Stars count={5000} depth={50} factor={2} fade radius={10} />
      <Bridge
        position={[0, -2.5, 5]}
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

    // if (inPortal) {
    //   pixelationRef.current.setGranularity(
    //     camera.position.z > 4 ? camera.position.z * 2 : 0
    //   );
    //   return;
    // }

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
      {/** effects are not able to run in the portal */}
      <EffectComposer disableNormalPass multisampling={0}>
        <Pixelation granularity={0} ref={pixelationRef} />
      </EffectComposer>
    </>
  );
};

VisualizerScene.displayName = "VisualizerScene";
