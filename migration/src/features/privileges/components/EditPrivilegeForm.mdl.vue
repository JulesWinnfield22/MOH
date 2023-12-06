<script setup>
import FormModal from '@/components/FormModal.vue';
import EditPrivilageForm from './form/EditPrivilageForm.vue';
</script>
<template>
  <FormModal v-slot="{ modal }" name="EditPrivilegeForm">
    <EditPrivilageForm
      :privilege="modal.data?.privilege"
    />
  </FormModal>
</template>