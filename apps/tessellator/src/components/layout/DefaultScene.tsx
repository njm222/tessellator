import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, Stats } from "@react-three/drei";
import { environment } from "../../environments/environment";
export default function DefaultScene({ children }: { children: JSX.Element }) {
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
      <directionalLight castShadow position={[2.5, 12, 12]} intensity={4} />
      <pointLight position={[-20, -20, -20]} intensity={5} />
      {children}
      <Preload all />
      <OrbitControls />
      {environment.production ? null : <Stats />}
    </Canvas>
  );
}