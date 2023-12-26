<script setup>
import { ModalParent } from '@customizer/modal-x';
import Attachement from './Attachement.vue'

</script>
<template>
  <ModalParent class="overflow-y-scroll flex justify-center p-3 bg-black/50 min-h-full inset-0" v-slot="{ modal }" name="Attachment">
    <Attachement
      :attachment="modal.data?.attachment"
    />
  </ModalParent>
</template>