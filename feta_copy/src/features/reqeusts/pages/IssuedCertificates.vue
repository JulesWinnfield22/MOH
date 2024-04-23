<script setup>
import FeaturesPage from '@/components/FeaturesPage.vue';
import IssuedCertificatesDataProvider from '../components/IssuedCertificatesDataProvider.vue'
import { useRoute, useRouter } from 'vue-router';
import TableWrapper from '@/components/TableWrapper.vue';
import Dropdown from '@/components/Dropdown.vue';
import { secondDateFormat } from '@/utils/utils';
import { openModal } from '@/modals';

const router = useRouter()
const amount = import.meta.env?.v_PAYMENT_AMOUNT

function getAttachement(id) {
  openModal("ShowAllCertificateAttachemtns", {
    id
  })
}
</script>
<template>
  <FeaturesPage>
    <IssuedCertificatesDataProvider v-slot="{ approved, pending }">
      <TableWrapper
        :pending="pending"
        :headers="{
          head: ['agency Name', 'fullname',  'Issued Date', '# Certificates', 'total premium', 'modify'],
          row: ['agencyName', 'fullname',  'issuedD', 'numberOfPackages', 'premium']
        }"
        :rows="approved?.length && approved.reduce((state, payload) => {
          payload.fullname = `${payload.firstName} ${payload.fatherName}`
          payload.premium = payload.numberOfPackages * amount
          payload.numberOfPackages = payload.premium / amount
          payload.numberOfPackages = payload.premium / amount
          state.push(payload)
          return state
        }, [])"
      >
        <template #row>
          <tr class="z-0 cursor-pointer" :key="row.id"
            v-for="(row, index) in approved?.length && approved.reduce((state, payload) => {
              payload.fullname = `${payload.firstName} ${payload.fatherName}`
              payload.premium = payload.numberOfPackages * amount
              payload.numberOfPackages = payload.premium / amount
              payload.issuedD = secondDateFormat(payload.actionDate)
              state.push(payload)
              return state
            }, [])"
          >
            <td>{{ index + 1 }}</td>
            <td>
              {{row.agencyName}}
            </td>
            <td>
              {{row.fullname}}
            </td>
            <td>
              {{row.issuedD}}
            </td>
            <td>
              {{row.numberOfPackages}}
            </td>
            <td>
              {{row.premium}}
            </td>
            <td v-if="['agency Name', 'fullname', 'agency Name', 'agency Policy Number', 'debit Note Number', 'total premium', 'modify'].map(head => head.toLowerCase()).includes('modify')">
              <Dropdown top="120%" v-slot="{ setRef, toggleDropdown }">
                <button @click="toggleDropdown">
                  <h-icon name="fa-ellipsis-v" />
                </button>
                <div class="gap-1 shadow-lg bg-white w-[10rem] flex flex-col p-2" :ref="setRef" @click.stop="() => { }">
                  <button class="text-start px-2 bg-gray-200 rounded-md py-1 text-blue-500 border-r pr-2" @click='router.push(`/debit_advice/${row.debitUuid}`)'>
                    View Debit Advice
                  </button>
                  <button class="text-start px-2 bg-gray-200 rounded-md py-1 text-blue-500"  @click.prevent="() => router.push(`/issued_certificate_detail/detail/${row.debitUuid}/${row.requestedByStatus}`)">
                    View Detail
                  </button>
                  <button class="text-start px-2 bg-gray-200 rounded-md py-1 text-blue-500"  @click.prevent="() => router.push(`/issued_voucher_certificate_detail/${row.debitUuid}/`)">
                    Voucher
                  </button>
                  <button class="text-start px-2 bg-gray-200 rounded-md py-1 text-blue-500"   @click.prevent="() => getAttachement(row?.boughtInsuranceUuid)">
                    attachements
                  </button>
                </div>
              </Dropdown>
            </td>
          </tr>
        </template>
      </TableWrapper>
    </IssuedCertificatesDataProvider>
  </FeaturesPage>
</template>