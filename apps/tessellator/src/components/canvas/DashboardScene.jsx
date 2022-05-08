import { Suspense, memo, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import { useStore } from "@/utils/store";
import { useToggle } from "@/components/useToggle";
import Portal from "./Portal";
import Visualizer from "./Visualizer";
import Bridge from "../models/Bridge";
import Main from "./effects/Main";

const SceneLighting = () => {
  return (
    <>
      <directionalLight castShadow position={[2.5, 12, 12]} intensity={0.5} />
      <pointLight castShadow position={[20, 20, 20]} intensity={1} />
      <pointLight castShadow position={[-20, -20, -20]} intensity={1} />
    </>
  );
};

const OuterScene = () => {
  return (
    <>
      <Stars radius={10} depth={50} count={5000} factor={2} fade />
      <Bridge position={[0, -2.5, 5]} rotation={[0, Math.PI / 2, 0]} />
      <SceneLighting />
    </>
  );
};

const DashboardScene = () => {
  console.log("dashboardScene");
  const camera = useThree((state) => state.camera);
  const router = useStore((state) => state.router);
  const ToggledOuterScene = useToggle(OuterScene, '!isVisualizer')

  useEffect(() => {
    camera.position.set(-50, 50, 150);
  }, []);

  useFrame(() => {
    if (camera.position.z > 175) {
      router.push("/about");
    }
  });

  return (
    <>
      {/* <Main> */}
      <Portal>
        <Visualizer />
      </Portal>
      {/* </Main> */}
      <ToggledOuterScene />
    </>
  );
};

export default memo(DashboardScene);
