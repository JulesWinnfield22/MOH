<script setup>
import { name } from '@/../package.json'
import { ref } from 'vue'
import IconButton from '@com/IconButton.vue'
import { useRoute, useRouter } from 'vue-router';

const route = useRoute()
const router = useRouter()

const routes = ref([
  // {
  //   name: "Dashboad",
  //   path: "/",
  //   icon: "md-dashboard-outlined",
  //   privilage: ['super admin']
  // },
  {
    name: "Agency",
    path: '/user_management',
    icon: 'md-homework-round',
    privilage: ['super admin']
  },
  // {
  //   name: "Role Management",
  //   path: '/role_management',
  //   icon: 'md-privacytip-outlined',
  //   privilage: ['super admin']
  // },
  // {
  //   path: '/privileges',
  //   icon: 'md-security',
  //   name: 'Privileges',
  //   privilage: ['super admin']
  // },
  // {
  //   name: "Settings",
  //   path: "/settings",
  //   icon: "fc-settings",
  // },
]);

</script>
<template>
  <div class="relative h-full w-full overflow-y-scroll bg-sidebar-clr z-20">
    <div
      class="px-2 z-20 gap-2 sticky top-0 bg-sidebar-clr h-topnav-height flex items-center transition-all duration-500 ease-in-out">
      <div class="w-12 h-12">
        <img src="../assets/logo.png" />
      </div>
      <p class="text-primary uppercase whitespace-nowrap font-bold text-lg overflow-hidden">
        Nyala insurance
      </p>
    </div>
    <div class="bg-sidebar-clr">
      <ul>
        <li v-privilage="rt.privilage" :key="rt.name" v-for="rt in routes" class="flex flex-col w-full text-sm">
          <IconButton @click="router.push(rt.path)" :class="[route.path == rt.path && 'router-link-active']" :icon="rt.icon" :text="rt.name " />
        </li>
      </ul>
    </div>
    <div class="absolute whitespace-nowrap top-full flex flex-col p-[4px] mx-auto leading-none">
      <p class="font-semibold font-mono text-sm">Twinsoft Technologies PLC</p>
      <small class="text-[8px] font-bold">Powered By</small>
    </div>
  </div>
</template>