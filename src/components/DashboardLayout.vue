<script setup lang="ts">
import Sidebar from './Sidebar.vue'
import Header from './Header.vue'
</script>

<template>
  <div class="flex h-screen bg-[#FBFBFB] font-roboto">
    <Sidebar />

    <div class="flex-1 flex flex-col overflow-hidden">
      <Header />

      <main class="flex-1 overflow-x-hidden overflow-y-auto bg-[#FBFBFB]">
        <div class="container mx-auto px-6 py-8 bg-[#FBFBFB]">
          <slot />
        </div>
      </main>
    </div>
  </div>
</template>
