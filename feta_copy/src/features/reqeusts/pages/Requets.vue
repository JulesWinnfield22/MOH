<script setup>
import FeaturesPage from '@/components/FeaturesPage.vue';
import RequestsDataProvider from '../components/RequestsDataProvider.vue'
import TableWrapper from '@/components/TableWrapper.vue';
import { useRouter } from 'vue-router';
import TableRowSkeleton from '@/skeletons/TableRowSkeleton.vue';
import { openModal } from '@/modals';
import { getAttachementFile } from '@/features/claims/api/claimsApi';
import { useApiRequest } from '@/composables/useApiRequest';

const router = useRouter()
const attachementReq = useApiRequest()

function getAttachement(id) {
  openModal("ShowAllCertificateAttachemtns", {
    id
  })
}
</script>
<template>
  <FeaturesPage v-slot="{ perPage, search }">
    <RequestsDataProvider :per-page="perPage" :search="search" v-slot="{ next, previous, requestes, pending }">
      <TableWrapper
        :pending="pending"
        :Fallback="TableRowSkeleton"
        :headers="{
          head: ['agency Name', 'Requested by',  'agency Policy Number', 'Requested Date', '# Certificates', 'total premium', 'modify'],
          row: ['agencyName', 'fullname',  'agencyPolicyNumber', 'numberOfPackages', 'premium']
        }"
        :rows="requestes?.length ? requestes.reduce((state, payload) => {
          payload.fullname = `${payload.firstName} ${payload.fatherName}`
          payload.premium = payload.numberOfPackages * 505
          state.push(payload)
          return state
        }, []) : []"
      >
        <template #row>
          <tr class="z-0 cursor-pointer" :key="row.id"
            v-for="(row, index) in requestes?.length && requestes.reduce((state, payload) => {
              payload.fullname = `${payload.firstName} ${payload.fatherName}`
              payload.premium = payload.numberOfPackages * 505
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
              {{row.agencyPolicyNumber}}
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
                <button class="pr-2 border-r text-blue-500"  @click.prevent="() => router.push(`/requested_certificates/detail/${row.boughtInsuranceUuid}/${row.requestedByStatus}`)">
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
    </RequestsDataProvider>
  </FeaturesPage>
</template>