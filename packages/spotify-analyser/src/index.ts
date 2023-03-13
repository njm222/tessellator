import {
  SpotifyAnalyserData,
  SpotifyAudioProperty,
  SpotifyAnalyserUpdateProps,
  SpotifyAudioPropertySection,
  SpotifyAudioPropertySegment,
} from "./types/spotifyAnalyserTypes";

export type { SpotifyAnalyserData };

export default class SpotifyAnalyser {
  bars!: SpotifyAudioProperty;
  beats!: SpotifyAudioProperty;
  sections!: SpotifyAudioPropertySection;
  segments!: SpotifyAudioPropertySegment;
  tatums!: SpotifyAudioProperty;

  position!: number;

  constructor(props?: SpotifyAnalyserData) {
    this.setData(props);
  }

  setData(data?: SpotifyAnalyserData) {
    this.bars = {
      data: data?.bars || [],
      counter: 0,
      current: data?.bars[0],
    };
    this.beats = {
      data: data?.beats || [],
      counter: 0,
      current: data?.beats[0],
    };
    this.sections = {
      data: data?.sections || [],
      counter: 0,
      current: data?.sections[0],
    };
    this.segments = {
      data: data?.segments || [],
      counter: 0,
      current: data?.segments[0],
    };
    this.tatums = {
      data: data?.tatums || [],
      counter: 0,
      current: data?.tatums[0],
    };

    this.position = 0;
  }

  updateData(options: SpotifyAnalyserUpdateProps) {
    this.position = options.position / 1000;

    if (!this.tatums.current) return;

    this.bars = this.updateAudioProperty(this.bars);
    this.beats = this.updateAudioProperty(this.beats);
    this.sections = this.updateAudioProperty(this.sections);
    this.segments = this.updateAudioProperty(this.segments);
    this.tatums = this.updateAudioProperty(this.tatums);
  }

  private updateAudioProperty(
    property:
      | SpotifyAudioProperty
      | SpotifyAudioPropertySection
      | SpotifyAudioPropertySegment
  ) {
    if (!property.current) {
      return property;
    }

    const end = property.current.start + property.current.duration; // TODO: selector getEnd

    if (this.position >= end && property.counter < property.data.length) {
      property.current = property.data[property.counter++];
    }

    return property;
  }
}
