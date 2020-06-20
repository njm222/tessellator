<template>
  <div class="accordion-container">
    <AccordionItem
      v-for="item in items"
      :item="item"
      :key="item.id">
    </AccordionItem>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import AccordionItem from '@/components/Accordion/AccordionItem.vue'

@Component({
  components: { AccordionItem }
})
export default class AccordionManager extends Vue {
  @Prop({ required: true })
  items!: object[];
}
</script>

<style scoped>
.accordion-container {
  text-align: left;
  padding: 2.5vw;
}
</style>
