import { button, useControls } from "leva";
import { useState } from "react";
import React from "react";
import { IconButton, SettingsIcon } from "ui";
import { useMouseActivity } from "../controls/mouseActivityContext";
import { AnalyserOptions } from "./AnalyserOptions";

export function Settings() {
  const { mouseActive } = useMouseActivity();

  const [open, setOpen] = useState(false);
  return open ? (
    <SettingsOptions handleClose={() => setOpen(false)} />
  ) : (
    <div className={`settings ${!mouseActive && "hidden"}`}>
      <IconButton
        title="settings"
        onClick={() => setOpen(true)}
        icon={<SettingsIcon />}
      />
    </div>
  );
}

function SettingsOptions({ handleClose }: { handleClose: () => void }) {
  useControls({ close: button(handleClose) }, []);

  return <AnalyserOptions />;
}
