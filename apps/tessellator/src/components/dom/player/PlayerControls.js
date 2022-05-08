import { useEffect } from "react";
import { useStore } from "@/utils/store";
import { prevTrack, playTrack, pausePlayer, nextTrack } from "@/spotifyClient";
import { PlayIcon, PauseIcon, NextIcon, PrevIcon } from "./PlayerIcons";
import IconButton from "../IconButton";

export default function PlayerControls() {
  const [set, paused] = useStore((state) => [
    state.set,
    state.player.playerState.paused,
  ]);

  useEffect(() => {}, []);

  return (
    <>
      <IconButton title="prev-track" onClick={prevTrack} icon={<PrevIcon />} />
      {paused ? (
        <IconButton
          title="play-track"
          onClick={playTrack}
          icon={<PlayIcon />}
        />
      ) : (
        <IconButton
          title="pause-track"
          onClick={pausePlayer}
          icon={<PauseIcon />}
        />
      )}
      <IconButton title="next-track" onClick={nextTrack} icon={<NextIcon />} />
    </>
  );
}
