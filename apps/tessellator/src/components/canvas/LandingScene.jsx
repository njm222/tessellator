import { useState, useEffect, memo, Suspense, useRef } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useStore } from "@/utils/store";
import Text from "./Text";
import { login } from "../../backendClient";
import Particles from "./Particles";
import { Cloud, Sky } from "@react-three/drei";

const LandingScene = () => {
  const camera = useThree((state) => state.camera);
  const [refreshToken, router] = useStore((state) => [
    state.refreshToken,
    state.router,
  ]);
  const [isNavigating, setIsNavigating] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const textRef = useRef();

  useEffect(() => {
    camera.position.set(0, 0, 100);
    return () => {
      document.documentElement.style.cursor = "unset";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useFrame((state, delta) => {
    if (isNavigating) {
      camera.position.lerp(new THREE.Vector3(0, 0, -10), delta * 5);
      textRef.current.scale.lerp(new THREE.Vector3(0.2, 0.2, 0.5), delta * 5);
    } else {
      if (camera.position.z < 0) {
        camera.position.z = 80;
      }
      camera.position.lerp(new THREE.Vector3(0, 0, 40), delta);
    }
  });

  const handleClick = async () => {
    setIsNavigating(true);
    // check for refreshToken
    if (refreshToken) {
      router.push("/dashboard");
      return;
    }
    // if no token present login normally
    setTimeout(async () => {
      const { uri } = await login();
      window.location = uri;
    }, 500);
  };

  const setPointer = (value) => {
    setIsHover(value);
    document.documentElement.style.cursor = value ? "pointer" : "unset";
  };

  // TODO: boundingBox onClick instead of text

  return (
    <>
      <Suspense fallback={null}>
        <ambientLight intensity={0.8} />
        <directionalLight castShadow position={[2.5, 12, 12]} intensity={4} />
        <pointLight position={[-20, -20, -20]} intensity={5} />
        <Text
          ref={textRef}
          isHover={isHover}
          isNavigating={isNavigating}
          onPointerDown={() => handleClick()}
          onPointerEnter={() => setPointer(true)}
          onPointerLeave={() => setPointer(false)}
        >
          {" t e s s e l l a t o r"}
        </Text>
        <Particles count={10000} isNavigating={isNavigating} />
        {Array.from(Array(5).keys()).map((i) => (
          <Cloud
            key={i}
            position={[
              -4 + Math.random() * 8,
              -2 + Math.random() * 4,
              80 - i * 5,
            ]}
            speed={0.2}
            opacity={Math.random()}
          />
        ))}
      </Suspense>
      <Sky
        azimuth={1}
        turbidity={10}
        rayleigh={10}
        inclination={0}
        distance={1000}
        mieCoefficient={0.1}
        mieDirectionalG={0.8}
      />
    </>
  );
};

export default memo(LandingScene);
