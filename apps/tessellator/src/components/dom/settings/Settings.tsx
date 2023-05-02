import React, { useState } from "react";
import { button, useControls } from "leva";
import { IconButton, SettingsIcon } from "ui";

import { useMouseActivity } from "../controls/mouseActivityContext";

import { AnalyserOptions } from "./AnalyserOptions";
import { ModeOptions } from "./ModeOptions";

export function Settings() {
  const { mouseActive } = useMouseActivity();

  const [open, setOpen] = useState(false);
  return open ? (
    <SettingsOptions handleClose={() => setOpen(false)} />
  ) : (
    <div className={`settings ${!mouseActive && "hidden"}`}>
      <IconButton
        icon={<SettingsIcon />}
        onClick={() => setOpen(true)}
        title="settings"
      />
    </div>
  );
}

function SettingsOptions({ handleClose }: { handleClose: () => void }) {
  useControls({ close: button(handleClose) }, []);

  return (
    <>
      <AnalyserOptions />
      <ModeOptions />
    </>
  );
}
