<script setup>
import { useRoute } from 'vue-router';
import ClaimDetailDataProvider from '@/features/claims/components/ClaimDetailDataProvider.vue'
import ClaimDetailComponent from '../components/ClaimDetailComponent.vue'
import TableWrapper from '@/components/TableWrapper.vue';
import { openModal } from '@/modals';
import DetailClaim from '@/features/claims/components/DetailClaim.vue'

const route = useRoute()

const id = route.params.id

function openAttachment(attachement) {
  openModal('Attachment', {
    attachment: attachement
  })
}

function authorizeClaim(id, authorize) {
  console.log(id)
  openModal("ClaimComment", null,
    res => {
      if (res) {
        openModal('Confirmation', {
          title: 'Authorize Claim',
          message: 'Are you sure you wnat to authorize this claim?'
        }, confirmed => {
          if (confirmed) {
            authorize({
              claimUuid: id,
              comment: res.remark
            })
          }
        })
      }
    })
}

function denyClaim(id, deny) {
  console.log(id)
  openModal("ClaimComment", null,
    res => {
      if (res) {
        openModal('Confirmation', {
          message: 'Are you sure you wnat to decline this claim?'
        }, confirmed => {
          if (confirmed) {
            deny({
              id,
              comment: res.remark
            })
          }
        })
      }
    })
}

</script>
<template>
  <DetailClaim>
    <template #actions="{ authorize, deny, details }">
      {{ console.log(details?.details?.claimUuid, 'this is it') }}
      <button v-if="details?.details?.approvedByStatus == 'Approved' && details?.details?.authorizedByStatus == 'Pending'"
        @click="() => authorizeClaim(details?.details.claimUuid, authorize)"
        class="h-8 bg-primary px-4 rounded-md">Authorize</button>
      <button v-if="details?.details?.approvedByStatus == 'Approved' && details?.details?.authorizedByStatus == 'Pending'"
        @click="() => denyClaim(details?.details?.claimUuid, deny)"
        class="h-8 px-4 rounded-md bg-red-400">Decline</button>
    </template>
  </DetailClaim>
</template>