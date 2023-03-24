import React, { memo, Suspense,useEffect, useState } from "react";
import { Bounds, Sky } from "@react-three/drei";
import { useFrame,useThree } from "@react-three/fiber";
import { Bloom, EffectComposer, Glitch } from "@react-three/postprocessing";
import { loginUser } from "core";
import { useRouter } from "next/router";
import { Vector2, Vector3 } from "three";

import { useAuth } from "../../../utils/authContext";
import Particles from "../Particles";
import { Text } from "../Text";

const LandingScene = () => {
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
        <Bounds fit margin={0.8} observe>
          <Text onPointerDown={() => handleClick()}>
            {"t e s s e l l a t o r"}
          </Text>
          <Particles count={10000} isNavigating={isNavigating} />
        </Bounds>
      </Suspense>
      <Sky
        azimuth={1}
        distance={1000}
        inclination={0}
        mieCoefficient={0.1}
        mieDirectionalG={0.8}
        rayleigh={10}
        turbidity={10}
      />
      <EffectComposer disableNormalPass>
        <Bloom
          height={256}
          luminanceSmoothing={0.2}
          luminanceThreshold={0.7}
          width={256}
        />
        <Glitch
          active={isNavigating}
          delay={new Vector2(0, 0)}
          duration={new Vector2(100, 100)}
        />
      </EffectComposer>
    </>
  );
};

export default memo(LandingScene);
