import { useEffect } from "react";
import { folder, useControls as useLevaControls } from "leva";

import { LocalStorageKeys } from "../../../config/constants";
import { useControls } from "../controls/controlsContext";

export function VisualizerOptions() {
  const {
    randomizeMode,
    randomizeColourMode,
    setRandomizeMode,
    setRandomizeColourMode,
  } = useControls();

  const visualizerOptions = {
    randomizeMode: {
      value: randomizeMode,
      onChange: (value: boolean) => {
        setRandomizeMode(value);
      },
    },
    randomizeColourMode: {
      value: randomizeColourMode,
      onChange: (value: boolean) => {
        setRandomizeColourMode(value);
      },
    },
  };

  useLevaControls(
    () => ({
      Visualizer: folder(visualizerOptions, { collapsed: true }),
    }),
    []
  );

  useEffect(() => {
    localStorage.setItem(
      LocalStorageKeys.VISUALIZER_OPTIONS,
      JSON.stringify({ randomizeMode, randomizeColourMode })
    );
  }, [randomizeColourMode, randomizeMode]);

  return null;
}
