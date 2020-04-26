import Axios from 'axios'
import router from '@/router'

export class SpotifyAnalysis {
  loaded: boolean
  trackFeatures!: SpotifyApi.AudioFeaturesResponse;
  trackAnalysis!: SpotifyApi.AudioAnalysisResponse;
  g_section!: number;
  g_bar!: number;
  g_beat!: number;
  g_tatum!: number;
  g_segment!: number;
  g_timbre!: number[];
  g_pitches!: number[];
  g_sections: any;
  g_bars!: any;
  g_beats!: any;
  g_tatums!: any;
  g_segments!: any;
  barCounter!: number;
  beatCounter!: number;
  tatumCounter!: number;
  beatAv!: number;
  beatVariance!: number;
  tatumAv!: number;
  tatumVariance!: number;
  changeColour: boolean
  private changeMode: boolean;

  constructor () {
    this.resetTrackVariables()
    this.changeColour = false
    this.changeMode = false
    this.loaded = false

    this.g_sections = []
    this.g_bars = []
    this.g_beats = []
    this.g_tatums = []
    this.g_segments = []
    this.g_timbre = []
    this.g_pitches = []
  }

  /** Get Track Analysis from Spotify Api */

  getTrackFeaturesAnalysis (accessToken: string, trackID: string) {
    this.getTrackAnalysis(accessToken, trackID)
    this.getTrackFeatures(accessToken, trackID)
  }

  getTrackFeatures (accessToken: string, trackID: string) {
    console.log('=== track Features ====')
    Axios.get(`https://api.spotify.com/v1/audio-features/${trackID}`, {
      headers: { Authorization: 'Bearer ' + accessToken }
    }).then(res => {
      this.trackFeatures = res.data
      console.log(res.data)
    }).catch((error) => {
      console.log(error)
      if (error.code === 401) {
        router.push({ name: 'Home' })
      } else {
        this.getTrackFeatures(accessToken, trackID)
      }
    })
  }

  getTrackAnalysis (accessToken: string, trackID: string) {
    console.log('=== track Analysis ====')
    Axios.get(`https://api.spotify.com/v1/audio-analysis/${trackID}`, {
      headers: { Authorization: 'Bearer ' + accessToken }
    }).then(res => {
      this.trackAnalysis = res.data
      this.setTrackAnalysisParts(res.data)
    }).catch((error) => {
      console.log(error)
      if (error.code === 401) {
        router.push({ name: 'Home' })
      } else {
        this.getTrackAnalysis(accessToken, trackID)
      }
    })
  }

  /** Update Analysis from trackCounter */

  changeAnalysis (trackCounter: number) {
    trackCounter = trackCounter / 1000
    this.changeSection(trackCounter)
    this.changeBar(trackCounter)
    this.changeBeat(trackCounter)
    this.changeTatum(trackCounter)
    this.changeSegment(trackCounter)
  }

  private changeSection (trackCounter: number) {
    if (this.g_sections[this.g_section]) {
      const sectionEnd = this.g_sections[this.g_section].start + this.g_sections[this.g_section].duration
      if (!sectionEnd || trackCounter > sectionEnd) {
        this.changeMode = true
        this.g_section++
      }
    }
  }

  private changeBar (trackCounter: number) {
    if (this.g_bars[this.g_bar]) {
      const barEnd = this.g_bars[this.g_bar].start + this.g_bars[this.g_bar].duration
      if (!barEnd || trackCounter > barEnd) {
        const barConfidence = this.g_bars[this.g_bar].confidence
        this.g_bar++
        if (barConfidence > 0.5) {
          console.log('## bar ##')
          this.barCounter++
          this.changeColour = true
        }
      }
    }
  }

  private changeBeat (trackCounter: number) {
    if (this.g_beats[this.g_beat]) {
      const beatEnd = this.g_beats[this.g_beat].start + this.g_beats[this.g_beat].duration
      if (!beatEnd || trackCounter > beatEnd) {
        const beatConfidence = this.g_beats[this.g_beat].confidence
        this.g_beat++
        if (beatConfidence > (this.beatAv + this.beatVariance)) {
          console.log('## beat ##')
          this.beatCounter++
        }
      }
    }
  }

