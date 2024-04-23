<script setup>
import FeaturesPage from '@/components/FeaturesPage.vue';
import TableWrapper from '@/components/TableWrapper.vue';
import AuthorizedClaimDataProvider from '@/features/claims/components/AuthorizedClaimDataProvider.vue'  
import { openModal } from '@/modals';
import TableRowSkeleton from '@/skeletons/TableRowSkeleton.vue';
import { addFullname } from '@/utils/utils'
import { useRouter } from 'vue-router';
import ClaimPage from '../components/ClaimPage.vue';

function payClaim(id, totalAuthorizeamount, pay) {
  openModal('PayClaim', {
    filter: {
      hideAmount: true,
    },
    totalAuthorizeamount,
  }, res => {
    console.log(res)
    if(!res) return
    if(res) {
      pay({
        claimUuid: id,
        ...res
      })
    }
  })
}
</script>
<template>
  <ClaimPage
  :exception="{
    head: ['agency phone'],
    row: ['agencyPhone']
  }"
  :headers="{
    head: ['payment Order Number', 'Claim number'],
    row: ['paymentOrderNumber', 'claimNumber']
  }" :DataProvider="AuthorizedClaimDataProvider">
    <template #actions="{ row, pay }">
      {{ console.log(pay) }}
      <button v-if="row?.status == 'Authorized' && row?.paidByStatus == 'Pending'" class="text-white px-4 py-1 rounded-md bg-primary" @click="() => payClaim(row.claimUuid, row?.totalAuthorizeamount, pay)">
        Pay
      </button>
      <button class="text-white px-4 py-1 rounded-md bg-primary" @click="() => $router.push('/payment_order/' + row.insuredPersonUuid + '/' + row.claimUuid)">
        view PO
      </button>
    </template>
  </ClaimPage>
</template>