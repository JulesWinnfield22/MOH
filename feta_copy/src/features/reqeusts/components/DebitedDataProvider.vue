<script setup>
  import { useApiRequest } from '@composable/useApiRequest'
  import { getDebitede, getIssuedPayed } from '../api/requestsApi'
  import { debitedStore } from '@/features/reqeusts/store/debitedStore.js'
  import { payInsured } from '@/features/reqeusts/api/requestsApi'
import { toasted } from '@/utils/utils';

  const debitedStr = debitedStore()

  const props = defineProps({
    id: {
      type: String,
      required: true
    }
  })
  
  const debitedRequest = useApiRequest()
  const payRequest = useApiRequest()

  function fetchMore() {
    debitedRequest.send(
      () => getDebitede(props.id),
      res => {
        if(res.success) {
          debitedStr.debited = res.data
        }
      }
    )
  }

  fetchMore()

  function pay(id, values) {
    if(values !== false)
    payRequest.send(
      () => payInsured(id, values),
      res => {
        toasted(
          res.success,
          'Successfully Paid.',
          "Couldnt Pay. Try Again."
        )
        if(res.success) {
          debitedRequest.response.value[0].paidDate = true
        }
      }
    )
  }

  // issuedRequest.send(
  //   () => getIssuedPayed(props.id)
  // )
</script>
<template>
  <slot
    :pay="pay"
    :debited="debitedRequest.response.value"
    :pending="debitedRequest.pending.value"
    :error="debitedRequest.error.value"
  />
</template>