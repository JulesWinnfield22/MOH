<script setup>
import { Form } from './new_form_elements'

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  inner: {
    type: Boolean,
    default: true,
  },
  childrenName: {
    type: String,
  },
})
</script>

<template>
  <Form :id="id" v-slot="form" :children-name="childrenName" :inner="inner" class="grid grid-cols-2 grid-flow-row gap-6">
    <slot v-bind="form" />
  </Form>
</template>
