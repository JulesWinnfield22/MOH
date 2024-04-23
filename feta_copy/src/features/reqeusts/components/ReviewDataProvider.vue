<script setup>
  import { useApiRequest } from '@composable/useApiRequest'
  import { getReviewed } from '@agencies/api/agenciesApi'

  const req = useApiRequest()

  req.send(
    () => getReviewed(),
    res => {
      console.log(res)
    }
  )
</script>
<template>
  <slot
    :reviewed="req.response.value"
    :pending="req.pending.value"
    :error="req.error.value"
  />
</template>