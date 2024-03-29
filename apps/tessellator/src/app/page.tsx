"use client";

import React, { Suspense } from "react";
import { Loader } from "@tessellator/ui";
import dynamic from "next/dynamic";

import { CommonProps, ViewProps } from "../components/canvas/View";
import SocialLinks from "../components/dom/SocialLinks";
import { DefaultLayoutProps } from "../components/layout/DefaultLayout";

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

const DefaultLayout = dynamic<DefaultLayoutProps>(
  () =>
    import("../components/layout/DefaultLayout").then(
      (mod) => mod.DefaultLayout
    ),
  {
    ssr: false,
    loading: () => <Loader dotVariant={3} />,
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
    <DefaultLayout>
      <View className="fullscreenView" orbit>
        <Suspense>
          <LandingScene />
          <Common />
        </Suspense>
      </View>
      <SocialLinks />
    </DefaultLayout>
  );
}
