<script setup>
  import { useApiRequest } from '@/composables/useApiRequest'
  import { allRequest } from '@/utils/utils'
  import { getApprovalDetail, getBeneficiaries, getClaimById, getClaimService } from '../api/claimsApi';

  const props = defineProps({
    insuredId: {
      type: String,
      required: true
    },
    claimId: {
      type: String,
      required: true  
    }
  })

  const req = useApiRequest()

  req.send(
    () => allRequest({
      beneficiaries: getBeneficiaries(props.insuredId),
      claim: getClaimById(props.claimId),
      services: getClaimService(props.claimId),
      details: getApprovalDetail(props.claimId)
    })
  )
</script>
<template>
  <slot
    v-bind="req.response.value"
    :pending="req.pending.value"
  />  
</template>