import { hslToHex } from "@tessellator/core";

import { useAnalyser } from "../../../utils/analyserContext";
import { useControls } from "../../dom/controls/controlsContext";

export function useGetColor(
  {
    minLightness,
    minSaturation,
  }: {
    minSaturation: number;
    minLightness: number;
  } = {
    minLightness: 100,
    minSaturation: 50,
  }
) {
  const { audioAnalyser } = useAnalyser();
  const { colorKey } = useControls();

  function getColor() {
    if (!audioAnalyser) {
      return "#123456";
    }

    switch (colorKey?.current) {
      case 0:
        return hslToHex(
          3 * audioAnalyser.midSection.average,
          audioAnalyser.kickSection.average,
          audioAnalyser.snareSection.average
        );
      case 1:
        return hslToHex(
          2 * audioAnalyser.midSection.average,
          audioAnalyser.kickSection.average,
          audioAnalyser.snareSection.average
        );
      case 2:
        return hslToHex(
          audioAnalyser.midSection.average,
          audioAnalyser.kickSection.average,
          audioAnalyser.snareSection.average
        );
      default:
        return hslToHex(
          2 * audioAnalyser.midSection.average,
          audioAnalyser.kickSection.average,
          audioAnalyser.snareSection.average
        );
    }
  }
  return { getColor };
}
