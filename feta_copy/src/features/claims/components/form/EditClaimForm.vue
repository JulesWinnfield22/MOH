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
import FormLayout from '@/components/FormLayout.vue';
import { createClaim as createC } from '@/features/claims/api/agencyApi'
import FormSubmitButton from '@/components/FormSubmitButton.vue';
import { Textarea } from '@/components/form_elements';
import { registerClaim } from '../../api/claimsApi';

const props = defineProps({
  insuredUuid: {
    type: String,
  },
  claim: {
    required: true,
    type: Object
  }
})

const req = useApiRequest()
const claimReq = useApiRequest()

function submit(values) {
  console.log(values)
  req.send(
    () => createBenefit(values),
    res => {
      toasted(res.success, 'Succsfuly Created', 'Could Create Try again')
    }
  )  
}

function createClaim() {
  openModal('Confirmation', {
    title: 'Register Claim',
    message: 'Are you Sure You want to register this claim?'
  }, (res) => {
    if(res) {
      claimReq.send(
        () => registerClaim(props.claim.claimUuid),
        res => {
          toasted(res.success, 'Registered Succesfully.', 'Couldnt Registered Claim. Try Again.')
        }
      )
    }
  })
}
</script>
<template>
  <ClaimFormDataProvider :claimUuid="claim.claimUuid" :insuredPersonUuid="insuredUuid" v-slot="{ pending, claimUuid, claimCategoreis, claimTypes, claimDetail }">
    <div class="flex flex-col gap-4">
      <FormParent title="Particulars of the Claim">
        <div class="border-b pb-2">
          <button @click="openModal('AddAttachementForm', props.claim.claimUuid)" class="ml-auto text-white flex items-center rounded-md text-sm bg-primary self-start">
            <div class="w-8 h-8 flex justify-center items-center">
              <BaseIcon :size="16" :path="mdiAttachment" />
            </div>
            <p class="pr-2">Add Attachement</p>
          </button>
        </div>
        <ClaimForm
          :claim="claim"
          :show-selected-service="true"
          v-if="!pending"
          :pending="req.pending.value"
          :categories="claimCategoreis"
          :selectedClaims="claimTypes"
          :insuredDetail="claimDetail"
          :on-submit="(values) => submit({...values, claimUuid: claim.claimUuid})"
          btn-text="Edit"
        />
        <FormLayout v-if="!pending" v-slot="{ submit }">
          <Textarea
            label="Brief Description Of Incident"
            name="comment"
            placeholder="write your description here..."
          />
          <FormSubmitButton
            @click.prevent="submit(createClaim)"
            class="col-span-2"
            :pending="claimReq.pending.value"
            btn-text="Register Claim"
          />
        </FormLayout>
        <FormLoading v-if="pending"/>
      </FormParent>
    </div>
  </ClaimFormDataProvider>
</template>