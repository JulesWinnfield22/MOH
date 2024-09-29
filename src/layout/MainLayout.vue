<script setup>
import Header from '@/components/Header.vue';
import Sidebar from '@/components/Sidebar.vue';
</script>

<template>
  <div class="flex h-full w-full">
    <div class="__drawer w-drawer-width border-r">
      <div class="flex items-center justify-center bg-secondary p-4">
        <div class="flex items-center px-4">
          <img class="w-full" src="/src/assets/Union.png" />
          <div class="flex flex-col gap-1">
            <span
              class="mx-2 text-md whitespace-nowrap font-normal text-white"
              >ጤና ሚኒስቴር-ኢትዮጵያ</span
            >
            <span
              class="text-xs text-gray-400 font-dm-sans whitespace-nowrap"
            >
              MINISTRY OF HEALTH ETHIOPIA
            </span>
          </div>
        </div>
      </div>
      <div
        class="show-scrollbar px-4 items-center bg-secondary h-[calc(100%-4.75rem)] flex flex-col justify-start gap-1"
      >
        <Sidebar />
      </div>
    </div>
    <div class="flex flex-col w-[calc(100%-var(--drawer-width))]">
      <div class="h-navbar-height">
        <Header />
      </div>
      <div class="show-scrollbar h-[calc(100%-var(--navbar-height))] bg-base-clr2 w-full">
        <RouterView />
      </div>
    </div>
  </div>
</template>

<style>
.__drawer .router-link-active {
  background-color: theme('colors.gray.500');
  color: rgb(var(--base-clr));
}

.__drawer .router-link-exact-active {
  background-color: theme('colors.primary');
  color: rgb(var(--base-clr));
}
</style>
