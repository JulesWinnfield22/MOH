<script setup>
  import { closeModal } from '@/modals';
</script>
<template>
  <button class="absolute right-2 top-2 z-[100] w-10 h-10 grid place-items-center text-black" @click="closeModal()">
    <h-icon name="fa-times" />
  </button>
</template>