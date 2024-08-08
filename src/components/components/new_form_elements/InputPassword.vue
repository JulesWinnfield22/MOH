<script setup>
import { ref } from 'vue'
import InputIcon from '../InputIcon.vue'
import Input from './Input.vue'

const props = defineProps({
  attributes: {
    type: Object,
  },
})

const text = ref(props.attributes?.type == 'text')

function toggleType() {
  text.value = !text.value
}
</script>

<template>
  <Input
    :attributes="{
      ...attributes,
      type: text ? 'text' : 'password',
    }"
  >
    <template #left>
      <InputIcon
        :icon="text ? mdiEyeOutline : mdiEyeOffOutline"
        @click="toggleType"
      />
      <!-- <h-icon  :name="text ? 'bi-eye-fill': 'bi-eye-slash'" /> -->
    </template>
  </Input>
</template>
