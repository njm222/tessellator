import React from "react";

import LandingScene from "../components/canvas/scenes/LandingScene";
import SocialLinks from "../components/dom/SocialLinks";

export default function Page() {
  return (
    <>
      <SocialLinks />
    </>
  );
}

Page.canvas = () => <LandingScene />;

export async function getStaticProps() {
  return {
    props: {
      title: "Tessellator",
    },
  };
}
