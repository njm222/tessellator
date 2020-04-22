export default class LiveAudio {
  private analyser: AnalyserNode;
  private source: MediaStreamAudioSourceNode | null;
  frequencyData: Uint8Array;
  private bufferLength: number;
  private context: AudioContext;
  bassObject: {
    bassDeviation: number;
    bassAv: number;
    bassArrCounter: number;
    bassEnergy: number;
    lower: number;
    upper: number;
    bassArr: number[];
  };

  midsObject: {
    midsAv: number;
    midsDeviation: number;
    midsArrCounter: number;
    midsEnergy: number;
    lower: number;
    upper: number;
    midsArr: number[];
  };

  highsObject: {
    highsAv: number;
    highsDeviation: number;
    highsArrCounter: number;
    highsEnergy: number;
    lower: number;
    upper: number;
    highsArr: any[];
  };

  kickObject: {
    kickDeviation: number;
    kickAv: number;
    kickArrCounter: number;
    kickEnergy: number;
    lower: number;
    upper: number;
    kickArr: any[];
  };

  snareObject: {
    snareDeviation: number;
    snareAv: number;
    snareArrCounter: number;
    snareEnergy: number;
    lower: number;
    upper: number;
    snareArr: any[];
  };

  avFreq: number;
  peak: number;
  rms: number;

  constructor () {
    this.bassObject = {
      bassDeviation: 0,
      bassAv: 0,
      bassArrCounter: 0,
      bassEnergy: 0,
      bassArr: [],
      lower: 0,
      upper: 4
    }
    this.kickObject = {
      kickDeviation: 0,
      kickAv: 0,
      kickEnergy: 0,
      kickArrCounter: 0,
      kickArr: [],
      lower: 1,
      upper: 3
    }
    this.snareObject = {
      snareDeviation: 0,
      snareAv: 0,
      snareEnergy: 0,
      snareArrCounter: 0,
      snareArr: [],
      lower: 2,
      upper: 4
    }
    this.midsObject = {
      midsDeviation: 0,
      midsAv: 0,
      midsEnergy: 0,
      midsArrCounter: 0,
      midsArr: [],
      lower: 4,
      upper: 18
    }
    this.highsObject = {
      highsDeviation: 0,
      highsAv: 0,
      highsEnergy: 0,
      highsArrCounter: 0,
      highsArr: [],
      lower: 32,
      upper: 128
    }
    this.avFreq = 0
    this.peak = 0
    this.rms = 0
    // Creates the context
    this.context = new AudioContext()
    // create analyser
    this.analyser = this.context.createAnalyser()
    this.analyser.fftSize = 256
    this.analyser.smoothingTimeConstant = 0.85
    this.frequencyData = new Uint8Array(this.analyser.frequencyBinCount)
    this.bufferLength = this.analyser.frequencyBinCount
    this.analyser.minDecibels = -90
    this.analyser.maxDecibels = -25
    this.source = null

    if (navigator.mediaDevices.getUserMedia) {
      console.log('navigator.mediaDevices supported.')
      navigator.mediaDevices.enumerateDevices().then((devices) => {
        devices = devices.filter((d) => d.kind === 'audiooutput')
        console.log(devices)
        const constraints = { audio: { deviceId: 'default' } }
        navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
          console.log(stream)
          // attach source to the mic
          this.source = this.context.createMediaStreamSource(stream)
          // connect source to the analyser
          this.source.connect(this.analyser)
        })
      }).catch(function (err) {
        console.log('The following error occured: ' + err)
      })
    } else {
      console.log('getUserMedia not supported on your browser!')
    }
  }

  resetData () {
    this.bassObject.bassEnergy = 0
    this.kickObject.kickEnergy = 0
    this.snareObject.snareEnergy = 0
    this.midsObject.midsEnergy = 0
    this.highsObject.highsEnergy = 0
    this.avFreq = 0
    this.rms = 0
    this.peak = 0
    this.bassObject.bassAv = 0
    this.bassObject.bassDeviation = 0
    this.kickObject.kickAv = 0
    this.kickObject.kickDeviation = 0
    this.snareObject.snareAv = 0
    this.snareObject.snareDeviation = 0
    this.midsObject.midsAv = 0
    this.midsObject.midsDeviation = 0
    this.highsObject.highsAv = 0
    this.highsObject.highsDeviation = 0
  }

  getData () {
    this.resetData()
    this.analyser.getByteFrequencyData(this.frequencyData)
    // console.log(this.frequencyData)
    this.getBassData()
    this.getKickData()
    this.getSnareData()
    this.getMidsData()
    this.getHighsData()
    this.getDeviations()

    this.getAvFreq()
  }

  getAvFreq () {
    for (let i = 0; i < this.bufferLength; i++) {
      this.avFreq += this.frequencyData[i]
      this.rms += this.frequencyData[i] * this.frequencyData[i]
      if (this.frequencyData[i] > this.peak) {
        this.peak = this.frequencyData[i]
      }
    }
    this.avFreq = this.avFreq / this.bufferLength
    this.rms = Math.sqrt(this.rms / this.bufferLength)
  }

  getBassData () {
    for (let i = this.bassObject.lower; i < this.bassObject.upper; i++) {
      this.bassObject.bassEnergy += this.frequencyData[i]
    }
    this.bassObject.bassEnergy = this.bassObject.bassEnergy / (this.bassObject.upper - this.bassObject.lower)
    this.bassObject.bassArr[this.bassObject.bassArrCounter++] = this.bassObject.bassEnergy
    if (this.bassObject.bassArrCounter >= 32) {
      this.bassObject.bassArrCounter = 0
    }
  }

  getKickData () {
    for (let i = this.kickObject.lower; i < this.kickObject.upper; i++) {
      this.kickObject.kickEnergy += this.frequencyData[i]
    }
    this.kickObject.kickEnergy = this.kickObject.kickEnergy / (this.kickObject.upper - this.kickObject.lower)
    this.kickObject.kickArr[this.kickObject.kickArrCounter++] = this.kickObject.kickEnergy
    if (this.kickObject.kickArrCounter >= 32) {
      this.kickObject.kickArrCounter = 0
    }
  }

  getSnareData () {
    for (let i = this.snareObject.lower; i < this.snareObject.upper; i++) {
      this.snareObject.snareEnergy += this.frequencyData[i]
    }
    this.snareObject.snareEnergy = this.snareObject.snareEnergy / (this.snareObject.upper - this.snareObject.lower)
    this.snareObject.snareArr[this.snareObject.snareArrCounter++] = this.snareObject.snareEnergy
    if (this.snareObject.snareArrCounter >= 32) {
      this.snareObject.snareArrCounter = 0
    }
  }

  private getMidsData () {
    for (let i = this.midsObject.lower; i < this.midsObject.upper; i++) {
      this.midsObject.midsEnergy += this.frequencyData[i]
    }
    this.midsObject.midsEnergy = this.midsObject.midsEnergy / (this.midsObject.upper - this.midsObject.lower)
    this.midsObject.midsArr[this.midsObject.midsArrCounter++] = this.midsObject.midsEnergy
    if (this.midsObject.midsArrCounter >= 32) {
      this.midsObject.midsArrCounter = 0
    }
  }

  private getHighsData () {
    for (let i = this.highsObject.lower; i < this.highsObject.upper; i++) {
      this.highsObject.highsEnergy += this.frequencyData[i]
    }
    this.highsObject.highsEnergy = this.highsObject.highsEnergy / (this.highsObject.upper - this.highsObject.lower)
    this.highsObject.highsArr[this.highsObject.highsArrCounter++] = this.highsObject.highsEnergy
    if (this.highsObject.highsArrCounter >= 32) {
      this.highsObject.highsArrCounter = 0
    }
  }

  private getDeviations () {
    for (let i = 0; i < this.bassObject.bassArr.length; i++) {
      this.bassObject.bassAv += this.bassObject.bassArr[i]
      this.bassObject.bassDeviation += this.bassObject.bassArr[i] * this.bassObject.bassArr[i]

      this.kickObject.kickAv += this.kickObject.kickArr[i]
      this.kickObject.kickDeviation += this.kickObject.kickArr[i] * this.kickObject.kickArr[i]

      this.snareObject.snareAv += this.snareObject.snareArr[i]
      this.snareObject.snareDeviation += this.snareObject.snareArr[i] * this.snareObject.snareArr[i]

      this.midsObject.midsAv += this.midsObject.midsArr[i]
      this.midsObject.midsDeviation += this.midsObject.midsArr[i] * this.midsObject.midsArr[i]

      this.highsObject.highsAv += this.highsObject.highsArr[i]
      this.highsObject.highsDeviation += this.highsObject.highsArr[i] * this.highsObject.highsArr[i]
    }

    this.bassObject.bassAv = this.bassObject.bassAv / this.bassObject.bassArr.length
    this.bassObject.bassDeviation = Math.sqrt(this.bassObject.bassDeviation / this.bassObject.bassArr.length - this.bassObject.bassAv * this.bassObject.bassAv)

    this.kickObject.kickAv = this.kickObject.kickAv / this.kickObject.kickArr.length
    this.kickObject.kickDeviation = Math.sqrt(this.kickObject.kickDeviation / this.kickObject.kickArr.length - this.kickObject.kickAv * this.kickObject.kickAv)

    this.snareObject.snareAv = this.snareObject.snareAv / this.snareObject.snareArr.length
    this.snareObject.snareDeviation = Math.sqrt(this.snareObject.snareDeviation / this.snareObject.snareArr.length - this.snareObject.snareAv * this.snareObject.snareAv)

    this.midsObject.midsAv = this.midsObject.midsAv / this.midsObject.midsArr.length
    this.midsObject.midsDeviation = Math.sqrt(this.midsObject.midsDeviation / this.midsObject.midsArr.length - this.midsObject.midsAv * this.midsObject.midsAv)

    this.highsObject.highsAv = this.highsObject.highsAv / this.highsObject.highsArr.length
    this.highsObject.highsDeviation = Math.sqrt(this.highsObject.highsDeviation / this.highsObject.highsArr.length - this.highsObject.highsAv * this.highsObject.highsAv)
  }
}
