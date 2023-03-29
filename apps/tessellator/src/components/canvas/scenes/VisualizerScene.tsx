import { memo, Suspense,useEffect } from "react";
import { BakeShadows,Stars } from "@react-three/drei";
import { useThree } from "@react-three/fiber";

import { usePortal } from "../../../utils/portalContext";
import Bridge from "../../models/Bridge";
import Portal from "../Portal";
import Visualizer from "../Visualizer";

const OuterScene = () => {
  const { inPortal } = usePortal();
  return inPortal ? null : (
    <>
      <Stars count={5000} depth={50} factor={2} fade radius={10} />
      <Bridge position={[0, -2.5, 5]} rotation={[0, Math.PI / 2, 0]} />
    </>
  );
};

const VisualizerScene = () => {
  const camera = useThree((state) => state.camera);

  useEffect(() => {
    camera.position.set(-50, 50, 150);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Suspense fallback={null}>
      <Portal>
        <Visualizer />
      </Portal>
      <OuterScene />
      <BakeShadows />
    </Suspense>
  );
};

export default memo(VisualizerScene);
