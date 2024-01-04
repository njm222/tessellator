import React, { Suspense } from "react";

import { useControls } from "../../dom/controls/controlsContext";

import LiveMode0 from "./mode-0/Mode0";
import LiveMode1 from "./mode-1/Mode1";
import LiveMode2 from "./mode-2/Mode2";
import LiveMode3 from "./mode-3/Mode3";
import LiveMode4 from "./mode-4/Mode4";
import LiveMode5 from "./mode-5/Mode5";

export function LiveModes() {
  const { modeKey } = useControls();

  return (
    <Suspense>
      <LiveMode0 opacity={0 === modeKey ? 1 : 0} />
      <LiveMode1 opacity={1 === modeKey ? 1 : 0} />
      <LiveMode2 opacity={2 === modeKey ? 1 : 0} />
      <LiveMode3 opacity={3 === modeKey ? 1 : 0} />
      <LiveMode4 opacity={4 === modeKey ? 1 : 0} />
      <LiveMode5 opacity={5 === modeKey ? 1 : 0} />
    </Suspense>
  );
}

export type ModeProps = {
  opacity: number;
};
