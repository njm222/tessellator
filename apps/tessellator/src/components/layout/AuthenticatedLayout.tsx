"use client";

import React, { ReactNode } from "react";
import { Loader } from "@tessellator/ui";
import dynamic from "next/dynamic";

import { AnalyserProviderProps } from "../../utils/analyserContext";
import { PlayerProvider } from "../../utils/playerContext";
import { ControlsProviderProps } from "../dom/controls/controlsContext";

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
        <ControlsProvider>{children}</ControlsProvider>
      </AnalyserProvider>
    </PlayerProvider>
  );
};
