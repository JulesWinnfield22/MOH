<script setup>
import InputParent from '../../../new_form_builder/InputParent.vue'
import InputLayout from './NewInputLayout.vue'
</script>

<template>
  <InputParent v-slot="{ setRef, error, value, changeValue }">
    <InputLayout :error="error" :label="$attrs?.label">
      <div class="flex flex-1 text-xs ">
        <slot class="" name="left" />
        <input
          :ref="setRef"
          class="placeholder:text-text-clr placeholder:opacity-60"
        >
        <slot name="right" />
      </div>
    </InputLayout>
  </InputParent>
</template>

<style>
.custom-input:focus {
  border: 1px solid #000;
}
</style>
