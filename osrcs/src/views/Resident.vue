<script setup>
import { ref } from 'vue'

const rows = ref([
  { selected: false, col1: 'Row 1, p1', col2: 'pending' },
  { selected: false, col1: 'Row 2, Col 1', col2: 'pending' },
  // Add more rows as needed
])

function selectRow(index) {
  // Toggle selection of the row
  rows.value[index].selected = !rows.value[index].selected
}

function confirmSelection() {
  rows.value.forEach((row) => {
    if (row.selected && row.col2 === 'pending')
      row.col2 = 'approve'
  })
}

function rejectSelection() {
  rows.value.forEach((row) => {
    if (row.selected && row.col2 === 'pending')
      row.col2 = 'rejected'
  })
}
</script>

<template>
  <div>
    <button class="mb-4 px-4 py-2 bg-green-500 text-white rounded" @click="confirmSelection">
      Confirm
    </button>
    <button class="mb-4 px-4 py-2 bg-red-500 text-white rounded" @click="rejectSelection">
      Reject
    </button>
    <table>
      <thead>
        <tr>
          <td class="py-2 Table-header w-[23.5px] px-4 border-b">
            <!-- Header content if any -->
          </td>
          <td>Header 1</td>
          <td>Header 2</td>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(row, index) in rows"
          :key="index"
          :class="{ 'bg-blue-200': row.selected }"
        >
          <td class="py-2 w-[23.5px] px-4 border-b">
            <input type="checkbox" :checked="row.selected" @change="selectRow(index)">
          </td>
          <td>{{ row.col1 }}</td>
          <td>{{ row.col2 }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.bg-blue-200 {
  background-color: #bfdbfe; /* Tailwind CSS color class for bg-blue-200 */
}
</style>
