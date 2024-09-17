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

const isModalVisible = ref(false);
const selectedRow = ref({});

function openEditModal(row) {
  selectedRow.value = row; // Clone the row data
  console.log(selectedRow.value);
  isModalVisible.value = true;
}
function closeEditModal() {
  isModalVisible.value = false;
  selectedRow.value = null;
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
      }
    }
  )
}
</script>
<template>
  <div class="bg-[#FBFBFB] p-5 overflow-x-scroll show-scrollbar">
    <div class="flex justify-between items-center w-full p-4 bg-gray-100 rounded-lg shadow-md">
  <input
    class="flex-1 rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-[#21618C] placeholder-gray-500"
    v-model="pagination.search.value"
    placeholder="Search Students"
  />
  <button
    class="ml-4 bg-[#21618C] text-white flex items-center gap-2 font-dm-sans py-2 px-4 rounded-lg shadow-lg transition duration-300 ease-in-out hover:bg-[#1A4D6D]"
    @click="$router.push(`/AddStudents/${route.params.batchId}`)"
    type="button"
  >
    Add Student
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
            @click="openEditModal(row)"
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
          <button
  @click="remove(row.ernpId)"
  class="flex gap-2 font-dm-sans p-2 rounded-md bg-red-500 text-white font-semibold py-2 px-2 shadow-md hover:bg-red-600 transition duration-300 ease-in-out transform hover:scale-105"
>

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
              type="button"
              @click="closeEditModal"
              class="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
              @click="confirmeachSelection"
            >
              Save
            </button>
          </div>
        </form>
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
