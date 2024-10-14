<script setup>
import { useApiRequest } from '@/composables/useApiRequest';
import { getContractById, getUserContract } from '@/features/students/api/contractApi';
import { useRoute } from 'vue-router';
const route = useRoute()

const contractId = route.params?.contractId
const req = useApiRequest()

req.send(
    () => getContractById(contractId)
)
</script>
<template>
    <slot
        :contract='req.response.value || {}'
        :pending="req.pending.value"
    />
</template>