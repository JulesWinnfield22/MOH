<script setup>
import InputParent from '../../../new_form_builder/InputParent.vue'
import InputLayout from './NewInputLayout.vue'

const props = defineProps({
  attributes: {
    type: Object,
  },
})
</script>

<template>
  <InputParent
    v-slot="{ setRef, error, value, changeValue }"
    :attributes="{ ...attributes, type: 'file' }"
  >
    <InputLayout :error="error" :label="$attrs?.label">
      <label class="flex-1 cursor-pointer flex items-center h-full px-2">
        <div class="flex gap-4 items-center">
          <div class="size-8 grid place-items-center">
            <!-- <BaseIcon :size="20" :path="mdiAttachment" /> -->
          </div>
          <p :class="[!value?.name ? 'text-text-clr font-bold' : '']">
            {{ value?.name || attributes?.placeholder }}
          </p>
          <input :ref="setRef" class="hidden">
        </div>
      </label>
    </InputLayout>
  </InputParent>
</template>

<style></style>
