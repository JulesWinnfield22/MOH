<template>
    <div class="bg-white mt-10">
    <div class="min-h-[280px]  p-1  mb-6 ml-2">
     
     <div class="flex space-x-8 min-[320px]:text-center max-[600px]:flex-col justify-between mr-5">
         <div className="m-6">
             <h3>{{title}}</h3>         
         </div>
         
         <div class="flex items-center space-x-4">
             <div className="relative m-6">
   <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
     <img class="object-cover h-4 w-4" src='@/assets/img/search.png' />
 
 
 
   </div>
   <input v-if="hasSearch" type="search" placeholder="Search..." className="border border-gray-300 text-gray-900 text-sm rounded-lg pl-10 p-2.5 outline-none w-80" />
 </div>
 
           <slot name="add" v-if="hasButton">
          
             <button @click="createRole" class="px-2 text-white rounded-md border border-gray-300 bg-primary flex items-center justify-center h-[35px] shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300">
               <span class="truncate">{{titleButton}}</span>
            </button>
 
 
         </slot>
         </div>
       
         
       </div>
   <div class="overflow-x-auto px-4">
     <table class="min-w-full  rounded-lg">
       <thead class="bg-th">
         <tr>
           <th class="th px-6 py-3 text-left text-black uppercase tracking-wider">#</th> <!-- Add row number column -->
           <th v-for="header in columnHeaders" :key="header" class=" px-6 py-3 text-left text-gray-600 ">{{ header }}</th>
           <!-- If you want to add actions column, you can add it here -->
           <th v-if="hasActions" class="px-6 py-3 text-left  uppercase tracking-wider">Actions</th>
         </tr>
       </thead>
       <tbody class="bg-white pl-[100px]">
         <tr v-if="entries.length === 0" class="text-center" >
           <td :colspan="hasActions ? columnHeaders.length + 1 : columnHeaders.length" class="py-4">{{ emptyMessage || 'No data available' }}</td>
         </tr>
         <tr v-else v-for="(entry, index) in entries" :key="index" :class="index % 2 === 0 ? 'bg-white' : 'bg-tr' ">
           <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ index + 1 }}</td> <!-- Display row number -->
 
           <td v-for="col in columns" :key="col" class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ entry[col] }}</td>
           <!-- If you want to add actions column, you can add it here -->
           <td v-if="hasActions" class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"> <!-- Actions for each row go here --></td>
         </tr>
       </tbody>
    
 
 
 
 
     </table>
     <div class="mt-6 flex justify-between ml-4 mr-10">
      <div class="flex items-center m-6 space-x-3">
         <p class="">Showing 1 to of 2 entries</p>
      </div>
 
      <div>
             <div className="flex items-center m-6 space-x-3">
               <span class="text-sm">Showing</span>
               <div class="w-[90px] ">
                 <select
                   class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                   <option selected value="10">10</option>
                   <option value="20">20</option>
                   <option value="30">30</option>
                   <option value="50">50</option>
                 </select>
 
               </div>
               <span class="text-sm">On this page</span>
 
             </div>
           </div>
     <div class="flex space-x-8 items-center">
       <button @click="" class="px-2 text-gray-500 rounded-md border border-primary  flex items-center justify-center h-[35px] shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300">
               <span class="truncate">Previous</span>
            </button>
            <button @click="" class="px-2 text-gray-500 rounded-md border border-primary  flex items-center justify-center h-[35px] shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300">
               <span class="truncate">Next</span>
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
   title:String,
   hasSearch:Boolean,
   hasButton:Boolean,
   titleButton:String,
 });
 </script>
 
 <style scoped>
  @import url('https://fonts.googleapis.com/css?family=DM Sans');
  th {
   font-family: 'DM Sans';
   font-size: 14px;
   font-weight: 700;
  }
  td {
   font-family: 'DM Sans';
   font-size: 14px;
   font-weight: 400;
   line-height: 19.6px;
 
  }
 
 
 
 </style>
 
 