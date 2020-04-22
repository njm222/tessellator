<template>
  <div v-if='playlistDetails' class="playlist-item">
    <a v-bind:href='playlistDetails.external_urls.spotify' target='_blank'>
      {{ playlistDetails.name }}
    </a>
    <i @click="playPlaylist(deviceID, playlistDetails.uri)" class="icon play"></i>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class Playlist extends Vue {
  @Prop({ required: true })
  playlistDetails!: SpotifyApi.PlaylistObjectFull

  @Prop({ required: true })
  userID!: string

  get deviceID () {
    return this.$store.state.deviceID
  }

  private playPlaylist (device_id: string, playlist: string): void {
    console.log(playlist)
    console.log(device_id)
    Vue.axios.put(`https://api.spotify.com/v1/me/player/play?device_id=${device_id}`, {
      context_uri: playlist
    }, {
      headers: { Authorization: 'Bearer ' + this.$store.state.accessToken }
    }).then(res => {
      console.log(res)
    }).catch((error) => {
      console.log(error)
    })
  }
}
</script>

<style scoped>
.playlist-item {
  display: flex;
  padding: 1em 0;
  justify-content: space-between;
  flex-basis: auto;
}

.icon.play {
  height: 20px;
  width: 20px;
}
</style>
