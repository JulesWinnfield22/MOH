<script setup>
import PaginationWithSearch from '@/components/PaginationWithSearch.vue';
import { getApproved, reviewClaim } from '@/features/claims/api/claimsApi'
import { useApiRequest } from '@/composables/useApiRequest';
import { useAuthorizedClaims } from '@/features/claims/store/authorizeClaimsStore'
import { toasted } from '@/utils/utils';

const claimRequest = useApiRequest()
const authorizeRequest = useApiRequest()

const claimStore = useAuthorizedClaims()

function fetchMore(pagination = {page: 1, limit: import.meta.env?.v_PAGINATION_START}, cb = f => f) {
  claimRequest.send(
    () => getApproved(pagination),
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
  if(authorizeRequest.pending.value) return 

  authorizeRequest.send(
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
    :search-api="getApproved"
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