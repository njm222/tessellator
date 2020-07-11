<template>
  <div class="community">
    <UserGeoChart/>
    <h1>Community</h1>
    <TopPlayed/>
  </div>
</template>

<script>
import TopPlayed from '@/components/Community/TopPlayed.vue'
import UserGeoChart from '@/components/Community/UserGeoChart'

export default {
  name: 'Community',
  components: {
    TopPlayed: TopPlayed,
    UserGeoChart: UserGeoChart
  }
}
</script>

<style scoped>

</style>
