import FrequencySection from "../frequency-section/frequencySection";
import { defaultAnalyserOptions } from "..";

import { AudioAnalyserData, AudioAnalyserProps } from "./audioAnalyserTypes";

export default class AudioAnalyser {
  allowSourceChange!: boolean;
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

    const bucketSize =
      defaultAnalyserOptions.sampleRate / defaultAnalyserOptions.fftSize;

    this.bassSection = new FrequencySection({
      bucketSize,
      lowerRange: 0,
      upperRange: 250,
    });
    this.kickSection = new FrequencySection({
      bucketSize,
      lowerRange: 50,
      upperRange: 150,
    });
    this.snareSection = new FrequencySection({
      bucketSize,
      lowerRange: 150,
      upperRange: 250,
    });
    this.midSection = new FrequencySection({
      bucketSize,
      lowerRange: 250,
      upperRange: 1000,
    });
    this.highSection = new FrequencySection({
      bucketSize,
      lowerRange: 1000,
      upperRange: 20000,
    });
  }

  setup(props: AudioAnalyserProps, source: "input" | "output") {
    this.allowSourceChange = source === "input";
    this.context = new AudioContext();

    this.analyser = this.context.createAnalyser();
    this.analyser.fftSize = props.fftSize;
    this.analyser.smoothingTimeConstant = props.smoothingTimeConstant;
    this.analyser.minDecibels = props.minDecibels;
    this.analyser.maxDecibels = props.maxDecibels;

    if (navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .enumerateDevices()
        .then((devices) => {
          const device = devices.find(
            (d) =>
              d.kind === (source === "input" ? "audioinput" : "audiooutput") &&
              d.deviceId === "default"
          );
          if (!device) {
            throw new Error("No device found");
          }
          navigator.mediaDevices
            .getUserMedia({ audio: { deviceId: device.deviceId } })
            .then((stream) => {
              this.source = this.context.createMediaStreamSource(stream);
              // connect source to the analyser
              this.source.connect(this.analyser);
            });
        })
        .catch(function (err) {
          throw new Error(err);
        });
    } else {
      throw new Error("getUserMedia not supported on your browser!");
    }
  }

  updateSource(kind: MediaDeviceKind, deviceId: string) {
    navigator.mediaDevices
      .enumerateDevices()
      .then((devices) => {
        const device = devices.find(
          (d) => d.kind === kind && d.deviceId === deviceId
        );
        if (!device) {
          throw new Error("No device found");
        }
        navigator.mediaDevices
          .getUserMedia({ audio: { deviceId: device.deviceId } })
          .then((stream) => {
            this.source = this.context.createMediaStreamSource(stream);
            this.source.connect(this.analyser);
          });
      })
      .catch(function (err) {
        throw new Error(err);
      });
  }

  async getSources() {
    let sources: MediaDeviceInfo[] = [];
    await navigator.mediaDevices
      .enumerateDevices()
      .then((devices) => {
        sources = devices.reduce((acc, curr) => {
          if (acc.find(({ deviceId }) => deviceId === curr.deviceId)) {
            return acc;
          }

          if (curr.kind === "audiooutput" || curr.kind === "audioinput") {
            acc.push(curr);
          }
          return acc;
        }, [] as MediaDeviceInfo[]);
        [];
      })
      .catch(function (err) {
        throw new Error(err);
      });

    return sources;
  }

  destroy() {
    this.analyser?.disconnect();
    this.source?.mediaStream.getTracks().forEach((track) => track.stop());
    this.source?.disconnect();
    this.context?.close();
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
    if (!this.analyser) return;

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
