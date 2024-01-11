import React, { ReactNode } from "react";

import { AnalyserProvider } from "../../utils/analyserContext";
import { ControlsProvider } from "../dom/controls/controlsContext";

export const AnalyserLayout = ({ children }: { children: ReactNode }) => {
  return (
    <AnalyserProvider>
      <ControlsProvider>{children}</ControlsProvider>
    </AnalyserProvider>
  );
};
