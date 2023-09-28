import { useEffect, useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Color, MathUtils } from "three";

import { useAnalyser } from "../../../../utils/analyserContext";
import { usePlayer } from "../../../../utils/playerContext";
import WaveMaterial from "../../shaders/wave/WaveMaterial";
import { ModeProps } from "../Modes";
import { useGetColour } from "../useGetColour";

const Mode4 = ({ opacity, ...props }: ModeProps) => {
  const { getColour } = useGetColour({ minLightness: 125, minSaturation: 100 });
  const { audioAnalyser } = useAnalyser();
  const { spotifyAnalyser, trackFeatures } = usePlayer();
  const { width, height } = useThree((state) => state.viewport);
  const materialRef = useRef(new WaveMaterial());
  const realBarCounter = useRef(0);
  const currentBarStart = useRef(0);
  const [barThreshold, setBarThreshold] = useState(0.7);

  useEffect(() => {
    setBarThreshold(
      trackFeatures.danceability > 0.5
        ? trackFeatures.danceability > 0.75
          ? 0.95
          : 0.8
        : 0.65
    );
  }, [trackFeatures.danceability]);

  useFrame((state, delta) => {
    if (!materialRef.current) return;
  });

  return (
    <group {...props}>
      <mesh scale={[width, height, 1]}>
        <planeGeometry />
        <fractalMaterial ref={materialRef} transparent />
      </mesh>
    </group>
  );
};

export default Mode4;
