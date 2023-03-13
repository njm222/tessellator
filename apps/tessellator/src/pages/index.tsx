import LandingScene from "../components/canvas/scenes/LandingScene";
import { DefaultPageProps } from "./_app";

export default function Page() {
  return null;
}

Page.canvas = (props: DefaultPageProps) => <LandingScene r3f {...props} />;

export async function getStaticProps() {
  return {
    props: {
      title: "Tessellator",
    },
  };
}
