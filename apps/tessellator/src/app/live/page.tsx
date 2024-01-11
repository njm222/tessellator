"use client";

import React from "react";
import { Loader } from "@tessellator/ui";
import dynamic from "next/dynamic";

import { ViewProps } from "../../components/canvas/View";
import BackNavigationButton from "../../components/dom/BackNavigationButton";
import ClickToStart from "../../components/dom/ClickToStart";
import { Settings } from "../../components/dom/settings/Settings";

const Common = dynamic<{}>(
  () => import("../../components/canvas/View").then((mod) => mod.Common),
  { ssr: false }
);

const View = dynamic<ViewProps>(
  () => import("../../components/canvas/View").then((mod) => mod.View),
  {
    ssr: false,
    loading: () => (
      <Loader dotVariant={3} hintVariant={1} message="Building scene" />
    ),
  }
);

const LiveScene = dynamic<{}>(
  () =>
    import("../../components/canvas/scenes/LiveScene").then(
      (mod) => mod.LiveScene
    ),
  { ssr: false }
);

export default function Page() {
  return (
    <>
      <View className="fullscreenView" orbit>
        <LiveScene />
        <Common />
      </View>
      <ClickToStart />
      <BackNavigationButton />
      <Settings />
    </>
  );
}
