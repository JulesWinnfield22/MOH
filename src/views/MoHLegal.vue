<script setup>
import { ref } from 'vue'
import { usePaginationTemp } from '../composables/usePaginaionTemp'
import { getStudents } from '../views/pages/api/StudentApi'

const selectedItem = ref(null)
const isModalVisible = ref(false)
const isModalVisibleApprove = ref(false)
const isModalVisibleContractReview = ref(false)
const reason = ref('')
const currentPage = ref(1)
const totalPages = ref(5)
const currentItem = ref({})
const isEditing = ref(null)
const open = ref(false)
const selectedCount = ref(0)
const totalStudents = ref(72) // Example total number of students
const items = ref([])

const pagination = usePaginationTemp({
  cb: (data, config) => getStudents(),
})

// Functions to handle modal visibility
function showModal() {
  isModalVisible.value = true // Show the reject modal
}

function showModalApprove(item) {
  selectedItem.value = item
  isModalVisibleApprove.value = true // Show the approve modal
}

function showModalContractReview() {
  isModalVisibleApprove.value = false // Close the approve modal
  isModalVisibleContractReview.value = true // Open contract review modal
  currentItem.value = { ...selectedItem.value } // Create a copy of the item to edit
}

// Function to confirm approval
function confirmApproval() {
  if (selectedItem.value) {
    // Update the status directly in the local state
    selectedItem.value.status = 'Confirmed'
    updateItem(selectedItem.value) // Update the item in the list
    closeModal()
  }
}

// Function to update an item in the list
function updateItem(item) {
  const index = items.value.findIndex(i => i.id === item.id)
  if (index !== -1) {
    items.value.splice(index, 1, item) // Update the item in the array
  }
}

// Function to submit reason for rejection
function submitReason() {
  console.log('Reason for rejection:', reason.value)
  closeModal() // Close the modal after submission
  reason.value = '' // Clear the reason
}

// Function to submit reason for approval
function submitReasonForApproval() {
  console.log('Reason for Approval:', reason.value)
  closeModal() // Close the modal after submission
  reason.value = '' // Clear the reason
}

// Functions to close modals
function closeModal() {
  isModalVisible.value = false
  isModalVisibleApprove.value = false
  isModalVisibleContractReview.value = false
  selectedItem.value = null
}

function closeContractModal() {
  isModalVisibleContractReview.value = false
  isModalVisibleApprove.value = true
}

// Pagination functions
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

// Selection functions
const selected = ref([])

function selectUser(item) {
  const idx = selected.value.findIndex(el => item.ernpId === el.ernpId)
  if (idx === -1) {
    selected.value.push(item)
  } else {
    selected.value.splice(idx, 1)
  }
}

function isSelected(item) {
  return selected.value.some(el => el.ernpId === item.ernpId)
}
</script>

