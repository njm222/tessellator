import { folder, useControls as useLevaControls } from "leva";

import { modeMap, useControls } from "../controls/controlsContext";

export function ModeOptions() {
  const {
    modes,
    addMode,
    removeMode,
    changeMode,
    randomizeMode,
    randomizeColourMode,
    setRandomizeMode,
    setRandomizeColourMode,
  } = useControls();

  const modeOptions = Object.keys(modeMap).reduce(
    (acc, curr: string) => {
      acc[`mode${curr}`] = {
        value: modes.includes(parseInt(curr)),
        onChange: (value: boolean) => {
          value ? addMode(parseInt(curr)) : removeMode(parseInt(curr));
          changeMode();
        },
      };
      return acc;
    },
    {} as {
      [x: string]: { value: boolean; onChange: (value: boolean) => void };
    }
  );

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
      Modes: folder(modeOptions, { collapsed: true }),
    }),
    []
  );

  return null;
}
