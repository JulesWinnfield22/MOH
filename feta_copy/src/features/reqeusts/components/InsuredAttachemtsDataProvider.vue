<script setup>
  import { useApiRequest } from '@composable/useApiRequest'
  import { getBeneficiaries, getOneInsuredAttachemts } from '@/features/reqeusts/api/requestsApi'

  const props = defineProps({
    insuredUuid: {
      type: String,
      required: true
    }
  })
  const req = useApiRequest()
  const beneficiariesReq = useApiRequest()

  function fetchMore() {
    req.send(
      () => getOneInsuredAttachemts(props.insuredUuid),
      res => {
        console.log(res)
      }
    )
  }

  beneficiariesReq.send(
    () => getBeneficiaries(props.insuredUuid),
    res => {
      console.log(res)
    }
  )

  fetchMore()
</script>
<template>
  <slot
    :beneficiaries="beneficiariesReq.response.value"
    :attachements="req.response.value"
    :pending="req.pending.value"
  />
</template>