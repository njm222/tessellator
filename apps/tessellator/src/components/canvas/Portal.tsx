import { Vector3, Quaternion, Mesh } from "three";
import { memo, MutableRefObject, ReactNode, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { PerspectiveCamera, RenderTexture } from "@react-three/drei";
import { usePortal } from "../../utils/portalContext";

function Portal({ children }: { children: ReactNode }) {
  const meshRef = useRef(new Mesh());
  const portalCamRef = useRef(false);
  const { inPortal, setInPortal } = usePortal();

  // simplify
  useFrame((state, delta) => {
    // !Visualizer state
    if (!inPortal && state.camera && meshRef.current?.position) {
      if (state.camera.position.distanceTo(meshRef.current.position) > 5) {
        // reset camera if moved / rotated
        state.camera.position.lerp(new Vector3(0, 0, 10), delta * 2);
      }
      // if camera is close enough lerp closer
      if (
        !portalCamRef.current &&
        state.camera.position.distanceTo(meshRef.current.position) < 5
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
        state.camera.position.distanceTo(meshRef.current.position) <= 2.1
      ) {
        setInPortal(true);
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
        setInPortal(false);
        portalCamRef.current = false;
        console.log("switch out of portal cam");
      }
    }
  });

  return inPortal ? (
    <>{children}</>
  ) : (
    <PortalScene meshRef={meshRef}>{children}</PortalScene>
  );
}

export default memo(Portal);

const PortalScene = ({
  children,
  meshRef,
}: {
  children: ReactNode;
  meshRef: MutableRefObject<Mesh>;
}) => {
  return (
    <>
      {/* <Bloom> */}
      <mesh position={[0, 0, -0.02]}>
        <planeGeometry args={[2.6, 5.1]} attach="geometry" />
        <meshBasicMaterial color="red" />
      </mesh>
      <ambientLight />
      {/* </Bloom> */}
      <mesh ref={meshRef}>
        <planeGeometry args={[2.5, 5]} />
        <meshStandardMaterial>
          <RenderTexture
            attach="map"
            width={window.innerWidth}
            height={window.innerHeight}
          >
            <PerspectiveCamera
              makeDefault
              manual
              fov={50}
              aspect={2.5 / 5}
              position={[0, 0, 10]}
              onUpdate={(c) => c.updateProjectionMatrix()}
            />
            {children}
          </RenderTexture>
        </meshStandardMaterial>
      </mesh>
    </>
  );
};
