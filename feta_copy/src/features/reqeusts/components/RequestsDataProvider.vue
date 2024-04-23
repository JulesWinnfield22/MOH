<script setup>
  import { useApiRequest } from '@composable/useApiRequest'
  import { getRequested } from '@/features/reqeusts/api/requestsApi'
  import { reqeusteqeuests } from '@/features/reqeusts/store/requestsStore'
  import { ref, watch } from 'vue'
  import { useRoute } from 'vue-router'
  import PaginationWithSearch from '@/components/PaginationWithSearch.vue'
  
  const reviewedRequest = useApiRequest()
  const requestsStore = reqeusteqeuests()

  function fetchMore(pagination = {page: 1, limit: import.meta.env?.v_PAGINATION_START}, cb = f => f) {
    reviewedRequest.send(
      () => getRequested(pagination),
      res => {
        if(res.success) {
          requestsStore.reqeuests = res.data
        }
        cb(res)
      }
    )
  }

  fetchMore()
</script>
<template>
  <PaginationWithSearch
    :search-api="getRequested"
    :store="requestsStore"
    :perPageApi="fetchMore"
    v-slot="{ next, previous, searchPending, result, searching }"
  >
    <slot
      v-bind="{next, previous}"
      :requestes="searching ? result || [] : requestsStore.reqeuests"
      :error="reviewedRequest.error.value"
      :pending="searchPending || reviewedRequest.pending.value"
    />
  </PaginationWithSearch>
</template>