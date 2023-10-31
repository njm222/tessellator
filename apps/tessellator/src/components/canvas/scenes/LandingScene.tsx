import React, {
  Suspense,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useTransition,
} from "react";
import { useAspect } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { Box, Flex } from "@react-three/flex";
import { Bloom, EffectComposer, Glitch } from "@react-three/postprocessing";
import { captureException } from "@sentry/nextjs";
import { loginUser } from "core";
import { easing } from "maath";
import { useRouter } from "next/navigation";
import { Color, Object3D, Quaternion, Vector2, Vector3 } from "three";
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

  const target = useRef(new Vector3());
  const q1 = useRef(new Quaternion());
  const q2 = useRef(new Quaternion());
  const obj = useRef(new Object3D());

  useEffect(() => {
    camera.position.set(0, 0, 100);
    camera.lookAt(0, 0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useFrame((_, delta) => {
    if (isNavigating) {
      easing.damp3(
        camera.position,
        target.current,
        delta * (refreshToken ? 1 : 5)
      );
      camera.quaternion.slerpQuaternions(q1.current, q2.current, delta);
    }
  });

  async function handleSpotifyLogin() {
    try {
      const { uri } = await loginUser();
      window.location.assign(decodeURI(uri));
    } catch (e: unknown) {
      const errorMessage = (e as { message: string }).message;
      toast.open(errorMessage);
      captureException(errorMessage);
      return;
    }
  }

  function setCameraTarget({ x, y, z }: Vector3) {
    target.current.set(x, y, z + 10);

    obj.current.lookAt(target.current);
    q2.current.copy(obj.current.quaternion);
  }

  const handleNavigation = (
    target: Vector3,
    route: "/about" | "/visualizer"
  ) => {
    if (isPending) return;
    startTransition(() => {
      setCameraTarget(target);
      setIsNavigating(true);
    });
    router.push(route);
  };

  const handleSpotifyNavigation = (target: Vector3) => {
    if (!refreshToken) {
      handleSpotifyLogin();
    }
    handleNavigation(target, "/visualizer");
  };

  const handleAboutNavigation = (target: Vector3) => {
    handleNavigation(target, "/about");
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
        <Bloom luminanceSmoothing={0.1} luminanceThreshold={0.2} />
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
  handleAboutNavigation: (target: Vector3) => void;
  handleSpotifyNavigation: (target: Vector3) => void;
}) {
  const { size, setSize } = useThree();
  const [vpWidth, vpHeight] = useAspect(size.width, size.height);

  const textColor = new Color("#B91D82");

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
        <Text color={textColor} scale={10}>
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
          color={new Color("#1DB954")}
          marginRight={0}
          marginTop={0}
          onClick={handleSpotifyNavigation}
          overlayText="login"
        >
          Spotify
        </FlexLink>
        <FlexLink
          color={new Color("#5A5A5A")}
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
          color={textColor}
          marginRight={0}
          marginTop={0}
          onClick={handleAboutNavigation}
          overlayText="us"
        >
          About
        </FlexLink>
      </Box>
    </Flex>
  );
}
