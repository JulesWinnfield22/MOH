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
      name="privilege"
      validation="required"
      label="Privilege"
      placeholder="privilege"
      :value="privilege?.['privilege'] || ''"
    />
    <Input
      name="privilegeDescription"
      validation="required"
      label="Privilege Description"
      placeholder="Description"
      :value="privilege?.['privilegeDescription'] || ''"
    />
    <Select
      :value="privilege?.['status'] || ''"
      name="status"
      label="Status"
      validation="required"
      :options="['Active', 'Disabled', 'Pending']"
    />
    <SelectMultiple
      label="Methods"
      validation="requiredMultipleSelect"
      name="methods"
      :value="privilege?.['methods']"
      :options="['GET', 'POST', 'PATCH', 'DELETE', 'PUT']"
    />
    <FormSubmitButton
      class="col-span-2"
      @click.prevent="submit(submitPrivilage)"
      :btn-text="btnText"
    />
  </FormLayout>
</template>