<template>
  <div class="gap-3">
   <button
      class="bg-[#092537] my-4 text-white py-2 px-4 rounded-lg shadow-md hover:bg-[#0f3c58] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      @click="$router.push('/Contract')"
    >
      Back
    </button>
    <RequirementsPdf />
  </div>
</template>

<script setup>
import RequirementsPdf from '@/features/requiremnts/SponsershipLetter.pdf.vue'

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
