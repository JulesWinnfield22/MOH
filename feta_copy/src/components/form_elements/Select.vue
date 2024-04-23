<script setup>
  import {InputParent} from '@/form_builder'
  import InputLayout from './InputLayout.vue'

  defineProps({
    label: {
      type: String,
    },
    options: {
      type: Array,
      default: []
    },
    obj: {
      type: Boolean
    }
  })
</script>

<template>
  <InputParent v-slot="{ setRef, error, attrs }">

    <InputLayout :class="attrs.class + ' relative'"  :label="label" :error="error">

      <select :ref="setRef">
        <option disabled selected value="">select your option</option>
        <option v-if="!obj" :value="option" v-for="option in options">
          {{ option }}
        </option>
        <option v-else :value="option.value" v-for="option in options">
          {{ option.label }}
        </option>
      </select>
      <div class="absolute pointer-events-none top-0 right-0 h-full">
        <slot name="right">
          <div class="h-full ml-auto w-8 flex items-center justify-center">
            <h-icon name="fa-angle-down" />
          </div>
        </slot>
      </div>
    </InputLayout>
    
  </InputParent>
</template>