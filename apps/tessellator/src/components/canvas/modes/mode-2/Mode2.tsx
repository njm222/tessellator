import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import {
  Color,
  ColorRepresentation,
  InstancedMesh,
  MathUtils,
  NoBlending,
  Object3D,
  Vector3,
} from "three";

import { BasicInstanceMaterial } from "../../shaders/basic-instance/BasicInstanceMaterial";

export type Mode2Props = { getOpacity: () => number } & {
  getColor: () => ColorRepresentation;
  getWireframe: () => boolean;
  getZValue: () => number;
  getDeltaFactor: () => number;
  getXRotation: () => number;
  getYRotation: () => number;
  getScale: () => number;
};

const Mode2 = ({
  getZValue,
  getColor,
  getDeltaFactor,
  getOpacity,
  getWireframe,
  getXRotation,
  getYRotation,
  getScale,
}: Mode2Props) => {
  const count = 8000;
  const tempObject = new Object3D();
  const mesh = useRef<InstancedMesh>(
    new InstancedMesh(undefined, undefined, count)
  );
  const materialRef = useRef(new BasicInstanceMaterial());
  const colorRef = useRef(new Color());
  const tempVector = new Vector3();
  const tempColor = new Color();

  useFrame((state, delta) => {
    if (!mesh.current) return;

    const { uOpacity, uColor } = materialRef.current.uniforms;

    uOpacity.value = MathUtils.lerp(uOpacity.value, getOpacity(), delta);
    if (uOpacity.value <= 0.01) {
      materialRef.current.visible = false;
      return;
    }
    materialRef.current.visible = true;

    const dynamicDelta = delta * getDeltaFactor();
    tempColor.lerp(colorRef.current.set(getColor()), dynamicDelta);

    uColor.value = tempColor;

    const zValue = getZValue();
    const scale = Math.min(Math.max(getScale(), 0.01), 2);

    let i = 0;
    for (let x = 0; x < 20; x++) {
      for (let y = 0; y < 20; y++) {
        for (let z = 0; z < 20; z++) {
          const id = i++;
          tempObject.position.set(10 - x, 10 - y, 10 - z);
          tempObject.updateMatrix();
          tempObject.scale.setScalar(scale);

          mesh.current.setMatrixAt(id, tempObject.matrix);
        }
      }
    }

    mesh.current.position.lerp(tempVector.set(0, 0, zValue), dynamicDelta);

    mesh.current.rotation.x += getXRotation();
    mesh.current.rotation.y += getYRotation();
    (mesh.current.material as any).wireframe = getWireframe();

    mesh.current.instanceMatrix.needsUpdate = true;
    if (!mesh.current.instanceColor) return;
    mesh.current.instanceColor.needsUpdate = true;
  });

  return (
    <instancedMesh args={[undefined, undefined, count]} ref={mesh}>
      <boxGeometry args={[0.1, 0.1, 0.1]} />
      <basicInstanceMaterial
        blending={NoBlending}
        ref={materialRef}
        transparent
      />
    </instancedMesh>
  );
};

export default Mode2;
