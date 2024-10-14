<template>
  <div class="gap-3">
    <div class="py-2 border-b mb-2">
      <Button 
      @click="$router.go(-1)" 
      type="primary" 
      class="text-white bg-[#092537] rounded-lg shadow-md hover:bg-[#0f3c58] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 text-sm py-1 px-2"
    >
      Go Back
    </Button>
	</div>
  <SponsershipDataProvider v-slot="{ contract, pending }">
    <RequirementsPdf v-if="!pending" :contract="contract" />
    </SponsershipDataProvider>
  </div>
</template>

<script setup>
import RequirementsPdf from '@/features/requiremnts/SponsershipLetter.pdf.vue'
import SponsershipDataProvider from '@/features/sponsership/components/SponsershipDataProvider.vue';

// Script logic if needed
</script>

<style scoped>
.split-page {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  padding: 20px;
}

.left-section,
.right-section {
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.topic h2 {
  font-family: 'DM Sans', sans-serif;
  font-size: 14px;
  font-weight: 700;
  line-height: 18.23px;
  margin-bottom: 1rem;

 
}

.topic p {
  font-family: 'DM Sans', sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 18.23px;
  text-align: justify;
  text-color: #79838C;
  margin-bottom: 1rem;
}
</style>
