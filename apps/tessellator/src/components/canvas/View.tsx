"use client";

import React, {
  forwardRef,
  ReactNode,
  Suspense,
  useImperativeHandle,
  useRef,
} from "react";
import { AdaptiveDpr, AdaptiveEvents, OrbitControls } from "@react-three/drei";
import { Perf } from "r3f-perf";

import { environment } from "../../environments/environment";
import { Three } from "../../helpers/Three";

export const Common = () => (
  <Suspense fallback={null}>
    <ambientLight intensity={0.5} />
    <directionalLight intensity={1} position={[2.5, 2, 12]} />
    <pointLight castShadow intensity={1} position={[-10, 5, 20]} />
    <OrbitControls />
    {environment.production ? null : (
      <Perf antialias={false} colorBlind deepAnalyze position="top-left" />
    )}
    <AdaptiveDpr pixelated />
    <AdaptiveEvents />
  </Suspense>
);

const View = forwardRef<unknown, { children: ReactNode }>(
  ({ children, ...props }, ref) => {
    const localRef = useRef(null);
    useImperativeHandle(ref, () => localRef.current);

    return (
      <>
        <div ref={localRef} {...props} />
        <Three>{children}</Three>
      </>
    );
  }
);

View.displayName = "View";

export { View };
