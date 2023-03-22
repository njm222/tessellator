import { useEffect } from "react";
import { IconButton,NextIcon, PauseIcon, PlayIcon, PrevIcon  } from "ui";

import {
  nextTrack,
  pausePlayer,
  playPlayer,
  prevTrack,
} from "../../../spotifyClient";
import { useAnalyser } from "../../../utils/analyserContext";
import { usePlayer } from "../../../utils/playerContext";

export default function PlayerControls() {
  const { player } = usePlayer();
  const { audioAnalyser, analyserOptions } = useAnalyser();

  useEffect(() => {
    // resolves autoplay podcast issue
    if (!player.paused && !audioAnalyser.source) pausePlayer();
  }, [audioAnalyser.source, player]);

  return (
    <>
      <IconButton icon={<PrevIcon />} onClick={prevTrack} title="prev-track" />
      {player?.paused ? (
        <IconButton
          icon={<PlayIcon />}
          onClick={() => {
            playPlayer();
            if (audioAnalyser.source) {
              return;
            }
            audioAnalyser.setup(analyserOptions);
          }}
          title="play-track"
        />
      ) : (
        <IconButton
          icon={<PauseIcon />}
          onClick={() => pausePlayer()}
          title="pause-track"
        />
      )}
      <IconButton icon={<NextIcon />} onClick={nextTrack} title="next-track" />
    </>
  );
}
