<script setup>
import { useRoute } from 'vue-router';
import ClaimDetailDataProvider from '@/features/claims/components/ClaimDetailDataProvider.vue'
import ClaimDetailComponent from './ClaimDetailComponent.vue'
import TableWrapper from '@/components/TableWrapper.vue';
import { openModal } from '@customizer/modal-x';
import { formatCurrency, secondDateFormat, toasted } from '@/utils/utils';
import { useApiRequest } from '@composable/useApiRequest'

const updatePaymentRequest = useApiRequest()

const route = useRoute()

const id = route.params.id

function openAttachment(attachement) {
  openModal('Attachment', {
    attachment: attachement
  })
}

const props = defineProps({
  headers: {
    Type: Object
  }
})

</script>
<template>
  <ClaimDetailDataProvider :id="id" v-slot="{details, updatePayment, ...rest}">
    {{ console.log(details, rest) }}
    <p class="font-semibold text-primary uppercase text-2xl">{{ route.path.split('/')?.[1].replace(/_/g, " ") }}</p>
    <div class="mt-2 rounded-md flex gap-2 flex-col">
      <div class="bg-white rounded-md border-b flex px-4 gap-2 h-12 text-white items-center justify-end">
        <slot :details="details" v-bind="rest" name="actions" />
      </div>
      <div class="capitalize flex gap-4">
        <div class="bg-white p-2 rounded-md flex flex-col gap-3 w-2/3 py-2">
          <p class="px-2 p-2 border-b text-lg">Particulars Of Certificates</p>
          <div class="flex flex-wrap">
            <ClaimDetailComponent
              label="Full name"
              :value="`${details?.details?.title || ''} ${details?.details?.firstName || ''} ${details?.details?.fatherName || ''} ${details?.details?.grandFatherName || ''}`"
            />
            <div class="flex self-end">
              <ClaimDetailComponent
                label="Insurance Name"
                :value="`${details?.details?.insuranceName}`"
              />
            </div>
          </div>
          <ClaimDetailComponent
            label="Certificate Number"
            :value="`${details?.details?.certificateNumber}`"
          />
          <ClaimDetailComponent
            label="Destination Country"
            :value="`${details?.details?.destinationCountry}`"
          />
          <ClaimDetailComponent
            v-if="details?.details?.description"
            label="Remark"
            :value="`${details?.details?.description}`"
          />
          <div class="flex flex-wrap">
            <ClaimDetailComponent
            label="Phone"
            :value="`${details?.details?.insuredPhone}`"
            />
          </div>
        </div>
        <div class="flex bg-white py-2 gap-2 pb-2 rounded-md flex-col justify-start w-1/3">
          <p class="px-4 p-2 border-b text-lg">Policy Holder Info</p>
          <div class="flex flex-col px-2 gap-2">
            <ClaimDetailComponent
              label="Agency Name"
              :value="`${details?.details?.agencyName}`"
            />
            <ClaimDetailComponent
              label="Group Policy Number"
              :value="`${details?.details?.agencyPolicyNumber}`"
            />
          </div>
        </div>
      </div>
      <div class="bg-white rounded-md">
        <p class="border-b text-lg px-4 py-2">Particulars Of The Claims</p>
        <TableWrapper
          :showPagination="false"
          :headers="{
            head: headers ? headers.head : ['Incident Date', 'Types of claim', 'Place Of Incident', 'default Amount', 'payable amount', 'modify'],
            row: headers ? headers.row : ['incidentDate', 'item', 'placeOfIncident', 'defaultAmo', 'amou']
          }"
          :rows="details?.services?.length > 0 ? details?.services.reduce((acc, cur) => {
            let service = {...cur}
            service.amou = formatCurrency(service.amount)
            service.defaultAmo = formatCurrency(service.defaultAmount)
            console.log(service.amount)
            acc.push(service)
            return acc
          }, []) : []"
        >
          <template #button="{ row }">
            {{ console.log(row) }}
            <button @click="openModal('UpdatePayableAmount', {
              defaultAmount: row.defaultAmount,
              amount: row.amount,
            }, (res) => updatePayment({
              claimUuid: details?.details?.claimUuid,
              serviceGroupUuid: row?.serviceGroupUuid,
              placeOfIncident: row?.placeOfIncident,
              benefitProvidedUuid: row?.benefitProvidedUuid,
              incidentDate: row?.incidentDate,
              amount: res?.amount,
            }))" class="text-primary">Edit</button>
          </template>
        </TableWrapper>
      </div>
      
      <div class="bg-white rounded-md px-4 py-2">
        <p class="border-b text-lg">Claim Attachments</p>
        <div class="flex flex-col">
          <TableWrapper
            :showPagination="false"
            :headers="{
              head: ['File Name', 'Date', 'modify'],
              row: ['fileName', 'createdAt']
            }"
            :rows="details?.attachements ? details?.attachements.reduce((state, payload) => {
              payload.createdAt = secondDateFormat(payload.createdAt)
              state.push(payload)
              return state
            }, []) : []"
          >
          <template #button="{ row }">
              <slot name="router" :row="row">
                <button class="text-primary" @click="openAttachment(row)">view</button>
              </slot>
            </template>
          </TableWrapper>
        </div>
      </div>
      <div class="rounded-md bg-white p-2 flex flex-col">
        <p class="border-b text-lg px-4 py-2">Agency Remark</p>
        <p class=" rounded-md italic bg-gray-200 p-4">{{ details?.details?.agencyComment }}</p>
      </div>
      <div class="flex flex-col gap-1">
        <div v-if="details?.details?.reviewerComment" class="rounded-md bg-white p-2 flex items-end">
          <p class="border-b text-lg px-2">Claim Officer Comment: </p>
          <p class="text-sm mb-1 underline">{{ details?.details?.reviewerComment }}</p>
        </div>
        <div v-if="details?.details?.approverComment" class="rounded-md bg-white p-2 flex items-center">
          <!-- <p class="border-b text-lg px-4 py-2">Approval Remark</p>
          <p class=" rounded-md italic bg-gray-200 p-4">{{ details?.details?.approverComment }}</p> -->
          <p class="border-b text-lg px-2">Approval Remark: </p>
          <p class="text-sm mb-1 underline">{{ details?.details?.approverComment }}</p>
        </div>
        <div v-if="details?.details?.authorizerComment" class="rounded-md bg-white p-2 flex flex-col">
          <!-- <p class="border-b text-lg px-4 py-2">Authorizer Remark</p>
          <p class=" rounded-md italic bg-gray-200 p-4">{{ details?.details?.authorizerComment }}</p> -->
          <p class="border-b text-lg px-2">Approval Remark: </p>
          <p class="text-sm mb-1 underline">{{ details?.details?.authorizerComment }}</p>
        </div>
      </div>
    </div>
  </ClaimDetailDataProvider>
</template>