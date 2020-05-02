<template>
  <div class="visualizer-button-container">
    <button class="btn secondary" @click="openVis">open visualizer</button>
  </div>
</template>

<script type="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'

@Component
export default class OpenVisualizer extends Vue {
  openVis () {
    this.$store.commit('mutateOpenVisualizer', true)
  }
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
