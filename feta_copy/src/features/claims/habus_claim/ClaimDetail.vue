<script setup>
import { useRoute, useRouter } from 'vue-router';
import LayoutAuthenticated from '@/layouts/LayoutAuthenticated.vue';
import SectionMain from '@/components/section/SectionMain.vue';
import { makeAuthenticatedRequest } from '@/scripts/api'
import * as session from '@/scripts/session';
import { mdiEyeOutline, mdiAttachment, mdiFileSign, mdiPlus, mdiFileChartCheck, mdiWindowClose } from '@mdi/js';
import { onMounted, ref, computed, watch } from 'vue';
import Modal from '@/components/modal.vue';
import SectionTitleLineWithButton from '@/components/section/SectionTitleLineWithButton.vue';
import { useToast } from 'vue-toastification';
import Loader from '@/components/loader/loader.vue';
import SvgIcon from '@jamescoyle/vue-icon';
import IconRounded from '@/components/base/IconRounded.vue';
import loader from "@/components/loader/loader.vue";
import axios from 'axios';

const toast = useToast()
const router = useRouter()
const route = useRoute()

const showDetail = ref(false)
const Decline = ref(false)
const addClaimAttachment = ref(false)
const isLoading = ref(false)
const claim = ref({})
const claimAttachments = ref([])
const claimLogs = ref([{}])
const imageTitle = ref('')
const imageName = ref('')
const receiptFile = ref('')
const selectedImagePreview = ref(null)
const declineReason = ref('')
const incidentDate = ref(null);
const amount = ref(0);
const serviceUuid = ref('');
const quantity = ref(1);
const servicesCategoryList = ref([]);
const servicesCoverageType = ref([]);
const serviceGroupUuid = ref('')
const serviceCoverageType = ref([]);
const servicesSubCategoryList = ref();
const selectedServiceCategory = ref('');
const serviceSubCategory = ref('');
const currentServiceUnitPrice = ref(null);
const servicesList = ref([]);
const serviceItem = ref();
const fetchedServices = ref()
const comment = ref()
const diagnosis = ref()
const userUuid = ref('')
const claimAttachmentUuid = ref('')
const totalValue = ref(0)
const questions = ref([])
const options = { year: 'numeric', month: 'short', day: 'numeric' };

const imageUrl = import.meta.env.VITE_API_URL

const props = defineProps({
	id: {
		type: String,
		required: true
	},
});

const claimAttachmentDetailView = async (imageId, imageName, imagePath) => {
	imageTitle.value = imageName
	showDetail.value = true
	selectedImagePreview.value = null
	isLoading.value = !isLoading.value
	try {
		let customUrl = `/api/feta/claimattachments/open?claimAttachmentUuid=${imageId}`;

		const response = await axios.get(imageUrl + customUrl, { responseType: 'blob' });
		isLoading.value = false
		selectedImagePreview.value = URL.createObjectURL(response.data)

	} catch (error) {
		isLoading.value = false;
		toast.error(error.message)
	}
}

// const serviceAttachmentDetailView = async (imagePath, imageName, imageId) => {
//     imageTitle.value = imageName
//     showDetail.value = true
//     selectedImagePreview.value = null
//     isLoading.value = !isLoading.value

//     let customUrl = `http://192.168.100.5:8197/api/provider/claimconnect/service-provided/open/attachments?serviceProvidedUuid=${imageId}`;
//     if (privileges.value.includes('ProviderClaimPreparer')) {
//         customUrl = `http://192.168.100.5:8196/api/payer/claimconnect/service-provided/open/attachment?serviceProvidedUuid=${imageId}`;
//     }

//     try {

//         const response = await axios.get(customUrl, { responseType: 'blob' });
//         // await makeAuthenticatedRequest({
//         //     method: 'GET',
//         //     url: `http://192.168.100.5:8196/api/payer/claimconnect/service-provided/open/attachment?serviceProvidedUuid=${imageId}`,
//         //     responseType: 'blob'
//         // }).then((data) => {
//         console.log(response.data)
//         isLoading.value = false
//         selectedImagePreview.value = URL.createObjectURL(response.data)
//         // })
//     } catch (error) {
//         isLoading.value = false;
//         toast.error(error.message)
//     }
// }

