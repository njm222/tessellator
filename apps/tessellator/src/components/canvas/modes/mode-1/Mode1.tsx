import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float32BufferAttribute, Points, ShaderMaterial, Vector3 } from "three";

import "../../shaders/ParticleMaterial";

import { hexToVector3 } from "../../../../helpers/hexTo";
import { useAnalyser } from "../../../../utils/analyserContext";
import { usePlayer } from "../../../../utils/playerContext";
import { useControls } from "../../../dom/controls/controlsContext";

import getColour from "./getColour";

const Mode1 = ({ visible }: { visible: boolean }) => {
  const mesh = useRef<Points>(null);
  const { audioAnalyser } = useAnalyser();
  const { colourKey } = useControls();
  const { spotifyAnalyser, trackFeatures } = usePlayer();

  const vertex = new Vector3();
  const normal = new Vector3();

  const P1 = new Vector3();
  const P2 = new Vector3();

  const B = new Vector3();
  const T = new Vector3();
  const N = new Vector3();

  const getIndexOfChord = (max: boolean) => {
    const chords = spotifyAnalyser.getCurrentSegment()?.pitches;
    if (!chords) return 0;
    return chords.indexOf(max ? Math.max(...chords) : Math.min(...chords));
  };

  const calculatePositionOnCurve = (
    u: number,
    p: number,
    q: number,
    radius: number,
    position: Vector3
  ) => {
    const cu = Math.cos(u);
    const su = Math.sin(u);
    const quOverP = (q / p) * u;
    const cs = Math.cos(quOverP);

    position.x = radius * (2 + cs) * 0.5 * cu;
    position.y = radius * (2 + cs) * su * 0.5;
    position.z = radius * Math.sin(quOverP) * 0.5;
  };

  const updateTorusAttributes = () => {
    const radius =
      Math.abs(
        audioAnalyser.kickSection.average - audioAnalyser.snareSection.average
      ) / 5;
    const tube =
      (audioAnalyser.bassSection.average - audioAnalyser.snareSection.average) /
      5;
    const tubularSegments = Math.ceil(audioAnalyser.midSection.average);
    const radialSegments = Math.ceil(audioAnalyser.midSection.average);
    const p = getIndexOfChord(trackFeatures.valence < 0.5);
    const q = getIndexOfChord(
      (spotifyAnalyser.getCurrentSection()?.key ?? 0) % 2 === 0
    );

    return [radius, tube, tubularSegments, radialSegments, p + 1, q + 1];
  };

  // TODO: move to utils / helpers
  const getTorusBufferAttributes = (
    radius: number,
    tube: number,
    tubularSegments: number,
    radialSegments: number,
    p: number,
    q: number
  ) => {
    /* generate torus buffer */

    // buffers
    const indices = [];
    const vertices = [];
    const normals = [];
    const uvs = [];

    // reset variables

    vertex.set(0, 0, 0);
    normal.set(0, 0, 0);

    P1.set(0, 0, 0);
    P2.set(0, 0, 0);

    B.set(0, 0, 0);
    T.set(0, 0, 0);
    N.set(0, 0, 0);

    // generate vertices, normals and uvs

    for (let i = 0; i <= tubularSegments; ++i) {
      // the radian "u" is used to calculate the position on the torus curve of the current tubular segment

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
        // first we orient the extrusion with our basis vectors, then we add it to the current position on the curve

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
    if (!visible) return;
    if (!mesh.current) return;
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

    spotifyAnalyser.bars.counter % 2 === 0
      ? (mesh.current.rotation.z -= audioAnalyser.snareSection.energy / 2000)
      : (mesh.current.rotation.z += audioAnalyser.snareSection.energy / 2000);

    (mesh.current.material as ShaderMaterial).uniforms.uColour.value =
      hexToVector3(getColour(colourKey, spotifyAnalyser, audioAnalyser));
    (mesh.current.material as ShaderMaterial).uniforms.uSize.value = Math.max(
      Math.min(
        audioAnalyser.analyserData.averageFrequency * trackFeatures.energy,
        4.0
      ),
      0.5
    );

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
  });

  return (
    <points ref={mesh} visible={visible}>
      <bufferGeometry attach="geometry" />
      <particleMaterial attach="material" depthWrite={false} transparent />
    </points>
  );
};

export default Mode1;
