"use client";

import React, { ReactNode } from "react";
import dynamic from "next/dynamic";
import { Loader } from "ui";

import { AnalyserProviderProps } from "../../utils/analyserContext";
import { PlayerProvider } from "../../utils/playerContext";
import { ControlsProviderProps } from "../dom/controls/controlsContext";
import { MouseActivityProvider } from "../dom/controls/mouseActivityContext";

const AnalyserProvider = dynamic<AnalyserProviderProps>(
  () =>
    import("../../utils/analyserContext").then((mod) => mod.AnalyserProvider),
  { ssr: false, loading: () => <Loader /> }
);

const ControlsProvider = dynamic<ControlsProviderProps>(
  () =>
    import("../dom/controls/controlsContext").then(
      (mod) => mod.ControlsProvider
    ),
  { ssr: false, loading: () => <Loader /> }
);

export const AuthenticatedLayout = ({ children }: { children: ReactNode }) => {
  return (
    <PlayerProvider>
      <AnalyserProvider>
        <ControlsProvider>
          <MouseActivityProvider>{children}</MouseActivityProvider>
        </ControlsProvider>
      </AnalyserProvider>
    </PlayerProvider>
  );
};
