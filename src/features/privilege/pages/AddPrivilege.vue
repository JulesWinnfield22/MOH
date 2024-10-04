<script setup>
import { useApiRequest } from '@/composables/useApiRequest';
import { usePrivileges } from '../store/PrivilegeStore';
import { useForm } from '@/new_form_builder/useForm';
import { createPermission } from '../api/PrivilegesApi';
import { toasted } from '@/utils/utils';
import NewFormParent from '@/components/components/NewFormParent.vue';
import Button from '@/components/Button.vue';
import PrivilegeForm from '../components/form/PrivilegeForm.vue';

const req = useApiRequest();
const privilegesStore = usePrivileges();

const { submit } = useForm('privilegeForm');
function create({ values, reset }) {
  req.send(
    () => createPermission(values),
    (res) => {
      if (res.success) {
        privilegesStore.add(res.data);
        reset();
      }
      toasted(res.success, 'Privilege Created Successfully', res.error);
    }
  );
}
</script>
<template>
  <NewFormParent size="xl" title="Add Privileges">
    <PrivilegeForm />
    <template #bottom>
      <div class="flex justify-end p-2 px-4">
        <Button
          class="flex items-center gap-3"
          :pending="req.pending.value"
          type="primary"
          @click.prevent="submit(create)"
        >
          Add Privilege
        </Button>
      </div>
    </template>
  </NewFormParent>
</template>
