import { getIndexOfMax } from "@tessellator/core";

import { useAnalyser } from "../../../../utils/analyserContext";
import { usePlayer } from "../../../../utils/playerContext";
import { ModeProps } from "../SpotifyModes";
import { useGetColor } from "../useGetColor";
import Mode1 from "../../modes/mode-1/Mode1";

const SpotifyMode1 = ({ opacity }: ModeProps) => {
  const { audioAnalyser } = useAnalyser();
  const { getColor } = useGetColor({ minSaturation: 75, minLightness: 150 });
  const { spotifyAnalyser, trackFeatures } = usePlayer();

  function getDeltaFactor() {
    return (
      (trackFeatures.tempo / 10) *
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
      10 +
      Math.abs(
        audioAnalyser.bassSection.average - audioAnalyser.kickSection.energy
      ) /
        2
    );
  }

  function getTubularSegments() {
    return audioAnalyser.midSection.average;
  }

  function getRadialSegments() {
    return audioAnalyser.analyserData.averageFrequency;
  }

  function getP() {
    const pitchTotal =
      spotifyAnalyser.getCurrentSegment()?.pitches?.reduce((acc, curr) => {
        acc += curr;
        return acc;
      }, 0) || 3;

    return Math.floor(pitchTotal) + 1;

    // p.current = MathUtils.lerp(p.current, Math.floor(pitchTotal) + 2, delta);

    // q.current = MathUtils.lerp(
    //   q.current,
    //   getIndexOfMax(spotifyAnalyser.getCurrentSegment()?.pitches) + 3,
    //   delta
    // );
  }

  function getQ() {
    return getIndexOfMax(spotifyAnalyser.getCurrentSegment()?.pitches) + 2;
  }

  return (
    <Mode1
      getOpacity={() => opacity}
      getColor={getColor}
      getSize={getSize}
      getNoise={getNoise}
      getRadius={getRadius}
      getTube={getTube}
      getDeltaFactor={getDeltaFactor}
      getTubularSegments={getTubularSegments}
      getRadialSegments={getRadialSegments}
      getP={getP}
      getQ={getQ}
    />
  );
};

export default SpotifyMode1;
