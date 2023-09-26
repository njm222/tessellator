"use client";

import {
  createContext,
  createRef,
  ReactNode,
  Ref,
  RefObject,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";
import { generateRandomInteger } from "core";

import { LocalStorageKeys } from "../../../config/constants";
import { toggleFullScreen } from "../../../helpers/global";
import { getLocalStorageItem } from "../../../utils/store";

import { useKeys } from "./useKeys";

export const modeMap = [
  { key: "0", value: 0 },
  { key: "1", value: 1 },
  { key: "2", value: 2 },
  { key: "3", value: 3 },
];

const colourMap = [
  { key: "q", value: 0 },
  { key: "a", value: 1 },
  { key: "z", value: 2 },
  { key: "w", value: 3 },
];

export type ControlsProviderProps = {
  children: ReactNode;
  enabledModes?: number[];
  modeKey?: number;
  colourKey?: RefObject<number>;
  randomizeMode?: boolean;
  randomizeColourMode?: boolean;
  setRandomizeMode?: (value: boolean) => void;
  setRandomizeColourMode?: (value: boolean) => void;
  addMode?: (mode: number) => void;
  removeMode?: (mode: number) => void;
  changeColourMode?: () => void;
  changeMode?: () => void;
};

const ControlsContext = createContext({
  enabledModes: [0],
  modeKey: 0,
  colourKey: createRef(),
  randomizeMode: true,
  randomizeColourMode: true,
  addMode: (value: number) => {
    return;
  },
  removeMode: (value: number) => {
    return;
  },
  changeColourMode: () => {
    return;
  },
  changeMode: () => {
    return;
  },
  setRandomizeMode: (value: boolean) => {
    return;
  },
  setRandomizeColourMode: (value: boolean) => {
    return;
  },
});

export const useControls = () => useContext(ControlsContext);

export const ControlsProvider = ({ children }: ControlsProviderProps) => {
  const [enabledModes, setEnabledModes] = useState(
    modeMap.reduce((acc, curr) => {
      acc.push(curr.value);
      return acc;
    }, [] as number[])
  );

  const [modeKey, setModeKey] = useState(0);
  const [randomizeMode, setRandomizeMode] = useState(
    getLocalStorageItem(LocalStorageKeys.VISUALIZER_OPTIONS)?.randomizeMode ??
      true
  );
  const colourKey = useRef(0);
  const [randomizeColourMode, setRandomizeColourMode] = useState(
    getLocalStorageItem(LocalStorageKeys.VISUALIZER_OPTIONS)
      ?.randomizeColourMode ?? true
  );

  useKeys([
    ...modeMap.map(({ key, value }) => ({
      keys: [key],
      fn: () => setModeKey(value),
    })),
    ...colourMap.map(({ key, value }) => ({
      keys: [key],
      fn: () => (colourKey.current = value),
    })),
    { keys: ["f", "F"], fn: () => toggleFullScreen() },
  ]);

  const value = useMemo(
    () => ({
      enabledModes,
      modeKey,
      colourKey,
      addMode: (mode: number) => {
        if (enabledModes.includes(mode)) {
          return;
        }
        setEnabledModes((prevState) => {
          prevState.push(mode);
          return prevState;
        });
      },
      removeMode: (mode: number) => {
        setEnabledModes((prevState) => {
          const index = prevState.findIndex((val) => val === mode);
          if (index >= 0) {
            prevState.splice(index, 1);
          }
          return prevState;
        });
      },
      changeMode: () => {
        if (enabledModes.length === 0) {
          setModeKey(0);
          return;
        }
        if (enabledModes.length <= 1) {
          setModeKey(enabledModes[0]);
          return;
        }
        const index = generateRandomInteger(0, enabledModes.length - 1);
        setModeKey(enabledModes[index]);
      },
      changeColourMode: () => {
        colourKey.current = generateRandomInteger(0, colourMap.length - 1);
      },
      randomizeMode,
      randomizeColourMode,
      setRandomizeMode: (value: boolean) => setRandomizeMode(value),
      setRandomizeColourMode: (value: boolean) => setRandomizeColourMode(value),
    }),
    [
      enabledModes,
      colourKey,
      modeKey,
      setEnabledModes,
      randomizeMode,
      setRandomizeMode,
      randomizeColourMode,
      setRandomizeColourMode,
    ]
  );

  return (
    <ControlsContext.Provider value={value}>
      {children}
    </ControlsContext.Provider>
  );
};
