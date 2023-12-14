import React, { useState } from "react";
import { IconButton, SettingsIcon } from "@tessellator/ui";
import { button, Leva, useControls } from "leva";

import { useMouseActivity } from "../controls/mouseActivityContext";

import { AnalyserOptions } from "./AnalyserOptions";
import { ModeOptions } from "./ModeOptions";
import { VisualizerOptions } from "./VisualizerOptions";

export function Settings({ spotify = false }: { spotify?: boolean }) {
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
        <SettingsOptions spotify={spotify} handleClose={() => setOpen(false)} />
      </div>
    </>
  );
}

function SettingsOptions({
  handleClose,
  spotify,
}: {
  handleClose: () => void;
  spotify: boolean;
}) {
  useControls({ close: button(handleClose) }, []);

  return (
    <>
      <Leva
        hideCopyButton
        oneLineLabels
        titleBar={{ title: "Settings", drag: false, filter: false }}
      />
      <AnalyserOptions />
      {spotify ? (
        <>
          <VisualizerOptions />
          <ModeOptions />
        </>
      ) : null}
    </>
  );
}
