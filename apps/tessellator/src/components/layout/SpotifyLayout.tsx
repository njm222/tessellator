import React, { ReactNode } from "react";

import { PlayerProvider } from "../../utils/playerContext";

import { AnalyserLayout } from "./AnalyserLayout";

export const SpotifyLayout = ({ children }: { children: ReactNode }) => {
  return (
    <PlayerProvider>
      <AnalyserLayout>{children}</AnalyserLayout>
    </PlayerProvider>
  );
};
