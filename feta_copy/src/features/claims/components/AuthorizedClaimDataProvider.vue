<script setup>
import PaginationWithSearch from '@/components/PaginationWithSearch.vue';
import { getAuthorized, payClaim } from '@/features/claims/api/claimsApi'
import { useApiRequest } from '@/composables/useApiRequest';
import { useAuthorizedClaims } from '@/features/claims/store/authorizedClaimStore'
import { toasted } from '@/utils/utils';

const claimRequest = useApiRequest()
const payRequest = useApiRequest()
const authorizeRequest = useApiRequest()

const claimStore = useAuthorizedClaims()

function fetchMore(pagination = {page: 1, limit: import.meta.env?.v_PAGINATION_START}, cb = f => f) {
  claimRequest.send(
    () => getAuthorized(pagination),
    res => {
      if(res.success) {
        claimStore.claims = res.data
      }
      cb(res)
    }
  )
}

fetchMore()

function pay(data) {
  console.log(data)
  payRequest.send(
    () => payClaim(data),
    res => {
      claimStore.remove(data.claimUuid)
      toasted(res.success, 'Paid successfully,', 'couldnt pay. try again')
    }
  )
}

</script>

<template>
  <PaginationWithSearch
    :search-api="getAuthorized"
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