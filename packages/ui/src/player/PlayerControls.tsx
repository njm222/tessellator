import React from "react";

import {
  NextButton,
  PauseButton,
  PlayButton,
  PrevButton,
  SaveButton,
} from "./buttons";

export function PlayerControls({
  paused,
  onPrev,
  onPlay,
  onPause,
  onNext,
  onSave,
  isSaved,
}: {
  isSaved: boolean;
  paused: boolean;
  onPrev: () => void;
  onPlay: () => void;
  onPause: () => void;
  onNext: () => void;
  onSave: () => void;
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
      <SaveButton isSaved={isSaved} onClick={onSave} />
    </div>
  );
}
