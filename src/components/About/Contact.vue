<template>
  <div class="contact">
    <div class="contact-card">
      <div class="contact-title">
        Don't see your question / issue?
      </div>
      <div class="contact-content">
        Drop me a message at <a href="mailto:tessellator_space@gmail.com">tessellator_space@gmail.com</a>
        <br>
        or create an issue on <a href="https://github.com/njm222/Spotify_Visualizer" target="_blank">Github</a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Contact extends Vue {
  data () {
    return {
      faqItems: [
        {
          title: 'How does the visualizer work?',
          content: 'First a player is created and starts playing a track, from which the track features and analysis is obtained, all through the Spotify API.<br><br>' +
              'At the same time your microphone starts listening to what is being played via the Web Audio API and further audio analysis is conducted.<br><br>' +
              'Using the audio analysis from the microphone and the Spotify API the animations are rendered on the screen in real-time using threejs.',
          id: 0
        },
        {
          title: 'Do I need to be a Spotify Premium user to view the visualizer?',
          content: 'Yes.',
          id: 1
        },
        {
          title: 'Can I use another device to change the music?',
          content: 'Yes, but make sure the \'Visualizer Player\' is selected from \'Devices available\' tab on the Spotify App.',
          id: 2
        },
        {
          title: 'How do I change a visualizer mode?',
          content: 'You can use the keyboard keys \'1-7\' to select a specific mode.',
          id: 3
        },
        {
          title: 'How do I change a colour mode?',
          content: 'You can use the keyboard keys \'q-v\' to select a specific colour mode.',
          id: 4
        },
        {
          title: 'How do I toggle the visualizer mode randomizer?',
          content: 'Open the visualizer controls on the left of the visualizer screen and the click on the \'Randomize Mode\' button or the keyboard key \'m\'.',
          id: 5
        },
        {
          title: 'How do I toggle the colour mode randomizer?',
          content: 'Open the visualizer controls on the left of the visualizer screen and the click on the \'Randomize Colour\' button or the keyboard key \'k\'.',
          id: 6
        }
      ]
    }
  }
}
</script>

<style scoped>
.contact-card {
  display: flex;
  flex-direction: column;
  padding: 2.5em;
  background-color: #292929;
}
.contact-card div {
  margin: 1em 0;
}
.contact-title {
  font-size: 2em;
}
.contact-content {
  line-height: 2em;
}
</style>
