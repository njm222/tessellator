<template>
  <div class="faq">
    <h2>F.A.Q.</h2>
    <AccordionManager :items="faqItems" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import AccordionManager from '@/components/Accordion/AccordionManager.vue'

@Component({
  components: { AccordionManager }
})
export default class FAQ extends Vue {
  data () {
    return {
      faqItems: [
        {
          title: 'How does the visualizer work?',
          content: 'First a player is created and starts playing a track, from which the track features and analysis are obtained, all through the <a href="https://developer.spotify.com/">Spotify API</a>.<br><br>' +
              'At the same time your microphone starts listening to what is being played via the <a href="https://developer.mozilla.org/docs/Web/API/Web_Audio_API">Web Audio API</a> and further audio analysis is conducted.<br><br>' +
              'Using the audio analysis from the microphone and the Spotify API the animations are rendered on the screen in real-time using <a href="https://threejs.org/">three.js</a>  .',
          id: 0
        },
        {
          title: 'Do I need to be a Spotify Premium user to view the visualizer?',
          content: 'Yes.',
          id: 1
        },
        {
          title: 'How do I view the visualizer in fullscreen?',
          content: 'You can use the keyboard key \'f\' or \'F11\'',
          id: 2
        },
        {
          title: 'Can I use another device to change the music?',
          content: 'Yes, but make sure the \'Visualizer Player\' is selected from \'Devices available\' tab on the Spotify App.',
          id: 3
        },
        {
          title: 'How do I change a visualizer mode?',
          content: 'You can use the keyboard keys \'1-7\' to select a specific mode.',
          id: 4
        },
        {
          title: 'How do I change a colour mode?',
          content: 'You can use the keyboard keys \'q-v\' to select a specific colour mode.',
          id: 5
        },
        {
          title: 'How do I toggle the visualizer mode randomizer?',
          content: 'Open the visualizer controls on the left of the visualizer screen and the click on the \'Randomize Mode\' button or the keyboard key \'m\'.',
          id: 6
        },
        {
          title: 'How do I toggle the colour mode randomizer?',
          content: 'Open the visualizer controls on the left of the visualizer screen and the click on the \'Randomize Colour\' button or the keyboard key \'k\'.',
          id: 7
        }
      ]
    }
  }
}
</script>

<style scoped>
.faq {
  margin: 0 15%;
  max-width: 70vw;
}

@media only screen and (max-width: 768px) {
  .faq {
    margin: 0 10%;
    max-width: 80vw;
  }
}

@media only screen and (max-width: 480px) {
  .faq {
    margin: 0 5%;
    max-width: 90vw;
  }
}
</style>
