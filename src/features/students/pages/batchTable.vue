<script setup>
import { ref, computed, watch } from 'vue';
import { useRoute } from 'vue-router';
import { usePaginationTemp } from '@/composables/usePaginaionTemp';
import { useAuth } from '@/store/auth.js';
import Table from '@com/Table.vue';
import TableRowSkeleton from '@/skeletons/TableRowSkeleton.vue';
import { getBatchStudents } from '@/views/pages/api/StudentApi';
import { updateStudent } from '@/features/students/api/studentApi';
import { useBatchs } from '../store/batchStore';
import { useApiRequest } from '@/composables/useApiRequest';
import { formatCurrency, toasted } from '@/utils/utils';
import { getAllUniversities } from '@/features/university/api/uniApI';
import { usePagination } from '@/composables/usePagination';
import { removeStudent } from '@/features/users/api/studentAPi';
const auth = useAuth();

const selected = ref([]);
const batchs = useBatchs();
const route = useRoute();
const uniId = route.params.batchId;

const request = useApiRequest();

const paginations = usePaginationTemp({
  cb: getAllUniversities
});

const pagination = usePagination({
  store: batchs,
  cb: (data, config) => getBatchStudents(uniId, data),
});
const isModalDeleteVisible = ref(false);
const isModalopenVisible = ref(false);
const isModalVisible = ref(false);
const selectedRow = ref({});
function openViewModal(row) {
  selectedRow.value = row; // Clone the row data

  isModalopenVisible.value = true;
}
function openEditModal(row) {
  selectedRow.value = row; // Clone the row data
  console.log(selectedRow.value);
  isModalVisible.value = true;
}
function openDeleteModal(row) {
  selectedRow.value = row; // Clone the row data
 
  isModalDeleteVisible.value = true;
}
function closeEditModal() {
  isModalVisible.value = false;
  isModalopenVisible.value = false;
  selectedRow.value = null;
  isModalDeleteVisible.value = false;
}
function saveChanges() {
  // Perform the save operation (e.g., make an API call to update the data)
  closeEditModal();
}
function confirmeachSelection() {
  if (request.pending.value) return; // Prevent action if request is pending

  console.log(selectedRow.value);
  request.send(
    () => updateStudent(selectedRow.value.ernpId, selectedRow.value), // Pass the row inside an array to maintain the structure
    (res) => {
      if (res.success) {
        // Update only the status of this specific row

        selected.value = [];
      }
      toasted(res.success, 'Updated', res.error);
    }
  );
}
const props = defineProps({
  pending: {
    type: Boolean,
    default: false,
  },
  universities: {
    type: Array,
    default: () => [],
  },
  onSubmit: {
    type: Function,
  },
});
const combinedOptions = computed(() => {
  const otherOption = [{ label: 'Other', value: 'other' }];

  const universityOptions = props.universities.map((el) => ({
    label: el.universityName,
    value: el.universityUuid,
  }));

  return [...otherOption, ...universityOptions];
});

const program = ref([]);
watch(
  selectedRow,
  () => {
    console.log(paginations.data.value);
    program.value =
      (paginations.data.value?.content || []).find(
        (el) => el.universityName == selectedRow.value?.universityName
      )?.programs || [];
  },
  { deep: true }
);

const req = useApiRequest()
function remove(id) {
  req.send(
    () => removeStudent(id),
    res => {
      toasted(res.success, 'Student Removed Successfully', res.error)
      if(res.success) {
        batchs.remove(id)
        isModalDeleteVisible.value = false;
      }

    }
  )
}
</script>
<template>
  <div class="bg-[#FBFBFB] p-5 overflow-x-scroll show-scrollbar">
    <div class="flex justify-between items-center w-full p-4 rounded-lg">
  <input
    class="rounded-lg border w-[60%]  p-2 focus:outline-none focus:ring-2 focus:ring-[#21618C] placeholder-gray-500"
    v-model="pagination.search.value"
    placeholder="Search Students"
  />
  <button
    class="ml-4 bg-[#21618C] text-white flex items-center gap-2 font-dm-sans py-2 px-4 rounded-lg shadow-lg transition duration-300 ease-in-out hover:bg-[#1A4D6D]"
    @click="$router.push(`/AddStudents/${route.params.batchId}`)"
    type="button"
  >
    Add Resident
  </button>
