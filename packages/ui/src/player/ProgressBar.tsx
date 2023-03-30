import React, { forwardRef } from "react";

export const ProgressBar = forwardRef<HTMLDivElement>(
  function ProgressBarForwardRef(_, ref) {
    return (
      <div className="progress">
        <div className="progressBar" ref={ref} />
      </div>
    );
  }
);
