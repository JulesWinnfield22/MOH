<script setup>
  import { getClaimLog } from '../api/claimLogApi';
  import { useApiRequest } from '@/composables/useApiRequest'

  const props = defineProps({
    id: {
      type: String,
      required: true
    }
  })

  const req = useApiRequest()

  req.send(
    () => getClaimLog(props.id),
    res => {
      
    }
  )
</script>

<template>
  <slot
    :logs="req.response.value"
    :pending="req.pending.value"
  />
</template>