</div>
    <Table
      class="Table-header"
      :pending="pagination.pending.value"
      :Fallback="TableRowSkeleton"
      :headers="{
        head: [
          'ErnpId',
          'Full Name',
          'University Name',
          'Program Name',
          'Gender',
          'Salary',
          'Contract Amount',
          'actions',
        ],
        row: [
          'ernpId',
          'fullName',
          'universityName',
          'programName',
          'gender',
          'salary',
          'totalTrainingCost',
        ],
      }"
      :rows="batchs.batches || []"
    >
      <template #actions="{ row }" class="items-end">
        <div class='flex items-center gap-2'>
          <button
            class="items-center bg-[#092537] text-white flex gap-2 font-dm-sans p-2 rounded-md"
            @click="openViewModal(row)"
          >
         
            View
          </button>
          <button
            class="items-center bg-[#092537] text-white flex gap-2 font-dm-sans p-2 rounded-md"
            @click="openEditModal(row)"
          >
          
            Edit
          </button>
          <button
          @click="openDeleteModal(row)"
 
  class="flex gap-2 font-dm-sans p-2 rounded-md bg-red-500 text-white font-semibold py-2 px-2 shadow-md hover:bg-red-600 transition duration-300 ease-in-out transform hover:scale-105"
>
 <!-- @click="remove(row.ernpId)" -->
  Delete
