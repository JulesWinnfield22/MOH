<script setup>
import { inject, watch } from "vue";
import Button from "./Button.vue";

defineProps({
  btnText: {
    type: String,
  },
  pending: {
    type: Boolean,
    default: false,
  },
  size: {
    type: String,
  },
});

const pendingRequest = inject("pending", false);
</script>
<template>
  <Button :size="size" class="w-full h-8 text-sm bg-primary text-white rounded">
    <span v-if="!pending && !pendingRequest">{{ btnText }}</span>
    <h-icon v-else name="fa-spinner" class="animate-spin" />
  </Button>
</template>
