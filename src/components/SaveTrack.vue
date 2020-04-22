<template>
  <div>
    <div v-if="this.$data.hasLikedTrack">
      <i @click="unlikeTrack(accessToken)" class="icon heart on"></i>
    </div>
    <div v-else>
      <i @click="likeTrack(accessToken)" class="icon heart"></i>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator'
import { SpotifyPlayer } from '@/services/spotify-utils'

@Component
export default class SaveTrack extends Vue {
  @Prop({ required: true })
  trackID!: string

  data () {
    return {
      hasLikedTrack: false
    }
  }

  get accessToken () {
    return this.$store.state.accessToken
  }

  mounted () {
    this.$nextTick(() => {
      this.checkTrack(this.accessToken)
    })
  }

  checkTrack (accessToken: string) {
    console.log(`checking track ${this.trackID}`)
    Vue.axios.get(`https://api.spotify.com/v1/me/tracks/contains?ids=${this.trackID}`, {
      headers: { Authorization: 'Bearer ' + accessToken }
    }).then((res: any) => {
      console.log(res.data)
      this.$data.hasLikedTrack = res.data[0]
      console.log(this.$data.hasLikedTrack)
    }).catch((error) => {
      console.log(error)
    })
  }

  unlikeTrack (accessToken: string) {
    console.log('=== unlike track ====')
    Vue.axios.delete(`https://api.spotify.com/v1/me/tracks?ids=${this.trackID}`, {
      headers: { Authorization: 'Bearer ' + accessToken }
    }).then(res => {
      console.log(res)
      this.checkTrack(this.accessToken)
    }).catch((error) => {
      console.log(error)
    })
  }

  likeTrack (accessToken: string) {
    console.log('=== like track ====')
    Vue.axios.put(`https://api.spotify.com/v1/me/tracks?ids=${this.trackID}`, {}, {
      headers: { Authorization: 'Bearer ' + accessToken }
    }).then(res => {
      console.log(res)
      this.checkTrack(this.accessToken)
    }).catch((error) => {
      console.log(error)
    })
  }

  @Watch('trackID')
  onTrackIDChange (value: string, oldValue: string) {
    this.$nextTick(() => {
      this.checkTrack(this.accessToken)
    })
  }
}
</script>

<style scoped>
.icon.heart.on {
  background-color: #d31e1e;
}
</style>
