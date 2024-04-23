<script setup>
import FeaturesPage from '@/components/FeaturesPage.vue';
import PayedDataProvider from '../components/PayedDataProvider.vue'
import TableWrapper from '@/components/TableWrapper.vue';
import { useRouter } from 'vue-router';
import { openModal } from '@/modals';

const router = useRouter()

function getAttachement(id) {
  openModal("ShowAllCertificateAttachemtns", {
    id
  })
}
</script>
<template>
  <FeaturesPage>
    <PayedDataProvider v-slot="{ payed, pending }">
      <TableWrapper
        :pending="pending"
        :headers="{
          head: ['agency Name', 'Debit Note Number', 'Debit Note Date',  '# Certificates', 'total premium', 'modify'],
          row: ['agencyName', 'fullname',  'agencyPolicyNumber', 'numberOfPackages', 'premium']
        }"
        :rows="payed?.length && payed.reduce((state, payload) => {
          payload.fullname = `${payload.firstName} ${payload.fatherName}`
          payload.premium = payload.numberOfPackages * 505
          state.push(payload)
          return state
        }, [])"
      >
        <template #row>
          <tr class="z-0 cursor-pointer" :key="row.id"
            v-for="(row, index) in payed?.length && payed.reduce((state, payload) => {
              payload.fullname = `${payload.firstName} ${payload.fatherName}`
              payload.premium = payload.numberOfPackages * 505
              state.push(payload)
              return state
            }, [])"
          >
            <td>{{ index + 1 }}</td>
            <td>
              {{row.agencyName}} (
                {{ row.agencyPolicyNumber }}
              )
            </td>
            <td>
              {{ row.debitNoteNumber }}
            </td>
            <td>
              {{ row.actionDate }}
            </td>
            <td>
              {{row.numberOfPackages}}
            </td>
            <td>
              {{row.premium}}
            </td>
            <td v-if="['agency Name', 'fullname', 'agency Name', 'agency Policy Number', 'number Of Packages', 'total premium', 'modify'].map(head => head.toLowerCase()).includes('modify')">
              <div @click.stop="() => { }" class="flex justify-start gap-2">
                <button class="text-blue-500"  @click.prevent="() => router.push(`/debited_advice/detail/${row.debitUuid}/${row.requestedByStatus}`)">
                  View
                </button>
                <button class="text-blue-500"  @click.prevent="() => getAttachement(row?.boughtInsuranceUuid)">
                  attachements
                </button>
              </div>
            </td>
          </tr>
        </template>
      </TableWrapper>
    </PayedDataProvider>
  </FeaturesPage>
</template>