<script setup>
import { ModalParent } from '@/modals';
import BundleAttachement from './BundleAttachement.vue'

</script>
<template>
  <ModalParent class="bg-black/50 flex inset-0 p-4" name="BundleAttachment" v-slot="{ modal }">
    <BundleAttachement
      :attachment="modal.data?.attachement"
    />
  </ModalParent>
</template>