<template>
  <div class="about">
    <FAQ />
    <Contact />
  </div>
</template>

<script>
import FAQ from '@/components/About/FAQ.vue'
import Contact from '@/components/About/Contact.vue'

export default {
  name: 'About',
  components: {
    FAQ: FAQ,
    Contact: Contact
  }
}
</script>

<style scoped>

</style>
