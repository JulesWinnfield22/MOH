<script setup>
  import { useApiRequest } from '@composable/useApiRequest'
  import { getDebitede, getDebitAdvice, getCertificateApprover } from '../api/requestsApi'
  import { allRequest } from '@/utils/utils';

  const props = defineProps({
    id: {
      type: String,
      required: true
    }
  })
  
  const debitedRequest = useApiRequest()

  debitedRequest.send(
    () => allRequest({
      debited: getDebitede(props.id),
      advice: getDebitAdvice(props.id),
      approver: getCertificateApprover(props.id)
    }),
    res => {
      console.log(res)
    }
  )
  
</script>
<template>
  <slot
    v-bind="debitedRequest.response.value"
    :pending="debitedRequest.pending.value"
    :error="debitedRequest.error.value"
  />
</template>