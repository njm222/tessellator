import { ReactNode } from "react";

import { r3f } from "./global";

export const Three = ({ children }: { children: ReactNode }) => {
  return <r3f.In>{children}</r3f.In>;
};
