<script setup>
import FeaturesPage from '@/components/FeaturesPage.vue';
import TableWrapper from '@/components/TableWrapper.vue';
import PaidClaimsDataProvider from '@/features/claims/components/PaidClaimsDataProvider.vue'
import { openModal } from '@/modals';
import TableRowSkeleton from '@/skeletons/TableRowSkeleton.vue';
import { addFullname } from '@/utils/utils'
import ClaimPage from '../components/ClaimPage.vue';
import Dropdown from '@/components/Dropdown.vue';

function reviewClaim(id, review) {
  openModal('Confirmation',
    { title: 'Request Approval', message: 'are you sure you have reviewed this claim' },
    res => {
      console.log(res)
      if (res) {
        review(id)
      }
    }
  )
}

function openDetail(claim) {
  openModal('PaidClaimDetail', {
    claim
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
    head: ['payment Order Number', 'payment Voucher Number', 'Claim number'],
    row: ['paymentOrderNumber', 'paymentVoucherNumber', 'claimNumber']
  }" :DataProvider="PaidClaimsDataProvider">
    <template #actions="{ row }">
      <Dropdown top="120%" v-slot="{ setRef, toggleDropdown }">
        <button @click="toggleDropdown">
          <h-icon name="fa-ellipsis-v" />
        </button>
        <div :ref="setRef" class="w-[10rem] flex flex-col gap-1 p-2 shadow-lg">
          <button @click="openDetail(row)" class="text-white px-4 py-1 rounded-md bg-primary">View Detail</button>
          <button class="text-white px-4 py-1 rounded-md bg-primary"
            @click="() => $router.push('/payment_order_voucher/' + row.insuredPersonUuid + '/' + row.claimUuid)">
            View CPV 
          </button>
          <button class="text-white px-4 py-1 rounded-md bg-primary"
            @click="() => $router.push('/payment_order/' + row.insuredPersonUuid + '/' + row.claimUuid)">
            View CPO
          </button>
        </div>
      </Dropdown>
    </template>
  </ClaimPage>
</template>