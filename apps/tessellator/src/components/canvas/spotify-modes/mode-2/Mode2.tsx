import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import {
  Color,
  InstancedMesh,
  MathUtils,
  NoBlending,
  Object3D,
  Vector3,
} from "three";

import { useAnalyser } from "../../../../utils/analyserContext";
import { usePlayer } from "../../../../utils/playerContext";
import { BasicInstanceMaterial } from "../../shaders/basic-instance/BasicInstanceMaterial";
import { ModeProps } from "../SpotifyModes";
import { useGetColor } from "../useGetColor";

const Mode2 = ({ opacity }: ModeProps) => {
  const count = 8000;
  const tempObject = new Object3D();
  const mesh = useRef<InstancedMesh>(
    new InstancedMesh(undefined, undefined, count)
  );
  const materialRef = useRef(new BasicInstanceMaterial());
  const colorRef = useRef(new Color());
  const tempVector = new Vector3();
  const tempColor = new Color();

  const { getColor } = useGetColor();
  const { audioAnalyser } = useAnalyser();
  const { spotifyAnalyser, trackFeatures } = usePlayer();

  useFrame((state, delta) => {
    if (!mesh.current) return;

    const { uOpacity, uColor } = materialRef.current.uniforms;

    uOpacity.value = MathUtils.lerp(uOpacity.value, opacity, delta);
    if (uOpacity.value <= 0.01) {
      materialRef.current.visible = false;
      return;
    }
    materialRef.current.visible = true;

    tempColor.lerp(
      colorRef.current.set(getColor()),
      delta * 10 * (1 - trackFeatures.energy)
    );

    uColor.value = tempColor;

    const zValue = 10 * trackFeatures.danceability;
    const scale = Math.min(
      Math.max(
        Math.abs(
          (audioAnalyser.bassSection.average -
            audioAnalyser.snareSection.average) /
            5
        ),
        0.01
      ),
      2
    );

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

    mesh.current.position.lerp(
      tempVector.set(
        0,
        0,
        zValue * (spotifyAnalyser.beats.counter % 2 === 0 ? 1 : -1)
      ),
      delta * (1 - trackFeatures.energy)
    );

    spotifyAnalyser.bars.counter % 2 === 0
      ? (mesh.current.rotation.y += audioAnalyser.midSection.average / 10000) *
          spotifyAnalyser.bars.current.confidence >
        0.5
        ? 1
        : -1
      : (mesh.current.rotation.x += audioAnalyser.midSection.average / 10000) *
          spotifyAnalyser.bars.current.confidence >
        0.5
      ? 1
      : -1;

    (mesh.current.material as any).wireframe =
      spotifyAnalyser.beats.counter % 2 === 0;

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
