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

  const policyStore = usePolicies()
  
  const policiesRequest = useApiRequest()
  const policiesGenerate = useApiRequest()

  function getIssuedPolicy(pagination = {page: 1, limit: import.meta.env?.v_PAGINATION_START}, cb = f => f) {
    policiesRequest.send(
      () => getAgennciesNoPolicy(pagination),
      res => {
        if(res.success) {
          policyStore.policies = res.data
        }
        cb(res)
      }
    )
  }
  
  getIssuedPolicy()

  function generatePolicy(id, data) {
    if(policiesGenerate.pending.value) return
    
    policiesGenerate.send(
      () => genPolicy(id, data),
      res => {
        console.log(res)
        if(res.success) {
          policyStore.remove(id)
          withPoliciesStore.policies.unshift(res.data)
          addToast({
            type: 'success',
            message: 'Successfully generated a policy'
          })
        } else {
          addToast({
            type: 'error',
            message: 'Couldnt generated a policy. try again!'
          })
        }
      }
    )
  }

  let controller
  function search(search) {
    if(controller) controller.abort()
    controller = new AbortController()

    policiesRequest.send(
      () => searchNopolicy(search, {
        signal: controller.signal
      }),
      res => {
        console.log(res)
      },
      searching.value
    )
  }
</script>
<template>
  <PaginationWithSearch
    :searchApi="getAgennciesNoPolicy"
    :perPageApi="getIssuedPolicy"
    :store="policyStore"
    v-slot="{ next, previous, searchPending, result, searching }"
  >
    <slot
      v-bind="{next, previous, generatePolicy}"
      :issuced="searching ? result|| [] : policyStore.policies"
      :pending="searchPending || policiesRequest.pending.value"
      :error="policiesRequest.error.value"
    />
  </PaginationWithSearch>
</template>