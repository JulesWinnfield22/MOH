<script setup>
  import { useApiRequest } from '@/composables/useApiRequest'
  import { getInsured } from '../api/insuredClaimApi';
  import PaginationWithSearch from '@/components/PaginationWithSearch.vue';
  
  const insuredReq = useApiRequest()

</script>
<template>
  <PaginationWithSearch
    :search-api="getInsured"
    :perPageApi="getInsured"
    v-slot="{ next, previous, result, searchPending }"
  >
    <slot 
      v-bind="{next, previous}"
      :insured="result"
      :pending="searchPending"
    />
  </PaginationWithSearch>

</template>../api/insuredClaimApi