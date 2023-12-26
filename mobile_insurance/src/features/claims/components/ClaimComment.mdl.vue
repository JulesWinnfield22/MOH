<script setup>
import { ModalParent, closeModal } from '@customizer/modal-x';
import { Textarea } from '@com/form_elements'
import FormLayout from '@/components/FormLayout.vue';
import FormSubmitButton from '@/components/FormSubmitButton.vue';

  function submitCommect({ values }) {
    closeModal(values)
  }
</script>
<template>
  <ModalParent class="inset-0 flex justify-center items-center bg-black/50" name="ClaimComment">
    <FormLayout class="w-[25rem] p-2 rounded-md bg-white" v-slot="{ submit }">
      <p class="font-medium text-lg">Add Remark</p>
      <Textarea
        class="col-span-2"
        name="remark"
        label="Remark"
        placeholder="Remark"
      />
      <FormSubmitButton
        class="col-span-2"
        btn-text="Remark"
        @click.prevent="submit(submitCommect)"
      />
    </FormLayout>
  </ModalParent>
</template>