<template>
  <div>
    <div v-if="isRepeat">
      <button @click="toggleRepeat(accessToken)">Don't Repeat Player</button>
    </div>
    <div v-else>
      <button @click="toggleRepeat(accessToken)">Repeat Player</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { SpotifyPlayer } from '@/services/spotify-utils'

@Component
export default class ToggleShuffle extends Vue {
  @Prop({ required: true })
  isRepeat!: boolean

  get accessToken () {
    return this.$store.state.accessToken
  }

  toggleRepeat (accessToken: string) {
    console.log('=== repeat player ====')
    Vue.axios.put(`https://api.spotify.com/v1/me/player/repeat?state=${!this.isRepeat}`, {}, {
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
