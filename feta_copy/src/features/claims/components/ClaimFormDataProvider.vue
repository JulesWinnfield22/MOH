<script setup>
  import { getClaimCategories } from '@/features/claims/api/serviceApi'
  import { useApiRequest } from '@/composables/useApiRequest'
  import { aggregateFunctionResponse } from '@/utils/utils';
  import { createClaim, getClaimService, getClaimDetail } from '../api/claimsApi';

  const props = defineProps({
    insuredPersonUuid: {
      type: String,
    },
    claimUuid: {
      type: String,
    }
  })

  const req = useApiRequest()
  const claimReq = useApiRequest()

  if(props.insuredPersonUuid) {
    claimReq.send(
      () => createClaim(props.insuredPersonUuid),
      res => {
        if(res.success) {
          req.send(
            () => aggregateFunctionResponse({
              claimCategoreis: getClaimCategories(),
              claimTypes: getClaimService(res.data),
              claimDetail: getClaimDetail(res.data),
            })
          )
        }
      }
    )
  } else {
    req.send(
      () => aggregateFunctionResponse({
        claimCategoreis: getClaimCategories(),
        claimTypes: getClaimService(props.claimUuid),
        claimDetail: getClaimDetail(props.claimUuid),
      })
    )
  }

</script>
<template>
  <slot
    v-bind="req.response.value"
    :claimUuid="claimReq.response.value"
    :pending="claimReq.pending.value || req.pending.value"
  />
</template>