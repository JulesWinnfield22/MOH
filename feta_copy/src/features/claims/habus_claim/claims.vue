<script setup>
import * as session from "@/scripts/session";
import { useRouter } from "vue-router";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionMain from "@/components/section/SectionMain.vue";
import SectionTitleLineWithButton from "@/components/section/SectionTitleLineWithButton.vue";
import BaseButton from "@/components/base/BaseButton.vue";
//import InsuredPersonDetail from "@/components/details/InsuredPersonDetail.vue";
import SvgIcon from "@jamescoyle/vue-icon";
import Loader from "@/components/loader/loader.vue";
import {
    mdiPlus,
    mdiAccountMultipleCheckOutline,
    mdiReceiptTextOutline,
} from "@mdi/js";
import { onMounted, ref } from "vue";
import CreateClaimForm from "@/components/forms/CreateClaimForm.vue";
import Modal from "@/components/modal.vue";
import IconRounded from '@/components/base/IconRounded.vue';
import { useToast } from 'vue-toastification';
import { makeAuthenticatedRequest } from '@/scripts/api';

const router = useRouter();

const openForm = ref(false)
const showDetail = ref(false)
const isLoading = ref(false)
const searchKey = ref('')
const toast = useToast()
const payers = ref([])
const people = ref([])
const currentPerson = ref({})

const user = session.getUser();

const getInsuredPerson = async () => {
    isLoading.value = true
    if (searchKey.value) {
        try {
            await makeAuthenticatedRequest({
                method: 'GET',
                url: `/api/feta/insuredperson/claimcreation/search?search=${searchKey.value}&page=1&limit=25`
            }).then((data) => {
                isLoading.value = false
                people.value = data
            })
        } catch (error) {
            isLoading.value = false;
        }
    }
}

const createClaim = async (insuredPerson) => {
    isLoading.value = true;
    try {
        await makeAuthenticatedRequest({
            method: 'POST',
            url: `/api/feta/claim?insuredPersonUuid=${insuredPerson}`
        }).then((data) => {
            isLoading.value = false;
            router.push({
                name: 'claimDetail',
                params: { id: data }
            });
        });

    } catch (error) {
        isLoading.value = false;
    }
};

const searchInsuredPerson = async () => {
    isLoading.value = true;
    try {
        await makeAuthenticatedRequest({
            method: 'GET',
            url: `/api/feta/insuredperson/claimcreation/search?search=${searchKey.value}&page=1&limit=25`
        }).then((data) => {
            isLoading.value = false;
            people.value = data;
            console.log("data from search... ");
            console.log(data);
        });
        isLoading.value = false
        people.value = data
    } catch (error) {
        isLoading.value = false;
    }
};

onMounted(async () => {
    isLoading.value = true;
    try {
        await makeAuthenticatedRequest({
            method: "GET",
            url: `/api/feta/insuredperson/claimcreation/search?search=${searchKey.value}&page=1&limit=25`,
        }).then((data) => {
            isLoading.value = false;
            people.value = data;
            console.log(data)
        });
    } catch (error) {
        isLoading.value = false;
    }
});
onMounted(() => {
    getInsuredPerson()
    //getPayers()
})
</script>
<template>
    <div class="w-full h-max">
        <Modal :open="openForm" @close="openForm = !openForm" :icon="mdiReceiptTextOutline" className="h-9 w-9"
            title="Create Claim" class="pt-10">
            <CreateClaimForm :firstName="currentPerson.firstName" :lastName="currentPerson.fatherName"
                :insuranceId="currentPerson.insuranceId" :insuredPersonUuid="currentPerson.insuredPersonUuid"
                @claimRegistered="openForm = !openForm" />
        </Modal>
        <LayoutAuthenticated>
            <SectionMain>
                <SectionTitleLineWithButton :icon="mdiAccountMultipleCheckOutline" title="Search Members" main>
                </SectionTitleLineWithButton>
                <div class="w-full flex justify-start">
                    <div class="w-full">
                        <form @submit.prevent="searchInsuredPerson" class="w-full flex justify-between items-center pr-5">
                            <div class="mt-2">
                                <input type="text" name="search" id="search"
                                    class="block w-full rounded-full border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    placeholder="Search" v-model="searchKey" @input="searchInsuredPerson" />
                            </div>
                        </form>
                    </div>
                </div>
                <div class="mt-4 flow-root">
                    <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                            <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                                <table class="min-w-full divide-y divide-gray-300">
                                    <thead class="bg-gray-50">
                                        <tr>
                                            <th scope="col"
                                                class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                                Full Name
                                            </th>
                                            <th scope="col"
                                                class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                                Passport Number
                                            </th>
                                            <th scope="col"
                                                class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                Certificate No.
                                            </th>
                                            <th scope="col"
                                                class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                Destination Country
                                            </th>
                                            <th scope="col"
                                                class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                Phone
                                            </th>
                                            <th scope="col"
                                                class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                                End Date
                                            </th>
                                            <th scope="col"
                                                class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                Insurance
                                            </th>
                                            <th scope="col"
                                                class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"></th>
                                        </tr>
                                    </thead>
                                    <div v-if="isLoading" class="min-w-full flex items-center mx-auto justify-center">
                                        <Loader />
                                    </div>
                                    <tbody v-if="!isLoading" class="divide-y divide-gray-200 bg-white">
                                        <tr v-for="(person, index) in people" :key="person.passportNumber">
                                            <td
                                                class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                                {{ person.firstName }} {{ person.fatherName }}
                                            </td>
                                            <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                {{ person.passportNumber }}
                                            </td>
                                            <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                {{ person.certificateNumber }}
                                            </td>
                                            <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                {{ person.countryOfDestination }}
                                            </td>
                                            <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                {{ person.phone }}
                                            </td>
                                            <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                {{ person.endDate }}
                                            </td>
                                            <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                Nyala
                                            </td>
                                            <td
                                                class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                                <div class="flex gap-4 items-center justify-end">
                                                    <div class="bg-primary round-xl flex gap-0.5 cursor-pointer item-center text-white px-2 py-1 rounded-lg"
                                                        @click="createClaim(person.insuredUuid)">
                                                        <div class="text-white">
                                                            <svg-icon type="mdi" :path="mdiPlus"></svg-icon>
                                                        </div>
                                                        <div class="font-medium text-base">
                                                            Create Claim
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <p v-if="isLoading"
                                    class="min-w-full divide-y divide-gray-300 mt-4 items-center mb-4 px-80">Search
                                    Insured Persons</p>
                                <p v-if="!isLoading && people && people.length === 0"
                                    class="min-w-full divide-y divide-gray-300 mt-4 items-center mb-4 px-80">No Insured
                                    Persons
                                    Were Found</p>
                            </div>
                        </div>
                    </div>
                </div>
            </SectionMain>
        </LayoutAuthenticated>
    </div>
</template>
