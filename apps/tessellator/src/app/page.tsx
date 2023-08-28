"use client";

import React from "react";
import dynamic from "next/dynamic";

import { ViewProps } from "../components/canvas/View";
import SocialLinks from "../components/dom/SocialLinks";
import { DefaultLayoutProps } from "../components/layout/DefaultLayout";
import { Loader } from "ui";

const LandingScene = dynamic<{}>(
  () =>
    import("../components/canvas/scenes/LandingScene").then(
      (mod) => mod.LandingScene
    ),
  { ssr: false }
);

const Common = dynamic<{}>(
  () => import("../components/canvas/View").then((mod) => mod.Common),
  { ssr: false }
);

const View = dynamic<ViewProps>(
  () => import("../components/canvas/View").then((mod) => mod.View),
  { ssr: false, loading: () => <Loader message="Building scene" /> }
);

const DefaultLayout = dynamic<DefaultLayoutProps>(
  () =>
    import("../components/layout/DefaultLayout").then(
      (mod) => mod.DefaultLayout
    ),
  { ssr: false, loading: () => <Loader /> }
);

export default function Page() {
  return (
    <DefaultLayout>
      <SocialLinks />
      <View>
        <LandingScene />
        <Common />
      </View>
    </DefaultLayout>
  );
}
