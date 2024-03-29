import { useEffect, useState } from "react";
import { defaultAnalyserOptions } from "@tessellator/audio-analyser";
import { useToast } from "@tessellator/ui";
import { button, folder, LevaInputs, useControls } from "leva";

import { LocalStorageKeys } from "../../../config/constants";
import { useAnalyser } from "../../../utils/analyserContext";

export function AnalyserOptions({ spotify }: { spotify: boolean }) {
  const toast = useToast();
  const {
    analyserOptions: {
      fftSize,
      smoothingTimeConstant,
      minDecibels,
      maxDecibels,
    },
    audioAnalyser,
    setAnalyserOptions,
  } = useAnalyser();
  const [sources, setSources] = useState<MediaDeviceInfo[]>([]);

  const [analyzerValues, setAnalyzerValues] = useControls(
    () => ({
      "Analyzer Options": folder(
        {
          source: {
            options: sources.reduce((acc, curr) => {
              acc[curr.label] = curr;
              return acc;
            }, {} as { [key: string]: MediaDeviceInfo }),
            onChange: (source) => {
              if (!source) return;
              audioAnalyser.updateSource(source.kind, source.deviceId);
            },
            render: () => {
              (async () => {
                if (!audioAnalyser.source) return;
                setSources(
                  await audioAnalyser.getSources(spotify ? "output" : "all")
                );
              })();
              return !!sources.length;
            },
            hint: "Change the audio source of the analyzer",
          },
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
        {
          collapsed: true,
        }
      ),
    }),
    [minDecibels, maxDecibels, sources]
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
