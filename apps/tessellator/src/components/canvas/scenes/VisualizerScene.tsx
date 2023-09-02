import { useEffect } from "react";
import { BakeShadows, Stars } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { Bloom, EffectComposer } from "@react-three/postprocessing";

import Bridge from "../../models/Bridge";
import Portal from "../Portal";
import Visualizer from "../Visualizer";

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
  useEffect(() => {
    camera.position.set(-50, 50, 150);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Portal>
        <Visualizer />
      </Portal>
      <OuterScene />
      <BakeShadows />
      {/** effects are not able to run in the portal */}
      <EffectComposer disableNormalPass multisampling={0}>
        <Bloom
          height={512}
          luminanceSmoothing={0.1}
          luminanceThreshold={0.1}
          width={512}
        />
      </EffectComposer>
    </>
  );
};

VisualizerScene.displayName = "VisualizerScene";
