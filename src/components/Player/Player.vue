<template>
  <transition name="fadeUp">
    <div class="player-container" v-if="this.accessToken && this.playerInfo">
      <div class="player-bar-container" v-bind:class="[this.hidePlayerToggle ? 'hidden' : '']">
        <transition name="fadeDown" mode="out-in">
          <div v-if="this.hidePlayerToggle" key="HiddenPlayerContainer">
            <div class="showToggle">
              <i @click="showPlayer" class="icon expand down"></i>
            </div>
          </div>
          <div v-else key="OpenPlayerContainer">
            <div class="hideToggle">
              <i @click="hidePlayer" class="icon expand"></i>
            </div>
            <div class="player-bar">
              <TrackItem :trackDetails="this.playerInfo.track_window.current_track"></TrackItem>
              <PlayerControls></PlayerControls>
            </div>
          </div>
        </transition>
      </div>
      <div class="player-progress" v-bind:class="[this.hidePlayerToggle ? 'hidden' : '']">
        <SeekTrack :playerInfo="this.playerInfo"></SeekTrack>
      </div>
    </div>
  </transition>

</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
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
  private hidePlayerToggle: boolean;
  private prevTrackID: string;

  constructor () {
    super()
    this.hidePlayerToggle = false
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

  hidePlayer () {
    this.hidePlayerToggle = true
  }

  showPlayer () {
    this.hidePlayerToggle = false
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
      this.playRandomTrack(data.device_id)
    })
    player.addListener('player_state_changed', data => {
      console.log('player state changed')
      console.log(data)
      this.$store.commit('mutatePlayerInfo', data)
      if (data && data.position === 0) {
        console.log(data)
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
    console.log(track)
    console.log(device_id)
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
          console.log(`sending new played track ${response.data.item.id}`)
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

.player-container {
  z-index: 1;
  display: flex;
  flex-direction: column;
  position: fixed;
  bottom: 0;
  width: 100%;
}

.player-bar-container {
  display: flex;
  flex-direction: column;
  padding: 0.5em 1em 0;
  background: #292929;
  opacity: 0.9;
}

.player-container .player-bar-container.hidden {
  opacity: 0.3;
}

.player-bar {
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}

.player-progress {
  display: flex;
  justify-content: center;
  background: #292929;
  opacity: 0.9;
}

.player-progress.hidden {
  opacity: 0.3;
}

.player-container:hover,
.player-container:hover .player-bar-container,
.player-container:hover .player-progress {
  opacity: 1;
}

.hideToggle {
  position: fixed;
  right: 0;
  left: 0;
  display: flex;
  justify-content: center;
}

.showToggle {
  display: flex;
  justify-content: center;
}

@media only screen and (max-width: 375px) {
  .hideToggle {
    position: relative;
    margin-bottom: 10px;
  }
}
</style>
