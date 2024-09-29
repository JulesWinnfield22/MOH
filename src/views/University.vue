<script setup>
  import Table from '@com/Table.vue'
  import { usePagination } from '@/composables/usePagination'
  import {getAllUniversities} from '@/features/university/api/uniApI'
  import TableRowSkeleton from '@skl/TableRowSkeleton.vue'
import UniversitiesDataProvider from '@/features/university/components/UniversitiesDataProvider.vue';
  

</script>
<template>
 <div class="p-5">
  <UniversitiesDataProvider v-slot="{ universities, pending }">
    {{ console.log(universities) }}
    <Table
      :pending="pending"
      :Fallback="TableRowSkeleton"
      :headers="{
        head: ['University Name','No of Students' ,'actions'],
        row: ['universityName','studentsLength']
      }"
      :rows="universities"
    > 
      <template #actions="{row}">
        <button class="text-[#21618C] text-sm hover:italic hover:underline" @click="$router.push(`/students/${row?.universityUuid}`)">
           Assigned Students
        </button>
      </template>
    </Table>
  </UniversitiesDataProvider>
  </div>
</template>