<script setup lang="ts">
import SponsershipLetterPdf from '@/features/requiremnts/SponsershipLetter.pdf.vue';
import SponsershipDataProvider from '../components/SponsershipDataProvider.vue';
</script>

<template>
    <SponsershipDataProvider v-slot="{ contract, pending }">
        <SponsershipLetterPdf v-if="!pending" :contract="contract" />
    </SponsershipDataProvider>
</template>