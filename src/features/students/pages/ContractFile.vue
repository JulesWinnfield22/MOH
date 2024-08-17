<script setup>
import { useApiRequest } from '@/composables/useApiRequest';
import { useRoute } from 'vue-router';
import { getContractById, getContractFileById } from '../api/contractApi';
import { computed } from 'vue';


const route = useRoute()

const contractId = route.params.contractId

const req = useApiRequest()

req.send(
	() => getContractById(contractId),
	res => {

	}
)

function getFile(id) {
	req.send(
		() => getContractFileById(id)
	)
}

const address = [{name: 'region', value: 'region'}, {name: 'city', value: 'city'}, {name: 'Sub City', value: 'subCity'}, {name: 'woreda', value: 'woreda'}, {name: 'house Number', value: 'houseNumber'}]

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
</template>