<script setup>
  import FormSubmitButton from '@/components/FormSubmitButton.vue';
  import { ModalParent, closeModal } from '@/modals';
  import { Form, Input } from '@com/form_elements'
  import { addValidator } from '@/form_builder'
  
  function generate({ values }) {
    closeModal(values)
  }
</script>
<template>
  <ModalParent class="flex justify-center items-center inset-0 bg-black/70" v-slot="{ modal }" name="PolicyDuration"> 
    <Form v-slot="{ submit }" class="w-96 p-2 rounded-md flex gap-2 flex-col bg-white">
      <div class="bg-inherit z-10 h-12 p-2 border-b text-xl font-semibold">
        Generate Policy
      </div>
      <Input
        name="beginDate"
        type="date"
        validation="required|greaterThanToday"
        label="Effective Date"
        :value="modal.data?.['beginDate'] || ''"
      />
      <FormSubmitButton
        @click.prevent="submit(generate)"
        btn-text="Issue Policy"
      />
    </Form>
  </ModalParent>
</template>