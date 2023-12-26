<script setup>
import PaginationWithSearch from '@/components/PaginationWithSearch.vue';
import { getRegistered } from '@/features/claims/api/claimsApi'
import { useApiRequest } from '@/composables/useApiRequest';
import { useRegisteredClaims } from '@/features/claims/store/registeredClaimsStore.js'

const claimRequest = useApiRequest()
const claimStore = useRegisteredClaims()

function fetchMore(pagination = {page: 1, limit: import.meta.env?.v_PAGINATION_START}, cb = f => f) {
  claimRequest.send(
    () => getRegistered(pagination),
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
    :search-api="getRegistered"
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