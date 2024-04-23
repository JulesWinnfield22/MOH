<script setup>
import FormModal from '@/components/FormModal.vue'
import TableWrapper from '@/components/TableWrapper.vue';
import { ModalParent, closeModal, openModal } from '@/modals';
import AllAttachemetnsDataProvider from './AllAttachemetnsDataProvider.vue'
import { getBundleAttachement } from '@/features/reqeusts/api/requestsApi'

function openAttachment(attachement) {
  console.log(attachement)
  openModal('BundleAttachment', {
    attachement
  })
}

</script>
<template>
  <ModalParent class="p-4 inset-0 bg-black/50" v-slot="{ modal }" name="ShowAllCertificateAttachemtns">
    <AllAttachemetnsDataProvider v-slot="{ attachements }" :id="modal.data?.id">
      <div class="bg-white relative h-full rounded-md px-4 py-2">
        <p class="border-b text-lg p-2">Attachments</p>
        <button class="absolute top-1 right-1 border ml-auto bg-white w-10 h-10 rounded-full" @click="closeModal()">
          <h-icon name="fa-times" />
        </button>
        <div class="flex flex-col">
          <TableWrapper
            :showPagination="false"
            :headers="{
              head: ['File Name', 'Size', 'Date', 'modify'],
              row: ['fileName', 'fileSize', 'createdAt']
            }"
            :rows="attachements || []"
          >
          <template #button="{ row }">
              <slot name="router" :row="row">
                <button class="text-primary" @click="openAttachment(row)">view</button>
              </slot>
            </template>
          </TableWrapper>
        </div>
      </div>
    </AllAttachemetnsDataProvider>
  </ModalParent>
</template>