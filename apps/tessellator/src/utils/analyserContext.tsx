"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import AudioAnalyser, {
  AudioAnalyserProps,
  defaultAnalyserOptions,
} from "audio-analyser";

import { LocalStorageKeys } from "../config/constants";

import { getLocalStorageItem } from "./store";

export type AnalyserProviderProps = {
  audioAnalyser?: AudioAnalyser;
  analyserOptions?: AudioAnalyserProps;
  setAnalyserOptions?: (options: AudioAnalyserProps) => void;
  children: ReactNode;
};

const AnalyserContext = createContext({
  audioAnalyser: new AudioAnalyser(),
  setAnalyserOptions: (options: AudioAnalyserProps) => {
    return;
  },
  analyserOptions: defaultAnalyserOptions,
});

export const useAnalyser = () => useContext(AnalyserContext);

export const AnalyserProvider = ({ children }: AnalyserProviderProps) => {
  const [analyserOptions, setAnalyserOptions] = useState(
    getLocalStorageItem(LocalStorageKeys.AUDIO_ANALYSER_OPTIONS) ??
      defaultAnalyserOptions
  );

  const value = useMemo(
    () => ({
      audioAnalyser: new AudioAnalyser(),
      setAnalyserOptions: (options: AudioAnalyserProps) =>
        setAnalyserOptions(options),
    }),
    [setAnalyserOptions]
  );

  useEffect(() => {
    if (!value.audioAnalyser.context) return;
    value.audioAnalyser.updateAnalyserOptions(analyserOptions);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [analyserOptions]);

  useEffect(() => {
    return () => {
      value.audioAnalyser.destroy();
    };
  }, [value.audioAnalyser]);

  return (
    <AnalyserContext.Provider value={{ ...value, analyserOptions }}>
      {children}
    </AnalyserContext.Provider>
  );
};
