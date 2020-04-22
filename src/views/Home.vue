<template>
  <div class="home">
    <Player v-if="this.$store.state.authUser"></Player>
    <div v-if="!this.$store.state.openVisualizer">
      <Login :key="this.$store.state.accessToken"/>
      <div v-if="this.$store.state.playerInfo">
        <transition-group class="home-container" name="fade">
          <OnlineUsers v-if="this.$store.state.user" :key="this.$store.state.authUser"/>
          <MyPlaylists v-if="this.$store.state.authUser" key="myPlaylistsContainer"/>
        </transition-group>
      </div>
    </div>
    <div v-else>
      <div v-if="this.$store.state.openVisualizer">
        <VisualizerCanvas v-if="this.$store.state.playerInfo"></VisualizerCanvas>
        <VisualizerControls v-if="this.$store.state.modeKey"></VisualizerControls>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Login from '@/components/Login.vue'
import OnlineUsers from '@/components/OnlineUsers.vue'
import Player from '@/components/Player.vue'
import MyPlaylists from '@/components/MyPlaylists.vue'
import VisualizerCanvas from '@/components/VisualizerCanvas'
import VisualizerControls from '@/components/VisualizerControls'

export default {
  name: 'Home',
  components: {
    Login,
    OnlineUsers,
    Player,
    MyPlaylists,
    VisualizerCanvas,
    VisualizerControls
  }
}
</script>
