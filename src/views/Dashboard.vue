<script setup>
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { usePaginationTemp } from '@/composables/usePaginaionTemp';
import { findAllByContractStatusApproved } from '@/features/students/api/contractApi';
import { useAuth } from '@/store/auth.js';
import Table from '@com/Table.vue';
import { useContracts } from '@/features/students/store/contractStore';
import TableRowSkeleton from '@/skeletons/TableRowSkeleton.vue';
import {
  confirmContract,
  rejectContract,
} from '@/features/students/api/contractApi';
import { useApiRequest } from '@/composables/useApiRequest';
import { formatCurrency, toasted } from '@/utils/utils';
import { usePagination } from '@/composables/usePagination';

const selectedTable = ref('approved');
const contract = useContracts();
const auth = useAuth();
const currentRow = ref(null);
const showStudent = ref(false);

function openStudent(row) {
  currentRow.value = row;
  showStudent.value = true;
}

function closeStudent() {
  showStudent.value = false;
}

const selected = ref([]);

const route = useRoute();
const uniId = route.params.id;

const request = useApiRequest();

const pagination = usePagination({
  store: contract,
  cb: (data, config) => findAllByContractStatusApproved(),
});

function confirmSelection() {
  if (!selected.value?.length || request.pending.value) return;

  request.send(
    () => confirmContract(selected.value),
    (res) => {
      if (res.success) {
        contract.updateStatus('registered', selected.value);
        selected.value = [];
      }
      toasted(res.success, 'Registered', res.error);
    }
  );
}

