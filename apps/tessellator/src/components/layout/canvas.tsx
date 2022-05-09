import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload } from "@react-three/drei";
import { useStore } from "@/utils/store";
import { useEffect, useRef } from "react";

const LControl = () => {
  const dom = useStore((state) => state.dom);
  const control = useRef(null);

  useEffect(() => {
    if (control) {
      dom.current.style["touch-action"] = "none";
    }
  }, [dom, control]);
  return <OrbitControls ref={control} domElement={dom.current} />;
};

const LCanvas = ({ children }) => {
  const dom = useStore((state) => state.dom);

  return (
    <Canvas
      style={{
        position: "absolute",
        top: 0,
        background: "#131313",
      }}
      onCreated={(state) => state.events.connect(dom.current)}
    >
      {location.pathname === "/" ? null : <LControl />}
      <Preload all />
      {children}
    </Canvas>
  );
};

export default LCanvas;
