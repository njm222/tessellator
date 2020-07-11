<template>
  <div class="login-container">
    <h1>Welcome Home</h1>
    <a href="https://tessellator.herokuapp.com/login"><button class="btn secondary">Login</button></a>
    <h4>A | free to use | real-time | 3-D | Spotify music visualizer</h4>
    <p>Unique users: {{ userCount }}</p>
  </div>
</template>

<script lang="ts">
import { Vue } from 'vue-property-decorator'
import { firebaseRef } from '@/services/firebase-utils'

export default class Login extends Vue {
  private userCount = 'loading...'

  constructor () {
    super()
    this.loadAllUsersData()
  }

  loadAllUsersData () {
    const allUsersDataRef = firebaseRef.firebase.firestore().collection('users').doc('allUsersData')

    allUsersDataRef.get().then((snapshot) => {
      const data = snapshot.data()
      if (data) {
        this.userCount = data.totalNumUsers
        this.$forceUpdate()
      }
    }).catch((error) => {
      console.log(error)
    })
  }
}
</script>

<style scoped>

</style>
