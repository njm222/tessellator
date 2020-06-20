<template>
  <div class="about">
    <h1>About</h1>
    <div class="description">{{ description }}</div>
    <div class="content" v-html="this.content"></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class AboutDescription extends Vue {
  data () {
    return {
      description: 'A | free to use | real-time | 3-D | Spotify music visualizer',
      content: 'The inspiration for Tessellator came after a <a href="https://www.christian-loeffler.net/">Christian Löffler</a> set in SF.<br>' +
        'Tessellator is an interactive 3D music visualizer that has been developed to enhance your experience while listening to your favourite tracks. ' +
        'Tessellator uses the live audio to draw the visualizations in real-time. No loops / static content.'
    }
  }
}
</script>

<style scoped>
.about {
  margin: 0 15%;
  max-width: 70vw;
}

.about .description {
  padding: 4em 1em;
}

.about .content {
  margin: 0 2em;
  padding: 0 1.5em;
  text-align: left;
  line-height: 2em;
}

@media only screen and (max-width: 768px) {
  .about {
    margin: 0 10%;
    max-width: 80vw;
  }
}

@media only screen and (max-width: 480px) {
  .about {
    margin: 0 5%;
    max-width: 90vw;
  }
}
</style>
