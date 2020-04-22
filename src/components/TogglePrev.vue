<template>
  <div class="button-container">
    <i @click="prevTrack(accessToken)" class="icon prev"></i>
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

  prevTrack (accessToken: string) {
    console.log('=== prev player ====')
    Vue.axios.post('https://api.spotify.com/v1/me/player/previous', {}, {
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
