import { Stats } from "@react-three/drei";
import dynamic from "next/dynamic";
import { useStore } from "../utils/store";

const LandingScene = dynamic(
  () => import("../components/canvas/LandingScene"),
  {
    ssr: false,
  }
);

const Page = ({ title }) => {
  useStore.setState({ title });
  return (
    <>
      <LandingScene r3f />
      <Stats />
    </>
  );
};

export default Page;

export async function getStaticProps() {
  return {
    props: {
      title: "Tessellator",
    },
  };
}
