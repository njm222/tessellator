"use client";

import React, { Suspense } from "react";
import dynamic from "next/dynamic";
import { Loader } from "ui";

import { Player } from "../../src/components/dom/player/Player";
import { Settings } from "../../src/components/dom/settings/Settings";
import { WelcomeUser } from "../../src/components/dom/WelcomeUser";

const VisualizerScene = dynamic(
  () =>
    import("../../src/components/canvas/scenes/VisualizerScene").then(
      (mod) => mod.VisualizerScene
    ),
  { ssr: false }
);
const Common = dynamic(
  () => import("../../src/components/canvas/View").then((mod) => mod.Common),
  { ssr: false }
);

const View = dynamic(
  () => import("../../src/components/canvas/View").then((mod) => mod.View),
  { ssr: false, loading: () => <Loader /> }
);

export default function Page() {
  return (
    <>
      <WelcomeUser />
      <Player />
      <Settings />
      <View>
        <Suspense fallback={null}>
          <VisualizerScene />
          <Common />
        </Suspense>
      </View>
    </>
  );
}
