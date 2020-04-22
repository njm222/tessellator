<template>
  <div class="community">
    <h1>Community</h1>
    <TopPlayed/>
  </div>
</template>

<script>
import TopPlayed from '@/components/TopPlayed.vue'

export default {
  name: 'Community',
  components: {
    TopPlayed: TopPlayed
  }
}
</script>

<style scoped>

</style>
