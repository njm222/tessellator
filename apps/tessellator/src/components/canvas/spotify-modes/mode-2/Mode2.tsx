import { useAnalyser } from "../../../../utils/analyserContext";
import { usePlayer } from "../../../../utils/playerContext";
import Mode2 from "../../modes/mode-2/Mode2";
import { ModeProps } from "../SpotifyModes";
import { useGetColor } from "../useGetColor";

const SpotifyMode2 = ({ opacity }: ModeProps) => {
  const { getColor } = useGetColor();
  const { audioAnalyser } = useAnalyser();
  const { spotifyAnalyser, trackFeatures } = usePlayer();

  function getScale() {
    return Math.abs(
      (audioAnalyser.bassSection.average - audioAnalyser.snareSection.average) /
        5
    );
  }

  function getZValue() {
    return (
      10 *
      trackFeatures.danceability *
      (spotifyAnalyser.beats.counter % 2 === 0 ? 1 : -1)
    );
  }

  function getXRotation() {
    if (spotifyAnalyser.bars.counter % 2 === 0) {
      return 0;
    }

    return (
      (audioAnalyser.midSection.average / 10000) *
      (spotifyAnalyser.bars.current.confidence > 0.5 ? 1 : -1)
    );
  }

  function getYRotation() {
    if (spotifyAnalyser.bars.counter % 2 !== 0) {
      return 0;
    }

    return (
      (audioAnalyser.midSection.average / 10000) *
      (spotifyAnalyser.bars.current.confidence > 0.5 ? 1 : -1)
    );
  }

  function getDeltaFactor() {
    return (
      (trackFeatures.tempo / 100) *
      trackFeatures.energy *
      trackFeatures.danceability
    );
  }

  function getWireframe() {
    return spotifyAnalyser.beats.counter % 2 === 0;
  }

  return (
    <Mode2
      getColor={getColor}
      getDeltaFactor={getDeltaFactor}
      getOpacity={() => opacity}
      getScale={getScale}
      getWireframe={getWireframe}
      getXRotation={getXRotation}
      getYRotation={getYRotation}
      getZValue={getZValue}
    />
  );
};

export default SpotifyMode2;
