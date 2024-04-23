<script setup>
  import TableWrapper from '@/components/TableWrapper.vue';
  import FeaturesPage from '@com/FeaturesPage.vue';
  import UsersDataProvider from '@users/components/UsersDataProvider.vue';
  import TableRowSkeleton from '@skl/TableRowSkeleton.vue'
  import { openModal } from '@/modals';
  import { useRoute } from 'vue-router';
  import { UserType } from '@/utils/enums';
  import { ref } from 'vue'
  
  function formatUsers(users = []) {
    if(users.length == 0) return []
    return users.reduce((state, payload) => {
      payload.fullname = payload.firstName + ' ' + payload?.fatherName + ' ' + payload?.grandFatherName
      state.push(payload)
      return state
    }, [])
  }

  const route = useRoute()

  function removeUser(id, remove) {
    openModal('Confirmation', {
      message: 'Are you sure you want to delete this user?'
    }, res => {
      if(res) {
        remove(id)
      }
    })
  }

  const type = ref(UserType.INSURANCE)
</script>
<template>
  <FeaturesPage btn-text="Add User" @add="openModal('AddUserForm')">
    <template #action>
      <div class="flex-1 flex justify-end">
        <div class="flex gap-2 items-center">
          <p class="text-sm">User Type</p>
          <select class="border rounded h-10 px-2 bg-transparent" v-model="type">
            <option :key=name v-for="name in Object.values(UserType)">{{ name }}</option>
          </select>
        </div>
      </div>
    </template>
    <template #default="{ perPage, search, status }">
      <UsersDataProvider :user-type="type" :perPage="perPage" :search="search" v-slot="{ remove, users, pending }">
        <TableWrapper
          :action-hide="route.path"
          @action:delete="row => removeUser(row.userUuid, remove)"
          @action:edit="(user) => openModal('EditUserForm', {user})"
          :pending="pending"
          :Fallback="TableRowSkeleton"
          :headers="{
            head: ['fullname', 'Email', 'mobile Phone', 'user status', 'role name', 'user Type', 'modify'],
            row: ['fullname', 'email', 'mobilePhone', 'userStatus', 'roleName', 'userType']
          }"
          :rows="formatUsers(users)"
        />
      </UsersDataProvider>
    </template>
  </FeaturesPage>
</template>