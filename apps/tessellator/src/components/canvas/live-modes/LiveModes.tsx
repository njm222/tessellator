import React, { Suspense } from "react";

import { useControls } from "../../dom/controls/controlsContext";

import Mode0 from "./mode-0/Mode0";
// import Mode1 from "./mode-1/Mode1";
// import Mode2 from "./mode-2/Mode2";
// import Mode3 from "./mode-3/Mode3";
// import Mode4 from "./mode-4/Mode4";
// import Mode5 from "./mode-5/Mode5";

export function LiveModes() {
  const { modeKey } = useControls();

  return (
    <Suspense>
      <Mode0 opacity={0 === modeKey ? 1 : 0} />
    </Suspense>
  );
}

export type ModeProps = {
  opacity: number;
};
