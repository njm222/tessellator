<template>
  <div class="now-playing-right-container" v-if="playerInfo">
    <div class="now-playing-right">
      <div class="player-controls">
        <TogglePrev></TogglePrev>
        <TogglePausePlay :isPaused="playerInfo.paused"></TogglePausePlay>
        <ToggleNext></ToggleNext>
        <ToggleShuffle :isShuffle="playerInfo.shuffle"></ToggleShuffle>
        <SaveTrack :trackID="playerInfo.track_window.current_track.id"></SaveTrack>
      </div>
      </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import TogglePausePlay from '@/components/TogglePausePlay.vue'
import ToggleShuffle from '@/components/ToggleShuffle.vue'
import ToggleRepeat from '@/components/ToggleRepeat.vue'
import TogglePrev from '@/components/TogglePrev.vue'
import ToggleNext from '@/components/ToggleNext.vue'
import SaveTrack from '@/components/SaveTrack.vue'

@Component({
  components: { TogglePausePlay, ToggleShuffle, ToggleRepeat, TogglePrev, ToggleNext, SaveTrack }
})
export default class PlayerControls extends Vue {
  get accessToken () {
    return this.$store.state.accessToken
  }

  get playerInfo () {
    return this.$store.state.playerInfo
  }
}
</script>

<style scoped>
  .now-playing-right-container {
    width: 25%;
    min-width: 180px;
  }

  .now-playing-right {
    display: flex;
  }

  .player-controls {
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    flex-flow: row nowrap;
  }
</style>
