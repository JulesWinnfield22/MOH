<script setup>
import PaginationWithSearch from '@/components/PaginationWithSearch.vue';
import { getPaidClaims } from '@/features/claims/api/claimsApi'
import { useApiRequest } from '@/composables/useApiRequest';
import { usePaidClaims } from '@/features/claims/store/paidClaimsStore'
import { toasted } from '@/utils/utils';

const claimRequest = useApiRequest()
const payRequest = useApiRequest()

const claimStore = usePaidClaims()

function fetchMore(pagination = {page: 1, limit: import.meta.env?.v_PAGINATION_START}, cb = f => f) {
  claimRequest.send(
    () => getPaidClaims(pagination),
    res => {
      if(res.success) {
        claimStore.claims = res.data
      }
      cb(res)
    }
  )
}

fetchMore()

</script>

<template>
  <PaginationWithSearch
    :search-api="getPaidClaims"
    :store="claimStore"
    :perPageApi="fetchMore"
    v-slot="{ searching, result, searchPending, ...rest }"
  >
    <slot
      v-bind="rest"
      :claims="searching ? result || [] : claimStore.claims"
      :pending="searchPending || claimRequest.pending.value"
      :error="claimRequest.error.value"
    />
  </PaginationWithSearch>
</template>