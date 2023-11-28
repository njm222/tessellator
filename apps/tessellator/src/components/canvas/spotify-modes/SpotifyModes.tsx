import React, { Suspense } from "react";

import { useControls } from "../../dom/controls/controlsContext";

import SpotifyMode0 from "./mode-0/Mode0";
import SpotifyMode1 from "./mode-1/Mode1";
import SpotifyMode2 from "./mode-2/Mode2";
import Mode3 from "./mode-3/Mode3";
import Mode4 from "./mode-4/Mode4";
import Mode5 from "./mode-5/Mode5";

export function SpotifyModes() {
  const { modeKey } = useControls();

  return (
    <Suspense>
      <SpotifyMode0 opacity={0 === modeKey ? 1 : 0} />
      <SpotifyMode1 opacity={1 === modeKey ? 1 : 0} />
      <SpotifyMode2 opacity={2 === modeKey ? 1 : 0} />
      <Mode3 opacity={3 === modeKey ? 1 : 0} />
      <Mode4 opacity={4 === modeKey ? 1 : 0} />
      <Mode5 opacity={5 === modeKey ? 1 : 0} />
    </Suspense>
  );
}

export type ModeProps = {
  opacity: number;
};
