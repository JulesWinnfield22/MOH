<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { usePaginationTemp } from '@/composables/usePaginaionTemp'
import { findAllByContractStatusApproved} from '@/features/students/api/contractApi'
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

const filteredRows = computed(() => {
  return contract.contracts.filter(row => row.contractStatus === 'submitted');
});
const filteredRowsApproved = computed(() => {
  return contract.contracts.filter(row => row.contractStatus === 'Approved');
});


const selected = ref([])

const route = useRoute()
const uniId = route.params.id

const request = useApiRequest()

const pagination = usePaginationTemp({
  store: contract,
  cb: (data, config) => findAllByContractStatusApproved(),
})

function confirmSelection() {
  if(!selected.value?.length || request.pending.value) return

  request.send(
    () => confirmContract(selected.value),
    res => {
      if(res.success) {
        contract.updateStatus('registered', selected.value)
        selected.value = []
      }
      toasted(res.success, 'Registered', res.error)
    }
  )
}

function rejectSelection() {
  if(!selected.value?.length || request.pending.value) return
  
  request.send(
    () => rejectContract(selected.value),
    res => {
      if(res.success) {
        contract.updateStatus('rejected', selected.value)
        selected.value = []
      }
      toasted(res.success, 'Rejected', res.error)
    }
  )
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
  <div class="bg-[#FBFBFB] overflow-x-scroll show-scrollbar">
    <div v-if="isRoleHrdi" class="flex justify-between items-center">
      <div class="p-4 text-[#4E585F] font-dm-sans text-[16px] font-bold leading-[24px] text-left">
        contracts
      </div>
      <div class="p-4 gap-2.5 flex">
        <p class="p-4 text-[#4E585F] font-dm-sans text-[14px] font-normal leading-[24px] text-left">
          Selected {{ selected?.length || 0 }} of {{ (contract.contracts || []).length }} contracts
        </p>

        <button
          style="padding: 8px 16px; border-radius: 6px;"
          class="mt-1.5 h-[40px] w-[129px] flex font-dm-sans bg-[#FF4040] text-white font-bold rounded hover:bg-[#FF4040]"
          @click="rejectSelection"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M2.54497 8.73005C2 9.79961 2 11.1997 2 14C2 16.8003 2 18.2004 2.54497 19.27C3.02433 20.2108 3.78924 20.9757 4.73005 21.455C5.79961 22 7.19974 22 10 22H14C16.8003 22 18.2004 22 19.27 21.455C20.2108 20.9757 20.9757 20.2108 21.455 19.27C22 18.2004 22 16.8003 22 14C22 11.1997 22 9.79961 21.455 8.73005C20.9757 7.78924 20.2108 7.02433 19.27 6.54497C18.2004 6 16.8003 6 14 6H10C7.19974 6 5.79961 6 4.73005 6.54497C3.78924 7.02433 3.02433 7.78924 2.54497 8.73005ZM15.0595 12.4995C15.3353 12.1905 15.3085 11.7164 14.9995 11.4406C14.6905 11.1647 14.2164 11.1915 13.9406 11.5005L10.9286 14.8739L10.0595 13.9005C9.78359 13.5915 9.30947 13.5647 9.0005 13.8406C8.69152 14.1164 8.66468 14.5905 8.94055 14.8995L10.3691 16.4995C10.5114 16.6589 10.7149 16.75 10.9286 16.75C11.1422 16.75 11.3457 16.6589 11.488 16.4995L15.0595 12.4995Z" fill="white" />
            <path d="M20.5348 3.46447C19.0704 2 16.7133 2 11.9993 2C7.28525 2 4.92823 2 3.46377 3.46447C2.70628 4.22195 2.3406 5.21824 2.16406 6.65598C2.69473 6.06532 3.33236 5.57328 4.04836 5.20846C4.82984 4.81027 5.66664 4.6488 6.59316 4.5731C7.48829 4.49997 8.58971 4.49998 9.93646 4.5H14.0621C15.4089 4.49998 16.5103 4.49997 17.4054 4.5731C18.332 4.6488 19.1688 4.81027 19.9502 5.20846C20.6662 5.57328 21.3039 6.06532 21.8345 6.65598C21.658 5.21824 21.2923 4.22195 20.5348 3.46447Z" fill="white" />
          </svg>
          Reject
        </button>
        <button
          style="padding: 8px 16px; border-radius: 6px;"
          class="mt-1.5 flex h-[40px] w-[129px] font-dm-sans bg-[#36CB56] text-white font-bold rounded hover:bg-[#36CB56]"
          @click="confirmSelection"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M2.54497 8.73005C2 9.79961 2 11.1997 2 14C2 16.8003 2 18.2004 2.54497 19.27C3.02433 20.2108 3.78924 20.9757 4.73005 21.455C5.79961 22 7.19974 22 10 22H14C16.8003 22 18.2004 22 19.27 21.455C20.2108 20.9757 20.9757 20.2108 21.455 19.27C22 18.2004 22 16.8003 22 14C22 11.1997 22 9.79961 21.455 8.73005C20.9757 7.78924 20.2108 7.02433 19.27 6.54497C18.2004 6 16.8003 6 14 6H10C7.19974 6 5.79961 6 4.73005 6.54497C3.78924 7.02433 3.02433 7.78924 2.54497 8.73005ZM15.0595 12.4995C15.3353 12.1905 15.3085 11.7164 14.9995 11.4406C14.6905 11.1647 14.2164 11.1915 13.9406 11.5005L10.9286 14.8739L10.0595 13.9005C9.78359 13.5915 9.30947 13.5647 9.0005 13.8406C8.69152 14.1164 8.66468 14.5905 8.94055 14.8995L10.3691 16.4995C10.5114 16.6589 10.7149 16.75 10.9286 16.75C11.1422 16.75 11.3457 16.6589 11.488 16.4995L15.0595 12.4995Z" fill="white" />
            <path d="M20.5348 3.46447C19.0704 2 16.7133 2 11.9993 2C7.28525 2 4.92823 2 3.46377 3.46447C2.70628 4.22195 2.3406 5.21824 2.16406 6.65598C2.69473 6.06532 3.33236 5.57328 4.04836 5.20846C4.82984 4.81027 5.66664 4.6488 6.59316 4.5731C7.48829 4.49997 8.58971 4.49998 9.93646 4.5H14.0621C15.4089 4.49998 16.5103 4.49997 17.4054 4.5731C18.332 4.6488 19.1688 4.81027 19.9502 5.20846C20.6662 5.57328 21.3039 6.06532 21.8345 6.65598C21.658 5.21824 21.2923 4.22195 20.5348 3.46447Z" fill="white" />
          </svg>
          Confirm
        </button>
      </div>
    </div>
    <p class=" font-bold pb-8 " v-if="contract.contracts.length"> 
      {{contract.contracts[0].unversityName}}Approved
    </p>
   
  <Table
    :Fallback="TableRowSkeleton"
    :firstCol="isRoleHrdi"
    :headers="{
      head: ['Ernp ID', 'Full Name', 'Program', 'university', 'Duration', 'Salary', 'Contract Amount', 'region','city','subCity','woreda','houseNumber','status',],
      row: ['id', 'fullName', 'program', 'university', 'duration', 'salary', 'totalSalary', 'totalTrainingCost','subCity','city','woreda','houseNumber','contractStatus']
    }"
    :cells="{
      totalSalary: totalSalary => formatCurrency(totalSalary),
      salary: salary => formatCurrency(salary)
    }"
    :rows="filteredRowsApproved"
  >
    <template #headerFirst>
      <div class="px-1">
        <input @click="selectAll($event.target.checked)" :checked="allSelected" type="checkbox" />
      </div>
    </template>
    <template #select="{ row }">
      <input @change="selectUser(row?.ernpId)" :checked="selected.includes(row.ernpId)" type="checkbox" />
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
