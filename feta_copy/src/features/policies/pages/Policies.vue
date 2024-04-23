<script setup>
  import FeaturesPage from '@com/FeaturesPage.vue'
  import IssuedDataProvider from '../components/IssuedDataProvider.vue';
  import TableWrapper from '@/components/TableWrapper.vue';
  import TableRowSkeleton from '@/skeletons/TableRowSkeleton.vue';
  import { useRoute } from 'vue-router';
  import { openModal } from '@/modals';
import { toasted } from '@/utils/utils';

  const route = useRoute()

  function generate(id, gen) {
    openModal('PolicyDuration', null, res => {
      console.log(res)
      if(res) {
        gen(id, res)
      }
      toasted(res.success, "Generated successfully", "Couldnt generate try again.")
    })
  }

  function removePolicy(id, remove) {
    openModal('Confirmation', {
      message: 'Are you sure you want to cancle this policy?'
    }, res => {
      if(res) {
        remove(id)
      }
    })
  }

  function getData(issuced, withPolicies) {
    if(route.path.includes('amend') || route.path.includes('cancel')) {
      return withPolicies?.length ? withPolicies.reduce((state, payload) => {
        payload.address = `${payload?.address1} - ${payload?.address2} - ${payload?.address3}`
        state.push(payload)
        return state
      }, []) : []
    } else {
      return issuced?.length ? issuced.reduce((state, payload) => {
        payload.address = `${payload?.address1} - ${payload?.address2} - ${payload?.address3}`
        state.push(payload)
        return state
      }, []) : []
    } 
  }
</script>
<template>
  <FeaturesPage v-slot="{ perPage, search }">
    <IssuedDataProvider :search="search" :per-page="perPage" v-slot="{ issuced, generatePolicy, pending }">
      <TableWrapper
        :Fallback="TableRowSkeleton"
        :pending="pending"
        :headers="['agency name', 'address', 'telephone', 'Policy Number', 'Effective Date', 'modify']"
      >
        <template #row>
          <tr class="z-0 cursor-pointer" :key="row.id"
            v-for="(row, index) in issuced?.length ? issuced.reduce((state, payload) => {
              payload.address = `${payload?.address1} - ${payload?.address2} - ${payload?.address3}`
              state.push(payload)
              return state
            }, []) : []"
          >
            <td>{{ index + 1 }}</td>
            <td>
              {{row.agencyName}}
            </td>
            <td>
              <p class="font-medium"> {{ row.address }} </p>
            </td>
            <td>
              {{ row.telephone }}
            </td>
            <td>
              {{ row.agencyPolicyNumber }}
            </td>
            <td>
              {{ row.beginDate }}
            </td>
            <td v-if="['agency name', 'address', 'telephone', 'Policy Number', 'modify'].map(head => head.toLowerCase()).includes('modify')">
              <div @click.stop="() => { }" class="flex justify-start gap-2">
                <button class="text-primary" @click.prevent="() => generate(row.agencyUuid, generatePolicy)">
                  Issue Policy
                </button>
              </div>
            </td>
          </tr>
        </template>
      </TableWrapper>
    </IssuedDataProvider>
  </FeaturesPage>
</template>