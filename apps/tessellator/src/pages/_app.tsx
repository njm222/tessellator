import React, { useRef } from "react";
import Header from "../config";
import "../styles/index.css";
import dynamic from "next/dynamic";
import { Loader } from "ui";

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
      <DomLayout ref={ref}>
        {Component?.canvas ? (
          <DefaultScene>{Component.canvas(pageProps)}</DefaultScene>
        ) : null}
        {(Component as any)(pageProps)}
      </DomLayout>
    </>
  );
}
