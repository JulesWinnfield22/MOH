<script setup>
import { usePagination } from '@/composables/usePagination';
import { watch } from 'vue';
import { getAllPermissions } from '../api/PrivilegesApi';
import { usePrivileges } from '../store/privilegesStore';

const props = defineProps({
  prePage: {
    type: Number,
    default: 25
  }
})
const privilegesStore = usePrivileges();

const pagination = usePagination({
  perPage: props.prePage,
  store: privilegesStore,
  cb: getAllPermissions,
});

if (privilegesStore.privileges.length == 0) {
  pagination.send();
}

watch(pagination.data, console.log, {immediate: true})
</script>
<template>
  {{ console.log(pagination) }}
  <slot
    :pending="pagination.pending.value"
    :error="pagination.error.value"
    :privileges="privilegesStore.privileges"
  />
</template>
