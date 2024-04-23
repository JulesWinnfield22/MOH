<script setup>
  import { useApiRequest } from '@composable/useApiRequest'
  import { getPayed } from '@agencies/api/agenciesApi'

  const req = useApiRequest()

  req.send(
    () => getPayed(),
    res => {
      console.log(res)
    }
  )
</script>
<template>
  <slot
    :payed="req.response.value"
    :pending="req.pending.value"
    :error="req.error.value"
  />
</template>