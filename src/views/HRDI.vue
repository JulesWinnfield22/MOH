<script setup lang="ts">
  import {getAllUniversities ,getAllStudents} from '@/features/university/api/uniApI'
  import TableRowSkeleton from '@skl/TableRowSkeleton.vue'
  
  import { usePagination } from '@/composables/usePagination'

import { ref, watch } from 'vue'
import { usePaginationTemp} from '../composables/usePaginaionTemp'
import { useApiRequest } from '../composables/useApiRequest'
import { importNewBatch } from '../features/hrdi/hrdiAPi'
import { addStudent, getStudents ,} from './pages/api/StudentApi'
import { getBatchStudents} from './pages/api/BatchApi'
import Table from '@com/Table.vue'
	import Button from '@com/Button.vue'
import { toasted } from '@/utils/utils'
const currentItem = ref({})
const showModalAdd = ref(false)
const isEditing = ref(null)
const name = ref('')
const program = ref('')
const gender = ref('')
const empId = ref('')
const phone = ref('')
const address = ref('')
const maritalStatus = ref('')
const studentDetail = ref({})
const currentPage = ref(2)
const totalPages = ref(5)
const open = ref(false)

const pagination = usePaginationTemp({
  cb: getStudents,
  
})
const paginationed = usePaginationTemp({
  cb:getBatchStudents,
  
})

const paginationn = usePagination({
    cb: getAllUniversities
  })
  const paginations = usePagination({
    cb: getAllStudents
  })

watch(pagination.data, () => {
  console.log(pagination)
}, {deep: true})


const isModalOpen = ref(false)

function openModal(item) {
  currentItem.value = { ...item } // Create a copy of the item to edit
  isModalOpen.value = true
}
function editRow(index) {
  isEditing.value = index
}

function closeModal() {
  isModalOpen.value = false
}
const student = useApiRequest()
function saveStudent() {
  console.log('hfhgfh')
  student.send(() => addStudent(studentDetail.value))
}

function updateItem() {
  const index = items.value.findIndex(item => item.Id === currentItem.value.Id)
  if (index !== -1)
    items.value.splice(index, 1, currentItem.value) // Update the item in the array

  closeModal()
}

const hrdiReq = useApiRequest()
const progress = ref()

const file = ref()
function uploadFile() {
  const fd = new FormData()
  fd.append('file', file.value)
  hrdiReq.send(
    () => importNewBatch(fd, {
      onUploadProgress(ev) {
        const per = ev.loaded / ev.total * 100
        progress.value.setAttribute('data-per', Math.floor(per))
        progress.value.style.setProperty('width', `${per}%`)
      },
    }),
    (res) => {
      if (res.success)
        file.value = ''
        toasted(res.success, 'Successfully Uploaded', res.error)
    },
  )
}

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

function handleFileUpload(event) {
  const file = event.target.files[0]
  // Handle the file upload logic here
  // You can use a library like "xlsx" to read the Excel file
  // For example:
  // const workbook = XLSX.read(file, { type: "array" });
  // const sheetName = workbook.SheetNames[0];
  // const worksheet = workbook.Sheets[sheetName];
  // const data = XLSX.utils.sheet_to_json(worksheet);
  // ...
}

const fileInput = ref(null)
</script>

