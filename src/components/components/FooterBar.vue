<script setup>
import BaseLevel from '@/components/base/BaseLevel.vue';
// import JustboilLogo from '@/components/JustboilLogo.vue'

const year = new Date().getFullYear();
</script>

<template>
  <footer class="py-2 px-16" >
    <BaseLevel>
      <div class="text-center md:text-left">
        <b>&copy;{{ year }},eRx Ethiopian </b>
        <slot />
      </div>
      <div class="md:py-2"></div>
    </BaseLevel>
  </footer>
</template>
