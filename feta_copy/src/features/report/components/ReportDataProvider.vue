<script setup>
  import { useApiRequest } from '@composable/useApiRequest'
  import { getAllBranches } from '@/features/report/api/reportApi';
  import { getAllAgenncies } from '@/features/agencies/api/agenciesApi';
  import { getAllReports } from '@/features/report/api/reportApi'
  import coutries from '@/utils/coutries'

  const reportRequest = useApiRequest()
  const branchReq = useApiRequest()
  const agenciesReq = useApiRequest()

  async function getData() {
    try {
      const res = await Promise.all([getAllBranches(), getAllAgenncies(), getAllReports({beginDate: '2023-02-02', endDate: '2024-02-02'})])
      return {
        success: true,
        data: {
          branches: res?.[0]?.data,
          agencies: res?.[1]?.data,
          certificates: res?.[2]?.data,
          coutries: coutries.toSorted(),
        }
      }
    } catch(err) {
      return {
        success: false,
        data: '',
        error: err.message
      }
    }
  }

  reportRequest.send(
    () => getData()
  )
</script>
<template>
  <slot
    :reports="reportRequest.response.value"
    :pending="reportRequest.pending.value"
  />
</template>