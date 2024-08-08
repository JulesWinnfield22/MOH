<script setup>
import { closeModal } from '@customizer/modal-x'
import Button from './Button.vue';
import ResponseError from './ResponseError.vue';
const props = defineProps({
  size: {
    type: String,
    default: 'md'
  },
  title: {
    required: true,
    type: String,
  },
  goBack: {
    type: Boolean,
    default: false
  },
  onGoBack: {
    type: Function
  },
  error: {
    type: String
  }
})


</script>
<template>
  <div :class="[$style[size]]" class="overflow-hidden p-4 flex flex-col justify-between gap-4 bg-white rounded-md">
    <div class="flex justify-between border-b border-text-secondary-clr/30 items-center">
      <div class="flex items-center gap-4">
        <button @click="onGoBack" v-if="goBack" class="grid place-items-center rounded-md border border-text-clr">
          <h-icon name="pr-angle-left" />
        </button>
        <p class="font-bold text-lg py-2">{{ title }}</p>
      </div>
      <div class="flex items-center gap-4">
        <slot name='right-actions'></slot>
        <button @click="closeModal">
          <h-icon scale="1.2" name="io-close-circle-outline" />
        </button>
      </div>
    </div>
    <div class="px-2 flex flex-col gap-4 form-scrollbar flex-1 py-2 overflow-auto border-b border-text-secondary-clr/30">
      <slot />
      <ResponseError :error="error" />
    </div>
    <slot name="bottom" />
  </div>
</template>

<style module>
  .md {
    width: 40rem;
    height: 100%;
  }

  .lg {
    width: 60rem;
    height: 100%;
  }

  .xl {
    width: 100%;
    height: 100%;
  }

  .xs {
    width: auto;
    height: auto;
  }
</style>

<style>
  .form-layout {
    display: grid;
  }
  .form-scrollbar::-webkit-scrollbar {
    display: block;
    width: 5px;
  }

  .form-scrollbar::-webkit-scrollbar-thumb {
    background-color: #d1c9c9;
    border-radius: 50px;
  }

</style>