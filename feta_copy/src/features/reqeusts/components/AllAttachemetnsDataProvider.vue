<script setup>
import { getBundleAttachement } from '@/features/reqeusts/api/requestsApi'
import { useApiRequest } from '@/composables/useApiRequest';
import { useAttachemtns } from '@/features/reqeusts/store/attachementsStore'

const attachementStore = useAttachemtns()

const props = defineProps({
  id: {
    required: true,
  }
})

const getAttachementsReq = useApiRequest()

function getAttachement() {
  getAttachementsReq.send(
    () => getBundleAttachement(props.id),
    res => {
      console.log(res)
      if(res.success) {
        attachementStore.attachments = res.data
      }
    }
  )
}

if(!attachementStore.attachments.length)
  getAttachement()
</script>
<template>
  <slot
    :attachements="attachementStore.attachments"
    :pending="getAttachementsReq.pending.value"
  />
</template>