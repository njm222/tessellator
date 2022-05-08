import { Vector3, Quaternion } from "three";
import { memo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { PerspectiveCamera, RenderTexture } from "@react-three/drei";
import { useStore } from "@/utils/store";
import { useToggle } from "@/components/useToggle";

function Portal({ children }) {
  console.log("portal");
  const mesh = useRef();
  const portalCamRef = useRef(false);

  // Tie this component into the render-loop
  useFrame((state, delta) => {
    // !Visualizer state
    if (!useStore.getState().isVisualizer && state.camera && mesh.current?.position) {
      if (state.camera.position.distanceTo(mesh.current.position) > 5) {
        // reset camera if moved / rotated
        state.camera.position.lerp(new Vector3(0, 0, 10), delta * 2);
      }
      // if camera is close enough lerp closer
      if (
        !portalCamRef.current &&
        state.camera.position.distanceTo(mesh.current.position) < 5
      ) {
        console.log("lerping from dashboardScene to portal");
        // rotate camera center
        state.camera.quaternion.slerp(
          new Quaternion(-Math.PI * 2, 0, 0, 1),
          delta * 10
        );
        // position camera center
        state.camera.position.lerp(new Vector3(0, 0, 2), delta * 20);
        state.camera.updateProjectionMatrix();
        state.camera.updateMatrixWorld();
      }
      // if camera is very close switch cams
      if (
        !portalCamRef.current &&
        state.camera.position.distanceTo(mesh.current.position) <= 2.1
      ) {
        useStore.getState().set({ isVisualizer: true });
        portalCamRef.current = true;
        console.log("switching into portal cam");
        return;
      }
      return;
    }

    // Visualizer state
    if (portalCamRef.current) {
      // reset camera if moved / rotated
      state.camera.position.lerp(new Vector3(0, 0, 3), delta * 2);
      // if cam is far lerp further
      if (state.camera.position.z > 5) {
        console.log("lerping from portal to dashboardScene");
        // rotate camera center
        state.camera.quaternion.slerp(
          new Quaternion(-Math.PI * 2, 0, 0, 1),
          delta * 5
        );
        // position camera center
        state.camera.position.lerp(new Vector3(0, 0, 10), delta * 10);
        state.camera.updateProjectionMatrix();
        state.camera.updateMatrixWorld();
      }
      // if cam is very far switch cams
      if (state.camera.position.z > 8) {
        portalCamRef.current = false;
        useStore.getState().set({ isVisualizer: false });
        console.log("switch out of portal cam");
      }
    }
  });

  const PortalScene = () => {
    return (
      <>
        {/* <Bloom> */}
        <mesh position={[0, 0, -0.02]}>
          <planeGeometry args={[2.6, 5.1]} attach="geometry" />
          <meshBasicMaterial color="red" />
        </mesh>
        <ambientLight />
        {/* </Bloom> */}
        <mesh ref={mesh}>
          <planeGeometry args={[2.5, 5]} />
          <meshStandardMaterial>
            <RenderTexture attach="map" width={window.innerWidth} height={window.innerHeight}>
              <PerspectiveCamera
                makeDefault
                manual
                fov={50}
                aspect={2.5 / 5}
                position={[0, 0, 5]}
                onUpdate={(c) => c.updateProjectionMatrix()}
              />
              {children}
            </RenderTexture>
          </meshStandardMaterial>
        </mesh>
      </>
    );
  };

  const VisualizerScene = () => {
    return children;
  };

  const ToggledPortal = useToggle(PortalScene, "!isVisualizer");
  const ToggledVisualizer = useToggle(VisualizerScene, "isVisualizer");

  return (
    <>
      <ToggledPortal />
      <ToggledVisualizer />
    </>
  );
}

export default memo(Portal);
