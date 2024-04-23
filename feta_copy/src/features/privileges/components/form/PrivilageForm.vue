<script setup>
  import FormSubmitButton from '@/components/FormSubmitButton.vue';
import FormLayout from '@com/FormLayout.vue'
  import { Input, Select, SelectMultiple } from '@com/form_elements'

  const props = defineProps({
    privilege: {
      type: Object
    },
    btnText: {
      type: String
    },
    onSubmit: {
      type: Function,
      default: f => f
    }
  })

  function submitPrivilage({ values }) {
    props.onSubmit && props.onSubmit(values)
  }
</script>

<template>
  <FormLayout v-slot="{ submit }">
    <Input
      name="privilegeName"
      validation="required"
      label="Privilege Name"
      placeholder="privilege"
      :value="privilege?.['privilegeName'] || ''"
    />
    <Input
      name="privilegeDescription"
      validation="required"
      label="Privilege Description"
      placeholder="Description"
      :value="privilege?.['privilegeDescription'] || ''"
    />
    <Input
      :value="privilege?.['privilegeCategory'] || ''"
      name="privilegeCategory"
      label="Category"
      validation="required"
      placeholder="Category"
    />
    <FormSubmitButton
      class="col-span-2"
      @click.prevent="submit(submitPrivilage)"
      :btn-text="btnText"
    />
  </FormLayout>
</template>