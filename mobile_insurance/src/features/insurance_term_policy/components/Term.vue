<script setup>
import { ref } from 'vue';

  const props = defineProps({
    rate: {
      type: Object,
      required: true
    }
  })

  
</script>
<template>
  <div :class="[`rate-${rate.age}-${rate.term}`]" class="flex-1 h-10 w-18">
    <input @blur="$emit('blured')" @focus="$emit('selected')" :placeholder="`${rate.age} / ${rate.term}`" class="table-input h-full text-center bg-transparent max-w-full w-full block flex-1" :value="props.rate.maleRate" />
  </div>
</template>
<style>
  .table-input:focus,
  .table-input:hover {
    box-shadow: none;
  }

  .table-input:focus,
  .table-input:hover {
    background-color: #00f2;
  }
</style>