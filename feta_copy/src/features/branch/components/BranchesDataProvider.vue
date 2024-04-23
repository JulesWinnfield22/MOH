<script setup>
  import { useApiRequest } from '@composable/useApiRequest'
  import { getAllbranches, removeBranch as removeA } from '@/features/branch/api/branchesApi'
  import { usebranches } from '@/features/branch/store/branchStore' 
  import { ref } from 'vue';
  import { addToast } from '@/toast';
  import PaginationWithSearch from '@/components/PaginationWithSearch.vue';

  const branchesRequest = useApiRequest()
  const deleteRequest = useApiRequest()
  const branchesStore = usebranches()

  function fetchMore(pagination = {page: 1, limit: import.meta.env?.v_PAGINATION_START}, cb = f => f) {
    branchesRequest.send(
      () => getAllbranches(pagination),
      res => {
        if(res.success) {
          branchesStore.set(res.data)
        }
        cb(res)
      }
    )
  }

  fetchMore()

  function removeBranch(id) {
    if(deleteRequest.pending.value) return
    
    deleteRequest.send(
      () => removeA(id),
      res => {
        if(res.success) {
          branchesStore.remove(id)
          addToast({
            type: 'success',
            message: "Successfully Created a branch!"
          })
        } else {
          addToast({
            type: 'error',
            message: "Couldn't Delete the branch try again!"
          })
        }
      }
    )
  }
</script>
<template>
  <PaginationWithSearch
    :search-api="getAllbranches"
    :perPageApi="fetchMore"
    :store="branchesStore"
    v-slot="{ next, previous, searchPending, searching, result }"
  >
    <slot
      v-bind="{ next, previous }"
      :branches="searching ? result || [] : branchesStore.branches || []"
      :pending="searchPending || branchesRequest.pending.value"
      :error="branchesRequest.error.value"
      :removeBranch="removeBranch"
    />    
  </PaginationWithSearch>
</template>