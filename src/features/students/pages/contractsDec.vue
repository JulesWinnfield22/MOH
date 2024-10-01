<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { usePagination } from '@/composables/usePagination'
import {findAllByContractStatus , findAllByContractStatusDeclined} from '@/features/students/api/contractApi'
import { useAuth } from '@/store/auth.js'
import Table from '@com/Table.vue'
import { useContracts } from '../store/contractStore'
import TableRowSkeleton from '@/skeletons/TableRowSkeleton.vue'
import { confirmContract, rejectContract } from '@/features/students/api/contractApi'
import { useApiRequest } from '@/composables/useApiRequest'
import { formatCurrency, toasted } from '@/utils/utils'

const contract = useContracts()
const auth = useAuth()

const filteredRowsDeclined = computed(() => {
  return contract.contracts.filter(row => row.contractStatus === 'Declined');
});



const selected = ref([])

const route = useRoute()
const uniId = route.params.id

const request = useApiRequest()


const pagination = usePagination({
  store: contract,
  cb: (data, config) => findAllByContractStatusDeclined(),
})

const showRejectionReasonModal = ref(false);
const currentRow = ref(null);

function openRejectionReasonModal(row) {
  currentRow.value = row;
  showRejectionReasonModal.value = true;
}

function closeRejectionReasonModal() {
  showRejectionReasonModal.value = false;
  currentRow.value = null;
}
function selectUser(item) {
  const idx = selected.value.findIndex(el => {
    return item  == el
  })
  if (idx === -1) {
    selected.value.push(item)
  } else {
    selected.value.splice(idx, 1)
  }
}

function selectAll(select) {
  console.log(select)
  if(select) {
    selected.value = (contract.contracts || []).map(el => el.ernpId) || []
  } else {
    selected.value = []
  }
}

const allSelected = computed(() => {
  const len = (contract.contracts || []).length
  return len != 0 && len == selected.value?.length
})

const isRoleHrdi = computed(() => auth.auth?.user?.privileges?.[0] == 'ROLE_University')
</script>
<template>
  <div class="bg-[#FBFBFB] p-5 overflow-x-scroll show-scrollbar">
    <div v-if="showRejectionReasonModal " class="fixed inset-0  flex items-center justify-center bg-black bg-opacity-50">
            <div class="bg-white rounded-lg shadow-lg gap-3 ml-48 flex flex-col space-between-[24px] p-6 w-[877px] h-[302px]">
              <div class=" flex justify-between">
                <h2 class="text-left flex font-dm-sans leading-[24px] text-[14px] font-bold text-[#4E585F]">
                  Reject Reason
                </h2>
                <button class="h-[13px] w-[13px] px-4 py-2 rounded" @click="closeRejectionReasonModal">
                  <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15 2L2.00005 14.9999M2 1.99995L14.9999 14.9999" stroke="#FF4040" stroke-width="3.5" stroke-linecap="round" />
                  </svg>
                </button>
              </div>
            
              <p class="border w-[829px] h-[158px] border-[#D9D9D9] bg-[#FBFBFB] rounded p-2 mb-4 overflow-auto">
  {{ currentRow?.rejectionReason }}
</p>
              <div class="flex justify-end">
                <button class="bg-[#FF4040] h-[40px] w-[82px] text-white px-4 py-2 rounded mr-2" @click="closeRejectionReasonModal">
                  Close
                </button>
                
              </div>
            </div>
          </div>
   
    <p class=" font-bold pb-8 " v-if="contract.contracts.length"> 
      {{contract.contracts[0].unversityName}}
    </p>
   <p class="font-bold pb-8">
    Declined
  </p>
  <Table
    :Fallback="TableRowSkeleton"
    :firstCol="isRoleHrdi"
    :headers="{
  head: ['Ernp ID', 'Full Name', 'program', 'university', 'Duration', 'Salary', 'Contract Amount', 'region','city','subCity','woreda','houseNumber','status','reason'],
  row: ['id', 'fullName', 'program', 'university', 'duration', 'salary', 'totalSalary', 'totalTrainingCost','subCity','city','woreda','houseNumber','contractStatus']
}"
    :cells="{
      totalSalary: totalSalary => formatCurrency(totalSalary),
      salary: salary => formatCurrency(salary)
    }"
    :rows="filteredRowsDeclined"
  >
    <template #headerFirst>
      <div class="px-1">
        <input @click="selectAll($event.target.checked)" :checked="allSelected" type="checkbox" />
      </div>
    </template>
    <template #select="{ row }">
      <input @change="selectUser(row?.ernpId)" :checked="selected.includes(row.ernpId)" type="checkbox" />
    </template>
    <template #reason="{ row }">
  <button @click="openRejectionReasonModal(row)" class="bg-secondary text-white rounded px-4 py-1">
    open
  </button>
</template>
  </Table>
 
    <div class="flex justify-center items-center">
    </div>
    <div class="p-4 flex flex-col items-center">
      <div class="w-full">
        <!-- Your content goes here -->
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
