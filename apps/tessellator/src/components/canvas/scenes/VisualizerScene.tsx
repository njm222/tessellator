import { memo, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import Portal from "../Portal";
import Visualizer from "../Visualizer";
import Bridge from "../../models/Bridge";
import { usePortal } from "../../../utils/portalContext";
import { useRouter } from "next/router";
import { DefaultPageProps } from "../../../pages/_app";

const OuterScene = () => {
  const { inPortal } = usePortal();
  return inPortal ? null : (
    <>
      <Stars radius={10} depth={50} count={5000} factor={2} fade />
      <Bridge position={[0, -2.5, 5]} rotation={[0, Math.PI / 2, 0]} />
    </>
  );
};

const VisualizerScene = (pageProps: DefaultPageProps) => {
  const camera = useThree((state) => state.camera);
  const router = useRouter();

  useEffect(() => {
    camera.position.set(-50, 50, 150);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useFrame(() => {
    if (camera.position.z > 175) {
      router.push("/about");
    }
  });

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
