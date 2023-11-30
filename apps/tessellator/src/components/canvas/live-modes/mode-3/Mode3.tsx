import { useThree } from "@react-three/fiber";

import { useAnalyser } from "../../../../utils/analyserContext";
import Mode3 from "../../modes/mode-3/Mode3";
import { ModeProps } from "../LiveModes";
import { useGetColor } from "../useGetColor";

const LiveMode3 = ({ opacity }: ModeProps) => {
  const { getColor } = useGetColor({ minLightness: 125, minSaturation: 100 });
  const { audioAnalyser } = useAnalyser();
  const { width } = useThree((state) => state.viewport);

  function getTime() {
    return (
      Math.abs(
        audioAnalyser.snareSection.average - audioAnalyser.snareSection.energy
      ) / 10
    );
  }

  function getNoise() {
    return (audioAnalyser.analyserData.averageFrequency / 255) * 2;
  }

  function getStrengthFactor() {
    return (
      Math.abs(
        audioAnalyser.midSection.average - audioAnalyser.midSection.energy
      ) / 5
    );
  }

  function getResolution() {
    return width;
  }

  function getDeltaFactor() {
    return 1;
  }

  return (
    <Mode3
      getColor={getColor}
      getDeltaFactor={getDeltaFactor}
      getNoise={getNoise}
      getOpacity={() => opacity}
      getResolution={getResolution}
      getStrengthFactor={getStrengthFactor}
      getTime={getTime}
    />
  );
};

export default LiveMode3;
