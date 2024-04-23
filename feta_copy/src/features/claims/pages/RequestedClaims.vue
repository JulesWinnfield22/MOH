<script setup>
import FeaturesPage from '@/components/FeaturesPage.vue';
import TableWrapper from '@/components/TableWrapper.vue';
import RegisteredClaimsDataProvider from '@/features/claims/components/RegisteredClaimsDataProvider.vue'  
import { openModal } from '@/modals';
import TableRowSkeleton from '@/skeletons/TableRowSkeleton.vue';
import { addFullname } from '@/utils/utils'
import { useRouter } from 'vue-router';
import ClaimPage from '@/features/claims/components/ClaimPage.vue'

const router = useRouter()

</script>
<template>
  <ClaimPage :DataProvider="RegisteredClaimsDataProvider">
    <template #actions="{ row }">
      <button @click="router.push('/requested_claim_detail/'+row.claimUuid)" class="text-primary">View</button>
    </template>
  </ClaimPage>
</template>