import React, { useRef } from "react";
import { Analytics } from "@vercel/analytics/react";
import dynamic from "next/dynamic";
import { Tomorrow } from "next/font/google";
import { Loader } from "ui";

import Header from "../config";

import "../styles/index.css";

const DomLayout = dynamic(() => import("../components/layout/DomLayout"), {
  ssr: false,
  loading: () => <Loader dotVariant={4} />,
});
const DefaultScene = dynamic(
  () => import("../components/layout/DefaultScene"),
  {
    ssr: false,
    loading: () => <Loader dotVariant={4} />,
  }
);

interface C extends JSX.Element {
  canvas?: (props: DefaultPageProps) => JSX.Element;
}

export type DefaultPageProps = { title: string; r3f?: boolean };

const tomorrow = Tomorrow({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export default function App({
  Component,
  pageProps = { title: "Tessellator" },
}: {
  Component: C;
  pageProps: DefaultPageProps;
}) {
  const ref = useRef(null);
  return (
    <>
      <Header title={pageProps.title} />
      <main className={tomorrow.className}>
        <DomLayout ref={ref}>
          {Component?.canvas ? (
            <DefaultScene>{Component.canvas(pageProps)}</DefaultScene>
          ) : null}
          {(Component as any)(pageProps)}
        </DomLayout>
      </main>
      <Analytics />
    </>
  );
}
