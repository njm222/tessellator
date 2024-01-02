import { getIndexOfMax } from "@tessellator/core";

import { useAnalyser } from "../../../../utils/analyserContext";
import { usePlayer } from "../../../../utils/playerContext";
import Mode1 from "../../modes/mode-1/Mode1";
import { ModeProps } from "../SpotifyModes";
import { useGetColor } from "../useGetColor";

const SpotifyMode1 = ({ opacity }: ModeProps) => {
  const { audioAnalyser } = useAnalyser();
  const { getColor } = useGetColor({ minSaturation: 75, minLightness: 150 });
  const { spotifyAnalyser, trackFeatures } = usePlayer();

  function getDeltaFactor() {
    return (
      (trackFeatures.tempo / 100) *
      trackFeatures.energy *
      trackFeatures.danceability
    );
  }

  function getSize() {
    const pitchNormalized =
      (spotifyAnalyser.getCurrentSegment()?.pitches?.reduce((acc, curr) => {
        acc += curr;
        return acc;
      }, 0) || 12) / 12;
    const timbre = spotifyAnalyser.getCurrentSegment()?.timbre;

    return Math.abs(pitchNormalized * (timbre?.length ? timbre[0] : 10));
  }

  function getNoise() {
    const pitchNormalized =
      (spotifyAnalyser.getCurrentSegment()?.pitches?.reduce((acc, curr) => {
        acc += curr;
        return acc;
      }, 0) || 12) / 12;
    const timbre = spotifyAnalyser.getCurrentSegment()?.timbre;

    return Math.abs(pitchNormalized * (timbre?.length ? timbre[0] : 10));
  }

  function getRadius() {
    return (
      Math.abs(
        audioAnalyser.bassSection.average - audioAnalyser.snareSection.energy
      ) / 5
    );
  }

  function getTube() {
    return (
      5 +
      Math.abs(
        audioAnalyser.bassSection.average - audioAnalyser.kickSection.energy
      ) /
        2
    );
  }

  function getTubularSegments() {
    return audioAnalyser.midSection.average / 4;
  }

  function getRadialSegments() {
    return audioAnalyser.analyserData.averageFrequency / 3;
  }

  function getP() {
    const pitchTotal =
      spotifyAnalyser.getCurrentSegment()?.pitches?.reduce((acc, curr) => {
        acc += curr;
        return acc;
      }, 0) || 3;

    return Math.floor(pitchTotal) + 1;
  }

  function getQ() {
    return getIndexOfMax(spotifyAnalyser.getCurrentSegment()?.pitches) + 2;
  }

  return (
    <Mode1
      getColor={getColor}
      getDeltaFactor={getDeltaFactor}
      getNoise={getNoise}
      getOpacity={() => opacity}
      getP={getP}
      getQ={getQ}
      getRadialSegments={getRadialSegments}
      getRadius={getRadius}
      getSize={getSize}
      getTube={getTube}
      getTubularSegments={getTubularSegments}
    />
  );
};

export default SpotifyMode1;
