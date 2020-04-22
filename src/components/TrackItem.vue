<template>
  <div class="now-playing-left-container" v-if='trackDetails'>
    <div class="now-playing-left">
      <div class="track-details">
        <div class="track-name">
          <a v-bind:href='convertURItoURL(trackDetails.uri)' target='_blank'>
            {{ trackDetails.name }}
          </a>
        </div>
        <div class="artist-name">
          <a v-bind:href='convertURItoURL(trackDetails.artists[0].uri)' target='_blank'>
            {{trackDetails.artists[0].name}}
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class TrackItem extends Vue {
  @Prop({ required: true })
  trackDetails!: SpotifyApi.TrackLinkObject

  constructor () {
    super()
    console.log(this.trackDetails)
  }

  convertURItoURL (stringToConvert: string) {
    const stringArr = stringToConvert.split(':')
    let ret = 'https://open.spotify.com/'

    if (stringArr.length === 3) {
      ret += stringArr[1] + '/'
      ret += stringArr[2]
    }

    return ret
  }
}
</script>

<style scoped>
.now-playing-left-container {
  width: 25%;
  min-width: 180px;
}

.now-playing-left {
  display: flex;
  flex-direction: row;
}

.track-details {
  text-align: initial;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 14px;
}

.track-name {
  padding: 5px 0;
}

.artist-name {
  padding: 5px 0;
}
</style>
