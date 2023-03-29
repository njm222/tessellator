import React, { memo, Suspense, useEffect, useState } from "react";
import { SpringValue } from "@react-spring/three";
import { Bounds, Sky } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { Bloom, EffectComposer, Glitch } from "@react-three/postprocessing";
import { loginUser } from "core";
import { useRouter } from "next/router";
import { Vector2 } from "three";

import { useAuth } from "../../../utils/authContext";
import Particles from "../Particles";
import { Text } from "../Text";

const LandingScene = () => {
  const { refreshToken } = useAuth();
  const camera = useThree((state) => state.camera);
  const router = useRouter();

  const [isNavigating, setIsNavigating] = useState(false);
  const z = new SpringValue({
    to: 20,
    from: 70,
    config: {
      tension: 20,
      friction: 5,
      precision: 0.0001,
    },
  });

  useEffect(() => {
    camera.position.set(0, 0, 100);
    return () => {
      document.documentElement.style.cursor = "unset";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useFrame((state, delta) => {
    if (isNavigating) {
      z.advance(delta * 1000);
      camera.position.setZ(z.animation.values[0].getValue());
      return;
    }
  });

  const handleClick = async () => {
    setIsNavigating(true);
    z.start({
      to: 20,
      from: camera.position.z,
      config: {
        tension: 20,
        friction: 5,
        precision: 0.0001,
      },
    });
    // check for refreshToken
    if (refreshToken) {
      router.push("/visualizer");
      return;
    }
    // if no token present login normally
    const { uri } = await loginUser();
    window.location.assign(decodeURI(uri));
  };

  return (
    <>
      <Suspense fallback={null}>
        <Bounds fit={!isNavigating} margin={0.8} observe={!isNavigating}>
          <Text onPointerDown={() => handleClick()}>
            {"t e s s e l l a t o r"}
          </Text>
        </Bounds>
      </Suspense>
      <Particles count={10000} isNavigating={isNavigating} />
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
