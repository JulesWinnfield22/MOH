<script setup>
import Table from '@com/Table.vue';
import { usePagination } from '@/composables/usePagination';
import { getAllUniversities } from '@/features/university/api/uniApI';
import TableRowSkeleton from '@skl/TableRowSkeleton.vue';
import UniversitiesDataProvider from '@/features/university/components/UniversitiesDataProvider.vue';
import { ref } from 'vue';
import icons from '@/utils/icons';
import Button from '@/components/Button.vue';

const search = ref('')
</script>
<template>
  <div
    class="flex flex-col items-stretch px-4 justify-between bg-gray-100 rounded-lg shadow-md p-4"
  >
 
    <input
      v-model="search"
      class="flex w-[800px] rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-[#21618C] placeholder-gray-500 transition duration-300"
      placeholder="Search Universities"
    />
    <div class="flex gap-2 justify-end items-center">
    <Button
          @click="$router.push('/add_university')"
          type="primary"
          class="flex items-center gap-2"
        >
          <i v-html="icons.plus" />
          Add University
        </Button>
        </div>
    <UniversitiesDataProvider :search="search" v-slot="{ universities, pending }">
      <Table
        :pending="pending"
        :headers="{
          head: ['University Name', 'no', 'actions'],
          row: ['universityName', 'studentsLength'],
        }"
        :rows="universities"
      >
        <template #actions="{ row }">
          <div class=" flex gap-4">

            <button
              class="text-[#21618C] text-sm hover:italic hover:underline"
              @click="$router.push(`/university/students/${row?.universityUuid}`)"
            >
              Open
            </button>
            <!-- <button
              class="text-[#21618C] text-sm hover:italic hover:underline"
              @click="$router.push(`/add_university`)"
            >
              Edit
            </button> -->
          </div>
        </template>
      </Table>
    </UniversitiesDataProvider>
  </div>
</template>
