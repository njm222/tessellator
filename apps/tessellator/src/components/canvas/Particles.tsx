import React, { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { generateRandomNumber, hslToHex } from "core";
import {
  Color,
  ColorRepresentation,
  InstancedMesh,
  MeshPhongMaterial,
  Object3D,
  PointLight,
} from "three";

// TODO: decouple isNavigating
export default function Particles({
  count,
  isNavigating,
}: {
  count: number;
  isNavigating: boolean;
}) {
  const mesh = useRef(new InstancedMesh(undefined, undefined, count));
  const material = useRef(new MeshPhongMaterial());
  const light = useRef(new PointLight());
  const { size } = useThree();
  const aspect = size.width / size.height;
  const particleColor = new Color(getColor(0, 0));

  const dummy = useMemo(() => new Object3D(), []);
  // Generate some random positions, speed factors and timings
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const t = generateRandomNumber(0, 1000);
      const factor = generateRandomNumber(10, 1000);
      const speed = 0.001 + Math.random() / 5000;
      const xFactor = generateRandomNumber(-2, 2);
      let yFactor = generateRandomNumber(-10, 10);

      // makes a gap in the center
      while (yFactor < 19 && yFactor > -19) {
        yFactor = generateRandomNumber(-20, 20);
      }

      const zFactor = Math.random() * 2;
      temp.push({
        t,
        factor,
        speed,
        xFactor,
        yFactor,
        zFactor,
        mx: 0,
        my: 0,
        mz: 0,
      });
    }
    return temp;
  }, [count]);
  // The innards of this hook will run every frame
  useFrame((state, delta) => {
    // Makes the light follow the mouse
    light.current.position.set(
      state.mouse.x / aspect,
      state.mouse.y / aspect,
      0
    );

    if (!mesh.current) return;

    // Run through the randomized data to calculate some movement
    particles.forEach((particle, i) => {
      let { t, factor, speed, xFactor, yFactor, zFactor } = particle;
      // There is no sense or reason to any of this, just messing around with trigonometric functions
      t = particle.t += speed;
      const a = Math.cos(t) + Math.sin(t * 1) / 10;
      const b = Math.sin(t) + Math.cos(t * 2) / 10;
      const s = Math.cos(t);

      if (isNavigating) {
        const factor = 0.05;

        particle.mx += particle.mx * factor;
        particle.my += particle.my * factor;
        particle.mz += particle.mz * factor;
      } else {
        const offset = -0.25;
        const limit = 0.5;
        particle.mx +=
          (Math.min(
            Math.max(state.mouse.x + offset, -limit + offset),
            limit + offset
          ) *
            size.width -
            particle.mx) *
          0.01;
        particle.my += (state.mouse.y * -size.height - particle.my) * 0.01;
      }
      // Update the dummy object
      dummy.position.set(
        (particle.mx / 10) * a +
          xFactor +
          Math.sin((t / 10) * factor) +
          (Math.cos(t * 1) * factor) / 10,
        (particle.my / 10) * b +
          yFactor +
          Math.sin((t / 10) * factor) +
          (Math.cos(t * 2) * factor) / 100,
        (particle.my / 10) * b +
          zFactor +
          Math.cos((t / 10) * factor) +
          (Math.sin(t * 3) * factor) / 10
      );
      dummy.scale.set(s, s, s);
      dummy.rotation.set(s * 5, s * 5, s * 5);
      dummy.updateMatrix();
      // And apply the matrix to the instanced item
      mesh.current.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;

    // update color
    material.current.color.lerp(
      particleColor.set(getColor(state.mouse.x, state.mouse.y)),
      delta * 5
    );
  });
  return (
    <>
      <pointLight color="darkblue" distance={100} intensity={10} ref={light} />
      <instancedMesh args={[undefined, undefined, count]} ref={mesh}>
        <dodecahedronGeometry args={[0.1, 0]} />
        <meshPhongMaterial color="#000" ref={material} />
      </instancedMesh>
    </>
  );
}

function getColor(x: number, y: number) {
  return hslToHex(
    ((x + 1) / 2) * 360,
    ((y + 1) / 2) * 50,
    100
  ) as ColorRepresentation;
}
