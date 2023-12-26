<script setup>
import FeaturesPage from '@/components/FeaturesPage.vue';
import TableWrapper from '@/components/TableWrapper.vue';
import ApprovedClaimsDataProvider from '@/features/claims/components/ApprovedClaimsDataProvider.vue'  
import { openModal } from '@customizer/modal-x';
import TableRowSkeleton from '@/skeletons/TableRowSkeleton.vue';
import { addFullname } from '@/utils/utils'
import { useRouter } from 'vue-router';
import ClaimPage from '../components/ClaimPage.vue';

const router = useRouter()

function payClaim(id, pay) {
  openModal('Pay', {
    filter: {
      hideAmount: true
    }
  }, res => {
    if(res) {
      pay(id)
    }
  })
}
</script>
<template>
  <ClaimPage :DataProvider="ApprovedClaimsDataProvider">
    <template #actions="{ row }">
      <button class="text-primary" @click="() => router.push(`/approve_claim_detail/${row.claimUuid}`, deny)">
        view
      </button>  
    </template>
  </ClaimPage>
</template>