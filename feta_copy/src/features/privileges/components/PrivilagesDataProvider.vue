<script setup>
import { getPrivilages, deletePrivilage, searchPrivilage } from '@privilege/api/privilegesApi'
import { useApiRequest } from '@composable/useApiRequest';
import { usePrivilages } from '@store/privilages';
import { ref, watch } from 'vue';
import { addToast } from '@/toast';
import { useTablePagination } from '@/composables/useTablePagination'
import PaginationWithSearch from '@/components/PaginationWithSearch.vue';

const props = defineProps({
  status: {
    String,
    default: 'Active'
  },
})

const privilagesStore = usePrivilages()

const request = useApiRequest()
const requestDelete = useApiRequest()

function fetchMore(pagination = {page: 1, limit: import.meta.env?.v_PAGINATION_START}, cb = f => f) {
  if (privilagesStore.privilages.length == 0) {
    request.send(
      () => getPrivilages(pagination),
      (res) => {
        if (res.success) {
          privilagesStore.setPrivilages(res.data)
        }
        cb(res)
      }
    )
  }
}

fetchMore()

function remove(id) {
  if(requestDelete.pending.value) return 
  requestDelete.send(
    () => deletePrivilage(id),
    res => {
      if(res.success) {
        privilagesStore.remove(id)
        addToast({
          type: 'success',
          message: 'Successfully deleted a Privilege.'
        })
      } else {
        addToast({
          type: 'error',
          message: 'Couldnt deleted a Privilege.'
        })        
      }
    }
  )
}
</script>

<template>
  <PaginationWithSearch
    :store="privilagesStore"
    :search-api="(query, config) => getPrivilages(query, {
      ...config,
    })"
    :perPageApi="fetchMore"
    v-slot="{ next, previous, result, searchPending, searching }"
  >
    <slot
      v-bind="{ next, previous }"
      :response="searching ? result || [] : privilagesStore.privilages"
      :pending="searchPending || request.pending.value"
      :error="request.error.value"
      :remove="remove"
    />
  </PaginationWithSearch>
</template>