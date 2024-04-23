<script setup>
  import PaginationWithSearch from '@/components/PaginationWithSearch.vue';
  import { useApiRequest } from '@/composables/useApiRequest'
  import { getSavedClaims } from '@/features/claims/api/claimsApi'

  const claimReq = useApiRequest()

  claimReq.send(
    () => getSavedClaims({page: 1, limit: 25})
  )
</script>

<template>
  <PaginationWithSearch
    :search-api="getSavedClaims"
    :perPageApi="getSavedClaims"
    v-slot="{ result, next, previous, searchPending }"
  >
    <slot
      v-bind="{next, previous}"
      :result="claimReq.response.value || result"
      :pending="claimReq.pending.value || searchPending"
    />
  </PaginationWithSearch>
</template>