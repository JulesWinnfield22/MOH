<script setup>
import FormLayout from '@/components/FormLayout.vue';
import FormSubmitButton from '@/components/FormSubmitButton.vue';
import { Input, Textarea, InputFile } from '@/components/form_elements';

const props = defineProps({
  pending: {
    type: Boolean,
    default: false
  },
  attachemetn: {
    type: String
  },
  btnText: {
    required: true,
    type: String
  },
  onSubmit: {
    required: true,
    type: Function
  },
})

function submitForm({values}) {
  props.onSubmit(values)
}
</script>

<template>
  <FormLayout v-slot="{ submit }">
    <Input
      name="fileNames"
      label="File Name"
      placeholder="file name"
      validation="required"
      />
    <InputFile
      name="file"
      validation="required"
      label="Attachement"
      placeholder="Add Attachement"
    />
    <FormSubmitButton
      class="col-span-2"
      :btn-text="btnText"
      :pending="pending"
      @click.prevent="submit(submitForm)"
    />
  </FormLayout>
</template>