import { FrequencySectionProps } from "./frequencySectionTypes";

const defaultCounterLimit = 32;
export interface IFrequencySection {
  updateSectionLimits: (bucketSize: number) => void;
  updateFrequencySection: (frequencyData: Uint8Array) => void;
}
export default class FrequencySection implements IFrequencySection {
  deviation: number;
  average: number;
  energy: number;
  counter: number;
  counterLimit: number;
  lowerIndex: number;
  upperIndex: number;
  data: number[];
  lowerRange: number;
  upperRange: number;

  constructor(props: FrequencySectionProps) {
    const counterLimit = props.counterLimit ?? defaultCounterLimit;
    this.deviation = 0;
    this.average = 0;
    this.energy = 0;
    this.counter = 0;
    this.counterLimit = counterLimit;
    this.data = new Array(counterLimit).fill(1);
    this.lowerIndex = 0;
    this.upperIndex = 0;
    this.lowerRange = props.lowerRange;
    this.upperRange = props.upperRange;
    this.updateSectionLimits(props.bucketSize);
  }

  updateSectionLimits(bucketSize: number) {
    this.lowerIndex = Math.ceil(this.lowerRange / bucketSize);
    this.upperIndex = Math.ceil(this.upperRange / bucketSize);

    if (this.lowerIndex === this.upperIndex) {
      this.upperIndex += 1;
    }
  }

  // TODO: make more readable with private methods
  updateFrequencySection(frequencyData: Uint8Array) {
    let totalEnergy = 0;
    let totalLevel = 0;
    let totalDeviation = 0;

    let sectionLength = 0;
    // calc sectionLength & totalEnergy
    for (let i = this.lowerIndex; i < this.upperIndex; i++) {
      if (!frequencyData[i]) continue;

      totalEnergy += frequencyData[i];
      sectionLength += 1;
    }

    // set energy
    this.energy = totalEnergy / Math.max(sectionLength, 1);
    this.data[this.counter++] = this.energy;

    // calc averages
    for (let i = 0; i < this.data.length; i++) {
      totalLevel += this.data[i];
      totalDeviation += Math.pow(this.data[i], 2);
    }
    // set averages
    const n = Math.max(this.data.length - 1, 1);
    this.average = totalLevel / n;
    this.deviation = Math.sqrt(
      Math.abs(Math.abs(totalDeviation / n) - Math.pow(this.average, 2))
    );

    // reset counter
    if (this.counter >= this.counterLimit) {
      this.counter = 0;
    }
  }
}
