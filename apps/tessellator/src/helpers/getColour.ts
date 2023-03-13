import { hslToHex } from "core";
import SpotifyAnalyser from "spotify-analyser";
import AudioAnalyser from "audio-analyser";

const getColour = (
  colourKey: number,
  spotifyAnalyzer: SpotifyAnalyser,
  audioAnalyzer: AudioAnalyser
) => {
  if (!audioAnalyzer || !spotifyAnalyzer.segments?.current?.timbre?.length) {
    return "#123456";
  }

  switch (colourKey) {
    case 0:
      return hslToHex(
        audioAnalyzer.midSection.average * 5,
        Math.max(audioAnalyzer.kickSection.average, 100),
        Math.max(audioAnalyzer.snareSection.average, 150)
      );
    case 1:
      return hslToHex(
        audioAnalyzer.bassSection.average * 4,
        Math.max(Math.abs(spotifyAnalyzer.segments.current.timbre[2] * 2), 100),
        Math.max(Math.abs(spotifyAnalyzer.segments.current.timbre[1] * 2), 150)
      );
    case 2:
      return hslToHex(
        audioAnalyzer.analyserData.averageFrequency * 7,
        Math.max(Math.abs(spotifyAnalyzer.segments.current.timbre[2] * 2), 100),
        Math.max(Math.abs(spotifyAnalyzer.segments.current.timbre[1] * 2), 150)
      );
    default:
      return hslToHex(
        audioAnalyzer.snareSection.average * 6,
        Math.max(Math.abs(spotifyAnalyzer.segments.current.timbre[2] * 2), 100),
        Math.max(Math.abs(spotifyAnalyzer.segments.current.timbre[1] * 2), 150)
      );
  }
};

export default getColour;
