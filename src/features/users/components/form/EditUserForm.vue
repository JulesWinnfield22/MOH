<script setup>
import UniversitiesDataProvider from "@/features/university/components/UniversitiesDataProvider.vue";
import RolesDataProvider from "@/features/roles/components/RolesDataProvider.vue";
import UserForm from "./UserForm.vue";
import { useApiRequest } from "@/composables/useApiRequest";
import { updateUser } from "@/features/university/api/userApi";
import { toasted } from "@/utils/utils";
import { closeModal } from "@/modals";

const props = defineProps({
  user: {
    type: Object,
    required: true,
  },
  
});

const req = useApiRequest();
function edit(values) {
  req.send(
    () => updateUser(props.user?.userUuid, values),
    (res) => {
      toasted(res.success, "Successfully Updated", res.error);
      closeModal();
    }
  );
}
</script>

<template>
  <UniversitiesDataProvider v-slot="{ pending: UniPending, universities }">
    <RolesDataProvider v-slot="{ pending: rolePending, roles }">
      {{ console.log(pending) }}
      <UserForm
        v-if="!UniPending && !rolePending"
        :pending="req.pending.value"
        :universities="universities"
        :roles="roles"
        v-bind="props"
        :onSubmit="edit"
      />
      <p v-else-if="UniPending && rolePending">Loading...</p>
    </RolesDataProvider>
  </UniversitiesDataProvider>
</template>
