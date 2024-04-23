<script setup>
  import DebitedDataProvider from '@/features/reqeusts/components/DevitAdviceDataProvider.vue'
  import Voucher from '@/features/reqeusts/components/Voucher.pdf.vue'
  import { useRoute } from 'vue-router';

  const route = useRoute()
  const id = route.params?.id
</script>
<template>
  <DebitedDataProvider
    :id="id"
    v-slot="{ pending, ...rest }"
  >
    <Voucher
      v-if="!pending"
      v-bind="rest"
    />
  </DebitedDataProvider>
</template>