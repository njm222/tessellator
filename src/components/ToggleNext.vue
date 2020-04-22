<template>
  <div class="button-container">
    <i @click="nextTrack(accessToken)" class="icon next"></i>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { SpotifyPlayer } from '@/services/spotify-utils'

@Component
export default class ToggleNextPrev extends Vue {
  get accessToken () {
    return this.$store.state.accessToken
  }

  nextTrack (accessToken: string) {
    console.log('=== next player ====')
    Vue.axios.post('https://api.spotify.com/v1/me/player/next', {}, {
      headers: { Authorization: 'Bearer ' + accessToken }
    }).then(res => {
      console.log(res)
    }).catch((error) => {
      console.log(error)
    })
  }
}
</script>

<style scoped>

</style>
