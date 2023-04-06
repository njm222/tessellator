import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { PlayerControls, ProgressBar, TrackDetails } from "ui";

import { useAnalyser } from "../../../utils/analyserContext";
import { usePlayer } from "../../../utils/playerContext";
import { mutations } from "../../../utils/store";
import { useMouseActivity } from "../controls/mouseActivityContext";

export function Player() {
  const { audioAnalyser, analyserOptions } = useAnalyser();
  const { player, play, pause, next, prev } = usePlayer();
  const { mouseActive } = useMouseActivity();

  const initialTime = useRef(0);
  const timerRef = useRef<NodeJS.Timer>();
  const progressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!player.lastPlayed) {
      return;
    }

    clearInterval(timerRef.current);

    if (player?.paused) {
      return;
    }

    initialTime.current = new Date().getTime();
    timerRef.current = setInterval(() => {
      const currentTime = new Date().getTime();
      const delay = currentTime - initialTime.current;
      initialTime.current = currentTime;
      mutations.position += delay;
      if (progressBarRef.current) {
        // update progress bar
        progressBarRef.current.style.width =
          (mutations.position * 100) / player?.duration + "%";
      }
    }, 10);
  }, [player]);

  // resolves autoplay podcast issue
  useEffect(() => {
    if (!player.paused && !audioAnalyser.source) pause();
  }, [audioAnalyser.source, player, pause]);

  function handlePlay() {
    play();
    if (audioAnalyser.source) {
      return;
    }
    audioAnalyser.setup(analyserOptions);
  }

  if (!player.lastPlayed) return null;

  return (
    <div
      className={`playerContainer ${
        !mouseActive && !player?.paused && "hidden"
      }`}
    >
      <div className="playerLeft">
        <Image
          alt="album art"
          height="50"
          src={player?.track_window.current_track.album.images[0].url}
          width="50"
        />
        <TrackDetails
          trackArtists={player?.track_window.current_track.artists}
          trackName={player?.track_window.current_track.name}
        />
      </div>
      <div className="playerCenter">
        <PlayerControls
          onNext={next}
          onPause={pause}
          onPlay={handlePlay}
          onPrev={prev}
          paused={player?.paused}
        />
        <ProgressBar ref={progressBarRef} />
      </div>
      <div className="playerRight"></div>
    </div>
  );
}
