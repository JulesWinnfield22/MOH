<script setup>
  import { getAgennciesNoPolicy, generatePolicy as genPolicy, removeAgency, getAgennciesWithPolicy, searchNopolicy, searchWithPolicy } from '@/features/agencies/api/agenciesApi'
  import { useApiRequest } from '@composable/useApiRequest'
  import { useTablePagination } from '@/composables/useTablePagination'
  import { usePolicies } from '@/features/policies/store/policiesStore'
  import { useWithPolicies } from '@/features/policies/store/withPoliciesStore'
  import { addToast } from '@/toast';
  import { ref, watch } from 'vue'
  import { useRoute } from 'vue-router'
  import PerPage from '@/components/PerPage.vue'
  import PaginationWithSearch from '@/components/PaginationWithSearch.vue'

  const withPoliciesStore = useWithPolicies()

  const withPoliciesRequest = useApiRequest()
  
  const policieDelete = useApiRequest()

  function getWithPolicies(pagination = {page: 1, limit: import.meta.env?.v_PAGINATION_START}, cb = f => f) {
    if(withPoliciesRequest.pending.value) return

    withPoliciesRequest.send(
      () => getAgennciesWithPolicy({
        page: pagination.page,
        limit: pagination.limit,
      }),
      res => {
        if(res.success) {
          withPoliciesStore.policies = res.data
        }
        cb(res)
      }
    )
  }
  
  getWithPolicies()

  function remove(id) {
    if(policieDelete.pending.value) return

    policieDelete.send(
      () => removeAgency(id),
      res => {
        console.log(res)
        if(res.success) {
          policyStore.remove(id)
          addToast({
            type: 'success',
            message: 'Successfully deleted a policy'
          })
        } else {
          addToast({
            type: 'error',
            message: 'Couldnt remove a policy. try again!'
          })
        }
      }
    )
  }

</script>
<template>
  <PaginationWithSearch
    :search-api="getAgennciesWithPolicy"
    :perPageApi="getWithPolicies"
    :store="withPoliciesStore"
    v-slot="{ next, previous, searchPending, searching, result }"
  >
    <slot
      v-bind="{next, previous}"
      :withPolicies="searching ? result || [] : withPoliciesStore.policies"
      :pending="searchPending || withPoliciesRequest.pending.value"
      :error="withPoliciesRequest.error.value"
      :remove="remove"
    />
  </PaginationWithSearch>
</template>