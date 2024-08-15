<script setup>
  import Table from '@com/Table.vue'
  import { usePagination } from '@/composables/usePagination'
  import {getAllUniversities} from '@/features/university/api/uniApI'
  import TableRowSkeleton from '@skl/TableRowSkeleton.vue'
  
  const pagination = usePagination({
    cb: getAllUniversities
  })

</script>
<template>
  <Table
    :pending="pagination.pending.value"
    :Fallback="TableRowSkeleton"
    :headers="{
      head: ['University Name','no' ,'actions'],
      row: ['universityName','studentsLength']
    }"
    :rows="pagination.data.value || []"
  > 
    <template #actions="{row}">
      <button class="text-sm hover:italic hover:underline" @click="$router.push(`/students/${row?.universityUuid}`)">
         Students
      </button>
    </template>
  </Table>
</template>