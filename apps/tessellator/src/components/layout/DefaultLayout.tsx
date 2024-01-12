"use client";
import React, { ReactNode, useRef } from "react";
import { Globals } from "@react-spring/three";
import dynamic from "next/dynamic";

import { MouseActivityProvider } from "../dom/controls/mouseActivityContext";

/**
 * workaround from: https://github.com/pmndrs/react-spring/issues/1586
 */
Globals.assign({
  frameLoop: "always",
});

const Scene = dynamic(() => import("../canvas/Scene"), {
  ssr: false,
});

export type DefaultLayoutProps = {
  children: ReactNode;
};

export const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  const ref = useRef(null);

  return (
    <div className="domContainer" ref={ref}>
      <MouseActivityProvider>{children}</MouseActivityProvider>
      <Scene
        eventPrefix="client"
        eventSource={ref}
        shadows="soft"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          pointerEvents: "none",
          zIndex: -1,
        }}
      />
    </div>
  );
};
