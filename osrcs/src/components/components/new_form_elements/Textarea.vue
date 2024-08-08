<script setup>
import { InputParent } from '../../../new_form_builder'
import InputLayout from '../../components/new_form_elements/NewInputLayout.vue'
</script>

<template>
  <InputParent v-slot="{ setRef, error }">
    <InputLayout
      :class="`${$attrs?.class} !rounded`"
      :label="$attrs.label"
      :error="error"
    >
      <textarea
        :ref="setRef"
        class="resize-none placeholder:opacity-60 placeholder:text-text-clr h-24 m-4"
      />
      <slot name="right" />
    </InputLayout>
  </InputParent>
</template>
