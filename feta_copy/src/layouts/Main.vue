<script setup>
  import { ref } from 'vue'
  import NavBar from '@com/NavBar.vue'
  import Drawer from '@com/Drawer.vue';

  const open = ref(true)
</script>
<template>
  <div class="flex bg-secondary w-full h-screen">
    <div :class="[open ? 'w-80' : 'w-12 show-title']"
      class="transition-all duration-500 ease-in-out relative bg-white h-full">
      <Drawer :open="open" />
      <button @click="open = !open"
        :class="[open ? 'rotate-0' : 'rotate-360' ]"
        class="z-20 bg-sidebar-clr absolute top-0 right-0 flex h-topnav-height w-12 items-center justify-center">
        <h-icon :class="[open ? 'rotate-0' : 'rotate-180' ]" class="transition-transform duration-500 ease-in-out  w-7 h-7" name="md-menuopen-round" />
      </button>
    </div>
    <!-- the widh is 100% minus the width of the sidebar -->
    <div style="width: calc(100% - 18rem)" class="flex-1 flex flex-col bg-gray-50">
      <div class="min-h-topnav-height">
        <slot name="navbar">
          <NavBar />
        </slot>
      </div>
      <div style="min-height: calc(100% - 3.5rem);" class="overflow-auto bg-bg-clr p-4">
        <RouterView />
      </div>
    </div>
  </div>
</template>