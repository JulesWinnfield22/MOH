<script setup>
import TableWrapper from '@com/TableWrapper.vue';
import TableRowSkeleton from '@skl/TableRowSkeleton.vue';
import FeaturesPage from '@com/FeaturesPage.vue';
import PrivilagesDataProvider from '@privilege/components/PrivilagesDataProvider.vue'
import { openModal } from '@/modals';
import { useRoute } from 'vue-router';

const route = useRoute()

function removePrivilege(id, remove) {
  openModal('Confirmation', {
    message: 'Are you sure you want to delete this Privilege?'
  }, res => {
    if(res) {
      remove(id)
    }
  })
}

</script>
<template>
  <FeaturesPage btnText="Add Privileges" @add="openModal('AddPrivilageForm')" v-slot="{ perPage, search, status }">
    <PrivilagesDataProvider :search="search" :per-page="perPage" v-slot="{ response, pending, remove }" :status="status"> 
      <TableWrapper
        :action-hide="route.path"
        @action:edit="(privilege) => openModal('EditPrivilegeForm', {privilege})"
        @action:delete="(privilege) => removePrivilege(privilege.privilegeUuid, remove)"
        :pending="pending"
        :Fallback="TableRowSkeleton"
        :headers="{
          head: ['privilege', 'Description', 'Category', 'modify'],
          row: ['privilegeName', 'privilegeDescription', 'privilegeCategory']  
        }"
        :rows="response"
      />
    </PrivilagesDataProvider>
  </FeaturesPage>
</template>