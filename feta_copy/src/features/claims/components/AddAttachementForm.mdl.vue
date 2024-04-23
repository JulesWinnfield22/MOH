<script setup>
  import { ModalParent } from '@/modals'
  import ClaimAttachementForm from './form/ClaimAttachementForm.vue';
  import { useApiRequest } from '@/composables/useApiRequest';
import { addClaimAttachement } from '../api/claimAttachement';
import { toasted } from '@/utils/utils';
  
  const req = useApiRequest()

  function submitAttachment(claimUuid, values) {
    const fd = new FormData()
    fd.append('file', values.file)
    req.send(
      () => addClaimAttachement({claimUuid, fileNames: values.fileNames}, fd, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }),
      res => {
        toasted(res.success, 'Added Succesfully.', 'Couldnt Add Attachement. Try Again.')
      }
    )
  }
</script>

<template>
  <ModalParent name="AddAttachementForm" v-slot="{ modal }" class="bg-black/50 inset-0 flex justify-center items-center">
    <div class="w-[35rem] gap-2 bg-white rounded-md flex flex-col p-2">
      <p class="bg-inherit z-10 h-12 p-2 border-b text-lg font-semibold">
        Add Attachement
      </p>
      <ClaimAttachementForm
        :pending="req.pending.value"
        :on-submit="(values) => submitAttachment(modal.data, values)"
        btn-text="Add"
      />
    </div>
  </ModalParent>
</template>