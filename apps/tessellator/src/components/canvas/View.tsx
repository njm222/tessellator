"use client";
import React, {
  forwardRef,
  HTMLAttributes,
  MutableRefObject,
  Suspense,
  useImperativeHandle,
  useRef,
} from "react";
import {
  AdaptiveDpr,
  AdaptiveEvents,
  OrbitControls,
  View as ViewImpl,
} from "@react-three/drei";
import { Perf } from "r3f-perf";
import { ColorRepresentation } from "three";

import { environment } from "../../config/environment";
import { Three } from "../../helpers/Three";

export type CommonProps = { color?: ColorRepresentation };

export const Common = ({ color = "#000" }: CommonProps) => (
  <Suspense>
    {color && <color args={[color]} attach="background" />}
    <ambientLight intensity={3} />
    <directionalLight intensity={5} position={[2.5, 2, 12]} />
    <pointLight castShadow intensity={5} position={[-10, 5, 20]} />
    {environment.production ? null : (
      <Perf antialias={false} colorBlind deepAnalyze position="bottom-left" />
    )}
    <AdaptiveDpr pixelated />
    <AdaptiveEvents />
  </Suspense>
);

export type ViewProps = HTMLAttributes<HTMLDivElement> & {
  orbit?: boolean;
};

const View = forwardRef<HTMLDivElement, ViewProps>(
  ({ children, orbit, ...props }, ref) => {
    const localRef = useRef<HTMLDivElement>(null);

    useImperativeHandle(ref, () => localRef.current as HTMLDivElement);

    return (
      <>
        <div ref={localRef} {...props} />
        <Three>
          <ViewImpl track={localRef as MutableRefObject<HTMLDivElement>}>
            {children}
            {orbit && <OrbitControls enablePan={false} />}
          </ViewImpl>
        </Three>
      </>
    );
  }
);

View.displayName = "View";

export { View };
