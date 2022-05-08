import { Stats } from "@react-three/drei";
import dynamic from "next/dynamic";

const LandingScene = dynamic(
  () => import("../components/canvas/LandingScene"),
  {
    ssr: false,
  }
);

const Page = ({ showStats = false }: { showStats?: boolean }) => {
  return (
    <>
      <LandingScene r3f />
      {showStats && <Stats />}
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
