<script setup>
import FeaturesPage from '@/components/FeaturesPage.vue';
import TableWrapper from '@/components/TableWrapper.vue';
import DebitedDataProvider from '../components/DebitedDataProvider.vue';
import TableRowSkeleton from '@/skeletons/TableRowSkeleton.vue';
import { useRoute, useRouter } from 'vue-router';
import { openModal } from '@/modals';
import { useApiRequest } from '@composable/useApiRequest'
import { payInsured } from '../api/requestsApi'
import { secondDateFormat, toasted } from '../../../utils/utils'

const route = useRoute()
const router = useRouter()
const id = route.params.id

const payRequest = useApiRequest()

const amount = import.meta.env.v_PAYMENT_AMOUNT
const stamp = import.meta.env.v_REVENUE_STAMP

function payCertificate(amount, pay) {
  openModal(
    'Pay',
    {
      amount: amount,
      filter: {amount: true}
    },
    values => {
      if(!values) return
      pay(id, values)
    }  
  )
}

function getRows() {
  if(route.path.startsWith('/payed')) {

  }
}

function viewDetail(insuredUuid) {
  openModal('AttachementCertificate', {
    insuredUuid: insuredUuid
  })
}

</script>
<template>
  <DebitedDataProvider :id="id" v-slot="{ debited, pay, pending }">
    <FeaturesPage>
      <template v-if="route.path.startsWith('/debited_advice')" #action>
        <div class="ml-auto flex gap-2 px-2">
          <button v-if="!debited?.[0]?.paidDate" @click="() => payCertificate(debited?.length * amount, pay)" class="bg-green-500 px-4 rounded-md text-white shadow-md py-1">Pay</button>
          <button class="bg-blue-600 px-4 text-white rounded-md shadow-md py-1" @click='router.push(`/debit_advice/${id}`)'>View Debit Advice</button>
        </div>
      </template>
      <TableWrapper
        :actionHide="route.path"
        @action:certificate="row => router.push('/certificate/' + row.insuredUuid + '/' + row.agencyUuid)"
        :pending="pending"
        :Fallback="TableRowSkeleton"
        :headers="{
          head: ['fullname', 'Debit Date', 'phone', 'passport Number', 'passport Expiry Date', 'Destination', 'modify'],
          row: ['fullname', 'debitedD', 'phone', 'passportNumber', 'passportExpiryDate', 'countryOfDestination']
        }"
        :rows="debited?.length && debited.reduce((state, payload) => {
          payload.fullname = `${payload.firstName} ${payload.fatherName} ${payload.grandFatherName}`
          payload.debitedD = secondDateFormat(payload.debitedDate)
          state.push(payload)
          return state
        }, [])"
      >
        <template #button="{ row }">
          <button class="text-blue-500"  @click.prevent="() => viewDetail(row?.insuredUuid)">
            View
          </button>
        </template>
      </TableWrapper>
    </FeaturesPage>
  </DebitedDataProvider>
</template>