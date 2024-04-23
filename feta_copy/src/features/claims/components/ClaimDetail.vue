<script setup>
import { useRoute } from 'vue-router';
import { openModal } from '@/modals';
import DetailClaim from '@/features/claims/components/DetailClaim.vue'
const route = useRoute()

const id = route.params.id

function openAttachment(attachement) {
  openModal('Attachment', {
    attachment: attachement
  })
}

function reviewClaim(id, review) {
  openModal(
    'ClaimComment', null, 
    res => {
      if(!res) return
      console.log(res)
      openModal("Confirmation", {
        message: 'Are you sure you have reviewed this claim?'
      }, confirmed => {
        if(confirmed) {
          console.log(id)
          review({
            claimUuid: id,
            comment: res.remark
          })
        }
      })
    }
  )
}

function denyClaim(id, deny) {
  openModal("ClaimComment", null,
    res => {
      if (res) {
        openModal('Confirmation', {
          message: 'Are you sure you wnat to deny this claim?'
        }, confirmed => {
          if(confirmed) {
            deny({
              id,
              comment: res.remark,
            })
          }
        })
      }
    }
  )
}

</script>
<template>
  <DetailClaim :id="id">
    <template #actions="{ review, deny, details }">
      <button v-if="details?.details?.preparedByAgencyStatus == 'Requested' && details?.details?.reviewedByStatus == 'Pending'" @click="() => reviewClaim(details?.details.claimUuid, review)" class="h-8 bg-primary px-4 rounded-md">Request Approval</button>
      <button v-if="details?.details?.preparedByAgencyStatus == 'Requested' && details?.details?.reviewedByStatus == 'Pending'" @click="() => denyClaim(details?.details?.claimUuid, deny)" class="h-8 px-4 rounded-md bg-red-400">Decline</button>
    </template>
  </DetailClaim>
</template>