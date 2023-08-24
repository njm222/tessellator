"use client";

import React, { ReactNode } from "react";
import dynamic from "next/dynamic";

import { AnalyserProviderProps } from "../../utils/analyserContext";
import { PlayerProvider } from "../../utils/playerContext";
import { PortalProvider } from "../../utils/portalContext";
import { ControlsProviderProps } from "../dom/controls/controlsContext";
import { MouseActivityProvider } from "../dom/controls/mouseActivityContext";

const AnalyserProvider = dynamic<AnalyserProviderProps>(
  () =>
    import("../../utils/analyserContext").then((mod) => mod.AnalyserProvider),
  { ssr: false }
);
const ControlsProvider = dynamic<ControlsProviderProps>(
  () =>
    import("../dom/controls/controlsContext").then(
      (mod) => mod.ControlsProvider
    ),
  { ssr: false }
);

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
