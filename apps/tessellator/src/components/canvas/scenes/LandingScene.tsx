import React, { useState, useEffect, memo, Suspense } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import { Vector2, Vector3 } from "three";
import { Text } from "../Text";
import { loginUser } from "core";
import Particles from "../Particles";
import { Bounds, Sky } from "@react-three/drei";
import { useAuth } from "../../../utils/authContext";
import { useRouter } from "next/router";
import { EffectComposer, Bloom, Glitch } from "@react-three/postprocessing";

const LandingScene = (props: { r3f?: boolean }) => {
  const { refreshToken } = useAuth();
  const camera = useThree((state) => state.camera);
  const router = useRouter();

  const [isNavigating, setIsNavigating] = useState(false);

  useEffect(() => {
    camera.position.set(0, 0, 100);
    return () => {
      document.documentElement.style.cursor = "unset";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useFrame((state, delta) => {
    if (isNavigating) {
      camera.position.lerp(new Vector3(0, 0, -7), delta);
      return;
    }
  });

  const handleClick = async () => {
    setIsNavigating(true);
    // check for refreshToken
    if (refreshToken) {
      router.push("/visualizer");
      return;
    }
    // if no token present login normally
    setTimeout(async () => {
      const { uri } = await loginUser();
      window.location.assign(decodeURI(uri));
    }, 500);
  };

  return (
    <>
      <Suspense fallback={null}>
        <Bounds fit observe margin={0.8}>
          <Text onPointerDown={() => handleClick()}>
            {"t e s s e l l a t o r"}
          </Text>
          <Particles count={10000} isNavigating={isNavigating} />
        </Bounds>
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
      <EffectComposer>
        <Bloom
          luminanceThreshold={0.7}
          luminanceSmoothing={0.2}
          width={512}
          height={512}
        />
        <Glitch
          delay={new Vector2(0, 0)}
          duration={new Vector2(100, 100)}
          active={isNavigating}
        />
      </EffectComposer>
    </>
  );
};

export default memo(LandingScene);
