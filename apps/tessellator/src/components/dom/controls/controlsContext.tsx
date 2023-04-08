import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useMemo,
  useState,
} from "react";

import { useKeys } from "./useKeys";

const modeMap = [
  { key: "0", value: 0 },
  { key: "1", value: 1 },
  { key: "2", value: 2 },
];

export const numModes = modeMap.length;

const colourMap = [
  { key: "q", value: 0 },
  { key: "a", value: 1 },
  { key: "z", value: 2 },
  { key: "w", value: 3 },
];

export const numColourModes = colourMap.length;

type ControlsProviderProps = {
  modeKey?: number;
  colourKey?: number;
  setColourKey?: (key: number) => void;
  setModeKey?: (key: number) => void;
  children: ReactNode;
};

const ControlsContext = createContext({
  modeKey: 0,
  colourKey: 0,
  setColourKey: (key: number) => {
    return;
  },
  setModeKey: (key: number) => {
    return;
  },
});

export const useControls = () => useContext(ControlsContext);

export const ControlsProvider: FC<ControlsProviderProps> = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [modeKey, setModeKey] = useState(0);
  const [colourKey, setColourKey] = useState(0);

  useKeys([
    ...modeMap.map(({ key, value }) => ({
      keys: [key],
      fn: () => setModeKey(value),
    })),
    ...colourMap.map(({ key, value }) => ({
      keys: [key],
      fn: () => setColourKey(value),
    })),
  ]);

  const value = useMemo(
    () => ({
      modeKey,
      colourKey,
      setModeKey: (key: number) => setModeKey(key),
      setColourKey: (key: number) => setColourKey(key),
    }),
    [colourKey, modeKey]
  );

  return (
    <ControlsContext.Provider value={value}>
      {children}
    </ControlsContext.Provider>
  );
};
