<script setup>
import FormParent from '@com/FormParent.vue'
import ClaimForm from './ClaimForm.vue'
import ClaimFormDataProvider from '@/features/claims/components/ClaimFormDataProvider.vue'
import FormLoading from '@/components/FormLoading.vue';
import { useApiRequest } from '@/composables/useApiRequest';
import { createBenefit } from '@/features/claims/api/claimBenefitApi.js'
import { toasted } from '@/utils/utils';
import BaseIcon from '@/views/BaseIcon.vue';
import { mdiAttachment } from '@mdi/js';
import { openModal } from '@/modals';

const props = defineProps({
  insuredUuid: {
    type: String,
    required: true
  }  
})

const req = useApiRequest()

function submit(values) {
  req.send(
    () => createBenefit(values),
    res => {
      toasted(res.success, 'Succsfuly Created', 'Could Create Try again')
    }
  )  
}
</script>
<template>
  <ClaimFormDataProvider :insuredPersonUuid="insuredUuid" v-slot="{ pending, claimUuid, claimCategoreis, claimTypes, claimDetail }">
    <FormParent class="w-[50rem]" title="Particulars of the Claim">
      <div class="border-b pb-2">
        <button @click="openModal('AddAttachementForm', claimUuid)" class="ml-auto text-white flex items-center rounded-md text-sm bg-primary self-start">
          <div class="w-8 h-8 flex justify-center items-center">
            <BaseIcon :size="16" :path="mdiAttachment" />
          </div>
          <p class="pr-2">Add Attachement</p>
        </button>
      </div>
      <ClaimForm
        v-if="!pending"
        :pending="req.pending.value"
        :categories="claimCategoreis"
        :selectedClaims="claimTypes"
        :insuredDetail="claimDetail"
        :on-submit="(values) => submit({...values, claimUuid})"
        btn-text="Add"
      />
      <FormLoading v-if="pending"/>
    </FormParent>
  </ClaimFormDataProvider>
</template>