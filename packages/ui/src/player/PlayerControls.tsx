import React from "react";

import {
  NextButton,
  PauseButton,
  PlayButton,
  PrevButton,
  SaveButton,
} from "./buttons";

export function PlayerControls({
  isPaused,
  onPrev,
  onPlay,
  onPause,
  onNext,
  onSave,
  isSaved,
}: {
  isSaved: boolean;
  isPaused: boolean;
  onPrev: () => void;
  onPlay: () => void;
  onPause: () => void;
  onNext: () => void;
  onSave: () => void;
}) {
  return (
    <div className="playerControls">
      <PrevButton onClick={onPrev} />
      {isPaused ? (
        <PlayButton onClick={onPlay} />
      ) : (
        <PauseButton onClick={onPause} />
      )}
      <NextButton onClick={onNext} />
      <SaveButton isSaved={isSaved} onClick={onSave} />
    </div>
  );
}
