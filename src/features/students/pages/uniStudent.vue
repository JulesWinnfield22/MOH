<script setup>
import { ref, computed, watch } from 'vue';

import { useRoute } from 'vue-router';
import { usePaginationTemp } from '@/composables/usePaginaionTemp';
import { getStudentsByRegistrationStatus, getStudentsByStatusUniId, getUniStudents } from '@/features/students/api/studentApi.js';
import { useAuth } from '@/store/auth.js';
import Table from '@com/Table.vue';
import { useStudents } from '../store/studentsStore';
import TableRowSkeleton from '@/skeletons/TableRowSkeleton.vue';
import { updateStudent } from '@/features/students/api/studentApi';
import Status_row from '../components/Status_row.vue';
import {
  confirmStudent,
  rejectStudent,
  withdrawStud,
} from '@/features/students/api/studentApi.js';
import { useApiRequest } from '@/composables/useApiRequest';
import { toasted } from '@/utils/utils';
import { usePagination } from '@/composables/usePagination';
import { getAllUniversities } from '@/features/university/api/uniApI';
import Form from '@/new_form_builder/Form.vue';
import Select from '@/components/new_form_elements/Select.vue';
import Textarea from '@/components/new_form_elements/Textarea.vue';


const paginations = usePaginationTemp({
  cb: getAllUniversities
});

const program = ref([]);

const sudents = useStudents();
const auth = useAuth();
const isRoleUniversity = computed(() =>
  auth.auth?.user?.privileges?.includes('ROLE_University')
);
const currentRow = ref(null);
const selected = ref([]);
const reason = ref('');
const reasons = ref('');
const camStatus = ref('');
const discription = ref('');
const isModalVisible = ref(false);
const isEachModalVisible = ref(false);
const isWithdrawStudent = ref(false);
const selectedErnpId = ref(null);
const route = useRoute();
const uniId = route.params.uniId;
const request = useApiRequest();
const rejectRequest = useApiRequest();

const selectedStatus = ref(''); // To hold the selected status filter
const buttonClass = computed(() => {
  switch (camStatus.value) {
    case 'Withdrawn':
      return 'bg-[#FF4040]'; // Example color for Withdrawn
    case 'Suspended':
      return 'bg-[#FFA500]'; // Example color for Suspended
    case 'Dismissed':
      return 'bg-[#FFD700]'; // Example color for Dismissed
    case 'Graduated':
      return 'bg-[#32CD32]'; // Example color for Graduated
    default:
      return 'bg-[#FF4040]'; // Default color
  }
});
const isModalVisibles = ref(false);
const selectedRow = ref({});

function openEditModal(row) {
  selectedRow.value = {...row, registrationStatus: 'transfered'}; // Clone the row data
  console.log(selectedRow.value);
  isModalVisibles.value = true;
}
function closeEditModal() {
  isModalVisibles.value = false;
  selectedRow.value = null;
}
function handleButtonClick() {
  withdrawSelectedStudent(selectedErnpId.value);
}
// Computed property to filter students based on the selected status
const filteredStudents = computed(() => {
  if (!selectedStatus.value) return sudents.students || [];
  return (sudents.students || []).filter(
    (student) => student.registrationStatus === selectedStatus.value
  );
});
const sent = ref([])
const status = ref(null);
const paginationed = usePagination({
  store: sudents,
  cb: (data, config) => 
  getStudentsByRegistrationStatus(uniId || auth.auth?.user?.universityProviderUuid,{ status: status.value,
    ...data, }),
});
watch(status, () => {
  paginationed.send()
})
const pagination = usePagination({
  store: sudents,
  cb: (data, config) => getStudentsByRegistrationStatus(uniId || auth.auth?.user?.universityProviderUuid, data),
});

const showRejectionReasonModal = ref(false);
const showStudent = ref(false);
function applyFilter() {
  // Additional logic if needed when applying the filter
}
function closeRejectionReasonModal() {
  showRejectionReasonModal.value = false;
  currentRow.value = null;
}
function closeStudent() {
  showStudent.value = false;
  currentRow.value = null;
}
function openRejectionReasonModal(row) {
  currentRow.value = row;
  showRejectionReasonModal.value = true;
}
function openStudent(row) {
  currentRow.value = row;
  showStudent.value = true;
}
function withdrawStudent(ernpId) {
  selectedErnpId.value = ernpId; // Store the specific `ernpId`
  isWithdrawStudent.value = true;
  showStudent.value = false; // Show the reject modal
  reasons.value = '';
}

