<script setup>
import PaginationWithSearch from '@/components/PaginationWithSearch.vue';
import { getDenied } from '@/features/claims/api/claimsApi'
import { useApiRequest } from '@/composables/useApiRequest';
import { useDeclinedClaims } from '@/features/claims/store/declinedClaimsStore'
import { toasted } from '@/utils/utils';
import SearchWithPagination from '@/components/SearchWithPagination.vue';

const payRequest = useApiRequest()

const claimStore = useDeclinedClaims()

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
  <SearchWithPagination
    :store="claimStore"
    :cb="(data, config) => getDenied(data, config)"
    v-slot="{ data, pending }"
  >
    <slot
      :claims="data"
      :pending="pending"
    />
  </SearchWithPagination>
</template>