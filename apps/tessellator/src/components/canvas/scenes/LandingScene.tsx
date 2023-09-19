import React, {
  Suspense,
  useEffect,
  useLayoutEffect,
  useState,
  useTransition,
} from "react";
import { SpringValue } from "@react-spring/three";
import { useAspect } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { Box, Flex } from "@react-three/flex";
import { Bloom, EffectComposer, Glitch } from "@react-three/postprocessing";
import { loginUser } from "core";
import { useRouter } from "next/navigation";
import { Color, Vector2 } from "three";
import { useToast } from "ui";

import { useAuth } from "../../../utils/authContext";
import Particles from "../Particles";
import { FlexLink } from "../text/FlexLink";
import { Text } from "../text/Text";

export const LandingScene = () => {
  const [isPending, startTransition] = useTransition();
  const toast = useToast();
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
    camera.lookAt(0, 0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useFrame((_, delta) => {
    if (isNavigating) {
      z.advance(delta * 1000);
      camera.position.setZ(z.animation.values[0].getValue());
      return;
    }
  });

  const handleSpotifyNavigation = async () => {
    if (!refreshToken) {
      // if no token present login normally
      try {
        const { uri } = await loginUser();
        window.location.assign(decodeURI(uri));
      } catch (e: unknown) {
        toast.open((e as { message: string }).message);
        return;
      }
    }
    if (isPending) return;
    startTransition(() => {
      z.start({
        to: 20,
        from: camera.position.z,
        config: {
          tension: 20,
          friction: refreshToken ? 5 : 200,
          precision: 0.0001,
        },
      });
      setIsNavigating(true);

      router.push("/visualizer");
    });
  };

  const handleAboutNavigation = () => {
    if (isPending) return;
    startTransition(() => {
      z.start({
        to: 20,
        from: camera.position.z,
        config: {
          tension: 20,
          friction: refreshToken ? 5 : 200,
          precision: 0.0001,
        },
      });
      setIsNavigating(true);
      router.push("/about");
    });
  };

  return (
    <>
      <Suspense>
        <LandingContent
          handleAboutNavigation={handleAboutNavigation}
          handleSpotifyNavigation={handleSpotifyNavigation}
        />
      </Suspense>
      <Particles count={10000} isNavigating={isNavigating} />

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

function LandingContent({
  handleAboutNavigation,
  handleSpotifyNavigation,
}: {
  handleAboutNavigation: () => void;
  handleSpotifyNavigation: () => void;
}) {
  const { size, setSize } = useThree();
  const [vpWidth, vpHeight] = useAspect(size.width, size.height);

  const textColour = new Color("#B91D82");

  // needed for flex to work
  useLayoutEffect(() => {
    setSize(size.width, size.height, size.updateStyle, size.top, size.left);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Flex
      align="center"
      flexDirection="column"
      justify="center"
      position={[-vpWidth / 2, vpHeight / 2, 0]}
      size={[vpWidth, vpHeight, 0]}
    >
      <Box alignItems="center" justifyContent="center">
        <Text colour={textColour} scale={10}>
          t e s s e l l a t o r
        </Text>
      </Box>
      <Box
        flexDirection="row"
        justify="space-around"
        marginTop={40}
        width="100%"
      >
        <FlexLink
          colour={new Color("#1DB954")}
          marginRight={0}
          marginTop={0}
          onClick={() => handleSpotifyNavigation()}
          overlayText="login"
        >
          Spotify
        </FlexLink>
        <FlexLink
          colour={new Color("#5A5A5A")}
          disabled
          marginRight={0}
          marginTop={0}
          onClick={() => {}}
          overlayText="upcoming"
        >
          Live audio
        </FlexLink>
      </Box>
      <Box flexDirection="row" justify="center" marginTop={20} width="100%">
        <FlexLink
          colour={textColour}
          marginRight={0}
          marginTop={0}
          onClick={() => handleAboutNavigation()}
          overlayText="us"
        >
          About
        </FlexLink>
      </Box>
    </Flex>
  );
}
