<template>
  <div class="accordion-item" :class="{ active: open }">
    <div class="accordion-title" @click="open = !open">
      <h4 v-html="item.title" :class="{ active: open }"></h4>
      <i class="icon dropdown" :class="{ on: open }"></i>
    </div>
    <transition name="fadeDown">
      <div v-if="open" class="accorion-content">
        <p v-html="item.content"></p>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class AccordionItem extends Vue {
  @Prop({ required: true })
  item!: object;

  data () {
    return {
      open: false
    }
  }
}

</script>

<style scoped>
.accordion-item {
  margin: 2em 0;
  padding: 2em;
  background-color: #292929;
  box-shadow: 0 10px 6px -6px #070707;
  opacity: 0.8;
  transition: all 1s;
}

.accordion-item.active {
  box-shadow: none;
}

.accordion-item:hover {
  opacity: 1;
}

.accordion-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
}

.accordion-title i,
.accordion-title h4 {
  transition: all 0.5s;
}

.accordion-title .active {
  color: #42b983;
}
.accordion-title .on {
  background-color: #D31E1E;
  transform: rotate(180deg);
}
.accordion-title .on:hover {
  background-color: #E42F2F;
}
.accordion-title a {
  padding: .25em;
  border: 1px solid #FFF;
  border-radius: .25em;
}
</style>
