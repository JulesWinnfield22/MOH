<script setup>
import navs from "@/config/nav";
import { onBeforeUnmount, onMounted, ref } from "vue";
import Dropdown from "@/components/Dropdown.vue";
import { mdiChevronDown } from "@mdi/js";
import BaseIcon from "@/components/base/BaseIcon.vue";
import Icon from '@/components/Icon.vue'
import { useAuth } from '@/stores/auth'

const show = ref(false);

const auth = useAuth()

function scrollHandler(currentPosition, position) {
  if (currentPosition >= position) {
    show.value = true;
  } else {
    show.value = false;
  }
}
function logout() {
  localStorage.clear();
  window.location.href = "/login";
}
</script>
<template>
  <div
    v-scroll-position.40="scrollHandler"
    class="h-full flex flex-col gap-4 overflow-hidden"
  >
    <div
      :class="[show && 'shadow-lg']"
      class="z-10 sticky top-0 flex items-center gap-6 px-4 h-20 bg-base-clr-2 pr-10"
    >
      <div>
        <img class="object-cover" src="/src/assets/img/kenema_logo.svg" />
      </div>
      <div class="flex-1 flex gap-2 ">
        <div v-for="nav in navs"
        :key="nav.name" v-privilage.role="nav.role">
          <RouterLink
            class="rounded px-4 p-2"
            :to="nav.path"
            auto
          >
            {{ nav.name }}
          </RouterLink>
        </div>
      </div>
      <Dropdown v-slot="{ setRef, toggleDropdown }">
        <button @click="toggleDropdown" class="flex items-center gap-4">
          <div class="flex items-center gap-2">
            <div class="size-8 rounded-full bg-gray-400" />
            <p class="capitalize">{{ auth.auth?.user?.firstName }}</p>
          </div>
          <BaseIcon :path="mdiChevronDown" :size="24" />
        </button>
        <div
          class="flex shadow-lg border p-2 mt-6 rounded flex-col gap-2 w-60 bg-white"
          :ref="setRef"
        >
          <button
            title="Edit Package"
            class="mx-1 flex justify-center bg-accent font-bold p-2 items-center gap-2 rounded-lg hover:shadow-xl duration-200"
          >
            <div class="flex flex-row">
              <span>Change password</span>
              <!-- <BaseIcon :path="mdiEdit" class="text-sm" /> -->
            </div>
          </button>
          <button
            @click="logout()"
            title="Edit"
            class="bg-white p-1 rounded-lg hover:shadow-xl duration-200"
          >
            <div
              class="flex flex-row justify-center rounded-lg font-bold bg-accent p-2"
            >
              <span>Logout</span>
              <!-- <Icon icon="tabler:file" class="text-sm" /> -->
            </div>
          </button>
        </div>
      </Dropdown>
    </div>
    <div
      :style="{
        height: 'calc(100% - 5rem)',
      }"
      class="relative overflow-y-auto"
    >
      <RouterView />
    </div>
  </div>
</template>
