<template>
  <h3>{{title}} ({{usersCount}})</h3>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class ActiveUsersTitle extends Vue {
  @Prop({ default: 'Last Online Users' })
  title!: string

  @Prop({ default: '?' })
  usersCount!: number
}

</script>

<style scoped>

</style>
