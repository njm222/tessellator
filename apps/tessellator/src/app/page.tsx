"use client";

import React from "react";
import { Loader } from "@tessellator/ui";
import dynamic from "next/dynamic";

import { CommonProps, ViewProps } from "../components/canvas/View";
import SocialLinks from "../components/dom/SocialLinks";

const Common = dynamic<CommonProps>(
  () => import("../components/canvas/View").then((mod) => mod.Common),
  { ssr: false }
);

const View = dynamic<ViewProps>(
  () => import("../components/canvas/View").then((mod) => mod.View),
  {
    ssr: false,
    loading: () => <Loader dotVariant={3} message="Building scene" />,
  }
);

const LandingScene = dynamic<{}>(
  () =>
    import("../components/canvas/scenes/LandingScene").then(
      (mod) => mod.LandingScene
    ),
  {
    ssr: false,
  }
);

export default function Page() {
  return (
    <>
      <View className="fullscreenView" orbit>
        <LandingScene />
        <Common />
      </View>
      <SocialLinks />
    </>
  );
}
