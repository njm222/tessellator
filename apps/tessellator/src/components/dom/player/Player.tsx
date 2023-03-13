import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { mutations } from "../../../utils/store";
import PlayerControls from "./PlayerControls";
import { usePlayer } from "../../../utils/playerContext";
import { useMouseActivity } from "../controls/mouseActivityContext";

export function Player() {
  const { player } = usePlayer();
  const { mouseActive } = useMouseActivity();

  const initialTime = useRef(0);
  const timerRef = useRef<NodeJS.Timer>();
  const progressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!player) {
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

  if (!player) return null;

  return (
    <div className={`playerContainer ${!mouseActive && "hidden"}`}>
      <div className="playerLeft">
        <Image
          width={"50"}
          height={"50"}
          alt={"album art"}
          src={player?.track_window.current_track.album.images[0].url}
        />
        <div className="trackInfo">
          <div className="trackName">
            {player?.track_window.current_track.name}
          </div>
          <div className="trackArtist">
            {player?.track_window.current_track.artists[0].name}
          </div>
        </div>
      </div>
      <div className="playerCenter">
        <div className="playerControls">
          <PlayerControls />
        </div>
        <div className="progress">
          <div className="progress__bar" ref={progressBarRef} />
        </div>
      </div>
      <div className="playerRight"></div>
    </div>
  );
}