<template>
  <div class="bg-[#FBFBFB] relative">
    <div v-if="hrdiReq.pending.value" class="z-10 flex justify-center fixed inset-0 bg-dark/40">
      <div class="w-[16rem]" />
      <div class="flex-1 h-full p-4 flex flex-col justify-center">
        <div class="bg-white rounded p-4 flex flex-col gap-2">
          <p>import</p>
          <div class="h-10 rounded overflow-hidden bg-red-200 relative">
            <div ref="progress" class="progress absolute rounded w-0 top-0 left-0 inset-0 bg-secondary" />
          </div>
        </div>
      </div>
    </div>
    <div>
      
     
	

      <div
        v-if="showModalAdd"
        class="fixed z-10 inset-0 overflow-y-auto"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div class="flex items-center justify-center min-h-screen bg-gray-100">
          <div class="fixed inset-0 bg-gray-600 bg-opacity-50 transition-opacity" aria-hidden="true" @click="showModalAdd = false" />
          <div class="flex items-center justify-center min-h-screen bg-gray-50 py-4">
            <div class="fixed inset-0 bg-gray-600 bg-opacity-50 transition-opacity" aria-hidden="true" @click="showModalAdd = false" />

            <div class="relative bg-white rounded-lg shadow-lg  w-[1500px] overflow-hidden transform transition-all sm:max-w-2xl mx-4">
              <form @submit.prevent="saveStudent">
                <div class="bg-white px-4 py-3">
                  <div class="text-center mb-4">
                    <h3 class="text-lg text-left font-semibold leading-6 text-gray-900">
                      Add Student Information
                    </h3>
                  </div>
                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-x-16 gap-y-3">
                    <!-- Adjusted horizontal and vertical gap -->
                    <!-- Field for Name -->
                    <div class="flex flex-col">
                      <label for="name" class="block text-sm font-medium text-gray-700">title</label>
                      <input id="name" v-model="studentDetail.title" type="text" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Enter student name">
                    </div>

                    <!-- Field for Employee ID -->
                    <div class="flex flex-col">
                      <label for="empId" class="block text-sm font-medium text-gray-700"> firstName</label>
                      <input id="empId" v-model="studentDetail.firstName" type="text" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Enter student employee ID">
                    </div>
                    <div class="flex flex-col">
                      <label for="empId" class="block text-sm font-medium text-gray-700"> fathersName</label>
                      <input id="empId" v-model="studentDetail.fathersName" type="text" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Enter student employee ID">
                    </div>
                    <div class="flex flex-col">
                      <label for="empId" class="block text-sm font-medium text-gray-700"> grandFathersName</label>
                      <input id="empId" v-model="studentDetail.grandFathersName" type="text" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Enter student employee ID">
                    </div>

                    <!-- Field for Address -->

                    <!-- Field for Marital Status -->
                    <div class="flex flex-col">
                      <label for="maritalStatus" class="block text-sm font-medium text-gray-700">gender Status</label>
                      <select id="maritalStatus" v-model="studentDetail.gender" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                        <option value="" disabled selected>
                          gender
                        </option>
                        <option value="male">
                          male
                        </option>
                        <option value="female">
                          Female
                        </option>
                      </select>
                    </div>

                    <!-- Field for Phone -->
                    <div class="flex flex-col">
                      <label for="phone" class="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                      <div class="flex items-center space-x-4">
                        <!-- Adjusted width and padding -->
                        <select id="countryCode" v-model="studentDetail.countryCode" class="block w-1/4 min-w-[80px] border border-gray-300 rounded-l-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm px-2">
                          <option value="+251" selected>
                            +251
                          </option>
                          <option value="+1">
                            +1
                          </option>
                          <option value="+44">
                            +44
                          </option>
                          <option value="+91">
                            +91
                          </option>
                        </select>
                        <input id="phone" v-model="studentDetail.phone" type="tel" class="block w-3/4 border border-gray-300 rounded-r-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="555 1234567">
                      </div>
                    </div>
                    <div class="flex flex-col">
                      <label for="program" class="block text-sm font-medium text-gray-700">birthDate</label>
                      <input id="program" v-model="studentDetail.birthDate" type="text" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Enter student program">
                    </div>
                    <div class="flex flex-col">
                      <label for="program" class="block text-sm font-medium text-gray-700">duration</label>
                      <input id="program" v-model="studentDetail.duration" type="text" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Enter student program">
                    </div>
                    <div class="flex flex-col">
                      <label for="program" class="block text-sm font-medium text-gray-700">salary</label>
                      <input id="program" v-model="studentDetail.salary" type="text" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Enter student program">
                    </div>
                    <div class="flex flex-col">
                      <label for="program" class="block text-sm font-medium text-gray-700">totalSalary</label>
                      <input id="program" v-model="studentDetail.totalSalary" type="text" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Enter student program">
                    </div>
                    <div class="flex flex-col">
                      <label for="maritalStatus" class="block text-sm font-medium text-gray-700">Marital Status</label>
                      <select id="maritalStatus" v-model="studentDetail.martialStatus" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                        <option value="" disabled selected>
                          Select marital status
                        </option>
                        <option value="married">
                          Married
                        </option>
                        <option value="unmarried">
                          Unmarried
                        </option>
                      </select>
                    </div>
                    <div class="flex flex-col">
                      <label for="program" class="block text-sm font-medium text-gray-700">program</label>
                      <input id="program" v-model="studentDetail.program" type="text" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Enter student program">
                    </div>
                    <div class="flex flex-col">
                      <label for="program" class="block text-sm font-medium text-gray-700">university</label>
                      <input id="program" v-model="studentDetail.university" type="text" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Enter student program">
                    </div>
                    <div class="flex flex-col">
                      <label for="program" class="block text-sm font-medium text-gray-700">ernp_id</label>
                      <input id="program" v-model="studentDetail.ernp_id" type="text" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Enter student program">
                    </div>
                  </div>
                </div>
                <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button type="submit" class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto">
                    Save
                  </button>
                  <button type="button" class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto" @click="showModalAdd = false">
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="flex justify-between items-center">
     
      <div class="p-4  text-[#4E585F] font-dm-sans text-[16px] font-bold leading-[24px] text-left">
        HRDI
      </div>
      <div />
      <div class="p-4 flex items-center gap-2">
        <div class="bg-[#21618C] text-white  flex gap-2 font-dm-sans  p-2 rounded-md">
          <label class="flex gap-2">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20.5348 3.46447C19.0704 2 16.7133 2 11.9993 2C7.28525 2 4.92823 2 3.46377 3.46447C2.70628 4.22195 2.3406 5.21824 2.16406 6.65598C2.69473 6.06532 3.33236 5.57328 4.04836 5.20846C4.82984 4.81027 5.66664 4.6488 6.59316 4.5731C7.48829 4.49997 8.58971 4.49998 9.93646 4.5H14.0621C15.4089 4.49998 16.5103 4.49997 17.4054 4.5731C18.332 4.6488 19.1688 4.81027 19.9502 5.20846C20.6662 5.57328 21.3039 6.06532 21.8345 6.65598C21.658 5.21824 21.2923 4.22195 20.5348 3.46447Z" fill="white" />
              <path fill-rule="evenodd" clip-rule="evenodd" d="M2 14C2 11.1997 2 9.79961 2.54497 8.73005C3.02433 7.78924 3.78924 7.02433 4.73005 6.54497C5.79961 6 7.19974 6 10 6H14C16.8003 6 18.2004 6 19.27 6.54497C20.2108 7.02433 20.9757 7.78924 21.455 8.73005C22 9.79961 22 11.1997 22 14C22 16.8003 22 18.2004 21.455 19.27C20.9757 20.2108 20.2108 20.9757 19.27 21.455C18.2004 22 16.8003 22 14 22H10C7.19974 22 5.79961 22 4.73005 21.455C3.78924 20.9757 3.02433 20.2108 2.54497 19.27C2 18.2004 2 16.8003 2 14ZM12.5303 17.5303C12.3897 17.671 12.1989 17.75 12 17.75C11.8011 17.75 11.6103 17.671 11.4697 17.5303L8.96967 15.0303C8.67678 14.7374 8.67678 14.2626 8.96967 13.9697C9.26256 13.6768 9.73744 13.6768 10.0303 13.9697L11.25 15.1893V11C11.25 10.5858 11.5858 10.25 12 10.25C12.4142 10.25 12.75 10.5858 12.75 11V15.1893L13.9697 13.9697C14.2626 13.6768 14.7374 13.6768 15.0303 13.9697C15.3232 14.2626 15.3232 14.7374 15.0303 15.0303L12.5303 17.5303Z" fill="white" />
            </svg>

            <p>Import New Batch</p>
            <input
  accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
  type="file"
  class="hidden"
  @change="ev => {
    file = ev.target.files?.[0]
  }"
