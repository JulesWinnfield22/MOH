<script setup>
import FeaturesPage from '@/components/FeaturesPage.vue';
import TableWrapper from '@/components/TableWrapper.vue';
import DeclinedClaimsDataProvider from '@/features/claims/components/DeclinedClaimsDataProvider.vue'  
import { openModal } from '@/modals';
import TableRowSkeleton from '@/skeletons/TableRowSkeleton.vue';
import { addFullname } from '@/utils/utils'
import ClaimPage from '../components/ClaimPage.vue';

</script>
<template>
  <FeaturesPage v-slot="{ search }">
    <DeclinedClaimsDataProvider v-slot="{ claims, pending }" :search="search">
      <TableWrapper
        :Fallback="TableRowSkeleton"
        :pending="pending"
        :headers="{
          head: ['full name', 'certificate Number', 'passport Number', 'Policy number', 'Agency Name', 'branch Name', 'insured Phone', 'modify'],
          row: ['fullname', 'certificateNumber', 'passportNumber', 'agencyPolicyNumber', 'agencyName', 'branchName', 'insurancePhone']
        }"
        :rows="claims?.length ? claims.reduce((state, el) => {
          el.fullname = `${el.title} ${el.firstName} ${el.fatherName} ${el.grandFatherName}`
          state.push(el)
          return state
        }, []) : []"
      >
        <template #button="{ row }">
          <button @click="$router.push('/claim_detail/' + row?.claimUuid)" class="text-primary">view</button>
        </template>
      </TableWrapper>
    </DeclinedClaimsDataProvider>
  </FeaturesPage>
</template>