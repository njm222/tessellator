import React, { useRef } from "react";
import Header from "../config";
import DomLayout from "../components/layout/DomLayout";
import "../styles/index.css";
import { AuthProvider } from "../utils/authContext";
import DefaultScene from "../components/layout/DefaultScene";

interface C extends JSX.Element {
  canvas: (props: DefaultPageProps) => JSX.Element;
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
      <AuthProvider>
        <DomLayout ref={ref}>
          {Component?.canvas && (
            <DefaultScene>{Component.canvas(pageProps)}</DefaultScene>
          )}
          {(Component as any)(pageProps)}
        </DomLayout>
      </AuthProvider>
    </>
  );
}
