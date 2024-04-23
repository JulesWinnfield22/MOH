<script setup>
import FeaturesPage from '@/components/FeaturesPage.vue';
import TableWrapper from '@/components/TableWrapper.vue';
import TableRowSkeleton from '@/skeletons/TableRowSkeleton.vue';
import { addFullname } from '@/utils/utils'

const props = defineProps({
  DataProvider: {
    type: Object,
    required: true
  },
  headers: {
    type: Object,
    default: {
      head: [],
      row: []
    }
  },
  exception: {
    type: Object
  }
})

</script>
<template>
  <FeaturesPage v-slot="{ search, perPage }">
    <component  :is='DataProvider' v-slot="{ pending, claims, ...rest }" :search="search" :perPage="perPage">
      <TableWrapper
        :pending="pending"
        :Fallback="TableRowSkeleton"
        :headers="{
          head: ['agency name', 'insured name', 'agency phone', 'Certificate Number', ...headers.head, 'modify'].filter(el => !exception?.head?.includes(el)),
          row: ['agencyName', 'fullname', 'agencyPhone', 'certificateNumber', ...headers.row,].filter(el => !exception?.row?.includes(el))
        }"
        :rows="addFullname(claims)"
      >
        <template #button="{ row }">
          <slot name="actions" v-bind="rest" :row="row" />
        </template>
      </TableWrapper>
    </component>
  </FeaturesPage>
</template>