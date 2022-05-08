import { useRef } from "react";
import { useThree, useFrame } from "@react-three/fiber";

const Main = ({ children }) => {
  const scene = useRef();
  const { gl, camera } = useThree();
  useFrame(() => {
    gl.autoClear = false;
    gl.clearDepth();
    gl.render(scene.current, camera);
  }, 2);
  return <scene ref={scene}>{children}</scene>;
};

export default Main;
