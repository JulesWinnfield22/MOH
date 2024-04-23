<script setup>
import FormModal from '@/components/FormModal.vue';
import AddClaimForm from './form/AddClaimForm.vue';


</script>

<template>
  <FormModal v-slot="{ modal }" name="AddClaimForm">
    <AddClaimForm :insuredUuid="modal.data" />
  </FormModal>
</template>