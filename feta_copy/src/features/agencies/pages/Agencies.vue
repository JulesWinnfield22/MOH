<script setup>
  import FeaturesPage from '@/components/FeaturesPage.vue';
  import TableWrapper from '@/components/TableWrapper.vue';
  import { openModal } from '@/modals';
  import TableRowSkeleton from '@/skeletons/TableRowSkeleton.vue';
  import AgenciesDataProvider from '@agencies/components/AgenciesDataProvider.vue'
  import { useRoute } from 'vue-router';

  const route = useRoute()

  function removeAgency(id, remove) {
    openModal('Confirmation', {
      message: 'Are you sure you want to delete this agency?'
    }, res => {
      if(res) remove(id)
    })
  }

  function suspendAgency(id, data, suspend) {
    openModal('Confirmation', {
      message: 'Are you sure you want to suspend this agency?'
    }, res => {
      if(res) suspend(id, data)
    })
  }
</script>
<template>
  <FeaturesPage v-slot="{ perPage, search }" btnText="Add Agency" @add="openModal('AddAgencyForm')">
    <AgenciesDataProvider :per-page="perPage" :search="search" v-slot="{ next, previous, agencies, pending, removeAgency: remove, suspend }"> 
      <TableWrapper
        :actionHide="route.path"
        :pending="pending"
        :Fallback="TableRowSkeleton"
        @action:delete="(row) => removeAgency(row.agencyUuid, remove)"
        @action:suspend="(row) => suspendAgency(row.agencyUuid, {...row, status: 'Disabled'}, suspend)"
        @action:edit="row => openModal('EditAgencyForm', {agency: row})"
        :headers="{
          head: ['name', 'address', 'description', 'phone', 'modify'],
          row: ['agencyName', 'address', 'description', 'telephone']
        }"
        :rows="agencies?.length && agencies.reduce((state, payload) => {
          payload.address = `${payload?.address1} - ${payload?.address2} - ${payload?.address3}`
          state.push(payload)
          return state
        }, [])" 
      />
    </AgenciesDataProvider>
  </FeaturesPage>
</template>