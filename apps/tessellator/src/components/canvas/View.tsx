import React, {
  forwardRef,
  HTMLAttributes,
  MutableRefObject,
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
  <>
    {color && <color args={[color]} attach="background" />}
    <ambientLight intensity={0.5} />
    <directionalLight intensity={1} position={[2.5, 2, 12]} />
    <pointLight castShadow intensity={1} position={[-10, 5, 20]} />
    {environment.production ? null : (
      <Perf antialias={false} colorBlind deepAnalyze position="top-left" />
    )}
    <AdaptiveDpr pixelated />
    <AdaptiveEvents />
  </>
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
            {orbit && <OrbitControls />}
          </ViewImpl>
        </Three>
      </>
    );
  }
);

View.displayName = "View";

export { View };
