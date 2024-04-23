<script setup>
  import FeaturesPage from '@/components/FeaturesPage.vue'
  import CertificateDataProvider from '../components/CertificateDataProvider.vue';
  import CertificatePdf from './Certificate.pdf.vue'
  
  import { useRoute } from 'vue-router';

  const route = useRoute()
  
  const id = route.params.id
  const agencyId = route.params.agencyId
  
</script>
<template>
  <CertificateDataProvider :user-id="id" :agency-id="agencyId" v-slot='data'>
    <CertificatePdf
      v-if="!data?.pending"

      v-bind="data"
    ></CertificatePdf>
  </CertificateDataProvider>
</template>