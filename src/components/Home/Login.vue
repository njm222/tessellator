<template>
  <div class="login-container">
    <h1>Welcome Home</h1>
    <a href="/login"><button class="btn secondary">Login</button></a>
    <h4>A | free to use | real-time | 3-D | Spotify music visualizer</h4>
    <p>Unique users: <span :key="userCount">{{ userCount }}</span></p>
    <UserGeoChart />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { firebaseRef } from '@/services/firebase-utils'
import UserGeoChart from '@/components/Community/UserGeoChart.vue'

@Component({
  components: { UserGeoChart }
})
export default class Login extends Vue {
  private userCount = 'loading...'

  constructor () {
    super()
    this.loadAllUsersData()
  }

  loadAllUsersData () {
    const allUsersDataRef = firebaseRef.firebase.firestore().collection('aggregateUserData').doc('userCount')
    allUsersDataRef.get().then((snapshot) => {
      const data = snapshot.data()
      if (data) {
        this.userCount = data.count
      }
    }).catch((error) => {
      console.log(error)
    })
  }
}
</script>

<style scoped>

</style>
