<script setup>
  import ResponseError from '@com/ResponseError.vue';
  defineProps({
    title: {
      type: String,
      required: true
    },
    error: {
      type: String
    }
  })
</script>
<template>
  <div class="min-h-full overflow-scroll flex p-2 flex-col gap-4 h-full shadow-lg w-[40rem] border-l bg-table-clr">
    <div class="bg-inherit z-10 h-12 p-2 border-b text-xl font-semibold">
      {{ title }}
    </div>
    <ResponseError :error="error" />
    <slot />
  </div>
</template>