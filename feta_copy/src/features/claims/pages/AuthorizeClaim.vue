<script setup>
import FeaturesPage from '@/components/FeaturesPage.vue';
import TableWrapper from '@/components/TableWrapper.vue';
import AuthorizeClaimsDataProvider from '@/features/claims/components/AuthorizeClaimsDataProvider.vue'  
import { openModal } from '@/modals';
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
  <ClaimPage :DataProvider="AuthorizeClaimsDataProvider">
    <template #actions="{ row }">
      <button class="text-primary" @click="() => router.push(`/authorize_claim_detail/${row.claimUuid}`, deny)">
        view
      </button>
    </template>
  </ClaimPage>
  
</template>