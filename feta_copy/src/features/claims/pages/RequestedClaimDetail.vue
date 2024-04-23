<script setup>
import { useRoute } from 'vue-router';
import ClaimDetailDataProvider from '@/features/claims/components/ClaimDetailDataProvider.vue'
import ClaimDetailComponent from '../components/ClaimDetailComponent.vue'
import TableWrapper from '@/components/TableWrapper.vue';
import { openModal } from '@/modals';
import DetailClaim from '@/features/claims/components/DetailClaim.vue'


function registerClaim(id, register) {
  openModal('Confirmation', {
    message: 'Are you sure you want to register this claim?',
    title: 'Register Claim'
  },
    res => {
      if(res) {
        register(id)
      }
    }
  )
}

</script>
<template>
  <DetailClaim>
    <template #actions="{ register, details }">
      <button v-if="details?.details?.preparedByAgencyStatus == 'Requested' && !details?.details?.claimNumber"  @click="() => registerClaim(details?.details.claimUuid, register)" class="h-8 bg-primary px-4 rounded-md">Register</button>
    </template>
  </DetailClaim>
</template>