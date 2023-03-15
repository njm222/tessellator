import React, { useRef, memo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useAspect } from "@react-three/drei";
import * as THREE from "three";
import getColour from "./getColour";
import { createNoise3D } from "simplex-noise";
import { useAnalyser } from "../../../../utils/analyserContext";
import { usePlayer } from "../../../../utils/playerContext";
import { useControls } from "../../../dom/controls/controlsContext";

let simplexNoise = createNoise3D();

function Terrain() {
  const { audioAnalyser } = useAnalyser();
  const { spotifyAnalyser, trackFeatures } = usePlayer();
  const { colourKey } = useControls();

  // Get reference of the terrain
  const terrainGeometryRef = useRef(new THREE.PlaneGeometry());
  const terrainMaterialRef = useRef(new THREE.MeshPhongMaterial());
  const time = useRef(0);
  const { viewport } = useThree();
  const [vpWidth, vpHeight] = useAspect(viewport.width, viewport.height, 2);

  useFrame((_, delta) => {
    if (!trackFeatures || !spotifyAnalyser?.tatums?.current || !audioAnalyser) {
      return;
    }

    const { snareSection, bassSection, kickSection, highSection } =
      audioAnalyser;
    const segment = spotifyAnalyser.getCurrentSegment();
    const { energy, danceability, valence } = trackFeatures;

    // Set the variables for simplex
    const nAmplitude = Math.max(
      Math.abs(snareSection?.average - kickSection?.average) /
        Math.max(highSection?.average * valence, 15),
      0.1
    );
    const xScale = Math.max(
      danceability * Math.abs(bassSection?.average - kickSection?.average),
      0.5
    );
    const yScale = Math.max(
      energy * Math.abs(bassSection?.average - snareSection?.average),
      0.5
    );

    // Get the current time
    time.current += segment?.timbre?.length ? segment?.timbre[11] / 500 : 1;

    // Get the references of the terrain
    const terrainGeometry: THREE.PlaneGeometry = terrainGeometryRef.current;
    const terrainMaterial = terrainMaterialRef.current;

    // Wait for terrain to load
    if (!terrainGeometry || !terrainMaterial) {
      return;
    }

    terrainMaterial.wireframe = true;

    // Get the terrain vertices
    const { position } = terrainGeometry.attributes;

    // For each vertex set the position on the z-axis based on the noise function
    for (let i = 0; i < position.count; i++) {
      const z = simplexNoise(
        (position as THREE.BufferAttribute).getX(i) / xScale,
        (position as THREE.BufferAttribute).getY(i) / yScale,
        time.current
      );
      (position as THREE.BufferAttribute).setZ(
        i,
        Number.isNaN(z) ? 0 : z * nAmplitude
      );
    }

    // Update the material colour
    terrainMaterialRef.current.color.lerp(
      new THREE.Color(getColour(colourKey, spotifyAnalyser, audioAnalyser)),
      delta * 5
    );

    // Update the vertices
    position.needsUpdate = true;
    terrainGeometry.computeVertexNormals();
    // terrainGeometry.normalsNeedUpdate = true;
  });

  return (
    <mesh receiveShadow position={[0, 2, -1]} rotation={[-Math.PI / 5, 0, 0]}>
      <planeGeometry
        args={[vpWidth, vpHeight, 128, 128]}
        ref={terrainGeometryRef}
      />
      <meshPhongMaterial ref={terrainMaterialRef} />
    </mesh>
  );
}

const Mode0 = () => {
  return <Terrain />;
};

export default memo(Mode0);
