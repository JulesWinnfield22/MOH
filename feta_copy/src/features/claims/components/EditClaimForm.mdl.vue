<script setup>
import FormModal from '@/components/FormModal.vue';
import AddClaimForm from './form/AddClaimForm.vue';
import EditClaimForm from './form/EditClaimForm.vue';


</script>

<template>
  <FormModal v-slot="{ modal }" name="EditClaimForm">
    <EditClaimForm :insuredUuid="modal.data?.insuredUuid" :claim="modal.data?.claim" />
  </FormModal>
</template>