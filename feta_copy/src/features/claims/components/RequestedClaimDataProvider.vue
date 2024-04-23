<script setup>
import PaginationWithSearch from '@/components/PaginationWithSearch.vue';
import { getRequested, reviewClaim } from '@/features/claims/api/claimsApi'
import { useApiRequest } from '@/composables/useApiRequest';
import { useRequestedClaims } from '@/features/claims/store/requestedClaimStore'
import { toasted } from '@/utils/utils';

const claimRequest = useApiRequest()
const reviewRequest = useApiRequest()

const claimStore = useRequestedClaims()

function fetchMore(pagination = {page: 1, limit: import.meta.env?.v_PAGINATION_START}, cb = f => f) {
  claimRequest.send(
    () => getRequested(pagination),
    res => {
      if(res.success) {
        claimStore.claims = res.data
      }
      cb(res)
    }
  )
}

fetchMore()

function review(id) {
  if(reviewRequest.pending.value) return 

  reviewRequest.send(
    () => reviewClaim(id),
    res => {
      if(res.success) {
        claimStore.remove(id)
      }
      toasted(res.success, 'reviewed successfully', 'couldnt review try again.')
    }
  )
}
</script>

<template>
  <PaginationWithSearch
    :search-api="getRequested"
    :store="claimStore"
    :perPageApi="fetchMore"
    v-slot="{ searching, result, searchPending, ...rest }"
  >
    <slot
      v-bind="rest"
      :review="review"
      :claims="searching ? result || [] : claimStore.claims"
      :pending="searchPending || claimRequest.pending.value"
      :error="claimRequest.error.value"
    />
  </PaginationWithSearch>
</template>