<script setup>
import { inject, watch } from 'vue';

  defineProps({
    btnText: {
      type: String
    },
    pending: {
      type: Boolean,
      default: false
    }
  })

  const pendingRequest = inject('pending', false)

</script>
<template>
  <button class="w-full h-10 bg-primary rounded-md text-white">
    <span v-if="!pending && !pendingRequest">{{ btnText }}</span>
    <h-icon v-else name="fa-spinner" class="animate-spin" />
  </button>
</template>