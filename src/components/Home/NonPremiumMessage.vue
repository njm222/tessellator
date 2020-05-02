<template>
  <div class="visualizer-button-container">
    <p>Sorry, you must be a Spotify 'premium' user to view the viusalizer</p>
  </div>
</template>

<script>
export default {
  name: 'NonPremiumMessage'
}
</script>

<style scoped>
.visualizer-button-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2em 0;
}
</style>
