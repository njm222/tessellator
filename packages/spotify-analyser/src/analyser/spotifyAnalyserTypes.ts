import {
  SpotifyAudioData,
  SpotifyAudioDataSection,
  SpotifyAudioDataSegment,
} from "../audio-property/audioPropertyTypes";

export type SpotifyAnalyserUpdateProps = {
  position: number;
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
