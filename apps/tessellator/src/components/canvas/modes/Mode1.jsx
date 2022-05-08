import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Vector3, Float32BufferAttribute } from "three";
import { useStore } from "@/utils/store";
import "../shaders/ParticleMaterial";

const Mode1 = () => {
  const mesh = useRef();
  const audioAnalyzer = useStore((state) => state.audioAnalyzer);
  const spotifyAnalyzer = useStore((state) => state.spotifyAnalyzer);
  const spotifyFeatures = useStore((state) => state.spotifyFeatures);

  const calculatePositionOnCurve = (u, p, q, radius, position) => {
    const cu = Math.cos(u);
    const su = Math.sin(u);
    const quOverP = (q / p) * u;
    const cs = Math.cos(quOverP);

    position.x = radius * (2 + cs) * 0.5 * cu;
    position.y = radius * (2 + cs) * su * 0.5;
    position.z = radius * Math.sin(quOverP) * 0.5;
  };

  const getTimbreSum = () => {
    return Math.ceil(spotifyAnalyzer.timbre.reduce((acc, curr) => acc + curr));
  };

  const getSegments = () => {
    const pitchConfidence = 0.5;
    const chords = spotifyAnalyzer.pitches.filter(
      (pitch) => pitch > pitchConfidence
    );
    return chords.reduce((acc, curr) => acc + curr);
  };

  const updateTorusAttributes = () => {
    const radius = audioAnalyzer.snareObject.energy / 100;
    const tube =
      (audioAnalyzer.bassObject.energy - audioAnalyzer.kickObject.energy) / 5;
    const tubularSegments = Math.ceil(audioAnalyzer.midsObject.average);
    const radialSegments = Math.ceil(audioAnalyzer.midsObject.energy);
    const p = Math.ceil(getSegments() * 4);
    const q = getTimbreSum() / (spotifyFeatures.energy * 30);

    return [radius, tube, tubularSegments, radialSegments, p, q];
  };

  const getTorusBufferAttributes = (
    radius,
    tube,
    tubularSegments,
    radialSegments,
    p,
    q
  ) => {
    /* generate torus buffer */

    // buffers
    const indices = [];
    const vertices = [];
    const normals = [];
    const uvs = [];

    // helper variables

    const vertex = new Vector3();
    const normal = new Vector3();

    const P1 = new Vector3();
    const P2 = new Vector3();

    const B = new Vector3();
    const T = new Vector3();
    const N = new Vector3();

    // generate vertices, normals and uvs

    for (let i = 0; i <= tubularSegments; ++i) {
      // the radian "u" is used to calculate the position on the torus curve of the current tubular segement

      const u = (i / tubularSegments) * p * Math.PI * 2;

      // now we calculate two points. P1 is our current position on the curve, P2 is a little farther ahead.
      // these points are used to create a special "coordinate space", which is necessary to calculate the correct vertex positions

      calculatePositionOnCurve(u, p, q, radius, P1);
      calculatePositionOnCurve(u + 0.01, p, q, radius, P2);

      // calculate orthonormal basis

      T.subVectors(P2, P1);
      N.addVectors(P2, P1);
      B.crossVectors(T, N);
      N.crossVectors(B, T);

      // normalize B, N.
      B.normalize();
      N.normalize();
      // T can be ignored, we don't use it

      for (let j = 0; j <= radialSegments; ++j) {
        // now calculate the vertices. they are nothing more than an extrusion of the torus curve.
        // because we extrude a shape in the xy-plane, there is no need to calculate a z-value.

        const v = (j / radialSegments) * Math.PI * 2;
        const cx = -tube * Math.cos(v);
        const cy = tube * Math.sin(v);

        // now calculate the final vertex position.
        // first we orient the extrusion with our basis vectos, then we add it to the current position on the curve

        vertex.x = P1.x + (cx * N.x + cy * B.x);
        vertex.y = P1.y + (cx * N.y + cy * B.y);
        vertex.z = P1.z + (cx * N.z + cy * B.z);

        vertices.push(vertex.x, vertex.y, vertex.z);

        // normal (P1 is always the center/origin of the extrusion, thus we can use it to calculate the normal)

        normal.subVectors(vertex, P1).normalize();

        normals.push(normal.x, normal.y, normal.z);

        // uv
        uvs.push(i / tubularSegments);
        uvs.push(j / radialSegments);
      }
    }

    // generate indices
    for (let j = 1; j <= tubularSegments; j++) {
      for (let i = 1; i <= radialSegments; i++) {
        // indices
        const a = (radialSegments + 1) * (j - 1) + (i - 1);
        const b = (radialSegments + 1) * j + (i - 1);
        const c = (radialSegments + 1) * j + i;
        const d = (radialSegments + 1) * (j - 1) + i;

        // faces
        indices.push(a, b, d);
        indices.push(b, c, d);
      }
    }

    return [indices, vertices, normals, uvs];
  };

  useFrame(() => {
    // update torus attributes
    const [
      radius = 10,
      tube = 5,
      tubularSegments = 5,
      radialSegments = 5,
      p = 2,
      q = 3,
    ] = updateTorusAttributes();

    const [indices, vertices, normals, uvs] = getTorusBufferAttributes(
      radius,
      tube,
      tubularSegments,
      radialSegments,
      p,
      q
    );

    spotifyAnalyzer.barCounter % 2 === 0
      ? (mesh.current.rotation.z -= audioAnalyzer.snareObject.energy / 2000)
      : (mesh.current.rotation.z += audioAnalyzer.snareObject.energy / 2000);

    mesh.current.geometry.setIndex(indices);
    mesh.current.geometry.setAttribute(
      "position",
      new Float32BufferAttribute(vertices, 3)
    );
    mesh.current.geometry.setAttribute(
      "normal",
      new Float32BufferAttribute(normals, 3)
    );
    mesh.current.geometry.setAttribute(
      "uv",
      new Float32BufferAttribute(uvs, 3)
    );
    mesh.current.geometry.verticesNeedUpdate = true;
  });
  return (
    <>
      <points ref={mesh}>
        <bufferGeometry attach="geometry" />
        <particleMaterial transparent depthWrite={false} />
      </points>
    </>
  );
};

export default Mode1;
