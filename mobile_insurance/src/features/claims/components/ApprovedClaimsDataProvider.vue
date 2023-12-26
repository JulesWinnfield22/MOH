<script setup>
import PaginationWithSearch from '@/components/PaginationWithSearch.vue';
import { getReviewed, payClaim } from '@/features/claims/api/claimsApi'
import { useApiRequest } from '@/composables/useApiRequest';
import { useApprovedClaims } from '@/features/claims/store/approvedClaimsStore'
import { toasted } from '@/utils/utils';

const claimRequest = useApiRequest()
const payRequest = useApiRequest()

const claimStore = useApprovedClaims()

function fetchMore(pagination = {page: 1, limit: import.meta.env?.v_PAGINATION_START}, cb = f => f) {
  claimRequest.send(
    () => getReviewed(pagination),
    res => {
      if(res.success) {
        claimStore.claims = res.data
      }
      cb(res)
    }
  )
}

fetchMore()

function pay(id) {
  payRequest.send(
    () => payClaim(id),
    res => {
      if(res.success) {
        claimStore.remove(id)
      }
      toasted(res.success, 'Successfully paid!', 'couldnt pay claim. try again.')
    }
  )
}
</script>

<template>
  <PaginationWithSearch
    :search-api="getReviewed"
    :store="claimStore"
    :perPageApi="fetchMore"
    v-slot="{ searching, result, searchPending, ...rest }"
  >
    <slot
      v-bind="rest"
      :pay="pay"
      :claims="searching ? result || [] : claimStore.claims"
      :pending="searchPending || claimRequest.pending.value"
      :error="claimRequest.error.value"
    />
  </PaginationWithSearch>
</template>