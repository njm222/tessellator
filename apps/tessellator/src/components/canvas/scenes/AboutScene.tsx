import React, { Suspense, useEffect } from "react";
import { useThree } from "@react-three/fiber";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { Color } from "three";

import Particles from "../Particles";
import { Text } from "../text/Text";
import { Bounds } from "@react-three/drei";

export const AboutScene = () => {
  const camera = useThree((state) => state.camera);

  useEffect(() => {
    camera.position.set(100, 0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <group rotation={[0, Math.PI / 2, 0]}>
        <Suspense>
          <Bounds margin={0.8} observe>
            <Text colour={new Color()}>About</Text>
          </Bounds>
        </Suspense>
      </group>
      <Particles count={20000} isNavigating={false} />

      <EffectComposer disableNormalPass multisampling={0}>
        <Bloom
          height={256}
          luminanceSmoothing={0.1}
          luminanceThreshold={0.2}
          width={256}
        />
      </EffectComposer>
    </>
  );
};
