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
import { Component, Vue } from 'vue-property-decorator'
import TogglePausePlay from './PlayerControls/TogglePausePlay.vue'
import ToggleShuffle from './PlayerControls/ToggleShuffle.vue'
import ToggleRepeat from './PlayerControls/ToggleRepeat.vue'
import TogglePrev from './PlayerControls/TogglePrev.vue'
import ToggleNext from './PlayerControls/ToggleNext.vue'
import SaveTrack from './PlayerControls/SaveTrack.vue'

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
    width: 20%;
    min-width: 180px;
  }

  .now-playing-right {
    display: flex;
  }

  .player-controls {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-flow: row nowrap;
  }
</style>
