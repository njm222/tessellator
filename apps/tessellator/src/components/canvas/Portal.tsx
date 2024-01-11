import React, { memo, ReactNode, useRef, useState, useTransition } from "react";
import { MeshPortalMaterial, PortalMaterialType } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Camera } from "@react-three/fiber/dist/declarations/src/core/events";
import { EffectComposer } from "@react-three/postprocessing";
import { easing } from "maath";
import { DoubleSide, Mesh, Vector3 } from "three";

import { ShockWave, ShockWaveEffect } from "./effects/shockwave/Shockwave";
import { PortalMaterial } from "./shaders/portal/PortalMaterial";

const [portalWidth, portalHeight] = [3, 7];

function Portal({ children }: { children: ReactNode }) {
  const meshRef = useRef(new Mesh());
  const [inPortal, setInPortal] = useState(false);
  const meshOutlineRef = useRef(new Mesh());
  const materialRef = useRef(new PortalMaterial());
  const portalRef = useRef<PortalMaterialType>(null);
  const shockWaveRef = useRef<ShockWaveEffect>(null);
  const cameraVec = new Vector3(0, 0, 0);
  const [isPending, startTransition] = useTransition();

  function handleOutsidePortal(camera: Camera, delta: number) {
    if (camera.position.distanceTo(meshRef.current.position) > 5) {
      // reset camera if moved / rotated
      camera.position.lerp(cameraVec.set(0, 0, 10), delta);
    }
    // if camera is close enough lerp closer
    if (camera.position.distanceTo(meshRef.current.position) < 5) {
      // position camera center
      camera.position.lerp(cameraVec.set(0, 0, 2), delta * 2);
      if (isPending) return;
      startTransition(() => {
        shockWaveRef.current?.explode();
      });
    }
    // if camera is very close switch cams
    if (camera.position.distanceTo(meshRef.current.position) <= 2.1) {
      setInPortal(true);
    }
  }

  function handleInsidePortal(camera: Camera, delta: number) {
    // reset camera if moved / rotated
    camera.position.lerp(cameraVec.set(0, 0, 3), delta * 2);

    // if cam is far lerp further
    if (camera.position.z > 3) {
      // position camera center
      camera.position.lerp(cameraVec.set(0, 0, 10), delta);
      if (isPending) return;
      startTransition(() => {
        shockWaveRef.current?.explode();
      });
    }

    // if cam is very far switch cams
    if (camera.position.z > 6) {
      setInPortal(false);
      return;
    }
  }

  useFrame((state, delta) => {
    if (!portalRef.current) return;

    easing.damp(portalRef.current, "blend", inPortal ? 1 : 0, 0.5, delta * 10);

    if (!inPortal && meshRef.current?.position) {
      handleOutsidePortal(state.camera, delta);
      return;
    }

    // Visualizer state
    if (inPortal) {
      handleInsidePortal(state.camera, delta);
    }
  });

  return (
    <>
      <mesh position={[0, 0, -0.1]} receiveShadow ref={meshOutlineRef}>
        <roundedPlaneGeometry
          args={[portalWidth + 0.25, portalHeight + 0.25, 0.4, 3]}
        />
        <portalMaterial ref={materialRef} side={DoubleSide} />
      </mesh>
      <mesh position={[0, 0, 0]} ref={meshRef}>
        <roundedPlaneGeometry args={[portalWidth, portalHeight, 0.4]} />
        <MeshPortalMaterial blur={0.8} ref={portalRef} renderPriority={3}>
          <color args={["#000"]} attach="background" />
          {children}
        </MeshPortalMaterial>
      </mesh>
      <EffectComposer disableNormalPass multisampling={0} renderPriority={2}>
        <ShockWave ref={shockWaveRef} />
      </EffectComposer>
    </>
  );
}

export default memo(Portal);
