<template>
  <div>
    <div v-if="isShuffle">
      <i @click="toggleShuffle(accessToken)" class="icon shuffle on"></i>
    </div>
    <div v-else>
      <i @click="toggleShuffle(accessToken)" class="icon shuffle"></i>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { SpotifyPlayer } from '@/services/spotify-utils'

@Component
export default class ToggleShuffle extends Vue {
  @Prop({ required: true })
  isShuffle!: boolean

  get accessToken () {
    return this.$store.state.accessToken
  }

  toggleShuffle (accessToken: string) {
    console.log('=== shuffle player ====')
    Vue.axios.put(`https://api.spotify.com/v1/me/player/shuffle?state=${!this.isShuffle}`, {}, {
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