</button>

        </div>
      </template>
    </Table>
    <div class="flex justify-center items-center"></div>
    <div class="p-4 flex flex-col items-center">
      <div class="w-full">
        <!-- Your content goes here -->
      </div>
    </div>
    <div
      v-if="isModalopenVisible"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
    >
      <div
        class="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl relative animate-fade-in-down"
      >
        <!-- Close Button -->
        <button
          @click="closeEditModal"
          class="absolute top-3 right-3 text-gray-500 hover:text-gray-700 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <!-- Modal Title -->
        <h3 class="text-xl font-semibold text-gray-800 mb-6">View Student</h3>

        <!-- Form -->
        <form
          @submit.prevent="saveChanges"
          class="grid grid-cols-1 gap-y-4 gap-x-6 md:grid-cols-3 md:gap-x-8"
        >
          <!-- Input Fields -->
          <div class="col-span-1">
            <label for="ernpId" class="block text-sm font-medium text-gray-700"
              >ERNP ID</label
            >
            <input
              v-model="selectedRow.ernpId"
              id="ernpId"
              readonly
              class="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>

          <div class="col-span-1">
            <label
              for="fullName"
              class="block text-sm font-medium text-gray-700"
              >Full Name</label
            >
            <input
              v-model="selectedRow.fullName"
              id="fullName"
              class="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            disabled
            />
          </div>

          <div class="col-span-1">
            <label for="email" class="block text-sm font-medium text-gray-700"
              >Email</label
            >
            <input
              v-model="selectedRow.email"
              id="email"
              class="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              disabled />
          </div>

          <div class="col-span-1">
            <label for="phone" class="block text-sm font-medium text-gray-700"
              >Phone</label
            >
            <input
              v-model="selectedRow.phone"
              id="phone"
              class="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              disabled/>
          </div>
          <div class="col-span-1">
            <label for="gender" class="block text-sm font-medium text-gray-700"
              >Gender</label
            >
            <select
              :obj="true"
              v-model="selectedRow.gender"
              id="gender"
              class="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              name="gender"
              validation="required"
              disabled>
              <option value="" disabled>Select Gender</option>
              <!-- Placeholder option -->
              <option value="Male" key="male">Male</option>
              <option value="Female" key="female">Female</option>
            </select>
          </div>
          

          <div class="col-span-1">
            <label
              for="dateOfBirth"
              class="block text-sm font-medium text-gray-700"
              >Date of Birth</label
            >
            <input
              type='date'
              v-model="selectedRow.dateOfBirth"
              id="dateOfBirth"
              class="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              disabled />
          </div>

          <div class="col-span-1">
            <label for="address" class="block text-sm font-medium text-gray-700"
              >Address</label
            >
            <input
              v-model="selectedRow.address"
              id="address"
              class="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              disabled/>
          </div>

          <div class="col-span-1">
            <label
              for="duration"
              class="block text-sm font-medium text-gray-700"
              >Duration</label
            >
            <input
              v-model="selectedRow.duration"
              id="duration"
              class="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              disabled />
          </div>
          <div class="col-span-1">
            <label for="salary" class="block text-sm font-medium text-gray-700"
              >Salary</label
            >
            <input
              v-model="selectedRow.salary"
              id="salary"
              class="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              disabled />
          </div>
          <div class="col-span-1">
            <label for="salary" class="block text-sm font-medium text-gray-700"
              >Contract Amount</label
            >
            <input
              v-model="selectedRow.totalTrainingCost"
              id="salary"
              class="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              disabled />
          </div>

          <div class="col-span-1">
            <label
              for="universityName"
              class="block text-sm font-medium text-gray-700"
              >University Name</label
            >
            <select
              :obj="true"
              v-model="selectedRow.universityName"
              id="universityName"
              class="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              name="universityName"
              validation="required"
              disabled
            >
              <option
                :key="uni.universityName"
                :value="uni.universityName"
                v-for="uni in paginations.data.value?.content || []"
              >
                {{ uni.universityName }}
              </option>
            </select>
          </div>
          <div class="col-span-1">
            <label for="salary" class="block text-sm font-medium text-gray-700"
              >Program</label
            >
            <select
              v-model="selectedRow.programName"
              id="salary"
              class="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              disabled >
              <option
                :value="prog.programName"
                :key="prog.programName"
                v-for="prog in program || []"
              >
                {{ prog.programName }}
              </option>
            </select>
          </div>
          <!-- Action Buttons -->
          <div class="flex justify-end gap-3 pt-4 col-span-3">
            <button
              type="button"
              @click="closeEditModal"
              class="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition"
            >
              Exit
            </button>
            
          </div>
        </form>
      </div>
    </div>
    <div
      v-if="isModalVisible"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
    >
      <div
        class="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl relative animate-fade-in-down"
      >
        <!-- Close Button -->
        <button
          @click="closeEditModal"
          class="absolute top-3 right-3 text-gray-500 hover:text-gray-700 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <!-- Modal Title -->
        <h3 class="text-xl font-semibold text-gray-800 mb-6">Edit Student</h3>

        <!-- Form -->
        <form
          @submit.prevent="saveChanges"
          class="grid grid-cols-1 gap-y-4 gap-x-6 md:grid-cols-3 md:gap-x-8"
        >
          <!-- Input Fields -->
          <div class="col-span-1">
            <label for="ernpId" class="block text-sm font-medium text-gray-700"
              >ERNP ID</label
            >
            <input
              v-model="selectedRow.ernpId"
              id="ernpId"
              readonly
              class="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>

          <div class="col-span-1">
            <label
              for="fullName"
              class="block text-sm font-medium text-gray-700"
              >Full Name</label
            >
            <input
              v-model="selectedRow.fullName"
              id="fullName"
              class="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>

          <div class="col-span-1">
            <label for="email" class="block text-sm font-medium text-gray-700"
              >Email</label
            >
            <input
              v-model="selectedRow.email"
              id="email"
              class="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>

          <div class="col-span-1">
            <label for="phone" class="block text-sm font-medium text-gray-700"
              >Phone</label
            >
            <input
              v-model="selectedRow.phone"
              id="phone"
              class="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>
          <div class="col-span-1">
            <label for="gender" class="block text-sm font-medium text-gray-700"
              >Gender</label
            >
            <select
              :obj="true"
              v-model="selectedRow.gender"
              id="gender"
              class="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              name="gender"
              validation="required"
            >
              <option value="" disabled>Select Gender</option>
              <!-- Placeholder option -->
              <option value="Male" key="male">Male</option>
              <option value="Female" key="female">Female</option>
            </select>
          </div>
          

          <div class="col-span-1">
            <label
              for="dateOfBirth"
              class="block text-sm font-medium text-gray-700"
              >Date of Birth</label
            >
            <input
              type='date'
              v-model="selectedRow.dateOfBirth"
              id="dateOfBirth"
              class="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>

          <div class="col-span-1">
            <label for="address" class="block text-sm font-medium text-gray-700"
              >Address</label
            >
            <input
              v-model="selectedRow.address"
              id="address"
              class="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>

          <div class="col-span-1">
            <label
              for="duration"
              class="block text-sm font-medium text-gray-700"
              >Duration</label
            >
            <input
              v-model="selectedRow.duration"
              id="duration"
              class="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>
          <div class="col-span-1">
            <label for="salary" class="block text-sm font-medium text-gray-700"
              >Salary</label
            >
            <input
              v-model="selectedRow.salary"
              id="salary"
              class="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>
          <div class="col-span-1">
            <label for="salary" class="block text-sm font-medium text-gray-700"
              >Contract Amount</label
            >
            <input
              v-model="selectedRow.totalTrainingCost"
              id="salary"
              class="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>

          <div class="col-span-1">
            <label
              for="universityName"
              class="block text-sm font-medium text-gray-700"
              >University Name</label
            >
            <select
              :obj="true"
              v-model="selectedRow.universityName"
              id="universityName"
              class="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              name="universityName"
              validation="required"
            >
              <option
                :key="uni.universityName"
                :value="uni.universityName"
                v-for="uni in paginations.data.value?.content || []"
              >
                {{ uni.universityName }}
              </option>
            </select>
          </div>
          <div class="col-span-1">
            <label for="salary" class="block text-sm font-medium text-gray-700"
              >Program</label
            >
            <select
              v-model="selectedRow.programName"
              id="salary"
              class="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            >
              <option
                :value="prog.programName"
                :key="prog.programName"
                v-for="prog in program || []"
              >
                {{ prog.programName }}
              </option>
            </select>
          </div>
          <!-- Action Buttons -->
          <div class="flex justify-end gap-3 pt-4 col-span-3">
            <button
              type="submit"
              class="bg-[#092537] text-white px-4 py-2 rounded-md hover:bg-[#0f415f] 0 transition"
              @click="confirmeachSelection"
            >
              Send Confirmation Code Again
            </button>
            <button
              type="button"
              @click="closeEditModal"
              class="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="bg-[#092537] text-white px-4 py-2 rounded-md hover:bg-[#0f415f] transition"
              @click="confirmeachSelection"
            >
              Save
            </button>
           
          </div>
        </form>
      </div>
    </div>
    <div
  v-if="isModalDeleteVisible"
  class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
>
  <div
    class="bg-white p-8 rounded-lg shadow-lg  max-w-4xl relative animate-fade-in-down"
  >
    <!-- Close Button -->
    <button
      @click="closeEditModal"
      class="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>

    <!-- Modal Title -->
    <h3 class="text-2xl font-semibold text-gray-800 mb-4 text-center">Delete Student</h3>
    
    <div class="text-center mb-6">
      <div class="inline-block   p-4 rounded-md">
        Are you sure you want to delete <span class="font-bold">{{ selectedRow.fullName }}</span>?
      </div>
    </div>

    <!-- Action Buttons -->
    <div class="flex justify-end gap-4 pt-4">
      <button
        type="button"
        @click="closeEditModal"
        class="bg-gray-500 text-white px-5 py-2 rounded-md hover:bg-gray-600 transition"
      >
        Cancel
      </button>
      <button
        type="button"
        @click="remove(selectedRow.ernpId)"
        class="bg-red-500 text-white px-5 py-2 rounded-md hover:bg-red-600 transition"
      >
        Yes, Delete
      </button>
    </div>
  </div>
</div>
  </div>
</template>

<style scoped>
.container {
  max-width: 1200px;
}

.bg-gray-200 {
  background-color: #e2e8f0;
}

.bg-gray-100 {
  background-color: #f7fafc;
}
</style>
<style scoped>
.container {
  max-width: 1200px;
}
</style>

<style scope>
.modal {
  transition: opacity 0.25s ease;
}
.Table-header {
  font-family: 'DM Sans';
  text-align: left;
  height: 21px;
  padding-top: 0.5rem; /* 2 units in Tailwind are equal to 0.5rem */
  padding-bottom: 0.5rem;
  line-height: 21px;
  font-size: 14px;
  font-weight: bold;
  color: #4e585f;
}

.Table-contents {
  font-family: 'DM Sans';
  text-align: start;
  block-size: 21px;
  inline-size: 9px;
  padding-top: 0.5rem; /* 2 units in Tailwind are equal to 0.5rem */
  padding-bottom: 0.5rem;
  line-height: 21px;
  font-size: 14px;
  font-weight: normal;
  color: #4e585f;
}
@keyframes fade-in-down {
  0% {
    opacity: 0;
    transform: translateY(-20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-down {
  animation: fade-in-down 0.3s ease-in-out;
}
</style>
