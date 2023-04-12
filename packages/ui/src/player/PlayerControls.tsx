import React from "react";

import {
  LikeButton,
  NextButton,
  PauseButton,
  PlayButton,
  PrevButton,
} from "./buttons";

export function PlayerControls({
  paused,
  onPrev,
  onPlay,
  onPause,
  onNext,
  onLike,
}: {
  paused: boolean;
  onPrev: () => void;
  onPlay: () => void;
  onPause: () => void;
  onNext: () => void;
  onLike: () => void;
}) {
  return (
    <div className="playerControls">
      <PrevButton onClick={onPrev} />
      {paused ? (
        <PlayButton onClick={onPlay} />
      ) : (
        <PauseButton onClick={onPause} />
      )}
      <NextButton onClick={onNext} />
      <LikeButton onClick={onLike} />
    </div>
  );
}
