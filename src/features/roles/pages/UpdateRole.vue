<script setup>
import { useForm } from '@/new_form_builder/useForm';
import { useRoles } from '../store/rolestore';
import { useRoute } from 'vue-router';
import { useApiRequest } from '@/composables/useApiRequest';
import { getRoleById, updateByRoleId } from '../api/rolesApi';
import { toasted } from '@/utils/utils';
import NewFormParent from '@/components/components/NewFormParent.vue';
import { ref } from 'vue';
import icons from '@/utils/icons';
import Button from '@/components/Button.vue';
import Roleform from '../components/form/Roleform.vue';

const { submit } = useForm('roleForm');
const roleStore = useRoles();

const route = useRoute();
const roleUuid = route.params.roleUuid;

const role = ref(roleStore.roles.find((el) => el.roleUuid == roleUuid) || {});
const req = useApiRequest();
const updateReq = useApiRequest();
console.log(role);
if (!Object.keys(role.value).length) {
  req.send(
    () => getRoleById(roleUuid),
    (res) => {
      if (res.success) {
        role.value = res.data;
      }
    }
  );
  console.log(role);
}

function update({ values }) {
  updateReq.send(
    () => updateByRoleId(roleUuid, values),
    (res) => {
      toasted(res.success, 'Successfully Updated', res.error);
      if (res.success) {
        roleStore.update(roleUuid, { ...role, ...values });
      }
    }
  );
}
</script>
<template>
  <NewFormParent size="xl" title="Update Roles"
    >{{ console.log(role) }}
    <Roleform :privileges="role?.privileges" :roles="role" />

    <template #bottom>
      <div class="flex justify-end p-2 px-4">
        <Button
          class="flex items-center gap-3 bg-primary"
          :pending="updateReq.pending.value"
          type="primary"
          @click.prevent="submit(update)"
        >
          Update Privilege
        </Button>
      </div>
    </template>
  </NewFormParent>
</template>
