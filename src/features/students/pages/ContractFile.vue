<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { useApiRequest } from '@/composables/useApiRequest';
import { getContractById, rejectContract , confirmContract} from '../api/contractApi';
import { useContracts } from '../store/contractStore';
import { toasted } from '@/utils/utils';
const route = useRoute();
const contractId = route.params.contractId;
const req = useApiRequest();
const isModalVisibleApprove = ref(false);
const isModalVisibleReject = ref(false);
const reason = ref('');
const selectedId = ref(null);
const sudents = useContracts();

req.send(() => getContractById(contractId));



function showModalReject(id) {
  console.log('Opening reject modal with ID:', id); 
  selectedId.value = id;
  isModalVisibleReject.value = true;
}
function showModalApprove(id) {
  console.log('Opening reject modal with ID:', id); 
  selectedId.value = id;
  isModalVisibleApprove.value = true;
}

async function confirmEachSelection(id) {
  if (req.pending.value) return;

  const status = 'Approved';
  try {
    const response = await confirmContract(id,status,reason.value);
    if (response.success) {
      sudents.updateStatus(status,[id]); // Update the status of the specific row
      closeModal();
      toasted(true, 'Confirmed', 'Contract has been Declined.');
    } else {
      toasted(false, 'Confirmed', 'Failed to reject the contract.');
    }
  } catch (error) {
    console.error('Error rejecting contract:', error);
    toasted(false, 'Confirmed', 'An error occurred.');
  }
}
async function rejectEachSelection(id) {
  if (req.pending.value) return;

  const status = 'Declined';
  try {
    const response = await rejectContract(id,status,reason.value);
    if (response.success) {
      sudents.updateStatus(status,[id]); // Update the status of the specific row
      closeModal();
      toasted(true, 'Declined', 'Contract has been Declined.');
    } else {
      toasted(false, 'Declined', 'Failed to reject the contract.');
    }
  } catch (error) {
    console.error('Error rejecting contract:', error);
    toasted(false, 'Declined', 'An error occurred.');
  }
}

function closeModal() {
  isModalVisibleApprove.value = false;
  isModalVisibleReject.value = false;
}

function submitReason() {
  closeModal();
}
const address = [{name: 'region', value: 'region'}, {name: 'city', value: 'city'}, {name: 'Sub City', value: 'subCity'}, {name: 'woreda', value: 'woreda'}, {name: 'house Number', value: 'houseNumber'},{name: 'Status', value: 'contractStatus'}, ]

const files = [{name: 'martial Name', value: 'martialCertName'}, {name: 'identity Name', value: 'identityCertName'}, {name: 'agent Name', value: 'agentCertName'}]

</script>


<template>
	<div class="flex flex-col gap-4">
		<p class="text-gray-500 font-semibold">Address</p>
		<div class="grid grid-cols-2 gap-4">
			<div class="flex flex-col gap-1 p-2 bg-gray-200 rounded" v-for="{name, value} in address" :key="name">
				<p class="text-gray-500">{{ name }}</p>
				<p v-if="req.response.value">
					{{ req.response.value?.[value] || '' }}
				</p>
				<p v-else class="h-4 w-full rounded-full bg-gray-300"</p>
			</div>
		</div>
		<p class="text-gray-500 font-semibold">Marriage Status</p>
		<div class="grid grid-cols-2 gap-4">
			<div class="flex flex-col gap-1 p-2 bg-gray-200 rounded">
				<div class="border-b-2 border-dark/50 pb-2">
					<p class="text-gray-500">Status</p>
					<p v-if="req.response.value">
						{{ req.response.value?.['martialStatus'] || '' }}
					</p>
					<p v-else class="h-4 w-full rounded-full bg-gray-300"></p>
				</div>
				<div v-if="req.response.value?.martialCertName" class="border-b border-2 pb-2">
					<p class="text-gray-500 capitalize">martial Name</p>
					<p class="flex items-center gap-2">
						<p>{{ req.response.value?.martialCertName }}</p>
						<button @click="getFile(req.response.value?.martialCertName)" class="px-4 py-1 rounded text-white bg-secondary">Open</button>
					</p>
				</div>
			</div>
			<div class="flex flex-col gap-1 p-2 bg-gray-200 rounded">
				<div v-if="req.response.value?.identityCertName" class="border-b-2 border-dark/50 pb-2">
					<p class="text-gray-500">identity Name</p>
					<p class="flex items-center justify-between	 gap-2">
						<p>{{ req.response.value?.identityCertName }}</p>
						<button @click="getFile(req.response.value?.identityCertName)" class="px-4 py-1 rounded text-white bg-secondary">Open</button>
					</p>
				</div>
				<div v-if="req.response.value?.agentCertName" class="border-b border-2 pb-2">
					<p class="text-gray-500 capitalize">agent Name</p>
					<p class="flex items-center gap-2">
						<p>{{ req.response.value?.agentCertName }}</p>
						<button @click="getFile(req.response.value?.agentCertName)" class="px-4 py-1 rounded text-white bg-secondary">Open</button>
					</p>
				</div>
			</div>
		</div>
		<div class="flex justify-between items-center p-4  text-[#4E585F] font-dm-sans text-[16px] font-bold leading-[24px] text-left">
      <div class="flex justify-end items-right space-x-4 p-4">
  <button @click="showModalReject(contractId)" class="btn-reject">
    Reject
  </button>
  <button @click="showModalApprove(contractId)" class="btn-approve">
    Approve
  </button>
</div>

    <!-- Reject Modal -->
      <div v-if="isModalVisibleReject" class="modal-container">
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
                <button class="bg-[#FF4040] h-[40px] w-[82px] text-white px-4 py-2 rounded mr-2" @click="rejectEachSelection(selectedId)">
                  Reject
                </button>
                <button class="bg-gray-300 text-gray-700 px-4 py-2 rounded" @click="closeModal">
                  Cancel
                </button>
              </div>
            </div>
      </div>

    <!-- Approve Modal -->
    <div v-if="isModalVisibleApprove" class="modal-container">
      <div class="modal-content">
        <div class="modal-header">
          <h2>Approve?</h2>
          <button @click="closeModal" class="modal-close-btn">
            Close
          </button>
        </div>
        <textarea
          v-model="reason"
          placeholder="State any note or remark"
          class="modal-textarea"
        />
        <div class="modal-footer items-end">
          <button @click="confirmEachSelection(selectedId)" class="btn-confirm-approve">
            Approve
          </button>
          <button @click="closeModal" class="btn-cancel">
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
	</div>

</template>
<style scoped>
.btn-reject {
  width: 129px;
  height: 40px;
  padding: 8px 16px;
  border-radius: 6px;
  background-color: #FF4040;
  color: white;
}

.btn-approve {
  width: 129px;
  height: 40px;
  padding: 8px 16px;
  border-radius: 6px;
  background-color: #21618C;
  color: white;
}

.modal-container {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
}

.modal-content {
  background: white;
  border-radius: 8px;
  padding: 16px;
  width: 500px;
}

.modal-header,
.modal-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-textarea {
  width: 100%;
  height: 120px;
  margin-top: 8px;
  padding: 8px;
  border: 1px solid #D9D9D9;
  border-radius: 4px;
  background: #FBFBFB;
}

.btn-confirm-reject,
.btn-confirm-approve {
  background-color: #21618C;
  color: white;
  padding: 8px 16px;
  border-radius: 4px;
}

.btn-cancel {
  background-color: gray;
  color: white;
  padding: 8px 16px;
  border-radius: 4px;
}

.modal-close-btn {
  cursor: pointer;
}
</style>