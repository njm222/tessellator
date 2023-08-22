"use client";

import React, { ReactNode, useRef } from "react";
import { Globals } from "@react-spring/three";
import { Analytics } from "@vercel/analytics/react";
import dynamic from "next/dynamic";

/**
 * workaround from: https://github.com/pmndrs/react-spring/issues/1586
 */
Globals.assign({
  frameLoop: "always",
});

const Scene = dynamic(() => import("../canvas/Scene"), {
  ssr: false,
});

export const DefaultLayout = ({ children }: { children: ReactNode }) => {
  const ref = useRef(null);

  return (
    <>
      <div className="domContainer" ref={ref}>
        {children}
        <Scene
          eventPrefix="client"
          eventSource={ref}
          shadows="soft"
          style={{
            position: "absolute",
            top: 0,
            background: "#000",
          }}
        />
      </div>
      <Analytics />
    </>
  );
};
