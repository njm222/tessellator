<template>
  <div>
    <transition name="fade" mode="out-in">
      <div v-if="this.user" key="LoginTrue">
        <h1>hello, {{this.user.display_name}}_</h1>
        <transition name="fade" mode="out-in">
          <div class="visualizer-button-container" v-if="this.SpotifyAnalysisUtils && this.SpotifyAnalysisUtils.loaded" key="OpenVisualizer">
            <button class="btn secondary" @click="openVis">open visualizer</button>
          </div>
          <div class="visualizer-button-container" v-else key="LoadingVisualizer">
            <breeding-rhombus-spinner
                    :animation-duration="2000"
                    :size="64"
                    color="#FFF"
            ></breeding-rhombus-spinner>
            <p class="loading">loading visualizer</p>
          </div>
        </transition>
      </div>
      <div v-else key="LoginFalse">
        <h1>Welcome Home</h1>
        <button class="btn secondary" href="/login">Login</button>
        <h4>A 3D interactive music visualizer.</h4>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { getCookie, setCookie } from '@/services/cookie-utils'
import { addUser } from '@/services/firebase-utils'
import { BreedingRhombusSpinner } from 'epic-spinners'

@Component({
  components: { BreedingRhombusSpinner }
})
export default class Login extends Vue {
  get user () {
    return this.$store.state.user
  }

  get accessToken () {
    return this.$store.state.accessToken
  }

  get playerInfo () {
    return this.$store.state.playerInfo
  }

  get SpotifyAnalysisUtils () {
    return this.$store.state.spotifyAnalysisUtils
  }

  openVis () {
    this.$store.commit('mutateOpenVisualizer', true)
  }

  created (): void {
    this.$store.commit('mutateAccessToken', getCookie('accessToken'))
    this.$store.commit('mutateRefreshToken', getCookie('refreshToken'))
    Vue.axios.get('https://api.spotify.com/v1/me', {
      headers: {
        Authorization: 'Bearer ' + this.$store.state.accessToken
      }
    }).then((response) => {
      console.log(response)
      this.$store.commit('mutateUser', response.data)
      this.$store.dispatch('actionAuthUser', response.data)
      this.updateGtagUserID(response.data.id)
    }).catch((error) => {
      console.log(error)
      this.refreshAccessToken()
    })
  }

  private refreshAccessToken () {
    Vue.axios.post('/refreshToken', {
      refreshToken: this.$store.state.refreshToken
    }).then((response) => {
      setCookie('accessToken', response.data.access_token)
      this.$store.commit('mutateAccessToken', getCookie('accessToken'))
    }).catch(console.log)
  }

  updateGtagUserID (name: string) {
    this.$gtag.set({ user_id: name })
    this.$gtag.pageview({
      page_title: 'Login',
      page_path: '/login',
      page_location: '/login'
    })
  }

  @Watch('user')
  onUserChanged (value: any, oldValue: object) {
    if (JSON.stringify(value) !== null && JSON.stringify(oldValue) !== JSON.stringify(value)) {
      console.log(false)
      addUser(value)
    }
  }
}
</script>

<style scoped>
.visualizer-button-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2em 0;
}

@keyframes fade {
  from { opacity: 0; }
}

.visualizer-button-container .loading {
  animation: fade 1.5s infinite alternate;
  padding-top: 1em;
}
</style>
