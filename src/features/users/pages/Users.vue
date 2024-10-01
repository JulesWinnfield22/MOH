<script setup>
import { getAllUsers, removeUser } from '@/features/university/api/userApi';
import TableRowSkeleton from '@skl/TableRowSkeleton.vue';
import { usePagination } from '@/composables/usePagination';
import { ref, watch } from 'vue';
import { usePaginationTemp } from '@/composables/usePaginaionTemp';
import { useApiRequest } from '@/composables/useApiRequest';
import Table from '@com/Table.vue';
import Button from '@com/Button.vue';
import { toasted } from '@/utils/utils';
import { openModal } from '@/modals';
import BaseIcon from '@/components/components/base/BaseIcon.vue';
const showModalAdd = ref(false);
const currentPage = ref(2);
const totalPages = ref(5);
const open = ref(false);

const paginations = usePaginationTemp({
  cb: getAllUsers,
});

function prevPage() {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
}

function nextPage() {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
}

function goToPage(page) {
  currentPage.value = page;
}

const req = useApiRequest()
function remove(id) {
  req.send(
    () => removeUser(id),
    res => {
      toasted(res.success, 'User Removed Successfully', res.error)
    }
  )
}
const fileInput = ref(null);
</script>

<template>
  <div class="flex justify-between items-center p-5 border-b shadow-md rounded-lg">
  <input
    @input="paginations.search.value = $event.target.value"
    class="flex rounded-lg border w-[60%] p-2 focus:outline-none focus:ring-2 focus:ring-[#21618C] placeholder-gray-500 transition duration-300"
    placeholder="Search users"
  />
  <button
    @click="$router.push('/users/add')"
    class="ml-4 bg-[#21618C] text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out hover:bg-[#1A4D6D]"
  >
    Add User
  </button>
</div>
  <div class="p-5">
    <Table
      class="Table-header"
      :pending="paginations.pending.value"
      :Fallback="TableRowSkeleton"
      :headers="{
        head: ['Full Name', 'Gender', 'phone','Email', 'User Role', 'actions'],
        row: ['fullName', 'gender', 'phone','email' ,'userType'],
      }"
      :rows="paginations.data.value || []"
    >
      <template #actions="{ row }">
        <div class="flex items-center gap-2">
          <button
            class="flex items-center bg-[#092537] text-white gap-2 font-dm-sans p-2 rounded-md"
            @click="openModal('EditUserForm', { user: row })"
          >
            

            Edit
          </button>
          <button
  @click="remove(row.userUuid)"
  class="flex items-center gap-2 font-dm-sans py-2 px-2 rounded-lg bg-red-500 text-white font-semibold shadow-md hover:bg-red-600 transition duration-300 ease-in-out transform hover:scale-105"
>
  Delete
</button>
        </div>
      </template>
    </Table>
  </div>
</template>
