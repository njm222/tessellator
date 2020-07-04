<template>
  <div v-if='trackDetails' class="item">
    <i @click="playTrack(deviceID, trackDetails.uri)" class="icon play"></i>
    <a v-bind:href='trackDetails.external_urls.spotify' target='_blank'>
      {{ trackDetails.name }}
    </a>
    by
    <a v-bind:href='trackDetails.artists[0].external_urls.spotify' target='_blank'>
      {{trackDetails.artists[0].name}}
    </a>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class LastPlayedItem extends Vue {
  @Prop({ required: true })
  trackDetails!: SpotifyApi.TrackLinkObject

  get deviceID () {
    return this.$store.state.deviceID
  }

  private playTrack (device_id: string, track: string): void {
    Vue.axios.put(`https://api.spotify.com/v1/me/player/play?device_id=${device_id}`, {
      uris: [track]
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
  .item .icon.play {
    display: inline-flex;
    margin: 0 0.5em -6px 0;
    width: 20px;
    height: 20px;
  }
</style>
