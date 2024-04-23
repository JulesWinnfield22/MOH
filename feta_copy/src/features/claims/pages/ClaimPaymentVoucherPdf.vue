<script setup>
  import FormLoading from '@/components/FormLoading.vue';
  import ClaimPaymentDataProvider from '@/features/claims/components/ClaimPaymentOrderDataProvider.vue'
  import ClaimPaymentVoucher from '@/features/claims/components/ClaimPaymentVoucher.pdf.vue'
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
    <ClaimPaymentVoucher
      v-if="!pending"
      v-bind="rest"
    ></ClaimPaymentVoucher>
    <FormLoading v-else />
  </ClaimPaymentDataProvider>
</template>