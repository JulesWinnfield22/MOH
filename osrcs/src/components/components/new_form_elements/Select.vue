<script setup>
import InputParent from '../../../new_form_builder/InputParent.vue'
import InputLayout from './NewInputLayout.vue'

const props = defineProps({
  obj: {
    type: Boolean,
    default: false,
  },
  options: {
    type: Array,
    required: true,
  },
})
</script>

<template>
  <InputParent v-slot="{ setRef, error, value, attributes, changeValue }">
    <InputLayout
      :class="`${$attrs.class} relative`"
      :error="error"
      :label="$attrs.label"
    >
      <div class="flex items-center h-full flex-1 pl-2">
        <slot name="left" />
        <select
          :ref="setRef"
          class="flex-1 text-text-clr opacity-60 h-full px-4 text-sm"
        >
          <option
            :class="[!value ? 'text-text-clr  ' : '']"
            selected
            value=""
            disabled
          >
            {{ attributes?.placeholder }}
          </option>
          <template v-if="!obj">
            <option
              v-for="option in options"
              :key="option"
              class="text-sm px-4"
              :selected="value == option"
            >
              {{ option }}
            </option>
          </template>
          <template v-else>
            <option
              v-for="option in options"
              :key="option.value"
              :selected="value == option.value"
              :value="option.value"
            >
              {{ option.label }}
            </option>
          </template>
        </select>
        <div class="absolute pointer-events-none top-0 right-0 h-full">
          <slot name="right">
            <div class="h-full ml-auto w-8 flex items-center justify-center">
              <!-- <BaseIcon :path="mdiChevronDown" /> -->
            </div>
          </slot>
        </div>
      </div>
    </InputLayout>
  </InputParent>
</template>
