<script setup>
import FeaturesPage from '@/components/FeaturesPage.vue';
import TableWrapper from '@/components/TableWrapper.vue';
import InsurdDataProvider from '@/features/claims/components/InsurdDataProvider.vue'
import { openModal } from '@/modals';
import TableRowSkeleton from '@/skeletons/TableRowSkeleton.vue';
import { secondDateFormat } from '@/utils/utils';
</script>

<template>
  <FeaturesPage v-slot="{ search, perPage }">
    <InsurdDataProvider v-slot="{ insured, pending }" :search="search" :perPage="perPage">
      <TableWrapper
        :showPagination="false"
        :Fallback="TableRowSkeleton"
        :pending="pending"
        :headers="{
          head: ['full name', 'passport number', 'certificate number', 'destination', 'phone', 'end Date', 'modify'],
          row: ['fullname', 'passportNumber', 'certificateNumber', 'destination', 'phone', 'eDate']
        }"
        :rows="insured?.length ? insured.reduce((state, el) => {
          el.fullname = `${el.firstName} ${el.fatherName} ${el.grandFatherName}`
          el.certificateNumber = el.certificatePaymentNumber
          el.destination = el.countryOfDestination
          el.eDate = secondDateFormat(el.endDate)
          state.push(el)
          return state
        }, []) : []"
      >
        <template #button="{ row }">
          <button @click="openModal('AddClaimForm', row.insuredUuid)" class="px-2 py-1 rounded-md bg-primary text-white">Create</button>
        </template>
      </TableWrapper>
    </InsurdDataProvider>
  </FeaturesPage>
</template>