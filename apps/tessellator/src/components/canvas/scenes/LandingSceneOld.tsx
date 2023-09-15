import React, { Suspense, useEffect, useState, useTransition } from "react";
import { SpringValue } from "@react-spring/three";
import { Bounds } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { Bloom, EffectComposer, Glitch } from "@react-three/postprocessing";
import { loginUser } from "core";
import { useRouter } from "next/navigation";
import { Vector2 } from "three";

import { useAuth } from "../../../utils/authContext";
import Particles from "../Particles";
import { NavigationText } from "../text/NavigationText";

export const LandingScene = () => {
  const [isPending, startTransition] = useTransition();
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
    startTransition(() => {
      z.start({
        to: 20,
        from: camera.position.z,
        config: {
          tension: 20,
          friction: 5,
          precision: 0.0001,
        },
      });
      setIsNavigating(true);
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
      <Suspense>
        <Bounds fit={!isNavigating} margin={0.8} observe={!isNavigating}>
          <NavigationText
            onPointerDown={() => {
              if (isPending) return;
              handleClick();
            }}
          >
            t e s s e l l a t o r
          </NavigationText>
        </Bounds>
      </Suspense>
      <Particles count={20000} isNavigating={isNavigating} />

      <EffectComposer disableNormalPass multisampling={0}>
        <Bloom
          height={256}
          luminanceSmoothing={0.1}
          luminanceThreshold={0.2}
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
