import { getIndexOfMax, getIndexOfMin, hslToHex } from "core";

import { useAnalyser } from "../../../utils/analyserContext";
import { usePlayer } from "../../../utils/playerContext";
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
  const { spotifyAnalyser } = usePlayer();

  function getColor() {
    const segment = spotifyAnalyser.getCurrentSegment();
    if (!audioAnalyser || !segment?.timbre?.length) {
      return "#123456";
    }

    switch (colorKey?.current) {
      case 0:
        return hslToHex(
          360 * ((getIndexOfMax(segment?.pitches) + 1) / 13),
          Math.max(Math.abs(segment.timbre[2] * 2), minSaturation),
          Math.max(Math.abs(segment.timbre[1] * 2), minLightness)
        );
      case 1:
        return hslToHex(
          audioAnalyser.midSection.energy,
          Math.max(Math.abs(segment.timbre[2] * 2), minSaturation),
          Math.max(Math.abs(segment.timbre[1] * 2), minLightness)
        );
      case 2:
        return hslToHex(
          360 * ((getIndexOfMin(segment?.pitches) + 1) / 13),
          Math.max(Math.abs(segment.timbre[2] * 2), minSaturation),
          Math.max(Math.abs(segment.timbre[1] * 2), minLightness)
        );
      default:
        return hslToHex(
          audioAnalyser.analyserData.rms,
          Math.max(Math.abs(segment.timbre[2] * 2), minSaturation),
          Math.max(Math.abs(segment.timbre[1] * 2), minLightness)
        );
    }
  }
  return { getColor };
}