function rejectSelection() {
  if (!selected.value?.length || request.pending.value) return;

  request.send(
    () => rejectContract(selected.value),
    (res) => {
      if (res.success) {
        contract.updateStatus('rejected', selected.value);
        selected.value = [];
      }
      toasted(res.success, 'Rejected', res.error);
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
    selected.value = (contract.contracts || []).map((el) => el.ernpId) || [];
  } else {
    selected.value = [];
  }
}

// Remove filtering and return all rows
const allRows = computed(() => {
  return contract.contracts;
});

const allSelected = computed(() => {
  const len = (contract.contracts || []).length;
  return len != 0 && len == selected.value?.length;
});

const isRoleHrdi = computed(
  () => auth.auth?.user?.privileges?.[0] == 'ROLE_University'
);

const testUser = {
  name: 'John Doe',
  email: 'john@example.com',
  title: 'Software Engineer',
  title2: 'Web dev',
  status: 'Active',
  role: 'Owner',
};

const users = ref([...Array(10).keys()].map(() => testUser));
</script>

<template>
  <div class="grid p-5 grid-cols-3">
    <div class="flex col-span-2 flex-col p-4">
      <!-- <div class="flex items-center justify-between mb-4">
      <<div class="fixed inset-y-0 left-0 z-30 w-64 overflow-y-auto transition duration-300 transform bg-[#092537] lg:translate-x-0 lg:static lg:inset-0 bg-cover bg-center" style="background-image: url('.../assets/Untitled.jpg');">
        <h1 class="text-2xl font-bold ">
          63 ጤና ሚኒስቴር-ኢትዮጵያ
        </h1>
        <p class="text-sm text-gray-500 ">
          MINISTRY OF HEALTH-ETHIOPIA
        </p>
      </div> -->
      <div
        class="bg-[#092537] p-4 leading-8 h-[210px] max-w-full rounded-2xl relative overflow-hidden"
      >
        <!-- Parent Background -->

        <!-- Inner Background -->
        <div
          class="absolute inset-0 bg-[#85CEFF] p-4 leading-8 h-[100.35px] w-[798.89px] rounded-[0px 0px 10px 0px] transform rotate-[16.16deg] ml-28"
        >
          <!-- Content inside inner div -->
        </div>
        <div
          class="absolute inset-0 bg-[#21618C] p-4 leading-8 h-[100.35px] w-[910.91px] rounded-[0px 0px 10px 0px] transform rotate-[16.16deg] ml-[20rem]"
        >
          <!-- Content inside inner div -->
        </div>
        <div class="flex items-center px-4" style="margin-bottom: 10px">
          <img class="w-[69px] h-[69px]" src="../assets/Icons/Union.png" />
        </div>
        <div
          class="ml-4 flex flex-col gap-1 w-[175px] h-[28px] text-[#FFFFFF] leading-[21px] text-[14px]"
          style="margin-bottom: 30px"
        >
          <span class="text-md whitespace-nowrap font-normal"
            >ጤና ሚኒስቴር-ኢትዮጵያ</span
          >
          <span class="text-xs font-dm-sans whitespace-nowrap"
            >MINISTRY OF HEALTH ETHIOPIA</span
          >
        </div>
        <div
          class="ml-4 flex flex-col gap-1 font-dm-sans"
          style="margin-top: 30px"
        >
          <span
            class="text-left whitespace-nowrap leading-[21px] text-[14px] font-normal text-[#FFFFFF]"
            >Promote the health and well-being of the society through providing
            and regulating a
          </span>
          <span
            class="text-left text-[#FFFFFF] leading-[21px] text-[14px] font-normal whitespace-nowrap"
            >comprehensive package of health services of the highest possible
            quality in an equitable manner.</span
          >
        </div>
      </div>
      <div class="bg-[#FBFBFB] p-4 rounded-md mb-4">
        <!-- <p class="text-gray-600">
        Lorem ipsum dolor sit amet consectetur. Tincidunt consectetur ultrices ipsum felis
        in au neque. Sit consectetur senectus amet duis.
      </p> -->
      </div>
      <div class="grid grid-cols-3 gap-4 mb-4">
        <div class="bg-[#FBFBFB] p-4 rounded-md">
          <h2
            class="text-sm font-normal mb-2 leading-[21px] text-[#4E585F] font-dm-sans"
          >
            Current Residents
          </h2>
          <p class="text-3xl font-bold leading-8 text-[#4E585F]">890</p>
        </div>
        <div class="bg-[#FBFBFB] p-4 rounded-md">
          <h2
            class="text-sm font-normal mb-2 leading-[21px] text-[#4E585F] font-dm-sans"
          >
            Contrcts
          </h2>
          <p class="text-3xl font-bold leading-8 text-[#4E585F]">1,870</p>
        </div>
      </div>
    </div>
    <div
      class="bg-[#FBFBFB] p-4 rounded-[16px 24px 16px 24px] gap-2.5 ml-12 rounded-md w-[297px]"
      style="margin-bottom: 30px"
    >
      <h2 class="text-lg font-bold mb-2" style="margin-bottom: 30px">
        Activities
      </h2>
      <ul class="space-y-2">
        <li class="flex items-center justify-between mb-4">
          <div class="bg-[#FFFFFF]" style="margin-bottom: 30px">
            <h3 class="text-[#4E585F] leading-[21px] text-[14px] font-bold">
              New Application
              <span class="text-[#4E585F] text-[12px] ml-[96px] text-right"
                >10 min</span
              >
            </h3>
            <p class="text-[#4E585F] leading-[18px] text-[12px] font-normal">
              Desta Tegegn has applied a new
            </p>
            <p class="text-[#4E585F] leading-[18px] text-[12px] font-normal">
              applications.
            </p>
          </div>
        </li>
        <li class="flex items-center justify-between">
          <div class="bg-[#FFFFFF]" style="margin-bottom: 30px">
            <h3 class="text-[#4E585F] leading-[21px] text-[14px] font-bold">
              Application Approved
              <span class="text-[#4E585F] text-[12px] ml-[80px] text-right"
                >1 hr</span
              >
            </h3>
            <p class="text-[#4E585F] leading-[18px] text-[12px] font-normal">
              Lema Girma has approved the application of a resident.
            </p>
          </div>
        </li>
        <li class="flex items-center justify-between">
          <div class="bg-[#FFFFFF]" style="margin-bottom: 30px">
            <h3 class="text-[#4E585F] leading-[21px] text-[14px] font-bold">
              Application Rejected
              <span class="text-[#4E585F] text-[12px] ml-[80px] text-right"
                >2 hr</span
              >
            </h3>
            <p class="text-[#4E585F] leading-[18px] text-[12px] font-normal">
              Dargow Atnafu has rejected an application.
            </p>
          </div>
        </li>
      </ul>
    </div>
  </div>
  <div class="bg-[#FBFBFB] w-full col-span-3 p-4 rounded-md mb-4 text-[#4E585F] w-[954.7px]">
      <h2 class="text-lg font-bold mb-4 leading-6 text-[#4E585F]">
        Latest Signed Contacts
      </h2>
      <Table
        :Fallback="TableRowSkeleton"
        :firstCol="isRoleHrdi"
        :headers="{
          head: [
            'Ernp ID',
            'Full Name',
            'Program',
            'University',
            'Duration',
            'Salary',
            'Contract Amount',
            'Status',
          ],
          row: [
            'id',
            'fullName',
            'program',
            'university',
            'duration',
            'salary',
            'totalSalary',
            'contractStatus',
          ],
        }"
        :cells="{
          totalSalary: (totalSalary) => formatCurrency(totalSalary),
          salary: (salary) => formatCurrency(salary),
        }"
        :rows="allRows"
      >
      </Table>
    </div>
</template>
