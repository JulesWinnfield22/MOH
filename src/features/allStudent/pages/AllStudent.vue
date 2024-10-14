<script setup>
import TablePage from '@/components/components/TablePage.vue';
import Table from '@/components/Table.vue';
import { getAllStudent } from '../api/allStudentApi';
import { removeUndefined } from '@/utils/utils';
import { ref } from 'vue';
import { usePagination } from '@/composables/usePagination';
const serachKey = ref('');
const pagination = usePagination({
  cb: (data, config) =>
    getAllStudent(
      removeUndefined({
        ...data,
        search: serachKey.value,
      })
    ),
});
</script>
<template>
  <div class="flex flex-col gap-4">
      <div class="flex justify-between p-5 shadow-md ">
      <input
    class="rounded-lg border w-[60%]  p-2 focus:outline-none focus:ring-2 focus:ring-[#21618C] placeholder-gray-500"
        placeholder="Search by Id full name email and phone"
        v-model="serachKey"
         @input="pagination.send()"
      />
    </div>
    <TablePage>
      <Table
        :pending="pagination.pending.value"
        :Fallback="TableRowSkeleton"
        :headers="{
          head: [
            'ErnpId',
            'FullName',
            'University Name',
            'Program Name',
            'Gender',
            'Salary',
            'Contract Amount',
            '',
          ],
          row: [
            'ernpId',
            'fullName',
            'universityName',
            'programName',
            'gender',
            'salary',
            'totalTrainingCost',
          ],
        }"
        :rows="pagination.response.value?.content"
      >
      </Table>
    </TablePage>
  </div>
</template>
