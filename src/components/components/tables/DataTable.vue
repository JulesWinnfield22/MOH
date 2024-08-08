<template>
   <div class="bg-section-bg">
   <div class=" mb-6 ">
  <div class="overflow-x-auto mr-2 pl-0">
    <table class="min-w-full  rounded-lg ">
      <thead class="bg-th">
        <tr>
          <th class="th px-3 py-3 text-left  uppercase tracking-wider">#</th> <!-- Add row number column -->
          <th v-for="header in columnHeaders" :key="header" class=" px-6 py-3 text-left text-gray-600 ">{{ header }}</th>
          <!-- If you want to add actions column, you can add it here -->
          <th v-if="hasActions" class="px-3 py-3 text-left   tracking-wider">Actions</th>
        </tr>
      </thead>
      <tbody class="bg-white pl-[100px] border-x-2 border-b-2">
        <tr v-if="entries.length === 0" class="text-center" >
          <td :colspan="hasActions ? columnHeaders.length + 1 : columnHeaders.length" class="py-2">{{ emptyMessage || 'No data available' }}</td>
        </tr>
        <tr v-else v-for="(entry, index) in entries" :key="index" :class="index % 2 === 0 ? 'bg-white border-b-[0.2px]' : 'bg-white border-b-[0.2px]' ">
          <td class="px-3  text-sm text-gray-900">{{ index + 1 }}</td> <!-- Display row number -->

          <td v-for="col in columns" :key="col" class="px-6 py-4  text-sm text-gray-900">{{ entry[col] }}</td>
          <!-- If you want to add actions column, you can add it here -->
          <td v-if="hasActions" class="px-3  text-sm text-gray-500">
            <svg width="17" height="12" viewBox="0 0 17 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M0.952544 0.282428C1.22211 -0.0320665 1.69559 -0.0684876 2.01008 0.201079L8.52199 5.78271L15.0339 0.201079C15.3484 -0.0684876 15.8219 -0.0320665 16.0914 0.282428C16.361 0.596922 16.3246 1.0704 16.0101 1.33996L9.01008 7.33996C8.72921 7.58071 8.31476 7.58071 8.03389 7.33996L1.03389 1.33996C0.719398 1.0704 0.682977 0.596922 0.952544 0.282428ZM0.952544 4.28243C1.22211 3.96793 1.69559 3.93151 2.01008 4.20108L8.52199 9.78271L15.0339 4.20108C15.3484 3.93151 15.8219 3.96793 16.0914 4.28243C16.361 4.59692 16.3246 5.0704 16.0101 5.33996L9.01008 11.34C8.72921 11.5807 8.31476 11.5807 8.03389 11.34L1.03389 5.33996C0.719398 5.0704 0.682977 4.59692 0.952544 4.28243Z" fill="#7063EE"/>
          </svg>

            </td>
        </tr>

        

      </tbody>
  

    </table>
    <div class=" flex justify-between ml-4 mr-10" v-if="hasFooter">
     <div class="flex items-center m-6 space-x-3">
        <span class="">Showing 1 to of 2 entries</span>
     </div>

     <div>
            <div className="flex items-center m-6 space-x-3">
              <span class="">Showing</span>
              <div class="w-[90px] ">
                <select
                  class="h-[35px] text-center  bg-gray-50 border border-gray-300 text-gray-900 rounded-full focus:ring-primary focus:border-primary block w-full  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary dark:focus:border-primary">
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
      <button @click="createRole" class="px-2 text-gray-500 rounded-full border border-gray-300  flex items-center justify-center h-[35px] shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300">
              <p class="truncate">Previous</p>
           </button>
          <button @click="createRole" class="px-3 bg-primary text-white rounded-full border border-gray-300  flex items-center justify-center h-[35px] shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300">
              <p class="truncate text-white">Next</p>
           </button>
                
               </div>
</div>
  </div>
</div>
  </div>
</template>

<script setup>
const props = defineProps({
  columnHeaders: Array,
  entries: Array,
  emptyMessage: String,
  hasActions: Boolean,
  columns: Array,
  textMessage: String,
  hasFooter:Boolean
});
</script>

<style scoped>
 @import url('https://fonts.googleapis.com/css?family=DM Sans');
  @import url('https://fonts.googleapis.com/css?family=Ubuntu');

  th {
  font-family: 'Ubuntu';
  font-size: 14px;
  font-weight: 700; 
  color: #343C6A;
 }
 td {
   font-family: 'Ubuntu';
   font-size: 14px;
   font-weight: 400;
   color: #263558;
   opacity: 60%;

 
  }

  .select,span {
  font-family: 'Ubuntu';
  font-size: 14px;
  font-weight: 400; 
  color: #343C6A;
  }





</style>

