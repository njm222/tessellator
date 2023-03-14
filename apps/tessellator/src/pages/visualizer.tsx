import VisualizerScene from "../components/canvas/scenes/VisualizerScene";
import { Settings } from "../components/dom/settings/Settings";
import { Player } from "../components/dom/player/Player";
import WelcomeUser from "../components/dom/WelcomeUser";
import React from "react";
import { DefaultPageProps } from "./_app";
import { NextPageContext } from "next";

export default function Visualizer() {
  return (
    <>
      <WelcomeUser />
      <Player />
      <Settings />
    </>
  );
}

Visualizer.canvas = (props: DefaultPageProps) => (
  <VisualizerScene r3f {...props} />
);

export async function getServerSideProps({ query, res }: NextPageContext) {
  const { access_token, refresh_token } = query;

  if (access_token && refresh_token) {
    res?.setHeader("Set-Cookie", [
      `accessToken=${access_token}; path=/; samesite=strict; Max-Age=1800`,
      `refreshToken=${refresh_token}; path=/; samesite=strict;`,
    ]);
  }

  return {
    props: {
      title: "Visualizer",
    },
  };
}