const addNewClaimAttachment = () => {
	addClaimAttachment.value = !addClaimAttachment.value
}

const handleFileChange = async (event) => {
	receiptFile.value = event.target.files[0]
}

const submitClaimAttachment = async () => {
	isLoading.value = true;
	let formData = new FormData()
	formData.append('file', receiptFile.value)
	try {
		await makeAuthenticatedRequest({
			headers: {
				'Content-Type': 'multipart/form-data'
			},
			method: 'POST',
			url: `/api/feta/claimattachments?claimUuid=${props.id}&fileNames=${imageName.value}`,
			data: formData,
		}).then((data) => {
			isLoading.value = false
			fetchClaimAttachment()
			addClaimAttachment.value = !addClaimAttachment.value
		})

	} catch (error) {
		isLoading.value = false;
		toast.error(error)
	}
}

// const getUnitPrice = () => {
//     serviceItem.value = servicesList.value.find(item => item.eligibleServiceUuid === serviceUuid.value);
//     if (serviceItem.value) {
//         currentServiceUnitPrice.value = serviceItem.value.unitPrice
//     }
//     return currentServiceUnitPrice;
// }

// const fetchServiceByCategory = async () => {
//     isLoading.value = true
//     try {
//         await makeAuthenticatedRequest({
//             method: 'GET',
//             url: `/api/payer/claimconnect/eligible-service/search/category/${claim.value.insuredPersonUuid}`
//         }).then((data) => {
//             isLoading.value = false
//             servicesCategoryList.value = data
//         })
//     } catch (error) {
//         isLoading.value = false;
//         console.log(error)
//         toast.error(error)
//     }
// }

// const fetchServiceBySubCategory = async () => {
//     try {
//         await makeAuthenticatedRequest({
//             method: 'GET',
//             url: `/api/payer/claimconnect/eligible-service/search/subcategory/${claim.value.insuredPersonUuid}?category=${selectedServiceCategory.value}`
//         }).then((data) => {
//             servicesSubCategoryList.value = data
//             console.log("List of subcategory for Services Data")
//             console.log(data)
//         })
//     } catch (error) {
//         isLoading.value = false;
//         toast.error(error.message)
//     }
// }

// const fetchServices = async () => {
//     try {
//         await makeAuthenticatedRequest({
//             method: 'GET',
//             url: `/api/payer/claimconnect/eligible-service/search/item/${claim.value.insuredPersonUuid}?subcategory=${serviceSubCategory.value}`
//         }).then((data) => {
//             servicesList.value = data
//         })
//     } catch (error) {
//         isLoading.value = false;
//         toast.error(error.message)
//     }
// }

const fetchClaimAttachment = async () => {
	isLoading.value = true
	try {
		await makeAuthenticatedRequest({
			method: 'GET',
			url: `/api/feta/claimattachments/${route.params.id}`,
		}).then((data) => {
			isLoading.value = false
			claimAttachments.value = data
		})
	} catch (error) {
		isLoading.value = false
		toast.error(error.message)
	}
}

// const fetchClaimLogs = async () => {
//     isLoading.value = true
//     try {
//         await makeAuthenticatedRequest({
//             method: 'GET',
//             url: `/api/claimconnect/claimattachments/${props.id}`
//         }).then((data) => {
//             isLoading.value = false
//             console.log("data for logs")
//             console.log(data)
//             claimLogs.value = data
//         })
//     } catch (error) {
//         isLoading.value = false;
//         toast.error(error)
//     }
// }

watch(serviceGroupUuid, (newValue) => {
	getAmount(newValue)
})

