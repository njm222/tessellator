<template>
  <div class="dashboard">
    <h1>Dashboard</h1>
    <UserInfo/>
  </div>
</template>

<script>
import UserInfo from '@/components/UserInfo.vue'

export default {
  name: 'Dashboard',
  components: {
    UserInfo
  }
}
</script>

<style scoped>

</style>
