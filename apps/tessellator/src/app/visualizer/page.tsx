"use client";

import React, { Suspense } from "react";
import dynamic from "next/dynamic";
import { Loader } from "ui";

import { ViewProps } from "../../components/canvas/View";
import { Player } from "../../components/dom/player/Player";
import { Settings } from "../../components/dom/settings/Settings";
import { WelcomeUser } from "../../components/dom/WelcomeUser";
import { DefaultLayoutProps } from "../../components/layout/DefaultLayout";

const VisualizerScene = dynamic<{}>(
  () =>
    import("../../components/canvas/scenes/VisualizerScene").then(
      (mod) => mod.VisualizerScene
    ),
  { ssr: false }
);
const Common = dynamic<{}>(
  () => import("../../components/canvas/View").then((mod) => mod.Common),
  { ssr: false }
);

const View = dynamic<ViewProps>(
  () => import("../../components/canvas/View").then((mod) => mod.View),
  { ssr: false, loading: () => <Loader /> }
);

const DefaultLayout = dynamic<DefaultLayoutProps>(
  () =>
    import("../../components/layout/DefaultLayout").then(
      (mod) => mod.DefaultLayout
    ),
  { ssr: false }
);

export default function Page() {
  return (
    <DefaultLayout>
      <WelcomeUser />
      <Player />
      <Settings />
      <View>
        <Suspense fallback={null}>
          <VisualizerScene />
          <Common />
        </Suspense>
      </View>
    </DefaultLayout>
  );
}
