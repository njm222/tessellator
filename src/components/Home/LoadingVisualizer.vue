<template>
  <div class="visualizer-button-container">
    <breeding-rhombus-spinner
            :animation-duration="2000"
            :size="64"
            color="#FFF"
    ></breeding-rhombus-spinner>
    <p class="loading">loading visualizer</p>
    <p class="advice">For the best experience use a non-mobile device with a modern browser (not Safari)</p>
  </div>
</template>

<script type="ts">
import { Component, Vue } from 'vue-property-decorator'
import { BreedingRhombusSpinner } from 'epic-spinners'

@Component({
  components: { BreedingRhombusSpinner }
})
export default class LoadingVisualizer extends Vue {
}
</script>

<style scoped>
.visualizer-button-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2em 0;
}

@keyframes fade {
  from { opacity: 0; }
}

.visualizer-button-container .loading {
  animation: fade 0.75s infinite alternate;
  padding-top: 1em;
}

.advice {
  max-width: 460px;
  line-height: 2em;
  padding: 0 1em;
}
</style>
