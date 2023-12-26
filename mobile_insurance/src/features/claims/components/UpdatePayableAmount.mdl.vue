<script setup>
import { ModalParent, closeModal } from '@customizer/modal-x';
import { Input } from '@com/form_elements'
import FormLayout from '@/components/FormLayout.vue';
import FormSubmitButton from '@/components/FormSubmitButton.vue';
import FormParent from '@/components/FormParent.vue';

function submitPayment({ values }) {
  closeModal(values)
}
</script>
<template>
  <ModalParent class="bg-black/50 flex justify-center items-center inset-0" name="UpdatePayableAmount" v-slot="{ modal }">
    <FormLayout v-slot="{ submit }" class="w-[25rem] bg-white p-2 rounded-md" title="Update Payment Amount" >
      <div class="col-span-2 bg-inherit z-10 h-12 p-2 border-b text-xl font-semibold">
        Update Payable Amount
      </div>
        <Input
          class="col-span-2"
          name="amount"
          label="Payable Amount"
          placeholder="amount"
          :value="modal.data.amount || ''"
          :validation="{
            maxnum: {
              args: parseInt(modal.data?.defaultAmount) + 1,
            }
          }"
        />
        <FormSubmitButton
          @click.prevent="submit(submitPayment)"
          class="col-span-2"
          btnText="update"
        />
      </FormLayout>
  </ModalParent>
</template>