import { ReactNode } from "react";
import { extend, Object3DNode } from "@react-three/fiber";
import { RoundedPlaneGeometry } from "maath/geometry";

import { r3f } from "./global";

export const Three = ({ children }: { children: ReactNode }) => {
  return <r3f.In>{children}</r3f.In>;
};

extend({ RoundedPlaneGeometry });

declare module "@react-three/fiber" {
  interface ThreeElements {
    roundedPlaneGeometry: Object3DNode<
      RoundedPlaneGeometry,
      typeof RoundedPlaneGeometry
    >;
  }
}
