<script setup>
import Table from '@/components/Table.vue';
import TableRowSkeleton from '@/skeletons/TableRowSkeleton.vue';
import { ref } from 'vue';
import Button from '@/components/Button.vue';
import icons from '@/utils/icons';
import RolesDataProvider from '../components/RolesDataProvider.vue';
const serachKey = ref('');
</script>
<template>
  <div class="flex flex-col gap-4 p-4">
    <div class="flex justify-between">
      <input
        class="rounded-lg border w-[20%] p-2 focus:outline-none focus:ring-2 focus:ring-[#21618C] placeholder-gray-500"
        placeholder="search"
        v-model="serachKey"
      />
      <Button
        class="bg-primary text-white"
        @click="$router.push('/roles/add_role')"
        >Add Role</Button
      >
    </div>

    <RolesDataProvider :search="serachKey" v-slot="{ roles, pending }">
      
      <Table
        :pending="pending"
        :headers="{
          head: ['Role Name', 'Role Description', 'actions'],
          row: ['roleName', 'roleDescription'],
        }"
        :rows="roles"
        :Fallback="TableRowSkeleton"
      >
        <template #actions="row">
          <button
            class="size-8 shadow-md rounded-full bg-accent flex justify-center items-center"
            @click="$router.push(`/update_role/${row.row?.roleUuid}`)"
          >
            <i v-html="icons.edit" />
          </button>
        </template>
      </Table>
    </RolesDataProvider>
  </div>
</template>
