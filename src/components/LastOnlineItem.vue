<template>
  <div v-if='lastOnlineUser' class="item">
    <a v-bind:href='lastOnlineUser.spotifyLink' target='_blank' :key="calculatedTime">
      {{lastOnlineUser.user}}
    </a>
    <div>
      {{calculatedTime}}
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class LastPlayedItem extends Vue {
  @Prop({ required: true })
  lastOnlineUser!: {
    user: string;
    spotifyLink: string;
    lastOnline: number;
  }

  private calculatedTime!: string
  private timerRef!: any;

  constructor () {
    super()
    this.calcTime()
  }

  destroyed () {
    this.stopTrackTimer()
  }

  private stopTrackTimer () {
    clearInterval(this.timerRef)
  }

  calcTime () {
    const currTime: any = new Date().getTime()
    const lastTime: number = new Date(this.lastOnlineUser.lastOnline).getTime()
    const time = Math.floor((currTime - lastTime) / 60000)
    if (time > 1440) {
      this.calculatedTime = Math.floor((time / 1440)).toString() + ' days ago'
    } else if (time > 60) {
      this.calculatedTime = Math.floor((time / 60)).toString() + ' hours ago'
    } else {
      this.calculatedTime = time.toString() + ' mins ago'
    }
    console.log('changed time to ' + time)
    this.timerRef = setTimeout(this.calcTime, 60000) // remove set timeout on destroy
  }
}
</script>

<style scoped>
</style>
