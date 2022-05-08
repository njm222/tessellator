import { useStore } from "@/utils/store";
import hslToHex from "./hslToHex";

const getColour = () => {
  const spotifyAnalyzer = useStore.getState().spotifyAnalyzer;
  const audioAnalyzer = useStore.getState().audioAnalyzer;
  if (!audioAnalyzer) {
    return "#123456";
  }
  switch (useStore.getState().colourKey) {
    case 0:
      return hslToHex(
        audioAnalyzer.snareObject.energy * 5,
        audioAnalyzer.kickObject.average,
        audioAnalyzer.avFreq
      );
    case 1:
      return hslToHex(
        Math.abs(spotifyAnalyzer.timbre[2] * 2),
        audioAnalyzer.bassObject.average,
        Math.abs(spotifyAnalyzer.timbre[0])
      );
    case 3:
      return hslToHex(
        audioAnalyzer.midsObject.energy,
        audioAnalyzer.bassObject.average,
        audioAnalyzer.bassObject.energy
      );
    default:
      return hslToHex(
        audioAnalyzer.snareObject.energy * 5,
        audioAnalyzer.kickObject.average,
        audioAnalyzer.avFreq
      );
  }
};

export default getColour;
