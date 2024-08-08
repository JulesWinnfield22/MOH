<script setup>
const props = defineProps({
  label: {
    type: String,
    default: null,
  },
  number: {
    type: Number,
    default: 0,
  },
});
</script>
<template>
  <div
    class="w-full h-[7.1rem] rounded-md bg-accent p-[1.5rem] flex flex-col gap-2"
  >
    <div class="text-sm">{{ label }}</div>
    <div class="flex w-full justify-between items-center">
      <p class="font-semibold text-[1.5rem] leading-[2.25rem] inter">
        {{ number }}
      </p>
      <div>xx</div>
    </div>
  </div>
</template>
