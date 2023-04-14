import React, { forwardRef, MouseEvent } from "react";

export const ProgressBar = forwardRef<
  HTMLDivElement,
  { onSeek?: (e: MouseEvent<HTMLElement>) => void }
>(function ProgressBarForwardRef({ onSeek }, ref) {
  return (
    <div className="progress" onClick={onSeek} ref={ref}>
      <div className="progressBar" title="progress-bar" />
    </div>
  );
});
