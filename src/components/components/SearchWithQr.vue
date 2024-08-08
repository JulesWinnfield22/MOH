<script setup>
import { ref, watch } from "vue";
import BaseIcon from "./base/BaseIcon.vue";
import QrCode from "@/assets/img/QrCode.png";

import { mdiMagnify } from "@mdi/js";

const props = defineProps({
  modelValue: {
    type: String,
  },
  showQr: {
    type: Boolean,
    default: true,
  },
  placeholder: {
    type: String,
  },
});
const emit = defineEmits(["update:modelValue"]);

const search = ref(props.modelValue);

watch(search, () => {
  emit("update:modelValue", search.value);
});
</script>

<template>
  <div class="p-4 bg-white/20 rounded-lg gap-[1rem] flex items-center">
    <div
      v-if="showQr"
      class="bg-white px-8 h-12 gap-4 bg-opacity-100 rounded-full flex items-center justify-center gap-x-2"
    >
      <div class="text-text-clr whitespace-nowrap opacity-60 leading-[1.3rem]">
        Scan QR
      </div>

      <img :src="QrCode" class="w-4 h-4" />
    </div>
    <div class="h-12 w-full bg-white gap-[1rem] rounded-full flex">
      <div class="bg-[#F5F6FF] rounded-full w-full">
        <input
          @keydown.enter="search"
          class="w-full h-full placeholder:text-text-clr bg-transparent ring-0 border-0 focus:ring-0"
          :placeholder="placeholder"
          type="text"
        />
      </div>
      <div class="rounded-full size-12 grid place-items-center text-white">
        <div class="bg-primary size-10 grid place-items-center rounded-full">
          <BaseIcon :size="24" :path="mdiMagnify"></BaseIcon>
        </div>
      </div>
    </div>
    <slot />
  </div>
</template>
