<template>
  <div v-if='trackDetails' class="item">
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

  constructor () {
    super()
    console.log(this.trackDetails)
  }
}
</script>

<style scoped>
</style>
