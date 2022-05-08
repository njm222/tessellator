import { mutations } from "./store";

export default class SpotifyAnalyzer {
  constructor() {
    this.segmentCounter = 0;
    this.tatumCounter = 0;
    this.beatCounter = 0;
    this.barCounter = 0;
    this.sectionCounter = 0;

    this.segments = [];
    this.tatums = [];
    this.beats = [];
    this.bars = [];
    this.sections = [];

    this.segment = {};
    this.tatum = {};
    this.beat = {};
    this.bar = {};
    this.section = {};

    this.timbre = {};
    this.pitches = {};
  }

  resetCounters() {
    this.segmentCounter = 0;
    this.tatumCounter = 0;
    this.beatCounter = 0;
    this.barCounter = 0;
    this.sectionCounter = 0;
  }

  setData(data) {
    this.resetCounters();
    this.segments = data.segments;
    this.tatums = data.tatums;
    this.beats = data.beats;
    this.bars = data.bars;
    this.sections = data.sections;
    this.updateData();
  }

  updateData() {
    const position = mutations.position / 1000;
    if (!position) {
      return;
    }
    this.updateSegment(position);
    this.updateTatum(position);
    this.updateBeat(position);
    this.updateBar(position);
    this.updateSection(position);
  }

  updateSegment(position) {
    const data = this.segments[this.segmentCounter];
    if (!data) {
      return;
    }

    const end = data.start + data.duration;

    while (position >= end && this.segmentCounter < this.segments.length) {
      this.timbre = this.segments[this.segmentCounter]?.timbre;
      this.pitches = this.segments[this.segmentCounter]?.pitches;
      this.segment = this.segments[this.segmentCounter];
      this.segmentCounter += 1;
    }
  }

  updateTatum(position) {
    const data = this.tatums[this.tatumCounter];
    if (!data) {
      return;
    }

    const end = data.start + data.duration;

    while (position >= end && this.tatumCounter < this.tatums.length) {
      this.tatum = this.tatums[this.tatumCounter];
      this.tatumCounter += 1;
    }
  }

  updateBeat(position) {
    const data = this.beats[this.beatCounter];
    if (!data) {
      return;
    }

    const end = data.start + data.duration;

    while (position >= end && this.beatCounter < this.beats.length) {
      this.beat = this.beats[this.beatCounter];
      this.beatCounter += 1;
    }
  }

  updateBar(position) {
    const data = this.bars[this.barCounter];
    if (!data) {
      return;
    }

    const end = data.start + data.duration;

    while (position >= end && this.barCounter < this.bars.length) {
      this.bar = this.bars[this.barCounter];
      this.barCounter += 1;
    }
  }

  updateSection(position) {
    const data = this.sections[this.sectionCounter];
    if (!data) {
      return;
    }

    const end = data.start + data.duration;
    while (position >= end && this.sectionCounter < this.sections.length) {
      this.section = this.sections[this.sectionCounter];
      this.sectionCounter += 1;
    }
  }
}
