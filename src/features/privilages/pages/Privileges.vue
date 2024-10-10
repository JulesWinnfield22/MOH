<script setup>
import Button from '@/components/Button.vue';
import DefaultPage from '@/components/DefaultPage.vue';
import Table from '@/components/Table.vue';
import TableRowSkeleton from '@/skeletons/TableRowSkeleton.vue';
import { useApiRequest } from '@/composables/useApiRequest';
import PrivilegesDataProvider from '../components/PrivilegesDataProvider.vue';
import icons from '@/utils/icons';
import { removePermission } from '../api/PrivilegesApi';
import { toasted } from '@/utils/utils';

const removeReq = useApiRequest();

function remove(id) {
  removeReq.send(
    () => removePermission(id),
    (res) => {
      if (res.success) {
        privilegesStore.remove(id);
      }
      toasted(res.success, 'Removed Successfully', res.error);
    }
  );
}
</script>

<template>
  <DefaultPage>
    <template #more>
      <Button @click="$router.push('/add_privilege')" type="primary"
        >Add New Privilages</Button
      >
    </template>
    <PrivilegesDataProvider v-slot="{ privileges, pending }">
      <Table
        :pending="pending"
        :headers="{
          head: [
            'Previlege Name',
            'Previlege Description',
            'Category',
            'actions',
          ],
          row: ['privilegeName', 'privilegeDescription', 'category'],
        }"
        :rows="privileges"
        :Fallback="TableRowSkeleton"
      >
        <template #actions="{ row }">
          <div class="flex gap-4 items-center">
            <button
              class="size-8 shadow-md rounded-full bg-accent flex justify-center items-center"
              @click="$router.push(`/update_privilege/${row?.privilegeUuid}`)"
            >
              <i v-html="icons.edit" />
            </button>
            <button @click="remove(row?.privilegeUuid)">delete</button>
          </div>
        </template>
      </Table>
    </PrivilegesDataProvider>
  </DefaultPage>
</template>
