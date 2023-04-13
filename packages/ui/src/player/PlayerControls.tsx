import React from "react";

import {
  NextButton,
  PauseButton,
  PlayButton,
  PrevButton,
  SaveButton,
  ShuffleButton,
} from "./buttons";

export function PlayerControls({
  isPaused,
  onPrev,
  onPlay,
  onPause,
  onNext,
  onSave,
  onShuffle,
  isSaved,
  isShuffle,
}: {
  isShuffle: boolean;
  isSaved: boolean;
  isPaused: boolean;
  onPrev: () => void;
  onPlay: () => void;
  onPause: () => void;
  onNext: () => void;
  onSave: () => void;
  onShuffle: () => void;
}) {
  return (
    <div className="playerControls">
      <ShuffleButton isShuffle={isShuffle} onClick={onShuffle} />
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
