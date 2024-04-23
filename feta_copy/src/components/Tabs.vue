<script setup>
import { ref } from 'vue';

  const props = defineProps({
    tabs: {
      type: Object,
      required: true
    }
  })

  const key = Object.keys(props.tabs)?.[0]
  const active = ref(key || '')
</script>
<template>
  <div class="flex flex-col bg-white rounded-md overflow-hidden">
    <div class="min-h-[3rem] flex bg-white">
      <button @click="active = tab" :class="[active == tab ? 'bg-gray-300 text-primary text-sm' : 'text-xs']" :key="tab" v-for="tab in Object.keys(tabs)" class="font-semibold uppercase min-h-[3rem] w-32">
        {{ tab }}
      </button>
    </div>
    <div class="p-2 overflow-y-scroll">
      <component :key="active" v-bind="tabs[active]?.props" :is="tabs[active]?.component" />
    </div>
  </div>
</template>