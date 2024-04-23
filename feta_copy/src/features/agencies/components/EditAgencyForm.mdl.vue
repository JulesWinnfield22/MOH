<script setup>
import FormModal from '@/components/FormModal.vue';
import EditAgencyForm from './form/EditAgencyForm.vue';


</script>
<template>
  <FormModal v-slot="{ modal }" name="EditAgencyForm">
    <EditAgencyForm
      :agency="modal.data?.agency"
      :filter="modal.data?.filter"
    >
    </EditAgencyForm>
  </FormModal>
</template>