import AudioProperty from "../audio-property/audioProperty";
import { SpotifyAudioDataSegment } from "../audio-property/audioPropertyTypes";
import {
  SpotifyAnalyserData,
  SpotifyAnalyserUpdateProps,
} from "./spotifyAnalyserTypes";

export default class SpotifyAnalyser {
  bars!: AudioProperty;
  beats!: AudioProperty;
  sections!: AudioProperty;
  segments!: AudioProperty;
  tatums!: AudioProperty;

  position: number;

  constructor(props?: SpotifyAnalyserData) {
    this.position = 0;
    this.setData(props);
  }

  setData(data?: SpotifyAnalyserData) {
    this.position = 0;

    if (!data) {
      return;
    }

    this.bars = new AudioProperty(data.bars);
    this.beats = new AudioProperty(data.beats);
    this.sections = new AudioProperty(data.sections);
    this.segments = new AudioProperty(data.segments);
    this.tatums = new AudioProperty(data.tatums);
  }

  updateData(options: SpotifyAnalyserUpdateProps) {
    if (!this.sections) return;

    this.position = options.position / 1000;

    this.bars.updateAudioProperty(this.position);
    this.beats.updateAudioProperty(this.position);
    this.sections.updateAudioProperty(this.position);
    this.segments.updateAudioProperty(this.position);
    this.tatums.updateAudioProperty(this.position);
  }

  getCurrentSegment(): SpotifyAudioDataSegment {
    return this.segments.current;
  }
}
