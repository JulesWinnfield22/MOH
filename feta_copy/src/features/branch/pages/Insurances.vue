<script setup>
  import FeaturesPage from '@com/FeaturesPage.vue';
  import BranchesDataProvider from '../components/BranchesDataProvider.vue';
  import TableWrapper from '@/components/TableWrapper.vue';
  import { useRoute } from 'vue-router'
  import { openModal } from '@/modals';
  import TableRowSkeleton from '@/skeletons/TableRowSkeleton.vue';

  const route = useRoute()

  function removeBranch(id, remove) {
    openModal('Confirmation', {message: 'Are you sure you wnat to delete this branch?'}, (res) => {
      if(res) {
        remove(id)
      }
    })
  }

</script>
<template>
  <FeaturesPage v-slot="{ search, perPage }" btn-text="Add Branch">
    <BranchesDataProvider :search="search" :perPage="perPage" v-slot="{ branches, pending, removeBranch: remove }">
      <TableWrapper
        :Fallback="TableRowSkeleton"
        :action-hide="route.path"
        @action:edit="(row) => openModal('EditBranchForm', {branch: row})"
        @action:delete="(row) => removeBranch(row?.insuranceUuid, remove)"
        :pending="pending"
        :headers="{
          head: ['insuranceName', 'branch', 'address', 'description', 'Code', 'modify'],
          row: ['insuranceName', 'branch', 'address', 'description', 'code']
        }"
        :rows="branches?.length && branches.reduce((state, payload) => {
          payload.address = `${payload?.address1} - ${payload?.address2} - ${payload?.address3}`
          state.push(payload)
          return state
        }, [])"
      />
    </BranchesDataProvider>
  </FeaturesPage>
</template>