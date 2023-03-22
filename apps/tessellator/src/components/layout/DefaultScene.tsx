import { ReactNode } from "react";
import { OrbitControls, Preload, Stats } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

import { environment } from "../../environments/environment";

export default function DefaultScene({ children }: { children: ReactNode }) {
  // Everything defined in here will persist between route changes, only children are swapped
  return (
    <Canvas
      style={{
        position: "absolute",
        top: 0,
        background: "#000",
      }}
    >
      <ambientLight intensity={0.8} />
      <directionalLight castShadow intensity={4} position={[2.5, 12, 12]} />
      <pointLight intensity={5} position={[-20, -20, -20]} />
      {children}
      <Preload all />
      <OrbitControls />
      {environment.production ? null : <Stats />}
    </Canvas>
  );
}
