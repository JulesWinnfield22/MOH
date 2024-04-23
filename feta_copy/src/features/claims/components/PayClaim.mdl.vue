<script setup>
import CloseModal from '@/components/CloseModal.vue';
import FormModal from '@/components/FormModal.vue';
import FormSubmitButton from '@/components/FormSubmitButton.vue';
import { ModalParent, closeModal, openModal } from '@/modals';
import { Form, Input } from '@com/form_elements'

function submitRecipt({ values }) {
  openModal('Confirmation', {
    title: 'Payment',
    message: 'Are you sure you want to Pay the Claim?'
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

</script>
<template>
  <ModalParent class="relative flex justify-center items-center inset-0 bg-black/70" v-slot="{ modal }" name="PayClaim"> 
    <Form v-slot="{ submit }" class="relative w-96 p-2 rounded-md flex gap-2 flex-col bg-white">
      <CloseModal />
      <div class="bg-inherit z-10 h-12 p-2 border-b text-xl font-semibold">
        Payment Details
      </div>
      <Input
        name="receiptNumber"
        placeholder="receiptNumber"
        validation="required"
        label="Payment Number"
        :value="modal.data?.['receiptNumber'] || ''"
      />
      <Input
        name="receiptDate"
        type="date"
        validation="required|lessThanOrEqualToToday"
        label="Payment Date"
        :value="modal.data?.['receiptDate'] || ''"
      />
      <Input
        name="checkNumber"
        placeholder="checkNumber"
        label="Check Number"
        :value="modal.data?.['checkNumber'] || ''"
      />
      <!-- :validation="{
          required: true,
          exactly: {
            args: modal.data?.['totalAuthorizeamount']
          }
        }" -->
      <Input
        name="amount"
        placeholder="amount"
        
        label="Amount"
        :value="modal.data?.['totalAuthorizeamount'] || ''"
      />
      <FormSubmitButton
        @click.prevent="submit(submitRecipt)"
        btn-text="Pay"
      />
    </Form>
  </ModalParent>
</template>

<!-- 

  {
          required: true,
          num: true,
          exact: {
            args: modal.data?.amount,
            message: 'must be exactly ' + modal.data?.amount
          }
        }
 -->