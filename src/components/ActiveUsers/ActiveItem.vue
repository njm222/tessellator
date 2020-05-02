<template>
  <div class="item user-info">
    <a v-bind:href='spotifyLink' target='_blank' :key="calculatedTime">
      <strong>
        {{user}}
      </strong>
    </a>
    <div v-if="lastOnline" class="time">
      {{this.calculatedTime}}
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class ActiveItem extends Vue {
  @Prop({ required: true })
  user!: string;

  @Prop({ required: true })
  spotifyLink!: string;

  @Prop()
  lastOnline!: number;

  private calculatedTime = '';
  private timerRef!: any;

  mounted () {
    if (this.lastOnline) {
      this.calcTime()
    }
  }

  destroyed () {
    this.stopTrackTimer()
  }

  private stopTrackTimer () {
    clearInterval(this.timerRef)
  }

  calcTime () {
    const currTime: any = new Date().getTime()
    const lastTime: number = new Date(this.lastOnline).getTime()
    const time = Math.floor((currTime - lastTime) / 60000)
    if (time > 1440) {
      this.calculatedTime = Math.floor((time / 1440)).toString() + ' days ago'
      // this.timerRef = setTimeout(this.calcTime, 360000)
    } else if (time > 60) {
      this.calculatedTime = Math.floor((time / 60)).toString() + ' hours ago'
      this.timerRef = setTimeout(this.calcTime, 360000)
    } else {
      this.calculatedTime = time.toString() + ' mins ago'
      this.timerRef = setTimeout(this.calcTime, 60000)
    }
  }
}
</script>

<style scoped>
.user-info {
  display: flex;
  justify-content: space-between;
}

.user-info .time {
  font-family: monospace;
  padding-left: 2em;
}
</style>
