<script setup>
import FormLoading from '@/components/FormLoading.vue';
import { useApiRequest } from '@/composables/useApiRequest';
import { ModalParent, closeModal } from '@/modals';
import { getBundleAttachementFile } from '@/features/reqeusts/api/requestsApi'
import { getExtension, getFileType, getImageUrlFormBlob } from '@/utils/utils';
import { useAttachementCache } from '@/features/claims/store/cahceAttachement'

const props = defineProps({
  attachment: {
    type: Object,
    required: true
  }
})

const cacheStore = useAttachementCache()

const attachementRequest = useApiRequest()

if(!cacheStore.cache?.[props.attachment.fileName]) {
  attachementRequest.send(
    () => getBundleAttachementFile(props.attachment?.agencyAttachmentUuid, {
      responseType: 'blob'
    }),
    res => {
      console.log(res)
      cacheStore.cache[props.attachment.fileName] = getImageUrlFormBlob(res.data, props.attachment.filePath)
    }
  )
}
</script>
<template>
  <div class="flex w-full flex-col p-2 gap-2 rounded-md shadow-lg h-full bg-white">
    <div class="flex justify-between items-center">
      <p class="p-2 font-semibold text-lg capitalize">{{ attachment?.fileName }}</p>
      <button class="border ml-auto bg-white w-10 h-10 rounded-full" @click="closeModal()">
        <h-icon name="fa-times" />
      </button>
    </div>
    <div class="w-full h-full">
      <div class="flex h-full">
        <div class="p-4 w-full" v-if="attachementRequest.pending.value">
          <FormLoading class="m-auto" />
        </div>
        <div v-else class="w-full h-full flex justify-center items-center">
          <div class="w-full h-full" v-if="getFileType(attachment.filePath) == 'file'">
            <embed :type="`application/${getExtension(attachment.filePath)}`"  class="w-full h-full" controls :src="cacheStore.cache?.[attachment.fileName]" />
          </div>
          <div v-else class="w-[40rem] border rounded-md overflow-hidden flex flex-col">
            <img v-if="getFileType(attachment.filePath) == 'img'" class="max-w-full object-cover" :src="cacheStore.cache?.[attachment.fileName]" />
            <video v-else-if="getFileType(attachment.filePath) == 'video'" class="aspect-video" controls :src="cacheStore.cache?.[attachment.fileName]" />
          </div>
        </div>
      </div> 
    </div>
  </div>
</template>