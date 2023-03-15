export type SpotifyAudioPropertyData =
  | SpotifyAudioData
  | SpotifyAudioDataSection
  | SpotifyAudioDataSegment;

/**
 * @property {number} start - The starting point (in seconds) of the time interval
 * @property {number} duration - The duration (in seconds) of the time interval
 * @property {number} confidence - The confidence, from 0.0 to 1.0, of the reliability of the interval
 */
export type SpotifyAudioData = {
  start: number;
  duration: number;
  confidence: number;
};

export type SpotifyAudioDataSection = SpotifyAudioData & {
  loudness?: number;
  tempo?: number;
  tempo_confidence?: number;
  key?: number;
  key_confidence?: number;
  mode?: number;
  mode_confidence?: number;
  time_signature?: number;
  time_signature_confidence?: number;
};

export type SpotifyAudioDataSegment = SpotifyAudioData & {
  loudness_start?: number;
  loudness_max?: number;
  loudness_max_time?: number;
  loudness_end?: number;
  pitches?: number[];
  timbre?: number[];
};
