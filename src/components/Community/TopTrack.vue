<template>
  <div v-if='trackDetails' class="item-inner">
    <div class="track-details">
      <a v-bind:href='trackDetails.external_urls.spotify' target='_blank' class="item-inner-text">
        {{ trackDetails.name }}
      </a>
      <a v-bind:href='trackDetails.artists[0].external_urls.spotify' target='_blank' class="item-inner-text">
        <i>
          {{trackDetails.artists[0].name}}
        </i>
      </a>
    </div>
    <strong class="item-inner-text">{{playedCount}}</strong>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class TopTrack extends Vue {
  @Prop({ required: true })
  trackDetails!: SpotifyApi.TrackObjectFull

  @Prop({ required: true })
  playedCount!: number
}
</script>

<style scoped>
.item-inner {
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
}

.track-details {
  display: flex;
  flex-direction: column;
}

.item-inner .item-inner-text {
  margin: 0.5em 0;
  text-align: initial;
}

</style>
