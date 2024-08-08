<script setup>
  const props = defineProps({
    size: {
      type: String,
      default: 'md'
    }
  })
</script>
<template>
  <button :class="[$style?.[size]]" class="px-4 rounded capitalize">
    <slot></slot>
  </button>
</template>

<style module>
  .md {
    min-width: 6.8rem !important;
    height: 2rem !important;
  }
  
  .sm {
    min-width: 3.6rem !important;
    height: 2rem !important;
  }
  
  .lg {
    min-width: 3.6rem !important;
    height: 2.5rem !important;
  }
</style>