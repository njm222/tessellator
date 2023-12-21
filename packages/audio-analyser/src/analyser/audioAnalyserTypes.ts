import { FrequencySection } from "../frequency-section/frequencySectionTypes";

export interface AudioAnalyserInterface {
  analyserData: AudioAnalyserData;
  context: AudioContext;
  analyser: AnalyserNode;
  source: MediaStreamAudioSourceNode | null;
  bassSection: FrequencySection;
  kickSection: FrequencySection;
  snareSection: FrequencySection;
  midSection: FrequencySection;
  highSection: FrequencySection;
  updateAnalyserOptions: (options: AudioAnalyserProps) => void;
  updateData: () => void;
}

export type AudioAnalyserProps = {
  fftSize: number;
  smoothingTimeConstant: number;
  minDecibels: number;
  maxDecibels: number;
  sampleRate?: number;
};

/**
 * @property {number} averageFrequency - TODO: DOCS
 * @property {number} peak - TODO: DOCS
 * @property {number} rms - TODO: DOCS
 * @property {Uint8Array} frequencyData - TODO: DOCS
 */
export type AudioAnalyserData = {
  averageFrequency: number;
  peak: number;
  rms: number;
  frequencyData: Uint8Array;
};
