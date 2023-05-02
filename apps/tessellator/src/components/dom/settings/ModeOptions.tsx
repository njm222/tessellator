import { folder, useControls as useLevaControls } from "leva";

import { modeMap, useControls } from "../controls/controlsContext";

export function ModeOptions() {
  const {
    modes,
    addMode,
    removeMode,
    changeMode,
    randomizeMode,
    setRandomizeMode,
  } = useControls();

  const options = Object.keys(modeMap).reduce(
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

  const [modeOptions, setModeOptions] = useLevaControls(
    () => ({
      Modes: folder({
        randomizeMode: {
          value: randomizeMode,
          onChange: (value: boolean) => {
            setRandomizeMode(value);
          },
        },
        ...options,
      }),
    }),
    []
  );

  return null;
}
