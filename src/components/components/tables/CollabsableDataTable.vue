<template>
  <div class="overflow-x-hidden">
    <div class="mb-6 overflow-x-hidden">
      <div class="mr-2 pl-0 overflow-x-hidden">
        <table class="min-w-full rounded-lg">
          <thead class="bg-th">
            <tr>
              <th class="th px-3 py-3 text-left uppercase tracking-wider">#</th>
              <!-- Add row number column -->
              <th
                v-for="header in columnHeaders"
                :key="header"
                class="px-6 py-3 text-left text-gray-600"
              >
                {{ header }}
              </th>
              <!-- If you want to add actions column, you can add it here -->
              <th
                v-if="hasActions"
                class="ml-10 px-3 py-3 text-left tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <TableSection
            v-for="(entry, index) in entries"
            :key="index"
            :entry="entry"
            :index="index"
            :columns="columns"
          />
        </table>
        <div class="flex justify-between ml-4 mr-10" v-if="hasFooter">
          <div class="flex items-center m-6 space-x-3">
            <span class="">Showing 1 to of 2 entries</span>
          </div>

          <div>
            <div className="flex items-center m-6 space-x-3">
              <span class="">Showing</span>
              <div class="w-[90px]">
                <select
                  class="h-[35px] text-center bg-gray-50 border border-gray-300 text-gray-900 rounded-full focus:ring-primary focus:border-primary block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary dark:focus:border-primary"
                >
                  <option selected value="10">10</option>
                  <option value="20">20</option>
                  <option value="30">30</option>
                  <option value="50">50</option>
                </select>
              </div>
              <span class="">On this page</span>
            </div>
          </div>
          <div class="flex space-x-8 items-center">
            <button
              @click="createRole"
              class="px-2 text-gray-500 rounded-full border border-gray-300 flex items-center justify-center h-[35px] shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300"
            >
              <p class="truncate">Previous</p>
            </button>
            <button
              @click="createRole"
              class="px-3 bg-primary text-white rounded-full border border-gray-300 flex items-center justify-center h-[35px] shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300"
            >
              <p class="truncate text-white">Next</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import TableSection from "./TableSection.vue";

const props = defineProps({
  columnHeaders: Array,
  entries: Array,
  emptyMessage: String,
  hasActions: Boolean,
  columns: Array,
  textMessage: String,
  hasFooter: Boolean,
});
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=DM Sans");
@import url("https://fonts.googleapis.com/css?family=Ubuntu");

th {
  font-family: "Ubuntu";
  font-size: 14px;
  font-weight: 700;
  color: #343c6a;
}
td {
  font-family: "Ubuntu";
  font-size: 14px;
  font-weight: 400;
  color: #263558;
  opacity: 60%;
}

.select,
span {
  font-family: "Ubuntu";
  font-size: 14px;
  font-weight: 400;
  color: #343c6a;
}
</style>
