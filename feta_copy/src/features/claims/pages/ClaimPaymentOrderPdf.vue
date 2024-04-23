<script setup>
  import FormLoading from '@/components/FormLoading.vue';
  import ClaimPaymentDataProvider from '@/features/claims/components/ClaimPaymentOrderDataProvider.vue'
  import ClaimPaymentOrder from '@/features/claims/components/ClaimPaymentOrder.pdf.vue'
  import { useRoute } from 'vue-router';
  
  const route = useRoute()
  const insuredId = route.params.insuredId
  const claimId = route.params.claimId
</script>

<template>
  <ClaimPaymentDataProvider
    :insuredId="insuredId"
    :claimId="claimId"
    v-slot="{ pending, ...rest }"
  >
    <ClaimPaymentOrder
      v-if="!pending"
      v-bind="rest"
    ></ClaimPaymentOrder>
    <FormLoading v-else />
  </ClaimPaymentDataProvider>
</template>