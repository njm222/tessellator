<template>
  <div v-if="isPaused" class="button-container">
    <i @click="playPlayer(accessToken)" class="icon play"></i>
  </div>
  <div v-else class="button-container">
    <i @click="pausePlayer(accessToken)" class="icon pause"></i>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { SpotifyPlayer } from '@/services/spotify-utils'

@Component
export default class ToggleNextPrev extends Vue {
  @Prop({ required: true })
  isPaused!: boolean

  get accessToken () {
    return this.$store.state.accessToken
  }

  pausePlayer (accessToken: string) {
    console.log('=== pausing player ====')
    Vue.axios.put('https://api.spotify.com/v1/me/player/pause', {}, {
      headers: { Authorization: 'Bearer ' + accessToken }
    }).then(res => {
      console.log(res)
    }).catch((error) => {
      console.log(error)
    })
  }

  playPlayer (accessToken: string) {
    console.log('=== playing player ====')
    Vue.axios.put('https://api.spotify.com/v1/me/player/play', {}, {
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
