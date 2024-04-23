<script setup>
import PaginationWithSearch from '@/components/PaginationWithSearch.vue';
import { getRequested, denyClaim, approveClaim } from '@/features/claims/api/claimsApi'
import { useApiRequest } from '@/composables/useApiRequest';
import { useReviewedClaims } from '@/features/claims/store/reviewedStore'
import { toasted } from '@/utils/utils';

const claimRequest = useApiRequest()
const statusRequest = useApiRequest()

const claimStore = useReviewedClaims()

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

function approve(id) {
  if(statusRequest.pending.value) return 

  statusRequest.send(
    () => approveClaim(id),
    res => {
      if(res.success) {
        claimStore.remove(id)
      }
      toasted(res.success, 'approved successfully', 'couldnt approve try again.')
    }
  )
}

function deny(id) {
  if(statusRequest.pending.value) return 

  statusRequest.send(
    () => denyClaim(id),
    res => {
      if(res.success) {
        claimStore.remove(id)
      }
      toasted(res.success, 'Denied successfully', 'unable to deny claim. try again.')
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
      :approve="approve"
      :deny="deny"
      :claims="searching ? result || [] : claimStore.claims"
      :pending="searchPending || claimRequest.pending.value"
      :error="claimRequest.error.value"
    />
  </PaginationWithSearch>
</template>