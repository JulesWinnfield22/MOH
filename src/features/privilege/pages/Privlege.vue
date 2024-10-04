<script setup>
import Button from '@/components/Button.vue';
import Table from '@/components/Table.vue';
import { useApiRequest } from '@/composables/useApiRequest';
import { removePermission } from '../api/PrivilegesApi';
import { toasted } from '@/utils/utils';
import PrivilegeDataProvider from '../components/PrevilegeDataProvider.vue';
import TableRowSkeleton from '@/skeletons/TableRowSkeleton.vue';
import icons from '@/utils/icons';
import { usePrivileges } from '../store/PrivilegeStore';
const removeReq = useApiRequest();
const privilegeStore = usePrivileges;
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
  <div class="flex flex-col gap-4 p-4">
    <div class="flex justify-end">
      <Button @click="$router.push('privileges/add_privilege')" type="primary"
        >Add New Privilages</Button
      >
    </div>
    <PrivilegeDataProvider v-slot="{ privileges, pending }">
      {{ console.log(privileges) }}
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
              v-ripple
              class="size-8 shadow-md rounded-full bg-accent flex justify-center items-center"
              @click="
                $router.push(
                  `/privileges/update_privilege/${row?.privilegeUuid}`
                )
              "
            >
              <i v-html="icons.edit" />
            </button>
            <button @click="remove(row?.privilegeUuid)">delete</button>
          </div>
        </template>
      </Table>
    </PrivilegeDataProvider>
  </div>
</template>
