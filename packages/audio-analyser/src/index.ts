import AudioAnalyser from "./analyser/audioAnalyser"
import {
  AudioAnalyserProps,
} from "./analyser/audioAnalyserTypes";

export type { AudioAnalyserProps };

export const defaultAnalyserOptions = {
  fftSize: 1024,
  smoothingTimeConstant: 0.8,
  minDecibels: -100,
  maxDecibels: -30,
  sampleRate: 48000
};

export default AudioAnalyser
