<script setup>
  import FeaturesPage from '@com/FeaturesPage.vue'
  import IssuedDataProvider from '../components/IssuedDataProvider.vue';
  import TableWrapper from '@/components/TableWrapper.vue';
  import TableRowSkeleton from '@/skeletons/TableRowSkeleton.vue';
  import { useRoute } from 'vue-router';
  import { openModal } from '@/modals';
  import AmendDataProvider from '@/features/policies/components/AmendDataProvider.vue'
  
  const route = useRoute()

  function generate(id, gen) {
    openModal('PolicyDuration', null, res => {
      console.log(res)
      if(res) {
        gen(id, res)
      }
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
    <AmendDataProvider :search="search" :per-page="perPage" v-slot="{ withPolicies, remove, pending }">
      <TableWrapper
        :Fallback="TableRowSkeleton"
        :pending="pending"
        :headers="['agency name d', 'address', 'telephone', 'Policy Number', 'Effective Date', 'modify']"
      >
        <template #row>
          <tr class="z-0 cursor-pointer" :key="row.id"
            v-for="(row, index) in  withPolicies?.length ? withPolicies.reduce((state, payload) => {
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
                <button class="text-red-500" v-if="route.path?.includes('cancel')" @click.prevent="() => removePolicy(row.agencyuuid, remove)">
                  Cancel
                </button>
                <button class="text-primary  border-r  pr-2" v-if="route.path?.includes('amend')" @click.prevent="openModal('EditAgencyForm', {agency: row, filter: {date: true}})">
                  Amend
                </button>
                <button class="text-primary " v-if="route.path?.includes('amend')" @click.prevent="$router.push('/policy_wording/' + row.agencyUuid)">
                  view
                </button>
              </div>
            </td>
          </tr>
        </template>
      </TableWrapper>
    </AmendDataProvider>
  </FeaturesPage>
</template>