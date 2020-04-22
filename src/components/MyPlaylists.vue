<template>
    <div class="home-container-child">
      <transition name="fade" mode="out-in">
        <div class="playlists-title" v-if="this.user" key="myPlaylistsTitle">
          <h3>Your Playlists</h3>
        </div>
      </transition>
      <transition name="fadeLeft" mode="out-in">
        <div class="playlists-container" v-if="this.userPlaylists" key="myPlaylistsContainer">
          <div v-for='(item, i) in userPlaylists.items' :key='item + i'>
            <UserPlaylist :playlistDetails="item" :userID ="user.id"></UserPlaylist>
          </div>
        </div>
        <div v-else>
          <fingerprint-spinner
                  :animation-duration="1500"
                  :size="64"
                  color="#FFF"
          ></fingerprint-spinner>
        </div>
      </transition>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import UserPlaylist from '@/components/UserPlaylist.vue'
import { FingerprintSpinner } from 'epic-spinners'

@Component({
  components: { UserPlaylist, FingerprintSpinner }
})
export default class MyPlaylists extends Vue {
  get userPlaylists () {
    return this.$store.state.userPlaylists
  }

  get user () {
    return this.$store.state.user
  }

  constructor () {
    super()
    console.log('loaded playlists')
    this.getThisUsersPlaylists()
  }

  private getThisUsersPlaylists () {
    console.log('get')
    Vue.axios.get('https://api.spotify.com/v1/me/playlists', {
      headers: {
        Authorization: 'Bearer ' + this.$store.state.accessToken
      }
    }).then((response) => {
      console.log(response.data.items)
      this.$store.commit('mutateUserPlaylists', response.data)
    }).catch((error) => {
      console.log(error)
    })
  }
}
</script>

<style scoped>
  .playlists-container {
    display: inline-flex;
    flex-direction: column;
    min-width: 300px;
    padding: 1em;
  }
</style>
