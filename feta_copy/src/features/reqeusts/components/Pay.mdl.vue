<script setup>
import FormModal from '@/components/FormModal.vue';
import FormSubmitButton from '@/components/FormSubmitButton.vue';
import { ModalParent, closeModal, openModal } from '@/modals';
import { Form, Input } from '@com/form_elements'

function submitRecipt({ values }) {
  openModal('Confirmation', {
    title: 'Payment',
    message: 'Are you sure you want to Pay the Specified Amount?'
  }, res => {
    console.log(res)
    if(res) {
      closeModal(values)
    }
  })
}

const props = defineProps({
  filter: {
    amount: false
  }
})

var amount = import.meta.env.v_PAYMENT_AMOUNT

</script>
<template>
  <ModalParent class="flex justify-center items-center inset-0 bg-black/70" v-slot="{ modal }" name="Pay"> 
    <Form v-slot="{ submit }" class="w-96 p-2 rounded-md flex gap-2 flex-col bg-white">
      <div class="bg-inherit z-10 h-12 p-2 border-b text-xl font-semibold">
        Payment Details
      </div>
      <Input
        name="receiptNumber"
        placeholder="Receipt Number"
        validation="required"
        label="Receipt Number"
        :value="modal.data?.['receiptNumber'] || ''"
      />
      <Input
        name="receiptDate"
        type="date"
        validation="required"
        label="Receipt Date"
        :value="modal.data?.['receiptDate'] || ''"
      />

      <!-- exact: {
            args: modal.data?.amount,
            message: 'must be exactly ' + modal.data?.amount
          } -->
      <Input
        :disabled="!modal.data?.filter?.amount"
        v-if="!modal.data?.filter?.hideAmount"
        name="amount"
        placeholder="amount"
        :validation="{
          required: true,
          num: true,
        }"
        label="Amount"
        :value="modal.data?.['amount'] || amount"
      />
      <FormSubmitButton
        @click.prevent="submit(submitRecipt)"
        btn-text="Pay"
      />
    </Form>
  </ModalParent>
</template>