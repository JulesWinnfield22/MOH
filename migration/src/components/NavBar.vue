<script setup>
  import IconButton from '@com/IconButton.vue'
  import Dropdown from '@com/Dropdown.vue'
  import { useAuth } from '@store/auth';

  const authStore = useAuth()

  const actions = [
    {
      name: "notification",
      icon: "bi-bell"
    },
  ]
</script>
<template>
  <div class="relative h-topnav-height w-full flex justify-between items-center">
    <div class="ml-auto flex items-center h-12">
      <div class="w-12 h-12 flex justify-center items-center">
        <div class="h-10 w-10 rounded-lg bg-gray-200">

        </div>
      </div>
      <div class="flex flex-col my-auto h-10 gap-1">
        <div class="leading-none font-semibold text-lg rounded-md">
          {{ authStore.auth.user.firstName }} {{ authStore.auth.user.fatherName }}
        </div>
        <div class=" leading-none rounded-md text-xs">
          {{ authStore.auth.user.role }}
        </div>
      </div>
    </div>
    <div class="h-full flex items-center gap-3 px-4">
      <IconButton class="rounded-full shadow-sm text-primary w-10 h-10 bg-gray-200" :icon="action.icon" v-for="action in actions" :key="action.name">
      </IconButton>
      <!-- <Dropdown top="105%" v-slot="{ setRef, toggleDropdown }">
        <div class="rounded-md bg-table-clr border shadow-md p-3 w-40" :ref="setRef">
          <a target="_blank" href="http://localhost:5174" class="grid place-items-center h-12 w-12 text-lg bg-primary font-semibold text-secondary shadow-lg rounded-full">
            HC
          </a>
        </div>
        <IconButton @click="toggleDropdown" class="rounded-full shadow-sm text-primary w-10 h-10 bg-gray-200" icon="io-apps">
        </IconButton>
      </Dropdown> -->
    </div>
  </div>
</template>