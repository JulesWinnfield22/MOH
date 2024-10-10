<script setup>
import NewFormParent from '@/components/components/NewFormParent.vue';
import RoleForm from '../form/RoleForm.vue';
import PrivilegesDataProvider from '@/features/privilages/components/PrivilegesDataProvider.vue';
import Button from '@/components/Button.vue';
import icons from '@/utils/icons';
import { useForm } from '@/new_form_builder/useForm';
import { useRoles } from '../store/rolesStore';
import { useApiRequest } from '@/composables/useApiRequest';
import { craeteRole } from '../api/rolesApi';
import { toasted } from '@/utils/utils';

const { submit } = useForm('roleForm');
const role = useRoles();
const req = useApiRequest();

function create({ values }) {
  req.send(
    () => craeteRole(values),
    (res) => {
      if (res.success) {
        role.add(res.data);
      }
      toasted(res.success, 'Role Created', res.error);
    }
  );
}
</script>
<template>
  <NewFormParent class="!p-0" size="xl" title="Add Role">
    <PrivilegesDataProvider :pre-page="500" v-slot="{ privileges, pending }">
      <RoleForm v-if="!pending" :privileges="privileges" />
      <p v-else>Loading...</p>
    </PrivilegesDataProvider>
    <template #bottom>
      <div class="flex items-center justify-end">
        <Button
          :pending="req.pending.value"
          @click.prevent="submit(create)"
          type="primary"
          class="gap-2 m-2 flex items-center"
        >
          <i class="pb-1" v-html="icons.plus" />
          Add Role
        </Button>
      </div>
    </template>
  </NewFormParent>
</template>
