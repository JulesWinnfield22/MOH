<script setup>
  import RouterButton from './RouterButton.vue'

  const props = defineProps({
    parentopen: {
      type: Boolean,
      default: false
    },
    routes: {
      type: Array,
      required: true
    }
  })
</script>
<template>
  <RouterButton v-bind="props"  />
</template>