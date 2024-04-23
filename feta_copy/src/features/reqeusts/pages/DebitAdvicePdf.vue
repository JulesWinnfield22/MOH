<script setup>
  import DebitedDataProvider from '@/features/reqeusts/components/DevitAdviceDataProvider.vue'
  import DebitAdvice from '@/features/reqeusts/components/DebitAdvice.pdf.vue'
  import { useRoute } from 'vue-router';

  const route = useRoute()
  const id = route.params?.id
</script>
<template>
  <DebitedDataProvider
    :id="id"
    v-slot="{ pending, ...rest }"
  >
    <DebitAdvice
      v-if="!pending"
      v-bind="rest"
    />
  </DebitedDataProvider>
</template>