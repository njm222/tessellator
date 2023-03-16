import {
  ReactNode,
  useMemo,
  useContext,
  createContext,
  useEffect,
  useState,
  FC,
} from "react";
import { LocalStorageKeys } from "../constants";
import AudioAnalyser, {
  AudioAnalyserProps,
  defaultAnalyserOptions,
} from "audio-analyser";

type AnalyserProviderProps = {
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

export const AnalyserProvider: FC<AnalyserProviderProps> = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [analyserOptions, setAnalyserOptions] = useState(
    localStorage.getItem(LocalStorageKeys.AUDIO_ANALYSER_OPTIONS)
      ? JSON.parse(
          localStorage.getItem(LocalStorageKeys.AUDIO_ANALYSER_OPTIONS) ?? ""
        )
      : defaultAnalyserOptions
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

  return (
    <AnalyserContext.Provider value={{ ...value, analyserOptions }}>
      {children}
    </AnalyserContext.Provider>
  );
};
