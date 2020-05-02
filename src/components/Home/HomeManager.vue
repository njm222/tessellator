<template>
  <div>
    <transition name="fade" mode="out-in">
      <div v-if="this.user" key="LoginTrue">
        <h1>hello, <a :href="this.user.external_urls.spotify" target='_blank'>{{this.user.display_name}}</a></h1>
        <transition name="fade" mode="out-in">
          <div v-if="this.SpotifyAnalysisUtils && this.SpotifyAnalysisUtils.loaded" key="OpenVisualizer">
          <OpenVisualizer></OpenVisualizer>
          </div>
          <div v-else-if="this.user.product === 'premium'" key="LoadingVisualizer">
            <LoadingVisualizer></LoadingVisualizer>
          </div>
          <div v-else key="NonPremiumUser">
            <NonPremiumMessage></NonPremiumMessage>
          </div>
        </transition>
      </div>
      <div v-else key="LoginFalse">
        <Login></Login>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { getCookie, setCookie } from '@/services/cookie-utils'
import { addUser } from '@/services/firebase-utils'
import OpenVisualizer from './OpenVisualizer.vue'
import LoadingVisualizer from './LoadingVisualizer.vue'
import NonPremiumMessage from './NonPremiumMessage.vue'
import Login from './Login.vue'

@Component({
  components: { OpenVisualizer, LoadingVisualizer, NonPremiumMessage, Login }
})
export default class Home extends Vue {
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
      page_title: 'HomeManager.vue.vue',
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
</style>
