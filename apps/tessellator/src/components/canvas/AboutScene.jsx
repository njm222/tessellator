import { useState, useEffect, memo, Suspense } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import { Stars, useAspect } from "@react-three/drei";
import * as THREE from "three";
import { useStore } from "@/utils/store";
import Text from "./Text";
import { login } from "../../backendClient";
import { Flex, Box } from "@react-three/flex";

const AboutScene = () => {
  const [camera, size] = useThree((state) => [state.camera, state.size]);
  const [refreshToken, router] = useStore((state) => [
    state.refreshToken,
    state.router,
  ]);
  const [vpWidth, vpHeight] = useAspect(size.width, size.height);

  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    return () => {
      document.documentElement.style.cursor = "unset";
    };
  }, []);

  useFrame((state, delta) => {
    if (clicked) {
      camera.position.lerp(new THREE.Vector3(0, 0, -10), delta); // TODO: lerp camera position
    } else {
      camera.position.lerp(new THREE.Vector3(0, 0, 10), delta * 2);
    }
  });

  const handleClick = async () => {
    setClicked(true);
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
    document.documentElement.style.cursor = value ? "pointer" : "unset";
  };

  const SceneLighting = () => {
    return (
      <>
        <ambientLight intensity={0.8} />
        <directionalLight castShadow position={[2.5, 12, 12]} intensity={4} />
        <pointLight position={[20, 20, 20]} />
        <pointLight position={[-20, -20, -20]} intensity={5} />
      </>
    );
  };

  return (
    <Suspense fallback={null}>
      <SceneLighting />
      <Stars radius={10} depth={50} count={10000} factor={1} fade />
      <Flex
        flexDirection="column"
        size={[vpWidth, vpHeight, 0]}
        position={[-vpWidth / 2, vpHeight * 2, -20]}
        justifyContent="center"
        alignItems="center"
      >
        <Box centerAnchor>
          <Text
            onPointerDown={() => handleClick()}
            onPointerEnter={() => setPointer(true)}
            onPointerLeave={() => setPointer(false)}
          >
            about
          </Text>
        </Box>
      </Flex>
    </Suspense>
  );
};

export default memo(AboutScene);
