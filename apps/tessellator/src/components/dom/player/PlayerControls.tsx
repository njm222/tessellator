import {
  prevTrack,
  playPlayer,
  pausePlayer,
  nextTrack,
} from "../../../spotifyClient";
import { PlayIcon, PauseIcon, NextIcon, PrevIcon } from "./PlayerIcons";
import { IconButton } from "ui";
import { usePlayer } from "../../../utils/playerContext";
import { useAnalyser } from "../../../utils/analyserContext";

export default function PlayerControls() {
  const { player } = usePlayer();
  const { audioAnalyser, analyserOptions } = useAnalyser();

  return (
    <>
      <IconButton title="prev-track" onClick={prevTrack} icon={<PrevIcon />} />
      {player?.paused ? (
        <IconButton
          title="play-track"
          onClick={() => {
            playPlayer();
            if (audioAnalyser.source) {
              return;
            }
            audioAnalyser.setup(analyserOptions);
          }}
          icon={<PlayIcon />}
        />
      ) : (
        <IconButton
          title="pause-track"
          onClick={() => pausePlayer()}
          icon={<PauseIcon />}
        />
      )}
      <IconButton title="next-track" onClick={nextTrack} icon={<NextIcon />} />
    </>
  );
}
