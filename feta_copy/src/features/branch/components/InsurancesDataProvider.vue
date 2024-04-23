<script setup>
  import { useApiRequest } from '@composable/useApiRequest'
  import { usebranches } from '@/features/branch/store/branchStore'
  import { getAllbranches, removeBranch as removeA } from '@/features/branch/api/branchesApi'
  
  const branchStore = usebranches()
  const branchesRequest = useApiRequest()

  if(!branchStore.branches.length) {
    branchesRequest.send(
      () => getAllbranches(),
      res => {
        if(res.success) {
          branchStore.set(res.data)
        }
      }
    )
  }

</script>
<template>
  <slot
    :insurances="branchStore.branches"
    :pending="branchesRequest.pending.value"
    :error="branchesRequest.error.value"
  />
</template>