import React, { forwardRef } from "react";

export type Ref = HTMLDivElement;

export const ProgressBar = forwardRef<Ref>(function ProgressBarForwardRef(
  _,
  ref
) {
  return (
    <div className="progress">
      <div className="progressBar" ref={ref} />
    </div>
  );
});
