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
	</div>
</template>