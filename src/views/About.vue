<template>
  <div>
    <AboutDescription />
    <FAQ />
    <Contact />
  </div>
</template>

<script>
import FAQ from '@/components/About/FAQ.vue'
import Contact from '@/components/About/Contact.vue'
import AboutDescription from '@/components/About/AboutDescription'

export default {
  name: 'About',
  components: {
    AboutDescription,
    FAQ,
    Contact
  }
}
</script>

<style scoped>

</style>
