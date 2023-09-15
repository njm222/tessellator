"use client";

import React from "react";
import dynamic from "next/dynamic";
import { Loader } from "ui";

import { ViewProps } from "../../components/canvas/View";
import BackNavigationButton from "../../components/dom/BackNavigationButton";
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
  {
    ssr: false,
    loading: () => <Loader message="Building scene" />,
  }
);

const DefaultLayout = dynamic<DefaultLayoutProps>(
  () =>
    import("../../components/layout/DefaultLayout").then(
      (mod) => mod.DefaultLayout
    ),
  { ssr: false, loading: () => <Loader /> }
);

export default function Page() {
  return (
    <DefaultLayout>
      <View className="fullscreenView" orbit>
        <VisualizerScene />
        <Common />
      </View>
      <BackNavigationButton />
      <WelcomeUser />
      <Player />
      <Settings />
    </DefaultLayout>
  );
}
