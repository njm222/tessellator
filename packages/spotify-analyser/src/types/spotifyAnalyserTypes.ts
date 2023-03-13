export type SpotifyAnalyserUpdateProps = {
  position: number;
};

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

export type SpotifyAudioProperty = {
  data: SpotifyAudioData[];
  counter: number;
  current: SpotifyAudioData | undefined;
};

export type SpotifyAudioPropertySection = {
  data: SpotifyAudioDataSection[];
  counter: number;
  current: SpotifyAudioDataSection | undefined;
};

export type SpotifyAudioPropertySegment = {
  data: SpotifyAudioDataSegment[];
  counter: number;
  current: SpotifyAudioDataSegment | undefined;
};

/**
 * The time intervals of audio property throughout the track.
 * @property {SpotifyAudioData[]} bars - A bar (or measure) is a segment of time defined as a given number of beats
 * @property {SpotifyAudioData[]} beats - A beat is the basic time unit of a piece of music; for example, each tick of a metronome. Beats are typically multiples of tatums
 * @property {SpotifyAudioDataSection[]} sections - Sections are defined by large variations in rhythm or timbre, e.g. chorus, verse, bridge, guitar solo, etc. Each section contains its own descriptions of tempo, key, mode, time_signature, and loudness
 * @property {SpotifyAudioDataSegment[]} segments - Each segment contains a roughly consistent sound throughout its duration
 * @property {SpotifyAudioData[]} tatums - A tatum represents the lowest regular pulse train that a listener intuitively infers from the timing of perceived musical events (segments)
 */
export type SpotifyAnalyserData = {
  bars: SpotifyAudioData[];
  beats: SpotifyAudioData[];
  sections: SpotifyAudioDataSection[];
  segments: SpotifyAudioDataSegment[];
  tatums: SpotifyAudioData[];
};
