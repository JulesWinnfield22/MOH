<script setup>
import FormModal from '@/components/FormModal.vue';
import EditUserForm from './forms/EditUserForm.vue';
</script>
<template>
  <FormModal v-slot="{ modal }" name="EditUserForm">
    <EditUserForm
      :user="modal.data.user"
    ></EditUserForm>
  </FormModal>
</template>