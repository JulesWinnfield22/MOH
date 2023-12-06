<script setup>
  import TableWrapper from '@com/TableWrapper.vue';
  import FeaturesPage from '@com/FeaturesPage.vue'
  import RoelsDataProvider from '@roles/components/RoelsDataProvider.vue'
  import TableRowSkeleton from '@skl/TableRowSkeleton.vue';
  import { openModal } from '@/modals';

  function formatRoles(roles) {
    console.log(roles)
    if(!roles || roles.lenght == 0) return []

    return roles.reduce((state, payload) => {
      payload.privis = payload.privileges.reduce((state, {privilege}, idx) => {
        state += privilege
        if(idx != payload.privileges.length - 1) {
          state += ', '
        }
        return state
      }, '')
      state.push(payload)
      return state
    }, []) 
  }
</script>
<template>
  <FeaturesPage @add="openModal('AddRoleForm')" v-slot="{ status }" >
    <RoelsDataProvider v-slot="{ roles, pending }" :status="status">
      <TableWrapper
        @action:edit="(role) => openModal('EditRoleForm', {role})"
        :pending="pending"
        :Fallback="TableRowSkeleton"
        :headers="{
          head: ['role', 'privilages', 'role description', 'modify'],
          row: ['role', 'privis', 'roleDescription']    
        }"
        :rows="formatRoles(roles)"
      />
    </RoelsDataProvider>
  </FeaturesPage>
</template>