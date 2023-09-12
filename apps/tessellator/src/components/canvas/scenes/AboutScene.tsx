import React, { useEffect, useLayoutEffect, useRef } from "react";
import { a } from "@react-spring/three";
import { Plane, useAspect } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { Box, Flex } from "@react-three/flex";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { useGesture } from "@use-gesture/react";
import { Color, Group, Vector3 } from "three";

import Particles from "../Particles";
import { FlexLink, FlexText } from "../text/FlexText";
import { Text } from "../text/Text";

export const AboutScene = () => {
  const { camera, size, setSize } = useThree();

  useEffect(() => {
    camera.position.set(100, 0, 0);
    camera.lookAt(0, 0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // needed for flex to work
  useLayoutEffect(() => {
    setSize(size.width, size.height, size.updateStyle, size.top, size.left);
  }, []);

  return (
    <>
      <AboutContent />
      <Particles count={20000} isNavigating={false} />

      <EffectComposer disableNormalPass multisampling={0}>
        <Bloom luminanceSmoothing={0.1} luminanceThreshold={0.2} />
      </EffectComposer>
    </>
  );
};

function AboutContent() {
  const { size } = useThree();
  const [vpWidth, vpHeight] = useAspect(size.width, size.height);
  const ref = useRef<Group>(null);

  const textColour = new Color();
  const vec = new Vector3();

  const bind = useGesture(
    {
      onWheel: (state) =>
        ref.current?.position.lerp(vec.set(0, state.offset[1], 0), 0.1),
      // onDrag: (state) =>
      //   ref.current?.position.lerp(vec.set(0, -state.offset[1], 0), 0.1),
    },
    {
      eventOptions: { passive: false },
      wheel: { bounds: { top: 0, bottom: vpHeight * 1.5, left: 0, right: 0 } },
    }
  );

  return (
    <>
      {/** @ts-ignore */}
      <a.group ref={ref} rotation={[0, Math.PI / 2, 0]} {...bind()}>
        <Plane args={[vpWidth, vpHeight * 4]} visible={false} />
        <Flex
          flexDirection="column"
          position={[-vpWidth / 2, vpHeight / 2, 0]}
          size={[vpWidth, vpHeight, 0]}
        >
          <Title colour={textColour} />
          <Content colour={textColour} />
        </Flex>
      </a.group>
    </>
  );
}

function Content({ colour }: { colour: Color }) {
  const preLinkContent = "The inspiration for Tessellator came after a";
  const linkContent = "Christian Löffler";
  const postLinkContent =
    "set in SF. Tessellator is an interactive 3D music visualizer that has been developed to enhance your experience while listening to your favourite tracks. Tessellator uses the live audio to draw the visualizations in real-time. No loops / static content.";

  return (
    <Box
      alignItems="center"
      flexDirection="row"
      justifyContent="center"
      margin={20}
      wrap="wrap"
    >
      {preLinkContent.split(" ").map((word, index) => (
        <FlexText
          colour={colour}
          key={`about-pre-link-content-flex-text-${word}-${index}`}
        >
          {word}
        </FlexText>
      ))}
      {linkContent.split(" ").map((word, index) => (
        <FlexLink
          colour={new Color("yellow")}
          key={`link-content-flex-link-${word}-${index}`}
          link="https://www.christian-loeffler.net/"
        >
          {word}
        </FlexLink>
      ))}
      {postLinkContent.split(" ").map((word, index) => (
        <FlexText
          colour={colour}
          key={`about-post-link-content-flex-text-${word}-${index}`}
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
      alignItems="center"
      flexDirection="column"
      justifyContent="flex-start"
      marginTop={30}
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
