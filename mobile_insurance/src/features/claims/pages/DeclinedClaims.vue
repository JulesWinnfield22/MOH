<script setup>
import FeaturesPage from '@/components/FeaturesPage.vue';
import TableWrapper from '@/components/TableWrapper.vue';
import DeclinedClaimsDataProvider from '@/features/claims/components/DeclinedClaimsDataProvider.vue'  
import { openModal } from '@customizer/modal-x';
import TableRowSkeleton from '@/skeletons/TableRowSkeleton.vue';
import { addFullname } from '@/utils/utils'
import ClaimPage from '../components/ClaimPage.vue';

</script>
<template>
  <ClaimPage :DataProvider="DeclinedClaimsDataProvider">
    <template #actions="{ row }">
      <button @click="$router.push('/decliened_claim_detail/' + row.claimUuid)" class="text-primary">
        view
      </button>
    </template>
  </ClaimPage>
</template>