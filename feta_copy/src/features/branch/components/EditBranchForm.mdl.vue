<script setup>
  import FormModal from '@com/FormModal.vue'
  import EditBranchForm from './form/EditBranchForm.vue'
</script>


<template>
  <FormModal name="EditBranchForm" v-slot="{ modal }">
    <EditBranchForm
      :branch="modal.data?.branch"
    ></EditBranchForm>
  </FormModal>
</template>