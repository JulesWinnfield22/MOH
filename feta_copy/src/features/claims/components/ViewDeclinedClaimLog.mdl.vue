<script setup>
  import FormModal from '@/components/FormModal.vue';
  import FormParent from '@/components/FormParent.vue';
  import ClaimLogDataProvider from './ClaimLogDataProvider.vue';
  
</script>
<template>
  <FormModal name="ViewDeclinedClaimLog" v-slot="{ modal }">
    <FormParent title="Claim Log">
      <ClaimLogDataProvider v-slot="{ logs, pending }" :id="modal.data?.claimId">
        {{ console.log(logs) }}
        <template v-if="logs?.length">
          <div :key="log.actionDate" v-for="log in logs"></div>
        </template>
      </ClaimLogDataProvider>
    </FormParent>
  </FormModal>
</template>