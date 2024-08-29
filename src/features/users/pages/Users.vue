<script setup lang="ts">
  import {getAllUsers} from '@/features/university/api/userApi'
  import TableRowSkeleton from '@skl/TableRowSkeleton.vue'
 import { usePagination } from '@/composables/usePagination'
import { ref, watch } from 'vue'
import { usePaginationTemp} from '@/composables/usePaginaionTemp'
import { useApiRequest } from '@/composables/useApiRequest'
import Table from '@com/Table.vue'
	import Button from '@com/Button.vue'
import { toasted } from '@/utils/utils'
const showModalAdd = ref(false)
const currentPage = ref(2)
const totalPages = ref(5)
const open = ref(false)


  const paginations = usePagination({
    cb: getAllUsers
  })

function prevPage() {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

function nextPage() {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

function goToPage(page) {
  currentPage.value = page
}


const fileInput = ref(null)
</script>


<template>
	<div class="flex py-2 border-b items-center justify-end">
		<Button @click="$router.push('/users/add')" type="primary">
			Add user
		</Button>
	</div>
	<Table class="Table-header"
    :pending="paginations.pending.value"
    :Fallback="TableRowSkeleton"
   
    :headers="{
      head: ['Full Name', 'User type','Gender','memo', 'actions',],
      row: ['fullName','usertype','Gender',]
    }"
    :rows="paginations.data.value || []"
  > 
    <template #actions="{row}">
      <button class="text-[#21618C] text-sm hover:italic hover:underline" @click="$router.push(`/student-batch/${row?.batchNumber}`)">
         Open
      </button>
    </template>
  </Table>
</template>