import React from "react";
import { getIndexOfMax, getIndexOfMin } from "@tessellator/core";

import { useAnalyser } from "../../../../utils/analyserContext";
import { usePlayer } from "../../../../utils/playerContext";
import Mode0 from "../../modes/mode-0/Mode0";
import { ModeProps } from "../SpotifyModes";
import { useGetColor } from "../useGetColor";

const SpotifyMode0 = ({ opacity }: ModeProps) => {
  const { audioAnalyser } = useAnalyser();
  const { spotifyAnalyser, trackFeatures } = usePlayer();
  const { getColor } = useGetColor();

  function getTime() {
    const timbre = spotifyAnalyser.getCurrentSegment().timbre;

    return Math.max(timbre?.length ? timbre[0] / 100 : 0.0001, 0.0001);
  }

  function getXScale() {
    return (
      trackFeatures.danceability *
        (getIndexOfMin(spotifyAnalyser.getCurrentSegment()?.pitches) + 1) +
      Math.abs(
        audioAnalyser.bassSection?.average - audioAnalyser.kickSection?.energy
      ) -
      Math.abs(
        audioAnalyser.midSection?.average - audioAnalyser.midSection?.energy
      )
    );
  }

  function getYScale() {
    return (
      trackFeatures.energy *
        (getIndexOfMax(spotifyAnalyser.getCurrentSegment()?.pitches) + 1) +
      Math.abs(
        audioAnalyser.bassSection?.average - audioAnalyser.snareSection?.energy
      ) -
      Math.abs(
        audioAnalyser.midSection?.average - audioAnalyser.midSection?.energy
      )
    );
  }

  function getAmplitude() {
    return (
      Math.abs(
        audioAnalyser.midSection?.average - audioAnalyser.midSection?.energy
      ) /
      Math.max(audioAnalyser.highSection?.average * trackFeatures.valence, 15)
    );
  }

  function getDeltaFactor() {
    return (
      (trackFeatures.tempo / 10) *
      trackFeatures.energy *
      trackFeatures.danceability *
      (1 - trackFeatures.valence)
    );
  }

  function getWireframe() {
    return spotifyAnalyser.beats.counter % 2 === 0;
  }

  return (
    <Mode0
      getAmplitude={getAmplitude}
      getColor={getColor}
      getDeltaFactor={getDeltaFactor}
      getOpacity={() => opacity}
      getTime={getTime}
      getWireframe={getWireframe}
      getXScale={getXScale}
      getYScale={getYScale}
    />
  );
};

export default SpotifyMode0;
