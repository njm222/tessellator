import { memo, useEffect } from "react";
import { useThree } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import Portal from "../Portal";
import Visualizer from "../Visualizer";
import Bridge from "../../models/Bridge";
import { usePortal } from "../../../utils/portalContext";

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

  // useFrame(() => {
  //   if (camera.position.z > 175) {
  //     router.push("/about");
  //   }
  // });

  return (
    <>
      <Portal>
        <Visualizer />
      </Portal>
      <OuterScene />
    </>
  );
};

export default memo(VisualizerScene);
