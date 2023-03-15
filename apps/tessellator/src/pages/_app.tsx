import React, { useRef } from "react";
import Header from "../config";
import "../styles/index.css";
import dynamic from "next/dynamic";
import { Loader } from "ui";
import { ControlsProvider } from "../components/dom/controls/controlsContext";
import { MouseActivityProvider } from "../components/dom/controls/mouseActivityContext";
import { AuthProvider } from "../utils/authContext";
import { PortalProvider } from "../utils/portalContext";

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
      <AuthProvider>
        <ControlsProvider>
          <MouseActivityProvider>
            <PortalProvider>
              <DomLayout ref={ref}>
                {Component?.canvas ? (
                  <DefaultScene>{Component.canvas(pageProps)}</DefaultScene>
                ) : null}
                {(Component as any)(pageProps)}
              </DomLayout>
            </PortalProvider>
          </MouseActivityProvider>
        </ControlsProvider>
      </AuthProvider>
    </>
  );
}
