<script setup>
import FeaturesPage from '@/components/FeaturesPage.vue';
import TableWrapper from '@/components/TableWrapper.vue';
import ReviewedClaimDataProvider from '@/features/claims/components/ReviewedClaimDataProvider.vue'  
import { openModal } from '@customizer/modal-x';
import TableRowSkeleton from '@/skeletons/TableRowSkeleton.vue';
import { addFullname } from '@/utils/utils'
import { useRouter } from 'vue-router';
import ClaimPage from '../components/ClaimPage.vue';

const router = useRouter()

</script>
<template>
  <ClaimPage 
  :exception="{
    head: ['agency phone'],
    row: ['agencyPhone']
  }"
  :headers="{
    head: ['Claim number'],
    row: ['claimNumber']
  }" :DataProvider="ReviewedClaimDataProvider">
    <template #actions="{ row }">
      <button class="text-primary" @click="() => router.push(`/claim_detail/${row.claimUuid}`, deny)">
        view
      </button>
    </template>
  </ClaimPage>
</template>