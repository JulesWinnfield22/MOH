<script setup>
import { useForm } from '@/new_form_builder/useForm';
import NewFormModal from '@/components/components/NewFormModal.vue';
import NewFormParent from '@/components/components/NewFormParent.vue';
import PrivilegeForm from '../form/PrivilegeForm.vue';
import { useApiRequest } from '@/composables/useApiRequest';
import { createPermission } from '../api/PrivilegesApi';
import { usePrivileges } from '../store/privilegesStore';
import Button from '@/components/Button.vue';
import { toasted } from '@/utils/utils';
import icons from '@/utils/icons';

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
          <i class="pb-[3px]" v-html="icons.plus" />
          Add Privilege
        </Button>
      </div>
    </template>
  </NewFormParent>
</template>
