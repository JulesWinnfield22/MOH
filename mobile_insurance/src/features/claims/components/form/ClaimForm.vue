<script setup>
  import FormSubmitButton from '@/components/FormSubmitButton.vue';
  import {Input } from '@com/form_elements'
  import FormLayout from '@com/FormLayout.vue'

  const props = defineProps({
    btnText: {
      type: String,
      requried: true
    },
    onSubmit: {
      type: Function,
      requried: true
    },
    claim: {
      type: Object
    }
  })

  function submitClaim({ values }) {
    props.onSubmit (( props.onSubmit(values)))
  }
</script>

<template>
  <FormLayout v-slot="{ submit }">
    <Input
      name="claim"
      placeholder="claim"
      label="Claim"
      validation="required"
    />
    <FormSubmitButton
      @click.prevent="submit(submitClaim)"
      class="col-span-2"
      :btnText="btnText"
    />
  </FormLayout>
</template>