  private changeTatum (trackCounter: number) {
    if (this.g_tatums[this.g_tatum]) {
      const tatumEnd = this.g_tatums[this.g_tatum].start + this.g_tatums[this.g_tatum].duration
      if (!tatumEnd || trackCounter > tatumEnd) {
        const tatumConfidence = this.g_tatums[this.g_tatum].confidence
        this.g_tatum++
        if (tatumConfidence > (this.tatumAv - this.tatumVariance)) {
          this.tatumCounter++
        }
      }
    }
  }

  private changeSegment (trackCounter: number) {
    if (this.g_segments[this.g_segment]) {
      const segmentEnd = this.g_segments[this.g_segment].start + this.g_segments[this.g_segment].duration
      if (!segmentEnd || trackCounter > segmentEnd) {
        this.g_segment++
        if (this.g_segments[this.g_segment].timbre) {
          this.g_timbre = this.g_segments[this.g_segment].timbre
        }
        if (this.g_segments[this.g_segment].pitches) {
          this.g_pitches = this.g_segments[this.g_segment].pitches
        }
      }
    }
  }

  /** Set Track Analysis Helpers */

  private setTrackAnalysisParts (trackData: any) {
    this.resetTrackVariables()
    this.setSections(trackData.sections)
    this.setBars(trackData.bars)
    this.setBeats(trackData.beats)
    this.setTatums(trackData.tatums)
    this.setSegments(trackData.segments)
    this.calculateTrackDeviation(trackData)
    this.loaded = true
  }

  private calculateBeatDeviation (beats: any) {
    this.beatVariance = 0
    this.beatAv = beats[0].confidence
    let d = 0
    for (let i = 1; i < beats.length; i++) {
      const confidence = beats[i].confidence
      if (confidence) {
        d = confidence - this.beatAv
        this.beatAv += d / beats.length
        this.beatVariance += d * (confidence - this.beatAv)
      }
    }
    this.beatVariance = this.beatVariance / (beats.length - 1)
    this.beatVariance = this.beatVariance * (1 + this.trackFeatures.valence)

    console.log(`beatAv = ${this.beatAv}`)
    console.log(`beatVar = ${this.beatVariance}`)
  }

  private calculateTatumDeviation (tatums: any) {
    this.tatumVariance = 0
    this.tatumAv = tatums[0].confidence
    let d = 0
    for (let i = 1; i < tatums.length; i++) {
      const confidence = tatums[i].confidence
      if (confidence) {
        d = confidence - this.tatumAv
        this.tatumAv += d / tatums.length
        this.tatumVariance += d * (confidence - this.tatumAv)
      }
    }
    this.tatumVariance = this.tatumVariance / (tatums.length - 1)
    this.tatumVariance = this.tatumVariance * (1.5 + this.trackFeatures.valence)

    console.log(`tatumAv = ${this.tatumAv}`)
    console.log(`tatumVar = ${this.tatumVariance}`)
  }

  private calculateTrackDeviation (trackData: any) {
    this.calculateBeatDeviation(trackData.beats)
    this.calculateTatumDeviation(trackData.tatums)
  }

  private resetTrackVariables () {
    this.g_section = 0
    this.g_bar = 0
    this.g_beat = 0
    this.g_tatum = 0
    this.g_segment = 0

    this.barCounter = 0
    this.beatCounter = 0
    this.tatumCounter = 0
  }

  private setSections (sections: any) {
    this.g_sections = sections
  }

  private setBars (bars: any) {
    this.g_bars = bars
  }

  private setBeats (beats: any) {
    this.g_beats = beats
  }

  private setTatums (tatums: any) {
    this.g_tatums = tatums
  }

  private setSegments (segments: any) {
    this.g_segments = segments
  }
}
