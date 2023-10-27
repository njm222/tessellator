import { SpotifyAudioPropertyData } from "./audioPropertyTypes";

export default class AudioProperty {
  data: SpotifyAudioPropertyData[];
  counter: number;
  current: SpotifyAudioPropertyData;

  constructor(data: SpotifyAudioPropertyData[]) {
    this.data = data;
    this.counter = 0;
    this.current = data[0];
  }

  updateAudioProperty(position: number, delay = 0) {
    if (!this.current) {
      return this;
    }

    while (
      position + delay >= this.getEnd() &&
      this.counter < this.data.length - 1
    ) {
      this.current = this.data[++this.counter];
    }

    return this;
  }

  private getEnd() {
    return this.current.start + this.current.duration;
  }
}
