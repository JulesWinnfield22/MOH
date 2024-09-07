<script setup>
  import {getAllUsers} from '@/features/university/api/userApi'
  import TableRowSkeleton from '@skl/TableRowSkeleton.vue'
 import { usePagination } from '@/composables/usePagination'
import { ref, watch } from 'vue'
import { usePaginationTemp} from '@/composables/usePaginaionTemp'
import { useApiRequest } from '@/composables/useApiRequest'
import Table from '@com/Table.vue'
	import Button from '@com/Button.vue'
import { toasted } from '@/utils/utils'
import { openModal } from '@/modals'
const showModalAdd = ref(false)
const currentPage = ref(2)
const totalPages = ref(5)
const open = ref(false)


  const paginations = usePaginationTemp({
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
	<div class="flex justify-between py-2 border-b items-center">
		<input @keydown.enter=" paginations.search.value = $event.target.value " class="rounded " placeholder="search users" />
    <Button @click="$router.push('/users/add')" type="primary">
			Add user
		</Button>
	</div>
	<Table class="Table-header"
    :pending="paginations.pending.value"
    :Fallback="TableRowSkeleton"
   
    :headers="{
      head: ['Full Name', 'User type','Gender','phone', 'actions',],
      row: ['fullName','userType','gender', 'phone']
    }"
    :rows="(paginations.data.value || [])"
  > 
    <template #actions="{row}">
      <button
          class="items-end bg-[#092537] text-white flex gap-2 font-dm-sans p-2 rounded-md"
           @click="openModal('EditUserForm', {user: row})"
        >
          <svg
            width="10"
            height="12"
            viewBox="0 0 10 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M6.05539 0.636889C6.90458 -0.212296 8.28138 -0.212296 9.13056 0.636889C9.97975 1.48607 9.97975 2.86288 9.13056 3.71206L4.89204 7.95058C4.65316 8.18949 4.50728 8.33539 4.34468 8.46221C4.15311 8.61163 3.94583 8.73974 3.72651 8.84426C3.54036 8.93298 3.34462 8.99821 3.0241 9.10503L1.53239 9.60227L1.17425 9.72165C0.853682 9.8285 0.500255 9.74507 0.261318 9.50613C0.022381 9.2672 -0.0610511 8.91377 0.0458046 8.5932L0.662419 6.74336C0.76924 6.42283 0.834476 6.22709 0.923191 6.04094C1.02771 5.82162 1.15582 5.61434 1.30524 5.42277C1.43206 5.26017 1.57797 5.11429 1.81688 4.8754L6.05539 0.636889ZM1.51307 8.72621L1.04124 8.25438L1.4478 7.0347C1.56617 6.67958 1.61507 6.53519 1.67896 6.40113C1.75732 6.2367 1.85337 6.0813 1.96539 5.93767C2.05673 5.82057 2.16401 5.71227 2.42869 5.44758L5.71668 2.1596C5.8524 2.50006 6.08203 2.91097 6.46926 3.2982C6.85648 3.68543 7.2674 3.91506 7.60786 4.05077L4.31987 7.33876C4.05519 7.60345 3.94688 7.71072 3.82978 7.80206C3.68615 7.91409 3.53075 8.01013 3.36633 8.08849C3.23226 8.15239 3.08787 8.20128 2.73276 8.31965L1.51307 8.72621ZM8.27496 3.38367C8.20585 3.3685 8.11943 3.34567 8.02118 3.31158C7.75103 3.21785 7.39567 3.04062 7.06125 2.7062C6.72683 2.37178 6.5496 2.01642 6.45587 1.74627C6.42179 1.64802 6.39896 1.5616 6.38378 1.49249L6.64739 1.22889C7.16962 0.706651 8.01633 0.706651 8.53857 1.22889C9.0608 1.75112 9.0608 2.59783 8.53857 3.12006L8.27496 3.38367ZM1.13634e-05 11.5814C1.13634e-05 11.3502 0.187427 11.1628 0.418616 11.1628H9.34885V12H0.418616C0.187427 12 1.13634e-05 11.8126 1.13634e-05 11.5814Z"
              fill="white"
            />
          </svg>

          Edit
        </button>
    </template>
  </Table>
</template>