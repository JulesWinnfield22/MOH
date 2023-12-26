<script setup>
import { useRoute } from 'vue-router';
import ClaimDetailDataProvider from '@/features/claims/components/ClaimDetailDataProvider.vue'
import ClaimDetailComponent from '../components/ClaimDetailComponent.vue'
import TableWrapper from '@/components/TableWrapper.vue';
import { openModal } from '@customizer/modal-x';
import DetailClaim from '@/features/claims/components/DetailClaim.vue'

function approveClaim(id, approve) {
  openModal(
    'ClaimComment', null, 
    res => {
      if(!res) return
      openModal("Confirmation",{
        message: "Are you sure you want to approve this claim?"
      },
      confirmed => {
        if(confirmed) {
          approve({
            claimUuid: id,
            comment: res?.remark
          })
        }
      })
    }
  )
       
}

function denyClaim(id, deny) {
  openModal(
    'ClaimComment', null, 
    res => {
      if(!res) return
      openModal('Confirmation', {
        message: 'Are you sure you want to decline this claim?'
      }, res => {
        if(res) {
          deny(id)
        }
      })
    }
  )
}

</script>
<template>
  <DetailClaim>
    <template #actions="{ approve, deny, details }">
      <button v-if="details?.details?.reviewedByStatus == 'Reviewed' && details?.details?.approvedByStatus == 'Pending'" @click="() => approveClaim(details?.details.claimUuid, approve)" class="h-8 bg-primary px-4 rounded-md">Approve</button>
      <button v-if="details?.details?.reviewedByStatus == 'Reviewed' && details?.details?.approvedByStatus == 'Pending'" @click="() => denyClaim(details?.details?.claimUuid, deny)" class="h-8 px-4 rounded-md bg-red-400">Decline</button>
    </template>
  </DetailClaim>
</template>