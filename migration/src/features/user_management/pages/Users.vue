<script setup>
  import TableWrapper from '@/components/TableWrapper.vue';
  import FeaturesPage from '@com/FeaturesPage.vue';
  import UsersDataProvider from '@users/components/UsersDataProvider.vue';
  import TableRowSkeleton from '@skl/TableRowSkeleton.vue'
  import { openModal } from '@/modals';

  function formatUsers(users = []) {
    if(users.length == 0) return []
    return users.reduce((state, payload) => {
      payload.fullname = payload.firstName + ' ' + payload?.fatherName
      state.push(payload)
      return state
    }, [])
  }
</script>
<template>
  <FeaturesPage @add="openModal('AddUserForm')" v-slot="{ perPage, search, status }">
    <UsersDataProvider :perPage="perPage" :search="search" :status="status" v-slot="{ users, pending }">
      <TableWrapper
        @action:edit="(user) => openModal('EditUserForm', {user})"
        :pending="pending"
        :Fallback="TableRowSkeleton"
        :headers="['fullname', 'gender', 'status', 'role', 'address', 'modify']"
        :rows="formatUsers(users)"
      />
    </UsersDataProvider>
  </FeaturesPage>
</template>