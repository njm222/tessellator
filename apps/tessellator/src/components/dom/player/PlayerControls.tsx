import {
  prevTrack,
  playPlayer,
  pausePlayer,
  nextTrack,
} from "../../../spotifyClient";
import { PlayIcon, PauseIcon, NextIcon, PrevIcon } from "ui";
import { IconButton } from "ui";
import { usePlayer } from "../../../utils/playerContext";
import { useAnalyser } from "../../../utils/analyserContext";
import { useEffect } from "react";

export default function PlayerControls() {
  const { player } = usePlayer();
  const { audioAnalyser, analyserOptions } = useAnalyser();

  useEffect(() => {
    // resolves autoplay podcast issue
    if (!player.paused && !audioAnalyser.source) pausePlayer();
  }, [audioAnalyser.source, player]);

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
