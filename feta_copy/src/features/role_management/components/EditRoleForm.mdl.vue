<script setup>
import FormModal from '@/components/FormModal.vue';
import EditRoleForm from './form/EditRoleForm.vue';


</script>
<template>
  <FormModal v-slot="{ modal }" name="EditRoleForm">
    <EditRoleForm
      :role="modal.data?.role"
    />
  </FormModal>
</template>