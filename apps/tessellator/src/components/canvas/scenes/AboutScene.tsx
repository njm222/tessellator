import React, { Suspense, useEffect, useLayoutEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { Color, Group } from "three";

import Particles from "../Particles";
import { Text } from "../text/Text";
import { Billboard, useAspect } from "@react-three/drei";
import { Box, Flex, useFlexSize } from "@react-three/flex";

export const AboutScene = () => {
  const { camera, size } = useThree();
  const [vpWidth, vpHeight] = useAspect(size.width, size.height);
  const ref = useRef<Group>(null);
  const flexSize = useFlexSize();

  console.log(vpWidth, vpHeight);
  console.log(flexSize);

  useEffect(() => {
    camera.position.set(100, 0, 0);
    camera.lookAt(0, 0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useFrame((_, delta) => {
    if (!ref.current) {
      return;
    }

    // ref.current.position.y += 0.1;
  });

  return (
    <>
      <Suspense>
        <Billboard>
          <group ref={ref}>
            <Flex
              flexDirection="column"
              size={[vpWidth, vpHeight, 0]}
              position={[-vpWidth / 2, vpHeight / 2, 0]}
            >
              <Title />
              {/* <Content /> */}
            </Flex>
          </group>
        </Billboard>
      </Suspense>
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

function Content() {
  const contentScale = 2;
  return (
    <Box flexDirection="column" width="100%">
      <Box flexDirection="row" width="100%" alignItems="center" wrap="wrap">
        <Box>
          <Text colour={new Color()} scale={contentScale}>
            The inspiration for Tessellator came after a
          </Text>
        </Box>
        <Box>
          <Text colour={new Color("yellow")} scale={contentScale}>
            Christian Löffler
          </Text>
        </Box>
        <Box>
          <Text colour={new Color()} scale={contentScale}>
            set in SF.
          </Text>
        </Box>
      </Box>
    </Box>
  );
}

function Title() {
  const titleColour = new Color();
  return (
    <Box
      flexDirection="column"
      alignItems="flex-start"
      justifyContent="flex-start"
      width="100%"
      height="100%"
    >
      <Box margin={5}>
        <Text colour={titleColour}>A</Text>
      </Box>
      <Box marginLeft={20}>
        <Text colour={titleColour}>| free to use |</Text>
      </Box>
      <Box marginLeft={92}>
        <Text colour={titleColour}>| real-time |</Text>
      </Box>
      <Box margin={5}>
        <Text colour={titleColour}>| 3-D |</Text>
      </Box>
      <Box margin={5}>
        <Text colour={titleColour}>music visualizer</Text>
      </Box>
    </Box>
  );
}
