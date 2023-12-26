<script setup>
import * as session from '@/scripts/session';
import { useRouter } from 'vue-router';
import LayoutAuthenticated from '@/layouts/LayoutAuthenticated.vue';
import SectionMain from '@/components/section/SectionMain.vue';
import SectionTitleLineWithButton from '@/components/section/SectionTitleLineWithButton.vue';
import ClaimDetail from '@/components/claims/ClaimDetail.vue';
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiReceiptTextOutline, mdiPlus, mdiEyeOutline } from '@mdi/js';
import { onMounted, ref } from 'vue';
import { makeAuthenticatedRequest } from '@/scripts/api';
import { useToast } from 'vue-toastification';
import Loader from '@/components/loader/loader.vue';
import Modal from '@/components/modal.vue';

const router = useRouter();
const toast = useToast();
const user = session.getUser();

// const tabs = ref([
//     { name: 'Saved', href: '#', current: true },
//     { name: 'Prepared', href: '#', current: false },
//     { name: 'Checked', href: '#', current: false },
//     { name: 'Requested', href: '#', current: false },
// ]);
const claims = ref([{}]);
const selectedClaim = ref({});
const providerUuid = ref('');
const isLoading = ref(false);
const showDetail = ref(false);
const isApprover = ref(false);
const title = ref('');
const privileges = ref([]);
const sentClaims = ref(false)
const draftClaims = ref(false)

// const tabChange = (selectedTab) => {
//     switch (selectedTab) {
//         case 'Saved':
//             tabs.value[0].current = true;
//             tabs.value[1].current = false;
//             tabs.value[2].current = false;
//             break;
//         case 'Prepared':
//             tabs.value[1].current = true;
//             tabs.value[0].current = false;
//             tabs.value[2].current = false;
//             tabs.value[3].current = false;
//             break;
//         case 'Checked':
//             tabs.value[2].current = true;
//             tabs.value[1].current = false;
//             tabs.value[0].current = false;
//             tabs.value[3].current = false;
//             break;
//         case 'Requested':
//             tabs.value[2].current = false;
//             tabs.value[1].current = false;
//             tabs.value[0].current = false;
//             tabs.value[3].current = true;
//             break;
//     }
// };

const fetchClaims = async (status) => {
    isLoading.value = true;
    try {
        await makeAuthenticatedRequest({
            method: 'GET',
            url: `/api/feta/claim/agency/saved/list?page=1&limit=25`,
        }).then((data) => {
            console.log('audited', data);
            isLoading.value = false;
            claims.value = data;
        });
    } catch (error) {
        isLoading.value = false;
        toast.error(error.message);
    }
};


const fetchClaimsBasedOnRole = async () => {
    const user = await session.getUser();
    if (user) {
        fetchClaims('saved');
    }
};

onMounted(async () => {
    fetchClaimsBasedOnRole();
});

const submitClaim = async () => {
    showDetail.value = !showDetail.value;
    fetchClaimsBasedOnRole();
};

const claimDetailView = (claim) => {
    router.push({ name: 'claimDetail', params: { id: claim.claimUuid } })
}

</script>
<template>
    <div class="w-full h-max">
        <Modal :open="showDetail" @close="showDetail = !showDetail" :icon="mdiReceiptTextOutline" className="h-9 w-9"
            title="Claim Detail" class="pt-10">
            <ClaimDetail @submitClaim="submitClaim" :id="selectedClaim.claimUuid" :firstName="selectedClaim.firstName"
                :lastName="selectedClaim.fatherName" :mrnNumber="selectedClaim.mrnNumber"
                :insuredPhone="selectedClaim.insuredPhone" :visitDate="selectedClaim.visitDate"
                :idNumber="selectedClaim.idNumber" />
        </Modal>
        <LayoutAuthenticated>
            <SectionMain>
                <SectionTitleLineWithButton :icon="mdiReceiptTextOutline" :title="title" main>
                    <!-- <div class="bg-primary px-2 py-1 w-max text-white text-center cursor-pointer rounded-md"
                        @click="router.push('/insured-person')" v-if="privileges.includes('ProviderClaimPreparer')">
                        Create Claim
                    </div> -->
                </SectionTitleLineWithButton>
                <div class="mt-8 flow-root">
                    <div class="w-full flex flex-col gap-3">
                        <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                                <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                                    <table class="min-w-full divide-y divide-gray-300">
                                        <thead class="bg-gray-50">
                                            <tr>
                                                <th scope="col"
                                                    class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                                </th>
                                                <th scope="col"
                                                    class="py-3.5 text-left text-sm font-semibold text-gray-900">
                                                    Full Name
                                                </th>
                                                <th scope="col"
                                                    class="py-3.5 text-left text-sm font-semibold text-gray-900">
                                                    Passport Number
                                                </th>
                                                <th scope="col"
                                                    class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                    Certificate Number
                                                </th>
                                                <th scope="col"
                                                    class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                    Phone
                                                </th>
                                                <th scope="col"
                                                    class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                    Status
                                                </th>
                                                <th scope="col"
                                                    class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody class="divide-y divide-gray-200 bg-white" v-if="!isLoading">
                                            <tr v-for="(claim, index) in claims" :key="claim.claimUuid"
                                                @click="claimDetailView(claim)" class="cursor-pointer">
                                                <td
                                                    class="whitespace-nowrap py-2 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                                    {{ index + 1 }}
                                                </td>
                                                <td class="whitespace-nowrap py-2 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6"
                                                    v-if="claim.firstName">
                                                    {{ claim.firstName }} {{ claim.fatherName }}
                                                </td>
                                                <td class="whitespace-nowrap py-2 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6"
                                                    v-else>
                                                    {{ claim.insuredFullName }}
                                                </td>
                                                <td class="whitespace-nowrap px-3 py-2 text-sm text-gray-500">
                                                    {{ claim.passportNumber }}
                                                </td>
                                                <td class="whitespace-nowrap px-3 py-2 text-sm text-gray-500">
                                                    {{ claim.insuranceId }}
                                                </td>
                                                <td class="whitespace-nowrap px-3 py-2 text-sm text-gray-500">
                                                    {{ claim.insuredPhone }}
                                                </td>
                                                <td class="whitespace-nowrap px-3 py-2 text-sm text-gray-500">
                                                    {{ claim.status }}
                                                </td>
                                                <td class="whitespace-nowrap px-3 py-2 text-sm text-gray-500">
                                                    <div
                                                        class="bg-primary px-2 py-1 w-[50%] text-white text-center cursor-pointer rounded-md">
                                                        <div class="text-base capitalize">Edit</div>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="!isLoading && !claims" class="min-w-full flex items-center mx-auto justify-center mt-50">
                    <div class="flex flex-col items-center">
                        <div class="round-xl flex gap-0.5 item-center text-black px-3 py-2">
                            <div class="text-[#55555550] h-32 w-32">
                                <svg-icon type="mdi" :path="mdiReceiptTextOutline" class="w-full h-full"></svg-icon>
                            </div>
                        </div>
                        <div class="block font-sans text-2xl antialiased font-Medium leading-relaxed text-inherit">
                            No Claims Found
                        </div>
                    </div>
                </div>
                <div v-if="isLoading" class="min-w-full flex items-center mx-auto justify-center">
                    <Loader />
                </div>
            </SectionMain>
        </LayoutAuthenticated>
    </div>
</template>
