"use client";

import React, { ReactNode, useRef } from "react";
import { AdaptiveDpr, AdaptiveEvents, OrbitControls } from "@react-three/drei";
import { Perf } from "r3f-perf";

import { environment } from "../../environments/environment";
import { Three } from "../../helpers/Three";

export const Common = () => (
  <>
    <ambientLight intensity={0.5} />
    <directionalLight intensity={1} position={[2.5, 2, 12]} />
    <pointLight castShadow intensity={1} position={[-10, 5, 20]} />
    <OrbitControls />
    {environment.production ? null : (
      <Perf antialias={false} colorBlind deepAnalyze position="top-left" />
    )}
    <AdaptiveDpr pixelated />
    <AdaptiveEvents />
  </>
);

export type ViewProps = {
  children: ReactNode;
};

const View = ({ children, ...props }: ViewProps) => {
  const localRef = useRef(null);

  return (
    <>
      <div ref={localRef} {...props} />
      <Three>{children}</Three>
    </>
  );
};

View.displayName = "View";

export { View };
