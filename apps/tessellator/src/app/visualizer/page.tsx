"use client";

import React from "react";
import { Loader } from "@tessellator/ui";
import dynamic from "next/dynamic";

import { ViewProps } from "../../components/canvas/View";
import BackNavigationButton from "../../components/dom/BackNavigationButton";
import { Player } from "../../components/dom/player/Player";
import { Settings } from "../../components/dom/settings/Settings";
import { WelcomeSpotifyUser } from "../../components/dom/WelcomeSpotifyUser";

const Common = dynamic<{}>(
  () => import("../../components/canvas/View").then((mod) => mod.Common),
  { ssr: false }
);

const View = dynamic<ViewProps>(
  () => import("../../components/canvas/View").then((mod) => mod.View),
  {
    ssr: false,
    loading: () => (
      <Loader dotVariant={3} hintVariant={2} message="Building scene" />
    ),
  }
);

const VisualizerScene = dynamic<{}>(
  () =>
    import("../../components/canvas/scenes/VisualizerScene").then(
      (mod) => mod.VisualizerScene
    ),
  {
    ssr: false,
  }
);

export default function Page() {
  return (
    <>
      <View className="fullscreenView" orbit>
        <VisualizerScene />
        <Common />
      </View>
      <WelcomeSpotifyUser />
      <Player />
      <BackNavigationButton />
      <Settings spotify />
    </>
  );
}
