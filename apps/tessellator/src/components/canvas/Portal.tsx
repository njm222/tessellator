import React, {
  memo,
  MutableRefObject,
  ReactNode,
  useRef,
  useTransition,
} from "react";
import { PerspectiveCamera, RenderTexture } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { Camera } from "@react-three/fiber/dist/declarations/src/core/events";
import { Mesh, Quaternion, Vector3 } from "three";

import { usePortal } from "../../utils/portalContext";

const [portalWidth, portalHeight] = [3, 7];

function Portal({ children }: { children: ReactNode }) {
  const [isPending, startTransition] = useTransition();
  const meshRef = useRef(new Mesh());
  const portalCamRef = useRef(false);
  const { inPortal, setInPortal } = usePortal();
  const cameraVec = new Vector3(0, 0, 0);
  const cameraQuat = new Quaternion(0, 0, 0, 0);

  function handleOutsidePortal(camera: Camera, delta: number) {
    if (camera.position.distanceTo(meshRef.current.position) > 5) {
      // reset camera if moved / rotated
      camera.position.lerp(cameraVec.set(0, 0, 10), delta);
    }
    // if camera is close enough lerp closer
    if (
      !portalCamRef.current &&
      camera.position.distanceTo(meshRef.current.position) < 5
    ) {
      // position camera center
      camera.position.lerp(cameraVec.set(0, 0, 2), delta * 5);
    }
    // if camera is very close switch cams
    if (
      !portalCamRef.current &&
      camera.position.distanceTo(meshRef.current.position) <= 2.1
    ) {
      if (isPending) return;
      startTransition(() => {
        // rotate camera center
        camera.quaternion.slerp(
          cameraQuat.set(-Math.PI * 2, 0, 0, 1),
          delta * 5
        );
        setInPortal(true);
        portalCamRef.current = true;
      });
    }
  }

  function handleInsidePortal(camera: Camera, delta: number) {
    // reset camera if moved / rotated
    camera.position.lerp(cameraVec.set(0, 0, 3), delta * 2);
    // if cam is far lerp further
    if (camera.position.z > 5) {
      // rotate camera center
      camera.quaternion.slerp(cameraQuat.set(-Math.PI * 2, 0, 0, 1), delta * 5);
      // position camera center
      camera.position.lerp(cameraVec.set(0, 0, 10), delta * 5);
    }
    // if cam is very far switch cams
    if (camera.position.z > 8) {
      if (isPending) return;
      startTransition(() => {
        setInPortal(false);
        portalCamRef.current = false;
      });
    }
  }

  useFrame((state, delta) => {
    if (!state.camera) {
      return;
    }

    if (!inPortal && meshRef.current?.position) {
      handleOutsidePortal(state.camera, delta);
      return;
    }

    // Visualizer state
    if (portalCamRef.current) {
      handleInsidePortal(state.camera, delta);
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
  const size = useThree((state) => state.size);
  const meshOutlineRef = useRef(new Mesh());
  return (
    <group position={[0, 1, 0]}>
      <mesh position={[0, 0, -0.01]} receiveShadow ref={meshOutlineRef}>
        <planeGeometry args={[portalWidth + 0.1, portalHeight + 0.1]} />
        <meshBasicMaterial color="red" />
      </mesh>
      <mesh receiveShadow ref={meshRef}>
        <planeGeometry args={[portalWidth, portalHeight]} />
        <meshBasicMaterial>
          <RenderTexture
            attach="map"
            eventPriority={1}
            height={size.height / 3}
            renderPriority={1}
            sourceFile={null}
            width={size.width / 3}
          >
            <PerspectiveCamera
              aspect={portalWidth / portalHeight}
              fov={85}
              makeDefault
              manual
              onUpdate={(c) => c.updateProjectionMatrix()}
              position={[0, 0, 5]}
            />
            <ambientLight intensity={0.8} />
            {children}
          </RenderTexture>
        </meshBasicMaterial>
      </mesh>
    </group>
  );
};
