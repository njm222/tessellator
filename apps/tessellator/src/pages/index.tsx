import React from "react";
import { DefaultPageProps } from "./_app";
import LandingScene from "../components/canvas/scenes/LandingScene";
import SocialLinks from "../components/dom/SocialLinks";
export default function Page() {
  return (
    <>
      <SocialLinks />
    </>
  );
}

Page.canvas = (props: DefaultPageProps) => <LandingScene r3f {...props} />;

export async function getStaticProps() {
  return {
    props: {
      title: "Tessellator",
    },
  };
}
