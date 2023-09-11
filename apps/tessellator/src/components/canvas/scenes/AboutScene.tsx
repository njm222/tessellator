import React, { Suspense, useEffect, useLayoutEffect, useRef } from "react";
import { useThree } from "@react-three/fiber";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { Color, Group } from "three";

import Particles from "../Particles";
import { Text } from "../text/Text";
import { useAspect } from "@react-three/drei";
import { Box, Flex } from "@react-three/flex";
import { FlexLink, FlexText } from "../text/FlexText";

export const AboutScene = () => {
  const { camera, size, setSize } = useThree();
  const [vpWidth, vpHeight] = useAspect(size.width, size.height);
  const ref = useRef<Group>(null);

  useEffect(() => {
    camera.position.set(100, 0, 0);
    camera.lookAt(0, 0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // needed for flex to work
  useLayoutEffect(() => {
    setSize(size.width, size.height, size.updateStyle, size.top, size.left);
  }, []);

  const textColour = new Color();

  return (
    <>
      <group ref={ref} rotation={[0, Math.PI / 2, 0]}>
        <Flex
          flexDirection="column"
          size={[vpWidth, vpHeight, 0]}
          position={[-vpWidth / 2, vpHeight / 2, 0]}
        >
          <Suspense>
            <Title colour={textColour} />
            <Content colour={textColour} />
          </Suspense>
        </Flex>
      </group>
      <Particles count={20000} isNavigating={false} />

      <EffectComposer disableNormalPass multisampling={0}>
        <Bloom luminanceSmoothing={0.1} luminanceThreshold={0.2} />
      </EffectComposer>
    </>
  );
};

function Content({ colour }: { colour: Color }) {
  const preLinkContent = "The inspiration for Tessellator came after a";
  const linkContent = "Christian Löffler";
  const postLinkContent =
    "set in SF. Tessellator is an interactive 3D music visualizer that has been developed to enhance your experience while listening to your favourite tracks. Tessellator uses the live audio to draw the visualizations in real-time. No loops / static content.";

  return (
    <Box
      margin={20}
      flexDirection="row"
      alignItems="center"
      justifyContent="center"
      wrap="wrap"
    >
      {preLinkContent.split(" ").map((word, index) => (
        <FlexText
          key={`about-pre-link-content-flex-text-${word}-${index}`}
          colour={colour}
        >
          {word}
        </FlexText>
      ))}
      {linkContent.split(" ").map((word, index) => (
        <FlexLink
          key={`link-content-flex-link-${word}-${index}`}
          colour={new Color("yellow")}
          link="https://www.christian-loeffler.net/"
        >
          {word}
        </FlexLink>
      ))}
      {postLinkContent.split(" ").map((word, index) => (
        <FlexText
          key={`about-post-link-content-flex-text-${word}-${index}`}
          colour={colour}
        >
          {word}
        </FlexText>
      ))}
    </Box>
  );
}

function Title({ colour }: { colour: Color }) {
  const titleScale = 10;
  return (
    <Box
      marginTop={30}
      flexDirection="column"
      alignItems="center"
      justifyContent="flex-start"
    >
      <Box marginBottom={15}>
        <Text colour={colour} scale={titleScale}>
          A
        </Text>
      </Box>
      <Box marginBottom={5}>
        <Text colour={colour} scale={titleScale}>
          | free |
        </Text>
      </Box>
      <Box marginBottom={5}>
        <Text colour={colour} scale={titleScale}>
          | realtime |
        </Text>
      </Box>
      <Box>
        <Text colour={colour} scale={titleScale}>
          | 3-D |
        </Text>
      </Box>
      <Box flexDirection="row" justify="space-around" width="100%" wrap="wrap">
        <Box marginTop={15}>
          <Text colour={colour} scale={titleScale}>
            music
          </Text>
        </Box>
        <Box marginTop={15}>
          <Text colour={colour} scale={titleScale}>
            visualizer
          </Text>
        </Box>
      </Box>
    </Box>
  );
}
