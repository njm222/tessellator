import React, { memo, MutableRefObject, ReactNode, useRef } from "react";
import { PerspectiveCamera, RenderTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Camera } from "@react-three/fiber/dist/declarations/src/core/events";
import { EffectComposer, SelectiveBloom } from "@react-three/postprocessing";
import { Mesh,Quaternion, Vector3 } from "three";

import { usePortal } from "../../utils/portalContext";

const [portalWidth, portalHeight] = [3, 7];

function Portal({ children }: { children: ReactNode }) {
  const meshRef = useRef(new Mesh());
  const portalCamRef = useRef(false);
  const { inPortal, setInPortal } = usePortal();

  function handleOutsidePortal(camera: Camera, delta: number) {
    if (camera.position.distanceTo(meshRef.current.position) > 5) {
      // reset camera if moved / rotated
      camera.position.lerp(new Vector3(0, 0, 10), delta);
    }
    // if camera is close enough lerp closer
    if (
      !portalCamRef.current &&
      camera.position.distanceTo(meshRef.current.position) < 5
    ) {
      // position camera center
      camera.position.lerp(new Vector3(0, 0, 2), delta * 5);
      camera.updateProjectionMatrix();
      camera.updateMatrixWorld();
    }
    // if camera is very close switch cams
    if (
      !portalCamRef.current &&
      camera.position.distanceTo(meshRef.current.position) <= 2.1
    ) {
      // rotate camera center
      camera.quaternion.slerp(new Quaternion(-Math.PI * 2, 0, 0, 1), delta * 5);
      setInPortal(true);
      portalCamRef.current = true;
    }
  }

  function handleInsidePortal(camera: Camera, delta: number) {
    // reset camera if moved / rotated
    camera.position.lerp(new Vector3(0, 0, 3), delta * 2);
    // if cam is far lerp further
    if (camera.position.z > 5) {
      // rotate camera center
      camera.quaternion.slerp(new Quaternion(-Math.PI * 2, 0, 0, 1), delta * 5);
      // position camera center
      camera.position.lerp(new Vector3(0, 0, 10), delta * 5);
      camera.updateProjectionMatrix();
      camera.updateMatrixWorld();
    }
    // if cam is very far switch cams
    if (camera.position.z > 8) {
      setInPortal(false);
      portalCamRef.current = false;
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
  const meshOutlineRef = useRef(new Mesh());
  return (
    <group position={[0, 1, 0]}>
      <EffectComposer>
        <SelectiveBloom
          height={512}
          luminanceSmoothing={0.1}
          luminanceThreshold={0.1}
          selection={meshOutlineRef}
          width={512}
        />
      </EffectComposer>
      <mesh position={[0, 0, -0.02]} ref={meshOutlineRef}>
        <planeGeometry args={[portalWidth + 0.1, portalHeight + 0.1]} />
        <meshBasicMaterial color="red" />
      </mesh>
      <mesh ref={meshRef}>
        <planeGeometry args={[portalWidth, portalHeight]} />
        <meshStandardMaterial>
          <RenderTexture
            attach="map"
            height={window.innerHeight}
            width={window.innerWidth}
          >
            <PerspectiveCamera
              aspect={portalWidth / portalHeight}
              fov={50}
              makeDefault
              manual
              onUpdate={(c) => c.updateProjectionMatrix()}
              position={[0, 0, 10]}
            />
            {children}
          </RenderTexture>
        </meshStandardMaterial>
      </mesh>
    </group>
  );
};
