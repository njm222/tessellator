import {
  AudioAnalyserData,
  AudioAnalyserProps,
} from "./audioAnalyserTypes";

import FrequencySection from "../frequency-section/frequencySection"
import { defaultAnalyserOptions } from "..";

export default class AudioAnalyser {
  context!: AudioContext;
  analyser!: AnalyserNode;
  source!: MediaStreamAudioSourceNode;

  analyserData: AudioAnalyserData;
  bassSection: FrequencySection;
  kickSection: FrequencySection;
  snareSection: FrequencySection;
  midSection: FrequencySection;
  highSection: FrequencySection;

  constructor() {
    this.analyserData = {
      averageFrequency: 0,
      peak: 0,
      rms: 0,
      frequencyData: new Uint8Array(defaultAnalyserOptions.fftSize),
    };

    const bucketSize = defaultAnalyserOptions.sampleRate / defaultAnalyserOptions.fftSize;

    this.bassSection = new FrequencySection({ bucketSize, lowerRange: 0, upperRange: 250 })
    this.kickSection = new FrequencySection({ bucketSize, lowerRange: 50, upperRange: 150 })
    this.snareSection = new FrequencySection({ bucketSize, lowerRange: 150, upperRange: 250 })
    this.midSection = new FrequencySection({ bucketSize, lowerRange: 250, upperRange: 1000 })
    this.highSection = new FrequencySection({ bucketSize, lowerRange: 1000, upperRange: 20000 })
  }

  setup(props: AudioAnalyserProps) {
    this.context = new AudioContext();

    this.analyser = this.context.createAnalyser();
    this.analyser.fftSize = props.fftSize;
    this.analyser.smoothingTimeConstant = props.smoothingTimeConstant;
    this.analyser.minDecibels = props.minDecibels;
    this.analyser.maxDecibels = props.maxDecibels;

    if (navigator.mediaDevices.getUserMedia) {
      console.log("navigator.mediaDevices supported.");
      navigator.mediaDevices
        .enumerateDevices()
        .then((devices) => {
          devices = devices.filter((d) => d.kind === "audiooutput");
          const constraints = { audio: { deviceId: "default" } };
          navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
            // attach source to the mic
            this.source = this.context.createMediaStreamSource(stream);
            // connect source to the analyser
            this.source.connect(this.analyser);
            // update object limits
          });
        })
        .catch(function (err) {
          console.log("The following error occured: " + err);
        });
    } else {
      console.log("getUserMedia not supported on your browser!");
    }
  }

  updateAnalyserOptions(options: AudioAnalyserProps) {
    this.analyserData.frequencyData = new Uint8Array(options.fftSize / 2);

    this.analyser.fftSize = options.fftSize;
    this.analyser.smoothingTimeConstant = options.smoothingTimeConstant;
    this.analyser.minDecibels = options.minDecibels;
    this.analyser.maxDecibels = options.maxDecibels;
    this.updateSectionLimits();
  }

  updateData() {
    this.updateAnalyserData();
    this.updateFrequencySections();
  }

  private updateAnalyserData() {
    this.analyser.getByteFrequencyData(this.analyserData.frequencyData);

    const [totalLevel, totalRms, totalPeak] =
      this.analyserData.frequencyData.reduce(
        (acc, curr) => {
          acc[0] += curr;
          acc[1] += curr * curr;
          if (curr > acc[2]) {
            acc[2] = curr;
          }

          return acc;
        },
        [0, 0, 0]
      );

    this.analyserData.averageFrequency =
      totalLevel / Math.max(this.analyserData.frequencyData.length, 1);
    this.analyserData.rms = Math.sqrt(
      Math.max(totalRms / this.analyserData.frequencyData.length, 0)
    );
    this.analyserData.peak = totalPeak;
  }

  private updateFrequencySections() {
    this.bassSection.updateFrequencySection(this.analyserData.frequencyData);
    this.kickSection.updateFrequencySection(this.analyserData.frequencyData);
    this.snareSection.updateFrequencySection(this.analyserData.frequencyData);
    this.midSection.updateFrequencySection(this.analyserData.frequencyData);
    this.highSection.updateFrequencySection(this.analyserData.frequencyData);
  }

  private updateSectionLimits() {
    const bucketSize = this.context.sampleRate / this.analyser.fftSize;

    this.bassSection.updateSectionLimits(bucketSize);
    this.kickSection.updateSectionLimits(bucketSize);
    this.snareSection.updateSectionLimits(bucketSize);
    this.midSection.updateSectionLimits(bucketSize);
    this.highSection.updateSectionLimits(bucketSize);
  }
}
