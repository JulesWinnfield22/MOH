<script setup>
import FeaturesPage from '@/components/FeaturesPage.vue';
import SavedClaimsDataProvider from '../components/SavedClaimsDataProvider.vue';
import TableWrapper from '@/components/TableWrapper.vue';
import TableRowSkeleton from '@/skeletons/TableRowSkeleton.vue';
import { secondDateFormat } from '@/utils/utils';
import { openModal } from '@/modals';

</script>
<template>
  <FeaturesPage v-slot="{ search, perPage }">
    <SavedClaimsDataProvider :search="search" :perPage="perPage" v-slot="{ result, pending }">
      <TableWrapper
        :showPagination="false"
        :Fallback="TableRowSkeleton"
        :pending="pending"
        :headers="{
          head: ['full name', 'agency Name', 'passport number', 'certificate number', 'phone', 'modify'],
          row: ['fullname', 'agencyName', 'passportNumber', 'certificateNumber', 'phone',]
        }"
        :rows="result?.length ? result.reduce((state, el) => {
          el.fullname = `${el.firstName} ${el.fatherName} ${el.grandFatherName}`
          el.certificateNumber = el.certificateNumber
          el.destination = el.countryOfDestination
          el.phone = el.insuredPhone
          el.eDate = secondDateFormat(el.endDate)
          state.push(el)
          return state
        }, []) : []"
      >
        <template #button="{ row }">
          <button @click="openModal('EditClaimForm', {insuredUuid: row.insuredPersonUuid, claim: row})" class="px-2 py-1 rounded-md bg-primary text-white">Edit</button>
        </template>
      </TableWrapper>
    </SavedClaimsDataProvider>
  </FeaturesPage>
</template>