"use client";

import React, { ReactNode } from "react";

import { AnalyserProvider } from "../../utils/analyserContext";
import { PlayerProvider } from "../../utils/playerContext";
import { PortalProvider } from "../../utils/portalContext";
import { ControlsProvider } from "../dom/controls/controlsContext";
import { MouseActivityProvider } from "../dom/controls/mouseActivityContext";

export const AuthenticatedLayout = ({ children }: { children: ReactNode }) => {
  return (
    <PlayerProvider>
      <AnalyserProvider>
        <ControlsProvider>
          <MouseActivityProvider>
            <PortalProvider>{children}</PortalProvider>
          </MouseActivityProvider>
        </ControlsProvider>
      </AnalyserProvider>
    </PlayerProvider>
  );
};
