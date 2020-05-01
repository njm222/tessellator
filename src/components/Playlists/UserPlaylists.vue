<template>
  <div>
    <transition name="fadeUp" mode="out-in">
      <div v-if="this.usersPlaylists.get(userID)" class="playlists-container" key="close{{userID}}Playlists">
        <div v-for='(playlist) in this.usersPlaylists.get(userID)' :key="userID + playlist.id">
          <UserPlaylist :playlistDetails="playlist" :userID="userID"></UserPlaylist>
        </div>
        <div v-if="this.usersPlaylists.get(userID).length === 0" class="item">
          {{userID}} has no public playlists
        </div>
        <div @click="hideUserPlaylists(userID)" class="icon-container">
          <i class="icon expand down"></i>
        </div>
      </div>
      <div @click="getOnlineUserPlaylists(userID)" v-else class="icon-container" key="open{{userID}}Playlists">
        <i class="icon expand"></i>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import UserPlaylist from '@/components/Playlists/UserPlaylist.vue'

@Component({
  components: { UserPlaylist }
})
export default class UserPlaylists extends Vue {
  @Prop({ required: true })
  userID!: string;

  get usersPlaylists () {
    return this.$store.state.usersPlaylists
  }

  hideUserPlaylists (userID: string) {
    console.log(`hiding ${userID}'s playlists`)
    this.$store.commit('mutateUsersPlaylists', {
      key: userID, value: false
    })
  }

  private getOnlineUserPlaylists (userID: string) {
    console.log(`getting ${userID}'s playlists`)
    Vue.axios.get(`https://api.spotify.com/v1/users/${userID}/playlists?limit=5`, {
      headers: {
        Authorization: 'Bearer ' + this.$store.state.accessToken
      }
    }).then((response) => {
      console.log(response)
      this.$store.commit('mutateUsersPlaylists', {
        key: userID,
        value: response.data.items,
        next: response.data.next
      })
    }).catch((error) => {
      console.log(error)
    })
  }
}
</script>

<style scoped>
.fadeUp-enter-active, .fadeUp-leave-active {
  transition: all 0.5s ease-in-out;
}
.fadeUp-enter, .fadeUp-leave-to {
  opacity: 0;
  transform: translateY(10vh);
}

.playlists-container {
  font-family: monospace;
  max-width: 60vw;
  text-align: left;
}

.icon-container {
  cursor: pointer;
  display: flex;
  justify-content: center;
}

.playlists-container .icon-container {
  margin-top: 0;
}

.playlists-container .icon.expand {
  background-color: #d31e1e;
}

.icon.expand {
  margin-right: 1em;
}

.icon-container:hover {
  border-radius: 1em;
  background-color: #292929;
}

.icon-container:hover .icon.expand {
  background-color: #FFF;
}
</style>
