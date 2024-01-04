"use client";

import React, { ReactNode } from "react";
import { Loader } from "@tessellator/ui";
import dynamic from "next/dynamic";

import { PlayerProvider } from "../../utils/playerContext";

import { AnalyserLayout } from "./AnalyserLayout";

// const AnalyserProvider = dynamic<AnalyserProviderProps>(
//   () =>
//     import("../../utils/analyserContext").then((mod) => mod.AnalyserProvider),
//   { ssr: false, loading: () => <Loader /> }
// );

export const SpotifyLayout = ({ children }: { children: ReactNode }) => {
  return (
    <PlayerProvider>
      <AnalyserLayout>{children}</AnalyserLayout>
    </PlayerProvider>
  );
};
