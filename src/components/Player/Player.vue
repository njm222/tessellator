<template>
  <transition name="fadeUp">
    <div class="player-container" v-show="this.accessToken && this.playerInfo" v-bind:class="{hidden: !this.controlsToggle}">
      <div class="player-bar-container">
        <div class="player-bar">
          <TrackItem :trackDetails="this.playerInfo.track_window.current_track"></TrackItem>
          <SeekTrack :playerInfo="this.playerInfo"></SeekTrack>
          <PlayerControls></PlayerControls>
        </div>
      </div>
    </div>
  </transition>

</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { getCookie, setCookie } from '@/services/cookie-utils'
import { addTrackPlayed, addArtistsPlayed, firebaseRef } from '@/services/firebase-utils'
import TrackItem from '../Track/TrackItem.vue'
import SeekTrack from './SeekTrack.vue'
import PlayerControls from './PlayerControls.vue'
import { SpotifyAnalysis } from '@/services/spotify-utils'

@Component({
  components: { TrackItem, SeekTrack, PlayerControls }
})
export default class Player extends Vue {
  private prevTrackID: string;

  @Prop({ required: true })
  controlsToggle!: boolean

  constructor () {
    super()
    this.prevTrackID = ''
  }

  get SpotifyAnalysisUtils () {
    return this.$store.state.spotifyAnalysisUtils
  }

  get accessToken () {
    return this.$store.state.accessToken
  }

  get playerInfo () {
    return this.$store.state.playerInfo
  }

  get user () {
    return this.$store.state.user
  }

  created (): void {
    if (!this.SpotifyAnalysisUtils) {
      this.$store.commit('mutateSpotifyAnalysisUtils', new SpotifyAnalysis())
    }
  }

  mounted (): void {
    if (!document.getElementById('spotify-sdk')) {
      const sdk = document.createElement('script')
      sdk.setAttribute(
        'src',
        'https://sdk.scdn.co/spotify-player.js'
      )
      sdk.id = 'spotify-sdk'
      sdk.async = true
      this.sdkInit()
      document.head.appendChild(sdk)
    }
  }

  addPlayerListeners (player: Spotify.SpotifyPlayer): void {
    player.addListener('initialization_error', data => {
      console.log('initialization_error')
      console.log(data)
    })
    player.addListener('authentication_error', data => {
      console.log('authentication_error')
      console.log(data)
    })
    player.addListener('account_error', data => {
      console.log('account_error')
      console.log(data)
    })
    player.addListener('playback_error', data => {
      console.log('playback_error')
      console.log(data)
    })
    player.addListener('ready', data => {
      console.log('Ready with deviceID ', data.device_id)
      this.$store.commit('mutateDeviceID', data.device_id)
      // this.playRandomTrack(data.device_id)
      this.switchPlayer(data.device_id)
    })
    player.addListener('player_state_changed', data => {
      console.log('player state changed')
      console.log(data)
      this.$store.commit('mutatePlayerInfo', data)
      if (data && data.track_window.current_track.id !== this.prevTrackID) {
        this.getPlayerTrack()
      }
    })
  }

  sdkInit (): void {
    console.log('sdkInit')
    window.onSpotifyWebPlaybackSDKReady = () => {
      const player = new window.Spotify.Player({
        name: 'Visualizer Player',
        getOAuthToken: cb => { cb(this.$store.state.accessToken) }
      })
      this.addPlayerListeners(player)
      player.connect()
    }
  }

  private refreshAccessToken () {
    Vue.axios.post('/refreshToken', {
      refreshToken: this.$store.state.refreshToken
    }).then(response => {
      setCookie('accessToken', response.data.access_token)
      this.$store.commit('mutateAccessToken', getCookie('accessToken'))
    })
  }

  private play (device_id: string, track: string): void {
    Vue.axios.put(`https://api.spotify.com/v1/me/player/play?device_id=${device_id}`, {
      uris: [track]
    }, {
      headers: { Authorization: 'Bearer ' + this.$store.state.accessToken }
    }).then(res => {
      console.log(res)
    }).catch((error) => {
      console.log(error)
      this.refreshAccessToken()
    })
  }

  private switchPlayer (device_id: string): void {
    Vue.axios.put('https://api.spotify.com/v1/me/player', {
      device_ids: [device_id],
      play: true
    }, {
      headers: { Authorization: 'Bearer ' + this.$store.state.accessToken }
    }).then(res => {
      console.log(res)
    }).catch((error) => {
      console.log(error)
      this.refreshAccessToken()
    })
  }

  private playRandomTrack (device_id: string) {
    Vue.axios.get('https://api.spotify.com/v1/me/top/tracks', {
      headers: { Authorization: 'Bearer ' + this.$store.state.accessToken }
    }).then(response => {
      const randomTrack = response.data.items[Math.floor(Math.random() * 20)].uri
      this.play(device_id, randomTrack)
    })
  }

  private getPlayerTrack () {
    Vue.axios.get('https://api.spotify.com/v1/me/player', {
      headers: { Authorization: 'Bearer ' + this.$store.state.accessToken }
    }).then(response => {
      if (response.data) {
        console.log('has new track DATA')
        console.log(response.data)
        // Get Audio Analysis from Spotify
        if (this.SpotifyAnalysisUtils) {
          this.SpotifyAnalysisUtils.getTrackFeaturesAnalysis(this.accessToken, this.$store.state.playerInfo.track_window.current_track.id)
        } else {
          console.log('SpotifyAnalysisUtils doesnt exist')
        }
        // send firebase Data as lastPlayed under /users/{uid}
        if (response.data.item) {
          this.sendTrackData(response.data.item)
        }
        // send to firestore
        if (this.prevTrackID !== response.data.item.id) {
          // console.log(`sending new played track ${response.data.item.id}`)
          addTrackPlayed(response.data.item, this.$store.state.user.id)
          addArtistsPlayed(response.data.item, this.$store.state.user.id)
          this.prevTrackID = response.data.item.id
        }
      }
    }).catch(error => {
      console.log(error)
      this.refreshAccessToken()
    })
  }

  private sendTrackData (trackInfo: SpotifyApi.TrackLinkObject) {
    const userID: string = this.$store.state.user.id
    const ref = firebaseRef.firebase.database().ref(`users/${userID}/lastPlayed`)
    ref.set(trackInfo)
  }
}
</script>

<style scoped>
.fadeUp-enter-active, .fadeUp-leave-active {
  transition: all 0.5s ease-in-out;
}

.fadeUp-enter, .fadeUp-leave-to {
  opacity: 0;
  transform: translateY(10vh);
}

.fadeDown-enter-active, .fadeDown-leave-active {
  transition: all 0.5s ease-in-out;
}

.fadeDown-enter, .fadeDown-leave-to {
  opacity: 0;
  transform: translateY(10vh);
}

.player-container.hidden {
  pointer-events: none;
  opacity: 0;
  transform: translateY(10vh);
}

.player-container {
  z-index: 1;
  display: flex;
  flex-direction: column;
  position: fixed;
  bottom: 0;
  width: 100%;
  background: #292929;
  transition: all 0.5s;
  opacity: 0.7;
}

.player-bar-container {
  display: flex;
  flex-direction: column;
  padding: 0.5em 1em;
}

.player-bar {
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}

.player-container:hover,
.player-container:hover .player-bar-container {
  opacity: 1;
}
</style>
