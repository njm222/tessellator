<template>
  <div>
    <transition name="fade" mode="out-in">
      <div v-if="this.numUsers > 0">
        <p>{{numUsers}} users</p>
      </div>
    </transition>
    <transition name="fade" mode="out-in">
      <div v-if="this.numTracks > 0">
        <p>{{numTracks}} different tracks played</p>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { firebaseRef } from '@/services/firebase-utils'

@Component
export default class SiteStats extends Vue {
  private numUsers: number;
  private numTracks: number;

  constructor () {
    super()
    this.numUsers = -1
    this.numTracks = -1
  }

  created (): void {
    // this.loadNumUsers()
    // this.loadTracksPlayed()
  }

  private loadNumUsers (): void {
    console.log('getNumUsers')
    const UsersRef = firebaseRef.firebase.firestore().collection('users')
    UsersRef.get().then(collectionSnapshot => {
      console.log(`Received doc snapshot: ${collectionSnapshot}`)
      this.numUsers = collectionSnapshot.size
    },
    error => {
      console.log(`Encountered error: ${error}`)
    })
  }

  private loadTracksPlayed (): void {
    console.log('getNumTracks')
    const topTracksRef = firebaseRef.firebase.firestore().collection('topUserTracks')
    topTracksRef.get().then(collectionSnapshot => {
      console.log(`Received doc snapshot: ${collectionSnapshot}`)
      this.numTracks = collectionSnapshot.size
    },
    error => {
      console.log(`Encountered error: ${error}`)
    })
  }
}
</script>

<style scoped>

</style>