/>

          </label>
        </div>
        <button v-if="file" class="rounded bg-green-500 text-white p-2" @click="uploadFile">
          upload
        </button>
      </div>
    </div>

    <div class="bg-[#FBFBFB] p-4 rounded-md mb-4 text-[#4E585F]">
      <!-- <table class="min-w-full bg-white border border-gray-300">
        <thead>
          <tr class="bg-gray-200">
            <th class="text-left w-[13px] Table-header">
              #
            </th>
            <th class="w-[160px] Table-header">
              Batch ID
            </th>
            <th class="w-[207px] Table-header">
              University
            </th>
            <th class="w-[60px] Table-header">
              Location
            </th>
            <th class="w-[160px] Table-header">
              No of members
            </th>
            <th class="w-[190px] Table-header">
              memo
            </th>
            <th class="w-[10px] Table-header">
              Status
            </th>
            <th class="w-[10px] Table-header">
              Status
            </th>
            <th class="Table-header" />
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in items" :key="index" class="hover:bg-gray-100 Table-contents">
            <td class="h-[18px] w-[5px] Table-contents">
              {{ index + 1 }}
            </td>
            <td class="h-[42px] w-[160px] Table-contents">
              {{ item.Id }}
            </td>
            <td class="h-[43px] w-[215px] Table-contents">
              {{ item.University }}
            </td>
            <td class="w-[100px] Table-contents">
              {{ item.Location }}
            </td>
            <td class="w-[120px] Table-contents">
              {{ item.TotalMembers }}
            </td>
            <td class="h-[42px] w-[190px] Table-contents">
              {{ item.memo }}
            </td>
            <th class="w-[10px] Table-header">
              Status
            </th>
            <td class="w-[100px] Table-contents">
              <span :style="{ color: item.status === 'Confirmed' ? '#36CB56' : 'inherit' }">{{ item.status }}</span>
            </td>
            <td>
              <button class="text-end button-open" @click="openModal(item)">
                Open
              </button>
            </td>
          </tr>
        </tbody>
      </table> -->
      <Table class="Table-header"
    :pending="paginations.pending.value"
    :Fallback="TableRowSkeleton"
   
    :headers="{
      head: ['BatchId', 'Universities','No of Members','memo', 'actions',],
      row: ['batchNumber','universityCount','studentCount','	This are the new requested members...',]
    }"
    :rows="paginations.data.value || []"
  > 
    <template #actions="{row}">
      <button class="text-[#21618C] text-sm hover:italic hover:underline" @click="$router.push(`/student-batch/${row?.batchNumber}`)">
         Open
      </button>
    </template>
  </Table>
      <div v-if="isModalOpen" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 overflow-auto">
        <div>
          <div class="relative w-full ml-[200px] my-10 bg-white border border-gray-300 rounded-lg shadow-md p-4">
            <!-- Table Container -->
            <div class="overflow-x-auto">
              <h2 class="text-lg my-10 bg-[#FBFBFB] font-dm-sans font-bold">
                Edit Student
              </h2>
              <table class=" bg-white border border-gray-300 rounded-lg shadow-md">
                <thead>
                  <tr class="bg-gray-200 text-left border-b">
                    <th class="p-2 w-[23.5px]" />
                    <th class="p-2 w-[13px]">
                      #
                    </th>
                    <th class="p-2 w-[70px]">
                      IHRS ID
                    </th>
                    <th class="p-2 w-[208px]">
                      Full Name
                    </th>
                    <th class="p-2 w-[70px]">
                      Gender
                    </th>
                    <th class="p-2 w-[100px]">
                      Program
                    </th>
                    <th class="p-2 w-[100px]">
                      Address
                    </th>
                    <th class="p-2 w-[100px]">
                      Email
                    </th>
                    <th class="p-2 w-[100px]">
                      Maritial Status
                    </th>
                    <th class="p-2 w-[100px]">
                      UniversityName
                    </th>
                    <th class="p-2 w-[100px]">
                      Program Name
                    </th>
                    <th class="p-2 w-[70px]">
                      Duration
                    </th>
                    <th class="p-2 w-[66px]">
                      Salary
                    </th>
                    <th class="p-2 w-[84px]">
                      Contract Amount
                    </th>
                    <!-- <th class="p-2 w-[74px]">
                      Status
                    </th> -->
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(item, index) in pagination.data.value"
                    :key="index"
                    class="hover:bg-gray-100 cursor-pointer transition"
                    @dblclick="editRow(index)"
                  >
                    <td class="p-2 border-b">
                      <input id="option" type="checkbox" class="w-4 h-4">
                    </td>
                    <td class="p-2 border-b">
                      {{ index + 1 }}
                    </td>
                    <td class="p-2 border-b">
                      {{ item.ermpId }}
                    </td>
                    <td class="p-2 border-b">
                      <template v-if="isEditing === index">
                        <input v-model="item.fullName" class="border rounded p-1 w-full">
                      </template>
                      <template v-else>
                        {{ item.fullName }}
                      </template>
                    </td>
                    <td class="p-2 border-b">
                      <template v-if="isEditing === index">
                        <input v-model="item.gender" class="border rounded p-1 w-full">
                      </template>
                      <template v-else>
                        {{ item.gender }}
                      </template>
                    </td>
                    <td class="p-2 border-b">
                      <template v-if="isEditing === index">
                        <input v-model="item.phone" class="border rounded p-1 w-full">
                      </template>
                      <template v-else>
                        {{ item.phone }}
                      </template>
                    </td>
                    <td class="p-2 border-b">
                      <template v-if="isEditing === index">
                        <input v-model="item.address" class="border rounded p-1 w-full">
                      </template>
                      <template v-else>
                        {{ item.address }}
                      </template>
                    </td>
                    <td class="p-2 border-b">
                      <template v-if="isEditing === index">
                        <input v-model="item.email" class="border rounded p-1 w-full">
                      </template>
                      <template v-else>
                        {{ item.email }}
                      </template>
                    </td>
                    <td class="p-2 border-b">
                      <template v-if="isEditing === index">
                        <input v-model="item.martialStatus" class="border rounded p-1 w-full">
                      </template>
                      <template v-else>
                        {{ item.martialStatus }}
                      </template>
                    </td>
                    <td class="p-2 border-b">
                      <template v-if="isEditing === index">
                        <input v-model="item.universityName" class="border rounded p-1 w-full">
                      </template>
                      <template v-else>
                        {{ item.universityName }}
                      </template>
                    </td>
                    <td class="p-2 border-b">
                      <template v-if="isEditing === index">
                        <input v-model="item.programName" class="border rounded p-1 w-full">
                      </template>
                      <template v-else>
                        {{ item.programName }}
                      </template>
                    </td>
                    <td class="p-2 border-b">
                      <template v-if="isEditing === index">
                        <input v-model="item.duration" class="border rounded p-1 w-full">
                      </template>
                      <template v-else>
                        {{ item.duration }}
                      </template>
                    </td>
                    <td class="p-2 border-b">
                      <template v-if="isEditing === index">
                        <input v-model="item.salary" class="border rounded p-1 w-full">
                      </template>
                      <template v-else>
                        {{ item.salary }}
                      </template>
                    </td>

                    <td class="p-2 border-b">
                      <template v-if="isEditing === index">
                        <input v-model="item.totalSalary" class="border rounded p-1 w-full">
                      </template>
                      <template v-else>
                        {{ item.totalSalary }}
                      </template>
                    </td>
                    <!-- <td class="p-2 border-b">
                      <template v-if="isEditing === index">
                        <input v-model="item.status" class="border rounded p-1 w-full">
                      </template>
                      <template v-else>
                        {{ item.status }}
                      </template>
                    </td> -->
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Action Buttons -->
            <div class="flex justify-end gap-4 mt-4">
              <button type="button" class="bg-[#21618C] text-white p-2 rounded hover:bg-[#1d5a80]" @click="updateItem">
                Approve
              </button>
              <button type="button" class="bg-[#FF4040] text-white p-2 rounded hover:bg-[#d63031]" @click="closeModal">
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="p-4 flex flex-col items-center">
        <div class="w-full">
          <!-- Your content goes here -->
        </div>
        <!-- <div class="p-4 flex justify-between items-center w-full mt-4">
          <button class="bg-gray-200 px-4 py-2 rounded-md hover:bg-gray-300 mr-4" @click="prevPage">
            <span class="flex items-center">
              <svg
                class="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              PREV
            </span>
          </button>
          <div class="flex">
            <button
              v-for="page in totalPages"
              :key="page"
              class="bg-[#FBFBFB] px-3 py-2 rounded-md mx-1 hover:bg-gray-300"
              :class="{ 'bg-gray-400': currentPage === page }"
              @click="goToPage(page)"
            >
              {{ page }}
            </button>
          </div>
          <button class="bg-[#21618C] px-4 py-2 rounded-md text-white hover:bg-blue-500 ml-4" @click="nextPage">
            <span class="flex items-center">
              NEXT
              <svg
                class="w-5 h-5 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </span>
          </button>
        </div> -->
      </div>
    </div>
  </div>