<template>
  <div class="bg-[#FBFBFB]">
    <div class="flex justify-between items-center">
      <div class="p-4  text-[#4E585F] font-dm-sans text-[16px] font-bold leading-[24px] text-left">
        Students
      </div><div />
      <div class="p-4 gap-2.5 flex">
        <p class="p-4  text-[#4E585F] font-dm-sans text-[14px] font-normal leading-[24px] text-left">
          Selected {{  selected.length  }} of {{ pagination.data.value.length  }} Students
        </p>

        <div>
          <button
            style="width: 129px; height: 40px; padding: 8px 16px; margin-right: 10px;  border-radius: 6px 6px 6x 6px; ;"
            class="mt-1.5 flex  font-dm-sans bg-[#FF4040] text-white font-bold rounded hover:bg-[#FF4040]"
            @click="showModal"
          >
            <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 2C9.17157 2 8.5 2.67157 8.5 3.5V4.5C8.5 5.32843 9.17157 6 10 6H15C15.8284 6 16.5 5.32843 16.5 4.5V3.5C16.5 2.67157 15.8284 2 15 2H10Z" fill="white" />
              <path fill-rule="evenodd" clip-rule="evenodd" d="M4.37868 4.87694C4.94798 4.30764 5.74209 4.10719 7 4.03662V4.5C7 6.15685 8.34315 7.5 10 7.5H15C16.6569 7.5 18 6.15685 18 4.5V4.03662C19.2579 4.10719 20.052 4.30764 20.6213 4.87694C21.5 5.75562 21.5 7.16983 21.5 9.99826V15.9983C21.5 18.8267 21.5 20.2409 20.6213 21.1196C19.7426 21.9983 18.3284 21.9983 15.5 21.9983H9.5C6.67157 21.9983 5.25736 21.9983 4.37868 21.1196C3.5 20.2409 3.5 18.8267 3.5 15.9983V9.99826C3.5 7.16983 3.5 5.75562 4.37868 4.87694ZM12.5 13.4394L10.5303 11.4697C10.2374 11.1768 9.76256 11.1768 9.46967 11.4697C9.17678 11.7626 9.17678 12.2374 9.46967 12.5303L11.4394 14.5L9.46969 16.4697C9.1768 16.7626 9.1768 17.2374 9.46969 17.5303C9.76258 17.8232 10.2375 17.8232 10.5304 17.5303L12.5 15.5607L14.4696 17.5303C14.7625 17.8232 15.2374 17.8232 15.5303 17.5303C15.8232 17.2374 15.8232 16.7625 15.5303 16.4697L13.5607 14.5L15.5303 12.5303C15.8232 12.2375 15.8232 11.7626 15.5303 11.4697C15.2374 11.1768 14.7626 11.1768 14.4697 11.4697L12.5 13.4394Z" fill="white" />
            </svg>
            Reject
          </button>

          <div v-if="isModalVisible" class="fixed inset-0 ml-40 flex items-center justify-center bg-black bg-opacity-50">
            <div class="bg-white rounded-lg shadow-lg gap-3 flex flex-col space-between-[24px] p-6 w-[877px] h-[302px]">
              <div class=" flex justify-between">
                <h2 class="text-left flex font-dm-sans leading-[24px] text-[14px] font-bold text-[#4E585F]">
                  Reject?
                </h2>
                <button class="h-[13px] w-[13px] px-4 py-2 rounded" @click="closeModal">
                  <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15 2L2.00005 14.9999M2 1.99995L14.9999 14.9999" stroke="#FF4040" stroke-width="3.5" stroke-linecap="round" />
                  </svg>
                </button>
              </div>
              <textarea
                v-model="reason"
                placeholder="State the reason for rejection"
                class="border w-[829px] h-[158px] border-[#D9D9D9] bg-[#FBFBFB] rounded p-2 mb-4"
              />
              <div class="flex justify-end">
                <button class="bg-[#FF4040] h-[40px] w-[82px] text-white px-4 py-2 rounded mr-2" @click="submitReason">
                  Reject
                </button>
                <button class="bg-gray-300 text-gray-700 px-4 py-2 rounded" @click="closeModal">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
        <div>
          <button
            style="width: 129px; height: 40px; padding: 8px 16px; margin-right: 10px;  border-radius: 6px 6px 6x 6px; ;"
            class="mt-1.5 flex  font-dm-sans bg-[#36CB56] text-white font-bold rounded hover:bg-[#36CB56] "
            @click="showModalApprove(item)"
          >
            <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 2C9.17157 2 8.5 2.67157 8.5 3.5V4.5C8.5 5.32843 9.17157 6 10 6H15C15.8284 6 16.5 5.32843 16.5 4.5V3.5C16.5 2.67157 15.8284 2 15 2H10Z" fill="white" />
              <path fill-rule="evenodd" clip-rule="evenodd" d="M7 4.03662C5.74209 4.10719 4.94798 4.30764 4.37868 4.87694C3.5 5.75562 3.5 7.16983 3.5 9.99826V15.9983C3.5 18.8267 3.5 20.2409 4.37868 21.1196C5.25736 21.9983 6.67157 21.9983 9.5 21.9983H15.5C18.3284 21.9983 19.7426 21.9983 20.6213 21.1196C21.5 20.2409 21.5 18.8267 21.5 15.9983V9.99826C21.5 7.16983 21.5 5.75562 20.6213 4.87694C20.052 4.30764 19.2579 4.10719 18 4.03662V4.5C18 6.15685 16.6569 7.5 15 7.5H10C8.34315 7.5 7 6.15685 7 4.5V4.03662ZM16.0117 12.5483C16.3146 12.2657 16.3309 11.7911 16.0483 11.4883C15.7657 11.1855 15.2911 11.1691 14.9883 11.4517L11.2143 14.9741L10.0117 13.8517C9.70893 13.5691 9.23434 13.5855 8.95171 13.8883C8.66909 14.1911 8.68545 14.6657 8.98826 14.9483L10.7025 16.5483C10.9907 16.8172 11.4379 16.8172 11.726 16.5483L16.0117 12.5483Z" fill="white" />
            </svg>
            Approve
          </button>
          <div v-if="isModalVisibleApprove" class="fixed inset-0 ml-40 flex items-center justify-center bg-black bg-opacity-50">
            <div class="bg-white rounded-lg shadow-lg gap-3 flex flex-col space-between-[24px] p-6 w-[877px] h-[302px]">
              <div class=" flex justify-between">
                <h2 class="text-left flex font-dm-sans leading-[24px] text-[14px] font-bold text-[#4E585F]">
                  Approve?
                </h2>
                <button class="h-[13px] w-[13px] px-4 py-2 rounded" @click="closeModal">
                  <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15 2L2.00005 14.9999M2 1.99995L14.9999 14.9999" stroke="#FF4040" stroke-width="3.5" stroke-linecap="round" />
                  </svg>
                </button>
              </div>
              <textarea
                v-model="reason"
                placeholder="State any note or remark"
                class="border w-[829px] h-[158px] border-[#D9D9D9] bg-[#FBFBFB] rounded p-2 mb-4"
              />
              <div class="flex justify-end">
                <button class="bg-[#092537] h-[40px] w-[186.38px] flex items-center gap-2 text-white px-4 py-2 rounded mr-2" @click="showModalContractReview">
                  <svg width="17" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M6.84191 0.718047V17.2924L12.0247 17.2924C14.3702 17.2924 15.5429 17.2924 16.2715 16.5638C17.0002 15.8352 17.0002 14.6624 17.0002 12.317V5.683C17.0002 3.33754 17.0002 2.1648 16.2715 1.43616C15.5429 0.70752 14.3702 0.70752 12.0247 0.70752H7.04922L6.84191 0.718047ZM8.5004 4.43913C8.5004 4.09564 8.77885 3.81719 9.12234 3.81719H13.2686C13.6121 3.81719 13.8905 4.09564 13.8905 4.43913C13.8905 4.78261 13.6121 5.06106 13.2686 5.06106H9.12234C8.77885 5.06106 8.5004 4.78261 8.5004 4.43913ZM8.5004 7.34149C8.5004 6.99801 8.77885 6.71956 9.12234 6.71956H13.2686C13.6121 6.71956 13.8905 6.99801 13.8905 7.34149C13.8905 7.68498 13.6121 7.96343 13.2686 7.96343H9.12234C8.77885 7.96343 8.5004 7.68498 8.5004 7.34149ZM2.07432 5.06106C2.07999 3.12417 2.14121 2.09734 2.80238 1.43616C3.36211 0.876433 4.1839 0.746677 5.59804 0.716597V17.2834C4.1839 17.2533 3.36211 17.1235 2.80238 16.5638C2.14121 15.9026 2.07999 14.8758 2.07432 12.9389H2.90299C3.24647 12.9389 3.52492 12.6605 3.52492 12.317C3.52492 11.9735 3.24647 11.695 2.90299 11.695H2.07374V9.62192H2.90299C3.24647 9.62192 3.52492 9.34347 3.52492 8.99998C3.52492 8.6565 3.24647 8.37805 2.90299 8.37805H2.07374V6.30493H2.90299C3.24647 6.30493 3.52492 6.02648 3.52492 5.683C3.52492 5.33951 3.24647 5.06106 2.90299 5.06106H2.07432ZM2.07432 5.06106H1.24449C0.901008 5.06106 0.622559 5.33951 0.622559 5.683C0.622559 6.02648 0.901008 6.30493 1.24449 6.30493H2.07374V5.683C2.07374 5.46583 2.07374 5.25871 2.07432 5.06106ZM2.07374 9.62192H1.24449C0.901008 9.62192 0.622559 9.34347 0.622559 8.99998C0.622559 8.6565 0.901008 8.37805 1.24449 8.37805H2.07374V9.62192ZM2.07374 11.695H1.24449C0.901008 11.695 0.622559 11.9735 0.622559 12.317C0.622559 12.6605 0.901008 12.9389 1.24449 12.9389H2.07432C2.07374 12.7413 2.07374 12.5341 2.07374 12.317V11.695Z" fill="white" />
                  </svg>
                  <p>
                    Contract Review
                  </p>
                </button>
                <button class="bg-[#36CB56] text-[#FFFFFF] h-[40px] w-[98px] font-sans px-4 py-2 rounded" @click="confirmApproval">
                  Approve
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="flex justify-center items-center ">
      <table class="min-w-full mx-auto bg-white border border-gray-300">
        <thead>
          <tr class="bg-gray-200 justify-between Table-header">
            <th class="  w-[23.5px] border-b" />
            <th class="  w-[13px] border-b">
              #
            </th>
            <th class=" w-[70px] ">
              Ernp ID
            </th>
            <th class=" w-[208px] ">
              Full Name
            </th>
            <!-- <th class=" w-[208px] ">
              Email
            </th>
            <th class=" w-[208px] ">
              Date Of Birth
            </th>
            <th class=" w-[208px] ">
              phone
            </th> -->
            <th class=" w-[208px] ">
              Gender
            </th>
            <th class=" w-[100px] ">
              Program
            </th>
            <th class=" w-[70px] ">
              Duration
            </th>
            <th class=" w-[66px] ">
              Salary
            </th>
            <th class=" w-[84px] ">
              Contract Amount
            </th>
            <!-- <th class=" w-[84px] ">
              Unversity Name
            </th>
            <th class=" w-[84px] ">
              Program Name
            </th> -->

            <th class=" w-[74px] ">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
    v-for="(item, index) in pagination.data.value.filter(item => item.registrationStatus === 'registered')"
    :key="index"
    :class="{
      'bg-gray-200': isSelected(item),
      'hover:bg-gray-100': !isSelected(item)
    }"
    class="Table-contents"
  >
          
            <td class="py-2 Table-header w-[23.5px] px-4 border-b">
              <input
                type="checkbox"
                :checked="isSelected(item)"
                @change="selectUser(item)"
              />
            </td>
         
            <td class="w-[8px] ">
              {{ index + 1 }}
            </td>
            <td class="w-[81px] ">
              {{ item.ernpId }}
            </td>
            <td class="w-[208px] ">
              {{ item.fullName }}
            </td>
            <!-- <td class="w-[208px] ">
              {{ item.email }}
            </td>
            <td class="w-[208px] ">
              {{ item.dateOfBirth }}
            </td>
            <td class="w-[208px] ">
              {{ item.phone }}
            </td> -->
            <td class="w-[208px] ">
              {{ item.gender }}
            </td>

            <td class="w-[9px] h-[42px]">
              {{ item.programName }}
            </td>
            <td class="w-[70px] ">
              {{ item.duration }}
            </td>
            <td class="w-[68px] ">
              {{ item.salary }}
            </td>

            <td class="w-[84px]  ">
              {{ item.totalSalary }}
            </td>
            <!-- <td class="w-[84px]  ">
              {{ item.unversityName }}
            </td>
            <td class="w-[84px]  ">
              {{ item.programName }}
            </td> -->

            <td class="w-[76px] ">
              {{ item.registrationStatus }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- Modal Container -->
    <!-- Modal Container -->
    <div v-if="isModalVisibleContractReview" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 overflow-auto">
      <div class="relative w-[900px] ml-[200px] max-w-screen-lg bg-white border border-gray-300 rounded-lg shadow-md p-4">
        <!-- Table Container -->
        <div class="overflow-x-auto">
          <table class="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
            <thead>
              <tr class="bg-gray-200 justify-between Table-header">
                <th class="  w-[23.5px] border-b" />
                <th class="  w-[13px] border-b">
                  #
                </th>
                <th class=" w-[70px] ">
                  Ernp ID
                </th>
                <th class=" w-[208px] ">
                  Full Name
                </th>
                <th class=" w-[208px] ">
                  Email
                </th>
                <th class=" w-[208px] ">
                  Date Of Birth
                </th>
                <th class=" w-[208px] ">
                  phone
                </th>
                <th class=" w-[208px] ">
                  Gender
                </th>
                <th class=" w-[208px] ">
                  address
                </th>
                <th class=" w-[100px] ">
                  Program
                </th>
                <th class=" w-[70px] ">
                  Duration
                </th>
                <th class=" w-[66px] ">
                  Salary
                </th>
                <th class=" w-[84px] ">
                  Total Salary
                </th>
                <th class=" w-[74px] ">
                  Status
                </th>
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
                  {{ item.ernpId }}
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
                    <input v-model="item.email" class="border rounded p-1 w-full">
                  </template>
                  <template v-else>
                    {{ item.email }}
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
                    <input v-model="item.gender" class="border rounded p-1 w-full">
                  </template>
                  <template v-else>
                    {{ item.gender }}
                  </template>
                </td>
                <td class="p-2 border-b">
                  <template v-if="isEditing === index">
                    <input v-model="item.dateOfBirth" class="border rounded p-1 w-full">
                  </template>
                  <template v-else>
                    {{ item.dateOfBirth }}
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
                <td class="p-2 border-b">
                  <template v-if="isEditing === index">
                    <input v-model="item.unversityName" class="border rounded p-1 w-full">
                  </template>
                  <template v-else>
                    {{ item.unversityName }}
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
                    <input v-model="item.registrationStatus" class="border rounded p-1 w-full">
                  </template>
                  <template v-else>
                    {{ item.registrationStatus }}
                  </template>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Action Buttons -->
        <div class="flex justify-end gap-4 mt-4">
          <button type="button" class="bg-[#21618C] text-white p-2 rounded hover:bg-[#1d5a80]">
            Approve
          </button>
          <button type="button" class="bg-[#FF4040] text-white p-2 rounded hover:bg-[#d63031]" @click="closeContractModal">
            Cancel
          </button>
        </div>
      </div>
    </div>

    <div class="p-4 flex flex-col items-center">
      <div class="w-full">
        <!-- Your content goes here -->
      </div>
      <div class="p-4 flex justify-between items-center w-full mt-4">
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
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 1200px;
}
</style>

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
  color: #094672;

}

.Table-contents{
  font-family: "DM Sans";
  text-align: start;
  block-size: 21px;
  inline-size:9px;
  padding-top: 0.5rem; /* 2 units in Tailwind are equal to 0.5rem */
  padding-bottom: 0.5rem;
  line-height: 21px;
  font-size: 14px;
  font-weight: normal;
  color: #4E585F;

}
</style>
