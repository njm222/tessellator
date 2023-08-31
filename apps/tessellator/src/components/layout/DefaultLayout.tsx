import React, { ReactNode, useRef } from "react";
import { Globals } from "@react-spring/three";
import dynamic from "next/dynamic";
import { Loader } from "ui";

/**
 * workaround from: https://github.com/pmndrs/react-spring/issues/1586
 */
Globals.assign({
  frameLoop: "always",
});

const Scene = dynamic(() => import("../canvas/Scene"), {
  ssr: false,
  loading: () => <Loader message="Loading scene" />,
});

export type DefaultLayoutProps = {
  children: ReactNode;
};

export const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  const ref = useRef(null);

  return (
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
  );
};
