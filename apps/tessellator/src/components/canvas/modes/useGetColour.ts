import { hslToHex } from "core";

import { useAnalyser } from "../../../utils/analyserContext";
import { usePlayer } from "../../../utils/playerContext";
import { useControls } from "../../dom/controls/controlsContext";

export function useGetColour(
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
  const { colourKey } = useControls();
  const { spotifyAnalyser } = usePlayer();
  const segment = spotifyAnalyser.getCurrentSegment();

  function getColour() {
    if (!audioAnalyser || !segment?.timbre?.length) {
      return "#123456";
    }

    switch (colourKey) {
      case 0:
        return hslToHex(
          audioAnalyser.midSection.average * 5,
          Math.max(audioAnalyser.kickSection.average, minSaturation),
          Math.max(audioAnalyser.snareSection.average, minLightness)
        );
      case 1:
        return hslToHex(
          audioAnalyser.bassSection.average * 4,
          Math.max(Math.abs(segment.timbre[2] * 2), minSaturation),
          Math.max(Math.abs(segment.timbre[1] * 2), minLightness)
        );
      case 2:
        return hslToHex(
          audioAnalyser.analyserData.averageFrequency * 7,
          Math.max(Math.abs(segment.timbre[2] * 2), minSaturation),
          Math.max(Math.abs(segment.timbre[1] * 2), minLightness)
        );
      default:
        return hslToHex(
          audioAnalyser.snareSection.average * 6,
          Math.max(Math.abs(segment.timbre[2] * 2), minSaturation),
          Math.max(Math.abs(segment.timbre[1] * 2), minLightness)
        );
    }
  }
  return { getColour };
}
