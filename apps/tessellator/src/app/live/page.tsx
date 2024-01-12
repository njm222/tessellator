"use client";

import React from "react";
import { Loader } from "@tessellator/ui";
import dynamic from "next/dynamic";

import { ViewProps } from "../../components/canvas/View";
import BackNavigationButton from "../../components/dom/BackNavigationButton";
import ClickToStart from "../../components/dom/ClickToStart";
import { Settings } from "../../components/dom/settings/Settings";
import { DefaultLayoutProps } from "../../components/layout/DefaultLayout";

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

const DefaultLayout = dynamic<DefaultLayoutProps>(
  () =>
    import("../../components/layout/DefaultLayout").then(
      (mod) => mod.DefaultLayout
    ),
  {
    ssr: false,
    loading: () => <Loader hintVariant={1} />,
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
    <DefaultLayout>
      <View className="fullscreenView" orbit>
        <LiveScene />
        <Common />
      </View>
      <ClickToStart />
      <BackNavigationButton />
      <Settings />
    </DefaultLayout>
  );
}
