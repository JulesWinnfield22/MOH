<script setup>
import { ModalParent, closeModal, openModal } from '@/modals';
import Attachement from '@/features/reqeusts/components/AttachmetnCertificate.vue'
import InsuredAttachemtsDataProvider from '../components/InsuredAttachemtsDataProvider.vue'
import FormLoading from '@/components/FormLoading.vue';
import FormParent from '@/components/FormParent.vue';
import TableWrapper from '@/components/TableWrapper.vue';

function openAttachment(attachement) {
  console.log('sdf  ')
  openModal('InsuredAttachemetns', {
    attachment: attachement
  })
}

</script>
<template>
  <ModalParent class="overflow-y-scroll flex justify-end bg-black/50 h-full inset-0" v-slot="{ modal }" name="AttachementCertificate">
    <FormParent title="Attachements" class="w-[60rem]">
      <button class="absolute z-50 top-2 right-1 border ml-auto bg-white w-10 h-10 rounded-full" @click="closeModal()">
        <h-icon name="fa-times" />
      </button>
      <InsuredAttachemtsDataProvider :insuredUuid="modal.data?.insuredUuid" v-slot="{ beneficiaries, attachements, pending }">
        <FormLoading v-if="pending"
        ></FormLoading>
        <TableWrapper
          v-else
          :showPagination="false"
          :headers="{
            head: ['File Name', 'Date', 'modify'],
            row: ['fileName', 'createdAt']
          }"
          :rows="attachements || []"
        >
        <template #button="{ row }">
            <slot name="router" :row="row">
              <button class="text-primary" @click="openAttachment(row)">view</button>
            </slot>
          </template>
        </TableWrapper>
        <div class="bg-inherit z-10 h-12 p-2 border-b text-xl font-semibold">
          Beneficiaries
        </div> 
        <TableWrapper
          v-if="!pending"
          :showPagination="false"
          :headers="{
            head: ['full Name', 'relationship', 'share'],
            row: ['fullName', 'relationship', 'sh']
          }"
          :rows="beneficiaries?.length ? beneficiaries.reduce((state, payload) => {
            payload.sh = `${payload.share}%`
            state.push(payload)
            return state
          }, []) : []"
        >
        <template #button="{ row }">
            <slot name="router" :row="row">
              <button class="text-primary" @click="openAttachment(row)">view</button>
            </slot>
          </template>
        </TableWrapper>
      </InsuredAttachemtsDataProvider>
    </FormParent>
  </ModalParent>
</template>