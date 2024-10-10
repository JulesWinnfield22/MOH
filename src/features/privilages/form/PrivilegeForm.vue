<script setup>
import { Form, Input } from '@/components/new_form_elements';

const props = defineProps({
  privilege: Object,
  onSubmit: {
    type: Function,
  },
});
</script>
<template>
  <Form
    class="grid grid-cols-4 gap-4 grid-rows-3"
    :inner="false"
    id="privilegeForm"
    v-slot="{}"
  >
    <Input
      name="privilegeName"
      validation="required"
      label="Privilege Name"
      :value="privilege?.privilegeName || ''"
      :attributes="{
        placeholder: 'Enter Privilege',
      }"
    />
    <Input
      validation="required"
      class="col-span-2"
      name="privilegeDescription"
      :value="privilege?.privilegeDescription || ''"
      label="Privilege Description"
      :attributes="{
        placeholder: 'Enter Privilege description',
      }"
    />
    <Input
      :value="privilege?.category || ''"
      name="category"
      label="Privilege Category"
      validation="required"
      :attributes="{
        placeholder: 'Enter Privilege description',
      }"
    />
  </Form>
</template>
