<script setup>
import TableWrapper from '@com/TableWrapper.vue';
import TableRowSkeleton from '@skl/TableRowSkeleton.vue';
import FeaturesPage from '@com/FeaturesPage.vue';
import PrivilagesDataProvider from '@privilege/components/PrivilagesDataProvider.vue'
import { openModal } from '@/modals';

</script>
<template>
  <FeaturesPage @add="openModal('AddPrivilageForm')" v-slot="{ status }">
    <PrivilagesDataProvider v-slot="{ response, pending }" :status="status"> 
      <TableWrapper
        @action:edit="(privilege) => openModal('EditPrivilegeForm', {privilege})"
        :pending="pending"
        :Fallback="TableRowSkeleton"
        :headers="{
          head: ['privilege', 'Description', 'methods', 'modify'],
          row: ['privilege', 'privilegeDescription', 'httpMethods']  
        }"
        :rows="response?.length ? response.reduce((state, payload) => {
          payload.httpMethods = payload.methods.join(', ')
          state.push(payload)
          return state
        }, []) : []"
      />
    </PrivilagesDataProvider>
  </FeaturesPage>
</template>