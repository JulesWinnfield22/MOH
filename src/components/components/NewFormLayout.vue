<script setup>
import InputError from './InputError.vue';

const props = defineProps(['label', 'error', 'validation']);
</script>

<template>
  <div class="flex flex-col items-start gap-1">
    <div class="flex flex-col gap-1 w-full">
      <span
        :data-required="${validation}.includes('required') ? 'true' : 'false'"
        :title="label"
        class="text-sm capitalize px-1 truncate"
        v-if="label"
        >{{ label }}</span
      >
      <div
        class="focus-within:border-primary overflow-hidden border bg-base-clr border-accent text-base rounded-md min-h-11 flex"
        :class="$attrs?.class"
      >
        <slot></slot>
      </div>
    </div>
    <InputError :error="error" />
  </div>
</template>

<style>
.custom-input,
.custom-input,
.custom-input {
  border: none;
  outline: none;
  width: 100%;
  background-color: transparent;
  padding: 0 0.75rem;
  @apply text-sm;
}

textarea.custom-input {
  padding: 0.5rem;
  resize: none;
  height: 6rem;
}

.custom-input:focus {
  box-shadow: none;
}

.custom-input::placeholder {
  color: theme('colors.dark');
  opacity: 0.6;
}
</style>