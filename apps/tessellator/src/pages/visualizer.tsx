import React from "react";
import { NextPageContext } from "next";
import { Settings } from "../components/dom/settings/Settings";
import { Player } from "../components/dom/player/Player";
import WelcomeUser from "../components/dom/WelcomeUser";
import VisualizerScene from "../components/canvas/scenes/VisualizerScene";
import { withAuthentication } from "../utils/withAuthentication";

export default function Visualizer() {
  return (
    <>
      <WelcomeUser />
      <Player />
      <Settings />
    </>
  );
}

Visualizer.canvas = () => (
  <VisualizerScene  />
);

export const getServerSideProps = withAuthentication(
  async (context: NextPageContext) => {
    return {
      props: {
        title: "Visualizer",
      },
    };
  }
);