const getAmount = async (value) => {
	try {
		await makeAuthenticatedRequest({
			method: 'GET',
			url: `/api/feta/service/${value}`
		}).then((data) => {
			isLoading.value = false
			amount.value = data.amount
		})
	} catch (error) {
		isLoading.value = false;
		toast.error(error.message)
	}
}

const fetchServiceCoverageType = async () => {
	isLoading.value = true
	try {
		await makeAuthenticatedRequest({
			method: 'GET',
			url: `/api/feta/service/list`
		}).then((data) => {
			isLoading.value = false
			servicesCoverageType.value = data
		})
	} catch (error) {
		isLoading.value = false;
		toast.error(error.message)
	}
}

const fetchClaim = async () => {
	isLoading.value = true
	try {
		await makeAuthenticatedRequest({
			method: 'GET',
			url: `/api/feta/claim/details/${props.id}`
		}).then((data) => {
			isLoading.value = false
			claim.value = data;
			// fetchClaimAttachment()
			// fetchServiceByCategory()
			// fetchServiceCoverageType()
			// fetchClaimServices()
		})
	} catch (error) {
		isLoading.value = false;
		toast.error(error.message)
	}
}

const addService = async () => {
	isLoading.value = true
	try {
		await makeAuthenticatedRequest({
			method: 'POST',
			url: `/api/feta/service/benefit`,
			data: {
				claimUuid: route.params.id,
				serviceGroupUuid: serviceGroupUuid.value,
				amount: amount.value,
				incidentDate: incidentDate.value
			}
		}).then(async (data) => {
			isLoading.value = false
			claim.value = data;
			toast.success(data.message)
			serviceUuid.value = null
			quantity.value = null
			serviceSubCategory.value = null
			selectedServiceCategory.value = null
			fetchClaim()
			fetchClaimServices()
		})
	} catch (error) {
		isLoading.value = false;
		toast.error(error.message)
	}
}

const fetchClaimServices = async () => {
	isLoading.value = !isLoading.value
	try {
		await makeAuthenticatedRequest({
			method: 'GET',
			url: `/api/feta/claim/claimed-services?claimUuid=${route.params.id}`
		}).then((data) => {
			isLoading.value = false
			fetchedServices.value = data;
			totalValue.value = 0
			data.forEach(service => {
				totalValue.value += service.amount
			});
		})
	} catch (error) {
		isLoading.value = false;
		toast.error(error.message)
	}
}

const submitClaim = async () => {
	isLoading.value = true;
	try {
		await makeAuthenticatedRequest({
			method: "PUT",
			url: `/api/feta/claim/agency/request?claimUuid=${props.id}`,
		}).then((data) => {
			isLoading.value = false;
			toast.success(data.message);
			router.push("/claim/saved");
		})
	} catch (error) {
		isLoading.value = false;
		toast.error(error.message);
	}
};

const submitDeclineReason = async () => {
	isLoading.value = true
	try {
		await makeAuthenticatedRequest({
			method: 'PUT',
			url: `/api/claimconnect/claim/deny/provider?claimUuid=${props.id}&comment=${declineReason.value}`
		}).then((data) => {
			Decline.value = !Decline.value
			declineReason.value = null
			isLoading.value = false;
			toast.success('claim successfully declined!')
			console.log(data)
			router.push('/claims')
		})
	} catch (error) {
		isLoading.value = false
		toast.error(error.message)
	}
}

const claims = []

