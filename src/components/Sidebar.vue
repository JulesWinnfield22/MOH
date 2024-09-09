<script setup lang="ts">
import navs from '@/config/navs';
</script>

<template>
  <RouterLink 
    v-for="nav in navs"
    :key="nav.name"
    v-privilage="nav.privilage"
    class="flex gap-4 items-center w-full px-6 py-2 mt-4 duration-200 border-gray-900 text-[#FFFFFF] hover:bg-gray-600 hover:bg-opacity-25 hover:text-gray-100 rounded-lg"
    :to="nav.to">
    <span v-html="nav.icon" />
    {{ nav.name }}
  </RouterLink>
</template>
