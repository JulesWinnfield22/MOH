<script setup>
import { useForm } from '@/new_form_builder/useForm';
import { useRoles } from '../store/rolestore';
import { useApiRequest } from '@/composables/useApiRequest';
import { toasted } from '@/utils/utils';
import NewFormParent from '@/components/components/NewFormParent.vue';
import PrivilegeDataProvider from '../../privilege/components/PrevilegeDataProvider.vue';
import Roleform from '../components/form/Roleform.vue';
import { craeteRole } from '../api/rolesApi';
import Button from '@/components/Button.vue';

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
    <PrivilegeDataProvider :prePage="500" v-slot="{ privileges, pending }">
      <Roleform v-if="!pending" :privileges="privileges" />
      <p v-else>Loading...</p>
    </PrivilegeDataProvider>
    <template #bottom>
      <div class="flex items-center justify-end">
        <Button
          :pending="req.pending.value"
          @click.prevent="submit(create)"
          type="primary"
          class="gap-2 m-2 justify-center"
        >
          Add Role
        </Button>
      </div>
    </template>
  </NewFormParent>
</template>
