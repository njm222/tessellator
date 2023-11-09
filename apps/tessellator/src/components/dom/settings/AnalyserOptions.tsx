import { useEffect } from "react";
import { defaultAnalyserOptions } from "@tessellator/audio-analyser";
import { useToast } from "@tessellator/ui";
import { button, folder, LevaInputs, useControls } from "leva";

import { LocalStorageKeys } from "../../../config/constants";
import { useAnalyser } from "../../../utils/analyserContext";

export function AnalyserOptions() {
  const toast = useToast();
  const {
    analyserOptions: {
      fftSize,
      smoothingTimeConstant,
      minDecibels,
      maxDecibels,
    },
    setAnalyserOptions,
  } = useAnalyser();

  const [analyzerValues, setAnalyzerValues] = useControls(
    () => ({
      "Analyzer Options": folder(
        {
          fftSize: {
            value: fftSize,
            options: [512, 1024, 2048],
            hint: "size of the FFT (Fast Fourier Transform) to be used to determine the frequency domain.",
          },
          smoothingTimeConstant: {
            value: smoothingTimeConstant,
            min: 0.1,
            max: 1,
            step: 0.01,
            hint: "Averaging constant with the last analysis frame",
            type: LevaInputs.NUMBER,
          },
          minDecibels: {
            value: minDecibels,
            min: -200,
            max: maxDecibels - 1,
            step: 1,
            hint: "Minimum power value in the scaling range for the FFT analysis data",
            type: LevaInputs.NUMBER,
          },
          maxDecibels: {
            value: maxDecibels,
            min: Math.max(minDecibels + 1, -80),
            max: 0,
            step: 1,
            hint: "Maximum power value in the scaling range for the FFT analysis data",
            type: LevaInputs.NUMBER,
          },
          reset: button(() => {
            setAnalyzerValues({
              fftSize: defaultAnalyserOptions.fftSize,
              smoothingTimeConstant:
                defaultAnalyserOptions.smoothingTimeConstant,
              minDecibels: defaultAnalyserOptions.minDecibels,
              maxDecibels: defaultAnalyserOptions.maxDecibels,
            });
            toast.open("Reset analyser options to default", { variant: "" });
          }),
        },
        { collapsed: true }
      ),
    }),
    [minDecibels, maxDecibels]
  );

  useEffect(() => {
    const data = {
      fftSize: analyzerValues.fftSize,
      smoothingTimeConstant: analyzerValues.smoothingTimeConstant,
      minDecibels: analyzerValues.minDecibels,
      maxDecibels: analyzerValues.maxDecibels,
    };

    setAnalyserOptions(data);
    localStorage.setItem(
      LocalStorageKeys.AUDIO_ANALYSER_OPTIONS,
      JSON.stringify(data)
    );
  }, [analyzerValues, setAnalyserOptions]);

  return null;
}