</template>

<style scope>
.modal {
  transition: opacity 0.25s ease;
}
.Table-header{
  font-family: "DM Sans";
  text-align: left;
  height: 21px;
  padding-top: 0.5rem; /* 2 units in Tailwind are equal to 0.5rem */
  padding-bottom: 0.5rem;
  line-height: 21px;
  font-size: 14px;
  font-weight: bold;
  color: #4E585F;

}

.Table-contents{
  font-family: "DM Sans";
  text-align: left;
  height: 21px;
  padding-top: 0.5rem; /* 2 units in Tailwind are equal to 0.5rem */
  padding-bottom: 0.5rem;
  line-height: 21px;
  font-size: 14px;
  font-weight: normal;
  color: #4E585F;

}

.button-open{
  font-family: "DM Sans";
  text-align: end;
  height: 21px;
  width: 66px;
  padding-block-start: 0.5rem; /* 2 units in Tailwind are equal to 0.5rem */
  padding-block-end: 0.5rem;
  line-height: 21px;
  font-size: 14px;
  font-weight: bold;
  color: #21618C;

}

.progress {
  width: var(--width, 10%);
  display: flex;
  align-items: center;
  justify-content: end;
  transition: all .3s linear
}

.progress::after {
  content: attr(data-per) '%';
  margin-left: -2.5rem;
  padding: 3px;
  color: white
}
</style>
