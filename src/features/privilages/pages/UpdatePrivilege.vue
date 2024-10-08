<script setup>
import { useRoute } from 'vue-router';
import { usePrivileges } from '../store/privilegesStore';
import { computed, ref } from 'vue';
import { useApiRequest } from '@/composables/useApiRequest';
import { getPermissionById, updatePermission } from '../api/permissionsApi';
import PrivilegeForm from '@/features/privilages/form/PrivilegeForm.vue';
import Button from '@/components/Button.vue';
import NewFormParent from '@/components/components/NewFormParent.vue';
import icons from '@/utils/icons';
import { useForm } from '@/new_form_builder/useForm';
import { toasted } from '@/utils/utils';

const { submit } = useForm('privilegeForm');
const privilegeStore = usePrivileges();

const route = useRoute();
const privilegeUuid = route.params.privilegeUuid;

const privilege = ref(
  privilegeStore.privileges.find((el) => el.privilegeUuid == privilegeUuid) ||
    {}
);

const req = useApiRequest();
const updateReq = useApiRequest();

if (!Object.keys(privilege.value).length) {
  req.send(
    () => getPermissionById(privilegeUuid),
    (res) => {
      if (res.success) {
        privilege.value = res.data;
      }
    }
  );
}

function update({ values }) {
  updateReq.send(
    () => updatePermission(privilegeUuid, values),
    (res) => {
      toasted(res.success, 'Successfully Updated', res.error);
      if (res.success) {
        privilegeStore.update(privilegeUuid, { ...privilege, ...values });
      }
    }
  );
}
</script>
<template>
  <NewFormParent size="xl" title="Update Privileges">
    <PrivilegeForm :privilege="privilege" />
    <template #bottom>
      <div class="flex justify-end p-2 px-4">
        <Button
          class="flex items-center gap-3"
          :pending="updateReq.pending.value"
          type="primary"
          @click.prevent="submit(update)"
        >
          <i class="pb-[3px]" v-html="icons.edit" />
          Update Privilege
        </Button>
      </div>
    </template>
  </NewFormParent>
</template>
