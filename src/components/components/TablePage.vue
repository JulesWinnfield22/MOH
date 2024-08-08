<script setup>
import { provide, ref } from "vue";

const props = defineProps({
  showSearch: {
    type: Boolean,
    default: true,
  },
});

const search = ref("");

provide("search", search);
</script>
<template>
  <div class="flex flex-col bg-white rounded">
    <div class="min-h-[5rem] flex justify-between items-center">
      <div class="capitalize text-text-clr/60 px-2 flex items-center">
        <button @click="$router.go(-1)">
          <h-icon scale="1.4" class="rotate-180" name="pr-angle-right" />
        </button>
        <div>
          {{
            $route.path
              .split("/")
              ?.at(-1)
              .replace(/\//g, "")
              ?.replace(/_/g, " ")
          }}
        </div>
      </div>
      <div class="flex-1 flex justify-end items-center p-2 gap-2">
        <slot name="left-actions" />
        <div v-if="showSearch" className="relative mr-4">
          <div
            className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
          >
            <img class="object-cover h-4 w-4" src="@/assets/img/search.png" />
          </div>
          <!-- <input
            type="search"
            placeholder="Search..."
            className="bg-th border border-white text-gray-900 text-sm rounded-full pl-10 p-2.5 outline-none w-80"
          /> -->
        </div>
        <slot name="right-actions" />
      </div>
    </div>
    <slot :search="search" />
  </div>
</template>
