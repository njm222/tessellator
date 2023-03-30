import React from "react";

import { NextButton, PauseButton, PlayButton, PrevButton } from "./buttons";

export function PlayerControls({
  paused,
  onPrev,
  onPlay,
  onPause,
  onNext,
}: {
  paused: boolean;
  onPrev: () => void;
  onPlay: () => void;
  onPause: () => void;
  onNext: () => void;
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
    </div>
  );
}
