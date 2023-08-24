"use client";

import React, { Suspense } from "react";
import dynamic from "next/dynamic";
import { Loader } from "ui";

import { ViewProps } from "../components/canvas/View";
import SocialLinks from "../components/dom/SocialLinks";
import { DefaultLayoutProps } from "../components/layout/DefaultLayout";

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
  { ssr: false, loading: () => <Loader /> }
);

const DefaultLayout = dynamic<DefaultLayoutProps>(
  () =>
    import("../components/layout/DefaultLayout").then(
      (mod) => mod.DefaultLayout
    ),
  { ssr: false }
);

export default function Page() {
  return (
    <DefaultLayout>
      <SocialLinks />
      <View>
        <Suspense fallback={null}>
          <LandingScene />
          <Common />
        </Suspense>
      </View>
    </DefaultLayout>
  );
}
