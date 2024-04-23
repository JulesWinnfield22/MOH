<script setup>
  import FeaturesPage from '@com/FeaturesPage.vue'
  import IssuedDataProvider from '../components/IssuedDataProvider.vue';
  import TableWrapper from '@/components/TableWrapper.vue';
  import TableRowSkeleton from '@/skeletons/TableRowSkeleton.vue';
  import { useRoute } from 'vue-router';
  import { openModal } from '@/modals';

  const route = useRoute()

  function generate(id, gen) {
    openModal('PolicyDuration', null, res => {
      console.log(res)
      if(res) {
        gen(id, res)
      }
    })
  }
</script>
<template>
  <FeaturesPage>
    <IssuedDataProvider v-slot="{ issuced, generatePolicy, pending }">
      <TableWrapper
        :Fallback="TableRowSkeleton"
        :pending="pending"
        :headers="['agency name', 'address', 'telephone', 'description', 'modify']"
        :rows="[{
          agencyName: 'one',
          address: 'here',
          telephone: '0987654321',
          description: 'this is a policy'
        }]"
      >
        <template #row>
          <tr class="z-0 cursor-pointer" :key="row.id"
                v-for="(row, index) in [{
              agencyName: 'one',
              address: 'here',
              telephone: '0987654321',
              description: 'this is a policy'
            }]"
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
              {{ row.description }}
            </td>
            <td v-if="['agency name', 'address', 'telephone', 'description', 'modify'].map(head => head.toLowerCase()).includes('modify')">
              <div @click.stop="() => { }" class="flex justify-start gap-2">
                <button class="text-red-500" v-if="route.path?.includes('remove')" @click.prevent="() => removeRole(row.roleUuid, remove)">
                  Cancel
                </button>
                <button class="text-red-500" v-if="route.path?.includes('amend')" @click.prevent="openModal('EditAgencyForm', {agency: row})">
                  Amend
                </button>
                <button class="text-primary" v-if="route.path?.includes('issued')" @click.prevent="() => generate(row.agencyName, generatePolicy)">
                  Generate
                </button>
              </div>
            </td>
          </tr>
        </template>
      </TableWrapper>
    </IssuedDataProvider>
  </FeaturesPage>
</template>