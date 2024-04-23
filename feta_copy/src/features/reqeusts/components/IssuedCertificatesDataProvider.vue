<script setup>
  import { useApiRequest } from '@composable/useApiRequest'
  import { getPaidDebited } from '@agencies/api/agenciesApi'
  import { useCertificaets } from '@/features/reqeusts/store/approvedStore'
  
  const store = useCertificaets()
  const req = useApiRequest()

  req.send(
    () => getPaidDebited(),
    res => {
      console.log(res)
      if(res.success) {
        store.certificates = res.data
      }
    }
  )
</script>
<template>
  <slot
    :approved="req.response.value"
    :pending="req.pending.value"
    :error="req.error.value"
  />
</template>