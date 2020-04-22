<template>
  <div class="outer-container">
    <div class="tabs">
      <div class="tab" v-bind:class="{off: !toggleTracks}" key="topTracksTitle">
        <button class="btn" @click="setToggle(toggleTracks)">
        <h2>Top Tracks Played</h2>
        </button>
      </div>
      <div class="tab" v-bind:class="{off: toggleTracks}" key="topTracksTitle">
        <button class="btn" @click="setToggle(toggleTracks)">
          <h2>Top Artists Played</h2>
        </button>
      </div>
    </div>
    <div v-if="toggleTracks" class="container">
      <transition name="fadeUp" mode="out-in">
        <div v-if="this.topTracks" key="topTracksCommunity">
          <div v-for='(item, i) in topTracks' :key='item + i' class="item">
            <TopTrack :trackDetails="item.data().trackData" :playedCount="item.data().count"></TopTrack>
          </div>
        </div>
        <div class="loading-container" v-else key="topTracksCommunityLoading">
          <fingerprint-spinner
                  :animation-duration="1500"
                  :size="64"
                  color="#FFF"
          ></fingerprint-spinner>
        </div>
      </transition>
    </div>
    <div v-else class="container">
      <transition name="fadeUp" mode="out-in">
        <div v-if="this.topArtists" key="topArtistsCommunity">
          <div v-for='(item, i) in topArtists' :key='item + i' class="item">
            <TopArtist :artistDetails="item.data().artistData" :playedCount="item.data().count"></TopArtist>
          </div>
        </div>
        <div class="loading-container" v-else key="topArtistsCommunityLoading">
          <fingerprint-spinner
                  :animation-duration="1500"
                  :size="64"
                  color="#FFF"
          ></fingerprint-spinner>
        </div>
      </transition>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import TopTrack from '@/components/TopTrack.vue'
import TopArtist from '@/components/TopArtist.vue'
import { firebaseRef } from '@/services/firebase-utils'
import { FingerprintSpinner } from 'epic-spinners'

@Component({
  components: { TopTrack, TopArtist, FingerprintSpinner }
})
export default class TopPlayed extends Vue {
  private toggleTracks: boolean

  get topTracks () {
    return this.$store.state.topTracks
  }

  get topArtists () {
    return this.$store.state.topArtists
  }

  setToggle (toggle: boolean) {
    this.toggleTracks = !toggle
  }

  constructor () {
    super()
    console.log('loaded top tracks')
    this.loadTopTracks()
    this.loadTopArtists()
    this.toggleTracks = true
  }

  private loadTopTracks () {
    console.log('getTracks')
    const topTracksRef = firebaseRef.firebase.firestore().collection('topUserTracks')
    topTracksRef.orderBy('count', 'desc').limit(10).onSnapshot(collectionSnapshot => {
      console.log(`Received doc snapshot: ${collectionSnapshot}`)
      this.$store.commit('mutateTopTracks', collectionSnapshot.docs)
    },
    error => {
      console.log(`Encountered error: ${error}`)
    })
  }

  private loadTopArtists () {
    console.log('getArtists')
    const topTracksRef = firebaseRef.firebase.firestore().collection('topUserArtists')
    topTracksRef.orderBy('count', 'desc').limit(10).onSnapshot(collectionSnapshot => {
      console.log(`Received doc snapshot: ${collectionSnapshot}`)
      this.$store.commit('mutateTopArtists', collectionSnapshot.docs)
    },
    error => {
      console.log(`Encountered error: ${error}`)
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
  transform: translateY(100vh);
}
.outer-container {
  display: flex;
  flex-direction: column;
}

.container {
  display: flex;
  flex-direction: column;
}

.tabs {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
}

.tab {
  opacity: 1;
  transition: all 0.5s ease-in-out;
}

.tab.off .btn:hover {
  border-color: #FFF;
}

.tab.off {
  opacity: 0.3;
}

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.item {
  display: flex;
  padding: 1em 10%;
}
.item:hover {
  background-color: hsla(0,0%,100%,0.1);
}
</style>
