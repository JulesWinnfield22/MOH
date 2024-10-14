<script setup>
import Button from '@/components/Button.vue';
import DefaultPage from '@/components/DefaultPage.vue';
import Dropdown from '@/components/Dropdown.vue';
import Table from '@/components/Table.vue';
import TableRowSkeleton from '@/skeletons/TableRowSkeleton.vue';
import { ref } from 'vue';
import icons from '@/utils/icons';
import RolesDataProvider from '../components/RolesDataProvider.vue';
</script>
<template>
  <DefaultPage placeholder="Search Roles">
    <template #more>
  <div class="flex gap-2 justify-end items-center">
        <Button
          @click="$router.push('/add_role')"
          type="primary"
          class="flex items-center gap-2"
        >
          <i v-html="icons.plus" />
          Add Roles
        </Button>
      </div>
    </template>
    <template v-slot="{}">
      <RolesDataProvider :search="search" v-slot="{ roles, pending }">
        <Table
          :pending="pending"
          :headers="{
            head: ['Role Name', 'Role Description', 'actions'],
            row: ['roleName', 'roleDescription'],
          }"
          :Fallback="TableRowSkeleton"
          :rows="roles"
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
    </template>
  </DefaultPage>
</template>
