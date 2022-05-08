export default class AudioAnalyser {
  constructor(props) {
    this.bassObject = {
      deviation: 0,
      average: 0,
      energy: 0,
      counter: 0,
      counterLimit: 32,
      arr: [],
      lower: 0,
      upper: 4,
    };
    this.kickObject = {
      deviation: 0,
      average: 0,
      energy: 0,
      counter: 0,
      counterLimit: 64,
      arr: [],
      lower: 1,
      upper: 3,
    };
    this.snareObject = {
      deviation: 0,
      average: 0,
      energy: 0,
      counter: 0,
      counterLimit: 64,
      arr: [],
      lower: 2,
      upper: 4,
    };
    this.midsObject = {
      deviation: 0,
      average: 0,
      energy: 0,
      counter: 0,
      counterLimit: 64,
      arr: [],
      lower: 4,
      upper: 18,
    };
    this.highsObject = {
      deviation: 0,
      average: 0,
      energy: 0,
      counter: 0,
      counterLimit: 64,
      arr: [],
      lower: 32,
      upper: 128,
    };
    this.avFreq = 0;
    this.peak = 0;
    this.rms = 0;
    // Creates the context
    this.context = new AudioContext();
    // create analyser
    this.analyser = this.context.createAnalyser();
    this.analyser.fftSize = props.fftSize;
    this.analyser.smoothingTimeConstant = props.smoothingTimeConstant;
    this.analyser.minDecibels = props.minDecibels;
    this.analyser.maxDecibels = props.maxDecibels;
    this.frequencyData = new Uint8Array(this.analyser.frequencyBinCount);
    this.source = null;

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
            this.updateObjectLimits(
              this.context.sampleRate,
              this.analyser.fftSize,
              props
            );
          });
        })
        .catch(function (err) {
          console.log("The following error occured: " + err);
        });
    } else {
      console.log("getUserMedia not supported on your browser!");
    }
  }

  updateObjectLimits(sampleRate, fftSize, options) {
    // const stepSize = sampleRate / fftSize
    // this.bassObject.lower = 0
    // this.bassObject.upper = Math.round(options.bassUpperLimit / stepSize)
    // if (this.bassObject.lower === this.bassObject.upper) {
    //   this.bassObject.upper += 1
    // }
    // this.kickObject.lower = Math.round(options.kickLowerLimit / stepSize)
    // this.kickObject.upper = Math.round(options.kickUpperLimit / stepSize)
    // if (this.kickObject.lower === this.kickObject.upper) {
    //   this.kickObject.upper += 1
    // }
    // this.snareObject.lower = Math.round(options.snareLowerLimit / stepSize)
    // this.snareObject.upper = Math.round(options.snareUpperLimit / stepSize)
    // if (this.snareObject.lower === this.snareObject.upper) {
    //   this.snareObject.upper += 1
    // }
    // this.midsObject.lower = Math.round(options.midsLowerLimit / stepSize)
    // this.midsObject.upper = Math.round(options.midsUpperLimit / stepSize)
    // if (this.midsObject.lower === this.midsObject.upper) {
    //   this.midsObject.upper += 1
    // }
    // this.highsObject.lower = Math.round(options.highsLowerLimit / stepSize)
    // this.highsObject.upper = fftSize / 2
  }

  updateAnalyser(options) {
    if (this.analyser.fftSize !== options.fftSize) {
      this.updateObjectLimits(
        this.context.sampleRate,
        this.analyser.fftSize,
        options
      );
      this.frequencyData = new Uint8Array(options.fftSize / 2);
    }
    this.analyser.fftSize = options.fftSize;
    this.analyser.smoothingTimeConstant = options.smoothingTimeConstant;
    this.analyser.minDecibels = options.minDecibels;
    this.analyser.maxDecibels = options.maxDecibels;
  }

  resetData() {
    this.avFreq = 0;
    this.rms = 0;
    this.peak = 0;
    this.bassObject.average = 0;
    this.bassObject.deviation = 0;
    this.bassObject.energy = 0;
    this.kickObject.average = 0;
    this.kickObject.deviation = 0;
    this.kickObject.energy = 0;
    this.snareObject.average = 0;
    this.snareObject.deviation = 0;
    this.snareObject.energy = 0;
    this.midsObject.average = 0;
    this.midsObject.deviation = 0;
    this.midsObject.energy = 0;
    this.highsObject.average = 0;
    this.highsObject.deviation = 0;
    this.highsObject.energy = 0;
  }

  updateData() {
    this.analyser.getByteFrequencyData(this.frequencyData);
    this.getFreqSection(this.bassObject);
    this.getFreqSection(this.kickObject);
    this.getFreqSection(this.snareObject);
    this.getFreqSection(this.midsObject);
    this.getFreqSection(this.highsObject);

    this.getAvFreq();
  }

  getFreqSection(sectionObject) {
    let energy = 0;
    let average = 0;
    let deviation = 0;
    const data = [...this.frequencyData];
    let sectionLength = 0;
    for (let i = sectionObject.lower; i < sectionObject.upper; i++) {
      if (data[i]) {
        energy += data[i];
        sectionLength += 1;
      }
    }
    sectionObject.energy = energy / Math.max(sectionLength, 1);
    sectionObject.arr[sectionObject.counter++] = sectionObject.energy;

    for (let i = 0; i < sectionObject.arr.length; i++) {
      average += sectionObject.arr[i];
      deviation += Math.pow(sectionObject.arr[i], 2);
    }

    sectionObject.average = average / Math.max(sectionObject.arr.length, 1);
    sectionObject.deviation =
      Math.sqrt(Math.max(deviation / sectionObject.arr.length, 0)) -
      average * average;

    if (sectionObject.counter >= sectionObject.counterLimit) {
      sectionObject.counter = 0;
    }
  }

  getAvFreq() {
    let average = 0;
    let localRms = 0;
    let localPeak = 0;
    const data = [...this.frequencyData];
    for (let i = 0; i < data.length; i++) {
      average += data[i];
      localRms += data[i] * data[i];
      if (data[i] > localPeak) {
        localPeak = data[i];
      }
    }
    this.avFreq = average / Math.max(data.length, 1);
    this.rms = Math.sqrt(Math.max(localRms / data.length, 0));
    this.peak = localPeak;
  }
}