function showModal() {
  if(!selected.value.length) return
  isModalVisible.value = true; // Show the reject modal
  reason.value = '';
  //selected.value != [];
}
function showEachModal(ernpId) {
  selectedErnpId.value = ernpId; // Store the specific `ernpId`
  isEachModalVisible.value = true; // Show the reject modal
  reason.value = '';
}
function closeModal() {
  isModalVisible.value = false;
  isEachModalVisible.value = false;
  isWithdrawStudent.value = false;
  resetModalValues();
}
function confirmSelection() {
  if (!selected.value?.length || request.pending.value) return;

  sent.value = [...selected.value]
  request.send(
    () => confirmStudent(selected.value),
    (res) => {
      sent.value = []
      if (res.success) {
        sudents.updateStatus('registered', '', selected.value);
        selected.value = [];
        resetModalValues();
      }
      toasted(res.success, 'Registered', res.error);
    }
  );
}
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
function changeEachSelection() {
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
function confirmeachSelection(ernpId) {
  if (request.pending.value) return; // Prevent action if request is pending
  sent.value.push(ernpId)
  request.send(
    () => confirmStudent([ernpId]), // Pass the row inside an array to maintain the structure
    (res) => {
      sent.value.pop()
      if (res.success) {

        // Update only the status of this specific row
        sudents.updateStatus('registered', '', [ernpId]);
        selected.value = [];
        resetModalValues();
      }
      toasted(res.success, 'Registered', res.error);
    }
  );
}

function rejectEachSelection(ernpId) {
  if (rejectRequest.pending.value) {
    console.warn('Request is still pending.');
    return; // Prevent action if request is pending
  }
  sent.value.push(ernpId)
  const status = 'rejected'; // Define the status for rejection

  console.log(reason.value);

  rejectRequest.send(
    () =>
      rejectStudent(
        status,
        reason.value != 'Other' ? reason.value : discription.value,
        [ernpId]
      ), // Pass the ernpId in an array to keep the structure consistent
    (res) => {
      sent.value.pop()
      if (res.success) {
        console.log('Updating status for student:', ernpId);
        sudents.updateStatus(status, reason.value, [ernpId]); // Update the status of the specific row
        reason.value = '';
      }
      isEachModalVisible.value = false;
      toasted(res.success, 'Rejected', res.error); // Show a toast notification
    }
  );
}

function rejectSelection() {
  if (!selected.value?.length || request.pending.value) return;

  const status = 'rejected'; // or any other status you need

  rejectRequest.send(
    () =>
      rejectStudent(
        status,
        reason.value != 'Other' ? reason.value : discription.value,
        selected.value
      ),
    (res) => {
      if (res.success) {
        sudents.updateStatus(status, reason.value, selected.value);
        selected.value = [];
        reason.value = '';
      }
      toasted(res.success, 'Rejected', res.error);
    }
  );
}

function withdrawSelectedStudent(ernpId) {
  if (request.pending.value) return; // Prevent action if request is pending

  // const camStatus = 'Withdrawn'; // Define the status for rejection

  console.log(reasons.value);

  request.send(
    () =>
      withdrawStud(
        camStatus.value,
        reasons.value != 'Other' ? reasons.value : discription.value,
        [ernpId]
      ), // Pass the ernpId in an array to keep the structure consistent

    (res) => {
      if (res.success) {
        sudents.updateCampusStatus(camStatus.value, reasons.value, [ernpId]);
        console.log([ernpId]);
        reasons.value = ''; // Update the status of the specific row
        resetModalValues();
      }
      isWithdrawStudent.value = !isWithdrawStudent.value;
      //status.value = values.status;
      toasted(res.success, 'Rejected', res.error); // Show a toast notification
    }
  );
}

function selectUser(item) {
  const idx = selected.value.findIndex((el) => {
    return item == el;
  });
  if (idx === -1) {
    selected.value.push(item);
  } else {
    selected.value.splice(idx, 1);
  }
}

function selectAll(select) {
  console.log(select);
  if (select) {
    selected.value = (sudents.students || []).map((el) => el.ernpId) || [];
  } else {
    selected.value = [];
  }
}
function resetModalValues() {
  reason.value = '';
  discription.value = '';
  selectedErnpId.value = null;
  reasons.value = '';
  camStatus.value = '';
}
const allSelected = computed(() => {
  const len = (sudents.students || []).length;
  return len != 0 && len == selected.value?.length;
});

const isRoleHrdi = computed(
  () => auth.auth?.user
);
const applyFilters = () => {
  const baseUrl = 'http://192.168.100.57:8990/api/osrcs/student/findMYUniversityStudentsByRegistrationStatus/a1159f90-3000-409e-8dfc-2a95c778d6c2';
  
  let url = baseUrl;

  if (status.value) {
    url += `?status=${status.value}`;
  }
  
  url += `&page=1&limit=25`;

  fetchData(url);
};

const fetchData = (url) => {
  fetch(url)
    .then(response => response.json())
    .then(data => {
      console.log(data); // Handle the fetched data
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
};
</script>

<template>
  <div class="bg-[#FBFBFB] p-5">
    <div class="flex justify-between my-5"> 
      
      <div></div>
     
    <p class="font-bold  flex justify-center pb-8 text-xl">
      {{ sudents.students?.[0]?.universityName}}
    </p>
    <div class="flex justify-end mb-4">
      <select
    v-model="status"
    @change="applyFilters"
    class="block w-32 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700 bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300"
  >
    <option value=null>All</option>
    <option value="waiting">Waiting</option>
    <option value="registered">Registered</option>
    <option value="rejected">Rejected</option>
    <option value="transfered">Transfered</option>
  </select>
      </div>
   
</div>
    <div class="flex justify-between items-center">
      
      <div
        class="p-4 text-[#4E585F] font-dm-sans text-[16px] font-bold leading-[24px] text-left"
      >
        Students
      </div>
      <input
    class="rounded-lg border w-[50%]  p-2 focus:outline-none focus:ring-2 focus:ring-[#21618C] placeholder-gray-500"
    v-model="pagination.search.value"
    placeholder="Search Students"
  />
      <div class="p-4 gap-2.5 flex">
        <p
          class="p-4 text-[#4E585F] font-dm-sans text-[14px] font-normal leading-[24px] text-left"
        >
          Selected {{ selected?.length || 0 }} of
          {{ (sudents.students || []).length }} Students
        </p>

        <button
          style="padding: 8px 16px; border-radius: 6px"
          class="mt-1.5 gap-2 text-center items-center justify-center h-[40px] w-[129px] flex font-dm-sans bg-[#FF4040] text-white font-bold rounded hover:bg-[#FF4040]"
          @click="showModal()"
        >
          <template v-if="!rejectRequest.pending.value">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M2.54497 8.73005C2 9.79961 2 11.1997 2 14C2 16.8003 2 18.2004 2.54497 19.27C3.02433 20.2108 3.78924 20.9757 4.73005 21.455C5.79961 22 7.19974 22 10 22H14C16.8003 22 18.2004 22 19.27 21.455C20.2108 20.9757 20.9757 20.2108 21.455 19.27C22 18.2004 22 16.8003 22 14C22 11.1997 22 9.79961 21.455 8.73005C20.9757 7.78924 20.2108 7.02433 19.27 6.54497C18.2004 6 16.8003 6 14 6H10C7.19974 6 5.79961 6 4.73005 6.54497C3.78924 7.02433 3.02433 7.78924 2.54497 8.73005ZM15.0595 12.4995C15.3353 12.1905 15.3085 11.7164 14.9995 11.4406C14.6905 11.1647 14.2164 11.1915 13.9406 11.5005L10.9286 14.8739L10.0595 13.9005C9.78359 13.5915 9.30947 13.5647 9.0005 13.8406C8.69152 14.1164 8.66468 14.5905 8.94055 14.8995L10.3691 16.4995C10.5114 16.6589 10.7149 16.75 10.9286 16.75C11.1422 16.75 11.3457 16.6589 11.488 16.4995L15.0595 12.4995Z"
                fill="white"
              />
              <path
                d="M20.5348 3.46447C19.0704 2 16.7133 2 11.9993 2C7.28525 2 4.92823 2 3.46377 3.46447C2.70628 4.22195 2.3406 5.21824 2.16406 6.65598C2.69473 6.06532 3.33236 5.57328 4.04836 5.20846C4.82984 4.81027 5.66664 4.6488 6.59316 4.5731C7.48829 4.49997 8.58971 4.49998 9.93646 4.5H14.0621C15.4089 4.49998 16.5103 4.49997 17.4054 4.5731C18.332 4.6488 19.1688 4.81027 19.9502 5.20846C20.6662 5.57328 21.3039 6.06532 21.8345 6.65598C21.658 5.21824 21.2923 4.22195 20.5348 3.46447Z"
                fill="white"
              />
            </svg>
            Reject
          </template>
          <p v-else>...</p>
        </button>
        <button
          style="padding: 8px 16px; border-radius: 6px"
          class="mt-1.5 text-center items-center justify-center gap-2 flex h-[40px] w-[129px] font-dm-sans bg-[#36CB56] text-white font-bold rounded hover:bg-[#36CB56]"
          @click="confirmSelection"
        >
          <template v-if="!request.pending.value">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M2.54497 8.73005C2 9.79961 2 11.1997 2 14C2 16.8003 2 18.2004 2.54497 19.27C3.02433 20.2108 3.78924 20.9757 4.73005 21.455C5.79961 22 7.19974 22 10 22H14C16.8003 22 18.2004 22 19.27 21.455C20.2108 20.9757 20.9757 20.2108 21.455 19.27C22 18.2004 22 16.8003 22 14C22 11.1997 22 9.79961 21.455 8.73005C20.9757 7.78924 20.2108 7.02433 19.27 6.54497C18.2004 6 16.8003 6 14 6H10C7.19974 6 5.79961 6 4.73005 6.54497C3.78924 7.02433 3.02433 7.78924 2.54497 8.73005ZM15.0595 12.4995C15.3353 12.1905 15.3085 11.7164 14.9995 11.4406C14.6905 11.1647 14.2164 11.1915 13.9406 11.5005L10.9286 14.8739L10.0595 13.9005C9.78359 13.5915 9.30947 13.5647 9.0005 13.8406C8.69152 14.1164 8.66468 14.5905 8.94055 14.8995L10.3691 16.4995C10.5114 16.6589 10.7149 16.75 10.9286 16.75C11.1422 16.75 11.3457 16.6589 11.488 16.4995L15.0595 12.4995Z"
                fill="white"
              />
              <path
                d="M20.5348 3.46447C19.0704 2 16.7133 2 11.9993 2C7.28525 2 4.92823 2 3.46377 3.46447C2.70628 4.22195 2.3406 5.21824 2.16406 6.65598C2.69473 6.06532 3.33236 5.57328 4.04836 5.20846C4.82984 4.81027 5.66664 4.6488 6.59316 4.5731C7.48829 4.49997 8.58971 4.49998 9.93646 4.5H14.0621C15.4089 4.49998 16.5103 4.49997 17.4054 4.5731C18.332 4.6488 19.1688 4.81027 19.9502 5.20846C20.6662 5.57328 21.3039 6.06532 21.8345 6.65598C21.658 5.21824 21.2923 4.22195 20.5348 3.46447Z"
                fill="white"
              />
            </svg>
            Accept
          </template>
          <p v-else>...</p>
        </button>
      </div>
    </div>

    <div  class="my-10">
      <div
        v-if="isWithdrawStudent"
        class="fixed inset-0  flex items-center justify-center bg-black bg-opacity-50"
      >
        <div
          class="bg-white rounded-lg shadow-lg gap-3 flex flex-col space-between-[24px] p-6 w-[877px] h-[302px]"
        >
          <div class="flex justify-between">
            <h2
              class="text-left flex font-dm-sans leading-[24px] text-[14px] font-bold text-[#4E585F]"
            >
              Take Action
            </h2>
            <button
              class="h-[13px] w-[13px] px-4 py-2 rounded"
              @click="closeModal"
            >
              <svg
                width="17"
                height="17"
                viewBox="0 0 17 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15 2L2.00005 14.9999M2 1.99995L14.9999 14.9999"
                  stroke="#FF4040"
                  stroke-width="3.5"
                  stroke-linecap="round"
                />
              </svg>
            </button>
          </div>
          <select
            v-model="camStatus"
            class="border w-[829px] border-[#D9D9D9] bg-[#FBFBFB] rounded p-2 mb-4"
          >
            <option value="" disabled>Choose Actions</option>
            <option value="Withdrawn">Withdrawn</option>
            <option value="Suspended">Suspended</option>
            <option value="Dismissed">Dismissed</option>
            <option value="Graduated">Graduated</option>
          </select>
          <select
            v-model="reasons"
            class="border w-[829px] border-[#D9D9D9] bg-[#FBFBFB] rounded p-2 mb-4"
          >
            <option value="" disabled>Select a reason for Withdrawal</option>
            <option value="University is currently full">
              University is currently full
            </option>
            <option value="Program is currently Unavailable ">
              Program is currently Unavailable
            </option>
            <option value="Incomplete Documents">Incomplete Documents</option>
            <option value="Invalid Information">Invalid Information</option>
            <option value="">Other</option>
          </select>

          <!-- Textarea displayed only when "Other" is selected -->
          <textarea
            v-if="reasons === 'Other'"
            v-model="discription"
            placeholder="State the reason for rejection"
            class="border w-[829px] h-[158px] border-[#D9D9D9] bg-[#FBFBFB] rounded p-2 mb-4"
          />
          <div class="flex justify-end">
            <button
              :class="buttonClass"
              class="h-[40px] w-[100px] text-center text-white px-4 py-2 rounded mr-2"
              @click="handleButtonClick"
            >
              {{ camStatus || 'Select Action' }}
            </button>
          </div>
        </div>
      </div>
      <div
        v-if="isEachModalVisible"
        class="fixed inset-0 ml-92 flex items-center justify-center bg-black bg-opacity-50"
      >
        <div
          class="bg-white ml-48 rounded-lg shadow-lg gap-3 flex flex-col space-between-[24px] p-6 w-[877px] h-[302px]"
        >
          <div class="flex justify-between">
            <h2
              class="text-left flex font-dm-sans leading-[24px] text-[14px] font-bold text-[#4E585F]"
            >
              Reject?
            </h2>
            <button
              class="h-[13px] w-[13px] px-4 py-2 rounded"
              @click="closeModal"
            >
              <svg
                width="17"
                height="17"
                viewBox="0 0 17 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15 2L2.00005 14.9999M2 1.99995L14.9999 14.9999"
                  stroke="#FF4040"
                  stroke-width="3.5"
                  stroke-linecap="round"
                />
              </svg>
            </button>
          </div>
          <Form class="flex flex-col gap-4" v-slot='{ submit }' id="reject-form">
            <Textarea
              v-if="reason === 'Other'"
              name="discription"
              v-model="discription"
              validation="required"
              placeholder="State the reason for rejection"
              class="border w-[829px] h-[158px] border-[#D9D9D9] bg-[#FBFBFB] rounded p-2 mb-4"
            />
            <Select
              v-else
              v-model="reason"
              name="reason"
              validation="required"
              :options="['University is currently full', 'Program is currently unavailable', 'Program is currently unavailable', 'Incomplete Documents', 'Invalid Information', 'Other']"
              :attributes="{
                type: 'text',
                placeholder: 'State the reason for rejection'
              }"
            />
            <div class="flex justify-end">
              <button
                class="bg-[#FF4040] h-[40px] w-[82px] text-white px-4 py-2 rounded mr-2"
                @click.prevent="submit(({values}) => rejectEachSelection(selectedErnpId))"
              >
                {{ rejectRequest.pending.value ? '...' : 'Reject'}}
              </button>
              <button
                class="bg-gray-300 text-gray-700 px-4 py-2 rounded"
                @click="closeModal"
              >
                Cancel
              </button>
            </div>
          </Form>
          <!--<select
            
            class="border w-[829px] border-[#D9D9D9] bg-[#FBFBFB] rounded p-2 mb-4"
          >
            <option value="" disabled selected>
              State the reason for rejection
            </option>
            
            <option value="University is currently full">
              University is currently full
            </option>
            <option value=" Program is currently unavailable">
              Program is currently unavailable
            </option>
            <option value="Incomplete Documents">Incomplete Documents</option>
            <option value="Invalid Information">Invalid Information</option>
            <option value="Other">Other</option>
          </select>-->

          <!-- Textarea displayed only when "Other" is selected -->
          
          
        </div>
      </div>
      <div
        v-if="isModalVisible && selected?.length > 0"
        class="fixed inset-0  flex items-center justify-center bg-black bg-opacity-50"
      >
        <div
          class="bg-white ml-48 rounded-lg shadow-lg gap-3 flex flex-col space-between-[24px] p-6 w-[877px] h-[302px]"
        >
          <div class="flex justify-between">
            <h2
              class="text-left flex font-dm-sans leading-[24px] text-[14px] font-bold text-[#4E585F]"
            >
              Reject?
            </h2>
            <button
              class="h-[13px] w-[13px] px-4 py-2 rounded"
              @click="closeModal"
            >
              <svg
                width="17"
                height="17"
                viewBox="0 0 17 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15 2L2.00005 14.9999M2 1.99995L14.9999 14.9999"
                  stroke="#FF4040"
                  stroke-width="3.5"
                  stroke-linecap="round"
                />
              </svg>
            </button>
          </div>
          
          <select
            v-model="reason"
            class="border w-[829px] border-[#D9D9D9] bg-[#FBFBFB] rounded p-2 mb-4"
          >
            <option value="" disabled selected>
              State the reason for rejection
            </option>
            <option value="">Select a reason for rejection</option>
            <option value="Incomplete Documents">
              University is currently full
            </option>
            <option value="Incomplete Documents">
              Program is currently Unavailable
            </option>
            <option value="Incomplete Documents">Incomplete Documents</option>
            <option value="Invalid Information">Invalid Information</option>
            <option value="Other">Other</option>
          </select>

          <!-- Textarea displayed only when "Other" is selected -->
          <textarea
            v-if="reason === 'Other'"
            v-model="discription"
            placeholder="State the reason for rejection"
            class="border w-[829px] h-[158px] border-[#D9D9D9] bg-[#FBFBFB] rounded p-2 mb-4"
          />
          <div class="flex justify-end">
            <button
              class="bg-[#FF4040] h-[40px] w-[82px] text-white px-4 py-2 rounded mr-2"
              @click="rejectSelection"
            >
              {{ rejectRequest.pending.value ? '...' : 'Reject'}}
            </button>
            <button
              class="bg-gray-300 text-gray-700 px-4 py-2 rounded"
              @click="closeModal"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>

     

      <Table
        :Fallback="TableRowSkeleton"
         :firstCol="!!isRoleHrdi"
        :headers="{
          head: [
            'Ernp ID',
            'Full Name',
            'Gender',
            'Program',
            'Duration',
            'Salary',
            'Contract Amount',
            'Status',
            'Academic Year',
            'Actions' 
          ],
          row: [
            'ernpId',
            'fullName',
            'gender',
            'programName',
            'duration',
            'salary',
            'totalSalary',
            'registrationStatus',
            'academicYear'
          ],
        }"
        :rows="filteredStudents"
      >
        <template #actions="{ row }">
          <div
            v-if="row?.registrationStatus == 'waiting' && row?.academicYear <= '1'"
            class="flex gap-2"
          >
            <button @click="showEachModal(row.ernpId)">
              <svg
                width="18"
                height="21"
                viewBox="0 0 18 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.5 0.409912C5.67157 0.409912 5 1.08149 5 1.90991V2.90991C5 3.73834 5.67157 4.40991 6.5 4.40991H11.5C12.3284 4.40991 13 3.73834 13 2.90991V1.90991C13 1.08149 12.3284 0.409912 11.5 0.409912H6.5Z"
                  fill="#FF4040"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M0.87868 3.28685C1.44798 2.71755 2.24209 2.5171 3.5 2.44653V2.90991C3.5 4.56677 4.84315 5.90991 6.5 5.90991H11.5C13.1569 5.90991 14.5 4.56677 14.5 2.90991V2.44653C15.7579 2.5171 16.552 2.71755 17.1213 3.28685C18 4.16553 18 5.57975 18 8.40817V14.4082C18 17.2366 18 18.6508 17.1213 19.5295C16.2426 20.4082 14.8284 20.4082 12 20.4082H6C3.17157 20.4082 1.75736 20.4082 0.87868 19.5295C0 18.6508 0 17.2366 0 14.4082V8.40817C0 5.57975 0 4.16553 0.87868 3.28685ZM9.00001 11.8493L7.03033 9.87958C6.73744 9.58669 6.26256 9.58669 5.96967 9.87958C5.67678 10.1725 5.67678 10.6473 5.96967 10.9402L7.93935 12.9099L5.96969 14.8796C5.6768 15.1725 5.6768 15.6473 5.96969 15.9402C6.26258 16.2331 6.73746 16.2331 7.03035 15.9402L9.00001 13.9706L10.9696 15.9402C11.2625 16.2331 11.7374 16.2331 12.0303 15.9402C12.3232 15.6473 12.3232 15.1725 12.0303 14.8796L10.0607 12.9099L12.0303 10.9403C12.3232 10.6474 12.3232 10.1725 12.0303 9.8796C11.7374 9.58671 11.2626 9.58671 10.9697 9.8796L9.00001 11.8493Z"
                  fill="#FF4040"
                />
              </svg>
            </button>
            <button @click="confirmeachSelection(row.ernpId)">
              <svg
                v-if="!sent.includes(row.ernpId)"
                width="24"
                height="25"
                viewBox="0 0 24 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M2.54497 9.13996C2 10.2095 2 11.6096 2 14.4099C2 17.2102 2 18.6103 2.54497 19.6799C3.02433 20.6207 3.78924 21.3856 4.73005 21.8649C5.79961 22.4099 7.19974 22.4099 10 22.4099H14C16.8003 22.4099 18.2004 22.4099 19.27 21.8649C20.2108 21.3856 20.9757 20.6207 21.455 19.6799C22 18.6103 22 17.2102 22 14.4099C22 11.6096 22 10.2095 21.455 9.13996C20.9757 8.19915 20.2108 7.43425 19.27 6.95488C18.2004 6.40991 16.8003 6.40991 14 6.40991H10C7.19974 6.40991 5.79961 6.40991 4.73005 6.95488C3.78924 7.43425 3.02433 8.19915 2.54497 9.13996ZM15.0595 12.9094C15.3353 12.6005 15.3085 12.1263 14.9995 11.8505C14.6905 11.5746 14.2164 11.6014 13.9406 11.9104L10.9286 15.2838L10.0595 14.3104C9.78359 14.0014 9.30947 13.9746 9.0005 14.2505C8.69152 14.5263 8.66468 15.0005 8.94055 15.3094L10.3691 16.9094C10.5114 17.0688 10.7149 17.1599 10.9286 17.1599C11.1422 17.1599 11.3457 17.0688 11.488 16.9094L15.0595 12.9094Z"
                  fill="#36CB56"
                />
                <path
                  d="M20.5348 3.87438C19.0704 2.40991 16.7133 2.40991 11.9993 2.40991C7.28525 2.40991 4.92823 2.40991 3.46377 3.87438C2.70628 4.63187 2.3406 5.62815 2.16406 7.06589C2.69473 6.47523 3.33236 5.98319 4.04836 5.61837C4.82984 5.22019 5.66664 5.05871 6.59316 4.98301C7.48829 4.90988 8.58971 4.90989 9.93646 4.90991H14.0621C15.4089 4.90989 16.5103 4.90988 17.4054 4.98301C18.332 5.05871 19.1688 5.22019 19.9502 5.61837C20.6662 5.98319 21.3039 6.47523 21.8345 7.06589C21.658 5.62815 21.2923 4.63187 20.5348 3.87438Z"
                  fill="#36CB56"
                />
              </svg>
              <p v-else>...</p>
            </button>
          </div>
          <div
            v-else-if="row?.registrationStatus == 'transfered' && row?.academicYear <= '1'"
            class="flex gap-2"
          >
            <button @click="showEachModal(row.ernpId)">
              <svg
                width="18"
                height="21"
                viewBox="0 0 18 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.5 0.409912C5.67157 0.409912 5 1.08149 5 1.90991V2.90991C5 3.73834 5.67157 4.40991 6.5 4.40991H11.5C12.3284 4.40991 13 3.73834 13 2.90991V1.90991C13 1.08149 12.3284 0.409912 11.5 0.409912H6.5Z"
                  fill="#FF4040"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M0.87868 3.28685C1.44798 2.71755 2.24209 2.5171 3.5 2.44653V2.90991C3.5 4.56677 4.84315 5.90991 6.5 5.90991H11.5C13.1569 5.90991 14.5 4.56677 14.5 2.90991V2.44653C15.7579 2.5171 16.552 2.71755 17.1213 3.28685C18 4.16553 18 5.57975 18 8.40817V14.4082C18 17.2366 18 18.6508 17.1213 19.5295C16.2426 20.4082 14.8284 20.4082 12 20.4082H6C3.17157 20.4082 1.75736 20.4082 0.87868 19.5295C0 18.6508 0 17.2366 0 14.4082V8.40817C0 5.57975 0 4.16553 0.87868 3.28685ZM9.00001 11.8493L7.03033 9.87958C6.73744 9.58669 6.26256 9.58669 5.96967 9.87958C5.67678 10.1725 5.67678 10.6473 5.96967 10.9402L7.93935 12.9099L5.96969 14.8796C5.6768 15.1725 5.6768 15.6473 5.96969 15.9402C6.26258 16.2331 6.73746 16.2331 7.03035 15.9402L9.00001 13.9706L10.9696 15.9402C11.2625 16.2331 11.7374 16.2331 12.0303 15.9402C12.3232 15.6473 12.3232 15.1725 12.0303 14.8796L10.0607 12.9099L12.0303 10.9403C12.3232 10.6474 12.3232 10.1725 12.0303 9.8796C11.7374 9.58671 11.2626 9.58671 10.9697 9.8796L9.00001 11.8493Z"
                  fill="#FF4040"
                />
              </svg>
            </button>
            <button @click="confirmeachSelection(row.ernpId)">
              <svg
                v-if="!sent.includes(row.ernpId)"
                width="24"
                height="25"
                viewBox="0 0 24 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M2.54497 9.13996C2 10.2095 2 11.6096 2 14.4099C2 17.2102 2 18.6103 2.54497 19.6799C3.02433 20.6207 3.78924 21.3856 4.73005 21.8649C5.79961 22.4099 7.19974 22.4099 10 22.4099H14C16.8003 22.4099 18.2004 22.4099 19.27 21.8649C20.2108 21.3856 20.9757 20.6207 21.455 19.6799C22 18.6103 22 17.2102 22 14.4099C22 11.6096 22 10.2095 21.455 9.13996C20.9757 8.19915 20.2108 7.43425 19.27 6.95488C18.2004 6.40991 16.8003 6.40991 14 6.40991H10C7.19974 6.40991 5.79961 6.40991 4.73005 6.95488C3.78924 7.43425 3.02433 8.19915 2.54497 9.13996ZM15.0595 12.9094C15.3353 12.6005 15.3085 12.1263 14.9995 11.8505C14.6905 11.5746 14.2164 11.6014 13.9406 11.9104L10.9286 15.2838L10.0595 14.3104C9.78359 14.0014 9.30947 13.9746 9.0005 14.2505C8.69152 14.5263 8.66468 15.0005 8.94055 15.3094L10.3691 16.9094C10.5114 17.0688 10.7149 17.1599 10.9286 17.1599C11.1422 17.1599 11.3457 17.0688 11.488 16.9094L15.0595 12.9094Z"
                  fill="#36CB56"
                />
                <path
                  d="M20.5348 3.87438C19.0704 2.40991 16.7133 2.40991 11.9993 2.40991C7.28525 2.40991 4.92823 2.40991 3.46377 3.87438C2.70628 4.63187 2.3406 5.62815 2.16406 7.06589C2.69473 6.47523 3.33236 5.98319 4.04836 5.61837C4.82984 5.22019 5.66664 5.05871 6.59316 4.98301C7.48829 4.90988 8.58971 4.90989 9.93646 4.90991H14.0621C15.4089 4.90989 16.5103 4.90988 17.4054 4.98301C18.332 5.05871 19.1688 5.22019 19.9502 5.61837C20.6662 5.98319 21.3039 6.47523 21.8345 7.06589C21.658 5.62815 21.2923 4.63187 20.5348 3.87438Z"
                  fill="#36CB56"
                />
              </svg>
              <p v-else>...</p>
            </button>
          </div>
          <div v-else-if="row?.registrationStatus == 'rejected' && row?.academicYear <= '1'">
           
            
            <button @click="confirmeachSelection(row.ernpId)">
              <svg
                v-if="!sent.includes(row.ernpId)"
                width="24"
                height="25"
                viewBox="0 0 24 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M2.54497 9.13996C2 10.2095 2 11.6096 2 14.4099C2 17.2102 2 18.6103 2.54497 19.6799C3.02433 20.6207 3.78924 21.3856 4.73005 21.8649C5.79961 22.4099 7.19974 22.4099 10 22.4099H14C16.8003 22.4099 18.2004 22.4099 19.27 21.8649C20.2108 21.3856 20.9757 20.6207 21.455 19.6799C22 18.6103 22 17.2102 22 14.4099C22 11.6096 22 10.2095 21.455 9.13996C20.9757 8.19915 20.2108 7.43425 19.27 6.95488C18.2004 6.40991 16.8003 6.40991 14 6.40991H10C7.19974 6.40991 5.79961 6.40991 4.73005 6.95488C3.78924 7.43425 3.02433 8.19915 2.54497 9.13996ZM15.0595 12.9094C15.3353 12.6005 15.3085 12.1263 14.9995 11.8505C14.6905 11.5746 14.2164 11.6014 13.9406 11.9104L10.9286 15.2838L10.0595 14.3104C9.78359 14.0014 9.30947 13.9746 9.0005 14.2505C8.69152 14.5263 8.66468 15.0005 8.94055 15.3094L10.3691 16.9094C10.5114 17.0688 10.7149 17.1599 10.9286 17.1599C11.1422 17.1599 11.3457 17.0688 11.488 16.9094L15.0595 12.9094Z"
                  fill="#36CB56"
                />
                <path
                  d="M20.5348 3.87438C19.0704 2.40991 16.7133 2.40991 11.9993 2.40991C7.28525 2.40991 4.92823 2.40991 3.46377 3.87438C2.70628 4.63187 2.3406 5.62815 2.16406 7.06589C2.69473 6.47523 3.33236 5.98319 4.04836 5.61837C4.82984 5.22019 5.66664 5.05871 6.59316 4.98301C7.48829 4.90988 8.58971 4.90989 9.93646 4.90991H14.0621C15.4089 4.90989 16.5103 4.90988 17.4054 4.98301C18.332 5.05871 19.1688 5.22019 19.9502 5.61837C20.6662 5.98319 21.3039 6.47523 21.8345 7.06589C21.658 5.62815 21.2923 4.63187 20.5348 3.87438Z"
                  fill="#36CB56"
                />
              </svg>
              <p v-else>...</p>
            </button>
          </div>
          <div v-else-if="row?.registrationStatus == 'registered' && row?.academicYear <= '1'">
            <button @click="showEachModal(row.ernpId)">
              <svg
                width="18"
                height="21"
                viewBox="0 0 18 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.5 0.409912C5.67157 0.409912 5 1.08149 5 1.90991V2.90991C5 3.73834 5.67157 4.40991 6.5 4.40991H11.5C12.3284 4.40991 13 3.73834 13 2.90991V1.90991C13 1.08149 12.3284 0.409912 11.5 0.409912H6.5Z"
                  fill="#FF4040"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M0.87868 3.28685C1.44798 2.71755 2.24209 2.5171 3.5 2.44653V2.90991C3.5 4.56677 4.84315 5.90991 6.5 5.90991H11.5C13.1569 5.90991 14.5 4.56677 14.5 2.90991V2.44653C15.7579 2.5171 16.552 2.71755 17.1213 3.28685C18 4.16553 18 5.57975 18 8.40817V14.4082C18 17.2366 18 18.6508 17.1213 19.5295C16.2426 20.4082 14.8284 20.4082 12 20.4082H6C3.17157 20.4082 1.75736 20.4082 0.87868 19.5295C0 18.6508 0 17.2366 0 14.4082V8.40817C0 5.57975 0 4.16553 0.87868 3.28685ZM9.00001 11.8493L7.03033 9.87958C6.73744 9.58669 6.26256 9.58669 5.96967 9.87958C5.67678 10.1725 5.67678 10.6473 5.96967 10.9402L7.93935 12.9099L5.96969 14.8796C5.6768 15.1725 5.6768 15.6473 5.96969 15.9402C6.26258 16.2331 6.73746 16.2331 7.03035 15.9402L9.00001 13.9706L10.9696 15.9402C11.2625 16.2331 11.7374 16.2331 12.0303 15.9402C12.3232 15.6473 12.3232 15.1725 12.0303 14.8796L10.0607 12.9099L12.0303 10.9403C12.3232 10.6474 12.3232 10.1725 12.0303 9.8796C11.7374 9.58671 11.2626 9.58671 10.9697 9.8796L9.00001 11.8493Z"
                  fill="#FF4040"
                />
              </svg>
            </button>
          
          </div>
        </template>

        <template #headerFirst>
          <div class="px-1">
            <input
              @click="selectAll($event.target.checked)"
              :checked="allSelected"
              type="checkbox"
            />
          </div>
        </template>
        <template #select="{ row }">
          <input
            @change="selectUser(row?.ernpId)"
            :checked="selected.includes(row.ernpId)"
            type="checkbox"
          />
        </template>
      </Table>
    </div>
    <div
      v-if="showRejectionReasonModal"
      class="fixed inset-0  flex items-center justify-center bg-black bg-opacity-50"
    >
      <div
        class="bg-white ml-48 rounded-lg shadow-lg gap-3 flex flex-col space-between-[24px] p-6 w-[877px] h-[302px]"
      >
        <div class="flex justify-between">
          <h2
            class="text-left flex font-dm-sans leading-[24px] text-[14px] font-bold text-[#4E585F]"
          >
            Reject Reason
          </h2>
          <button
            class="h-[13px] w-[13px] px-4 py-2 rounded"
            @click="closeRejectionReasonModal"
          >
            <svg
              width="17"
              height="17"
              viewBox="0 0 17 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15 2L2.00005 14.9999M2 1.99995L14.9999 14.9999"
                stroke="#FF4040"
                stroke-width="3.5"
                stroke-linecap="round"
              />
            </svg>
          </button>
        </div>

        <p
          class="border w-[829px] h-[158px] border-[#D9D9D9] bg-[#FBFBFB] rounded p-2 mb-4 overflow-auto"
        >
          {{ currentRow?.rejectionReason }}
        </p>
        <div class="flex justify-end">
          <button
            class="bg-[#FF4040] h-[40px] w-[82px] text-white px-4 py-2 rounded mr-2"
            @click="closeRejectionReasonModal"
          >
            Close
          </button>
        </div>
      </div>
    </div>
    <div
      v-if="isModalVisibles"
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
        <h3 class="text-xl font-semibold  text-gray-800 mb-6">Reassign Resident</h3>

        <!-- Form -->
        <form
          @submit.prevent="saveChanges"
          class="grid grid-cols-1 gap-y-4 gap-x-6  md:grid-cols-3 md:gap-x-8"
        ><div class=" py-4 gap-2 px-4 rounded bg-yellow-50 col-span-3"> <label class="font-bold "> Rejection Reason</label> <br>{{ selectedRow.rejectionReason }}</div>
        <div class=" bg-blue-50 flex col-span-3 py-2 px-4 rounded justify-between ">
          
         <div class=" grid flex-1 grid-cols-2 gap-2">
          <div class="" >
            <label
              for="universityName"
              class="block text-sm font-medium  text-gray-700"
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
          <div class="  ">
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
         </div>
          </div>
        
          <!-- Input Fields -->
          <div class="col-span-1">
            <label for="ernpId" class="block text-sm font-medium text-gray-700"
              >ERNP ID</label
            >
            <input
              v-model="selectedRow.ernpId"
              id="ernpId"
              disabled  
              class="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>

          <div class="col-span-1">
            <label
              for="fullName"
              class="block text-sm font-medium text-gray-700"
              readonly
              >Full Name</label
            >
            <input
              v-model="selectedRow.fullName"
              id="fullName"
              disabled
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
              disabled
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
              disabled />
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
              disabled  >
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
              disabled />
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
           disabled
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
              disabled/>
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
            <div class="col-span-1">
    <label
      for="registrationStatus"
      class="block text-sm font-medium text-gray-700"
      style="display: none;"  
    >
      Registration Status
    </label>
    <input
      v-model="selectedRow.registrationStatus"
      id="registrationStatus"
      disabled
      value="registered" 
      style="visibility: hidden;" 
      class="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
    />
  </div>
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
              @click="changeEachSelection"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
    <div
      v-if="showStudent"
      class="fixed inset-0  flex items-center justify-center bg-black bg-opacity-50"
    >
      <div
        class="bg-white ml-48 rounded-lg shadow-lg gap-3 flex flex-col space-between-[24px] p-6 w-[877px]"
      >
        <div class="flex justify-between">
          <h2
            class="text-left flex font-dm-sans leading-[24px] text-[14px] font-bold text-[#4E585F]"
          >
            Student Information
          </h2>
          <button
            class="h-[13px] w-[13px] px-4 py-2 rounded"
            @click="closeStudent"
          >
            <svg
              width="17"
              height="17"
              viewBox="0 0 17 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15 2L2.00005 14.9999M2 1.99995L14.9999 14.9999"
                stroke="#FF4040"
                stroke-width="3.5"
                stroke-linecap="round"
              />
            </svg>
          </button>
        </div>
        <form
          @submit.prevent="saveChanges"
          class="grid grid-cols-1 gap-y-4 gap-x-6 md:grid-cols-3 md:gap-x-8"
        >
          <!-- ERNP ID -->
          <div class="col-span-1">
            <label for="ernpId" class="block text-sm font-medium text-gray-700"
              >ERNP ID</label
            >
            <input
              v-model="currentRow.ernpId"
              id="ernpId"
              readonly
              class="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>

          <!-- Full Name -->
          <div class="col-span-1">
            <label
              for="fullName"
              class="block text-sm font-medium text-gray-700"
              >Full Name</label
            >
            <input
              v-model="currentRow.fullName"
              id="fullName"
              readonly
              class="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>

          <!-- Email -->
          <div class="col-span-1">
            <label for="email" class="block text-sm font-medium text-gray-700"
              >Email</label
            >
            <input
              v-model="currentRow.email"
              id="email"
              readonly
              class="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>

          <!-- Phone -->
          <div class="col-span-1">
            <label for="phone" class="block text-sm font-medium text-gray-700"
              >Phone</label
            >
            <input
              v-model="currentRow.phone"
              id="phone"
              readonly
              class="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>

          <!-- Gender -->
          <div class="col-span-1">
            <label for="gender" class="block text-sm font-medium text-gray-700"
              >Gender</label
            >
            <input
              v-model="currentRow.gender"
              id="gender"
              readonly
              class="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>

          <!-- Date of Birth -->
          <div class="col-span-1">
            <label
              for="dateOfBirth"
              class="block text-sm font-medium text-gray-700"
              >Date of Birth</label
            >
            <input
              v-model="currentRow.dateOfBirth"
              id="dateOfBirth"
              readonly
              class="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>

          <!-- Address -->
          <div class="col-span-1">
            <label for="address" class="block text-sm font-medium text-gray-700"
              >Address</label
            >
            <input
              v-model="currentRow.address"
              id="address"
              readonly
              class="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>

          <!-- Duration -->
          <div class="col-span-1">
            <label
              for="duration"
              class="block text-sm font-medium text-gray-700"
              >Duration</label
            >
            <input
              v-model="currentRow.duration"
              id="duration"
              readonly
              class="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>
         

          <!-- Salary -->
          <div class="col-span-1">
            <label for="salary" class="block text-sm font-medium text-gray-700"
              >Salary</label
            >
            <input
              v-model="currentRow.salary"
              id="salary"
              readonly
              class="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>

          <!-- Contract Amount -->
          <div class="col-span-1">
            <label
              for="totalSalary"
              class="block text-sm font-medium text-gray-700"
              >Contract Amount</label
            >
            <input
              v-model="currentRow.totalSalary"
              id="totalSalary"
              readonly
              class="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>

          <!-- University Name -->

          <!-- Program Name -->
          <div class="col-span-1">
            <label
              for="programName"
              class="block text-sm font-medium text-gray-700"
              >Program</label
            >
            <input
              v-model="currentRow.programName"
              id="programName"
              readonly
              class="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>
          <div class="col-span-1">
            <label
              for="programName"
              class="block text-sm font-medium text-gray-700"
              >Program</label
            >
            <input
              v-model="currentRow.campusStatus"
              id="campusStatus"
              readonly
              class="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>
          <!-- Action Buttons -->
          <div class="flex justify-end gap-3 pt-4 col-span-3">
            <button
              type="button"
              @click="withdrawStudent(currentRow.ernpId)"
              class="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-[#ee1919] transition"
            >
              Withdraw This Student
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
</style>
