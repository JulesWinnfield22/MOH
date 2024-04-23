<script setup>
import FeaturesPage from '@/components/FeaturesPage.vue';
import RegisteredClaimsDataProvider from '../components/RegisteredClaimsDataProvider.vue';

</script>
<template>
  <FeaturesPage v-slot="{ search, perPage }">
    <RegisteredClaimsDataProvider :search="search" :perPage="perPage">

    </RegisteredClaimsDataProvider>
  </FeaturesPage>
</template>