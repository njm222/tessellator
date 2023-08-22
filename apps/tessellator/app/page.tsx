"use client";

import React, { Suspense } from "react";
import dynamic from "next/dynamic";
import { Loader } from "ui";

import SocialLinks from "../src/components/dom/SocialLinks";

const LandingScene = dynamic(
  () =>
    import("../src/components/canvas/scenes/LandingScene").then(
      (mod) => mod.LandingScene
    ),
  { ssr: false }
);
const Common = dynamic(
  () => import("../src/components/canvas/View").then((mod) => mod.Common),
  { ssr: false }
);

const View = dynamic(
  () => import("../src/components/canvas/View").then((mod) => mod.View),
  { ssr: false, loading: () => <Loader /> }
);

const DefaultLayout = dynamic(
  () =>
    import("../src/components/layout/DefaultLayout").then(
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
