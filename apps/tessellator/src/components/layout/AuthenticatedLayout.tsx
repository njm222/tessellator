"use client";

import React, { ReactNode } from "react";
import dynamic from "next/dynamic";

import { PlayerProvider } from "../../utils/playerContext";
import { PortalProvider } from "../../utils/portalContext";
import { MouseActivityProvider } from "../dom/controls/mouseActivityContext";

const AnalyserProvider = dynamic(
  () =>
    import("../../utils/analyserContext").then((mod) => mod.AnalyserProvider),
  { ssr: false }
);
const ControlsProvider = dynamic(
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
