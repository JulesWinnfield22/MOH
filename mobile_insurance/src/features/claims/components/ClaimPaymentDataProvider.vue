<script setup>
import PaginationWithSearch from '@/components/PaginationWithSearch.vue';
import { getClaimPayment } from '@/features/claims/api/claimsApi'
import { useApiRequest } from '@/composables/useApiRequest';
import { useClaimPayment } from '@/features/claims/store/claimpaymentStore'
import { toasted } from '@/utils/utils';

const claimRequest = useApiRequest()
const payRequest = useApiRequest()

const claimStore = useClaimPayment()

function fetchMore(pagination = {page: 1, limit: import.meta.env?.v_PAGINATION_START}, cb = f => f) {
  claimRequest.send(
    () => getClaimPayment(pagination),
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
    :search-api="getClaimPayment"
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