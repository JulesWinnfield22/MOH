<script setup>
import DataTable from './DataTable.vue'

const props = defineProps({
  users: {
    type: Array,
    required: true
  }
})

</script>
<template>
  <div class="p-1 mt-4 bg-white relative h-[1122px] w-[794px]">
    <DataTable :headers="['Fullname', 'Gender', 'phone']">
      <template #head>
        <th>#</th>
      </template>
      <tr v-for="(user, idx) in users" :key="users.insuredUuid">
        <td class="p-2">
          {{ idx + 1 }}
        </td>
        <td class="p-2">
          {{ `${user.firstName} ${user.fatherName} ${user.grandFatherName}` }}
        </td>
        <!-- <td class="p-2">
          {{ user.debitNoteNumber }}
        </td> -->
        <td class="p-2">
          {{ user.gender }}
        </td>
        <td class="p-2">
          {{ user.phone }}
        </td>
      </tr>
    </DataTable>
  </div>
</template>./DataTabl.vue