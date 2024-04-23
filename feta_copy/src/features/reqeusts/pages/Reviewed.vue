<script setup>
import FeaturesPage from '@/components/FeaturesPage.vue';
import ReviewDataProvider from '../components/ReviewDataProvider.vue'
import TableWrapper from '@/components/TableWrapper.vue';
import { useRouter } from 'vue-router';

const router = useRouter()

</script>
<template>
  <FeaturesPage>
    <ReviewDataProvider v-slot="{ reviewed, pending }">
      <TableWrapper
        :pending="pending"
        :headers="{
          head: ['agency Name', 'fullname',  'agency Policy Number', 'number Of Packages', 'total premium', 'modify'],
          row: ['agencyName', 'fullname',  'agencyPolicyNumber', 'numberOfPackages', 'premium']
        }"
        :rows="reviewed?.length && reviewed.reduce((state, payload) => {
          payload.fullname = `${payload.firstName} ${payload.fatherName}`
          payload.premium = payload.numberOfPackages * 505
          state.push(payload)
          return state
        }, [])"
      >
        <template #row>
          <tr class="z-0 cursor-pointer" :key="row.id"
            v-for="(row, index) in reviewed?.length && reviewed.reduce((state, payload) => {
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
              {{row.numberOfPackages}}
            </td>
            <td>
              {{row.premium}}
            </td>
            <td v-if="['agency Name', 'fullname', 'agency Name', 'agency Policy Number', 'number Of Packages', 'total premium', 'modify'].map(head => head.toLowerCase()).includes('modify')">
              <div @click.stop="() => { }" class="flex justify-start gap-2">
                <button class="text-blue-500"  @click.prevent="() => router.push(`/reviewed/detail/${row.boughtInsuranceUuid}/${row.requestedByStatus}`)">
                  View
                </button>
              </div>
            </td>
          </tr>
        </template>
      </TableWrapper>
    </ReviewDataProvider>
  </FeaturesPage>
</template>