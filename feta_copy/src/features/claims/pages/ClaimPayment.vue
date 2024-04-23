<script setup>
import FeaturesPage from '@/components/FeaturesPage.vue';
import TableWrapper from '@/components/TableWrapper.vue';
import ClaimPaymentDataProvider from '@/features/claims/components/ClaimPaymentDataProvider.vue'  
import { openModal } from '@/modals';
import TableRowSkeleton from '@/skeletons/TableRowSkeleton.vue';
import { addFullname } from '@/utils/utils'

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
  <FeaturesPage v-slot="{ search, perPage }">
    <ClaimPaymentDataProvider v-slot="{ pending, claims }" :search="search" :perPage="perPage">
      <TableWrapper
        :pending="pending"
        :Fallback="TableRowSkeleton"
        :headers="{
          head: ['agency name', 'fullname', 'agency phone', 'agency Polic Number', 'modify'],
          row: ['agencyName', 'fullname', 'agencyPhone', 'agencypolicyNumber']
        }"
        :rows="addFullname(claims)"
      >
        <template #button="{ row }">
        </template>
      </TableWrapper>
    </ClaimPaymentDataProvider>
  </FeaturesPage>
</template>