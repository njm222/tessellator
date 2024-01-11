import React, { useEffect, useLayoutEffect, useRef } from "react";
import { a } from "@react-spring/three";
import { Plane, useAspect } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { Box, Flex } from "@react-three/flex";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { useToast } from "@tessellator/ui";
import { useGesture } from "@use-gesture/react";
import { Color, Group, Vector2, Vector3 } from "three";

import { copyToClipBoard, openNewTabLink } from "../../../helpers/global";
import Blackhole from "../../models/Blackhole";
import { Wavy, WavyEffect } from "../effects/wavy/Wavy";
import { FlexLink } from "../text/FlexLink";
import { FlexText } from "../text/FlexText";
import { Text } from "../text/Text";

export const AboutScene = () => {
  const { camera, size, setSize } = useThree();
  const [, vpHeight] = useAspect(size.width, size.height);
  const ref = useRef<Group>(null);
  const wavyRef = useRef<WavyEffect>(null);
  const vec = new Vector3();

  useEffect(() => {
    camera.position.set(0, 0, 100);
    camera.lookAt(0, 0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // needed for flex to work
  useLayoutEffect(() => {
    setSize(size.width, size.height, size.updateStyle, size.top, size.left);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const bind = useGesture(
    {
      onScroll: (state) => {
        if (!wavyRef.current) return;
        wavyRef.current.setSpeed(state.velocity[1]);
        ref.current?.position.lerp(vec.set(0, state.offset[1], 0), 0.05);
      },
      onScrollEnd: () => {
        if (!wavyRef.current) return;
        wavyRef.current.setSpeed(0);
      },
      onWheel: (state) => {
        if (!wavyRef.current) return;
        wavyRef.current?.setSpeed(state.velocity[1]);
        ref.current?.position.lerp(vec.set(0, state.offset[1], 0), 0.05);
      },
      onWheelEnd: () => {
        if (!wavyRef.current) return;
        wavyRef.current.setSpeed(0);
      },
    },
    {
      eventOptions: { passive: false },
      wheel: {
        bounds: { top: 0, bottom: vpHeight * 2, left: 0, right: 0 },
      },
      scroll: {
        bounds: { top: 0, bottom: vpHeight * 2, left: 0, right: 0 },
      },
    }
  );

  return (
    <>
      {/** @ts-ignore incompatible types */}
      <a.group ref={ref} {...bind()}>
        <AboutContent />
      </a.group>

      <EffectComposer disableNormalPass multisampling={0}>
        <Bloom luminanceSmoothing={0.1} luminanceThreshold={0.2} />
        <Wavy distortion={0} distortion2={0} ref={wavyRef} speed={0} />
      </EffectComposer>
    </>
  );
};

function AboutContent() {
  const { size } = useThree();
  const [vpWidth, vpHeight] = useAspect(size.width, size.height);

  const textColor = new Color();

  return (
    <>
      <Plane args={[vpWidth, vpHeight * 6]} visible={false} />
      <Flex
        flexDirection="column"
        position={[-vpWidth / 2, vpHeight / 2, 0]}
        size={[vpWidth, vpHeight * 2, 0]}
      >
        <Title color={textColor} />
        <Content color={textColor} />
        <Box
          alignItems="center"
          centerAnchor
          flexGrow={1}
          height="auto"
          justifyContent="center"
          marginTop={50}
          width={vpWidth}
        >
          {/* <Blackhole scale={0.3} /> */}
        </Box>
        <Feedback color={textColor} />
      </Flex>
    </>
  );
}

function Feedback({ color }: { color: Color }) {
  const toast = useToast();
  const preLinkContent =
    "I’m always looking to improve and push the boundaries of Tessellator. Got a feature idea or found a bug? Drop me an";
  const emailLink = "email";
  const postLinkContent = "or open an";
  const repoLink = "issue.";

  return (
    <>
      <Box
        flexDirection="row"
        justifyContent="center"
        marginLeft={20}
        marginRight={20}
        marginTop={50}
        wrap="wrap"
      >
        {preLinkContent.split(" ").map((word, index) => (
          <FlexText
            color={color}
            key={`feedback-pre-link-content-flex-text-${word}-${index}`}
          >
            {word}
          </FlexText>
        ))}
        {emailLink.split(" ").map((word, index) => (
          <FlexLink
            color={new Color("yellow")}
            key={`feedback-link-content-flex-link-${word}-${index}`}
            onClick={() => {
              copyToClipBoard(word);
              toast.open("Email has been copied to your clipboard", {
                variant: "",
              });
            }}
          >
            {word}
          </FlexLink>
        ))}
        {postLinkContent.split(" ").map((word, index) => (
          <FlexText
            color={color}
            key={`feedback-post-link-content-flex-text-${word}-${index}`}
          >
            {word}
          </FlexText>
        ))}
        {repoLink.split(" ").map((word, index) => (
          <FlexLink
            color={new Color("yellow")}
            key={`feedback-content-flex-text-${word}-${index}`}
            onClick={() =>
              openNewTabLink("https://github.com/njm222/tessellator/issues")
            }
          >
            {word}
          </FlexLink>
        ))}
      </Box>
    </>
  );
}

function Content({ color }: { color: Color }) {
  const preLinkContent =
    "The inspiration for Tessellator came after a live A/V";
  const linkContent = "Christian Löffler";
  const postLinkContent =
    "set in San Francisco, where I was blown away and knew I had to bring something like it to everyone.";
  const aboutContent =
    "Tessellator is an open source interactive 3D music visualizer that has been developed to enhance your experience while listening to your favorite tracks. Tessellator uses the live audio from your device or the microphone to draw the visualizations in realtime.";

  return (
    <>
      <Box
        flexDirection="row"
        justifyContent="flex-start"
        marginLeft={20}
        marginRight={20}
        marginTop={30}
        wrap="wrap"
      >
        {preLinkContent.split(" ").map((word, index) => (
          <FlexText
            color={color}
            key={`about-pre-link-content-flex-text-${word}-${index}`}
          >
            {word}
          </FlexText>
        ))}
        {linkContent.split(" ").map((word, index) => (
          <FlexLink
            color={new Color("yellow")}
            key={`about-link-content-flex-link-${word}-${index}`}
            onClick={() =>
              openNewTabLink("https://www.christian-loeffler.net/")
            }
          >
            {word}
          </FlexLink>
        ))}
        {postLinkContent.split(" ").map((word, index) => (
          <FlexText
            color={color}
            key={`about-post-link-content-flex-text-${word}-${index}`}
          >
            {word}
          </FlexText>
        ))}
      </Box>
      <Box
        flexDirection="row"
        justifyContent="flex-start"
        marginLeft={20}
        marginRight={20}
        marginTop={10}
        wrap="wrap"
      >
        {aboutContent.split(" ").map((word, index) => (
          <FlexText
            color={color}
            key={`about-content-flex-text-${word}-${index}`}
          >
            {word}
          </FlexText>
        ))}
      </Box>
    </>
  );
}

function Title({ color }: { color: Color }) {
  const titleScale = 10;
  return (
    <Box
      alignItems="center"
      flexDirection="column"
      justifyContent="flex-start"
      marginTop={30}
    >
      <Box marginBottom={15}>
        <Text color={color} scale={titleScale}>
          A
        </Text>
      </Box>
      <Box marginBottom={5}>
        <Text color={color} scale={titleScale}>
          | free |
        </Text>
      </Box>
      <Box marginBottom={5}>
        <Text color={color} scale={titleScale}>
          | realtime |
        </Text>
      </Box>
      <Box>
        <Text color={color} scale={titleScale}>
          | 3-D |
        </Text>
      </Box>
      <Box flexDirection="row" justify="space-around" width="100%" wrap="wrap">
        <Box marginLeft={10} marginRight={10} marginTop={15}>
          <Text color={color} scale={titleScale}>
            music
          </Text>
        </Box>
        <Box marginLeft={10} marginRight={10} marginTop={15}>
          <Text color={color} scale={titleScale}>
            visualizer
          </Text>
        </Box>
      </Box>
    </Box>
  );
}
