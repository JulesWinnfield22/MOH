<script setup>
import { useRouter } from "vue-router";
import { ref } from "vue";
import {
  Dialog,
  DialogPanel,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import IconRounded from "./base/IconRounded.vue";
import { mdiWindowClose } from "@mdi/js";

let props = defineProps({
  open: {
    type: String,
    default: false,
  },
  name: {
    type: String,
  },
  icon: {
    type: String,
    required: false,
  },
  title: {
    type: String,
    required: false,
  },
});
</script>
<template>
  <TransitionRoot as="template" :show="open">
    <Dialog as="div" class="relative z-40">
      <TransitionChild
        as="template"
        enter="ease-out duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in duration-200"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div
          class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        />
      </TransitionChild>

      <div class="fixed inset-0 z-10 w-900 overflow-y-auto">
        <div
          class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
        >
          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <DialogPanel
              class="relative transform overflow-hidden rounded-lg bg-white px-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-fit sm:p-6"
            >
              <div class="sm:flex sm:items-start sm:flex-col px-6">
                <div class="flex justify-between w-full items-center">
                  <div class="flex items-center">
                    <IconRounded
                      v-if="icon"
                      :icon="icon"
                      color="black"
                      class="mr-3 border-2 border-b-4"
                      bg
                    />
                    <div class="title text-bold text-black text-xl">
                      {{ title }} {{ name }}
                    </div>
                  </div>

                  <div class="w-[4rem] h-[2.8rem] items-center mt-2">
                    <button @click="$emit('close')">
                      <svg
                        width="22"
                        height="22"
                        viewBox="0 0 22 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M8.7803 7.71965C8.48741 7.42676 8.01253 7.42676 7.71964 7.71965C7.42675 8.01255 7.42675 8.48742 7.71964 8.78031L9.68932 10.75L7.71966 12.7197C7.42677 13.0125 7.42677 13.4874 7.71966 13.7803C8.01255 14.0732 8.48743 14.0732 8.78032 13.7803L10.75 11.8107L12.7196 13.7803C13.0125 14.0732 13.4874 14.0732 13.7803 13.7803C14.0732 13.4874 14.0732 13.0125 13.7803 12.7196L11.8106 10.75L13.7803 8.78033C14.0732 8.48744 14.0732 8.01257 13.7803 7.71968C13.4874 7.42678 13.0125 7.42678 12.7196 7.71968L10.75 9.68933L8.7803 7.71965Z"
                          fill="#1C274C"
                        />
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M10.75 0C4.81294 0 0 4.81294 0 10.75C0 16.6871 4.81294 21.5 10.75 21.5C16.6871 21.5 21.5 16.6871 21.5 10.75C21.5 4.81294 16.6871 0 10.75 0ZM1.5 10.75C1.5 5.64137 5.64137 1.5 10.75 1.5C15.8586 1.5 20 5.64137 20 10.75C20 15.8586 15.8586 20 10.75 20C5.64137 20 1.5 15.8586 1.5 10.75Z"
                          fill="#1C274C"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
                <div class="mt-3 w-full">
                  <hr class="h-2 border-gray-200" />
                </div>

                <slot />
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
<script setup></script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=DM Sans");
@import url("https://fonts.googleapis.com/css?family=Ubuntu");

.title {
  font-family: "Ubuntu";
  font-size: 16px;
  font-weight: 700;
  color: #343c6a;
}
</style>
