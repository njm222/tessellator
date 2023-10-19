import { useEffect } from "react";
import { folder, useControls as useLevaControls } from "leva";

import { LocalStorageKeys } from "../../../config/constants";
import { useControls } from "../controls/controlsContext";

export function VisualizerOptions() {
  const {
    randomizeMode,
    randomizeColorMode,
    setRandomizeMode,
    setRandomizeColorMode,
  } = useControls();

  const visualizerOptions = {
    randomizeMode: {
      value: randomizeMode,
      onChange: (value: boolean) => {
        setRandomizeMode(value);
      },
    },
    randomizeColorMode: {
      value: randomizeColorMode,
      onChange: (value: boolean) => {
        setRandomizeColorMode(value);
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
      JSON.stringify({ randomizeMode, randomizeColorMode })
    );
  }, [randomizeColorMode, randomizeMode]);

  return null;
}
