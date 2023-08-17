import React, { useState } from "react";
import { button, Leva, useControls } from "leva";
import { IconButton, SettingsIcon } from "ui";

import { useMouseActivity } from "../controls/mouseActivityContext";

import { AnalyserOptions } from "./AnalyserOptions";
import { ModeOptions } from "./ModeOptions";
import { VisualizerOptions } from "./VisualizerOptions";

export function Settings() {
  const { mouseActive } = useMouseActivity();

  const [open, setOpen] = useState(false);
  return (
    <>
      <div className={`settings ${!mouseActive || open ? "hidden" : ""}`}>
        <IconButton
          icon={<SettingsIcon />}
          onClick={() => setOpen(true)}
          title="settings"
        />
      </div>
      <div className={`${!open ? "hidden" : ""}`}>
        <SettingsOptions handleClose={() => setOpen(false)} />
      </div>
    </>
  );
}

function SettingsOptions({ handleClose }: { handleClose: () => void }) {
  useControls({ close: button(handleClose) }, []);

  return (
    <>
      <Leva
        hideCopyButton
        oneLineLabels
        titleBar={{ title: "Settings", drag: false, filter: false }}
      />
      <AnalyserOptions />
      <VisualizerOptions />
      <ModeOptions />
    </>
  );
}
