import { NextPageContext } from "next";

import VisualizerScene from "../components/canvas/scenes/VisualizerScene";
import { Player } from "../components/dom/player/Player";
import { Settings } from "../components/dom/settings/Settings";
import WelcomeUser from "../components/dom/WelcomeUser";
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

Visualizer.canvas = () => <VisualizerScene />;

export const getServerSideProps = withAuthentication(
  async (context: NextPageContext) => {
    return {
      props: {
        title: "Visualizer",
      },
    };
  }
);
