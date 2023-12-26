<script setup>
  import { getAllReports } from '@/features/report/api/reportApi'
  import { useApiRequest } from '@composable/useApiRequest'

  const reportRequest = useApiRequest()

</script>
<template>
  <slot
    :reports="[]"
  />
</template>