<template>
  <div>
    <div v-if="this.user">
      <h1>Hi there, {{ this.user.display_name }}</h1>
      <p>Email address: {{ this.user.email }}</p>
      <p>Country: {{this.user.country}}</p>
      <p>
        <a :href="this.user.external_urls.spotify" target='_blank'>Link to your profile</a>
      </p>
      <p>Number of followers: {{ this.user.followers.total }}</p>
      <p>
        <button @click="logOut()" class="btn secondary">Log out</button>
      </p>
    </div>
    <div v-else>
      <p>Please <a href="/login">login</a> to view this page</p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { deleteCookie } from '@/services/cookie-utils'

@Component
export default class UserInfo extends Vue {
  get user () {
    return this.$store.state.user
  }

  logOut (): void {
    this.$store.commit('mutateUser', null)
    this.$store.commit('mutateAccessToken', null)
    this.$store.commit('mutateRefreshToken', null)
    deleteCookie('accessToken')
    deleteCookie('refreshToken')
    this.$router.push({ name: 'Home' })
  }
}
</script>

<style scoped>
a {
  color: #d31e1e;
}

a:hover {
  color: #42b983;
}
</style>