onMounted(() => {
	fetchClaim()
	fetchServiceCoverageType()
	fetchClaimServices()
	fetchClaimAttachment()
})
</script>
<template>
	<div class="w-full h-max">
		<Modal :open="showDetail" @close="showDetail = !showDetail" :icon="mdiAttachment" className="h-9 w-9"
			:title="imageTitle" class="pt-10 w-max">
			<div class="h-500 w-200 mt-5" v-if="isLoading">
				<loader />
			</div>
			<div class="h-500 w-200 mt-5" v-else>
				<img :src="selectedImagePreview" class="w-full h-full h-500 w-200" />
			</div>
		</Modal>
		<Modal :open="Decline" @close="Decline = !Decline" className="h-9 w-9 text-red-500" title="Reject Claim"
			class="pt-10 w-max">
			<div class="w-max mt-10 flex flex-col gap-3">
				<div class="flex flex-col w-full items-start">
					<dd class="mt-1 text-lg leading-6 text-gray-700 sm:col-span-2 sm:mt-0 capitalize">
						Decline Reason</dd>
					<div class="mt-1.5 flex flex-col">
						<div
							class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:w-[383px]">
							<textarea name="declineReason" id="declineReason" cols="10" rows="7"
								class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
								placeholder="write your decline reason here..." v-model="declineReason"></textarea>
						</div>
					</div>
				</div>
				<div class="w-full flex justify-end">
					<div class="bg-primary round-xl flex gap-2 cursor-pointer item-center text-white px-5 py-1 rounded-lg"
						@click="submitDeclineReason">
						<div class="font-medium text-base">Submit</div>
					</div>
				</div>
			</div>
		</Modal>
		<Modal :open="addClaimAttachment" @close="addClaimAttachment = !addClaimAttachment" :icon="mdiAttachment"
			className="h-9 w-9" title="Attachments" class="pt-10">
			<form class="w-full flex flex-col gap-8" @submit.prevent="submitClaimAttachment">
				<div class="w-full flex flex-col gap-5 mt-10">
					<div class="flex flex-col">
						<dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 capitalize">Attachment Name
						</dd>
						<div class="mt-1.5 flex flex-col">
							<div
								class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:w-[383px]">
								<input type="text" name="imageName" id="imageName"
									class=" px-4 block flex-1 border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
									placeholder="Title" v-model="imageName" />
							</div>
							<!-- <div class="text-red-500">
                                {{ errors.fsnNumber }}
                            </div> -->
						</div>
					</div>
					<div class="flex flex-col">
						<dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 capitalize">attachment</dd>
						<div class="mt-1.5 flex flex-col">
							<div
								class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:w-[383px]">
								<input type="file" name="attachment" id="attachment"
									class=" px-4 block flex-1 border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
									placeholder="attachment" @change="handleFileChange($event)" />
							</div>
							<!-- <div class="text-red-500">
                                {{ errors.fsnNumber }}
                            </div> -->
						</div>
					</div>
				</div>
				<button :disabled="isLoading"
					class="bg-primary w-max round-xl flex gap-2 cursor-pointer item-center text-white px-2 py-1 rounded-lg">
					<div class="text-white"><svg-icon type="mdi" :path="mdiPlus"></svg-icon>
					</div>
					<div class="font-medium text-base">Add</div>
				</button>
				<div v-if="isLoading" class="min-w-full flex items-center mx-auto justify-center">
					<Loader />
				</div>
			</form>
		</Modal>
		<LayoutAuthenticated>
			<SectionMain>
				<SectionTitleLineWithButton :icon="mdiFileSign" :title="'Notify Claim'" main v-if="!isLoading && claim">
					<div class="flex justify-end gap-2 w-max">
						<div class="bg-primary round-xl flex gap-2 cursor-pointer item-center text-white px-3  py-3 rounded-lg w-48"
							@click="submitClaim">
							<div class="font-medium text-base w-full text-center">Submit</div>
						</div>

						<div class="bg-red-800 round-xl flex gap-2 cursor-pointer item-center text-white px-3  py-3 rounded-lg w-48"
							@click="Decline = !Decline">
							<div class="font-medium text-base w-full text-center">Decline</div>
						</div>
					</div>
				</SectionTitleLineWithButton>
				<div class="flex w-full">
					<div v-if="isLoading" class="min-w-full flex items-center mx-auto justify-center">
						<Loader />
					</div>
					<div v-else-if="!isLoading && claim" class="w-full flex">
						<div class="w-full flex flex-col gap-8">

							<div class="flex gap-x-14">
								<div class="w-[75%] bg-white rounded-xl py-5 px-10">
									<h3 class="text-lg font-medium text-gray-600 mb-5">
										Member Info
									</h3>
									<div class="flex flex-col gap-y-5">
										<div class="flex gap-x-10 justify-between flex-wrap">
											<div class="flex-1 flex">
												<p class="text-gray-500 mr-10 w-[8rem]">Full Name</p>
												<p class="flex-1 bg-gray-100 px-5 py-1 rounded-md text-gray-600 shadow-inner">
													{{ claim.title }} {{ claim.firstName }} {{
														claim.fatherName }} {{ claim.grandFatherName }}
												</p>
											</div>
											<div class="flex-1 flex gap-x-10">
												<p class="text-gray-500 w-[8rem]">Insurance Name</p>
												<p class="flex-1 bg-gray-100 px-5 py-1 rounded-md text-gray-600 shadow-inner">
													{{ claim.insuranceName }}
												</p>
											</div>
										</div>
										<div class="flex gap-x-10 justify-between flex-wrap">
											<div class="flex-1 flex gap-x-10 h-full">
												<p class="text-gray-500 w-[8rem]">Certificate Number</p>
												<p class="flex-1 bg-gray-100 px-5 py-1 rounded-md text-gray-600 shadow-inner">
													{{ claim.certificateNumber }}
												</p>
											</div>
										</div>
										<div class="flex gap-x-10 justify-between flex-wrap">
											<div class="flex-1 flex">
												<p class="text-gray-500 mr-10 w-[8rem]">
													Passport Number
												</p>
												<p class="flex-1 bg-gray-100 px-5 py-1 rounded-md text-gray-600 break-all shadow-inner h-full">
													{{ claim.passportNumber }}
												</p>
											</div>
											<div class="flex-1 flex">
												<p class="text-gray-500 mr-10 w-[4rem]">Phone</p>
												<p class="flex-1 bg-gray-100 px-5 py-1 rounded-md text-gray-600 break-all shadow-inner h-full">
													{{ claim.insuredPhone }}
												</p>
											</div>
										</div>
									</div>
								</div>
								<div class="bg-white rounded-xl px-10 py-5 w-[35%] flex flex-col gap-y-5">
									<h3>Policy Holder Info</h3>
									<div class="flex justify-between">
										<p class="text-gray-500">Agency Name</p>
										<p class="bg-gray-100 px-5 py-1 rounded-md text-gray-600 break-words w-[14rem]">
											{{ claim.agencyName }}
										</p>
									</div>
									<div class="flex justify-between">
										<p class="text-gray-500">Group Policy Number</p>
										<p class="bg-gray-100 px-5 py-1 rounded-md text-gray-600 break-all w-[14rem] flex items-center">
											{{ claim.agencyPolicyNumber }}
										</p>
									</div>
								</div>
							</div>


							<div class="w-full class flex flex-col">

								<div class="w-full bg-white px-8 flex-col gap-5 pt-6">
									<div class="text-gray-500 text-lg ">Benefits</div>
									<div class="flow-root max-h-64 overflow-y-scroll">
										<div class="">
											<div class="inline-block min-w-full py-2 align-middle">
												<table class="min-w-full border-separate border-spacing-0">
													<thead class="sticky top-0 rounded-t-lg">
														<tr class="px-3 divide-gray-200 bg-gray-200">
															<th scope="col"
																class="py-2 pl-4 pr-4 px-6 text-left text-sm font-semibold text-gray-900 sm:pl-0">
																<span class="ml-3"> Incident Date </span>
															</th>
															<th scope="col" class="px-4 py-2 text-left text-sm font-semibold text-gray-900">
																Coverage Type
															</th>
															<th scope="col" class="px-4 py-2 text-left text-sm font-semibold text-gray-900">
																place of Incident
															</th>
															<th scope="col" class="px-4 py-2 text-left text-sm font-semibold text-gray-900">
																Description
															</th>
															<th scope="col" class="px-4 py-2 text-left text-sm font-semibold text-gray-900">
																Amount
															</th>
														</tr>
													</thead>
													<tbody class="divide-y divide-gray-200 bg-section-bg">
														<tr v-for="(person, personIdx) in fetchedServices" :key="person.serviceProvidedUuid">
															<td
																:class="[personIdx !== claim.length - 1 ? 'border-b border-gray-200' : '', 'whitespace-nowrap py-2 pl-4 pr-3 text-sm font-base text sm:pl-6 lg:pl-8']">
																{{ person.incidentDate }}</td>
															<td
																:class="[personIdx !== claim.length - 1 ? 'border-b border-gray-200' : '', 'whitespace-nowrap py-2 hidden px-3 text-sm text sm:table-cell']">
																{{ person.item }}</td>
															<td
																:class="[personIdx !== claim.length - 1 ? 'border-b border-gray-200' : '', 'whitespace-nowrap py-2 px-3 text-sm text']">
																{{ person.amount }}</td>
														</tr>
														<tr class="bg-white">
															<td>
																<div class="flex flex-col">
																	<div class="mt-1.5 flex flex-col">
																		<div
																			class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:w-[150px]">
																			<input type="date" name="incidentDate" id="incidentDate" required
																				class="block flex-1 border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
																				placeholder="date" v-model="incidentDate" />
																		</div>
																	</div>
																</div>
															</td>
															<td>
																<div class="flex flex-col">
																	<div class="mt-1.5 flex flex-col">
																		<div
																			class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:w-[370px]">
																			<select type="text" name="serviceGroup" id="serviceGroup"
																				class="truncate px-1 w-full border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
																				placeholder="serviceGroup" v-model="serviceGroupUuid">
																				<option v-for="item in servicesCoverageType" :value="item.serviceGroupUuid">
																					{{ item.item }}</option>
																			</select>
																		</div>
																	</div>
																</div>
															</td>
															<td>
																<div class="flex flex-col">
																	<div class="mt-1.5 flex flex-col">
																		<div
																			class="flex mr-20 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:w-[180px]">
																			<input type="text" name="placeOfIncident" id="placeOfIncident"
																				v-model="placeOfIncident"
																				class="w-full block cursor-not-allowed border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" />
																		</div>
																	</div>
																</div>
															</td>
															<td>
																<div class="flex flex-col">
																	<div class="mt-1.5 flex flex-col">
																		<div
																			class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:w-[220px]">
																			<input type="text" name="description" id="description" v-model="description"
																				class="w-full block cursor-not-allowed border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" />
																		</div>
																	</div>
																</div>
															</td>
															<td>
																<div class="flex flex-col">
																	<div class="mt-1.5 flex flex-col">
																		<div
																			class="flex mr-20 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:w-[120px]">
																			<input type="number" name="amount" id="amount" v-model="amount"
																				class="w-full block cursor-not-allowed border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
																				disabled />
																		</div>
																	</div>
																</div>
															</td>
															<td>
																<div @click="addService"
																	class="bg-primary w-30 round-xl h-max flex gap-2 cursor-pointer justify-center item-center text-white px-2 py-1.5 rounded-lg">
																	<div class="text-white"><svg-icon type="mdi" :path="mdiPlus"></svg-icon>
																	</div>
																	<div class="font-medium text-base">Add</div>
																</div>
															</td>
														</tr>
													</tbody>
												</table>
											</div>
										</div>
									</div>
									<div class="w-full flex justify-end mt-5 bg-white py-3">
										<div class="w-max flex justify-start gap-5">
											<label class="font-bold">TOTAL</label>
											<div>{{ new Intl.NumberFormat().format(totalValue) }} ETB</div>
										</div>
									</div>
								</div>
							</div>
							<div class="bg-white px-8 py-4">
								<div class="flex justify-between items-start">
									<div class="w-[65%] flex flex-col gap-7">
										<div class="flex flex-col">
											<dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 capitalize">
												Diagnosis</dd>
											<div class="mt-1.5 flex flex-col">
												<div
													class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:w-[383px]">
													<textarea name="diagnosis" id="diagnosis"
														class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
														placeholder="write your diagnosis here..." v-model="diagnosis"></textarea>
												</div>
											</div>
										</div>
										<div class="flex flex-col">
											<dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 capitalize">
												Comment</dd>
											<div class="mt-1.5 flex flex-col">
												<div
													class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:w-[383px]">
													<textarea name="comment" id="comment"
														class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
														placeholder="write your comments here..." v-model="comment"></textarea>
												</div>
											</div>
										</div>
										<div class="flex flex-col w-full gap-4"></div>
										<div class="flex gap-2 items-center justify-start">
											<input type="checkbox" v-model="questions" value="question1" class="h-6 w-6" />
											<label class="capitalize">is the medical certificate attached?</label>
										</div>
										<div class="flex gap-2 items-center justify-start">
											<input type="checkbox" v-model="questions" class="h-6 w-6" value="question2" />
											<label class="capitalize">is the medical certificate attached?</label>
										</div>
										<div class="flex gap-2 items-center justify-start">
											<input type="checkbox" v-model="questions" class="h-6 w-6" value="question3" />
											<label class="capitalize">is the medical certificate attached?</label>
										</div>
									</div>
								</div>

								<div class=" w-[45%]">
									<div class="w-full h-60 grid grid-cols-12">
										<div class="col-span-11 pl-8 py-4 h-full">
											<div class="h-full flex items-start flex-col w-full gap-3">
												<div class="w-full flex"
													:class="claimAttachments?.length > 0 ? 'justify-between' : 'justify-end'">
													<div class="text-xl" v-if="claimAttachments?.length > 0">
														Attachments
													</div>
													<div
														class="bg-primary round-xl flex gap-2 cursor-pointer item-center text-white px-2 py-1 rounded-lg"
														@click="addNewClaimAttachment()">
														<div class="text-white"><svg-icon type="mdi" :path="mdiAttachment"></svg-icon>
														</div>
														<div class="font-medium text-base">Add Attachment</div>
													</div>
												</div>
												<div v-if="claimAttachments?.length > 0"
													class="h-40 overflow-y-scroll w-full flex flex-col gap-5 pt-2">
													<div class="w-full grid grid-cols-4 gap-5 mt-3  py-2 px-2 divide-gray-200 bg-gray-200 ">
														<div class="text-medium text-lg capitalize">File Name</div>
														<div class="text-medium text-lg capitalize">Date</div>
														<div class="text-medium text-lg capitalize">Action</div>
													</div>
													<div v-if="claimAttachments" v-for="claimAttachment in claimAttachments"
														:key="claimAttachment.claimAttachmentUuid" class="w-full">
														<div class="grid grid-cols-4 gap-5 w-full px-2 divide-y divide-gray-200 bg-section-bg">
															<div class="text-sm col-span-1">{{ claimAttachment.fileName
															}}
															</div>
															<div class="text-sm col-span-1">{{ new
																Date(claimAttachment.createdAt).toDateString()
															}}</div>
															<div class="text-sm col-span-1 w-full pr-5">
																<div class="w-full flex justify-start">

																	<div class="w-full flex justify-start gap-2 items-center text-primary cursor-pointer"
																		@click="claimAttachmentDetailView(claimAttachment.claimAttachmentUuid, claimAttachment.fileName, claimAttachment.filePath)">

																		<IconRounded h="10" w="10" :icon="mdiFileChartCheck" class="hover:text-bold" />
																		<div>
																			View
																		</div>
																	</div>
																</div>
															</div>
														</div>
														<hr class="text-bold" />
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div v-else-if="!isLoading && !claim" class="w-full text-center">
						<div class="block font-sans text-2xl antialiased font-Medium leading-relaxed text-inherit capitalize">
							claim not found!</div>
					</div>
				</div>
			</SectionMain>
		</LayoutAuthenticated>
	</div>
</template>
