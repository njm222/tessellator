<template>
  <div class="community">
    <h1>Community</h1>
    <TopPlayed/>
    <UserGeoChart/>
  </div>
</template>

<script>
import TopPlayed from '@/components/Community/TopPlayed.vue'
import UserGeoChart from '@/components/Community/UserGeoChart.vue'

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
