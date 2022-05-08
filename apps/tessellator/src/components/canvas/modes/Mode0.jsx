import React, { useRef, memo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useAspect } from "@react-three/drei";
import simplex from "simplex-noise";
import * as THREE from "three";
import getColour from "@/helpers/getColour";
import { setState, getState } from "@/utils/store";

let simplexNoise = new simplex(Math.round(Math.random() * 1000));

function Terrain() {
  // Get reference of the terrain
  const terrainGeometryRef = useRef();
  const terrainMaterialRef = useRef();
  const barChangeRef = useRef();
  const time = useRef(0);
  const { size } = useThree();
  const [vpWidth, vpHeight] = useAspect(size.width, size.height);

  // Set the grid size and resolution
  const gridSize = [vpWidth * 1.5, vpHeight * 1.5];
  const gridRes = [128, 128];

  useFrame((state, delta) => {
    if (
      !getState().audioAnalyzer ||
      !getState().spotifyAnalyzer ||
      !getState().spotifyFeatures
    ) {
      return;
    }
    const {
      avFreq,
      snareObject,
      bassObject,
      kickObject,
      midsObject,
      highsObject,
    } = getState().audioAnalyzer;
    const { section, barCounter, bar } = getState().spotifyAnalyzer;
    const { energy, danceability } = getState().spotifyFeatures;

    // Set the variables for simplex
    const nAmplitude = Math.max((avFreq + snareObject?.energy) / 500, 0.1);
    const nXScale = energy * (midsObject?.average * 0.05);
    const nYScale = danceability * (kickObject?.average * 0.05);

    // Get a reference of the terrain grid's geometry
    const terrainGeometry = terrainGeometryRef.current;

    // Wait for Spotify to load
    if (!nXScale || !nYScale || !nAmplitude || !terrainGeometry) {
      return;
    }

    // Get the terrain vertices
    const { position } = terrainGeometry.attributes;

    // Get the current time
    time.current += midsObject?.energy / 20000;

    // For each vertex set the position on the z-axis based on the noise function
    for (let i = 0; i < position.count; i++) {
      const z = simplexNoise.noise3D(
        position.getX(i) / (nXScale - bassObject?.energy / 255) -
          highsObject?.average / 10,
        position.getY(i) / (nYScale - snareObject?.energy / 255) -
          highsObject?.average / 10,
        time.current
      );
      position.setZ(i, Number.isNaN(z) ? 0 : z * nAmplitude);
    }

    // Update the vertices
    position.needsUpdate = true;
    terrainGeometry.computeVertexNormals();
    terrainGeometry.normalsNeedUpdate = true;

    // Update the material colour
    terrainMaterialRef.current.color.lerp(
      new THREE.Color(getColour()),
      delta * 5
    );

    // Update simplex seed on every section change
    if (barChangeRef.current !== bar.start) {
      simplexNoise = new simplex(Math.round(Math.random() * 1000));
      setState({ colourKey: Math.floor(Math.random() * 3) });
      barChangeRef.current = bar.start;
    }

    // Switch wireframe on every bar change
    terrainMaterialRef.current.wireframe = barCounter % 2 === 0;
  });

  return (
    <mesh
      receiveShadow
      position={[0, 2.5, -2.5]}
      rotation={[-Math.PI / 5, 0, 0]}
    >
      <planeBufferGeometry
        attach="geometry"
        args={[...gridSize, ...gridRes]}
        ref={terrainGeometryRef}
      />
      <meshPhongMaterial attach="material" ref={terrainMaterialRef} />
    </mesh>
  );
}

const Mode0 = () => {
  console.log("mode0");
  return <Terrain />;
};

export default memo(Mode0);
